# Proto design system

Proto, extracted from [saas-template](https://github.com/OptimusFoundry/saas-template) on 2026-10-08 with its git history. It is **frozen and retiring**: products are moving to [quiet](https://github.com/OptimusFoundry/quiet). It gets fixes and absorbed downstream drift only — no new components. The plan is `docs/design-system-migration.md` in saas-template.

- **Storybook**: https://ui.protoapp.xyz

## Install

The package ships **source** (TSX + SCSS); the consuming app's Vite and Sass compile it, exactly as when it lived in `webapp/src/proto-design-system/`. Install from a git tag:

```jsonc
// package.json
"@optimusfoundry/proto-design-system": "github:OptimusFoundry/proto-design-system#v1.0.0"
```

Point the existing `@/proto-design-system` alias at the package, ahead of the `@` alias, so no import changes:

```ts
// vite.config.ts
resolve: {
	alias: [
		{ find: /^@\/proto-design-system/, replacement: path.resolve(__dirname, "node_modules/@optimusfoundry/proto-design-system/src") },
		{ find: "@", replacement: path.resolve(__dirname, "src") },
	],
},
optimizeDeps: { exclude: ["@optimusfoundry/proto-design-system"] },
```

```jsonc
// tsconfig.json → compilerOptions.paths
"@/proto-design-system/*": ["./node_modules/@optimusfoundry/proto-design-system/src/*"],
"@/*": ["./src/*"]
```

Peers: `react`, `react-dom` (^19.2) and `lucide-react` (^1.8). CI in a consuming repo needs read access to this private repo before `npm install` (a token secret plus `git config url."https://x-access-token:${TOKEN}@github.com/".insteadOf "https://github.com/"`).

## Develop

```
npm install
npm run storybook        # http://localhost:6010
npm run typecheck
npm run lint
npm run build-storybook
```

## Release

Bump `version` in `package.json`, add a `CHANGELOG.md` entry, commit, and push a `vX.Y.Z` tag. Consumers pin the tag.
