// Canonical motion values for JS-driven (motion/react) animations.
// These mirror the CSS --duration-* / --ease-* tokens in tokens/_motion.scss so
// that JS transitions and CSS transitions share one motion language. Import
// these instead of hand-writing `duration`/`ease` literals in components.

/** Mirrors --ease-out: cubic-bezier(0.22, 1, 0.36, 1) — the house ease. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Mirrors --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1). */
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;

/** Durations in SECONDS (motion/react units), mirroring the ms duration tokens. */
export const DURATION = {
	fast: 0.15, // --duration-fast   (150ms)
	normal: 0.24, // --duration-normal (240ms)
	slow: 0.4, // --duration-slow   (400ms)
} as const;
