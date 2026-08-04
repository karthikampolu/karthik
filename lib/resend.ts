import { Resend } from "resend";

// RESEND_API_KEY is read from Vercel environment variables at runtime.
// Never expose this key with a NEXT_PUBLIC_ prefix.
// Initialization is lazy so `next build` doesn't require the real key.
let cachedClient: Resend | null = null;

export function getResend(): Resend {
  if (!cachedClient) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY environment variable.");
    }
    cachedClient = new Resend(process.env.RESEND_API_KEY);
  }
  return cachedClient;
}

export const NOTIFY_EMAIL = "ampolukarthikay@gmail.com";
// This must be a domain you've verified inside Resend (see setup guide).
// Using an unverified "from" address will cause sends to fail.
export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "AK <hello@yourdomain.com>";
