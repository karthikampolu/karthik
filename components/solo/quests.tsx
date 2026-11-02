"use client";

import { useState } from "react";
import { Check, Plus, Undo2 } from "lucide-react";
import { Bar, Panel } from "./ui";
import { useSystem } from "./store";
import { play } from "./sound";
import {
  challenge,
  isComplete,
  isSunday,
  questLabel,
  questsFor,
  repTarget,
  runTarget,
  sum,
  type DayLog,
  type QuestDef,
} from "./state";

export default function Quests() {
  const { state, dispatch } = useSystem();
  const { game: g, today } = state;
  const s = g.settings;
  const log: DayLog = g.days[today] ?? { done: {}, reps: {}, km: {}, awarded: {}, penalties: [], heldXp: 0 };
  const quests = questsFor(s, today);
  const done = quests.filter((q) => isComplete(s, q, log, today)).length;
  const c = challenge(s, today);
  const pen = log.penalties;
  const openPen = pen.filter((p) => !p.cleared);
  const tap = () => !s.muted && play("tap");

  return (
    <div className="space-y-4">
      <Panel
        title="Daily quest"
        right={<span className="sys-mono text-[11px] text-[color:var(--sys-dim)]">{c.started ? `Day ${c.day}/${c.total}` : "Pre-season"}</span>}
      >
        <p className="text-[14px] text-[color:var(--sys-dim)]">
          {isSunday(today) ? "Recovery Day: no run, half the workout reps." : "Complete every quest before midnight (IST)."}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <Bar value={done} max={quests.length} className="h-2.5" />
          <span className="sys-mono shrink-0 text-[13px]">
            {done}/{quests.length}
          </span>
        </div>
        {log.heldXp > 0 && (
          <p className="sys-mono mt-2 text-[12px] text-[color:var(--sys-amber)]">{log.heldXp} XP held until penalties are cleared.</p>
        )}
      </Panel>

      {pen.length > 0 && (
        <Panel title="Penalty quests" tone="red" right={<span className="sys-mono text-[11px]">{openPen.length} active</span>}>
          <p className="mb-3 text-[13px] text-[#fecdd3]">Failed yesterday. Complete them again, then clear them here to restore normal XP.</p>
          <div className="space-y-2">
            {pen.map((p) => (
              <button
                key={p.id}
                type="button"
                disabled={p.cleared}
                onClick={() => {
                  tap();
                  dispatch({ type: "clearPenalty", id: p.id });
                }}
                className={`flex min-h-[56px] w-full items-center gap-3 border px-3 text-left transition ${
                  p.cleared ? "border-[#4b2030] opacity-50" : "border-[color:var(--sys-red)] bg-[#4a0d1e]/60 active:scale-[0.99]"
                }`}
              >
                <Tick on={p.cleared} red />
                <span className="flex-1">
                  <span className="block text-[15px]">{p.name}</span>
                  <span className="sys-mono text-[10.5px] uppercase tracking-[0.12em] text-[#fda4af]">from {p.from}</span>
                </span>
              </button>
            ))}
          </div>
        </Panel>
      )}

      <div className="space-y-2.5">
        {quests.map((q) => (
          <QuestCard key={q.id} q={q} log={log} />
        ))}
      </div>

      <p className="sys-mono px-1 pb-2 text-center text-[11px] leading-relaxed text-[color:var(--sys-faint)]">
        Any quest left incomplete at midnight becomes a penalty quest tomorrow.
      </p>
    </div>
  );
}

