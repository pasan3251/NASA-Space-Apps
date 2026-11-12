import React, { Component, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, Compass, ExternalLink, Eye, FileText, Flag, List, Maximize2, Move, Navigation, X } from 'lucide-react';
import type { Discovery, ExpeditionMission, MissionProgress } from '../../types/expedition';
import { MissionWorld } from './MissionWorld';
import './exploration.css';

interface ExplorationExperienceProps {
  mission: ExpeditionMission;
  progress: MissionProgress;
  onDiscover: (id: string) => void;
  onComplete: () => void;
  onExit: () => void;
}

type ViewMode = 'surface' | 'orbit';
interface CameraCommand { serial: number; target: [number, number, number] }
interface NearbyDiscovery { id: string; distance: number }

function unlockPointer() {
  if (document.pointerLockElement) document.exitPointerLock();
}

class SceneBoundary extends Component<{ children: React.ReactNode; onUnavailable: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? <div className="exp-scene-fallback"><Compass size={38} /><p>The 3D view is unavailable on this device.</p><span>You can explore every historical record and complete the journal below.</span></div> : this.props.children; }
}

function NoWebGL() {
  // Canvas fallback is also a DOM child of a working canvas. It must never
  // mutate application state merely because React mounted it.
  return <div className="exp-scene-fallback"><Compass size={38} /><p>Historical records are ready.</p><span>This browser cannot display the 3D environment. Use the discovery list to continue.</span></div>;
}

