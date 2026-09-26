"use client";

import { useMemo, useState } from "react";

/* ================= Tennis: play a set ================= */

const WORD = ["love", "fifteen", "thirty", "forty"];
const NUM = ["0", "15", "30", "40"];

type TennisState = { p: [number, number]; g: [number, number]; tb: boolean; done: null | 0 | 1 };

function callFor(s: TennisState): { board: [string, string]; call: string } {
  const [a, b] = s.p;
  if (s.tb) return { board: [String(a), String(b)], call: `${a}–${b}, tie-break` };
  if (a >= 3 && b >= 3) {
    if (a === b) return { board: ["40", "40"], call: "Deuce" };
    const lead = a > b ? 0 : 1;
    return {
      board: lead === 0 ? ["AD", "40"] : ["40", "AD"],
      call: `Advantage ${lead === 0 ? "A" : "B"}`,
    };
  }
  if (a === b) return { board: [NUM[a], NUM[b]], call: a === 0 ? "Love-all" : `${cap(WORD[a])}-all` };
  return { board: [NUM[a], NUM[b]], call: `${cap(WORD[a])}–${WORD[b]}` };
}

function cap(s: string) {
  return s[0].toUpperCase() + s.slice(1);
}

function pointTo(s: TennisState, w: 0 | 1): { next: TennisState; event?: string } {
  if (s.done !== null) return { next: s };
  const p: [number, number] = [...s.p];
  const g: [number, number] = [...s.g];
  p[w] += 1;
  const o = w === 0 ? 1 : 0;
  const name = w === 0 ? "A" : "B";
  if (s.tb) {
    if (p[w] >= 7 && p[w] - p[o] >= 2) {
      g[w] += 1;
      return { next: { p: [0, 0], g, tb: false, done: w }, event: `Tie-break and set to ${name}, 7–6.` };
    }
    return { next: { ...s, p } };
  }
  if (p[w] >= 4 && p[w] - p[o] >= 2) {
    g[w] += 1;
    if ((g[w] >= 6 && g[w] - g[o] >= 2) || g[w] === 7) {
      return { next: { p: [0, 0], g, tb: false, done: w }, event: `Game and set to ${name}, ${g[w]}–${g[o]}.` };
    }
    if (g[0] === 6 && g[1] === 6) {
      return { next: { p: [0, 0], g, tb: true, done: null }, event: "Six games all. Tie-break: now we count 1, 2, 3…" };
    }
    return { next: { p: [0, 0], g, tb: false, done: null }, event: `Game ${name}. Games: ${g[0]}–${g[1]}.` };
  }
  return { next: { ...s, p } };
}

export function TennisSpecimen() {
  const [s, setS] = useState<TennisState>({ p: [2, 1], g: [3, 2], tb: false, done: null });
  const [event, setEvent] = useState("A leads 3–2 in games; the current game is thirty–fifteen.");
  const { board, call } = callFor(s);

  const play = (w: 0 | 1) => {
    const { next, event: ev } = pointTo(s, w);
    setS(next);
    setEvent(ev ?? callFor(next).call + ".");
  };

  return (
    <div className="spec-tennis">
      <div className="tboard" aria-hidden="true">
        <div className="tboard__head mono">
          <span>Player</span>
          <span>Games</span>
          <span>{s.tb ? "Tie-break" : "Points"}</span>
        </div>
        {(["A", "B"] as const).map((n, i) => (
          <div key={n} className={`tboard__row${s.done === i ? " is-winner" : ""}`}>
            <span className="tboard__name">{n}</span>
            <span className="tboard__games num">{s.g[i]}</span>
            <span className={`tboard__pts num${s.tb ? " is-tb" : ""}`}>{s.done !== null ? "–" : board[i]}</span>
          </div>
        ))}
      </div>
      <p className="spec-call spoken" aria-hidden="true">
        {s.done !== null ? `Set, ${s.done === 0 ? "A" : "B"}.` : call}
      </p>
      <div className="btn-row">
        <button type="button" className="btn btn--solid" onClick={() => play(0)} disabled={s.done !== null}>
          Point to A
        </button>
        <button type="button" className="btn btn--solid" onClick={() => play(1)} disabled={s.done !== null}>
          Point to B
        </button>
        <button
          type="button"
          className="btn btn--red"
          onClick={() => {
            setS({ p: [0, 0], g: [6, 6], tb: true, done: null });
            setEvent("Six games all. Tie-break: the old words vanish.");
          }}
        >
          Jump to 6–6
        </button>
        <button
          type="button"
          className="btn btn--small"
          onClick={() => {
            setS({ p: [0, 0], g: [0, 0], tb: false, done: null });
            setEvent("New set. Love-all.");
          }}
        >
          New set
        </button>
      </div>
      <p className="live" aria-live="polite">
        {event}
      </p>
    </div>
  );
}

