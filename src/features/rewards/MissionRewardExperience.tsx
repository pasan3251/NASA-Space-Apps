import { useEffect, useRef, useState } from "react";
import { ArrowRight, RotateCw } from "lucide-react";
import type { MissionId, OptionalAttempt } from "../../types/expedition";
import { COLLECTIBLE_CARDS } from "../../data/collectibleCards";
import { OPTIONAL_QUESTIONS } from "../../data/optionalQuestions";
import { getBook } from "../../data/books";
import type { CSSProperties } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { ModalFrame } from "../../components/ModalFrame";
import { MissionCollectibleCard } from "./MissionCollectibleCard";

export function MissionRewardExperience({
  missionId,
  replay,
  attempt,
  onAttempt,
  onViewed,
  onClose,
  onCollection,
  onBook,
}: {
  missionId: MissionId;
  replay: boolean;
  attempt?: OptionalAttempt;
  onAttempt: (answer: number, correct: boolean) => void;
  onViewed: () => void;
  onClose: () => void;
  onCollection: () => void;
  onBook: () => void;
}) {
  const [stage, setStage] = useState<"complete" | "question" | "earned">(
    replay ? "earned" : "complete",
  );
  const [reverse, setReverse] = useState(false);
  const [animate, setAnimate] = useState(false);
  const revealed = useRef(replay);
  const reduced = useReducedMotion();
  const heading = useRef<HTMLHeadingElement>(null);
  const card = COLLECTIBLE_CARDS.find((item) => item.missionId === missionId)!;
  const question = OPTIONAL_QUESTIONS[missionId];
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [stage]);
  const reveal = (withMotion = true) => {
    setAnimate(withMotion && !revealed.current && !reduced);
    revealed.current = true;
    onViewed();
    setStage("earned");
  };
  return (
    <ModalFrame
      titleId="reward-title"
      onClose={onClose}
      className="reward-modal"
    >
      <main className="ow-shell reward-experience">
        <p className="ow-eyebrow">
          EXPEDITION {getBook(missionId).number} / {getBook(missionId).volume}
        </p>
        <h1 id="reward-title" ref={heading} tabIndex={-1}>
          {replay
            ? "Already collected. Still worth exploring."
            : stage === "question"
              ? "One more discovery?"
              : stage === "earned"
                ? "A discovery worth keeping."
                : "Mission complete."}
        </h1>
        <p className="reward-intro" role="status">
          {replay
            ? "Your card is already in your Space Backpack. Replaying never adds a duplicate."
            : "Your evidence conclusion is saved. Your card is already in your Space Backpack."}
        </p>
        {stage === "question" ? (
          <section className="debrief">
            <p className="ow-eyebrow">
              OPTIONAL REINFORCEMENT · NO REWARD PENALTY
            </p>
            <h2>{question.question}</h2>
            <div className="debrief-answers">
              {question.options.map((option, i) => (
                <button
                  className="ow-button"
                  aria-pressed={attempt?.answer === i}
                  key={option}
                  onClick={() => onAttempt(i, i === question.correctIndex)}
                >
                  {String.fromCharCode(65 + i)} · {option}
                </button>
              ))}
            </div>
            {attempt?.answer !== null && attempt?.answer !== undefined && (
              <div role="status" className="debrief-feedback">
                <strong>
                  {attempt.correct
                    ? "That fits the evidence."
                    : "Try again, or continue at any time."}
                </strong>
                <p>{question.explanation}</p>
              </div>
            )}
            <button className="ow-button ow-primary" onClick={() => reveal()}>
              {attempt?.correct ? "Reveal my card" : "Skip and reveal card"}
              <ArrowRight size={16} />
            </button>
          </section>
        ) : (
          <div className="reward-layout">
            <div
              className={
                stage === "earned" && animate ? "reward-card-revealed" : ""
              }
            >
              {stage === "complete" ? (
                <div
                  className="sealed-card"
                  style={
                    {
                      "--volume-cover": getBook(missionId).theme,
                    } as CSSProperties
                  }
                >
                  <h2>Off-world</h2>
                  <p className="ow-eyebrow">
                    EXPEDITION {getBook(missionId).number}
                  </p>
                  <img
                    src={getBook(missionId).cover}
                    width="300"
                    height="220"
                    alt=""
                  />
                  <span>
                    Mission complete.
                    <br />A field discovery, waiting to be revealed.
                  </span>
                </div>
              ) : (
                <MissionCollectibleCard
                  card={card}
                  unlocked
                  reverse={reverse}
                  newlyEarned={animate}
                />
              )}
            </div>
            <section>
              <p className="ow-eyebrow">{card.classification}</p>
              <h2>{card.title}</h2>
              <p>{card.fact}</p>
              {stage === "complete" ? (
                <>
                  <button
                    className="ow-button ow-primary"
                    onClick={() => reveal()}
                  >
                    Reveal my card
                    <ArrowRight size={16} />
                  </button>
                  <button
                    className="ow-button"
                    onClick={() => setStage("question")}
                  >
                    Try an optional question
                  </button>
                  <button className="reward-skip" onClick={() => reveal(false)}>
                    Skip animation and inspect card
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="ow-button"
                    onClick={() => setReverse((value) => !value)}
                    aria-pressed={reverse}
                  >
                    <RotateCw size={16} />
                    {reverse ? "Show front" : "Flip card"}
                  </button>
                  <a
                    className="source-link"
                    href={card.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read the scientific record ↗
                  </a>
                  <button
                    className="ow-button ow-primary"
                    onClick={onCollection}
                  >
                    Open Space Backpack
                    <ArrowRight size={16} />
                  </button>
                  <button className="ow-button" onClick={onBook}>
                    Continue reading
                  </button>
                  {!replay && (
                    <button
                      className="reward-skip"
                      onClick={() => setStage("question")}
                    >
                      Optional reinforcement question
                    </button>
                  )}
                </>
              )}
            </section>
          </div>
        )}
      </main>
    </ModalFrame>
  );
}
