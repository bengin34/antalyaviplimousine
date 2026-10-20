import { execFileSync } from "node:child_process";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const publicClient = path.join(root, "build", "public-react", "client");
const node = process.execPath;

const runNode = (script, args = []) => execFileSync(node, [script, ...args], {
  cwd: root,
  stdio: "inherit",
});

await rm(dist, { recursive: true, force: true });

runNode(path.join(root, "node_modules", "@react-router", "dev", "bin.cjs"), [
  "build", "--config", "vite.public.config.ts",
]);

await mkdir(dist, { recursive: true });
await cp(publicClient, dist, { recursive: true });
// Only what pages link to by its plain path. The originals in assets/
// (assets/images, clinic, health, the full-size JPEGs and logo.png, ~42MB)
// are inputs to scripts/optimize-images.mjs; fonts are bundled by Vite with
// hashed names. Shipping them only bloated the Pages artifact and left the
// raw photos reachable by URL.
for (const entry of ["optimized", "favicons", "favicon.svg"]) {
  await cp(path.join(root, "assets", entry), path.join(dist, "assets", entry), { recursive: true });
}

const imprintDirectory = path.join(dist, "impressum.html");
const imprintHtml = await readFile(path.join(imprintDirectory, "index.html"), "utf8");
await rm(imprintDirectory, { recursive: true });
await writeFile(path.join(dist, "impressum.html"), imprintHtml);

await writeFile(path.join(dist, "privacy.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow"><link rel="canonical" href="https://antalyaviptourism.com/privacy/"><meta http-equiv="refresh" content="0;url=/privacy/"><title>Privacy Policy | Antalya VIP Tourism</title></head><body><a href="/privacy/">Privacy Policy</a></body></html>\n`);

runNode(path.join(root, "node_modules", "vite", "bin", "vite.js"), [
  "build", "--config", "vite.admin.config.ts",
]);
runNode(path.join(root, "scripts", "verify-react-build.mjs"));
