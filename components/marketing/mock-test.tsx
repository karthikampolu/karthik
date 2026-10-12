"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Timer } from "lucide-react";
import { UNITS, type Mcq } from "@/lib/data/marketing-mcqs";
import {
  MARK_RIGHT,
  MARK_WRONG,
  MOCK_SIZE,
  buildMock,
  present,
  scoreOf,
  type MockResult,
  type Progress,
  type Shown,
} from "@/components/marketing/engine";
import {
  BAD,
  BAD_BG,
  Card,
  Chip,
  FlashCard,
  GOOD,
  GOOD_BG,
  LevelBadge,
  Options,
} from "@/components/marketing/ui";

type Props = {
  progress: Progress;
  ready: boolean;
  record: (r: { id: string; correct: boolean }[]) => void;
  addMock: (m: MockResult) => void;
  onPracticeWrong: () => void;
};

type Phase = "setup" | "running" | "result";

const TARGET = 28;

function fmtClock(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

export default function MockTest({ progress, ready, record, addMock, onPracticeWrong }: Props) {
  const [phase, setPhase] = useState<Phase>("setup");
  const [minutes, setMinutes] = useState(45);
  const [preferUnseen, setPreferUnseen] = useState(true);

  const [qs, setQs] = useState<Mcq[]>([]);
  const [shown, setShown] = useState<Shown[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [cur, setCur] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [onlyMissed, setOnlyMissed] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [usedSeconds, setUsedSeconds] = useState(0);

  const deadline = useRef(0);
  const answersRef = useRef<(number | null)[]>([]);
  answersRef.current = answers;
  const qsRef = useRef<Mcq[]>([]);
  qsRef.current = qs;
  const shownRef = useRef<Shown[]>([]);
  shownRef.current = shown;

  const start = () => {
    const seed = Math.floor(Math.random() * 1e9);
    const paper = buildMock(progress, preferUnseen, seed);
    setQs(paper);
    setShown(paper.map((q) => present(q, seed)));
    setAnswers(paper.map(() => null));
    setCur(0);
    setOpen(null);
    setOnlyMissed(false);
    deadline.current = Date.now() + minutes * 60 * 1000;
    setRemaining(minutes * 60);
    setPhase("running");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = useCallback(() => {
    const paper = qsRef.current;
    const sh = shownRef.current;
    const ans = answersRef.current;
    let correct = 0;
    let wrong = 0;
    const results: { id: string; correct: boolean }[] = [];
    paper.forEach((q, i) => {
      const a = ans[i];
      if (a === null || a === undefined) return;
      const ok = a === sh[i].correct;
      if (ok) correct++;
      else wrong++;
      results.push({ id: q.id, correct: ok });
    });
    const used = Math.max(
      0,
      Math.round((minutes * 60 * 1000 - Math.max(0, deadline.current - Date.now())) / 1000)
    );
    setUsedSeconds(used);
    record(results);
    addMock({
      t: Date.now(),
      score: scoreOf(correct, wrong),
      max: paper.length * MARK_RIGHT,
      correct,
      wrong,
      skipped: paper.length - correct - wrong,
      minutes: Math.round(used / 60),
    });
    setPhase("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [minutes, record, addMock]);

  // Countdown from a fixed deadline, so a throttled background tab can't drift.
  useEffect(() => {
    if (phase !== "running") return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) submit();
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [phase, submit]);

  const setAnswer = (i: number, v: number | null) =>
    setAnswers((prev) => prev.map((x, k) => (k === i ? v : x)));

  const stats = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    answers.forEach((a, i) => {
      if (a === null || a === undefined || !shown[i]) return;
      if (a === shown[i].correct) correct++;
      else wrong++;
    });
    return { correct, wrong, skipped: qs.length - correct - wrong };
  }, [answers, shown, qs.length]);

  /* ---------------- Setup ---------------- */
  if (phase === "setup") {
    return (
      <div className="space-y-5">
        <Card title="Take a mock Part A">
          <p className="text-[14.5px] leading-relaxed text-[color:var(--text-muted)] mb-4">
            {MOCK_SIZE} questions picked to follow how I expect the real paper to be spread across
            the units (see the Exam guide tab), with a mix of easy, medium and hard. Marking matches
            your paper: <strong className="text-[color:var(--text)]">+{MARK_RIGHT}</strong> for a right
            answer, <strong className="text-[color:var(--text)]">{MARK_WRONG}</strong> for a wrong one,
            0 if you skip. No answers are shown until you submit.
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-5">
            <div>
              <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--text-faint)]">
                Time
              </p>
              <div className="flex flex-wrap gap-2">
                {[20, 30, 45, 60, 90].map((m) => (
                  <Chip key={m} active={minutes === m} onClick={() => setMinutes(m)}>
                    {m} min
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--text-faint)]">
                Questions
              </p>
              <Chip active={preferUnseen} onClick={() => setPreferUnseen((v) => !v)}>
                {preferUnseen ? "prefer unseen" : "any"}
              </Chip>
            </div>
          </div>

          <button
            type="button"
            disabled={!ready}
            onClick={start}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--text)] px-6 py-3 text-[15px] font-medium text-[color:var(--bg)] hover:bg-[#3a3830] disabled:opacity-50"
          >
            <Timer size={16} /> Start mock
          </button>
          <p className="mt-3 text-[12.5px] text-[color:var(--text-faint)]">
            Your real exam gives you 90 minutes for the OMR part, so 45 minutes is a good pace to
            train for. Aim for {TARGET}/30.
          </p>
        </Card>
      </div>
    );
  }

  /* ---------------- Running ---------------- */
  if (phase === "running" && qs[cur] && shown[cur]) {
    const q = qs[cur];
    const low = remaining <= 120;
    return (
      <div className="space-y-4">
        <div className="sticky top-16 z-30 -mx-1 flex items-center gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)]/95 px-4 py-2.5 backdrop-blur">
          <p
            className="inline-flex items-center gap-2 font-mono text-[15px] tabular-nums"
            style={{ color: low ? BAD : "var(--text)" }}
            aria-label="Time remaining"
          >
            <Timer size={15} /> {fmtClock(remaining)}
          </p>
          <p className="text-[12.5px] text-[color:var(--text-muted)] tabular-nums">
            {stats.correct + stats.wrong} / {qs.length} answered
          </p>
          <button
            type="button"
            onClick={() => {
              const left = qs.length - (stats.correct + stats.wrong);
              if (left === 0 || window.confirm(`${left} question(s) are unanswered. Submit anyway?`)) submit();
            }}
            className="ml-auto rounded-full bg-[color:var(--text)] px-4 py-1.5 text-[13px] font-medium text-[color:var(--bg)] hover:bg-[#3a3830]"
          >
            Submit
          </button>
        </div>

        <Card>
          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--text-faint)]">
              Question {cur + 1} of {qs.length}
            </span>
          </div>
          <p className="mb-4 text-[17px] leading-snug text-[color:var(--text)]">{q.q}</p>
          <Options
            shown={shown[cur]}
            picked={answers[cur]}
            locked={false}
            onPick={(i) => setAnswer(cur, i)}
          />
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCur((c) => Math.max(0, c - 1))}
              disabled={cur === 0}
              className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border-strong)] px-4 py-2 text-[13.5px] text-[color:var(--text)] disabled:opacity-40"
            >
              <ChevronLeft size={15} /> Prev
            </button>
            <button
              type="button"
              onClick={() => setAnswer(cur, null)}
              disabled={answers[cur] === null}
              className="text-[13px] text-[color:var(--text-muted)] underline-offset-2 hover:underline disabled:opacity-40"
            >
              Clear answer
            </button>
            <button
              type="button"
              onClick={() => setCur((c) => Math.min(qs.length - 1, c + 1))}
              disabled={cur === qs.length - 1}
              className="ml-auto inline-flex items-center gap-1 rounded-full bg-[color:var(--text)] px-5 py-2 text-[13.5px] font-medium text-[color:var(--bg)] disabled:opacity-40"
            >
              Next <ChevronRight size={15} />
            </button>
          </div>
        </Card>

        <Card title="Question palette">
          <div className="flex flex-wrap gap-1.5">
            {qs.map((_, i) => {
              const answered = answers[i] !== null;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCur(i)}
                  aria-label={`Go to question ${i + 1}${answered ? " (answered)" : ""}`}
                  className={`h-8 w-8 rounded-md border text-[12px] tabular-nums transition-colors ${
                    i === cur
                      ? "border-[color:var(--text)] bg-[color:var(--text)] text-[color:var(--bg)]"
                      : answered
                        ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                        : "border-[color:var(--border-strong)] text-[color:var(--text-muted)] hover:border-[color:var(--accent)]"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    );
  }

  /* ---------------- Result ---------------- */
  const score = scoreOf(stats.correct, stats.wrong);
  const gap = TARGET - score;
  const perUnit = UNITS.map((u) => {
    let total = 0;
    let right = 0;
    qs.forEach((q, i) => {
      if (q.set !== u.id) return;
      total++;
      if (answers[i] === shown[i]?.correct) right++;
    });
    return { u, total, right };
  }).filter((x) => x.total > 0);

  const rows = qs
    .map((q, i) => ({ q, i, a: answers[i], s: shown[i] }))
    .filter((r) => (onlyMissed ? r.a !== r.s.correct : true));

  return (
    <div className="space-y-5">
      <Card>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--text-faint)] mb-1">
          Your score
        </p>
        <p className="font-display text-[44px] leading-none text-[color:var(--text)] tabular-nums">
          {score.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1")}
          <span className="text-[22px] text-[color:var(--text-faint)]"> / {qs.length}</span>
        </p>
        <p className="mt-2 text-[14.5px] text-[color:var(--text-muted)]">
          {gap <= 0
            ? `That's at or above the ${TARGET}/30 target. Keep taking fresh mocks to confirm it holds.`
            : `${gap.toFixed(2).replace(/\.00$/, "")} marks short of the ${TARGET}/30 target. Review the misses below, then retake.`}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { l: "Right", v: stats.correct, c: GOOD },
            { l: "Wrong", v: stats.wrong, c: BAD },
            { l: "Skipped", v: stats.skipped, c: "var(--text-muted)" },
            { l: "Time used", v: fmtClock(usedSeconds), c: "var(--text)" },
          ].map((s) => (
            <div key={s.l} className="rounded-lg border border-[color:var(--border)] bg-[color:var(--bg)] p-3">
              <p className="font-display text-[22px] tabular-nums" style={{ color: s.c }}>
                {s.v}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--text-faint)]">
                {s.l}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setPhase("setup")}
            className="rounded-full bg-[color:var(--text)] px-5 py-2.5 text-[14px] font-medium text-[color:var(--bg)] hover:bg-[#3a3830]"
          >
            New mock
          </button>
          {stats.wrong > 0 && (
            <button
              type="button"
              onClick={onPracticeWrong}
              className="rounded-full border border-[color:var(--border-strong)] px-5 py-2.5 text-[14px] text-[color:var(--text)] hover:border-[color:var(--text)]"
            >
              Practice my wrong answers
            </button>
          )}
        </div>
      </Card>

      <Card title="By unit">
        <div className="space-y-2">
          {perUnit.map(({ u, total, right }) => (
            <div key={u.id} className="flex items-center gap-3 text-[13.5px]">
              <span className="w-16 shrink-0 font-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--text-faint)]">
                {u.short}
              </span>
              <span className="flex-1 text-[color:var(--text-muted)] truncate">{u.name}</span>
              <span className="tabular-nums text-[color:var(--text)]">
                {right} / {total}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <p className="font-display text-[19px] text-[color:var(--text)]">Review every question</p>
        <Chip active={onlyMissed} onClick={() => setOnlyMissed((v) => !v)}>
          only missed or skipped
        </Chip>
      </div>

      <div className="space-y-2.5">
        {rows.length === 0 && (
          <Card>
            <p className="text-[14px] text-[color:var(--text-muted)]">
              Nothing missed. Every question was right.
            </p>
          </Card>
        )}
        {rows.map(({ q, i, a, s }) => {
          const skipped = a === null || a === undefined;
          const right = !skipped && a === s.correct;
          const isOpen = open === i;
          return (
            <div
              key={q.id}
              className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)]"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-3 px-4 py-3 text-left"
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px]"
                  style={{
                    background: skipped ? "var(--border)" : right ? GOOD_BG : BAD_BG,
                    color: skipped ? "var(--text-muted)" : right ? GOOD : BAD,
                  }}
                >
                  {i + 1}
                </span>
                <span className="flex-1 text-[14.5px] leading-snug text-[color:var(--text)]">{q.q}</span>
                <LevelBadge level={q.level} />
                <ChevronDown
                  size={16}
                  className={`mt-1 shrink-0 text-[color:var(--text-faint)] transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="space-y-3 px-4 pb-4">
                  <Options
                    shown={s}
                    picked={skipped ? null : a}
                    locked
                    onPick={() => {}}
                  />
                  {skipped && (
                    <p className="text-[12.5px] text-[color:var(--text-faint)]">You skipped this one.</p>
                  )}
                  <FlashCard q={q} shown={s} picked={skipped ? -1 : (a as number)} skipped={skipped} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
