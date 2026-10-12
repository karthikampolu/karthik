"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useBank } from "@/components/exam-prep/bank";
import { Card } from "@/components/exam-prep/ui";

const th =
  "px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--text-faint)] border-b border-[color:var(--border)] whitespace-nowrap";
const td = "px-3 py-2.5 text-[13.5px] text-[color:var(--text)] border-b border-[color:var(--border)] align-top";

const CHANCE_STYLE = {
  "Very likely": "border-[#e8b9b3] text-[#b3261e] bg-[#fdf1ef]",
  Likely: "border-[#e7d3a1] text-[#8a6410] bg-[#fbf6e8]",
  Possible: "border-[color:var(--border-strong)] text-[color:var(--text-muted)] bg-[color:var(--bg)]",
} as const;

export default function ExamGuide() {
  const bank = useBank();
  const { FORMAT, STYLES, PART_B, ANSWER_TEMPLATE, TIME_PLAN, DAYS, MARKING_MATH, SOURCE_NOTE } = bank.guide;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-6">
      <Card title="Paper format">
        <dl className="space-y-2">
          {FORMAT.map((f) => (
            <div key={f.k} className="flex gap-4 text-[14px]">
              <dt className="w-20 shrink-0 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--text-faint)] pt-0.5">
                {f.k}
              </dt>
              <dd className="text-[color:var(--text-muted)] leading-relaxed">{f.v}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card title="How a new paper is likely to be built">
        <p className="text-[14px] leading-relaxed text-[color:var(--text-muted)] mb-4">
          The uploaded sample leaned hard on Unit V and Unit III and had nothing from Unit VI. The
          sample itself says the real paper may differ, so my prediction pulls it back toward the full
          syllabus. The mock tests in this app follow the “My prediction” column.
        </p>
        <div className="overflow-x-auto rounded-lg border border-[color:var(--border)]">
          <table className="w-full border-collapse">
            <caption className="sr-only">Part A questions by unit: sample paper, prediction and question bank size</caption>
            <thead>
              <tr className="bg-[color:var(--bg)]">
                <th className={th}>Unit</th>
                <th className={th}>Sample paper</th>
                <th className={th}>My prediction</th>
                <th className={th}>Questions here</th>
              </tr>
            </thead>
            <tbody>
              {bank.units.map((u) => (
                <tr key={u.id}>
                  <td className={td}>
                    <span className="font-medium">{u.short}</span>
                    <span className="text-[color:var(--text-muted)]"> · {u.name}</span>
                    <p className="mt-1 text-[12px] leading-snug text-[color:var(--text-faint)]">{u.syllabus}</p>
                  </td>
                  <td className={`${td} tabular-nums`}>{u.inSample}</td>
                  <td className={`${td} tabular-nums font-medium`}>{u.expected}</td>
                  <td className={`${td} tabular-nums`}>{bank.bySet[u.id].length}</td>
                </tr>
              ))}
              <tr className="bg-[color:var(--bg)]">
                <td className={`${td} font-medium`}>Total</td>
                <td className={`${td} tabular-nums font-medium`}>30</td>
                <td className={`${td} tabular-nums font-medium`}>30</td>
                <td className={`${td} tabular-nums font-medium`}>
                  {bank.unitBank.length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[12.5px] text-[color:var(--text-faint)]">
          Difficulty in a mock: about 4 in 10 easy, 4 in 10 medium and 2 in 10 hard. In the sample,
          most questions were straight recall or a short scenario; only a few asked you to judge “the
          most suitable” option.
        </p>
      </Card>

      <Card title="Question styles to expect in Part A">
        <div className="space-y-3">
          {STYLES.map((s) => (
            <div key={s.name} className="flex gap-3">
              <p className="w-28 shrink-0 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[color:var(--accent)] pt-0.5">
                {s.share}
              </p>
              <div>
                <p className="text-[14.5px] font-medium text-[color:var(--text)]">{s.name}</p>
                <p className="text-[13.5px] leading-relaxed text-[color:var(--text-muted)]">{s.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div>
        <p className="font-display text-[22px] text-[color:var(--text)] mb-1">Predicted Part B questions</p>
        <p className="text-[14px] leading-relaxed text-[color:var(--text-muted)] mb-4">
          You attempt 4 of 5, so you need about 6 well-prepared answers, not all 12. Choose the “very
          likely” ones first. Each outline is the skeleton of a full-marks answer.
        </p>
        <div className="space-y-2.5">
          {PART_B.map((p, i) => {
            const isOpen = open === i;
            return (
              <div
                key={p.q}
                className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-3 px-4 py-3.5 text-left"
                >
                  <span className="mt-0.5 font-mono text-[11px] text-[color:var(--text-faint)] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
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
                    className={`mt-1 shrink-0 text-[color:var(--text-faint)] transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pl-11">
                    <ol className="list-decimal space-y-1.5 pl-4 text-[14px] leading-relaxed text-[color:var(--text-muted)] marker:text-[color:var(--text-faint)]">
                      {p.outline.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ol>
                    {p.example && (
                      <p className="mt-3 rounded-lg bg-[color:var(--accent-soft)] px-3 py-2 text-[13px] leading-relaxed text-[color:var(--text)]">
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--accent)] mr-2">
                          Example
                        </span>
                        {p.example}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title="How to write a 10-mark answer">
          <ol className="list-decimal space-y-1.5 pl-4 text-[14px] leading-relaxed text-[color:var(--text-muted)] marker:text-[color:var(--text-faint)]">
            {ANSWER_TEMPLATE.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        </Card>
        <Card title="Time plan for the 3 hours">
          <div className="space-y-3">
            {TIME_PLAN.map((t) => (
              <div key={t.part}>
                <p className="text-[14px] text-[color:var(--text)]">
                  <span className="font-medium">{t.part}</span>
                  <span className="text-[color:var(--text-faint)]"> · {t.mins}</span>
                </p>
                <p className="text-[13px] leading-relaxed text-[color:var(--text-muted)]">{t.note}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="The 0.25 deduction, in numbers">
        <ul className="list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-[color:var(--text-muted)] marker:text-[color:var(--text-faint)]">
          {MARKING_MATH.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </Card>

      <Card title="Your 5-day plan">
        <div className="space-y-3">
          {DAYS.map((d) => (
            <div key={d.d} className="flex gap-4">
              <p className="w-14 shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--accent)] pt-0.5">
                {d.d}
              </p>
              <div>
                <p className="text-[14.5px] font-medium text-[color:var(--text)]">{d.t}</p>
                <p className="text-[13.5px] leading-relaxed text-[color:var(--text-muted)]">{d.s}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="rounded-lg border-l-[3px] border-[color:var(--accent)] bg-[color:var(--accent-soft)] px-5 py-4">
        <p className="text-[13.5px] leading-relaxed text-[color:var(--text)]">{SOURCE_NOTE}</p>
      </div>
    </div>
  );
}