/* ================= Cricket: 247/6 after 42.3 overs ================= */

export function CricketSpecimen() {
  const [runs, setRuns] = useState(247);
  const [wkts, setWkts] = useState(6);
  const [balls, setBalls] = useState(42 * 6 + 3);
  const [aus, setAus] = useState(false);
  const overs = `${Math.floor(balls / 6)}.${balls % 6}`;
  const allOut = wkts >= 10;
  const ball = (r: number, w = false) => {
    if (allOut) return;
    setRuns((x) => x + r);
    if (w) setWkts((x) => x + 1);
    setBalls((b) => b + 1);
  };
  const scoreText = aus ? `${wkts}/${runs}` : `${runs}/${wkts}`;
  return (
    <div className="spec-cricket">
      <div className="cboard" aria-hidden="true">
        <span className="cboard__score num">{allOut ? `${runs} all out` : scoreText}</span>
        <span className="cboard__overs">
          <span className="num">{overs}</span>
          <span className="mono">overs</span>
        </span>
      </div>
      <p className="spec-read mono">
        {Math.floor(balls / 6)} complete overs and {balls % 6} {balls % 6 === 1 ? "ball" : "balls"}, so the digit after the
        point only ever runs 0 to 5. {aus ? "Australians write wickets first." : "Runs first, then wickets."}
      </p>
      <div className="btn-row">
        <button type="button" className="btn" onClick={() => ball(0)} disabled={allOut}>
          Dot ball
        </button>
        <button type="button" className="btn" onClick={() => ball(1)} disabled={allOut}>
          Single
        </button>
        <button type="button" className="btn" onClick={() => ball(4)} disabled={allOut}>
          Four
        </button>
        <button type="button" className="btn" onClick={() => ball(6)} disabled={allOut}>
          Six
        </button>
        <button type="button" className="btn btn--red" onClick={() => ball(0, true)} disabled={allOut}>
          Wicket
        </button>
        <button type="button" className="btn btn--small" aria-pressed={aus} onClick={() => setAus((a) => !a)}>
          Australian order
        </button>
      </div>
      <p className="live" aria-live="polite">
        {allOut ? `All out for ${runs}.` : `${scoreText} after ${overs} overs.`}
      </p>
    </div>
  );
}

/* ================= Golf: relative to par ================= */

function toPar(n: number) {
  if (n === 0) return "E";
  return n < 0 ? `−${Math.abs(n)}` : `+${n}`;
}

const GOLFERS = [
  { name: "Player A", score: -4 },
  { name: "Player B", score: -1 },
  { name: "Player C", score: 2 },
];

export function GolfSpecimen() {
  const [you, setYou] = useState(0);
  const [holes, setHoles] = useState(0);
  const rows = useMemo(
    () => [...GOLFERS, { name: "You", score: you }].sort((a, b) => a.score - b.score),
    [you]
  );
  const play = (d: number) => {
    setYou((y) => y + d);
    setHoles((h) => h + 1);
  };
  return (
    <div className="spec-golf">
      <ol className="gboard">
        {rows.map((r, i) => (
          <li key={r.name} className={r.name === "You" ? "is-you" : undefined}>
            <span className="gboard__pos mono">{i + 1}</span>
            <span className="gboard__name">{r.name}</span>
            <span className={`gboard__score num${r.score < 0 ? " is-under" : ""}`}>{toPar(r.score)}</span>
          </li>
        ))}
      </ol>
      <div className="btn-row">
        <button type="button" className="btn" onClick={() => play(-1)}>
          Birdie (−1)
        </button>
        <button type="button" className="btn" onClick={() => play(0)}>
          Par
        </button>
        <button type="button" className="btn" onClick={() => play(1)}>
          Bogey (+1)
        </button>
        <button type="button" className="btn" onClick={() => play(2)}>
          Double (+2)
        </button>
        <button
          type="button"
          className="btn btn--small"
          onClick={() => {
            setYou(0);
            setHoles(0);
          }}
        >
          Reset
        </button>
      </div>
      <p className="live" aria-live="polite">
        {holes === 0
          ? "You have not teed off. Even par is written E."
          : `After ${holes} ${holes === 1 ? "hole" : "holes"} you are ${toPar(you)}, in position ${rows.findIndex((r) => r.name === "You") + 1}.`}
      </p>
    </div>
  );
}

/* ================= Darts: count down from 501 ================= */

const VISITS = [180, 140, 100, 60, 41];

