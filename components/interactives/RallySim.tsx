"use client";

import { useMemo, useState } from "react";
import { mulberry32, useElementWidth } from "@/lib/hooks";

const SETS = 3000;

/** Rallies needed to finish one set. */
function playSet(rand: () => number, pServe: number, target: number, sideOut: boolean): number {
  const score = [0, 0];
  let server = rand() < 0.5 ? 0 : 1;
  let rallies = 0;
  for (;;) {
    rallies++;
    const serverWins = rand() < pServe;
    const winner = serverWins ? server : 1 - server;
    if (sideOut) {
      if (serverWins) score[server]++;
      else server = 1 - server; // side-out: serve changes hands, no point
    } else {
      score[winner]++;
      server = winner;
    }
    const [a, b] = score;
    if ((a >= target || b >= target) && Math.abs(a - b) >= 2) return rallies;
    if (rallies > 2000) return rallies;
  }
}

function quantile(sorted: number[], q: number) {
  const i = (sorted.length - 1) * q;
  const lo = Math.floor(i);
  const hi = Math.ceil(i);
  return Math.round(sorted[lo] + (sorted[hi] - sorted[lo]) * (i - lo));
}

const BIN = 5;
const ROW_H = 132;
const M = { l: 12, r: 12, t: 6, b: 48 };

export default function RallySim() {
  const [p, setP] = useState(50);
  const [hover, setHover] = useState<{ row: number; bin: number } | null>(null);
  const { ref, width: W } = useElementWidth<HTMLDivElement>(680);

  const data = useMemo(() => {
    const rand = mulberry32(1970 + p);
    const systems = [
      { name: "Side-out scoring", sub: "only the server scores · to 15", color: "var(--series-1)", sideOut: true, target: 15 },
      { name: "Rally scoring", sub: "every rally scores · to 25", color: "var(--series-2)", sideOut: false, target: 25 },
    ];
    return systems.map((s) => {
      const lengths = Array.from({ length: SETS }, () => playSet(rand, p / 100, s.target, s.sideOut)).sort((a, b) => a - b);
      return {
        ...s,
        lengths,
        median: quantile(lengths, 0.5),
        p10: quantile(lengths, 0.1),
        p90: quantile(lengths, 0.9),
        max: lengths[lengths.length - 1],
      };
    });
  }, [p]);

  const xMax = Math.min(200, Math.max(...data.map((d) => d.p90)) + 40);
  const bins = Math.ceil(xMax / BIN);
  const hist = data.map((d) => {
    const h = new Array(bins).fill(0);
    d.lengths.forEach((v) => {
      const b = Math.min(bins - 1, Math.floor(v / BIN));
      h[b]++;
    });
    return h.map((c) => c / SETS);
  });
  const yMax = Math.max(...hist.flat());
  const sx = (v: number) => M.l + (v / xMax) * (W - M.l - M.r);
  const H = M.t + ROW_H * 2 + M.b;
  const step = W < 480 ? 40 : 20;
  const ticks = Array.from({ length: Math.floor(xMax / step) + 1 }, (_, i) => i * step);
  const spread = data.map((d) => d.p90 - d.p10);

  return (
    <div className="rally">
      <div className="rally__control">
        <label htmlFor="rally-p" className="mono">
          Chance the serving side wins a rally: <strong>{p}%</strong>
        </label>
        <input
          id="rally-p"
          className="range"
          type="range"
          min={30}
          max={70}
          step={5}
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
        />
      </div>

      <div className="rally__plot" ref={ref}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Histograms of rallies per set from ${SETS} simulated sets each. Side-out scoring: median ${data[0].median} rallies, 80 per cent of sets between ${data[0].p10} and ${data[0].p90}. Rally scoring: median ${data[1].median}, between ${data[1].p10} and ${data[1].p90}.`}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={sx(t)} x2={sx(t)} y1={M.t} y2={M.t + ROW_H * 2} className="rchart__grid" />
              <text x={sx(t)} y={H - 28} textAnchor="middle" className="rchart__tick">
                {t}
              </text>
            </g>
          ))}
          {data.map((d, row) => {
            const base = M.t + ROW_H * (row + 1) - 8;
            const hMax = ROW_H - 56;
            const top = M.t + ROW_H * row;
            return (
              <g key={d.name}>
                <text x={M.l} y={top + 18} className="rally__name">
                  {d.name}
                </text>
                <text x={M.l} y={top + 34} className="rally__sub">
                  {d.sub}
                </text>
                {hist[row].map((f, b) => {
                  if (f === 0) return null;
                  const h = Math.max(1.5, (f / yMax) * hMax);
                  const x = sx(b * BIN) + 1;
                  const w = sx(BIN) - sx(0) - 2;
                  const on = hover?.row === row && hover.bin === b;
                  return (
                    <rect
                      key={b}
                      x={x}
                      y={base - h}
                      width={w}
                      height={h}
                      rx="1.5"
                      fill={d.color}
                      opacity={hover && !on ? 0.55 : 1}
                      onPointerEnter={() => setHover({ row, bin: b })}
                      onPointerLeave={() => setHover(null)}
                    />
                  );
                })}
                <line x1={sx(0)} x2={W - M.r} y1={base} y2={base} className="rally__base" />
                {/* 10th–90th percentile bracket and median */}
                <line x1={sx(d.p10)} x2={sx(d.p90)} y1={base + 6} y2={base + 6} stroke="var(--ink)" strokeWidth="2" />
                <line x1={sx(d.p10)} x2={sx(d.p10)} y1={base + 2} y2={base + 10} stroke="var(--ink)" strokeWidth="2" />
                <line x1={sx(d.p90)} x2={sx(d.p90)} y1={base + 2} y2={base + 10} stroke="var(--ink)" strokeWidth="2" />
                <circle cx={sx(d.median)} cy={base + 6} r="4" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="2" />
              </g>
            );
          })}
          <text x={W - M.r} y={H - 6} textAnchor="end" className="rchart__tick">
            rallies per set →
          </text>
        </svg>
        {hover && (
          <div
            className="rchart__tip"
            style={{ left: `${(sx(hover.bin * BIN + BIN / 2) / W) * 100}%`, top: hover.row === 0 ? "8%" : "48%" }}
            aria-hidden="true"
          >
            <strong className="mono">
              {hover.bin * BIN}–{hover.bin * BIN + BIN - 1} rallies
            </strong>
            <span>
              {data[hover.row].name}: {(hist[hover.row][hover.bin] * 100).toFixed(1)}% of sets
            </span>
          </div>
        )}
      </div>

      <dl className="rally__stats">
        {data.map((d, i) => (
          <div key={d.name} className="rally__stat">
            <dt className="mono">{d.name}</dt>
            <dd>
              <span className="num">{d.median}</span> rallies in a typical set; 80% of sets take between {d.p10} and {d.p90}{" "}
              (a spread of <strong>{spread[i]}</strong>). Longest: {d.max}.
            </dd>
          </div>
        ))}
      </dl>
      <p className="spec-read mono">
        A simple model of two evenly matched teams, {SETS.toLocaleString("en-GB")} simulated sets per system. Not real match
        data. The point is the shape: rally scoring makes a set’s length far more predictable.
      </p>
    </div>
  );
}
