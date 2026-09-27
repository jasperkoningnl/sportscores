"use client";

import { useEffect, useState } from "react";

/* ================= Flip digits ================= */

function FlipDigit({ value }: { value: string }) {
  const [cur, setCur] = useState(value);
  const [prev, setPrev] = useState(value);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (value !== cur) {
      setPrev(cur);
      setCur(value);
      setN((k) => k + 1);
    }
  }, [value, cur]);

  return (
    <span className="flip" aria-hidden="true">
      <span className="flip__half flip__half--top">
        <span>{cur}</span>
      </span>
      <span className="flip__half flip__half--bottom">
        <span>{n > 0 ? prev : cur}</span>
      </span>
      {n > 0 && (
        <>
          <span key={`t${n}`} className="flip__flap flip__flap--top">
            <span>{prev}</span>
          </span>
          <span key={`b${n}`} className="flip__flap flip__flap--bottom">
            <span>{cur}</span>
          </span>
        </>
      )}
    </span>
  );
}

function FlipNumber({ value, digits = 2 }: { value: number; digits?: number }) {
  const s = String(value).padStart(digits, " ");
  return (
    <span className="flipnum">
      {s.split("").map((d, i) => (
        <FlipDigit key={i} value={d === " " ? "" : d} />
      ))}
    </span>
  );
}

export function FlipBoard() {
  const [home, setHome] = useState(23);
  const [guest, setGuest] = useState(21);
  const [set, setSet] = useState(3);
  const clamp = (v: number) => Math.max(0, Math.min(99, v));
  return (
    <div className="flipboard">
      <div className="flipboard__panel">
        <div className="flipboard__team">
          <span className="flipboard__label mono">Home</span>
          <FlipNumber value={home} />
        </div>
        <div className="flipboard__set">
          <span className="flipboard__label mono">Set</span>
          <FlipNumber value={set} digits={1} />
        </div>
        <div className="flipboard__team">
          <span className="flipboard__label mono">Guest</span>
          <FlipNumber value={guest} />
        </div>
      </div>
      <div className="flipboard__controls">
        <div className="btn-row">
          <button type="button" className="btn btn--solid" onClick={() => setHome((v) => clamp(v + 1))}>
            Home +1
          </button>
          <button type="button" className="btn" onClick={() => setHome((v) => clamp(v - 1))}>
            Home −1
          </button>
        </div>
        <div className="btn-row">
          <button type="button" className="btn" onClick={() => setSet((v) => (v % 5) + 1)}>
            Next set
          </button>
        </div>
        <div className="btn-row">
          <button type="button" className="btn btn--solid" onClick={() => setGuest((v) => clamp(v + 1))}>
            Guest +1
          </button>
          <button type="button" className="btn" onClick={() => setGuest((v) => clamp(v - 1))}>
            Guest −1
          </button>
        </div>
      </div>
      <p className="live visually-hidden" aria-live="polite">
        Home {home}, Guest {guest}, set {set}.
      </p>
    </div>
  );
}

/* ================= Wrigley-style line score ================= */

type Row = { name: string; short: string; runs: (number | null)[]; h: number; e: number };

const START: Row[] = [
  { name: "Visitors", short: "Vis", runs: [0, 0, 2, 0, 1, null, null, null, null], h: 6, e: 1 },
  { name: "Cubs", short: "Cubs", runs: [1, 0, 0, 3, null, null, null, null, null], h: 7, e: 0 },
];

