import type { ReactNode } from "react";
import { Chapter, Cite, Prose } from "@/components/ui";

const CASES: { sport: string; title: string; show: ReactNode; text: ReactNode }[] = [
  {
    sport: "Ice hockey · NHL",
    title: "The goal nobody scored",
    show: (
      <>
        <span className="num">3–2</span>
        <span className="odd__tag mono">SO</span>
      </>
    ),
    text: (
      <>
        Since 2005–06, NHL regular-season games still level after overtime go to a shootout. However many shootout
        attempts go in, the winners are given exactly one extra goal in the final score. No player is credited with it.
        <Cite id="nhl-rules" />
      </>
    ),
  },
  {
    sport: "Pickleball",
    title: "A score with three numbers",
    show: <span className="num">0–0–2</span>,
    text: (
      <>
        In doubles, the server calls the serving side’s score, the receiving side’s score, and whether they are the first
        or second server. Games begin at 0–0–2, because the side that serves first gets only one server on its opening
        turn.
        <Cite id="usap-scoring" />
      </>
    ),
  },
  {
    sport: "Cornhole",
    title: "Only the difference counts",
    show: <span className="num">7 − 5 = 2</span>,
    text: (
      <>
        A bag in the hole scores 3, a bag on the board 1. After each round the two sides’ points cancel: score 7 against 5
        and only the difference, 2, goes on the board.
        <Cite id="acl-rules" />
      </>
    ),
  },
  {
    sport: "Shuffleboard",
    title: "Negative territory",
    show: <span className="num">10 OFF</span>,
    text: (
      <>
        On a deck shuffleboard court, the scoring triangle has zones worth 10, 8 and 7, and behind them a zone marked
        “10 off” that subtracts ten. Knocking an opponent’s disc into it is a tactic.
        <Cite id="shuffleboard" />
      </>
    ),
  },
  {
    sport: "Sailing",
    title: "One point for winning",
    show: <span className="num">1</span>,
    text: (
      <>
        Under the standard low-point system, each boat scores its finishing place: one point for first, two for second.
        Over a series, the lowest total wins.
        <Cite id="ws-appendix-a" />
      </>
    ),
  },
  {
    sport: "Roller derby",
    title: "Opponents are the points",
    show: <span className="num">+1 +1 +1 +1</span>,
    text: (
      <>
        A jammer scores by skating past opposing players: after the first trip through the pack, each opponent passed on a
        scoring pass is worth a point. The other team’s bodies are the scoring opportunities.
        <Cite id="wftda-rules" />
      </>
    ),
  },
  {
    sport: "Kabaddi",
    title: "Points that bring players back",
    show: (
      <>
        <span className="num">+1</span>
        <span className="odd__tag mono">revive</span>
      </>
    ),
    text: (
      <>
        When a side scores a touch or tackle point, one of its eliminated players returns to the mat. Bonus points don’t
        revive anyone. Here the score changes how many people are playing.
        <Cite id="pkl-kabaddi" />
      </>
    ),
  },
];

export default function Ch11Oddities() {
  return (
    <Chapter
      id="ch-11"
      number={11}
      title="Strange but useful"
      dek="A small cabinet of curiosities. Each one solves a real problem."
    >
      <Prose>
        <p>
          Scoring systems look arbitrary from the outside. Up close, most of the odd ones are clever fixes: for fairness at
          the start of a game, for keeping a contest close, for giving a result to a game that would otherwise end level.
        </p>
      </Prose>
      <ol className="odd">
        {CASES.map((c, i) => (
          <li key={c.title} className="odd__item">
            <div className="odd__show" aria-hidden="true">
              {c.show}
            </div>
            <div className="odd__text">
              <p className="odd__meta mono">
                <span className="odd__no">11.{i + 1}</span> {c.sport}
              </p>
              <h3 className="odd__title">{c.title}</h3>
              <p>{c.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Chapter>
  );
}
