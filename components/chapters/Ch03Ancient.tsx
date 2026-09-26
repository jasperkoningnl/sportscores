import { Certainty, Chapter, Cite, Exhibit, Prose, PullLine } from "@/components/ui";
import LapCounter from "@/components/interactives/LapCounter";
import { StoneDisc, UrraSwing } from "@/components/interactives/StoneDisc";

const EVENTS = [
  { name: "Stadion", note: "a sprint of one length of the stadium" },
  { name: "Long jump", note: "with hand-held weights" },
  { name: "Discus", note: "" },
  { name: "Javelin", note: "" },
  { name: "Wrestling", note: "usually last" },
];

const THEORIES = [
  {
    name: "Three wins",
    text: "An athlete who won three of the five events won outright, so the contest could end early. This is the reading most often drawn from the late author Philostratus.",
  },
  {
    name: "Progressive elimination",
    text: "Athletes dropped out as the events went on. Only first places mattered, and wrestling settled whoever was left.",
  },
  {
    name: "Relative placings",
    text: "Second and third places counted too, a little like a modern points table. Critics say the ancient evidence cannot carry this.",
  },
];

export default function Ch03Ancient() {
  return (
    <Chapter
      id="ch-03"
      number={3}
      title="Ancient scoreboards"
      dek="Organised scoring is far older than modern sport. The surviving objects, though, rarely come with instructions."
    >
      <Prose>
        <h3>Mesoamerica · a stone that kept score</h3>
        <p className="lede">
          In the FIFA Museum in Zurich there is a disc of volcanic rock from Maya territory, dated to roughly 650–850 CE.
          The museum presents it as a scoreboard for the ballgame played with a heavy rubber ball across Mesoamerica for
          centuries.
          <Cite id="fifa-meso" />
        </p>
        <p>
          How exactly it was used, nobody can say. The museum’s own text mentions a race to nine points. It also admits
          that the scoring system is not known for certain, and reaches for a living descendant for clues: <em>ulama</em>,
          still played in Sinaloa in north-western Mexico.
          <Cite id={["fifa-meso", "mexicolore-ulama"]} /> Descriptions of modern ulama speak of eight points rather than
          nine, and call the points <em>rayas</em>, lines, after the tally marks used to count them.
          <Cite id="wiki-ulama" /> The cut in the stick again, on another continent.
        </p>
      </Prose>

      <Exhibit
        label="3.1"
        title="Ballgame marker, volcanic stone, c. 650–850 CE (after the FIFA Museum object)"
        kind="Schematic drawing"
        status="Carvings deliberately left blank"
        surface="stone"
      >
        <div className="split">
          <StoneDisc />
          <div className="stack">
            <p className="stone-quote">The scoreboard survived. The rulebook didn’t.</p>
            <p className="small-copy">
              The drawing shows the object’s type, a round stone with a carved band and a central field, and nothing more.
              For the real object, see the{" "}
              <a href="https://editorial.fifamuseum.com/en/read/origins-meso-american-ball-games/" target="_blank" rel="noreferrer">
                FIFA Museum’s article
              </a>
              .
            </p>
            <div className="divider" />
            <p className="small-copy">
              <strong>A clue from ulama.</strong> According to the FIFA Museum, at certain moments an <em>urra</em> was
              contested, in which points could be won and lost at once. <Certainty level="unknown">Rule for the ancient game unknown</Certainty>
            </p>
            <UrraSwing />
          </div>
        </div>
      </Exhibit>

      <Prose>
        <aside className="aside-note">
          <strong>Scoreboard, or marker?</strong> In 2023 archaeologists at Chichén Itzá found a limestone disc about 32
          cm across, carved with two ball players and a hieroglyphic text that dates it to 894 CE. Headlines around the
          world called it a Maya scoreboard.
          <Cite id="mnd-chichen" /> The Spanish press release used <em>marcador</em>, which can mean a scoreboard but also
          a marker in the sense of “X marks the spot”. There is no evidence the disc kept score.
          <Cite id="yucatan-scoreboard" />
        </aside>
      </Prose>

      <Prose>
        <h3>Rome · seven laps, fourteen moving parts</h3>
        <p>
          A Roman chariot race normally ran seven laps, and in a vast, noisy circus it was surprisingly easy to lose
          count. In 174 BC the censors set up seven large eggs, <em>ova</em>, on the central
          barrier; one was taken down as each lap was completed. In 33 BC Agrippa added seven dolphins.
          <Cite id="lacus-circus" /> Writing more than two centuries later, Cassius Dio says Agrippa did it because the officials kept
          losing count of the laps.
          <Cite id="spectacles-circus" />
        </p>
        <p>
          You can still see the system at work in a 2nd-century mosaic from Lyon: seven eggs and seven dolphins on the
          barrier, the dolphins tipping downward as laps are run.
          <Cite id="lugdunum-mosaic" />
        </p>
      </Prose>

      <Exhibit
        label="3.2"
        title="Lap counter on the spina of a Roman circus"
        status="Reconstruction, not to scale"
        surface="paper"
        instructions="Complete a lap: one egg is lowered and one dolphin tips over."
      >
        <LapCounter />
      </Exhibit>

      <Prose>
        <p>
          This is a progress display the size of a building, readable from the cheapest seat, and it needed no numerals at
          all. It counts down rather than up, and it counts laps, not points. It is less a score than a loading bar.
        </p>

        <h3>Greece · winners without a total</h3>
        <p>
          The Greeks make a useful contrast. They cared intensely about winners, and honoured them with statues and
          victory songs. But a footrace or a wrestling bout produced a winner, not a total, and that was all anyone needed
          to record.
        </p>
        <p>
          The exception is the pentathlon, which forced the question: how do you add a sprint to a javelin throw? We know
          the five events. We do not know how they were combined into one victory.
          <Cite id={["openlearn-pentathlon", "jhs-philostratos"]} /> <Certainty level="disputed" />
        </p>
      </Prose>

      <Exhibit label="3.3" title="The ancient pentathlon: five known events, three rival theories" kind="Diagram" surface="plain">
        <div className="penta">
          <ol className="penta__events">
            {EVENTS.map((e, i) => (
              <li key={e.name}>
                <span className="penta__n num">{i + 1}</span>
                <span className="penta__name">{e.name}</span>
                {e.note && <span className="penta__note mono">{e.note}</span>}
              </li>
            ))}
          </ol>
          <div className="penta__arrow mono" aria-hidden="true">
            = one winner, somehow
          </div>
          <ul className="penta__theories">
            {THEORIES.map((t) => (
              <li key={t.name}>
                <span className="penta__tname">{t.name}</span>
                <span className="penta__ttext">{t.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Exhibit>

      <Prose>
        <h3>China · a hole in a net</h3>
        <p>
          Organised team ballgames with goals, officials and a count of successes are also much older than modern
          football. FIFA recognises the Chinese game <em>cuju</em> as the earliest form of football for which there is
          evidence. A text of 1187 by Meng Yuanlao describes a court match in which players passed the ball until one
          tried to send it through a round opening in a net, the <em>fengliu yan</em>. The winners were the side that
          put it through more often.
          <Cite id="fifa-cuju" />
        </p>
      </Prose>

      <PullLine>Stone discs, eggs, dolphins and round holes in a net: the first scoreboards were objects, not numbers.</PullLine>
    </Chapter>
  );
}
