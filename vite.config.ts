import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The DS imports itself through the consuming app's alias; mirror it here so
// Storybook resolves the same paths a consumer does.
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@/proto-design-system": path.resolve(__dirname, "src"),
		},
	},
});
