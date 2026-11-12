import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight, Compass, ExternalLink, Feather, List, MoveRight, Rocket, Sparkles, VolumeX } from 'lucide-react';
import type { ExpeditionMission, ExpeditionProgress, MissionId } from '../../types/expedition';
import './book.css';

interface BookExperienceProps {
  missions: ExpeditionMission[];
  progress: ExpeditionProgress;
  onExplore: (id: MissionId) => void;
  initialMissionId?: MissionId;
  onPageChange?: (id: MissionId | undefined) => void;
}

function OrbitMark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
    <circle cx="100" cy="100" r="62" stroke="currentColor" strokeWidth="1" />
    <ellipse cx="100" cy="100" rx="92" ry="31" transform="rotate(-36 100 100)" stroke="currentColor" strokeWidth="1" />
    <path d="M100 22v17m0 122v17M22 100h17m122 0h17" stroke="currentColor" />
    <circle cx="100" cy="100" r="9" fill="currentColor" />
    <circle cx="151" cy="65" r="5" fill="currentColor" />
    <circle cx="48" cy="134" r="3" fill="currentColor" />
  </svg>;
}

/** Orthographic component diagrams: intentional schematics, never mission photographs. */
function MissionDiagram({ mission }: { mission: ExpeditionMission }) {
  const isMars = mission.id === 'curiosity';
  const isMoon = mission.id === 'surveyor';
  return <svg className="book-mission-diagram" viewBox="0 0 540 330" role="img" aria-label={`Simplified ${mission.name} component diagram; not a photograph or measured drawing`}>
    <g stroke="currentColor" strokeWidth="1" fill="none" opacity=".19">
      <circle cx="270" cy="165" r="124" /><circle cx="270" cy="165" r="102" />
      <path d="M270 22v31m0 224v31M112 165h31m254 0h31" />
    </g>
    {isMars ? <g stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round">
      <path d="M166 153h187v49H166zM177 142h163v11M230 142V88h15v54M218 88h45V72h-45zM237 72V55M263 80h23v10h-23M333 153v-35l22-18 21 18v35M333 122h43M172 169l-34-17-26 42M112 194l-20-3-12 21 22 12 15-21M177 202l-30 25m37-25 23 25m91-25-8 25m51-25 20 25M145 227h214" />
      {[158, 231, 318, 368].map(x => <g key={x}><circle cx={x} cy="241" r="22" /><circle cx={x} cy="241" r="12" /><path d={`M${x - 14} 225l28 32m-32-25 36 17`} /></g>)}
      <path d="M247 104h68l21-32M165 168h-34l-21-45M337 184h64l24-38" strokeWidth="1" />
      <circle cx="247" cy="104" r="3" fill="currentColor" /><circle cx="165" cy="168" r="3" fill="currentColor" /><circle cx="337" cy="184" r="3" fill="currentColor" />
    </g> : isMoon ? <g stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round">
      <path d="M222 104h91l27 72H198zM236 104V72h61v32M240 72V49h42v23M261 49V32M211 149l-57 94m164-94 64 94M269 176v86M135 246h40m186 0h42m-154 20h40M198 176l71 86 71-86M218 119l102 41m-117 0 106-41M226 104l71 72m-71 0 71-72M225 152l-45 27-33-14M145 165l-18 17 14 14 19-16" />
      <path d="M298 85h72l24-38M241 58h-61l-24-23M159 230H99l-20-31" strokeWidth="1" />
      <circle cx="298" cy="85" r="3" fill="currentColor" /><circle cx="241" cy="58" r="3" fill="currentColor" /><circle cx="159" cy="230" r="3" fill="currentColor" />
    </g> : <g stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round">
      <circle cx="274" cy="152" r="72" /><ellipse cx="274" cy="152" rx="20" ry="72" />
      <path d="M202 152h144m-125-51 106 102m-106 0 106-102M274 152l-44-27m44 27 44-27M274 80V48M265 48h18M274 224v32h-27v-32M246 235l-81 32m84-42-95-29M300 228l72 31M154 196l-23-8-8 23 23 8zM165 267l-23 8 8 23 23-8zM371 259l24 7-7 24-24-7zM260 246h26" />
      <path d="M345 152h58l26-35M145 204H95l-21-28M274 48h61l24-23" strokeWidth="1" />
      <circle cx="345" cy="152" r="3" fill="currentColor" /><circle cx="145" cy="204" r="3" fill="currentColor" /><circle cx="274" cy="48" r="3" fill="currentColor" />
    </g>}
  </svg>;
}

