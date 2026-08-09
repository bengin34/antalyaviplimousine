import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { publicRouteSlugs, routeCatalog } from "../../../src/routes.js";
import { useLanguage } from "../i18n";
import {
  buildPublicBookingPayload,
  createPublicBookingSchema,
  quoteFor,
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
  const routeName = routeCatalog[values.destination as keyof typeof routeCatalog]?.names.en ?? values.destination;
  const lines = [
    "🚗 *Antalya VIP Tourism — New Booking*",
    `📋 Ref: ${bookingRef}`,
    `👤 Name: ${values.customerName}`,
    `📞 Phone: ${values.customerPhone}`,
    `✉️ Email: ${values.customerEmail}`,
    `↔️ Journey: ${values.tripType === "round_trip" ? "Round trip" : "One way"}`,
    `📅 Date: ${values.travelDate}`,
    `📍 Pickup: ${values.pickup === "private_address" ? values.pickupAddress : values.pickup}`,
    `🏁 Dropoff: ${values.destination === "private_address" ? values.dropoffAddress : routeName}`,
    `🚘 Vehicle: ${values.vehicle === "sprinter" ? "Mercedes Sprinter" : "Mercedes Vito"}`,
    `👥 Guests: ${values.guests}`,
  ];
  if (values.hotelName) lines.push(`🏨 Hotel: ${values.hotelName}`);
  if (values.flightNumber) lines.push(`✈️ Flight: ${values.flightNumber}`);
  if (values.arrivalTime) lines.push(`🕐 Arrival: ${values.arrivalTime}`);
  if (values.tripType === "round_trip") {
    lines.push(`📅 Return: ${values.returnDate}`, `🕐 Return pickup: ${values.returnPickupTime}`);
    if (values.returnFlightNumber) lines.push(`✈️ Return flight: ${values.returnFlightNumber}`);
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
  const [minimumDate, setMinimumDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState<{ ref: string; whatsapp: string; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PublicBookingValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      tripType: "one_way", pickup: "airport", destination: "", vehicle: "vito", guests: "2",
      luggage: "0", childSeats: "0", travelDate: "", arrivalTime: "", flightNumber: "",
      returnDate: "", returnPickupTime: "", returnFlightNumber: "", pickupAddress: "",
      dropoffAddress: "", hotelName: "", customerName: "", customerPhone: "", customerEmail: "",
    },
  });

  const values = watch();
  const quote = quoteFor(values);
  const selectedRoute = routeCatalog[values.destination as keyof typeof routeCatalog];
  const selectedRouteName = selectedRoute?.names[language as keyof typeof selectedRoute.names] ?? selectedRoute?.names.en;
  const vitoFits = Number(values.guests) <= 7 && Number(values.luggage) <= 6 && Number(values.guests) + Number(values.luggage) <= 13;

  useEffect(() => {
    const today = todayISO();
    setMinimumDate(today);
    setValue("travelDate", today, { shouldValidate: false });
  }, [setValue]);

  useEffect(() => {
    if (!selection) return;
    setValue("destination", selection.route, { shouldValidate: true });
    setValue("vehicle", selection.vehicle, { shouldValidate: true });
    if (scrollOnSelect) {
      document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => document.querySelector<HTMLInputElement>("#customer-name")?.focus(), 500);
    }
  }, [scrollOnSelect, selection, setValue]);

  useEffect(() => {
    if (values.vehicle === "vito" && !vitoFits) setValue("vehicle", "sprinter", { shouldValidate: true });
  }, [setValue, values.vehicle, vitoFits]);

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
    document.body.classList.toggle("modal-open", Boolean(confirmation));
    return () => document.body.classList.remove("modal-open");
  }, [confirmation]);

  const submit = async (formValues: PublicBookingValues) => {
    setSubmitting(true);
    setSubmitError("");
    const currentQuote = quoteFor(formValues);
    window.gtag?.("event", "begin_checkout", { currency: "EUR", value: currentQuote.price, trip_type: formValues.tripType });
    try {
      const { createBooking } = await import("../../../src/lib/api.js");
      const booking = await createBooking(buildPublicBookingPayload(formValues, language));
      const message = formValues.destination === "airport"
        ? t("airportReturnPrice", "The price will be confirmed after we check the pick-up address.")
        : formValues.destination === "private_address"
          ? t("customDestinationPrice", "The price will be confirmed after we check the drop-off address.")
          : t("cashConfirmation", "Your booking is confirmed. Pay the fixed total directly to your driver in the vehicle.");
      setConfirmation({ ref: booking.booking_ref, whatsapp: whatsappConfirmation(formValues, booking.booking_ref, currentQuote.price), message });
      if (currentQuote.price > 0) {
        window.gtag?.("event", "purchase", { transaction_id: booking.booking_ref, currency: "EUR", value: currentQuote.price, payment_type: "cash" });
        window.gtag?.("event", "conversion", { send_to: "AW-18248114753/IW8CCL7H38AcEMHEsP1D", transaction_id: booking.booking_ref, value: currentQuote.price, currency: "EUR" });
      }
      reset({ ...formValues, destination: "", tripType: "one_way", travelDate: minimumDate || todayISO(), returnDate: "", returnPickupTime: "", returnFlightNumber: "", arrivalTime: "", flightNumber: "", customerName: "", customerPhone: "", customerEmail: "" });
    } catch (error) {
      console.error("Booking error", error);
      setSubmitError(t("bookingError", "Your booking could not be completed. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = (error?: FieldError) => `booking-field${error ? " has-error" : ""}`;

  return (
    <section className="booking-section" id="booking" aria-labelledby="booking-title">
      <div className="booking-shell">
        <div className="booking-heading"><div><span className="section-number">01</span><h2 id="booking-title">{t("bookTransfer", "Book your transfer")}</h2></div><div id="booking-price-display" className={`booking-price-display${values.destination ? " visible" : ""}`}>
          {selectedRoute && quote.price > 0 ? <><span className="price-display-route">AYT {values.tripType === "round_trip" ? "⇄" : "→"} {selectedRouteName}</span><span className="price-display-prices">{quote.originalPrice > quote.price && <span className="price-display-original">€{quote.originalPrice}</span>}<strong className="price-display-amount">€{quote.price}</strong></span><span className="price-display-note">{values.vehicle === "sprinter" ? "Mercedes Sprinter" : "Mercedes Vito"} · {t("perVehicle", "fixed · per vehicle")}</span></> : values.destination ? <span className="price-display-note">{values.destination === "airport" ? t("airportReturnPrice", "Price confirmed after address review.") : t("customDestinationPrice", "Price confirmed after address review.")}</span> : null}
        </div></div>
        <form className="booking-card" id="quote-form" noValidate onSubmit={handleSubmit(submit)}>
          <fieldset className="trip-type-selector"><legend>{t("tripType", "Journey type")}</legend><div className="trip-type-options"><label className="trip-type-option"><input type="radio" value="one_way" {...register("tripType")} /><span>{t("oneWay", "One way")}</span></label><label className="trip-type-option"><input type="radio" value="round_trip" {...register("tripType")} /><span>{t("roundTrip", "Round trip")}</span></label></div><p className="trip-type-hint">{t("roundTripHint", "For a round trip, the return follows the same route in reverse.")}</p></fieldset>
          <div className="booking-row booking-row-journey">
            <label className={fieldClass(errors.pickup)}><span>{t("pickup", "Pick-up")}</span><div className="field-control"><select id="pickup" {...register("pickup")}><option value="airport">{t("airportOption", "Antalya Airport (AYT)")}</option><option value="hotel">{t("hotelOption", "Hotel")}</option><option value="private_address">{t("privateAddressOption", "Private address")}</option></select></div><FieldErrorMessage error={errors.pickup} /></label>
            <label className={fieldClass(errors.destination)}><span>{t("destination", "Destination")}</span><div className="field-control"><select id="destination" {...register("destination")}><option value="">{t("selectDestination", "Select destination")}</option>{values.pickup !== "airport" && <option value="airport">{t("airportOption", "Antalya Airport (AYT)")}</option>}{publicRouteSlugs.map((slug) => <option value={slug} key={slug}>{routeCatalog[slug].names[language as keyof typeof routeCatalog[typeof slug]["names"]] ?? routeCatalog[slug].names.en}</option>)}<option value="private_address">{t("privateAddressOption", "Private address")}</option></select></div><FieldErrorMessage error={errors.destination} /></label>
            <label className={fieldClass(errors.vehicle)}><span>{t("vehicle", "Vehicle")}</span><div className="field-control"><select id="vehicle-type" {...register("vehicle")}><option value="vito" disabled={!vitoFits}>Mercedes Vito</option><option value="sprinter">Mercedes Sprinter</option></select></div><FieldErrorMessage error={errors.vehicle} /></label>
            <label className={fieldClass(errors.guests)}><span>{t("guests", "Guests")}</span><div className="field-control"><select id="guests" {...register("guests")}>{Array.from({ length: 13 }, (_, index) => <option value={index + 1} key={index + 1}>{index + 1}</option>)}</select></div><FieldErrorMessage error={errors.guests} /></label>
          </div>
          {!vitoFits && <p id="capacity-note" className="capacity-note">{t("capacitySwitchedSprinter", "We selected the Sprinter for this passenger and luggage count.")}</p>}
          <div className="booking-row booking-outbound-row">
            <label className={fieldClass(errors.travelDate)}><span>{t("arrivalDate", "Arrival date")}</span><div className="field-control"><input id="travel-date" type="date" min={minimumDate || undefined} {...register("travelDate")} /></div><FieldErrorMessage error={errors.travelDate} /></label>
            <label className={fieldClass(errors.arrivalTime)}><span>{t("arrivalFlightTime", "Flight arrival time")}</span><div className="field-control"><input id="flight-arrival-time" type="time" {...register("arrivalTime")} /></div><FieldErrorMessage error={errors.arrivalTime} /></label>
            <label className={fieldClass(errors.flightNumber)}><span>{t("arrivalFlightNumber", "Arrival flight number")}</span><div className="field-control"><input id="flight-number" maxLength={12} placeholder="TK1234" {...register("flightNumber")} /></div><FieldErrorMessage error={errors.flightNumber} /></label>
          </div>
          {values.tripType === "round_trip" && <div className="booking-row booking-return-row" id="return-journey-row">
            <label className={fieldClass(errors.returnDate)}><span>{t("returnDate", "Return date")}</span><div className="field-control"><input id="return-date" type="date" min={values.travelDate || minimumDate || undefined} {...register("returnDate")} /></div><FieldErrorMessage error={errors.returnDate} /></label>
            <label className={fieldClass(errors.returnPickupTime)}><span>{t("returnPickupTime", "Return pick-up time")}</span><div className="field-control"><input id="return-pickup-time" type="time" {...register("returnPickupTime")} /></div><FieldErrorMessage error={errors.returnPickupTime} /></label>
            <label className={fieldClass(errors.returnFlightNumber)}><span>{t("returnFlightNumber", "Return flight number")}</span><div className="field-control"><input id="return-flight-number" maxLength={12} placeholder="TK1235" {...register("returnFlightNumber")} /></div><FieldErrorMessage error={errors.returnFlightNumber} /></label>
          </div>}
          {values.pickup === "private_address" && <div className="booking-row booking-address-row" id="pickup-address-row"><label className={fieldClass(errors.pickupAddress)}><span>{t("pickupAddress", "Full pick-up address")}</span><div className="field-control"><input id="pickup-address" maxLength={160} placeholder={t("pickupAddressPlaceholder", "Hotel name, street, building number and district")} {...register("pickupAddress")} /></div><FieldErrorMessage error={errors.pickupAddress} /></label></div>}
          {values.destination === "private_address" && <div className="booking-row booking-address-row" id="dropoff-address-row"><label className={fieldClass(errors.dropoffAddress)}><span>{t("dropoffAddress", "Full drop-off address")}</span><div className="field-control"><input id="dropoff-address" maxLength={160} placeholder={t("dropoffAddressPlaceholder", "Hotel name, street, building number and district")} {...register("dropoffAddress")} /></div><FieldErrorMessage error={errors.dropoffAddress} /></label></div>}
          <div className="booking-row booking-options-row">
            <label className={fieldClass(errors.luggage)}><span>{t("luggageLabel", "Large luggage")}</span><div className="field-control"><select id="luggage" {...register("luggage")}>{Array.from({ length: 13 }, (_, index) => <option value={index} key={index}>{index}</option>)}</select></div><FieldErrorMessage error={errors.luggage} /></label>
            <label className={fieldClass(errors.hotelName)}><span>{t("hotelNameLabel", "Hotel name")}</span><div className="field-control"><input id="hotel-name" maxLength={120} placeholder={t("hotelNamePlaceholder", "Hotel or accommodation name")} {...register("hotelName")} /></div><FieldErrorMessage error={errors.hotelName} /></label>
            <label className={fieldClass(errors.childSeats)}><span>{t("childSeatLabel", "Child seats")}</span><div className="field-control"><select id="child-seats" {...register("childSeats")}>{Array.from({ length: 5 }, (_, index) => <option value={index} key={index}>{index === 0 ? t("childSeatNone", "No child seat") : `${index}`}</option>)}</select></div><FieldErrorMessage error={errors.childSeats} /></label>
          </div>
          <div className="booking-row booking-row-personal">
            <label className={fieldClass(errors.customerName)}><span>{t("fullName", "Full name")}</span><div className="field-control"><input id="customer-name" autoComplete="name" maxLength={80} placeholder="John Smith" {...register("customerName")} /></div><FieldErrorMessage error={errors.customerName} /></label>
            <label className={fieldClass(errors.customerPhone)}><span>{t("phoneLabel", "Phone / WhatsApp")}</span><div className="field-control"><input id="customer-phone" type="tel" autoComplete="tel" maxLength={25} placeholder="+44 7400 123456" {...register("customerPhone")} /></div><FieldErrorMessage error={errors.customerPhone} /></label>
            <label className={fieldClass(errors.customerEmail)}><span>{t("emailLabel", "Email")}</span><div className="field-control"><input id="customer-email" type="email" autoComplete="email" maxLength={120} placeholder="john@example.com" {...register("customerEmail")} /></div><FieldErrorMessage error={errors.customerEmail} /></label>
          </div>
          <fieldset className="payment-method-panel"><legend>{t("paymentMethod", "Choose payment method")}</legend><label className="payment-method-option payment-method-option-recommended"><input type="radio" name="paymentMethod" value="cash" checked readOnly /><span className="payment-method-radio" aria-hidden="true" /><span className="payment-method-copy"><span className="payment-method-heading"><strong>{t("cashPayment", "Pay in the vehicle")}</strong><small>{t("recommended", "Recommended")}</small></span><span>{t("cashPaymentDescription", "No prepayment. Pay the confirmed total directly to your driver.")}</span></span></label></fieldset>
          <div className="booking-footer"><p className="booking-includes">{t("quoteIncludes", "Includes meet & greet, flight tracking, parking, waiting time and bottled water.")}</p><button className="quote-submit" type="submit" id="main-book-submit" disabled={submitting}><span>{submitting ? "…" : t("confirmCashBooking", "Confirm booking — pay in vehicle")}</span><span aria-hidden="true">→</span></button></div>
          {submitError && <p className="payment-error" id="payment-error-message" role="alert">{submitError}</p>}
        </form>
      </div>
      {confirmation && <div className="quote-modal open" id="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title"><button className="modal-backdrop" aria-label="Close" onClick={() => setConfirmation(null)} /><div className="modal-card"><button className="modal-close" type="button" aria-label="Close" onClick={() => setConfirmation(null)}>×</button><div className="booking-confirmed"><div className="confirmed-check" aria-hidden="true">✓</div><h2 id="quote-modal-title">{t("bookingConfirmed", "Booking Confirmed")}</h2><p className="confirmed-ref"><span>{t("referenceLabel", "Reference")}</span>&nbsp;<strong id="confirmed-ref">{confirmation.ref}</strong></p><p className="confirmed-msg">{confirmation.message}</p><a className="button button-gold" href={confirmation.whatsapp} target="_blank" rel="noreferrer" id="confirmed-whatsapp"><span>{t("whatsappUs", "WhatsApp us")}</span><span aria-hidden="true">↗</span></a></div></div></div>}
    </section>
  );
}
