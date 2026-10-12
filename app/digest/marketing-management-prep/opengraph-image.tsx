import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const alt = "Marketing Management: learn by doing — AK";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return buildOgImage({
    eyebrow: "AK — Digest",
    title: "Marketing Management: learn by doing",
    description:
      "550+ MCQs with flashcards, timed mocks with negative marking, and a predicted-paper guide.",
  });
}
