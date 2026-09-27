import { CHAPTERS, PARTS } from "@/lib/chapters";

// Average silent reading rate of adults for non-fiction in English
// (Brysbaert 2019, Journal of Memory and Language 109, 104047).
export const WORDS_PER_MINUTE = 238;

export type ReadingColumn = {
  key: string;
  /** "P", "I" … "V" */
  label: string;
  title: string;
  /** Minutes of reading in this column. */
  minutes: number;
  /** Minutes already behind the reader; null when they have not reached it yet. */
  behind: number | null;
};

const COLUMNS = [
  { key: "prologue", label: "P", title: "Prologue", chapters: ["prologue"] },
  ...PARTS.map((p) => ({
    key: p.id,
    label: p.n,
    title: `Part ${p.n} · ${p.title}`,
    chapters: CHAPTERS.filter((c) => c.part === p.id).map((c) => c.id),
  })),
];

/**
 * Counts the words on the page, per part, and how many of them are already
 * above the reading line (30% down the screen). Runs in the browser only.
 */
export function measureReading(): ReadingColumn[] {
  const line = window.scrollY + window.innerHeight * 0.3;
  return COLUMNS.map((col) => {
    let words = 0;
    let wordsBehind = 0;
    let started = false;
    let finished = true;
    for (const id of col.chapters) {
      const el = document.getElementById(id);
      if (!el) continue;
      const w = el.innerText.split(/\s+/).filter(Boolean).length;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const f = Math.max(0, Math.min(1, (line - top) / Math.max(1, el.offsetHeight)));
      words += w;
      wordsBehind += w * f;
      if (f > 0) started = true;
      if (f < 1) finished = false;
    }
    const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
    const behind = !started ? null : finished ? minutes : Math.min(minutes, Math.round(wordsBehind / WORDS_PER_MINUTE));
    return { key: col.key, label: col.label, title: col.title, minutes, behind };
  });
}
