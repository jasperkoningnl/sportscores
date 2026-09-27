import { Certainty, Chapter, Cite, Exhibit, Prose, PullLine } from "@/components/ui";
import RugbyChart from "@/components/interactives/RugbyChart";
import LeagueTable from "@/components/interactives/LeagueTable";
import { BasketballCourt, GaelicArc } from "@/components/interactives/Courts";

export default function Ch10Design() {
  return (
    <Chapter
      id="ch-10"
      number={10}
      title="The score starts designing the game"
      dek="Change what a score is worth and players change what they do."
      tone="deep"
    >
      <Prose>
        <p className="statement">At first, the score records the game. Eventually, changing the score becomes a way to change the game.</p>
        <p>
          Nobody sets out to redesign a sport by editing a scoreboard. But once a sport has a points table, every row in it
          is a lever. Raise the value of one action and players will chase it. Lower another and it withers. Governing
          bodies discovered this, and started pulling.
        </p>

        <h3>Rugby: making the try worth trying for</h3>
        <p>
          Recall that in early rugby a try was worth nothing by itself. When points were introduced, a try was worth a
          single point in 1890, two in 1891 and three from 1893. It then stayed at three for 78 years, level with a penalty
          kick, and below the drop goal until 1948. In 1971 it rose to four, and in 1992 to five.
          <Cite id={["wrm-points", "rugby365-scoring"]} />
        </p>
      </Prose>

      <Exhibit
        label="10.1"
        title="What each score was worth in rugby union, 1890–today"
        kind="Chart"
        surface="paper"
        instructions="Move across the chart, or use the year slider, to read the values for any season."
      >
        <RugbyChart />
      </Exhibit>

      <Prose>
        <p>
          Read the lines together and the direction is unmistakable. Over a century, the lawmakers kept tilting the table
          towards the try, the score you earn by carrying the ball over the line, and away from the kick.
        </p>

        <h3>Basketball: one step further back</h3>
        <p>
          The three-point line is the purest example of the lever. Same basket, same ball, same shooting motion. But
          step back behind a painted arc and the same successful shot is worth 50 per cent more.
        </p>
        <p>
          The line began in the American Basketball League in 1961, was made famous by the ABA from 1967, and reached the
          NBA in the 1979–80 season. FIBA adopted it in 1984 and American college basketball in 1986.
          <Cite id="hoopsgeek-3pt" /> In the NBA the arc sits 23 feet 9 inches from the basket but only 22 feet in the
          corners, which is why the corner three became the most coveted spot on the floor, and why modern teams spread
          their players wide to open it up.
        </p>
      </Prose>

      <Exhibit
        label="10.2"
        title="Half court, NBA dimensions"
        surface="paper"
        instructions="Click to take a shot, or focus the court and use the arrow keys and Enter. Every shot here goes in; only its value changes."
      >
        <BasketballCourt />
      </Exhibit>

      <Prose>
        <p>
          Some leagues have kept going. The Harlem Globetrotters introduced a four-point shot in 2010.
          <Cite id="globetrotters-4pt" /> In 2024 the Philippine Basketball Association adopted a four-point arc 27 feet
          from the basket for official games.
          <Cite id="pba-4pt" /> Whether a fourth value makes basketball better or just busier is an open argument.
        </p>

        <h3>Football: making a draw less comfortable</h3>
        <p>
          League tables are scores of scores. For most of the twentieth century a football win earned two points and a
          draw one, so two draws were worth exactly one win. In 1981 the English Football League switched to three points
          for a win, an idea championed by Jimmy Hill. The 1994 World Cup used it, FIFA formally adopted it in 1995, and it
          soon became the global norm.
          <Cite id={["wiki-3pts", "tandf-3pts"]} />
        </p>
        <p>
          The intention was behavioural: make winning more valuable relative to drawing, so that a team at 0–0 has a
          reason to go for it. How much it really changed behaviour is still debated. <Certainty level="disputed" />
        </p>
      </Prose>

      <Exhibit
        label="10.3"
        title="One season, two points systems"
        status="Invented teams"
        surface="paper"
        instructions="Switch the value of a win and watch the table re-sort."
      >
        <LeagueTable />
      </Exhibit>

      <Prose>
        <h3>Gaelic football: a new colour of flag</h3>
        <p>
          The most recent redesign is also one of the boldest. For the 2025 season, Gaelic football’s Football Review
          Committee introduced an arc 40 metres from goal. A score kicked over the bar from beyond it is worth two points,
          and umpires signal it with a new orange flag, alongside the old green for a goal and white for a point.
          <Cite id="gaa-frc" /> In October 2025 a Special Congress wrote the changes permanently into the rule book.
          <Cite id="rte-congress" />
        </p>
        <p>
          A sport that kept goals and points in separate columns for over a century has, in effect, invented a third kind
          of score. It exists to reward long-range kicking, which the committee wanted to see more of.
        </p>
      </Prose>

      <Exhibit
        label="10.4"
        title="The two-point arc: one end of a Gaelic football pitch"
        status="Schematic"
        surface="paper"
        instructions="Click to kick a score over the bar from anywhere. The flag, and the value, depend on where you stand."
      >
        <GaelicArc />
      </Exhibit>

      <PullLine>A points table is a policy. Every number in it is an instruction to the players.</PullLine>
    </Chapter>
  );
}
