"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Bar, Label, LineChart, Panel } from "./ui";
import { useSystem } from "./store";
import { weightTip } from "./status";
import { diffDays, fmtDate, isSunday, type Game } from "./state";

const TABS = ["Weight", "Chess", "NISM", "CGPA"] as const;
type Tab = (typeof TABS)[number];

export default function Stats() {
  const [tab, setTab] = useState<Tab>("Weight");
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-1" role="tablist" aria-label="Trackers">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`sys-btn !px-0 ${tab === t ? "is-primary shadow-[0_0_14px_-4px_#38bdf8]" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "Weight" && <WeightTracker />}
      {tab === "Chess" && <ChessTracker />}
      {tab === "NISM" && <NismTracker />}
      {tab === "CGPA" && <CgpaTracker />}
    </div>
  );
}

/** Sorted insert/replace of a dated entry. */
function upsert<T extends { date: string }>(list: T[], entry: T): T[] {
  return [...list.filter((x) => x.date !== entry.date), entry].sort((a, b) => a.date.localeCompare(b.date));
}

function EntryForm({ label, placeholder, step, onAdd, defaultDate }: { label: string; placeholder: string; step: string; onAdd: (date: string, v: number) => void; defaultDate: string }) {
  const [date, setDate] = useState(defaultDate);
  const [v, setV] = useState("");
  return (
    <form
      className="mt-3 grid grid-cols-[1fr_1fr_auto] gap-1.5"
      onSubmit={(e) => {
        e.preventDefault();
        const n = parseFloat(v);
        if (!Number.isFinite(n) || !date) return;
        onAdd(date, n);
        setV("");
      }}
    >
      <input className="sys-input sys-mono !px-2" type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Date" />
      <input className="sys-input sys-mono" type="number" inputMode="decimal" step={step} placeholder={placeholder} value={v} onChange={(e) => setV(e.target.value)} aria-label={label} />
      <button type="submit" className="sys-btn is-primary" aria-label={`Add ${label}`}>
        <Plus size={18} />
      </button>
    </form>
  );
}

function EntryList<T extends { date: string }>({ items, render, onDelete }: { items: T[]; render: (x: T) => string; onDelete: (x: T) => void }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-3 max-h-48 space-y-1 overflow-y-auto">
      {[...items].reverse().map((x) => (
        <li key={x.date} className="flex min-h-[40px] items-center justify-between border-b border-[color:var(--sys-line)]/30 text-[14px]">
          <span className="sys-mono text-[12px] text-[color:var(--sys-dim)]">{fmtDate(x.date)}</span>
          <span className="sys-mono">{render(x)}</span>
          <button type="button" className="p-2 text-[color:var(--sys-faint)] hover:text-[color:var(--sys-red)]" onClick={() => onDelete(x)} aria-label="Delete entry">
            <Trash2 size={15} />
          </button>
        </li>
      ))}
    </ul>
  );
}

function WeightTracker() {
  const { state, dispatch } = useSystem();
  const { game: g, today } = state;
  const { start, target } = g.settings.weight;
  const latest = g.weights.at(-1)?.kg ?? start;
  const tip = weightTip(g);
  const update = (fn: (g: Game) => Game) => dispatch({ type: "update", fn });

  return (
    <>
      <Panel title="Body weight" right={<span className="sys-mono text-[11px] text-[color:var(--sys-dim)]">{start} → {target} kg</span>}>
        <div className="mb-2 flex items-baseline justify-between">
          <p className="sys-title text-[28px]">{latest.toFixed(1)} kg</p>
          <p className="sys-mono text-[12px] text-[color:var(--sys-dim)]">{(target - latest).toFixed(1)} kg to go</p>
        </div>
        <Bar value={latest - start} max={target - start} />
        <div className="mt-3">
          <LineChart points={g.weights.map((w) => ({ date: w.date, v: w.kg }))} target={target} unit=" kg" empty="Log your first Sunday weigh-in." />
        </div>
        <EntryForm
          label="weight in kg"
          placeholder="kg"
          step="0.1"
          defaultDate={today}
          onAdd={(date, kg) => update((x) => ({ ...x, weights: upsert(x.weights, { date, kg }) }))}
        />
        {!isSunday(today) && <p className="sys-mono mt-2 text-[11px] text-[color:var(--sys-faint)]">Weigh in every Sunday morning, same time, before breakfast.</p>}
        <EntryList items={g.weights} render={(w) => `${w.kg.toFixed(1)} kg`} onDelete={(w) => update((x) => ({ ...x, weights: x.weights.filter((y) => y.date !== w.date) }))} />
      </Panel>
      {tip && (
        <Panel title="System tip" tone="amber">
          <p className="text-[14.5px] leading-snug">{tip}</p>
        </Panel>
      )}
    </>
  );
}

