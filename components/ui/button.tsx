import Link from "next/link";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type CommonProps = {
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-medium px-5 py-2.5 transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<string, string> = {
  primary:
    "bg-[color:var(--text)] text-[color:var(--bg)] hover:bg-[#3a3830]",
  secondary:
    "border border-[color:var(--border-strong)] text-[color:var(--text)] hover:border-[color:var(--text)] bg-transparent",
  ghost:
    "text-[color:var(--text-muted)] hover:text-[color:var(--text)] px-2",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  external,
}: CommonProps & { href: string; external?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}