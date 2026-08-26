export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date, e.g. "2026-08-26"
  readingTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "measurement-scales",
    title: "The Four Levels of Measurement",
    description:
      "Nominal, ordinal, interval, and ratio scales, each explained with a real government dataset instead of a toy example.",
    date: "2026-08-20",
    readingTime: "9 min read",
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
