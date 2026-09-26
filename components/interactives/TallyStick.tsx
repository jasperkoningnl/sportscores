"use client";

import { useState } from "react";

const MAX = 60;
const X0 = 40;
const GAP = 11.6;

function notchShape(i: number) {
  // i is 1-based. Every tenth notch is cut longer, every twentieth deeper:
  // the two conventions reported by cricket historians.
  const tenth = i % 10 === 0;
  const twentieth = i % 20 === 0;
  const depth = twentieth ? 34 : tenth ? 26 : 14;
  const half = twentieth ? 6 : tenth ? 4.5 : 3.2;
  return { depth, half, tenth, twentieth };
}

export default function TallyStick() {
  const [count, setCount] = useState(7);
  const [reading, setReading] = useState(false);
  const [last, setLast] = useState<number | null>(null);

  const cut = (n: number) => {
    setReading(false);
    const next = Math.min(MAX, count + n);
    setCount(next);
    setLast(next);
  };

  const scores = Math.floor(count / 20);
  const rest = count % 20;
  const full = count >= MAX;

  const message = full
    ? `The stick is full at ${MAX} notches. A scorer would reach for another stick.`
    : `${count} ${count === 1 ? "notch" : "notches"} cut${
        scores ? `: ${scores} ${scores === 1 ? "score" : "scores"} of twenty and ${rest} more` : ""
      }.`;

  return (
    <div
      className="tally"
      onKeyDown={(e) => {
        if ((e.key === "n" || e.key === "N") && !e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          cut(1);
        }
      }}
    >
      <div className={`tally__stage${reading ? " is-reading" : ""}`}>
        <svg className="tally__svg" viewBox="0 0 800 130" role="img" aria-label={`A hazel tally stick with ${count} notches.`}>
          <defs>
            <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d9b67c" />
              <stop offset="0.55" stopColor="#c49a5c" />
              <stop offset="1" stopColor="#9a7442" />
            </linearGradient>
          </defs>
          {/* the stick */}
          <path d="M18 34 Q 10 34 10 56 Q 10 96 22 96 L 776 98 Q 792 98 792 66 Q 792 34 778 32 Z" fill="url(#wood)" />
          {[44, 58, 72, 84].map((y, i) => (
            <path
              key={y}
              d={`M24 ${y} C 200 ${y - 3 + i}, 420 ${y + 4}, 780 ${y - 2}`}
              stroke="#8a6437"
              strokeOpacity="0.35"
              strokeWidth="1"
              fill="none"
            />
          ))}
          {/* bark knots */}
          <ellipse cx="610" cy="78" rx="9" ry="4" fill="#8a6437" opacity="0.45" />
          <ellipse cx="170" cy="86" rx="6" ry="3" fill="#8a6437" opacity="0.4" />
          {/* notches cut into the top edge */}
          <g className="tally__notches">
            {Array.from({ length: count }, (_, k) => {
              const i = k + 1;
              const x = X0 + k * GAP;
              const { depth, half, twentieth } = notchShape(i);
              const top = 33.5;
              return (
                <g key={i} className={`tally__notch${i === last ? " is-new" : ""}`} style={{ transformOrigin: `${x}px ${top}px` }}>
                  <path
                    d={`M${x - half} ${top} L${x} ${top + depth} L${x + half} ${top} Z`}
                    fill={twentieth ? "#3a2410" : "#5a3a1c"}
                  />
                  <path d={`M${x} ${top + depth} L${x + half} ${top}`} stroke="#f0d8a8" strokeWidth="1" opacity="0.7" />
                  {i === last && (
                    <g className="tally__chips" aria-hidden="true">
                      <path d={`M${x} ${top - 2} l4 -6 l3 5 z`} fill="#e7c894" />
                      <path d={`M${x - 2} ${top - 1} l-5 -4 l2 6 z`} fill="#d7b176" />
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
        <div className="tally__reading" aria-hidden={!reading}>
          <span className="tally__numeral num">{count}</span>
          <span className="tally__breakdown mono">
            {scores > 0 ? `${scores} × 20 + ${rest}` : `${rest} ${rest === 1 ? "notch" : "notches"}`}
          </span>
        </div>
      </div>

      <div className="tally__controls">
        <div className="btn-row">
          <button type="button" className="btn btn--solid" onClick={() => cut(1)} disabled={full}>
            Cut a notch
          </button>
          <button type="button" className="btn" onClick={() => cut(4)} disabled={full}>
            Cut four
          </button>
          <button
            type="button"
            className="btn btn--red"
            aria-pressed={reading}
            onClick={() => setReading((r) => !r)}
            disabled={count === 0}
          >
            {reading ? "Show the stick" : "Read it as a number"}
          </button>
          <button
            type="button"
            className="btn btn--small"
            onClick={() => {
              setCount(0);
              setLast(null);
              setReading(false);
            }}
          >
            New stick
          </button>
        </div>
        <p className="live" aria-live="polite">
          {message}
        </p>
        <ul className="tally__legend mono">
          <li>
            <span className="tally__key" /> one run
          </li>
          <li>
            <span className="tally__key tally__key--ten" /> every tenth, cut longer
          </li>
          <li>
            <span className="tally__key tally__key--twenty" /> every twentieth, cut deeper: a score
          </li>
        </ul>
      </div>
    </div>
  );
}
