import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import StatusBadge from "@/components/ui/status-badge";
import { getProject, projects } from "@/lib/projects";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — AK`,
    description: project.description,
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <Container className="max-w-3xl py-20 md:py-28">
      <Link
        href="/projects"
        className="underline-fade text-[14px] text-[color:var(--text-muted)]"
      >
        ← All projects
      </Link>

<div className="mt-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
  <div>
    <Eyebrow>Project</Eyebrow>
    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[color:var(--text)] leading-tight">
      {project.title}
    </h1>
  </div>
  <div className="sm:pt-2 shrink-0">
    <StatusBadge status={project.status} />
  </div>
</div>

      <p className="mt-8 text-[17px] leading-relaxed text-[color:var(--text-muted)] max-w-xl">
        {project.longDescription}
      </p>

      <div className="mt-16 grid sm:grid-cols-2 gap-10 border-t border-[color:var(--border)] pt-10">
        <div>
          <Eyebrow>Technology Stack</Eyebrow>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li
                key={s}
                className="font-mono text-[12px] text-[color:var(--text-muted)] border border-[color:var(--border)] rounded-full px-3 py-1"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {project.links.length > 0 && (
          <div>
            <Eyebrow>Links</Eyebrow>
            <ul className="space-y-2">
              {project.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-fade text-[15px] text-[color:var(--text)] font-medium"
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Container>
  );
}
