import { Certainty, Chapter, Cite, Exhibit, Prose, PullLine } from "@/components/ui";
import Quadball from "@/components/interactives/Quadball";

export default function Ch13Quadball() {
  return (
    <Chapter
      id="scoreboard-changes-rules"
      number={13}
      title="When the scoreboard changes the rules"
      dek="For most of history the game told the scoreboard what to show. Occasionally the scoreboard answers back."
    >
      <Prose>
        <p className="lede">
          Quadball, the sport once called quidditch, scores a goal as 10 points and a catch of the flag, which ends the
          game, as 30. Every score therefore ends in a zero.
        </p>
        <p>
          In 2026 the International Quadball Association asked its community about a tidier idea: make a goal worth 1 and
          the flag catch worth 3. The reasoning, in the rules team’s own words: “the 0 bears no additional information but
          leads to our sport needing scoreboards with an extra digit.”
          <Cite id="iqa-consult" /> <Certainty level="proposal" />
        </p>
        <p>
          The change did not make it into the 2026 rulebook. The IQA said the scoring change would be looked at again for
          the following year’s edition.
          <Cite id="iqa-2026" /> Whether or not it ever passes, the argument itself is the point.
        </p>
      </Prose>

      <Exhibit
        id="quadball-board"
        title="Same game, one digit fewer"
        status="Illustrative scores"
        surface="board"
        instructions="Switch between the current and the proposed values, then score some goals."
      >
        <Quadball />
      </Exhibit>

      <Prose>
        <p>
          Nothing about the play would change. Nobody would run faster or throw differently. The only thing that moves is
          the display, and yet it is a real rule change, argued over by a governing body, because a score is also a
          physical and verbal object: it has to fit on a board and be easy to shout.
        </p>
      </Prose>

      <PullLine>The game used to determine the scoreboard. Now the scoreboard can influence the game.</PullLine>
    </Chapter>
  );
}
