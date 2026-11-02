"use client";

import { useEffect, useState } from "react";
import { Bar, Panel } from "./ui";
import { useSystem } from "./store";
import {
  STAT_KEYS,
  STAT_NAMES,
  challenge,
  diffDays,
  isComplete,
  isSunday,
  levelInfo,
  nowMinutes,
  questsFor,
  rankOf,
  toMinutes,
  weekOf,
  type Block,
  type Game,
} from "./state";

/** Index of the schedule block happening now (the last one that has started). */
export function currentBlock(schedule: Block[], minutes: number): number {
  const sorted = schedule.map((b, i) => ({ i, m: toMinutes(b.time) })).sort((a, b) => a.m - b.m);
  let cur = -1;
  for (const b of sorted) if (b.m <= minutes) cur = b.i;
  return cur === -1 ? (sorted.at(-1)?.i ?? -1) : cur;
}

export function useMinutes() {
  const [m, setM] = useState(() => nowMinutes());
  useEffect(() => {
    const id = setInterval(() => setM(nowMinutes()), 30_000);
    return () => clearInterval(id);
  }, []);
  return m;
}

/** Weekly weigh-in check: tip if the last week's gain was under 0.3 kg. */
export function weightTip(g: Game): string | null {
  const w = g.weights;
  if (w.length < 2) return null;
  const gain = w[w.length - 1].kg - w[w.length - 2].kg;
  if (gain < 0.3) {
    return `Weekly gain was ${gain >= 0 ? "+" : ""}${gain.toFixed(1)} kg (goal ≥ 0.3 kg). Add an extra glass of milk and 2 tbsp of peanut butter daily.`;
  }
  return null;
}

export default function Status() {
  const { state } = useSystem();
  const { game: g, today } = state;
  const s = g.settings;
  const minutes = useMinutes();
  const lv = levelInfo(g.player.xp);
  const c = challenge(s, today);
  const quests = questsFor(s, today);
  const log = g.days[today];
  const done = log ? quests.filter((q) => isComplete(s, q, log, today)).length : 0;
  const openPen = log?.penalties.filter((p) => !p.cleared).length ?? 0;
  const maxStat = Math.max(...STAT_KEYS.map((k) => g.player.stats[k]), 1);
  const cur = currentBlock(s.schedule, minutes);
  const sortedIdx = s.schedule.map((b, i) => ({ i, m: toMinutes(b.time) })).sort((a, b) => a.m - b.m);
  const pos = sortedIdx.findIndex((b) => b.i === cur);
  const next = sortedIdx[(pos + 1) % sortedIdx.length];
  const tip = weightTip(g);
  const nismLeft = diffDays(s.nismDate, today);
  const weighedToday = g.weights.some((w) => w.date === today);

  return (
    <div className="space-y-4">
      <Panel title="Status" right={<span className="sys-mono text-[11px] text-[color:var(--sys-dim)]">{rankOf(lv.level)}</span>}>
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="sys-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--sys-dim)]">Name</p>
            <p className="truncate text-[22px] font-semibold">{g.player.name}</p>
            <p className="sys-mono mt-1 text-[12px] text-[color:var(--sys-accent)]">Title: {rankOf(lv.level)}</p>
          </div>
          <div className="text-right">
            <p className="sys-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--sys-dim)]">Level</p>
            <p className="sys-title text-[44px] leading-none">{lv.level}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="sys-mono mb-1 flex justify-between text-[11px] text-[color:var(--sys-dim)]">
            <span>XP</span>
            <span>
              {lv.into} / {lv.need}
            </span>
          </div>
          <Bar value={lv.into} max={lv.need} className="h-3" />
          <p className="sys-mono mt-1.5 text-right text-[10.5px] text-[color:var(--sys-faint)]">Total {g.player.xp} XP</p>
        </div>
      </Panel>

      <Panel title="Challenge">
        <div className="flex items-baseline justify-between">
          <p className="sys-title text-[26px]">
            Day {c.day} <span className="text-[16px] text-[color:var(--sys-dim)]">/ {c.total}</span>
          </p>
          <p className="sys-mono text-[11px] text-[color:var(--sys-dim)]">
            {c.started ? `Week ${weekOf(s, today)}` : "Not started"}
            {isSunday(today) && " · Recovery"}
          </p>
        </div>
        <Bar value={c.day} max={c.total} className="mt-2 h-2" />
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <Stat label="Quests" value={`${done}/${quests.length}`} />
          <Stat label="Streak" value={`${g.streak}d`} />
          <Stat label="Best" value={`${g.best}d`} />
        </div>
        {openPen > 0 && (
          <p className="sys-mono mt-3 border border-[color:var(--sys-red)] bg-[#300914]/70 px-3 py-2 text-[12px] text-[#ffe4e6]">
            {openPen} penalty quest{openPen === 1 ? "" : "s"} active. XP is held until cleared.
          </p>
        )}
      </Panel>

      {cur >= 0 && (
        <Panel title="Now">
          <p className="text-[20px] font-semibold">{s.schedule[cur].label}</p>
          <p className="sys-mono text-[12px] text-[color:var(--sys-dim)]">
            Since {s.schedule[cur].time} · Next: {next ? `${s.schedule[next.i].label} at ${s.schedule[next.i].time}` : "—"}
          </p>
        </Panel>
      )}

      <Panel title="Stats">
        <div className="space-y-3">
          {STAT_KEYS.map((k) => (
            <div key={k}>
              <div className="mb-1 flex items-baseline justify-between">
                <span className="sys-mono text-[13px]">
                  {k} <span className="text-[11px] text-[color:var(--sys-faint)]">{STAT_NAMES[k]}</span>
                </span>
                <span className="sys-mono text-[15px] text-[color:var(--sys-accent)]">{g.player.stats[k]}</span>
              </div>
              <Bar value={g.player.stats[k]} max={maxStat} className="h-1.5" />
            </div>
          ))}
        </div>
      </Panel>

      {(tip || (isSunday(today) && !weighedToday) || nismLeft >= 0) && (
        <Panel title="System messages">
          <ul className="space-y-2 text-[14px] leading-snug">
            {isSunday(today) && !weighedToday && <li>▸ Sunday weigh-in is due. Log it in Stats → Weight.</li>}
            {tip && <li>▸ {tip}</li>}
            {nismLeft > 0 && <li>▸ NISM exam in {nismLeft} day{nismLeft === 1 ? "" : "s"}.</li>}
            {nismLeft === 0 && <li>▸ NISM exam is today. Good luck.</li>}
          </ul>
        </Panel>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[color:var(--sys-line)] bg-[#020814]/70 py-2">
      <p className="sys-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--sys-dim)]">{label}</p>
      <p className="sys-mono text-[18px]">{value}</p>
    </div>
  );
}
