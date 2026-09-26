"use client";

import { useEffect, useRef, useState } from "react";

const MODES = {
  basketball: { limit: 24, name: "Basketball", target: "rim", teams: ["Home", "Away"] },
  korfball: { limit: 25, name: "Korfball", target: "korf", teams: ["Home", "Away"] },
} as const;

type Mode = keyof typeof MODES;

export default function ShotClock() {
  const [mode, setMode] = useState<Mode>("basketball");
  const cfg = MODES[mode];
  const [left, setLeft] = useState<number>(cfg.limit * 1000);
  const [running, setRunning] = useState(false);
  const [possession, setPossession] = useState(0);
  const [violation, setViolation] = useState(false);
  const [msg, setMsg] = useState(`${cfg.limit} seconds to shoot. Press Start.`);
  const raf = useRef(0);
  const endAt = useRef(0);

  useEffect(() => {
    if (!running) return;
    endAt.current = performance.now() + left;
    const tick = (now: number) => {
      const rem = Math.max(0, endAt.current - now);
      setLeft(rem);
      if (rem <= 0) {
        setRunning(false);
        setViolation(true);
        setPossession((p) => 1 - p);
        setMsg("Shot-clock violation. The ball goes to the other team.");
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [running]);

  const reset = (why: string) => {
    cancelAnimationFrame(raf.current);
    setLeft(cfg.limit * 1000);
    setViolation(false);
    setMsg(why);
    if (running) {
      endAt.current = performance.now() + cfg.limit * 1000;
      setRunning(false);
      requestAnimationFrame(() => setRunning(true));
    }
  };

  const toggle = () => {
    if (violation) {
      setViolation(false);
      setLeft(cfg.limit * 1000);
      setRunning(true);
      setMsg("New possession. The clock restarts.");
      return;
    }
    setRunning((r) => !r);
    setMsg(running ? "Paused." : "Clock running.");
  };

  const switchMode = (m: Mode) => {
    cancelAnimationFrame(raf.current);
    setMode(m);
    setRunning(false);
    setViolation(false);
    setLeft(MODES[m].limit * 1000);
    setMsg(`${MODES[m].name}: ${MODES[m].limit} seconds to shoot.`);
  };

  const secs = left / 1000;
  const shown = secs >= 5 || secs === 0 ? String(Math.ceil(secs)) : secs.toFixed(1);
  const low = secs < 5 && secs > 0;

  return (
    <div
      className="shotclock"
      onKeyDown={(e) => {
        if (e.target instanceof HTMLButtonElement && (e.key === " " || e.key === "Enter")) return;
        if (e.key === "s" || e.key === "S") {
          e.preventDefault();
          toggle();
        } else if (e.key === "r" || e.key === "R") {
          e.preventDefault();
          reset(`The shot hits the ${cfg.target}. Back to ${cfg.limit}.`);
        }
      }}
    >
      <div className="btn-row" role="group" aria-label="Sport">
        {(Object.keys(MODES) as Mode[]).map((m) => (
          <button key={m} type="button" className="btn btn--small" aria-pressed={mode === m} onClick={() => switchMode(m)}>
            {MODES[m].name} · {MODES[m].limit}s
          </button>
        ))}
      </div>

      <div className="shotclock__rig">
        <div className="shotclock__score" aria-hidden="true">
          {cfg.teams.map((t, i) => (
            <div key={t} className="shotclock__team">
              <span className="mono">
                {t} {possession === i ? "◀ ball" : ""}
              </span>
              <span className="num">{i === 0 ? 88 : 86}</span>
            </div>
          ))}
        </div>
        <div className={`shotclock__face${low ? " is-low" : ""}${violation ? " is-violation" : ""}`}>
          <span className="shotclock__label mono">Shot clock</span>
          <span className="shotclock__digits num" aria-hidden="true">
            <span className="shotclock__ghost">{shown.includes(".") ? "8.8" : "88"}</span>
            <span className="shotclock__lit">{shown}</span>
          </span>
        </div>
      </div>

      <div className="btn-row">
        <button type="button" className="btn btn--solid" onClick={toggle}>
          {violation ? "Next possession" : running ? "Pause" : "Start"}
        </button>
        <button
          type="button"
          className="btn btn--amber"
          onClick={() => reset(`The shot hits the ${cfg.target}. Back to ${cfg.limit}.`)}
        >
          Shot hits the {cfg.target}
        </button>
        <button
          type="button"
          className="btn btn--small"
          onClick={() => {
            cancelAnimationFrame(raf.current);
            setRunning(false);
            setViolation(false);
            setLeft(cfg.limit * 1000);
            setMsg("Reset.");
          }}
        >
          Reset
        </button>
      </div>
      <p className="live" aria-live="polite">
        {msg}
      </p>
      <p className="visually-hidden" aria-live="off">
        {Math.ceil(secs)} seconds left.
      </p>
    </div>
  );
}
