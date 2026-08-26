import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const alt = "Digest — AK";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return buildOgImage({
    eyebrow: "AK — Digest",
    title: "A digest of things worth knowing.",
    description: "Collections of information gathered, organized, and condensed.",
  });
}
