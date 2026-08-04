import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import NewsletterForm from "@/components/newsletter-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter — AK",
  description: "Occasional, thoughtful notes on technology, business, and building.",
};

export default function NewsletterPage() {
  return (
    <Container className="max-w-2xl py-20 md:py-28">
      <Eyebrow>Newsletter</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-6">
        Occasional notes, worth your time.
      </h1>
      <p className="text-[17px] text-[color:var(--text-muted)] max-w-md mb-10">
        No frequent updates, no marketing language — just a short note now
        and then on technology, business, finance, and product building.
      </p>
      <NewsletterForm />
    </Container>
  );
}
