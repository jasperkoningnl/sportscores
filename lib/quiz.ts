/**
 * "Read the scoreboard": each question shows a score and asks what it means.
 * The explanation, its sources and the link back into the essay come from the
 * notation it names (lib/notations.ts), so they cannot drift from the essay.
 */
export type Question = {
  notation: string;
  /** What the board shows, if not the notation itself. */
  board?: string;
  prompt: string;
  options: string[];
  answer: number;
};

export const QUESTIONS: Question[] = [
  {
    notation: "afl",
    prompt: "Which sport writes its score like this?",
    options: ["Cricket", "Australian football", "Gaelic football", "Rugby union"],
    answer: 1,
  },
  {
    notation: "cricket",
    board: "247/6 · 42.3 overs",
    prompt: "A cricket score. How many balls have been bowled?",
    options: ["423", "247", "255", "252"],
    answer: 2,
  },
  {
    notation: "gaelic",
    prompt: "A Gaelic football score. How many points is that in all?",
    options: ["13", "17", "2.11", "21"],
    answer: 1,
  },
  {
    notation: "golf",
    prompt: "A golfer’s score on the leaderboard. Good or bad?",
    options: ["Good: four under par", "Bad: four over par", "Bad: four strokes behind the leader", "Neither: four holes to play"],
    answer: 0,
  },
  {
    notation: "darts",
    prompt: "A darts player’s score at the start of a game. What does the number tell you?",
    options: ["Points scored so far", "What is still left to score", "The best possible score", "How many darts are left"],
    answer: 1,
  },
  {
    notation: "pickleball",
    prompt: "Which sport opens a doubles game with this call?",
    options: ["Table tennis", "Volleyball", "Pickleball", "Badminton"],
    answer: 2,
  },
  {
    notation: "nhl-shootout",
    board: "2–2 after overtime",
    prompt:
      "An NHL regular-season game. In the shootout the home side scores three times, the visitors once. What is the final score?",
    options: ["5–3", "3–2", "2–2", "4–2"],
    answer: 1,
  },
  {
    notation: "cornhole",
    board: "7 · 5",
    prompt: "One round of cornhole: one side scores 7, the other 5. What goes on the board?",
    options: ["7–5", "12 in total", "2, to the first side", "1, to the first side"],
    answer: 2,
  },
  {
    notation: "samalog",
    board: "36.00 · 1:48.00",
    prompt: "A skater does 36.00 over 500 metres and 1:48.00 over 1,500 metres. How do the two compare in samalog points?",
    options: ["The 500 metres scores lower", "The 1,500 metres scores lower", "Equal: both are 36.000", "Only the longest race counts"],
    answer: 2,
  },
  {
    notation: "half-time",
    prompt: "A half-time board at a British football ground. What did you need to know which match “B” was?",
    options: ["A radio", "The match programme", "Nothing: B was always the home match", "The next day’s paper"],
    answer: 1,
  },
];
