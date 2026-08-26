import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const alt = "Union Budget 2026–27 — Part A — AK";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return buildOgImage({
    eyebrow: "AK — Digest",
    title: "Union Budget 2026–27 — Part A",
    description:
      "A collection of information on capital expenditure, fiscal consolidation, and the three Kartavyas.",
  });
}
