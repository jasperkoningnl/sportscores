"use client";

import { useEffect, useRef, useState } from "react";

/**
 * An embedded YouTube clip that loads nothing from YouTube until the reader
 * presses play: until then it is a plain card drawn by the page itself (a
 * "facade"). The player then loads from youtube-nocookie.com and starts. A plain
 * link is always offered as well, in case the video is removed or can no longer
 * be embedded.
 */
export default function VideoEmbed({
  id,
  title,
  by,
  start,
}: {
  id: string;
  title: string;
  /** Who published the video, e.g. "Wimbledon". */
  by?: string;
  start?: number;
}) {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const watch = `https://www.youtube.com/watch?v=${id}${start ? `&t=${start}s` : ""}`;

  // Keep keyboard focus with the video once the card makes way for the player.
  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);

  // Some hosts (such as sandboxed previews) refuse third-party iframes.
  // Building with NEXT_PUBLIC_VIDEO_EMBED=link swaps the player for a link card.
  if (process.env.NEXT_PUBLIC_VIDEO_EMBED === "link") {
    return (
      <a className="video video--link" href={watch} target="_blank" rel="noreferrer">
        <span className="video__frame video__frame--card">
          <span className="video__play" aria-hidden="true" />
          <span className="video__card-title">{title}</span>
          <span className="video__card-note mono">Opens on YouTube ↗</span>
        </span>
      </a>
    );
  }

  const params = new URLSearchParams({ rel: "0", autoplay: "1" });
  if (start) params.set("start", String(start));

  return (
    <div className="video">
      {playing ? (
        <div className="video__frame">
          <iframe
            ref={frameRef}
            src={`https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          type="button"
          className="video__frame video__frame--card video__facade"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}${by ? `, published by ${by}` : ""}. Loads from YouTube.`}
        >
          <span className="video__play" aria-hidden="true" />
          <span className="video__card-title">{title}</span>
          <span className="video__card-note mono">
            {by ? `${by} · ` : ""}Plays from YouTube when you press play
          </span>
        </button>
      )}
      <a className="video__link mono" href={watch} target="_blank" rel="noreferrer">
        Watch on YouTube ↗
      </a>
    </div>
  );
}
