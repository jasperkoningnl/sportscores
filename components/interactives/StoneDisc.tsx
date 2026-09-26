"use client";

import { useState } from "react";

/** A schematic stone disc. It deliberately shows no glyphs or figures. */
export function StoneDisc() {
  return (
    <svg className="stone" viewBox="0 0 320 320" role="img" aria-label="Schematic drawing of a round stone ballgame marker. The carved text band and central scene are left blank on purpose.">
      <defs>
        <filter id="stone-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" result="noise" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.35" />
          </feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <pattern id="glyph-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="var(--stone-ink)" strokeOpacity="0.35" strokeWidth="1.5" />
        </pattern>
        <radialGradient id="stone-shade" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#a39d8e" />
          <stop offset="1" stopColor="#6f6a5e" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="160" r="150" fill="url(#stone-shade)" />
      <circle cx="160" cy="160" r="150" fill="#000" filter="url(#stone-grain)" />
      <circle cx="160" cy="160" r="150" fill="none" stroke="#4d493f" strokeWidth="3" />
      {/* text band */}
      <circle cx="160" cy="160" r="126" fill="none" stroke="url(#glyph-hatch)" strokeWidth="30" />
      <circle cx="160" cy="160" r="141" fill="none" stroke="#4d493f" strokeWidth="1.5" />
      <circle cx="160" cy="160" r="111" fill="none" stroke="#4d493f" strokeWidth="1.5" />
      {/* central field */}
      <circle cx="160" cy="160" r="104" fill="#8f897a" opacity="0.5" />
      <text x="160" y="152" textAnchor="middle" className="stone__note">
        central scene
      </text>
      <text x="160" y="172" textAnchor="middle" className="stone__note">
        not reproduced
      </text>
      {/* a chip out of the rim */}
      <path d="M268 64 L292 88 L280 60 Z" fill="var(--paper-2)" />
    </svg>
  );
}

/** The ‘urra’ swing, as the FIFA Museum describes it from the living game of ulama. */
export function UrraSwing() {
  const [played, setPlayed] = useState(false);
  const a = played ? 0 : 3;
  const b = played ? 2 : 1;
  return (
    <div className="urra">
      <div className="urra__board" aria-hidden="true">
        <div className="urra__side">
          <span className="urra__team mono">Side A</span>
          <span className={`urra__score num${played ? " is-changed" : ""}`}>{a}</span>
        </div>
        <span className="urra__dash num">–</span>
        <div className="urra__side">
          <span className="urra__team mono">Side B</span>
          <span className={`urra__score num${played ? " is-changed" : ""}`}>{b}</span>
        </div>
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn--solid" onClick={() => setPlayed(true)} disabled={played}>
          A loses the urra point
        </button>
        <button type="button" className="btn btn--small" onClick={() => setPlayed(false)} disabled={!played}>
          Back to 3–1
        </button>
      </div>
      <p className="live" aria-live="polite">
        {played
          ? "Side A’s three points vanish and Side B gains one: 3–1 has become 0–2."
          : "Side A leads 3–1. An urra is being contested."}
      </p>
    </div>
  );
}
