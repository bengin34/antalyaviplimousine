import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm, type FieldError } from "react-hook-form";
import { routeCatalog } from "../../../src/routes.js";
import { turkeyToday } from "../../../supabase/functions/_shared/land-of-legends-rules.js";
import { HotelCombobox } from "./HotelCombobox";
import { Icon } from "./Icon";
import { UltraLuxPicker } from "./UltraLuxPicker";
import { LazyPhoneInput, preloadPhoneInput } from "./LazyPhoneInput";
import { loadedHotelData, preloadHotelData, type IndexedHotel } from "../lib/hotel-data";
import { ultraLuxOf, VITO_MAX_GUESTS } from "../lib/booking";
import {
  buildCop31Payload,
  cop31DailyRate,
  cop31Quote,
  createCop31Schema,
  COP31_FIRST_DAY,
  COP31_LAST_DAY,
  COP31_SPRINTER_MAX_GUESTS,
  type Cop31FormVehicle,
  type Cop31Values,
  type Cop31Vehicle,
} from "../lib/cop31";
import { cop31Copy, type Cop31Language } from "../lib/cop31-copy";
import { track } from "../lib/track";

const WHATSAPP_NUMBER = "905302655790";

const errorId = (name: string) => `cop-error-${name}`;
const fieldStatus = (name: string, error?: FieldError) =>
  error ? { "aria-invalid": true as const, "aria-describedby": errorId(name) } : {};
const fieldClass = (error?: FieldError) => `booking-field${error ? " has-error" : ""}`;

function ErrorText({ name, error }: { name: string; error?: FieldError }) {
  return error ? <span className="field-error-message" id={errorId(name)}>{error.message}</span> : null;
}

type Confirmation = { ref: string; price: number; days: number; whatsapp: string; values: Cop31Values };

/**
 * The COP31 booking form: a daily chauffeur hire at the summit package rate.
 * `vehicle` lets the page's vehicle cards preselect a vehicle.
 */
