"use client";

import { useId, useState } from "react";
import { ChevronDown, Info } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Formatting helpers                                                 */
/* ------------------------------------------------------------------ */

const inrFmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const numFmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

/** ₹ with Indian grouping, no paise. Non-finite values render as “—”. */
export function inr(n: number): string {
  return Number.isFinite(n) ? inrFmt.format(Math.round(n)) : "—";
}

/** Plain number with up to 2 decimals. */
export function num(n: number, digits = 2): string {
  return Number.isFinite(n)
    ? new Intl.NumberFormat("en-IN", { maximumFractionDigits: digits }).format(n)
    : "—";
}

export function pct(n: number, digits = 2): string {
  return Number.isFinite(n) ? `${numFmt.format(Number(n.toFixed(digits)))}%` : "—";
}

/* ------------------------------------------------------------------ */
/*  Input field: label + slider + number box + unit                    */
/* ------------------------------------------------------------------ */

type FieldProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
};

export function Field({ label, value, onChange, min, max, step = 1, unit }: FieldProps) {
  const id = useId();
  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <label
          htmlFor={id}
          className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--text-faint)]"
        >
          {label}
        </label>
        <div className="flex items-center gap-1.5">
          <input
            id={id}
            type="number"
            inputMode="decimal"
            value={Number.isFinite(value) ? value : ""}
            min={min}
            max={max}
            step={step}
            onChange={(e) =>
              onChange(e.target.value === "" ? min : clamp(Number(e.target.value)))
            }
            className="w-28 rounded-md border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-2.5 py-1.5 text-right text-[14px] text-[color:var(--text)] tabular-nums"
          />
          {unit && (
            <span className="w-8 text-[12px] text-[color:var(--text-faint)]">{unit}</span>
          )}
        </div>
      </div>
      <input
        type="range"
        aria-label={label}
        value={Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ accentColor: "var(--accent)" }}
        className="w-full h-1.5 cursor-pointer"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Segmented control (pill group)                                     */
/* ------------------------------------------------------------------ */

