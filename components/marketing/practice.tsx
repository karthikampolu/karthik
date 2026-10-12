"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, Shuffle } from "lucide-react";
import {
  UNITS,
  BANK_BY_SET,
  UNIT_BANK,
  type Mcq,
} from "@/lib/data/marketing-mcqs";
import {
  poolFor,
  present,
  shuffled,
  tally,
  type LevelFilter,
  type Progress,
  type StatusFilter,
  type UnitFilter,
} from "@/components/marketing/engine";
import { Bar, Card, Chip, FlashCard, LevelBadge, Options } from "@/components/marketing/ui";

export type PracticePreset = {
  unit?: UnitFilter;
  level?: LevelFilter;
  status?: StatusFilter;
};

type Props = {
  progress: Progress;
  ready: boolean;
  record: (r: { id: string; correct: boolean }[]) => void;
  preset?: PracticePreset;
  /** Keyboard shortcuts only listen while this tab is the visible one. */
  active: boolean;
};

export default function Practice({ progress, ready, record, preset, active }: Props) {
  const [unit, setUnit] = useState<UnitFilter>(preset?.unit ?? "all");
  const [level, setLevel] = useState<LevelFilter>(preset?.level ?? "all");
  const [status, setStatus] = useState<StatusFilter>(preset?.status ?? "all");
  const [shuffleOn, setShuffleOn] = useState(true);
  const [round, setRound] = useState(0);
  const [session] = useState(() => Math.floor(Math.random() * 1e9));

  const [queue, setQueue] = useState<Mcq[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [run, setRun] = useState({ right: 0, wrong: 0 });

  // The queue is frozen when filters change, so answering a question never
  // reshuffles the list under you (e.g. a "wrong" question leaving the pool).
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    if (!ready) return;
    const pool = poolFor(unit, level, status, progressRef.current);
    setQueue(shuffleOn ? shuffled(pool, session + round * 7919) : pool);
    setIdx(0);
    setPicked(null);
    setRun({ right: 0, wrong: 0 });
  }, [unit, level, status, shuffleOn, round, ready, session]);

  const q = queue[idx];
  const shown = useMemo(() => (q ? present(q, session) : null), [q, session]);
  const done = queue.length > 0 && idx >= queue.length;

  const pick = useCallback(
    (i: number) => {
      if (!q || !shown || picked !== null) return;
      setPicked(i);
      const correct = i === shown.correct;
      setRun((r) => ({ right: r.right + (correct ? 1 : 0), wrong: r.wrong + (correct ? 0 : 1) }));
      record([{ id: q.id, correct }]);
    },
    [q, shown, picked, record]
  );

  const next = useCallback(() => {
    setIdx((i) => i + 1);
    setPicked(null);
  }, []);

  // Keyboard: 1-4 / A-D to answer, Enter / Space / → for the next question.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && /^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName)) return;
      if (!q) return;
      if (picked === null) {
        const k = e.key.toLowerCase();
        const map: Record<string, number> = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 };
        if (k in map) {
          e.preventDefault();
          pick(map[k]);
        }
      } else if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [q, picked, pick, next, active]);

  const unitCounts = useMemo(() => {
    const m: Record<string, number> = { all: UNIT_BANK.length, sp: BANK_BY_SET.sp.length };
    for (const u of UNITS) m[u.id] = BANK_BY_SET[u.id].length;
    return m;
  }, []);

  const overall = useMemo(() => tally(UNIT_BANK, progress), [progress]);

  return (
    <div className="space-y-5">
      {/* ---------------- Filters ---------------- */}
      <Card>
        <div className="space-y-4">
          <div>
            <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--text-faint)]">
              Unit
            </p>
            <div className="flex flex-wrap gap-2">
              <Chip active={unit === "all"} onClick={() => setUnit("all")}>
                All · {unitCounts.all}
              </Chip>
              {UNITS.map((u) => (
                <Chip
                  key={u.id}
                  active={unit === u.id}
                  onClick={() => setUnit(u.id)}
                  title={u.name}
                >
                  {u.short.replace("Unit ", "")} · {unitCounts[u.id]}
                </Chip>
              ))}
              <Chip
                active={unit === "sp"}
                onClick={() => setUnit("sp")}
                title="The 30 questions from your uploaded sample paper"
              >
                Sample paper · {unitCounts.sp}
              </Chip>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <div>
              <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--text-faint)]">
                Level
              </p>
              <div className="flex flex-wrap gap-2">
                {(["all", "easy", "medium", "hard"] as const).map((l) => (
                  <Chip key={l} active={level === l} onClick={() => setLevel(l)}>
                    {l}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--text-faint)]">
                Show
              </p>
              <div className="flex flex-wrap gap-2">
                {(["all", "unseen", "wrong", "mastered"] as const).map((s) => (
                  <Chip key={s} active={status === s} onClick={() => setStatus(s)}>
                    {s === "wrong" ? "my wrong ones" : s}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--text-faint)]">
                Order
              </p>
              <Chip active={shuffleOn} onClick={() => setShuffleOn((v) => !v)}>
                <span className="inline-flex items-center gap-1.5">
                  <Shuffle size={11} /> {shuffleOn ? "shuffled" : "in order"}
                </span>
              </Chip>
            </div>
          </div>
        </div>
      </Card>

      {/* ---------------- Progress strip ---------------- */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] text-[color:var(--text-muted)]">
        <span>
          Question{" "}
          <span className="font-medium text-[color:var(--text)] tabular-nums">
            {queue.length ? Math.min(idx + 1, queue.length) : 0} / {queue.length}
          </span>
        </span>
        <span>
          This round:{" "}
          <span className="text-[#2f6b3f] font-medium tabular-nums">{run.right} right</span>
          {" · "}
          <span className="text-[#b3261e] font-medium tabular-nums">{run.wrong} wrong</span>
        </span>
        <span className="sm:ml-auto tabular-nums">
          Overall mastered {overall.mastered} / {overall.total}
        </span>
      </div>
      <Bar value={queue.length ? idx / queue.length : 0} />

      {/* ---------------- Question ---------------- */}
      {!ready ? (
        <Card>
          <p className="text-[14px] text-[color:var(--text-muted)]">Loading your progress…</p>
        </Card>
      ) : queue.length === 0 ? (
        <Card>
          <p className="font-display text-[18px] text-[color:var(--text)] mb-1">Nothing to show here</p>
          <p className="text-[14px] text-[color:var(--text-muted)]">
            No questions match these filters
            {status === "wrong" && " — you have no wrong answers saved yet. Answer some questions first."}
            {status === "mastered" && " — nothing mastered yet."}
            {status === "unseen" && " — you've seen every question that matches. Nice."}
            {" "}Try widening the filters.
          </p>
        </Card>
      ) : done ? (
        <Card>
          <p className="font-display text-[22px] text-[color:var(--text)] mb-1">Round complete</p>
          <p className="text-[14.5px] text-[color:var(--text-muted)] mb-4">
            {run.right} right, {run.wrong} wrong out of {queue.length} (
            {Math.round((run.right / queue.length) * 100)}%).
            {run.wrong > 0 && " The ones you missed are saved under “my wrong ones”."}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setRound((r) => r + 1)}
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--text)] px-5 py-2.5 text-[14px] font-medium text-[color:var(--bg)] hover:bg-[#3a3830]"
            >
              <RotateCcw size={14} /> Go again
            </button>
            {run.wrong > 0 && status !== "wrong" && (
              <button
                type="button"
                onClick={() => setStatus("wrong")}
                className="rounded-full border border-[color:var(--border-strong)] px-5 py-2.5 text-[14px] text-[color:var(--text)] hover:border-[color:var(--text)]"
              >
                Review my wrong ones
              </button>
            )}
          </div>
        </Card>
      ) : q && shown ? (
        <div className="space-y-4">
          <Card>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <LevelBadge level={q.level} />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--text-faint)]">
                {q.set === "sp" ? "Sample paper" : UNITS.find((u) => u.id === q.set)?.short} · {q.topic}
              </span>
              <span className="ml-auto hidden sm:block text-[11px] text-[color:var(--text-faint)]">
                Keys: 1–4 or A–D
              </span>
            </div>
            <p className="mb-4 text-[17px] leading-snug text-[color:var(--text)]">{q.q}</p>
            <Options shown={shown} picked={picked} locked={picked !== null} onPick={pick} />
          </Card>

          {picked !== null && (
            <FlashCard
              key={q.id}
              q={q}
              shown={shown}
              picked={picked}
              onNext={next}
              nextLabel={idx + 1 >= queue.length ? "Finish round" : "Next question"}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}
