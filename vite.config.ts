import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: [
      "$app/environment",
      "$app/forms",
      "$app/stores",
      "$app/navigation",
    ],
  },

  plugins: [svelte()],
  resolve: {
    alias: [
      {
        find: "$app",
        replacement: fileURLToPath(
          new URL("./src/sveltekit/app", import.meta.url)
        ),
      },
    ],
  },
});
