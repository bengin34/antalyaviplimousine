/**
 * Prints the static hotel index as a review checklist.
 *
 * A hotel's region decides which fixed price the guest is quoted, so a wrong
 * one is wrong on every transfer to that hotel. The region comes from the
 * hotel's district, so the district table is the part worth reviewing first:
 * confirming that Çolaklı is sold as Side settles every hotel in Çolaklı.
 *
 * Usage:
 *   node scripts/hotel-index-review.mjs            # district table + hotels
 *   node scripts/hotel-index-review.mjs --csv      # CSV for a spreadsheet
 */
import { districtRegions, hotelIndex, priceBoundaryDistricts } from "../src/hotel-index.js";
import { routeCatalog } from "../src/routes.js";

const hotelsByDistrict = new Map(Object.keys(districtRegions).map((district) => [district, []]));
for (const hotel of hotelIndex) hotelsByDistrict.get(hotel.district)?.push(hotel);

const districtsByRegion = new Map(Object.keys(routeCatalog).map((region) => [region, []]));
for (const [district, region] of Object.entries(districtRegions)) districtsByRegion.get(region)?.push(district);

if (process.argv.includes("--csv")) {
  const escape = (value) => `"${String(value).replace(/"/g, '""')}"`;
  console.log("region,vito_eur,sprinter_eur,district,hotel,status,slug");
  for (const [region, districts] of districtsByRegion) {
    const { vito, sprinter } = routeCatalog[region].prices;
    for (const district of districts) {
      const hotels = hotelsByDistrict.get(district) ?? [];
      if (hotels.length === 0) {
        console.log([region, vito, sprinter, district, "", "", ""].map(escape).join(","));
        continue;
      }
      for (const hotel of [...hotels].sort((a, b) => a.name.localeCompare(b.name, "tr"))) {
        console.log([region, vito, sprinter, district, hotel.name, hotel.status, hotel.slug].map(escape).join(","));
      }
    }
  }
  process.exit(0);
}

const drafts = hotelIndex.filter((hotel) => hotel.status === "draft").length;
console.log("# Otel bölge eşlemesi — kontrol listesi\n");
console.log(`${hotelIndex.length} otel · ${Object.keys(districtRegions).length} belde · ${hotelIndex.length - drafts} doğrulanmış · ${drafts} taslak\n`);

console.log("## 1. Fiyatı değiştiren beldeler (önce bunları kontrol edin)\n");
console.log("Bu beldeler farklı fiyatlı bir bölgeyle komşu. Buradaki bir hata");
console.log("doğrudan yanlış ücret demek. Diğer beldelerde karışıklık fiyatı");
console.log("değiştirmez, çünkü aynı bölge içindeler.\n");
for (const district of priceBoundaryDistricts) {
  const region = districtRegions[district];
  const hotels = hotelsByDistrict.get(district) ?? [];
  const price = region ? `${region} · €${routeCatalog[region].prices.vito}` : "eşlenmemiş";
  console.log(`- **${district}** → ${price} — ${hotels.length} otel`);
  for (const hotel of [...hotels].sort((a, b) => a.name.localeCompare(b.name, "tr"))) {
    console.log(`  - [${hotel.status === "verified" ? "x" : " "}] ${hotel.name}`);
  }
}

console.log("\n\n## 2. Belde → bölge tablosu\n");
console.log("Bir beldenin bölgesi yanlışsa oradaki bütün oteller yanlış fiyat alır.");
console.log("Düzeltme `src/hotel-index.js` içindeki `districtRegions` tablosunda tek satırdır.\n");
console.log("| Bölge | Vito | Sprinter | Beldeler |");
console.log("| --- | ---: | ---: | --- |");
for (const [region, districts] of districtsByRegion) {
  const { vito, sprinter } = routeCatalog[region].prices;
  const labelled = districts.map((district) => {
    const count = hotelsByDistrict.get(district)?.length ?? 0;
    return count === 0 ? `${district} (otel yok)` : `${district} (${count})`;
  });
  console.log(`| ${region} | €${vito} | €${sprinter} | ${labelled.join(", ") || "—"} |`);
}

console.log("\n\n## 3. Belde başına oteller\n");
for (const [region, districts] of districtsByRegion) {
  for (const district of districts) {
    const hotels = hotelsByDistrict.get(district) ?? [];
    if (hotels.length === 0) continue;
    console.log(`\n### ${district} → ${region} · Vito €${routeCatalog[region].prices.vito}\n`);
    for (const hotel of [...hotels].sort((a, b) => a.name.localeCompare(b.name, "tr"))) {
      console.log(`- [${hotel.status === "verified" ? "x" : " "}] ${hotel.name}`);
    }
  }
}

const emptyRegions = [...districtsByRegion]
  .filter(([, districts]) => districts.every((district) => (hotelsByDistrict.get(district)?.length ?? 0) === 0))
  .map(([region]) => region);
if (emptyRegions.length > 0) {
  console.log(`\n\n> Hiç otel içermeyen bölgeler: ${emptyRegions.join(", ")}`);
  console.log("> Buradaki misafirler bölgeyi elle seçmek zorunda kalır.");
}
