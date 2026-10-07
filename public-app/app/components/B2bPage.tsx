import { useState } from "react";
import { StaticPageHeader } from "./StaticPageHeader";
import {
  AGENCY_DISCOUNT_EUR,
  b2bRates,
  rateFor,
  type B2bRateMode,
} from "../lib/b2b";

const whatsApp = "https://wa.me/905302655790?text=B2B%20partnership%20enquiry";
const email = "mailto:support@antalyaviptourism.com?subject=B2B%20Partnership%20Enquiry";

const modes: ReadonlyArray<{
  id: B2bRateMode;
  eyebrow: string;
  title: string;
  text: string;
  badge: string;
}> = [
  {
    id: "guest",
    eyebrow: "Option 1",
    title: "Your guest travels in our vehicle",
    text:
      "You pass the journey to us and your guest settles the fare with the driver. The price is exactly what our website quotes — nothing is added for booking through you, and nothing is deducted.",
    badge: "Published website rate",
  },
  {
    id: "agency",
    eyebrow: "Option 2",
    title: "You buy the transfer from us",
    text:
      "You buy the journey at our net rate and resell it under your own name, at your own price. We invoice you, and whatever you charge your customer above the net rate is yours.",
    badge: `Website rate − €${AGENCY_DISCOUNT_EUR} per transfer`,
  },
];

const tableCaption: Record<B2bRateMode, { title: string; note: string }> = {
  guest: {
    title: "Published rate — your guest pays the driver",
    note: "The same fare a traveller sees on our website. Per vehicle, one way, in EUR.",
  },
  agency: {
    title: `Agency net rate — €${AGENCY_DISCOUNT_EUR} below the published fare`,
    note: "What you pay us per transfer. Your own selling price is your decision. Per vehicle, one way, in EUR.",
  },
};

const included = [
  "Private transfer",
  "Mercedes in booked category",
  "Professional driver",
  "Airport Meet & Greet",
  "Airport parking",
  "Road & toll costs",
  "Flight tracking",
  "Delay waiting (no charge)",
  "Bottled water",
  "Wi-Fi where available",
  "Baby seats",
  "Child seats",
  "Booster seats",
  "Standard luggage",
];

const cancellation: ReadonlyArray<[string, string, "free" | "fee"]> = [
  ["More than 48 hours before pickup", "Free cancellation", "free"],
  ["Less than 48 hours before pickup", "50% of confirmed transfer price", "fee"],
  ["No-show (passenger does not appear)", "100% of transfer price", "fee"],
  ["Airline cancels the flight completely", "No charge", "free"],
  ["Flight delay", "No additional charge", "free"],
];

