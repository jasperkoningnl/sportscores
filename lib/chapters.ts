export type PartMeta = { id: string; n: string; title: string };
export type ChapterMeta = { id: string; n: string; title: string; part?: string };

/**
 * The essay's five parts follow the thesis in the prologue: a score begins as
 * memory, becomes language, becomes display, turns into a tool for redesigning
 * the sport, and ends up being scored itself.
 */
export const PARTS: PartMeta[] = [
  { id: "memory", n: "I", title: "Memory" },
  { id: "language", n: "II", title: "Language" },
  { id: "display", n: "III", title: "Display" },
  { id: "redesign", n: "IV", title: "Redesign" },
  { id: "scored", n: "V", title: "Scoring the score" },
];

/**
 * Chapter ids are also their addresses (…/#cut-in-the-stick). They name the
 * subject, not the position, so links keep working when chapters move or are
 * renumbered. Never change an id once published; add it to LEGACY_IDS instead.
 */
export const CHAPTERS: ChapterMeta[] = [
  { id: "prologue", n: "P", title: "Thirty–love" },
  { id: "before-scores", n: "1", title: "Before scores", part: "memory" },
  { id: "cut-in-the-stick", n: "2", title: "The cut in the stick", part: "memory" },
  { id: "ancient-scoreboards", n: "3", title: "Ancient scoreboards", part: "memory" },
  { id: "match-becomes-data", n: "4", title: "When the match becomes data", part: "memory" },
  { id: "sport-languages", n: "5", title: "Every sport invents its own language", part: "language" },
  { id: "translating-scores", n: "6", title: "Scores that translate the incomparable", part: "language" },
  { id: "strange-but-useful", n: "7", title: "Strange but useful", part: "language" },
  { id: "scoreboard-objects", n: "8", title: "The scoreboard becomes an object", part: "display" },
  { id: "score-on-television", n: "9", title: "The score moves onto television", part: "display" },
  { id: "score-designs-game", n: "10", title: "The score starts designing the game", part: "redesign" },
  { id: "score-learns-to-stop", n: "11", title: "The score learns to stop", part: "redesign" },
  { id: "clock-in-the-score", n: "12", title: "The clock becomes part of the score", part: "redesign" },
  { id: "scoreboard-changes-rules", n: "13", title: "When the scoreboard changes the rules", part: "redesign" },
  { id: "score-behind-the-score", n: "14", title: "The score behind the score", part: "scored" },
  { id: "coda", n: "C", title: "Two cuts in a stick", part: "scored" },
  { id: "sources", n: "S", title: "Sources & credits" },
];

/**
 * Numbered addresses used before the chapters had stable ids (the first
 * published version, in its original order). Old links are sent on to the
 * chapter they meant.
 */
export const LEGACY_IDS: Record<string, string> = {
  "ch-01": "before-scores",
  "ch-02": "cut-in-the-stick",
  "ch-03": "ancient-scoreboards",
  "ch-04": "match-becomes-data",
  "ch-05": "sport-languages",
  "ch-06": "scoreboard-objects",
  "ch-07": "score-designs-game",
  "ch-08": "score-learns-to-stop",
  "ch-09": "clock-in-the-score",
  "ch-10": "translating-scores",
  "ch-11": "strange-but-useful",
  "ch-12": "scoreboard-changes-rules",
  "ch-13": "score-on-television",
  "ch-14": "score-behind-the-score",
};

/** Numbered chapters only (not the prologue, coda or sources). */
export const CHAPTER_COUNT = CHAPTERS.filter((c) => /^\d+$/.test(c.n)).length;

export function chapterById(id: string): ChapterMeta | undefined {
  return CHAPTERS.find((c) => c.id === id);
}

export function partOf(chapterId: string): PartMeta | undefined {
  const part = chapterById(chapterId)?.part;
  return PARTS.find((p) => p.id === part);
}
