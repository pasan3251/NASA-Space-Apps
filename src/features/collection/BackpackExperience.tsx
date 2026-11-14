import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Backpack,
  BarChart3,
  Camera,
  Layers,
  MapPin,
  Radio,
  RotateCw,
} from "lucide-react";
import type {
  CardId,
  MissionId,
  SavedExpedition,
} from "../../types/expedition";
import { COLLECTIBLE_CARDS } from "../../data/collectibleCards";
import { BOOKS, getBook } from "../../data/books";
import { EXPEDITION_MISSIONS } from "../../data/expeditionMissions";
import { collectionCount } from "../../utils/expeditionProgress";
import { Brand } from "../library/ExpeditionLibrary";
import { ModalFrame } from "../../components/ModalFrame";
import { MissionCollectibleCard } from "../rewards/MissionCollectibleCard";

export function BackpackLauncher({
  onOpen,
  hasNew,
  expanded,
}: {
  onOpen: () => void;
  hasNew: boolean;
  expanded: boolean;
}) {
  return (
    <button
      className="backpack-launcher"
      onClick={onOpen}
      aria-label="Open Space Backpack"
      aria-expanded={expanded}
      aria-controls="space-backpack"
    >
      <img
        src="/images/rewards/offworld-backpack-shell.webp"
        alt=""
        width="36"
        height="54"
      />
      <Backpack className="launcher-mobile-icon" size={20} />
      <span>Space Backpack{hasNew && <small>New card</small>}</span>
    </button>
  );
}
export function CollectionProgress({ count }: { count: number }) {
  return (
    <div className="collection-progress">
      <span>
        {count} / {COLLECTIBLE_CARDS.length} Cards Collected
      </span>
      <div aria-hidden="true">
        {COLLECTIBLE_CARDS.map((card, i) => (
          <i key={card.id} className={i < count ? "filled" : ""} />
        ))}
      </div>
    </div>
  );
}

