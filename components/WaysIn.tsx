"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { measureReading } from "@/lib/reading";
import { EVENTS } from "@/lib/events";
import { NOTATIONS } from "@/lib/notations";
import { QUESTIONS } from "@/lib/quiz";
import { SHORT_ROUTE } from "@/lib/route";
import { SPORT_ROWS } from "@/components/SportIndex";
import { goToStop } from "@/components/ShortRoute";
import { openContents } from "@/components/TopBar";

/** Four ways into the essay, each shown as a number on a plate. */
export default function WaysIn() {
  const [minutes, setMinutes] = useState<number | null>(null);

  useEffect(() => {
    // Counted from the page once it is laid out, like the reading score in the contents.
    const id = window.setTimeout(() => setMinutes(measureReading().reduce((n, c) => n + c.minutes, 0)), 300);
    return () => window.clearTimeout(id);
  }, []);

  const firstStop = SHORT_ROUTE[0].place;

  return (
    <nav className="ways" aria-labelledby="ways-title">
      <p id="ways-title" className="ways__title mono">
        Four ways in
      </p>
      <ul className="ways__list">
        <li>
          <a className="ways__item" href="#before-scores">
            <span className="ways__plate num">{minutes ?? "··"}</span>
            <span className="ways__unit mono">minutes</span>
            <span className="ways__name">Read it all</span>
            <span className="ways__what">Five parts, fourteen chapters</span>
          </a>
        </li>
        <li>
          <a className="ways__item" href={`#${firstStop}`} onClick={() => goToStop(0)}>
            <span className="ways__plate num">{SHORT_ROUTE.length}</span>
            <span className="ways__unit mono">stops</span>
            <span className="ways__name">Take the short route</span>
            <span className="ways__what">One exhibit for each step</span>
          </a>
        </li>
        <li>
          <button type="button" className="ways__item" onClick={() => openContents("sports")}>
            <span className="ways__plate num">{SPORT_ROWS.length}</span>
            <span className="ways__unit mono">sports</span>
            <span className="ways__name">Find your sport</span>
            <span className="ways__what">Where each one appears</span>
          </button>
        </li>
        <li>
          <Link className="ways__item" href="/quiz">
            <span className="ways__plate num">{QUESTIONS.length}</span>
            <span className="ways__unit mono">questions</span>
            <span className="ways__name">Read the scoreboard</span>
            <span className="ways__what">A quiz: you against the board</span>
          </Link>
        </li>
      </ul>
      <p className="ways__also mono">
        Also beside the essay: the <Link href="/timeline">timeline</Link> of {EVENTS.length} dates and the{" "}
        <Link href="/poster">poster</Link> of {NOTATIONS.length} notations.
      </p>
    </nav>
  );
}
