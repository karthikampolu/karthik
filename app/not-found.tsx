import Container from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="max-w-2xl py-32 text-center">
      <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--text-faint)] mb-4">
        404
      </p>
      <h1 className="font-display text-3xl md:text-4xl text-[color:var(--text)] mb-6">
        This page doesn't exist.
      </h1>
      <p className="text-[16px] text-[color:var(--text-muted)] mb-10">
        The link may be broken, or the page may have moved.
      </p>
      <ButtonLink href="/" variant="primary">
        Back to home
      </ButtonLink>
    </Container>
  );
}
