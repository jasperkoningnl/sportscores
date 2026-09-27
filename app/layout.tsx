import type { Metadata, Viewport } from "next";

import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/big-shoulders-display/wght";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-600.css";
import "@fontsource/im-fell-english/latin-400.css";
import "@fontsource/im-fell-english/latin-400-italic.css";
import "@fontsource/homemade-apple/latin-400.css";

import { SITE_URL } from "@/lib/share";

import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/opening.css";
import "./styles/exhibits.css";
import "./styles/boards.css";
import "./styles/closing.css";
import "./styles/wayfinding.css";
import "./styles/sidepages.css";
import "./styles/quiz.css";

const title = "The Archaeology of Sports Scores";
const description =
  "An interactive visual essay on how sports learned to keep score: from notches in a stick and Roman lap-counting dolphins to tie-breaks, shot clocks, score bugs and expected goals.";


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  // The share image itself is app/opengraph-image.png (made from docs/og-image.html).
  openGraph: {
    type: "article",
    title,
    description,
    siteName: title,
    url: "/",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ecefe7" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1712" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
