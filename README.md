# AK — Personal Portfolio (Phase 1)

A minimal, editorial personal site built with Next.js App Router,
TypeScript, and Tailwind CSS.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Firebase Admin SDK (Firestore, server-side writes only)
- Resend (transactional email)

## Pages

- `/` — landing
- `/about` — bio + philosophy
- `/projects` — project list
- `/projects/[slug]` — project detail (IPO Wallah, Marine Procurement Platform, Runway CRM)
- `/newsletter` — email subscribe form
- `/schedule-a-call` — call request form
- `/contact` — static contact details
- 404 — custom not-found page

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in real values
npm run dev
```

See **SETUP_GUIDE.md** for exact, step-by-step instructions on getting
Firebase and Resend credentials and adding them to Vercel.

## Editing content

- Project data: `lib/projects.ts`
- Bio / philosophy copy: `app/about/page.tsx`
- Contact details: `app/contact/page.tsx`
- Colors / fonts / tokens: `app/globals.css` (CSS variables at the top)
