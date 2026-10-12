import GatedExamPage from "@/components/exam-prep/gated-exam-page";
import { BANK_BY_SET, UNITS } from "@/lib/data/ob-mcqs";
import { GUIDE } from "@/lib/data/ob-mcqs/exam-guide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organizational Behaviour Exam Prep — AK",
  description:
    "Learn by doing: practice MCQs for Organizational Behaviour and Human Resource Dynamics-I with flashcards, timed mock tests and a progress dashboard. Private, access code required.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Organizational Behaviour — learn by doing",
    description: "Practice MCQs with flashcards and timed mock tests. Access code required.",
    type: "article",
  },
};

export default function OrganizationalBehaviourPrepPage() {
  return (
    <GatedExamPage
      path="/digest/organizational-behaviour-prep"
      title="Organizational Behaviour: learn by doing"
      intro="Pick an answer and a flashcard flips open with the right answer and the reason behind it. Questions cover all six units, from management thought to motivation, leadership, structure and conflict, at easy, medium and hard levels. The ones you miss come back for revision, and timed mocks use the same marking as the exam."
      note="Made for the MGNM581 syllabus and written from Robbins & Coulter, Management, and standard OB texts. Where your faculty's notes differ, go with your notes. Your progress is saved in this browser only."
      storageKey="mgnm581"
      load={() => ({ units: UNITS, bySet: BANK_BY_SET, guide: GUIDE })}
    />
  );
}
