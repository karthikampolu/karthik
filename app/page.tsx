import Link from "next/link";
import Container from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import Eyebrow from "@/components/ui/eyebrow";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 hidden md:block"
        >
          <svg width="360" height="360" viewBox="0 0 360 360" fill="none">
            {[40, 80, 120, 160].map((r) => (
              <circle
                key={r}
                cx="180"
                cy="180"
                r={r}
                stroke="var(--border-strong)"
                strokeWidth="1"
              />
            ))}
          </svg>
        </div>

        <Container className="max-w-5xl pt-14 pb-16 sm:pt-20 sm:pb-24 md:pt-32 md:pb-32 relative">
          <Eyebrow>Business Engineering</Eyebrow>
          <h1 className="font-display text-[clamp(3.5rem,15vw,4.5rem)] sm:text-6xl md:text-7xl leading-[0.95] tracking-tight text-[color:var(--text)]">
            AK
          </h1>
          <p className="mt-6 sm:mt-8 max-w-xl text-[16px] sm:text-[17px] md:text-lg leading-relaxed text-[color:var(--text-muted)]">
            I build software, study how businesses work, and try to stay a
            student of both. Most of what's here is a record of that
            process — products shipped, lessons kept, and a few ideas worth
            following.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <ButtonLink href="/projects" variant="primary" className="w-full sm:w-auto">
              View Projects
            </ButtonLink>
            <ButtonLink href="/newsletter" variant="secondary" className="w-full sm:w-auto">
              Subscribe
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="border-t border-[color:var(--border)]">
        <Container className="max-w-5xl py-16 sm:py-24">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20">
            <div>
              {/* <Eyebrow>Philosophy</Eyebrow> */}
              <h2 className="font-display text-3xl md:text-[2.4rem] leading-tight text-[color:var(--text)]">
                Knowledge compounds.
              </h2>
            </div>
            <div className="space-y-5 text-[16px] leading-relaxed text-[color:var(--text-muted)]">
              <p>
                Small, consistent learning adds up in ways that are hard to
                see day to day and obvious in hindsight. The same is true for
                good products — they're rarely the result of one clever idea,
                but of many small, compounding decisions made carefully.
              </p>
              <p>
                Curiosity is what keeps that compounding going. It's the
                difference between doing a job and understanding the system
                the job sits inside.
              </p>
              <Link
                href="/about"
                className="underline-fade inline-block text-[15px] text-[color:var(--text)] font-medium"
              >
                Read more about this →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[color:var(--border)]">
        <Container className="max-w-5xl py-16 sm:py-24 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-[color:var(--text)] max-w-lg mx-auto leading-snug">
            Following along is easy — the projects and a few thoughts, sent
            occasionally.
          </h2>
          <div className="mt-8">
            <ButtonLink href="/newsletter" variant="primary" className="w-full sm:w-auto">
              Subscribe
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}