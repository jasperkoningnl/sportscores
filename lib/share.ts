import type { Metadata } from "next";

// Link previews need absolute URLs. The public production address is the
// default; set NEXT_PUBLIC_SITE_URL when the essay is hosted somewhere else.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sportscores-history.vercel.app";

/**
 * The share image and site name for the side pages (quiz, timeline, poster).
 * A page's own openGraph replaces the root one, so they name them again.
 */
const image = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "The Archaeology of Sports Scores: a scoreboard with the plates 30 – 0, labelled thirty–love.",
};

export const shareImage: { openGraph: NonNullable<Metadata["openGraph"]>; twitter: NonNullable<Metadata["twitter"]> } = {
  openGraph: { type: "website", siteName: "The Archaeology of Sports Scores", locale: "en_GB", images: [image] },
  twitter: { card: "summary_large_image", images: [image] },
};
