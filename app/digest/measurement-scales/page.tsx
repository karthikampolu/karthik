import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import MeasurementScaleSection from "@/components/measurement-scale-section";
import { measurementScales } from "@/lib/data/measurement-scales";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Four Levels of Measurement — AK",
  description:
    "Nominal, ordinal, interval, and ratio scales explained with real government and institutional datasets — NOAA disaster records, the U.S. Drought Monitor, NWS climate normals, and live USGS streamflow data.",
};

export default function MeasurementScalesPage() {
  return (
    <Container className="max-w-3xl py-20 md:py-28">
      <Eyebrow>Digest</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-6">
        The Four Levels of Measurement
      </h1>
      <p className="text-[17px] leading-relaxed text-[color:var(--text-muted)] max-w-2xl">
        Every statistic starts with a choice you rarely think about: what kind
        of scale is this number actually on? Nominal, ordinal, interval, and
        ratio data each support a different set of valid operations — mixing
        them up is one of the quietest ways an analysis goes wrong. Below,
        each scale is paired with a real dataset from a government or
        institutional source, not a toy example.
      </p>

      <nav aria-label="Jump to a scale" className="mt-10 flex flex-wrap gap-2">
        {measurementScales.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-full border border-[color:var(--border-strong)] text-[color:var(--text-muted)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors underline-fade"
          >
            {String(s.order).padStart(2, "0")} {s.shortLabel}
          </a>
        ))}
      </nav>

      <div>
        {measurementScales.map((scale) => (
          <MeasurementScaleSection key={scale.id} scale={scale} />
        ))}
      </div>
    </Container>
  );
}
