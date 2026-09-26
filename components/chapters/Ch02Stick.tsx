import { Chapter, Cite, Exhibit, Kbd, Prose, PullLine } from "@/components/ui";
import TallyStick from "@/components/interactives/TallyStick";

const CHAIN = [
  { word: "skor", lang: "Old Norse", gloss: "a notch, a cut, an incision" },
  { word: "scoru", lang: "Late Old English", gloss: "twenty, probably from cutting one notch for every twenty counted" },
  { word: "score", lang: "Middle English onward", gloss: "a tally, a count, an account of what is owed" },
  { word: "score", lang: "1742, in whist", gloss: "the points made by players in a game" },
  { word: "scoreboard", lang: "1826 → 1884", gloss: "a tavern blackboard for chalked debts, then a display of a game" },
];

export default function Ch02Stick() {
  return (
    <Chapter
      id="ch-02"
      number={2}
      title="The cut in the stick"
      dek="The English word “score” began as something you did with a knife."
    >
      <Prose>
        <p className="lede">
          <em>Score</em> comes, by way of late Old English, from the Old Norse <em>skor</em>: a notch, a cut, an
          incision. The same root gave English <em>score</em> in the sense of twenty, most likely because large numbers,
          a passing flock of sheep for instance, were counted by cutting one notch for every twenty.
          <Cite id={["etym-score", "oed-score"]} />
        </p>
        <p>
          That does not mean the Norse invented keeping score in sport. They didn’t, and nobody claims they did. The notch
          was a general-purpose technology for remembering quantities: livestock, debts, taxes. The English Exchequer
          kept its accounts on split hazel tally sticks, one half for each party, and only stopped in the 1820s.
          <Cite id="smg-tally" />
        </p>
      </Prose>

      <Exhibit label="2.1" title="From a cut to a game: the drift of one word" kind="Word history" surface="plain">
        <ol className="chain">
          {CHAIN.map((c, i) => (
            <li key={i} className="chain__item">
              <span className="chain__lang mono">{c.lang}</span>
              <span className="chain__word">{c.word}</span>
              <span className="chain__gloss">{c.gloss}</span>
            </li>
          ))}
        </ol>
        <p className="chain__foot mono">
          Dates for the game and scoreboard senses are first recorded uses in English.
          <Cite id={["etym-score", "etym-scoreboard"]} />
        </p>
      </Exhibit>

      <Prose>
        <p>
          Sport arrives late in this story, and when it does, cricket takes the word literally. Early cricket scorers sat
          on the field with a stick and a knife and cut a notch for every run. They were known as <em>notchers</em>, and
          for a long time runs themselves were called notches. There was no scoreboard: when the batting side needed one
          more to win, the notchers told them.
          <Cite id={["earlycricket-officials", "wisden-scoring"]} />
        </p>
        <p>
          The oldest piece of cricket literature already has one. In 1706 William Goldwin published a Latin poem,{" "}
          <em>In Certamen Pilae</em>, about a country match, and in it a scorer notches the total on a stick.
          <Cite id="antigone-goldwin" />
        </p>
      </Prose>

      <PullLine>Score once meant a cut. In early cricket, a score could literally be a cut.</PullLine>

      <Exhibit
        label="2.2"
        title="The notcher’s stick"
        status="Reconstruction"
        surface="paper"
        instructions={
          <>
            Cut notches with the buttons, or press <Kbd>N</Kbd> while a button has focus. Then read the stick as a number.
          </>
        }
      >
        <TallyStick />
      </Exhibit>

      <Prose>
        <p>
          Notice what the stick is good at and what it is bad at. It is cheap, it cannot be erased, and it is quick to
          add to. But to know the total you have to count every cut, which is why scorers marked the tens and twenties
          differently. Accounts disagree on the exact convention: some describe every tenth notch cut longer, others a
          deeper nick at every twentieth, which is to say, at every score.
          <Cite id={["wisden-scoring", "wiki-1783"]} />
        </p>
        <aside className="aside-note">
          <strong>The disputed tie of 1783.</strong> At Hambledon in July 1783, Hampshire and Kent were recorded as tied
          on 202. According to the account that survives, the scorer, Pratt, cut every tenth notch longer, and had cut
          the long mark on the eleventh notch instead of the tenth. His stick was produced as evidence; the other scorer
          could not, or would not, produce his. The match stands in the records as a tie.
          <Cite id={["wiki-1783", "cricinfo-1783"]} />
        </aside>
        <p>
          A stick records a total. It does not record who scored the runs, or how. For that, the score had to move onto
          paper. Before it did, other civilisations had already built something even bolder: scoring machines you could
          see from the back of a stadium.
        </p>
      </Prose>
    </Chapter>
  );
}
