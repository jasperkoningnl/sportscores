"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useActiveStep, useMediaQuery } from "@/lib/hooks";

export type Scene = (active: boolean, progress: number) => ReactNode;

/**
 * A sticky "stage" that swaps scenes as the reader scrolls past text steps.
 * Every step's text is ordinary document flow, so the page reads fine without
 * JavaScript or with the stage hidden; the stage only illustrates.
 *
 * Steps listed in `holds` are "hang" moments: the step is stretched by that
 * many viewport heights, its text card stays put, a gentle scroll-snap point
 * marks its start, and the scene receives a 0–1 progress value so its
 * animation is played by the reader's own scrolling.
 */
export default function Scrolly({
  scenes,
  steps,
  holds = {},
  className = "",
  stageLabel,
}: {
  scenes: Scene[];
  steps: ReactNode[];
  holds?: Record<number, number>;
  className?: string;
  stageLabel: string;
}) {
  // On narrow screens the stage sits above the text, so a step becomes active
  // when it reaches the reading area below the stage rather than mid-screen.
  const narrow = useMediaQuery("(max-width: 899px)");
  const { active, setRef } = useActiveStep(steps.length, narrow ? "-62% 0px -26% 0px" : "-45% 0px -45% 0px");
  const sceneIndex = Math.min(active, scenes.length - 1);
  const stepEls = useRef<(HTMLElement | null)[]>([]);
  const [progress, setProgress] = useState(0);

  const isHold = holds[active] !== undefined;

  useEffect(() => {
    if (!isHold) {
      setProgress(0);
      return;
    }
    let raf = 0;
    const measure = () => {
      const el = stepEls.current[active];
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // The card sticks near the top of the step; the hold runs from the
      // moment the step reaches the top of the viewport until its card is
      // about to be pushed out by the next step.
      const start = r.top - vh * 0.08;
      const span = r.height - vh * (narrow ? 0.95 : 0.85);
      const p = span > 0 ? -start / span : 1;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [active, isHold, narrow]);

  return (
    <div className={`scrolly ${className}`}>
      <div className="scrolly__stage" role="img" aria-label={stageLabel}>
        {scenes.map((render, i) => (
          <div key={i} className={`scrolly__scene${i === sceneIndex ? " is-active" : ""}`} aria-hidden="true">
            {render(i === sceneIndex, i === sceneIndex ? (holds[i] !== undefined ? progress : 1) : 0)}
          </div>
        ))}
      </div>
      <div className="scrolly__steps">
        {steps.map((content, i) => {
          const hold = holds[i];
          return (
            <div
              key={i}
              className={`scrolly__step${hold !== undefined ? " scrolly__step--hold" : ""}`}
              style={hold !== undefined ? ({ "--hold": hold } as React.CSSProperties) : undefined}
              data-step={i}
              ref={(el) => {
                setRef(i)(el);
                stepEls.current[i] = el;
              }}
            >
              <div className="scrolly__card">
                {content}
                {hold !== undefined && (
                  <div className="scrolly__hold" aria-hidden="true">
                    <span className="scrolly__hold-label mono">{i === active && progress >= 1 ? "Keep going ↓" : "Scroll to play"}</span>
                    <span className="scrolly__hold-bar">
                      <span style={{ transform: `scaleX(${i === active ? progress : 0})` }} />
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
