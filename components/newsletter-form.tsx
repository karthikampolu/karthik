"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { newsletterSchema, type NewsletterInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit(data: NewsletterInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-[15px] text-[color:var(--text)]">
        You're subscribed. Check your inbox for a short welcome note.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <label htmlFor="email" className="sr-only">
        Email
      </label>
<div className="flex flex-col sm:flex-row gap-3">
  <input
    id="email"
    type="email"
    placeholder="you@email.com"
    className="w-full flex-1 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-4 py-2.5 text-[15px] text-[color:var(--text)] placeholder:text-[color:var(--text-faint)] focus:outline-none"
    {...register("email")}
  />
  <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
    {isSubmitting ? "Sending…" : "Subscribe"}
  </Button>
</div>
      {errors.email && (
        <p className="mt-2 text-[13px] text-red-700">{errors.email.message}</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-[13px] text-red-700">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
