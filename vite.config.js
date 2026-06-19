import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "de-home": resolve(__dirname, "de/index.html"),
        impressum: resolve(__dirname, "impressum.html"),
        privacy: resolve(__dirname, "privacy.html"),
        antalya: resolve(__dirname, "transfers/antalya/index.html"),
        belek: resolve(__dirname, "transfers/belek/index.html"),
        side: resolve(__dirname, "transfers/side/index.html"),
        kemer: resolve(__dirname, "transfers/kemer/index.html"),
        alanya: resolve(__dirname, "transfers/alanya/index.html"),
        bogazkent: resolve(__dirname, "transfers/bogazkent/index.html"),
        manavgat: resolve(__dirname, "transfers/manavgat/index.html"),
        tekirova: resolve(__dirname, "transfers/tekirova/index.html"),
        "de-antalya": resolve(__dirname, "de/transfers/antalya/index.html"),
        "de-belek": resolve(__dirname, "de/transfers/belek/index.html"),
        "de-side": resolve(__dirname, "de/transfers/side/index.html"),
        "de-kemer": resolve(__dirname, "de/transfers/kemer/index.html"),
        "de-alanya": resolve(__dirname, "de/transfers/alanya/index.html"),
        "de-bogazkent": resolve(__dirname, "de/transfers/bogazkent/index.html"),
        "de-manavgat": resolve(__dirname, "de/transfers/manavgat/index.html"),
        "de-tekirova": resolve(__dirname, "de/transfers/tekirova/index.html"),
      },
    },
  },
});
