/**
 * The poster: every notation in lib/notations.ts, sorted into groups by what
 * makes it unusual. The groupings and their one-line descriptions are an
 * editorial reading of the essay; the notations and their texts are the essay's.
 */
export const POSTER_GROUPS: { title: string; note: string; notations: string[] }[] = [
  {
    title: "Lower is better",
    note: "Smaller numbers win: strokes against par, points still to go, finishing places, seconds per 500 metres.",
    notations: ["golf", "darts", "sailing", "samalog"],
  },
  {
    title: "More than one count",
    note: "One scoreline, several tallies: runs and wickets, goals and behinds, goals and points, runs, hits and errors.",
    notations: ["cricket", "afl", "gaelic", "baseball"],
  },
  {
    title: "Not just a number",
    note: "To read these you need more: the vocabulary, the frames still to come, who is serving, the match programme.",
    notations: ["tennis", "bowling", "pickleball", "half-time"],
  },
  {
    title: "Adjusted scores",
    note: "The number on the board is not simply what happened: points cancel, a goal is added, a zone subtracts.",
    notations: ["cornhole", "nhl-shootout", "shuffleboard"],
  },
  {
    title: "Scores that shape the play",
    note: "What a score is worth decides how people play: the value of a try, opponents passed, players brought back.",
    notations: ["rugby", "roller-derby", "kabaddi"],
  },
];
