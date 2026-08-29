/**
 * Prints the static hotel index as a review checklist.
 *
 * Region assignments decide which fixed price a guest is quoted, so a wrong
 * one costs real money on every transfer to that hotel. Rows seeded from
 * research start as `draft`; this checklist is how the operator walks through
 * them, confirms the region against their own records, and sees which pricing
 * regions still have no hotels behind them.
 *
 * Usage:
 *   node scripts/hotel-index-review.mjs            # markdown checklist
 *   node scripts/hotel-index-review.mjs --csv      # CSV for a spreadsheet
 */
import { hotelIndex } from "../src/hotel-index.js";
import { routeCatalog } from "../src/routes.js";

const asCsv = process.argv.includes("--csv");
const byRegion = new Map(Object.keys(routeCatalog).map((region) => [region, []]));
for (const hotel of hotelIndex) byRegion.get(hotel.region)?.push(hotel);

if (asCsv) {
  const escape = (value) => `"${String(value).replace(/"/g, '""')}"`;
  console.log("region,district,hotel,status,slug");
  for (const [region, hotels] of byRegion) {
    for (const hotel of [...hotels].sort((a, b) => a.name.localeCompare(b.name, "tr"))) {
      console.log([region, hotel.district, hotel.name, hotel.status, hotel.slug].map(escape).join(","));
    }
  }
  process.exit(0);
}

const drafts = hotelIndex.filter((hotel) => hotel.status === "draft").length;
console.log("# Otel bölge eşlemesi — kontrol listesi\n");
console.log(`Toplam ${hotelIndex.length} otel · ${hotelIndex.length - drafts} doğrulanmış · ${drafts} taslak\n`);
console.log("Her satırdaki bölgeyi kendi kayıtlarınızla karşılaştırın. Yanlış olanı");
console.log("`src/hotel-index.js` içinde düzeltin; doğruladıklarınızı bildirin ki");
console.log("`verified` olarak işaretleyelim.\n");

for (const [region, hotels] of byRegion) {
  const price = routeCatalog[region].prices;
  console.log(`\n## ${region} — Vito €${price.vito} · Sprinter €${price.sprinter} (${hotels.length} otel)\n`);
  if (hotels.length === 0) {
    console.log("_Bu bölgede indekste otel yok — buradaki misafirler elle bölge seçmek zorunda kalır._");
    continue;
  }
  for (const hotel of [...hotels].sort((a, b) => a.district.localeCompare(b.district, "tr") || a.name.localeCompare(b.name, "tr"))) {
    console.log(`- [${hotel.status === "verified" ? "x" : " "}] ${hotel.name} — ${hotel.district}`);
  }
}

const empty = [...byRegion].filter(([, hotels]) => hotels.length === 0).map(([region]) => region);
if (empty.length > 0) console.log(`\n\n> Kapsanmayan bölgeler: ${empty.join(", ")}`);
