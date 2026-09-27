import { Chapter, Cite, Prose } from "@/components/ui";
import { NOTATIONS } from "@/lib/notations";
import { PLACES, placeLabel } from "@/lib/places";
import { SPORTS } from "@/lib/sports";

// The cases, in the order lib/places.ts lists them; their texts live in lib/notations.ts.
const CASES = PLACES.filter((p) => p.chapter === "strange-but-useful").map((p) => {
  const n = NOTATIONS.find((x) => x.place === p.id);
  if (!n) throw new Error(`No notation for ${p.id}`);
  return { place: p.id, n };
});

export default function Ch07Oddities() {
  return (
    <Chapter
      id="strange-but-useful"
      number={7}
      title="Strange but useful"
      dek="A small cabinet of curiosities. Each one solves a real problem."
    >
      <Prose>
        <p>
          Scoring systems look arbitrary from the outside. Up close, most of the odd ones are clever fixes: for fairness at
          the start of a game, for keeping a contest close, for giving a result to a game that would otherwise end level.
        </p>
      </Prose>
      <ol className="odd">
        {CASES.map(({ place, n }) => (
          <li key={place} id={place} className="odd__item">
            <div className="odd__show" aria-hidden="true">
              <span className="num">{n.notation}</span>
              {n.tag && <span className="odd__tag mono">{n.tag}</span>}
            </div>
            <div className="odd__text">
              <p className="odd__meta mono">
                <span className="odd__no">{placeLabel(place)}</span> {n.sportLabel ?? SPORTS[n.sport]}
              </p>
              <h3 className="odd__title">{n.title}</h3>
              <p>
                {n.reading}
                {n.sources.length > 0 && <Cite id={n.sources} />}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Chapter>
  );
}
