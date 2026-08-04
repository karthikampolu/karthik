import Container from "@/components/ui/container";

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] py-10 mt-24">
      <Container className="max-w-5xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="font-display text-base text-[color:var(--text)]">AK</p>
            <p className="text-[13px] text-[color:var(--text-faint)] mt-0.5">
              Building thoughtfully.
            </p>
          </div>
          <p className="text-[13px] text-[color:var(--text-faint)]">
            © {new Date().getFullYear()} AK. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