function SourceLinks({ mission }: { mission: ExpeditionMission }) {
  return <details className="book-source-details">
    <summary>Historical sources <span>{mission.sources.length} records</span></summary>
    <ul>{mission.sources.map(source => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.title}<ExternalLink size={12} aria-hidden="true" /></a><small>{source.credit}</small></li>)}</ul>
  </details>;
}

export function BookExperience({ missions, progress, onExplore, initialMissionId, onPageChange }: BookExperienceProps) {
  const [page, setPage] = useState(() => initialMissionId ? Math.max(0, missions.findIndex(mission => mission.id === initialMissionId)) + 2 : -1);
  const [turn, setTurn] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const lastPage = missions.length + 3;
  const mission = page >= 2 && page < missions.length + 2 ? missions[page - 2] : undefined;
  const journalPage = missions.length + 2;
  const completed = missions.filter(item => progress[item.id]?.completed).length;

  const goTo = useCallback((next: number) => {
    const bounded = Math.max(-1, Math.min(lastPage, next));
    setDirection(bounded >= page ? 'forward' : 'backward');
    setPage(bounded);
    setTurn(value => value + 1);
  }, [lastPage, page]);

  useEffect(() => {
    onPageChange?.(mission?.id);
  }, [mission?.id, onPageChange]);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    headingRef.current?.focus({ preventScroll: true });
  }, [page]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select, summary, [role="slider"]'))) return;
      if (event.key === 'ArrowRight' && page < lastPage) { event.preventDefault(); goTo(page + 1); }
      if (event.key === 'ArrowLeft' && page > -1) { event.preventDefault(); goTo(page - 1); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goTo, lastPage, page]);

  const pageLabel = page === -1 ? 'The cover' : page === 0 ? 'A note to the explorer' : page === 1 ? 'Contents' : mission ? `${mission.destination} / ${mission.name}` : page === journalPage ? 'Your expedition journal' : 'Sources & credits';

  return <main className="book-experience" data-reduced-motion={reducedMotion} aria-label="Off-world expedition journal">
    <a className="book-skip-link" href="#book-reading-area">Skip to the journal pages</a>
    <header className="book-toolbar">
      <div className="book-toolbar-identity">
        <button className="book-wordmark" onClick={() => goTo(-1)} aria-label="Return to book cover"><OrbitMark /><span>OFF-WORLD<span>an expedition journal</span></span></button>
        {page >= 0 && <span className="book-current-location">{mission ? `${mission.destination} · Chapter ${mission.chapter}` : pageLabel}</span>}
      </div>
      <nav aria-label="Journal navigation">
        <button className={page === 1 ? 'book-nav-active' : ''} aria-current={page === 1 ? 'page' : undefined} onClick={() => goTo(1)}><List size={16} />Contents</button>
        <button className={page === journalPage ? 'book-nav-active' : ''} aria-current={page === journalPage ? 'page' : undefined} onClick={() => goTo(journalPage)}><Feather size={16} />My journal <span className="book-nav-count">{completed}/{missions.length}</span></button>
        <button className="book-motion-control" aria-label="Reduce page-turn motion" title="Reduce page-turn motion" aria-pressed={reducedMotion} onClick={() => setReducedMotion(value => !value)}><Sparkles size={16} /><span>Reduce motion</span></button>
      </nav>
    </header>

    <div id="book-reading-area" tabIndex={-1} className={`book-stage ${page === -1 ? 'book-stage-cover' : ''}`}>
      {page === -1 ? <section className="book-cover-layout" aria-labelledby="book-cover-title">
        <div className="book-cover" key="cover">
          <div className="book-cover-spine" />
          <div className="book-cover-content">
            <h1 id="book-cover-title" ref={headingRef} tabIndex={-1}>Left behind.<br /><span>Still teaching.</span></h1>
            <OrbitMark className="book-cover-orbit" />
            <div className="book-cover-bottom"><span>MOON · MARS · DEEP SPACE</span><p>Real machines.<br />Extraordinary discoveries.</p></div>
          </div>
          <span className="book-cover-ribbon" aria-hidden="true" />
        </div>
        <div className="book-cover-invitation">
          <p>Some journeys leave<br />more than footprints.</p>
          <span>Travel into an imagined future.<br />Discover the real stories we left behind.</span>
          <button className="book-primary book-open-button" onClick={() => goTo(0)}>Open the journal <ArrowRight size={19} /></button>
          <small><BookOpen size={14} />Three chapters. A solar system of stories.</small>
        </div>
      </section> : <section className="book-open" aria-label={pageLabel}>
        <div className="book-page-edges" aria-hidden="true" />
        <div key={turn} className={`book-spread book-turn-${direction}`}>
          {page === 0 ? <>
            <article className="book-page book-page-left book-intro-page">
              <div className="book-page-running"><Compass size={15} /><span>A note to the explorer</span></div>
              <h1 ref={headingRef} tabIndex={-1}>Every machine<br />has a story.</h1>
              <p className="book-lead">A camera on the Moon. A laboratory on Mars. A messenger beyond the planets.</p>
              <p>They crossed extraordinary distances to help us understand our place in the universe. Some finished their work. Some kept going. Every one left us something to discover.</p>
              <p>You are an astronaut on a fictional future expedition, documenting this exploration heritage. Your journal opens the real historical records behind the machines.</p>
              <p className="book-handwritten">Look closely. Ask questions.<br />Follow the evidence.</p>
              <span className="book-folio">01</span>
            </article>
            <article className="book-page book-page-right book-guide-page">
              <div className="book-page-running"><span>Before you set out</span><span>EXPEDITION GUIDE</span></div>
              <h2>Walk into the story.</h2>
              <ol className="book-guide-list">
                <li><span>1</span><div><h3>Meet the mission</h3><p>Read the briefing. Find the question that drove the engineers and scientists.</p></div></li>
                <li><span>2</span><div><h3>Explore what remains</h3><p>Walk the surface or use your jetpack. Inspect hardware and open historical records in your HUD.</p></div></li>
                <li><span>3</span><div><h3>Build an explanation</h3><p>Connect a machine to the knowledge it made possible. Record your discovery in the journal.</p></div></li>
              </ol>
              <div className="book-evidence-note"><h3>Real history. An imagined expedition.</h3><p>The astronaut visit is fiction. Recreated scenes are labeled. Historical findings link directly to their sources.</p></div>
              <button className="book-primary" onClick={() => goTo(1)}>Choose a chapter <ArrowRight size={17} /></button>
              <span className="book-folio">02</span>
            </article>
          </> : page === 1 ? <>
            <article className="book-page book-page-left book-contents-intro">
              <div className="book-page-running"><span>The expedition</span><span>CONTENTS</span></div>
              <h1 ref={headingRef} tabIndex={-1}>Three places.<br /><em>Countless questions.</em></h1>
              <p className="book-lead">Follow the chapters in order, or begin wherever your curiosity takes you.</p>
              <div className="book-route-map" aria-label="Three destinations: the Moon, Mars, and deep space">
                <svg viewBox="0 0 400 180" fill="none" aria-hidden="true"><path d="M45 130C130 130 80 45 178 45S282 140 355 60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" /><circle cx="45" cy="130" r="13" stroke="currentColor" /><circle cx="178" cy="45" r="23" stroke="currentColor" /><circle cx="355" cy="60" r="5" fill="currentColor" /><path d="M344 60h22m-11-11v22" stroke="currentColor" /></svg>
                <span>Moon</span><span>Mars</span><span>Deep space</span>
              </div>
              <p className="book-small-note">Demonstration edition · mission selections are provisional for the competition briefing.</p>
              <span className="book-folio">03</span>
            </article>
            <article className="book-page book-page-right book-contents-page">
              <div className="book-page-running"><span>Choose your destination</span><Compass size={15} /></div>
              <div className="book-chapter-list">{missions.map((item, index) => <button className="book-chapter-link" key={item.id} onClick={() => goTo(index + 2)} style={{ '--mission-accent': item.accent } as CSSProperties}>
                <span className="book-chapter-number">{String(item.chapter).padStart(2, '0')}</span>
                <span className="book-chapter-copy"><span className="book-chapter-destination">{item.destination}</span><strong>{item.name}</strong><span>{item.subtitle}</span>{progress[item.id]?.completed && <small><Check size={12} />Journal entry complete</small>}</span>
                <ArrowRight size={22} />
              </button>)}</div>
              <p className="book-contents-footer"><VolumeX size={15} />Everything you need is available in text. Take your time.</p>
              <span className="book-folio">04</span>
            </article>
          </> : mission ? <>
            <article className="book-page book-page-left book-mission-copy" style={{ '--mission-accent': mission.accent } as CSSProperties}>
              <div className="book-page-running"><span>Chapter {String(mission.chapter).padStart(2, '0')} / {mission.destination}</span><span>{mission.dateLabel}</span></div>
              <h1 ref={headingRef} tabIndex={-1}>{mission.title}</h1>
              <p className="book-lead">{mission.introduction}</p>
              <dl className="book-mission-facts"><div><dt>Mission</dt><dd>{mission.name}</dd></div><div><dt>Historical status</dt><dd>{mission.statusLabel}</dd></div><div><dt>Location</dt><dd>{mission.coordinatesLabel}</dd></div></dl>
              <blockquote className="book-mission-question"><span>Your guiding question</span><p>{mission.question}</p></blockquote>
              <SourceLinks mission={mission} />
              <span className="book-folio">{String((page + 1) * 2 - 1).padStart(2, '0')}</span>
            </article>
            <article className="book-page book-page-right book-mission-visual" style={{ '--mission-accent': mission.accent } as CSSProperties}>
              <div className="book-page-running"><span>{mission.name} / field briefing</span><Rocket size={15} /></div>
              <div className={`book-viewfinder book-viewfinder-${mission.id}`}>
                <div className="book-viewfinder-label"><span>SCHEMATIC / NOT TO SCALE</span><span>{mission.destination}</span></div>
                <MissionDiagram mission={mission} />
                <button className="book-preview-launch" onClick={() => onExplore(mission.id)} aria-label={`Explore ${mission.name}`}><ArrowRight size={23} /><span>Explore this mission</span></button>
              </div>
              <p className="book-scene-caption">{mission.sceneNote}</p>
              <div className="book-discoveries-heading"><h2>Look a little closer.</h2><span>{progress[mission.id]?.discovered.length ?? 0}/{mission.discoveries.length} inspected</span></div>
              <ul className="book-discovery-list">{mission.discoveries.map(discovery => <li key={discovery.id}><span role="img" aria-label={progress[mission.id]?.discovered.includes(discovery.id) ? 'Inspected' : 'Not yet inspected'} className={progress[mission.id]?.discovered.includes(discovery.id) ? 'book-object-found' : ''}>{progress[mission.id]?.discovered.includes(discovery.id) ? <Check size={12} aria-hidden="true" /> : <span />}</span>{discovery.title}</li>)}</ul>
              <span className="book-folio">{String((page + 1) * 2).padStart(2, '0')}</span>
            </article>
          </> : page === journalPage ? <>
            <article className="book-page book-page-left book-journal-intro">
              <div className="book-page-running"><Feather size={15} /><span>Your expedition journal</span></div>
              <h1 ref={headingRef} tabIndex={-1}>What will<br />you take home?</h1>
              <p className="book-lead">The machines stay where they are. Their stories travel with you.</p>
              <p>Each inspected object adds a piece of evidence. Complete a chapter’s learning task to record its scientific legacy here.</p>
              <div className="book-journal-total"><strong>{completed}</strong><span>of {missions.length} chapter entries<br />complete</span></div>
              <p className="book-small-note">Your discoveries are saved on this browser when storage is available.</p>
              <button className="book-text-action" onClick={() => goTo(1)}>Return to the contents <MoveRight size={17} /></button>
              <span className="book-folio">{String((page + 1) * 2 - 1).padStart(2, '0')}</span>
            </article>
            <article className="book-page book-page-right book-journal-entries">
              <div className="book-page-running"><span>Discoveries worth keeping</span><BookOpen size={15} /></div>
              {missions.map((item, index) => <section className="book-journal-entry" key={item.id}><div className="book-journal-entry-heading"><h2>{item.name}</h2><span>{progress[item.id]?.completed ? <><Check size={12} />Complete</> : 'Entry in progress'}</span></div><p>{progress[item.id]?.completed ? item.legacy : item.question}</p><button className="book-text-action" onClick={() => goTo(index + 2)}>{progress[item.id]?.completed ? 'Revisit the chapter' : 'Continue exploring'}<ArrowRight size={15} /></button></section>)}
              <span className="book-folio">{String((page + 1) * 2).padStart(2, '0')}</span>
            </article>
          </> : <>
            <article className="book-page book-page-left book-credits-copy">
              <div className="book-page-running"><span>Behind the journal</span><BookOpen size={15} /></div>
              <h1 ref={headingRef} tabIndex={-1}>Built on<br /><em>real evidence.</em></h1>
              <p className="book-lead">An independent educational demonstration for NASA Space Apps.</p>
              <p>Historical descriptions reference NASA, JPL, and scientific archives. This project does not imply endorsement by NASA.</p>
              <h2>About the expedition</h2><p>The future astronaut visit and dialogue are fictional. Simplified hardware, terrain, scale, and layouts are labeled reconstructions. Records describe historical conditions, not guaranteed future conditions.</p>
              <h2>About this demonstration</h2><p>Mission choices are provisional. AI assisted with planning, code, and educational copy; historical claims remain linked to their original sources. Diagrams are schematics, not mission photographs.</p>
              <p className="book-small-note">Type: DM Serif Display and DM Sans, distributed under the SIL Open Font License. Sources and license files are included with the project.</p>
              <span className="book-folio">{String((page + 1) * 2 - 1).padStart(2, '0')}</span>
            </article>
            <article className="book-page book-page-right book-source-page">
              <div className="book-page-running"><span>Follow the sources</span><ExternalLink size={15} /></div>
              {missions.map(item => <section className="book-source-group" key={item.id}><h2>{item.name}</h2><ul>{item.sources.map(source => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.title}<ExternalLink size={12} /></a><small>{source.credit}</small></li>)}</ul></section>)}
              <span className="book-folio">{String((page + 1) * 2).padStart(2, '0')}</span>
            </article>
          </>}
        </div>
        <div className="book-gutter" aria-hidden="true" />
      </section>}
    </div>

    <footer className="book-navigation">
      <button className="book-page-button" disabled={page === -1} onClick={() => goTo(page - 1)} aria-label="Previous spread"><ChevronLeft size={20} /><span>Previous</span></button>
      <div className="book-page-position" aria-live="polite"><span>{pageLabel}</span>{page >= 0 && <small>Spread {page + 1} of {lastPage + 1}</small>}</div>
      <button className="book-page-button" disabled={page === lastPage} onClick={() => goTo(page + 1)} aria-label={page === -1 ? 'Open journal' : 'Next spread'}><span>{page === -1 ? 'Open journal' : 'Next'}</span><ChevronRight size={20} /></button>
    </footer>
    <span className="book-edition-note">An imagined expedition. A documented history.</span>
  </main>;
}
