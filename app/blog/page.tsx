import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import { blogPosts } from "@/lib/blog-posts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — AK",
  description: "Notes on building, statistics, and the odd rabbit hole worth writing down.",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function BlogIndexPage() {
  return (
    <Container className="max-w-3xl py-20 md:py-28">
      <Eyebrow>Blog</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-4">
        Notes and write-ups.
      </h1>
      <p className="text-[17px] text-[color:var(--text-muted)] max-w-lg mb-16">
        Longer-form pieces on things I've been building or learning —
        updated whenever something feels worth writing down.
      </p>

      <div className="divide-y divide-[color:var(--border)] border-t border-b border-[color:var(--border)]">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block py-8 group transition-opacity hover:opacity-80"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="font-display text-xl md:text-2xl text-[color:var(--text)] mb-2 group-hover:underline">
                  {post.title}
                </h2>
                <p className="text-[15px] text-[color:var(--text-muted)] max-w-md">
                  {post.description}
                </p>
              </div>
              <div className="shrink-0 pt-1 text-right">
                <p className="font-mono text-[11px] uppercase tracking-wide text-[color:var(--text-faint)]">
                  {dateFormatter.format(new Date(post.date))}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wide text-[color:var(--text-faint)] mt-1">
                  {post.readingTime}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
