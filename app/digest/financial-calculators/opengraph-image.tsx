import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const alt = "Financial Calculators — AK";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return buildOgImage({
    eyebrow: "AK — Digest",
    title: "Financial Calculators",
    description:
      "A working hub: SIP, compounding, EMI, goal planning, CAGR, inflation — each with the formula and method behind it.",
  });
}