export function B2bPage() {
  const [mode, setMode] = useState<B2bRateMode>("guest");
  const caption = tableCaption[mode];

  return (
    <>
      <StaticPageHeader
        homeHref="/"
        homeLabel="Private Customers"
        secondaryHref="#b2b-prices"
        secondaryLabel="Prices"
        tertiaryHref="/#contact"
        tertiaryLabel="Contact"
        ctaHref={whatsApp}
        ctaLabel="WhatsApp us"
        legal
      />

      <main id="main-content" tabIndex={-1}>
        <section className="b2b-hero">
          <div className="eyebrow light"><span /><p>Partner Program</p></div>
          <h1>B2B Transfer Partner Program</h1>
          <p>
            Reliable private airport transfers in Antalya for travel agencies, tour operators,
            hotels and independent travel professionals. Fixed prices, professional Mercedes
            vehicles, 24/7 operations.
          </p>
          <div className="hero-ctas">
            <a className="button button-gold" href={whatsApp} target="_blank" rel="noopener">WhatsApp us</a>
            <a className="button button-glass" href={email}>Send email</a>
          </div>
        </section>

        <div className="b2b-content">
          <div className="b2b-note">
            We operate with sufficient vehicle and driver capacity to handle 20–30 transfers
            simultaneously — suitable for both individual B2B bookings and regular high-volume
            cooperation.
          </div>

          <section className="b2b-section" id="b2b-prices" style={{ marginTop: "56px" }}>
            {/* No dash in this heading: the display serif has no em dash
                glyph and drops it, leaving a gap that reads as a typo. */}
            <h2>Two Ways to Work With Us</h2>
            <p>
              Rates below are for the Mercedes Vito VIP, up to 6 passengers. Pick how you
              want to book and the table switches to the prices that apply to you.
            </p>

            <fieldset className="b2b-mode-choice">
              <legend>How are you booking?</legend>
              {modes.map((option) => (
                <label
                  className={`b2b-mode-card${mode === option.id ? " selected" : ""}`}
                  key={option.id}
                >
                  <input
                    type="radio"
                    name="b2b-rate-mode"
                    value={option.id}
                    checked={mode === option.id}
                    onChange={() => setMode(option.id)}
                  />
                  <span className="b2b-mode-eyebrow">{option.eyebrow}</span>
                  <span className="b2b-mode-title">{option.title}</span>
                  <span className="b2b-mode-text">{option.text}</span>
                  <span className="b2b-mode-badge">{option.badge}</span>
                </label>
              ))}
            </fieldset>

            {/* aria-live so a screen reader hears that the figures changed:
                the table is the only thing the radio moves, and it sits
                below the control that moved it. */}
            <p className="b2b-table-caption" aria-live="polite">
              {caption.title}
              <span>{caption.note}</span>
            </p>

            <table className="b2b-price-table" aria-label="Vito transfer rates from Antalya Airport">
              <thead>
                <tr>
                  <th>Route (from Antalya Airport)</th>
                  <th>Distance</th>
                  <th>{mode === "agency" ? "Agency net price" : "Published price"}</th>
                </tr>
              </thead>
              <tbody>
                {b2bRates.map((rate) => (
                  <tr key={rate.slug}>
                    <td>{rate.name}</td>
                    <td className="dist">~{rate.distanceKm} km</td>
                    <td className="price">
                      {mode === "agency" && <s>€{rate.guest}</s>}
                      €{rateFor(mode, rate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="b2b-note" style={{ marginTop: "16px" }}>
              For other destinations, surrounding areas or high booking volumes,
              contact us for a fixed quotation.
            </div>
          </section>

          <section className="b2b-section">
            <h2>Mercedes Sprinter — Groups up to 16</h2>
            <p>
              Sprinter vehicles are available for larger groups. Pricing depends on the route
              and group requirements and is confirmed individually before booking. The same
              €{AGENCY_DISCOUNT_EUR} agency reduction applies when you buy the transfer from
              us rather than sending your guest to us. Contact us with pickup location,
              destination, date, passenger count and any special requirements.
            </p>
          </section>

          <section className="b2b-section">
            <h2>What Is Included</h2>
            <p>Both options include, at no extra charge:</p>
            <div className="included-grid">
              {included.map((item) => (
                <div className="included-item" key={item}>{item}</div>
              ))}
            </div>
            <p style={{ marginTop: "16px", fontSize: "0.875rem" }}>
              No additional standard charges during a confirmed transfer. Additional stops,
              route changes or services outside the original reservation may be charged separately.
            </p>
          </section>

          <section className="b2b-section">
            <h2>Booking &amp; Confirmation</h2>
            <p>
              For destinations with an established fixed price, reservations are confirmed
              immediately. Once submitted, the booking is registered in our operational system,
              all passenger and flight details are recorded, and a confirmation is generated.
            </p>
            <p>
              For B2B partners, we send the confirmation directly to you — not to the passenger.
              You continue all standard communication with your customer and provide your own
              confirmation or voucher.
            </p>
            <div className="b2b-info-grid" style={{ marginTop: "24px" }}>
              <div className="b2b-info-card">
                <h3>Customer Communication</h3>
                <p>
                  You remain the main commercial contact for your customer. We only contact
                  the passenger for operational reasons: airport pickup, driver arrival,
                  flight changes or urgent transfer-day situations. We do not take over
                  the commercial relationship.
                </p>
              </div>
              <div className="b2b-info-card">
                <h3>Commission &amp; Markup</h3>
                <p>
                  We do not pay a separate commission. Under Option 2 your margin is the
                  €{AGENCY_DISCOUNT_EUR} reduction plus whatever markup, booking fee or
                  package margin you add on top. Your selling price to your customer is
                  your own commercial decision.
                </p>
              </div>
              <div className="b2b-info-card">
                <h3>Admin Panel</h3>
                <p>
                  B2B partners can optionally receive access to our online administration
                  system to manage and view registered reservations. Admin panel access is
                  €30/month and is not required to make B2B bookings.
                </p>
              </div>
            </div>
          </section>

          <section className="b2b-section">
            <h2>Flight Tracking &amp; Delays</h2>
            <p>
              We monitor incoming flights directly. If a flight is delayed, pickup time is
              automatically adjusted to the actual arrival time. No additional waiting charge
              for flight delays — even significant delays carry no extra fee as long as the
              flight eventually operates.
            </p>
            <p>
              If the airline cancels the flight completely, the airport transfer can be
              cancelled without a cancellation charge.
            </p>
          </section>

          <section className="b2b-section">
            <h2>Antalya Airport Meet &amp; Greet — Area J / 777</h2>
            <div className="b2b-video-wrap">
              <div className="b2b-video-phone">
                <iframe
                  src="https://www.youtube.com/embed/r79dH1HLJtk?rel=0&playsinline=1"
                  title="Antalya Airport Meet &amp; Greet Area J 777"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="b2b-video-copy">
                <p>
                  After collecting luggage, passengers proceed to our designated
                  {" "}<strong>Meet &amp; Greet Area J / 777</strong>. The passenger gives their
                  name to our airport team and is connected with the assigned driver and vehicle.
                </p>
                <p>
                  Our operational team manages the airport pickup process directly.
                  The video shows the exact meeting point your passengers will use.
                </p>
              </div>
            </div>
          </section>

          <section className="b2b-section">
            <h2>Payment</h2>
            <p>
              Under Option 1 the published fare is settled by the passenger with the driver on
              the day of travel. Under Option 2 the net rate is settled between us and you.
              Accepted currencies: <strong>EUR</strong>, USD, TRY. We recommend EUR whenever
              possible.
            </p>
            <p>
              If payment needs to be collected in advance by Antalya VIP Tourism through
              bank transfer, card payment or invoicing, different prices may apply due to
              additional tax and processing costs.
            </p>
          </section>

          <section className="b2b-section">
            <h2>Cancellation Policy</h2>
            <table className="cancel-table" aria-label="Cancellation policy">
              <thead>
                <tr>
                  <th>Situation</th>
                  <th>Charge</th>
                </tr>
              </thead>
              <tbody>
                {cancellation.map(([situation, charge, tone]) => (
                  <tr key={situation}>
                    <td>{situation}</td>
                    <td className={tone === "free" ? "cancel-free" : "cancel-fee"}>{charge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: "16px", fontSize: "0.875rem" }}>
              Percentages apply to the price confirmed for that booking — the published fare
              under Option 1, the agency net rate under Option 2. Failure to settle valid
              cancellation or no-show charges may result in suspension or termination of the
              B2B cooperation.
            </p>
          </section>

          <section className="b2b-section">
            <h2>Operational Reliability</h2>
            <p>
              We operate with a large network of vehicles and drivers, handling approximately
              20–30 simultaneous transfers. If a driver or vehicle encounters an operational
              problem, we arrange a replacement. Our objective is to complete every confirmed
              reservation rather than cancel due to internal issues.
            </p>
          </section>

          <div className="b2b-cta">
            <h2>Start a B2B Cooperation</h2>
            <p>
              You can start with individual reservations and evaluate our service quality
              before increasing booking volume. For fixed-price routes, bookings confirm
              immediately.
            </p>
            <div className="cta-buttons">
              <a className="button button-gold" href={whatsApp} target="_blank" rel="noopener">WhatsApp</a>
              <a className="button button-glass" href={email}>support@antalyaviptourism.com</a>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="footer-bottom">
          <span>© 2026 Antalya VIP Tourism</span>
          <span>
            <a href="/">Home</a> &nbsp;·&nbsp;
            <a href="/privacy/">Privacy</a> &nbsp;·&nbsp;
            <a href="/impressum.html">Imprint</a>
          </span>
        </div>
      </footer>
    </>
  );
}
