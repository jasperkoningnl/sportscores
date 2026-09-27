import type { SportId } from "@/lib/sports";

/**
 * Score notations: how a sport writes or shows its score, and what it means.
 * The texts are the essay's own; `sources` are ids in lib/sources.ts (empty
 * where the essay describes a rule without citing a source). Chapter 5's
 * gallery, chapter 7's cabinet and the quiz all read from this list, so a
 * correction made here appears everywhere.
 */
export type Notation = {
  id: string;
  sport: SportId;
  /** Overrides the sport's display name, e.g. "Ice hockey · NHL". */
  sportLabel?: string;
  /** The score as written or shown. */
  notation: string;
  /** A small tag shown beside the notation, e.g. "SO". */
  tag?: string;
  title: string;
  reading: string;
  sources: string[];
  /** The exhibit or case (lib/places.ts) where the essay shows it. */
  place: string;
  /** The element to link to; defaults to the place. */
  anchor?: string;
};

export const NOTATIONS: Notation[] = [
  // Chapter 5: the gallery of score displays (one tab each, …/#notation-afl)
  {
    id: "tennis",
    sport: "tennis",
    notation: "30–15",
    title: "Three nested counts, and two vocabularies",
    reading:
      "Points make games, games make sets, sets make matches, and games and sets must normally be won by two clear. The points have names, love, fifteen, thirty, forty, deuce, advantage, until 6–6, when the tie-break switches to plain numbers.",
    sources: [],
    place: "notation-gallery",
    anchor: "notation-tennis",
  },
  {
    id: "cricket",
    sport: "cricket",
    notation: "247/6",
    title: "A decimal point that isn’t one",
    reading:
      "247 for 6 after 42.3 overs means 247 runs, six wickets lost, and 42 overs plus 3 balls bowled. An over has six balls, so after 42.5 comes 43.0. There is no 42.6, and 42.3 is not “42 and three tenths”.",
    sources: [],
    place: "notation-gallery",
    anchor: "notation-cricket",
  },
  {
    id: "golf",
    sport: "golf",
    notation: "−4",
    title: "Scored against an imaginary opponent",
    reading:
      "A golf leaderboard shows strokes relative to par, the expected score for each hole. Under par is negative and good, over par is positive and bad, and level is written E, for even.",
    sources: [],
    place: "notation-gallery",
    anchor: "notation-golf",
  },
  {
    id: "darts",
    sport: "darts",
    notation: "501",
    title: "A score that counts down",
    reading:
      "In the standard game each player starts at 501 and subtracts what they throw. You must reach exactly zero, and the last dart has to land in a double or the bull. The number on the board is not what you have achieved. It is what is left to do.",
    sources: [],
    place: "notation-gallery",
    anchor: "notation-darts",
  },
  {
    id: "bowling",
    sport: "bowling",
    notation: "X /",
    title: "Scores that depend on the future",
    reading:
      "A strike (X) is worth ten plus whatever your next two balls knock down; a spare (/) is ten plus the next ball. So a frame’s score is often unknown until later frames are played. Twelve strikes in a row make the maximum, 300.",
    sources: [],
    place: "notation-gallery",
    anchor: "notation-bowling",
  },
  {
    id: "rugby",
    sport: "rugby",
    notation: "5·2·3·3",
    title: "A try that was once only a try",
    reading:
      "Today a try is worth 5, a conversion 2, a penalty goal 3 and a drop goal 3. In early rugby, grounding the ball over the line was worth nothing in itself: it earned a try at goal, a chance to kick.",
    sources: ["wrm-points", "rugby365-scoring"],
    place: "notation-gallery",
    anchor: "notation-rugby",
  },
  {
    id: "afl",
    sport: "afl",
    notation: "10.6 (66)",
    title: "The workings are part of the score",
    reading:
      "A goal between the tall posts is worth six, a behind one. Scores are written goals, behinds, then the total: 10.6 (66). Every scoreline shows its own arithmetic.",
    sources: ["britannica-afl"],
    place: "notation-gallery",
    anchor: "notation-afl",
  },
  {
    id: "gaelic",
    sport: "gaelic",
    notation: "2–11",
    title: "Goals and points, kept apart",
    reading:
      "2–11 means two goals and eleven points, 17 in all. In the original rules a goal outweighed any number of points; only in 1892 was a goal given a value, five points, cut to three in 1896.",
    sources: ["wiki-gaelic-scoring"],
    place: "notation-gallery",
    anchor: "notation-gaelic",
  },
  {
    id: "baseball",
    sport: "baseball",
    notation: "R H E",
    title: "Simple score, dense display",
    reading:
      "A run is a run. Baseball compensates with one of the richest displays: runs inning by inning, runs–hits–errors, the count of balls and strikes, the outs and the occupied bases.",
    sources: [],
    place: "notation-gallery",
    anchor: "notation-baseball",
  },

  // Chapter 6: translating scores
  {
    id: "samalog",
    sport: "speed-skating",
    notation: "36.000",
    title: "Everything in 500-metre coins",
    reading:
      "The samalog converts every time into the average time per 500 metres: a 1,500 metre time is divided by three, a 5,000 by ten, a 10,000 by twenty. So 36.00 for 500 metres and 1:48.00 for 1,500 are both worth 36.000. The lowest total wins.",
    sources: ["isu-samalog"],
    place: "samalog",
  },

  // Chapter 7: the cabinet of curiosities
  {
    id: "nhl-shootout",
    sport: "ice-hockey",
    sportLabel: "Ice hockey · NHL",
    notation: "3–2",
    tag: "SO",
    title: "The goal nobody scored",
    reading:
      "Since 2005–06, NHL regular-season games still level after overtime go to a shootout. However many shootout attempts go in, the winners are given exactly one extra goal in the final score. No player is credited with it.",
    sources: ["nhl-rules"],
    place: "odd-nhl-shootout",
  },
  {
    id: "pickleball",
    sport: "pickleball",
    notation: "0–0–2",
    title: "A score with three numbers",
    reading:
      "In doubles, the server calls the serving side’s score, the receiving side’s score, and whether they are the first or second server. Games begin at 0–0–2, because the side that serves first gets only one server on its opening turn.",
    sources: ["usap-scoring"],
    place: "odd-pickleball",
  },
  {
    id: "cornhole",
    sport: "cornhole",
    notation: "7 − 5 = 2",
    title: "Only the difference counts",
    reading:
      "A bag in the hole scores 3, a bag on the board 1. After each round the two sides’ points cancel: score 7 against 5 and only the difference, 2, goes on the board.",
    sources: ["acl-rules"],
    place: "odd-cornhole",
  },
  {
    id: "shuffleboard",
    sport: "shuffleboard",
    notation: "10 OFF",
    title: "Negative territory",
    reading:
      "On a deck shuffleboard court, the scoring triangle has zones worth 10, 8 and 7, and behind them a zone marked “10 off” that subtracts ten. Knocking an opponent’s disc into it is a tactic.",
    sources: ["shuffleboard"],
    place: "odd-shuffleboard",
  },
  {
    id: "sailing",
    sport: "sailing",
    notation: "1",
    title: "One point for winning",
    reading:
      "Under the standard low-point system, each boat scores its finishing place: one point for first, two for second. Over a series, the lowest total wins.",
    sources: ["ws-appendix-a"],
    place: "odd-sailing",
  },
  {
    id: "roller-derby",
    sport: "roller-derby",
    notation: "+1 +1 +1 +1",
    title: "Opponents are the points",
    reading:
      "A jammer scores by skating past opposing players: after the first trip through the pack, each opponent passed on a scoring pass is worth a point. The other team’s bodies are the scoring opportunities.",
    sources: ["wftda-rules"],
    place: "odd-roller-derby",
  },
  {
    id: "kabaddi",
    sport: "kabaddi",
    notation: "+1",
    tag: "revive",
    title: "Points that bring players back",
    reading:
      "When a side scores a touch or tackle point, one of its eliminated players returns to the mat. Bonus points don’t revive anyone. Here the score changes how many people are playing.",
    sources: ["pkl-kabaddi"],
    place: "odd-kabaddi",
  },

  // Chapter 8: the half-time board
  {
    id: "half-time",
    sport: "football",
    notation: "B 2–1",
    title: "A, B, C: the half-time board",
    reading:
      "At half-time an attendant hung number plates beside a row of letters. The letters meant nothing on their own: the match programme listed the day’s other fixtures, each with a letter, so a spectator needed a programme to know which match B was.",
    sources: ["arsenal-halftime", "gotnotgot-halftime"],
    place: "half-time-board",
  },
];

export function notationById(id: string): Notation {
  const n = NOTATIONS.find((x) => x.id === id);
  if (!n) throw new Error(`Unknown notation: ${id}`);
  return n;
}

export const anchorOf = (n: Notation) => n.anchor ?? n.place;
