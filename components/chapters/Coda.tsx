"use client";

import type { ReactNode } from "react";
import Scrolly, { type Scene } from "@/components/Scrolly";

function Marks({ n, shown }: { n: number; shown: number }) {
  return (
    <svg viewBox="0 0 220 120" className="coda-marks" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <path
          key={i}
          d={`M ${40 + i * 26} 18 C ${44 + i * 26} 50, ${38 + i * 26} 80, ${42 + i * 26} 104`}
          stroke="var(--ink)"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
          className="coda-mark"
          style={{ strokeDasharray: 100, strokeDashoffset: 100 * (1 - Math.max(0, Math.min(1, shown * n - i))) }}
          pathLength={100}
        />
      ))}
      <line x1="118" y1="62" x2="136" y2="62" stroke="var(--ink-3)" strokeWidth="4" />
      <rect x="152" y="18" width="48" height="86" fill="none" stroke="var(--rule-strong)" strokeDasharray="4 6" />
    </svg>
  );
}

function Stick({ shown }: { shown: number }) {
  return (
    <svg viewBox="0 0 420 110" className="coda-stick" aria-hidden="true">
      <path d="M16 34 Q 6 34 6 56 Q 6 82 18 82 L 400 84 Q 414 84 414 58 Q 414 32 400 30 Z" fill="#c9a263" />
      {[44, 58, 70].map((y) => (
        <path key={y} d={`M22 ${y} C 140 ${y - 2}, 260 ${y + 3}, 404 ${y - 1}`} stroke="#8a6437" strokeOpacity="0.35" fill="none" />
      ))}
      {[150, 176].map((x, i) => (
        <path
          key={x}
          d={`M${x - 6} 33 L${x} 58 L${x + 6} 33 Z`}
          fill="#4a2e14"
          style={{ opacity: shown > (i + 0.5) / 2.5 ? 1 : 0, transition: "opacity 0.2s" }}
        />
      ))}
    </svg>
  );
}

const scenes: Scene[] = [
  () => (
    <div className="op-scene">
      <p className="op-spoken">
        Thirty<span className="op-dash">–</span>love.
      </p>
      <p className="op-voice">spoken</p>
    </div>
  ),
  () => (
    <div className="op-scene">
      <p className="op-big num">30–0</p>
      <p className="op-voice">shown</p>
    </div>
  ),
  () => (
    <div className="op-scene">
      <p className="coda-recorded mono">2 points to 0</p>
      <p className="op-voice">recorded</p>
    </div>
  ),
  (_active, p) => (
    <div className="op-scene">
      <Marks n={2} shown={p} />
      <p className="op-voice">tallied</p>
    </div>
  ),
  (_active, p) => (
    <div className="op-scene">
      <Stick shown={p} />
      <p className="op-voice">cut</p>
    </div>
  ),
];

const steps: ReactNode[] = [
  <>
    <p className="kicker">Coda</p>
    <p className="op-lead">Back to where we started: thirty–love.</p>
  </>,
  <p>Take away the words and it is a display: thirty, zero.</p>,
  <p>Take away tennis’s odd arithmetic and it is a record: two points to none.</p>,
  <p>Take away the numerals and it is a tally: two marks against none.</p>,
  <p>Take away the paper and you are back where the word began: two cuts in a stick.</p>,
];

export default function Coda() {
  return (
    <section id="coda" className="coda" aria-labelledby="coda-title">
      <h2 id="coda-title" className="visually-hidden">
        Coda: two cuts in a stick
      </h2>
      <Scrolly
        className="scrolly--coda"
        scenes={scenes}
        steps={steps}
        autoplay={{ 3: 1400, 4: 1400 }}
        stageLabel="The score thirty–love stripped back step by step: 30–0, two points to nil, two tally marks against none, two notches in a stick."
      />
      <div className="coda-end">
        <p className="coda-end__big">A score looks like a number.</p>
        <p className="coda-end__small">Dig into one and you find centuries of people deciding what counts.</p>
      </div>
    </section>
  );
}
