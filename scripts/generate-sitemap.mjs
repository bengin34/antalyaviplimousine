import { readdir, stat, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const domain = "https://antalyaviptourism.com";
const scanRoots = ["transfers", "de", "tr", "ru", "privacy"];

async function collectHtml(directory) {
  const absolute = path.join(root, directory);
  const entries = await readdir(absolute, { withFileTypes: true }).catch(() => []);
  const files = [];
  for (const entry of entries) {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectHtml(relative)));
    else if (entry.name === "index.html") files.push(relative);
  }
  return files;
}

function urlFor(file) {
  if (file === "index.html") return "/";
  return `/${file.replace(/index\.html$/, "").replaceAll(path.sep, "/")}`;
}

async function lastModified(file) {
  try {
    execFileSync("git", ["diff", "--quiet", "--", file], { cwd: root, stdio: "ignore" });
    const committed = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], { cwd: root, encoding: "utf8" }).trim();
    if (committed) return committed;
  } catch {
    // Modified and generated files use their filesystem date.
  }
  return (await stat(path.join(root, file))).mtime.toISOString().slice(0, 10);
}

const files = ["index.html"];
for (const directory of scanRoots) files.push(...(await collectHtml(directory)));

const uniqueFiles = [...new Set(files)].filter((file) => {
  if (file === "de/index.html" || file === "tr/index.html" || file === "ru/index.html") return true;
  return file === "index.html" || file.includes("/transfers/") || file.startsWith("transfers/") || file.includes("privacy/") || file.includes("datenschutz/") || file.includes("gizlilik/");
});

const records = await Promise.all(uniqueFiles.map(async (file) => {
  const url = urlFor(file);
  const isHome = ["/", "/de/", "/tr/", "/ru/"].includes(url);
  const isPrivacy = /privacy|datenschutz|gizlilik/.test(url);
  return { url, lastmod: await lastModified(file), changefreq: isHome ? "weekly" : isPrivacy ? "yearly" : "monthly", priority: isHome ? "1.0" : isPrivacy ? "0.2" : "0.8" };
}));

records.sort((a, b) => a.url.localeCompare(b.url));
const body = records.map(({ url, lastmod, changefreq, priority }) => `  <url>\n    <loc>${domain}${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`).join("\n");
await writeFile(path.join(root, "public", "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
console.log(`Generated sitemap with ${records.length} URLs`);
