import { Chapter, Cite, Exhibit, Prose } from "@/components/ui";
import SportGallery, { type GalleryItem } from "@/components/interactives/SportGallery";
import { notationById } from "@/lib/notations";
import { SPORTS } from "@/lib/sports";

// Each display's notation and headline come from lib/notations.ts (shared with the quiz).
const fromNotation = (id: string) => {
  const n = notationById(id);
  return { key: n.id, sport: SPORTS[n.sport], sample: n.notation, headline: n.title };
};

const ITEMS: GalleryItem[] = [
  {
    ...fromNotation("tennis"),
    body: (
      <>
        <p>
          Points make games, games make sets, sets make matches, and games and sets must normally be won by two clear. The
          points have names, <em>love, fifteen, thirty, forty, deuce, advantage</em>, until 6–6, when the tie-break
          switches to plain numbers.
        </p>
        <p>Play a set and watch the display change its language halfway through.</p>
      </>
    ),
  },
  {
    ...fromNotation("cricket"),
    body: (
      <>
        <p>
          247 for 6 after 42.3 overs means 247 runs, six wickets lost, and 42 overs plus 3 balls bowled. An over has six
          balls, so after 42.5 comes 43.0. There is no 42.6, and 42.3 is not “42 and three tenths”.
        </p>
        <p>The score also carries its own clock: overs are the unit in which a limited-overs innings runs out.</p>
      </>
    ),
  },
  {
    ...fromNotation("golf"),
    body: (
      <>
        <p>
          A golf leaderboard shows strokes relative to par, the expected score for each hole. Under par is negative and
          good, over par is positive and bad, and level is written <em>E</em>, for even.
        </p>
        <p>Lower is better, which makes golf one of the few sports where the leader’s number is the smallest on the board.</p>
      </>
    ),
  },
  {
    ...fromNotation("darts"),
    body: (
      <>
        <p>
          In the standard game each player starts at 501 and subtracts what they throw. You must reach exactly zero, and
          the last dart has to land in a double or the bull. Score too much and you bust: the visit doesn’t count.
        </p>
        <p>The number on the board is not what you have achieved. It is what is left to do.</p>
      </>
    ),
  },
  {
    ...fromNotation("bowling"),
    body: (
      <>
        <p>
          A strike (X) is worth ten plus whatever your next two balls knock down; a spare (/) is ten plus the next ball.
          So a frame’s score is often unknown until later frames are played, and the sheet carries symbols while it
          waits. Twelve strikes in a row make the maximum, 300.
        </p>
        <p>Roll through the example game and watch totals appear late.</p>
      </>
    ),
  },
  {
    ...fromNotation("rugby"),
    body: (
      <>
        <p>
          Today a try is worth 5, a conversion 2, a penalty goal 3 and a drop goal 3. The name is a fossil. In early
          rugby, grounding the ball over the line was worth nothing in itself: it earned a <em>try at goal</em>, a chance
          to kick. Only goals decided matches.
          <Cite id={["wrm-points", "rugby365-scoring"]} />
        </p>
        <p>How the try went from worthless to the most valuable score is the story of chapter 10.</p>
      </>
    ),
  },
  {
    ...fromNotation("afl"),
    body: (
      <>
        <p>
          A goal between the tall posts is worth six, a behind one. Scores are written goals, behinds, then the total:
          10.6 (66). The dot separates the two counts. Every scoreline shows its own arithmetic.
          <Cite id="britannica-afl" />
        </p>
      </>
    ),
  },
  {
    ...fromNotation("gaelic"),
    body: (
      <>
        <p>
          2–11 means two goals and eleven points, 17 in all. The two columns are older than the arithmetic. In the
          original rules a goal outweighed any number of points; only in 1892 was a goal given a value, five points, cut
          to three in 1896.
          <Cite id="wiki-gaelic-scoring" />
        </p>
        <p>The newest addition, a two-point score from distance, comes back in chapter 10.</p>
      </>
    ),
  },
  {
    ...fromNotation("baseball"),
    body: (
      <>
        <p>
          Baseball has perhaps the simplest scoring rule of any major sport: a run is a run. It compensates with one of
          the richest displays: runs inning by inning, runs–hits–errors, the count of balls and strikes, the outs and the
          occupied bases.
        </p>
        <p>Sometimes the scoring is simple and the display is where the complexity lives.</p>
      </>
    ),
  },
];

export default function Ch05Languages() {
  return (
    <Chapter
      id="sport-languages"
      number={5}
      title="Every sport invents its own language"
      dek="Once a score is written down, it needs a grammar. Each sport wrote a different one."
    >
      <Prose>
        <p className="lede">
          A fluent fan reads a scoreline the way a musician reads notation, without noticing the conventions. Look at the
          same scorelines as an outsider and they turn strange: decimal points that are not decimals, totals that wait for
          the future, numbers that shrink as you get better.
        </p>
        <p>
          Every one of these displays is a small historical document. It records what that sport decided to count, what
          it decided to show, and in what order.
        </p>
      </Prose>

      <Exhibit
        id="notation-gallery"
        title="Specimens of sporting notation"
        surface="paper"
        instructions="Pick a sport with the tabs (arrow keys move between them). Every display can be played with."
      >
        <SportGallery items={ITEMS} />
      </Exhibit>
    </Chapter>
  );
}
