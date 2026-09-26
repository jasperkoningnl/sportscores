"use client";

import type { ReactNode } from "react";
import { useActiveStep, useMediaQuery } from "@/lib/hooks";

/**
 * A sticky "stage" that swaps scenes as the reader scrolls past text steps.
 * Every step's text is ordinary document flow, so the page reads fine without
 * JavaScript or with the stage hidden; the stage only illustrates.
 */
export default function Scrolly({
  scenes,
  steps,
  className = "",
  stageLabel,
}: {
  scenes: ((active: boolean) => ReactNode)[];
  steps: ReactNode[];
  className?: string;
  stageLabel: string;
}) {
  // On narrow screens the stage sits above the text, so a step becomes active
  // when it reaches the reading area below the stage rather than mid-screen.
  const narrow = useMediaQuery("(max-width: 899px)");
  const { active, setRef } = useActiveStep(steps.length, narrow ? "-62% 0px -26% 0px" : "-45% 0px -45% 0px");
  const sceneIndex = Math.min(active, scenes.length - 1);

  return (
    <div className={`scrolly ${className}`}>
      <div className="scrolly__stage" role="img" aria-label={stageLabel}>
        {scenes.map((render, i) => (
          <div key={i} className={`scrolly__scene${i === sceneIndex ? " is-active" : ""}`} aria-hidden="true">
            {render(i === sceneIndex)}
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
