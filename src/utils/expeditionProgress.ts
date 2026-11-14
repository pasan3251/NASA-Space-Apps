import type {
  CardId,
  ExpeditionMission,
  ExpeditionProgress,
  MissionId,
  SavedExpedition,
} from "../types/expedition";

export const LEGACY_STORAGE_KEY = "offworld-expedition:v1";
export const EXPEDITION_STORAGE_KEY = "offworld-expedition:v2";
export const CARD_BY_MISSION: Record<MissionId, CardId> = {
  surveyor: "surveyor-camera",
  curiosity: "curiosity-skycrane",
  pioneer: "pioneer-messenger",
};
// Retained for legacy diagnostics. Presentation changes never invalidate v2 saves.
export function contentRevision(missions: ExpeditionMission[]): string {
  const content = JSON.stringify(missions);
  let hash = 2166136261;
  for (let i = 0; i < content.length; i++)
    hash = Math.imul(hash ^ content.charCodeAt(i), 16777619);
  return (hash >>> 0).toString(36);
}
export function emptyProgress(
  missions: ExpeditionMission[],
): ExpeditionProgress {
  const result: ExpeditionProgress = {
    surveyor: { discovered: [], completed: false },
    curiosity: { discovered: [], completed: false },
    pioneer: { discovered: [], completed: false },
  };
  for (const mission of missions)
    result[mission.id] = { discovered: [], completed: false };
  return result;
}
export function normalizeProgress(
  value: unknown,
  missions: ExpeditionMission[],
  preserveCompletion = false,
): ExpeditionProgress {
  const result = emptyProgress(missions);
  if (!value || typeof value !== "object") return result;
  for (const mission of missions) {
    const record = (value as Record<string, any>)[mission.id];
    if (!record || typeof record !== "object") continue;
    const knownIds = new Set(mission.discoveries.map((item) => item.id));
    const discovered = Array.isArray(record.discovered)
      ? ([
          ...new Set(
            record.discovered.filter(
              (id: unknown): id is string =>
                typeof id === "string" && knownIds.has(id),
            ),
          ),
        ] as string[])
      : [];
    result[mission.id] = {
      discovered,
      completed:
        record.completed === true &&
        (preserveCompletion || discovered.length === knownIds.size),
    };
  }
  return result;
}
export function emptySave(missions: ExpeditionMission[]): SavedExpedition {
  return {
    version: 2,
    progress: emptyProgress(missions),
    readingLocations: { surveyor: 0, curiosity: 0, pioneer: 0 },
    collection: {},
    optionalAttempts: {},
  };
}
const validDate = (value: unknown): value is string =>
  typeof value === "string" && Number.isFinite(Date.parse(value));
export function normalizeSave(
  value: unknown,
  missions: ExpeditionMission[],
): SavedExpedition {
  const result = emptySave(missions);
  if (!value || typeof value !== "object") return result;
  const saved = value as Record<string, any>;
  if (saved.version !== 1 && saved.version !== 2) return result;
  // Validate known IDs before considering the old editorial hash.
  result.progress = normalizeProgress(
    saved.progress,
    missions,
    saved.version === 2,
  );
  result.lastMissionId = missions.find((m) => m.id === saved.lastMissionId)?.id;
  for (const mission of missions) {
    const id = mission.id,
      cardId = CARD_BY_MISSION[id],
      page = saved.readingLocations?.[id];
    if (Number.isInteger(page) && page >= 0 && page <= 3)
      result.readingLocations[id] = page;
    if (result.progress[id].completed) {
      const meta = saved.collection?.[cardId];
      result.collection[cardId] = {
        earnedAt: validDate(meta?.earnedAt) ? meta.earnedAt : null,
        firstViewedAt: validDate(meta?.firstViewedAt)
          ? meta.firstViewedAt
          : null,
        origin:
          meta?.origin === "mission-completion"
            ? "mission-completion"
            : "legacy-completion",
      };
    }
    const attempt = saved.optionalAttempts?.[id];
    if (attempt && Number.isInteger(attempt.attempts) && attempt.attempts >= 0)
      result.optionalAttempts[id] = {
        attempts: Math.min(attempt.attempts, 10000),
        answer:
          Number.isInteger(attempt.answer) &&
          attempt.answer >= 0 &&
          attempt.answer <= 2
            ? attempt.answer
            : null,
        correct: attempt.correct === true,
      };
  }
  return result;
}
export function readSavedExpedition(
  missions: ExpeditionMission[],
): SavedExpedition {
  try {
    const current = localStorage.getItem(EXPEDITION_STORAGE_KEY);
    if (current) {
      try {
        const parsed = JSON.parse(current);
        if (parsed?.version === 2) return normalizeSave(parsed, missions);
      } catch {
        /* Try a valid legacy backup. */
      }
    }
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    return legacy
      ? normalizeSave(JSON.parse(legacy), missions)
      : emptySave(missions);
  } catch {
    return emptySave(missions);
  }
}
export function completeMission(
  save: SavedExpedition,
  id: MissionId,
  missions: ExpeditionMission[],
  now: string,
): SavedExpedition {
  const mission = missions.find((m) => m.id === id),
    record = save.progress[id];
  if (
    !mission ||
    record.completed ||
    !mission.discoveries.every((d) => record.discovered.includes(d.id))
  )
    return save;
  return {
    ...save,
    progress: { ...save.progress, [id]: { ...record, completed: true } },
    collection: {
      ...save.collection,
      [CARD_BY_MISSION[id]]: save.collection[CARD_BY_MISSION[id]] ?? {
        earnedAt: now,
        firstViewedAt: null,
        origin: "mission-completion",
      },
    },
  };
}
export const collectionCount = (save: SavedExpedition) =>
  Object.keys(CARD_BY_MISSION).filter(
    (id) => save.progress[id as MissionId].completed,
  ).length;
