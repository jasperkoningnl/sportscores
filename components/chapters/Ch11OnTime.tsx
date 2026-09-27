import { Chapter, Cite, Exhibit, Prose, PullLine } from "@/components/ui";
import { VideoEmbed } from "@/components/Media";
import RallySim from "@/components/interactives/RallySim";
import { EVENTS } from "@/lib/events";
import { SPORTS } from "@/lib/sports";

// The reform timeline is drawn from lib/events.ts.
const TIMELINE = EVENTS.filter((e) => e.list === "reforms");

export default function Ch11OnTime() {
  return (
    <Chapter
      id="score-learns-to-stop"
      number={11}
      title="The score learns to stop"
      dek="A score has to decide a winner. Increasingly, it also has to end on time."
    >
      <Prose>
        <p className="lede">
          Remember the tennis game that can in principle go on forever? For most of tennis history, so could a set. The
          tie-break exists to stop that. Jimmy Van Alen’s campaign was about keeping matches to a length that spectators,
          players and organisers could live with, and television was only one of the parties with an interest.
          <Cite id={["ithf-vanalen", "tennis-com-1970"]} />
        </p>
        <p>
          It would be too neat to say the tie-break was invented for TV. But over the following decades, one sport after
          another reshaped its scoring in ways that made matches shorter, more regular and easier to follow, and those are
          exactly the qualities a broadcaster needs.
        </p>
      </Prose>

      <Prose>
        <h3>What happens without one</h3>
        <p>
          Wimbledon kept its final set open-ended for decades. In 2010 John Isner and Nicolas Mahut showed what that can
          mean: their fifth set finished 70–68, in a first-round match that lasted 11 hours and 5 minutes over three days.
          <Cite id="wiki-isner-mahut" /> After another marathon, Kevin Anderson’s 26–24 fifth set against Isner in the
          2018 semi-final, Wimbledon introduced a final-set tie-break at 12–12 from 2019.
          <Cite id="espn-wimbledon-2019" /> Since 2022 all four Grand Slams play a 10-point tie-break at 6–6 in the final
          set.
          <Cite id="tennis-com-2022" />
        </p>
      </Prose>

      <Exhibit
        id="isner-mahut-film"
        title="Isner v Mahut, Wimbledon 2010: the set that would not end"
        kind="Film"
        status="Video published by Wimbledon on YouTube"
        surface="plain"
      >
        <div className="film">
          <VideoEmbed id="J9M-XwUhYH4" title="John Isner v Nicolas Mahut, Wimbledon 2010 first round, extended highlights" />
          <div className="film__text">
            <p className="kicker">70–68</p>
            <p className="film__lead">One set, 138 games.</p>
            <p>
              Watch the scoreboard more than the tennis. At some point the numbers stop meaning anything to anyone except
              the two players.
              <Cite id="yt-isner-mahut" />
            </p>
          </div>
        </div>
      </Exhibit>

      <Exhibit id="reform-timeline" title="Scoring reforms that tamed the clock" kind="Timeline" surface="plain">
        <ol className="timeline">
          {TIMELINE.map((t) => (
            <li key={t.id} className="timeline__item">
              <span className="timeline__year num">{t.year}</span>
              <span className="timeline__sport mono">{t.sport ? SPORTS[t.sport] : ""}</span>
              <span className="timeline__change">
                {t.text}
                <Cite id={t.sources} />
              </span>
            </li>
          ))}
        </ol>
      </Exhibit>

      <Prose>
        <h3>Volleyball: why every rally now counts</h3>
        <p>
          Under the old side-out system, only the serving team could score. Win a rally on the other side’s serve and you
          simply won the serve back. Long sequences of rallies could pass with the scoreboard frozen, which made a set’s
          length hard to predict. Rally scoring gives a point for every rally, whoever served.
          <Cite id="fivb-game" /> Badminton made the same switch in 2006, a change usually explained as making matches
          more predictable for spectators and broadcasters.
          <Cite id="badminton-asia" />
        </p>
        <p>You can see the effect without any real match data. Here are thousands of simulated sets under each system.</p>
      </Prose>

      <Exhibit
        id="rally-sim"
        title="How long is a set? Side-out versus rally scoring"
        kind="Simulation"
        surface="paper"
        instructions="Drag the slider to change how often the serving side wins a rally. Hover over the bars for exact shares."
      >
        <RallySim />
      </Exhibit>

      <PullLine>A modern score must not only decide a winner. It also has to fit a broadcast schedule.</PullLine>
    </Chapter>
  );
}
