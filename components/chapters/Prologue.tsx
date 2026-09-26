"use client";
import type { ReactNode } from "react";

import Scrolly from "@/components/Scrolly";
import { Certainty, Cite } from "@/components/ui";

function Egg({ className = "" }: { className?: string }) {
  // An egg: an ellipse whose top is narrower than its bottom.
  return (
    <svg className={className} viewBox="0 0 120 150" aria-hidden="true">
      <path
        d="M60 6 C 92 6 112 58 112 92 C 112 124 88 144 60 144 C 32 144 8 124 8 92 C 8 58 28 6 60 6 Z"
        fill="var(--plate)"
        stroke="var(--ink)"
        strokeWidth="2.5"
      />
      <ellipse cx="44" cy="52" rx="10" ry="18" fill="#fff" opacity="0.55" transform="rotate(-18 44 52)" />
    </svg>
  );
}

function ClockFace() {
  const marks = Array.from({ length: 60 }, (_, i) => i);
  const quarter = [
    { m: 15, label: "15" },
    { m: 30, label: "30" },
    { m: 45, label: "45" },
    { m: 0, label: "60" },
  ];
  const pos = (m: number, r: number) => {
    const a = (m / 60) * Math.PI * 2 - Math.PI / 2;
    return [Math.round((100 + Math.cos(a) * r) * 100) / 100, Math.round((100 + Math.sin(a) * r) * 100) / 100];
  };
  return (
    <svg className="op-clock" viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="92" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="2" />
      {marks.map((m) => {
        const [x1, y1] = pos(m, m % 5 === 0 ? 78 : 84);
        const [x2, y2] = pos(m, 90);
        return <line key={m} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink)" strokeWidth={m % 15 === 0 ? 2.5 : 1} />;
      })}
      {quarter.map(({ m, label }) => {
        const [x, y] = pos(m, 62);
        return (
          <text
            key={label}
            x={x}
            y={y + 7}
            textAnchor="middle"
            className={`op-clock__num${label === "45" ? " is-struck" : ""}`}
            fill={label === "45" ? "var(--red)" : "var(--ink)"}
          >
            {label}
          </text>
        );
      })}
      <line x1="100" y1="100" x2="100" y2="36" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" className="op-clock__hand" />
      <circle cx="100" cy="100" r="5" fill="var(--red)" />
    </svg>
  );
}

const scenes: ((active: boolean) => ReactNode)[] = [
  // 0. spoken
  () => (
    <div className="op-scene op-scene--spoken">
      <p className="op-spoken">
        Thirty<span className="op-dash">–</span>love.
      </p>
      <p className="op-voice">spoken</p>
    </div>
  ),
  // 1. the egg
  () => (
    <div className="op-scene op-scene--egg">
      <Egg className="op-egg" />
      <p className="op-egg-word">l’œuf</p>
      <p className="op-voice">“the egg” · folk etymology?</p>
    </div>
  ),
  // 2. œuf – œuf becomes 0 – 0
  () => (
    <div className="op-scene op-scene--morph">
      <div className="op-morph">
        <p className="op-morph__words">
          <span>œuf</span>
          <span className="op-dash">–</span>
          <span>œuf</span>
        </p>
        <p className="op-morph__nums num">
          <span>0</span>
          <span className="op-dash">–</span>
          <span>0</span>
        </p>
      </div>
      <p className="op-voice op-morph__voice">
        <span>a sound</span> → <span>a shape</span>
      </p>
    </div>
  ),
  // 3. 15 30 40
  () => (
    <div className="op-scene op-scene--ladder">
      <ClockFace />
      <ol className="op-ladder num">
        <li>
          <span className="op-ladder__spoken">love</span>
        </li>
        <li>15</li>
        <li>30</li>
        <li className="op-ladder__forty">
          40
          <span className="op-ladder__was">45?</span>
        </li>
        <li>
          <span className="op-ladder__spoken">game</span>
        </li>
      </ol>
    </div>
  ),
  // 4. deuce
  () => (
    <div className="op-scene op-scene--deuce">
      <ol className="op-deuce">
        <li className="num">40–40</li>
        <li className="spoken">Deuce</li>
        <li className="spoken">Advantage</li>
        <li className="spoken">Game</li>
      </ol>
    </div>
  ),
  // 5. 6–6
  () => (
    <div className="op-scene op-scene--set">
      <div className="op-setgrid" aria-hidden="true">
        {["A", "B"].map((p) => (
          <div key={p} className="op-setgrid__row">
            <span className="op-setgrid__name mono">{p}</span>
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="op-setgrid__game" style={{ animationDelay: `${i * 90 + (p === "B" ? 45 : 0)}ms` }} />
            ))}
          </div>
        ))}
      </div>
      <p className="op-big num">6–6</p>
      <p className="op-voice">games in the set · shown</p>
    </div>
  ),
  // 6. tie-break
  () => (
    <div className="op-scene op-scene--tb">
      <p className="op-count num">
        {[1, 2, 3, 4, 5, 6, 7].map((n, i) => (
          <span key={n} style={{ animationDelay: `${i * 160}ms` }}>
            {n}
          </span>
        ))}
      </p>
      <p className="op-voice">tie-break · counted like everyone else</p>
    </div>
  ),
  // 7. the question
  () => (
    <div className="op-scene op-scene--q">
      <p className="op-question">
        Why do sports count the way they do<span className="op-q">?</span>
      </p>
    </div>
  ),
];

