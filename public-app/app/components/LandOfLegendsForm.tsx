import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm, type FieldError, type FieldErrors } from "react-hook-form";
import { LazyPhoneInput, preloadPhoneInput } from "./LazyPhoneInput";
import { hotelIndex, hotelSlug } from "../../../src/hotel-index.js";
import {
  landOfLegendsDriveMinutes,
  landOfLegendsMeetingPoint,
  landOfLegendsNotice,
  turkeyToday,
} from "../../../src/land-of-legends.js";
import { HotelCombobox, type IndexedHotel } from "./HotelCombobox";
import { Icon } from "./Icon";
import {
  addDays,
  buildLandOfLegendsPayload,
  createLandOfLegendsSchema,
  fetchLandOfLegendsLiveRates,
  landOfLegendsQuote,
  submitErrorMessage,
  suggestedDeparture,
  vehicleFor,
  LAND_OF_LEGENDS_DEFAULT_DEPARTURE,
  LAND_OF_LEGENDS_DEFAULT_RETURN,
  type LandOfLegendsLiveRates,
  type LandOfLegendsValues,
} from "../lib/land-of-legends";
import { landOfLegendsCopy, landOfLegendsRegionName, type LandOfLegendsLanguage } from "../lib/land-of-legends-copy";
import { track } from "../lib/track";

const WHATSAPP_NUMBER = "905302655790";

/** Exact (slugged) hotel names and aliases, so a guest who types the full name gets the price without tapping a suggestion. */
const hotelBySlug = new Map<string, IndexedHotel>();
for (const hotel of hotelIndex) {
  for (const name of [hotel.name, ...hotel.aliases]) {
    const slug = hotelSlug(name);
    if (slug && !hotelBySlug.has(slug)) hotelBySlug.set(slug, hotel);
  }
}

const errorId = (name: string) => `lol-error-${name.replace(/[^a-zA-Z0-9]+/g, "-")}`;
const fieldStatus = (name: string, error?: FieldError) =>
  error ? { "aria-invalid": true as const, "aria-describedby": errorId(name) } : {};
const fieldClass = (error?: FieldError) => `booking-field${error ? " has-error" : ""}`;

/** Linked to its field by aria-describedby; focus moves to the first invalid field instead of every message shouting at once. */
function ErrorText({ name, error }: { name: string; error?: FieldError }) {
  return error ? <span className="field-error-message" id={errorId(name)}>{error.message}</span> : null;
}

type Confirmation = {
  ref: string;
  price: number;
  pending: boolean;
  whatsapp: string;
  values: LandOfLegendsValues;
};

/**
 * The Land of Legends booking form: hotel → park → hotel with the driver
 * waiting. Used on the excursion page and inside the main booking form, so a
 * guest who starts there never has to leave to book the day trip.
 *
 * `liveRates` lets a parent that already fetched the admin prices share them;
 * without it the form fetches its own.
 */
