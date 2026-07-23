import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { routeData } from "../src/prices.js";

const root = process.cwd();
const rowPattern =
  /\('airport',\s*'(\w+)',\s*'(vito|vclass)',\s*(\d+(?:\.\d+)?)/g;

const readPriceRows = async (files) => {
  const prices = new Map();
  for (const file of files) {
    const sql = await readFile(file, "utf8");
    for (const match of sql.matchAll(rowPattern)) {
      const [, route, databaseVehicle, price] = match;
      const vehicle = databaseVehicle === "vclass" ? "sprinter" : "vito";
      prices.set(`${route}:${vehicle}`, Number(price));
    }
  }
  return prices;
};

const migrationDirectory = path.join(root, "supabase", "migrations");
const migrationFiles = (await readdir(migrationDirectory))
  .filter((file) => file.endsWith(".sql"))
  .sort()
  .map((file) => path.join(migrationDirectory, file));

const matrices = {
  "supabase/seed.sql": await readPriceRows([
    path.join(root, "supabase", "seed.sql"),
  ]),
  "effective migration state": await readPriceRows(migrationFiles),
};

const errors = [];
for (const [label, matrix] of Object.entries(matrices)) {
  for (const [route, data] of Object.entries(routeData)) {
    for (const vehicle of ["vito", "sprinter"]) {
      const key = `${route}:${vehicle}`;
      const expected = Number(data.prices[vehicle]);
      const actual = matrix.get(key);
      if (actual !== expected) {
        errors.push(`${label}: ${key} is ${String(actual)}, expected ${expected}`);
      }
    }
  }
}

if (errors.length) {
  throw new Error(`Price sources are out of sync:\n${errors.join("\n")}`);
}

console.log(
  `Verified ${Object.keys(routeData).length} route prices against seed and migrations.`,
);
