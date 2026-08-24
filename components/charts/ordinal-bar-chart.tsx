type Props = {
  data: { label: string; value: number }[];
  categoryOrder: string[];
  ariaLabel: string;
  xLabel?: string;
  yLabel?: string;
};

const WIDTH = 640;
const ROW_H = 40;
const PAD_LEFT = 108;
const PAD_TOP = 44;
const PAD_BOTTOM = 36;
const PAD_RIGHT = 56;
const BAR_H = 20;

// One hue (the brand accent), monotone light → dark — a rank/severity ramp,
// never a rainbow. Index = rank (0 = None … 5 = D4).
const RAMP = ["#edf0e9", "#cacfc6", "#a7aea3", "#858c81", "#626b5e", "#3f4a3b"];

/**
 * Horizontal bars ordered by rank, colored on the same rank ramp — color and
 * position both carry "how severe," which is the whole point of an ordinal
 * scale: order is meaningful, the gap between ranks is not.
 */
export default function OrdinalBarChart({ data, categoryOrder, ariaLabel, xLabel, yLabel }: Props) {
  const sorted = [...data].sort((a, b) => b.value - a.value);
  const height = PAD_TOP + PAD_BOTTOM + sorted.length * ROW_H;
  const plotW = WIDTH - PAD_LEFT - PAD_RIGHT;
  const maxRank = categoryOrder.length - 1;
  const xFor = (v: number) => (v / maxRank) * plotW;
  const swatchGap = plotW / categoryOrder.length;

  return (
    <figure className="w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        role="img"
        aria-label={ariaLabel}
        className="w-full h-auto"
      >
        <title>{ariaLabel}</title>

        {/* legend: the rank ramp itself, so color's meaning is explicit */}
        {categoryOrder.map((cat, rank) => (
          <g key={cat}>
            <rect
              x={PAD_LEFT + rank * swatchGap}
              y={12}
              width={12}
              height={12}
              rx={2}
              fill={RAMP[rank]}
              stroke="var(--border-strong)"
              strokeWidth={0.5}
            />
            <text
              x={PAD_LEFT + rank * swatchGap + 17}
              y={21}
              fontSize={10.5}
              fill="var(--text-faint)"
            >
              {cat}
            </text>
          </g>
        ))}

        {sorted.map((d, i) => {
          const y = PAD_TOP + i * ROW_H + (ROW_H - BAR_H) / 2;
          const w = Math.max(xFor(d.value), 2);
          return (
            <g key={d.label}>
              <text
                x={PAD_LEFT - 12}
                y={y + BAR_H / 2}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={12.5}
                fill="var(--text-muted)"
              >
                {d.label}
              </text>
              <rect
                x={PAD_LEFT}
                y={y}
                width={w}
                height={BAR_H}
                rx={4}
                fill={RAMP[d.value]}
                stroke="var(--border-strong)"
                strokeWidth={0.5}
              />
              <text
                x={PAD_LEFT + w + 8}
                y={y + BAR_H / 2}
                dominantBaseline="middle"
                fontSize={12.5}
                fontWeight={600}
                fill="var(--text)"
              >
                {categoryOrder[d.value]}
              </text>
            </g>
          );
        })}

        <line
          x1={PAD_LEFT}
          x2={PAD_LEFT}
          y1={PAD_TOP - 4}
          y2={height - PAD_BOTTOM + 4}
          stroke="var(--border-strong)"
          strokeWidth={1}
        />
      </svg>
      <figcaption className="mt-2 flex justify-between text-[11px] font-mono uppercase tracking-wide text-[color:var(--text-faint)]">
        <span>{yLabel}</span>
        <span>{xLabel}</span>
      </figcaption>
    </figure>
  );
}
