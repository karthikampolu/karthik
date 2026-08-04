import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import CallRequestForm from "@/components/call-request-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule a Call — AK",
  description: "Leave a few details and I'll reach out to schedule a call.",
};

export default function ScheduleCallPage() {
  return (
    <Container className="max-w-2xl py-20 md:py-28">
      <Eyebrow>Schedule a Call</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-6">
        Let's talk.
      </h1>
      <p className="text-[17px] text-[color:var(--text-muted)] max-w-md mb-10">
        Leave your details below and I'll follow up directly to find a time.
      </p>
      <CallRequestForm />
    </Container>
  );
}
