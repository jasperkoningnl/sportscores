/**
 * An embedded YouTube clip. It loads through youtube-nocookie.com, only when
 * scrolled near (loading="lazy"), and always offers a plain link as fallback
 * in case the video is removed or can no longer be embedded.
 */
export function VideoEmbed({
  id,
  title,
  start,
}: {
  id: string;
  title: string;
  start?: number;
}) {
  const params = new URLSearchParams({ rel: "0" });
  if (start) params.set("start", String(start));
  const watch = `https://www.youtube.com/watch?v=${id}${start ? `&t=${start}s` : ""}`;

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

  return (
    <div className="video">
      <div className="video__frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <a className="video__link mono" href={watch} target="_blank" rel="noreferrer">
        Watch on YouTube ↗
      </a>
    </div>
  );
}
