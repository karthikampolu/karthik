import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Passcode gate for the exam-prep Digest pages.
 *
 * The code lives only in the EXAM_ACCESS_CODE environment variable (server
 * side, never NEXT_PUBLIC). Entering it sets an HttpOnly cookie holding an
 * HMAC derived from the code, so the code itself never reaches the browser,
 * and changing the code in Vercel logs every device out.
 */

export const EXAM_COOKIE = "exam_access";
export const EXAM_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function secret(): string | null {
  const code = process.env.EXAM_ACCESS_CODE?.trim();
  return code ? code : null;
}

export function isExamAccessConfigured(): boolean {
  return secret() !== null;
}

/** The cookie value a correct code produces. */
export function examToken(): string | null {
  const code = secret();
  if (!code) return null;
  return createHmac("sha256", code).update("exam-access:v1").digest("hex");
}

export function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function codeMatches(input: string): boolean {
  const code = secret();
  return code !== null && safeEqual(input.trim(), code);
}

export async function hasExamAccess(): Promise<boolean> {
  // Read the cookie first, unconditionally, so the page is always rendered per
  // request and never prerendered as a static (locked or unlocked) page.
  const value = (await cookies()).get(EXAM_COOKIE)?.value;
  const token = examToken();
  return !!token && !!value && safeEqual(value, token);
}
