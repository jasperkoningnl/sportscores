"use client";

import { useState } from "react";

const TEAMS = [
  { name: "Stalemate Athletic", w: 10, d: 20, l: 8 },
  { name: "All-or-Nothing Rovers", w: 16, d: 6, l: 16 },
  { name: "Steady Town", w: 13, d: 12, l: 13 },
  { name: "Cautious City", w: 11, d: 17, l: 10 },
];

const ROW = 52;

export default function LeagueTable() {
  const [win, setWin] = useState<2 | 3>(2);
  const ranked = [...TEAMS]
    .map((t) => ({ ...t, pts: t.w * win + t.d }))
    .sort((a, b) => b.pts - a.pts || b.w - a.w);
  const rankOf = (name: string) => ranked.findIndex((t) => t.name === name);

  return (
    <div className="league">
      <div className="btn-row" role="group" aria-label="Points for a win">
        <button type="button" className="btn" aria-pressed={win === 2} onClick={() => setWin(2)}>
          2 points for a win
        </button>
        <button type="button" className="btn" aria-pressed={win === 3} onClick={() => setWin(3)}>
          3 points for a win
        </button>
      </div>
      <div className="league__table" role="table" aria-label={`League table with ${win} points for a win`}>
        <div className="league__head" role="row">
          <span role="columnheader">Pos</span>
          <span role="columnheader">Team</span>
          <span role="columnheader">W</span>
          <span role="columnheader">D</span>
          <span role="columnheader">L</span>
          <span role="columnheader">Pts</span>
        </div>
        <div className="league__body" style={{ height: TEAMS.length * ROW }} role="rowgroup">
          {TEAMS.map((t) => {
            const r = rankOf(t.name);
            const pts = t.w * win + t.d;
            return (
              <div
                key={t.name}
                role="row"
                aria-rowindex={r + 2}
                className={`league__row${r === 0 ? " is-top" : ""}`}
                style={{ transform: `translateY(${r * ROW}px)` }}
              >
                <span role="cell" className="league__pos num">
                  {r + 1}
                </span>
                <span role="cell" className="league__team">
                  {t.name}
                </span>
                <span role="cell" className="mono">
                  {t.w}
                </span>
                <span role="cell" className="mono">
                  {t.d}
                </span>
                <span role="cell" className="mono">
                  {t.l}
                </span>
                <span role="cell" className="league__pts num">
                  {pts}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <p className="live" aria-live="polite">
        With {win} points for a win, {ranked[0].name} top the table on {ranked[0].pts}. {win === 2 ? "Two draws are worth exactly one win." : "A win is now worth three draws."}
      </p>
    </div>
  );
}
