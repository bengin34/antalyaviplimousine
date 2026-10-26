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