export function LineScore() {
  const [rows, setRows] = useState<Row[]>(START);
  const [remove, setRemove] = useState(false);
  const [last, setLast] = useState<string | null>(null);
  const [msg, setMsg] = useState("Cubs lead 4–3 in the fifth.");

  const bump = (r: number, key: number | "h" | "e") => {
    setRows((old) =>
      old.map((row, i) => {
        if (i !== r) return row;
        if (key === "h" || key === "e") {
          const v = Math.max(0, Math.min(99, row[key] + (remove ? -1 : 1)));
          return { ...row, [key]: v };
        }
        const runs = [...row.runs];
        const curr = runs[key];
        if (remove) runs[key] = curr === null ? null : curr === 0 ? null : curr - 1;
        else runs[key] = curr === null ? 0 : Math.min(9, curr + 1);
        return { ...row, runs };
      })
    );
    setLast(`${r}-${key}`);
  };

  useEffect(() => {
    const t = rows.map((r) => r.runs.reduce<number>((a, b) => a + (b ?? 0), 0));
    const lead = t[0] === t[1] ? `Tied at ${t[0]}` : t[1] > t[0] ? `Cubs lead ${t[1]}–${t[0]}` : `Visitors lead ${t[0]}–${t[1]}`;
    setMsg(`${lead}.`);
  }, [rows]);

  return (
    <div className="wrigley">
      <div className="wrigley__scroll">
        <table className="wrigley__board">
          <caption className="visually-hidden">Hand-operated line score. Each cell is a button that hangs a plate.</caption>
          <thead>
            <tr>
              <th scope="col" className="wrigley__team" />
              {Array.from({ length: 9 }, (_, i) => (
                <th key={i} scope="col">
                  {i + 1}
                </th>
              ))}
              <th scope="col" className="is-sep">R</th>
              <th scope="col">H</th>
              <th scope="col">E</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => {
              const total = row.runs.reduce<number>((a, b) => a + (b ?? 0), 0);
              return (
                <tr key={row.name}>
                  <th scope="row" className="wrigley__team">
                    {/* Narrow screens show the short name so all nine innings and R H E fit. */}
                    <span className="wrigley__long">{row.name}</span>
                    <span className="wrigley__short" aria-hidden="true">
                      {row.short}
                    </span>
                  </th>
                  {row.runs.map((v, k) => (
                    <td key={k}>
                      <button
                        type="button"
                        className="plate-slot"
                        onClick={() => bump(r, k)}
                        aria-label={`${row.name}, inning ${k + 1}: ${v === null ? "no plate" : `${v} ${v === 1 ? "run" : "runs"}`}. ${remove ? "Take a plate down" : "Hang a plate"}.`}
                      >
                        {v !== null && (
                          <span key={`${v}`} className={`plate num${last === `${r}-${k}` ? " is-new" : ""}`}>
                            {v}
                          </span>
                        )}
                      </button>
                    </td>
                  ))}
                  <td className="is-sep">
                    <span key={total} className="plate plate--total num is-new">
                      {total}
                    </span>
                  </td>
                  {(["h", "e"] as const).map((k) => (
                    <td key={k}>
                      <button
                        type="button"
                        className="plate-slot"
                        onClick={() => bump(r, k)}
                        aria-label={`${row.name} ${k === "h" ? "hits" : "errors"}: ${row[k]}. ${remove ? "Decrease" : "Increase"}.`}
                      >
                        <span key={row[k]} className={`plate num${last === `${r}-${k}` ? " is-new" : ""}`}>
                          {row[k]}
                        </span>
                      </button>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="wrigley__controls">
        <div className="btn-row">
          <button type="button" className="btn" aria-pressed={!remove} onClick={() => setRemove(false)}>
            Hang plates
          </button>
          <button type="button" className="btn" aria-pressed={remove} onClick={() => setRemove(true)}>
            Take plates down
          </button>
          <button
            type="button"
            className="btn btn--small"
            onClick={() => {
              setRows(START);
              setLast(null);
            }}
          >
            Reset
          </button>
        </div>
        <p className="live" aria-live="polite">
          {msg}
        </p>
      </div>
    </div>
  );
}

/* ================= Half-time board and the programme key ================= */

const BOARD = [
  { l: "A", s: "1–0", fixture: "Athletic v Wanderers" },
  { l: "B", s: "2–1", fixture: "County v Albion" },
  { l: "C", s: "0–0", fixture: "City v Rangers" },
  { l: "D", s: "0–2", fixture: "Town v Rovers" },
  { l: "E", s: "3–3", fixture: "United v Harriers" },
  { l: "F", s: "1–1", fixture: "Borough v Swifts" },
];

export function HalfTimeBoard() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [guess, setGuess] = useState<string | null>(null);
  const focus = hover ?? (open ? "D" : guess);

  return (
    <div className="halftime">
      <div className="halftime__board" aria-label="Half-time scoreboard with lettered matches">
        <p className="halftime__title mono">Half-time scores</p>
        <ul className="halftime__rows">
          {BOARD.map((b) => (
            <li key={b.l} className={focus === b.l ? "is-lit" : undefined}>
              <button
                type="button"
                className="halftime__letter num"
                onClick={() => setGuess(b.l)}
                aria-pressed={guess === b.l}
                aria-label={`Letter ${b.l}, score ${b.s}. Guess this is the Rovers match.`}
              >
                {b.l}
              </button>
              <span className="halftime__score num">{b.s}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`programme${open ? " is-open" : ""}`}>
        <div className="programme__cover">
          <p className="programme__club">Official Match Programme</p>
          <p className="programme__price mono">Today’s other fixtures, lettered for the half-time board</p>
          <button type="button" className="btn btn--solid" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? "Close the programme" : "Open the programme"}
          </button>
        </div>
        <ol className="programme__key" hidden={!open}>
          {BOARD.map((b) => (
            <li
              key={b.l}
              onMouseEnter={() => setHover(b.l)}
              onMouseLeave={() => setHover(null)}
              className={b.l === "D" ? "is-yours" : undefined}
            >
              <span className="programme__letter num">{b.l}</span>
              <span>{b.fixture}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="live halftime__msg" aria-live="polite">
        {open
          ? "D is Town v Rovers. The board reads 0–2, home team first: your Rovers lead 2–0 away."
          : guess
            ? `You picked ${guess}. Without the programme there is no way to know. Open it.`
            : "Your team, Rovers, are away at Town. Which letter is their match?"}
      </p>
    </div>
  );
}

/* ================= Curling: points in the middle ================= */

const COLS = 12;
type End = { team: "red" | "yellow"; pts: number };

export function CurlingBoard() {
  const [ends, setEnds] = useState<End[]>([
    { team: "red", pts: 2 },
    { team: "yellow", pts: 1 },
    { team: "red", pts: 1 },
  ]);
  const [team, setTeam] = useState<"red" | "yellow">("yellow");
  const [pts, setPts] = useState(3);

  const placed: { red: Record<number, number>; yellow: Record<number, number> } = { red: {}, yellow: {} };
  const totals = { red: 0, yellow: 0 };
  ends.forEach((e, i) => {
    totals[e.team] += e.pts;
    placed[e.team][totals[e.team]] = i + 1;
  });

  const nextEnd = ends.length + 1;
  const room = COLS - totals[team];
  const lastEnd = ends[ends.length - 1];
  const lastTotal = lastEnd ? ends.filter((e) => e.team === lastEnd.team).reduce((a, e) => a + e.pts, 0) : 0;

  const hang = () => {
    if (pts > room || nextEnd > 10) return;
    setEnds((e) => [...e, { team, pts }]);
  };

  const teamName = (t: "red" | "yellow") => (t === "red" ? "Red" : "Yellow");

  return (
    <div className="curling">
      <div className="curling__scroll">
        <div className="curling__board" role="img" aria-label={`Curling scoreboard after ${ends.length} ends. Red ${totals.red}, Yellow ${totals.yellow}.`}>
          {(["red", "yellow"] as const).map((t, row) => (
            <div key={t} className={`curling__row curling__row--${t}`} style={{ order: row === 0 ? 0 : 2 }}>
              <span className="curling__rowname mono">{teamName(t)}</span>
              {Array.from({ length: COLS }, (_, c) => {
                const end = placed[t][c + 1];
                return (
                  <span key={c} className="curling__slot">
                    {end !== undefined && (
                      <span key={`${t}${end}`} className={`curling__card num${end === ends.length ? " is-new" : ""}`}>
                        {end}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          ))}
          <div className="curling__points" style={{ order: 1 }}>
            <span className="curling__rowname mono">Points</span>
            {Array.from({ length: COLS }, (_, c) => (
              <span key={c} className="curling__pt num">
                {c + 1}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="curling__controls">
        <fieldset className="seg">
          <legend className="mono">Scoring team</legend>
          {(["red", "yellow"] as const).map((t) => (
            <label key={t} className={`seg__opt seg__opt--${t}`}>
              <input type="radio" name="curl-team" value={t} checked={team === t} onChange={() => setTeam(t)} />
              <span>{teamName(t)}</span>
            </label>
          ))}
        </fieldset>
        <fieldset className="seg">
          <legend className="mono">Stones counted</legend>
          {[1, 2, 3, 4].map((p) => (
            <label key={p} className="seg__opt">
              <input type="radio" name="curl-pts" value={p} checked={pts === p} onChange={() => setPts(p)} />
              <span>{p}</span>
            </label>
          ))}
        </fieldset>
        <div className="btn-row">
          <button type="button" className="btn btn--solid" onClick={hang} disabled={pts > room || nextEnd > 10}>
            Hang card “{nextEnd}”
          </button>
          <button type="button" className="btn" onClick={() => setEnds((e) => e.slice(0, -1))} disabled={!ends.length}>
            Undo
          </button>
          <button type="button" className="btn btn--small" onClick={() => setEnds([])}>
            Clear board
          </button>
        </div>
      </div>

      <p className="live" aria-live="polite">
        {lastEnd
          ? `End ${ends.length}: ${teamName(lastEnd.team)} scored ${lastEnd.pts}, so card ${ends.length} hangs under ${lastTotal}, their new total. Score: Red ${totals.red}, Yellow ${totals.yellow}.`
          : "An empty board. Score the first end."}
        {nextEnd > 10 ? " Ten ends played: game over." : ""}
      </p>
    </div>
  );
}
