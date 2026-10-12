import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { routeCatalog } from "../src/routes.js";
import { landOfLegendsRates } from "../src/land-of-legends.js";

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

// The Land of Legends excursion rates: every region × vehicle the site quotes
// must exist in the database at the same price, or the server would price the
// booking differently from the quote the guest accepted.
const landOfLegendsRowPattern =
  /\('(\w+)',\s*'(vito|vclass)',\s*(\d+(?:\.\d+)?)\)/g;
// Every migration that writes the table counts, whatever it is named, in
// order — so a later price change migration supersedes the seed.
const landOfLegendsDatabase = new Map();
for (const file of migrationFiles) {
  const sql = await readFile(file, "utf8");
  if (!/land_of_legends_rates/.test(sql)) continue;
  for (const [, region, databaseVehicle, price] of sql.matchAll(landOfLegendsRowPattern)) {
    landOfLegendsDatabase.set(`${region}:${databaseVehicle === "vclass" ? "sprinter" : "vito"}`, Number(price));
  }
}
for (const [region, rate] of Object.entries(landOfLegendsRates)) {
  for (const vehicle of /** @type {const} */ (["vito", "sprinter"])) {
    const key = `${region}:${vehicle}`;
    if (landOfLegendsDatabase.get(key) !== rate[vehicle]) {
      errors.push(`land_of_legends_rates: ${key} is ${landOfLegendsDatabase.get(key)}, expected ${rate[vehicle]}`);
    }
  }
}
for (const key of landOfLegendsDatabase.keys()) {
  const [region] = key.split(":");
  if (!(region in landOfLegendsRates)) errors.push(`land_of_legends_rates: ${key} is not priced in src/land-of-legends.js`);
}

if (errors.length) {
  throw new Error(`Price sources are out of sync:\n${errors.join("\n")}`);
}

console.log(
  `Verified ${Object.keys(routeCatalog).length} route prices, durations and distances against seed and migrations, and ${Object.keys(landOfLegendsRates).length} Land of Legends rates.`,
);
