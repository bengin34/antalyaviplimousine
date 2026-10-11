import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm, type FieldError } from "react-hook-form";
import PhoneInput, { type Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { routeCatalog } from "../../../src/routes.js";
import {
  landOfLegendsFromPrice,
  landOfLegendsRates,
  landOfLegendsZoneKm,
} from "../../../src/land-of-legends.js";
import { HotelCombobox, type IndexedHotel } from "./HotelCombobox";
import { Icon } from "./Icon";
import { StaticPageHeader } from "./StaticPageHeader";
import {
  buildLandOfLegendsPayload,
  createLandOfLegendsSchema,
  fetchLandOfLegendsLiveRates,
  landOfLegendsQuote,
  vehicleFor,
  LAND_OF_LEGENDS_DEFAULT_DEPARTURE,
  LAND_OF_LEGENDS_DEFAULT_RETURN,
  type LandOfLegendsLiveRates,
  type LandOfLegendsValues,
} from "../lib/land-of-legends";
import { landOfLegendsCopy, type LandOfLegendsLanguage } from "../lib/land-of-legends-copy";
import { track } from "../lib/track";

const WHATSAPP_NUMBER = "905302655790";

const DEFAULT_PHONE_COUNTRY: Record<LandOfLegendsLanguage, Country> = {
  en: "GB", de: "DE", tr: "TR", ru: "RU",
};

/** Tomorrow by default: a same-day booking is possible but rarely what people mean. */
const isoDate = (offsetDays: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const errorId = (name: string) => `lol-error-${name.replace(/[^a-zA-Z0-9]+/g, "-")}`;
const fieldStatus = (name: string, error?: FieldError) =>
  error ? { "aria-invalid": true as const, "aria-describedby": errorId(name) } : {};
const fieldClass = (error?: FieldError) => `booking-field${error ? " has-error" : ""}`;

function ErrorText({ name, error }: { name: string; error?: FieldError }) {
  return error ? <span className="field-error-message" id={errorId(name)} role="alert">{error.message}</span> : null;
}

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
  const schema = useMemo(() => createLandOfLegendsSchema(copy.errors), [copy]);
  const [liveRates, setLiveRates] = useState<LandOfLegendsLiveRates>({});
  const [matchedHotel, setMatchedHotel] = useState<IndexedHotel | null>(null);
  const [hotelNotListed, setHotelNotListed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState<{ ref: string; quoted: boolean; whatsapp: string } | null>(null);
  const [minimumDate, setMinimumDate] = useState("");
  const startedRef = useRef(false);
  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track("booking_started", { route: "land_of_legends" });
  };

  const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<LandOfLegendsValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      hotelName: "", hotelRegion: "", travelDate: "",
      departureTime: LAND_OF_LEGENDS_DEFAULT_DEPARTURE, returnTime: LAND_OF_LEGENDS_DEFAULT_RETURN,
      vehicle: "vito", guests: "2", childSeats: "0", childAges: [], strollers: "0",
      customerName: "", customerPhone: "", customerEmail: "", notes: "",
    },
  });
  const values = watch();

  // Dates depend on the visitor's clock, so they are set after hydration
  // rather than baked into the prerendered HTML.
  useEffect(() => {
    setMinimumDate(isoDate(0));
    setValue("travelDate", isoDate(1));
    void fetchLandOfLegendsLiveRates().then(setLiveRates);
    track("landing_view", { route: "land_of_legends" });
  }, [setValue]);

  // The vehicle follows the party size: never a Vito that cannot carry them.
  const guests = Number(values.guests) || 0;
  const strollers = Number(values.strollers) || 0;
  const smallestVehicle = vehicleFor(guests, strollers);
  useEffect(() => {
    if (smallestVehicle === "sprinter" && values.vehicle === "vito") setValue("vehicle", "sprinter");
  }, [smallestVehicle, values.vehicle, setValue]);

  const quote = landOfLegendsQuote(values.hotelRegion ?? "", values.vehicle, liveRates);
  const regionName = (region: string) => {
    const route = routeCatalog[region as keyof typeof routeCatalog];
    if (!route) return region;
    return (route.names as Record<string, string>)[language] ?? route.names.en;
  };
  const rateFor = (region: string, vehicle: "vito" | "sprinter") =>
    landOfLegendsQuote(region, vehicle, liveRates);

  useEffect(() => {
    if (quote != null) track("price_shown", { route: "land_of_legends", region: values.hotelRegion, vehicle: values.vehicle, price: quote });
  }, [quote, values.hotelRegion, values.vehicle]);

  const handleHotelInput = (name: string) => {
    setValue("hotelName", name, { shouldValidate: false });
    setHotelNotListed(false);
    // A typed name no longer matches the picked hotel, so its region (and price) is dropped.
    if (matchedHotel && name !== matchedHotel.name) {
      setMatchedHotel(null);
      setValue("hotelRegion", "");
    }
  };
  const handleHotelSelect = (hotel: IndexedHotel) => {
    setMatchedHotel(hotel);
    setHotelNotListed(false);
    setValue("hotelName", hotel.name, { shouldValidate: true });
    setValue("hotelRegion", hotel.region);
    track("route_selected", { route: "land_of_legends", region: hotel.region });
  };

  const childSeatCount = Number(values.childSeats) || 0;
  const childAgeErrors = errors.childAges as unknown as FieldError[] | undefined;

  const submit = async (formValues: LandOfLegendsValues) => {
    setSubmitting(true);
    setSubmitError("");
    const price = landOfLegendsQuote(formValues.hotelRegion ?? "", formValues.vehicle, liveRates);
    track("begin_checkout", { route: "land_of_legends", vehicle: formValues.vehicle, price: price ?? 0 });
    try {
      const { createBooking } = await import("../../../src/lib/api.js");
      const booking = await createBooking(buildLandOfLegendsPayload(formValues, language));
      const confirmedPrice = Number(booking.price_eur) || 0;
      const quoted = confirmedPrice === 0;
      const lines = [
        "🎢 *The Land of Legends transfer*",
        `📋 Ref: ${booking.booking_ref}`,
        `🏨 Hotel: ${formValues.hotelName}`,
        `📅 Date: ${formValues.travelDate}`,
        `🕐 Hotel pick-up: ${formValues.departureTime}`,
        `🕐 Park pick-up: ${formValues.returnTime}`,
        `👥 Guests: ${formValues.guests} · ${formValues.vehicle === "sprinter" ? "Mercedes Sprinter" : "Mercedes Vito"}`,
        quoted ? "💶 Price: please confirm" : `💶 Price: €${confirmedPrice}`,
      ];
      setConfirmation({
        ref: booking.booking_ref,
        quoted,
        whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`,
      });
      track("booking_submitted", { route: "land_of_legends", vehicle: formValues.vehicle, price: confirmedPrice });
      if (confirmedPrice > 0) {
        window.gtag?.("event", "purchase", { transaction_id: booking.booking_ref, currency: "EUR", value: confirmedPrice, payment_type: "cash", item_category: "land_of_legends" });
        window.gtag?.("event", "conversion", { send_to: "AW-18248114753/IW8CCL7H38AcEMHEsP1D", transaction_id: booking.booking_ref, value: confirmedPrice, currency: "EUR" });
      }
    } catch (error) {
      console.error("Land of Legends booking error", error);
      setSubmitError(copy.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  const startOver = () => {
    setConfirmation(null);
    setMatchedHotel(null);
    setHotelNotListed(false);
    reset({ ...values, hotelName: "", hotelRegion: "", customerName: "", customerPhone: "", customerEmail: "", notes: "", travelDate: isoDate(1) });
  };

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
            {confirmation ? (
              <div className="lol-confirmation" role="status">
                <h3>{copy.confirmedTitle}</h3>
                <p>{confirmation.quoted ? copy.confirmedQuote : copy.confirmedFixed}</p>
                <p className="lol-reference">{copy.reference}: <strong>{confirmation.ref}</strong></p>
                <div className="lol-confirmation-actions">
                  <a className="quote-submit" href={confirmation.whatsapp} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_clicked", { route: "land_of_legends" })}>
                    <Icon name="whatsapp" className="icon" /><span>{copy.whatsappCta}</span>
                  </a>
                  <button type="button" className="booking-back-btn" onClick={startOver}>{copy.newBooking}</button>
                </div>
              </div>
            ) : (
              <form className="lol-form" noValidate onSubmit={handleSubmit(submit)} onFocus={markStarted}>
                <div className="booking-row">
                  <label className={fieldClass(errors.hotelName)} htmlFor="lol-hotel">
                    <span>{copy.hotelLabel}</span>
                    <HotelCombobox
                      id="lol-hotel"
                      value={values.hotelName}
                      onChange={handleHotelInput}
                      onSelect={handleHotelSelect}
                      onNotListed={() => setHotelNotListed(true)}
                      placeholder={copy.hotelPlaceholder}
                      regionLabel={regionName}
                      notListedLabel={copy.hotelNotListed}
                      noResultsLabel={copy.hotelNoMatch}
                      describedBy={["lol-hotel-status", errors.hotelName ? errorId("hotelName") : ""].filter(Boolean).join(" ")}
                      invalid={Boolean(errors.hotelName)}
                    />
                    <ErrorText name="hotelName" error={errors.hotelName} />
                    <span className="lol-hotel-status" id="lol-hotel-status" role="status">
                      {matchedHotel
                        ? quote != null
                          ? copy.hotelMatched(matchedHotel.name, regionName(matchedHotel.region))
                          : copy.hotelUnmatched
                        : hotelNotListed ? copy.hotelUnmatched : ""}
                    </span>
                  </label>
                </div>

                <div className="booking-row booking-outbound-row">
                  <label className={fieldClass(errors.travelDate)}>
                    <span>{copy.dateLabel}</span>
                    <div className="field-control"><Icon name="calendar" className="icon" /><input id="lol-date" type="date" min={minimumDate || undefined} {...register("travelDate")} {...fieldStatus("travelDate", errors.travelDate)} /></div>
                    <ErrorText name="travelDate" error={errors.travelDate} />
                  </label>
                  <label className={fieldClass(errors.departureTime)}>
                    <span>{copy.departureLabel}</span>
                    <div className="field-control"><Icon name="clock" className="icon" /><input id="lol-departure" type="time" step={900} {...register("departureTime")} {...fieldStatus("departureTime", errors.departureTime)} /></div>
                    <small className="lol-hint">{copy.departureHint}</small>
                    <ErrorText name="departureTime" error={errors.departureTime} />
                  </label>
                  <label className={fieldClass(errors.returnTime)}>
                    <span>{copy.returnLabel}</span>
                    <div className="field-control"><Icon name="clock" className="icon" /><input id="lol-return" type="time" step={900} max="23:30" {...register("returnTime")} {...fieldStatus("returnTime", errors.returnTime)} /></div>
                    <small className="lol-hint">{copy.returnHint}</small>
                    <ErrorText name="returnTime" error={errors.returnTime} />
                  </label>
                </div>

                <div className="booking-row booking-options-row">
                  <label className={fieldClass(errors.guests)}>
                    <span>{copy.guestsLabel}</span>
                    <div className="field-control"><Icon name="users" className="icon" /><select id="lol-guests" {...register("guests")} {...fieldStatus("guests", errors.guests)}>{Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}</select></div>
                    <ErrorText name="guests" error={errors.guests} />
                  </label>
                  <label className={fieldClass(errors.vehicle)}>
                    <span>{copy.vehicleLabel}</span>
                    <div className="field-control"><Icon name="car" className="icon" /><select id="lol-vehicle" {...register("vehicle")}>
                      <option value="vito" disabled={smallestVehicle === "sprinter"}>{copy.vito}</option>
                      <option value="sprinter">{copy.sprinter}</option>
                    </select></div>
                  </label>
                  <label className={fieldClass(errors.childSeats)}>
                    <span>{copy.childSeatsLabel}</span>
                    <div className="field-control"><Icon name="baby" className="icon" /><select id="lol-child-seats" {...register("childSeats")}>{Array.from({ length: 5 }, (_, i) => <option key={i} value={i}>{i === 0 ? copy.childSeatNone : i}</option>)}</select></div>
                  </label>
                  <label className={fieldClass(errors.strollers)}>
                    <span>{copy.strollersLabel}</span>
                    <div className="field-control"><Icon name="baby" className="icon" /><select id="lol-strollers" {...register("strollers")}>{Array.from({ length: 4 }, (_, i) => <option key={i} value={i}>{i}</option>)}</select></div>
                  </label>
                </div>

                {childSeatCount > 0 && (
                  <div className="booking-row booking-options-row">
                    {Array.from({ length: childSeatCount }, (_, i) => (
                      <label key={i} className={fieldClass(childAgeErrors?.[i])}>
                        <span>{copy.childAgeLabel(i + 1)}</span>
                        <div className="field-control"><Icon name="baby" className="icon" /><select id={`lol-child-age-${i}`} {...register(`childAges.${i}`)} {...fieldStatus(`childAges-${i}`, childAgeErrors?.[i])}><option value="">{copy.childAgeSelect}</option>{Array.from({ length: 12 }, (_, age) => <option key={age} value={age}>{age === 0 ? copy.childAgeBaby : age}</option>)}</select></div>
                        <ErrorText name={`childAges-${i}`} error={childAgeErrors?.[i]} />
                      </label>
                    ))}
                  </div>
                )}

                <div className="booking-row booking-row-personal">
                  <label className={fieldClass(errors.customerName)}>
                    <span>{copy.nameLabel}</span>
                    <div className="field-control"><input id="lol-name" autoComplete="name" maxLength={80} {...register("customerName")} {...fieldStatus("customerName", errors.customerName)} /></div>
                    <ErrorText name="customerName" error={errors.customerName} />
                  </label>
                  <label className={fieldClass(errors.customerPhone)}>
                    <span>{copy.phoneLabel}</span>
                    <div className="field-control phone-field-control"><Controller control={control} name="customerPhone" render={({ field }) => <PhoneInput id="lol-phone" {...fieldStatus("customerPhone", errors.customerPhone)} international defaultCountry={DEFAULT_PHONE_COUNTRY[language]} autoComplete="tel" value={field.value || undefined} onChange={(value) => field.onChange(value ?? "")} onBlur={field.onBlur} />} /></div>
                    <ErrorText name="customerPhone" error={errors.customerPhone} />
                  </label>
                  <label className={fieldClass(errors.customerEmail)}>
                    <span>{copy.emailLabel}</span>
                    <div className="field-control"><input id="lol-email" type="email" autoComplete="email" maxLength={120} {...register("customerEmail")} {...fieldStatus("customerEmail", errors.customerEmail)} /></div>
                    <ErrorText name="customerEmail" error={errors.customerEmail} />
                  </label>
                </div>

                <div className="booking-row">
                  <label className="booking-field">
                    <span>{copy.notesLabel}</span>
                    <div className="field-control"><input id="lol-notes" maxLength={300} placeholder={copy.notesPlaceholder} {...register("notes")} /></div>
                  </label>
                </div>

                <div className="lol-summary" aria-live="polite">
                  <div>
                    <small>{copy.totalLabel}</small>
                    <strong>{quote != null ? `€${quote}` : copy.quoteOnRequest}</strong>
                    <span>{copy.totalIncludes}</span>
                  </div>
                  <p>{copy.payInCar}</p>
                </div>

                {submitError && <p className="field-error-message" role="alert">{submitError}</p>}
                <div className="booking-footer">
                  <button className="quote-submit" type="submit" disabled={submitting}>
                    <span>{submitting ? copy.submitting : copy.submit}</span>
                    <Icon name="arrow-right" className="icon" />
                  </button>
                </div>
              </form>
            )}
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
