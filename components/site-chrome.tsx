"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Paths that render full-screen with their own theme, without the site nav and footer. */
const STANDALONE = ["/sololevling"];

export default function SiteChrome({ children }: { children: ReactNode }) {
  const path = usePathname();
  if (STANDALONE.some((p) => path === p || path.startsWith(`${p}/`))) return null;
  return children;
}
