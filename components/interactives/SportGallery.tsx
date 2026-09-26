"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  AflSpecimen,
  BaseballSpecimen,
  BowlingSpecimen,
  CricketSpecimen,
  DartsSpecimen,
  GaelicSpecimen,
  GolfSpecimen,
  RugbySpecimen,
  TennisSpecimen,
} from "./Specimens";

export type GalleryItem = {
  key: string;
  sport: string;
  sample: string;
  headline: string;
  body: ReactNode;
};

const COMPONENTS: Record<string, () => ReactNode> = {
  tennis: () => <TennisSpecimen />,
  cricket: () => <CricketSpecimen />,
  golf: () => <GolfSpecimen />,
  darts: () => <DartsSpecimen />,
  bowling: () => <BowlingSpecimen />,
  rugby: () => <RugbySpecimen />,
  afl: () => <AflSpecimen />,
  gaelic: () => <GaelicSpecimen />,
  baseball: () => <BaseballSpecimen />,
};

export default function SportGallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const n = (i + items.length) % items.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  const item = items[active];

  return (
    <div className="gallery">
      <div
        className="gallery__tabs"
        role="tablist"
        aria-label="Sports and their score displays"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            focusTab(active + 1);
          } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            focusTab(active - 1);
          } else if (e.key === "Home") {
            e.preventDefault();
            focusTab(0);
          } else if (e.key === "End") {
            e.preventDefault();
            focusTab(items.length - 1);
          }
        }}
      >
        {items.map((it, i) => (
          <button
            key={it.key}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`gal-tab-${it.key}`}
            aria-controls={`gal-panel-${it.key}`}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            className={`gallery__tab${i === active ? " is-on" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="gallery__sample num">{it.sample}</span>
            <span className="gallery__sport mono">{it.sport}</span>
          </button>
        ))}
      </div>

      <div
        className="gallery__panel"
        role="tabpanel"
        id={`gal-panel-${item.key}`}
        aria-labelledby={`gal-tab-${item.key}`}
        key={item.key}
      >
        <div className="gallery__display">{COMPONENTS[item.key]()}</div>
        <div className="gallery__text">
          <p className="kicker">{item.sport}</p>
          <h3 className="gallery__headline">{item.headline}</h3>
          <div className="gallery__body">{item.body}</div>
        </div>
      </div>
    </div>
  );
}
