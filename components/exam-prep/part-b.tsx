"use client";

import { useEffect, useMemo, useState } from "react";
import { BookCheck, ChevronDown, FileText, Pause, PenLine, Play, RotateCcw } from "lucide-react";
import { useBank } from "@/components/exam-prep/bank";
import type { ModelAnswer, PartBQuestion } from "@/lib/exam-prep/types";

const th =
  "px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--text-faint)] border-b border-[color:var(--border)]";
const td = "px-3 py-2 text-[13px] text-[color:var(--text)] border-b border-[color:var(--border)] align-top";

/** A full model answer, laid out the way it should be written in the exam. */
export function ModelAnswerView({ model }: { model: ModelAnswer }) {
  return (
    <div className="space-y-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] p-5">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--accent)]">
        Model answer
      </p>
      <p className="text-[14.5px] leading-relaxed text-[color:var(--text)]">{model.intro}</p>

      {model.sections.map((s) => (
        <div key={s.h}>
          <p className="mb-1 text-[14.5px] font-medium text-[color:var(--text)]">{s.h}</p>
          <ul className="list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-[color:var(--text-muted)] marker:text-[color:var(--text-faint)]">
            {s.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        </div>
      ))}

      {model.table && (
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[color:var(--text)]">{model.table.caption}</p>
          <div className="overflow-x-auto rounded-lg border border-[color:var(--border)]">
            <table className="w-full border-collapse">
              <caption className="sr-only">{model.table.caption}</caption>
              <thead>
                <tr className="bg-[color:var(--surface)]">
                  {model.table.columns.map((c, i) => (
                    <th key={`${c}-${i}`} scope="col" className={th}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {model.table.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className={j === 0 ? `${td} font-medium` : td}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {model.diagram && (
        <p className="rounded-lg bg-[color:var(--accent-soft)] px-3 py-2 text-[13px] leading-relaxed text-[color:var(--text)]">
          <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--accent)]">
            Draw
          </span>
          {model.diagram}
        </p>
      )}

      <div>
        <p className="mb-1 text-[14.5px] font-medium text-[color:var(--text)]">Conclusion</p>
        <p className="text-[14px] leading-relaxed text-[color:var(--text-muted)]">{model.conclusion}</p>
      </div>

      <p className="border-t border-[color:var(--border)] pt-3 text-[12.5px] leading-relaxed text-[color:var(--text-faint)]">
        In the exam, write each point as one or two full sentences and add your own example where you
        can. That turns this into a 1.5–2 page answer (about 400–500 words).
      </p>
    </div>
  );
}

const WRITE_MINUTES = 25;

function fmt(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * Timed writing practice: write your answer against a 25-minute clock, then
 * reveal the model answer and tick off the outline points you covered.
 */
export function PartBPractice({ question }: { question: PartBQuestion }) {
  const { storageKey } = useBank();
  const draftKey = `${storageKey}:partb:${question.id}`;

  // Only mounted after a click (never server-rendered), so reading storage here is safe.
  const [text, setText] = useState(() => {
    try {
      return localStorage.getItem(draftKey) ?? "";
    } catch {
      return "";
    }
  });
  const [left, setLeft] = useState(WRITE_MINUTES * 60);
  const [running, setRunning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(() => question.outline.map(() => false));
  useEffect(() => {
    try {
      localStorage.setItem(draftKey, text);
    } catch {
      /* storage unavailable */
    }
  }, [draftKey, text]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const words = useMemo(() => (text.trim() ? text.trim().split(/\s+/).length : 0), [text]);
  const covered = checked.filter(Boolean).length;
  const selfScore = Math.round((covered / question.outline.length) * 20) / 2;

  return (
    <div className="space-y-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] p-5">
      <div className="flex flex-wrap items-center gap-3">
        <p className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--accent)]">
          <PenLine size={13} /> Write your answer
        </p>
        <p
          className="ml-auto font-mono text-[15px] tabular-nums"
          style={{ color: left <= 120 ? "#b3261e" : "var(--text)" }}
          aria-label="Time left"
        >
          {fmt(left)}
        </p>
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          disabled={left === 0}
          className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border-strong)] px-3 py-1.5 text-[12.5px] text-[color:var(--text)] disabled:opacity-40"
        >
          {running ? <Pause size={13} /> : <Play size={13} />} {running ? "Pause" : "Start timer"}
        </button>
        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setLeft(WRITE_MINUTES * 60);
          }}
          className="inline-flex items-center gap-1.5 text-[12.5px] text-[color:var(--text-faint)] hover:text-[color:var(--text)]"
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        aria-label={`Your answer to: ${question.q}`}
        placeholder="Write as you would in the exam: definition, framework, points with examples, conclusion. Your draft is saved in this browser."
        className="w-full rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--surface)] px-4 py-3 text-[14.5px] leading-relaxed text-[color:var(--text)]"
      />
      <p className="text-[12.5px] text-[color:var(--text-faint)]">
        {words} words · aim for 400–500 in {WRITE_MINUTES} minutes
      </p>

      {!revealed ? (
        <button
          type="button"
          onClick={() => {
            setRevealed(true);
            setRunning(false);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-[color:var(--text)] px-5 py-2.5 text-[14px] font-medium text-[color:var(--bg)] hover:bg-[#3a3830]"
        >
          <BookCheck size={15} /> I’m done — check against the model
        </button>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
            <p className="mb-2 text-[14px] font-medium text-[color:var(--text)]">
              Tick each point your answer covered
            </p>
            <div className="space-y-2">
              {question.outline.map((line, i) => (
                <label key={line} className="flex cursor-pointer items-start gap-2.5 text-[13.5px] leading-snug text-[color:var(--text-muted)]">
                  <input
                    type="checkbox"
                    checked={checked[i]}
                    onChange={() => setChecked((c) => c.map((v, k) => (k === i ? !v : v)))}
                    className="mt-0.5 h-4 w-4 accent-[#3f4a3b]"
                  />
                  <span>{line}</span>
                </label>
              ))}
            </div>
            <p className="mt-3 text-[13.5px] text-[color:var(--text)]">
              Content coverage:{" "}
              <span className="font-medium tabular-nums">
                {covered}/{question.outline.length}
              </span>{" "}
              → roughly <span className="font-medium tabular-nums">{selfScore}/10</span> if each point is
              explained with an example. Presentation (headings, diagram, conclusion) decides the top band.
            </p>
          </div>
          {question.model && <ModelAnswerView model={question.model} />}
        </div>
      )}
    </div>
  );
}

const CHANCE_STYLE = {
  "Very likely": "border-[#e8b9b3] text-[#b3261e] bg-[#fdf1ef]",
  Likely: "border-[#e7d3a1] text-[#8a6410] bg-[#fbf6e8]",
  Possible: "border-[color:var(--border-strong)] text-[color:var(--text-muted)] bg-[color:var(--bg)]",
} as const;

/** Collapsible Part B question: outline, plus model answer and timed writing on demand. */
export function PartBItem({
  question: p,
  number,
  open,
  onToggle,
}: {
  question: PartBQuestion;
  number: number;
  open: boolean;
  onToggle: () => void;
}) {
  const [mode, setMode] = useState<"none" | "model" | "write">("none");

  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-3 px-4 py-3.5 text-left"
      >
        <span className="mt-0.5 font-mono text-[11px] text-[color:var(--text-faint)] tabular-nums">
          {String(number).padStart(2, "0")}
        </span>
        <span className="flex-1">
          <span className="block text-[15px] leading-snug text-[color:var(--text)]">{p.q}</span>
          <span className="mt-1.5 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${CHANCE_STYLE[p.chance]}`}
            >
              {p.chance}
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[color:var(--text-faint)]">
              {p.unit}
            </span>
          </span>
        </span>
        <ChevronDown
          size={16}
          className={`mt-1 shrink-0 text-[color:var(--text-faint)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="space-y-4 px-4 pb-4 sm:pl-11">
          <div>
            <p className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--text-faint)]">
              Outline
            </p>
            <ol className="list-decimal space-y-1.5 pl-4 text-[14px] leading-relaxed text-[color:var(--text-muted)] marker:text-[color:var(--text-faint)]">
              {p.outline.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </div>
          {p.example && (
            <p className="rounded-lg bg-[color:var(--accent-soft)] px-3 py-2 text-[13px] leading-relaxed text-[color:var(--text)]">
              <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--accent)]">
                Example
              </span>
              {p.example}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {p.model && (
              <button
                type="button"
                onClick={() => setMode(mode === "model" ? "none" : "model")}
                aria-pressed={mode === "model"}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] transition-colors ${
                  mode === "model"
                    ? "border-[color:var(--text)] bg-[color:var(--text)] text-[color:var(--bg)]"
                    : "border-[color:var(--border-strong)] text-[color:var(--text)] hover:border-[color:var(--text)]"
                }`}
              >
                <FileText size={14} /> Model answer
              </button>
            )}
            <button
              type="button"
              onClick={() => setMode(mode === "write" ? "none" : "write")}
              aria-pressed={mode === "write"}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] transition-colors ${
                mode === "write"
                  ? "border-[color:var(--text)] bg-[color:var(--text)] text-[color:var(--bg)]"
                  : "border-[color:var(--border-strong)] text-[color:var(--text)] hover:border-[color:var(--text)]"
              }`}
            >
              <PenLine size={14} /> Practise writing (25 min)
            </button>
          </div>
          {mode === "model" && p.model && <ModelAnswerView model={p.model} />}
          {mode === "write" && <PartBPractice question={p} />}
        </div>
      )}
    </div>
  );
}
