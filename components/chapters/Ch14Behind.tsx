import { Chapter, Cite, Exhibit, Prose, PullLine } from "@/components/ui";
import { EloCalc, XgReplay } from "@/components/interactives/BehindScore";

export default function Ch14Behind() {
  return (
    <Chapter
      id="score-behind-the-score"
      number={14}
      title="The score behind the score"
      dek="The official result is no longer the last word. Now we keep score of the score."
    >
      <Prose>
        <p className="lede">
          A 1–0 win says who scored more goals. It does not say who played better, who was lucky, or who would win if the
          match were played again tomorrow. For most of history that was simply accepted. Today a second layer of numbers
          sits under almost every result.
        </p>
        <p>
          In football it is <em>expected goals</em>, or xG: every shot is given a probability of becoming a goal, based on
          thousands of similar shots, and the probabilities are added up. The idea is older, but it spread widely after
          2012, when Sam Green of the data company Opta published an influential explanation.
          <Cite id="opta-xg" />
        </p>
      </Prose>

      <Exhibit
        id="xg-replay"
        title="A 1–0 that might have been something else"
        status="Invented match"
        surface="paper"
        instructions="Replay the same shots thousands of times and see how often the actual winner wins."
      >
        <XgReplay />
      </Exhibit>

      <Prose>
        <p>
          Other sports have their own shadow scores. Baseball’s WAR, wins above replacement, estimates how many extra wins
          a player is worth compared with the kind of player a team could sign at short notice.
          <Cite id="fangraphs-war" /> Basketball analysts talk in points per possession and the expected value of each
          shot: the same arithmetic that makes the three-pointer of chapter 10 so attractive.
        </p>
        <p>
          And then there are ratings, which score teams rather than games. The Elo system, devised by Arpad Elo and
          adopted by the United States Chess Federation in 1960 and by FIDE in 1970, turns every result into a small
          exchange of points between the two sides, weighted by how surprising it was.
          <Cite id="fide-elo" /> It has since been adapted to international football.
          <Cite id="wiki-football-elo" />
        </p>
      </Prose>

      <Exhibit
        id="elo"
        title="An Elo update"
        surface="paper"
        instructions="Set two ratings and a result."
      >
        <EloCalc />
      </Exhibit>

      <Prose>
        <p>
          That leaves us somewhere strange. We invented scores to describe games. Then we made scores that designed the
          games. And now we invent new scores to judge whether the old scores told the truth.
        </p>
      </Prose>

      <PullLine>First we invented scores to describe games. Now we invent new scores to explain the scores.</PullLine>
    </Chapter>
  );
}
