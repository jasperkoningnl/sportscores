import { PARTS, chapterById } from "@/lib/chapters";
import { PLACES, placeLabel, sportsAt } from "@/lib/places";
import { SPORTS, type SportId } from "@/lib/sports";

type Entry = { label: string; anchor: string; name: string };

const COLUMNS = [{ key: "prologue", label: "P", title: "Prologue" }, ...PARTS.map((p) => ({ key: p.id, label: p.n, title: `Part ${p.n} · ${p.title}` }))];

/** Every sport, the parts it appears in, and the exhibits that show it. Built from lib/places.ts. */
export const SPORT_ROWS: { sport: SportId; cells: Record<string, Entry[]>; count: number }[] = (() => {
  const rows = new Map<SportId, Record<string, Entry[]>>();
  for (const place of PLACES) {
    const column = chapterById(place.chapter)?.part ?? "prologue";
    for (const { sport, anchor } of sportsAt(place)) {
      const cells = rows.get(sport) ?? {};
      (cells[column] ??= []).push({ label: placeLabel(place.id), anchor, name: place.name });
      rows.set(sport, cells);
    }
  }
  return [...rows.entries()]
    .map(([sport, cells]) => ({ sport, cells, count: Object.values(cells).reduce((n, e) => n + e.length, 0) }))
    .sort((a, b) => b.count - a.count || SPORTS[a.sport].localeCompare(SPORTS[b.sport]));
})();

export default function SportIndex({ onGo }: { onGo: () => void }) {
  return (
    <div className="sindex">
      <p className="sindex__note mono">Where each sport appears, part by part. The numbers are exhibits: pick one to go there.</p>
      <table className="sindex__table">
        <caption className="visually-hidden">Sports and the exhibits that show them, by part of the essay</caption>
        <thead>
          <tr>
            <th scope="col" className="sindex__sport">
              Sport
            </th>
            {COLUMNS.map((c) => (
              <th key={c.key} scope="col" title={c.title}>
                <span aria-hidden="true">{c.label}</span>
                <span className="visually-hidden">{c.title}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SPORT_ROWS.map((row) => (
            <tr key={row.sport}>
              <th scope="row" className="sindex__sport">
                {SPORTS[row.sport]}
              </th>
              {COLUMNS.map((c) => (
                <td key={c.key}>
                  {(row.cells[c.key] ?? []).map((e) => (
                    <a key={e.label} className="sindex__plate num" href={`#${e.anchor}`} onClick={onGo} title={e.name}>
                      {e.label}
                      <span className="visually-hidden">: {e.name}</span>
                    </a>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
