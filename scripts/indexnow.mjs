import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const domain = "https://antalyaviptourism.com";
const host = new URL(domain).host;
const endpoint = "https://api.indexnow.org/indexnow";

const publicDirectory = path.join(root, "public");
const keyFile = (await readdir(publicDirectory)).find((file) =>
  /^[0-9a-f]{32}\.txt$/.test(file),
);
if (!keyFile) {
  console.error("No IndexNow key file (<32 hex>.txt) found in public/");
  process.exit(1);
}
const key = keyFile.replace(/\.txt$/, "");

const sitemap = await readFile(path.join(publicDirectory, "sitemap.xml"), "utf8");
// Only pages the sitemap dates within the last two days are worth a ping;
// INDEXNOW_ALL=1 sends every URL (first submission, or after a big migration).
const cutoff = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);
const urlList = [
  ...sitemap.matchAll(
    /<loc>([^<]+)<\/loc>[\s\S]*?<lastmod>([^<]+)<\/lastmod>/g,
  ),
]
  .filter(([, , lastmod]) => process.env.INDEXNOW_ALL === "1" || lastmod >= cutoff)
  .map(([, loc]) => loc);

if (urlList.length === 0) {
  console.log("IndexNow: no URLs changed in the last two days, nothing to send");
  process.exit(0);
}

const submit = () =>
  // IndexNow accepts up to 10,000 URLs per request.
  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${domain}/${keyFile}`,
      urlList,
    }),
  });

// Right after a deploy the key file may not be served yet, and IndexNow
// answers 403 until it can fetch it; give the edge a moment and retry.
let response = await submit();
for (let attempt = 0; response.status === 403 && attempt < 4; attempt += 1) {
  await new Promise((resolve) => setTimeout(resolve, 20_000));
  response = await submit();
}

console.log(`IndexNow: ${urlList.length} URLs, HTTP ${response.status}`);
if (!response.ok && response.status !== 202) process.exit(1);
