"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useElementWidth, useReducedMotion } from "@/lib/hooks";

/* ================= Speed skating: the samalog ================= */

const DISTANCES = [
  { m: 500, def: "36.00" },
  { m: 1500, def: "1:48.00" },
  { m: 5000, def: "6:00.00" },
  { m: 10000, def: "12:00.00" },
];

/** Parse "m:ss.hh" or "ss.hh" into hundredths of a second. */
function parseTime(s: string): number | null {
  const m = s.trim().match(/^(?:(\d{1,2}):)?(\d{1,2})(?:[.,](\d{1,2}))?$/);
  if (!m) return null;
  const min = m[1] ? Number(m[1]) : 0;
  const sec = Number(m[2]);
  if (m[1] && sec >= 60) return null;
  const hund = m[3] ? Number(m[3].padEnd(2, "0")) : 0;
  return (min * 60 + sec) * 100 + hund;
}

function fmtPoints(thousandths: number) {
  return (thousandths / 1000).toFixed(3);
}

export function Samalog() {
  const [times, setTimes] = useState(DISTANCES.map((d) => d.def));
  const rows = DISTANCES.map((d, i) => {
    const h = parseTime(times[i]);
    const factor = d.m / 500;
    // points = seconds per 500 m, truncated (not rounded) to three decimals
    const pts = h === null ? null : Math.floor((h * 10) / factor);
    return { ...d, h, factor, pts };
  });
  const valid = rows.every((r) => r.pts !== null);
  const total = rows.reduce((a, r) => a + (r.pts ?? 0), 0);
  const maxPts = Math.max(40000, ...rows.map((r) => r.pts ?? 0));

  return (
    <div className="samalog">
      <div className="samalog__table" role="table" aria-label="Samalog conversion">
        <div className="samalog__head" role="row">
          <span role="columnheader">Distance</span>
          <span role="columnheader">Time</span>
          <span role="columnheader">÷ 500 m units</span>
          <span role="columnheader">Points</span>
        </div>
        {rows.map((r, i) => (
          <div key={r.m} className="samalog__row" role="row">
            <span role="cell" className="num samalog__dist">
              {r.m.toLocaleString("en-GB")} m
            </span>
            <span role="cell">
              <label htmlFor={`sama-${r.m}`} className="visually-hidden">
                Time for {r.m} metres
              </label>
              <input
                id={`sama-${r.m}`}
                className="input"
                inputMode="decimal"
                value={times[i]}
                aria-invalid={r.h === null}
                aria-describedby="sama-help"
                onChange={(e) => setTimes((t) => t.map((x, k) => (k === i ? e.target.value : x)))}
              />
            </span>
            <span role="cell" className="mono samalog__div">
              ÷ {r.factor}
            </span>
            <span role="cell" className="samalog__pts">
              <span className="num">{r.pts === null ? "—" : fmtPoints(r.pts)}</span>
              <span className="samalog__bar" aria-hidden="true">
                <span style={{ width: r.pts ? `${(r.pts / maxPts) * 100}%` : 0 }} />
              </span>
            </span>
          </div>
        ))}
        <div className="samalog__foot" role="row">
          <span role="cell" className="mono">
            Total
          </span>
          <span role="cell" />
          <span role="cell" />
          <span role="cell" className="num samalog__total">
            {valid ? fmtPoints(total) : "—"}
          </span>
        </div>
      </div>
      <p id="sama-help" className="spec-read mono">
        Type times as seconds (36.00) or minutes:seconds (1:48.00). Points are seconds per 500 metres, cut off after three
        decimals rather than rounded. Lowest total wins.
      </p>
      <p className="live" aria-live="polite">
        {valid ? `Total ${fmtPoints(total)} points.` : "One of the times is not in a format I can read, such as 1:48.00."}
      </p>
    </div>
  );
}

/* ================= Decathlon: one formula ================= */

const A = 25.4347;
const B = 18;
const C = 1.81;
const pts100 = (t: number) => (t >= B ? 0 : Math.floor(A * Math.pow(B - t, C)));