export function DartsSpecimen() {
  const [left, setLeft] = useState(501);
  const [msg, setMsg] = useState("501 to go. The last dart must land in a double.");
  const canCheckout = left === 50 || (left <= 40 && left % 2 === 0 && left > 0);
  const visit = (v: number) => {
    const after = left - v;
    if (after < 2) {
      setMsg(`Bust: ${v} would leave ${after < 0 ? "less than nothing" : after}. The score stays at ${left}.`);
      return;
    }
    setLeft(after);
    setMsg(`${v} scored. ${after} left.`);
  };
  return (
    <div className="spec-darts">
      <div className="dboard" aria-hidden="true">
        <span className="dboard__label mono">Remaining</span>
        <span className="dboard__left num">{left}</span>
      </div>
      <div className="btn-row">
        {VISITS.map((v) => (
          <button key={v} type="button" className="btn" onClick={() => visit(v)} disabled={left === 0}>
            Score {v}
          </button>
        ))}
        {canCheckout && (
          <button
            type="button"
            className="btn btn--red"
            onClick={() => {
              setMsg(`Checkout on ${left === 50 ? "the bull" : `double ${left / 2}`}. Leg won.`);
              setLeft(0);
            }}
          >
            Check out: {left === 50 ? "Bull" : `D${left / 2}`}
          </button>
        )}
        <button
          type="button"
          className="btn btn--small"
          onClick={() => {
            setLeft(501);
            setMsg("501 to go. The last dart must land in a double.");
          }}
        >
          New leg
        </button>
      </div>
      <p className="live" aria-live="polite">
        {msg}
      </p>
    </div>
  );
}

/* ================= Tenpin bowling: scores that wait for the future ================= */

const ROLLS = [10, 7, 3, 9, 0, 10, 0, 8, 8, 2, 0, 6, 10, 10, 10, 8, 1];

type Frame = { marks: string[]; total: number | null };

function bowlingFrames(rolls: number[]): Frame[] {
  const frames: Frame[] = [];
  let i = 0;
  let running = 0;
  for (let f = 0; f < 10; f++) {
    const marks: string[] = [];
    if (i >= rolls.length) {
      frames.push({ marks, total: null });
      continue;
    }
    let score: number | null = null;
    if (f < 9) {
      if (rolls[i] === 10) {
        marks.push("X");
        const b1 = rolls[i + 1];
        const b2 = rolls[i + 2];
        score = b1 !== undefined && b2 !== undefined ? 10 + b1 + b2 : null;
        i += 1;
      } else {
        const r1 = rolls[i];
        const r2 = rolls[i + 1];
        marks.push(r1 === 0 ? "–" : String(r1));
        if (r2 !== undefined) {
          if (r1 + r2 === 10) {
            marks.push("/");
            const b = rolls[i + 2];
            score = b !== undefined ? 10 + b : null;
          } else {
            marks.push(r2 === 0 ? "–" : String(r2));
            score = r1 + r2;
          }
        }
        i += 2;
      }
    } else {
      // tenth frame: up to three balls
      const t = rolls.slice(i, i + 3);
      const num = (r: number) => (r === 10 ? "X" : r === 0 ? "–" : String(r));
      if (t.length > 0) marks.push(num(t[0]));
      if (t.length > 1) marks.push(t[0] !== 10 && t[0] + t[1] === 10 ? "/" : num(t[1]));
      if (t.length > 2) marks.push(t[0] === 10 && t[1] !== 10 && t[1] + t[2] === 10 ? "/" : num(t[2]));
      const needThree = t.length >= 2 && (t[0] === 10 || t[0] + t[1] === 10);
      const complete = needThree ? t.length === 3 : t.length === 2;
      score = complete ? t.reduce((a, b) => a + b, 0) : null;
      i += 3;
    }
    if (score !== null && (f === 0 || frames[f - 1].total !== null)) {
      running += score;
      frames.push({ marks, total: running });
    } else {
      frames.push({ marks, total: null });
    }
  }
  return frames;
}

