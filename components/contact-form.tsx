"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
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
        Message sent — check your inbox for a quick confirmation.
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
        <label htmlFor="email" className="block text-[13px] text-[color:var(--text-muted)] mb-1.5">
          Email
        </label>
        <input id="email" type="email" className={inputClass} {...register("email")} />
        {errors.email && (
          <p className="mt-1.5 text-[13px] text-red-700">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-[13px] text-[color:var(--text-muted)] mb-1.5">
          Message
        </label>
        <textarea id="message" rows={5} className={inputClass} {...register("message")} />
        {errors.message && (
          <p className="mt-1.5 text-[13px] text-red-700">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>

      {status === "error" && (
        <p className="text-[13px] text-red-700">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}