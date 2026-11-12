# Apple Design review: expedition journal

## Summary

The journal's job is to turn a mission briefing into an invitation to inspect real exploration heritage. Preserve the closed physical book, two-page spreads, mission-specific component diagrams, historical sources, and single prominent Explore action. The existing subject-led identity is strong; the primary problem was small essential text, not a need for a new visual concept.

Scope: React desktop web, ages 12–16. Reviewed `BookExperience.tsx`, `book.css`, and the existing `desktop.png` / `briefing.png` captures before changes. Applied Apple foundations as web principles, not native macOS conventions. Source review and mathematical contrast checks are complete; the supervisor owns post-change browser/reflow verification.

## Critical — addressed in this pass

- **What:** mission facts, scientific reconstruction notes, source credits, and progress labels were commonly 9–11 CSS px. The folio color `#7e826a` on `#f3ecd9` was 3.37:1. **Why:** `typography.md › Ensuring legibility`: “Use font sizes that most people can read easily.” `accessibility.md › Vision`: “Strive to meet color contrast minimum standards.” **Fix:** body text is 1rem (16px at the standard browser setting), supporting information is 12–14px, and secondary text uses the measured semantic color shown below. No smaller type is introduced at shorter heights.
- **What:** the narrow breakpoint removed the motion control, while fixed dimensions complicated larger text. **Why:** `layout.md › Adaptability`: “Keep functionality the same as size classes change.” **Fix:** keep the labeled motion action at every width, use rem text and dimensions, stack the spread at 56rem, allow natural cover height on compact layouts, and keep all text accessible through scrolling rather than truncation.

## Improvements — addressed

- **High / control clarity:** 44px minimum primary actions, 40px page navigation, 32px minimum other buttons, and 28px source-link line targets. Added press feedback, visible chapter context, a skip link, and `aria-current` navigation. `buttons.md › Best practices`: “Always include a press state for a custom button.” `toolbars.md › Actions`: “Make sure the meaning of each control is clear.”
- **Medium / adaptable color:** CSS properties name paper, ink, secondary text, links, actions, desk, focus, and state roles. Added automatic dark reading colors, increased-contrast colors, forced-colors behavior, and a nontranslucent reading surface. `color.md › Best practices`: “Make sure all your app’s colors work well in light, dark, and increased contrast contexts.”
- **Medium / motion:** the page-turn moment is 350ms, does not block navigation, and can be disabled through the labeled control or `prefers-reduced-motion`. `motion.md › Best practices`: “Make motion optional.” No meaning depends on animation.
- **Medium / screen readers:** discovery status has explicit “Inspected” / “Not yet inspected” text equivalents. `color.md › Inclusive color`: “Avoid relying solely on color”. Keyboard focus is visible and page-heading focus moves only following navigation; `focus-and-selection.md › Best practices`: “Avoid changing focus without people’s interaction.”

## Contrast measurements

Computed from exact sRGB hex values using WCAG relative luminance; these are source-value calculations, not estimates sampled from screenshots. Normal-text target is at least 4.5:1. The cover's accent is used only for large display text.

| Role | Foreground / background | Ratio |
| --- | --- | --- |
| Light paper primary | `#203632` / `#f3ecd9` | 10.89:1 |
| Light paper secondary | `#556451` / `#f3ecd9` | 5.35:1 |
| Light source link | `#3c6252` / `#f3ecd9` | 5.82:1 |
| Light accent text | `#a64b2d` / `#f3ecd9` | 4.86:1 |
| Primary action label | `#fff5e5` / `#a64b2d` | 5.30:1 |
| Dark paper primary | `#eae4d6` / `#233a35` | 9.59:1 |
| Dark paper secondary | `#bfcbb8` / `#233a35` | 7.20:1 |
| Dark source link | `#c1d5ca` / `#233a35` | 7.89:1 |
| Dark accent text | `#edb887` / `#233a35` | 6.83:1 |
| Desk primary | `#efe9d6` / `#152826` | 12.69:1 |
| Desk secondary | `#b8c4b3` / `#152826` | 8.50:1 |
| Cover body | `#263a31` / `#d0aa72` | 5.59:1 |
| Cover large accent title | `#7e3c26` / `#d0aa72` | 3.78:1 |
| Increased-contrast primary | `#10201b` / `#fff8e8` | 15.95:1 |
| Increased-contrast secondary | `#293d30` / `#fff8e8` | 11.00:1 |
| Increased-contrast accent | `#7d2b15` / `#fff8e8` | 8.91:1 |

## Craft notes and retained strengths

The paper, folios, component schematics, and restrained binding shadow express the literal expedition journal requested by the user; they are not an unrelated warm-serif marketing template. Chapters are numbered because they are a meaningful book sequence. Display serif is confined to story headings; navigation and explanatory text use the legible sans face. Removed the decorative viewfinder corner marks: the diagram, caption, and Explore action already establish the viewport. This restraint is design judgment rather than an Apple-specific requirement.

## Platform notes

Read 10 references: accessibility, layout, typography, color, designing-for-macos, cross-platform, buttons, toolbars, motion, focus-and-selection. `SKILL.md › Review process / Step 1` applies foundations to web apps “but not Apple's platform conventions.” Therefore no fake macOS title bar, menu bar, SF font embedding, native setting pane, or decorative Liquid Glass is introduced. `cross-platform.md › Vocabulary` maps Dynamic Type to browser zoom/font settings and size classes to CSS breakpoints. The existing journal remains the visual authority.

Development-only review: no review/checklist text is added to the product flow.
