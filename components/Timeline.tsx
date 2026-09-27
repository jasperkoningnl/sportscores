"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Certainty } from "@/components/ui";
import { CHAPTERS, PARTS } from "@/lib/chapters";
import { EVENTS, type ScoreEvent } from "@/lib/events";
import { whereIs } from "@/lib/places";
import { SOURCES } from "@/lib/sources";
import { SPORTS, type SportId } from "@/lib/sports";
import { useElementWidth } from "@/lib/hooks";

/*
 * Every date the essay tells (lib/events.ts), as a strip of dots and a list.
 * The strip has two panels because 174 BC and 2026 do not fit usefully on one
 * scale: antiquity to the Middle Ages on the left, 1700 onwards on the right.
 */

const EVENTS_SORTED = [...EVENTS].sort((a, b) => a.sort - b.sort);

// Where each event is told, and which part (or the prologue) that is in.
const WHERE = new Map(EVENTS_SORTED.map((e) => [e.id, whereIs(e.at)]));
const partKey = (e: ScoreEvent) => CHAPTERS.find((c) => c.id === WHERE.get(e.id)!.chapter)?.part ?? "prologue";

const PART_FILTERS = [
  { key: "all", label: "All" },
  { key: "prologue", label: "P", title: "Prologue" },
  ...PARTS.map((p) => ({ key: p.id, label: p.n, title: `Part ${p.n} · ${p.title}` })),
];

const SPORT_OPTIONS = (() => {
  const counts = new Map<SportId, number>();
  for (const e of EVENTS_SORTED) if (e.sport) counts.set(e.sport, (counts.get(e.sport) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || SPORTS[a[0]].localeCompare(SPORTS[b[0]]));
})();

const PERIODS = [
  { title: "Antiquity and the Middle Ages", from: -Infinity, to: 1500 },
  { title: "1700s", from: 1500, to: 1800 },
  { title: "1800s", from: 1800, to: 1900 },
  { title: "1900–1969", from: 1900, to: 1970 },
  { title: "1970–1999", from: 1970, to: 2000 },
  { title: "2000–2026", from: 2000, to: Infinity },
];

// The two panels of the strip: domain in years, share of the width.
const PANELS = [
  {
    from: -200,
    to: 1500,
    share: 0.24,
    ticks: [
      { y: -174, t: "174 BC", align: "start" },
      { y: 650, t: "650", wide: true },
      { y: 1430, t: "1430s", align: "end" },
    ],
  },
  {
    from: 1690,
    to: 2030,
    share: 0.72,
    ticks: [{ y: 1700, t: "1700" }, { y: 1800, t: "1800" }, { y: 1900, t: "1900" }, { y: 2000, t: "2000" }],
  },
];
const GAP = 0.04;
const DOT = 10;

// On a narrow screen the left panel gets a little more room, so its labels fit.
const sharesAt = (width: number) => (width < 600 ? [0.3, 0.66] : [PANELS[0].share, PANELS[1].share]);

function xOf(year: number, width: number) {
  const [a, b] = PANELS;
  const [sa, sb] = sharesAt(width);
  if (year < a.to) return ((year - a.from) / (a.to - a.from)) * sa * width;
  return (sa + GAP + ((year - b.from) / (b.to - b.from)) * sb) * width;
}

function firstSentence(text: string) {
  const m = text.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : text).trim();
}

