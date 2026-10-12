import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const alt = "Organizational Behaviour: learn by doing — AK";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return buildOgImage({
    eyebrow: "AK — Digest",
    title: "Organizational Behaviour: learn by doing",
    description: "Practice MCQs with flashcards, timed mocks with negative marking, and a predicted-paper guide.",
  });
}