function ExplorerCamera({ mission, mode, paused, command, onNearby }: {
  mission: ExpeditionMission;
  mode: ViewMode;
  paused: boolean;
  command: CameraCommand | null;
  onNearby: (discovery: NearbyDiscovery | null) => void;
}) {
  const { camera, gl } = useThree();
  const keys = useRef(new Set<string>());
  const dragging = useRef(false);
  const yaw = useRef(0);
  const pitch = useRef(0);
  const frameClock = useRef(0);
  const lastNearby = useRef('');
  const isSpace = mission.id === 'pioneer';
  const rotation = useMemo(() => new THREE.Euler(0, 0, 0, 'YXZ'), []);
  const movement = useMemo(() => new THREE.Vector3(), []);
  const orbitTarget: [number, number, number] = command?.target ?? [0, isSpace ? 1 : 0.8, 0];

  useEffect(() => {
    keys.current.clear();
    dragging.current = false;
    const target = command?.target ?? [0, isSpace ? 1 : 0.5, 0];
    if (mode === 'orbit') {
      camera.position.set(target[0] + 15, target[1] + 13, target[2] + 18);
    } else if (command) {
      camera.position.set(target[0] + 2.5, isSpace ? target[1] + 2 : 1.7, target[2] + 4.5);
    } else {
      camera.position.set(0, isSpace ? 3 : 1.7, isSpace ? 12 : 14);
    }
    camera.lookAt(target[0], target[1], target[2]);
    rotation.setFromQuaternion(camera.quaternion, 'YXZ');
    yaw.current = rotation.y;
    pitch.current = rotation.x;
    camera.updateMatrixWorld();
  }, [camera, command, isSpace, mission.id, mode, rotation]);

  useEffect(() => {
    keys.current.clear();
    dragging.current = false;
    if (paused || mode === 'orbit') unlockPointer();
  }, [paused, mode]);

  useEffect(() => {
    const interactive = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      return !!target?.closest('input, textarea, select, [contenteditable="true"]');
    };
    const keydown = (event: KeyboardEvent) => {
      if (paused || mode === 'orbit' || interactive(event) || (event.ctrlKey && !['ControlLeft', 'ControlRight'].includes(event.code)) || event.metaKey || event.altKey) return;
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyQ', 'KeyE', 'ShiftLeft', 'ShiftRight', 'Space', 'ControlLeft', 'ControlRight'].includes(event.code)) {
        keys.current.add(event.code);
        if (event.code === 'Space' && isSpace) event.preventDefault();
      }
    };
    const keyup = (event: KeyboardEvent) => keys.current.delete(event.code);
    const clear = () => { keys.current.clear(); dragging.current = false; };
    const pointerdown = (event: PointerEvent) => {
      if (event.button === 0 && !paused && mode === 'surface') dragging.current = true;
    };
    const pointerup = () => { dragging.current = false; };
    const pointermove = (event: MouseEvent) => {
      if (paused || mode === 'orbit' || (document.pointerLockElement !== gl.domElement && !dragging.current)) return;
      yaw.current -= event.movementX * 0.0022;
      pitch.current = THREE.MathUtils.clamp(pitch.current - event.movementY * 0.0022, -Math.PI * 0.47, Math.PI * 0.47);
    };
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);
    window.addEventListener('blur', clear);
    document.addEventListener('visibilitychange', clear);
    document.addEventListener('pointerlockchange', clear);
    document.addEventListener('mousemove', pointermove);
    window.addEventListener('pointerup', pointerup);
    gl.domElement.addEventListener('pointerdown', pointerdown);
    return () => {
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('keyup', keyup);
      window.removeEventListener('blur', clear);
      document.removeEventListener('visibilitychange', clear);
      document.removeEventListener('pointerlockchange', clear);
      document.removeEventListener('mousemove', pointermove);
      window.removeEventListener('pointerup', pointerup);
      gl.domElement.removeEventListener('pointerdown', pointerdown);
      clear();
    };
  }, [gl, isSpace, mode, paused]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (mode === 'surface' && !paused) {
      const held = keys.current;
      const forward = Number(held.has('KeyW')) - Number(held.has('KeyS'));
      const right = Number(held.has('KeyD')) - Number(held.has('KeyA'));
      movement.set(right, 0, -forward);
      if (movement.lengthSq() > 0) movement.normalize().applyAxisAngle(THREE.Object3D.DEFAULT_UP, yaw.current);
      if (isSpace) movement.y = Number(held.has('KeyE') || held.has('Space')) - Number(held.has('KeyQ') || held.has('ControlLeft') || held.has('ControlRight'));
      const speed = held.has('ShiftLeft') || held.has('ShiftRight') ? 6 : 3;
      camera.position.addScaledVector(movement, speed * dt);
      camera.position.x = THREE.MathUtils.clamp(camera.position.x, -38, 38);
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, -38, 38);
      camera.position.y = isSpace ? THREE.MathUtils.clamp(camera.position.y, -16, 24) : 1.7;
      rotation.set(pitch.current, yaw.current, 0, 'YXZ');
      camera.quaternion.setFromEuler(rotation);
    }
    frameClock.current += dt;
    if (frameClock.current < 0.2) return;
    frameClock.current = 0;
    let nearest: NearbyDiscovery | null = null;
    for (const discovery of mission.discoveries) {
      const dx = camera.position.x - discovery.position[0];
      const dy = camera.position.y - discovery.position[1];
      const dz = camera.position.z - discovery.position[2];
      const distance = Math.hypot(dx, dy, dz);
      if (distance < 7 && (!nearest || distance < nearest.distance)) nearest = { id: discovery.id, distance: Math.round(distance * 10) / 10 };
    }
    const signature = nearest ? `${nearest.id}:${nearest.distance}` : '';
    if (signature !== lastNearby.current) { lastNearby.current = signature; onNearby(nearest); }
  });

  return <OrbitControls enabled={mode === 'orbit' && !paused} target={orbitTarget} minDistance={3} maxDistance={55} maxPolarAngle={isSpace ? Math.PI : Math.PI * 0.48} enableDamping dampingFactor={0.1} />;
}

