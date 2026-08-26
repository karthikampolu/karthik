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
  {
    slug: "union-budget-2026-27-part-a",
    title: "Union Budget 2026–27 — Part A",
    description:
      "Notes on capital expenditure, fiscal consolidation, and the three Kartavyas from Part A of the Union Budget 2026-27 speech.",
    date: "2026-08-26",
    readingTime: "14 min read",
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
