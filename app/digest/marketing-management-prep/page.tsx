import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import MarketingPrep from "@/components/marketing/marketing-prep";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Management Exam Prep — AK",
  description:
    "Learn by doing: 550+ practice MCQs for Marketing Management-I at easy, medium and hard levels. Each answer opens a flashcard, with timed mock tests, a progress dashboard, and a predicted-paper guide.",
  openGraph: {
    title: "Marketing Management — learn by doing",
    description:
      "550+ MCQs with flashcards, timed mock tests with negative marking, and a guide to how the paper is likely to be built.",
    type: "article",
  },
};

export default function MarketingPrepPage() {
  return (
    <Container className="max-w-4xl py-20 md:py-28">
      <Eyebrow>Digest · Study</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-4">
        Marketing Management: learn by doing
      </h1>
      <p className="text-[17px] leading-relaxed text-[color:var(--text-muted)] max-w-2xl">
        Pick an answer and a flashcard flips open with the right answer and the reason behind it.
        Questions are spread across all six units at easy, medium and hard levels, the ones you miss
        come back for revision, and timed mocks use the same marking as the exam.
      </p>

      <div className="mt-6 max-w-2xl rounded-lg border-l-[3px] border-[color:var(--accent)] bg-[color:var(--accent-soft)] px-5 py-4">
        <p className="text-[13.5px] leading-relaxed text-[color:var(--text)]">
          Made for the MKTM503 syllabus and written from Kotler &amp; Keller, Marketing Management.
          Where your faculty's notes differ, go with your notes. Your progress is saved in this
          browser only.
        </p>
      </div>

      <MarketingPrep />
    </Container>
  );
}
