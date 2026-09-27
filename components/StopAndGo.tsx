"use client";

import { useEffect } from "react";

/**
 * "Stop and go" at chapter title cards ([data-stop]).
 *
 * When the reader scrolls down past the top of a title card (by wheel,
 * touch or keyboard), the page settles on the card and ignores further
 * downward wheel and touch scrolling for a moment, then carries on as
 * normal. Scrolling up, links inside the page (such as the contents) and
 * dragging the scrollbar are never stopped. Cards also get an `is-in`
 * class when they arrive, which plays their short entrance animation.
 */
const PAUSE_MS = 550;
const INPUT_WINDOW_MS = 700;

export default function StopAndGo() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-stop]"));
    if (!cards.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) e.target.classList.add("is-in");
      },
      { threshold: 0.5 }
    );
    cards.forEach((c) => io.observe(c));

    const barHeight = () => {
      const bar = document.querySelector<HTMLElement>(".topbar");
      return bar ? bar.getBoundingClientRect().height : 0;
    };
    const topOf = (c: HTMLElement) => c.getBoundingClientRect().top + window.scrollY - barHeight();

    let lastY = window.scrollY;
    let pausedUntil = 0;
    let suspendedUntil = performance.now() + 1500; // let a #hash on load settle first
    let lastInput = 0;
    let holdAt: number | null = null;
    const stopped = new Set<HTMLElement>();

    const noteInput = () => {
      lastInput = performance.now();
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "End"].includes(e.key)) noteInput();
    };

    const onScroll = () => {
      const y = window.scrollY;
      const now = performance.now();
      // During the pause, hold the card in place against any drift downward
      // (keyboard smooth scrolling, touch momentum).
      if (holdAt !== null && now < pausedUntil) {
        if (y > holdAt + 1) window.scrollTo({ top: holdAt, behavior: "instant" as ScrollBehavior });
        lastY = Math.min(y, holdAt);
        return;
      }
      holdAt = null;
      const userDriven = now - lastInput < INPUT_WINDOW_MS;
      if (now < suspendedUntil || !userDriven) {
        lastY = y;
        return;
      }
      if (y > lastY) {
        for (const c of cards) {
          if (stopped.has(c)) continue;
          const t = topOf(c);
          if (lastY < t - 1 && y >= t - 1) {
            stopped.add(c);
            pausedUntil = now + PAUSE_MS;
            holdAt = t;
            if (Math.abs(y - t) > 1) window.scrollTo({ top: t, behavior: "instant" as ScrollBehavior });
            lastY = t;
            return;
          }
        }
      } else {
        // Going back up above a card re-arms it for the next pass.
        for (const c of stopped) if (y < topOf(c) - window.innerHeight * 0.5) stopped.delete(c);
      }
      lastY = y;
    };

    const swallow = (e: Event) => {
      if (performance.now() < pausedUntil) {
        if (e instanceof WheelEvent && e.deltaY <= 0) return;
        e.preventDefault();
      }
    };
    const onWheel = (e: WheelEvent) => {
      noteInput();
      swallow(e);
    };
    const onTouchMove = (e: TouchEvent) => {
      noteInput();
      swallow(e);
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (a) suspendedUntil = performance.now() + 2500;
    };
    const onHash = () => {
      suspendedUntil = performance.now() + 2500;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchstart", noteInput, { passive: true });
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHash);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", noteInput);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return null;
}
