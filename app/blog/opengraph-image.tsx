import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const alt = "Blog — AK";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return buildOgImage({
    eyebrow: "AK — Blog",
    title: "Notes and write-ups.",
    description: "Longer-form pieces on things I've been building or learning.",
  });
}
