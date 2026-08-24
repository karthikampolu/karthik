type Props = {
  data: { label: string; value: number }[];
  ariaLabel: string;
  xLabel?: string;
  yLabel?: string;
};

const WIDTH = 640;
const HEIGHT = 320;
const PAD_LEFT = 44;
const PAD_BOTTOM = 64;
const PAD_TOP = 16;
const PAD_RIGHT = 16;

/** Simple categorical bar chart — no implied order between bars. */
export default function CategoryBarChart({ data, ariaLabel, xLabel, yLabel }: Props) {
  const plotW = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotH = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const max = Math.max(...data.map((d) => d.value));
  const niceMax = Math.ceil(max / 5) * 5 || 1;
  const barGap = 14;
  const barW = plotW / data.length - barGap;

  const ticks = 5;
  const tickVals = Array.from({ length: ticks + 1 }, (_, i) => (niceMax / ticks) * i);

  return (
    <figure className="w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={ariaLabel}
        className="w-full h-auto"
      >
        <title>{ariaLabel}</title>
        {/* gridlines */}
        {tickVals.map((t) => {
          const y = PAD_TOP + plotH - (t / niceMax) * plotH;
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
                {Math.round(t)}
              </text>
            </g>
          );
        })}

        {/* bars */}
        {data.map((d, i) => {
          const x = PAD_LEFT + i * (barW + barGap) + barGap / 2;
          const h = (d.value / niceMax) * plotH;
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
                y={y - 6}
                textAnchor="middle"
                fontSize={11}
                fill="var(--text)"
              >
                {d.value}
              </text>
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