function Tick({ on, red }: { on: boolean; red?: boolean }) {
  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center border ${
        on ? (red ? "border-[#fb7185] bg-[#fb7185]/25" : "border-[#38bdf8] bg-[#38bdf8]/25 shadow-[0_0_10px_#38bdf8]") : "border-[color:var(--sys-line)]"
      }`}
    >
      {on && <Check size={16} strokeWidth={3} />}
    </span>
  );
}

function QuestCard({ q, log }: { q: QuestDef; log: DayLog }) {
  const { state, dispatch } = useSystem();
  const { game: g, today } = state;
  const s = g.settings;
  const complete = isComplete(s, q, log, today);
  const tap = () => !s.muted && play("tap");

  if (q.kind === "reps") return <RepsCard q={q} log={log} />;

  return (
    <div className={`sys-panel ${complete ? "opacity-80" : ""}`}>
      <button
        type="button"
        onClick={() => {
          tap();
          dispatch({ type: "toggle", id: q.id });
        }}
        className="flex min-h-[60px] w-full items-center gap-3 px-3 py-2 text-left"
        aria-pressed={complete}
      >
        <Tick on={complete} />
        <span className="flex-1">
          <span className={`block text-[15.5px] ${complete ? "line-through decoration-[#38bdf8]/60" : ""}`}>{questLabel(s, q, today)}</span>
          <span className="sys-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--sys-dim)]">
            +{q.xp} XP · +{q.statGain} {q.stat}
          </span>
        </span>
      </button>
      {q.kind === "run" && (
        <div className="flex items-center gap-2 border-t border-[color:var(--sys-line)] px-3 py-2">
          <span className="sys-mono text-[11px] text-[color:var(--sys-dim)]">Target {runTarget(s, today)} km · logged</span>
          <input
            className="sys-input sys-mono !min-h-[36px] w-20 !px-2"
            type="number"
            inputMode="decimal"
            step="0.1"
            aria-label="Kilometres run"
            value={log.km[q.id] ?? ""}
            onChange={(e) => dispatch({ type: "km", id: q.id, km: parseFloat(e.target.value) || 0 })}
          />
          <span className="sys-mono text-[11px] text-[color:var(--sys-dim)]">km</span>
        </div>
      )}
    </div>
  );
}

const CHIPS = [5, 10, 15, 20, 25];

function RepsCard({ q, log }: { q: QuestDef; log: DayLog }) {
  const { state, dispatch } = useSystem();
  const { game: g, today } = state;
  const s = g.settings;
  const target = repTarget(s, today);
  const sets = log.reps[q.id] ?? [];
  const total = sum(sets);
  const complete = total >= target;
  const [custom, setCustom] = useState("");
  const add = (n: number) => {
    if (n <= 0) return;
    if (!s.muted) play("tap");
    dispatch({ type: "addSet", id: q.id, reps: n });
  };

  return (
    <div className="sys-panel px-3 py-3">
      <div className="flex items-center gap-3">
        <Tick on={complete} />
        <div className="flex-1">
          <p className="text-[15.5px]">{q.name}</p>
          <p className="sys-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--sys-dim)]">
            +{q.xp} XP · +{q.statGain} {q.stat}
            {isSunday(today) && " · half reps"}
          </p>
        </div>
        <p className="sys-mono text-[18px]">
          <span className={complete ? "text-[color:var(--sys-accent)]" : ""}>{total}</span>
          <span className="text-[13px] text-[color:var(--sys-dim)]">/{target}</span>
        </p>
      </div>
      <Bar value={total} max={target} className="mt-2.5 h-1.5" />
      {sets.length > 0 && (
        <p className="sys-mono mt-2 text-[11.5px] text-[color:var(--sys-dim)]">
          Sets: {sets.join(" + ")}
        </p>
      )}
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {CHIPS.map((n) => (
          <button key={n} type="button" className="sys-btn !min-h-[44px] flex-1 !px-0" onClick={() => add(n)} aria-label={`Add a set of ${n}`}>
            +{n}
          </button>
        ))}
      </div>
      <div className="mt-1.5 flex gap-1.5">
        <input
          className="sys-input sys-mono flex-1"
          type="number"
          inputMode="numeric"
          placeholder="Custom reps"
          aria-label={`Custom set for ${q.name}`}
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
        <button
          type="button"
          className="sys-btn is-primary"
          aria-label="Add custom set"
          onClick={() => {
            add(parseInt(custom, 10) || 0);
            setCustom("");
          }}
        >
          <Plus size={18} />
        </button>
        <button
          type="button"
          className="sys-btn"
          aria-label="Undo last set"
          disabled={sets.length === 0}
          onClick={() => dispatch({ type: "undoSet", id: q.id })}
        >
          <Undo2 size={18} />
        </button>
      </div>
    </div>
  );
}
