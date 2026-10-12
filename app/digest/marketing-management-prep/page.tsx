import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import MarketingPrep from "@/components/marketing/marketing-prep";
import { ExamGate, ExamLockButton } from "@/components/exam-gate";
import { hasExamAccess, isExamAccessConfigured } from "@/lib/exam-access";
import { BANK_BY_SET, UNITS } from "@/lib/data/marketing-mcqs";
import { GUIDE } from "@/lib/data/marketing-mcqs/exam-guide";
import type { Metadata } from "next";

const PATH = "/digest/marketing-management-prep";

export const metadata: Metadata = {
  title: "Marketing Management Exam Prep — AK",
  description:
    "Learn by doing: practice MCQs for Marketing Management-I with flashcards, timed mock tests and a progress dashboard. Private, access code required.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Marketing Management — learn by doing",
    description: "Practice MCQs with flashcards and timed mock tests. Access code required.",
    type: "article",
  },
};

export default async function MarketingPrepPage() {
  const unlocked = await hasExamAccess();

  // The question bank is only sent to the browser after the access code has
  // been verified on the server.
  const data = unlocked ? { units: UNITS, bySet: BANK_BY_SET, guide: GUIDE } : null;

  return (
    <Container className="max-w-4xl py-20 md:py-28">
      <div className="flex items-start justify-between gap-4">
        <Eyebrow>Digest · Study</Eyebrow>
        {unlocked && <ExamLockButton returnTo={PATH} />}
      </div>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-4">
        Marketing Management: learn by doing
      </h1>
      <p className="text-[17px] leading-relaxed text-[color:var(--text-muted)] max-w-2xl">
        Pick an answer and a flashcard flips open with the right answer and the reason behind it.
        Questions are spread across all six units at easy, medium and hard levels, the ones you miss
        come back for revision, and timed mocks use the same marking as the exam.
      </p>

      {data ? (
        <>
          <div className="mt-6 max-w-2xl rounded-lg border-l-[3px] border-[color:var(--accent)] bg-[color:var(--accent-soft)] px-5 py-4">
            <p className="text-[13.5px] leading-relaxed text-[color:var(--text)]">
              Made for the MKTM503 syllabus and written from Kotler &amp; Keller, Marketing
              Management. Where your faculty's notes differ, go with your notes. Your progress is
              saved in this browser only.
            </p>
          </div>
          <MarketingPrep data={data} />
        </>
      ) : (
        <ExamGate returnTo={PATH} configured={isExamAccessConfigured()} />
      )}
    </Container>
  );
}
