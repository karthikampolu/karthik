"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { callRequestSchema, type CallRequestInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";

export default function CallRequestForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CallRequestInput>({ resolver: zodResolver(callRequestSchema) });

  async function onSubmit(data: CallRequestInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/schedule-call", {
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
        Request received — I'll reach out shortly.
      </p>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-4 py-3 text-[15px] text-[color:var(--text)] placeholder:text-[color:var(--text-faint)] focus:outline-none";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-5">
      <div>
        <label htmlFor="name" className="block text-[13px] text-[color:var(--text-muted)] mb-1.5">
          Name
        </label>
        <input id="name" className={inputClass} {...register("name")} />
        {errors.name && (
          <p className="mt-1.5 text-[13px] text-red-700">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-[13px] text-[color:var(--text-muted)] mb-1.5">
          Phone Number
        </label>
        <input id="phone" type="tel" className={inputClass} {...register("phone")} />
        {errors.phone && (
          <p className="mt-1.5 text-[13px] text-red-700">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-[13px] text-[color:var(--text-muted)] mb-1.5">
          Message <span className="text-[color:var(--text-faint)]">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          className={inputClass}
          {...register("message")}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Submit"}
      </Button>

      {status === "error" && (
        <p className="text-[13px] text-red-700">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
