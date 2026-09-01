import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import FinancialCalculators from "@/components/calculators/financial-calculators";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Calculators — AK",
  description:
    "A small hub of working financial calculators — SIP, lump-sum compounding, loan EMI, goal planning, CAGR, and inflation. Each one shows what it does, what goes in, and how the formula works.",
  openGraph: {
    title: "Financial Calculators — a working hub",
    description:
      "SIP, compounding, EMI, goal planning, CAGR, inflation — interactive, with the formula and method behind each one.",
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
        A hub of small, working calculators for the money questions that come up
        most often. Drag a slider or type a number and the answer updates live.
        Every calculator has an{" "}
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
