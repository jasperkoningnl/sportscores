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

import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/opening.css";
import "./styles/exhibits.css";
import "./styles/boards.css";
import "./styles/closing.css";

export const metadata: Metadata = {
  title: "The Archaeology of Sports Scores",
  description:
    "An interactive visual essay on how sports learned to keep score: from notches in a stick and Roman lap-counting dolphins to tie-breaks, shot clocks, score bugs and expected goals.",
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
