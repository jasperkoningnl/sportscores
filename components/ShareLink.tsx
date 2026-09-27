"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Copies a link straight to one chapter (…/#ch-05). The address bar is updated
 * too, so the link can still be copied by hand where the clipboard is blocked.
 */
export default function ShareLink({ id, label }: { id: string; label: string }) {
  const [state, setState] = useState<"idle" | "copied" | "manual">("idle");
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    window.history.replaceState(null, "", `#${id}`);
    try {
      await navigator.clipboard.writeText(url);
      setState("copied");
    } catch {
      setState("manual");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2500);
  };

  const text = state === "copied" ? "Link copied" : state === "manual" ? "Link is in the address bar" : "Copy link";

  return (
    <>
      <button type="button" className="chapter-card__share mono" onClick={copy}>
        {text}
        {state === "idle" && <span className="visually-hidden"> to {label}</span>}
      </button>
      <span className="visually-hidden" role="status">
        {state === "copied" ? `Link to ${label} copied.` : state === "manual" ? "The link is in the address bar." : ""}
      </span>
    </>
  );
}
