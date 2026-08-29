import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withHydrateFallbackProps, useMatches, Meta, Links, ScrollRestoration, Scripts, useLoaderData } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { createContext, useState, useEffect, useCallback, useMemo, useContext, useId, useRef } from "react";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import ReactPlayer from "react-player";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";
const streamTimeout = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, routerContext, _loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  let shellRendered = false;
  let userAgent = request.headers.get("user-agent");
  const body = await renderToReadableStream(
    /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
    {
      signal: AbortSignal.timeout(streamTimeout + 1e3),
      onError(error) {
        responseStatusCode = 500;
        if (shellRendered) {
          console.error(error);
        }
      }
    }
  );
  shellRendered = true;
  if (userAgent && isbot(userAgent) || routerContext.isSpaMode) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function Icon({ name, className }) {
  return /* @__PURE__ */ jsx("svg", { className, "aria-hidden": "true", children: /* @__PURE__ */ jsx("use", { href: `#icon-${name}` }) });
}
function IconSprite() {
  return /* @__PURE__ */ jsxs("svg", { className: "svg-sprite", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("symbol", { id: "icon-arrow-right", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 6l6 6-6 6" }) }),
    /* @__PURE__ */ jsx("symbol", { id: "icon-arrow-up-right", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M7 17 17 7M7 7h10v10" }) }),
    /* @__PURE__ */ jsx("symbol", { id: "icon-plane", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M22 2 9.6 14.4M22 2l-7.8 20-4.6-7.6L2 9.8 22 2Z" }) }),
    /* @__PURE__ */ jsxs("symbol", { id: "icon-pin", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("path", { d: "M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" }),
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "10", r: "2.5" })
    ] }),
    /* @__PURE__ */ jsxs("symbol", { id: "icon-calendar", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }),
      /* @__PURE__ */ jsx("path", { d: "M16 3v4M8 3v4M3 10h18" })
    ] }),
    /* @__PURE__ */ jsx("symbol", { id: "icon-users", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" }) }),
    /* @__PURE__ */ jsxs("symbol", { id: "icon-clock", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "9" }),
      /* @__PURE__ */ jsx("path", { d: "M12 7v5l3 2" })
    ] }),
    /* @__PURE__ */ jsxs("symbol", { id: "icon-shield", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" }),
      /* @__PURE__ */ jsx("path", { d: "m9 12 2 2 4-4" })
    ] }),
    /* @__PURE__ */ jsx("symbol", { id: "icon-sparkle", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "m12 3 1.2 4.8L18 9l-4.8 1.2L12 15l-1.2-4.8L6 9l4.8-1.2L12 3ZM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" }) }),
    /* @__PURE__ */ jsxs("symbol", { id: "icon-globe", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "9" }),
      /* @__PURE__ */ jsx("path", { d: "M3 12h18M12 3c2.3 2.5 3.5 5.5 3.5 9S14.3 18.5 12 21c-2.3-2.5-3.5-5.5-3.5-9S9.7 5.5 12 3Z" })
    ] }),
    /* @__PURE__ */ jsxs("symbol", { id: "icon-luggage", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("rect", { x: "5", y: "7", width: "14", height: "14", rx: "2" }),
      /* @__PURE__ */ jsx("path", { d: "M9 7V4h6v3M9 11v6M15 11v6M8 21v1M16 21v1" })
    ] }),
    /* @__PURE__ */ jsx("symbol", { id: "icon-check", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "m5 12 4 4L19 6" }) }),
    /* @__PURE__ */ jsx("symbol", { id: "icon-user-check", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7.5 0 2 2 4-4" }) }),
    /* @__PURE__ */ jsxs("symbol", { id: "icon-headphones", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("path", { d: "M4 14v-2a8 8 0 0 1 16 0v2M18 19c0 1.1-.9 2-2 2h-1" }),
      /* @__PURE__ */ jsx("path", { d: "M4 14h2a2 2 0 0 1 2 2v3H6a2 2 0 0 1-2-2v-3ZM20 14h-2a2 2 0 0 0-2 2v3h2a2 2 0 0 0 2-2v-3Z" })
    ] }),
    /* @__PURE__ */ jsxs("symbol", { id: "icon-tag", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("path", { d: "m20 13-7 7L3 10V3h7l10 10Z" }),
      /* @__PURE__ */ jsx("circle", { cx: "7.5", cy: "7.5", r: "1" })
    ] }),
    /* @__PURE__ */ jsxs("symbol", { id: "icon-baby", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("path", { d: "M9 4a3 3 0 1 0 6 0M5 11a7 7 0 0 1 14 0v3a7 7 0 0 1-14 0v-3Z" }),
      /* @__PURE__ */ jsx("path", { d: "M9 14h.01M15 14h.01M10 17c1.3.8 2.7.8 4 0" })
    ] }),
    /* @__PURE__ */ jsx("symbol", { id: "icon-road", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M8 22 10 2M16 22 14 2M12 5v3M12 12v3M12 19v3" }) }),
    /* @__PURE__ */ jsxs("symbol", { id: "icon-car", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("path", { d: "M5 17h14l2-5-2-5H5l-2 5 2 5Z" }),
      /* @__PURE__ */ jsx("path", { d: "m5 7 2-4h10l2 4M5 17v3M19 17v3M7 12h.01M17 12h.01" })
    ] }),
    /* @__PURE__ */ jsxs("symbol", { id: "icon-check-circle", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "9" }),
      /* @__PURE__ */ jsx("path", { d: "m8 12 2.5 2.5L16 9" })
    ] }),
    /* @__PURE__ */ jsxs("symbol", { id: "icon-message", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("path", { d: "M20 11.5a8 8 0 0 1-11.8 7L3 20l1.5-5.1A8 8 0 1 1 20 11.5Z" }),
      /* @__PURE__ */ jsx("path", { d: "M8 8.5c.8 3 2.5 4.7 5.5 5.5" })
    ] }),
    /* @__PURE__ */ jsx("symbol", { id: "icon-whatsapp", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.435-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.895 6.994c-.003 5.45-4.436 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" }) }),
    /* @__PURE__ */ jsx("symbol", { id: "icon-phone", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" }) }),
    /* @__PURE__ */ jsxs("symbol", { id: "icon-mail", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
      /* @__PURE__ */ jsx("path", { d: "m3 7 9 6 9-6" })
    ] }),
    /* @__PURE__ */ jsxs("symbol", { id: "icon-cash", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("rect", { x: "3", y: "6", width: "18", height: "12", rx: "2" }),
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" }),
      /* @__PURE__ */ jsx("path", { d: "M7 9H6v1M17 15h1v-1" })
    ] }),
    /* @__PURE__ */ jsxs("symbol", { id: "icon-card", viewBox: "0 0 24 24", children: [
      /* @__PURE__ */ jsx("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
      /* @__PURE__ */ jsx("path", { d: "M3 10h18M7 15h3" })
    ] }),
    /* @__PURE__ */ jsx("symbol", { id: "icon-close", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "m6 6 12 12M18 6 6 18" }) }),
    /* @__PURE__ */ jsx("symbol", { id: "icon-arrow-left", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M19 12H5M11 6l-6 6 6 6" }) }),
    /* @__PURE__ */ jsx("symbol", { id: "icon-play", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("polygon", { points: "5,3 19,12 5,21" }) })
  ] });
}
const siteStyles = "/assets/styles-PIuTFWmp.css";
const reactPublicStyles = "/assets/react-public-H7NCDVB-.css";
const links$2 = () => [{
  rel: "stylesheet",
  href: siteStyles
}, {
  rel: "stylesheet",
  href: reactPublicStyles
}, {
  rel: "icon",
  href: "/assets/favicon.svg",
  type: "image/svg+xml"
}, {
  rel: "manifest",
  href: "/assets/favicons/site.webmanifest"
}];
function Layout({
  children
}) {
  const matches = useMatches();
  const routeData2 = [...matches].reverse().find((match) => {
    const data = match.loaderData;
    return Boolean(data?.language);
  })?.loaderData;
  const language = routeData2?.language ?? "en";
  return /* @__PURE__ */ jsxs("html", {
    lang: language,
    dir: ["ar", "ur"].includes(language) ? "rtl" : "ltr",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(IconSprite, {}), children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function Root() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const HydrateFallback = UNSAFE_withHydrateFallbackProps(function HydrateFallback2() {
  return /* @__PURE__ */ jsx("div", {
    className: "react-route-loading",
    children: "Loading…"
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HydrateFallback,
  Layout,
  default: root,
  links: links$2
}, Symbol.toStringTag, { value: "Module" }));
const resources$1 = /* @__PURE__ */ JSON.parse(`{"en":{"navFleet":"Fleet","navService":"Service","navFairPricing":"Fair Pricing","navRoutes":"Routes","navReviews":"Reviews","navContact":"Contact","bookNow":"Book now","alwaysAvailable":"Available 24 hours, every day","heroEyebrow":"Private chauffeur service · Antalya","heroTitle":"Premium Airport<br />Transfers in Antalya","heroSubtitle":"Private chauffeur-driven transfers from Antalya Airport to Belek, Side, Kemer and Alanya.","bookTransfer":"Book your transfer","instantQuote":"Get instant quote","googleRated":"Google rated","trustedGuests":"Trusted by 2,500+ guests","discover":"Discover","tbLicensed":"TÜRSAB Licensed","tbFlightTracking":"Flight Tracking","tbFixedPrice":"Fixed Pricing","tb247Concierge":"24/7 Concierge","tbChildSeats":"Child Seats Included","privateJourney":"Your private journey","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Pick-up","airportOption":"Antalya Airport (AYT)","hotelOption":"Hotel","privateAddressOption":"Private address","destination":"Destination","selectDestination":"Select destination","vehicle":"Vehicle","guests":"Guests","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Choose time","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Full pick-up address","dropoffAddress":"Full drop-off address","luggageLabel":"Large luggage","hotelNameLabel":"Hotel name","childSeatLabel":"Child seats","childSeatNone":"No child seat","oneChildSeat":"1 child seat","twoChildSeats":"2 child seats","threeChildSeats":"3 child seats","fourChildSeats":"4 child seats","fullName":"Full name","phoneLabel":"Phone / WhatsApp","emailLabel":"Email","paymentMethod":"Choose payment method","cashPayment":"Pay in the vehicle","recommended":"Recommended","cashPaymentDescription":"No prepayment. Pay your driver directly once you are satisfied with the service.","quoteIncludes":"Includes meet & greet, flight tracking, parking, waiting time and bottled water.","perVehicleNote":"Per vehicle — not per person · Up to 7 passengers","confirmCashBooking":"Confirm booking — pay in vehicle","flightTracking":"Real-time flight tracking","fixedPrice":"Fixed price guarantee","meetGreet":"Personal meet & greet","speakingDrivers":"English & German speaking","fromAirport":"From Antalya Airport","welcomeEyebrow":"Welcome to a better arrival","welcomeTitle":"Travel beautifully.<br />Arrive effortlessly.","welcomeBody":"From the moment your flight lands, every detail is considered. Your chauffeur waits inside arrivals, handles your luggage and guides you to a meticulously prepared private vehicle.","ourStandards":"Our service standards","concierge":"Concierge support","guestsWelcomed":"Guests welcomed","guestRating":"Average guest rating","privateTransfers":"Private transfers","fleetEyebrow":"The fleet","fleetTitle":"Your private space,<br />refined in every detail.","fleetIntro":"Travel in quiet comfort with generous space for your family, golf equipment and luggage.","signatureFleet":"Signature fleet","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Spacious VIP transport for larger groups, with generous room for passengers and luggage.","passengers":"passengers","suitcases":"suitcases","television":"In-vehicle television","coldDrinks":"Cold drinks","snacks":"Snacks","childSeats":"Child seat available","wifi":"Complimentary WiFi","nameSignGreeting":"Meet & greet with a personalised name sign","reserveVehicle":"Reserve this vehicle","insideVclass":"Inside the Sprinter","interiorTitle":"A private lounge between<br />the airport and your hotel.","serviceEyebrow":"The Antalya VIP standard","serviceTitle":"More than a transfer.<br />A considered welcome.","serviceIntro":"Hotel-level attention, experienced local chauffeurs and complete peace of mind from runway to resort.","trackingTitle":"Flight tracking","trackingBody":"We monitor your flight in real time and adjust your pick-up automatically, at no extra charge.","chauffeurTitle":"Professional chauffeurs","chauffeurBody":"Immaculately presented, discreet and selected for their local knowledge and service standards.","greetTitle":"Meet & greet","greetBody":"Your chauffeur will welcome you in arrivals with a personalised name sign and assist with luggage.","supportTitle":"24/7 concierge","supportBody":"A real person is always available by phone or WhatsApp before, during and after your journey.","priceTitle":"Fixed prices","priceBody":"The price confirmed is the price you pay. Waiting time, parking and flight delays are included.","familyTitle":"Family ready","familyBody":"Age-appropriate child seats, spacious cabins and patient assistance for a relaxed family arrival.","routesEyebrow":"Our most requested journeys","routesTitle":"From Antalya Airport<br />to the Turkish Riviera.","routesIntro":"All prices are per vehicle, never per passenger, with complimentary waiting time included.","golfFavourite":"Golf favourite","reviewsEyebrow":"Guest reviews","reviewsTitle":"Service remembered<br />long after arrival.","googleReviews":"Based on 387 verified Google reviews","trustedBy":"Trusted by guests of Antalya's leading resorts","pricingEyebrow":"Peace of mind","pricingTitle":"Customer-friendly pricing.<br />You pay what's fair.","pricingIntro":"We offer fixed prices for peace of mind, but we measure the actual distance. You always pay whichever is lower.","pricingFixedPrice":"Fixed price","fixedPriceExample":"Belek transfer: €{{PRICE:belek:vito}}","fixedPriceDesc":"Guaranteed total. Includes airport fees, parking, waiting time and taxes.","distancePrice":"Distance-based","distancePriceExample":"24 km online example: €25","distancePriceDesc":"Measured with GPS during your journey.","youPay":"You pay","youPayPrice":"€25","youPayDesc":"Whichever is lower. Driver confirms at the end.","pricingNote":"No surprises. No hidden charges. What you book is what you pay — or less.","faqEyebrow":"Frequently asked","faqTitle":"Before you travel.","faqIntro":"Everything you need to know about your private Antalya airport transfer.","askQuestion":"Ask us a question","faqOneQ":"What happens if my flight is delayed?","faqOneA":"We track every arrival in real time. Your pick-up time is adjusted automatically and your chauffeur will wait at no additional charge.","faqTwoQ":"Where will I meet my chauffeur?","faqTwoA":"After collecting your baggage, exit to the Meet & Greet Area and look for meeting point J / 777. Our team will be waiting with a personalised name sign.","faqThreeQ":"Are child seats available?","faqThreeA":"Yes. Infant, toddler and booster seats are available free of charge when requested during booking.","faqFourQ":"Can you carry golf bags and large luggage?","faqFourA":"Yes. Our Sprinter and Vito vehicles are ideal for golf groups. Tell us your luggage details and we will allocate the correct vehicle.","faqFiveQ":"Is the quoted price final?","faqFiveA":"Yes. All airport fees, parking, waiting time and taxes are included. There are no hidden charges.","contactEyebrow":"Your journey starts here","contactTitle":"Arrive in Antalya<br />exceptionally well.","contactBody":"Book online in less than two minutes or speak directly with our 24/7 concierge team.","whatsappUs":"WhatsApp us","replyMinutes":"Usually replies within minutes","callUs":"Call us 24/7","emailUs":"Email concierge","replyHour":"Replies within one hour","footerTagline":"Private chauffeur services across the Turkish Riviera.","explore":"Explore","information":"Information","licensed":"Licensed private transfer operator · TÜRSAB compliant","bookingConfirmed":"Booking Confirmed","referenceLabel":"Reference","weWillContact":"Your booking request was sent. We will contact you within 30 minutes.","chatWithUs":"Chat with us","pickupAddressPlaceholder":"Hotel name, street, building number and district","dropoffAddressPlaceholder":"Hotel name, street, building number and district","hotelNamePlaceholder":"Hotel or accommodation name","stepRoute":"Route","stepDetails":"Details","stepContact":"Contact","reserveForPrice":"Reserve","continue":"Continue","back":"Back","perVehicleNoteVito":"Per vehicle — not per person · Up to 6 passengers","perVehicleNoteSprinter":"Per vehicle — not per person · Up to 12 passengers","perVehicle":"fixed · per vehicle","noPrePayment":"No prepayment required","payAfterTransfer":"Pay your driver after the transfer","requestQuote":"Request a price quote","cashConfirmation":"Your booking is confirmed. Pay the fixed total directly to your driver in the vehicle.","bookingError":"Your booking could not be completed. Please try again.","formIncomplete":"Please complete the highlighted fields.","requiredField":"This field is required.","destinationRequired":"Please select a destination.","dateInvalid":"Please choose today or a future date.","emailInvalid":"Please enter a valid email address.","nameInvalid":"Please enter a valid full name.","phoneInvalid":"Please enter a valid number including the country code (for example +49).","flightInvalid":"Please enter a valid flight number.","pickupAddressRequired":"The pick-up address must be between 6 and 160 characters.","dropoffAddressRequired":"The drop-off address must be between 6 and 160 characters.","addressesMustDiffer":"Pick-up and drop-off addresses must be different.","customDestinationPrice":"The price will be confirmed after we check the drop-off address.","hotelNameRequired":"Please enter the hotel name.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use."},"de":{"navFleet":"Fahrzeuge","navService":"Service","navFairPricing":"Faire Preise","navRoutes":"Strecken","navReviews":"Bewertungen","navContact":"Kontakt","bookNow":"Jetzt buchen","alwaysAvailable":"24 Stunden, jeden Tag erreichbar","heroEyebrow":"Privater Chauffeurservice · Antalya","heroTitle":"Premium Flughafentransfers<br />in Antalya","heroSubtitle":"Private Transfers mit Chauffeur vom Flughafen Antalya nach Belek, Side, Kemer und Alanya.","bookTransfer":"Transfer buchen","instantQuote":"Sofortpreis erhalten","googleRated":"Google-Bewertung","trustedGuests":"Von über 2.500 Gästen gebucht","discover":"Entdecken","tbLicensed":"TÜRSAB-zertifiziert","tbFlightTracking":"Flugverfolgung","tbFixedPrice":"Festpreisgarantie","tb247Concierge":"24/7 Concierge","tbChildSeats":"Kindersitze inklusive","privateJourney":"Ihre private Reise","meetGreetNote":"Airport Meet &amp; Greet · Treffpunkt J / 777","tripType":"Fahrtart","oneWay":"Einfache Fahrt","roundTrip":"Hin- und Rückfahrt","roundTripHint":"Bei Hin- und Rückfahrt erfolgt die Rückfahrt auf derselben Strecke in umgekehrter Richtung.","pickup":"Abholung","airportOption":"Flughafen Antalya (AYT)","hotelOption":"Hotel","privateAddressOption":"Privatadresse","destination":"Zielort","selectDestination":"Ziel auswählen","vehicle":"Fahrzeug","guests":"Gäste","arrivalDate":"Ankunftsdatum","arrivalFlightTime":"Ankunftszeit des Fluges","chooseTime":"Uhrzeit wählen","arrivalFlightNumber":"Ankunftsflugnummer","returnDate":"Rückfahrtdatum","returnPickupTime":"Abholzeit der Rückfahrt","returnFlightNumber":"Rückflugnummer","pickupAddress":"Vollständige Abholadresse","dropoffAddress":"Vollständige Zieladresse","luggageLabel":"Großes Gepäck","hotelNameLabel":"Hotelname","childSeatLabel":"Kindersitze","childSeatNone":"Kein Kindersitz","oneChildSeat":"1 Kindersitz","twoChildSeats":"2 Kindersitze","threeChildSeats":"3 Kindersitze","fourChildSeats":"4 Kindersitze","fullName":"Vollständiger Name","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-Mail","paymentMethod":"Zahlungsart wählen","cashPayment":"Im Fahrzeug bezahlen","recommended":"Empfohlen","cashPaymentDescription":"Keine Vorauszahlung. Bezahlen Sie Ihren Fahrer direkt, wenn Sie mit dem Service zufrieden sind.","quoteIncludes":"Inklusive Meet & Greet, Flugverfolgung, Parken, Wartezeit und Mineralwasser.","perVehicleNote":"Pro Fahrzeug — nicht pro Person · Bis zu 7 Personen","confirmCashBooking":"Buchung bestätigen — im Fahrzeug zahlen","flightTracking":"Flugverfolgung in Echtzeit","fixedPrice":"Garantierter Festpreis","meetGreet":"Persönlicher Empfang","speakingDrivers":"Deutsch & Englisch sprechend","fromAirport":"Ab Flughafen Antalya","welcomeEyebrow":"Willkommen auf höchstem Niveau","welcomeTitle":"Stilvoll reisen.<br />Entspannt ankommen.","welcomeBody":"Nachdem Sie Ihr Gepäck abgeholt haben, gehen Sie bitte zum Meet & Greet Bereich J / 777. Unser Flughafen-Team findet Ihre Buchung, hilft bei Bedarf mit dem Gepäck und bringt Sie mit Ihrem Fahrer zusammen.","ourStandards":"Unsere Servicestandards","concierge":"Concierge-Service","guestsWelcomed":"Begrüßte Gäste","guestRating":"Durchschnittliche Bewertung","privateTransfers":"Private Transfers","fleetEyebrow":"Unsere Flotte","fleetTitle":"Ihr privater Raum,<br />vollendet bis ins Detail.","fleetIntro":"Reisen Sie komfortabel mit großzügigem Platz für Familie, Golfgepäck und Koffer.","signatureFleet":"Signature Flotte","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Großzügiger VIP-Transport für größere Gruppen mit viel Platz für Passagiere und Gepäck.","passengers":"Passagiere","suitcases":"Koffer","television":"Fernseher im Fahrzeug","coldDrinks":"Kalte Getränke","snacks":"Snacks","childSeats":"Kindersitze auf Wunsch","wifi":"Kostenloses WLAN","nameSignGreeting":"Empfang mit persönlichem Namensschild","reserveVehicle":"Fahrzeug reservieren","insideVclass":"Im Sprinter Interieur","interiorTitle":"Eine private Lounge zwischen<br />Flughafen und Hotel.","serviceEyebrow":"Der Antalya VIP Standard","serviceTitle":"Mehr als ein Transfer.<br />Ein besonderer Empfang.","serviceIntro":"Aufmerksamkeit auf Hotelniveau, erfahrene lokale Chauffeure und absolute Sicherheit vom Flughafen bis zum Resort.","trackingTitle":"Flugverfolgung","trackingBody":"Wir verfolgen Ihren Flug in Echtzeit und passen die Abholung automatisch und kostenlos an.","chauffeurTitle":"Professionelle Chauffeure","chauffeurBody":"Stets gepflegt, diskret und ausgewählt für Ortskenntnis und höchsten Servicestandard.","greetTitle":"Meet & Greet","greetBody":"Nachdem Sie Ihr Gepäck abgeholt haben, gehen Sie bitte zum Meet & Greet Bereich J / 777. Unser Flughafen-Team findet Ihre Buchung und bringt Sie mit Ihrem Fahrer zusammen.","supportTitle":"24/7 Concierge","supportBody":"Vor, während und nach Ihrer Reise ist immer ein persönlicher Ansprechpartner erreichbar.","priceTitle":"Festpreise","priceBody":"Der bestätigte Preis ist der Endpreis. Wartezeit, Parken und Flugverspätungen sind inklusive.","familyTitle":"Für Familien","familyBody":"Passende Kindersitze, großzügige Innenräume und geduldige Hilfe für eine entspannte Ankunft.","routesEyebrow":"Unsere beliebtesten Fahrten","routesTitle":"Vom Flughafen Antalya<br />an die Türkische Riviera.","routesIntro":"Alle Preise gelten pro Fahrzeug, nie pro Person. Kostenlose Wartezeit ist inklusive.","golfFavourite":"Golf-Favorit","reviewsEyebrow":"Gästebewertungen","reviewsTitle":"Service, der lange<br />in Erinnerung bleibt.","googleReviews":"Basierend auf 387 verifizierten Google-Bewertungen","trustedBy":"Gebucht von Gästen führender Resorts in Antalya","pricingEyebrow":"Sicher planen","pricingTitle":"Kundenfreundliche Preise.<br />Sie zahlen, was fair ist.","pricingIntro":"Wir bieten Festpreise für Planungssicherheit, messen aber die tatsächliche Strecke. Sie zahlen immer den niedrigeren Betrag.","pricingFixedPrice":"Festpreis","fixedPriceExample":"Transfer nach Belek: {{PRICE:belek:vito}} €","fixedPriceDesc":"Garantierter Gesamtpreis. Inklusive Flughafengebühren, Parken, Wartezeit und Steuern.","distancePrice":"Nach Strecke","distancePriceExample":"24 km Online-Beispiel: 25 €","distancePriceDesc":"Während Ihrer Fahrt per GPS gemessen.","youPay":"Sie zahlen","youPayPrice":"25 €","youPayDesc":"Der niedrigere Betrag gilt. Der Fahrer bestätigt ihn am Ende.","pricingNote":"Keine Überraschungen. Keine versteckten Gebühren. Was Sie buchen, zahlen Sie - oder weniger.","faqEyebrow":"Häufig gefragt","faqTitle":"Vor Ihrer Reise.","faqIntro":"Alles, was Sie über Ihren privaten Flughafentransfer in Antalya wissen müssen.","askQuestion":"Frage stellen","faqOneQ":"Was passiert bei einer Flugverspätung?","faqOneA":"Wir verfolgen jede Ankunft in Echtzeit. Ihre Abholzeit wird automatisch angepasst und Ihr Chauffeur wartet ohne Aufpreis.","faqTwoQ":"Wo treffe ich meinen Chauffeur?","faqTwoA":"Verlassen Sie die Gepäckausgabe und gehen Sie zum Meet & Greet Bereich. Suchen Sie den Treffpunkt J / 777 — unser Team wartet mit einem personalisierten Namensschild.","faqThreeQ":"Sind Kindersitze verfügbar?","faqThreeA":"Ja. Babyschalen, Kindersitze und Sitzerhöhungen sind bei Vorbestellung kostenlos verfügbar.","faqFourQ":"Können Golfbags und großes Gepäck transportiert werden?","faqFourA":"Ja. Sprinter und Vito sind ideal für Golfgruppen. Teilen Sie uns Ihr Gepäck mit und wir planen das passende Fahrzeug.","faqFiveQ":"Ist der angezeigte Preis endgültig?","faqFiveA":"Ja. Flughafengebühren, Parken, Wartezeit und Steuern sind inklusive. Es gibt keine versteckten Kosten.","contactEyebrow":"Ihre Reise beginnt hier","contactTitle":"Außergewöhnlich gut<br />in Antalya ankommen.","contactBody":"Buchen Sie in weniger als zwei Minuten online oder sprechen Sie direkt mit unserem 24/7 Concierge-Team.","whatsappUs":"WhatsApp","replyMinutes":"Antwort meist in wenigen Minuten","callUs":"24/7 anrufen","emailUs":"Concierge E-Mail","replyHour":"Antwort innerhalb einer Stunde","footerTagline":"Private Chauffeurservices an der gesamten Türkischen Riviera.","explore":"Entdecken","information":"Information","licensed":"Lizenzierter privater Transferanbieter · TÜRSAB-konform","bookingConfirmed":"Buchung bestätigt","referenceLabel":"Referenz","weWillContact":"Ihre Buchungsanfrage wurde gesendet. Wir melden uns innerhalb von 30 Minuten.","chatWithUs":"Mit uns chatten","pickupAddressPlaceholder":"Hotelname, Straße, Hausnummer und Stadtteil","dropoffAddressPlaceholder":"Hotelname, Straße, Hausnummer und Stadtteil","hotelNamePlaceholder":"Hotel- oder Unterkunftsname","stepRoute":"Route","stepDetails":"Details","stepContact":"Kontakt","reserveForPrice":"Reservieren","continue":"Weiter","back":"Zurück","perVehicleNoteVito":"Pro Fahrzeug — nicht pro Person · Bis zu 6 Personen","perVehicleNoteSprinter":"Pro Fahrzeug — nicht pro Person · Bis zu 12 Personen","perVehicle":"pro Fahrzeug · Festpreis","noPrePayment":"No prepayment required","payAfterTransfer":"Pay your driver after the transfer","requestQuote":"Preisangebot anfordern","cashConfirmation":"Ihre Buchung ist bestätigt. Zahlen Sie den Festpreis direkt beim Fahrer im Fahrzeug.","bookingError":"Ihre Buchung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.","formIncomplete":"Bitte füllen Sie die markierten Felder aus.","requiredField":"Dieses Feld ist erforderlich.","destinationRequired":"Bitte wählen Sie ein Ziel.","dateInvalid":"Bitte wählen Sie heute oder ein zukünftiges Datum.","emailInvalid":"Bitte geben Sie eine gültige E-Mail-Adresse ein.","nameInvalid":"Bitte geben Sie einen gültigen vollständigen Namen ein.","phoneInvalid":"Bitte geben Sie eine gültige Nummer mit Ländervorwahl ein (zum Beispiel +49).","flightInvalid":"Bitte geben Sie eine gültige Flugnummer ein.","pickupAddressRequired":"Die Abholadresse muss zwischen 6 und 160 Zeichen lang sein.","dropoffAddressRequired":"Die Zieladresse muss zwischen 6 und 160 Zeichen lang sein.","addressesMustDiffer":"Abhol- und Zieladresse müssen unterschiedlich sein.","customDestinationPrice":"Der Preis wird nach Prüfung der Zieladresse bestätigt.","hotelNameRequired":"Bitte geben Sie den Hotelnamen ein.","roundTripPriceNote":"Hin- und Rückfahrt · 2 Fahrten","returnDateRequired":"Bitte wählen Sie ein Rückfahrtdatum.","returnDateInvalid":"Bitte wählen Sie ein Rückfahrtdatum am oder nach dem Datum der Hinfahrt.","returnTimeRequired":"Bitte wählen Sie die Abholzeit für die Rückfahrt.","dailyChauffeur":"Fahrzeug + Chauffeur pro Tag","days":"Tage","dailyChauffeurHint":"Mieten Sie Fahrzeug und Chauffeur tageweise ohne Kilometer- oder Stundenlimit. Kraftstoff wird separat bezahlt.","serviceStartDate":"Erster Servicetag","serviceEndDate":"Letzter Servicetag","dailyPickupTime":"Startzeit des Services","dailyPickupTimeRequired":"Bitte wählen Sie die tägliche Startzeit.","serviceEndDateRequired":"Bitte wählen Sie den letzten Servicetag.","servicePeriodInvalid":"Bitte wählen Sie einen Zeitraum von 1 bis 30 Tagen.","arrivalFlightTimeOptional":"Ankunftszeit (optional)","arrivalFlightNumberOptional":"Ankunftsflugnummer (optional)","servicePrice":"Servicepreis","fuelExcludedShort":"Kraftstoff nicht inbegriffen","fuelExcludedDetail":"Kraftstoff ist nicht enthalten und wird je nach Verbrauch separat bezahlt.","departureFlightDate":"Abflugdatum (optional)","departureFlightTime":"Abflugzeit","departureFlightNumber":"Abflugnummer","departureFlightDateRequired":"Bitte wählen Sie das Abflugdatum.","departureFlightDateInvalid":"Das Abflugdatum darf nicht vor Servicebeginn liegen.","dailyQuoteIncludes":"Inklusive Fahrzeug und Chauffeur ohne Kilometer- oder Stundenlimit. Kraftstoff ist nicht enthalten.","reviewAndConfirm":"Prüfen und bestätigen","fuelTermsTitle":"Wichtige Information zum Kraftstoff","fuelTermsBody":"Die Tagesgebühr von 150 € beinhaltet Fahrzeug und Chauffeur. Kraftstoff ist nicht enthalten und wird nach tatsächlichem Verbrauch separat bezahlt.","fuelTermsCheckbox":"Ich verstehe, dass Kraftstoff nicht enthalten ist und nach Verbrauch separat bezahlt wird.","cancel":"Abbrechen","close":"Schließen","understandAndConfirm":"Verstanden und bestätigen","dailyCashConfirmation":"Ihre tägliche Chauffeurbuchung ist bestätigt. Kraftstoff ist nicht enthalten und wird nach Verbrauch separat bezahlt.","hotelSearchHint":"Geben Sie Ihren Hotelnamen ein und wählen Sie ihn aus der Liste – Zielregion und Preis tragen wir für Sie ein.","hotelNotListed":"Mein Hotel ist nicht in der Liste","hotelNoMatch":"Noch kein Treffer. Geben Sie den Namen ein und wählen Sie die Region selbst.","campaignBadge":"Online Spezial","campaignDiscount":"Sonderpreis","campaignScope":"auf alle Transferpreise","campaignApplied":"Online-Sonderpreis angewendet","onlineDiscountShort":"Online-Sonderpreis","discountPricesShown":"Online-Sonderpreise werden angezeigt","quoteTitle":"Wohin dürfen wir Sie bringen?","date":"Datum","airportReturnPrice":"Der Preis wird nach Prüfung des Hotels oder der Abholadresse bestätigt.","oneGuest":"1 Gast","twoGuests":"2 Gäste","threeGuests":"3 Gäste","fourGuests":"4 Gäste","fiveGuests":"5 Gäste","sixGuests":"6 Gäste","sevenGuests":"7 Gäste","viewQuote":"Preis anzeigen","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Eine komfortable Privatkabine für Familien und kleine Gruppen.","capacitySwitchedSprinter":"Passagiere und Gepäck übersteigen den Vito — auf Mercedes Sprinter umgestellt.","capacityNoVehicle":"So viele Passagiere und Gepäck übersteigen unsere Fahrzeuge. Bitte kontaktieren Sie uns per WhatsApp.","leatherSeats":"Premium-Ledersitze","water":"Gekühltes Mineralwasser","from":"Ab","reviewOne":"„Unser Fahrer wartete trotz 90 Minuten Flugverspätung. Das Fahrzeug war makellos, angenehm kühl und bereits mit beiden Kindersitzen ausgestattet. Genau der Empfang, den unsere Familie brauchte.“","reviewTwo":"„Vom ersten WhatsApp-Kontakt bis zur Ankunft in Belek absolut erstklassig. Pünktlich, diskret und sehr professionell. Auch unsere Golftaschen hatten bequem Platz.“","reviewThree":"„Das fühlte sich wie der Chauffeurservice eines Hotels an, nicht wie ein Flughafentaxi. Klare Kommunikation, ein makelloses Fahrzeug und ein aufrichtig höflicher Fahrer.“","quoteReady":"Ihr privater Transfer","journeyTime":"Fahrzeit","totalFixed":"Gesamtpreis","confirmWhatsapp":"Über WhatsApp bestätigen","bookNowCta":"Jetzt buchen","backToQuote":"Zurück","yourDetails":"Ihre Daten","flightNumber":"Flugnummer","flightArrivalTime":"Ankunftszeit","notesLabel":"Besondere Wünsche","confirmBooking":"Buchung bestätigen","paySecurely":"Weiter zur sicheren Zahlung","payLaterNote":"Sichere Online-Zahlung nach Bestätigung.","paymentTitle":"Sichere Zahlung","paymentError":"Zahlung fehlgeschlagen. Bitte erneut versuchen."},"tr":{"navFleet":"Araçlar","navService":"Hizmetler","navFairPricing":"Adil fiyat","navRoutes":"Rotalar","navReviews":"Yorumlar","navContact":"İletişim","bookNow":"Hemen rezervasyon","alwaysAvailable":"Her gün 24 saat hizmetinizdeyiz","heroEyebrow":"Özel şoför hizmeti · Antalya","heroTitle":"Antalya'da Premium<br />Havalimanı Transferi","heroSubtitle":"Antalya Havalimanı'ndan Belek, Side, Kemer ve Alanya'ya özel şoförlü transfer.","bookTransfer":"Transferinizi ayırtın","instantQuote":"Anında fiyat alın","googleRated":"Google puanı","trustedGuests":"2.500'den fazla misafirin tercihi","discover":"Keşfedin","tbLicensed":"TÜRSAB Lisanslı","tbFlightTracking":"Uçuş Takibi","tbFixedPrice":"Sabit Fiyat","tb247Concierge":"7/24 Concierge","tbChildSeats":"Çocuk Koltuğu Dahil","privateJourney":"Size özel yolculuk","meetGreetNote":"Havalimanı Karşılama · Buluşma noktası J / 777","tripType":"Yolculuk türü","oneWay":"Tek yön","roundTrip":"Gidiş–dönüş","roundTripHint":"Gidiş–dönüş rezervasyonunda dönüş, aynı rotanın ters yönünde gerçekleşir.","pickup":"Alış noktası","airportOption":"Antalya Havalimanı (AYT)","hotelOption":"Otel","privateAddressOption":"Özel adres","destination":"Varış noktası","selectDestination":"Varış noktası seçin","vehicle":"Araç","guests":"Misafir","arrivalDate":"Geliş tarihi","arrivalFlightTime":"Geliş uçuş saati","chooseTime":"Saat seçin","arrivalFlightNumber":"Geliş uçuş numarası","returnDate":"Dönüş tarihi","returnPickupTime":"Dönüş alış saati","returnFlightNumber":"Dönüş uçuş numarası","pickupAddress":"Tam alış adresi","dropoffAddress":"Tam varış adresi","luggageLabel":"Büyük bavul","hotelNameLabel":"Otel ismi","childSeatLabel":"Çocuk koltuğu","childSeatNone":"Çocuk koltuğu istemiyorum","oneChildSeat":"1 çocuk koltuğu","twoChildSeats":"2 çocuk koltuğu","threeChildSeats":"3 çocuk koltuğu","fourChildSeats":"4 çocuk koltuğu","fullName":"Ad Soyad","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-posta","paymentMethod":"Ödeme yöntemini seçin","cashPayment":"Araçta öde","recommended":"Önerilen","cashPaymentDescription":"Ön ödeme yok. Hizmetten memnun kaldığınızda ödemenizi doğrudan şoförünüze yapın.","quoteIncludes":"Karşılama, uçuş takibi, otopark, bekleme süresi ve şişe su dahildir.","perVehicleNote":"Araç başına — kişi başına değil · 7 yolcuya kadar","confirmCashBooking":"Rezervasyonu onayla — araçta öde","flightTracking":"Gerçek zamanlı uçuş takibi","fixedPrice":"Sabit fiyat garantisi","meetGreet":"Kişisel karşılama","speakingDrivers":"İngilizce ve Almanca konuşan şoförler","fromAirport":"Antalya Havalimanı'ndan","welcomeEyebrow":"Daha iyi bir karşılamaya hoş geldiniz","welcomeTitle":"Zarafetle seyahat edin.<br />Rahatça varın.","welcomeBody":"Uçağınız indiği andan itibaren her ayrıntı düşünülür. Şoförünüz gelen yolcu salonunda bekler, bagajınızla ilgilenir ve sizi özenle hazırlanmış özel aracınıza götürür.","ourStandards":"Hizmet standartlarımız","concierge":"Concierge desteği","guestsWelcomed":"Karşılanan misafir","guestRating":"Ortalama misafir puanı","privateTransfers":"Özel transfer","fleetEyebrow":"Araç filomuz","fleetTitle":"Size özel alan,<br />her ayrıntıda kusursuz.","fleetIntro":"Aileniz, golf ekipmanınız ve bagajınız için geniş alan sunan sessiz bir konforla seyahat edin.","signatureFleet":"Seçkin filo","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Kalabalık gruplar için geniş yolcu ve bagaj alanı sunan VIP ulaşım.","passengers":"yolcu","suitcases":"bavul","television":"Araç içi televizyon","coldDrinks":"Soğuk içecekler","snacks":"Atıştırmalıklar","childSeats":"Talep üzerine çocuk koltuğu","wifi":"Ücretsiz WiFi","nameSignGreeting":"İsminize özel tabela ile karşılama","reserveVehicle":"Bu aracı ayırtın","insideVclass":"Sprinter'ın içinde","interiorTitle":"Havalimanı ile oteliniz arasında<br />size özel bir lounge.","serviceEyebrow":"Antalya VIP standardı","serviceTitle":"Transferden fazlası.<br />Özenli bir karşılama.","serviceIntro":"Havalimanından otele kadar beş yıldızlı ilgi, deneyimli yerel şoförler ve tam huzur.","trackingTitle":"Uçuş takibi","trackingBody":"Uçuşunuzu gerçek zamanlı takip eder, alış saatinizi hiçbir ek ücret olmadan otomatik olarak ayarlarız.","chauffeurTitle":"Profesyonel şoförler","chauffeurBody":"Bakımlı, gizliliğe önem veren ve yerel bilgisi ile hizmet kalitesi için seçilmiş profesyoneller.","greetTitle":"Karşılama hizmeti","greetBody":"Şoförünüz sizi gelen yolcu salonunda isminizin yazılı olduğu tabela ile karşılar ve bagajınıza yardımcı olur.","supportTitle":"7/24 concierge","supportBody":"Yolculuğunuzdan önce, yolculuk sırasında ve sonrasında telefon veya WhatsApp üzerinden gerçek bir kişiye ulaşabilirsiniz.","priceTitle":"Sabit fiyatlar","priceBody":"Onaylanan fiyat ödeyeceğiniz nihai fiyattır. Bekleme, otopark ve uçuş gecikmeleri dahildir.","familyTitle":"Ailelere hazır","familyBody":"Yaşa uygun çocuk koltukları, geniş kabinler ve rahat bir aile karşılaması için özenli destek.","routesEyebrow":"En çok tercih edilen yolculuklar","routesTitle":"Antalya Havalimanı'ndan<br />Türk Rivierası'na.","routesIntro":"Tüm fiyatlar kişi başı değil, araç başıdır ve ücretsiz bekleme süresi dahildir.","golfFavourite":"Golf misafirlerinin favorisi","reviewsEyebrow":"Misafir yorumları","reviewsTitle":"Varıştan sonra da<br />hatırlanan hizmet.","googleReviews":"Doğrulanmış 387 Google yorumuna göre","trustedBy":"Antalya'nın önde gelen resort misafirlerinin tercihi","pricingEyebrow":"İçiniz rahat olsun","pricingTitle":"Müşteri dostu fiyatlandırma.<br />Adil olanı ödersiniz.","pricingIntro":"İçiniz rahat etsin diye sabit fiyat sunarız, ancak gerçek mesafeyi de ölçeriz. Her zaman düşük olan tutarı ödersiniz.","pricingFixedPrice":"Sabit fiyat","fixedPriceExample":"Belek transferi: €{{PRICE:belek:vito}}","fixedPriceDesc":"Garantili toplam tutar. Havalimanı ücretleri, otopark, bekleme süresi ve vergiler dahildir.","distancePrice":"Mesafeye göre","distancePriceExample":"24 km online örnek: €25","distancePriceDesc":"Yolculuğunuz sırasında GPS ile ölçülür.","youPay":"Ödeyeceğiniz tutar","youPayPrice":"€25","youPayDesc":"Hangisi daha düşükse. Şoför yolculuk sonunda teyit eder.","pricingNote":"Sürpriz yok. Gizli ücret yok. Rezervasyonda gördüğünüz tutarı ödersiniz - ya da daha azını.","faqEyebrow":"Sık sorulanlar","faqTitle":"Seyahatinizden önce.","faqIntro":"Antalya'daki özel havalimanı transferiniz hakkında bilmeniz gereken her şey.","askQuestion":"Bize sorun","faqOneQ":"Uçağım gecikirse ne olur?","faqOneA":"Tüm uçuşları gerçek zamanlı takip ederiz. Alış saatiniz otomatik olarak güncellenir ve şoförünüz ek ücret olmadan bekler.","faqTwoQ":"Şoförümle nerede buluşacağım?","faqTwoA":"Bagajınızı aldıktan sonra bagaj teslim alanından çıkın ve Karşılama Alanına gidin. J / 777 buluşma noktasını arayın — ekibimiz kişisel isim tabelasıyla sizi bekliyor olacak.","faqThreeQ":"Çocuk koltuğu var mı?","faqThreeA":"Evet. Bebek koltuğu, çocuk koltuğu ve yükseltici koltuk rezervasyon sırasında ücretsiz olarak talep edilebilir.","faqFourQ":"Golf çantası ve büyük bagaj taşıyor musunuz?","faqFourA":"Evet. Sprinter ve Vito araçlarımız golf grupları için idealdir. Bagaj bilgilerinizi paylaşın, uygun aracı planlayalım.","faqFiveQ":"Verilen fiyat kesin mi?","faqFiveA":"Evet. Havalimanı ücretleri, otopark, bekleme süresi ve vergiler dahildir. Gizli ücret yoktur.","contactEyebrow":"Yolculuğunuz burada başlar","contactTitle":"Antalya'ya ayrıcalıklı<br />bir şekilde varın.","contactBody":"İki dakikadan kısa sürede online rezervasyon yapın veya 7/24 concierge ekibimizle doğrudan görüşün.","whatsappUs":"WhatsApp'tan yazın","replyMinutes":"Genellikle birkaç dakika içinde yanıt veririz","callUs":"7/24 arayın","emailUs":"Concierge e-postası","replyHour":"Bir saat içinde yanıt","footerTagline":"Türk Rivierası genelinde özel şoför hizmetleri.","explore":"Keşfedin","information":"Bilgi","licensed":"Lisanslı özel transfer işletmesi · TÜRSAB standartlarına uygun","bookingConfirmed":"Rezervasyon Onaylandı","referenceLabel":"Referans","weWillContact":"Rezervasyon talebiniz gönderildi. 30 dakika içinde sizinle iletişime geçeceğiz.","chatWithUs":"Bize yazın","pickupAddressPlaceholder":"Otel adı, cadde, bina numarası ve ilçe","dropoffAddressPlaceholder":"Otel adı, cadde, bina numarası ve ilçe","hotelNamePlaceholder":"Otel veya konaklama adı","stepRoute":"Rota","stepDetails":"Detaylar","stepContact":"İletişim","reserveForPrice":"Rezerve et","continue":"Devam","back":"Geri","perVehicleNoteVito":"Araç başına — kişi başına değil · 6 yolcuya kadar","perVehicleNoteSprinter":"Araç başına — kişi başına değil · 12 yolcuya kadar","perVehicle":"araç başı · sabit fiyat","noPrePayment":"No prepayment required","payAfterTransfer":"Pay your driver after the transfer","requestQuote":"Fiyat teklifi al","cashConfirmation":"Rezervasyonunuz onaylandı. Sabit toplam tutarı araçta doğrudan şoförünüze ödeyin.","bookingError":"Rezervasyonunuz tamamlanamadı. Lütfen tekrar deneyin.","formIncomplete":"Lütfen işaretli alanları doldurun.","requiredField":"Bu alan zorunludur.","destinationRequired":"Lütfen bir varış noktası seçin.","dateInvalid":"Lütfen bugünü veya gelecekteki bir tarihi seçin.","emailInvalid":"Lütfen geçerli bir e-posta adresi girin.","nameInvalid":"Lütfen geçerli bir ad soyad girin.","phoneInvalid":"Lütfen ülke koduyla birlikte geçerli bir numara girin (örneğin +49).","flightInvalid":"Lütfen geçerli bir uçuş numarası girin.","pickupAddressRequired":"Alış adresi 6–160 karakter arasında olmalıdır.","dropoffAddressRequired":"Varış adresi 6–160 karakter arasında olmalıdır.","addressesMustDiffer":"Alış ve varış adresleri farklı olmalıdır.","customDestinationPrice":"Fiyat, varış adresi kontrol edildikten sonra teyit edilecektir.","hotelNameRequired":"Lütfen otel ismini girin.","roundTripPriceNote":"gidiş–dönüş · 2 yolculuk","returnDateRequired":"Lütfen dönüş tarihini seçin.","returnDateInvalid":"Lütfen gidiş tarihiyle aynı veya daha sonraki bir dönüş tarihi seçin.","returnTimeRequired":"Lütfen dönüş için alış saatini seçin.","dailyChauffeur":"Günlük araç + şoför","days":"gün","dailyChauffeurHint":"Özel araç ve şoförü kilometre ve saat sınırı olmadan günlük kiralayın. Yakıt ayrıca ödenir.","serviceStartDate":"İlk hizmet günü","serviceEndDate":"Son hizmet günü","dailyPickupTime":"Hizmet başlangıç saati","dailyPickupTimeRequired":"Lütfen günlük hizmet başlangıç saatini seçin.","serviceEndDateRequired":"Lütfen son hizmet gününü seçin.","servicePeriodInvalid":"Lütfen 1 ile 30 gün arasında bir süre seçin.","arrivalFlightTimeOptional":"Geliş uçuş saati (isteğe bağlı)","arrivalFlightNumberOptional":"Geliş uçuş numarası (isteğe bağlı)","servicePrice":"Hizmet bedeli","fuelExcludedShort":"yakıt hariç","fuelExcludedDetail":"Yakıt dahil değildir ve kullanıma göre ayrıca ödenir.","departureFlightDate":"Dönüş uçuş tarihi (isteğe bağlı)","departureFlightTime":"Dönüş uçuş saati","departureFlightNumber":"Dönüş uçuş numarası","departureFlightDateRequired":"Lütfen dönüş uçuş tarihini seçin.","departureFlightDateInvalid":"Dönüş uçuş tarihi hizmet başlangıcından önce olamaz.","dailyQuoteIncludes":"Seçilen araç ve şoför, kilometre ve saat sınırı olmadan dahildir. Yakıt hariçtir.","reviewAndConfirm":"İncele ve onayla","fuelTermsTitle":"Yakıt ücreti hakkında önemli bilgi","fuelTermsBody":"Günlük €150 hizmet bedeline araç ve şoför dahildir. Yakıt ücreti dahil değildir. Gerçekleşen yakıt masrafını kullanıma göre ayrıca ödeyeceksiniz.","fuelTermsCheckbox":"Yakıtın dahil olmadığını ve kullanıma göre ayrıca ödeneceğini anladım.","cancel":"Vazgeç","close":"Kapat","understandAndConfirm":"Anladım ve onaylıyorum","dailyCashConfirmation":"Günlük araç ve şoför rezervasyonunuz onaylandı. Hizmet bedeline yakıt dahil değildir; yakıt kullanıma göre ayrıca ödenir.","hotelSearchHint":"Otelinizin adını yazıp listeden seçin; varış bölgesini ve fiyatı sizin için dolduralım.","hotelNotListed":"Otelim listede yok","hotelNoMatch":"Henüz eşleşme yok. Adı yazıp bölgeyi kendiniz seçebilirsiniz.","campaignBadge":"Online'a özel","campaignDiscount":"Özel fiyat","campaignScope":"tüm transfer fiyatlarında","campaignApplied":"Online'a özel fiyat uygulanmıştır","onlineDiscountShort":"Online özel fiyat","discountPricesShown":"Online'a özel fiyatlar gösteriliyor","quoteTitle":"Sizi nereye götürelim?","date":"Tarih","airportReturnPrice":"Fiyat, otel veya alış adresi kontrol edildikten sonra teyit edilecektir.","oneGuest":"1 misafir","twoGuests":"2 misafir","threeGuests":"3 misafir","fourGuests":"4 misafir","fiveGuests":"5 misafir","sixGuests":"6 misafir","sevenGuests":"7 misafir","viewQuote":"Fiyatı görüntüle","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Aileler ve küçük gruplar için konforlu ve özel bir kabin.","capacitySwitchedSprinter":"Yolcu ve bagajınız Vito kapasitesini aşıyor — Mercedes Sprinter'a geçildi.","capacityNoVehicle":"Bu kadar yolcu ve bavul araçlarımızın kapasitesini aşıyor. Lütfen WhatsApp'tan bize ulaşın.","leatherSeats":"Premium deri koltuklar","water":"Soğuk şişe su","from":"Başlangıç","reviewOne":"“Uçağımız 90 dakika gecikmesine rağmen şoförümüz bizi bekliyordu. Aracımız kusursuz, serin ve iki çocuk koltuğu da hazırdı. Ailemizin tam olarak ihtiyaç duyduğu karşılamaydı.”","reviewTwo":"“İlk WhatsApp görüşmesinden Belek'e varışımıza kadar her şey birinci sınıftı. Dakik, gizliliğe önem veren ve son derece profesyonel. Golf çantalarımız da rahatça sığdı.”","reviewThree":"“Bu bir havalimanı taksisinden çok beş yıldızlı otel şoför hizmeti gibiydi. Net iletişim, tertemiz araç ve gerçekten nazik bir şoför.”","quoteReady":"Size özel transfer","journeyTime":"Yolculuk süresi","totalFixed":"Toplam sabit fiyat","confirmWhatsapp":"WhatsApp ile onaylayın","bookNowCta":"Rezervasyon yap","backToQuote":"Geri","yourDetails":"Bilgileriniz","flightNumber":"Uçuş numarası","flightArrivalTime":"Varış saati","notesLabel":"Özel istekler","confirmBooking":"Rezervasyonu onayla","paySecurely":"Güvenli ödemeye geç","payLaterNote":"Onay sonrası güvenli online ödeme.","paymentTitle":"Güvenli Ödeme","paymentError":"Ödeme başarısız. Lütfen tekrar deneyin."},"ru":{"navFleet":"Автопарк","navService":"Сервис","navFairPricing":"Честная цена","navRoutes":"Маршруты","navReviews":"Отзывы","navContact":"Контакты","bookNow":"Забронировать","alwaysAvailable":"Мы на связи круглосуточно, каждый день","heroEyebrow":"Персональный шофёр · Анталья","heroTitle":"Премиальный трансфер<br />из аэропорта Антальи","heroSubtitle":"Индивидуальные трансферы с водителем из аэропорта Антальи в Белек, Сиде, Кемер и Аланью.","bookTransfer":"Забронировать трансфер","instantQuote":"Узнать цену","googleRated":"Рейтинг Google","trustedGuests":"Нам доверяют более 2 500 гостей","discover":"Подробнее","tbLicensed":"Лицензия TÜRSAB","tbFlightTracking":"Отслеживание рейса","tbFixedPrice":"Фиксированная цена","tb247Concierge":"Консьерж 24/7","tbChildSeats":"Детские кресла в комплекте","privateJourney":"Ваша частная поездка","meetGreetNote":"Встреча в аэропорту · Пункт встречи J / 777","tripType":"Тип поездки","oneWay":"В одну сторону","roundTrip":"Туда и обратно","roundTripHint":"Обратная поездка проходит по тому же маршруту в обратном направлении.","pickup":"Место встречи","airportOption":"Аэропорт Антальи (AYT)","hotelOption":"Отель","privateAddressOption":"Частный адрес","destination":"Направление","selectDestination":"Выберите направление","vehicle":"Автомобиль","guests":"Гости","arrivalDate":"Дата прибытия","arrivalFlightTime":"Время прибытия рейса","chooseTime":"Выберите время","arrivalFlightNumber":"Номер рейса прибытия","returnDate":"Дата возвращения","returnPickupTime":"Время подачи на обратный путь","returnFlightNumber":"Номер обратного рейса","pickupAddress":"Полный адрес подачи","dropoffAddress":"Полный адрес назначения","luggageLabel":"Крупный багаж","hotelNameLabel":"Название отеля","childSeatLabel":"Детские кресла","childSeatNone":"Без детского кресла","oneChildSeat":"1 детское кресло","twoChildSeats":"2 детских кресла","threeChildSeats":"3 детских кресла","fourChildSeats":"4 детских кресла","fullName":"Имя и фамилия","phoneLabel":"Телефон / WhatsApp","emailLabel":"Эл. почта","paymentMethod":"Выберите способ оплаты","cashPayment":"Оплата в автомобиле","recommended":"Рекомендуем","cashPaymentDescription":"Без предоплаты. Оплатите услугу непосредственно водителю, когда останетесь довольны обслуживанием.","quoteIncludes":"Включены встреча, отслеживание рейса, парковка, ожидание и питьевая вода.","perVehicleNote":"За автомобиль — не за человека · До 7 пассажиров","confirmCashBooking":"Подтвердить — оплата в автомобиле","flightTracking":"Отслеживание рейса","fixedPrice":"Гарантия фиксированной цены","meetGreet":"Персональная встреча","speakingDrivers":"Водители говорят на английском и немецком","fromAirport":"Из аэропорта Антальи","welcomeEyebrow":"Добро пожаловать на новый уровень сервиса","welcomeTitle":"Путешествуйте красиво.<br />Прибывайте без забот.","welcomeBody":"С момента посадки вашего самолёта мы продумываем каждую деталь. Шофёр встретит вас в зале прилёта, поможет с багажом и проводит к подготовленному автомобилю.","ourStandards":"Наши стандарты сервиса","concierge":"Поддержка консьержа","guestsWelcomed":"Встреченных гостей","guestRating":"Средняя оценка гостей","privateTransfers":"Частные трансферы","fleetEyebrow":"Наш автопарк","fleetTitle":"Ваше личное пространство,<br />безупречное в деталях.","fleetIntro":"Путешествуйте в тишине и комфорте: достаточно места для семьи, багажа и оборудования для гольфа.","signatureFleet":"Фирменный автопарк","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Эталон комфортных групповых поездок: просторный, исключительно тихий салон и всё необходимое для беззаботного прибытия.","passengers":"пассажиров","suitcases":"чемоданов","television":"Телевизор в автомобиле","coldDrinks":"Холодные напитки","snacks":"Закуски","childSeats":"Детские кресла по запросу","wifi":"Бесплатный WiFi","nameSignGreeting":"Встреча с именной табличкой","reserveVehicle":"Забронировать автомобиль","insideVclass":"Салон Sprinter","interiorTitle":"Персональный лаунж<br />между аэропортом и отелем.","serviceEyebrow":"Стандарт Antalya VIP","serviceTitle":"Больше, чем трансфер.<br />Продуманная встреча.","serviceIntro":"Внимание уровня пятизвёздочного отеля, опытные местные шофёры и спокойствие от аэропорта до курорта.","trackingTitle":"Отслеживание рейса","trackingBody":"Мы отслеживаем ваш рейс в реальном времени и автоматически корректируем время встречи без доплаты.","chauffeurTitle":"Профессиональные шофёры","chauffeurBody":"Безупречный внешний вид, деликатность, знание региона и высокие стандарты обслуживания.","greetTitle":"Встреча в аэропорту","greetBody":"Шофёр встретит вас в зале прилёта с именной табличкой и поможет с багажом.","supportTitle":"Консьерж 24/7","supportBody":"До, во время и после поездки вам всегда ответит человек по телефону или в WhatsApp.","priceTitle":"Фиксированные цены","priceBody":"Подтверждённая цена является окончательной. Ожидание, парковка и задержка рейса уже включены.","familyTitle":"Для всей семьи","familyBody":"Детские кресла по возрасту, просторный салон и внимательная помощь для спокойного семейного приезда.","routesEyebrow":"Самые популярные поездки","routesTitle":"Из аэропорта Антальи<br />на Турецкую Ривьеру.","routesIntro":"Все цены указаны за автомобиль, а не за пассажира. Бесплатное ожидание включено.","golfFavourite":"Выбор игроков в гольф","reviewsEyebrow":"Отзывы гостей","reviewsTitle":"Сервис, который помнят<br />после прибытия.","googleReviews":"На основе 387 подтверждённых отзывов Google","trustedBy":"Нам доверяют гости ведущих курортов Антальи","pricingEyebrow":"Спокойствие в поездке","pricingTitle":"Цены в интересах клиента.<br />Вы платите справедливую сумму.","pricingIntro":"Мы предлагаем фиксированные цены для спокойствия, но измеряем фактическое расстояние. Вы всегда платите меньшую сумму.","pricingFixedPrice":"Фиксированная цена","fixedPriceExample":"Трансфер в Белек: {{PRICE:belek:vito}} €","fixedPriceDesc":"Гарантированная итоговая сумма. Включены сборы аэропорта, парковка, ожидание и налоги.","distancePrice":"По расстоянию","distancePriceExample":"24 км онлайн-пример: 25 €","distancePriceDesc":"Измеряется по GPS во время поездки.","youPay":"Вы платите","youPayPrice":"25 €","youPayDesc":"Применяется меньшая сумма. Водитель подтвердит её в конце.","pricingNote":"Без сюрпризов. Без скрытых платежей. Вы платите указанную при бронировании сумму - или меньше.","faqEyebrow":"Частые вопросы","faqTitle":"Перед поездкой.","faqIntro":"Всё, что нужно знать о частном трансфере из аэропорта Антальи.","askQuestion":"Задать вопрос","faqOneQ":"Что произойдёт, если мой рейс задержится?","faqOneA":"Мы отслеживаем каждый рейс в реальном времени. Время встречи корректируется автоматически, а водитель ждёт без дополнительной платы.","faqTwoQ":"Где я встречу водителя?","faqTwoA":"После получения багажа выйдите из зоны выдачи и пройдите в зону встречи (Meet & Greet). Найдите точку J / 777 — наша команда будет ждать с именной табличкой.","faqThreeQ":"Есть ли детские кресла?","faqThreeA":"Да. Автолюльки, детские кресла и бустеры предоставляются бесплатно по запросу при бронировании.","faqFourQ":"Можно ли взять сумки для гольфа и крупный багаж?","faqFourA":"Да. Sprinter и Vito идеально подходят для групп игроков в гольф. Сообщите объём багажа, и мы подберём автомобиль.","faqFiveQ":"Указанная цена окончательная?","faqFiveA":"Да. Аэропортовые сборы, парковка, ожидание и налоги включены. Скрытых платежей нет.","contactEyebrow":"Ваше путешествие начинается здесь","contactTitle":"Прибудьте в Анталью<br />исключительно комфортно.","contactBody":"Забронируйте онлайн менее чем за две минуты или свяжитесь с нашей службой консьержа 24/7.","whatsappUs":"Написать в WhatsApp","replyMinutes":"Обычно отвечаем за несколько минут","callUs":"Позвонить 24/7","emailUs":"Написать консьержу","replyHour":"Ответ в течение часа","footerTagline":"Частные услуги шофёра по всей Турецкой Ривьере.","explore":"Разделы","information":"Информация","licensed":"Лицензированный оператор частных трансферов · Соответствует требованиям TÜRSAB","bookingConfirmed":"Бронирование подтверждено","referenceLabel":"Референс","weWillContact":"Ваш запрос на бронирование отправлен. Мы свяжемся с вами в течение 30 минут.","chatWithUs":"Написать нам","pickupAddressPlaceholder":"Название отеля, улица, номер дома и район","dropoffAddressPlaceholder":"Название отеля, улица, номер дома и район","hotelNamePlaceholder":"Название отеля или места проживания","stepRoute":"Маршрут","stepDetails":"Детали","stepContact":"Контакты","reserveForPrice":"Забронировать","continue":"Продолжить","back":"Назад","perVehicleNoteVito":"За автомобиль — не за человека · До 6 пассажиров","perVehicleNoteSprinter":"За автомобиль — не за человека · До 12 пассажиров","perVehicle":"за автомобиль · фиксированная цена","noPrePayment":"No prepayment required","payAfterTransfer":"Pay your driver after the transfer","requestQuote":"Запросить расчёт","cashConfirmation":"Бронирование подтверждено. Оплатите фиксированную сумму водителю в автомобиле.","bookingError":"Не удалось завершить бронирование. Попробуйте ещё раз.","formIncomplete":"Заполните выделенные поля.","requiredField":"Это поле обязательно.","destinationRequired":"Выберите направление.","dateInvalid":"Выберите сегодняшнюю или будущую дату.","emailInvalid":"Введите действительный адрес электронной почты.","nameInvalid":"Введите действительное полное имя.","phoneInvalid":"Введите действительный номер с кодом страны (например, +49).","flightInvalid":"Введите действительный номер рейса.","pickupAddressRequired":"Адрес подачи должен содержать от 6 до 160 символов.","dropoffAddressRequired":"Адрес назначения должен содержать от 6 до 160 символов.","addressesMustDiffer":"Адреса подачи и назначения должны отличаться.","customDestinationPrice":"Цена будет подтверждена после проверки адреса назначения.","hotelNameRequired":"Введите название отеля.","roundTripPriceNote":"туда и обратно · 2 поездки","returnDateRequired":"Выберите дату возвращения.","returnDateInvalid":"Дата возвращения должна совпадать с датой поездки туда или быть позже.","returnTimeRequired":"Выберите время подачи на обратный путь.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","hotelSearchHint":"Введите название отеля и выберите его из списка — регион и цену мы заполним за вас.","hotelNotListed":"Моего отеля нет в списке","hotelNoMatch":"Совпадений пока нет. Введите название и выберите регион самостоятельно.","campaignBadge":"Онлайн-акция","campaignDiscount":"спеццена","campaignScope":"на все трансферы","campaignApplied":"Применена специальная онлайн-цена","onlineDiscountShort":"Онлайн-спеццена","discountPricesShown":"Показаны специальные онлайн-цены","quoteTitle":"Куда вас отвезти?","date":"Дата","airportReturnPrice":"Цена будет подтверждена после проверки отеля или адреса подачи.","oneGuest":"1 гость","twoGuests":"2 гостя","threeGuests":"3 гостя","fourGuests":"4 гостя","fiveGuests":"5 гостей","sixGuests":"6 гостей","sevenGuests":"7 гостей","viewQuote":"Показать цену","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Просторный частный салон для больших семей, групп игроков в гольф и гостей с объёмным багажом.","capacitySwitchedSprinter":"Пассажиры и багаж превышают вместимость Vito — выбран Mercedes Sprinter.","capacityNoVehicle":"Столько пассажиров и багажа превышает вместимость наших автомобилей. Напишите нам в WhatsApp.","leatherSeats":"Премиальные кожаные сиденья","water":"Охлаждённая вода","from":"От","reviewOne":"«Несмотря на задержку рейса на 90 минут, водитель ждал нас. Автомобиль был безупречно чистым и прохладным, а оба детских кресла уже были установлены. Именно такая встреча была нужна нашей семье».","reviewTwo":"«От первого сообщения в WhatsApp до прибытия в Белек всё было на высшем уровне. Пунктуально, деликатно и очень профессионально. Наши сумки для гольфа легко поместились».","reviewThree":"«Это было похоже на трансфер от пятизвёздочного отеля, а не на такси из аэропорта. Чёткая связь, безупречный автомобиль и по-настоящему вежливый водитель».","quoteReady":"Ваш частный трансфер","journeyTime":"Время в пути","totalFixed":"Итоговая цена","confirmWhatsapp":"Подтвердить в WhatsApp","bookNowCta":"Забронировать","backToQuote":"Назад","yourDetails":"Ваши данные","flightNumber":"Номер рейса","flightArrivalTime":"Время прилёта","notesLabel":"Особые пожелания","confirmBooking":"Подтвердить бронирование","paySecurely":"Перейти к безопасной оплате","payLaterNote":"Оплата онлайн после подтверждения.","paymentTitle":"Безопасная оплата","paymentError":"Оплата не прошла. Попробуйте ещё раз."},"cs":{"navFleet":"Vozový park","navService":"Služby","navFairPricing":"Spravedlivé ceny","navRoutes":"Trasy","navReviews":"Recenze","navContact":"Kontakt","bookNow":"Rezervovat","alwaysAvailable":"Dostupní 24 hodin denně","heroEyebrow":"Soukromá šoférská služba · Antalya","heroTitle":"Prémiové letištní<br />transfery v Antalyi","heroSubtitle":"Soukromé transfery se šoférem z letiště Antalya do Beleku, Side, Kemeru a Alanye.","bookTransfer":"Rezervovat transfer","instantQuote":"Okamžitá nabídka","googleRated":"Hodnocení Google","trustedGuests":"Důvěryhodné u 2 500+ hostů","discover":"Objevit","tbLicensed":"Licence TÜRSAB","tbFlightTracking":"Sledování letů","tbFixedPrice":"Pevné ceny","tb247Concierge":"Recepce 24/7","tbChildSeats":"Dětské sedačky v ceně","privateJourney":"Váš soukromý výlet","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Typ cesty","oneWay":"Jednosměrně","roundTrip":"Tam a zpět","roundTripHint":"U zpáteční cesty následuje zpáteční trasa stejnou cestou v opačném směru.","pickup":"Místo vyzvednutí","airportOption":"Letiště Antalya (AYT)","hotelOption":"Hotel","privateAddressOption":"Soukromá adresa","destination":"Cíl","selectDestination":"Vyberte cíl","vehicle":"Vozidlo","guests":"Hosté","arrivalDate":"Datum příjezdu","arrivalFlightTime":"Čas příjezdu letu","chooseTime":"Vyberte čas","arrivalFlightNumber":"Číslo příletového letu","returnDate":"Datum návratu","returnPickupTime":"Čas vyzvednutí při návratu","returnFlightNumber":"Číslo zpátečního letu","pickupAddress":"Úplná adresa vyzvednutí","dropoffAddress":"Úplná adresa vysazení","luggageLabel":"Velká zavazadla","hotelNameLabel":"Název hotelu","childSeatLabel":"Dětské sedačky","childSeatNone":"Bez dětské sedačky","oneChildSeat":"1 dětská sedačka","twoChildSeats":"2 dětské sedačky","threeChildSeats":"3 dětské sedačky","fourChildSeats":"4 dětské sedačky","fullName":"Celé jméno","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-mail","paymentMethod":"Zvolte způsob platby","cashPayment":"Platba ve vozidle","recommended":"Doporučeno","cashPaymentDescription":"Bez zálohy. Zaplaťte řidiči přímo, až budete spokojeni se službou.","quoteIncludes":"Zahrnuje uvítání, sledování letů, parkování, čekání a balenou vodu.","perVehicleNote":"Per vehicle — not per person · Up to 7 passengers","confirmCashBooking":"Potvrdit rezervaci — platba ve vozidle","flightTracking":"Sledování letů v reálném čase","fixedPrice":"Garance pevné ceny","meetGreet":"Osobní uvítání","speakingDrivers":"Anglicky a německy mluvící","fromAirport":"Z letiště Antalya","welcomeEyebrow":"Vítejte na lepším příjezdu","welcomeTitle":"Cestujte krásně.<br />Přijíždějte bez starostí.","welcomeBody":"Od okamžiku přistání letadla je každý detail promyšlen. Váš šofér čeká uvnitř příletové haly, postará se o zavazadla a doprovodí vás k pečlivě připravenému soukromému vozidlu.","ourStandards":"Naše standardy služeb","concierge":"Podpora recepce","guestsWelcomed":"Přivítaných hostů","guestRating":"Průměrné hodnocení hostů","privateTransfers":"Soukromé transfery","fleetEyebrow":"Vozový park","fleetTitle":"Váš soukromý prostor,<br />vyladěný do každého detailu.","fleetIntro":"Cestujte v tiché pohodlí s dostatkem místa pro rodinu, golfové vybavení a zavazadla.","signatureFleet":"Prémiový vozový park","fleetVclassClass":"Business · První třída","fleetVclassDescription":"Prostorný VIP transport pro větší skupiny s dostatkem místa pro cestující i zavazadla.","passengers":"cestujících","suitcases":"kufrů","television":"TV ve vozidle","coldDrinks":"Studené nápoje","snacks":"Občerstvení","childSeats":"Dětská sedačka k dispozici","wifi":"Bezplatné WiFi","nameSignGreeting":"Uvítání s personalizovanou jmenovkou","reserveVehicle":"Rezervovat vozidlo","insideVclass":"Interiér Sprinteru","interiorTitle":"Soukromý salon mezi<br />letištěm a vaším hotelem.","serviceEyebrow":"Standard Antalya VIP","serviceTitle":"Víc než transfer.<br />Uvítání s péčí.","serviceIntro":"Pozornost na úrovni hotelu, zkušení místní šoféři a naprostý klid od vzletu až po resort.","trackingTitle":"Sledování letů","trackingBody":"Monitorujeme váš let v reálném čase a automaticky upravujeme čas vyzvednutí, bez příplatku.","chauffeurTitle":"Profesionální šoféři","chauffeurBody":"Bezchybně upravení, diskrétní a vybíraní pro místní znalosti a standardy služeb.","greetTitle":"Uvítání","greetBody":"Váš šofér vás přivítá v příletové hale s personalizovanou jmenovkou a pomůže se zavazadly.","supportTitle":"Recepce 24/7","supportBody":"Skutečná osoba je vždy dostupná telefonicky nebo přes WhatsApp před, během a po cestě.","priceTitle":"Pevné ceny","priceBody":"Potvrzená cena je cena, kterou zaplatíte. Čekání, parkování a zpoždění letu jsou zahrnuty.","familyTitle":"Přátelské pro rodiny","familyBody":"Věkově vhodné dětské sedačky, prostorné kabiny a trpělivá pomoc pro klidný rodinný příjezd.","routesEyebrow":"Nejžádanější trasy","routesTitle":"Z letiště Antalya<br />na tureckou riviéru.","routesIntro":"Všechny ceny jsou za vozidlo, nikdy za cestujícího, se zahrnutým čekáním zdarma.","golfFavourite":"Oblíbené pro golf","reviewsEyebrow":"Recenze hostů","reviewsTitle":"Služba, na kterou se<br />nezapomíná ani po příjezdu.","googleReviews":"Na základě 387 ověřených recenzí Google","trustedBy":"Oblíbené u hostů předních antalyských resortů","pricingEyebrow":"Klid v duši","pricingTitle":"Zákaznicky přívětivé ceny.<br />Platíte jen to, co je spravedlivé.","pricingIntro":"Nabízíme pevné ceny pro klid mysli, ale měříme skutečnou vzdálenost. Vždy zaplatíte nižší z obou.","pricingFixedPrice":"Pevná cena","fixedPriceExample":"Transfer do Beleku: €{{PRICE:belek:vito}}","fixedPriceDesc":"Garantovaná celková cena. Zahrnuje letištní poplatky, parkování, čekání a daně.","distancePrice":"Podle vzdálenosti","distancePriceExample":"Příklad 24 km online: €25","distancePriceDesc":"Měřeno GPS během jízdy.","youPay":"Platíte","youPayPrice":"€25","youPayDesc":"Cokoliv je nižší. Řidič potvrdí na konci.","pricingNote":"Žádná překvapení. Žádné skryté poplatky. Co si rezervujete, to zaplatíte — nebo méně.","faqEyebrow":"Často kladené dotazy","faqTitle":"Před vaší cestou.","faqIntro":"Vše, co potřebujete vědět o svém soukromém transferu z letiště Antalya.","askQuestion":"Zeptejte se nás","faqOneQ":"Co se stane, když má můj let zpoždění?","faqOneA":"Sledujeme každý přílet v reálném čase. Čas vyzvednutí je automaticky upraven a váš šofér počká bez dalšího příplatku.","faqTwoQ":"Kde najdu šoféra?","faqTwoA":"Po vyzvednutí zavazadel vyjděte do oblasti Meet & Greet a hledejte setkávací bod J / 777. Náš tým bude čekat s personalizovanou jmenovkou.","faqThreeQ":"Jsou k dispozici dětské sedačky?","faqThreeA":"Ano. Sedačky pro kojence, batolata i posilovací sedačky jsou k dispozici zdarma při objednávce.","faqFourQ":"Přepravíte golfové tašky a velká zavazadla?","faqFourA":"Ano. Naše vozidla Sprinter a Vito jsou ideální pro golfové skupiny. Sdělte nám detaily o zavazadlech a přidělíme správné vozidlo.","faqFiveQ":"Je nabízená cena konečná?","faqFiveA":"Ano. Veškeré letištní poplatky, parkování, čekání a daně jsou zahrnuty. Žádné skryté poplatky.","contactEyebrow":"Vaše cesta začíná zde","contactTitle":"Přijeďte do Antalye<br />výjimečně dobře.","contactBody":"Rezervujte online za méně než dvě minuty nebo mluvte přímo s naším týmem recepce 24/7.","whatsappUs":"Napište nám na WhatsApp","replyMinutes":"Obvykle odpovídáme do několika minut","callUs":"Volejte nás 24/7","emailUs":"E-mail recepce","replyHour":"Odpovídáme do jedné hodiny","footerTagline":"Soukromé šoférské služby na turecké riviéře.","explore":"Prozkoumat","information":"Informace","licensed":"Licencovaný soukromý přepravce · v souladu s TÜRSAB","bookingConfirmed":"Rezervace potvrzena","referenceLabel":"Reference","weWillContact":"Vaše žádost o rezervaci byla odeslána. Kontaktujeme vás do 30 minut.","chatWithUs":"Napište nám","pickupAddressPlaceholder":"Název hotelu, ulice, číslo budovy a čtvrť","dropoffAddressPlaceholder":"Název hotelu, ulice, číslo budovy a čtvrť","hotelNamePlaceholder":"Název hotelu nebo ubytování","stepRoute":"Trasa","stepDetails":"Podrobnosti","stepContact":"Kontakt","reserveForPrice":"Rezervovat","continue":"Pokračovat","back":"Zpět","perVehicleNoteVito":"Na vozidlo — ne na osobu · Až 6 cestujících","perVehicleNoteSprinter":"Na vozidlo — ne na osobu · Až 12 cestujících","perVehicle":"pevná cena · na vozidlo","noPrePayment":"No prepayment required","payAfterTransfer":"Pay your driver after the transfer","requestQuote":"Požádat o cenovou nabídku","cashConfirmation":"Vaše rezervace je potvrzena. Zaplaťte pevnou celkovou cenu přímo řidiči ve vozidle.","bookingError":"Vaši rezervaci se nepodařilo dokončit. Zkuste to prosím znovu.","formIncomplete":"Prosím vyplňte zvýrazněná pole.","requiredField":"Toto pole je povinné.","destinationRequired":"Prosím vyberte cíl.","dateInvalid":"Prosím vyberte dnešní nebo budoucí datum.","emailInvalid":"Prosím zadejte platnou e-mailovou adresu.","nameInvalid":"Prosím zadejte platné celé jméno.","phoneInvalid":"Prosím zadejte platné číslo včetně předvolby země (například +420).","flightInvalid":"Prosím zadejte platné číslo letu.","pickupAddressRequired":"Adresa vyzvednutí musí mít 6 až 160 znaků.","dropoffAddressRequired":"Adresa vysazení musí mít 6 až 160 znaků.","addressesMustDiffer":"Adresy vyzvednutí a vysazení musí být různé.","customDestinationPrice":"Cena bude potvrzena po ověření adresy vysazení.","hotelNameRequired":"Prosím zadejte název hotelu.","roundTripPriceNote":"zpáteční · 2 cesty","returnDateRequired":"Prosím vyberte datum návratu.","returnDateInvalid":"Prosím vyberte datum návratu nejdříve v den odjezdu.","returnTimeRequired":"Prosím vyberte čas vyzvednutí při návratu.","dailyChauffeur":"Denní vozidlo + šofér","days":"dní","dailyChauffeurHint":"Pronajměte si soukromé vozidlo a šoféra na celý den bez limitu kilometrů nebo hodin. Pohonné hmoty se platí zvlášť.","serviceStartDate":"První den služby","serviceEndDate":"Poslední den služby","dailyPickupTime":"Čas začátku služby","dailyPickupTimeRequired":"Prosím vyberte denní čas začátku služby.","serviceEndDateRequired":"Prosím vyberte poslední den služby.","servicePeriodInvalid":"Prosím vyberte období od 1 do 30 dní.","arrivalFlightTimeOptional":"Čas příjezdu letu (nepovinné)","arrivalFlightNumberOptional":"Číslo příletového letu (nepovinné)","servicePrice":"Cena služby","fuelExcludedShort":"pohonné hmoty nezahrnuty","fuelExcludedDetail":"Pohonné hmoty nejsou zahrnuty a platí se zvlášť podle spotřeby.","departureFlightDate":"Datum odletového letu (nepovinné)","departureFlightTime":"Čas odletového letu","departureFlightNumber":"Číslo odletového letu","departureFlightDateRequired":"Prosím vyberte datum odletového letu.","departureFlightDateInvalid":"Datum odletového letu nesmí být dříve než začátek služby.","dailyQuoteIncludes":"Zahrnuje vybrané vozidlo a šoféra bez limitu kilometrů nebo hodin. Pohonné hmoty jsou vyloučeny.","reviewAndConfirm":"Přezkoumat a potvrdit","fuelTermsTitle":"Důležité informace o pohonných hmotách","fuelTermsBody":"Denní poplatek €150 za službu zahrnuje vozidlo a šoféra. Pohonné hmoty nejsou zahrnuty. Skutečné náklady na pohonné hmoty zaplatíte zvlášť podle spotřeby.","fuelTermsCheckbox":"Chápu, že pohonné hmoty jsou vyloučeny a budou placeny zvlášť podle spotřeby.","cancel":"Zrušit","close":"Zavřít","understandAndConfirm":"Chápu a potvrzuji","dailyCashConfirmation":"Váš denní pronájem šoféra je potvrzen. Cena služby nezahrnuje pohonné hmoty, které se platí zvlášť podle spotřeby.","hotelSearchHint":"Zadejte název hotelu a vyberte jej ze seznamu – cílovou oblast i cenu doplníme za vás.","hotelNotListed":"Můj hotel není v seznamu","hotelNoMatch":"Zatím žádná shoda. Zadejte název a oblast vyberte sami.","campaignBadge":"Online akce","campaignDiscount":"Speciální cena","campaignScope":"ze všech cen transferů","campaignApplied":"Byla použita speciální online cena","discountPricesShown":"Zobrazeny online speciální ceny","onlineDiscountShort":"Online speciál","capacitySwitchedSprinter":"Počet cestujících a zavazadel přesahuje kapacitu Vito — přepnuto na Mercedes Sprinter."},"pl":{"navFleet":"Pojazdy","navService":"Usługi","navFairPricing":"Uczciwa cena","navRoutes":"Trasy","navReviews":"Opinie","navContact":"Kontakt","bookNow":"Zarezerwuj","alwaysAvailable":"Do Twojej dyspozycji 24 godziny na dobę","heroEyebrow":"Prywatny serwis szoferski · Antalya","heroTitle":"Transfery lotniskowe premium<br />w Antalyi","heroSubtitle":"Prywatne transfery z szoferem z lotniska Antalya do Belek, Side, Kemer i Alanyi.","bookTransfer":"Zarezerwuj transfer","instantQuote":"Sprawdź cenę","googleRated":"Ocena Google","trustedGuests":"Zaufało nam ponad 2 500 gości","discover":"Odkryj","tbLicensed":"Licencja TÜRSAB","tbFlightTracking":"Śledzenie lotu","tbFixedPrice":"Stała cena","tb247Concierge":"Concierge 24/7","tbChildSeats":"Foteliki w cenie","privateJourney":"Twoja prywatna podróż","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Miejsce odbioru","airportOption":"Lotnisko Antalya (AYT)","hotelOption":"Hotel","privateAddressOption":"Adres prywatny","destination":"Cel podróży","selectDestination":"Wybierz cel","vehicle":"Pojazd","guests":"Goście","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Wybierz godzinę","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Pełny adres odbioru","dropoffAddress":"Pełny adres docelowy","luggageLabel":"Duży bagaż","hotelNameLabel":"Nazwa hotelu","childSeatLabel":"Foteliki dziecięce","childSeatNone":"Bez fotelika dziecięcego","oneChildSeat":"1 fotelik dziecięcy","twoChildSeats":"2 foteliki dziecięce","threeChildSeats":"3 foteliki dziecięce","fourChildSeats":"4 foteliki dziecięce","fullName":"Imię i nazwisko","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-mail","paymentMethod":"Wybierz metodę płatności","cashPayment":"Zapłać w pojeździe","recommended":"Polecane","cashPaymentDescription":"Bez przedpłaty. Zapłać bezpośrednio kierowcy, gdy usługa spełni Twoje oczekiwania.","quoteIncludes":"Wliczono: powitanie, śledzenie lotu, parking, czas oczekiwania i woda.","perVehicleNote":"Per vehicle — not per person · Up to 7 passengers","confirmCashBooking":"Potwierdź — zapłać w pojeździe","flightTracking":"Śledzenie lotu w czasie rzeczywistym","fixedPrice":"Gwarantowana stała cena","meetGreet":"Osobiste powitanie","speakingDrivers":"Kierowcy mówiący po angielsku i niemiecku","fromAirport":"Z lotniska Antalya","welcomeEyebrow":"Witamy na najwyższym poziomie","welcomeTitle":"Podróżuj z klasą.<br />Przyjeżdżaj spokojnie.","welcomeBody":"Od chwili lądowania każdy szczegół jest dopracowany. Szofer czeka w hali przylotów, zajmuje się bagażem i odprowadza Cię do starannie przygotowanego pojazdu.","ourStandards":"Nasze standardy usług","concierge":"Usługi concierge","guestsWelcomed":"Powitanych gości","guestRating":"Średnia ocena gości","privateTransfers":"Prywatne transfery","fleetEyebrow":"Nasza flota","fleetTitle":"Twoja prywatna przestrzeń,<br />doskonała w każdym detalu.","fleetIntro":"Podróżuj komfortowo z obszernym miejscem dla rodziny, sprzętu golfowego i walizek.","signatureFleet":"Flota Signature","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Wzorzec eleganckiej podróży grupowej: przestronny, wyjątkowo cichy i wyposażony dla bezproblemowego przybycia.","passengers":"pasażerów","suitcases":"walizek","television":"Telewizor w pojeździe","coldDrinks":"Zimne napoje","snacks":"Przekąski","childSeats":"Foteliki dziecięce na życzenie","wifi":"Bezpłatne WiFi","nameSignGreeting":"Powitanie z tabliczką z imieniem","reserveVehicle":"Zarezerwuj pojazd","insideVclass":"Wnętrze Sprinter","interiorTitle":"Prywatny salon<br />między lotniskiem a hotelem.","serviceEyebrow":"Standard Antalya VIP","serviceTitle":"Więcej niż transfer.<br />Wyjątkowe powitanie.","serviceIntro":"Uwaga na poziomie pięciogwiazdkowego hotelu, doświadczeni lokalni szoferzy i pełen spokój od lotniska po resort.","trackingTitle":"Śledzenie lotu","trackingBody":"Śledzimy Twój lot w czasie rzeczywistym i automatycznie dostosowujemy godzinę odbioru bez dodatkowych opłat.","chauffeurTitle":"Profesjonalni szoferzy","chauffeurBody":"Zawsze zadbani, dyskretni, wybrani za znajomość terenu i najwyższe standardy obsługi.","greetTitle":"Meet & Greet","greetBody":"Szofer wita Cię w hali przylotów z tabliczką z Twoim imieniem i pomaga z bagażem.","supportTitle":"Concierge 24/7","supportBody":"Przed, w trakcie i po podróży zawsze możesz skontaktować się z nami telefonicznie lub przez WhatsApp.","priceTitle":"Stałe ceny","priceBody":"Potwierdzona cena jest ceną ostateczną. Czas oczekiwania, parking i opóźnienia lotów są wliczone.","familyTitle":"Dla rodzin","familyBody":"Odpowiednie foteliki dziecięce, obszerne kabiny i cierpliwa pomoc dla spokojnego przybycia z rodziną.","routesEyebrow":"Nasze najpopularniejsze trasy","routesTitle":"Z lotniska Antalya<br />na Turecką Riwierę.","routesIntro":"Wszystkie ceny dotyczą pojazdu, nie osoby. Bezpłatny czas oczekiwania jest wliczony.","golfFavourite":"Ulubieniec golfistów","reviewsEyebrow":"Opinie gości","reviewsTitle":"Usługa, która<br />zostaje w pamięci.","googleReviews":"Na podstawie 387 zweryfikowanych opinii Google","trustedBy":"Wybór gości czołowych resortów w Antalyi","pricingEyebrow":"Spokój od początku","pricingTitle":"Ceny przyjazne klientom.<br />Płacisz tyle, ile jest uczciwe.","pricingIntro":"Dla spokoju podajemy stałe ceny, ale mierzymy rzeczywisty dystans. Zawsze płacisz niższą kwotę.","pricingFixedPrice":"Stała cena","fixedPriceExample":"Transfer do Belek: {{PRICE:belek:vito}} €","fixedPriceDesc":"Gwarantowana kwota końcowa. Obejmuje opłaty lotniskowe, parking, czas oczekiwania i podatki.","distancePrice":"Według dystansu","distancePriceExample":"Przykład online 24 km: 25 €","distancePriceDesc":"Mierzone GPS-em podczas przejazdu.","youPay":"Płacisz","youPayPrice":"25 €","youPayDesc":"Obowiązuje niższa kwota. Kierowca potwierdza ją na końcu.","pricingNote":"Bez niespodzianek. Bez ukrytych opłat. Płacisz tyle, ile rezerwujesz - albo mniej.","faqEyebrow":"Często zadawane pytania","faqTitle":"Przed Twoją podróżą.","faqIntro":"Wszystko, co musisz wiedzieć o prywatnym transferze z lotniska w Antalyi.","askQuestion":"Zadaj pytanie","faqOneQ":"Co się stanie, jeśli mój lot się opóźni?","faqOneA":"Śledzimy każdy przylot w czasie rzeczywistym. Godzina odbioru jest automatycznie dostosowywana, a szofer czeka bez dodatkowych opłat.","faqTwoQ":"Gdzie spotkam mojego szofera?","faqTwoA":"Po odebraniu bagażu opuść strefę odbioru i udaj się do strefy powitań (Meet & Greet). Szukaj punktu spotkań J / 777 — nasz zespół czeka z tabliczką z Twoim imieniem.","faqThreeQ":"Czy dostępne są foteliki dziecięce?","faqThreeA":"Tak. Nosidełka, foteliki i podkładki są dostępne bezpłatnie przy wcześniejszej rezerwacji.","faqFourQ":"Czy można przewieźć torby golfowe i duży bagaż?","faqFourA":"Tak. Sprinter i Vito są idealne dla grup golfowych. Podaj informacje o bagażu, a zaplanujemy odpowiedni pojazd.","faqFiveQ":"Czy podana cena jest ostateczna?","faqFiveA":"Tak. Opłaty lotniskowe, parking, czas oczekiwania i podatki są wliczone. Brak ukrytych kosztów.","contactEyebrow":"Twoja podróż zaczyna się tutaj","contactTitle":"Przybądź do Antalyi<br />wyjątkowo komfortowo.","contactBody":"Zarezerwuj online w mniej niż dwie minuty lub skontaktuj się bezpośrednio z naszym concierge 24/7.","whatsappUs":"WhatsApp","replyMinutes":"Odpowiedź zwykle w kilka minut","callUs":"Zadzwoń 24/7","emailUs":"E-mail do concierge","replyHour":"Odpowiedź w ciągu godziny","footerTagline":"Prywatne usługi szoferskie na całej Tureckiej Riwierze.","explore":"Odkryj","information":"Informacje","licensed":"Licencjonowany prywatny przewoźnik · Zgodny z TÜRSAB","bookingConfirmed":"Rezerwacja potwierdzona","referenceLabel":"Numer referencyjny","weWillContact":"Twoje zgłoszenie rezerwacji zostało wysłane. Skontaktujemy się w ciągu 30 minut.","chatWithUs":"Napisz do nas","pickupAddressPlaceholder":"Nazwa hotelu, ulica, numer budynku i dzielnica","dropoffAddressPlaceholder":"Nazwa hotelu, ulica, numer budynku i dzielnica","hotelNamePlaceholder":"Nazwa hotelu lub zakwaterowania","stepRoute":"Trasa","stepDetails":"Szczegóły","stepContact":"Kontakt","reserveForPrice":"Zarezerwuj","continue":"Dalej","back":"Wstecz","perVehicleNoteVito":"Za pojazd — nie za osobę · Do 6 pasażerów","perVehicleNoteSprinter":"Za pojazd — nie za osobę · Do 12 pasażerów","perVehicle":"za pojazd · stała cena","noPrePayment":"No prepayment required","payAfterTransfer":"Pay your driver after the transfer","requestQuote":"Poproś o wycenę","cashConfirmation":"Rezerwacja jest potwierdzona. Zapłać kierowcy ustaloną kwotę w pojeździe.","bookingError":"Nie udało się dokończyć rezerwacji. Spróbuj ponownie.","formIncomplete":"Uzupełnij zaznaczone pola.","requiredField":"To pole jest wymagane.","destinationRequired":"Wybierz cel podróży.","dateInvalid":"Wybierz dzisiejszą lub przyszłą datę.","emailInvalid":"Wprowadź prawidłowy adres e-mail.","nameInvalid":"Wprowadź prawidłowe imię i nazwisko.","phoneInvalid":"Wprowadź prawidłowy numer z kodem kraju (na przykład +49).","flightInvalid":"Wprowadź prawidłowy numer lotu.","pickupAddressRequired":"Adres odbioru musi mieć od 6 do 160 znaków.","dropoffAddressRequired":"Adres docelowy musi mieć od 6 do 160 znaków.","addressesMustDiffer":"Adres odbioru i adres docelowy muszą być różne.","customDestinationPrice":"Cena zostanie potwierdzona po sprawdzeniu adresu docelowego.","hotelNameRequired":"Wprowadź nazwę hotelu.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","quoteTitle":"Dokąd Cię zawieziemy?","date":"Data","airportReturnPrice":"Cena zostanie potwierdzona po sprawdzeniu hotelu lub adresu odbioru.","oneGuest":"1 gość","twoGuests":"2 gości","threeGuests":"3 gości","fourGuests":"4 gości","fiveGuests":"5 gości","sixGuests":"6 gości","sevenGuests":"7 gości","viewQuote":"Pokaż cenę","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Obszerna prywatna kabina dla większych rodzin, grup golfowych i gości z obfitym bagażem.","capacitySwitchedSprinter":"Pasażerowie i bagaż przekraczają Vito — przełączono na Mercedes Sprinter.","capacityNoVehicle":"Tylu pasażerów i bagażu przekracza nasze pojazdy. Skontaktuj się z nami na WhatsApp.","leatherSeats":"Skórzane fotele premium","water":"Schłodzona woda mineralna","from":"Od","reviewOne":"„Nasz kierowca czekał mimo 90-minutowego opóźnienia. Pojazd był nieskazitelny, przyjemnie chłodny i wyposażony już w oba foteliki. Dokładnie takie powitanie potrzebowała nasza rodzina.”","reviewTwo":"„Od pierwszego kontaktu WhatsApp po przyjazd do Belek wszystko było absolutnie pierwszorzędne. Punktualnie, dyskretnie i bardzo profesjonalnie. Torby golfowe bez problemu się zmieściły.”","reviewThree":"„To było jak serwis szoferski hotelu, a nie taksówka na lotnisku. Jasna komunikacja, nieskazitelny pojazd i naprawdę uprzejmy kierowca.”","quoteReady":"Twój prywatny transfer","journeyTime":"Czas podróży","totalFixed":"Cena łączna","confirmWhatsapp":"Potwierdź przez WhatsApp","bookNowCta":"Zarezerwuj","backToQuote":"Wstecz","yourDetails":"Twoje dane","flightNumber":"Numer lotu","flightArrivalTime":"Godzina przylotu","notesLabel":"Specjalne życzenia","confirmBooking":"Potwierdź rezerwację","paySecurely":"Przejdź do bezpiecznej płatności","payLaterNote":"Bezpieczna płatność online po potwierdzeniu.","paymentTitle":"Bezpieczna płatność","paymentError":"Płatność nie powiodła się. Spróbuj ponownie."},"nl":{"navFleet":"Voertuigen","navService":"Service","navFairPricing":"Eerlijke prijs","navRoutes":"Routes","navReviews":"Reviews","navContact":"Contact","bookNow":"Nu boeken","alwaysAvailable":"24 uur per dag, elke dag bereikbaar","heroEyebrow":"Privé chauffeurservice · Antalya","heroTitle":"Premium luchthavenstransfers<br />in Antalya","heroSubtitle":"Privé transfers met chauffeur van Antalya Luchthaven naar Belek, Side, Kemer en Alanya.","bookTransfer":"Transfer boeken","instantQuote":"Direct prijs ontvangen","googleRated":"Google-beoordeling","trustedGuests":"Vertrouwd door meer dan 2.500 gasten","discover":"Ontdekken","tbLicensed":"TÜRSAB Erkend","tbFlightTracking":"Vluchttracking","tbFixedPrice":"Vaste prijs","tb247Concierge":"Concierge 24/7","tbChildSeats":"Kinderzitjes inbegrepen","privateJourney":"Uw privéreis","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Ophaallocatie","airportOption":"Luchthaven Antalya (AYT)","hotelOption":"Hotel","privateAddressOption":"Privéadres","destination":"Bestemming","selectDestination":"Kies bestemming","vehicle":"Voertuig","guests":"Gasten","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Kies tijd","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Volledig ophaaladres","dropoffAddress":"Volledig bestemmingsadres","luggageLabel":"Grote bagage","hotelNameLabel":"Hotelnaam","childSeatLabel":"Kinderzitjes","childSeatNone":"Geen kinderzitje","oneChildSeat":"1 kinderzitje","twoChildSeats":"2 kinderzitjes","threeChildSeats":"3 kinderzitjes","fourChildSeats":"4 kinderzitjes","fullName":"Volledige naam","phoneLabel":"Telefoon / WhatsApp","emailLabel":"E-mail","paymentMethod":"Kies betaalmethode","cashPayment":"Betaal in het voertuig","recommended":"Aanbevolen","cashPaymentDescription":"Geen vooruitbetaling. Betaal uw chauffeur rechtstreeks zodra u tevreden bent over de service.","quoteIncludes":"Inclusief: welkom, vluchttracking, parkeren, wachttijd en water.","perVehicleNote":"Per vehicle — not per person · Up to 7 passengers","confirmCashBooking":"Bevestig — betaal in het voertuig","flightTracking":"Realtime vluchtvolgend","fixedPrice":"Gegarandeerde vaste prijs","meetGreet":"Persoonlijk welkom","speakingDrivers":"Chauffeurs die Engels en Duits spreken","fromAirport":"Vanaf Antalya Luchthaven","welcomeEyebrow":"Welkom op het hoogste niveau","welcomeTitle":"Stijlvol reizen.<br />Ontspannen aankomen.","welcomeBody":"Vanaf uw landing is elk detail geregeld. Uw chauffeur wacht in de aankomsthal, zorgt voor uw bagage en begeleidt u naar uw zorgvuldig voorbereide privévoertuig.","ourStandards":"Onze servicestandaarden","concierge":"Conciërgeservice","guestsWelcomed":"Verwelkomde gasten","guestRating":"Gemiddelde gastbeoordeling","privateTransfers":"Privétransfers","fleetEyebrow":"Onze vloot","fleetTitle":"Uw privéruimte,<br />perfect tot in elk detail.","fleetIntro":"Reis comfortabel met ruimte voor familie, golfbagage en koffers.","signatureFleet":"Signature vloot","fleetVclassClass":"Business · First Class","fleetVclassDescription":"De maatstaf voor verfijnde groepsreizen: ruim, uitzonderlijk stil en uitgerust voor een probleemloze aankomst.","passengers":"passagiers","suitcases":"koffers","television":"Televisie in het voertuig","coldDrinks":"Koude dranken","snacks":"Snacks","childSeats":"Kinderzitjes op verzoek","wifi":"Gratis WiFi","nameSignGreeting":"Ontvangst met persoonlijk naambordje","reserveVehicle":"Voertuig reserveren","insideVclass":"In het Sprinter interieur","interiorTitle":"Een privélounge<br />tussen luchthaven en hotel.","serviceEyebrow":"De Antalya VIP-standaard","serviceTitle":"Meer dan een transfer.<br />Een bijzonder welkom.","serviceIntro":"Aandacht op hotelniveau, ervaren lokale chauffeurs en absolute gemoedsrust van luchthaven tot resort.","trackingTitle":"Vluchttracking","trackingBody":"We volgen uw vlucht in realtime en passen de ophaalafspraak automatisch en kosteloos aan.","chauffeurTitle":"Professionele chauffeurs","chauffeurBody":"Altijd verzorgd, discreet en geselecteerd op lokale kennis en hoogste servicestandaard.","greetTitle":"Meet & Greet","greetBody":"Uw chauffeur verwelkomt u in de aankomsthal met een naambordje en helpt met uw bagage.","supportTitle":"24/7 Conciërge","supportBody":"Voor, tijdens en na uw reis is er altijd iemand bereikbaar per telefoon of WhatsApp.","priceTitle":"Vaste prijzen","priceBody":"De bevestigde prijs is de definitieve prijs. Wachttijd, parkeren en vluchtvertragingen zijn inbegrepen.","familyTitle":"Voor gezinnen","familyBody":"Passende kinderzitjes, ruime interieurs en geduldige hulp voor een ontspannen familieaankomst.","routesEyebrow":"Onze populairste ritten","routesTitle":"Van Antalya Luchthaven<br />naar de Turkse Rivièra.","routesIntro":"Alle prijzen zijn per voertuig, nooit per persoon. Gratis wachttijd is inbegrepen.","golfFavourite":"Golfliefhebbersfavoriet","reviewsEyebrow":"Gastbeoordelingen","reviewsTitle":"Service die lang<br />bijblijft.","googleReviews":"Gebaseerd op 387 geverifieerde Google-beoordelingen","trustedBy":"Vertrouwd door gasten van toonaangevende resorts in Antalya","pricingEyebrow":"Zorgeloos reizen","pricingTitle":"Klantvriendelijke prijzen.<br />U betaalt wat eerlijk is.","pricingIntro":"We bieden vaste prijzen voor zekerheid, maar meten ook de werkelijke afstand. U betaalt altijd het laagste bedrag.","pricingFixedPrice":"Vaste prijs","fixedPriceExample":"Transfer naar Belek: €{{PRICE:belek:vito}}","fixedPriceDesc":"Gegarandeerd totaalbedrag. Inclusief luchthavengelden, parkeren, wachttijd en belastingen.","distancePrice":"Op afstand","distancePriceExample":"24 km online voorbeeld: €25","distancePriceDesc":"Gemeten met GPS tijdens uw rit.","youPay":"U betaalt","youPayPrice":"€25","youPayDesc":"Het laagste bedrag geldt. De chauffeur bevestigt dit aan het einde.","pricingNote":"Geen verrassingen. Geen verborgen kosten. Wat u boekt, betaalt u - of minder.","faqEyebrow":"Veelgestelde vragen","faqTitle":"Vóór uw reis.","faqIntro":"Alles wat u moet weten over uw privétransfer van de luchthaven Antalya.","askQuestion":"Stel een vraag","faqOneQ":"Wat gebeurt er bij een vluchtvertraging?","faqOneA":"We volgen elke aankomst in realtime. Uw ophaaltijd wordt automatisch aangepast en uw chauffeur wacht zonder meerprijs.","faqTwoQ":"Waar ontmoet ik mijn chauffeur?","faqTwoA":"Na het ophalen van uw bagage, verlaat de bagagehal en ga naar de Meet & Greet Area. Zoek naar ontmoetingspunt J / 777 — ons team wacht met een gepersonaliseerd naambordje.","faqThreeQ":"Zijn kinderzitjes beschikbaar?","faqThreeA":"Ja. Babyschalen, kinderzitjes en zitverhogers zijn bij vooraf boeken gratis beschikbaar.","faqFourQ":"Kunnen golfbags en groot bagage worden vervoerd?","faqFourA":"Ja. Sprinter en Vito zijn ideaal voor golfgroepen. Geef uw bagage op en wij plannen het juiste voertuig.","faqFiveQ":"Is de getoonde prijs definitief?","faqFiveA":"Ja. Luchthavengelden, parkeren, wachttijd en belastingen zijn inbegrepen. Geen verborgen kosten.","contactEyebrow":"Uw reis begint hier","contactTitle":"Buitengewoon goed<br />aankomen in Antalya.","contactBody":"Boek online in minder dan twee minuten of spreek direct met ons 24/7 conciërgeteam.","whatsappUs":"WhatsApp","replyMinutes":"Antwoord meestal binnen enkele minuten","callUs":"24/7 bellen","emailUs":"Conciërge e-mail","replyHour":"Antwoord binnen een uur","footerTagline":"Privé chauffeurservices aan de hele Turkse Rivièra.","explore":"Ontdekken","information":"Informatie","licensed":"Erkende privé-transferaanbieder · TÜRSAB-conform","bookingConfirmed":"Boeking bevestigd","referenceLabel":"Referentie","weWillContact":"Uw boekingsaanvraag is verzonden. We nemen binnen 30 minuten contact op.","chatWithUs":"Chat met ons","pickupAddressPlaceholder":"Hotelnaam, straat, huisnummer en wijk","dropoffAddressPlaceholder":"Hotelnaam, straat, huisnummer en wijk","hotelNamePlaceholder":"Naam van hotel of accommodatie","stepRoute":"Route","stepDetails":"Details","stepContact":"Contact","reserveForPrice":"Reserveren","continue":"Verder","back":"Terug","perVehicleNoteVito":"Per voertuig — niet per persoon · Tot 6 passagiers","perVehicleNoteSprinter":"Per voertuig — niet per persoon · Tot 12 passagiers","perVehicle":"per voertuig · vaste prijs","noPrePayment":"No prepayment required","payAfterTransfer":"Pay your driver after the transfer","requestQuote":"Prijsopgave aanvragen","cashConfirmation":"Uw boeking is bevestigd. Betaal het vaste bedrag rechtstreeks aan de chauffeur.","bookingError":"Uw boeking kon niet worden voltooid. Probeer het opnieuw.","formIncomplete":"Vul de gemarkeerde velden in.","requiredField":"Dit veld is verplicht.","destinationRequired":"Kies een bestemming.","dateInvalid":"Kies vandaag of een toekomstige datum.","emailInvalid":"Voer een geldig e-mailadres in.","nameInvalid":"Voer een geldige volledige naam in.","phoneInvalid":"Voer een geldig nummer met landcode in (bijvoorbeeld +49).","flightInvalid":"Voer een geldig vluchtnummer in.","pickupAddressRequired":"Het ophaaladres moet tussen 6 en 160 tekens lang zijn.","dropoffAddressRequired":"Het bestemmingsadres moet tussen 6 en 160 tekens lang zijn.","addressesMustDiffer":"Het ophaal- en bestemmingsadres moeten verschillen.","customDestinationPrice":"De prijs wordt bevestigd na controle van het bestemmingsadres.","hotelNameRequired":"Voer de hotelnaam in.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","quoteTitle":"Waar mogen wij u naartoe brengen?","date":"Datum","airportReturnPrice":"De prijs wordt bevestigd nadat het hotel of ophaaladres is gecontroleerd.","oneGuest":"1 gast","twoGuests":"2 gasten","threeGuests":"3 gasten","fourGuests":"4 gasten","fiveGuests":"5 gasten","sixGuests":"6 gasten","sevenGuests":"7 gasten","viewQuote":"Prijs bekijken","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Een ruime privécabine voor grotere families, golfgroepen en gasten met veel bagage.","capacitySwitchedSprinter":"Passagiers en bagage overschrijden de Vito — overgeschakeld naar Mercedes Sprinter.","capacityNoVehicle":"Zoveel passagiers en bagage overschrijdt onze voertuigen. Neem contact op via WhatsApp.","leatherSeats":"Premium leren stoelen","water":"Gekoeld mineraalwater","from":"Vanaf","reviewOne":"„Onze chauffeur wachtte ondanks 90 minuten vertraging. Het voertuig was onberispelijk, aangenaam koel en al uitgerust met beide kinderzitjes. Precies de ontvangst die onze familie nodig had.”","reviewTwo":"„Van het eerste WhatsApp-contact tot aankomst in Belek absoluut eersteklas. Punctueel, discreet en zeer professioneel. Ook onze golftassen pasten er gemakkelijk in.”","reviewThree":"„Dit voelde als een chauffeurservice van een hotel, niet als een luchthaventaxi. Duidelijke communicatie, een onberispelijk voertuig en een oprecht beleefde chauffeur.”","quoteReady":"Uw privétransfer","journeyTime":"Reistijd","totalFixed":"Totaalprijs","confirmWhatsapp":"Bevestigen via WhatsApp","bookNowCta":"Nu boeken","backToQuote":"Terug","yourDetails":"Uw gegevens","flightNumber":"Vluchtnummer","flightArrivalTime":"Aankomsttijd","notesLabel":"Speciale wensen","confirmBooking":"Boeking bevestigen","paySecurely":"Ga door naar veilig betalen","payLaterNote":"Veilige online betaling na bevestiging.","paymentTitle":"Veilige betaling","paymentError":"Betaling mislukt. Probeer het opnieuw."},"uk":{"navFleet":"Автопарк","navService":"Сервіс","navFairPricing":"Чесна ціна","navRoutes":"Маршрути","navReviews":"Відгуки","navContact":"Контакти","bookNow":"Забронювати","alwaysAvailable":"На зв'язку цілодобово, щодня","heroEyebrow":"Приватний шофер · Анталья","heroTitle":"Преміальний трансфер<br />з аеропорту Анталії","heroSubtitle":"Приватні трансфери з водієм з аеропорту Анталії до Белека, Сіде, Кемера та Аланії.","bookTransfer":"Замовити трансфер","instantQuote":"Дізнатися ціну","googleRated":"Рейтинг Google","trustedGuests":"Нам довіряють понад 2 500 гостей","discover":"Детальніше","tbLicensed":"Ліцензія TÜRSAB","tbFlightTracking":"Відстеження рейсу","tbFixedPrice":"Фіксована ціна","tb247Concierge":"Консьєрж 24/7","tbChildSeats":"Дитячі крісла в комплекті","privateJourney":"Ваша приватна поїздка","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Місце зустрічі","airportOption":"Аеропорт Анталії (AYT)","hotelOption":"Готель","privateAddressOption":"Приватна адреса","destination":"Напрямок","selectDestination":"Оберіть напрямок","vehicle":"Автомобіль","guests":"Гості","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Оберіть час","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Повна адреса подачі","dropoffAddress":"Повна адреса призначення","luggageLabel":"Великий багаж","hotelNameLabel":"Назва готелю","childSeatLabel":"Дитячі крісла","childSeatNone":"Без дитячого крісла","oneChildSeat":"1 дитяче крісло","twoChildSeats":"2 дитячі крісла","threeChildSeats":"3 дитячі крісла","fourChildSeats":"4 дитячі крісла","fullName":"Ім'я та прізвище","phoneLabel":"Телефон / WhatsApp","emailLabel":"Ел. пошта","paymentMethod":"Оберіть спосіб оплати","cashPayment":"Оплата в автомобілі","recommended":"Рекомендуємо","cashPaymentDescription":"Без передоплати. Сплатіть безпосередньо водієві, коли будете задоволені послугою.","quoteIncludes":"Включено: зустріч, відстеження рейсу, паркування, очікування та вода.","perVehicleNote":"Per vehicle — not per person · Up to 7 passengers","confirmCashBooking":"Підтвердити — оплата в автомобілі","flightTracking":"Відстеження рейсу в реальному часі","fixedPrice":"Гарантія фіксованої ціни","meetGreet":"Особиста зустріч","speakingDrivers":"Водії розмовляють англійською та німецькою","fromAirport":"З аеропорту Анталії","welcomeEyebrow":"Ласкаво просимо на найвищий рівень","welcomeTitle":"Подорожуйте стильно.<br />Прибувайте спокійно.","welcomeBody":"З моменту посадки вашого літака кожна деталь продумана. Шофер чекає на вас у залі прильоту, піклується про багаж і супроводжує вас до підготовленого автомобіля.","ourStandards":"Наші стандарти сервісу","concierge":"Підтримка консьєржа","guestsWelcomed":"Зустрінутих гостей","guestRating":"Середня оцінка гостей","privateTransfers":"Приватні трансфери","fleetEyebrow":"Наш автопарк","fleetTitle":"Ваш особистий простір,<br />бездоганний у деталях.","fleetIntro":"Подорожуйте в тиші та комфорті з місцем для сім'ї, багажу та обладнання для гольфу.","signatureFleet":"Фірмовий автопарк","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Еталон комфортних групових поїздок: просторий, надзвичайно тихий та оснащений для бездоганного прибуття.","passengers":"пасажирів","suitcases":"валіз","television":"Телевізор в автомобілі","coldDrinks":"Холодні напої","snacks":"Закуски","childSeats":"Дитячі крісла на запит","wifi":"Безкоштовний WiFi","nameSignGreeting":"Зустріч з іменною табличкою","reserveVehicle":"Забронювати автомобіль","insideVclass":"Салон Sprinter","interiorTitle":"Приватний лаунж<br />між аеропортом і готелем.","serviceEyebrow":"Стандарт Antalya VIP","serviceTitle":"Більше ніж трансфер.<br />Продумана зустріч.","serviceIntro":"Увага рівня п'ятизіркового готелю, досвідчені місцеві шофери та спокій від аеропорту до курорту.","trackingTitle":"Відстеження рейсу","trackingBody":"Ми відстежуємо ваш рейс у реальному часі та автоматично коригуємо час зустрічі без доплати.","chauffeurTitle":"Професійні шофери","chauffeurBody":"Завжди бездоганний вигляд, делікатність, знання регіону та найвищі стандарти обслуговування.","greetTitle":"Зустріч в аеропорту","greetBody":"Шофер зустріне вас у залі прильоту з табличкою з вашим ім'ям та допоможе з багажем.","supportTitle":"Консьєрж 24/7","supportBody":"До, під час і після поїздки вам завжди відповість людина по телефону або в WhatsApp.","priceTitle":"Фіксовані ціни","priceBody":"Підтверджена ціна є остаточною. Очікування, паркування та затримки рейсів вже включені.","familyTitle":"Для всієї родини","familyBody":"Дитячі крісла за віком, просторий салон та уважна допомога для спокійного сімейного прибуття.","routesEyebrow":"Найпопулярніші поїздки","routesTitle":"З аеропорту Анталії<br />на Турецьку Рив'єру.","routesIntro":"Всі ціни вказані за автомобіль, а не за пасажира. Безкоштовне очікування включено.","golfFavourite":"Вибір гравців у гольф","reviewsEyebrow":"Відгуки гостей","reviewsTitle":"Сервіс, який пам'ятають<br />після прибуття.","googleReviews":"На основі 387 підтверджених відгуків Google","trustedBy":"Нам довіряють гості провідних курортів Анталії","pricingEyebrow":"Спокій у дорозі","pricingTitle":"Ціни в інтересах клієнта.<br />Ви сплачуєте справедливу суму.","pricingIntro":"Ми пропонуємо фіксовані ціни для вашого спокою, але вимірюємо фактичну відстань. Ви завжди сплачуєте меншу суму.","pricingFixedPrice":"Фіксована ціна","fixedPriceExample":"Трансфер до Белека: {{PRICE:belek:vito}} €","fixedPriceDesc":"Гарантована загальна сума. Включає збори аеропорту, паркування, час очікування та податки.","distancePrice":"За відстанню","distancePriceExample":"24 км онлайн-приклад: 25 €","distancePriceDesc":"Вимірюється GPS під час поїздки.","youPay":"Ви сплачуєте","youPayPrice":"25 €","youPayDesc":"Діє менша сума. Водій підтвердить її наприкінці.","pricingNote":"Без сюрпризів. Без прихованих платежів. Ви сплачуєте суму з бронювання - або менше.","faqEyebrow":"Часті запитання","faqTitle":"Перед поїздкою.","faqIntro":"Все, що потрібно знати про приватний трансфер з аеропорту Анталії.","askQuestion":"Поставити запитання","faqOneQ":"Що станеться, якщо мій рейс затримається?","faqOneA":"Ми відстежуємо кожен рейс у реальному часі. Час зустрічі коригується автоматично, а водій чекає без доплати.","faqTwoQ":"Де я зустріну водія?","faqTwoA":"Після отримання багажу вийдіть із зони видачі та пройдіть до зони зустрічі (Meet & Greet). Знайдіть точку J / 777 — наша команда чекатиме з табличкою з вашим ім'ям.","faqThreeQ":"Чи є дитячі крісла?","faqThreeA":"Так. Автолюльки, дитячі крісла та бустери надаються безкоштовно на запит при бронюванні.","faqFourQ":"Чи можна перевезти сумки для гольфу та великий багаж?","faqFourA":"Так. Sprinter і Vito ідеально підходять для груп гравців у гольф. Повідомте об'єм багажу і ми підберемо автомобіль.","faqFiveQ":"Вказана ціна є остаточною?","faqFiveA":"Так. Аеропортові збори, паркування, очікування та податки включені. Прихованих платежів немає.","contactEyebrow":"Ваша подорож починається тут","contactTitle":"Прибудьте в Анталью<br />надзвичайно комфортно.","contactBody":"Забронюйте онлайн менш ніж за дві хвилини або зв'яжіться з нашою службою консьєржа 24/7.","whatsappUs":"Написати в WhatsApp","replyMinutes":"Зазвичай відповідаємо за кілька хвилин","callUs":"Зателефонувати 24/7","emailUs":"Написати консьєржу","replyHour":"Відповідь протягом години","footerTagline":"Приватні послуги шофера по всій Турецькій Рив'єрі.","explore":"Розділи","information":"Інформація","licensed":"Ліцензований оператор приватних трансферів · Відповідає вимогам TÜRSAB","bookingConfirmed":"Бронювання підтверджено","referenceLabel":"Референс","weWillContact":"Ваш запит на бронювання надіслано. Ми зв'яжемося з вами протягом 30 хвилин.","chatWithUs":"Написати нам","pickupAddressPlaceholder":"Назва готелю, вулиця, номер будинку та район","dropoffAddressPlaceholder":"Назва готелю, вулиця, номер будинку та район","hotelNamePlaceholder":"Назва готелю або місця проживання","stepRoute":"Маршрут","stepDetails":"Деталі","stepContact":"Контакт","reserveForPrice":"Забронювати","continue":"Продовжити","back":"Назад","perVehicleNoteVito":"За автомобіль — не за особу · До 6 пасажирів","perVehicleNoteSprinter":"За автомобіль — не за особу · До 12 пасажирів","perVehicle":"за автомобіль · фіксована ціна","noPrePayment":"No prepayment required","payAfterTransfer":"Pay your driver after the transfer","requestQuote":"Запросити розрахунок","cashConfirmation":"Бронювання підтверджено. Сплатіть фіксовану суму водієві в автомобілі.","bookingError":"Не вдалося завершити бронювання. Спробуйте ще раз.","formIncomplete":"Заповніть виділені поля.","requiredField":"Це поле обов'язкове.","destinationRequired":"Оберіть напрямок.","dateInvalid":"Оберіть сьогоднішню або майбутню дату.","emailInvalid":"Введіть дійсну електронну адресу.","nameInvalid":"Введіть дійсне повне ім'я.","phoneInvalid":"Введіть дійсний номер із кодом країни (наприклад, +49).","flightInvalid":"Введіть дійсний номер рейсу.","pickupAddressRequired":"Адреса подачі має містити від 6 до 160 символів.","dropoffAddressRequired":"Адреса призначення має містити від 6 до 160 символів.","addressesMustDiffer":"Адреси подачі та призначення мають відрізнятися.","customDestinationPrice":"Ціна буде підтверджена після перевірки адреси призначення.","hotelNameRequired":"Введіть назву готелю.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","hotelSearchHint":"Введіть назву готелю та оберіть її зі списку — регіон і ціну ми заповнимо за вас.","hotelNotListed":"Мого готелю немає у списку","hotelNoMatch":"Збігів поки немає. Введіть назву та оберіть регіон самостійно.","quoteTitle":"Куди вас відвезти?","date":"Дата","airportReturnPrice":"Ціну буде підтверджено після перевірки готелю або адреси подачі.","oneGuest":"1 гість","twoGuests":"2 гості","threeGuests":"3 гості","fourGuests":"4 гості","fiveGuests":"5 гостей","sixGuests":"6 гостей","sevenGuests":"7 гостей","viewQuote":"Показати ціну","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Просторий приватний салон для великих сімей, груп гравців у гольф та гостей з об'ємним багажем.","capacitySwitchedSprinter":"Пасажири та багаж перевищують Vito — обрано Mercedes Sprinter.","capacityNoVehicle":"Стільки пасажирів і багажу перевищує наші автомобілі. Напишіть нам у WhatsApp.","leatherSeats":"Преміальні шкіряні сидіння","water":"Охолоджена вода","from":"Від","reviewOne":"«Незважаючи на затримку рейсу на 90 хвилин, водій чекав на нас. Автомобіль був бездоганно чистим та прохолодним, а обидва дитячі крісла вже були встановлені. Саме така зустріч потрібна нашій родині».","reviewTwo":"«Від першого повідомлення в WhatsApp до прибуття в Белек все було на найвищому рівні. Пунктуально, делікатно і дуже професійно. Наші сумки для гольфу легко помістилися».","reviewThree":"«Це нагадувало трансфер від п'ятизіркового готелю, а не таксі з аеропорту. Чіткий зв'язок, бездоганний автомобіль та по-справжньому ввічливий водій».","quoteReady":"Ваш приватний трансфер","journeyTime":"Час у дорозі","totalFixed":"Підсумкова ціна","confirmWhatsapp":"Підтвердити в WhatsApp","bookNowCta":"Забронювати","backToQuote":"Назад","yourDetails":"Ваші дані","flightNumber":"Номер рейсу","flightArrivalTime":"Час прильоту","notesLabel":"Особливі побажання","confirmBooking":"Підтвердити бронювання","paySecurely":"Перейти до безпечної оплати","payLaterNote":"Оплата онлайн після підтвердження.","paymentTitle":"Безпечна оплата","paymentError":"Оплата не пройшла. Спробуйте ще раз."},"ur":{"navFleet":"گاڑیاں","navService":"خدمات","navFairPricing":"منصفانہ قیمتیں","navRoutes":"راستے","navReviews":"جائزے","navContact":"رابطہ","bookNow":"ابھی بک کریں","alwaysAvailable":"24 گھنٹے، ہر روز دستیاب","heroEyebrow":"نجی شوفر سروس · انطالیہ","heroTitle":"انطالیہ میں پریمیم<br />ایئرپورٹ ٹرانسفر","heroSubtitle":"انطالیہ ایئرپورٹ سے بیلک، سیدے، کیمر اور الانیا تک نجی شوفر سروس۔","bookTransfer":"ٹرانسفر بک کریں","instantQuote":"فوری قیمت جانیں","googleRated":"گوگل ریٹڈ","trustedGuests":"2,500+ مسافروں کا اعتماد","discover":"دریافت کریں","tbLicensed":"TÜRSAB لائسنس یافتہ","tbFlightTracking":"فلائٹ ٹریکنگ","tbFixedPrice":"مقررہ قیمت","tb247Concierge":"24/7 کنسیرج","tbChildSeats":"بچوں کی نشستیں شامل","privateJourney":"آپ کا نجی سفر","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"سفر کی قسم","oneWay":"ایک طرفہ","roundTrip":"آنا جانا","roundTripHint":"واپسی کا سفر اسی راستے سے ہوگا۔","pickup":"پک اپ","airportOption":"انطالیہ ایئرپورٹ (AYT)","hotelOption":"ہوٹل","privateAddressOption":"نجی پتہ","destination":"منزل","selectDestination":"منزل منتخب کریں","vehicle":"گاڑی","guests":"مسافر","arrivalDate":"آمد کی تاریخ","arrivalFlightTime":"فلائٹ آمد کا وقت","chooseTime":"وقت منتخب کریں","arrivalFlightNumber":"آمد کا فلائٹ نمبر","returnDate":"واپسی کی تاریخ","returnPickupTime":"واپسی کا پک اپ وقت","returnFlightNumber":"واپسی کا فلائٹ نمبر","pickupAddress":"پک اپ کا مکمل پتہ","dropoffAddress":"ڈراپ آف کا مکمل پتہ","luggageLabel":"بڑا سامان","hotelNameLabel":"ہوٹل کا نام","childSeatLabel":"بچوں کی نشستیں","childSeatNone":"کوئی بچوں کی نشست نہیں","oneChildSeat":"1 بچوں کی نشست","twoChildSeats":"2 بچوں کی نشستیں","threeChildSeats":"3 بچوں کی نشستیں","fourChildSeats":"4 بچوں کی نشستیں","fullName":"پورا نام","phoneLabel":"فون / واٹس ایپ","emailLabel":"ای میل","paymentMethod":"ادائیگی کا طریقہ منتخب کریں","cashPayment":"گاڑی میں ادائیگی","recommended":"تجویز کردہ","cashPaymentDescription":"پیشگی ادائیگی نہیں۔ سروس سے مطمئن ہونے پر اپنے ڈرائیور کو براہ راست ادا کریں۔","quoteIncludes":"میٹ اینڈ گریٹ، فلائٹ ٹریکنگ، پارکنگ، انتظار کا وقت اور بوتل بند پانی شامل ہے۔","perVehicleNote":"Per vehicle — not per person · Up to 7 passengers","confirmCashBooking":"بکنگ کی تصدیق کریں — گاڑی میں ادا کریں","flightTracking":"حقیقی وقت کی فلائٹ ٹریکنگ","fixedPrice":"مقررہ قیمت کی ضمانت","meetGreet":"ذاتی میٹ اینڈ گریٹ","speakingDrivers":"انگریزی اور جرمن بولنے والے","fromAirport":"انطالیہ ایئرپورٹ سے","welcomeEyebrow":"ایک بہتر آمد میں خوش آمدید","welcomeTitle":"خوبصورتی سے سفر کریں۔<br />آسانی سے پہنچیں۔","welcomeBody":"آپ کی فلائٹ لینڈ ہونے کے لمحے سے ہر تفصیل کا خیال رکھا جاتا ہے۔ آپ کا شوفر آمد پر انتظار کرتا ہے، آپ کا سامان اٹھاتا ہے اور آپ کو ایک بے عیب نجی گاڑی تک لے جاتا ہے۔","ourStandards":"ہمارے سروس معیارات","concierge":"کنسیرج سپورٹ","guestsWelcomed":"مسافروں کا استقبال","guestRating":"اوسط مسافر ریٹنگ","privateTransfers":"نجی ٹرانسفر","fleetEyebrow":"گاڑیاں","fleetTitle":"آپ کی نجی جگہ،<br />ہر تفصیل میں بہترین۔","fleetIntro":"اپنے خاندان، گولف کا سامان اور سامان کے لیے کافی جگہ کے ساتھ پرسکون آرام سے سفر کریں۔","signatureFleet":"سگنیچر فلیٹ","fleetVclassClass":"بزنس · فرسٹ کلاس","fleetVclassDescription":"بڑے گروپوں کے لیے کشادہ VIP ٹرانسپورٹ، مسافروں اور سامان کے لیے وافر جگہ کے ساتھ۔","passengers":"مسافر","suitcases":"سوٹ کیس","television":"گاڑی میں ٹیلی ویژن","coldDrinks":"ٹھنڈے مشروبات","snacks":"اسنیکس","childSeats":"بچوں کی نشست دستیاب","wifi":"مجانی WiFi","nameSignGreeting":"ذاتی نام کی تختی کے ساتھ میٹ اینڈ گریٹ","reserveVehicle":"یہ گاڑی بک کریں","insideVclass":"اسپرنٹر کے اندر","interiorTitle":"ایئرپورٹ اور آپ کے ہوٹل کے<br />درمیان ایک نجی لاؤنج۔","serviceEyebrow":"انطالیہ VIP معیار","serviceTitle":"صرف ٹرانسفر سے بڑھ کر۔<br />ایک سوچا سمجھا خیرمقدم۔","serviceIntro":"ہوٹل جیسی توجہ، تجربہ کار مقامی شوفر اور رن وے سے ریزورٹ تک مکمل سکون۔","trackingTitle":"فلائٹ ٹریکنگ","trackingBody":"ہم آپ کی فلائٹ کو حقیقی وقت میں مانیٹر کرتے ہیں اور آپ کا پک اپ خودکار طور پر ایڈجسٹ کرتے ہیں، بغیر کسی اضافی چارج کے۔","chauffeurTitle":"پیشہ ور شوفر","chauffeurBody":"بے داغ پیش کردہ، سمجھدار اور اپنی مقامی معلومات اور سروس معیارات کے لیے منتخب۔","greetTitle":"میٹ اینڈ گریٹ","greetBody":"آپ کا شوفر آمد پر ذاتی نام کی تختی کے ساتھ آپ کا استقبال کرے گا اور سامان میں مدد کرے گا۔","supportTitle":"24/7 کنسیرج","supportBody":"آپ کے سفر سے پہلے، دوران اور بعد میں ایک حقیقی شخص فون یا واٹس ایپ پر ہمیشہ دستیاب ہے۔","priceTitle":"مقررہ قیمتیں","priceBody":"تصدیق شدہ قیمت وہی ہے جو آپ ادا کرتے ہیں۔ انتظار کا وقت، پارکنگ اور فلائٹ میں تاخیر شامل ہے۔","familyTitle":"خاندان کے لیے تیار","familyBody":"عمر کے مطابق بچوں کی نشستیں، کشادہ کیبن اور پرسکون خاندانی آمد کے لیے صبر مند مدد۔","routesEyebrow":"ہمارے سب سے مطلوب سفر","routesTitle":"انطالیہ ایئرپورٹ سے<br />ترکی ریویرا تک۔","routesIntro":"تمام قیمتیں فی گاڑی ہیں، فی مسافر نہیں، مجانی انتظار کا وقت شامل ہے۔","golfFavourite":"گولف کا پسندیدہ","reviewsEyebrow":"مسافروں کے جائزے","reviewsTitle":"آمد کے بعد بھی یاد رہنے<br />والی سروس۔","googleReviews":"387 تصدیق شدہ گوگل جائزوں پر مبنی","trustedBy":"انطالیہ کے معروف ریزورٹس کے مسافروں کا اعتماد","pricingEyebrow":"ذہنی سکون","pricingTitle":"مسافر دوست قیمتیں۔<br />آپ وہی ادا کریں جو منصفانہ ہے۔","pricingIntro":"ہم ذہنی سکون کے لیے مقررہ قیمتیں پیش کرتے ہیں، لیکن اصل فاصلہ ناپتے ہیں۔ آپ ہمیشہ کم قیمت ادا کرتے ہیں۔","pricingFixedPrice":"مقررہ قیمت","fixedPriceExample":"بیلک ٹرانسفر: €{{PRICE:belek:vito}}","fixedPriceDesc":"ضمانت شدہ کل۔ ایئرپورٹ فیس، پارکنگ، انتظار کا وقت اور ٹیکس شامل ہیں۔","distancePrice":"فاصلے پر مبنی","distancePriceExample":"آن لائن 24 کلومیٹر مثال: €25","distancePriceDesc":"آپ کے سفر کے دوران GPS سے ناپا گیا۔","youPay":"آپ ادا کریں","youPayPrice":"€25","youPayDesc":"جو بھی کم ہو۔ ڈرائیور آخر میں تصدیق کرتا ہے۔","pricingNote":"کوئی حیرت نہیں۔ کوئی پوشیدہ چارج نہیں۔ جو بک کریں وہی ادا کریں — یا کم۔","faqEyebrow":"اکثر پوچھے گئے سوالات","faqTitle":"سفر سے پہلے۔","faqIntro":"اپنے نجی انطالیہ ایئرپورٹ ٹرانسفر کے بارے میں آپ کو جو کچھ جاننا ضروری ہے۔","askQuestion":"ہم سے سوال پوچھیں","faqOneQ":"اگر میری فلائٹ میں تاخیر ہو جائے تو کیا ہوگا؟","faqOneA":"ہم ہر آمد کو حقیقی وقت میں ٹریک کرتے ہیں۔ آپ کا پک اپ وقت خودکار طور پر ایڈجسٹ ہو جاتا ہے اور آپ کا شوفر بغیر کسی اضافی چارج کے انتظار کرے گا۔","faqTwoQ":"میں اپنے شوفر سے کہاں ملوں گا؟","faqTwoA":"سامان لینے کے بعد، میٹ اینڈ گریٹ ایریا میں نکلیں اور ملاقات کی جگہ J / 777 تلاش کریں۔ ہماری ٹیم ذاتی نام کی تختی کے ساتھ انتظار کر رہی ہوگی۔","faqThreeQ":"کیا بچوں کی نشستیں دستیاب ہیں؟","faqThreeA":"ہاں۔ بکنگ کے وقت درخواست کرنے پر شیر خوار، چھوٹے بچوں اور بوسٹر نشستیں مجانی دستیاب ہیں۔","faqFourQ":"کیا آپ گولف بیگ اور بڑا سامان لے جا سکتے ہیں؟","faqFourA":"ہاں۔ ہماری اسپرنٹر اور ویٹو گاڑیاں گولف گروپوں کے لیے موزوں ہیں۔ ہمیں اپنے سامان کی تفصیلات بتائیں اور ہم صحیح گاڑی مختص کریں گے۔","faqFiveQ":"کیا دی گئی قیمت حتمی ہے؟","faqFiveA":"ہاں۔ تمام ایئرپورٹ فیس، پارکنگ، انتظار کا وقت اور ٹیکس شامل ہیں۔ کوئی پوشیدہ چارج نہیں ہے۔","contactEyebrow":"آپ کا سفر یہاں سے شروع ہوتا ہے","contactTitle":"انطالیہ میں<br />شاندار طریقے سے پہنچیں۔","contactBody":"دو منٹ سے کم میں آن لائن بک کریں یا ہماری 24/7 کنسیرج ٹیم سے براہ راست بات کریں۔","whatsappUs":"واٹس ایپ کریں","replyMinutes":"عام طور پر منٹوں میں جواب دیتے ہیں","callUs":"24/7 کال کریں","emailUs":"کنسیرج کو ای میل کریں","replyHour":"ایک گھنٹے کے اندر جواب دیتے ہیں","footerTagline":"ترکی ریویرا میں نجی شوفر خدمات۔","explore":"دریافت کریں","information":"معلومات","licensed":"لائسنس یافتہ نجی ٹرانسفر آپریٹر · TÜRSAB تعمیل","bookingConfirmed":"بکنگ کی تصدیق ہو گئی","referenceLabel":"حوالہ","weWillContact":"آپ کی بکنگ کی درخواست بھیج دی گئی۔ ہم 30 منٹ کے اندر آپ سے رابطہ کریں گے۔","chatWithUs":"ہم سے چیٹ کریں","pickupAddressPlaceholder":"ہوٹل کا نام، گلی، عمارت نمبر اور علاقہ","dropoffAddressPlaceholder":"ہوٹل کا نام، گلی، عمارت نمبر اور علاقہ","hotelNamePlaceholder":"ہوٹل یا رہائش کا نام","stepRoute":"راستہ","stepDetails":"تفصیلات","stepContact":"رابطہ","reserveForPrice":"بک کریں","continue":"جاری رکھیں","back":"پیچھے","perVehicleNoteVito":"فی گاڑی — فی شخص نہیں · زیادہ سے زیادہ 6 مسافر","perVehicleNoteSprinter":"فی گاڑی — فی شخص نہیں · زیادہ سے زیادہ 12 مسافر","perVehicle":"فی گاڑی","noPrePayment":"No prepayment required","payAfterTransfer":"Pay your driver after the transfer","requestQuote":"قیمت کا اندازہ لگائیں","cashConfirmation":"آپ کی بکنگ کی تصدیق ہو گئی۔ گاڑی میں اپنے ڈرائیور کو مقررہ کل رقم براہ راست ادا کریں۔","bookingError":"آپ کی بکنگ مکمل نہیں ہو سکی۔ براہ کرم دوبارہ کوشش کریں۔","formIncomplete":"براہ کرم نمایاں شدہ خانے مکمل کریں۔","requiredField":"یہ خانہ ضروری ہے۔","destinationRequired":"براہ کرم ایک منزل منتخب کریں۔","dateInvalid":"براہ کرم آج یا مستقبل کی تاریخ منتخب کریں۔","emailInvalid":"براہ کرم ایک درست ای میل پتہ درج کریں۔","nameInvalid":"براہ کرم ایک درست پورا نام درج کریں۔","phoneInvalid":"براہ کرم ملک کوڈ کے ساتھ ایک درست نمبر درج کریں (مثال کے طور پر +92)۔","flightInvalid":"براہ کرم ایک درست فلائٹ نمبر درج کریں۔","pickupAddressRequired":"پک اپ کا پتہ 6 سے 160 حروف کے درمیان ہونا چاہیے۔","dropoffAddressRequired":"ڈراپ آف کا پتہ 6 سے 160 حروف کے درمیان ہونا چاہیے۔","addressesMustDiffer":"پک اپ اور ڈراپ آف کے پتے مختلف ہونے چاہئیں۔","customDestinationPrice":"ڈراپ آف پتہ جانچنے کے بعد قیمت کی تصدیق کی جائے گی۔","hotelNameRequired":"براہ کرم ہوٹل کا نام درج کریں۔","roundTripPriceNote":"آنا جانا · 2 سفر","returnDateRequired":"براہ کرم واپسی کی تاریخ منتخب کریں۔","returnDateInvalid":"براہ کرم جانے کے سفر پر یا اس کے بعد کی واپسی کی تاریخ منتخب کریں۔","returnTimeRequired":"براہ کرم واپسی کا پک اپ وقت منتخب کریں۔","dailyChauffeur":"روزانہ گاڑی + شوفر","days":"دن","dailyChauffeurHint":"بغیر کلومیٹر یا گھنٹے کی حد کے روزانہ کی بنیاد پر نجی گاڑی اور شوفر کرایہ پر لیں۔ ایندھن الگ ادا کیا جاتا ہے۔","serviceStartDate":"پہلی سروس کا دن","serviceEndDate":"آخری سروس کا دن","dailyPickupTime":"سروس شروع ہونے کا وقت","dailyPickupTimeRequired":"براہ کرم روزانہ سروس شروع ہونے کا وقت منتخب کریں۔","serviceEndDateRequired":"براہ کرم آخری سروس کا دن منتخب کریں۔","servicePeriodInvalid":"براہ کرم 1 سے 30 دن کے درمیان مدت منتخب کریں۔","arrivalFlightTimeOptional":"آمد کا فلائٹ وقت (اختیاری)","arrivalFlightNumberOptional":"آمد کا فلائٹ نمبر (اختیاری)","servicePrice":"سروس قیمت","fuelExcludedShort":"ایندھن شامل نہیں","fuelExcludedDetail":"ایندھن شامل نہیں ہے اور استعمال کے مطابق الگ ادا کیا جاتا ہے۔","departureFlightDate":"روانگی کی فلائٹ کی تاریخ","departureFlightTime":"روانگی کی فلائٹ کا وقت","departureFlightNumber":"روانگی کا فلائٹ نمبر","departureFlightDateRequired":"براہ کرم روانگی کی فلائٹ کی تاریخ منتخب کریں۔","departureFlightDateInvalid":"براہ کرم آج یا مستقبل کی تاریخ منتخب کریں۔","dailyQuoteIncludes":"بغیر کلومیٹر یا گھنٹے کی حد کے روزانہ شوفر سروس شامل ہے۔ ایندھن الگ ادا کیا جاتا ہے۔","reviewAndConfirm":"جائزہ لیں اور تصدیق کریں","fuelTermsTitle":"ایندھن کی شرائط","fuelTermsBody":"روزانہ شوفر سروس کے لیے، ایندھن کی لاگت شامل نہیں ہے۔ آپ ڈرائیور کو براہ راست استعمال شدہ ایندھن کی ادائیگی کریں گے۔","fuelTermsCheckbox":"میں سمجھتا/سمجھتی ہوں کہ ایندھن الگ ادا کیا جائے گا","cancel":"منسوخ کریں","close":"بند کریں","understandAndConfirm":"سمجھ گیا، تصدیق کریں","dailyCashConfirmation":"آپ کی روزانہ شوفر سروس کی بکنگ کی تصدیق ہو گئی۔ ہر دن کے اختتام پر اپنے ڈرائیور کو ادا کریں۔","hotelSearchHint":"اپنے ہوٹل کا نام لکھیں اور فہرست میں سے منتخب کریں؛ منزل کا علاقہ اور قیمت ہم خود بھر دیں گے۔","hotelNotListed":"میرا ہوٹل فہرست میں نہیں ہے","hotelNoMatch":"ابھی کوئی مماثلت نہیں۔ نام لکھیں اور علاقہ خود منتخب کریں۔","campaignBadge":"آن لائن خصوصی","campaignDiscount":"خصوصی قیمت","campaignScope":"تمام ٹرانسفر قیمتوں پر","campaignApplied":"آن لائن خصوصی قیمت لاگو ہو گئی","discountPricesShown":"آن لائن خصوصی قیمتیں دکھائی جا رہی ہیں","onlineDiscountShort":"آن لائن خصوصی قیمت","quoteTitle":"آپ کا کوٹ","date":"تاریخ","airportReturnPrice":"ایئرپورٹ واپسی قیمت","oneGuest":"1 مسافر","twoGuests":"2 مسافر","threeGuests":"3 مسافر","fourGuests":"4 مسافر","fiveGuests":"5 مسافر","sixGuests":"6 مسافر","sevenGuests":"7 مسافر","viewQuote":"کوٹ دیکھیں","fleetVitoClass":"پریمیم · VIP","fleetVitoDescription":"چھوٹے گروپوں کے لیے ایگزیکٹو VIP ٹرانسپورٹ، کشادہ اندرونی حصے اور پریمیم آرام کے ساتھ۔","capacitySwitchedSprinter":"8 یا اس سے زیادہ مسافروں کے لیے اسپرنٹر خودکار طور پر منتخب ہو گیا","capacityNoVehicle":"موجودہ مسافروں کے لیے کوئی گاڑی دستیاب نہیں","leatherSeats":"چمڑے کی نشستیں","water":"پانی","from":"سے","reviewOne":"ویٹو ڈرائیور وقت پر تھے، بہترین گاڑی، ہر چیز بہت اچھی طرح منظم تھی۔","reviewTwo":"شاندار سروس! ڈرائیور وقت پر تھا، گاڑی بالکل صاف تھی، اور سفر بہت آرام دہ تھا۔","reviewThree":"بہترین ٹرانسفر سروس جو ہم نے انطالیہ میں استعمال کی ہے۔ انتہائی پیشہ ورانہ اور قابل اعتماد۔","quoteReady":"آپ کا کوٹ تیار ہے","journeyTime":"سفر کا وقت","totalFixed":"کل مقررہ","confirmWhatsapp":"واٹس ایپ سے تصدیق کریں","bookNowCta":"ابھی بک کریں","backToQuote":"کوٹ پر واپس جائیں","yourDetails":"آپ کی تفصیلات","flightNumber":"فلائٹ نمبر","flightArrivalTime":"فلائٹ آمد کا وقت","notesLabel":"نوٹس","confirmBooking":"بکنگ کی تصدیق کریں","paySecurely":"محفوظ طریقے سے ادا کریں","payLaterNote":"گاڑی میں ادا کریں","paymentTitle":"ادائیگی","paymentError":"ادائیگی کی خرابی۔ براہ کرم دوبارہ کوشش کریں۔"},"fr":{"navFleet":"Véhicules","navService":"Service","navFairPricing":"Prix équitable","navRoutes":"Itinéraires","navReviews":"Avis","navContact":"Contact","bookNow":"Réserver","alwaysAvailable":"Disponible 24h/24, 7j/7","heroEyebrow":"Service chauffeur privé · Antalya","heroTitle":"Transferts aéroport premium<br />à Antalya","heroSubtitle":"Transferts privés avec chauffeur depuis l'aéroport d'Antalya vers Belek, Side, Kemer et Alanya.","bookTransfer":"Réserver un transfert","instantQuote":"Obtenir un devis","googleRated":"Note Google","trustedGuests":"Approuvé par plus de 2 500 clients","discover":"Découvrir","tbLicensed":"Agréé TÜRSAB","tbFlightTracking":"Suivi de vol","tbFixedPrice":"Prix fixe","tb247Concierge":"Conciergerie 24/7","tbChildSeats":"Sièges enfants inclus","privateJourney":"Votre voyage privé","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Lieu de prise en charge","airportOption":"Aéroport d’Antalya (AYT)","hotelOption":"Hôtel","privateAddressOption":"Adresse privée","destination":"Destination","selectDestination":"Choisir une destination","vehicle":"Véhicule","guests":"Passagers","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Choisir l'heure","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Adresse complète de prise en charge","dropoffAddress":"Adresse complète de destination","luggageLabel":"Gros bagages","hotelNameLabel":"Nom de l'hôtel","childSeatLabel":"Sièges enfant","childSeatNone":"Aucun siège enfant","oneChildSeat":"1 siège enfant","twoChildSeats":"2 sièges enfant","threeChildSeats":"3 sièges enfant","fourChildSeats":"4 sièges enfant","fullName":"Nom complet","phoneLabel":"Téléphone / WhatsApp","emailLabel":"E-mail","paymentMethod":"Choisissez le mode de paiement","cashPayment":"Payer dans le véhicule","recommended":"Recommandé","cashPaymentDescription":"Aucun prépaiement. Payez directement votre chauffeur une fois satisfait du service.","quoteIncludes":"Inclus : accueil, suivi de vol, parking, attente et eau minérale.","perVehicleNote":"Per vehicle — not per person · Up to 7 passengers","confirmCashBooking":"Confirmer — payer dans le véhicule","flightTracking":"Suivi de vol en temps réel","fixedPrice":"Prix fixe garanti","meetGreet":"Accueil personnalisé","speakingDrivers":"Chauffeurs parlant anglais et allemand","fromAirport":"Depuis l'aéroport d'Antalya","welcomeEyebrow":"Bienvenue au plus haut niveau","welcomeTitle":"Voyager avec élégance.<br />Arriver sereinement.","welcomeBody":"Dès votre atterrissage, chaque détail est organisé. Votre chauffeur vous attend dans le hall des arrivées, s'occupe de vos bagages et vous accompagne jusqu'à votre véhicule privé soigneusement préparé.","ourStandards":"Nos standards de service","concierge":"Service conciergerie","guestsWelcomed":"Clients accueillis","guestRating":"Note moyenne des clients","privateTransfers":"Transferts privés","fleetEyebrow":"Notre flotte","fleetTitle":"Votre espace privé,<br />parfait dans les moindres détails.","fleetIntro":"Voyagez confortablement avec suffisamment d'espace pour la famille, les équipements de golf et les valises.","signatureFleet":"Flotte Signature","fleetVclassClass":"Business · First Class","fleetVclassDescription":"La référence des voyages de groupe raffinés : spacieux, exceptionnellement silencieux et équipé pour une arrivée sans tracas.","passengers":"passagers","suitcases":"valises","television":"Télévision à bord","coldDrinks":"Boissons fraîches","snacks":"En-cas","childSeats":"Sièges enfants sur demande","wifi":"WiFi gratuit","nameSignGreeting":"Accueil avec pancarte nominative","reserveVehicle":"Réserver ce véhicule","insideVclass":"Intérieur Sprinter","interiorTitle":"Un salon privé<br />entre l'aéroport et l'hôtel.","serviceEyebrow":"La norme Antalya VIP","serviceTitle":"Plus qu'un transfert.<br />Un accueil d'exception.","serviceIntro":"Une attention digne d'un hôtel cinq étoiles, des chauffeurs locaux expérimentés et une tranquillité absolue de l'aéroport jusqu'au resort.","trackingTitle":"Suivi de vol","trackingBody":"Nous suivons votre vol en temps réel et ajustons automatiquement l'heure de prise en charge, sans frais supplémentaires.","chauffeurTitle":"Chauffeurs professionnels","chauffeurBody":"Toujours soignés, discrets et sélectionnés pour leur connaissance locale et leurs standards de service irréprochables.","greetTitle":"Accueil Meet & Greet","greetBody":"Après avoir récupéré vos bagages, rendez-vous dans la zone Meet & Greet J / 777. Notre équipe à l'aéroport identifiera votre réservation et vous mettra en contact avec votre chauffeur.","supportTitle":"Conciergerie 24/7","supportBody":"Avant, pendant et après votre voyage, une personne est toujours disponible par téléphone ou WhatsApp.","priceTitle":"Prix fixes","priceBody":"Le prix confirmé est le prix définitif. L'attente, le parking et les retards de vol sont inclus.","familyTitle":"Pour les familles","familyBody":"Sièges enfants adaptés, habitacles spacieux et aide patiente pour une arrivée familiale sereine.","routesEyebrow":"Nos trajets les plus populaires","routesTitle":"De l'aéroport d'Antalya<br />vers la Riviera turque.","routesIntro":"Tous les prix sont par véhicule, jamais par personne. L'attente gratuite est incluse.","golfFavourite":"Favori des golfeurs","reviewsEyebrow":"Avis clients","reviewsTitle":"Un service dont on<br />se souvient longtemps.","googleReviews":"Basé sur 387 avis Google vérifiés","trustedBy":"Recommandé par les clients des meilleurs resorts d'Antalya","pricingEyebrow":"Voyagez l'esprit tranquille","pricingTitle":"Une tarification pensée pour le client.<br />Vous payez le juste prix.","pricingIntro":"Nous proposons des prix fixes pour votre tranquillité, mais nous mesurons aussi la distance réelle. Vous payez toujours le montant le plus bas.","pricingFixedPrice":"Prix fixe","fixedPriceExample":"Transfert vers Belek : {{PRICE:belek:vito}} €","fixedPriceDesc":"Montant total garanti. Inclut les frais d'aéroport, le parking, l'attente et les taxes.","distancePrice":"Selon la distance","distancePriceExample":"Exemple en ligne 24 km : 25 €","distancePriceDesc":"Mesuré par GPS pendant votre trajet.","youPay":"Vous payez","youPayPrice":"25 €","youPayDesc":"Le montant le plus bas s'applique. Le chauffeur le confirme à la fin.","pricingNote":"Pas de surprise. Pas de frais cachés. Vous payez ce que vous réservez - ou moins.","faqEyebrow":"Questions fréquentes","faqTitle":"Avant votre voyage.","faqIntro":"Tout ce que vous devez savoir sur votre transfert privé depuis l'aéroport d'Antalya.","askQuestion":"Poser une question","faqOneQ":"Que se passe-t-il en cas de retard de vol ?","faqOneA":"Nous suivons chaque arrivée en temps réel. Votre heure de prise en charge est ajustée automatiquement et votre chauffeur attend sans surcoût.","faqTwoQ":"Où vais-je retrouver mon chauffeur ?","faqTwoA":"Après avoir récupéré vos bagages, quittez la zone de récupération et dirigez-vous vers la zone Meet & Greet. Cherchez le point de rencontre J / 777 — notre équipe vous attend avec une pancarte personnalisée.","faqThreeQ":"Des sièges enfants sont-ils disponibles ?","faqThreeA":"Oui. Coques bébé, sièges enfants et rehausseurs sont disponibles gratuitement sur réservation.","faqFourQ":"Pouvez-vous transporter des sacs de golf et des bagages volumineux ?","faqFourA":"Oui. Le Sprinter et le Vito sont idéaux pour les groupes de golfeurs. Précisez vos bagages et nous planifions le véhicule adapté.","faqFiveQ":"Le prix affiché est-il définitif ?","faqFiveA":"Oui. Les taxes aéroportuaires, le parking, l'attente et les impôts sont inclus. Aucun frais caché.","contactEyebrow":"Votre voyage commence ici","contactTitle":"Arriver à Antalya<br />de manière exceptionnelle.","contactBody":"Réservez en ligne en moins de deux minutes ou parlez directement avec notre équipe de conciergerie 24/7.","whatsappUs":"WhatsApp","replyMinutes":"Réponse généralement en quelques minutes","callUs":"Appeler 24/7","emailUs":"E-mail conciergerie","replyHour":"Réponse en moins d'une heure","footerTagline":"Services de chauffeur privé sur toute la Riviera turque.","explore":"Découvrir","information":"Informations","licensed":"Prestataire de transferts privés agréé · Conforme TÜRSAB","bookingConfirmed":"Réservation confirmée","referenceLabel":"Référence","weWillContact":"Votre demande de réservation a été envoyée. Nous vous contactons dans les 30 minutes.","chatWithUs":"Nous contacter","pickupAddressPlaceholder":"Nom de l'hôtel, rue, numéro et quartier","dropoffAddressPlaceholder":"Nom de l'hôtel, rue, numéro et quartier","hotelNamePlaceholder":"Nom de l'hôtel ou de l'hébergement","stepRoute":"Trajet","stepDetails":"Détails","stepContact":"Contact","reserveForPrice":"Réserver","continue":"Continuer","back":"Retour","perVehicleNoteVito":"Par véhicule — non par personne · Jusqu'à 6 passagers","perVehicleNoteSprinter":"Par véhicule — non par personne · Jusqu'à 12 passagers","perVehicle":"par véhicule · prix fixe","noPrePayment":"No prepayment required","payAfterTransfer":"Pay your driver after the transfer","requestQuote":"Demander un devis","cashConfirmation":"Votre réservation est confirmée. Réglez le montant fixe directement au chauffeur.","bookingError":"Votre réservation n'a pas pu être finalisée. Veuillez réessayer.","formIncomplete":"Veuillez compléter les champs indiqués.","requiredField":"Ce champ est obligatoire.","destinationRequired":"Veuillez choisir une destination.","dateInvalid":"Veuillez choisir aujourd'hui ou une date future.","emailInvalid":"Veuillez saisir une adresse e-mail valide.","nameInvalid":"Veuillez saisir un nom complet valide.","phoneInvalid":"Saisissez un numéro valide avec l’indicatif du pays (par exemple +49).","flightInvalid":"Veuillez saisir un numéro de vol valide.","pickupAddressRequired":"L'adresse de prise en charge doit contenir entre 6 et 160 caractères.","dropoffAddressRequired":"L'adresse de destination doit contenir entre 6 et 160 caractères.","addressesMustDiffer":"Les adresses de prise en charge et de destination doivent être différentes.","customDestinationPrice":"Le prix sera confirmé après vérification de l'adresse de destination.","hotelNameRequired":"Veuillez saisir le nom de l'hôtel.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","quoteTitle":"Où souhaitez-vous aller ?","date":"Date","airportReturnPrice":"Le prix sera confirmé après vérification de l’hôtel ou de l’adresse de prise en charge.","oneGuest":"1 passager","twoGuests":"2 passagers","threeGuests":"3 passagers","fourGuests":"4 passagers","fiveGuests":"5 passagers","sixGuests":"6 passagers","sevenGuests":"7 passagers","viewQuote":"Voir le tarif","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Un vaste habitacle privé pour les grandes familles, les groupes de golf et les voyageurs avec beaucoup de bagages.","capacitySwitchedSprinter":"Passagers et bagages dépassent le Vito — passage au Mercedes Sprinter.","capacityNoVehicle":"Autant de passagers et de bagages dépasse nos véhicules. Contactez-nous sur WhatsApp.","leatherSeats":"Sièges en cuir premium","water":"Eau minérale fraîche","from":"À partir de","reviewOne":"« Notre chauffeur a attendu malgré 90 minutes de retard. Le véhicule était impeccable, agréablement frais et déjà équipé des deux sièges enfants. Exactement l'accueil dont notre famille avait besoin. »","reviewTwo":"« Du premier contact WhatsApp à notre arrivée à Belek, absolument irréprochable. Ponctuel, discret et très professionnel. Nos sacs de golf ont aussi tenu sans problème. »","reviewThree":"« C'était comme un service de chauffeur d'hôtel, pas un taxi d'aéroport. Communication claire, véhicule impeccable et chauffeur sincèrement courtois. »","quoteReady":"Votre transfert privé","journeyTime":"Durée du trajet","totalFixed":"Prix total","confirmWhatsapp":"Confirmer via WhatsApp","bookNowCta":"Réserver maintenant","backToQuote":"Retour","yourDetails":"Vos coordonnées","flightNumber":"Numéro de vol","flightArrivalTime":"Heure d'arrivée","notesLabel":"Demandes spéciales","confirmBooking":"Confirmer la réservation","paySecurely":"Continuer vers le paiement sécurisé","payLaterNote":"Paiement en ligne sécurisé après confirmation.","paymentTitle":"Paiement sécurisé","paymentError":"Paiement échoué. Veuillez réessayer."},"sv":{"navFleet":"Fordon","navService":"Service","navFairPricing":"Rättvist pris","navRoutes":"Rutter","navReviews":"Recensioner","navContact":"Kontakt","bookNow":"Boka nu","alwaysAvailable":"Tillgänglig 24 timmar om dygnet","heroEyebrow":"Privat chaufförstjänst · Antalya","heroTitle":"Premium flygplatstransfers<br />i Antalya","heroSubtitle":"Privata transfers med chaufför från Antalya flygplats till Belek, Side, Kemer och Alanya.","bookTransfer":"Boka transfer","instantQuote":"Få pris direkt","googleRated":"Google-betyg","trustedGuests":"Anlitad av över 2 500 gäster","discover":"Utforska","tbLicensed":"TÜRSAB-licensierad","tbFlightTracking":"Flygspårning","tbFixedPrice":"Fast pris","tb247Concierge":"Concierge dygnet runt","tbChildSeats":"Bilbarnstolar ingår","privateJourney":"Din privata resa","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Hämtplats","airportOption":"Antalya flygplats (AYT)","hotelOption":"Hotell","privateAddressOption":"Privat adress","destination":"Destination","selectDestination":"Välj destination","vehicle":"Fordon","guests":"Gäster","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Välj tid","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Fullständig hämtningsadress","dropoffAddress":"Fullständig destinationsadress","luggageLabel":"Stort bagage","hotelNameLabel":"Hotellnamn","childSeatLabel":"Barnstolar","childSeatNone":"Ingen barnstol","oneChildSeat":"1 barnstol","twoChildSeats":"2 barnstolar","threeChildSeats":"3 barnstolar","fourChildSeats":"4 barnstolar","fullName":"Fullständigt namn","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-post","paymentMethod":"Välj betalningsmetod","cashPayment":"Betala i fordonet","recommended":"Rekommenderas","cashPaymentDescription":"Ingen förskottsbetalning. Betala din chaufför direkt när du är nöjd med tjänsten.","quoteIncludes":"Inkluderar: välkomnande, flygspårning, parkering, väntetid och mineralvatten.","perVehicleNote":"Per vehicle — not per person · Up to 7 passengers","confirmCashBooking":"Bekräfta — betala i fordonet","flightTracking":"Flygspårning i realtid","fixedPrice":"Garanterat fast pris","meetGreet":"Personlig välkomst","speakingDrivers":"Chaufförer som talar engelska och tyska","fromAirport":"Från Antalya flygplats","welcomeEyebrow":"Välkommen till högsta nivå","welcomeTitle":"Res med stil.<br />Anländ avslappnad.","welcomeBody":"Från det ögonblick ditt plan landar är varje detalj ordnad. Din chaufför väntar i ankomsthallen, tar hand om ditt bagage och eskorterar dig till ditt noggrant förberedda fordon.","ourStandards":"Våra servicestandarder","concierge":"Concierge-service","guestsWelcomed":"Välkomnade gäster","guestRating":"Genomsnittligt gästbetyg","privateTransfers":"Privata transfers","fleetEyebrow":"Vår flotta","fleetTitle":"Ditt privata utrymme,<br />perfekt i varje detalj.","fleetIntro":"Res bekvämt med gott om plats för familjen, golfbagaget och resväskorna.","signatureFleet":"Signature-flotta","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Riktmärket för sofistikerade gruppresor: rymlig, exceptionellt tyst och utrustad för en smidig ankomst.","passengers":"passagerare","suitcases":"resväskor","television":"TV i fordonet","coldDrinks":"Kalla drycker","snacks":"Snacks","childSeats":"Bilbarnstolar på begäran","wifi":"Gratis WiFi","nameSignGreeting":"Välkomnande med personlig namnskylt","reserveVehicle":"Boka fordon","insideVclass":"Sprinter interiör","interiorTitle":"En privat lounge<br />mellan flygplatsen och hotellet.","serviceEyebrow":"Antalya VIP-standarden","serviceTitle":"Mer än en transfer.<br />Ett exceptionellt välkomnande.","serviceIntro":"Uppmärksamhet på hotellnivå, erfarna lokala chaufförer och fullständigt lugn från flygplats till resort.","trackingTitle":"Flygspårning","trackingBody":"Vi spårar din flyg i realtid och anpassar automatiskt hämtningstiden utan extra kostnad.","chauffeurTitle":"Professionella chaufförer","chauffeurBody":"Alltid välvårdade, diskreta och utvalda för lokal kunskap och högsta servicestandard.","greetTitle":"Meet & Greet","greetBody":"Din chaufför välkomnar dig i ankomsthallen med en skylt med ditt namn och hjälper med bagaget.","supportTitle":"Concierge 24/7","supportBody":"Före, under och efter din resa finns alltid någon tillgänglig per telefon eller WhatsApp.","priceTitle":"Fasta priser","priceBody":"Det bekräftade priset är slutpriset. Väntetid, parkering och flygförseningar ingår.","familyTitle":"För familjer","familyBody":"Lämpliga bilbarnstolar, rymliga interiörer och tålmodig hjälp för en avslappnad familjeankomst.","routesEyebrow":"Våra populäraste rutter","routesTitle":"Från Antalya flygplats<br />till Turkiska Rivieran.","routesIntro":"Alla priser gäller per fordon, aldrig per person. Gratis väntetid ingår.","golfFavourite":"Golfarnas favorit","reviewsEyebrow":"Gästrecensioner","reviewsTitle":"Service som minns<br />länge efter ankomsten.","googleReviews":"Baserat på 387 verifierade Google-recensioner","trustedBy":"Anlitad av gäster på ledande resorts i Antalya","pricingEyebrow":"Res med lugn","pricingTitle":"Kundvänlig prissättning.<br />Du betalar det som är rättvist.","pricingIntro":"Vi erbjuder fasta priser för trygghet, men mäter även den faktiska sträckan. Du betalar alltid det lägre beloppet.","pricingFixedPrice":"Fast pris","fixedPriceExample":"Transfer till Belek: {{PRICE:belek:vito}} €","fixedPriceDesc":"Garanterat totalbelopp. Inkluderar flygplatsavgifter, parkering, väntetid och skatter.","distancePrice":"Efter sträcka","distancePriceExample":"24 km onlineexempel: 25 €","distancePriceDesc":"Mäts med GPS under din resa.","youPay":"Du betalar","youPayPrice":"25 €","youPayDesc":"Det lägre beloppet gäller. Chauffören bekräftar i slutet.","pricingNote":"Inga överraskningar. Inga dolda avgifter. Du betalar det du bokar - eller mindre.","faqEyebrow":"Vanliga frågor","faqTitle":"Innan din resa.","faqIntro":"Allt du behöver veta om din privata transfer från Antalya flygplats.","askQuestion":"Ställ en fråga","faqOneQ":"Vad händer vid en flygförsening?","faqOneA":"Vi spårar varje ankomst i realtid. Din hämtningstid justeras automatiskt och din chaufför väntar utan extra kostnad.","faqTwoQ":"Var möter jag min chaufför?","faqTwoA":"När du hämtat ditt bagage, lämna bagageutlämningen och gå till Meet & Greet-området. Leta efter mötespunkt J / 777 — vårt team väntar med en personlig namnbricka.","faqThreeQ":"Finns det bilbarnstolar?","faqThreeA":"Ja. Babyskydd, barnstolar och bälteskuddar finns tillgängliga utan extra kostnad vid förbeställning.","faqFourQ":"Kan golfbagar och stort bagage transporteras?","faqFourA":"Ja. Sprinter och Vito är idealiska för golfsällskap. Meddela oss om ditt bagage så planerar vi rätt fordon.","faqFiveQ":"Är det visade priset slutgiltigt?","faqFiveA":"Ja. Flygplatsavgifter, parkering, väntetid och skatter ingår. Inga dolda kostnader.","contactEyebrow":"Din resa börjar här","contactTitle":"Anländ till Antalya<br />på ett exceptionellt sätt.","contactBody":"Boka online på under två minuter eller prata direkt med vårt concierge-team dygnet runt.","whatsappUs":"WhatsApp","replyMinutes":"Svar vanligtvis inom några minuter","callUs":"Ring 24/7","emailUs":"Concierge e-post","replyHour":"Svar inom en timme","footerTagline":"Privata chaufförstjänster längs hela Turkiska Rivieran.","explore":"Utforska","information":"Information","licensed":"Licensierad privat transferoperatör · TÜRSAB-kompatibel","bookingConfirmed":"Bokning bekräftad","referenceLabel":"Referensnummer","weWillContact":"Din bokningsförfrågan har skickats. Vi kontaktar dig inom 30 minuter.","chatWithUs":"Chatta med oss","pickupAddressPlaceholder":"Hotellnamn, gata, husnummer och område","dropoffAddressPlaceholder":"Hotellnamn, gata, husnummer och område","hotelNamePlaceholder":"Hotell- eller boendenamn","stepRoute":"Rutt","stepDetails":"Detaljer","stepContact":"Kontakt","reserveForPrice":"Boka","continue":"Fortsätt","back":"Tillbaka","perVehicleNoteVito":"Per fordon — inte per person · Upp till 6 passagerare","perVehicleNoteSprinter":"Per fordon — inte per person · Upp till 12 passagerare","perVehicle":"per fordon · fast pris","noPrePayment":"No prepayment required","payAfterTransfer":"Pay your driver after the transfer","requestQuote":"Begär prisuppgift","cashConfirmation":"Din bokning är bekräftad. Betala det fasta beloppet direkt till chauffören.","bookingError":"Bokningen kunde inte slutföras. Försök igen.","formIncomplete":"Fyll i de markerade fälten.","requiredField":"Detta fält är obligatoriskt.","destinationRequired":"Välj en destination.","dateInvalid":"Välj dagens datum eller ett framtida datum.","emailInvalid":"Ange en giltig e-postadress.","nameInvalid":"Ange ett giltigt fullständigt namn.","phoneInvalid":"Ange ett giltigt nummer med landskod (till exempel +49).","flightInvalid":"Ange ett giltigt flightnummer.","pickupAddressRequired":"Hämtningsadressen måste vara mellan 6 och 160 tecken.","dropoffAddressRequired":"Destinationsadressen måste vara mellan 6 och 160 tecken.","addressesMustDiffer":"Hämtnings- och destinationsadressen måste vara olika.","customDestinationPrice":"Priset bekräftas efter att destinationsadressen kontrollerats.","hotelNameRequired":"Ange hotellnamnet.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","quoteTitle":"Vart vill du åka?","date":"Datum","airportReturnPrice":"Priset bekräftas efter att hotellet eller hämtningsadressen har kontrollerats.","oneGuest":"1 gäst","twoGuests":"2 gäster","threeGuests":"3 gäster","fourGuests":"4 gäster","fiveGuests":"5 gäster","sixGuests":"6 gäster","sevenGuests":"7 gäster","viewQuote":"Visa pris","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"En rymlig privat kabin för större familjer, golfsällskap och gäster med mycket bagage.","capacitySwitchedSprinter":"Passagerare och bagage överstiger Vito — bytte till Mercedes Sprinter.","capacityNoVehicle":"Så många passagerare och bagage överstiger våra fordon. Kontakta oss på WhatsApp.","leatherSeats":"Premium läderstolar","water":"Kylt mineralvatten","from":"Från","reviewOne":"„Vår chaufför väntade trots 90 minuters försening. Fordonet var makulöst, behagligt svalt och redan utrustat med båda barnstolarna. Precis det välkomnande vår familj behövde.”","reviewTwo":"„Från första WhatsApp-kontakten till ankomst i Belek absolut förstklassigt. Punktlig, diskret och mycket professionell. Våra golfbagar fick också plats utan problem.”","reviewThree":"„Det kändes som en chaufförstjänst från ett hotell, inte en flygplatstaxibil. Tydlig kommunikation, ett makulöst fordon och en genuint artig chaufför.”","quoteReady":"Din privata transfer","journeyTime":"Restid","totalFixed":"Totalt pris","confirmWhatsapp":"Bekräfta via WhatsApp","bookNowCta":"Boka nu","backToQuote":"Tillbaka","yourDetails":"Dina uppgifter","flightNumber":"Flygnummer","flightArrivalTime":"Ankomsttid","notesLabel":"Särskilda önskemål","confirmBooking":"Bekräfta bokning","paySecurely":"Fortsätt till säker betalning","payLaterNote":"Säker onlinebetalning efter bekräftelse.","paymentTitle":"Säker betalning","paymentError":"Betalning misslyckades. Försök igen."},"ja":{"navFleet":"車両","navService":"サービス","navFairPricing":"適正価格","navRoutes":"ルート","navReviews":"口コミ","navContact":"お問い合わせ","bookNow":"今すぐ予約","alwaysAvailable":"年中無休・24時間対応","heroEyebrow":"プライベートショーファーサービス · アンタルヤ","heroTitle":"アンタルヤ空港からの<br />プレミアム送迎サービス","heroSubtitle":"アンタルヤ空港からベレック、シデ、ケメル、アランヤへ専属ショーファー付きプライベート送迎。","bookTransfer":"送迎を予約する","instantQuote":"料金を確認する","googleRated":"Google評価","trustedGuests":"2,500名以上のお客様にご利用いただいています","discover":"詳しく見る","tbLicensed":"TÜRSAB認可","tbFlightTracking":"フライト追跡","tbFixedPrice":"固定料金","tb247Concierge":"24時間コンシェルジュ","tbChildSeats":"チャイルドシート込み","privateJourney":"あなただけのプライベートな旅","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"お迎え場所","airportOption":"アンタルヤ空港 (AYT)","hotelOption":"ホテル","privateAddressOption":"個人住所","destination":"目的地","selectDestination":"目的地を選択","vehicle":"車両","guests":"ご利用人数","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"時間を選択","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"お迎え先の詳しい住所","dropoffAddress":"目的地の詳しい住所","luggageLabel":"大型荷物","hotelNameLabel":"ホテル名","childSeatLabel":"チャイルドシート","childSeatNone":"チャイルドシート不要","oneChildSeat":"チャイルドシート 1台","twoChildSeats":"チャイルドシート 2台","threeChildSeats":"チャイルドシート 3台","fourChildSeats":"チャイルドシート 4台","fullName":"氏名","phoneLabel":"電話 / WhatsApp","emailLabel":"メールアドレス","paymentMethod":"お支払い方法を選択","cashPayment":"車内で支払う","recommended":"おすすめ","cashPaymentDescription":"事前のお支払いは不要です。サービスにご満足いただいてから、ドライバーへ直接お支払いください。","quoteIncludes":"ミート＆グリート、フライト追跡、駐車料金、待機時間、ミネラルウォーター込み。","perVehicleNote":"Per vehicle — not per person · Up to 7 passengers","confirmCashBooking":"予約確定 — 車内払い","flightTracking":"リアルタイムフライト追跡","fixedPrice":"料金固定保証","meetGreet":"ミート＆グリートサービス","speakingDrivers":"英語・ドイツ語対応ショーファー","fromAirport":"アンタルヤ空港から","welcomeEyebrow":"最高水準のサービスへようこそ","welcomeTitle":"上質な旅を。<br />安心してご到着を。","welcomeBody":"着陸の瞬間から、すべての細部が整っています。ショーファーが到着ロビーでお待ちし、お荷物をお預かりして、丁寧に準備された専用車両へとご案内します。","ourStandards":"私たちのサービス基準","concierge":"コンシェルジュサービス","guestsWelcomed":"お迎えしたゲスト数","guestRating":"ゲスト平均評価","privateTransfers":"プライベート送迎","fleetEyebrow":"車両ラインナップ","fleetTitle":"あなただけのプライベート空間。<br />細部まで完璧に。","fleetIntro":"ご家族、ゴルフ用具、荷物のための十分なスペースを備えた快適な移動をお楽しみください。","signatureFleet":"シグネチャーフリート","fleetVclassClass":"ビジネス · ファーストクラス","fleetVclassDescription":"洗練されたグループ旅行の基準。広々とした車内、卓越した静粛性、シームレスなご到着のための装備が揃っています。","passengers":"名","suitcases":"個のスーツケース","television":"車内テレビ","coldDrinks":"冷たいお飲み物","snacks":"スナック","childSeats":"チャイルドシート（ご要望に応じて）","wifi":"無料WiFi","nameSignGreeting":"お名前ボードでのお出迎え","reserveVehicle":"この車両を予約する","insideVclass":"Sprinterインテリア","interiorTitle":"空港とホテルの間の<br />プライベートラウンジ。","serviceEyebrow":"Antalya VIPスタンダード","serviceTitle":"送迎以上のもの。<br />特別なお出迎え。","serviceIntro":"5つ星ホテルレベルのアテンション、経験豊富な地元ショーファー、空港からリゾートまでの完全な安心感。","trackingTitle":"フライト追跡","trackingBody":"フライトをリアルタイムで追跡し、追加料金なしでお迎え時間を自動的に調整します。","chauffeurTitle":"プロフェッショナルショーファー","chauffeurBody":"常に清潔感があり、思いやりがあり、地元知識と最高のサービス基準のために厳選されています。","greetTitle":"ミート＆グリート","greetBody":"ショーファーはお名前のボードを持って到着ロビーでお出迎えし、お荷物をお手伝いします。","supportTitle":"24/7コンシェルジュ","supportBody":"旅の前・中・後、いつでも電話またはWhatsAppでご対応いたします。","priceTitle":"料金固定","priceBody":"確認された料金が最終料金です。待機時間、駐車料金、フライト遅延はすべて含まれています。","familyTitle":"ご家族向け","familyBody":"年齢に合ったチャイルドシート、広々とした車内、ご家族の安心到着のための丁寧なサポート。","routesEyebrow":"人気のルート","routesTitle":"アンタルヤ空港から<br />トルコリビエラへ。","routesIntro":"すべての料金は車両ごと（お一人様ではありません）。無料待機時間込み。","golfFavourite":"ゴルファーに人気","reviewsEyebrow":"お客様の声","reviewsTitle":"到着後も語り継がれる<br />サービス。","googleReviews":"387件のGoogle認証レビューに基づく","trustedBy":"アンタルヤの一流リゾートのゲストにご利用いただいています","pricingEyebrow":"安心してご利用いただけます","pricingTitle":"お客様にやさしい料金設定。<br />公平な金額だけをお支払い。","pricingIntro":"安心のため固定料金をご提示しつつ、実際の走行距離も計測します。お支払いは常に低い方の金額です。","pricingFixedPrice":"固定料金","fixedPriceExample":"ベレキ送迎：{{PRICE:belek:vito}} €","fixedPriceDesc":"保証された総額です。空港料金、駐車料金、待機時間、税金が含まれます。","distancePrice":"距離ベース","distancePriceExample":"24 km online example: 25 €","distancePriceDesc":"ご乗車中にGPSで計測します。","youPay":"お支払い額","youPayPrice":"25 €","youPayDesc":"低い方の金額を適用します。終了時にドライバーが確認します。","pricingNote":"追加の驚きはありません。隠れた料金もありません。予約時の金額、またはそれより少ない金額をお支払いいただきます。","faqEyebrow":"よくある質問","faqTitle":"ご旅行の前に。","faqIntro":"アンタルヤ空港からのプライベート送迎について知っておくべきこと。","askQuestion":"質問する","faqOneQ":"フライトが遅延した場合はどうなりますか？","faqOneA":"すべての到着便をリアルタイムで追跡しています。お迎え時間は自動的に調整され、ショーファーは追加料金なしでお待ちします。","faqTwoQ":"ショーファーはどこで待っていますか？","faqTwoA":"手荷物を受け取った後、手荷物受取所を出てミート＆グリートエリアへお進みください。J / 777の待合せポイントをお探しください — スタッフがお名前の書かれたボードを持ってお待ちしています。","faqThreeQ":"チャイルドシートはありますか？","faqThreeA":"はい。乳幼児用、チャイルドシート、ジュニアシートは予約時にご要望いただければ無料でご用意します。","faqFourQ":"ゴルフバッグや大きな荷物は運べますか？","faqFourA":"はい。SprinterとVitoはゴルフグループに最適です。荷物の詳細をお知らせいただければ、適切な車両をご手配します。","faqFiveQ":"表示された料金は確定ですか？","faqFiveA":"はい。空港税、駐車料金、待機時間、税金はすべて含まれています。隠れた費用はありません。","contactEyebrow":"旅はここから始まります","contactTitle":"アンタルヤへ<br />格別の到着を。","contactBody":"2分以内にオンライン予約、または24/7コンシェルジュチームに直接お問い合わせください。","whatsappUs":"WhatsApp","replyMinutes":"通常数分以内に返信","callUs":"24/7電話","emailUs":"コンシェルジュメール","replyHour":"1時間以内に返信","footerTagline":"トルコリビエラ全域のプライベートショーファーサービス。","explore":"探索する","information":"情報","licensed":"認定プライベート送迎事業者 · TÜRSAB準拠","bookingConfirmed":"予約確定","referenceLabel":"予約番号","weWillContact":"予約リクエストを送信しました。30分以内にご連絡いたします。","chatWithUs":"チャットする","pickupAddressPlaceholder":"ホテル名、通り、建物番号、地区","dropoffAddressPlaceholder":"ホテル名、通り、建物番号、地区","hotelNamePlaceholder":"ホテルまたは宿泊施設名","stepRoute":"ルート","stepDetails":"詳細","stepContact":"連絡先","reserveForPrice":"予約する","continue":"続ける","back":"戻る","perVehicleNoteVito":"1台あたり — 1人あたりではありません · 最大6名","perVehicleNoteSprinter":"1台あたり — 1人あたりではありません · 最大12名","perVehicle":"車両ごと · 固定料金","noPrePayment":"No prepayment required","payAfterTransfer":"Pay your driver after the transfer","requestQuote":"見積もりを依頼","cashConfirmation":"予約が確定しました。固定料金を車内でドライバーへ直接お支払いください。","bookingError":"予約を完了できませんでした。もう一度お試しください。","formIncomplete":"表示された必須項目を入力してください。","requiredField":"この項目は必須です。","destinationRequired":"目的地を選択してください。","dateInvalid":"今日または今後の日付を選択してください。","emailInvalid":"有効なメールアドレスを入力してください。","nameInvalid":"有効な氏名を入力してください。","phoneInvalid":"国番号を含む有効な電話番号を入力してください（例：+49）。","flightInvalid":"有効なフライト番号を入力してください。","pickupAddressRequired":"お迎え先の住所は6文字以上160文字以内で入力してください。","dropoffAddressRequired":"目的地の住所は6文字以上160文字以内で入力してください。","addressesMustDiffer":"お迎え先と目的地には異なる住所を入力してください。","customDestinationPrice":"目的地の住所を確認後、料金をご案内いたします。","hotelNameRequired":"ホテル名を入力してください。","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","quoteTitle":"目的地をお知らせください","date":"日付","airportReturnPrice":"ホテルまたはお迎え先住所の確認後に料金をご案内します。","oneGuest":"1名","twoGuests":"2名","threeGuests":"3名","fourGuests":"4名","fiveGuests":"5名","sixGuests":"6名","sevenGuests":"7名","viewQuote":"料金を見る","fleetVitoClass":"VIP · グランドツーリング","fleetVitoDescription":"大家族、ゴルフグループ、大量の荷物をお持ちのゲストのための広々としたプライベートキャビン。","capacitySwitchedSprinter":"乗客と荷物がVitoの容量を超えています — メルセデス・スプリンターに変更しました。","capacityNoVehicle":"この人数と荷物は当社の車両を超えています。WhatsAppでお問い合わせください。","leatherSeats":"プレミアムレザーシート","water":"冷えたミネラルウォーター","from":"から","reviewOne":"「90分のフライト遅延にもかかわらず、ドライバーは待ってくれました。車両は完璧に清潔で心地よく冷えており、チャイルドシートも両方設置済みでした。家族が必要としていたまさにそのお出迎えでした。」","reviewTwo":"「最初のWhatsAppのやり取りからベレックへの到着まで、すべてが最高でした。時間通り、控えめで、とてもプロフェッショナル。ゴルフバッグも余裕で収まりました。」","reviewThree":"「空港タクシーではなく、ホテルのショーファーサービスのようでした。明確なコミュニケーション、完璧な車両、そして心から礼儀正しいドライバー。」","quoteReady":"あなたのプライベート送迎","journeyTime":"所要時間","totalFixed":"合計料金","confirmWhatsapp":"WhatsAppで確認する","bookNowCta":"今すぐ予約","backToQuote":"戻る","yourDetails":"お客様情報","flightNumber":"フライト番号","flightArrivalTime":"到着時刻","notesLabel":"特別なご要望","confirmBooking":"予約を確定する","paySecurely":"安全なお支払いへ進む","payLaterNote":"確認後にオンラインで安全にお支払い。","paymentTitle":"安全なお支払い","paymentError":"お支払いに失敗しました。もう一度お試しください。"},"ko":{"navFleet":"차량","navService":"서비스","navFairPricing":"공정한 요금","navRoutes":"노선","navReviews":"리뷰","navContact":"문의","bookNow":"지금 예약","alwaysAvailable":"연중무휴 24시간 운영","heroEyebrow":"프라이빗 쇼퍼 서비스 · 안탈리아","heroTitle":"안탈리아 공항에서<br />프리미엄 공항 픽업 서비스","heroSubtitle":"안탈리아 공항에서 벨렉, 시데, 케메르, 알란야까지 전담 쇼퍼와 함께하는 프라이빗 이동.","bookTransfer":"셔틀 예약하기","instantQuote":"요금 확인하기","googleRated":"Google 평점","trustedGuests":"2,500명 이상의 고객이 이용했습니다","discover":"자세히 보기","tbLicensed":"TÜRSAB 인증","tbFlightTracking":"항공편 추적","tbFixedPrice":"고정 요금","tb247Concierge":"24/7 컨시어지","tbChildSeats":"카시트 포함","privateJourney":"나만의 프라이빗 여행","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"픽업 장소","airportOption":"안탈리아 공항 (AYT)","hotelOption":"호텔","privateAddressOption":"개인 주소","destination":"목적지","selectDestination":"목적지 선택","vehicle":"차량","guests":"인원","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"시간 선택","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"전체 픽업 주소","dropoffAddress":"전체 목적지 주소","luggageLabel":"대형 수하물","hotelNameLabel":"호텔명","childSeatLabel":"어린이 좌석","childSeatNone":"어린이 좌석 없음","oneChildSeat":"어린이 좌석 1개","twoChildSeats":"어린이 좌석 2개","threeChildSeats":"어린이 좌석 3개","fourChildSeats":"어린이 좌석 4개","fullName":"성명","phoneLabel":"전화 / WhatsApp","emailLabel":"이메일","paymentMethod":"결제 방법 선택","cashPayment":"차량에서 결제","recommended":"추천","cashPaymentDescription":"선결제는 필요 없습니다. 서비스에 만족하신 후 기사에게 직접 결제하세요.","quoteIncludes":"미트 앤 그리트, 항공편 추적, 주차비, 대기 시간, 생수 포함.","perVehicleNote":"Per vehicle — not per person · Up to 7 passengers","confirmCashBooking":"예약 확정 — 차량에서 결제","flightTracking":"실시간 항공편 추적","fixedPrice":"고정 요금 보장","meetGreet":"미트 앤 그리트 서비스","speakingDrivers":"영어·독일어 가능 쇼퍼","fromAirport":"안탈리아 공항에서","welcomeEyebrow":"최고 수준의 서비스에 오신 것을 환영합니다","welcomeTitle":"품격 있게 이동하세요.<br />편안하게 도착하세요.","welcomeBody":"착륙하는 순간부터 모든 세부 사항이 준비되어 있습니다. 쇼퍼가 도착 로비에서 기다리며 수하물을 챙기고 세심하게 준비된 전용 차량으로 안내해 드립니다.","ourStandards":"저희 서비스 기준","concierge":"컨시어지 서비스","guestsWelcomed":"환영한 고객 수","guestRating":"평균 고객 평점","privateTransfers":"프라이빗 이동","fleetEyebrow":"차량 라인업","fleetTitle":"나만의 프라이빗 공간,<br />세부 사항까지 완벽하게.","fleetIntro":"가족, 골프 장비, 여행 가방을 위한 충분한 공간을 갖춘 편안한 이동을 경험하세요.","signatureFleet":"시그니처 플릿","fleetVclassClass":"비즈니스 · 퍼스트클래스","fleetVclassDescription":"정교한 그룹 여행의 기준. 넓고, 탁월하게 조용하며, 원활한 도착을 위한 장비를 갖추고 있습니다.","passengers":"명","suitcases":"개의 캐리어","television":"차량 내 TV","coldDrinks":"차가운 음료","snacks":"스낵","childSeats":"요청 시 카시트 제공","wifi":"무료 WiFi","nameSignGreeting":"이름 팻말을 든 맞춤 영접","reserveVehicle":"이 차량 예약하기","insideVclass":"Sprinter 인테리어","interiorTitle":"공항과 호텔 사이의<br />프라이빗 라운지.","serviceEyebrow":"Antalya VIP 기준","serviceTitle":"단순한 이동 그 이상.<br />특별한 환영.","serviceIntro":"5성급 호텔 수준의 세심한 배려, 경험 풍부한 현지 쇼퍼, 공항에서 리조트까지 완전한 안심.","trackingTitle":"항공편 추적","trackingBody":"항공편을 실시간으로 추적하여 추가 비용 없이 픽업 시간을 자동으로 조정합니다.","chauffeurTitle":"전문 쇼퍼","chauffeurBody":"항상 단정하고 신중하며, 현지 지식과 최고 서비스 기준으로 선별된 전문가들입니다.","greetTitle":"미트 앤 그리트","greetBody":"쇼퍼가 이름이 적힌 팻말을 들고 도착 로비에서 환영하며 수하물을 도와드립니다.","supportTitle":"24/7 컨시어지","supportBody":"여행 전, 중, 후 언제든지 전화 또는 WhatsApp으로 담당자와 연결됩니다.","priceTitle":"고정 요금","priceBody":"확인된 요금이 최종 요금입니다. 대기 시간, 주차비, 항공편 지연이 모두 포함됩니다.","familyTitle":"가족을 위한","familyBody":"연령에 맞는 카시트, 넓은 실내, 편안한 가족 도착을 위한 세심한 도움.","routesEyebrow":"인기 노선","routesTitle":"안탈리아 공항에서<br />터키 리비에라까지.","routesIntro":"모든 요금은 차량 기준(1인 기준 아님)입니다. 무료 대기 시간 포함.","golfFavourite":"골퍼들의 인기 선택","reviewsEyebrow":"고객 후기","reviewsTitle":"도착 후에도 오래 기억되는<br />서비스.","googleReviews":"387건의 Google 인증 리뷰 기준","trustedBy":"안탈리아 주요 리조트 고객들이 선택했습니다","pricingEyebrow":"안심 요금","pricingTitle":"고객 친화적인 요금.<br />공정한 금액만 결제하세요.","pricingIntro":"안심하실 수 있도록 고정 요금을 제시하지만 실제 이동 거리도 측정합니다. 언제나 더 낮은 금액을 결제합니다.","pricingFixedPrice":"고정 요금","fixedPriceExample":"벨렉 이동: {{PRICE:belek:vito}} €","fixedPriceDesc":"보장된 총액입니다. 공항 수수료, 주차비, 대기 시간, 세금이 포함됩니다.","distancePrice":"거리 기준","distancePriceExample":"24 km online example: 25 €","distancePriceDesc":"이동 중 GPS로 측정합니다.","youPay":"결제 금액","youPayPrice":"25 €","youPayDesc":"더 낮은 금액이 적용됩니다. 종료 시 기사가 확인합니다.","pricingNote":"놀랄 일도, 숨겨진 비용도 없습니다. 예약한 금액을 결제하거나 그보다 적게 결제합니다.","faqEyebrow":"자주 묻는 질문","faqTitle":"여행 전에.","faqIntro":"안탈리아 공항 프라이빗 픽업에 대해 알아야 할 모든 것.","askQuestion":"질문하기","faqOneQ":"항공편이 지연되면 어떻게 되나요?","faqOneA":"모든 도착 항공편을 실시간으로 추적합니다. 픽업 시간은 자동으로 조정되며 쇼퍼는 추가 비용 없이 기다립니다.","faqTwoQ":"기사님은 어디에서 기다리시나요?","faqTwoA":"수하물을 찾은 후 수하물 수취대를 나와 미트 앤 그리트 구역으로 이동하세요. J / 777 만남의 장소를 찾으시면 직원이 이름이 적힌 팻말을 들고 기다리고 있습니다.","faqThreeQ":"카시트를 이용할 수 있나요?","faqThreeA":"네. 신생아용 카시트, 아동용 카시트, 부스터 시트는 예약 시 요청하시면 무료로 제공됩니다.","faqFourQ":"골프백과 대형 수하물도 운반할 수 있나요?","faqFourA":"네. Sprinter와 Vito는 골프 그룹에 이상적입니다. 수하물 정보를 알려주시면 적합한 차량을 준비합니다.","faqFiveQ":"표시된 요금이 최종 요금인가요?","faqFiveA":"네. 공항 세금, 주차비, 대기 시간, 세금이 모두 포함됩니다. 숨겨진 비용이 없습니다.","contactEyebrow":"여행은 여기서 시작됩니다","contactTitle":"안탈리아에<br />특별하게 도착하세요.","contactBody":"2분 이내에 온라인 예약하거나 24/7 컨시어지 팀에 직접 문의하세요.","whatsappUs":"WhatsApp","replyMinutes":"보통 몇 분 내로 답변","callUs":"24/7 전화","emailUs":"컨시어지 이메일","replyHour":"1시간 내 답변","footerTagline":"터키 리비에라 전역의 프라이빗 쇼퍼 서비스.","explore":"탐색","information":"정보","licensed":"인증된 프라이빗 이동 사업자 · TÜRSAB 준수","bookingConfirmed":"예약 확정","referenceLabel":"예약 번호","weWillContact":"예약 요청이 전송되었습니다. 30분 내로 연락드리겠습니다.","chatWithUs":"채팅하기","pickupAddressPlaceholder":"호텔명, 도로명, 건물 번호 및 지역","dropoffAddressPlaceholder":"호텔명, 도로명, 건물 번호 및 지역","hotelNamePlaceholder":"호텔 또는 숙소 이름","stepRoute":"경로","stepDetails":"세부 정보","stepContact":"연락처","reserveForPrice":"예약하기","continue":"계속","back":"뒤로","perVehicleNoteVito":"차량 기준 — 1인 기준 아님 · 최대 6명","perVehicleNoteSprinter":"차량 기준 — 1인 기준 아님 · 최대 12명","perVehicle":"차량 기준 · 고정 요금","noPrePayment":"No prepayment required","payAfterTransfer":"Pay your driver after the transfer","requestQuote":"견적 요청","cashConfirmation":"예약이 확정되었습니다. 차량에서 기사에게 고정 요금을 직접 결제하세요.","bookingError":"예약을 완료하지 못했습니다. 다시 시도해 주세요.","formIncomplete":"표시된 필수 항목을 입력해 주세요.","requiredField":"필수 입력 항목입니다.","destinationRequired":"목적지를 선택해 주세요.","dateInvalid":"오늘 또는 이후 날짜를 선택해 주세요.","emailInvalid":"올바른 이메일 주소를 입력해 주세요.","nameInvalid":"올바른 전체 이름을 입력해 주세요.","phoneInvalid":"국가 코드를 포함한 올바른 번호를 입력해 주세요(예: +49).","flightInvalid":"올바른 항공편 번호를 입력해 주세요.","pickupAddressRequired":"픽업 주소는 6자 이상 160자 이하로 입력해 주세요.","dropoffAddressRequired":"목적지 주소는 6자 이상 160자 이하로 입력해 주세요.","addressesMustDiffer":"픽업 주소와 목적지 주소는 달라야 합니다.","customDestinationPrice":"목적지 주소 확인 후 가격이 확정됩니다.","hotelNameRequired":"호텔명을 입력해 주세요.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","quoteTitle":"어디로 모셔다 드릴까요?","date":"날짜","airportReturnPrice":"호텔 또는 픽업 주소를 확인한 후 요금을 안내해 드립니다.","oneGuest":"1명","twoGuests":"2명","threeGuests":"3명","fourGuests":"4명","fiveGuests":"5명","sixGuests":"6명","sevenGuests":"7명","viewQuote":"요금 보기","fleetVitoClass":"VIP · 그랜드 투어링","fleetVitoDescription":"대가족, 골프 그룹, 짐이 많은 고객을 위한 넓은 프라이빗 캐빈.","capacitySwitchedSprinter":"승객과 수하물이 비토 용량을 초과합니다 — 메르세데스 스프린터로 변경되었습니다.","capacityNoVehicle":"이 인원과 수하물은 차량 용량을 초과합니다. WhatsApp으로 문의해 주세요.","leatherSeats":"프리미엄 가죽 시트","water":"시원한 생수","from":"부터","reviewOne":"\\"90분 지연에도 불구하고 기사님이 기다려 주셨습니다. 차량은 완벽하게 청결하고 시원했으며 카시트 두 개도 이미 설치되어 있었습니다. 저희 가족에게 꼭 필요한 환영이었습니다.\\"","reviewTwo":"\\"첫 WhatsApp 연락부터 벨렉 도착까지 모든 것이 최고였습니다. 시간 엄수, 세심함, 매우 전문적. 골프백도 여유롭게 들어갔습니다.\\"","reviewThree":"\\"공항 택시가 아닌 호텔 쇼퍼 서비스 같았습니다. 명확한 소통, 완벽한 차량, 진심으로 예의 바른 기사님.\\"","quoteReady":"나의 프라이빗 이동","journeyTime":"소요 시간","totalFixed":"총 요금","confirmWhatsapp":"WhatsApp으로 확인하기","bookNowCta":"지금 예약","backToQuote":"뒤로","yourDetails":"고객 정보","flightNumber":"항공편 번호","flightArrivalTime":"도착 시간","notesLabel":"특별 요청","confirmBooking":"예약 확정하기","paySecurely":"안전한 결제로 이동","payLaterNote":"확인 후 안전하게 온라인 결제.","paymentTitle":"안전한 결제","paymentError":"결제에 실패했습니다. 다시 시도해 주세요."},"ar":{"navFleet":"أسطولنا","navService":"الخدمات","navFairPricing":"أسعار عادلة","navRoutes":"الوجهات","navReviews":"التقييمات","navContact":"اتصل بنا","bookNow":"احجز الآن","alwaysAvailable":"متاحون على مدار الساعة، كل يوم","heroEyebrow":"خدمة سائق خاص · أنطاليا","heroTitle":"خدمة نقل فاخرة من المطار<br />في أنطاليا","heroSubtitle":"خدمة نقل خاصة مع سائق من مطار أنطاليا إلى بيليك وسيده وكيمر وألانيا.","bookTransfer":"احجز خدمة النقل","instantQuote":"احصل على السعر فوراً","googleRated":"تقييم Google","trustedGuests":"اختيار أكثر من 2,500 ضيف","discover":"اكتشف المزيد","tbLicensed":"مرخصون من TÜRSAB","tbFlightTracking":"تتبع الرحلات","tbFixedPrice":"سعر ثابت","tb247Concierge":"كونسيرج 24/7","tbChildSeats":"مقاعد أطفال مشمولة","privateJourney":"رحلتك الخاصة","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"نوع الرحلة","oneWay":"ذهاب فقط","roundTrip":"ذهاب وعودة","roundTripHint":"في رحلة الذهاب والعودة، تكون رحلة العودة على المسار نفسه بالاتجاه المعاكس.","pickup":"مكان الاستقبال","airportOption":"مطار أنطاليا (AYT)","hotelOption":"فندق","privateAddressOption":"عنوان خاص","destination":"الوجهة","selectDestination":"اختر الوجهة","vehicle":"السيارة","guests":"الركاب","arrivalDate":"تاريخ الوصول","arrivalFlightTime":"وقت وصول الرحلة","chooseTime":"اختر الوقت","arrivalFlightNumber":"رقم رحلة الوصول","returnDate":"تاريخ العودة","returnPickupTime":"وقت الاستقبال للعودة","returnFlightNumber":"رقم رحلة العودة","pickupAddress":"عنوان الاستقبال الكامل","dropoffAddress":"عنوان الوصول الكامل","luggageLabel":"أمتعة كبيرة","hotelNameLabel":"اسم الفندق","childSeatLabel":"مقاعد الأطفال","childSeatNone":"من دون مقعد أطفال","oneChildSeat":"مقعد أطفال واحد","twoChildSeats":"مقعدا أطفال","threeChildSeats":"3 مقاعد أطفال","fourChildSeats":"4 مقاعد أطفال","fullName":"الاسم الكامل","phoneLabel":"الهاتف / WhatsApp","emailLabel":"البريد الإلكتروني","paymentMethod":"اختر طريقة الدفع","cashPayment":"الدفع داخل السيارة","recommended":"موصى به","cashPaymentDescription":"لا يلزم الدفع مقدماً. ادفع مباشرة إلى السائق بعد أن تكون راضياً عن الخدمة.","quoteIncludes":"يشمل الاستقبال والترحيب، وتتبع الرحلة، ومواقف السيارات، والانتظار، والمياه.","perVehicleNote":"Per vehicle — not per person · Up to 7 passengers","confirmCashBooking":"تأكيد الحجز — الدفع داخل السيارة","flightTracking":"تتبع الرحلة مباشرة","fixedPrice":"سعر ثابت مضمون","meetGreet":"استقبال شخصي","speakingDrivers":"سائقون يتحدثون الإنجليزية والألمانية","fromAirport":"من مطار أنطاليا","welcomeEyebrow":"مرحباً بك في مستوى أرقى من الخدمة","welcomeTitle":"سافر بأناقة.<br />وصل براحة.","welcomeBody":"منذ لحظة هبوطك، نعتني بكل التفاصيل. ينتظرك سائقك في صالة الوصول، ويساعدك في الأمتعة، ويرافقك إلى سيارتك الخاصة المجهزة بعناية.","ourStandards":"معايير خدمتنا","concierge":"خدمة الكونسيرج","guestsWelcomed":"الضيوف الذين استقبلناهم","guestRating":"متوسط تقييم الضيوف","privateTransfers":"رحلات نقل خاصة","fleetEyebrow":"أسطولنا","fleetTitle":"مساحتك الخاصة،<br />مصممة بأدق التفاصيل.","fleetIntro":"سافر براحة مع مساحة واسعة للعائلة وحقائب الغولف والأمتعة.","signatureFleet":"الأسطول المميز","fleetVclassClass":"درجة رجال الأعمال · الدرجة الأولى","fleetVclassDescription":"وسيلة نقل VIP رحبة للمجموعات الكبيرة، مع مساحة واسعة للركاب والأمتعة.","passengers":"ركاب","suitcases":"حقائب","television":"تلفاز داخل السيارة","coldDrinks":"مشروبات باردة","snacks":"وجبات خفيفة","childSeats":"مقاعد أطفال عند الطلب","wifi":"واي فاي مجاني","nameSignGreeting":"استقبال شخصي بلافتة تحمل اسمك","reserveVehicle":"احجز هذه السيارة","insideVclass":"مقصورة Sprinter الداخلية","interiorTitle":"صالة خاصة بين<br />المطار والفندق.","serviceEyebrow":"معيار Antalya VIP","serviceTitle":"أكثر من مجرد نقل.<br />إنه ترحيب استثنائي.","serviceIntro":"عناية بمستوى الفنادق الفاخرة، وسائقون محليون ذوو خبرة، وراحة تامة من المطار إلى المنتجع.","trackingTitle":"تتبع الرحلة","trackingBody":"نتابع رحلتك مباشرة ونعدّل وقت الاستقبال تلقائياً من دون أي تكلفة إضافية.","chauffeurTitle":"سائقون محترفون","chauffeurBody":"سائقون أنيقون وكتومون دائماً، تم اختيارهم لمعرفتهم المحلية والتزامهم بأعلى معايير الخدمة.","greetTitle":"الاستقبال والترحيب","greetBody":"يستقبلك سائقك في صالة الوصول بلافتة تحمل اسمك ويساعدك في حمل الأمتعة.","supportTitle":"كونسيرج 24/7","supportBody":"قبل رحلتك وأثناءها وبعدها، يمكنك دائماً التواصل مع شخص حقيقي عبر الهاتف أو WhatsApp.","priceTitle":"أسعار ثابتة","priceBody":"السعر المؤكد هو السعر النهائي. يشمل وقت الانتظار ومواقف السيارات وتأخير الرحلات.","familyTitle":"مناسب للعائلات","familyBody":"مقاعد أطفال مناسبة للأعمار، ومساحات داخلية واسعة، ومساعدة هادئة لوصول عائلي مريح.","routesEyebrow":"رحلاتنا الأكثر طلباً","routesTitle":"من مطار أنطاليا<br />إلى الريفييرا التركية.","routesIntro":"جميع الأسعار للسيارة وليس للشخص، وتشمل وقت انتظار مجاني.","golfFavourite":"المفضل لدى لاعبي الغولف","reviewsEyebrow":"آراء الضيوف","reviewsTitle":"خدمة تبقى في الذاكرة<br />بعد الوصول.","googleReviews":"استناداً إلى 387 تقييماً موثقاً على Google","trustedBy":"موثوق من ضيوف أبرز منتجعات أنطاليا","pricingEyebrow":"خطط بثقة","pricingTitle":"نضمن سعراً ثابتاً.<br />وتدفع دائماً السعر الأقل.","pricingIntro":"نحدد سعراً ثابتاً لراحتك، ونقيس أيضاً المسافة الفعلية للرحلة. ستدفع دائماً المبلغ الأقل.","pricingFixedPrice":"السعر الثابت","fixedPriceExample":"النقل إلى بيليك: {{PRICE:belek:vito}} €","fixedPriceDesc":"إجمالي مضمون يشمل رسوم المطار ومواقف السيارات والانتظار والضرائب.","distancePrice":"حسب المسافة","distancePriceExample":"مثال 24 كم عبر الإنترنت: 25 €","distancePriceDesc":"يتم قياسها عبر GPS أثناء الرحلة.","youPay":"ما تدفعه","youPayPrice":"25 €","youPayDesc":"ينطبق السعر الأقل، ويؤكده السائق في نهاية الرحلة.","pricingNote":"لا مفاجآت ولا رسوم خفية. تدفع السعر المحجوز أو أقل منه.","faqEyebrow":"الأسئلة الشائعة","faqTitle":"قبل رحلتك.","faqIntro":"كل ما تحتاج إلى معرفته عن خدمة النقل الخاصة من مطار أنطاليا.","askQuestion":"اطرح سؤالاً","faqOneQ":"ماذا يحدث إذا تأخرت رحلتي؟","faqOneA":"نتابع جميع الرحلات القادمة مباشرة. نعدّل وقت الاستقبال تلقائياً، وينتظرك سائقك من دون أي رسوم إضافية.","faqTwoQ":"أين سألتقي بالسائق؟","faqTwoA":"بعد استلام أمتعتك، اخرج من منطقة الاستلام وتوجه إلى منطقة الاستقبال (Meet & Greet). ابحث عن نقطة اللقاء J / 777 — سيكون فريقنا بانتظارك حاملاً لافتة باسمك.","faqThreeQ":"هل تتوفر مقاعد للأطفال؟","faqThreeA":"نعم. تتوفر مقاعد للرضع والأطفال والمقاعد المعززة مجاناً عند طلبها أثناء الحجز.","faqFourQ":"هل يمكن نقل حقائب الغولف والأمتعة الكبيرة؟","faqFourA":"نعم. سيارات Sprinter وVito مناسبة لمجموعات الغولف. أخبرنا بأمتعتك لنجهز السيارة المناسبة.","faqFiveQ":"هل السعر المعروض نهائي؟","faqFiveA":"نعم. تشمل الأسعار رسوم المطار ومواقف السيارات ووقت الانتظار والضرائب، من دون رسوم خفية.","contactEyebrow":"رحلتك تبدأ هنا","contactTitle":"ابدأ وصولك إلى أنطاليا<br />بطريقة استثنائية.","contactBody":"احجز عبر الإنترنت خلال دقيقتين، أو تحدث مباشرة إلى فريق الكونسيرج 24/7.","whatsappUs":"تواصل عبر WhatsApp","replyMinutes":"نرد عادةً خلال دقائق","callUs":"اتصل بنا 24/7","emailUs":"بريد الكونسيرج","replyHour":"نرد خلال ساعة","footerTagline":"خدمة سائق خاص في أنحاء الريفييرا التركية.","explore":"استكشف","information":"معلومات","licensed":"مزود نقل خاص مرخص · متوافق مع TÜRSAB","bookingConfirmed":"تم تأكيد الحجز","referenceLabel":"الرقم المرجعي","weWillContact":"تم إرسال طلب حجزك. سنتواصل معك خلال 30 دقيقة.","chatWithUs":"تحدث معنا","pickupAddressPlaceholder":"اسم الفندق، الشارع، رقم المبنى والمنطقة","dropoffAddressPlaceholder":"اسم الفندق، الشارع، رقم المبنى والمنطقة","hotelNamePlaceholder":"اسم الفندق أو مكان الإقامة","stepRoute":"المسار","stepDetails":"التفاصيل","stepContact":"التواصل","reserveForPrice":"احجز","continue":"متابعة","back":"رجوع","perVehicleNoteVito":"لكل سيارة — لا للفرد · حتى 6 ركاب","perVehicleNoteSprinter":"لكل سيارة — لا للفرد · حتى 12 راكباً","perVehicle":"لكل سيارة · سعر ثابت","noPrePayment":"No prepayment required","payAfterTransfer":"Pay your driver after the transfer","requestQuote":"طلب عرض سعر","cashConfirmation":"تم تأكيد حجزك. ادفع المبلغ الثابت مباشرة إلى السائق داخل السيارة.","bookingError":"تعذر إكمال حجزك. يرجى المحاولة مرة أخرى.","formIncomplete":"يرجى إكمال الحقول المحددة.","requiredField":"هذا الحقل مطلوب.","destinationRequired":"يرجى اختيار وجهة.","dateInvalid":"يرجى اختيار تاريخ اليوم أو تاريخ لاحق.","emailInvalid":"يرجى إدخال بريد إلكتروني صالح.","nameInvalid":"يرجى إدخال الاسم الكامل بشكل صحيح.","phoneInvalid":"يرجى إدخال رقم صالح مع رمز الدولة (مثلاً +49).","flightInvalid":"يرجى إدخال رقم رحلة صالح.","pickupAddressRequired":"يجب أن يتراوح عنوان الاستقبال بين 6 و160 حرفاً.","dropoffAddressRequired":"يجب أن يتراوح عنوان الوصول بين 6 و160 حرفاً.","addressesMustDiffer":"يجب أن يختلف عنوان الاستقبال عن عنوان الوصول.","customDestinationPrice":"سيتم تأكيد السعر بعد مراجعة عنوان الوصول.","hotelNameRequired":"يرجى إدخال اسم الفندق.","roundTripPriceNote":"ذهاب وعودة · رحلتان","returnDateRequired":"يرجى اختيار تاريخ العودة.","returnDateInvalid":"يرجى اختيار تاريخ عودة يوافق تاريخ الذهاب أو يأتي بعده.","returnTimeRequired":"يرجى اختيار وقت الاستقبال للعودة.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","campaignBadge":"عرض الحجز عبر الإنترنت","campaignDiscount":"سعر خاص","campaignScope":"على جميع أسعار النقل","campaignApplied":"تم تطبيق السعر الخاص عبر الإنترنت","onlineDiscountShort":"سعر خاص عبر الإنترنت","discountPricesShown":"الأسعار المعروضة هي أسعار خاصة عبر الإنترنت","quoteTitle":"إلى أين نوصلك؟","date":"التاريخ","airportReturnPrice":"سيتم تأكيد السعر بعد مراجعة الفندق أو عنوان الاستقبال.","oneGuest":"راكب واحد","twoGuests":"راكبان","threeGuests":"3 ركاب","fourGuests":"4 ركاب","fiveGuests":"5 ركاب","sixGuests":"6 ركاب","sevenGuests":"7 ركاب","viewQuote":"عرض السعر","fleetVitoClass":"VIP · جراند تورينغ","fleetVitoDescription":"مقصورة خاصة ومريحة للعائلات والمجموعات الصغيرة.","capacitySwitchedSprinter":"عدد الركاب والأمتعة يتجاوز سعة Vito — تم التبديل إلى Mercedes Sprinter.","capacityNoVehicle":"هذا العدد من الركاب والأمتعة يتجاوز سعة مركباتنا. يرجى التواصل معنا عبر WhatsApp.","leatherSeats":"مقاعد جلدية فاخرة","water":"مياه معدنية باردة","from":"ابتداءً من","reviewOne":"\\"انتظرنا السائق رغم تأخر الرحلة 90 دقيقة. كانت السيارة نظيفة تماماً وباردة، ومقعدا الأطفال مجهزين مسبقاً. كان هذا بالضبط ما احتاجته عائلتنا عند الوصول.\\"","reviewTwo":"\\"من أول تواصل عبر WhatsApp حتى وصولنا إلى بيليك، كانت الخدمة ممتازة. التزام بالمواعيد واحترافية عالية، مع مساحة مريحة لحقائب الغولف.\\"","reviewThree":"\\"شعرنا وكأنها خدمة سائق فندق فاخر وليست سيارة أجرة من المطار. تواصل واضح، وسيارة مثالية، وسائق مهذب بصدق.\\"","quoteReady":"رحلتك الخاصة","journeyTime":"مدة الرحلة","totalFixed":"الإجمالي الثابت","confirmWhatsapp":"التأكيد عبر WhatsApp","bookNowCta":"احجز الآن","backToQuote":"رجوع","yourDetails":"بياناتك","flightNumber":"رقم الرحلة","flightArrivalTime":"وقت الوصول","notesLabel":"طلبات خاصة","confirmBooking":"تأكيد الحجز","paySecurely":"المتابعة إلى الدفع الآمن","payLaterNote":"دفع آمن عبر الإنترنت بعد التأكيد.","paymentTitle":"الدفع الآمن","paymentError":"تعذر إتمام الدفع. يرجى المحاولة مرة أخرى."}}`);
const translationData = {
  resources: resources$1
};
const resources = { "en": { "videoEyebrow": "How to find us", "videoTitle": "Find us at J / 777<br />after you land.", "videoSubtitle": "Our chauffeurs wait at the Meet & Greet Area — meeting point J / 777. Exit baggage claim, look for our name sign, and we handle the rest.", "videoCardTitle": "Antalya Airport<br />Meet & Greet Point", "videoCardBody": "After collecting your luggage, exit to the Meet & Greet Area and look for meeting point J / 777. Tell our team your name — we'll take it from there.", "videoWatch": "Watch the clip", "videoClose": "Close", "videoThumbnailAlt": "Antalya Airport meet and greet area", "videoDialogLabel": "Antalya Airport meet and greet video" }, "de": { "videoEyebrow": "So finden Sie uns", "videoTitle": "Nach der Landung finden Sie uns<br />bei J / 777.", "videoSubtitle": "Unser Team erwartet Sie im Meet-&-Greet-Bereich am Treffpunkt J / 777. Verlassen Sie die Gepäckausgabe und halten Sie nach unserem Namensschild Ausschau — wir kümmern uns um alles Weitere.", "videoCardTitle": "Treffpunkt am Flughafen Antalya<br />J / 777", "videoCardBody": "Nachdem Sie Ihr Gepäck abgeholt haben, gehen Sie zum Meet-&-Greet-Bereich und suchen Sie den Treffpunkt J / 777. Nennen Sie unserem Team Ihren Namen — ab dort übernehmen wir.", "videoWatch": "Video ansehen", "videoClose": "Schließen", "videoThumbnailAlt": "Meet-&-Greet-Bereich am Flughafen Antalya", "videoDialogLabel": "Meet-&-Greet-Video am Flughafen Antalya" }, "tr": { "videoEyebrow": "Bizi nasıl bulursunuz", "videoTitle": "İnişten sonra bizi<br />J / 777 noktasında bulun.", "videoSubtitle": "Ekibimiz karşılama alanındaki J / 777 buluşma noktasında sizi bekler. Bagaj teslim alanından çıkın, isim tabelamızı bulun; gerisini biz hallederiz.", "videoCardTitle": "Antalya Havalimanı<br />karşılama noktası", "videoCardBody": "Bagajınızı aldıktan sonra karşılama alanına çıkın ve J / 777 buluşma noktasını bulun. Ekibimize adınızı söyleyin; sonrasını bize bırakın.", "videoWatch": "Videoyu izleyin", "videoClose": "Kapat", "videoThumbnailAlt": "Antalya Havalimanı karşılama alanı", "videoDialogLabel": "Antalya Havalimanı karşılama videosu" }, "ru": { "videoEyebrow": "Как нас найти", "videoTitle": "После прилёта найдите нас<br />у точки J / 777.", "videoSubtitle": "Наша команда ждёт вас в зоне встречи у точки J / 777. Выйдите из зоны выдачи багажа и найдите табличку с вашим именем — обо всём остальном позаботимся мы.", "videoCardTitle": "Место встречи в аэропорту Антальи<br />J / 777", "videoCardBody": "После получения багажа выйдите в зону встречи и найдите точку J / 777. Назовите нашей команде своё имя — дальше мы обо всём позаботимся.", "videoWatch": "Смотреть видео", "videoClose": "Закрыть", "videoThumbnailAlt": "Зона встречи в аэропорту Антальи", "videoDialogLabel": "Видео о встрече в аэропорту Антальи" }, "pl": { "videoEyebrow": "Jak nas znaleźć", "videoTitle": "Po wylądowaniu znajdziesz nas<br />w punkcie J / 777.", "videoSubtitle": "Nasz zespół czeka w strefie powitalnej przy punkcie J / 777. Po odbiorze bagażu wyjdź z hali i wypatruj tabliczki ze swoim nazwiskiem — resztą zajmiemy się my.", "videoCardTitle": "Punkt powitalny<br />na lotnisku w Antalyi", "videoCardBody": "Po odebraniu bagażu przejdź do strefy powitalnej i znajdź punkt J / 777. Podaj naszemu zespołowi swoje nazwisko — zajmiemy się resztą.", "videoWatch": "Obejrzyj film", "videoClose": "Zamknij", "videoThumbnailAlt": "Strefa powitalna na lotnisku w Antalyi", "videoDialogLabel": "Film o powitaniu na lotnisku w Antalyi" }, "nl": { "videoEyebrow": "Zo vindt u ons", "videoTitle": "Na de landing vindt u ons<br />bij punt J / 777.", "videoSubtitle": "Ons team wacht in de Meet & Greet-zone bij ontmoetingspunt J / 777. Verlaat de bagagehal en zoek naar het bord met uw naam — wij regelen de rest.", "videoCardTitle": "Ontmoetingspunt<br />op Antalya Airport", "videoCardBody": "Ga na het ophalen van uw bagage naar de Meet & Greet-zone en zoek punt J / 777. Geef uw naam door aan ons team — vanaf daar regelen wij alles.", "videoWatch": "Bekijk de video", "videoClose": "Sluiten", "videoThumbnailAlt": "Meet & Greet-zone op Antalya Airport", "videoDialogLabel": "Meet & Greet-video op Antalya Airport" }, "uk": { "videoEyebrow": "Як нас знайти", "videoTitle": "Після прильоту знайдіть нас<br />біля пункту J / 777.", "videoSubtitle": "Наша команда чекає на вас у зоні зустрічі біля пункту J / 777. Вийдіть із зони видачі багажу та знайдіть табличку зі своїм ім’ям — про все інше подбаємо ми.", "videoCardTitle": "Місце зустрічі в аеропорту Анталії<br />J / 777", "videoCardBody": "Після отримання багажу вийдіть до зони зустрічі та знайдіть пункт J / 777. Назвіть нашій команді своє ім’я — далі ми про все подбаємо.", "videoWatch": "Переглянути відео", "videoClose": "Закрити", "videoThumbnailAlt": "Зона зустрічі в аеропорту Анталії", "videoDialogLabel": "Відео про зустріч в аеропорту Анталії" }, "fr": { "videoEyebrow": "Comment nous trouver", "videoTitle": "Après l’atterrissage, retrouvez-nous<br />au point J / 777.", "videoSubtitle": "Notre équipe vous attend dans la zone d’accueil au point J / 777. Quittez la zone de récupération des bagages et cherchez la pancarte à votre nom — nous nous occupons du reste.", "videoCardTitle": "Point d’accueil<br />à l’aéroport d’Antalya", "videoCardBody": "Après avoir récupéré vos bagages, rendez-vous dans la zone d’accueil et cherchez le point J / 777. Donnez votre nom à notre équipe — nous nous chargeons de la suite.", "videoWatch": "Voir la vidéo", "videoClose": "Fermer", "videoThumbnailAlt": "Zone d’accueil de l’aéroport d’Antalya", "videoDialogLabel": "Vidéo d’accueil à l’aéroport d’Antalya" }, "sv": { "videoEyebrow": "Så hittar du oss", "videoTitle": "Efter landning hittar du oss<br />vid punkt J / 777.", "videoSubtitle": "Vårt team väntar i välkomstområdet vid mötespunkt J / 777. Lämna bagageutlämningen och leta efter skylten med ditt namn — vi tar hand om resten.", "videoCardTitle": "Mötesplats<br />på Antalya flygplats", "videoCardBody": "När du har hämtat ditt bagage går du till välkomstområdet och letar efter punkt J / 777. Uppge ditt namn för vårt team — sedan tar vi hand om resten.", "videoWatch": "Se videon", "videoClose": "Stäng", "videoThumbnailAlt": "Välkomstområdet på Antalya flygplats", "videoDialogLabel": "Välkomstvideo från Antalya flygplats" }, "ja": { "videoEyebrow": "集合場所のご案内", "videoTitle": "ご到着後は<br />J / 777へお越しください。", "videoSubtitle": "スタッフはアンタルヤ空港の出迎えエリア、J / 777でお待ちしています。手荷物受取所を出たら、お名前の書かれたボードをお探しください。その後はすべてお任せください。", "videoCardTitle": "アンタルヤ空港<br />お出迎え集合場所", "videoCardBody": "手荷物を受け取った後、出迎えエリアへ進み、J / 777をお探しください。スタッフにお名前をお伝えいただければ、あとは私たちがご案内します。", "videoWatch": "動画を見る", "videoClose": "閉じる", "videoThumbnailAlt": "アンタルヤ空港のお出迎えエリア", "videoDialogLabel": "アンタルヤ空港のお出迎え案内動画" }, "ko": { "videoEyebrow": "찾아오시는 길", "videoTitle": "도착 후 J / 777<br />지점에서 만나세요.", "videoSubtitle": "직원이 안탈리아 공항 환영 구역의 J / 777 지점에서 기다립니다. 수하물 수취대를 나와 이름이 적힌 팻말을 찾으시면 나머지는 저희가 안내해 드립니다.", "videoCardTitle": "안탈리아 공항<br />환영 미팅 장소", "videoCardBody": "수하물을 찾은 후 환영 구역으로 이동해 J / 777 지점을 찾으세요. 직원에게 이름을 말씀해 주시면 이후 절차를 모두 안내해 드립니다.", "videoWatch": "영상 보기", "videoClose": "닫기", "videoThumbnailAlt": "안탈리아 공항 환영 구역", "videoDialogLabel": "안탈리아 공항 환영 안내 영상" }, "ar": { "videoEyebrow": "كيف تجدنا", "videoTitle": "بعد وصولك، ستجدنا<br />عند النقطة J / 777.", "videoSubtitle": "ينتظرك فريقنا في منطقة الاستقبال عند نقطة اللقاء J / 777. بعد مغادرة منطقة استلام الأمتعة، ابحث عن اللافتة التي تحمل اسمك وسنتولى نحن الباقي.", "videoCardTitle": "نقطة الاستقبال<br />في مطار أنطاليا", "videoCardBody": "بعد استلام أمتعتك، توجّه إلى منطقة الاستقبال وابحث عن النقطة J / 777. أخبر فريقنا باسمك وسنتولى الباقي.", "videoWatch": "شاهد الفيديو", "videoClose": "إغلاق", "videoThumbnailAlt": "منطقة الاستقبال في مطار أنطاليا", "videoDialogLabel": "فيديو الاستقبال في مطار أنطاليا" }, "cs": { "videoEyebrow": "Jak nás najít", "videoTitle": "Najdete nás u J / 777<br />po přistání.", "videoSubtitle": "Naši šoféři čekají v oblasti Meet & Greet — setkávací bod J / 777. Vyjděte z výdeje zavazadel, najděte naši jmenovku a zbytek zajistíme my.", "videoCardTitle": "Místo uvítání<br />na letišti Antalya", "videoCardBody": "Po vyzvednutí zavazadel vyjděte do oblasti Meet & Greet a hledejte setkávací bod J / 777. Řekněte našemu týmu své jméno — zbytek vyřešíme za vás.", "videoWatch": "Přehrát video", "videoClose": "Zavřít", "videoThumbnailAlt": "Oblast uvítání na letišti Antalya", "videoDialogLabel": "Video o uvítání na letišti Antalya" }, "ur": { "videoEyebrow": "ہمیں کیسے تلاش کریں", "videoTitle": "آمد کے بعد ہمیں<br />J / 777 پر تلاش کریں۔", "videoSubtitle": "ہماری ٹیم J / 777 ملاقات کی جگہ پر آپ کا انتظار کر رہی ہے۔ سامان لینے کے بعد ملاقات کے علاقے میں نکلیں اور اپنے نام کی تختی تلاش کریں — باقی ہم سنبھالیں گے۔", "videoCardTitle": "انطالیہ ایئرپورٹ ملاقات کی جگہ<br />J / 777", "videoCardBody": "سامان لینے کے بعد ملاقات کے علاقے میں نکلیں اور J / 777 تلاش کریں۔ ہماری ٹیم کو اپنا نام بتائیں — آگے ہم سنبھالیں گے۔", "videoWatch": "ویڈیو دیکھیں", "videoClose": "بند کریں", "videoThumbnailAlt": "انطالیہ ایئرپورٹ ملاقات کی جگہ", "videoDialogLabel": "انطالیہ ایئرپورٹ ملاقات ویڈیو" } };
const videoTranslationData = {
  resources
};
const routeCatalog = {
  antalya: {
    names: { en: "Antalya City", de: "Antalya Stadt", tr: "Antalya şehir merkezi", ru: "центр Антальи", cs: "centrum Antalye", uk: "Центр Анталії", ur: "انطالیہ شہر" },
    distanceKm: 15,
    durationMin: 25,
    duration: { en: "20–30 minutes", de: "20–30 Minuten", tr: "20–30 dakika", ru: "20–30 минут", cs: "20–30 minut", uk: "20–30 хвилин", ur: "20–30 منٹ", pl: "20–30 minut", nl: "20–30 minuten", sv: "20–30 minuter", ar: "20–30 دقيقة" },
    originalPrices: { vito: 40, sprinter: 65 },
    prices: { vito: 35, sprinter: 60 }
  },
  belek: {
    names: { en: "Belek", de: "Belek", tr: "Belek", ru: "Белек", cs: "Belek", uk: "Белек", ur: "بیلک" },
    distanceKm: 45,
    durationMin: 35,
    duration: { en: "35–40 minutes", de: "35–40 Minuten", tr: "35–40 dakika", ru: "35–40 минут", cs: "35–40 minut", uk: "35–40 хвилин", ur: "35–40 منٹ", pl: "35–40 minut", nl: "35–40 minuten", sv: "35–40 minuter", ar: "35–40 دقيقة" },
    originalPrices: { vito: 50, sprinter: 85 },
    prices: { vito: 40, sprinter: 70 }
  },
  side: {
    names: { en: "Side", de: "Side", tr: "Side", ru: "Сиде", cs: "Side", uk: "Сіде", ur: "سیدے" },
    distanceKm: 65,
    durationMin: 55,
    duration: { en: "55–65 minutes", de: "55–65 Minuten", tr: "55–65 dakika", ru: "55–65 минут", cs: "55–65 minut", uk: "55–65 хвилин", ur: "55–65 منٹ", pl: "55–65 minut", nl: "55–65 minuten", sv: "55–65 minuter", ar: "55–65 دقيقة" },
    originalPrices: { vito: 60, sprinter: 100 },
    prices: { vito: 50, sprinter: 85 }
  },
  kemer: {
    names: { en: "Kemer", de: "Kemer", tr: "Kemer", ru: "Кемер", cs: "Kemer", uk: "Кемер", ur: "کیمر" },
    distanceKm: 50,
    durationMin: 60,
    duration: { en: "40–50 minutes", de: "40–50 Minuten", tr: "40–50 dakika", ru: "40–50 минут", cs: "40–50 minut", uk: "40–50 хвилин", ur: "40–50 منٹ", pl: "40–50 minut", nl: "40–50 minuten", sv: "40–50 minuter", ar: "40–50 دقيقة" },
    originalPrices: { vito: 65, sprinter: 110 },
    prices: { vito: 55, sprinter: 90 }
  },
  alanya: {
    names: { en: "Alanya", de: "Alanya", tr: "Alanya", ru: "Аланью", cs: "Alanya", uk: "Аланья", ur: "الانیا" },
    distanceKm: 125,
    durationMin: 120,
    duration: { en: "110–130 minutes", de: "110–130 Minuten", tr: "110–130 dakika", ru: "110–130 минут", cs: "110–130 minut", uk: "110–130 хвилин", ur: "110–130 منٹ", pl: "110–130 minut", nl: "110–130 minuten", sv: "110–130 minuter", ar: "110–130 دقيقة" },
    originalPrices: { vito: 110, sprinter: 170 },
    prices: { vito: 95, sprinter: 145 }
  },
  // Alanya sub-regions. The single €95 Alanya tariff covered everything from
  // Okurcalar to Demirtaş — a 65 km spread — so ALANYA_PRICING_PLAN.md splits
  // it by distance. `landingRoute` names the marketed page these belong to and
  // keeps them out of the route pages and the sitemap: they are prices the
  // hotel index resolves to, not destinations anyone searches for. A hotel in
  // one of them is still presented under Alanya, and priced by its own
  // sub-region. `alanya` itself stays listed, keeps its
  // landing page, and remains the fallback for a guest who cannot place their
  // own hotel — the dearest of the six, so an unknown hotel is never undersold.
  //
  // Distances and durations here are estimates and feed the profit/loss cost
  // model, not the customer's price. Confirm them against real journeys.
  alanya_bati: {
    names: { en: "West Alanya", de: "West-Alanya", tr: "Batı Alanya", ru: "Западную Аланью", cs: "Západní Alanya", uk: "Західна Аланія", ur: "مغربی الانیا" },
    distanceKm: 105,
    durationMin: 100,
    duration: { en: "90–110 minutes", de: "90–110 Minuten", tr: "90–110 dakika", ru: "90–110 минут", cs: "90–110 minut", uk: "90–110 хвилин", ur: "90–110 منٹ" },
    originalPrices: { vito: 80, sprinter: 105 },
    prices: { vito: 70, sprinter: 90 },
    landingRoute: "alanya"
    // covers Okurcalar, İncekum, Avsallar, Türkler, Payallar, Konaklı
  },
  alanya_merkez: {
    names: { en: "Alanya Centre", de: "Alanya Zentrum", tr: "Alanya merkez", ru: "центр Аланьи", cs: "centrum Alanye", uk: "Центр Аланії", ur: "الانیا شہر" },
    distanceKm: 125,
    durationMin: 120,
    duration: { en: "110–130 minutes", de: "110–130 Minuten", tr: "110–130 dakika", ru: "110–130 минут", cs: "110–130 minut", uk: "110–130 хвилин", ur: "110–130 منٹ" },
    originalPrices: { vito: 85, sprinter: 110 },
    prices: { vito: 75, sprinter: 95 },
    landingRoute: "alanya"
    // covers Merkez, Kleopatra, Oba, Tosmur
  },
  alanya_dogu: {
    names: { en: "East Alanya", de: "Ost-Alanya", tr: "Doğu Alanya", ru: "Восточную Аланью", cs: "Východní Alanya", uk: "Східна Аланія", ur: "مشرقی الانیا" },
    distanceKm: 138,
    durationMin: 130,
    duration: { en: "120–140 minutes", de: "120–140 Minuten", tr: "120–140 dakika", ru: "120–140 минут", cs: "120–140 minut", uk: "120–140 хвилин", ur: "120–140 منٹ" },
    originalPrices: { vito: 90, sprinter: 120 },
    prices: { vito: 80, sprinter: 105 },
    landingRoute: "alanya"
    // covers Kestel, Mahmutlar
  },
  kargicak: {
    names: { en: "Kargıcak", de: "Kargıcak", tr: "Kargıcak", ru: "Каргыджак", cs: "Kargıcak", uk: "Каргиджак", ur: "کارگیجاک" },
    distanceKm: 150,
    durationMin: 145,
    duration: { en: "135–155 minutes", de: "135–155 Minuten", tr: "135–155 dakika", ru: "135–155 минут", cs: "135–155 minut", uk: "135–155 хвилин", ur: "135–155 منٹ" },
    originalPrices: { vito: 105, sprinter: 135 },
    prices: { vito: 90, sprinter: 115 },
    landingRoute: "alanya"
    // covers Kargıcak
  },
  demirtas: {
    names: { en: "Demirtaş", de: "Demirtaş", tr: "Demirtaş", ru: "Демирташ", cs: "Demirtaş", uk: "Демірташ", ur: "دیمرتاش" },
    distanceKm: 170,
    durationMin: 165,
    duration: { en: "155–175 minutes", de: "155–175 Minuten", tr: "155–175 dakika", ru: "155–175 минут", cs: "155–175 minut", uk: "155–175 хвилин", ur: "155–175 منٹ" },
    originalPrices: { vito: 115, sprinter: 150 },
    prices: { vito: 100, sprinter: 130 },
    landingRoute: "alanya"
    // covers Demirtaş
  },
  bogazkent: {
    names: { en: "Boğazkent", de: "Boğazkent", tr: "Boğazkent", ru: "Богазкент", cs: "Boğazkent", uk: "Богазкент", ur: "بوازکینت" },
    distanceKm: 48,
    durationMin: 45,
    duration: { en: "40–45 minutes", de: "40–45 Minuten", tr: "40–45 dakika", ru: "40–45 минут", cs: "40–45 minut", uk: "40–45 хвилин", ur: "40–45 منٹ", pl: "40–45 minut", nl: "40–45 minuten", sv: "40–45 minuter", ar: "40–45 دقيقة" },
    originalPrices: { vito: 55, sprinter: 90 },
    prices: { vito: 45, sprinter: 80 }
  },
  manavgat: {
    names: { en: "Manavgat", de: "Manavgat", tr: "Manavgat", ru: "Манавгат", cs: "Manavgat", uk: "Манавгат", ur: "مانوگات" },
    distanceKm: 75,
    durationMin: 65,
    duration: { en: "55–65 minutes", de: "55–65 Minuten", tr: "55–65 dakika", ru: "55–65 минут", cs: "55–65 minut", uk: "55–65 хвилин", ur: "55–65 منٹ", pl: "55–65 minut", nl: "55–65 minuten", sv: "55–65 minuter", ar: "55–65 دقيقة" },
    originalPrices: { vito: 60, sprinter: 100 },
    prices: { vito: 50, sprinter: 85 }
  },
  kizilagac: {
    names: { en: "Manavgat/Kızılağaç", de: "Manavgat/Kızılağaç", tr: "Manavgat/Kızılağaç", ru: "Манавгат/Кызылагач", cs: "Manavgat/Kızılağaç", uk: "Манавгат/Кизилагач", ur: "مانوگات/قیزیلاغاچ" },
    distanceKm: 85,
    durationMin: 75,
    duration: { en: "70–80 minutes", de: "70–80 Minuten", tr: "70–80 dakika", ru: "70–80 минут", cs: "70–80 minut", uk: "70–80 хвилин", ur: "70–80 منٹ", pl: "70–80 minut", nl: "70–80 minuten", sv: "70–80 minuter", ar: "70–80 دقيقة" },
    originalPrices: { vito: 70, sprinter: 115 },
    prices: { vito: 60, sprinter: 95 }
  },
  tekirova: {
    names: { en: "Tekirova", de: "Tekirova", tr: "Tekirova", ru: "Текирову", cs: "Tekirova", uk: "Текірова", ur: "ٹیکیروا" },
    distanceKm: 75,
    durationMin: 75,
    duration: { en: "75–90 minutes", de: "75–90 Minuten", tr: "75–90 dakika", ru: "75–90 минут", cs: "75–90 minut", uk: "75–90 хвилин", ur: "75–90 منٹ", pl: "75–90 minut", nl: "75–90 minuten", sv: "75–90 minuter", ar: "75–90 دقيقة" },
    originalPrices: { vito: 90, sprinter: 135 },
    prices: { vito: 75, sprinter: 115 }
  },
  bodrum: {
    names: { en: "Bodrum", de: "Bodrum", tr: "Bodrum", ru: "Бодрум", cs: "Bodrum", uk: "Бодрум", ur: "بودروم" },
    distanceKm: 380,
    durationMin: 300,
    duration: { en: "5–6 hours", de: "5–6 Stunden", tr: "5–6 saat", ru: "5–6 часов", cs: "5–6 hodin", uk: "5–6 годин", ur: "5–6 گھنٹے", pl: "5–6 godzin", nl: "5–6 uur", sv: "5–6 timmar", ar: "5–6 ساعات" },
    originalPrices: { vito: 325, sprinter: 385 },
    prices: { vito: 280, sprinter: 330 }
  },
  dalaman: {
    names: { en: "Dalaman", de: "Dalaman", tr: "Dalaman", ru: "Даламан", cs: "Dalaman", uk: "Даламан", ur: "دالامان" },
    distanceKm: 235,
    durationMin: 210,
    duration: { en: "3–3.5 hours", de: "3–3,5 Stunden", tr: "3–3,5 saat", ru: "3–3,5 часа", cs: "3–3,5 hodiny", uk: "3–3,5 години", ur: "3–3.5 گھنٹے", pl: "3–3.5 godzin", nl: "3–3.5 uur", sv: "3–3.5 timmar", ar: "3–3.5 ساعات" },
    originalPrices: { vito: 210, sprinter: 310 },
    prices: { vito: 180, sprinter: 265 }
  },
  fethiye: {
    names: { en: "Fethiye", de: "Fethiye", tr: "Fethiye", ru: "Фетхие", cs: "Fethiye", uk: "Фетхіє", ur: "فتحیہ" },
    distanceKm: 205,
    durationMin: 180,
    duration: { en: "2.5–3 hours", de: "2,5–3 Stunden", tr: "2,5–3 saat", ru: "2,5–3 часа", cs: "2,5–3 hodiny", uk: "2,5–3 години", ur: "2.5–3 گھنٹے", pl: "2.5–3 godzin", nl: "2.5–3 uur", sv: "2.5–3 timmar", ar: "2.5–3 ساعات" },
    originalPrices: { vito: 210, sprinter: 310 },
    prices: { vito: 180, sprinter: 265 }
  },
  pamukkale: {
    names: { en: "Pamukkale", de: "Pamukkale", tr: "Pamukkale", ru: "Памуккале", cs: "Pamukkale", uk: "Памуккале", ur: "پاموکالے" },
    distanceKm: 245,
    durationMin: 180,
    duration: { en: "3–3.5 hours", de: "3–3,5 Stunden", tr: "3–3,5 saat", ru: "3–3,5 часа", cs: "3–3,5 hodiny", uk: "3–3,5 години", ur: "3–3.5 گھنٹے", pl: "3–3.5 godzin", nl: "3–3.5 uur", sv: "3–3.5 timmar", ar: "3–3.5 ساعات" },
    originalPrices: { vito: 290, sprinter: 350 },
    prices: { vito: 250, sprinter: 300 }
  },
  kapadokya: {
    names: { en: "Cappadocia", de: "Kappadokien", tr: "Kapadokya", ru: "Каппадокию", cs: "Kappadokie", uk: "Каппадокія", ur: "کاپاڈوکیا" },
    distanceKm: 540,
    durationMin: 480,
    duration: { en: "7–8 hours", de: "7–8 Stunden", tr: "7–8 saat", ru: "7–8 часов", cs: "7–8 hodin", uk: "7–8 годин", ur: "7–8 گھنٹے", pl: "7–8 godzin", nl: "7–8 uur", sv: "7–8 timmar", ar: "7–8 ساعات" },
    originalPrices: { vito: 350, sprinter: 410 },
    prices: { vito: 300, sprinter: 350 }
  }
};
const publicRouteSlugs = Object.freeze(
  /** @type {Array<keyof typeof routeCatalog>} */
  Object.keys(routeCatalog).filter((slug) => !routeCatalog[slug].landingRoute)
);
const bookableRouteSlugs = Object.freeze(
  /** @type {Array<keyof typeof routeCatalog>} */
  Object.keys(routeCatalog)
);
Object.freeze({
  airport: "Antalya Havalimanı",
  hotel: "Otel",
  private_address: "Özel adres",
  ...Object.fromEntries(
    Object.entries(routeCatalog).map(([slug, route]) => [slug, route.names.tr])
  ),
  antalya: "Antalya",
  kizilagac: "Kızılağaç"
});
const routeData = Object.freeze(
  Object.fromEntries(
    Object.entries(routeCatalog).filter(([, route]) => !route.landingRoute).map(([slug, route]) => [slug, {
      name: route.names.en,
      originalPrices: route.originalPrices,
      prices: route.prices
    }])
  )
);
const regionalConnections = [
  ["belek", "bogazkent", 10],
  ["bogazkent", "side", 25],
  ["side", "manavgat", 10],
  ["manavgat", "kizilagac", 15],
  ["kizilagac", "alanya", 45],
  ["kizilagac", "alanya_bati", 20],
  ["alanya_bati", "alanya_merkez", 20],
  ["alanya_merkez", "alanya_dogu", 13],
  ["alanya_dogu", "kargicak", 12],
  ["kargicak", "demirtas", 20],
  ["antalya", "kemer", 45],
  ["kemer", "tekirova", 20],
  ["tekirova", "fethiye", 155],
  ["fethiye", "dalaman", 50],
  ["dalaman", "bodrum", 200],
  ["antalya", "pamukkale", 235],
  ["pamukkale", "bodrum", 250],
  ["manavgat", "kapadokya", 500]
];
Object.freeze([
  ...Object.entries(routeCatalog).map(([slug, route]) => ["airport", slug, route.distanceKm]),
  ...regionalConnections
]);
const localizedRoute = (slug, language = "en") => {
  const route = routeCatalog[slug];
  if (!route) return null;
  return {
    ...route,
    slug,
    name: route.names[language] ?? route.names.en,
    distance: `${route.distanceKm} km`,
    durationLabel: route.duration[language] ?? route.duration.en
  };
};
const formatPriceValue = (value) => {
  const number = Number(value);
  return Number.isInteger(number) ? number.toFixed(0) : number.toFixed(2);
};
const getPriceRange = () => {
  const prices = Object.values(routeData).flatMap(
    (route) => Object.values(route.prices)
  );
  return `€${formatPriceValue(Math.min(...prices))}-€${formatPriceValue(Math.max(...prices))}`;
};
const resolvePriceTokens = (value) => String(value).replaceAll("{{PRICE_RANGE}}", getPriceRange()).replace(
  /\{\{PRICE:(\w+):(vito|sprinter)(?::(orig))?\}\}/g,
  (match, routeKey, vehicleKey, original) => {
    const route = routeData[routeKey];
    if (!route) return match;
    const prices = original ? route.originalPrices : route.prices;
    const price = prices[vehicleKey];
    return price == null ? match : formatPriceValue(price);
  }
);
const languageOptions = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "tr", flag: "🇹🇷", label: "Türkçe" },
  { code: "ru", flag: "🇷🇺", label: "Русский" },
  { code: "cs", flag: "🇨🇿", label: "Čeština" },
  { code: "ar", flag: "🇸🇦", label: "العربية" },
  { code: "pl", flag: "🇵🇱", label: "Polski" },
  { code: "nl", flag: "🇳🇱", label: "Nederlands" },
  { code: "uk", flag: "🇺🇦", label: "Українська" },
  { code: "ur", flag: "🇵🇰", label: "اردو" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "sv", flag: "🇸🇪", label: "Svenska" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
  { code: "ko", flag: "🇰🇷", label: "한국어" }
];
const supportedLanguages = new Set(languageOptions.map(({ code }) => code));
const indexableLanguages$1 = /* @__PURE__ */ new Set(["en", "de", "tr", "ru", "cs", "uk", "ur", "fr", "pl", "nl", "ar", "sv"]);
const legacyResources = translationData.resources;
const videoResources = videoTranslationData.resources;
const rawResources = Object.fromEntries(
  Object.entries(legacyResources).map(([language, translation]) => [
    language,
    { ...translation, ...videoResources[language] || {} }
  ])
);
const i18n = i18next.createInstance();
void i18n.init({
  fallbackLng: "en",
  initAsync: false,
  interpolation: { escapeValue: false },
  lng: "en",
  resources: Object.fromEntries(
    Object.entries(rawResources).map(([language, translation]) => [language, { translation }])
  )
});
const LanguageContext = createContext(null);
const normalizeLanguage = (value) => supportedLanguages.has(value) ? value : "en";
const browserLanguage = () => {
  if (typeof navigator === "undefined") return "en";
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const candidate of candidates) {
    const language = normalizeLanguage(candidate?.split("-")[0].toLowerCase());
    if (language !== "en" || candidate?.toLowerCase().startsWith("en")) return language;
  }
  return "en";
};
function localizedPath$1(pathname, language) {
  if (!indexableLanguages$1.has(language)) return null;
  const normalized = pathname.endsWith("/") || pathname.endsWith(".html") ? pathname : `${pathname}/`;
  const localizedMatch = normalized.match(/^\/(de|tr|ru|cs|uk|ur|fr|pl|nl|ar|sv)(\/.*)?$/);
  const basePath = localizedMatch ? localizedMatch[2] || "/" : normalized;
  if (basePath !== "/" && basePath !== "/health/" && !basePath.startsWith("/transfers/")) return null;
  return `${language === "en" ? "" : `/${language}`}${basePath}`;
}
function LanguageProvider({
  children,
  initialLanguage
}) {
  const routeLanguage = normalizeLanguage(initialLanguage);
  const [language, setLanguage] = useState(routeLanguage);
  useEffect(() => {
    if (indexableLanguages$1.has(routeLanguage) && routeLanguage !== "en") return;
    try {
      setLanguage(normalizeLanguage(localStorage.getItem("avl-language") || browserLanguage()));
    } catch {
      setLanguage(browserLanguage());
    }
  }, [routeLanguage]);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = ["ar", "ur"].includes(language) ? "rtl" : "ltr";
  }, [language]);
  const selectLanguage = useCallback((nextLanguage) => {
    try {
      localStorage.setItem("avl-language", nextLanguage);
    } catch {
    }
    const target = typeof window === "undefined" ? null : localizedPath$1(window.location.pathname, nextLanguage);
    if (target && target !== window.location.pathname) {
      window.location.assign(`${target}${window.location.hash}`);
      return;
    }
    setLanguage(nextLanguage);
  }, []);
  const t = useCallback((key, fallback = key) => {
    const value2 = i18n.getFixedT(language)(key, { defaultValue: fallback });
    return resolvePriceTokens(String(value2));
  }, [language]);
  const value = useMemo(() => ({ language, selectLanguage, t }), [language, selectLanguage, t]);
  return /* @__PURE__ */ jsx(I18nextProvider, { i18n, children: /* @__PURE__ */ jsx(LanguageContext.Provider, { value, children }) });
}
function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
function LineBreakText({ value }) {
  return value.split(/<br\s*\/?>/i).map((part, index) => /* @__PURE__ */ jsxs("span", { children: [
    index > 0 && /* @__PURE__ */ jsx("br", {}),
    part
  ] }, `${part}-${index}`));
}
const CONSENT_KEY = "avl-analytics-consent";
const GA_ID = "G-0VSR8E00FG";
const ADS_ID = "AW-18248114753";
const consentCopy = {
  de: { label: "Datenschutzeinstellungen", title: "Dürfen wir Analysedaten verwenden?", body: "Wir verwenden optionale Google-Analyse- und Werbetechnologien, um Nutzung und Buchungen zu messen. Sie werden erst nach Ihrer Zustimmung geladen.", privacy: "Datenschutzerklärung", reject: "Optionales ablehnen", accept: "Analyse akzeptieren", url: "/de/datenschutz/" },
  en: { label: "Privacy settings", title: "May we use analytics?", body: "We use optional Google analytics and advertising technologies to measure visits and bookings. They load only after you consent.", privacy: "Privacy policy", reject: "Reject optional", accept: "Accept analytics", url: "/privacy/" },
  tr: { label: "Gizlilik ayarları", title: "Analiz verilerini kullanabilir miyiz?", body: "Ziyaretleri ve rezervasyonları ölçmek için isteğe bağlı Google analiz ve reklam teknolojilerini kullanıyoruz. Bunlar yalnızca onayınızdan sonra yüklenir.", privacy: "Gizlilik politikası", reject: "İsteğe bağlıları reddet", accept: "Analizi kabul et", url: "/tr/gizlilik/" },
  ru: { label: "Настройки конфиденциальности", title: "Разрешить аналитику?", body: "Мы используем необязательные технологии Google для анализа посещений и бронирований. Они загружаются только после вашего согласия.", privacy: "Политика конфиденциальности", reject: "Отклонить необязательные", accept: "Разрешить аналитику", url: "/ru/privacy/" },
  ar: { label: "إعدادات الخصوصية", title: "هل تسمح لنا باستخدام بيانات التحليلات؟", body: "نستخدم تقنيات Google الاختيارية للتحليلات والإعلانات لقياس الزيارات والحجوزات. لا يتم تحميلها إلا بعد موافقتك.", privacy: "سياسة الخصوصية", reject: "رفض التقنيات الاختيارية", accept: "قبول التحليلات", url: "/privacy/" }
};
function loadAnalytics() {
  if (window.__avlAnalyticsLoaded) return;
  window.__avlAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args) => {
    window.dataLayer?.push(args);
  };
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  window.gtag("js", /* @__PURE__ */ new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
  window.gtag("config", ADS_ID);
}
function CookieConsent() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const copy2 = useMemo(() => consentCopy[language] ?? consentCopy.en, [language]);
  useEffect(() => {
    window.gtag = window.gtag || (() => void 0);
    let consent = null;
    try {
      consent = localStorage.getItem(CONSENT_KEY);
    } catch {
    }
    if (consent === "accepted") loadAnalytics();
    else if (consent !== "rejected") setVisible(true);
    const openSettings = (event) => {
      const target = event.target;
      if (target?.closest("[data-open-consent]")) {
        event.preventDefault();
        setVisible(true);
      }
    };
    document.addEventListener("click", openSettings);
    return () => document.removeEventListener("click", openSettings);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("consent-open", visible);
    return () => document.body.classList.remove("consent-open");
  }, [visible]);
  const choose = (choice) => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
    }
    if (choice === "accepted") loadAnalytics();
    setVisible(false);
  };
  if (!visible) return null;
  return /* @__PURE__ */ jsxs("section", { className: "consent-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": "consent-title", id: "analytics-consent", children: [
    /* @__PURE__ */ jsxs("div", { className: "consent-copy", children: [
      /* @__PURE__ */ jsx("span", { className: "consent-label", children: copy2.label }),
      /* @__PURE__ */ jsx("h2", { id: "consent-title", children: copy2.title }),
      /* @__PURE__ */ jsxs("p", { children: [
        copy2.body,
        " ",
        /* @__PURE__ */ jsx("a", { href: copy2.url, children: copy2.privacy }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "consent-actions", children: [
      /* @__PURE__ */ jsx("button", { className: "button consent-reject", type: "button", onClick: () => choose("rejected"), children: copy2.reject }),
      /* @__PURE__ */ jsx("button", { className: "button button-gold consent-accept", type: "button", onClick: () => choose("accepted"), children: copy2.accept })
    ] })
  ] });
}
const __vite_glob_0_0 = "/assets/vehicle-01-C0kMg0BS.webp";
const __vite_glob_0_1 = "/assets/vehicle-02-D52Khhvh.webp";
const __vite_glob_0_2 = "/assets/vehicle-03-BPAKkwhU.webp";
const __vite_glob_0_3 = "/assets/vehicle-04-BWMF1m43.webp";
const __vite_glob_0_4 = "/assets/vehicle-05-BZsmuEHE.webp";
const __vite_glob_0_5 = "/assets/vehicle-06-D09r98zE.webp";
const __vite_glob_0_6 = "/assets/vehicle-03-BPAKkwhU.webp";
const __vite_glob_0_7 = "/assets/vehicle-08-q6UFfmwQ.webp";
const __vite_glob_0_8 = "/assets/vehicle-09-BtC-xg65.webp";
const __vite_glob_0_9 = "/assets/vehicle-10-Imn8zYfk.webp";
const __vite_glob_0_10 = "/assets/vehicle-11-CEqWhYgh.webp";
const __vite_glob_0_11 = "/assets/vehicle-05-BZsmuEHE.webp";
const __vite_glob_0_12 = "/assets/vehicle-13-BU7VIM_t.webp";
const __vite_glob_1_0 = "/assets/customer-01-a7ahGCTs.jpg";
const __vite_glob_1_1 = "/assets/customer-02-87_ridy5.jpg";
const __vite_glob_1_2 = "/assets/customer-03-DtD0t1Z8.jpg";
const __vite_glob_1_3 = "/assets/customer-04-vbgO1zLM.jpg";
const __vite_glob_1_4 = "/assets/customer-05-DX0jqmDH.jpg";
const __vite_glob_1_5 = "/assets/customer-06-vV8lC0SV.jpg";
const hotelCatalog = Object.freeze({
  // Belek
  "rixos-premium-belek": { slug: "rixos-premium-belek", name: "Rixos Premium Belek", regionSlug: "belek", locationCopy: "Das Resort liegt am Strand von Belek, zwischen Kadriye und dem Belek Beach Park." },
  "the-land-of-legends": { slug: "the-land-of-legends", name: "The Land of Legends", regionSlug: "belek", locationCopy: "Das Hotel liegt in Kadriye, im Belek-Gebiet nahe dem Freizeit- und Einkaufsareal." },
  "maxx-royal-belek": { slug: "maxx-royal-belek", name: "Maxx Royal Belek", regionSlug: "belek", locationCopy: "Das Resort befindet sich an der Küste von Belek, in der Hotelzone südlich des Ortszentrums." },
  "regnum-carya": { slug: "regnum-carya", name: "Regnum Carya", regionSlug: "belek", locationCopy: "Das Hotel liegt im Bereich Kadriye in Belek, nahe der Golf- und Resortanlagen." },
  "gloria-golf-resort": { slug: "gloria-golf-resort", name: "Gloria Golf Resort", regionSlug: "belek", locationCopy: "Das Resort liegt im Belek-Gebiet bei Serik, in der Nähe der Golfanlagen und der Küste." },
  "cornelia-diamond-golf-resort": { slug: "cornelia-diamond-golf-resort", name: "Cornelia Diamond Golf Resort & Spa", regionSlug: "belek", locationCopy: "Das Resort liegt in Belek, unmittelbar an einer der renommierten Golfanlagen der Region und nahe der Küste." },
  "ic-hotels-santai": { slug: "ic-hotels-santai", name: "IC Hotels Santai Family Resort", regionSlug: "belek", locationCopy: "Das Familienresort befindet sich in Belek, südlich der D400 in der Küstenhotelzone nahe Kadriye." },
  // Side
  "arum-barut-collection": { slug: "arum-barut-collection", name: "Arum Barut Collection", regionSlug: "side", locationCopy: "Das Hotel liegt in Kumköy, einem Strand- und Hotelviertel westlich von Side." },
  "side-star-resort": { slug: "side-star-resort", name: "Side Star Resort", regionSlug: "side", locationCopy: "Das Resort befindet sich in Gündoğdu, im westlichen Hotelgebiet von Side." },
  "royal-dragon-hotel": { slug: "royal-dragon-hotel", name: "Royal Dragon Hotel", regionSlug: "side", locationCopy: "Das Hotel liegt in Evrenseki, einem beliebten Strandviertel westlich der Altstadt von Side." },
  "barut-hemera": { slug: "barut-hemera", name: "Barut Hemera", regionSlug: "side", locationCopy: "Das Resort liegt im Bereich Kumköy, nahe der Strandpromenade von Side." },
  "voyage-sorgun": { slug: "voyage-sorgun", name: "Voyage Sorgun", regionSlug: "side", locationCopy: "Das Resort liegt in Sorgun, östlich von Side zwischen Pinienwald und Küste." },
  "sentido-flora-garden": { slug: "sentido-flora-garden", name: "Sentido Flora Garden", regionSlug: "side", locationCopy: "Das Hotel befindet sich in Çolaklı, einem Küstenort westlich von Side mit langen Sandstränden." },
  "crystal-sunset-luxury-resort": { slug: "crystal-sunset-luxury-resort", name: "Crystal Sunset Luxury Resort & Spa", regionSlug: "side", locationCopy: "Das Resort liegt in Gündoğdu, im westlichen Strandabschnitt des Side-Gebiets." },
  // Kemer
  "rixos-premium-kemer": { slug: "rixos-premium-kemer", name: "Rixos Premium Kemer", regionSlug: "kemer", locationCopy: "Das Resort liegt in Göynük, einem Strandort unmittelbar westlich des Ortskerns von Kemer, umgeben von Pinienwäldern." },
  "maxx-royal-kemer": { slug: "maxx-royal-kemer", name: "Maxx Royal Kemer Resort", regionSlug: "kemer", locationCopy: "Das Resort befindet sich in Kiriş, einem Küstenabschnitt nördlich des Ortskerns von Kemer am Fuß des Taurus-Gebirges." },
  "orange-county-resort-kemer": { slug: "orange-county-resort-kemer", name: "Orange County Resort Hotel Kemer", regionSlug: "kemer", locationCopy: "Das Hotel liegt in Beldibi, am nördlichen Eingang der Kemerer Küste, nahe der Felsklippen am Mittelmeer." },
  "paloma-pasha-resort": { slug: "paloma-pasha-resort", name: "Paloma Pasha Resort", regionSlug: "kemer", locationCopy: "Das Resort befindet sich in Göynük, an der Küste zwischen der Strandpromenade und der Bucht westlich von Kemer." },
  "club-hotel-phaselis-rose": { slug: "club-hotel-phaselis-rose", name: "Club Hotel Phaselis Rose", regionSlug: "kemer", locationCopy: "Das Hotel liegt in Çamyuva, zwischen dem Kemer-Stadtzentrum und der antiken Stätte Phaselis an einer ruhigen Küstenbucht." },
  // Alanya
  "utopia-world-hotel": { slug: "utopia-world-hotel", name: "Utopia World Hotel", regionSlug: "alanya", locationCopy: "Das Hotel liegt in Konaklı, einem langen Sandstrandabschnitt westlich des Alanya-Zentrums." },
  "sentido-gold-island": { slug: "sentido-gold-island", name: "Sentido Gold Island Hotel", regionSlug: "alanya", locationCopy: "Das Resort liegt im Alanya-Zentrum, nahe dem Kleopatra-Strand und dem Alanya-Hafen." },
  "q-premium-resort": { slug: "q-premium-resort", name: "Q Premium Resort Hotel Alanya", regionSlug: "alanya", locationCopy: "Das Hotel befindet sich in Konaklı, westlich des Alanya-Zentrums, direkt am Sandstrand gelegen." },
  "kirman-arycanda": { slug: "kirman-arycanda", name: "Kirman Arycanda De Luxe", regionSlug: "alanya", locationCopy: "Das Resort liegt in Konaklı, einem Küstengebiet mit langen Stränden westlich des Alanya-Zentrums." },
  "delphin-diva": { slug: "delphin-diva", name: "Delphin Diva Premiere", regionSlug: "alanya", locationCopy: "Das Hotel befindet sich in Avsallar, einem ruhigen Strandort westlich von Alanya inmitten von Pinien- und Eukalyptuswäldern." },
  // Tekirova
  "rixos-premium-tekirova": { slug: "rixos-premium-tekirova", name: "Rixos Premium Tekirova", regionSlug: "tekirova", locationCopy: "Das Resort befindet sich in Tekirova, am Fuße des Taurus-Gebirges, umgeben von Pinienwäldern und dem türkisblauen Mittelmeer." },
  "amara-prestige": { slug: "amara-prestige", name: "Amara Prestige Hotel", regionSlug: "tekirova", locationCopy: "Das Hotel liegt in Tekirova, direkt am Mittelmeer zwischen dem Naturschutzgebiet Olympos und der antiken Stätte Phaselis." }
});
const hotelBySlug = (slug) => hotelCatalog[slug] ?? null;
const hotelsForRegion = (regionSlug) => Object.values(hotelCatalog).filter((hotel2) => hotel2.regionSlug === regionSlug);
Object.freeze(
  Object.keys(hotelCatalog).map((slug) => `/de/hotels/${slug}/`)
);
const hotelSlug = (name) => String(name).replace(/ı/g, "i").replace(/İ/g, "i").replace(/ğ/g, "g").replace(/Ğ/g, "g").replace(/ş/g, "s").replace(/Ş/g, "s").replace(/ç/g, "c").replace(/Ç/g, "c").replace(/ö/g, "o").replace(/Ö/g, "o").replace(/ü/g, "u").replace(/Ü/g, "u").normalize("NFD").replace(new RegExp("\\p{M}+", "gu"), "").toLowerCase().replace(/&/g, " ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const districtRegions = Object.freeze({
  // Antalya — €35 Vito
  "Antalya merkez": "antalya",
  "Konyaaltı": "antalya",
  "Lara": "antalya",
  "Kundu": "antalya",
  "Aksu": "antalya",
  // Belek — €40 Vito
  "Belek": "belek",
  "Kadriye": "belek",
  "Serik": "belek",
  // Boğazkent — €45 Vito
  "Boğazkent": "bogazkent",
  // Side — €50 Vito
  "Side": "side",
  "Kumköy": "side",
  "Gündoğdu": "side",
  "Evrenseki": "side",
  "Sorgun": "side",
  "Titreyengöl": "side",
  "Çolaklı": "side",
  // Manavgat — €50 Vito
  "Manavgat": "manavgat",
  // Manavgat/Kızılağaç — €60 Vito
  "Kızılağaç": "kizilagac",
  "Kızılot": "kizilagac",
  // Kemer — €55 Vito
  "Kemer": "kemer",
  "Beldibi": "kemer",
  "Göynük": "kemer",
  "Kiriş": "kemer",
  "Çamyuva": "kemer",
  // Tekirova — €75 Vito
  "Tekirova": "tekirova",
  // Batı Alanya — €70 Vito
  "Okurcalar": "alanya_bati",
  "İncekum": "alanya_bati",
  "Avsallar": "alanya_bati",
  "Türkler": "alanya_bati",
  "Payallar": "alanya_bati",
  "Konaklı": "alanya_bati",
  // Alanya merkez — €75 Vito
  "Alanya merkez": "alanya_merkez",
  "Oba": "alanya_merkez",
  "Tosmur": "alanya_merkez",
  // Doğu Alanya — €80 Vito
  "Kestel": "alanya_dogu",
  "Mahmutlar": "alanya_dogu",
  // Kargıcak — €90 Vito
  "Kargıcak": "kargicak",
  // Demirtaş — €100 Vito
  "Demirtaş": "demirtas"
});
const seedRows = [
  // --- Antalya city, Lara, Kundu, Konyaaltı -------------------------------
  ["Delphin Imperial Lara", "Lara"],
  ["Delphin Palace", "Lara"],
  ["Delphin BE Grand Resort", "Lara"],
  ["Titanic Beach Lara", "Kundu"],
  ["Titanic Mardan Palace", "Kundu", ["Mardan Palace"]],
  ["Concorde De Luxe Resort", "Lara"],
  ["Royal Wings Hotel", "Lara"],
  ["Royal Holiday Palace", "Kundu"],
  ["Royal Seginus", "Lara"],
  ["Miracle Resort Hotel", "Lara"],
  ["Baia Lara Hotel", "Lara"],
  ["Adalya Elite Lara", "Lara"],
  ["Limak Lara De Luxe Hotel", "Lara"],
  ["IC Hotels Green Palace", "Kundu"],
  ["IC Hotels Residence", "Kundu"],
  ["Sherwood Exclusive Lara", "Lara", ["Sherwood Breezes Resort"]],
  ["Lara Barut Collection", "Lara", ["Barut Lara"]],
  ["Fame Residence Lara", "Lara"],
  ["Rixos Downtown Antalya", "Konyaaltı"],
  ["Akra Hotel", "Antalya merkez", ["Akra Barut"]],
  ["Porto Bello Hotel Resort & Spa", "Konyaaltı"],
  ["Hotel Su & Aqualand", "Konyaaltı", ["Hotel SU"]],
  ["Crowne Plaza Antalya", "Konyaaltı"],
  ["Ramada Plaza Antalya", "Antalya merkez"],
  ["WOW Kremlin Palace", "Kundu", ["Kremlin Palace"]],
  ["WOW Topkapi Palace", "Kundu", ["Topkapi Palace"]],
  ["Venezia Palace Deluxe Resort", "Kundu"],
  ["Aska Lara Resort & Spa", "Lara"],
  ["Melas Lara Hotel", "Lara"],
  ["Nirvana Cosmopolitan Hotel", "Lara"],
  ["Kervansaray Kundu", "Kundu", ["Kervansaray Lara"]],
  ["Grand Park Lara", "Lara"],
  ["Trendy Lara Hotel", "Lara"],
  // --- Belek, Kadriye, Serik ----------------------------------------------
  ["Rixos Premium Belek", "Belek"],
  ["Rixos Park Belek", "Belek"],
  ["Regnum Carya", "Kadriye"],
  ["Maxx Royal Belek", "Belek", ["Maxx Royal Belek Golf Resort"]],
  ["Gloria Golf Resort", "Belek"],
  ["Gloria Verde Resort", "Belek"],
  ["Gloria Serenity Resort", "Belek"],
  ["Cornelia Diamond Golf Resort & Spa", "Belek"],
  ["Cornelia De Luxe Resort", "Belek"],
  ["Titanic Deluxe Golf Belek", "Belek"],
  ["Kaya Palazzo Golf Resort", "Belek"],
  ["Kaya Belek Hotel", "Belek"],
  ["Ela Excellence Resort Belek", "Belek", ["Ela Quality Resort"]],
  ["Susesi Luxury Resort", "Belek"],
  ["Sueno Hotels Deluxe Belek", "Belek"],
  ["Sueno Hotels Golf Belek", "Belek"],
  ["Voyage Belek Golf & Spa", "Belek"],
  ["Calista Luxury Resort", "Belek"],
  ["IC Hotels Santai Family Resort", "Belek"],
  ["Adam & Eve Hotels", "Belek"],
  ["Papillon Zeugma Relaxury", "Belek"],
  ["Papillon Ayscha Resort", "Belek"],
  ["Papillon Belvil Resort", "Belek"],
  ["Limak Atlantis De Luxe Hotel", "Belek"],
  ["Limak Arcadia Sport Resort", "Belek"],
  ["Robinson Club Nobilis", "Belek"],
  ["Spice Hotel & Spa", "Belek"],
  ["Xanadu Resort Hotel", "Belek"],
  ["Bellis Deluxe Hotel", "Belek"],
  ["Sirene Belek Hotel", "Belek"],
  ["Alva Donna Exclusive Hotel & Spa", "Belek"],
  ["Selectum Luxury Resort Belek", "Belek"],
  ["Selectum Family Resort Belek", "Belek"],
  ["Maritim Pine Beach Resort", "Belek"],
  ["Crystal Tat Beach Golf Resort & Spa", "Belek"],
  ["Crystal Family Resort & Spa", "Belek"],
  ["Belconti Resort Hotel", "Belek"],
  ["Granada Luxury Belek", "Belek"],
  ["Kirman Belazur Resort & Spa", "Belek"],
  ["Ethno Belek Hotel", "Belek"],
  ["Port Nature Luxury Resort", "Belek"],
  ["Novia Dionis Resort & Spa", "Belek"],
  ["Belek Beach Resort Hotel", "Belek"],
  ["The Land of Legends", "Kadriye", ["The Land of Legends Kingdom Hotel", "Legends", "Land of Legends Nickelodeon"]],
  ["Megasaray Club Belek", "Kadriye"],
  ["Innvista Hotel Belek", "Kadriye"],
  ["Cullinan Belek", "Kadriye"],
  ["Belek Diamonds Hotel", "Kadriye"],
  ["Dionisus Hotel & Spa Belek", "Kadriye"],
  ["Sarp Hotel Kadriye", "Kadriye"],
  ["TUI Magic Life Belek", "Kadriye"],
  ["Fun & Sun Smart River Resort", "Kadriye"],
  // --- Boğazkent -----------------------------------------------------------
  ["Crystal Waterworld Resort & Spa", "Boğazkent"],
  ["Aydinbey Famous Resort", "Boğazkent"],
  // Its own address reads Belek, TripAdvisor files it under Boğazkent. Split
  // evidence across a price boundary goes to the dearer side.
  ["Sherwood Dreams Resort", "Boğazkent"],
  // --- Side, Kumköy, Evrenseki, Gündoğdu ----------------------------------
  ["Barut Acanthus & Cennet", "Side"],
  ["Side Star Elegance", "Side"],
  ["Side Star Beach", "Side"],
  ["Robinson Club Side", "Side"],
  ["Crystal Sunset Luxury Resort & Spa", "Gündoğdu"],
  ["Arum Barut Collection", "Kumköy"],
  ["Barut Hemera", "Kumköy"],
  ["Sunis Kumköy Beach Resort", "Kumköy"],
  ["Sunis Elita Beach Resort", "Kumköy"],
  ["Sunprime C-Lounge", "Kumköy"],
  ["Hotel Terrace Beach Resort", "Kumköy"],
  ["Narcia Resort Side", "Kumköy"],
  ["Side Village Hotel", "Kumköy"],
  ["Castival Hotel", "Kumköy"],
  ["The Sense Deluxe Hotel", "Kumköy"],
  ["Trendy Verbena Beach Hotel", "Kumköy"],
  ["Seaden Quality Resort & Spa", "Kumköy"],
  ["Royal Dragon Hotel", "Evrenseki"],
  ["Sunis Evren Beach Resort", "Evrenseki"],
  ["Q Spa Resort", "Evrenseki"],
  ["Adalya Grand Art Side", "Evrenseki"],
  ["Adalya Resort & Spa", "Evrenseki"],
  ["Adalya Ocean Hotel", "Evrenseki"],
  ["Side Premium Hotel", "Evrenseki"],
  ["Side Crown Palace", "Evrenseki"],
  ["Royal Taj Mahal Hotel", "Evrenseki"],
  ["Seher Resort & Spa", "Evrenseki"],
  ["Seher Sun Beach", "Evrenseki"],
  ["Sultan of Side", "Evrenseki"],
  ["Side Sunport Hotel & Spa", "Evrenseki"],
  ["Miramare Queen Resort", "Evrenseki"],
  ["Side Star Resort", "Gündoğdu"],
  ["Trendy Aspendos Beach", "Gündoğdu"],
  ["TUI Magic Life Jacaranda", "Gündoğdu"],
  ["Terrace Elite Resort", "Gündoğdu"],
  ["Novum Garden Side Hotel", "Gündoğdu"],
  ["Crystal Palace Luxury Resort", "Gündoğdu"],
  ["Side Orange Paradise Hotel", "Gündoğdu"],
  // --- Sorgun and Titreyengöl ---------------------------------------------
  ["Voyage Sorgun", "Sorgun"],
  ["Ali Bey Resort Sorgun", "Sorgun"],
  ["Turquoise Resort Hotel & Spa", "Sorgun"],
  ["Melas Resort Hotel", "Sorgun"],
  ["Otium Hotel Seven Seas", "Sorgun", ["Seven Seas Hotel Blue"]],
  ["Otium Family Eco Club", "Sorgun"],
  ["Side Moon Palace Hotel", "Sorgun"],
  ["AQI Pegasos World", "Sorgun"],
  ["Megasaray Resort Side", "Sorgun"],
  ["Side Prenses Resort", "Titreyengöl"],
  ["Defne Defnem", "Titreyengöl"],
  ["Water Side Resort & Spa", "Titreyengöl"],
  ["Kaya Side", "Titreyengöl"],
  ["TUI Blue Side Family Resort", "Titreyengöl"],
  ["Lago Hotel", "Titreyengöl"],
  ["Monachus Hotel & Spa", "Titreyengöl"],
  ["La Vita Hotels", "Titreyengöl"],
  ["Asteria Collection Side", "Titreyengöl"],
  ["Marvida Family Eco Side", "Titreyengöl"],
  // --- Çolaklı --------------------------------------------------------------
  ["Alba Resort Hotel", "Çolaklı"],
  ["Alba Royal Hotel", "Çolaklı"],
  ["Alba Queen Hotel", "Çolaklı"],
  ["Aydinbey King's Palace", "Çolaklı"],
  ["Kirman Sidemarin Beach & Spa", "Çolaklı"],
  ["Von Resort Golden Coast", "Çolaklı"],
  ["Sentido Flora Garden", "Çolaklı"],
  ["Royal Alhambra Palace", "Çolaklı"],
  ["Mary Palace Resort & Spa", "Çolaklı"],
  ["Hane Sun Elite Hotel", "Çolaklı"],
  ["Sentido Kamelya Fulya", "Çolaklı", ["Kamelya Collection"]],
  ["Victory Resort Hotel", "Çolaklı"],
  ["Sural Garden Hotel", "Çolaklı"],
  // --- Kızılot and Kızılağaç ----------------------------------------------
  ["Sunmelia Beach Resort & Spa", "Kızılot"],
  ["Adalya Ocean Deluxe", "Kızılot"],
  ["Seaden Sea Planet Resort & Spa", "Kızılot"],
  ["Crystal Admiral Resort & Spa", "Kızılot"],
  ["Alarcha Hotels & Resort", "Kızılot"],
  ["Osay Magic Garden", "Kızılot"],
  ["Esmeralda Butik Otel", "Kızılot"],
  ["Selge Beach Resort & Spa", "Kızılağaç"],
  ["Seaden Sea World Resort & Spa", "Kızılağaç"],
  ["Asteria Bloom Side", "Kızılağaç"],
  ["Sultan of Dreams Hotel & Spa", "Kızılağaç"],
  // --- Kemer, Göynük, Beldibi, Kiriş, Çamyuva -----------------------------
  ["Club Med Palmiye", "Kemer"],
  ["Club Hotel Phaselis Rose", "Çamyuva", ["Phaselis Rose Hotel"]],
  ["Orange County Resort Hotel Kemer", "Beldibi"],
  ["Crystal Aura Beach Resort & Spa", "Kemer"],
  ["Crystal De Luxe Resort & Spa", "Kemer"],
  ["Kemer Barut Collection", "Kemer"],
  ["Grand Park Kemer", "Kemer"],
  ["Seven Seas Hotel Life Kemer", "Kemer"],
  ["Viking Star Hotel", "Kemer"],
  ["Rixos Sungate", "Beldibi"],
  ["Rixos Beldibi", "Beldibi"],
  ["Crystal Flora Beach Resort", "Beldibi"],
  ["Sealife Buket Resort & Beach", "Beldibi"],
  ["Alva Donna World Palace", "Beldibi"],
  ["Juju Premier Palace", "Beldibi"],
  ["Nirvana Mediterranean Excellence", "Beldibi"],
  ["Corendon Playa Kemer", "Beldibi"],
  ["The Grand Ring Hotel", "Beldibi"],
  ["Champion Holiday Village", "Beldibi"],
  ["Aydinbey Siu Collection", "Beldibi"],
  ["Rixos Premium Kemer", "Göynük"],
  ["Paloma Pasha Resort", "Göynük"],
  ["Sherwood Exclusive Kemer", "Göynük"],
  ["Queen's Park Le Jardin", "Göynük"],
  ["Ulusoy Kemer Holiday Club", "Göynük"],
  ["Mirage Park Resort", "Göynük"],
  ["Imperial Sunland Resort", "Göynük"],
  ["Maxx Royal Kemer Resort", "Kiriş"],
  ["Limak Limra Hotel & Resort", "Kiriş"],
  ["Aleria Belport Beach Hotel", "Çamyuva"],
  // --- Tekirova ------------------------------------------------------------
  ["Rixos Premium Tekirova", "Tekirova"],
  ["Amara Prestige Hotel", "Tekirova"],
  ["Amara Dolce Vita Luxury", "Tekirova"],
  ["Nirvana Dolce Vita", "Tekirova"],
  ["Marti Myra", "Tekirova"],
  ["Queen's Park Tekirova", "Tekirova"],
  ["Mövenpick Resort Tekirova", "Tekirova"],
  ["Güral Premier Tekirova", "Tekirova"],
  ["Rai Premium Tekirova", "Tekirova"],
  ["Le Marden Hotel Spa", "Tekirova"],
  // --- Alanya and its western resort strip ---------------------------------
  ["Kirman Leodikya Resort", "Okurcalar"],
  ["Aydinbey Gold Dreams", "Okurcalar"],
  ["Justiniano Deluxe Resort", "Okurcalar"],
  ["Sidera Kirman Premium", "Okurcalar"],
  ["Orange County Alanya", "Okurcalar"],
  ["Alaiye Resort & Spa", "Avsallar"],
  ["Numa Bay Exclusive", "Avsallar"],
  ["Granada Luxury Beach", "Avsallar"],
  ["Bera Alanya Hotel", "Avsallar"],
  ["Delphin Diva Premiere", "Avsallar"],
  ["Azura Deluxe Resort & Spa", "Avsallar"],
  ["Rubi Platinum Spa Resort", "Avsallar"],
  ["Otel İncekum Su", "İncekum"],
  ["Utopia World Hotel", "Konaklı"],
  ["Delphin Botanik Platinum", "Türkler"],
  ["Sirius Deluxe Hotel", "Türkler"],
  ["Long Beach Resort Hotel", "Konaklı"],
  ["Q Premium Resort Hotel Alanya", "Konaklı"],
  ["Kirman Arycanda De Luxe", "Konaklı"],
  ["Alan Xafira Deluxe Resort", "Konaklı"],
  ["Kahya Resort Aqua & Spa", "Konaklı"],
  ["The Antik Hotel", "Konaklı"],
  ["Asia Beach Resort & Spa", "Alanya merkez"],
  ["Sentido Gold Island Hotel", "Alanya merkez"],
  ["Klas More Beach Hotel", "Mahmutlar"],
  ["Sey Beach Hotel & Spa", "Kestel"],
  ["Goldcity Hotel", "Kargıcak"],
  ["Lumos Deluxe Resort Hotel", "Kargıcak"]
];
const verifiedSlugs = new Set(Object.values(hotelCatalog).map((hotel2) => hotelSlug(hotel2.name)));
const hotelIndex = Object.freeze(
  seedRows.map(([name, district, aliases = []]) => {
    const slug = hotelSlug(name);
    const region = districtRegions[district];
    if (!region) throw new Error(`Hotel "${name}" sits in unmapped district "${district}"`);
    return Object.freeze({
      slug,
      name,
      region,
      district,
      aliases: Object.freeze([...aliases]),
      status: verifiedSlugs.has(slug) ? "verified" : "draft"
    });
  })
);
const indexedHotelBySlug = (slug) => hotelIndex.find((hotel2) => hotel2.slug === slug) ?? null;
const LETTER_FOLD = { "ı": "i", "ß": "ss", "æ": "ae", "ø": "o", "đ": "d", "ł": "l", "þ": "th" };
const CYRILLIC_FOLD = {
  "а": "a",
  "б": "b",
  "в": "v",
  "г": "g",
  "ґ": "g",
  "д": "d",
  "е": "e",
  "ё": "e",
  "є": "e",
  "ж": "zh",
  "з": "z",
  "и": "i",
  "і": "i",
  "ї": "i",
  "й": "i",
  "к": "k",
  "л": "l",
  "м": "m",
  "н": "n",
  "о": "o",
  "п": "p",
  "р": "r",
  "с": "s",
  "т": "t",
  "у": "u",
  "ф": "f",
  "х": "h",
  "ц": "ts",
  "ч": "ch",
  "ш": "sh",
  "щ": "sch",
  "ъ": "",
  "ы": "y",
  "ь": "",
  "э": "e",
  "ю": "yu",
  "я": "ya"
};
function foldHotelText(value) {
  const lowered = String(value ?? "").replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase();
  let folded = "";
  for (const character of lowered.normalize("NFD").replace(new RegExp("\\p{M}+", "gu"), "")) {
    folded += CYRILLIC_FOLD[character] ?? LETTER_FOLD[character] ?? character;
  }
  return folded.replace(/[^a-z0-9]+/g, " ").trim();
}
const phoneticKey = (folded) => folded.replace(/ph/g, "f").replace(/ck/g, "k").replace(/[cq]/g, "k").replace(/w/g, "v").replace(/x/g, "ks").replace(/y/g, "i").replace(/(.)\1+/g, "$1");
const tokenize = (value) => foldHotelText(value).split(" ").filter(Boolean).map((raw) => ({ raw, key: phoneticKey(raw) }));
function editDistance(a, b, limit) {
  if (Math.abs(a.length - b.length) > limit) return limit + 1;
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
      if (current[j] < best) best = current[j];
    }
    if (best > limit) return limit + 1;
    previous = current;
  }
  return previous[b.length];
}
function tokenAffinity(queryToken, hotelToken) {
  if (hotelToken.raw.startsWith(queryToken.raw)) return 2;
  if (queryToken.key.length < 2) return 0;
  if (hotelToken.key.startsWith(queryToken.key)) return 1;
  if (queryToken.key.length >= 4 && editDistance(queryToken.key, hotelToken.key.slice(0, queryToken.key.length + 1), 1) <= 1) return 1;
  return 0;
}
const prepareEntries = (index) => index.map((hotel2) => ({
  hotel: hotel2,
  foldedName: foldHotelText(hotel2.name),
  fields: [
    { tokens: tokenize(hotel2.name), weight: 60 },
    ...hotel2.aliases.map((alias) => ({ tokens: tokenize(alias), weight: 45 })),
    { tokens: tokenize(hotel2.district), weight: 20 }
  ]
}));
const preparedCache = /* @__PURE__ */ new WeakMap();
const preparedFor = (index) => {
  const cached = preparedCache.get(index);
  if (cached) return cached;
  const prepared = prepareEntries(index);
  preparedCache.set(index, prepared);
  return prepared;
};
function bestTokenScore(entry2, queryToken) {
  let best = 0;
  for (const field of entry2.fields) {
    for (const hotelToken of field.tokens) {
      const affinity = tokenAffinity(queryToken, hotelToken);
      if (affinity === 0) continue;
      const candidate = field.weight + affinity * 5 + (hotelToken.raw === queryToken.raw ? 10 : 0);
      if (candidate > best) best = candidate;
    }
  }
  return best;
}
function scoreEntry(entry2, queryTokens, foldedQuery, minimumMatched) {
  let score = 0;
  let matched = 0;
  for (const queryToken of queryTokens) {
    const best = bestTokenScore(entry2, queryToken);
    if (best === 0) continue;
    matched += 1;
    score += best;
  }
  if (matched < minimumMatched) return null;
  score -= (queryTokens.length - matched) * 25;
  if (entry2.foldedName === foldedQuery) score += 400;
  else if (entry2.foldedName.startsWith(foldedQuery)) score += 150;
  if (entry2.hotel.status === "verified") score += 5;
  return score - entry2.foldedName.length / 100;
}
const rank = (prepared, queryTokens, foldedQuery, minimumMatched, limit) => {
  const scored = [];
  for (const entry2 of prepared) {
    const score = scoreEntry(entry2, queryTokens, foldedQuery, minimumMatched);
    if (score !== null) scored.push({ hotel: entry2.hotel, score });
  }
  scored.sort((a, b) => b.score - a.score || a.hotel.name.localeCompare(b.hotel.name, "tr"));
  return scored.slice(0, limit).map((match) => match.hotel);
};
function searchHotels(query, { limit = 8, index = hotelIndex } = {}) {
  const foldedQuery = foldHotelText(query);
  if (foldedQuery.length < 2) return [];
  const queryTokens = tokenize(foldedQuery);
  const prepared = preparedFor(index);
  const strict = rank(prepared, queryTokens, foldedQuery, queryTokens.length, limit);
  if (strict.length > 0 || queryTokens.length < 2) return strict;
  return rank(prepared, queryTokens, foldedQuery, Math.ceil(queryTokens.length / 2), limit);
}
function HotelCombobox({
  id,
  value,
  onChange,
  onSelect,
  onNotListed,
  placeholder,
  regionLabel,
  notListedLabel,
  noResultsLabel,
  describedBy
}) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const matches = useMemo(() => open ? searchHotels(value) : [], [open, value]);
  const showEmptyNote = open && matches.length === 0 && value.trim().length >= 2;
  const close = () => {
    setOpen(false);
    setActiveIndex(-1);
  };
  const choose = (hotel2) => {
    onSelect(hotel2);
    close();
  };
  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown" && !open) {
      setOpen(true);
      return;
    }
    if (!open) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (matches.length === 0) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((current) => Math.min(matches.length - 1, Math.max(-1, current + step)));
      return;
    }
    if (event.key === "Enter" && activeIndex >= 0 && matches[activeIndex]) {
      event.preventDefault();
      choose(matches[activeIndex]);
      return;
    }
    if (event.key === "Escape") close();
  };
  return /* @__PURE__ */ jsxs("div", { className: "hotel-combobox", children: [
    /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
      /* @__PURE__ */ jsx(Icon, { name: "pin", className: "icon" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id,
          type: "text",
          role: "combobox",
          autoComplete: "off",
          maxLength: 120,
          placeholder,
          value,
          "aria-expanded": open && matches.length > 0,
          "aria-controls": listId,
          "aria-autocomplete": "list",
          "aria-activedescendant": activeIndex >= 0 ? `${listId}-${activeIndex}` : void 0,
          "aria-describedby": describedBy,
          onChange: (event) => {
            onChange(event.target.value);
            setOpen(true);
            setActiveIndex(-1);
          },
          onKeyDown: handleKeyDown,
          onBlur: close
        }
      )
    ] }),
    (matches.length > 0 || showEmptyNote) && /* @__PURE__ */ jsxs("div", { className: "hotel-combobox-popover", onMouseDown: (event) => event.preventDefault(), children: [
      /* @__PURE__ */ jsx("ul", { className: "hotel-combobox-list", id: listId, role: "listbox", children: matches.map((hotel2, index) => /* @__PURE__ */ jsxs(
        "li",
        {
          id: `${listId}-${index}`,
          role: "option",
          "aria-selected": index === activeIndex,
          className: `hotel-combobox-option${index === activeIndex ? " is-active" : ""}`,
          onMouseEnter: () => setActiveIndex(index),
          onClick: () => choose(hotel2),
          children: [
            /* @__PURE__ */ jsx("span", { className: "hotel-combobox-name", children: hotel2.name }),
            /* @__PURE__ */ jsxs("span", { className: "hotel-combobox-meta", children: [
              hotel2.district,
              " · ",
              regionLabel(hotel2.region)
            ] })
          ]
        },
        hotel2.slug
      )) }),
      showEmptyNote && /* @__PURE__ */ jsx("p", { className: "hotel-combobox-empty", children: noResultsLabel }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "hotel-combobox-dismiss",
          onClick: () => {
            close();
            onNotListed?.();
          },
          children: notListedLabel
        }
      )
    ] })
  ] });
}
const DAILY_CHAUFFEUR_RATE_EUR = 150;
const MAX_DAILY_CHAUFFEUR_DAYS = 30;
const normalize = (value) => value.trim().replace(/\s+/g, " ");
const validName = (value) => {
  const normalized = normalize(value);
  return normalized.length >= 2 && normalized.length <= 80 && (normalized.match(new RegExp("\\p{L}", "gu"))?.length ?? 0) >= 2 && !/\d/u.test(normalized);
};
function inclusiveDayCount(start, end) {
  const startAt = Date.parse(`${start}T00:00:00Z`);
  const endAt = Date.parse(`${end}T00:00:00Z`);
  if (!Number.isFinite(startAt) || !Number.isFinite(endAt)) return 0;
  return Math.floor((endAt - startAt) / 864e5) + 1;
}
function createPublicBookingSchema(t) {
  return z.object({
    tripType: z.enum(["one_way", "round_trip", "daily_chauffeur"]),
    pickup: z.enum(["airport", "hotel", "private_address"]),
    destination: z.string(),
    vehicle: z.enum(["vito", "sprinter"]),
    guests: z.string(),
    luggage: z.string(),
    childSeats: z.string(),
    childAges: z.array(z.string()).default([]),
    travelDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, t("dateInvalid", "Please select a valid date.")),
    arrivalTime: z.string(),
    flightNumber: z.string(),
    returnDate: z.string(),
    returnPickupTime: z.string(),
    returnFlightNumber: z.string(),
    serviceEndDate: z.string(),
    pickupTime: z.string(),
    departureFlightDate: z.string(),
    departureFlightTime: z.string(),
    departureFlightNumber: z.string(),
    pickupAddress: z.string(),
    dropoffAddress: z.string(),
    hotelName: z.string(),
    hotelRegion: z.string().default(""),
    customerName: z.string(),
    customerPhone: z.string(),
    customerEmail: z.string()
  }).superRefine((values, context) => {
    const today = /* @__PURE__ */ new Date();
    const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const guests = Number(values.guests);
    const luggage = Number(values.luggage);
    const childSeats = Number(values.childSeats);
    const capacity = values.vehicle === "sprinter" ? 13 : 7;
    if (values.travelDate < localToday) context.addIssue({ code: "custom", path: ["travelDate"], message: t("dateInvalid", "Please select a future date.") });
    if (!Number.isInteger(guests) || guests < 1 || guests > capacity) context.addIssue({ code: "custom", path: ["guests"], message: t("capacityNoVehicle", "Please select a suitable vehicle.") });
    if (values.luggage === "" || !Number.isInteger(luggage) || luggage < 0 || luggage > 12) context.addIssue({ code: "custom", path: ["luggage"], message: t("luggageRequired", "Please select the number of large bags.") });
    if (!Number.isInteger(childSeats) || childSeats < 0 || childSeats > 4) context.addIssue({ code: "custom", path: ["childSeats"], message: t("requiredField", "Please check this field.") });
    for (let i = 0; i < childSeats; i++) {
      const age = Number(values.childAges?.[i]);
      if (!Number.isInteger(age) || age < 0 || age > 11 || values.childAges?.[i] === "" || values.childAges?.[i] === void 0) {
        context.addIssue({ code: "custom", path: ["childAges", i], message: t("childAgeRequired", "Please select the child's age.") });
      }
    }
    if (values.tripType === "round_trip") {
      if (!values.returnDate) context.addIssue({ code: "custom", path: ["returnDate"], message: t("returnDateRequired", "Please select the return date.") });
      else if (values.returnDate < values.travelDate) context.addIssue({ code: "custom", path: ["returnDate"], message: t("returnDateInvalid", "The return date cannot be earlier.") });
      if (!values.returnPickupTime) context.addIssue({ code: "custom", path: ["returnPickupTime"], message: t("returnTimeRequired", "Please select the return pick-up time.") });
    }
    if (values.tripType === "daily_chauffeur") {
      const days = inclusiveDayCount(values.travelDate, values.serviceEndDate);
      if (!values.pickupTime) context.addIssue({ code: "custom", path: ["pickupTime"], message: t("dailyPickupTimeRequired", "Please select the daily service start time.") });
      if (!values.serviceEndDate) context.addIssue({ code: "custom", path: ["serviceEndDate"], message: t("serviceEndDateRequired", "Please select the last service day.") });
      else if (days < 1 || days > MAX_DAILY_CHAUFFEUR_DAYS) context.addIssue({ code: "custom", path: ["serviceEndDate"], message: t("servicePeriodInvalid", "Please select a period between 1 and 30 days.") });
      const hasDepartureDetails = Boolean(values.departureFlightTime || normalize(values.departureFlightNumber));
      if (hasDepartureDetails && !values.departureFlightDate) context.addIssue({ code: "custom", path: ["departureFlightDate"], message: t("departureFlightDateRequired", "Please select the departure flight date.") });
      if (values.departureFlightDate && values.departureFlightDate < values.travelDate) context.addIssue({ code: "custom", path: ["departureFlightDate"], message: t("departureFlightDateInvalid", "Departure flight date cannot be before the service starts.") });
    } else if (!values.destination) {
      context.addIssue({ code: "custom", path: ["destination"], message: t("destinationRequired", "Please select a destination.") });
    }
    if (values.pickup === "private_address" && (normalize(values.pickupAddress).length < 6 || normalize(values.pickupAddress).length > 160)) {
      context.addIssue({ code: "custom", path: ["pickupAddress"], message: t("pickupAddressRequired", "Please enter the full pick-up address.") });
    }
    if (values.tripType !== "daily_chauffeur" && values.destination === "private_address" && (normalize(values.dropoffAddress).length < 6 || normalize(values.dropoffAddress).length > 160)) {
      context.addIssue({ code: "custom", path: ["dropoffAddress"], message: t("dropoffAddressRequired", "Please enter the full drop-off address.") });
    }
    if (values.tripType !== "daily_chauffeur" && values.pickup === "private_address" && values.destination === "private_address" && normalize(values.pickupAddress).toLowerCase() === normalize(values.dropoffAddress).toLowerCase()) {
      context.addIssue({ code: "custom", path: ["dropoffAddress"], message: t("addressesMustDiffer", "Pick-up and drop-off addresses must be different.") });
    }
    const needsHotel = values.tripType === "daily_chauffeur" || values.pickup === "hotel" || values.destination !== "private_address";
    if (needsHotel && (normalize(values.hotelName).length < 2 || normalize(values.hotelName).length > 120)) {
      context.addIssue({ code: "custom", path: ["hotelName"], message: t("hotelNameRequired", "Please enter the hotel name.") });
    }
    if (!validName(values.customerName)) context.addIssue({ code: "custom", path: ["customerName"], message: t("nameInvalid", "Please enter a valid full name.") });
    const phone = normalize(values.customerPhone).replace(/^00/, "+");
    if (!phone.startsWith("+") || !parsePhoneNumberFromString(phone)?.isValid()) {
      context.addIssue({ code: "custom", path: ["customerPhone"], message: t("phoneInvalid", "Please enter a valid international phone number.") });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.customerEmail.trim()) || values.customerEmail.trim().length > 120) {
      context.addIssue({ code: "custom", path: ["customerEmail"], message: t("emailInvalid", "Please enter a valid email address.") });
    }
    if (values.tripType !== "daily_chauffeur" && !normalize(values.flightNumber)) {
      context.addIssue({ code: "custom", path: ["flightNumber"], message: t("arrivalFlightNumberRequired", "Please enter the arrival flight number.") });
    }
    for (const field of ["flightNumber", "returnFlightNumber", "departureFlightNumber"]) {
      const flight = normalize(values[field]);
      if (flight && !/^[a-z0-9][a-z0-9 -]{1,11}$/i.test(flight)) {
        context.addIssue({ code: "custom", path: [field], message: t("flightInvalid", "Please enter a valid flight number.") });
      }
    }
  });
}
function pricedRouteSlug(values) {
  const slug = values.destination === "airport" ? values.hotelRegion ?? "" : values.destination;
  return slug in routeCatalog ? slug : "";
}
function quoteFor(values, overrides) {
  if (values.tripType === "daily_chauffeur") {
    const days = inclusiveDayCount(values.travelDate, values.serviceEndDate);
    const dailyRate = overrides?.dailyRates?.[values.vehicle] ?? DAILY_CHAUFFEUR_RATE_EUR;
    const price = days > 0 && days <= MAX_DAILY_CHAUFFEUR_DAYS ? days * dailyRate : 0;
    return { price, originalPrice: price };
  }
  const slug = pricedRouteSlug(values);
  const route = routeCatalog[slug];
  if (!route) return { price: 0, originalPrice: 0 };
  const journeys = values.tripType === "round_trip" ? 2 : 1;
  const liveUnitPrice = overrides?.routePrices?.[`${slug}:${values.vehicle}`];
  const unitPrice = liveUnitPrice ?? route.prices[values.vehicle];
  return {
    price: unitPrice * journeys,
    originalPrice: route.originalPrices[values.vehicle] * journeys
  };
}
async function fetchLivePriceOverrides() {
  try {
    const { supabase } = await import("./assets/supabase-vpckcPMN.js");
    if (!supabase) return {};
    const [{ data: routeRows }, { data: rateRows }] = await Promise.all([
      supabase.from("routes").select("to_location, vehicle_type, price_eur").eq("from_location", "airport"),
      supabase.from("chauffeur_service_rates").select("vehicle_type, daily_rate_eur")
    ]);
    const routePrices = {};
    for (const row of routeRows ?? []) {
      const vehicle = row.vehicle_type === "vclass" ? "sprinter" : "vito";
      routePrices[`${row.to_location}:${vehicle}`] = Number(row.price_eur);
    }
    const dailyRates = {};
    for (const row of rateRows ?? []) {
      const vehicle = row.vehicle_type === "vclass" ? "sprinter" : "vito";
      dailyRates[vehicle] = Number(row.daily_rate_eur);
    }
    return { routePrices, dailyRates };
  } catch {
    return {};
  }
}
function buildPublicBookingPayload(values, language, fuelTermsAccepted = false) {
  const isDailyChauffeur = values.tripType === "daily_chauffeur";
  if (isDailyChauffeur && !fuelTermsAccepted) throw new Error("Fuel terms must be accepted before booking");
  return {
    customer_name: normalize(values.customerName),
    customer_email: values.customerEmail.trim().toLowerCase(),
    customer_phone: normalize(values.customerPhone).replace(/^00/, "+"),
    hotel_name: normalize(values.hotelName) || "Not specified",
    child_seat_count: Number(values.childSeats),
    child_ages: Array.from({ length: Number(values.childSeats) }, (_, i) => Number(values.childAges?.[i] ?? 0)),
    luggage_count: Number(values.luggage),
    flight_number: normalize(values.flightNumber).toUpperCase() || null,
    flight_arrival_time: values.arrivalTime || null,
    pickup_location: values.pickup,
    pickup_address: values.pickup === "private_address" ? normalize(values.pickupAddress) : null,
    pickup_time: isDailyChauffeur ? values.pickupTime : null,
    dropoff_location: isDailyChauffeur ? null : values.destination,
    dropoff_address: !isDailyChauffeur && values.destination === "private_address" ? normalize(values.dropoffAddress) : null,
    pickup_date: values.travelDate,
    trip_type: values.tripType,
    return_date: values.tripType === "round_trip" ? values.returnDate : null,
    return_pickup_time: values.tripType === "round_trip" ? values.returnPickupTime : null,
    return_flight_number: values.tripType === "round_trip" ? normalize(values.returnFlightNumber).toUpperCase() || null : null,
    service_end_date: isDailyChauffeur ? values.serviceEndDate : null,
    departure_flight_date: isDailyChauffeur ? values.departureFlightDate || null : null,
    departure_flight_time: isDailyChauffeur ? values.departureFlightTime || null : null,
    departure_flight_number: isDailyChauffeur ? normalize(values.departureFlightNumber).toUpperCase() || null : null,
    fuel_terms_accepted: isDailyChauffeur ? fuelTermsAccepted : null,
    guests: Number(values.guests),
    vehicle_type: values.vehicle === "sprinter" ? "vclass" : "vito",
    payment_method: "cash",
    language
  };
}
const todayISO = () => {
  const date = /* @__PURE__ */ new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};
function FieldErrorMessage({ error }) {
  return error ? /* @__PURE__ */ jsx("span", { className: "field-error-message", role: "alert", children: error.message }) : null;
}
const DEFAULT_PHONE_COUNTRY = {
  en: "GB",
  de: "DE",
  tr: "TR",
  ru: "RU",
  cs: "CZ",
  ar: "SA",
  pl: "PL",
  nl: "NL",
  uk: "UA",
  ur: "PK",
  fr: "FR",
  sv: "SE",
  ja: "JP",
  ko: "KR"
};
function whatsappConfirmation(values, bookingRef, price) {
  const isDailyChauffeur = values.tripType === "daily_chauffeur";
  const routeName = routeCatalog[values.destination]?.names.en ?? values.destination;
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
    `👥 Guests: ${values.guests}`
  ];
  if (!isDailyChauffeur) lines.splice(7, 0, `🏁 Dropoff: ${values.destination === "private_address" ? values.dropoffAddress : routeName}`);
  if (values.hotelName) lines.push(`🏨 Hotel: ${values.hotelName}`);
  const childSeatCount = Number(values.childSeats) || 0;
  if (childSeatCount > 0) {
    const ages = (values.childAges || []).slice(0, childSeatCount).map((age) => Number(age));
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
      "⛽ Fuel: Excluded — paid separately by the customer based on use"
    );
    if (values.departureFlightDate) lines.push(`✈️ Departure: ${values.departureFlightDate} ${values.departureFlightTime} ${values.departureFlightNumber}`.trim());
  }
  if (price) lines.push(`💶 Price: €${price}`);
  return `https://wa.me/905302655790?text=${encodeURIComponent(lines.join("\n"))}`;
}
function BookingForm({
  selection,
  scrollOnSelect = true
}) {
  const { language, t } = useLanguage();
  const schema = useMemo(() => createPublicBookingSchema(t), [t]);
  const [step, setStep] = useState(1);
  const [minimumDate, setMinimumDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [pendingDailyBooking, setPendingDailyBooking] = useState(null);
  const [fuelAcknowledged, setFuelAcknowledged] = useState(false);
  const [liveOverrides, setLiveOverrides] = useState({});
  const [hotelMatch, setHotelMatch] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    trigger,
    control,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      tripType: "one_way",
      pickup: "airport",
      destination: "",
      vehicle: "vito",
      guests: "2",
      luggage: "",
      childSeats: "0",
      childAges: [],
      travelDate: "",
      arrivalTime: "",
      flightNumber: "",
      returnDate: "",
      returnPickupTime: "",
      returnFlightNumber: "",
      pickupAddress: "",
      serviceEndDate: "",
      pickupTime: "",
      departureFlightDate: "",
      departureFlightTime: "",
      departureFlightNumber: "",
      dropoffAddress: "",
      hotelName: "",
      hotelRegion: "",
      customerName: "",
      customerPhone: "",
      customerEmail: ""
    }
  });
  const values = watch();
  const isDailyChauffeur = values.tripType === "daily_chauffeur";
  const hireDays = isDailyChauffeur ? inclusiveDayCount(values.travelDate, values.serviceEndDate) : 0;
  const quote = quoteFor(values, liveOverrides);
  const dailyRateEur = liveOverrides.dailyRates?.[values.vehicle] ?? DAILY_CHAUFFEUR_RATE_EUR;
  const regionLabel = (region) => {
    const route = routeCatalog[region];
    return route ? route.names[language] ?? route.names.en : region;
  };
  const pricedRoute = pricedRouteSlug(values);
  const selectedRoute = routeCatalog[pricedRoute];
  const selectedRouteName = selectedRoute ? regionLabel(pricedRoute) : void 0;
  const pickupName = values.pickup === "airport" ? t("airportOption", "Antalya Airport (AYT)") : values.pickup === "hotel" ? t("hotelOption", "Hotel") : t("privateAddressOption", "Private address");
  const destinationName = values.destination === "airport" ? t("airportOption", "Antalya Airport (AYT)") : values.destination === "private_address" ? t("privateAddressOption", "Private address") : selectedRouteName ?? values.destination;
  const pickupLabel = values.pickup === "hotel" && selectedRouteName ? selectedRouteName : pickupName;
  const isPrivateAddressQuote = !isDailyChauffeur && values.pickup === "private_address" && values.destination === "private_address";
  const vitoFits = Number(values.guests) <= 6 && Number(values.luggage) <= 6 && Number(values.guests) + Number(values.luggage) <= 12;
  const hasPrice = !isDailyChauffeur && selectedRoute && quote.price > 0;
  const childSeatCount = Number(values.childSeats) || 0;
  const hotelSetsDestination = !isDailyChauffeur && values.pickup !== "hotel" && values.destination !== "airport" && values.destination !== "private_address";
  const hotelNeeded = isDailyChauffeur || values.pickup === "hotel" || values.destination !== "private_address";
  const hotelMatchLabel = !hotelMatch ? "" : hotelMatch.district === regionLabel(hotelMatch.region) ? `${hotelMatch.name} — ${hotelMatch.district}` : `${hotelMatch.name} · ${hotelMatch.district} — ${regionLabel(hotelMatch.region)}`;
  const handleHotelInput = (name) => {
    setValue("hotelName", name, { shouldValidate: false });
    if (!hotelMatch || name === hotelMatch.name) return;
    setHotelMatch(null);
    setValue("hotelRegion", "", { shouldValidate: false });
  };
  const handleHotelSelect = (hotel2) => {
    setValue("hotelName", hotel2.name, { shouldValidate: true });
    setValue("hotelRegion", hotel2.region, { shouldValidate: false });
    setHotelMatch(hotel2);
    if (!hotelSetsDestination) return;
    setValue("destination", hotel2.region, { shouldValidate: true });
    window.gtag?.("event", "hotel_region_detected", { hotel: hotel2.slug, region: hotel2.region });
  };
  useEffect(() => {
    setValue("childAges", Array.from({ length: childSeatCount }, (_, i) => values.childAges?.[i] ?? ""), { shouldValidate: false });
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
  const createValidatedBooking = async (formValues, acceptedFuelTerms = false) => {
    setSubmitting(true);
    setSubmitError("");
    const currentQuote = quoteFor(formValues, liveOverrides);
    window.gtag?.("event", "begin_checkout", { currency: "EUR", value: currentQuote.price, trip_type: formValues.tripType });
    try {
      const { createBooking } = await import("./assets/api-Bc8F4tNA.js");
      const booking = await createBooking(buildPublicBookingPayload(formValues, language, acceptedFuelTerms));
      const confirmedPrice = Number(booking.price_eur) || currentQuote.price;
      const message = formValues.tripType === "daily_chauffeur" ? t("dailyCashConfirmation", "Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.") : formValues.destination === "airport" ? t("airportReturnPrice", "The price will be confirmed after we check the pick-up address.") : formValues.destination === "private_address" ? t("customDestinationPrice", "The price will be confirmed after we check the drop-off address.") : t("cashConfirmation", "Your booking is confirmed. Pay the fixed total directly to your driver in the vehicle.");
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
  const submit = (formValues) => {
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
  const advanceToStep2 = async () => {
    if (!isDailyChauffeur && !values.destination) {
      setError("destination", { message: t("destinationRequired", "Please select a destination.") });
      return;
    }
    if (hotelNeeded && !await trigger("hotelName")) return;
    window.gtag?.("event", "price_shown", { route: values.destination, price: quote.price, vehicle: values.vehicle });
    setStep(2);
    window.setTimeout(() => document.querySelector("#travel-date")?.focus(), 100);
  };
  const advanceToStep3 = async () => {
    const step2Fields = ["travelDate", "luggage", "childSeats", "childAges"];
    if (values.tripType === "round_trip") step2Fields.push("returnDate", "returnPickupTime");
    if (values.pickup === "private_address") step2Fields.push("pickupAddress");
    if (values.destination === "private_address") step2Fields.push("dropoffAddress");
    if (!isDailyChauffeur) step2Fields.push("flightNumber");
    const valid = await trigger(step2Fields);
    if (!valid) return;
    window.gtag?.("event", "booking_started", { route: values.destination, price: quote.price });
    setStep(3);
    window.setTimeout(() => document.querySelector("#customer-name")?.focus(), 100);
  };
  const fieldClass = (error) => `booking-field${error ? " has-error" : ""}`;
  const renderHotelField = () => /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.hotelName), htmlFor: "hotel-name", children: [
    /* @__PURE__ */ jsx("span", { children: t("hotelNameLabel", "Hotel name") }),
    /* @__PURE__ */ jsx(
      HotelCombobox,
      {
        id: "hotel-name",
        value: values.hotelName,
        onChange: handleHotelInput,
        onSelect: handleHotelSelect,
        onNotListed: () => document.querySelector("#destination")?.focus(),
        placeholder: t("hotelNamePlaceholder", "Hotel or accommodation name"),
        regionLabel,
        notListedLabel: t("hotelNotListed", "My hotel is not in the list"),
        noResultsLabel: t("hotelNoMatch", "No match yet. Type the name and pick the region yourself."),
        describedBy: hotelSetsDestination ? "hotel-region-hint" : void 0
      }
    ),
    /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.hotelName })
  ] });
  const openTimePicker = (id) => {
    const input = document.querySelector(`#${id}`);
    input?.focus();
    try {
      input?.showPicker?.();
    } catch {
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "booking-shell", id: "booking", "aria-labelledby": "booking-title", children: [
    /* @__PURE__ */ jsxs("div", { className: "booking-shell-inner", children: [
      /* @__PURE__ */ jsxs("div", { className: "booking-shell-header", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "mini-label", children: t("privateJourney", "Your private journey") }),
          /* @__PURE__ */ jsx("h2", { id: "booking-title", children: t("bookTransfer", "Book your transfer") })
        ] }),
        /* @__PURE__ */ jsx("div", { id: "booking-price-display", className: `booking-price-display${isDailyChauffeur || values.destination ? " visible" : ""}`, children: isDailyChauffeur ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("span", { className: "price-display-route", children: [
            t("dailyChauffeur", "Daily vehicle + chauffeur"),
            " · ",
            hireDays || 0,
            " ",
            t("days", "days")
          ] }),
          /* @__PURE__ */ jsx("span", { className: "price-display-prices", children: /* @__PURE__ */ jsxs("strong", { className: "price-display-amount", children: [
            "€",
            quote.price
          ] }) }),
          /* @__PURE__ */ jsxs("span", { className: "price-display-note", children: [
            "€",
            dailyRateEur,
            " × ",
            hireDays || 0,
            " · ",
            t("fuelExcludedShort", "fuel excluded")
          ] })
        ] }) : selectedRoute && quote.price > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("span", { className: "price-display-route", children: [
            pickupLabel,
            " ",
            values.tripType === "round_trip" ? "⇄" : "→",
            " ",
            destinationName
          ] }),
          /* @__PURE__ */ jsx("span", { className: "price-display-prices", children: /* @__PURE__ */ jsxs("strong", { className: "price-display-amount", children: [
            "€",
            quote.price
          ] }) }),
          /* @__PURE__ */ jsxs("span", { className: "price-display-note", children: [
            values.vehicle === "sprinter" ? "Mercedes Sprinter" : "Mercedes Vito",
            " · ",
            values.tripType === "round_trip" ? `${t("roundTripPriceNote", "round trip · 2 journeys")} · ` : "",
            t("perVehicle", "fixed · per vehicle")
          ] })
        ] }) : values.destination ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("span", { className: "price-display-route", children: [
            pickupName,
            " ",
            values.tripType === "round_trip" ? "⇄" : "→",
            " ",
            destinationName
          ] }),
          /* @__PURE__ */ jsx("span", { className: "price-display-note", children: values.destination === "airport" ? t("airportReturnPrice", "Price confirmed after address review.") : t("customDestinationPrice", "Price confirmed after address review.") })
        ] }) : null })
      ] }),
      !isDailyChauffeur && /* @__PURE__ */ jsxs("div", { className: "booking-steps", "aria-label": "Booking steps", children: [
        /* @__PURE__ */ jsxs("span", { className: `booking-step${step === 1 ? " active" : step > 1 ? " done" : ""}`, children: [
          /* @__PURE__ */ jsx("span", { className: "booking-step-num", children: step > 1 ? "✓" : "1" }),
          /* @__PURE__ */ jsx("span", { className: "booking-step-label", children: t("stepRoute", "Route") })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "booking-step-divider" }),
        /* @__PURE__ */ jsxs("span", { className: `booking-step${step === 2 ? " active" : step > 2 ? " done" : ""}`, children: [
          /* @__PURE__ */ jsx("span", { className: "booking-step-num", children: step > 2 ? "✓" : "2" }),
          /* @__PURE__ */ jsx("span", { className: "booking-step-label", children: t("stepDetails", "Details") })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "booking-step-divider" }),
        /* @__PURE__ */ jsxs("span", { className: `booking-step${step === 3 ? " active" : ""}`, children: [
          /* @__PURE__ */ jsx("span", { className: "booking-step-num", children: "3" }),
          /* @__PURE__ */ jsx("span", { className: "booking-step-label", children: t("stepContact", "Contact") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { className: "booking-card", id: "quote-form", noValidate: true, onSubmit: handleSubmit(submit), children: [
        (isDailyChauffeur || step === 1) && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("fieldset", { className: "trip-type-selector", children: [
            /* @__PURE__ */ jsx("legend", { children: t("tripType", "Journey type") }),
            /* @__PURE__ */ jsxs("div", { className: "trip-type-options", children: [
              /* @__PURE__ */ jsxs("label", { className: "trip-type-option", children: [
                /* @__PURE__ */ jsx("input", { type: "radio", value: "one_way", ...register("tripType") }),
                /* @__PURE__ */ jsx("span", { children: t("oneWay", "One way") })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "trip-type-option", children: [
                /* @__PURE__ */ jsx("input", { type: "radio", value: "round_trip", ...register("tripType") }),
                /* @__PURE__ */ jsx("span", { children: t("roundTrip", "Round trip") })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "trip-type-option", children: [
                /* @__PURE__ */ jsx("input", { type: "radio", value: "daily_chauffeur", ...register("tripType") }),
                /* @__PURE__ */ jsx("span", { children: t("dailyChauffeur", "Daily vehicle + chauffeur") })
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "trip-type-hint", children: isDailyChauffeur ? t("dailyChauffeurHint", "Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.") : t("roundTripHint", "For a round trip, the return follows the same route in reverse.") })
          ] }),
          !isDailyChauffeur && /* @__PURE__ */ jsxs("div", { className: "booking-row booking-hotel-row", children: [
            renderHotelField(),
            /* @__PURE__ */ jsx("p", { className: `hotel-region-hint${hotelMatch && hotelSetsDestination ? " is-matched" : ""}`, id: "hotel-region-hint", children: hotelMatch && hotelSetsDestination ? hotelMatchLabel : t("hotelSearchHint", "Type your hotel name and pick it from the list; we fill in the destination region and price for you.") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `booking-row booking-row-journey${isDailyChauffeur ? " daily" : ""}`, children: [
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.pickup), children: [
              /* @__PURE__ */ jsx("span", { children: t("pickup", "Pick-up") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "plane", className: "icon" }),
                /* @__PURE__ */ jsxs("select", { id: "pickup", ...register("pickup"), children: [
                  /* @__PURE__ */ jsx("option", { value: "airport", children: t("airportOption", "Antalya Airport (AYT)") }),
                  /* @__PURE__ */ jsx("option", { value: "hotel", children: t("hotelOption", "Hotel") }),
                  /* @__PURE__ */ jsx("option", { value: "private_address", children: t("privateAddressOption", "Private address") })
                ] })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.pickup })
            ] }),
            !isDailyChauffeur && /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.destination), children: [
              /* @__PURE__ */ jsx("span", { children: t("destination", "Destination") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "pin", className: "icon" }),
                /* @__PURE__ */ jsxs("select", { id: "destination", ...register("destination"), children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: t("selectDestination", "Select destination") }),
                  values.pickup !== "airport" && /* @__PURE__ */ jsx("option", { value: "airport", children: t("airportOption", "Antalya Airport (AYT)") }),
                  bookableRouteSlugs.map((slug) => /* @__PURE__ */ jsx("option", { value: slug, children: routeCatalog[slug].names[language] ?? routeCatalog[slug].names.en }, slug)),
                  /* @__PURE__ */ jsx("option", { value: "private_address", children: t("privateAddressOption", "Private address") })
                ] })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.destination })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.vehicle), children: [
              /* @__PURE__ */ jsx("span", { children: t("vehicle", "Vehicle") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "car", className: "icon" }),
                /* @__PURE__ */ jsxs("select", { id: "vehicle-type", ...register("vehicle"), children: [
                  /* @__PURE__ */ jsx("option", { value: "vito", disabled: !vitoFits, children: "Mercedes Vito" }),
                  /* @__PURE__ */ jsx("option", { value: "sprinter", children: "Mercedes Sprinter" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.vehicle })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.guests), children: [
              /* @__PURE__ */ jsx("span", { children: t("guests", "Guests") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "users", className: "icon" }),
                /* @__PURE__ */ jsx("select", { id: "guests", ...register("guests"), children: Array.from({ length: 13 }, (_, index) => /* @__PURE__ */ jsx("option", { value: index + 1, children: index + 1 }, index + 1)) })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.guests })
            ] })
          ] }),
          !vitoFits && /* @__PURE__ */ jsx("p", { id: "capacity-note", className: "capacity-note", children: t("capacitySwitchedSprinter", "We selected the Sprinter for this passenger and luggage count.") })
        ] }),
        !isDailyChauffeur && step === 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
          hasPrice && /* @__PURE__ */ jsxs("p", { className: "step1-per-vehicle", children: [
            /* @__PURE__ */ jsx(Icon, { name: "users", className: "icon" }),
            /* @__PURE__ */ jsx("span", { className: "step1-per-vehicle-text", children: t("perVehicleLabel", "Per vehicle — not per person") }),
            /* @__PURE__ */ jsx("span", { className: "step1-per-vehicle-cap", children: values.vehicle === "sprinter" ? t("upTo12Pax", "Up to 12 passengers") : t("upTo6Pax", "Up to 6 passengers") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "booking-footer", children: /* @__PURE__ */ jsxs(
            "button",
            {
              className: "quote-submit",
              type: "button",
              id: "main-book-step1",
              onClick: advanceToStep2,
              children: [
                /* @__PURE__ */ jsx("span", { children: hasPrice ? t("reserveForPrice", `Reserve for €${quote.price}`) : t("continue", "Continue") }),
                /* @__PURE__ */ jsx(Icon, { name: "arrow-right", className: "icon" })
              ]
            }
          ) })
        ] }),
        !isDailyChauffeur && step === 2 && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "booking-row booking-outbound-row", children: [
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.travelDate), children: [
              /* @__PURE__ */ jsx("span", { children: t("arrivalDate", "Arrival date") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "calendar", className: "icon" }),
                /* @__PURE__ */ jsx("input", { id: "travel-date", type: "date", min: minimumDate || void 0, ...register("travelDate") })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.travelDate })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: `${fieldClass(errors.arrivalTime)} time-booking-field`, children: [
              /* @__PURE__ */ jsx("span", { children: t("arrivalFlightTime", "Flight arrival time") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control time-field-control", onClick: () => openTimePicker("flight-arrival-time"), children: [
                /* @__PURE__ */ jsx(Icon, { name: "clock", className: "icon" }),
                /* @__PURE__ */ jsx("span", { className: "time-picker-value", children: values.arrivalTime || t("chooseTime", "Choose time") }),
                /* @__PURE__ */ jsx("input", { id: "flight-arrival-time", type: "time", ...register("arrivalTime") })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.arrivalTime })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.flightNumber), children: [
              /* @__PURE__ */ jsx("span", { children: t("arrivalFlightNumber", "Arrival flight number") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "plane", className: "icon" }),
                /* @__PURE__ */ jsx("input", { id: "flight-number", maxLength: 12, placeholder: "TK1234", ...register("flightNumber") })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.flightNumber })
            ] })
          ] }),
          values.tripType === "round_trip" && /* @__PURE__ */ jsxs("div", { className: "booking-row booking-return-row", id: "return-journey-row", children: [
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.returnDate), children: [
              /* @__PURE__ */ jsx("span", { children: t("returnDate", "Return date") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "calendar", className: "icon" }),
                /* @__PURE__ */ jsx("input", { id: "return-date", type: "date", min: values.travelDate || minimumDate || void 0, ...register("returnDate") })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.returnDate })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: `${fieldClass(errors.returnPickupTime)} time-booking-field`, children: [
              /* @__PURE__ */ jsx("span", { children: t("returnPickupTime", "Return pick-up time") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control time-field-control", onClick: () => openTimePicker("return-pickup-time"), children: [
                /* @__PURE__ */ jsx(Icon, { name: "clock", className: "icon" }),
                /* @__PURE__ */ jsx("span", { className: "time-picker-value", children: values.returnPickupTime || t("chooseTime", "Choose time") }),
                /* @__PURE__ */ jsx("input", { id: "return-pickup-time", type: "time", ...register("returnPickupTime") })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.returnPickupTime })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.returnFlightNumber), children: [
              /* @__PURE__ */ jsx("span", { children: t("returnFlightNumber", "Return flight number") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "plane", className: "icon" }),
                /* @__PURE__ */ jsx("input", { id: "return-flight-number", maxLength: 12, placeholder: "TK1235", ...register("returnFlightNumber") })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.returnFlightNumber })
            ] })
          ] }),
          values.pickup === "private_address" && /* @__PURE__ */ jsx("div", { className: "booking-row booking-address-row", id: "pickup-address-row", children: /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.pickupAddress), children: [
            /* @__PURE__ */ jsx("span", { children: t("pickupAddress", "Full pick-up address") }),
            /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
              /* @__PURE__ */ jsx(Icon, { name: "pin", className: "icon" }),
              /* @__PURE__ */ jsx("input", { id: "pickup-address", maxLength: 160, placeholder: t("pickupAddressPlaceholder", "Hotel name, street, building number and district"), ...register("pickupAddress") })
            ] }),
            /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.pickupAddress })
          ] }) }),
          values.destination === "private_address" && /* @__PURE__ */ jsx("div", { className: "booking-row booking-address-row", id: "dropoff-address-row", children: /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.dropoffAddress), children: [
            /* @__PURE__ */ jsx("span", { children: t("dropoffAddress", "Full drop-off address") }),
            /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
              /* @__PURE__ */ jsx(Icon, { name: "pin", className: "icon" }),
              /* @__PURE__ */ jsx("input", { id: "dropoff-address", maxLength: 160, placeholder: t("dropoffAddressPlaceholder", "Hotel name, street, building number and district"), ...register("dropoffAddress") })
            ] }),
            /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.dropoffAddress })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "booking-row booking-options-row", children: [
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.luggage), children: [
              /* @__PURE__ */ jsx("span", { children: t("luggageLabel", "Large luggage") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "luggage", className: "icon" }),
                /* @__PURE__ */ jsxs("select", { id: "luggage", ...register("luggage"), children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: t("selectLuggage", "Select") }),
                  Array.from({ length: 13 }, (_, index) => /* @__PURE__ */ jsx("option", { value: index, children: index }, index))
                ] })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.luggage })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.childSeats), children: [
              /* @__PURE__ */ jsx("span", { children: t("childSeatLabel", "Child seats") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "baby", className: "icon" }),
                /* @__PURE__ */ jsx("select", { id: "child-seats", ...register("childSeats"), children: Array.from({ length: 5 }, (_, index) => /* @__PURE__ */ jsx("option", { value: index, children: index === 0 ? t("childSeatNone", "No child seat") : t(["", "oneChildSeat", "twoChildSeats", "threeChildSeats", "fourChildSeats"][index], `${index} child seat${index > 1 ? "s" : ""}`) }, index)) })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.childSeats })
            ] })
          ] }),
          childSeatCount > 0 && /* @__PURE__ */ jsx("div", { className: "booking-row booking-options-row", children: Array.from({ length: childSeatCount }, (_, i) => /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.childAges?.[i]), children: [
            /* @__PURE__ */ jsx("span", { children: `${t("childAgeLabel", "Child")} ${i + 1} ${t("childAgeLabelAge", "age")}` }),
            /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
              /* @__PURE__ */ jsx(Icon, { name: "baby", className: "icon" }),
              /* @__PURE__ */ jsxs("select", { id: `child-age-${i}`, ...register(`childAges.${i}`), children: [
                /* @__PURE__ */ jsx("option", { value: "", children: t("childAgeSelect", "Select age") }),
                Array.from({ length: 12 }, (_2, age) => /* @__PURE__ */ jsx("option", { value: age, children: age === 0 ? t("childAgeBaby", "Under 1") : `${age}` }, age))
              ] })
            ] }),
            /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.childAges?.[i] })
          ] }, i)) }),
          !vitoFits && /* @__PURE__ */ jsx("p", { className: "capacity-note", children: t("capacitySwitchedSprinter", "We selected the Sprinter for this passenger and luggage count.") }),
          /* @__PURE__ */ jsxs("div", { className: "booking-footer booking-footer-step", children: [
            /* @__PURE__ */ jsxs("button", { className: "booking-back-btn", type: "button", onClick: () => setStep(1), children: [
              /* @__PURE__ */ jsx(Icon, { name: "arrow-left", className: "icon" }),
              /* @__PURE__ */ jsx("span", { children: t("back", "Back") })
            ] }),
            /* @__PURE__ */ jsxs("button", { className: "quote-submit", type: "button", id: "main-book-step2", onClick: advanceToStep3, children: [
              /* @__PURE__ */ jsx("span", { children: t("continue", "Continue") }),
              /* @__PURE__ */ jsx(Icon, { name: "arrow-right", className: "icon" })
            ] })
          ] })
        ] }),
        isDailyChauffeur && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "booking-row booking-outbound-row daily-period-row", children: [
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.travelDate), children: [
              /* @__PURE__ */ jsx("span", { children: t("serviceStartDate", "First service day") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "calendar", className: "icon" }),
                /* @__PURE__ */ jsx("input", { id: "travel-date", type: "date", min: minimumDate || void 0, ...register("travelDate") })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.travelDate })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.serviceEndDate), children: [
              /* @__PURE__ */ jsx("span", { children: t("serviceEndDate", "Last service day") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "calendar", className: "icon" }),
                /* @__PURE__ */ jsx("input", { id: "service-end-date", type: "date", min: values.travelDate || minimumDate || void 0, ...register("serviceEndDate") })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.serviceEndDate })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: `${fieldClass(errors.pickupTime)} time-booking-field`, children: [
              /* @__PURE__ */ jsx("span", { children: t("dailyPickupTime", "Service start time") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control time-field-control", onClick: () => openTimePicker("daily-pickup-time"), children: [
                /* @__PURE__ */ jsx(Icon, { name: "clock", className: "icon" }),
                /* @__PURE__ */ jsx("span", { className: "time-picker-value", children: values.pickupTime || t("chooseTime", "Choose time") }),
                /* @__PURE__ */ jsx("input", { id: "daily-pickup-time", type: "time", ...register("pickupTime") })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.pickupTime })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "booking-row booking-outbound-row", children: [
            /* @__PURE__ */ jsxs("label", { className: `${fieldClass(errors.arrivalTime)} time-booking-field`, children: [
              /* @__PURE__ */ jsx("span", { children: t("arrivalFlightTimeOptional", "Arrival flight time (optional)") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control time-field-control", onClick: () => openTimePicker("flight-arrival-time"), children: [
                /* @__PURE__ */ jsx(Icon, { name: "clock", className: "icon" }),
                /* @__PURE__ */ jsx("span", { className: "time-picker-value", children: values.arrivalTime || t("chooseTime", "Choose time") }),
                /* @__PURE__ */ jsx("input", { id: "flight-arrival-time", type: "time", ...register("arrivalTime") })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.arrivalTime })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.flightNumber), children: [
              /* @__PURE__ */ jsx("span", { children: t("arrivalFlightNumberOptional", "Arrival flight number (optional)") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "plane", className: "icon" }),
                /* @__PURE__ */ jsx("input", { id: "flight-number", maxLength: 12, placeholder: "TK1234", ...register("flightNumber") })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.flightNumber })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "daily-price-summary", children: [
              /* @__PURE__ */ jsx("small", { children: t("servicePrice", "Service price") }),
              /* @__PURE__ */ jsxs("strong", { children: [
                "€",
                dailyRateEur,
                " × ",
                hireDays || 0,
                " = €",
                quote.price
              ] }),
              /* @__PURE__ */ jsx("span", { children: t("fuelExcludedDetail", "Fuel is not included and is paid separately according to use.") })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "booking-row booking-return-row daily-departure-row", children: [
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.departureFlightDate), children: [
              /* @__PURE__ */ jsx("span", { children: t("departureFlightDate", "Departure flight date (optional)") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "calendar", className: "icon" }),
                /* @__PURE__ */ jsx("input", { id: "departure-flight-date", type: "date", min: values.travelDate || minimumDate || void 0, ...register("departureFlightDate") })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.departureFlightDate })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: `${fieldClass(errors.departureFlightTime)} time-booking-field`, children: [
              /* @__PURE__ */ jsx("span", { children: t("departureFlightTime", "Departure flight time") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control time-field-control", onClick: () => openTimePicker("departure-flight-time"), children: [
                /* @__PURE__ */ jsx(Icon, { name: "clock", className: "icon" }),
                /* @__PURE__ */ jsx("span", { className: "time-picker-value", children: values.departureFlightTime || t("chooseTime", "Choose time") }),
                /* @__PURE__ */ jsx("input", { id: "departure-flight-time", type: "time", ...register("departureFlightTime") })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.departureFlightTime })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.departureFlightNumber), children: [
              /* @__PURE__ */ jsx("span", { children: t("departureFlightNumber", "Departure flight number") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "plane", className: "icon" }),
                /* @__PURE__ */ jsx("input", { id: "departure-flight-number", maxLength: 12, placeholder: "TK1235", ...register("departureFlightNumber") })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.departureFlightNumber })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "booking-row booking-options-row", children: [
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.luggage), children: [
              /* @__PURE__ */ jsx("span", { children: t("luggageLabel", "Large luggage") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "luggage", className: "icon" }),
                /* @__PURE__ */ jsxs("select", { id: "luggage", ...register("luggage"), children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: t("selectLuggage", "Select") }),
                  Array.from({ length: 13 }, (_, index) => /* @__PURE__ */ jsx("option", { value: index, children: index }, index))
                ] })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.luggage })
            ] }),
            renderHotelField(),
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.childSeats), children: [
              /* @__PURE__ */ jsx("span", { children: t("childSeatLabel", "Child seats") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "baby", className: "icon" }),
                /* @__PURE__ */ jsx("select", { id: "child-seats", ...register("childSeats"), children: Array.from({ length: 5 }, (_, index) => /* @__PURE__ */ jsx("option", { value: index, children: index === 0 ? t("childSeatNone", "No child seat") : t(["", "oneChildSeat", "twoChildSeats", "threeChildSeats", "fourChildSeats"][index], `${index} child seat${index > 1 ? "s" : ""}`) }, index)) })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.childSeats })
            ] })
          ] }),
          childSeatCount > 0 && /* @__PURE__ */ jsx("div", { className: "booking-row booking-options-row", children: Array.from({ length: childSeatCount }, (_, i) => /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.childAges?.[i]), children: [
            /* @__PURE__ */ jsx("span", { children: `${t("childAgeLabel", "Child")} ${i + 1} ${t("childAgeLabelAge", "age")}` }),
            /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
              /* @__PURE__ */ jsx(Icon, { name: "baby", className: "icon" }),
              /* @__PURE__ */ jsxs("select", { id: `child-age-${i}`, ...register(`childAges.${i}`), children: [
                /* @__PURE__ */ jsx("option", { value: "", children: t("childAgeSelect", "Select age") }),
                Array.from({ length: 12 }, (_2, age) => /* @__PURE__ */ jsx("option", { value: age, children: age === 0 ? t("childAgeBaby", "Under 1") : `${age}` }, age))
              ] })
            ] }),
            /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.childAges?.[i] })
          ] }, i)) })
        ] }),
        (isDailyChauffeur || step === 3) && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "booking-row booking-row-personal", children: [
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.customerName), children: [
              /* @__PURE__ */ jsx("span", { children: t("fullName", "Full name") }),
              /* @__PURE__ */ jsx("div", { className: "field-control", children: /* @__PURE__ */ jsx("input", { id: "customer-name", autoComplete: "name", maxLength: 80, placeholder: "John Smith", ...register("customerName") }) }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.customerName })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.customerPhone), children: [
              /* @__PURE__ */ jsx("span", { children: t("phoneLabel", "Phone / WhatsApp") }),
              /* @__PURE__ */ jsx("div", { className: "field-control phone-field-control", children: /* @__PURE__ */ jsx(Controller, { control, name: "customerPhone", render: ({ field }) => /* @__PURE__ */ jsx(PhoneInput, { id: "customer-phone", international: true, defaultCountry: DEFAULT_PHONE_COUNTRY[language] ?? "TR", autoComplete: "tel", placeholder: "+44 7400 123456", value: field.value || void 0, onChange: (value) => field.onChange(value ?? ""), onBlur: field.onBlur }) }) }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.customerPhone })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.customerEmail), children: [
              /* @__PURE__ */ jsx("span", { children: t("emailLabel", "Email") }),
              /* @__PURE__ */ jsx("div", { className: "field-control", children: /* @__PURE__ */ jsx("input", { id: "customer-email", type: "email", autoComplete: "email", maxLength: 120, placeholder: "john@example.com", ...register("customerEmail") }) }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.customerEmail })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("fieldset", { className: "payment-method-panel", children: [
            /* @__PURE__ */ jsx("legend", { children: t("paymentMethod", "Choose payment method") }),
            /* @__PURE__ */ jsx("div", { className: "payment-method-options", children: /* @__PURE__ */ jsxs("label", { className: "payment-method-option payment-method-option-recommended", children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "paymentMethod", value: "cash", checked: true, readOnly: true }),
              /* @__PURE__ */ jsx("span", { className: "payment-method-radio", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxs("span", { className: "payment-method-copy", children: [
                /* @__PURE__ */ jsxs("span", { className: "payment-method-heading", children: [
                  /* @__PURE__ */ jsx("strong", { children: t("cashPayment", "Pay in the vehicle") }),
                  /* @__PURE__ */ jsx("small", { children: t("recommended", "Recommended") })
                ] }),
                /* @__PURE__ */ jsx("span", { children: t("cashPaymentDescription", "No prepayment. Pay the confirmed total directly to your driver.") })
              ] }),
              /* @__PURE__ */ jsx(Icon, { name: "cash", className: "icon" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "booking-footer booking-footer-step", children: [
            !isDailyChauffeur && /* @__PURE__ */ jsxs("button", { className: "booking-back-btn", type: "button", onClick: () => setStep(2), children: [
              /* @__PURE__ */ jsx(Icon, { name: "arrow-right", className: "icon icon-flip" }),
              /* @__PURE__ */ jsx("span", { children: t("back", "Back") })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "booking-includes", children: isDailyChauffeur ? t("dailyQuoteIncludes", "Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.") : t("quoteIncludes", "Includes meet & greet, flight tracking, parking, waiting time and bottled water.") }),
            /* @__PURE__ */ jsxs("button", { className: "quote-submit", type: "submit", id: "main-book-submit", disabled: submitting, children: [
              /* @__PURE__ */ jsx("span", { children: submitting ? "…" : isDailyChauffeur ? t("reviewAndConfirm", "Review and confirm") : isPrivateAddressQuote ? t("requestQuote", "Request a price quote") : t("confirmCashBooking", "Confirm booking — pay in vehicle") }),
              /* @__PURE__ */ jsx(Icon, { name: "arrow-right", className: "icon" })
            ] })
          ] }),
          submitError && /* @__PURE__ */ jsx("p", { className: "payment-error", id: "payment-error-message", role: "alert", children: submitError })
        ] })
      ] })
    ] }),
    pendingDailyBooking && /* @__PURE__ */ jsxs("div", { className: "quote-modal open fuel-terms-modal", id: "fuel-terms-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "fuel-terms-title", children: [
      /* @__PURE__ */ jsx("button", { className: "modal-backdrop", "aria-label": t("close", "Close"), onClick: () => setPendingDailyBooking(null) }),
      /* @__PURE__ */ jsxs("div", { className: "modal-card", children: [
        /* @__PURE__ */ jsx("button", { className: "modal-close", type: "button", "aria-label": t("close", "Close"), onClick: () => setPendingDailyBooking(null), children: /* @__PURE__ */ jsx(Icon, { name: "close" }) }),
        /* @__PURE__ */ jsxs("div", { className: "fuel-terms-content", children: [
          /* @__PURE__ */ jsx("span", { className: "fuel-terms-icon", "aria-hidden": "true", children: "⛽" }),
          /* @__PURE__ */ jsx("h2", { id: "fuel-terms-title", children: t("fuelTermsTitle", "Important information about fuel") }),
          /* @__PURE__ */ jsx("p", { children: t("fuelTermsBody", "The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.") }),
          /* @__PURE__ */ jsxs("label", { className: "fuel-terms-check", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", autoFocus: true, checked: fuelAcknowledged, onChange: (event) => setFuelAcknowledged(event.target.checked) }),
            /* @__PURE__ */ jsx("span", { children: t("fuelTermsCheckbox", "I understand that fuel is excluded and will be paid separately based on use.") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "fuel-terms-actions", children: [
            /* @__PURE__ */ jsx("button", { className: "fuel-terms-cancel", type: "button", onClick: () => setPendingDailyBooking(null), children: t("cancel", "Cancel") }),
            /* @__PURE__ */ jsx("button", { className: "button button-gold", type: "button", disabled: !fuelAcknowledged || submitting, onClick: confirmDailyBooking, children: submitting ? "…" : t("understandAndConfirm", "I understand and confirm") })
          ] })
        ] })
      ] })
    ] }),
    confirmation && /* @__PURE__ */ jsxs("div", { className: "quote-modal open", id: "quote-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "quote-modal-title", children: [
      /* @__PURE__ */ jsx("button", { className: "modal-backdrop", "aria-label": "Close", onClick: () => setConfirmation(null) }),
      /* @__PURE__ */ jsxs("div", { className: "modal-card", children: [
        /* @__PURE__ */ jsx("button", { className: "modal-close", type: "button", "aria-label": "Close", onClick: () => setConfirmation(null), children: /* @__PURE__ */ jsx(Icon, { name: "close" }) }),
        /* @__PURE__ */ jsxs("div", { className: "booking-confirmed", children: [
          /* @__PURE__ */ jsx("div", { className: "confirmed-check confirmed-pending", "aria-hidden": "true", children: /* @__PURE__ */ jsx(Icon, { name: "clock" }) }),
          /* @__PURE__ */ jsx("h2", { id: "quote-modal-title", children: t("requestReceived", "Request Received") }),
          /* @__PURE__ */ jsxs("p", { className: "confirmed-ref", children: [
            /* @__PURE__ */ jsx("span", { children: t("referenceLabel", "Reference") }),
            " ",
            /* @__PURE__ */ jsx("strong", { id: "confirmed-ref", children: confirmation.ref })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "confirmed-msg", children: t("approvalPending", "We received your request and will review your details. You'll receive an approval message via WhatsApp shortly.") }),
          /* @__PURE__ */ jsxs("a", { className: "button button-gold", href: confirmation.whatsapp, target: "_blank", rel: "noreferrer", id: "confirmed-whatsapp", children: [
            /* @__PURE__ */ jsx("span", { children: t("whatsappUs", "WhatsApp us") }),
            /* @__PURE__ */ jsx(Icon, { name: "arrow-up-right", className: "icon" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Header({
  homeHref = "",
  compact = false,
  ctaHref,
  ctaLabel
}) {
  const { language, selectLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(compact);
  const languageMenu = useRef(null);
  const currentLanguage = languageOptions.find(({ code }) => code === language) ?? languageOptions[0];
  const sectionHref = (hash) => `${homeHref}${hash}`;
  useEffect(() => {
    if (compact) return;
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [compact]);
  useEffect(() => {
    const close = (event) => {
      if (!languageMenu.current?.contains(event.target)) setLanguagesOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);
  const chooseLanguage = (code) => {
    setLanguagesOpen(false);
    setMenuOpen(false);
    selectLanguage(code);
  };
  const scrollTo = (hash) => (e) => {
    if (!homeHref) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        const top = id === "top" ? 0 : el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };
  const nav = [
    { hash: "#fleet", href: sectionHref("#fleet"), label: t("navFleet", "Fleet") },
    { hash: "#services", href: sectionHref("#services"), label: t("navService", "Service") },
    { hash: "#routes", href: sectionHref("#routes"), label: t("navRoutes", "Routes") },
    { hash: "#reviews", href: sectionHref("#reviews"), label: t("navReviews", "Reviews") },
    { hash: "#contact", href: sectionHref("#contact"), label: t("navContact", "Contact") },
    { hash: "", href: "/b2b/", label: "B2B Partners" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: `site-header${scrolled ? " scrolled" : ""}`, id: "site-header", children: [
      /* @__PURE__ */ jsxs("a", { className: "brand", href: sectionHref("#top"), onClick: scrollTo("#top"), "aria-label": "Antalya VIP Tourism home", children: [
        /* @__PURE__ */ jsx("img", { src: "/assets/optimized/logo.png", alt: "Antalya VIP Tourism", className: "brand-logo", width: "160", height: "120" }),
        /* @__PURE__ */ jsxs("span", { className: "brand-copy", children: [
          /* @__PURE__ */ jsx("strong", { children: "Antalya VIP" }),
          /* @__PURE__ */ jsx("span", { children: "Tourism" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "desktop-nav", "aria-label": "Primary navigation", children: nav.map((item) => /* @__PURE__ */ jsx(
        "a",
        {
          href: item.href,
          onClick: item.hash ? scrollTo(item.hash) : void 0,
          children: item.label
        },
        item.href
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "header-actions", children: [
        /* @__PURE__ */ jsxs("div", { className: `lang-dropdown${languagesOpen ? " open" : ""}`, ref: languageMenu, children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "lang-trigger",
              type: "button",
              "aria-haspopup": "listbox",
              "aria-expanded": languagesOpen,
              "aria-label": "Change language",
              onClick: (event) => {
                event.stopPropagation();
                setLanguagesOpen((open) => !open);
              },
              children: [
                /* @__PURE__ */ jsx("span", { className: "lang-flag-current", children: currentLanguage.flag }),
                /* @__PURE__ */ jsx("svg", { width: "10", height: "6", viewBox: "0 0 10 6", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M1 1l4 4 4-4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
              ]
            }
          ),
          /* @__PURE__ */ jsx("ul", { className: "lang-menu", role: "listbox", "aria-label": "Language", children: languageOptions.map((option) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "button",
            {
              className: `language-button${language === option.code ? " active" : ""}`,
              type: "button",
              role: "option",
              "aria-selected": language === option.code,
              onClick: () => chooseLanguage(option.code),
              children: [
                option.flag,
                " ",
                option.label
              ]
            }
          ) }, option.code)) })
        ] }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            className: "header-cta",
            href: ctaHref ?? sectionHref("#booking"),
            onClick: ctaHref ? void 0 : scrollTo("#booking"),
            children: [
              /* @__PURE__ */ jsx("span", { children: ctaLabel ?? t("bookNow", "Book now") }),
              /* @__PURE__ */ jsx(Icon, { name: "arrow-up-right", className: "icon" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "menu-button",
            type: "button",
            "aria-label": menuOpen ? "Close menu" : "Open menu",
            "aria-expanded": menuOpen,
            onClick: () => setMenuOpen((open) => !open),
            children: [
              /* @__PURE__ */ jsx("span", {}),
              /* @__PURE__ */ jsx("span", {})
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `mobile-menu${menuOpen ? " open" : ""}`, "aria-hidden": !menuOpen, children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": "Mobile navigation", children: nav.map((item) => /* @__PURE__ */ jsx(
        "a",
        {
          href: item.href,
          onClick: (event) => {
            setMenuOpen(false);
            if (item.hash) scrollTo(item.hash)(event);
          },
          children: item.label
        },
        item.href
      )) }),
      /* @__PURE__ */ jsx("div", { className: "mobile-language-switcher", "aria-label": "Language selection", children: languageOptions.map((option) => /* @__PURE__ */ jsxs(
        "button",
        {
          className: `language-button${language === option.code ? " active" : ""}`,
          type: "button",
          onClick: () => chooseLanguage(option.code),
          children: [
            option.flag,
            " ",
            option.code.toUpperCase()
          ]
        },
        option.code
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "mobile-menu-footer", children: [
        /* @__PURE__ */ jsx("a", { href: "tel:+905302655790", children: "+90 530 265 57 90" }),
        /* @__PURE__ */ jsx("span", { children: t("alwaysAvailable", "Available 24 hours, every day") })
      ] })
    ] })
  ] });
}
const VIDEO_ID = "r79dH1HLJtk";
const serviceItems = [
  [
    "trackingTitle",
    "Flight tracking",
    "trackingBody",
    "We monitor your flight in real time and adjust your pick-up automatically, at no extra charge.",
    "plane"
  ],
  [
    "chauffeurTitle",
    "Professional chauffeurs",
    "chauffeurBody",
    "Immaculately presented, discreet and selected for their local knowledge and service standards.",
    "user-check"
  ],
  [
    "greetTitle",
    "Meet & greet",
    "greetBody",
    "Your chauffeur welcomes you in arrivals with a personalised name sign and assists with luggage.",
    "sparkle"
  ],
  [
    "supportTitle",
    "24/7 concierge",
    "supportBody",
    "A real person is always available by phone or WhatsApp before, during and after your journey.",
    "headphones"
  ],
  [
    "priceTitle",
    "Fixed prices",
    "priceBody",
    "The price confirmed is the price you pay. Waiting time, parking and flight delays are included.",
    "tag"
  ],
  [
    "familyTitle",
    "Family ready",
    "familyBody",
    "Age-appropriate child seats, spacious cabins and patient assistance for a relaxed family arrival.",
    "baby"
  ]
];
const reviews = [
  [
    "B.E.C",
    "BE",
    "4 days ago",
    "We were very satisfied with the VIP transfer. The service was professional, punctual, and very pleasant from start to finish. The vehicle was modern, clean, and comfortable. The friendly communication and reliable service were particularly impressive. We would book Antalya VIP Tourism again without hesitation."
  ],
  [
    "G.Z",
    "GZ",
    "2 days ago",
    "An outstanding experience of the highest caliber. The service was absolutely first-class from beginning to end and perfectly tailored to our individual needs. The attention to detail and years of professionalism are immediately apparent — from seamless planning to personalized on-site support, every wish was fulfilled."
  ],
  [
    "A.K",
    "AK",
    "3 days ago",
    "We had a wonderful trip; the refreshments on board were cold, the comfort was great, and the driving experience was excellent. It deserves 5 stars 😊"
  ],
  [
    "M.O",
    "MO",
    "3 days ago",
    "I found this place online and booked it based on reviews, and I'm so glad I did. The car was air-conditioned and very clean, and the driver was very friendly. They didn't let us down at all in the Antalya heat. Thank you."
  ],
  [
    "A.K",
    "AK",
    "3 days ago",
    "I had no problems during my transfer; their vehicles were new and clean, and they place the utmost importance on driving safety. Thank you."
  ],
  [
    "A.D",
    "AD",
    "3 days ago",
    "We would like to thank all the staff who accompanied us from the airport to our hotel and who were always smiling and attentive throughout the entire process. It was a wonderful experience."
  ]
];
const routeOrder = [
  "belek",
  "side",
  "kemer",
  "alanya",
  "tekirova",
  "manavgat",
  "kizilagac",
  "bogazkent",
  "antalya",
  "bodrum",
  "dalaman",
  "fethiye",
  "pamukkale",
  "kapadokya"
];
const routeImageClasses = [
  "route-image-1",
  "route-image-2",
  "route-image-3",
  "route-image-4",
  "route-image-5",
  "route-image-6",
  "route-image-6",
  "route-image-1 route-image-alt-1",
  "route-image-2 route-image-alt-2",
  "route-image-3 route-image-alt-3",
  "route-image-4 route-image-alt-4",
  "route-image-5 route-image-alt-5",
  "route-image-6 route-image-alt-6",
  "route-image-3 route-image-alt-7"
];
const routeDisplayNames = {
  belek: "Belek",
  side: "Side",
  kemer: "Kemer",
  alanya: "Alanya",
  tekirova: "Tekirova",
  manavgat: "Manavgat",
  kizilagac: "Manavgat/Kızılağaç",
  bogazkent: "Boğazkent",
  antalya: "Antalya City",
  bodrum: "Bodrum",
  dalaman: "Dalaman",
  fethiye: "Fethiye",
  pamukkale: "Pamukkale",
  kapadokya: "Kapadokya"
};
const fallbackFleetPhotos = [
  {
    src: "/assets/optimized/chauffeur-arrival.jpg",
    caption: "Chauffeur arrival",
    alt: "Professional chauffeur opening a luxury black executive van"
  },
  {
    src: "/assets/optimized/executive-interior.jpg",
    caption: "VIP interior",
    alt: "Cream leather executive seating inside a luxury passenger van"
  },
  {
    src: "/assets/optimized/antalya-coastline-hero.jpg",
    caption: "Exterior",
    alt: "Luxury black executive van driving along Antalya's coastline"
  }
];
const vehiclePhotoModules = /* @__PURE__ */ Object.assign({
  "../../../assets/optimized/images/vehicle-01.webp": __vite_glob_0_0,
  "../../../assets/optimized/images/vehicle-02.webp": __vite_glob_0_1,
  "../../../assets/optimized/images/vehicle-03.webp": __vite_glob_0_2,
  "../../../assets/optimized/images/vehicle-04.webp": __vite_glob_0_3,
  "../../../assets/optimized/images/vehicle-05.webp": __vite_glob_0_4,
  "../../../assets/optimized/images/vehicle-06.webp": __vite_glob_0_5,
  "../../../assets/optimized/images/vehicle-07.webp": __vite_glob_0_6,
  "../../../assets/optimized/images/vehicle-08.webp": __vite_glob_0_7,
  "../../../assets/optimized/images/vehicle-09.webp": __vite_glob_0_8,
  "../../../assets/optimized/images/vehicle-10.webp": __vite_glob_0_9,
  "../../../assets/optimized/images/vehicle-11.webp": __vite_glob_0_10,
  "../../../assets/optimized/images/vehicle-12.webp": __vite_glob_0_11,
  "../../../assets/optimized/images/vehicle-13.webp": __vite_glob_0_12
});
const customerPhotoModules = /* @__PURE__ */ Object.assign({
  "../../../assets/optimized/customers/customer-01.jpg": __vite_glob_1_0,
  "../../../assets/optimized/customers/customer-02.jpg": __vite_glob_1_1,
  "../../../assets/optimized/customers/customer-03.jpg": __vite_glob_1_2,
  "../../../assets/optimized/customers/customer-04.jpg": __vite_glob_1_3,
  "../../../assets/optimized/customers/customer-05.jpg": __vite_glob_1_4,
  "../../../assets/optimized/customers/customer-06.jpg": __vite_glob_1_5
});
const photoCaption = (path) => {
  const name = path.toLowerCase();
  if (name.includes("customer")) return "Happy customer";
  if (name.includes("interior") || name.includes("lounge"))
    return "VIP interior";
  if (name.includes("cabin") || name.includes("seat")) return "Passenger cabin";
  if (name.includes("arrival") || name.includes("chauffeur") || name.includes("driver"))
    return "Chauffeur arrival";
  if (name.includes("exterior") || name.includes("front") || name.includes("side"))
    return "Exterior";
  return "Our vehicle";
};
const vehiclePhotos = Object.entries(vehiclePhotoModules).sort(([a], [b]) => a.localeCompare(b)).map(([path, src]) => ({
  src,
  caption: photoCaption(path),
  alt: `${photoCaption(path)} photo from Antalya VIP Tourism fleet`
}));
const customerPhotos = Object.entries(customerPhotoModules).sort(([a], [b]) => a.localeCompare(b)).map(([, src]) => ({
  src,
  caption: "Happy customer",
  alt: "Satisfied customer with Antalya VIP Tourism transfer service"
}));
const fleetPhotos = (() => {
  const photos = [...vehiclePhotos];
  const step = photos.length / (customerPhotos.length + 1);
  customerPhotos.forEach(
    (photo, index) => photos.splice(Math.round(step * (index + 1)) + index, 0, photo)
  );
  return photos.length ? photos : fallbackFleetPhotos;
})();
function HomePage({ initialLanguage }) {
  const { language, t } = useLanguage();
  const [fleet, setFleet] = useState("sprinter");
  const [fleetPhotoIndex, setFleetPhotoIndex] = useState(0);
  const [selection, setSelection] = useState();
  const [openFaq, setOpenFaq] = useState(0);
  const [routeSliderEdges, setRouteSliderEdges] = useState({
    atStart: true,
    atEnd: false
  });
  const routeSlider = useRef(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const routePrefix = ["de", "tr", "ru"].includes(initialLanguage) ? `/${initialLanguage}` : "";
  const routeAirportName = {
    de: "Flughafen Antalya",
    tr: "Antalya Havalimanı",
    ru: "Аэропорт Антальи"
  }[initialLanguage] ?? "Antalya Airport";
  const privacyHref = initialLanguage === "de" ? "/de/datenschutz/" : initialLanguage === "tr" ? "/tr/gizlilik/" : initialLanguage === "ru" ? "/ru/privacy/" : "/privacy/";
  const imprintHref = initialLanguage === "de" ? "/de/impressum/" : initialLanguage === "tr" ? "/tr/kunye/" : initialLanguage === "ru" ? "/ru/impressum/" : "/impressum.html";
  const fleetCopy = fleet === "sprinter" ? {
    name: "Mercedes Sprinter",
    shortName: "Sprinter",
    classKey: "fleetVclassClass",
    classFallback: "Business · First Class",
    descriptionKey: "fleetVclassDescription",
    descriptionFallback: "Spacious VIP transport for larger groups, with generous room for passengers and luggage.",
    guests: 13,
    bags: 12
  } : {
    name: "Mercedes Vito",
    shortName: "Vito",
    classKey: "fleetVitoClass",
    classFallback: "VIP · Grand Touring",
    descriptionKey: "fleetVitoDescription",
    descriptionFallback: "A refined private cabin for families and small groups travelling in comfort.",
    guests: 8,
    bags: 6
  };
  const fleetPhoto = fleetPhotos[fleetPhotoIndex % fleetPhotos.length];
  const bookRoute = (route, vehicle = "vito") => {
    window.gtag?.("event", "route_selected", { route, vehicle, source: "home_page" });
    setSelection({ route, vehicle, nonce: Date.now() });
  };
  const scrollRoutes = (direction) => {
    const card = routeSlider.current?.querySelector(".route-card");
    routeSlider.current?.scrollBy({
      left: direction * ((card?.offsetWidth ?? 340) + 15),
      behavior: "smooth"
    });
  };
  const changeFleet = (vehicle) => {
    setFleet(vehicle);
    setFleetPhotoIndex(0);
  };
  const changeFleetPhoto = (direction) => setFleetPhotoIndex(
    (index) => (index + direction + fleetPhotos.length) % fleetPhotos.length
  );
  const faqItems = Array.from({ length: 5 }, (_, index) => {
    const number = ["One", "Two", "Three", "Four", "Five"][index];
    return [
      t(`faq${number}Q`, "Frequently asked question"),
      t(`faq${number}A`, "Contact us for complete details.")
    ];
  });
  useEffect(() => {
    const slider = routeSlider.current;
    if (!slider) return;
    const update = () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      setRouteSliderEdges({
        atStart: slider.scrollLeft <= 4,
        atEnd: slider.scrollLeft >= maxScroll - 4
      });
    };
    update();
    slider.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      slider.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const elements = Array.from(document.querySelectorAll(".service-card, .route-card, .review-card"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry2) => {
        if (!entry2.isIntersecting) return;
        entry2.target.classList.add("is-visible");
        observer.unobserve(entry2.target);
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => {
      const siblings = Array.from(element.parentElement?.children ?? []);
      const delay = siblings.indexOf(element) % 4 * 0.09;
      element.style.opacity = "0";
      element.style.transform = "translateY(22px)";
      element.style.transition = `opacity .65s ease ${delay}s, transform .65s ease ${delay}s, box-shadow .35s ease`;
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "hero", id: "top", children: [
        /* @__PURE__ */ jsxs("picture", { className: "hero-media", children: [
          /* @__PURE__ */ jsx(
            "source",
            {
              srcSet: "/assets/optimized/antalya-coastline-hero.webp",
              type: "image/webp"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/assets/optimized/antalya-coastline-hero.jpg",
              alt: "Luxury black executive van driving along Antalya's coastline",
              width: "1672",
              height: "941",
              fetchPriority: "high"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hero-shade" }),
        /* @__PURE__ */ jsx("div", { className: "hero-grain" }),
        /* @__PURE__ */ jsxs("div", { className: "hero-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "hero-copy", children: [
            /* @__PURE__ */ jsxs("div", { className: "eyebrow light reveal", children: [
              /* @__PURE__ */ jsx("span", {}),
              /* @__PURE__ */ jsx("p", { children: t("heroEyebrow", "Private chauffeur service · Antalya") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "campaign-badge reveal", children: [
              /* @__PURE__ */ jsx("span", { children: t("campaignBadge", "Online special") }),
              /* @__PURE__ */ jsx("strong", { children: t("campaignDiscount", "25% off") }),
              /* @__PURE__ */ jsx("span", { children: t("campaignScope", "all transfer prices") })
            ] }),
            /* @__PURE__ */ jsx("h1", { className: "reveal", children: /* @__PURE__ */ jsx(
              LineBreakText,
              {
                value: t(
                  "heroTitle",
                  "Premium Airport<br />Transfers in Antalya"
                )
              }
            ) }),
            /* @__PURE__ */ jsx("p", { className: "hero-subtitle reveal", children: t(
              "heroSubtitle",
              "Private chauffeur-driven transfers from Antalya Airport to Belek, Side, Kemer and Alanya."
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "hero-buttons reveal", children: [
              /* @__PURE__ */ jsxs("a", { className: "button button-gold", href: "#booking", children: [
                /* @__PURE__ */ jsx("span", { children: t("bookTransfer", "Book your transfer") }),
                /* @__PURE__ */ jsx(Icon, { name: "arrow-right", className: "icon" })
              ] }),
              /* @__PURE__ */ jsx("a", { className: "button button-glass", href: "#booking", children: t("instantQuote", "Get instant quote") })
            ] }),
            language === "de" && /* @__PURE__ */ jsxs("ul", { className: "hero-payment-trust reveal", children: [
              /* @__PURE__ */ jsx("li", { children: "Keine Vorauszahlung erforderlich" }),
              /* @__PURE__ */ jsx("li", { children: "Zahlung direkt beim Fahrer" }),
              /* @__PURE__ */ jsx("li", { children: "Fester Gesamtpreis" }),
              /* @__PURE__ */ jsx("li", { children: "Keine versteckten Gebühren" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hero-proof reveal", children: [
            /* @__PURE__ */ jsxs("div", { className: "rating-lockup", children: [
              /* @__PURE__ */ jsx("div", { className: "stars", "aria-label": "5 out of 5 stars", children: "★★★★★" }),
              /* @__PURE__ */ jsx("strong", { children: "4.9" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "proof-divider" }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { children: t("googleRated", "Google rated") }),
              /* @__PURE__ */ jsx("strong", { children: t("trustedGuests", "Trusted by 2,500+ guests") })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hero-scroll", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("span", { children: t("discover", "Discover") }),
          /* @__PURE__ */ jsx("i", {})
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "trust-bar", "aria-label": "Service credentials", children: [
        ["tbLicensed", "TÜRSAB Licensed"],
        ["tbFlightTracking", "Flight Tracking"],
        ["tbFixedPrice", "Fixed Pricing"],
        ["tb247Concierge", "24/7 Concierge"],
        ["tbChildSeats", "Child Seats Included"]
      ].map(([key, fallback]) => /* @__PURE__ */ jsxs("div", { className: "trust-bar-item", children: [
        /* @__PURE__ */ jsx("span", { className: "trust-bar-check", children: "✓" }),
        /* @__PURE__ */ jsx("span", { children: t(key, fallback) })
      ] }, key)) }),
      /* @__PURE__ */ jsx(BookingForm, { selection }),
      /* @__PURE__ */ jsx("section", { className: "trust-strip", "aria-label": "Service guarantees", children: [
        ["flightTracking", "Real-time flight tracking", "clock"],
        ["fixedPrice", "Fixed price guarantee", "shield"],
        ["meetGreet", "Personal meet & greet", "sparkle"],
        ["speakingDrivers", "English & German speaking", "globe"]
      ].map(([key, fallback, icon]) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Icon, { name: icon, className: "icon" }),
        /* @__PURE__ */ jsx("span", { children: t(key, fallback) })
      ] }, key)) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "price-strip",
          "aria-label": "Route prices from Antalya Airport",
          children: [
            /* @__PURE__ */ jsx("span", { className: "price-strip-label", children: t("fromAirport", "From Antalya Airport") }),
            /* @__PURE__ */ jsx("div", { className: "price-strip-pills", children: ["belek", "side", "kemer", "alanya", "antalya"].map(
              (slug) => /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "price-pill",
                  type: "button",
                  onClick: () => bookRoute(slug),
                  children: [
                    routeCatalog[slug].names[language] ?? routeCatalog[slug].names.en,
                    " ",
                    /* @__PURE__ */ jsxs("strong", { children: [
                      "€",
                      routeCatalog[slug].prices.vito
                    ] })
                  ]
                },
                slug
              )
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("section", { className: "editorial-intro section", children: [
        /* @__PURE__ */ jsx("div", { className: "section-index", children: "01" }),
        /* @__PURE__ */ jsxs("div", { className: "eyebrow", children: [
          /* @__PURE__ */ jsx("span", {}),
          /* @__PURE__ */ jsx("p", { children: t("welcomeEyebrow", "Welcome to a better arrival") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "editorial-grid", children: [
          /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx(
            LineBreakText,
            {
              value: t(
                "welcomeTitle",
                "Travel beautifully.<br />Arrive effortlessly."
              )
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: t(
              "welcomeBody",
              "From the moment your flight lands, every detail is considered. Your chauffeur waits inside arrivals, handles your luggage and guides you to a meticulously prepared private vehicle."
            ) }),
            /* @__PURE__ */ jsxs("a", { className: "text-link", href: "#services", children: [
              /* @__PURE__ */ jsx("span", { children: t("ourStandards", "Our service standards") }),
              /* @__PURE__ */ jsx(Icon, { name: "arrow-right", className: "icon" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "luxury-stats", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("strong", { children: "24/7" }),
            /* @__PURE__ */ jsx("span", { children: t("concierge", "Concierge support") })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("strong", { children: "2,500+" }),
            /* @__PURE__ */ jsx("span", { children: t("guestsWelcomed", "Guests welcomed") })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("strong", { children: "4.9/5" }),
            /* @__PURE__ */ jsx("span", { children: t("guestRating", "Average guest rating") })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("strong", { children: "100%" }),
            /* @__PURE__ */ jsx("span", { children: t("privateTransfers", "Private transfers") })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "fleet section-dark", id: "fleet", children: /* @__PURE__ */ jsxs("div", { className: "section section-inner", children: [
        /* @__PURE__ */ jsxs("div", { className: "section-heading light-heading", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "eyebrow light", children: [
              /* @__PURE__ */ jsx("span", {}),
              /* @__PURE__ */ jsx("p", { children: t("fleetEyebrow", "The fleet") })
            ] }),
            /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx(
              LineBreakText,
              {
                value: t(
                  "fleetTitle",
                  "Your private space,<br />refined in every detail."
                )
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("p", { children: t(
            "fleetIntro",
            "Travel in quiet comfort with generous space for your family, golf equipment and luggage."
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "fleet-showcase", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "fleet-image fleet-carousel",
              "aria-label": "Our vehicle photos",
              children: [
                /* @__PURE__ */ jsx("div", { className: "fleet-carousel-track", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: fleetPhoto.src,
                    alt: fleetPhoto.alt,
                    width: "1600",
                    height: "765",
                    loading: "lazy"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "image-badge", children: [
                  /* @__PURE__ */ jsx("span", { children: t("signatureFleet", "Signature fleet") }),
                  /* @__PURE__ */ jsx("strong", { children: fleetCopy.shortName })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "fleet-carousel-caption", children: fleetPhoto.caption }),
                /* @__PURE__ */ jsxs("div", { className: "fleet-carousel-controls", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: "fleet-carousel-button",
                      type: "button",
                      "aria-label": "Previous vehicle photo",
                      onClick: () => changeFleetPhoto(-1),
                      children: /* @__PURE__ */ jsx(Icon, { name: "arrow-left", className: "icon" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "fleet-carousel-dots",
                      "aria-label": "Vehicle photo selection",
                      children: fleetPhotos.map((photo, index) => /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: `fleet-carousel-dot${index === fleetPhotoIndex ? " active" : ""}`,
                          type: "button",
                          "aria-label": `Show ${photo.caption.toLowerCase()} photo ${index + 1}`,
                          "aria-current": index === fleetPhotoIndex,
                          onClick: () => setFleetPhotoIndex(index)
                        },
                        `${photo.src}-${index}`
                      ))
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: "fleet-carousel-button",
                      type: "button",
                      "aria-label": "Next vehicle photo",
                      onClick: () => changeFleetPhoto(1),
                      children: /* @__PURE__ */ jsx(Icon, { name: "arrow-right", className: "icon" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "fleet-panel", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "fleet-tabs",
                role: "tablist",
                "aria-label": "Fleet vehicles",
                children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: `fleet-tab${fleet === "sprinter" ? " active" : ""}`,
                      type: "button",
                      role: "tab",
                      onClick: () => changeFleet("sprinter"),
                      children: "Mercedes Sprinter"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: `fleet-tab${fleet === "vito" ? " active" : ""}`,
                      type: "button",
                      role: "tab",
                      onClick: () => changeFleet("vito"),
                      children: "Mercedes Vito"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "fleet-panel-copy", children: [
              /* @__PURE__ */ jsx("span", { className: "mini-label", children: t(fleetCopy.classKey, fleetCopy.classFallback) }),
              /* @__PURE__ */ jsx("h3", { children: fleetCopy.name }),
              /* @__PURE__ */ jsx("p", { children: t(fleetCopy.descriptionKey, fleetCopy.descriptionFallback) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "fleet-capacity", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Icon, { name: "users", className: "icon" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: fleetCopy.guests }),
                  " ",
                  /* @__PURE__ */ jsx("span", { children: t("passengers", "passengers") })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Icon, { name: "luggage", className: "icon" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("strong", { children: fleetCopy.bags }),
                  " ",
                  /* @__PURE__ */ jsx("span", { children: t("suitcases", "suitcases") })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "amenity-list", children: [
              ["television", "In-vehicle television"],
              ["coldDrinks", "Cold drinks"],
              ["snacks", "Snacks"],
              ["childSeats", "Child seat available"],
              ["wifi", "Complimentary WiFi"]
            ].map(([key, fallback]) => /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(Icon, { name: "check", className: "icon" }),
              /* @__PURE__ */ jsx("span", { children: t(key, fallback) })
            ] }, key)) }),
            /* @__PURE__ */ jsxs("div", { className: "fleet-welcome-note", children: [
              /* @__PURE__ */ jsx(Icon, { name: "user-check", className: "icon" }),
              /* @__PURE__ */ jsx("span", { children: t(
                "nameSignGreeting",
                "Meet & greet with a personalised name sign"
              ) })
            ] }),
            /* @__PURE__ */ jsxs("a", { className: "button button-outline-gold", href: "#booking", children: [
              /* @__PURE__ */ jsx("span", { children: t("reserveVehicle", "Reserve this vehicle") }),
              /* @__PURE__ */ jsx(Icon, { name: "arrow-right", className: "icon" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "interior-banner", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/assets/optimized/executive-interior.jpg",
              alt: "Cream leather executive seating inside a luxury passenger van",
              width: "1400",
              height: "933",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "interior-copy", children: [
            /* @__PURE__ */ jsx("span", { className: "mini-label", children: t("insideVclass", "Inside the Sprinter") }),
            /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx(
              LineBreakText,
              {
                value: t(
                  "interiorTitle",
                  "A private lounge between<br />the airport and your hotel."
                )
              }
            ) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "service section", id: "services", children: [
        /* @__PURE__ */ jsxs("div", { className: "section-heading", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "eyebrow", children: [
              /* @__PURE__ */ jsx("span", {}),
              /* @__PURE__ */ jsx("p", { children: t("serviceEyebrow", "The Antalya VIP standard") })
            ] }),
            /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx(
              LineBreakText,
              {
                value: t(
                  "serviceTitle",
                  "More than a transfer.<br />A considered welcome."
                )
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("p", { children: t(
            "serviceIntro",
            "Hotel-level attention, experienced local chauffeurs and complete peace of mind from runway to resort."
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "service-grid", children: serviceItems.map(
          ([titleKey, title, bodyKey, body, icon], index) => {
            const isGreet = titleKey === "greetTitle";
            const CardEl = isGreet ? "a" : "article";
            return /* @__PURE__ */ jsxs(
              CardEl,
              {
                className: `service-card${index === 0 ? " featured" : ""}${isGreet ? " service-card-link" : ""}`,
                ...isGreet ? { href: "#meet-greet" } : {},
                children: [
                  /* @__PURE__ */ jsx("span", { className: "service-number", children: String(index + 1).padStart(2, "0") }),
                  /* @__PURE__ */ jsx("div", { className: "service-icon", children: /* @__PURE__ */ jsx(Icon, { name: icon }) }),
                  /* @__PURE__ */ jsx("h3", { children: t(titleKey, title) }),
                  /* @__PURE__ */ jsx("p", { children: t(bodyKey, body) })
                ]
              },
              titleKey
            );
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "routes section", id: "routes", children: [
        /* @__PURE__ */ jsxs("div", { className: "section-heading route-heading", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "eyebrow", children: [
              /* @__PURE__ */ jsx("span", {}),
              /* @__PURE__ */ jsx("p", { children: t("routesEyebrow", "Our most requested journeys") })
            ] }),
            /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx(
              LineBreakText,
              {
                value: t(
                  "routesTitle",
                  "From Antalya Airport<br />to the Turkish Riviera."
                )
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("p", { children: t(
            "routesIntro",
            "All prices are per vehicle, never per passenger, with complimentary waiting time included."
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "route-slider-toolbar", children: [
          /* @__PURE__ */ jsx("span", { className: "route-slider-hint", children: t("discountPricesShown", "Online -25% prices shown") }),
          /* @__PURE__ */ jsxs("div", { className: "route-slider-controls", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "route-slider-button route-slider-prev",
                type: "button",
                "aria-label": "Previous routes",
                disabled: routeSliderEdges.atStart,
                onClick: () => scrollRoutes(-1),
                children: /* @__PURE__ */ jsx(Icon, { name: "arrow-right" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "route-slider-button route-slider-next",
                type: "button",
                "aria-label": "Next routes",
                disabled: routeSliderEdges.atEnd,
                onClick: () => scrollRoutes(1),
                children: /* @__PURE__ */ jsx(Icon, { name: "arrow-right" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "route-slider",
            ref: routeSlider,
            "aria-label": "Antalya Airport transfer routes",
            tabIndex: 0,
            children: routeOrder.map((slug, index) => {
              const route = routeCatalog[slug];
              const destination = slug === "antalya" ? route.names[language] ?? route.names.en : routeDisplayNames[slug];
              const title = /* @__PURE__ */ jsxs(Fragment, { children: [
                routeAirportName,
                " ",
                /* @__PURE__ */ jsx("span", { children: "→" }),
                " ",
                destination
              ] });
              return /* @__PURE__ */ jsxs(
                "article",
                {
                  className: `route-card ${routeImageClasses[index]}`,
                  "data-route": slug,
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "route-card-top", children: [
                      /* @__PURE__ */ jsx("span", { className: "route-number", children: String(index + 1).padStart(2, "0") }),
                      slug === "belek" && /* @__PURE__ */ jsx("span", { className: "route-chip", children: t("golfFavourite", "Golf favourite") })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "route-card-copy", children: [
                      /* @__PURE__ */ jsxs("div", { className: "route-line", children: [
                        /* @__PURE__ */ jsx("span", { children: "AYT" }),
                        /* @__PURE__ */ jsx("i", {}),
                        /* @__PURE__ */ jsx(Icon, { name: "arrow-right" }),
                        /* @__PURE__ */ jsx("i", {}),
                        /* @__PURE__ */ jsx("span", { children: slug.toUpperCase() })
                      ] }),
                      /* @__PURE__ */ jsx("h3", { children: index >= 9 ? /* @__PURE__ */ jsx("a", { href: `${routePrefix}/transfers/${slug}/`, children: title }) : title }),
                      /* @__PURE__ */ jsx("div", { className: "route-vehicle-prices", children: /* @__PURE__ */ jsxs(
                        "button",
                        {
                          className: "route-price-button",
                          type: "button",
                          onClick: () => bookRoute(slug),
                          children: [
                            /* @__PURE__ */ jsxs("strong", { children: [
                              "€",
                              route.prices.vito
                            ] }),
                            /* @__PURE__ */ jsx(Icon, { name: "arrow-up-right" })
                          ]
                        }
                      ) })
                    ] })
                  ]
                },
                slug
              );
            })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("section", { className: "reviews section-dark", id: "reviews", children: /* @__PURE__ */ jsxs("div", { className: "section section-inner", children: [
        /* @__PURE__ */ jsxs("div", { className: "review-summary", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "eyebrow light", children: [
              /* @__PURE__ */ jsx("span", {}),
              /* @__PURE__ */ jsx("p", { children: t("reviewsEyebrow", "Guest reviews") })
            ] }),
            /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx(
              LineBreakText,
              {
                value: t(
                  "reviewsTitle",
                  "Service remembered<br />long after arrival."
                )
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "google-score", children: [
            /* @__PURE__ */ jsx("div", { className: "google-g", children: "G" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("strong", { children: "4.9" }),
                /* @__PURE__ */ jsx("span", { className: "stars", children: "★★★★★" })
              ] }),
              /* @__PURE__ */ jsx("p", { children: t("googleReviews", "Based on 387 verified Google reviews") })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "review-grid", children: reviews.map(([name, initials, time, review], index) => /* @__PURE__ */ jsxs(
          "a",
          {
            className: "review-card",
            href: "https://www.google.com/maps/place/Antalya+Vip+Tourism/@36.7321721,30.4262099,17z",
            target: "_blank",
            rel: "noopener",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "review-card-top", children: [
                /* @__PURE__ */ jsx("span", { className: "stars", children: "★★★★★" }),
                /* @__PURE__ */ jsx("span", { children: "Google" })
              ] }),
              /* @__PURE__ */ jsxs("blockquote", { children: [
                "“",
                review,
                "”"
              ] }),
              /* @__PURE__ */ jsxs("footer", { children: [
                /* @__PURE__ */ jsx("div", { className: "avatar", children: initials }),
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("strong", { children: name }) }),
                /* @__PURE__ */ jsx("time", { children: time })
              ] })
            ]
          },
          `${name}-${index}`
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "trusted-by", children: [
          /* @__PURE__ */ jsx("span", { children: t(
            "trustedBy",
            "Trusted by guests of Antalya's leading resorts"
          ) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("strong", { children: "MAXX ROYAL" }),
            /* @__PURE__ */ jsx("strong", { children: "REGNUM CARYA" }),
            /* @__PURE__ */ jsx("strong", { children: "GLORIA" }),
            /* @__PURE__ */ jsx("strong", { children: "VOYAGE" }),
            /* @__PURE__ */ jsx("strong", { children: "RIXOS" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "video-section section", id: "meet-greet", children: [
        /* @__PURE__ */ jsxs("div", { className: "section-heading", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "eyebrow", children: [
              /* @__PURE__ */ jsx("span", {}),
              /* @__PURE__ */ jsx("p", { children: t("videoEyebrow", "How to find us") })
            ] }),
            /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx(
              LineBreakText,
              {
                value: t(
                  "videoTitle",
                  "Find us at J / 777<br />after you land."
                )
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("p", { children: t(
            "videoSubtitle",
            "Our chauffeurs wait at the Meet & Greet Area — meeting point J / 777. Exit baggage claim, look for our name sign, and we handle the rest."
          ) })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "video-card",
            onClick: () => setVideoOpen(true),
            role: "button",
            tabIndex: 0,
            "aria-label": t("videoWatch", "Watch the clip"),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") setVideoOpen(true);
            },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "video-thumb", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`,
                    alt: t(
                      "videoThumbnailAlt",
                      "Antalya Airport meet and greet area"
                    ),
                    width: "280",
                    height: "498"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "video-play-overlay", "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: "video-play-btn", children: /* @__PURE__ */ jsx(Icon, { name: "play", className: "icon" }) }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "video-copy", children: [
                /* @__PURE__ */ jsx("span", { className: "mini-label", children: t("videoEyebrow", "How to find us") }),
                /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx(
                  LineBreakText,
                  {
                    value: t(
                      "videoCardTitle",
                      "Antalya Airport<br />Meet & Greet Point"
                    )
                  }
                ) }),
                /* @__PURE__ */ jsx("p", { children: t(
                  "videoCardBody",
                  "After collecting your luggage, exit to the Meet & Greet Area and look for meeting point J / 777. Tell our team your name — we'll take it from there."
                ) }),
                /* @__PURE__ */ jsxs("button", { className: "button button-outline-gold", type: "button", children: [
                  /* @__PURE__ */ jsx("span", { children: t("videoWatch", "Watch the clip") }),
                  /* @__PURE__ */ jsx(Icon, { name: "play", className: "icon" })
                ] })
              ] })
            ]
          }
        ),
        videoOpen && /* @__PURE__ */ jsx(
          "div",
          {
            className: "video-overlay",
            onClick: () => setVideoOpen(false),
            role: "dialog",
            "aria-label": t(
              "videoDialogLabel",
              "Antalya Airport meet and greet video"
            ),
            children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: "video-modal-content",
                onClick: (e) => e.stopPropagation(),
                children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: "video-dialog-close",
                      type: "button",
                      "aria-label": t("videoClose", "Close"),
                      onClick: () => setVideoOpen(false),
                      children: "✕"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    ReactPlayer,
                    {
                      src: `https://www.youtube.com/shorts/${VIDEO_ID}`,
                      playing: true,
                      controls: true,
                      width: "100%",
                      height: "100%"
                    }
                  )
                ]
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "faq section", id: "faq", children: [
        /* @__PURE__ */ jsxs("div", { className: "faq-heading", children: [
          /* @__PURE__ */ jsxs("div", { className: "eyebrow", children: [
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("p", { children: t("faqEyebrow", "Frequently asked") })
          ] }),
          /* @__PURE__ */ jsx("h2", { children: t("faqTitle", "Before you travel.") }),
          /* @__PURE__ */ jsx("p", { children: t(
            "faqIntro",
            "Everything you need to know about your private Antalya airport transfer."
          ) }),
          /* @__PURE__ */ jsxs("a", { className: "text-link", href: "#contact", children: [
            /* @__PURE__ */ jsx("span", { children: t("askQuestion", "Ask us a question") }),
            /* @__PURE__ */ jsx(Icon, { name: "arrow-right", className: "icon" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "accordion", children: faqItems.map(([question, answer], index) => /* @__PURE__ */ jsxs(
          "article",
          {
            className: `faq-item${openFaq === index ? " open" : ""}`,
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  "aria-expanded": openFaq === index,
                  onClick: () => setOpenFaq(openFaq === index ? -1 : index),
                  children: [
                    /* @__PURE__ */ jsx("span", { children: question }),
                    /* @__PURE__ */ jsx("i", {})
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "faq-answer", children: /* @__PURE__ */ jsx("p", { children: answer }) })
            ]
          },
          question
        )) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "contact section-dark", id: "contact", children: [
        /* @__PURE__ */ jsx("div", { className: "contact-bg" }),
        /* @__PURE__ */ jsxs("div", { className: "section contact-inner", children: [
          /* @__PURE__ */ jsxs("div", { className: "contact-copy", children: [
            /* @__PURE__ */ jsxs("div", { className: "eyebrow light", children: [
              /* @__PURE__ */ jsx("span", {}),
              /* @__PURE__ */ jsx("p", { children: t("contactEyebrow", "Your journey starts here") })
            ] }),
            /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx(
              LineBreakText,
              {
                value: t(
                  "contactTitle",
                  "Arrive in Antalya<br />exceptionally well."
                )
              }
            ) }),
            /* @__PURE__ */ jsx("p", { children: t(
              "contactBody",
              "Book online in less than two minutes or speak directly with our 24/7 concierge team."
            ) }),
            /* @__PURE__ */ jsxs("a", { className: "button button-gold", href: "#booking", children: [
              /* @__PURE__ */ jsx("span", { children: t("bookTransfer", "Book your transfer") }),
              /* @__PURE__ */ jsx(Icon, { name: "arrow-right", className: "icon" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "contact-options", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                className: "contact-card whatsapp",
                href: "https://wa.me/905302655790",
                target: "_blank",
                rel: "noreferrer",
                onClick: () => window.gtag?.("event", "whatsapp_clicked", { source: "contact_section" }),
                children: [
                  /* @__PURE__ */ jsx("div", { className: "contact-icon", children: /* @__PURE__ */ jsx(Icon, { name: "whatsapp", className: "whatsapp-icon" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { children: t("whatsappUs", "WhatsApp us") }),
                    /* @__PURE__ */ jsx("strong", { children: "+90 530 265 57 90" }),
                    /* @__PURE__ */ jsx("small", { children: t("replyMinutes", "Usually replies within minutes") })
                  ] }),
                  /* @__PURE__ */ jsx(Icon, { name: "arrow-up-right", className: "arrow" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("a", { className: "contact-card", href: "tel:+905302655790", children: [
              /* @__PURE__ */ jsx("div", { className: "contact-icon", children: /* @__PURE__ */ jsx(Icon, { name: "phone" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { children: t("callUs", "Call us 24/7") }),
                /* @__PURE__ */ jsx("strong", { children: "+90 530 265 57 90" }),
                /* @__PURE__ */ jsx("small", { children: "English · Deutsch · Türkçe" })
              ] }),
              /* @__PURE__ */ jsx(Icon, { name: "arrow-up-right", className: "arrow" })
            ] }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                className: "contact-card",
                href: "mailto:support@antalyaviptourism.com",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "contact-icon", children: /* @__PURE__ */ jsx(Icon, { name: "mail" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { children: t("emailUs", "Email concierge") }),
                    /* @__PURE__ */ jsx("strong", { children: "support@antalyaviptourism.com" }),
                    /* @__PURE__ */ jsx("small", { children: t("replyHour", "Replies within one hour") })
                  ] }),
                  /* @__PURE__ */ jsx(Icon, { name: "arrow-up-right", className: "arrow" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("footer", { children: [
      /* @__PURE__ */ jsxs("div", { className: "footer-main", children: [
        /* @__PURE__ */ jsxs("a", { className: "brand footer-brand", href: "#top", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/assets/optimized/logo.png",
              alt: "Antalya VIP Tourism",
              className: "brand-logo",
              width: "160",
              height: "120",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "brand-copy", children: [
            /* @__PURE__ */ jsx("strong", { children: "Antalya VIP" }),
            /* @__PURE__ */ jsx("span", { children: "Tourism" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { children: t(
          "footerTagline",
          "Private chauffeur services across the Turkish Riviera."
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "footer-links", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: t("explore", "Explore") }),
            /* @__PURE__ */ jsx("a", { href: "#fleet", children: t("navFleet", "Fleet") }),
            /* @__PURE__ */ jsx("a", { href: "#services", children: t("navService", "Service") }),
            /* @__PURE__ */ jsx("a", { href: "#routes", children: t("navRoutes", "Routes") })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: t("information", "Information") }),
            /* @__PURE__ */ jsx("a", { href: "#faq", children: "FAQ" }),
            /* @__PURE__ */ jsx("a", { href: "#contact", children: t("navContact", "Contact") }),
            /* @__PURE__ */ jsx("a", { href: imprintHref, children: "Impressum" }),
            /* @__PURE__ */ jsx("a", { href: privacyHref, children: "Privacy" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "footer-bottom", children: [
        /* @__PURE__ */ jsx("span", { children: "© 2026 Antalya VIP Tourism" }),
        /* @__PURE__ */ jsx("span", { children: t(
          "licensed",
          "Licensed private transfer operator · TÜRSAB compliant"
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      "a",
      {
        className: "floating-whatsapp",
        href: "https://wa.me/905302655790",
        target: "_blank",
        rel: "noreferrer",
        "aria-label": "Chat on WhatsApp",
        onClick: () => window.gtag?.("event", "whatsapp_clicked", { source: "floating_button" }),
        children: [
          /* @__PURE__ */ jsx(Icon, { name: "whatsapp", className: "whatsapp-icon" }),
          /* @__PURE__ */ jsx("span", { children: t("chatWithUs", "Chat with us") })
        ]
      }
    )
  ] });
}
const domain = "https://antalyaviptourism.com";
const indexableLanguages = ["en", "de", "fr", "tr", "ru", "cs", "uk", "ur", "pl", "nl", "ar", "sv"];
const homeSeo = {
  en: { locale: "en_GB", title: "Antalya Airport Transfer | Private VIP Tourism Service", description: "Private fixed-price transfers from Antalya Airport to resorts across Türkiye." },
  de: { locale: "de_DE", title: "Flughafen Antalya Transfer | Privater VIP Chauffeurservice", description: "Private Festpreis-Transfers vom Flughafen Antalya zu Reisezielen in der gesamten Türkei." },
  tr: { locale: "tr_TR", title: "Antalya Havalimanı Transferi | Özel VIP Transfer", description: "Antalya Havalimanı'ndan Belek, Side, Kemer, Alanya ve çevresine özel sabit fiyatlı transfer. Vito ve Sprinter, uçuş takibi ve karşılama." },
  ru: { locale: "ru_RU", title: "Трансфер из аэропорта Антальи | Частный VIP-трансфер", description: "Частные трансферы по фиксированной цене из аэропорта Антальи в Белек, Сиде, Кемер, Аланью и другие курорты. Встреча и отслеживание рейса." },
  fr: { locale: "fr_FR", title: "Transfert Aéroport Antalya | Service VIP Privé", description: "Transferts privés à prix fixe depuis l'aéroport d'Antalya vers Belek, Side, Kemer et Alanya. Accueil, suivi de vol et service porte-à-porte." },
  cs: { locale: "cs_CZ", title: "Transfer z letiště Antalya | Soukromá VIP přeprava", description: "Soukromé transfery s pevnou cenou z letiště Antalya do Beleku, Side, Kemeru a Alanye. Uvítání, sledování letů a služba od dveří ke dveřím." },
  uk: { locale: "uk_UA", title: "Трансфер з аеропорту Анталії | Приватний VIP-трансфер", description: "Приватні трансфери за фіксованою ціною з аеропорту Анталії до Белека, Сіде, Кемера, Аланьї та інших курортів. Зустріч і відстеження рейсу." },
  ur: { locale: "ur_PK", title: "انطالیہ ایئرپورٹ ٹرانسفر | نجی وی آئی پی سروس", description: "انطالیہ ایئرپورٹ سے بیلک، سیدے، کیمر اور الانیا تک مقررہ قیمت پر نجی ٹرانسفر۔ استقبال، پرواز کی نگرانی اور دروازے تک سروس۔" },
  pl: { locale: "pl_PL", title: "Transfer z lotniska Antalya | Prywatny transfer VIP", description: "Prywatne transfery w stałej cenie z lotniska Antalya do Belek, Side, Kemer, Alanya i innych kurortów. Powitanie i śledzenie lotu." },
  nl: { locale: "nl_NL", title: "Luchthaven Antalya Transfer | Privé VIP-vervoer", description: "Privétransfers met vaste prijs vanaf de luchthaven Antalya naar Belek, Side, Kemer, Alanya en andere resorts. Ontvangst en vluchtvolging." },
  ar: { locale: "ar_SA", title: "نقل مطار أنطاليا | خدمة VIP خاصة", description: "نقل خاص بسعر ثابت من مطار أنطاليا إلى بيليك وسيدي وكيمر وألانيا وغيرها من المنتجعات. استقبال وتتبع الرحلات وخدمة من الباب إلى الباب." },
  sv: { locale: "sv_SE", title: "Antalya Flygplatstransfer | Privat VIP-transport", description: "Privata transfrar till fast pris från Antalya flygplats till Belek, Side, Kemer, Alanya och andra resorter. Möte och flygbevakning." }
};
const healthSeo = {
  en: {
    locale: "en_GB",
    title: "Health Travel Coordination in Antalya | Antalya VIP Tourism",
    description: "Plan your Antalya health journey with clear provider roles, private transfers, accommodation coordination and continuity of care led by authorised medical teams.",
    service: "Health travel coordination and concierge logistics"
  },
  de: {
    locale: "de_DE",
    title: "Koordination Ihrer Gesundheitsreise in Antalya | Antalya VIP Tourism",
    description: "Planen Sie Ihre Gesundheitsreise nach Antalya mit klaren Zuständigkeiten, privaten Transfers, Unterkunftskoordination und ärztlich geführter Betreuung.",
    service: "Koordination von Gesundheitsreisen und Concierge-Logistik"
  },
  tr: {
    locale: "tr_TR",
    title: "Antalya Sağlık Seyahati Koordinasyonu | Antalya VIP Tourism",
    description: "Antalya'daki sağlık seyahatinizi net görev ayrımı, özel transfer, konaklama koordinasyonu ve yetkili sağlık ekiplerinin klinik takibiyle planlayın.",
    service: "Sağlık seyahati koordinasyonu ve concierge lojistiği"
  },
  ru: {
    locale: "ru_RU",
    title: "Координация медицинской поездки в Анталью | Antalya VIP Tourism",
    description: "Спланируйте поездку в Анталью с чётким разделением обязанностей, частным трансфером, координацией проживания и наблюдением медицинской команды.",
    service: "Координация медицинских поездок и консьерж-логистика"
  },
  fr: {
    locale: "fr_FR",
    title: "Coordination de voyage de santé à Antalya | Antalya VIP Tourism",
    description: "Planifiez votre voyage de santé à Antalya avec des rôles clairs, des transferts privés, une coordination d'hébergement et un suivi médical continu par des équipes autorisées.",
    service: "Coordination de voyages de santé et logistique conciergerie"
  },
  cs: {
    locale: "cs_CZ",
    title: "Koordinace zdravotní cesty do Antalye | Antalya VIP Tourism",
    description: "Naplánujte svou zdravotní cestu do Antalye s jasným rozdělením rolí, soukromými transfery, koordinací ubytování a kontinuální péčí vedenou odbornými lékařskými týmy.",
    service: "Koordinace zdravotní cesty a concierge logistika"
  },
  uk: {
    locale: "uk_UA",
    title: "Координація медичної подорожі в Анталії | Antalya VIP Tourism",
    description: "Сплануйте свою медичну подорож до Анталії з чітким розподілом ролей, приватними трансферами, координацією проживання та безперервним медичним супроводом уповноважених команд.",
    service: "Координація медичних подорожей та консьєрж-логістика"
  },
  ur: {
    locale: "ur_PK",
    title: "انطالیہ میں طبی سفر کوآرڈینیشن | Antalya VIP Tourism",
    description: "انطالیہ میں اپنے طبی سفر کی منصوبہ بندی واضح ذمہ داریوں، نجی ٹرانسفر، رہائش کوآرڈینیشن اور مجاز طبی ٹیموں کی مسلسل نگہداشت کے ساتھ کریں۔",
    service: "طبی سفر کوآرڈینیشن اور کنسیئرج لاجسٹکس"
  },
  pl: {
    locale: "pl_PL",
    title: "Koordynacja podróży medycznej w Antalyi | Antalya VIP Tourism",
    description: "Zaplanuj swoją podróż medyczną do Antalyi z jasnym podziałem ról, prywatnymi transferami, koordynacją zakwaterowania i ciągłą opieką prowadzoną przez uprawnione zespoły medyczne.",
    service: "Koordynacja podróży medycznych i logistyka concierge"
  },
  nl: {
    locale: "nl_NL",
    title: "Coördinatie van medische reizen in Antalya | Antalya VIP Tourism",
    description: "Plan uw medische reis naar Antalya met duidelijke rolverdeling, privétransfers, coördinatie van accommodatie en continue zorg onder leiding van bevoegde medische teams.",
    service: "Coördinatie van medische reizen en conciërgelogistiek"
  },
  ar: {
    locale: "ar_SA",
    title: "تنسيق الرحلات الصحية في أنطاليا | Antalya VIP Tourism",
    description: "خطط لرحلتك الصحية إلى أنطاليا مع أدوار واضحة، ونقل خاص، وتنسيق الإقامة، ورعاية مستمرة يقودها فريق طبي معتمد.",
    service: "تنسيق الرحلات الصحية والخدمات اللوجستية للكونسيرج"
  },
  sv: {
    locale: "sv_SE",
    title: "Samordning av hälsoresor i Antalya | Antalya VIP Tourism",
    description: "Planera din hälsoresa till Antalya med tydlig ansvarsfördelning, privata transfrar, boendesamordning och kontinuerlig vård ledd av auktoriserade medicinska team.",
    service: "Samordning av hälsoresor och conciergelogistik"
  }
};
const routeText = {
  en: {
    title: (name) => `Antalya Airport to ${name} Transfer | Private Fixed-Price Service`,
    description: (name, price) => `Private fixed-price transfer from Antalya Airport to ${name} from €${price}. Meet and greet, flight tracking and door-to-door service.`,
    heading: (name) => `Private transfer from Antalya Airport to ${name}`,
    faq: (name, price, duration) => [[`How long is the transfer from Antalya Airport to ${name}?`, `The journey takes approximately ${duration} in normal traffic.`], [`What is the fixed transfer price to ${name}?`, `Mercedes Vito prices start from €${price} per vehicle. The confirmed total is shown when booking.`], ["What happens if my flight is delayed?", "We track your flight in real time and adjust the meeting time at no extra charge."]]
  },
  de: {
    title: (name) => `Flughafen Antalya nach ${name} Transfer | Privater Festpreis-Transfer`,
    description: (name, price) => `Privater Festpreis-Transfer vom Flughafen Antalya nach ${name} ab €${price}. Meet & Greet, Flugverfolgung und Tür-zu-Tür-Service.`,
    heading: (name) => `Privater Transfer vom Flughafen Antalya nach ${name}`,
    faq: (name, price, duration) => [[`Wie lange dauert der Transfer vom Flughafen Antalya nach ${name}?`, `Die Fahrt dauert bei normalem Verkehr ungefähr ${duration}.`], [`Was kostet der Festpreis-Transfer nach ${name}?`, `Die Preise für einen Mercedes Vito beginnen bei €${price} pro Fahrzeug.`], ["Was passiert bei einer Flugverspätung?", "Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit ohne Aufpreis an."]]
  },
  tr: {
    title: (name) => `Antalya Havalimanı ${name} Transferi | Özel Sabit Fiyat`,
    description: (name, price) => `Antalya Havalimanı'ndan ${name} bölgesine €${price}'dan başlayan özel sabit fiyatlı transfer. Uçuş takibi, karşılama ve kapıdan kapıya hizmet.`,
    heading: (name) => `Antalya Havalimanı'ndan ${name} bölgesine özel transfer`,
    faq: (name, price, duration) => [[`Antalya Havalimanı ile ${name} arası transfer ne kadar sürer?`, `Normal trafik koşullarında yolculuk yaklaşık ${duration} sürer.`], [`${name} transferinin sabit fiyatı nedir?`, `Mercedes Vito fiyatları araç başına €${price}'dan başlar.`], ["Uçuşum gecikirse ne olur?", "Uçuşunuzu gerçek zamanlı takip eder, karşılama saatini ücretsiz olarak güncelleriz."]]
  },
  ru: {
    title: (name) => `Трансфер из аэропорта Антальи в ${name} | Фиксированная цена`,
    description: (name, price) => `Частный трансфер из аэропорта Антальи в ${name} от €${price} за автомобиль. Встреча, отслеживание рейса и доставка до отеля.`,
    heading: (name) => `Частный трансфер из аэропорта Антальи в ${name}`,
    faq: (name, price, duration) => [[`Сколько длится трансфер из аэропорта Антальи в ${name}?`, `При обычном движении поездка занимает около ${duration}.`], [`Сколько стоит трансфер в ${name}?`, `Стоимость Mercedes Vito начинается от €${price} за автомобиль.`], ["Что произойдёт при задержке рейса?", "Мы отслеживаем рейс в реальном времени и бесплатно корректируем время встречи."]]
  },
  fr: {
    title: (name) => `Transfert Aéroport Antalya vers ${name} | Prix Fixe Privé`,
    description: (name, price) => `Transfert privé à prix fixe depuis l'aéroport d'Antalya vers ${name} à partir de €${price}. Accueil, suivi de vol et service porte-à-porte.`,
    heading: (name) => `Transfert privé depuis l'aéroport d'Antalya vers ${name}`,
    faq: (name, price, duration) => [[`Combien de temps dure le transfert de l'aéroport d'Antalya vers ${name} ?`, `Le trajet dure environ ${duration} en trafic normal.`], [`Quel est le prix fixe du transfert vers ${name} ?`, `Les prix Mercedes Vito commencent à €${price} par véhicule. Le montant total confirmé est affiché lors de la réservation.`], ["Que se passe-t-il si mon vol est retardé ?", "Nous suivons votre vol en temps réel et ajustons l'heure de prise en charge sans frais supplémentaires."]]
  },
  cs: {
    title: (name) => `Transfer z letiště Antalya do ${name} | Soukromá pevná cena`,
    description: (name, price) => `Soukromý transfer s pevnou cenou z letiště Antalya do ${name} od €${price}. Uvítání, sledování letů a přeprava od dveří ke dveřím.`,
    heading: (name) => `Soukromý transfer z letiště Antalya do ${name}`,
    faq: (name, price, duration) => [[`Jak dlouho trvá transfer z letiště Antalya do ${name}?`, `Cesta trvá přibližně ${duration} při běžném provozu.`], [`Jaká je pevná cena transferu do ${name}?`, `Ceny Mercedes Vito začínají od €${price} za vozidlo. Potvrzená celková cena je zobrazena při rezervaci.`], ["Co se stane, když má můj let zpoždění?", "Sledujeme váš let v reálném čase a upravujeme čas setkání bez příplatku."]]
  },
  uk: {
    title: (name) => `Трансфер з аеропорту Анталії до ${name} | Фіксована ціна`,
    description: (name, price) => `Приватний трансфер за фіксованою ціною з аеропорту Анталії до ${name} від €${price} за автомобіль. Зустріч, відстеження рейсу та доставка до готелю.`,
    heading: (name) => `Приватний трансфер з аеропорту Анталії до ${name}`,
    faq: (name, price, duration) => [[`Скільки триває трансфер з аеропорту Анталії до ${name}?`, `За звичайного руху поїздка займає близько ${duration}.`], [`Яка фіксована ціна трансферу до ${name}?`, `Ціни на Mercedes Vito починаються від €${price} за автомобіль. Підтверджена загальна сума показується під час бронювання.`], ["Що станеться, якщо мій рейс затримається?", "Ми відстежуємо ваш рейс у реальному часі та безкоштовно коригуємо час зустрічі."]]
  },
  ur: {
    title: (name) => `انطالیہ ایئرپورٹ سے ${name} ٹرانسفر | نجی مقررہ قیمت`,
    description: (name, price) => `انطالیہ ایئرپورٹ سے ${name} تک مقررہ قیمت پر نجی ٹرانسفر €${price} فی گاڑی سے شروع۔ استقبال، پرواز کی نگرانی اور دروازے تک سروس۔`,
    heading: (name) => `انطالیہ ایئرپورٹ سے ${name} تک نجی ٹرانسفر`,
    faq: (name, price, duration) => [[`انطالیہ ایئرپورٹ سے ${name} تک ٹرانسفر میں کتنا وقت لگتا ہے؟`, `عام ٹریفک میں سفر تقریباً ${duration} لیتا ہے۔`], [`${name} تک ٹرانسفر کی مقررہ قیمت کیا ہے؟`, `Mercedes Vito کی قیمتیں €${price} فی گاڑی سے شروع ہوتی ہیں۔ تصدیق شدہ کل رقم بکنگ کے وقت دکھائی جاتی ہے۔`], ["اگر میری پرواز میں تاخیر ہو جائے تو کیا ہوگا؟", "ہم آپ کی پرواز کو حقیقی وقت میں ٹریک کرتے ہیں اور بغیر کسی اضافی چارج کے ملاقات کا وقت ایڈجسٹ کرتے ہیں۔"]]
  },
  pl: {
    title: (name) => `Transfer z lotniska Antalya do ${name} | Prywatna stała cena`,
    description: (name, price) => `Prywatny transfer w stałej cenie z lotniska Antalya do ${name} od €${price} za pojazd. Powitanie, śledzenie lotu i dowóz pod hotel.`,
    heading: (name) => `Prywatny transfer z lotniska Antalya do ${name}`,
    faq: (name, price, duration) => [[`Jak długo trwa transfer z lotniska Antalya do ${name}?`, `Przy normalnym ruchu podróż trwa około ${duration}.`], [`Jaka jest stała cena transferu do ${name}?`, `Ceny Mercedes Vito zaczynają się od €${price} za pojazd. Potwierdzona łączna kwota jest pokazywana podczas rezerwacji.`], ["Co się stanie, jeśli mój lot będzie opóźniony?", "Śledzimy Twój lot w czasie rzeczywistym i bez dodatkowych opłat dostosowujemy godzinę odbioru."]]
  },
  nl: {
    title: (name) => `Luchthaven Antalya naar ${name} Transfer | Privé Vaste Prijs`,
    description: (name, price) => `Privétransfer met vaste prijs van de luchthaven Antalya naar ${name} vanaf €${price} per voertuig. Ontvangst, vluchtvolging en deur-tot-deur service.`,
    heading: (name) => `Privétransfer van de luchthaven Antalya naar ${name}`,
    faq: (name, price, duration) => [[`Hoe lang duurt de transfer van de luchthaven Antalya naar ${name}?`, `De rit duurt ongeveer ${duration} bij normaal verkeer.`], [`Wat is de vaste transferprijs naar ${name}?`, `Mercedes Vito-prijzen beginnen bij €${price} per voertuig. Het bevestigde totaal wordt getoond bij het boeken.`], ["Wat gebeurt er als mijn vlucht vertraging heeft?", "We volgen uw vlucht in realtime en passen de ophaaltijd zonder extra kosten aan."]]
  },
  ar: {
    title: (name) => `نقل من مطار أنطاليا إلى ${name} | سعر ثابت خاص`,
    description: (name, price) => `نقل خاص بسعر ثابت من مطار أنطاليا إلى ${name} يبدأ من €${price} لكل مركبة. استقبال وتتبع الرحلة وخدمة من الباب إلى الباب.`,
    heading: (name) => `نقل خاص من مطار أنطاليا إلى ${name}`,
    faq: (name, price, duration) => [[`كم يستغرق النقل من مطار أنطاليا إلى ${name}؟`, `تستغرق الرحلة حوالي ${duration} في حركة المرور العادية.`], [`ما هو السعر الثابت للنقل إلى ${name}؟`, `تبدأ أسعار مرسيدس فيتو من €${price} لكل مركبة. يظهر الإجمالي المؤكد عند الحجز.`], ["ماذا يحدث إذا تأخرت رحلتي؟", "نتتبع رحلتك في الوقت الفعلي ونعدّل وقت اللقاء دون أي رسوم إضافية."]]
  },
  sv: {
    title: (name) => `Antalya Flygplats till ${name} Transfer | Privat Fast Pris`,
    description: (name, price) => `Privat transfer till fast pris från Antalya flygplats till ${name} från €${price} per fordon. Möte, flygbevakning och dörr-till-dörr-service.`,
    heading: (name) => `Privat transfer från Antalya flygplats till ${name}`,
    faq: (name, price, duration) => [[`Hur lång tid tar transfern från Antalya flygplats till ${name}?`, `Resan tar cirka ${duration} vid normal trafik.`], [`Vad är det fasta transferpriset till ${name}?`, `Mercedes Vito-priser börjar från €${price} per fordon. Den bekräftade summan visas vid bokning.`], ["Vad händer om mitt flyg är försenat?", "Vi spårar ditt flyg i realtid och justerar mötestiden utan extra kostnad."]]
  }
};
const languageFromPath = (pathname) => {
  const candidate = pathname.split("/").filter(Boolean)[0];
  return candidate === "de" || candidate === "fr" || candidate === "tr" || candidate === "ru" || candidate === "cs" || candidate === "uk" || candidate === "ur" || candidate === "pl" || candidate === "nl" || candidate === "ar" || candidate === "sv" ? candidate : "en";
};
const localizedPath = (language, suffix = "") => `/${language === "en" ? "" : `${language}/`}${suffix}`;
const alternateDescriptors = (suffix = "") => [
  ...indexableLanguages.map((language) => ({ tagName: "link", rel: "alternate", hrefLang: language, href: `${domain}${localizedPath(language, suffix)}` })),
  { tagName: "link", rel: "alternate", hrefLang: "x-default", href: `${domain}${localizedPath("en", suffix)}` }
];
const socialDescriptors = (title, description, url, locale, image = `${domain}/assets/optimized/og-antalya-transfer.jpg`) => [
  { property: "og:type", content: "website" },
  { property: "og:url", content: url },
  { property: "og:site_name", content: "Antalya VIP Tourism" },
  { property: "og:title", content: title },
  { property: "og:description", content: description },
  { property: "og:image", content: image },
  { property: "og:locale", content: locale },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: title },
  { name: "twitter:description", content: description },
  { name: "twitter:image", content: image }
];
function homeMeta(language) {
  const seo = homeSeo[language];
  const pathname = localizedPath(language);
  const resources2 = translationData.resources;
  const copy2 = resources2[language] ?? resources2.en;
  const faq = [1, 2, 3, 4, 5].map((number) => {
    const word = ["One", "Two", "Three", "Four", "Five"][number - 1];
    return { "@type": "Question", name: copy2[`faq${word}Q`], acceptedAnswer: { "@type": "Answer", text: copy2[`faq${word}A`] } };
  });
  const travelAgency = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Antalya VIP Tourism",
    url: domain,
    telephone: "+90 530 265 57 90",
    image: `${domain}/assets/optimized/og-antalya-transfer.jpg`,
    address: { "@type": "PostalAddress", streetAddress: "Belek Mah. Belek 61 Sk. Belek Deniz Apt No: 19 Ic Kapi No: 4", addressLocality: "Serik", addressRegion: "Antalya", addressCountry: "TR" },
    areaServed: publicRouteSlugs.map((slug) => ({ "@type": "City", name: routeCatalog[slug].names.en }))
  };
  return [
    { title: seo.title },
    { name: "description", content: seo.description },
    { tagName: "link", rel: "canonical", href: `${domain}${pathname}` },
    ...alternateDescriptors(),
    ...socialDescriptors(seo.title, seo.description, `${domain}${pathname}`, seo.locale),
    { "script:ld+json": travelAgency },
    { "script:ld+json": { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq } }
  ];
}
function healthMeta(language) {
  const seo = healthSeo[language];
  const pathname = localizedPath(language, "health/");
  const url = `${domain}${pathname}`;
  const image = `${domain}/assets/optimized/og-health-tourism.jpg`;
  const provider = {
    "@type": "TravelAgency",
    name: "Antalya VIP Tourism",
    url: domain,
    telephone: "+90 530 265 57 90"
  };
  return [
    { title: seo.title },
    { name: "description", content: seo.description },
    { tagName: "link", rel: "canonical", href: url },
    ...alternateDescriptors("health/"),
    ...socialDescriptors(seo.title, seo.description, url, seo.locale, image),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Antalya VIP Tourism", item: `${domain}${localizedPath(language)}` },
          { "@type": "ListItem", position: 2, name: seo.service, item: url }
        ]
      }
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Service",
        name: seo.service,
        description: seo.description,
        url,
        provider,
        areaServed: { "@type": "AdministrativeArea", name: "Antalya, Türkiye" },
        audience: { "@type": "Audience", audienceType: "International travellers" }
      }
    }
  ];
}
function clinicMeta() {
  const title = "ORIVA Clinic — Premium Estetik Klinik Web Sitesi Demosu";
  const description = "Antalya estetik klinikleri için hazırlanmış kurgusal premium web sitesi konsepti. Gerçek klinik, hekim, hasta veya tedavi sonucu içermez.";
  const url = `${domain}/clinic/`;
  const image = `${domain}/assets/optimized/og-clinic-demo.jpg`;
  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "noindex,nofollow" },
    { tagName: "link", rel: "canonical", href: url },
    ...socialDescriptors(title, description, url, "tr_TR", image)
  ];
}
function routeMeta(language, slug) {
  const route = routeCatalog[slug];
  if (!route) return [];
  const text = routeText[language];
  const names = route.names;
  const durations = route.duration;
  const name = names[language] ?? names["en"];
  const title = text.title(name);
  const description = text.description(name, route.prices.vito);
  const pathname = localizedPath(language, `transfers/${slug}/`);
  const url = `${domain}${pathname}`;
  const faq = text.faq(name, route.prices.vito, durations[language] ?? durations["en"]);
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    ...alternateDescriptors(`transfers/${slug}/`),
    ...socialDescriptors(title, description, url, homeSeo[language].locale),
    { "script:ld+json": { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${domain}${localizedPath(language)}` }, { "@type": "ListItem", position: 2, name: "Transfer routes", item: `${domain}${localizedPath(language)}#routes` }, { "@type": "ListItem", position: 3, name: text.heading(name), item: url }] } },
    { "script:ld+json": { "@context": "https://schema.org", "@type": "Service", name: text.heading(name), url, provider: { "@type": "TravelAgency", name: "Antalya VIP Tourism", url: domain, telephone: "+90 530 265 57 90" }, areaServed: { "@type": "Place", name }, offers: [{ "@type": "Offer", name: "Mercedes Vito", price: String(route.prices.vito), priceCurrency: "EUR" }, { "@type": "Offer", name: "Mercedes Sprinter", price: String(route.prices.sprinter), priceCurrency: "EUR" }] } },
    { "script:ld+json": { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) } }
  ];
}
function hotelMeta(slug) {
  const hotel2 = hotelBySlug(slug);
  if (!hotel2) return [];
  const route = routeCatalog[hotel2.regionSlug];
  const url = `${domain}/de/hotels/${hotel2.slug}/`;
  const transferUrl = `${domain}/de/transfers/${hotel2.regionSlug}/`;
  const title = `Flughafen Antalya → ${hotel2.name} Transfer | Privater Festpreis`;
  const description = `Privater Transfer vom Flughafen Antalya zum ${hotel2.name} ab €${route.prices.vito} pro Fahrzeug. Flugverfolgung, Empfang und direkte Fahrt zum Hotel.`;
  const serviceName = `Privattransfer vom Flughafen Antalya zum ${hotel2.name}`;
  const faq = [
    { "@type": "Question", name: `Wie lange dauert die Fahrt zum ${hotel2.name}?`, acceptedAnswer: { "@type": "Answer", text: `Bei normalem Verkehr ungefähr ${route.duration.de}.` } },
    { "@type": "Question", name: "Was kostet der Transfer?", acceptedAnswer: { "@type": "Answer", text: `Der Mercedes Vito kostet ab €${route.prices.vito} pro Fahrzeug.` } }
  ];
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    ...socialDescriptors(title, description, url, homeSeo.de.locale),
    { "script:ld+json": { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Antalya VIP Tourism", item: `${domain}/de/` }, { "@type": "ListItem", position: 2, name: `Transfer nach ${route.names.de}`, item: transferUrl }, { "@type": "ListItem", position: 3, name: hotel2.name, item: url }] } },
    { "script:ld+json": { "@context": "https://schema.org", "@type": "Service", name: serviceName, description, url, provider: { "@type": "TravelAgency", name: "Antalya VIP Tourism", url: domain, telephone: "+90 530 265 57 90" }, areaServed: { "@type": "Hotel", name: hotel2.name }, offers: [{ "@type": "Offer", name: "Mercedes Vito", price: String(route.prices.vito), priceCurrency: "EUR" }, { "@type": "Offer", name: "Mercedes Sprinter", price: String(route.prices.sprinter), priceCurrency: "EUR" }] } },
    { "script:ld+json": { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq } }
  ];
}
const routeCopy = (language) => routeText[language];
const routeCanonical = (matches, prefix) => {
  const id = matches.find((m) => m.id.startsWith(prefix))?.id ?? "";
  const lang = id.replace(prefix, "") || "en";
  return lang === "en" ? `${domain}/` : `${domain}/${lang}/`;
};
function loader$5({
  request
}) {
  return {
    language: languageFromPath(new URL(request.url).pathname)
  };
}
const meta$5 = ({
  loaderData,
  matches
}) => {
  const metas = homeMeta(loaderData?.language ?? "en");
  if (!matches) return metas;
  const canonical = routeCanonical(matches, "home-");
  return metas.map((m) => m.tagName === "link" && m.rel === "canonical" ? {
    ...m,
    href: canonical
  } : m);
};
const home = UNSAFE_withComponentProps(function HomeRoute() {
  const {
    language
  } = useLoaderData();
  return /* @__PURE__ */ jsxs(LanguageProvider, {
    initialLanguage: language,
    children: [/* @__PURE__ */ jsx(HomePage, {
      initialLanguage: language
    }), /* @__PURE__ */ jsx(CookieConsent, {})]
  });
});
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  loader: loader$5,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const healthCopy = {
  en: {
    navCta: "Request a consultation",
    hero: {
      eyebrow: "International health travel coordination · Antalya",
      title: "A considered journey, built around your health.",
      body: "Antalya VIP Tourism coordinates appointments with authorised healthcare providers, private transfers, accommodation and travel logistics. Medical assessment, treatment decisions and clinical follow-up remain exclusively with the treating physician and healthcare provider.",
      primary: "Request a coordination call",
      secondary: "See how it works",
      note: "Clear roles · Written plan · Named provider · Respect for your data",
      imageAlt: "Calm private consultation lounge overlooking the Mediterranean in Antalya"
    },
    principles: [
      { title: "Every role is clear", body: "The provider, physician and coordination responsibilities are explained separately." },
      { title: "Clinical decisions stay clinical", body: "Suitability, method and treatment scope are determined only by an authorised physician." },
      { title: "The plan is written", body: "Timing, inclusions, exclusions and possible changes are set out before you travel." },
      { title: "Aftercare is mapped", body: "Discharge advice, follow-up dates and the clinical contact route are clarified before departure." }
    ],
    consultation: {
      label: "Start with a conversation",
      title: "Tell us what you are considering.",
      body: "Choose an area and request a callback. We will explain the coordination route before any medical information is requested.",
      field: "Area of interest",
      options: ["Hair restoration", "Aesthetic surgery", "Dental care", "Non-surgical aesthetics", "I am not sure yet"],
      cta: "Continue on WhatsApp",
      call: "Or call +90 530 265 57 90",
      note: "Please do not send medical records or photographs in the first message. The receiving healthcare provider and consent process should be confirmed first.",
      message: "Hello, I would like to request an initial health travel coordination call. Area of interest:"
    },
    trust: {
      eyebrow: "A more responsible standard",
      title: "Trust starts with the right information.",
      intro: "Before any journey, you should know who will assess you, where the service will take place, what the indicative plan includes and who remains responsible after you return home. Our job is to make those answers visible and keep the non-clinical parts moving together."
    },
    services: {
      eyebrow: "Areas we coordinate",
      title: "One journey. Specialist-led care.",
      intro: "We coordinate the travel around your care. The healthcare provider evaluates suitability and defines every clinical detail.",
      suitability: "Final suitability requires a physician's assessment.",
      items: [
        { number: "01", title: "Hair restoration", body: "Coordination for hair-transplant enquiries, provider appointments, private transport, accommodation and the schedule around treatment.", note: "FUE, DHI or another approach is selected by the treating team after assessment.", icon: "sparkle" },
        { number: "02", title: "Aesthetic surgery", body: "A carefully paced travel plan for facial and body procedures, including appointments, companion logistics and recovery-day transport.", note: "An online review is not final surgical approval; the plan may change after examination and tests.", icon: "user-check" },
        { number: "03", title: "Dental care", body: "Coordination for implant, restorative and smile-related enquiries, with travel timing built around the number of clinical visits.", note: "The dental plan is confirmed after examination and any required imaging.", icon: "shield" },
        { number: "04", title: "Non-surgical aesthetics", body: "Appointment and travel coordination for eligible physician-led aesthetic applications, with transparent provider and product information.", note: "Indication, product, dose and risks must be discussed directly with the healthcare professional.", icon: "check-circle" }
      ]
    },
    roles: {
      eyebrow: "One point of contact, two distinct roles",
      title: "Coordination is not medical care.",
      intro: "Keeping this boundary visible is essential. We organise the journey; authorised medical professionals assess and treat you.",
      coordinatorTitle: "Antalya VIP Tourism coordinates",
      coordinatorItems: ["Airport, hotel and provider transfers", "Accommodation and companion logistics", "Appointment and daily itinerary flow", "Language and communication assistance where arranged", "Non-clinical changes to the travel plan"],
      medicalTitle: "The healthcare provider manages",
      medicalItems: ["Diagnosis and medical suitability", "Choice and scope of treatment", "Risks, alternatives and recovery guidance", "Informed consent, procedures and medication", "Clinical follow-up and complication management"],
      notice: "Antalya VIP Tourism is not a healthcare provider and does not diagnose, recommend a treatment method or promise a medical or aesthetic outcome."
    },
    journey: {
      eyebrow: "Your journey",
      title: "Six clear steps from first call to return.",
      intro: "Each handover is defined so you always know who you are speaking to and what happens next.",
      items: [
        { title: "Initial conversation", body: "We learn your travel expectations, preferred language and approximate dates without requesting detailed health data." },
        { title: "Provider introduction", body: "The healthcare provider responsible for the assessment is identified before records are shared." },
        { title: "Consent and records", body: "Only necessary information is transferred to the named provider after the relevant privacy and consent information is clear." },
        { title: "Physician pre-assessment", body: "The clinical team gives an initial view. This is not a final diagnosis, treatment approval or result guarantee." },
        { title: "Written plan", body: "Clinical and travel costs, inclusions, exclusions, timing and possible changes are presented separately." },
        { title: "Arrival and follow-up", body: "The final plan follows in-person assessment. Before return, the provider supplies aftercare and contact instructions." }
      ]
    },
    standards: {
      eyebrow: "Provider selection",
      title: "What we look for before making an introduction.",
      intro: "A polished lobby is not evidence of clinical quality. Provider identity, authority, physician responsibility and continuity of care matter more.",
      items: ["Verifiable legal identity and physical address", "Relevant international health-tourism authorisation", "Named physician and clearly stated specialty", "Written consent, risk and alternatives process", "Transparent clinical and non-clinical pricing", "Documented discharge and follow-up route"],
      cardLabel: "Before you decide",
      cardTitle: "Ask for the complete picture.",
      cardBody: "You should receive enough information to compare options calmly, without countdowns, pressure or guaranteed-result language.",
      cardItems: ["Who will perform each stage?", "What can change after examination?", "Which costs sit outside the plan?", "Who is the clinical contact after return?"]
    },
    scope: {
      eyebrow: "Transparent scope",
      title: "No vague 'all-inclusive' promise.",
      intro: "Medical care and travel services should be shown as separate lines. Your written plan should state exactly what is included and what remains conditional.",
      includedTitle: "Travel coordination may include",
      included: ["Private airport and local transfers", "Accommodation coordination", "Appointment and itinerary management", "Companion and language logistics", "Return-travel planning around clinical advice"],
      separateTitle: "Always confirmed separately",
      separate: ["Healthcare provider's clinical fees", "Tests, medication and additional procedures", "Flights, insurance and visa costs", "Changes following in-person examination", "Unexpected or emergency medical care"],
      note: "The exact scope is defined in the written proposal. Flights should be booked only after the treating provider confirms the recommended schedule."
    },
    faq: {
      eyebrow: "Frequently asked",
      title: "Questions worth asking before you travel.",
      intro: "Clear answers are part of informed decision-making.",
      items: [
        { question: "Does Antalya VIP Tourism provide treatment?", answer: "No. Antalya VIP Tourism is not a healthcare provider. Diagnosis, treatment and clinical follow-up are delivered by the identified authorised healthcare provider and its medical professionals." },
        { question: "Which technique is right for me?", answer: "Only the relevant physician can answer after reviewing your history, examination findings and any necessary tests. Our coordination team does not recommend a clinical method." },
        { question: "Is an online plan final?", answer: "No. An online review is preliminary. The plan and price may change after in-person examination or additional tests; any change should be explained and approved before treatment." },
        { question: "Can a result be guaranteed?", answer: "No. Medical and aesthetic outcomes vary by person, procedure and recovery. A responsible provider does not guarantee a specific result." },
        { question: "How long should I stay in Antalya?", answer: "The safe duration depends on the procedure and the treating physician's advice. Confirm the clinical schedule before booking flights." },
        { question: "What happens after I return home?", answer: "The provider should issue written aftercare and follow-up instructions. The coordination line is not an emergency medical service; use local emergency care whenever urgent help is needed." }
      ]
    },
    final: {
      eyebrow: "Your first step",
      title: "See the whole picture before you decide.",
      body: "Tell us the area you are considering. We will explain what information is needed, which healthcare provider would assess it and how the travel stages fit together.",
      cta: "Request a coordination call",
      secondary: "Call us",
      notice: "This is not a medical diagnosis or emergency channel. No medical documents are requested at the first step."
    },
    footer: {
      tagline: "Private travel and concierge coordination in Antalya.",
      explore: "Explore",
      home: "Home",
      services: "Areas",
      process: "Process",
      contact: "Contact",
      legal: "Information",
      privacy: "Privacy",
      imprint: "Imprint",
      disclaimer: "Antalya VIP Tourism is not a healthcare provider. All medical assessment, treatment and clinical follow-up are the responsibility of the identified authorised healthcare provider and treating professionals."
    }
  },
  tr: {
    navCta: "Ön görüşme iste",
    hero: {
      eyebrow: "Antalya'da uluslararası sağlık seyahati koordinasyonu",
      title: "Sağlığınız için doğru sorularla başlayan planlı bir yolculuk.",
      body: "Antalya VIP Tourism; yetkili sağlık kuruluşlarıyla randevu, özel transfer, konaklama ve seyahat lojistiğini koordine eder. Tıbbi değerlendirme, tedavi kararı ve klinik takip yalnızca ilgili hekim ve sağlık kuruluşu tarafından yürütülür.",
      primary: "Koordinasyon görüşmesi iste",
      secondary: "Süreç nasıl işliyor?",
      note: "Rolü açık · Planı yazılı · Sağlık kuruluşu belli · Kişisel veriye saygılı",
      imageAlt: "Antalya'da Akdeniz manzaralı sakin özel görüşme salonu"
    },
    principles: [
      { title: "Kimin ne yaptığı açık", body: "Sağlık kuruluşu, hekim ve koordinasyon sorumlulukları ayrı ayrı belirtilir." },
      { title: "Tıbbi karar hekime ait", body: "Uygunluk, yöntem ve tedavi kapsamı yalnızca yetkili hekim tarafından belirlenir." },
      { title: "Plan ve kapsam yazılı", body: "Takvim, dahil olanlar, hariç olanlar ve olası değişiklikler seyahatten önce sunulur." },
      { title: "Dönüş sonrası yol belli", body: "Taburculuk bilgisi, kontrol takvimi ve klinik iletişim kanalı ayrılmadan netleşir." }
    ],
    consultation: {
      label: "İlk adım bir görüşme",
      title: "Neyi değerlendirdiğinizi anlatın.",
      body: "İlgilendiğiniz alanı seçin ve geri arama talep edin. Sağlık bilgisi istenmeden önce koordinasyon yolunu açıklayalım.",
      field: "İlgilendiğiniz alan",
      options: ["Saç ekimi", "Estetik cerrahi", "Diş tedavisi", "Cerrahi olmayan estetik", "Henüz emin değilim"],
      cta: "WhatsApp'ta devam et",
      call: "Ya da +90 530 265 57 90'ı arayın",
      note: "İlk mesajda tıbbi belge veya fotoğraf göndermeyin. Önce değerlendirecek sağlık kuruluşu ve açık rıza süreci netleşmelidir.",
      message: "Merhaba, sağlık seyahati koordinasyonu için ilk görüşme talep ediyorum. İlgilendiğim alan:"
    },
    trust: {
      eyebrow: "Daha sorumlu bir standart",
      title: "Güven, doğru bilgiyle başlar.",
      intro: "Yola çıkmadan önce sizi kimin değerlendireceğini, işlemin nerede yapılacağını, planın neleri kapsadığını ve ülkenize döndükten sonra klinik sorumluluğun kimde olduğunu bilmelisiniz. Biz bu yanıtları görünür kılar, tıbbi olmayan parçaların birlikte ilerlemesini koordine ederiz."
    },
    services: {
      eyebrow: "Koordine ettiğimiz alanlar",
      title: "Tek yolculuk. Uzmanların yönettiği bakım.",
      intro: "Biz bakımın çevresindeki seyahati koordine ederiz. Uygunluğu sağlık kuruluşu değerlendirir, tüm klinik ayrıntıları hekim belirler.",
      suitability: "Nihai uygunluk için hekim değerlendirmesi gerekir.",
      items: [
        { number: "01", title: "Saç ekimi", body: "Saç ekimi talepleri için sağlık kuruluşu randevusu, özel ulaşım, konaklama ve işlem çevresindeki programın koordinasyonu.", note: "FUE, DHI veya başka bir yönteme yalnız değerlendirme sonrası sağlık ekibi karar verir.", icon: "sparkle" },
        { number: "02", title: "Estetik cerrahi", body: "Yüz ve vücut cerrahilerinde randevu, refakatçi lojistiği ve iyileşme günlerine uygun transferleri içeren dengeli bir seyahat planı.", note: "Çevrim içi inceleme nihai ameliyat onayı değildir; plan muayene ve tetkiklerden sonra değişebilir.", icon: "user-check" },
        { number: "03", title: "Diş tedavisi", body: "İmplant, restoratif uygulamalar ve gülüş estetiği taleplerinde ziyaret sayısına göre randevu ve seyahat koordinasyonu.", note: "Diş tedavisi planı, muayene ve gerekli görüntüleme sonrasında kesinleşir.", icon: "shield" },
        { number: "04", title: "Cerrahi olmayan estetik", body: "Hekim tarafından yürütülen uygun estetik uygulamalar için şeffaf kuruluş ve ürün bilgisiyle randevu ve seyahat koordinasyonu.", note: "Endikasyon, ürün, doz ve riskler doğrudan sağlık meslek mensubuyla görüşülmelidir.", icon: "check-circle" }
      ]
    },
    roles: {
      eyebrow: "Tek iletişim noktası, iki ayrı rol",
      title: "Koordinasyon, sağlık hizmeti değildir.",
      intro: "Bu sınırın görünür kalması esastır. Biz yolculuğu düzenleriz; yetkili sağlık profesyonelleri sizi değerlendirir ve tedaviyi yürütür.",
      coordinatorTitle: "Antalya VIP Tourism koordine eder",
      coordinatorItems: ["Havalimanı, otel ve sağlık kuruluşu transferleri", "Konaklama ve refakatçi lojistiği", "Randevu ve günlük program akışı", "Planlanmışsa dil ve iletişim desteği", "Seyahat planındaki tıbbi olmayan değişiklikler"],
      medicalTitle: "Sağlık kuruluşu yürütür",
      medicalItems: ["Tanı ve tıbbi uygunluk değerlendirmesi", "Tedavi yönteminin ve kapsamının belirlenmesi", "Risk, alternatif ve iyileşme bilgisinin verilmesi", "Aydınlatılmış onam, işlem ve ilaç yönetimi", "Klinik takip ve komplikasyon yönetimi"],
      notice: "Antalya VIP Tourism bir sağlık kuruluşu değildir; tanı koymaz, tedavi yöntemi önermez ve tıbbi ya da estetik sonuç vaat etmez."
    },
    journey: {
      eyebrow: "Yolculuğunuz",
      title: "İlk görüşmeden dönüşe altı net adım.",
      intro: "Her geçişin sorumlusu bellidir; böylece her aşamada kiminle konuştuğunuzu ve sırada ne olduğunu bilirsiniz.",
      items: [
        { title: "İlk görüşme", body: "Ayrıntılı sağlık verisi istemeden seyahat beklentinizi, tercih ettiğiniz dili ve yaklaşık tarihleri öğreniriz." },
        { title: "Sağlık kuruluşunun tanıtılması", body: "Belgeler paylaşılmadan önce değerlendirmeden sorumlu sağlık kuruluşu açıkça belirtilir." },
        { title: "Onam ve belge aktarımı", body: "Yalnız gerekli bilgiler, mahremiyet ve onam süreci açıklandıktan sonra adı belirtilen kuruluşa iletilir." },
        { title: "Hekim ön değerlendirmesi", body: "Sağlık ekibi ilk görüşünü verir. Bu, nihai tanı, tedavi onayı veya sonuç garantisi değildir." },
        { title: "Yazılı plan", body: "Tıbbi ve seyahat bedelleri, kapsam, takvim ve olası değişiklikler ayrı kalemlerle sunulur." },
        { title: "Varış ve dönüş takibi", body: "Nihai plan yüz yüze muayeneyle kesinleşir. Dönüşten önce sağlık kuruluşu bakım ve iletişim talimatlarını verir." }
      ]
    },
    standards: {
      eyebrow: "Kuruluş seçimi",
      title: "Sizi bir kuruluşla tanıştırmadan önce aradıklarımız.",
      intro: "Şık bir lobi klinik kalitenin kanıtı değildir. Kuruluşun kimliği, yetkisi, hekimin sorumluluğu ve bakımın devamlılığı daha önemlidir.",
      items: ["Doğrulanabilir ticari kimlik ve fiziksel adres", "İlgili uluslararası sağlık turizmi yetkisi", "Adı ve uzmanlığı açıkça belirtilen hekim", "Yazılı onam, risk ve alternatifler süreci", "Şeffaf klinik ve seyahat fiyatlandırması", "Belgeli taburculuk ve takip planı"],
      cardLabel: "Karar vermeden önce",
      cardTitle: "Bütün tabloyu isteyin.",
      cardBody: "Seçenekleri; geri sayım, baskı veya garantili sonuç dili olmadan sakin biçimde karşılaştırabilmelisiniz.",
      cardItems: ["Her aşamayı kim uygulayacak?", "Muayene sonrası neler değişebilir?", "Hangi bedeller planın dışında?", "Dönüşte klinik muhatap kim?"]
    },
    scope: {
      eyebrow: "Şeffaf kapsam",
      title: "Belirsiz bir 'her şey dahil' vaadi yok.",
      intro: "Sağlık hizmeti ve seyahat hizmetleri ayrı kalemlerde gösterilmelidir. Yazılı planınız nelerin dahil, nelerin koşula bağlı olduğunu açıkça belirtmelidir.",
      includedTitle: "Seyahat koordinasyonuna dahil edilebilir",
      included: ["Özel havalimanı ve şehir içi transferler", "Konaklama koordinasyonu", "Randevu ve program yönetimi", "Refakatçi ve dil lojistiği", "Hekim önerisine göre dönüş planlaması"],
      separateTitle: "Her zaman ayrıca teyit edilir",
      separate: ["Sağlık kuruluşunun klinik hizmet bedeli", "Tetkik, ilaç ve ek işlemler", "Uçuş, sigorta ve vize giderleri", "Yüz yüze muayene sonrası değişiklikler", "Beklenmedik veya acil sağlık hizmetleri"],
      note: "Kesin kapsam yazılı teklifte tanımlanır. Uçuşlar, ilgili sağlık kuruluşu önerilen takvimi teyit ettikten sonra alınmalıdır."
    },
    faq: {
      eyebrow: "Sık sorulanlar",
      title: "Yola çıkmadan sorulması gerekenler.",
      intro: "Açık yanıtlar, bilinçli kararın bir parçasıdır.",
      items: [
        { question: "Antalya VIP Tourism tedavi hizmeti sunuyor mu?", answer: "Hayır. Antalya VIP Tourism bir sağlık kuruluşu değildir. Tanı, tedavi ve klinik takip; kimliği açıklanan yetkili sağlık kuruluşu ve onun sağlık meslek mensupları tarafından yürütülür." },
        { question: "Benim için hangi yöntem uygun?", answer: "Buna yalnızca ilgili hekim; tıbbi öykünüzü, muayene bulgularını ve gerekli tetkikleri değerlendirdikten sonra karar verebilir. Koordinasyon ekibimiz yöntem önermez." },
        { question: "Çevrim içi plan kesin midir?", answer: "Hayır. Çevrim içi inceleme ön bilgi sağlar. Plan ve fiyat yüz yüze muayene veya ek tetkikler sonrasında değişebilir; her değişiklik işlemden önce açıklanmalı ve onayınıza sunulmalıdır." },
        { question: "Sonuç garantisi verilebilir mi?", answer: "Hayır. Tıbbi ve estetik sonuçlar kişiye, işleme ve iyileşmeye göre değişir. Sorumlu bir sağlık kuruluşu belirli bir sonucu garanti etmez." },
        { question: "Antalya'da ne kadar kalmalıyım?", answer: "Güvenli süre işleme ve hekimin önerisine göre değişir. Uçuşunuzu almadan önce klinik takvimi teyit edin." },
        { question: "Ülkeme döndükten sonra ne olur?", answer: "Sağlık kuruluşu yazılı bakım ve kontrol talimatı vermelidir. Koordinasyon hattı acil sağlık hizmeti değildir; acil durumda bulunduğunuz ülkedeki acil yardım hizmetine başvurun." }
      ]
    },
    final: {
      eyebrow: "İlk adımınız",
      title: "Karar vermeden önce bütün tabloyu görün.",
      body: "İlgilendiğiniz alanı paylaşın. Hangi bilginin gerektiğini, değerlendirmeyi hangi sağlık kuruluşunun yapacağını ve seyahat aşamalarını açıkça anlatalım.",
      cta: "Koordinasyon görüşmesi iste",
      secondary: "Bizi arayın",
      notice: "Bu kanal tıbbi tanı veya acil yardım kanalı değildir. İlk adımda sağlık belgesi istenmez."
    },
    footer: {
      tagline: "Antalya'da özel seyahat ve concierge koordinasyonu.",
      explore: "Keşfedin",
      home: "Ana sayfa",
      services: "Alanlar",
      process: "Süreç",
      contact: "İletişim",
      legal: "Bilgi",
      privacy: "Gizlilik",
      imprint: "Künye",
      disclaimer: "Antalya VIP Tourism bir sağlık kuruluşu değildir. Tüm tıbbi değerlendirme, tedavi ve klinik takip, kimliği açıklanan yetkili sağlık kuruluşu ve ilgili sağlık meslek mensuplarının sorumluluğundadır."
    }
  },
  de: {
    navCta: "Erstgespräch anfragen",
    hero: {
      eyebrow: "Koordination internationaler Gesundheitsreisen · Antalya",
      title: "Eine durchdachte Reise rund um Ihre Gesundheit.",
      body: "Antalya VIP Tourism koordiniert Termine bei autorisierten Gesundheitseinrichtungen, private Transfers, Unterkunft und Reiselogistik. Medizinische Beurteilung, Behandlungsentscheidung und klinische Nachsorge liegen ausschließlich beim behandelnden Arzt und der Gesundheitseinrichtung.",
      primary: "Koordinationsgespräch anfragen",
      secondary: "So funktioniert es",
      note: "Klare Rollen · Schriftlicher Plan · Benannte Einrichtung · Respekt vor Ihren Daten",
      imageAlt: "Ruhige private Beratungslounge mit Blick auf das Mittelmeer in Antalya"
    },
    principles: [
      { title: "Jede Rolle ist klar", body: "Die Aufgaben von Einrichtung, Arzt und Koordination werden getrennt erläutert." },
      { title: "Medizin bleibt Arztsache", body: "Eignung, Methode und Umfang bestimmt ausschließlich ein autorisierter Arzt." },
      { title: "Der Plan ist schriftlich", body: "Zeitplan, Leistungen, Ausschlüsse und mögliche Änderungen liegen vor der Reise vor." },
      { title: "Nachsorge ist geklärt", body: "Entlassungshinweise, Kontrollen und klinischer Kontakt stehen vor der Abreise fest." }
    ],
    consultation: {
      label: "Beginnen Sie mit einem Gespräch",
      title: "Wofür interessieren Sie sich?",
      body: "Wählen Sie einen Bereich und bitten Sie um Rückruf. Wir erklären den Ablauf, bevor medizinische Informationen angefragt werden.",
      field: "Interessensbereich",
      options: ["Haartransplantation", "Ästhetische Chirurgie", "Zahnmedizin", "Nichtoperative Ästhetik", "Ich bin noch unsicher"],
      cta: "Über WhatsApp fortfahren",
      call: "Oder +90 530 265 57 90 anrufen",
      note: "Bitte senden Sie in der ersten Nachricht keine Befunde oder Fotos. Zuerst müssen die empfangende Gesundheitseinrichtung und das Einwilligungsverfahren geklärt sein.",
      message: "Hallo, ich wünsche ein Erstgespräch zur Koordination einer Gesundheitsreise. Interessensbereich:"
    },
    trust: {
      eyebrow: "Ein verantwortungsvollerer Standard",
      title: "Vertrauen beginnt mit den richtigen Informationen.",
      intro: "Vor der Reise sollten Sie wissen, wer Sie beurteilt, wo die Leistung stattfindet, was der vorläufige Plan umfasst und wer nach Ihrer Rückkehr verantwortlich bleibt. Wir machen diese Antworten sichtbar und koordinieren die nichtmedizinischen Bestandteile."
    },
    services: {
      eyebrow: "Bereiche, die wir koordinieren",
      title: "Eine Reise. Fachärztlich geführte Versorgung.",
      intro: "Wir koordinieren die Reise rund um Ihre Versorgung. Die Einrichtung prüft die Eignung; der Arzt legt alle klinischen Details fest.",
      suitability: "Die endgültige Eignung erfordert eine ärztliche Beurteilung.",
      items: [
        { number: "01", title: "Haartransplantation", body: "Koordination von Anfragen, Terminen, Privattransfer, Unterkunft und Zeitplan rund um die Behandlung.", note: "Über FUE, DHI oder eine andere Methode entscheidet das Behandlungsteam erst nach der Beurteilung.", icon: "sparkle" },
        { number: "02", title: "Ästhetische Chirurgie", body: "Ein angemessen getakteter Reiseplan für Gesichts- und Körpereingriffe, einschließlich Begleitperson und Transfers an Erholungstagen.", note: "Eine Online-Prüfung ist keine endgültige Operationsfreigabe; der Plan kann sich nach Untersuchung und Tests ändern.", icon: "user-check" },
        { number: "03", title: "Zahnmedizin", body: "Koordination von Implantat-, Restaurations- und ästhetischen Anfragen mit einer Reiseplanung nach Zahl der Behandlungstermine.", note: "Der Behandlungsplan wird nach Untersuchung und erforderlicher Bildgebung bestätigt.", icon: "shield" },
        { number: "04", title: "Nichtoperative Ästhetik", body: "Termin- und Reisekoordination für geeignete ärztlich durchgeführte Anwendungen mit transparenter Anbieter- und Produktinformation.", note: "Indikation, Produkt, Dosis und Risiken müssen direkt mit dem medizinischen Fachpersonal besprochen werden.", icon: "check-circle" }
      ]
    },
    roles: {
      eyebrow: "Ein Ansprechpartner, zwei getrennte Rollen",
      title: "Koordination ist keine medizinische Versorgung.",
      intro: "Diese Grenze muss sichtbar bleiben. Wir organisieren die Reise; autorisierte Fachkräfte beurteilen und behandeln Sie.",
      coordinatorTitle: "Antalya VIP Tourism koordiniert",
      coordinatorItems: ["Transfers zwischen Flughafen, Hotel und Einrichtung", "Unterkunft und Logistik für Begleitpersonen", "Termine und täglicher Programmablauf", "Vereinbarte Sprach- und Kommunikationshilfe", "Nichtmedizinische Änderungen des Reiseplans"],
      medicalTitle: "Die Gesundheitseinrichtung verantwortet",
      medicalItems: ["Diagnose und medizinische Eignung", "Wahl und Umfang der Behandlung", "Risiken, Alternativen und Genesungsinformationen", "Aufklärung, Eingriff und Medikation", "Klinische Nachsorge und Komplikationsmanagement"],
      notice: "Antalya VIP Tourism ist keine Gesundheitseinrichtung, stellt keine Diagnose, empfiehlt keine Behandlungsmethode und verspricht kein medizinisches oder ästhetisches Ergebnis."
    },
    journey: {
      eyebrow: "Ihre Reise",
      title: "Sechs klare Schritte vom Erstgespräch bis zur Rückkehr.",
      intro: "Jede Übergabe ist definiert, damit Sie jederzeit wissen, mit wem Sie sprechen und was als Nächstes geschieht.",
      items: [
        { title: "Erstgespräch", body: "Wir klären Reiseerwartungen, Sprache und ungefähre Daten, ohne detaillierte Gesundheitsdaten anzufordern." },
        { title: "Vorstellung der Einrichtung", body: "Die für die Beurteilung verantwortliche Gesundheitseinrichtung wird vor jeder Datenübermittlung benannt." },
        { title: "Einwilligung und Unterlagen", body: "Nur erforderliche Informationen werden nach geklärtem Datenschutz und Einwilligung an die benannte Einrichtung übermittelt." },
        { title: "Ärztliche Vorbeurteilung", body: "Das medizinische Team gibt eine erste Einschätzung. Sie ist keine endgültige Diagnose, Freigabe oder Ergebnisgarantie." },
        { title: "Schriftlicher Plan", body: "Medizinische und Reiseleistungen, Umfang, Zeitplan und mögliche Änderungen werden getrennt ausgewiesen." },
        { title: "Ankunft und Nachsorge", body: "Der endgültige Plan folgt nach persönlicher Untersuchung. Vor der Rückreise erhalten Sie Nachsorge- und Kontaktangaben." }
      ]
    },
    standards: {
      eyebrow: "Auswahl der Einrichtung",
      title: "Was wir vor einer Vorstellung prüfen.",
      intro: "Eine elegante Lobby beweist keine klinische Qualität. Identität, Autorisierung, ärztliche Verantwortung und Versorgungskontinuität zählen mehr.",
      items: ["Überprüfbare Rechtspersönlichkeit und Adresse", "Relevante Autorisierung für internationale Gesundheitsreisen", "Namentlich genannter Arzt mit klarer Fachrichtung", "Schriftliche Aufklärung zu Einwilligung, Risiken und Alternativen", "Transparente medizinische und nichtmedizinische Kosten", "Dokumentierte Entlassungs- und Nachsorgewege"],
      cardLabel: "Vor Ihrer Entscheidung",
      cardTitle: "Verlangen Sie das vollständige Bild.",
      cardBody: "Sie sollten Optionen in Ruhe vergleichen können – ohne Countdown, Druck oder garantierte Ergebnisse.",
      cardItems: ["Wer führt welchen Schritt durch?", "Was kann sich nach der Untersuchung ändern?", "Welche Kosten liegen außerhalb des Plans?", "Wer ist nach der Rückkehr klinisch zuständig?"]
    },
    scope: {
      eyebrow: "Transparenter Umfang",
      title: "Kein vages „Alles inklusive“.",
      intro: "Medizinische und Reiseleistungen sollten getrennt ausgewiesen werden. Der schriftliche Plan muss klar sagen, was enthalten und was bedingt ist.",
      includedTitle: "Die Reisekoordination kann umfassen",
      included: ["Private Flughafen- und Lokaltransfers", "Koordination der Unterkunft", "Termin- und Programmmanagement", "Begleitpersonen- und Sprachlogistik", "Rückreiseplanung nach ärztlicher Empfehlung"],
      separateTitle: "Immer separat zu bestätigen",
      separate: ["Medizinische Gebühren der Einrichtung", "Tests, Medikamente und Zusatzverfahren", "Flüge, Versicherung und Visum", "Änderungen nach persönlicher Untersuchung", "Unerwartete oder dringende medizinische Versorgung"],
      note: "Der genaue Umfang steht im schriftlichen Angebot. Buchen Sie Flüge erst, nachdem die behandelnde Einrichtung den empfohlenen Zeitplan bestätigt hat."
    },
    faq: {
      eyebrow: "Häufig gefragt",
      title: "Wichtige Fragen vor der Reise.",
      intro: "Klare Antworten gehören zu einer informierten Entscheidung.",
      items: [
        { question: "Bietet Antalya VIP Tourism Behandlungen an?", answer: "Nein. Antalya VIP Tourism ist keine Gesundheitseinrichtung. Diagnose, Behandlung und klinische Nachsorge erfolgen durch die benannte autorisierte Einrichtung und deren medizinisches Fachpersonal." },
        { question: "Welche Methode passt zu mir?", answer: "Das kann nur der zuständige Arzt nach Prüfung Ihrer Vorgeschichte, Untersuchung und notwendiger Tests entscheiden. Unser Koordinationsteam empfiehlt keine klinische Methode." },
        { question: "Ist ein Online-Plan endgültig?", answer: "Nein. Eine Online-Prüfung ist vorläufig. Plan und Preis können sich nach persönlicher Untersuchung oder weiteren Tests ändern; Änderungen müssen vor der Behandlung erläutert und genehmigt werden." },
        { question: "Kann ein Ergebnis garantiert werden?", answer: "Nein. Medizinische und ästhetische Ergebnisse unterscheiden sich je nach Person, Eingriff und Genesung. Ein verantwortungsvoller Anbieter garantiert kein bestimmtes Ergebnis." },
        { question: "Wie lange sollte ich in Antalya bleiben?", answer: "Die sichere Dauer hängt vom Eingriff und der ärztlichen Empfehlung ab. Bestätigen Sie den klinischen Zeitplan vor der Flugbuchung." },
        { question: "Was geschieht nach meiner Rückkehr?", answer: "Die Einrichtung sollte schriftliche Nachsorge- und Kontrollhinweise geben. Die Koordinationsnummer ist kein medizinischer Notdienst; nutzen Sie bei Dringlichkeit den lokalen Rettungsdienst." }
      ]
    },
    final: {
      eyebrow: "Ihr erster Schritt",
      title: "Sehen Sie das ganze Bild, bevor Sie entscheiden.",
      body: "Nennen Sie uns den Bereich. Wir erklären, welche Informationen benötigt werden, welche Einrichtung beurteilt und wie die Reisephasen zusammenpassen.",
      cta: "Koordinationsgespräch anfragen",
      secondary: "Rufen Sie uns an",
      notice: "Dies ist kein Diagnose- oder Notfallkanal. Im ersten Schritt werden keine medizinischen Unterlagen angefordert."
    },
    footer: {
      tagline: "Private Reise- und Concierge-Koordination in Antalya.",
      explore: "Entdecken",
      home: "Startseite",
      services: "Bereiche",
      process: "Ablauf",
      contact: "Kontakt",
      legal: "Information",
      privacy: "Datenschutz",
      imprint: "Impressum",
      disclaimer: "Antalya VIP Tourism ist keine Gesundheitseinrichtung. Medizinische Beurteilung, Behandlung und Nachsorge liegen bei der benannten autorisierten Einrichtung und dem behandelnden Fachpersonal."
    }
  },
  ru: {
    navCta: "Запросить консультацию",
    hero: {
      eyebrow: "Координация международных медицинских поездок · Анталья",
      title: "Продуманная поездка, построенная вокруг вашего здоровья.",
      body: "Antalya VIP Tourism координирует запись в уполномоченные медицинские учреждения, частные трансферы, проживание и логистику. Медицинская оценка, решение о лечении и клиническое наблюдение остаются исключительной ответственностью врача и учреждения.",
      primary: "Запросить беседу с координатором",
      secondary: "Как всё проходит",
      note: "Чёткие роли · Письменный план · Названное учреждение · Уважение к вашим данным",
      imageAlt: "Спокойная частная переговорная с видом на Средиземное море в Анталье"
    },
    principles: [
      { title: "Роли определены", body: "Обязанности учреждения, врача и координатора объясняются отдельно." },
      { title: "Медицинские решения — врачу", body: "Показания, метод и объём лечения определяет только уполномоченный врач." },
      { title: "План оформлен письменно", body: "Сроки, включённые услуги, исключения и возможные изменения известны до поездки." },
      { title: "Наблюдение согласовано", body: "Рекомендации, контроль и клинический контакт уточняются до отъезда." }
    ],
    consultation: {
      label: "Начните с разговора",
      title: "Расскажите, что вы рассматриваете.",
      body: "Выберите направление и запросите звонок. Сначала мы объясним процесс, не запрашивая медицинские данные.",
      field: "Интересующее направление",
      options: ["Трансплантация волос", "Эстетическая хирургия", "Стоматология", "Безоперационная эстетика", "Я пока не уверен(а)"],
      cta: "Продолжить в WhatsApp",
      call: "Или позвонить +90 530 265 57 90",
      note: "Не отправляйте медицинские документы или фотографии в первом сообщении. Сначала должны быть определены принимающее учреждение и порядок согласия.",
      message: "Здравствуйте, я хотел(а) бы запросить первичную беседу по координации медицинской поездки. Направление:"
    },
    trust: {
      eyebrow: "Более ответственный стандарт",
      title: "Доверие начинается с правильной информации.",
      intro: "До поездки важно знать, кто проводит оценку, где оказывается услуга, что входит в предварительный план и кто отвечает за наблюдение после возвращения. Мы делаем эти ответы видимыми и координируем немедицинские части поездки."
    },
    services: {
      eyebrow: "Что мы координируем",
      title: "Одна поездка. Помощь под руководством специалистов.",
      intro: "Мы организуем поездку вокруг медицинской помощи. Учреждение оценивает показания, а врач определяет все клинические детали.",
      suitability: "Окончательные показания определяет врач.",
      items: [
        { number: "01", title: "Трансплантация волос", body: "Координация обращений, записи, частного транспорта, проживания и графика вокруг процедуры.", note: "FUE, DHI или иной метод выбирает медицинская команда после оценки.", icon: "sparkle" },
        { number: "02", title: "Эстетическая хирургия", body: "Продуманный план поездки для операций на лице и теле, включая логистику сопровождающего и трансферы в дни восстановления.", note: "Онлайн-оценка не является окончательным допуском; план может измениться после осмотра и анализов.", icon: "user-check" },
        { number: "03", title: "Стоматология", body: "Координация запросов по имплантации, реставрации и эстетике улыбки с учётом числа визитов.", note: "План подтверждается после осмотра и необходимой диагностики.", icon: "shield" },
        { number: "04", title: "Безоперационная эстетика", body: "Запись и логистика для подходящих врачебных процедур с прозрачной информацией об учреждении и препарате.", note: "Показания, препарат, дозу и риски следует обсуждать непосредственно с медицинским специалистом.", icon: "check-circle" }
      ]
    },
    roles: {
      eyebrow: "Один контакт, две разные роли",
      title: "Координация — не медицинская помощь.",
      intro: "Эта граница должна быть видимой. Мы организуем поездку; уполномоченные специалисты оценивают и лечат.",
      coordinatorTitle: "Antalya VIP Tourism координирует",
      coordinatorItems: ["Трансферы аэропорт — отель — учреждение", "Проживание и логистику сопровождающего", "Записи и ежедневный график", "Согласованную языковую поддержку", "Немедицинские изменения плана поездки"],
      medicalTitle: "Медицинское учреждение отвечает за",
      medicalItems: ["Диагностику и оценку показаний", "Выбор метода и объёма лечения", "Информацию о рисках, альтернативах и восстановлении", "Информированное согласие, процедуры и лекарства", "Клиническое наблюдение и осложнения"],
      notice: "Antalya VIP Tourism не является медицинским учреждением, не ставит диагнозы, не рекомендует метод лечения и не обещает медицинский или эстетический результат."
    },
    journey: {
      eyebrow: "Ваша поездка",
      title: "Шесть понятных шагов от первого звонка до возвращения.",
      intro: "Каждая передача ответственности определена, чтобы вы всегда знали, с кем говорите и что будет дальше.",
      items: [
        { title: "Первичная беседа", body: "Мы уточняем ожидания, язык и примерные даты, не запрашивая подробных медицинских данных." },
        { title: "Знакомство с учреждением", body: "До передачи документов называется учреждение, ответственное за оценку." },
        { title: "Согласие и документы", body: "Только необходимые сведения передаются названному учреждению после разъяснения конфиденциальности и согласия." },
        { title: "Предварительная оценка врача", body: "Команда даёт первичное мнение. Это не окончательный диагноз, допуск или гарантия результата." },
        { title: "Письменный план", body: "Медицинские и дорожные расходы, объём, сроки и возможные изменения указываются отдельно." },
        { title: "Прибытие и наблюдение", body: "Окончательный план формируется после очного осмотра. До отъезда учреждение выдаёт рекомендации и контакты." }
      ]
    },
    standards: {
      eyebrow: "Выбор учреждения",
      title: "Что важно до знакомства с поставщиком.",
      intro: "Красивый холл не доказывает клиническое качество. Важнее личность учреждения, полномочия, ответственность врача и непрерывность помощи.",
      items: ["Проверяемое юридическое лицо и адрес", "Необходимое разрешение для международного медицинского туризма", "Названный врач и чётко указанная специальность", "Письменный порядок согласия, рисков и альтернатив", "Прозрачные медицинские и дорожные расходы", "Документированный план выписки и наблюдения"],
      cardLabel: "До принятия решения",
      cardTitle: "Запросите полную картину.",
      cardBody: "Вы должны спокойно сравнить варианты — без таймеров, давления и обещаний гарантированного результата.",
      cardItems: ["Кто выполняет каждый этап?", "Что может измениться после осмотра?", "Какие расходы вне плана?", "Кто остаётся клиническим контактом дома?"]
    },
    scope: {
      eyebrow: "Прозрачный объём",
      title: "Без расплывчатого «всё включено».",
      intro: "Медицинские и дорожные услуги должны быть указаны отдельно. Письменный план ясно показывает, что включено, а что зависит от условий.",
      includedTitle: "Координация поездки может включать",
      included: ["Частные трансферы из аэропорта и по городу", "Координацию проживания", "Управление записями и графиком", "Логистику сопровождающего и языка", "Планирование возвращения по совету врача"],
      separateTitle: "Всегда подтверждается отдельно",
      separate: ["Медицинские сборы учреждения", "Анализы, лекарства и дополнительные процедуры", "Перелёты, страхование и виза", "Изменения после очного осмотра", "Неожиданная или экстренная помощь"],
      note: "Точный объём определяется письменным предложением. Покупайте билеты после подтверждения рекомендуемого графика медицинским учреждением."
    },
    faq: {
      eyebrow: "Частые вопросы",
      title: "Что стоит спросить до поездки.",
      intro: "Ясные ответы — часть осознанного решения.",
      items: [
        { question: "Antalya VIP Tourism оказывает лечение?", answer: "Нет. Antalya VIP Tourism не является медицинским учреждением. Диагностика, лечение и наблюдение выполняются названным уполномоченным учреждением и его специалистами." },
        { question: "Какой метод подходит мне?", answer: "Это может определить только врач после изучения анамнеза, осмотра и необходимых исследований. Координаторы не рекомендуют клинический метод." },
        { question: "Онлайн-план окончательный?", answer: "Нет. Онлайн-оценка предварительна. План и цена могут измениться после очного осмотра или исследований; изменения должны быть объяснены и согласованы до лечения." },
        { question: "Можно гарантировать результат?", answer: "Нет. Медицинские и эстетические результаты зависят от человека, процедуры и восстановления. Ответственный поставщик не гарантирует конкретный результат." },
        { question: "Сколько оставаться в Анталье?", answer: "Безопасный срок зависит от процедуры и совета врача. Подтвердите клинический график до покупки билетов." },
        { question: "Что будет после возвращения?", answer: "Учреждение должно выдать письменные рекомендации и график контроля. Координационная линия не является экстренной службой; при срочной ситуации обращайтесь в местную неотложную помощь." }
      ]
    },
    final: {
      eyebrow: "Ваш первый шаг",
      title: "Увидьте полную картину до решения.",
      body: "Назовите интересующее направление. Мы объясним, какая информация нужна, какое учреждение проведёт оценку и как связаны этапы поездки.",
      cta: "Запросить беседу с координатором",
      secondary: "Позвонить нам",
      notice: "Это не канал диагностики или экстренной помощи. На первом этапе медицинские документы не запрашиваются."
    },
    footer: {
      tagline: "Частная координация поездок и консьерж-сервис в Анталье.",
      explore: "Разделы",
      home: "Главная",
      services: "Направления",
      process: "Процесс",
      contact: "Контакты",
      legal: "Информация",
      privacy: "Конфиденциальность",
      imprint: "Правовая информация",
      disclaimer: "Antalya VIP Tourism не является медицинским учреждением. Медицинская оценка, лечение и наблюдение являются ответственностью названного уполномоченного учреждения и лечащих специалистов."
    }
  }
};
const supportedHealthLanguages = /* @__PURE__ */ new Set(["en", "de", "tr", "ru"]);
function HealthPage() {
  const { language } = useLanguage();
  const copyLanguage = supportedHealthLanguages.has(language) ? language : "en";
  const copy2 = healthCopy[copyLanguage];
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const prefix = ["de", "tr", "ru"].includes(copyLanguage) ? "/" + copyLanguage : "";
  const homeHref = prefix + "/";
  const privacyHref = copyLanguage === "de" ? "/de/datenschutz/" : copyLanguage === "tr" ? "/tr/gizlilik/" : copyLanguage === "ru" ? "/ru/privacy/" : "/privacy/";
  const imprintHref = copyLanguage === "de" ? "/de/impressum/" : copyLanguage === "tr" ? "/tr/kunye/" : copyLanguage === "ru" ? "/ru/impressum/" : "/impressum.html";
  const whatsappHref = "https://wa.me/905302655790?text=" + encodeURIComponent(
    copy2.consultation.message + " " + copy2.consultation.options[selectedServiceIndex]
  );
  return /* @__PURE__ */ jsxs("div", { className: "health-page", children: [
    /* @__PURE__ */ jsx(
      Header,
      {
        homeHref,
        compact: true,
        ctaHref: "#health-consultation",
        ctaLabel: copy2.navCta
      }
    ),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "health-hero", id: "top", children: [
        /* @__PURE__ */ jsxs("picture", { className: "health-hero-media", children: [
          /* @__PURE__ */ jsx("source", { srcSet: "/assets/optimized/health-coordination-hero.webp", type: "image/webp" }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/assets/optimized/health-coordination-hero.jpg",
              alt: copy2.hero.imageAlt,
              width: "1672",
              height: "941",
              fetchPriority: "high"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "health-hero-overlay" }),
        /* @__PURE__ */ jsxs("div", { className: "health-hero-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "health-hero-copy", children: [
            /* @__PURE__ */ jsxs("div", { className: "eyebrow light", children: [
              /* @__PURE__ */ jsx("span", {}),
              /* @__PURE__ */ jsx("p", { children: copy2.hero.eyebrow })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "health-brand-line", children: [
              /* @__PURE__ */ jsx("span", { children: "Health Journey" }),
              /* @__PURE__ */ jsx("i", {}),
              /* @__PURE__ */ jsx("strong", { children: "Antalya VIP Tourism" })
            ] }),
            /* @__PURE__ */ jsx("h1", { children: copy2.hero.title }),
            /* @__PURE__ */ jsx("p", { children: copy2.hero.body }),
            /* @__PURE__ */ jsxs("div", { className: "health-hero-actions", children: [
              /* @__PURE__ */ jsxs("a", { className: "button button-gold", href: "#health-consultation", children: [
                /* @__PURE__ */ jsx("span", { children: copy2.hero.primary }),
                /* @__PURE__ */ jsx(Icon, { name: "arrow-right", className: "icon" })
              ] }),
              /* @__PURE__ */ jsx("a", { className: "button health-button-ghost", href: "#health-process", children: copy2.hero.secondary })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "health-hero-note", children: [
              /* @__PURE__ */ jsx(Icon, { name: "shield", className: "icon" }),
              /* @__PURE__ */ jsx("span", { children: copy2.hero.note })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("aside", { className: "health-consultation-card", id: "health-consultation", children: [
            /* @__PURE__ */ jsx("span", { className: "health-card-label", children: copy2.consultation.label }),
            /* @__PURE__ */ jsx("h2", { children: copy2.consultation.title }),
            /* @__PURE__ */ jsx("p", { children: copy2.consultation.body }),
            /* @__PURE__ */ jsx("label", { htmlFor: "health-service", children: copy2.consultation.field }),
            /* @__PURE__ */ jsxs("div", { className: "health-select-wrap", children: [
              /* @__PURE__ */ jsx(
                "select",
                {
                  id: "health-service",
                  value: selectedServiceIndex,
                  onChange: (event) => setSelectedServiceIndex(Number(event.target.value)),
                  children: copy2.consultation.options.map((option, index) => /* @__PURE__ */ jsx("option", { value: index, children: option }, option))
                }
              ),
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "⌄" })
            ] }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                className: "health-consultation-submit",
                href: whatsappHref,
                target: "_blank",
                rel: "noreferrer",
                children: [
                  /* @__PURE__ */ jsx(Icon, { name: "whatsapp", className: "whatsapp-icon" }),
                  /* @__PURE__ */ jsx("span", { children: copy2.consultation.cta }),
                  /* @__PURE__ */ jsx(Icon, { name: "arrow-up-right", className: "icon" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("a", { className: "health-call-link", href: "tel:+905302655790", children: copy2.consultation.call }),
            /* @__PURE__ */ jsx("small", { children: copy2.consultation.note })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "health-principle-bar", "aria-label": copy2.trust.title, children: copy2.principles.map((principle, index) => /* @__PURE__ */ jsxs("article", { children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "0",
          index + 1
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { children: principle.title }),
          /* @__PURE__ */ jsx("p", { children: principle.body })
        ] })
      ] }, principle.title)) }),
      /* @__PURE__ */ jsxs("section", { className: "health-trust section", children: [
        /* @__PURE__ */ jsxs("div", { className: "health-section-intro", children: [
          /* @__PURE__ */ jsxs("div", { className: "eyebrow", children: [
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("p", { children: copy2.trust.eyebrow })
          ] }),
          /* @__PURE__ */ jsx("h2", { children: copy2.trust.title }),
          /* @__PURE__ */ jsx("p", { children: copy2.trust.intro })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "health-trust-visual", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "01" }),
            /* @__PURE__ */ jsx("i", {}),
            /* @__PURE__ */ jsx("strong", { children: "Role" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "02" }),
            /* @__PURE__ */ jsx("i", {}),
            /* @__PURE__ */ jsx("strong", { children: "Plan" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "03" }),
            /* @__PURE__ */ jsx("i", {}),
            /* @__PURE__ */ jsx("strong", { children: "Care" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "health-services section", id: "health-services", children: [
        /* @__PURE__ */ jsxs("div", { className: "section-heading", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "eyebrow", children: [
              /* @__PURE__ */ jsx("span", {}),
              /* @__PURE__ */ jsx("p", { children: copy2.services.eyebrow })
            ] }),
            /* @__PURE__ */ jsx("h2", { children: copy2.services.title })
          ] }),
          /* @__PURE__ */ jsx("p", { children: copy2.services.intro })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "health-service-grid", children: copy2.services.items.map((service) => /* @__PURE__ */ jsxs("article", { className: "health-service-card", children: [
          /* @__PURE__ */ jsxs("div", { className: "health-service-top", children: [
            /* @__PURE__ */ jsx("span", { children: service.number }),
            /* @__PURE__ */ jsx(Icon, { name: service.icon, className: "icon" })
          ] }),
          /* @__PURE__ */ jsx("h3", { children: service.title }),
          /* @__PURE__ */ jsx("p", { children: service.body }),
          /* @__PURE__ */ jsxs("div", { className: "health-service-note", children: [
            /* @__PURE__ */ jsx(Icon, { name: "check-circle", className: "icon" }),
            /* @__PURE__ */ jsx("span", { children: service.note })
          ] })
        ] }, service.number)) }),
        /* @__PURE__ */ jsxs("p", { className: "health-suitability", children: [
          /* @__PURE__ */ jsx(Icon, { name: "shield", className: "icon" }),
          copy2.services.suitability
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "health-roles section-dark", children: /* @__PURE__ */ jsxs("div", { className: "section health-roles-inner", children: [
        /* @__PURE__ */ jsxs("div", { className: "health-section-intro health-section-intro-light", children: [
          /* @__PURE__ */ jsxs("div", { className: "eyebrow light", children: [
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("p", { children: copy2.roles.eyebrow })
          ] }),
          /* @__PURE__ */ jsx("h2", { children: copy2.roles.title }),
          /* @__PURE__ */ jsx("p", { children: copy2.roles.intro })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "health-role-grid", children: [
          /* @__PURE__ */ jsxs("article", { children: [
            /* @__PURE__ */ jsx("div", { className: "health-role-icon", children: /* @__PURE__ */ jsx(Icon, { name: "message", className: "icon" }) }),
            /* @__PURE__ */ jsx("h3", { children: copy2.roles.coordinatorTitle }),
            /* @__PURE__ */ jsx("ul", { children: copy2.roles.coordinatorItems.map((item) => /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(Icon, { name: "check", className: "icon" }),
              /* @__PURE__ */ jsx("span", { children: item })
            ] }, item)) })
          ] }),
          /* @__PURE__ */ jsxs("article", { className: "health-role-medical", children: [
            /* @__PURE__ */ jsx("div", { className: "health-role-icon", children: /* @__PURE__ */ jsx(Icon, { name: "user-check", className: "icon" }) }),
            /* @__PURE__ */ jsx("h3", { children: copy2.roles.medicalTitle }),
            /* @__PURE__ */ jsx("ul", { children: copy2.roles.medicalItems.map((item) => /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(Icon, { name: "check", className: "icon" }),
              /* @__PURE__ */ jsx("span", { children: item })
            ] }, item)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "health-role-notice", children: [
          /* @__PURE__ */ jsx(Icon, { name: "shield", className: "icon" }),
          /* @__PURE__ */ jsx("p", { children: copy2.roles.notice })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "health-process section", id: "health-process", children: [
        /* @__PURE__ */ jsxs("div", { className: "section-heading", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "eyebrow", children: [
              /* @__PURE__ */ jsx("span", {}),
              /* @__PURE__ */ jsx("p", { children: copy2.journey.eyebrow })
            ] }),
            /* @__PURE__ */ jsx("h2", { children: copy2.journey.title })
          ] }),
          /* @__PURE__ */ jsx("p", { children: copy2.journey.intro })
        ] }),
        /* @__PURE__ */ jsx("ol", { className: "health-process-list", children: copy2.journey.items.map((step, index) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("div", { className: "health-process-number", children: String(index + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { children: step.title }),
            /* @__PURE__ */ jsx("p", { children: step.body })
          ] })
        ] }, step.title)) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "health-standards", children: /* @__PURE__ */ jsxs("div", { className: "section health-standards-grid", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "eyebrow", children: [
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("p", { children: copy2.standards.eyebrow })
          ] }),
          /* @__PURE__ */ jsx("h2", { children: copy2.standards.title }),
          /* @__PURE__ */ jsx("p", { children: copy2.standards.intro }),
          /* @__PURE__ */ jsx("ul", { className: "health-check-list", children: copy2.standards.items.map((item) => /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Icon, { name: "check", className: "icon" }),
            /* @__PURE__ */ jsx("span", { children: item })
          ] }, item)) })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "health-question-card", children: [
          /* @__PURE__ */ jsx("span", { children: copy2.standards.cardLabel }),
          /* @__PURE__ */ jsx("h3", { children: copy2.standards.cardTitle }),
          /* @__PURE__ */ jsx("p", { children: copy2.standards.cardBody }),
          /* @__PURE__ */ jsx("ol", { children: copy2.standards.cardItems.map((item, index) => /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "0",
              index + 1
            ] }),
            item
          ] }, item)) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "health-scope section", children: [
        /* @__PURE__ */ jsxs("div", { className: "health-section-intro", children: [
          /* @__PURE__ */ jsxs("div", { className: "eyebrow", children: [
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("p", { children: copy2.scope.eyebrow })
          ] }),
          /* @__PURE__ */ jsx("h2", { children: copy2.scope.title }),
          /* @__PURE__ */ jsx("p", { children: copy2.scope.intro })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "health-scope-grid", children: [
          /* @__PURE__ */ jsxs("article", { children: [
            /* @__PURE__ */ jsx("span", { className: "health-scope-index", children: "A" }),
            /* @__PURE__ */ jsx("h3", { children: copy2.scope.includedTitle }),
            /* @__PURE__ */ jsx("ul", { children: copy2.scope.included.map((item) => /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(Icon, { name: "check-circle", className: "icon" }),
              item
            ] }, item)) })
          ] }),
          /* @__PURE__ */ jsxs("article", { children: [
            /* @__PURE__ */ jsx("span", { className: "health-scope-index", children: "B" }),
            /* @__PURE__ */ jsx("h3", { children: copy2.scope.separateTitle }),
            /* @__PURE__ */ jsx("ul", { children: copy2.scope.separate.map((item) => /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { className: "health-minus", children: "—" }),
              item
            ] }, item)) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "health-scope-note", children: copy2.scope.note })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "health-faq section", id: "health-faq", children: [
        /* @__PURE__ */ jsxs("div", { className: "health-faq-heading", children: [
          /* @__PURE__ */ jsxs("div", { className: "eyebrow", children: [
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("p", { children: copy2.faq.eyebrow })
          ] }),
          /* @__PURE__ */ jsx("h2", { children: copy2.faq.title }),
          /* @__PURE__ */ jsx("p", { children: copy2.faq.intro })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "health-accordion", children: copy2.faq.items.map((item, index) => /* @__PURE__ */ jsxs("article", { className: openFaq === index ? "open" : "", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              "aria-expanded": openFaq === index,
              onClick: () => setOpenFaq(openFaq === index ? -1 : index),
              children: [
                /* @__PURE__ */ jsxs("span", { className: "health-faq-number", children: [
                  "0",
                  index + 1
                ] }),
                /* @__PURE__ */ jsx("span", { children: item.question }),
                /* @__PURE__ */ jsx("i", {})
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "health-faq-answer", children: /* @__PURE__ */ jsx("p", { children: item.answer }) })
        ] }, item.question)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "health-final section-dark", id: "health-contact", children: [
        /* @__PURE__ */ jsx("div", { className: "health-final-glow" }),
        /* @__PURE__ */ jsxs("div", { className: "section health-final-inner", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "eyebrow light", children: [
              /* @__PURE__ */ jsx("span", {}),
              /* @__PURE__ */ jsx("p", { children: copy2.final.eyebrow })
            ] }),
            /* @__PURE__ */ jsx("h2", { children: copy2.final.title }),
            /* @__PURE__ */ jsx("p", { children: copy2.final.body })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "health-final-actions", children: [
            /* @__PURE__ */ jsxs("a", { className: "button button-gold", href: "#health-consultation", children: [
              /* @__PURE__ */ jsx("span", { children: copy2.final.cta }),
              /* @__PURE__ */ jsx(Icon, { name: "arrow-right", className: "icon" })
            ] }),
            /* @__PURE__ */ jsxs("a", { className: "button health-button-ghost", href: "tel:+905302655790", children: [
              /* @__PURE__ */ jsx(Icon, { name: "phone", className: "icon" }),
              /* @__PURE__ */ jsx("span", { children: copy2.final.secondary })
            ] }),
            /* @__PURE__ */ jsx("small", { children: copy2.final.notice })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "health-footer", children: [
      /* @__PURE__ */ jsxs("div", { className: "health-footer-main", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("a", { className: "brand footer-brand", href: homeHref, children: [
            /* @__PURE__ */ jsx("img", { src: "/assets/optimized/logo.png", alt: "Antalya VIP Tourism", className: "brand-logo", width: "160", height: "120", loading: "lazy" }),
            /* @__PURE__ */ jsxs("span", { className: "brand-copy", children: [
              /* @__PURE__ */ jsx("strong", { children: "Antalya VIP" }),
              /* @__PURE__ */ jsx("span", { children: "Tourism" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { children: copy2.footer.tagline })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { children: copy2.footer.explore }),
          /* @__PURE__ */ jsx("a", { href: homeHref, children: copy2.footer.home }),
          /* @__PURE__ */ jsx("a", { href: "#health-services", children: copy2.footer.services }),
          /* @__PURE__ */ jsx("a", { href: "#health-process", children: copy2.footer.process }),
          /* @__PURE__ */ jsx("a", { href: "#health-contact", children: copy2.footer.contact })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { children: copy2.footer.legal }),
          /* @__PURE__ */ jsx("a", { href: privacyHref, children: copy2.footer.privacy }),
          /* @__PURE__ */ jsx("a", { href: imprintHref, children: copy2.footer.imprint }),
          /* @__PURE__ */ jsx("a", { href: "mailto:support@antalyaviptourism.com", children: "support@antalyaviptourism.com" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "health-footer-disclaimer", children: [
        /* @__PURE__ */ jsx(Icon, { name: "shield", className: "icon" }),
        /* @__PURE__ */ jsx("p", { children: copy2.footer.disclaimer })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "footer-bottom", children: [
        /* @__PURE__ */ jsx("span", { children: "© 2026 Antalya VIP Tourism" }),
        /* @__PURE__ */ jsx("span", { children: "Antalya · Türkiye" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("a", { className: "health-mobile-cta", href: "#health-consultation", children: [
      /* @__PURE__ */ jsx("span", { children: copy2.navCta }),
      /* @__PURE__ */ jsx(Icon, { name: "arrow-right", className: "icon" })
    ] })
  ] });
}
const healthStyles = "/assets/health-n6733FFm.css";
const links$1 = () => [{
  rel: "stylesheet",
  href: healthStyles
}];
function loader$4({
  request
}) {
  return {
    language: languageFromPath(new URL(request.url).pathname)
  };
}
const meta$4 = ({
  loaderData,
  matches
}) => {
  const metas = healthMeta(loaderData?.language ?? "en");
  if (!matches) return metas;
  const id = matches.find((m) => m.id.startsWith("health-"))?.id ?? "";
  const lang = id.replace("health-", "") || "en";
  const canonical = lang === "en" ? `${domain}/health/` : `${domain}/${lang}/health/`;
  return metas.map((m) => m.tagName === "link" && m.rel === "canonical" ? {
    ...m,
    href: canonical
  } : m);
};
const health = UNSAFE_withComponentProps(function HealthRoute() {
  const {
    language
  } = useLoaderData();
  return /* @__PURE__ */ jsxs(LanguageProvider, {
    initialLanguage: language,
    children: [/* @__PURE__ */ jsx(HealthPage, {}), /* @__PURE__ */ jsx(CookieConsent, {})]
  });
});
const route24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: health,
  links: links$1,
  loader: loader$4,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
const demoWhatsApp = "https://wa.me/905302655790?text=" + encodeURIComponent(
  "Merhaba, kliniğim için ORIVA benzeri markama özel bir web sitesi demosu hakkında görüşmek istiyorum."
);
const services = [
  {
    index: "01",
    title: "Yüz & burun estetiği",
    text: "Burun, göz çevresi ve yüz cerrahisine ilişkin talepler; anatomi, işlev, tıbbi öykü ve kişisel beklentiler birlikte ele alınarak değerlendirilir.",
    note: "Nihai uygunluk yalnız hekim muayenesi ve gerekli tetkiklerden sonra belirlenebilir."
  },
  {
    index: "02",
    title: "Vücut estetiği",
    text: "Meme ve vücut şekillendirme işlemleri; cerrahi değerlendirme, iyileşme beklentisi ve anestezi uygunluğuyla birlikte kişiye özel planlanır.",
    note: "Her cerrahi işlem risk içerir ve her işlem herkes için uygun değildir."
  },
  {
    index: "03",
    title: "Saç restorasyonu",
    text: "Saç kaybının tipi, donör alanın kapasitesi, saç çizgisi beklentisi ve gelecekteki kayıp ihtimali aynı plan içinde değerlendirilir.",
    note: "Yöntem, olası greft planı ve uygunluk hekim değerlendirmesine bağlıdır; sonuç garanti edilemez."
  },
  {
    index: "04",
    title: "Gülüş estetiği",
    text: "İmplant, restoratif uygulamalar ve estetik diş hekimliği seçenekleri; ağız sağlığı, görüntüleme ve fonksiyonla birlikte aşamalı olarak planlanır.",
    note: "Uzaktan hazırlanan fikir ön değerlendirmedir; nihai plan klinik ve radyolojik muayeneyle kesinleşir."
  }
];
const doctors = [
  {
    name: "Dr. Ada Varel",
    role: "Estetik cerrahi odak alanı",
    image: "doctor-ada-varel",
    alt: "Yapay olarak üretilmiş kurgu hekim portresi Ada Varel",
    education: "Temsili tıp eğitimi ve estetik-rekonstrüktif cerrahi odaklı ileri eğitim kurgusu; yüz anatomisi, cerrahi güvenlik ve hasta iletişimi modülleri.",
    focus: "Yüz ve vücut cerrahisinde uygunluk değerlendirmesi, oran odaklı planlama ve iyileşme süreci iletişimi.",
    principle: "Hastanın yalnız neyi değiştirmek istediğini değil, neyi korumak istediğini de anlamak."
  },
  {
    name: "Dr. Kerem Loran",
    role: "Saç restorasyonu odak alanı",
    image: "doctor-kerem-loran",
    alt: "Yapay olarak üretilmiş kurgu hekim portresi Kerem Loran",
    education: "Temsili tıp eğitimi; saçlı deri anatomisi, donör alan değerlendirmesi ve cerrahi saç restorasyonu üzerine mesleki gelişim kurgusu.",
    focus: "Saç çizgisi planlaması, donör kapasitesinin korunması ve uzun vadeli saç kaybının birlikte değerlendirilmesi.",
    principle: "En yüksek sayıyı değil, mevcut kaynakla sürdürülebilir bir planı konuşmak."
  },
  {
    name: "Dt. Nil Arven",
    role: "Estetik diş hekimliği odak alanı",
    image: "doctor-nil-arven",
    alt: "Yapay olarak üretilmiş kurgu diş hekimi portresi Nil Arven",
    education: "Temsili diş hekimliği eğitimi; restoratif diş hekimliği, kapanış ilişkileri ve dijital gülüş planlaması odaklı eğitim kurgusu.",
    focus: "Diş dokusunu koruyan alternatifler, aşamalı tedavi planlaması ve işlev-estetik dengesi.",
    principle: "Görsel değişimi ağız sağlığı ve doğal fonksiyonla birlikte değerlendirmek."
  }
];
const cases = [
  {
    number: "VAKA KURGUSU 01",
    title: "Doğal saç çizgisi planlaması",
    image: "case-hairline",
    alt: "Yapay olarak üretilmiş temsili saç çizgisi değerlendirme sahnesi",
    question: "Donör alan korunarak uzun dönemli bir plan nasıl yapılır?",
    assessment: "Saç kaybı tipi · Donör kapasitesi · Yüz oranları · Gelecek kayıp olasılığı",
    output: "Örnek değerlendirme gündemi ve takip aşamaları"
  },
  {
    number: "VAKA KURGUSU 02",
    title: "Yüz oranlarını koruyan yaklaşım",
    image: "case-facial-profile",
    alt: "Yapay olarak üretilmiş temsili yüz profili görüşmesi",
    question: "Profil görünümü ve işlevsel ihtiyaçlar birlikte nasıl değerlendirilir?",
    assessment: "Anatomi · İşlev · Doku özellikleri · Kişisel beklenti · Alternatifler",
    output: "Örnek muayene gündemi ve iyileşme iletişim planı"
  },
  {
    number: "VAKA KURGUSU 03",
    title: "Doku koruyucu gülüş planı",
    image: "case-smile-planning",
    alt: "Yapay olarak üretilmiş temsili dijital gülüş planlama görüşmesi",
    question: "Estetik beklenti, ağız sağlığı ve fonksiyonla nasıl dengelenir?",
    assessment: "Diş eti · Kapanış · Görüntüleme · Koruyucu seçenekler · Zaman planı",
    output: "Örnek tedavi karar çerçevesi ve ziyaret planı"
  }
];
const personas = [
  {
    code: "A",
    context: "Yurt dışından gelen cerrahi adayı",
    quote: "Yolculuk yapmadan önce kimin, neyi ve ne zaman yapacağını bilmek istiyorum."
  },
  {
    code: "B",
    context: "Saç restorasyonu araştıran ziyaretçi",
    quote: "Sadece sonuç görseli değil, donör alanın nasıl değerlendirildiğini de anlamak istiyorum."
  },
  {
    code: "C",
    context: "Diş tedavisi planlayan ziyaretçi",
    quote: "Ülkeme döndükten sonra hangi durumda kime ulaşacağımın açık olmasını istiyorum."
  }
];
const journey = [
  ["İlk temas", "Genel beklenti, tercih edilen dil, sağlık öyküsü ve zaman planı dinlenir."],
  ["Doğru uzmanlık", "Talep, ilgili tıp veya diş hekimliği uzmanlık alanına yönlendirilir."],
  ["Ön değerlendirme", "Gerekli bilgiler güvenli kanalla incelenir; bunun nihai tanı olmadığı açıkça belirtilir."],
  ["Yazılı plan", "Seçenekler, riskler, alternatifler, tahmini takvim ve ücret kapsamı anlatılır."],
  ["Muayene & onam", "Nihai karar yüz yüze muayene, gerekli tetkikler ve aydınlatılmış onam sonrasında verilir."],
  ["Bakım & takip", "Bakım talimatları, kontrol tarihleri ve klinik iletişim yolu yazılı paylaşılır."]
];
const safeguards = [
  ["Yetki ve ruhsat", "Canlı projede resmi belge numarası ve doğrulama bağlantısı burada gösterilir."],
  ["Uzmanlık doğrulaması", "Hekimin mevzuatta tanımlı uzmanlığı ve çalıştığı sağlık kuruluşu açıkça belirtilir."],
  ["Gerçek tesis görünürlüğü", "Stok görsel yerine gerçek adres ve izinli tesis fotoğrafları kullanılır."],
  ["Anestezi ve acil plan", "Sorumlu ekip, tesis altyapısı ve sevk prosedürü işlem öncesinde açıklanır."],
  ["Onam ve mahremiyet", "Sağlık verisinin kimle, hangi amaçla paylaşılacağı görünür biçimde anlatılır."],
  ["Takip sorumluluğu", "Dönüş sonrası klinik sorumluluk ve ulaşılacak kanal önceden belirlenir."]
];
const faqs = [
  ["ORIVA gerçek bir klinik mi?", "Hayır. ORIVA, premium klinik web deneyimini göstermek için oluşturulmuş kurgusal bir marka konseptidir. Bu sayfa randevu veya sağlık hizmeti sunmaz."],
  ["Bu sayfadaki hekimler gerçek mi?", "Hayır. İsimler, portreler, eğitim anlatıları ve deneyim alanları tamamen temsili tasarım içeriğidir; diploma, ruhsat veya meslek kaydı beyanı değildir."],
  ["Vaka ve hasta anlatıları gerçek mi?", "Hayır. Hiçbiri gerçek hastayı, tedaviyi, yorumu veya sonucu temsil etmez. Canlı projede yalnız açık kullanım izni bulunan, doğrulanabilir materyaller kullanılmalıdır."],
  ["Bir işlemin uygunluğuna çevrim içi karar verilebilir mi?", "Hayır. Çevrim içi görüşme yalnız ön bilgi sağlayabilir. Uygunluk, ilgili hekimin muayenesi ve gerekli tetkikler sonrasında belirlenir."],
  ["Tedavi sonucu garanti edilebilir mi?", "Hayır. Tıbbi ve estetik sonuçlar kişiden kişiye değişir; belirli bir sonuç, greft sayısı veya iyileşme süresi garanti edilemez."],
  ["Gerçek klinik sitesinde fiyat nasıl sunulmalı?", "Fiyat; kişisel plan, işlem kapsamı, tesis, tetkik ve takip ihtiyacına göre kalemlendirilmelidir. Kapsam değişirse nedeni ve ek maliyet karar öncesinde açıklanmalıdır."],
  ["Demo sağlık verisi topluyor mu?", "Hayır. Bu sayfadaki iletişim çağrısı yalnız klinik web sitesi sunumu içindir; sağlık raporu, hasta fotoğrafı veya tıbbi bilgi kabul etmez."]
];
function Arrow({ down = false }) {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: down ? "M6 9l6 6 6-6" : "M5 19L19 5M8 5h11v11" }) });
}
function ClinicPicture({
  name,
  alt,
  className,
  eager = false
}) {
  return /* @__PURE__ */ jsxs("picture", { className, children: [
    /* @__PURE__ */ jsx("source", { srcSet: `/assets/optimized/clinic/${name}.webp`, type: "image/webp" }),
    /* @__PURE__ */ jsx(
      "img",
      {
        src: `/assets/optimized/clinic/${name}.jpg`,
        alt,
        loading: eager ? "eager" : "lazy",
        fetchPriority: eager ? "high" : "auto"
      }
    )
  ] });
}
function ClinicPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  useEffect(() => {
    document.body.classList.toggle("clinic-menu-open", menuOpen);
    return () => document.body.classList.remove("clinic-menu-open");
  }, [menuOpen]);
  const closeMenu = () => setMenuOpen(false);
  return /* @__PURE__ */ jsxs("div", { className: "clinic-page", id: "clinic-top", children: [
    /* @__PURE__ */ jsxs("aside", { className: "clinic-demo-ribbon", role: "note", children: [
      /* @__PURE__ */ jsx("strong", { children: "KURGU SATIŞ DEMOSU" }),
      /* @__PURE__ */ jsx("span", { children: "ORIVA gerçek bir sağlık kuruluşu değildir; tüm kişi, vaka ve anlatılar temsilidir." })
    ] }),
    /* @__PURE__ */ jsxs("header", { className: "clinic-header", children: [
      /* @__PURE__ */ jsxs("a", { className: "clinic-logo", href: "#clinic-top", "aria-label": "ORIVA Concept Clinic demo ana sayfa", children: [
        /* @__PURE__ */ jsx("span", { className: "clinic-logo-mark", "aria-hidden": "true", children: "O" }),
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("strong", { children: "ORIVA" }),
          /* @__PURE__ */ jsx("small", { children: "Concept Clinic · Antalya" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "clinic-desktop-nav", "aria-label": "Klinik demo navigasyonu", children: [
        /* @__PURE__ */ jsx("a", { href: "#clinic-approach", children: "Yaklaşım" }),
        /* @__PURE__ */ jsx("a", { href: "#clinic-services", children: "Tedavi alanları" }),
        /* @__PURE__ */ jsx("a", { href: "#clinic-team", children: "Kurgu uzmanlar" }),
        /* @__PURE__ */ jsx("a", { href: "#clinic-cases", children: "Demo vakalar" }),
        /* @__PURE__ */ jsx("a", { href: "#clinic-journey", children: "Hasta yolculuğu" })
      ] }),
      /* @__PURE__ */ jsxs("a", { className: "clinic-header-cta", href: "#clinic-contact", children: [
        "Markanıza uyarlayın ",
        /* @__PURE__ */ jsx(Arrow, {})
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: `clinic-menu-button${menuOpen ? " is-open" : ""}`,
          type: "button",
          "aria-label": menuOpen ? "Menüyü kapat" : "Menüyü aç",
          "aria-expanded": menuOpen,
          onClick: () => setMenuOpen((open) => !open),
          children: [
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("span", {})
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `clinic-mobile-menu${menuOpen ? " is-open" : ""}`, "aria-hidden": !menuOpen, children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": "Mobil klinik demo navigasyonu", children: [
        ["Yaklaşım", "#clinic-approach"],
        ["Tedavi alanları", "#clinic-services"],
        ["Kurgu uzmanlar", "#clinic-team"],
        ["Demo vakalar", "#clinic-cases"],
        ["Hasta yolculuğu", "#clinic-journey"],
        ["Güvenlik", "#clinic-safety"],
        ["SSS", "#clinic-faq"]
      ].map(([label, href]) => /* @__PURE__ */ jsx("a", { href, onClick: closeMenu, children: label }, href)) }),
      /* @__PURE__ */ jsxs("a", { href: "#clinic-contact", className: "clinic-mobile-menu-cta", onClick: closeMenu, children: [
        "Markanıza özel demo isteyin ",
        /* @__PURE__ */ jsx(Arrow, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "clinic-hero", children: [
        /* @__PURE__ */ jsx(
          ClinicPicture,
          {
            name: "oriva-hero",
            alt: "Yapay olarak üretilmiş kurgu hekim ve premium klinik görüşme odası",
            className: "clinic-hero-media",
            eager: true
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "clinic-hero-shade", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxs("div", { className: "clinic-hero-copy", children: [
          /* @__PURE__ */ jsx("p", { className: "clinic-kicker", children: "ORIVA / ANTALYA — CONCEPT CLINIC" }),
          /* @__PURE__ */ jsxs("h1", { children: [
            "Daha fazlası değil.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("em", { children: "Size uygun olan." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "clinic-hero-lead", children: "Estetik cerrahi, saç restorasyonu ve gülüş estetiğinde; tıbbi değerlendirmeyi, açık iletişimi ve sakin bir hasta deneyimini merkezine alan premium klinik konsepti." }),
          /* @__PURE__ */ jsxs("div", { className: "clinic-hero-actions", children: [
            /* @__PURE__ */ jsxs("a", { className: "clinic-button clinic-button-light", href: "#clinic-journey", children: [
              "Demo süreci görün ",
              /* @__PURE__ */ jsx(Arrow, {})
            ] }),
            /* @__PURE__ */ jsxs("a", { className: "clinic-text-link", href: "#clinic-services", children: [
              "Tedavi alanlarını keşfedin ",
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "↓" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "clinic-hero-note", children: "Bu sayfa tasarım demosudur; randevu veya sağlık hizmeti sunmaz." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "clinic-hero-index", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("span", { children: "Antalya" }),
          /* @__PURE__ */ jsx("i", {}),
          /* @__PURE__ */ jsx("span", { children: "36.89° N" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "clinic-value-strip", "aria-label": "ORIVA yaklaşım ilkeleri", children: ["Doğru uzmanlık", "Kişisel değerlendirme", "Açık risk iletişimi", "Planlı takip"].map((item, index) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "0",
          index + 1
        ] }),
        /* @__PURE__ */ jsx("strong", { children: item })
      ] }, item)) }),
      /* @__PURE__ */ jsxs("section", { className: "clinic-section clinic-approach", id: "clinic-approach", children: [
        /* @__PURE__ */ jsxs("div", { className: "clinic-section-intro", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "clinic-eyebrow", children: "ORIVA YAKLAŞIMI" }),
            /* @__PURE__ */ jsxs("h2", { children: [
              "Bir işlemi değil,",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("em", { children: "karar kalitesini" }),
              " tasarlıyoruz."
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Güven, etkileyici bir sonuç vaadinden önce doğru uzmanlık, gerçekçi beklenti ve anlaşılır bir süreç gerektirir. ORIVA konsepti, hastanın karar vermeden önce doğru soruları görebildiği bir klinik deneyimini örnekler." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "clinic-approach-grid", children: [
          ["Önce dinle", "İstenen değişiklik kadar korunmak istenen özellikleri de anlamaya odaklanan görüşme yapısı."],
          ["Açıkça anlat", "Alternatiflerin, risklerin, iyileşme sürecinin ve kapsam dışı kalemlerin karar öncesinde konuşulması."],
          ["Kişiye göre planla", "Tek tip paket yerine muayene, sağlık geçmişi ve kişisel önceliklere göre oluşturulan plan."],
          ["Takibi görünür kıl", "Bakım, kontrol ve iletişim adımlarının işlemden önce açıklanması."]
        ].map(([title, body], index) => /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "0",
            index + 1
          ] }),
          /* @__PURE__ */ jsx("h3", { children: title }),
          /* @__PURE__ */ jsx("p", { children: body })
        ] }, title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "clinic-section clinic-services", id: "clinic-services", children: [
        /* @__PURE__ */ jsxs("div", { className: "clinic-section-intro clinic-section-intro-light", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "clinic-eyebrow", children: "TEDAVİ ALANLARI" }),
            /* @__PURE__ */ jsxs("h2", { children: [
              "Her talep,",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("em", { children: "doğru uzmanlıkla" }),
              " başlar."
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Paket satışı yerine klinik uygunluğu, alternatifleri ve kişisel öncelikleri görünür kılan örnek hizmet mimarisi." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "clinic-service-list", children: services.map((service) => /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("span", { className: "clinic-service-index", children: service.index }),
          /* @__PURE__ */ jsx("h3", { children: service.title }),
          /* @__PURE__ */ jsx("p", { children: service.text }),
          /* @__PURE__ */ jsx("small", { children: service.note }),
          /* @__PURE__ */ jsxs("a", { href: "#clinic-journey", "aria-label": `${service.title} için örnek süreci görün`, children: [
            "Örnek süreci görün ",
            /* @__PURE__ */ jsx(Arrow, {})
          ] })
        ] }, service.index)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "clinic-section clinic-team", id: "clinic-team", children: [
        /* @__PURE__ */ jsxs("div", { className: "clinic-section-heading-row", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "clinic-eyebrow", children: "TEMSİLİ EKİP · GERÇEK SAĞLIK MESLEK MENSUBU DEĞİLDİR" }),
            /* @__PURE__ */ jsxs("h2", { children: [
              "Uzmanlığı görünür kılan",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("em", { children: "profil tasarımı." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "İsimler, portreler ve mesleki geçmişler yalnızca sunum amacıyla kurgulanmıştır. Canlı projede tüm bilgiler resmi kaynaklardan doğrulanır." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "clinic-doctor-grid", children: doctors.map((doctor, index) => /* @__PURE__ */ jsxs("article", { className: "clinic-doctor-card", children: [
          /* @__PURE__ */ jsxs("div", { className: "clinic-doctor-media", children: [
            /* @__PURE__ */ jsx(ClinicPicture, { name: doctor.image, alt: doctor.alt }),
            /* @__PURE__ */ jsx("span", { children: "YAPAY ÜRETİM · KURGU PORTRE" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "clinic-doctor-header", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "0",
              index + 1
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { children: doctor.name }),
              /* @__PURE__ */ jsx("p", { children: doctor.role })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("dl", { children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { children: "Eğitim odağı" }),
              /* @__PURE__ */ jsx("dd", { children: doctor.education })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { children: "Deneyim odağı" }),
              /* @__PURE__ */ jsx("dd", { children: doctor.focus })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { children: "Yaklaşımı" }),
              /* @__PURE__ */ jsxs("dd", { children: [
                "“",
                doctor.principle,
                "”"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "clinic-profile-note", children: "Demo profilidir; gerçek kişi, diploma, ruhsat veya kurum bağlantısı değildir." })
        ] }, doctor.name)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "clinic-section clinic-cases", id: "clinic-cases", children: [
        /* @__PURE__ */ jsxs("div", { className: "clinic-section-heading-row clinic-section-heading-row-dark", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "clinic-eyebrow", children: "TEMSİLİ VAKA KURGULARI · GERÇEK HASTA VEYA SONUÇ DEĞİLDİR" }),
            /* @__PURE__ */ jsxs("h2", { children: [
              "Sonuçtan önce",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("em", { children: "karar sürecini" }),
              " gösterin."
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Bu galeri “öncesi–sonrası” iddiası taşımaz. Her kart, klinik düşünme biçiminin ve hasta iletişiminin nasıl anlatılabileceğini örnekler." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "clinic-case-grid", children: cases.map((item) => /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsxs("div", { className: "clinic-case-media", children: [
            /* @__PURE__ */ jsx(ClinicPicture, { name: item.image, alt: item.alt }),
            /* @__PURE__ */ jsx("span", { children: "YAPAY OLARAK ÜRETİLMİŞ TEMSİLİ GÖRSEL" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "clinic-case-copy", children: [
            /* @__PURE__ */ jsx("p", { className: "clinic-case-number", children: item.number }),
            /* @__PURE__ */ jsx("h3", { children: item.title }),
            /* @__PURE__ */ jsxs("dl", { children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Başlangıç sorusu" }),
                /* @__PURE__ */ jsx("dd", { children: item.question })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Değerlendirme" }),
                /* @__PURE__ */ jsx("dd", { children: item.assessment })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Demo çıktısı" }),
                /* @__PURE__ */ jsx("dd", { children: item.output })
              ] })
            ] }),
            /* @__PURE__ */ jsx("small", { children: "Konsept görselleştirme · Tıbbi sonuç veya tedavi önerisi göstermez." })
          ] })
        ] }, item.number)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "clinic-section clinic-personas", "aria-labelledby": "clinic-personas-title", children: [
        /* @__PURE__ */ jsxs("div", { className: "clinic-persona-intro", children: [
          /* @__PURE__ */ jsx("p", { className: "clinic-eyebrow", children: "KURGU HASTA PERSONALARI · GERÇEK YORUM DEĞİLDİR" }),
          /* @__PURE__ */ jsxs("h2", { id: "clinic-personas-title", children: [
            "Memnuniyet iddiası değil,",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("em", { children: "gerçek ihtiyacı" }),
            " dinleyen anlatılar."
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "clinic-persona-grid", children: personas.map((persona) => /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("div", { className: "clinic-persona-avatar", "aria-hidden": "true", children: persona.code }),
          /* @__PURE__ */ jsxs("p", { children: [
            "“",
            persona.quote,
            "”"
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("strong", { children: [
              "Persona ",
              persona.code
            ] }),
            /* @__PURE__ */ jsx("span", { children: persona.context })
          ] }),
          /* @__PURE__ */ jsx("small", { children: "Tasarım araştırması için yazılmış temsili metindir; gerçek hasta görüşü değildir." })
        ] }, persona.code)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "clinic-section clinic-journey", id: "clinic-journey", children: [
        /* @__PURE__ */ jsxs("div", { className: "clinic-journey-title", children: [
          /* @__PURE__ */ jsx("p", { className: "clinic-eyebrow", children: "HASTA YOLCULUĞU" }),
          /* @__PURE__ */ jsxs("h2", { children: [
            "Belirsizliği azaltan",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("em", { children: "altı net adım." })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "İlk temastan dönüş sonrası takibe kadar her sorumluluk, karar anından önce görünür olmalı." })
        ] }),
        /* @__PURE__ */ jsx("ol", { className: "clinic-journey-list", children: journey.map(([title, body], index) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("span", { children: String(index + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { children: title }),
            /* @__PURE__ */ jsx("p", { children: body })
          ] })
        ] }, title)) }),
        /* @__PURE__ */ jsx("p", { className: "clinic-journey-note", children: "Bu akış satış demosu için temsili hazırlanmıştır. Gerçek klinik süreç hizmete ve kişinin sağlık durumuna göre değişir." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "clinic-international", children: [
        /* @__PURE__ */ jsxs("div", { className: "clinic-international-copy", children: [
          /* @__PURE__ */ jsx("p", { className: "clinic-eyebrow", children: "ULUSLARARASI HASTA DENEYİMİ" }),
          /* @__PURE__ */ jsxs("h2", { children: [
            "Tedavi yolculuğu,",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("em", { children: "parçalı hissettirmemeli." })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Havaalanı, otel, klinik programı, dil desteği ve refakatçi planlamasının tek bir koordinasyon akışında nasıl sunulabileceğini gösteren örnek deneyim." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "clinic-international-grid", children: ["Tek koordinasyon noktası", "Havalimanı–otel–klinik programı", "Tercih edilen dilde iletişim", "Yazılı günlük plan", "Refakatçi lojistiği", "Dönüş öncesi kontrol takvimi"].map((item) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "✓" }),
          item
        ] }, item)) }),
        /* @__PURE__ */ jsx("small", { children: "Canlı projede her hizmetin sağlayıcısı, kapsamı ve ücreti ayrı belirtilmelidir." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "clinic-section clinic-safety", id: "clinic-safety", children: [
        /* @__PURE__ */ jsxs("div", { className: "clinic-section-heading-row", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "clinic-eyebrow", children: "GÜVENLİK & KANIT ALANI" }),
            /* @__PURE__ */ jsxs("h2", { children: [
              "Konfor tasarlanır.",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("em", { children: "Güvenlik belgelenir." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Şık bir arayüz tek başına güven kanıtı değildir. Canlı projede bu alanlar yalnız doğrulanmış klinik bilgileriyle doldurulur." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "clinic-safety-grid", children: safeguards.map(([title, body], index) => /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("span", { children: String(index + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsx("h3", { children: title }),
          /* @__PURE__ */ jsx("p", { children: body })
        ] }, title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "clinic-section clinic-faq", id: "clinic-faq", children: [
        /* @__PURE__ */ jsxs("div", { className: "clinic-faq-intro", children: [
          /* @__PURE__ */ jsx("p", { className: "clinic-eyebrow", children: "SIK SORULANLAR" }),
          /* @__PURE__ */ jsxs("h2", { children: [
            "Net cevaplar,",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("em", { children: "güvenli kararlar." })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Demo ile gerçek klinik içeriği arasındaki sınır burada açıkça tanımlanır." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "clinic-faq-list", children: faqs.map(([question, answer], index) => {
          const open = openFaq === index;
          return /* @__PURE__ */ jsxs("article", { className: open ? "is-open" : "", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                "aria-expanded": open,
                "aria-controls": `clinic-faq-answer-${index}`,
                onClick: () => setOpenFaq(open ? -1 : index),
                children: [
                  /* @__PURE__ */ jsx("span", { children: String(index + 1).padStart(2, "0") }),
                  /* @__PURE__ */ jsx("strong", { children: question }),
                  /* @__PURE__ */ jsx("i", { children: /* @__PURE__ */ jsx(Arrow, { down: true }) })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { id: `clinic-faq-answer-${index}`, hidden: !open, children: /* @__PURE__ */ jsx("p", { children: answer }) })
          ] }, question);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "clinic-contact", id: "clinic-contact", children: [
        /* @__PURE__ */ jsxs("div", { className: "clinic-contact-copy", children: [
          /* @__PURE__ */ jsx("p", { className: "clinic-eyebrow", children: "KLİNİĞİNİZ İÇİN" }),
          /* @__PURE__ */ jsxs("h2", { children: [
            "Bu deneyimi",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("em", { children: "gerçek markanızla" }),
            " görün."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Doğrulanmış uzmanlıklarınız, gerçek tesisiniz ve hasta yolculuğunuzla; güven veren, çok dilli ve dönüşüm odaklı bir klinik web deneyimi tasarlayalım." }),
          /* @__PURE__ */ jsxs("a", { className: "clinic-button clinic-button-copper", href: demoWhatsApp, target: "_blank", rel: "noreferrer", children: [
            "Canlı sunum talep edin ",
            /* @__PURE__ */ jsx(Arrow, {})
          ] }),
          /* @__PURE__ */ jsx("small", { children: "Bu bağlantı yalnız web sitesi satış görüşmesi başlatır; tıbbi randevu veya ön değerlendirme oluşturmaz." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "clinic-contact-card", children: [
          /* @__PURE__ */ jsx("p", { children: "MARKANIZA ÖZEL KAPSAM" }),
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: "01" }),
              "Gerçek hekim ve uzmanlık profilleri"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: "02" }),
              "İzinli vaka ve hasta hikâyesi sistemi"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: "03" }),
              "Çok dilli uluslararası hasta akışı"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: "04" }),
              "KVKK uyumlu başvuru deneyimi"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: "05" }),
              "SEO, performans ve mobil optimizasyon"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("a", { href: demoWhatsApp, target: "_blank", rel: "noreferrer", children: [
            "İçerik kapsamını konuşalım ",
            /* @__PURE__ */ jsx(Arrow, {})
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "clinic-footer", children: [
      /* @__PURE__ */ jsxs("div", { className: "clinic-footer-brand", children: [
        /* @__PURE__ */ jsx("span", { className: "clinic-logo-mark", "aria-hidden": "true", children: "O" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "ORIVA" }),
          /* @__PURE__ */ jsx("small", { children: "Concept Clinic · Antalya" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "clinic-demo-disclaimer", children: "ORIVA Clinic ve bu sayfadaki kişiler, hizmet anlatıları, hasta yolculukları ve vaka içerikleri kurgusaldır. Sayfa yalnız web tasarımı ve satış sunumu amacıyla hazırlanmıştır; tıbbi tavsiye, randevu, kurum yetkisi veya klinik sonuç beyanı içermez." }),
      /* @__PURE__ */ jsxs("div", { className: "clinic-footer-links", children: [
        /* @__PURE__ */ jsx("a", { href: "#clinic-top", children: "Başa dön" }),
        /* @__PURE__ */ jsx("a", { href: "#clinic-faq", children: "Demo açıklaması" }),
        /* @__PURE__ */ jsx("a", { href: demoWhatsApp, target: "_blank", rel: "noreferrer", children: "Satış görüşmesi" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("a", { className: "clinic-mobile-sticky", href: demoWhatsApp, target: "_blank", rel: "noreferrer", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("small", { children: "KLİNİĞİNİZ İÇİN" }),
        "Markanıza özel demo"
      ] }),
      /* @__PURE__ */ jsx(Arrow, {})
    ] })
  ] });
}
const clinicStyles = "/assets/clinic-DV6Gyi1Y.css";
const links = () => [{
  rel: "stylesheet",
  href: clinicStyles
}];
function loader$3() {
  return {
    language: "tr"
  };
}
const meta$3 = () => clinicMeta();
const clinic = UNSAFE_withComponentProps(function ClinicRoute() {
  return /* @__PURE__ */ jsxs(LanguageProvider, {
    initialLanguage: "tr",
    children: [/* @__PURE__ */ jsx(ClinicPage, {}), /* @__PURE__ */ jsx(CookieConsent, {})]
  });
});
const route25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: clinic,
  links,
  loader: loader$3,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function StaticPageHeader({
  homeHref,
  homeLabel,
  secondaryHref,
  secondaryLabel,
  tertiaryHref,
  tertiaryLabel,
  ctaHref,
  ctaLabel,
  legal: legal2 = false
}) {
  return /* @__PURE__ */ jsxs("header", { className: `site-header${legal2 ? " legal-header" : ""} scrolled`, children: [
    /* @__PURE__ */ jsxs("a", { className: "brand", href: homeHref, children: [
      /* @__PURE__ */ jsx("span", { className: "brand-mark", children: "AVL" }),
      /* @__PURE__ */ jsxs("span", { className: "brand-copy", children: [
        /* @__PURE__ */ jsx("strong", { children: "Antalya VIP" }),
        /* @__PURE__ */ jsx("span", { children: "Tourism" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "desktop-nav", children: [
      /* @__PURE__ */ jsx("a", { href: homeHref, children: homeLabel }),
      /* @__PURE__ */ jsx("a", { href: secondaryHref, children: secondaryLabel }),
      tertiaryHref && tertiaryLabel && /* @__PURE__ */ jsx("a", { href: tertiaryHref, children: tertiaryLabel })
    ] }),
    ctaHref && ctaLabel && /* @__PURE__ */ jsx("a", { className: "header-cta", href: ctaHref, children: ctaLabel })
  ] });
}
const germanLandingHotels = {
  belek: ["Rixos Premium Belek", "The Land of Legends", "Maxx Royal Belek", "Regnum Carya", "Gloria Golf Resort", "Cornelia Diamond Golf Resort & Spa", "IC Hotels Santai Family Resort"],
  side: ["Arum Barut Collection", "Side Star Resort", "Royal Dragon Hotel", "Barut Hemera", "Voyage Sorgun", "Sentido Flora Garden", "Crystal Sunset Luxury Resort & Spa"],
  kemer: ["Rixos Premium Kemer", "Maxx Royal Kemer Resort", "Orange County Resort Hotel Kemer", "Paloma Pasha Resort", "Club Hotel Phaselis Rose"],
  alanya: ["Utopia World Hotel", "Sentido Gold Island Hotel", "Q Premium Resort Hotel Alanya", "Kirman Arycanda De Luxe", "Delphin Diva Premiere"],
  kizilagac: ["Starlight Resort Hotel", "Sunrise Resort Hotel", "Crystal Admiral Resort", "Club Hotel Turan Prince", "Selectum Family Resort"],
  tekirova: ["Rixos Premium Tekirova", "Amara Prestige Hotel", "Nirvana Dolce Vita", "Club Marco Polo", "Pirate’s Beach Club"]
};
const germanRegionCopy = {
  belek: { about: "Belek liegt östlich von Antalya und ist besonders für Golfplätze, große All-inclusive-Resorts und breite Sandstrände bekannt. Die Hotelanlagen verteilen sich zwischen Kadriye und der Küste bei Serik; deshalb ist die genaue Hoteladresse bei der Reservierung hilfreich.", routeDetails: "Die Fahrt führt vom Flughafen Antalya über die D400 in Richtung Serik und Belek. Für Familien, Golfer und Gäste mit spätem Flug ist der direkte Privattransfer praktisch, weil Sie ohne Sammelstopps oder Umstieg direkt an Ihrer Unterkunft ankommen." },
  side: { about: "Side verbindet eine historische Altstadt mit langen Sandstränden und weitläufigen Ferienanlagen. Zum Urlaubsort gehören neben Side auch die beliebten Hotelzonen Kumköy, Evrenseki, Çolaklı, Sorgun und Titreyengöl.", routeDetails: "Vom Flughafen Antalya führt die Strecke über die Küstenstraße in Richtung Manavgat und Side. Besonders bei einer späten Ankunft ist ein privates Fahrzeug angenehm: Ihre Reisegruppe fährt direkt zum gebuchten Resort, ohne auf andere Hotelgäste zu warten." },
  kemer: { about: "Kemer liegt westlich von Antalya zwischen dem Taurusgebirge und dem Mittelmeer. Die Region umfasst Kemer Zentrum sowie Beldibi, Göynük, Kiriş und Çamyuva – Orte mit Strandhotels, Jachthafen und Bergkulisse.", routeDetails: "Die direkte Fahrt folgt der Küste westlich von Antalya. Ihr Fahrer bringt Sie ohne Umstieg zu Ihrem Hotel; das ist besonders bequem, wenn Sie mit Kindern, Sportgepäck oder nach einer Abendlandung anreisen." },
  alanya: { about: "Alanya ist eines der beliebtesten Ferienziele an der türkischen Riviera und liegt deutlich weiter östlich als die Resorts um Antalya. Neben dem Zentrum gehören Mahmutlar, Kestel, Avsallar, Türkler und Okurcalar zu den häufig angefragten Hotelgebieten.", routeDetails: "Die längere Küstenfahrt macht einen festen Fahrzeugpreis besonders transparent. Mit einem Privattransfer reisen Sie direkt mit Ihrer eigenen Gruppe und können nach der Landung entspannt bis vor die Rezeption Ihres Hotels weiterfahren." },
  kizilagac: { about: "Kızılağaç liegt östlich von Manavgat und ist für weitläufige Strandresorts und ruhige Familienferien bekannt. Die Gegend grenzt an Sorgun und Manavgat; viele Hotels liegen etwas abseits der Hauptstraße direkt am Meer.", routeDetails: "Vom Flughafen Antalya fahren Sie über die D400 in Richtung Manavgat und anschließend weiter nach Kızılağaç. Ein privates Fahrzeug erspart die zusätzlichen Hotelstopps, die bei Sammeltransfers gerade auf dieser Strecke üblich sein können." },
  tekirova: { about: "Tekirova liegt südlich von Kemer am Rand des Olympos-Beydağları-Nationalparks. Der Ort verbindet gepflegte Resortanlagen mit kleinen Buchten und liegt nahe der antiken Stätte Phaselis.", routeDetails: "Die Fahrt führt vom Flughafen Antalya über Kemer weiter nach Tekirova. Die Küstenlage und die Entfernung machen einen direkten Transfer sinnvoll: Sie fahren ohne Umstieg und ohne Wartezeit auf andere Gäste bis zu Ihrem Hotel." }
};
const copy = {
  en: {
    home: "Home",
    routes: "Transfer routes",
    priceHeading: "Fixed transfer prices",
    included: "Included in the price",
    duration: "Estimated time",
    distance: "Distance",
    from: "Price from",
    book: "Book your transfer",
    faq: "Frequently asked questions",
    other: "Other Antalya Airport transfers",
    campaign: "Online special pricing is available for all transfer routes.",
    contact: "Contact us on WhatsApp for bookings and questions.",
    privacy: "Privacy",
    imprint: "Imprint",
    privacyUrl: "/privacy/",
    imprintUrl: "/impressum.html",
    vito: "Mercedes Vito · up to 7 passengers",
    sprinter: "Mercedes Sprinter · up to 13 passengers",
    intro: (name, duration, distance) => `The ${distance} journey from Antalya Airport to ${name} takes approximately ${duration} in normal traffic. Your chauffeur meets you in arrivals with a name sign and drives directly to your accommodation.`,
    items: ["Personal meet and greet", "Real-time flight tracking", "Airport parking and waiting", "Luggage assistance and bottled water", "Free child seat on request"],
    faqItems: (name, price, duration) => [[`How long is the transfer from Antalya Airport to ${name}?`, `The journey takes approximately ${duration} in normal traffic.`], [`What is the fixed transfer price to ${name}?`, `Mercedes Vito prices start from €${price} per vehicle. The confirmed total is shown when booking.`], ["What happens if my flight is delayed?", "We track your flight in real time and adjust the meeting time at no extra charge."]]
  },
  de: {
    home: "Startseite",
    routes: "Transferrouten",
    priceHeading: "Feste Transferpreise",
    included: "Im Preis enthalten",
    duration: "Geschätzte Fahrzeit",
    distance: "Entfernung",
    from: "Preis ab",
    book: "Transfer buchen",
    faq: "Häufig gestellte Fragen",
    other: "Weitere Transfers vom Flughafen Antalya",
    campaign: "Online-Spezialpreise sind für alle Transferstrecken verfügbar.",
    contact: "Für Buchungen und Fragen erreichen Sie uns über WhatsApp.",
    privacy: "Datenschutz",
    imprint: "Impressum",
    privacyUrl: "/de/datenschutz/",
    imprintUrl: "/de/impressum/",
    vito: "Mercedes Vito · bis 7 Personen",
    sprinter: "Mercedes Sprinter · bis 13 Personen",
    intro: (name, duration, distance) => `Die ${distance} lange Fahrt vom Flughafen Antalya nach ${name} dauert bei normalem Verkehr ungefähr ${duration}. Nachdem Sie Ihr Gepäck abgeholt haben, gehen Sie bitte zum Meet & Greet Bereich J / 777. Unser Flughafen-Team findet Ihre Buchung und bringt Sie mit Ihrem Fahrer zusammen; anschließend fahren Sie direkt zu Ihrer Unterkunft.`,
    items: ["Persönlicher Empfang mit Namensschild", "Flugverfolgung in Echtzeit", "Flughafenparken und Wartezeit", "Gepäckhilfe und Mineralwasser", "Kostenloser Kindersitz auf Wunsch"],
    faqItems: (name, price, duration) => [[`Wie lange dauert der Transfer vom Flughafen Antalya nach ${name}?`, `Die Fahrt dauert bei normalem Verkehr ungefähr ${duration}.`], [`Was kostet der Festpreis-Transfer nach ${name}?`, `Die Preise für einen Mercedes Vito beginnen bei €${price} pro Fahrzeug. Der bestätigte Gesamtpreis wird bei der Buchung angezeigt.`], ["Was passiert bei einer Flugverspätung?", "Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit ohne Aufpreis an."]]
  },
  tr: {
    home: "Ana sayfa",
    routes: "Transfer rotaları",
    priceHeading: "Sabit transfer fiyatları",
    included: "Fiyata dahil olanlar",
    duration: "Tahmini süre",
    distance: "Mesafe",
    from: "Başlangıç fiyatı",
    book: "Transferinizi ayırtın",
    faq: "Sık sorulan sorular",
    other: "Diğer Antalya Havalimanı transferleri",
    campaign: "Online'a özel fiyatlar tüm transfer rotalarında sunulmaktadır.",
    contact: "Rezervasyon ve sorularınız için WhatsApp üzerinden bize ulaşın.",
    privacy: "Gizlilik",
    imprint: "Künye",
    privacyUrl: "/tr/gizlilik/",
    imprintUrl: "/tr/kunye/",
    vito: "Mercedes Vito · 7 yolcuya kadar",
    sprinter: "Mercedes Sprinter · 13 yolcuya kadar",
    intro: (name, duration, distance) => `Antalya Havalimanı ile ${name} arasındaki ${distance} mesafeli yolculuk normal trafik koşullarında yaklaşık ${duration} sürer. Şoförünüz sizi gelen yolcu salonunda isim tabelasıyla karşılar ve doğrudan konaklama adresinize götürür.`,
    items: ["Kişisel isim tabelasıyla karşılama", "Gerçek zamanlı uçuş takibi", "Havalimanı otoparkı ve bekleme", "Bagaj yardımı ve şişe su", "Talep üzerine ücretsiz çocuk koltuğu"],
    faqItems: (name, price, duration) => [[`Antalya Havalimanı ile ${name} arası transfer ne kadar sürer?`, `Normal trafik koşullarında yolculuk yaklaşık ${duration} sürer. Trafik ve otel konumu süreyi etkileyebilir.`], [`${name} transferinin sabit fiyatı nedir?`, `Mercedes Vito fiyatları araç başına €${price}'dan başlar. Kesin toplam rezervasyon sırasında gösterilir.`], ["Uçuşum gecikirse ne olur?", "Uçuşunuzu gerçek zamanlı takip eder, karşılama saatini ücretsiz olarak güncelleriz."]]
  },
  ru: {
    home: "Главная",
    routes: "Маршруты трансфера",
    priceHeading: "Фиксированные цены",
    included: "В стоимость включено",
    duration: "Время в пути",
    distance: "Расстояние",
    from: "Цена от",
    book: "Забронировать трансфер",
    faq: "Частые вопросы",
    other: "Другие трансферы из аэропорта Антальи",
    campaign: "Специальные онлайн-тарифы доступны для всех маршрутов трансфера.",
    contact: "Для бронирования и вопросов напишите нам в WhatsApp.",
    privacy: "Конфиденциальность",
    imprint: "Правовая информация",
    privacyUrl: "/ru/privacy/",
    imprintUrl: "/ru/impressum/",
    vito: "Mercedes Vito · до 7 пассажиров",
    sprinter: "Mercedes Sprinter · до 13 пассажиров",
    intro: (name, duration, distance) => `Поездка из аэропорта Антальи в ${name} на расстояние ${distance} занимает примерно ${duration} при обычном движении. Водитель встретит вас в зале прилёта с именной табличкой и отвезёт прямо к месту проживания.`,
    items: ["Встреча с именной табличкой", "Отслеживание рейса в реальном времени", "Парковка и ожидание в аэропорту", "Помощь с багажом и вода", "Бесплатное детское кресло по запросу"],
    faqItems: (name, price, duration) => [[`Сколько длится трансфер из аэропорта Антальи в ${name}?`, `При обычном движении поездка занимает около ${duration}. Точное время зависит от дорожной ситуации и расположения отеля.`], [`Сколько стоит трансфер в ${name}?`, `Стоимость Mercedes Vito начинается от €${price} за автомобиль. Итоговая фиксированная цена показывается при бронировании.`], ["Что произойдёт при задержке рейса?", "Мы отслеживаем рейс в реальном времени и бесплатно корректируем время встречи."]]
  },
  fr: {
    home: "Accueil",
    routes: "Routes de transfert",
    priceHeading: "Prix fixes de transfert",
    included: "Inclus dans le prix",
    duration: "Durée estimée",
    distance: "Distance",
    from: "Prix à partir de",
    book: "Réserver votre transfert",
    faq: "Questions fréquentes",
    other: "Autres transferts depuis l'aéroport d'Antalya",
    campaign: "Des tarifs spéciaux en ligne sont disponibles pour toutes les routes de transfert.",
    contact: "Contactez-nous sur WhatsApp pour les réservations et questions.",
    privacy: "Confidentialité",
    imprint: "Mentions légales",
    privacyUrl: "/fr/privacy/",
    imprintUrl: "/fr/impressum/",
    vito: "Mercedes Vito · jusqu'à 7 passagers",
    sprinter: "Mercedes Sprinter · jusqu'à 13 passagers",
    intro: (name, duration, distance) => `Le trajet de ${distance} depuis l'aéroport d'Antalya jusqu'à ${name} dure environ ${duration} en trafic normal. Après avoir récupéré vos bagages, rendez-vous dans la zone Meet & Greet J / 777. Notre équipe identifiera votre réservation et vous mettra en contact avec votre chauffeur.`,
    items: ["Accueil personnalisé avec pancarte nominative", "Suivi du vol en temps réel", "Parking aéroport et attente inclus", "Aide aux bagages et eau en bouteille", "Siège enfant gratuit sur demande"],
    faqItems: (name, price, duration) => [[`Combien de temps dure le transfert de l'aéroport d'Antalya vers ${name} ?`, `Le trajet dure environ ${duration} en trafic normal.`], [`Quel est le prix fixe du transfert vers ${name} ?`, `Les prix Mercedes Vito commencent à €${price} par véhicule. Le montant total confirmé est affiché lors de la réservation.`], ["Que se passe-t-il si mon vol est retardé ?", "Nous suivons votre vol en temps réel et ajustons l'heure de prise en charge sans frais supplémentaires."]]
  },
  cs: {
    home: "Domů",
    routes: "Trasy transferů",
    priceHeading: "Pevné ceny transferů",
    included: "Co je zahrnuto v ceně",
    duration: "Odhadovaný čas",
    distance: "Vzdálenost",
    from: "Cena od",
    book: "Rezervovat transfer",
    faq: "Často kladené dotazy",
    other: "Další transfery z letiště Antalya",
    campaign: "Speciální online ceny jsou dostupné pro všechny transferové trasy.",
    contact: "Pro rezervace a dotazy nás kontaktujte na WhatsApp.",
    privacy: "Ochrana soukromí",
    imprint: "Impressum",
    privacyUrl: "/cs/privacy/",
    imprintUrl: "/cs/impressum/",
    vito: "Mercedes Vito · až 7 cestujících",
    sprinter: "Mercedes Sprinter · až 13 cestujících",
    intro: (name, duration, distance) => `Cesta z letiště Antalya do ${name}, vzdálená ${distance}, trvá přibližně ${duration} při běžném provozu. Váš šofér vás uvítá v příletové hale s jmenovkou a odveze vás přímo do ubytování.`,
    items: ["Osobní uvítání se jmenovkou", "Sledování letů v reálném čase", "Parkoviště na letišti a čekání", "Pomoc se zavazadly a balená voda", "Bezplatná dětská sedačka na vyžádání"],
    faqItems: (name, price, duration) => [[`Jak dlouho trvá transfer z letiště Antalya do ${name}?`, `Cesta trvá přibližně ${duration} při běžném provozu.`], [`Jaká je pevná cena transferu do ${name}?`, `Ceny Mercedes Vito začínají od €${price} za vozidlo. Potvrzená celková cena je zobrazena při rezervaci.`], ["Co se stane, když má můj let zpoždění?", "Sledujeme váš let v reálném čase a upravujeme čas setkání bez příplatku."]]
  },
  uk: {
    home: "Головна",
    routes: "Маршрути трансферу",
    priceHeading: "Фіксовані ціни трансферу",
    included: "Що входить у ціну",
    duration: "Орієнтовний час",
    distance: "Відстань",
    from: "Ціна від",
    book: "Забронювати трансфер",
    faq: "Часті запитання",
    other: "Інші трансфери з аеропорту Анталії",
    campaign: "Спеціальні онлайн-ціни доступні для всіх маршрутів трансферу.",
    contact: "Для бронювання та запитань пишіть нам у WhatsApp.",
    privacy: "Конфіденційність",
    imprint: "Правова інформація",
    privacyUrl: "/uk/privacy/",
    imprintUrl: "/uk/impressum/",
    vito: "Mercedes Vito · до 7 пасажирів",
    sprinter: "Mercedes Sprinter · до 13 пасажирів",
    intro: (name, duration, distance) => `Поїздка з аеропорту Анталії до ${name} відстанню ${distance} займає приблизно ${duration} за звичайного руху. Ваш водій зустріне вас у залі прильоту з іменною табличкою та відвезе прямо до місця проживання.`,
    items: ["Зустріч з іменною табличкою", "Відстеження рейсу в реальному часі", "Паркування та очікування в аеропорту", "Допомога з багажем і вода", "Безкоштовне дитяче крісло за запитом"],
    faqItems: (name, price, duration) => [[`Скільки триває трансфер з аеропорту Анталії до ${name}?`, `За звичайного руху поїздка займає близько ${duration}.`], [`Яка фіксована ціна трансферу до ${name}?`, `Ціни на Mercedes Vito починаються від €${price} за автомобіль. Підтверджена загальна сума показується під час бронювання.`], ["Що станеться, якщо мій рейс затримається?", "Ми відстежуємо ваш рейс у реальному часі та безкоштовно коригуємо час зустрічі."]]
  },
  ur: {
    home: "ہوم",
    routes: "ٹرانسفر روٹس",
    priceHeading: "مقررہ ٹرانسفر قیمتیں",
    included: "قیمت میں شامل",
    duration: "تخمینی وقت",
    distance: "فاصلہ",
    from: "قیمت شروع",
    book: "اپنا ٹرانسفر بک کریں",
    faq: "اکثر پوچھے گئے سوالات",
    other: "انطالیہ ایئرپورٹ کے دیگر ٹرانسفرز",
    campaign: "تمام ٹرانسفر روٹس کے لیے آن لائن خصوصی قیمتیں دستیاب ہیں۔",
    contact: "بکنگ اور سوالات کے لیے WhatsApp پر ہم سے رابطہ کریں۔",
    privacy: "پرائیویسی",
    imprint: "قانونی معلومات",
    privacyUrl: "/ur/privacy/",
    imprintUrl: "/ur/impressum/",
    vito: "Mercedes Vito · 7 مسافروں تک",
    sprinter: "Mercedes Sprinter · 13 مسافروں تک",
    intro: (name, duration, distance) => `انطالیہ ایئرپورٹ سے ${name} تک ${distance} کا سفر عام ٹریفک میں تقریباً ${duration} لیتا ہے۔ آپ کا ڈرائیور آپ کو آمد ہال میں نام کی تختی کے ساتھ ملے گا اور براہ راست آپ کی رہائش گاہ تک لے جائے گا۔`,
    items: ["نام کی تختی کے ساتھ ذاتی استقبال", "حقیقی وقت میں پرواز کی نگرانی", "ایئرپورٹ پارکنگ اور انتظار", "سامان میں مدد اور بوتل بند پانی", "درخواست پر مفت بچوں کی سیٹ"],
    faqItems: (name, price, duration) => [[`انطالیہ ایئرپورٹ سے ${name} تک ٹرانسفر میں کتنا وقت لگتا ہے؟`, `عام ٹریفک میں سفر تقریباً ${duration} لیتا ہے۔`], [`${name} تک ٹرانسفر کی مقررہ قیمت کیا ہے؟`, `Mercedes Vito کی قیمتیں €${price} فی گاڑی سے شروع ہوتی ہیں۔ تصدیق شدہ کل رقم بکنگ کے وقت دکھائی جاتی ہے۔`], ["اگر میری پرواز میں تاخیر ہو جائے تو کیا ہوگا؟", "ہم آپ کی پرواز کو حقیقی وقت میں ٹریک کرتے ہیں اور بغیر کسی اضافی چارج کے ملاقات کا وقت ایڈجسٹ کرتے ہیں۔"]]
  },
  pl: {
    home: "Strona główna",
    routes: "Trasy transferów",
    priceHeading: "Stałe ceny transferów",
    included: "Wliczone w cenę",
    duration: "Szacowany czas",
    distance: "Odległość",
    from: "Cena od",
    book: "Zarezerwuj transfer",
    faq: "Często zadawane pytania",
    other: "Inne transfery z lotniska Antalya",
    campaign: "Specjalne ceny online są dostępne dla wszystkich tras transferu.",
    contact: "Skontaktuj się z nami przez WhatsApp w sprawie rezerwacji i pytań.",
    privacy: "Prywatność",
    imprint: "Nota prawna",
    privacyUrl: "/privacy/",
    imprintUrl: "/impressum.html",
    vito: "Mercedes Vito · do 7 pasażerów",
    sprinter: "Mercedes Sprinter · do 13 pasażerów",
    intro: (name, duration, distance) => `Podróż o długości ${distance} z lotniska Antalya do ${name} trwa około ${duration} przy normalnym ruchu. Kierowca powita Cię w hali przylotów z tabliczką z imieniem i zawiezie bezpośrednio do miejsca zakwaterowania.`,
    items: ["Osobiste powitanie z tabliczką", "Śledzenie lotu w czasie rzeczywistym", "Parking i oczekiwanie na lotnisku", "Pomoc z bagażem i woda butelkowana", "Bezpłatny fotelik dziecięcy na życzenie"],
    faqItems: (name, price, duration) => [[`Jak długo trwa transfer z lotniska Antalya do ${name}?`, `Przy normalnym ruchu podróż trwa około ${duration}.`], [`Jaka jest stała cena transferu do ${name}?`, `Ceny Mercedes Vito zaczynają się od €${price} za pojazd. Potwierdzona łączna kwota jest pokazywana podczas rezerwacji.`], ["Co się stanie, jeśli mój lot będzie opóźniony?", "Śledzimy Twój lot w czasie rzeczywistym i bez dodatkowych opłat dostosowujemy godzinę odbioru."]]
  },
  nl: {
    home: "Home",
    routes: "Transferroutes",
    priceHeading: "Vaste transferprijzen",
    included: "Inbegrepen in de prijs",
    duration: "Geschatte tijd",
    distance: "Afstand",
    from: "Prijs vanaf",
    book: "Boek uw transfer",
    faq: "Veelgestelde vragen",
    other: "Andere transfers vanaf de luchthaven Antalya",
    campaign: "Speciale online prijzen zijn beschikbaar voor alle transferroutes.",
    contact: "Neem contact met ons op via WhatsApp voor boekingen en vragen.",
    privacy: "Privacy",
    imprint: "Colofon",
    privacyUrl: "/privacy/",
    imprintUrl: "/impressum.html",
    vito: "Mercedes Vito · tot 7 passagiers",
    sprinter: "Mercedes Sprinter · tot 13 passagiers",
    intro: (name, duration, distance) => `De rit van ${distance} van de luchthaven Antalya naar ${name} duurt ongeveer ${duration} bij normaal verkeer. Uw chauffeur ontvangt u in de aankomsthal met een naambordje en rijdt rechtstreeks naar uw accommodatie.`,
    items: ["Persoonlijke ontvangst met naambordje", "Realtime vluchtvolging", "Parkeren en wachten op de luchthaven", "Bagagehulp en flessenwater", "Gratis kinderzitje op aanvraag"],
    faqItems: (name, price, duration) => [[`Hoe lang duurt de transfer van de luchthaven Antalya naar ${name}?`, `De rit duurt ongeveer ${duration} bij normaal verkeer.`], [`Wat is de vaste transferprijs naar ${name}?`, `Mercedes Vito-prijzen beginnen bij €${price} per voertuig. Het bevestigde totaal wordt getoond bij het boeken.`], ["Wat gebeurt er als mijn vlucht vertraging heeft?", "We volgen uw vlucht in realtime en passen de ophaaltijd zonder extra kosten aan."]]
  },
  ar: {
    home: "الرئيسية",
    routes: "مسارات النقل",
    priceHeading: "أسعار نقل ثابتة",
    included: "مشمول في السعر",
    duration: "الوقت المقدر",
    distance: "المسافة",
    from: "السعر من",
    book: "احجز نقلك",
    faq: "الأسئلة الشائعة",
    other: "خدمات نقل أخرى من مطار أنطاليا",
    campaign: "تتوفر أسعار خاصة عبر الإنترنت لجميع مسارات النقل.",
    contact: "تواصل معنا عبر واتساب للحجوزات والاستفسارات.",
    privacy: "الخصوصية",
    imprint: "معلومات قانونية",
    privacyUrl: "/privacy/",
    imprintUrl: "/impressum.html",
    vito: "مرسيدس فيتو · حتى 7 ركاب",
    sprinter: "مرسيدس سبرينتر · حتى 13 راكبًا",
    intro: (name, duration, distance) => `تستغرق رحلة المسافة ${distance} من مطار أنطاليا إلى ${name} حوالي ${duration} في حركة المرور العادية. يستقبلك سائقك في صالة الوصول بلافتة تحمل اسمك ويقودك مباشرة إلى مكان إقامتك.`,
    items: ["استقبال شخصي بلافتة الاسم", "تتبع الرحلة في الوقت الفعلي", "موقف وانتظار في المطار", "المساعدة في الأمتعة ومياه معبأة", "مقعد أطفال مجاني عند الطلب"],
    faqItems: (name, price, duration) => [[`كم يستغرق النقل من مطار أنطاليا إلى ${name}؟`, `تستغرق الرحلة حوالي ${duration} في حركة المرور العادية.`], [`ما هو السعر الثابت للنقل إلى ${name}؟`, `تبدأ أسعار مرسيدس فيتو من €${price} لكل مركبة. يظهر الإجمالي المؤكد عند الحجز.`], ["ماذا يحدث إذا تأخرت رحلتي؟", "نتتبع رحلتك في الوقت الفعلي ونعدّل وقت اللقاء دون أي رسوم إضافية."]]
  },
  sv: {
    home: "Hem",
    routes: "Transferrutter",
    priceHeading: "Fasta transferpriser",
    included: "Ingår i priset",
    duration: "Beräknad tid",
    distance: "Avstånd",
    from: "Pris från",
    book: "Boka din transfer",
    faq: "Vanliga frågor",
    other: "Andra transfrar från Antalya flygplats",
    campaign: "Särskilda onlinepriser är tillgängliga för alla transferrutter.",
    contact: "Kontakta oss på WhatsApp för bokningar och frågor.",
    privacy: "Integritet",
    imprint: "Juridisk information",
    privacyUrl: "/privacy/",
    imprintUrl: "/impressum.html",
    vito: "Mercedes Vito · upp till 7 passagerare",
    sprinter: "Mercedes Sprinter · upp till 13 passagerare",
    intro: (name, duration, distance) => `Resan på ${distance} från Antalya flygplats till ${name} tar ungefär ${duration} vid normal trafik. Din chaufför möter dig i ankomsthallen med en namnskylt och kör dig direkt till ditt boende.`,
    items: ["Personligt möte med namnskylt", "Flygbevakning i realtid", "Parkering och väntan på flygplatsen", "Bagagehjälp och vatten på flaska", "Gratis barnstol på begäran"],
    faqItems: (name, price, duration) => [[`Hur lång tid tar transfern från Antalya flygplats till ${name}?`, `Resan tar cirka ${duration} vid normal trafik.`], [`Vad är det fasta transferpriset till ${name}?`, `Mercedes Vito-priser börjar från €${price} per fordon. Den bekräftade summan visas vid bokning.`], ["Vad händer om mitt flyg är försenat?", "Vi spårar ditt flyg i realtid och justerar mötestiden utan extra kostnad."]]
  }
};
function TransferPage({ language, route }) {
  const text = copy[language];
  const seo = routeCopy(language);
  const prefix = language === "en" ? "" : `/${language}`;
  const homeHref = `${prefix}/`;
  const heading = seo.heading(route.name);
  const faq = text.faqItems(route.name, route.prices.vito, route.durationLabel);
  const germanHotels = language === "de" ? germanLandingHotels[route.slug] : void 0;
  const cataloguedHotels = language === "de" ? hotelsForRegion(route.slug) : [];
  const germanRegion = language === "de" ? germanRegionCopy[route.slug] : void 0;
  const germanFaq = germanHotels ? [
    ...faq,
    ["Wo treffe ich das Transfer-Team am Flughafen Antalya?", "Nachdem Sie Ihr Gepäck abgeholt haben, gehen Sie bitte zum Meet & Greet Bereich J / 777. Unser Flughafen-Team findet Ihre Buchung und bringt Sie mit Ihrem Fahrer zusammen."],
    ["Muss ich den Transfer im Voraus bezahlen?", "Nein. Eine Vorauszahlung ist nicht erforderlich. Sie zahlen den festen Gesamtpreis direkt beim Fahrer."],
    ["Ist ein Kindersitz verfügbar?", "Ja. Kindersitze stellen wir auf Wunsch kostenlos bereit. Bitte geben Sie Alter und Anzahl der Kinder bei der Buchung an."]
  ] : faq;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(StaticPageHeader, { homeHref, homeLabel: text.home, secondaryHref: "#details", secondaryLabel: text.routes, tertiaryHref: "#contact", tertiaryLabel: "WhatsApp", ctaHref: `${homeHref}#booking`, ctaLabel: text.book }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "localized-route", children: [
        /* @__PURE__ */ jsxs("div", { className: "eyebrow light", children: [
          /* @__PURE__ */ jsx("span", {}),
          /* @__PURE__ */ jsx("p", { children: "Antalya VIP Tourism" })
        ] }),
        /* @__PURE__ */ jsx("h1", { children: germanHotels ? `Flughafen Antalya → ${route.name} Privattransfer` : heading }),
        /* @__PURE__ */ jsx("p", { children: seo.description(route.name, route.prices.vito) }),
        germanHotels ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("a", { className: "button button-gold", href: `${homeHref}#booking`, children: "Jetzt Transfer buchen" }),
          /* @__PURE__ */ jsxs("ul", { className: "localized-trust", children: [
            /* @__PURE__ */ jsx("li", { children: "Bis zu 7 Personen" }),
            /* @__PURE__ */ jsx("li", { children: "Keine Vorauszahlung erforderlich" }),
            /* @__PURE__ */ jsx("li", { children: "Zahlung direkt beim Fahrer" }),
            /* @__PURE__ */ jsx("li", { children: "Fester Gesamtpreis ohne versteckte Gebühren" }),
            /* @__PURE__ */ jsx("li", { children: "Kostenloser Kindersitz auf Anfrage" }),
            /* @__PURE__ */ jsx("li", { children: "Flugüberwachung inklusive" })
          ] })
        ] }) : /* @__PURE__ */ jsx("p", { className: "localized-campaign", children: text.campaign }),
        /* @__PURE__ */ jsxs("div", { className: "localized-stats", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("strong", { children: route.durationLabel }),
            /* @__PURE__ */ jsx("span", { children: text.duration })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("strong", { children: route.distance }),
            /* @__PURE__ */ jsx("span", { children: text.distance })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("strong", { children: [
              "€",
              route.prices.vito
            ] }),
            /* @__PURE__ */ jsx("span", { children: text.from })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "localized-content", id: "details", children: /* @__PURE__ */ jsxs("div", { className: "localized-grid", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { children: germanHotels ? `Ihr privater Transfer nach ${route.name}` : heading }),
          /* @__PURE__ */ jsx("p", { children: text.intro(route.name, route.durationLabel, route.distance) }),
          germanRegion && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("h3", { children: [
              "Über ",
              route.name
            ] }),
            /* @__PURE__ */ jsx("p", { children: germanRegion.about }),
            /* @__PURE__ */ jsx("p", { children: germanRegion.routeDetails })
          ] }),
          germanHotels && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "Sie reisen ausschließlich mit Ihrer eigenen Gruppe direkt zu Ihrem Hotel in ",
              route.name,
              ". Kein Shuttle, keine fremden Fahrgäste und keine unnötigen Zwischenstopps – der feste Preis gilt für das gesamte Fahrzeug."
            ] }),
            /* @__PURE__ */ jsx("h3", { children: "Ihre Ankunft am Flughafen Antalya" }),
            /* @__PURE__ */ jsx("p", { children: "Nachdem Sie Ihr Gepäck abgeholt haben, gehen Sie bitte zum Meet & Greet Bereich J / 777. Unser Flughafen-Team findet Ihre Buchung und bringt Sie mit Ihrem Fahrer zusammen. Dank Flugüberwachung passen wir die Abholung bei einer Verspätung ohne Aufpreis an." }),
            /* @__PURE__ */ jsx("h3", { children: "Hin- und Rücktransfer" }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Gern organisieren wir auch Ihren Rücktransfer von ",
              route.name,
              " zum Flughafen Antalya. Teilen Sie uns bei der Buchung Ihre Flugnummer und gewünschte Abholzeit mit."
            ] }),
            /* @__PURE__ */ jsx("h3", { children: "Privat statt Sammeltransfer" }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Bei diesem Transfer reisen nur Sie und Ihre Mitreisenden im Fahrzeug. Nach der Reservierung erhalten Sie eine klare Bestätigung mit Reisedaten und Kontaktmöglichkeit. Am Ankunftstag verfolgt unser Team Ihren Flug; bei einer früheren oder späteren Landung stimmen wir die Übergabe entsprechend ab. Der Fahrer bringt Sie mit Gepäck direkt zur Rezeption oder zur angegebenen Privatadresse in ",
              route.name,
              "."
            ] }),
            /* @__PURE__ */ jsx("p", { children: "Der ausgewiesene Betrag ist ein fester Gesamtpreis für das Fahrzeug, nicht pro Person. Es gibt keine versteckten Zuschläge für die Flugüberwachung, die übliche Wartezeit oder Kindersitze auf Anfrage. Bezahlt wird erst direkt beim Fahrer. Damit kennen Sie die Kosten schon vor der Anreise und können entspannt starten." }),
            /* @__PURE__ */ jsx("h3", { children: "Fahrzeug, Gepäck und Kinder" }),
            /* @__PURE__ */ jsx("p", { children: "Der Mercedes Vito eignet sich für bis zu sieben Personen mit normalem Reisegepäck; für größere Gruppen steht ein Mercedes Sprinter mit bis zu 13 Plätzen zur Verfügung. Teilen Sie uns Sondergepäck, einen Kinderwagen oder die benötigten Kindersitze bitte bei der Buchung mit. So planen wir Ihr Fahrzeug passend zu Ihrer Reisegruppe." })
          ] }),
          /* @__PURE__ */ jsx("h3", { children: text.included }),
          /* @__PURE__ */ jsx("ul", { children: text.items.map((item) => /* @__PURE__ */ jsx("li", { children: item }, item)) })
        ] }),
        /* @__PURE__ */ jsxs("aside", { children: [
          /* @__PURE__ */ jsx("h2", { children: text.priceHeading }),
          /* @__PURE__ */ jsxs("div", { className: "localized-price", children: [
            /* @__PURE__ */ jsx("p", { children: text.vito }),
            /* @__PURE__ */ jsxs("strong", { children: [
              "€",
              route.prices.vito
            ] }),
            germanHotels && /* @__PURE__ */ jsx("span", { children: "Preis für das gesamte Fahrzeug" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "localized-price", children: [
            /* @__PURE__ */ jsx("p", { children: text.sprinter }),
            /* @__PURE__ */ jsxs("strong", { children: [
              "€",
              route.prices.sprinter
            ] }),
            germanHotels && /* @__PURE__ */ jsx("span", { children: "Preis für das gesamte Fahrzeug" })
          ] }),
          germanHotels && /* @__PURE__ */ jsxs("ul", { className: "localized-price-trust", children: [
            /* @__PURE__ */ jsx("li", { children: "Keine Vorauszahlung erforderlich" }),
            /* @__PURE__ */ jsx("li", { children: "Zahlung direkt beim Fahrer" }),
            /* @__PURE__ */ jsx("li", { children: "Keine versteckten Gebühren" })
          ] }),
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { className: "button button-gold", href: `${homeHref}#booking`, children: text.book }) })
        ] })
      ] }) }),
      germanHotels && /* @__PURE__ */ jsxs("section", { className: "localized-hotels", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("p", { className: "eyebrow", children: [
            /* @__PURE__ */ jsx("span", {}),
            "Für Ihre Unterkunft"
          ] }),
          /* @__PURE__ */ jsxs("h2", { children: [
            "Beliebte Hotels in ",
            route.name
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Wir fahren direkt zu diesen und weiteren Hotels in der Region." })
        ] }),
        /* @__PURE__ */ jsx("ul", { children: germanHotels.map((hotel2) => {
          const catalogued = cataloguedHotels.find((entry2) => entry2.name === hotel2);
          return /* @__PURE__ */ jsx("li", { children: catalogued ? /* @__PURE__ */ jsx("a", { href: `/de/hotels/${catalogued.slug}/`, children: hotel2 }) : hotel2 }, hotel2);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "localized-faq", children: [
        /* @__PURE__ */ jsx("h2", { children: text.faq }),
        germanFaq.map(([question, answer]) => /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("h3", { children: question }),
          /* @__PURE__ */ jsx("p", { children: answer })
        ] }, question))
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "localized-links", children: [
        /* @__PURE__ */ jsx("h2", { children: text.other }),
        /* @__PURE__ */ jsx("div", { children: publicRouteSlugs.filter((slug) => slug !== route.slug).map((slug) => /* @__PURE__ */ jsx("a", { href: `${prefix}/transfers/${slug}/`, children: routeCatalog[slug].names[language] ?? routeCatalog[slug].names.en }, slug)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "localized-contact", id: "contact", children: [
        /* @__PURE__ */ jsx("h2", { children: text.book }),
        /* @__PURE__ */ jsx("p", { children: text.contact }),
        /* @__PURE__ */ jsx("a", { className: "button button-gold", href: "https://wa.me/905302655790", children: "WhatsApp" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { hidden: true, "aria-hidden": "true", children: /* @__PURE__ */ jsx(BookingForm, { selection: { route: route.slug, vehicle: "vito", nonce: 1 }, scrollOnSelect: false }) }),
    /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsxs("div", { className: "footer-bottom", children: [
      /* @__PURE__ */ jsx("span", { children: "© 2026 Antalya VIP Tourism" }),
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("a", { href: text.imprintUrl, children: text.imprint }),
        " · ",
        /* @__PURE__ */ jsx("a", { href: text.privacyUrl, children: text.privacy })
      ] })
    ] }) })
  ] });
}
const indexedLanguages = /* @__PURE__ */ new Set(["en", "de", "tr", "ru", "cs", "fr", "uk", "ur", "pl", "nl", "ar", "sv"]);
function loader$2({
  params
}) {
  const language = params.language && indexedLanguages.has(params.language) ? params.language : "en";
  const slug = params.slug ?? "";
  if (!routeCatalog[slug]) throw new Response("Not found", {
    status: 404
  });
  return {
    language,
    route: localizedRoute(slug, language)
  };
}
const meta$2 = ({
  loaderData,
  params
}) => {
  const metas = routeMeta(loaderData?.language ?? "en", loaderData?.route?.slug ?? "antalya");
  const urlLang = params?.language;
  if (!urlLang || indexedLanguages.has(urlLang)) return metas;
  const slug = loaderData?.route?.slug ?? params?.slug ?? "antalya";
  const canonical = `${domain}/${urlLang}/transfers/${slug}/`;
  return metas.map((m) => m.tagName === "link" && m.rel === "canonical" ? {
    ...m,
    href: canonical
  } : m);
};
const transfer = UNSAFE_withComponentProps(function TransferRoute() {
  const {
    language,
    route
  } = useLoaderData();
  if (!route) return null;
  return /* @__PURE__ */ jsxs(LanguageProvider, {
    initialLanguage: language,
    children: [/* @__PURE__ */ jsx(TransferPage, {
      language,
      route
    }), /* @__PURE__ */ jsx(CookieConsent, {})]
  });
});
const route27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: transfer,
  loader: loader$2,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function HotelPage({ hotel: hotel2 }) {
  const route = localizedRoute(hotel2.regionSlug, "de");
  if (!route) return null;
  const priced = localizedRoute(indexedHotelBySlug(hotelSlug(hotel2.name))?.region ?? hotel2.regionSlug, "de") ?? route;
  const transferHref = `/de/transfers/${hotel2.regionSlug}/`;
  const bookingHref = "/de/#booking";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(StaticPageHeader, { homeHref: "/de/", homeLabel: "Startseite", secondaryHref: transferHref, secondaryLabel: "Transferroute", tertiaryHref: "#kontakt", tertiaryLabel: "WhatsApp", ctaHref: bookingHref, ctaLabel: "Transfer buchen" }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "localized-route", children: [
        /* @__PURE__ */ jsxs("div", { className: "eyebrow light", children: [
          /* @__PURE__ */ jsx("span", {}),
          /* @__PURE__ */ jsx("p", { children: "Antalya VIP Tourism" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { children: [
          "Flughafen Antalya → ",
          hotel2.name,
          " Privattransfer"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Privater Festpreis-Transfer vom Flughafen Antalya direkt zum ",
          hotel2.name,
          ". Nachdem Sie Ihr Gepäck abgeholt haben, gehen Sie bitte zum Meet & Greet Bereich J / 777. Unser Flughafen-Team findet Ihre Buchung und bringt Sie mit Ihrem Fahrer zusammen; anschließend fährt Ihre Gruppe ohne Zwischenstopps zum Hotel."
        ] }),
        /* @__PURE__ */ jsx("a", { className: "button button-gold", href: bookingHref, children: "Jetzt Transfer buchen" }),
        /* @__PURE__ */ jsxs("ul", { className: "localized-trust", children: [
          /* @__PURE__ */ jsx("li", { children: "Bis zu 7 Personen" }),
          /* @__PURE__ */ jsx("li", { children: "Keine Vorauszahlung erforderlich" }),
          /* @__PURE__ */ jsx("li", { children: "Zahlung direkt beim Fahrer" }),
          /* @__PURE__ */ jsx("li", { children: "Kostenloser Kindersitz auf Anfrage" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "localized-stats", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("strong", { children: priced.durationLabel }),
            /* @__PURE__ */ jsx("span", { children: "Geschätzte Fahrzeit" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("strong", { children: priced.distance }),
            /* @__PURE__ */ jsx("span", { children: "Entfernung" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("strong", { children: [
              "€",
              priced.prices.vito
            ] }),
            /* @__PURE__ */ jsx("span", { children: "Preis ab" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "localized-content", id: "details", children: /* @__PURE__ */ jsxs("div", { className: "localized-grid", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { children: [
            "Ihr privater Transfer zum ",
            hotel2.name
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Die Fahrt vom Flughafen Antalya nach ",
            route.name,
            " dauert bei normalem Verkehr ungefähr ",
            priced.durationLabel,
            ". Der angegebene Festpreis gilt für das gesamte Fahrzeug, nicht pro Person."
          ] }),
          /* @__PURE__ */ jsx("h3", { children: "Lage des Hotels" }),
          /* @__PURE__ */ jsx("p", { children: hotel2.locationCopy }),
          /* @__PURE__ */ jsx("h3", { children: "Ankunft, Zahlung und Kindersitz" }),
          /* @__PURE__ */ jsx("p", { children: "Nach der Gepäckausgabe gehen Sie bitte zum Meet & Greet Bereich J / 777. Unser Team bringt Sie mit Ihrem Fahrer zusammen. Wir verfolgen Ihren Flug; bei Verspätung passen wir die Abholung ohne Aufpreis an. Sie zahlen direkt beim Fahrer. Kindersitze stellen wir auf Wunsch kostenlos bereit." }),
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("a", { className: "button button-gold", href: transferHref, children: [
            "Transfer nach ",
            route.name
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("aside", { children: [
          /* @__PURE__ */ jsx("h2", { children: "Feste Transferpreise" }),
          /* @__PURE__ */ jsxs("div", { className: "localized-price", children: [
            /* @__PURE__ */ jsx("p", { children: "Mercedes Vito · bis 7 Personen" }),
            /* @__PURE__ */ jsxs("strong", { children: [
              "€",
              priced.prices.vito
            ] }),
            /* @__PURE__ */ jsx("span", { children: "Preis für das gesamte Fahrzeug" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "localized-price", children: [
            /* @__PURE__ */ jsx("p", { children: "Mercedes Sprinter · bis 13 Personen" }),
            /* @__PURE__ */ jsxs("strong", { children: [
              "€",
              priced.prices.sprinter
            ] }),
            /* @__PURE__ */ jsx("span", { children: "Preis für das gesamte Fahrzeug" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "localized-faq", children: [
        /* @__PURE__ */ jsx("h2", { children: "Häufig gestellte Fragen" }),
        /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsxs("h3", { children: [
            "Wie lange dauert die Fahrt zum ",
            hotel2.name,
            "?"
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Bei normalem Verkehr ungefähr ",
            priced.durationLabel,
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Was kostet der Transfer?" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Der Mercedes Vito kostet ab €",
            priced.prices.vito,
            " pro Fahrzeug."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "localized-contact", id: "kontakt", children: [
        /* @__PURE__ */ jsx("h2", { children: "Transfer buchen" }),
        /* @__PURE__ */ jsx("p", { children: "Für Buchungen und Fragen erreichen Sie uns über WhatsApp." }),
        /* @__PURE__ */ jsx("a", { className: "button button-gold", href: "https://wa.me/905302655790", children: "WhatsApp" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { hidden: true, "aria-hidden": "true", children: /* @__PURE__ */ jsx(BookingForm, { selection: { route: priced.slug, vehicle: "vito", nonce: 1 }, scrollOnSelect: false }) })
  ] });
}
function loader$1({
  params
}) {
  const hotel2 = hotelBySlug(params.hotelSlug ?? "");
  if (!hotel2) throw new Response("Not found", {
    status: 404
  });
  return {
    language: "de",
    hotel: hotel2
  };
}
const meta$1 = ({
  loaderData
}) => hotelMeta(loaderData?.hotel.slug ?? "");
const hotel = UNSAFE_withComponentProps(function HotelRoute() {
  const {
    hotel: hotel2
  } = useLoaderData();
  return /* @__PURE__ */ jsxs(LanguageProvider, {
    initialLanguage: "de",
    children: [/* @__PURE__ */ jsx(HotelPage, {
      hotel: hotel2
    }), /* @__PURE__ */ jsx(CookieConsent, {})]
  });
});
const route28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hotel,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const legalData = {
  "en-privacy": { "title": "Privacy Policy | Antalya VIP Tourism", "description": "Privacy policy of Antalya VIP Tourism covering booking data, optional analytics and your rights.", "canonical": "https://antalyaviptourism.com/privacy/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/privacy/" }, { "language": "de", "href": "https://antalyaviptourism.com/de/datenschutz/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/gizlilik/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/privacy/" }, { "language": "cs", "href": "https://antalyaviptourism.com/cs/privacy/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/privacy/" }], "hero": { "eyebrow": "Privacy", "title": "Privacy Policy", "intro": "How we process personal data and the choices available to you." }, "cards": [{ "title": "1. Controller", "paragraphs": ["Antalya VIP Tourism, Ahmet Karadag, Belek Mah. Belek 61 Sk., Belek Deniz Apt No: 19 Ic Kapi No: 4, Serik / Antalya, Türkiye. Email: support@antalyaviptourism.com. Phone: +90 530 265 57 90."], "details": [], "privacySettings": false }, { "title": "2. Booking and contact data", "paragraphs": ["When you request or book a journey, we process the contact, travel, flight, pickup, destination and payment information you provide. This is necessary to answer your request, perform the journey, communicate with you and meet legal obligations. Data is retained only as long as required for these purposes or statutory retention periods."], "details": [], "privacySettings": false }, { "title": "3. Technical delivery", "paragraphs": ["When the website is accessed, technically necessary log data may be processed, including IP address, time, requested page, browser and device information. This supports secure and stable website delivery."], "details": [], "privacySettings": false }, { "title": "4. Google Analytics and Google Ads", "paragraphs": ["Google Analytics and Google Ads load only after you consent in the privacy dialog. Usage, device, interaction and conversion data may then be sent to Google. The provider is Google Ireland Limited and processing by affiliated companies outside the European Economic Area may occur. You may withdraw consent at any time through Privacy settings. Rejecting analytics does not affect booking functions."], "details": [], "privacySettings": true }, { "title": "5. Service providers and recipients", "paragraphs": ["Hosting, database, payment and communication providers may process only the data required for their task. Payment details are processed by the selected payment provider."], "details": [], "privacySettings": false }, { "title": "6. Your rights", "paragraphs": ["Where applicable law provides, you may request access, correction, deletion, restriction, portability or object to processing. You may withdraw consent for the future and lodge a complaint with a competent supervisory authority."], "details": [], "privacySettings": false }, { "title": "7. Updates", "paragraphs": ["This policy is updated when services or legal requirements change. Last updated: 19 June 2026."], "details": [], "privacySettings": false }], "homeLabel": "Home" },
  "en-imprint": { "title": "Imprint | Antalya VIP Tourism", "description": "Legal notice and provider information for Antalya VIP Tourism.", "canonical": "https://antalyaviptourism.com/impressum.html", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/impressum.html" }, { "language": "de", "href": "https://antalyaviptourism.com/de/impressum/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/kunye/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/impressum/" }, { "language": "cs", "href": "https://antalyaviptourism.com/cs/impressum/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/impressum.html" }], "hero": { "eyebrow": "Legal notice", "title": "Imprint", "intro": "Provider information for this website under the applicable information obligations." }, "cards": [{ "title": "Operator", "paragraphs": [], "details": [{ "term": "Name", "value": "Ahmet Karadag", "href": null }, { "term": "Business name", "value": "Antalya VIP Tourism", "href": null }, { "term": "Address", "value": "Belek Mah. Belek 61 Sk.\nBelek Deniz Apt No: 19 Ic Kapi No: 4\nSerik / Antalya\nTürkiye", "href": null }], "privacySettings": false }, { "title": "Contact", "paragraphs": [], "details": [{ "term": "Phone / WhatsApp", "value": "+90 530 265 57 90", "href": "tel:+905302655790" }, { "term": "E-Mail", "value": "support@antalyaviptourism.com", "href": "mailto:support@antalyaviptourism.com" }], "privacySettings": false }, { "title": "Tax information", "paragraphs": [], "details": [{ "term": "Tax office", "value": "Serik", "href": null }, { "term": "Tax number / Vergi Kimlik No", "value": "507•••8455", "href": null }, { "term": "Business start date", "value": "12.04.2021", "href": null }], "privacySettings": false }, { "title": "Business activity", "paragraphs": ["Passenger transport in urban, suburban and rural areas by road vehicles, including staff, student and comparable group transfers."], "details": [], "privacySettings": false }, { "title": "Liability for content", "paragraphs": ["If you notice any inaccuracy or have a concern about the content on this website, please contact us directly."], "details": [], "privacySettings": false }], "homeLabel": "Home" },
  "de-privacy": { "title": "Datenschutzerklärung | Antalya VIP Tourism", "description": "Datenschutzerklärung von Antalya VIP Tourism mit Informationen zu Buchungsdaten, optionaler Analyse und Ihren Rechten.", "canonical": "https://antalyaviptourism.com/de/datenschutz/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/privacy/" }, { "language": "de", "href": "https://antalyaviptourism.com/de/datenschutz/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/gizlilik/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/privacy/" }, { "language": "cs", "href": "https://antalyaviptourism.com/cs/privacy/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/privacy/" }], "hero": { "eyebrow": "Datenschutz", "title": "Datenschutzerklärung", "intro": "Wie wir personenbezogene Daten verarbeiten und welche Wahlmöglichkeiten Sie haben." }, "cards": [{ "title": "1. Verantwortlicher", "paragraphs": ["Antalya VIP Tourism, Ahmet Karadag, Belek Mah. Belek 61 Sk., Belek Deniz Apt No: 19 Ic Kapi No: 4, Serik / Antalya, Türkei. E-Mail: support@antalyaviptourism.com. Telefon: +90 530 265 57 90."], "details": [], "privacySettings": false }, { "title": "2. Buchungs- und Kontaktdaten", "paragraphs": ["Wenn Sie eine Fahrt anfragen oder buchen, verarbeiten wir die von Ihnen angegebenen Kontakt-, Reise-, Flug-, Abhol-, Ziel- und Zahlungsinformationen. Dies ist erforderlich, um Ihre Anfrage zu bearbeiten, die Fahrt durchzuführen, mit Ihnen zu kommunizieren und gesetzliche Pflichten zu erfüllen. Daten werden nur so lange gespeichert, wie sie für diese Zwecke oder gesetzliche Aufbewahrungsfristen benötigt werden."], "details": [], "privacySettings": false }, { "title": "3. Technische Bereitstellung", "paragraphs": ["Beim Aufruf der Website können technisch erforderliche Protokolldaten verarbeitet werden, insbesondere IP-Adresse, Zeitpunkt, aufgerufene Seite, Browser- und Geräteinformationen. Dies dient der sicheren und stabilen Bereitstellung."], "details": [], "privacySettings": false }, { "title": "4. Google Analytics und Google Ads", "paragraphs": ["Google Analytics und Google Ads werden erst nach Ihrer Einwilligung geladen. Dabei können Nutzungs-, Geräte-, Interaktions- und Conversion-Daten an Google Ireland Limited übermittelt werden. Eine Verarbeitung außerhalb des Europäischen Wirtschaftsraums kann stattfinden. Sie können Ihre Einwilligung jederzeit über die Datenschutzeinstellungen widerrufen. Eine Ablehnung beeinträchtigt die Buchung nicht."], "details": [], "privacySettings": true }, { "title": "5. Dienstleister und Empfänger", "paragraphs": ["Hosting-, Datenbank-, Zahlungs- und Kommunikationsdienstleister erhalten nur die für ihre Aufgabe erforderlichen Daten. Zahlungsdaten verarbeitet der gewählte Zahlungsdienstleister."], "details": [], "privacySettings": false }, { "title": "6. Ihre Rechte", "paragraphs": ["Soweit anwendbares Recht dies vorsieht, können Sie Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit oder Widerspruch verlangen. Sie können Einwilligungen für die Zukunft widerrufen und sich bei einer zuständigen Aufsichtsbehörde beschweren."], "details": [], "privacySettings": false }, { "title": "7. Änderungen", "paragraphs": ["Diese Erklärung wird bei Änderungen der Dienste oder rechtlichen Anforderungen aktualisiert. Stand: 19. Juni 2026."], "details": [], "privacySettings": false }], "homeLabel": "Startseite" },
  "de-imprint": { "title": "Impressum | Antalya VIP Tourism", "description": "Impressum und Anbieterkennzeichnung von Antalya VIP Tourism.", "canonical": "https://antalyaviptourism.com/de/impressum/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/impressum.html" }, { "language": "de", "href": "https://antalyaviptourism.com/de/impressum/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/kunye/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/impressum/" }, { "language": "cs", "href": "https://antalyaviptourism.com/cs/impressum/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/impressum.html" }], "hero": { "eyebrow": "Anbieterkennzeichnung", "title": "Impressum", "intro": "Angaben gemaess den anwendbaren Informationspflichten fuer den Anbieter dieser Website." }, "cards": [{ "title": "Betreiber", "paragraphs": [], "details": [{ "term": "Name", "value": "Ahmet Karadag", "href": null }, { "term": "Geschaeftsbezeichnung", "value": "Antalya VIP Tourism", "href": null }, { "term": "Adresse", "value": "Belek Mah. Belek 61 Sk.\nBelek Deniz Apt No: 19 Ic Kapi No: 4\nSerik / Antalya\nTuerkei", "href": null }], "privacySettings": false }, { "title": "Kontakt", "paragraphs": [], "details": [{ "term": "Telefon / WhatsApp", "value": "+90 530 265 57 90", "href": "tel:+905302655790" }, { "term": "E-Mail", "value": "support@antalyaviptourism.com", "href": "mailto:support@antalyaviptourism.com" }], "privacySettings": false }, { "title": "Steuerliche Angaben", "paragraphs": [], "details": [{ "term": "Finanzamt", "value": "Serik", "href": null }, { "term": "Steuernummer / Vergi Kimlik No", "value": "507•••8455", "href": null }, { "term": "Taetigkeitsbeginn", "value": "12.04.2021", "href": null }], "privacySettings": false }, { "title": "Taetigkeit", "paragraphs": ["Personenbefoerderung im Stadt-, Vorort- und laendlichen Verkehr mit Strassenfahrzeugen, einschliesslich Personal-, Schueler- und vergleichbarer Gruppentransfers."], "details": [], "privacySettings": false }, { "title": "Haftung fuer Inhalte", "paragraphs": ["Falls Sie einen Fehler oder eine Unklarheit auf dieser Website entdecken, freuen wir uns ueber Ihre Nachricht. Bitte kontaktieren Sie uns direkt."], "details": [], "privacySettings": false }], "homeLabel": "Startseite" },
  "tr-privacy": { "title": "Gizlilik Politikası | Antalya VIP Tourism", "description": "Antalya VIP Tourism gizlilik politikası: rezervasyon verileri, isteğe bağlı analizler ve haklarınız.", "canonical": "https://antalyaviptourism.com/tr/gizlilik/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/privacy/" }, { "language": "de", "href": "https://antalyaviptourism.com/de/datenschutz/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/gizlilik/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/privacy/" }, { "language": "cs", "href": "https://antalyaviptourism.com/cs/privacy/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/privacy/" }], "hero": { "eyebrow": "Gizlilik", "title": "Gizlilik Politikası", "intro": "Kişisel verileri nasıl işlediğimiz ve kullanabileceğiniz seçenekler." }, "cards": [{ "title": "1. Veri sorumlusu", "paragraphs": ["Antalya VIP Tourism, Ahmet Karadag, Belek Mah. Belek 61 Sk., Belek Deniz Apt No: 19 İç Kapı No: 4, Serik / Antalya, Türkiye. E-posta: support@antalyaviptourism.com. Telefon: +90 530 265 57 90."], "details": [], "privacySettings": false }, { "title": "2. Rezervasyon ve iletişim verileri", "paragraphs": ["Bir yolculuk talep ettiğinizde veya rezervasyon yaptığınızda verdiğiniz iletişim, seyahat, uçuş, alış, varış ve ödeme bilgilerini işleriz. Bu bilgiler talebinizi yanıtlamak, yolculuğu gerçekleştirmek, sizinle iletişim kurmak ve yasal yükümlülükleri yerine getirmek için gereklidir. Veriler yalnızca gerekli veya yasal saklama süresi boyunca tutulur."], "details": [], "privacySettings": false }, { "title": "3. Teknik hizmet", "paragraphs": ["Web sitesi kullanılırken IP adresi, zaman, istenen sayfa, tarayıcı ve cihaz bilgileri gibi teknik günlük verileri güvenli ve istikrarlı hizmet için işlenebilir."], "details": [], "privacySettings": false }, { "title": "4. Google Analytics ve Google Ads", "paragraphs": ["Google Analytics ve Google Ads yalnızca onayınızdan sonra yüklenir. Kullanım, cihaz, etkileşim ve dönüşüm verileri Google Ireland Limited şirketine iletilebilir ve Avrupa Ekonomik Alanı dışında işlenebilir. Onayınızı Gizlilik ayarlarından istediğiniz zaman geri çekebilirsiniz. Reddetmek rezervasyon işlevlerini etkilemez."], "details": [], "privacySettings": true }, { "title": "5. Hizmet sağlayıcılar", "paragraphs": ["Barındırma, veri tabanı, ödeme ve iletişim sağlayıcıları yalnızca görevleri için gerekli verileri işler. Ödeme bilgileri seçilen ödeme sağlayıcısı tarafından işlenir."], "details": [], "privacySettings": false }, { "title": "6. Haklarınız", "paragraphs": ["Uygulanabilir mevzuat kapsamında erişim, düzeltme, silme, kısıtlama, veri taşınabilirliği veya itiraz haklarınızı kullanabilirsiniz. Onayınızı gelecek için geri çekebilir ve yetkili makama şikâyette bulunabilirsiniz."], "details": [], "privacySettings": false }, { "title": "7. Güncellemeler", "paragraphs": ["Hizmetler veya yasal gereklilikler değiştiğinde bu politika güncellenir. Son güncelleme: 19 Haziran 2026."], "details": [], "privacySettings": false }], "homeLabel": "Ana sayfa" },
  "tr-imprint": { "title": "Künye | Antalya VIP Tourism", "description": "Antalya VIP Tourism künye ve hizmet sağlayıcı bilgileri.", "canonical": "https://antalyaviptourism.com/tr/kunye/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/impressum.html" }, { "language": "de", "href": "https://antalyaviptourism.com/de/impressum/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/kunye/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/impressum/" }, { "language": "cs", "href": "https://antalyaviptourism.com/cs/impressum/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/impressum.html" }], "hero": { "eyebrow": "Yasal bilgiler", "title": "Künye", "intro": "Bu web sitesinin hizmet sağlayıcısına ait yasal bilgilendirme." }, "cards": [{ "title": "İşletmeci", "paragraphs": [], "details": [{ "term": "Ad soyad", "value": "Ahmet Karadag", "href": null }, { "term": "İşletme adı", "value": "Antalya VIP Tourism", "href": null }, { "term": "Adres", "value": "Belek Mah. Belek 61 Sk.\nBelek Deniz Apt No: 19 İç Kapı No: 4\nSerik / Antalya\nTürkiye", "href": null }], "privacySettings": false }, { "title": "İletişim", "paragraphs": [], "details": [{ "term": "Telefon / WhatsApp", "value": "+90 530 265 57 90", "href": "tel:+905302655790" }, { "term": "E-Mail", "value": "support@antalyaviptourism.com", "href": "mailto:support@antalyaviptourism.com" }], "privacySettings": false }, { "title": "Vergi bilgileri", "paragraphs": [], "details": [{ "term": "Vergi dairesi", "value": "Serik", "href": null }, { "term": "Vergi kimlik no", "value": "507•••8455", "href": null }, { "term": "İşe başlama tarihi", "value": "12.04.2021", "href": null }], "privacySettings": false }, { "title": "Faaliyet", "paragraphs": ["Şehir içi, banliyö ve kırsal alanlarda kara yolu ile personel, öğrenci ve benzeri grup taşımacılığı."], "details": [], "privacySettings": false }, { "title": "İçerik sorumluluğu", "paragraphs": ["Web sitemizdeki içeriklerle ilgili bir hata veya eksiklik fark ederseniz lütfen doğrudan bizimle iletişime geçin."], "details": [], "privacySettings": false }], "homeLabel": "Ana sayfa" },
  "ru-privacy": { "title": "Политика конфиденциальности | Antalya VIP Tourism", "description": "Политика конфиденциальности Antalya VIP Tourism: данные бронирования, необязательная аналитика и ваши права.", "canonical": "https://antalyaviptourism.com/ru/privacy/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/privacy/" }, { "language": "de", "href": "https://antalyaviptourism.com/de/datenschutz/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/gizlilik/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/privacy/" }, { "language": "cs", "href": "https://antalyaviptourism.com/cs/privacy/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/privacy/" }], "hero": { "eyebrow": "Конфиденциальность", "title": "Политика конфиденциальности", "intro": "Как мы обрабатываем персональные данные и какие возможности выбора у вас есть." }, "cards": [{ "title": "1. Ответственное лицо", "paragraphs": ["Antalya VIP Tourism, Ahmet Karadag, Belek Mah. Belek 61 Sk., Belek Deniz Apt No: 19 Ic Kapi No: 4, Serik / Antalya, Türkiye. Email: support@antalyaviptourism.com. Телефон: +90 530 265 57 90."], "details": [], "privacySettings": false }, { "title": "2. Данные бронирования и контактов", "paragraphs": ["При запросе или бронировании поездки мы обрабатываем предоставленные контактные, туристические, полётные, адресные и платёжные данные. Это необходимо для ответа на запрос, выполнения поездки, связи с вами и соблюдения закона. Данные хранятся только в течение необходимого или установленного законом срока."], "details": [], "privacySettings": false }, { "title": "3. Техническая работа сайта", "paragraphs": ["При посещении сайта могут обрабатываться технические журналы: IP-адрес, время, запрошенная страница, сведения о браузере и устройстве. Это необходимо для безопасной и стабильной работы сайта."], "details": [], "privacySettings": false }, { "title": "4. Google Analytics и Google Ads", "paragraphs": ["Google Analytics и Google Ads загружаются только после вашего согласия. Данные об использовании, устройстве, взаимодействиях и конверсиях могут передаваться Google Ireland Limited и обрабатываться за пределами Европейской экономической зоны. Согласие можно отозвать через настройки конфиденциальности. Отказ не влияет на бронирование."], "details": [], "privacySettings": true }, { "title": "5. Поставщики услуг", "paragraphs": ["Поставщики хостинга, базы данных, платежей и связи получают только необходимые для их задачи данные. Платёжные данные обрабатывает выбранный платёжный сервис."], "details": [], "privacySettings": false }, { "title": "6. Ваши права", "paragraphs": ["В рамках применимого права вы можете запросить доступ, исправление, удаление, ограничение, перенос данных или возразить против обработки. Вы можете отозвать согласие на будущее и обратиться в компетентный надзорный орган."], "details": [], "privacySettings": false }, { "title": "7. Обновления", "paragraphs": ["Политика обновляется при изменении сервисов или требований закона. Обновлено: 19 июня 2026 года."], "details": [], "privacySettings": false }], "homeLabel": "Главная" },
  "ru-imprint": { "title": "Правовая информация | Antalya VIP Tourism", "description": "Правовая информация и сведения о поставщике услуг Antalya VIP Tourism.", "canonical": "https://antalyaviptourism.com/ru/impressum/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/impressum.html" }, { "language": "de", "href": "https://antalyaviptourism.com/de/impressum/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/kunye/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/impressum/" }, { "language": "cs", "href": "https://antalyaviptourism.com/cs/impressum/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/impressum.html" }], "hero": { "eyebrow": "Правовая информация", "title": "Правовая информация", "intro": "Информация о поставщике услуг этого сайта в соответствии с применимыми требованиями." }, "cards": [{ "title": "Оператор", "paragraphs": [], "details": [{ "term": "Имя", "value": "Ahmet Karadag", "href": null }, { "term": "Название компании", "value": "Antalya VIP Tourism", "href": null }, { "term": "Адрес", "value": "Belek Mah. Belek 61 Sk.\nBelek Deniz Apt No: 19 Ic Kapi No: 4\nSerik / Antalya\nTürkiye", "href": null }], "privacySettings": false }, { "title": "Контакты", "paragraphs": [], "details": [{ "term": "Телефон / WhatsApp", "value": "+90 530 265 57 90", "href": "tel:+905302655790" }, { "term": "E-Mail", "value": "support@antalyaviptourism.com", "href": "mailto:support@antalyaviptourism.com" }], "privacySettings": false }, { "title": "Налоговая информация", "paragraphs": [], "details": [{ "term": "Налоговая инспекция", "value": "Serik", "href": null }, { "term": "Налоговый номер / Vergi Kimlik No", "value": "507•••8455", "href": null }, { "term": "Дата начала деятельности", "value": "12.04.2021", "href": null }], "privacySettings": false }, { "title": "Вид деятельности", "paragraphs": ["Пассажирские перевозки автомобильным транспортом в городских, пригородных и сельских районах, включая трансферы персонала, учащихся и сопоставимых групп."], "details": [], "privacySettings": false }, { "title": "Ответственность за содержание", "paragraphs": ["Если вы заметили неточность или у вас есть вопрос по содержанию сайта, пожалуйста, свяжитесь с нами напрямую."], "details": [], "privacySettings": false }], "homeLabel": "Главная" },
  "cs-privacy": { "title": "Zásady ochrany osobních údajů | Antalya VIP Tourism", "description": "Zásady ochrany osobních údajů společnosti Antalya VIP Tourism zahrnující data rezervací, volitelnou analytiku a vaše práva.", "canonical": "https://antalyaviptourism.com/cs/privacy/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/privacy/" }, { "language": "de", "href": "https://antalyaviptourism.com/de/datenschutz/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/gizlilik/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/privacy/" }, { "language": "cs", "href": "https://antalyaviptourism.com/cs/privacy/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/privacy/" }], "hero": { "eyebrow": "Ochrana soukromí", "title": "Zásady ochrany osobních údajů", "intro": "Jak zpracováváme osobní údaje a jaké máte možnosti volby." }, "cards": [{ "title": "1. Správce údajů", "paragraphs": ["Antalya VIP Tourism, Ahmet Karadag, Belek Mah. Belek 61 Sk., Belek Deniz Apt No: 19 Ic Kapi No: 4, Serik / Antalya, Türkiye. E-mail: support@antalyaviptourism.com. Telefon: +90 530 265 57 90."], "details": [], "privacySettings": false }, { "title": "2. Data rezervací a kontaktní data", "paragraphs": ["Pokud požádáte o přepravu nebo ji objednáte, zpracováváme kontaktní, cestovní, letové, vyzvedávací, cílové a platební údaje, které poskytnete. Je to nezbytné k zodpovězení vašeho dotazu, provedení přepravy, komunikaci s vámi a plnění zákonných povinností. Data jsou uchovávána pouze po dobu nezbytnou pro tyto účely nebo po dobu stanovenou zákonem."], "details": [], "privacySettings": false }, { "title": "3. Technické zajištění", "paragraphs": ["Při přístupu na webové stránky mohou být zpracovávána technicky nezbytná data protokolu, včetně IP adresy, času, požadované stránky, informací o prohlížeči a zařízení. To slouží k bezpečnému a stabilnímu provozu webových stránek."], "details": [], "privacySettings": false }, { "title": "4. Google Analytics a Google Ads", "paragraphs": ["Google Analytics a Google Ads se načítají pouze po vašem souhlasu v dialogu ochrany soukromí. Poté mohou být data o používání, zařízení, interakcích a konverzích zasílána společnosti Google Ireland Limited a přidružené společnosti mimo Evropský hospodářský prostor mohou zpracovávat data. Souhlas můžete kdykoli odvolat prostřednictvím Nastavení soukromí. Odmítnutí analytiky neovlivní funkce rezervace."], "details": [], "privacySettings": true }, { "title": "5. Poskytovatelé služeb a příjemci", "paragraphs": ["Poskytovatelé hostingu, databází, plateb a komunikace mohou zpracovávat pouze data nezbytná pro jejich úkol. Platební údaje jsou zpracovávány vybraným poskytovatelem plateb."], "details": [], "privacySettings": false }, { "title": "6. Vaše práva", "paragraphs": ["Pokud to platné právo stanoví, můžete požádat o přístup, opravu, výmaz, omezení, přenositelnost nebo vznést námitku proti zpracování. Souhlas můžete odvolat do budoucna a podat stížnost u příslušného dozorového úřadu."], "details": [], "privacySettings": false }, { "title": "7. Aktualizace", "paragraphs": ["Tyto zásady jsou aktualizovány při změně služeb nebo právních požadavků. Poslední aktualizace: 19. června 2026."], "details": [], "privacySettings": false }], "homeLabel": "Domů" },
  "cs-imprint": { "title": "Impressum | Antalya VIP Tourism", "description": "Právní informace a údaje o poskytovateli Antalya VIP Tourism.", "canonical": "https://antalyaviptourism.com/cs/impressum/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/impressum.html" }, { "language": "de", "href": "https://antalyaviptourism.com/de/impressum/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/kunye/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/impressum/" }, { "language": "cs", "href": "https://antalyaviptourism.com/cs/impressum/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/impressum.html" }], "hero": { "eyebrow": "Právní informace", "title": "Impressum", "intro": "Informace o poskytovateli tohoto webu v souladu s platnými informačními povinnostmi." }, "cards": [{ "title": "Provozovatel", "paragraphs": [], "details": [{ "term": "Jméno", "value": "Ahmet Karadag", "href": null }, { "term": "Název firmy", "value": "Antalya VIP Tourism", "href": null }, { "term": "Adresa", "value": "Belek Mah. Belek 61 Sk.\nBelek Deniz Apt No: 19 Ic Kapi No: 4\nSerik / Antalya\nTürkiye", "href": null }], "privacySettings": false }, { "title": "Kontakt", "paragraphs": [], "details": [{ "term": "Telefon / WhatsApp", "value": "+90 530 265 57 90", "href": "tel:+905302655790" }, { "term": "E-mail", "value": "support@antalyaviptourism.com", "href": "mailto:support@antalyaviptourism.com" }], "privacySettings": false }, { "title": "Daňové informace", "paragraphs": [], "details": [{ "term": "Finanční úřad", "value": "Serik", "href": null }, { "term": "Daňové číslo / Vergi Kimlik No", "value": "507•••8455", "href": null }, { "term": "Datum zahájení podnikání", "value": "12.04.2021", "href": null }], "privacySettings": false }, { "title": "Předmět podnikání", "paragraphs": ["Přeprava cestujících v městských, příměstských a venkovských oblastech silničními vozidly, včetně přepravy zaměstnanců, studentů a srovnatelných skupin."], "details": [], "privacySettings": false }, { "title": "Odpovědnost za obsah", "paragraphs": ["Pokud zjistíte nepřesnost nebo máte připomínku k obsahu na tomto webu, kontaktujte nás přímo."], "details": [], "privacySettings": false }], "homeLabel": "Domů" },
  "uk-privacy": { "title": "Privacy Policy | Antalya VIP Tourism", "description": "Privacy policy of Antalya VIP Tourism covering booking data, optional analytics and your rights.", "canonical": "https://antalyaviptourism.com/uk/privacy/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/privacy/" }, { "language": "de", "href": "https://antalyaviptourism.com/de/datenschutz/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/gizlilik/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/privacy/" }, { "language": "cs", "href": "https://antalyaviptourism.com/cs/privacy/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/privacy/" }], "hero": { "eyebrow": "Privacy", "title": "Privacy Policy", "intro": "How we process personal data and the choices available to you." }, "cards": [{ "title": "1. Controller", "paragraphs": ["Antalya VIP Tourism, Ahmet Karadag, Belek Mah. Belek 61 Sk., Belek Deniz Apt No: 19 Ic Kapi No: 4, Serik / Antalya, Türkiye. Email: support@antalyaviptourism.com. Phone: +90 530 265 57 90."], "details": [], "privacySettings": false }, { "title": "2. Booking and contact data", "paragraphs": ["When you request or book a journey, we process the contact, travel, flight, pickup, destination and payment information you provide. This is necessary to answer your request, perform the journey, communicate with you and meet legal obligations. Data is retained only as long as required for these purposes or statutory retention periods."], "details": [], "privacySettings": false }, { "title": "3. Technical delivery", "paragraphs": ["When the website is accessed, technically necessary log data may be processed, including IP address, time, requested page, browser and device information. This supports secure and stable website delivery."], "details": [], "privacySettings": false }, { "title": "4. Google Analytics and Google Ads", "paragraphs": ["Google Analytics and Google Ads load only after you consent in the privacy dialog. Usage, device, interaction and conversion data may then be sent to Google. The provider is Google Ireland Limited and processing by affiliated companies outside the European Economic Area may occur. You may withdraw consent at any time through Privacy settings. Rejecting analytics does not affect booking functions."], "details": [], "privacySettings": true }, { "title": "5. Service providers and recipients", "paragraphs": ["Hosting, database, payment and communication providers may process only the data required for their task. Payment details are processed by the selected payment provider."], "details": [], "privacySettings": false }, { "title": "6. Your rights", "paragraphs": ["Where applicable law provides, you may request access, correction, deletion, restriction, portability or object to processing. You may withdraw consent for the future and lodge a complaint with a competent supervisory authority."], "details": [], "privacySettings": false }, { "title": "7. Updates", "paragraphs": ["This policy is updated when services or legal requirements change. Last updated: 19 June 2026."], "details": [], "privacySettings": false }], "homeLabel": "Home" },
  "uk-imprint": { "title": "Imprint | Antalya VIP Tourism", "description": "Legal notice and provider information for Antalya VIP Tourism.", "canonical": "https://antalyaviptourism.com/uk/impressum/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/impressum.html" }, { "language": "de", "href": "https://antalyaviptourism.com/de/impressum/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/kunye/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/impressum/" }, { "language": "cs", "href": "https://antalyaviptourism.com/cs/impressum/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/impressum.html" }], "hero": { "eyebrow": "Legal notice", "title": "Imprint", "intro": "Provider information for this website under the applicable information obligations." }, "cards": [{ "title": "Operator", "paragraphs": [], "details": [{ "term": "Name", "value": "Ahmet Karadag", "href": null }, { "term": "Business name", "value": "Antalya VIP Tourism", "href": null }, { "term": "Address", "value": "Belek Mah. Belek 61 Sk.\nBelek Deniz Apt No: 19 Ic Kapi No: 4\nSerik / Antalya\nTürkiye", "href": null }], "privacySettings": false }, { "title": "Contact", "paragraphs": [], "details": [{ "term": "Phone / WhatsApp", "value": "+90 530 265 57 90", "href": "tel:+905302655790" }, { "term": "E-Mail", "value": "support@antalyaviptourism.com", "href": "mailto:support@antalyaviptourism.com" }], "privacySettings": false }, { "title": "Tax information", "paragraphs": [], "details": [{ "term": "Tax office", "value": "Serik", "href": null }, { "term": "Tax number / Vergi Kimlik No", "value": "507•••8455", "href": null }, { "term": "Business start date", "value": "12.04.2021", "href": null }], "privacySettings": false }, { "title": "Business activity", "paragraphs": ["Passenger transport in urban, suburban and rural areas by road vehicles, including staff, student and comparable group transfers."], "details": [], "privacySettings": false }, { "title": "Liability for content", "paragraphs": ["If you notice any inaccuracy or have a concern about the content on this website, please contact us directly."], "details": [], "privacySettings": false }], "homeLabel": "Home" },
  "ur-privacy": { "title": "Privacy Policy | Antalya VIP Tourism", "description": "Privacy policy of Antalya VIP Tourism covering booking data, optional analytics and your rights.", "canonical": "https://antalyaviptourism.com/ur/privacy/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/privacy/" }, { "language": "de", "href": "https://antalyaviptourism.com/de/datenschutz/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/gizlilik/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/privacy/" }, { "language": "cs", "href": "https://antalyaviptourism.com/cs/privacy/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/privacy/" }], "hero": { "eyebrow": "Privacy", "title": "Privacy Policy", "intro": "How we process personal data and the choices available to you." }, "cards": [{ "title": "1. Controller", "paragraphs": ["Antalya VIP Tourism, Ahmet Karadag, Belek Mah. Belek 61 Sk., Belek Deniz Apt No: 19 Ic Kapi No: 4, Serik / Antalya, Türkiye. Email: support@antalyaviptourism.com. Phone: +90 530 265 57 90."], "details": [], "privacySettings": false }, { "title": "2. Booking and contact data", "paragraphs": ["When you request or book a journey, we process the contact, travel, flight, pickup, destination and payment information you provide. This is necessary to answer your request, perform the journey, communicate with you and meet legal obligations. Data is retained only as long as required for these purposes or statutory retention periods."], "details": [], "privacySettings": false }, { "title": "3. Technical delivery", "paragraphs": ["When the website is accessed, technically necessary log data may be processed, including IP address, time, requested page, browser and device information. This supports secure and stable website delivery."], "details": [], "privacySettings": false }, { "title": "4. Google Analytics and Google Ads", "paragraphs": ["Google Analytics and Google Ads load only after you consent in the privacy dialog. Usage, device, interaction and conversion data may then be sent to Google. The provider is Google Ireland Limited and processing by affiliated companies outside the European Economic Area may occur. You may withdraw consent at any time through Privacy settings. Rejecting analytics does not affect booking functions."], "details": [], "privacySettings": true }, { "title": "5. Service providers and recipients", "paragraphs": ["Hosting, database, payment and communication providers may process only the data required for their task. Payment details are processed by the selected payment provider."], "details": [], "privacySettings": false }, { "title": "6. Your rights", "paragraphs": ["Where applicable law provides, you may request access, correction, deletion, restriction, portability or object to processing. You may withdraw consent for the future and lodge a complaint with a competent supervisory authority."], "details": [], "privacySettings": false }, { "title": "7. Updates", "paragraphs": ["This policy is updated when services or legal requirements change. Last updated: 19 June 2026."], "details": [], "privacySettings": false }], "homeLabel": "Home" },
  "ur-imprint": { "title": "Imprint | Antalya VIP Tourism", "description": "Legal notice and provider information for Antalya VIP Tourism.", "canonical": "https://antalyaviptourism.com/ur/impressum/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/impressum.html" }, { "language": "de", "href": "https://antalyaviptourism.com/de/impressum/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/kunye/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/impressum/" }, { "language": "cs", "href": "https://antalyaviptourism.com/cs/impressum/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/impressum.html" }], "hero": { "eyebrow": "Legal notice", "title": "Imprint", "intro": "Provider information for this website under the applicable information obligations." }, "cards": [{ "title": "Operator", "paragraphs": [], "details": [{ "term": "Name", "value": "Ahmet Karadag", "href": null }, { "term": "Business name", "value": "Antalya VIP Tourism", "href": null }, { "term": "Address", "value": "Belek Mah. Belek 61 Sk.\nBelek Deniz Apt No: 19 Ic Kapi No: 4\nSerik / Antalya\nTürkiye", "href": null }], "privacySettings": false }, { "title": "Contact", "paragraphs": [], "details": [{ "term": "Phone / WhatsApp", "value": "+90 530 265 57 90", "href": "tel:+905302655790" }, { "term": "E-Mail", "value": "support@antalyaviptourism.com", "href": "mailto:support@antalyaviptourism.com" }], "privacySettings": false }, { "title": "Tax information", "paragraphs": [], "details": [{ "term": "Tax office", "value": "Serik", "href": null }, { "term": "Tax number / Vergi Kimlik No", "value": "507•••8455", "href": null }, { "term": "Business start date", "value": "12.04.2021", "href": null }], "privacySettings": false }, { "title": "Business activity", "paragraphs": ["Passenger transport in urban, suburban and rural areas by road vehicles, including staff, student and comparable group transfers."], "details": [], "privacySettings": false }, { "title": "Liability for content", "paragraphs": ["If you notice any inaccuracy or have a concern about the content on this website, please contact us directly."], "details": [], "privacySettings": false }], "homeLabel": "Home" }
};
const privacyPath = { en: "/privacy/", de: "/de/datenschutz/", fr: "/fr/privacy/", tr: "/tr/gizlilik/", ru: "/ru/privacy/", cs: "/cs/privacy/", uk: "/uk/privacy/", ur: "/ur/privacy/" };
const imprintPath = { en: "/impressum.html", de: "/de/impressum/", fr: "/fr/impressum/", tr: "/tr/kunye/", ru: "/ru/impressum/", cs: "/cs/impressum/", uk: "/uk/impressum/", ur: "/ur/impressum/" };
const privacyLabel = { en: "Privacy", de: "Datenschutz", fr: "Confidentialité", tr: "Gizlilik", ru: "Конфиденциальность", cs: "Ochrana soukromí", uk: "Конфіденційність", ur: "پرائیویسی" };
const imprintLabel = { en: "Imprint", de: "Impressum", fr: "Mentions légales", tr: "Künye", ru: "Правовая информация", cs: "Impressum", uk: "Правова інформація", ur: "قانونی معلومات" };
const privacySettingsLabel = { en: "Open privacy settings", de: "Datenschutzeinstellungen öffnen", fr: "Ouvrir les paramètres de confidentialité", tr: "Gizlilik ayarlarını aç", ru: "Открыть настройки конфиденциальности", cs: "Otevřít nastavení soukromí", uk: "Відкрити налаштування конфіденційності", ur: "پرائیویسی سیٹنگز کھولیں" };
function LegalPage({ language, privacy }) {
  const key = `${language}-${privacy ? "privacy" : "imprint"}`;
  const page = legalData[key];
  const homeHref = language === "en" ? "/" : `/${language}/`;
  const pPath = privacyPath[language] ?? privacyPath.en;
  const iPath = imprintPath[language] ?? imprintPath.en;
  const pLabel = privacyLabel[language] ?? privacyLabel.en;
  const iLabel = imprintLabel[language] ?? imprintLabel.en;
  const psLabel = privacySettingsLabel[language] ?? privacySettingsLabel.en;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(StaticPageHeader, { homeHref, homeLabel: page.homeLabel, secondaryHref: privacy ? iPath : pPath, secondaryLabel: privacy ? iLabel : pLabel, legal: true }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "legal-hero", children: [
        /* @__PURE__ */ jsxs("div", { className: "eyebrow light", children: [
          /* @__PURE__ */ jsx("span", {}),
          /* @__PURE__ */ jsx("p", { children: page.hero.eyebrow })
        ] }),
        /* @__PURE__ */ jsx("h1", { children: page.hero.title }),
        /* @__PURE__ */ jsx("p", { children: page.hero.intro })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "legal-content", "aria-label": page.hero.title, children: page.cards.map((card) => /* @__PURE__ */ jsxs("div", { className: `legal-card${card.paragraphs.length ? " legal-card-wide" : ""}`, children: [
        /* @__PURE__ */ jsx("h2", { children: card.title }),
        card.paragraphs.map((paragraph) => /* @__PURE__ */ jsx("p", { children: paragraph }, paragraph)),
        card.details.length > 0 && /* @__PURE__ */ jsx("dl", { className: "legal-details", children: card.details.map((detail) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { children: detail.term }),
          /* @__PURE__ */ jsx("dd", { children: detail.href ? /* @__PURE__ */ jsx("a", { href: detail.href, children: detail.value }) : detail.value })
        ] }, detail.term)) }),
        card.privacySettings && /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("button", { className: "button button-gold", type: "button", "data-open-consent": true, children: psLabel }) })
      ] }, card.title)) })
    ] }),
    /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsxs("div", { className: "footer-bottom", children: [
      /* @__PURE__ */ jsx("span", { children: "© 2026 Antalya VIP Tourism" }),
      /* @__PURE__ */ jsx("a", { href: privacy ? iPath : pPath, children: privacy ? iLabel : pLabel })
    ] }) })
  ] });
}
const allLegalLanguages = /* @__PURE__ */ new Set(["en", "de", "tr", "ru", "cs", "uk", "ur"]);
function loader({
  request
}) {
  const pathname = new URL(request.url).pathname;
  const language = languageFromPath(pathname);
  const rawLang = pathname.split("/").filter(Boolean)[0];
  const legalLanguage = allLegalLanguages.has(rawLang) ? rawLang : language;
  const privacy = /privacy|datenschutz|gizlilik/.test(pathname);
  return {
    language,
    legalLanguage,
    privacy
  };
}
const legalRouteCanonical = {
  "legal-imprint-en": `${domain}/impressum.html`,
  "legal-privacy-en": `${domain}/privacy/`,
  "legal-privacy-de": `${domain}/de/datenschutz/`,
  "legal-imprint-de": `${domain}/de/impressum/`,
  "legal-privacy-tr": `${domain}/tr/gizlilik/`,
  "legal-imprint-tr": `${domain}/tr/kunye/`,
  "legal-privacy-ru": `${domain}/ru/privacy/`,
  "legal-imprint-ru": `${domain}/ru/impressum/`,
  "legal-privacy-cs": `${domain}/cs/privacy/`,
  "legal-imprint-cs": `${domain}/cs/impressum/`,
  "legal-privacy-uk": `${domain}/uk/privacy/`,
  "legal-imprint-uk": `${domain}/uk/impressum/`,
  "legal-privacy-ur": `${domain}/ur/privacy/`,
  "legal-imprint-ur": `${domain}/ur/impressum/`
};
const meta = ({
  loaderData,
  matches
}) => {
  const legalLanguage = loaderData?.legalLanguage ?? loaderData?.language ?? "en";
  const key = `${legalLanguage}-${loaderData?.privacy ? "privacy" : "imprint"}`;
  const page = legalData[key] ?? legalData["en-imprint"];
  const routeId = matches?.find((m) => m.id.startsWith("legal-"))?.id;
  const canonicalHref = (routeId && legalRouteCanonical[routeId]) ?? page.canonical;
  return [{
    title: page.title
  }, {
    name: "description",
    content: page.description
  }, {
    tagName: "link",
    rel: "canonical",
    href: canonicalHref
  }, ...page.alternates.map((alternate) => ({
    tagName: "link",
    rel: "alternate",
    hrefLang: alternate.language ?? "",
    href: alternate.href ?? ""
  })), {
    name: "robots",
    content: "index, follow"
  }];
};
const legal = UNSAFE_withComponentProps(function LegalRoute() {
  const {
    language,
    privacy
  } = useLoaderData();
  return /* @__PURE__ */ jsxs(LanguageProvider, {
    initialLanguage: language,
    children: [/* @__PURE__ */ jsx(LegalPage, {
      language,
      privacy
    }), /* @__PURE__ */ jsx(CookieConsent, {})]
  });
});
const route42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: legal,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BD2P1iGF.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/errorBoundaries-Y42zlZbV.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/root-DPJGM9wT.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/errorBoundaries-Y42zlZbV.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-en": { "id": "home-en", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-C-5lfqsg.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/BookingForm-DZh00RGZ.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-de": { "id": "home-de", "parentId": "root", "path": "de", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-C-5lfqsg.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/BookingForm-DZh00RGZ.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-fr": { "id": "home-fr", "parentId": "root", "path": "fr", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-C-5lfqsg.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/BookingForm-DZh00RGZ.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-tr": { "id": "home-tr", "parentId": "root", "path": "tr", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-C-5lfqsg.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/BookingForm-DZh00RGZ.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-ru": { "id": "home-ru", "parentId": "root", "path": "ru", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-C-5lfqsg.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/BookingForm-DZh00RGZ.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-cs": { "id": "home-cs", "parentId": "root", "path": "cs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-C-5lfqsg.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/BookingForm-DZh00RGZ.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-uk": { "id": "home-uk", "parentId": "root", "path": "uk", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-C-5lfqsg.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/BookingForm-DZh00RGZ.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-ur": { "id": "home-ur", "parentId": "root", "path": "ur", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-C-5lfqsg.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/BookingForm-DZh00RGZ.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-pl": { "id": "home-pl", "parentId": "root", "path": "pl", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-C-5lfqsg.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/BookingForm-DZh00RGZ.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-nl": { "id": "home-nl", "parentId": "root", "path": "nl", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-C-5lfqsg.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/BookingForm-DZh00RGZ.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-ar": { "id": "home-ar", "parentId": "root", "path": "ar", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-C-5lfqsg.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/BookingForm-DZh00RGZ.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-sv": { "id": "home-sv", "parentId": "root", "path": "sv", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-C-5lfqsg.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/BookingForm-DZh00RGZ.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-en": { "id": "health-en", "parentId": "root", "path": "health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-DDVtOSjj.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-de": { "id": "health-de", "parentId": "root", "path": "de/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-DDVtOSjj.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-fr": { "id": "health-fr", "parentId": "root", "path": "fr/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-DDVtOSjj.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-tr": { "id": "health-tr", "parentId": "root", "path": "tr/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-DDVtOSjj.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-ru": { "id": "health-ru", "parentId": "root", "path": "ru/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-DDVtOSjj.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-cs": { "id": "health-cs", "parentId": "root", "path": "cs/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-DDVtOSjj.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-uk": { "id": "health-uk", "parentId": "root", "path": "uk/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-DDVtOSjj.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-ur": { "id": "health-ur", "parentId": "root", "path": "ur/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-DDVtOSjj.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-pl": { "id": "health-pl", "parentId": "root", "path": "pl/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-DDVtOSjj.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-nl": { "id": "health-nl", "parentId": "root", "path": "nl/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-DDVtOSjj.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-ar": { "id": "health-ar", "parentId": "root", "path": "ar/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-DDVtOSjj.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-sv": { "id": "health-sv", "parentId": "root", "path": "sv/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-DDVtOSjj.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/Header-HCqtc74f.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "clinic-tr": { "id": "clinic-tr", "parentId": "root", "path": "clinic", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/clinic-xZW89NmK.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "transfer-en": { "id": "transfer-en", "parentId": "root", "path": "transfers/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/transfer-CkKplfCt.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/BookingForm-DZh00RGZ.js", "/assets/StaticPageHeader-DDzAlzLI.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "transfer-localized": { "id": "transfer-localized", "parentId": "root", "path": ":language/transfers/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/transfer-CkKplfCt.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/BookingForm-DZh00RGZ.js", "/assets/StaticPageHeader-DDzAlzLI.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "hotel-de": { "id": "hotel-de", "parentId": "root", "path": "de/hotels/:hotelSlug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/hotel-C5A-3AJV.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/BookingForm-DZh00RGZ.js", "/assets/StaticPageHeader-DDzAlzLI.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-en": { "id": "legal-imprint-en", "parentId": "root", "path": "impressum.html", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-qWcADcLC.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-en": { "id": "legal-privacy-en", "parentId": "root", "path": "privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-qWcADcLC.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-de": { "id": "legal-privacy-de", "parentId": "root", "path": "de/datenschutz", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-qWcADcLC.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-de": { "id": "legal-imprint-de", "parentId": "root", "path": "de/impressum", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-qWcADcLC.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-tr": { "id": "legal-privacy-tr", "parentId": "root", "path": "tr/gizlilik", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-qWcADcLC.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-tr": { "id": "legal-imprint-tr", "parentId": "root", "path": "tr/kunye", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-qWcADcLC.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-ru": { "id": "legal-privacy-ru", "parentId": "root", "path": "ru/privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-qWcADcLC.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-ru": { "id": "legal-imprint-ru", "parentId": "root", "path": "ru/impressum", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-qWcADcLC.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-cs": { "id": "legal-privacy-cs", "parentId": "root", "path": "cs/privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-qWcADcLC.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-cs": { "id": "legal-imprint-cs", "parentId": "root", "path": "cs/impressum", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-qWcADcLC.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-uk": { "id": "legal-privacy-uk", "parentId": "root", "path": "uk/privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-qWcADcLC.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-uk": { "id": "legal-imprint-uk", "parentId": "root", "path": "uk/impressum", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-qWcADcLC.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-ur": { "id": "legal-privacy-ur", "parentId": "root", "path": "ur/privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-qWcADcLC.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-ur": { "id": "legal-imprint-ur", "parentId": "root", "path": "ur/impressum", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-qWcADcLC.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-B52vbEmh.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-5d5cffc7.js", "version": "5d5cffc7", "sri": void 0 };
const assetsBuildDirectory = "build/public-react/client";
const basename = "/";
const future = { "unstable_enableNodeReadableStream": false, "unstable_optimizeDeps": false };
const ssr = false;
const isSpaMode = false;
const prerender = ["/", "/de/", "/fr/", "/tr/", "/ru/", "/cs/", "/uk/", "/ur/", "/pl/", "/nl/", "/ar/", "/sv/", "/health/", "/de/health/", "/fr/health/", "/tr/health/", "/ru/health/", "/cs/health/", "/uk/health/", "/ur/health/", "/pl/health/", "/nl/health/", "/ar/health/", "/sv/health/", "/clinic/", "/transfers/antalya/", "/transfers/belek/", "/transfers/side/", "/transfers/kemer/", "/transfers/alanya/", "/transfers/bogazkent/", "/transfers/manavgat/", "/transfers/kizilagac/", "/transfers/tekirova/", "/transfers/bodrum/", "/transfers/dalaman/", "/transfers/fethiye/", "/transfers/pamukkale/", "/transfers/kapadokya/", "/de/transfers/antalya/", "/de/transfers/belek/", "/de/transfers/side/", "/de/transfers/kemer/", "/de/transfers/alanya/", "/de/transfers/bogazkent/", "/de/transfers/manavgat/", "/de/transfers/kizilagac/", "/de/transfers/tekirova/", "/de/transfers/bodrum/", "/de/transfers/dalaman/", "/de/transfers/fethiye/", "/de/transfers/pamukkale/", "/de/transfers/kapadokya/", "/fr/transfers/antalya/", "/fr/transfers/belek/", "/fr/transfers/side/", "/fr/transfers/kemer/", "/fr/transfers/alanya/", "/fr/transfers/bogazkent/", "/fr/transfers/manavgat/", "/fr/transfers/kizilagac/", "/fr/transfers/tekirova/", "/fr/transfers/bodrum/", "/fr/transfers/dalaman/", "/fr/transfers/fethiye/", "/fr/transfers/pamukkale/", "/fr/transfers/kapadokya/", "/tr/transfers/antalya/", "/tr/transfers/belek/", "/tr/transfers/side/", "/tr/transfers/kemer/", "/tr/transfers/alanya/", "/tr/transfers/bogazkent/", "/tr/transfers/manavgat/", "/tr/transfers/kizilagac/", "/tr/transfers/tekirova/", "/tr/transfers/bodrum/", "/tr/transfers/dalaman/", "/tr/transfers/fethiye/", "/tr/transfers/pamukkale/", "/tr/transfers/kapadokya/", "/ru/transfers/antalya/", "/ru/transfers/belek/", "/ru/transfers/side/", "/ru/transfers/kemer/", "/ru/transfers/alanya/", "/ru/transfers/bogazkent/", "/ru/transfers/manavgat/", "/ru/transfers/kizilagac/", "/ru/transfers/tekirova/", "/ru/transfers/bodrum/", "/ru/transfers/dalaman/", "/ru/transfers/fethiye/", "/ru/transfers/pamukkale/", "/ru/transfers/kapadokya/", "/cs/transfers/antalya/", "/cs/transfers/belek/", "/cs/transfers/side/", "/cs/transfers/kemer/", "/cs/transfers/alanya/", "/cs/transfers/bogazkent/", "/cs/transfers/manavgat/", "/cs/transfers/kizilagac/", "/cs/transfers/tekirova/", "/cs/transfers/bodrum/", "/cs/transfers/dalaman/", "/cs/transfers/fethiye/", "/cs/transfers/pamukkale/", "/cs/transfers/kapadokya/", "/uk/transfers/antalya/", "/uk/transfers/belek/", "/uk/transfers/side/", "/uk/transfers/kemer/", "/uk/transfers/alanya/", "/uk/transfers/bogazkent/", "/uk/transfers/manavgat/", "/uk/transfers/kizilagac/", "/uk/transfers/tekirova/", "/uk/transfers/bodrum/", "/uk/transfers/dalaman/", "/uk/transfers/fethiye/", "/uk/transfers/pamukkale/", "/uk/transfers/kapadokya/", "/ur/transfers/antalya/", "/ur/transfers/belek/", "/ur/transfers/side/", "/ur/transfers/kemer/", "/ur/transfers/alanya/", "/ur/transfers/bogazkent/", "/ur/transfers/manavgat/", "/ur/transfers/kizilagac/", "/ur/transfers/tekirova/", "/ur/transfers/bodrum/", "/ur/transfers/dalaman/", "/ur/transfers/fethiye/", "/ur/transfers/pamukkale/", "/ur/transfers/kapadokya/", "/pl/transfers/antalya/", "/pl/transfers/belek/", "/pl/transfers/side/", "/pl/transfers/kemer/", "/pl/transfers/alanya/", "/pl/transfers/bogazkent/", "/pl/transfers/manavgat/", "/pl/transfers/kizilagac/", "/pl/transfers/tekirova/", "/pl/transfers/bodrum/", "/pl/transfers/dalaman/", "/pl/transfers/fethiye/", "/pl/transfers/pamukkale/", "/pl/transfers/kapadokya/", "/nl/transfers/antalya/", "/nl/transfers/belek/", "/nl/transfers/side/", "/nl/transfers/kemer/", "/nl/transfers/alanya/", "/nl/transfers/bogazkent/", "/nl/transfers/manavgat/", "/nl/transfers/kizilagac/", "/nl/transfers/tekirova/", "/nl/transfers/bodrum/", "/nl/transfers/dalaman/", "/nl/transfers/fethiye/", "/nl/transfers/pamukkale/", "/nl/transfers/kapadokya/", "/ar/transfers/antalya/", "/ar/transfers/belek/", "/ar/transfers/side/", "/ar/transfers/kemer/", "/ar/transfers/alanya/", "/ar/transfers/bogazkent/", "/ar/transfers/manavgat/", "/ar/transfers/kizilagac/", "/ar/transfers/tekirova/", "/ar/transfers/bodrum/", "/ar/transfers/dalaman/", "/ar/transfers/fethiye/", "/ar/transfers/pamukkale/", "/ar/transfers/kapadokya/", "/sv/transfers/antalya/", "/sv/transfers/belek/", "/sv/transfers/side/", "/sv/transfers/kemer/", "/sv/transfers/alanya/", "/sv/transfers/bogazkent/", "/sv/transfers/manavgat/", "/sv/transfers/kizilagac/", "/sv/transfers/tekirova/", "/sv/transfers/bodrum/", "/sv/transfers/dalaman/", "/sv/transfers/fethiye/", "/sv/transfers/pamukkale/", "/sv/transfers/kapadokya/", "/de/hotels/rixos-premium-belek/", "/de/hotels/the-land-of-legends/", "/de/hotels/maxx-royal-belek/", "/de/hotels/regnum-carya/", "/de/hotels/gloria-golf-resort/", "/de/hotels/cornelia-diamond-golf-resort/", "/de/hotels/ic-hotels-santai/", "/de/hotels/arum-barut-collection/", "/de/hotels/side-star-resort/", "/de/hotels/royal-dragon-hotel/", "/de/hotels/barut-hemera/", "/de/hotels/voyage-sorgun/", "/de/hotels/sentido-flora-garden/", "/de/hotels/crystal-sunset-luxury-resort/", "/de/hotels/rixos-premium-kemer/", "/de/hotels/maxx-royal-kemer/", "/de/hotels/orange-county-resort-kemer/", "/de/hotels/paloma-pasha-resort/", "/de/hotels/club-hotel-phaselis-rose/", "/de/hotels/utopia-world-hotel/", "/de/hotels/sentido-gold-island/", "/de/hotels/q-premium-resort/", "/de/hotels/kirman-arycanda/", "/de/hotels/delphin-diva/", "/de/hotels/rixos-premium-tekirova/", "/de/hotels/amara-prestige/", "/impressum.html", "/privacy/", "/de/datenschutz/", "/de/impressum/", "/tr/gizlilik/", "/tr/kunye/", "/ru/privacy/", "/ru/impressum/", "/cs/privacy/", "/cs/impressum/", "/uk/privacy/", "/uk/impressum/", "/ur/privacy/", "/ur/impressum/"];
const routeDiscovery = { "mode": "initial" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "home-en": {
    id: "home-en",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route12
  },
  "home-de": {
    id: "home-de",
    parentId: "root",
    path: "de",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "home-fr": {
    id: "home-fr",
    parentId: "root",
    path: "fr",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "home-tr": {
    id: "home-tr",
    parentId: "root",
    path: "tr",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "home-ru": {
    id: "home-ru",
    parentId: "root",
    path: "ru",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "home-cs": {
    id: "home-cs",
    parentId: "root",
    path: "cs",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "home-uk": {
    id: "home-uk",
    parentId: "root",
    path: "uk",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "home-ur": {
    id: "home-ur",
    parentId: "root",
    path: "ur",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "home-pl": {
    id: "home-pl",
    parentId: "root",
    path: "pl",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "home-nl": {
    id: "home-nl",
    parentId: "root",
    path: "nl",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "home-ar": {
    id: "home-ar",
    parentId: "root",
    path: "ar",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "home-sv": {
    id: "home-sv",
    parentId: "root",
    path: "sv",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "health-en": {
    id: "health-en",
    parentId: "root",
    path: "health",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "health-de": {
    id: "health-de",
    parentId: "root",
    path: "de/health",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "health-fr": {
    id: "health-fr",
    parentId: "root",
    path: "fr/health",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "health-tr": {
    id: "health-tr",
    parentId: "root",
    path: "tr/health",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "health-ru": {
    id: "health-ru",
    parentId: "root",
    path: "ru/health",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "health-cs": {
    id: "health-cs",
    parentId: "root",
    path: "cs/health",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "health-uk": {
    id: "health-uk",
    parentId: "root",
    path: "uk/health",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "health-ur": {
    id: "health-ur",
    parentId: "root",
    path: "ur/health",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "health-pl": {
    id: "health-pl",
    parentId: "root",
    path: "pl/health",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "health-nl": {
    id: "health-nl",
    parentId: "root",
    path: "nl/health",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "health-ar": {
    id: "health-ar",
    parentId: "root",
    path: "ar/health",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "health-sv": {
    id: "health-sv",
    parentId: "root",
    path: "sv/health",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "clinic-tr": {
    id: "clinic-tr",
    parentId: "root",
    path: "clinic",
    index: void 0,
    caseSensitive: void 0,
    module: route25
  },
  "transfer-en": {
    id: "transfer-en",
    parentId: "root",
    path: "transfers/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route27
  },
  "transfer-localized": {
    id: "transfer-localized",
    parentId: "root",
    path: ":language/transfers/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route27
  },
  "hotel-de": {
    id: "hotel-de",
    parentId: "root",
    path: "de/hotels/:hotelSlug",
    index: void 0,
    caseSensitive: void 0,
    module: route28
  },
  "legal-imprint-en": {
    id: "legal-imprint-en",
    parentId: "root",
    path: "impressum.html",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "legal-privacy-en": {
    id: "legal-privacy-en",
    parentId: "root",
    path: "privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "legal-privacy-de": {
    id: "legal-privacy-de",
    parentId: "root",
    path: "de/datenschutz",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "legal-imprint-de": {
    id: "legal-imprint-de",
    parentId: "root",
    path: "de/impressum",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "legal-privacy-tr": {
    id: "legal-privacy-tr",
    parentId: "root",
    path: "tr/gizlilik",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "legal-imprint-tr": {
    id: "legal-imprint-tr",
    parentId: "root",
    path: "tr/kunye",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "legal-privacy-ru": {
    id: "legal-privacy-ru",
    parentId: "root",
    path: "ru/privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "legal-imprint-ru": {
    id: "legal-imprint-ru",
    parentId: "root",
    path: "ru/impressum",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "legal-privacy-cs": {
    id: "legal-privacy-cs",
    parentId: "root",
    path: "cs/privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "legal-imprint-cs": {
    id: "legal-imprint-cs",
    parentId: "root",
    path: "cs/impressum",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "legal-privacy-uk": {
    id: "legal-privacy-uk",
    parentId: "root",
    path: "uk/privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "legal-imprint-uk": {
    id: "legal-imprint-uk",
    parentId: "root",
    path: "uk/impressum",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "legal-privacy-ur": {
    id: "legal-privacy-ur",
    parentId: "root",
    path: "ur/privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "legal-imprint-ur": {
    id: "legal-imprint-ur",
    parentId: "root",
    path: "ur/impressum",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