function ArchiveRecord({ discovery, mission, onClose }: { discovery: Discovery; mission: ExpeditionMission; onClose: () => void }) {
  const [detail, setDetail] = useState<'story' | 'engineering'>('story');
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const sources = mission.sources.filter(source => discovery.sourceIds.includes(source.id));
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    setDetail('story');
    headingRef.current?.focus({ preventScroll: true });
    return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, [discovery.id]);
  return <aside className="exp-archive" aria-label={`${discovery.title} historical record`}>
    <div className="exp-archive-toolbar"><span><FileText size={16} /> Historical record</span><button className="exp-icon-button exp-ink-button" onClick={onClose} aria-label="Close historical record"><X size={19} /></button></div>
    <div className="exp-archive-body">
      <h2 ref={headingRef} tabIndex={-1}>{discovery.title}</h2><p className="exp-component">{discovery.component}</p>
      <p className="exp-record-summary">{discovery.summary}</p>
      <div className="exp-record-tabs" aria-label="Record detail"><button aria-pressed={detail === 'story'} onClick={() => setDetail('story')}>The story</button><button aria-pressed={detail === 'engineering'} onClick={() => setDetail('engineering')}>Engineering</button></div>
      {detail === 'story' ? <><p>{discovery.story}</p><h3>What it helped us learn</h3><p>{discovery.science}</p></> : <><h3>How it worked</h3><p>{discovery.engineering}</p></>}
      <h3>What happened afterward</h3><p>{discovery.status}</p>
      <p className="exp-record-evidence"><Check size={15} /> {discovery.evidence}</p>
      <div className="exp-sources"><h3>Follow the evidence</h3>{sources.map(source => <a key={source.id} href={source.url} target="_blank" rel="noreferrer">{source.title}<ExternalLink size={13} /><span>{source.credit}</span></a>)}</div>
    </div>
  </aside>;
}

