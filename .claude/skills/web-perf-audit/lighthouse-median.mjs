#!/usr/bin/env node
// Runs Lighthouse (mobile) N times per URL and prints the median of each metric.
// Usage: node lighthouse-median.mjs [--runs 3] [--out file.json] <url> [url...]
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const args = process.argv.slice(2);
let runs = 3;
let out = null;
const urls = [];
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === "--runs") runs = Number(args[++i]);
  else if (args[i] === "--out") out = args[++i];
  else urls.push(args[i]);
}
if (urls.length === 0 || !Number.isInteger(runs) || runs < 1) {
  console.error("Usage: node lighthouse-median.mjs [--runs 3] [--out file.json] <url> [url...]");
  process.exit(1);
}

const env = { ...process.env };
if (!env.CHROME_PATH && existsSync("/opt/pw-browsers")) {
  const found = execFileSync("sh", ["-c", "ls -d /opt/pw-browsers/chromium-*/chrome-linux/chrome 2>/dev/null | head -1"])
    .toString().trim();
  if (found) env.CHROME_PATH = found;
}

const metrics = {
  score: (r) => Math.round(r.categories.performance.score * 100),
  lcpMs: (r) => Math.round(r.audits["largest-contentful-paint"].numericValue),
  fcpMs: (r) => Math.round(r.audits["first-contentful-paint"].numericValue),
  tbtMs: (r) => Math.round(r.audits["total-blocking-time"].numericValue),
  cls: (r) => Number(r.audits["cumulative-layout-shift"].numericValue.toFixed(3)),
  siMs: (r) => Math.round(r.audits["speed-index"].numericValue),
  totalKB: (r) => Math.round(r.audits["total-byte-weight"].numericValue / 1024),
};

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const workDir = mkdtempSync(path.join(tmpdir(), "lh-"));
const results = {};
for (const url of urls) {
  const samples = Object.fromEntries(Object.keys(metrics).map((key) => [key, []]));
  for (let run = 1; run <= runs; run += 1) {
    const reportPath = path.join(workDir, `report-${run}.json`);
    execFileSync("npx", [
      "--yes", "lighthouse@12", url,
      "--only-categories=performance",
      "--output=json", `--output-path=${reportPath}`,
      "--chrome-flags=--headless=new --no-sandbox",
      "--quiet",
    ], { env, stdio: ["ignore", "ignore", "inherit"] });
    const report = JSON.parse(readFileSync(reportPath, "utf8"));
    for (const [key, read] of Object.entries(metrics)) samples[key].push(read(report));
    console.error(`${url} run ${run}/${runs}: score ${samples.score.at(-1)}, LCP ${samples.lcpMs.at(-1)}ms`);
  }
  results[url] = Object.fromEntries(Object.entries(samples).map(([key, values]) => [key, median(values)]));
}

console.table(results);
if (out) writeFileSync(out, `${JSON.stringify(results, null, 2)}\n`);
