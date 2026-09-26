"use client";

import { useEffect, useRef, useState } from "react";
import { CHAPTERS } from "@/lib/chapters";

export default function TopBar() {
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
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
  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

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
          <ol className="contents__list">
            {CHAPTERS.map((c, i) => (
              <li key={c.id} className={i === current ? "is-current" : undefined}>
                <a href={`#${c.id}`} onClick={close}>
                  <span className="contents__n">{c.n}</span>
                  <span>{c.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </dialog>
    </>
  );
}
