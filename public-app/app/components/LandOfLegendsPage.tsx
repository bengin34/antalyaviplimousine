import { useEffect, useState } from "react";
import { routeCatalog } from "../../../src/routes.js";
import {
  landOfLegendsFromPrice,
  landOfLegendsRates,
  landOfLegendsZoneKm,
} from "../../../src/land-of-legends.js";
import { Icon } from "./Icon";
import { LandOfLegendsForm } from "./LandOfLegendsForm";
import { StaticPageHeader } from "./StaticPageHeader";
import {
  fetchLandOfLegendsLiveRates,
  landOfLegendsQuote,
  type LandOfLegendsLiveRates,
} from "../lib/land-of-legends";
import { landOfLegendsCopy, type LandOfLegendsLanguage } from "../lib/land-of-legends-copy";
import { track } from "../lib/track";

/**
 * Regions in the price table, nearest first. `alanya` is the catch-all for a
 * guest who cannot place their Alanya hotel; its sub-regions already list
 * every Alanya price, so it is left out of the table.
 */
const tableRegions = Object.keys(landOfLegendsRates)
  .filter((region) => region !== "alanya")
  .sort((a, b) => landOfLegendsZoneKm[a as keyof typeof landOfLegendsZoneKm] - landOfLegendsZoneKm[b as keyof typeof landOfLegendsZoneKm]);

export function LandOfLegendsPage({ language }: { language: LandOfLegendsLanguage }) {
  const copy = landOfLegendsCopy[language];
  const [liveRates, setLiveRates] = useState<LandOfLegendsLiveRates>({});

  useEffect(() => {
    void fetchLandOfLegendsLiveRates().then(setLiveRates);
    track("landing_view", { route: "land_of_legends" });
  }, []);

  const regionName = (region: string) => {
    const route = routeCatalog[region as keyof typeof routeCatalog];
    if (!route) return region;
    return (route.names as Record<string, string>)[language] ?? route.names.en;
  };
  const rateFor = (region: string, vehicle: "vito" | "sprinter") =>
    landOfLegendsQuote(region, vehicle, liveRates);

  const homeHref = language === "en" ? "/" : `/${language}/`;

  return (
    <>
      <StaticPageHeader
        homeHref={homeHref}
        homeLabel={copy.home}
        secondaryHref={`${homeHref}#routes`}
        secondaryLabel={copy.transfers}
        ctaHref="#lol-booking"
        ctaLabel={copy.bookNow}
      />
      <main className="lol-page">
        <section className="lol-hero">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.heading}</h1>
          <p>{copy.intro}</p>
          <p className="lol-from"><strong>{copy.fromLabel(rateFor(tableRegions[0], "vito") ?? landOfLegendsFromPrice)}</strong></p>
          <ul className="lol-highlights">
            {copy.highlights.map((item) => <li key={item}><Icon name="check" className="icon" />{item}</li>)}
          </ul>
          <a className="quote-submit lol-hero-cta" href="#lol-booking"><span>{copy.bookNow}</span><Icon name="arrow-right" className="icon" /></a>
        </section>

        <div className="lol-content">
          <section className="lol-booking" id="lol-booking" aria-labelledby="lol-form-title">
            <h2 id="lol-form-title">{copy.formTitle}</h2>
            <LandOfLegendsForm language={language} liveRates={liveRates} />
          </section>

          <section className="lol-section" aria-labelledby="lol-prices-title">
            <h2 id="lol-prices-title">{copy.priceTableTitle}</h2>
            <p>{copy.priceTableNote}</p>
            <div className="lol-table-wrap">
              <table className="lol-table">
                <thead><tr><th scope="col">{copy.regionColumn}</th><th scope="col">Vito</th><th scope="col">Sprinter</th></tr></thead>
                <tbody>
                  {tableRegions.map((region) => (
                    <tr key={region}>
                      <th scope="row">{regionName(region)}</th>
                      <td>€{rateFor(region, "vito")}</td>
                      <td>€{rateFor(region, "sprinter")}</td>
                    </tr>
                  ))}
                  <tr><th scope="row">Kaş, Fethiye…</th><td colSpan={2}>{copy.onRequest}</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="lol-section" aria-labelledby="lol-faq-title">
            <h2 id="lol-faq-title">{copy.faqTitle}</h2>
            {copy.faq.map(([question, answer]) => (
              <details key={question} className="lol-faq">
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
