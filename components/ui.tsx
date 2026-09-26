import type { ReactNode } from "react";
import { SOURCES, sourceNumber } from "@/lib/sources";

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
  tone = "paper",
}: {
  id: string;
  number: number;
  title: ReactNode;
  dek?: ReactNode;
  children: ReactNode;
  tone?: "paper" | "deep";
}) {
  const plate = String(number).padStart(2, "0");
  return (
    <section id={id} className={`chapter chapter--${tone}`} aria-labelledby={`${id}-title`} data-chapter={id}>
      <header className="chapter-head">
        <div className="chapter-plate" aria-hidden="true">
          <span className="chapter-plate__bolt" />
          <span className="chapter-plate__num">{plate}</span>
          <span className="chapter-plate__bolt" />
        </div>
        <p className="kicker">Chapter {number}</p>
        <h2 id={`${id}-title`} className="chapter-title">
          {title}
        </h2>
        {dek && <p className="chapter-dek">{dek}</p>}
      </header>
      {children}
    </section>
  );
}

export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`prose ${className}`}>{children}</div>;
}

/** An exhibit: an interactive or object, with a museum-style label underneath. */
export function Exhibit({
  id,
  label,
  title,
  kind = "Interactive",
  status,
  instructions,
  surface = "paper",
  width = "wide",
  children,
}: {
  id?: string;
  label: string;
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
        <span className="exhibit-label__no">{label}</span>
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
