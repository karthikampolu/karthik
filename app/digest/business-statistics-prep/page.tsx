import GatedExamPage from "@/components/exam-prep/gated-exam-page";
import { BANK_BY_SET, UNITS } from "@/lib/data/qt-mcqs";
import { GUIDE } from "@/lib/data/qt-mcqs/exam-guide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Statistics Exam Prep — AK",
  description:
    "Learn by doing: practice MCQs for Research Methodology-I (business statistics) with flashcards, worked numericals, timed mock tests and predicted papers. Private, access code required.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Business Statistics — learn by doing",
    description: "Practice MCQs with flashcards and worked numericals. Access code required.",
    type: "article",
  },
};

export default function BusinessStatisticsPrepPage() {
  return (
    <GatedExamPage
      path="/digest/business-statistics-prep"
      title="Business Statistics: learn by doing"
      intro="Pick an answer and a flashcard flips open with the right answer and the working or reason behind it. Questions cover all six units, from tabulation and averages to skewness, correlation, index numbers and time series, at easy, medium and hard levels. Part B numericals come with full worked solutions and a formula sheet."
      note="Made for the QTTM509 (Research Methodology-I) syllabus. Every numerical answer was checked by computer; methods follow standard business statistics texts. Where your faculty uses a different convention, go with your faculty. Your progress is saved in this browser only."
      storageKey="qttm509"
      load={() => ({ units: UNITS, bySet: BANK_BY_SET, guide: GUIDE })}
    />
  );
}
