import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { BookExperience } from './features/book/BookExperience';
import { EXPEDITION_MISSIONS } from './data/expeditionMissions';
import type { MissionId } from './types/expedition';
import { contentRevision, EXPEDITION_STORAGE_KEY, readSavedExpedition } from './utils/expeditionProgress';

const ExplorationExperience = lazy(() => import('./features/exploration/ExplorationExperience').then((module) => ({ default: module.ExplorationExperience })));
const missionRevision = contentRevision(EXPEDITION_MISSIONS);

export const App: React.FC = () => {
  const [saved] = useState(() => readSavedExpedition(EXPEDITION_MISSIONS));
  const [progress, setProgress] = useState(saved.progress);
  const [lastMissionId, setLastMissionId] = useState<MissionId | undefined>(saved.lastMissionId);
  const [activeMissionId, setActiveMissionId] = useState<MissionId | null>(null);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const activeMission = EXPEDITION_MISSIONS.find((mission) => mission.id === activeMissionId);

  useEffect(() => {
    try {
      localStorage.setItem(EXPEDITION_STORAGE_KEY, JSON.stringify({ version: 1, contentRevision: missionRevision, progress, lastMissionId }));
      setStorageUnavailable(false);
    } catch {
      setStorageUnavailable(true);
    }
  }, [progress, lastMissionId]);

  const discover = useCallback((id: string) => {
    if (!activeMissionId) return;
    const mission = EXPEDITION_MISSIONS.find((item) => item.id === activeMissionId);
    if (!mission?.discoveries.some((item) => item.id === id)) return;
    setProgress((current) => {
      const record = current[activeMissionId];
      if (record.discovered.includes(id)) return current;
      return { ...current, [activeMissionId]: { ...record, discovered: [...record.discovered, id] } };
    });
  }, [activeMissionId]);

  const complete = useCallback(() => {
    if (!activeMissionId) return;
    const mission = EXPEDITION_MISSIONS.find((item) => item.id === activeMissionId);
    setProgress((current) => {
      const record = current[activeMissionId];
      if (!mission || record.discovered.length !== mission.discoveries.length || record.completed) return current;
      return { ...current, [activeMissionId]: { ...record, completed: true } };
    });
  }, [activeMissionId]);

  const explore = useCallback((id: MissionId) => {
    setLastMissionId(id);
    setActiveMissionId(id);
  }, []);

  return <>
    {activeMission ? <Suspense fallback={<main className="app-loading" aria-live="polite"><span className="app-loading-orbit" aria-hidden="true" /><h1>Preparing your expedition</h1><p>Opening the {activeMission.destination} reconstruction.</p><button type="button" onClick={() => setActiveMissionId(null)}>Return to journal</button></main>}>
      <ExplorationExperience
        key={activeMission.id}
        mission={activeMission}
        progress={progress[activeMission.id]}
        onDiscover={discover}
        onComplete={complete}
        onExit={() => setActiveMissionId(null)}
      />
    </Suspense> : <BookExperience
      missions={EXPEDITION_MISSIONS}
      progress={progress}
      onExplore={explore}
      initialMissionId={lastMissionId}
      onPageChange={setLastMissionId}
    />}
    {storageUnavailable ? <p className="app-storage-notice" role="status">Progress is available for this visit. Your browser is not allowing it to be saved.</p> : null}
  </>;
};

export default App;
