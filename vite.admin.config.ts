import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  publicDir: false,
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      // The partner page used to be built here, as a hand-written static page
      // with its own copy of the tariff. It is a prerendered React route now,
      // so this build must not emit over dist/b2b/index.html.
      input: {
        admin: resolve(import.meta.dirname, "admin/index.html"),
      },
    },
  },
});
