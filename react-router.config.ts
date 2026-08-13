import type { Config } from "@react-router/dev/config";
import { prerenderPaths } from "./src/public-paths.js";

export default {
  appDirectory: "public-app/app",
  buildDirectory: "build/public-react",
  prerender: [...prerenderPaths],
  routeDiscovery: { mode: "initial" },
  ssr: false,
} satisfies Config;
