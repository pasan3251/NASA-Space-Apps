import { Check, Lock } from "lucide-react";
import type { CSSProperties } from "react";
import type { CollectibleDefinition } from "../../data/collectibleCards";
import { getBook } from "../../data/books";

export function MissionCollectibleCard({
  card,
  unlocked,
  reverse = false,
  compact = false,
  newlyEarned = false,
}: {
  card: CollectibleDefinition;
  unlocked: boolean;
  reverse?: boolean;
  compact?: boolean;
  newlyEarned?: boolean;
}) {
  const book = getBook(card.missionId);
  return (
    <div
      className={`mission-card ${compact ? "card-compact" : ""} ${unlocked ? "card-unlocked" : "card-locked"} ${newlyEarned ? "card-earned" : ""} ${reverse ? "card-reverse" : ""}`}
      style={{ "--card-accent": card.accent } as CSSProperties}
    >
      <div className="card-inset">
        <div className="card-edition">
          {!compact && <span>Off-world</span>}
          <span className="ow-eyebrow">
            EXPEDITION {book.number}
            {compact && ` / ${book.volume}`}
          </span>
        </div>
        <div className="card-titles">
          {!compact && <em>{book.volume}</em>}
          <h3>{card.title}</h3>
          {!compact && <p>{book.spacecraft}</p>}
        </div>
        {reverse && unlocked ? (
          <div className="card-reverse-copy">
            <p className="ow-eyebrow">WHAT THE EQUIPMENT TAUGHT US</p>
            <p>{card.explanation}</p>
            <ul>
              <li>
                <Check size={15} />
                Equipment investigated
              </li>
              <li>
                <Check size={15} />
                Evidence explained
              </li>
              <li>
                <Check size={15} />
                Expedition completed
              </li>
            </ul>
            <p className="ow-caption">{card.sourceLabel}</p>
            <p className="ow-caption">
              Artwork is an illustrated reconstruction. Your expedition is
              fictional; the linked records are historical.
            </p>
            <p className="ow-eyebrow">SCIENTIFIC RECORD / REVERSE</p>
          </div>
        ) : (
          <>
            <div className="card-art">
              <img
                src={card.artwork}
                alt={card.alt}
                width="900"
                height="600"
                loading={compact ? "lazy" : "eager"}
              />
              <span className="card-art-label">ILLUSTRATED RECONSTRUCTION</span>
              {!compact && unlocked && (
                <div className="mission-seal">
                  <img
                    className="seal-edge"
                    src="/images/rewards/seal/edge.svg"
                    alt=""
                    width="90"
                    height="90"
                  />
                  <img
                    className="seal-inset"
                    src="/images/rewards/seal/inset.svg"
                    alt=""
                    width="76"
                    height="76"
                  />
                  <Check size={18} />
                  <span>
                    MISSION
                    <br />
                    COMPLETE
                  </span>
                  <i aria-hidden="true">✦</i>
                </div>
              )}
            </div>
            {compact ? (
              <>
                <p className="card-craft">{book.spacecraft}</p>
                <p className="card-status">
                  {unlocked ? (
                    <>
                      <Check size={15} />
                      Collected · Inspect card
                    </>
                  ) : (
                    <>
                      <Lock size={15} />
                      Locked · Complete this expedition
                    </>
                  )}
                </p>
                <p className="ow-muted">
                  {unlocked
                    ? "View the scientific record"
                    : "See how to unlock it"}
                </p>
              </>
            ) : (
              <>
                <p className="card-fact">
                  {unlocked
                    ? card.fact
                    : `Complete the ${book.volume} expedition. Investigate four records and answer the evidence question.`}
                </p>
                <p className="card-classification">{card.classification}</p>
                <div className="card-accomplishments">
                  <span>
                    {unlocked ? <Check size={14} /> : <Lock size={14} />}4
                    records
                  </span>
                  <span>
                    {unlocked ? <Check size={14} /> : <Lock size={14} />}
                    Evidence
                  </span>
                </div>
                <p className="card-status">
                  {unlocked
                    ? newlyEarned
                      ? "NEWLY EARNED / ADDED TO BACKPACK"
                      : "COLLECTED / MISSION COMPLETE"
                    : "LOCKED / COMPLETE THE EXPEDITION"}
                </p>
              </>
            )}
          </>
        )}
      </div>
      {newlyEarned && <span className="card-shine" aria-hidden="true" />}
    </div>
  );
}
