import type { StaticImageData } from "next/image";

/** Who made a photograph, under which licence, and where the original lives. */
export type PhotoCredit = {
  author: string;
  /** e.g. "No known restrictions on publication", "CC0", "CC BY-SA 3.0" */
  licence: string;
  licenceUrl?: string;
  /** Collection or site that holds the original, e.g. "Library of Congress" */
  source: string;
  /** The file or catalogue page, never the bare image URL */
  sourceUrl: string;
  /** What we changed, e.g. "cropped" (required by CC BY and CC BY-SA) */
  changes?: string;
};

/**
 * An archival or free-licensed photograph, hosted in the repo. Images are
 * imported statically (from /media) so the build adds any basePath and a
 * content hash. The credit line sits under the image, not only in the source
 * list; pass `credit={null}` only for a detail of a photo credited next to it.
 */
export function Photo({
  image,
  alt,
  credit,
  className = "",
}: {
  image: StaticImageData;
  alt: string;
  credit: PhotoCredit | null;
  className?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <img
        className="photo__img"
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
      {credit && (
        <p className="photo__credit mono">
          {credit.author} ·{" "}
          <a href={credit.sourceUrl} target="_blank" rel="noreferrer">
            {credit.source}
          </a>{" "}
          ·{" "}
          {credit.licenceUrl ? (
            <a href={credit.licenceUrl} target="_blank" rel="noreferrer license">
              {credit.licence}
            </a>
          ) : (
            credit.licence
          )}
          {credit.changes ? ` · ${credit.changes}` : ""}
        </p>
      )}
    </div>
  );
}

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
