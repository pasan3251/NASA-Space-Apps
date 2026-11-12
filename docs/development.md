# Development guide

The active application lives at the repository root. `Visual-Testing/` is the original local sandbox and is deliberately excluded from the parent repository; do not run the updated application from that folder.

## Boundaries

- `src/features/book/` owns the book, page navigation and briefing presentation.
- `src/features/exploration/` owns spatial controls, discovery archives, tasks and scene geometry.
- `src/data/expeditionMissions.ts` owns replaceable mission content and scientific references.
- `src/types/expedition.ts` defines shared contracts.
- `src/utils/expeditionProgress.ts` validates saved progress and invalidates it when content changes.
- `public/` contains only browser-served assets and their required licenses. Credits and source explanations live in `docs/`.

Book content should remain independent of camera controls. Do not embed scientific claims in scene components when they belong in the mission records. Hardware, terrain and future conditions must be labeled according to their evidence level.

## Updating the demonstration

1. Confirm the competition-provided missions and at least one eligible NASA data source.
2. Update the story, historical status reference date, four discoveries, task and source IDs in the mission data.
3. Update `MissionWorld.tsx` when changing hardware models or inspection positions. Scene geometry currently switches on the three existing mission IDs; editing text alone does not replace a world.
4. Keep documented history, reconstruction and fictional future visits distinct.
5. Add runtime models/textures to `public/` with source, rights, credit and transformation notes in `docs/assets.md`.
6. Run `npm test` and `npm run build`, then verify the book-to-exploration-to-journal flow in the browser.

Do not publish local screenshots, raw Blender/STL authoring inputs, dependency folders, environment files, or agent state. The original sandbox and its separate remote are not part of this repository's publication workflow.

## Design references

`PRODUCT.md` records requirements; `DESIGN.md` describes implemented tokens and components. `.design-rules` is the explicitly requested Apple Design Skill submodule. Apply its accessibility and design foundations to the website without imitating native macOS window controls. Design review notes are in `docs/quality/apple-design-review.md`.
