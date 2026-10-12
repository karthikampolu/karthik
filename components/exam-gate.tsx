"use client";

import { useActionState } from "react";
import { Lock, LockOpen } from "lucide-react";
import { lockExam, unlockExam, type UnlockState } from "@/app/digest/exam-actions";

const initial: UnlockState = { error: null };

/** Passcode form shown in place of exam material until the code is entered. */
export function ExamGate({ returnTo, configured }: { returnTo: string; configured: boolean }) {
  const [state, action, pending] = useActionState(unlockExam, initial);

  return (
    <div className="mt-10 max-w-md rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-7">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent)]">
        <Lock size={18} />
      </div>
      <p className="font-display text-[22px] text-[color:var(--text)] mb-1">This material is private</p>
      <p className="text-[14.5px] leading-relaxed text-[color:var(--text-muted)] mb-5">
        Enter the access code to open the questions and study tools.
      </p>

      {configured ? (
        <form action={action} className="space-y-3">
          <input type="hidden" name="returnTo" value={returnTo} />
          <label
            htmlFor="exam-code"
            className="block font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--text-faint)]"
          >
            Access code
          </label>
          <input
            id="exam-code"
            name="code"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            required
            maxLength={32}
            aria-invalid={!!state.error}
            aria-describedby={state.error ? "exam-code-error" : undefined}
            className="w-full rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-4 py-3 font-mono text-[18px] tracking-[0.3em] text-[color:var(--text)]"
          />
          {state.error && (
            <p id="exam-code-error" role="alert" className="text-[13.5px] text-[#b3261e]">
              {state.error}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--text)] px-5 py-3 text-[15px] font-medium text-[color:var(--bg)] hover:bg-[#3a3830] disabled:opacity-60"
          >
            <LockOpen size={16} />
            {pending ? "Checking…" : "Unlock"}
          </button>
        </form>
      ) : (
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Access isn’t set up on this site yet.
        </p>
      )}
    </div>
  );
}

/** Small button to remove access from this device (e.g. a shared computer). */
export function ExamLockButton({ returnTo }: { returnTo: string }) {
  return (
    <form action={lockExam}>
      <input type="hidden" name="returnTo" value={returnTo} />
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 text-[12.5px] text-[color:var(--text-faint)] hover:text-[color:var(--text)]"
      >
        <Lock size={13} /> Lock on this device
      </button>
    </form>
  );
}
