import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const loadTs = async (path) => {
  const source = readFileSync(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ES2020 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
};
const { EXPEDITION_MISSIONS: missions } = await loadTs('../src/data/expeditionMissions.ts');
const { contentRevision, normalizeProgress, readSavedExpedition } = await loadTs('../src/utils/expeditionProgress.ts');
assert.equal(missions.length, 3);
assert.equal(new Set(missions.map((m) => m.id)).size, 3);
for (const mission of missions) {
  assert.equal(mission.discoveries.length, 4, `${mission.id}: four essential discoveries`);
  assert.equal(new Set(mission.discoveries.map((d) => d.id)).size, mission.discoveries.length);
  const sourceIds = new Set(mission.sources.map((s) => s.id));
  for (const source of mission.sources) assert.equal(new URL(source.url).protocol, 'https:');
  for (const discovery of mission.discoveries) {
    assert.ok(discovery.sourceIds.length, `${discovery.id}: source required`);
    for (const id of discovery.sourceIds) assert.ok(sourceIds.has(id), `${mission.id}/${discovery.id}: missing source ${id}`);
    assert.ok(discovery.position.every(Number.isFinite));
    for (const key of ['summary', 'story', 'science', 'engineering', 'status']) assert.ok(discovery[key]?.length > 20);
  }
  assert.ok(mission.task.correctIndex >= 0 && mission.task.correctIndex < mission.task.options.length);
  assert.ok(mission.sceneNote.includes('Fictional') || mission.sceneNote.includes('Schematic'));
}
const cleaned = normalizeProgress({ curiosity: { discovered: ['wheels', 'wheels', 'bad-id', 3], completed: true } }, missions);
assert.deepEqual(cleaned.curiosity, { discovered: ['wheels'], completed: false });
assert.equal(normalizeProgress(null, missions).pioneer.completed, false);
assert.equal(normalizeProgress({ pioneer: { discovered: missions[2].discoveries.map((d) => d.id), completed: true } }, missions).pioneer.completed, true);
globalThis.localStorage = { getItem: () => '{broken' };
assert.equal(readSavedExpedition(missions).progress.curiosity.discovered.length, 0);
globalThis.localStorage = { getItem: () => { throw new Error('Storage denied'); } };
assert.equal(readSavedExpedition(missions).progress.surveyor.completed, false);
globalThis.localStorage = { getItem: () => JSON.stringify({ version: 1, lastMissionId: 'unrecognized', progress: {} }) };
assert.equal(readSavedExpedition(missions).lastMissionId, undefined);
const savedRecord = { version: 1, contentRevision: contentRevision(missions), lastMissionId: 'pioneer', progress: { pioneer: { discovered: missions[2].discoveries.map((d) => d.id), completed: true } } };
globalThis.localStorage = { getItem: () => JSON.stringify(savedRecord) };
assert.equal(readSavedExpedition(missions).progress.pioneer.completed, true);
assert.equal(readSavedExpedition(missions).lastMissionId, 'pioneer');
const revised = structuredClone(missions);
revised[2].task.question += ' Revised evidence.';
assert.equal(readSavedExpedition(revised).progress.pioneer.completed, false);
console.log('Passed: 3 missions, 12 sourced discoveries, task answers, progress validation, denied/corrupt storage, valid resume, and content-change invalidation.');
