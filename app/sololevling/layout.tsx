import type { Metadata, Viewport } from "next";
import "./solo.css";

export const metadata: Metadata = {
  title: "System",
  description: "Personal progress system.",
  robots: { index: false, follow: false, nocache: true },
  manifest: "/sololevling/manifest.webmanifest",
  icons: {
    icon: [{ url: "/sololevling/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/sololevling/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: { capable: true, title: "System", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#040914",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function SoloLayout({ children }: { children: React.ReactNode }) {
  return children;
}
