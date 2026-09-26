"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** True when the reader has asked the OS for reduced motion. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** True while the media query matches. */
export function useMediaQuery(query: string): boolean {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
}

/**
 * Scrollytelling: returns the index of the step whose element currently sits
 * in the middle band of the viewport, plus a ref-setter for each step.
 */
export function useActiveStep(count: number, rootMargin = "-45% 0px -45% 0px") {
  const [active, setActive] = useState(0);
  const nodes = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const els = nodes.current.slice(0, count).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.step);
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      { rootMargin, threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [count, rootMargin]);

  const setRef = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      nodes.current[i] = el;
    },
    []
  );

  return { active, setRef };
}

/** Fires once when the element first scrolls into view. */
export function useInViewOnce<T extends HTMLElement>(margin = "0px 0px -20% 0px") {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, seen]);
  return { ref, seen };
}

/** Tracks an element's content width, for charts drawn at real pixel size. */
export function useElementWidth<T extends HTMLElement>(fallback: number) {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width };
}

/** A small deterministic PRNG so simulations are reproducible per seed. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
