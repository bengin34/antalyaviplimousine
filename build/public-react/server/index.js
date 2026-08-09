import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withHydrateFallbackProps, useMatches, Meta, Links, ScrollRestoration, Scripts, useLoaderData } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { createContext, useState, useEffect, useCallback, useMemo, useContext, useRef } from "react";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
    /* @__PURE__ */ jsx("symbol", { id: "icon-arrow-left", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M19 12H5M11 6l-6 6 6 6" }) })
  ] });
}
const siteStyles = "/assets/styles-DAQhsfs8.css";
const reactPublicStyles = "/assets/react-public-4amVxyGv.css";
const links = () => [{
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
    dir: language === "ar" ? "rtl" : "ltr",
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
  links
}, Symbol.toStringTag, { value: "Module" }));
const resources = /* @__PURE__ */ JSON.parse(`{"en":{"navFleet":"Fleet","navService":"Service","navFairPricing":"Fair Pricing","navRoutes":"Routes","navReviews":"Reviews","navContact":"Contact","bookNow":"Book now","alwaysAvailable":"Available 24 hours, every day","heroEyebrow":"Private chauffeur service · Antalya","campaignBadge":"Online special","campaignDiscount":"25% off","campaignScope":"all transfer prices","heroTitle":"Premium Airport<br />Transfers in Antalya","heroSubtitle":"Private chauffeur-driven transfers from Antalya Airport to Belek, Side, Kemer and Alanya.","bookTransfer":"Book your transfer","instantQuote":"Get instant quote","googleRated":"Google rated","trustedGuests":"Trusted by 2,500+ guests","discover":"Discover","tbLicensed":"TÜRSAB Licensed","tbFlightTracking":"Flight Tracking","tbFixedPrice":"Fixed Pricing","tb247Concierge":"24/7 Concierge","tbChildSeats":"Child Seats Included","privateJourney":"Your private journey","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Pick-up","airportOption":"Antalya Airport (AYT)","hotelOption":"Hotel","privateAddressOption":"Private address","destination":"Destination","selectDestination":"Select destination","vehicle":"Vehicle","guests":"Guests","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Choose time","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Full pick-up address","dropoffAddress":"Full drop-off address","luggageLabel":"Large luggage","hotelNameLabel":"Hotel name","childSeatLabel":"Child seats","childSeatNone":"No child seat","oneChildSeat":"1 child seat","twoChildSeats":"2 child seats","threeChildSeats":"3 child seats","fourChildSeats":"4 child seats","fullName":"Full name","phoneLabel":"Phone / WhatsApp","emailLabel":"Email","paymentMethod":"Choose payment method","cashPayment":"Pay in the vehicle","recommended":"Recommended","cashPaymentDescription":"No prepayment. Pay your driver directly once you are satisfied with the service.","quoteIncludes":"Includes meet & greet, flight tracking, parking, waiting time and bottled water.","confirmCashBooking":"Confirm booking — pay in vehicle","flightTracking":"Real-time flight tracking","fixedPrice":"Fixed price guarantee","meetGreet":"Personal meet & greet","speakingDrivers":"English & German speaking","fromAirport":"From Antalya Airport","campaignApplied":"Online -15% already applied","welcomeEyebrow":"Welcome to a better arrival","welcomeTitle":"Travel beautifully.<br />Arrive effortlessly.","welcomeBody":"From the moment your flight lands, every detail is considered. Your chauffeur waits inside arrivals, handles your luggage and guides you to a meticulously prepared private vehicle.","ourStandards":"Our service standards","concierge":"Concierge support","guestsWelcomed":"Guests welcomed","guestRating":"Average guest rating","privateTransfers":"Private transfers","fleetEyebrow":"The fleet","fleetTitle":"Your private space,<br />refined in every detail.","fleetIntro":"Travel in quiet comfort with generous space for your family, golf equipment and luggage.","signatureFleet":"Signature fleet","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Spacious VIP transport for larger groups, with generous room for passengers and luggage.","passengers":"passengers","suitcases":"suitcases","television":"In-vehicle television","coldDrinks":"Cold drinks","snacks":"Snacks","childSeats":"Child seat available","wifi":"Complimentary WiFi","nameSignGreeting":"Meet & greet with a personalised name sign","reserveVehicle":"Reserve this vehicle","insideVclass":"Inside the Sprinter","interiorTitle":"A private lounge between<br />the airport and your hotel.","serviceEyebrow":"The Antalya VIP standard","serviceTitle":"More than a transfer.<br />A considered welcome.","serviceIntro":"Hotel-level attention, experienced local chauffeurs and complete peace of mind from runway to resort.","trackingTitle":"Flight tracking","trackingBody":"We monitor your flight in real time and adjust your pick-up automatically, at no extra charge.","chauffeurTitle":"Professional chauffeurs","chauffeurBody":"Immaculately presented, discreet and selected for their local knowledge and service standards.","greetTitle":"Meet & greet","greetBody":"Your chauffeur will welcome you in arrivals with a personalised name sign and assist with luggage.","supportTitle":"24/7 concierge","supportBody":"A real person is always available by phone or WhatsApp before, during and after your journey.","priceTitle":"Fixed prices","priceBody":"The price confirmed is the price you pay. Waiting time, parking and flight delays are included.","familyTitle":"Family ready","familyBody":"Age-appropriate child seats, spacious cabins and patient assistance for a relaxed family arrival.","routesEyebrow":"Our most requested journeys","routesTitle":"From Antalya Airport<br />to the Turkish Riviera.","routesIntro":"All prices are per vehicle, never per passenger, with complimentary waiting time included.","discountPricesShown":"Online -15% prices shown","golfFavourite":"Golf favourite","onlineDiscountShort":"Online -25%","reviewsEyebrow":"Guest reviews","reviewsTitle":"Service remembered<br />long after arrival.","googleReviews":"Based on 387 verified Google reviews","trustedBy":"Trusted by guests of Antalya's leading resorts","processEyebrow":"Simple by design","processTitle":"Four steps to<br />a seamless arrival.","stepOne":"Choose destination","stepOneBody":"Tell us where and when you would like to travel.","stepTwo":"Select vehicle","stepTwoBody":"Choose the space and comfort that suits your party.","stepThree":"Confirm booking","stepThreeBody":"Receive instant confirmation with a fixed total price.","stepFour":"Meet your driver","stepFourBody":"Your chauffeur welcomes you inside the arrivals hall.","pricingEyebrow":"Peace of mind","pricingTitle":"Customer-friendly pricing.<br />You pay what's fair.","pricingIntro":"We offer fixed prices for peace of mind, but we measure the actual distance. You always pay whichever is lower.","pricingFixedPrice":"Fixed price","fixedPriceExample":"Belek transfer: €{{PRICE:belek:vito}}","fixedPriceDesc":"Guaranteed total. Includes airport fees, parking, waiting time and taxes.","distancePrice":"Distance-based","distancePriceExample":"24 km online example: €25","distancePriceDesc":"Measured with GPS during your journey.","youPay":"You pay","youPayPrice":"€25","youPayDesc":"Whichever is lower. Driver confirms at the end.","pricingNote":"No surprises. No hidden charges. What you book is what you pay — or less.","faqEyebrow":"Frequently asked","faqTitle":"Before you travel.","faqIntro":"Everything you need to know about your private Antalya airport transfer.","askQuestion":"Ask us a question","faqOneQ":"What happens if my flight is delayed?","faqOneA":"We track every arrival in real time. Your pick-up time is adjusted automatically and your chauffeur will wait at no additional charge.","faqTwoQ":"Where will I meet my chauffeur?","faqTwoA":"Your chauffeur will wait inside the arrivals hall, directly after baggage reclaim, holding a personalised name sign.","faqThreeQ":"Are child seats available?","faqThreeA":"Yes. Infant, toddler and booster seats are available free of charge when requested during booking.","faqFourQ":"Can you carry golf bags and large luggage?","faqFourA":"Yes. Our Sprinter and Vito vehicles are ideal for golf groups. Tell us your luggage details and we will allocate the correct vehicle.","faqFiveQ":"Is the quoted price final?","faqFiveA":"Yes. All airport fees, parking, waiting time and taxes are included. There are no hidden charges.","contactEyebrow":"Your journey starts here","contactTitle":"Arrive in Antalya<br />exceptionally well.","contactBody":"Book online in less than two minutes or speak directly with our 24/7 concierge team.","whatsappUs":"WhatsApp us","replyMinutes":"Usually replies within minutes","callUs":"Call us 24/7","emailUs":"Email concierge","replyHour":"Replies within one hour","footerTagline":"Private chauffeur services across the Turkish Riviera.","explore":"Explore","information":"Information","licensed":"Licensed private transfer operator · TÜRSAB compliant","bookingConfirmed":"Booking Confirmed","referenceLabel":"Reference","weWillContact":"Your booking request was sent. We will contact you within 30 minutes.","chatWithUs":"Chat with us","pickupAddressPlaceholder":"Hotel name, street, building number and district","dropoffAddressPlaceholder":"Hotel name, street, building number and district","hotelNamePlaceholder":"Hotel or accommodation name","cashConfirmation":"Your booking is confirmed. Pay the fixed total directly to your driver in the vehicle.","bookingError":"Your booking could not be completed. Please try again.","formIncomplete":"Please complete the highlighted fields.","requiredField":"This field is required.","destinationRequired":"Please select a destination.","dateInvalid":"Please choose today or a future date.","emailInvalid":"Please enter a valid email address.","nameInvalid":"Please enter a valid full name.","phoneInvalid":"Please enter a valid number including the country code (for example +49).","flightInvalid":"Please enter a valid flight number.","pickupAddressRequired":"The pick-up address must be between 6 and 160 characters.","dropoffAddressRequired":"The drop-off address must be between 6 and 160 characters.","addressesMustDiffer":"Pick-up and drop-off addresses must be different.","customDestinationPrice":"The price will be confirmed after we check the drop-off address.","hotelNameRequired":"Please enter the hotel name.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time."},"de":{"navFleet":"Fahrzeuge","navService":"Service","navFairPricing":"Faire Preise","navRoutes":"Strecken","navReviews":"Bewertungen","navContact":"Kontakt","bookNow":"Jetzt buchen","alwaysAvailable":"24 Stunden, jeden Tag erreichbar","heroEyebrow":"Privater Chauffeurservice · Antalya","campaignBadge":"Online Spezial","campaignDiscount":"15% Rabatt","campaignScope":"auf alle Transferpreise","heroTitle":"Premium Flughafentransfers<br />in Antalya","heroSubtitle":"Private Transfers mit Chauffeur vom Flughafen Antalya nach Belek, Side, Kemer und Alanya.","bookTransfer":"Transfer buchen","instantQuote":"Sofortpreis erhalten","googleRated":"Google-Bewertung","trustedGuests":"Von über 2.500 Gästen gebucht","discover":"Entdecken","tbLicensed":"TÜRSAB-zertifiziert","tbFlightTracking":"Flugverfolgung","tbFixedPrice":"Festpreisgarantie","tb247Concierge":"24/7 Concierge","tbChildSeats":"Kindersitze inklusive","privateJourney":"Ihre private Reise","tripType":"Fahrtart","oneWay":"Einfache Fahrt","roundTrip":"Hin- und Rückfahrt","roundTripHint":"Bei Hin- und Rückfahrt erfolgt die Rückfahrt auf derselben Strecke in umgekehrter Richtung.","pickup":"Abholung","airportOption":"Flughafen Antalya (AYT)","hotelOption":"Hotel","privateAddressOption":"Privatadresse","destination":"Zielort","selectDestination":"Ziel auswählen","vehicle":"Fahrzeug","guests":"Gäste","arrivalDate":"Ankunftsdatum","arrivalFlightTime":"Ankunftszeit des Fluges","chooseTime":"Uhrzeit wählen","arrivalFlightNumber":"Ankunftsflugnummer","returnDate":"Rückfahrtdatum","returnPickupTime":"Abholzeit der Rückfahrt","returnFlightNumber":"Rückflugnummer","pickupAddress":"Vollständige Abholadresse","dropoffAddress":"Vollständige Zieladresse","luggageLabel":"Großes Gepäck","hotelNameLabel":"Hotelname","childSeatLabel":"Kindersitze","childSeatNone":"Kein Kindersitz","oneChildSeat":"1 Kindersitz","twoChildSeats":"2 Kindersitze","threeChildSeats":"3 Kindersitze","fourChildSeats":"4 Kindersitze","fullName":"Vollständiger Name","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-Mail","paymentMethod":"Zahlungsart wählen","cashPayment":"Im Fahrzeug bezahlen","recommended":"Empfohlen","cashPaymentDescription":"Keine Vorauszahlung. Bezahlen Sie Ihren Fahrer direkt, wenn Sie mit dem Service zufrieden sind.","quoteIncludes":"Inklusive Meet & Greet, Flugverfolgung, Parken, Wartezeit und Mineralwasser.","confirmCashBooking":"Buchung bestätigen — im Fahrzeug zahlen","flightTracking":"Flugverfolgung in Echtzeit","fixedPrice":"Garantierter Festpreis","meetGreet":"Persönlicher Empfang","speakingDrivers":"Deutsch & Englisch sprechend","fromAirport":"Ab Flughafen Antalya","campaignApplied":"Online -15% bereits abgezogen","welcomeEyebrow":"Willkommen auf höchstem Niveau","welcomeTitle":"Stilvoll reisen.<br />Entspannt ankommen.","welcomeBody":"Ab Ihrer Landung ist jedes Detail organisiert. Ihr Chauffeur wartet in der Ankunftshalle, kümmert sich um Ihr Gepäck und begleitet Sie zu Ihrem sorgfältig vorbereiteten Privatfahrzeug.","ourStandards":"Unsere Servicestandards","concierge":"Concierge-Service","guestsWelcomed":"Begrüßte Gäste","guestRating":"Durchschnittliche Bewertung","privateTransfers":"Private Transfers","fleetEyebrow":"Unsere Flotte","fleetTitle":"Ihr privater Raum,<br />vollendet bis ins Detail.","fleetIntro":"Reisen Sie komfortabel mit großzügigem Platz für Familie, Golfgepäck und Koffer.","signatureFleet":"Signature Flotte","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Großzügiger VIP-Transport für größere Gruppen mit viel Platz für Passagiere und Gepäck.","passengers":"Passagiere","suitcases":"Koffer","television":"Fernseher im Fahrzeug","coldDrinks":"Kalte Getränke","snacks":"Snacks","childSeats":"Kindersitze auf Wunsch","wifi":"Kostenloses WLAN","nameSignGreeting":"Empfang mit persönlichem Namensschild","reserveVehicle":"Fahrzeug reservieren","insideVclass":"Im Sprinter Interieur","interiorTitle":"Eine private Lounge zwischen<br />Flughafen und Hotel.","serviceEyebrow":"Der Antalya VIP Standard","serviceTitle":"Mehr als ein Transfer.<br />Ein besonderer Empfang.","serviceIntro":"Aufmerksamkeit auf Hotelniveau, erfahrene lokale Chauffeure und absolute Sicherheit vom Flughafen bis zum Resort.","trackingTitle":"Flugverfolgung","trackingBody":"Wir verfolgen Ihren Flug in Echtzeit und passen die Abholung automatisch und kostenlos an.","chauffeurTitle":"Professionelle Chauffeure","chauffeurBody":"Stets gepflegt, diskret und ausgewählt für Ortskenntnis und höchsten Servicestandard.","greetTitle":"Meet & Greet","greetBody":"Ihr Chauffeur empfängt Sie mit Namensschild in der Ankunftshalle und hilft mit dem Gepäck.","supportTitle":"24/7 Concierge","supportBody":"Vor, während und nach Ihrer Reise ist immer ein persönlicher Ansprechpartner erreichbar.","priceTitle":"Festpreise","priceBody":"Der bestätigte Preis ist der Endpreis. Wartezeit, Parken und Flugverspätungen sind inklusive.","familyTitle":"Für Familien","familyBody":"Passende Kindersitze, großzügige Innenräume und geduldige Hilfe für eine entspannte Ankunft.","routesEyebrow":"Unsere beliebtesten Fahrten","routesTitle":"Vom Flughafen Antalya<br />an die Türkische Riviera.","routesIntro":"Alle Preise gelten pro Fahrzeug, nie pro Person. Kostenlose Wartezeit ist inklusive.","discountPricesShown":"Online -15% Preise angezeigt","golfFavourite":"Golf-Favorit","onlineDiscountShort":"Online -15%","reviewsEyebrow":"Gästebewertungen","reviewsTitle":"Service, der lange<br />in Erinnerung bleibt.","googleReviews":"Basierend auf 387 verifizierten Google-Bewertungen","trustedBy":"Gebucht von Gästen führender Resorts in Antalya","processEyebrow":"Bewusst einfach","processTitle":"Vier Schritte zur<br />entspannten Ankunft.","stepOne":"Ziel wählen","stepOneBody":"Sagen Sie uns, wohin und wann Sie reisen möchten.","stepTwo":"Fahrzeug auswählen","stepTwoBody":"Wählen Sie den passenden Raum und Komfort.","stepThree":"Buchung bestätigen","stepThreeBody":"Erhalten Sie sofort Ihre Bestätigung zum Festpreis.","stepFour":"Chauffeur treffen","stepFourBody":"Ihr Chauffeur empfängt Sie in der Ankunftshalle.","pricingEyebrow":"Sicher planen","pricingTitle":"Kundenfreundliche Preise.<br />Sie zahlen, was fair ist.","pricingIntro":"Wir bieten Festpreise für Planungssicherheit, messen aber die tatsächliche Strecke. Sie zahlen immer den niedrigeren Betrag.","pricingFixedPrice":"Festpreis","fixedPriceExample":"Transfer nach Belek: {{PRICE:belek:vito}} €","fixedPriceDesc":"Garantierter Gesamtpreis. Inklusive Flughafengebühren, Parken, Wartezeit und Steuern.","distancePrice":"Nach Strecke","distancePriceExample":"24 km Online-Beispiel: 25 €","distancePriceDesc":"Während Ihrer Fahrt per GPS gemessen.","youPay":"Sie zahlen","youPayPrice":"25 €","youPayDesc":"Der niedrigere Betrag gilt. Der Fahrer bestätigt ihn am Ende.","pricingNote":"Keine Überraschungen. Keine versteckten Gebühren. Was Sie buchen, zahlen Sie - oder weniger.","faqEyebrow":"Häufig gefragt","faqTitle":"Vor Ihrer Reise.","faqIntro":"Alles, was Sie über Ihren privaten Flughafentransfer in Antalya wissen müssen.","askQuestion":"Frage stellen","faqOneQ":"Was passiert bei einer Flugverspätung?","faqOneA":"Wir verfolgen jede Ankunft in Echtzeit. Ihre Abholzeit wird automatisch angepasst und Ihr Chauffeur wartet ohne Aufpreis.","faqTwoQ":"Wo treffe ich meinen Chauffeur?","faqTwoA":"Ihr Chauffeur wartet direkt hinter der Gepäckausgabe in der Ankunftshalle mit einem persönlichen Namensschild.","faqThreeQ":"Sind Kindersitze verfügbar?","faqThreeA":"Ja. Babyschalen, Kindersitze und Sitzerhöhungen sind bei Vorbestellung kostenlos verfügbar.","faqFourQ":"Können Golfbags und großes Gepäck transportiert werden?","faqFourA":"Ja. Sprinter und Vito sind ideal für Golfgruppen. Teilen Sie uns Ihr Gepäck mit und wir planen das passende Fahrzeug.","faqFiveQ":"Ist der angezeigte Preis endgültig?","faqFiveA":"Ja. Flughafengebühren, Parken, Wartezeit und Steuern sind inklusive. Es gibt keine versteckten Kosten.","contactEyebrow":"Ihre Reise beginnt hier","contactTitle":"Außergewöhnlich gut<br />in Antalya ankommen.","contactBody":"Buchen Sie in weniger als zwei Minuten online oder sprechen Sie direkt mit unserem 24/7 Concierge-Team.","whatsappUs":"WhatsApp","replyMinutes":"Antwort meist in wenigen Minuten","callUs":"24/7 anrufen","emailUs":"Concierge E-Mail","replyHour":"Antwort innerhalb einer Stunde","footerTagline":"Private Chauffeurservices an der gesamten Türkischen Riviera.","explore":"Entdecken","information":"Information","licensed":"Lizenzierter privater Transferanbieter · TÜRSAB-konform","bookingConfirmed":"Buchung bestätigt","referenceLabel":"Referenz","weWillContact":"Ihre Buchungsanfrage wurde gesendet. Wir melden uns innerhalb von 30 Minuten.","chatWithUs":"Mit uns chatten","pickupAddressPlaceholder":"Hotelname, Straße, Hausnummer und Stadtteil","dropoffAddressPlaceholder":"Hotelname, Straße, Hausnummer und Stadtteil","hotelNamePlaceholder":"Hotel- oder Unterkunftsname","cashConfirmation":"Ihre Buchung ist bestätigt. Zahlen Sie den Festpreis direkt beim Fahrer im Fahrzeug.","bookingError":"Ihre Buchung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.","formIncomplete":"Bitte füllen Sie die markierten Felder aus.","requiredField":"Dieses Feld ist erforderlich.","destinationRequired":"Bitte wählen Sie ein Ziel.","dateInvalid":"Bitte wählen Sie heute oder ein zukünftiges Datum.","emailInvalid":"Bitte geben Sie eine gültige E-Mail-Adresse ein.","nameInvalid":"Bitte geben Sie einen gültigen vollständigen Namen ein.","phoneInvalid":"Bitte geben Sie eine gültige Nummer mit Ländervorwahl ein (zum Beispiel +49).","flightInvalid":"Bitte geben Sie eine gültige Flugnummer ein.","pickupAddressRequired":"Die Abholadresse muss zwischen 6 und 160 Zeichen lang sein.","dropoffAddressRequired":"Die Zieladresse muss zwischen 6 und 160 Zeichen lang sein.","addressesMustDiffer":"Abhol- und Zieladresse müssen unterschiedlich sein.","customDestinationPrice":"Der Preis wird nach Prüfung der Zieladresse bestätigt.","hotelNameRequired":"Bitte geben Sie den Hotelnamen ein.","roundTripPriceNote":"Hin- und Rückfahrt · 2 Fahrten","returnDateRequired":"Bitte wählen Sie ein Rückfahrtdatum.","returnDateInvalid":"Bitte wählen Sie ein Rückfahrtdatum am oder nach dem Datum der Hinfahrt.","returnTimeRequired":"Bitte wählen Sie die Abholzeit für die Rückfahrt.","quoteTitle":"Wohin dürfen wir Sie bringen?","date":"Datum","airportReturnPrice":"Der Preis wird nach Prüfung des Hotels oder der Abholadresse bestätigt.","oneGuest":"1 Gast","twoGuests":"2 Gäste","threeGuests":"3 Gäste","fourGuests":"4 Gäste","fiveGuests":"5 Gäste","sixGuests":"6 Gäste","sevenGuests":"7 Gäste","viewQuote":"Preis anzeigen","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Eine komfortable Privatkabine für Familien und kleine Gruppen.","capacitySwitchedSprinter":"Passagiere und Gepäck übersteigen den Vito — auf Mercedes Sprinter umgestellt.","capacityNoVehicle":"So viele Passagiere und Gepäck übersteigen unsere Fahrzeuge. Bitte kontaktieren Sie uns per WhatsApp.","leatherSeats":"Premium-Ledersitze","water":"Gekühltes Mineralwasser","from":"Ab","reviewOne":"„Unser Fahrer wartete trotz 90 Minuten Flugverspätung. Das Fahrzeug war makellos, angenehm kühl und bereits mit beiden Kindersitzen ausgestattet. Genau der Empfang, den unsere Familie brauchte.“","reviewTwo":"„Vom ersten WhatsApp-Kontakt bis zur Ankunft in Belek absolut erstklassig. Pünktlich, diskret und sehr professionell. Auch unsere Golftaschen hatten bequem Platz.“","reviewThree":"„Das fühlte sich wie der Chauffeurservice eines Hotels an, nicht wie ein Flughafentaxi. Klare Kommunikation, ein makelloses Fahrzeug und ein aufrichtig höflicher Fahrer.“","perVehicle":"pro Fahrzeug · Festpreis","quoteReady":"Ihr privater Transfer","journeyTime":"Fahrzeit","totalFixed":"Gesamtpreis","confirmWhatsapp":"Über WhatsApp bestätigen","bookNowCta":"Jetzt buchen","backToQuote":"Zurück","yourDetails":"Ihre Daten","flightNumber":"Flugnummer","flightArrivalTime":"Ankunftszeit","notesLabel":"Besondere Wünsche","confirmBooking":"Buchung bestätigen","paySecurely":"Weiter zur sicheren Zahlung","payLaterNote":"Sichere Online-Zahlung nach Bestätigung.","paymentTitle":"Sichere Zahlung","paymentError":"Zahlung fehlgeschlagen. Bitte erneut versuchen."},"tr":{"navFleet":"Araçlar","navService":"Hizmetler","navFairPricing":"Adil fiyat","navRoutes":"Rotalar","navReviews":"Yorumlar","navContact":"İletişim","bookNow":"Hemen rezervasyon","alwaysAvailable":"Her gün 24 saat hizmetinizdeyiz","heroEyebrow":"Özel şoför hizmeti · Antalya","campaignBadge":"Online'a özel","campaignDiscount":"%15 indirim","campaignScope":"tüm transfer fiyatlarında","heroTitle":"Antalya'da Premium<br />Havalimanı Transferi","heroSubtitle":"Antalya Havalimanı'ndan Belek, Side, Kemer ve Alanya'ya özel şoförlü transfer.","bookTransfer":"Transferinizi ayırtın","instantQuote":"Anında fiyat alın","googleRated":"Google puanı","trustedGuests":"2.500'den fazla misafirin tercihi","discover":"Keşfedin","tbLicensed":"TÜRSAB Lisanslı","tbFlightTracking":"Uçuş Takibi","tbFixedPrice":"Sabit Fiyat","tb247Concierge":"7/24 Concierge","tbChildSeats":"Çocuk Koltuğu Dahil","privateJourney":"Size özel yolculuk","tripType":"Yolculuk türü","oneWay":"Tek yön","roundTrip":"Gidiş–dönüş","roundTripHint":"Gidiş–dönüş rezervasyonunda dönüş, aynı rotanın ters yönünde gerçekleşir.","pickup":"Alış noktası","airportOption":"Antalya Havalimanı (AYT)","hotelOption":"Otel","privateAddressOption":"Özel adres","destination":"Varış noktası","selectDestination":"Varış noktası seçin","vehicle":"Araç","guests":"Misafir","arrivalDate":"Geliş tarihi","arrivalFlightTime":"Geliş uçuş saati","chooseTime":"Saat seçin","arrivalFlightNumber":"Geliş uçuş numarası","returnDate":"Dönüş tarihi","returnPickupTime":"Dönüş alış saati","returnFlightNumber":"Dönüş uçuş numarası","pickupAddress":"Tam alış adresi","dropoffAddress":"Tam varış adresi","luggageLabel":"Büyük bavul","hotelNameLabel":"Otel ismi","childSeatLabel":"Çocuk koltuğu","childSeatNone":"Çocuk koltuğu istemiyorum","oneChildSeat":"1 çocuk koltuğu","twoChildSeats":"2 çocuk koltuğu","threeChildSeats":"3 çocuk koltuğu","fourChildSeats":"4 çocuk koltuğu","fullName":"Ad Soyad","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-posta","paymentMethod":"Ödeme yöntemini seçin","cashPayment":"Araçta öde","recommended":"Önerilen","cashPaymentDescription":"Ön ödeme yok. Hizmetten memnun kaldığınızda ödemenizi doğrudan şoförünüze yapın.","quoteIncludes":"Karşılama, uçuş takibi, otopark, bekleme süresi ve şişe su dahildir.","confirmCashBooking":"Rezervasyonu onayla — araçta öde","flightTracking":"Gerçek zamanlı uçuş takibi","fixedPrice":"Sabit fiyat garantisi","meetGreet":"Kişisel karşılama","speakingDrivers":"İngilizce ve Almanca konuşan şoförler","fromAirport":"Antalya Havalimanı'ndan","campaignApplied":"Online -%15 indirim uygulanmıştır","welcomeEyebrow":"Daha iyi bir karşılamaya hoş geldiniz","welcomeTitle":"Zarafetle seyahat edin.<br />Rahatça varın.","welcomeBody":"Uçağınız indiği andan itibaren her ayrıntı düşünülür. Şoförünüz gelen yolcu salonunda bekler, bagajınızla ilgilenir ve sizi özenle hazırlanmış özel aracınıza götürür.","ourStandards":"Hizmet standartlarımız","concierge":"Concierge desteği","guestsWelcomed":"Karşılanan misafir","guestRating":"Ortalama misafir puanı","privateTransfers":"Özel transfer","fleetEyebrow":"Araç filomuz","fleetTitle":"Size özel alan,<br />her ayrıntıda kusursuz.","fleetIntro":"Aileniz, golf ekipmanınız ve bagajınız için geniş alan sunan sessiz bir konforla seyahat edin.","signatureFleet":"Seçkin filo","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Kalabalık gruplar için geniş yolcu ve bagaj alanı sunan VIP ulaşım.","passengers":"yolcu","suitcases":"bavul","television":"Araç içi televizyon","coldDrinks":"Soğuk içecekler","snacks":"Atıştırmalıklar","childSeats":"Talep üzerine çocuk koltuğu","wifi":"Ücretsiz WiFi","nameSignGreeting":"İsminize özel tabela ile karşılama","reserveVehicle":"Bu aracı ayırtın","insideVclass":"Sprinter'ın içinde","interiorTitle":"Havalimanı ile oteliniz arasında<br />size özel bir lounge.","serviceEyebrow":"Antalya VIP standardı","serviceTitle":"Transferden fazlası.<br />Özenli bir karşılama.","serviceIntro":"Havalimanından otele kadar beş yıldızlı ilgi, deneyimli yerel şoförler ve tam huzur.","trackingTitle":"Uçuş takibi","trackingBody":"Uçuşunuzu gerçek zamanlı takip eder, alış saatinizi hiçbir ek ücret olmadan otomatik olarak ayarlarız.","chauffeurTitle":"Profesyonel şoförler","chauffeurBody":"Bakımlı, gizliliğe önem veren ve yerel bilgisi ile hizmet kalitesi için seçilmiş profesyoneller.","greetTitle":"Karşılama hizmeti","greetBody":"Şoförünüz sizi gelen yolcu salonunda isminizin yazılı olduğu tabela ile karşılar ve bagajınıza yardımcı olur.","supportTitle":"7/24 concierge","supportBody":"Yolculuğunuzdan önce, yolculuk sırasında ve sonrasında telefon veya WhatsApp üzerinden gerçek bir kişiye ulaşabilirsiniz.","priceTitle":"Sabit fiyatlar","priceBody":"Onaylanan fiyat ödeyeceğiniz nihai fiyattır. Bekleme, otopark ve uçuş gecikmeleri dahildir.","familyTitle":"Ailelere hazır","familyBody":"Yaşa uygun çocuk koltukları, geniş kabinler ve rahat bir aile karşılaması için özenli destek.","routesEyebrow":"En çok tercih edilen yolculuklar","routesTitle":"Antalya Havalimanı'ndan<br />Türk Rivierası'na.","routesIntro":"Tüm fiyatlar kişi başı değil, araç başıdır ve ücretsiz bekleme süresi dahildir.","discountPricesShown":"Online -%15 fiyatlar gösteriliyor","golfFavourite":"Golf misafirlerinin favorisi","onlineDiscountShort":"Online -%15","reviewsEyebrow":"Misafir yorumları","reviewsTitle":"Varıştan sonra da<br />hatırlanan hizmet.","googleReviews":"Doğrulanmış 387 Google yorumuna göre","trustedBy":"Antalya'nın önde gelen resort misafirlerinin tercihi","processEyebrow":"Sade ve kolay","processTitle":"Kusursuz bir varış için<br />dört adım.","stepOne":"Varış noktasını seçin","stepOneBody":"Nereye ve ne zaman seyahat etmek istediğinizi belirtin.","stepTwo":"Aracınızı seçin","stepTwoBody":"Grubunuza uygun alanı ve konforu seçin.","stepThree":"Rezervasyonu onaylayın","stepThreeBody":"Sabit toplam fiyatla anında onay alın.","stepFour":"Şoförünüzle buluşun","stepFourBody":"Şoförünüz sizi gelen yolcu salonunda karşılar.","pricingEyebrow":"İçiniz rahat olsun","pricingTitle":"Müşteri dostu fiyatlandırma.<br />Adil olanı ödersiniz.","pricingIntro":"İçiniz rahat etsin diye sabit fiyat sunarız, ancak gerçek mesafeyi de ölçeriz. Her zaman düşük olan tutarı ödersiniz.","pricingFixedPrice":"Sabit fiyat","fixedPriceExample":"Belek transferi: €{{PRICE:belek:vito}}","fixedPriceDesc":"Garantili toplam tutar. Havalimanı ücretleri, otopark, bekleme süresi ve vergiler dahildir.","distancePrice":"Mesafeye göre","distancePriceExample":"24 km online örnek: €25","distancePriceDesc":"Yolculuğunuz sırasında GPS ile ölçülür.","youPay":"Ödeyeceğiniz tutar","youPayPrice":"€25","youPayDesc":"Hangisi daha düşükse. Şoför yolculuk sonunda teyit eder.","pricingNote":"Sürpriz yok. Gizli ücret yok. Rezervasyonda gördüğünüz tutarı ödersiniz - ya da daha azını.","faqEyebrow":"Sık sorulanlar","faqTitle":"Seyahatinizden önce.","faqIntro":"Antalya'daki özel havalimanı transferiniz hakkında bilmeniz gereken her şey.","askQuestion":"Bize sorun","faqOneQ":"Uçağım gecikirse ne olur?","faqOneA":"Tüm uçuşları gerçek zamanlı takip ederiz. Alış saatiniz otomatik olarak güncellenir ve şoförünüz ek ücret olmadan bekler.","faqTwoQ":"Şoförümle nerede buluşacağım?","faqTwoA":"Şoförünüz bagaj tesliminden hemen sonra gelen yolcu salonunda, isminizin yazılı olduğu tabela ile bekler.","faqThreeQ":"Çocuk koltuğu var mı?","faqThreeA":"Evet. Bebek koltuğu, çocuk koltuğu ve yükseltici koltuk rezervasyon sırasında ücretsiz olarak talep edilebilir.","faqFourQ":"Golf çantası ve büyük bagaj taşıyor musunuz?","faqFourA":"Evet. Sprinter ve Vito araçlarımız golf grupları için idealdir. Bagaj bilgilerinizi paylaşın, uygun aracı planlayalım.","faqFiveQ":"Verilen fiyat kesin mi?","faqFiveA":"Evet. Havalimanı ücretleri, otopark, bekleme süresi ve vergiler dahildir. Gizli ücret yoktur.","contactEyebrow":"Yolculuğunuz burada başlar","contactTitle":"Antalya'ya ayrıcalıklı<br />bir şekilde varın.","contactBody":"İki dakikadan kısa sürede online rezervasyon yapın veya 7/24 concierge ekibimizle doğrudan görüşün.","whatsappUs":"WhatsApp'tan yazın","replyMinutes":"Genellikle birkaç dakika içinde yanıt veririz","callUs":"7/24 arayın","emailUs":"Concierge e-postası","replyHour":"Bir saat içinde yanıt","footerTagline":"Türk Rivierası genelinde özel şoför hizmetleri.","explore":"Keşfedin","information":"Bilgi","licensed":"Lisanslı özel transfer işletmesi · TÜRSAB standartlarına uygun","bookingConfirmed":"Rezervasyon Onaylandı","referenceLabel":"Referans","weWillContact":"Rezervasyon talebiniz gönderildi. 30 dakika içinde sizinle iletişime geçeceğiz.","chatWithUs":"Bize yazın","pickupAddressPlaceholder":"Otel adı, cadde, bina numarası ve ilçe","dropoffAddressPlaceholder":"Otel adı, cadde, bina numarası ve ilçe","hotelNamePlaceholder":"Otel veya konaklama adı","cashConfirmation":"Rezervasyonunuz onaylandı. Sabit toplam tutarı araçta doğrudan şoförünüze ödeyin.","bookingError":"Rezervasyonunuz tamamlanamadı. Lütfen tekrar deneyin.","formIncomplete":"Lütfen işaretli alanları doldurun.","requiredField":"Bu alan zorunludur.","destinationRequired":"Lütfen bir varış noktası seçin.","dateInvalid":"Lütfen bugünü veya gelecekteki bir tarihi seçin.","emailInvalid":"Lütfen geçerli bir e-posta adresi girin.","nameInvalid":"Lütfen geçerli bir ad soyad girin.","phoneInvalid":"Lütfen ülke koduyla birlikte geçerli bir numara girin (örneğin +49).","flightInvalid":"Lütfen geçerli bir uçuş numarası girin.","pickupAddressRequired":"Alış adresi 6–160 karakter arasında olmalıdır.","dropoffAddressRequired":"Varış adresi 6–160 karakter arasında olmalıdır.","addressesMustDiffer":"Alış ve varış adresleri farklı olmalıdır.","customDestinationPrice":"Fiyat, varış adresi kontrol edildikten sonra teyit edilecektir.","hotelNameRequired":"Lütfen otel ismini girin.","roundTripPriceNote":"gidiş–dönüş · 2 yolculuk","returnDateRequired":"Lütfen dönüş tarihini seçin.","returnDateInvalid":"Lütfen gidiş tarihiyle aynı veya daha sonraki bir dönüş tarihi seçin.","returnTimeRequired":"Lütfen dönüş için alış saatini seçin.","quoteTitle":"Sizi nereye götürelim?","date":"Tarih","airportReturnPrice":"Fiyat, otel veya alış adresi kontrol edildikten sonra teyit edilecektir.","oneGuest":"1 misafir","twoGuests":"2 misafir","threeGuests":"3 misafir","fourGuests":"4 misafir","fiveGuests":"5 misafir","sixGuests":"6 misafir","sevenGuests":"7 misafir","viewQuote":"Fiyatı görüntüle","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Aileler ve küçük gruplar için konforlu ve özel bir kabin.","capacitySwitchedSprinter":"Yolcu ve bagajınız Vito kapasitesini aşıyor — Mercedes Sprinter'a geçildi.","capacityNoVehicle":"Bu kadar yolcu ve bavul araçlarımızın kapasitesini aşıyor. Lütfen WhatsApp'tan bize ulaşın.","leatherSeats":"Premium deri koltuklar","water":"Soğuk şişe su","from":"Başlangıç","reviewOne":"“Uçağımız 90 dakika gecikmesine rağmen şoförümüz bizi bekliyordu. Aracımız kusursuz, serin ve iki çocuk koltuğu da hazırdı. Ailemizin tam olarak ihtiyaç duyduğu karşılamaydı.”","reviewTwo":"“İlk WhatsApp görüşmesinden Belek'e varışımıza kadar her şey birinci sınıftı. Dakik, gizliliğe önem veren ve son derece profesyonel. Golf çantalarımız da rahatça sığdı.”","reviewThree":"“Bu bir havalimanı taksisinden çok beş yıldızlı otel şoför hizmeti gibiydi. Net iletişim, tertemiz araç ve gerçekten nazik bir şoför.”","perVehicle":"araç başı · sabit fiyat","quoteReady":"Size özel transfer","journeyTime":"Yolculuk süresi","totalFixed":"Toplam sabit fiyat","confirmWhatsapp":"WhatsApp ile onaylayın","bookNowCta":"Rezervasyon yap","backToQuote":"Geri","yourDetails":"Bilgileriniz","flightNumber":"Uçuş numarası","flightArrivalTime":"Varış saati","notesLabel":"Özel istekler","confirmBooking":"Rezervasyonu onayla","paySecurely":"Güvenli ödemeye geç","payLaterNote":"Onay sonrası güvenli online ödeme.","paymentTitle":"Güvenli Ödeme","paymentError":"Ödeme başarısız. Lütfen tekrar deneyin."},"ru":{"navFleet":"Автопарк","navService":"Сервис","navFairPricing":"Честная цена","navRoutes":"Маршруты","navReviews":"Отзывы","navContact":"Контакты","bookNow":"Забронировать","alwaysAvailable":"Мы на связи круглосуточно, каждый день","heroEyebrow":"Персональный шофёр · Анталья","campaignBadge":"Онлайн-акция","campaignDiscount":"скидка 15%","campaignScope":"на все трансферы","heroTitle":"Премиальный трансфер<br />из аэропорта Антальи","heroSubtitle":"Индивидуальные трансферы с водителем из аэропорта Антальи в Белек, Сиде, Кемер и Аланью.","bookTransfer":"Забронировать трансфер","instantQuote":"Узнать цену","googleRated":"Рейтинг Google","trustedGuests":"Нам доверяют более 2 500 гостей","discover":"Подробнее","tbLicensed":"Лицензия TÜRSAB","tbFlightTracking":"Отслеживание рейса","tbFixedPrice":"Фиксированная цена","tb247Concierge":"Консьерж 24/7","tbChildSeats":"Детские кресла в комплекте","privateJourney":"Ваша частная поездка","tripType":"Тип поездки","oneWay":"В одну сторону","roundTrip":"Туда и обратно","roundTripHint":"Обратная поездка проходит по тому же маршруту в обратном направлении.","pickup":"Место встречи","airportOption":"Аэропорт Антальи (AYT)","hotelOption":"Отель","privateAddressOption":"Частный адрес","destination":"Направление","selectDestination":"Выберите направление","vehicle":"Автомобиль","guests":"Гости","arrivalDate":"Дата прибытия","arrivalFlightTime":"Время прибытия рейса","chooseTime":"Выберите время","arrivalFlightNumber":"Номер рейса прибытия","returnDate":"Дата возвращения","returnPickupTime":"Время подачи на обратный путь","returnFlightNumber":"Номер обратного рейса","pickupAddress":"Полный адрес подачи","dropoffAddress":"Полный адрес назначения","luggageLabel":"Крупный багаж","hotelNameLabel":"Название отеля","childSeatLabel":"Детские кресла","childSeatNone":"Без детского кресла","oneChildSeat":"1 детское кресло","twoChildSeats":"2 детских кресла","threeChildSeats":"3 детских кресла","fourChildSeats":"4 детских кресла","fullName":"Имя и фамилия","phoneLabel":"Телефон / WhatsApp","emailLabel":"Эл. почта","paymentMethod":"Выберите способ оплаты","cashPayment":"Оплата в автомобиле","recommended":"Рекомендуем","cashPaymentDescription":"Без предоплаты. Оплатите услугу непосредственно водителю, когда останетесь довольны обслуживанием.","quoteIncludes":"Включены встреча, отслеживание рейса, парковка, ожидание и питьевая вода.","confirmCashBooking":"Подтвердить — оплата в автомобиле","flightTracking":"Отслеживание рейса","fixedPrice":"Гарантия фиксированной цены","meetGreet":"Персональная встреча","speakingDrivers":"Водители говорят на английском и немецком","fromAirport":"Из аэропорта Антальи","campaignApplied":"Онлайн -15% уже применено","welcomeEyebrow":"Добро пожаловать на новый уровень сервиса","welcomeTitle":"Путешествуйте красиво.<br />Прибывайте без забот.","welcomeBody":"С момента посадки вашего самолёта мы продумываем каждую деталь. Шофёр встретит вас в зале прилёта, поможет с багажом и проводит к подготовленному автомобилю.","ourStandards":"Наши стандарты сервиса","concierge":"Поддержка консьержа","guestsWelcomed":"Встреченных гостей","guestRating":"Средняя оценка гостей","privateTransfers":"Частные трансферы","fleetEyebrow":"Наш автопарк","fleetTitle":"Ваше личное пространство,<br />безупречное в деталях.","fleetIntro":"Путешествуйте в тишине и комфорте: достаточно места для семьи, багажа и оборудования для гольфа.","signatureFleet":"Фирменный автопарк","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Эталон комфортных групповых поездок: просторный, исключительно тихий салон и всё необходимое для беззаботного прибытия.","passengers":"пассажиров","suitcases":"чемоданов","television":"Телевизор в автомобиле","coldDrinks":"Холодные напитки","snacks":"Закуски","childSeats":"Детские кресла по запросу","wifi":"Бесплатный WiFi","nameSignGreeting":"Встреча с именной табличкой","reserveVehicle":"Забронировать автомобиль","insideVclass":"Салон Sprinter","interiorTitle":"Персональный лаунж<br />между аэропортом и отелем.","serviceEyebrow":"Стандарт Antalya VIP","serviceTitle":"Больше, чем трансфер.<br />Продуманная встреча.","serviceIntro":"Внимание уровня пятизвёздочного отеля, опытные местные шофёры и спокойствие от аэропорта до курорта.","trackingTitle":"Отслеживание рейса","trackingBody":"Мы отслеживаем ваш рейс в реальном времени и автоматически корректируем время встречи без доплаты.","chauffeurTitle":"Профессиональные шофёры","chauffeurBody":"Безупречный внешний вид, деликатность, знание региона и высокие стандарты обслуживания.","greetTitle":"Встреча в аэропорту","greetBody":"Шофёр встретит вас в зале прилёта с именной табличкой и поможет с багажом.","supportTitle":"Консьерж 24/7","supportBody":"До, во время и после поездки вам всегда ответит человек по телефону или в WhatsApp.","priceTitle":"Фиксированные цены","priceBody":"Подтверждённая цена является окончательной. Ожидание, парковка и задержка рейса уже включены.","familyTitle":"Для всей семьи","familyBody":"Детские кресла по возрасту, просторный салон и внимательная помощь для спокойного семейного приезда.","routesEyebrow":"Самые популярные поездки","routesTitle":"Из аэропорта Антальи<br />на Турецкую Ривьеру.","routesIntro":"Все цены указаны за автомобиль, а не за пассажира. Бесплатное ожидание включено.","discountPricesShown":"Показаны цены онлайн -15%","golfFavourite":"Выбор игроков в гольф","onlineDiscountShort":"Онлайн -15%","reviewsEyebrow":"Отзывы гостей","reviewsTitle":"Сервис, который помнят<br />после прибытия.","googleReviews":"На основе 387 подтверждённых отзывов Google","trustedBy":"Нам доверяют гости ведущих курортов Антальи","processEyebrow":"Продуманная простота","processTitle":"Четыре шага<br />к комфортному прибытию.","stepOne":"Выберите направление","stepOneBody":"Сообщите нам, куда и когда вы хотите поехать.","stepTwo":"Выберите автомобиль","stepTwoBody":"Подберите пространство и комфорт для вашей компании.","stepThree":"Подтвердите бронирование","stepThreeBody":"Сразу получите подтверждение с фиксированной ценой.","stepFour":"Встретьте водителя","stepFourBody":"Ваш шофёр встретит вас в зале прилёта.","pricingEyebrow":"Спокойствие в поездке","pricingTitle":"Цены в интересах клиента.<br />Вы платите справедливую сумму.","pricingIntro":"Мы предлагаем фиксированные цены для спокойствия, но измеряем фактическое расстояние. Вы всегда платите меньшую сумму.","pricingFixedPrice":"Фиксированная цена","fixedPriceExample":"Трансфер в Белек: {{PRICE:belek:vito}} €","fixedPriceDesc":"Гарантированная итоговая сумма. Включены сборы аэропорта, парковка, ожидание и налоги.","distancePrice":"По расстоянию","distancePriceExample":"24 км онлайн-пример: 25 €","distancePriceDesc":"Измеряется по GPS во время поездки.","youPay":"Вы платите","youPayPrice":"25 €","youPayDesc":"Применяется меньшая сумма. Водитель подтвердит её в конце.","pricingNote":"Без сюрпризов. Без скрытых платежей. Вы платите указанную при бронировании сумму - или меньше.","faqEyebrow":"Частые вопросы","faqTitle":"Перед поездкой.","faqIntro":"Всё, что нужно знать о частном трансфере из аэропорта Антальи.","askQuestion":"Задать вопрос","faqOneQ":"Что произойдёт, если мой рейс задержится?","faqOneA":"Мы отслеживаем каждый рейс в реальном времени. Время встречи корректируется автоматически, а водитель ждёт без дополнительной платы.","faqTwoQ":"Где я встречу водителя?","faqTwoA":"Ваш шофёр будет ждать в зале прилёта сразу после выдачи багажа с именной табличкой.","faqThreeQ":"Есть ли детские кресла?","faqThreeA":"Да. Автолюльки, детские кресла и бустеры предоставляются бесплатно по запросу при бронировании.","faqFourQ":"Можно ли взять сумки для гольфа и крупный багаж?","faqFourA":"Да. Sprinter и Vito идеально подходят для групп игроков в гольф. Сообщите объём багажа, и мы подберём автомобиль.","faqFiveQ":"Указанная цена окончательная?","faqFiveA":"Да. Аэропортовые сборы, парковка, ожидание и налоги включены. Скрытых платежей нет.","contactEyebrow":"Ваше путешествие начинается здесь","contactTitle":"Прибудьте в Анталью<br />исключительно комфортно.","contactBody":"Забронируйте онлайн менее чем за две минуты или свяжитесь с нашей службой консьержа 24/7.","whatsappUs":"Написать в WhatsApp","replyMinutes":"Обычно отвечаем за несколько минут","callUs":"Позвонить 24/7","emailUs":"Написать консьержу","replyHour":"Ответ в течение часа","footerTagline":"Частные услуги шофёра по всей Турецкой Ривьере.","explore":"Разделы","information":"Информация","licensed":"Лицензированный оператор частных трансферов · Соответствует требованиям TÜRSAB","bookingConfirmed":"Бронирование подтверждено","referenceLabel":"Референс","weWillContact":"Ваш запрос на бронирование отправлен. Мы свяжемся с вами в течение 30 минут.","chatWithUs":"Написать нам","pickupAddressPlaceholder":"Название отеля, улица, номер дома и район","dropoffAddressPlaceholder":"Название отеля, улица, номер дома и район","hotelNamePlaceholder":"Название отеля или места проживания","cashConfirmation":"Бронирование подтверждено. Оплатите фиксированную сумму водителю в автомобиле.","bookingError":"Не удалось завершить бронирование. Попробуйте ещё раз.","formIncomplete":"Заполните выделенные поля.","requiredField":"Это поле обязательно.","destinationRequired":"Выберите направление.","dateInvalid":"Выберите сегодняшнюю или будущую дату.","emailInvalid":"Введите действительный адрес электронной почты.","nameInvalid":"Введите действительное полное имя.","phoneInvalid":"Введите действительный номер с кодом страны (например, +49).","flightInvalid":"Введите действительный номер рейса.","pickupAddressRequired":"Адрес подачи должен содержать от 6 до 160 символов.","dropoffAddressRequired":"Адрес назначения должен содержать от 6 до 160 символов.","addressesMustDiffer":"Адреса подачи и назначения должны отличаться.","customDestinationPrice":"Цена будет подтверждена после проверки адреса назначения.","hotelNameRequired":"Введите название отеля.","roundTripPriceNote":"туда и обратно · 2 поездки","returnDateRequired":"Выберите дату возвращения.","returnDateInvalid":"Дата возвращения должна совпадать с датой поездки туда или быть позже.","returnTimeRequired":"Выберите время подачи на обратный путь.","quoteTitle":"Куда вас отвезти?","date":"Дата","airportReturnPrice":"Цена будет подтверждена после проверки отеля или адреса подачи.","oneGuest":"1 гость","twoGuests":"2 гостя","threeGuests":"3 гостя","fourGuests":"4 гостя","fiveGuests":"5 гостей","sixGuests":"6 гостей","sevenGuests":"7 гостей","viewQuote":"Показать цену","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Просторный частный салон для больших семей, групп игроков в гольф и гостей с объёмным багажом.","capacitySwitchedSprinter":"Пассажиры и багаж превышают вместимость Vito — выбран Mercedes Sprinter.","capacityNoVehicle":"Столько пассажиров и багажа превышает вместимость наших автомобилей. Напишите нам в WhatsApp.","leatherSeats":"Премиальные кожаные сиденья","water":"Охлаждённая вода","from":"От","reviewOne":"«Несмотря на задержку рейса на 90 минут, водитель ждал нас. Автомобиль был безупречно чистым и прохладным, а оба детских кресла уже были установлены. Именно такая встреча была нужна нашей семье».","reviewTwo":"«От первого сообщения в WhatsApp до прибытия в Белек всё было на высшем уровне. Пунктуально, деликатно и очень профессионально. Наши сумки для гольфа легко поместились».","reviewThree":"«Это было похоже на трансфер от пятизвёздочного отеля, а не на такси из аэропорта. Чёткая связь, безупречный автомобиль и по-настоящему вежливый водитель».","perVehicle":"за автомобиль · фиксированная цена","quoteReady":"Ваш частный трансфер","journeyTime":"Время в пути","totalFixed":"Итоговая цена","confirmWhatsapp":"Подтвердить в WhatsApp","bookNowCta":"Забронировать","backToQuote":"Назад","yourDetails":"Ваши данные","flightNumber":"Номер рейса","flightArrivalTime":"Время прилёта","notesLabel":"Особые пожелания","confirmBooking":"Подтвердить бронирование","paySecurely":"Перейти к безопасной оплате","payLaterNote":"Оплата онлайн после подтверждения.","paymentTitle":"Безопасная оплата","paymentError":"Оплата не прошла. Попробуйте ещё раз."},"pl":{"navFleet":"Pojazdy","navService":"Usługi","navFairPricing":"Uczciwa cena","navRoutes":"Trasy","navReviews":"Opinie","navContact":"Kontakt","bookNow":"Zarezerwuj","alwaysAvailable":"Do Twojej dyspozycji 24 godziny na dobę","heroEyebrow":"Prywatny serwis szoferski · Antalya","campaignBadge":"Online special","campaignDiscount":"25% off","campaignScope":"all transfer prices","heroTitle":"Transfery lotniskowe premium<br />w Antalyi","heroSubtitle":"Prywatne transfery z szoferem z lotniska Antalya do Belek, Side, Kemer i Alanyi.","bookTransfer":"Zarezerwuj transfer","instantQuote":"Sprawdź cenę","googleRated":"Ocena Google","trustedGuests":"Zaufało nam ponad 2 500 gości","discover":"Odkryj","tbLicensed":"Licencja TÜRSAB","tbFlightTracking":"Śledzenie lotu","tbFixedPrice":"Stała cena","tb247Concierge":"Concierge 24/7","tbChildSeats":"Foteliki w cenie","privateJourney":"Twoja prywatna podróż","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Miejsce odbioru","airportOption":"Lotnisko Antalya (AYT)","hotelOption":"Hotel","privateAddressOption":"Adres prywatny","destination":"Cel podróży","selectDestination":"Wybierz cel","vehicle":"Pojazd","guests":"Goście","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Wybierz godzinę","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Pełny adres odbioru","dropoffAddress":"Pełny adres docelowy","luggageLabel":"Duży bagaż","hotelNameLabel":"Nazwa hotelu","childSeatLabel":"Foteliki dziecięce","childSeatNone":"Bez fotelika dziecięcego","oneChildSeat":"1 fotelik dziecięcy","twoChildSeats":"2 foteliki dziecięce","threeChildSeats":"3 foteliki dziecięce","fourChildSeats":"4 foteliki dziecięce","fullName":"Imię i nazwisko","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-mail","paymentMethod":"Wybierz metodę płatności","cashPayment":"Zapłać w pojeździe","recommended":"Polecane","cashPaymentDescription":"Bez przedpłaty. Zapłać bezpośrednio kierowcy, gdy usługa spełni Twoje oczekiwania.","quoteIncludes":"Wliczono: powitanie, śledzenie lotu, parking, czas oczekiwania i woda.","confirmCashBooking":"Potwierdź — zapłać w pojeździe","flightTracking":"Śledzenie lotu w czasie rzeczywistym","fixedPrice":"Gwarantowana stała cena","meetGreet":"Osobiste powitanie","speakingDrivers":"Kierowcy mówiący po angielsku i niemiecku","fromAirport":"Z lotniska Antalya","campaignApplied":"Online -15% already applied","welcomeEyebrow":"Witamy na najwyższym poziomie","welcomeTitle":"Podróżuj z klasą.<br />Przyjeżdżaj spokojnie.","welcomeBody":"Od chwili lądowania każdy szczegół jest dopracowany. Szofer czeka w hali przylotów, zajmuje się bagażem i odprowadza Cię do starannie przygotowanego pojazdu.","ourStandards":"Nasze standardy usług","concierge":"Usługi concierge","guestsWelcomed":"Powitanych gości","guestRating":"Średnia ocena gości","privateTransfers":"Prywatne transfery","fleetEyebrow":"Nasza flota","fleetTitle":"Twoja prywatna przestrzeń,<br />doskonała w każdym detalu.","fleetIntro":"Podróżuj komfortowo z obszernym miejscem dla rodziny, sprzętu golfowego i walizek.","signatureFleet":"Flota Signature","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Wzorzec eleganckiej podróży grupowej: przestronny, wyjątkowo cichy i wyposażony dla bezproblemowego przybycia.","passengers":"pasażerów","suitcases":"walizek","television":"Telewizor w pojeździe","coldDrinks":"Zimne napoje","snacks":"Przekąski","childSeats":"Foteliki dziecięce na życzenie","wifi":"Bezpłatne WiFi","nameSignGreeting":"Powitanie z tabliczką z imieniem","reserveVehicle":"Zarezerwuj pojazd","insideVclass":"Wnętrze Sprinter","interiorTitle":"Prywatny salon<br />między lotniskiem a hotelem.","serviceEyebrow":"Standard Antalya VIP","serviceTitle":"Więcej niż transfer.<br />Wyjątkowe powitanie.","serviceIntro":"Uwaga na poziomie pięciogwiazdkowego hotelu, doświadczeni lokalni szoferzy i pełen spokój od lotniska po resort.","trackingTitle":"Śledzenie lotu","trackingBody":"Śledzimy Twój lot w czasie rzeczywistym i automatycznie dostosowujemy godzinę odbioru bez dodatkowych opłat.","chauffeurTitle":"Profesjonalni szoferzy","chauffeurBody":"Zawsze zadbani, dyskretni, wybrani za znajomość terenu i najwyższe standardy obsługi.","greetTitle":"Meet & Greet","greetBody":"Szofer wita Cię w hali przylotów z tabliczką z Twoim imieniem i pomaga z bagażem.","supportTitle":"Concierge 24/7","supportBody":"Przed, w trakcie i po podróży zawsze możesz skontaktować się z nami telefonicznie lub przez WhatsApp.","priceTitle":"Stałe ceny","priceBody":"Potwierdzona cena jest ceną ostateczną. Czas oczekiwania, parking i opóźnienia lotów są wliczone.","familyTitle":"Dla rodzin","familyBody":"Odpowiednie foteliki dziecięce, obszerne kabiny i cierpliwa pomoc dla spokojnego przybycia z rodziną.","routesEyebrow":"Nasze najpopularniejsze trasy","routesTitle":"Z lotniska Antalya<br />na Turecką Riwierę.","routesIntro":"Wszystkie ceny dotyczą pojazdu, nie osoby. Bezpłatny czas oczekiwania jest wliczony.","discountPricesShown":"Online -15% prices shown","golfFavourite":"Ulubieniec golfistów","onlineDiscountShort":"Online -25%","reviewsEyebrow":"Opinie gości","reviewsTitle":"Usługa, która<br />zostaje w pamięci.","googleReviews":"Na podstawie 387 zweryfikowanych opinii Google","trustedBy":"Wybór gości czołowych resortów w Antalyi","processEyebrow":"Celowo proste","processTitle":"Cztery kroki do<br />spokojnego przybycia.","stepOne":"Wybierz cel","stepOneBody":"Powiedz nam, dokąd i kiedy chcesz pojechać.","stepTwo":"Wybierz pojazd","stepTwoBody":"Wybierz odpowiednią przestrzeń i komfort.","stepThree":"Potwierdź rezerwację","stepThreeBody":"Otrzymaj natychmiastowe potwierdzenie ze stałą ceną.","stepFour":"Spotkaj szofera","stepFourBody":"Szofer wita Cię w hali przylotów.","pricingEyebrow":"Spokój od początku","pricingTitle":"Ceny przyjazne klientom.<br />Płacisz tyle, ile jest uczciwe.","pricingIntro":"Dla spokoju podajemy stałe ceny, ale mierzymy rzeczywisty dystans. Zawsze płacisz niższą kwotę.","pricingFixedPrice":"Stała cena","fixedPriceExample":"Transfer do Belek: {{PRICE:belek:vito}} €","fixedPriceDesc":"Gwarantowana kwota końcowa. Obejmuje opłaty lotniskowe, parking, czas oczekiwania i podatki.","distancePrice":"Według dystansu","distancePriceExample":"Przykład online 24 km: 25 €","distancePriceDesc":"Mierzone GPS-em podczas przejazdu.","youPay":"Płacisz","youPayPrice":"25 €","youPayDesc":"Obowiązuje niższa kwota. Kierowca potwierdza ją na końcu.","pricingNote":"Bez niespodzianek. Bez ukrytych opłat. Płacisz tyle, ile rezerwujesz - albo mniej.","faqEyebrow":"Często zadawane pytania","faqTitle":"Przed Twoją podróżą.","faqIntro":"Wszystko, co musisz wiedzieć o prywatnym transferze z lotniska w Antalyi.","askQuestion":"Zadaj pytanie","faqOneQ":"Co się stanie, jeśli mój lot się opóźni?","faqOneA":"Śledzimy każdy przylot w czasie rzeczywistym. Godzina odbioru jest automatycznie dostosowywana, a szofer czeka bez dodatkowych opłat.","faqTwoQ":"Gdzie spotkam mojego szofera?","faqTwoA":"Szofer czeka w hali przylotów tuż za wydawaniem bagażu z tabliczką z Twoim imieniem.","faqThreeQ":"Czy dostępne są foteliki dziecięce?","faqThreeA":"Tak. Nosidełka, foteliki i podkładki są dostępne bezpłatnie przy wcześniejszej rezerwacji.","faqFourQ":"Czy można przewieźć torby golfowe i duży bagaż?","faqFourA":"Tak. Sprinter i Vito są idealne dla grup golfowych. Podaj informacje o bagażu, a zaplanujemy odpowiedni pojazd.","faqFiveQ":"Czy podana cena jest ostateczna?","faqFiveA":"Tak. Opłaty lotniskowe, parking, czas oczekiwania i podatki są wliczone. Brak ukrytych kosztów.","contactEyebrow":"Twoja podróż zaczyna się tutaj","contactTitle":"Przybądź do Antalyi<br />wyjątkowo komfortowo.","contactBody":"Zarezerwuj online w mniej niż dwie minuty lub skontaktuj się bezpośrednio z naszym concierge 24/7.","whatsappUs":"WhatsApp","replyMinutes":"Odpowiedź zwykle w kilka minut","callUs":"Zadzwoń 24/7","emailUs":"E-mail do concierge","replyHour":"Odpowiedź w ciągu godziny","footerTagline":"Prywatne usługi szoferskie na całej Tureckiej Riwierze.","explore":"Odkryj","information":"Informacje","licensed":"Licencjonowany prywatny przewoźnik · Zgodny z TÜRSAB","bookingConfirmed":"Rezerwacja potwierdzona","referenceLabel":"Numer referencyjny","weWillContact":"Twoje zgłoszenie rezerwacji zostało wysłane. Skontaktujemy się w ciągu 30 minut.","chatWithUs":"Napisz do nas","pickupAddressPlaceholder":"Nazwa hotelu, ulica, numer budynku i dzielnica","dropoffAddressPlaceholder":"Nazwa hotelu, ulica, numer budynku i dzielnica","hotelNamePlaceholder":"Nazwa hotelu lub zakwaterowania","cashConfirmation":"Rezerwacja jest potwierdzona. Zapłać kierowcy ustaloną kwotę w pojeździe.","bookingError":"Nie udało się dokończyć rezerwacji. Spróbuj ponownie.","formIncomplete":"Uzupełnij zaznaczone pola.","requiredField":"To pole jest wymagane.","destinationRequired":"Wybierz cel podróży.","dateInvalid":"Wybierz dzisiejszą lub przyszłą datę.","emailInvalid":"Wprowadź prawidłowy adres e-mail.","nameInvalid":"Wprowadź prawidłowe imię i nazwisko.","phoneInvalid":"Wprowadź prawidłowy numer z kodem kraju (na przykład +49).","flightInvalid":"Wprowadź prawidłowy numer lotu.","pickupAddressRequired":"Adres odbioru musi mieć od 6 do 160 znaków.","dropoffAddressRequired":"Adres docelowy musi mieć od 6 do 160 znaków.","addressesMustDiffer":"Adres odbioru i adres docelowy muszą być różne.","customDestinationPrice":"Cena zostanie potwierdzona po sprawdzeniu adresu docelowego.","hotelNameRequired":"Wprowadź nazwę hotelu.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","quoteTitle":"Dokąd Cię zawieziemy?","date":"Data","airportReturnPrice":"Cena zostanie potwierdzona po sprawdzeniu hotelu lub adresu odbioru.","oneGuest":"1 gość","twoGuests":"2 gości","threeGuests":"3 gości","fourGuests":"4 gości","fiveGuests":"5 gości","sixGuests":"6 gości","sevenGuests":"7 gości","viewQuote":"Pokaż cenę","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Obszerna prywatna kabina dla większych rodzin, grup golfowych i gości z obfitym bagażem.","capacitySwitchedSprinter":"Pasażerowie i bagaż przekraczają Vito — przełączono na Mercedes Sprinter.","capacityNoVehicle":"Tylu pasażerów i bagażu przekracza nasze pojazdy. Skontaktuj się z nami na WhatsApp.","leatherSeats":"Skórzane fotele premium","water":"Schłodzona woda mineralna","from":"Od","reviewOne":"„Nasz kierowca czekał mimo 90-minutowego opóźnienia. Pojazd był nieskazitelny, przyjemnie chłodny i wyposażony już w oba foteliki. Dokładnie takie powitanie potrzebowała nasza rodzina.”","reviewTwo":"„Od pierwszego kontaktu WhatsApp po przyjazd do Belek wszystko było absolutnie pierwszorzędne. Punktualnie, dyskretnie i bardzo profesjonalnie. Torby golfowe bez problemu się zmieściły.”","reviewThree":"„To było jak serwis szoferski hotelu, a nie taksówka na lotnisku. Jasna komunikacja, nieskazitelny pojazd i naprawdę uprzejmy kierowca.”","perVehicle":"za pojazd · stała cena","quoteReady":"Twój prywatny transfer","journeyTime":"Czas podróży","totalFixed":"Cena łączna","confirmWhatsapp":"Potwierdź przez WhatsApp","bookNowCta":"Zarezerwuj","backToQuote":"Wstecz","yourDetails":"Twoje dane","flightNumber":"Numer lotu","flightArrivalTime":"Godzina przylotu","notesLabel":"Specjalne życzenia","confirmBooking":"Potwierdź rezerwację","paySecurely":"Przejdź do bezpiecznej płatności","payLaterNote":"Bezpieczna płatność online po potwierdzeniu.","paymentTitle":"Bezpieczna płatność","paymentError":"Płatność nie powiodła się. Spróbuj ponownie."},"nl":{"navFleet":"Voertuigen","navService":"Service","navFairPricing":"Eerlijke prijs","navRoutes":"Routes","navReviews":"Reviews","navContact":"Contact","bookNow":"Nu boeken","alwaysAvailable":"24 uur per dag, elke dag bereikbaar","heroEyebrow":"Privé chauffeurservice · Antalya","campaignBadge":"Online special","campaignDiscount":"25% off","campaignScope":"all transfer prices","heroTitle":"Premium luchthavenstransfers<br />in Antalya","heroSubtitle":"Privé transfers met chauffeur van Antalya Luchthaven naar Belek, Side, Kemer en Alanya.","bookTransfer":"Transfer boeken","instantQuote":"Direct prijs ontvangen","googleRated":"Google-beoordeling","trustedGuests":"Vertrouwd door meer dan 2.500 gasten","discover":"Ontdekken","tbLicensed":"TÜRSAB Erkend","tbFlightTracking":"Vluchttracking","tbFixedPrice":"Vaste prijs","tb247Concierge":"Concierge 24/7","tbChildSeats":"Kinderzitjes inbegrepen","privateJourney":"Uw privéreis","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Ophaallocatie","airportOption":"Luchthaven Antalya (AYT)","hotelOption":"Hotel","privateAddressOption":"Privéadres","destination":"Bestemming","selectDestination":"Kies bestemming","vehicle":"Voertuig","guests":"Gasten","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Kies tijd","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Volledig ophaaladres","dropoffAddress":"Volledig bestemmingsadres","luggageLabel":"Grote bagage","hotelNameLabel":"Hotelnaam","childSeatLabel":"Kinderzitjes","childSeatNone":"Geen kinderzitje","oneChildSeat":"1 kinderzitje","twoChildSeats":"2 kinderzitjes","threeChildSeats":"3 kinderzitjes","fourChildSeats":"4 kinderzitjes","fullName":"Volledige naam","phoneLabel":"Telefoon / WhatsApp","emailLabel":"E-mail","paymentMethod":"Kies betaalmethode","cashPayment":"Betaal in het voertuig","recommended":"Aanbevolen","cashPaymentDescription":"Geen vooruitbetaling. Betaal uw chauffeur rechtstreeks zodra u tevreden bent over de service.","quoteIncludes":"Inclusief: welkom, vluchttracking, parkeren, wachttijd en water.","confirmCashBooking":"Bevestig — betaal in het voertuig","flightTracking":"Realtime vluchtvolgend","fixedPrice":"Gegarandeerde vaste prijs","meetGreet":"Persoonlijk welkom","speakingDrivers":"Chauffeurs die Engels en Duits spreken","fromAirport":"Vanaf Antalya Luchthaven","campaignApplied":"Online -15% already applied","welcomeEyebrow":"Welkom op het hoogste niveau","welcomeTitle":"Stijlvol reizen.<br />Ontspannen aankomen.","welcomeBody":"Vanaf uw landing is elk detail geregeld. Uw chauffeur wacht in de aankomsthal, zorgt voor uw bagage en begeleidt u naar uw zorgvuldig voorbereide privévoertuig.","ourStandards":"Onze servicestandaarden","concierge":"Conciërgeservice","guestsWelcomed":"Verwelkomde gasten","guestRating":"Gemiddelde gastbeoordeling","privateTransfers":"Privétransfers","fleetEyebrow":"Onze vloot","fleetTitle":"Uw privéruimte,<br />perfect tot in elk detail.","fleetIntro":"Reis comfortabel met ruimte voor familie, golfbagage en koffers.","signatureFleet":"Signature vloot","fleetVclassClass":"Business · First Class","fleetVclassDescription":"De maatstaf voor verfijnde groepsreizen: ruim, uitzonderlijk stil en uitgerust voor een probleemloze aankomst.","passengers":"passagiers","suitcases":"koffers","television":"Televisie in het voertuig","coldDrinks":"Koude dranken","snacks":"Snacks","childSeats":"Kinderzitjes op verzoek","wifi":"Gratis WiFi","nameSignGreeting":"Ontvangst met persoonlijk naambordje","reserveVehicle":"Voertuig reserveren","insideVclass":"In het Sprinter interieur","interiorTitle":"Een privélounge<br />tussen luchthaven en hotel.","serviceEyebrow":"De Antalya VIP-standaard","serviceTitle":"Meer dan een transfer.<br />Een bijzonder welkom.","serviceIntro":"Aandacht op hotelniveau, ervaren lokale chauffeurs en absolute gemoedsrust van luchthaven tot resort.","trackingTitle":"Vluchttracking","trackingBody":"We volgen uw vlucht in realtime en passen de ophaalafspraak automatisch en kosteloos aan.","chauffeurTitle":"Professionele chauffeurs","chauffeurBody":"Altijd verzorgd, discreet en geselecteerd op lokale kennis en hoogste servicestandaard.","greetTitle":"Meet & Greet","greetBody":"Uw chauffeur verwelkomt u in de aankomsthal met een naambordje en helpt met uw bagage.","supportTitle":"24/7 Conciërge","supportBody":"Voor, tijdens en na uw reis is er altijd iemand bereikbaar per telefoon of WhatsApp.","priceTitle":"Vaste prijzen","priceBody":"De bevestigde prijs is de definitieve prijs. Wachttijd, parkeren en vluchtvertragingen zijn inbegrepen.","familyTitle":"Voor gezinnen","familyBody":"Passende kinderzitjes, ruime interieurs en geduldige hulp voor een ontspannen familieaankomst.","routesEyebrow":"Onze populairste ritten","routesTitle":"Van Antalya Luchthaven<br />naar de Turkse Rivièra.","routesIntro":"Alle prijzen zijn per voertuig, nooit per persoon. Gratis wachttijd is inbegrepen.","discountPricesShown":"Online -15% prices shown","golfFavourite":"Golfliefhebbersfavoriet","onlineDiscountShort":"Online -25%","reviewsEyebrow":"Gastbeoordelingen","reviewsTitle":"Service die lang<br />bijblijft.","googleReviews":"Gebaseerd op 387 geverifieerde Google-beoordelingen","trustedBy":"Vertrouwd door gasten van toonaangevende resorts in Antalya","processEyebrow":"Bewust eenvoudig","processTitle":"Vier stappen naar<br />een ontspannen aankomst.","stepOne":"Kies bestemming","stepOneBody":"Vertel ons waarheen en wanneer u wilt reizen.","stepTwo":"Kies voertuig","stepTwoBody":"Kies de juiste ruimte en comfort.","stepThree":"Bevestig boeking","stepThreeBody":"Ontvang direct uw bevestiging met vaste prijs.","stepFour":"Ontmoet uw chauffeur","stepFourBody":"Uw chauffeur verwelkomt u in de aankomsthal.","pricingEyebrow":"Zorgeloos reizen","pricingTitle":"Klantvriendelijke prijzen.<br />U betaalt wat eerlijk is.","pricingIntro":"We bieden vaste prijzen voor zekerheid, maar meten ook de werkelijke afstand. U betaalt altijd het laagste bedrag.","pricingFixedPrice":"Vaste prijs","fixedPriceExample":"Transfer naar Belek: €{{PRICE:belek:vito}}","fixedPriceDesc":"Gegarandeerd totaalbedrag. Inclusief luchthavengelden, parkeren, wachttijd en belastingen.","distancePrice":"Op afstand","distancePriceExample":"24 km online voorbeeld: €25","distancePriceDesc":"Gemeten met GPS tijdens uw rit.","youPay":"U betaalt","youPayPrice":"€25","youPayDesc":"Het laagste bedrag geldt. De chauffeur bevestigt dit aan het einde.","pricingNote":"Geen verrassingen. Geen verborgen kosten. Wat u boekt, betaalt u - of minder.","faqEyebrow":"Veelgestelde vragen","faqTitle":"Vóór uw reis.","faqIntro":"Alles wat u moet weten over uw privétransfer van de luchthaven Antalya.","askQuestion":"Stel een vraag","faqOneQ":"Wat gebeurt er bij een vluchtvertraging?","faqOneA":"We volgen elke aankomst in realtime. Uw ophaaltijd wordt automatisch aangepast en uw chauffeur wacht zonder meerprijs.","faqTwoQ":"Waar ontmoet ik mijn chauffeur?","faqTwoA":"Uw chauffeur wacht direct na de bagageband in de aankomsthal met een persoonlijk naambordje.","faqThreeQ":"Zijn kinderzitjes beschikbaar?","faqThreeA":"Ja. Babyschalen, kinderzitjes en zitverhogers zijn bij vooraf boeken gratis beschikbaar.","faqFourQ":"Kunnen golfbags en groot bagage worden vervoerd?","faqFourA":"Ja. Sprinter en Vito zijn ideaal voor golfgroepen. Geef uw bagage op en wij plannen het juiste voertuig.","faqFiveQ":"Is de getoonde prijs definitief?","faqFiveA":"Ja. Luchthavengelden, parkeren, wachttijd en belastingen zijn inbegrepen. Geen verborgen kosten.","contactEyebrow":"Uw reis begint hier","contactTitle":"Buitengewoon goed<br />aankomen in Antalya.","contactBody":"Boek online in minder dan twee minuten of spreek direct met ons 24/7 conciërgeteam.","whatsappUs":"WhatsApp","replyMinutes":"Antwoord meestal binnen enkele minuten","callUs":"24/7 bellen","emailUs":"Conciërge e-mail","replyHour":"Antwoord binnen een uur","footerTagline":"Privé chauffeurservices aan de hele Turkse Rivièra.","explore":"Ontdekken","information":"Informatie","licensed":"Erkende privé-transferaanbieder · TÜRSAB-conform","bookingConfirmed":"Boeking bevestigd","referenceLabel":"Referentie","weWillContact":"Uw boekingsaanvraag is verzonden. We nemen binnen 30 minuten contact op.","chatWithUs":"Chat met ons","pickupAddressPlaceholder":"Hotelnaam, straat, huisnummer en wijk","dropoffAddressPlaceholder":"Hotelnaam, straat, huisnummer en wijk","hotelNamePlaceholder":"Naam van hotel of accommodatie","cashConfirmation":"Uw boeking is bevestigd. Betaal het vaste bedrag rechtstreeks aan de chauffeur.","bookingError":"Uw boeking kon niet worden voltooid. Probeer het opnieuw.","formIncomplete":"Vul de gemarkeerde velden in.","requiredField":"Dit veld is verplicht.","destinationRequired":"Kies een bestemming.","dateInvalid":"Kies vandaag of een toekomstige datum.","emailInvalid":"Voer een geldig e-mailadres in.","nameInvalid":"Voer een geldige volledige naam in.","phoneInvalid":"Voer een geldig nummer met landcode in (bijvoorbeeld +49).","flightInvalid":"Voer een geldig vluchtnummer in.","pickupAddressRequired":"Het ophaaladres moet tussen 6 en 160 tekens lang zijn.","dropoffAddressRequired":"Het bestemmingsadres moet tussen 6 en 160 tekens lang zijn.","addressesMustDiffer":"Het ophaal- en bestemmingsadres moeten verschillen.","customDestinationPrice":"De prijs wordt bevestigd na controle van het bestemmingsadres.","hotelNameRequired":"Voer de hotelnaam in.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","quoteTitle":"Waar mogen wij u naartoe brengen?","date":"Datum","airportReturnPrice":"De prijs wordt bevestigd nadat het hotel of ophaaladres is gecontroleerd.","oneGuest":"1 gast","twoGuests":"2 gasten","threeGuests":"3 gasten","fourGuests":"4 gasten","fiveGuests":"5 gasten","sixGuests":"6 gasten","sevenGuests":"7 gasten","viewQuote":"Prijs bekijken","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Een ruime privécabine voor grotere families, golfgroepen en gasten met veel bagage.","capacitySwitchedSprinter":"Passagiers en bagage overschrijden de Vito — overgeschakeld naar Mercedes Sprinter.","capacityNoVehicle":"Zoveel passagiers en bagage overschrijdt onze voertuigen. Neem contact op via WhatsApp.","leatherSeats":"Premium leren stoelen","water":"Gekoeld mineraalwater","from":"Vanaf","reviewOne":"„Onze chauffeur wachtte ondanks 90 minuten vertraging. Het voertuig was onberispelijk, aangenaam koel en al uitgerust met beide kinderzitjes. Precies de ontvangst die onze familie nodig had.”","reviewTwo":"„Van het eerste WhatsApp-contact tot aankomst in Belek absoluut eersteklas. Punctueel, discreet en zeer professioneel. Ook onze golftassen pasten er gemakkelijk in.”","reviewThree":"„Dit voelde als een chauffeurservice van een hotel, niet als een luchthaventaxi. Duidelijke communicatie, een onberispelijk voertuig en een oprecht beleefde chauffeur.”","perVehicle":"per voertuig · vaste prijs","quoteReady":"Uw privétransfer","journeyTime":"Reistijd","totalFixed":"Totaalprijs","confirmWhatsapp":"Bevestigen via WhatsApp","bookNowCta":"Nu boeken","backToQuote":"Terug","yourDetails":"Uw gegevens","flightNumber":"Vluchtnummer","flightArrivalTime":"Aankomsttijd","notesLabel":"Speciale wensen","confirmBooking":"Boeking bevestigen","paySecurely":"Ga door naar veilig betalen","payLaterNote":"Veilige online betaling na bevestiging.","paymentTitle":"Veilige betaling","paymentError":"Betaling mislukt. Probeer het opnieuw."},"uk":{"navFleet":"Автопарк","navService":"Сервіс","navFairPricing":"Чесна ціна","navRoutes":"Маршрути","navReviews":"Відгуки","navContact":"Контакти","bookNow":"Забронювати","alwaysAvailable":"На зв'язку цілодобово, щодня","heroEyebrow":"Приватний шофер · Анталья","campaignBadge":"Online special","campaignDiscount":"25% off","campaignScope":"all transfer prices","heroTitle":"Преміальний трансфер<br />з аеропорту Анталії","heroSubtitle":"Приватні трансфери з водієм з аеропорту Анталії до Белека, Сіде, Кемера та Аланії.","bookTransfer":"Замовити трансфер","instantQuote":"Дізнатися ціну","googleRated":"Рейтинг Google","trustedGuests":"Нам довіряють понад 2 500 гостей","discover":"Детальніше","tbLicensed":"Ліцензія TÜRSAB","tbFlightTracking":"Відстеження рейсу","tbFixedPrice":"Фіксована ціна","tb247Concierge":"Консьєрж 24/7","tbChildSeats":"Дитячі крісла в комплекті","privateJourney":"Ваша приватна поїздка","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Місце зустрічі","airportOption":"Аеропорт Анталії (AYT)","hotelOption":"Готель","privateAddressOption":"Приватна адреса","destination":"Напрямок","selectDestination":"Оберіть напрямок","vehicle":"Автомобіль","guests":"Гості","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Оберіть час","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Повна адреса подачі","dropoffAddress":"Повна адреса призначення","luggageLabel":"Великий багаж","hotelNameLabel":"Назва готелю","childSeatLabel":"Дитячі крісла","childSeatNone":"Без дитячого крісла","oneChildSeat":"1 дитяче крісло","twoChildSeats":"2 дитячі крісла","threeChildSeats":"3 дитячі крісла","fourChildSeats":"4 дитячі крісла","fullName":"Ім'я та прізвище","phoneLabel":"Телефон / WhatsApp","emailLabel":"Ел. пошта","paymentMethod":"Оберіть спосіб оплати","cashPayment":"Оплата в автомобілі","recommended":"Рекомендуємо","cashPaymentDescription":"Без передоплати. Сплатіть безпосередньо водієві, коли будете задоволені послугою.","quoteIncludes":"Включено: зустріч, відстеження рейсу, паркування, очікування та вода.","confirmCashBooking":"Підтвердити — оплата в автомобілі","flightTracking":"Відстеження рейсу в реальному часі","fixedPrice":"Гарантія фіксованої ціни","meetGreet":"Особиста зустріч","speakingDrivers":"Водії розмовляють англійською та німецькою","fromAirport":"З аеропорту Анталії","campaignApplied":"Online -15% already applied","welcomeEyebrow":"Ласкаво просимо на найвищий рівень","welcomeTitle":"Подорожуйте стильно.<br />Прибувайте спокійно.","welcomeBody":"З моменту посадки вашого літака кожна деталь продумана. Шофер чекає на вас у залі прильоту, піклується про багаж і супроводжує вас до підготовленого автомобіля.","ourStandards":"Наші стандарти сервісу","concierge":"Підтримка консьєржа","guestsWelcomed":"Зустрінутих гостей","guestRating":"Середня оцінка гостей","privateTransfers":"Приватні трансфери","fleetEyebrow":"Наш автопарк","fleetTitle":"Ваш особистий простір,<br />бездоганний у деталях.","fleetIntro":"Подорожуйте в тиші та комфорті з місцем для сім'ї, багажу та обладнання для гольфу.","signatureFleet":"Фірмовий автопарк","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Еталон комфортних групових поїздок: просторий, надзвичайно тихий та оснащений для бездоганного прибуття.","passengers":"пасажирів","suitcases":"валіз","television":"Телевізор в автомобілі","coldDrinks":"Холодні напої","snacks":"Закуски","childSeats":"Дитячі крісла на запит","wifi":"Безкоштовний WiFi","nameSignGreeting":"Зустріч з іменною табличкою","reserveVehicle":"Забронювати автомобіль","insideVclass":"Салон Sprinter","interiorTitle":"Приватний лаунж<br />між аеропортом і готелем.","serviceEyebrow":"Стандарт Antalya VIP","serviceTitle":"Більше ніж трансфер.<br />Продумана зустріч.","serviceIntro":"Увага рівня п'ятизіркового готелю, досвідчені місцеві шофери та спокій від аеропорту до курорту.","trackingTitle":"Відстеження рейсу","trackingBody":"Ми відстежуємо ваш рейс у реальному часі та автоматично коригуємо час зустрічі без доплати.","chauffeurTitle":"Професійні шофери","chauffeurBody":"Завжди бездоганний вигляд, делікатність, знання регіону та найвищі стандарти обслуговування.","greetTitle":"Зустріч в аеропорту","greetBody":"Шофер зустріне вас у залі прильоту з табличкою з вашим ім'ям та допоможе з багажем.","supportTitle":"Консьєрж 24/7","supportBody":"До, під час і після поїздки вам завжди відповість людина по телефону або в WhatsApp.","priceTitle":"Фіксовані ціни","priceBody":"Підтверджена ціна є остаточною. Очікування, паркування та затримки рейсів вже включені.","familyTitle":"Для всієї родини","familyBody":"Дитячі крісла за віком, просторий салон та уважна допомога для спокійного сімейного прибуття.","routesEyebrow":"Найпопулярніші поїздки","routesTitle":"З аеропорту Анталії<br />на Турецьку Рив'єру.","routesIntro":"Всі ціни вказані за автомобіль, а не за пасажира. Безкоштовне очікування включено.","discountPricesShown":"Online -15% prices shown","golfFavourite":"Вибір гравців у гольф","onlineDiscountShort":"Online -25%","reviewsEyebrow":"Відгуки гостей","reviewsTitle":"Сервіс, який пам'ятають<br />після прибуття.","googleReviews":"На основі 387 підтверджених відгуків Google","trustedBy":"Нам довіряють гості провідних курортів Анталії","processEyebrow":"Навмисно просто","processTitle":"Чотири кроки<br />до комфортного прибуття.","stepOne":"Оберіть напрямок","stepOneBody":"Повідомте нам, куди і коли ви хочете поїхати.","stepTwo":"Оберіть автомобіль","stepTwoBody":"Підберіть простір і комфорт для вашої компанії.","stepThree":"Підтвердіть бронювання","stepThreeBody":"Отримайте миттєве підтвердження з фіксованою ціною.","stepFour":"Зустріньте водія","stepFourBody":"Ваш шофер зустріне вас у залі прильоту.","pricingEyebrow":"Спокій у дорозі","pricingTitle":"Ціни в інтересах клієнта.<br />Ви сплачуєте справедливу суму.","pricingIntro":"Ми пропонуємо фіксовані ціни для вашого спокою, але вимірюємо фактичну відстань. Ви завжди сплачуєте меншу суму.","pricingFixedPrice":"Фіксована ціна","fixedPriceExample":"Трансфер до Белека: {{PRICE:belek:vito}} €","fixedPriceDesc":"Гарантована загальна сума. Включає збори аеропорту, паркування, час очікування та податки.","distancePrice":"За відстанню","distancePriceExample":"24 км онлайн-приклад: 25 €","distancePriceDesc":"Вимірюється GPS під час поїздки.","youPay":"Ви сплачуєте","youPayPrice":"25 €","youPayDesc":"Діє менша сума. Водій підтвердить її наприкінці.","pricingNote":"Без сюрпризів. Без прихованих платежів. Ви сплачуєте суму з бронювання - або менше.","faqEyebrow":"Часті запитання","faqTitle":"Перед поїздкою.","faqIntro":"Все, що потрібно знати про приватний трансфер з аеропорту Анталії.","askQuestion":"Поставити запитання","faqOneQ":"Що станеться, якщо мій рейс затримається?","faqOneA":"Ми відстежуємо кожен рейс у реальному часі. Час зустрічі коригується автоматично, а водій чекає без доплати.","faqTwoQ":"Де я зустріну водія?","faqTwoA":"Ваш шофер чекатиме у залі прильоту одразу після видачі багажу з табличкою з вашим ім'ям.","faqThreeQ":"Чи є дитячі крісла?","faqThreeA":"Так. Автолюльки, дитячі крісла та бустери надаються безкоштовно на запит при бронюванні.","faqFourQ":"Чи можна перевезти сумки для гольфу та великий багаж?","faqFourA":"Так. Sprinter і Vito ідеально підходять для груп гравців у гольф. Повідомте об'єм багажу і ми підберемо автомобіль.","faqFiveQ":"Вказана ціна є остаточною?","faqFiveA":"Так. Аеропортові збори, паркування, очікування та податки включені. Прихованих платежів немає.","contactEyebrow":"Ваша подорож починається тут","contactTitle":"Прибудьте в Анталью<br />надзвичайно комфортно.","contactBody":"Забронюйте онлайн менш ніж за дві хвилини або зв'яжіться з нашою службою консьєржа 24/7.","whatsappUs":"Написати в WhatsApp","replyMinutes":"Зазвичай відповідаємо за кілька хвилин","callUs":"Зателефонувати 24/7","emailUs":"Написати консьєржу","replyHour":"Відповідь протягом години","footerTagline":"Приватні послуги шофера по всій Турецькій Рив'єрі.","explore":"Розділи","information":"Інформація","licensed":"Ліцензований оператор приватних трансферів · Відповідає вимогам TÜRSAB","bookingConfirmed":"Бронювання підтверджено","referenceLabel":"Референс","weWillContact":"Ваш запит на бронювання надіслано. Ми зв'яжемося з вами протягом 30 хвилин.","chatWithUs":"Написати нам","pickupAddressPlaceholder":"Назва готелю, вулиця, номер будинку та район","dropoffAddressPlaceholder":"Назва готелю, вулиця, номер будинку та район","hotelNamePlaceholder":"Назва готелю або місця проживання","cashConfirmation":"Бронювання підтверджено. Сплатіть фіксовану суму водієві в автомобілі.","bookingError":"Не вдалося завершити бронювання. Спробуйте ще раз.","formIncomplete":"Заповніть виділені поля.","requiredField":"Це поле обов'язкове.","destinationRequired":"Оберіть напрямок.","dateInvalid":"Оберіть сьогоднішню або майбутню дату.","emailInvalid":"Введіть дійсну електронну адресу.","nameInvalid":"Введіть дійсне повне ім'я.","phoneInvalid":"Введіть дійсний номер із кодом країни (наприклад, +49).","flightInvalid":"Введіть дійсний номер рейсу.","pickupAddressRequired":"Адреса подачі має містити від 6 до 160 символів.","dropoffAddressRequired":"Адреса призначення має містити від 6 до 160 символів.","addressesMustDiffer":"Адреси подачі та призначення мають відрізнятися.","customDestinationPrice":"Ціна буде підтверджена після перевірки адреси призначення.","hotelNameRequired":"Введіть назву готелю.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","quoteTitle":"Куди вас відвезти?","date":"Дата","airportReturnPrice":"Ціну буде підтверджено після перевірки готелю або адреси подачі.","oneGuest":"1 гість","twoGuests":"2 гості","threeGuests":"3 гості","fourGuests":"4 гості","fiveGuests":"5 гостей","sixGuests":"6 гостей","sevenGuests":"7 гостей","viewQuote":"Показати ціну","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Просторий приватний салон для великих сімей, груп гравців у гольф та гостей з об'ємним багажем.","capacitySwitchedSprinter":"Пасажири та багаж перевищують Vito — обрано Mercedes Sprinter.","capacityNoVehicle":"Стільки пасажирів і багажу перевищує наші автомобілі. Напишіть нам у WhatsApp.","leatherSeats":"Преміальні шкіряні сидіння","water":"Охолоджена вода","from":"Від","reviewOne":"«Незважаючи на затримку рейсу на 90 хвилин, водій чекав на нас. Автомобіль був бездоганно чистим та прохолодним, а обидва дитячі крісла вже були встановлені. Саме така зустріч потрібна нашій родині».","reviewTwo":"«Від першого повідомлення в WhatsApp до прибуття в Белек все було на найвищому рівні. Пунктуально, делікатно і дуже професійно. Наші сумки для гольфу легко помістилися».","reviewThree":"«Це нагадувало трансфер від п'ятизіркового готелю, а не таксі з аеропорту. Чіткий зв'язок, бездоганний автомобіль та по-справжньому ввічливий водій».","perVehicle":"за автомобіль · фіксована ціна","quoteReady":"Ваш приватний трансфер","journeyTime":"Час у дорозі","totalFixed":"Підсумкова ціна","confirmWhatsapp":"Підтвердити в WhatsApp","bookNowCta":"Забронювати","backToQuote":"Назад","yourDetails":"Ваші дані","flightNumber":"Номер рейсу","flightArrivalTime":"Час прильоту","notesLabel":"Особливі побажання","confirmBooking":"Підтвердити бронювання","paySecurely":"Перейти до безпечної оплати","payLaterNote":"Оплата онлайн після підтвердження.","paymentTitle":"Безпечна оплата","paymentError":"Оплата не пройшла. Спробуйте ще раз."},"fr":{"navFleet":"Véhicules","navService":"Service","navFairPricing":"Prix équitable","navRoutes":"Itinéraires","navReviews":"Avis","navContact":"Contact","bookNow":"Réserver","alwaysAvailable":"Disponible 24h/24, 7j/7","heroEyebrow":"Service chauffeur privé · Antalya","campaignBadge":"Online special","campaignDiscount":"25% off","campaignScope":"all transfer prices","heroTitle":"Transferts aéroport premium<br />à Antalya","heroSubtitle":"Transferts privés avec chauffeur depuis l'aéroport d'Antalya vers Belek, Side, Kemer et Alanya.","bookTransfer":"Réserver un transfert","instantQuote":"Obtenir un devis","googleRated":"Note Google","trustedGuests":"Approuvé par plus de 2 500 clients","discover":"Découvrir","tbLicensed":"Agréé TÜRSAB","tbFlightTracking":"Suivi de vol","tbFixedPrice":"Prix fixe","tb247Concierge":"Conciergerie 24/7","tbChildSeats":"Sièges enfants inclus","privateJourney":"Votre voyage privé","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Lieu de prise en charge","airportOption":"Aéroport d’Antalya (AYT)","hotelOption":"Hôtel","privateAddressOption":"Adresse privée","destination":"Destination","selectDestination":"Choisir une destination","vehicle":"Véhicule","guests":"Passagers","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Choisir l'heure","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Adresse complète de prise en charge","dropoffAddress":"Adresse complète de destination","luggageLabel":"Gros bagages","hotelNameLabel":"Nom de l'hôtel","childSeatLabel":"Sièges enfant","childSeatNone":"Aucun siège enfant","oneChildSeat":"1 siège enfant","twoChildSeats":"2 sièges enfant","threeChildSeats":"3 sièges enfant","fourChildSeats":"4 sièges enfant","fullName":"Nom complet","phoneLabel":"Téléphone / WhatsApp","emailLabel":"E-mail","paymentMethod":"Choisissez le mode de paiement","cashPayment":"Payer dans le véhicule","recommended":"Recommandé","cashPaymentDescription":"Aucun prépaiement. Payez directement votre chauffeur une fois satisfait du service.","quoteIncludes":"Inclus : accueil, suivi de vol, parking, attente et eau minérale.","confirmCashBooking":"Confirmer — payer dans le véhicule","flightTracking":"Suivi de vol en temps réel","fixedPrice":"Prix fixe garanti","meetGreet":"Accueil personnalisé","speakingDrivers":"Chauffeurs parlant anglais et allemand","fromAirport":"Depuis l'aéroport d'Antalya","campaignApplied":"Online -15% already applied","welcomeEyebrow":"Bienvenue au plus haut niveau","welcomeTitle":"Voyager avec élégance.<br />Arriver sereinement.","welcomeBody":"Dès votre atterrissage, chaque détail est organisé. Votre chauffeur vous attend dans le hall des arrivées, s'occupe de vos bagages et vous accompagne jusqu'à votre véhicule privé soigneusement préparé.","ourStandards":"Nos standards de service","concierge":"Service conciergerie","guestsWelcomed":"Clients accueillis","guestRating":"Note moyenne des clients","privateTransfers":"Transferts privés","fleetEyebrow":"Notre flotte","fleetTitle":"Votre espace privé,<br />parfait dans les moindres détails.","fleetIntro":"Voyagez confortablement avec suffisamment d'espace pour la famille, les équipements de golf et les valises.","signatureFleet":"Flotte Signature","fleetVclassClass":"Business · First Class","fleetVclassDescription":"La référence des voyages de groupe raffinés : spacieux, exceptionnellement silencieux et équipé pour une arrivée sans tracas.","passengers":"passagers","suitcases":"valises","television":"Télévision à bord","coldDrinks":"Boissons fraîches","snacks":"En-cas","childSeats":"Sièges enfants sur demande","wifi":"WiFi gratuit","nameSignGreeting":"Accueil avec pancarte nominative","reserveVehicle":"Réserver ce véhicule","insideVclass":"Intérieur Sprinter","interiorTitle":"Un salon privé<br />entre l'aéroport et l'hôtel.","serviceEyebrow":"La norme Antalya VIP","serviceTitle":"Plus qu'un transfert.<br />Un accueil d'exception.","serviceIntro":"Une attention digne d'un hôtel cinq étoiles, des chauffeurs locaux expérimentés et une tranquillité absolue de l'aéroport jusqu'au resort.","trackingTitle":"Suivi de vol","trackingBody":"Nous suivons votre vol en temps réel et ajustons automatiquement l'heure de prise en charge, sans frais supplémentaires.","chauffeurTitle":"Chauffeurs professionnels","chauffeurBody":"Toujours soignés, discrets et sélectionnés pour leur connaissance locale et leurs standards de service irréprochables.","greetTitle":"Accueil Meet & Greet","greetBody":"Votre chauffeur vous accueille dans le hall des arrivées avec une pancarte à votre nom et vous aide avec vos bagages.","supportTitle":"Conciergerie 24/7","supportBody":"Avant, pendant et après votre voyage, une personne est toujours disponible par téléphone ou WhatsApp.","priceTitle":"Prix fixes","priceBody":"Le prix confirmé est le prix définitif. L'attente, le parking et les retards de vol sont inclus.","familyTitle":"Pour les familles","familyBody":"Sièges enfants adaptés, habitacles spacieux et aide patiente pour une arrivée familiale sereine.","routesEyebrow":"Nos trajets les plus populaires","routesTitle":"De l'aéroport d'Antalya<br />vers la Riviera turque.","routesIntro":"Tous les prix sont par véhicule, jamais par personne. L'attente gratuite est incluse.","discountPricesShown":"Online -15% prices shown","golfFavourite":"Favori des golfeurs","onlineDiscountShort":"Online -25%","reviewsEyebrow":"Avis clients","reviewsTitle":"Un service dont on<br />se souvient longtemps.","googleReviews":"Basé sur 387 avis Google vérifiés","trustedBy":"Recommandé par les clients des meilleurs resorts d'Antalya","processEyebrow":"Délibérément simple","processTitle":"Quatre étapes pour<br />une arrivée sereine.","stepOne":"Choisir la destination","stepOneBody":"Indiquez-nous où et quand vous souhaitez voyager.","stepTwo":"Choisir le véhicule","stepTwoBody":"Sélectionnez l'espace et le confort adaptés.","stepThree":"Confirmer la réservation","stepThreeBody":"Recevez immédiatement votre confirmation au prix fixe.","stepFour":"Rencontrer le chauffeur","stepFourBody":"Votre chauffeur vous accueille dans le hall des arrivées.","pricingEyebrow":"Voyagez l'esprit tranquille","pricingTitle":"Une tarification pensée pour le client.<br />Vous payez le juste prix.","pricingIntro":"Nous proposons des prix fixes pour votre tranquillité, mais nous mesurons aussi la distance réelle. Vous payez toujours le montant le plus bas.","pricingFixedPrice":"Prix fixe","fixedPriceExample":"Transfert vers Belek : {{PRICE:belek:vito}} €","fixedPriceDesc":"Montant total garanti. Inclut les frais d'aéroport, le parking, l'attente et les taxes.","distancePrice":"Selon la distance","distancePriceExample":"Exemple en ligne 24 km : 25 €","distancePriceDesc":"Mesuré par GPS pendant votre trajet.","youPay":"Vous payez","youPayPrice":"25 €","youPayDesc":"Le montant le plus bas s'applique. Le chauffeur le confirme à la fin.","pricingNote":"Pas de surprise. Pas de frais cachés. Vous payez ce que vous réservez - ou moins.","faqEyebrow":"Questions fréquentes","faqTitle":"Avant votre voyage.","faqIntro":"Tout ce que vous devez savoir sur votre transfert privé depuis l'aéroport d'Antalya.","askQuestion":"Poser une question","faqOneQ":"Que se passe-t-il en cas de retard de vol ?","faqOneA":"Nous suivons chaque arrivée en temps réel. Votre heure de prise en charge est ajustée automatiquement et votre chauffeur attend sans surcoût.","faqTwoQ":"Où vais-je retrouver mon chauffeur ?","faqTwoA":"Votre chauffeur vous attendra juste après le retrait des bagages dans le hall des arrivées, avec une pancarte à votre nom.","faqThreeQ":"Des sièges enfants sont-ils disponibles ?","faqThreeA":"Oui. Coques bébé, sièges enfants et rehausseurs sont disponibles gratuitement sur réservation.","faqFourQ":"Pouvez-vous transporter des sacs de golf et des bagages volumineux ?","faqFourA":"Oui. Le Sprinter et le Vito sont idéaux pour les groupes de golfeurs. Précisez vos bagages et nous planifions le véhicule adapté.","faqFiveQ":"Le prix affiché est-il définitif ?","faqFiveA":"Oui. Les taxes aéroportuaires, le parking, l'attente et les impôts sont inclus. Aucun frais caché.","contactEyebrow":"Votre voyage commence ici","contactTitle":"Arriver à Antalya<br />de manière exceptionnelle.","contactBody":"Réservez en ligne en moins de deux minutes ou parlez directement avec notre équipe de conciergerie 24/7.","whatsappUs":"WhatsApp","replyMinutes":"Réponse généralement en quelques minutes","callUs":"Appeler 24/7","emailUs":"E-mail conciergerie","replyHour":"Réponse en moins d'une heure","footerTagline":"Services de chauffeur privé sur toute la Riviera turque.","explore":"Découvrir","information":"Informations","licensed":"Prestataire de transferts privés agréé · Conforme TÜRSAB","bookingConfirmed":"Réservation confirmée","referenceLabel":"Référence","weWillContact":"Votre demande de réservation a été envoyée. Nous vous contactons dans les 30 minutes.","chatWithUs":"Nous contacter","pickupAddressPlaceholder":"Nom de l'hôtel, rue, numéro et quartier","dropoffAddressPlaceholder":"Nom de l'hôtel, rue, numéro et quartier","hotelNamePlaceholder":"Nom de l'hôtel ou de l'hébergement","cashConfirmation":"Votre réservation est confirmée. Réglez le montant fixe directement au chauffeur.","bookingError":"Votre réservation n'a pas pu être finalisée. Veuillez réessayer.","formIncomplete":"Veuillez compléter les champs indiqués.","requiredField":"Ce champ est obligatoire.","destinationRequired":"Veuillez choisir une destination.","dateInvalid":"Veuillez choisir aujourd'hui ou une date future.","emailInvalid":"Veuillez saisir une adresse e-mail valide.","nameInvalid":"Veuillez saisir un nom complet valide.","phoneInvalid":"Saisissez un numéro valide avec l’indicatif du pays (par exemple +49).","flightInvalid":"Veuillez saisir un numéro de vol valide.","pickupAddressRequired":"L'adresse de prise en charge doit contenir entre 6 et 160 caractères.","dropoffAddressRequired":"L'adresse de destination doit contenir entre 6 et 160 caractères.","addressesMustDiffer":"Les adresses de prise en charge et de destination doivent être différentes.","customDestinationPrice":"Le prix sera confirmé après vérification de l'adresse de destination.","hotelNameRequired":"Veuillez saisir le nom de l'hôtel.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","quoteTitle":"Où souhaitez-vous aller ?","date":"Date","airportReturnPrice":"Le prix sera confirmé après vérification de l’hôtel ou de l’adresse de prise en charge.","oneGuest":"1 passager","twoGuests":"2 passagers","threeGuests":"3 passagers","fourGuests":"4 passagers","fiveGuests":"5 passagers","sixGuests":"6 passagers","sevenGuests":"7 passagers","viewQuote":"Voir le tarif","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Un vaste habitacle privé pour les grandes familles, les groupes de golf et les voyageurs avec beaucoup de bagages.","capacitySwitchedSprinter":"Passagers et bagages dépassent le Vito — passage au Mercedes Sprinter.","capacityNoVehicle":"Autant de passagers et de bagages dépasse nos véhicules. Contactez-nous sur WhatsApp.","leatherSeats":"Sièges en cuir premium","water":"Eau minérale fraîche","from":"À partir de","reviewOne":"« Notre chauffeur a attendu malgré 90 minutes de retard. Le véhicule était impeccable, agréablement frais et déjà équipé des deux sièges enfants. Exactement l'accueil dont notre famille avait besoin. »","reviewTwo":"« Du premier contact WhatsApp à notre arrivée à Belek, absolument irréprochable. Ponctuel, discret et très professionnel. Nos sacs de golf ont aussi tenu sans problème. »","reviewThree":"« C'était comme un service de chauffeur d'hôtel, pas un taxi d'aéroport. Communication claire, véhicule impeccable et chauffeur sincèrement courtois. »","perVehicle":"par véhicule · prix fixe","quoteReady":"Votre transfert privé","journeyTime":"Durée du trajet","totalFixed":"Prix total","confirmWhatsapp":"Confirmer via WhatsApp","bookNowCta":"Réserver maintenant","backToQuote":"Retour","yourDetails":"Vos coordonnées","flightNumber":"Numéro de vol","flightArrivalTime":"Heure d'arrivée","notesLabel":"Demandes spéciales","confirmBooking":"Confirmer la réservation","paySecurely":"Continuer vers le paiement sécurisé","payLaterNote":"Paiement en ligne sécurisé après confirmation.","paymentTitle":"Paiement sécurisé","paymentError":"Paiement échoué. Veuillez réessayer."},"sv":{"navFleet":"Fordon","navService":"Service","navFairPricing":"Rättvist pris","navRoutes":"Rutter","navReviews":"Recensioner","navContact":"Kontakt","bookNow":"Boka nu","alwaysAvailable":"Tillgänglig 24 timmar om dygnet","heroEyebrow":"Privat chaufförstjänst · Antalya","campaignBadge":"Online special","campaignDiscount":"25% off","campaignScope":"all transfer prices","heroTitle":"Premium flygplatstransfers<br />i Antalya","heroSubtitle":"Privata transfers med chaufför från Antalya flygplats till Belek, Side, Kemer och Alanya.","bookTransfer":"Boka transfer","instantQuote":"Få pris direkt","googleRated":"Google-betyg","trustedGuests":"Anlitad av över 2 500 gäster","discover":"Utforska","tbLicensed":"TÜRSAB-licensierad","tbFlightTracking":"Flygspårning","tbFixedPrice":"Fast pris","tb247Concierge":"Concierge dygnet runt","tbChildSeats":"Bilbarnstolar ingår","privateJourney":"Din privata resa","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Hämtplats","airportOption":"Antalya flygplats (AYT)","hotelOption":"Hotell","privateAddressOption":"Privat adress","destination":"Destination","selectDestination":"Välj destination","vehicle":"Fordon","guests":"Gäster","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Välj tid","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Fullständig hämtningsadress","dropoffAddress":"Fullständig destinationsadress","luggageLabel":"Stort bagage","hotelNameLabel":"Hotellnamn","childSeatLabel":"Barnstolar","childSeatNone":"Ingen barnstol","oneChildSeat":"1 barnstol","twoChildSeats":"2 barnstolar","threeChildSeats":"3 barnstolar","fourChildSeats":"4 barnstolar","fullName":"Fullständigt namn","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-post","paymentMethod":"Välj betalningsmetod","cashPayment":"Betala i fordonet","recommended":"Rekommenderas","cashPaymentDescription":"Ingen förskottsbetalning. Betala din chaufför direkt när du är nöjd med tjänsten.","quoteIncludes":"Inkluderar: välkomnande, flygspårning, parkering, väntetid och mineralvatten.","confirmCashBooking":"Bekräfta — betala i fordonet","flightTracking":"Flygspårning i realtid","fixedPrice":"Garanterat fast pris","meetGreet":"Personlig välkomst","speakingDrivers":"Chaufförer som talar engelska och tyska","fromAirport":"Från Antalya flygplats","campaignApplied":"Online -15% already applied","welcomeEyebrow":"Välkommen till högsta nivå","welcomeTitle":"Res med stil.<br />Anländ avslappnad.","welcomeBody":"Från det ögonblick ditt plan landar är varje detalj ordnad. Din chaufför väntar i ankomsthallen, tar hand om ditt bagage och eskorterar dig till ditt noggrant förberedda fordon.","ourStandards":"Våra servicestandarder","concierge":"Concierge-service","guestsWelcomed":"Välkomnade gäster","guestRating":"Genomsnittligt gästbetyg","privateTransfers":"Privata transfers","fleetEyebrow":"Vår flotta","fleetTitle":"Ditt privata utrymme,<br />perfekt i varje detalj.","fleetIntro":"Res bekvämt med gott om plats för familjen, golfbagaget och resväskorna.","signatureFleet":"Signature-flotta","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Riktmärket för sofistikerade gruppresor: rymlig, exceptionellt tyst och utrustad för en smidig ankomst.","passengers":"passagerare","suitcases":"resväskor","television":"TV i fordonet","coldDrinks":"Kalla drycker","snacks":"Snacks","childSeats":"Bilbarnstolar på begäran","wifi":"Gratis WiFi","nameSignGreeting":"Välkomnande med personlig namnskylt","reserveVehicle":"Boka fordon","insideVclass":"Sprinter interiör","interiorTitle":"En privat lounge<br />mellan flygplatsen och hotellet.","serviceEyebrow":"Antalya VIP-standarden","serviceTitle":"Mer än en transfer.<br />Ett exceptionellt välkomnande.","serviceIntro":"Uppmärksamhet på hotellnivå, erfarna lokala chaufförer och fullständigt lugn från flygplats till resort.","trackingTitle":"Flygspårning","trackingBody":"Vi spårar din flyg i realtid och anpassar automatiskt hämtningstiden utan extra kostnad.","chauffeurTitle":"Professionella chaufförer","chauffeurBody":"Alltid välvårdade, diskreta och utvalda för lokal kunskap och högsta servicestandard.","greetTitle":"Meet & Greet","greetBody":"Din chaufför välkomnar dig i ankomsthallen med en skylt med ditt namn och hjälper med bagaget.","supportTitle":"Concierge 24/7","supportBody":"Före, under och efter din resa finns alltid någon tillgänglig per telefon eller WhatsApp.","priceTitle":"Fasta priser","priceBody":"Det bekräftade priset är slutpriset. Väntetid, parkering och flygförseningar ingår.","familyTitle":"För familjer","familyBody":"Lämpliga bilbarnstolar, rymliga interiörer och tålmodig hjälp för en avslappnad familjeankomst.","routesEyebrow":"Våra populäraste rutter","routesTitle":"Från Antalya flygplats<br />till Turkiska Rivieran.","routesIntro":"Alla priser gäller per fordon, aldrig per person. Gratis väntetid ingår.","discountPricesShown":"Online -15% prices shown","golfFavourite":"Golfarnas favorit","onlineDiscountShort":"Online -25%","reviewsEyebrow":"Gästrecensioner","reviewsTitle":"Service som minns<br />länge efter ankomsten.","googleReviews":"Baserat på 387 verifierade Google-recensioner","trustedBy":"Anlitad av gäster på ledande resorts i Antalya","processEyebrow":"Medvetet enkelt","processTitle":"Fyra steg till<br />en avslappnad ankomst.","stepOne":"Välj destination","stepOneBody":"Berätta för oss vart och när du vill resa.","stepTwo":"Välj fordon","stepTwoBody":"Välj rätt utrymme och komfort.","stepThree":"Bekräfta bokning","stepThreeBody":"Få din bekräftelse direkt till fast pris.","stepFour":"Möt din chaufför","stepFourBody":"Din chaufför välkomnar dig i ankomsthallen.","pricingEyebrow":"Res med lugn","pricingTitle":"Kundvänlig prissättning.<br />Du betalar det som är rättvist.","pricingIntro":"Vi erbjuder fasta priser för trygghet, men mäter även den faktiska sträckan. Du betalar alltid det lägre beloppet.","pricingFixedPrice":"Fast pris","fixedPriceExample":"Transfer till Belek: {{PRICE:belek:vito}} €","fixedPriceDesc":"Garanterat totalbelopp. Inkluderar flygplatsavgifter, parkering, väntetid och skatter.","distancePrice":"Efter sträcka","distancePriceExample":"24 km onlineexempel: 25 €","distancePriceDesc":"Mäts med GPS under din resa.","youPay":"Du betalar","youPayPrice":"25 €","youPayDesc":"Det lägre beloppet gäller. Chauffören bekräftar i slutet.","pricingNote":"Inga överraskningar. Inga dolda avgifter. Du betalar det du bokar - eller mindre.","faqEyebrow":"Vanliga frågor","faqTitle":"Innan din resa.","faqIntro":"Allt du behöver veta om din privata transfer från Antalya flygplats.","askQuestion":"Ställ en fråga","faqOneQ":"Vad händer vid en flygförsening?","faqOneA":"Vi spårar varje ankomst i realtid. Din hämtningstid justeras automatiskt och din chaufför väntar utan extra kostnad.","faqTwoQ":"Var möter jag min chaufför?","faqTwoA":"Din chaufför väntar direkt efter bagageutlämningen i ankomsthallen med en personlig skylt med ditt namn.","faqThreeQ":"Finns det bilbarnstolar?","faqThreeA":"Ja. Babyskydd, barnstolar och bälteskuddar finns tillgängliga utan extra kostnad vid förbeställning.","faqFourQ":"Kan golfbagar och stort bagage transporteras?","faqFourA":"Ja. Sprinter och Vito är idealiska för golfsällskap. Meddela oss om ditt bagage så planerar vi rätt fordon.","faqFiveQ":"Är det visade priset slutgiltigt?","faqFiveA":"Ja. Flygplatsavgifter, parkering, väntetid och skatter ingår. Inga dolda kostnader.","contactEyebrow":"Din resa börjar här","contactTitle":"Anländ till Antalya<br />på ett exceptionellt sätt.","contactBody":"Boka online på under två minuter eller prata direkt med vårt concierge-team dygnet runt.","whatsappUs":"WhatsApp","replyMinutes":"Svar vanligtvis inom några minuter","callUs":"Ring 24/7","emailUs":"Concierge e-post","replyHour":"Svar inom en timme","footerTagline":"Privata chaufförstjänster längs hela Turkiska Rivieran.","explore":"Utforska","information":"Information","licensed":"Licensierad privat transferoperatör · TÜRSAB-kompatibel","bookingConfirmed":"Bokning bekräftad","referenceLabel":"Referensnummer","weWillContact":"Din bokningsförfrågan har skickats. Vi kontaktar dig inom 30 minuter.","chatWithUs":"Chatta med oss","pickupAddressPlaceholder":"Hotellnamn, gata, husnummer och område","dropoffAddressPlaceholder":"Hotellnamn, gata, husnummer och område","hotelNamePlaceholder":"Hotell- eller boendenamn","cashConfirmation":"Din bokning är bekräftad. Betala det fasta beloppet direkt till chauffören.","bookingError":"Bokningen kunde inte slutföras. Försök igen.","formIncomplete":"Fyll i de markerade fälten.","requiredField":"Detta fält är obligatoriskt.","destinationRequired":"Välj en destination.","dateInvalid":"Välj dagens datum eller ett framtida datum.","emailInvalid":"Ange en giltig e-postadress.","nameInvalid":"Ange ett giltigt fullständigt namn.","phoneInvalid":"Ange ett giltigt nummer med landskod (till exempel +49).","flightInvalid":"Ange ett giltigt flightnummer.","pickupAddressRequired":"Hämtningsadressen måste vara mellan 6 och 160 tecken.","dropoffAddressRequired":"Destinationsadressen måste vara mellan 6 och 160 tecken.","addressesMustDiffer":"Hämtnings- och destinationsadressen måste vara olika.","customDestinationPrice":"Priset bekräftas efter att destinationsadressen kontrollerats.","hotelNameRequired":"Ange hotellnamnet.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","quoteTitle":"Vart vill du åka?","date":"Datum","airportReturnPrice":"Priset bekräftas efter att hotellet eller hämtningsadressen har kontrollerats.","oneGuest":"1 gäst","twoGuests":"2 gäster","threeGuests":"3 gäster","fourGuests":"4 gäster","fiveGuests":"5 gäster","sixGuests":"6 gäster","sevenGuests":"7 gäster","viewQuote":"Visa pris","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"En rymlig privat kabin för större familjer, golfsällskap och gäster med mycket bagage.","capacitySwitchedSprinter":"Passagerare och bagage överstiger Vito — bytte till Mercedes Sprinter.","capacityNoVehicle":"Så många passagerare och bagage överstiger våra fordon. Kontakta oss på WhatsApp.","leatherSeats":"Premium läderstolar","water":"Kylt mineralvatten","from":"Från","reviewOne":"„Vår chaufför väntade trots 90 minuters försening. Fordonet var makulöst, behagligt svalt och redan utrustat med båda barnstolarna. Precis det välkomnande vår familj behövde.”","reviewTwo":"„Från första WhatsApp-kontakten till ankomst i Belek absolut förstklassigt. Punktlig, diskret och mycket professionell. Våra golfbagar fick också plats utan problem.”","reviewThree":"„Det kändes som en chaufförstjänst från ett hotell, inte en flygplatstaxibil. Tydlig kommunikation, ett makulöst fordon och en genuint artig chaufför.”","perVehicle":"per fordon · fast pris","quoteReady":"Din privata transfer","journeyTime":"Restid","totalFixed":"Totalt pris","confirmWhatsapp":"Bekräfta via WhatsApp","bookNowCta":"Boka nu","backToQuote":"Tillbaka","yourDetails":"Dina uppgifter","flightNumber":"Flygnummer","flightArrivalTime":"Ankomsttid","notesLabel":"Särskilda önskemål","confirmBooking":"Bekräfta bokning","paySecurely":"Fortsätt till säker betalning","payLaterNote":"Säker onlinebetalning efter bekräftelse.","paymentTitle":"Säker betalning","paymentError":"Betalning misslyckades. Försök igen."},"ja":{"navFleet":"車両","navService":"サービス","navFairPricing":"適正価格","navRoutes":"ルート","navReviews":"口コミ","navContact":"お問い合わせ","bookNow":"今すぐ予約","alwaysAvailable":"年中無休・24時間対応","heroEyebrow":"プライベートショーファーサービス · アンタルヤ","campaignBadge":"Online special","campaignDiscount":"25% off","campaignScope":"all transfer prices","heroTitle":"アンタルヤ空港からの<br />プレミアム送迎サービス","heroSubtitle":"アンタルヤ空港からベレック、シデ、ケメル、アランヤへ専属ショーファー付きプライベート送迎。","bookTransfer":"送迎を予約する","instantQuote":"料金を確認する","googleRated":"Google評価","trustedGuests":"2,500名以上のお客様にご利用いただいています","discover":"詳しく見る","tbLicensed":"TÜRSAB認可","tbFlightTracking":"フライト追跡","tbFixedPrice":"固定料金","tb247Concierge":"24時間コンシェルジュ","tbChildSeats":"チャイルドシート込み","privateJourney":"あなただけのプライベートな旅","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"お迎え場所","airportOption":"アンタルヤ空港 (AYT)","hotelOption":"ホテル","privateAddressOption":"個人住所","destination":"目的地","selectDestination":"目的地を選択","vehicle":"車両","guests":"ご利用人数","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"時間を選択","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"お迎え先の詳しい住所","dropoffAddress":"目的地の詳しい住所","luggageLabel":"大型荷物","hotelNameLabel":"ホテル名","childSeatLabel":"チャイルドシート","childSeatNone":"チャイルドシート不要","oneChildSeat":"チャイルドシート 1台","twoChildSeats":"チャイルドシート 2台","threeChildSeats":"チャイルドシート 3台","fourChildSeats":"チャイルドシート 4台","fullName":"氏名","phoneLabel":"電話 / WhatsApp","emailLabel":"メールアドレス","paymentMethod":"お支払い方法を選択","cashPayment":"車内で支払う","recommended":"おすすめ","cashPaymentDescription":"事前のお支払いは不要です。サービスにご満足いただいてから、ドライバーへ直接お支払いください。","quoteIncludes":"ミート＆グリート、フライト追跡、駐車料金、待機時間、ミネラルウォーター込み。","confirmCashBooking":"予約確定 — 車内払い","flightTracking":"リアルタイムフライト追跡","fixedPrice":"料金固定保証","meetGreet":"ミート＆グリートサービス","speakingDrivers":"英語・ドイツ語対応ショーファー","fromAirport":"アンタルヤ空港から","campaignApplied":"Online -15% already applied","welcomeEyebrow":"最高水準のサービスへようこそ","welcomeTitle":"上質な旅を。<br />安心してご到着を。","welcomeBody":"着陸の瞬間から、すべての細部が整っています。ショーファーが到着ロビーでお待ちし、お荷物をお預かりして、丁寧に準備された専用車両へとご案内します。","ourStandards":"私たちのサービス基準","concierge":"コンシェルジュサービス","guestsWelcomed":"お迎えしたゲスト数","guestRating":"ゲスト平均評価","privateTransfers":"プライベート送迎","fleetEyebrow":"車両ラインナップ","fleetTitle":"あなただけのプライベート空間。<br />細部まで完璧に。","fleetIntro":"ご家族、ゴルフ用具、荷物のための十分なスペースを備えた快適な移動をお楽しみください。","signatureFleet":"シグネチャーフリート","fleetVclassClass":"ビジネス · ファーストクラス","fleetVclassDescription":"洗練されたグループ旅行の基準。広々とした車内、卓越した静粛性、シームレスなご到着のための装備が揃っています。","passengers":"名","suitcases":"個のスーツケース","television":"車内テレビ","coldDrinks":"冷たいお飲み物","snacks":"スナック","childSeats":"チャイルドシート（ご要望に応じて）","wifi":"無料WiFi","nameSignGreeting":"お名前ボードでのお出迎え","reserveVehicle":"この車両を予約する","insideVclass":"Sprinterインテリア","interiorTitle":"空港とホテルの間の<br />プライベートラウンジ。","serviceEyebrow":"Antalya VIPスタンダード","serviceTitle":"送迎以上のもの。<br />特別なお出迎え。","serviceIntro":"5つ星ホテルレベルのアテンション、経験豊富な地元ショーファー、空港からリゾートまでの完全な安心感。","trackingTitle":"フライト追跡","trackingBody":"フライトをリアルタイムで追跡し、追加料金なしでお迎え時間を自動的に調整します。","chauffeurTitle":"プロフェッショナルショーファー","chauffeurBody":"常に清潔感があり、思いやりがあり、地元知識と最高のサービス基準のために厳選されています。","greetTitle":"ミート＆グリート","greetBody":"ショーファーはお名前のボードを持って到着ロビーでお出迎えし、お荷物をお手伝いします。","supportTitle":"24/7コンシェルジュ","supportBody":"旅の前・中・後、いつでも電話またはWhatsAppでご対応いたします。","priceTitle":"料金固定","priceBody":"確認された料金が最終料金です。待機時間、駐車料金、フライト遅延はすべて含まれています。","familyTitle":"ご家族向け","familyBody":"年齢に合ったチャイルドシート、広々とした車内、ご家族の安心到着のための丁寧なサポート。","routesEyebrow":"人気のルート","routesTitle":"アンタルヤ空港から<br />トルコリビエラへ。","routesIntro":"すべての料金は車両ごと（お一人様ではありません）。無料待機時間込み。","discountPricesShown":"Online -15% prices shown","golfFavourite":"ゴルファーに人気","onlineDiscountShort":"Online -25%","reviewsEyebrow":"お客様の声","reviewsTitle":"到着後も語り継がれる<br />サービス。","googleReviews":"387件のGoogle認証レビューに基づく","trustedBy":"アンタルヤの一流リゾートのゲストにご利用いただいています","processEyebrow":"シンプルに設計","processTitle":"安心到着のための<br />4ステップ。","stepOne":"目的地を選ぶ","stepOneBody":"どこへ、いつ行きたいかをお知らせください。","stepTwo":"車両を選ぶ","stepTwoBody":"お好みのスペースと快適さをお選びください。","stepThree":"予約を確定する","stepThreeBody":"固定料金で即座に確認書を受け取れます。","stepFour":"ショーファーと合流","stepFourBody":"ショーファーが到着ロビーでお出迎えします。","pricingEyebrow":"安心してご利用いただけます","pricingTitle":"お客様にやさしい料金設定。<br />公平な金額だけをお支払い。","pricingIntro":"安心のため固定料金をご提示しつつ、実際の走行距離も計測します。お支払いは常に低い方の金額です。","pricingFixedPrice":"固定料金","fixedPriceExample":"ベレキ送迎：{{PRICE:belek:vito}} €","fixedPriceDesc":"保証された総額です。空港料金、駐車料金、待機時間、税金が含まれます。","distancePrice":"距離ベース","distancePriceExample":"24 km online example: 25 €","distancePriceDesc":"ご乗車中にGPSで計測します。","youPay":"お支払い額","youPayPrice":"25 €","youPayDesc":"低い方の金額を適用します。終了時にドライバーが確認します。","pricingNote":"追加の驚きはありません。隠れた料金もありません。予約時の金額、またはそれより少ない金額をお支払いいただきます。","faqEyebrow":"よくある質問","faqTitle":"ご旅行の前に。","faqIntro":"アンタルヤ空港からのプライベート送迎について知っておくべきこと。","askQuestion":"質問する","faqOneQ":"フライトが遅延した場合はどうなりますか？","faqOneA":"すべての到着便をリアルタイムで追跡しています。お迎え時間は自動的に調整され、ショーファーは追加料金なしでお待ちします。","faqTwoQ":"ショーファーはどこで待っていますか？","faqTwoA":"ショーファーは手荷物受取所の直後の到着ロビーで、お名前のボードを持ってお待ちしています。","faqThreeQ":"チャイルドシートはありますか？","faqThreeA":"はい。乳幼児用、チャイルドシート、ジュニアシートは予約時にご要望いただければ無料でご用意します。","faqFourQ":"ゴルフバッグや大きな荷物は運べますか？","faqFourA":"はい。SprinterとVitoはゴルフグループに最適です。荷物の詳細をお知らせいただければ、適切な車両をご手配します。","faqFiveQ":"表示された料金は確定ですか？","faqFiveA":"はい。空港税、駐車料金、待機時間、税金はすべて含まれています。隠れた費用はありません。","contactEyebrow":"旅はここから始まります","contactTitle":"アンタルヤへ<br />格別の到着を。","contactBody":"2分以内にオンライン予約、または24/7コンシェルジュチームに直接お問い合わせください。","whatsappUs":"WhatsApp","replyMinutes":"通常数分以内に返信","callUs":"24/7電話","emailUs":"コンシェルジュメール","replyHour":"1時間以内に返信","footerTagline":"トルコリビエラ全域のプライベートショーファーサービス。","explore":"探索する","information":"情報","licensed":"認定プライベート送迎事業者 · TÜRSAB準拠","bookingConfirmed":"予約確定","referenceLabel":"予約番号","weWillContact":"予約リクエストを送信しました。30分以内にご連絡いたします。","chatWithUs":"チャットする","pickupAddressPlaceholder":"ホテル名、通り、建物番号、地区","dropoffAddressPlaceholder":"ホテル名、通り、建物番号、地区","hotelNamePlaceholder":"ホテルまたは宿泊施設名","cashConfirmation":"予約が確定しました。固定料金を車内でドライバーへ直接お支払いください。","bookingError":"予約を完了できませんでした。もう一度お試しください。","formIncomplete":"表示された必須項目を入力してください。","requiredField":"この項目は必須です。","destinationRequired":"目的地を選択してください。","dateInvalid":"今日または今後の日付を選択してください。","emailInvalid":"有効なメールアドレスを入力してください。","nameInvalid":"有効な氏名を入力してください。","phoneInvalid":"国番号を含む有効な電話番号を入力してください（例：+49）。","flightInvalid":"有効なフライト番号を入力してください。","pickupAddressRequired":"お迎え先の住所は6文字以上160文字以内で入力してください。","dropoffAddressRequired":"目的地の住所は6文字以上160文字以内で入力してください。","addressesMustDiffer":"お迎え先と目的地には異なる住所を入力してください。","customDestinationPrice":"目的地の住所を確認後、料金をご案内いたします。","hotelNameRequired":"ホテル名を入力してください。","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","quoteTitle":"目的地をお知らせください","date":"日付","airportReturnPrice":"ホテルまたはお迎え先住所の確認後に料金をご案内します。","oneGuest":"1名","twoGuests":"2名","threeGuests":"3名","fourGuests":"4名","fiveGuests":"5名","sixGuests":"6名","sevenGuests":"7名","viewQuote":"料金を見る","fleetVitoClass":"VIP · グランドツーリング","fleetVitoDescription":"大家族、ゴルフグループ、大量の荷物をお持ちのゲストのための広々としたプライベートキャビン。","capacitySwitchedSprinter":"乗客と荷物がVitoの容量を超えています — メルセデス・スプリンターに変更しました。","capacityNoVehicle":"この人数と荷物は当社の車両を超えています。WhatsAppでお問い合わせください。","leatherSeats":"プレミアムレザーシート","water":"冷えたミネラルウォーター","from":"から","reviewOne":"「90分のフライト遅延にもかかわらず、ドライバーは待ってくれました。車両は完璧に清潔で心地よく冷えており、チャイルドシートも両方設置済みでした。家族が必要としていたまさにそのお出迎えでした。」","reviewTwo":"「最初のWhatsAppのやり取りからベレックへの到着まで、すべてが最高でした。時間通り、控えめで、とてもプロフェッショナル。ゴルフバッグも余裕で収まりました。」","reviewThree":"「空港タクシーではなく、ホテルのショーファーサービスのようでした。明確なコミュニケーション、完璧な車両、そして心から礼儀正しいドライバー。」","perVehicle":"車両ごと · 固定料金","quoteReady":"あなたのプライベート送迎","journeyTime":"所要時間","totalFixed":"合計料金","confirmWhatsapp":"WhatsAppで確認する","bookNowCta":"今すぐ予約","backToQuote":"戻る","yourDetails":"お客様情報","flightNumber":"フライト番号","flightArrivalTime":"到着時刻","notesLabel":"特別なご要望","confirmBooking":"予約を確定する","paySecurely":"安全なお支払いへ進む","payLaterNote":"確認後にオンラインで安全にお支払い。","paymentTitle":"安全なお支払い","paymentError":"お支払いに失敗しました。もう一度お試しください。"},"ko":{"navFleet":"차량","navService":"서비스","navFairPricing":"공정한 요금","navRoutes":"노선","navReviews":"리뷰","navContact":"문의","bookNow":"지금 예약","alwaysAvailable":"연중무휴 24시간 운영","heroEyebrow":"프라이빗 쇼퍼 서비스 · 안탈리아","campaignBadge":"Online special","campaignDiscount":"25% off","campaignScope":"all transfer prices","heroTitle":"안탈리아 공항에서<br />프리미엄 공항 픽업 서비스","heroSubtitle":"안탈리아 공항에서 벨렉, 시데, 케메르, 알란야까지 전담 쇼퍼와 함께하는 프라이빗 이동.","bookTransfer":"셔틀 예약하기","instantQuote":"요금 확인하기","googleRated":"Google 평점","trustedGuests":"2,500명 이상의 고객이 이용했습니다","discover":"자세히 보기","tbLicensed":"TÜRSAB 인증","tbFlightTracking":"항공편 추적","tbFixedPrice":"고정 요금","tb247Concierge":"24/7 컨시어지","tbChildSeats":"카시트 포함","privateJourney":"나만의 프라이빗 여행","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"픽업 장소","airportOption":"안탈리아 공항 (AYT)","hotelOption":"호텔","privateAddressOption":"개인 주소","destination":"목적지","selectDestination":"목적지 선택","vehicle":"차량","guests":"인원","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"시간 선택","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"전체 픽업 주소","dropoffAddress":"전체 목적지 주소","luggageLabel":"대형 수하물","hotelNameLabel":"호텔명","childSeatLabel":"어린이 좌석","childSeatNone":"어린이 좌석 없음","oneChildSeat":"어린이 좌석 1개","twoChildSeats":"어린이 좌석 2개","threeChildSeats":"어린이 좌석 3개","fourChildSeats":"어린이 좌석 4개","fullName":"성명","phoneLabel":"전화 / WhatsApp","emailLabel":"이메일","paymentMethod":"결제 방법 선택","cashPayment":"차량에서 결제","recommended":"추천","cashPaymentDescription":"선결제는 필요 없습니다. 서비스에 만족하신 후 기사에게 직접 결제하세요.","quoteIncludes":"미트 앤 그리트, 항공편 추적, 주차비, 대기 시간, 생수 포함.","confirmCashBooking":"예약 확정 — 차량에서 결제","flightTracking":"실시간 항공편 추적","fixedPrice":"고정 요금 보장","meetGreet":"미트 앤 그리트 서비스","speakingDrivers":"영어·독일어 가능 쇼퍼","fromAirport":"안탈리아 공항에서","campaignApplied":"Online -15% already applied","welcomeEyebrow":"최고 수준의 서비스에 오신 것을 환영합니다","welcomeTitle":"품격 있게 이동하세요.<br />편안하게 도착하세요.","welcomeBody":"착륙하는 순간부터 모든 세부 사항이 준비되어 있습니다. 쇼퍼가 도착 로비에서 기다리며 수하물을 챙기고 세심하게 준비된 전용 차량으로 안내해 드립니다.","ourStandards":"저희 서비스 기준","concierge":"컨시어지 서비스","guestsWelcomed":"환영한 고객 수","guestRating":"평균 고객 평점","privateTransfers":"프라이빗 이동","fleetEyebrow":"차량 라인업","fleetTitle":"나만의 프라이빗 공간,<br />세부 사항까지 완벽하게.","fleetIntro":"가족, 골프 장비, 여행 가방을 위한 충분한 공간을 갖춘 편안한 이동을 경험하세요.","signatureFleet":"시그니처 플릿","fleetVclassClass":"비즈니스 · 퍼스트클래스","fleetVclassDescription":"정교한 그룹 여행의 기준. 넓고, 탁월하게 조용하며, 원활한 도착을 위한 장비를 갖추고 있습니다.","passengers":"명","suitcases":"개의 캐리어","television":"차량 내 TV","coldDrinks":"차가운 음료","snacks":"스낵","childSeats":"요청 시 카시트 제공","wifi":"무료 WiFi","nameSignGreeting":"이름 팻말을 든 맞춤 영접","reserveVehicle":"이 차량 예약하기","insideVclass":"Sprinter 인테리어","interiorTitle":"공항과 호텔 사이의<br />프라이빗 라운지.","serviceEyebrow":"Antalya VIP 기준","serviceTitle":"단순한 이동 그 이상.<br />특별한 환영.","serviceIntro":"5성급 호텔 수준의 세심한 배려, 경험 풍부한 현지 쇼퍼, 공항에서 리조트까지 완전한 안심.","trackingTitle":"항공편 추적","trackingBody":"항공편을 실시간으로 추적하여 추가 비용 없이 픽업 시간을 자동으로 조정합니다.","chauffeurTitle":"전문 쇼퍼","chauffeurBody":"항상 단정하고 신중하며, 현지 지식과 최고 서비스 기준으로 선별된 전문가들입니다.","greetTitle":"미트 앤 그리트","greetBody":"쇼퍼가 이름이 적힌 팻말을 들고 도착 로비에서 환영하며 수하물을 도와드립니다.","supportTitle":"24/7 컨시어지","supportBody":"여행 전, 중, 후 언제든지 전화 또는 WhatsApp으로 담당자와 연결됩니다.","priceTitle":"고정 요금","priceBody":"확인된 요금이 최종 요금입니다. 대기 시간, 주차비, 항공편 지연이 모두 포함됩니다.","familyTitle":"가족을 위한","familyBody":"연령에 맞는 카시트, 넓은 실내, 편안한 가족 도착을 위한 세심한 도움.","routesEyebrow":"인기 노선","routesTitle":"안탈리아 공항에서<br />터키 리비에라까지.","routesIntro":"모든 요금은 차량 기준(1인 기준 아님)입니다. 무료 대기 시간 포함.","discountPricesShown":"Online -15% prices shown","golfFavourite":"골퍼들의 인기 선택","onlineDiscountShort":"Online -25%","reviewsEyebrow":"고객 후기","reviewsTitle":"도착 후에도 오래 기억되는<br />서비스.","googleReviews":"387건의 Google 인증 리뷰 기준","trustedBy":"안탈리아 주요 리조트 고객들이 선택했습니다","processEyebrow":"의도적으로 간단하게","processTitle":"편안한 도착을 위한<br />4단계.","stepOne":"목적지 선택","stepOneBody":"어디로, 언제 이동하고 싶은지 알려주세요.","stepTwo":"차량 선택","stepTwoBody":"적합한 공간과 편의를 선택하세요.","stepThree":"예약 확정","stepThreeBody":"고정 요금으로 즉시 확인서를 받으세요.","stepFour":"쇼퍼 만나기","stepFourBody":"쇼퍼가 도착 로비에서 환영합니다.","pricingEyebrow":"안심 요금","pricingTitle":"고객 친화적인 요금.<br />공정한 금액만 결제하세요.","pricingIntro":"안심하실 수 있도록 고정 요금을 제시하지만 실제 이동 거리도 측정합니다. 언제나 더 낮은 금액을 결제합니다.","pricingFixedPrice":"고정 요금","fixedPriceExample":"벨렉 이동: {{PRICE:belek:vito}} €","fixedPriceDesc":"보장된 총액입니다. 공항 수수료, 주차비, 대기 시간, 세금이 포함됩니다.","distancePrice":"거리 기준","distancePriceExample":"24 km online example: 25 €","distancePriceDesc":"이동 중 GPS로 측정합니다.","youPay":"결제 금액","youPayPrice":"25 €","youPayDesc":"더 낮은 금액이 적용됩니다. 종료 시 기사가 확인합니다.","pricingNote":"놀랄 일도, 숨겨진 비용도 없습니다. 예약한 금액을 결제하거나 그보다 적게 결제합니다.","faqEyebrow":"자주 묻는 질문","faqTitle":"여행 전에.","faqIntro":"안탈리아 공항 프라이빗 픽업에 대해 알아야 할 모든 것.","askQuestion":"질문하기","faqOneQ":"항공편이 지연되면 어떻게 되나요?","faqOneA":"모든 도착 항공편을 실시간으로 추적합니다. 픽업 시간은 자동으로 조정되며 쇼퍼는 추가 비용 없이 기다립니다.","faqTwoQ":"기사님은 어디에서 기다리시나요?","faqTwoA":"쇼퍼는 수하물 수취 바로 다음 도착 로비에서 이름이 적힌 팻말을 들고 기다립니다.","faqThreeQ":"카시트를 이용할 수 있나요?","faqThreeA":"네. 신생아용 카시트, 아동용 카시트, 부스터 시트는 예약 시 요청하시면 무료로 제공됩니다.","faqFourQ":"골프백과 대형 수하물도 운반할 수 있나요?","faqFourA":"네. Sprinter와 Vito는 골프 그룹에 이상적입니다. 수하물 정보를 알려주시면 적합한 차량을 준비합니다.","faqFiveQ":"표시된 요금이 최종 요금인가요?","faqFiveA":"네. 공항 세금, 주차비, 대기 시간, 세금이 모두 포함됩니다. 숨겨진 비용이 없습니다.","contactEyebrow":"여행은 여기서 시작됩니다","contactTitle":"안탈리아에<br />특별하게 도착하세요.","contactBody":"2분 이내에 온라인 예약하거나 24/7 컨시어지 팀에 직접 문의하세요.","whatsappUs":"WhatsApp","replyMinutes":"보통 몇 분 내로 답변","callUs":"24/7 전화","emailUs":"컨시어지 이메일","replyHour":"1시간 내 답변","footerTagline":"터키 리비에라 전역의 프라이빗 쇼퍼 서비스.","explore":"탐색","information":"정보","licensed":"인증된 프라이빗 이동 사업자 · TÜRSAB 준수","bookingConfirmed":"예약 확정","referenceLabel":"예약 번호","weWillContact":"예약 요청이 전송되었습니다. 30분 내로 연락드리겠습니다.","chatWithUs":"채팅하기","pickupAddressPlaceholder":"호텔명, 도로명, 건물 번호 및 지역","dropoffAddressPlaceholder":"호텔명, 도로명, 건물 번호 및 지역","hotelNamePlaceholder":"호텔 또는 숙소 이름","cashConfirmation":"예약이 확정되었습니다. 차량에서 기사에게 고정 요금을 직접 결제하세요.","bookingError":"예약을 완료하지 못했습니다. 다시 시도해 주세요.","formIncomplete":"표시된 필수 항목을 입력해 주세요.","requiredField":"필수 입력 항목입니다.","destinationRequired":"목적지를 선택해 주세요.","dateInvalid":"오늘 또는 이후 날짜를 선택해 주세요.","emailInvalid":"올바른 이메일 주소를 입력해 주세요.","nameInvalid":"올바른 전체 이름을 입력해 주세요.","phoneInvalid":"국가 코드를 포함한 올바른 번호를 입력해 주세요(예: +49).","flightInvalid":"올바른 항공편 번호를 입력해 주세요.","pickupAddressRequired":"픽업 주소는 6자 이상 160자 이하로 입력해 주세요.","dropoffAddressRequired":"목적지 주소는 6자 이상 160자 이하로 입력해 주세요.","addressesMustDiffer":"픽업 주소와 목적지 주소는 달라야 합니다.","customDestinationPrice":"목적지 주소 확인 후 가격이 확정됩니다.","hotelNameRequired":"호텔명을 입력해 주세요.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","quoteTitle":"어디로 모셔다 드릴까요?","date":"날짜","airportReturnPrice":"호텔 또는 픽업 주소를 확인한 후 요금을 안내해 드립니다.","oneGuest":"1명","twoGuests":"2명","threeGuests":"3명","fourGuests":"4명","fiveGuests":"5명","sixGuests":"6명","sevenGuests":"7명","viewQuote":"요금 보기","fleetVitoClass":"VIP · 그랜드 투어링","fleetVitoDescription":"대가족, 골프 그룹, 짐이 많은 고객을 위한 넓은 프라이빗 캐빈.","capacitySwitchedSprinter":"승객과 수하물이 비토 용량을 초과합니다 — 메르세데스 스프린터로 변경되었습니다.","capacityNoVehicle":"이 인원과 수하물은 차량 용량을 초과합니다. WhatsApp으로 문의해 주세요.","leatherSeats":"프리미엄 가죽 시트","water":"시원한 생수","from":"부터","reviewOne":"\\"90분 지연에도 불구하고 기사님이 기다려 주셨습니다. 차량은 완벽하게 청결하고 시원했으며 카시트 두 개도 이미 설치되어 있었습니다. 저희 가족에게 꼭 필요한 환영이었습니다.\\"","reviewTwo":"\\"첫 WhatsApp 연락부터 벨렉 도착까지 모든 것이 최고였습니다. 시간 엄수, 세심함, 매우 전문적. 골프백도 여유롭게 들어갔습니다.\\"","reviewThree":"\\"공항 택시가 아닌 호텔 쇼퍼 서비스 같았습니다. 명확한 소통, 완벽한 차량, 진심으로 예의 바른 기사님.\\"","perVehicle":"차량 기준 · 고정 요금","quoteReady":"나의 프라이빗 이동","journeyTime":"소요 시간","totalFixed":"총 요금","confirmWhatsapp":"WhatsApp으로 확인하기","bookNowCta":"지금 예약","backToQuote":"뒤로","yourDetails":"고객 정보","flightNumber":"항공편 번호","flightArrivalTime":"도착 시간","notesLabel":"특별 요청","confirmBooking":"예약 확정하기","paySecurely":"안전한 결제로 이동","payLaterNote":"확인 후 안전하게 온라인 결제.","paymentTitle":"안전한 결제","paymentError":"결제에 실패했습니다. 다시 시도해 주세요."},"ar":{"navFleet":"أسطولنا","navService":"الخدمات","navFairPricing":"أسعار عادلة","navRoutes":"الوجهات","navReviews":"التقييمات","navContact":"اتصل بنا","bookNow":"احجز الآن","alwaysAvailable":"متاحون على مدار الساعة، كل يوم","heroEyebrow":"خدمة سائق خاص · أنطاليا","campaignBadge":"عرض الحجز عبر الإنترنت","campaignDiscount":"خصم 15٪","campaignScope":"على جميع أسعار النقل","heroTitle":"خدمة نقل فاخرة من المطار<br />في أنطاليا","heroSubtitle":"خدمة نقل خاصة مع سائق من مطار أنطاليا إلى بيليك وسيده وكيمر وألانيا.","bookTransfer":"احجز خدمة النقل","instantQuote":"احصل على السعر فوراً","googleRated":"تقييم Google","trustedGuests":"اختيار أكثر من 2,500 ضيف","discover":"اكتشف المزيد","tbLicensed":"مرخصون من TÜRSAB","tbFlightTracking":"تتبع الرحلات","tbFixedPrice":"سعر ثابت","tb247Concierge":"كونسيرج 24/7","tbChildSeats":"مقاعد أطفال مشمولة","privateJourney":"رحلتك الخاصة","tripType":"نوع الرحلة","oneWay":"ذهاب فقط","roundTrip":"ذهاب وعودة","roundTripHint":"في رحلة الذهاب والعودة، تكون رحلة العودة على المسار نفسه بالاتجاه المعاكس.","pickup":"مكان الاستقبال","airportOption":"مطار أنطاليا (AYT)","hotelOption":"فندق","privateAddressOption":"عنوان خاص","destination":"الوجهة","selectDestination":"اختر الوجهة","vehicle":"السيارة","guests":"الركاب","arrivalDate":"تاريخ الوصول","arrivalFlightTime":"وقت وصول الرحلة","chooseTime":"اختر الوقت","arrivalFlightNumber":"رقم رحلة الوصول","returnDate":"تاريخ العودة","returnPickupTime":"وقت الاستقبال للعودة","returnFlightNumber":"رقم رحلة العودة","pickupAddress":"عنوان الاستقبال الكامل","dropoffAddress":"عنوان الوصول الكامل","luggageLabel":"أمتعة كبيرة","hotelNameLabel":"اسم الفندق","childSeatLabel":"مقاعد الأطفال","childSeatNone":"من دون مقعد أطفال","oneChildSeat":"مقعد أطفال واحد","twoChildSeats":"مقعدا أطفال","threeChildSeats":"3 مقاعد أطفال","fourChildSeats":"4 مقاعد أطفال","fullName":"الاسم الكامل","phoneLabel":"الهاتف / WhatsApp","emailLabel":"البريد الإلكتروني","paymentMethod":"اختر طريقة الدفع","cashPayment":"الدفع داخل السيارة","recommended":"موصى به","cashPaymentDescription":"لا يلزم الدفع مقدماً. ادفع مباشرة إلى السائق بعد أن تكون راضياً عن الخدمة.","quoteIncludes":"يشمل الاستقبال والترحيب، وتتبع الرحلة، ومواقف السيارات، والانتظار، والمياه.","confirmCashBooking":"تأكيد الحجز — الدفع داخل السيارة","flightTracking":"تتبع الرحلة مباشرة","fixedPrice":"سعر ثابت مضمون","meetGreet":"استقبال شخصي","speakingDrivers":"سائقون يتحدثون الإنجليزية والألمانية","fromAirport":"من مطار أنطاليا","campaignApplied":"تم تطبيق خصم الإنترنت 15٪","welcomeEyebrow":"مرحباً بك في مستوى أرقى من الخدمة","welcomeTitle":"سافر بأناقة.<br />وصل براحة.","welcomeBody":"منذ لحظة هبوطك، نعتني بكل التفاصيل. ينتظرك سائقك في صالة الوصول، ويساعدك في الأمتعة، ويرافقك إلى سيارتك الخاصة المجهزة بعناية.","ourStandards":"معايير خدمتنا","concierge":"خدمة الكونسيرج","guestsWelcomed":"الضيوف الذين استقبلناهم","guestRating":"متوسط تقييم الضيوف","privateTransfers":"رحلات نقل خاصة","fleetEyebrow":"أسطولنا","fleetTitle":"مساحتك الخاصة،<br />مصممة بأدق التفاصيل.","fleetIntro":"سافر براحة مع مساحة واسعة للعائلة وحقائب الغولف والأمتعة.","signatureFleet":"الأسطول المميز","fleetVclassClass":"درجة رجال الأعمال · الدرجة الأولى","fleetVclassDescription":"وسيلة نقل VIP رحبة للمجموعات الكبيرة، مع مساحة واسعة للركاب والأمتعة.","passengers":"ركاب","suitcases":"حقائب","television":"تلفاز داخل السيارة","coldDrinks":"مشروبات باردة","snacks":"وجبات خفيفة","childSeats":"مقاعد أطفال عند الطلب","wifi":"واي فاي مجاني","nameSignGreeting":"استقبال شخصي بلافتة تحمل اسمك","reserveVehicle":"احجز هذه السيارة","insideVclass":"مقصورة Sprinter الداخلية","interiorTitle":"صالة خاصة بين<br />المطار والفندق.","serviceEyebrow":"معيار Antalya VIP","serviceTitle":"أكثر من مجرد نقل.<br />إنه ترحيب استثنائي.","serviceIntro":"عناية بمستوى الفنادق الفاخرة، وسائقون محليون ذوو خبرة، وراحة تامة من المطار إلى المنتجع.","trackingTitle":"تتبع الرحلة","trackingBody":"نتابع رحلتك مباشرة ونعدّل وقت الاستقبال تلقائياً من دون أي تكلفة إضافية.","chauffeurTitle":"سائقون محترفون","chauffeurBody":"سائقون أنيقون وكتومون دائماً، تم اختيارهم لمعرفتهم المحلية والتزامهم بأعلى معايير الخدمة.","greetTitle":"الاستقبال والترحيب","greetBody":"يستقبلك سائقك في صالة الوصول بلافتة تحمل اسمك ويساعدك في حمل الأمتعة.","supportTitle":"كونسيرج 24/7","supportBody":"قبل رحلتك وأثناءها وبعدها، يمكنك دائماً التواصل مع شخص حقيقي عبر الهاتف أو WhatsApp.","priceTitle":"أسعار ثابتة","priceBody":"السعر المؤكد هو السعر النهائي. يشمل وقت الانتظار ومواقف السيارات وتأخير الرحلات.","familyTitle":"مناسب للعائلات","familyBody":"مقاعد أطفال مناسبة للأعمار، ومساحات داخلية واسعة، ومساعدة هادئة لوصول عائلي مريح.","routesEyebrow":"رحلاتنا الأكثر طلباً","routesTitle":"من مطار أنطاليا<br />إلى الريفييرا التركية.","routesIntro":"جميع الأسعار للسيارة وليس للشخص، وتشمل وقت انتظار مجاني.","discountPricesShown":"الأسعار المعروضة تشمل خصم الإنترنت 15٪","golfFavourite":"المفضل لدى لاعبي الغولف","onlineDiscountShort":"خصم الإنترنت 15٪","reviewsEyebrow":"آراء الضيوف","reviewsTitle":"خدمة تبقى في الذاكرة<br />بعد الوصول.","googleReviews":"استناداً إلى 387 تقييماً موثقاً على Google","trustedBy":"موثوق من ضيوف أبرز منتجعات أنطاليا","processEyebrow":"بساطة مدروسة","processTitle":"أربع خطوات<br />لوصول مريح.","stepOne":"اختر وجهتك","stepOneBody":"أخبرنا إلى أين ومتى تريد السفر.","stepTwo":"اختر السيارة","stepTwoBody":"اختر المساحة ومستوى الراحة المناسبين لك.","stepThree":"أكد الحجز","stepThreeBody":"احصل فوراً على تأكيدك بسعر ثابت.","stepFour":"التقِ بسائقك","stepFourBody":"يستقبلك سائقك في صالة الوصول.","pricingEyebrow":"خطط بثقة","pricingTitle":"نضمن سعراً ثابتاً.<br />وتدفع دائماً السعر الأقل.","pricingIntro":"نحدد سعراً ثابتاً لراحتك، ونقيس أيضاً المسافة الفعلية للرحلة. ستدفع دائماً المبلغ الأقل.","pricingFixedPrice":"السعر الثابت","fixedPriceExample":"النقل إلى بيليك: {{PRICE:belek:vito}} €","fixedPriceDesc":"إجمالي مضمون يشمل رسوم المطار ومواقف السيارات والانتظار والضرائب.","distancePrice":"حسب المسافة","distancePriceExample":"مثال 24 كم عبر الإنترنت: 25 €","distancePriceDesc":"يتم قياسها عبر GPS أثناء الرحلة.","youPay":"ما تدفعه","youPayPrice":"25 €","youPayDesc":"ينطبق السعر الأقل، ويؤكده السائق في نهاية الرحلة.","pricingNote":"لا مفاجآت ولا رسوم خفية. تدفع السعر المحجوز أو أقل منه.","faqEyebrow":"الأسئلة الشائعة","faqTitle":"قبل رحلتك.","faqIntro":"كل ما تحتاج إلى معرفته عن خدمة النقل الخاصة من مطار أنطاليا.","askQuestion":"اطرح سؤالاً","faqOneQ":"ماذا يحدث إذا تأخرت رحلتي؟","faqOneA":"نتابع جميع الرحلات القادمة مباشرة. نعدّل وقت الاستقبال تلقائياً، وينتظرك سائقك من دون أي رسوم إضافية.","faqTwoQ":"أين سألتقي بالسائق؟","faqTwoA":"ينتظرك سائقك في صالة الوصول بعد منطقة استلام الأمتعة مباشرة، حاملاً لافتة باسمك.","faqThreeQ":"هل تتوفر مقاعد للأطفال؟","faqThreeA":"نعم. تتوفر مقاعد للرضع والأطفال والمقاعد المعززة مجاناً عند طلبها أثناء الحجز.","faqFourQ":"هل يمكن نقل حقائب الغولف والأمتعة الكبيرة؟","faqFourA":"نعم. سيارات Sprinter وVito مناسبة لمجموعات الغولف. أخبرنا بأمتعتك لنجهز السيارة المناسبة.","faqFiveQ":"هل السعر المعروض نهائي؟","faqFiveA":"نعم. تشمل الأسعار رسوم المطار ومواقف السيارات ووقت الانتظار والضرائب، من دون رسوم خفية.","contactEyebrow":"رحلتك تبدأ هنا","contactTitle":"ابدأ وصولك إلى أنطاليا<br />بطريقة استثنائية.","contactBody":"احجز عبر الإنترنت خلال دقيقتين، أو تحدث مباشرة إلى فريق الكونسيرج 24/7.","whatsappUs":"تواصل عبر WhatsApp","replyMinutes":"نرد عادةً خلال دقائق","callUs":"اتصل بنا 24/7","emailUs":"بريد الكونسيرج","replyHour":"نرد خلال ساعة","footerTagline":"خدمة سائق خاص في أنحاء الريفييرا التركية.","explore":"استكشف","information":"معلومات","licensed":"مزود نقل خاص مرخص · متوافق مع TÜRSAB","bookingConfirmed":"تم تأكيد الحجز","referenceLabel":"الرقم المرجعي","weWillContact":"تم إرسال طلب حجزك. سنتواصل معك خلال 30 دقيقة.","chatWithUs":"تحدث معنا","pickupAddressPlaceholder":"اسم الفندق، الشارع، رقم المبنى والمنطقة","dropoffAddressPlaceholder":"اسم الفندق، الشارع، رقم المبنى والمنطقة","hotelNamePlaceholder":"اسم الفندق أو مكان الإقامة","cashConfirmation":"تم تأكيد حجزك. ادفع المبلغ الثابت مباشرة إلى السائق داخل السيارة.","bookingError":"تعذر إكمال حجزك. يرجى المحاولة مرة أخرى.","formIncomplete":"يرجى إكمال الحقول المحددة.","requiredField":"هذا الحقل مطلوب.","destinationRequired":"يرجى اختيار وجهة.","dateInvalid":"يرجى اختيار تاريخ اليوم أو تاريخ لاحق.","emailInvalid":"يرجى إدخال بريد إلكتروني صالح.","nameInvalid":"يرجى إدخال الاسم الكامل بشكل صحيح.","phoneInvalid":"يرجى إدخال رقم صالح مع رمز الدولة (مثلاً +49).","flightInvalid":"يرجى إدخال رقم رحلة صالح.","pickupAddressRequired":"يجب أن يتراوح عنوان الاستقبال بين 6 و160 حرفاً.","dropoffAddressRequired":"يجب أن يتراوح عنوان الوصول بين 6 و160 حرفاً.","addressesMustDiffer":"يجب أن يختلف عنوان الاستقبال عن عنوان الوصول.","customDestinationPrice":"سيتم تأكيد السعر بعد مراجعة عنوان الوصول.","hotelNameRequired":"يرجى إدخال اسم الفندق.","roundTripPriceNote":"ذهاب وعودة · رحلتان","returnDateRequired":"يرجى اختيار تاريخ العودة.","returnDateInvalid":"يرجى اختيار تاريخ عودة يوافق تاريخ الذهاب أو يأتي بعده.","returnTimeRequired":"يرجى اختيار وقت الاستقبال للعودة.","quoteTitle":"إلى أين نوصلك؟","date":"التاريخ","airportReturnPrice":"سيتم تأكيد السعر بعد مراجعة الفندق أو عنوان الاستقبال.","oneGuest":"راكب واحد","twoGuests":"راكبان","threeGuests":"3 ركاب","fourGuests":"4 ركاب","fiveGuests":"5 ركاب","sixGuests":"6 ركاب","sevenGuests":"7 ركاب","viewQuote":"عرض السعر","fleetVitoClass":"VIP · جراند تورينغ","fleetVitoDescription":"مقصورة خاصة ومريحة للعائلات والمجموعات الصغيرة.","capacitySwitchedSprinter":"عدد الركاب والأمتعة يتجاوز سعة Vito — تم التبديل إلى Mercedes Sprinter.","capacityNoVehicle":"هذا العدد من الركاب والأمتعة يتجاوز سعة مركباتنا. يرجى التواصل معنا عبر WhatsApp.","leatherSeats":"مقاعد جلدية فاخرة","water":"مياه معدنية باردة","from":"ابتداءً من","reviewOne":"\\"انتظرنا السائق رغم تأخر الرحلة 90 دقيقة. كانت السيارة نظيفة تماماً وباردة، ومقعدا الأطفال مجهزين مسبقاً. كان هذا بالضبط ما احتاجته عائلتنا عند الوصول.\\"","reviewTwo":"\\"من أول تواصل عبر WhatsApp حتى وصولنا إلى بيليك، كانت الخدمة ممتازة. التزام بالمواعيد واحترافية عالية، مع مساحة مريحة لحقائب الغولف.\\"","reviewThree":"\\"شعرنا وكأنها خدمة سائق فندق فاخر وليست سيارة أجرة من المطار. تواصل واضح، وسيارة مثالية، وسائق مهذب بصدق.\\"","perVehicle":"لكل سيارة · سعر ثابت","quoteReady":"رحلتك الخاصة","journeyTime":"مدة الرحلة","totalFixed":"الإجمالي الثابت","confirmWhatsapp":"التأكيد عبر WhatsApp","bookNowCta":"احجز الآن","backToQuote":"رجوع","yourDetails":"بياناتك","flightNumber":"رقم الرحلة","flightArrivalTime":"وقت الوصول","notesLabel":"طلبات خاصة","confirmBooking":"تأكيد الحجز","paySecurely":"المتابعة إلى الدفع الآمن","payLaterNote":"دفع آمن عبر الإنترنت بعد التأكيد.","paymentTitle":"الدفع الآمن","paymentError":"تعذر إتمام الدفع. يرجى المحاولة مرة أخرى."}}`);
const translationData = {
  resources
};
const routeCatalog = {
  antalya: {
    names: { en: "Antalya City", de: "Antalya Stadt", tr: "Antalya şehir merkezi", ru: "центр Антальи" },
    distanceKm: 15,
    durationMin: 25,
    duration: { en: "20–30 minutes", de: "20–30 Minuten", tr: "20–30 dakika", ru: "20–30 минут" },
    originalPrices: { vito: 40, sprinter: 65 },
    prices: { vito: 35, sprinter: 55 }
  },
  belek: {
    names: { en: "Belek", de: "Belek", tr: "Belek", ru: "Белек" },
    distanceKm: 45,
    durationMin: 35,
    duration: { en: "35–40 minutes", de: "35–40 Minuten", tr: "35–40 dakika", ru: "35–40 минут" },
    originalPrices: { vito: 50, sprinter: 85 },
    prices: { vito: 40, sprinter: 70 }
  },
  side: {
    names: { en: "Side", de: "Side", tr: "Side", ru: "Сиде" },
    distanceKm: 65,
    durationMin: 55,
    duration: { en: "55–65 minutes", de: "55–65 Minuten", tr: "55–65 dakika", ru: "55–65 минут" },
    originalPrices: { vito: 60, sprinter: 100 },
    prices: { vito: 50, sprinter: 85 }
  },
  kemer: {
    names: { en: "Kemer", de: "Kemer", tr: "Kemer", ru: "Кемер" },
    distanceKm: 50,
    durationMin: 60,
    duration: { en: "40–50 minutes", de: "40–50 Minuten", tr: "40–50 dakika", ru: "40–50 минут" },
    originalPrices: { vito: 65, sprinter: 110 },
    prices: { vito: 55, sprinter: 90 }
  },
  alanya: {
    names: { en: "Alanya", de: "Alanya", tr: "Alanya", ru: "Аланью" },
    distanceKm: 125,
    durationMin: 120,
    duration: { en: "110–130 minutes", de: "110–130 Minuten", tr: "110–130 dakika", ru: "110–130 минут" },
    originalPrices: { vito: 110, sprinter: 170 },
    prices: { vito: 95, sprinter: 145 }
  },
  bogazkent: {
    names: { en: "Boğazkent", de: "Boğazkent", tr: "Boğazkent", ru: "Богазкент" },
    distanceKm: 48,
    durationMin: 45,
    duration: { en: "40–45 minutes", de: "40–45 Minuten", tr: "40–45 dakika", ru: "40–45 минут" },
    originalPrices: { vito: 55, sprinter: 90 },
    prices: { vito: 45, sprinter: 80 }
  },
  manavgat: {
    names: { en: "Manavgat", de: "Manavgat", tr: "Manavgat", ru: "Манавгат" },
    distanceKm: 75,
    durationMin: 65,
    duration: { en: "55–65 minutes", de: "55–65 Minuten", tr: "55–65 dakika", ru: "55–65 минут" },
    originalPrices: { vito: 60, sprinter: 100 },
    prices: { vito: 50, sprinter: 85 }
  },
  kizilagac: {
    names: { en: "Manavgat/Kızılağaç", de: "Manavgat/Kızılağaç", tr: "Manavgat/Kızılağaç", ru: "Манавгат/Кызылагач" },
    distanceKm: 85,
    durationMin: 75,
    duration: { en: "70–80 minutes", de: "70–80 Minuten", tr: "70–80 dakika", ru: "70–80 минут" },
    originalPrices: { vito: 70, sprinter: 115 },
    prices: { vito: 60, sprinter: 95 }
  },
  tekirova: {
    names: { en: "Tekirova", de: "Tekirova", tr: "Tekirova", ru: "Текирову" },
    distanceKm: 75,
    durationMin: 75,
    duration: { en: "75–90 minutes", de: "75–90 Minuten", tr: "75–90 dakika", ru: "75–90 минут" },
    originalPrices: { vito: 110, sprinter: 170 },
    prices: { vito: 95, sprinter: 145 }
  },
  bodrum: {
    names: { en: "Bodrum", de: "Bodrum", tr: "Bodrum", ru: "Бодрум" },
    distanceKm: 380,
    durationMin: 300,
    duration: { en: "5–6 hours", de: "5–6 Stunden", tr: "5–6 saat", ru: "5–6 часов" },
    originalPrices: { vito: 325, sprinter: 385 },
    prices: { vito: 280, sprinter: 330 }
  },
  dalaman: {
    names: { en: "Dalaman", de: "Dalaman", tr: "Dalaman", ru: "Даламан" },
    distanceKm: 235,
    durationMin: 210,
    duration: { en: "3–3.5 hours", de: "3–3,5 Stunden", tr: "3–3,5 saat", ru: "3–3,5 часа" },
    originalPrices: { vito: 210, sprinter: 310 },
    prices: { vito: 180, sprinter: 265 }
  },
  fethiye: {
    names: { en: "Fethiye", de: "Fethiye", tr: "Fethiye", ru: "Фетхие" },
    distanceKm: 205,
    durationMin: 180,
    duration: { en: "2.5–3 hours", de: "2,5–3 Stunden", tr: "2,5–3 saat", ru: "2,5–3 часа" },
    originalPrices: { vito: 210, sprinter: 310 },
    prices: { vito: 180, sprinter: 265 }
  },
  pamukkale: {
    names: { en: "Pamukkale", de: "Pamukkale", tr: "Pamukkale", ru: "Памуккале" },
    distanceKm: 245,
    durationMin: 180,
    duration: { en: "3–3.5 hours", de: "3–3,5 Stunden", tr: "3–3,5 saat", ru: "3–3,5 часа" },
    originalPrices: { vito: 290, sprinter: 350 },
    prices: { vito: 250, sprinter: 300 }
  },
  kapadokya: {
    names: { en: "Cappadocia", de: "Kappadokien", tr: "Kapadokya", ru: "Каппадокию" },
    distanceKm: 540,
    durationMin: 480,
    duration: { en: "7–8 hours", de: "7–8 Stunden", tr: "7–8 saat", ru: "7–8 часов" },
    originalPrices: { vito: 350, sprinter: 410 },
    prices: { vito: 300, sprinter: 350 }
  }
};
const publicRouteSlugs = Object.freeze(
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
    Object.entries(routeCatalog).map(([slug, route]) => [slug, {
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
  { code: "ar", flag: "🇸🇦", label: "العربية" },
  { code: "pl", flag: "🇵🇱", label: "Polski" },
  { code: "nl", flag: "🇳🇱", label: "Nederlands" },
  { code: "uk", flag: "🇺🇦", label: "Українська" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "sv", flag: "🇸🇪", label: "Svenska" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
  { code: "ko", flag: "🇰🇷", label: "한국어" }
];
const supportedLanguages = new Set(languageOptions.map(({ code }) => code));
const indexableLanguages$1 = /* @__PURE__ */ new Set(["en", "de", "tr", "ru"]);
const rawResources = translationData.resources;
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
  const localizedMatch = normalized.match(/^\/(de|tr|ru)(\/.*)?$/);
  const basePath = localizedMatch ? localizedMatch[2] || "/" : normalized;
  if (basePath !== "/" && !basePath.startsWith("/transfers/")) return null;
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
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
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
const normalize = (value) => value.trim().replace(/\s+/g, " ");
const validName = (value) => {
  const normalized = normalize(value);
  return normalized.length >= 2 && normalized.length <= 80 && (normalized.match(new RegExp("\\p{L}", "gu"))?.length ?? 0) >= 2 && !/\d/u.test(normalized);
};
function createPublicBookingSchema(t) {
  return z.object({
    tripType: z.enum(["one_way", "round_trip"]),
    pickup: z.enum(["airport", "hotel", "private_address"]),
    destination: z.string().min(1, t("destinationRequired", "Please select a destination.")),
    vehicle: z.enum(["vito", "sprinter"]),
    guests: z.string(),
    luggage: z.string(),
    childSeats: z.string(),
    travelDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, t("dateInvalid", "Please select a valid date.")),
    arrivalTime: z.string(),
    flightNumber: z.string(),
    returnDate: z.string(),
    returnPickupTime: z.string(),
    returnFlightNumber: z.string(),
    pickupAddress: z.string(),
    dropoffAddress: z.string(),
    hotelName: z.string(),
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
    if (!Number.isInteger(luggage) || luggage < 0 || luggage > 12) context.addIssue({ code: "custom", path: ["luggage"], message: t("requiredField", "Please check this field.") });
    if (!Number.isInteger(childSeats) || childSeats < 0 || childSeats > 4) context.addIssue({ code: "custom", path: ["childSeats"], message: t("requiredField", "Please check this field.") });
    if (values.tripType === "round_trip") {
      if (!values.returnDate) context.addIssue({ code: "custom", path: ["returnDate"], message: t("returnDateRequired", "Please select the return date.") });
      else if (values.returnDate < values.travelDate) context.addIssue({ code: "custom", path: ["returnDate"], message: t("returnDateInvalid", "The return date cannot be earlier.") });
      if (!values.returnPickupTime) context.addIssue({ code: "custom", path: ["returnPickupTime"], message: t("returnTimeRequired", "Please select the return pick-up time.") });
    }
    if (values.pickup === "private_address" && (normalize(values.pickupAddress).length < 6 || normalize(values.pickupAddress).length > 160)) {
      context.addIssue({ code: "custom", path: ["pickupAddress"], message: t("pickupAddressRequired", "Please enter the full pick-up address.") });
    }
    if (values.destination === "private_address" && (normalize(values.dropoffAddress).length < 6 || normalize(values.dropoffAddress).length > 160)) {
      context.addIssue({ code: "custom", path: ["dropoffAddress"], message: t("dropoffAddressRequired", "Please enter the full drop-off address.") });
    }
    if (values.pickup === "private_address" && values.destination === "private_address" && normalize(values.pickupAddress).toLowerCase() === normalize(values.dropoffAddress).toLowerCase()) {
      context.addIssue({ code: "custom", path: ["dropoffAddress"], message: t("addressesMustDiffer", "Pick-up and drop-off addresses must be different.") });
    }
    const needsHotel = values.pickup === "hotel" || values.destination !== "private_address";
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
    for (const field of ["flightNumber", "returnFlightNumber"]) {
      const flight = normalize(values[field]);
      if (flight && !/^[a-z0-9][a-z0-9 -]{1,11}$/i.test(flight)) {
        context.addIssue({ code: "custom", path: [field], message: t("flightInvalid", "Please enter a valid flight number.") });
      }
    }
  });
}
function quoteFor(values) {
  const route = routeCatalog[values.destination];
  if (!route) return { price: 0, originalPrice: 0 };
  const journeys = values.tripType === "round_trip" ? 2 : 1;
  return {
    price: route.prices[values.vehicle] * journeys,
    originalPrice: route.originalPrices[values.vehicle] * journeys
  };
}
function buildPublicBookingPayload(values, language) {
  return {
    customer_name: normalize(values.customerName),
    customer_email: values.customerEmail.trim().toLowerCase(),
    customer_phone: normalize(values.customerPhone).replace(/^00/, "+"),
    hotel_name: normalize(values.hotelName) || "Not specified",
    child_seat_count: Number(values.childSeats),
    luggage_count: Number(values.luggage),
    flight_number: normalize(values.flightNumber).toUpperCase() || null,
    flight_arrival_time: values.arrivalTime || null,
    pickup_location: values.pickup,
    pickup_address: values.pickup === "private_address" ? normalize(values.pickupAddress) : null,
    dropoff_location: values.destination,
    dropoff_address: values.destination === "private_address" ? normalize(values.dropoffAddress) : null,
    pickup_date: values.travelDate,
    trip_type: values.tripType,
    return_date: values.tripType === "round_trip" ? values.returnDate : null,
    return_pickup_time: values.tripType === "round_trip" ? values.returnPickupTime : null,
    return_flight_number: values.tripType === "round_trip" ? normalize(values.returnFlightNumber).toUpperCase() || null : null,
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
function whatsappConfirmation(values, bookingRef, price) {
  const routeName = routeCatalog[values.destination]?.names.en ?? values.destination;
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
    `👥 Guests: ${values.guests}`
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
function BookingForm({
  selection,
  scrollOnSelect = true
}) {
  const { language, t } = useLanguage();
  const schema = useMemo(() => createPublicBookingSchema(t), [t]);
  const [minimumDate, setMinimumDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      tripType: "one_way",
      pickup: "airport",
      destination: "",
      vehicle: "vito",
      guests: "2",
      luggage: "0",
      childSeats: "0",
      travelDate: "",
      arrivalTime: "",
      flightNumber: "",
      returnDate: "",
      returnPickupTime: "",
      returnFlightNumber: "",
      pickupAddress: "",
      dropoffAddress: "",
      hotelName: "",
      customerName: "",
      customerPhone: "",
      customerEmail: ""
    }
  });
  const values = watch();
  const quote = quoteFor(values);
  const selectedRoute = routeCatalog[values.destination];
  const selectedRouteName = selectedRoute?.names[language] ?? selectedRoute?.names.en;
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
      window.setTimeout(() => document.querySelector("#customer-name")?.focus(), 500);
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
  const submit = async (formValues) => {
    setSubmitting(true);
    setSubmitError("");
    const currentQuote = quoteFor(formValues);
    window.gtag?.("event", "begin_checkout", { currency: "EUR", value: currentQuote.price, trip_type: formValues.tripType });
    try {
      const { createBooking } = await import("./assets/api-CUswP9Ii.js");
      const booking = await createBooking(buildPublicBookingPayload(formValues, language));
      const message = formValues.destination === "airport" ? t("airportReturnPrice", "The price will be confirmed after we check the pick-up address.") : formValues.destination === "private_address" ? t("customDestinationPrice", "The price will be confirmed after we check the drop-off address.") : t("cashConfirmation", "Your booking is confirmed. Pay the fixed total directly to your driver in the vehicle.");
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
  const fieldClass = (error) => `booking-field${error ? " has-error" : ""}`;
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
        /* @__PURE__ */ jsx("div", { id: "booking-price-display", className: `booking-price-display${values.destination ? " visible" : ""}`, children: selectedRoute && quote.price > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("span", { className: "price-display-route", children: [
            "AYT ",
            values.tripType === "round_trip" ? "⇄" : "→",
            " ",
            selectedRouteName
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "price-display-prices", children: [
            quote.originalPrice > quote.price && /* @__PURE__ */ jsxs("span", { className: "price-display-original", children: [
              "€",
              quote.originalPrice
            ] }),
            /* @__PURE__ */ jsxs("strong", { className: "price-display-amount", children: [
              "€",
              quote.price
            ] })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "price-display-note", children: [
            values.vehicle === "sprinter" ? "Mercedes Sprinter" : "Mercedes Vito",
            " · ",
            values.tripType === "round_trip" ? `${t("roundTripPriceNote", "round trip · 2 journeys")} · ` : "",
            t("perVehicle", "fixed · per vehicle")
          ] })
        ] }) : values.destination ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("span", { className: "price-display-route", children: [
            values.pickup,
            " ",
            values.tripType === "round_trip" ? "⇄" : "→",
            " ",
            values.destination
          ] }),
          /* @__PURE__ */ jsx("span", { className: "price-display-note", children: values.destination === "airport" ? t("airportReturnPrice", "Price confirmed after address review.") : t("customDestinationPrice", "Price confirmed after address review.") })
        ] }) : null })
      ] }),
      /* @__PURE__ */ jsxs("form", { className: "booking-card", id: "quote-form", noValidate: true, onSubmit: handleSubmit(submit), children: [
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
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "trip-type-hint", children: t("roundTripHint", "For a round trip, the return follows the same route in reverse.") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "booking-row booking-row-journey", children: [
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
          /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.destination), children: [
            /* @__PURE__ */ jsx("span", { children: t("destination", "Destination") }),
            /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
              /* @__PURE__ */ jsx(Icon, { name: "pin", className: "icon" }),
              /* @__PURE__ */ jsxs("select", { id: "destination", ...register("destination"), children: [
                /* @__PURE__ */ jsx("option", { value: "", children: t("selectDestination", "Select destination") }),
                values.pickup !== "airport" && /* @__PURE__ */ jsx("option", { value: "airport", children: t("airportOption", "Antalya Airport (AYT)") }),
                publicRouteSlugs.map((slug) => /* @__PURE__ */ jsx("option", { value: slug, children: routeCatalog[slug].names[language] ?? routeCatalog[slug].names.en }, slug)),
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
        !vitoFits && /* @__PURE__ */ jsx("p", { id: "capacity-note", className: "capacity-note", children: t("capacitySwitchedSprinter", "We selected the Sprinter for this passenger and luggage count.") }),
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
              /* @__PURE__ */ jsx("select", { id: "luggage", ...register("luggage"), children: Array.from({ length: 13 }, (_, index) => /* @__PURE__ */ jsx("option", { value: index, children: index }, index)) })
            ] }),
            /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.luggage })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.hotelName), children: [
            /* @__PURE__ */ jsx("span", { children: t("hotelNameLabel", "Hotel name") }),
            /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
              /* @__PURE__ */ jsx(Icon, { name: "pin", className: "icon" }),
              /* @__PURE__ */ jsx("input", { id: "hotel-name", maxLength: 120, placeholder: t("hotelNamePlaceholder", "Hotel or accommodation name"), ...register("hotelName") })
            ] }),
            /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.hotelName })
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
        /* @__PURE__ */ jsxs("div", { className: "booking-row booking-row-personal", children: [
          /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.customerName), children: [
            /* @__PURE__ */ jsx("span", { children: t("fullName", "Full name") }),
            /* @__PURE__ */ jsx("div", { className: "field-control", children: /* @__PURE__ */ jsx("input", { id: "customer-name", autoComplete: "name", maxLength: 80, placeholder: "John Smith", ...register("customerName") }) }),
            /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.customerName })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.customerPhone), children: [
            /* @__PURE__ */ jsx("span", { children: t("phoneLabel", "Phone / WhatsApp") }),
            /* @__PURE__ */ jsx("div", { className: "field-control", children: /* @__PURE__ */ jsx("input", { id: "customer-phone", type: "tel", autoComplete: "tel", maxLength: 25, placeholder: "+44 7400 123456", ...register("customerPhone") }) }),
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
        /* @__PURE__ */ jsxs("div", { className: "booking-footer", children: [
          /* @__PURE__ */ jsx("p", { className: "booking-includes", children: t("quoteIncludes", "Includes meet & greet, flight tracking, parking, waiting time and bottled water.") }),
          /* @__PURE__ */ jsxs("button", { className: "quote-submit", type: "submit", id: "main-book-submit", disabled: submitting, children: [
            /* @__PURE__ */ jsx("span", { children: submitting ? "…" : t("confirmCashBooking", "Confirm booking — pay in vehicle") }),
            /* @__PURE__ */ jsx(Icon, { name: "arrow-right", className: "icon" })
          ] })
        ] }),
        submitError && /* @__PURE__ */ jsx("p", { className: "payment-error", id: "payment-error-message", role: "alert", children: submitError })
      ] })
    ] }),
    confirmation && /* @__PURE__ */ jsxs("div", { className: "quote-modal open", id: "quote-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "quote-modal-title", children: [
      /* @__PURE__ */ jsx("button", { className: "modal-backdrop", "aria-label": "Close", onClick: () => setConfirmation(null) }),
      /* @__PURE__ */ jsxs("div", { className: "modal-card", children: [
        /* @__PURE__ */ jsx("button", { className: "modal-close", type: "button", "aria-label": "Close", onClick: () => setConfirmation(null), children: /* @__PURE__ */ jsx(Icon, { name: "close" }) }),
        /* @__PURE__ */ jsxs("div", { className: "booking-confirmed", children: [
          /* @__PURE__ */ jsx("div", { className: "confirmed-check", "aria-hidden": "true", children: /* @__PURE__ */ jsx(Icon, { name: "check" }) }),
          /* @__PURE__ */ jsx("h2", { id: "quote-modal-title", children: t("bookingConfirmed", "Booking Confirmed") }),
          /* @__PURE__ */ jsxs("p", { className: "confirmed-ref", children: [
            /* @__PURE__ */ jsx("span", { children: t("referenceLabel", "Reference") }),
            " ",
            /* @__PURE__ */ jsx("strong", { id: "confirmed-ref", children: confirmation.ref })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "confirmed-msg", children: confirmation.message }),
          /* @__PURE__ */ jsxs("a", { className: "button button-gold", href: confirmation.whatsapp, target: "_blank", rel: "noreferrer", id: "confirmed-whatsapp", children: [
            /* @__PURE__ */ jsx("span", { children: t("whatsappUs", "WhatsApp us") }),
            /* @__PURE__ */ jsx(Icon, { name: "arrow-up-right", className: "icon" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Header({ homeHref = "", compact = false }) {
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
  const nav = [
    ["#fleet", t("navFleet", "Fleet")],
    ["#services", t("navService", "Service")],
    ["#routes", t("navRoutes", "Routes")],
    ["#reviews", t("navReviews", "Reviews")],
    ["#contact", t("navContact", "Contact")]
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: `site-header${scrolled ? " scrolled" : ""}`, id: "site-header", children: [
      /* @__PURE__ */ jsxs("a", { className: "brand", href: sectionHref("#top"), "aria-label": "Antalya VIP Tourism home", children: [
        /* @__PURE__ */ jsx("img", { src: "/assets/optimized/logo.png", alt: "Antalya VIP Tourism", className: "brand-logo", width: "160", height: "120" }),
        /* @__PURE__ */ jsxs("span", { className: "brand-copy", children: [
          /* @__PURE__ */ jsx("strong", { children: "Antalya VIP" }),
          /* @__PURE__ */ jsx("span", { children: "Tourism" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "desktop-nav", "aria-label": "Primary navigation", children: nav.map(([href, label]) => /* @__PURE__ */ jsx("a", { href: sectionHref(href), children: label }, href)) }),
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
        /* @__PURE__ */ jsxs("a", { className: "header-cta", href: sectionHref("#booking"), children: [
          /* @__PURE__ */ jsx("span", { children: t("bookNow", "Book now") }),
          /* @__PURE__ */ jsx(Icon, { name: "arrow-up-right", className: "icon" })
        ] }),
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
      /* @__PURE__ */ jsx("nav", { "aria-label": "Mobile navigation", children: nav.map(([href, label]) => /* @__PURE__ */ jsx("a", { href: sectionHref(href), onClick: () => setMenuOpen(false), children: label }, href)) }),
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
const processItems = [
  [
    "stepOne",
    "Choose destination",
    "stepOneBody",
    "Tell us where and when you would like to travel.",
    "pin"
  ],
  [
    "stepTwo",
    "Select vehicle",
    "stepTwoBody",
    "Choose the space and comfort that suits your party.",
    "car"
  ],
  [
    "stepThree",
    "Confirm booking",
    "stepThreeBody",
    "Receive instant confirmation with a fixed total price.",
    "check-circle"
  ],
  [
    "stepFour",
    "Meet your driver",
    "stepFourBody",
    "Your chauffeur welcomes you inside the arrivals hall.",
    "user-check"
  ]
];
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
  const [mobileBookBarVisible, setMobileBookBarVisible] = useState(false);
  const [routeSliderEdges, setRouteSliderEdges] = useState({
    atStart: true,
    atEnd: false
  });
  const routeSlider = useRef(null);
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
  const bookRoute = (route, vehicle = "vito") => setSelection({ route, vehicle, nonce: Date.now() });
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
    const hero = document.querySelector(".hero");
    if (!hero || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry2]) => setMobileBookBarVisible(!entry2.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
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
    const elements = Array.from(document.querySelectorAll(".service-card, .route-card, .review-card, .process-line article"));
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
                    /* @__PURE__ */ jsxs("span", { className: "was-price", children: [
                      "€",
                      routeCatalog[slug].originalPrices.vito
                    ] }),
                    /* @__PURE__ */ jsxs("strong", { children: [
                      "€",
                      routeCatalog[slug].prices.vito
                    ] })
                  ]
                },
                slug
              )
            ) }),
            /* @__PURE__ */ jsx("span", { className: "price-strip-note", children: t("campaignApplied", "Online discount already applied") })
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
          ([titleKey, title, bodyKey, body, icon], index) => /* @__PURE__ */ jsxs(
            "article",
            {
              className: `service-card${index === 0 ? " featured" : ""}`,
              children: [
                /* @__PURE__ */ jsx("span", { className: "service-number", children: String(index + 1).padStart(2, "0") }),
                /* @__PURE__ */ jsx("div", { className: "service-icon", children: /* @__PURE__ */ jsx(Icon, { name: icon }) }),
                /* @__PURE__ */ jsx("h3", { children: t(titleKey, title) }),
                /* @__PURE__ */ jsx("p", { children: t(bodyKey, body) })
              ]
            },
            titleKey
          )
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
                            /* @__PURE__ */ jsx("span", { children: t("onlineDiscountShort", "Online -25%") }),
                            /* @__PURE__ */ jsxs("strong", { children: [
                              /* @__PURE__ */ jsxs("small", { children: [
                                "€",
                                route.originalPrices.vito
                              ] }),
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
      /* @__PURE__ */ jsxs("section", { className: "process section", children: [
        /* @__PURE__ */ jsx("div", { className: "section-heading", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "eyebrow", children: [
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("p", { children: t("processEyebrow", "Simple by design") })
          ] }),
          /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx(
            LineBreakText,
            {
              value: t(
                "processTitle",
                "Four steps to<br />a seamless arrival."
              )
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "process-line", children: processItems.map(
          ([titleKey, title, bodyKey, body, icon], index) => /* @__PURE__ */ jsxs("article", { children: [
            /* @__PURE__ */ jsx("span", { children: String(index + 1).padStart(2, "0") }),
            /* @__PURE__ */ jsx("div", { className: "process-icon", children: /* @__PURE__ */ jsx(Icon, { name: icon }) }),
            /* @__PURE__ */ jsx("h3", { children: t(titleKey, title) }),
            /* @__PURE__ */ jsx("p", { children: t(bodyKey, body) })
          ] }, titleKey)
        ) })
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
        children: [
          /* @__PURE__ */ jsx(Icon, { name: "whatsapp", className: "whatsapp-icon" }),
          /* @__PURE__ */ jsx("span", { children: t("chatWithUs", "Chat with us") })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `mobile-book-bar${mobileBookBarVisible ? " visible" : ""}`,
        children: [
          /* @__PURE__ */ jsxs("a", { className: "button button-gold", href: "#booking", children: [
            /* @__PURE__ */ jsx("span", { children: t("bookTransfer", "Book your transfer") }),
            /* @__PURE__ */ jsx(Icon, { name: "arrow-right", className: "icon" })
          ] }),
          /* @__PURE__ */ jsx(
            "a",
            {
              className: "btn-wa",
              href: "https://wa.me/905302655790",
              target: "_blank",
              rel: "noreferrer",
              "aria-label": "WhatsApp",
              children: /* @__PURE__ */ jsx(Icon, { name: "whatsapp", className: "whatsapp-icon" })
            }
          )
        ]
      }
    )
  ] });
}
const domain = "https://antalyaviptourism.com";
const indexableLanguages = ["en", "de", "tr", "ru"];
const homeSeo = {
  en: { locale: "en_GB", title: "Antalya Airport Transfer | Private VIP Tourism Service", description: "Private fixed-price transfers from Antalya Airport to resorts across Türkiye." },
  de: { locale: "de_DE", title: "Flughafen Antalya Transfer | Privater VIP Chauffeurservice", description: "Private Festpreis-Transfers vom Flughafen Antalya zu Reisezielen in der gesamten Türkei." },
  tr: { locale: "tr_TR", title: "Antalya Havalimanı Transferi | Özel VIP Transfer", description: "Antalya Havalimanı'ndan Belek, Side, Kemer, Alanya ve çevresine özel sabit fiyatlı transfer. Vito ve Sprinter, uçuş takibi ve karşılama." },
  ru: { locale: "ru_RU", title: "Трансфер из аэропорта Антальи | Частный VIP-трансфер", description: "Частные трансферы по фиксированной цене из аэропорта Антальи в Белек, Сиде, Кемер, Аланью и другие курорты. Встреча и отслеживание рейса." }
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
  }
};
const languageFromPath = (pathname) => {
  const candidate = pathname.split("/").filter(Boolean)[0];
  return candidate === "de" || candidate === "tr" || candidate === "ru" ? candidate : "en";
};
const localizedPath = (language, suffix = "") => `/${language === "en" ? "" : `${language}/`}${suffix}`;
const alternateDescriptors = (suffix = "") => [
  ...indexableLanguages.map((language) => ({ tagName: "link", rel: "alternate", hrefLang: language, href: `${domain}${localizedPath(language, suffix)}` })),
  { tagName: "link", rel: "alternate", hrefLang: "x-default", href: `${domain}${localizedPath("en", suffix)}` }
];
const socialDescriptors = (title, description, url, locale) => [
  { property: "og:type", content: "website" },
  { property: "og:url", content: url },
  { property: "og:site_name", content: "Antalya VIP Tourism" },
  { property: "og:title", content: title },
  { property: "og:description", content: description },
  { property: "og:image", content: `${domain}/assets/optimized/og-antalya-transfer.jpg` },
  { property: "og:locale", content: locale },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: title },
  { name: "twitter:description", content: description },
  { name: "twitter:image", content: `${domain}/assets/optimized/og-antalya-transfer.jpg` }
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
function routeMeta(language, slug) {
  const route = routeCatalog[slug];
  if (!route) return [];
  const text = routeText[language];
  const name = route.names[language];
  const title = text.title(name);
  const description = text.description(name, route.prices.vito);
  const pathname = localizedPath(language, `transfers/${slug}/`);
  const url = `${domain}${pathname}`;
  const faq = text.faq(name, route.prices.vito, route.duration[language]);
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
const routeCopy = (language) => routeText[language];
function loader$2({
  request
}) {
  return {
    language: languageFromPath(new URL(request.url).pathname)
  };
}
const meta$2 = ({
  loaderData
}) => homeMeta(loaderData?.language ?? "en");
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
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  loader: loader$2,
  meta: meta$2
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
    campaign: "Online special: 25% discount already applied to all transfer prices.",
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
    campaign: "Online Spezial: 25% Rabatt ist in allen Transferpreisen bereits abgezogen.",
    contact: "Für Buchungen und Fragen erreichen Sie uns über WhatsApp.",
    privacy: "Datenschutz",
    imprint: "Impressum",
    privacyUrl: "/de/datenschutz/",
    imprintUrl: "/de/impressum/",
    vito: "Mercedes Vito · bis 7 Personen",
    sprinter: "Mercedes Sprinter · bis 13 Personen",
    intro: (name, duration, distance) => `Die ${distance} lange Fahrt vom Flughafen Antalya nach ${name} dauert bei normalem Verkehr ungefähr ${duration}. Ihr Chauffeur empfängt Sie in der Ankunftshalle mit Namensschild und fährt direkt zu Ihrer Unterkunft.`,
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
    campaign: "Online'a özel: Tüm transfer fiyatlarına %25 indirim uygulanmıştır.",
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
    campaign: "Онлайн-акция: скидка 25% уже применена ко всем трансферам.",
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
  }
};
function TransferPage({ language, route }) {
  const text = copy[language];
  const seo = routeCopy(language);
  const prefix = language === "en" ? "" : `/${language}`;
  const homeHref = `${prefix}/`;
  const heading = seo.heading(route.name);
  const faq = text.faqItems(route.name, route.prices.vito, route.durationLabel);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(StaticPageHeader, { homeHref, homeLabel: text.home, secondaryHref: "#details", secondaryLabel: text.routes, tertiaryHref: "#contact", tertiaryLabel: "WhatsApp", ctaHref: `${homeHref}#booking`, ctaLabel: text.book }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "localized-route", children: [
        /* @__PURE__ */ jsxs("div", { className: "eyebrow light", children: [
          /* @__PURE__ */ jsx("span", {}),
          /* @__PURE__ */ jsx("p", { children: "Antalya VIP Tourism" })
        ] }),
        /* @__PURE__ */ jsx("h1", { children: heading }),
        /* @__PURE__ */ jsx("p", { children: seo.description(route.name, route.prices.vito) }),
        /* @__PURE__ */ jsx("p", { className: "localized-campaign", children: text.campaign }),
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
          /* @__PURE__ */ jsx("h2", { children: heading }),
          /* @__PURE__ */ jsx("p", { children: text.intro(route.name, route.durationLabel, route.distance) }),
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
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "localized-price", children: [
            /* @__PURE__ */ jsx("p", { children: text.sprinter }),
            /* @__PURE__ */ jsxs("strong", { children: [
              "€",
              route.prices.sprinter
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { className: "button button-gold", href: `${homeHref}#booking`, children: text.book }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "localized-faq", children: [
        /* @__PURE__ */ jsx("h2", { children: text.faq }),
        faq.map(([question, answer]) => /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("h3", { children: question }),
          /* @__PURE__ */ jsx("p", { children: answer })
        ] }, question))
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "localized-links", children: [
        /* @__PURE__ */ jsx("h2", { children: text.other }),
        /* @__PURE__ */ jsx("div", { children: publicRouteSlugs.filter((slug) => slug !== route.slug).map((slug) => /* @__PURE__ */ jsx("a", { href: `${prefix}/transfers/${slug}/`, children: routeCatalog[slug].names[language] }, slug)) })
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
const languages = /* @__PURE__ */ new Set(["en", "de", "tr", "ru"]);
function loader$1({
  request,
  params
}) {
  const language = params.language && languages.has(params.language) ? params.language : languageFromPath(new URL(request.url).pathname);
  const slug = params.slug ?? "";
  if (!routeCatalog[slug]) throw new Response("Not found", {
    status: 404
  });
  return {
    language,
    route: localizedRoute(slug, language)
  };
}
const meta$1 = ({
  loaderData
}) => routeMeta(loaderData?.language ?? "en", loaderData?.route?.slug ?? "antalya");
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
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: transfer,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const legalData = {
  "en-privacy": { "title": "Privacy Policy | Antalya VIP Tourism", "description": "Privacy policy of Antalya VIP Tourism covering booking data, optional analytics and your rights.", "canonical": "https://antalyaviptourism.com/privacy/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/privacy/" }, { "language": "de", "href": "https://antalyaviptourism.com/de/datenschutz/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/gizlilik/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/privacy/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/privacy/" }], "hero": { "eyebrow": "Privacy", "title": "Privacy Policy", "intro": "How we process personal data and the choices available to you." }, "cards": [{ "title": "1. Controller", "paragraphs": ["Antalya VIP Tourism, Ahmet Karadag, Belek Mah. Belek 61 Sk., Belek Deniz Apt No: 19 Ic Kapi No: 4, Serik / Antalya, Türkiye. Email: support@antalyaviptourism.com. Phone: +90 530 265 57 90."], "details": [], "privacySettings": false }, { "title": "2. Booking and contact data", "paragraphs": ["When you request or book a journey, we process the contact, travel, flight, pickup, destination and payment information you provide. This is necessary to answer your request, perform the journey, communicate with you and meet legal obligations. Data is retained only as long as required for these purposes or statutory retention periods."], "details": [], "privacySettings": false }, { "title": "3. Technical delivery", "paragraphs": ["When the website is accessed, technically necessary log data may be processed, including IP address, time, requested page, browser and device information. This supports secure and stable website delivery."], "details": [], "privacySettings": false }, { "title": "4. Google Analytics and Google Ads", "paragraphs": ["Google Analytics and Google Ads load only after you consent in the privacy dialog. Usage, device, interaction and conversion data may then be sent to Google. The provider is Google Ireland Limited and processing by affiliated companies outside the European Economic Area may occur. You may withdraw consent at any time through Privacy settings. Rejecting analytics does not affect booking functions."], "details": [], "privacySettings": true }, { "title": "5. Service providers and recipients", "paragraphs": ["Hosting, database, payment and communication providers may process only the data required for their task. Payment details are processed by the selected payment provider."], "details": [], "privacySettings": false }, { "title": "6. Your rights", "paragraphs": ["Where applicable law provides, you may request access, correction, deletion, restriction, portability or object to processing. You may withdraw consent for the future and lodge a complaint with a competent supervisory authority."], "details": [], "privacySettings": false }, { "title": "7. Updates", "paragraphs": ["This policy is updated when services or legal requirements change. Last updated: 19 June 2026."], "details": [], "privacySettings": false }], "homeLabel": "Home" },
  "en-imprint": { "title": "Imprint | Antalya VIP Tourism", "description": "Legal notice and provider information for Antalya VIP Tourism.", "canonical": "https://antalyaviptourism.com/impressum.html", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/impressum.html" }, { "language": "de", "href": "https://antalyaviptourism.com/de/impressum/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/kunye/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/impressum/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/impressum.html" }], "hero": { "eyebrow": "Legal notice", "title": "Imprint", "intro": "Provider information for this website under the applicable information obligations." }, "cards": [{ "title": "Operator", "paragraphs": [], "details": [{ "term": "Name", "value": "Ahmet Karadag", "href": null }, { "term": "Business name", "value": "Antalya VIP Tourism", "href": null }, { "term": "Address", "value": "Belek Mah. Belek 61 Sk.\nBelek Deniz Apt No: 19 Ic Kapi No: 4\nSerik / Antalya\nTürkiye", "href": null }], "privacySettings": false }, { "title": "Contact", "paragraphs": [], "details": [{ "term": "Phone / WhatsApp", "value": "+90 530 265 57 90", "href": "tel:+905302655790" }, { "term": "E-Mail", "value": "support@antalyaviptourism.com", "href": "mailto:support@antalyaviptourism.com" }], "privacySettings": false }, { "title": "Tax information", "paragraphs": [], "details": [{ "term": "Tax office", "value": "Serik", "href": null }, { "term": "Tax number / Vergi Kimlik No", "value": "507•••8455", "href": null }, { "term": "Business start date", "value": "12.04.2021", "href": null }], "privacySettings": false }, { "title": "Business activity", "paragraphs": ["Passenger transport in urban, suburban and rural areas by road vehicles, including staff, student and comparable group transfers."], "details": [], "privacySettings": false }, { "title": "Liability for content", "paragraphs": ["If you notice any inaccuracy or have a concern about the content on this website, please contact us directly."], "details": [], "privacySettings": false }], "homeLabel": "Home" },
  "de-privacy": { "title": "Datenschutzerklärung | Antalya VIP Tourism", "description": "Datenschutzerklärung von Antalya VIP Tourism mit Informationen zu Buchungsdaten, optionaler Analyse und Ihren Rechten.", "canonical": "https://antalyaviptourism.com/de/datenschutz/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/privacy/" }, { "language": "de", "href": "https://antalyaviptourism.com/de/datenschutz/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/gizlilik/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/privacy/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/privacy/" }], "hero": { "eyebrow": "Datenschutz", "title": "Datenschutzerklärung", "intro": "Wie wir personenbezogene Daten verarbeiten und welche Wahlmöglichkeiten Sie haben." }, "cards": [{ "title": "1. Verantwortlicher", "paragraphs": ["Antalya VIP Tourism, Ahmet Karadag, Belek Mah. Belek 61 Sk., Belek Deniz Apt No: 19 Ic Kapi No: 4, Serik / Antalya, Türkei. E-Mail: support@antalyaviptourism.com. Telefon: +90 530 265 57 90."], "details": [], "privacySettings": false }, { "title": "2. Buchungs- und Kontaktdaten", "paragraphs": ["Wenn Sie eine Fahrt anfragen oder buchen, verarbeiten wir die von Ihnen angegebenen Kontakt-, Reise-, Flug-, Abhol-, Ziel- und Zahlungsinformationen. Dies ist erforderlich, um Ihre Anfrage zu bearbeiten, die Fahrt durchzuführen, mit Ihnen zu kommunizieren und gesetzliche Pflichten zu erfüllen. Daten werden nur so lange gespeichert, wie sie für diese Zwecke oder gesetzliche Aufbewahrungsfristen benötigt werden."], "details": [], "privacySettings": false }, { "title": "3. Technische Bereitstellung", "paragraphs": ["Beim Aufruf der Website können technisch erforderliche Protokolldaten verarbeitet werden, insbesondere IP-Adresse, Zeitpunkt, aufgerufene Seite, Browser- und Geräteinformationen. Dies dient der sicheren und stabilen Bereitstellung."], "details": [], "privacySettings": false }, { "title": "4. Google Analytics und Google Ads", "paragraphs": ["Google Analytics und Google Ads werden erst nach Ihrer Einwilligung geladen. Dabei können Nutzungs-, Geräte-, Interaktions- und Conversion-Daten an Google Ireland Limited übermittelt werden. Eine Verarbeitung außerhalb des Europäischen Wirtschaftsraums kann stattfinden. Sie können Ihre Einwilligung jederzeit über die Datenschutzeinstellungen widerrufen. Eine Ablehnung beeinträchtigt die Buchung nicht."], "details": [], "privacySettings": true }, { "title": "5. Dienstleister und Empfänger", "paragraphs": ["Hosting-, Datenbank-, Zahlungs- und Kommunikationsdienstleister erhalten nur die für ihre Aufgabe erforderlichen Daten. Zahlungsdaten verarbeitet der gewählte Zahlungsdienstleister."], "details": [], "privacySettings": false }, { "title": "6. Ihre Rechte", "paragraphs": ["Soweit anwendbares Recht dies vorsieht, können Sie Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit oder Widerspruch verlangen. Sie können Einwilligungen für die Zukunft widerrufen und sich bei einer zuständigen Aufsichtsbehörde beschweren."], "details": [], "privacySettings": false }, { "title": "7. Änderungen", "paragraphs": ["Diese Erklärung wird bei Änderungen der Dienste oder rechtlichen Anforderungen aktualisiert. Stand: 19. Juni 2026."], "details": [], "privacySettings": false }], "homeLabel": "Startseite" },
  "de-imprint": { "title": "Impressum | Antalya VIP Tourism", "description": "Impressum und Anbieterkennzeichnung von Antalya VIP Tourism.", "canonical": "https://antalyaviptourism.com/de/impressum/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/impressum.html" }, { "language": "de", "href": "https://antalyaviptourism.com/de/impressum/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/kunye/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/impressum/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/impressum.html" }], "hero": { "eyebrow": "Anbieterkennzeichnung", "title": "Impressum", "intro": "Angaben gemaess den anwendbaren Informationspflichten fuer den Anbieter dieser Website." }, "cards": [{ "title": "Betreiber", "paragraphs": [], "details": [{ "term": "Name", "value": "Ahmet Karadag", "href": null }, { "term": "Geschaeftsbezeichnung", "value": "Antalya VIP Tourism", "href": null }, { "term": "Adresse", "value": "Belek Mah. Belek 61 Sk.\nBelek Deniz Apt No: 19 Ic Kapi No: 4\nSerik / Antalya\nTuerkei", "href": null }], "privacySettings": false }, { "title": "Kontakt", "paragraphs": [], "details": [{ "term": "Telefon / WhatsApp", "value": "+90 530 265 57 90", "href": "tel:+905302655790" }, { "term": "E-Mail", "value": "support@antalyaviptourism.com", "href": "mailto:support@antalyaviptourism.com" }], "privacySettings": false }, { "title": "Steuerliche Angaben", "paragraphs": [], "details": [{ "term": "Finanzamt", "value": "Serik", "href": null }, { "term": "Steuernummer / Vergi Kimlik No", "value": "507•••8455", "href": null }, { "term": "Taetigkeitsbeginn", "value": "12.04.2021", "href": null }], "privacySettings": false }, { "title": "Taetigkeit", "paragraphs": ["Personenbefoerderung im Stadt-, Vorort- und laendlichen Verkehr mit Strassenfahrzeugen, einschliesslich Personal-, Schueler- und vergleichbarer Gruppentransfers."], "details": [], "privacySettings": false }, { "title": "Haftung fuer Inhalte", "paragraphs": ["Falls Sie einen Fehler oder eine Unklarheit auf dieser Website entdecken, freuen wir uns ueber Ihre Nachricht. Bitte kontaktieren Sie uns direkt."], "details": [], "privacySettings": false }], "homeLabel": "Startseite" },
  "tr-privacy": { "title": "Gizlilik Politikası | Antalya VIP Tourism", "description": "Antalya VIP Tourism gizlilik politikası: rezervasyon verileri, isteğe bağlı analizler ve haklarınız.", "canonical": "https://antalyaviptourism.com/tr/gizlilik/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/privacy/" }, { "language": "de", "href": "https://antalyaviptourism.com/de/datenschutz/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/gizlilik/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/privacy/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/privacy/" }], "hero": { "eyebrow": "Gizlilik", "title": "Gizlilik Politikası", "intro": "Kişisel verileri nasıl işlediğimiz ve kullanabileceğiniz seçenekler." }, "cards": [{ "title": "1. Veri sorumlusu", "paragraphs": ["Antalya VIP Tourism, Ahmet Karadag, Belek Mah. Belek 61 Sk., Belek Deniz Apt No: 19 İç Kapı No: 4, Serik / Antalya, Türkiye. E-posta: support@antalyaviptourism.com. Telefon: +90 530 265 57 90."], "details": [], "privacySettings": false }, { "title": "2. Rezervasyon ve iletişim verileri", "paragraphs": ["Bir yolculuk talep ettiğinizde veya rezervasyon yaptığınızda verdiğiniz iletişim, seyahat, uçuş, alış, varış ve ödeme bilgilerini işleriz. Bu bilgiler talebinizi yanıtlamak, yolculuğu gerçekleştirmek, sizinle iletişim kurmak ve yasal yükümlülükleri yerine getirmek için gereklidir. Veriler yalnızca gerekli veya yasal saklama süresi boyunca tutulur."], "details": [], "privacySettings": false }, { "title": "3. Teknik hizmet", "paragraphs": ["Web sitesi kullanılırken IP adresi, zaman, istenen sayfa, tarayıcı ve cihaz bilgileri gibi teknik günlük verileri güvenli ve istikrarlı hizmet için işlenebilir."], "details": [], "privacySettings": false }, { "title": "4. Google Analytics ve Google Ads", "paragraphs": ["Google Analytics ve Google Ads yalnızca onayınızdan sonra yüklenir. Kullanım, cihaz, etkileşim ve dönüşüm verileri Google Ireland Limited şirketine iletilebilir ve Avrupa Ekonomik Alanı dışında işlenebilir. Onayınızı Gizlilik ayarlarından istediğiniz zaman geri çekebilirsiniz. Reddetmek rezervasyon işlevlerini etkilemez."], "details": [], "privacySettings": true }, { "title": "5. Hizmet sağlayıcılar", "paragraphs": ["Barındırma, veri tabanı, ödeme ve iletişim sağlayıcıları yalnızca görevleri için gerekli verileri işler. Ödeme bilgileri seçilen ödeme sağlayıcısı tarafından işlenir."], "details": [], "privacySettings": false }, { "title": "6. Haklarınız", "paragraphs": ["Uygulanabilir mevzuat kapsamında erişim, düzeltme, silme, kısıtlama, veri taşınabilirliği veya itiraz haklarınızı kullanabilirsiniz. Onayınızı gelecek için geri çekebilir ve yetkili makama şikâyette bulunabilirsiniz."], "details": [], "privacySettings": false }, { "title": "7. Güncellemeler", "paragraphs": ["Hizmetler veya yasal gereklilikler değiştiğinde bu politika güncellenir. Son güncelleme: 19 Haziran 2026."], "details": [], "privacySettings": false }], "homeLabel": "Ana sayfa" },
  "tr-imprint": { "title": "Künye | Antalya VIP Tourism", "description": "Antalya VIP Tourism künye ve hizmet sağlayıcı bilgileri.", "canonical": "https://antalyaviptourism.com/tr/kunye/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/impressum.html" }, { "language": "de", "href": "https://antalyaviptourism.com/de/impressum/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/kunye/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/impressum/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/impressum.html" }], "hero": { "eyebrow": "Yasal bilgiler", "title": "Künye", "intro": "Bu web sitesinin hizmet sağlayıcısına ait yasal bilgilendirme." }, "cards": [{ "title": "İşletmeci", "paragraphs": [], "details": [{ "term": "Ad soyad", "value": "Ahmet Karadag", "href": null }, { "term": "İşletme adı", "value": "Antalya VIP Tourism", "href": null }, { "term": "Adres", "value": "Belek Mah. Belek 61 Sk.\nBelek Deniz Apt No: 19 İç Kapı No: 4\nSerik / Antalya\nTürkiye", "href": null }], "privacySettings": false }, { "title": "İletişim", "paragraphs": [], "details": [{ "term": "Telefon / WhatsApp", "value": "+90 530 265 57 90", "href": "tel:+905302655790" }, { "term": "E-Mail", "value": "support@antalyaviptourism.com", "href": "mailto:support@antalyaviptourism.com" }], "privacySettings": false }, { "title": "Vergi bilgileri", "paragraphs": [], "details": [{ "term": "Vergi dairesi", "value": "Serik", "href": null }, { "term": "Vergi kimlik no", "value": "507•••8455", "href": null }, { "term": "İşe başlama tarihi", "value": "12.04.2021", "href": null }], "privacySettings": false }, { "title": "Faaliyet", "paragraphs": ["Şehir içi, banliyö ve kırsal alanlarda kara yolu ile personel, öğrenci ve benzeri grup taşımacılığı."], "details": [], "privacySettings": false }, { "title": "İçerik sorumluluğu", "paragraphs": ["Web sitemizdeki içeriklerle ilgili bir hata veya eksiklik fark ederseniz lütfen doğrudan bizimle iletişime geçin."], "details": [], "privacySettings": false }], "homeLabel": "Ana sayfa" },
  "ru-privacy": { "title": "Политика конфиденциальности | Antalya VIP Tourism", "description": "Политика конфиденциальности Antalya VIP Tourism: данные бронирования, необязательная аналитика и ваши права.", "canonical": "https://antalyaviptourism.com/ru/privacy/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/privacy/" }, { "language": "de", "href": "https://antalyaviptourism.com/de/datenschutz/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/gizlilik/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/privacy/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/privacy/" }], "hero": { "eyebrow": "Конфиденциальность", "title": "Политика конфиденциальности", "intro": "Как мы обрабатываем персональные данные и какие возможности выбора у вас есть." }, "cards": [{ "title": "1. Ответственное лицо", "paragraphs": ["Antalya VIP Tourism, Ahmet Karadag, Belek Mah. Belek 61 Sk., Belek Deniz Apt No: 19 Ic Kapi No: 4, Serik / Antalya, Türkiye. Email: support@antalyaviptourism.com. Телефон: +90 530 265 57 90."], "details": [], "privacySettings": false }, { "title": "2. Данные бронирования и контактов", "paragraphs": ["При запросе или бронировании поездки мы обрабатываем предоставленные контактные, туристические, полётные, адресные и платёжные данные. Это необходимо для ответа на запрос, выполнения поездки, связи с вами и соблюдения закона. Данные хранятся только в течение необходимого или установленного законом срока."], "details": [], "privacySettings": false }, { "title": "3. Техническая работа сайта", "paragraphs": ["При посещении сайта могут обрабатываться технические журналы: IP-адрес, время, запрошенная страница, сведения о браузере и устройстве. Это необходимо для безопасной и стабильной работы сайта."], "details": [], "privacySettings": false }, { "title": "4. Google Analytics и Google Ads", "paragraphs": ["Google Analytics и Google Ads загружаются только после вашего согласия. Данные об использовании, устройстве, взаимодействиях и конверсиях могут передаваться Google Ireland Limited и обрабатываться за пределами Европейской экономической зоны. Согласие можно отозвать через настройки конфиденциальности. Отказ не влияет на бронирование."], "details": [], "privacySettings": true }, { "title": "5. Поставщики услуг", "paragraphs": ["Поставщики хостинга, базы данных, платежей и связи получают только необходимые для их задачи данные. Платёжные данные обрабатывает выбранный платёжный сервис."], "details": [], "privacySettings": false }, { "title": "6. Ваши права", "paragraphs": ["В рамках применимого права вы можете запросить доступ, исправление, удаление, ограничение, перенос данных или возразить против обработки. Вы можете отозвать согласие на будущее и обратиться в компетентный надзорный орган."], "details": [], "privacySettings": false }, { "title": "7. Обновления", "paragraphs": ["Политика обновляется при изменении сервисов или требований закона. Обновлено: 19 июня 2026 года."], "details": [], "privacySettings": false }], "homeLabel": "Главная" },
  "ru-imprint": { "title": "Правовая информация | Antalya VIP Tourism", "description": "Правовая информация и сведения о поставщике услуг Antalya VIP Tourism.", "canonical": "https://antalyaviptourism.com/ru/impressum/", "alternates": [{ "language": "en", "href": "https://antalyaviptourism.com/impressum.html" }, { "language": "de", "href": "https://antalyaviptourism.com/de/impressum/" }, { "language": "tr", "href": "https://antalyaviptourism.com/tr/kunye/" }, { "language": "ru", "href": "https://antalyaviptourism.com/ru/impressum/" }, { "language": "x-default", "href": "https://antalyaviptourism.com/impressum.html" }], "hero": { "eyebrow": "Правовая информация", "title": "Правовая информация", "intro": "Информация о поставщике услуг этого сайта в соответствии с применимыми требованиями." }, "cards": [{ "title": "Оператор", "paragraphs": [], "details": [{ "term": "Имя", "value": "Ahmet Karadag", "href": null }, { "term": "Название компании", "value": "Antalya VIP Tourism", "href": null }, { "term": "Адрес", "value": "Belek Mah. Belek 61 Sk.\nBelek Deniz Apt No: 19 Ic Kapi No: 4\nSerik / Antalya\nTürkiye", "href": null }], "privacySettings": false }, { "title": "Контакты", "paragraphs": [], "details": [{ "term": "Телефон / WhatsApp", "value": "+90 530 265 57 90", "href": "tel:+905302655790" }, { "term": "E-Mail", "value": "support@antalyaviptourism.com", "href": "mailto:support@antalyaviptourism.com" }], "privacySettings": false }, { "title": "Налоговая информация", "paragraphs": [], "details": [{ "term": "Налоговая инспекция", "value": "Serik", "href": null }, { "term": "Налоговый номер / Vergi Kimlik No", "value": "507•••8455", "href": null }, { "term": "Дата начала деятельности", "value": "12.04.2021", "href": null }], "privacySettings": false }, { "title": "Вид деятельности", "paragraphs": ["Пассажирские перевозки автомобильным транспортом в городских, пригородных и сельских районах, включая трансферы персонала, учащихся и сопоставимых групп."], "details": [], "privacySettings": false }, { "title": "Ответственность за содержание", "paragraphs": ["Если вы заметили неточность или у вас есть вопрос по содержанию сайта, пожалуйста, свяжитесь с нами напрямую."], "details": [], "privacySettings": false }], "homeLabel": "Главная" }
};
const privacyPath = { en: "/privacy/", de: "/de/datenschutz/", tr: "/tr/gizlilik/", ru: "/ru/privacy/" };
const imprintPath = { en: "/impressum.html", de: "/de/impressum/", tr: "/tr/kunye/", ru: "/ru/impressum/" };
const privacyLabel = { en: "Privacy", de: "Datenschutz", tr: "Gizlilik", ru: "Конфиденциальность" };
const imprintLabel = { en: "Imprint", de: "Impressum", tr: "Künye", ru: "Правовая информация" };
const privacySettingsLabel = { en: "Open privacy settings", de: "Datenschutzeinstellungen öffnen", tr: "Gizlilik ayarlarını aç", ru: "Открыть настройки конфиденциальности" };
function LegalPage({ language, privacy }) {
  const key = `${language}-${privacy ? "privacy" : "imprint"}`;
  const page = legalData[key];
  const homeHref = language === "en" ? "/" : `/${language}/`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(StaticPageHeader, { homeHref, homeLabel: page.homeLabel, secondaryHref: privacy ? imprintPath[language] : privacyPath[language], secondaryLabel: privacy ? imprintLabel[language] : privacyLabel[language], legal: true }),
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
        card.privacySettings && /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("button", { className: "button button-gold", type: "button", "data-open-consent": true, children: privacySettingsLabel[language] }) })
      ] }, card.title)) })
    ] }),
    /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsxs("div", { className: "footer-bottom", children: [
      /* @__PURE__ */ jsx("span", { children: "© 2026 Antalya VIP Tourism" }),
      /* @__PURE__ */ jsx("a", { href: privacy ? imprintPath[language] : privacyPath[language], children: privacy ? imprintLabel[language] : privacyLabel[language] })
    ] }) })
  ] });
}
function loader({
  request
}) {
  const pathname = new URL(request.url).pathname;
  const language = languageFromPath(pathname);
  const privacy = /privacy|datenschutz|gizlilik/.test(pathname);
  return {
    language,
    privacy
  };
}
const meta = ({
  loaderData
}) => {
  const language = loaderData?.language ?? "en";
  const key = `${language}-${loaderData?.privacy ? "privacy" : "imprint"}`;
  const page = legalData[key] ?? legalData["en-imprint"];
  return [{
    title: page.title
  }, {
    name: "description",
    content: page.description
  }, {
    tagName: "link",
    rel: "canonical",
    href: page.canonical
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
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: legal,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CKIlc3Qk.js", "imports": ["/assets/components-BdNtLw1H.js", "/assets/errorBoundaries-BQw1EcSy.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/root-CBQNr3Kx.js", "imports": ["/assets/components-BdNtLw1H.js", "/assets/errorBoundaries-BQw1EcSy.js", "/assets/Icon-B-w0JaHK.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-en": { "id": "home-en", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-BR6Ez2Ne.js", "imports": ["/assets/components-BdNtLw1H.js", "/assets/CookieConsent-Dlwknsbn.js", "/assets/seo-qRw2o5Y_.js", "/assets/Icon-B-w0JaHK.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-de": { "id": "home-de", "parentId": "root", "path": "de", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-BR6Ez2Ne.js", "imports": ["/assets/components-BdNtLw1H.js", "/assets/CookieConsent-Dlwknsbn.js", "/assets/seo-qRw2o5Y_.js", "/assets/Icon-B-w0JaHK.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-tr": { "id": "home-tr", "parentId": "root", "path": "tr", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-BR6Ez2Ne.js", "imports": ["/assets/components-BdNtLw1H.js", "/assets/CookieConsent-Dlwknsbn.js", "/assets/seo-qRw2o5Y_.js", "/assets/Icon-B-w0JaHK.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-ru": { "id": "home-ru", "parentId": "root", "path": "ru", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-BR6Ez2Ne.js", "imports": ["/assets/components-BdNtLw1H.js", "/assets/CookieConsent-Dlwknsbn.js", "/assets/seo-qRw2o5Y_.js", "/assets/Icon-B-w0JaHK.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "transfer-en": { "id": "transfer-en", "parentId": "root", "path": "transfers/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/transfer-CCrS2GGI.js", "imports": ["/assets/components-BdNtLw1H.js", "/assets/CookieConsent-Dlwknsbn.js", "/assets/seo-qRw2o5Y_.js", "/assets/StaticPageHeader-C5n6KC4d.js", "/assets/Icon-B-w0JaHK.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "transfer-localized": { "id": "transfer-localized", "parentId": "root", "path": ":language/transfers/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/transfer-CCrS2GGI.js", "imports": ["/assets/components-BdNtLw1H.js", "/assets/CookieConsent-Dlwknsbn.js", "/assets/seo-qRw2o5Y_.js", "/assets/StaticPageHeader-C5n6KC4d.js", "/assets/Icon-B-w0JaHK.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-en": { "id": "legal-imprint-en", "parentId": "root", "path": "impressum.html", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-BBaCpd-A.js", "imports": ["/assets/components-BdNtLw1H.js", "/assets/CookieConsent-Dlwknsbn.js", "/assets/StaticPageHeader-C5n6KC4d.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-en": { "id": "legal-privacy-en", "parentId": "root", "path": "privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-BBaCpd-A.js", "imports": ["/assets/components-BdNtLw1H.js", "/assets/CookieConsent-Dlwknsbn.js", "/assets/StaticPageHeader-C5n6KC4d.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-de": { "id": "legal-privacy-de", "parentId": "root", "path": "de/datenschutz", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-BBaCpd-A.js", "imports": ["/assets/components-BdNtLw1H.js", "/assets/CookieConsent-Dlwknsbn.js", "/assets/StaticPageHeader-C5n6KC4d.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-de": { "id": "legal-imprint-de", "parentId": "root", "path": "de/impressum", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-BBaCpd-A.js", "imports": ["/assets/components-BdNtLw1H.js", "/assets/CookieConsent-Dlwknsbn.js", "/assets/StaticPageHeader-C5n6KC4d.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-tr": { "id": "legal-privacy-tr", "parentId": "root", "path": "tr/gizlilik", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-BBaCpd-A.js", "imports": ["/assets/components-BdNtLw1H.js", "/assets/CookieConsent-Dlwknsbn.js", "/assets/StaticPageHeader-C5n6KC4d.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-tr": { "id": "legal-imprint-tr", "parentId": "root", "path": "tr/kunye", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-BBaCpd-A.js", "imports": ["/assets/components-BdNtLw1H.js", "/assets/CookieConsent-Dlwknsbn.js", "/assets/StaticPageHeader-C5n6KC4d.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-ru": { "id": "legal-privacy-ru", "parentId": "root", "path": "ru/privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-BBaCpd-A.js", "imports": ["/assets/components-BdNtLw1H.js", "/assets/CookieConsent-Dlwknsbn.js", "/assets/StaticPageHeader-C5n6KC4d.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-ru": { "id": "legal-imprint-ru", "parentId": "root", "path": "ru/impressum", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-BBaCpd-A.js", "imports": ["/assets/components-BdNtLw1H.js", "/assets/CookieConsent-Dlwknsbn.js", "/assets/StaticPageHeader-C5n6KC4d.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-73a3baf4.js", "version": "73a3baf4", "sri": void 0 };
const assetsBuildDirectory = "build/public-react/client";
const basename = "/";
const future = { "unstable_enableNodeReadableStream": false, "unstable_optimizeDeps": false };
const ssr = false;
const isSpaMode = false;
const prerender = ["/", "/de/", "/tr/", "/ru/", "/transfers/antalya/", "/transfers/belek/", "/transfers/side/", "/transfers/kemer/", "/transfers/alanya/", "/transfers/bogazkent/", "/transfers/manavgat/", "/transfers/kizilagac/", "/transfers/tekirova/", "/transfers/bodrum/", "/transfers/dalaman/", "/transfers/fethiye/", "/transfers/pamukkale/", "/transfers/kapadokya/", "/de/transfers/antalya/", "/de/transfers/belek/", "/de/transfers/side/", "/de/transfers/kemer/", "/de/transfers/alanya/", "/de/transfers/bogazkent/", "/de/transfers/manavgat/", "/de/transfers/kizilagac/", "/de/transfers/tekirova/", "/de/transfers/bodrum/", "/de/transfers/dalaman/", "/de/transfers/fethiye/", "/de/transfers/pamukkale/", "/de/transfers/kapadokya/", "/tr/transfers/antalya/", "/tr/transfers/belek/", "/tr/transfers/side/", "/tr/transfers/kemer/", "/tr/transfers/alanya/", "/tr/transfers/bogazkent/", "/tr/transfers/manavgat/", "/tr/transfers/kizilagac/", "/tr/transfers/tekirova/", "/tr/transfers/bodrum/", "/tr/transfers/dalaman/", "/tr/transfers/fethiye/", "/tr/transfers/pamukkale/", "/tr/transfers/kapadokya/", "/ru/transfers/antalya/", "/ru/transfers/belek/", "/ru/transfers/side/", "/ru/transfers/kemer/", "/ru/transfers/alanya/", "/ru/transfers/bogazkent/", "/ru/transfers/manavgat/", "/ru/transfers/kizilagac/", "/ru/transfers/tekirova/", "/ru/transfers/bodrum/", "/ru/transfers/dalaman/", "/ru/transfers/fethiye/", "/ru/transfers/pamukkale/", "/ru/transfers/kapadokya/", "/impressum.html", "/privacy/", "/de/datenschutz/", "/de/impressum/", "/tr/gizlilik/", "/tr/kunye/", "/ru/privacy/", "/ru/impressum/"];
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
    module: route4
  },
  "home-de": {
    id: "home-de",
    parentId: "root",
    path: "de",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "home-tr": {
    id: "home-tr",
    parentId: "root",
    path: "tr",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "home-ru": {
    id: "home-ru",
    parentId: "root",
    path: "ru",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "transfer-en": {
    id: "transfer-en",
    parentId: "root",
    path: "transfers/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "transfer-localized": {
    id: "transfer-localized",
    parentId: "root",
    path: ":language/transfers/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "legal-imprint-en": {
    id: "legal-imprint-en",
    parentId: "root",
    path: "impressum.html",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "legal-privacy-en": {
    id: "legal-privacy-en",
    parentId: "root",
    path: "privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "legal-privacy-de": {
    id: "legal-privacy-de",
    parentId: "root",
    path: "de/datenschutz",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "legal-imprint-de": {
    id: "legal-imprint-de",
    parentId: "root",
    path: "de/impressum",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "legal-privacy-tr": {
    id: "legal-privacy-tr",
    parentId: "root",
    path: "tr/gizlilik",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "legal-imprint-tr": {
    id: "legal-imprint-tr",
    parentId: "root",
    path: "tr/kunye",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "legal-privacy-ru": {
    id: "legal-privacy-ru",
    parentId: "root",
    path: "ru/privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "legal-imprint-ru": {
    id: "legal-imprint-ru",
    parentId: "root",
    path: "ru/impressum",
    index: void 0,
    caseSensitive: void 0,
    module: route14
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
