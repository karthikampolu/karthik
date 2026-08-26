import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import { getDigestEntries } from "@/lib/digest-entries";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digest — AK",
  description: "A collection of information worth organizing and coming back to.",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function DigestIndexPage() {
  const entries = getDigestEntries();

  return (
    <Container className="max-w-5xl py-20 md:py-28">
      <Eyebrow>Digest</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-4">
        A digest of things worth knowing.
      </h1>
      <p className="text-[17px] text-[color:var(--text-muted)] max-w-lg mb-16">
        Collections of information gathered, organized, and condensed into
        something worth reading — newest first.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/digest/${entry.slug}`}
            className="group flex flex-col justify-between rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 transition-colors hover:border-[color:var(--accent)]"
          >
            <div>
              <h2 className="font-display text-lg md:text-xl text-[color:var(--text)] mb-2 leading-snug group-hover:underline">
                {entry.title}
              </h2>
              <p className="text-[14px] leading-relaxed text-[color:var(--text-muted)]">
                {entry.description}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-wide text-[color:var(--text-faint)]">
              <span>{dateFormatter.format(new Date(entry.date))}</span>
              <span>{entry.readingTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
