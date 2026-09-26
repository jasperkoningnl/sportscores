"use client";

import { useRef, useState, type ReactNode } from "react";

export type ShotValue = { points: number; zone: string };

type Shot = { x: number; y: number; v: ShotValue };

/**
 * A clickable playing surface in real-world units (feet or metres). Each
 * click or keyboard "shot" is valued by the sport's geometry.
 */
export default function ShotMap({
  width,
  height,
  drawing,
  valueAt,
  unit,
  fontSize,
  label,
  markerColor,
  markerText = () => "var(--paper)",
  initialCursor,
  summaryNoun = "shot",
}: {
  width: number;
  height: number;
  drawing: ReactNode;
  valueAt: (x: number, y: number) => ShotValue;
  unit: string;
  fontSize: number;
  label: string;
  markerColor: (points: number) => string;
  markerText?: (points: number) => string;
  initialCursor: { x: number; y: number };
  summaryNoun?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [shots, setShots] = useState<Shot[]>([]);
  const [cursor, setCursor] = useState(initialCursor);
  const [focused, setFocused] = useState(false);

  const shoot = (x: number, y: number) => {
    const v = valueAt(x, y);
    setShots((s) => [...s.slice(-24), { x, y, v }]);
  };

  const onClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const p = pt.matrixTransform(ctm.inverse());
    const x = Math.max(0, Math.min(width, p.x));
    const y = Math.max(0, Math.min(height, p.y));
    setCursor({ x, y });
    shoot(x, y);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 5 : 1;
    let { x, y } = cursor;
    if (e.key === "ArrowLeft") x -= step;
    else if (e.key === "ArrowRight") x += step;
    else if (e.key === "ArrowUp") y -= step;
    else if (e.key === "ArrowDown") y += step;
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      shoot(cursor.x, cursor.y);
      return;
    } else return;
    e.preventDefault();
    setCursor({ x: Math.max(0, Math.min(width, x)), y: Math.max(0, Math.min(height, y)) });
  };

  const total = shots.reduce((a, s) => a + s.v.points, 0);
  const last = shots[shots.length - 1];
  const here = valueAt(cursor.x, cursor.y);
  const byValue = shots.reduce<Record<number, number>>((acc, s) => {
    acc[s.v.points] = (acc[s.v.points] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="shotmap">
      <svg
        ref={svgRef}
        className="shotmap__svg"
        viewBox={`0 0 ${width} ${height}`}
        role="application"
        aria-label={`${label}. Use arrow keys to move the aiming point and Enter to shoot. Aiming point is worth ${here.points}.`}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onKey}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {drawing}
        {shots.map((s, i) => (
          <g key={i} className="shotmap__shot" transform={`translate(${s.x} ${s.y})`}>
            <circle r={fontSize * 0.55} fill={markerColor(s.v.points)} stroke="var(--paper)" strokeWidth={fontSize * 0.12} />
            <text y={fontSize * 0.36} textAnchor="middle" fontSize={fontSize} className="shotmap__val" fill={markerText(s.v.points)}>
              {s.v.points}
            </text>
          </g>
        ))}
        {focused && (
          <g transform={`translate(${cursor.x} ${cursor.y})`} className="shotmap__cursor" aria-hidden="true">
            <circle r={fontSize * 0.9} fill="none" stroke="var(--focus)" strokeWidth={fontSize * 0.15} />
            <line x1={-fontSize * 1.4} x2={fontSize * 1.4} y1="0" y2="0" stroke="var(--focus)" strokeWidth={fontSize * 0.1} />
            <line y1={-fontSize * 1.4} y2={fontSize * 1.4} x1="0" x2="0" stroke="var(--focus)" strokeWidth={fontSize * 0.1} />
          </g>
        )}
      </svg>
      <div className="shotmap__panel">
        <div className="shotmap__stat">
          <span className="mono">{summaryNoun}s</span>
          <span className="num">{shots.length}</span>
        </div>
        <div className="shotmap__stat">
          <span className="mono">points</span>
          <span className="num">{total}</span>
        </div>
        {Object.keys(byValue)
          .map(Number)
          .sort()
          .map((v) => (
            <div key={v} className="shotmap__stat">
              <span className="mono">worth {v}</span>
              <span className="num" style={{ color: markerColor(v) }}>
                {byValue[v]}
              </span>
            </div>
          ))}
        <button type="button" className="btn btn--small" onClick={() => setShots([])} disabled={!shots.length}>
          Clear
        </button>
      </div>
      <p className="live" aria-live="polite">
        {last
          ? `+${last.v.points}: ${last.v.zone}. ${shots.length} ${summaryNoun}${shots.length === 1 ? "" : "s"}, ${total} points.`
          : `Click anywhere on the ${unit === "ft" ? "court" : "pitch"}.`}
      </p>
    </div>
  );
}
