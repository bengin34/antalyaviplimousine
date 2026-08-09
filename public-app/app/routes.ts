import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx", { id: "home-en" }),
  route("de", "./routes/home.tsx", { id: "home-de" }),
  route("tr", "./routes/home.tsx", { id: "home-tr" }),
  route("ru", "./routes/home.tsx", { id: "home-ru" }),
  route("transfers/:slug", "./routes/transfer.tsx", { id: "transfer-en" }),
  route(":language/transfers/:slug", "./routes/transfer.tsx", { id: "transfer-localized" }),
  route("impressum.html", "./routes/legal.tsx", { id: "legal-imprint-en" }),
  route("privacy", "./routes/legal.tsx", { id: "legal-privacy-en" }),
  route("de/datenschutz", "./routes/legal.tsx", { id: "legal-privacy-de" }),
  route("de/impressum", "./routes/legal.tsx", { id: "legal-imprint-de" }),
  route("tr/gizlilik", "./routes/legal.tsx", { id: "legal-privacy-tr" }),
  route("tr/kunye", "./routes/legal.tsx", { id: "legal-imprint-tr" }),
  route("ru/privacy", "./routes/legal.tsx", { id: "legal-privacy-ru" }),
  route("ru/impressum", "./routes/legal.tsx", { id: "legal-imprint-ru" }),
] satisfies RouteConfig;
