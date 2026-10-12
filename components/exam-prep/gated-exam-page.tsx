import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import ExamPrep from "@/components/exam-prep/exam-prep";
import { ExamGate, ExamLockButton } from "@/components/exam-gate";
import { hasExamAccess, isExamAccessConfigured } from "@/lib/exam-access";
import type { PrepData } from "@/components/exam-prep/bank";

type Props = {
  /** This page's own path, used to return here after unlocking. */
  path: string;
  title: string;
  intro: string;
  /** Shown above the app once unlocked (syllabus and textbook note). */
  note: string;
  /** localStorage prefix for this subject's progress. */
  storageKey: string;
  /** Called only after the access code has been verified. */
  load: () => PrepData;
};

/**
 * Server component for a private exam-prep page. Without a valid access
 * cookie it renders only the passcode form; the question bank is loaded and
 * passed to the client only after the code is verified on the server.
 */
export default async function GatedExamPage({ path, title, intro, note, storageKey, load }: Props) {
  const unlocked = await hasExamAccess();
  const data = unlocked ? load() : null;

  return (
    <Container className="max-w-4xl py-20 md:py-28">
      <div className="flex items-start justify-between gap-4">
        <Eyebrow>Digest · Study</Eyebrow>
        {unlocked && <ExamLockButton returnTo={path} />}
      </div>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-4">
        {title}
      </h1>
      <p className="text-[17px] leading-relaxed text-[color:var(--text-muted)] max-w-2xl">{intro}</p>

      {data ? (
        <>
          <div className="mt-6 max-w-2xl rounded-lg border-l-[3px] border-[color:var(--accent)] bg-[color:var(--accent-soft)] px-5 py-4">
            <p className="text-[13.5px] leading-relaxed text-[color:var(--text)]">{note}</p>
          </div>
          <ExamPrep data={data} storageKey={storageKey} />
        </>
      ) : (
        <ExamGate returnTo={path} configured={isExamAccessConfigured()} />
      )}
    </Container>
  );
}
