"use client";

import { useEffect, useRef, useState } from "react";
import { CHAPTERS, type ChapterMeta } from "@/lib/chapters";

/**
 * Remembers, in this browser only, how far the reader got, and on the next
 * visit offers to jump back there. Nothing is stored anywhere else. The offer
 * is not made when the page is opened on a link to a chapter (…/#ch-05), or
 * when the reader never got past the prologue or already reached the sources.
 */
const KEY = "archaeology-of-sports-scores:position";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 90;

type Saved = { id: string; f: number; t: number };

const read = (): Saved | null => {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Saved;
    return typeof s.id === "string" && typeof s.f === "number" && typeof s.t === "number" ? s : null;
  } catch {
    return null;
  }
};

const write = (s: Saved) => {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* storage blocked: nothing to remember */
  }
};

// The reading line sits 30% down the viewport, as in the top bar.
const readingLine = () => window.innerHeight * 0.3;

function currentPosition(): Saved | null {
  const line = window.scrollY + readingLine();
  let found: Saved | null = null;
  for (const c of CHAPTERS) {
    const el = document.getElementById(c.id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top > line) break;
    const f = Math.max(0, Math.min(1, (line - top) / Math.max(1, el.offsetHeight)));
    found = { id: c.id, f, t: Date.now() };
  }
  return found;
}

const labelOf = (c: ChapterMeta) =>
  /^\d+$/.test(c.n) ? `Chapter ${c.n} · ${c.title}` : c.id === "coda" ? `Coda · ${c.title}` : c.title;

export default function ResumeReading() {
  const [offer, setOffer] = useState<{ saved: Saved; chapter: ChapterMeta } | null>(null);
  const offering = useRef(false);

  useEffect(() => {
    const saved = read();
    const chapter = saved && CHAPTERS.find((c) => c.id === saved.id);
    if (
      saved &&
      chapter &&
      !window.location.hash &&
      Date.now() - saved.t < MAX_AGE_MS &&
      chapter.id !== "prologue" &&
      chapter.id !== "sources"
    ) {
      offering.current = true;
      setOffer({ saved, chapter });
    }

    let last = 0;
    let raf = 0;
    const save = () => {
      const pos = currentPosition();
      if (!pos) return;
      // While the offer is open, a reader still at the top must not overwrite the old position.
      if (offering.current) {
        if (pos.id === "prologue") return;
        offering.current = false;
        setOffer(null);
      }
      write(pos);
    };
    const onScroll = () => {
      const now = performance.now();
      if (now - last < 800) return;
      last = now;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(save);
    };
    const onHide = () => {
      if (document.visibilityState === "hidden" && !offering.current) save();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onHide);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, []);

  if (!offer) return null;

  const dismiss = () => {
    offering.current = false;
    setOffer(null);
  };

  return (
    <div className="resume" role="region" aria-label="Continue reading">
      <p className="resume__text">
        <span className="resume__kicker mono">Welcome back</span>
        {/* A real #link, so the stop at chapter cards stands aside for the jump (see StopAndGo). */}
        <a
          className="resume__go"
          href={`#${offer.chapter.id}`}
          onClick={(e) => {
            const el = document.getElementById(offer.chapter.id);
            if (!el) return;
            e.preventDefault();
            const top = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: Math.max(0, top + offer.saved.f * el.offsetHeight - readingLine()),
              behavior: "instant" as ScrollBehavior,
            });
            dismiss();
          }}
        >
          Continue at {labelOf(offer.chapter)} <span aria-hidden="true">↓</span>
        </a>
      </p>
      <button type="button" className="resume__close" onClick={dismiss} aria-label="No thanks, start from the top">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}
