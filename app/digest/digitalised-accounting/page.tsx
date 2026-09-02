import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import MiniBooks from "@/components/books/mini-books";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digitalised Accounting — AK",
  description:
    "A working mini accounting app inspired by Zoho Books: raise an invoice, and watch the double entry auto-match and flow into the journal, ledger, trial balance, P&L, balance sheet, cash flow, ratios, and charts.",
  openGraph: {
    title: "Digitalised Accounting — a working mini ledger",
    description:
      "Invoice → auto-matched debit/credit → journal, ledger, trial balance, P&L, balance sheet, cash flow, ratios and charts. Everything updates live.",
    type: "article",
  },
};

export default function DigitalisedAccountingPage() {
  return (
    <Container className="max-w-6xl py-20 md:py-28">
      <Eyebrow>Digest · FinTech</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-4">
        Digitalised Accounting
      </h1>
      <p className="text-[17px] leading-relaxed text-[color:var(--text-muted)] max-w-2xl">
        A small working accounting app, inspired by Zoho Books. Raise an invoice
        or record any transaction from the panel on the left &mdash; the system
        picks the accounts and the debit/credit sides for you, keeps them
        matched, and pushes the entry straight through to the journal, ledger,
        trial balance, profit &amp; loss, balance sheet, cash flow, ratios, and
        charts. Everything recalculates live, and your entries are saved in this
        browser.
      </p>

      <div className="mt-6 max-w-2xl rounded-lg border-l-[3px] border-[color:var(--accent)] bg-[color:var(--accent-soft)] px-5 py-4">
        <p className="text-[13.5px] leading-relaxed text-[color:var(--text)]">
          A teaching model, not real accounting software. It uses a small fixed
          chart of accounts, one GST account, and simplified rules. Do not use it
          for filing or compliance.
        </p>
      </div>

      <MiniBooks />
    </Container>
  );
}
