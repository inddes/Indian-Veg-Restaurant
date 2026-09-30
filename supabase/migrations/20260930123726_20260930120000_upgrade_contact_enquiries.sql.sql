/*
  # Upgrade Contact Enquiries Schema

  ## Overview
  Upgrades the existing `contact_submissions` table to support subject categorisation,
  enquiry status tracking, and IP-based rate limiting for spam protection.
  No existing data or columns are destroyed -- only additive changes.

  ## Changes

  ### Modified Table: `contact_submissions`
  - Adds `subject` (text, NOT NULL) -- enquiry category from a fixed allowlist
  - Adds `status` (text, NOT NULL, DEFAULT 'new') -- lifecycle: new / read / replied
  - Adds `ip_address` (text, nullable) -- submitter IP for audit and rate limiting
  - Adds `consent` (boolean, NOT NULL, DEFAULT false) -- GDPR consent confirmation
  - Adds CHECK constraint on `subject` to enforce allowed values
  - Adds CHECK constraint on `status` to enforce valid lifecycle states
  - Adds index on `created_at` for chronological listing

  ### New Table: `enquiry_rate_limits`
  Lightweight log used for server-side rate limiting (max 5 submissions per IP per hour).
  - `id` (uuid, primary key)
  - `ip_hash` (text, not null) -- SHA-256 hash of IP, never the raw IP
  - `created_at` (timestamptz, default now())
  - Index on `ip_hash` + `created_at` for fast window queries

  ## Security
  - RLS already enabled on `contact_submissions`; existing public INSERT policy retained
  - RLS enabled on `enquiry_rate_limits` with public INSERT only (server reads it via service role)
  - No SELECT policy on `contact_submissions` for anon -- submissions are write-only from the public
*/
DO $$
BEGIN
  -- ── Add columns to contact_submissions ───────────────────────────────
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'subject'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN subject text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'status'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN status text NOT NULL DEFAULT 'new';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'ip_address'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN ip_address text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'consent'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN consent boolean NOT NULL DEFAULT false;
  END IF;

  -- Backfill subject for any legacy rows so the NOT NULL + CHECK can be applied
  UPDATE contact_submissions SET subject = 'Other' WHERE subject IS NULL;

  -- Now enforce NOT NULL on subject
  ALTER TABLE contact_submissions ALTER COLUMN subject SET NOT NULL;

  -- ── Add CHECK constraints (drop first for idempotency) ───────────────
  ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_subject_check;
  ALTER TABLE contact_submissions
    ADD CONSTRAINT contact_submissions_subject_check
    CHECK (subject IN (
      'General Enquiry',
      'Menu Enquiry',
      'Dietary / Allergen Enquiry',
      'Group Dining',
      'Catering Enquiry',
      'Feedback',
      'Other'
    ));

  ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_status_check;
  ALTER TABLE contact_submissions
    ADD CONSTRAINT contact_submissions_status_check
    CHECK (status IN ('new', 'read', 'replied'));

  -- ── Index for chronological admin listing ────────────────────────────
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'idx_contact_submissions_created_at'
  ) THEN
    CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
  END IF;

  -- ── Rate limiting table ──────────────────────────────────────────────
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_name = 'enquiry_rate_limits'
  ) THEN
    CREATE TABLE enquiry_rate_limits (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      ip_hash text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );

    ALTER TABLE enquiry_rate_limits ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "anon_insert_rate_limits" ON enquiry_rate_limits;
    CREATE POLICY "anon_insert_rate_limits"
      ON enquiry_rate_limits FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);

    CREATE INDEX idx_enquiry_rate_limits_iphash_created
      ON enquiry_rate_limits(ip_hash, created_at DESC);
  END IF;
END $$;
