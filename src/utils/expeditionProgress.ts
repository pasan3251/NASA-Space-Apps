import type { ExpeditionMission, ExpeditionProgress, MissionId } from '../types/expedition';

export const EXPEDITION_STORAGE_KEY = 'offworld-expedition:v1';

// Changing a mission's evidence or task invalidates old learning progress.
// This matters when provisional content is replaced after the briefing.
export function contentRevision(missions: ExpeditionMission[]): string {
  const content = JSON.stringify(missions);
  let hash = 2166136261;
  for (let index = 0; index < content.length; index++) hash = Math.imul(hash ^ content.charCodeAt(index), 16777619);
  return (hash >>> 0).toString(36);
}

export function emptyProgress(missions: ExpeditionMission[]): ExpeditionProgress {
  const result: ExpeditionProgress = {
    surveyor: { discovered: [], completed: false },
    curiosity: { discovered: [], completed: false },
    pioneer: { discovered: [], completed: false },
  };
  for (const mission of missions) result[mission.id] = { discovered: [], completed: false };
  return result;
}

export function normalizeProgress(value: unknown, missions: ExpeditionMission[]): ExpeditionProgress {
  const result = emptyProgress(missions);
  if (!value || typeof value !== 'object') return result;
  const records = value as Record<string, unknown>;
  for (const mission of missions) {
    const candidate = records[mission.id];
    if (!candidate || typeof candidate !== 'object') continue;
    const record = candidate as Record<string, unknown>;
    const knownIds = new Set(mission.discoveries.map((item) => item.id));
    const discovered = Array.isArray(record.discovered)
      ? [...new Set(record.discovered.filter((id): id is string => typeof id === 'string' && knownIds.has(id)))]
      : [];
    result[mission.id] = { discovered, completed: record.completed === true && discovered.length === knownIds.size };
  }
  return result;
}

export function readSavedExpedition(missions: ExpeditionMission[]): { progress: ExpeditionProgress; lastMissionId?: MissionId } {
  try {
    const raw = localStorage.getItem(EXPEDITION_STORAGE_KEY);
    if (!raw) return { progress: emptyProgress(missions) };
    const saved = JSON.parse(raw) as Record<string, unknown>;
    if (!saved || saved.version !== 1 || saved.contentRevision !== contentRevision(missions)) return { progress: emptyProgress(missions) };
    const lastMissionId = missions.find((mission) => mission.id === saved.lastMissionId)?.id;
    return { progress: normalizeProgress(saved.progress, missions), lastMissionId };
  } catch {
    return { progress: emptyProgress(missions) };
  }
}
