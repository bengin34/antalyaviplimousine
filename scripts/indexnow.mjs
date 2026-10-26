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
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);

// IndexNow accepts up to 10,000 URLs per request.
const response = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `${domain}/${keyFile}`,
    urlList,
  }),
});

console.log(`IndexNow: ${urlList.length} URLs, HTTP ${response.status}`);
if (!response.ok && response.status !== 202) process.exit(1);
