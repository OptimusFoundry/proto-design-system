# Changelog

## 1.0.0 — 2026-10-08

- Extracted from saas-template `webapp/src/proto-design-system/` with history. `src/` is byte-identical to the template at the cut, including the agentworks `testId` passthroughs on FilterTabs, TableRow, Banner and BannerCenter.
- `clsx` declared as a dependency (it was resolving only through a hoisted transitive copy).
- Storybook, Biome and type-checking now run from this repo.
