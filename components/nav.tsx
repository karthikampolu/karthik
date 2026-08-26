"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/container";

const links = [
  { href: "/about", label: "About" },
  { href: "/my-work", label: "My Work" },
  { href: "/blog", label: "Blog" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--bg)]/85 backdrop-blur-md">
      <Container className="max-w-5xl">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-display text-lg tracking-tight text-[color:var(--text)]"
            onClick={() => setOpen(false)}
          >
            AK
          </Link>

          <nav className="hidden sm:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="underline-fade text-[14px] text-[color:var(--text-muted)] hover:text-[color:var(--accent)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="sm:hidden -mr-2 p-2 text-[color:var(--text)]"
          >
            {open ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
          </button>
        </div>
      </Container>

      {open && (
        <nav className="sm:hidden border-t border-[color:var(--border)] bg-[color:var(--bg)]">
          <Container className="max-w-5xl">
            <div className="flex flex-col py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-[16px] text-[color:var(--text)] border-b border-[color:var(--border)] last:border-b-0"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}