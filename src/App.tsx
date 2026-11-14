import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BookReader } from "./features/book/BookReader";
import { ExpeditionLibrary } from "./features/library/ExpeditionLibrary";
import {
  BackpackExperience,
  BackpackLauncher,
} from "./features/collection/BackpackExperience";
import { MissionRewardExperience } from "./features/rewards/MissionRewardExperience";
import { EXPEDITION_MISSIONS } from "./data/expeditionMissions";
import type { CardId, MissionId, SavedExpedition } from "./types/expedition";
import {
  CARD_BY_MISSION,
  completeMission,
  EXPEDITION_STORAGE_KEY,
  readSavedExpedition,
} from "./utils/expeditionProgress";
import "./styles/offworld.css";
import "./styles/rewards.css";

const ExplorationExperience = lazy(() =>
  import("./features/exploration/ExplorationExperience").then((module) => ({
    default: module.ExplorationExperience,
  })),
);

export function App() {
  const [save, setSave] = useState(() =>
    readSavedExpedition(EXPEDITION_MISSIONS),
  );
  const saveRef = useRef(save);
  const [activeMissionId, setActiveMissionId] = useState<MissionId | null>(
    null,
  );
  const [bookId, setBookId] = useState<MissionId | null>(null);
  const [backpackOpen, setBackpackOpen] = useState(false);
  const [reward, setReward] = useState<{
    id: MissionId;
    replay: boolean;
  } | null>(null);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const activeMission = EXPEDITION_MISSIONS.find(
    (m) => m.id === activeMissionId,
  );
  const commit = useCallback((next: SavedExpedition) => {
    saveRef.current = next;
    setSave(next);
  }, []);
  const persist = useCallback((next: SavedExpedition) => {
    try {
      localStorage.setItem(EXPEDITION_STORAGE_KEY, JSON.stringify(next));
      setStorageUnavailable(false);
    } catch {
      setStorageUnavailable(true);
    }
  }, []);
  useEffect(() => {
    persist(save);
  }, [save, persist]);
  const openBook = (id: MissionId) => {
    if (document.pointerLockElement) document.exitPointerLock();
    setBackpackOpen(false);
    setReward(null);
    setActiveMissionId(null);
    setBookId(id);
    commit({ ...saveRef.current, lastMissionId: id });
    window.scrollTo(0, 0);
  };
  const discover = useCallback(
    (id: string) => {
      if (!activeMissionId) return;
      const mission = EXPEDITION_MISSIONS.find((m) => m.id === activeMissionId);
      const current = saveRef.current,
        record = current.progress[activeMissionId];
      if (
        !mission?.discoveries.some((d) => d.id === id) ||
        record.discovered.includes(id)
      )
        return;
      commit({
        ...current,
        progress: {
          ...current.progress,
          [activeMissionId]: {
            ...record,
            discovered: [...record.discovered, id],
          },
        },
      });
    },
    [activeMissionId, commit],
  );
  const complete = useCallback(() => {
    if (!activeMissionId) return;
    const current = saveRef.current;
    const next = completeMission(
      current,
      activeMissionId,
      EXPEDITION_MISSIONS,
      new Date().toISOString(),
    );
    if (!next.progress[activeMissionId].completed) return;
    persist(next);
    commit(next); // Ownership is durable before cosmetic presentation begins.
    if (document.pointerLockElement) document.exitPointerLock();
    setReward({
      id: activeMissionId,
      replay: current.progress[activeMissionId].completed,
    });
  }, [activeMissionId, commit, persist]);
  const markViewed = (cardId: CardId) => {
    const current = saveRef.current,
      meta = current.collection[cardId];
    if (!meta || meta.firstViewedAt) return;
    commit({
      ...current,
      collection: {
        ...current.collection,
        [cardId]: { ...meta, firstViewedAt: new Date().toISOString() },
      },
    });
  };
  const openBackpack = () => {
    if (document.pointerLockElement) document.exitPointerLock();
    setBackpackOpen(true);
  };
  const hasNew = Object.values(save.collection).some(
    (meta) => meta?.origin === "mission-completion" && !meta.firstViewedAt,
  );
  return (
    <>
      {activeMission ? (
        <Suspense
          fallback={
            <main className="app-loading" aria-live="polite">
              <span className="app-loading-orbit" aria-hidden="true" />
              <h1>Preparing your expedition</h1>
              <p>Opening the {activeMission.destination} reconstruction.</p>
              <button onClick={() => setActiveMissionId(null)}>
                Return to book
              </button>
            </main>
          }
        >
          <ExplorationExperience
            key={activeMission.id}
            mission={activeMission}
            progress={save.progress[activeMission.id]}
            onDiscover={discover}
            onComplete={complete}
            onExit={() => setActiveMissionId(null)}
            suspended={backpackOpen || reward !== null}
          />
        </Suspense>
      ) : bookId ? (
        <BookReader
          suspended={backpackOpen || reward !== null}
          key={bookId}
          mission={EXPEDITION_MISSIONS.find((m) => m.id === bookId)!}
          progress={save.progress[bookId]}
          page={save.readingLocations[bookId]}
          onPage={(page) => {
            const current = saveRef.current;
            commit({
              ...current,
              readingLocations: { ...current.readingLocations, [bookId]: page },
            });
          }}
          onExplore={() => {
            setActiveMissionId(bookId);
            window.scrollTo(0, 0);
          }}
          onLibrary={() => {
            setBookId(null);
            window.scrollTo(0, 0);
          }}
        />
      ) : (
        <ExpeditionLibrary
          progress={save.progress}
          initialSelection={save.lastMissionId}
          onOpen={openBook}
        />
      )}
      <BackpackLauncher
        onOpen={openBackpack}
        hasNew={hasNew}
        expanded={backpackOpen}
      />
      {backpackOpen && (
        <BackpackExperience
          save={save}
          onClose={() => setBackpackOpen(false)}
          onBook={openBook}
          onView={markViewed}
          onReward={(id) => {
            setBackpackOpen(false);
            setReward({ id, replay: true });
          }}
        />
      )}
      {reward && (
        <MissionRewardExperience
          key={reward.id}
          missionId={reward.id}
          replay={reward.replay}
          attempt={save.optionalAttempts[reward.id]}
          onAttempt={(answer, correct) => {
            const current = saveRef.current;
            commit({
              ...current,
              optionalAttempts: {
                ...current.optionalAttempts,
                [reward.id]: {
                  answer,
                  correct,
                  attempts:
                    (current.optionalAttempts[reward.id]?.attempts ?? 0) + 1,
                },
              },
            });
          }}
          onViewed={() => markViewed(CARD_BY_MISSION[reward.id])}
          onClose={() => setReward(null)}
          onCollection={() => {
            setReward(null);
            setBackpackOpen(true);
          }}
          onBook={() => openBook(reward.id)}
        />
      )}
      {storageUnavailable && (
        <p className="app-storage-notice" role="status">
          Progress is available for this visit. Your browser is not allowing it
          to be saved.
        </p>
      )}
    </>
  );
}
export default App;
