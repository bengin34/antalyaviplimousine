import { useEffect, useState } from "react";
import blueMarble from "../../../assets/cop31/blue-marble.webp?url";
import copLogo from "../../../assets/cop31/cop31-logo-white.svg?url";
import vitoInterior from "../../../assets/cop31/vito-interior.webp?url";
import sprinterInterior from "../../../assets/cop31/sprinter-interior.webp?url";
import executiveInterior from "../../../assets/optimized/executive-interior.webp?url";
import { Cop31Form } from "./Cop31Form";
import { Icon } from "./Icon";
import { StaticPageHeader } from "./StaticPageHeader";
import { cop31DailyRate, daysToCop31, type Cop31Vehicle } from "../lib/cop31";
import { cop31Copy, type Cop31Language } from "../lib/cop31-copy";
import { track } from "../lib/track";

const romans = ["I", "II", "III"];

export function Cop31Page({ language }: { language: Cop31Language }) {
  const copy = cop31Copy[language];
  const homeHref = language === "en" ? "/" : `/${language}/`;
  // Set after hydration so the prerendered HTML carries no stale count.
  const [days, setDays] = useState<number | null>(null);
  const [vehicle, setVehicle] = useState<Cop31Vehicle | undefined>();

  useEffect(() => {
    setDays(daysToCop31());
    track("landing_view", { route: "cop31" });
  }, []);

  const cars = [
    { id: "vito" as const, name: copy.vito, tag: copy.vitoFor, features: copy.vitoFeatures, image: vitoInterior },
    { id: "sprinter" as const, name: copy.sprinter, tag: copy.sprinterFor, features: copy.sprinterFeatures, image: sprinterInterior },
  ];

  return (
    <>
      <StaticPageHeader
        homeHref={homeHref}
        homeLabel={copy.home}
        secondaryHref={`${homeHref}#routes`}
        secondaryLabel={copy.transfers}
        ctaHref="#cop-booking"
        ctaLabel={copy.bookNow}
      />
      <main className="cop-page" id="main-content">
        <section className="cop-hero">
          <img className="cop-hero-earth" src={blueMarble} alt="" width={1280} height={1280} fetchPriority="high" />
          <div className="cop-orbit" aria-hidden="true" />
          <div className="cop-hero-in">
            <img className="cop-logo" src={copLogo} alt="COP31 Türkiye Antalya" width={1265} height={291} />
            <p className="cop-eyebrow">{copy.eyebrow}</p>
            <h1>{copy.headingLead} <em>COP31</em></h1>
            <p className="cop-lede">{copy.intro}</p>
            <div className="cop-ctas">
              <a className="cop-btn cop-btn-gold" href="#cop-booking"><span>{copy.bookNow}</span><Icon name="arrow-right" className="icon" /></a>
              <a className="cop-btn cop-btn-line" href="#cop-fleet">{copy.ratesCta}</a>
            </div>
            <div className="cop-countdown">
              <p><strong>{days === null ? "–" : days > 0 ? days : "●"}</strong><span>{days === 0 ? copy.inSession : copy.daysToOpening}</span></p>
              <p className="cop-dates">{copy.dates}</p>
            </div>
          </div>
          <p className="cop-credit">Earth: NASA Goddard</p>
        </section>

        <ul className="cop-strip">
          {copy.strip.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <section className="cop-section" id="cop-fleet" aria-labelledby="cop-fleet-title">
          <p className="cop-kicker">{copy.fleetKicker}</p>
          <h2 id="cop-fleet-title">{copy.fleetTitle}</h2>
          <p className="cop-sub">{copy.fleetIntro}</p>
          <div className="cop-fleet">
            {cars.map((car) => (
              <article className="cop-car" key={car.id}>
                <img src={car.image} alt="" loading="lazy" width={900} height={1200} />
                <div className="cop-car-in">
                  <p className="cop-car-tag">{car.tag}</p>
                  <h3>{car.name}</h3>
                  <p className="cop-price"><strong>{copy.price(cop31DailyRate(car.id))}</strong><span>{copy.perDay}</span></p>
                  <ul>{car.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  <a className="cop-btn cop-btn-gold" href="#cop-booking" onClick={() => { setVehicle(car.id); track("vehicle_selected", { route: "cop31", vehicle: car.id }); }}>{copy.reserve(car.name)}</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cop-band" aria-labelledby="cop-included-title">
          <div className="cop-band-in">
            <p className="cop-kicker">{copy.includedKicker}</p>
            <h2 id="cop-included-title">{copy.includedTitle}</h2>
            <ol className="cop-included">
              {copy.included.map(([title, body]) => <li key={title}><strong>{title}</strong><span>{body}</span></li>)}
            </ol>
          </div>
        </section>

        <section className="cop-section cop-split" aria-labelledby="cop-why-title">
          <figure>
            <img src={executiveInterior} alt="" loading="lazy" width={1400} height={933} />
          </figure>
          <div>
            <p className="cop-kicker">{copy.whyKicker}</p>
            <h2 id="cop-why-title">{copy.whyTitle}</h2>
            <div className="cop-points">
              {copy.why.map(([title, body], index) => (
                <div key={title}><i aria-hidden="true">{romans[index]}</i><div><h3>{title}</h3><p>{body}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        <section className="cop-book" id="cop-booking" aria-labelledby="cop-form-title">
          <div className="cop-book-in">
            <p className="cop-kicker">{copy.formKicker}</p>
            <h2 id="cop-form-title">{copy.formTitle}</h2>
            <p className="cop-sub">{copy.formIntro}</p>
            <Cop31Form language={language} vehicle={vehicle} />
          </div>
        </section>

        <section className="cop-section" aria-labelledby="cop-faq-title">
          <p className="cop-kicker">{copy.faqKicker}</p>
          <h2 id="cop-faq-title">{copy.faqTitle}</h2>
          {copy.faq.map(([question, answer]) => (
            <details key={question} className="cop-faq">
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
          <p className="cop-disclaimer">{copy.disclaimer}</p>
        </section>
      </main>
    </>
  );
}