export function DecathlonFormula() {
  const [raw, setRaw] = useState("10.55");
  const t = Number(raw.replace(",", "."));
  const ok = Number.isFinite(t) && t > 8 && t < 18;
  const p = ok ? pts100(t) : null;

  const { ref, width } = useElementWidth<HTMLDivElement>(520);
  const W = Math.min(560, width);
  const H = 220;
  const M = { l: 48, r: 16, t: 14, b: 34 };
  const T0 = 9.5;
  const T1 = 13.5;
  const P1 = 1200;
  const sx = (x: number) => M.l + ((x - T0) / (T1 - T0)) * (W - M.l - M.r);
  const sy = (y: number) => M.t + (1 - y / P1) * (H - M.t - M.b);
  const curve = Array.from({ length: 81 }, (_, i) => T0 + (i * (T1 - T0)) / 80)
    .map((x, i) => `${i ? "L" : "M"} ${sx(x).toFixed(1)} ${sy(A * Math.pow(B - x, C)).toFixed(1)}`)
    .join(" ");

  const gainFast = pts100(9.9) - pts100(10.0);
  const gainSlow = pts100(11.9) - pts100(12.0);

  return (
    <div className="deca">
      <div className="deca__input">
        <div className="field">
          <label htmlFor="deca-100">100 m time (seconds)</label>
          <input
            id="deca-100"
            className="input"
            inputMode="decimal"
            value={raw}
            aria-invalid={!ok}
            onChange={(e) => setRaw(e.target.value)}
          />
        </div>
        <div className="deca__out">
          <span className="num">{p ?? "—"}</span>
          <span className="mono">points</span>
        </div>
      </div>
      <div ref={ref} className="deca__chartwrap">
      <svg className="deca__chart" viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label={`Curve of decathlon 100 metre points against time, from ${pts100(T0)} points at 9.5 seconds to ${pts100(T1)} at 13.5 seconds.`}>
        {[0, 400, 800, 1200].map((v) => (
          <g key={v}>
            <line x1={M.l} x2={W - M.r} y1={sy(v)} y2={sy(v)} className="rchart__grid" />
            <text x={M.l - 8} y={sy(v) + 4} textAnchor="end" className="rchart__tick">
              {v}
            </text>
          </g>
        ))}
        {(W < 420 ? [10, 12] : [10, 11, 12, 13]).map((x) => (
          <text key={x} x={sx(x)} y={H - 12} textAnchor="middle" className="rchart__tick">
            {x}.0 s
          </text>
        ))}
        <path d={curve} fill="none" stroke="var(--series-1)" strokeWidth="2.5" />
        {ok && t >= T0 && t <= T1 && p !== null && (
          <g>
            <line x1={sx(t)} x2={sx(t)} y1={sy(0)} y2={sy(p)} stroke="var(--ink)" strokeDasharray="3 3" />
            <circle cx={sx(t)} cy={sy(p)} r="6" fill="var(--series-1)" stroke="var(--paper-2)" strokeWidth="2" />
          </g>
        )}
      </svg>
      </div>
      <p className="spec-read mono">
        The curve bends: going from 10.0 to 9.9 seconds earns {gainFast} points, but from 12.0 to 11.9 only {gainSlow}.
      </p>
      <details className="formula">
        <summary className="mono">Show the formula</summary>
        <div className="formula__body">
          <p className="formula__eq">
            <span className="spoken">Points</span> = ⌊ A × (B − T)<sup>C</sup> ⌋
          </p>
          <p className="mono formula__vals">
            100 m: A = {A}, B = {B} s, C = {C}. T is the time in seconds (fully automatic timing). Field events use A × (M −
            B)<sup>C</sup>, where M is the distance or height.
          </p>
          {ok && p !== null && (
            <p className="mono formula__vals">
              {A} × ({B} − {t.toFixed(2)})<sup>{C}</sup> = {(A * Math.pow(B - t, C)).toFixed(2)} → {p} points
            </p>
          )}
        </div>
      </details>
      <p className="live" aria-live="polite">
        {ok ? `${t.toFixed(2)} seconds scores ${p} points.` : "Enter a time between 8 and 18 seconds, such as 10.55."}
      </p>
    </div>
  );
}

/* ================= Nordic combined: points become seconds ================= */

const SECONDS_PER_POINT = 4;

