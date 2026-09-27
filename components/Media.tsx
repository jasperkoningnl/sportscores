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

// The YouTube player is a client component (it waits for a click); it is
// re-exported here so chapters keep importing all media from one place.
export { default as VideoEmbed } from "@/components/VideoEmbed";
