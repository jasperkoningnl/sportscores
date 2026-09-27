import { SOURCES } from "@/lib/sources";

export default function Sources() {
  const groups: { chapter: string; items: { n: number; s: (typeof SOURCES)[number] }[] }[] = [];
  SOURCES.forEach((s, i) => {
    let g = groups.find((x) => x.chapter === s.chapter);
    if (!g) {
      g = { chapter: s.chapter, items: [] };
      groups.push(g);
    }
    g.items.push({ n: i + 1, s });
  });

  return (
    <section id="sources" className="sources" aria-labelledby="sources-title">
      <div className="sources__inner">
        <p className="kicker">References</p>
        <h2 id="sources-title" className="sources__title">
          Sources &amp; credits
        </h2>

        <div className="sources__about">
          <h3>How this piece was made</h3>
          <p>
            Every factual claim in the essay is numbered to a source below. Where historians disagree, or where a popular
            story has no good evidence behind it, the text says so and marks the claim with a small stamp: <em>theory</em>,{" "}
            <em>historians disagree</em>, <em>good story</em>, <em>proposal</em> or <em>unknown</em>.
          </p>
          <p>
            Photographs are reproduced only when they are in the public domain or under a free licence (CC0, CC BY or
            CC BY-SA). The photographer, the licence and any cropping are credited under each picture, and the file page is
            listed below. Film clips are embedded from the rights holders’ own uploads, never re-cut.
          </p>
          <p>
            Every drawing of a historical object, the Maya stone, the Roman lap counter, the 1744 scorecard, the Wrigley
            board, is an original reconstruction, labelled as such, and deliberately leaves out details such as
            inscriptions that cannot be verified. Follow the source links to see the real objects. Matches, teams and
            athletes in the interactive examples are invented unless the label says otherwise; the simulations are simple
            models, not match data.
          </p>
          <p>
            Typefaces: Newsreader, Big Shoulders Display, IBM Plex Mono, IM FELL English and Homemade Apple, all released
            under open licences.
          </p>
        </div>

        {groups.map((g) => (
          <div key={g.chapter} className="sources__group">
            <h3 className="sources__chapter mono">{g.chapter}</h3>
            <ol className="sources__list">
              {g.items.map(({ n, s }) => (
                <li key={s.id} id={`src-${s.id}`} value={n}>
                  <span className="sources__n mono">{n}</span>
                  <span className="sources__entry">
                    <span className="sources__pub">{s.publisher}.</span>{" "}
                    <a href={s.url} target="_blank" rel="noreferrer">
                      {s.title}
                    </a>
                    {s.note && <span className="sources__note"> {s.note}</span>}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <footer className="colophon mono">
        <span>The Archaeology of Sports Scores</span>
        <a href="#prologue">Back to the top ↑</a>
      </footer>
    </section>
  );
}