const steps = [
  <>
    <p className="kicker">An interactive history in fourteen chapters</p>
    <h1 className="op-title">The Archaeology of Sports Scores</h1>
    <p className="op-lead">
      <em>“Thirty–love.”</em> Most people know at once that this is tennis. Nobody needs to see a racket.
    </p>
    <p>
      But why <em>love</em>, and not zero?
    </p>
    <p className="op-scrollhint mono" aria-hidden="true">
      Scroll ↓
    </p>
  </>,
  <>
    <p>
      The most famous answer is French. Zero looks like an egg, the egg is <em>l’œuf</em>, and English ears supposedly
      bent <em>l’œuf</em> into <em>love</em>. <Certainty level="story" />
    </p>
    <p>
      It is a lovely theory with one problem: nobody has found French players calling zero <em>l’œuf</em>. Dictionary
      makers lean towards the English phrase “to play for love”, meaning for nothing, with no stake, which turns up in
      card games in the 1740s.
      <Cite id={["mw-love", "npr-love"]} /> Nobody really knows.
    </p>
  </>,
  <>
    <p>Keep the egg anyway. It shows what this whole essay is about.</p>
    <p>
      A score is always two things at once: a word somebody says, and a mark somebody reads. <em>Œuf</em> is a sound;
      0 is a shape. Sport has spent centuries translating between the two.
    </p>
  </>,
  <>
    <p>
      Then the counting starts. Fifteen, thirty, forty, game.
    </p>
    <p>
      One theory says points were once kept in quarters of a clock face, 15, 30, 45, and that 45 was later clipped to 40.{" "}
      <Certainty level="theory" /> A poem by Charles d’Orléans from the 1430s already plays on <em>quarante-cinq</em>,
      forty-five, as a tennis score. Sceptics point out that the numbers are older than clocks with minute hands were
      common, and nobody recorded why 45 shrank.
      <Cite id={["wiki-tennis-scoring", "time-tennis"]} />
    </p>
  </>,
  <>
    <p>
      At 40–40 the numbers give up and language takes over. <em>Deuce.</em> Then <em>advantage.</em> Then{" "}
      <em>game.</em>
    </p>
    <p>You now need two points in a row. In principle, a single game can go on forever.</p>
  </>,
  <>
    <p>Six games usually win a set, as long as you are two clear. 6–4 will do. 6–5 won’t.</p>
    <p>And then there is 6–6.</p>
  </>,
  <>
    <p>
      At 6–6, tennis drops its medieval vocabulary and counts like a child: one, two, three, four, five, six, seven.
    </p>
    <p>
      This is the tie-break. Jimmy Van Alen campaigned for it, and it reached a Grand Slam at the 1970 US Open, where a
      red flag went up over the court whenever one began.
      <Cite id={["usopen-tiebreak", "ithf-vanalen"]} /> So a single tennis set can contain two counting systems written
      five centuries apart.
    </p>
  </>,
  <>
    <p>That absurdity is the question behind this page.</p>
    <p className="op-thesis">
      A score begins as memory, becomes language, becomes display, and eventually becomes a tool for redesigning the
      sport itself.
    </p>
    <p>The story starts before anyone kept score at all.</p>
  </>,
];

export default function Prologue() {
  return (
    <section id="prologue" className="prologue" aria-labelledby="prologue-title">
      <h2 id="prologue-title" className="visually-hidden">
        Prologue: Thirty–love
      </h2>
      <Scrolly
        className="scrolly--opening"
        scenes={scenes}
        steps={steps}
        stageLabel="Animated illustration of tennis scoring: the words thirty–love, an egg, the French word œuf turning into the numeral 0, the sequence 15, 30, 40, deuce and advantage, a 6–6 set and a tie-break counted 1 to 7."
      />
    </section>
  );
}
