export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  status: "Discontinued" | "Live" | "In Progress";
  stack: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "ipo-wallah",
    title: "IPO Wallah",
    description: "Android application built to simplify IPO-related information.",
    longDescription:
      "IPO Wallah was an Android application that pulled together IPO listings, subscription data, and allotment status into a single, simple view — built to save people from digging through scattered broker apps and forum threads during IPO season. It was later discontinued as priorities shifted, but it remains an early lesson in shipping something useful quickly.",
    status: "Discontinued",
    stack: ["Android", "Kotlin", "REST APIs"],
    links: [],
  },
  {
    slug: "marine-procurement",
    title: "Marine Procurement Platform",
    description: "MVP procurement platform for marine businesses.",
    longDescription:
      "A procurement platform built for marine businesses to request, compare, and manage vendor quotes without relying on email chains and spreadsheets. Built as an MVP to validate the workflow with real procurement teams before investing further.",
    status: "Live",
    stack: ["Next.js", "TypeScript", "Vercel"],
    links: [{ label: "View live", href: "https://marinebid.vercel.app" }],
  },
  {
    slug: "runway-crm",
    title: "Runway CRM",
    description: "Business platform focused on forms and email campaigns.",
    longDescription:
      "Runway CRM is a lightweight business platform centered on two things most small teams actually need: clean intake forms and simple, reliable email campaigns — without the overhead of a full enterprise CRM.",
    status: "In Progress",
    stack: ["Next.js", "TypeScript", "Firebase"],
    links: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
