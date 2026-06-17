import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        impressum: resolve(__dirname, "impressum.html"),
        belek: resolve(__dirname, "transfers/belek/index.html"),
        side: resolve(__dirname, "transfers/side/index.html"),
        kemer: resolve(__dirname, "transfers/kemer/index.html"),
      },
    },
  },
});
