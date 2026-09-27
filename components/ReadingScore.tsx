import type { ReadingColumn } from "@/lib/reading";

/**
 * Reading time as a line score: one column per part, like innings, and a
 * total at the end. The top row is the essay; the bottom row fills in with the
 * minutes already behind the reader.
 */
export default function ReadingScore({ columns }: { columns: ReadingColumn[] }) {
  const total = columns.reduce((n, c) => n + c.minutes, 0);
  const started = columns.some((c) => c.behind !== null);
  const behind = columns.reduce((n, c) => n + (c.behind ?? 0), 0);

  return (
    <figure className="rscore">
      <table className="rscore__board">
        <caption className="visually-hidden">
          Minutes of reading in each part of the essay, and how many are behind you.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="rscore__name">
              <span className="visually-hidden">Row</span>
            </th>
            {columns.map((c) => (
              <th key={c.key} scope="col" title={c.title}>
                <span aria-hidden="true">{c.label}</span>
                <span className="visually-hidden">{c.title}</span>
              </th>
            ))}
            <th scope="col" className="rscore__sep">
              Min
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" className="rscore__name">
              Essay
            </th>
            {columns.map((c) => (
              <td key={c.key}>
                <span className="rscore__plate num">{c.minutes}</span>
              </td>
            ))}
            <td className="rscore__sep">
              <span className="rscore__plate rscore__plate--total num">{total}</span>
            </td>
          </tr>
          <tr>
            <th scope="row" className="rscore__name">
              You
            </th>
            {columns.map((c) => (
              <td key={c.key}>
                {c.behind === null ? (
                  <span className="rscore__slot">
                    <span className="visually-hidden">not yet</span>
                  </span>
                ) : (
                  <span className="rscore__plate num">{c.behind}</span>
                )}
              </td>
            ))}
            <td className="rscore__sep">
              <span className="rscore__plate rscore__plate--total num">{started ? behind : 0}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <figcaption className="rscore__note mono">
        Minutes of reading per part, at an average pace. “You” counts what is already behind you on the page.
      </figcaption>
    </figure>
  );
}
