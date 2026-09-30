import { createClient } from "npm:@supabase/supabase-js@2.57.4";

// ── CORS headers (mandatory on every response) ─────────────────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

// ── Configuration ───────────────────────────────────────────────────────
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Restaurant contact details -- read from server-side secrets, never exposed to frontend
const RESTAURANT_CONTACT_EMAIL = Deno.env.get("RESTAURANT_CONTACT_EMAIL") || "";
const RESTAURANT_CONTACT_PHONE = Deno.env.get("RESTAURANT_CONTACT_PHONE") || "";

// Email provider: Resend (https://resend.com) -- API key configured as edge function secret
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";

// SMS provider: Twilio -- credentials configured as edge function secrets
const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID") || "";
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN") || "";
const TWILIO_FROM_NUMBER = Deno.env.get("TWILIO_FROM_NUMBER") || "";

const RATE_LIMIT_MAX = 5; // max submissions per IP per hour
const RATE_LIMIT_WINDOW_MINUTES = 60;

const ALLOWED_SUBJECTS = [
  "General Enquiry",
  "Menu Enquiry",
  "Dietary / Allergen Enquiry",
  "Group Dining",
  "Catering Enquiry",
  "Feedback",
  "Other",
];

const MAX_MESSAGE_LENGTH = 2000;
const MAX_NAME_LENGTH = 100;

// ── Service-role Supabase client (bypasses RLS for inserts + rate-limit reads) ──
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// ── Helpers ─────────────────────────────────────────────────────────────

function json(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/** SHA-256 hash a string using the Web Crypto API. Returns hex. */
async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Strip control characters and trim, clamp length. */
function sanitise(input: string, maxLen: number): string {
  return input.replace(/[\x00-\x1F\x7F]/g, "").trim().slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

/**
 * Validates UK and international phone numbers.
 * Accepts + prefix, spaces, dashes, parentheses; requires 7-15 digits.
 */
function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  // International format with +, or UK domestic
  if (/^\+\d{7,15}$/.test(cleaned)) return true;
  if (/^0\d{7,14}$/.test(cleaned)) return true; // UK domestic leading 0
  return false;
}

function validateName(name: string): string | null {
  if (!name) return "Full name is required.";
  if (name.length < 2) return "Full name must be at least 2 characters.";
  if (/^\d+$/.test(name.replace(/\s/g, "")))
    return "Full name cannot be numbers only.";
  return null;
}

// ── Email sending via Resend ────────────────────────────────────────────

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  replyTo?: string,
): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.error("[email] RESEND_API_KEY not configured -- skipping email send.");
    return false;
  }
  if (!RESTAURANT_CONTACT_EMAIL) {
    console.error("[email] RESTAURANT_CONTACT_EMAIL not configured -- skipping.");
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Spice Garden Website <onboarding@resend.dev>",
        to,
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error(`[email] Resend API error ${res.status}: ${detail}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] send failed:", (err as Error).message);
    return false;
  }
}

// ── SMS sending via Twilio ──────────────────────────────────────────────

async function sendSms(to: string, body: string): Promise<boolean> {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) {
    console.error(
      "[sms] Twilio credentials not configured (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER) -- skipping SMS.",
    );
    return false;
  }

  try {
    const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          From: TWILIO_FROM_NUMBER,
          To: to,
          Body: body,
        }),
      },
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error(`[sms] Twilio API error ${res.status}: ${detail}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[sms] send failed:", (err as Error).message);
    return false;
  }
}

// ── Rate limiting ───────────────────────────────────────────────────────

async function checkRateLimit(ipHash: string): Promise<boolean> {
  const windowStart = new Date(
    Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
  ).toISOString();

  const { count, error } = await supabase
    .from("enquiry_rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", windowStart);

  if (error) {
    console.error("[rate-limit] query failed:", error.message);
    // Fail open -- don't block legitimate submissions if the rate-limit table is unreachable
    return true;
  }

  return (count ?? 0) < RATE_LIMIT_MAX;
}

async function logRateLimit(ipHash: string): Promise<void> {
  const { error } = await supabase
    .from("enquiry_rate_limits")
    .insert({ ip_hash: ipHash });
  if (error) console.error("[rate-limit] insert failed:", error.message);
}

