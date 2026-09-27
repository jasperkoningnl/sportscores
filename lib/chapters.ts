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

export const CHAPTERS: ChapterMeta[] = [
  { id: "prologue", n: "P", title: "Thirty–love" },
  { id: "ch-01", n: "1", title: "Before scores", part: "memory" },
  { id: "ch-02", n: "2", title: "The cut in the stick", part: "memory" },
  { id: "ch-03", n: "3", title: "Ancient scoreboards", part: "memory" },
  { id: "ch-04", n: "4", title: "When the match becomes data", part: "memory" },
  { id: "ch-05", n: "5", title: "Every sport invents its own language", part: "language" },
  { id: "ch-06", n: "6", title: "Scores that translate the incomparable", part: "language" },
  { id: "ch-07", n: "7", title: "Strange but useful", part: "language" },
  { id: "ch-08", n: "8", title: "The scoreboard becomes an object", part: "display" },
  { id: "ch-09", n: "9", title: "The score moves onto television", part: "display" },
  { id: "ch-10", n: "10", title: "The score starts designing the game", part: "redesign" },
  { id: "ch-11", n: "11", title: "The score learns to stop", part: "redesign" },
  { id: "ch-12", n: "12", title: "The clock becomes part of the score", part: "redesign" },
  { id: "ch-13", n: "13", title: "When the scoreboard changes the rules", part: "redesign" },
  { id: "ch-14", n: "14", title: "The score behind the score", part: "scored" },
  { id: "coda", n: "C", title: "Two cuts in a stick", part: "scored" },
  { id: "sources", n: "S", title: "Sources & credits" },
];

/** Numbered chapters only (not the prologue, coda or sources). */
export const CHAPTER_COUNT = CHAPTERS.filter((c) => /^\d+$/.test(c.n)).length;

export function partOf(chapterId: string): PartMeta | undefined {
  const part = CHAPTERS.find((c) => c.id === chapterId)?.part;
  return PARTS.find((p) => p.id === part);
}