export function Cop31Form({ language, vehicle: requestedVehicle }: { language: Cop31Language; vehicle?: Cop31Vehicle }) {
  const copy = cop31Copy[language];
  const schema = useMemo(() => createCop31Schema(copy.errors), [copy]);
  const [hotelData, setHotelData] = useState(loadedHotelData);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [firstBookable, setFirstBookable] = useState(COP31_FIRST_DAY);
  const formRef = useRef<HTMLFormElement>(null);
  const confirmationHeadingRef = useRef<HTMLHeadingElement>(null);
  const startedRef = useRef(false);

  const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<Cop31Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      vehicle: "vito", startDate: "2026-11-09", endDate: "2026-11-13", startTime: "08:00",
      hotelName: "", guests: "2", customerName: "", customerPhone: "", customerEmail: "", notes: "", fuelAccepted: false,
    },
  });
  const values = watch();

  useEffect(() => {
    void preloadPhoneInput();
    // Turkey's calendar decides: past summit days can no longer be booked.
    const today = turkeyToday();
    if (today > COP31_FIRST_DAY) {
      setFirstBookable(today);
      setValue("startDate", today < "2026-11-09" ? "2026-11-09" : today);
      setValue("endDate", today < "2026-11-13" ? "2026-11-13" : today);
    }
  }, [setValue]);

  useEffect(() => {
    if (requestedVehicle) setValue("vehicle", requestedVehicle);
  }, [requestedVehicle, setValue]);

  // A party too big for the Vito moves to the Sprinter.
  const guests = Number(values.guests) || 0;
  useEffect(() => {
    if (guests > VITO_MAX_GUESTS && values.vehicle === "vito") setValue("vehicle", "sprinter");
  }, [guests, values.vehicle, setValue]);

  const quote = cop31Quote(values.vehicle, values.startDate, values.endDate);
  const rate = copy.price(cop31DailyRate(values.vehicle));
  const lux = ultraLuxOf(values.vehicle);
  const vehicleName = (vehicle: Cop31FormVehicle) =>
    ultraLuxOf(vehicle)?.name ?? (vehicle === "sprinter" ? copy.sprinter : copy.vito);

  useEffect(() => {
    if (!confirmation) return;
    confirmationHeadingRef.current?.scrollIntoView?.({ behavior: "smooth", block: "center" });
    confirmationHeadingRef.current?.focus({ preventScroll: true });
  }, [confirmation]);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track("booking_started", { route: "cop31" });
  };

  const regionLabel = (region: string) => {
    const route = routeCatalog[region as keyof typeof routeCatalog];
    return route ? route.names[language as keyof typeof route.names] ?? route.names.en : region;
  };

  const submit = async (formValues: Cop31Values) => {
    setSubmitting(true);
    setSubmitError("");
    const { days, price } = cop31Quote(formValues.vehicle, formValues.startDate, formValues.endDate);
    track("begin_checkout", { route: "cop31", vehicle: formValues.vehicle, price });
    try {
      const { createBooking } = await import("../../../src/lib/api.js");
      const booking = await createBooking(buildCop31Payload(formValues, language));
      const confirmedPrice = Number(booking.price_eur) || price;
      const lines = [
        "🌍 *COP31 summit chauffeur*",
        `📋 Ref: ${booking.booking_ref}`,
        `🏨 Hotel: ${formValues.hotelName}`,
        `📅 ${formValues.startDate} → ${formValues.endDate} (${days})`,
        `🕐 Daily start: ${formValues.startTime}`,
        `👥 ${formValues.guests} · ${ultraLuxOf(formValues.vehicle)?.name ?? (formValues.vehicle === "sprinter" ? "Mercedes Sprinter" : "Mercedes Vito")}`,
        `💶 €${confirmedPrice} (fuel ${ultraLuxOf(formValues.vehicle) ? "excluded" : "included"})`,
      ];
      setConfirmation({
        ref: booking.booking_ref,
        price: confirmedPrice,
        days,
        whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`,
        values: formValues,
      });
      track("booking_submitted", { route: "cop31", vehicle: formValues.vehicle, price: confirmedPrice });
      window.gtag?.("event", "purchase", { transaction_id: booking.booking_ref, currency: "EUR", value: confirmedPrice, payment_type: "cash", item_category: "cop31" });
      window.gtag?.("event", "conversion", { send_to: "AW-18248114753/IW8CCL7H38AcEMHEsP1D", transaction_id: booking.booking_ref, value: confirmedPrice, currency: "EUR" });
    } catch (error) {
      console.error("COP31 booking error", error);
      setSubmitError(copy.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  const focusFirstError = () => {
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
  };

  const askLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("COP31 summit chauffeur — question")}`;

  if (confirmation) {
    const booked = confirmation.values;
    return (
      <div className="cop-confirmation" role="status">
        <h3 ref={confirmationHeadingRef} tabIndex={-1}>{copy.confirmedTitle}</h3>
        <p>{copy.confirmedBody}</p>
        <p className="cop-reference">{copy.reference}: <strong>{confirmation.ref}</strong></p>
        <dl className="cop-summary-list">
          <div><dt>{copy.hotelLabel}</dt><dd>{booked.hotelName}</dd></div>
          <div><dt>{copy.periodLabel}</dt><dd>{booked.startDate} → {booked.endDate} · {copy.totalDays(confirmation.days, copy.price(cop31DailyRate(booked.vehicle)))}</dd></div>
          <div><dt>{copy.timeLabel}</dt><dd>{booked.startTime}</dd></div>
          <div><dt>{copy.vehicleLabel}</dt><dd>{vehicleName(booked.vehicle)} · {booked.guests}</dd></div>
          <div><dt>{copy.totalLabel}</dt><dd>{copy.from(copy.price(confirmation.price))}</dd></div>
        </dl>
        <div className="cop-confirmation-actions">
          <a className="cop-btn cop-btn-gold" href={confirmation.whatsapp} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_clicked", { route: "cop31" })}>
            <Icon name="whatsapp" className="icon" /><span>{copy.whatsappCta}</span>
          </a>
          <button type="button" className="cop-btn cop-btn-line" onClick={() => { setConfirmation(null); reset({ ...values, fuelAccepted: false, hotelName: "", customerName: "", customerPhone: "", customerEmail: "", notes: "" }); }}>{copy.newBooking}</button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} className="cop-form" noValidate onSubmit={handleSubmit(submit, focusFirstError)} onFocus={markStarted}>
      <fieldset className="cop-vehicles">
        <legend>{copy.vehicleLabel}</legend>
        {(["vito", "sprinter"] as const).map((option) => (
          <label key={option} className={`cop-vehicle${values.vehicle === option ? " is-selected" : ""}`}>
            <input type="radio" value={option} disabled={option === "vito" && guests > VITO_MAX_GUESTS} {...register("vehicle")} />
            <strong>{option === "sprinter" ? copy.sprinter : copy.vito}</strong>
            <span>{copy.from(copy.price(cop31DailyRate(option)))} <small>{copy.perDay}</small></span>
          </label>
        ))}
      </fieldset>
      <UltraLuxPicker
        language={language}
        selected={values.vehicle}
        formatPrice={(eur) => copy.from(copy.price(eur))}
        onSelect={(vehicle) => setValue("vehicle", vehicle, { shouldValidate: true })}
      />

      <div className="cop-grid">
        <label className={fieldClass(errors.startDate)}>
          <span>{copy.startLabel}</span>
          <div className="field-control"><Icon name="calendar" className="icon" /><input id="cop-start" type="date" min={firstBookable} max={COP31_LAST_DAY} {...register("startDate")} {...fieldStatus("startDate", errors.startDate)} /></div>
          <ErrorText name="startDate" error={errors.startDate} />
        </label>
        <label className={fieldClass(errors.endDate)}>
          <span>{copy.endLabel}</span>
          <div className="field-control"><Icon name="calendar" className="icon" /><input id="cop-end" type="date" min={values.startDate || firstBookable} max={COP31_LAST_DAY} {...register("endDate")} {...fieldStatus("endDate", errors.endDate)} /></div>
          <ErrorText name="endDate" error={errors.endDate} />
        </label>
        <label className={fieldClass(errors.startTime)}>
          <span>{copy.timeLabel}</span>
          <div className="field-control"><Icon name="clock" className="icon" /><input id="cop-time" type="time" step={900} {...register("startTime")} {...fieldStatus("startTime", errors.startTime)} /></div>
          <small className="cop-hint">{copy.timeHint}</small>
          <ErrorText name="startTime" error={errors.startTime} />
        </label>
        <label className={fieldClass(errors.guests)}>
          <span>{copy.guestsLabel}</span>
          <div className="field-control"><Icon name="users" className="icon" /><select id="cop-guests" {...register("guests")} {...fieldStatus("guests", errors.guests)}>{Array.from({ length: COP31_SPRINTER_MAX_GUESTS }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}</select></div>
          <small className="cop-hint" role="status">{guests > VITO_MAX_GUESTS ? copy.sprinterNote(guests) : ""}</small>
          <ErrorText name="guests" error={errors.guests} />
        </label>
      </div>

      <label className={`${fieldClass(errors.hotelName)} cop-wide`} htmlFor="cop-hotel">
        <span>{copy.hotelLabel}</span>
        <HotelCombobox
          id="cop-hotel"
          value={values.hotelName}
          onChange={(name) => setValue("hotelName", name, { shouldValidate: false })}
          onSelect={(hotel: IndexedHotel) => setValue("hotelName", hotel.name, { shouldValidate: true })}
          search={hotelData?.searchHotels ?? null}
          onEngage={() => { if (!hotelData) void preloadHotelData().then(setHotelData); }}
          placeholder={copy.hotelPlaceholder}
          regionLabel={regionLabel}
          notListedLabel={copy.hotelNotListed}
          noResultsLabel={copy.hotelNoMatch}
          describedBy={errors.hotelName ? errorId("hotelName") : undefined}
          invalid={Boolean(errors.hotelName)}
        />
        <ErrorText name="hotelName" error={errors.hotelName} />
      </label>

      <div className="cop-grid cop-grid-3">
        <label className={fieldClass(errors.customerName)}>
          <span>{copy.nameLabel}</span>
          <div className="field-control"><input id="cop-name" autoComplete="name" maxLength={80} {...register("customerName")} {...fieldStatus("customerName", errors.customerName)} /></div>
          <ErrorText name="customerName" error={errors.customerName} />
        </label>
        <label className={fieldClass(errors.customerPhone)}>
          <span>{copy.phoneLabel}</span>
          <div className="field-control phone-field-control"><Controller control={control} name="customerPhone" render={({ field }) => <LazyPhoneInput id="cop-phone" ref={field.ref} {...fieldStatus("customerPhone", errors.customerPhone)} international autoComplete="tel" value={field.value || undefined} onChange={(value) => field.onChange(value ?? "")} onBlur={field.onBlur} />} /></div>
          <ErrorText name="customerPhone" error={errors.customerPhone} />
        </label>
        <label className={fieldClass(errors.customerEmail)}>
          <span>{copy.emailLabel}</span>
          <div className="field-control"><input id="cop-email" type="email" autoComplete="email" maxLength={120} {...register("customerEmail")} {...fieldStatus("customerEmail", errors.customerEmail)} /></div>
          <ErrorText name="customerEmail" error={errors.customerEmail} />
        </label>
      </div>

      <label className="booking-field cop-wide">
        <span>{copy.notesLabel}</span>
        <div className="field-control"><input id="cop-notes" maxLength={300} placeholder={copy.notesPlaceholder} {...register("notes")} /></div>
      </label>

      {lux && (
        <label className="booking-field cop-wide cop-fuel">
          <span className="cop-fuel-row">
            <input type="checkbox" {...register("fuelAccepted")} {...fieldStatus("fuelAccepted", errors.fuelAccepted)} />
            {copy.luxFuelTerms}
          </span>
          <ErrorText name="fuelAccepted" error={errors.fuelAccepted} />
        </label>
      )}

      <div className="cop-total" aria-live="polite">
        <div>
          <small>{copy.totalLabel}</small>
          <strong>{quote.price > 0 ? copy.from(copy.price(quote.price)) : copy.price(0)}</strong>
          <span>{quote.days > 0 ? copy.totalDays(quote.days, rate) : ""}</span>
        </div>
        <ul>
          <li>{lux ? copy.luxIncludes : copy.totalIncludes}</li>
          <li>{copy.availabilityNote}</li>
          <li>{copy.payInCar}</li>
        </ul>
      </div>

      {submitError && <p className="field-error-message" role="alert">{submitError}</p>}
      <div className="cop-form-footer">
        <button className="cop-btn cop-btn-gold" type="submit" disabled={submitting}>
          <span>{submitting ? copy.submitting : copy.submit}</span>
          <Icon name="arrow-right" className="icon" />
        </button>
        <a className="cop-ask" href={askLink} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_clicked", { route: "cop31", source: "ask" })}>
          <Icon name="whatsapp" className="icon" />{copy.askWhatsapp}
        </a>
      </div>
    </form>
  );
}
