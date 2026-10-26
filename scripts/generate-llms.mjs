import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { routeCatalog, publicRouteSlugs } from "../src/routes.js";

const root = process.cwd();
const domain = "https://antalyaviptourism.com";

const routeLines = publicRouteSlugs.map((slug) => {
  const route = routeCatalog[slug];
  const { vito, sprinter } = route.prices;
  return `- [Antalya Airport to ${route.names.en}](${domain}/transfers/${slug}/): ${route.distanceKm} km, ${route.duration.en}, from €${vito} (Vito) / €${sprinter} (Sprinter)`;
});

const body = [
  "# Antalya VIP Tourism",
  "",
  "> Private airport transfers from Antalya Airport (AYT) to hotels in Antalya, Belek, Side, Kemer, Alanya and other destinations. Fixed prices per vehicle (not per person), meet & greet, flight tracking, pay in the vehicle. Mercedes Vito and Sprinter.",
  "",
  "## Transfer routes (one-way, per vehicle, EUR)",
  "",
  ...routeLines,
  "",
  "## Guides",
  "",
  `- [Pricing as a table](${domain}/pricing.md)`,
  `- [Blog and airport guides](${domain}/blog/)`,
  "",
  "## Contact",
  "",
  "- WhatsApp: https://wa.me/905302655790",
  "- Email: support@antalyaviptourism.com",
  `- Book online: ${domain}/`,
  "",
].join("\n");

const target = path.join(root, "public", "llms.txt");
await mkdir(path.dirname(target), { recursive: true });
await writeFile(target, body);

console.log(`Generated llms.txt with ${routeLines.length} routes`);

// pricing.md: the same catalogue as a table an agent can read without
// rendering the booking page. Prices are per vehicle, one way.
const priceRows = publicRouteSlugs.map((slug) => {
  const route = routeCatalog[slug];
  return `| ${route.names.en} | ${route.distanceKm} km | ${route.duration.en} | €${route.prices.vito} | €${route.prices.sprinter} |`;
});

const pricing = [
  "# Pricing — Antalya VIP Tourism",
  "",
  "One-way private transfers from Antalya Airport (AYT). Prices are fixed per vehicle in EUR, not per person.",
  "",
  "| Destination | Distance | Duration | Mercedes Vito (up to 7 passengers) | Mercedes Sprinter (up to 13 passengers) |",
  "|---|---|---|---|---|",
  ...priceRows,
  "",
  "## Included in every price",
  "",
  "- Personal meet and greet in arrivals with a name sign",
  "- Real-time flight tracking and the usual waiting time after landing",
  "- Luggage assistance and bottled water",
  "- Free child seat on request",
  "- No hidden fees",
  "",
  "## Payment",
  "",
  "- No prepayment required. Pay cash directly to the driver at the start of the ride.",
  "",
  "## Booking and contact",
  "",
  `- Book online: ${domain}/`,
  "- WhatsApp: https://wa.me/905302655790",
  "- Email: support@antalyaviptourism.com",
  `- Route pages with details: ${domain}/transfers/<destination>/`,
  "",
].join("\n");

await writeFile(path.join(root, "public", "pricing.md"), pricing);
console.log("Generated pricing.md");
