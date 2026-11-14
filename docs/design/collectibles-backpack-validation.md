# Collectible and Backpack revision — validation record

Validated 14 November 2026. Design-only revision in the existing Figma file.

- Native inventory: 12 pages, 4 variable collections, 80 variables, 32 component sets, 208 components.
- CollectibleCard retains set 8:145 and all six original variant IDs; it now has 27 variants. Compact tiles have 18 variants.
- Ten prototype starting flows exist. A recursive audit, including nested instances, found 562 navigation links and no missing, cross-page or self destinations.
- Reachability passed for Backpack opening, Moon inspection, locked Pioneer guidance, reward addition, reduced-motion collection and mobile inspection.
- All six desktop collection profiles agree between the displayed count and unlocked tiles: 0, 1, 1, 1, 2 and 3, always out of three.
- Reviewed rendered card states, Backpack open/closed, reward, detail/reverse, mobile, tablet, overview, foundations and handoff. Final mobile launcher has a fixed rail and a 128 × 44 control. Review boards have no direct-child overflow.
- All five source artwork files have SHA-256, dimensions and provenance in the asset manifest. They are separate from live interface text and controls.
- Existing `npm test` passed: three missions, 12 sourced discoveries, tasks, progress validation, denied/corrupt storage, resume and content-change invalidation.
- Existing `npm run build` passed. The exploration bundle remains 956.33 kB minified and triggers the existing chunk-size warning.
- `git diff --exit-code -- src package.json package-lock.json scripts` passed. No application source or dependency changes were made.

Figma loaded in an isolated Playwright tab. Its canvas viewer did not expose usable semantic interaction targets for automated walkthroughs; native graph checks and renders supply the design verification. This is not a claim of end-to-end application interaction or accessibility validation.

The profiles are representative fixtures. Actual localStorage migration, unique awards, pointer release, keyboard focus, screen-reader behavior, reduced-motion detection, 200% zoom and target-laptop performance must be tested after implementation is approved. Fine hardware-art review and optimized web derivatives remain production work.

[Revision contract](collectibles-backpack-revision.md) · [Component mapping](offworld-figma-handoff.md) · [Roadmap](../plans/2026-11-13-offworld-revised-roadmap.md) · [Asset provenance](assets/rewards/README.md)
