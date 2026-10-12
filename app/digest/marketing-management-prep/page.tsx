import GatedExamPage from "@/components/exam-prep/gated-exam-page";
import { BANK_BY_SET, UNITS } from "@/lib/data/marketing-mcqs";
import { GUIDE } from "@/lib/data/marketing-mcqs/exam-guide";
import type { Metadata } from "next";

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

export default function MarketingPrepPage() {
  return (
    <GatedExamPage
      path="/digest/marketing-management-prep"
      title="Marketing Management: learn by doing"
      intro="Pick an answer and a flashcard flips open with the right answer and the reason behind it. Questions are spread across all six units at easy, medium and hard levels, the ones you miss come back for revision, and timed mocks use the same marking as the exam."
      note="Made for the MKTM503 syllabus and written from Kotler & Keller, Marketing Management. Where your faculty's notes differ, go with your notes. Your progress is saved in this browser only."
      storageKey="mktm503"
      load={() => ({ units: UNITS, bySet: BANK_BY_SET, guide: GUIDE })}
    />
  );
}