export function BowlingSpecimen() {
  const [n, setN] = useState(4);
  const frames = bowlingFrames(ROLLS.slice(0, n));
  const pending = frames.filter((f) => f.marks.length && f.total === null).length;
  return (
    <div className="spec-bowling">
      <div className="bsheet-wrap">
        <ol className="bsheet" aria-label="Bowling score sheet">
          {frames.map((f, i) => (
            <li key={i} className={`bsheet__frame${i === 9 ? " is-tenth" : ""}`}>
              <span className="bsheet__no mono">{i + 1}</span>
              <span className="bsheet__marks mono">
                {Array.from({ length: i === 9 ? 3 : 2 }, (_, k) => {
                  const m = i < 9 && f.marks[0] === "X" ? (k === 1 ? "X" : "") : f.marks[k] ?? "";
                  return (
                    <span key={k} className={m === "X" || m === "/" ? "is-mark" : undefined}>
                      {m}
                    </span>
                  );
                })}
              </span>
              <span className={`bsheet__total num${f.marks.length && f.total === null ? " is-pending" : ""}`}>
                {f.total ?? (f.marks.length ? "?" : "")}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn--solid" onClick={() => setN((x) => Math.min(ROLLS.length, x + 1))} disabled={n >= ROLLS.length}>
          Next ball
        </button>
        <button type="button" className="btn btn--small" onClick={() => setN(0)}>
          New game
        </button>
      </div>
      <p className="live" aria-live="polite">
        {n === 0
          ? "No balls rolled yet."
          : pending
            ? `${pending} ${pending === 1 ? "frame is" : "frames are"} still waiting for future balls before they can be scored.`
            : n >= ROLLS.length
              ? `Game over: ${frames[9].total}.`
              : "Every frame so far is settled."}
      </p>
    </div>
  );
}

/* ================= Rugby union ================= */

const RUGBY = [
  { key: "try", label: "Try", pts: 5 },
  { key: "con", label: "Conversion", pts: 2 },
  { key: "pen", label: "Penalty goal", pts: 3 },
  { key: "drop", label: "Drop goal", pts: 3 },
] as const;

export function RugbySpecimen() {
  const [log, setLog] = useState<string[]>(["try", "con", "pen"]);
  const total = log.reduce((s, k) => s + (RUGBY.find((r) => r.key === k)?.pts ?? 0), 0);
  const tries = log.filter((k) => k === "try").length;
  const cons = log.filter((k) => k === "con").length;
  const canConvert = tries > cons;
  return (
    <div className="spec-rugby">
      <div className="rboard" aria-hidden="true">
        <span className="rboard__total num">{total}</span>
        <span className="rboard__tokens">
          {log.map((k, i) => {
            const r = RUGBY.find((x) => x.key === k)!;
            return (
              <span key={i} className={`rtoken rtoken--${k}`} title={r.label}>
                {r.pts}
              </span>
            );
          })}
        </span>
      </div>
      <div className="btn-row">
        {RUGBY.map((r) => (
          <button
            key={r.key}
            type="button"
            className="btn"
            onClick={() => setLog((l) => [...l, r.key])}
            disabled={r.key === "con" && !canConvert}
          >
            {r.label} +{r.pts}
          </button>
        ))}
        <button type="button" className="btn btn--small" onClick={() => setLog([])}>
          Reset
        </button>
      </div>
      <p className="live" aria-live="polite">
        {total} points: {tries} {tries === 1 ? "try" : "tries"}, {cons} {cons === 1 ? "conversion" : "conversions"}.
        {canConvert ? " A conversion kick is available." : ""}
      </p>
    </div>
  );
}

/* ================= Australian rules ================= */

export function AflSpecimen() {
  const [g, setG] = useState(10);
  const [b, setB] = useState(6);
  return (
    <div className="spec-afl">
      <div className="aboard" aria-hidden="true">
        <span className="num aboard__g">{g}</span>
        <span className="aboard__dot">.</span>
        <span className="num aboard__b">{b}</span>
        <span className="num aboard__t">({g * 6 + b})</span>
      </div>
      <p className="spec-read mono">
        {g} goals × 6 + {b} behinds × 1 = {g * 6 + b}. The dot is a separator, not a decimal point.
      </p>
      <div className="btn-row">
        <button type="button" className="btn" onClick={() => setG((x) => x + 1)}>
          Goal +6
        </button>
        <button type="button" className="btn" onClick={() => setB((x) => x + 1)}>
          Behind +1
        </button>
        <button
          type="button"
          className="btn btn--small"
          onClick={() => {
            setG(0);
            setB(0);
          }}
        >
          Reset
        </button>
      </div>
      <p className="live" aria-live="polite">
        {g}.{b} ({g * 6 + b})
      </p>
    </div>
  );
}

/* ================= Gaelic football ================= */

export function GaelicSpecimen() {
  const [goals, setGoals] = useState(2);
  const [pts, setPts] = useState(11);
  const [flag, setFlag] = useState<"green" | "white" | "orange" | null>(null);
  const total = goals * 3 + pts;
  return (
    <div className="spec-gaelic">
      <div className="gaboard" aria-hidden="true">
        <span className="num">{goals}</span>
        <span className="gaboard__dash">–</span>
        <span className="num">{pts < 10 ? `0${pts}` : pts}</span>
        <span className="gaboard__tot mono">= {total} points</span>
        {flag && <span key={`${flag}${total}`} className={`gaflag gaflag--${flag}`} />}
      </div>
      <p className="spec-read mono">
        Goals (3 points each) on the left, points on the right. Since 2025 a score from beyond the arc adds two to the right-hand column.
      </p>
      <div className="btn-row">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setGoals((x) => x + 1);
            setFlag("green");
          }}
        >
          Goal · green flag
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setPts((x) => x + 1);
            setFlag("white");
          }}
        >
          Point · white flag
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setPts((x) => x + 2);
            setFlag("orange");
          }}
        >
          Two-pointer · orange flag
        </button>
        <button
          type="button"
          className="btn btn--small"
          onClick={() => {
            setGoals(0);
            setPts(0);
            setFlag(null);
          }}
        >
          Reset
        </button>
      </div>
      <p className="live" aria-live="polite">
        {goals}–{pts}, which is {total} points.
      </p>
    </div>
  );
}

