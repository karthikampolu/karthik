"use client";

import { useState } from "react";
import { BookOpen, ChartColumn, ClipboardList, Timer } from "lucide-react";
import { useProgress } from "@/components/marketing/engine";
import Practice, { type PracticePreset } from "@/components/marketing/practice";
import MockTest from "@/components/marketing/mock-test";
import Dashboard from "@/components/marketing/dashboard";
import ExamGuide from "@/components/marketing/exam-guide";
import { BankProvider, type PrepData } from "@/components/marketing/bank";

type Tab = "practice" | "mock" | "dashboard" | "guide";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "practice", label: "Practice", icon: <BookOpen size={15} /> },
  { id: "mock", label: "Mock test", icon: <Timer size={15} /> },
  { id: "dashboard", label: "Progress", icon: <ChartColumn size={15} /> },
  { id: "guide", label: "Exam guide", icon: <ClipboardList size={15} /> },
];

export default function MarketingPrep({ data }: { data: PrepData }) {
  const { progress, mocks, ready, record, addMock, reset } = useProgress();
  const [tab, setTab] = useState<Tab>("practice");
  const [preset, setPreset] = useState<PracticePreset & { key: number }>({ key: 0 });

  const goPractice = (p: PracticePreset) => {
    setPreset((cur) => ({ key: cur.key + 1, ...p }));
    setTab("practice");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <BankProvider data={data}>
      <div className="mt-8">
        <div
          role="tablist"
          aria-label="Study sections"
          className="sticky top-16 z-20 -mx-6 mb-6 flex gap-1 overflow-x-auto border-b border-[color:var(--border)] bg-[color:var(--bg)]/90 px-6 py-2 backdrop-blur md:-mx-8 md:px-8"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[13.5px] transition-colors ${
                tab === t.id
                  ? "bg-[color:var(--text)] text-[color:var(--bg)]"
                  : "text-[color:var(--text-muted)] hover:bg-[color:var(--surface)] hover:text-[color:var(--text)]"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Every panel stays mounted so switching tabs never loses a running mock. */}
        <div role="tabpanel" id="panel-practice" aria-labelledby="tab-practice" hidden={tab !== "practice"}>
          <Practice
            key={preset.key}
            progress={progress}
            ready={ready}
            record={record}
            preset={preset}
            active={tab === "practice"}
          />
        </div>
        <div role="tabpanel" id="panel-mock" aria-labelledby="tab-mock" hidden={tab !== "mock"}>
          <MockTest
            progress={progress}
            ready={ready}
            record={record}
            addMock={addMock}
            onPracticeWrong={() => goPractice({ unit: "all", status: "wrong" })}
          />
        </div>
        <div role="tabpanel" id="panel-dashboard" aria-labelledby="tab-dashboard" hidden={tab !== "dashboard"}>
          <Dashboard progress={progress} mocks={mocks} onPractice={goPractice} onReset={reset} />
        </div>
        <div role="tabpanel" id="panel-guide" aria-labelledby="tab-guide" hidden={tab !== "guide"}>
          <ExamGuide />
        </div>
      </div>
    </BankProvider>
  );
}
