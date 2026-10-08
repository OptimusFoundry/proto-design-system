import type { Decorator, Preview } from "@storybook/react-vite";
import React, { useEffect } from "react";
import { useGlobals } from "storybook/preview-api";
import "../src/themes/theme.scss";
import { MotionProvider } from "../src/context/MotionProvider";
import { Watermark } from "../src/showcase/Watermark";
import { ThemeGlobalContext } from "../src/themes/themeGlobalContext";
import {
	applyTheme,
	type ThemeName,
	themeNames,
	themes,
} from "../src/themes/themes";
import styles from "./preview.module.scss";

// Watermark renders on every story (fixed position, so it stays in frame for
// any screen recording or screenshot regardless of which story is active).
const canvasDecorator: Decorator = (Story, context) => {
	const isFullscreen = context.parameters?.layout === "fullscreen";
	const className = isFullscreen ? styles.canvasFullscreen : styles.canvas;
	return React.createElement(
		React.Fragment,
		null,
		React.createElement("div", { className }, React.createElement(Story)),
		React.createElement(Watermark),
	);
};

// Every story needs a theme applied via applyTheme() (data-theme attribute +
// per-theme Google Fonts) — without this, stories fall back to _colors.scss's
// bare :root values, which are the old editorial-theme fallback, not the
// current paper default. This runs for every story via the global "theme"
// toolbar control below, so switching themes works everywhere, not just on
// the UI Kit Overview page. useGlobals (storybook/preview-api) stays confined
// to this one decorator, always called the same way for every story — a
// story component calling it directly broke Storybook's own hook bookkeeping
// across navigation (see themeGlobalContext.ts). Stories that want to read
// or change the theme themselves (e.g. the UI Kit Overview picker) consume
// ThemeGlobalContext with a plain useContext instead.
const themeDecorator: Decorator = (Story) => {
	const [globals, updateGlobals] = useGlobals();
	const requested = globals.theme as ThemeName | undefined;
	const theme: ThemeName =
		requested && requested in themes ? requested : "paper";

	useEffect(() => {
		applyTheme(theme);
	}, [theme]);

	const setTheme = (next: ThemeName) => updateGlobals({ theme: next });

	// MotionProvider reads live --duration-*/--ease-*/--spring-* off
	// document.documentElement (see MotionProvider.tsx) — it doesn't consume
	// this decorator's theme state directly, just observes the data-theme
	// attribute applyTheme() sets above, so nesting it here is only about
	// giving every story access to useMotionTokens(), not about propagating
	// `theme` itself.
	return React.createElement(
		ThemeGlobalContext.Provider,
		{ value: { theme, setTheme } },
		React.createElement(MotionProvider, null, React.createElement(Story)),
	);
};

const preview: Preview = {
	parameters: {
		layout: "centered",
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},

	globalTypes: {
		theme: {
			description: "Design system theme",
			toolbar: {
				title: "Theme",
				icon: "paintbrush",
				dynamicTitle: true,
				items: themeNames.map((name) => ({
					value: name,
					title: themes[name].label,
				})),
			},
		},
	},

	decorators: [themeDecorator, canvasDecorator],

	initialGlobals: {
		theme: "paper",
	},
};

export default preview;
