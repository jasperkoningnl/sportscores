import { Chapter, Cite, Exhibit, Prose } from "@/components/ui";
import ScoreBug from "@/components/interactives/ScoreBug";

export default function Ch09Bug() {
  return (
    <Chapter
      id="score-on-television"
      number={9}
      title="The score moves onto television"
      dek="For decades, a viewer who tuned in late had to wait to find out the score."
    >
      <Prose>
        <p className="lede">
          Early television borrowed the stadium’s scoreboard. If the camera happened to point at it, you knew the score;
          otherwise you waited for the commentator, or for a caption that appeared now and then and vanished again.
        </p>
        <p>
          In August 1992, Sky Sports launched its coverage of the new Premier League with a small graphic that never went
          away: the score and the match clock, in the corner of the screen, for the whole game. It was the idea of Sky’s
          head of sport, David Hill, who was tired of tuning into matches without knowing the score. His boss reportedly
          called it the stupidest thing he had ever seen. Within about a year, the other British broadcasters had copied it.
          <Cite id={["wiki-scorebug", "wiki-supersunday"]} />
        </p>
        <p>
          Hill then moved to Fox in the United States, where the “Fox Box” arrived with its first season of NFL coverage in
          1994, to the scorn of some critics.
          <Cite id="forbes-foxbox" /> Today a live sports broadcast without a permanent score graphic looks broken.
        </p>
      </Prose>

      <Exhibit
        id="score-bug"
        title="From the stadium board to the score bug"
        status="Schematic broadcast frames"
        surface="plain"
        instructions="Drag the slider through four stages. In the last one, change the count, the outs and the runners."
      >
        <ScoreBug />
      </Exhibit>

      <Prose>
        <p>
          Baseball shows how far the compression has gone. The modern graphic fits the inning, the score, the count of
          balls and strikes, the number of outs and the occupied bases, often with a pitch count too, into a strip smaller
          than a postage stamp on a phone.
          <Cite id="wiki-scorebug" /> It is the old line score from chapter 8, redrawn for a glance instead of a stare.
        </p>
      </Prose>
    </Chapter>
  );
}
