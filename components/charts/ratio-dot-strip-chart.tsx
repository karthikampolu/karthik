type Props = {
  data: { label: string; value: number }[];
  ariaLabel: string;
  xLabel?: string;
  yLabel?: string;
  note?: string;
};

const WIDTH = 640;
const ROW_H = 34;
const PAD_LEFT = 190;
const PAD_TOP = 24;
const PAD_BOTTOM = 40;
const PAD_RIGHT = 60;

/**
 * Scatter / strip plot on a log scale — appropriate for ratio data whose true
 * zero anchors the scale, even across several orders of magnitude.
 */
export default function RatioDotStripChart({ data, ariaLabel, xLabel, yLabel, note }: Props) {
  const height = PAD_TOP + PAD_BOTTOM + data.length * ROW_H;
  const plotW = WIDTH - PAD_LEFT - PAD_RIGHT;
  const sorted = [...data].sort((a, b) => a.value - b.value);

  const logMin = Math.log10(Math.min(...data.map((d) => d.value)) * 0.6);
  const logMax = Math.log10(Math.max(...data.map((d) => d.value)) * 1.3);
  const xFor = (v: number) => PAD_LEFT + ((Math.log10(v) - logMin) / (logMax - logMin)) * plotW;

  const tickVals = [10, 100, 1000, 10000, 100000];

  return (
    <figure className="w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        role="img"
        aria-label={ariaLabel}
        className="w-full h-auto"
      >
        <title>{ariaLabel}</title>

        {tickVals
          .filter((t) => Math.log10(t) >= logMin && Math.log10(t) <= logMax)
          .map((t) => (
            <g key={t}>
              <line
                x1={xFor(t)}
                x2={xFor(t)}
                y1={PAD_TOP - 8}
                y2={height - PAD_BOTTOM + 4}
                stroke="var(--border)"
                strokeWidth={1}
              />
              <text
                x={xFor(t)}
                y={height - PAD_BOTTOM + 18}
                textAnchor="middle"
                fontSize={10.5}
                fill="var(--text-faint)"
              >
                {t.toLocaleString("en-US")}
              </text>
            </g>
          ))}

        {sorted.map((d, i) => {
          const y = PAD_TOP + i * ROW_H + ROW_H / 2;
          return (
            <g key={d.label}>
              <line
                x1={PAD_LEFT}
                x2={xFor(d.value)}
                y1={y}
                y2={y}
                stroke="var(--border-strong)"
                strokeWidth={1}
              />
              <text
                x={PAD_LEFT - 10}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={11}
                fill="var(--text-muted)"
              >
                {d.label}
              </text>
              <circle
                cx={xFor(d.value)}
                cy={y}
                r={5}
                fill="var(--accent)"
                stroke="var(--surface)"
                strokeWidth={2}
              />
              <text
                x={xFor(d.value) + 10}
                y={y}
                dominantBaseline="middle"
                fontSize={10.5}
                fill="var(--text)"
              >
                {d.value.toLocaleString("en-US")}
              </text>
            </g>
          );
        })}
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
