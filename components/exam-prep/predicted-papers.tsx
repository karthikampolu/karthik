"use client";

import { useState } from "react";
import { useBank } from "@/components/exam-prep/bank";
import MockTest from "@/components/exam-prep/mock-test";
import { PartBItem } from "@/components/exam-prep/part-b";
import { Chip } from "@/components/exam-prep/ui";
import type { MockResult, Progress } from "@/components/exam-prep/engine";

type Props = {
  progress: Progress;
  ready: boolean;
  record: (r: { id: string; correct: boolean }[]) => void;
  addMock: (m: MockResult) => void;
  onPracticeWrong: () => void;
};

/** Full predicted papers: a fixed timed Part A, then five Part B questions. */
export default function PredictedPapers(props: Props) {
  const { guide } = useBank();
  const papers = guide.PAPERS;
  const [sel, setSel] = useState(0);
  const [openB, setOpenB] = useState<number | null>(null);
  const paper = papers[sel];

  if (!paper) {
    return <p className="text-[14px] text-[color:var(--text-muted)]">No predicted papers yet.</p>;
  }

  const partB = paper.partB
    .map((id) => guide.PART_B.find((q) => q.id === id))
    .filter((q): q is NonNullable<typeof q> => !!q);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
        <p className="font-display text-[19px] text-[color:var(--text)] mb-1">Full predicted papers</p>
        <p className="text-[14px] leading-relaxed text-[color:var(--text-muted)] mb-4">
          Each paper is laid out like the real one: 30 MCQs in Part A, then five 10-mark questions in
          Part B, of which you answer any four. For a full dry run, do Part A on the timer, then write
          four Part B answers at about 28 minutes each, and check them against the model answers.
        </p>
        <div className="flex flex-wrap gap-2">
          {papers.map((p, i) => (
            <Chip
              key={p.id}
              active={sel === i}
              onClick={() => {
                setSel(i);
                setOpenB(null);
              }}
            >
              {p.title}
            </Chip>
          ))}
        </div>
      </div>

      <section aria-labelledby="pp-part-a">
        <h3 id="pp-part-a" className="font-display text-[22px] text-[color:var(--text)] mb-3">
          Part A · 30 × 1 mark
        </h3>
        <MockTest key={paper.id} {...props} paper={{ title: paper.title, ids: paper.partA }} />
      </section>

      <section aria-labelledby="pp-part-b">
        <h3 id="pp-part-b" className="font-display text-[22px] text-[color:var(--text)] mb-1">
          Part B · attempt any 4 of 5 · 10 marks each
        </h3>
        <p className="text-[14px] leading-relaxed text-[color:var(--text-muted)] mb-4">
          Pick your four the way you would in the hall: the ones you can answer most completely, with
          examples. Open a question to write against the clock, then compare with the model answer.
        </p>
        <div className="space-y-2.5">
          {partB.map((q, i) => (
            <PartBItem
              key={`${paper.id}-${q.id}`}
              question={q}
              number={i + 2}
              open={openB === i}
              onToggle={() => setOpenB(openB === i ? null : i)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
