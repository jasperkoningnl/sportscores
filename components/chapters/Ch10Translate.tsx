import { Chapter, Cite, Exhibit, Prose, PullLine } from "@/components/ui";
import { DecathlonFormula, NordicCombined, Samalog } from "@/components/interactives/Translators";

export default function Ch10Translate() {
  return (
    <Chapter
      id="ch-10"
      number={10}
      title="Scores that translate the incomparable"
      dek="How do you add a sprint to a marathon? Invent an exchange rate."
    >
      <Prose>
        <p className="lede">
          The ancient pentathlon’s problem never went away. Whenever one champion has to emerge from several different
          contests, somebody has to decide how a time, a distance and a height can be added together. The answers are
          some of the most elegant little machines in sport.
        </p>
        <h3>Speed skating: everything in 500-metre coins</h3>
        <p>
          In an allround speed skating championship, skaters race four distances. The <em>samalog</em> converts every time
          into the same currency: the average time per 500 metres. A 1,500 metre time is divided by three, a 5,000 by ten,
          a 10,000 by twenty. The points are cut off after three decimals, not rounded, and the lowest total wins.
          <Cite id="isu-samalog" />
        </p>
        <p>
          So a skater who holds exactly the same pace at every distance scores the same points four times over: 36.00 for
          500 metres, 1:48.00 for 1,500, 6:00.00 for 5,000 and 12:00.00 for 10,000 are all worth 36.000.
        </p>
      </Prose>

      <Exhibit
        label="10.1"
        title="Samalog calculator"
        surface="paper"
        instructions="Type your own times. Equal pace gives equal points."
      >
        <Samalog />
      </Exhibit>

      <Prose>
        <h3>Decathlon: a curve instead of a ruler</h3>
        <p>
          The decathlon and heptathlon use a harder exchange. Each performance goes through its own formula from World
          Athletics’ scoring tables, and the formulas are deliberately non-linear: the better you already are, the more
          each extra hundredth or centimetre is worth.
          <Cite id="wa-tables" /> You don’t need the equations to enjoy a decathlon, but one is here if you want it.
        </p>
      </Prose>

      <Exhibit
        label="10.2"
        title="Decathlon points for the 100 metres"
        surface="paper"
        instructions="Enter a 100 m time. Open the formula to see the arithmetic."
      >
        <DecathlonFormula />
      </Exhibit>

      <Prose>
        <h3>Nordic combined: points that turn back into a race</h3>
        <p>
          Nordic combined joins ski jumping, judged in points, to cross-country skiing, decided by time. The Gundersen
          method converts one into the other. The best jumper starts the ski race first; everybody else starts behind by a
          time gap based on how many points they trailed. In individual events, one point is worth four seconds.
          <Cite id={["fis-nc101", "nbc-nc"]} />
        </p>
        <p>
          Then the numbers disappear. Once the skiers are on the course, nobody needs a calculator. The race is settled by
          the oldest scoring rule of all.
        </p>
      </Prose>

      <Exhibit
        label="10.3"
        title="From jump points to start gaps"
        status="Invented athletes"
        surface="paper"
        instructions="Change skier A’s jump, see the start list change, then run the race."
      >
        <NordicCombined />
      </Exhibit>

      <PullLine>First across the line wins. We are back where chapter 1 began.</PullLine>
    </Chapter>
  );
}
