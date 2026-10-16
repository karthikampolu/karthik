import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const alt = "Business Statistics: learn by doing — AK";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return buildOgImage({
    eyebrow: "AK — Digest",
    title: "Business Statistics: learn by doing",
    description: "Practice MCQs with flashcards, worked numericals, timed mocks and predicted papers.",
  });
}
