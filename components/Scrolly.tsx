"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useActiveStep, useMediaQuery, useReducedMotion } from "@/lib/hooks";

export type Scene = (active: boolean, progress: number) => ReactNode;

/**
 * A sticky "stage" that swaps scenes as the reader scrolls past text steps.
 * Every step's text is ordinary document flow, so the page reads fine without
 * JavaScript or with the stage hidden; the stage only illustrates.
 *
 * Steps listed in `autoplay` play a short animation when they become active:
 * the scene receives a progress value that runs from 0 to 1 over the given
 * number of milliseconds (or jumps to 1 when the reader prefers reduced motion).
 */
export default function Scrolly({
  scenes,
  steps,
  autoplay = {},
  className = "",
  stageLabel,
}: {
  scenes: Scene[];
  steps: ReactNode[];
  autoplay?: Record<number, number>;
  className?: string;
  stageLabel: string;
}) {
  // On narrow screens the stage sits above the text, so a step becomes active
  // when it reaches the reading area below the stage rather than mid-screen.
  const narrow = useMediaQuery("(max-width: 899px)");
  const reduced = useReducedMotion();
  const { active, setRef } = useActiveStep(steps.length, narrow ? "-62% 0px -26% 0px" : "-45% 0px -45% 0px");
  const sceneIndex = Math.min(active, scenes.length - 1);
  const [progress, setProgress] = useState(1);
  const duration = autoplay[sceneIndex];

  useEffect(() => {
    if (duration === undefined || reduced) {
      setProgress(1);
      return;
    }
    setProgress(0);
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [sceneIndex, duration, reduced]);

  return (
    <div className={`scrolly ${className}`}>
      <div className="scrolly__stage" role="img" aria-label={stageLabel}>
        {scenes.map((render, i) => (
          <div key={i} className={`scrolly__scene${i === sceneIndex ? " is-active" : ""}`} aria-hidden="true">
            {render(i === sceneIndex, i === sceneIndex ? progress : 0)}
          </div>
        ))}
      </div>
      <div className="scrolly__steps">
        {steps.map((content, i) => (
          <div key={i} className="scrolly__step" data-step={i} ref={setRef(i)}>
            <div className="scrolly__card">{content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
