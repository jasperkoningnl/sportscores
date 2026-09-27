"use client";

import { useEffect, useRef, useState } from "react";
import { CHAPTERS, PARTS, type ChapterMeta } from "@/lib/chapters";

// Average silent reading rate of adults for non-fiction in English
// (Brysbaert 2019, Journal of Memory and Language 109, 104047).
const WORDS_PER_MINUTE = 238;

const wordsIn = (id: string) => {
  const el = document.getElementById(id);
  return el ? el.innerText.split(/\s+/).filter(Boolean).length : 0;
};

const minutes = (words: number) => Math.max(1, Math.round(words / WORDS_PER_MINUTE));

export default function TopBar() {
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [readingTime, setReadingTime] = useState<Record<string, number> | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

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

  const chapter = CHAPTERS[current];
  const open = () => {
    // Reading time is counted from the page itself, once, when the contents are first opened.
    if (!readingTime) {
      const times: Record<string, number> = {};
      let total = 0;
      for (const p of PARTS) {
        const words = CHAPTERS.filter((c) => c.part === p.id).reduce((n, c) => n + wordsIn(c.id), 0);
        times[p.id] = minutes(words);
        total += words;
      }
      times.total = minutes(total + wordsIn("prologue"));
      setReadingTime(times);
    }
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  const item = (c: ChapterMeta) => (
    <li key={c.id} className={c.id === chapter.id ? "is-current" : undefined}>
      <a href={`#${c.id}`} onClick={close}>
        <span className="contents__n">{c.n}</span>
        <span>{c.title}</span>
      </a>
    </li>
  );

  return (
    <>
      <div className="topbar" role="banner">
        <a className="topbar__title" href="#prologue">
          The Archaeology of Sports Scores
        </a>
        <button type="button" className="topbar__chapter" onClick={open} aria-haspopup="dialog">
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
          {readingTime && (
            <p className="contents__time mono">
              About {readingTime.total} minutes of reading, plus the interactives and films.
            </p>
          )}
          <ol className="contents__list">
            {CHAPTERS.filter((c) => !c.part && c.id !== "sources").map(item)}
            {PARTS.map((p) => (
              <li key={p.id} className="contents__part">
                <p className="contents__part-head mono">
                  <span>
                    Part {p.n} · {p.title}
                  </span>
                  {readingTime && <span className="contents__part-time">{readingTime[p.id]} min</span>}
                </p>
                <ol className="contents__list">{CHAPTERS.filter((c) => c.part === p.id).map(item)}</ol>
              </li>
            ))}
            {CHAPTERS.filter((c) => c.id === "sources").map(item)}
          </ol>
        </div>
      </dialog>
    </>
  );
}
