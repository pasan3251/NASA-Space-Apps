import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

const loadTs = async (path) => {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ES2020,
    },
  });
  return import(
    `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
  );
};
const { EXPEDITION_MISSIONS: missions } = await loadTs(
  "../src/data/expeditionMissions.ts",
);
const {
  contentRevision,
  normalizeProgress,
  readSavedExpedition,
  normalizeSave,
  emptySave,
  completeMission,
  collectionCount,
  EXPEDITION_STORAGE_KEY,
  LEGACY_STORAGE_KEY,
} = await loadTs("../src/utils/expeditionProgress.ts");
assert.equal(missions.length, 3);
assert.equal(new Set(missions.map((m) => m.id)).size, 3);
for (const mission of missions) {
  assert.equal(
    mission.discoveries.length,
    4,
    `${mission.id}: four essential discoveries`,
  );
  assert.equal(
    new Set(mission.discoveries.map((d) => d.id)).size,
    mission.discoveries.length,
  );
  const sourceIds = new Set(mission.sources.map((s) => s.id));
  for (const source of mission.sources)
    assert.equal(new URL(source.url).protocol, "https:");
  for (const discovery of mission.discoveries) {
    assert.ok(discovery.sourceIds.length, `${discovery.id}: source required`);
    for (const id of discovery.sourceIds)
      assert.ok(
        sourceIds.has(id),
        `${mission.id}/${discovery.id}: missing source ${id}`,
      );
    assert.ok(discovery.position.every(Number.isFinite));
    for (const key of ["summary", "story", "science", "engineering", "status"])
      assert.ok(discovery[key]?.length > 20);
  }
  assert.ok(
    mission.task.correctIndex >= 0 &&
      mission.task.correctIndex < mission.task.options.length,
  );
  assert.ok(
    mission.sceneNote.includes("Fictional") ||
      mission.sceneNote.includes("Schematic"),
  );
}
const cleaned = normalizeProgress(
  {
    curiosity: {
      discovered: ["wheels", "wheels", "bad-id", 3],
      completed: true,
    },
  },
  missions,
);
assert.deepEqual(cleaned.curiosity, {
  discovered: ["wheels"],
  completed: false,
});
assert.equal(normalizeProgress(null, missions).pioneer.completed, false);
assert.equal(
  normalizeProgress(
    {
      pioneer: {
        discovered: missions[2].discoveries.map((d) => d.id),
        completed: true,
      },
    },
    missions,
  ).pioneer.completed,
  true,
);
globalThis.localStorage = { getItem: () => "{broken" };
assert.equal(
  readSavedExpedition(missions).progress.curiosity.discovered.length,
  0,
);
globalThis.localStorage = {
  getItem: () => {
    throw new Error("Storage denied");
  },
};
assert.equal(readSavedExpedition(missions).progress.surveyor.completed, false);
globalThis.localStorage = {
  getItem: () =>
    JSON.stringify({ version: 1, lastMissionId: "unrecognized", progress: {} }),
};
assert.equal(readSavedExpedition(missions).lastMissionId, undefined);
const savedRecord = {
  version: 1,
  contentRevision: contentRevision(missions),
  lastMissionId: "pioneer",
  progress: {
    pioneer: {
      discovered: missions[2].discoveries.map((d) => d.id),
      completed: true,
    },
  },
};
globalThis.localStorage = { getItem: () => JSON.stringify(savedRecord) };
assert.equal(readSavedExpedition(missions).progress.pioneer.completed, true);
assert.equal(readSavedExpedition(missions).lastMissionId, "pioneer");
const revised = structuredClone(missions);
revised[2].task.question += " Revised evidence.";
assert.equal(
  readSavedExpedition(revised).progress.pioneer.completed,
  true,
  "Editorial revisions must not erase valid legacy completion.",
);
const migrated = readSavedExpedition(missions);
assert.equal(migrated.version, 2);
assert.equal(migrated.collection["pioneer-messenger"].earnedAt, null);
assert.equal(
  migrated.collection["pioneer-messenger"].origin,
  "legacy-completion",
);
const storage = new Map([[LEGACY_STORAGE_KEY, JSON.stringify(savedRecord)]]);
globalThis.localStorage = { getItem: (key) => storage.get(key) ?? null };
assert.equal(readSavedExpedition(missions).progress.pioneer.completed, true);
assert.equal(
  storage.has(LEGACY_STORAGE_KEY),
  true,
  "Reading migration must leave the original save intact.",
);
const v2 = {
  ...migrated,
  readingLocations: { surveyor: 3, curiosity: 1, pioneer: 2 },
  optionalAttempts: { pioneer: { answer: 2, attempts: 3, correct: true } },
};
storage.set(EXPEDITION_STORAGE_KEY, JSON.stringify(v2));
assert.deepEqual(
  readSavedExpedition(revised),
  v2,
  "V2 reload preserves books, completion, card metadata and optional attempts.",
);
storage.set(EXPEDITION_STORAGE_KEY, "{broken");
assert.equal(
  readSavedExpedition(missions).progress.pioneer.completed,
  true,
  "Corrupt v2 can recover a valid legacy backup.",
);
const invalid = normalizeSave(
  {
    version: 2,
    progress: {},
    collection: { "pioneer-messenger": { earnedAt: "bad" }, invented: {} },
    readingLocations: { curiosity: 999 },
    optionalAttempts: { curiosity: { attempts: -4 } },
  },
  missions,
);
assert.deepEqual(invalid.collection, {});
assert.equal(invalid.readingLocations.curiosity, 0);
assert.deepEqual(invalid.optionalAttempts, {});
let journey = emptySave(missions);
assert.equal(
  completeMission(journey, "surveyor", missions, "2026-11-14T00:00:00Z"),
  journey,
  "Records are required before completion.",
);
for (const mission of missions) {
  journey.progress[mission.id].discovered = mission.discoveries.map(
    (d) => d.id,
  );
  journey = completeMission(
    journey,
    mission.id,
    missions,
    "2026-11-14T00:00:00Z",
  );
  const beforeReplay = journey;
  journey = completeMission(
    journey,
    mission.id,
    missions,
    "2026-11-15T00:00:00Z",
  );
  assert.equal(
    journey,
    beforeReplay,
    "Replay is idempotent and preserves the earned timestamp.",
  );
}
assert.equal(collectionCount(journey), 3);
assert.equal(Object.keys(journey.collection).length, 3);
assert.equal(
  normalizeSave(
    { ...journey, collection: { ...journey.collection, future: {} } },
    missions,
  ).collection.future,
  undefined,
);
const { COLLECTIBLE_CARDS: cards } = await loadTs(
  "../src/data/collectibleCards.ts",
);
const { OPTIONAL_QUESTIONS: questions } = await loadTs(
  "../src/data/optionalQuestions.ts",
);
for (const card of cards) {
  assert.ok(missions.some((m) => m.id === card.missionId));
  assert.equal(new URL(card.source).protocol, "https:");
  assert.ok(
    readFileSync(new URL("../public" + card.artwork, import.meta.url)).length >
      0,
  );
}
assert.equal(new Set(cards.map((c) => c.id)).size, 3);
for (const mission of missions) {
  const q = questions[mission.id];
  assert.ok(q.correctIndex >= 0 && q.correctIndex < q.options.length);
  assert.ok(q.explanation.length > 30);
}
const {
  LIGHT_SPEED_KM_S,
  LIGHT_TIME_PRESETS,
  lightTimeSeconds,
  formatLightTime,
} = await loadTs("../src/utils/lightTime.ts");
assert.equal(LIGHT_SPEED_KM_S, 299792.458);
assert.ok(Math.abs(lightTimeSeconds(12.23e9) - 40794.889) < 0.01);
assert.equal(formatLightTime(lightTimeSeconds(12.23e9)), "11h 20m");
assert.equal(formatLightTime(2 * lightTimeSeconds(12.23e9)), "22h 40m");
assert.ok(
  Math.abs(lightTimeSeconds(LIGHT_TIME_PRESETS[1].distanceKm) - 1.28222) <
    0.001,
);
assert.ok(
  Math.abs(lightTimeSeconds(LIGHT_TIME_PRESETS[2].distanceKm) - 499.00478) <
    0.001,
);
console.log(
  "Passed: 3 missions, 12 sourced discoveries, tasks, v1 migration, v2 roundtrip, content resilience, denied/corrupt storage, repeat-safe 3-card rewards, artwork, optional questions and numerical light-time checks.",
);
