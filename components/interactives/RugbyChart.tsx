"use client";

import { useState } from "react";
import { useElementWidth } from "@/lib/hooks";

// Points values in rugby union, from the World Rugby Museum and Rugby365.
// Each series lists [year it took effect, value].
const SERIES = [
  {
    key: "try",
    name: "Try",
    color: "var(--series-1)",
    dash: undefined as string | undefined,
    nudge: 0,
    steps: [
      [1890, 1],
      [1891, 2],
      [1893, 3],
      [1971, 4],
      [1992, 5],
    ],
  },
  {
    key: "pen",
    name: "Penalty goal",
    color: "var(--series-2)",
    dash: undefined as string | undefined,
    nudge: 3,
    steps: [
      [1890, 2],
      [1891, 3],
    ],
  },
  {
    key: "drop",
    name: "Drop goal",
    color: "var(--series-3)",
    dash: "6 4",
    nudge: -3,
    steps: [
      [1891, 4],
      [1948, 3],
    ],
  },
] as const;

const X0 = 1885;
const X1 = 2026;

function valueAt(steps: readonly (readonly [number, number])[], year: number): number | null {
  let v: number | null = null;
  for (const [y, val] of steps) if (year >= y) v = val;
  return v;
}

export default function RugbyChart() {
  const [year, setYear] = useState<number | null>(null);
  const { ref, width } = useElementWidth<HTMLDivElement>(720);

  // The chart is drawn at its real pixel width so text stays legible on phones.
  const W = width;
  const narrow = W < 560;
  const H = narrow ? 250 : 300;
  const M = { l: 34, r: narrow ? 84 : 110, t: 22, b: 34 };
  const sx = (y: number) => M.l + ((y - X0) / (X1 - X0)) * (W - M.l - M.r);
  const sy = (v: number) => M.t + (1 - v / 5) * (H - M.t - M.b);
  const ticks = narrow ? [1890, 1950, 2010] : [1890, 1920, 1950, 1980, 2010];

  const stepPath = (steps: readonly (readonly [number, number])[], nudge = 0) => {
    // `nudge` shifts a line by a few pixels so series sharing a value stay visible.
    let d = "";
    steps.forEach(([yr, v], i) => {
      const x = sx(yr);
      const y = sy(v) + nudge;
      d += i === 0 ? `M ${x} ${y}` : ` H ${x} V ${y}`;
    });
    return d + ` H ${sx(X1)}`;
  };

  const move = (clientX: number, rect: DOMRect) => {
    const x = ((clientX - rect.left) / rect.width) * W;
    const yr = Math.round(X0 + ((x - M.l) / (W - M.l - M.r)) * (X1 - X0));
    setYear(Math.max(1890, Math.min(X1, yr)));
  };

  const shown = year ?? 2026;

  return (
    <div className="rchart">
      <div className="rchart__legend" aria-hidden="true">
        {SERIES.map((s) => (
          <span key={s.key} className="rchart__key">
            <svg width="26" height="10">
              <line x1="0" x2="26" y1="5" y2="5" stroke={s.color} strokeWidth="2.5" strokeDasharray={s.dash} />
            </svg>
            {s.name}
          </span>
        ))}
      </div>
      <div className="rchart__plot" ref={ref}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Step chart of points values in rugby union since 1890. The try rises from 1 point to 2 in 1891, 3 in 1893, 4 in 1971 and 5 in 1992. The penalty goal is worth 3 from 1891. The drop goal is worth 4 from 1891 and 3 from 1948."
          onPointerMove={(e) => move(e.clientX, e.currentTarget.getBoundingClientRect())}
          onPointerLeave={() => setYear(null)}
        >
          {[0, 1, 2, 3, 4, 5].map((v) => (
            <g key={v}>
              <line x1={M.l} x2={W - M.r} y1={sy(v)} y2={sy(v)} className="rchart__grid" />
              <text x={M.l - 10} y={sy(v) + 4} textAnchor="end" className="rchart__tick">
                {v}
              </text>
            </g>
          ))}
          {ticks.map((t) => (
            <text key={t} x={sx(t)} y={H - 12} textAnchor="middle" className="rchart__tick">
              {t}
            </text>
          ))}
          <text x={M.l - 10} y={M.t - 6} textAnchor="end" className="rchart__tick">
            pts
          </text>

          {/* annotations */}
          <line x1={sx(1971)} x2={sx(1971)} y1={sy(5)} y2={sy(0)} className="rchart__note-line" />
          <text x={sx(1971) - 6} y={sy(4.55)} textAnchor="end" className="rchart__note">
            {narrow ? "1971: try > kicks" : "1971: a try is worth more than any kick"}
          </text>

          {SERIES.map((s) => (
            <path
              key={s.key}
              d={stepPath(s.steps, s.nudge)}
              fill="none"
              stroke={s.color}
              strokeWidth="2.5"
              strokeDasharray={s.dash}
              strokeLinejoin="round"
            />
          ))}

          {/* direct labels at the right edge */}
          <text x={sx(X1) + 8} y={sy(5) + 4} className="rchart__label">
            Try 5
          </text>
          <text x={sx(X1) + 8} y={sy(3) - 4} className="rchart__label">
            Penalty 3
          </text>
          <text x={sx(X1) + 8} y={sy(3) + 14} className="rchart__label">
            Drop goal 3
          </text>

          {year !== null && (
            <g className="rchart__cursor">
              <line x1={sx(year)} x2={sx(year)} y1={M.t} y2={H - M.b} />
              {SERIES.map((s) => {
                const v = valueAt(s.steps, year);
                return v === null ? null : (
                  <circle key={s.key} cx={sx(year)} cy={sy(v)} r="5" fill={s.color} stroke="var(--paper-2)" strokeWidth="2" />
                );
              })}
            </g>
          )}
        </svg>
        {year !== null && (
          <div
            className="rchart__tip"
            style={{ left: `${(sx(year) / W) * 100}%` }}
            aria-hidden="true"
          >
            <strong className="mono">{year}</strong>
            {SERIES.map((s) => {
              const v = valueAt(s.steps, year);
              return (
                <span key={s.key}>
                  {s.name}: {v ?? "—"}
                </span>
              );
            })}
          </div>
        )}
      </div>
      <div className="rchart__slider">
        <label htmlFor="rugby-year" className="mono">
          Year
        </label>
        <input
          id="rugby-year"
          className="range"
          type="range"
          min={1890}
          max={2026}
          value={shown}
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <output htmlFor="rugby-year" className="mono" aria-live="polite">
          {shown}: try {valueAt(SERIES[0].steps, shown)}, penalty {valueAt(SERIES[1].steps, shown) ?? "—"}, drop goal{" "}
          {valueAt(SERIES[2].steps, shown) ?? "—"}
        </output>
      </div>
      <details className="datatable">
        <summary className="mono">Data table</summary>
        <table>
          <thead>
            <tr>
              <th scope="col">From</th>
              <th scope="col">Try</th>
              <th scope="col">Penalty goal</th>
              <th scope="col">Drop goal</th>
            </tr>
          </thead>
          <tbody>
            {[1890, 1891, 1893, 1948, 1971, 1992].map((y) => (
              <tr key={y}>
                <th scope="row">{y}</th>
                <td>{valueAt(SERIES[0].steps, y)}</td>
                <td>{valueAt(SERIES[1].steps, y) ?? "—"}</td>
                <td>{valueAt(SERIES[2].steps, y) ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
