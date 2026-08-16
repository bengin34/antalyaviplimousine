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
      input: {
        admin: resolve(import.meta.dirname, "admin/index.html"),
        b2b: resolve(import.meta.dirname, "b2b/index.html"),
      },
    },
  },
});