const OTHERS = [
  { name: "B", jump: 131.2, ski: 1545 },
  { name: "C", jump: 122.0, ski: 1515 },
  { name: "D", jump: 118.4, ski: 1490 },
  { name: "E", jump: 110.9, ski: 1505 },
];

export function NordicCombined() {
  const [you, setYou] = useState(124.0);
  const [phase, setPhase] = useState<"start" | "racing" | "done">("start");
  const [clock, setClock] = useState(0);
  const reduced = useReducedMotion();
  const raf = useRef(0);

  const field = useMemo(() => {
    const all = [{ name: "A", jump: you, ski: 1520, you: true }, ...OTHERS.map((o) => ({ ...o, you: false }))];
    const best = Math.max(...all.map((a) => a.jump));
    return all
      .map((a) => {
        const gap = Math.round((best - a.jump) * SECONDS_PER_POINT * 10) / 10;
        return { ...a, gap, finish: gap + a.ski };
      })
      .sort((a, b) => a.gap - b.gap);
  }, [you]);

  const end = Math.max(...field.map((f) => f.finish));
  const order = [...field].sort((a, b) => a.finish - b.finish);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const race = () => {
    cancelAnimationFrame(raf.current);
    if (reduced) {
      setClock(end);
      setPhase("done");
      return;
    }
    setPhase("racing");
    const t0 = performance.now();
    const dur = 7000;
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / dur);
      // spend the animation on the interesting part: the start gaps and the finish
      const c = k < 0.25 ? (k / 0.25) * 120 : 120 + ((k - 0.25) / 0.75) * (end - 120);
      setClock(c);
      if (k < 1) raf.current = requestAnimationFrame(tick);
      else setPhase("done");
    };
    raf.current = requestAnimationFrame(tick);
  };

  const pos = (f: (typeof field)[number]) => {
    if (clock <= f.gap) return 0;
    const raced = clock - f.gap;
    return Math.min(1, raced / f.ski);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const r = (s - m * 60).toFixed(1).padStart(4, "0");
    return m ? `+${m}:${r}` : `+${s.toFixed(1)}`;
  };

  return (
    <div className={`nordic nordic--${phase}`}>
      <div className="nordic__control">
        <label htmlFor="nordic-you" className="mono">
          Skier A’s jump: <strong>{you.toFixed(1)} points</strong>
        </label>
        <input
          id="nordic-you"
          className="range"
          type="range"
          min={100}
          max={140}
          step={0.5}
          value={you}
          disabled={phase === "racing"}
          onChange={(e) => {
            setYou(Number(e.target.value));
            setPhase("start");
            setClock(0);
          }}
        />
      </div>

      <ol className="nordic__lanes" aria-label="Start list and race">
        {field.map((f) => {
          const p = pos(f);
          const place = order.findIndex((o) => o.name === f.name) + 1;
          return (
            <li key={f.name} className={`nordic__lane${f.you ? " is-you" : ""}`}>
              <span className="nordic__name mono">{f.name}</span>
              <span className="nordic__numbers">
                <span className="nordic__jump mono">{f.jump.toFixed(1)} pts</span>
                <span className="nordic__gap num">{f.gap === 0 ? "0.0" : fmt(f.gap)}</span>
              </span>
              <span className="nordic__track">
                <span className="nordic__skier" style={{ left: `calc(${(p * 100).toFixed(2)}% - 9px)` }} />
                <span className="nordic__finish" />
              </span>
              <span className="nordic__place num">{phase === "done" ? place : ""}</span>
            </li>
          );
        })}
      </ol>

      <div className="btn-row">
        <button type="button" className="btn btn--solid" onClick={race} disabled={phase === "racing"}>
          {phase === "done" ? "Race again" : "Start the race"}
        </button>
      </div>
      <p className="live" aria-live="polite">
        {phase === "start" &&
          `Start list: ${field.map((f) => `${f.name} ${f.gap === 0 ? "first" : `${fmt(f.gap)} s`}`).join(", ")}. Each point behind the best jump costs ${SECONDS_PER_POINT} seconds.`}
        {phase === "racing" && "Racing. The jump points are now just head starts."}
        {phase === "done" && `First across the line: ${order[0].name}. Then ${order.slice(1).map((o) => o.name).join(", ")}.`}
      </p>
    </div>
  );
}
