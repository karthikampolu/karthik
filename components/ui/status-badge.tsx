import { cn } from "@/lib/utils";

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border",
        status === "Live" &&
          "border-[color:var(--accent)] text-[color:var(--accent)] bg-[color:var(--accent-soft)]",
        status === "Discontinued" &&
          "border-[color:var(--border-strong)] text-[color:var(--text-faint)]",
        status === "In Progress" &&
          "border-[color:var(--border-strong)] text-[color:var(--text-muted)]"
      )}
    >
      {status}
    </span>
  );
}