export function LandOfLegendsForm({ language, liveRates: sharedRates }: {
  language: LandOfLegendsLanguage;
  liveRates?: LandOfLegendsLiveRates;
}) {
  const copy = landOfLegendsCopy[language];
  const meetingPoint = landOfLegendsMeetingPoint[language];
  const schema = useMemo(() => createLandOfLegendsSchema(copy.errors), [copy]);
  const [ownRates, setOwnRates] = useState<LandOfLegendsLiveRates>({});
  const liveRates = sharedRates ?? ownRates;
  const [matchedHotel, setMatchedHotel] = useState<IndexedHotel | null>(null);
  const [hotelNotListed, setHotelNotListed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [minimumDate, setMinimumDate] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const confirmationHeadingRef = useRef<HTMLHeadingElement>(null);
  const startedRef = useRef(false);
  const lastPriceShownRef = useRef("");
  // Once the guest sets a time or a vehicle themselves, we stop changing it for them.
  const departureTouchedRef = useRef(false);
  const vehicleTouchedRef = useRef(false);
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

  // This form shows the phone field from the start; fetch its library now.
  useEffect(() => {
    void preloadPhoneInput();
  }, []);

  // Dates follow Turkey's calendar and are set after hydration rather than
  // baked into the prerendered HTML.
  useEffect(() => {
    const today = turkeyToday();
    setMinimumDate(today);
    setValue("travelDate", addDays(today, 1));
    if (!sharedRates) void fetchLandOfLegendsLiveRates().then(setOwnRates);
    // Only the first render decides; a parent passing rates later does not refetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);

  // The vehicle follows the party size both ways, unless the guest chose it.
  const guests = Number(values.guests) || 0;
  const strollers = Number(values.strollers) || 0;
  const smallestVehicle = vehicleFor(guests, strollers);
  useEffect(() => {
    if (smallestVehicle === "sprinter" && values.vehicle === "vito") setValue("vehicle", "sprinter");
    else if (smallestVehicle === "vito" && values.vehicle === "sprinter" && !vehicleTouchedRef.current) setValue("vehicle", "vito");
  }, [smallestVehicle, values.vehicle, setValue]);
  const autoSprinter = smallestVehicle === "sprinter" && values.vehicle === "sprinter";

  const region = values.hotelRegion ?? "";
  const quote = landOfLegendsQuote(region, values.vehicle, liveRates);
  const driveMinutes = matchedHotel ? landOfLegendsDriveMinutes(matchedHotel.region) : null;
  const notice = values.travelDate && values.departureTime ? landOfLegendsNotice(values.travelDate, values.departureTime) : "ok";
  const regionName = (slug: string) => landOfLegendsRegionName(slug, language);

  // One price_shown per region + vehicle + price, not one per re-render or live-rate arrival.
  useEffect(() => {
    if (quote == null) return;
    const key = `${region}:${values.vehicle}:${quote}`;
    if (lastPriceShownRef.current === key) return;
    lastPriceShownRef.current = key;
    track("price_shown", { route: "land_of_legends", region, vehicle: values.vehicle, price: quote });
  }, [quote, region, values.vehicle]);

  const applyHotel = (hotel: IndexedHotel) => {
    setMatchedHotel(hotel);
    setHotelNotListed(false);
    setValue("hotelRegion", hotel.region);
    // Far-away guests need to leave earlier than the default to make opening time.
    const suggestion = suggestedDeparture(landOfLegendsDriveMinutes(hotel.region));
    if (suggestion && !departureTouchedRef.current) setValue("departureTime", suggestion);
  };
  const handleHotelInput = (name: string) => {
    setValue("hotelName", name, { shouldValidate: false });
    setHotelNotListed(false);
    const exact = hotelBySlug.get(hotelSlug(name));
    if (exact) {
      applyHotel(exact);
    } else if (matchedHotel) {
      // A typed name no longer matches the picked hotel, so its region (and price) is dropped.
      setMatchedHotel(null);
      setValue("hotelRegion", "");
    }
  };
  const handleHotelSelect = (hotel: IndexedHotel) => {
    setValue("hotelName", hotel.name, { shouldValidate: true });
    applyHotel(hotel);
    track("route_selected", { route: "land_of_legends", region: hotel.region });
  };

  const childSeatCount = Number(values.childSeats) || 0;
  const childAgeErrors = errors.childAges as unknown as FieldError[] | undefined;

  // Scroll the confirmation into view and move focus to it: on a phone the
  // shorter block would otherwise leave the guest staring at the FAQ.
  useEffect(() => {
    if (!confirmation) return;
    const heading = confirmationHeadingRef.current;
    heading?.scrollIntoView?.({ behavior: "smooth", block: "center" });
    heading?.focus({ preventScroll: true });
  }, [confirmation]);

  const focusFirstError = (_errors: FieldErrors<LandOfLegendsValues>) => {
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    });
  };

  const submit = async (formValues: LandOfLegendsValues) => {
    setSubmitting(true);
    setSubmitError("");
    const price = landOfLegendsQuote(formValues.hotelRegion ?? "", formValues.vehicle, liveRates);
    track("begin_checkout", { route: "land_of_legends", vehicle: formValues.vehicle, price: price ?? 0 });
    try {
      const { createBooking } = await import("../../../src/lib/api.js");
      const booking = await createBooking(buildLandOfLegendsPayload(formValues, language));
      const confirmedPrice = Number(booking.price_eur) || 0;
      const lines = [
        "🎢 *The Land of Legends transfer*",
        `📋 Ref: ${booking.booking_ref}`,
        `🏨 Hotel: ${formValues.hotelName}`,
        `📅 Date: ${formValues.travelDate}`,
        `🕐 Hotel pick-up: ${formValues.departureTime}`,
        `🕐 Park pick-up: ${formValues.returnTime}`,
        `👥 Guests: ${formValues.guests} · ${formValues.vehicle === "sprinter" ? "Mercedes Sprinter" : "Mercedes Vito"}`,
        confirmedPrice ? `💶 Price: €${confirmedPrice}` : "💶 Price: please confirm",
      ];
      setConfirmation({
        ref: booking.booking_ref,
        price: confirmedPrice,
        pending: booking.status === "pending",
        whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`,
        values: formValues,
      });
      track("booking_submitted", { route: "land_of_legends", vehicle: formValues.vehicle, price: confirmedPrice });
      if (confirmedPrice > 0) {
        window.gtag?.("event", "purchase", { transaction_id: booking.booking_ref, currency: "EUR", value: confirmedPrice, payment_type: "cash", item_category: "land_of_legends" });
        window.gtag?.("event", "conversion", { send_to: "AW-18248114753/IW8CCL7H38AcEMHEsP1D", transaction_id: booking.booking_ref, value: confirmedPrice, currency: "EUR" });
      }
    } catch (error) {
      console.error("Land of Legends booking error", error);
      // The server measures notice on its own clock; say why if that is what failed.
      setSubmitError(submitErrorMessage(error, { tooSoon: copy.errors.tooSoon, generic: copy.submitError }));
    } finally {
      setSubmitting(false);
    }
  };

  const startOver = () => {
    setConfirmation(null);
    setMatchedHotel(null);
    setHotelNotListed(false);
    departureTouchedRef.current = false;
    reset({ ...values, hotelName: "", hotelRegion: "", customerName: "", customerPhone: "", customerEmail: "", notes: "", travelDate: addDays(turkeyToday(), 1), departureTime: LAND_OF_LEGENDS_DEFAULT_DEPARTURE });
  };

  const askLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("The Land of Legends transfer — question")}`;
  const departureField = register("departureTime");
  const vehicleField = register("vehicle");

  const hotelStatus = matchedHotel
    ? quote != null
      ? copy.hotelMatched(matchedHotel.name, regionName(matchedHotel.region))
      : copy.regionOnRequest
    : hotelNotListed ? copy.hotelUnmatched : "";

  if (confirmation) {
    const booked = confirmation.values;
    return (
      <div className="lol-confirmation" role="status">
        <h3 ref={confirmationHeadingRef} tabIndex={-1}>{copy.confirmedTitle}</h3>
        <p>{confirmation.price === 0 ? copy.confirmedQuote : confirmation.pending ? copy.shortNotice : copy.confirmedFixed}</p>
        <p className="lol-reference">{copy.reference}: <strong>{confirmation.ref}</strong></p>
        <dl className="lol-summary-list">
          <div><dt>{copy.hotelLabel}</dt><dd>{booked.hotelName}</dd></div>
          <div><dt>{copy.dateLabel}</dt><dd>{booked.travelDate}</dd></div>
          <div><dt>{copy.departureLabel}</dt><dd>{booked.departureTime}</dd></div>
          <div><dt>{copy.returnLabel}</dt><dd>{booked.returnTime}</dd></div>
          <div><dt>{copy.meetingLabel}</dt><dd>{meetingPoint}</dd></div>
          <div><dt>{copy.vehicleLabel}</dt><dd>{booked.vehicle === "sprinter" ? copy.sprinter : copy.vito} · {booked.guests}</dd></div>
          <div><dt>{copy.confirmedPriceLabel}</dt><dd>{confirmation.price ? `€${confirmation.price}` : copy.quoteOnRequest}</dd></div>
        </dl>
        <p className="lol-tickets-note">{copy.ticketsNotIncluded}</p>
        <div className="lol-confirmation-actions">
          <a className="quote-submit" href={confirmation.whatsapp} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_clicked", { route: "land_of_legends" })}>
            <Icon name="whatsapp" className="icon" /><span>{copy.whatsappCta}</span>
          </a>
          <button type="button" className="booking-back-btn" onClick={startOver}>{copy.newBooking}</button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} className="lol-form" noValidate onSubmit={handleSubmit(submit, focusFirstError)} onFocus={markStarted}>
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
          <span className="lol-hotel-status" id="lol-hotel-status" role="status">{hotelStatus}</span>
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
          <div className="field-control"><Icon name="clock" className="icon" /><input id="lol-departure" type="time" step={900} {...departureField} onChange={(event) => { departureTouchedRef.current = true; void departureField.onChange(event); }} {...fieldStatus("departureTime", errors.departureTime)} /></div>
          <small className="lol-hint">
            {driveMinutes != null && matchedHotel ? `${copy.driveTime(driveMinutes, regionName(matchedHotel.region))} ` : ""}{copy.departureHint}
          </small>
          <ErrorText name="departureTime" error={errors.departureTime} />
        </label>
        <label className={fieldClass(errors.returnTime)}>
          <span>{copy.returnLabel}</span>
          <div className="field-control"><Icon name="clock" className="icon" /><input id="lol-return" type="time" step={900} max="23:30" {...register("returnTime")} {...fieldStatus("returnTime", errors.returnTime)} /></div>
          <small className="lol-hint">{copy.returnHint}</small>
          <ErrorText name="returnTime" error={errors.returnTime} />
        </label>
      </div>

      <div className="booking-row booking-options-row lol-options-row">
        <label className={fieldClass(errors.guests)}>
          <span>{copy.guestsLabel}</span>
          <div className="field-control"><Icon name="users" className="icon" /><select id="lol-guests" {...register("guests")} {...fieldStatus("guests", errors.guests)}>{Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}</select></div>
          <ErrorText name="guests" error={errors.guests} />
        </label>
        <label className={fieldClass(errors.vehicle)}>
          <span>{copy.vehicleLabel}</span>
          <div className="field-control"><Icon name="car" className="icon" /><select id="lol-vehicle" {...vehicleField} onChange={(event) => { vehicleTouchedRef.current = true; void vehicleField.onChange(event); }}>
            <option value="vito" disabled={smallestVehicle === "sprinter"}>{copy.vito}</option>
            <option value="sprinter">{copy.sprinter}</option>
          </select></div>
          <small className="lol-hint" role="status">{autoSprinter ? copy.sprinterNote(guests) : ""}</small>
        </label>
        <label className={fieldClass(errors.childSeats)}>
          <span>{copy.childSeatsLabel}</span>
          <div className="field-control"><Icon name="baby" className="icon" /><select id="lol-child-seats" {...register("childSeats")} {...fieldStatus("childSeats", errors.childSeats)}>{Array.from({ length: 5 }, (_, i) => <option key={i} value={i}>{i === 0 ? copy.childSeatNone : i}</option>)}</select></div>
          <ErrorText name="childSeats" error={errors.childSeats} />
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
          {/* Opens empty rather than pre-filled with a dial code: see BookingForm. */}
          <div className="field-control phone-field-control"><Controller control={control} name="customerPhone" render={({ field }) => <LazyPhoneInput id="lol-phone" ref={field.ref} {...fieldStatus("customerPhone", errors.customerPhone)} international autoComplete="tel" value={field.value || undefined} onChange={(value) => field.onChange(value ?? "")} onBlur={field.onBlur} />} /></div>
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
        <ul className="lol-summary-notes">
          <li><strong>{copy.ticketsNotIncluded}</strong></li>
          <li>{copy.meetingLabel}: {meetingPoint}</li>
          <li>{copy.payInCar}</li>
          {notice === "short" && <li className="lol-short-notice">{copy.shortNotice}</li>}
        </ul>
      </div>

      {submitError && <p className="field-error-message" role="alert">{submitError}</p>}
      <div className="booking-footer lol-form-footer">
        <button className="quote-submit" type="submit" disabled={submitting}>
          <span>{submitting ? copy.submitting : copy.submit}</span>
          <Icon name="arrow-right" className="icon" />
        </button>
        <a className="lol-ask-link" href={askLink} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_clicked", { route: "land_of_legends", source: "ask" })}>
          <Icon name="whatsapp" className="icon" />{copy.askWhatsapp}
        </a>
      </div>
    </form>
  );
}
