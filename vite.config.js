import { resolve } from "node:path";
import { defineConfig } from "vite";
import { resolvePriceTokens } from "./src/prices.js";

function priceInjectionPlugin() {
  return {
    name: "price-injection",
    transformIndexHtml(html) {
      const output = resolvePriceTokens(html);
      const unresolvedToken = output.match(/\{\{PRICE(?::|_RANGE)[^}]*\}\}/);
      if (unresolvedToken) {
        throw new Error(`Unresolved price token: ${unresolvedToken[0]}`);
      }
      return output;
    },
  };
}

const localizedRoutes = [
  "antalya",
  "belek",
  "side",
  "kemer",
  "alanya",
  "bogazkent",
  "manavgat",
  "kizilagac",
  "tekirova",
  "bodrum",
  "dalaman",
  "fethiye",
  "pamukkale",
  "kapadokya",
];

const localizedInputs = Object.fromEntries(
  ["tr", "ru"].flatMap((language) => [
    [`${language}-home`, resolve(__dirname, language, "index.html")],
    ...localizedRoutes.map((route) => [
      `${language}-${route}`,
      resolve(__dirname, language, "transfers", route, "index.html"),
    ]),
  ]),
);

export default defineConfig({
  base: "/",
  plugins: [priceInjectionPlugin()],
  build: {
    rollupOptions: {
      input: {
        ...localizedInputs,
        main: resolve(__dirname, "index.html"),
        "de-home": resolve(__dirname, "de/index.html"),
        impressum: resolve(__dirname, "impressum.html"),
        "impressum-de": resolve(__dirname, "de/impressum/index.html"),
        "impressum-tr": resolve(__dirname, "tr/kunye/index.html"),
        "impressum-ru": resolve(__dirname, "ru/impressum/index.html"),
        privacy: resolve(__dirname, "privacy.html"),
        "privacy-en": resolve(__dirname, "privacy/index.html"),
        "privacy-de": resolve(__dirname, "de/datenschutz/index.html"),
        "privacy-tr": resolve(__dirname, "tr/gizlilik/index.html"),
        "privacy-ru": resolve(__dirname, "ru/privacy/index.html"),
        antalya: resolve(__dirname, "transfers/antalya/index.html"),
        belek: resolve(__dirname, "transfers/belek/index.html"),
        side: resolve(__dirname, "transfers/side/index.html"),
        kemer: resolve(__dirname, "transfers/kemer/index.html"),
        alanya: resolve(__dirname, "transfers/alanya/index.html"),
        bogazkent: resolve(__dirname, "transfers/bogazkent/index.html"),
        manavgat: resolve(__dirname, "transfers/manavgat/index.html"),
        kizilagac: resolve(__dirname, "transfers/kizilagac/index.html"),
        tekirova: resolve(__dirname, "transfers/tekirova/index.html"),
        bodrum: resolve(__dirname, "transfers/bodrum/index.html"),
        dalaman: resolve(__dirname, "transfers/dalaman/index.html"),
        fethiye: resolve(__dirname, "transfers/fethiye/index.html"),
        pamukkale: resolve(__dirname, "transfers/pamukkale/index.html"),
        kapadokya: resolve(__dirname, "transfers/kapadokya/index.html"),
        "de-antalya": resolve(__dirname, "de/transfers/antalya/index.html"),
        "de-belek": resolve(__dirname, "de/transfers/belek/index.html"),
        "de-side": resolve(__dirname, "de/transfers/side/index.html"),
        "de-kemer": resolve(__dirname, "de/transfers/kemer/index.html"),
        "de-alanya": resolve(__dirname, "de/transfers/alanya/index.html"),
        "de-bogazkent": resolve(__dirname, "de/transfers/bogazkent/index.html"),
        "de-manavgat": resolve(__dirname, "de/transfers/manavgat/index.html"),
        "de-kizilagac": resolve(__dirname, "de/transfers/kizilagac/index.html"),
        "de-tekirova": resolve(__dirname, "de/transfers/tekirova/index.html"),
        "de-bodrum": resolve(__dirname, "de/transfers/bodrum/index.html"),
        "de-dalaman": resolve(__dirname, "de/transfers/dalaman/index.html"),
        "de-fethiye": resolve(__dirname, "de/transfers/fethiye/index.html"),
        "de-pamukkale": resolve(__dirname, "de/transfers/pamukkale/index.html"),
        "de-kapadokya": resolve(__dirname, "de/transfers/kapadokya/index.html"),
      },
    },
  },
});
