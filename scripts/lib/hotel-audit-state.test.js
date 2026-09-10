import { expect, test } from "vitest";
import { auditInputHash, reconcileAuditFlags } from "./hotel-audit-state.mjs";

test("audit evidence expires when rules, identity, place, region or prices change", () => {
  const hotel = { slug: "test", name: "Test Hotel", region: "side", aliases: [] };
  const prices = { side: { prices: { vito: 50, sprinter: 85 } } };
  const hash = auditInputHash(hotel, "place", prices, "rules-v1");
  for (const input of [
    [hotel, "place", prices, "rules-v2"],
    [{ ...hotel, aliases: ["New Hotel"] }, "place", prices, "rules-v1"],
    [{ ...hotel, region: "belek" }, "place", prices, "rules-v1"],
    [hotel, "other-place", prices, "rules-v1"],
    [hotel, "place", { side: { prices: { vito: 55, sprinter: 85 } } }, "rules-v1"],
  ]) expect(auditInputHash(...input)).not.toBe(hash);
});

test("failed, pending and non-ok audits revoke checked without changing place or distance", () => {
  const distances = Object.fromEntries(["ok", "fix", "pending"].map(slug => [slug, { place: slug, km: 42, checked: true }]));
  const next = reconcileAuditFlags(distances, { ok: { bucket: "ok" }, fix: { bucket: "fix" } });
  expect(next.ok).toEqual(distances.ok);
  expect(next.fix).toEqual({ place: "fix", km: 42 });
  expect(next.pending).toEqual({ place: "pending", km: 42 });
  expect(distances.pending.checked).toBe(true);
});
