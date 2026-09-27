import type { ReactNode } from "react";
import { SOURCES, sourceNumber } from "@/lib/sources";
import { CHAPTERS, CHAPTER_COUNT, chapterById, partOf } from "@/lib/chapters";
import { placeLabel } from "@/lib/places";
import ShareLink from "@/components/ShareLink";

/** Unobtrusive numbered citation(s) pointing into the bibliography. */
export function Cite({ id }: { id: string | string[] }) {
  const ids = Array.isArray(id) ? id : [id];
  return (
    <sup className="cite">
      {ids.map((sid, i) => {
        const n = sourceNumber(sid);
        const src = SOURCES[n - 1];
        return (
          <span key={sid}>
            {i > 0 && <span aria-hidden="true">,</span>}
            <a href={`#src-${sid}`} aria-label={`Source ${n}: ${src.publisher}`} title={`${src.publisher} — ${src.title}`}>
              {n}
            </a>
          </span>
        );
      })}
    </sup>
  );
}

type CertaintyLevel = "documented" | "theory" | "disputed" | "story" | "unknown" | "proposal";

const CERTAINTY_TEXT: Record<CertaintyLevel, string> = {
  documented: "Documented",
  theory: "Theory",
  disputed: "Historians disagree",
  story: "Good story",
  unknown: "Unknown",
  proposal: "Proposal",
};

/** A small stamp that tells the reader how sure we are about the claim beside it. */
export function Certainty({ level, children }: { level: CertaintyLevel; children?: ReactNode }) {
  return (
    <span className={`certainty certainty--${level}`}>
      <span className="certainty__mark" aria-hidden="true" />
      {children ?? CERTAINTY_TEXT[level]}
    </span>
  );
}

export function Chapter({
  id,
  number,
  title,
  dek,
  children,
}: {
  id: string;
  number: number;
  title: ReactNode;
  dek?: ReactNode;
  children: ReactNode;
  tone?: "paper" | "deep";
}) {
  const plate = String(number).padStart(2, "0");
  const part = partOf(id);
  // The first chapter of each part announces the part more loudly.
  const opensPart = part !== undefined && CHAPTERS.find((c) => c.part === part.id)?.id === id;
  return (
    <section id={id} className="chapter" aria-labelledby={`${id}-title`} data-chapter={id}>
      {/* A full-screen title card: the reader's scroll pauses here briefly (see StopAndGo). */}
      <header className="chapter-card" data-stop>
        <div className="chapter-card__inner">
          <div className="chapter-card__plate" aria-hidden="true">
            <span className="chapter-plate__bolt" />
            {plate.split("").map((d, i) => (
              <span key={i} className="chapter-card__digit num" style={{ animationDelay: `${i * 120}ms` }}>
                {d}
              </span>
            ))}
            <span className="chapter-plate__bolt" />
          </div>
          <p className="chapter-card__kicker mono">
            {part && (
              <>
                <span className={`chapter-card__part${opensPart ? " is-opening" : ""}`}>
                  Part {part.n} · {part.title}
                </span>
                <span className="chapter-card__sep" aria-hidden="true">
                  {" "}
                  —{" "}
                </span>
              </>
            )}
            <span>
              Chapter {number} of {CHAPTER_COUNT}
            </span>
          </p>
          <h2 id={`${id}-title`} className="chapter-card__title">
            {title}
          </h2>
          {dek && <p className="chapter-card__dek">{dek}</p>}
        </div>
        <ShareLink id={id} label={`chapter ${number}, ${chapterById(id)?.title ?? ""}`} />
        <a className="chapter-card__go mono" href={`#${id}-body`}>
          Continue <span aria-hidden="true">↓</span>
        </a>
      </header>
      <div id={`${id}-body`} className="chapter-body">
        {children}
      </div>
    </section>
  );
}

export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`prose ${className}`}>{children}</div>;
}

/**
 * An exhibit: an interactive or object, with a museum-style label underneath.
 * `id` is its stable address and must be listed in lib/places.ts, which also
 * works out its number (e.g. "2.3").
 */
export function Exhibit({
  id,
  title,
  kind = "Interactive",
  status,
  instructions,
  surface = "paper",
  width = "wide",
  children,
}: {
  id: string;
  title: string;
  kind?: string;
  status?: string;
  instructions?: ReactNode;
  surface?: "paper" | "board" | "plain" | "stone";
  width?: "wide" | "text" | "full";
  children: ReactNode;
}) {
  return (
    <figure id={id} className={`exhibit exhibit--${width}`}>
      <div className={`exhibit-body surface-${surface}`}>{children}</div>
      <figcaption className="exhibit-label">
        <span className="exhibit-label__no">{placeLabel(id)}</span>
        <span className="exhibit-label__title">{title}</span>
        <span className="exhibit-label__meta">
          {kind}
          {status ? ` · ${status}` : ""}
        </span>
        {instructions && <span className="exhibit-label__how">{instructions}</span>}
      </figcaption>
    </figure>
  );
}

export function PullLine({ children, cite }: { children: ReactNode; cite?: ReactNode }) {
  return (
    <blockquote className="pull-line">
      <p>{children}</p>
      {cite && <footer>{cite}</footer>}
    </blockquote>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="kbd">{children}</kbd>;
}
