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
    <Container className="max-w-5xl py-20 md:py-28">
      <Eyebrow>Blog</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-4">
        Notes and write-ups.
      </h1>
      <p className="text-[17px] text-[color:var(--text-muted)] max-w-lg mb-16">
        Longer-form pieces on things I've been building or learning —
        updated whenever something feels worth writing down.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col justify-between rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 transition-colors hover:border-[color:var(--accent)]"
          >
            <div>
              <h2 className="font-display text-lg md:text-xl text-[color:var(--text)] mb-2 leading-snug group-hover:underline">
                {post.title}
              </h2>
              <p className="text-[14px] leading-relaxed text-[color:var(--text-muted)]">
                {post.description}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-wide text-[color:var(--text-faint)]">
              <span>{dateFormatter.format(new Date(post.date))}</span>
              <span>{post.readingTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
