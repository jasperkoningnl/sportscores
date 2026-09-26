"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

const LAPS = 7;
const TRACK = "M150 52 L650 52 A98 98 0 0 1 650 248 L150 248 A98 98 0 0 1 150 52 Z";

function Dolphin({ x, down }: { x: number; down: boolean }) {
  return (
    <g className={`lap-dolphin${down ? " is-down" : ""}`} style={{ transformOrigin: `${x}px 136px` }}>
      <line x1={x} y1="136" x2={x} y2="122" stroke="var(--stone-ink)" strokeWidth="2" />
      <path
        d={`M${x - 11} ${118} C ${x - 6} ${104}, ${x + 8} ${102}, ${x + 12} ${112} L ${x + 17} ${106} L ${x + 15} ${116} L ${x + 20} ${120} L ${x + 12} ${119} C ${x + 6} ${125}, ${x - 6} ${125}, ${x - 11} ${118} Z`}
        fill="var(--amber)"
        stroke="var(--stone-ink)"
        strokeWidth="1.2"
      />
    </g>
  );
}

function EggMarker({ x, down }: { x: number; down: boolean }) {
  return (
    <g className={`lap-egg${down ? " is-down" : ""}`}>
      <ellipse cx={x} cy="112" rx="7" ry="10" fill="var(--plate)" stroke="var(--stone-ink)" strokeWidth="1.2" />
    </g>
  );
}

export default function LapCounter() {
  const [laps, setLaps] = useState(0);
  const [running, setRunning] = useState(false);
  const reduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const chariotRef = useRef<SVGGElement>(null);
  const raf = useRef(0);

  const place = (t: number) => {
    const path = pathRef.current;
    const chariot = chariotRef.current;
    if (!path || !chariot) return;
    const len = path.getTotalLength();
    // Start on the finish line (middle of the lower straight) and run anticlockwise.
    const startD = 500 + Math.PI * 98 + 250;
    const d = (((startD - (t % 1) * len) % len) + len) % len;
    const p = path.getPointAtLength(d);
    const q = path.getPointAtLength((d - 2 + len) % len);
    const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
    chariot.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${angle})`);
  };

  useEffect(() => {
    place(0);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const completeLap = () => {
    if (running || laps >= LAPS) return;
    if (reduced) {
      setLaps((l) => l + 1);
      return;
    }
    setRunning(true);
    const start = performance.now();
    const dur = 1500;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / dur);
      const eased = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      place(eased);
      if (k < 1) raf.current = requestAnimationFrame(tick);
      else {
        place(0);
        setRunning(false);
        setLaps((l) => l + 1);
      }
    };
    raf.current = requestAnimationFrame(tick);
  };

  const reset = () => {
    cancelAnimationFrame(raf.current);
    setRunning(false);
    setLaps(0);
    place(0);
  };

  const remaining = LAPS - laps;
  const finished = laps >= LAPS;
  const eggXs = Array.from({ length: LAPS }, (_, i) => 222 + i * 24);
  const dolphinXs = Array.from({ length: LAPS }, (_, i) => 426 + i * 26);

  return (
    <div className="laps">
      <svg className="laps__svg" viewBox="0 0 800 300" role="img" aria-label={`Top view of a Roman circus. ${laps} of 7 laps completed; ${remaining} eggs and ${remaining} dolphins still raised.`}>
        <rect x="0" y="0" width="800" height="300" fill="var(--paper-3)" />
        <path d={TRACK} fill="#cdb48a" stroke="var(--stone-2)" strokeWidth="46" strokeOpacity="0.25" />
        <path ref={pathRef} d={TRACK} fill="none" stroke="#b99a66" strokeWidth="1" strokeDasharray="4 6" />
        {/* the spina, the central barrier */}
        <rect x="190" y="136" width="420" height="28" rx="3" fill="var(--stone)" stroke="var(--stone-ink)" strokeWidth="1.5" />
        <rect x="206" y="140" width="176" height="20" fill="#7aa0b0" opacity="0.7" />
        <rect x="414" y="140" width="184" height="20" fill="#7aa0b0" opacity="0.7" />
        {/* metae: the turning posts */}
        {[178, 622].map((x) => (
          <g key={x}>
            <circle cx={x} cy="150" r="12" fill="var(--stone-2)" />
            <path d={`M${x - 8} 150 L${x} 128 L${x + 8} 150 Z`} fill="var(--stone-ink)" opacity="0.6" />
          </g>
        ))}
        {/* egg frame */}
        <line x1="210" y1="100" x2="378" y2="100" stroke="var(--stone-ink)" strokeWidth="2" />
        <line x1="212" y1="100" x2="212" y2="138" stroke="var(--stone-ink)" strokeWidth="2" />
        <line x1="376" y1="100" x2="376" y2="138" stroke="var(--stone-ink)" strokeWidth="2" />
        {eggXs.map((x, i) => (
          <EggMarker key={x} x={x} down={i < laps} />
        ))}
        {dolphinXs.map((x, i) => (
          <Dolphin key={x} x={x} down={i < laps} />
        ))}
        <text x="294" y="92" textAnchor="middle" className="laps__caption">
          ova · eggs
        </text>
        <text x="504" y="92" textAnchor="middle" className="laps__caption">
          delphini · dolphins
        </text>
        {/* finish line */}
        <line x1="400" y1="226" x2="400" y2="270" stroke="var(--plate)" strokeWidth="4" />
        {/* chariot */}
        <g ref={chariotRef}>
          <rect x="-11" y="-7" width="10" height="14" rx="2" fill="var(--red)" />
          <rect x="-1" y="-9" width="14" height="4" rx="2" fill="var(--ink)" />
          <rect x="-1" y="-3" width="14" height="4" rx="2" fill="var(--ink)" />
          <rect x="-1" y="3" width="14" height="4" rx="2" fill="var(--ink)" />
        </g>
      </svg>

      <div className="laps__panel">
        <div className="laps__count" aria-hidden="true">
          <span className="num">{laps}</span>
          <span className="mono">/ 7 laps</span>
        </div>
        <div className="btn-row">
          <button type="button" className="btn btn--solid" onClick={completeLap} disabled={running || finished}>
            {finished ? "Race over" : running ? "Racing…" : "Complete a lap"}
          </button>
          <button type="button" className="btn btn--small" onClick={reset}>
            New race
          </button>
        </div>
        <p className="live" aria-live="polite">
          {finished
            ? "Seven laps, seven eggs down, seven dolphins tipped. The race is over."
            : laps === 0
              ? "All seven eggs and seven dolphins are raised. No laps run yet."
              : `${laps} ${laps === 1 ? "lap" : "laps"} run. ${remaining} ${remaining === 1 ? "egg" : "eggs"} and ${remaining} ${remaining === 1 ? "dolphin" : "dolphins"} still up.`}
        </p>
      </div>
    </div>
  );
}
