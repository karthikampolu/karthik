import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { Mail, Phone, Link2, Code2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — AK",
  description: "Get in touch.",
};

const items = [
  { icon: Mail, label: "ampolukarthikay@gmail.com", href: "mailto:ampolukarthikay@gmail.com" },
  { icon: Phone, label: "+91 79976 21439", href: "tel:+917997621439" },
  { icon: Link2, label: "LinkedIn", href: "#" },
  { icon: Code2, label: "GitHub", href: "#" },
];

export default function ContactPage() {
  return (
    <Container className="max-w-2xl py-20 md:py-28">
      <Eyebrow>Contact</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-10">
        Say hello.
      </h1>

      <ul className="space-y-5 mb-14">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="flex items-center gap-3 text-[16px] text-[color:var(--text-muted)] hover:text-[color:var(--text)] transition-colors underline-fade w-fit"
            >
              <item.icon size={17} strokeWidth={1.75} />
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="border-t border-[color:var(--border)] pt-10">
        <p className="text-[15px] text-[color:var(--text-muted)] mb-5">
          Prefer to talk it through directly?
        </p>
        <ButtonLink href="/schedule-a-call" variant="secondary">
          Schedule a call
        </ButtonLink>
      </div>
    </Container>
  );
}
