type Props = {
  data: { label: string; value: number }[];
  ariaLabel: string;
  xLabel?: string;
  yLabel?: string;
};

const WIDTH = 640;
const ROW_H = 40;
const PAD_LEFT = 168;
const PAD_TOP = 16;
const PAD_BOTTOM = 36;
const PAD_RIGHT = 56;
const BAR_H = 20;

/**
 * Horizontal bar chart for a single unordered, nominal category set.
 * One series → one color for every bar (no value-ramp on nominal data) —
 * identity already comes from the row label, not from hue.
 */
export default function CategoryBarChart({ data, ariaLabel, xLabel, yLabel }: Props) {
  const height = PAD_TOP + PAD_BOTTOM + data.length * ROW_H;
  const plotW = WIDTH - PAD_LEFT - PAD_RIGHT;
  const max = Math.max(...data.map((d) => d.value));
  const niceMax = Math.ceil(max / 4) * 4 || 1;
  const xFor = (v: number) => (v / niceMax) * plotW;

  const ticks = 4;
  const tickVals = Array.from({ length: ticks + 1 }, (_, i) => Math.round((niceMax / ticks) * i));

  return (
    <figure className="w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        role="img"
        aria-label={ariaLabel}
        className="w-full h-auto"
      >
        <title>{ariaLabel}</title>

        {tickVals.map((t) => (
          <g key={t}>
            <line
              x1={PAD_LEFT + xFor(t)}
              x2={PAD_LEFT + xFor(t)}
              y1={PAD_TOP - 4}
              y2={height - PAD_BOTTOM + 4}
              stroke="var(--border)"
              strokeWidth={1}
            />
            <text
              x={PAD_LEFT + xFor(t)}
              y={height - PAD_BOTTOM + 20}
              textAnchor="middle"
              fontSize={11}
              fill="var(--text-faint)"
            >
              {t}
            </text>
          </g>
        ))}

        {data.map((d, i) => {
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
                fill="var(--accent)"
              />
              <text
                x={PAD_LEFT + w + 8}
                y={y + BAR_H / 2}
                dominantBaseline="middle"
                fontSize={12.5}
                fontWeight={600}
                fill="var(--text)"
              >
                {d.value}
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
