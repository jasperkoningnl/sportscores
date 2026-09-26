"use client";

import { useMemo, useState } from "react";
import { mulberry32 } from "@/lib/hooks";

/* ================= Expected goals: replaying one match ================= */

const HOME = [0.04, 0.07, 0.09, 0.11];
const AWAY = [0.76, 0.35, 0.28, 0.21, 0.14, 0.09, 0.06, 0.05];
const RUNS = 10000;

const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);

export function XgReplay() {
  const [runs, setRuns] = useState(0);

  const result = useMemo(() => {
    if (!runs) return null;
    const rand = mulberry32(42);
    let h = 0;
    let d = 0;
    let a = 0;
    for (let i = 0; i < runs; i++) {
      const hg = HOME.reduce((n, p) => n + (rand() < p ? 1 : 0), 0);
      const ag = AWAY.reduce((n, p) => n + (rand() < p ? 1 : 0), 0);
      if (hg > ag) h++;
      else if (hg === ag) d++;
      else a++;
    }
    return { h: h / runs, d: d / runs, a: a / runs };
  }, [runs]);

  const pct = (x: number) => `${Math.round(x * 100)}%`;

  return (
    <div className="xg">
      <div className="xg__board">
        <div className="xg__team">
          <span className="mono">Home</span>
          <span className="num">1</span>
          <span className="xg__x mono">xG {sum(HOME).toFixed(2)}</span>
        </div>
        <span className="xg__dash num">–</span>
        <div className="xg__team">
          <span className="mono">Away</span>
          <span className="num">0</span>
          <span className="xg__x mono">xG {sum(AWAY).toFixed(2)}</span>
        </div>
      </div>

      <div className="xg__shots" aria-label="Shots and their expected-goal values">
        {[
          { name: "Home", shots: HOME, goal: 3 },
          { name: "Away", shots: AWAY, goal: -1 },
        ].map((t) => (
          <div key={t.name} className="xg__row">
            <span className="mono xg__rowname">{t.name}</span>
            <span className="xg__dots">
              {t.shots.map((p, i) => (
                <span
                  key={i}
                  className={`xg__dot${i === t.goal ? " is-goal" : ""}`}
                  style={{ width: `${8 + p * 44}px`, height: `${8 + p * 44}px` }}
                  title={`${p.toFixed(2)} xG${i === t.goal ? ", scored" : ""}`}
                />
              ))}
            </span>
          </div>
        ))}
        <p className="spec-read mono">Circle size = chance of that shot becoming a goal. The filled circle went in.</p>
      </div>

      <div className="btn-row">
        <button type="button" className="btn btn--solid" onClick={() => setRuns(RUNS)} disabled={runs > 0}>
          Replay this match {RUNS.toLocaleString("en-GB")} times
        </button>
        {runs > 0 && (
          <button type="button" className="btn btn--small" onClick={() => setRuns(0)}>
            Reset
          </button>
        )}
      </div>

      {result && (
        <div className="xg__result">
          <div className="xg__bar" role="img" aria-label={`Home win ${pct(result.h)}, draw ${pct(result.d)}, away win ${pct(result.a)}.`}>
            <span className="xg__seg xg__seg--h" style={{ width: pct(result.h) }} />
            <span className="xg__seg xg__seg--d" style={{ width: pct(result.d) }} />
            <span className="xg__seg xg__seg--a" style={{ width: pct(result.a) }} />
          </div>
          <div className="xg__legend mono">
            <span>
              <i className="xg__seg--h" /> Home win {pct(result.h)}
            </span>
            <span>
              <i className="xg__seg--d" /> Draw {pct(result.d)}
            </span>
            <span>
              <i className="xg__seg--a" /> Away win {pct(result.a)}
            </span>
          </div>
        </div>
      )}
      <p className="live" aria-live="polite">
        {result
          ? `The team that won 1–0 would have won only ${pct(result.h)} of these replays.`
          : "An invented match. Home won 1–0 with four low-quality shots; Away had eight, several of them good chances."}
      </p>
    </div>
  );
}

/* ================= Elo: a rating that moves with results ================= */

const K = 20;

export function EloCalc() {
  const [ra, setRa] = useState(1800);
  const [rb, setRb] = useState(1600);
  const [res, setRes] = useState<1 | 0.5 | 0>(0);
  const ea = 1 / (1 + Math.pow(10, (rb - ra) / 400));
  const delta = Math.round(K * (res - ea) * 10) / 10;

  return (
    <div className="elo">
      <div className="elo__inputs">
        <div className="field">
          <label htmlFor="elo-a">Team A rating</label>
          <input id="elo-a" className="input" type="number" step={10} value={ra} onChange={(e) => setRa(Number(e.target.value) || 0)} />
        </div>
        <div className="field">
          <label htmlFor="elo-b">Team B rating</label>
          <input id="elo-b" className="input" type="number" step={10} value={rb} onChange={(e) => setRb(Number(e.target.value) || 0)} />
        </div>
      </div>
      <div className="btn-row" role="group" aria-label="Result">
        <button type="button" className="btn" aria-pressed={res === 1} onClick={() => setRes(1)}>
          A wins
        </button>
        <button type="button" className="btn" aria-pressed={res === 0.5} onClick={() => setRes(0.5)}>
          Draw
        </button>
        <button type="button" className="btn" aria-pressed={res === 0} onClick={() => setRes(0)}>
          B wins
        </button>
      </div>
      <div className="elo__out">
        <div>
          <span className="mono">A expected to score</span>
          <span className="num">{ea.toFixed(2)}</span>
        </div>
        <div>
          <span className="mono">A’s rating change</span>
          <span className={`num${delta < 0 ? " is-neg" : ""}`}>{delta > 0 ? `+${delta}` : delta}</span>
        </div>
        <div>
          <span className="mono">New ratings</span>
          <span className="num elo__new">
            {Math.round((ra + delta) * 10) / 10} · {Math.round((rb - delta) * 10) / 10}
          </span>
        </div>
      </div>
      <p className="spec-read mono">
        Expected score = 1 / (1 + 10<sup>(Rb − Ra)/400</sup>). Change = K × (result − expected), with K = {K} here. An upset
        moves the ratings a lot; the favourite winning barely moves them.
      </p>
      <p className="live" aria-live="polite">
        {res === 1 ? "A wins" : res === 0 ? "B wins" : "A draw"}: A {delta >= 0 ? "gains" : "loses"} {Math.abs(delta)} points.
      </p>
    </div>
  );
}
