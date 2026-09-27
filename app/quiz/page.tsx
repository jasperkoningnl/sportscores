import type { Metadata } from "next";
import Link from "next/link";
import Quiz from "@/components/Quiz";

const title = "Read the scoreboard · The Archaeology of Sports Scores";
// A page's own openGraph replaces the root one, so the share image is named again here.
const image = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "The Archaeology of Sports Scores: a scoreboard with the plates 30 – 0, labelled thirty–love.",
};
const description =
  "Ten scores from ten sports. What do 10.6 (66), 0–0–2 and 247/6 mean? A quiz that goes with the interactive essay The Archaeology of Sports Scores.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/quiz" },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/quiz",
    siteName: "The Archaeology of Sports Scores",
    locale: "en_GB",
    images: [image],
  },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

export default function QuizPage() {
  return (
    <main className="quiz-page">
      <header className="quiz-page__head">
        <Link className="quiz-page__back mono" href="/">
          <span aria-hidden="true">←</span> The Archaeology of Sports Scores
        </Link>
        <p className="kicker">A quiz</p>
        <h1 className="quiz-page__title">Read the scoreboard</h1>
        <p className="quiz-page__lead">
          Ten scores from ten sports. You play against the scoreboard: a right answer is a point to you, a wrong one a point
          to the board. Every answer comes with the essay’s explanation and a link to where it shows it.
        </p>
      </header>
      <Quiz />
    </main>
  );
}
