import type { Metadata } from "next";
import SideNav from "@/components/SideNav";
import Quiz from "@/components/Quiz";
import { shareImage } from "@/lib/share";

const title = "Read the scoreboard · The Archaeology of Sports Scores";
const description =
  "Ten scores from ten sports. What do 10.6 (66), 0–0–2 and 247/6 mean? A quiz that goes with the interactive essay The Archaeology of Sports Scores.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/quiz" },
  openGraph: { ...shareImage.openGraph, title, description, url: "/quiz" },
  twitter: { ...shareImage.twitter, title, description },
};

export default function QuizPage() {
  return (
    <main className="side-page">
      <header className="side-page__head">
        <SideNav current="/quiz" />
        <p className="kicker">A quiz</p>
        <h1 className="side-page__title">Read the scoreboard</h1>
        <p className="side-page__lead">
          Ten scores from ten sports. You play against the scoreboard: a right answer is a point to you, a wrong one a point
          to the board. Every answer comes with the essay’s explanation and a link to where it shows it.
        </p>
      </header>
      <Quiz />
    </main>
  );
}
