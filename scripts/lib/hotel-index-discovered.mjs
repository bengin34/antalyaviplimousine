/** Merges separately reviewed discovery sets without silently deduplicating. */
export function mergeReviewedHotelMatches(baseRows, resolvedReviewRows) {
  const merged = [...baseRows, ...resolvedReviewRows];
  const seen = new Set();
  for (const row of merged) {
    if (seen.has(row.placeId)) {
      throw new Error(`Duplicate discovered hotel Place ID: ${row.placeId}`);
    }
    seen.add(row.placeId);
  }
  return merged;
}
