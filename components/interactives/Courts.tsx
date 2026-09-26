"use client";

import { useState } from "react";
import ShotMap, { type ShotValue } from "./ShotMap";

/* ================= Basketball half court (NBA geometry, feet) ================= */

const BX = 25; // basket centre, feet from the left sideline
const BY = 5.25; // basket centre, feet from the baseline
const R3 = 23.75; // top of the three-point arc
const CORNER = 22; // corner three distance
const CORNER_Y = BY + Math.sqrt(R3 * R3 - CORNER * CORNER); // where the arc meets the corner lines
const R4 = 27; // PBA four-point arc, adopted 2024

function arcPath(r: number) {
  // Portion of a circle of radius r around the basket that lies inside the court.
  const dx = Math.min(r, 25);
  const dy = Math.sqrt(Math.max(0, r * r - dx * dx));
  return `M ${BX - dx} ${BY + dy} A ${r} ${r} 0 0 0 ${BX + dx} ${BY + dy}`;
}

function Court({ four }: { four: boolean }) {
  const ink = "var(--court-line)";
  const sw = 0.28;
  return (
    <g>
      <rect x="0" y="0" width="50" height="47" fill="var(--court)" />
      {four && (
        <path
          d={`${arcPath(R4)} L 50 47 L 0 47 Z`}
          fill="var(--court-four)"
          stroke="none"
        />
      )}
      {/* three-point area */}
      <path
        d={`M ${BX - CORNER} 0 L ${BX - CORNER} ${CORNER_Y} A ${R3} ${R3} 0 0 0 ${BX + CORNER} ${CORNER_Y} L ${BX + CORNER} 0 Z`}
        fill="var(--court-two)"
        stroke={ink}
        strokeWidth={sw}
      />
      {four && <path d={arcPath(R4)} fill="none" stroke="var(--red)" strokeWidth={sw * 1.4} strokeDasharray="0.8 0.5" />}
      {/* lane and free-throw circle */}
      <rect x={BX - 8} y="0" width="16" height="19" fill="var(--court-lane)" stroke={ink} strokeWidth={sw} />
      <circle cx={BX} cy="19" r="6" fill="none" stroke={ink} strokeWidth={sw} />
      {/* restricted area, backboard, rim */}
      <path d={`M ${BX - 4} ${BY} A 4 4 0 0 0 ${BX + 4} ${BY}`} fill="none" stroke={ink} strokeWidth={sw} />
      <line x1={BX - 3} x2={BX + 3} y1="4" y2="4" stroke={ink} strokeWidth={sw * 1.6} />
      <circle cx={BX} cy={BY} r="0.75" fill="none" stroke="var(--red)" strokeWidth={sw * 1.2} />
      {/* half-court line and centre circle */}
      <line x1="0" x2="50" y1="47" y2="47" stroke={ink} strokeWidth={sw * 2} />
      <path d={`M ${BX - 6} 47 A 6 6 0 0 1 ${BX + 6} 47`} fill="none" stroke={ink} strokeWidth={sw} />
      <rect x="0" y="0" width="50" height="47" fill="none" stroke={ink} strokeWidth={sw * 2} />
      <text x={BX} y={CORNER_Y + 12.3} textAnchor="middle" className="court-label" fontSize="1.4">
        23 ft 9 in
      </text>
      <text x={BX - CORNER + 0.8} y="3.2" className="court-label" fontSize="1.2">
        22 ft
      </text>
      {four && (
        <text x={BX} y={BY + R4 + 2} textAnchor="middle" className="court-label court-label--red" fontSize="1.4">
          27 ft · four points
        </text>
      )}
    </g>
  );
}