export function Segmented<T extends string | number>({
  label,
  value,
  onChange,
  options,
}: {
  label?: string;
  value: T;
  onChange: (v: T) => void;
  options: { label: string; value: T }[];
}) {
  return (
    <div>
      {label && (
        <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--text-faint)] mb-2">
          {label}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={String(o.value)}
            type="button"
            onClick={() => onChange(o.value)}
            className={`rounded-full border px-3 py-1.5 text-[12px] transition-colors ${
              value === o.value
                ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                : "border-[color:var(--border-strong)] text-[color:var(--text-muted)] hover:border-[color:var(--accent)]"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Multi-year cash-flow input                                         */
/* ------------------------------------------------------------------ */

export function YearFlows({
  values,
  onChange,
  min = 3,
  max = 10,
}: {
  values: number[];
  onChange: (v: number[]) => void;
  min?: number;
  max?: number;
}) {
  const setAt = (i: number, v: number) => {
    const next = values.slice();
    next[i] = v;
    onChange(next);
  };
  const setCount = (n: number) => {
    if (n < min || n > max) return;
    if (n > values.length) onChange([...values, ...Array(n - values.length).fill(values[values.length - 1] ?? 0)]);
    else onChange(values.slice(0, n));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--text-faint)]">
          Cash inflow per year
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCount(values.length - 1)}
            className="h-6 w-6 rounded-md border border-[color:var(--border-strong)] text-[color:var(--text-muted)] hover:border-[color:var(--accent)]"
            aria-label="Fewer years"
          >
            −
          </button>
          <span className="font-mono text-[12px] text-[color:var(--text-muted)] tabular-nums">
            {values.length} yrs
          </span>
          <button
            type="button"
            onClick={() => setCount(values.length + 1)}
            className="h-6 w-6 rounded-md border border-[color:var(--border-strong)] text-[color:var(--text-muted)] hover:border-[color:var(--accent)]"
            aria-label="More years"
          >
            +
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {values.map((v, i) => (
          <label key={i} className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-[color:var(--text-faint)] w-6">
              Y{i + 1}
            </span>
            <input
              type="number"
              inputMode="decimal"
              value={Number.isFinite(v) ? v : ""}
              onChange={(e) => setAt(i, e.target.value === "" ? 0 : Number(e.target.value))}
              className="w-full rounded-md border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-2 py-1.5 text-right text-[13px] text-[color:var(--text)] tabular-nums"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Discounted cash-flow math                                          */
/* ------------------------------------------------------------------ */

/** NPV at a decimal rate. outlay is entered as a positive number (year 0). */
export function npv(rate: number, outlay: number, flows: number[]): number {
  return flows.reduce((acc, cf, t) => acc + cf / Math.pow(1 + rate, t + 1), -outlay);
}

/** IRR as a percentage, via bisection. Returns NaN if it does not converge. */
export function irr(outlay: number, flows: number[]): number {
  let lo = -0.9499;
  let hi = 5;
  let fLo = npv(lo, outlay, flows);
  let fHi = npv(hi, outlay, flows);
  if (!Number.isFinite(fLo) || !Number.isFinite(fHi) || fLo * fHi > 0) return NaN;
  for (let k = 0; k < 200; k++) {
    const mid = (lo + hi) / 2;
    const fMid = npv(mid, outlay, flows);
    if (Math.abs(fMid) < 1e-7) return mid * 100;
    if (fLo * fMid < 0) {
      hi = mid;
      fHi = fMid;
    } else {
      lo = mid;
      fLo = fMid;
    }
  }
  return ((lo + hi) / 2) * 100;
}

/* ------------------------------------------------------------------ */
/*  Result card + small stats                                          */
/* ------------------------------------------------------------------ */

export function ResultCard({
  primaryLabel,
  primaryValue,
  children,
}: {
  primaryLabel: string;
  primaryValue: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--accent-soft)] p-5">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--accent)] mb-1">
        {primaryLabel}
      </p>
      <p className="font-display text-3xl text-[color:var(--text)] leading-tight tabular-nums">
        {primaryValue}
      </p>
      {children && (
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
          {children}
        </div>
      )}
    </div>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--text-faint)] mb-0.5">
        {label}
      </p>
      <p className="text-[15px] text-[color:var(--text)] tabular-nums">{value}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Composition bar (e.g. invested vs gains)                           */
/* ------------------------------------------------------------------ */

type Segment = { label: string; value: number; tone: "muted" | "accent" };

export function CompositionBar({ segments }: { segments: Segment[] }) {
  const total = segments.reduce((s, x) => s + (Number.isFinite(x.value) ? x.value : 0), 0);
  if (total <= 0) return null;
  const color = (t: Segment["tone"]) =>
    t === "accent" ? "var(--accent)" : "var(--border-strong)";

  return (
    <div className="mt-4">
      <div className="flex h-3 w-full overflow-hidden rounded-full">
        {segments.map((s) => (
          <div
            key={s.label}
            style={{
              // Rounded to a whole percent: Math.pow can differ by 1 ULP
              // between Node and the browser, which would otherwise trip a
              // hydration mismatch on this inline style.
              width: `${Math.max(0, Math.round((s.value / total) * 100))}%`,
              backgroundColor: color(s.tone),
            }}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-[3px]"
              style={{ backgroundColor: color(s.tone) }}
            />
            <span className="text-[12px] text-[color:var(--text-muted)]">
              {s.label} —{" "}
              <span className="tabular-nums text-[color:var(--text)]">{inr(s.value)}</span>{" "}
              <span className="text-[color:var(--text-faint)]">
                ({Math.round((s.value / total) * 100)}%)
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Info bar — “how it's calculated”                                   */
/* ------------------------------------------------------------------ */

export type InfoBarProps = {
  included: string[];
  formula: string;
  where?: string[];
  how: string[];
  note?: string;
};

export function InfoBar({ included, formula, where, how, note }: InfoBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5 rounded-lg border border-[color:var(--border)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2 text-[13px] text-[color:var(--text)]">
          <Info size={15} strokeWidth={1.75} className="text-[color:var(--accent)]" />
          How it&rsquo;s calculated
        </span>
        <ChevronDown
          size={16}
          strokeWidth={1.75}
          className={`text-[color:var(--text-faint)] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-[color:var(--border)] px-4 py-4 space-y-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-faint)] mb-2">
              What goes in
            </p>
            <ul className="space-y-1.5 text-[13.5px] leading-relaxed text-[color:var(--text-muted)] list-disc pl-4 marker:text-[color:var(--text-faint)]">
              {included.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-faint)] mb-2">
              Formula
            </p>
            <pre className="overflow-x-auto rounded-md border border-[color:var(--border)] bg-[color:var(--surface)] px-3.5 py-3 font-mono text-[13px] text-[color:var(--text)] whitespace-pre-wrap">
              {formula}
            </pre>
            {where && where.length > 0 && (
              <ul className="mt-2 space-y-1 text-[12.5px] leading-relaxed text-[color:var(--text-faint)]">
                {where.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-faint)] mb-2">
              How it&rsquo;s worked out
            </p>
            <ol className="space-y-1.5 text-[13.5px] leading-relaxed text-[color:var(--text-muted)] list-decimal pl-4 marker:text-[color:var(--text-faint)]">
              {how.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ol>
          </div>

          {note && (
            <p className="text-[12.5px] leading-relaxed text-[color:var(--text-faint)] italic">
              {note}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section wrapper for one calculator                                 */
/* ------------------------------------------------------------------ */

export function Calc({
  id,
  index,
  tag,
  title,
  what,
  children,
}: {
  id: string;
  index: string;
  tag: string;
  title: string;
  what: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-[color:var(--border)] pt-12 mt-16 first:border-t-0 first:mt-10 first:pt-0"
    >
      <p className="font-mono text-[11px] tracking-[0.14em] text-[color:var(--text-faint)] mb-2">
        {index} / {tag}
      </p>
      <h2 className="font-display text-2xl md:text-[26px] text-[color:var(--text)] leading-snug mb-2">
        {title}
      </h2>
      <p className="text-[15px] leading-relaxed text-[color:var(--text-muted)] max-w-2xl mb-6">
        {what}
      </p>
      {children}
    </section>
  );
}
