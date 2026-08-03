import { useEffect } from "react";

/**
 * Tracks pointer position as --pointer-x/--pointer-y (viewport percentages)
 * on the document root. Themes that want an ambient, pointer-reactive sheen
 * on their canvas (see _clay.scss/_clay-dark.scss) read these; every other
 * theme ignores them entirely, so this is safe to mount globally regardless
 * of which theme is active.
 *
 * Does nothing under prefers-reduced-motion: reduce — the vars simply never
 * update, so a theme consuming them with a `var(--pointer-x, 50%)` fallback
 * renders a static, centered, non-animating gradient instead.
 */
export function useAmbientPointerLight(): void {
	useEffect(() => {
		if (typeof window === "undefined") return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		let frame: number | null = null;
		let latestX = 0;
		let latestY = 0;

		const applyPosition = () => {
			frame = null;
			const root = document.documentElement;
			root.style.setProperty(
				"--pointer-x",
				`${((latestX / window.innerWidth) * 100).toFixed(2)}%`,
			);
			root.style.setProperty(
				"--pointer-y",
				`${((latestY / window.innerHeight) * 100).toFixed(2)}%`,
			);
		};

		const handlePointerMove = (event: PointerEvent) => {
			latestX = event.clientX;
			latestY = event.clientY;
			if (frame === null) {
				frame = requestAnimationFrame(applyPosition);
			}
		};

		window.addEventListener("pointermove", handlePointerMove, {
			passive: true,
		});

		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			if (frame !== null) cancelAnimationFrame(frame);
		};
	}, []);
}
