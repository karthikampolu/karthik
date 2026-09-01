import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import FinancialCalculators from "@/components/calculators/financial-calculators";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Calculators — AK",
  description:
    "A dashboard of 20 working financial calculators across personal finance, loans, investing & valuation, and corporate finance — each showing what it does, what goes in, and how the formula works.",
  openGraph: {
    title: "Financial Calculators — a working dashboard",
    description:
      "20 interactive calculators — personal (SIP, retirement, SWP), loans, valuation (CAPM, WACC, DDM, bonds), and projects (NPV, IRR, payback, break-even, EOQ) — each with its formula and method.",
    type: "article",
  },
};

export default function FinancialCalculatorsPage() {
  return (
    <Container className="max-w-3xl py-20 md:py-28">
      <Eyebrow>Digest · Tools</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-4">
        Financial Calculators
      </h1>
      <p className="text-[17px] leading-relaxed text-[color:var(--text-muted)] max-w-2xl">
        A dashboard of 20 working calculators, grouped into four areas &mdash;
        personal finance, loans &amp; credit, investing &amp; valuation, and
        corporate &amp; projects. So it runs from &ldquo;what will my SIP be
        worth&rdquo; to NPV, IRR, WACC, and bond pricing. Drag a slider or type a
        number and the answer updates live. Every calculator has an{" "}
        <span className="text-[color:var(--text)]">
          &ldquo;How it&rsquo;s calculated&rdquo;
        </span>{" "}
        bar that opens to show what goes in, the exact formula, and a plain-words
        walk-through of the method.
      </p>

      <div className="mt-6 rounded-lg border-l-[3px] border-[color:var(--accent)] bg-[color:var(--accent-soft)] px-5 py-4">
        <p className="text-[13.5px] leading-relaxed text-[color:var(--text)]">
          These are estimates for learning and rough planning. They assume
          steady rates and ignore taxes, fees, and the ups and downs of real
          markets. Do not treat any result as financial advice.
        </p>
      </div>

      <FinancialCalculators />
    </Container>
  );
}
