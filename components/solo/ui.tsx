"use client";

import { useState, type ReactNode } from "react";
import { useSystem } from "./store";
import { fmtDate } from "./state";

export function Panel({
  title,
  right,
  tone,
  className = "",
  children,
}: {
  title?: string;
  right?: ReactNode;
  tone?: "red" | "amber";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`sys-panel sys-pop p-4 ${tone ? `is-${tone}` : ""} ${className}`}>
      {title && (
        <header className="mb-3 flex items-center justify-between gap-3 border-b border-[color:var(--sys-line)] pb-2">
          <h2 className="sys-title text-[12px]">{title}</h2>
          {right}
        </header>
      )}
      {children}
    </section>
  );
}

export function Bar({ value, max, className = "h-2.5" }: { value: number; max: number; className?: string }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div className={`w-full overflow-hidden border border-[color:var(--sys-line)] bg-[#020814] ${className}`}>
      <div className="sys-bar" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return <p className="sys-mono mb-1 text-[11px] uppercase tracking-[0.14em] text-[color:var(--sys-dim)]">{children}</p>;
}

/** Number input that commits a parsed value (keeps the raw text while typing). */
export function NumField({
  label,
  value,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
}) {
  const [text, setText] = useState(String(value));
  const [prev, setPrev] = useState(value);
  if (prev !== value) {
    setPrev(value);
    setText(String(value));
  }
  return (
    <label className="block">
      <Label>{label}</Label>
      <input
        className="sys-input sys-mono"
        inputMode="decimal"
        type="number"
        step={step}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          const n = parseFloat(e.target.value);
          if (Number.isFinite(n)) onChange(n);
        }}
      />
    </label>
  );
}

export function TextField({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <input className="sys-input" type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

const POPUP_TONE: Record<string, string> = {
  penalty: "is-red",
  warning: "is-amber",
};

/** Queue of System notifications; tap to dismiss. */
export function Popups() {
  const { state, dispatch } = useSystem();
  const p = state.popups[0];
  if (!p) return null;
  return (
    <div
      className="sys-fade fixed inset-0 z-50 flex items-center justify-center bg-[#01040b]/70 px-6 backdrop-blur-[2px]"
      onClick={() => dispatch({ type: "dismiss" })}
      role="alertdialog"
      aria-live="assertive"
      aria-label={p.title}
    >
      <div key={p.id} className={`sys-panel sys-pop w-full max-w-sm px-5 py-6 text-center ${POPUP_TONE[p.kind] ?? ""}`}>
        <p className="sys-mono mb-1 text-[10px] uppercase tracking-[0.3em] text-[color:var(--sys-dim)]">Notification</p>
        <p className="sys-title mb-4 text-[17px]" style={{ color: "var(--sys-accent)" }}>
          {p.title}
        </p>
        <div className="space-y-1.5">
          {p.lines.map((l, i) => (
            <p key={i} className="text-[15px] leading-snug">
              {l}
            </p>
          ))}
        </div>
        <p className="sys-mono mt-5 text-[10.5px] uppercase tracking-[0.2em] text-[color:var(--sys-faint)]">
          Tap to continue{state.popups.length > 1 ? ` · ${state.popups.length - 1} more` : ""}
        </p>
      </div>
    </div>
  );
}

/** Full-screen flash when levelling up. */
export function LevelFlash() {
  const { state } = useSystem();
  if (!state.flash) return null;
  return <div key={state.flash} className="sys-flash pointer-events-none fixed inset-0 z-40" aria-hidden />;
}

/** Minimal SVG line chart with an optional target line. */
export function LineChart({
  points,
  target,
  unit = "",
  empty = "No entries yet.",
}: {
  points: { date: string; v: number }[];
  target?: number;
  unit?: string;
  empty?: string;
}) {
  if (points.length === 0) {
    return <p className="py-6 text-center text-[13px] text-[color:var(--sys-faint)]">{empty}</p>;
  }
  const W = 320;
  const H = 150;
  const pad = { l: 34, r: 10, t: 12, b: 22 };
  const vals = points.map((p) => p.v).concat(target !== undefined ? [target] : []);
  let lo = Math.min(...vals);
  let hi = Math.max(...vals);
  if (hi === lo) {
    hi += 1;
    lo -= 1;
  }
  const span = hi - lo;
  lo -= span * 0.08;
  hi += span * 0.08;
  const x = (i: number) => pad.l + (points.length === 1 ? (W - pad.l - pad.r) / 2 : (i / (points.length - 1)) * (W - pad.l - pad.r));
  const y = (v: number) => pad.t + (1 - (v - lo) / (hi - lo)) * (H - pad.t - pad.b);
  const line = points.map((p, i) => `${x(i)},${y(p.v)}`).join(" ");
  const area = `${x(0)},${H - pad.b} ${line} ${x(points.length - 1)},${H - pad.b}`;
  const fmt = (v: number) => (Math.abs(v) >= 100 ? Math.round(v).toString() : v.toFixed(1));
  const last = points[points.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Chart, latest ${fmt(last.v)}${unit}`}>
      <defs>
        <linearGradient id="sys-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[lo, (lo + hi) / 2, hi].map((v) => (
        <g key={v}>
          <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} stroke="rgba(96,165,250,0.15)" />
          <text x={pad.l - 4} y={y(v) + 3} textAnchor="end" fontSize="9" fill="#7d97bf" fontFamily="ui-monospace, monospace">
            {fmt(v)}
          </text>
        </g>
      ))}
      {target !== undefined && (
        <g>
          <line x1={pad.l} x2={W - pad.r} y1={y(target)} y2={y(target)} stroke="#fbbf24" strokeDasharray="4 3" strokeWidth="1" />
          <text x={W - pad.r} y={y(target) - 3} textAnchor="end" fontSize="9" fill="#fbbf24" fontFamily="ui-monospace, monospace">
            target {fmt(target)}
            {unit}
          </text>
        </g>
      )}
      <polygon points={area} fill="url(#sys-area)" />
      <polyline points={line} fill="none" stroke="#67e8f9" strokeWidth="2" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 4px #38bdf8)" }} />
      {points.map((p, i) => (
        <circle key={i} cx={x(i)} cy={y(p.v)} r="3" fill="#040914" stroke="#67e8f9" strokeWidth="1.5" />
      ))}
      <text x={pad.l} y={H - 6} fontSize="9" fill="#7d97bf" fontFamily="ui-monospace, monospace">
        {fmtDate(points[0].date)}
      </text>
      {points.length > 1 && (
        <text x={W - pad.r} y={H - 6} textAnchor="end" fontSize="9" fill="#7d97bf" fontFamily="ui-monospace, monospace">
          {fmtDate(last.date)}
        </text>
      )}
    </svg>
  );
}
