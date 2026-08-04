import Link from "next/link";
import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import StatusBadge from "@/components/ui/status-badge";
import { projects } from "@/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — AK",
  description: "A record of things built, shipped, and occasionally shelved.",
};

export default function ProjectsPage() {
  return (
    <Container className="max-w-3xl py-20 md:py-28">
      <Eyebrow>Projects</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-4">
        Things I've built.
      </h1>
      <p className="text-[17px] text-[color:var(--text-muted)] max-w-lg mb-16">
        A mix of shipped, shelved, and in-progress. Each one taught me
        something different about building products.
      </p>

      <div className="divide-y divide-[color:var(--border)] border-t border-b border-[color:var(--border)]">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group flex items-start justify-between gap-6 py-8 hover:bg-[color:var(--surface)] transition-colors -mx-6 px-6 rounded-lg"
          >
            <div>
              <h2 className="font-display text-xl md:text-2xl text-[color:var(--text)] mb-2">
                {p.title}
              </h2>
              <p className="text-[15px] text-[color:var(--text-muted)] max-w-md">
                {p.description}
              </p>
            </div>
            <div className="shrink-0 pt-1">
              <StatusBadge status={p.status} />
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
