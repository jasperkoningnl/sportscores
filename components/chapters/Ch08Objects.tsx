import { Chapter, Cite, Exhibit, Prose } from "@/components/ui";
import { Photo, VideoEmbed } from "@/components/Media";
import { CurlingBoard, FlipBoard, HalfTimeBoard, LineScore } from "@/components/interactives/Boards";
import davisCup from "@/media/davis-cup-1914-forest-hills.jpg";
import davisCupBoard from "@/media/davis-cup-1914-scoreboard-detail.jpg";
import wrigleyBoard from "@/media/wrigley-field-scoreboard-2012.jpg";

export default function Ch08Objects() {
  return (
    <Chapter
      id="ch-08"
      number={8}
      title="The scoreboard becomes an object"
      dek="Before screens, a score had weight. Someone had to lift it into place."
    >
      <Prose>
        <p className="lede">
          For most of the twentieth century, a score was a physical thing: a card on a ring, a steel plate in a slot, a
          painted number on a hook. The design of those objects shaped what spectators could know, and when.
        </p>
      </Prose>

      <Exhibit
        label="8.1"
        title="Davis Cup Challenge Round, Forest Hills, New York, 14 August 1914"
        kind="Photograph"
        status="Glass negative, Bain News Service"
        surface="plain"
      >
        <div className="film">
          <Photo
            image={davisCup}
            alt="Black-and-white photograph of a grass tennis court ringed by spectators in straw hats. Four players in white stand near the net, line judges sit on chairs around the court, and at the back a man stands beside a tall board of hanging cards. Written on the negative: “Changing courts 8/14/14”."
            credit={{
              author: "Bain News Service",
              source: "Library of Congress",
              sourceUrl: "https://www.loc.gov/item/2014697051/",
              licence: "No known restrictions on publication",
              licenceUrl: "https://www.loc.gov/rr/print/res/274_bain.html",
            }}
          />
          <div className="film__text">
            <p className="kicker">Look behind the players</p>
            <p className="film__lead">Sets and games, hung by hand.</p>
            <Photo
              image={davisCupBoard}
              alt="Close-up of the scoreboard: “SETS 0 0” at the top, name boards reading “Brookes Wilding” and “McLoughlin Bundy”, and “GAMES 1 1” below, with a man in a suit and hat standing beside it."
              credit={null}
              className="photo--detail"
            />
            <p>
              The doubles of the 1914 Challenge Round: Norman Brookes and Anthony Wilding of Australasia against Maurice
              McLoughlin and Thomas Bundy of the United States. Brookes and Wilding won 6–3, 8–6, 9–7.
              <Cite id={["loc-davis-1914", "wiki-davis-1914"]} />
            </p>
            <p>
              The board has no row for points. Fifteen, thirty and forty stay where the prologue left them: spoken.
            </p>
          </div>
        </div>
      </Exhibit>

      <Prose>
        <h3>The flip card</h3>
        <p>
          The humblest scoreboard is a stack of numbered cards on rings. You flip one over, and the whole hall sees the
          new score. It is still how many volleyball, table tennis and school gymnasium games are kept, because it needs no
          power, no training and no cable.
        </p>
      </Prose>

      <Exhibit
        label="8.2"
        title="Flip scoreboard, gymnasium type"
        surface="plain"
        instructions="Change the score and watch the leaves fall."
      >
        <FlipBoard />
      </Exhibit>

      <Prose>
        <h3>The line score, by hand</h3>
        <p>
          Baseball’s line score, innings across the top and runs, hits and errors at the end, is a table designed to be
          read from a long way off. The most famous one still in use is at Wrigley Field in Chicago. It was built in 1937
          under Bill Veeck and is still operated by hand: a small crew works inside the board and swaps steel number
          plates through the openings as the game goes on, climbing through the structure to reach them.
          <Cite id={["mlb-wrigley", "wbez-wrigley"]} />
        </p>
      </Prose>

      <Exhibit
        label="8.3"
        title="The Wrigley Field centre-field scoreboard, 1 August 2012"
        kind="Photograph"
        surface="plain"
      >
        <div className="film">
          <Photo
            image={wrigleyBoard}
            alt="The green centre-field scoreboard at Wrigley Field against a blue sky, with a clock and pennant flags on top. Columns headed National and American list major-league games with runs by inning on white plates; the middle section shows the umpires’ numbers, batter, ball, strike and out."
            credit={{
              author: "Photo: TonyTheTiger",
              source: "Wikimedia Commons",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:201200801_Wrigley_Field_scoreboard.JPG",
              licence: "CC BY-SA 3.0",
              licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
              changes: "cropped",
            }}
          />
          <div className="film__text">
            <p className="kicker">Both leagues, by hand</p>
            <p className="film__lead">Line scores by the dozen.</p>
            <p>
              Left and right, games from both major leagues, the Cubs’ own among them, inning by inning, each number a
              steel plate put in by hand. Only the ball, strike and out counts in the middle are electric.
              <Cite id={["mlb-wrigley", "wbez-wrigley", "commons-wrigley-2012"]} />
            </p>
          </div>
        </div>
      </Exhibit>

      <Exhibit
        label="8.4"
        title="Hand-operated line score, after Wrigley Field"
        status="Illustrative game"
        surface="plain"
        instructions="Each cell is a slot. Hang a plate to add a run, a hit or an error; switch to “Take plates down” to remove one."
      >
        <LineScore />
      </Exhibit>

      <Exhibit
        label="8.5"
        title="Inside the Wrigley Field scoreboard"
        kind="Film"
        status="Video published by Great Big Story on YouTube, 2017"
        surface="plain"
      >
        <div className="film">
          <VideoEmbed id="2F5ovxn0ZdY" title="Inside One of Baseball’s Last Manual Scoreboards" by="Great Big Story" />
          <div className="film__text">
            <p className="kicker">Behind the numbers</p>
            <p className="film__lead">The score, carried by hand.</p>
            <p>
              A short film from inside the board: the ladders, the plates and the people who hang them while the game goes
              on outside.
              <Cite id="yt-wrigley" />
            </p>
          </div>
        </div>
      </Exhibit>

      <Prose>
        <h3>A, B, C: the half-time board</h3>
        <p>
          British football grounds once had a wonderfully indirect scoreboard. At half-time, an attendant hung metal
          number plates beside a row of letters: A 1–0, B 2–1, C 0–0. The letters meant nothing on their own. The match
          programme listed the day’s other fixtures, each with a letter, so a spectator had to hold a programme, or stand
          next to someone who did, to know that B was a derby three counties away.
          <Cite id={["arsenal-halftime", "gotnotgot-halftime"]} /> Transistor radios, and then electronic boards, made
          them obsolete.
        </p>
      </Prose>

      <Exhibit
        label="8.6"
        title="Half-time board and programme key"
        status="Invented fixtures"
        surface="plain"
        instructions="Try to find your team’s match on the board, then open the programme."
      >
        <HalfTimeBoard />
      </Exhibit>

      <Prose>
        <p>
          The score and its meaning lived in two separate objects, one on the wall and one in your coat pocket. It is a
          lovely example of how much reading a scoreboard can demand.
        </p>
        <h3>Curling: the board that is hard to explain</h3>
        <p>
          Many curling clubs use a scoreboard that baffles newcomers. The fixed numbers across the middle are not ends;
          they are points. After each end, the team that scored hangs a card showing the <em>end number</em> in its own
          row, under its new <em>total</em>. To read the score, find each team’s card furthest along the row.
          <Cite id={["seattle-curling", "curlingbasics"]} />
        </p>
        <p>
          It sounds backwards until you notice what it saves: a club needs one set of small end cards, not a box full of
          numbers for every possible score, and the board shows both the running total and when each point was scored.
        </p>
      </Prose>

      <Exhibit
        label="8.7"
        title="Curling club scoreboard: points in the middle"
        status="Illustrative game"
        surface="plain"
        instructions="Choose a team and how many stones counted, then hang the end card. Watch where it lands."
      >
        <CurlingBoard />
      </Exhibit>
    </Chapter>
  );
}
