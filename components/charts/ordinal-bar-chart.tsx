type Props = {
  data: { label: string; value: number }[];
  categoryOrder: string[];
  ariaLabel: string;
  xLabel?: string;
  yLabel?: string;
};

const WIDTH = 640;
const HEIGHT = 340;
const PAD_LEFT = 92;
const PAD_BOTTOM = 64;
const PAD_TOP = 16;
const PAD_RIGHT = 16;

/**
 * Bars ordered along a ranked category axis (e.g. None < D0 < ... < D4).
 * The y-axis shows category labels, not equally-spaced numeric units —
 * this is the point: order is meaningful, spacing between ranks is not.
 */
export default function OrdinalBarChart({ data, categoryOrder, ariaLabel, xLabel, yLabel }: Props) {
  const plotW = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotH = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const maxRank = categoryOrder.length - 1;
  const barGap = 16;
  const barW = plotW / data.length - barGap;

  return (
    <figure className="w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={ariaLabel}
        className="w-full h-auto"
      >
        <title>{ariaLabel}</title>

        {/* ordinal rank gridlines / labels */}
        {categoryOrder.map((cat, rank) => {
          const y = PAD_TOP + plotH - (rank / maxRank) * plotH;
          return (
            <g key={cat}>
              <line
                x1={PAD_LEFT}
                x2={WIDTH - PAD_RIGHT}
                y1={y}
                y2={y}
                stroke="var(--border)"
                strokeWidth={1}
              />
              <text
                x={PAD_LEFT - 10}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={11}
                fill="var(--text-faint)"
              >
                {cat}
              </text>
            </g>
          );
        })}

        {data.map((d, i) => {
          const x = PAD_LEFT + i * (barW + barGap) + barGap / 2;
          const h = (d.value / maxRank) * plotH;
          const y = PAD_TOP + plotH - h;
          return (
            <g key={d.label}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={h}
                fill="var(--accent)"
                opacity={0.85}
                rx={2}
              />
              <text
                x={x + barW / 2}
                y={PAD_TOP + plotH + 16}
                textAnchor="middle"
                fontSize={10.5}
                fill="var(--text-muted)"
                transform={`rotate(20 ${x + barW / 2} ${PAD_TOP + plotH + 16})`}
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
    </figure>
  );
}
