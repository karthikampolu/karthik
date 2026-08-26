import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const alt = "AK — Business Engineering";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return buildOgImage({
    eyebrow: "AK",
    title: "Business Engineering",
    description:
      "Building useful software, understanding businesses, and continuously learning.",
  });
}