export function BasketballCourt() {
  const [four, setFour] = useState(false);
  const valueAt = (x: number, y: number): ShotValue => {
    const d = Math.hypot(x - BX, y - BY);
    if (four && d >= R4) return { points: 4, zone: `${d.toFixed(0)} ft out, beyond the four-point arc` };
    const corner = Math.abs(x - BX) >= CORNER && y <= CORNER_Y;
    if (corner) return { points: 3, zone: "a corner three, the shortest three on the floor" };
    if (d >= R3) return { points: 3, zone: `${d.toFixed(0)} ft out, beyond the arc` };
    return { points: 2, zone: `${d.toFixed(0)} ft out, inside the arc` };
  };
  return (
    <div className="court-wrap">
      <ShotMap
        key={four ? "four" : "three"}
        width={50}
        height={47}
        unit="ft"
        fontSize={1.5}
        label="Basketball half court"
        drawing={<Court four={four} />}
        valueAt={valueAt}
        initialCursor={{ x: 25, y: 20 }}
        markerColor={(p) => (p === 4 ? "var(--series-2)" : p === 3 ? "var(--red)" : "var(--ink)")}
      />
      <div className="btn-row">
        <button type="button" className="btn" aria-pressed={four} onClick={() => setFour((f) => !f)}>
          {four ? "Remove the four-point arc" : "Add a four-point arc (PBA, 27 ft)"}
        </button>
      </div>
    </div>
  );
}

/* ================= Gaelic football: the two-point arc (metres) ================= */

const GW = 80; // pitch width shown
const GH = 52; // depth shown from the end line
const GX = GW / 2;

function Pitch() {
  const ink = "rgba(255,255,255,0.85)";
  const sw = 0.35;
  const dx = Math.sqrt(40 * 40 - 20 * 20); // where a 40 m circle meets the 20 m line
  return (
    <g>
      <rect x="0" y="0" width={GW} height={GH} fill="#2f7a45" />
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x="0" y={i * 9} width={GW} height="4.5" fill="#2a7040" />
      ))}
      {/* two-point zone: beyond 40 m and beyond the 20 m line */}
      <path
        d={`M 0 20 L ${GX - dx} 20 A 40 40 0 0 0 ${GX + dx} 20 L ${GW} 20 L ${GW} ${GH} L 0 ${GH} Z`}
        fill="rgba(240,138,28,0.28)"
      />
      <path d={`M ${GX - dx} 20 A 40 40 0 0 0 ${GX + dx} 20`} fill="none" stroke="#f3a14a" strokeWidth={sw * 1.4} />
      {/* lines: end line, small and large rectangles, 13 m, 20 m, 45 m */}
      <line x1="0" x2={GW} y1="0.3" y2="0.3" stroke={ink} strokeWidth={sw * 2} />
      <rect x={GX - 7} y="0" width="14" height="4.5" fill="none" stroke={ink} strokeWidth={sw} />
      <rect x={GX - 9.5} y="0" width="19" height="13" fill="none" stroke={ink} strokeWidth={sw} />
      {[13, 20, 45].map((y) => (
        <line key={y} x1="0" x2={GW} y1={y} y2={y} stroke={ink} strokeWidth={sw} strokeDasharray={y === 45 ? "1 1" : undefined} />
      ))}
      {/* goal: posts and net */}
      <rect x={GX - 3.25} y="-0.2" width="6.5" height="1.2" fill="rgba(255,255,255,0.35)" stroke="#fff" strokeWidth={sw} />
      <circle cx={GX - 3.25} cy="0.3" r="0.45" fill="#fff" />
      <circle cx={GX + 3.25} cy="0.3" r="0.45" fill="#fff" />
      <text x="2" y="18.4" fontSize="2.2" className="pitch-label">
        20 m line
      </text>
      <text x={GX} y="37.5" textAnchor="middle" fontSize="2.4" className="pitch-label">
        40 m arc
      </text>
      <text x={GX} y="50" textAnchor="middle" fontSize="2.4" className="pitch-label pitch-label--strong">
        two points from out here
      </text>
    </g>
  );
}

export function GaelicArc() {
  const valueAt = (x: number, y: number): ShotValue => {
    const d = Math.hypot(x - GX, y);
    if (d >= 40 && y >= 20) return { points: 2, zone: `${d.toFixed(0)} m out, beyond the arc: orange flag` };
    return { points: 1, zone: `${d.toFixed(0)} m out, inside the arc: white flag` };
  };
  return (
    <ShotMap
      width={GW}
      height={GH}
      unit="m"
      fontSize={2.4}
      label="Gaelic football pitch, one end"
      drawing={<Pitch />}
      valueAt={valueAt}
      initialCursor={{ x: GX, y: 30 }}
      summaryNoun="kick"
      markerColor={(p) => (p === 2 ? "#f08a1c" : "#f5f3ea")}
      markerText={() => "#1a1a1a"}
    />
  );
}
