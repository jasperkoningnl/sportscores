import Link from "next/link";
import { NOTATIONS, anchorOf, notationById } from "@/lib/notations";
import { placeLabel } from "@/lib/places";
import { POSTER_GROUPS } from "@/lib/poster";
import { SOURCES } from "@/lib/sources";
import { SPORTS } from "@/lib/sports";

/** Every notation on one sheet, grouped; laid out for the screen and for printing on A2. */
export default function Poster({ siteUrl }: { siteUrl: string }) {
  const listed = POSTER_GROUPS.flatMap((g) => g.notations);
  const missing = NOTATIONS.filter((n) => !listed.includes(n.id)).map((n) => n.id);
  if (missing.length) throw new Error(`Notations missing from the poster: ${missing.join(", ")}`);

  return (
    <article className="poster" aria-labelledby="poster-title">
      <header className="poster__head">
        <p className="poster__kicker mono">The Archaeology of Sports Scores</p>
        <h1 id="poster-title" className="poster__title">
          <span className="poster__count num">{listed.length}</span> ways to write a score
        </h1>
        <p className="poster__lead">
          Every sport invents its own grammar for keeping count. Here are the notations the essay collects, grouped by
          what makes them strange.
        </p>
      </header>

      {POSTER_GROUPS.map((g) => (
        <section key={g.title} className="poster__group" aria-labelledby={`pg-${g.title}`}>
          <div className="poster__group-head">
            <h2 id={`pg-${g.title}`} className="poster__group-title">
              {g.title}
            </h2>
            <p className="poster__group-note">{g.note}</p>
          </div>
          <ul className="poster__tiles">
            {g.notations.map((id) => {
              const n = notationById(id);
              return (
                <li key={id} className="poster__tile">
                  <p className="poster__sport mono">
                    <span>{n.sportLabel ?? SPORTS[n.sport]}</span>
                    <Link className="poster__ref" href={`/#${anchorOf(n)}`}>
                      {placeLabel(n.place)}
                    </Link>
                  </p>
                  <div className="poster__plate">
                    <span className="num">{n.notation}</span>
                    {n.tag && <span className="poster__tag mono">{n.tag}</span>}
                  </div>
                  <h3 className="poster__tile-title">{n.title}</h3>
                  <p className="poster__reading">{n.reading}</p>
                  {n.sources.length > 0 && (
                    <p className="poster__sources mono">
                      {n.sources
                        .map((s) => SOURCES.find((x) => x.id === s)?.publisher)
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <footer className="poster__foot mono">
        <span>Texts and sources from the essay; the groupings are ours. Numbers such as 5.1 are its exhibits.</span>
        <span>{siteUrl.replace(/^https?:\/\//, "")}</span>
      </footer>
    </article>
  );
}
