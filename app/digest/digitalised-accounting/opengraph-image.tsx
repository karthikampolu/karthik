import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const alt = "Digitalised Accounting — AK";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return buildOgImage({
    eyebrow: "AK — Digest",
    title: "Digitalised Accounting",
    description:
      "A working mini ledger: invoice → auto-matched debit/credit → journal, trial balance, P&L, balance sheet, cash flow, ratios.",
  });
}
