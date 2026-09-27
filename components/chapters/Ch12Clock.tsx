import { Certainty, Chapter, Cite, Exhibit, Prose } from "@/components/ui";
import { Photo } from "@/components/Media";
import ShotClock from "@/components/interactives/ShotClock";
import shotClockMonument from "@/media/syracuse-shot-clock-monument-2013.jpg";

export default function Ch12Clock() {
  return (
    <Chapter
      id="clock-in-the-score"
      number={12}
      title="The clock becomes part of the score"
      dek="A second number joins the scoreboard. It doesn’t say what you have done, only how long you have left to do it."
    >
      <Prose>
        <p className="lede">
          On 22 November 1950 the Fort Wayne Pistons beat the Minneapolis Lakers 19–18, still the lowest-scoring game in
          NBA history. Fort Wayne simply held the ball, sometimes for minutes at a time, to keep it away from the Lakers’
          giant centre, George Mikan. Nothing in the rules stopped them.
          <Cite id={["sportsmuseum-shotclock", "wbur-shotclock"]} />
        </p>
        <p>
          The fix came from Danny Biasone, owner of the Syracuse Nationals. In August 1954 he staged a scrimmage in
          Syracuse with a clock that gave the team in possession 24 seconds to shoot. The NBA adopted it that season.
          <Cite id={["hmdb-shotclock", "lemoyne-shotclock"]} />
        </p>
        <p>
          Why 24? The story, attributed to Biasone and his general manager Leo Ferris, is pure arithmetic. <Certainty level="documented">As told by Biasone</Certainty>
        </p>
      </Prose>

      <Exhibit id="shot-clock-sum" title="The shot-clock sum" kind="Arithmetic" surface="plain" width="text">
        <div className="sum">
          <div className="sum__row">
            <span className="sum__op" aria-hidden="true" />
            <span className="sum__n num">48</span>
            <span className="sum__u mono">minutes in a game</span>
          </div>
          <div className="sum__row">
            <span className="sum__op">×</span>
            <span className="sum__n num">60</span>
            <span className="sum__u mono">seconds a minute</span>
          </div>
          <div className="sum__row sum__row--rule">
            <span className="sum__op">=</span>
            <span className="sum__n num">2,880</span>
            <span className="sum__u mono">seconds</span>
          </div>
          <div className="sum__row">
            <span className="sum__op">÷</span>
            <span className="sum__n num">120</span>
            <span className="sum__u mono">shots in a well-played game, by Biasone’s reckoning</span>
          </div>
          <div className="sum__row sum__row--rule sum__row--answer">
            <span className="sum__op">=</span>
            <span className="sum__n num">24</span>
            <span className="sum__u mono">seconds per shot</span>
          </div>
        </div>
      </Exhibit>

      <Exhibit
        id="shot-clock-monument"
        title="The 24-second shot clock monument, Syracuse, October 2013"
        kind="Photograph"
        surface="plain"
      >
        <div className="film">
          <Photo
            image={shotClockMonument}
            alt="A shot clock on a tall black post in a small brick-paved park, its red digits reading 20, with a round plaque lower on the post. Autumn leaves cover the ground; behind it stands a brick building with signs for an Omnitheater and a planetarium."
            credit={{
              author: "Photo: Kai Brinker",
              source: "Wikimedia Commons",
              sourceUrl:
                "https://commons.wikimedia.org/wiki/File:Shot_Clock_Monument_in_Armory_Square_in_Syracuse,_New_York_(2013).jpg",
              licence: "CC BY-SA 2.0",
              licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
              changes: "cropped",
            }}
          />
          <div className="film__text">
            <p className="kicker">Syracuse remembers</p>
            <p className="film__lead">A monument that counts down.</p>
            <p>
              Syracuse unveiled a shot clock on a post as a monument on 26 March 2005. It stood for over twenty years in a
              small park on West Jefferson Street, where this picture was taken. In April 2026 it moved to the entrance of
              the Museum of Science and Technology, the building behind it here.
              <Cite id={["cny-shotclock-2026", "commons-shotclock-2013"]} />
            </p>
          </div>
        </div>
      </Exhibit>

      <Prose>
        <p>
          The effect was immediate: scoring in the league jumped in the first season with the clock.
          <Cite id="lemoyne-shotclock" /> But the deeper change is on the scoreboard. It now carries two numbers of a
          different kind. One records what you have achieved. The other counts down how long you have left to try.
        </p>
        <p>
          Korfball, the mixed-gender sport invented in the Netherlands, runs the same idea with 25 seconds. The attacking
          side must produce a shot that scores or touches the korf within the limit; when a shot touches the korf, the
          clock resets.
          <Cite id="ikf-rules" />
        </p>
      </Prose>

      <Exhibit
        id="shot-clock"
        title="Shot clock"
        surface="board"
        instructions={
          <>
            Start the clock, then reset it with a shot before it runs out. Keys: <kbd className="kbd">S</kbd> start or
            pause, <kbd className="kbd">R</kbd> shot hits the target (while a control has focus).
          </>
        }
      >
        <ShotClock />
      </Exhibit>

      <Prose>
        <p>
          Watch how your attention moves while the clock is running. The game score barely changes; the shot clock changes
          every second. A number that isn’t a score at all has become the thing that drives what players do.
        </p>
      </Prose>
    </Chapter>
  );
}
