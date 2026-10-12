"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  EXAM_COOKIE,
  EXAM_COOKIE_MAX_AGE,
  codeMatches,
  examToken,
  isExamAccessConfigured,
} from "@/lib/exam-access";

export type UnlockState = { error: string | null };

/** Only ever send people back to a Digest page, never an arbitrary URL. */
function safeReturnPath(value: FormDataEntryValue | null): string {
  const path = typeof value === "string" ? value : "";
  return /^\/digest\/[a-z0-9-]+$/.test(path) ? path : "/digest";
}

export async function unlockExam(_prev: UnlockState, formData: FormData): Promise<UnlockState> {
  if (!isExamAccessConfigured()) {
    return { error: "Access isn't set up on this site yet." };
  }

  const code = String(formData.get("code") ?? "").replace(/\s+/g, "");
  const token = examToken();

  if (!code || !token || !codeMatches(code)) {
    // Slow down repeated guessing.
    await new Promise((r) => setTimeout(r, 900));
    return { error: "That code didn't work. Check it and try again." };
  }

  (await cookies()).set({
    name: EXAM_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: EXAM_COOKIE_MAX_AGE,
  });

  redirect(safeReturnPath(formData.get("returnTo")));
}

export async function lockExam(formData: FormData): Promise<void> {
  (await cookies()).delete(EXAM_COOKIE);
  redirect(safeReturnPath(formData.get("returnTo")));
}
