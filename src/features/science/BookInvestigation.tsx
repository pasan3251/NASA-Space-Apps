import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { MissionId } from "../../types/expedition";
import { EDL_EVENTS, STORY_MEDIA } from "../../data/bookStories";
import { PioneerLightTime } from "./PioneerLightTime";

export function BookInvestigation({ missionId, suspended = false }: { missionId: MissionId; suspended?: boolean }) {
  const [index, setIndex] = useState(0);
  const [evidence, setEvidence] = useState<
    "photo" | "tests" | "reconstruction"
  >("tests");
  if (missionId === "pioneer") return <PioneerLightTime suspended={suspended} />;
  if (missionId === "curiosity") {
    const event = EDL_EVENTS[index];
    return (
      <section className="reader-spread">
        <article className="reader-page">
          <p className="ow-eyebrow">6 AUGUST 2012 · EVENT TIME AT MARS</p>
          <h2>Seven minutes of terror</h2>
          <p>
            Landing was a sequence of different engineering jobs. Follow what
            each piece of equipment did, and why it was left behind.
          </p>
          <ol className="timeline-events">
            {EDL_EVENTS.map((item, i) => (
              <li key={item.title}>
                <button
                  onClick={() => setIndex(i)}
                  aria-current={index === i ? "step" : undefined}
                >
                  {String(i + 1).padStart(2, "0")} · {item.title}
                </button>
              </li>
            ))}
          </ol>
          <label className="signal-scrubber">
            Mission timeline
            <input
              type="range"
              min="0"
              max={EDL_EVENTS.length - 1}
              value={index}
              aria-valuetext={event.title}
              onChange={(e) => setIndex(Number(e.target.value))}
            />
          </label>
        </article>
        <article className="reader-page">
          <div className="edl-stage">
            <img
              src="/images/covers/mars.svg"
              width="300"
              height="220"
              alt="Schematic of the rover and landing equipment; stages are explained in the text below."
            />
            <span>
              {index + 1} / {EDL_EVENTS.length}
            </span>
          </div>
          <div className="timeline-record" aria-live="polite">
            <p className="ow-eyebrow">{event.time}</p>
            <h2>{event.title}</h2>
            <h3>{event.equipment}</h3>
            <p>{event.purpose}</p>
            <blockquote>
              <span className="ow-eyebrow">WHAT HAPPENED TO IT?</span>
              <p>{event.fate}</p>
            </blockquote>
          </div>
          <div className="science-controls">
            <button
              className="ow-button"
              disabled={index === 0}
              onClick={() => setIndex((i) => i - 1)}
            >
              <ArrowLeft size={16} />
              Previous event
            </button>
            <button
              className="ow-button"
              disabled={index === EDL_EVENTS.length - 1}
              onClick={() => setIndex((i) => i + 1)}
            >
              Next event
              <ArrowRight size={16} />
            </button>
          </div>
          <p className="ow-caption">
            Earth received touchdown at 05:31:45.4 UTC, about 13m48s later.
            Event occurrence and Earth reception are different times.
          </p>
          <a
            href="https://www.jpl.nasa.gov/news/timeline-of-major-mission-events-during-curiositys-landing/"
            target="_blank"
            rel="noreferrer"
          >
            JPL post-landing timeline · 9 August 2012 ↗
          </a>
        </article>
      </section>
    );
  }
  return (
    <section className="reader-spread">
      <article className="reader-page">
        <p className="ow-eyebrow">SURVEYOR 3 / APOLLO 12</p>
        <h2>The camera that became evidence</h2>
        <p>
          After about 2½ years on the Moon, the television camera returned to
          Earth. Engineers examined its optics, electronics, mechanisms,
          materials and coatings.
        </p>
        <div className="science-controls" aria-label="Choose an evidence view">
          {(["photo", "tests", "reconstruction"] as const).map((tab) => (
            <button
              key={tab}
              className="ow-button"
              aria-pressed={evidence === tab}
              onClick={() => setEvidence(tab)}
            >
              {tab === "photo"
                ? "Historical photo"
                : tab === "tests"
                  ? "Laboratory tests"
                  : "Illustration"}
            </button>
          ))}
        </div>
        <div aria-live="polite">
          <h3>
            {evidence === "photo"
              ? "The visit was documented."
              : evidence === "tests"
                ? "Wear tells an engineering story."
                : "A reconstruction explains form."}
          </h3>
          <p>
            {evidence === "photo"
              ? "Apollo 12 photographs document astronauts visiting Surveyor 3. A photograph alone cannot establish how electrical or optical performance changed."
              : evidence === "tests"
                ? "Most camera parts withstood the environment well. The report linked surface discoloration to lunar dust contamination and radiation damage. Very little evidence of micrometeoroid impact is not the same as proof that no impacts occurred."
                : "This original illustration shows the camera’s cylindrical body and scanning-mirror hood. Its painted wear and background are artistic choices, not measured test results."}
          </p>
        </div>
        <blockquote>
          <span className="ow-eyebrow">FOLLOW THE EVIDENCE</span>
          <p>
            Which record would help you evaluate a material’s performance: a
            landing photograph, or tests of the returned hardware?
          </p>
        </blockquote>
        <a
          href="https://ntrs.nasa.gov/citations/19710024418"
          target="_blank"
          rel="noreferrer"
        >
          Read NASA-CR-121796 ↗
        </a>
      </article>
      <article className="reader-page">
        <figure>
          <img
            className="reader-photo"
            src={
              evidence === "reconstruction"
                ? "/images/rewards/surveyor-camera-illustration.webp"
                : STORY_MEDIA.surveyor.src
            }
            alt={
              evidence === "reconstruction"
                ? "Illustrated reconstruction of the returned Surveyor camera; decorative wear is not evidence."
                : STORY_MEDIA.surveyor.alt
            }
          />
          <figcaption className="ow-caption">
            {evidence === "reconstruction"
              ? "Original AI-assisted illustrated reconstruction. Not a laboratory photograph."
              : STORY_MEDIA.surveyor.caption}
          </figcaption>
        </figure>
        <h3>Equipment → purpose → fate → knowledge</h3>
        <p>
          Camera → observe the Moon → returned by Apollo 12 → test how materials
          and instruments endured lunar exposure.
        </p>
        <p className="ow-caption">
          The report describes specific observations. It does not establish that
          all equipment survives every lunar condition.
        </p>
      </article>
    </section>
  );
}
