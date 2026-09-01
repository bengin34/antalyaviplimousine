/**
 * Pure merge logic for the hotel-distance generator. No network, no fs — so the
 * whole decision of "what to fetch" and "what the next file is" is unit-tested.
 */

/**
 * Which index slugs a run should fetch.
 * @param {{slug:string}[]} index - hotelIndex
 * @param {Record<string, {km:number|null, checked?:boolean}>} data - current hotelDistances
 * @param {{refresh?:boolean, only?:string}} opts
 * @returns {string[]}
 */
export function slugsToProcess(index, data, opts = {}) {
  if (opts.only) return index.some((h) => h.slug === opts.only) ? [opts.only] : [];
  return index
    .filter((h) => {
      const entry = data[h.slug];
      if (opts.refresh) return !(entry && entry.checked === true);
      // default: gap-fill — missing, or present but km not yet known
      return !entry || entry.km == null;
    })
    .map((h) => h.slug);
}

/**
 * Merge one fetch result into the data map, preserving checked:true rows.
 * @param {object} data - current map (not mutated)
 * @param {{slug:string, district:string}} hotel
 * @param {{km:number, place:string} | null} result - null means no confident match
 * @returns {object} next map
 */
export function applyResult(data, hotel, result) {
  if (data[hotel.slug]?.checked === true) return data;
  const entry = result
    ? { km: result.km, place: result.place, district: hotel.district, checked: false }
    : { km: null, place: null, district: hotel.district, checked: false, note: "no-match" };
  return { ...data, [hotel.slug]: entry };
}