function ChessTracker() {
  const { state, dispatch } = useSystem();
  const { game: g, today } = state;
  const { start, target } = g.settings.chess;
  const latest = g.chess.at(-1)?.rating ?? start;
  const update = (fn: (g: Game) => Game) => dispatch({ type: "update", fn });

  return (
    <Panel title="Chess rating" right={<span className="sys-mono text-[11px] text-[color:var(--sys-dim)]">{start} → {target}</span>}>
      <div className="mb-2 flex items-baseline justify-between">
        <p className="sys-title text-[28px]">{latest}</p>
        <p className="sys-mono text-[12px] text-[color:var(--sys-dim)]">{Math.max(0, target - latest)} to go</p>
      </div>
      <Bar value={latest - start} max={target - start} />
      <div className="mt-3">
        <LineChart points={g.chess.map((c) => ({ date: c.date, v: c.rating }))} target={target} empty="Log your rating after a rapid game." />
      </div>
      <EntryForm label="rating" placeholder="Rating" step="1" defaultDate={today} onAdd={(date, rating) => update((x) => ({ ...x, chess: upsert(x.chess, { date, rating: Math.round(rating) }) }))} />
      <EntryList items={g.chess} render={(c) => String(c.rating)} onDelete={(c) => update((x) => ({ ...x, chess: x.chess.filter((y) => y.date !== c.date) }))} />
    </Panel>
  );
}

function NismTracker() {
  const { state, dispatch } = useSystem();
  const { game: g, today } = state;
  const left = diffDays(g.settings.nismDate, today);
  const chapters = g.nism.chapters;
  const remaining = chapters.filter((c) => !c.done).length;
  const perDay = left > 0 ? Math.ceil(remaining / left) : remaining;
  const [name, setName] = useState("");
  const update = (fn: (g: Game) => Game) => dispatch({ type: "update", fn });
  const setChapters = (fn: (c: Game["nism"]["chapters"]) => Game["nism"]["chapters"]) => update((x) => ({ ...x, nism: { ...x.nism, chapters: fn(x.nism.chapters) } }));

  return (
    <>
      <Panel title="NISM countdown">
        <p className="sys-title text-[34px] leading-none">
          {left > 0 ? left : left === 0 ? "Today" : "Done"}
          {left > 0 && <span className="text-[14px] text-[color:var(--sys-dim)]"> days</span>}
        </p>
        <p className="sys-mono mt-1 text-[12px] text-[color:var(--sys-dim)]">
          Exam {fmtDate(g.settings.nismDate)} · {chapters.length - remaining}/{chapters.length} chapters done
          {remaining > 0 && left > 0 && ` · ${perDay}/day to finish`}
        </p>
        <Bar value={chapters.length - remaining} max={chapters.length} className="mt-3 h-2" />
      </Panel>

      <Panel title="Chapter checklist">
        <ul className="space-y-1.5">
          {chapters.map((c, i) => (
            <li key={c.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setChapters((cs) => cs.map((x) => (x.id === c.id ? { ...x, done: !x.done } : x)))}
                className={`flex h-11 w-11 shrink-0 items-center justify-center border ${c.done ? "border-[#38bdf8] bg-[#38bdf8]/25" : "border-[color:var(--sys-line)]"}`}
                aria-label={`Mark ${c.name} ${c.done ? "not done" : "done"}`}
                aria-pressed={c.done}
              >
                {c.done ? "✓" : i + 1}
              </button>
              <input
                className={`sys-input flex-1 ${c.done ? "line-through opacity-60" : ""}`}
                value={c.name}
                aria-label={`Chapter ${i + 1} name`}
                onChange={(e) => setChapters((cs) => cs.map((x) => (x.id === c.id ? { ...x, name: e.target.value } : x)))}
              />
              <button type="button" className="p-2 text-[color:var(--sys-faint)] hover:text-[color:var(--sys-red)]" onClick={() => setChapters((cs) => cs.filter((x) => x.id !== c.id))} aria-label={`Delete ${c.name}`}>
                <Trash2 size={15} />
              </button>
            </li>
          ))}
        </ul>
        <form
          className="mt-3 flex gap-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim()) return;
            setChapters((cs) => [...cs, { id: `c${Date.now()}`, name: name.trim(), done: false }]);
            setName("");
          }}
        >
          <input className="sys-input flex-1" placeholder="Add chapter" value={name} onChange={(e) => setName(e.target.value)} aria-label="New chapter name" />
          <button type="submit" className="sys-btn is-primary" aria-label="Add chapter">
            <Plus size={18} />
          </button>
        </form>
      </Panel>

      <Panel title="Mock test scores">
        <LineChart points={g.nism.mocks.map((m) => ({ date: m.date, v: m.score }))} target={60} unit="%" empty="Log a mock test score (%)." />
        <EntryForm label="mock score in %" placeholder="Score %" step="1" defaultDate={today} onAdd={(date, score) => update((x) => ({ ...x, nism: { ...x.nism, mocks: upsert(x.nism.mocks, { date, score }) } }))} />
        <p className="sys-mono mt-2 text-[11px] text-[color:var(--sys-faint)]">Dashed line at 60%: check your module’s actual pass mark.</p>
        <EntryList items={g.nism.mocks} render={(m) => `${m.score}%`} onDelete={(m) => update((x) => ({ ...x, nism: { ...x.nism, mocks: x.nism.mocks.filter((y) => y.date !== m.date) } }))} />
      </Panel>
    </>
  );
}

