"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CHAPTERS, PARTS, type ChapterMeta } from "@/lib/chapters";
import { measureReading, type ReadingColumn } from "@/lib/reading";
import ReadingScore from "@/components/ReadingScore";
import SportIndex from "@/components/SportIndex";
import { RouteList } from "@/components/ShortRoute";

type Tab = "chapters" | "sports" | "route";

const TABS: { id: Tab; label: string }[] = [
  { id: "chapters", label: "Chapters" },
  { id: "sports", label: "By sport" },
  { id: "route", label: "Short route" },
];

const OPEN = "contents:open";

/** Open the contents dialog on a given tab, from anywhere on the page. */
export function openContents(tab: Tab = "chapters") {
  window.dispatchEvent(new CustomEvent<Tab>(OPEN, { detail: tab }));
}

export default function TopBar() {
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [tab, setTab] = useState<Tab>("chapters");
  const [reading, setReading] = useState<ReadingColumn[] | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ chapters: null, sports: null, route: null });

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        // The current chapter is the last one whose top has passed 30% of the viewport.
        const line = window.innerHeight * 0.3;
        let idx = 0;
        CHAPTERS.forEach((c, i) => {
          const el = document.getElementById(c.id);
          if (el && el.getBoundingClientRect().top < line) idx = i;
        });
        setCurrent(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const open = (t: Tab = "chapters") => {
    // The reading score is measured from the page itself, each time the contents open.
    setReading(measureReading());
    setTab(t);
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const onOpen = (e: Event) => open((e as CustomEvent<Tab>).detail);
    window.addEventListener(OPEN, onOpen);
    return () => window.removeEventListener(OPEN, onOpen);
  });

  const chapter = CHAPTERS[current];

  const item = (c: ChapterMeta) => (
    <li key={c.id} className={c.id === chapter.id ? "is-current" : undefined}>
      <a href={`#${c.id}`} onClick={close}>
        <span className="contents__n">{c.n}</span>
        <span>{c.title}</span>
      </a>
    </li>
  );

  const moveTab = (step: number) => {
    const i = (TABS.findIndex((t) => t.id === tab) + step + TABS.length) % TABS.length;
    setTab(TABS[i].id);
    tabRefs.current[TABS[i].id]?.focus();
  };

  return (
    <>
      <div className="topbar" role="banner">
        <a className="topbar__title" href="#prologue">
          The Archaeology of Sports Scores
        </a>
        <button type="button" className="topbar__chapter" onClick={() => open()} aria-haspopup="dialog">
          <span className="topbar__n" aria-hidden="true">
            {chapter.n}
          </span>
          <span className="topbar__name">{chapter.title}</span>
          <span className="topbar__contents">Contents</span>
        </button>
        <div className="topbar__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="contents"
        aria-labelledby="contents-title"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="contents__inner">
          <div className="contents__head">
            <h2 id="contents-title">Contents</h2>
            <button type="button" className="btn btn--small" onClick={close}>
              Close
            </button>
          </div>

          <div
            className="contents__tabs"
            role="tablist"
            aria-label="Ways into the essay"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                moveTab(1);
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                moveTab(-1);
              }
            }}
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[t.id] = el;
                }}
                type="button"
                role="tab"
                id={`contents-tab-${t.id}`}
                aria-controls={`contents-panel-${t.id}`}
                aria-selected={tab === t.id}
                tabIndex={tab === t.id ? 0 : -1}
                className={`contents__tab mono${tab === t.id ? " is-on" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div
            className="contents__panel"
            role="tabpanel"
            id={`contents-panel-${tab}`}
            aria-labelledby={`contents-tab-${tab}`}
          >
            {tab === "chapters" && (
              <>
                {reading && <ReadingScore columns={reading} />}
                <ol className="contents__list">
                  {CHAPTERS.filter((c) => !c.part && c.id !== "sources").map(item)}
                  {PARTS.map((p) => (
                    <li key={p.id} className="contents__part">
                      <p className="contents__part-head mono">
                        Part {p.n} · {p.title}
                      </p>
                      <ol className="contents__list">{CHAPTERS.filter((c) => c.part === p.id).map(item)}</ol>
                    </li>
                  ))}
                  {CHAPTERS.filter((c) => c.id === "sources").map(item)}
                </ol>
              </>
            )}
            {tab === "sports" && <SportIndex onGo={close} />}
            {tab === "route" && <RouteList onGo={close} />}
          </div>

          <p className="contents__quiz">
            <Link href="/quiz" className="mono">
              Quiz: read the scoreboard <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </dialog>
    </>
  );
}
