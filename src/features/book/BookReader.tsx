import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import { getBook } from "../../data/books";
import { Brand, BookCover } from "../library/ExpeditionLibrary";
import { STORY_MEDIA } from "../../data/bookStories";
import { BookInvestigation } from "../science/BookInvestigation";
import type {
  ExpeditionMission,
  MissionProgress,
} from "../../types/expedition";

export function BookReader({
  mission,
  progress,
  page,
  onPage,
  onExplore,
  onLibrary,
  suspended = false,
}: {
  mission: ExpeditionMission;
  progress: MissionProgress;
  page: number;
  onPage: (page: number) => void;
  onExplore: () => void;
  onLibrary: () => void;
  suspended?: boolean;
}) {
  const book = getBook(mission.id);
  const media = STORY_MEDIA[mission.id];
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    heading.current?.closest("main")?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [page]);
  const labels = [
    "Introduction",
    "Mission story",
    "Scientific investigation",
    "Field briefing",
  ];
  return (
    <main
      className="ow-shell reader"
      data-theme={mission.id}
      onKeyDown={(event) => {
        if (
          (event.target as HTMLElement).closest(
            "input,select,textarea,summary",
          ) ||
          event.altKey ||
          event.ctrlKey ||
          event.metaKey
        )
          return;
        if (event.key === "ArrowLeft" && page > 0) {
          event.preventDefault();
          onPage(page - 1);
        }
        if (event.key === "ArrowRight" && page < 3) {
          event.preventDefault();
          onPage(page + 1);
        }
      }}
    >
      <header className="ow-header">
        <Brand />
        <p>
          {book.volume} / {labels[page]}
        </p>
        <button className="ow-button" onClick={onLibrary}>
          <ArrowLeft size={16} /> Expedition Library
        </button>
      </header>
      <section className="ow-intro">
        <p className="ow-eyebrow">
          {book.number} / {book.volume} · FIELD NOTES
        </p>
        <h1 ref={heading} tabIndex={-1}>
          {book.title}
        </h1>
      </section>
      {page === 0 ? (
        <section className="reader-introduction">
          <BookCover book={book} />
          <div>
            <p className="ow-eyebrow">OPEN A NEW CHAPTER</p>
            <h2>Some journeys leave more than footprints.</h2>
            <p>{mission.introduction}</p>
            <button className="ow-button ow-primary" onClick={() => onPage(1)}>
              Begin reading <ArrowRight size={18} />
            </button>
            <p className="ow-muted">
              Historical records guide an imagined future expedition.
            </p>
          </div>
        </section>
      ) : page === 2 ? (
        <BookInvestigation key={mission.id} missionId={mission.id} suspended={suspended} />
      ) : (
        <section className="reader-spread" key={page}>
          <article className="reader-page">
            <p className="ow-eyebrow">{mission.name}</p>
            <h2>
              {page === 1
                ? "An object becomes evidence."
                : page === 2
                  ? "Follow the science."
                  : "Your expedition starts here."}
            </h2>
            <p>
              {page === 1
                ? mission.introduction
                : page === 2
                  ? mission.legacy
                  : mission.arrival}
            </p>
            <blockquote>
              <span className="ow-eyebrow">YOUR INVESTIGATION</span>
              <p>{mission.question}</p>
            </blockquote>
            <dl className="reader-facts">
              <div>
                <dt>Mission</dt>
                <dd>{mission.name}</dd>
              </div>
              <div>
                <dt>Historical status</dt>
                <dd>{mission.statusLabel}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{mission.coordinatesLabel}</dd>
              </div>
            </dl>
            <button
              className="ow-button ow-paper-action"
              onClick={page < 3 ? () => onPage(page + 1) : onExplore}
            >
              {page < 3 ? "Continue investigation" : "Explore this mission"}
              <ArrowRight size={18} />
            </button>
          </article>
          <article className="reader-page">
            {page === 1 ? (
              <figure>
                <img className="reader-photo" src={media.src} alt={media.alt} />
                <figcaption className="ow-caption">
                  {media.caption}{" "}
                  <a href={media.source} target="_blank" rel="noreferrer">
                    View original ↗
                  </a>
                </figcaption>
              </figure>
            ) : (
              <>
                <div className="reader-art">
                  <img
                    src={book.cover}
                    width="300"
                    height="220"
                    alt={`Schematic illustration of ${mission.name}; not to scale`}
                  />
                </div>
                <p className="ow-caption">
                  Original schematic reconstruction · not a photograph.
                </p>
              </>
            )}
            <h3>Look a little closer.</h3>
            <ul className="reader-records">
              {mission.discoveries.map((item) => (
                <li key={item.id}>
                  {progress.discovered.includes(item.id) ? (
                    <Check size={16} />
                  ) : (
                    <span aria-hidden="true">○</span>
                  )}
                  {item.title}
                </li>
              ))}
            </ul>
            <details className="reader-sources">
              <summary>
                Historical sources · {mission.sources.length} records
              </summary>
              {mission.sources.map((source) => (
                <p key={source.id}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title} <ExternalLink size={12} />
                  </a>
                  <small>{source.credit}</small>
                </p>
              ))}
            </details>
            <p className="ow-caption">{mission.sceneNote}</p>
          </article>
        </section>
      )}
      <nav className="reader-pagination" aria-label={`${book.volume} pages`}>
        <button
          className="ow-button"
          disabled={page === 0}
          onClick={() => onPage(page - 1)}
        >
          <ArrowLeft size={16} />
          Previous
        </button>
        <span>
          {page + 1} / 4 · {labels[page]}
        </span>
        <button
          className="ow-button ow-primary"
          onClick={page < 3 ? () => onPage(page + 1) : onExplore}
        >
          {page < 3 ? "Next page" : "Enter mission"}
          <ArrowRight size={16} />
        </button>
      </nav>
    </main>
  );
}
