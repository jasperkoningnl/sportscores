import { Chapter, Exhibit, Prose } from "@/components/ui";

function Race() {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <line x1="150" y1="14" x2="150" y2="106" stroke="var(--red)" strokeWidth="3" />
      <line x1="10" y1="40" x2="190" y2="40" stroke="var(--rule-strong)" strokeDasharray="3 5" />
      <line x1="10" y1="70" x2="190" y2="70" stroke="var(--rule-strong)" strokeDasharray="3 5" />
      <line x1="10" y1="100" x2="190" y2="100" stroke="var(--rule-strong)" strokeDasharray="3 5" />
      <circle className="race-dot race-dot--1" cx="152" cy="27" r="9" fill="var(--ink)" />
      <circle className="race-dot race-dot--2" cx="120" cy="56" r="9" fill="var(--ink)" opacity="0.65" />
      <circle className="race-dot race-dot--3" cx="98" cy="86" r="9" fill="var(--ink)" opacity="0.4" />
    </svg>
  );
}

function Wrestle() {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <line x1="20" y1="104" x2="180" y2="104" stroke="var(--ink)" strokeWidth="2" />
      {/* standing */}
      <circle cx="78" cy="30" r="10" fill="var(--ink)" />
      <line x1="78" y1="40" x2="78" y2="78" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
      <line x1="78" y1="78" x2="68" y2="102" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
      <line x1="78" y1="78" x2="90" y2="102" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
      <line x1="78" y1="52" x2="100" y2="64" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
      {/* down */}
      <circle cx="170" cy="94" r="10" fill="var(--ink)" opacity="0.45" />
      <line x1="160" y1="96" x2="112" y2="98" stroke="var(--ink)" strokeOpacity="0.45" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

function Jump() {
  const marks = [62, 104, 88, 131];
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <rect x="40" y="70" width="150" height="26" fill="var(--paper-3)" />
      <line x1="40" y1="60" x2="40" y2="104" stroke="var(--ink)" strokeWidth="3" />
      {marks.map((m, i) => (
        <g key={i}>
          <ellipse cx={40 + m} cy="83" rx="7" ry="4" fill="var(--ink)" opacity={m === 131 ? 1 : 0.35} />
        </g>
      ))}
      <line x1="40" y1="30" x2="171" y2="30" stroke="var(--red)" strokeWidth="2" />
      <line x1="171" y1="24" x2="171" y2="36" stroke="var(--red)" strokeWidth="2" />
      <line x1="40" y1="24" x2="40" y2="36" stroke="var(--red)" strokeWidth="2" />
      <line x1="171" y1="36" x2="171" y2="76" stroke="var(--red)" strokeWidth="1" strokeDasharray="2 3" />
    </svg>
  );
}

export default function Ch01Before() {
  return (
    <Chapter id="ch-01" number={1} title="Before scores" dek="Many of the oldest contests never needed a number.">
      <Prose>
        <p className="lede">
          Put two people on a track and tell them to run. You do not need a scoreboard to know what happened. Whoever
          crosses the line first has won, and everyone watching saw it.
        </p>
        <p>
          The same goes for wrestling, where one person ends up on the ground, and for jumping or throwing, where you
          simply look for the furthest mark. These contests produce an order, a state or a measurement. None of them
          needs a running account of what happened along the way.
        </p>
      </Prose>

      <Exhibit
        label="1.1"
        title="Three ways to win without keeping score"
        kind="Diagram"
        surface="plain"
      >
        <div className="triptych">
          <div className="triptych__item">
            <Race />
            <p className="triptych__rule">Order</p>
            <p className="triptych__text">First across the line wins.</p>
          </div>
          <div className="triptych__item">
            <Wrestle />
            <p className="triptych__rule">State</p>
            <p className="triptych__text">One person is left standing.</p>
          </div>
          <div className="triptych__item">
            <Jump />
            <p className="triptych__rule">Measure</p>
            <p className="triptych__text">The furthest mark wins.</p>
          </div>
        </div>
      </Exhibit>

      <Prose>
        <p>
          A victory like that can be remembered as a single fact: <em>she won</em>. It can be carved on a monument,
          sung in a poem or argued about in a tavern. What it cannot do is tell you how close it was at the halfway
          point.
        </p>
        <p className="statement">
          So when did people stop just deciding who won, and start keeping a running numerical account of a contest?
        </p>
        <p>
          There is no single date. But the first clue is hiding in the word itself.
        </p>
      </Prose>
    </Chapter>
  );
}
