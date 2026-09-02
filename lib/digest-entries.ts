export type DigestEntry = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date, e.g. "2026-08-26"
  readingTime: string;
};

export const digestEntries: DigestEntry[] = [
  {
    slug: "digitalised-accounting",
    title: "Digitalised Accounting",
    description:
      "A working mini accounting app inspired by Zoho Books — raise an invoice and watch the double entry auto-match into the journal, ledger, trial balance, P&L, balance sheet, cash flow, ratios, and charts.",
    date: "2026-09-02",
    readingTime: "Interactive",
  },
  {
    slug: "measurement-scales",
    title: "The Four Levels of Measurement",
    description:
      "Nominal, ordinal, interval, and ratio scales, each explained with a real government dataset instead of a toy example.",
    date: "2026-08-20",
    readingTime: "9 min read",
  },
  {
    slug: "union-budget-2026-27-part-a",
    title: "Union Budget 2026–27 — Part A",
    description:
      "A collection of information on capital expenditure, fiscal consolidation, and the three Kartavyas from Part A of the Union Budget 2026-27 speech.",
    date: "2026-08-26",
    readingTime: "10 min read",
  },
  {
    slug: "financial-calculators",
    title: "Financial Calculators",
    description:
      "A dashboard of 20 working calculators across personal finance, loans, valuation (CAPM, WACC, DDM, bonds), and corporate projects (NPV, IRR, payback, break-even, EOQ) — each showing what it does, what goes in, and how the formula works.",
    date: "2026-08-30",
    readingTime: "Interactive",
  },
  {
    slug: "preparing-a-research-document",
    title: "Preparing a Research or Project Document",
    description:
      "A simple step-by-step guide to writing a research, project, or class-assessment document that matches a standard marking rubric — picking a question, data, statistics, charts, references, and using AI the right way.",
    date: "2026-08-28",
    readingTime: "15 min read",
  },
];

/** Newest first. */
export function getDigestEntries() {
  return [...digestEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getDigestEntry(slug: string) {
  return digestEntries.find((p) => p.slug === slug);
}