// ── Main handler ────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  try {
    const body = await req.json();

    // ── Honeypot: if filled, silently accept (pretend success) without saving ──
    const honeypot = String(body.website ?? "").trim();
    if (honeypot) {
      return json({ success: true }, 200);
    }

    // ── Extract & sanitise fields ──────────────────────────────────────
    const name = sanitise(String(body.name ?? ""), MAX_NAME_LENGTH);
    const email = sanitise(String(body.email ?? ""), 254);
    const phone = sanitise(String(body.phone ?? ""), 30);
    const subject = String(body.subject ?? "").trim();
    const message = sanitise(String(body.message ?? ""), MAX_MESSAGE_LENGTH);
    const consent = Boolean(body.consent);

    // ── Server-side validation ─────────────────────────────────────────
    const errors: Record<string, string> = {};

    const nameError = validateName(name);
    if (nameError) errors.name = nameError;

    if (!email) errors.email = "Email address is required.";
    else if (!isValidEmail(email)) errors.email = "Please enter a valid email address.";

    if (!phone) errors.phone = "Phone number is required.";
    else if (!isValidPhone(phone))
      errors.phone = "Please enter a valid phone number (e.g. +44 7455 154515).";

    if (!subject) errors.subject = "Please select a subject.";
    else if (!ALLOWED_SUBJECTS.includes(subject))
      errors.subject = "Invalid subject selected.";

    if (!message) errors.message = "Message is required.";
    else if (message.length < 10)
      errors.message = "Message must be at least 10 characters.";
    else if (message.length > MAX_MESSAGE_LENGTH)
      errors.message = `Message must not exceed ${MAX_MESSAGE_LENGTH} characters.`;

    if (!consent)
      errors.consent = "You must agree before submitting your enquiry.";

    if (Object.keys(errors).length > 0) {
      return json({ error: "Validation failed.", fields: errors }, 400);
    }

    // ── Rate limiting ──────────────────────────────────────────────────
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const ipHash = await sha256(clientIp);

    const withinLimit = await checkRateLimit(ipHash);
    if (!withinLimit) {
      return json(
        {
          error:
            "You have submitted too many enquiries recently. Please try again later.",
        },
        429,
      );
    }

    // ── Persist to database ────────────────────────────────────────────
    const { data: insertData, error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        phone,
        subject,
        message,
        consent,
        ip_address: clientIp,
        status: "new",
      })
      .select("id, created_at")
      .single();

    if (insertError || !insertData) {
      console.error("[db] insert failed:", insertError?.message);
      return json(
        { error: "Sorry, we couldn't send your message right now. Please try again or contact us directly." },
        500,
      );
    }

    // Log rate-limit entry AFTER successful insert
    await logRateLimit(ipHash);

    const submittedAt = new Date(insertData.created_at).toISOString();

    // ── Email notification to the restaurant ───────────────────────────
    const restaurantEmailSent = await sendEmail(
      RESTAURANT_CONTACT_EMAIL,
      `New Website Enquiry \u2013 ${subject} \u2013 ${name}`,
      `
        <h2>New Website Enquiry</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Customer Name:</td><td>${name}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${email}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Phone:</td><td>${phone}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Subject:</td><td>${subject}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Message:</td><td style="white-space:pre-wrap;">${message}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Submitted:</td><td>${submittedAt}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Source:</td><td>Spice Garden Website</td></tr>
        </table>
        <p style="font-size:12px;color:#888;margin-top:16px;">
          Reply directly to this email to respond to the customer.
        </p>
      `,
      email, // Reply-To = customer's email
    );

    // ── Customer acknowledgement email ────────────────────────────────
    await sendEmail(
      email,
      "We\u2019ve received your message \u2013 Spice Garden",
      `
        <p>Hi ${name},</p>
        <p>Thank you for contacting Spice Garden. We\u2019ve received your enquiry and a member of our team will get back to you as soon as possible.</p>
        <p>Warm regards,<br>Spice Garden<br>Pure Vegetarian</p>
      `,
    );

    // ── SMS notification to the restaurant phone ───────────────────────
    if (RESTAURANT_CONTACT_PHONE) {
      const smsBody = `Spice Garden: New website enquiry from ${name}. Subject: ${subject}. Phone: ${phone}. Please check your email/admin enquiries.`;
      await sendSms(RESTAURANT_CONTACT_PHONE, smsBody);
    }

    // ── Response ───────────────────────────────────────────────────────
    // Success is returned as long as the DB insert succeeded (the enquiry is saved).
    // Email/SMS delivery is best-effort -- we log failures server-side but don't fail
    // the request, because the enquiry is safely stored and can be reviewed in the admin.
    return json(
      {
        success: true,
        emailSent: restaurantEmailSent,
        message:
          "Your message has been received. A member of the Spice Garden team will get back to you as soon as possible.",
      },
      200,
    );
  } catch (err) {
    console.error("[handler] unexpected error:", (err as Error).message);
    return json(
      { error: "Sorry, we couldn't send your message right now. Please try again or contact us directly." },
      500,
    );
  }
});
