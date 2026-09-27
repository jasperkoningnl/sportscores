import type { Metadata } from "next";
import SideNav from "@/components/SideNav";
import Poster from "@/components/Poster";
import PrintButton from "@/components/PrintButton";
import { NOTATIONS } from "@/lib/notations";
import { SITE_URL, shareImage } from "@/lib/share";

const title = "Poster: ways to write a score · The Archaeology of Sports Scores";
const description = `${NOTATIONS.length} score notations from the essay on one sheet, grouped by what makes them strange. Prints on A2.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/poster" },
  openGraph: { ...shareImage.openGraph, title, description, url: "/poster" },
  twitter: { ...shareImage.twitter, title, description },
};

export default function PosterPage() {
  return (
    <main className="side-page side-page--poster">
      <div className="side-page__head side-page__head--tools">
        <SideNav current="/poster" />
        <div className="side-page__tools">
          <PrintButton>Print or save as PDF</PrintButton>
          <p className="side-page__tools-note mono">Laid out for A2 portrait. In the print dialog, turn on background graphics.</p>
        </div>
      </div>
      <Poster siteUrl={SITE_URL} />
    </main>
  );
}