function CgpaTracker() {
  const { state, dispatch } = useSystem();
  const { game: g, today } = state;
  const marks = g.marks;
  const pct = marks.map((m) => (m.max > 0 ? (m.score / m.max) * 100 : 0));
  const avg = pct.length ? pct.reduce((a, b) => a + b, 0) / pct.length : 0;
  const targetPct = g.settings.cgpaTarget * 10;
  const [form, setForm] = useState({ subject: "", name: "", score: "", max: "" });
  const update = (fn: (g: Game) => Game) => dispatch({ type: "update", fn });

  return (
    <Panel title="CGPA goal" right={<span className="sys-mono text-[11px] text-[color:var(--sys-dim)]">target {g.settings.cgpaTarget.toFixed(1)}</span>}>
      <div className="flex items-baseline justify-between">
        <p className="sys-title text-[28px]">{marks.length ? `${avg.toFixed(1)}%` : "—"}</p>
        <p className="sys-mono text-[12px] text-[color:var(--sys-dim)]">aim ≥ {targetPct}% average</p>
      </div>
      <p className="sys-mono mt-1 text-[11px] text-[color:var(--sys-faint)]">Rough guide: a {g.settings.cgpaTarget.toFixed(1)} CGPA needs about {targetPct}% across assessments. Check your university&apos;s grading scale.</p>
      <div className="mt-3">
        <LineChart points={marks.map((m, i) => ({ date: m.date, v: Math.round(pct[i] * 10) / 10 }))} target={targetPct} unit="%" empty="Log a test or assignment mark." />
      </div>
      <form
        className="mt-3 grid grid-cols-2 gap-1.5"
        onSubmit={(e) => {
          e.preventDefault();
          const score = parseFloat(form.score);
          const max = parseFloat(form.max);
          if (!form.subject.trim() || !Number.isFinite(score) || !Number.isFinite(max) || max <= 0) return;
          const mark = { id: `m${Date.now()}`, date: today, subject: form.subject.trim(), name: form.name.trim() || "Assessment", score, max };
          update((x) => ({ ...x, marks: [...x.marks, mark] }));
          setForm({ subject: form.subject, name: "", score: "", max: form.max });
        }}
      >
        <label className="col-span-1">
          <Label>Subject</Label>
          <input className="sys-input" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
        </label>
        <label className="col-span-1">
          <Label>Test / assignment</Label>
          <input className="sys-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label>
          <Label>Score</Label>
          <input className="sys-input sys-mono" type="number" inputMode="decimal" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} />
        </label>
        <label>
          <Label>Out of</Label>
          <input className="sys-input sys-mono" type="number" inputMode="decimal" value={form.max} onChange={(e) => setForm({ ...form, max: e.target.value })} />
        </label>
        <button type="submit" className="sys-btn is-primary col-span-2">
          Log mark
        </button>
      </form>
      {marks.length > 0 && (
        <ul className="mt-3 max-h-56 space-y-1 overflow-y-auto">
          {[...marks].reverse().map((m) => (
            <li key={m.id} className="flex min-h-[44px] items-center gap-2 border-b border-[color:var(--sys-line)]/30 text-[14px]">
              <span className="flex-1">
                <span className="block">{m.subject}</span>
                <span className="sys-mono text-[11px] text-[color:var(--sys-dim)]">
                  {m.name} · {fmtDate(m.date)}
                </span>
              </span>
              <span className="sys-mono">
                {m.score}/{m.max}
              </span>
              <button type="button" className="p-2 text-[color:var(--sys-faint)] hover:text-[color:var(--sys-red)]" onClick={() => update((x) => ({ ...x, marks: x.marks.filter((y) => y.id !== m.id) }))} aria-label="Delete mark">
                <Trash2 size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