/* ================= Baseball: simple score, rich display ================= */

const LINE = {
  away: [0, 0, 1, 0, 0, 2, 0, 0],
  home: [1, 0, 0, 0, 3, 0, 0],
};

export function BaseballSpecimen() {
  const [full, setFull] = useState(false);
  const awayR = LINE.away.reduce((a, b) => a + b, 0);
  const homeR = LINE.home.reduce((a, b) => a + b, 0);
  return (
    <div className="spec-baseball">
      <div className={`bbview${full ? " is-full" : ""}`}>
        {!full ? (
          <div className="bbsimple" aria-label={`Visitors ${awayR}, Home ${homeR}`}>
            <span className="mono">Visitors</span>
            <span className="num">{awayR}</span>
            <span className="num">{homeR}</span>
            <span className="mono">Home</span>
          </div>
        ) : (
          <div className="bbfull">
            <div className="bbfull__scroll">
              <table className="bbline">
                <caption className="visually-hidden">Line score, bottom of the eighth inning</caption>
                <thead>
                  <tr>
                    <th scope="col" />
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                      <th key={i} scope="col">
                        {i}
                      </th>
                    ))}
                    <th scope="col" className="is-sum">R</th>
                    <th scope="col" className="is-sum">H</th>
                    <th scope="col" className="is-sum">E</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Visitors</th>
                    {Array.from({ length: 9 }, (_, i) => (
                      <td key={i}>{LINE.away[i] ?? ""}</td>
                    ))}
                    <td className="is-sum">{awayR}</td>
                    <td className="is-sum">7</td>
                    <td className="is-sum">1</td>
                  </tr>
                  <tr>
                    <th scope="row">Home</th>
                    {Array.from({ length: 9 }, (_, i) => (
                      <td key={i}>{LINE.home[i] ?? ""}</td>
                    ))}
                    <td className="is-sum">{homeR}</td>
                    <td className="is-sum">6</td>
                    <td className="is-sum">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bbstate">
              <div className="bbstate__item">
                <span className="mono">Inning</span>
                <span className="num">▼8</span>
              </div>
              <div className="bbstate__item">
                <span className="mono">Balls · Strikes</span>
                <span className="num">2 – 1</span>
              </div>
              <div className="bbstate__item">
                <span className="mono">Outs</span>
                <span className="bbouts" aria-label="1 out">
                  <i className="is-on" />
                  <i />
                  <i />
                </span>
              </div>
              <div className="bbstate__item">
                <span className="mono">Bases</span>
                <svg viewBox="0 0 60 44" className="bbbases" role="img" aria-label="Runners on first and third">
                  <rect x="24" y="4" width="12" height="12" transform="rotate(45 30 10)" fill="none" stroke="currentColor" strokeWidth="2" />
                  <rect x="40" y="18" width="12" height="12" transform="rotate(45 46 24)" fill="var(--amber)" stroke="currentColor" strokeWidth="2" />
                  <rect x="8" y="18" width="12" height="12" transform="rotate(45 14 24)" fill="var(--amber)" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="btn-row">
        <button type="button" className="btn" aria-pressed={!full} onClick={() => setFull(false)}>
          Just the score
        </button>
        <button type="button" className="btn" aria-pressed={full} onClick={() => setFull(true)}>
          Everything a fan reads
        </button>
      </div>
      <p className="spec-read mono">
        {full
          ? "Runs by inning, runs–hits–errors, the count, the outs and which bases are occupied."
          : "One run is one run. That is the entire scoring system."}
      </p>
    </div>
  );
}
