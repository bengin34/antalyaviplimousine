import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { publicRouteSlugs, routeCatalog } from "../../../src/routes.js";
import { useLanguage } from "../i18n";
import { Icon } from "./Icon";
import {
  buildPublicBookingPayload,
  createPublicBookingSchema,
  fetchLivePriceOverrides,
  inclusiveDayCount,
  quoteFor,
  DAILY_CHAUFFEUR_RATE_EUR,
  type LivePriceOverrides,
  type PublicBookingValues,
} from "../lib/booking";

type RouteSelection = { route: string; vehicle: "vito" | "sprinter"; nonce: number };

const todayISO = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

function FieldErrorMessage({ error }: { error?: FieldError }) {
  return error ? <span className="field-error-message" role="alert">{error.message}</span> : null;
}

function whatsappConfirmation(values: PublicBookingValues, bookingRef: string, price: number) {
  const isDailyChauffeur = values.tripType === "daily_chauffeur";
  const routeName = routeCatalog[values.destination as keyof typeof routeCatalog]?.names.en ?? values.destination;
  const lines = [
    "🚗 *Antalya VIP Tourism — New Booking*",
    `📋 Ref: ${bookingRef}`,
    `👤 Name: ${values.customerName}`,
    `📞 Phone: ${values.customerPhone}`,
    `✉️ Email: ${values.customerEmail}`,
    `↔️ Journey: ${isDailyChauffeur ? "Daily vehicle + chauffeur" : values.tripType === "round_trip" ? "Round trip" : "One way"}`,
    `📅 Date: ${values.travelDate}`,
    `📍 Pickup: ${values.pickup === "private_address" ? values.pickupAddress : values.pickup}`,
    `🚘 Vehicle: ${values.vehicle === "sprinter" ? "Mercedes Sprinter" : "Mercedes Vito"}`,
    `👥 Guests: ${values.guests}`,
  ];
  if (!isDailyChauffeur) lines.splice(7, 0, `🏁 Dropoff: ${values.destination === "private_address" ? values.dropoffAddress : routeName}`);
  if (values.hotelName) lines.push(`🏨 Hotel: ${values.hotelName}`);
  const childSeatCount = Number(values.childSeats) || 0;
  if (childSeatCount > 0) {
    const ages = (values.childAges || []).slice(0, childSeatCount).map(age => Number(age));
    const agesText = ages.length ? ` (${ages.map((age, i) => `Child ${i + 1}: ${age === 0 ? "under 1" : `${age} yr`}`).join(", ")})` : "";
    lines.push(`👶 Child seats: ${childSeatCount}${agesText}`);
  }
  if (values.flightNumber) lines.push(`✈️ Flight: ${values.flightNumber}`);
  if (values.arrivalTime) lines.push(`🕐 Arrival: ${values.arrivalTime}`);
  if (values.tripType === "round_trip") {
    lines.push(`📅 Return: ${values.returnDate}`, `🕐 Return pickup: ${values.returnPickupTime}`);
    if (values.returnFlightNumber) lines.push(`✈️ Return flight: ${values.returnFlightNumber}`);
  }
  if (isDailyChauffeur) {
    lines.push(
      `📅 Last service day: ${values.serviceEndDate}`,
      `🕐 Daily start: ${values.pickupTime}`,
      "⛽ Fuel: Excluded — paid separately by the customer based on use",
    );
    if (values.departureFlightDate) lines.push(`✈️ Departure: ${values.departureFlightDate} ${values.departureFlightTime} ${values.departureFlightNumber}`.trim());
  }
  if (price) lines.push(`💶 Price: €${price}`);
  return `https://wa.me/905302655790?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function BookingForm({
  selection,
  scrollOnSelect = true,
}: {
  selection?: RouteSelection;
  scrollOnSelect?: boolean;
}) {
  const { language, t } = useLanguage();
  const schema = useMemo(() => createPublicBookingSchema(t), [t]);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [minimumDate, setMinimumDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState<{ ref: string; whatsapp: string; message: string } | null>(null);
  const [pendingDailyBooking, setPendingDailyBooking] = useState<PublicBookingValues | null>(null);
  const [fuelAcknowledged, setFuelAcknowledged] = useState(false);
  const [liveOverrides, setLiveOverrides] = useState<LivePriceOverrides>({});
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    trigger,
    formState: { errors },
  } = useForm<PublicBookingValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      tripType: "one_way", pickup: "airport", destination: "", vehicle: "vito", guests: "2",
      luggage: "", childSeats: "0", childAges: [], travelDate: "", arrivalTime: "", flightNumber: "",
      returnDate: "", returnPickupTime: "", returnFlightNumber: "", pickupAddress: "",
      serviceEndDate: "", pickupTime: "", departureFlightDate: "", departureFlightTime: "", departureFlightNumber: "",
      dropoffAddress: "", hotelName: "", customerName: "", customerPhone: "", customerEmail: "",
    },
  });

  const values = watch();
  const isDailyChauffeur = values.tripType === "daily_chauffeur";
  const hireDays = isDailyChauffeur ? inclusiveDayCount(values.travelDate, values.serviceEndDate) : 0;
  const quote = quoteFor(values, liveOverrides);
  const dailyRateEur = liveOverrides.dailyRates?.[values.vehicle] ?? DAILY_CHAUFFEUR_RATE_EUR;
  const selectedRoute = routeCatalog[values.destination as keyof typeof routeCatalog];
  const selectedRouteName = selectedRoute?.names[language as keyof typeof selectedRoute.names] ?? selectedRoute?.names.en;
  const pickupName = values.pickup === "airport"
    ? t("airportOption", "Antalya Airport (AYT)")
    : values.pickup === "hotel"
      ? t("hotelOption", "Hotel")
      : t("privateAddressOption", "Private address");
  const destinationName = values.destination === "airport"
    ? t("airportOption", "Antalya Airport (AYT)")
    : values.destination === "private_address"
      ? t("privateAddressOption", "Private address")
      : selectedRouteName ?? values.destination;
  const isPrivateAddressQuote = !isDailyChauffeur && values.pickup === "private_address" && values.destination === "private_address";
  const vitoFits = Number(values.guests) <= 6 && Number(values.luggage) <= 6 && Number(values.guests) + Number(values.luggage) <= 12;
  const hasPrice = !isDailyChauffeur && selectedRoute && quote.price > 0;
  const childSeatCount = Number(values.childSeats) || 0;

  useEffect(() => {
    setValue("childAges", Array.from({ length: childSeatCount }, (_, i) => values.childAges?.[i] ?? ""), { shouldValidate: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childSeatCount, setValue]);

  useEffect(() => {
    const today = todayISO();
    setMinimumDate(today);
    setValue("travelDate", today, { shouldValidate: false });
    setValue("serviceEndDate", today, { shouldValidate: false });
  }, [setValue]);

  useEffect(() => {
    let cancelled = false;
    void fetchLivePriceOverrides().then((overrides) => {
      if (!cancelled) setLiveOverrides(overrides);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selection) return;
    setValue("destination", selection.route, { shouldValidate: true });
    setValue("vehicle", selection.vehicle, { shouldValidate: true });
    if (!isDailyChauffeur) setStep(2);
    if (scrollOnSelect) {
      document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollOnSelect, selection, setValue, isDailyChauffeur]);

  useEffect(() => {
    if (isDailyChauffeur) setStep(1);
  }, [isDailyChauffeur]);

  useEffect(() => {
    if (values.vehicle === "vito" && !vitoFits) setValue("vehicle", "sprinter", { shouldValidate: true });
  }, [setValue, values.vehicle, vitoFits]);

  useEffect(() => {
    if (!isDailyChauffeur || !values.travelDate) return;
    if (!values.serviceEndDate || values.serviceEndDate < values.travelDate) {
      setValue("serviceEndDate", values.travelDate, { shouldValidate: true });
    }
  }, [isDailyChauffeur, setValue, values.serviceEndDate, values.travelDate]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bookingRef = params.get("booking_ref");
    if (params.get("payment") === "success" && bookingRef) {
      setConfirmation({ ref: bookingRef, whatsapp: `https://wa.me/905302655790?text=${encodeURIComponent(`Booking reference: ${bookingRef}`)}`, message: t("weWillContact", "Your payment was successful. We will contact you shortly.") });
      window.history.replaceState({}, "", window.location.pathname);
    } else if (params.get("payment") === "failed") {
      setSubmitError(t("paymentError", "Payment failed. Please try again."));
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [t]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", Boolean(confirmation || pendingDailyBooking));
    return () => document.body.classList.remove("modal-open");
  }, [confirmation, pendingDailyBooking]);

  const createValidatedBooking = async (formValues: PublicBookingValues, acceptedFuelTerms = false) => {
    setSubmitting(true);
    setSubmitError("");
    const currentQuote = quoteFor(formValues, liveOverrides);
    window.gtag?.("event", "begin_checkout", { currency: "EUR", value: currentQuote.price, trip_type: formValues.tripType });
    try {
      const { createBooking } = await import("../../../src/lib/api.js");
      const booking = await createBooking(buildPublicBookingPayload(formValues, language, acceptedFuelTerms));
      const confirmedPrice = Number(booking.price_eur) || currentQuote.price;
      const message = formValues.tripType === "daily_chauffeur"
        ? t("dailyCashConfirmation", "Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.")
        : formValues.destination === "airport"
        ? t("airportReturnPrice", "The price will be confirmed after we check the pick-up address.")
        : formValues.destination === "private_address"
          ? t("customDestinationPrice", "The price will be confirmed after we check the drop-off address.")
          : t("cashConfirmation", "Your booking is confirmed. Pay the fixed total directly to your driver in the vehicle.");
      setConfirmation({ ref: booking.booking_ref, whatsapp: whatsappConfirmation(formValues, booking.booking_ref, confirmedPrice), message });
      if (confirmedPrice > 0) {
        window.gtag?.("event", "purchase", { transaction_id: booking.booking_ref, currency: "EUR", value: confirmedPrice, payment_type: "cash" });
        window.gtag?.("event", "conversion", { send_to: "AW-18248114753/IW8CCL7H38AcEMHEsP1D", transaction_id: booking.booking_ref, value: confirmedPrice, currency: "EUR" });
      }
      reset({ ...formValues, destination: "", tripType: "one_way", luggage: "", travelDate: minimumDate || todayISO(), returnDate: "", returnPickupTime: "", returnFlightNumber: "", serviceEndDate: minimumDate || todayISO(), pickupTime: "", departureFlightDate: "", departureFlightTime: "", departureFlightNumber: "", arrivalTime: "", flightNumber: "", customerName: "", customerPhone: "", customerEmail: "" });
      setStep(1);
    } catch (error) {
      console.error("Booking error", error);
      setSubmitError(t("bookingError", "Your booking could not be completed. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  const submit = (formValues: PublicBookingValues) => {
    if (formValues.tripType === "daily_chauffeur") {
      setFuelAcknowledged(false);
      setPendingDailyBooking(formValues);
      return;
    }
    window.gtag?.("event", "booking_submitted", { route: formValues.destination, price: quote.price });
    void createValidatedBooking(formValues);
  };

  const confirmDailyBooking = () => {
    if (!pendingDailyBooking || !fuelAcknowledged) return;
    const booking = pendingDailyBooking;
    setPendingDailyBooking(null);
    void createValidatedBooking(booking, true);
  };

  const advanceToStep2 = () => {
    if (!isDailyChauffeur && !values.destination) {
      setError("destination", { message: t("destinationRequired", "Please select a destination.") });
      return;
    }
    window.gtag?.("event", "price_shown", { route: values.destination, price: quote.price, vehicle: values.vehicle });
    setStep(2);
    window.setTimeout(() => document.querySelector<HTMLElement>("#travel-date")?.focus(), 100);
  };

  const advanceToStep3 = async () => {
    const step2Fields: (keyof PublicBookingValues)[] = ["travelDate", "luggage", "childSeats", "childAges"];
    if (values.tripType === "round_trip") step2Fields.push("returnDate", "returnPickupTime");
    if (values.pickup === "private_address") step2Fields.push("pickupAddress");
    if (values.destination === "private_address") step2Fields.push("dropoffAddress");
    if (!isDailyChauffeur) step2Fields.push("hotelName", "flightNumber");
    const valid = await trigger(step2Fields);
    if (!valid) return;
    window.gtag?.("event", "booking_started", { route: values.destination, price: quote.price });
    setStep(3);
    window.setTimeout(() => document.querySelector<HTMLInputElement>("#customer-name")?.focus(), 100);
  };

  const fieldClass = (error?: FieldError) => `booking-field${error ? " has-error" : ""}`;
  const openTimePicker = (id: string) => {
    const input = document.querySelector<HTMLInputElement>(`#${id}`);
    input?.focus();
    try { input?.showPicker?.(); } catch { /* Native picker availability varies by browser. */ }
  };

  return (
    <section className="booking-shell" id="booking" aria-labelledby="booking-title">
      <div className="booking-shell-inner">
        <div className="booking-shell-header">
          <div>
            <span className="mini-label">{t("privateJourney", "Your private journey")}</span>
            <h2 id="booking-title">{t("bookTransfer", "Book your transfer")}</h2>
          </div>
          <div id="booking-price-display" className={`booking-price-display${isDailyChauffeur || values.destination ? " visible" : ""}`}>
            {isDailyChauffeur
              ? <><span className="price-display-route">{t("dailyChauffeur", "Daily vehicle + chauffeur")} · {hireDays || 0} {t("days", "days")}</span><span className="price-display-prices"><strong className="price-display-amount">€{quote.price}</strong></span><span className="price-display-note">€{dailyRateEur} × {hireDays || 0} · {t("fuelExcludedShort", "fuel excluded")}</span></>
              : selectedRoute && quote.price > 0
                ? <><span className="price-display-route">{pickupName} {values.tripType === "round_trip" ? "⇄" : "→"} {destinationName}</span><span className="price-display-prices"><strong className="price-display-amount">€{quote.price}</strong></span><span className="price-display-note">{values.vehicle === "sprinter" ? "Mercedes Sprinter" : "Mercedes Vito"} · {values.tripType === "round_trip" ? `${t("roundTripPriceNote", "round trip · 2 journeys")} · ` : ""}{t("perVehicle", "fixed · per vehicle")}</span></>
                : values.destination
                  ? <><span className="price-display-route">{pickupName} {values.tripType === "round_trip" ? "⇄" : "→"} {destinationName}</span><span className="price-display-note">{values.destination === "airport" ? t("airportReturnPrice", "Price confirmed after address review.") : t("customDestinationPrice", "Price confirmed after address review.")}</span></>
                  : null}
          </div>
        </div>

        {!isDailyChauffeur && (
          <div className="booking-steps" aria-label="Booking steps">
            <span className={`booking-step${step === 1 ? " active" : step > 1 ? " done" : ""}`}>
              <span className="booking-step-num">{step > 1 ? "✓" : "1"}</span>
              <span className="booking-step-label">{t("stepRoute", "Route")}</span>
            </span>
            <span className="booking-step-divider" />
            <span className={`booking-step${step === 2 ? " active" : step > 2 ? " done" : ""}`}>
              <span className="booking-step-num">{step > 2 ? "✓" : "2"}</span>
              <span className="booking-step-label">{t("stepDetails", "Details")}</span>
            </span>
            <span className="booking-step-divider" />
            <span className={`booking-step${step === 3 ? " active" : ""}`}>
              <span className="booking-step-num">3</span>
              <span className="booking-step-label">{t("stepContact", "Contact")}</span>
            </span>
          </div>
        )}

        <form className="booking-card" id="quote-form" noValidate onSubmit={handleSubmit(submit)}>

          {/* ── Step 1: Route + instant price ─────────────────────── */}
          {(isDailyChauffeur || step === 1) && (
            <>
              <fieldset className="trip-type-selector">
                <legend>{t("tripType", "Journey type")}</legend>
                <div className="trip-type-options">
                  <label className="trip-type-option"><input type="radio" value="one_way" {...register("tripType")} /><span>{t("oneWay", "One way")}</span></label>
                  <label className="trip-type-option"><input type="radio" value="round_trip" {...register("tripType")} /><span>{t("roundTrip", "Round trip")}</span></label>
                  <label className="trip-type-option"><input type="radio" value="daily_chauffeur" {...register("tripType")} /><span>{t("dailyChauffeur", "Daily vehicle + chauffeur")}</span></label>
                </div>
                <p className="trip-type-hint">{isDailyChauffeur ? t("dailyChauffeurHint", "Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.") : t("roundTripHint", "For a round trip, the return follows the same route in reverse.")}</p>
              </fieldset>

              <div className={`booking-row booking-row-journey${isDailyChauffeur ? " daily" : ""}`}>
                <label className={fieldClass(errors.pickup)}>
                  <span>{t("pickup", "Pick-up")}</span>
                  <div className="field-control"><Icon name="plane" className="icon" /><select id="pickup" {...register("pickup")}><option value="airport">{t("airportOption", "Antalya Airport (AYT)")}</option><option value="hotel">{t("hotelOption", "Hotel")}</option><option value="private_address">{t("privateAddressOption", "Private address")}</option></select></div>
                  <FieldErrorMessage error={errors.pickup} />
                </label>
                {!isDailyChauffeur && (
                  <label className={fieldClass(errors.destination)}>
                    <span>{t("destination", "Destination")}</span>
                    <div className="field-control"><Icon name="pin" className="icon" /><select id="destination" {...register("destination")}><option value="">{t("selectDestination", "Select destination")}</option>{values.pickup !== "airport" && <option value="airport">{t("airportOption", "Antalya Airport (AYT)")}</option>}{publicRouteSlugs.map((slug) => <option value={slug} key={slug}>{routeCatalog[slug].names[language as keyof typeof routeCatalog[typeof slug]["names"]] ?? routeCatalog[slug].names.en}</option>)}<option value="private_address">{t("privateAddressOption", "Private address")}</option></select></div>
                    <FieldErrorMessage error={errors.destination} />
                  </label>
                )}
                <label className={fieldClass(errors.vehicle)}>
                  <span>{t("vehicle", "Vehicle")}</span>
                  <div className="field-control"><Icon name="car" className="icon" /><select id="vehicle-type" {...register("vehicle")}><option value="vito" disabled={!vitoFits}>Mercedes Vito</option><option value="sprinter">Mercedes Sprinter</option></select></div>
                  <FieldErrorMessage error={errors.vehicle} />
                </label>
                <label className={fieldClass(errors.guests)}>
                  <span>{t("guests", "Guests")}</span>
                  <div className="field-control"><Icon name="users" className="icon" /><select id="guests" {...register("guests")}>{Array.from({ length: 13 }, (_, index) => <option value={index + 1} key={index + 1}>{index + 1}</option>)}</select></div>
                  <FieldErrorMessage error={errors.guests} />
                </label>
              </div>
              {!vitoFits && <p id="capacity-note" className="capacity-note">{t("capacitySwitchedSprinter", "We selected the Sprinter for this passenger and luggage count.")}</p>}
            </>
          )}

          {/* ── Step 1 price summary + CTA (non-daily) ────────────── */}
          {!isDailyChauffeur && step === 1 && (
            <>
              {hasPrice && (
                <p className="step1-per-vehicle">
                  <Icon name="users" className="icon" />
                  <span className="step1-per-vehicle-text">{t("perVehicleLabel", "Per vehicle — not per person")}</span>
                  <span className="step1-per-vehicle-cap">{values.vehicle === "sprinter" ? t("upTo12Pax", "Up to 12 passengers") : t("upTo6Pax", "Up to 6 passengers")}</span>
                </p>
              )}
              <div className="booking-footer">
                <button
                  className="quote-submit"
                  type="button"
                  id="main-book-step1"
                  onClick={advanceToStep2}
                >
                  <span>{hasPrice ? t("reserveForPrice", `Reserve for €${quote.price}`) : t("continue", "Continue")}</span>
                  <Icon name="arrow-right" className="icon" />
                </button>
              </div>
            </>
          )}

          {/* ── Step 2: Travel details (non-daily) ────────────────── */}
          {!isDailyChauffeur && step === 2 && (
            <>
              <div className="booking-row booking-outbound-row">
                <label className={fieldClass(errors.travelDate)}>
                  <span>{t("arrivalDate", "Arrival date")}</span>
                  <div className="field-control"><Icon name="calendar" className="icon" /><input id="travel-date" type="date" min={minimumDate || undefined} {...register("travelDate")} /></div>
                  <FieldErrorMessage error={errors.travelDate} />
                </label>
                <label className={`${fieldClass(errors.arrivalTime)} time-booking-field`}>
                  <span>{t("arrivalFlightTime", "Flight arrival time")}</span>
                  <div className="field-control time-field-control" onClick={() => openTimePicker("flight-arrival-time")}><Icon name="clock" className="icon" /><span className="time-picker-value">{values.arrivalTime || t("chooseTime", "Choose time")}</span><input id="flight-arrival-time" type="time" {...register("arrivalTime")} /></div>
                  <FieldErrorMessage error={errors.arrivalTime} />
                </label>
                <label className={fieldClass(errors.flightNumber)}>
                  <span>{t("arrivalFlightNumber", "Arrival flight number")}</span>
                  <div className="field-control"><Icon name="plane" className="icon" /><input id="flight-number" maxLength={12} placeholder="TK1234" {...register("flightNumber")} /></div>
                  <FieldErrorMessage error={errors.flightNumber} />
                </label>
              </div>

              {values.tripType === "round_trip" && (
                <div className="booking-row booking-return-row" id="return-journey-row">
                  <label className={fieldClass(errors.returnDate)}>
                    <span>{t("returnDate", "Return date")}</span>
                    <div className="field-control"><Icon name="calendar" className="icon" /><input id="return-date" type="date" min={values.travelDate || minimumDate || undefined} {...register("returnDate")} /></div>
                    <FieldErrorMessage error={errors.returnDate} />
                  </label>
                  <label className={`${fieldClass(errors.returnPickupTime)} time-booking-field`}>
                    <span>{t("returnPickupTime", "Return pick-up time")}</span>
                    <div className="field-control time-field-control" onClick={() => openTimePicker("return-pickup-time")}><Icon name="clock" className="icon" /><span className="time-picker-value">{values.returnPickupTime || t("chooseTime", "Choose time")}</span><input id="return-pickup-time" type="time" {...register("returnPickupTime")} /></div>
                    <FieldErrorMessage error={errors.returnPickupTime} />
                  </label>
                  <label className={fieldClass(errors.returnFlightNumber)}>
                    <span>{t("returnFlightNumber", "Return flight number")}</span>
                    <div className="field-control"><Icon name="plane" className="icon" /><input id="return-flight-number" maxLength={12} placeholder="TK1235" {...register("returnFlightNumber")} /></div>
                    <FieldErrorMessage error={errors.returnFlightNumber} />
                  </label>
                </div>
              )}

              {values.pickup === "private_address" && (
                <div className="booking-row booking-address-row" id="pickup-address-row">
                  <label className={fieldClass(errors.pickupAddress)}>
                    <span>{t("pickupAddress", "Full pick-up address")}</span>
                    <div className="field-control"><Icon name="pin" className="icon" /><input id="pickup-address" maxLength={160} placeholder={t("pickupAddressPlaceholder", "Hotel name, street, building number and district")} {...register("pickupAddress")} /></div>
                    <FieldErrorMessage error={errors.pickupAddress} />
                  </label>
                </div>
              )}

              {values.destination === "private_address" && (
                <div className="booking-row booking-address-row" id="dropoff-address-row">
                  <label className={fieldClass(errors.dropoffAddress)}>
                    <span>{t("dropoffAddress", "Full drop-off address")}</span>
                    <div className="field-control"><Icon name="pin" className="icon" /><input id="dropoff-address" maxLength={160} placeholder={t("dropoffAddressPlaceholder", "Hotel name, street, building number and district")} {...register("dropoffAddress")} /></div>
                    <FieldErrorMessage error={errors.dropoffAddress} />
                  </label>
                </div>
              )}

              <div className="booking-row booking-options-row">
                <label className={fieldClass(errors.hotelName)}>
                  <span>{t("hotelNameLabel", "Hotel name")}</span>
                  <div className="field-control"><Icon name="pin" className="icon" /><input id="hotel-name" maxLength={120} placeholder={t("hotelNamePlaceholder", "Hotel or accommodation name")} {...register("hotelName")} /></div>
                  <FieldErrorMessage error={errors.hotelName} />
                </label>
                <label className={fieldClass(errors.luggage)}>
                  <span>{t("luggageLabel", "Large luggage")}</span>
                  <div className="field-control"><Icon name="luggage" className="icon" /><select id="luggage" {...register("luggage")}><option value="">{t("selectLuggage", "Select")}</option>{Array.from({ length: 13 }, (_, index) => <option value={index} key={index}>{index}</option>)}</select></div>
                  <FieldErrorMessage error={errors.luggage} />
                </label>
                <label className={fieldClass(errors.childSeats)}>
                  <span>{t("childSeatLabel", "Child seats")}</span>
                  <div className="field-control"><Icon name="baby" className="icon" /><select id="child-seats" {...register("childSeats")}>{Array.from({ length: 5 }, (_, index) => <option value={index} key={index}>{index === 0 ? t("childSeatNone", "No child seat") : t(["", "oneChildSeat", "twoChildSeats", "threeChildSeats", "fourChildSeats"][index], `${index} child seat${index > 1 ? "s" : ""}`)}</option>)}</select></div>
                  <FieldErrorMessage error={errors.childSeats} />
                </label>
              </div>
              {childSeatCount > 0 && (
                <div className="booking-row booking-options-row">
                  {Array.from({ length: childSeatCount }, (_, i) => (
                    <label key={i} className={fieldClass((errors.childAges as unknown as FieldError[] | undefined)?.[i])}>
                      <span>{`${t("childAgeLabel", "Child")} ${i + 1} ${t("childAgeLabelAge", "age")}`}</span>
                      <div className="field-control"><Icon name="baby" className="icon" /><select id={`child-age-${i}`} {...register(`childAges.${i}`)}><option value="">{t("childAgeSelect", "Select age")}</option>{Array.from({ length: 12 }, (_, age) => <option value={age} key={age}>{age === 0 ? t("childAgeBaby", "Under 1") : `${age}`}</option>)}</select></div>
                      <FieldErrorMessage error={(errors.childAges as unknown as FieldError[] | undefined)?.[i]} />
                    </label>
                  ))}
                </div>
              )}
              {!vitoFits && <p className="capacity-note">{t("capacitySwitchedSprinter", "We selected the Sprinter for this passenger and luggage count.")}</p>}

              <div className="booking-footer booking-footer-step">
                <button className="booking-back-btn" type="button" onClick={() => setStep(1)}>
                  <Icon name="arrow-left" className="icon" />
                  <span>{t("back", "Back")}</span>
                </button>
                <button className="quote-submit" type="button" id="main-book-step2" onClick={advanceToStep3}>
                  <span>{t("continue", "Continue")}</span>
                  <Icon name="arrow-right" className="icon" />
                </button>
              </div>
            </>
          )}

          {/* ── Daily chauffeur travel details ─────────────────────── */}
          {isDailyChauffeur && (
            <>
              <div className="booking-row booking-outbound-row daily-period-row">
                <label className={fieldClass(errors.travelDate)}><span>{t("serviceStartDate", "First service day")}</span><div className="field-control"><Icon name="calendar" className="icon" /><input id="travel-date" type="date" min={minimumDate || undefined} {...register("travelDate")} /></div><FieldErrorMessage error={errors.travelDate} /></label>
                <label className={fieldClass(errors.serviceEndDate)}><span>{t("serviceEndDate", "Last service day")}</span><div className="field-control"><Icon name="calendar" className="icon" /><input id="service-end-date" type="date" min={values.travelDate || minimumDate || undefined} {...register("serviceEndDate")} /></div><FieldErrorMessage error={errors.serviceEndDate} /></label>
                <label className={`${fieldClass(errors.pickupTime)} time-booking-field`}><span>{t("dailyPickupTime", "Service start time")}</span><div className="field-control time-field-control" onClick={() => openTimePicker("daily-pickup-time")}><Icon name="clock" className="icon" /><span className="time-picker-value">{values.pickupTime || t("chooseTime", "Choose time")}</span><input id="daily-pickup-time" type="time" {...register("pickupTime")} /></div><FieldErrorMessage error={errors.pickupTime} /></label>
              </div>
              <div className="booking-row booking-outbound-row">
                <label className={`${fieldClass(errors.arrivalTime)} time-booking-field`}><span>{t("arrivalFlightTimeOptional", "Arrival flight time (optional)")}</span><div className="field-control time-field-control" onClick={() => openTimePicker("flight-arrival-time")}><Icon name="clock" className="icon" /><span className="time-picker-value">{values.arrivalTime || t("chooseTime", "Choose time")}</span><input id="flight-arrival-time" type="time" {...register("arrivalTime")} /></div><FieldErrorMessage error={errors.arrivalTime} /></label>
                <label className={fieldClass(errors.flightNumber)}><span>{t("arrivalFlightNumberOptional", "Arrival flight number (optional)")}</span><div className="field-control"><Icon name="plane" className="icon" /><input id="flight-number" maxLength={12} placeholder="TK1234" {...register("flightNumber")} /></div><FieldErrorMessage error={errors.flightNumber} /></label>
                <div className="daily-price-summary"><small>{t("servicePrice", "Service price")}</small><strong>€{dailyRateEur} × {hireDays || 0} = €{quote.price}</strong><span>{t("fuelExcludedDetail", "Fuel is not included and is paid separately according to use.")}</span></div>
              </div>
              <div className="booking-row booking-return-row daily-departure-row">
                <label className={fieldClass(errors.departureFlightDate)}><span>{t("departureFlightDate", "Departure flight date (optional)")}</span><div className="field-control"><Icon name="calendar" className="icon" /><input id="departure-flight-date" type="date" min={values.travelDate || minimumDate || undefined} {...register("departureFlightDate")} /></div><FieldErrorMessage error={errors.departureFlightDate} /></label>
                <label className={`${fieldClass(errors.departureFlightTime)} time-booking-field`}><span>{t("departureFlightTime", "Departure flight time")}</span><div className="field-control time-field-control" onClick={() => openTimePicker("departure-flight-time")}><Icon name="clock" className="icon" /><span className="time-picker-value">{values.departureFlightTime || t("chooseTime", "Choose time")}</span><input id="departure-flight-time" type="time" {...register("departureFlightTime")} /></div><FieldErrorMessage error={errors.departureFlightTime} /></label>
                <label className={fieldClass(errors.departureFlightNumber)}><span>{t("departureFlightNumber", "Departure flight number")}</span><div className="field-control"><Icon name="plane" className="icon" /><input id="departure-flight-number" maxLength={12} placeholder="TK1235" {...register("departureFlightNumber")} /></div><FieldErrorMessage error={errors.departureFlightNumber} /></label>
              </div>
              <div className="booking-row booking-options-row">
                <label className={fieldClass(errors.luggage)}><span>{t("luggageLabel", "Large luggage")}</span><div className="field-control"><Icon name="luggage" className="icon" /><select id="luggage" {...register("luggage")}><option value="">{t("selectLuggage", "Select")}</option>{Array.from({ length: 13 }, (_, index) => <option value={index} key={index}>{index}</option>)}</select></div><FieldErrorMessage error={errors.luggage} /></label>
                <label className={fieldClass(errors.hotelName)}><span>{t("hotelNameLabel", "Hotel name")}</span><div className="field-control"><Icon name="pin" className="icon" /><input id="hotel-name" maxLength={120} placeholder={t("hotelNamePlaceholder", "Hotel or accommodation name")} {...register("hotelName")} /></div><FieldErrorMessage error={errors.hotelName} /></label>
                <label className={fieldClass(errors.childSeats)}><span>{t("childSeatLabel", "Child seats")}</span><div className="field-control"><Icon name="baby" className="icon" /><select id="child-seats" {...register("childSeats")}>{Array.from({ length: 5 }, (_, index) => <option value={index} key={index}>{index === 0 ? t("childSeatNone", "No child seat") : t(["", "oneChildSeat", "twoChildSeats", "threeChildSeats", "fourChildSeats"][index], `${index} child seat${index > 1 ? "s" : ""}`)}</option>)}</select></div><FieldErrorMessage error={errors.childSeats} /></label>
              </div>
              {childSeatCount > 0 && (
                <div className="booking-row booking-options-row">
                  {Array.from({ length: childSeatCount }, (_, i) => (
                    <label key={i} className={fieldClass((errors.childAges as unknown as FieldError[] | undefined)?.[i])}>
                      <span>{`${t("childAgeLabel", "Child")} ${i + 1} ${t("childAgeLabelAge", "age")}`}</span>
                      <div className="field-control"><Icon name="baby" className="icon" /><select id={`child-age-${i}`} {...register(`childAges.${i}`)}><option value="">{t("childAgeSelect", "Select age")}</option>{Array.from({ length: 12 }, (_, age) => <option value={age} key={age}>{age === 0 ? t("childAgeBaby", "Under 1") : `${age}`}</option>)}</select></div>
                      <FieldErrorMessage error={(errors.childAges as unknown as FieldError[] | undefined)?.[i]} />
                    </label>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── Step 3: Contact + payment (non-daily) ─────────────── */}
          {(isDailyChauffeur || step === 3) && (
            <>
              <div className="booking-row booking-row-personal">
                <label className={fieldClass(errors.customerName)}><span>{t("fullName", "Full name")}</span><div className="field-control"><input id="customer-name" autoComplete="name" maxLength={80} placeholder="John Smith" {...register("customerName")} /></div><FieldErrorMessage error={errors.customerName} /></label>
                <label className={fieldClass(errors.customerPhone)}><span>{t("phoneLabel", "Phone / WhatsApp")}</span><div className="field-control"><input id="customer-phone" type="tel" autoComplete="tel" maxLength={25} placeholder="+44 7400 123456" {...register("customerPhone")} /></div><FieldErrorMessage error={errors.customerPhone} /></label>
                <label className={fieldClass(errors.customerEmail)}><span>{t("emailLabel", "Email")}</span><div className="field-control"><input id="customer-email" type="email" autoComplete="email" maxLength={120} placeholder="john@example.com" {...register("customerEmail")} /></div><FieldErrorMessage error={errors.customerEmail} /></label>
              </div>

              <fieldset className="payment-method-panel">
                <legend>{t("paymentMethod", "Choose payment method")}</legend>
                <div className="payment-method-options">
                  <label className="payment-method-option payment-method-option-recommended">
                    <input type="radio" name="paymentMethod" value="cash" checked readOnly />
                    <span className="payment-method-radio" aria-hidden="true" />
                    <span className="payment-method-copy">
                      <span className="payment-method-heading"><strong>{t("cashPayment", "Pay in the vehicle")}</strong><small>{t("recommended", "Recommended")}</small></span>
                      <span>{t("cashPaymentDescription", "No prepayment. Pay the confirmed total directly to your driver.")}</span>
                    </span>
                    <Icon name="cash" className="icon" />
                  </label>
                </div>
              </fieldset>


              <div className="booking-footer booking-footer-step">
                {!isDailyChauffeur && (
                  <button className="booking-back-btn" type="button" onClick={() => setStep(2)}>
                    <Icon name="arrow-right" className="icon icon-flip" />
                    <span>{t("back", "Back")}</span>
                  </button>
                )}
                <p className="booking-includes">{isDailyChauffeur ? t("dailyQuoteIncludes", "Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.") : t("quoteIncludes", "Includes meet & greet, flight tracking, parking, waiting time and bottled water.")}</p>
                <button className="quote-submit" type="submit" id="main-book-submit" disabled={submitting}>
                  <span>{submitting ? "…" : isDailyChauffeur ? t("reviewAndConfirm", "Review and confirm") : isPrivateAddressQuote ? t("requestQuote", "Request a price quote") : t("confirmCashBooking", "Confirm booking — pay in vehicle")}</span>
                  <Icon name="arrow-right" className="icon" />
                </button>
              </div>
              {submitError && <p className="payment-error" id="payment-error-message" role="alert">{submitError}</p>}
            </>
          )}

        </form>
      </div>

      {pendingDailyBooking && <div className="quote-modal open fuel-terms-modal" id="fuel-terms-modal" role="dialog" aria-modal="true" aria-labelledby="fuel-terms-title"><button className="modal-backdrop" aria-label={t("close", "Close")} onClick={() => setPendingDailyBooking(null)} /><div className="modal-card"><button className="modal-close" type="button" aria-label={t("close", "Close")} onClick={() => setPendingDailyBooking(null)}><Icon name="close" /></button><div className="fuel-terms-content"><span className="fuel-terms-icon" aria-hidden="true">⛽</span><h2 id="fuel-terms-title">{t("fuelTermsTitle", "Important information about fuel")}</h2><p>{t("fuelTermsBody", "The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.")}</p><label className="fuel-terms-check"><input type="checkbox" autoFocus checked={fuelAcknowledged} onChange={event => setFuelAcknowledged(event.target.checked)} /><span>{t("fuelTermsCheckbox", "I understand that fuel is excluded and will be paid separately based on use.")}</span></label><div className="fuel-terms-actions"><button className="fuel-terms-cancel" type="button" onClick={() => setPendingDailyBooking(null)}>{t("cancel", "Cancel")}</button><button className="button button-gold" type="button" disabled={!fuelAcknowledged || submitting} onClick={confirmDailyBooking}>{submitting ? "…" : t("understandAndConfirm", "I understand and confirm")}</button></div></div></div></div>}
      {confirmation && <div className="quote-modal open" id="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title"><button className="modal-backdrop" aria-label="Close" onClick={() => setConfirmation(null)} /><div className="modal-card"><button className="modal-close" type="button" aria-label="Close" onClick={() => setConfirmation(null)}><Icon name="close" /></button><div className="booking-confirmed"><div className="confirmed-check confirmed-pending" aria-hidden="true"><Icon name="clock" /></div><h2 id="quote-modal-title">{t("requestReceived", "Request Received")}</h2><p className="confirmed-ref"><span>{t("referenceLabel", "Reference")}</span>&nbsp;<strong id="confirmed-ref">{confirmation.ref}</strong></p><p className="confirmed-msg">{t("approvalPending", "We received your request and will review your details. You'll receive an approval message via WhatsApp shortly.")}</p><a className="button button-gold" href={confirmation.whatsapp} target="_blank" rel="noreferrer" id="confirmed-whatsapp"><span>{t("whatsappUs", "WhatsApp us")}</span><Icon name="arrow-up-right" className="icon" /></a></div></div></div>}
    </section>
  );
}
