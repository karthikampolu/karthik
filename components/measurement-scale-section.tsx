import { ExternalLink, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import CategoryBarChart from "@/components/charts/category-bar-chart";
import OrdinalBarChart from "@/components/charts/ordinal-bar-chart";
import HistogramChart from "@/components/charts/histogram-chart";
import type { ScaleEntry } from "@/lib/data/measurement-scales";

export default function MeasurementScaleSection({ scale }: { scale: ScaleEntry }) {
  const chartAriaLabel = `${scale.chart.yLabel} by ${scale.chart.xLabel} — ${scale.dataset.name}`;

  return (
    <section
      id={scale.id}
      aria-labelledby={`${scale.id}-heading`}
      className="scroll-mt-24 py-16 md:py-20 border-t border-[color:var(--border)] first:border-t-0 first:pt-0"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-faint)] mb-3">
        {String(scale.order).padStart(2, "0")} / 04 — {scale.shortLabel}
      </p>
      <h2
        id={`${scale.id}-heading`}
        className="font-display text-3xl md:text-4xl text-[color:var(--text)] leading-tight mb-6"
      >
        {scale.name}
      </h2>

      <p className="text-[17px] leading-relaxed text-[color:var(--text-muted)] max-w-2xl">
        {scale.definition}
      </p>
      <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--text-faint)] max-w-2xl">
        {scale.whyUsed}
      </p>

      <div className="mt-8 max-w-2xl rounded-lg border-l-[3px] border-[color:var(--accent)] bg-[color:var(--accent-soft)] px-5 py-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--accent)] mb-1.5">
          The quick test
        </p>
        <p className="text-[15px] leading-relaxed text-[color:var(--text)]">
          {scale.quickTest}
        </p>
      </div>

      <div className="mt-10 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
        <h3 className="font-display text-xl text-[color:var(--text)] mb-1">
          {scale.dataset.name}
        </h3>
        <p className="text-[13px] font-mono text-[color:var(--text-faint)] mb-6">
          {scale.dataset.asOf}
        </p>

        <DataTable
          caption={scale.dataset.name}
          columns={scale.table.columns}
          rows={scale.table.rows}
        />

        <div className="mt-8">
          {scale.chart.type === "category-bar" && (
            <CategoryBarChart
              data={scale.chart.data}
              ariaLabel={chartAriaLabel}
              xLabel={scale.chart.xLabel}
              yLabel={scale.chart.yLabel}
            />
          )}
          {scale.chart.type === "ordinal-bar" && scale.chart.categoryOrder && (
            <OrdinalBarChart
              data={scale.chart.data}
              categoryOrder={scale.chart.categoryOrder}
              ariaLabel={chartAriaLabel}
              xLabel={scale.chart.xLabel}
              yLabel={scale.chart.yLabel}
            />
          )}
          {scale.chart.type === "histogram" && (
            <HistogramChart
              data={scale.chart.data}
              ariaLabel={chartAriaLabel}
              xLabel={scale.chart.xLabel}
              yLabel={scale.chart.yLabel}
              note={scale.chart.note}
            />
          )}
        </div>

        <div className="mt-8">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--text-faint)] mb-3">
            Why this fits {scale.shortLabel.toLowerCase()} data
          </p>
          <ul className="space-y-2.5">
            {scale.whyFits.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[color:var(--text-muted)]">
                <Check
                  size={16}
                  strokeWidth={2.25}
                  className="mt-[3px] shrink-0 text-[color:var(--accent)]"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col items-start gap-2">
          <ButtonLink
            href={scale.dataset.sourceUrl}
            variant="secondary"
            className="text-[14px]"
            external
          >
            View Original Source
            <ExternalLink size={15} strokeWidth={1.75} />
          </ButtonLink>
          <p className="text-[13px] text-[color:var(--text-faint)]">
            Source: {scale.dataset.sourceName}
          </p>
        </div>
      </div>
    </section>
  );
}