export default function Timeline() {
  const [sport, setSport] = useState<SportId | "all">("all");
  const [part, setPart] = useState("all");
  const [hover, setHover] = useState<string | null>(null);
  const { ref, width } = useElementWidth<HTMLDivElement>(900);

  const shown = useMemo(
    () => new Set(EVENTS_SORTED.filter((e) => (sport === "all" || e.sport === sport) && (part === "all" || partKey(e) === part)).map((e) => e.id)),
    [sport, part]
  );

  // Stack dots that would overlap at this width.
  const dots = useMemo(() => {
    const levels: number[][] = [];
    return EVENTS_SORTED.map((e) => {
      const x = xOf(e.sort, width);
      let level = 0;
      while ((levels[level] ?? []).some((px) => Math.abs(px - x) < DOT + 2)) level++;
      (levels[level] ??= []).push(x);
      return { e, x, level };
    });
  }, [width]);
  const stripHeight = (Math.max(...dots.map((d) => d.level)) + 1) * (DOT + 3) + 8;
  const hovered = dots.find((d) => d.e.id === hover);

  return (
    <div className="tl">
      <div className="tl__filters" role="group" aria-label="Filter the timeline">
        <label className="tl__sport">
          <span className="mono">Sport</span>
          <select value={sport} onChange={(e) => setSport(e.target.value as SportId | "all")}>
            <option value="all">All sports</option>
            {SPORT_OPTIONS.map(([id, n]) => (
              <option key={id} value={id}>
                {SPORTS[id]} ({n})
              </option>
            ))}
          </select>
        </label>
        <div className="tl__parts" role="group" aria-label="Part of the essay">
          <span className="mono">Part</span>
          {PART_FILTERS.map((p) => (
            <button
              key={p.key}
              type="button"
              className="tl__part mono"
              aria-pressed={part === p.key}
              title={p.title}
              onClick={() => setPart(p.key)}
            >
              {p.label}
              {p.title && <span className="visually-hidden">: {p.title}</span>}
            </button>
          ))}
        </div>
        <p className="tl__count mono" aria-live="polite">
          {shown.size} of {EVENTS_SORTED.length} moments
        </p>
      </div>

      <figure className="tl__strip-wrap">
        <div className="tl__strip" ref={ref} style={{ height: stripHeight }}>
          {PANELS.map((_, i) => (
            <span
              key={i}
              className="tl__panel"
              style={{ left: `${(i === 0 ? 0 : sharesAt(width)[0] + GAP) * 100}%`, width: `${sharesAt(width)[i] * 100}%` }}
              aria-hidden="true"
            />
          ))}
          {dots.map(({ e, x, level }) => {
            const on = shown.has(e.id);
            return (
              <a
                key={e.id}
                href={`#ev-${e.id}`}
                className={`tl__dot${on ? "" : " is-off"}${hover === e.id ? " is-hover" : ""}`}
                style={{ left: x, bottom: 4 + level * (DOT + 3) }}
                tabIndex={on ? 0 : -1}
                aria-hidden={!on}
                aria-label={`${e.year}${e.sport ? `, ${SPORTS[e.sport]}` : ""}: ${firstSentence(e.text)}`}
                onPointerEnter={() => setHover(e.id)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(e.id)}
                onBlur={() => setHover(null)}
              />
            );
          })}
          {hovered && (
            <div
              className="tl__tip"
              role="presentation"
              style={{
                left: Math.min(Math.max(hovered.x, 110), width - 110),
                bottom: 4 + (hovered.level + 1) * (DOT + 3) + 6,
              }}
            >
              <strong className="num">{hovered.e.year}</strong>
              {hovered.e.sport && <span className="mono"> · {SPORTS[hovered.e.sport]}</span>}
              <span className="tl__tip-text">{firstSentence(hovered.e.text)}</span>
            </div>
          )}
        </div>
        <div className="tl__axis" aria-hidden="true">
          {PANELS.flatMap((p) => p.ticks as { y: number; t: string; align?: string; wide?: boolean }[])
            .filter((t) => !t.wide || width >= 600)
            .map((t) => (
              <span key={t.t} className={`tl__tick mono${t.align ? ` is-${t.align}` : ""}`} style={{ left: xOf(t.y, width) }}>
                {t.t}
              </span>
            ))}
        </div>
        <figcaption className="tl__strip-note mono">
          Each dot is one moment; the list below has them all. Two scales: antiquity to 1500 on the left, 1700 onwards on
          the right.
        </figcaption>
      </figure>

      {PERIODS.map((period) => {
        const items = EVENTS_SORTED.filter((e) => e.sort >= period.from && e.sort < period.to && shown.has(e.id));
        if (!items.length) return null;
        return (
          <section key={period.title} className="tl__period" aria-labelledby={`period-${period.from}`}>
            <h2 className="tl__period-title mono" id={`period-${period.from}`}>
              {period.title}
            </h2>
            <ol className="tl__list">
              {items.map((e) => {
                const where = WHERE.get(e.id)!;
                return (
                  <li key={e.id} id={`ev-${e.id}`} className="tl__item">
                    <span className="tl__year num">{e.year}</span>
                    <div className="tl__body">
                      <p className="tl__meta mono">
                        {e.sport ? SPORTS[e.sport] : "Words and records"}
                        {e.certainty && (
                          <>
                            {" "}
                            <Certainty level={e.certainty} />
                          </>
                        )}
                      </p>
                      <p className="tl__text">{e.text}</p>
                      <p className="tl__links">
                        <Link href={`/${where.href}`}>
                          In the essay: <span className="num">{where.label}</span> · {where.name}{" "}
                          <span aria-hidden="true">→</span>
                        </Link>
                        <span className="tl__sources mono">
                          {e.sources.map((id, i) => {
                            const s = SOURCES.find((x) => x.id === id);
                            return s ? (
                              <span key={id}>
                                {i > 0 && " · "}
                                <a href={s.url} target="_blank" rel="noreferrer">
                                  {s.publisher}
                                </a>
                              </span>
                            ) : null;
                          })}
                        </span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
