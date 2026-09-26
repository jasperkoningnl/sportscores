"use client";

import { useState } from "react";

function Panels({ value, slots }: { value: number; slots: number }) {
  const s = String(value).padStart(slots, " ");
  return (
    <span className="qpanels">
      {s.split("").map((d, i) => (
        <span key={i} className={`qpanel num${d === " " ? " is-blank" : ""}`}>
          {d === " " ? "" : d}
        </span>
      ))}
    </span>
  );
}

export default function Quadball() {
  const [proposed, setProposed] = useState(false);
  const [goals, setGoals] = useState<[number, number]>([17, 9]);
  const [flag, setFlag] = useState<null | 0 | 1>(null);
  const g = proposed ? 1 : 10;
  const f = proposed ? 3 : 30;
  const score = (i: 0 | 1) => goals[i] * g + (flag === i ? f : 0);
  const slots = proposed ? 2 : 3;
  const over = flag !== null;

  return (
    <div className="quad">
      <div className="btn-row" role="group" aria-label="Scoring system">
        <button type="button" className="btn" aria-pressed={!proposed} onClick={() => setProposed(false)}>
          Current: goal 10, flag 30
        </button>
        <button type="button" className="btn" aria-pressed={proposed} onClick={() => setProposed(true)}>
          Proposed: goal 1, flag 3
        </button>
      </div>

      <div className={`qboard${proposed ? " is-proposed" : ""}`} aria-hidden="true">
        {(["Team A", "Team B"] as const).map((t, i) => (
          <div key={t} className="qboard__side">
            <span className="mono">
              {t}
              {flag === i ? " · caught the flag" : ""}
            </span>
            <Panels value={score(i as 0 | 1)} slots={slots} />
          </div>
        ))}
      </div>

      <div className="btn-row">
        <button type="button" className="btn" onClick={() => setGoals(([a, b]) => [a + 1, b])} disabled={over}>
          A scores a goal +{g}
        </button>
        <button type="button" className="btn" onClick={() => setGoals(([a, b]) => [a, b + 1])} disabled={over}>
          B scores a goal +{g}
        </button>
        <button type="button" className="btn btn--red" onClick={() => setFlag(1)} disabled={over}>
          B catches the flag +{f}
        </button>
        <button
          type="button"
          className="btn btn--small"
          onClick={() => {
            setGoals([17, 9]);
            setFlag(null);
          }}
        >
          Reset
        </button>
      </div>
      <p className="live" aria-live="polite">
        {`Team A ${score(0)}, Team B ${score(1)}${over ? ". The flag catch ends the game." : "."} ${
          proposed
            ? "The same game, with the zero removed: two digits are enough."
            : "Every score ends in 0, and the board needs three digits."
        }`}
      </p>
    </div>
  );
}