export function BackpackExperience({
  save,
  onClose,
  onBook,
  onView,
  onReward,
}: {
  save: SavedExpedition;
  onClose: () => void;
  onBook: (id: MissionId) => void;
  onView: (id: CardId) => void;
  onReward: (id: MissionId) => void;
}) {
  const [section, setSection] = useState("My Collection");
  const [filter, setFilter] = useState<MissionId | "all">("all");
  const [selected, setSelected] = useState<CardId | null>(null);
  const [reverse, setReverse] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const tileRefs = useRef<Partial<Record<CardId, HTMLButtonElement | null>>>(
    {},
  );
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [selected, section]);
  const card = COLLECTIBLE_CARDS.find((item) => item.id === selected);
  const select = (id: CardId) => {
    onView(id);
    setReverse(false);
    setSelected(id);
  };
  const back = () => {
    const id = selected;
    setSelected(null);
    setReverse(false);
    requestAnimationFrame(() => {
      if (id) tileRefs.current[id]?.focus({ preventScroll: true });
    });
  };
  const nav = [
    { name: "My Collection", Icon: Layers },
    { name: "Mission Rewards", Icon: Award },
    { name: "Expedition Progress", Icon: BarChart3 },
  ];
  return (
    <ModalFrame
      titleId="backpack-title"
      onClose={selected ? back : onClose}
      className="backpack-modal"
    >
      <main className="ow-shell backpack-experience" id="space-backpack">
        <header className="ow-header">
          <Brand />
          <p>Expedition library / Space Backpack</p>
        </header>
        <div className="backpack-heading">
          <div>
            <h1 id="backpack-title" ref={heading} tabIndex={-1}>
              {card ? card.title : "Space Backpack"}
            </h1>
            <p className="ow-muted">
              Your discoveries, packed for the next world.
            </p>
          </div>
          <CollectionProgress count={collectionCount(save)} />
        </div>
        {card ? (
          <>
            <button className="ow-button" onClick={back}>
              <ArrowLeft size={16} />
              Back to collection
            </button>
            <div className="card-detail">
              <MissionCollectibleCard
                card={card}
                unlocked={save.progress[card.missionId].completed}
                reverse={reverse}
              />
              <section>
                <p className="ow-eyebrow">
                  {getBook(card.missionId).volume} / EXPEDITION{" "}
                  {getBook(card.missionId).number}
                </p>
                <h2>
                  {save.progress[card.missionId].completed
                    ? "A discovery worth keeping."
                    : "An undiscovered story awaits."}
                </h2>
                <p>
                  {save.progress[card.missionId].completed
                    ? card.fact
                    : "Inspect all four historical records and complete this mission’s required evidence question. Optional reinforcement questions never block your reward."}
                </p>
                {save.progress[card.missionId].completed && (
                  <>
                    <button
                      className="ow-button"
                      aria-pressed={reverse}
                      onClick={() => setReverse((current) => !current)}
                    >
                      <RotateCw size={16} />
                      {reverse ? "Show front" : "Flip card"}
                    </button>
                    <h3>What the equipment taught us</h3>
                    <p>{card.explanation}</p>
                    <a
                      className="source-link"
                      href={card.source}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {card.sourceLabel} ↗
                    </a>
                    <p className="ow-caption">
                      “4 records” and “Evidence” identify your completed
                      learning tasks. They are not scientific ratings. The seal
                      marks your fictional expedition completion.
                    </p>
                  </>
                )}
                <button
                  className="ow-button ow-primary"
                  onClick={() => onBook(card.missionId)}
                >
                  Open {getBook(card.missionId).volume} book
                  <ArrowRight size={16} />
                </button>
              </section>
            </div>
          </>
        ) : (
          <div className="backpack-layout">
            <aside className="backpack-gear">
              <div className="gear-shell">
                <img
                  className="gear-closed"
                  src="/images/rewards/offworld-backpack-shell.webp"
                  alt=""
                  width="360"
                  height="540"
                />
                <img
                  className="gear-open"
                  src="/images/rewards/offworld-backpack-open-shell.webp"
                  alt=""
                  width="360"
                  height="540"
                />
                <span className="gear-brand">Off-world</span>
                <nav className="gear-nav" aria-label="Backpack sections">
                  {nav.map(({ name, Icon }) => (
                    <button
                      key={name}
                      aria-current={section === name ? "page" : undefined}
                      onClick={() => setSection(name)}
                    >
                      <Icon size={20} />
                      <span>{name}</span>
                    </button>
                  ))}
                </nav>
                <div className="gear-patches" aria-hidden="true">
                  <span>
                    <Camera size={22} />
                  </span>
                  <span>
                    <MapPin size={22} />
                  </span>
                  <span>
                    <Radio size={22} />
                  </span>
                </div>
              </div>
              <p className="ow-caption ow-muted">
                Book-theme patches decorate your gear. They are not extra
                rewards.
              </p>
            </aside>
            <section className="collection-content">
              <h2>
                {section === "My Collection" ? "My mission cards" : section}
              </h2>
              {section === "My Collection" ? (
                <>
                  <p className="ow-muted">
                    Select a card to inspect its story—or discover how to unlock
                    it.
                  </p>
                  <div
                    className="collection-filters"
                    aria-label="Filter cards by book"
                  >
                    {[
                      { id: "all" as const, volume: "All cards" },
                      ...BOOKS,
                    ].map((book) => (
                      <button
                        className="ow-button"
                        key={book.id}
                        aria-pressed={filter === book.id}
                        onClick={() => setFilter(book.id)}
                      >
                        {book.volume}
                      </button>
                    ))}
                  </div>
                  <div className="collection-grid">
                    {COLLECTIBLE_CARDS.filter(
                      (item) => filter === "all" || item.missionId === filter,
                    ).map((item) => (
                      <button
                        ref={(node) => {
                          tileRefs.current[item.id] = node;
                        }}
                        className="collection-tile"
                        key={item.id}
                        aria-label={`${item.title}, ${save.progress[item.missionId].completed ? "collected" : "locked"}`}
                        onClick={() => select(item.id)}
                      >
                        <MissionCollectibleCard
                          card={item}
                          unlocked={save.progress[item.missionId].completed}
                          compact
                        />
                        {save.collection[item.id]?.origin ===
                          "mission-completion" &&
                          !save.collection[item.id]?.firstViewedAt && (
                            <span className="new-card-marker">New card</span>
                          )}
                      </button>
                    ))}
                  </div>
                  <p className="ow-muted">
                    Three missions. Three obtainable cards. Each card carries
                    the science behind the achievement.
                  </p>
                </>
              ) : (
                <div className="collection-rows">
                  {EXPEDITION_MISSIONS.map((mission) => (
                    <article key={mission.id}>
                      <p className="ow-eyebrow">{getBook(mission.id).volume}</p>
                      <h3>{mission.name}</h3>
                      <p>
                        {save.progress[mission.id].discovered.length} /{" "}
                        {mission.discoveries.length} records inspected ·{" "}
                        {save.progress[mission.id].completed
                          ? "Evidence complete"
                          : "Evidence task pending"}
                      </p>
                      <button
                        className="ow-button"
                        onClick={() =>
                          section === "Mission Rewards" &&
                          save.progress[mission.id].completed
                            ? onReward(mission.id)
                            : onBook(mission.id)
                        }
                      >
                        {section === "Mission Rewards" &&
                        save.progress[mission.id].completed
                          ? "Inspect collected reward"
                          : "Continue expedition"}
                        <ArrowRight size={16} />
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </ModalFrame>
  );
}
