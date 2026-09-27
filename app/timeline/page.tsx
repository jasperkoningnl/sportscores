import type { Metadata } from "next";
import SideNav from "@/components/SideNav";
import Timeline from "@/components/Timeline";
import { EVENTS } from "@/lib/events";
import { shareImage } from "@/lib/share";

const title = "Timeline · The Archaeology of Sports Scores";
const description =
  "Every date the essay tells, from Roman lap counters in 174 BC to quadball’s proposed rule change in 2026, each with its sources.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/timeline" },
  openGraph: { ...shareImage.openGraph, title, description, url: "/timeline" },
  twitter: { ...shareImage.twitter, title, description },
};

export default function TimelinePage() {
  return (
    <main className="side-page side-page--wide">
      <header className="side-page__head">
        <SideNav current="/timeline" />
        <p className="kicker">Timeline</p>
        <h1 className="side-page__title">Twenty-two centuries of keeping score</h1>
        <p className="side-page__lead">
          Every date the essay tells, in order: {EVENTS.length} moments, from the eggs on a Roman lap counter to
          quadball’s proposed rule change. Each one links to the place in the essay that tells it, with its sources.
        </p>
      </header>
      <Timeline />
    </main>
  );
}
