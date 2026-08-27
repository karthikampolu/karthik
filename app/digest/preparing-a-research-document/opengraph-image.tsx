import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const alt = "Preparing a Research or Project Document — AK";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return buildOgImage({
    eyebrow: "AK — Digest",
    title: "Preparing a Research or Project Document",
    description:
      "A step-by-step method for the six-part rubric: introduction, literature, variables, statistics, charts, conclusions.",
  });
}
