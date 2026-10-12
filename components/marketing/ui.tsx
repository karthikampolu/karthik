"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, X, Lightbulb, TriangleAlert } from "lucide-react";
import { LETTERS, type Shown } from "@/components/marketing/engine";
import type { Level, Mcq } from "@/lib/data/marketing-mcqs";

export const GOOD = "#2f6b3f";
export const GOOD_BG = "#e9f3ea";
export const BAD = "#b3261e";
export const BAD_BG = "#fcebe8";

export function Card({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 ${className}`}
    >
      {title && <p className="font-display text-[17px] text-[color:var(--text)] mb-3">{title}</p>}
      {children}
    </div>
  );
}

export function Chip({
  active,
  onClick,
  children,
  title,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] transition-colors ${
        active
          ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-[color:var(--bg)]"
          : "border-[color:var(--border-strong)] text-[color:var(--text-muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
      }`}
    >
      {children}
    </button>
  );
}

const LEVEL_STYLE: Record<Level, string> = {
  easy: "border-[#b9d8bf] text-[#2f6b3f] bg-[#f1f8f2]",
  medium: "border-[#e7d3a1] text-[#8a6410] bg-[#fbf6e8]",
  hard: "border-[#e8b9b3] text-[#b3261e] bg-[#fdf1ef]",
};

export function LevelBadge({ level }: { level: Level }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${LEVEL_STYLE[level]}`}
    >
      {level}
    </span>
  );
}

export function Bar({ value, tone = "accent" }: { value: number; tone?: "accent" | "good" | "bad" }) {
  const color = tone === "good" ? GOOD : tone === "bad" ? BAD : "var(--accent)";
  return (
    <div className="h-1.5 w-full rounded-full bg-[color:var(--border)] overflow-hidden">
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{ width: `${Math.max(0, Math.min(100, value * 100))}%`, background: color }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Option list                                                         */
/* ------------------------------------------------------------------ */

export function Options({
  shown,
  picked,
  locked,
  onPick,
}: {
  shown: Shown;
  /** Index the user chose, or null. */
  picked: number | null;
  /** When true the answer is revealed (practice) and options can't change. */
  locked: boolean;
  onPick: (i: number) => void;
}) {
  return (
    <div className="space-y-2.5" role="group" aria-label="Answer options">
      {shown.options.map((text, i) => {
        const isPicked = picked === i;
        const isCorrect = shown.correct === i;
        let cls =
          "border-[color:var(--border-strong)] bg-[color:var(--bg)] hover:border-[color:var(--accent)]";
        let badge = "border-[color:var(--border-strong)] text-[color:var(--text-faint)]";
        if (!locked && isPicked) {
          cls = "border-[color:var(--accent)] bg-[color:var(--accent-soft)]";
          badge = "border-[color:var(--accent)] bg-[color:var(--accent)] text-[color:var(--bg)]";
        }
        if (locked) {
          if (isCorrect) {
            cls = "border-[#8cc49a] bg-[#e9f3ea]";
            badge = "border-[#2f6b3f] bg-[#2f6b3f] text-white";
          } else if (isPicked) {
            cls = "border-[#e3a39c] bg-[#fcebe8]";
            badge = "border-[#b3261e] bg-[#b3261e] text-white";
          } else {
            cls = "border-[color:var(--border)] bg-[color:var(--bg)] opacity-60";
          }
        }
        return (
          <button
            key={i}
            type="button"
            disabled={locked}
            onClick={() => onPick(i)}
            aria-label={`Option ${LETTERS[i]}: ${text}`}
            className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition-colors disabled:cursor-default ${cls}`}
          >
            <span
              className={`mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] ${badge}`}
            >
              {locked && isCorrect ? (
                <Check size={13} strokeWidth={3} />
              ) : locked && isPicked ? (
                <X size={13} strokeWidth={3} />
              ) : (
                LETTERS[i]
              )}
            </span>
            <span className="text-[15px] leading-snug text-[color:var(--text)]">{text}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Flashcard (appears after an answer, flips into view)                */
/* ------------------------------------------------------------------ */

export function FlashCard({
  q,
  shown,
  picked,
  onNext,
  nextLabel = "Next question",
  skipped = false,
}: {
  q: Mcq;
  shown: Shown;
  picked: number;
  onNext?: () => void;
  nextLabel?: string;
  skipped?: boolean;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const right = !skipped && picked === shown.correct;

  return (
    <div style={{ perspective: 900 }} aria-live="polite">
      <div
        style={{
          transformOrigin: "top center",
          transform: open ? "rotateX(0deg)" : "rotateX(-70deg)",
          opacity: open ? 1 : 0,
          transition: "transform 450ms cubic-bezier(.2,.8,.2,1), opacity 300ms ease",
        }}
        className="overflow-hidden rounded-xl border bg-[color:var(--bg)]"
      >
        <div
          className="flex items-center gap-2.5 px-5 py-3"
          style={{
            background: skipped ? "var(--border)" : right ? GOOD_BG : BAD_BG,
            color: skipped ? "var(--text-muted)" : right ? GOOD : BAD,
          }}
        >
          {right ? <Check size={18} strokeWidth={3} /> : <X size={18} strokeWidth={3} />}
          <p className="font-display text-[17px]">{skipped ? "Skipped" : right ? "Correct" : "Not quite"}</p>
          <p className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.12em] opacity-80">
            {q.topic}
          </p>
        </div>

        <div className="px-5 py-4 space-y-3">
          <p className="text-[14px] text-[color:var(--text)]">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--text-faint)] mr-2">
              Answer
            </span>
            <span className="font-medium">
              {LETTERS[shown.correct]}. {shown.options[shown.correct]}
            </span>
          </p>

          <div className="flex gap-2.5">
            <Lightbulb size={16} className="mt-0.5 shrink-0 text-[color:var(--accent)]" />
            <p className="text-[14.5px] leading-relaxed text-[color:var(--text-muted)]">{q.why}</p>
          </div>

          {q.note && (
            <div className="flex gap-2.5 rounded-lg bg-[#fbf6e8] px-3 py-2.5">
              <TriangleAlert size={16} className="mt-0.5 shrink-0 text-[#8a6410]" />
              <p className="text-[13px] leading-relaxed text-[#6b4f0c]">{q.note}</p>
            </div>
          )}

          {onNext && (
            <div className="flex items-center justify-between pt-1">
              <p className="hidden sm:block text-[11.5px] text-[color:var(--text-faint)]">
                Press Enter for next
              </p>
              <button
                type="button"
                onClick={onNext}
                className="ml-auto inline-flex items-center gap-2 rounded-full bg-[color:var(--text)] px-5 py-2.5 text-[14px] font-medium text-[color:var(--bg)] hover:bg-[#3a3830] transition-colors"
              >
                {nextLabel}
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
