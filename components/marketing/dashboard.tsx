"use client";

import { useMemo } from "react";
import { UNITS, UNIT_BANK, BANK_BY_SET } from "@/lib/data/marketing-mcqs";
import {
  tally,
  weakTopics,
  type MockResult,
  type Progress,
} from "@/components/marketing/engine";
import { Bar, Card } from "@/components/marketing/ui";
import type { PracticePreset } from "@/components/marketing/practice";

type Props = {
  progress: Progress;
  mocks: MockResult[];
  onPractice: (p: PracticePreset) => void;
  onReset: () => void;
};

const TARGET = 28;

export default function Dashboard({ progress, mocks, onPractice, onReset }: Props) {
  const overall = useMemo(() => tally(UNIT_BANK, progress), [progress]);
  const levels = useMemo(
    () =>
      (["easy", "medium", "hard"] as const).map((l) => {
        const qs = UNIT_BANK.filter((q) => q.level === l);
        return { l, ...tally(qs, progress), count: qs.length };
      }),
    [progress]
  );
  const weak = useMemo(() => weakTopics(progress), [progress]);

  const lastThree = mocks.slice(-3);
  const avg = lastThree.length ? lastThree.reduce((a, m) => a + m.score, 0) / lastThree.length : null;
  const best = mocks.length ? Math.max(...mocks.map((m) => m.score)) : null;
  const maxBar = 30;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { l: "Mastered", v: `${overall.mastered}`, s: `of ${overall.total}` },
          { l: "Attempted", v: `${overall.attempted}`, s: `of ${overall.total}` },
          {
            l: "Accuracy",
            v: overall.n ? `${Math.round((overall.c / overall.n) * 100)}%` : "—",
            s: `${overall.n} answers`,
          },
          { l: "To revise", v: `${overall.wrongNow}`, s: "last answer wrong" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
            <p className="font-display text-[28px] leading-none text-[color:var(--text)] tabular-nums">{s.v}</p>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--text-faint)]">
              {s.l}
            </p>
            <p className="text-[12px] text-[color:var(--text-muted)]">{s.s}</p>
          </div>
        ))}
      </div>

      <Card title="Readiness for 28 / 30">
        {mocks.length === 0 ? (
          <p className="text-[14px] leading-relaxed text-[color:var(--text-muted)]">
            No mocks yet. Take one from the Mock test tab; your scores will chart here against the
            28/30 target.
          </p>
        ) : (
          <>
            <div className="relative">
              <div className="flex h-36 items-end gap-1.5 border-b border-[color:var(--border-strong)]">
                {mocks.map((m, i) => (
                  <div key={m.t} className="flex flex-1 flex-col items-center justify-end h-full">
                    <span className="mb-1 text-[10.5px] tabular-nums text-[color:var(--text-muted)]">
                      {Number(m.score.toFixed(1))}
                    </span>
                    <div
                      className="w-full max-w-8 rounded-t"
                      style={{
                        height: `${Math.max(2, (Math.max(0, m.score) / maxBar) * 100)}%`,
                        background: m.score >= TARGET ? "#2f6b3f" : "var(--accent)",
                        opacity: i === mocks.length - 1 ? 1 : 0.55,
                      }}
                      title={`Mock ${i + 1}: ${m.score} / ${m.max}`}
                    />
                  </div>
                ))}
              </div>
              <div
                className="pointer-events-none absolute left-0 right-0 border-t border-dashed border-[#2f6b3f]"
                style={{ bottom: `${(TARGET / maxBar) * 100}%` }}
              >
                <span className="absolute right-0 -top-4 text-[10.5px] text-[#2f6b3f]">target {TARGET}</span>
              </div>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--text-muted)]">
              {mocks.length} mock{mocks.length === 1 ? "" : "s"} taken · best{" "}
              <span className="font-medium text-[color:var(--text)] tabular-nums">{Number((best ?? 0).toFixed(2))}</span>
              {avg !== null && (
                <>
                  {" "}· average of the last {lastThree.length}{" "}
                  <span className="font-medium text-[color:var(--text)] tabular-nums">{Number(avg.toFixed(2))}</span>
                </>
              )}
              . {avg !== null && avg >= TARGET
                ? "You're averaging at the target. Keep mixing in unseen questions."
                : "Review each mock's misses, then retake until your average clears 28."}
            </p>
          </>
        )}
      </Card>

      <Card title="Progress by unit">
        <div className="space-y-4">
          {UNITS.map((u) => {
            const t = tally(BANK_BY_SET[u.id], progress);
            return (
              <div key={u.id}>
                <div className="mb-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="text-[14.5px] text-[color:var(--text)]">
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--text-faint)] mr-2">
                      {u.short}
                    </span>
                    {u.name}
                  </p>
                  <p className="ml-auto text-[12.5px] tabular-nums text-[color:var(--text-muted)]">
                    {t.mastered} mastered · {t.attempted} / {t.total} tried
                    {t.n > 0 && ` · ${Math.round((t.c / t.n) * 100)}% accuracy`}
                  </p>
                </div>
                <Bar value={t.total ? t.mastered / t.total : 0} tone={t.total && t.mastered / t.total >= 0.8 ? "good" : "accent"} />
                <div className="mt-1.5 flex gap-3 text-[12px]">
                  <button
                    type="button"
                    onClick={() => onPractice({ unit: u.id, status: "all" })}
                    className="text-[color:var(--accent)] hover:underline"
                  >
                    Practice
                  </button>
                  {t.wrongNow > 0 && (
                    <button
                      type="button"
                      onClick={() => onPractice({ unit: u.id, status: "wrong" })}
                      className="text-[#b3261e] hover:underline"
                    >
                      Revise {t.wrongNow} wrong
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title="By difficulty">
          <div className="space-y-3">
            {levels.map((x) => (
              <div key={x.l}>
                <p className="mb-1 flex justify-between text-[13.5px]">
                  <span className="capitalize text-[color:var(--text)]">{x.l}</span>
                  <span className="tabular-nums text-[color:var(--text-muted)]">
                    {x.n ? `${Math.round((x.c / x.n) * 100)}% accuracy` : "not started"} · {x.mastered}/{x.count}
                  </span>
                </p>
                <Bar value={x.count ? x.mastered / x.count : 0} />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Weakest topics">
          {weak.length === 0 ? (
            <p className="text-[14px] leading-relaxed text-[color:var(--text-muted)]">
              Nothing flagged yet. Topics show up here once you've answered at least two questions
              from them and are below 75%.
            </p>
          ) : (
            <ul className="space-y-2">
              {weak.map((w) => (
                <li key={`${w.unit}-${w.topic}`} className="flex items-baseline gap-2 text-[13.5px]">
                  <span className="text-[color:var(--text)]">{w.topic}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[color:var(--text-faint)]">
                    {w.unit.replace("u", "Unit ")}
                  </span>
                  <span className="ml-auto tabular-nums text-[#b3261e]">{Math.round(w.acc * 100)}%</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onPractice({ unit: "all", status: "wrong" })}
          className="rounded-full bg-[color:var(--text)] px-5 py-2.5 text-[14px] font-medium text-[color:var(--bg)] hover:bg-[#3a3830]"
        >
          Revise all my wrong answers
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Clear all saved progress and mock scores on this device?")) onReset();
          }}
          className="text-[13px] text-[color:var(--text-faint)] hover:text-[#b3261e]"
        >
          Reset my progress
        </button>
      </div>
    </div>
  );
}
