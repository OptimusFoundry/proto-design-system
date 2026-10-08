# Changelog

## 1.1.0 — 2026-10-08

Absorbs downstream drift so each product can drop its in-tree copy without losing anything.

- **`light` theme restored.** It was cut from the template catalog on 2026-08-02, but AITravel and tickuptoks still ship it as their default.
- **FileUpload featured image** (from growth-tools): an optional `featuredId` and `onSetFeatured`, which let a user mark one attached image as featured.

## 1.0.0 — 2026-10-08

- Extracted from saas-template `webapp/src/proto-design-system/` with history. `src/` is byte-identical to the template at the cut, including the agentworks `testId` passthroughs on FilterTabs, TableRow, Banner and BannerCenter.
- `clsx` declared as a dependency (it was resolving only through a hoisted transitive copy).
- Storybook, Biome and type-checking now run from this repo.
