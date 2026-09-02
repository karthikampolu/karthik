/* Small themed SVG charts for the mini books dashboard. */

const AXIS = "var(--border-strong)";
const GRID = "var(--border)";
const FAINT = "var(--text-faint)";

const inrShort = (n: number) => {
  if (Math.abs(n) >= 1e7) return `${(n / 1e7).toFixed(1)}Cr`;
  if (Math.abs(n) >= 1e5) return `${(n / 1e5).toFixed(1)}L`;
  if (Math.abs(n) >= 1e3) return `${Math.round(n / 1e3)}k`;
  return `${Math.round(n)}`;
};

/* ---------- Grouped bars: income vs expense per month ---------- */

export function GroupedBar({
  data,
  aLabel,
  bLabel,
}: {
  data: { label: string; a: number; b: number }[];
  aLabel: string;
  bLabel: string;
}) {
  const W = 640;
  const H = 260;
  const padL = 44;
  const padB = 34;
  const padT = 16;
  const plotW = W - padL - 16;
  const plotH = H - padB - padT;
  const max = Math.max(1, ...data.flatMap((d) => [d.a, d.b]));
  const group = plotW / Math.max(data.length, 1);
  const bw = Math.min(22, group / 3);
  const y = (v: number) => padT + plotH - (v / max) * plotH;

  return (
    <figure className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[420px]" role="img" aria-label={`${aLabel} vs ${bLabel} by month`}>
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <g key={f}>
            <line x1={padL} x2={W - 16} y1={padT + plotH * f} y2={padT + plotH * f} stroke={GRID} />
            <text x={padL - 6} y={padT + plotH * f + 3} textAnchor="end" fontSize={10} fill={FAINT}>
              {inrShort(max * (1 - f))}
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const gx = padL + i * group + (group - bw * 2 - 4) / 2;
          return (
            <g key={d.label}>
              <rect x={gx} y={y(d.a)} width={bw} height={padT + plotH - y(d.a)} fill="var(--accent)" />
              <rect x={gx + bw + 4} y={y(d.b)} width={bw} height={padT + plotH - y(d.b)} fill="var(--accent2, #c55a11)" opacity={0.55} />
              <text x={gx + bw} y={H - padB + 16} textAnchor="middle" fontSize={10.5} fill={FAINT}>
                {d.label}
              </text>
            </g>
          );
        })}
        <line x1={padL} x2={W - 16} y1={padT + plotH} y2={padT + plotH} stroke={AXIS} />
      </svg>
      <figcaption className="mt-2 flex gap-4 text-[11px] text-[color:var(--text-muted)]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[color:var(--accent)]" />
          {aLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[color:var(--accent)] opacity-55" />
          {bLabel}
        </span>
      </figcaption>
    </figure>
  );
}

/* ---------- Line: cash balance over time ---------- */

export function LineChart({ data }: { data: { label: string; value: number }[] }) {
  const W = 640;
  const H = 240;
  const padL = 46;
  const padB = 28;
  const padT = 16;
  const plotW = W - padL - 16;
  const plotH = H - padB - padT;
  const vals = data.map((d) => d.value);
  const max = Math.max(1, ...vals);
  const min = Math.min(0, ...vals);
  const x = (i: number) => padL + (i / Math.max(data.length - 1, 1)) * plotW;
  const y = (v: number) => padT + plotH - ((v - min) / (max - min || 1)) * plotH;
  const d = data.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p.value)}`).join(" ");

  return (
    <figure className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[420px]" role="img" aria-label="Cash balance over time">
        {[0, 0.5, 1].map((f) => (
          <g key={f}>
            <line x1={padL} x2={W - 16} y1={padT + plotH * f} y2={padT + plotH * f} stroke={GRID} />
            <text x={padL - 6} y={padT + plotH * f + 3} textAnchor="end" fontSize={10} fill={FAINT}>
              {inrShort(max - (max - min) * f)}
            </text>
          </g>
        ))}
        <path d={`${d} L${x(data.length - 1)},${y(min)} L${x(0)},${y(min)} Z`} fill="var(--accent)" opacity={0.08} />
        <path d={d} fill="none" stroke="var(--accent)" strokeWidth={2} />
        {data.map((p, i) => (
          <circle key={i} cx={x(i)} cy={y(p.value)} r={2.4} fill="var(--accent)" />
        ))}
        <line x1={padL} x2={W - 16} y1={padT + plotH} y2={padT + plotH} stroke={AXIS} />
      </svg>
    </figure>
  );
}

/* ---------- Donut: composition ---------- */

export function Donut({ data }: { data: { label: string; value: number }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const R = 70;
  const r = 42;
  const cx = 90;
  const cy = 90;
  const START = -Math.PI / 2;
  const tones = ["var(--accent)", "#c55a11", "#548235", "#7d6608", "#5b6b8c", "#8a4b6b"];

  // cumulative fractions: offsets[i] .. offsets[i+1] is slice i
  const offsets = data.reduce<number[]>((acc, d) => [...acc, acc[acc.length - 1] + d.value / total], [0]);

  const arcs = data.map((d, i) => {
    const a0 = START + offsets[i] * Math.PI * 2;
    const a1 = START + offsets[i + 1] * Math.PI * 2;
    const frac = d.value / total;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const p = (rad: number, ang: number) => `${cx + rad * Math.cos(ang)},${cy + rad * Math.sin(ang)}`;
    const dPath = `M${p(R, a0)} A${R},${R} 0 ${large} 1 ${p(R, a1)} L${p(r, a1)} A${r},${r} 0 ${large} 0 ${p(r, a0)} Z`;
    return { dPath, tone: tones[i % tones.length], label: d.label, value: d.value, frac };
  });

  return (
    <figure className="flex flex-wrap items-center gap-6">
      <svg viewBox="0 0 180 180" className="h-44 w-44 shrink-0" role="img" aria-label="Composition">
        {arcs.map((a, i) => (
          <path key={i} d={a.dPath} fill={a.tone} />
        ))}
      </svg>
      <ul className="space-y-1.5 text-[13px]">
        {arcs.map((a, i) => (
          <li key={i} className="flex items-center gap-2 text-[color:var(--text-muted)]">
            <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: a.tone }} />
            <span className="text-[color:var(--text)]">{a.label}</span>
            <span className="text-[color:var(--text-faint)]">{Math.round(a.frac * 100)}%</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
