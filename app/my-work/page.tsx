import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import StatusBadge from "@/components/ui/status-badge";
import { projects } from "@/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Work — AK",
  description: "A record of things built, shipped, and occasionally shelved.",
};

export default function MyWorkPage() {
  return (
    <Container className="max-w-3xl py-20 md:py-28">
      <Eyebrow>My Work</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-4">
        Things I've built.
      </h1>
      <p className="text-[17px] text-[color:var(--text-muted)] max-w-lg mb-16">
        A mix of shipped, shelved, and in-progress. Each one taught me
        something different about building products.
      </p>

      <div className="divide-y divide-[color:var(--border)] border-t border-b border-[color:var(--border)]">
        {projects.map((p) => {
          const hasLink = p.links && p.links.length > 0;
          const href = hasLink ? p.links[0].href : "#";

          return (
            <a
              key={p.slug}
              href={href}
              target={hasLink ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="block py-8 group transition-opacity hover:opacity-80"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="font-display text-xl md:text-2xl text-[color:var(--text)] mb-2 group-hover:underline">
                    {p.title}
                  </h2>
                  <p className="text-[15px] text-[color:var(--text-muted)] max-w-md">
                    {p.description}
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <StatusBadge status={p.status} />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </Container>
  );
}