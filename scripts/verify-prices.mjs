import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { routeCatalog } from "../src/routes.js";

const root = process.cwd();
const rowPattern =
  /\('airport',\s*'(\w+)',\s*'(vito|vclass)',\s*(\d+(?:\.\d+)?),\s*(\d+),\s*(\d+)\)/g;

const readPriceRows = async (files) => {
  const prices = new Map();
  for (const file of files) {
    const sql = await readFile(file, "utf8");
    for (const match of sql.matchAll(rowPattern)) {
      const [, route, databaseVehicle, price, durationMin, distanceKm] = match;
      const vehicle = databaseVehicle === "vclass" ? "sprinter" : "vito";
      prices.set(`${route}:${vehicle}`, {
        price: Number(price),
        durationMin: Number(durationMin),
        distanceKm: Number(distanceKm),
      });
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
  for (const [route, data] of Object.entries(routeCatalog)) {
    for (const vehicle of ["vito", "sprinter"]) {
      const key = `${route}:${vehicle}`;
      const expected = {
        price: Number(data.prices[vehicle]),
        durationMin: data.durationMin,
        distanceKm: data.distanceKm,
      };
      const actual = matrix.get(key);
      if (!actual || Object.keys(expected).some((field) => actual[field] !== expected[field])) {
        errors.push(`${label}: ${key} is ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
      }
    }
  }
}

if (errors.length) {
  throw new Error(`Price sources are out of sync:\n${errors.join("\n")}`);
}

console.log(
  `Verified ${Object.keys(routeCatalog).length} route prices, durations and distances against seed and migrations.`,
);
