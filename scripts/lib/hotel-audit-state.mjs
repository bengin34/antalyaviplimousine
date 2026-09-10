import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

export const auditRulesHash = createHash("sha256")
  .update(readFileSync(new URL("./hotel-region-audit.mjs", import.meta.url)))
  .update(readFileSync(new URL("./hotel-region-matching.mjs", import.meta.url)))
  .digest("hex");

export function auditInputHash(hotel, placeId, routes, rulesHash = auditRulesHash) {
  const prices = Object.entries(routes).map(([region, route]) => [region, route.prices]);
  return createHash("sha256").update(JSON.stringify({
    rulesHash, slug: hotel.slug, name: hotel.name, aliases: hotel.aliases ?? [],
    region: hotel.region, regionSource: hotel.regionSource, placeId, prices,
  })).digest("hex");
}

export function reconcileAuditFlags(distances, completed) {
  return Object.fromEntries(Object.entries(distances).map(([slug, entry]) => {
    const { checked, ...rest } = entry;
    return [slug, completed[slug]?.bucket === "ok" ? { ...rest, checked: true } : rest];
  }));
}
