import { useState, FormEvent, useMemo } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Navigation as NavIcon,
  User,
  MessageSquare,
} from 'lucide-react';
import { restaurantConfig, fullAddress } from '../data/restaurantConfig';

const SUBJECT_OPTIONS = [
  'General Enquiry',
  'Menu Enquiry',
  'Dietary / Allergen Enquiry',
  'Group Dining',
  'Catering Enquiry',
  'Feedback',
  'Other',
];

const MAX_MESSAGE_LENGTH = 2000;
const MIN_MESSAGE_LENGTH = 10;

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
  // Honeypot -- must stay empty
  website: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  consent?: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false,
  website: '',
};

// ── Validation helpers ──────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  if (/^\+\d{7,15}$/.test(cleaned)) return true;
  if (/^0\d{7,14}$/.test(cleaned)) return true;
  return false;
}

function validateField(field: keyof FormData, data: FormData): string | undefined {
  switch (field) {
    case 'name': {
      const v = data.name.trim();
      if (!v) return 'Full name is required.';
      if (v.length < 2) return 'Full name must be at least 2 characters.';
      if (/^\d+$/.test(v.replace(/\s/g, '')))
        return 'Full name cannot be numbers only.';
      return undefined;
    }
    case 'email':
      if (!data.email.trim()) return 'Email address is required.';
      if (!isValidEmail(data.email.trim()))
        return 'Please enter a valid email address.';
      return undefined;
    case 'phone': {
      const v = data.phone.trim();
      if (!v) return 'Phone number is required.';
      if (!isValidPhone(v))
        return 'Please enter a valid phone number (e.g. +44 7455 154515).';
      return undefined;
    }
    case 'subject':
      if (!data.subject) return 'Please select a subject.';
      return undefined;
    case 'message': {
      const v = data.message.trim();
      if (!v) return 'Message is required.';
      if (v.length < MIN_MESSAGE_LENGTH)
        return `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
      if (v.length > MAX_MESSAGE_LENGTH)
        return `Message must not exceed ${MAX_MESSAGE_LENGTH} characters.`;
      return undefined;
    }
    case 'consent':
      if (!data.consent)
        return 'You must agree before submitting your enquiry.';
      return undefined;
    default:
      return undefined;
  }
}

function validateAll(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  (['name', 'email', 'phone', 'subject', 'message', 'consent'] as const).forEach(
    (field) => {
      const err = validateField(field, data);
      if (err) errors[field] = err;
    },
  );
  return errors;
}

// ── Component ───────────────────────────────────────────────────────────

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const messageLength = formData.message.length;
  const charsRemaining = useMemo(
    () => MAX_MESSAGE_LENGTH - messageLength,
    [messageLength],
  );

  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      // Live-validate only if the field has already been touched/blurred
      if (touched[field]) {
        const err = validateField(field, next);
        setErrors((prevErrs) => ({ ...prevErrs, [field]: err }));
      }
      return next;
    });
  }

  function handleBlur(field: keyof FormData) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData);
    setErrors((prevErrs) => ({ ...prevErrs, [field]: err }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Honeypot: if filled, silently "succeed" without sending anything
    if (formData.website) {
      setSubmitSuccess(true);
      return;
    }

    const allErrors = validateAll(formData);
    setErrors(allErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
      consent: true,
    });

    if (Object.keys(allErrors).length > 0) {
      // Do NOT clear the form on validation failure
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact-enquiry`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject,
          message: formData.message.trim(),
          consent: formData.consent,
          website: formData.website,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result || !result.success) {
        const serverMsg =
          result?.error ||
          "Sorry, we couldn't send your message right now. Please try again or contact us directly.";
        setSubmitError(serverMsg);
        setIsSubmitting(false);
        return;
      }

      // Only show success after the backend has confirmed acceptance
      setSubmitSuccess(true);
      setFormData(initialFormData);
      setErrors({});
      setTouched({});
    } catch {
      setSubmitError(
        "Sorry, we couldn't send your message right now. Please try again or contact us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Field component helpers ──────────────────────────────────────────
  const inputBaseClass =
    'w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:outline-none';
  const inputNormalClass = 'border-gray-300 focus:ring-orange-500 focus:border-orange-500';
  const inputErrorClass = 'border-red-400 focus:ring-red-400 focus:border-red-400';

  type ErrorField = keyof FieldErrors;

  function fieldClass(field: ErrorField): string {
    const hasError = touched[field] && errors[field];
    return `${inputBaseClass} ${hasError ? inputErrorClass : inputNormalClass}`;
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-orange-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ── Heading ─────────────────────────────────────────────────── */}
        <div className="text-center mb-14 max-w-3xl mx-auto animate-fadeIn">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-6">
            <MessageSquare className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We&rsquo;d love to hear from you. Whether you have a question about our menu,
            dietary requirements, group dining or anything else, send us a message and
            our team will get back to you.
          </p>
        </div>

        {/* ── Two-column layout: form + contact info ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          {/* ── Left: Send Us a Message ──────────────────────────────── */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6 sm:p-8 order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

            {/* Success message */}
            {submitSuccess && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-5 flex items-start space-x-3 animate-fadeIn">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">
                    Thank you for getting in touch!
                  </h3>
                  <p className="text-sm text-green-800 leading-relaxed">
                    Your message has been received. A member of the Spice Garden team
                    will get back to you as soon as possible.
                  </p>
                </div>
              </div>
            )}

            {/* Error message */}
            {submitError && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-5 flex items-start space-x-3 animate-fadeIn">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 leading-relaxed">{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Honeypot (hidden from users) */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                }}
              >
                <label htmlFor="website">Website (leave blank)</label>
                <input
                  type="text"
                  id="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => updateField('website', e.target.value)}
                />
              </div>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name <span className="text-orange-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={fieldClass('name')}
                  placeholder="Your full name"
                  maxLength={100}
                  aria-invalid={!!(touched.name && errors.name)}
                  aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                />
                {touched.name && errors.name && (
                  <p id="name-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email + Phone (two columns on desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={fieldClass('email')}
                    placeholder="your.email@example.com"
                    autoComplete="email"
                    aria-invalid={!!(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                  />
                  {touched.email && errors.email && (
                    <p id="email-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={fieldClass('phone')}
                    placeholder="+44 7455 154515"
                    autoComplete="tel"
                    aria-invalid={!!(touched.phone && errors.phone)}
                    aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
                  />
                  {touched.phone && errors.phone && (
                    <p id="phone-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject <span className="text-orange-600">*</span>
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => updateField('subject', e.target.value)}
                  onBlur={() => handleBlur('subject')}
                  className={fieldClass('subject')}
                  aria-invalid={!!(touched.subject && errors.subject)}
                  aria-describedby={touched.subject && errors.subject ? 'subject-error' : undefined}
                >
                  <option value="">Please select a subject&hellip;</option>
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {touched.subject && errors.subject && (
                  <p id="subject-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message <span className="text-orange-600">*</span>
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  rows={5}
                  maxLength={MAX_MESSAGE_LENGTH}
                  className={`${fieldClass('message')} resize-none`}
                  placeholder="Tell us how we can help you..."
                  aria-invalid={!!(touched.message && errors.message)}
                  aria-describedby={
                    touched.message && errors.message
                      ? 'message-error'
                      : 'message-counter'
                  }
                ></textarea>
                <div className="mt-1.5 flex items-center justify-between">
                  {touched.message && errors.message ? (
                    <p id="message-error" className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span
                    id="message-counter"
                    className={`text-xs ${charsRemaining < 100 ? 'text-orange-600' : 'text-gray-400'}`}
                  >
                    {messageLength} / {MAX_MESSAGE_LENGTH}
                  </span>
                </div>
              </div>

              {/* Consent checkbox */}
              <div>
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => updateField('consent', e.target.checked)}
                    onBlur={() => handleBlur('consent')}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-2 focus:ring-orange-500 cursor-pointer flex-shrink-0"
                    aria-invalid={!!(touched.consent && errors.consent)}
                    aria-describedby={touched.consent && errors.consent ? 'consent-error' : undefined}
                  />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    I agree that Spice Garden may use the details provided to respond to my enquiry.
                  </span>
                </label>
                {touched.consent && errors.consent && (
                  <p id="consent-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1 ml-8">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errors.consent}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 disabled:cursor-not-allowed text-white py-3.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ── Right: Contact Information ─────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{fullAddress}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a
                      href={`tel:${restaurantConfig.phone.replace(/\s/g, '')}`}
                      className="text-gray-600 hover:text-orange-600 transition-colors text-sm"
                    >
                      {restaurantConfig.phoneDisplay}
                    </a>
                    <p className="text-xs text-gray-400 mt-1">WhatsApp available on this number</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href={`mailto:${restaurantConfig.email}`}
                      className="text-gray-600 hover:text-orange-600 transition-colors text-sm break-all"
                    >
                      {restaurantConfig.email}
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">Opening Hours</h3>
                    <p className="text-gray-600 text-sm">{restaurantConfig.openingHoursDays}</p>
                    <p className="font-semibold text-orange-600 text-sm">{restaurantConfig.openingHoursTimes}</p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <a
                  href={`tel:${restaurantConfig.phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 text-sm shadow-sm hover:shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Us</span>
                </a>
                <a
                  href={restaurantConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold transition-colors duration-200 text-sm"
                >
                  <NavIcon className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Highlight card */}
            <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center space-x-3 mb-3">
                <User className="w-6 h-6" />
                <h3 className="text-xl font-bold">Planning a Visit?</h3>
              </div>
              <p className="text-sm opacity-90 leading-relaxed mb-4">
                We&rsquo;re open every day for lunch and dinner. Walk-ins are welcome,
                or give us a call to reserve a table for your group.
              </p>
              <a
                href={`tel:${restaurantConfig.phone.replace(/\s/g, '')}`}
                className="inline-block bg-white text-orange-600 hover:bg-orange-50 px-5 py-2.5 rounded-lg font-semibold transition-colors duration-200 text-sm"
              >
                Call: {restaurantConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* ── Find Us / Map ──────────────────────────────────────────────── */}
        <div className="mb-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Find Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Come and enjoy authentic vegetarian Indian and Indo-Chinese flavours.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg h-80 sm:h-96">
          <iframe
            src={restaurantConfig.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Spice Garden Location"
          ></iframe>
        </div>
        <div className="text-center mt-4">
          <a
            href={restaurantConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            <NavIcon className="w-5 h-5" />
            <span>Get Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}
