"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { QUESTIONS } from "@/lib/quiz";
import { anchorOf, notationById } from "@/lib/notations";
import { placeById, placeLabel } from "@/lib/places";
import { SOURCES } from "@/lib/sources";

/**
 * "Read the scoreboard": the reader plays against the board. A right answer is
 * a point to them, a wrong one a point to the scoreboard. Every explanation is
 * the essay's own text, with its sources and a link to where the essay shows it.
 */
export default function Quiz() {
  const [q, setQ] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState({ you: 0, board: 0 });
  const [done, setDone] = useState(false);
  const promptRef = useRef<HTMLHeadingElement>(null);
  const verdictRef = useRef<HTMLParagraphElement>(null);
  const endRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);

  const question = QUESTIONS[q];
  const n = notationById(question.notation);
  const place = placeById(n.place);
  const right = chosen === question.answer;

  // Keep keyboard and screen-reader focus where the action is.
  useEffect(() => {
    if (!started.current) {
      started.current = true;
      return;
    }
    if (done) endRef.current?.focus();
    else if (chosen !== null) verdictRef.current?.focus();
    else promptRef.current?.focus();
  }, [q, chosen, done]);

  const answer = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    setScore((s) => (i === question.answer ? { ...s, you: s.you + 1 } : { ...s, board: s.board + 1 }));
  };

  const next = () => {
    if (q + 1 >= QUESTIONS.length) {
      setDone(true);
      return;
    }
    setQ(q + 1);
    setChosen(null);
  };

  const again = () => {
    setQ(0);
    setChosen(null);
    setScore({ you: 0, board: 0 });
    setDone(false);
  };

  const board = (
    <div className="qscore" aria-label={`Score: you ${score.you}, the scoreboard ${score.board}`} role="img">
      <span className="qscore__side mono">You</span>
      <span className="qscore__plate num">{score.you}</span>
      <span className="qscore__dash num" aria-hidden="true">
        –
      </span>
      <span className="qscore__plate num">{score.board}</span>
      <span className="qscore__side mono">The scoreboard</span>
    </div>
  );

  if (done) {
    const verdict =
      score.you >= 8
        ? "You read scoreboards like a native."
        : score.you >= 5
          ? "A fair result. The essay settles the rest."
          : "The scoreboard wins this one. The essay explains every answer.";
    return (
      <div className="quiz">
        <div className="quiz__end">
          <h2 className="quiz__end-title" tabIndex={-1} ref={endRef}>
            Full time
          </h2>
          {board}
          <p className="quiz__verdict-end">{verdict}</p>
          <div className="btn-row">
            <button type="button" className="btn btn--solid" onClick={again}>
              Play again
            </button>
            <Link className="btn" href="/">
              Read the essay
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz__top">
        {board}
        <p className="quiz__count mono">
          Question {q + 1} of {QUESTIONS.length}
        </p>
      </div>

      <div className="quiz__card">
        <div className="quiz__board" aria-hidden="true">
          <span className="num">{question.board ?? n.notation}</span>
          {!question.board && n.tag && <span className="quiz__tag mono">{n.tag}</span>}
        </div>
        <h2 className="quiz__prompt" tabIndex={-1} ref={promptRef}>
          <span className="visually-hidden">The board shows {question.board ?? `${n.notation}${n.tag ? ` ${n.tag}` : ""}`}. </span>
          {question.prompt}
        </h2>

        <ul className="quiz__options">
          {question.options.map((o, i) => {
            const state =
              chosen === null ? "" : i === question.answer ? " is-right" : i === chosen ? " is-wrong" : " is-out";
            return (
              <li key={o}>
                <button
                  type="button"
                  className={`quiz__option${state}`}
                  onClick={() => answer(i)}
                  aria-disabled={chosen !== null}
                >
                  <span className="quiz__mark mono" aria-hidden="true">
                    {chosen === null ? String.fromCharCode(65 + i) : i === question.answer ? "✓" : i === chosen ? "✗" : ""}
                  </span>
                  <span>{o}</span>
                  {chosen !== null && i === question.answer && <span className="visually-hidden"> (right answer)</span>}
                  {chosen !== null && i === chosen && i !== question.answer && (
                    <span className="visually-hidden"> (your answer)</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {chosen !== null && (
          <div className="quiz__answer">
            <p className={`quiz__verdict${right ? " is-right" : " is-wrong"}`} tabIndex={-1} ref={verdictRef}>
              {right ? "Right. A point to you." : `Not quite: ${question.options[question.answer]}. A point to the scoreboard.`}
            </p>
            <p className="quiz__reading">{n.reading}</p>
            {n.sources.length > 0 && (
              <p className="quiz__sources mono">
                {n.sources.length === 1 ? "Source" : "Sources"}:{" "}
                {n.sources.map((id, i) => {
                  const s = SOURCES.find((x) => x.id === id);
                  return s ? (
                    <span key={id}>
                      {i > 0 && " · "}
                      <a href={s.url} target="_blank" rel="noreferrer">
                        {s.publisher}
                      </a>
                    </span>
                  ) : null;
                })}
              </p>
            )}
            <p className="quiz__more">
              <Link href={`/#${anchorOf(n)}`}>
                In the essay: <span className="num">{placeLabel(place.id)}</span> {place.name}{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </p>
            <button type="button" className="btn btn--solid" onClick={next}>
              {q + 1 >= QUESTIONS.length ? "Final score" : "Next question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
