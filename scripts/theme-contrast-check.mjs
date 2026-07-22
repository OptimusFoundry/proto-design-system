#!/usr/bin/env node
// Headless port of showcase/foundations/contrast.ts's wcagRatio/apcaLc, minus
// the canvas-based CSS color parser (which needs a browser). Reimplements
// OKLCH -> linear sRGB directly so theme-designer subagents get real Lc/WCAG
// numbers without a shared browser instance across a large parallel sweep.
//
// Usage: node scripts/theme-contrast-check.mjs <path-to-_theme.scss>

import { readFileSync } from "node:fs";

function parseOklch(value) {
	const m = value
		.trim()
		.match(/^oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)deg\s*\)$/);
	if (!m) return null;
	return { l: Number(m[1]) / 100, c: Number(m[2]), h: Number(m[3]) };
}

function oklchToLinearSrgb({ l, c, h }) {
	const hRad = (h * Math.PI) / 180;
	const a = c * Math.cos(hRad);
	const b = c * Math.sin(hRad);

	const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = l - 0.0894841775 * a - 1.291485548 * b;

	const l3 = l_ ** 3;
	const m3 = m_ ** 3;
	const s3 = s_ ** 3;

	return {
		r: 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
		g: -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
		b: -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
	};
}

function gammaEncode(c) {
	const clamped = Math.min(1, Math.max(0, c));
	return clamped <= 0.0031308
		? 12.92 * clamped
		: 1.055 * clamped ** (1 / 2.4) - 0.055;
}

function oklchToRgb8(oklch) {
	const lin = oklchToLinearSrgb(oklch);
	const outOfGamut = [lin.r, lin.g, lin.b].some((v) => v < -0.001 || v > 1.001);
	const rgb = [lin.r, lin.g, lin.b].map((v) =>
		Math.round(gammaEncode(v) * 255),
	);
	return { rgb, outOfGamut };
}

function wcagLum([r, g, b]) {
	const f = (channel) => {
		const c = channel / 255;
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	};
	return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function wcagRatio(fg, bg) {
	const [hi, lo] = [wcagLum(fg), wcagLum(bg)].sort((a, b) => b - a);
	return (hi + 0.05) / (lo + 0.05);
}

function apcaY([r, g, b]) {
	const f = (channel) => (channel / 255) ** 2.4;
	return 0.2126729 * f(r) + 0.7151522 * f(g) + 0.072175 * f(b);
}

function apcaLc(txt, bg) {
	const blkThrs = 0.022;
	const blkClmp = 1.414;
	const clamp = (y) => (y > blkThrs ? y : y + (blkThrs - y) ** blkClmp);
	const yTx = clamp(apcaY(txt));
	const yBg = clamp(apcaY(bg));
	if (Math.abs(yBg - yTx) < 0.0005) return 0;
	if (yBg > yTx) {
		const sapc = (yBg ** 0.56 - yTx ** 0.57) * 1.14;
		return sapc < 0.1 ? 0 : (sapc - 0.027) * 100;
	}
	const sapc = (yBg ** 0.65 - yTx ** 0.62) * 1.14;
	return sapc > -0.1 ? 0 : (sapc + 0.027) * 100;
}

function parseThemeTokens(scssPath) {
	const src = readFileSync(scssPath, "utf8");
	const tokens = new Map();
	const re = /(--[a-z0-9-]+)\s*:\s*(oklch\([^;]+\));/gi;
	let match;
	while ((match = re.exec(src))) {
		tokens.set(match[1], match[2].replace(/\s+/g, " ").trim());
	}
	return tokens;
}

const PAIRS = [
	["content on background", "--color-base-content", "--color-background"],
	[
		"content-secondary on background",
		"--color-base-content-secondary",
		"--color-background",
	],
	[
		"content-tertiary on background",
		"--color-base-content-tertiary",
		"--color-background",
	],
	["muted on background", "--color-muted", "--color-background"],
	[
		"text-disabled on background",
		"--color-text-disabled",
		"--color-background",
	],
	["primary-content on primary", "--color-primary-content", "--color-primary"],
	[
		"secondary-content on secondary",
		"--color-secondary-content",
		"--color-secondary",
	],
	// Checked against solid --color-accent, not --color-accent-bg — matches
	// every other semantic's -content pairing above/below (content always
	// renders on the solid fill in Button/Badge; -bg is a separate soft-wash
	// role paired with base-content, never with -content).
	["accent-content on accent", "--color-accent-content", "--color-accent"],
	["success-content on success", "--color-success-content", "--color-success"],
	["warning-content on warning", "--color-warning-content", "--color-warning"],
	["error-content on error", "--color-error-content", "--color-error"],
	["info-content on info", "--color-info-content", "--color-info"],
	["border on background", "--color-border", "--color-background"],
	["surface on background", "--color-surface", "--color-background"],
];

function main() {
	const scssPath = process.argv[2];
	if (!scssPath) {
		console.error("Usage: node scripts/theme-contrast-check.mjs <_theme.scss>");
		process.exit(1);
	}
	const tokens = parseThemeTokens(scssPath);
	console.log(`Theme file: ${scssPath}`);
	console.log(`Parsed ${tokens.size} oklch() leaf tokens\n`);

	for (const [label, fgName, bgName] of PAIRS) {
		const fgRaw = tokens.get(fgName);
		const bgRaw = tokens.get(bgName);
		if (!fgRaw || !bgRaw) {
			console.log(
				`${label.padEnd(34)} SKIP (missing ${!fgRaw ? fgName : bgName})`,
			);
			continue;
		}
		const fgOklch = parseOklch(fgRaw);
		const bgOklch = parseOklch(bgRaw);
		if (!fgOklch || !bgOklch) {
			console.log(
				`${label.padEnd(34)} SKIP (unparseable oklch: ${!fgOklch ? fgRaw : bgRaw})`,
			);
			continue;
		}
		const fg = oklchToRgb8(fgOklch);
		const bg = oklchToRgb8(bgOklch);
		const lc = apcaLc(fg.rgb, bg.rgb);
		const ratio = wcagRatio(fg.rgb, bg.rgb);
		const gamutFlag = fg.outOfGamut || bg.outOfGamut ? "  ⚠ out-of-gamut" : "";
		console.log(
			`${label.padEnd(34)} Lc ${lc.toFixed(1).padStart(6)}  /  ${ratio.toFixed(2)}:1${gamutFlag}`,
		);
	}
}

main();
