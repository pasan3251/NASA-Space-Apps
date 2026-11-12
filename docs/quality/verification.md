# Demonstration verification

Verified 13 November 2026 (Asia/Colombo). This is a provisional desktop demonstration, not the final competition content.

## Automated checks

- `npm run build`: TypeScript and Vite production build pass.
- `npm test`: three mission records, twelve sourced discoveries, valid source references, finite coordinates, valid task answers, progress deduplication/validation, denied/corrupt storage recovery, valid resume, and content-change invalidation pass.
- Impeccable mechanical detector on the changed UI files: no findings (`[]`).

The build reports a size warning for the lazily loaded WebGL chunk (approximately 956 kB before gzip, 260 kB gzip). The book entry bundle is approximately 192 kB before gzip / 61 kB gzip. This is a build-size observation, not a measured frame-rate or loading-performance claim.

## Playwright journeys

- Cover opens to introduction, contents selects a chapter, and the mission enters/exits to the correct book briefing.
- All three mission journeys inspect four records, expose source links, answer the evidence question and complete a journal entry.
- Evidence task is locked before all records are inspected; an incorrect answer cannot complete Curiosity.
- Journal progress survives reload. The built production preview also completed the Curiosity journey and restored progress.
- Surface walking changes the rendered view after verifying stationary frames are stable. Orbit switching, teleport-to-discovery and the proximity F inspection work.
- Pioneer jetpack vertical movement changes the rendered view; official Pioneer model loads.
- Drag-to-look changes the rendered camera view in the production build.
- The automated browser refuses pointer capture. The application displays the recovery message; drag-to-look and orbit are available. Successful pointer capture is not claimed from this environment.
- An isolated context with WebGL disabled still completes the Curiosity records/task journey in archive mode.
- An isolated context with browser storage denied displays a nonblocking notice.
- Normal production journey has no console errors or warnings and no cross-origin runtime resource requests. Opening historical source links still requires network access.

## Book design verification

Applied the user-requested Apple Design Skill from parent `.design-rules`. Desktop web receives the skill's accessibility and design foundations, not native macOS conventions.

Inspected cover, introduction, contents and Curiosity briefing at 1440×1000; compact desktop briefing at 1280×720; reflow at 720×800 and basic narrow reading at 390×844; dark colors and increased contrast. No horizontal document overflow in the tested widths. Essential copy remains 16px body with 12–14px secondary text. The compact reading view keeps Explore reachable by scrolling. Reduced-motion access remains visible.

Original captures are under the ignored local `Visual-Testing/.impeccable/review/` archive (development evidence, Git-ignored). Long desktop pages scroll independently within their paper panels; narrow pages stack and scroll in the main journal. This is intentional, not a claim that every record fits one viewport.

Independent read-only finish reviewer: **ship** for the provisional desktop demonstration, no material visual findings in reviewed evidence. Independent content/integration reviewer: no material findings in reviewed files; historical sources accepted from the prior verified research. Neither independent reviewer repeated browser execution.

## Scope boundaries

Models, terrain, inspection positions and future encounter conditions are illustrative where labeled. Actual georeferenced terrain/traverse playback, archival video and narration are not included. The supplied Curiosity model's original download is unverified and disclosed in `docs/assets.md`. Challenge-provided source eligibility and final mission content must be checked after the competition briefing.

The original verification did not publish a deployment. Repository restructuring and publication are recorded by the subsequent Git history; the `.design-rules` submodule remains pinned in `.gitmodules`.
