import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import ContactForm from "@/components/contact-form";
import { Mail, Phone, Link2, Code2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — AK",
  description: "Get in touch.",
};

const items = [
  {
    icon: Mail,
    label: "ampolukarthikay@gmail.com",
    href: "mailto:ampolukarthikay@gmail.com",
  },
  {
    icon: Phone,
    label: "+91 79976 21439",
    href: "tel:+917997621439",
  },
  {
    icon: Link2,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/karthik-a-942573328/",
  },
  {
    icon: Code2,
    label: "GitHub",
    href: "https://github.com/karthikampolu",
  },
];

export default function ContactPage() {
  return (
    <Container className="max-w-2xl py-16 md:py-28">
      <Eyebrow>Contact</Eyebrow>

      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-10">
        Say hello.
      </h1>

      <ul className="space-y-5 mb-14">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={
                item.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="flex items-center gap-3 text-[16px] text-[color:var(--text-muted)] hover:text-[color:var(--accent)] transition-colors underline-fade w-fit"
            >
              <item.icon size={17} strokeWidth={1.75} />
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="border-t border-[color:var(--border)] pt-10 mb-14">
        <h2 className="font-display text-2xl text-[color:var(--text)] mb-6">
          Or send a message directly
        </h2>

        <ContactForm />
      </div>

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