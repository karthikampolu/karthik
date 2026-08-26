import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const alt = "The Four Levels of Measurement — AK";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return buildOgImage({
    eyebrow: "AK — Blog",
    title: "The Four Levels of Measurement",
    description:
      "Nominal, ordinal, interval, and ratio scales, each explained with a real government dataset.",
  });
}