export function ExplorationExperience({ mission, progress, onDiscover, onComplete, onExit }: ExplorationExperienceProps) {
  const [mode, setMode] = useState<ViewMode>('surface');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showList, setShowList] = useState(true);
  const [showTask, setShowTask] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const [nearby, setNearby] = useState<NearbyDiscovery | null>(null);
  const [command, setCommand] = useState<CameraCommand | null>(null);
  const [locked, setLocked] = useState(false);
  const [failedMissionId, setFailedMissionId] = useState<string | null>(null);
  const sceneUnavailable = failedMissionId === mission.id;
  const [controlMessage, setControlMessage] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const captureTimeoutRef = useRef<number | null>(null);
  const taskHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const commandSerial = useRef(0);
  const selected = mission.discoveries.find(item => item.id === selectedId);
  const nearbyItem = mission.discoveries.find(item => item.id === nearby?.id);
  const count = mission.discoveries.filter(item => progress.discovered.includes(item.id)).length;
  const allDiscovered = count === mission.discoveries.length;
  const correct = answer === mission.task.correctIndex;
  const paused = selectedId !== null || showTask || showHelp;
  const unavailable = useCallback(() => setFailedMissionId(mission.id), [mission.id]);
  const captureFallback = useCallback(() => {
    if (captureTimeoutRef.current !== null) window.clearTimeout(captureTimeoutRef.current);
    captureTimeoutRef.current = null;
    setControlMessage('Mouse capture is unavailable. Drag the scene to look, or switch to orbit view.');
  }, []);

  useEffect(() => {
    unlockPointer();
    setSelectedId(null); setShowTask(false); setShowHelp(false);
    setAnswer(null); setCommand(null); setNearby(null); setMode('surface');
  }, [mission.id]);

  const inspect = useCallback((id: string) => {
    if (!mission.discoveries.some(item => item.id === id)) return;
    unlockPointer();
    setSelectedId(id); setShowTask(false); setShowHelp(false);
    onDiscover(id);
  }, [mission.discoveries, onDiscover]);

  useEffect(() => {
    if (showTask) taskHeadingRef.current?.focus({ preventScroll: true });
  }, [showTask]);

  useEffect(() => {
    const lockChanged = () => {
      const captured = document.pointerLockElement === canvasRef.current;
      setLocked(captured);
      if (captured) {
        if (captureTimeoutRef.current !== null) window.clearTimeout(captureTimeoutRef.current);
        captureTimeoutRef.current = null;
        setControlMessage('');
      }
    };
    document.addEventListener('pointerlockchange', lockChanged);
    document.addEventListener('pointerlockerror', captureFallback);
    return () => {
      document.removeEventListener('pointerlockchange', lockChanged);
      document.removeEventListener('pointerlockerror', captureFallback);
      if (captureTimeoutRef.current !== null) window.clearTimeout(captureTimeoutRef.current);
      captureTimeoutRef.current = null;
      unlockPointer();
    };
  }, [captureFallback]);

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement | null)?.closest('input,textarea,select,[contenteditable="true"]') || event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
      if (event.code === 'KeyC' && !paused) { unlockPointer(); setMode(value => value === 'surface' ? 'orbit' : 'surface'); }
      if (event.code === 'KeyJ') { unlockPointer(); setShowList(value => !value); }
      if (event.code === 'KeyF' && nearbyItem && !paused) inspect(nearbyItem.id);
      if (event.code === 'Escape') { setSelectedId(null); setShowTask(false); setShowHelp(false); }
    };
    window.addEventListener('keydown', shortcut);
    return () => window.removeEventListener('keydown', shortcut);
  }, [inspect, nearbyItem, paused]);

  const goTo = (discovery: Discovery) => {
    unlockPointer(); setSelectedId(null); setShowTask(false); setShowHelp(false);
    setCommand({ serial: ++commandSerial.current, target: discovery.position });
  };
  const nextDiscovery = mission.discoveries.find(item => !progress.discovered.includes(item.id)) ?? mission.discoveries[0];
  const leave = () => { unlockPointer(); onExit(); };
  const startLooking = () => {
    setControlMessage(''); setSelectedId(null); setShowTask(false); setShowHelp(false);
    if (mode === 'orbit') setMode('surface');
    const canvas = canvasRef.current;
    if (!canvas || typeof canvas.requestPointerLock !== 'function') { captureFallback(); return; }
    if (captureTimeoutRef.current !== null) window.clearTimeout(captureTimeoutRef.current);
    captureTimeoutRef.current = window.setTimeout(() => {
      captureTimeoutRef.current = null;
      if (document.pointerLockElement !== canvas) captureFallback();
    }, 1000);
    try {
      const result = canvas.requestPointerLock() as unknown as Promise<void> | undefined;
      result?.catch?.(captureFallback);
    } catch { captureFallback(); }
  };

  return <main className={`exp-experience exp-${mission.id}`} style={{ '--exp-accent': mission.accent } as React.CSSProperties} aria-label={`${mission.name} exploration`}>
    <div className="exp-scene" aria-label="Reconstructed mission environment">
      <SceneBoundary key={mission.id} onUnavailable={unavailable}>
        <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, mission.id === 'pioneer' ? 3 : 1.7, 14], fov: 58, near: 0.1, far: 180 }} onCreated={({ gl }) => { canvasRef.current = gl.domElement; setFailedMissionId(null); }} fallback={<NoWebGL />}>
          <Suspense fallback={null}><MissionWorld mission={mission} selectedId={selectedId} discoveredIds={progress.discovered} onSelect={inspect} /></Suspense>
          <ExplorerCamera mission={mission} mode={mode} paused={paused} command={command} onNearby={setNearby} />
        </Canvas>
      </SceneBoundary>
    </div>
    <div className="exp-vignette" aria-hidden="true" />
    <header className="exp-topbar">
      <button className="exp-back-button" onClick={leave}><ArrowLeft size={17} /> Back to journal</button>
      <div className="exp-mission-heading"><h1>{mission.name}</h1><span>{mission.destination} · {mission.id === 'pioneer' ? 'Jetpack expedition' : 'Surface expedition'}</span></div>
      <button className="exp-journal-toggle" onClick={() => { unlockPointer(); setShowList(value => !value); }} aria-expanded={showList} aria-controls="exp-discovery-list"><BookOpen size={18} /> {count}/{mission.discoveries.length} records {progress.completed && <Check size={16} />}</button>
    </header>

    <div className="exp-context"><span className="exp-fiction-dot" /> Fictional future expedition <span>·</span> {mode === 'orbit' ? 'Orbit inspection' : mission.id === 'pioneer' ? 'First-person EVA' : 'First-person explorer'}</div>

    {showList && <aside className="exp-discoveries" id="exp-discovery-list" aria-label="Mission discovery journal">
      <div className="exp-list-heading"><h2>Your discoveries</h2><button className="exp-icon-button" aria-label="Hide discovery list" onClick={() => setShowList(false)}><ChevronDown size={18} /></button></div>
      <p>{mission.arrival}</p>
      <ol>{mission.discoveries.map((discovery, index) => <li key={discovery.id} className={progress.discovered.includes(discovery.id) ? 'exp-discovered' : ''}>
        <button className="exp-discovery-open" onClick={() => inspect(discovery.id)} aria-label={`Read ${discovery.title}`}><span className="exp-discovery-number">{progress.discovered.includes(discovery.id) ? <Check size={14} /> : index + 1}</span><span>{discovery.title}<small>{discovery.component}</small></span></button>
        <button className="exp-go-button" onClick={() => goTo(discovery)} aria-label={`Go to ${discovery.title}`} title="Go to this discovery"><Navigation size={15} /></button>
      </li>)}</ol>
      <button className={`exp-task-button ${allDiscovered ? 'exp-task-ready' : ''}`} onClick={() => { unlockPointer(); setSelectedId(null); setShowHelp(false); setShowTask(true); }}><Flag size={16} /><span>{progress.completed ? 'Journal entry complete' : 'Connect the evidence'}<small>{progress.completed ? 'Revisit your conclusion' : allDiscovered ? 'Your evidence task is ready' : `${mission.discoveries.length - count} records left to inspect`}</small></span><ArrowRight size={16} /></button>
    </aside>}

    {!paused && !sceneUnavailable && <div className="exp-crosshair" aria-hidden="true"><span /><span /></div>}
    {!paused && nearbyItem && <button className="exp-proximity" onClick={() => inspect(nearbyItem.id)}><Eye size={18} /><span>Inspect {nearbyItem.title}<small>{nearby?.distance.toFixed(1)} m away in this reconstruction</small></span><kbd>F</kbd></button>}

    {selected && <ArchiveRecord discovery={selected} mission={mission} onClose={() => setSelectedId(null)} />}

    {showTask && <aside className="exp-archive exp-task-panel" aria-label="Mission evidence task">
      <div className="exp-archive-toolbar"><span><Flag size={16} /> Expedition conclusion</span><button className="exp-icon-button exp-ink-button" onClick={() => setShowTask(false)} aria-label="Close evidence task"><X size={19} /></button></div>
      <div className="exp-archive-body"><h2 ref={taskHeadingRef} tabIndex={-1}>Connect the evidence.</h2>
        {!allDiscovered ? <><p className="exp-record-summary">Every object holds part of the answer.</p><p>Inspect all {mission.discoveries.length} historical records to unlock the evidence task. You have read {count}.</p><button className="exp-paper-action" onClick={() => { setShowTask(false); setShowList(true); }}>Continue discoveries <ArrowRight size={16} /></button></> : <>
          <p className="exp-record-summary">{mission.task.question}</p>
          <div className="exp-answer-list">{mission.task.options.map((option, index) => <button key={option} className={answer === index ? (index === mission.task.correctIndex ? 'exp-answer-correct' : 'exp-answer-incorrect') : ''} aria-pressed={answer === index} onClick={() => setAnswer(index)}><span>{String.fromCharCode(65 + index)}</span>{option}{answer === index && index === mission.task.correctIndex && <Check size={19} />}</button>)}</div>
          {answer !== null && <div className={`exp-task-feedback ${correct ? 'exp-feedback-correct' : ''}`} role="status"><strong>{correct ? 'The evidence supports your conclusion.' : 'Look again at the records.'}</strong><p>{correct ? mission.task.explanation : 'This conclusion goes beyond, or does not match, the evidence in your discoveries. You can reopen any record and try again.'}</p></div>}
          {(correct || progress.completed) && <><h3>What remains</h3><p>{mission.legacy}</p><button className="exp-paper-action" onClick={() => { if (!progress.completed && correct) onComplete(); setShowTask(false); }}><Check size={17} />{progress.completed ? 'Return to exploration' : 'Save journal entry'}</button><button className="exp-text-button" onClick={() => { if (!progress.completed && correct) onComplete(); leave(); }}>Return to the book <ArrowRight size={16} /></button></>}
        </>}
      </div>
    </aside>}

    {showHelp && <aside className="exp-archive" aria-label="Exploration controls"><div className="exp-archive-toolbar"><span><Move size={16} /> Explore at your own pace</span><button className="exp-icon-button exp-ink-button" onClick={() => setShowHelp(false)} aria-label="Close controls"><X size={19} /></button></div><div className="exp-archive-body"><h2>Your expedition controls</h2><dl className="exp-controls-list"><dt>Move</dt><dd>W A S D</dd><dt>Look around</dt><dd>Capture mouse, or drag the environment</dd>{mission.id === 'pioneer' && <><dt>Jetpack up / down</dt><dd>E / Q · Space / Control</dd></>}<dt>Move faster</dt><dd>Hold Shift</dd><dt>Inspect nearby object</dt><dd>F</dd><dt>Switch camera</dt><dd>C</dd><dt>Show discovery list</dt><dd>J</dd><dt>Release mouse / close record</dt><dd>Escape</dd></dl><p>Orbit view supports dragging to rotate and scrolling to zoom. The discovery list opens every record without walking or jetpacking.</p><h3>About this environment</h3><p>{mission.sceneNote}</p><p>Movement speeds, travel shortcuts, and the future astronaut visit are fictional interface choices.</p></div></aside>}

    <footer className="exp-bottom-bar">
      <div className="exp-view-controls"><button onClick={() => { unlockPointer(); setMode(value => value === 'surface' ? 'orbit' : 'surface'); }} aria-label="Switch camera view"><Compass size={17} />{mode === 'orbit' ? 'First person' : 'Orbit view'}<kbd>C</kbd></button>{!sceneUnavailable && <button onClick={startLooking}><Maximize2 size={16} />{locked ? 'Mouse captured · Esc to release' : 'Capture mouse'}</button>}<button onClick={() => { unlockPointer(); setSelectedId(null); setShowTask(false); setShowHelp(value => !value); }} aria-expanded={showHelp}><Move size={16} />Controls</button></div>
      {nextDiscovery && <button className="exp-next-button" onClick={() => goTo(nextDiscovery)}><Navigation size={16} />Go to {allDiscovered ? 'a discovery' : 'next discovery'}<ArrowRight size={16} /></button>}
    </footer>
    <div className="exp-scene-caption">{mission.sceneNote}</div>
    {controlMessage && <div className="exp-control-message" role="status">{controlMessage}<button onClick={() => setControlMessage('')} aria-label="Dismiss controls message"><X size={15} /></button></div>}
    {sceneUnavailable && <div className="exp-fallback-access"><List size={18} /><span>Archive mode · All discoveries and the evidence task remain available.</span><button onClick={() => setShowList(true)}>Show records</button></div>}
  </main>;
}
