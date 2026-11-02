"use client";

import { Panel } from "./ui";
import { useSystem } from "./store";
import { currentBlock, useMinutes } from "./status";
import { toMinutes } from "./state";

export default function Schedule() {
  const { state } = useSystem();
  const schedule = state.game.settings.schedule;
  const minutes = useMinutes();
  const cur = currentBlock(schedule, minutes);
  const curMinutes = cur >= 0 ? toMinutes(schedule[cur].time) : -1;
  const rows = schedule.map((b, i) => ({ ...b, i })).sort((a, b) => toMinutes(a.time) - toMinutes(b.time));
  const hhmm = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

  return (
    <Panel title="Today's timeline" right={<span className="sys-mono text-[11px] text-[color:var(--sys-dim)]">IST {hhmm}</span>}>
      <ol className="relative space-y-1.5">
        {rows.map((b) => {
          const now = b.i === cur;
          const past = !now && toMinutes(b.time) < curMinutes;
          return (
            <li
              key={`${b.time}-${b.label}-${b.i}`}
              className={`flex min-h-[48px] items-center gap-3 border px-3 transition ${
                now
                  ? "sys-now border-[color:var(--sys-accent)] bg-[#0c3a66]/60"
                  : past
                    ? "border-transparent opacity-45"
                    : "border-[color:var(--sys-line)]/40"
              }`}
              aria-current={now ? "step" : undefined}
            >
              <span className={`sys-mono w-14 shrink-0 text-[14px] ${now ? "text-[color:var(--sys-accent)]" : "text-[color:var(--sys-dim)]"}`}>
                {b.time}
              </span>
              <span className={`flex-1 text-[15.5px] ${now ? "font-semibold" : ""}`}>{b.label}</span>
              {now && <span className="sys-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--sys-accent)]">Now</span>}
            </li>
          );
        })}
      </ol>
      <p className="sys-mono mt-3 text-[11px] text-[color:var(--sys-faint)]">Edit times and blocks in Settings.</p>
    </Panel>
  );
}
