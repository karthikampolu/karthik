type Props = {
  data: { label: string; value: number }[];
  ariaLabel: string;
  xLabel?: string;
  yLabel?: string;
  note?: string;
};

const WIDTH = 640;
const HEIGHT = 320;
const PAD_LEFT = 48;
const PAD_BOTTOM = 40;
const PAD_TOP = 28;
const PAD_RIGHT = 20;

/**
 * Line chart with a non-zero baseline — appropriate for interval data, where
 * a zero baseline would falsely suggest "no temperature" is a meaningful
 * reference point. Only the coldest and warmest points are direct-labeled;
 * the rest live in the axis and the table above.
 */
export default function IntervalLineChart({ data, ariaLabel, xLabel, yLabel, note }: Props) {
  const plotW = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotH = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const values = data.map((d) => d.value);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const pad = (rawMax - rawMin) * 0.2 || 5;
  const min = Math.floor(rawMin - pad);
  const max = Math.ceil(rawMax + pad);

  const minIdx = values.indexOf(rawMin);
  const maxIdx = values.indexOf(rawMax);

  const xStep = plotW / (data.length - 1);
  const yFor = (v: number) => PAD_TOP + plotH - ((v - min) / (max - min)) * plotH;
  const xFor = (i: number) => PAD_LEFT + i * xStep;

  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(d.value)}`).join(" ");
  const areaPath =
    `M ${xFor(0)} ${PAD_TOP + plotH} ` +
    data.map((d, i) => `L ${xFor(i)} ${yFor(d.value)}`).join(" ") +
    ` L ${xFor(data.length - 1)} ${PAD_TOP + plotH} Z`;

  const ticks = 4;
  const tickVals = Array.from({ length: ticks + 1 }, (_, i) => min + ((max - min) / ticks) * i);

  return (
    <figure className="w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={ariaLabel}
        className="w-full h-auto"
      >
        <title>{ariaLabel}</title>

        {tickVals.map((t) => (
          <g key={t}>
            <line
              x1={PAD_LEFT}
              x2={WIDTH - PAD_RIGHT}
              y1={yFor(t)}
              y2={yFor(t)}
              stroke="var(--border)"
              strokeWidth={1}
            />
            <text
              x={PAD_LEFT - 8}
              y={yFor(t)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={11}
              fill="var(--text-faint)"
            >
              {t.toFixed(0)}°
            </text>
          </g>
        ))}

        <path d={areaPath} fill="var(--accent)" opacity={0.1} />
        <path d={linePath} fill="none" stroke="var(--accent)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        {data.map((d, i) => {
          const isExtreme = i === minIdx || i === maxIdx;
          return (
            <g key={d.label}>
              <circle
                cx={xFor(i)}
                cy={yFor(d.value)}
                r={isExtreme ? 4.5 : 3}
                fill="var(--accent)"
                stroke="var(--surface)"
                strokeWidth={2}
              />
              {isExtreme && (
                <text
                  x={xFor(i)}
                  y={yFor(d.value) + (i === maxIdx ? -12 : 20)}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={600}
                  fill="var(--text)"
                >
                  {d.value}°F
                </text>
              )}
              <text
                x={xFor(i)}
                y={PAD_TOP + plotH + 20}
                textAnchor="middle"
                fontSize={11}
                fill="var(--text-muted)"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-[11px] font-mono uppercase tracking-wide text-[color:var(--text-faint)] flex justify-between">
        <span>{xLabel}</span>
        <span>{yLabel}</span>
      </figcaption>
      {note && (
        <p className="mt-2 text-[13px] text-[color:var(--text-muted)] italic">{note}</p>
      )}
    </figure>
  );
}
