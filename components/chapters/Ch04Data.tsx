import { Chapter, Cite, Exhibit, Prose } from "@/components/ui";
import ScoreArchive from "@/components/interactives/ScoreArchive";

export default function Ch04Data() {
  return (
    <Chapter
      id="ch-04"
      number={4}
      title="When the match becomes data"
      dek="A notch remembers a total. A scorecard remembers a match."
    >
      <Prose>
        <p className="lede">
          In the summer of 1744, cricket produced two documents that changed what a score could be. The older, for Slindon
          against London at the Artillery Ground on 2 June, survives among the Duke of Richmond’s papers and records,
          among other things, that John Harris made 47. A fortnight later, Kent played All England on the same ground,
          and that scorecard goes further: it is the earliest known to record how batsmen were dismissed.
          <Cite id={["wiki-1744", "earlycricket-slindon"]} />
        </p>
        <p>
          It is not important whether these were the first scorecards in all of sport. We cannot know that. What matters
          is what a scorecard does. Before, the memory of a match was a sentence: <em>Kent won.</em> After, you can
          reconstruct who scored how many, and how each innings ended. The match now outlives everyone who watched it.
        </p>
        <p>
          The same year also produced the oldest surviving written code of the Laws of Cricket.
          <Cite id="earlycricket-laws" /> Rules and records arriving together is probably no coincidence. Much
          eighteenth-century cricket was played for money, and a wager needs both.
        </p>
      </Prose>

      <Exhibit
        label="4.1"
        title="One match, four media: Kent v All England, 18 June 1744"
        status="Team totals as recorded; layouts are reconstructions"
        surface="paper"
        instructions="Step through the media with the tabs or the arrow keys, or play the sequence."
      >
        <ScoreArchive />
      </Exhibit>

      <Prose>
        <p>
          From there the record gets faster and more public. Lord’s put up a scoreboard in 1846. Two years later Fred
          Lillywhite turned up at a match with a portable printing press, so spectators could buy a card updated to the
          fall of the latest wicket.
          <Cite id="wisden-scoring" /> Nineteenth-century compilers gathered old cards into printed volumes; the 20th
          century turned them into statistics; today you can open the scorecard of that disputed tie from 1783 on your
          phone.
          <Cite id="cricinfo-1783" />
        </p>
        <p>
          Scoring has quietly picked up four jobs. It is <strong>memory</strong> during the match, a{" "}
          <strong>record</strong> when it ends, an <strong>archive</strong> once the cards are collected, and{" "}
          <strong>statistics</strong> when the archive is big enough to count. Each sport then had to decide what its
          record should look like. They did not agree.
        </p>
      </Prose>
    </Chapter>
  );
}
