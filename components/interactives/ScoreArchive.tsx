"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

const STAGES = [
  { key: "stick", name: "Stick", role: "Memory", holds: "a running total, and nothing else" },
  { key: "card", name: "Scorecard", role: "Record", holds: "who batted, how many, how they were out" },
  { key: "book", name: "Scorebook", role: "Archive", holds: "the match, printed and collected with others" },
  { key: "db", name: "Database", role: "Statistics", holds: "every innings as a row you can query" },
] as const;

// Kent v All England, Artillery Ground, 18 June 1744.
// England 40 & 70; Kent 53 & 58 for 9. Kent won by one wicket.
const INNINGS = [
  { team: "England", inns: 1, runs: 40, note: "" },
  { team: "Kent", inns: 1, runs: 53, note: "" },
  { team: "England", inns: 2, runs: 70, note: "" },
  { team: "Kent", inns: 2, runs: 58, note: "9 wickets down" },
];

function Stick() {
  const n = 58;
  return (
    <div className="arch-stick">
      <svg viewBox="0 0 760 90" aria-hidden="true">
        <path d="M14 22 Q 6 22 6 40 Q 6 66 16 66 L 744 68 Q 754 68 754 45 Q 754 22 744 20 Z" fill="#c9a263" />
        {Array.from({ length: n }, (_, k) => {
          const i = k + 1;
          const x = 26 + k * 12.4;
          const deep = i % 20 === 0;
          const long = i % 10 === 0;
          const d = deep ? 26 : long ? 20 : 11;
          const h = deep ? 5 : long ? 4 : 3;
          return <path key={i} d={`M${x - h} 21 L${x} ${21 + d} L${x + h} 21 Z`} fill={deep ? "#3a2410" : "#5a3a1c"} />;
        })}
      </svg>
      <p className="arch-caption mono">Kent, second innings: 58 notches. Whose runs? The stick cannot say.</p>
    </div>
  );
}

function Scribble({ w }: { w: number }) {
  // An illegible ink line standing in for a name we are not reproducing.
  const pts = Array.from({ length: Math.floor(w / 9) }, (_, i) => `${i * 9} ${i % 2 ? 3 : 9}`);
  return (
    <svg className="arch-scribble" viewBox={`0 0 ${w} 12`} width={w} height="12" aria-hidden="true">
      <polyline points={pts.join(" ")} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function Card() {
  return (
    <div className="arch-card">
      <p className="arch-hand arch-hand--title">Kent v. All England · Artillery Ground · June 18th 1744</p>
      <div className="arch-card__cols">
        {["England", "Kent"].map((team) => (
          <div key={team} className="arch-card__col">
            <p className="arch-hand arch-hand--team">{team}</p>
            {[1, 2, 3, 4, 5].map((r) => (
              <div key={r} className="arch-card__row">
                <Scribble w={70 + ((r * 37) % 40)} />
                <Scribble w={46} />
              </div>
            ))}
            <p className="arch-card__more mono">… individual lines not reproduced</p>
            <p className="arch-hand arch-hand--tot">
              {team === "England" ? "1st 40 · 2nd 70" : "1st 53 · 2nd 58 (9 down)"}
            </p>
          </div>
        ))}
      </div>
      <p className="arch-hand arch-hand--result">Kent won by one wicket</p>
      <p className="arch-caption mono">Now each batter has a line, and the card records how they were out.</p>
    </div>
  );
}

function Book() {
  return (
    <div className="arch-book">
      <p className="arch-book__head">KENT against ALL ENGLAND.</p>
      <p className="arch-book__sub">Played in the Artillery Ground, June 18, 1744.</p>
      <table className="arch-book__table">
        <thead>
          <tr>
            <th scope="col">&nbsp;</th>
            <th scope="col">1st Inn.</th>
            <th scope="col">2nd Inn.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">ENGLAND</th>
            <td>40</td>
            <td>70</td>
          </tr>
          <tr>
            <th scope="row">KENT</th>
            <td>53</td>
            <td>58*</td>
          </tr>
        </tbody>
      </table>
      <p className="arch-book__foot">* Nine wickets down. Kent won by one wicket.</p>
      <p className="arch-caption mono">
        Arthur Haygarth’s <i>Scores &amp; Biographies</i> opened with this match, though it printed the year as 1746.
      </p>
    </div>
  );
}

function Db() {
  return (
    <div className="arch-db">
      <div className="arch-db__scroll">
        <table className="arch-db__table">
          <thead>
            <tr>
              <th scope="col">match_date</th>
              <th scope="col">venue</th>
              <th scope="col">team</th>
              <th scope="col">inns</th>
              <th scope="col">runs</th>
              <th scope="col">note</th>
            </tr>
          </thead>
          <tbody>
            {INNINGS.map((r) => (
              <tr key={`${r.team}${r.inns}`}>
                <td>1744-06-18</td>
                <td>Artillery Ground</td>
                <td>{r.team}</td>
                <td>{r.inns}</td>
                <td className="is-num">{r.runs}</td>
                <td>{r.note || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="arch-db__query mono">
        <span className="arch-db__prompt">&gt;</span> SELECT team, SUM(runs) FROM innings GROUP BY team;
        <br />
        <span className="arch-db__out">England 110 · Kent 111</span>
      </p>
      <p className="arch-caption mono">Two teams, 221 runs, one wicket to spare, queried nearly three centuries later.</p>
    </div>
  );
}

export default function ScoreArchive() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!playing) return;
    timer.current = window.setTimeout(() => {
      if (stage < STAGES.length - 1) setStage((s) => s + 1);
      else setPlaying(false);
    }, reduced ? 2600 : 2200);
    return () => window.clearTimeout(timer.current);
  }, [playing, stage, reduced]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setStage((s) => Math.min(STAGES.length - 1, s + 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setStage((s) => Math.max(0, s - 1));
    }
  };

  return (
    <div className="arch">
      <div className="arch__tabs" role="tablist" aria-label="Media for one cricket match" onKeyDown={onKey}>
        {STAGES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            role="tab"
            id={`arch-tab-${s.key}`}
            aria-controls="arch-panel"
            aria-selected={i === stage}
            tabIndex={i === stage ? 0 : -1}
            className={`arch__tab${i === stage ? " is-on" : ""}${i < stage ? " is-past" : ""}`}
            onClick={() => {
              setPlaying(false);
              setStage(i);
            }}
          >
            <span className="arch__tab-role mono">{s.role}</span>
            <span className="arch__tab-name">{s.name}</span>
          </button>
        ))}
      </div>

      <div id="arch-panel" role="tabpanel" aria-labelledby={`arch-tab-${STAGES[stage].key}`} className="arch__panel">
        <div key={stage} className="arch__view">
          {stage === 0 && <Stick />}
          {stage === 1 && <Card />}
          {stage === 2 && <Book />}
          {stage === 3 && <Db />}
        </div>
      </div>

      <div className="arch__foot">
        <p className="mono arch__holds">
          <span>{STAGES[stage].name} holds:</span> {STAGES[stage].holds}.
        </p>
        <button
          type="button"
          className="btn btn--small"
          onClick={() => {
            if (!playing && stage === STAGES.length - 1) setStage(0);
            setPlaying((p) => !p);
          }}
        >
          {playing ? "Pause" : "Play the sequence"}
        </button>
      </div>
    </div>
  );
}
