"use client";

import { useState } from "react";

const STAGES = [
  { label: "The ground’s own board", when: "Early broadcasts" },
  { label: "Flashed up now and then", when: "Before the 1990s" },
  { label: "Always on screen", when: "Sky 1992 · Fox 1994" },
  { label: "The whole game state", when: "Today" },
];

function WideShot() {
  return (
    <g>
      <rect width="640" height="360" fill="#8fb7d6" />
      <rect y="150" width="640" height="210" fill="#3f8a4d" />
      <path d="M0 150 L640 150 L640 175 L0 175 Z" fill="#6b4a33" />
      {/* stands */}
      <rect x="0" y="95" width="640" height="55" fill="#6d7780" />
      {Array.from({ length: 64 }, (_, i) => (
        <circle key={i} cx={6 + i * 10} cy={108 + (i % 3) * 12} r="3" fill="#c7cbd0" opacity="0.6" />
      ))}
      {/* scoreboard in the outfield */}
      <rect x="220" y="22" width="200" height="86" fill="#1f4a35" stroke="#123524" strokeWidth="4" />
      <text x="320" y="44" textAnchor="middle" className="tv-board__txt">
        1 2 3 4 5 6 7 8 9 R
      </text>
      <text x="320" y="68" textAnchor="middle" className="tv-board__txt">
        0 0 1 0 0 2 0 · · 3
      </text>
      <text x="320" y="92" textAnchor="middle" className="tv-board__txt">
        1 0 0 0 3 0 · · · 4
      </text>
      <path d="M 100 360 L 320 200 L 540 360 Z" fill="#b98a5a" opacity="0.55" />
    </g>
  );
}

function PitchShot() {
  return (
    <g>
      <rect width="640" height="360" fill="#3f8a4d" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x="0" y={i * 45} width="640" height="22" fill="#3a8248" />
      ))}
      <ellipse cx="320" cy="170" rx="46" ry="14" fill="#b98a5a" />
      {/* pitcher */}
      <circle cx="320" cy="132" r="10" fill="#e9e6dc" />
      <rect x="310" y="142" width="20" height="26" rx="4" fill="#e9e6dc" />
      {/* batter, catcher, umpire */}
      <path d="M 250 360 L 320 250 L 390 360 Z" fill="#b98a5a" />
      <rect x="296" y="292" width="48" height="16" fill="#f4f1e6" opacity="0.7" />
      <circle cx="378" cy="262" r="14" fill="#23324a" />
      <rect x="364" y="276" width="28" height="60" rx="6" fill="#23324a" />
      <circle cx="318" cy="300" r="15" fill="#5a5a5a" />
      <rect x="300" y="314" width="36" height="46" rx="6" fill="#5a5a5a" />
    </g>
  );
}

function listBases(bases: boolean[]) {
  const on = ["first", "second", "third"].filter((_, i) => bases[i]);
  if (!on.length) return "no bases";
  if (on.length === 1) return on[0];
  return `${on.slice(0, -1).join(", ")} and ${on[on.length - 1]}`;
}

