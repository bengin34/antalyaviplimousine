/**
 * react-phone-number-input (with its metadata, ~130 KB) loaded on demand.
 *
 * The phone field only appears on a later step of the booking forms, so the
 * library is fetched when the form gets close to it (`preloadPhoneInput`) or,
 * at the latest, when the field renders. Until then a disabled input with the
 * library's own class names - and therefore the same box - holds its place.
 */
import { lazy, Suspense, type RefAttributes } from "react";
import type PhoneInputClass from "react-phone-number-input";
import type { DefaultInputComponentProps, Props } from "react-phone-number-input";
// Static on purpose: the stylesheet is tiny and must be there for the
// placeholder below to have the same size as the real field.
import "react-phone-number-input/style.css";

export type { Country } from "react-phone-number-input";

let phoneInputModule: Promise<typeof import("react-phone-number-input")> | null = null;

/** Starts fetching the library; safe to call any number of times. */
export function preloadPhoneInput() {
  phoneInputModule ??= import("react-phone-number-input");
  return phoneInputModule;
}

const PhoneInput = lazy(() => preloadPhoneInput().then((module) => ({ default: module.default })));

type PhoneInputProps = Props<DefaultInputComponentProps> & RefAttributes<InstanceType<typeof PhoneInputClass>>;

function PhoneInputPlaceholder({ className, placeholder }: { className?: string; placeholder?: string }) {
  return (
    <div className={className ? `PhoneInput ${className}` : "PhoneInput"} aria-busy="true">
      <div className="PhoneInputCountry" aria-hidden="true">
        <div className="PhoneInputCountryIcon PhoneInputCountryIcon--border" />
        <div className="PhoneInputCountrySelectArrow" />
      </div>
      <input className="PhoneInputInput" type="tel" disabled placeholder={placeholder} />
    </div>
  );
}

export function LazyPhoneInput(props: PhoneInputProps) {
  const { className, placeholder } = props as { className?: string; placeholder?: string };
  return (
    <Suspense fallback={<PhoneInputPlaceholder className={className} placeholder={placeholder} />}>
      <PhoneInput {...props} />
    </Suspense>
  );
}
