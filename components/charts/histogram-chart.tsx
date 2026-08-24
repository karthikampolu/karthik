type Props = {
  data: { label: string; value: number }[];
  ariaLabel: string;
  xLabel?: string;
  yLabel?: string;
  note?: string;
};

const WIDTH = 640;
const HEIGHT = 300;
const PAD_LEFT = 40;
const PAD_BOTTOM = 44;
const PAD_TOP = 20;
const PAD_RIGHT = 20;

/**
 * A true histogram: bars touch (a 1px surface seam, not a gap) because each
 * bar is an equal-width slice of one continuous scale, not a separate
 * category. Only valid for interval/ratio data — that equal-width property
 * is exactly what nominal/ordinal categories don't have.
 */
export default function HistogramChart({ data, ariaLabel, xLabel, yLabel, note }: Props) {
  const plotW = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotH = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const max = Math.max(...data.map((d) => d.value), 1);
  const niceMax = Math.max(Math.ceil(max / 1) * 1, 1);
  const barW = plotW / data.length;
  const yFor = (v: number) => (v / niceMax) * plotH;

  const tickCount = Math.min(niceMax, 4);
  const tickStep = Math.max(1, Math.round(niceMax / tickCount));
  const tickVals = [];
  for (let t = 0; t <= niceMax; t += tickStep) tickVals.push(t);

  return (
    <figure className="w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={ariaLabel}
        className="w-full h-auto"
      >
        <title>{ariaLabel}</title>

        {tickVals.map((t) => {
          const y = PAD_TOP + plotH - yFor(t);
          return (
            <g key={t}>
              <line
                x1={PAD_LEFT}
                x2={WIDTH - PAD_RIGHT}
                y1={y}
                y2={y}
                stroke="var(--border)"
                strokeWidth={1}
              />
              <text
                x={PAD_LEFT - 8}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={11}
                fill="var(--text-faint)"
              >
                {t}
              </text>
            </g>
          );
        })}

        {data.map((d, i) => {
          const x = PAD_LEFT + i * barW;
          const h = yFor(d.value);
          const y = PAD_TOP + plotH - h;
          const isZero = d.value === 0;
          return (
            <g key={d.label}>
              <rect
                x={x + 1}
                y={isZero ? PAD_TOP + plotH - 2 : y}
                width={Math.max(barW - 2, 1)}
                height={isZero ? 2 : h}
                fill={isZero ? "var(--border-strong)" : "var(--accent)"}
              />
              <text
                x={x + barW / 2}
                y={isZero ? PAD_TOP + plotH - 10 : y - 8}
                textAnchor="middle"
                fontSize={13}
                fontWeight={600}
                fill="var(--text)"
              >
                {d.value}
              </text>
              <text
                x={x + barW / 2}
                y={PAD_TOP + plotH + 20}
                textAnchor="middle"
                fontSize={11.5}
                fill="var(--text-muted)"
              >
                {d.label}
              </text>
            </g>
          );
        })}

        <line
          x1={PAD_LEFT}
          x2={WIDTH - PAD_RIGHT}
          y1={PAD_TOP + plotH}
          y2={PAD_TOP + plotH}
          stroke="var(--border-strong)"
          strokeWidth={1}
        />
      </svg>
      <figcaption className="mt-2 flex justify-between text-[11px] font-mono uppercase tracking-wide text-[color:var(--text-faint)]">
        <span>{xLabel}</span>
        <span>{yLabel}</span>
      </figcaption>
      {note && (
        <p className="mt-2 text-[13px] text-[color:var(--text-muted)] italic">{note}</p>
      )}
    </figure>
  );
}