export default function ScoreBug() {
  const [stage, setStage] = useState(0);
  const [balls, setBalls] = useState(2);
  const [strikes, setStrikes] = useState(1);
  const [outs, setOuts] = useState(1);
  const [bases, setBases] = useState([true, false, true]);

  const toggleBase = (i: number) => setBases((b) => b.map((x, k) => (k === i ? !x : x)));

  return (
    <div className="bug">
      <div className="bug__screen">
        <svg viewBox="0 0 640 360" className="bug__svg" role="img" aria-label={`A television frame. ${STAGES[stage].label}.`}>
          {stage === 0 ? <WideShot /> : <PitchShot />}
          {stage === 1 && (
            <g className="bug__caption">
              <rect x="120" y="282" width="400" height="44" fill="#141414" opacity="0.85" />
              <text x="320" y="311" textAnchor="middle" className="bug__captxt">
                VISITORS 3 · HOME 4 · 7th INNING
              </text>
            </g>
          )}
          {stage === 2 && (
            <g>
              <rect x="20" y="18" width="190" height="34" fill="#141414" opacity="0.88" />
              <text x="32" y="41" className="bug__small">
                VIS 3 HOME 4
              </text>
              <rect x="160" y="18" width="50" height="34" fill="#b0301d" />
              <text x="185" y="41" textAnchor="middle" className="bug__small">
                7th
              </text>
            </g>
          )}
          {stage === 3 && (
            <g>
              <rect x="18" y="286" width="330" height="58" fill="#101820" opacity="0.94" />
              <rect x="18" y="286" width="8" height="58" fill="#f2ad1f" />
              <text x="36" y="310" className="bug__small">
                VIS
              </text>
              <text x="36" y="334" className="bug__small">
                HOME
              </text>
              <text x="104" y="310" textAnchor="end" className="bug__num">
                3
              </text>
              <text x="104" y="334" textAnchor="end" className="bug__num">
                4
              </text>
              <text x="140" y="324" textAnchor="middle" className="bug__small">
                ▲7
              </text>
              {/* bases diamond */}
              {[
                [214, 316],
                [196, 298],
                [178, 316],
              ].map(([x, y], i) => (
                <rect
                  key={i}
                  x={x - 8}
                  y={y - 8}
                  width="16"
                  height="16"
                  transform={`rotate(45 ${x} ${y})`}
                  fill={bases[i] ? "#f2ad1f" : "none"}
                  stroke="#fff"
                  strokeWidth="2"
                />
              ))}
              <text x="252" y="312" className="bug__small">
                {balls}-{strikes}
              </text>
              {[0, 1, 2].map((i) => (
                <circle key={i} cx={258 + i * 14} cy="328" r="5" fill={i < outs ? "#f2ad1f" : "none"} stroke="#fff" strokeWidth="1.5" />
              ))}
              <text x="336" y="312" textAnchor="end" className="bug__tiny">
                P: 87
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="bug__slider">
        <label htmlFor="bug-stage" className="mono">
          Stage {stage + 1} of 4 · {STAGES[stage].when}
        </label>
        <input
          id="bug-stage"
          className="range"
          type="range"
          min={0}
          max={3}
          step={1}
          value={stage}
          onChange={(e) => setStage(Number(e.target.value))}
          aria-valuetext={`${STAGES[stage].label}, ${STAGES[stage].when}`}
        />
        <ol className="bug__ticks">
          {STAGES.map((s, i) => (
            <li key={s.label} className={i === stage ? "is-on" : undefined}>
              <button type="button" onClick={() => setStage(i)}>
                {s.label}
              </button>
            </li>
          ))}
        </ol>
      </div>

      {stage === 3 && (
        <div className="bug__controls">
          <div className="btn-row">
            <button type="button" className="btn btn--small" onClick={() => setBalls((b) => (b + 1) % 4)}>
              Ball
            </button>
            <button type="button" className="btn btn--small" onClick={() => setStrikes((s) => (s + 1) % 3)}>
              Strike
            </button>
            <button type="button" className="btn btn--small" onClick={() => setOuts((o) => (o + 1) % 3)}>
              Out
            </button>
            {["1st", "2nd", "3rd"].map((b, i) => (
              <button key={b} type="button" className="btn btn--small" aria-pressed={bases[i]} onClick={() => toggleBase(i)}>
                Runner {b}
              </button>
            ))}
          </div>
          <p className="live" aria-live="polite">
            Top of the 7th, visitors 3, home 4. Count {balls}–{strikes}, {outs} {outs === 1 ? "out" : "outs"}, {bases.some(Boolean) ? "runners on " : ""}
            {listBases(bases)}.
          </p>
        </div>
      )}
    </div>
  );
}
