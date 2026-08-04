import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — AK",
  description: "A little about how I think about building and learning.",
};

export default function AboutPage() {
  return (
    <Container className="max-w-3xl py-20 md:py-28">
      <Eyebrow>About</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight">
        A student, first.
      </h1>

      <div className="mt-12 space-y-6 text-[17px] leading-relaxed text-[color:var(--text-muted)]">
        <p>
          I studied computer science and am now working through an MBA — not
          because one path felt incomplete, but because building software and
          understanding the businesses it serves have always felt like the
          same problem, viewed from two angles.
        </p>
        <p>
          Most of what I've built started as a small, specific irritation:
          information that was harder to find than it should be, a process
          that took ten steps instead of three, a workflow held together with
          spreadsheets and good intentions. Software, to me, is just a
          medium for taking those irritations seriously.
        </p>
        <p>
          I don't think of learning as something that stops once you have a
          job title. The engineers and operators I respect most are still
          reading, still asking basic questions, still willing to be
          beginners in rooms where they're not the smartest person. I'm
          trying to build that habit for myself, one project and one
          semester at a time.
        </p>
        <p>
          This site is a quiet record of that — the things I've shipped, the
          things I'm learning, and occasionally, the things I've gotten
          wrong along the way.
        </p>
      </div>

      <div className="mt-20 border-t border-[color:var(--border)] pt-16">
        <Eyebrow>Philosophy</Eyebrow>
        <h2 className="font-display text-2xl md:text-3xl text-[color:var(--text)] mb-8 leading-snug">
          Knowledge compounds. Curiosity creates opportunities.
        </h2>
        <div className="space-y-6 text-[17px] leading-relaxed text-[color:var(--text-muted)]">
          <p>
            The best returns in learning, like the best returns in business,
            rarely come from a single breakthrough. They come from showing up
            consistently and letting small gains stack on top of each other
            until they're no longer small.
          </p>
          <p>
            Curiosity is what makes that stacking possible. It's what turns
            an ordinary observation — a clunky form, a confusing invoice, a
            slow process — into a reason to build something better. Most of
            the opportunities worth pursuing don't announce themselves; they
            reveal themselves to whoever is paying attention.
          </p>
          <p>
            I try to treat learning as a long-term investment rather than a
            box to check. The best builders I know never really stop being
            students — they just get better at asking questions.
          </p>
        </div>
      </div>
    </Container>
  );
}
