import { CHAPTERS } from "@/lib/chapters";
import { NOTATIONS, anchorOf } from "@/lib/notations";
import type { SportId } from "@/lib/sports";

/**
 * Every exhibit (and chapter 7's cases) in reading order. The id is also the
 * element's address (…/#tally-stick), so it never changes once published.
 *
 * Exhibit numbers such as "2.3" are not written anywhere: they are worked out
 * from this list (the chapter's number, then the place's position within its
 * chapter). Moving an exhibit or a chapter renumbers everything by itself.
 */
export type Place = {
  id: string;
  chapter: string;
  /** Short name for navigation (the contents, the short route, the quiz). */
  name: string;
  /** Sports it shows. Left out where the sports come from lib/notations.ts. */
  sports?: SportId[];
};

export const PLACES: Place[] = [
  { id: "tie-break-film", chapter: "prologue", name: "Borg v McEnroe, the 1980 tie-break", sports: ["tennis"] },

  { id: "three-ways", chapter: "before-scores", name: "Three ways to win without keeping score", sports: ["athletics", "wrestling"] },

  { id: "tally-sticks-photo", chapter: "cut-in-the-stick", name: "Medieval tally sticks", sports: [] },
  { id: "word-history", chapter: "cut-in-the-stick", name: "From a cut to a game: one word", sports: [] },
  { id: "tally-stick", chapter: "cut-in-the-stick", name: "The notcher’s stick", sports: ["cricket"] },

  { id: "stone-disc", chapter: "ancient-scoreboards", name: "A Maya ballgame marker", sports: ["ball-game"] },
  { id: "circus-mosaic", chapter: "ancient-scoreboards", name: "The circus mosaic, Lyon", sports: ["chariot-racing"] },
  { id: "lap-counter", chapter: "ancient-scoreboards", name: "A Roman lap counter", sports: ["chariot-racing"] },
  { id: "pentathlon", chapter: "ancient-scoreboards", name: "The ancient pentathlon", sports: ["athletics"] },

  { id: "score-archive", chapter: "match-becomes-data", name: "One match, four media", sports: ["cricket"] },

  { id: "notation-gallery", chapter: "sport-languages", name: "Specimens of sporting notation" },

  { id: "samalog", chapter: "translating-scores", name: "Samalog calculator", sports: ["speed-skating"] },
  { id: "decathlon", chapter: "translating-scores", name: "Decathlon points", sports: ["athletics"] },
  { id: "nordic-combined", chapter: "translating-scores", name: "From jump points to start gaps", sports: ["nordic-combined"] },

  { id: "odd-nhl-shootout", chapter: "strange-but-useful", name: "The goal nobody scored" },
  { id: "odd-pickleball", chapter: "strange-but-useful", name: "A score with three numbers" },
  { id: "odd-cornhole", chapter: "strange-but-useful", name: "Only the difference counts" },
  { id: "odd-shuffleboard", chapter: "strange-but-useful", name: "Negative territory" },
  { id: "odd-sailing", chapter: "strange-but-useful", name: "One point for winning" },
  { id: "odd-roller-derby", chapter: "strange-but-useful", name: "Opponents are the points" },
  { id: "odd-kabaddi", chapter: "strange-but-useful", name: "Points that bring players back" },

  { id: "davis-cup-photo", chapter: "scoreboard-objects", name: "The Davis Cup board, 1914", sports: ["tennis"] },
  { id: "flip-board", chapter: "scoreboard-objects", name: "Flip scoreboard", sports: ["volleyball", "table-tennis"] },
  { id: "wrigley-photo", chapter: "scoreboard-objects", name: "The Wrigley Field scoreboard", sports: ["baseball"] },
  { id: "line-score", chapter: "scoreboard-objects", name: "Hand-operated line score", sports: ["baseball"] },
  { id: "wrigley-film", chapter: "scoreboard-objects", name: "Inside the Wrigley Field scoreboard", sports: ["baseball"] },
  { id: "half-time-board", chapter: "scoreboard-objects", name: "Half-time board and programme key", sports: ["football"] },
  { id: "curling-board", chapter: "scoreboard-objects", name: "Curling club scoreboard", sports: ["curling"] },

  { id: "score-bug", chapter: "score-on-television", name: "From the stadium board to the score bug", sports: ["baseball", "football"] },

  { id: "rugby-chart", chapter: "score-designs-game", name: "What each rugby score was worth", sports: ["rugby"] },
  { id: "three-point-court", chapter: "score-designs-game", name: "Two, three or four points", sports: ["basketball"] },
  { id: "league-table", chapter: "score-designs-game", name: "Two or three points for a win", sports: ["football"] },
  { id: "gaelic-arc", chapter: "score-designs-game", name: "The two-point arc", sports: ["gaelic"] },

  { id: "isner-mahut-film", chapter: "score-learns-to-stop", name: "Isner v Mahut, 70–68", sports: ["tennis"] },
  { id: "reform-timeline", chapter: "score-learns-to-stop", name: "Scoring reforms that tamed the clock", sports: ["tennis", "volleyball", "table-tennis", "badminton"] },
  { id: "rally-sim", chapter: "score-learns-to-stop", name: "Side-out versus rally scoring", sports: ["volleyball"] },

  { id: "shot-clock-sum", chapter: "clock-in-the-score", name: "The shot-clock sum", sports: ["basketball"] },
  { id: "shot-clock-monument", chapter: "clock-in-the-score", name: "The shot clock monument", sports: ["basketball"] },
  { id: "shot-clock", chapter: "clock-in-the-score", name: "Shot clock", sports: ["basketball", "korfball"] },

  { id: "quadball-board", chapter: "scoreboard-changes-rules", name: "Same game, one digit fewer", sports: ["quadball"] },

  { id: "xg-replay", chapter: "score-behind-the-score", name: "A 1–0 that might have been something else", sports: ["football"] },
  { id: "elo", chapter: "score-behind-the-score", name: "An Elo update", sports: ["chess", "football"] },
];

export function placeById(id: string): Place {
  const p = PLACES.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown place: ${id}`);
  return p;
}

/** The exhibit number, e.g. "2.3" or "P.1". */
export function placeLabel(id: string): string {
  const place = placeById(id);
  const chapter = CHAPTERS.find((c) => c.id === place.chapter);
  if (!chapter) throw new Error(`Place ${id} names an unknown chapter: ${place.chapter}`);
  const index = PLACES.filter((p) => p.chapter === place.chapter).findIndex((p) => p.id === id) + 1;
  return `${chapter.n}.${index}`;
}

/** Where a sport appears, with the element to link to (a gallery tab, a case or the exhibit). */
export function sportsAt(place: Place): { sport: SportId; anchor: string }[] {
  if (place.sports) return place.sports.map((sport) => ({ sport, anchor: place.id }));
  return NOTATIONS.filter((n) => n.place === place.id).map((n) => ({ sport: n.sport, anchor: anchorOf(n) }));
}
