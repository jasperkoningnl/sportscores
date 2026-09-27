"use client";

import { useEffect, useState } from "react";
import { placeById, placeLabel } from "@/lib/places";
import { SHORT_ROUTE } from "@/lib/route";

/*
 * The short route: seven exhibits, one for each step of the thesis. Starting
 * it (from the contents or the prologue) shows a bar at the bottom of the
 * screen with the current stop and links to the previous and next one.
 * Stops are plain #links, so the stop at chapter cards stands aside for the
 * jump (see StopAndGo), and the route works as a list even without the bar.
 */

const START = "route:go";

/** Start (or move) the route at stop `i`. */
export function goToStop(i: number) {
  window.dispatchEvent(new CustomEvent<number>(START, { detail: i }));
}

const stops = SHORT_ROUTE.map((s) => ({ ...s, label: placeLabel(s.place), name: placeById(s.place).name }));

export function RouteList({ onGo }: { onGo: () => void }) {
  return (
    <div className="route">
      <p className="route__note mono">
        {stops.length} stops, one for each step of the story. A bar at the bottom of the screen takes you from one to the
        next.
      </p>
      <ol className="route__list">
        {stops.map((s, i) => (
          <li key={s.place}>
            <a
              href={`#${s.place}`}
              onClick={() => {
                goToStop(i);
                onGo();
              }}
            >
              <span className="route__label num">{s.label}</span>
              <span className="route__text">
                <span className="route__name">{s.name}</span>
                <span className="route__why">{s.why}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function RouteBar() {
  const [stop, setStop] = useState<number | null>(null);

  useEffect(() => {
    const onGo = (e: Event) => setStop((e as CustomEvent<number>).detail);
    // Previous and next are plain links; the stop shown follows the address. (Changing
    // the links' targets inside their own click would send the browser one stop too far.)
    const onHash = () => {
      const i = stops.findIndex((s) => `#${s.place}` === window.location.hash);
      if (i >= 0) setStop((current) => (current === null ? null : i));
    };
    window.addEventListener(START, onGo);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener(START, onGo);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  if (stop === null) return null;
  const s = stops[stop];
  const prev = stops[stop - 1];
  const next = stops[stop + 1];

  return (
    <div className="routebar" role="region" aria-label="Short route">
      <p className="routebar__where">
        <span className="routebar__kicker mono">
          Short route · stop {stop + 1} of {stops.length}
        </span>
        <span className="routebar__why">
          <span className="num">{s.label}</span> {s.why}
        </span>
      </p>
      <div className="routebar__nav">
        {prev ? (
          <a className="routebar__btn mono" href={`#${prev.place}`}>
            <span aria-hidden="true">←</span>
            <span className="visually-hidden">Previous stop: {prev.name}</span>
          </a>
        ) : (
          <span className="routebar__btn is-off" aria-hidden="true">
            ←
          </span>
        )}
        {next ? (
          <a className="routebar__btn routebar__btn--next mono" href={`#${next.place}`}>
            Next <span aria-hidden="true">→</span>
            <span className="visually-hidden">: {next.name}</span>
          </a>
        ) : (
          <a
            className="routebar__btn routebar__btn--next mono"
            href="#coda"
            onClick={() => window.setTimeout(() => setStop(null))}
          >
            The end <span aria-hidden="true">↓</span>
          </a>
        )}
        <button type="button" className="routebar__close" onClick={() => setStop(null)} aria-label="End the short route">
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  );
}
