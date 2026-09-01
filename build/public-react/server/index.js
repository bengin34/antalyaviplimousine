import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withHydrateFallbackProps, useMatches, Meta, Links, ScrollRestoration, Scripts, useLoaderData } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { createContext, useState, useEffect, useCallback, useMemo, useContext, useRef, lazy, Suspense } from "react";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
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
const siteStyles = "/assets/styles-Y4VkF-ZK.css";
const reactPublicStyles = "/assets/react-public-DThNqFJ3.css";
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
    dir: ["ar", "ur", "he"].includes(language) ? "rtl" : "ltr",
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
const resources$1 = /* @__PURE__ */ JSON.parse(`{"en":{"navFleet":"Fleet","navService":"Service","navRoutes":"Routes","navReviews":"Reviews","navContact":"Contact","bookNow":"Book now","alwaysAvailable":"Available 24 hours, every day","heroEyebrow":"Private chauffeur service · Antalya","heroTitle":"Premium Airport<br />Transfers in Antalya","heroSubtitle":"Private chauffeur-driven transfers from Antalya Airport to Belek, Side, Kemer and Alanya.","bookTransfer":"Book your transfer","instantQuote":"Get instant quote","googleRated":"Google rated","trustedGuests":"Trusted by 2,500+ guests","discover":"Discover","tbLicensed":"TÜRSAB Licensed","tbFlightTracking":"Flight Tracking","tbFixedPrice":"Fixed Pricing","tb247Concierge":"24/7 Concierge","tbChildSeats":"Child Seats Included","privateJourney":"Your private journey","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Pick-up","airportOption":"Antalya Airport (AYT)","hotelOption":"Hotel","privateAddressOption":"Private address","destination":"Destination","selectDestination":"Select destination","vehicle":"Vehicle","guests":"Guests","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Choose time","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Full pick-up address","dropoffAddress":"Full drop-off address","luggageLabel":"Large luggage","hotelNameLabel":"Hotel name","childSeatLabel":"Child seats","childSeatNone":"No child seat","oneChildSeat":"1 child seat","twoChildSeats":"2 child seats","threeChildSeats":"3 child seats","fourChildSeats":"4 child seats","fullName":"Full name","phoneLabel":"Phone / WhatsApp","emailLabel":"Email","paymentMethod":"Choose payment method","cashPayment":"Pay in the vehicle","recommended":"Recommended","cashPaymentDescription":"No online prepayment. You pay the fixed total to your driver in cash at the start of the journey.","quoteIncludes":"Includes meet & greet, flight tracking, parking, 90 minutes of waiting and bottled water.","perVehicleNote":"Per vehicle — not per person · Up to 6 passengers","confirmCashBooking":"Confirm booking — pay in vehicle","flightTracking":"Real-time flight tracking","fixedPrice":"Fixed price guarantee","meetGreet":"Personal meet & greet","speakingDrivers":"English & German speaking","fromAirport":"From Antalya Airport","welcomeEyebrow":"Welcome to a better arrival","welcomeTitle":"Travel beautifully.<br />Arrive effortlessly.","welcomeBody":"From the moment your flight lands, every detail is considered. Our airport team greets you, your chauffeur pulls up at the pick-up point and your luggage is loaded into a meticulously prepared private vehicle.","ourStandards":"Our service standards","concierge":"Concierge support","guestsWelcomed":"Guests welcomed","guestRating":"Average guest rating","privateTransfers":"Private transfers","fleetEyebrow":"The fleet","fleetTitle":"Your private space,<br />refined in every detail.","fleetIntro":"Travel in quiet comfort with generous space for your family, golf equipment and luggage.","signatureFleet":"Signature fleet","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Spacious VIP transport for larger groups, with generous room for passengers and luggage.","passengers":"passengers","suitcases":"suitcases","television":"In-vehicle television","coldDrinks":"Cold drinks","snacks":"Snacks","childSeats":"Child seat available","wifi":"Complimentary WiFi","nameSignGreeting":"Meet & greet at counter J / 777","reserveVehicle":"Reserve this vehicle","insideVclass":"Inside the Sprinter","interiorTitle":"A private lounge between<br />the airport and your hotel.","serviceEyebrow":"The Antalya VIP standard","serviceTitle":"More than a transfer.<br />A considered welcome.","serviceIntro":"Hotel-level attention, experienced local chauffeurs and complete peace of mind from runway to resort.","trackingTitle":"Flight tracking","trackingBody":"We monitor your flight in real time and adjust your pick-up automatically, at no extra charge.","chauffeurTitle":"Professional chauffeurs","chauffeurBody":"Immaculately presented, discreet and selected for their local knowledge and service standards.","greetTitle":"Meet & greet","greetBody":"In international arrivals our airport team meets you at counter J / 777, calls your chauffeur to the pick-up point and helps with your luggage.","supportTitle":"24/7 concierge","supportBody":"A real person is always available by phone or WhatsApp before, during and after your journey.","priceTitle":"Fixed prices","priceBody":"The price confirmed is the price you pay. Waiting time, parking and flight delays are included.","familyTitle":"Family ready","familyBody":"Age-appropriate child seats, spacious cabins and patient assistance for a relaxed family arrival.","routesEyebrow":"Our most requested journeys","routesTitle":"From Antalya Airport<br />to the Turkish Riviera.","routesIntro":"All prices are per vehicle, never per passenger, with 90 minutes of waiting included.","golfFavourite":"Golf favourite","reviewsEyebrow":"Guest reviews","reviewsTitle":"Service remembered<br />long after arrival.","googleReviews":"Based on 387 verified Google reviews","trustedBy":"Trusted by guests of Antalya's leading resorts","faqEyebrow":"Frequently asked","faqTitle":"Before you travel.","faqIntro":"Everything you need to know about your private Antalya airport transfer.","askQuestion":"Ask us a question","faqCatArrival":"Arrival & transfer","faqOneQ":"What happens if my flight is delayed?","faqOneA":"Nothing on your side. We track your flight live and adjust your pick-up time automatically. Delays caused by your airline are never charged - your chauffeur is there whenever you land, and the first 90 minutes after landing are always included.","faqTwoQ":"I am arriving on an international flight. How does the pick-up work?","faqTwoA":"After passport control and baggage claim, follow the other passengers to the Meet & Greet Area and come to our counter J / 777. Simply give your name to our staff - that is all it takes. Our team alerts your chauffeur right away; he enters the airport and pulls up at the pick-up point while our staff walks you to the vehicle. The whole process takes around 7-8 minutes.","faqSixQ":"I am arriving on a domestic flight. Where do I find my chauffeur?","faqSixA":"The Meet & Greet Area serves international arrivals only, so domestic guests are looked after differently: we send you your chauffeur's phone number before the transfer. Just let him know once you have landed and he will meet you in the arrivals hall.","faqSevenQ":"What should I do if nobody is at counter J / 777?","faqSevenA":"Two members of our team are permanently on duty at the counter and their only job is walking arriving guests to their vehicle. If you find the counter empty for a moment, it means a colleague is escorting the guest who arrived just before you - each escort takes about 7-8 minutes. Please wait around 10 minutes. If nobody is back by then, message us on WhatsApp: we alert your chauffeur immediately, have him park at the nearest point and guide you straight to your car with no further waiting.","faqEightQ":"What if I need more than 90 minutes to leave the airport?","faqEightA":"The first 90 minutes after your plane lands are included free of charge - comfortably more than passport control, baggage and customs require - and this window shifts automatically with any flight delay. Only if something unrelated to your flight keeps you inside the terminal for longer, a parking contribution of EUR 5 is added for each additional hour. In practice this almost never happens: virtually all of our guests are on the road long before that.","faqCatJourney":"Return & journey","faqTenQ":"How do I stay in touch for my return transfer?","faqTenA":"Once you have confirmed your return date and time with our team on WhatsApp, we assign your vehicle a few hours before the transfer and send you photos of it on WhatsApp - together with your chauffeur's phone number if you would like it. When your chauffeur reaches the hotel he informs reception, who let your room know that the car is ready. Our chauffeurs never call guests directly: all contact runs through our single WhatsApp support line, so you always know exactly who you are speaking to.","faqFourteenQ":"What if I am running late for my return transfer?","faqFourteenA":"Your chauffeur is at your hotel at the agreed time and waits 15 minutes free of charge. If you think you will be delayed, one message on WhatsApp is enough: we check your flight time, brief your chauffeur and adjust the plan with you. Our aim is never to rush you, only to get you to your flight comfortably.","faqFifteenQ":"Can we make an extra stop during the journey?","faqFifteenA":"Of course. If you would like to stop at a supermarket or a pharmacy, or pause for a photo along the way, simply tell us when booking or on WhatsApp and we will plan the route around it. If a stop takes you well off your route, we tell you before departure whether anything is added - nothing ever appears afterwards.","faqCatPayment":"Payment & price","faqNineQ":"How do I pay?","faqNineA":"You pay your chauffeur in cash at the start of the journey - we do not take cards. Prices are set in euros (EUR): the fixed amount is exactly what you saw when booking, per vehicle, with all airport and parking fees included. Prefer to pay in US dollars or Turkish lira? Message us on WhatsApp beforehand for a separate quote, as the exchange rate differs. Your chauffeur greets you, loads your luggage and fits any child seats you requested; once payment is settled, your journey begins.","faqTwelveQ":"Which currency can I pay in?","faqTwelveA":"Our prices are set in euros (EUR) and settled in cash; cards are not accepted. If you would rather pay in US dollars or Turkish lira, the amount depends on the exchange rate on the day, so message us on WhatsApp before your transfer: we confirm a clear price for you and brief your chauffeur, so nothing is negotiated in the car.","faqElevenQ":"Can I cancel or change my booking?","faqElevenA":"Yes, and it is always free. Because we take no prepayment there is nothing to refund and no waiting for money to come back - if your plans change, a message on WhatsApp is all we need. A new time, a different flight number or another destination address is handled the same way, at no extra cost.","faqFiveQ":"Is the quoted price final?","faqFiveA":"Yes. The price you see at booking is the price you hand to your chauffeur in cash - per vehicle, with all airport fees, parking and the first 90 minutes of waiting included. There are no hidden charges.","faqCatVehicle":"Vehicle & luggage","faqThreeQ":"Are child seats available?","faqThreeA":"Yes. Infant, toddler and booster seats are available free of charge when requested during booking.","faqThirteenQ":"How much luggage can I bring?","faqThirteenA":"As a rule, one large suitcase and one piece of hand luggage per passenger. If you are carrying more - an extra case, golf clubs, a pushchair, skis or a bicycle - simply tell us when booking and we will assign a vehicle with the right capacity at no additional cost. All that matters is that we know in advance. A Mercedes Vito carries up to 6 passengers and a Sprinter up to 12.","faqFourQ":"Can you carry golf bags and large luggage?","faqFourA":"Yes. Our Sprinter and Vito vehicles are ideal for golf groups. Tell us your luggage details and we will allocate the correct vehicle.","contactEyebrow":"Your journey starts here","contactTitle":"Arrive in Antalya<br />exceptionally well.","contactBody":"Book online in less than two minutes or speak directly with our 24/7 concierge team.","whatsappUs":"WhatsApp us","replyMinutes":"Usually replies within minutes","callUs":"Call us 24/7","emailUs":"Email concierge","replyHour":"Replies within one hour","footerTagline":"Private chauffeur services across the Turkish Riviera.","explore":"Explore","information":"Information","licensed":"Licensed private transfer operator · TÜRSAB compliant","bookingConfirmed":"Booking Confirmed","referenceLabel":"Reference","weWillContact":"Your booking request was sent. We will contact you within 30 minutes.","chatWithUs":"Chat with us","pickupAddressPlaceholder":"Hotel name, street, building number and district","dropoffAddressPlaceholder":"Hotel name, street, building number and district","hotelNamePlaceholder":"Hotel or accommodation name","stepRoute":"Route","stepDetails":"Details","stepContact":"Contact","reserveForPrice":"Reserve","continue":"Continue","back":"Back","perVehicleNoteVito":"Per vehicle — not per person · Up to 6 passengers","perVehicleNoteSprinter":"Per vehicle — not per person · Up to 12 passengers","perVehicle":"fixed · per vehicle","requestQuote":"Request a price quote","cashConfirmation":"Your booking is confirmed. You pay the fixed total to your driver in cash at the start of the journey.","bookingError":"Your booking could not be completed. Please try again.","formIncomplete":"Please complete the highlighted fields.","requiredField":"This field is required.","destinationRequired":"Please select a destination.","dateInvalid":"Please choose today or a future date.","emailInvalid":"Please enter a valid email address.","nameInvalid":"Please enter a valid full name.","phoneInvalid":"Please enter a valid number including the country code (for example +49).","flightInvalid":"Please enter a valid flight number.","pickupAddressRequired":"The pick-up address must be between 6 and 160 characters.","dropoffAddressRequired":"The drop-off address must be between 6 and 160 characters.","addressesMustDiffer":"Pick-up and drop-off addresses must be different.","customDestinationPrice":"The price will be confirmed after we check the drop-off address.","hotelNameRequired":"Please enter the hotel name.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use."},"zh":{"navFleet":"车型","navService":"服务","navRoutes":"路线","navReviews":"评价","navContact":"联系","bookNow":"立即预订","alwaysAvailable":"全天候24小时随时为您服务","heroEyebrow":"私人司机服务 · Antalya","heroTitle":"Antalya高端机场接送<br />专属服务","heroSubtitle":"从Antalya机场前往Belek、Side、Kemer和Alanya的私人专车接送服务。","bookTransfer":"预订接送","instantQuote":"立即获取报价","googleRated":"Google评分","trustedGuests":"已有超过2.500位客人预订","discover":"探索","tbLicensed":"TÜRSAB认证","tbFlightTracking":"航班追踪","tbFixedPrice":"固定价格保证","tb247Concierge":"24/7礼宾服务","tbChildSeats":"含儿童座椅","privateJourney":"您的私人之旅","meetGreetNote":"机场Meet &amp; Greet · 会合点J / 777","tripType":"行程类型","oneWay":"单程","roundTrip":"往返","roundTripHint":"选择往返时，返程将沿相同路线反向行驶。","pickup":"上车地点","airportOption":"Antalya机场 (AYT)","hotelOption":"酒店","privateAddressOption":"私人地址","destination":"目的地","selectDestination":"选择目的地","vehicle":"车辆","guests":"乘客","arrivalDate":"抵达日期","arrivalFlightTime":"航班抵达时间","chooseTime":"选择时间","arrivalFlightNumber":"抵达航班号","returnDate":"返程日期","returnPickupTime":"返程接车时间","returnFlightNumber":"返程航班号","pickupAddress":"完整上车地址","dropoffAddress":"完整目的地地址","luggageLabel":"大件行李","hotelNameLabel":"酒店名称","childSeatLabel":"儿童座椅","childSeatNone":"无儿童座椅","oneChildSeat":"1个儿童座椅","twoChildSeats":"2个儿童座椅","threeChildSeats":"3个儿童座椅","fourChildSeats":"4个儿童座椅","fullName":"全名","phoneLabel":"电话 / WhatsApp","emailLabel":"电子邮箱","paymentMethod":"选择付款方式","cashPayment":"在车内付款","recommended":"推荐","cashPaymentDescription":"无需在线预付。您在行程开始时以现金向司机支付固定总额。","quoteIncludes":"含Meet & Greet、航班追踪、停车、90分钟等候时间及矿泉水。","perVehicleNote":"按每车计算 — 而非按人计算 · 最多6位乘客","confirmCashBooking":"确认预订 — 在车内付款","flightTracking":"实时航班追踪","fixedPrice":"保证固定价格","meetGreet":"专人接机","speakingDrivers":"会讲德语和英语","fromAirport":"从Antalya机场出发","welcomeEyebrow":"至高标准的欢迎","welcomeTitle":"尊贵出行。<br />轻松抵达。","welcomeBody":"从您落地的那一刻起，每一个细节都已为您考虑周全。我们的机场团队会迎接您，您的司机会驶至上车点，您的行李将被装入一辆精心准备的私人车辆。","ourStandards":"我们的服务标准","concierge":"礼宾服务","guestsWelcomed":"已接待客人","guestRating":"平均评分","privateTransfers":"私人接送","fleetEyebrow":"我们的车队","fleetTitle":"您的私人空间，<br />细节尽善尽美。","fleetIntro":"舒适出行，宽敞空间可容纳家人、高尔夫装备和行李。","signatureFleet":"标志性车队","fleetVclassClass":"商务 · 头等","fleetVclassDescription":"为大型团体提供宽敞的VIP出行，充裕空间可容纳乘客和行李。","passengers":"乘客","suitcases":"行李箱","television":"车内电视","coldDrinks":"冷饮","snacks":"小吃","childSeats":"可按需提供儿童座椅","wifi":"免费WLAN","nameSignGreeting":"在J / 777柜台迎接","reserveVehicle":"预订车辆","insideVclass":"Sprinter内饰","interiorTitle":"机场与酒店之间的<br />私人休息室。","serviceEyebrow":"Antalya VIP标准","serviceTitle":"不止是一次接送。<br />更是一场专属欢迎。","serviceIntro":"酒店级的悉心关照、经验丰富的本地司机，以及从机场到度假村的全程安全保障。","trackingTitle":"航班追踪","trackingBody":"我们实时追踪您的航班，并自动免费调整接车时间。","chauffeurTitle":"专业司机","chauffeurBody":"始终仪表整洁、言行谨慎，因熟悉本地路况和最高服务水准而甄选。","greetTitle":"Meet & Greet","greetBody":"国际航班抵达时，我们的机场团队会在J / 777柜台迎接您，通知您的司机前往上车点，并协助搬运行李。","supportTitle":"24/7礼宾服务","supportBody":"在您旅程的出发前、途中和结束后，始终有专属联系人随时为您服务。","priceTitle":"固定价格","priceBody":"确认后的价格即为最终价格。等候时间、停车费和航班延误均已包含在内。","familyTitle":"为家庭而设","familyBody":"合适的儿童座椅、宽敞的车内空间，以及耐心的协助，让您轻松抵达。","routesEyebrow":"我们最受欢迎的行程","routesTitle":"从Antalya机场<br />前往土耳其里维埃拉。","routesIntro":"所有价格均按每车计算，而非按人计算，含90分钟等候时间。","golfFavourite":"高尔夫首选","reviewsEyebrow":"客人评价","reviewsTitle":"令人久久<br />难忘的服务。","googleReviews":"基于387条经验证的Google评价","trustedBy":"深受Antalya顶级度假村客人的信赖预订","faqEyebrow":"常见问题","faqTitle":"在您出行之前。","faqIntro":"关于您在Antalya的私人机场接送，您需要了解的一切。","askQuestion":"提出问题","faqCatArrival":"抵达与接送","faqOneQ":"航班延误怎么办？","faqOneA":"您无需做任何事情。我们会实时追踪您的航班，并自动调整您的接车时间。我们从不收取航空公司延误的费用——无论您何时落地，您的司机都会在场，落地后的前90分钟始终包含在内。","faqTwoQ":"我乘坐国际航班抵达。接机流程是怎样的？","faqTwoA":"在通过护照检查和领取行李后，您跟随其他乘客前往Meet & Greet区域，来到我们的J / 777柜台。只需向我们的工作人员说出您的名字即可——这就足够了。我们的团队会立即通知您的司机；他会驶入机场并在上车点等候，而我们的工作人员会陪同您前往车辆。整个流程约需7–8分钟。","faqSixQ":"我乘坐国内航班抵达。在哪里能找到我的司机？","faqSixA":"Meet & Greet区域仅供国际航班抵达的旅客使用。因此我们对国内旅客采取不同的方式：我们会在接送前将您司机的电话号码发送给您。落地后简短告知他一声——他会在到达大厅接您。","faqSevenQ":"如果J / 777柜台没有人怎么办？","faqSevenA":"我们的柜台始终有两名工作人员值守，他们唯一的任务就是陪同抵达的客人前往车辆。如果柜台短暂无人，说明有同事正在陪同您前面的客人——每次陪同约需7–8分钟。请稍等约10分钟。如果届时仍无人返回，请通过WhatsApp给我们留言：我们会立即通知您的司机，让他在最近的地点停车，并直接引导您前往车辆，无需再等候。","faqEightQ":"如果我走出机场需要超过90分钟，会怎样？","faqEightA":"落地后的前90分钟免费包含在内——远超护照检查、取行李和海关所需的时间——并且该时间窗口会在航班延误时自动顺延。只有当您因与航班无关的原因在航站楼停留更久时，才会按每多一小时5 €收取停车费。实际上这几乎从未发生：我们几乎所有的客人早在此之前就已上路。","faqCatJourney":"返程与行程","faqTenQ":"返程接送时我如何保持联系？","faqTenA":"一旦您通过WhatsApp与我们的团队确认了返程的日期和时间，我们会在接送前几小时为您安排车辆，并通过WhatsApp向您发送车辆照片——如有需要也会提供您司机的电话号码。当您的司机抵达酒店时，他会通知前台，前台会在车辆就绪后通知您的房间。我们的司机从不直接致电客人：所有沟通均通过我们的中央WhatsApp服务进行，因此您始终清楚知道自己在与谁交谈。","faqFourteenQ":"如果返程接送时我迟到了，会怎样？","faqFourteenA":"您的司机会在约定时间抵达您的酒店，并免费等候15分钟。如果预计会有延误，只需通过WhatsApp发一条消息：我们会核对您的航班时间、通知您的司机，并与您协调安排。我们的目标不是催促您，而是让您从容地赶上航班。","faqFifteenQ":"行程途中可以中途停车吗？","faqFifteenA":"当然可以。如果您想在超市或药店停留，或短暂停下拍张照片，只需在预订时或通过WhatsApp告知我们——我们会相应地规划路线。如果某处停靠明显偏离您的路线，我们会在出发前告知您是否会产生额外费用；绝不会事后给您意外。","faqCatPayment":"付款与价格","faqNineQ":"我如何付款？","faqNineA":"您在行程开始时以现金向司机付款——不支持刷卡。价格以欧元（EUR）标定：固定金额与您预订时看到的完全一致——按每车计算，含所有机场和停车费用，之后不会有任何附加费。您更希望以美元或土耳其里拉付款吗？请事先通过WhatsApp联系我们获取单独报价，因为汇率有所不同。您的司机会迎接您、装载您的行李并安装您所需的儿童座椅；付款后您的行程即开始。","faqTwelveQ":"我可以用哪种货币付款？","faqTwelveA":"我们的价格以欧元（EUR）标定并以现金支付；不接受刷卡。如果您希望以美元或土耳其里拉付款，金额取决于当日汇率——因此请在接送前通过WhatsApp联系我们。我们会为您提供明确的报价并通知您的司机，这样车内就无需任何议价。","faqElevenQ":"我可以取消或更改我的预订吗？","faqElevenA":"可以，并且始终免费。由于我们不收取预付款，因此无需退款，也无需等待您的款项——如果您的计划有变，只需通过WhatsApp发一条消息即可。更改时间、航班号或目的地地址同样办理，无需加价。","faqFiveQ":"显示的价格是最终价格吗？","faqFiveA":"是的。您预订时的价格就是您以现金交给司机的金额——按每车计算，含所有机场费用、停车费以及前90分钟等候时间。没有任何隐藏费用。","faqCatVehicle":"车辆与行李","faqThreeQ":"是否提供儿童座椅？","faqThreeA":"是的。婴儿提篮、儿童座椅和增高垫在预订时可免费提供。","faqThirteenQ":"我可以携带多少行李？","faqThirteenA":"通常每人一个大行李箱和一件手提行李。如果您携带更多——额外的行李箱、高尔夫球包、婴儿车、滑雪板或自行车——只需在预订时告知我们；我们会免费提供承载能力合适的车辆。关键只在于我们事先知晓。一辆Mercedes Vito最多可容纳6人，一辆Sprinter最多可容纳12人。","faqFourQ":"可以运送高尔夫球包和大件行李吗？","faqFourA":"可以。Sprinter和Vito非常适合高尔夫团体。请告知我们您的行李情况，我们会安排合适的车辆。","contactEyebrow":"您的旅程从这里开始","contactTitle":"以非凡的方式<br />抵达Antalya。","contactBody":"在不到两分钟内在线预订，或直接与我们的24/7礼宾团队沟通。","whatsappUs":"WhatsApp","replyMinutes":"通常在几分钟内回复","callUs":"24/7致电","emailUs":"礼宾邮箱","replyHour":"一小时内回复","footerTagline":"遍及整个土耳其里维埃拉的私人司机服务。","explore":"探索","information":"信息","licensed":"持牌私人接送服务提供商 · 符合TÜRSAB规定","bookingConfirmed":"预订已确认","referenceLabel":"参考编号","weWillContact":"您的预订请求已发送。我们将在30分钟内与您联系。","chatWithUs":"与我们聊天","pickupAddressPlaceholder":"酒店名称、街道、门牌号及所在区域","dropoffAddressPlaceholder":"酒店名称、街道、门牌号及所在区域","hotelNamePlaceholder":"酒店或住宿名称","stepRoute":"路线","stepDetails":"详情","stepContact":"联系方式","reserveForPrice":"预订","continue":"继续","back":"返回","perVehicleNoteVito":"按每车计算 — 而非按人计算 · 最多6位乘客","perVehicleNoteSprinter":"按每车计算 — 而非按人计算 · 最多12位乘客","perVehicle":"固定 · 每车","requestQuote":"请求价格报价","cashConfirmation":"您的预订已确认。您在行程开始时以现金向司机支付固定总额。","bookingError":"您的预订未能完成。请重试。","formIncomplete":"请填写高亮标示的字段。","requiredField":"此字段为必填项。","destinationRequired":"请选择目的地。","dateInvalid":"请选择今天或未来的日期。","emailInvalid":"请输入有效的电子邮箱地址。","nameInvalid":"请输入有效的全名。","phoneInvalid":"请输入包含国家代码的有效号码（例如 +49）。","flightInvalid":"请输入有效的航班号。","pickupAddressRequired":"上车地址长度须在6至160个字符之间。","dropoffAddressRequired":"目的地地址长度须在6至160个字符之间。","addressesMustDiffer":"上车地址与目的地地址必须不同。","customDestinationPrice":"价格将在我们核实目的地地址后确认。","hotelNameRequired":"请输入酒店名称。","roundTripPriceNote":"往返 · 2次行程","returnDateRequired":"请选择返程日期。","returnDateInvalid":"请选择不早于去程的返程日期。","returnTimeRequired":"请选择返程接车时间。","dailyChauffeur":"按日租车 + 司机","days":"天","dailyChauffeurHint":"按日租用私人车辆和司机，无公里数或时长限制。燃油费另行支付。","serviceStartDate":"首个服务日","serviceEndDate":"最后服务日","dailyPickupTime":"服务开始时间","dailyPickupTimeRequired":"请选择每日服务开始时间。","serviceEndDateRequired":"请选择最后服务日。","servicePeriodInvalid":"请选择1至30天之间的时段。","arrivalFlightTimeOptional":"航班抵达时间（可选）","arrivalFlightNumberOptional":"抵达航班号（可选）","servicePrice":"服务价格","fuelExcludedShort":"不含燃油","fuelExcludedDetail":"燃油费不包含在内，按实际使用情况另行支付。","departureFlightDate":"出发航班日期（可选）","departureFlightTime":"出发航班时间","departureFlightNumber":"出发航班号","departureFlightDateRequired":"请选择出发航班日期。","departureFlightDateInvalid":"出发航班日期不能早于服务开始日期。","dailyQuoteIncludes":"含所选车辆和司机，无公里数或时长限制。不含燃油费。","reviewAndConfirm":"查看并确认","fuelTermsTitle":"关于燃油的重要信息","fuelTermsBody":"每日€150的服务费含车辆和司机。不含燃油费。您将按实际使用情况另行支付实际燃油费用。","fuelTermsCheckbox":"我理解燃油费不包含在内，将按实际使用情况另行支付。","cancel":"取消","close":"关闭","understandAndConfirm":"我已理解并确认","dailyCashConfirmation":"您的按日租车服务已确认。服务价格不含燃油费，燃油费按实际使用情况另行支付。","campaignBadge":"在线特惠","campaignDiscount":"特惠价","campaignScope":"适用于所有接送价格","campaignApplied":"已应用在线特惠价","onlineDiscountShort":"在线特惠价","discountPricesShown":"已显示在线特惠价","quoteTitle":"我们可以送您去哪里？","date":"日期","airportReturnPrice":"价格将在核实酒店或上车地址后确认。","oneGuest":"1位乘客","twoGuests":"2位乘客","threeGuests":"3位乘客","fourGuests":"4位乘客","fiveGuests":"5位乘客","sixGuests":"6位乘客","sevenGuests":"7位乘客","viewQuote":"查看价格","fleetVitoClass":"VIP · 豪华旅行","fleetVitoDescription":"为家庭和小型团体提供舒适的私人车厢。","capacitySwitchedSprinter":"乘客与行李数量超出Vito的承载能力 — 已改为Mercedes Sprinter。","capacityNoVehicle":"如此多的乘客与行李超出了我们车辆的承载能力。请通过WhatsApp联系我们。","leatherSeats":"高级真皮座椅","water":"冰镇矿泉水","from":"起价","reviewOne":"“尽管航班延误了90分钟，我们的司机仍在等候。车辆一尘不染，凉爽宜人，并已配备好两个儿童座椅。这正是我们一家所需要的迎接。”","reviewTwo":"“从第一次WhatsApp联系到抵达Belek，全程绝对一流。准时、谨慎且非常专业。我们的高尔夫球包也放得从容宽裕。”","reviewThree":"“这感觉就像酒店的私人司机服务，而不是机场出租车。沟通清晰、车辆无可挑剔、司机真诚有礼。”","faqReminder":"请在出行前阅读我们网站上的FAQ部分。","viewFaq":"查看FAQ","quoteReady":"您的私人接送","journeyTime":"行程时间","totalFixed":"总价","confirmWhatsapp":"通过WhatsApp确认","bookNowCta":"立即预订","backToQuote":"返回","yourDetails":"您的信息","flightNumber":"航班号","flightArrivalTime":"抵达时间","notesLabel":"特殊需求","confirmBooking":"确认预订","paymentError":"付款失败。请重试。"},"da":{"navFleet":"Køretøjer","navService":"Service","navRoutes":"Ruter","navReviews":"Anmeldelser","navContact":"Kontakt","bookNow":"Book nu","alwaysAvailable":"Tilgængelig 24 timer i døgnet, hver dag","heroEyebrow":"Privat chaufførservice · Antalya","heroTitle":"Premium lufthavnstransfer<br />i Antalya","heroSubtitle":"Private transfers med chauffør fra Antalya Lufthavn til Belek, Side, Kemer og Alanya.","bookTransfer":"Book transfer","instantQuote":"Få pris med det samme","googleRated":"Google-bedømmelse","trustedGuests":"Booket af over 2.500 gæster","discover":"Opdag","tbLicensed":"TÜRSAB-certificeret","tbFlightTracking":"Flysporing","tbFixedPrice":"Fastprisgaranti","tb247Concierge":"24/7 concierge","tbChildSeats":"Barnesæder inkluderet","privateJourney":"Din private rejse","meetGreetNote":"Lufthavns-Meet &amp; Greet · Mødested J / 777","tripType":"Rejsetype","oneWay":"Enkeltrejse","roundTrip":"Tur-retur","roundTripHint":"Ved tur-retur følger returrejsen samme rute i modsat retning.","pickup":"Afhentning","airportOption":"Antalya Lufthavn (AYT)","hotelOption":"Hotel","privateAddressOption":"Privatadresse","destination":"Destination","selectDestination":"Vælg destination","vehicle":"Køretøj","guests":"Gæster","arrivalDate":"Ankomstdato","arrivalFlightTime":"Flyets ankomsttid","chooseTime":"Vælg tidspunkt","arrivalFlightNumber":"Ankomstflynummer","returnDate":"Returdato","returnPickupTime":"Afhentningstidspunkt for returrejsen","returnFlightNumber":"Returflynummer","pickupAddress":"Fuld afhentningsadresse","dropoffAddress":"Fuld destinationsadresse","luggageLabel":"Stor bagage","hotelNameLabel":"Hotelnavn","childSeatLabel":"Barnesæder","childSeatNone":"Intet barnesæde","oneChildSeat":"1 barnesæde","twoChildSeats":"2 barnesæder","threeChildSeats":"3 barnesæder","fourChildSeats":"4 barnesæder","fullName":"Fulde navn","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-mail","paymentMethod":"Vælg betalingsmetode","cashPayment":"Betal i køretøjet","recommended":"Anbefalet","cashPaymentDescription":"Ingen online-forudbetaling. Du betaler den faste totalpris kontant til din chauffør ved rejsens begyndelse.","quoteIncludes":"Inklusive Meet & Greet, flysporing, parkering, 90 minutters ventetid og mineralvand.","perVehicleNote":"Pr. køretøj — ikke pr. person · Op til 6 passagerer","confirmCashBooking":"Bekræft booking — betal i køretøjet","flightTracking":"Flysporing i realtid","fixedPrice":"Garanteret fast pris","meetGreet":"Personlig modtagelse","speakingDrivers":"Taler tysk og engelsk","fromAirport":"Fra Antalya Lufthavn","welcomeEyebrow":"Velkommen på højeste niveau","welcomeTitle":"Rejs med stil.<br />Ankom afslappet.","welcomeBody":"Fra det øjeblik du lander, er der tænkt på hver eneste detalje. Vores lufthavnsteam tager imod dig, din chauffør kører frem til afhentningsstedet, og din bagage lastes i et omhyggeligt forberedt privat køretøj.","ourStandards":"Vores servicestandarder","concierge":"Concierge-service","guestsWelcomed":"Modtagne gæster","guestRating":"Gennemsnitlig bedømmelse","privateTransfers":"Private transfers","fleetEyebrow":"Vores flåde","fleetTitle":"Dit private rum,<br />fuldendt ned til mindste detalje.","fleetIntro":"Rejs komfortabelt med god plads til familien, golfudstyr og kufferter.","signatureFleet":"Signature-flåde","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Rummelig VIP-transport til større grupper med masser af plads til passagerer og bagage.","passengers":"Passagerer","suitcases":"Kufferter","television":"Tv i køretøjet","coldDrinks":"Kolde drikke","snacks":"Snacks","childSeats":"Barnesæder efter ønske","wifi":"Gratis WiFi","nameSignGreeting":"Modtagelse ved skranke J / 777","reserveVehicle":"Reserver køretøj","insideVclass":"Sprinter-interiør","interiorTitle":"En privat lounge mellem<br />lufthavn og hotel.","serviceEyebrow":"Antalya VIP-standarden","serviceTitle":"Mere end en transfer.<br />En særlig modtagelse.","serviceIntro":"Opmærksomhed på hotelniveau, erfarne lokale chauffører og fuldkommen tryghed fra lufthavnen til resortet.","trackingTitle":"Flysporing","trackingBody":"Vi sporer dit fly i realtid og tilpasser afhentningen automatisk og gratis.","chauffeurTitle":"Professionelle chauffører","chauffeurBody":"Altid velplejede, diskrete og udvalgt for lokalkendskab og højeste servicestandard.","greetTitle":"Meet & Greet","greetBody":"Ved internationale ankomster tager vores lufthavnsteam imod dig ved skranke J / 777, tilkalder din chauffør til afhentningsstedet og hjælper med bagagen.","supportTitle":"24/7 concierge","supportBody":"Før, under og efter din rejse er der altid en personlig kontaktperson til rådighed.","priceTitle":"Faste priser","priceBody":"Den bekræftede pris er den endelige pris. Ventetid, parkering og flyforsinkelser er inkluderet.","familyTitle":"Til familier","familyBody":"Passende barnesæder, rummelige interiører og tålmodig hjælp til en afslappet ankomst.","routesEyebrow":"Vores mest populære rejser","routesTitle":"Fra Antalya Lufthavn<br />til den tyrkiske riviera.","routesIntro":"Alle priser gælder pr. køretøj, ikke pr. person, inklusive 90 minutters ventetid.","golfFavourite":"Golf-favorit","reviewsEyebrow":"Gæsteanmeldelser","reviewsTitle":"Service, der huskes<br />længe efter.","googleReviews":"Baseret på 387 verificerede Google-anmeldelser","trustedBy":"Booket af gæster på førende resorts i Antalya","faqEyebrow":"Ofte stillede spørgsmål","faqTitle":"Før din rejse.","faqIntro":"Alt, hvad du har brug for at vide om din private lufthavnstransfer i Antalya.","askQuestion":"Stil et spørgsmål","faqCatArrival":"Ankomst & transfer","faqOneQ":"Hvad sker der ved en flyforsinkelse?","faqOneA":"Du behøver ikke foretage dig noget. Vi sporer dit fly i realtid og tilpasser dit afhentningstidspunkt automatisk. Vi opkræver aldrig for flyselskabets forsinkelser – din chauffør er der, uanset hvornår du lander, og de første 90 minutter efter landing er altid inkluderet.","faqTwoQ":"Jeg ankommer med et internationalt fly. Hvordan foregår afhentningen?","faqTwoA":"Efter paskontrol og bagageudlevering følger du de øvrige passagerer ind i Meet & Greet-området og går hen til vores skranke J / 777. Fortæl blot vores medarbejdere dit navn – det er nok. Vores team informerer straks din chauffør; han kører ind i lufthavnen og står klar ved afhentningsstedet, mens vores medarbejder følger dig til køretøjet. Hele forløbet tager cirka 7-8 minutter.","faqSixQ":"Jeg ankommer med et indenrigsfly. Hvor finder jeg min chauffør?","faqSixA":"Meet & Greet-området er udelukkende forbeholdt internationale ankomster. Indenrigsgæster tager vi os derfor af på en anden måde: Vi sender dig din chaufførs telefonnummer før transferen. Giv ham en kort besked efter landing – han henter dig i ankomsthallen.","faqSevenQ":"Hvad gør jeg, hvis der ikke er nogen ved skranke J / 777?","faqSevenA":"Ved vores skranke er der løbende to medarbejdere på arbejde, hvis eneste opgave er at følge ankommende gæster til deres køretøj. Er skranken kortvarigt ubemandet, er en kollega netop ved at følge gæsten før dig – hver ledsagelse tager cirka 7-8 minutter. Vent venligst omkring 10 minutter. Er der ingen tilbage til den tid, så skriv til os via WhatsApp: Vi informerer straks din chauffør, lader ham holde ved det nærmeste punkt og fører dig direkte til din bil uden yderligere ventetid.","faqEightQ":"Hvad gælder, hvis jeg bruger mere end 90 minutter på at komme ud af lufthavnen?","faqEightA":"De første 90 minutter efter landing er inkluderet gratis – betydeligt mere, end paskontrol, bagage og told kræver – og dette tidsvindue forskydes automatisk ved flyforsinkelser. Kun hvis du bliver længere i terminalen af grunde, der ikke hænger sammen med dit fly, kommer der et parkeringsbidrag på 5 € pr. yderligere time til. I praksis sker det stort set aldrig: Næsten alle vores gæster er for længst på vej inden da.","faqCatJourney":"Returrejse & kørsel","faqTenQ":"Hvordan holder jeg kontakten ved returtransferen?","faqTenA":"Så snart du har bekræftet dato og tidspunkt for din returrejse med vores team via WhatsApp, tildeler vi dig dit køretøj nogle timer før transferen og sender dig billeder af det via WhatsApp – på ønske også din chaufførs telefonnummer. Når din chauffør når hotellet, informerer han receptionen, som giver dit værelse besked, så snart bilen står klar. Vores chauffører ringer aldrig direkte til gæster: Al kommunikation foregår via vores centrale WhatsApp-service, så du altid ved præcis, hvem du taler med.","faqFourteenQ":"Hvad sker der, hvis jeg bliver forsinket ved returtransferen?","faqFourteenA":"Din chauffør er ved dit hotel til det aftalte tidspunkt og venter 15 minutter gratis. Tegner der sig en forsinkelse, er en besked via WhatsApp nok: Vi tjekker din flytid, informerer din chauffør og afstemmer forløbet med dig. Vores mål er ikke at stresse dig, men at bringe dig afslappet til dit fly.","faqFifteenQ":"Er mellemstop mulige undervejs?","faqFifteenA":"Naturligvis. Vil du holde ved et supermarked eller et apotek eller stoppe kort for et foto, så sig det blot ved bookingen eller via WhatsApp — vi planlægger ruten derefter. Fører et stop dig betydeligt væk fra din rute, siger vi det til dig før afgang, om der kommer noget til; du bliver ikke overrasket bagefter.","faqCatPayment":"Betaling & pris","faqNineQ":"Hvordan betaler jeg?","faqNineA":"Du betaler din chauffør kontant ved rejsens begyndelse – kortbetaling er ikke mulig. Priserne er fastsat i euro (EUR): Det faste beløb svarer nøjagtigt til det, du så ved bookingen – pr. køretøj, inklusive alle lufthavns- og parkeringsgebyrer, uden senere tillæg. Vil du hellere betale i amerikanske dollars eller tyrkiske lira? Skriv til os på forhånd via WhatsApp for en separat pris, da vekselkursen afviger. Din chauffør byder dig velkommen, laster din bagage og monterer de ønskede barnesæder; efter betalingen begynder din rejse.","faqTwelveQ":"I hvilken valuta kan jeg betale?","faqTwelveA":"Vores priser er fastsat i euro (EUR) og betales kontant; kort accepteres ikke. Vil du betale i amerikanske dollars eller tyrkiske lira, afhænger beløbet af dagskursen — skriv derfor til os via WhatsApp før din transfer. Vi giver dig en klar pris og informerer din chauffør, så der ikke forhandles i køretøjet.","faqElevenQ":"Kan jeg annullere eller ændre min booking?","faqElevenA":"Ja, og altid gratis. Da vi ikke tager forudbetaling, er der intet at refundere og ingen ventetid på dine penge — ændrer dine planer sig, er en besked via WhatsApp nok. Ændringer af tidspunkt, flynummer eller destinationsadresse ordner vi ligeledes uden tillæg.","faqFiveQ":"Er den viste pris endelig?","faqFiveA":"Ja. Prisen fra din booking er det beløb, du giver din chauffør kontant – pr. køretøj, inklusive alle lufthavnsgebyrer, parkeringsomkostninger og de første 90 minutters ventetid. Der er ingen skjulte omkostninger.","faqCatVehicle":"Køretøj & bagage","faqThreeQ":"Er der barnesæder til rådighed?","faqThreeA":"Ja. Babyautostole, barnesæder og selepuder er gratis til rådighed ved forudbestilling.","faqThirteenQ":"Hvor meget bagage må jeg tage med?","faqThirteenA":"Som regel én stor kuffert og ét stykke håndbagage pr. person. Har du mere med — en ekstra kuffert, en golfbag, en klapvogn, ski eller en cykel — så sig det blot ved bookingen; vi stiller et køretøj med passende kapacitet til rådighed uden tillæg. Det afgørende er kun, at vi ved det på forhånd. En Mercedes Vito rummer op til 6 personer, en Sprinter op til 12.","faqFourQ":"Kan golfbags og stor bagage transporteres?","faqFourA":"Ja. Sprinter og Vito er ideelle til golfgrupper. Fortæl os om din bagage, så planlægger vi det passende køretøj.","contactEyebrow":"Din rejse begynder her","contactTitle":"Ankom usædvanligt godt<br />til Antalya.","contactBody":"Book online på under to minutter, eller tal direkte med vores 24/7 concierge-team.","whatsappUs":"WhatsApp","replyMinutes":"Svar oftest inden for få minutter","callUs":"Ring 24/7","emailUs":"Concierge-e-mail","replyHour":"Svar inden for en time","footerTagline":"Private chaufførservices på hele den tyrkiske riviera.","explore":"Opdag","information":"Information","licensed":"Licenseret privat transferudbyder · TÜRSAB-godkendt","bookingConfirmed":"Booking bekræftet","referenceLabel":"Reference","weWillContact":"Din bookingforespørgsel er sendt. Vi vender tilbage inden for 30 minutter.","chatWithUs":"Chat med os","pickupAddressPlaceholder":"Hotelnavn, gade, husnummer og bydel","dropoffAddressPlaceholder":"Hotelnavn, gade, husnummer og bydel","hotelNamePlaceholder":"Navn på hotel eller indkvartering","stepRoute":"Rute","stepDetails":"Detaljer","stepContact":"Kontakt","reserveForPrice":"Reserver","continue":"Fortsæt","back":"Tilbage","perVehicleNoteVito":"Pr. køretøj — ikke pr. person · Op til 6 passagerer","perVehicleNoteSprinter":"Pr. køretøj — ikke pr. person · Op til 12 passagerer","perVehicle":"fast · pr. køretøj","requestQuote":"Anmod om et pristilbud","cashConfirmation":"Din booking er bekræftet. Du betaler den faste totalpris kontant til din chauffør ved rejsens begyndelse.","bookingError":"Din booking kunne ikke gennemføres. Prøv venligst igen.","formIncomplete":"Udfyld venligst de fremhævede felter.","requiredField":"Dette felt er påkrævet.","destinationRequired":"Vælg venligst en destination.","dateInvalid":"Vælg venligst i dag eller en fremtidig dato.","emailInvalid":"Indtast venligst en gyldig e-mailadresse.","nameInvalid":"Indtast venligst et gyldigt fuldt navn.","phoneInvalid":"Indtast venligst et gyldigt nummer inklusive landekoden (for eksempel +45).","flightInvalid":"Indtast venligst et gyldigt flynummer.","pickupAddressRequired":"Afhentningsadressen skal være mellem 6 og 160 tegn.","dropoffAddressRequired":"Destinationsadressen skal være mellem 6 og 160 tegn.","addressesMustDiffer":"Afhentnings- og destinationsadresse skal være forskellige.","customDestinationPrice":"Prisen bekræftes, efter vi har kontrolleret destinationsadressen.","hotelNameRequired":"Indtast venligst hotellets navn.","roundTripPriceNote":"tur-retur · 2 rejser","returnDateRequired":"Vælg venligst en returdato.","returnDateInvalid":"Vælg venligst en returdato på eller efter udrejsen.","returnTimeRequired":"Vælg venligst afhentningstidspunktet for returrejsen.","dailyChauffeur":"Køretøj + chauffør pr. dag","days":"dage","dailyChauffeurHint":"Lej et privat køretøj og en chauffør pr. dag uden kilometer- eller timebegrænsning. Brændstof betales separat.","serviceStartDate":"Første servicedag","serviceEndDate":"Sidste servicedag","dailyPickupTime":"Starttidspunkt for service","dailyPickupTimeRequired":"Vælg venligst det daglige starttidspunkt for service.","serviceEndDateRequired":"Vælg venligst den sidste servicedag.","servicePeriodInvalid":"Vælg venligst en periode mellem 1 og 30 dage.","arrivalFlightTimeOptional":"Flyets ankomsttid (valgfrit)","arrivalFlightNumberOptional":"Ankomstflynummer (valgfrit)","servicePrice":"Servicepris","fuelExcludedShort":"brændstof ikke inkluderet","fuelExcludedDetail":"Brændstof er ikke inkluderet og betales separat efter forbrug.","departureFlightDate":"Afgangsflyets dato (valgfrit)","departureFlightTime":"Afgangsflyets tidspunkt","departureFlightNumber":"Afgangsflynummer","departureFlightDateRequired":"Vælg venligst afgangsflyets dato.","departureFlightDateInvalid":"Afgangsflyets dato kan ikke være før servicen begynder.","dailyQuoteIncludes":"Inkluderer det valgte køretøj og chaufføren uden kilometer- eller timebegrænsning. Brændstof er ikke inkluderet.","reviewAndConfirm":"Gennemse og bekræft","fuelTermsTitle":"Vigtig information om brændstof","fuelTermsBody":"Det daglige servicegebyr på 150 € inkluderer køretøjet og chaufføren. Brændstof er ikke inkluderet. Du betaler den faktiske brændstofudgift separat efter forbrug.","fuelTermsCheckbox":"Jeg forstår, at brændstof ikke er inkluderet og betales separat efter forbrug.","cancel":"Annuller","close":"Luk","understandAndConfirm":"Jeg forstår og bekræfter","dailyCashConfirmation":"Din daglige chaufførleje er bekræftet. Serviceprisen inkluderer ikke brændstof, som betales separat efter forbrug.","campaignBadge":"Online-tilbud","campaignDiscount":"Særpris","campaignScope":"på alle transferpriser","campaignApplied":"Online-særpris anvendt","onlineDiscountShort":"Online-særpris","discountPricesShown":"Online-særpriser vises","quoteTitle":"Hvor må vi køre dig hen?","date":"Dato","airportReturnPrice":"Prisen bekræftes efter kontrol af hotellet eller afhentningsadressen.","oneGuest":"1 gæst","twoGuests":"2 gæster","threeGuests":"3 gæster","fourGuests":"4 gæster","fiveGuests":"5 gæster","sixGuests":"6 gæster","sevenGuests":"7 gæster","viewQuote":"Vis pris","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"En komfortabel privat kabine til familier og små grupper.","capacitySwitchedSprinter":"Passagerer og bagage overstiger Vito — skiftet til Mercedes Sprinter.","capacityNoVehicle":"Så mange passagerer og så meget bagage overstiger vores køretøjer. Kontakt os venligst via WhatsApp.","leatherSeats":"Premium lædersæder","water":"Afkølet mineralvand","from":"Fra","reviewOne":"„Vores chauffør ventede trods 90 minutters flyforsinkelse. Køretøjet var pletfrit, behageligt køligt og allerede udstyret med begge barnesæder. Præcis den modtagelse, vores familie havde brug for.“","reviewTwo":"„Fra den første WhatsApp-kontakt til ankomsten i Belek var det helt igennem førsteklasses. Punktlig, diskret og meget professionel. Selv vores golftasker havde nem plads.“","reviewThree":"„Det føltes som et hotels chaufførservice, ikke som en lufthavnstaxi. Klar kommunikation, et pletfrit køretøj og en oprigtigt høflig chauffør.“","faqReminder":"Læs venligst FAQ-afsnittet på vores hjemmeside før din rejse.","viewFaq":"Se FAQ","quoteReady":"Din private transfer","journeyTime":"Køretid","totalFixed":"Samlet pris","confirmWhatsapp":"Bekræft via WhatsApp","bookNowCta":"Book nu","backToQuote":"Tilbage","yourDetails":"Dine oplysninger","flightNumber":"Flynummer","flightArrivalTime":"Ankomsttid","notesLabel":"Særlige ønsker","confirmBooking":"Bekræft booking","paymentError":"Betalingen mislykkedes. Prøv venligst igen."},"es":{"navFleet":"Vehículos","navService":"Servicio","navRoutes":"Rutas","navReviews":"Opiniones","navContact":"Contacto","bookNow":"Reservar ahora","alwaysAvailable":"Disponibles las 24 horas, todos los días","heroEyebrow":"Servicio privado de chófer · Antalya","heroTitle":"Traslados premium al aeropuerto<br />en Antalya","heroSubtitle":"Traslados privados con chófer desde el aeropuerto de Antalya a Belek, Side, Kemer y Alanya.","bookTransfer":"Reservar traslado","instantQuote":"Obtener precio al instante","googleRated":"Valoración de Google","trustedGuests":"Reservado por más de 2.500 huéspedes","discover":"Descubrir","tbLicensed":"Certificado por TÜRSAB","tbFlightTracking":"Seguimiento de vuelos","tbFixedPrice":"Garantía de precio fijo","tb247Concierge":"Concierge 24/7","tbChildSeats":"Sillas infantiles incluidas","privateJourney":"Su viaje privado","meetGreetNote":"Meet &amp; Greet en el aeropuerto · Punto de encuentro J / 777","tripType":"Tipo de viaje","oneWay":"Solo ida","roundTrip":"Ida y vuelta","roundTripHint":"En un viaje de ida y vuelta, el regreso se realiza por la misma ruta en sentido inverso.","pickup":"Recogida","airportOption":"Aeropuerto de Antalya (AYT)","hotelOption":"Hotel","privateAddressOption":"Dirección particular","destination":"Destino","selectDestination":"Seleccionar destino","vehicle":"Vehículo","guests":"Pasajeros","arrivalDate":"Fecha de llegada","arrivalFlightTime":"Hora de llegada del vuelo","chooseTime":"Elija la hora","arrivalFlightNumber":"Número de vuelo de llegada","returnDate":"Fecha de regreso","returnPickupTime":"Hora de recogida del regreso","returnFlightNumber":"Número de vuelo de regreso","pickupAddress":"Dirección completa de recogida","dropoffAddress":"Dirección completa de destino","luggageLabel":"Equipaje grande","hotelNameLabel":"Nombre del hotel","childSeatLabel":"Sillas infantiles","childSeatNone":"Sin silla infantil","oneChildSeat":"1 silla infantil","twoChildSeats":"2 sillas infantiles","threeChildSeats":"3 sillas infantiles","fourChildSeats":"4 sillas infantiles","fullName":"Nombre completo","phoneLabel":"Teléfono / WhatsApp","emailLabel":"Correo electrónico","paymentMethod":"Elija el método de pago","cashPayment":"Pagar en el vehículo","recommended":"Recomendado","cashPaymentDescription":"Sin pago anticipado online. Paga el total fijo a su chófer en efectivo al inicio del trayecto.","quoteIncludes":"Incluye Meet & Greet, seguimiento del vuelo, aparcamiento, 90 minutos de tiempo de espera y agua mineral.","perVehicleNote":"Por vehículo — no por persona · Hasta 6 pasajeros","confirmCashBooking":"Confirmar reserva — pagar en el vehículo","flightTracking":"Seguimiento del vuelo en tiempo real","fixedPrice":"Precio fijo garantizado","meetGreet":"Recepción personalizada","speakingDrivers":"Hablan alemán e inglés","fromAirport":"Desde el aeropuerto de Antalya","welcomeEyebrow":"Bienvenido al más alto nivel","welcomeTitle":"Viaje con estilo.<br />Llegue relajado.","welcomeBody":"Desde el momento en que aterriza, cada detalle está previsto. Nuestro equipo del aeropuerto le recibe, su chófer se acerca al punto de recogida y su equipaje se carga en un vehículo privado cuidadosamente preparado.","ourStandards":"Nuestros estándares de servicio","concierge":"Servicio de concierge","guestsWelcomed":"Huéspedes recibidos","guestRating":"Valoración media","privateTransfers":"Traslados privados","fleetEyebrow":"Nuestra flota","fleetTitle":"Su espacio privado,<br />perfecto hasta el último detalle.","fleetIntro":"Viaje con comodidad y amplio espacio para la familia, el equipaje de golf y las maletas.","signatureFleet":"Flota Signature","fleetVclassClass":"Business · Primera clase","fleetVclassDescription":"Transporte VIP espacioso para grupos grandes, con amplio espacio para pasajeros y equipaje.","passengers":"Pasajeros","suitcases":"Maletas","television":"Televisor en el vehículo","coldDrinks":"Bebidas frías","snacks":"Aperitivos","childSeats":"Sillas infantiles bajo petición","wifi":"WiFi gratuito","nameSignGreeting":"Recepción en el mostrador J / 777","reserveVehicle":"Reservar vehículo","insideVclass":"Interior del Sprinter","interiorTitle":"Un salón privado entre<br />el aeropuerto y el hotel.","serviceEyebrow":"El estándar VIP de Antalya","serviceTitle":"Más que un traslado.<br />Una recepción especial.","serviceIntro":"Atención de nivel hotelero, chóferes locales experimentados y total seguridad desde el aeropuerto hasta el resort.","trackingTitle":"Seguimiento del vuelo","trackingBody":"Seguimos su vuelo en tiempo real y ajustamos la recogida de forma automática y gratuita.","chauffeurTitle":"Chóferes profesionales","chauffeurBody":"Siempre impecables, discretos y seleccionados por su conocimiento local y su máximo nivel de servicio.","greetTitle":"Meet & Greet","greetBody":"En las llegadas internacionales, nuestro equipo del aeropuerto le recibe en el mostrador J / 777, llama a su chófer al punto de recogida y le ayuda con el equipaje.","supportTitle":"Concierge 24/7","supportBody":"Antes, durante y después de su viaje, siempre tendrá disponible una persona de contacto.","priceTitle":"Precios fijos","priceBody":"El precio confirmado es el precio final. El tiempo de espera, el aparcamiento y los retrasos de vuelo están incluidos.","familyTitle":"Para familias","familyBody":"Sillas infantiles adecuadas, interiores amplios y una ayuda paciente para una llegada relajada.","routesEyebrow":"Nuestros trayectos más populares","routesTitle":"Desde el aeropuerto de Antalya<br />a la Riviera turca.","routesIntro":"Todos los precios son por vehículo, no por persona, e incluyen 90 minutos de tiempo de espera.","golfFavourite":"Favorito del golf","reviewsEyebrow":"Opiniones de huéspedes","reviewsTitle":"Un servicio que perdura<br />en la memoria.","googleReviews":"Basado en 387 opiniones verificadas de Google","trustedBy":"Reservado por huéspedes de los principales resorts de Antalya","faqEyebrow":"Preguntas frecuentes","faqTitle":"Antes de su viaje.","faqIntro":"Todo lo que necesita saber sobre su traslado privado al aeropuerto de Antalya.","askQuestion":"Hacer una pregunta","faqCatArrival":"Llegada y traslado","faqOneQ":"¿Qué ocurre si mi vuelo se retrasa?","faqOneA":"No tiene que hacer nada. Seguimos su vuelo en tiempo real y ajustamos automáticamente su hora de recogida. Nunca cobramos los retrasos de la aerolínea: su chófer estará allí cuando quiera que aterrice, y los primeros 90 minutos tras el aterrizaje siempre están incluidos.","faqTwoQ":"Llego en un vuelo internacional. ¿Cómo es la recogida?","faqTwoA":"Tras el control de pasaportes y la recogida de equipaje, siga al resto de los pasajeros hasta la zona de Meet & Greet y acérquese a nuestro mostrador J / 777. Solo tiene que decir su nombre a nuestro personal; con eso basta. Nuestro equipo avisa de inmediato a su chófer, que entra en el aeropuerto y espera en el punto de recogida mientras nuestro personal le acompaña al vehículo. Todo el proceso dura unos 7-8 minutos.","faqSixQ":"Llego en un vuelo nacional. ¿Dónde encuentro a mi chófer?","faqSixA":"La zona de Meet & Greet está disponible exclusivamente para las llegadas internacionales. Por eso atendemos a los huéspedes de vuelos nacionales de otra manera: le enviamos el número de teléfono de su chófer antes del traslado. Avísele brevemente tras aterrizar; él le recogerá en la sala de llegadas.","faqSevenQ":"¿Qué hago si no hay nadie en el mostrador J / 777?","faqSevenA":"En nuestro mostrador hay siempre dos empleados cuya única tarea es acompañar a los huéspedes que llegan hasta su vehículo. Si el mostrador está momentáneamente vacío, es porque un compañero está acompañando al huésped anterior; cada acompañamiento dura unos 7-8 minutos. Espere unos 10 minutos, por favor. Si para entonces nadie ha regresado, escríbanos por WhatsApp: avisamos de inmediato a su chófer, hacemos que se detenga en el punto más cercano y le llevamos directamente a su coche sin más esperas.","faqEightQ":"¿Qué ocurre si tardo más de 90 minutos en salir del aeropuerto?","faqEightA":"Los primeros 90 minutos tras el aterrizaje están incluidos sin coste — bastante más de lo que requieren el control de pasaportes, el equipaje y la aduana — y este margen de tiempo se ajusta automáticamente en caso de retraso del vuelo. Solo si permanece más tiempo en la terminal por motivos ajenos a su vuelo se añade una contribución al aparcamiento de 5 € por cada hora adicional. En la práctica, esto casi nunca ocurre: prácticamente todos nuestros huéspedes ya están en camino mucho antes.","faqCatJourney":"Regreso y trayecto","faqTenQ":"¿Cómo mantengo el contacto en el traslado de regreso?","faqTenA":"Una vez que haya confirmado la fecha y la hora de su regreso por WhatsApp con nuestro equipo, le asignamos su vehículo unas horas antes del traslado y le enviamos fotos del mismo por WhatsApp; si lo desea, también el número de teléfono de su chófer. Cuando su chófer llega al hotel, avisa a la recepción, que informa a su habitación en cuanto el coche está listo. Nuestros chóferes nunca llaman directamente a los huéspedes: toda la comunicación pasa por nuestra atención central de WhatsApp, de modo que siempre sabe exactamente con quién está hablando.","faqFourteenQ":"¿Qué ocurre si me retraso en el traslado de regreso?","faqFourteenA":"Su chófer estará en su hotel a la hora acordada y espera 15 minutos sin coste. Si se prevé un retraso, basta con un mensaje por WhatsApp: comprobamos la hora de su vuelo, informamos a su chófer y coordinamos el proceso con usted. Nuestro objetivo no es meterle prisa, sino llevarle a su vuelo de forma relajada.","faqFifteenQ":"¿Es posible hacer paradas durante el trayecto?","faqFifteenA":"Por supuesto. Si desea parar en un supermercado o una farmacia, o detenerse brevemente para una foto, solo tiene que indicarlo al reservar o por WhatsApp; planificamos la ruta en consecuencia. Si una parada le desvía considerablemente de su recorrido, le informamos antes de la salida de si hay algún coste adicional; nada le sorprenderá después.","faqCatPayment":"Pago y precio","faqNineQ":"¿Cómo pago?","faqNineA":"Paga a su chófer en efectivo al inicio del trayecto; no es posible pagar con tarjeta. Los precios están fijados en euros (EUR): el importe fijo corresponde exactamente a lo que vio al reservar — por vehículo, incluidas todas las tasas de aeropuerto y aparcamiento, sin añadidos posteriores. ¿Prefiere pagar en dólares estadounidenses o en liras turcas? Escríbanos con antelación por WhatsApp para un precio aparte, ya que el tipo de cambio varía. Su chófer le da la bienvenida, carga su equipaje y monta las sillas infantiles solicitadas; tras el pago comienza su trayecto.","faqTwelveQ":"¿En qué moneda puedo pagar?","faqTwelveA":"Nuestros precios están fijados en euros (EUR) y se pagan en efectivo; no se aceptan tarjetas. Si desea pagar en dólares estadounidenses o en liras turcas, el importe depende del tipo de cambio del día; por eso, escríbanos por WhatsApp antes de su traslado. Le indicamos un precio claro e informamos a su chófer, de modo que no haya nada que negociar en el vehículo.","faqElevenQ":"¿Puedo cancelar o modificar mi reserva?","faqElevenA":"Sí, y siempre de forma gratuita. Como no cobramos ningún pago por adelantado, no hay nada que reembolsar ni ninguna espera para recuperar su dinero: si sus planes cambian, basta con un mensaje por WhatsApp. Los cambios de hora, número de vuelo o dirección de destino los gestionamos igualmente, sin recargo.","faqFiveQ":"¿Es definitivo el precio mostrado?","faqFiveA":"Sí. El precio de su reserva es el importe que entrega a su chófer en efectivo — por vehículo, incluidas todas las tasas de aeropuerto, los costes de aparcamiento y los primeros 90 minutos de tiempo de espera. No hay costes ocultos.","faqCatVehicle":"Vehículo y equipaje","faqThreeQ":"¿Hay sillas infantiles disponibles?","faqThreeA":"Sí. Portabebés, sillas infantiles y elevadores están disponibles gratuitamente si se reservan con antelación.","faqThirteenQ":"¿Cuánto equipaje puedo llevar?","faqThirteenA":"Por lo general, una maleta grande y una pieza de equipaje de mano por persona. Si lleva más — una maleta adicional, una bolsa de golf, un cochecito, esquís o una bicicleta — solo tiene que indicarlo al reservar; sin recargo, ponemos a su disposición un vehículo con la capacidad adecuada. Lo único que importa es que lo sepamos con antelación. Un Mercedes Vito admite hasta 6 personas y un Sprinter hasta 12.","faqFourQ":"¿Se pueden transportar bolsas de golf y equipaje grande?","faqFourA":"Sí. El Sprinter y el Vito son ideales para grupos de golf. Indíquenos su equipaje y planificaremos el vehículo adecuado.","contactEyebrow":"Su viaje comienza aquí","contactTitle":"Llegue a Antalya<br />de forma excepcional.","contactBody":"Reserve online en menos de dos minutos o hable directamente con nuestro equipo de concierge 24/7.","whatsappUs":"WhatsApp","replyMinutes":"Respuesta normalmente en pocos minutos","callUs":"Llamar 24/7","emailUs":"Correo del concierge","replyHour":"Respuesta en menos de una hora","footerTagline":"Servicios privados de chófer en toda la Riviera turca.","explore":"Descubrir","information":"Información","licensed":"Proveedor de traslados privados con licencia · Conforme a TÜRSAB","bookingConfirmed":"Reserva confirmada","referenceLabel":"Referencia","weWillContact":"Su solicitud de reserva ha sido enviada. Le contactaremos en un plazo de 30 minutos.","chatWithUs":"Chatee con nosotros","pickupAddressPlaceholder":"Nombre del hotel, calle, número y barrio","dropoffAddressPlaceholder":"Nombre del hotel, calle, número y barrio","hotelNamePlaceholder":"Nombre del hotel o alojamiento","stepRoute":"Ruta","stepDetails":"Detalles","stepContact":"Contacto","reserveForPrice":"Reservar","continue":"Continuar","back":"Volver","perVehicleNoteVito":"Por vehículo — no por persona · Hasta 6 pasajeros","perVehicleNoteSprinter":"Por vehículo — no por persona · Hasta 12 pasajeros","perVehicle":"fijo · por vehículo","requestQuote":"Solicitar un presupuesto","cashConfirmation":"Su reserva está confirmada. Paga el total fijo a su chófer en efectivo al inicio del trayecto.","bookingError":"No se ha podido completar su reserva. Inténtelo de nuevo.","formIncomplete":"Complete los campos resaltados.","requiredField":"Este campo es obligatorio.","destinationRequired":"Seleccione un destino.","dateInvalid":"Elija hoy o una fecha futura.","emailInvalid":"Introduzca una dirección de correo electrónico válida.","nameInvalid":"Introduzca un nombre completo válido.","phoneInvalid":"Introduzca un número válido incluyendo el prefijo del país (por ejemplo +49).","flightInvalid":"Introduzca un número de vuelo válido.","pickupAddressRequired":"La dirección de recogida debe tener entre 6 y 160 caracteres.","dropoffAddressRequired":"La dirección de destino debe tener entre 6 y 160 caracteres.","addressesMustDiffer":"Las direcciones de recogida y de destino deben ser diferentes.","customDestinationPrice":"El precio se confirmará tras revisar la dirección de destino.","hotelNameRequired":"Introduzca el nombre del hotel.","roundTripPriceNote":"ida y vuelta · 2 trayectos","returnDateRequired":"Elija una fecha de regreso.","returnDateInvalid":"Elija una fecha de regreso igual o posterior al viaje de ida.","returnTimeRequired":"Elija la hora de recogida del regreso.","dailyChauffeur":"Vehículo + chófer por día","days":"días","dailyChauffeurHint":"Contrate un vehículo privado con chófer por día, sin límite de kilómetros ni de horas. El combustible se paga aparte.","serviceStartDate":"Primer día de servicio","serviceEndDate":"Último día de servicio","dailyPickupTime":"Hora de inicio del servicio","dailyPickupTimeRequired":"Seleccione la hora de inicio del servicio diario.","serviceEndDateRequired":"Seleccione el último día de servicio.","servicePeriodInvalid":"Seleccione un periodo de entre 1 y 30 días.","arrivalFlightTimeOptional":"Hora de llegada del vuelo (opcional)","arrivalFlightNumberOptional":"Número de vuelo de llegada (opcional)","servicePrice":"Precio del servicio","fuelExcludedShort":"combustible no incluido","fuelExcludedDetail":"El combustible no está incluido y se paga aparte según el uso.","departureFlightDate":"Fecha del vuelo de salida (opcional)","departureFlightTime":"Hora del vuelo de salida","departureFlightNumber":"Número del vuelo de salida","departureFlightDateRequired":"Seleccione la fecha del vuelo de salida.","departureFlightDateInvalid":"La fecha del vuelo de salida no puede ser anterior al inicio del servicio.","dailyQuoteIncludes":"Incluye el vehículo seleccionado y el chófer, sin límite de kilómetros ni de horas. El combustible no está incluido.","reviewAndConfirm":"Revisar y confirmar","fuelTermsTitle":"Información importante sobre el combustible","fuelTermsBody":"La tarifa diaria de servicio de 150 € incluye el vehículo y el chófer. El combustible no está incluido. Pagará el coste real del combustible aparte según el uso.","fuelTermsCheckbox":"Entiendo que el combustible no está incluido y se pagará aparte según el uso.","cancel":"Cancelar","close":"Cerrar","understandAndConfirm":"Lo entiendo y confirmo","dailyCashConfirmation":"Su contratación de chófer por día está confirmada. El precio del servicio no incluye el combustible, que se paga aparte según el uso.","campaignBadge":"Oferta online","campaignDiscount":"Precio especial","campaignScope":"en todos los precios de traslado","campaignApplied":"Precio especial online aplicado","onlineDiscountShort":"Precio especial online","discountPricesShown":"Se muestran los precios especiales online","quoteTitle":"¿A dónde le llevamos?","date":"Fecha","airportReturnPrice":"El precio se confirmará tras revisar el hotel o la dirección de recogida.","oneGuest":"1 pasajero","twoGuests":"2 pasajeros","threeGuests":"3 pasajeros","fourGuests":"4 pasajeros","fiveGuests":"5 pasajeros","sixGuests":"6 pasajeros","sevenGuests":"7 pasajeros","viewQuote":"Ver precio","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Una cómoda cabina privada para familias y grupos pequeños.","capacitySwitchedSprinter":"Los pasajeros y el equipaje superan la capacidad del Vito — cambiado a Mercedes Sprinter.","capacityNoVehicle":"Esta cantidad de pasajeros y equipaje supera la capacidad de nuestros vehículos. Contáctenos por WhatsApp.","leatherSeats":"Asientos de cuero premium","water":"Agua mineral fría","from":"Desde","reviewOne":"«Nuestro chófer esperó a pesar de un retraso de 90 minutos del vuelo. El vehículo estaba impecable, con una temperatura agradable y ya equipado con las dos sillas infantiles. Justo la recepción que nuestra familia necesitaba.»","reviewTwo":"«Desde el primer contacto por WhatsApp hasta la llegada a Belek, todo fue de primera clase. Puntual, discreto y muy profesional. Nuestras bolsas de golf también cupieron cómodamente.»","reviewThree":"«Se sintió como el servicio de chófer de un hotel, no como un taxi de aeropuerto. Comunicación clara, un vehículo impecable y un chófer sinceramente amable.»","faqReminder":"Antes de su viaje, lea la sección de preguntas frecuentes de nuestra web.","viewFaq":"Ver preguntas frecuentes","quoteReady":"Su traslado privado","journeyTime":"Tiempo de viaje","totalFixed":"Precio total","confirmWhatsapp":"Confirmar por WhatsApp","bookNowCta":"Reservar ahora","backToQuote":"Volver","yourDetails":"Sus datos","flightNumber":"Número de vuelo","flightArrivalTime":"Hora de llegada","notesLabel":"Peticiones especiales","confirmBooking":"Confirmar reserva","paymentError":"El pago ha fallado. Inténtelo de nuevo."},"el":{"navFleet":"Οχήματα","navService":"Υπηρεσίες","navRoutes":"Διαδρομές","navReviews":"Κριτικές","navContact":"Επικοινωνία","bookNow":"Κράτηση τώρα","alwaysAvailable":"Διαθέσιμοι 24 ώρες, κάθε μέρα","heroEyebrow":"Ιδιωτική υπηρεσία σοφέρ · Antalya","heroTitle":"Premium μεταφορές από το αεροδρόμιο<br />στην Antalya","heroSubtitle":"Ιδιωτικές μεταφορές με σοφέρ από το αεροδρόμιο της Antalya προς Belek, Side, Kemer και Alanya.","bookTransfer":"Κράτηση μεταφοράς","instantQuote":"Άμεση προσφορά τιμής","googleRated":"Βαθμολογία Google","trustedGuests":"Κρατήσεις από πάνω από 2.500 επισκέπτες","discover":"Ανακαλύψτε","tbLicensed":"Πιστοποίηση TÜRSAB","tbFlightTracking":"Παρακολούθηση πτήσης","tbFixedPrice":"Εγγύηση σταθερής τιμής","tb247Concierge":"24/7 Concierge","tbChildSeats":"Παιδικά καθίσματα περιλαμβάνονται","privateJourney":"Το ιδιωτικό σας ταξίδι","meetGreetNote":"Meet &amp; Greet στο αεροδρόμιο · Σημείο συνάντησης J / 777","tripType":"Τύπος διαδρομής","oneWay":"Απλή διαδρομή","roundTrip":"Μετ' επιστροφής","roundTripHint":"Στη διαδρομή μετ' επιστροφής, η επιστροφή ακολουθεί την ίδια διαδρομή αντίστροφα.","pickup":"Παραλαβή","airportOption":"Αεροδρόμιο Antalya (AYT)","hotelOption":"Ξενοδοχείο","privateAddressOption":"Ιδιωτική διεύθυνση","destination":"Προορισμός","selectDestination":"Επιλέξτε προορισμό","vehicle":"Όχημα","guests":"Επισκέπτες","arrivalDate":"Ημερομηνία άφιξης","arrivalFlightTime":"Ώρα άφιξης πτήσης","chooseTime":"Επιλέξτε ώρα","arrivalFlightNumber":"Αριθμός πτήσης άφιξης","returnDate":"Ημερομηνία επιστροφής","returnPickupTime":"Ώρα παραλαβής επιστροφής","returnFlightNumber":"Αριθμός πτήσης επιστροφής","pickupAddress":"Πλήρης διεύθυνση παραλαβής","dropoffAddress":"Πλήρης διεύθυνση προορισμού","luggageLabel":"Μεγάλες αποσκευές","hotelNameLabel":"Όνομα ξενοδοχείου","childSeatLabel":"Παιδικά καθίσματα","childSeatNone":"Χωρίς παιδικό κάθισμα","oneChildSeat":"1 παιδικό κάθισμα","twoChildSeats":"2 παιδικά καθίσματα","threeChildSeats":"3 παιδικά καθίσματα","fourChildSeats":"4 παιδικά καθίσματα","fullName":"Ονοματεπώνυμο","phoneLabel":"Τηλέφωνο / WhatsApp","emailLabel":"Email","paymentMethod":"Επιλέξτε μέθοδο πληρωμής","cashPayment":"Πληρωμή στο όχημα","recommended":"Προτεινόμενο","cashPaymentDescription":"Χωρίς online προπληρωμή. Πληρώνετε τη σταθερή συνολική τιμή στον οδηγό σας μετρητοίς στην αρχή της διαδρομής.","quoteIncludes":"Περιλαμβάνει Meet & Greet, παρακολούθηση πτήσης, στάθμευση, 90 λεπτά χρόνου αναμονής και εμφιαλωμένο νερό.","perVehicleNote":"Ανά όχημα — όχι ανά άτομο · Έως 6 επιβάτες","confirmCashBooking":"Επιβεβαίωση κράτησης — πληρωμή στο όχημα","flightTracking":"Παρακολούθηση πτήσης σε πραγματικό χρόνο","fixedPrice":"Εγγυημένη σταθερή τιμή","meetGreet":"Προσωπική υποδοχή","speakingDrivers":"Ομιλούν Γερμανικά & Αγγλικά","fromAirport":"Από το αεροδρόμιο της Antalya","welcomeEyebrow":"Καλώς ήρθατε στο υψηλότερο επίπεδο","welcomeTitle":"Ταξιδέψτε με στιλ.<br />Φτάστε ξεκούραστοι.","welcomeBody":"Από τη στιγμή της προσγείωσής σας, κάθε λεπτομέρεια είναι φροντισμένη. Η ομάδα μας στο αεροδρόμιο σας υποδέχεται, ο σοφέρ σας σταθμεύει στο σημείο παραλαβής και οι αποσκευές σας φορτώνονται σε ένα προσεκτικά προετοιμασμένο ιδιωτικό όχημα.","ourStandards":"Τα πρότυπα υπηρεσιών μας","concierge":"Υπηρεσία Concierge","guestsWelcomed":"Επισκέπτες που υποδεχθήκαμε","guestRating":"Μέση βαθμολογία","privateTransfers":"Ιδιωτικές μεταφορές","fleetEyebrow":"Ο στόλος μας","fleetTitle":"Ο ιδιωτικός σας χώρος,<br />τέλειος μέχρι την τελευταία λεπτομέρεια.","fleetIntro":"Ταξιδέψτε άνετα με άφθονο χώρο για την οικογένεια, τις αποσκευές γκολφ και τις βαλίτσες.","signatureFleet":"Signature στόλος","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Ευρύχωρη VIP μεταφορά για μεγαλύτερες ομάδες με άφθονο χώρο για επιβάτες και αποσκευές.","passengers":"Επιβάτες","suitcases":"Βαλίτσες","television":"Τηλεόραση στο όχημα","coldDrinks":"Κρύα ροφήματα","snacks":"Σνακ","childSeats":"Παιδικά καθίσματα κατόπιν αιτήματος","wifi":"Δωρεάν WiFi","nameSignGreeting":"Υποδοχή στο σημείο J / 777","reserveVehicle":"Κράτηση οχήματος","insideVclass":"Στο εσωτερικό του Sprinter","interiorTitle":"Ένα ιδιωτικό lounge ανάμεσα<br />στο αεροδρόμιο και το ξενοδοχείο.","serviceEyebrow":"Το πρότυπο Antalya VIP","serviceTitle":"Κάτι περισσότερο από μεταφορά.<br />Μια ξεχωριστή υποδοχή.","serviceIntro":"Φροντίδα επιπέδου ξενοδοχείου, έμπειροι τοπικοί σοφέρ και απόλυτη ασφάλεια από το αεροδρόμιο μέχρι το θέρετρο.","trackingTitle":"Παρακολούθηση πτήσης","trackingBody":"Παρακολουθούμε την πτήση σας σε πραγματικό χρόνο και προσαρμόζουμε την παραλαβή αυτόματα και δωρεάν.","chauffeurTitle":"Επαγγελματίες σοφέρ","chauffeurBody":"Πάντα περιποιημένοι, διακριτικοί και επιλεγμένοι για την τοπική τους γνώση και το υψηλότερο επίπεδο εξυπηρέτησης.","greetTitle":"Meet & Greet","greetBody":"Στις διεθνείς αφίξεις, η ομάδα μας στο αεροδρόμιο σας υποδέχεται στο σημείο J / 777, καλεί τον σοφέρ σας στο σημείο παραλαβής και βοηθά με τις αποσκευές.","supportTitle":"24/7 Concierge","supportBody":"Πριν, κατά τη διάρκεια και μετά το ταξίδι σας, ένας προσωπικός σύμβουλος είναι πάντα διαθέσιμος.","priceTitle":"Σταθερές τιμές","priceBody":"Η επιβεβαιωμένη τιμή είναι η τελική τιμή. Ο χρόνος αναμονής, η στάθμευση και οι καθυστερήσεις πτήσεων περιλαμβάνονται.","familyTitle":"Για οικογένειες","familyBody":"Κατάλληλα παιδικά καθίσματα, ευρύχωροι εσωτερικοί χώροι και υπομονετική βοήθεια για μια ξεκούραστη άφιξη.","routesEyebrow":"Οι πιο δημοφιλείς διαδρομές μας","routesTitle":"Από το αεροδρόμιο της Antalya<br />στην Τουρκική Ριβιέρα.","routesIntro":"Όλες οι τιμές ισχύουν ανά όχημα, όχι ανά άτομο, και περιλαμβάνουν 90 λεπτά χρόνου αναμονής.","golfFavourite":"Αγαπημένο των γκολφ","reviewsEyebrow":"Κριτικές επισκεπτών","reviewsTitle":"Μια εξυπηρέτηση που μένει<br />για καιρό στη μνήμη.","googleReviews":"Βάσει 387 επαληθευμένων κριτικών Google","trustedBy":"Επιλογή επισκεπτών των κορυφαίων θερέτρων της Antalya","faqEyebrow":"Συχνές ερωτήσεις","faqTitle":"Πριν από το ταξίδι σας.","faqIntro":"Όλα όσα πρέπει να γνωρίζετε για την ιδιωτική σας μεταφορά από το αεροδρόμιο της Antalya.","askQuestion":"Κάντε μια ερώτηση","faqCatArrival":"Άφιξη & Μεταφορά","faqOneQ":"Τι γίνεται σε περίπτωση καθυστέρησης πτήσης;","faqOneA":"Δεν χρειάζεται να κάνετε τίποτα. Παρακολουθούμε την πτήση σας σε πραγματικό χρόνο και προσαρμόζουμε αυτόματα την ώρα παραλαβής σας. Ποτέ δεν χρεώνουμε καθυστερήσεις της αεροπορικής εταιρείας – ο σοφέρ σας είναι εκεί όποτε κι αν προσγειωθείτε, και τα πρώτα 90 λεπτά μετά την προσγείωση περιλαμβάνονται πάντα.","faqTwoQ":"Φτάνω με διεθνή πτήση. Πώς γίνεται η παραλαβή;","faqTwoA":"Μετά τον έλεγχο διαβατηρίων και την παραλαβή αποσκευών, ακολουθείτε τους υπόλοιπους επιβάτες προς την περιοχή Meet & Greet και έρχεστε στο σημείο μας J / 777. Απλώς πείτε το όνομά σας στο προσωπικό μας – αυτό αρκεί. Η ομάδα μας ενημερώνει αμέσως τον σοφέρ σας· εκείνος εισέρχεται στο αεροδρόμιο και βρίσκεται έτοιμος στο σημείο παραλαβής, ενώ ο συνεργάτης μας σας συνοδεύει στο όχημα. Όλη η διαδικασία διαρκεί περίπου 7–8 λεπτά.","faqSixQ":"Φτάνω με εσωτερική πτήση. Πού θα βρω τον σοφέρ μου;","faqSixA":"Η περιοχή Meet & Greet είναι διαθέσιμη αποκλειστικά για διεθνείς αφίξεις. Γι' αυτό εξυπηρετούμε τους επισκέπτες εσωτερικών πτήσεων διαφορετικά: Σας στέλνουμε πριν τη μεταφορά τον αριθμό τηλεφώνου του σοφέρ σας. Μόλις προσγειωθείτε, ενημερώστε τον σύντομα – θα σας παραλάβει στην αίθουσα αφίξεων.","faqSevenQ":"Τι κάνω αν δεν υπάρχει κανείς στο σημείο J / 777;","faqSevenA":"Στο σημείο μας βρίσκονται συνεχώς δύο συνεργάτες, με μοναδικό καθήκον να συνοδεύουν τους αφικνούμενους επισκέπτες στο όχημά τους. Αν το σημείο είναι στιγμιαία χωρίς προσωπικό, ένας συνάδελφος συνοδεύει τη στιγμή εκείνη τον προηγούμενο επισκέπτη – κάθε συνοδεία διαρκεί περίπου 7–8 λεπτά. Παρακαλούμε περιμένετε περίπου 10 λεπτά. Αν μέχρι τότε δεν έχει επιστρέψει κανείς, γράψτε μας μέσω WhatsApp: Ενημερώνουμε αμέσως τον σοφέρ σας, τον βάζουμε να σταθμεύσει στο πλησιέστερο σημείο και σας οδηγούμε απευθείας στο όχημά σας χωρίς άλλη αναμονή.","faqEightQ":"Τι ισχύει αν χρειαστώ περισσότερο από 90 λεπτά για να βγω από το αεροδρόμιο;","faqEightA":"Τα πρώτα 90 λεπτά μετά την προσγείωση περιλαμβάνονται δωρεάν – σαφώς περισσότερα από όσα απαιτούν ο έλεγχος διαβατηρίων, οι αποσκευές και το τελωνείο – και αυτό το χρονικό διάστημα μετατοπίζεται αυτόματα σε περίπτωση καθυστέρησης πτήσης. Μόνο αν παραμείνετε περισσότερο στο τερματικό για λόγους που δεν σχετίζονται με την πτήση σας, προστίθεται μια συνεισφορά στα έξοδα στάθμευσης 5 € για κάθε επιπλέον ώρα. Στην πράξη αυτό δεν συμβαίνει σχεδόν ποτέ: Σχεδόν όλοι οι επισκέπτες μας βρίσκονται καθ' οδόν πολύ νωρίτερα.","faqCatJourney":"Επιστροφή & Διαδρομή","faqTenQ":"Πώς διατηρώ επαφή στη μεταφορά επιστροφής;","faqTenA":"Μόλις επιβεβαιώσετε την ημερομηνία και την ώρα της επιστροφής σας μέσω WhatsApp με την ομάδα μας, σας αναθέτουμε ένα όχημα μερικές ώρες πριν τη μεταφορά και σας στέλνουμε φωτογραφίες του μέσω WhatsApp – κατόπιν αιτήματος και τον αριθμό τηλεφώνου του σοφέρ σας. Όταν ο σοφέρ σας φτάσει στο ξενοδοχείο, ενημερώνει τη ρεσεψιόν, η οποία ειδοποιεί το δωμάτιό σας μόλις το όχημα είναι έτοιμο. Οι σοφέρ μας δεν καλούν ποτέ απευθείας τους επισκέπτες: Όλη η επικοινωνία γίνεται μέσω της κεντρικής μας εξυπηρέτησης WhatsApp, ώστε να γνωρίζετε πάντα ακριβώς με ποιον μιλάτε.","faqFourteenQ":"Τι γίνεται αν καθυστερήσω στη μεταφορά επιστροφής;","faqFourteenA":"Ο σοφέρ σας βρίσκεται στην καθορισμένη ώρα στο ξενοδοχείο σας και περιμένει 15 λεπτά δωρεάν. Αν διαφαίνεται καθυστέρηση, αρκεί ένα μήνυμα μέσω WhatsApp: Ελέγχουμε την ώρα της πτήσης σας, ενημερώνουμε τον σοφέρ σας και συντονίζουμε τη διαδικασία μαζί σας. Στόχος μας δεν είναι να σας βιάσουμε, αλλά να σας μεταφέρουμε ξεκούραστους στην πτήση σας.","faqFifteenQ":"Είναι δυνατές ενδιάμεσες στάσεις κατά τη διαδρομή;","faqFifteenA":"Φυσικά. Αν θέλετε να σταματήσετε σε ένα σούπερ μάρκετ ή ένα φαρμακείο ή για μια σύντομη φωτογραφία, απλώς πείτε το κατά την κράτηση ή μέσω WhatsApp — σχεδιάζουμε τη διαδρομή αναλόγως. Αν μια στάση σας απομακρύνει σημαντικά από τη διαδρομή σας, σας ενημερώνουμε πριν την αναχώρηση αν προστίθεται κάτι· τίποτα δεν σας εκπλήσσει εκ των υστέρων.","faqCatPayment":"Πληρωμή & Τιμή","faqNineQ":"Πώς πληρώνω;","faqNineA":"Πληρώνετε τον σοφέρ σας στην αρχή της διαδρομής μετρητοίς – πληρωμή με κάρτα δεν είναι δυνατή. Οι τιμές ορίζονται σε ευρώ (EUR): Το σταθερό ποσό αντιστοιχεί ακριβώς σε αυτό που είδατε κατά την κράτηση – ανά όχημα, με όλα τα τέλη αεροδρομίου και στάθμευσης, χωρίς μεταγενέστερες προσθήκες. Θα προτιμούσατε να πληρώσετε σε δολάρια ΗΠΑ ή τουρκικές λίρες; Γράψτε μας εκ των προτέρων μέσω WhatsApp για ξεχωριστή τιμή, καθώς η ισοτιμία διαφέρει. Ο σοφέρ σας σας καλωσορίζει, φορτώνει τις αποσκευές σας και τοποθετεί τα παιδικά καθίσματα που ζητήσατε· μετά την πληρωμή αρχίζει η διαδρομή σας.","faqTwelveQ":"Σε ποιο νόμισμα μπορώ να πληρώσω;","faqTwelveA":"Οι τιμές μας ορίζονται σε ευρώ (EUR) και πληρώνονται μετρητοίς· κάρτες δεν γίνονται δεκτές. Αν θέλετε να πληρώσετε σε δολάρια ΗΠΑ ή τουρκικές λίρες, το ποσό εξαρτάται από την ημερήσια ισοτιμία — γι' αυτό γράψτε μας πριν τη μεταφορά σας μέσω WhatsApp. Σας δίνουμε μια σαφή τιμή και ενημερώνουμε τον σοφέρ σας, ώστε να μη γίνεται καμία διαπραγμάτευση μέσα στο όχημα.","faqElevenQ":"Μπορώ να ακυρώσω ή να αλλάξω την κράτησή μου;","faqElevenA":"Ναι, και πάντα δωρεάν. Επειδή δεν λαμβάνουμε προκαταβολή, δεν υπάρχει κάτι προς επιστροφή ούτε αναμονή για τα χρήματά σας — αν αλλάξουν τα σχέδιά σας, αρκεί ένα μήνυμα μέσω WhatsApp. Αλλαγές ώρας, αριθμού πτήσης ή διεύθυνσης προορισμού τις διευθετούμε εξίσου, χωρίς επιπλέον χρέωση.","faqFiveQ":"Είναι η εμφανιζόμενη τιμή τελική;","faqFiveA":"Ναι. Η τιμή της κράτησής σας είναι το ποσό που παραδίδετε μετρητοίς στον σοφέρ σας – ανά όχημα, με όλα τα τέλη αεροδρομίου, τα έξοδα στάθμευσης και τα πρώτα 90 λεπτά χρόνου αναμονής. Δεν υπάρχουν κρυφές χρεώσεις.","faqCatVehicle":"Όχημα & Αποσκευές","faqThreeQ":"Διατίθενται παιδικά καθίσματα;","faqThreeA":"Ναι. Βρεφικά καθίσματα, παιδικά καθίσματα και καθίσματα ανύψωσης διατίθενται δωρεάν κατόπιν προκράτησης.","faqThirteenQ":"Πόσες αποσκευές μπορώ να πάρω μαζί μου;","faqThirteenA":"Κατά κανόνα μία μεγάλη βαλίτσα και μία χειραποσκευή ανά άτομο. Αν έχετε περισσότερα — μια επιπλέον βαλίτσα, μια τσάντα γκολφ, ένα καρότσι, πέδιλα σκι ή ένα ποδήλατο — απλώς πείτε το κατά την κράτηση· διαθέτουμε χωρίς επιπλέον χρέωση όχημα με κατάλληλη χωρητικότητα. Το μόνο που έχει σημασία είναι να το γνωρίζουμε εκ των προτέρων. Ένα Mercedes Vito χωράει έως 6 άτομα, ένα Sprinter έως 12.","faqFourQ":"Μπορούν να μεταφερθούν τσάντες γκολφ και μεγάλες αποσκευές;","faqFourA":"Ναι. Τα Sprinter και Vito είναι ιδανικά για ομάδες γκολφ. Ενημερώστε μας για τις αποσκευές σας και σχεδιάζουμε το κατάλληλο όχημα.","contactEyebrow":"Το ταξίδι σας ξεκινά εδώ","contactTitle":"Φτάστε εξαιρετικά<br />στην Antalya.","contactBody":"Κάντε την κράτησή σας online σε λιγότερο από δύο λεπτά ή μιλήστε απευθείας με την ομάδα Concierge μας 24/7.","whatsappUs":"WhatsApp","replyMinutes":"Απάντηση συνήθως σε λίγα λεπτά","callUs":"Καλέστε 24/7","emailUs":"Email Concierge","replyHour":"Απάντηση εντός μίας ώρας","footerTagline":"Ιδιωτικές υπηρεσίες σοφέρ σε ολόκληρη την Τουρκική Ριβιέρα.","explore":"Ανακαλύψτε","information":"Πληροφορίες","licensed":"Αδειοδοτημένος πάροχος ιδιωτικών μεταφορών · Σύμφωνος με TÜRSAB","bookingConfirmed":"Η κράτηση επιβεβαιώθηκε","referenceLabel":"Αναφορά","weWillContact":"Το αίτημα κράτησής σας εστάλη. Θα επικοινωνήσουμε μαζί σας εντός 30 λεπτών.","chatWithUs":"Συνομιλήστε μαζί μας","pickupAddressPlaceholder":"Όνομα ξενοδοχείου, οδός, αριθμός και περιοχή","dropoffAddressPlaceholder":"Όνομα ξενοδοχείου, οδός, αριθμός και περιοχή","hotelNamePlaceholder":"Όνομα ξενοδοχείου ή καταλύματος","stepRoute":"Διαδρομή","stepDetails":"Στοιχεία","stepContact":"Επικοινωνία","reserveForPrice":"Κράτηση","continue":"Συνέχεια","back":"Πίσω","perVehicleNoteVito":"Ανά όχημα — όχι ανά άτομο · Έως 6 επιβάτες","perVehicleNoteSprinter":"Ανά όχημα — όχι ανά άτομο · Έως 12 επιβάτες","perVehicle":"σταθερή · ανά όχημα","requestQuote":"Ζητήστε προσφορά τιμής","cashConfirmation":"Η κράτησή σας επιβεβαιώθηκε. Πληρώνετε τη σταθερή συνολική τιμή στον οδηγό σας μετρητοίς στην αρχή της διαδρομής.","bookingError":"Η κράτησή σας δεν ολοκληρώθηκε. Παρακαλούμε δοκιμάστε ξανά.","formIncomplete":"Παρακαλούμε συμπληρώστε τα επισημασμένα πεδία.","requiredField":"Αυτό το πεδίο είναι υποχρεωτικό.","destinationRequired":"Παρακαλούμε επιλέξτε προορισμό.","dateInvalid":"Παρακαλούμε επιλέξτε τη σημερινή ή μια μελλοντική ημερομηνία.","emailInvalid":"Παρακαλούμε εισαγάγετε μια έγκυρη διεύθυνση email.","nameInvalid":"Παρακαλούμε εισαγάγετε ένα έγκυρο ονοματεπώνυμο.","phoneInvalid":"Παρακαλούμε εισαγάγετε έναν έγκυρο αριθμό μαζί με τον κωδικό χώρας (για παράδειγμα +49).","flightInvalid":"Παρακαλούμε εισαγάγετε έναν έγκυρο αριθμό πτήσης.","pickupAddressRequired":"Η διεύθυνση παραλαβής πρέπει να έχει μήκος από 6 έως 160 χαρακτήρες.","dropoffAddressRequired":"Η διεύθυνση προορισμού πρέπει να έχει μήκος από 6 έως 160 χαρακτήρες.","addressesMustDiffer":"Οι διευθύνσεις παραλαβής και προορισμού πρέπει να διαφέρουν.","customDestinationPrice":"Η τιμή θα επιβεβαιωθεί μετά τον έλεγχο της διεύθυνσης προορισμού.","hotelNameRequired":"Παρακαλούμε εισαγάγετε το όνομα του ξενοδοχείου.","roundTripPriceNote":"μετ' επιστροφής · 2 διαδρομές","returnDateRequired":"Παρακαλούμε επιλέξτε ημερομηνία επιστροφής.","returnDateInvalid":"Παρακαλούμε επιλέξτε ημερομηνία επιστροφής ίδια ή μεταγενέστερη από τη διαδρομή μετάβασης.","returnTimeRequired":"Παρακαλούμε επιλέξτε την ώρα παραλαβής επιστροφής.","dailyChauffeur":"Ημερήσιο όχημα + σοφέρ","days":"ημέρες","dailyChauffeurHint":"Μισθώστε ιδιωτικό όχημα και σοφέρ με την ημέρα, χωρίς όριο χιλιομέτρων ή ωρών. Τα καύσιμα πληρώνονται ξεχωριστά.","serviceStartDate":"Πρώτη ημέρα υπηρεσίας","serviceEndDate":"Τελευταία ημέρα υπηρεσίας","dailyPickupTime":"Ώρα έναρξης υπηρεσίας","dailyPickupTimeRequired":"Παρακαλούμε επιλέξτε την ημερήσια ώρα έναρξης της υπηρεσίας.","serviceEndDateRequired":"Παρακαλούμε επιλέξτε την τελευταία ημέρα υπηρεσίας.","servicePeriodInvalid":"Παρακαλούμε επιλέξτε περίοδο μεταξύ 1 και 30 ημερών.","arrivalFlightTimeOptional":"Ώρα άφιξης πτήσης (προαιρετικό)","arrivalFlightNumberOptional":"Αριθμός πτήσης άφιξης (προαιρετικό)","servicePrice":"Τιμή υπηρεσίας","fuelExcludedShort":"χωρίς καύσιμα","fuelExcludedDetail":"Τα καύσιμα δεν περιλαμβάνονται και πληρώνονται ξεχωριστά ανάλογα με τη χρήση.","departureFlightDate":"Ημερομηνία πτήσης αναχώρησης (προαιρετικό)","departureFlightTime":"Ώρα πτήσης αναχώρησης","departureFlightNumber":"Αριθμός πτήσης αναχώρησης","departureFlightDateRequired":"Παρακαλούμε επιλέξτε την ημερομηνία πτήσης αναχώρησης.","departureFlightDateInvalid":"Η ημερομηνία πτήσης αναχώρησης δεν μπορεί να είναι πριν από την έναρξη της υπηρεσίας.","dailyQuoteIncludes":"Περιλαμβάνει το επιλεγμένο όχημα και σοφέρ χωρίς όριο χιλιομέτρων ή ωρών. Τα καύσιμα δεν περιλαμβάνονται.","reviewAndConfirm":"Έλεγχος και επιβεβαίωση","fuelTermsTitle":"Σημαντικές πληροφορίες σχετικά με τα καύσιμα","fuelTermsBody":"Η ημερήσια χρέωση υπηρεσίας των 150 € περιλαμβάνει το όχημα και τον σοφέρ. Τα καύσιμα δεν περιλαμβάνονται. Θα πληρώσετε το πραγματικό κόστος καυσίμων ξεχωριστά ανάλογα με τη χρήση.","fuelTermsCheckbox":"Κατανοώ ότι τα καύσιμα δεν περιλαμβάνονται και θα πληρωθούν ξεχωριστά βάσει της χρήσης.","cancel":"Ακύρωση","close":"Κλείσιμο","understandAndConfirm":"Κατανοώ και επιβεβαιώνω","dailyCashConfirmation":"Η ημερήσια μίσθωση σοφέρ σας επιβεβαιώθηκε. Η τιμή της υπηρεσίας δεν περιλαμβάνει καύσιμα, τα οποία πληρώνονται ξεχωριστά βάσει της χρήσης.","campaignBadge":"Online Προσφορά","campaignDiscount":"Ειδική τιμή","campaignScope":"σε όλες τις τιμές μεταφοράς","campaignApplied":"Εφαρμόστηκε η online ειδική τιμή","onlineDiscountShort":"Online ειδική τιμή","discountPricesShown":"Εμφανίζονται οι online ειδικές τιμές","quoteTitle":"Πού θα θέλατε να σας μεταφέρουμε;","date":"Ημερομηνία","airportReturnPrice":"Η τιμή θα επιβεβαιωθεί μετά τον έλεγχο του ξενοδοχείου ή της διεύθυνσης παραλαβής.","oneGuest":"1 επισκέπτης","twoGuests":"2 επισκέπτες","threeGuests":"3 επισκέπτες","fourGuests":"4 επισκέπτες","fiveGuests":"5 επισκέπτες","sixGuests":"6 επισκέπτες","sevenGuests":"7 επισκέπτες","viewQuote":"Προβολή τιμής","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Μια άνετη ιδιωτική καμπίνα για οικογένειες και μικρές ομάδες.","capacitySwitchedSprinter":"Οι επιβάτες και οι αποσκευές υπερβαίνουν το Vito — έγινε αλλαγή σε Mercedes Sprinter.","capacityNoVehicle":"Τόσοι επιβάτες και αποσκευές υπερβαίνουν τα οχήματά μας. Παρακαλούμε επικοινωνήστε μαζί μας μέσω WhatsApp.","leatherSeats":"Premium δερμάτινα καθίσματα","water":"Παγωμένο εμφιαλωμένο νερό","from":"Από","reviewOne":"„Ο οδηγός μας περίμενε παρά την καθυστέρηση της πτήσης κατά 90 λεπτά. Το όχημα ήταν άψογο, ευχάριστα δροσερό και ήδη εξοπλισμένο με τα δύο παιδικά καθίσματα. Ακριβώς η υποδοχή που χρειαζόταν η οικογένειά μας.“","reviewTwo":"„Από την πρώτη επαφή μέσω WhatsApp μέχρι την άφιξη στο Belek, απόλυτα κορυφαία. Ακριβής στην ώρα, διακριτικός και πολύ επαγγελματίας. Ακόμη και οι τσάντες γκολφ μας χώρεσαν άνετα.“","reviewThree":"„Έμοιαζε με την υπηρεσία σοφέρ ενός ξενοδοχείου, όχι με ταξί αεροδρομίου. Σαφής επικοινωνία, ένα άψογο όχημα και ένας ειλικρινά ευγενικός οδηγός.“","faqReminder":"Παρακαλούμε διαβάστε την ενότητα συχνών ερωτήσεων στον ιστότοπό μας πριν από το ταξίδι σας.","viewFaq":"Δείτε τις συχνές ερωτήσεις","quoteReady":"Η ιδιωτική σας μεταφορά","journeyTime":"Χρόνος διαδρομής","totalFixed":"Συνολική τιμή","confirmWhatsapp":"Επιβεβαίωση μέσω WhatsApp","bookNowCta":"Κράτηση τώρα","backToQuote":"Πίσω","yourDetails":"Τα στοιχεία σας","flightNumber":"Αριθμός πτήσης","flightArrivalTime":"Ώρα άφιξης","notesLabel":"Ειδικά αιτήματα","confirmBooking":"Επιβεβαίωση κράτησης","paymentError":"Η πληρωμή απέτυχε. Παρακαλούμε δοκιμάστε ξανά."},"he":{"navFleet":"רכבים","navService":"שירות","navRoutes":"מסלולים","navReviews":"ביקורות","navContact":"צור קשר","bookNow":"הזמינו עכשיו","alwaysAvailable":"זמינים 24 שעות ביממה, בכל יום","heroEyebrow":"שירות שופר פרטי · Antalya","heroTitle":"העברות פרימיום משדה התעופה<br />ב-Antalya","heroSubtitle":"העברות פרטיות עם שופר משדה התעופה Antalya לבלק, סידה, קמר ואלניה.","bookTransfer":"הזמינו העברה","instantQuote":"קבלו מחיר מיידי","googleRated":"דירוג Google","trustedGuests":"הוזמן על ידי יותר מ-2,500 אורחים","discover":"גלו","tbLicensed":"מוסמך TÜRSAB","tbFlightTracking":"מעקב טיסות","tbFixedPrice":"ערבות מחיר קבוע","tb247Concierge":"קונסיירז' 24/7","tbChildSeats":"כיסאות בטיחות לילדים כלולים","privateJourney":"המסע הפרטי שלכם","meetGreetNote":"Meet &amp; Greet בשדה התעופה · נקודת מפגש J / 777","tripType":"סוג הנסיעה","oneWay":"כיוון אחד","roundTrip":"הלוך ושוב","roundTripHint":"בנסיעת הלוך ושוב, החזור מתבצע באותו מסלול בכיוון ההפוך.","pickup":"איסוף","airportOption":"שדה התעופה Antalya (AYT)","hotelOption":"מלון","privateAddressOption":"כתובת פרטית","destination":"יעד","selectDestination":"בחרו יעד","vehicle":"רכב","guests":"אורחים","arrivalDate":"תאריך הגעה","arrivalFlightTime":"שעת נחיתת הטיסה","chooseTime":"בחרו שעה","arrivalFlightNumber":"מספר טיסת ההגעה","returnDate":"תאריך חזור","returnPickupTime":"שעת איסוף לחזור","returnFlightNumber":"מספר טיסת החזור","pickupAddress":"כתובת איסוף מלאה","dropoffAddress":"כתובת יעד מלאה","luggageLabel":"מטען גדול","hotelNameLabel":"שם המלון","childSeatLabel":"כיסאות בטיחות לילדים","childSeatNone":"ללא כיסא בטיחות","oneChildSeat":"כיסא בטיחות 1","twoChildSeats":"2 כיסאות בטיחות","threeChildSeats":"3 כיסאות בטיחות","fourChildSeats":"4 כיסאות בטיחות","fullName":"שם מלא","phoneLabel":"טלפון / WhatsApp","emailLabel":"אימייל","paymentMethod":"בחרו אמצעי תשלום","cashPayment":"שלמו ברכב","recommended":"מומלץ","cashPaymentDescription":"ללא תשלום מראש אונליין. אתם משלמים את הסכום הכולל הקבוע לנהג שלכם במזומן בתחילת הנסיעה.","quoteIncludes":"כולל Meet & Greet, מעקב טיסות, חניה, 90 דקות זמן המתנה ומים מינרליים.","perVehicleNote":"לרכב — לא לאדם · עד 6 נוסעים","confirmCashBooking":"אשרו הזמנה — שלמו ברכב","flightTracking":"מעקב טיסות בזמן אמת","fixedPrice":"מחיר קבוע מובטח","meetGreet":"קבלת פנים אישית","speakingDrivers":"דוברי גרמנית ואנגלית","fromAirport":"משדה התעופה Antalya","welcomeEyebrow":"ברוכים הבאים לרמה הגבוהה ביותר","welcomeTitle":"נסעו בסטייל.<br />הגיעו רגועים.","welcomeBody":"מרגע נחיתתכם, דאגנו לכל פרט. צוות שדה התעופה שלנו יקבל את פניכם, השופר שלכם יגיע לנקודת האיסוף והמזוודות שלכם ייטענו לרכב פרטי שהוכן בקפידה.","ourStandards":"תקני השירות שלנו","concierge":"שירות קונסיירז'","guestsWelcomed":"אורחים שקיבלנו","guestRating":"דירוג ממוצע","privateTransfers":"העברות פרטיות","fleetEyebrow":"הצי שלנו","fleetTitle":"המרחב הפרטי שלכם,<br />מושלם עד לפרט האחרון.","fleetIntro":"נסעו בנוחות עם מרחב נדיב למשפחה, ציוד גולף ומזוודות.","signatureFleet":"צי Signature","fleetVclassClass":"Business · First Class","fleetVclassDescription":"הובלת VIP מרווחת לקבוצות גדולות יותר עם מקום רב לנוסעים ולמטען.","passengers":"נוסעים","suitcases":"מזוודות","television":"טלוויזיה ברכב","coldDrinks":"משקאות קרים","snacks":"חטיפים","childSeats":"כיסאות בטיחות לילדים לפי בקשה","wifi":"WiFi חינם","nameSignGreeting":"קבלת פנים בדלפק J / 777","reserveVehicle":"שריינו רכב","insideVclass":"פנים ה-Sprinter","interiorTitle":"טרקלין פרטי בין<br />שדה התעופה למלון.","serviceEyebrow":"תקן ה-VIP של Antalya","serviceTitle":"יותר מהעברה.<br />קבלת פנים מיוחדת.","serviceIntro":"תשומת לב ברמת מלון, שופרים מקומיים מנוסים וביטחון מוחלט משדה התעופה ועד לריזורט.","trackingTitle":"מעקב טיסות","trackingBody":"אנו עוקבים אחר טיסתכם בזמן אמת ומתאימים את האיסוף אוטומטית וללא תשלום.","chauffeurTitle":"שופרים מקצועיים","chauffeurBody":"תמיד מטופחים, דיסקרטיים ונבחרים בזכות היכרותם עם האזור ותקן השירות הגבוה ביותר.","greetTitle":"Meet & Greet","greetBody":"בהגעות בינלאומיות צוות שדה התעופה שלנו יקבל את פניכם בדלפק J / 777, יזמן את השופר שלכם לנקודת האיסוף ויסייע עם המטען.","supportTitle":"קונסיירז' 24/7","supportBody":"לפני, במהלך ואחרי המסע שלכם, איש קשר אישי זמין תמיד.","priceTitle":"מחירים קבועים","priceBody":"המחיר המאושר הוא המחיר הסופי. זמן המתנה, חניה ועיכובי טיסה כלולים.","familyTitle":"למשפחות","familyBody":"כיסאות בטיחות מתאימים, פנים מרווחים וסיוע סבלני להגעה רגועה.","routesEyebrow":"הנסיעות הפופולריות ביותר שלנו","routesTitle":"משדה התעופה Antalya<br />אל הריביירה הטורקית.","routesIntro":"כל המחירים הם לרכב, לא לאדם, וכוללים 90 דקות זמן המתנה.","golfFavourite":"מועדף בקרב שחקני גולף","reviewsEyebrow":"ביקורות אורחים","reviewsTitle":"שירות שנשאר<br />זמן רב בזיכרון.","googleReviews":"מבוסס על 387 ביקורות Google מאומתות","trustedBy":"הוזמן על ידי אורחי הריזורטים המובילים ב-Antalya","faqEyebrow":"שאלות נפוצות","faqTitle":"לפני המסע שלכם.","faqIntro":"כל מה שאתם צריכים לדעת על ההעברה הפרטית שלכם משדה התעופה ב-Antalya.","askQuestion":"שאלו שאלה","faqCatArrival":"הגעה והעברה","faqOneQ":"מה קורה במקרה של עיכוב טיסה?","faqOneA":"אינכם צריכים לעשות דבר. אנו עוקבים אחר טיסתכם בזמן אמת ומתאימים את שעת האיסוף שלכם אוטומטית. איננו גובים לעולם על עיכובים של חברת התעופה — השופר שלכם ימתין מתי שלא תנחתו, ו-90 הדקות הראשונות לאחר הנחיתה כלולות תמיד.","faqTwoQ":"אני מגיע בטיסה בינלאומית. כיצד מתבצע האיסוף?","faqTwoA":"לאחר ביקורת הדרכונים ואיסוף המזוודות, עקבו אחר שאר הנוסעים אל אזור ה-Meet & Greet והגיעו לדלפק שלנו J / 777. פשוט מסרו את שמכם לצוות שלנו — זה מספיק. הצוות שלנו יעדכן מיד את השופר שלכם; הוא ייכנס לשדה התעופה ויהיה מוכן בנקודת האיסוף בזמן שאיש הצוות שלנו ילווה אתכם אל הרכב. כל התהליך אורך כ-7–8 דקות.","faqSixQ":"אני מגיע בטיסה פנים-ארצית. היכן אמצא את השופר שלי?","faqSixA":"אזור ה-Meet & Greet זמין באופן בלעדי להגעות בינלאומיות. לכן אנו מטפלים באורחים בטיסות פנים באופן שונה: נשלח לכם לפני ההעברה את מספר הטלפון של השופר שלכם. לאחר הנחיתה, עדכנו אותו בקצרה — הוא יאסוף אתכם באולם ההגעות.","faqSevenQ":"מה עליי לעשות אם אין אף אחד בדלפק J / 777?","faqSevenA":"בדלפק שלנו מוצבים ברציפות שני אנשי צוות, שתפקידם היחיד הוא ללוות אורחים מגיעים אל הרכב שלהם. אם הדלפק אינו מאויש לרגע, זה משום שעמית מלווה כרגע את האורח שלפניכם — כל ליווי אורך כ-7–8 דקות. אנא המתינו כ-10 דקות. אם עד אז אף אחד לא חזר, כתבו לנו ב-WhatsApp: נעדכן מיד את השופר שלכם, נדאג שיעצור בנקודה הקרובה ביותר ונוביל אתכם ישירות לרכב ללא המתנה נוספת.","faqEightQ":"מה קורה אם אצטרך יותר מ-90 דקות כדי לצאת משדה התעופה?","faqEightA":"90 הדקות הראשונות לאחר הנחיתה כלולות ללא תשלום — הרבה יותר מהזמן הדרוש לביקורת דרכונים, מטען ומכס — וחלון זמן זה נדחה אוטומטית במקרה של עיכובי טיסה. רק אם תישארו זמן רב יותר בטרמינל מסיבות שאינן קשורות לטיסתכם, יתווסף דמי חניה של 5 € לכל שעה נוספת. בפועל זה כמעט אף פעם לא קורה: כמעט כל האורחים שלנו כבר בדרכם הרבה קודם.","faqCatJourney":"חזור ונסיעה","faqTenQ":"כיצד אשמור על קשר בהעברת החזור?","faqTenA":"לאחר שתאשרו את תאריך ושעת נסיעת החזור שלכם ב-WhatsApp עם הצוות שלנו, נשייך לכם את הרכב מספר שעות לפני ההעברה ונשלח לכם תמונות שלו ב-WhatsApp — ולפי בקשה גם את מספר הטלפון של השופר שלכם. כאשר השופר שלכם מגיע למלון, הוא מעדכן את הקבלה, שמודיעה לחדרכם ברגע שהרכב מוכן. השופרים שלנו לעולם אינם מתקשרים ישירות לאורחים: כל התקשורת עוברת דרך מוקד ה-WhatsApp המרכזי שלנו, כך שתמיד תדעו בדיוק עם מי אתם מדברים.","faqFourteenQ":"מה קורה אם אאחר בהעברת החזור?","faqFourteenA":"השופר שלכם יגיע למלונכם בשעה שנקבעה וימתין 15 דקות ללא תשלום. אם מסתמן עיכוב, די בהודעה ב-WhatsApp: נבדוק את שעת הטיסה שלכם, נעדכן את השופר שלכם ונתאם איתכם את התהליך. מטרתנו אינה לדחוק בכם, אלא להביא אתכם רגועים לטיסתכם.","faqFifteenQ":"האם אפשריות עצירות ביניים במהלך הנסיעה?","faqFifteenA":"בהחלט. אם ברצונכם לעצור בסופרמרקט או בבית מרקחת, או לעצור לרגע לצילום, פשוט ציינו זאת בעת ההזמנה או ב-WhatsApp — נתכנן את המסלול בהתאם. אם עצירה מרחיקה משמעותית מהמסלול שלכם, נודיע לכם לפני היציאה אם מתווספת עלות; דבר לא יפתיע אתכם בדיעבד.","faqCatPayment":"תשלום ומחיר","faqNineQ":"כיצד אני משלם?","faqNineA":"אתם משלמים לשופר שלכם במזומן בתחילת הנסיעה — תשלום בכרטיס אינו אפשרי. המחירים נקבעים ביורו (EUR): הסכום הקבוע תואם בדיוק למה שראיתם בעת ההזמנה — לרכב, כולל כל אגרות שדה התעופה והחניה, ללא תוספות מאוחרות. מעדיפים לשלם בדולר אמריקאי או בלירה טורקית? כתבו לנו מראש ב-WhatsApp למחיר נפרד, שכן שער החליפין שונה. השופר שלכם יקבל את פניכם, ייטען את המטען ויתקין את כיסאות הבטיחות הרצויים; לאחר התשלום נסיעתכם מתחילה.","faqTwelveQ":"באיזה מטבע אוכל לשלם?","faqTwelveA":"המחירים שלנו נקבעים ביורו (EUR) ומשולמים במזומן; כרטיסים אינם מתקבלים. אם ברצונכם לשלם בדולר אמריקאי או בלירה טורקית, הסכום תלוי בשער היומי — לכן כתבו לנו לפני ההעברה ב-WhatsApp. נמסור לכם מחיר ברור ונעדכן את השופר שלכם, כך שברכב לא יתנהל שום משא ומתן.","faqElevenQ":"האם אוכל לבטל או לשנות את ההזמנה שלי?","faqElevenA":"כן, ותמיד ללא תשלום. מכיוון שאיננו גובים תשלום מראש, אין דבר להשיב ואין המתנה לכסף שלכם — אם התוכניות שלכם משתנות, די בהודעה ב-WhatsApp. שינויים בשעה, במספר הטיסה או בכתובת היעד מטופלים אף הם ללא תוספת תשלום.","faqFiveQ":"האם המחיר המוצג סופי?","faqFiveA":"כן. המחיר מההזמנה שלכם הוא הסכום שתמסרו לשופר שלכם במזומן — לרכב, כולל כל אגרות שדה התעופה, עלויות החניה ו-90 דקות זמן ההמתנה הראשונות. אין עלויות נסתרות.","faqCatVehicle":"רכב ומטען","faqThreeQ":"האם כיסאות בטיחות לילדים זמינים?","faqThreeA":"כן. סלקלים, כיסאות בטיחות ומגביהי מושב זמינים ללא תשלום בהזמנה מראש.","faqThirteenQ":"כמה מטען מותר לי לקחת?","faqThirteenA":"בדרך כלל מזוודה גדולה אחת ופריט מטען יד אחד לאדם. אם יש לכם יותר — מזוודה נוספת, תיק גולף, עגלת תינוק, מגלשי סקי או אופניים — פשוט ציינו זאת בעת ההזמנה; נספק ללא תוספת תשלום רכב בקיבולת מתאימה. החשוב הוא רק שנדע זאת מראש. Mercedes Vito מכיל עד 6 אנשים, ו-Sprinter עד 12.","faqFourQ":"האם ניתן להוביל תיקי גולף ומטען גדול?","faqFourA":"כן. ה-Sprinter וה-Vito אידיאליים לקבוצות גולף. ספרו לנו על המטען שלכם ונתכנן את הרכב המתאים.","contactEyebrow":"המסע שלכם מתחיל כאן","contactTitle":"הגיעו יוצא דופן<br />ל-Antalya.","contactBody":"הזמינו אונליין בפחות משתי דקות או דברו ישירות עם צוות הקונסיירז' שלנו 24/7.","whatsappUs":"WhatsApp","replyMinutes":"מענה בדרך כלל בתוך דקות ספורות","callUs":"התקשרו 24/7","emailUs":"אימייל קונסיירז'","replyHour":"מענה בתוך שעה","footerTagline":"שירותי שופר פרטיים בכל רחבי הריביירה הטורקית.","explore":"גלו","information":"מידע","licensed":"ספק העברות פרטי מורשה · תואם TÜRSAB","bookingConfirmed":"ההזמנה אושרה","referenceLabel":"מספר אסמכתא","weWillContact":"בקשת ההזמנה שלכם נשלחה. ניצור איתכם קשר בתוך 30 דקות.","chatWithUs":"שוחחו איתנו","pickupAddressPlaceholder":"שם המלון, רחוב, מספר בית ושכונה","dropoffAddressPlaceholder":"שם המלון, רחוב, מספר בית ושכונה","hotelNamePlaceholder":"שם המלון או מקום הלינה","stepRoute":"מסלול","stepDetails":"פרטים","stepContact":"צור קשר","reserveForPrice":"שריינו","continue":"המשך","back":"חזרה","perVehicleNoteVito":"לרכב — לא לאדם · עד 6 נוסעים","perVehicleNoteSprinter":"לרכב — לא לאדם · עד 12 נוסעים","perVehicle":"קבוע · לרכב","requestQuote":"בקשו הצעת מחיר","cashConfirmation":"ההזמנה שלכם אושרה. אתם משלמים את הסכום הכולל הקבוע לנהג שלכם במזומן בתחילת הנסיעה.","bookingError":"לא ניתן היה להשלים את ההזמנה שלכם. אנא נסו שוב.","formIncomplete":"אנא מלאו את השדות המסומנים.","requiredField":"שדה זה הוא חובה.","destinationRequired":"אנא בחרו יעד.","dateInvalid":"אנא בחרו את היום או תאריך עתידי.","emailInvalid":"אנא הזינו כתובת אימייל תקינה.","nameInvalid":"אנא הזינו שם מלא תקין.","phoneInvalid":"אנא הזינו מספר תקין הכולל את קידומת המדינה (לדוגמה ‎+49).","flightInvalid":"אנא הזינו מספר טיסה תקין.","pickupAddressRequired":"כתובת האיסוף חייבת להיות באורך של בין 6 ל-160 תווים.","dropoffAddressRequired":"כתובת היעד חייבת להיות באורך של בין 6 ל-160 תווים.","addressesMustDiffer":"כתובת האיסוף וכתובת היעד חייבות להיות שונות.","customDestinationPrice":"המחיר יאושר לאחר בדיקת כתובת היעד.","hotelNameRequired":"אנא הזינו את שם המלון.","roundTripPriceNote":"הלוך ושוב · 2 נסיעות","returnDateRequired":"אנא בחרו תאריך חזור.","returnDateInvalid":"אנא בחרו תאריך חזור ביום הנסיעה הלוך או לאחריו.","returnTimeRequired":"אנא בחרו את שעת האיסוף לחזור.","dailyChauffeur":"רכב + שופר יומי","days":"ימים","dailyChauffeurHint":"שכרו רכב פרטי ושופר לפי יום ללא מגבלת קילומטרים או שעות. הדלק משולם בנפרד.","serviceStartDate":"יום השירות הראשון","serviceEndDate":"יום השירות האחרון","dailyPickupTime":"שעת התחלת השירות","dailyPickupTimeRequired":"אנא בחרו את שעת התחלת השירות היומי.","serviceEndDateRequired":"אנא בחרו את יום השירות האחרון.","servicePeriodInvalid":"אנא בחרו תקופה של בין 1 ל-30 ימים.","arrivalFlightTimeOptional":"שעת נחיתת הטיסה (אופציונלי)","arrivalFlightNumberOptional":"מספר טיסת ההגעה (אופציונלי)","servicePrice":"מחיר השירות","fuelExcludedShort":"ללא דלק","fuelExcludedDetail":"הדלק אינו כלול ומשולם בנפרד לפי השימוש.","departureFlightDate":"תאריך טיסת היציאה (אופציונלי)","departureFlightTime":"שעת טיסת היציאה","departureFlightNumber":"מספר טיסת היציאה","departureFlightDateRequired":"אנא בחרו את תאריך טיסת היציאה.","departureFlightDateInvalid":"תאריך טיסת היציאה אינו יכול להיות לפני תחילת השירות.","dailyQuoteIncludes":"כולל את הרכב והשופר הנבחרים ללא מגבלת קילומטרים או שעות. הדלק אינו כלול.","reviewAndConfirm":"בדקו ואשרו","fuelTermsTitle":"מידע חשוב בנוגע לדלק","fuelTermsBody":"דמי השירות היומיים בסך 150 € כוללים את הרכב והשופר. הדלק אינו כלול. תשלמו את עלות הדלק בפועל בנפרד לפי השימוש.","fuelTermsCheckbox":"אני מבין שהדלק אינו כלול וישולם בנפרד לפי השימוש.","cancel":"ביטול","close":"סגור","understandAndConfirm":"אני מבין ומאשר","dailyCashConfirmation":"שכירת השופר היומית שלכם אושרה. מחיר השירות אינו כולל דלק, המשולם בנפרד לפי השימוש.","campaignBadge":"מבצע אונליין","campaignDiscount":"מחיר מיוחד","campaignScope":"על כל מחירי ההעברות","campaignApplied":"מחיר אונליין מיוחד הוחל","onlineDiscountShort":"מחיר אונליין מיוחד","discountPricesShown":"מוצגים מחירי אונליין מיוחדים","quoteTitle":"לאן תרצו שניקח אתכם?","date":"תאריך","airportReturnPrice":"המחיר יאושר לאחר בדיקת המלון או כתובת האיסוף.","oneGuest":"אורח 1","twoGuests":"2 אורחים","threeGuests":"3 אורחים","fourGuests":"4 אורחים","fiveGuests":"5 אורחים","sixGuests":"6 אורחים","sevenGuests":"7 אורחים","viewQuote":"הצג מחיר","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"תא פרטי ונוח למשפחות ולקבוצות קטנות.","capacitySwitchedSprinter":"מספר הנוסעים והמטען חורגים מקיבולת ה-Vito — הוסב ל-Mercedes Sprinter.","capacityNoVehicle":"מספר כה גדול של נוסעים ומטען חורג מקיבולת הרכבים שלנו. אנא צרו איתנו קשר ב-WhatsApp.","leatherSeats":"מושבי עור פרימיום","water":"מים מינרליים מקוררים","from":"מ-","reviewOne":"„הנהג שלנו המתין למרות עיכוב טיסה של 90 דקות. הרכב היה ללא רבב, נעים וקריר וכבר מצויד בשני כיסאות בטיחות לילדים. בדיוק קבלת הפנים שמשפחתנו הייתה צריכה.“","reviewTwo":"„מהמגע הראשון ב-WhatsApp ועד ההגעה לבלק, ברמה מעולה לחלוטין. בזמן, דיסקרטי ומקצועי מאוד. גם לתיקי הגולף שלנו היה מקום בנוחות.“","reviewThree":"„זה הרגיש כמו שירות שופר של מלון, לא כמו מונית שדה תעופה. תקשורת ברורה, רכב ללא רבב ונהג אדיב בכנות.“","faqReminder":"אנא קראו את מדור השאלות הנפוצות באתר שלנו לפני המסע.","viewFaq":"צפו בשאלות הנפוצות","quoteReady":"ההעברה הפרטית שלכם","journeyTime":"זמן נסיעה","totalFixed":"מחיר כולל","confirmWhatsapp":"אשרו דרך WhatsApp","bookNowCta":"הזמינו עכשיו","backToQuote":"חזרה","yourDetails":"הפרטים שלכם","flightNumber":"מספר טיסה","flightArrivalTime":"שעת הגעה","notesLabel":"בקשות מיוחדות","confirmBooking":"אשרו הזמנה","paymentError":"התשלום נכשל. אנא נסו שוב."},"it":{"navFleet":"Veicoli","navService":"Servizi","navRoutes":"Tratte","navReviews":"Recensioni","navContact":"Contatti","bookNow":"Prenota ora","alwaysAvailable":"Disponibili 24 ore su 24, tutti i giorni","heroEyebrow":"Servizio di autista privato · Antalya","heroTitle":"Transfer aeroportuali premium<br />ad Antalya","heroSubtitle":"Transfer privati con autista dall'aeroporto di Antalya verso Belek, Side, Kemer e Alanya.","bookTransfer":"Prenota il transfer","instantQuote":"Ottieni il prezzo immediato","googleRated":"Valutazione Google","trustedGuests":"Prenotato da oltre 2.500 ospiti","discover":"Scopri","tbLicensed":"Certificato TÜRSAB","tbFlightTracking":"Monitoraggio del volo","tbFixedPrice":"Garanzia di prezzo fisso","tb247Concierge":"Concierge 24/7","tbChildSeats":"Seggiolini per bambini inclusi","privateJourney":"Il tuo viaggio privato","meetGreetNote":"Meet &amp; Greet in aeroporto · Punto d'incontro J / 777","tripType":"Tipo di viaggio","oneWay":"Solo andata","roundTrip":"Andata e ritorno","roundTripHint":"Per l'andata e ritorno, il ritorno segue la stessa tratta in senso inverso.","pickup":"Punto di ritiro","airportOption":"Aeroporto di Antalya (AYT)","hotelOption":"Hotel","privateAddressOption":"Indirizzo privato","destination":"Destinazione","selectDestination":"Seleziona la destinazione","vehicle":"Veicolo","guests":"Ospiti","arrivalDate":"Data di arrivo","arrivalFlightTime":"Orario di arrivo del volo","chooseTime":"Scegli l'orario","arrivalFlightNumber":"Numero del volo in arrivo","returnDate":"Data del ritorno","returnPickupTime":"Orario di ritiro del ritorno","returnFlightNumber":"Numero del volo di ritorno","pickupAddress":"Indirizzo di ritiro completo","dropoffAddress":"Indirizzo di destinazione completo","luggageLabel":"Bagagli grandi","hotelNameLabel":"Nome dell'hotel","childSeatLabel":"Seggiolini per bambini","childSeatNone":"Nessun seggiolino","oneChildSeat":"1 seggiolino","twoChildSeats":"2 seggiolini","threeChildSeats":"3 seggiolini","fourChildSeats":"4 seggiolini","fullName":"Nome completo","phoneLabel":"Telefono / WhatsApp","emailLabel":"E-mail","paymentMethod":"Scegli il metodo di pagamento","cashPayment":"Paga nel veicolo","recommended":"Consigliato","cashPaymentDescription":"Nessun pagamento anticipato online. Paghi l'importo totale fisso al tuo autista in contanti all'inizio del viaggio.","quoteIncludes":"Include Meet & Greet, monitoraggio del volo, parcheggio, 90 minuti di attesa e acqua minerale.","perVehicleNote":"Per veicolo — non per persona · Fino a 6 passeggeri","confirmCashBooking":"Conferma la prenotazione — paga nel veicolo","flightTracking":"Monitoraggio del volo in tempo reale","fixedPrice":"Prezzo fisso garantito","meetGreet":"Accoglienza personale","speakingDrivers":"Autisti che parlano tedesco e inglese","fromAirport":"Dall'aeroporto di Antalya","welcomeEyebrow":"Benvenuti al massimo livello","welcomeTitle":"Viaggiare con stile.<br />Arrivare rilassati.","welcomeBody":"Dal momento del vostro atterraggio, ogni dettaglio è curato. Il nostro team in aeroporto vi accoglie, il vostro autista vi attende al punto di ritiro e i vostri bagagli vengono caricati in un veicolo privato accuratamente preparato.","ourStandards":"I nostri standard di servizio","concierge":"Servizio concierge","guestsWelcomed":"Ospiti accolti","guestRating":"Valutazione media","privateTransfers":"Transfer privati","fleetEyebrow":"La nostra flotta","fleetTitle":"Il vostro spazio privato,<br />curato in ogni dettaglio.","fleetIntro":"Viaggiate comodamente con ampio spazio per la famiglia, l'attrezzatura da golf e i bagagli.","signatureFleet":"Flotta Signature","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Trasporto VIP spazioso per gruppi più numerosi, con ampio spazio per passeggeri e bagagli.","passengers":"Passeggeri","suitcases":"Valigie","television":"Televisore a bordo","coldDrinks":"Bevande fredde","snacks":"Snack","childSeats":"Seggiolini per bambini su richiesta","wifi":"Wi-Fi gratuito","nameSignGreeting":"Accoglienza al banco J / 777","reserveVehicle":"Prenota il veicolo","insideVclass":"Interni dello Sprinter","interiorTitle":"Una lounge privata tra<br />aeroporto e hotel.","serviceEyebrow":"Lo standard Antalya VIP","serviceTitle":"Più di un transfer.<br />Un'accoglienza speciale.","serviceIntro":"Attenzione da hotel di lusso, autisti locali esperti e assoluta sicurezza dall'aeroporto al resort.","trackingTitle":"Monitoraggio del volo","trackingBody":"Monitoriamo il vostro volo in tempo reale e adattiamo automaticamente il ritiro, senza costi aggiuntivi.","chauffeurTitle":"Autisti professionisti","chauffeurBody":"Sempre curati, discreti e selezionati per la conoscenza del territorio e il massimo standard di servizio.","greetTitle":"Meet & Greet","greetBody":"In caso di arrivi internazionali, il nostro team in aeroporto vi accoglie al banco J / 777, chiama il vostro autista al punto di ritiro e vi aiuta con i bagagli.","supportTitle":"Concierge 24/7","supportBody":"Prima, durante e dopo il vostro viaggio, un referente personale è sempre raggiungibile.","priceTitle":"Prezzi fissi","priceBody":"Il prezzo confermato è il prezzo finale. Tempo di attesa, parcheggio e ritardi del volo sono inclusi.","familyTitle":"Per le famiglie","familyBody":"Seggiolini adeguati, interni spaziosi e assistenza paziente per un arrivo rilassato.","routesEyebrow":"I nostri viaggi più richiesti","routesTitle":"Dall'aeroporto di Antalya<br />alla Riviera Turca.","routesIntro":"Tutti i prezzi si intendono per veicolo, non per persona, e includono 90 minuti di attesa.","golfFavourite":"Preferito dei golfisti","reviewsEyebrow":"Recensioni degli ospiti","reviewsTitle":"Un servizio che resta<br />a lungo nella memoria.","googleReviews":"Basato su 387 recensioni Google verificate","trustedBy":"Prenotato dagli ospiti dei principali resort di Antalya","faqEyebrow":"Domande frequenti","faqTitle":"Prima del vostro viaggio.","faqIntro":"Tutto ciò che dovete sapere sul vostro transfer aeroportuale privato ad Antalya.","askQuestion":"Fai una domanda","faqCatArrival":"Arrivo e transfer","faqOneQ":"Cosa succede in caso di ritardo del volo?","faqOneA":"Non dovete fare nulla. Monitoriamo il vostro volo in tempo reale e adattiamo automaticamente l'orario di ritiro. Non addebitiamo mai i ritardi della compagnia aerea: il vostro autista è presente ogni volta che atterrate, e i primi 90 minuti dopo l'atterraggio sono sempre inclusi.","faqTwoQ":"Arrivo con un volo internazionale. Come avviene il ritiro?","faqTwoA":"Dopo il controllo passaporti e il ritiro bagagli, seguite gli altri passeggeri fino all'area Meet & Greet e raggiungete il nostro banco J / 777. È sufficiente comunicare il vostro nome al nostro personale. Il nostro team informa immediatamente il vostro autista, che entra in aeroporto e si posiziona al punto di ritiro, mentre il nostro incaricato vi accompagna al veicolo. L'intera procedura dura circa 7-8 minuti.","faqSixQ":"Arrivo con un volo nazionale. Dove trovo il mio autista?","faqSixA":"L'area Meet & Greet è riservata esclusivamente agli arrivi internazionali. Per questo motivo assistiamo gli ospiti dei voli nazionali in modo diverso: vi inviamo il numero di telefono del vostro autista prima del transfer. Dopo l'atterraggio, avvisatelo brevemente: verrà a prendervi nella sala arrivi.","faqSevenQ":"Cosa faccio se al banco J / 777 non c'è nessuno?","faqSevenA":"Al nostro banco sono sempre presenti due incaricati il cui unico compito è accompagnare gli ospiti in arrivo al loro veicolo. Se il banco è momentaneamente vuoto, significa che un collega sta accompagnando l'ospite prima di voi: ogni accompagnamento dura circa 7-8 minuti. Vi preghiamo di attendere circa 10 minuti. Se entro questo tempo non è ancora tornato nessuno, scriveteci via WhatsApp: informeremo immediatamente il vostro autista, lo faremo fermare al punto più vicino e vi accompagneremo direttamente alla vostra vettura senza ulteriori attese.","faqEightQ":"Cosa succede se impiego più di 90 minuti per uscire dall'aeroporto?","faqEightA":"I primi 90 minuti dopo l'atterraggio sono inclusi gratuitamente — molto più del tempo necessario per controllo passaporti, bagagli e dogana — e questa finestra si sposta automaticamente in caso di ritardo del volo. Solo se rimanete più a lungo nel terminal per motivi non legati al vostro volo, si aggiunge un contributo per il parcheggio di 5 € per ogni ora ulteriore. Nella pratica ciò non accade quasi mai: quasi tutti i nostri ospiti sono già in viaggio molto prima.","faqCatJourney":"Ritorno e viaggio","faqTenQ":"Come mantengo il contatto durante il transfer di ritorno?","faqTenA":"Non appena avrete confermato data e orario del vostro ritorno via WhatsApp con il nostro team, vi assegneremo un veicolo alcune ore prima del transfer e vi invieremo le sue foto via WhatsApp — su richiesta anche il numero di telefono del vostro autista. Quando il vostro autista raggiunge l'hotel, informa la reception, che avvisa la vostra camera non appena la vettura è pronta. I nostri autisti non chiamano mai direttamente gli ospiti: tutta la comunicazione avviene tramite la nostra assistenza WhatsApp centrale, così sapete sempre con precisione con chi state parlando.","faqFourteenQ":"Cosa succede se sono in ritardo per il transfer di ritorno?","faqFourteenA":"Il vostro autista è presso il vostro hotel all'orario concordato e attende 15 minuti gratuitamente. Se si prospetta un ritardo, basta un messaggio via WhatsApp: verifichiamo l'orario del vostro volo, informiamo il vostro autista e concordiamo con voi la procedura. Il nostro obiettivo non è mettervi fretta, ma portarvi rilassati al vostro volo.","faqFifteenQ":"Sono possibili soste durante il viaggio?","faqFifteenA":"Naturalmente. Se desiderate fermarvi a un supermercato o a una farmacia, oppure sostare brevemente per una foto, basta comunicarlo al momento della prenotazione o via WhatsApp — pianificheremo il percorso di conseguenza. Se una sosta si allontana notevolmente dalla vostra tratta, vi comunicheremo prima della partenza se vi è un supplemento; nessuna sorpresa successiva.","faqCatPayment":"Pagamento e prezzo","faqNineQ":"Come pago?","faqNineA":"Pagate al vostro autista in contanti all'inizio del viaggio: il pagamento con carta non è possibile. I prezzi sono fissati in euro (EUR): l'importo fisso corrisponde esattamente a quanto visto al momento della prenotazione — per veicolo, incluse tutte le tasse aeroportuali e di parcheggio, senza aggiunte successive. Preferite pagare in dollari USA o lire turche? Scriveteci in anticipo via WhatsApp per un prezzo separato, poiché il tasso di cambio è diverso. Il vostro autista vi accoglie, carica i vostri bagagli e installa i seggiolini richiesti; dopo il pagamento inizia il vostro viaggio.","faqTwelveQ":"In quale valuta posso pagare?","faqTwelveA":"I nostri prezzi sono fissati in euro (EUR) e si pagano in contanti; le carte non sono accettate. Se desiderate pagare in dollari USA o lire turche, l'importo dipende dal tasso di cambio giornaliero — per questo scriveteci via WhatsApp prima del vostro transfer. Vi indicheremo un prezzo chiaro e informeremo il vostro autista, così a bordo non si negozia nulla.","faqElevenQ":"Posso annullare o modificare la mia prenotazione?","faqElevenA":"Sì, e sempre gratuitamente. Poiché non richiediamo alcun pagamento anticipato, non c'è nulla da rimborsare né tempi di attesa per il vostro denaro: se i vostri programmi cambiano, basta un messaggio via WhatsApp. Modifiche di orario, numero del volo o indirizzo di destinazione le gestiamo allo stesso modo, senza costi aggiuntivi.","faqFiveQ":"Il prezzo indicato è definitivo?","faqFiveA":"Sì. Il prezzo della vostra prenotazione è l'importo che consegnate in contanti al vostro autista — per veicolo, incluse tutte le tasse aeroportuali, i costi di parcheggio e i primi 90 minuti di attesa. Non ci sono costi nascosti.","faqCatVehicle":"Veicolo e bagagli","faqThreeQ":"Sono disponibili seggiolini per bambini?","faqThreeA":"Sì. Ovetti, seggiolini e rialzi sono disponibili gratuitamente su prenotazione anticipata.","faqThirteenQ":"Quanti bagagli posso portare?","faqThirteenA":"Di norma una valigia grande e un bagaglio a mano per persona. Se avete di più — una valigia aggiuntiva, una sacca da golf, un passeggino, sci o una bicicletta — basta comunicarlo al momento della prenotazione; metteremo a disposizione senza costi aggiuntivi un veicolo con la capacità adeguata. L'importante è solo che lo sappiamo in anticipo. Un Mercedes Vito ospita fino a 6 persone, uno Sprinter fino a 12.","faqFourQ":"È possibile trasportare sacche da golf e bagagli voluminosi?","faqFourA":"Sì. Sprinter e Vito sono ideali per i gruppi di golfisti. Comunicateci i vostri bagagli e pianificheremo il veicolo adeguato.","contactEyebrow":"Il vostro viaggio inizia qui","contactTitle":"Arrivare ad Antalya<br />in modo straordinario.","contactBody":"Prenotate online in meno di due minuti oppure parlate direttamente con il nostro team concierge 24/7.","whatsappUs":"WhatsApp","replyMinutes":"Risposta di solito in pochi minuti","callUs":"Chiama 24/7","emailUs":"E-mail concierge","replyHour":"Risposta entro un'ora","footerTagline":"Servizi di autista privato in tutta la Riviera Turca.","explore":"Scopri","information":"Informazioni","licensed":"Fornitore autorizzato di transfer privati · conforme TÜRSAB","bookingConfirmed":"Prenotazione confermata","referenceLabel":"Riferimento","weWillContact":"La vostra richiesta di prenotazione è stata inviata. Vi ricontatteremo entro 30 minuti.","chatWithUs":"Chatta con noi","pickupAddressPlaceholder":"Nome dell'hotel, via, numero civico e quartiere","dropoffAddressPlaceholder":"Nome dell'hotel, via, numero civico e quartiere","hotelNamePlaceholder":"Nome dell'hotel o della struttura","stepRoute":"Tratta","stepDetails":"Dettagli","stepContact":"Contatti","reserveForPrice":"Prenota","continue":"Continua","back":"Indietro","perVehicleNoteVito":"Per veicolo — non per persona · Fino a 6 passeggeri","perVehicleNoteSprinter":"Per veicolo — non per persona · Fino a 12 passeggeri","perVehicle":"fisso · per veicolo","requestQuote":"Richiedi un preventivo","cashConfirmation":"La tua prenotazione è confermata. Paghi l'importo totale fisso al tuo autista in contanti all'inizio del viaggio.","bookingError":"Non è stato possibile completare la tua prenotazione. Vi preghiamo di riprovare.","formIncomplete":"Vi preghiamo di completare i campi evidenziati.","requiredField":"Questo campo è obbligatorio.","destinationRequired":"Vi preghiamo di selezionare una destinazione.","dateInvalid":"Vi preghiamo di scegliere la data di oggi o una data futura.","emailInvalid":"Vi preghiamo di inserire un indirizzo e-mail valido.","nameInvalid":"Vi preghiamo di inserire un nome completo valido.","phoneInvalid":"Vi preghiamo di inserire un numero valido con il prefisso internazionale (ad esempio +49).","flightInvalid":"Vi preghiamo di inserire un numero di volo valido.","pickupAddressRequired":"L'indirizzo di ritiro deve avere una lunghezza compresa tra 6 e 160 caratteri.","dropoffAddressRequired":"L'indirizzo di destinazione deve avere una lunghezza compresa tra 6 e 160 caratteri.","addressesMustDiffer":"L'indirizzo di ritiro e quello di destinazione devono essere diversi.","customDestinationPrice":"Il prezzo sarà confermato dopo la verifica dell'indirizzo di destinazione.","hotelNameRequired":"Vi preghiamo di inserire il nome dell'hotel.","roundTripPriceNote":"andata e ritorno · 2 tratte","returnDateRequired":"Vi preghiamo di scegliere una data di ritorno.","returnDateInvalid":"Vi preghiamo di scegliere una data di ritorno pari o successiva a quella dell'andata.","returnTimeRequired":"Vi preghiamo di scegliere l'orario di ritiro del ritorno.","dailyChauffeur":"Veicolo + autista a giornata","days":"giorni","dailyChauffeurHint":"Noleggia un veicolo privato con autista a giornata, senza limiti di chilometri o di ore. Il carburante si paga a parte.","serviceStartDate":"Primo giorno di servizio","serviceEndDate":"Ultimo giorno di servizio","dailyPickupTime":"Orario di inizio del servizio","dailyPickupTimeRequired":"Vi preghiamo di selezionare l'orario di inizio del servizio giornaliero.","serviceEndDateRequired":"Vi preghiamo di selezionare l'ultimo giorno di servizio.","servicePeriodInvalid":"Vi preghiamo di selezionare un periodo compreso tra 1 e 30 giorni.","arrivalFlightTimeOptional":"Orario di arrivo del volo (facoltativo)","arrivalFlightNumberOptional":"Numero del volo in arrivo (facoltativo)","servicePrice":"Prezzo del servizio","fuelExcludedShort":"carburante escluso","fuelExcludedDetail":"Il carburante non è incluso e si paga a parte in base all'utilizzo.","departureFlightDate":"Data del volo di partenza (facoltativo)","departureFlightTime":"Orario del volo di partenza","departureFlightNumber":"Numero del volo di partenza","departureFlightDateRequired":"Vi preghiamo di selezionare la data del volo di partenza.","departureFlightDateInvalid":"La data del volo di partenza non può essere anteriore all'inizio del servizio.","dailyQuoteIncludes":"Include il veicolo selezionato e l'autista, senza limiti di chilometri o di ore. Il carburante è escluso.","reviewAndConfirm":"Verifica e conferma","fuelTermsTitle":"Informazioni importanti sul carburante","fuelTermsBody":"La tariffa giornaliera di 150 € per il servizio include il veicolo e l'autista. Il carburante non è incluso. Pagherete separatamente il costo effettivo del carburante in base all'utilizzo.","fuelTermsCheckbox":"Comprendo che il carburante è escluso e sarà pagato separatamente in base all'utilizzo.","cancel":"Annulla","close":"Chiudi","understandAndConfirm":"Ho capito e confermo","dailyCashConfirmation":"Il vostro noleggio con autista a giornata è confermato. Il prezzo del servizio esclude il carburante, che si paga separatamente in base all'utilizzo.","campaignBadge":"Offerta online","campaignDiscount":"Prezzo speciale","campaignScope":"su tutti i prezzi dei transfer","campaignApplied":"Prezzo speciale online applicato","onlineDiscountShort":"Prezzo speciale online","discountPricesShown":"Vengono mostrati i prezzi speciali online","quoteTitle":"Dove desidera essere accompagnato?","date":"Data","airportReturnPrice":"Il prezzo sarà confermato dopo la verifica dell'hotel o dell'indirizzo di ritiro.","oneGuest":"1 ospite","twoGuests":"2 ospiti","threeGuests":"3 ospiti","fourGuests":"4 ospiti","fiveGuests":"5 ospiti","sixGuests":"6 ospiti","sevenGuests":"7 ospiti","viewQuote":"Mostra il prezzo","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Un abitacolo privato e confortevole per famiglie e piccoli gruppi.","capacitySwitchedSprinter":"Passeggeri e bagagli superano la capacità del Vito — passaggio al Mercedes Sprinter.","capacityNoVehicle":"Un numero così elevato di passeggeri e bagagli supera la capacità dei nostri veicoli. Vi preghiamo di contattarci via WhatsApp.","leatherSeats":"Sedili in pelle premium","water":"Acqua minerale fresca","from":"Da","reviewOne":"„Il nostro autista ci ha aspettato nonostante 90 minuti di ritardo del volo. Il veicolo era impeccabile, piacevolmente fresco e già dotato di entrambi i seggiolini per bambini. Esattamente l'accoglienza di cui la nostra famiglia aveva bisogno.“","reviewTwo":"„Dal primo contatto via WhatsApp fino all'arrivo a Belek, assolutamente di prim'ordine. Puntuali, discreti e molto professionali. Anche le nostre sacche da golf hanno trovato posto comodamente.“","reviewThree":"„Sembrava il servizio di autista di un hotel, non un taxi aeroportuale. Comunicazione chiara, un veicolo impeccabile e un autista sinceramente cortese.“","faqReminder":"Vi preghiamo di leggere la sezione FAQ del nostro sito prima del vostro viaggio.","viewFaq":"Vedi le FAQ","quoteReady":"Il vostro transfer privato","journeyTime":"Durata del viaggio","totalFixed":"Prezzo totale","confirmWhatsapp":"Conferma via WhatsApp","bookNowCta":"Prenota ora","backToQuote":"Indietro","yourDetails":"I vostri dati","flightNumber":"Numero del volo","flightArrivalTime":"Orario di arrivo","notesLabel":"Richieste particolari","confirmBooking":"Conferma la prenotazione","paymentError":"Pagamento non riuscito. Vi preghiamo di riprovare."},"hu":{"navFleet":"Járművek","navService":"Szolgáltatás","navRoutes":"Útvonalak","navReviews":"Vélemények","navContact":"Kapcsolat","bookNow":"Foglaljon most","alwaysAvailable":"A nap 24 órájában, minden nap elérhető","heroEyebrow":"Privát sofőrszolgálat · Antalya","heroTitle":"Prémium reptéri transzferek<br />Antalyában","heroSubtitle":"Privát transzferek sofőrrel az antalyai repülőtérről Belekbe, Side-ba, Kemerbe és Alanyába.","bookTransfer":"Transzfer foglalása","instantQuote":"Kérjen azonnali árat","googleRated":"Google-értékelés","trustedGuests":"Több mint 2.500 vendég foglalta","discover":"Fedezze fel","tbLicensed":"TÜRSAB-tanúsított","tbFlightTracking":"Járatkövetés","tbFixedPrice":"Fix ár garancia","tb247Concierge":"24/7 concierge","tbChildSeats":"Gyerekülések ingyen","privateJourney":"Az Ön privát utazása","meetGreetNote":"Reptéri Meet &amp; Greet · Találkozási pont J / 777","tripType":"Utazás típusa","oneWay":"Egyszeri út","roundTrip":"Oda-vissza út","roundTripHint":"Oda-vissza út esetén a visszaút ugyanazon az útvonalon, fordított irányban történik.","pickup":"Felvétel","airportOption":"Antalya repülőtér (AYT)","hotelOption":"Hotel","privateAddressOption":"Magáncím","destination":"Úti cél","selectDestination":"Válassza ki az úti célt","vehicle":"Jármű","guests":"Vendégek","arrivalDate":"Érkezés dátuma","arrivalFlightTime":"A járat érkezési ideje","chooseTime":"Válasszon időpontot","arrivalFlightNumber":"Érkező járat száma","returnDate":"Visszaút dátuma","returnPickupTime":"Visszaút felvételi ideje","returnFlightNumber":"Visszaút járatszáma","pickupAddress":"Teljes felvételi cím","dropoffAddress":"Teljes úti cél cím","luggageLabel":"Nagy poggyász","hotelNameLabel":"Hotel neve","childSeatLabel":"Gyerekülések","childSeatNone":"Nincs gyerekülés","oneChildSeat":"1 gyerekülés","twoChildSeats":"2 gyerekülés","threeChildSeats":"3 gyerekülés","fourChildSeats":"4 gyerekülés","fullName":"Teljes név","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-mail","paymentMethod":"Válasszon fizetési módot","cashPayment":"Fizetés a járműben","recommended":"Ajánlott","cashPaymentDescription":"Nincs online előre fizetés. A fix végösszeget készpénzben fizeti sofőrjének az utazás elején.","quoteIncludes":"Tartalmazza a Meet & Greet szolgáltatást, a járatkövetést, a parkolást, 90 perc várakozási időt és az ásványvizet.","perVehicleNote":"Járművenként — nem személyenként · Legfeljebb 6 utas","confirmCashBooking":"Foglalás megerősítése — fizetés a járműben","flightTracking":"Valós idejű járatkövetés","fixedPrice":"Garantált fix ár","meetGreet":"Személyes fogadás","speakingDrivers":"Németül és angolul beszélő","fromAirport":"Az antalyai repülőtérről","welcomeEyebrow":"Üdvözöljük a legmagasabb színvonalon","welcomeTitle":"Utazzon stílusosan.<br />Érkezzen meg nyugodtan.","welcomeBody":"A landolás pillanatától kezdve minden apró részletre gondolunk. Reptéri csapatunk fogadja Önt, sofőrje a felvételi ponthoz áll, csomagjait pedig egy gondosan előkészített privát járműbe rakodjuk.","ourStandards":"Szolgáltatási színvonalunk","concierge":"Concierge-szolgáltatás","guestsWelcomed":"Fogadott vendégek","guestRating":"Átlagos értékelés","privateTransfers":"Privát transzferek","fleetEyebrow":"Járműparkunk","fleetTitle":"Az Ön privát tere,<br />a legapróbb részletig kidolgozva.","fleetIntro":"Utazzon kényelmesen, bőséges hellyel a család, a golffelszerelés és a poggyász számára.","signatureFleet":"Signature járműpark","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Tágas VIP-szállítás nagyobb csoportoknak, bőséges hellyel az utasok és a csomagok számára.","passengers":"Utasok","suitcases":"Bőröndök","television":"Televízió a járműben","coldDrinks":"Hideg italok","snacks":"Snackek","childSeats":"Gyerekülések kérésre","wifi":"Ingyenes WiFi","nameSignGreeting":"Fogadás a J / 777 pultnál","reserveVehicle":"Jármű foglalása","insideVclass":"A Sprinter belső tere","interiorTitle":"Egy privát lounge a repülőtér<br />és a hotel között.","serviceEyebrow":"Az Antalya VIP színvonal","serviceTitle":"Több mint egy transzfer.<br />Egy különleges fogadás.","serviceIntro":"Hotelszintű figyelmesség, tapasztalt helyi sofőrök és teljes biztonság a repülőtértől a resortig.","trackingTitle":"Járatkövetés","trackingBody":"Valós időben követjük járatát, és a felvételt automatikusan, díjmentesen igazítjuk hozzá.","chauffeurTitle":"Professzionális sofőrök","chauffeurBody":"Mindig ápoltak, diszkrétek, és a helyismeretük, valamint a legmagasabb szolgáltatási színvonaluk alapján válogatva.","greetTitle":"Meet & Greet","greetBody":"Nemzetközi érkezéseknél reptéri csapatunk a J / 777 pultnál fogadja Önt, hívja sofőrjét a felvételi ponthoz, és segít a poggyásszal.","supportTitle":"24/7 concierge","supportBody":"Utazása előtt, közben és után mindig elérhető egy személyes kapcsolattartó.","priceTitle":"Fix árak","priceBody":"A megerősített ár a végleges ár. A várakozási idő, a parkolás és a járatkésések benne foglaltatnak.","familyTitle":"Családoknak","familyBody":"Megfelelő gyerekülések, tágas belső terek és türelmes segítség a nyugodt megérkezéshez.","routesEyebrow":"Legnépszerűbb utazásaink","routesTitle":"Az antalyai repülőtérről<br />a Török Riviérára.","routesIntro":"Minden ár járművenként értendő, nem személyenként, és 90 perc várakozási időt tartalmaz.","golfFavourite":"Golf-kedvenc","reviewsEyebrow":"Vendégvélemények","reviewsTitle":"Olyan szolgáltatás, amely sokáig<br />emlékezetes marad.","googleReviews":"387 ellenőrzött Google-értékelés alapján","trustedBy":"Antalya vezető resortjainak vendégei által foglalva","faqEyebrow":"Gyakran kérdezik","faqTitle":"Utazása előtt.","faqIntro":"Minden, amit tudnia kell az antalyai privát reptéri transzferéről.","askQuestion":"Kérdés feltevése","faqCatArrival":"Érkezés és transzfer","faqOneQ":"Mi történik járatkésés esetén?","faqOneA":"Önnek semmit sem kell tennie. Valós időben követjük járatát, és automatikusan hozzáigazítjuk a felvételi idejét. A légitársaság késéseit soha nem számítjuk fel – sofőrje ott van, bármikor is landol, és a landolás utáni első 90 perc mindig benne foglaltatik.","faqTwoQ":"Nemzetközi járattal érkezem. Hogyan zajlik a felvétel?","faqTwoA":"Az útlevél-ellenőrzés és a poggyászfelvétel után kövesse a többi utast a Meet & Greet területre, és jöjjön a J / 777 pultunkhoz. Egyszerűen mondja meg munkatársainknak a nevét – ez elegendő. Csapatunk azonnal értesíti sofőrjét; ő behajt a repülőtérre, és a felvételi ponton áll, míg munkatársunk a járműhöz kíséri Önt. Az egész folyamat körülbelül 7–8 percet vesz igénybe.","faqSixQ":"Belföldi járattal érkezem. Hol találom a sofőrömet?","faqSixA":"A Meet & Greet terület kizárólag a nemzetközi érkezések számára áll rendelkezésre. A belföldi vendégeket ezért máshogy kezeljük: a transzfer előtt elküldjük Önnek sofőrje telefonszámát. A landolás után röviden jelezzen neki – ő az érkezési csarnokban veszi fel Önt.","faqSevenQ":"Mit tegyek, ha senki sincs a J / 777 pultnál?","faqSevenA":"Pultunknál folyamatosan két munkatárs dolgozik, akiknek egyetlen feladata, hogy az érkező vendégeket a járművükhöz kísérjék. Ha a pult rövid ideig üres, egy kollégánk éppen az Ön előtt érkező vendéget kíséri – minden kíséret körülbelül 7–8 percig tart. Kérjük, várjon körülbelül 10 percet. Ha addig senki sem tér vissza, írjon nekünk WhatsApp-on: azonnal értesítjük sofőrjét, megállítjuk őt a legközelebbi ponton, és minden további várakozás nélkül közvetlenül a járművéhez vezetjük Önt.","faqEightQ":"Mi van, ha 90 percnél tovább tart, míg kijutok a repülőtérről?","faqEightA":"A landolás utáni első 90 perc díjmentesen benne foglaltatik – lényegesen több, mint amennyit az útlevél-ellenőrzés, a poggyász és a vám igényel –, és ez az időkeret járatkésés esetén automatikusan eltolódik. Csak akkor, ha a járatától független okokból marad tovább a terminálon, jön hozzá egy 5 €-os parkolási hozzájárulás minden további megkezdett óráért. A gyakorlatban ez szinte soha nem fordul elő: vendégeink szinte mindegyike jóval korábban úton van.","faqCatJourney":"Visszaút és utazás","faqTenQ":"Hogyan tartok kapcsolatot a visszatranszfer során?","faqTenA":"Amint WhatsApp-on megerősítette csapatunkkal a visszaútja dátumát és időpontját, néhány órával a transzfer előtt kijelöljük járművét, és WhatsApp-on elküldjük róla a fotókat – kérésre sofőrje telefonszámát is. Amikor sofőrje eléri a hotelt, értesíti a recepciót, amely tájékoztatja szobáját, amint a jármű készen áll. Sofőrjeink soha nem hívják közvetlenül a vendégeket: a teljes kommunikáció központi WhatsApp-ügyfélszolgálatunkon keresztül zajlik, így mindig pontosan tudja, kivel beszél.","faqFourteenQ":"Mi történik, ha késem a visszatranszferről?","faqFourteenA":"Sofőrje a megbeszélt időpontban a hotelnél van, és 15 percet díjmentesen vár. Ha késés körvonalazódik, elég egy üzenet WhatsApp-on: ellenőrizzük a repülési idejét, értesítjük sofőrjét, és egyeztetjük Önnel a folyamatot. Célunk nem az, hogy siettessük Önt, hanem hogy nyugodtan eljuttassuk a járatához.","faqFifteenQ":"Lehetségesek-e közbenső megállók az út során?","faqFifteenA":"Természetesen. Ha meg szeretne állni egy szupermarketnél vagy egy gyógyszertárnál, vagy röviden egy fotóért, egyszerűen mondja meg a foglaláskor vagy WhatsApp-on — ennek megfelelően tervezzük az útvonalat. Ha egy megálló jelentősen eltér az útvonalától, indulás előtt megmondjuk, hogy jön-e hozzá valami; utólag semmi sem éri meglepetésként.","faqCatPayment":"Fizetés és ár","faqNineQ":"Hogyan fizetek?","faqNineA":"Az utazás elején készpénzben fizet sofőrjének – kártyás fizetés nem lehetséges. Az árak euróban (EUR) rögzítettek: a fix összeg pontosan annyi, amennyit a foglaláskor látott – járművenként, minden reptéri és parkolási díjjal együtt, utólagos felárak nélkül. Inkább amerikai dollárban vagy török lírában fizetne? Írjon nekünk előre WhatsApp-on egy külön árért, mivel az árfolyam eltér. Sofőrje üdvözli Önt, berakodja poggyászát és beszereli a kért gyereküléseket; a fizetés után indul az utazása.","faqTwelveQ":"Milyen pénznemben fizethetek?","faqTwelveA":"Áraink euróban (EUR) rögzítettek, és készpénzben fizetendők; kártyát nem fogadunk el. Ha amerikai dollárban vagy török lírában szeretne fizetni, az összeg a napi árfolyamtól függ — ezért írjon nekünk transzfere előtt WhatsApp-on. Világos árat adunk Önnek, és értesítjük sofőrjét, így a járműben nincs alkudozás.","faqElevenQ":"Lemondhatom vagy módosíthatom a foglalásomat?","faqElevenA":"Igen, és mindig díjmentesen. Mivel nem kérünk előleget, nincs mit visszatéríteni, és nem kell várni a pénzére — ha megváltoznak a tervei, elég egy üzenet WhatsApp-on. Az időpont, a járatszám vagy az úti cél címének módosítását szintén felár nélkül intézzük.","faqFiveQ":"Végleges-e a megjelenített ár?","faqFiveA":"Igen. A foglalásában szereplő ár az az összeg, amelyet készpénzben átad sofőrjének – járművenként, minden reptéri díjjal, parkolási költséggel és az első 90 perc várakozási idővel együtt. Nincsenek rejtett költségek.","faqCatVehicle":"Jármű és poggyász","faqThreeQ":"Elérhetők-e gyerekülések?","faqThreeA":"Igen. Babahordozók, gyerekülések és ülésmagasítók előrendelés esetén díjmentesen elérhetők.","faqThirteenQ":"Mennyi poggyászt vihetek magammal?","faqThirteenA":"Általában egy nagy bőrönd és egy kézipoggyász személyenként. Ha több van Önnél — egy plusz bőrönd, egy golftáska, egy babakocsi, síléc vagy kerékpár —, egyszerűen mondja meg a foglaláskor; felár nélkül biztosítunk megfelelő kapacitású járművet. Csak az a lényeg, hogy előre tudjuk. Egy Mercedes Vito legfeljebb 6 személyt, egy Sprinter legfeljebb 12-t szállít.","faqFourQ":"Szállíthatók-e golftáskák és nagy poggyász?","faqFourA":"Igen. A Sprinter és a Vito ideális golfcsoportok számára. Adja meg poggyászát, és megtervezzük a megfelelő járművet.","contactEyebrow":"Az utazása itt kezdődik","contactTitle":"Érkezzen meg rendkívüli<br />módon Antalyába.","contactBody":"Foglaljon online kevesebb mint két perc alatt, vagy beszéljen közvetlenül 24/7 concierge-csapatunkkal.","whatsappUs":"WhatsApp","replyMinutes":"Válasz általában néhány percen belül","callUs":"Hívjon 24/7","emailUs":"Concierge e-mail","replyHour":"Válasz egy órán belül","footerTagline":"Privát sofőrszolgálat a teljes Török Riviérán.","explore":"Fedezze fel","information":"Információ","licensed":"Engedéllyel rendelkező privát transzferszolgáltató · TÜRSAB-megfelelő","bookingConfirmed":"Foglalás megerősítve","referenceLabel":"Referencia","weWillContact":"Foglalási kérelmét elküldtük. 30 percen belül jelentkezünk.","chatWithUs":"Csevegjen velünk","pickupAddressPlaceholder":"Hotel neve, utca, házszám és városrész","dropoffAddressPlaceholder":"Hotel neve, utca, házszám és városrész","hotelNamePlaceholder":"Hotel vagy szálláshely neve","stepRoute":"Útvonal","stepDetails":"Részletek","stepContact":"Kapcsolat","reserveForPrice":"Foglalás","continue":"Tovább","back":"Vissza","perVehicleNoteVito":"Járművenként — nem személyenként · Legfeljebb 6 utas","perVehicleNoteSprinter":"Járművenként — nem személyenként · Legfeljebb 12 utas","perVehicle":"fix · járművenként","requestQuote":"Árajánlat kérése","cashConfirmation":"Foglalása megerősítve. A fix végösszeget készpénzben fizeti sofőrjének az utazás elején.","bookingError":"Foglalását nem sikerült véglegesíteni. Kérjük, próbálja újra.","formIncomplete":"Kérjük, töltse ki a kiemelt mezőket.","requiredField":"Ez a mező kötelező.","destinationRequired":"Kérjük, válasszon úti célt.","dateInvalid":"Kérjük, válassza a mai vagy egy jövőbeli dátumot.","emailInvalid":"Kérjük, adjon meg egy érvényes e-mail-címet.","nameInvalid":"Kérjük, adjon meg egy érvényes teljes nevet.","phoneInvalid":"Kérjük, adjon meg egy érvényes számot az országhívószámmal együtt (például +49).","flightInvalid":"Kérjük, adjon meg egy érvényes járatszámot.","pickupAddressRequired":"A felvételi címnek 6 és 160 karakter között kell lennie.","dropoffAddressRequired":"Az úti cél címének 6 és 160 karakter között kell lennie.","addressesMustDiffer":"A felvételi és az úti cél címének különböznie kell.","customDestinationPrice":"Az árat az úti cél címének ellenőrzése után erősítjük meg.","hotelNameRequired":"Kérjük, adja meg a hotel nevét.","roundTripPriceNote":"oda-vissza út · 2 utazás","returnDateRequired":"Kérjük, válasszon visszaút dátumot.","returnDateInvalid":"Kérjük, válasszon az odaúttal azonos vagy azt követő visszaút dátumot.","returnTimeRequired":"Kérjük, válassza ki a visszaút felvételi idejét.","dailyChauffeur":"Napi jármű + sofőr","days":"nap","dailyChauffeurHint":"Béreljen privát járművet és sofőrt napra, kilométer- vagy órakorlát nélkül. Az üzemanyagot külön fizeti.","serviceStartDate":"Első szolgálati nap","serviceEndDate":"Utolsó szolgálati nap","dailyPickupTime":"Szolgálat kezdési ideje","dailyPickupTimeRequired":"Kérjük, válassza ki a napi szolgálat kezdési idejét.","serviceEndDateRequired":"Kérjük, válassza ki az utolsó szolgálati napot.","servicePeriodInvalid":"Kérjük, válasszon 1 és 30 nap közötti időszakot.","arrivalFlightTimeOptional":"A járat érkezési ideje (opcionális)","arrivalFlightNumberOptional":"Érkező járat száma (opcionális)","servicePrice":"Szolgáltatás ára","fuelExcludedShort":"üzemanyag nélkül","fuelExcludedDetail":"Az üzemanyag nincs benne, és a használatnak megfelelően külön fizetendő.","departureFlightDate":"Induló járat dátuma (opcionális)","departureFlightTime":"Induló járat ideje","departureFlightNumber":"Induló járat száma","departureFlightDateRequired":"Kérjük, válassza ki az induló járat dátumát.","departureFlightDateInvalid":"Az induló járat dátuma nem lehet korábbi, mint a szolgálat kezdete.","dailyQuoteIncludes":"Tartalmazza a kiválasztott járművet és sofőrt kilométer- vagy órakorlát nélkül. Az üzemanyag nincs benne.","reviewAndConfirm":"Áttekintés és megerősítés","fuelTermsTitle":"Fontos információ az üzemanyagról","fuelTermsBody":"A napi 150 €-os szolgáltatási díj tartalmazza a járművet és a sofőrt. Az üzemanyag nincs benne. A tényleges üzemanyagköltséget a használatnak megfelelően külön fizeti.","fuelTermsCheckbox":"Megértettem, hogy az üzemanyag nincs benne, és a használat alapján külön fizetendő.","cancel":"Mégse","close":"Bezárás","understandAndConfirm":"Megértettem és megerősítem","dailyCashConfirmation":"Napi sofőrbérlése megerősítve. A szolgáltatás ára nem tartalmazza az üzemanyagot, amelyet a használat alapján külön fizet.","campaignBadge":"Online ajánlat","campaignDiscount":"Kedvezményes ár","campaignScope":"minden transzferárra","campaignApplied":"Online kedvezményes ár alkalmazva","onlineDiscountShort":"Online kedvezményes ár","discountPricesShown":"Az online kedvezményes árak láthatók","quoteTitle":"Hová vihetjük Önt?","date":"Dátum","airportReturnPrice":"Az árat a hotel vagy a felvételi cím ellenőrzése után erősítjük meg.","oneGuest":"1 vendég","twoGuests":"2 vendég","threeGuests":"3 vendég","fourGuests":"4 vendég","fiveGuests":"5 vendég","sixGuests":"6 vendég","sevenGuests":"7 vendég","viewQuote":"Ár megtekintése","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Kényelmes privát kabin családok és kisebb csoportok számára.","capacitySwitchedSprinter":"Az utasok és a poggyász meghaladja a Vito kapacitását — átváltottunk Mercedes Sprinterre.","capacityNoVehicle":"Ennyi utas és poggyász meghaladja járműveink kapacitását. Kérjük, vegye fel velünk a kapcsolatot WhatsApp-on.","leatherSeats":"Prémium bőrülések","water":"Hűtött ásványvíz","from":"Ettől","reviewOne":"„Sofőrünk a 90 perces járatkésés ellenére is várt ránk. A jármű makulátlan, kellemesen hűvös volt, és már be volt szerelve mindkét gyerekülés. Pontosan az a fogadás, amelyre a családunknak szüksége volt.”","reviewTwo":"„Az első WhatsApp-üzenettől a beleki megérkezésig teljesen elsőrangú volt. Pontos, diszkrét és nagyon professzionális. Még a golftáskáink is kényelmesen elfértek.”","reviewThree":"„Olyan érzés volt, mintha egy hotel sofőrszolgálata lenne, nem pedig egy reptéri taxi. Világos kommunikáció, makulátlan jármű és őszintén udvarias sofőr.”","faqReminder":"Kérjük, utazása előtt olvassa el a weboldalunkon található GYIK-részt.","viewFaq":"GYIK megtekintése","quoteReady":"Az Ön privát transzfere","journeyTime":"Utazási idő","totalFixed":"Végösszeg","confirmWhatsapp":"Megerősítés WhatsApp-on","bookNowCta":"Foglaljon most","backToQuote":"Vissza","yourDetails":"Az Ön adatai","flightNumber":"Járatszám","flightArrivalTime":"Érkezési idő","notesLabel":"Különleges kérések","confirmBooking":"Foglalás megerősítése","paymentError":"A fizetés sikertelen. Kérjük, próbálja újra."},"pt":{"navFleet":"Veículos","navService":"Serviço","navRoutes":"Rotas","navReviews":"Avaliações","navContact":"Contacto","bookNow":"Reservar agora","alwaysAvailable":"Disponível 24 horas, todos os dias","heroEyebrow":"Serviço privado de motorista · Antalya","heroTitle":"Transferes premium de aeroporto<br />em Antalya","heroSubtitle":"Transferes privados com motorista do aeroporto de Antalya para Belek, Side, Kemer e Alanya.","bookTransfer":"Reservar transfere","instantQuote":"Obter preço imediato","googleRated":"Avaliação Google","trustedGuests":"Reservado por mais de 2.500 clientes","discover":"Descobrir","tbLicensed":"Certificado TÜRSAB","tbFlightTracking":"Rastreio de voo","tbFixedPrice":"Garantia de preço fixo","tb247Concierge":"Concierge 24/7","tbChildSeats":"Cadeiras para crianças incluídas","privateJourney":"A sua viagem privada","meetGreetNote":"Meet &amp; Greet no aeroporto · Ponto de encontro J / 777","tripType":"Tipo de viagem","oneWay":"Só de ida","roundTrip":"Ida e volta","roundTripHint":"Numa viagem de ida e volta, o regresso é feito pela mesma rota no sentido inverso.","pickup":"Recolha","airportOption":"Aeroporto de Antalya (AYT)","hotelOption":"Hotel","privateAddressOption":"Morada privada","destination":"Destino","selectDestination":"Selecionar destino","vehicle":"Veículo","guests":"Passageiros","arrivalDate":"Data de chegada","arrivalFlightTime":"Hora de chegada do voo","chooseTime":"Escolher hora","arrivalFlightNumber":"Número do voo de chegada","returnDate":"Data de regresso","returnPickupTime":"Hora de recolha do regresso","returnFlightNumber":"Número do voo de regresso","pickupAddress":"Morada de recolha completa","dropoffAddress":"Morada de destino completa","luggageLabel":"Bagagem volumosa","hotelNameLabel":"Nome do hotel","childSeatLabel":"Cadeiras para crianças","childSeatNone":"Sem cadeira para crianças","oneChildSeat":"1 cadeira para crianças","twoChildSeats":"2 cadeiras para crianças","threeChildSeats":"3 cadeiras para crianças","fourChildSeats":"4 cadeiras para crianças","fullName":"Nome completo","phoneLabel":"Telefone / WhatsApp","emailLabel":"E-mail","paymentMethod":"Escolher método de pagamento","cashPayment":"Pagar no veículo","recommended":"Recomendado","cashPaymentDescription":"Sem pagamento antecipado online. Paga o valor total fixo ao seu motorista em dinheiro no início da viagem.","quoteIncludes":"Inclui Meet & Greet, rastreio de voo, estacionamento, 90 minutos de tempo de espera e água mineral.","perVehicleNote":"Por veículo — não por pessoa · Até 6 passageiros","confirmCashBooking":"Confirmar reserva — pagar no veículo","flightTracking":"Rastreio de voo em tempo real","fixedPrice":"Preço fixo garantido","meetGreet":"Receção pessoal","speakingDrivers":"Falam alemão e inglês","fromAirport":"Do aeroporto de Antalya","welcomeEyebrow":"Bem-vindo ao mais alto nível","welcomeTitle":"Viaje com estilo.<br />Chegue descansado.","welcomeBody":"A partir do momento em que aterra, cada detalhe está pensado. A nossa equipa no aeroporto recebe-o, o seu motorista aproxima-se do ponto de recolha e a sua bagagem é colocada num veículo privado cuidadosamente preparado.","ourStandards":"Os nossos padrões de serviço","concierge":"Serviço de concierge","guestsWelcomed":"Clientes recebidos","guestRating":"Avaliação média","privateTransfers":"Transferes privados","fleetEyebrow":"A nossa frota","fleetTitle":"O seu espaço privado,<br />perfeito até ao detalhe.","fleetIntro":"Viaje com conforto e amplo espaço para a família, os sacos de golfe e as malas.","signatureFleet":"Frota Signature","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Transporte VIP espaçoso para grupos maiores, com muito espaço para passageiros e bagagem.","passengers":"Passageiros","suitcases":"Malas","television":"Televisão no veículo","coldDrinks":"Bebidas frias","snacks":"Snacks","childSeats":"Cadeiras para crianças a pedido","wifi":"Wi-Fi gratuito","nameSignGreeting":"Receção no balcão J / 777","reserveVehicle":"Reservar veículo","insideVclass":"Interior do Sprinter","interiorTitle":"Um lounge privado entre<br />o aeroporto e o hotel.","serviceEyebrow":"O padrão Antalya VIP","serviceTitle":"Mais do que um transfere.<br />Uma receção especial.","serviceIntro":"Atenção ao nível de um hotel, motoristas locais experientes e total segurança do aeroporto até ao resort.","trackingTitle":"Rastreio de voo","trackingBody":"Acompanhamos o seu voo em tempo real e ajustamos a recolha de forma automática e gratuita.","chauffeurTitle":"Motoristas profissionais","chauffeurBody":"Sempre cuidados, discretos e selecionados pelo seu conhecimento local e pelo mais alto padrão de serviço.","greetTitle":"Meet & Greet","greetBody":"Nas chegadas internacionais, a nossa equipa no aeroporto recebe-o no balcão J / 777, chama o seu motorista ao ponto de recolha e ajuda com a bagagem.","supportTitle":"Concierge 24/7","supportBody":"Antes, durante e depois da sua viagem, tem sempre um contacto pessoal disponível.","priceTitle":"Preços fixos","priceBody":"O preço confirmado é o preço final. O tempo de espera, o estacionamento e os atrasos de voo estão incluídos.","familyTitle":"Para famílias","familyBody":"Cadeiras para crianças adequadas, interiores espaçosos e ajuda paciente para uma chegada tranquila.","routesEyebrow":"As nossas viagens mais populares","routesTitle":"Do aeroporto de Antalya<br />à Riviera Turca.","routesIntro":"Todos os preços são por veículo, não por pessoa, e incluem 90 minutos de tempo de espera.","golfFavourite":"Favorito dos golfistas","reviewsEyebrow":"Avaliações dos clientes","reviewsTitle":"Um serviço que fica<br />na memória.","googleReviews":"Com base em 387 avaliações Google verificadas","trustedBy":"Reservado por clientes dos principais resorts de Antalya","faqEyebrow":"Perguntas frequentes","faqTitle":"Antes da sua viagem.","faqIntro":"Tudo o que precisa de saber sobre o seu transfere privado de aeroporto em Antalya.","askQuestion":"Fazer uma pergunta","faqCatArrival":"Chegada e transfere","faqOneQ":"O que acontece em caso de atraso do voo?","faqOneA":"Não precisa de fazer nada. Acompanhamos o seu voo em tempo real e ajustamos automaticamente a hora de recolha. Nunca cobramos os atrasos da companhia aérea — o seu motorista está lá sempre que aterrar, e os primeiros 90 minutos após a aterragem estão sempre incluídos.","faqTwoQ":"Chego num voo internacional. Como decorre a recolha?","faqTwoA":"Após o controlo de passaportes e a recolha de bagagem, siga os restantes passageiros até à zona de Meet & Greet e dirija-se ao nosso balcão J / 777. Basta indicar o seu nome à nossa equipa — é suficiente. A nossa equipa informa de imediato o seu motorista; ele entra no aeroporto e fica pronto no ponto de recolha, enquanto o nosso colaborador o acompanha até ao veículo. Todo o processo demora cerca de 7 a 8 minutos.","faqSixQ":"Chego num voo doméstico. Onde encontro o meu motorista?","faqSixA":"A zona de Meet & Greet está disponível exclusivamente para chegadas internacionais. Por isso, tratamos os clientes de voos domésticos de forma diferente: enviamos-lhe o número de telefone do seu motorista antes do transfere. Após a aterragem, avise-o com uma mensagem breve — ele recolhe-o no hall de chegadas.","faqSevenQ":"O que faço se não estiver ninguém no balcão J / 777?","faqSevenA":"No nosso balcão estão sempre dois colaboradores em serviço, cuja única tarefa é acompanhar os clientes que chegam até ao seu veículo. Se o balcão estiver momentaneamente vazio, é porque um colega está a acompanhar o cliente anterior — cada acompanhamento demora cerca de 7 a 8 minutos. Aguarde cerca de 10 minutos. Se ninguém regressar até lá, escreva-nos por WhatsApp: informamos de imediato o seu motorista, pedimos-lhe que pare no ponto mais próximo e conduzimo-lo diretamente ao seu veículo, sem mais esperas.","faqEightQ":"O que acontece se demorar mais de 90 minutos a sair do aeroporto?","faqEightA":"Os primeiros 90 minutos após a aterragem estão incluídos gratuitamente — bem mais do que o necessário para o controlo de passaportes, a bagagem e a alfândega — e este período ajusta-se automaticamente em caso de atrasos de voo. Só se permanecer mais tempo no terminal por motivos alheios ao seu voo é que se aplica uma contribuição de estacionamento de 5 € por cada hora adicional. Na prática, isto quase nunca acontece: quase todos os nossos clientes já estão a caminho muito antes disso.","faqCatJourney":"Regresso e viagem","faqTenQ":"Como mantenho o contacto no transfere de regresso?","faqTenA":"Assim que confirmar a data e a hora do seu regresso com a nossa equipa por WhatsApp, atribuímos-lhe um veículo algumas horas antes do transfere e enviamos-lhe fotografias do mesmo por WhatsApp — e, se desejar, também o número de telefone do seu motorista. Quando o seu motorista chega ao hotel, informa a receção, que avisa o seu quarto assim que o veículo estiver pronto. Os nossos motoristas nunca ligam diretamente aos clientes: toda a comunicação é feita através do nosso apoio central por WhatsApp, para que saiba sempre exatamente com quem está a falar.","faqFourteenQ":"O que acontece se me atrasar no transfere de regresso?","faqFourteenA":"O seu motorista está no seu hotel à hora combinada e aguarda 15 minutos sem custo. Se se perspetivar um atraso, basta uma mensagem por WhatsApp: verificamos a hora do seu voo, informamos o seu motorista e combinamos consigo o procedimento. O nosso objetivo não é apressá-lo, mas levá-lo tranquilamente ao seu voo.","faqFifteenQ":"É possível fazer paragens durante a viagem?","faqFifteenA":"Com certeza. Se quiser parar num supermercado ou numa farmácia, ou fazer uma breve paragem para uma fotografia, basta indicá-lo na reserva ou por WhatsApp — planeamos a rota em conformidade. Se uma paragem se afastar significativamente do seu percurso, informamo-lo antes da partida se houver algum custo adicional; não há surpresas posteriores.","faqCatPayment":"Pagamento e preço","faqNineQ":"Como pago?","faqNineA":"Paga ao seu motorista em dinheiro no início da viagem — não é possível pagar com cartão. Os preços são fixados em euros (EUR): o valor fixo corresponde exatamente ao que viu na reserva — por veículo, incluindo todas as taxas de aeroporto e estacionamento, sem custos posteriores. Prefere pagar em dólares americanos ou em liras turcas? Escreva-nos previamente por WhatsApp para obter um preço separado, uma vez que a taxa de câmbio é diferente. O seu motorista recebe-o, carrega a sua bagagem e instala as cadeiras para crianças que solicitou; após o pagamento, começa a sua viagem.","faqTwelveQ":"Em que moeda posso pagar?","faqTwelveA":"Os nossos preços são fixados em euros (EUR) e pagos em dinheiro; não aceitamos cartões. Se pretender pagar em dólares americanos ou em liras turcas, o valor depende da taxa de câmbio do dia — por isso, escreva-nos por WhatsApp antes do seu transfere. Indicamos-lhe um preço claro e informamos o seu motorista, para que não haja qualquer negociação dentro do veículo.","faqElevenQ":"Posso cancelar ou alterar a minha reserva?","faqElevenA":"Sim, e sempre de forma gratuita. Como não cobramos qualquer pagamento antecipado, não há nada a reembolsar nem tempo de espera pelo seu dinheiro — se os seus planos mudarem, basta uma mensagem por WhatsApp. Alterações de hora, número de voo ou morada de destino são tratadas da mesma forma, sem custo adicional.","faqFiveQ":"O preço apresentado é definitivo?","faqFiveA":"Sim. O preço da sua reserva é o valor que entrega ao seu motorista em dinheiro — por veículo, incluindo todas as taxas de aeroporto, os custos de estacionamento e os primeiros 90 minutos de tempo de espera. Não há custos ocultos.","faqCatVehicle":"Veículo e bagagem","faqThreeQ":"Existem cadeiras para crianças disponíveis?","faqThreeA":"Sim. Alcofas, cadeiras para crianças e assentos elevatórios estão disponíveis gratuitamente mediante reserva prévia.","faqThirteenQ":"Quanta bagagem posso levar?","faqThirteenA":"Em regra, uma mala grande e uma peça de bagagem de mão por pessoa. Se levar mais — uma mala adicional, um saco de golfe, um carrinho de bebé, esquis ou uma bicicleta — basta indicá-lo na reserva; disponibilizamos, sem custo adicional, um veículo com a capacidade adequada. O importante é apenas que saibamos com antecedência. Um Mercedes Vito acomoda até 6 pessoas e um Sprinter até 12.","faqFourQ":"É possível transportar sacos de golfe e bagagem volumosa?","faqFourA":"Sim. O Sprinter e o Vito são ideais para grupos de golfe. Indique-nos a sua bagagem e planeamos o veículo adequado.","contactEyebrow":"A sua viagem começa aqui","contactTitle":"Chegue a Antalya<br />de forma excecional.","contactBody":"Reserve online em menos de dois minutos ou fale diretamente com a nossa equipa de concierge 24/7.","whatsappUs":"WhatsApp","replyMinutes":"Resposta normalmente em poucos minutos","callUs":"Ligar 24/7","emailUs":"E-mail do concierge","replyHour":"Resposta no prazo de uma hora","footerTagline":"Serviços privados de motorista em toda a Riviera Turca.","explore":"Descobrir","information":"Informação","licensed":"Fornecedor licenciado de transferes privados · Conforme TÜRSAB","bookingConfirmed":"Reserva confirmada","referenceLabel":"Referência","weWillContact":"O seu pedido de reserva foi enviado. Entraremos em contacto no prazo de 30 minutos.","chatWithUs":"Fale connosco","pickupAddressPlaceholder":"Nome do hotel, rua, número e bairro","dropoffAddressPlaceholder":"Nome do hotel, rua, número e bairro","hotelNamePlaceholder":"Nome do hotel ou alojamento","stepRoute":"Rota","stepDetails":"Detalhes","stepContact":"Contacto","reserveForPrice":"Reservar","continue":"Continuar","back":"Voltar","perVehicleNoteVito":"Por veículo — não por pessoa · Até 6 passageiros","perVehicleNoteSprinter":"Por veículo — não por pessoa · Até 12 passageiros","perVehicle":"fixo · por veículo","requestQuote":"Pedir um orçamento","cashConfirmation":"A sua reserva está confirmada. Paga o valor total fixo ao seu motorista em dinheiro no início da viagem.","bookingError":"Não foi possível concluir a sua reserva. Tente novamente.","formIncomplete":"Preencha os campos assinalados.","requiredField":"Este campo é obrigatório.","destinationRequired":"Selecione um destino.","dateInvalid":"Escolha a data de hoje ou uma data futura.","emailInvalid":"Introduza um endereço de e-mail válido.","nameInvalid":"Introduza um nome completo válido.","phoneInvalid":"Introduza um número válido, incluindo o indicativo do país (por exemplo +49).","flightInvalid":"Introduza um número de voo válido.","pickupAddressRequired":"A morada de recolha deve ter entre 6 e 160 caracteres.","dropoffAddressRequired":"A morada de destino deve ter entre 6 e 160 caracteres.","addressesMustDiffer":"As moradas de recolha e de destino devem ser diferentes.","customDestinationPrice":"O preço será confirmado após verificação da morada de destino.","hotelNameRequired":"Introduza o nome do hotel.","roundTripPriceNote":"ida e volta · 2 viagens","returnDateRequired":"Escolha uma data de regresso.","returnDateInvalid":"Escolha uma data de regresso igual ou posterior à viagem de ida.","returnTimeRequired":"Escolha a hora de recolha do regresso.","dailyChauffeur":"Veículo + motorista por dia","days":"dias","dailyChauffeurHint":"Contrate um veículo privado com motorista ao dia, sem limite de quilómetros ou horas. O combustível é pago à parte.","serviceStartDate":"Primeiro dia de serviço","serviceEndDate":"Último dia de serviço","dailyPickupTime":"Hora de início do serviço","dailyPickupTimeRequired":"Selecione a hora de início do serviço diário.","serviceEndDateRequired":"Selecione o último dia de serviço.","servicePeriodInvalid":"Selecione um período entre 1 e 30 dias.","arrivalFlightTimeOptional":"Hora de chegada do voo (opcional)","arrivalFlightNumberOptional":"Número do voo de chegada (opcional)","servicePrice":"Preço do serviço","fuelExcludedShort":"combustível não incluído","fuelExcludedDetail":"O combustível não está incluído e é pago à parte de acordo com o consumo.","departureFlightDate":"Data do voo de partida (opcional)","departureFlightTime":"Hora do voo de partida","departureFlightNumber":"Número do voo de partida","departureFlightDateRequired":"Selecione a data do voo de partida.","departureFlightDateInvalid":"A data do voo de partida não pode ser anterior ao início do serviço.","dailyQuoteIncludes":"Inclui o veículo selecionado e o motorista, sem limite de quilómetros ou horas. O combustível não está incluído.","reviewAndConfirm":"Rever e confirmar","fuelTermsTitle":"Informação importante sobre o combustível","fuelTermsBody":"A taxa diária de serviço de 150 € inclui o veículo e o motorista. O combustível não está incluído. Pagará o custo real do combustível à parte, de acordo com o consumo.","fuelTermsCheckbox":"Compreendo que o combustível não está incluído e será pago à parte com base no consumo.","cancel":"Cancelar","close":"Fechar","understandAndConfirm":"Compreendo e confirmo","dailyCashConfirmation":"A sua contratação de motorista ao dia está confirmada. O preço do serviço não inclui combustível, que é pago à parte com base no consumo.","campaignBadge":"Especial Online","campaignDiscount":"Preço especial","campaignScope":"em todos os preços de transfere","campaignApplied":"Preço especial online aplicado","onlineDiscountShort":"Preço especial online","discountPricesShown":"São apresentados os preços especiais online","quoteTitle":"Para onde o podemos levar?","date":"Data","airportReturnPrice":"O preço será confirmado após verificação do hotel ou da morada de recolha.","oneGuest":"1 passageiro","twoGuests":"2 passageiros","threeGuests":"3 passageiros","fourGuests":"4 passageiros","fiveGuests":"5 passageiros","sixGuests":"6 passageiros","sevenGuests":"7 passageiros","viewQuote":"Ver preço","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Uma cabina privada e confortável para famílias e pequenos grupos.","capacitySwitchedSprinter":"Os passageiros e a bagagem excedem a capacidade do Vito — alterado para Mercedes Sprinter.","capacityNoVehicle":"Este número de passageiros e bagagem excede a capacidade dos nossos veículos. Contacte-nos por WhatsApp.","leatherSeats":"Bancos em pele premium","water":"Água mineral fresca","from":"Desde","reviewOne":"„O nosso motorista esperou apesar de um atraso de voo de 90 minutos. O veículo estava impecável, agradavelmente fresco e já equipado com as duas cadeiras para crianças. Exatamente a receção de que a nossa família precisava.“","reviewTwo":"„Do primeiro contacto por WhatsApp até à chegada a Belek, absolutamente excelente. Pontual, discreto e muito profissional. Os nossos sacos de golfe também couberam com folga.“","reviewThree":"„Pareceu o serviço de motorista de um hotel, e não um táxi de aeroporto. Comunicação clara, um veículo impecável e um motorista genuinamente atencioso.“","faqReminder":"Antes da sua viagem, leia a secção de perguntas frequentes no nosso site.","viewFaq":"Ver FAQ","quoteReady":"O seu transfere privado","journeyTime":"Tempo de viagem","totalFixed":"Preço total","confirmWhatsapp":"Confirmar por WhatsApp","bookNowCta":"Reservar agora","backToQuote":"Voltar","yourDetails":"Os seus dados","flightNumber":"Número do voo","flightArrivalTime":"Hora de chegada","notesLabel":"Pedidos especiais","confirmBooking":"Confirmar reserva","paymentError":"O pagamento falhou. Tente novamente."},"ro":{"navFleet":"Vehicule","navService":"Servicii","navRoutes":"Rute","navReviews":"Recenzii","navContact":"Contact","bookNow":"Rezervă acum","alwaysAvailable":"Disponibil 24 de ore, în fiecare zi","heroEyebrow":"Serviciu privat de șofer · Antalya","heroTitle":"Transferuri premium de la aeroport<br />în Antalya","heroSubtitle":"Transferuri private cu șofer de la aeroportul Antalya către Belek, Side, Kemer și Alanya.","bookTransfer":"Rezervă transferul","instantQuote":"Obține prețul instant","googleRated":"Evaluare Google","trustedGuests":"Rezervat de peste 2.500 de oaspeți","discover":"Descoperă","tbLicensed":"Certificat TÜRSAB","tbFlightTracking":"Urmărirea zborului","tbFixedPrice":"Garanția prețului fix","tb247Concierge":"Concierge 24/7","tbChildSeats":"Scaune pentru copii incluse","privateJourney":"Călătoria dumneavoastră privată","meetGreetNote":"Meet &amp; Greet la aeroport · Punct de întâlnire J / 777","tripType":"Tip de călătorie","oneWay":"Doar dus","roundTrip":"Dus-întors","roundTripHint":"În cazul unei călătorii dus-întors, întoarcerea se face pe aceeași rută în sens invers.","pickup":"Preluare","airportOption":"Aeroportul Antalya (AYT)","hotelOption":"Hotel","privateAddressOption":"Adresă privată","destination":"Destinație","selectDestination":"Selectați destinația","vehicle":"Vehicul","guests":"Oaspeți","arrivalDate":"Data sosirii","arrivalFlightTime":"Ora sosirii zborului","chooseTime":"Alegeți ora","arrivalFlightNumber":"Numărul zborului de sosire","returnDate":"Data întoarcerii","returnPickupTime":"Ora de preluare la întoarcere","returnFlightNumber":"Numărul zborului de întoarcere","pickupAddress":"Adresa completă de preluare","dropoffAddress":"Adresa completă de destinație","luggageLabel":"Bagaje voluminoase","hotelNameLabel":"Numele hotelului","childSeatLabel":"Scaune pentru copii","childSeatNone":"Fără scaun pentru copil","oneChildSeat":"1 scaun pentru copil","twoChildSeats":"2 scaune pentru copii","threeChildSeats":"3 scaune pentru copii","fourChildSeats":"4 scaune pentru copii","fullName":"Nume complet","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-mail","paymentMethod":"Alegeți metoda de plată","cashPayment":"Plătiți în vehicul","recommended":"Recomandat","cashPaymentDescription":"Fără plată online în avans. Plătiți suma totală fixă șoferului în numerar la începutul călătoriei.","quoteIncludes":"Include Meet & Greet, urmărirea zborului, parcarea, 90 de minute de așteptare și apă minerală.","perVehicleNote":"Per vehicul — nu per persoană · Până la 6 pasageri","confirmCashBooking":"Confirmă rezervarea — plată în vehicul","flightTracking":"Urmărirea zborului în timp real","fixedPrice":"Preț fix garantat","meetGreet":"Întâmpinare personală","speakingDrivers":"Vorbitori de germană și engleză","fromAirport":"De la aeroportul Antalya","welcomeEyebrow":"Bine ați venit la cel mai înalt nivel","welcomeTitle":"Călătoriți cu stil.<br />Sosiți relaxat.","welcomeBody":"Din momentul aterizării, ne-am gândit la fiecare detaliu. Echipa noastră de la aeroport vă întâmpină, șoferul dumneavoastră trage la punctul de preluare, iar bagajele sunt încărcate într-un vehicul privat atent pregătit.","ourStandards":"Standardele noastre de serviciu","concierge":"Serviciu concierge","guestsWelcomed":"Oaspeți întâmpinați","guestRating":"Evaluare medie","privateTransfers":"Transferuri private","fleetEyebrow":"Flota noastră","fleetTitle":"Spațiul dumneavoastră privat,<br />desăvârșit în fiecare detaliu.","fleetIntro":"Călătoriți confortabil, cu spațiu generos pentru familie, echipament de golf și bagaje.","signatureFleet":"Flota Signature","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Transport VIP spatios pentru grupuri mari, cu mult loc pentru pasageri și bagaje.","passengers":"Pasageri","suitcases":"Valize","television":"Televizor în vehicul","coldDrinks":"Băuturi reci","snacks":"Gustări","childSeats":"Scaune pentru copii la cerere","wifi":"WiFi gratuit","nameSignGreeting":"Întâmpinare la ghișeul J / 777","reserveVehicle":"Rezervă vehiculul","insideVclass":"Interiorul Sprinter","interiorTitle":"Un salon privat între<br />aeroport și hotel.","serviceEyebrow":"Standardul Antalya VIP","serviceTitle":"Mai mult decât un transfer.<br />O întâmpinare deosebită.","serviceIntro":"Atenție la nivel de hotel, șoferi locali experimentați și siguranță absolută de la aeroport până la resort.","trackingTitle":"Urmărirea zborului","trackingBody":"Vă urmărim zborul în timp real și ajustăm automat și gratuit ora de preluare.","chauffeurTitle":"Șoferi profesioniști","chauffeurBody":"Mereu îngrijiți, discreți și aleși pentru cunoașterea zonei și cel mai înalt standard de serviciu.","greetTitle":"Meet & Greet","greetBody":"La sosirile internaționale, echipa noastră de la aeroport vă întâmpină la ghișeul J / 777, cheamă șoferul la punctul de preluare și vă ajută cu bagajele.","supportTitle":"Concierge 24/7","supportBody":"Înainte, în timpul și după călătoria dumneavoastră, o persoană de contact personală este mereu disponibilă.","priceTitle":"Prețuri fixe","priceBody":"Prețul confirmat este prețul final. Timpul de așteptare, parcarea și întârzierile de zbor sunt incluse.","familyTitle":"Pentru familii","familyBody":"Scaune potrivite pentru copii, interioare spațioase și ajutor plin de răbdare pentru o sosire relaxată.","routesEyebrow":"Cele mai populare călătorii ale noastre","routesTitle":"De la aeroportul Antalya<br />către Riviera Turcească.","routesIntro":"Toate prețurile sunt per vehicul, nu per persoană, incluzând 90 de minute de așteptare.","golfFavourite":"Preferatul golfiștilor","reviewsEyebrow":"Recenziile oaspeților","reviewsTitle":"Un serviciu care rămâne<br />mult timp în amintire.","googleReviews":"Pe baza a 387 de recenzii Google verificate","trustedBy":"Rezervat de oaspeți ai celor mai importante resorturi din Antalya","faqEyebrow":"Întrebări frecvente","faqTitle":"Înainte de călătoria dumneavoastră.","faqIntro":"Tot ce trebuie să știți despre transferul dumneavoastră privat de la aeroportul Antalya.","askQuestion":"Pune o întrebare","faqCatArrival":"Sosire și transfer","faqOneQ":"Ce se întâmplă în caz de întârziere a zborului?","faqOneA":"Nu trebuie să faceți nimic. Vă urmărim zborul în timp real și vă ajustăm automat ora de preluare. Nu percepem niciodată taxe pentru întârzierile companiei aeriene – șoferul dumneavoastră este acolo oricând aterizați, iar primele 90 de minute după aterizare sunt întotdeauna incluse.","faqTwoQ":"Sosesc cu un zbor internațional. Cum decurge preluarea?","faqTwoA":"După controlul pașapoartelor și ridicarea bagajelor, urmați ceilalți pasageri către zona Meet & Greet și veniți la ghișeul nostru J / 777. Spuneți-le pur și simplu colegilor noștri numele dumneavoastră – atât este suficient. Echipa noastră vă anunță imediat șoferul; acesta intră în aeroport și așteaptă la punctul de preluare, în timp ce colegul nostru vă însoțește până la vehicul. Întregul proces durează aproximativ 7–8 minute.","faqSixQ":"Sosesc cu un zbor intern. Unde îmi găsesc șoferul?","faqSixA":"Zona Meet & Greet este disponibilă exclusiv pentru sosirile internaționale. De aceea, oaspeții de pe zboruri interne sunt deserviți diferit: vă trimitem numărul de telefon al șoferului înainte de transfer. Anunțați-l scurt după aterizare – vă va prelua din holul de sosiri.","faqSevenQ":"Ce fac dacă nu este nimeni la ghișeul J / 777?","faqSevenA":"La ghișeul nostru sunt permanent doi colegi a căror unică sarcină este să însoțească oaspeții sosiți până la vehiculul lor. Dacă ghișeul este momentan neocupat, un coleg tocmai însoțește oaspetele dinaintea dumneavoastră – fiecare însoțire durează aproximativ 7–8 minute. Vă rugăm să așteptați circa 10 minute. Dacă până atunci nu s-a întors nimeni, scrieți-ne prin WhatsApp: vă anunțăm imediat șoferul, îl punem să oprească în cel mai apropiat punct și vă conducem direct la vehicul, fără altă așteptare.","faqEightQ":"Ce se întâmplă dacă am nevoie de mai mult de 90 de minute să ies din aeroport?","faqEightA":"Primele 90 de minute după aterizare sunt incluse gratuit – considerabil mai mult decât necesită controlul pașapoartelor, bagajele și vama – iar acest interval se decalează automat în caz de întârziere a zborului. Doar dacă rămâneți mai mult în terminal din motive fără legătură cu zborul, se adaugă o contribuție la costul parcării de 5 € pentru fiecare oră suplimentară. În practică, acest lucru nu se întâmplă aproape niciodată: aproape toți oaspeții noștri sunt pe drum cu mult înainte.","faqCatJourney":"Întoarcere și călătorie","faqTenQ":"Cum păstrez legătura la transferul de întoarcere?","faqTenA":"De îndată ce ați confirmat data și ora întoarcerii prin WhatsApp cu echipa noastră, vă alocăm vehiculul cu câteva ore înainte de transfer și vă trimitem fotografii cu acesta prin WhatsApp – la cerere și numărul de telefon al șoferului. Când șoferul ajunge la hotel, informează recepția, care vă anunță camera de îndată ce vehiculul este pregătit. Șoferii noștri nu sună niciodată direct oaspeții: întreaga comunicare se desfășoară prin serviciul nostru central WhatsApp, astfel încât să știți întotdeauna exact cu cine vorbiți.","faqFourteenQ":"Ce se întâmplă dacă întârzii la transferul de întoarcere?","faqFourteenA":"Șoferul dumneavoastră este la hotel la ora stabilită și așteaptă 15 minute gratuit. Dacă se conturează o întârziere, un mesaj prin WhatsApp este suficient: vă verificăm ora zborului, vă informăm șoferul și stabilim împreună cu dumneavoastră programul. Scopul nostru nu este să vă grăbim, ci să vă ducem relaxat la zbor.","faqFifteenQ":"Sunt posibile opriri intermediare în timpul călătoriei?","faqFifteenA":"Bineînțeles. Dacă doriți să opriți la un supermarket sau la o farmacie ori să vă opriți scurt pentru o fotografie, spuneți-ne pur și simplu la rezervare sau prin WhatsApp — planificăm ruta în consecință. Dacă o oprire vă abate considerabil de la traseu, vă spunem înainte de plecare dacă se adaugă ceva; nimic nu vă surprinde ulterior.","faqCatPayment":"Plată și preț","faqNineQ":"Cum plătesc?","faqNineA":"Plătiți șoferului dumneavoastră în numerar la începutul călătoriei – plata cu cardul nu este posibilă. Prețurile sunt stabilite în euro (EUR): suma fixă corespunde exact cu ceea ce ați văzut la rezervare – per vehicul, incluzând toate taxele de aeroport și de parcare, fără suplimente ulterioare. Preferați să plătiți în dolari americani sau lire turcești? Scrieți-ne în prealabil prin WhatsApp pentru un preț separat, deoarece cursul de schimb diferă. Șoferul dumneavoastră vă întâmpină, vă încarcă bagajele și montează scaunele pentru copii dorite; după plată începe călătoria.","faqTwelveQ":"În ce monedă pot plăti?","faqTwelveA":"Prețurile noastre sunt stabilite în euro (EUR) și se plătesc în numerar; cardurile nu sunt acceptate. Dacă doriți să plătiți în dolari americani sau lire turcești, suma depinde de cursul zilei — de aceea scrieți-ne înainte de transfer prin WhatsApp. Vă comunicăm un preț clar și vă informăm șoferul, astfel încât în vehicul să nu se negocieze nimic.","faqElevenQ":"Pot să anulez sau să modific rezervarea?","faqElevenA":"Da, și întotdeauna gratuit. Deoarece nu percepem plată în avans, nu există nimic de rambursat și nicio așteptare pentru banii dumneavoastră — dacă planurile se schimbă, un mesaj prin WhatsApp este suficient. Modificările de oră, număr de zbor sau adresă de destinație le rezolvăm la fel, fără costuri suplimentare.","faqFiveQ":"Prețul afișat este definitiv?","faqFiveA":"Da. Prețul din rezervarea dumneavoastră este suma pe care o dați șoferului în numerar – per vehicul, incluzând toate taxele de aeroport, costurile de parcare și primele 90 de minute de așteptare. Nu există costuri ascunse.","faqCatVehicle":"Vehicul și bagaje","faqThreeQ":"Sunt disponibile scaune pentru copii?","faqThreeA":"Da. Scaunele pentru bebeluși, scaunele pentru copii și înălțătoarele sunt disponibile gratuit la comandă anticipată.","faqThirteenQ":"Câte bagaje pot lua cu mine?","faqThirteenA":"De regulă, o valiză mare și un bagaj de mână de persoană. Dacă aveți mai mult — o valiză suplimentară, o geantă de golf, un cărucior, schiuri sau o bicicletă — spuneți-ne pur și simplu la rezervare; vom pune la dispoziție, fără cost suplimentar, un vehicul cu capacitate potrivită. Important este doar să știm dinainte. Un Mercedes Vito are loc pentru până la 6 persoane, iar un Sprinter pentru până la 12.","faqFourQ":"Pot fi transportate genți de golf și bagaje voluminoase?","faqFourA":"Da. Sprinter și Vito sunt ideale pentru grupurile de golf. Comunicați-ne bagajele dumneavoastră și planificăm vehiculul potrivit.","contactEyebrow":"Călătoria dumneavoastră începe aici","contactTitle":"Sosiți excepțional de bine<br />în Antalya.","contactBody":"Rezervați online în mai puțin de două minute sau vorbiți direct cu echipa noastră de concierge 24/7.","whatsappUs":"WhatsApp","replyMinutes":"Răspuns de obicei în câteva minute","callUs":"Sunați 24/7","emailUs":"E-mail concierge","replyHour":"Răspuns în decurs de o oră","footerTagline":"Servicii private de șofer pe toată Riviera Turcească.","explore":"Descoperă","information":"Informații","licensed":"Furnizor autorizat de transferuri private · conform TÜRSAB","bookingConfirmed":"Rezervare confirmată","referenceLabel":"Referință","weWillContact":"Cererea dumneavoastră de rezervare a fost trimisă. Vă contactăm în decurs de 30 de minute.","chatWithUs":"Discutați cu noi","pickupAddressPlaceholder":"Numele hotelului, strada, numărul și cartierul","dropoffAddressPlaceholder":"Numele hotelului, strada, numărul clădirii și cartierul","hotelNamePlaceholder":"Numele hotelului sau al cazării","stepRoute":"Rută","stepDetails":"Detalii","stepContact":"Contact","reserveForPrice":"Rezervă","continue":"Continuă","back":"Înapoi","perVehicleNoteVito":"Per vehicul — nu per persoană · Până la 6 pasageri","perVehicleNoteSprinter":"Per vehicul — nu per persoană · Până la 12 pasageri","perVehicle":"fix · per vehicul","requestQuote":"Solicitați o ofertă de preț","cashConfirmation":"Rezervarea dumneavoastră este confirmată. Plătiți suma totală fixă șoferului în numerar la începutul călătoriei.","bookingError":"Rezervarea dumneavoastră nu a putut fi finalizată. Vă rugăm să încercați din nou.","formIncomplete":"Vă rugăm să completați câmpurile evidențiate.","requiredField":"Acest câmp este obligatoriu.","destinationRequired":"Vă rugăm să selectați o destinație.","dateInvalid":"Vă rugăm să alegeți data de azi sau o dată viitoare.","emailInvalid":"Vă rugăm să introduceți o adresă de e-mail validă.","nameInvalid":"Vă rugăm să introduceți un nume complet valid.","phoneInvalid":"Vă rugăm să introduceți un număr valid, inclusiv prefixul de țară (de exemplu +49).","flightInvalid":"Vă rugăm să introduceți un număr de zbor valid.","pickupAddressRequired":"Adresa de preluare trebuie să aibă între 6 și 160 de caractere.","dropoffAddressRequired":"Adresa de destinație trebuie să aibă între 6 și 160 de caractere.","addressesMustDiffer":"Adresa de preluare și cea de destinație trebuie să fie diferite.","customDestinationPrice":"Prețul va fi confirmat după verificarea adresei de destinație.","hotelNameRequired":"Vă rugăm să introduceți numele hotelului.","roundTripPriceNote":"dus-întors · 2 călătorii","returnDateRequired":"Vă rugăm să alegeți o dată de întoarcere.","returnDateInvalid":"Vă rugăm să alegeți o dată de întoarcere în ziua călătoriei de dus sau după aceasta.","returnTimeRequired":"Vă rugăm să alegeți ora de preluare la întoarcere.","dailyChauffeur":"Vehicul + șofer cu ziua","days":"zile","dailyChauffeurHint":"Închiriați cu ziua un vehicul și un șofer privat, fără limită de kilometri sau ore. Combustibilul se plătește separat.","serviceStartDate":"Prima zi de serviciu","serviceEndDate":"Ultima zi de serviciu","dailyPickupTime":"Ora de începere a serviciului","dailyPickupTimeRequired":"Vă rugăm să selectați ora de începere a serviciului zilnic.","serviceEndDateRequired":"Vă rugăm să selectați ultima zi de serviciu.","servicePeriodInvalid":"Vă rugăm să selectați o perioadă între 1 și 30 de zile.","arrivalFlightTimeOptional":"Ora sosirii zborului (opțional)","arrivalFlightNumberOptional":"Numărul zborului de sosire (opțional)","servicePrice":"Prețul serviciului","fuelExcludedShort":"combustibil neinclus","fuelExcludedDetail":"Combustibilul nu este inclus și se plătește separat, în funcție de utilizare.","departureFlightDate":"Data zborului de plecare (opțional)","departureFlightTime":"Ora zborului de plecare","departureFlightNumber":"Numărul zborului de plecare","departureFlightDateRequired":"Vă rugăm să selectați data zborului de plecare.","departureFlightDateInvalid":"Data zborului de plecare nu poate fi anterioară începerii serviciului.","dailyQuoteIncludes":"Include vehiculul selectat și șoferul, fără limită de kilometri sau ore. Combustibilul nu este inclus.","reviewAndConfirm":"Verificați și confirmați","fuelTermsTitle":"Informații importante despre combustibil","fuelTermsBody":"Tariful zilnic de serviciu de 150 € include vehiculul și șoferul. Combustibilul nu este inclus. Veți plăti separat costul real al combustibilului, în funcție de utilizare.","fuelTermsCheckbox":"Înțeleg că combustibilul nu este inclus și va fi plătit separat, în funcție de utilizare.","cancel":"Anulează","close":"Închide","understandAndConfirm":"Înțeleg și confirm","dailyCashConfirmation":"Închirierea zilnică cu șofer este confirmată. Prețul serviciului nu include combustibilul, care se plătește separat în funcție de utilizare.","campaignBadge":"Ofertă online","campaignDiscount":"Preț special","campaignScope":"la toate prețurile de transfer","campaignApplied":"Preț special online aplicat","onlineDiscountShort":"Preț special online","discountPricesShown":"Se afișează prețurile speciale online","quoteTitle":"Unde doriți să vă ducem?","date":"Dată","airportReturnPrice":"Prețul va fi confirmat după verificarea hotelului sau a adresei de preluare.","oneGuest":"1 oaspete","twoGuests":"2 oaspeți","threeGuests":"3 oaspeți","fourGuests":"4 oaspeți","fiveGuests":"5 oaspeți","sixGuests":"6 oaspeți","sevenGuests":"7 oaspeți","viewQuote":"Afișează prețul","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"O cabină privată confortabilă pentru familii și grupuri mici.","capacitySwitchedSprinter":"Numărul de pasageri și bagaje depășește capacitatea Vito — s-a comutat pe Mercedes Sprinter.","capacityNoVehicle":"Acest număr de pasageri și bagaje depășește capacitatea vehiculelor noastre. Vă rugăm să ne contactați prin WhatsApp.","leatherSeats":"Scaune premium din piele","water":"Apă minerală răcită","from":"De la","reviewOne":"„Șoferul nostru a așteptat în ciuda unei întârzieri de 90 de minute a zborului. Vehiculul era impecabil, plăcut de răcoros și deja echipat cu ambele scaune pentru copii. Exact întâmpinarea de care familia noastră avea nevoie.”","reviewTwo":"„De la primul contact pe WhatsApp și până la sosirea în Belek, totul a fost de primă clasă. Punctual, discret și foarte profesionist. Chiar și genților noastre de golf le-a fost loc din belșug.”","reviewThree":"„S-a simțit ca serviciul de șofer al unui hotel, nu ca un taxi de aeroport. Comunicare clară, un vehicul impecabil și un șofer sincer politicos.”","faqReminder":"Vă rugăm să citiți secțiunea de întrebări frecvente de pe site-ul nostru înainte de călătorie.","viewFaq":"Vezi întrebările frecvente","quoteReady":"Transferul dumneavoastră privat","journeyTime":"Durata călătoriei","totalFixed":"Preț total","confirmWhatsapp":"Confirmă prin WhatsApp","bookNowCta":"Rezervă acum","backToQuote":"Înapoi","yourDetails":"Datele dumneavoastră","flightNumber":"Numărul zborului","flightArrivalTime":"Ora sosirii","notesLabel":"Cerințe speciale","confirmBooking":"Confirmă rezervarea","paymentError":"Plata a eșuat. Vă rugăm să încercați din nou."},"de":{"navFleet":"Fahrzeuge","navService":"Service","navRoutes":"Strecken","navReviews":"Bewertungen","navContact":"Kontakt","bookNow":"Jetzt buchen","alwaysAvailable":"24 Stunden, jeden Tag erreichbar","heroEyebrow":"Privater Chauffeurservice · Antalya","heroTitle":"Premium Flughafentransfers<br />in Antalya","heroSubtitle":"Private Transfers mit Chauffeur vom Flughafen Antalya nach Belek, Side, Kemer und Alanya.","bookTransfer":"Transfer buchen","instantQuote":"Sofortpreis erhalten","googleRated":"Google-Bewertung","trustedGuests":"Von über 2.500 Gästen gebucht","discover":"Entdecken","tbLicensed":"TÜRSAB-zertifiziert","tbFlightTracking":"Flugverfolgung","tbFixedPrice":"Festpreisgarantie","tb247Concierge":"24/7 Concierge","tbChildSeats":"Kindersitze inklusive","privateJourney":"Ihre private Reise","meetGreetNote":"Airport Meet &amp; Greet · Treffpunkt J / 777","tripType":"Fahrtart","oneWay":"Einfache Fahrt","roundTrip":"Hin- und Rückfahrt","roundTripHint":"Bei Hin- und Rückfahrt erfolgt die Rückfahrt auf derselben Strecke in umgekehrter Richtung.","pickup":"Abholung","airportOption":"Flughafen Antalya (AYT)","hotelOption":"Hotel","privateAddressOption":"Privatadresse","destination":"Zielort","selectDestination":"Ziel auswählen","vehicle":"Fahrzeug","guests":"Gäste","arrivalDate":"Ankunftsdatum","arrivalFlightTime":"Ankunftszeit des Fluges","chooseTime":"Uhrzeit wählen","arrivalFlightNumber":"Ankunftsflugnummer","returnDate":"Rückfahrtdatum","returnPickupTime":"Abholzeit der Rückfahrt","returnFlightNumber":"Rückflugnummer","pickupAddress":"Vollständige Abholadresse","dropoffAddress":"Vollständige Zieladresse","luggageLabel":"Großes Gepäck","hotelNameLabel":"Hotelname","childSeatLabel":"Kindersitze","childSeatNone":"Kein Kindersitz","oneChildSeat":"1 Kindersitz","twoChildSeats":"2 Kindersitze","threeChildSeats":"3 Kindersitze","fourChildSeats":"4 Kindersitze","fullName":"Vollständiger Name","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-Mail","paymentMethod":"Zahlungsart wählen","cashPayment":"Im Fahrzeug bezahlen","recommended":"Empfohlen","cashPaymentDescription":"Keine Online-Vorauszahlung. Den Festpreis zahlen Sie zu Beginn der Fahrt bar an Ihren Chauffeur.","quoteIncludes":"Inklusive Meet & Greet, Flugverfolgung, Parken, 90 Minuten Wartezeit und Mineralwasser.","perVehicleNote":"Pro Fahrzeug — nicht pro Person · Bis zu 6 Personen","confirmCashBooking":"Buchung bestätigen — im Fahrzeug zahlen","flightTracking":"Flugverfolgung in Echtzeit","fixedPrice":"Garantierter Festpreis","meetGreet":"Persönlicher Empfang","speakingDrivers":"Deutsch & Englisch sprechend","fromAirport":"Ab Flughafen Antalya","welcomeEyebrow":"Willkommen auf höchstem Niveau","welcomeTitle":"Stilvoll reisen.<br />Entspannt ankommen.","welcomeBody":"Vom Moment Ihrer Landung an ist an jedes Detail gedacht. Unser Flughafenteam empfängt Sie, Ihr Chauffeur fährt am Abholpunkt vor und Ihr Gepäck wird in ein sorgfältig vorbereitetes Privatfahrzeug geladen.","ourStandards":"Unsere Servicestandards","concierge":"Concierge-Service","guestsWelcomed":"Begrüßte Gäste","guestRating":"Durchschnittliche Bewertung","privateTransfers":"Private Transfers","fleetEyebrow":"Unsere Flotte","fleetTitle":"Ihr privater Raum,<br />vollendet bis ins Detail.","fleetIntro":"Reisen Sie komfortabel mit großzügigem Platz für Familie, Golfgepäck und Koffer.","signatureFleet":"Signature Flotte","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Großzügiger VIP-Transport für größere Gruppen mit viel Platz für Passagiere und Gepäck.","passengers":"Passagiere","suitcases":"Koffer","television":"Fernseher im Fahrzeug","coldDrinks":"Kalte Getränke","snacks":"Snacks","childSeats":"Kindersitze auf Wunsch","wifi":"Kostenloses WLAN","nameSignGreeting":"Empfang am Schalter J / 777","reserveVehicle":"Fahrzeug reservieren","insideVclass":"Im Sprinter Interieur","interiorTitle":"Eine private Lounge zwischen<br />Flughafen und Hotel.","serviceEyebrow":"Der Antalya VIP Standard","serviceTitle":"Mehr als ein Transfer.<br />Ein besonderer Empfang.","serviceIntro":"Aufmerksamkeit auf Hotelniveau, erfahrene lokale Chauffeure und absolute Sicherheit vom Flughafen bis zum Resort.","trackingTitle":"Flugverfolgung","trackingBody":"Wir verfolgen Ihren Flug in Echtzeit und passen die Abholung automatisch und kostenlos an.","chauffeurTitle":"Professionelle Chauffeure","chauffeurBody":"Stets gepflegt, diskret und ausgewählt für Ortskenntnis und höchsten Servicestandard.","greetTitle":"Meet & Greet","greetBody":"Bei internationalen Ankünften empfängt Sie unser Flughafenteam am Schalter J / 777, ruft Ihren Chauffeur zum Abholpunkt und hilft mit dem Gepäck.","supportTitle":"24/7 Concierge","supportBody":"Vor, während und nach Ihrer Reise ist immer ein persönlicher Ansprechpartner erreichbar.","priceTitle":"Festpreise","priceBody":"Der bestätigte Preis ist der Endpreis. Wartezeit, Parken und Flugverspätungen sind inklusive.","familyTitle":"Für Familien","familyBody":"Passende Kindersitze, großzügige Innenräume und geduldige Hilfe für eine entspannte Ankunft.","routesEyebrow":"Unsere beliebtesten Fahrten","routesTitle":"Vom Flughafen Antalya<br />an die Türkische Riviera.","routesIntro":"Alle Preise gelten pro Fahrzeug, nicht pro Person, inklusive 90 Minuten Wartezeit.","golfFavourite":"Golf-Favorit","reviewsEyebrow":"Gästebewertungen","reviewsTitle":"Service, der lange<br />in Erinnerung bleibt.","googleReviews":"Basierend auf 387 verifizierten Google-Bewertungen","trustedBy":"Gebucht von Gästen führender Resorts in Antalya","faqEyebrow":"Häufig gefragt","faqTitle":"Vor Ihrer Reise.","faqIntro":"Alles, was Sie über Ihren privaten Flughafentransfer in Antalya wissen müssen.","askQuestion":"Frage stellen","faqCatArrival":"Ankunft & Transfer","faqOneQ":"Was passiert bei einer Flugverspätung?","faqOneA":"Sie müssen nichts unternehmen. Wir verfolgen Ihren Flug in Echtzeit und passen Ihre Abholzeit automatisch an. Verspätungen der Fluggesellschaft berechnen wir nie – Ihr Chauffeur ist da, wann immer Sie landen, und die ersten 90 Minuten nach der Landung sind immer inklusive.","faqTwoQ":"Ich komme mit einem internationalen Flug an. Wie läuft die Abholung ab?","faqTwoA":"Nach Passkontrolle und Gepäckausgabe folgen Sie den übrigen Passagieren in den Meet & Greet Bereich und kommen zu unserem Schalter J / 777. Nennen Sie unseren Mitarbeitern einfach Ihren Namen – das genügt. Unser Team informiert sofort Ihren Chauffeur; er fährt in den Flughafen ein und steht am Abholpunkt bereit, während unser Mitarbeiter Sie zum Fahrzeug begleitet. Der gesamte Ablauf dauert etwa 7–8 Minuten.","faqSixQ":"Ich komme mit einem Inlandsflug an. Wo finde ich meinen Chauffeur?","faqSixA":"Der Meet & Greet Bereich steht ausschließlich internationalen Ankünften zur Verfügung. Inlandsgäste betreuen wir deshalb anders: Wir senden Ihnen vor dem Transfer die Telefonnummer Ihres Chauffeurs. Geben Sie ihm nach der Landung kurz Bescheid – er holt Sie in der Ankunftshalle ab.","faqSevenQ":"Was tue ich, wenn am Schalter J / 777 niemand ist?","faqSevenA":"An unserem Schalter sind durchgehend zwei Mitarbeiter im Einsatz, deren einzige Aufgabe es ist, ankommende Gäste zu ihrem Fahrzeug zu begleiten. Ist der Schalter kurz unbesetzt, begleitet ein Kollege gerade den Gast vor Ihnen – jede Begleitung dauert etwa 7–8 Minuten. Bitte warten Sie rund 10 Minuten. Ist bis dahin niemand zurück, schreiben Sie uns über WhatsApp: Wir informieren Ihren Chauffeur umgehend, lassen ihn am nächstgelegenen Punkt halten und führen Sie ohne weiteres Warten direkt zu Ihrem Wagen.","faqEightQ":"Was gilt, wenn ich länger als 90 Minuten für den Weg aus dem Flughafen brauche?","faqEightA":"Die ersten 90 Minuten nach der Landung sind kostenfrei enthalten – deutlich mehr, als Passkontrolle, Gepäck und Zoll benötigen – und dieses Zeitfenster verschiebt sich bei Flugverspätungen automatisch. Nur wenn Sie aus Gründen, die nicht mit Ihrem Flug zusammenhängen, länger im Terminal bleiben, kommt ein Parkkostenbeitrag von 5 € je weitere Stunde hinzu. In der Praxis kommt das so gut wie nie vor: Nahezu alle unsere Gäste sind längst vorher unterwegs.","faqCatJourney":"Rückfahrt & Fahrt","faqTenQ":"Wie halte ich beim Rücktransfer Kontakt?","faqTenA":"Sobald Sie Datum und Uhrzeit Ihrer Rückfahrt per WhatsApp mit unserem Team bestätigt haben, teilen wir Ihnen einige Stunden vor dem Transfer Ihr Fahrzeug zu und senden Ihnen Fotos davon über WhatsApp – auf Wunsch auch die Telefonnummer Ihres Chauffeurs. Erreicht Ihr Chauffeur das Hotel, informiert er die Rezeption, die Ihr Zimmer benachrichtigt, sobald der Wagen bereitsteht. Unsere Chauffeure rufen Gäste nie direkt an: Die gesamte Kommunikation läuft über unsere zentrale WhatsApp-Betreuung, sodass Sie immer genau wissen, mit wem Sie sprechen.","faqFourteenQ":"Was passiert, wenn ich mich beim Rücktransfer verspäte?","faqFourteenA":"Ihr Chauffeur ist zur vereinbarten Zeit an Ihrem Hotel und wartet 15 Minuten kostenfrei. Zeichnet sich eine Verzögerung ab, genügt eine Nachricht über WhatsApp: Wir prüfen Ihre Flugzeit, informieren Ihren Chauffeur und stimmen den Ablauf mit Ihnen ab. Unser Ziel ist nicht, Sie zu hetzen, sondern Sie entspannt zu Ihrem Flug zu bringen.","faqFifteenQ":"Sind Zwischenstopps während der Fahrt möglich?","faqFifteenA":"Selbstverständlich. Möchten Sie an einem Supermarkt oder einer Apotheke halten oder kurz für ein Foto anhalten, sagen Sie es einfach bei der Buchung oder über WhatsApp — wir planen die Route entsprechend. Führt ein Halt deutlich von Ihrer Strecke weg, sagen wir Ihnen vor der Abfahrt, ob etwas hinzukommt; nachträglich überrascht Sie nichts.","faqCatPayment":"Zahlung & Preis","faqNineQ":"Wie bezahle ich?","faqNineA":"Sie bezahlen Ihrem Chauffeur zu Beginn der Fahrt bar – Kartenzahlung ist nicht möglich. Die Preise sind in Euro (EUR) festgelegt: Der Festbetrag entspricht genau dem, was Sie bei der Buchung gesehen haben – pro Fahrzeug, inklusive aller Flughafen- und Parkgebühren, ohne spätere Zusätze. Möchten Sie lieber in US-Dollar oder Türkischer Lira zahlen? Schreiben Sie uns vorab über WhatsApp für einen separaten Preis, da der Wechselkurs abweicht. Ihr Chauffeur begrüßt Sie, verlädt Ihr Gepäck und montiert die gewünschten Kindersitze; nach der Zahlung beginnt Ihre Fahrt.","faqTwelveQ":"In welcher Währung kann ich bezahlen?","faqTwelveA":"Unsere Preise sind in Euro (EUR) festgelegt und werden bar bezahlt; Karten werden nicht akzeptiert. Möchten Sie in US-Dollar oder Türkischen Lira zahlen, hängt der Betrag vom Tageskurs ab — schreiben Sie uns deshalb vor Ihrem Transfer über WhatsApp. Wir nennen Ihnen einen klaren Preis und informieren Ihren Chauffeur, sodass im Fahrzeug nichts verhandelt wird.","faqElevenQ":"Kann ich meine Buchung stornieren oder ändern?","faqElevenA":"Ja, und das immer kostenfrei. Da wir keine Vorauszahlung nehmen, gibt es nichts zu erstatten und keine Wartezeit auf Ihr Geld — ändern sich Ihre Pläne, genügt eine Nachricht über WhatsApp. Änderungen von Uhrzeit, Flugnummer oder Zieladresse regeln wir ebenso, ohne Aufpreis.","faqFiveQ":"Ist der angezeigte Preis endgültig?","faqFiveA":"Ja. Der Preis aus Ihrer Buchung ist der Betrag, den Sie Ihrem Chauffeur bar übergeben – pro Fahrzeug, inklusive aller Flughafengebühren, Parkkosten und der ersten 90 Minuten Wartezeit. Es gibt keine versteckten Kosten.","faqCatVehicle":"Fahrzeug & Gepäck","faqThreeQ":"Sind Kindersitze verfügbar?","faqThreeA":"Ja. Babyschalen, Kindersitze und Sitzerhöhungen sind bei Vorbestellung kostenlos verfügbar.","faqThirteenQ":"Wie viel Gepäck darf ich mitnehmen?","faqThirteenA":"In der Regel ein großer Koffer und ein Handgepäckstück pro Person. Haben Sie mehr dabei — einen zusätzlichen Koffer, ein Golfbag, einen Kinderwagen, Ski oder ein Fahrrad — sagen Sie es einfach bei der Buchung; wir stellen ohne Aufpreis ein Fahrzeug mit passender Kapazität. Entscheidend ist nur, dass wir es vorher wissen. Ein Mercedes Vito fasst bis zu 6 Personen, ein Sprinter bis zu 12.","faqFourQ":"Können Golfbags und großes Gepäck transportiert werden?","faqFourA":"Ja. Sprinter und Vito sind ideal für Golfgruppen. Teilen Sie uns Ihr Gepäck mit und wir planen das passende Fahrzeug.","contactEyebrow":"Ihre Reise beginnt hier","contactTitle":"Außergewöhnlich gut<br />in Antalya ankommen.","contactBody":"Buchen Sie in weniger als zwei Minuten online oder sprechen Sie direkt mit unserem 24/7 Concierge-Team.","whatsappUs":"WhatsApp","replyMinutes":"Antwort meist in wenigen Minuten","callUs":"24/7 anrufen","emailUs":"Concierge E-Mail","replyHour":"Antwort innerhalb einer Stunde","footerTagline":"Private Chauffeurservices an der gesamten Türkischen Riviera.","explore":"Entdecken","information":"Information","licensed":"Lizenzierter privater Transferanbieter · TÜRSAB-konform","bookingConfirmed":"Buchung bestätigt","referenceLabel":"Referenz","weWillContact":"Ihre Buchungsanfrage wurde gesendet. Wir melden uns innerhalb von 30 Minuten.","chatWithUs":"Mit uns chatten","pickupAddressPlaceholder":"Hotelname, Straße, Hausnummer und Stadtteil","dropoffAddressPlaceholder":"Hotelname, Straße, Hausnummer und Stadtteil","hotelNamePlaceholder":"Hotel- oder Unterkunftsname","stepRoute":"Route","stepDetails":"Details","stepContact":"Kontakt","reserveForPrice":"Reservieren","continue":"Weiter","back":"Zurück","perVehicleNoteVito":"Pro Fahrzeug — nicht pro Person · Bis zu 6 Personen","perVehicleNoteSprinter":"Pro Fahrzeug — nicht pro Person · Bis zu 12 Personen","perVehicle":"pro Fahrzeug · Festpreis","requestQuote":"Preisangebot anfordern","cashConfirmation":"Ihre Buchung ist bestätigt. Den Festpreis zahlen Sie zu Beginn der Fahrt bar an Ihren Chauffeur.","bookingError":"Ihre Buchung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.","formIncomplete":"Bitte füllen Sie die markierten Felder aus.","requiredField":"Dieses Feld ist erforderlich.","destinationRequired":"Bitte wählen Sie ein Ziel.","dateInvalid":"Bitte wählen Sie heute oder ein zukünftiges Datum.","emailInvalid":"Bitte geben Sie eine gültige E-Mail-Adresse ein.","nameInvalid":"Bitte geben Sie einen gültigen vollständigen Namen ein.","phoneInvalid":"Bitte geben Sie eine gültige Nummer mit Ländervorwahl ein (zum Beispiel +49).","flightInvalid":"Bitte geben Sie eine gültige Flugnummer ein.","pickupAddressRequired":"Die Abholadresse muss zwischen 6 und 160 Zeichen lang sein.","dropoffAddressRequired":"Die Zieladresse muss zwischen 6 und 160 Zeichen lang sein.","addressesMustDiffer":"Abhol- und Zieladresse müssen unterschiedlich sein.","customDestinationPrice":"Der Preis wird nach Prüfung der Zieladresse bestätigt.","hotelNameRequired":"Bitte geben Sie den Hotelnamen ein.","roundTripPriceNote":"Hin- und Rückfahrt · 2 Fahrten","returnDateRequired":"Bitte wählen Sie ein Rückfahrtdatum.","returnDateInvalid":"Bitte wählen Sie ein Rückfahrtdatum am oder nach dem Datum der Hinfahrt.","returnTimeRequired":"Bitte wählen Sie die Abholzeit für die Rückfahrt.","dailyChauffeur":"Fahrzeug + Chauffeur pro Tag","days":"Tage","dailyChauffeurHint":"Mieten Sie Fahrzeug und Chauffeur tageweise ohne Kilometer- oder Stundenlimit. Kraftstoff wird separat bezahlt.","serviceStartDate":"Erster Servicetag","serviceEndDate":"Letzter Servicetag","dailyPickupTime":"Startzeit des Services","dailyPickupTimeRequired":"Bitte wählen Sie die tägliche Startzeit.","serviceEndDateRequired":"Bitte wählen Sie den letzten Servicetag.","servicePeriodInvalid":"Bitte wählen Sie einen Zeitraum von 1 bis 30 Tagen.","arrivalFlightTimeOptional":"Ankunftszeit (optional)","arrivalFlightNumberOptional":"Ankunftsflugnummer (optional)","servicePrice":"Servicepreis","fuelExcludedShort":"Kraftstoff nicht inbegriffen","fuelExcludedDetail":"Kraftstoff ist nicht enthalten und wird je nach Verbrauch separat bezahlt.","departureFlightDate":"Abflugdatum (optional)","departureFlightTime":"Abflugzeit","departureFlightNumber":"Abflugnummer","departureFlightDateRequired":"Bitte wählen Sie das Abflugdatum.","departureFlightDateInvalid":"Das Abflugdatum darf nicht vor Servicebeginn liegen.","dailyQuoteIncludes":"Inklusive Fahrzeug und Chauffeur ohne Kilometer- oder Stundenlimit. Kraftstoff ist nicht enthalten.","reviewAndConfirm":"Prüfen und bestätigen","fuelTermsTitle":"Wichtige Information zum Kraftstoff","fuelTermsBody":"Die Tagesgebühr von 150 € beinhaltet Fahrzeug und Chauffeur. Kraftstoff ist nicht enthalten und wird nach tatsächlichem Verbrauch separat bezahlt.","fuelTermsCheckbox":"Ich verstehe, dass Kraftstoff nicht enthalten ist und nach Verbrauch separat bezahlt wird.","cancel":"Abbrechen","close":"Schließen","understandAndConfirm":"Verstanden und bestätigen","dailyCashConfirmation":"Ihre tägliche Chauffeurbuchung ist bestätigt. Kraftstoff ist nicht enthalten und wird nach Verbrauch separat bezahlt.","campaignBadge":"Online Spezial","campaignDiscount":"Sonderpreis","campaignScope":"auf alle Transferpreise","campaignApplied":"Online-Sonderpreis angewendet","onlineDiscountShort":"Online-Sonderpreis","discountPricesShown":"Online-Sonderpreise werden angezeigt","quoteTitle":"Wohin dürfen wir Sie bringen?","date":"Datum","airportReturnPrice":"Der Preis wird nach Prüfung des Hotels oder der Abholadresse bestätigt.","oneGuest":"1 Gast","twoGuests":"2 Gäste","threeGuests":"3 Gäste","fourGuests":"4 Gäste","fiveGuests":"5 Gäste","sixGuests":"6 Gäste","sevenGuests":"7 Gäste","viewQuote":"Preis anzeigen","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Eine komfortable Privatkabine für Familien und kleine Gruppen.","capacitySwitchedSprinter":"Passagiere und Gepäck übersteigen den Vito — auf Mercedes Sprinter umgestellt.","capacityNoVehicle":"So viele Passagiere und Gepäck übersteigen unsere Fahrzeuge. Bitte kontaktieren Sie uns per WhatsApp.","leatherSeats":"Premium-Ledersitze","water":"Gekühltes Mineralwasser","from":"Ab","reviewOne":"„Unser Fahrer wartete trotz 90 Minuten Flugverspätung. Das Fahrzeug war makellos, angenehm kühl und bereits mit beiden Kindersitzen ausgestattet. Genau der Empfang, den unsere Familie brauchte.“","reviewTwo":"„Vom ersten WhatsApp-Kontakt bis zur Ankunft in Belek absolut erstklassig. Pünktlich, diskret und sehr professionell. Auch unsere Golftaschen hatten bequem Platz.“","reviewThree":"„Das fühlte sich wie der Chauffeurservice eines Hotels an, nicht wie ein Flughafentaxi. Klare Kommunikation, ein makelloses Fahrzeug und ein aufrichtig höflicher Fahrer.“","faqReminder":"Bitte lesen Sie vor Ihrer Reise den FAQ-Bereich auf unserer Website.","viewFaq":"FAQ ansehen","quoteReady":"Ihr privater Transfer","journeyTime":"Fahrzeit","totalFixed":"Gesamtpreis","confirmWhatsapp":"Über WhatsApp bestätigen","bookNowCta":"Jetzt buchen","backToQuote":"Zurück","yourDetails":"Ihre Daten","flightNumber":"Flugnummer","flightArrivalTime":"Ankunftszeit","notesLabel":"Besondere Wünsche","confirmBooking":"Buchung bestätigen","paymentError":"Zahlung fehlgeschlagen. Bitte erneut versuchen."},"tr":{"navFleet":"Araçlar","navService":"Hizmetler","navRoutes":"Rotalar","navReviews":"Yorumlar","navContact":"İletişim","bookNow":"Hemen rezervasyon","alwaysAvailable":"Her gün 24 saat hizmetinizdeyiz","heroEyebrow":"Özel şoför hizmeti · Antalya","heroTitle":"Antalya'da Premium<br />Havalimanı Transferi","heroSubtitle":"Antalya Havalimanı'ndan Belek, Side, Kemer ve Alanya'ya özel şoförlü transfer.","bookTransfer":"Transferinizi ayırtın","instantQuote":"Anında fiyat alın","googleRated":"Google puanı","trustedGuests":"2.500'den fazla misafirin tercihi","discover":"Keşfedin","tbLicensed":"TÜRSAB Lisanslı","tbFlightTracking":"Uçuş Takibi","tbFixedPrice":"Sabit Fiyat","tb247Concierge":"7/24 Concierge","tbChildSeats":"Çocuk Koltuğu Dahil","privateJourney":"Size özel yolculuk","meetGreetNote":"Havalimanı Karşılama · Buluşma noktası J / 777","tripType":"Yolculuk türü","oneWay":"Tek yön","roundTrip":"Gidiş–dönüş","roundTripHint":"Gidiş–dönüş rezervasyonunda dönüş, aynı rotanın ters yönünde gerçekleşir.","pickup":"Alış noktası","airportOption":"Antalya Havalimanı (AYT)","hotelOption":"Otel","privateAddressOption":"Özel adres","destination":"Varış noktası","selectDestination":"Varış noktası seçin","vehicle":"Araç","guests":"Misafir","arrivalDate":"Geliş tarihi","arrivalFlightTime":"Geliş uçuş saati","chooseTime":"Saat seçin","arrivalFlightNumber":"Geliş uçuş numarası","returnDate":"Dönüş tarihi","returnPickupTime":"Dönüş alış saati","returnFlightNumber":"Dönüş uçuş numarası","pickupAddress":"Tam alış adresi","dropoffAddress":"Tam varış adresi","luggageLabel":"Büyük bavul","hotelNameLabel":"Otel ismi","childSeatLabel":"Çocuk koltuğu","childSeatNone":"Çocuk koltuğu istemiyorum","oneChildSeat":"1 çocuk koltuğu","twoChildSeats":"2 çocuk koltuğu","threeChildSeats":"3 çocuk koltuğu","fourChildSeats":"4 çocuk koltuğu","fullName":"Ad Soyad","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-posta","paymentMethod":"Ödeme yöntemini seçin","cashPayment":"Araçta öde","recommended":"Önerilen","cashPaymentDescription":"Online ön ödeme yok. Sabit tutarı yolculuğun başında şoförünüze nakit olarak ödersiniz.","quoteIncludes":"Karşılama, uçuş takibi, otopark, 90 dakika bekleme ve şişe su dahildir.","perVehicleNote":"Araç başına — kişi başına değil · 6 yolcuya kadar","confirmCashBooking":"Rezervasyonu onayla — araçta öde","flightTracking":"Gerçek zamanlı uçuş takibi","fixedPrice":"Sabit fiyat garantisi","meetGreet":"Kişisel karşılama","speakingDrivers":"İngilizce ve Almanca konuşan şoförler","fromAirport":"Antalya Havalimanı'ndan","welcomeEyebrow":"Daha iyi bir karşılamaya hoş geldiniz","welcomeTitle":"Zarafetle seyahat edin.<br />Rahatça varın.","welcomeBody":"Uçağınız indiği andan itibaren her ayrıntı düşünülür. Havalimanı ekibimiz sizi karşılar, şoförünüz aracıyla karşılama noktasına gelir ve bagajlarınız özenle hazırlanmış özel aracınıza yerleştirilir.","ourStandards":"Hizmet standartlarımız","concierge":"Concierge desteği","guestsWelcomed":"Karşılanan misafir","guestRating":"Ortalama misafir puanı","privateTransfers":"Özel transfer","fleetEyebrow":"Araç filomuz","fleetTitle":"Size özel alan,<br />her ayrıntıda kusursuz.","fleetIntro":"Aileniz, golf ekipmanınız ve bagajınız için geniş alan sunan sessiz bir konforla seyahat edin.","signatureFleet":"Seçkin filo","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Kalabalık gruplar için geniş yolcu ve bagaj alanı sunan VIP ulaşım.","passengers":"yolcu","suitcases":"bavul","television":"Araç içi televizyon","coldDrinks":"Soğuk içecekler","snacks":"Atıştırmalıklar","childSeats":"Talep üzerine çocuk koltuğu","wifi":"Ücretsiz WiFi","nameSignGreeting":"J / 777 kontuarında karşılama","reserveVehicle":"Bu aracı ayırtın","insideVclass":"Sprinter'ın içinde","interiorTitle":"Havalimanı ile oteliniz arasında<br />size özel bir lounge.","serviceEyebrow":"Antalya VIP standardı","serviceTitle":"Transferden fazlası.<br />Özenli bir karşılama.","serviceIntro":"Havalimanından otele kadar beş yıldızlı ilgi, deneyimli yerel şoförler ve tam huzur.","trackingTitle":"Uçuş takibi","trackingBody":"Uçuşunuzu gerçek zamanlı takip eder, alış saatinizi hiçbir ek ücret olmadan otomatik olarak ayarlarız.","chauffeurTitle":"Profesyonel şoförler","chauffeurBody":"Bakımlı, gizliliğe önem veren ve yerel bilgisi ile hizmet kalitesi için seçilmiş profesyoneller.","greetTitle":"Karşılama hizmeti","greetBody":"Dış hat gelişlerinde havalimanı ekibimiz sizi J / 777 kontuarında karşılar, şoförünüzü karşılama noktasına çağırır ve bagajınıza yardımcı olur.","supportTitle":"7/24 concierge","supportBody":"Yolculuğunuzdan önce, yolculuk sırasında ve sonrasında telefon veya WhatsApp üzerinden gerçek bir kişiye ulaşabilirsiniz.","priceTitle":"Sabit fiyatlar","priceBody":"Onaylanan fiyat ödeyeceğiniz nihai fiyattır. Bekleme, otopark ve uçuş gecikmeleri dahildir.","familyTitle":"Ailelere hazır","familyBody":"Yaşa uygun çocuk koltukları, geniş kabinler ve rahat bir aile karşılaması için özenli destek.","routesEyebrow":"En çok tercih edilen yolculuklar","routesTitle":"Antalya Havalimanı'ndan<br />Türk Rivierası'na.","routesIntro":"Tüm fiyatlar kişi başı değil, araç başıdır ve 90 dakika bekleme dahildir.","golfFavourite":"Golf misafirlerinin favorisi","reviewsEyebrow":"Misafir yorumları","reviewsTitle":"Varıştan sonra da<br />hatırlanan hizmet.","googleReviews":"Doğrulanmış 387 Google yorumuna göre","trustedBy":"Antalya'nın önde gelen resort misafirlerinin tercihi","faqEyebrow":"Sık sorulanlar","faqTitle":"Seyahatinizden önce.","faqIntro":"Antalya'daki özel havalimanı transferiniz hakkında bilmeniz gereken her şey.","askQuestion":"Bize sorun","faqCatArrival":"Karşılama & Transfer","faqOneQ":"Uçuşum gecikirse ne olur?","faqOneA":"Sizin yapmanız gereken hiçbir şey yok. Uçuşunuzu canlı takip eder, alış saatinizi otomatik olarak güncelleriz. Uçuş kaynaklı gecikmeler için hiçbir ek ücret alınmaz; ne zaman inerseniz inin şoförünüz sizi bekliyor olur ve inişten sonraki ilk 90 dakika her zaman fiyata dahildir.","faqTwoQ":"Dış hat uçuşuyla geliyorum, karşılama nasıl işliyor?","faqTwoA":"Pasaport kontrolü ve bagajınızı aldıktan sonra tüm yolcuların yöneldiği Karşılama (Meet & Greet) alanına ilerleyin ve J / 777 numaralı kontuarımıza gelin. Personelimize adınızı söylemeniz yeterli. Personelimiz aynı anda şoförünüzü bilgilendirir; şoförünüz havalimanına giriş yapıp karşılama noktasındaki yerini alır, siz de personelimiz eşliğinde aracınıza ilerlersiniz. Tüm süreç ortalama 7-8 dakika sürer.","faqSixQ":"Yurt içi uçuşla geliyorum, şoförümü nasıl bulacağım?","faqSixA":"Karşılama (Meet & Greet) alanı yalnızca dış hat yolcuları içindir; iç hatlarda böyle bir alan bulunmaz. Bu nedenle iç hat misafirlerimize transferden önce şoförlerinin telefon numarasını iletiriz. İndiğinizde kendisine kısaca haber vermeniz yeterli; şoförünüz sizi yolcu karşılama bölümünden alır.","faqSevenQ":"J / 777 kontuarında görevli yoksa ne yapmalıyım?","faqSevenA":"Kontuarımızda sürekli iki personelimiz görev yapar ve tek işleri gelen misafirleri araçlarına yönlendirmektir. Kontuarı bir an boş bulursanız bu, personelimizin sizden hemen önce gelen misafiri aracına götürdüğü anlamına gelir; her yönlendirme yaklaşık 7-8 dakika sürer. Lütfen yaklaşık 10 dakika bekleyin. Bu sürenin sonunda hâlâ kimse dönmediyse WhatsApp hattımızdan bize yazın: şoförünüzü anında bilgilendirir, en yakın noktaya park etmesini sağlar ve sizi hiç bekletmeden doğrudan aracınıza ulaştırırız.","faqEightQ":"Havalimanından çıkmam 90 dakikadan uzun sürerse ne olur?","faqEightA":"Uçağınız indikten sonraki ilk 90 dakika ücretsiz olarak fiyata dahildir; pasaport, bagaj ve gümrük için fazlasıyla yeterli bir süredir ve uçuş gecikmelerinde bu süre otomatik olarak kayar. Yalnızca uçuşunuzla ilgisi olmayan bir nedenle terminalde 90 dakikadan uzun kalırsanız, aracınızın otoparkta geçirdiği her ek saat için 5 € otopark katkı bedeli eklenir. Uygulamada bu neredeyse hiç yaşanmaz; misafirlerimizin tamamına yakını bu sürenin çok öncesinde yola çıkar.","faqCatJourney":"Dönüş & Yolculuk","faqTenQ":"Dönüş transferimde iletişimi nasıl kuracağım?","faqTenA":"Dönüş gün ve saatinizi ekibimizle WhatsApp üzerinden teyit ettikten sonra, transferinize saatler kala aracınızı belirler ve size WhatsApp'tan aracın fotoğraflarını gönderiririz; dilerseniz şoförünüzün telefon numarasını da paylaşırız. Şoförünüz belirlenen saatte otelinize ulaştığında resepsiyona haber verir, resepsiyon da odanıza aracınızın hazır olduğunu bildirir. Şoförlerimiz misafirlerimizi doğrudan aramaz; tüm iletişim tek bir noktadan, WhatsApp müşteri destek hattımız üzerinden yürür. Böylece kiminle konuştuğunuzdan her zaman emin olursunuz.","faqFourteenQ":"Dönüş transferime geç kalırsam ne olur?","faqFourteenA":"Şoförünüz belirlenen saatte otelinizde olur ve 15 dakika ücretsiz bekler. Gecikeceğinizi düşünüyorsanız WhatsApp'tan tek bir mesaj yeterli: uçuş saatinizi kontrol eder, şoförünüzü bilgilendirir ve programı sizinle birlikte ayarlarız. Amacımız sizi acele ettirmek değil, uçağınıza rahatça yetiştirmektir.","faqFifteenQ":"Yolculuk sırasında ek durak mümkün mü?","faqFifteenA":"Elbette mümkün. Market, eczane veya kısa bir fotoğraf molası isterseniz rezervasyon sırasında ya da WhatsApp üzerinden belirtmeniz yeterli; güzergâhı buna göre planlarız. Rotanızdan belirgin şekilde sapan uzun bir durak söz konusuysa, ek bir tutar olup olmadığını yola çıkmadan önce net olarak paylaşırız — sonradan eklenen hiçbir kalem olmaz.","faqCatPayment":"Ödeme & Fiyat","faqNineQ":"Ödemeyi nasıl yapıyorum?","faqNineA":"Ödemenizi yolculuğun başında, doğrudan şoförünüze nakit olarak yaparsınız; kart geçmez. Fiyatlar euro (EUR) üzerinden belirlenir: ödeyeceğiniz sabit tutar, rezervasyonda gördüğünüz tutarın aynısıdır – araç başına, tüm havalimanı ve otopark ücretleri dahil, sonradan eklenen kalem yok. Amerikan doları veya Türk lirasıyla ödemek isterseniz, kur farklı olduğundan ayrı bir fiyat için önceden WhatsApp'tan bize yazın. Şoförünüz sizi karşılar, bagajlarınızı yükler, talep ettiyseniz çocuk koltuklarını hazırlar; ödemenizin ardından yolculuğunuz başlar.","faqTwelveQ":"Hangi para birimiyle ödeyebilirim?","faqTwelveA":"Fiyatlarımız euro (EUR) üzerinden belirlenir ve ödeme nakit olarak yapılır; kart geçmez. Amerikan doları veya Türk lirasıyla ödemek isterseniz tutar günün kuruna bağlı olarak değişir; bu nedenle transferinizden önce WhatsApp'tan bize yazın. Size net bir fiyat verir ve şoförünüzü bilgilendiririz — araç içinde pazarlık yapılmaz.","faqElevenQ":"Rezervasyonumu iptal edebilir veya değiştirebilir miyim?","faqElevenA":"Elbette, üstelik tamamen ücretsiz. Ön ödeme almadığımız için iptalde iade edilecek bir tutar ve beklenecek bir iade süreci yoktur — planınız değişirse WhatsApp'tan haber vermeniz yeterli. Saat, uçuş numarası veya varış adresi değişikliklerini de aynı şekilde, ek ücret olmadan yaparız.","faqFiveQ":"Verilen fiyat kesin mi?","faqFiveA":"Evet. Rezervasyonda gördüğünüz tutar, yolculuğun başında şoförünüze nakit ödeyeceğiniz tutardır: araç başına; tüm havalimanı ücretleri, otopark ve inişten sonraki ilk 90 dakikalık bekleme dahil. Gizli ücret yoktur.","faqCatVehicle":"Araç & Bagaj","faqThreeQ":"Çocuk koltuğu var mı?","faqThreeA":"Evet. Bebek koltuğu, çocuk koltuğu ve yükseltici koltuk rezervasyon sırasında ücretsiz olarak talep edilebilir.","faqThirteenQ":"Ne kadar bagaj getirebilirim?","faqThirteenA":"Kural olarak yolcu başına bir büyük valiz ve bir el bagajı. Daha fazlası varsa — ek valiz, golf çantası, bebek arabası, kayak veya bisiklet — rezervasyon sırasında belirtmeniz yeterli; ek ücret almadan uygun kapasitede bir araç planlarız. Önemli olan tek şey, bunu önceden biliyor olmamız. Mercedes Vito 6, Mercedes Sprinter ise 12 yolcuya kadar taşır.","faqFourQ":"Golf çantası ve büyük bagaj taşıyor musunuz?","faqFourA":"Evet. Sprinter ve Vito araçlarımız golf grupları için idealdir. Bagaj bilgilerinizi paylaşın, uygun aracı planlayalım.","contactEyebrow":"Yolculuğunuz burada başlar","contactTitle":"Antalya'ya ayrıcalıklı<br />bir şekilde varın.","contactBody":"İki dakikadan kısa sürede online rezervasyon yapın veya 7/24 concierge ekibimizle doğrudan görüşün.","whatsappUs":"WhatsApp'tan yazın","replyMinutes":"Genellikle birkaç dakika içinde yanıt veririz","callUs":"7/24 arayın","emailUs":"Concierge e-postası","replyHour":"Bir saat içinde yanıt","footerTagline":"Türk Rivierası genelinde özel şoför hizmetleri.","explore":"Keşfedin","information":"Bilgi","licensed":"Lisanslı özel transfer işletmesi · TÜRSAB standartlarına uygun","bookingConfirmed":"Rezervasyon Onaylandı","referenceLabel":"Referans","weWillContact":"Rezervasyon talebiniz gönderildi. 30 dakika içinde sizinle iletişime geçeceğiz.","chatWithUs":"Bize yazın","pickupAddressPlaceholder":"Otel adı, cadde, bina numarası ve ilçe","dropoffAddressPlaceholder":"Otel adı, cadde, bina numarası ve ilçe","hotelNamePlaceholder":"Otel veya konaklama adı","stepRoute":"Rota","stepDetails":"Detaylar","stepContact":"İletişim","reserveForPrice":"Rezerve et","continue":"Devam","back":"Geri","perVehicleNoteVito":"Araç başına — kişi başına değil · 6 yolcuya kadar","perVehicleNoteSprinter":"Araç başına — kişi başına değil · 12 yolcuya kadar","perVehicle":"araç başı · sabit fiyat","requestQuote":"Fiyat teklifi al","cashConfirmation":"Rezervasyonunuz onaylandı. Sabit toplam tutarı yolculuğun başında şoförünüze nakit olarak ödersiniz.","bookingError":"Rezervasyonunuz tamamlanamadı. Lütfen tekrar deneyin.","formIncomplete":"Lütfen işaretli alanları doldurun.","requiredField":"Bu alan zorunludur.","destinationRequired":"Lütfen bir varış noktası seçin.","dateInvalid":"Lütfen bugünü veya gelecekteki bir tarihi seçin.","emailInvalid":"Lütfen geçerli bir e-posta adresi girin.","nameInvalid":"Lütfen geçerli bir ad soyad girin.","phoneInvalid":"Lütfen ülke koduyla birlikte geçerli bir numara girin (örneğin +49).","flightInvalid":"Lütfen geçerli bir uçuş numarası girin.","pickupAddressRequired":"Alış adresi 6–160 karakter arasında olmalıdır.","dropoffAddressRequired":"Varış adresi 6–160 karakter arasında olmalıdır.","addressesMustDiffer":"Alış ve varış adresleri farklı olmalıdır.","customDestinationPrice":"Fiyat, varış adresi kontrol edildikten sonra teyit edilecektir.","hotelNameRequired":"Lütfen otel ismini girin.","roundTripPriceNote":"gidiş–dönüş · 2 yolculuk","returnDateRequired":"Lütfen dönüş tarihini seçin.","returnDateInvalid":"Lütfen gidiş tarihiyle aynı veya daha sonraki bir dönüş tarihi seçin.","returnTimeRequired":"Lütfen dönüş için alış saatini seçin.","dailyChauffeur":"Günlük araç + şoför","days":"gün","dailyChauffeurHint":"Özel araç ve şoförü kilometre ve saat sınırı olmadan günlük kiralayın. Yakıt ayrıca ödenir.","serviceStartDate":"İlk hizmet günü","serviceEndDate":"Son hizmet günü","dailyPickupTime":"Hizmet başlangıç saati","dailyPickupTimeRequired":"Lütfen günlük hizmet başlangıç saatini seçin.","serviceEndDateRequired":"Lütfen son hizmet gününü seçin.","servicePeriodInvalid":"Lütfen 1 ile 30 gün arasında bir süre seçin.","arrivalFlightTimeOptional":"Geliş uçuş saati (isteğe bağlı)","arrivalFlightNumberOptional":"Geliş uçuş numarası (isteğe bağlı)","servicePrice":"Hizmet bedeli","fuelExcludedShort":"yakıt hariç","fuelExcludedDetail":"Yakıt dahil değildir ve kullanıma göre ayrıca ödenir.","departureFlightDate":"Dönüş uçuş tarihi (isteğe bağlı)","departureFlightTime":"Dönüş uçuş saati","departureFlightNumber":"Dönüş uçuş numarası","departureFlightDateRequired":"Lütfen dönüş uçuş tarihini seçin.","departureFlightDateInvalid":"Dönüş uçuş tarihi hizmet başlangıcından önce olamaz.","dailyQuoteIncludes":"Seçilen araç ve şoför, kilometre ve saat sınırı olmadan dahildir. Yakıt hariçtir.","reviewAndConfirm":"İncele ve onayla","fuelTermsTitle":"Yakıt ücreti hakkında önemli bilgi","fuelTermsBody":"Günlük €150 hizmet bedeline araç ve şoför dahildir. Yakıt ücreti dahil değildir. Gerçekleşen yakıt masrafını kullanıma göre ayrıca ödeyeceksiniz.","fuelTermsCheckbox":"Yakıtın dahil olmadığını ve kullanıma göre ayrıca ödeneceğini anladım.","cancel":"Vazgeç","close":"Kapat","understandAndConfirm":"Anladım ve onaylıyorum","dailyCashConfirmation":"Günlük araç ve şoför rezervasyonunuz onaylandı. Hizmet bedeline yakıt dahil değildir; yakıt kullanıma göre ayrıca ödenir.","campaignBadge":"Online'a özel","campaignDiscount":"Özel fiyat","campaignScope":"tüm transfer fiyatlarında","campaignApplied":"Online'a özel fiyat uygulanmıştır","onlineDiscountShort":"Online özel fiyat","discountPricesShown":"Online'a özel fiyatlar gösteriliyor","quoteTitle":"Sizi nereye götürelim?","date":"Tarih","airportReturnPrice":"Fiyat, otel veya alış adresi kontrol edildikten sonra teyit edilecektir.","oneGuest":"1 misafir","twoGuests":"2 misafir","threeGuests":"3 misafir","fourGuests":"4 misafir","fiveGuests":"5 misafir","sixGuests":"6 misafir","sevenGuests":"7 misafir","viewQuote":"Fiyatı görüntüle","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Aileler ve küçük gruplar için konforlu ve özel bir kabin.","capacitySwitchedSprinter":"Yolcu ve bagajınız Vito kapasitesini aşıyor — Mercedes Sprinter'a geçildi.","capacityNoVehicle":"Bu kadar yolcu ve bavul araçlarımızın kapasitesini aşıyor. Lütfen WhatsApp'tan bize ulaşın.","leatherSeats":"Premium deri koltuklar","water":"Soğuk şişe su","from":"Başlangıç","reviewOne":"“Uçağımız 90 dakika gecikmesine rağmen şoförümüz bizi bekliyordu. Aracımız kusursuz, serin ve iki çocuk koltuğu da hazırdı. Ailemizin tam olarak ihtiyaç duyduğu karşılamaydı.”","reviewTwo":"“İlk WhatsApp görüşmesinden Belek'e varışımıza kadar her şey birinci sınıftı. Dakik, gizliliğe önem veren ve son derece profesyonel. Golf çantalarımız da rahatça sığdı.”","reviewThree":"“Bu bir havalimanı taksisinden çok beş yıldızlı otel şoför hizmeti gibiydi. Net iletişim, tertemiz araç ve gerçekten nazik bir şoför.”","faqReminder":"Seyahatinizden önce lütfen sitemizdeki SSS bölümünü inceleyin.","viewFaq":"SSS'yi görüntüle","quoteReady":"Size özel transfer","journeyTime":"Yolculuk süresi","totalFixed":"Toplam sabit fiyat","confirmWhatsapp":"WhatsApp ile onaylayın","bookNowCta":"Rezervasyon yap","backToQuote":"Geri","yourDetails":"Bilgileriniz","flightNumber":"Uçuş numarası","flightArrivalTime":"Varış saati","notesLabel":"Özel istekler","confirmBooking":"Rezervasyonu onayla","paymentError":"Ödeme başarısız. Lütfen tekrar deneyin."},"ru":{"navFleet":"Автопарк","navService":"Сервис","navRoutes":"Маршруты","navReviews":"Отзывы","navContact":"Контакты","bookNow":"Забронировать","alwaysAvailable":"Мы на связи круглосуточно, каждый день","heroEyebrow":"Персональный шофёр · Анталья","heroTitle":"Премиальный трансфер<br />из аэропорта Антальи","heroSubtitle":"Индивидуальные трансферы с водителем из аэропорта Антальи в Белек, Сиде, Кемер и Аланью.","bookTransfer":"Забронировать трансфер","instantQuote":"Узнать цену","googleRated":"Рейтинг Google","trustedGuests":"Нам доверяют более 2 500 гостей","discover":"Подробнее","tbLicensed":"Лицензия TÜRSAB","tbFlightTracking":"Отслеживание рейса","tbFixedPrice":"Фиксированная цена","tb247Concierge":"Консьерж 24/7","tbChildSeats":"Детские кресла в комплекте","privateJourney":"Ваша частная поездка","meetGreetNote":"Встреча в аэропорту · Пункт встречи J / 777","tripType":"Тип поездки","oneWay":"В одну сторону","roundTrip":"Туда и обратно","roundTripHint":"Обратная поездка проходит по тому же маршруту в обратном направлении.","pickup":"Место встречи","airportOption":"Аэропорт Антальи (AYT)","hotelOption":"Отель","privateAddressOption":"Частный адрес","destination":"Направление","selectDestination":"Выберите направление","vehicle":"Автомобиль","guests":"Гости","arrivalDate":"Дата прибытия","arrivalFlightTime":"Время прибытия рейса","chooseTime":"Выберите время","arrivalFlightNumber":"Номер рейса прибытия","returnDate":"Дата возвращения","returnPickupTime":"Время подачи на обратный путь","returnFlightNumber":"Номер обратного рейса","pickupAddress":"Полный адрес подачи","dropoffAddress":"Полный адрес назначения","luggageLabel":"Крупный багаж","hotelNameLabel":"Название отеля","childSeatLabel":"Детские кресла","childSeatNone":"Без детского кресла","oneChildSeat":"1 детское кресло","twoChildSeats":"2 детских кресла","threeChildSeats":"3 детских кресла","fourChildSeats":"4 детских кресла","fullName":"Имя и фамилия","phoneLabel":"Телефон / WhatsApp","emailLabel":"Эл. почта","paymentMethod":"Выберите способ оплаты","cashPayment":"Оплата в автомобиле","recommended":"Рекомендуем","cashPaymentDescription":"Без предоплаты онлайн. Фиксированную сумму вы передаёте водителю наличными в начале поездки.","quoteIncludes":"Включены встреча, отслеживание рейса, парковка, 90 минут ожидания и питьевая вода.","perVehicleNote":"За автомобиль — не за человека · До 6 пассажиров","confirmCashBooking":"Подтвердить — оплата в автомобиле","flightTracking":"Отслеживание рейса","fixedPrice":"Гарантия фиксированной цены","meetGreet":"Персональная встреча","speakingDrivers":"Водители говорят на английском и немецком","fromAirport":"Из аэропорта Антальи","welcomeEyebrow":"Добро пожаловать на новый уровень сервиса","welcomeTitle":"Путешествуйте красиво.<br />Прибывайте без забот.","welcomeBody":"С момента посадки продумана каждая деталь. Наша команда в аэропорту встречает вас, водитель подаёт машину к месту посадки, а багаж загружается в тщательно подготовленный частный автомобиль.","ourStandards":"Наши стандарты сервиса","concierge":"Поддержка консьержа","guestsWelcomed":"Встреченных гостей","guestRating":"Средняя оценка гостей","privateTransfers":"Частные трансферы","fleetEyebrow":"Наш автопарк","fleetTitle":"Ваше личное пространство,<br />безупречное в деталях.","fleetIntro":"Путешествуйте в тишине и комфорте: достаточно места для семьи, багажа и оборудования для гольфа.","signatureFleet":"Фирменный автопарк","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Эталон комфортных групповых поездок: просторный, исключительно тихий салон и всё необходимое для беззаботного прибытия.","passengers":"пассажиров","suitcases":"чемоданов","television":"Телевизор в автомобиле","coldDrinks":"Холодные напитки","snacks":"Закуски","childSeats":"Детские кресла по запросу","wifi":"Бесплатный WiFi","nameSignGreeting":"Встреча у стойки J / 777","reserveVehicle":"Забронировать автомобиль","insideVclass":"Салон Sprinter","interiorTitle":"Персональный лаунж<br />между аэропортом и отелем.","serviceEyebrow":"Стандарт Antalya VIP","serviceTitle":"Больше, чем трансфер.<br />Продуманная встреча.","serviceIntro":"Внимание уровня пятизвёздочного отеля, опытные местные шофёры и спокойствие от аэропорта до курорта.","trackingTitle":"Отслеживание рейса","trackingBody":"Мы отслеживаем ваш рейс в реальном времени и автоматически корректируем время встречи без доплаты.","chauffeurTitle":"Профессиональные шофёры","chauffeurBody":"Безупречный внешний вид, деликатность, знание региона и высокие стандарты обслуживания.","greetTitle":"Встреча в аэропорту","greetBody":"При международных прилётах наша команда встречает вас у стойки J / 777, вызывает водителя к месту посадки и помогает с багажом.","supportTitle":"Консьерж 24/7","supportBody":"До, во время и после поездки вам всегда ответит человек по телефону или в WhatsApp.","priceTitle":"Фиксированные цены","priceBody":"Подтверждённая цена является окончательной. Ожидание, парковка и задержка рейса уже включены.","familyTitle":"Для всей семьи","familyBody":"Детские кресла по возрасту, просторный салон и внимательная помощь для спокойного семейного приезда.","routesEyebrow":"Самые популярные поездки","routesTitle":"Из аэропорта Антальи<br />на Турецкую Ривьеру.","routesIntro":"Все цены указаны за автомобиль, а не за пассажира, и включают 90 минут ожидания.","golfFavourite":"Выбор игроков в гольф","reviewsEyebrow":"Отзывы гостей","reviewsTitle":"Сервис, который помнят<br />после прибытия.","googleReviews":"На основе 387 подтверждённых отзывов Google","trustedBy":"Нам доверяют гости ведущих курортов Антальи","faqEyebrow":"Частые вопросы","faqTitle":"Перед поездкой.","faqIntro":"Всё, что нужно знать о частном трансфере из аэропорта Антальи.","askQuestion":"Задать вопрос","faqCatArrival":"Встреча и трансфер","faqOneQ":"Что произойдёт, если мой рейс задержится?","faqOneA":"От вас ничего не требуется. Мы отслеживаем ваш рейс в режиме реального времени и автоматически корректируем время подачи автомобиля. Задержки по вине авиакомпании никогда не оплачиваются дополнительно — водитель встретит вас в любое время прилёта, а первые 90 минут после посадки всегда включены в стоимость.","faqTwoQ":"Я прилетаю международным рейсом. Как проходит встреча?","faqTwoA":"После паспортного контроля и получения багажа следуйте вместе с другими пассажирами в зону встречи Meet & Greet и подойдите к нашей стойке J / 777. Просто назовите сотруднику своё имя — этого достаточно. Наша команда сразу сообщает водителю; он въезжает на территорию аэропорта и подаёт машину к месту посадки, а сотрудник в это время провожает вас к автомобилю. Вся процедура занимает около 7–8 минут.","faqSixQ":"Я прилетаю внутренним рейсом. Где найти водителя?","faqSixA":"Зона встречи Meet & Greet работает только для международных рейсов, поэтому гостей внутренних рейсов мы сопровождаем иначе: перед трансфером мы присылаем вам номер телефона водителя. После посадки просто сообщите ему об этом — он встретит вас в зале прилёта.","faqSevenQ":"Что делать, если у стойки J / 777 никого нет?","faqSevenA":"На стойке постоянно дежурят два наших сотрудника, и их единственная задача — проводить прибывающих гостей к автомобилю. Если стойка на минуту пуста, значит коллега сопровождает гостя, прилетевшего прямо перед вами: каждое сопровождение занимает около 7–8 минут. Пожалуйста, подождите примерно 10 минут. Если за это время никто не вернулся, напишите нам в WhatsApp: мы немедленно свяжемся с водителем, он подъедет к ближайшей точке, и мы проводим вас прямо к машине без дальнейшего ожидания.","faqEightQ":"Что будет, если мне понадобится больше 90 минут, чтобы выйти из аэропорта?","faqEightA":"Первые 90 минут после посадки включены в стоимость — этого с запасом хватает на паспортный контроль, багаж и таможню, а при задержке рейса отсчёт сдвигается автоматически. Только если вы задержитесь в терминале дольше по причинам, не связанным с рейсом, добавляется парковочный сбор 5 € за каждый дополнительный час. На практике это почти не случается: подавляющее большинство гостей выезжает задолго до этого.","faqCatJourney":"Обратный трансфер и поездка","faqTenQ":"Как поддерживать связь при обратном трансфере?","faqTenA":"После того как вы подтвердите дату и время обратной поездки нашей команде в WhatsApp, мы за несколько часов до трансфера назначаем автомобиль и присылаем вам его фотографии в WhatsApp — при желании также номер телефона водителя. Когда водитель приезжает в отель, он сообщает на стойку регистрации, а та передаёт в ваш номер, что машина подана. Наши водители никогда не звонят гостям напрямую: всё общение идёт через единую линию поддержки в WhatsApp, поэтому вы всегда точно знаете, с кем разговариваете.","faqFourteenQ":"Что делать, если я опаздываю на обратный трансфер?","faqFourteenA":"Водитель приезжает к отелю в назначенное время и ждёт 15 минут бесплатно. Если понимаете, что задержитесь, напишите нам в WhatsApp: мы проверим время вылета, предупредим водителя и вместе скорректируем план. Наша задача — не торопить вас, а спокойно доставить к рейсу.","faqFifteenQ":"Можно ли сделать остановку в пути?","faqFifteenA":"Конечно. Если хотите заехать в супермаркет или аптеку либо остановиться для фотографии, скажите об этом при бронировании или напишите в WhatsApp — мы спланируем маршрут с учётом остановки. Если остановка заметно уводит в сторону от маршрута, мы до выезда сообщим, добавляется ли что-то к сумме: постфактум сюрпризов не бывает.","faqCatPayment":"Оплата и цена","faqNineQ":"Как проходит оплата?","faqNineA":"Вы оплачиваете поездку водителю наличными в начале трансфера — карты не принимаются. Цены установлены в евро (EUR): фиксированная сумма в точности соответствует той, что вы видели при бронировании, — за автомобиль, со всеми аэропортовыми и парковочными сборами, без доплат впоследствии. Хотите оплатить в долларах США или турецких лирах? Напишите нам заранее в WhatsApp, чтобы получить отдельную цену, так как курс отличается. Водитель встречает вас, загружает багаж и устанавливает заказанные детские кресла; после оплаты начинается ваша поездка.","faqTwelveQ":"В какой валюте можно оплатить?","faqTwelveA":"Наши цены установлены в евро (EUR) и оплачиваются наличными; карты не принимаются. Если удобнее заплатить в долларах США или турецких лирах, сумма зависит от курса на день, поэтому напишите нам в WhatsApp до трансфера: мы назовём точную цену и предупредим водителя — в машине ничего не обсуждается.","faqElevenQ":"Могу ли я отменить или изменить бронирование?","faqElevenA":"Да, и всегда бесплатно. Мы не берём предоплату, поэтому возвращать нечего и ждать возврата денег не нужно — если планы изменились, достаточно написать нам в WhatsApp. Изменение времени, номера рейса или адреса назначения оформляем так же, без доплат.","faqFiveQ":"Указанная цена окончательная?","faqFiveA":"Да. Цена, которую вы видите при бронировании, — это сумма, которую вы передаёте водителю наличными: за автомобиль, включая все аэропортовые сборы, парковку и первые 90 минут ожидания. Скрытых платежей нет.","faqCatVehicle":"Автомобиль и багаж","faqThreeQ":"Есть ли детские кресла?","faqThreeA":"Да. Автолюльки, детские кресла и бустеры предоставляются бесплатно по запросу при бронировании.","faqThirteenQ":"Сколько багажа можно взять?","faqThirteenA":"Как правило, один большой чемодан и одно место ручной клади на пассажира. Если багажа больше — дополнительный чемодан, гольф-бэг, коляска, лыжи или велосипед — просто укажите это при бронировании, и мы без доплаты подадим автомобиль подходящей вместимости. Важно лишь предупредить заранее. Mercedes Vito вмещает до 6 пассажиров, Sprinter — до 12.","faqFourQ":"Можно ли взять сумки для гольфа и крупный багаж?","faqFourA":"Да. Sprinter и Vito идеально подходят для групп игроков в гольф. Сообщите объём багажа, и мы подберём автомобиль.","contactEyebrow":"Ваше путешествие начинается здесь","contactTitle":"Прибудьте в Анталью<br />исключительно комфортно.","contactBody":"Забронируйте онлайн менее чем за две минуты или свяжитесь с нашей службой консьержа 24/7.","whatsappUs":"Написать в WhatsApp","replyMinutes":"Обычно отвечаем за несколько минут","callUs":"Позвонить 24/7","emailUs":"Написать консьержу","replyHour":"Ответ в течение часа","footerTagline":"Частные услуги шофёра по всей Турецкой Ривьере.","explore":"Разделы","information":"Информация","licensed":"Лицензированный оператор частных трансферов · Соответствует требованиям TÜRSAB","bookingConfirmed":"Бронирование подтверждено","referenceLabel":"Референс","weWillContact":"Ваш запрос на бронирование отправлен. Мы свяжемся с вами в течение 30 минут.","chatWithUs":"Написать нам","pickupAddressPlaceholder":"Название отеля, улица, номер дома и район","dropoffAddressPlaceholder":"Название отеля, улица, номер дома и район","hotelNamePlaceholder":"Название отеля или места проживания","stepRoute":"Маршрут","stepDetails":"Детали","stepContact":"Контакты","reserveForPrice":"Забронировать","continue":"Продолжить","back":"Назад","perVehicleNoteVito":"За автомобиль — не за человека · До 6 пассажиров","perVehicleNoteSprinter":"За автомобиль — не за человека · До 12 пассажиров","perVehicle":"за автомобиль · фиксированная цена","requestQuote":"Запросить расчёт","cashConfirmation":"Ваше бронирование подтверждено. Фиксированную сумму вы передадите водителю наличными в начале поездки.","bookingError":"Не удалось завершить бронирование. Попробуйте ещё раз.","formIncomplete":"Заполните выделенные поля.","requiredField":"Это поле обязательно.","destinationRequired":"Выберите направление.","dateInvalid":"Выберите сегодняшнюю или будущую дату.","emailInvalid":"Введите действительный адрес электронной почты.","nameInvalid":"Введите действительное полное имя.","phoneInvalid":"Введите действительный номер с кодом страны (например, +49).","flightInvalid":"Введите действительный номер рейса.","pickupAddressRequired":"Адрес подачи должен содержать от 6 до 160 символов.","dropoffAddressRequired":"Адрес назначения должен содержать от 6 до 160 символов.","addressesMustDiffer":"Адреса подачи и назначения должны отличаться.","customDestinationPrice":"Цена будет подтверждена после проверки адреса назначения.","hotelNameRequired":"Введите название отеля.","roundTripPriceNote":"туда и обратно · 2 поездки","returnDateRequired":"Выберите дату возвращения.","returnDateInvalid":"Дата возвращения должна совпадать с датой поездки туда или быть позже.","returnTimeRequired":"Выберите время подачи на обратный путь.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","campaignBadge":"Онлайн-акция","campaignDiscount":"спеццена","campaignScope":"на все трансферы","campaignApplied":"Применена специальная онлайн-цена","onlineDiscountShort":"Онлайн-спеццена","discountPricesShown":"Показаны специальные онлайн-цены","quoteTitle":"Куда вас отвезти?","date":"Дата","airportReturnPrice":"Цена будет подтверждена после проверки отеля или адреса подачи.","oneGuest":"1 гость","twoGuests":"2 гостя","threeGuests":"3 гостя","fourGuests":"4 гостя","fiveGuests":"5 гостей","sixGuests":"6 гостей","sevenGuests":"7 гостей","viewQuote":"Показать цену","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Просторный частный салон для больших семей, групп игроков в гольф и гостей с объёмным багажом.","capacitySwitchedSprinter":"Пассажиры и багаж превышают вместимость Vito — выбран Mercedes Sprinter.","capacityNoVehicle":"Столько пассажиров и багажа превышает вместимость наших автомобилей. Напишите нам в WhatsApp.","leatherSeats":"Премиальные кожаные сиденья","water":"Охлаждённая вода","from":"От","reviewOne":"«Несмотря на задержку рейса на 90 минут, водитель ждал нас. Автомобиль был безупречно чистым и прохладным, а оба детских кресла уже были установлены. Именно такая встреча была нужна нашей семье».","reviewTwo":"«От первого сообщения в WhatsApp до прибытия в Белек всё было на высшем уровне. Пунктуально, деликатно и очень профессионально. Наши сумки для гольфа легко поместились».","reviewThree":"«Это было похоже на трансфер от пятизвёздочного отеля, а не на такси из аэропорта. Чёткая связь, безупречный автомобиль и по-настоящему вежливый водитель».","faqReminder":"Перед поездкой ознакомьтесь с разделом вопросов и ответов на нашем сайте.","viewFaq":"Открыть FAQ","quoteReady":"Ваш частный трансфер","journeyTime":"Время в пути","totalFixed":"Итоговая цена","confirmWhatsapp":"Подтвердить в WhatsApp","bookNowCta":"Забронировать","backToQuote":"Назад","yourDetails":"Ваши данные","flightNumber":"Номер рейса","flightArrivalTime":"Время прилёта","notesLabel":"Особые пожелания","confirmBooking":"Подтвердить бронирование","paymentError":"Оплата не прошла. Попробуйте ещё раз."},"cs":{"navFleet":"Vozový park","navService":"Služby","navRoutes":"Trasy","navReviews":"Recenze","navContact":"Kontakt","bookNow":"Rezervovat","alwaysAvailable":"Dostupní 24 hodin denně","heroEyebrow":"Soukromá šoférská služba · Antalya","heroTitle":"Prémiové letištní<br />transfery v Antalyi","heroSubtitle":"Soukromé transfery se šoférem z letiště Antalya do Beleku, Side, Kemeru a Alanye.","bookTransfer":"Rezervovat transfer","instantQuote":"Okamžitá nabídka","googleRated":"Hodnocení Google","trustedGuests":"Důvěryhodné u 2 500+ hostů","discover":"Objevit","tbLicensed":"Licence TÜRSAB","tbFlightTracking":"Sledování letů","tbFixedPrice":"Pevné ceny","tb247Concierge":"Recepce 24/7","tbChildSeats":"Dětské sedačky v ceně","privateJourney":"Váš soukromý výlet","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Typ cesty","oneWay":"Jednosměrně","roundTrip":"Tam a zpět","roundTripHint":"U zpáteční cesty následuje zpáteční trasa stejnou cestou v opačném směru.","pickup":"Místo vyzvednutí","airportOption":"Letiště Antalya (AYT)","hotelOption":"Hotel","privateAddressOption":"Soukromá adresa","destination":"Cíl","selectDestination":"Vyberte cíl","vehicle":"Vozidlo","guests":"Hosté","arrivalDate":"Datum příjezdu","arrivalFlightTime":"Čas příjezdu letu","chooseTime":"Vyberte čas","arrivalFlightNumber":"Číslo příletového letu","returnDate":"Datum návratu","returnPickupTime":"Čas vyzvednutí při návratu","returnFlightNumber":"Číslo zpátečního letu","pickupAddress":"Úplná adresa vyzvednutí","dropoffAddress":"Úplná adresa vysazení","luggageLabel":"Velká zavazadla","hotelNameLabel":"Název hotelu","childSeatLabel":"Dětské sedačky","childSeatNone":"Bez dětské sedačky","oneChildSeat":"1 dětská sedačka","twoChildSeats":"2 dětské sedačky","threeChildSeats":"3 dětské sedačky","fourChildSeats":"4 dětské sedačky","fullName":"Celé jméno","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-mail","paymentMethod":"Zvolte způsob platby","cashPayment":"Platba ve vozidle","recommended":"Doporučeno","cashPaymentDescription":"Žádná platba online předem. Pevnou částku předáte řidiči v hotovosti na začátku jízdy.","quoteIncludes":"Zahrnuje přivítání, sledování letu, parkování, 90 minut čekání a balenou vodu.","perVehicleNote":"Na vozidlo — ne na osobu · Až 6 cestujících","confirmCashBooking":"Potvrdit rezervaci — platba ve vozidle","flightTracking":"Sledování letů v reálném čase","fixedPrice":"Garance pevné ceny","meetGreet":"Osobní uvítání","speakingDrivers":"Anglicky a německy mluvící","fromAirport":"Z letiště Antalya","welcomeEyebrow":"Vítejte na lepším příjezdu","welcomeTitle":"Cestujte krásně.<br />Přijíždějte bez starostí.","welcomeBody":"Od okamžiku přistání je promyšlen každý detail. Náš tým na letišti vás přivítá, šofér přistaví vůz na místo vyzvednutí a vaše zavazadla putují do pečlivě připraveného soukromého vozu.","ourStandards":"Naše standardy služeb","concierge":"Podpora recepce","guestsWelcomed":"Přivítaných hostů","guestRating":"Průměrné hodnocení hostů","privateTransfers":"Soukromé transfery","fleetEyebrow":"Vozový park","fleetTitle":"Váš soukromý prostor,<br />vyladěný do každého detailu.","fleetIntro":"Cestujte v tiché pohodlí s dostatkem místa pro rodinu, golfové vybavení a zavazadla.","signatureFleet":"Prémiový vozový park","fleetVclassClass":"Business · První třída","fleetVclassDescription":"Prostorný VIP transport pro větší skupiny s dostatkem místa pro cestující i zavazadla.","passengers":"cestujících","suitcases":"kufrů","television":"TV ve vozidle","coldDrinks":"Studené nápoje","snacks":"Občerstvení","childSeats":"Dětská sedačka k dispozici","wifi":"Bezplatné WiFi","nameSignGreeting":"Uvítání u přepážky J / 777","reserveVehicle":"Rezervovat vozidlo","insideVclass":"Interiér Sprinteru","interiorTitle":"Soukromý salon mezi<br />letištěm a vaším hotelem.","serviceEyebrow":"Standard Antalya VIP","serviceTitle":"Víc než transfer.<br />Uvítání s péčí.","serviceIntro":"Pozornost na úrovni hotelu, zkušení místní šoféři a naprostý klid od vzletu až po resort.","trackingTitle":"Sledování letů","trackingBody":"Monitorujeme váš let v reálném čase a automaticky upravujeme čas vyzvednutí, bez příplatku.","chauffeurTitle":"Profesionální šoféři","chauffeurBody":"Bezchybně upravení, diskrétní a vybíraní pro místní znalosti a standardy služeb.","greetTitle":"Uvítání","greetBody":"U mezinárodních příletů vás náš tým přivítá u přepážky J / 777, přivolá šoféra na místo vyzvednutí a pomůže se zavazadly.","supportTitle":"Recepce 24/7","supportBody":"Skutečná osoba je vždy dostupná telefonicky nebo přes WhatsApp před, během a po cestě.","priceTitle":"Pevné ceny","priceBody":"Potvrzená cena je cena, kterou zaplatíte. Čekání, parkování a zpoždění letu jsou zahrnuty.","familyTitle":"Přátelské pro rodiny","familyBody":"Věkově vhodné dětské sedačky, prostorné kabiny a trpělivá pomoc pro klidný rodinný příjezd.","routesEyebrow":"Nejžádanější trasy","routesTitle":"Z letiště Antalya<br />na tureckou riviéru.","routesIntro":"Všechny ceny jsou za vozidlo, nikoli za osobu, a zahrnují 90 minut čekání.","golfFavourite":"Oblíbené pro golf","reviewsEyebrow":"Recenze hostů","reviewsTitle":"Služba, na kterou se<br />nezapomíná ani po příjezdu.","googleReviews":"Na základě 387 ověřených recenzí Google","trustedBy":"Oblíbené u hostů předních antalyských resortů","faqEyebrow":"Často kladené dotazy","faqTitle":"Před vaší cestou.","faqIntro":"Vše, co potřebujete vědět o svém soukromém transferu z letiště Antalya.","askQuestion":"Zeptejte se nás","faqCatArrival":"Vyzvednutí a transfer","faqOneQ":"Co se stane, když má můj let zpoždění?","faqOneA":"Nemusíte dělat vůbec nic. Váš let sledujeme v reálném čase a čas vyzvednutí upravíme automaticky. Zpoždění způsobená leteckou společností nikdy neúčtujeme – řidič na vás počká, ať přistanete kdykoli, a prvních 90 minut po přistání je vždy v ceně.","faqTwoQ":"Přilétám mezinárodním letem. Jak vyzvednutí probíhá?","faqTwoA":"Po pasové kontrole a výdeji zavazadel se vydejte s ostatními cestujícími do zóny Meet & Greet a přijďte k naší přepážce J / 777. Stačí říct našemu pracovníkovi své jméno. Náš tým okamžitě informuje řidiče; ten vjede na letiště a přistaví vůz na místo pro vyzvednutí, zatímco vás náš pracovník doprovodí k autu. Celý proces trvá přibližně 7–8 minut.","faqSixQ":"Přilétám vnitrostátním letem. Kde najdu svého řidiče?","faqSixA":"Zóna Meet & Greet slouží pouze mezinárodním příletům, proto se o hosty z vnitrostátních letů staráme jinak: před transferem vám pošleme telefonní číslo řidiče. Po přistání mu stačí dát vědět a vyzvedne vás v příletové hale.","faqSevenQ":"Co mám dělat, když u přepážky J / 777 nikdo není?","faqSevenA":"U přepážky trvale slouží dva naši pracovníci a jejich jediným úkolem je doprovodit přilétající hosty k vozu. Pokud je přepážka na chvíli prázdná, znamená to, že kolega právě doprovází hosta, který přiletěl těsně před vámi – každý doprovod trvá asi 7–8 minut. Počkejte prosím zhruba 10 minut. Pokud se do té doby nikdo nevrátí, napište nám na WhatsApp: okamžitě informujeme vašeho řidiče, necháme ho zastavit na nejbližším místě a dovedeme vás rovnou k vozu bez dalšího čekání.","faqEightQ":"Co když budu potřebovat na odchod z letiště více než 90 minut?","faqEightA":"Prvních 90 minut po přistání je zdarma v ceně – s rezervou více, než vyžaduje pasová kontrola, zavazadla a celní odbavení – a při zpoždění letu se tento interval automaticky posouvá. Pouze pokud vás v terminálu zdrží něco, co s letem nesouvisí, připočítáváme příspěvek na parkování 5 € za každou další hodinu. V praxi k tomu téměř nikdy nedojde: naprostá většina hostů je na cestě dávno předtím.","faqCatJourney":"Zpáteční cesta a jízda","faqTenQ":"Jak zůstanu ve spojení při zpátečním transferu?","faqTenA":"Jakmile s naším týmem potvrdíte datum a čas zpáteční cesty přes WhatsApp, několik hodin před transferem přidělíme vozidlo a pošleme vám jeho fotografie na WhatsApp – na přání i telefonní číslo řidiče. Když řidič dorazí k hotelu, oznámí to recepci, která dá vědět na váš pokoj, že vůz je připraven. Naši řidiči hostům nikdy nevolají přímo: veškerá komunikace probíhá přes jedinou zákaznickou linku na WhatsAppu, takže vždy víte, s kým mluvíte.","faqFourteenQ":"Co když se na zpáteční transfer opozdím?","faqFourteenA":"Šofér je u hotelu v dohodnutý čas a čeká 15 minut zdarma. Pokud tušíte zdržení, napište nám na WhatsApp: zkontrolujeme čas odletu, informujeme šoféra a plán upravíme společně s vámi. Nechceme vás popohánět, ale v klidu vás doručit k letadlu.","faqFifteenQ":"Je možné se během cesty zastavit?","faqFifteenA":"Samozřejmě. Chcete-li se cestou zastavit v supermarketu či lékárně nebo na chvíli kvůli fotografii, řekněte nám to při rezervaci nebo na WhatsAppu — trasu podle toho naplánujeme. Pokud zastávka vede výrazně mimo trasu, před odjezdem vám řekneme, zda se něco připočítává; dodatečně vás nic nepřekvapí.","faqCatPayment":"Platba a cena","faqNineQ":"Jak probíhá platba?","faqNineA":"Řidiči platíte v hotovosti na začátku jízdy – karty nepřijímáme. Ceny jsou stanoveny v eurech (EUR): pevná částka přesně odpovídá té, kterou jste viděli při rezervaci – za vozidlo, včetně všech letištních a parkovacích poplatků, bez dodatečných položek. Chcete raději platit v amerických dolarech nebo tureckých lirách? Napište nám předem na WhatsApp pro samostatnou cenu, protože kurz se liší. Řidič vás přivítá, naloží zavazadla a připraví objednané dětské sedačky; po zaplacení vaše cesta začíná.","faqTwelveQ":"V jaké měně mohu zaplatit?","faqTwelveA":"Naše ceny jsou stanoveny v eurech (EUR) a platí se v hotovosti; karty nepřijímáme. Chcete-li platit v amerických dolarech nebo tureckých lirách, částka závisí na denním kurzu — napište nám proto před transferem na WhatsApp. Sdělíme vám jasnou cenu a informujeme šoféra, takže ve voze se o ničem nevyjednává.","faqElevenQ":"Mohu rezervaci zrušit nebo změnit?","faqElevenA":"Ano, a vždy zdarma. Nevybíráme platbu předem, takže není co vracet ani na co čekat — pokud se vaše plány změní, stačí zpráva na WhatsAppu. Změnu času, čísla letu nebo cílové adresy vyřídíme stejně, bez příplatku.","faqFiveQ":"Je nabízená cena konečná?","faqFiveA":"Ano. Cena, kterou vidíte při rezervaci, je částka, kterou předáte řidiči v hotovosti – za vozidlo, včetně všech letištních poplatků, parkování a prvních 90 minut čekání. Žádné skryté poplatky.","faqCatVehicle":"Vozidlo a zavazadla","faqThreeQ":"Jsou k dispozici dětské sedačky?","faqThreeA":"Ano. Sedačky pro kojence, batolata i posilovací sedačky jsou k dispozici zdarma při objednávce.","faqThirteenQ":"Kolik zavazadel si mohu vzít?","faqThirteenA":"Zpravidla jeden velký kufr a jedno příruční zavazadlo na osobu. Pokud máte více — kufr navíc, golfovou výbavu, kočárek, lyže nebo kolo — stačí to uvést při rezervaci a bez příplatku přistavíme vůz s odpovídající kapacitou. Důležité je jen dát nám vědět předem. Mercedes Vito pojme až 6 cestujících, Sprinter až 12.","faqFourQ":"Přepravíte golfové tašky a velká zavazadla?","faqFourA":"Ano. Naše vozidla Sprinter a Vito jsou ideální pro golfové skupiny. Sdělte nám detaily o zavazadlech a přidělíme správné vozidlo.","contactEyebrow":"Vaše cesta začíná zde","contactTitle":"Přijeďte do Antalye<br />výjimečně dobře.","contactBody":"Rezervujte online za méně než dvě minuty nebo mluvte přímo s naším týmem recepce 24/7.","whatsappUs":"Napište nám na WhatsApp","replyMinutes":"Obvykle odpovídáme do několika minut","callUs":"Volejte nás 24/7","emailUs":"E-mail recepce","replyHour":"Odpovídáme do jedné hodiny","footerTagline":"Soukromé šoférské služby na turecké riviéře.","explore":"Prozkoumat","information":"Informace","licensed":"Licencovaný soukromý přepravce · v souladu s TÜRSAB","bookingConfirmed":"Rezervace potvrzena","referenceLabel":"Reference","weWillContact":"Vaše žádost o rezervaci byla odeslána. Kontaktujeme vás do 30 minut.","chatWithUs":"Napište nám","pickupAddressPlaceholder":"Název hotelu, ulice, číslo budovy a čtvrť","dropoffAddressPlaceholder":"Název hotelu, ulice, číslo budovy a čtvrť","hotelNamePlaceholder":"Název hotelu nebo ubytování","stepRoute":"Trasa","stepDetails":"Podrobnosti","stepContact":"Kontakt","reserveForPrice":"Rezervovat","continue":"Pokračovat","back":"Zpět","perVehicleNoteVito":"Na vozidlo — ne na osobu · Až 6 cestujících","perVehicleNoteSprinter":"Na vozidlo — ne na osobu · Až 12 cestujících","perVehicle":"pevná cena · na vozidlo","requestQuote":"Požádat o cenovou nabídku","cashConfirmation":"Vaše rezervace je potvrzena. Pevnou částku předáte řidiči v hotovosti na začátku jízdy.","bookingError":"Vaši rezervaci se nepodařilo dokončit. Zkuste to prosím znovu.","formIncomplete":"Prosím vyplňte zvýrazněná pole.","requiredField":"Toto pole je povinné.","destinationRequired":"Prosím vyberte cíl.","dateInvalid":"Prosím vyberte dnešní nebo budoucí datum.","emailInvalid":"Prosím zadejte platnou e-mailovou adresu.","nameInvalid":"Prosím zadejte platné celé jméno.","phoneInvalid":"Prosím zadejte platné číslo včetně předvolby země (například +420).","flightInvalid":"Prosím zadejte platné číslo letu.","pickupAddressRequired":"Adresa vyzvednutí musí mít 6 až 160 znaků.","dropoffAddressRequired":"Adresa vysazení musí mít 6 až 160 znaků.","addressesMustDiffer":"Adresy vyzvednutí a vysazení musí být různé.","customDestinationPrice":"Cena bude potvrzena po ověření adresy vysazení.","hotelNameRequired":"Prosím zadejte název hotelu.","roundTripPriceNote":"zpáteční · 2 cesty","returnDateRequired":"Prosím vyberte datum návratu.","returnDateInvalid":"Prosím vyberte datum návratu nejdříve v den odjezdu.","returnTimeRequired":"Prosím vyberte čas vyzvednutí při návratu.","dailyChauffeur":"Denní vozidlo + šofér","days":"dní","dailyChauffeurHint":"Pronajměte si soukromé vozidlo a šoféra na celý den bez limitu kilometrů nebo hodin. Pohonné hmoty se platí zvlášť.","serviceStartDate":"První den služby","serviceEndDate":"Poslední den služby","dailyPickupTime":"Čas začátku služby","dailyPickupTimeRequired":"Prosím vyberte denní čas začátku služby.","serviceEndDateRequired":"Prosím vyberte poslední den služby.","servicePeriodInvalid":"Prosím vyberte období od 1 do 30 dní.","arrivalFlightTimeOptional":"Čas příjezdu letu (nepovinné)","arrivalFlightNumberOptional":"Číslo příletového letu (nepovinné)","servicePrice":"Cena služby","fuelExcludedShort":"pohonné hmoty nezahrnuty","fuelExcludedDetail":"Pohonné hmoty nejsou zahrnuty a platí se zvlášť podle spotřeby.","departureFlightDate":"Datum odletového letu (nepovinné)","departureFlightTime":"Čas odletového letu","departureFlightNumber":"Číslo odletového letu","departureFlightDateRequired":"Prosím vyberte datum odletového letu.","departureFlightDateInvalid":"Datum odletového letu nesmí být dříve než začátek služby.","dailyQuoteIncludes":"Zahrnuje vybrané vozidlo a šoféra bez limitu kilometrů nebo hodin. Pohonné hmoty jsou vyloučeny.","reviewAndConfirm":"Přezkoumat a potvrdit","fuelTermsTitle":"Důležité informace o pohonných hmotách","fuelTermsBody":"Denní poplatek €150 za službu zahrnuje vozidlo a šoféra. Pohonné hmoty nejsou zahrnuty. Skutečné náklady na pohonné hmoty zaplatíte zvlášť podle spotřeby.","fuelTermsCheckbox":"Chápu, že pohonné hmoty jsou vyloučeny a budou placeny zvlášť podle spotřeby.","cancel":"Zrušit","close":"Zavřít","understandAndConfirm":"Chápu a potvrzuji","dailyCashConfirmation":"Váš denní pronájem šoféra je potvrzen. Cena služby nezahrnuje pohonné hmoty, které se platí zvlášť podle spotřeby.","campaignBadge":"Online akce","campaignDiscount":"Speciální cena","campaignScope":"ze všech cen transferů","campaignApplied":"Byla použita speciální online cena","discountPricesShown":"Zobrazeny online speciální ceny","onlineDiscountShort":"Online speciál","faqReminder":"Před cestou si prosím přečtěte sekci častých dotazů na našem webu.","viewFaq":"Zobrazit FAQ","capacitySwitchedSprinter":"Počet cestujících a zavazadel přesahuje kapacitu Vito — přepnuto na Mercedes Sprinter."},"pl":{"navFleet":"Pojazdy","navService":"Usługi","navRoutes":"Trasy","navReviews":"Opinie","navContact":"Kontakt","bookNow":"Zarezerwuj","alwaysAvailable":"Do Twojej dyspozycji 24 godziny na dobę","heroEyebrow":"Prywatny serwis szoferski · Antalya","heroTitle":"Transfery lotniskowe premium<br />w Antalyi","heroSubtitle":"Prywatne transfery z szoferem z lotniska Antalya do Belek, Side, Kemer i Alanyi.","bookTransfer":"Zarezerwuj transfer","instantQuote":"Sprawdź cenę","googleRated":"Ocena Google","trustedGuests":"Zaufało nam ponad 2 500 gości","discover":"Odkryj","tbLicensed":"Licencja TÜRSAB","tbFlightTracking":"Śledzenie lotu","tbFixedPrice":"Stała cena","tb247Concierge":"Concierge 24/7","tbChildSeats":"Foteliki w cenie","privateJourney":"Twoja prywatna podróż","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Miejsce odbioru","airportOption":"Lotnisko Antalya (AYT)","hotelOption":"Hotel","privateAddressOption":"Adres prywatny","destination":"Cel podróży","selectDestination":"Wybierz cel","vehicle":"Pojazd","guests":"Goście","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Wybierz godzinę","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Pełny adres odbioru","dropoffAddress":"Pełny adres docelowy","luggageLabel":"Duży bagaż","hotelNameLabel":"Nazwa hotelu","childSeatLabel":"Foteliki dziecięce","childSeatNone":"Bez fotelika dziecięcego","oneChildSeat":"1 fotelik dziecięcy","twoChildSeats":"2 foteliki dziecięce","threeChildSeats":"3 foteliki dziecięce","fourChildSeats":"4 foteliki dziecięce","fullName":"Imię i nazwisko","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-mail","paymentMethod":"Wybierz metodę płatności","cashPayment":"Zapłać w pojeździe","recommended":"Polecane","cashPaymentDescription":"Bez przedpłaty online. Stałą kwotę przekazujesz kierowcy gotówką na początku podróży.","quoteIncludes":"Obejmuje powitanie, śledzenie lotu, parking, 90 minut oczekiwania i wodę butelkowaną.","perVehicleNote":"Za pojazd — nie za osobę · Do 6 pasażerów","confirmCashBooking":"Potwierdź — zapłać w pojeździe","flightTracking":"Śledzenie lotu w czasie rzeczywistym","fixedPrice":"Gwarantowana stała cena","meetGreet":"Osobiste powitanie","speakingDrivers":"Kierowcy mówiący po angielsku i niemiecku","fromAirport":"Z lotniska Antalya","welcomeEyebrow":"Witamy na najwyższym poziomie","welcomeTitle":"Podróżuj z klasą.<br />Przyjeżdżaj spokojnie.","welcomeBody":"Od chwili lądowania dopracowany jest każdy szczegół. Nasz zespół na lotnisku wita Cię, kierowca podjeżdża w miejsce odbioru, a bagaże trafiają do starannie przygotowanego prywatnego auta.","ourStandards":"Nasze standardy usług","concierge":"Usługi concierge","guestsWelcomed":"Powitanych gości","guestRating":"Średnia ocena gości","privateTransfers":"Prywatne transfery","fleetEyebrow":"Nasza flota","fleetTitle":"Twoja prywatna przestrzeń,<br />doskonała w każdym detalu.","fleetIntro":"Podróżuj komfortowo z obszernym miejscem dla rodziny, sprzętu golfowego i walizek.","signatureFleet":"Flota Signature","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Wzorzec eleganckiej podróży grupowej: przestronny, wyjątkowo cichy i wyposażony dla bezproblemowego przybycia.","passengers":"pasażerów","suitcases":"walizek","television":"Telewizor w pojeździe","coldDrinks":"Zimne napoje","snacks":"Przekąski","childSeats":"Foteliki dziecięce na życzenie","wifi":"Bezpłatne WiFi","nameSignGreeting":"Powitanie przy stanowisku J / 777","reserveVehicle":"Zarezerwuj pojazd","insideVclass":"Wnętrze Sprinter","interiorTitle":"Prywatny salon<br />między lotniskiem a hotelem.","serviceEyebrow":"Standard Antalya VIP","serviceTitle":"Więcej niż transfer.<br />Wyjątkowe powitanie.","serviceIntro":"Uwaga na poziomie pięciogwiazdkowego hotelu, doświadczeni lokalni szoferzy i pełen spokój od lotniska po resort.","trackingTitle":"Śledzenie lotu","trackingBody":"Śledzimy Twój lot w czasie rzeczywistym i automatycznie dostosowujemy godzinę odbioru bez dodatkowych opłat.","chauffeurTitle":"Profesjonalni szoferzy","chauffeurBody":"Zawsze zadbani, dyskretni, wybrani za znajomość terenu i najwyższe standardy obsługi.","greetTitle":"Meet & Greet","greetBody":"Przy przylotach międzynarodowych nasz zespół wita Cię przy stanowisku J / 777, wzywa kierowcę w miejsce odbioru i pomaga z bagażem.","supportTitle":"Concierge 24/7","supportBody":"Przed, w trakcie i po podróży zawsze możesz skontaktować się z nami telefonicznie lub przez WhatsApp.","priceTitle":"Stałe ceny","priceBody":"Potwierdzona cena jest ceną ostateczną. Czas oczekiwania, parking i opóźnienia lotów są wliczone.","familyTitle":"Dla rodzin","familyBody":"Odpowiednie foteliki dziecięce, obszerne kabiny i cierpliwa pomoc dla spokojnego przybycia z rodziną.","routesEyebrow":"Nasze najpopularniejsze trasy","routesTitle":"Z lotniska Antalya<br />na Turecką Riwierę.","routesIntro":"Wszystkie ceny są za pojazd, nie za osobę, i obejmują 90 minut oczekiwania.","golfFavourite":"Ulubieniec golfistów","reviewsEyebrow":"Opinie gości","reviewsTitle":"Usługa, która<br />zostaje w pamięci.","googleReviews":"Na podstawie 387 zweryfikowanych opinii Google","trustedBy":"Wybór gości czołowych resortów w Antalyi","faqEyebrow":"Często zadawane pytania","faqTitle":"Przed Twoją podróżą.","faqIntro":"Wszystko, co musisz wiedzieć o prywatnym transferze z lotniska w Antalyi.","askQuestion":"Zadaj pytanie","faqCatArrival":"Odbiór i transfer","faqOneQ":"Co się stanie, jeśli mój lot się opóźni?","faqOneA":"Nie musisz nic robić. Śledzimy Twój lot na bieżąco i automatycznie dostosowujemy godzinę odbioru. Za opóźnienia linii lotniczych nigdy nie pobieramy dopłat – kierowca czeka bez względu na godzinę lądowania, a pierwsze 90 minut po wylądowaniu zawsze jest wliczone w cenę.","faqTwoQ":"Przylatuję lotem międzynarodowym. Jak wygląda odbiór?","faqTwoA":"Po kontroli paszportowej i odbiorze bagażu udaj się razem z innymi pasażerami do strefy Meet & Greet i podejdź do naszego stanowiska J / 777. Wystarczy podać naszemu pracownikowi swoje nazwisko. Nasz zespół natychmiast powiadamia kierowcę; wjeżdża on na teren lotniska i podjeżdża w miejsce odbioru, a nasz pracownik odprowadza Cię do samochodu. Cały proces trwa około 7–8 minut.","faqSixQ":"Przylatuję lotem krajowym. Gdzie znajdę kierowcę?","faqSixA":"Strefa Meet & Greet obsługuje wyłącznie przyloty międzynarodowe, dlatego gośćmi lotów krajowych zajmujemy się inaczej: przed transferem wysyłamy Ci numer telefonu kierowcy. Po wylądowaniu wystarczy dać mu znać – odbierze Cię w hali przylotów.","faqSevenQ":"Co zrobić, jeśli przy stanowisku J / 777 nikogo nie ma?","faqSevenA":"Przy stanowisku stale dyżurują dwie osoby z naszego zespołu, a ich jedynym zadaniem jest odprowadzanie przybywających gości do samochodów. Jeśli zastaniesz stanowisko na moment puste, oznacza to, że kolega odprowadza właśnie gościa, który przyleciał tuż przed Tobą – każde odprowadzenie trwa około 7–8 minut. Poczekaj proszę około 10 minut. Jeśli w tym czasie nikt nie wróci, napisz do nas na WhatsAppie: natychmiast powiadomimy kierowcę, poprosimy go o podjechanie w najbliższe miejsce i zaprowadzimy Cię prosto do auta bez dalszego czekania.","faqEightQ":"Co, jeśli wyjście z lotniska zajmie mi więcej niż 90 minut?","faqEightA":"Pierwsze 90 minut po wylądowaniu jest wliczone w cenę – z zapasem wystarcza na kontrolę paszportową, bagaż i odprawę celną – a przy opóźnieniu lotu okno to przesuwa się automatycznie. Dopiero jeśli coś niezwiązanego z lotem zatrzyma Cię w terminalu dłużej, doliczamy 5 € dopłaty parkingowej za każdą kolejną godzinę. W praktyce zdarza się to niezwykle rzadko: niemal wszyscy nasi goście są w drodze na długo przed upływem tego czasu.","faqCatJourney":"Powrót i podróż","faqTenQ":"Jak utrzymać kontakt przy transferze powrotnym?","faqTenA":"Gdy potwierdzisz naszemu zespołowi datę i godzinę powrotu przez WhatsApp, na kilka godzin przed transferem przydzielamy pojazd i wysyłamy Ci jego zdjęcia na WhatsAppie – a jeśli chcesz, także numer telefonu kierowcy. Gdy kierowca dotrze do hotelu, informuje recepcję, która przekazuje do Twojego pokoju, że samochód czeka. Nasi kierowcy nigdy nie dzwonią do gości bezpośrednio: cała komunikacja przechodzi przez jedną linię wsparcia na WhatsAppie, więc zawsze wiesz dokładnie, z kim rozmawiasz.","faqFourteenQ":"Co jeśli spóźnię się na transfer powrotny?","faqFourteenA":"Kierowca jest pod hotelem o umówionej godzinie i czeka 15 minut bezpłatnie. Jeśli przewidujesz opóźnienie, wystarczy jedna wiadomość na WhatsAppie: sprawdzimy godzinę wylotu, poinformujemy kierowcę i wspólnie dostosujemy plan. Nie chodzi o pośpiech, lecz o spokojny dojazd na lot.","faqFifteenQ":"Czy w trakcie podróży można zrobić dodatkowy postój?","faqFifteenA":"Oczywiście. Jeśli chcesz zatrzymać się przy supermarkecie lub aptece albo na chwilę na zdjęcie, powiedz nam o tym przy rezerwacji lub na WhatsAppie — zaplanujemy trasę z takim postojem. Jeśli postój wyraźnie zbacza z trasy, przed wyjazdem powiemy, czy coś dochodzi do kwoty; nic nie pojawia się później jako niespodzianka.","faqCatPayment":"Płatność i cena","faqNineQ":"Jak wygląda płatność?","faqNineA":"Płacisz kierowcy gotówką na początku podróży – nie przyjmujemy kart. Ceny są ustalane w euro (EUR): stała kwota jest dokładnie taka, jaką widziałeś przy rezerwacji – za pojazd, ze wszystkimi opłatami lotniskowymi i parkingowymi, bez późniejszych dopłat. Wolisz zapłacić w dolarach amerykańskich lub lirach tureckich? Napisz do nas wcześniej na WhatsAppie po osobną wycenę, ponieważ kurs się różni. Kierowca wita Cię, ładuje bagaże i montuje zamówione foteliki dziecięce; po uregulowaniu płatności rozpoczyna się podróż.","faqTwelveQ":"W jakiej walucie mogę zapłacić?","faqTwelveA":"Nasze ceny ustalane są w euro (EUR) i płatne gotówką; kart nie przyjmujemy. Jeśli wolisz zapłacić w dolarach amerykańskich lub lirach tureckich, kwota zależy od kursu z danego dnia — napisz więc do nas na WhatsAppie przed transferem. Podamy jasną cenę i poinformujemy kierowcę, więc w aucie nie ma żadnych negocjacji.","faqElevenQ":"Czy mogę anulować lub zmienić rezerwację?","faqElevenA":"Tak, i zawsze bezpłatnie. Nie pobieramy przedpłaty, więc nie ma czego zwracać ani na co czekać — jeśli plany się zmienią, wystarczy wiadomość na WhatsAppie. Zmianę godziny, numeru lotu czy adresu docelowego załatwiamy tak samo, bez dopłat.","faqFiveQ":"Czy podana cena jest ostateczna?","faqFiveA":"Tak. Cena, którą widzisz przy rezerwacji, to kwota, którą przekazujesz kierowcy gotówką – za pojazd, ze wszystkimi opłatami lotniskowymi, parkingiem i pierwszymi 90 minutami oczekiwania. Nie ma żadnych ukrytych opłat.","faqCatVehicle":"Pojazd i bagaż","faqThreeQ":"Czy dostępne są foteliki dziecięce?","faqThreeA":"Tak. Nosidełka, foteliki i podkładki są dostępne bezpłatnie przy wcześniejszej rezerwacji.","faqThirteenQ":"Ile bagażu mogę zabrać?","faqThirteenA":"Zasadniczo jedna duża walizka i jeden bagaż podręczny na osobę. Jeśli masz więcej — dodatkową walizkę, sprzęt golfowy, wózek, narty czy rower — po prostu zaznacz to przy rezerwacji, a bez dopłaty podstawimy pojazd o odpowiedniej pojemności. Liczy się tylko to, żebyśmy wiedzieli wcześniej. Mercedes Vito zabiera do 6 pasażerów, a Sprinter do 12.","faqFourQ":"Czy można przewieźć torby golfowe i duży bagaż?","faqFourA":"Tak. Sprinter i Vito są idealne dla grup golfowych. Podaj informacje o bagażu, a zaplanujemy odpowiedni pojazd.","contactEyebrow":"Twoja podróż zaczyna się tutaj","contactTitle":"Przybądź do Antalyi<br />wyjątkowo komfortowo.","contactBody":"Zarezerwuj online w mniej niż dwie minuty lub skontaktuj się bezpośrednio z naszym concierge 24/7.","whatsappUs":"WhatsApp","replyMinutes":"Odpowiedź zwykle w kilka minut","callUs":"Zadzwoń 24/7","emailUs":"E-mail do concierge","replyHour":"Odpowiedź w ciągu godziny","footerTagline":"Prywatne usługi szoferskie na całej Tureckiej Riwierze.","explore":"Odkryj","information":"Informacje","licensed":"Licencjonowany prywatny przewoźnik · Zgodny z TÜRSAB","bookingConfirmed":"Rezerwacja potwierdzona","referenceLabel":"Numer referencyjny","weWillContact":"Twoje zgłoszenie rezerwacji zostało wysłane. Skontaktujemy się w ciągu 30 minut.","chatWithUs":"Napisz do nas","pickupAddressPlaceholder":"Nazwa hotelu, ulica, numer budynku i dzielnica","dropoffAddressPlaceholder":"Nazwa hotelu, ulica, numer budynku i dzielnica","hotelNamePlaceholder":"Nazwa hotelu lub zakwaterowania","stepRoute":"Trasa","stepDetails":"Szczegóły","stepContact":"Kontakt","reserveForPrice":"Zarezerwuj","continue":"Dalej","back":"Wstecz","perVehicleNoteVito":"Za pojazd — nie za osobę · Do 6 pasażerów","perVehicleNoteSprinter":"Za pojazd — nie za osobę · Do 12 pasażerów","perVehicle":"za pojazd · stała cena","requestQuote":"Poproś o wycenę","cashConfirmation":"Twoja rezerwacja jest potwierdzona. Stałą kwotę przekażesz kierowcy gotówką na początku podróży.","bookingError":"Nie udało się dokończyć rezerwacji. Spróbuj ponownie.","formIncomplete":"Uzupełnij zaznaczone pola.","requiredField":"To pole jest wymagane.","destinationRequired":"Wybierz cel podróży.","dateInvalid":"Wybierz dzisiejszą lub przyszłą datę.","emailInvalid":"Wprowadź prawidłowy adres e-mail.","nameInvalid":"Wprowadź prawidłowe imię i nazwisko.","phoneInvalid":"Wprowadź prawidłowy numer z kodem kraju (na przykład +49).","flightInvalid":"Wprowadź prawidłowy numer lotu.","pickupAddressRequired":"Adres odbioru musi mieć od 6 do 160 znaków.","dropoffAddressRequired":"Adres docelowy musi mieć od 6 do 160 znaków.","addressesMustDiffer":"Adres odbioru i adres docelowy muszą być różne.","customDestinationPrice":"Cena zostanie potwierdzona po sprawdzeniu adresu docelowego.","hotelNameRequired":"Wprowadź nazwę hotelu.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","quoteTitle":"Dokąd Cię zawieziemy?","date":"Data","airportReturnPrice":"Cena zostanie potwierdzona po sprawdzeniu hotelu lub adresu odbioru.","oneGuest":"1 gość","twoGuests":"2 gości","threeGuests":"3 gości","fourGuests":"4 gości","fiveGuests":"5 gości","sixGuests":"6 gości","sevenGuests":"7 gości","viewQuote":"Pokaż cenę","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Obszerna prywatna kabina dla większych rodzin, grup golfowych i gości z obfitym bagażem.","capacitySwitchedSprinter":"Pasażerowie i bagaż przekraczają Vito — przełączono na Mercedes Sprinter.","capacityNoVehicle":"Tylu pasażerów i bagażu przekracza nasze pojazdy. Skontaktuj się z nami na WhatsApp.","leatherSeats":"Skórzane fotele premium","water":"Schłodzona woda mineralna","from":"Od","reviewOne":"„Nasz kierowca czekał mimo 90-minutowego opóźnienia. Pojazd był nieskazitelny, przyjemnie chłodny i wyposażony już w oba foteliki. Dokładnie takie powitanie potrzebowała nasza rodzina.”","reviewTwo":"„Od pierwszego kontaktu WhatsApp po przyjazd do Belek wszystko było absolutnie pierwszorzędne. Punktualnie, dyskretnie i bardzo profesjonalnie. Torby golfowe bez problemu się zmieściły.”","reviewThree":"„To było jak serwis szoferski hotelu, a nie taksówka na lotnisku. Jasna komunikacja, nieskazitelny pojazd i naprawdę uprzejmy kierowca.”","faqReminder":"Przed podróżą zapoznaj się z sekcją FAQ na naszej stronie.","viewFaq":"Zobacz FAQ","quoteReady":"Twój prywatny transfer","journeyTime":"Czas podróży","totalFixed":"Cena łączna","confirmWhatsapp":"Potwierdź przez WhatsApp","bookNowCta":"Zarezerwuj","backToQuote":"Wstecz","yourDetails":"Twoje dane","flightNumber":"Numer lotu","flightArrivalTime":"Godzina przylotu","notesLabel":"Specjalne życzenia","confirmBooking":"Potwierdź rezerwację","paymentError":"Płatność nie powiodła się. Spróbuj ponownie."},"nl":{"navFleet":"Voertuigen","navService":"Service","navRoutes":"Routes","navReviews":"Reviews","navContact":"Contact","bookNow":"Nu boeken","alwaysAvailable":"24 uur per dag, elke dag bereikbaar","heroEyebrow":"Privé chauffeurservice · Antalya","heroTitle":"Premium luchthavenstransfers<br />in Antalya","heroSubtitle":"Privé transfers met chauffeur van Antalya Luchthaven naar Belek, Side, Kemer en Alanya.","bookTransfer":"Transfer boeken","instantQuote":"Direct prijs ontvangen","googleRated":"Google-beoordeling","trustedGuests":"Vertrouwd door meer dan 2.500 gasten","discover":"Ontdekken","tbLicensed":"TÜRSAB Erkend","tbFlightTracking":"Vluchttracking","tbFixedPrice":"Vaste prijs","tb247Concierge":"Concierge 24/7","tbChildSeats":"Kinderzitjes inbegrepen","privateJourney":"Uw privéreis","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Ophaallocatie","airportOption":"Luchthaven Antalya (AYT)","hotelOption":"Hotel","privateAddressOption":"Privéadres","destination":"Bestemming","selectDestination":"Kies bestemming","vehicle":"Voertuig","guests":"Gasten","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Kies tijd","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Volledig ophaaladres","dropoffAddress":"Volledig bestemmingsadres","luggageLabel":"Grote bagage","hotelNameLabel":"Hotelnaam","childSeatLabel":"Kinderzitjes","childSeatNone":"Geen kinderzitje","oneChildSeat":"1 kinderzitje","twoChildSeats":"2 kinderzitjes","threeChildSeats":"3 kinderzitjes","fourChildSeats":"4 kinderzitjes","fullName":"Volledige naam","phoneLabel":"Telefoon / WhatsApp","emailLabel":"E-mail","paymentMethod":"Kies betaalmethode","cashPayment":"Betaal in het voertuig","recommended":"Aanbevolen","cashPaymentDescription":"Geen online vooruitbetaling. U betaalt het vaste bedrag contant aan uw chauffeur bij aanvang van de rit.","quoteIncludes":"Inclusief meet & greet, vluchtvolging, parkeren, 90 minuten wachttijd en flesje water.","perVehicleNote":"Per voertuig — niet per persoon · Tot 6 passagiers","confirmCashBooking":"Bevestig — betaal in het voertuig","flightTracking":"Realtime vluchtvolgend","fixedPrice":"Gegarandeerde vaste prijs","meetGreet":"Persoonlijk welkom","speakingDrivers":"Chauffeurs die Engels en Duits spreken","fromAirport":"Vanaf Antalya Luchthaven","welcomeEyebrow":"Welkom op het hoogste niveau","welcomeTitle":"Stijlvol reizen.<br />Ontspannen aankomen.","welcomeBody":"Vanaf het moment dat u landt, is aan elk detail gedacht. Ons luchthaventeam ontvangt u, uw chauffeur staat klaar op het ophaalpunt en uw bagage gaat in een zorgvuldig voorbereide privéwagen.","ourStandards":"Onze servicestandaarden","concierge":"Conciërgeservice","guestsWelcomed":"Verwelkomde gasten","guestRating":"Gemiddelde gastbeoordeling","privateTransfers":"Privétransfers","fleetEyebrow":"Onze vloot","fleetTitle":"Uw privéruimte,<br />perfect tot in elk detail.","fleetIntro":"Reis comfortabel met ruimte voor familie, golfbagage en koffers.","signatureFleet":"Signature vloot","fleetVclassClass":"Business · First Class","fleetVclassDescription":"De maatstaf voor verfijnde groepsreizen: ruim, uitzonderlijk stil en uitgerust voor een probleemloze aankomst.","passengers":"passagiers","suitcases":"koffers","television":"Televisie in het voertuig","coldDrinks":"Koude dranken","snacks":"Snacks","childSeats":"Kinderzitjes op verzoek","wifi":"Gratis WiFi","nameSignGreeting":"Ontvangst bij balie J / 777","reserveVehicle":"Voertuig reserveren","insideVclass":"In het Sprinter interieur","interiorTitle":"Een privélounge<br />tussen luchthaven en hotel.","serviceEyebrow":"De Antalya VIP-standaard","serviceTitle":"Meer dan een transfer.<br />Een bijzonder welkom.","serviceIntro":"Aandacht op hotelniveau, ervaren lokale chauffeurs en absolute gemoedsrust van luchthaven tot resort.","trackingTitle":"Vluchttracking","trackingBody":"We volgen uw vlucht in realtime en passen de ophaalafspraak automatisch en kosteloos aan.","chauffeurTitle":"Professionele chauffeurs","chauffeurBody":"Altijd verzorgd, discreet en geselecteerd op lokale kennis en hoogste servicestandaard.","greetTitle":"Meet & Greet","greetBody":"Bij internationale aankomsten ontvangt ons team u bij balie J / 777, roept uw chauffeur naar het ophaalpunt en helpt met de bagage.","supportTitle":"24/7 Conciërge","supportBody":"Voor, tijdens en na uw reis is er altijd iemand bereikbaar per telefoon of WhatsApp.","priceTitle":"Vaste prijzen","priceBody":"De bevestigde prijs is de definitieve prijs. Wachttijd, parkeren en vluchtvertragingen zijn inbegrepen.","familyTitle":"Voor gezinnen","familyBody":"Passende kinderzitjes, ruime interieurs en geduldige hulp voor een ontspannen familieaankomst.","routesEyebrow":"Onze populairste ritten","routesTitle":"Van Antalya Luchthaven<br />naar de Turkse Rivièra.","routesIntro":"Alle prijzen gelden per voertuig, niet per persoon, inclusief 90 minuten wachttijd.","golfFavourite":"Golfliefhebbersfavoriet","reviewsEyebrow":"Gastbeoordelingen","reviewsTitle":"Service die lang<br />bijblijft.","googleReviews":"Gebaseerd op 387 geverifieerde Google-beoordelingen","trustedBy":"Vertrouwd door gasten van toonaangevende resorts in Antalya","faqEyebrow":"Veelgestelde vragen","faqTitle":"Vóór uw reis.","faqIntro":"Alles wat u moet weten over uw privétransfer van de luchthaven Antalya.","askQuestion":"Stel een vraag","faqCatArrival":"Aankomst & transfer","faqOneQ":"Wat gebeurt er bij een vluchtvertraging?","faqOneA":"U hoeft niets te doen. Wij volgen uw vlucht live en passen uw ophaaltijd automatisch aan. Vertragingen van de luchtvaartmaatschappij brengen wij nooit in rekening – uw chauffeur staat er, hoe laat u ook landt, en de eerste 90 minuten na de landing zijn altijd inbegrepen.","faqTwoQ":"Ik kom aan met een internationale vlucht. Hoe verloopt de ontvangst?","faqTwoA":"Loop na de paspoortcontrole en bagageafhandeling met de andere passagiers mee naar de Meet & Greet-zone en kom naar onze balie J / 777. Geef onze medewerker eenvoudig uw naam door – dat volstaat. Ons team waarschuwt meteen uw chauffeur; hij rijdt het luchthaventerrein op en staat klaar op het ophaalpunt, terwijl onze medewerker u naar de auto begeleidt. Het hele proces duurt ongeveer 7–8 minuten.","faqSixQ":"Ik kom aan met een binnenlandse vlucht. Waar vind ik mijn chauffeur?","faqSixA":"De Meet & Greet-zone is uitsluitend voor internationale aankomsten. Gasten van binnenlandse vluchten begeleiden wij daarom anders: wij sturen u vóór de transfer het telefoonnummer van uw chauffeur. Laat het hem na de landing kort weten – hij haalt u op in de aankomsthal.","faqSevenQ":"Wat als er niemand bij balie J / 777 staat?","faqSevenA":"Bij onze balie zijn permanent twee medewerkers aanwezig; hun enige taak is aankomende gasten naar hun voertuig te begeleiden. Treft u de balie even onbemand aan, dan begeleidt een collega net de gast die vlak vóór u aankwam – elke begeleiding duurt ongeveer 7–8 minuten. Wacht dan alstublieft zo'n 10 minuten. Is er daarna nog niemand terug, stuur ons dan een bericht via WhatsApp: wij informeren uw chauffeur direct, laten hem op het dichtstbijzijnde punt stoppen en begeleiden u zonder verder wachten rechtstreeks naar uw auto.","faqEightQ":"Wat als ik meer dan 90 minuten nodig heb om de luchthaven te verlaten?","faqEightA":"De eerste 90 minuten na de landing zijn kosteloos inbegrepen – ruim meer dan paspoortcontrole, bagage en douane vragen – en dit tijdvenster schuift automatisch mee bij vertraging. Alleen wanneer iets dat losstaat van uw vlucht u langer in de terminal houdt, komt er een parkeerbijdrage van € 5 per extra uur bij. In de praktijk gebeurt dat vrijwel nooit: bijna al onze gasten zijn ruim daarvoor onderweg.","faqCatJourney":"Terugrit & onderweg","faqTenQ":"Hoe houd ik contact voor de terugtransfer?","faqTenA":"Zodra u datum en tijd van uw terugreis via WhatsApp met ons team hebt bevestigd, wijzen wij enkele uren vóór de transfer uw voertuig toe en sturen wij u foto's ervan via WhatsApp – desgewenst ook het telefoonnummer van uw chauffeur. Zodra uw chauffeur bij het hotel is, meldt hij zich bij de receptie, die uw kamer laat weten dat de auto klaarstaat. Onze chauffeurs bellen gasten nooit rechtstreeks: alle contact loopt via onze centrale WhatsApp-supportlijn, zodat u altijd precies weet met wie u spreekt.","faqFourteenQ":"Wat als ik te laat ben voor mijn terugtransfer?","faqFourteenA":"Uw chauffeur staat op het afgesproken tijdstip bij uw hotel en wacht 15 minuten kosteloos. Verwacht u vertraging, stuur dan één bericht via WhatsApp: wij controleren uw vluchttijd, informeren uw chauffeur en stemmen het plan met u af. Wij willen u niet opjagen, maar u rustig op tijd bij uw vlucht krijgen.","faqFifteenQ":"Is een tussenstop tijdens de rit mogelijk?","faqFifteenA":"Natuurlijk. Wilt u onderweg stoppen bij een supermarkt of apotheek of even voor een foto, laat het ons weten bij het boeken of via WhatsApp — wij plannen de route erop. Leidt een stop ver van uw route af, dan zeggen wij vóór vertrek of er iets bij komt; achteraf verrast u niets.","faqCatPayment":"Betaling & prijs","faqNineQ":"Hoe betaal ik?","faqNineA":"U betaalt uw chauffeur contant aan het begin van de rit – kaarten accepteren we niet. De prijzen zijn vastgesteld in euro's (EUR): het vaste bedrag is precies wat u bij het boeken zag – per voertuig, inclusief alle luchthaven- en parkeerkosten, zonder latere toeslagen. Wilt u liever in Amerikaanse dollars of Turkse lira betalen? Stuur ons vooraf een bericht via WhatsApp voor een aparte prijs, aangezien de wisselkoers verschilt. Uw chauffeur verwelkomt u, laadt uw bagage in en plaatst de gevraagde kinderzitjes; na de betaling begint uw rit.","faqTwelveQ":"In welke valuta kan ik betalen?","faqTwelveA":"Onze prijzen zijn in euro's (EUR) en worden contant voldaan; kaarten accepteren wij niet. Betaalt u liever in Amerikaanse dollars of Turkse lira, dan hangt het bedrag af van de dagkoers — stuur ons daarom vóór uw transfer een bericht via WhatsApp. Wij bevestigen een duidelijke prijs en informeren uw chauffeur, zodat er in de auto niets onderhandeld wordt.","faqElevenQ":"Kan ik mijn boeking annuleren of wijzigen?","faqElevenA":"Ja, en altijd kosteloos. Wij vragen geen vooruitbetaling, dus er valt niets terug te betalen en u hoeft nergens op te wachten — veranderen uw plannen, dan volstaat een bericht via WhatsApp. Een ander tijdstip, vluchtnummer of afleveradres regelen wij op dezelfde manier, zonder meerkosten.","faqFiveQ":"Is de getoonde prijs definitief?","faqFiveA":"Ja. De prijs die u bij het boeken ziet, is het bedrag dat u contant aan uw chauffeur geeft – per voertuig, inclusief alle luchthavenkosten, parkeren en de eerste 90 minuten wachttijd. Er zijn geen verborgen kosten.","faqCatVehicle":"Voertuig & bagage","faqThreeQ":"Zijn kinderzitjes beschikbaar?","faqThreeA":"Ja. Babyschalen, kinderzitjes en zitverhogers zijn bij vooraf boeken gratis beschikbaar.","faqThirteenQ":"Hoeveel bagage mag ik meenemen?","faqThirteenA":"In de regel één grote koffer en één handbagagestuk per passagier. Hebt u meer bij zich — een extra koffer, golftas, kinderwagen, ski's of een fiets — geef het dan aan bij het boeken; wij zetten zonder meerkosten een voertuig met de juiste capaciteit in. Het enige wat telt, is dat wij het vooraf weten. Een Mercedes Vito vervoert tot 6 passagiers, een Sprinter tot 12.","faqFourQ":"Kunnen golfbags en groot bagage worden vervoerd?","faqFourA":"Ja. Sprinter en Vito zijn ideaal voor golfgroepen. Geef uw bagage op en wij plannen het juiste voertuig.","contactEyebrow":"Uw reis begint hier","contactTitle":"Buitengewoon goed<br />aankomen in Antalya.","contactBody":"Boek online in minder dan twee minuten of spreek direct met ons 24/7 conciërgeteam.","whatsappUs":"WhatsApp","replyMinutes":"Antwoord meestal binnen enkele minuten","callUs":"24/7 bellen","emailUs":"Conciërge e-mail","replyHour":"Antwoord binnen een uur","footerTagline":"Privé chauffeurservices aan de hele Turkse Rivièra.","explore":"Ontdekken","information":"Informatie","licensed":"Erkende privé-transferaanbieder · TÜRSAB-conform","bookingConfirmed":"Boeking bevestigd","referenceLabel":"Referentie","weWillContact":"Uw boekingsaanvraag is verzonden. We nemen binnen 30 minuten contact op.","chatWithUs":"Chat met ons","pickupAddressPlaceholder":"Hotelnaam, straat, huisnummer en wijk","dropoffAddressPlaceholder":"Hotelnaam, straat, huisnummer en wijk","hotelNamePlaceholder":"Naam van hotel of accommodatie","stepRoute":"Route","stepDetails":"Details","stepContact":"Contact","reserveForPrice":"Reserveren","continue":"Verder","back":"Terug","perVehicleNoteVito":"Per voertuig — niet per persoon · Tot 6 passagiers","perVehicleNoteSprinter":"Per voertuig — niet per persoon · Tot 12 passagiers","perVehicle":"per voertuig · vaste prijs","requestQuote":"Prijsopgave aanvragen","cashConfirmation":"Uw boeking is bevestigd. U betaalt het vaste bedrag contant aan uw chauffeur bij aanvang van de rit.","bookingError":"Uw boeking kon niet worden voltooid. Probeer het opnieuw.","formIncomplete":"Vul de gemarkeerde velden in.","requiredField":"Dit veld is verplicht.","destinationRequired":"Kies een bestemming.","dateInvalid":"Kies vandaag of een toekomstige datum.","emailInvalid":"Voer een geldig e-mailadres in.","nameInvalid":"Voer een geldige volledige naam in.","phoneInvalid":"Voer een geldig nummer met landcode in (bijvoorbeeld +49).","flightInvalid":"Voer een geldig vluchtnummer in.","pickupAddressRequired":"Het ophaaladres moet tussen 6 en 160 tekens lang zijn.","dropoffAddressRequired":"Het bestemmingsadres moet tussen 6 en 160 tekens lang zijn.","addressesMustDiffer":"Het ophaal- en bestemmingsadres moeten verschillen.","customDestinationPrice":"De prijs wordt bevestigd na controle van het bestemmingsadres.","hotelNameRequired":"Voer de hotelnaam in.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","quoteTitle":"Waar mogen wij u naartoe brengen?","date":"Datum","airportReturnPrice":"De prijs wordt bevestigd nadat het hotel of ophaaladres is gecontroleerd.","oneGuest":"1 gast","twoGuests":"2 gasten","threeGuests":"3 gasten","fourGuests":"4 gasten","fiveGuests":"5 gasten","sixGuests":"6 gasten","sevenGuests":"7 gasten","viewQuote":"Prijs bekijken","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Een ruime privécabine voor grotere families, golfgroepen en gasten met veel bagage.","capacitySwitchedSprinter":"Passagiers en bagage overschrijden de Vito — overgeschakeld naar Mercedes Sprinter.","capacityNoVehicle":"Zoveel passagiers en bagage overschrijdt onze voertuigen. Neem contact op via WhatsApp.","leatherSeats":"Premium leren stoelen","water":"Gekoeld mineraalwater","from":"Vanaf","reviewOne":"„Onze chauffeur wachtte ondanks 90 minuten vertraging. Het voertuig was onberispelijk, aangenaam koel en al uitgerust met beide kinderzitjes. Precies de ontvangst die onze familie nodig had.”","reviewTwo":"„Van het eerste WhatsApp-contact tot aankomst in Belek absoluut eersteklas. Punctueel, discreet en zeer professioneel. Ook onze golftassen pasten er gemakkelijk in.”","reviewThree":"„Dit voelde als een chauffeurservice van een hotel, niet als een luchthaventaxi. Duidelijke communicatie, een onberispelijk voertuig en een oprecht beleefde chauffeur.”","faqReminder":"Lees vóór uw reis het FAQ-gedeelte op onze website.","viewFaq":"FAQ bekijken","quoteReady":"Uw privétransfer","journeyTime":"Reistijd","totalFixed":"Totaalprijs","confirmWhatsapp":"Bevestigen via WhatsApp","bookNowCta":"Nu boeken","backToQuote":"Terug","yourDetails":"Uw gegevens","flightNumber":"Vluchtnummer","flightArrivalTime":"Aankomsttijd","notesLabel":"Speciale wensen","confirmBooking":"Boeking bevestigen","paymentError":"Betaling mislukt. Probeer het opnieuw."},"uk":{"navFleet":"Автопарк","navService":"Сервіс","navRoutes":"Маршрути","navReviews":"Відгуки","navContact":"Контакти","bookNow":"Забронювати","alwaysAvailable":"На зв'язку цілодобово, щодня","heroEyebrow":"Приватний шофер · Анталья","heroTitle":"Преміальний трансфер<br />з аеропорту Анталії","heroSubtitle":"Приватні трансфери з водієм з аеропорту Анталії до Белека, Сіде, Кемера та Аланії.","bookTransfer":"Замовити трансфер","instantQuote":"Дізнатися ціну","googleRated":"Рейтинг Google","trustedGuests":"Нам довіряють понад 2 500 гостей","discover":"Детальніше","tbLicensed":"Ліцензія TÜRSAB","tbFlightTracking":"Відстеження рейсу","tbFixedPrice":"Фіксована ціна","tb247Concierge":"Консьєрж 24/7","tbChildSeats":"Дитячі крісла в комплекті","privateJourney":"Ваша приватна поїздка","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Місце зустрічі","airportOption":"Аеропорт Анталії (AYT)","hotelOption":"Готель","privateAddressOption":"Приватна адреса","destination":"Напрямок","selectDestination":"Оберіть напрямок","vehicle":"Автомобіль","guests":"Гості","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Оберіть час","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Повна адреса подачі","dropoffAddress":"Повна адреса призначення","luggageLabel":"Великий багаж","hotelNameLabel":"Назва готелю","childSeatLabel":"Дитячі крісла","childSeatNone":"Без дитячого крісла","oneChildSeat":"1 дитяче крісло","twoChildSeats":"2 дитячі крісла","threeChildSeats":"3 дитячі крісла","fourChildSeats":"4 дитячі крісла","fullName":"Ім'я та прізвище","phoneLabel":"Телефон / WhatsApp","emailLabel":"Ел. пошта","paymentMethod":"Оберіть спосіб оплати","cashPayment":"Оплата в автомобілі","recommended":"Рекомендуємо","cashPaymentDescription":"Без онлайн-передоплати. Фіксовану суму ви передаєте водієві готівкою на початку поїздки.","quoteIncludes":"Включено зустріч, відстеження рейсу, паркування, 90 хвилин очікування та питну воду.","perVehicleNote":"За автомобіль — не за особу · До 6 пасажирів","confirmCashBooking":"Підтвердити — оплата в автомобілі","flightTracking":"Відстеження рейсу в реальному часі","fixedPrice":"Гарантія фіксованої ціни","meetGreet":"Особиста зустріч","speakingDrivers":"Водії розмовляють англійською та німецькою","fromAirport":"З аеропорту Анталії","welcomeEyebrow":"Ласкаво просимо на найвищий рівень","welcomeTitle":"Подорожуйте стильно.<br />Прибувайте спокійно.","welcomeBody":"З моменту приземлення продумано кожну деталь. Наша команда в аеропорту зустрічає вас, водій подає автомобіль до місця посадки, а багаж завантажують у ретельно підготовлене приватне авто.","ourStandards":"Наші стандарти сервісу","concierge":"Підтримка консьєржа","guestsWelcomed":"Зустрінутих гостей","guestRating":"Середня оцінка гостей","privateTransfers":"Приватні трансфери","fleetEyebrow":"Наш автопарк","fleetTitle":"Ваш особистий простір,<br />бездоганний у деталях.","fleetIntro":"Подорожуйте в тиші та комфорті з місцем для сім'ї, багажу та обладнання для гольфу.","signatureFleet":"Фірмовий автопарк","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Еталон комфортних групових поїздок: просторий, надзвичайно тихий та оснащений для бездоганного прибуття.","passengers":"пасажирів","suitcases":"валіз","television":"Телевізор в автомобілі","coldDrinks":"Холодні напої","snacks":"Закуски","childSeats":"Дитячі крісла на запит","wifi":"Безкоштовний WiFi","nameSignGreeting":"Зустріч біля стійки J / 777","reserveVehicle":"Забронювати автомобіль","insideVclass":"Салон Sprinter","interiorTitle":"Приватний лаунж<br />між аеропортом і готелем.","serviceEyebrow":"Стандарт Antalya VIP","serviceTitle":"Більше ніж трансфер.<br />Продумана зустріч.","serviceIntro":"Увага рівня п'ятизіркового готелю, досвідчені місцеві шофери та спокій від аеропорту до курорту.","trackingTitle":"Відстеження рейсу","trackingBody":"Ми відстежуємо ваш рейс у реальному часі та автоматично коригуємо час зустрічі без доплати.","chauffeurTitle":"Професійні шофери","chauffeurBody":"Завжди бездоганний вигляд, делікатність, знання регіону та найвищі стандарти обслуговування.","greetTitle":"Зустріч в аеропорту","greetBody":"Під час міжнародних прильотів наша команда зустрічає вас біля стійки J / 777, викликає водія до місця посадки та допомагає з багажем.","supportTitle":"Консьєрж 24/7","supportBody":"До, під час і після поїздки вам завжди відповість людина по телефону або в WhatsApp.","priceTitle":"Фіксовані ціни","priceBody":"Підтверджена ціна є остаточною. Очікування, паркування та затримки рейсів вже включені.","familyTitle":"Для всієї родини","familyBody":"Дитячі крісла за віком, просторий салон та уважна допомога для спокійного сімейного прибуття.","routesEyebrow":"Найпопулярніші поїздки","routesTitle":"З аеропорту Анталії<br />на Турецьку Рив'єру.","routesIntro":"Усі ціни вказані за автомобіль, а не за пасажира, і включають 90 хвилин очікування.","golfFavourite":"Вибір гравців у гольф","reviewsEyebrow":"Відгуки гостей","reviewsTitle":"Сервіс, який пам'ятають<br />після прибуття.","googleReviews":"На основі 387 підтверджених відгуків Google","trustedBy":"Нам довіряють гості провідних курортів Анталії","faqEyebrow":"Часті запитання","faqTitle":"Перед поїздкою.","faqIntro":"Все, що потрібно знати про приватний трансфер з аеропорту Анталії.","askQuestion":"Поставити запитання","faqCatArrival":"Зустріч і трансфер","faqOneQ":"Що станеться, якщо мій рейс затримається?","faqOneA":"Від вас нічого не потрібно. Ми стежимо за вашим рейсом у реальному часі й автоматично коригуємо час подачі автомобіля. За затримки авіакомпанії ми ніколи не беремо доплат — водій зустріне вас о будь-якій годині, а перші 90 хвилин після посадки завжди включені у вартість.","faqTwoQ":"Я прилітаю міжнародним рейсом. Як відбувається зустріч?","faqTwoA":"Після паспортного контролю та отримання багажу прямуйте разом з іншими пасажирами до зони зустрічі Meet & Greet і підійдіть до нашої стійки J / 777. Достатньо назвати нашому працівникові своє ім'я. Наша команда одразу повідомляє водія; він в'їжджає на територію аеропорту та подає автомобіль до місця посадки, а працівник тим часом проводжає вас до авто. Уся процедура триває близько 7–8 хвилин.","faqSixQ":"Я прилітаю внутрішнім рейсом. Де знайти водія?","faqSixA":"Зона Meet & Greet працює лише для міжнародних прильотів, тому гостей внутрішніх рейсів ми супроводжуємо інакше: перед трансфером надсилаємо вам номер телефону водія. Після посадки просто повідомте йому — він зустріне вас у залі прильотів.","faqSevenQ":"Що робити, якщо біля стійки J / 777 нікого немає?","faqSevenA":"На стійці постійно чергують двоє наших працівників, і їхнє єдине завдання — провести гостей до автомобіля. Якщо стійка на мить порожня, це означає, що колега саме супроводжує гостя, який прилетів перед вами: кожен супровід триває близько 7–8 хвилин. Будь ласка, зачекайте приблизно 10 хвилин. Якщо за цей час ніхто не повернувся, напишіть нам у WhatsApp: ми негайно повідомимо водія, він під'їде до найближчої точки, і ми проведемо вас просто до авто без подальшого очікування.","faqEightQ":"Що буде, якщо мені знадобиться більше ніж 90 хвилин, щоб вийти з аеропорту?","faqEightA":"Перші 90 хвилин після посадки включені у вартість — цього з запасом вистачає на паспортний контроль, багаж і митницю, а в разі затримки рейсу відлік зміщується автоматично. Лише якщо ви затримаєтеся в терміналі довше з причин, не пов'язаних із рейсом, додається паркувальний внесок 5 € за кожну додаткову годину. На практиці це трапляється майже ніколи: переважна більшість гостей вирушає задовго до цього.","faqCatJourney":"Зворотний трансфер і поїздка","faqTenQ":"Як підтримувати зв'язок під час зворотного трансферу?","faqTenA":"Щойно ви підтвердите дату й час зворотної поїздки нашій команді у WhatsApp, за кілька годин до трансферу ми призначаємо автомобіль і надсилаємо вам його фотографії у WhatsApp — за бажанням також номер телефону водія. Коли водій приїжджає до готелю, він повідомляє рецепцію, а вона передає у ваш номер, що авто подано. Наші водії ніколи не телефонують гостям напряму: усе спілкування відбувається через єдину лінію підтримки у WhatsApp, тож ви завжди точно знаєте, з ким розмовляєте.","faqFourteenQ":"Що робити, якщо я запізнююся на зворотний трансфер?","faqFourteenA":"Водій приїжджає до готелю в узгоджений час і чекає 15 хвилин безкоштовно. Якщо розумієте, що затримаєтеся, напишіть нам у WhatsApp: ми перевіримо час вильоту, повідомимо водія та скоригуємо план разом із вами. Наша мета — не квапити вас, а спокійно доправити на рейс.","faqFifteenQ":"Чи можна зробити зупинку в дорозі?","faqFifteenA":"Звісно. Якщо хочете заїхати до супермаркету чи аптеки або зупинитися для фото, скажіть про це під час бронювання або напишіть у WhatsApp — ми спланусмо маршрут із урахуванням зупинки. Якщо зупинка суттєво відхиляє від маршруту, перед виїздом повідомимо, чи додається щось до суми: жодних сюрпризів потім.","faqCatPayment":"Оплата й ціна","faqNineQ":"Як відбувається оплата?","faqNineA":"Ви розраховуєтеся з водієм готівкою на початку поїздки — картки не приймаються. Ціни встановлені в євро (EUR): фіксована сума точно відповідає тій, яку ви бачили під час бронювання, — за автомобіль, з усіма аеропортовими та паркувальними зборами, без подальших доплат. Бажаєте сплатити в доларах США чи турецьких лірах? Напишіть нам заздалегідь у WhatsApp, щоб отримати окрему ціну, оскільки курс відрізняється. Водій зустрічає вас, завантажує багаж і встановлює замовлені дитячі крісла; після оплати ваша поїздка починається.","faqTwelveQ":"У якій валюті можна розрахуватися?","faqTwelveA":"Наші ціни встановлені в євро (EUR) і сплачуються готівкою; картки не приймаємо. Якщо зручніше платити в доларах США чи турецьких лірах, сума залежить від курсу на день, тому напишіть нам у WhatsApp перед трансфером: ми назвемо чітку ціну та попередимо водія — в автомобілі нічого не обговорюється.","faqElevenQ":"Чи можу я скасувати або змінити бронювання?","faqElevenA":"Так, і завжди безкоштовно. Ми не беремо передоплати, тож повертати нічого й чекати на гроші не доводиться — якщо плани змінилися, достатньо написати нам у WhatsApp. Зміну часу, номера рейсу чи адреси призначення оформлюємо так само, без доплат.","faqFiveQ":"Вказана ціна є остаточною?","faqFiveA":"Так. Ціна, яку ви бачите під час бронювання, — це сума, яку ви передаєте водієві готівкою: за автомобіль, з усіма аеропортовими зборами, паркуванням і першими 90 хвилинами очікування. Прихованих платежів немає.","faqCatVehicle":"Автомобіль і багаж","faqThreeQ":"Чи є дитячі крісла?","faqThreeA":"Так. Автолюльки, дитячі крісла та бустери надаються безкоштовно на запит при бронюванні.","faqThirteenQ":"Скільки багажу можна взяти?","faqThirteenA":"Як правило, одна велика валіза та одне місце ручної поклажі на пасажира. Якщо багажу більше — додаткова валіза, гольф-бег, візочок, лижі чи велосипед — просто зазначте це під час бронювання, і ми без доплат подамо автомобіль потрібної місткості. Головне — попередити заздалегідь. Mercedes Vito вміщує до 6 пасажирів, Sprinter — до 12.","faqFourQ":"Чи можна перевезти сумки для гольфу та великий багаж?","faqFourA":"Так. Sprinter і Vito ідеально підходять для груп гравців у гольф. Повідомте об'єм багажу і ми підберемо автомобіль.","contactEyebrow":"Ваша подорож починається тут","contactTitle":"Прибудьте в Анталью<br />надзвичайно комфортно.","contactBody":"Забронюйте онлайн менш ніж за дві хвилини або зв'яжіться з нашою службою консьєржа 24/7.","whatsappUs":"Написати в WhatsApp","replyMinutes":"Зазвичай відповідаємо за кілька хвилин","callUs":"Зателефонувати 24/7","emailUs":"Написати консьєржу","replyHour":"Відповідь протягом години","footerTagline":"Приватні послуги шофера по всій Турецькій Рив'єрі.","explore":"Розділи","information":"Інформація","licensed":"Ліцензований оператор приватних трансферів · Відповідає вимогам TÜRSAB","bookingConfirmed":"Бронювання підтверджено","referenceLabel":"Референс","weWillContact":"Ваш запит на бронювання надіслано. Ми зв'яжемося з вами протягом 30 хвилин.","chatWithUs":"Написати нам","pickupAddressPlaceholder":"Назва готелю, вулиця, номер будинку та район","dropoffAddressPlaceholder":"Назва готелю, вулиця, номер будинку та район","hotelNamePlaceholder":"Назва готелю або місця проживання","stepRoute":"Маршрут","stepDetails":"Деталі","stepContact":"Контакт","reserveForPrice":"Забронювати","continue":"Продовжити","back":"Назад","perVehicleNoteVito":"За автомобіль — не за особу · До 6 пасажирів","perVehicleNoteSprinter":"За автомобіль — не за особу · До 12 пасажирів","perVehicle":"за автомобіль · фіксована ціна","requestQuote":"Запросити розрахунок","cashConfirmation":"Ваше бронювання підтверджено. Фіксовану суму ви передасте водієві готівкою на початку поїздки.","bookingError":"Не вдалося завершити бронювання. Спробуйте ще раз.","formIncomplete":"Заповніть виділені поля.","requiredField":"Це поле обов'язкове.","destinationRequired":"Оберіть напрямок.","dateInvalid":"Оберіть сьогоднішню або майбутню дату.","emailInvalid":"Введіть дійсну електронну адресу.","nameInvalid":"Введіть дійсне повне ім'я.","phoneInvalid":"Введіть дійсний номер із кодом країни (наприклад, +49).","flightInvalid":"Введіть дійсний номер рейсу.","pickupAddressRequired":"Адреса подачі має містити від 6 до 160 символів.","dropoffAddressRequired":"Адреса призначення має містити від 6 до 160 символів.","addressesMustDiffer":"Адреси подачі та призначення мають відрізнятися.","customDestinationPrice":"Ціна буде підтверджена після перевірки адреси призначення.","hotelNameRequired":"Введіть назву готелю.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","quoteTitle":"Куди вас відвезти?","date":"Дата","airportReturnPrice":"Ціну буде підтверджено після перевірки готелю або адреси подачі.","oneGuest":"1 гість","twoGuests":"2 гості","threeGuests":"3 гості","fourGuests":"4 гості","fiveGuests":"5 гостей","sixGuests":"6 гостей","sevenGuests":"7 гостей","viewQuote":"Показати ціну","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Просторий приватний салон для великих сімей, груп гравців у гольф та гостей з об'ємним багажем.","capacitySwitchedSprinter":"Пасажири та багаж перевищують Vito — обрано Mercedes Sprinter.","capacityNoVehicle":"Стільки пасажирів і багажу перевищує наші автомобілі. Напишіть нам у WhatsApp.","leatherSeats":"Преміальні шкіряні сидіння","water":"Охолоджена вода","from":"Від","reviewOne":"«Незважаючи на затримку рейсу на 90 хвилин, водій чекав на нас. Автомобіль був бездоганно чистим та прохолодним, а обидва дитячі крісла вже були встановлені. Саме така зустріч потрібна нашій родині».","reviewTwo":"«Від першого повідомлення в WhatsApp до прибуття в Белек все було на найвищому рівні. Пунктуально, делікатно і дуже професійно. Наші сумки для гольфу легко помістилися».","reviewThree":"«Це нагадувало трансфер від п'ятизіркового готелю, а не таксі з аеропорту. Чіткий зв'язок, бездоганний автомобіль та по-справжньому ввічливий водій».","faqReminder":"Перед поїздкою ознайомтеся з розділом поширених запитань на нашому сайті.","viewFaq":"Переглянути FAQ","quoteReady":"Ваш приватний трансфер","journeyTime":"Час у дорозі","totalFixed":"Підсумкова ціна","confirmWhatsapp":"Підтвердити в WhatsApp","bookNowCta":"Забронювати","backToQuote":"Назад","yourDetails":"Ваші дані","flightNumber":"Номер рейсу","flightArrivalTime":"Час прильоту","notesLabel":"Особливі побажання","confirmBooking":"Підтвердити бронювання","paymentError":"Оплата не пройшла. Спробуйте ще раз."},"ur":{"navFleet":"گاڑیاں","navService":"خدمات","navRoutes":"راستے","navReviews":"جائزے","navContact":"رابطہ","bookNow":"ابھی بک کریں","alwaysAvailable":"24 گھنٹے، ہر روز دستیاب","heroEyebrow":"نجی شوفر سروس · انطالیہ","heroTitle":"انطالیہ میں پریمیم<br />ایئرپورٹ ٹرانسفر","heroSubtitle":"انطالیہ ایئرپورٹ سے بیلک، سیدے، کیمر اور الانیا تک نجی شوفر سروس۔","bookTransfer":"ٹرانسفر بک کریں","instantQuote":"فوری قیمت جانیں","googleRated":"گوگل ریٹڈ","trustedGuests":"2,500+ مسافروں کا اعتماد","discover":"دریافت کریں","tbLicensed":"TÜRSAB لائسنس یافتہ","tbFlightTracking":"فلائٹ ٹریکنگ","tbFixedPrice":"مقررہ قیمت","tb247Concierge":"24/7 کنسیرج","tbChildSeats":"بچوں کی نشستیں شامل","privateJourney":"آپ کا نجی سفر","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"سفر کی قسم","oneWay":"ایک طرفہ","roundTrip":"آنا جانا","roundTripHint":"واپسی کا سفر اسی راستے سے ہوگا۔","pickup":"پک اپ","airportOption":"انطالیہ ایئرپورٹ (AYT)","hotelOption":"ہوٹل","privateAddressOption":"نجی پتہ","destination":"منزل","selectDestination":"منزل منتخب کریں","vehicle":"گاڑی","guests":"مسافر","arrivalDate":"آمد کی تاریخ","arrivalFlightTime":"فلائٹ آمد کا وقت","chooseTime":"وقت منتخب کریں","arrivalFlightNumber":"آمد کا فلائٹ نمبر","returnDate":"واپسی کی تاریخ","returnPickupTime":"واپسی کا پک اپ وقت","returnFlightNumber":"واپسی کا فلائٹ نمبر","pickupAddress":"پک اپ کا مکمل پتہ","dropoffAddress":"ڈراپ آف کا مکمل پتہ","luggageLabel":"بڑا سامان","hotelNameLabel":"ہوٹل کا نام","childSeatLabel":"بچوں کی نشستیں","childSeatNone":"کوئی بچوں کی نشست نہیں","oneChildSeat":"1 بچوں کی نشست","twoChildSeats":"2 بچوں کی نشستیں","threeChildSeats":"3 بچوں کی نشستیں","fourChildSeats":"4 بچوں کی نشستیں","fullName":"پورا نام","phoneLabel":"فون / واٹس ایپ","emailLabel":"ای میل","paymentMethod":"ادائیگی کا طریقہ منتخب کریں","cashPayment":"گاڑی میں ادائیگی","recommended":"تجویز کردہ","cashPaymentDescription":"آن لائن پیشگی ادائیگی نہیں۔ مقررہ رقم آپ سفر کے آغاز پر ڈرائیور کو نقد ادا کرتے ہیں۔","quoteIncludes":"استقبال، فلائٹ ٹریکنگ، پارکنگ، 90 منٹ انتظار اور بوتل بند پانی شامل ہے۔","perVehicleNote":"فی گاڑی — فی شخص نہیں · زیادہ سے زیادہ 6 مسافر","confirmCashBooking":"بکنگ کی تصدیق کریں — گاڑی میں ادا کریں","flightTracking":"حقیقی وقت کی فلائٹ ٹریکنگ","fixedPrice":"مقررہ قیمت کی ضمانت","meetGreet":"ذاتی میٹ اینڈ گریٹ","speakingDrivers":"انگریزی اور جرمن بولنے والے","fromAirport":"انطالیہ ایئرپورٹ سے","welcomeEyebrow":"ایک بہتر آمد میں خوش آمدید","welcomeTitle":"خوبصورتی سے سفر کریں۔<br />آسانی سے پہنچیں۔","welcomeBody":"آپ کی لینڈنگ کے لمحے سے ہر تفصیل کا خیال رکھا جاتا ہے۔ ہماری ایئرپورٹ ٹیم آپ کا استقبال کرتی ہے، آپ کا ڈرائیور پک اپ پوائنٹ پر گاڑی لے آتا ہے اور آپ کا سامان احتیاط سے تیار کی گئی نجی گاڑی میں رکھا جاتا ہے۔","ourStandards":"ہمارے سروس معیارات","concierge":"کنسیرج سپورٹ","guestsWelcomed":"مسافروں کا استقبال","guestRating":"اوسط مسافر ریٹنگ","privateTransfers":"نجی ٹرانسفر","fleetEyebrow":"گاڑیاں","fleetTitle":"آپ کی نجی جگہ،<br />ہر تفصیل میں بہترین۔","fleetIntro":"اپنے خاندان، گولف کا سامان اور سامان کے لیے کافی جگہ کے ساتھ پرسکون آرام سے سفر کریں۔","signatureFleet":"سگنیچر فلیٹ","fleetVclassClass":"بزنس · فرسٹ کلاس","fleetVclassDescription":"بڑے گروپوں کے لیے کشادہ VIP ٹرانسپورٹ، مسافروں اور سامان کے لیے وافر جگہ کے ساتھ۔","passengers":"مسافر","suitcases":"سوٹ کیس","television":"گاڑی میں ٹیلی ویژن","coldDrinks":"ٹھنڈے مشروبات","snacks":"اسنیکس","childSeats":"بچوں کی نشست دستیاب","wifi":"مجانی WiFi","nameSignGreeting":"کاؤنٹر J / 777 پر استقبال","reserveVehicle":"یہ گاڑی بک کریں","insideVclass":"اسپرنٹر کے اندر","interiorTitle":"ایئرپورٹ اور آپ کے ہوٹل کے<br />درمیان ایک نجی لاؤنج۔","serviceEyebrow":"انطالیہ VIP معیار","serviceTitle":"صرف ٹرانسفر سے بڑھ کر۔<br />ایک سوچا سمجھا خیرمقدم۔","serviceIntro":"ہوٹل جیسی توجہ، تجربہ کار مقامی شوفر اور رن وے سے ریزورٹ تک مکمل سکون۔","trackingTitle":"فلائٹ ٹریکنگ","trackingBody":"ہم آپ کی فلائٹ کو حقیقی وقت میں مانیٹر کرتے ہیں اور آپ کا پک اپ خودکار طور پر ایڈجسٹ کرتے ہیں، بغیر کسی اضافی چارج کے۔","chauffeurTitle":"پیشہ ور شوفر","chauffeurBody":"بے داغ پیش کردہ، سمجھدار اور اپنی مقامی معلومات اور سروس معیارات کے لیے منتخب۔","greetTitle":"میٹ اینڈ گریٹ","greetBody":"بین الاقوامی آمد پر ہماری ایئرپورٹ ٹیم آپ کو کاؤنٹر J / 777 پر ملتی ہے، ڈرائیور کو پک اپ پوائنٹ پر بلاتی ہے اور سامان میں مدد کرتی ہے۔","supportTitle":"24/7 کنسیرج","supportBody":"آپ کے سفر سے پہلے، دوران اور بعد میں ایک حقیقی شخص فون یا واٹس ایپ پر ہمیشہ دستیاب ہے۔","priceTitle":"مقررہ قیمتیں","priceBody":"تصدیق شدہ قیمت وہی ہے جو آپ ادا کرتے ہیں۔ انتظار کا وقت، پارکنگ اور فلائٹ میں تاخیر شامل ہے۔","familyTitle":"خاندان کے لیے تیار","familyBody":"عمر کے مطابق بچوں کی نشستیں، کشادہ کیبن اور پرسکون خاندانی آمد کے لیے صبر مند مدد۔","routesEyebrow":"ہمارے سب سے مطلوب سفر","routesTitle":"انطالیہ ایئرپورٹ سے<br />ترکی ریویرا تک۔","routesIntro":"تمام قیمتیں فی گاڑی ہیں، فی مسافر نہیں، اور ان میں 90 منٹ کا انتظار شامل ہے۔","golfFavourite":"گولف کا پسندیدہ","reviewsEyebrow":"مسافروں کے جائزے","reviewsTitle":"آمد کے بعد بھی یاد رہنے<br />والی سروس۔","googleReviews":"387 تصدیق شدہ گوگل جائزوں پر مبنی","trustedBy":"انطالیہ کے معروف ریزورٹس کے مسافروں کا اعتماد","faqEyebrow":"اکثر پوچھے گئے سوالات","faqTitle":"سفر سے پہلے۔","faqIntro":"اپنے نجی انطالیہ ایئرپورٹ ٹرانسفر کے بارے میں آپ کو جو کچھ جاننا ضروری ہے۔","askQuestion":"ہم سے سوال پوچھیں","faqCatArrival":"آمد اور ٹرانسفر","faqOneQ":"اگر میری پرواز میں تاخیر ہو جائے تو کیا ہوگا؟","faqOneA":"آپ کو کچھ کرنے کی ضرورت نہیں۔ ہم آپ کی پرواز کو حقیقی وقت میں ٹریک کرتے ہیں اور پک اپ کا وقت خودکار طور پر ایڈجسٹ کر دیتے ہیں۔ ایئر لائن کی وجہ سے ہونے والی تاخیر پر کبھی کوئی اضافی چارج نہیں لیا جاتا — آپ جب بھی لینڈ کریں، آپ کا ڈرائیور موجود ہوگا، اور لینڈنگ کے بعد پہلے 90 منٹ ہمیشہ قیمت میں شامل ہیں۔","faqTwoQ":"میں بین الاقوامی پرواز سے آ رہا ہوں، استقبال کیسے ہوتا ہے؟","faqTwoA":"پاسپورٹ کنٹرول اور سامان وصول کرنے کے بعد دیگر مسافروں کے ساتھ Meet & Greet ایریا کی طرف بڑھیں اور ہمارے کاؤنٹر J / 777 پر آئیں۔ ہمارے عملے کو صرف اپنا نام بتائیں — کم رش کے اوقات میں آپ کو اپنے نام کا سائن بورڈ بھی نظر آئے گا، جبکہ مصروف اوقات میں نام بتانا ہی کافی ہے۔ ہماری ٹیم فوراً آپ کے ڈرائیور کو اطلاع دیتی ہے؛ وہ ایئرپورٹ میں داخل ہو کر پک اپ پوائنٹ پر گاڑی لے آتا ہے اور اسی دوران ہمارا عملہ آپ کو گاڑی تک پہنچاتا ہے۔ پورا عمل تقریباً 7 سے 8 منٹ لیتا ہے۔","faqSixQ":"میں ملکی (ڈومیسٹک) پرواز سے آ رہا ہوں، اپنے ڈرائیور کو کہاں تلاش کروں؟","faqSixA":"Meet & Greet ایریا صرف بین الاقوامی آمد کے لیے ہے، اس لیے ڈومیسٹک مہمانوں کا انتظام مختلف ہے: ہم ٹرانسفر سے پہلے آپ کو ڈرائیور کا فون نمبر بھیج دیتے ہیں۔ لینڈ کرنے کے بعد انہیں مختصر اطلاع دیں — وہ آپ کو ارائیول ہال سے وصول کریں گے۔","faqSevenQ":"اگر کاؤنٹر J / 777 پر کوئی موجود نہ ہو تو کیا کروں؟","faqSevenA":"ہمارے کاؤنٹر پر مستقل طور پر دو اہلکار موجود رہتے ہیں اور ان کا واحد کام آنے والے مہمانوں کو ان کی گاڑی تک پہنچانا ہے۔ اگر کاؤنٹر لمحہ بھر کے لیے خالی ملے تو اس کا مطلب ہے کہ ساتھی اہلکار آپ سے پہلے آنے والے مہمان کو گاڑی تک لے گیا ہے — ہر مہمان کو پہنچانے میں تقریباً 7 سے 8 منٹ لگتے ہیں۔ براہِ کرم تقریباً 10 منٹ انتظار کریں۔ اگر اس دوران بھی کوئی واپس نہ آئے تو ہمیں WhatsApp پر پیغام دیں: ہم فوراً آپ کے ڈرائیور کو اطلاع دیں گے، اسے قریب ترین مقام پر کھڑا کروائیں گے اور آپ کو مزید انتظار کے بغیر سیدھا گاڑی تک پہنچا دیں گے۔","faqEightQ":"اگر مجھے ایئرپورٹ سے نکلنے میں 90 منٹ سے زیادہ لگ جائیں تو کیا ہوگا؟","faqEightA":"طیارے کی لینڈنگ کے بعد پہلے 90 منٹ مفت شامل ہیں — پاسپورٹ کنٹرول، سامان اور کسٹم کے لیے یہ وقت بخوبی کافی ہے، اور پرواز میں تاخیر کی صورت میں یہ دورانیہ خودکار طور پر آگے کھسک جاتا ہے۔ صرف اس صورت میں جب پرواز سے غیر متعلق کوئی وجہ آپ کو ٹرمینل میں زیادہ دیر روکے، ہر اضافی گھنٹے کے لیے 5 یورو پارکنگ چارج شامل کیا جاتا ہے۔ عملی طور پر ایسا تقریباً کبھی نہیں ہوتا؛ ہمارے تقریباً تمام مہمان اس سے کہیں پہلے روانہ ہو چکے ہوتے ہیں۔","faqCatJourney":"واپسی اور سفر","faqTenQ":"واپسی کے ٹرانسفر کے لیے رابطہ کیسے رہے گا؟","faqTenA":"جب آپ WhatsApp پر ہماری ٹیم کے ساتھ واپسی کی تاریخ اور وقت کی تصدیق کر دیتے ہیں، تو ہم ٹرانسفر سے چند گھنٹے پہلے آپ کی گاڑی مقرر کرتے ہیں اور WhatsApp پر اس کی تصاویر بھیجتے ہیں — آپ چاہیں تو ڈرائیور کا فون نمبر بھی۔ ڈرائیور ہوٹل پہنچ کر استقبالیہ کو اطلاع دیتا ہے، اور استقبالیہ آپ کے کمرے میں بتا دیتا ہے کہ گاڑی تیار ہے۔ ہمارے ڈرائیور مہمانوں کو براہِ راست فون نہیں کرتے: تمام رابطہ ہماری واحد WhatsApp سپورٹ لائن کے ذریعے ہوتا ہے، تاکہ آپ کو ہمیشہ معلوم ہو کہ آپ کس سے بات کر رہے ہیں۔","faqFourteenQ":"اگر میں واپسی کے ٹرانسفر کے لیے دیر کر دوں تو کیا ہوگا؟","faqFourteenA":"آپ کا ڈرائیور مقررہ وقت پر ہوٹل پہنچ جاتا ہے اور 15 منٹ مفت انتظار کرتا ہے۔ اگر آپ کو تاخیر کا اندازہ ہو تو WhatsApp پر ایک پیغام کافی ہے: ہم آپ کی پرواز کا وقت دیکھتے ہیں، ڈرائیور کو بتاتے ہیں اور آپ کے ساتھ مل کر پروگرام ترتیب دیتے ہیں۔ ہمارا مقصد آپ کو جلدی میں ڈالنا نہیں بلکہ آرام سے آپ کی پرواز تک پہنچانا ہے۔","faqFifteenQ":"کیا سفر کے دوران اضافی اسٹاپ ممکن ہے؟","faqFifteenA":"بالکل ممکن ہے۔ اگر آپ راستے میں سپر مارکیٹ یا فارمیسی پر رکنا چاہیں یا تصویر کے لیے مختصر وقفہ لینا چاہیں تو بکنگ کے وقت یا WhatsApp پر بتا دیں — ہم راستہ اسی حساب سے ترتیب دیں گے۔ اگر اسٹاپ آپ کے راستے سے نمایاں طور پر دور لے جائے تو روانگی سے پہلے واضح کر دیتے ہیں کہ کوئی اضافی رقم ہوگی یا نہیں؛ بعد میں کچھ بھی شامل نہیں کیا جاتا۔","faqCatPayment":"ادائیگی اور قیمت","faqNineQ":"ادائیگی کیسے کی جاتی ہے؟","faqNineA":"آپ سفر کے آغاز پر اپنے ڈرائیور کو نقد ادائیگی کرتے ہیں — ہم کارڈ قبول نہیں کرتے۔ قیمتیں یورو (EUR) میں مقرر ہیں: مقررہ رقم بالکل وہی ہے جو بکنگ کے وقت آپ نے دیکھی تھی — فی گاڑی، تمام ایئرپورٹ اور پارکنگ فیس سمیت، بعد میں کچھ شامل نہیں ہوتا۔ اگر آپ امریکی ڈالر یا ترک لیرا میں ادائیگی کرنا چاہیں تو پہلے سے WhatsApp پر ہمیں پیغام بھیجیں تاکہ الگ قیمت دی جا سکے، کیونکہ شرحِ تبادلہ مختلف ہوتی ہے۔ آپ کا ڈرائیور آپ کا استقبال کرتا ہے، سامان گاڑی میں رکھتا ہے اور درخواست کردہ چائلڈ سیٹس لگاتا ہے؛ ادائیگی کے بعد آپ کا سفر شروع ہو جاتا ہے۔","faqTwelveQ":"میں کس کرنسی میں ادائیگی کر سکتا ہوں؟","faqTwelveA":"ہماری قیمتیں یورو (EUR) میں مقرر ہیں اور ادائیگی نقد ہوتی ہے؛ کارڈ قبول نہیں کیے جاتے۔ اگر آپ امریکی ڈالر یا ترک لیرا میں ادائیگی کرنا چاہیں تو رقم اُس دن کے ریٹ پر منحصر ہوگی، اس لیے ٹرانسفر سے پہلے ہمیں WhatsApp پر پیغام دیں۔ ہم آپ کو واضح قیمت بتا دیں گے اور ڈرائیور کو بھی مطلع کر دیں گے — گاڑی میں کوئی بات چیت نہیں ہوتی۔","faqElevenQ":"کیا میں اپنی بکنگ منسوخ یا تبدیل کر سکتا ہوں؟","faqElevenA":"جی ہاں، اور ہمیشہ مفت۔ چونکہ ہم پیشگی ادائیگی نہیں لیتے، اس لیے واپس کرنے کو کچھ نہیں ہوتا اور رقم کی واپسی کا انتظار بھی نہیں کرنا پڑتا — منصوبہ بدل جائے تو WhatsApp پر ایک پیغام کافی ہے۔ وقت، فلائٹ نمبر یا منزل کے پتے کی تبدیلی بھی اسی طرح، بغیر کسی اضافی چارج کے کر دی جاتی ہے۔","faqFiveQ":"کیا دی گئی قیمت حتمی ہے؟","faqFiveA":"جی ہاں۔ بکنگ کے وقت نظر آنے والی قیمت ہی وہ رقم ہے جو آپ ڈرائیور کو نقد دیتے ہیں — فی گاڑی، تمام ایئرپورٹ فیس، پارکنگ اور لینڈنگ کے بعد پہلے 90 منٹ کے انتظار سمیت۔ کوئی پوشیدہ چارجز نہیں۔","faqCatVehicle":"گاڑی اور سامان","faqThreeQ":"کیا بچوں کی نشستیں دستیاب ہیں؟","faqThreeA":"ہاں۔ بکنگ کے وقت درخواست کرنے پر شیر خوار، چھوٹے بچوں اور بوسٹر نشستیں مجانی دستیاب ہیں۔","faqThirteenQ":"میں کتنا سامان لا سکتا ہوں؟","faqThirteenA":"عام اصول یہ ہے کہ فی مسافر ایک بڑا سوٹ کیس اور ایک ہینڈ بیگ۔ اگر اس سے زیادہ ہو — اضافی سوٹ کیس، گولف بیگ، بچوں کی پرام، اسکیز یا سائیکل — تو بکنگ کے وقت بتا دیں؛ ہم بغیر اضافی چارج کے مناسب گنجائش والی گاڑی مقرر کر دیں گے۔ اہم صرف یہ ہے کہ ہمیں پہلے سے علم ہو۔ مرسیڈیز ویٹو 6 مسافروں تک اور سپرنٹر 12 مسافروں تک لے جاتی ہے۔","faqFourQ":"کیا آپ گولف بیگ اور بڑا سامان لے جا سکتے ہیں؟","faqFourA":"ہاں۔ ہماری اسپرنٹر اور ویٹو گاڑیاں گولف گروپوں کے لیے موزوں ہیں۔ ہمیں اپنے سامان کی تفصیلات بتائیں اور ہم صحیح گاڑی مختص کریں گے۔","contactEyebrow":"آپ کا سفر یہاں سے شروع ہوتا ہے","contactTitle":"انطالیہ میں<br />شاندار طریقے سے پہنچیں۔","contactBody":"دو منٹ سے کم میں آن لائن بک کریں یا ہماری 24/7 کنسیرج ٹیم سے براہ راست بات کریں۔","whatsappUs":"واٹس ایپ کریں","replyMinutes":"عام طور پر منٹوں میں جواب دیتے ہیں","callUs":"24/7 کال کریں","emailUs":"کنسیرج کو ای میل کریں","replyHour":"ایک گھنٹے کے اندر جواب دیتے ہیں","footerTagline":"ترکی ریویرا میں نجی شوفر خدمات۔","explore":"دریافت کریں","information":"معلومات","licensed":"لائسنس یافتہ نجی ٹرانسفر آپریٹر · TÜRSAB تعمیل","bookingConfirmed":"بکنگ کی تصدیق ہو گئی","referenceLabel":"حوالہ","weWillContact":"آپ کی بکنگ کی درخواست بھیج دی گئی۔ ہم 30 منٹ کے اندر آپ سے رابطہ کریں گے۔","chatWithUs":"ہم سے چیٹ کریں","pickupAddressPlaceholder":"ہوٹل کا نام، گلی، عمارت نمبر اور علاقہ","dropoffAddressPlaceholder":"ہوٹل کا نام، گلی، عمارت نمبر اور علاقہ","hotelNamePlaceholder":"ہوٹل یا رہائش کا نام","stepRoute":"راستہ","stepDetails":"تفصیلات","stepContact":"رابطہ","reserveForPrice":"بک کریں","continue":"جاری رکھیں","back":"پیچھے","perVehicleNoteVito":"فی گاڑی — فی شخص نہیں · زیادہ سے زیادہ 6 مسافر","perVehicleNoteSprinter":"فی گاڑی — فی شخص نہیں · زیادہ سے زیادہ 12 مسافر","perVehicle":"فی گاڑی","requestQuote":"قیمت کا اندازہ لگائیں","cashConfirmation":"آپ کی بکنگ کی تصدیق ہو گئی۔ مقررہ کل رقم آپ سفر کے آغاز پر ڈرائیور کو نقد ادا کریں گے۔","bookingError":"آپ کی بکنگ مکمل نہیں ہو سکی۔ براہ کرم دوبارہ کوشش کریں۔","formIncomplete":"براہ کرم نمایاں شدہ خانے مکمل کریں۔","requiredField":"یہ خانہ ضروری ہے۔","destinationRequired":"براہ کرم ایک منزل منتخب کریں۔","dateInvalid":"براہ کرم آج یا مستقبل کی تاریخ منتخب کریں۔","emailInvalid":"براہ کرم ایک درست ای میل پتہ درج کریں۔","nameInvalid":"براہ کرم ایک درست پورا نام درج کریں۔","phoneInvalid":"براہ کرم ملک کوڈ کے ساتھ ایک درست نمبر درج کریں (مثال کے طور پر +92)۔","flightInvalid":"براہ کرم ایک درست فلائٹ نمبر درج کریں۔","pickupAddressRequired":"پک اپ کا پتہ 6 سے 160 حروف کے درمیان ہونا چاہیے۔","dropoffAddressRequired":"ڈراپ آف کا پتہ 6 سے 160 حروف کے درمیان ہونا چاہیے۔","addressesMustDiffer":"پک اپ اور ڈراپ آف کے پتے مختلف ہونے چاہئیں۔","customDestinationPrice":"ڈراپ آف پتہ جانچنے کے بعد قیمت کی تصدیق کی جائے گی۔","hotelNameRequired":"براہ کرم ہوٹل کا نام درج کریں۔","roundTripPriceNote":"آنا جانا · 2 سفر","returnDateRequired":"براہ کرم واپسی کی تاریخ منتخب کریں۔","returnDateInvalid":"براہ کرم جانے کے سفر پر یا اس کے بعد کی واپسی کی تاریخ منتخب کریں۔","returnTimeRequired":"براہ کرم واپسی کا پک اپ وقت منتخب کریں۔","dailyChauffeur":"روزانہ گاڑی + شوفر","days":"دن","dailyChauffeurHint":"بغیر کلومیٹر یا گھنٹے کی حد کے روزانہ کی بنیاد پر نجی گاڑی اور شوفر کرایہ پر لیں۔ ایندھن الگ ادا کیا جاتا ہے۔","serviceStartDate":"پہلی سروس کا دن","serviceEndDate":"آخری سروس کا دن","dailyPickupTime":"سروس شروع ہونے کا وقت","dailyPickupTimeRequired":"براہ کرم روزانہ سروس شروع ہونے کا وقت منتخب کریں۔","serviceEndDateRequired":"براہ کرم آخری سروس کا دن منتخب کریں۔","servicePeriodInvalid":"براہ کرم 1 سے 30 دن کے درمیان مدت منتخب کریں۔","arrivalFlightTimeOptional":"آمد کا فلائٹ وقت (اختیاری)","arrivalFlightNumberOptional":"آمد کا فلائٹ نمبر (اختیاری)","servicePrice":"سروس قیمت","fuelExcludedShort":"ایندھن شامل نہیں","fuelExcludedDetail":"ایندھن شامل نہیں ہے اور استعمال کے مطابق الگ ادا کیا جاتا ہے۔","departureFlightDate":"روانگی کی فلائٹ کی تاریخ","departureFlightTime":"روانگی کی فلائٹ کا وقت","departureFlightNumber":"روانگی کا فلائٹ نمبر","departureFlightDateRequired":"براہ کرم روانگی کی فلائٹ کی تاریخ منتخب کریں۔","departureFlightDateInvalid":"براہ کرم آج یا مستقبل کی تاریخ منتخب کریں۔","dailyQuoteIncludes":"بغیر کلومیٹر یا گھنٹے کی حد کے روزانہ شوفر سروس شامل ہے۔ ایندھن الگ ادا کیا جاتا ہے۔","reviewAndConfirm":"جائزہ لیں اور تصدیق کریں","fuelTermsTitle":"ایندھن کی شرائط","fuelTermsBody":"روزانہ شوفر سروس کے لیے، ایندھن کی لاگت شامل نہیں ہے۔ آپ ڈرائیور کو براہ راست استعمال شدہ ایندھن کی ادائیگی کریں گے۔","fuelTermsCheckbox":"میں سمجھتا/سمجھتی ہوں کہ ایندھن الگ ادا کیا جائے گا","cancel":"منسوخ کریں","close":"بند کریں","understandAndConfirm":"سمجھ گیا، تصدیق کریں","dailyCashConfirmation":"آپ کی روزانہ شوفر سروس کی بکنگ کی تصدیق ہو گئی۔ ہر دن کے اختتام پر اپنے ڈرائیور کو ادا کریں۔","campaignBadge":"آن لائن خصوصی","campaignDiscount":"خصوصی قیمت","campaignScope":"تمام ٹرانسفر قیمتوں پر","campaignApplied":"آن لائن خصوصی قیمت لاگو ہو گئی","discountPricesShown":"آن لائن خصوصی قیمتیں دکھائی جا رہی ہیں","onlineDiscountShort":"آن لائن خصوصی قیمت","faqReminder":"اپنے سفر سے پہلے براہِ کرم ہماری ویب سائٹ کا FAQ سیکشن ملاحظہ کریں۔","viewFaq":"FAQ دیکھیں","quoteTitle":"آپ کا کوٹ","date":"تاریخ","airportReturnPrice":"ایئرپورٹ واپسی قیمت","oneGuest":"1 مسافر","twoGuests":"2 مسافر","threeGuests":"3 مسافر","fourGuests":"4 مسافر","fiveGuests":"5 مسافر","sixGuests":"6 مسافر","sevenGuests":"7 مسافر","viewQuote":"کوٹ دیکھیں","fleetVitoClass":"پریمیم · VIP","fleetVitoDescription":"چھوٹے گروپوں کے لیے ایگزیکٹو VIP ٹرانسپورٹ، کشادہ اندرونی حصے اور پریمیم آرام کے ساتھ۔","capacitySwitchedSprinter":"8 یا اس سے زیادہ مسافروں کے لیے اسپرنٹر خودکار طور پر منتخب ہو گیا","capacityNoVehicle":"موجودہ مسافروں کے لیے کوئی گاڑی دستیاب نہیں","leatherSeats":"چمڑے کی نشستیں","water":"پانی","from":"سے","reviewOne":"ویٹو ڈرائیور وقت پر تھے، بہترین گاڑی، ہر چیز بہت اچھی طرح منظم تھی۔","reviewTwo":"شاندار سروس! ڈرائیور وقت پر تھا، گاڑی بالکل صاف تھی، اور سفر بہت آرام دہ تھا۔","reviewThree":"بہترین ٹرانسفر سروس جو ہم نے انطالیہ میں استعمال کی ہے۔ انتہائی پیشہ ورانہ اور قابل اعتماد۔","quoteReady":"آپ کا کوٹ تیار ہے","journeyTime":"سفر کا وقت","totalFixed":"کل مقررہ","confirmWhatsapp":"واٹس ایپ سے تصدیق کریں","bookNowCta":"ابھی بک کریں","backToQuote":"کوٹ پر واپس جائیں","yourDetails":"آپ کی تفصیلات","flightNumber":"فلائٹ نمبر","flightArrivalTime":"فلائٹ آمد کا وقت","notesLabel":"نوٹس","confirmBooking":"بکنگ کی تصدیق کریں","paymentError":"ادائیگی کی خرابی۔ براہ کرم دوبارہ کوشش کریں۔"},"fr":{"navFleet":"Véhicules","navService":"Service","navRoutes":"Itinéraires","navReviews":"Avis","navContact":"Contact","bookNow":"Réserver","alwaysAvailable":"Disponible 24h/24, 7j/7","heroEyebrow":"Service chauffeur privé · Antalya","heroTitle":"Transferts aéroport premium<br />à Antalya","heroSubtitle":"Transferts privés avec chauffeur depuis l'aéroport d'Antalya vers Belek, Side, Kemer et Alanya.","bookTransfer":"Réserver un transfert","instantQuote":"Obtenir un devis","googleRated":"Note Google","trustedGuests":"Approuvé par plus de 2 500 clients","discover":"Découvrir","tbLicensed":"Agréé TÜRSAB","tbFlightTracking":"Suivi de vol","tbFixedPrice":"Prix fixe","tb247Concierge":"Conciergerie 24/7","tbChildSeats":"Sièges enfants inclus","privateJourney":"Votre voyage privé","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Lieu de prise en charge","airportOption":"Aéroport d’Antalya (AYT)","hotelOption":"Hôtel","privateAddressOption":"Adresse privée","destination":"Destination","selectDestination":"Choisir une destination","vehicle":"Véhicule","guests":"Passagers","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Choisir l'heure","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Adresse complète de prise en charge","dropoffAddress":"Adresse complète de destination","luggageLabel":"Gros bagages","hotelNameLabel":"Nom de l'hôtel","childSeatLabel":"Sièges enfant","childSeatNone":"Aucun siège enfant","oneChildSeat":"1 siège enfant","twoChildSeats":"2 sièges enfant","threeChildSeats":"3 sièges enfant","fourChildSeats":"4 sièges enfant","fullName":"Nom complet","phoneLabel":"Téléphone / WhatsApp","emailLabel":"E-mail","paymentMethod":"Choisissez le mode de paiement","cashPayment":"Payer dans le véhicule","recommended":"Recommandé","cashPaymentDescription":"Aucun prépaiement en ligne. Vous réglez le prix fixe en espèces à votre chauffeur au début du trajet.","quoteIncludes":"Inclus : accueil, suivi de vol, parking, 90 minutes d'attente et eau minérale.","perVehicleNote":"Par véhicule — non par personne · Jusqu'à 6 passagers","confirmCashBooking":"Confirmer — payer dans le véhicule","flightTracking":"Suivi de vol en temps réel","fixedPrice":"Prix fixe garanti","meetGreet":"Accueil personnalisé","speakingDrivers":"Chauffeurs parlant anglais et allemand","fromAirport":"Depuis l'aéroport d'Antalya","welcomeEyebrow":"Bienvenue au plus haut niveau","welcomeTitle":"Voyager avec élégance.<br />Arriver sereinement.","welcomeBody":"Dès l'atterrissage, chaque détail est pensé. Notre équipe de l'aéroport vous accueille, votre chauffeur se présente au point de prise en charge et vos bagages sont chargés dans un véhicule privé soigneusement préparé.","ourStandards":"Nos standards de service","concierge":"Service conciergerie","guestsWelcomed":"Clients accueillis","guestRating":"Note moyenne des clients","privateTransfers":"Transferts privés","fleetEyebrow":"Notre flotte","fleetTitle":"Votre espace privé,<br />parfait dans les moindres détails.","fleetIntro":"Voyagez confortablement avec suffisamment d'espace pour la famille, les équipements de golf et les valises.","signatureFleet":"Flotte Signature","fleetVclassClass":"Business · First Class","fleetVclassDescription":"La référence des voyages de groupe raffinés : spacieux, exceptionnellement silencieux et équipé pour une arrivée sans tracas.","passengers":"passagers","suitcases":"valises","television":"Télévision à bord","coldDrinks":"Boissons fraîches","snacks":"En-cas","childSeats":"Sièges enfants sur demande","wifi":"WiFi gratuit","nameSignGreeting":"Accueil au comptoir J / 777","reserveVehicle":"Réserver ce véhicule","insideVclass":"Intérieur Sprinter","interiorTitle":"Un salon privé<br />entre l'aéroport et l'hôtel.","serviceEyebrow":"La norme Antalya VIP","serviceTitle":"Plus qu'un transfert.<br />Un accueil d'exception.","serviceIntro":"Une attention digne d'un hôtel cinq étoiles, des chauffeurs locaux expérimentés et une tranquillité absolue de l'aéroport jusqu'au resort.","trackingTitle":"Suivi de vol","trackingBody":"Nous suivons votre vol en temps réel et ajustons automatiquement l'heure de prise en charge, sans frais supplémentaires.","chauffeurTitle":"Chauffeurs professionnels","chauffeurBody":"Toujours soignés, discrets et sélectionnés pour leur connaissance locale et leurs standards de service irréprochables.","greetTitle":"Accueil Meet & Greet","greetBody":"Pour les arrivées internationales, notre équipe vous accueille au comptoir J / 777, appelle votre chauffeur au point de prise en charge et vous aide avec vos bagages.","supportTitle":"Conciergerie 24/7","supportBody":"Avant, pendant et après votre voyage, une personne est toujours disponible par téléphone ou WhatsApp.","priceTitle":"Prix fixes","priceBody":"Le prix confirmé est le prix définitif. L'attente, le parking et les retards de vol sont inclus.","familyTitle":"Pour les familles","familyBody":"Sièges enfants adaptés, habitacles spacieux et aide patiente pour une arrivée familiale sereine.","routesEyebrow":"Nos trajets les plus populaires","routesTitle":"De l'aéroport d'Antalya<br />vers la Riviera turque.","routesIntro":"Tous les prix s'entendent par véhicule, jamais par passager, avec 90 minutes d'attente incluses.","golfFavourite":"Favori des golfeurs","reviewsEyebrow":"Avis clients","reviewsTitle":"Un service dont on<br />se souvient longtemps.","googleReviews":"Basé sur 387 avis Google vérifiés","trustedBy":"Recommandé par les clients des meilleurs resorts d'Antalya","faqEyebrow":"Questions fréquentes","faqTitle":"Avant votre voyage.","faqIntro":"Tout ce que vous devez savoir sur votre transfert privé depuis l'aéroport d'Antalya.","askQuestion":"Poser une question","faqCatArrival":"Arrivée & transfert","faqOneQ":"Que se passe-t-il en cas de retard de vol ?","faqOneA":"Vous n'avez rien à faire. Nous suivons votre vol en temps réel et ajustons automatiquement l'heure de prise en charge. Les retards imputables à la compagnie aérienne ne sont jamais facturés : votre chauffeur est présent quelle que soit l'heure d'atterrissage, et les 90 premières minutes après l'atterrissage sont toujours comprises.","faqTwoQ":"J'arrive sur un vol international. Comment se déroule l'accueil ?","faqTwoA":"Après le contrôle des passeports et la récupération des bagages, suivez les autres passagers jusqu'à la zone Meet & Greet et présentez-vous à notre comptoir J / 777. Il suffit d'indiquer votre nom à notre personnel : aux heures calmes, vous verrez également votre panonceau nominatif, et aux heures de pointe, votre nom suffit. Notre équipe prévient immédiatement votre chauffeur ; il entre dans l'aéroport et se place au point de prise en charge pendant que notre personnel vous accompagne jusqu'au véhicule. L'ensemble prend environ 7 à 8 minutes.","faqSixQ":"J'arrive sur un vol intérieur. Où trouver mon chauffeur ?","faqSixA":"La zone Meet & Greet est réservée aux arrivées internationales ; les clients des vols intérieurs sont donc accueillis différemment : nous vous transmettons le numéro de téléphone de votre chauffeur avant le transfert. Prévenez-le simplement après l'atterrissage, il vous retrouvera dans le hall des arrivées.","faqSevenQ":"Que faire si personne ne se trouve au comptoir J / 777 ?","faqSevenA":"Deux membres de notre équipe sont en permanence au comptoir et leur seule mission est d'accompagner les clients jusqu'à leur véhicule. Si vous trouvez le comptoir momentanément vide, c'est qu'un collègue accompagne le client arrivé juste avant vous : chaque accompagnement dure environ 7 à 8 minutes. Patientez environ 10 minutes. Si personne n'est revenu d'ici là, écrivez-nous sur WhatsApp : nous prévenons immédiatement votre chauffeur, le faisons stationner au point le plus proche et vous guidons directement vers votre voiture, sans attente supplémentaire.","faqEightQ":"Que se passe-t-il s'il me faut plus de 90 minutes pour sortir de l'aéroport ?","faqEightA":"Les 90 premières minutes après l'atterrissage sont incluses sans frais — largement plus que ne demandent le contrôle des passeports, les bagages et la douane — et ce délai se décale automatiquement en cas de retard de vol. Ce n'est que si un motif sans lien avec votre vol vous retient plus longtemps dans le terminal qu'une participation au stationnement de 5 € par heure supplémentaire s'ajoute. Dans les faits, cela n'arrive pour ainsi dire jamais : la quasi-totalité de nos clients est sur la route bien avant.","faqCatJourney":"Retour & trajet","faqTenQ":"Comment rester en contact pour le transfert retour ?","faqTenA":"Une fois la date et l'heure de votre retour confirmées avec notre équipe sur WhatsApp, nous attribuons votre véhicule quelques heures avant le transfert et vous en envoyons les photos sur WhatsApp — ainsi que le numéro de votre chauffeur si vous le souhaitez. À son arrivée à l'hôtel, votre chauffeur prévient la réception, qui informe votre chambre que la voiture est prête. Nos chauffeurs n'appellent jamais directement les clients : tous les échanges passent par notre ligne d'assistance WhatsApp unique, afin que vous sachiez toujours exactement à qui vous parlez.","faqFourteenQ":"Que se passe-t-il si je suis en retard pour mon transfert retour ?","faqFourteenA":"Votre chauffeur se présente à l'hôtel à l'heure convenue et attend 15 minutes sans frais. Si vous prévoyez du retard, un message sur WhatsApp suffit : nous vérifions l'heure de votre vol, prévenons votre chauffeur et ajustons le programme avec vous. Notre objectif n'est pas de vous presser, mais de vous conduire sereinement à votre vol.","faqFifteenQ":"Puis-je demander un arrêt pendant le trajet ?","faqFifteenA":"Bien sûr. Si vous souhaitez vous arrêter à un supermarché ou à une pharmacie, ou faire une courte pause photo, indiquez-le lors de la réservation ou sur WhatsApp : nous organisons l'itinéraire en conséquence. Si l'arrêt vous éloigne nettement de votre route, nous vous disons avant le départ si un montant s'ajoute ; rien n'apparaît après coup.","faqCatPayment":"Paiement & prix","faqNineQ":"Comment se déroule le paiement ?","faqNineA":"Vous réglez votre chauffeur en espèces au début du trajet – nous n'acceptons pas les cartes. Les prix sont fixés en euros (EUR) : le montant fixe correspond exactement à celui affiché lors de la réservation – par véhicule, tous frais d'aéroport et de stationnement compris, sans supplément ultérieur. Vous préférez payer en dollars américains ou en livres turques ? Écrivez-nous au préalable sur WhatsApp pour obtenir un tarif distinct, car le taux de change diffère. Votre chauffeur vous accueille, charge vos bagages et installe les sièges enfant demandés ; une fois le paiement réglé, votre trajet commence.","faqTwelveQ":"Dans quelle devise puis-je payer ?","faqTwelveA":"Nos prix sont fixés en euros (EUR) et réglés en espèces ; les cartes ne sont pas acceptées. Si vous préférez payer en dollars américains ou en livres turques, le montant dépend du cours du jour : écrivez-nous sur WhatsApp avant votre transfert. Nous vous confirmons un prix clair et prévenons votre chauffeur, afin que rien ne se négocie dans la voiture.","faqElevenQ":"Puis-je annuler ou modifier ma réservation ?","faqElevenA":"Oui, et toujours gratuitement. Comme nous ne prenons aucun prépaiement, il n'y a rien à rembourser ni d'attente pour récupérer votre argent : si vos plans changent, un message sur WhatsApp suffit. Un changement d'horaire, de numéro de vol ou d'adresse se règle de la même façon, sans frais.","faqFiveQ":"Le prix affiché est-il définitif ?","faqFiveA":"Oui. Le prix affiché à la réservation est le montant que vous remettez en espèces à votre chauffeur : par véhicule, tous frais d'aéroport, stationnement et 90 premières minutes d'attente compris. Aucun frais caché.","faqCatVehicle":"Véhicule & bagages","faqThreeQ":"Des sièges enfants sont-ils disponibles ?","faqThreeA":"Oui. Coques bébé, sièges enfants et rehausseurs sont disponibles gratuitement sur réservation.","faqThirteenQ":"Quelle quantité de bagages puis-je emporter ?","faqThirteenA":"En règle générale, une grande valise et un bagage à main par passager. Si vous avez davantage — une valise supplémentaire, un sac de golf, une poussette, des skis ou un vélo — indiquez-le lors de la réservation : nous prévoyons sans supplément un véhicule à la capacité adaptée. L'essentiel est simplement que nous le sachions à l'avance. Un Mercedes Vito accueille jusqu'à 6 passagers et un Sprinter jusqu'à 12.","faqFourQ":"Pouvez-vous transporter des sacs de golf et des bagages volumineux ?","faqFourA":"Oui. Le Sprinter et le Vito sont idéaux pour les groupes de golfeurs. Précisez vos bagages et nous planifions le véhicule adapté.","contactEyebrow":"Votre voyage commence ici","contactTitle":"Arriver à Antalya<br />de manière exceptionnelle.","contactBody":"Réservez en ligne en moins de deux minutes ou parlez directement avec notre équipe de conciergerie 24/7.","whatsappUs":"WhatsApp","replyMinutes":"Réponse généralement en quelques minutes","callUs":"Appeler 24/7","emailUs":"E-mail conciergerie","replyHour":"Réponse en moins d'une heure","footerTagline":"Services de chauffeur privé sur toute la Riviera turque.","explore":"Découvrir","information":"Informations","licensed":"Prestataire de transferts privés agréé · Conforme TÜRSAB","bookingConfirmed":"Réservation confirmée","referenceLabel":"Référence","weWillContact":"Votre demande de réservation a été envoyée. Nous vous contactons dans les 30 minutes.","chatWithUs":"Nous contacter","pickupAddressPlaceholder":"Nom de l'hôtel, rue, numéro et quartier","dropoffAddressPlaceholder":"Nom de l'hôtel, rue, numéro et quartier","hotelNamePlaceholder":"Nom de l'hôtel ou de l'hébergement","stepRoute":"Trajet","stepDetails":"Détails","stepContact":"Contact","reserveForPrice":"Réserver","continue":"Continuer","back":"Retour","perVehicleNoteVito":"Par véhicule — non par personne · Jusqu'à 6 passagers","perVehicleNoteSprinter":"Par véhicule — non par personne · Jusqu'à 12 passagers","perVehicle":"par véhicule · prix fixe","requestQuote":"Demander un devis","cashConfirmation":"Votre réservation est confirmée. Vous réglerez le prix fixe en espèces à votre chauffeur au début du trajet.","bookingError":"Votre réservation n'a pas pu être finalisée. Veuillez réessayer.","formIncomplete":"Veuillez compléter les champs indiqués.","requiredField":"Ce champ est obligatoire.","destinationRequired":"Veuillez choisir une destination.","dateInvalid":"Veuillez choisir aujourd'hui ou une date future.","emailInvalid":"Veuillez saisir une adresse e-mail valide.","nameInvalid":"Veuillez saisir un nom complet valide.","phoneInvalid":"Saisissez un numéro valide avec l’indicatif du pays (par exemple +49).","flightInvalid":"Veuillez saisir un numéro de vol valide.","pickupAddressRequired":"L'adresse de prise en charge doit contenir entre 6 et 160 caractères.","dropoffAddressRequired":"L'adresse de destination doit contenir entre 6 et 160 caractères.","addressesMustDiffer":"Les adresses de prise en charge et de destination doivent être différentes.","customDestinationPrice":"Le prix sera confirmé après vérification de l'adresse de destination.","hotelNameRequired":"Veuillez saisir le nom de l'hôtel.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","quoteTitle":"Où souhaitez-vous aller ?","date":"Date","airportReturnPrice":"Le prix sera confirmé après vérification de l’hôtel ou de l’adresse de prise en charge.","oneGuest":"1 passager","twoGuests":"2 passagers","threeGuests":"3 passagers","fourGuests":"4 passagers","fiveGuests":"5 passagers","sixGuests":"6 passagers","sevenGuests":"7 passagers","viewQuote":"Voir le tarif","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"Un vaste habitacle privé pour les grandes familles, les groupes de golf et les voyageurs avec beaucoup de bagages.","capacitySwitchedSprinter":"Passagers et bagages dépassent le Vito — passage au Mercedes Sprinter.","capacityNoVehicle":"Autant de passagers et de bagages dépasse nos véhicules. Contactez-nous sur WhatsApp.","leatherSeats":"Sièges en cuir premium","water":"Eau minérale fraîche","from":"À partir de","reviewOne":"« Notre chauffeur a attendu malgré 90 minutes de retard. Le véhicule était impeccable, agréablement frais et déjà équipé des deux sièges enfants. Exactement l'accueil dont notre famille avait besoin. »","reviewTwo":"« Du premier contact WhatsApp à notre arrivée à Belek, absolument irréprochable. Ponctuel, discret et très professionnel. Nos sacs de golf ont aussi tenu sans problème. »","reviewThree":"« C'était comme un service de chauffeur d'hôtel, pas un taxi d'aéroport. Communication claire, véhicule impeccable et chauffeur sincèrement courtois. »","faqReminder":"Avant votre voyage, veuillez consulter la section FAQ de notre site.","viewFaq":"Voir la FAQ","quoteReady":"Votre transfert privé","journeyTime":"Durée du trajet","totalFixed":"Prix total","confirmWhatsapp":"Confirmer via WhatsApp","bookNowCta":"Réserver maintenant","backToQuote":"Retour","yourDetails":"Vos coordonnées","flightNumber":"Numéro de vol","flightArrivalTime":"Heure d'arrivée","notesLabel":"Demandes spéciales","confirmBooking":"Confirmer la réservation","paymentError":"Paiement échoué. Veuillez réessayer."},"sv":{"navFleet":"Fordon","navService":"Service","navRoutes":"Rutter","navReviews":"Recensioner","navContact":"Kontakt","bookNow":"Boka nu","alwaysAvailable":"Tillgänglig 24 timmar om dygnet","heroEyebrow":"Privat chaufförstjänst · Antalya","heroTitle":"Premium flygplatstransfers<br />i Antalya","heroSubtitle":"Privata transfers med chaufför från Antalya flygplats till Belek, Side, Kemer och Alanya.","bookTransfer":"Boka transfer","instantQuote":"Få pris direkt","googleRated":"Google-betyg","trustedGuests":"Anlitad av över 2 500 gäster","discover":"Utforska","tbLicensed":"TÜRSAB-licensierad","tbFlightTracking":"Flygspårning","tbFixedPrice":"Fast pris","tb247Concierge":"Concierge dygnet runt","tbChildSeats":"Bilbarnstolar ingår","privateJourney":"Din privata resa","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"Hämtplats","airportOption":"Antalya flygplats (AYT)","hotelOption":"Hotell","privateAddressOption":"Privat adress","destination":"Destination","selectDestination":"Välj destination","vehicle":"Fordon","guests":"Gäster","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"Välj tid","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"Fullständig hämtningsadress","dropoffAddress":"Fullständig destinationsadress","luggageLabel":"Stort bagage","hotelNameLabel":"Hotellnamn","childSeatLabel":"Barnstolar","childSeatNone":"Ingen barnstol","oneChildSeat":"1 barnstol","twoChildSeats":"2 barnstolar","threeChildSeats":"3 barnstolar","fourChildSeats":"4 barnstolar","fullName":"Fullständigt namn","phoneLabel":"Telefon / WhatsApp","emailLabel":"E-post","paymentMethod":"Välj betalningsmetod","cashPayment":"Betala i fordonet","recommended":"Rekommenderas","cashPaymentDescription":"Ingen förskottsbetalning online. Du betalar det fasta beloppet kontant till chauffören när resan börjar.","quoteIncludes":"Inkluderar möte, flygbevakning, parkering, 90 minuters väntetid och vatten på flaska.","perVehicleNote":"Per fordon — inte per person · Upp till 6 passagerare","confirmCashBooking":"Bekräfta — betala i fordonet","flightTracking":"Flygspårning i realtid","fixedPrice":"Garanterat fast pris","meetGreet":"Personlig välkomst","speakingDrivers":"Chaufförer som talar engelska och tyska","fromAirport":"Från Antalya flygplats","welcomeEyebrow":"Välkommen till högsta nivå","welcomeTitle":"Res med stil.<br />Anländ avslappnad.","welcomeBody":"Från det ögonblick du landar är varje detalj genomtänkt. Vårt flygplatsteam möter dig, chauffören står vid upphämtningsplatsen och ditt bagage lastas in i en omsorgsfullt förberedd privat bil.","ourStandards":"Våra servicestandarder","concierge":"Concierge-service","guestsWelcomed":"Välkomnade gäster","guestRating":"Genomsnittligt gästbetyg","privateTransfers":"Privata transfers","fleetEyebrow":"Vår flotta","fleetTitle":"Ditt privata utrymme,<br />perfekt i varje detalj.","fleetIntro":"Res bekvämt med gott om plats för familjen, golfbagaget och resväskorna.","signatureFleet":"Signature-flotta","fleetVclassClass":"Business · First Class","fleetVclassDescription":"Riktmärket för sofistikerade gruppresor: rymlig, exceptionellt tyst och utrustad för en smidig ankomst.","passengers":"passagerare","suitcases":"resväskor","television":"TV i fordonet","coldDrinks":"Kalla drycker","snacks":"Snacks","childSeats":"Bilbarnstolar på begäran","wifi":"Gratis WiFi","nameSignGreeting":"Mottagning vid disk J / 777","reserveVehicle":"Boka fordon","insideVclass":"Sprinter interiör","interiorTitle":"En privat lounge<br />mellan flygplatsen och hotellet.","serviceEyebrow":"Antalya VIP-standarden","serviceTitle":"Mer än en transfer.<br />Ett exceptionellt välkomnande.","serviceIntro":"Uppmärksamhet på hotellnivå, erfarna lokala chaufförer och fullständigt lugn från flygplats till resort.","trackingTitle":"Flygspårning","trackingBody":"Vi spårar din flyg i realtid och anpassar automatiskt hämtningstiden utan extra kostnad.","chauffeurTitle":"Professionella chaufförer","chauffeurBody":"Alltid välvårdade, diskreta och utvalda för lokal kunskap och högsta servicestandard.","greetTitle":"Meet & Greet","greetBody":"Vid utrikes ankomster möter vårt flygplatsteam dig vid disk J / 777, kallar din chaufför till upphämtningsplatsen och hjälper till med bagaget.","supportTitle":"Concierge 24/7","supportBody":"Före, under och efter din resa finns alltid någon tillgänglig per telefon eller WhatsApp.","priceTitle":"Fasta priser","priceBody":"Det bekräftade priset är slutpriset. Väntetid, parkering och flygförseningar ingår.","familyTitle":"För familjer","familyBody":"Lämpliga bilbarnstolar, rymliga interiörer och tålmodig hjälp för en avslappnad familjeankomst.","routesEyebrow":"Våra populäraste rutter","routesTitle":"Från Antalya flygplats<br />till Turkiska Rivieran.","routesIntro":"Alla priser gäller per fordon, aldrig per passagerare, med 90 minuters väntetid inkluderad.","golfFavourite":"Golfarnas favorit","reviewsEyebrow":"Gästrecensioner","reviewsTitle":"Service som minns<br />länge efter ankomsten.","googleReviews":"Baserat på 387 verifierade Google-recensioner","trustedBy":"Anlitad av gäster på ledande resorts i Antalya","faqEyebrow":"Vanliga frågor","faqTitle":"Innan din resa.","faqIntro":"Allt du behöver veta om din privata transfer från Antalya flygplats.","askQuestion":"Ställ en fråga","faqCatArrival":"Ankomst & transfer","faqOneQ":"Vad händer vid en flygförsening?","faqOneA":"Du behöver inte göra något. Vi följer ditt flyg i realtid och justerar upphämtningstiden automatiskt. Förseningar som beror på flygbolaget debiteras aldrig – din chaufför är på plats oavsett när du landar, och de första 90 minuterna efter landning ingår alltid.","faqTwoQ":"Jag kommer med ett utrikesflyg. Hur går upphämtningen till?","faqTwoA":"Efter passkontroll och bagageutlämning följer du med övriga passagerare till Meet & Greet-området och kommer till vår disk J / 777. Det räcker att du uppger ditt namn för vår personal. Vårt team meddelar din chaufför direkt; han kör in på flygplatsen och står vid upphämtningsplatsen medan vår personal följer dig till bilen. Hela processen tar ungefär 7–8 minuter.","faqSixQ":"Jag kommer med ett inrikesflyg. Var hittar jag min chaufför?","faqSixA":"Meet & Greet-området är endast till för utrikes ankomster, så gäster på inrikesflyg tas emot på ett annat sätt: vi skickar dig chaufförens telefonnummer före transfern. Hör bara av dig till honom när du landat – han möter dig i ankomsthallen.","faqSevenQ":"Vad gör jag om ingen finns vid disk J / 777?","faqSevenA":"Två av våra medarbetare tjänstgör alltid vid disken och deras enda uppgift är att följa ankommande gäster till bilen. Om disken står tom ett ögonblick betyder det att en kollega just följer gästen som anlände strax före dig – varje följe tar cirka 7–8 minuter. Vänta gärna omkring 10 minuter. Om ingen är tillbaka då, skriv till oss på WhatsApp: vi meddelar din chaufför omedelbart, låter honom stanna vid närmaste plats och leder dig direkt till bilen utan mer väntan.","faqEightQ":"Vad händer om jag behöver mer än 90 minuter för att lämna flygplatsen?","faqEightA":"De första 90 minuterna efter landning ingår utan kostnad – gott och väl mer än vad passkontroll, bagage och tull kräver – och tidsfönstret förskjuts automatiskt vid flygförsening. Endast om något som inte har med flyget att göra håller kvar dig längre i terminalen tillkommer ett parkeringsbidrag på 5 € för varje ytterligare timme. I praktiken händer det nästan aldrig: så gott som alla våra gäster är på väg långt innan dess.","faqCatJourney":"Hemresa & färd","faqTenQ":"Hur håller jag kontakten inför hemtransfern?","faqTenA":"När du har bekräftat datum och tid för hemresan med vårt team på WhatsApp tilldelar vi ditt fordon några timmar före transfern och skickar bilder på det via WhatsApp – och chaufförens telefonnummer om du vill ha det. När chauffören kommer till hotellet meddelar han receptionen, som ringer upp ditt rum och berättar att bilen står redo. Våra chaufförer ringer aldrig gästerna direkt: all kontakt går via vår enda WhatsApp-supportlinje, så du vet alltid exakt vem du talar med.","faqFourteenQ":"Vad händer om jag blir sen till hemtransfern?","faqFourteenA":"Chauffören är vid hotellet på avtalad tid och väntar 15 minuter kostnadsfritt. Tror du att du blir försenad räcker ett meddelande på WhatsApp: vi kontrollerar din avgångstid, informerar chauffören och justerar upplägget tillsammans med dig. Målet är aldrig att stressa dig, bara att få dig i god tid till flyget.","faqFifteenQ":"Går det att göra ett stopp under resan?","faqFifteenA":"Självklart. Vill du stanna vid en mataffär eller ett apotek, eller ta en kort fotopaus, säg till vid bokningen eller på WhatsApp — vi planerar rutten efter det. Tar stoppet dig långt från vägen säger vi före avfärd om något tillkommer; inget dyker upp i efterhand.","faqCatPayment":"Betalning & pris","faqNineQ":"Hur betalar jag?","faqNineA":"Du betalar din chaufför kontant i början av resan – vi tar inte kort. Priserna anges i euro (EUR): det fasta beloppet är exakt det du såg vid bokningen – per fordon, med alla flygplats- och parkeringsavgifter inkluderade, utan tillägg i efterhand. Vill du hellre betala i amerikanska dollar eller turkiska lira? Skriv till oss i förväg på WhatsApp för ett separat pris, eftersom växelkursen skiljer sig. Chauffören välkomnar dig, lastar bagaget och monterar de bilbarnstolar du beställt; när betalningen är klar börjar din resa.","faqTwelveQ":"Vilken valuta kan jag betala i?","faqTwelveA":"Våra priser anges i euro (EUR) och betalas kontant; kort tas inte emot. Vill du hellre betala i amerikanska dollar eller turkiska lira beror beloppet på dagskursen — skriv därför till oss på WhatsApp före transfern. Vi bekräftar ett tydligt pris och informerar chauffören, så att inget förhandlas i bilen.","faqElevenQ":"Kan jag avboka eller ändra min bokning?","faqElevenA":"Ja, och alltid kostnadsfritt. Eftersom vi inte tar någon förskottsbetalning finns det inget att återbetala och inget att vänta på — ändras dina planer räcker ett meddelande på WhatsApp. Ändrad tid, nytt flightnummer eller ny adress ordnar vi på samma sätt, utan extra kostnad.","faqFiveQ":"Är det visade priset slutgiltigt?","faqFiveA":"Ja. Priset du ser vid bokningen är beloppet du lämnar kontant till chauffören – per fordon, inklusive alla flygplatsavgifter, parkering och de första 90 minuternas väntetid. Inga dolda avgifter.","faqCatVehicle":"Fordon & bagage","faqThreeQ":"Finns det bilbarnstolar?","faqThreeA":"Ja. Babyskydd, barnstolar och bälteskuddar finns tillgängliga utan extra kostnad vid förbeställning.","faqThirteenQ":"Hur mycket bagage får jag ta med?","faqThirteenA":"Som regel en stor resväska och ett handbagage per person. Har du mer med dig — en extra väska, golfbag, barnvagn, skidor eller cykel — nämn det vid bokningen, så sätter vi in ett fordon med rätt kapacitet utan extra kostnad. Det enda som betyder något är att vi vet om det i förväg. En Mercedes Vito tar upp till 6 passagerare och en Sprinter upp till 12.","faqFourQ":"Kan golfbagar och stort bagage transporteras?","faqFourA":"Ja. Sprinter och Vito är idealiska för golfsällskap. Meddela oss om ditt bagage så planerar vi rätt fordon.","contactEyebrow":"Din resa börjar här","contactTitle":"Anländ till Antalya<br />på ett exceptionellt sätt.","contactBody":"Boka online på under två minuter eller prata direkt med vårt concierge-team dygnet runt.","whatsappUs":"WhatsApp","replyMinutes":"Svar vanligtvis inom några minuter","callUs":"Ring 24/7","emailUs":"Concierge e-post","replyHour":"Svar inom en timme","footerTagline":"Privata chaufförstjänster längs hela Turkiska Rivieran.","explore":"Utforska","information":"Information","licensed":"Licensierad privat transferoperatör · TÜRSAB-kompatibel","bookingConfirmed":"Bokning bekräftad","referenceLabel":"Referensnummer","weWillContact":"Din bokningsförfrågan har skickats. Vi kontaktar dig inom 30 minuter.","chatWithUs":"Chatta med oss","pickupAddressPlaceholder":"Hotellnamn, gata, husnummer och område","dropoffAddressPlaceholder":"Hotellnamn, gata, husnummer och område","hotelNamePlaceholder":"Hotell- eller boendenamn","stepRoute":"Rutt","stepDetails":"Detaljer","stepContact":"Kontakt","reserveForPrice":"Boka","continue":"Fortsätt","back":"Tillbaka","perVehicleNoteVito":"Per fordon — inte per person · Upp till 6 passagerare","perVehicleNoteSprinter":"Per fordon — inte per person · Upp till 12 passagerare","perVehicle":"per fordon · fast pris","requestQuote":"Begär prisuppgift","cashConfirmation":"Din bokning är bekräftad. Du betalar det fasta beloppet kontant till chauffören när resan börjar.","bookingError":"Bokningen kunde inte slutföras. Försök igen.","formIncomplete":"Fyll i de markerade fälten.","requiredField":"Detta fält är obligatoriskt.","destinationRequired":"Välj en destination.","dateInvalid":"Välj dagens datum eller ett framtida datum.","emailInvalid":"Ange en giltig e-postadress.","nameInvalid":"Ange ett giltigt fullständigt namn.","phoneInvalid":"Ange ett giltigt nummer med landskod (till exempel +49).","flightInvalid":"Ange ett giltigt flightnummer.","pickupAddressRequired":"Hämtningsadressen måste vara mellan 6 och 160 tecken.","dropoffAddressRequired":"Destinationsadressen måste vara mellan 6 och 160 tecken.","addressesMustDiffer":"Hämtnings- och destinationsadressen måste vara olika.","customDestinationPrice":"Priset bekräftas efter att destinationsadressen kontrollerats.","hotelNameRequired":"Ange hotellnamnet.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","quoteTitle":"Vart vill du åka?","date":"Datum","airportReturnPrice":"Priset bekräftas efter att hotellet eller hämtningsadressen har kontrollerats.","oneGuest":"1 gäst","twoGuests":"2 gäster","threeGuests":"3 gäster","fourGuests":"4 gäster","fiveGuests":"5 gäster","sixGuests":"6 gäster","sevenGuests":"7 gäster","viewQuote":"Visa pris","fleetVitoClass":"VIP · Grand Touring","fleetVitoDescription":"En rymlig privat kabin för större familjer, golfsällskap och gäster med mycket bagage.","capacitySwitchedSprinter":"Passagerare och bagage överstiger Vito — bytte till Mercedes Sprinter.","capacityNoVehicle":"Så många passagerare och bagage överstiger våra fordon. Kontakta oss på WhatsApp.","leatherSeats":"Premium läderstolar","water":"Kylt mineralvatten","from":"Från","reviewOne":"„Vår chaufför väntade trots 90 minuters försening. Fordonet var makulöst, behagligt svalt och redan utrustat med båda barnstolarna. Precis det välkomnande vår familj behövde.”","reviewTwo":"„Från första WhatsApp-kontakten till ankomst i Belek absolut förstklassigt. Punktlig, diskret och mycket professionell. Våra golfbagar fick också plats utan problem.”","reviewThree":"„Det kändes som en chaufförstjänst från ett hotell, inte en flygplatstaxibil. Tydlig kommunikation, ett makulöst fordon och en genuint artig chaufför.”","faqReminder":"Läs gärna FAQ-avsnittet på vår webbplats innan din resa.","viewFaq":"Visa FAQ","quoteReady":"Din privata transfer","journeyTime":"Restid","totalFixed":"Totalt pris","confirmWhatsapp":"Bekräfta via WhatsApp","bookNowCta":"Boka nu","backToQuote":"Tillbaka","yourDetails":"Dina uppgifter","flightNumber":"Flygnummer","flightArrivalTime":"Ankomsttid","notesLabel":"Särskilda önskemål","confirmBooking":"Bekräfta bokning","paymentError":"Betalning misslyckades. Försök igen."},"ja":{"navFleet":"車両","navService":"サービス","navRoutes":"ルート","navReviews":"口コミ","navContact":"お問い合わせ","bookNow":"今すぐ予約","alwaysAvailable":"年中無休・24時間対応","heroEyebrow":"プライベートショーファーサービス · アンタルヤ","heroTitle":"アンタルヤ空港からの<br />プレミアム送迎サービス","heroSubtitle":"アンタルヤ空港からベレック、シデ、ケメル、アランヤへ専属ショーファー付きプライベート送迎。","bookTransfer":"送迎を予約する","instantQuote":"料金を確認する","googleRated":"Google評価","trustedGuests":"2,500名以上のお客様にご利用いただいています","discover":"詳しく見る","tbLicensed":"TÜRSAB認可","tbFlightTracking":"フライト追跡","tbFixedPrice":"固定料金","tb247Concierge":"24時間コンシェルジュ","tbChildSeats":"チャイルドシート込み","privateJourney":"あなただけのプライベートな旅","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"お迎え場所","airportOption":"アンタルヤ空港 (AYT)","hotelOption":"ホテル","privateAddressOption":"個人住所","destination":"目的地","selectDestination":"目的地を選択","vehicle":"車両","guests":"ご利用人数","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"時間を選択","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"お迎え先の詳しい住所","dropoffAddress":"目的地の詳しい住所","luggageLabel":"大型荷物","hotelNameLabel":"ホテル名","childSeatLabel":"チャイルドシート","childSeatNone":"チャイルドシート不要","oneChildSeat":"チャイルドシート 1台","twoChildSeats":"チャイルドシート 2台","threeChildSeats":"チャイルドシート 3台","fourChildSeats":"チャイルドシート 4台","fullName":"氏名","phoneLabel":"電話 / WhatsApp","emailLabel":"メールアドレス","paymentMethod":"お支払い方法を選択","cashPayment":"車内で支払う","recommended":"おすすめ","cashPaymentDescription":"オンラインでの事前決済はありません。定額料金はご乗車時にドライバーへ現金でお支払いいただきます。","quoteIncludes":"お出迎え、フライト追跡、駐車料金、90分の待機、ボトル入りの水が含まれます。","perVehicleNote":"1台あたり — 1人あたりではありません · 最大6名","confirmCashBooking":"予約確定 — 車内払い","flightTracking":"リアルタイムフライト追跡","fixedPrice":"料金固定保証","meetGreet":"ミート＆グリートサービス","speakingDrivers":"英語・ドイツ語対応ショーファー","fromAirport":"アンタルヤ空港から","welcomeEyebrow":"最高水準のサービスへようこそ","welcomeTitle":"上質な旅を。<br />安心してご到着を。","welcomeBody":"着陸の瞬間から、細部まで整えてお待ちしています。空港スタッフがお出迎えし、ドライバーが乗車地点に車をつけ、丁寧に準備された専用車へお荷物をお積みします。","ourStandards":"私たちのサービス基準","concierge":"コンシェルジュサービス","guestsWelcomed":"お迎えしたゲスト数","guestRating":"ゲスト平均評価","privateTransfers":"プライベート送迎","fleetEyebrow":"車両ラインナップ","fleetTitle":"あなただけのプライベート空間。<br />細部まで完璧に。","fleetIntro":"ご家族、ゴルフ用具、荷物のための十分なスペースを備えた快適な移動をお楽しみください。","signatureFleet":"シグネチャーフリート","fleetVclassClass":"ビジネス · ファーストクラス","fleetVclassDescription":"洗練されたグループ旅行の基準。広々とした車内、卓越した静粛性、シームレスなご到着のための装備が揃っています。","passengers":"名","suitcases":"個のスーツケース","television":"車内テレビ","coldDrinks":"冷たいお飲み物","snacks":"スナック","childSeats":"チャイルドシート（ご要望に応じて）","wifi":"無料WiFi","nameSignGreeting":"カウンター J / 777 でのお出迎え","reserveVehicle":"この車両を予約する","insideVclass":"Sprinterインテリア","interiorTitle":"空港とホテルの間の<br />プライベートラウンジ。","serviceEyebrow":"Antalya VIPスタンダード","serviceTitle":"送迎以上のもの。<br />特別なお出迎え。","serviceIntro":"5つ星ホテルレベルのアテンション、経験豊富な地元ショーファー、空港からリゾートまでの完全な安心感。","trackingTitle":"フライト追跡","trackingBody":"フライトをリアルタイムで追跡し、追加料金なしでお迎え時間を自動的に調整します。","chauffeurTitle":"プロフェッショナルショーファー","chauffeurBody":"常に清潔感があり、思いやりがあり、地元知識と最高のサービス基準のために厳選されています。","greetTitle":"ミート＆グリート","greetBody":"国際線到着では、空港スタッフがカウンター J / 777 でお出迎えし、ドライバーを乗車地点に呼び、お荷物をお手伝いします。","supportTitle":"24/7コンシェルジュ","supportBody":"旅の前・中・後、いつでも電話またはWhatsAppでご対応いたします。","priceTitle":"料金固定","priceBody":"確認された料金が最終料金です。待機時間、駐車料金、フライト遅延はすべて含まれています。","familyTitle":"ご家族向け","familyBody":"年齢に合ったチャイルドシート、広々とした車内、ご家族の安心到着のための丁寧なサポート。","routesEyebrow":"人気のルート","routesTitle":"アンタルヤ空港から<br />トルコリビエラへ。","routesIntro":"料金はすべて1台あたり（お一人あたりではありません）で、90分の待機時間を含みます。","golfFavourite":"ゴルファーに人気","reviewsEyebrow":"お客様の声","reviewsTitle":"到着後も語り継がれる<br />サービス。","googleReviews":"387件のGoogle認証レビューに基づく","trustedBy":"アンタルヤの一流リゾートのゲストにご利用いただいています","faqEyebrow":"よくある質問","faqTitle":"ご旅行の前に。","faqIntro":"アンタルヤ空港からのプライベート送迎について知っておくべきこと。","askQuestion":"質問する","faqCatArrival":"到着・送迎","faqOneQ":"フライトが遅延した場合はどうなりますか？","faqOneA":"お客様に必要な手続きはございません。フライトをリアルタイムで追跡し、お迎え時刻を自動的に調整いたします。航空会社都合の遅延に追加料金は一切かかりません。到着が何時になってもドライバーがお待ちしており、着陸後最初の90分は常に料金に含まれています。","faqTwoQ":"国際線で到着します。お迎えの流れを教えてください。","faqTwoA":"入国審査と手荷物の受け取りを終えられたら、ほかのお客様と同じくミート＆グリートエリアへお進みいただき、当社カウンター J / 777 へお越しください。スタッフにお名前をお伝えいただくだけで結構です。スタッフがただちにドライバーへ連絡し、ドライバーは空港に入って乗車地点に車をつけます。その間、スタッフがお客様を車までご案内いたします。所要時間はおよそ7〜8分です。","faqSixQ":"国内線で到着します。ドライバーはどこで見つけられますか？","faqSixA":"ミート＆グリートエリアは国際線到着のお客様専用のため、国内線でお越しのお客様は別のご案内となります。送迎の前にドライバーの電話番号をお送りしますので、到着後に一言ご連絡ください。到着ロビーでお迎えいたします。","faqSevenQ":"カウンター J / 777 に誰もいない場合はどうすればよいですか？","faqSevenA":"カウンターには常時2名のスタッフが常駐しており、到着されたお客様を車までご案内することだけを担当しています。カウンターが一時的に空いている場合は、直前に到着されたお客様をご案内している最中です。1組あたりのご案内には約7〜8分かかります。10分ほどお待ちください。それでも誰も戻らない場合は、WhatsApp でご連絡ください。ただちにドライバーへ連絡し、最寄りの場所に車をつけさせて、お待たせすることなく車まで直接ご案内いたします。","faqEightQ":"空港を出るまでに90分以上かかった場合はどうなりますか？","faqEightA":"着陸後最初の90分は無料で料金に含まれています。入国審査・手荷物・税関には十分すぎる時間で、フライトが遅延した場合はこの時間も自動的にずれます。フライトと関係のない事情でターミナル内に90分を超えて留まられた場合のみ、追加1時間ごとに5ユーロの駐車協力金を申し受けます。実際にはほとんど発生いたしません。ほぼすべてのお客様がそれよりずっと早くご出発になっています。","faqCatJourney":"復路・道中","faqTenQ":"復路の送迎ではどのように連絡を取りますか？","faqTenA":"WhatsApp で復路の日時をご確定いただいた後、送迎の数時間前に車両を手配し、WhatsApp で車両の写真をお送りします。ご希望であればドライバーの電話番号もお伝えします。ドライバーがホテルに到着するとフロントへ伝え、フロントからお部屋へ車の準備が整った旨をご連絡いたします。ドライバーがお客様に直接お電話することはありません。ご連絡はすべて WhatsApp のカスタマーサポート窓口に一本化されていますので、どなたとやり取りしているか常に明確です。","faqFourteenQ":"復路の送迎に遅れそうな場合はどうなりますか？","faqFourteenA":"ドライバーはお約束の時刻にホテルへ到着し、15分間は無料でお待ちします。遅れそうなときは WhatsApp にご一報ください。搭乗時刻を確認し、ドライバーに伝え、一緒に段取りを調整いたします。お急かしするためではなく、余裕をもってご搭乗いただくためのご案内です。","faqFifteenQ":"途中で立ち寄りをお願いできますか？","faqFifteenA":"もちろん可能です。スーパーや薬局に立ち寄りたい、途中で写真を撮りたいといったご希望は、ご予約時または WhatsApp でお知らせください。ルートをそれに合わせてご用意します。ルートから大きく外れる立ち寄りの場合は、追加が生じるかどうかをご出発前に明確にお伝えします。後から加算されることはありません。","faqCatPayment":"お支払い・料金","faqNineQ":"支払い方法を教えてください。","faqNineA":"ご乗車時に、ドライバーへ現金でお支払いいただきます（カードはご利用いただけません）。料金はユーロ（EUR）建てで、ご予約時にご覧いただいた定額と同額です。車両単位、空港料金・駐車料金込みで、後からの追加はございません。米ドルまたはトルコリラでのお支払いをご希望の場合は、為替レートが異なるため、事前にWhatsAppでご連絡いただき、別途お見積りをお受け取りください。ドライバーがお出迎えし、お荷物を積み込み、ご希望のチャイルドシートを設置いたします。お支払いののち、ご出発となります。","faqTwelveQ":"どの通貨で支払えますか？","faqTwelveA":"料金はユーロ（EUR）建てで、現金でのお支払いとなります。カードはご利用いただけません。米ドルまたはトルコリラでのお支払いをご希望の場合、金額はその日のレートによって変わりますので、送迎前に WhatsApp までご連絡ください。明確な金額をお伝えし、ドライバーにも共有しますので、車内で金額の相談が生じることはありません。","faqElevenQ":"予約のキャンセルや変更はできますか？","faqElevenA":"はい、いつでも無料です。事前決済をいただいていないため、返金する金額も、お金が戻るのを待つ必要もありません。ご予定が変わったら WhatsApp にご一報ください。時刻・便名・目的地の変更も同様に、追加料金なく承ります。","faqFiveQ":"表示された料金は確定ですか？","faqFiveA":"はい。ご予約時にご覧いただいた金額を、そのままドライバーへ現金でお支払いいただきます。車両単位で、空港諸費用・駐車料金・着陸後90分までの待機時間がすべて含まれ、隠れた費用はありません。","faqCatVehicle":"車両・お手荷物","faqThreeQ":"チャイルドシートはありますか？","faqThreeA":"はい。乳幼児用、チャイルドシート、ジュニアシートは予約時にご要望いただければ無料でご用意します。","faqThirteenQ":"荷物はどのくらい持ち込めますか？","faqThirteenA":"目安はお一人につき大型スーツケース1個と手荷物1個です。それ以上ある場合 — 追加のスーツケース、ゴルフバッグ、ベビーカー、スキー、自転車など — はご予約時にお知らせください。追加料金なしで十分な積載量の車両をご用意します。大切なのは、事前に把握できていることだけです。 メルセデス・ヴィートは最大6名、スプリンターは最大12名までご乗車いただけます。","faqFourQ":"ゴルフバッグや大きな荷物は運べますか？","faqFourA":"はい。SprinterとVitoはゴルフグループに最適です。荷物の詳細をお知らせいただければ、適切な車両をご手配します。","contactEyebrow":"旅はここから始まります","contactTitle":"アンタルヤへ<br />格別の到着を。","contactBody":"2分以内にオンライン予約、または24/7コンシェルジュチームに直接お問い合わせください。","whatsappUs":"WhatsApp","replyMinutes":"通常数分以内に返信","callUs":"24/7電話","emailUs":"コンシェルジュメール","replyHour":"1時間以内に返信","footerTagline":"トルコリビエラ全域のプライベートショーファーサービス。","explore":"探索する","information":"情報","licensed":"認定プライベート送迎事業者 · TÜRSAB準拠","bookingConfirmed":"予約確定","referenceLabel":"予約番号","weWillContact":"予約リクエストを送信しました。30分以内にご連絡いたします。","chatWithUs":"チャットする","pickupAddressPlaceholder":"ホテル名、通り、建物番号、地区","dropoffAddressPlaceholder":"ホテル名、通り、建物番号、地区","hotelNamePlaceholder":"ホテルまたは宿泊施設名","stepRoute":"ルート","stepDetails":"詳細","stepContact":"連絡先","reserveForPrice":"予約する","continue":"続ける","back":"戻る","perVehicleNoteVito":"1台あたり — 1人あたりではありません · 最大6名","perVehicleNoteSprinter":"1台あたり — 1人あたりではありません · 最大12名","perVehicle":"車両ごと · 固定料金","requestQuote":"見積もりを依頼","cashConfirmation":"ご予約が確定しました。定額料金はご乗車時にドライバーへ現金でお支払いください。","bookingError":"予約を完了できませんでした。もう一度お試しください。","formIncomplete":"表示された必須項目を入力してください。","requiredField":"この項目は必須です。","destinationRequired":"目的地を選択してください。","dateInvalid":"今日または今後の日付を選択してください。","emailInvalid":"有効なメールアドレスを入力してください。","nameInvalid":"有効な氏名を入力してください。","phoneInvalid":"国番号を含む有効な電話番号を入力してください（例：+49）。","flightInvalid":"有効なフライト番号を入力してください。","pickupAddressRequired":"お迎え先の住所は6文字以上160文字以内で入力してください。","dropoffAddressRequired":"目的地の住所は6文字以上160文字以内で入力してください。","addressesMustDiffer":"お迎え先と目的地には異なる住所を入力してください。","customDestinationPrice":"目的地の住所を確認後、料金をご案内いたします。","hotelNameRequired":"ホテル名を入力してください。","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","quoteTitle":"目的地をお知らせください","date":"日付","airportReturnPrice":"ホテルまたはお迎え先住所の確認後に料金をご案内します。","oneGuest":"1名","twoGuests":"2名","threeGuests":"3名","fourGuests":"4名","fiveGuests":"5名","sixGuests":"6名","sevenGuests":"7名","viewQuote":"料金を見る","fleetVitoClass":"VIP · グランドツーリング","fleetVitoDescription":"大家族、ゴルフグループ、大量の荷物をお持ちのゲストのための広々としたプライベートキャビン。","capacitySwitchedSprinter":"乗客と荷物がVitoの容量を超えています — メルセデス・スプリンターに変更しました。","capacityNoVehicle":"この人数と荷物は当社の車両を超えています。WhatsAppでお問い合わせください。","leatherSeats":"プレミアムレザーシート","water":"冷えたミネラルウォーター","from":"から","reviewOne":"「90分のフライト遅延にもかかわらず、ドライバーは待ってくれました。車両は完璧に清潔で心地よく冷えており、チャイルドシートも両方設置済みでした。家族が必要としていたまさにそのお出迎えでした。」","reviewTwo":"「最初のWhatsAppのやり取りからベレックへの到着まで、すべてが最高でした。時間通り、控えめで、とてもプロフェッショナル。ゴルフバッグも余裕で収まりました。」","reviewThree":"「空港タクシーではなく、ホテルのショーファーサービスのようでした。明確なコミュニケーション、完璧な車両、そして心から礼儀正しいドライバー。」","faqReminder":"ご旅行の前に、当サイトのFAQをご確認ください。","viewFaq":"FAQを見る","quoteReady":"あなたのプライベート送迎","journeyTime":"所要時間","totalFixed":"合計料金","confirmWhatsapp":"WhatsAppで確認する","bookNowCta":"今すぐ予約","backToQuote":"戻る","yourDetails":"お客様情報","flightNumber":"フライト番号","flightArrivalTime":"到着時刻","notesLabel":"特別なご要望","confirmBooking":"予約を確定する","paymentError":"お支払いに失敗しました。もう一度お試しください。"},"ko":{"navFleet":"차량","navService":"서비스","navRoutes":"노선","navReviews":"리뷰","navContact":"문의","bookNow":"지금 예약","alwaysAvailable":"연중무휴 24시간 운영","heroEyebrow":"프라이빗 쇼퍼 서비스 · 안탈리아","heroTitle":"안탈리아 공항에서<br />프리미엄 공항 픽업 서비스","heroSubtitle":"안탈리아 공항에서 벨렉, 시데, 케메르, 알란야까지 전담 쇼퍼와 함께하는 프라이빗 이동.","bookTransfer":"셔틀 예약하기","instantQuote":"요금 확인하기","googleRated":"Google 평점","trustedGuests":"2,500명 이상의 고객이 이용했습니다","discover":"자세히 보기","tbLicensed":"TÜRSAB 인증","tbFlightTracking":"항공편 추적","tbFixedPrice":"고정 요금","tb247Concierge":"24/7 컨시어지","tbChildSeats":"카시트 포함","privateJourney":"나만의 프라이빗 여행","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"Journey type","oneWay":"One way","roundTrip":"Round trip","roundTripHint":"For a round trip, the return follows the same route in reverse.","pickup":"픽업 장소","airportOption":"안탈리아 공항 (AYT)","hotelOption":"호텔","privateAddressOption":"개인 주소","destination":"목적지","selectDestination":"목적지 선택","vehicle":"차량","guests":"인원","arrivalDate":"Arrival date","arrivalFlightTime":"Flight arrival time","chooseTime":"시간 선택","arrivalFlightNumber":"Arrival flight number","returnDate":"Return date","returnPickupTime":"Return pick-up time","returnFlightNumber":"Return flight number","pickupAddress":"전체 픽업 주소","dropoffAddress":"전체 목적지 주소","luggageLabel":"대형 수하물","hotelNameLabel":"호텔명","childSeatLabel":"어린이 좌석","childSeatNone":"어린이 좌석 없음","oneChildSeat":"어린이 좌석 1개","twoChildSeats":"어린이 좌석 2개","threeChildSeats":"어린이 좌석 3개","fourChildSeats":"어린이 좌석 4개","fullName":"성명","phoneLabel":"전화 / WhatsApp","emailLabel":"이메일","paymentMethod":"결제 방법 선택","cashPayment":"차량에서 결제","recommended":"추천","cashPaymentDescription":"온라인 선결제가 없습니다. 고정 요금은 출발할 때 기사에게 현금으로 결제하시면 됩니다.","quoteIncludes":"미팅 서비스, 항공편 추적, 주차, 90분 대기, 생수가 포함됩니다.","perVehicleNote":"차량 기준 — 1인 기준 아님 · 최대 6명","confirmCashBooking":"예약 확정 — 차량에서 결제","flightTracking":"실시간 항공편 추적","fixedPrice":"고정 요금 보장","meetGreet":"미트 앤 그리트 서비스","speakingDrivers":"영어·독일어 가능 쇼퍼","fromAirport":"안탈리아 공항에서","welcomeEyebrow":"최고 수준의 서비스에 오신 것을 환영합니다","welcomeTitle":"품격 있게 이동하세요.<br />편안하게 도착하세요.","welcomeBody":"착륙하는 순간부터 모든 것이 준비되어 있습니다. 공항 직원이 고객님을 맞이하고, 기사가 픽업 지점에 차량을 대며, 짐은 정성껏 준비된 전용 차량에 실립니다.","ourStandards":"저희 서비스 기준","concierge":"컨시어지 서비스","guestsWelcomed":"환영한 고객 수","guestRating":"평균 고객 평점","privateTransfers":"프라이빗 이동","fleetEyebrow":"차량 라인업","fleetTitle":"나만의 프라이빗 공간,<br />세부 사항까지 완벽하게.","fleetIntro":"가족, 골프 장비, 여행 가방을 위한 충분한 공간을 갖춘 편안한 이동을 경험하세요.","signatureFleet":"시그니처 플릿","fleetVclassClass":"비즈니스 · 퍼스트클래스","fleetVclassDescription":"정교한 그룹 여행의 기준. 넓고, 탁월하게 조용하며, 원활한 도착을 위한 장비를 갖추고 있습니다.","passengers":"명","suitcases":"개의 캐리어","television":"차량 내 TV","coldDrinks":"차가운 음료","snacks":"스낵","childSeats":"요청 시 카시트 제공","wifi":"무료 WiFi","nameSignGreeting":"J / 777 카운터에서 미팅","reserveVehicle":"이 차량 예약하기","insideVclass":"Sprinter 인테리어","interiorTitle":"공항과 호텔 사이의<br />프라이빗 라운지.","serviceEyebrow":"Antalya VIP 기준","serviceTitle":"단순한 이동 그 이상.<br />특별한 환영.","serviceIntro":"5성급 호텔 수준의 세심한 배려, 경험 풍부한 현지 쇼퍼, 공항에서 리조트까지 완전한 안심.","trackingTitle":"항공편 추적","trackingBody":"항공편을 실시간으로 추적하여 추가 비용 없이 픽업 시간을 자동으로 조정합니다.","chauffeurTitle":"전문 쇼퍼","chauffeurBody":"항상 단정하고 신중하며, 현지 지식과 최고 서비스 기준으로 선별된 전문가들입니다.","greetTitle":"미트 앤 그리트","greetBody":"국제선 도착 시 공항 직원이 J / 777 카운터에서 맞이하고, 픽업 지점으로 기사를 부르며 짐을 도와드립니다.","supportTitle":"24/7 컨시어지","supportBody":"여행 전, 중, 후 언제든지 전화 또는 WhatsApp으로 담당자와 연결됩니다.","priceTitle":"고정 요금","priceBody":"확인된 요금이 최종 요금입니다. 대기 시간, 주차비, 항공편 지연이 모두 포함됩니다.","familyTitle":"가족을 위한","familyBody":"연령에 맞는 카시트, 넓은 실내, 편안한 가족 도착을 위한 세심한 도움.","routesEyebrow":"인기 노선","routesTitle":"안탈리아 공항에서<br />터키 리비에라까지.","routesIntro":"모든 요금은 인당이 아닌 차량당이며, 90분의 대기 시간이 포함됩니다.","golfFavourite":"골퍼들의 인기 선택","reviewsEyebrow":"고객 후기","reviewsTitle":"도착 후에도 오래 기억되는<br />서비스.","googleReviews":"387건의 Google 인증 리뷰 기준","trustedBy":"안탈리아 주요 리조트 고객들이 선택했습니다","faqEyebrow":"자주 묻는 질문","faqTitle":"여행 전에.","faqIntro":"안탈리아 공항 프라이빗 픽업에 대해 알아야 할 모든 것.","askQuestion":"질문하기","faqCatArrival":"도착 및 이동","faqOneQ":"항공편이 지연되면 어떻게 되나요?","faqOneA":"고객님께서 하실 일은 없습니다. 항공편을 실시간으로 추적해 픽업 시간을 자동으로 조정합니다. 항공사 사정으로 인한 지연에는 추가 요금이 전혀 없으며, 언제 도착하시든 기사가 대기하고 있습니다. 착륙 후 첫 90분은 언제나 요금에 포함됩니다.","faqTwoQ":"국제선으로 도착합니다. 미팅 절차는 어떻게 되나요?","faqTwoA":"입국 심사와 수하물 수령을 마치신 후 다른 승객들과 함께 미트 앤 그리트(Meet & Greet) 구역으로 이동하셔서 저희 J / 777 카운터로 오십시오. 직원에게 성함만 말씀해 주시면 됩니다. 한산한 시간대에는 성함이 적힌 안내판도 준비되어 있으며, 혼잡한 시간대에는 성함을 말씀해 주시는 것으로 충분합니다. 직원이 즉시 기사에게 연락하면 기사는 공항으로 진입해 픽업 지점에 차를 대고, 그동안 직원이 고객님을 차량까지 안내해 드립니다. 전체 과정은 약 7~8분 소요됩니다.","faqSixQ":"국내선으로 도착합니다. 기사를 어디에서 만나나요?","faqSixA":"미트 앤 그리트 구역은 국제선 도착 승객만을 위한 공간이므로 국내선 고객님은 다른 방식으로 안내해 드립니다. 출발 전에 기사 연락처를 보내 드리니, 도착하신 후 간단히 알려 주시면 기사가 도착 로비에서 모시겠습니다.","faqSevenQ":"J / 777 카운터에 아무도 없으면 어떻게 해야 하나요?","faqSevenA":"카운터에는 항상 두 명의 직원이 상주하며, 도착하신 고객님을 차량까지 안내하는 것이 유일한 업무입니다. 카운터가 잠시 비어 있다면 직전에 도착한 고객을 안내 중이라는 뜻이며, 한 번 안내에 약 7~8분이 소요됩니다. 10분 정도 기다려 주십시오. 그때까지 아무도 돌아오지 않으면 WhatsApp으로 메시지를 보내 주십시오. 즉시 기사에게 연락해 가장 가까운 지점에 차를 대도록 하고, 더 기다리실 필요 없이 차량까지 바로 안내해 드리겠습니다.","faqEightQ":"공항을 나오는 데 90분 이상 걸리면 어떻게 되나요?","faqEightA":"착륙 후 첫 90분은 무료로 포함되어 있습니다. 입국 심사와 수하물, 세관 절차에 충분하고도 남는 시간이며, 항공편이 지연되면 이 시간도 자동으로 조정됩니다. 항공편과 무관한 사유로 터미널에 90분을 넘겨 머무르시는 경우에만 추가 1시간마다 5유로의 주차 비용이 더해집니다. 실제로는 거의 발생하지 않으며, 대부분의 고객님은 그보다 훨씬 이전에 출발하십니다.","faqCatJourney":"복귀 및 이동","faqTenQ":"돌아가는 차량과는 어떻게 연락하나요?","faqTenA":"WhatsApp으로 저희 팀과 복귀 날짜와 시간을 확정하시면, 이동 몇 시간 전에 차량을 배정하고 WhatsApp으로 차량 사진을 보내 드립니다. 원하시면 기사 연락처도 함께 전달해 드립니다. 기사가 호텔에 도착하면 프런트에 알리고, 프런트에서 객실로 차량이 준비되었음을 안내해 드립니다. 저희 기사는 고객님께 직접 전화하지 않으며, 모든 연락은 WhatsApp 고객지원 창구 한 곳을 통해 이루어집니다. 그래서 누구와 대화하고 있는지 항상 분명합니다.","faqFourteenQ":"복귀 차량 시간에 늦을 것 같으면 어떻게 되나요?","faqFourteenA":"기사는 약속된 시간에 호텔에 도착해 15분간 무료로 대기합니다. 늦어질 것 같으면 WhatsApp으로 한 번만 알려 주십시오. 항공편 시간을 확인하고 기사에게 전달한 뒤 일정을 함께 조정해 드립니다. 서두르시게 하려는 것이 아니라 여유롭게 비행기를 타시도록 돕기 위한 것입니다.","faqFifteenQ":"이동 중에 잠시 들를 수 있나요?","faqFifteenA":"물론입니다. 가는 길에 마트나 약국에 들르거나 잠시 사진을 찍고 싶으시면 예약 시 또는 WhatsApp으로 알려 주십시오. 경로를 그에 맞춰 계획해 드립니다. 경로에서 크게 벗어나는 정차라면 추가 금액이 있는지 출발 전에 분명히 알려 드리며, 나중에 붙는 금액은 없습니다.","faqCatPayment":"결제 및 요금","faqNineQ":"결제는 어떻게 하나요?","faqNineA":"출발할 때 기사에게 현금으로 결제하십니다(카드는 받지 않습니다). 요금은 유로(EUR) 기준이며, 예약 시 확인하신 고정 금액과 동일합니다. 차량 단위로 모든 공항 및 주차 비용이 포함되어 있고 이후 추가되는 항목은 없습니다. 미국 달러나 터키 리라로 결제를 원하시면 환율이 다르므로 미리 WhatsApp으로 연락 주시면 별도의 금액을 안내해 드립니다. 기사가 고객님을 맞이해 짐을 싣고 요청하신 카시트를 장착해 드리며, 결제가 끝나면 여정이 시작됩니다.","faqTwelveQ":"어떤 통화로 결제할 수 있나요?","faqTwelveA":"요금은 유로(EUR) 기준이며 현금으로 결제하십니다. 카드는 받지 않습니다. 미국 달러나 튀르키예 리라로 결제하고 싶으시면 금액이 그날의 환율에 따라 달라지므로, 이동 전에 WhatsApp으로 알려 주십시오. 정확한 금액을 확정해 드리고 기사에게도 전달하므로 차 안에서 금액을 조율할 일이 없습니다.","faqElevenQ":"예약을 취소하거나 변경할 수 있나요?","faqElevenA":"네, 언제나 무료입니다. 선결제를 받지 않기 때문에 환불할 금액도, 돈이 돌아오기를 기다릴 일도 없습니다. 일정이 바뀌면 WhatsApp으로 알려 주시면 됩니다. 시간, 항공편 번호, 도착 주소 변경도 같은 방식으로 추가 비용 없이 처리해 드립니다.","faqFiveQ":"표시된 요금이 최종 요금인가요?","faqFiveA":"네. 예약 시 확인하신 금액을 그대로 기사에게 현금으로 전달하시면 됩니다. 차량 단위이며 모든 공항 비용, 주차료, 착륙 후 첫 90분의 대기 시간이 포함되어 있습니다. 숨겨진 요금은 없습니다.","faqCatVehicle":"차량 및 수하물","faqThreeQ":"카시트를 이용할 수 있나요?","faqThreeA":"네. 신생아용 카시트, 아동용 카시트, 부스터 시트는 예약 시 요청하시면 무료로 제공됩니다.","faqThirteenQ":"짐은 얼마나 가져올 수 있나요?","faqThirteenA":"원칙적으로 승객 한 분당 대형 캐리어 1개와 기내용 가방 1개입니다. 그보다 많다면 — 추가 캐리어, 골프백, 유모차, 스키, 자전거 등 — 예약 시 알려 주십시오. 추가 요금 없이 적절한 적재 공간을 갖춘 차량을 배정해 드립니다. 중요한 것은 미리 알려 주시는 것뿐입니다. 메르세데스 비토는 최대 6명, 스프린터는 최대 12명까지 탑승하실 수 있습니다.","faqFourQ":"골프백과 대형 수하물도 운반할 수 있나요?","faqFourA":"네. Sprinter와 Vito는 골프 그룹에 이상적입니다. 수하물 정보를 알려주시면 적합한 차량을 준비합니다.","contactEyebrow":"여행은 여기서 시작됩니다","contactTitle":"안탈리아에<br />특별하게 도착하세요.","contactBody":"2분 이내에 온라인 예약하거나 24/7 컨시어지 팀에 직접 문의하세요.","whatsappUs":"WhatsApp","replyMinutes":"보통 몇 분 내로 답변","callUs":"24/7 전화","emailUs":"컨시어지 이메일","replyHour":"1시간 내 답변","footerTagline":"터키 리비에라 전역의 프라이빗 쇼퍼 서비스.","explore":"탐색","information":"정보","licensed":"인증된 프라이빗 이동 사업자 · TÜRSAB 준수","bookingConfirmed":"예약 확정","referenceLabel":"예약 번호","weWillContact":"예약 요청이 전송되었습니다. 30분 내로 연락드리겠습니다.","chatWithUs":"채팅하기","pickupAddressPlaceholder":"호텔명, 도로명, 건물 번호 및 지역","dropoffAddressPlaceholder":"호텔명, 도로명, 건물 번호 및 지역","hotelNamePlaceholder":"호텔 또는 숙소 이름","stepRoute":"경로","stepDetails":"세부 정보","stepContact":"연락처","reserveForPrice":"예약하기","continue":"계속","back":"뒤로","perVehicleNoteVito":"차량 기준 — 1인 기준 아님 · 최대 6명","perVehicleNoteSprinter":"차량 기준 — 1인 기준 아님 · 최대 12명","perVehicle":"차량 기준 · 고정 요금","requestQuote":"견적 요청","cashConfirmation":"예약이 확정되었습니다. 고정 요금은 출발할 때 기사에게 현금으로 결제해 주십시오.","bookingError":"예약을 완료하지 못했습니다. 다시 시도해 주세요.","formIncomplete":"표시된 필수 항목을 입력해 주세요.","requiredField":"필수 입력 항목입니다.","destinationRequired":"목적지를 선택해 주세요.","dateInvalid":"오늘 또는 이후 날짜를 선택해 주세요.","emailInvalid":"올바른 이메일 주소를 입력해 주세요.","nameInvalid":"올바른 전체 이름을 입력해 주세요.","phoneInvalid":"국가 코드를 포함한 올바른 번호를 입력해 주세요(예: +49).","flightInvalid":"올바른 항공편 번호를 입력해 주세요.","pickupAddressRequired":"픽업 주소는 6자 이상 160자 이하로 입력해 주세요.","dropoffAddressRequired":"목적지 주소는 6자 이상 160자 이하로 입력해 주세요.","addressesMustDiffer":"픽업 주소와 목적지 주소는 달라야 합니다.","customDestinationPrice":"목적지 주소 확인 후 가격이 확정됩니다.","hotelNameRequired":"호텔명을 입력해 주세요.","roundTripPriceNote":"round trip · 2 journeys","returnDateRequired":"Please choose a return date.","returnDateInvalid":"Please choose a return date on or after the outward journey.","returnTimeRequired":"Please choose the return pick-up time.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","quoteTitle":"어디로 모셔다 드릴까요?","date":"날짜","airportReturnPrice":"호텔 또는 픽업 주소를 확인한 후 요금을 안내해 드립니다.","oneGuest":"1명","twoGuests":"2명","threeGuests":"3명","fourGuests":"4명","fiveGuests":"5명","sixGuests":"6명","sevenGuests":"7명","viewQuote":"요금 보기","fleetVitoClass":"VIP · 그랜드 투어링","fleetVitoDescription":"대가족, 골프 그룹, 짐이 많은 고객을 위한 넓은 프라이빗 캐빈.","capacitySwitchedSprinter":"승객과 수하물이 비토 용량을 초과합니다 — 메르세데스 스프린터로 변경되었습니다.","capacityNoVehicle":"이 인원과 수하물은 차량 용량을 초과합니다. WhatsApp으로 문의해 주세요.","leatherSeats":"프리미엄 가죽 시트","water":"시원한 생수","from":"부터","reviewOne":"\\"90분 지연에도 불구하고 기사님이 기다려 주셨습니다. 차량은 완벽하게 청결하고 시원했으며 카시트 두 개도 이미 설치되어 있었습니다. 저희 가족에게 꼭 필요한 환영이었습니다.\\"","reviewTwo":"\\"첫 WhatsApp 연락부터 벨렉 도착까지 모든 것이 최고였습니다. 시간 엄수, 세심함, 매우 전문적. 골프백도 여유롭게 들어갔습니다.\\"","reviewThree":"\\"공항 택시가 아닌 호텔 쇼퍼 서비스 같았습니다. 명확한 소통, 완벽한 차량, 진심으로 예의 바른 기사님.\\"","faqReminder":"여행 전에 저희 웹사이트의 FAQ를 확인해 주세요.","viewFaq":"FAQ 보기","quoteReady":"나의 프라이빗 이동","journeyTime":"소요 시간","totalFixed":"총 요금","confirmWhatsapp":"WhatsApp으로 확인하기","bookNowCta":"지금 예약","backToQuote":"뒤로","yourDetails":"고객 정보","flightNumber":"항공편 번호","flightArrivalTime":"도착 시간","notesLabel":"특별 요청","confirmBooking":"예약 확정하기","paymentError":"결제에 실패했습니다. 다시 시도해 주세요."},"ar":{"navFleet":"أسطولنا","navService":"الخدمات","navRoutes":"الوجهات","navReviews":"التقييمات","navContact":"اتصل بنا","bookNow":"احجز الآن","alwaysAvailable":"متاحون على مدار الساعة، كل يوم","heroEyebrow":"خدمة سائق خاص · أنطاليا","heroTitle":"خدمة نقل فاخرة من المطار<br />في أنطاليا","heroSubtitle":"خدمة نقل خاصة مع سائق من مطار أنطاليا إلى بيليك وسيده وكيمر وألانيا.","bookTransfer":"احجز خدمة النقل","instantQuote":"احصل على السعر فوراً","googleRated":"تقييم Google","trustedGuests":"اختيار أكثر من 2,500 ضيف","discover":"اكتشف المزيد","tbLicensed":"مرخصون من TÜRSAB","tbFlightTracking":"تتبع الرحلات","tbFixedPrice":"سعر ثابت","tb247Concierge":"كونسيرج 24/7","tbChildSeats":"مقاعد أطفال مشمولة","privateJourney":"رحلتك الخاصة","meetGreetNote":"Airport Meet &amp; Greet · Meeting point J / 777","tripType":"نوع الرحلة","oneWay":"ذهاب فقط","roundTrip":"ذهاب وعودة","roundTripHint":"في رحلة الذهاب والعودة، تكون رحلة العودة على المسار نفسه بالاتجاه المعاكس.","pickup":"مكان الاستقبال","airportOption":"مطار أنطاليا (AYT)","hotelOption":"فندق","privateAddressOption":"عنوان خاص","destination":"الوجهة","selectDestination":"اختر الوجهة","vehicle":"السيارة","guests":"الركاب","arrivalDate":"تاريخ الوصول","arrivalFlightTime":"وقت وصول الرحلة","chooseTime":"اختر الوقت","arrivalFlightNumber":"رقم رحلة الوصول","returnDate":"تاريخ العودة","returnPickupTime":"وقت الاستقبال للعودة","returnFlightNumber":"رقم رحلة العودة","pickupAddress":"عنوان الاستقبال الكامل","dropoffAddress":"عنوان الوصول الكامل","luggageLabel":"أمتعة كبيرة","hotelNameLabel":"اسم الفندق","childSeatLabel":"مقاعد الأطفال","childSeatNone":"من دون مقعد أطفال","oneChildSeat":"مقعد أطفال واحد","twoChildSeats":"مقعدا أطفال","threeChildSeats":"3 مقاعد أطفال","fourChildSeats":"4 مقاعد أطفال","fullName":"الاسم الكامل","phoneLabel":"الهاتف / WhatsApp","emailLabel":"البريد الإلكتروني","paymentMethod":"اختر طريقة الدفع","cashPayment":"الدفع داخل السيارة","recommended":"موصى به","cashPaymentDescription":"لا دفع مسبق عبر الإنترنت. تدفع السعر الثابت نقدًا لسائقك في بداية الرحلة.","quoteIncludes":"يشمل الاستقبال وتتبع الرحلة ووقوف السيارة و90 دقيقة انتظار ومياه معبأة.","perVehicleNote":"لكل سيارة — لا للفرد · حتى 6 ركاب","confirmCashBooking":"تأكيد الحجز — الدفع داخل السيارة","flightTracking":"تتبع الرحلة مباشرة","fixedPrice":"سعر ثابت مضمون","meetGreet":"استقبال شخصي","speakingDrivers":"سائقون يتحدثون الإنجليزية والألمانية","fromAirport":"من مطار أنطاليا","welcomeEyebrow":"مرحباً بك في مستوى أرقى من الخدمة","welcomeTitle":"سافر بأناقة.<br />وصل براحة.","welcomeBody":"منذ لحظة هبوطك، رُوعيت كل التفاصيل. يستقبلك فريقنا في المطار، ويقف سائقك في نقطة الاستقبال، وتُحمَّل أمتعتك في سيارة خاصة أُعدّت بعناية.","ourStandards":"معايير خدمتنا","concierge":"خدمة الكونسيرج","guestsWelcomed":"الضيوف الذين استقبلناهم","guestRating":"متوسط تقييم الضيوف","privateTransfers":"رحلات نقل خاصة","fleetEyebrow":"أسطولنا","fleetTitle":"مساحتك الخاصة،<br />مصممة بأدق التفاصيل.","fleetIntro":"سافر براحة مع مساحة واسعة للعائلة وحقائب الغولف والأمتعة.","signatureFleet":"الأسطول المميز","fleetVclassClass":"درجة رجال الأعمال · الدرجة الأولى","fleetVclassDescription":"وسيلة نقل VIP رحبة للمجموعات الكبيرة، مع مساحة واسعة للركاب والأمتعة.","passengers":"ركاب","suitcases":"حقائب","television":"تلفاز داخل السيارة","coldDrinks":"مشروبات باردة","snacks":"وجبات خفيفة","childSeats":"مقاعد أطفال عند الطلب","wifi":"واي فاي مجاني","nameSignGreeting":"استقبال عند المكتب J / 777","reserveVehicle":"احجز هذه السيارة","insideVclass":"مقصورة Sprinter الداخلية","interiorTitle":"صالة خاصة بين<br />المطار والفندق.","serviceEyebrow":"معيار Antalya VIP","serviceTitle":"أكثر من مجرد نقل.<br />إنه ترحيب استثنائي.","serviceIntro":"عناية بمستوى الفنادق الفاخرة، وسائقون محليون ذوو خبرة، وراحة تامة من المطار إلى المنتجع.","trackingTitle":"تتبع الرحلة","trackingBody":"نتابع رحلتك مباشرة ونعدّل وقت الاستقبال تلقائياً من دون أي تكلفة إضافية.","chauffeurTitle":"سائقون محترفون","chauffeurBody":"سائقون أنيقون وكتومون دائماً، تم اختيارهم لمعرفتهم المحلية والتزامهم بأعلى معايير الخدمة.","greetTitle":"الاستقبال والترحيب","greetBody":"في القدوم الدولي يستقبلك فريقنا عند المكتب J / 777، ويستدعي سائقك إلى نقطة الاستقبال، ويساعدك في الأمتعة.","supportTitle":"كونسيرج 24/7","supportBody":"قبل رحلتك وأثناءها وبعدها، يمكنك دائماً التواصل مع شخص حقيقي عبر الهاتف أو WhatsApp.","priceTitle":"أسعار ثابتة","priceBody":"السعر المؤكد هو السعر النهائي. يشمل وقت الانتظار ومواقف السيارات وتأخير الرحلات.","familyTitle":"مناسب للعائلات","familyBody":"مقاعد أطفال مناسبة للأعمار، ومساحات داخلية واسعة، ومساعدة هادئة لوصول عائلي مريح.","routesEyebrow":"رحلاتنا الأكثر طلباً","routesTitle":"من مطار أنطاليا<br />إلى الريفييرا التركية.","routesIntro":"جميع الأسعار لكل مركبة وليست لكل راكب، وتشمل 90 دقيقة انتظار.","golfFavourite":"المفضل لدى لاعبي الغولف","reviewsEyebrow":"آراء الضيوف","reviewsTitle":"خدمة تبقى في الذاكرة<br />بعد الوصول.","googleReviews":"استناداً إلى 387 تقييماً موثقاً على Google","trustedBy":"موثوق من ضيوف أبرز منتجعات أنطاليا","faqEyebrow":"الأسئلة الشائعة","faqTitle":"قبل رحلتك.","faqIntro":"كل ما تحتاج إلى معرفته عن خدمة النقل الخاصة من مطار أنطاليا.","askQuestion":"اطرح سؤالاً","faqCatArrival":"الوصول والنقل","faqOneQ":"ماذا يحدث إذا تأخرت رحلتي؟","faqOneA":"لا يتطلب الأمر منك شيئًا. نتابع رحلتك لحظة بلحظة ونعدّل موعد الاستقبال تلقائيًا. لا نفرض أي رسوم إضافية على التأخيرات الناتجة عن شركة الطيران؛ سائقك في انتظارك مهما كان وقت الهبوط، وأول 90 دقيقة بعد الهبوط مشمولة دائمًا في السعر.","faqTwoQ":"سأصل على رحلة دولية. كيف تتم عملية الاستقبال؟","faqTwoA":"بعد إنهاء إجراءات الجوازات واستلام الأمتعة، توجّه مع بقية المسافرين إلى منطقة الاستقبال Meet & Greet وتعال إلى مكتبنا رقم J / 777. يكفي أن تذكر اسمك لموظفينا. يبلّغ فريقنا سائقك على الفور، فيدخل إلى المطار ويقف في نقطة الاستقبال، بينما يرافقك موظفنا إلى السيارة. تستغرق العملية كاملة نحو 7 إلى 8 دقائق.","faqSixQ":"سأصل على رحلة داخلية. أين أجد سائقي؟","faqSixA":"منطقة الاستقبال Meet & Greet مخصصة للرحلات الدولية فقط، لذلك نتعامل مع ضيوف الرحلات الداخلية بطريقة مختلفة: نرسل إليك رقم هاتف السائق قبل موعد النقل. ما عليك سوى إبلاغه بعد الهبوط، وسيستقبلك في صالة القدوم.","faqSevenQ":"ماذا أفعل إذا لم يكن أحد في المكتب J / 777؟","faqSevenA":"يعمل في المكتب موظفان بشكل دائم، ومهمتهما الوحيدة هي مرافقة الضيوف القادمين إلى سياراتهم. إذا وجدت المكتب خاليًا للحظات، فهذا يعني أن أحد الزملاء يرافق الضيف الذي وصل قبلك مباشرة؛ إذ تستغرق كل مرافقة نحو 7 إلى 8 دقائق. يرجى الانتظار نحو 10 دقائق. وإذا لم يعد أحد خلال هذه المدة، راسلنا عبر WhatsApp: سنبلغ سائقك فورًا ونطلب منه التوقف في أقرب نقطة، ونرشدك مباشرة إلى سيارتك دون مزيد من الانتظار.","faqEightQ":"ماذا لو احتجت إلى أكثر من 90 دقيقة للخروج من المطار؟","faqEightA":"أول 90 دقيقة بعد هبوط الطائرة مشمولة مجانًا، وهي مدة تزيد عمّا تتطلبه إجراءات الجوازات والأمتعة والجمارك، وتتحرك تلقائيًا مع أي تأخير في الرحلة. وفقط إذا أبقاك داخل الصالة سبب لا علاقة له برحلتك مدة أطول، تُضاف مساهمة وقوف بقيمة 5 يورو عن كل ساعة إضافية. عمليًا لا يحدث ذلك تقريبًا؛ فجميع ضيوفنا تقريبًا ينطلقون قبل ذلك بكثير.","faqCatJourney":"العودة والرحلة","faqTenQ":"كيف أبقى على تواصل في رحلة العودة؟","faqTenA":"بعد تأكيد تاريخ العودة وموعدها مع فريقنا عبر WhatsApp، نخصص مركبتك قبل الموعد بساعات ونرسل إليك صورها عبر WhatsApp، ورقم هاتف السائق أيضًا إذا رغبت. وعند وصول السائق إلى الفندق يُبلغ الاستقبال، ويقوم الاستقبال بإخطار غرفتك بأن السيارة جاهزة. لا يتصل سائقونا بالضيوف مباشرة أبدًا: يمر التواصل كله عبر خط دعم العملاء الوحيد على WhatsApp، لتعرف دائمًا بالضبط مع من تتحدث.","faqFourteenQ":"ماذا لو تأخرت عن رحلة العودة؟","faqFourteenA":"يصل سائقك إلى الفندق في الموعد المتفق عليه وينتظر 15 دقيقة مجانًا. وإذا توقعت تأخرًا تكفي رسالة واحدة عبر WhatsApp: نتحقق من موعد رحلتك، ونبلّغ سائقك، ونعدّل البرنامج معك. هدفنا ليس استعجالك، بل إيصالك إلى رحلتك براحة.","faqFifteenQ":"هل يمكن التوقف في الطريق؟","faqFifteenA":"بالطبع. إذا رغبت في التوقف عند سوق أو صيدلية أو لالتقاط صورة في الطريق، فاذكر ذلك عند الحجز أو عبر WhatsApp وسنخطّط المسار على هذا الأساس. وإذا كان التوقف يبعدك كثيرًا عن مسارك، نخبرك قبل الانطلاق بما إذا كان سيُضاف أي مبلغ؛ فلا شيء يظهر لاحقًا كمفاجأة.","faqCatPayment":"الدفع والسعر","faqNineQ":"كيف تتم عملية الدفع؟","faqNineA":"تدفع لسائقك نقدًا في بداية الرحلة — لا نقبل البطاقات. الأسعار محددة باليورو (EUR): المبلغ الثابت هو نفسه تمامًا الذي رأيته عند الحجز، لكل مركبة، شاملًا جميع رسوم المطار والوقوف، دون أي إضافات لاحقة. هل تفضّل الدفع بالدولار الأمريكي أو الليرة التركية؟ راسِلنا مسبقًا عبر واتساب للحصول على سعر منفصل، لأن سعر الصرف يختلف. يستقبلك السائق ويحمّل أمتعتك ويركّب مقاعد الأطفال التي طلبتها، وبعد إتمام الدفع تبدأ رحلتك.","faqTwelveQ":"بأي عملة يمكنني الدفع؟","faqTwelveA":"أسعارنا محددة باليورو (EUR) وتُدفع نقدًا؛ ولا نقبل البطاقات. وإذا فضّلت الدفع بالدولار الأمريكي أو بالليرة التركية فإن المبلغ يعتمد على سعر الصرف في ذلك اليوم، لذا راسلنا عبر WhatsApp قبل موعد النقل: نؤكد لك سعرًا واضحًا ونبلّغ سائقك، فلا يجري أي تفاوض داخل السيارة.","faqElevenQ":"هل يمكنني إلغاء الحجز أو تعديله؟","faqElevenA":"نعم، ودائمًا مجانًا. لأننا لا نأخذ أي دفعة مسبقة، فليس هناك ما يُسترد ولا انتظار لعودة أموالك — إذا تغيرت خططك تكفي رسالة عبر WhatsApp. وتعديل الموعد أو رقم الرحلة أو عنوان الوصول يتم بالطريقة نفسها، دون رسوم إضافية.","faqFiveQ":"هل السعر المعروض نهائي؟","faqFiveA":"نعم. السعر الذي تراه عند الحجز هو المبلغ الذي تسلّمه للسائق نقدًا: لكل مركبة، شاملًا جميع رسوم المطار والوقوف وأول 90 دقيقة من الانتظار. لا توجد رسوم خفية.","faqCatVehicle":"المركبة والأمتعة","faqThreeQ":"هل تتوفر مقاعد للأطفال؟","faqThreeA":"نعم. تتوفر مقاعد للرضع والأطفال والمقاعد المعززة مجاناً عند طلبها أثناء الحجز.","faqThirteenQ":"ما مقدار الأمتعة التي يمكنني اصطحابها؟","faqThirteenA":"القاعدة هي حقيبة كبيرة واحدة وحقيبة يد واحدة لكل راكب. وإذا كان لديك أكثر من ذلك — حقيبة إضافية أو حقيبة غولف أو عربة أطفال أو تزلج أو دراجة — فاذكر ذلك عند الحجز، وسنخصص مركبة بسعة مناسبة دون أي تكلفة إضافية. المهم فقط أن نعرف مسبقًا. تتسع مرسيدس فيتو حتى 6 ركاب، وسبرينتر حتى 12 راكبًا.","faqFourQ":"هل يمكن نقل حقائب الغولف والأمتعة الكبيرة؟","faqFourA":"نعم. سيارات Sprinter وVito مناسبة لمجموعات الغولف. أخبرنا بأمتعتك لنجهز السيارة المناسبة.","contactEyebrow":"رحلتك تبدأ هنا","contactTitle":"ابدأ وصولك إلى أنطاليا<br />بطريقة استثنائية.","contactBody":"احجز عبر الإنترنت خلال دقيقتين، أو تحدث مباشرة إلى فريق الكونسيرج 24/7.","whatsappUs":"تواصل عبر WhatsApp","replyMinutes":"نرد عادةً خلال دقائق","callUs":"اتصل بنا 24/7","emailUs":"بريد الكونسيرج","replyHour":"نرد خلال ساعة","footerTagline":"خدمة سائق خاص في أنحاء الريفييرا التركية.","explore":"استكشف","information":"معلومات","licensed":"مزود نقل خاص مرخص · متوافق مع TÜRSAB","bookingConfirmed":"تم تأكيد الحجز","referenceLabel":"الرقم المرجعي","weWillContact":"تم إرسال طلب حجزك. سنتواصل معك خلال 30 دقيقة.","chatWithUs":"تحدث معنا","pickupAddressPlaceholder":"اسم الفندق، الشارع، رقم المبنى والمنطقة","dropoffAddressPlaceholder":"اسم الفندق، الشارع، رقم المبنى والمنطقة","hotelNamePlaceholder":"اسم الفندق أو مكان الإقامة","stepRoute":"المسار","stepDetails":"التفاصيل","stepContact":"التواصل","reserveForPrice":"احجز","continue":"متابعة","back":"رجوع","perVehicleNoteVito":"لكل سيارة — لا للفرد · حتى 6 ركاب","perVehicleNoteSprinter":"لكل سيارة — لا للفرد · حتى 12 راكباً","perVehicle":"لكل سيارة · سعر ثابت","requestQuote":"طلب عرض سعر","cashConfirmation":"تم تأكيد حجزك. تدفع المبلغ الثابت نقدًا لسائقك في بداية الرحلة.","bookingError":"تعذر إكمال حجزك. يرجى المحاولة مرة أخرى.","formIncomplete":"يرجى إكمال الحقول المحددة.","requiredField":"هذا الحقل مطلوب.","destinationRequired":"يرجى اختيار وجهة.","dateInvalid":"يرجى اختيار تاريخ اليوم أو تاريخ لاحق.","emailInvalid":"يرجى إدخال بريد إلكتروني صالح.","nameInvalid":"يرجى إدخال الاسم الكامل بشكل صحيح.","phoneInvalid":"يرجى إدخال رقم صالح مع رمز الدولة (مثلاً +49).","flightInvalid":"يرجى إدخال رقم رحلة صالح.","pickupAddressRequired":"يجب أن يتراوح عنوان الاستقبال بين 6 و160 حرفاً.","dropoffAddressRequired":"يجب أن يتراوح عنوان الوصول بين 6 و160 حرفاً.","addressesMustDiffer":"يجب أن يختلف عنوان الاستقبال عن عنوان الوصول.","customDestinationPrice":"سيتم تأكيد السعر بعد مراجعة عنوان الوصول.","hotelNameRequired":"يرجى إدخال اسم الفندق.","roundTripPriceNote":"ذهاب وعودة · رحلتان","returnDateRequired":"يرجى اختيار تاريخ العودة.","returnDateInvalid":"يرجى اختيار تاريخ عودة يوافق تاريخ الذهاب أو يأتي بعده.","returnTimeRequired":"يرجى اختيار وقت الاستقبال للعودة.","dailyChauffeur":"Daily vehicle + chauffeur","days":"days","dailyChauffeurHint":"Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.","serviceStartDate":"First service day","serviceEndDate":"Last service day","dailyPickupTime":"Service start time","dailyPickupTimeRequired":"Please select the daily service start time.","serviceEndDateRequired":"Please select the last service day.","servicePeriodInvalid":"Please select a period between 1 and 30 days.","arrivalFlightTimeOptional":"Arrival flight time (optional)","arrivalFlightNumberOptional":"Arrival flight number (optional)","servicePrice":"Service price","fuelExcludedShort":"fuel excluded","fuelExcludedDetail":"Fuel is not included and is paid separately according to use.","departureFlightDate":"Departure flight date (optional)","departureFlightTime":"Departure flight time","departureFlightNumber":"Departure flight number","departureFlightDateRequired":"Please select the departure flight date.","departureFlightDateInvalid":"Departure flight date cannot be before the service starts.","dailyQuoteIncludes":"Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.","reviewAndConfirm":"Review and confirm","fuelTermsTitle":"Important information about fuel","fuelTermsBody":"The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.","fuelTermsCheckbox":"I understand that fuel is excluded and will be paid separately based on use.","cancel":"Cancel","close":"Close","understandAndConfirm":"I understand and confirm","dailyCashConfirmation":"Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.","campaignBadge":"عرض الحجز عبر الإنترنت","campaignDiscount":"سعر خاص","campaignScope":"على جميع أسعار النقل","campaignApplied":"تم تطبيق السعر الخاص عبر الإنترنت","onlineDiscountShort":"سعر خاص عبر الإنترنت","discountPricesShown":"الأسعار المعروضة هي أسعار خاصة عبر الإنترنت","quoteTitle":"إلى أين نوصلك؟","date":"التاريخ","airportReturnPrice":"سيتم تأكيد السعر بعد مراجعة الفندق أو عنوان الاستقبال.","oneGuest":"راكب واحد","twoGuests":"راكبان","threeGuests":"3 ركاب","fourGuests":"4 ركاب","fiveGuests":"5 ركاب","sixGuests":"6 ركاب","sevenGuests":"7 ركاب","viewQuote":"عرض السعر","fleetVitoClass":"VIP · جراند تورينغ","fleetVitoDescription":"مقصورة خاصة ومريحة للعائلات والمجموعات الصغيرة.","capacitySwitchedSprinter":"عدد الركاب والأمتعة يتجاوز سعة Vito — تم التبديل إلى Mercedes Sprinter.","capacityNoVehicle":"هذا العدد من الركاب والأمتعة يتجاوز سعة مركباتنا. يرجى التواصل معنا عبر WhatsApp.","leatherSeats":"مقاعد جلدية فاخرة","water":"مياه معدنية باردة","from":"ابتداءً من","reviewOne":"\\"انتظرنا السائق رغم تأخر الرحلة 90 دقيقة. كانت السيارة نظيفة تماماً وباردة، ومقعدا الأطفال مجهزين مسبقاً. كان هذا بالضبط ما احتاجته عائلتنا عند الوصول.\\"","reviewTwo":"\\"من أول تواصل عبر WhatsApp حتى وصولنا إلى بيليك، كانت الخدمة ممتازة. التزام بالمواعيد واحترافية عالية، مع مساحة مريحة لحقائب الغولف.\\"","reviewThree":"\\"شعرنا وكأنها خدمة سائق فندق فاخر وليست سيارة أجرة من المطار. تواصل واضح، وسيارة مثالية، وسائق مهذب بصدق.\\"","faqReminder":"قبل رحلتك، يُرجى الاطلاع على قسم الأسئلة الشائعة على موقعنا.","viewFaq":"عرض الأسئلة الشائعة","quoteReady":"رحلتك الخاصة","journeyTime":"مدة الرحلة","totalFixed":"الإجمالي الثابت","confirmWhatsapp":"التأكيد عبر WhatsApp","bookNowCta":"احجز الآن","backToQuote":"رجوع","yourDetails":"بياناتك","flightNumber":"رقم الرحلة","flightArrivalTime":"وقت الوصول","notesLabel":"طلبات خاصة","confirmBooking":"تأكيد الحجز","paymentError":"تعذر إتمام الدفع. يرجى المحاولة مرة أخرى."}}`);
const translationData = {
  resources: resources$1
};
const resources = { "en": { "videoEyebrow": "How to find us", "videoTitle": "Find us at J / 777<br />after you land.", "videoSubtitle": "Our chauffeurs wait at the Meet & Greet Area — meeting point J / 777. Exit baggage claim, head to point J / 777, and we handle the rest.", "videoCardTitle": "Antalya Airport<br />Meet & Greet Point", "videoCardBody": "After collecting your luggage, exit to the Meet & Greet Area and look for meeting point J / 777. Tell our team your name — we'll take it from there.", "videoWatch": "Watch the clip", "videoClose": "Close", "videoThumbnailAlt": "Antalya Airport meet and greet area", "videoDialogLabel": "Antalya Airport meet and greet video" }, "de": { "videoEyebrow": "So finden Sie uns", "videoTitle": "Nach der Landung finden Sie uns<br />bei J / 777.", "videoSubtitle": "Unser Team erwartet Sie im Meet-&-Greet-Bereich am Treffpunkt J / 777. Verlassen Sie die Gepäckausgabe und kommen Sie zum Treffpunkt J / 777 — wir kümmern uns um alles Weitere.", "videoCardTitle": "Treffpunkt am Flughafen Antalya<br />J / 777", "videoCardBody": "Nachdem Sie Ihr Gepäck abgeholt haben, gehen Sie zum Meet-&-Greet-Bereich und suchen Sie den Treffpunkt J / 777. Nennen Sie unserem Team Ihren Namen — ab dort übernehmen wir.", "videoWatch": "Video ansehen", "videoClose": "Schließen", "videoThumbnailAlt": "Meet-&-Greet-Bereich am Flughafen Antalya", "videoDialogLabel": "Meet-&-Greet-Video am Flughafen Antalya" }, "tr": { "videoEyebrow": "Bizi nasıl bulursunuz", "videoTitle": "İnişten sonra bizi<br />J / 777 noktasında bulun.", "videoSubtitle": "Ekibimiz karşılama alanındaki J / 777 buluşma noktasında sizi bekler. Bagaj teslim alanından çıkın, J / 777 buluşma noktasına gelin; gerisini biz hallederiz.", "videoCardTitle": "Antalya Havalimanı<br />karşılama noktası", "videoCardBody": "Bagajınızı aldıktan sonra karşılama alanına çıkın ve J / 777 buluşma noktasını bulun. Ekibimize adınızı söyleyin; sonrasını bize bırakın.", "videoWatch": "Videoyu izleyin", "videoClose": "Kapat", "videoThumbnailAlt": "Antalya Havalimanı karşılama alanı", "videoDialogLabel": "Antalya Havalimanı karşılama videosu" }, "ru": { "videoEyebrow": "Как нас найти", "videoTitle": "После прилёта найдите нас<br />у точки J / 777.", "videoSubtitle": "Наша команда ждёт вас в зоне встречи у точки J / 777. Выйдите из зоны выдачи багажа и пройдите к точке J / 777 — обо всём остальном позаботимся мы.", "videoCardTitle": "Место встречи в аэропорту Антальи<br />J / 777", "videoCardBody": "После получения багажа выйдите в зону встречи и найдите точку J / 777. Назовите нашей команде своё имя — дальше мы обо всём позаботимся.", "videoWatch": "Смотреть видео", "videoClose": "Закрыть", "videoThumbnailAlt": "Зона встречи в аэропорту Антальи", "videoDialogLabel": "Видео о встрече в аэропорту Антальи" }, "pl": { "videoEyebrow": "Jak nas znaleźć", "videoTitle": "Po wylądowaniu znajdziesz nas<br />w punkcie J / 777.", "videoSubtitle": "Nasz zespół czeka w strefie powitalnej przy punkcie J / 777. Po odbiorze bagażu wyjdź z hali i podejdź do punktu J / 777 — resztą zajmiemy się my.", "videoCardTitle": "Punkt powitalny<br />na lotnisku w Antalyi", "videoCardBody": "Po odebraniu bagażu przejdź do strefy powitalnej i znajdź punkt J / 777. Podaj naszemu zespołowi swoje nazwisko — zajmiemy się resztą.", "videoWatch": "Obejrzyj film", "videoClose": "Zamknij", "videoThumbnailAlt": "Strefa powitalna na lotnisku w Antalyi", "videoDialogLabel": "Film o powitaniu na lotnisku w Antalyi" }, "nl": { "videoEyebrow": "Zo vindt u ons", "videoTitle": "Na de landing vindt u ons<br />bij punt J / 777.", "videoSubtitle": "Ons team wacht in de Meet & Greet-zone bij ontmoetingspunt J / 777. Verlaat de bagagehal en ga naar ontmoetingspunt J / 777 — wij regelen de rest.", "videoCardTitle": "Ontmoetingspunt<br />op Antalya Airport", "videoCardBody": "Ga na het ophalen van uw bagage naar de Meet & Greet-zone en zoek punt J / 777. Geef uw naam door aan ons team — vanaf daar regelen wij alles.", "videoWatch": "Bekijk de video", "videoClose": "Sluiten", "videoThumbnailAlt": "Meet & Greet-zone op Antalya Airport", "videoDialogLabel": "Meet & Greet-video op Antalya Airport" }, "uk": { "videoEyebrow": "Як нас знайти", "videoTitle": "Після прильоту знайдіть нас<br />біля пункту J / 777.", "videoSubtitle": "Наша команда чекає на вас у зоні зустрічі біля пункту J / 777. Вийдіть із зони видачі багажу та пройдіть до пункту J / 777 — про все інше подбаємо ми.", "videoCardTitle": "Місце зустрічі в аеропорту Анталії<br />J / 777", "videoCardBody": "Після отримання багажу вийдіть до зони зустрічі та знайдіть пункт J / 777. Назвіть нашій команді своє ім’я — далі ми про все подбаємо.", "videoWatch": "Переглянути відео", "videoClose": "Закрити", "videoThumbnailAlt": "Зона зустрічі в аеропорту Анталії", "videoDialogLabel": "Відео про зустріч в аеропорту Анталії" }, "fr": { "videoEyebrow": "Comment nous trouver", "videoTitle": "Après l’atterrissage, retrouvez-nous<br />au point J / 777.", "videoSubtitle": "Notre équipe vous attend dans la zone d’accueil au point J / 777. Quittez la zone de récupération des bagages et rejoignez le point J / 777 — nous nous occupons du reste.", "videoCardTitle": "Point d’accueil<br />à l’aéroport d’Antalya", "videoCardBody": "Après avoir récupéré vos bagages, rendez-vous dans la zone d’accueil et cherchez le point J / 777. Donnez votre nom à notre équipe — nous nous chargeons de la suite.", "videoWatch": "Voir la vidéo", "videoClose": "Fermer", "videoThumbnailAlt": "Zone d’accueil de l’aéroport d’Antalya", "videoDialogLabel": "Vidéo d’accueil à l’aéroport d’Antalya" }, "sv": { "videoEyebrow": "Så hittar du oss", "videoTitle": "Efter landning hittar du oss<br />vid punkt J / 777.", "videoSubtitle": "Vårt team väntar i välkomstområdet vid mötespunkt J / 777. Lämna bagageutlämningen och gå till mötespunkt J / 777 — vi tar hand om resten.", "videoCardTitle": "Mötesplats<br />på Antalya flygplats", "videoCardBody": "När du har hämtat ditt bagage går du till välkomstområdet och letar efter punkt J / 777. Uppge ditt namn för vårt team — sedan tar vi hand om resten.", "videoWatch": "Se videon", "videoClose": "Stäng", "videoThumbnailAlt": "Välkomstområdet på Antalya flygplats", "videoDialogLabel": "Välkomstvideo från Antalya flygplats" }, "ja": { "videoEyebrow": "集合場所のご案内", "videoTitle": "ご到着後は<br />J / 777へお越しください。", "videoSubtitle": "スタッフはアンタルヤ空港の出迎えエリア、J / 777でお待ちしています。手荷物受取所を出たら、集合場所 J / 777 へお越しください。その後はすべてお任せください。", "videoCardTitle": "アンタルヤ空港<br />お出迎え集合場所", "videoCardBody": "手荷物を受け取った後、出迎えエリアへ進み、J / 777をお探しください。スタッフにお名前をお伝えいただければ、あとは私たちがご案内します。", "videoWatch": "動画を見る", "videoClose": "閉じる", "videoThumbnailAlt": "アンタルヤ空港のお出迎えエリア", "videoDialogLabel": "アンタルヤ空港のお出迎え案内動画" }, "ko": { "videoEyebrow": "찾아오시는 길", "videoTitle": "도착 후 J / 777<br />지점에서 만나세요.", "videoSubtitle": "직원이 안탈리아 공항 환영 구역의 J / 777 지점에서 기다립니다. 수하물 수취대를 나와 J / 777 지점으로 오시면 나머지는 저희가 안내해 드립니다.", "videoCardTitle": "안탈리아 공항<br />환영 미팅 장소", "videoCardBody": "수하물을 찾은 후 환영 구역으로 이동해 J / 777 지점을 찾으세요. 직원에게 이름을 말씀해 주시면 이후 절차를 모두 안내해 드립니다.", "videoWatch": "영상 보기", "videoClose": "닫기", "videoThumbnailAlt": "안탈리아 공항 환영 구역", "videoDialogLabel": "안탈리아 공항 환영 안내 영상" }, "ar": { "videoEyebrow": "كيف تجدنا", "videoTitle": "بعد وصولك، ستجدنا<br />عند النقطة J / 777.", "videoSubtitle": "ينتظرك فريقنا في منطقة الاستقبال عند نقطة اللقاء J / 777. بعد مغادرة منطقة استلام الأمتعة، توجّه إلى نقطة اللقاء J / 777 وسنتولى نحن الباقي.", "videoCardTitle": "نقطة الاستقبال<br />في مطار أنطاليا", "videoCardBody": "بعد استلام أمتعتك، توجّه إلى منطقة الاستقبال وابحث عن النقطة J / 777. أخبر فريقنا باسمك وسنتولى الباقي.", "videoWatch": "شاهد الفيديو", "videoClose": "إغلاق", "videoThumbnailAlt": "منطقة الاستقبال في مطار أنطاليا", "videoDialogLabel": "فيديو الاستقبال في مطار أنطاليا" }, "cs": { "videoEyebrow": "Jak nás najít", "videoTitle": "Najdete nás u J / 777<br />po přistání.", "videoSubtitle": "Naši šoféři čekají v oblasti Meet & Greet — setkávací bod J / 777. Vyjděte z výdeje zavazadel, přejděte k setkávacímu bodu J / 777 a zbytek zajistíme my.", "videoCardTitle": "Místo uvítání<br />na letišti Antalya", "videoCardBody": "Po vyzvednutí zavazadel vyjděte do oblasti Meet & Greet a hledejte setkávací bod J / 777. Řekněte našemu týmu své jméno — zbytek vyřešíme za vás.", "videoWatch": "Přehrát video", "videoClose": "Zavřít", "videoThumbnailAlt": "Oblast uvítání na letišti Antalya", "videoDialogLabel": "Video o uvítání na letišti Antalya" }, "ur": { "videoEyebrow": "ہمیں کیسے تلاش کریں", "videoTitle": "آمد کے بعد ہمیں<br />J / 777 پر تلاش کریں۔", "videoSubtitle": "ہماری ٹیم J / 777 ملاقات کی جگہ پر آپ کا انتظار کر رہی ہے۔ سامان لینے کے بعد ملاقات کے علاقے میں نکلیں اور J / 777 ملاقات کی جگہ پر آئیں — باقی ہم سنبھالیں گے۔", "videoCardTitle": "انطالیہ ایئرپورٹ ملاقات کی جگہ<br />J / 777", "videoCardBody": "سامان لینے کے بعد ملاقات کے علاقے میں نکلیں اور J / 777 تلاش کریں۔ ہماری ٹیم کو اپنا نام بتائیں — آگے ہم سنبھالیں گے۔", "videoWatch": "ویڈیو دیکھیں", "videoClose": "بند کریں", "videoThumbnailAlt": "انطالیہ ایئرپورٹ ملاقات کی جگہ", "videoDialogLabel": "انطالیہ ایئرپورٹ ملاقات ویڈیو" } };
const videoTranslationData = {
  resources
};
const routeCatalog = {
  antalya: {
    names: { en: "Antalya City", de: "Antalya Stadt", tr: "Antalya şehir merkezi", ru: "центр Антальи", cs: "centrum Antalye", uk: "Центр Анталії", ur: "انطالیہ شہر", zh: "安塔利亚市区", da: "Antalya by", es: "Ciudad de Antalya", el: "Πόλη της Αντάλια", he: "מרכז אנטליה", hu: "Antalya belváros", it: "Antalya Città", ja: "アンタルヤ市内", ko: "안탈리아 시내", pt: "Cidade de Antalya", ro: "Orașul Antalya" },
    distanceKm: 15,
    durationMin: 25,
    duration: { en: "20–30 minutes", de: "20–30 Minuten", tr: "20–30 dakika", ru: "20–30 минут", cs: "20–30 minut", uk: "20–30 хвилин", ur: "20–30 منٹ", pl: "20–30 minut", nl: "20–30 minuten", sv: "20–30 minuter", ar: "20–30 دقيقة", zh: "20–30分钟", da: "20-30 minutter", es: "20–30 minutos", el: "20–30 λεπτά", he: "20–30 דקות", hu: "20–30 perc", it: "20–30 minuti", ja: "20〜30分", ko: "20~30분", pt: "20–30 minutos", ro: "20–30 de minute" },
    originalPrices: { vito: 40, sprinter: 65 },
    prices: { vito: 35, sprinter: 60 }
  },
  belek: {
    names: { en: "Belek", de: "Belek", tr: "Belek", ru: "Белек", cs: "Belek", uk: "Белек", ur: "بیلک", zh: "贝莱克", da: "Belek", es: "Belek", el: "Μπέλεκ", he: "בלק", hu: "Belek", it: "Belek", ja: "ベレク", ko: "벨렉", pt: "Belek", ro: "Belek" },
    distanceKm: 45,
    durationMin: 35,
    duration: { en: "35–40 minutes", de: "35–40 Minuten", tr: "35–40 dakika", ru: "35–40 минут", cs: "35–40 minut", uk: "35–40 хвилин", ur: "35–40 منٹ", pl: "35–40 minut", nl: "35–40 minuten", sv: "35–40 minuter", ar: "35–40 دقيقة", zh: "35–40分钟", da: "35-40 minutter", es: "35–40 minutos", el: "35–40 λεπτά", he: "35–40 דקות", hu: "35–40 perc", it: "35–40 minuti", ja: "35〜40分", ko: "35~40분", pt: "35–40 minutos", ro: "35–40 de minute" },
    originalPrices: { vito: 50, sprinter: 85 },
    prices: { vito: 40, sprinter: 70 }
  },
  side: {
    names: { en: "Side", de: "Side", tr: "Side", ru: "Сиде", cs: "Side", uk: "Сіде", ur: "سیدے", zh: "锡代", da: "Side", es: "Side", el: "Σίδη", he: "סידה", hu: "Side", it: "Side", ja: "シデ", ko: "시데", pt: "Side", ro: "Side" },
    distanceKm: 65,
    durationMin: 55,
    duration: { en: "55–65 minutes", de: "55–65 Minuten", tr: "55–65 dakika", ru: "55–65 минут", cs: "55–65 minut", uk: "55–65 хвилин", ur: "55–65 منٹ", pl: "55–65 minut", nl: "55–65 minuten", sv: "55–65 minuter", ar: "55–65 دقيقة", zh: "55–65分钟", da: "55-65 minutter", es: "55–65 minutos", el: "55–65 λεπτά", he: "55–65 דקות", hu: "55–65 perc", it: "55–65 minuti", ja: "55〜65分", ko: "55~65분", pt: "55–65 minutos", ro: "55–65 de minute" },
    originalPrices: { vito: 60, sprinter: 100 },
    prices: { vito: 50, sprinter: 85 }
  },
  kemer: {
    names: { en: "Kemer", de: "Kemer", tr: "Kemer", ru: "Кемер", cs: "Kemer", uk: "Кемер", ur: "کیمر", zh: "凯梅尔", da: "Kemer", es: "Kemer", el: "Κεμέρ", he: "קמר", hu: "Kemer", it: "Kemer", ja: "ケメル", ko: "케메르", pt: "Kemer", ro: "Kemer" },
    distanceKm: 50,
    durationMin: 60,
    duration: { en: "40–50 minutes", de: "40–50 Minuten", tr: "40–50 dakika", ru: "40–50 минут", cs: "40–50 minut", uk: "40–50 хвилин", ur: "40–50 منٹ", pl: "40–50 minut", nl: "40–50 minuten", sv: "40–50 minuter", ar: "40–50 دقيقة", zh: "40–50分钟", da: "40-50 minutter", es: "40–50 minutos", el: "40–50 λεπτά", he: "40–50 דקות", hu: "40–50 perc", it: "40–50 minuti", ja: "40〜50分", ko: "40~50분", pt: "40–50 minutos", ro: "40–50 de minute" },
    originalPrices: { vito: 65, sprinter: 110 },
    prices: { vito: 55, sprinter: 90 }
  },
  alanya: {
    names: { en: "Alanya", de: "Alanya", tr: "Alanya", ru: "Аланью", cs: "Alanya", uk: "Аланья", ur: "الانیا", zh: "阿拉尼亚", da: "Alanya", es: "Alanya", el: "Αλάνια", he: "אלניה", hu: "Alanya", it: "Alanya", ja: "アランヤ", ko: "알라니아", pt: "Alanya", ro: "Alanya" },
    distanceKm: 125,
    durationMin: 120,
    duration: { en: "110–130 minutes", de: "110–130 Minuten", tr: "110–130 dakika", ru: "110–130 минут", cs: "110–130 minut", uk: "110–130 хвилин", ur: "110–130 منٹ", pl: "110–130 minut", nl: "110–130 minuten", sv: "110–130 minuter", ar: "110–130 دقيقة", zh: "110–130分钟", da: "110-130 minutter", es: "110–130 minutos", el: "110–130 λεπτά", he: "110–130 דקות", hu: "110–130 perc", it: "110–130 minuti", ja: "110〜130分", ko: "110~130분", pt: "110–130 minutos", ro: "110–130 de minute" },
    originalPrices: { vito: 110, sprinter: 170 },
    prices: { vito: 95, sprinter: 145 }
  },
  bogazkent: {
    names: { en: "Boğazkent", de: "Boğazkent", tr: "Boğazkent", ru: "Богазкент", cs: "Boğazkent", uk: "Богазкент", ur: "بوازکینت", zh: "博阿兹肯特", da: "Boğazkent", es: "Boğazkent", el: "Μπογάζκεντ", he: "בואזקנט", hu: "Boğazkent", it: "Boğazkent", ja: "ボアズケント", ko: "보아즈켄트", pt: "Boğazkent", ro: "Boğazkent" },
    distanceKm: 48,
    durationMin: 45,
    duration: { en: "40–45 minutes", de: "40–45 Minuten", tr: "40–45 dakika", ru: "40–45 минут", cs: "40–45 minut", uk: "40–45 хвилин", ur: "40–45 منٹ", pl: "40–45 minut", nl: "40–45 minuten", sv: "40–45 minuter", ar: "40–45 دقيقة", zh: "40–45分钟", da: "40-45 minutter", es: "40–45 minutos", el: "40–45 λεπτά", he: "40–45 דקות", hu: "40–45 perc", it: "40–45 minuti", ja: "40〜45分", ko: "40~45분", pt: "40–45 minutos", ro: "40–45 de minute" },
    originalPrices: { vito: 55, sprinter: 90 },
    prices: { vito: 45, sprinter: 80 }
  },
  manavgat: {
    names: { en: "Manavgat", de: "Manavgat", tr: "Manavgat", ru: "Манавгат", cs: "Manavgat", uk: "Манавгат", ur: "مانوگات", zh: "马纳夫加特", da: "Manavgat", es: "Manavgat", el: "Μαναβγκάτ", he: "מאנאבגאט", hu: "Manavgat", it: "Manavgat", ja: "マナヴガト", ko: "마나브가트", pt: "Manavgat", ro: "Manavgat" },
    distanceKm: 75,
    durationMin: 65,
    duration: { en: "55–65 minutes", de: "55–65 Minuten", tr: "55–65 dakika", ru: "55–65 минут", cs: "55–65 minut", uk: "55–65 хвилин", ur: "55–65 منٹ", pl: "55–65 minut", nl: "55–65 minuten", sv: "55–65 minuter", ar: "55–65 دقيقة", zh: "55–65分钟", da: "55-65 minutter", es: "55–65 minutos", el: "55–65 λεπτά", he: "55–65 דקות", hu: "55–65 perc", it: "55–65 minuti", ja: "55〜65分", ko: "55~65분", pt: "55–65 minutos", ro: "55–65 de minute" },
    originalPrices: { vito: 60, sprinter: 100 },
    prices: { vito: 50, sprinter: 85 }
  },
  kizilagac: {
    names: { en: "Manavgat/Kızılağaç", de: "Manavgat/Kızılağaç", tr: "Manavgat/Kızılağaç", ru: "Манавгат/Кызылагач", cs: "Manavgat/Kızılağaç", uk: "Манавгат/Кизилагач", ur: "مانوگات/قیزیلاغاچ", zh: "马纳夫加特/克孜勒阿加奇", da: "Manavgat/Kızılağaç", es: "Manavgat/Kızılağaç", el: "Μαναβγκάτ/Κιζιλάγατς", he: "מאנאבגאט/קיזילאגאץ'", hu: "Manavgat/Kızılağaç", it: "Manavgat/Kızılağaç", ja: "マナヴガト/クズラアチ", ko: "마나브가트/크즐라아치", pt: "Manavgat/Kızılağaç", ro: "Manavgat/Kızılağaç" },
    distanceKm: 85,
    durationMin: 75,
    duration: { en: "70–80 minutes", de: "70–80 Minuten", tr: "70–80 dakika", ru: "70–80 минут", cs: "70–80 minut", uk: "70–80 хвилин", ur: "70–80 منٹ", pl: "70–80 minut", nl: "70–80 minuten", sv: "70–80 minuter", ar: "70–80 دقيقة", zh: "70–80分钟", da: "70-80 minutter", es: "70–80 minutos", el: "70–80 λεπτά", he: "70–80 דקות", hu: "70–80 perc", it: "70–80 minuti", ja: "70〜80分", ko: "70~80분", pt: "70–80 minutos", ro: "70–80 de minute" },
    originalPrices: { vito: 70, sprinter: 115 },
    prices: { vito: 60, sprinter: 95 }
  },
  tekirova: {
    names: { en: "Tekirova", de: "Tekirova", tr: "Tekirova", ru: "Текирову", cs: "Tekirova", uk: "Текірова", ur: "ٹیکیروا", zh: "泰基罗瓦", da: "Tekirova", es: "Tekirova", el: "Τεκίροβα", he: "טקירובה", hu: "Tekirova", it: "Tekirova", ja: "テキロヴァ", ko: "테키로바", pt: "Tekirova", ro: "Tekirova" },
    distanceKm: 75,
    durationMin: 75,
    duration: { en: "75–90 minutes", de: "75–90 Minuten", tr: "75–90 dakika", ru: "75–90 минут", cs: "75–90 minut", uk: "75–90 хвилин", ur: "75–90 منٹ", pl: "75–90 minut", nl: "75–90 minuten", sv: "75–90 minuter", ar: "75–90 دقيقة", zh: "75–90分钟", da: "75-90 minutter", es: "75–90 minutos", el: "75–90 λεπτά", he: "75–90 דקות", hu: "75–90 perc", it: "75–90 minuti", ja: "75〜90分", ko: "75~90분", pt: "75–90 minutos", ro: "75–90 de minute" },
    originalPrices: { vito: 90, sprinter: 135 },
    prices: { vito: 75, sprinter: 115 }
  },
  bodrum: {
    names: { en: "Bodrum", de: "Bodrum", tr: "Bodrum", ru: "Бодрум", cs: "Bodrum", uk: "Бодрум", ur: "بودروم", zh: "博德鲁姆", da: "Bodrum", es: "Bodrum", el: "Μπόντρουμ", he: "בודרום", hu: "Bodrum", it: "Bodrum", ja: "ボドルム", ko: "보드룸", pt: "Bodrum", ro: "Bodrum" },
    distanceKm: 380,
    durationMin: 300,
    duration: { en: "5–6 hours", de: "5–6 Stunden", tr: "5–6 saat", ru: "5–6 часов", cs: "5–6 hodin", uk: "5–6 годин", ur: "5–6 گھنٹے", pl: "5–6 godzin", nl: "5–6 uur", sv: "5–6 timmar", ar: "5–6 ساعات", zh: "5–6小时", da: "5-6 timer", es: "5–6 horas", el: "5–6 ώρες", he: "5–6 שעות", hu: "5–6 óra", it: "5–6 ore", ja: "5〜6時間", ko: "5~6시간", pt: "5–6 horas", ro: "5–6 ore" },
    originalPrices: { vito: 325, sprinter: 385 },
    prices: { vito: 280, sprinter: 330 }
  },
  dalaman: {
    names: { en: "Dalaman", de: "Dalaman", tr: "Dalaman", ru: "Даламан", cs: "Dalaman", uk: "Даламан", ur: "دالامان", zh: "达拉曼", da: "Dalaman", es: "Dalaman", el: "Νταλαμάν", he: "דלמאן", hu: "Dalaman", it: "Dalaman", ja: "ダラマン", ko: "달라만", pt: "Dalaman", ro: "Dalaman" },
    distanceKm: 235,
    durationMin: 210,
    duration: { en: "3–3.5 hours", de: "3–3,5 Stunden", tr: "3–3,5 saat", ru: "3–3,5 часа", cs: "3–3,5 hodiny", uk: "3–3,5 години", ur: "3–3.5 گھنٹے", pl: "3–3.5 godzin", nl: "3–3.5 uur", sv: "3–3.5 timmar", ar: "3–3.5 ساعات", zh: "3–3.5小时", da: "3-3,5 timer", es: "3–3,5 horas", el: "3–3,5 ώρες", he: "3–3.5 שעות", hu: "3–3,5 óra", it: "3–3,5 ore", ja: "3〜3.5時間", ko: "3~3.5시간", pt: "3–3,5 horas", ro: "3–3,5 ore" },
    originalPrices: { vito: 210, sprinter: 310 },
    prices: { vito: 180, sprinter: 265 }
  },
  fethiye: {
    names: { en: "Fethiye", de: "Fethiye", tr: "Fethiye", ru: "Фетхие", cs: "Fethiye", uk: "Фетхіє", ur: "فتحیہ", zh: "费特希耶", da: "Fethiye", es: "Fethiye", el: "Φετχιγέ", he: "פתייה", hu: "Fethiye", it: "Fethiye", ja: "フェティエ", ko: "페티예", pt: "Fethiye", ro: "Fethiye" },
    distanceKm: 205,
    durationMin: 180,
    duration: { en: "2.5–3 hours", de: "2,5–3 Stunden", tr: "2,5–3 saat", ru: "2,5–3 часа", cs: "2,5–3 hodiny", uk: "2,5–3 години", ur: "2.5–3 گھنٹے", pl: "2.5–3 godzin", nl: "2.5–3 uur", sv: "2.5–3 timmar", ar: "2.5–3 ساعات", zh: "2.5–3小时", da: "2,5-3 timer", es: "2,5–3 horas", el: "2,5–3 ώρες", he: "2.5–3 שעות", hu: "2,5–3 óra", it: "2,5–3 ore", ja: "2.5〜3時間", ko: "2.5~3시간", pt: "2,5–3 horas", ro: "2,5–3 ore" },
    originalPrices: { vito: 210, sprinter: 310 },
    prices: { vito: 180, sprinter: 265 }
  },
  pamukkale: {
    names: { en: "Pamukkale", de: "Pamukkale", tr: "Pamukkale", ru: "Памуккале", cs: "Pamukkale", uk: "Памуккале", ur: "پاموکالے", zh: "棉花堡", da: "Pamukkale", es: "Pamukkale", el: "Παμούκκαλε", he: "פאמוקקלה", hu: "Pamukkale", it: "Pamukkale", ja: "パムッカレ", ko: "파묵칼레", pt: "Pamukkale", ro: "Pamukkale" },
    distanceKm: 245,
    durationMin: 180,
    duration: { en: "3–3.5 hours", de: "3–3,5 Stunden", tr: "3–3,5 saat", ru: "3–3,5 часа", cs: "3–3,5 hodiny", uk: "3–3,5 години", ur: "3–3.5 گھنٹے", pl: "3–3.5 godzin", nl: "3–3.5 uur", sv: "3–3.5 timmar", ar: "3–3.5 ساعات", zh: "3–3.5小时", da: "3-3,5 timer", es: "3–3,5 horas", el: "3–3,5 ώρες", he: "3–3.5 שעות", hu: "3–3,5 óra", it: "3–3,5 ore", ja: "3〜3.5時間", ko: "3~3.5시간", pt: "3–3,5 horas", ro: "3–3,5 ore" },
    originalPrices: { vito: 290, sprinter: 350 },
    prices: { vito: 250, sprinter: 300 }
  },
  kapadokya: {
    names: { en: "Cappadocia", de: "Kappadokien", tr: "Kapadokya", ru: "Каппадокию", cs: "Kappadokie", uk: "Каппадокія", ur: "کاپاڈوکیا", zh: "卡帕多奇亚", da: "Kappadokien", es: "Capadocia", el: "Καππαδοκία", he: "קפדוקיה", hu: "Kappadókia", it: "Cappadocia", ja: "カッパドキア", ko: "카파도키아", pt: "Capadócia", ro: "Capadocia" },
    distanceKm: 540,
    durationMin: 480,
    duration: { en: "7–8 hours", de: "7–8 Stunden", tr: "7–8 saat", ru: "7–8 часов", cs: "7–8 hodin", uk: "7–8 годин", ur: "7–8 گھنٹے", pl: "7–8 godzin", nl: "7–8 uur", sv: "7–8 timmar", ar: "7–8 ساعات", zh: "7–8小时", da: "7-8 timer", es: "7–8 horas", el: "7–8 ώρες", he: "7–8 שעות", hu: "7–8 óra", it: "7–8 ore", ja: "7〜8時間", ko: "7~8시간", pt: "7–8 horas", ro: "7–8 ore" },
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
  { code: "cs", flag: "🇨🇿", label: "Čeština" },
  { code: "ar", flag: "🇸🇦", label: "العربية" },
  { code: "pl", flag: "🇵🇱", label: "Polski" },
  { code: "nl", flag: "🇳🇱", label: "Nederlands" },
  { code: "uk", flag: "🇺🇦", label: "Українська" },
  { code: "ur", flag: "🇵🇰", label: "اردو" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "sv", flag: "🇸🇪", label: "Svenska" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
  { code: "ko", flag: "🇰🇷", label: "한국어" },
  { code: "zh", flag: "🇨🇳", label: "简体中文" },
  { code: "da", flag: "🇩🇰", label: "Dansk" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "el", flag: "🇬🇷", label: "Ελληνικά" },
  { code: "he", flag: "🇮🇱", label: "עברית" },
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "hu", flag: "🇭🇺", label: "Magyar" },
  { code: "pt", flag: "🇵🇹", label: "Português" },
  { code: "ro", flag: "🇷🇴", label: "Română" }
];
const supportedLanguages = new Set(languageOptions.map(({ code }) => code));
const indexableLanguages$1 = /* @__PURE__ */ new Set(["en", "de", "tr", "ru", "cs", "uk", "ur", "fr", "pl", "nl", "ar", "sv", "da", "el", "es", "he", "hu", "it", "ja", "ko", "pt", "ro", "zh"]);
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
const homeFaqGroups = [
  {
    labelKey: "faqCatArrival",
    labelFallback: "Arrival & transfer",
    items: [
      { key: "One", slug: "flight-delay" },
      { key: "Two", slug: "airport-pickup" },
      { key: "Six", slug: "domestic-arrival" },
      { key: "Seven", slug: "meeting-point" },
      { key: "Eight", slug: "airport-waiting" }
    ]
  },
  {
    labelKey: "faqCatJourney",
    labelFallback: "Return & journey",
    items: [
      { key: "Ten", slug: "return-contact" },
      { key: "Fourteen", slug: "return-delay" },
      { key: "Fifteen", slug: "extra-stops" }
    ]
  },
  {
    labelKey: "faqCatPayment",
    labelFallback: "Payment & price",
    items: [
      { key: "Nine", slug: "payment" },
      { key: "Twelve", slug: "currency" },
      { key: "Eleven", slug: "cancellation" },
      { key: "Five", slug: "price-final" }
    ]
  },
  {
    labelKey: "faqCatVehicle",
    labelFallback: "Vehicle & luggage",
    items: [
      { key: "Three", slug: "child-seats" },
      { key: "Thirteen", slug: "luggage" },
      { key: "Four", slug: "golf-luggage" }
    ]
  }
];
const homeFaqOrder = homeFaqGroups.flatMap(
  (group) => group.items.map((item) => item.key)
);
const faqAnchor = (slug) => `faq-${slug}`;
const LEGACY_ANCHORS = Object.fromEntries(
  homeFaqGroups.flatMap(
    (group) => group.items.map((item) => [`faq-${item.key}`, faqAnchor(item.slug)])
  )
);
const resolveFaqAnchor = (hash) => LEGACY_ANCHORS[hash] ?? hash;
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
    customerName: z.string(),
    customerPhone: z.string(),
    customerEmail: z.string()
  }).superRefine((values, context) => {
    const today = /* @__PURE__ */ new Date();
    const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const guests = Number(values.guests);
    const luggage = Number(values.luggage);
    const childSeats = Number(values.childSeats);
    const capacity = values.vehicle === "sprinter" ? 12 : 6;
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
function quoteFor(values, overrides) {
  if (values.tripType === "daily_chauffeur") {
    const days = inclusiveDayCount(values.travelDate, values.serviceEndDate);
    const dailyRate = overrides?.dailyRates?.[values.vehicle] ?? DAILY_CHAUFFEUR_RATE_EUR;
    const price = days > 0 && days <= MAX_DAILY_CHAUFFEUR_DAYS ? days * dailyRate : 0;
    return { price, originalPrice: price };
  }
  const route = routeCatalog[values.destination];
  if (!route) return { price: 0, originalPrice: 0 };
  const journeys = values.tripType === "round_trip" ? 2 : 1;
  const liveUnitPrice = overrides?.routePrices?.[`${values.destination}:${values.vehicle}`];
  const unitPrice = liveUnitPrice ?? route.prices[values.vehicle];
  return {
    price: unitPrice * journeys,
    originalPrice: route.originalPrices[values.vehicle] * journeys
  };
}
async function fetchLivePriceOverrides() {
  try {
    const { supabase } = await import("./assets/supabase-C4IYsODx.js");
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
const domain = "https://antalyaviptourism.com";
const indexableLanguages = ["en", "de", "fr", "tr", "ru", "cs", "uk", "ur", "pl", "nl", "ar", "sv", "da", "el", "es", "he", "hu", "it", "ja", "ko", "pt", "ro", "zh"];
const homeSeo = {
  zh: { locale: "zh_CN", title: "安塔利亚机场接送 | 私人VIP旅游服务", description: "从安塔利亚机场到土耳其各度假区的私人固定价格接送服务。" },
  da: { locale: "da_DK", title: "Antalya Lufthavnstransfer | Privat VIP-turistservice", description: "Private transfers til fast pris fra Antalya Lufthavn til feriesteder i hele Tyrkiet." },
  es: { locale: "es_ES", title: "Traslado Aeropuerto de Antalya | Servicio Turístico VIP Privado", description: "Traslados privados a precio fijo desde el Aeropuerto de Antalya a resorts de toda Türkiye." },
  el: { locale: "el_GR", title: "Μεταφορά από το Αεροδρόμιο Αντάλια | Ιδιωτική Υπηρεσία VIP Τουρισμού", description: "Ιδιωτικές μεταφορές με σταθερή τιμή από το Αεροδρόμιο της Αντάλια προς θέρετρα σε όλη την Τουρκία." },
  he: { locale: "he_IL", title: "העברות משדה התעופה אנטליה | שירות תיירות VIP פרטי", description: "העברות פרטיות במחיר קבוע משדה התעופה אנטליה לאתרי הנופש ברחבי טורקיה." },
  hu: { locale: "hu_HU", title: "Antalya reptéri transzfer | Privát VIP turisztikai szolgáltatás", description: "Privát, fix áras transzferek az antalyai repülőtérről a törökországi üdülőhelyekre." },
  it: { locale: "it_IT", title: "Transfer Aeroporto di Antalya | Servizio Turistico VIP Privato", description: "Transfer privati a prezzo fisso dall'Aeroporto di Antalya verso i resort di tutta la Türkiye." },
  ja: { locale: "ja_JP", title: "アンタルヤ空港送迎 | プライベートVIP観光サービス", description: "アンタルヤ空港からトルコ各地のリゾートへの固定料金プライベート送迎。" },
  ko: { locale: "ko_KR", title: "안탈리아 공항 이동 서비스 | 프라이빗 VIP 관광 서비스", description: "안탈리아 공항에서 튀르키예 전역의 리조트까지 정찰제 프라이빗 이동 서비스." },
  pt: { locale: "pt_PT", title: "Transfer do Aeroporto de Antalya | Serviço Privado de Turismo VIP", description: "Transfers privados a preço fixo do Aeroporto de Antalya para resorts em toda a Turquia." },
  ro: { locale: "ro_RO", title: "Transfer Aeroport Antalya | Serviciu Privat de Turism VIP", description: "Transferuri private cu preț fix de la Aeroportul Antalya către stațiunile din Turcia." },
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
  zh: {
    locale: "zh_CN",
    title: "安塔利亚健康旅行协调 | Antalya VIP旅游",
    description: "规划您的安塔利亚健康之旅，明确的服务方职责、私人接送、住宿协调，以及由授权医疗团队主导的连续护理。",
    service: "健康旅行协调与礼宾物流服务"
  },
  da: {
    locale: "da_DK",
    title: "Koordinering af sundhedsrejser i Antalya | Antalya VIP Tourism",
    description: "Planlæg din sundhedsrejse til Antalya med klare udbyderroller, private transfers, koordinering af overnatning og sammenhængende behandling ledet af autoriserede lægeteams.",
    service: "Koordinering af sundhedsrejser og concierge-logistik"
  },
  es: {
    locale: "es_ES",
    title: "Coordinación de Turismo de Salud en Antalya | Antalya VIP Tourism",
    description: "Planifique su viaje de salud a Antalya con funciones claras de los proveedores, traslados privados, coordinación de alojamiento y continuidad asistencial dirigida por equipos médicos autorizados.",
    service: "Coordinación de turismo de salud y logística de conserjería"
  },
  el: {
    locale: "el_GR",
    title: "Συντονισμός Ιατρικού Τουρισμού στην Αντάλια | Antalya VIP Tourism",
    description: "Σχεδιάστε το ιατρικό σας ταξίδι στην Αντάλια με σαφείς ρόλους παρόχων, ιδιωτικές μεταφορές, συντονισμό διαμονής και συνέχεια φροντίδας υπό την καθοδήγηση εξουσιοδοτημένων ιατρικών ομάδων.",
    service: "Συντονισμός ιατρικού τουρισμού και υπηρεσίες concierge logistics"
  },
  he: {
    locale: "he_IL",
    title: "תיאום תיירות רפואית באנטליה | Antalya VIP Tourism",
    description: "תכננו את מסע התיירות הרפואית שלכם באנטליה עם חלוקת תפקידים ברורה בין הספקים, העברות פרטיות, תיאום מקומות לינה ורצף טיפולי בהובלת צוותים רפואיים מורשים.",
    service: "תיאום תיירות רפואית ולוגיסטיקת קונסיירז'"
  },
  hu: {
    locale: "hu_HU",
    title: "Egészségturisztikai koordináció Antalyában | Antalya VIP Tourism",
    description: "Tervezze meg antalyai egészségügyi utazását világos szolgáltatói szerepekkel, privát transzferekkel, szálláskoordinációval és folyamatos ellátással, engedéllyel rendelkező orvosi csapatok vezetésével.",
    service: "Egészségturisztikai koordináció és concierge logisztika"
  },
  it: {
    locale: "it_IT",
    title: "Coordinamento del Turismo Sanitario ad Antalya | Antalya VIP Tourism",
    description: "Pianifica il tuo viaggio sanitario ad Antalya con ruoli chiari dei fornitori, transfer privati, coordinamento dell'alloggio e continuità delle cure guidate da équipe mediche autorizzate.",
    service: "Coordinamento del turismo sanitario e logistica concierge"
  },
  ja: {
    locale: "ja_JP",
    title: "アンタルヤの医療渡航コーディネート | Antalya VIP Tourism",
    description: "認可された医療チームが主導する明確な提供者の役割、プライベート送迎、宿泊手配、継続的なケアで、アンタルヤでの医療渡航を計画します。",
    service: "医療渡航コーディネートおよびコンシェルジュロジスティクス"
  },
  ko: {
    locale: "ko_KR",
    title: "안탈리아 의료 여행 코디네이션 | 안탈리아 VIP 관광",
    description: "명확한 제공자 역할, 프라이빗 이동, 숙박 코디네이션, 그리고 공인 의료팀이 이끄는 지속적인 케어로 안탈리아 의료 여행을 계획하세요.",
    service: "의료 여행 코디네이션 및 컨시어지 물류"
  },
  pt: {
    locale: "pt_PT",
    title: "Coordenação de Turismo de Saúde em Antalya | Antalya VIP Tourism",
    description: "Planeie a sua viagem de saúde em Antalya com funções de prestadores bem definidas, transfers privados, coordenação de alojamento e continuidade de cuidados liderada por equipas médicas autorizadas.",
    service: "Coordenação de turismo de saúde e logística de concierge"
  },
  ro: {
    locale: "ro_RO",
    title: "Coordonare Turism Medical în Antalya | Antalya VIP Tourism",
    description: "Planificați-vă călătoria medicală în Antalya cu roluri clare ale furnizorilor, transferuri private, coordonarea cazării și continuitatea îngrijirii asigurate de echipe medicale autorizate.",
    service: "Coordonare turism medical și logistică concierge"
  },
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
  zh: {
    title: (name) => `安塔利亚机场至${name}接送 | 私人固定价格服务`,
    description: (name, price) => `从安塔利亚机场至${name}的私人固定价格接送，€${price}起。含接机问候、航班追踪及门到门服务。`,
    heading: (name) => `从安塔利亚机场到${name}的私人接送`,
    faq: (name, price, duration) => [[`从安塔利亚机场到${name}的接送需要多长时间？`, `在正常交通情况下，行程约需${duration}。`], [`到${name}的固定接送价格是多少？`, `Mercedes Vito价格每车€${price}起。确认的总价将在预订时显示。`], ["如果我的航班延误怎么办？", "我们会实时追踪您的航班，并免费调整接机时间。"], ["我的司机会在机场等候多久？", "落地后的前90分钟免费包含在内，如果您的航班延误，等候时间会自动顺延。"], ["我该如何支付接送费用？", "在行程开始时以现金支付给您的司机——即您预订时的固定价格，按每车计算。"]]
  },
  da: {
    title: (name) => `Antalya Lufthavn til ${name} Transfer | Privat service til fast pris`,
    description: (name, price) => `Privat transfer til fast pris fra Antalya Lufthavn til ${name} fra €${price}. Meet & Greet, flysporing og dør-til-dør-service.`,
    heading: (name) => `Privat transfer fra Antalya Lufthavn til ${name}`,
    faq: (name, price, duration) => [[`Hvor lang er transferen fra Antalya Lufthavn til ${name}?`, `Rejsen tager cirka ${duration} i normal trafik.`], [`Hvad er den faste transferpris til ${name}?`, `Priser for Mercedes Vito starter fra €${price} pr. køretøj. Den bekræftede totalpris vises ved bestilling.`], ["Hvad sker der, hvis mit fly er forsinket?", "Vi sporer dit fly i realtid og justerer mødetidspunktet uden ekstra beregning."], ["Hvor længe venter min chauffør i lufthavnen?", "De første 90 minutter efter landing er inkluderet uden beregning, og tidsvinduet flyttes automatisk, hvis dit fly er forsinket."], ["Hvordan betaler jeg for transferen?", "Kontant til din chauffør ved rejsens start - den faste pris fra din bestilling, pr. køretøj."]]
  },
  es: {
    title: (name) => `Traslado del Aeropuerto de Antalya a ${name} | Servicio Privado a Precio Fijo`,
    description: (name, price) => `Traslado privado a precio fijo desde el Aeropuerto de Antalya a ${name} desde €${price}. Recepción personal, seguimiento de vuelos y servicio puerta a puerta.`,
    heading: (name) => `Traslado privado del Aeropuerto de Antalya a ${name}`,
    faq: (name, price, duration) => [[`¿Cuánto dura el traslado del Aeropuerto de Antalya a ${name}?`, `El trayecto dura aproximadamente ${duration} con tráfico normal.`], [`¿Cuál es el precio fijo del traslado a ${name}?`, `Los precios del Mercedes Vito comienzan desde €${price} por vehículo. El total confirmado se muestra al reservar.`], ["¿Qué ocurre si mi vuelo se retrasa?", "Seguimos su vuelo en tiempo real y ajustamos la hora de encuentro sin coste adicional."], ["¿Cuánto tiempo espera mi chófer en el aeropuerto?", "Los primeros 90 minutos tras el aterrizaje están incluidos de forma gratuita, y el margen se ajusta automáticamente si su vuelo se retrasa."], ["¿Cómo pago el traslado?", "En efectivo a su chófer al inicio del trayecto: el precio fijo de su reserva, por vehículo."]]
  },
  el: {
    title: (name) => `Μεταφορά από το Αεροδρόμιο Αντάλια προς ${name} | Ιδιωτική Υπηρεσία με Σταθερή Τιμή`,
    description: (name, price) => `Ιδιωτική μεταφορά με σταθερή τιμή από το Αεροδρόμιο Αντάλια προς ${name} από €${price}. Υποδοχή Meet & Greet, παρακολούθηση πτήσης και εξυπηρέτηση από πόρτα σε πόρτα.`,
    heading: (name) => `Ιδιωτική μεταφορά από το Αεροδρόμιο Αντάλια προς ${name}`,
    faq: (name, price, duration) => [[`Πόσο διαρκεί η μεταφορά από το Αεροδρόμιο Αντάλια προς ${name};`, `Το ταξίδι διαρκεί περίπου ${duration} υπό κανονικές συνθήκες κυκλοφορίας.`], [`Ποια είναι η σταθερή τιμή μεταφοράς προς ${name};`, `Οι τιμές για Mercedes Vito ξεκινούν από €${price} ανά όχημα. Το επιβεβαιωμένο σύνολο εμφανίζεται κατά την κράτηση.`], ["Τι συμβαίνει αν η πτήση μου καθυστερήσει;", "Παρακολουθούμε την πτήση σας σε πραγματικό χρόνο και προσαρμόζουμε την ώρα συνάντησης χωρίς επιπλέον χρέωση."], ["Πόση ώρα περιμένει ο οδηγός μου στο αεροδρόμιο;", "Τα πρώτα 90 λεπτά μετά την προσγείωση περιλαμβάνονται δωρεάν, και το χρονικό περιθώριο μετατοπίζεται αυτόματα αν η πτήση σας καθυστερήσει."], ["Πώς πληρώνω για τη μεταφορά;", "Σε μετρητά στον οδηγό σας στην αρχή του ταξιδιού - τη σταθερή τιμή από την κράτησή σας, ανά όχημα."]]
  },
  he: {
    title: (name) => `העברה משדה התעופה אנטליה אל ${name} | שירות פרטי במחיר קבוע`,
    description: (name, price) => `העברה פרטית במחיר קבוע משדה התעופה אנטליה אל ${name} החל מ-€${price}. קבלת פנים אישית, מעקב טיסות ושירות מדלת לדלת.`,
    heading: (name) => `העברה פרטית משדה התעופה אנטליה אל ${name}`,
    faq: (name, price, duration) => [[`כמה זמן אורכת ההעברה משדה התעופה אנטליה אל ${name}?`, `הנסיעה אורכת כ-${duration} בתנועה רגילה.`], [`מהו המחיר הקבוע של ההעברה אל ${name}?`, `מחירי Mercedes Vito מתחילים מ-€${price} לרכב. הסכום הכולל המאושר מוצג בעת ההזמנה.`], ["מה קורה אם הטיסה שלי מתעכבת?", "אנו עוקבים אחר הטיסה שלכם בזמן אמת ומתאימים את שעת המפגש ללא תוספת תשלום."], ["כמה זמן ממתין הנהג שלי בשדה התעופה?", "90 הדקות הראשונות לאחר הנחיתה כלולות ללא תשלום, וחלון ההמתנה זז אוטומטית אם הטיסה מתעכבת."], ["כיצד אני משלם עבור ההעברה?", "במזומן לנהג בתחילת הנסיעה - המחיר הקבוע מתוך ההזמנה שלכם, לכל רכב."]]
  },
  hu: {
    title: (name) => `Antalya repülőtér – ${name} transzfer | Privát, fix áras szolgáltatás`,
    description: (name, price) => `Privát, fix áras transzfer az antalyai repülőtérről ${name} felé, már €${price}-tól. Meet & Greet, járatkövetés és háztól házig szolgáltatás.`,
    heading: (name) => `Privát transzfer az antalyai repülőtérről ${name} felé`,
    faq: (name, price, duration) => [[`Mennyi ideig tart a transzfer az antalyai repülőtérről ${name} felé?`, `Az út normál forgalomban körülbelül ${duration} tart.`], [`Mennyi a fix transzfer ára ${name} felé?`, `A Mercedes Vito árai járművenként €${price}-tól kezdődnek. A megerősített végösszeg a foglaláskor jelenik meg.`], ["Mi történik, ha a járatom késik?", "Valós időben követjük a járatát, és extra költség nélkül igazítjuk a találkozás időpontját."], ["Meddig vár a sofőröm a repülőtéren?", "A leszállás utáni első 90 perc ingyenesen benne van, és az időablak automatikusan eltolódik, ha a járata késik."], ["Hogyan fizetek a transzferért?", "Készpénzben a sofőrnek az út elején – a foglalásból származó fix ár, járművenként."]]
  },
  it: {
    title: (name) => `Transfer dall'Aeroporto di Antalya a ${name} | Servizio Privato a Prezzo Fisso`,
    description: (name, price) => `Transfer privato a prezzo fisso dall'Aeroporto di Antalya a ${name} da €${price}. Meet & Greet, monitoraggio del volo e servizio porta a porta.`,
    heading: (name) => `Transfer privato dall'Aeroporto di Antalya a ${name}`,
    faq: (name, price, duration) => [[`Quanto dura il transfer dall'Aeroporto di Antalya a ${name}?`, `Il viaggio dura circa ${duration} con traffico normale.`], [`Qual è il prezzo fisso del transfer per ${name}?`, `I prezzi Mercedes Vito partono da €${price} per veicolo. Il totale confermato viene mostrato al momento della prenotazione.`], ["Cosa succede se il mio volo è in ritardo?", "Monitoriamo il tuo volo in tempo reale e adeguiamo l'orario dell'incontro senza costi aggiuntivi."], ["Quanto tempo aspetta il mio autista in aeroporto?", "I primi 90 minuti dopo l'atterraggio sono inclusi gratuitamente, e la finestra si sposta automaticamente se il tuo volo è in ritardo."], ["Come pago il transfer?", "In contanti al tuo autista all'inizio del viaggio - il prezzo fisso della tua prenotazione, per veicolo."]]
  },
  ja: {
    title: (name) => `アンタルヤ空港から${name}への送迎 | プライベート固定料金サービス`,
    description: (name, price) => `アンタルヤ空港から${name}へのプライベート固定料金送迎、€${price}から。ミート＆グリート、フライト追跡、ドアツードアサービス。`,
    heading: (name) => `アンタルヤ空港から${name}へのプライベート送迎`,
    faq: (name, price, duration) => [[`アンタルヤ空港から${name}までの送迎はどのくらいかかりますか？`, `通常の交通状況で所要時間は約${duration}です。`], [`${name}への固定送迎料金はいくらですか？`, `Mercedes Vitoの料金は1台あたり€${price}からです。確定合計金額は予約時に表示されます。`], ["フライトが遅延した場合はどうなりますか？", "私たちはお客様のフライトをリアルタイムで追跡し、追加料金なしでお迎え時間を調整します。"], ["運転手は空港でどのくらい待ちますか？", "着陸後の最初の90分は無料に含まれており、フライトが遅延した場合は自動的に時間枠が移動します。"], ["送迎料金の支払い方法は？", "旅程開始時に運転手へ現金でお支払いください。予約時の固定料金、1台あたりの金額です。"]]
  },
  ko: {
    title: (name) => `안탈리아 공항에서 ${name}까지 이동 | 프라이빗 정찰제 서비스`,
    description: (name, price) => `안탈리아 공항에서 ${name}까지 €${price}부터 시작하는 프라이빗 정찰제 이동 서비스. 미팅 서비스, 항공편 추적, 도어 투 도어 서비스를 제공합니다.`,
    heading: (name) => `안탈리아 공항에서 ${name}까지 프라이빗 이동`,
    faq: (name, price, duration) => [[`안탈리아 공항에서 ${name}까지 이동 시간은 얼마나 걸리나요?`, `일반적인 교통 상황에서 약 ${duration} 소요됩니다.`], [`${name}까지의 정찰제 이동 요금은 얼마인가요?`, `Mercedes Vito 요금은 차량당 €${price}부터 시작합니다. 확정 총액은 예약 시 표시됩니다.`], ["항공편이 지연되면 어떻게 되나요?", "실시간으로 항공편을 추적하며 추가 요금 없이 미팅 시간을 조정합니다."], ["기사님은 공항에서 얼마나 대기하나요?", "착륙 후 첫 90분은 무료로 포함되며, 항공편이 지연되면 대기 시간이 자동으로 조정됩니다."], ["이동 요금은 어떻게 결제하나요?", "이동 시작 시 기사님께 현금으로 결제합니다 - 예약 시 확정된 차량당 정찰제 요금입니다."]]
  },
  pt: {
    title: (name) => `Transfer do Aeroporto de Antalya para ${name} | Serviço Privado a Preço Fixo`,
    description: (name, price) => `Transfer privado a preço fixo do Aeroporto de Antalya para ${name} desde €${price}. Serviço de receção personalizada, monitorização de voos e serviço porta a porta.`,
    heading: (name) => `Transfer privado do Aeroporto de Antalya para ${name}`,
    faq: (name, price, duration) => [[`Quanto tempo demora o transfer do Aeroporto de Antalya para ${name}?`, `A viagem demora aproximadamente ${duration} em trânsito normal.`], [`Qual é o preço fixo do transfer para ${name}?`, `Os preços do Mercedes Vito começam em €${price} por veículo. O total confirmado é apresentado na reserva.`], ["O que acontece se o meu voo tiver atraso?", "Monitorizamos o seu voo em tempo real e ajustamos a hora do encontro sem custos adicionais."], ["Quanto tempo espera o meu motorista no aeroporto?", "Os primeiros 90 minutos após a aterragem estão incluídos gratuitamente, e o período ajusta-se automaticamente se o seu voo tiver atraso."], ["Como pago o transfer?", "Em dinheiro ao seu motorista no início da viagem - o preço fixo da sua reserva, por veículo."]]
  },
  ro: {
    title: (name) => `Transfer de la Aeroportul Antalya la ${name} | Serviciu Privat cu Preț Fix`,
    description: (name, price) => `Transfer privat cu preț fix de la Aeroportul Antalya la ${name} de la €${price}. Întâmpinare personală, urmărirea zborului și serviciu din ușă în ușă.`,
    heading: (name) => `Transfer privat de la Aeroportul Antalya la ${name}`,
    faq: (name, price, duration) => [[`Cât durează transferul de la Aeroportul Antalya la ${name}?`, `Călătoria durează aproximativ ${duration} în condiții normale de trafic.`], [`Care este prețul fix al transferului către ${name}?`, `Prețurile Mercedes Vito încep de la €${price} per vehicul. Totalul confirmat este afișat la momentul rezervării.`], ["Ce se întâmplă dacă zborul meu întârzie?", "Vă urmărim zborul în timp real și ajustăm ora întâlnirii fără costuri suplimentare."], ["Cât timp așteaptă șoferul la aeroport?", "Primele 90 de minute după aterizare sunt incluse gratuit, iar intervalul se ajustează automat dacă zborul dumneavoastră întârzie."], ["Cum plătesc transferul?", "În numerar șoferului la începutul călătoriei - prețul fix din rezervarea dumneavoastră, per vehicul."]]
  },
  en: {
    title: (name) => `Antalya Airport to ${name} Transfer | Private Fixed-Price Service`,
    description: (name, price) => `Private fixed-price transfer from Antalya Airport to ${name} from €${price}. Meet and greet, flight tracking and door-to-door service.`,
    heading: (name) => `Private transfer from Antalya Airport to ${name}`,
    faq: (name, price, duration) => [[`How long is the transfer from Antalya Airport to ${name}?`, `The journey takes approximately ${duration} in normal traffic.`], [`What is the fixed transfer price to ${name}?`, `Mercedes Vito prices start from €${price} per vehicle. The confirmed total is shown when booking.`], ["What happens if my flight is delayed?", "We track your flight in real time and adjust the meeting time at no extra charge."], ["How long does my chauffeur wait at the airport?", "The first 90 minutes after landing are included free of charge, and the window moves automatically if your flight is delayed."], ["How do I pay for the transfer?", "In cash to your chauffeur at the start of the journey - the fixed price from your booking, per vehicle."]]
  },
  de: {
    title: (name) => `Flughafen Antalya nach ${name} Transfer | Privater Festpreis-Transfer`,
    description: (name, price) => `Privater Festpreis-Transfer vom Flughafen Antalya nach ${name} ab €${price}. Meet & Greet, Flugverfolgung und Tür-zu-Tür-Service.`,
    heading: (name) => `Privater Transfer vom Flughafen Antalya nach ${name}`,
    faq: (name, price, duration) => [[`Wie lange dauert der Transfer vom Flughafen Antalya nach ${name}?`, `Die Fahrt dauert bei normalem Verkehr ungefähr ${duration}.`], [`Was kostet der Festpreis-Transfer nach ${name}?`, `Die Preise für einen Mercedes Vito beginnen bei €${price} pro Fahrzeug.`], ["Was passiert bei einer Flugverspätung?", "Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit ohne Aufpreis an."], ["Wie lange wartet mein Chauffeur am Flughafen?", "Die ersten 90 Minuten nach der Landung sind kostenfrei enthalten, und bei Flugverspätungen verschiebt sich dieses Zeitfenster automatisch."], ["Wie bezahle ich den Transfer?", "Bar an Ihren Chauffeur zu Beginn der Fahrt - zum Festpreis aus Ihrer Buchung, pro Fahrzeug."]]
  },
  tr: {
    title: (name) => `Antalya Havalimanı ${name} Transferi | Özel Sabit Fiyat`,
    description: (name, price) => `Antalya Havalimanı'ndan ${name} bölgesine €${price}'dan başlayan özel sabit fiyatlı transfer. Uçuş takibi, karşılama ve kapıdan kapıya hizmet.`,
    heading: (name) => `Antalya Havalimanı'ndan ${name} bölgesine özel transfer`,
    faq: (name, price, duration) => [[`Antalya Havalimanı ile ${name} arası transfer ne kadar sürer?`, `Normal trafik koşullarında yolculuk yaklaşık ${duration} sürer.`], [`${name} transferinin sabit fiyatı nedir?`, `Mercedes Vito fiyatları araç başına €${price}'dan başlar.`], ["Uçuşum gecikirse ne olur?", "Uçuşunuzu gerçek zamanlı takip eder, karşılama saatini ücretsiz olarak güncelleriz."], ["Şoförüm havalimanında ne kadar bekler?", "İnişten sonraki ilk 90 dakika ücretsiz olarak fiyata dahildir; uçuş gecikmelerinde bu süre otomatik olarak kayar."], ["Transfer ödemesini nasıl yapıyorum?", "Yolculuğun başında şoförünüze nakit olarak - rezervasyonda gördüğünüz sabit fiyat, araç başına."]]
  },
  ru: {
    title: (name) => `Трансфер из аэропорта Антальи в ${name} | Фиксированная цена`,
    description: (name, price) => `Частный трансфер из аэропорта Антальи в ${name} от €${price} за автомобиль. Встреча, отслеживание рейса и доставка до отеля.`,
    heading: (name) => `Частный трансфер из аэропорта Антальи в ${name}`,
    faq: (name, price, duration) => [[`Сколько длится трансфер из аэропорта Антальи в ${name}?`, `При обычном движении поездка занимает около ${duration}.`], [`Сколько стоит трансфер в ${name}?`, `Стоимость Mercedes Vito начинается от €${price} за автомобиль.`], ["Что произойдёт при задержке рейса?", "Мы отслеживаем рейс в реальном времени и бесплатно корректируем время встречи."], ["Сколько водитель ждёт в аэропорту?", "Первые 90 минут после посадки включены в стоимость, а при задержке рейса отсчёт сдвигается автоматически."], ["Как оплатить трансфер?", "Наличными водителю в начале поездки - по фиксированной цене из бронирования, за автомобиль."]]
  },
  fr: {
    title: (name) => `Transfert Aéroport Antalya vers ${name} | Prix Fixe Privé`,
    description: (name, price) => `Transfert privé à prix fixe depuis l'aéroport d'Antalya vers ${name} à partir de €${price}. Accueil, suivi de vol et service porte-à-porte.`,
    heading: (name) => `Transfert privé depuis l'aéroport d'Antalya vers ${name}`,
    faq: (name, price, duration) => [[`Combien de temps dure le transfert de l'aéroport d'Antalya vers ${name} ?`, `Le trajet dure environ ${duration} en trafic normal.`], [`Quel est le prix fixe du transfert vers ${name} ?`, `Les prix Mercedes Vito commencent à €${price} par véhicule. Le montant total confirmé est affiché lors de la réservation.`], ["Que se passe-t-il si mon vol est retardé ?", "Nous suivons votre vol en temps réel et ajustons l'heure de prise en charge sans frais supplémentaires."], ["Combien de temps mon chauffeur attend-il à l'aéroport ?", "Les 90 premières minutes après l'atterrissage sont incluses sans frais, et ce délai se décale automatiquement en cas de retard de vol."], ["Comment régler le transfert ?", "En espèces à votre chauffeur au début du trajet - au prix fixe de votre réservation, par véhicule."]]
  },
  cs: {
    title: (name) => `Transfer z letiště Antalya do ${name} | Soukromá pevná cena`,
    description: (name, price) => `Soukromý transfer s pevnou cenou z letiště Antalya do ${name} od €${price}. Uvítání, sledování letů a přeprava od dveří ke dveřím.`,
    heading: (name) => `Soukromý transfer z letiště Antalya do ${name}`,
    faq: (name, price, duration) => [[`Jak dlouho trvá transfer z letiště Antalya do ${name}?`, `Cesta trvá přibližně ${duration} při běžném provozu.`], [`Jaká je pevná cena transferu do ${name}?`, `Ceny Mercedes Vito začínají od €${price} za vozidlo. Potvrzená celková cena je zobrazena při rezervaci.`], ["Co se stane, když má můj let zpoždění?", "Sledujeme váš let v reálném čase a upravujeme čas setkání bez příplatku."], ["Jak dlouho na mě šofér na letišti čeká?", "Prvních 90 minut po přistání je zdarma v ceně a při zpoždění letu se tento interval automaticky posouvá."], ["Jak transfer zaplatím?", "V hotovosti šoférovi na začátku jízdy - pevnou cenou z vaší rezervace, za vozidlo."]]
  },
  uk: {
    title: (name) => `Трансфер з аеропорту Анталії до ${name} | Фіксована ціна`,
    description: (name, price) => `Приватний трансфер за фіксованою ціною з аеропорту Анталії до ${name} від €${price} за автомобіль. Зустріч, відстеження рейсу та доставка до готелю.`,
    heading: (name) => `Приватний трансфер з аеропорту Анталії до ${name}`,
    faq: (name, price, duration) => [[`Скільки триває трансфер з аеропорту Анталії до ${name}?`, `За звичайного руху поїздка займає близько ${duration}.`], [`Яка фіксована ціна трансферу до ${name}?`, `Ціни на Mercedes Vito починаються від €${price} за автомобіль. Підтверджена загальна сума показується під час бронювання.`], ["Що станеться, якщо мій рейс затримається?", "Ми відстежуємо ваш рейс у реальному часі та безкоштовно коригуємо час зустрічі."], ["Скільки водій чекає в аеропорту?", "Перші 90 хвилин після посадки включені у вартість, а в разі затримки рейсу відлік зміщується автоматично."], ["Як оплатити трансфер?", "Готівкою водієві на початку поїздки - за фіксованою ціною з бронювання, за автомобіль."]]
  },
  ur: {
    title: (name) => `انطالیہ ایئرپورٹ سے ${name} ٹرانسفر | نجی مقررہ قیمت`,
    description: (name, price) => `انطالیہ ایئرپورٹ سے ${name} تک مقررہ قیمت پر نجی ٹرانسفر €${price} فی گاڑی سے شروع۔ استقبال، پرواز کی نگرانی اور دروازے تک سروس۔`,
    heading: (name) => `انطالیہ ایئرپورٹ سے ${name} تک نجی ٹرانسفر`,
    faq: (name, price, duration) => [[`انطالیہ ایئرپورٹ سے ${name} تک ٹرانسفر میں کتنا وقت لگتا ہے؟`, `عام ٹریفک میں سفر تقریباً ${duration} لیتا ہے۔`], [`${name} تک ٹرانسفر کی مقررہ قیمت کیا ہے؟`, `Mercedes Vito کی قیمتیں €${price} فی گاڑی سے شروع ہوتی ہیں۔ تصدیق شدہ کل رقم بکنگ کے وقت دکھائی جاتی ہے۔`], ["اگر میری پرواز میں تاخیر ہو جائے تو کیا ہوگا؟", "ہم آپ کی پرواز کو حقیقی وقت میں ٹریک کرتے ہیں اور بغیر کسی اضافی چارج کے ملاقات کا وقت ایڈجسٹ کرتے ہیں۔"], ["میرا ڈرائیور ایئرپورٹ پر کتنی دیر انتظار کرتا ہے؟", "لینڈنگ کے بعد پہلے 90 منٹ مفت شامل ہیں، اور پرواز میں تاخیر کی صورت میں یہ دورانیہ خودکار طور پر آگے کھسک جاتا ہے۔"], ["ٹرانسفر کی ادائیگی کیسے کروں؟", "سفر کے آغاز پر ڈرائیور کو نقد - بکنگ کی مقررہ قیمت، فی گاڑی۔"]]
  },
  pl: {
    title: (name) => `Transfer z lotniska Antalya do ${name} | Prywatna stała cena`,
    description: (name, price) => `Prywatny transfer w stałej cenie z lotniska Antalya do ${name} od €${price} za pojazd. Powitanie, śledzenie lotu i dowóz pod hotel.`,
    heading: (name) => `Prywatny transfer z lotniska Antalya do ${name}`,
    faq: (name, price, duration) => [[`Jak długo trwa transfer z lotniska Antalya do ${name}?`, `Przy normalnym ruchu podróż trwa około ${duration}.`], [`Jaka jest stała cena transferu do ${name}?`, `Ceny Mercedes Vito zaczynają się od €${price} za pojazd. Potwierdzona łączna kwota jest pokazywana podczas rezerwacji.`], ["Co się stanie, jeśli mój lot będzie opóźniony?", "Śledzimy Twój lot w czasie rzeczywistym i bez dodatkowych opłat dostosowujemy godzinę odbioru."], ["Jak długo kierowca czeka na lotnisku?", "Pierwsze 90 minut po wylądowaniu jest wliczone w cenę, a przy opóźnieniu lotu okno to przesuwa się automatycznie."], ["Jak zapłacić za transfer?", "Gotówką kierowcy na początku podróży - stała cena z rezerwacji, za pojazd."]]
  },
  nl: {
    title: (name) => `Luchthaven Antalya naar ${name} Transfer | Privé Vaste Prijs`,
    description: (name, price) => `Privétransfer met vaste prijs van de luchthaven Antalya naar ${name} vanaf €${price} per voertuig. Ontvangst, vluchtvolging en deur-tot-deur service.`,
    heading: (name) => `Privétransfer van de luchthaven Antalya naar ${name}`,
    faq: (name, price, duration) => [[`Hoe lang duurt de transfer van de luchthaven Antalya naar ${name}?`, `De rit duurt ongeveer ${duration} bij normaal verkeer.`], [`Wat is de vaste transferprijs naar ${name}?`, `Mercedes Vito-prijzen beginnen bij €${price} per voertuig. Het bevestigde totaal wordt getoond bij het boeken.`], ["Wat gebeurt er als mijn vlucht vertraging heeft?", "We volgen uw vlucht in realtime en passen de ophaaltijd zonder extra kosten aan."], ["Hoe lang wacht mijn chauffeur op de luchthaven?", "De eerste 90 minuten na de landing zijn kosteloos inbegrepen en dit tijdvenster schuift automatisch mee bij vertraging."], ["Hoe betaal ik de transfer?", "Contant aan uw chauffeur bij aanvang van de rit - de vaste prijs uit uw boeking, per voertuig."]]
  },
  ar: {
    title: (name) => `نقل من مطار أنطاليا إلى ${name} | سعر ثابت خاص`,
    description: (name, price) => `نقل خاص بسعر ثابت من مطار أنطاليا إلى ${name} يبدأ من €${price} لكل مركبة. استقبال وتتبع الرحلة وخدمة من الباب إلى الباب.`,
    heading: (name) => `نقل خاص من مطار أنطاليا إلى ${name}`,
    faq: (name, price, duration) => [[`كم يستغرق النقل من مطار أنطاليا إلى ${name}؟`, `تستغرق الرحلة حوالي ${duration} في حركة المرور العادية.`], [`ما هو السعر الثابت للنقل إلى ${name}؟`, `تبدأ أسعار مرسيدس فيتو من €${price} لكل مركبة. يظهر الإجمالي المؤكد عند الحجز.`], ["ماذا يحدث إذا تأخرت رحلتي؟", "نتتبع رحلتك في الوقت الفعلي ونعدّل وقت اللقاء دون أي رسوم إضافية."], ["كم ينتظر السائق في المطار؟", "أول 90 دقيقة بعد الهبوط مشمولة مجانًا، وتتحرك هذه المدة تلقائيًا مع أي تأخير في الرحلة."], ["كيف أدفع قيمة النقل؟", "نقدًا للسائق في بداية الرحلة - بالسعر الثابت من حجزك، لكل مركبة."]]
  },
  sv: {
    title: (name) => `Antalya Flygplats till ${name} Transfer | Privat Fast Pris`,
    description: (name, price) => `Privat transfer till fast pris från Antalya flygplats till ${name} från €${price} per fordon. Möte, flygbevakning och dörr-till-dörr-service.`,
    heading: (name) => `Privat transfer från Antalya flygplats till ${name}`,
    faq: (name, price, duration) => [[`Hur lång tid tar transfern från Antalya flygplats till ${name}?`, `Resan tar cirka ${duration} vid normal trafik.`], [`Vad är det fasta transferpriset till ${name}?`, `Mercedes Vito-priser börjar från €${price} per fordon. Den bekräftade summan visas vid bokning.`], ["Vad händer om mitt flyg är försenat?", "Vi spårar ditt flyg i realtid och justerar mötestiden utan extra kostnad."], ["Hur länge väntar chauffören på flygplatsen?", "De första 90 minuterna efter landning ingår utan kostnad, och tidsfönstret förskjuts automatiskt vid flygförsening."], ["Hur betalar jag transfern?", "Kontant till chauffören när resan börjar - det fasta priset från din bokning, per fordon."]]
  }
};
const languageFromPath = (pathname) => {
  const candidate = pathname.split("/").filter(Boolean)[0];
  return indexableLanguages.includes(candidate ?? "") ? candidate : "en";
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
  const faq = homeFaqOrder.map((word) => ({ "@type": "Question", name: copy2[`faq${word}Q`], acceptedAnswer: { "@type": "Answer", text: copy2[`faq${word}A`] } }));
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
    { "@type": "Question", name: "Was kostet der Transfer?", acceptedAnswer: { "@type": "Answer", text: `Der Mercedes Vito kostet ab €${route.prices.vito} pro Fahrzeug.` } },
    { "@type": "Question", name: "Was passiert bei einer Flugverspätung?", acceptedAnswer: { "@type": "Answer", text: "Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit ohne Aufpreis an." } },
    { "@type": "Question", name: "Wie lange wartet mein Chauffeur am Flughafen?", acceptedAnswer: { "@type": "Answer", text: "Die ersten 90 Minuten nach der Landung sind kostenfrei enthalten, und bei Flugverspätungen verschiebt sich dieses Zeitfenster automatisch." } },
    { "@type": "Question", name: "Wie bezahle ich den Transfer?", acceptedAnswer: { "@type": "Answer", text: "Bar an Ihren Chauffeur zu Beginn der Fahrt - zum Festpreis aus Ihrer Buchung, pro Fahrzeug." } }
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
const faqUrlForLanguage = (language) => `${domain}${language === "en" ? "" : `/${language}`}/#faq`;
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
function whatsappConfirmation(values, bookingRef, price, language) {
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
  lines.push(`📖 Please read our FAQ before your trip: ${faqUrlForLanguage(language)}`);
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
  const selectedRoute = routeCatalog[values.destination];
  const selectedRouteName = selectedRoute?.names[language] ?? selectedRoute?.names.en;
  const pickupName = values.pickup === "airport" ? t("airportOption", "Antalya Airport (AYT)") : values.pickup === "hotel" ? t("hotelOption", "Hotel") : t("privateAddressOption", "Private address");
  const destinationName = values.destination === "airport" ? t("airportOption", "Antalya Airport (AYT)") : values.destination === "private_address" ? t("privateAddressOption", "Private address") : selectedRouteName ?? values.destination;
  const isPrivateAddressQuote = !isDailyChauffeur && values.pickup === "private_address" && values.destination === "private_address";
  const vitoFits = Number(values.guests) <= 6 && Number(values.luggage) <= 6 && Number(values.guests) + Number(values.luggage) <= 12;
  const hasPrice = !isDailyChauffeur && selectedRoute && quote.price > 0;
  const childSeatCount = Number(values.childSeats) || 0;
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
      setConfirmation({ ref: bookingRef, whatsapp: `https://wa.me/905302655790?text=${encodeURIComponent([`Booking reference: ${bookingRef}`, `📖 Please read our FAQ before your trip: ${faqUrlForLanguage(language)}`].join("\n"))}`, message: t("weWillContact", "Your payment was successful. We will contact you shortly.") });
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
      const { createBooking } = await import("./assets/api-DAp_vr_u.js");
      const booking = await createBooking(buildPublicBookingPayload(formValues, language, acceptedFuelTerms));
      const confirmedPrice = Number(booking.price_eur) || currentQuote.price;
      const message = formValues.tripType === "daily_chauffeur" ? t("dailyCashConfirmation", "Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.") : formValues.destination === "airport" ? t("airportReturnPrice", "The price will be confirmed after we check the pick-up address.") : formValues.destination === "private_address" ? t("customDestinationPrice", "The price will be confirmed after we check the drop-off address.") : t("cashConfirmation", "Your booking is confirmed. You pay the fixed total to your driver in cash at the start of the journey.");
      setConfirmation({ ref: booking.booking_ref, whatsapp: whatsappConfirmation(formValues, booking.booking_ref, confirmedPrice, language), message });
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
  const advanceToStep2 = () => {
    if (!isDailyChauffeur && !values.destination) {
      setError("destination", { message: t("destinationRequired", "Please select a destination.") });
      return;
    }
    window.gtag?.("event", "price_shown", { route: values.destination, price: quote.price, vehicle: values.vehicle });
    setStep(2);
    window.setTimeout(() => document.querySelector("#travel-date")?.focus(), 100);
  };
  const advanceToStep3 = async () => {
    const step2Fields = ["travelDate", "luggage", "childSeats", "childAges"];
    if (values.tripType === "round_trip") step2Fields.push("returnDate", "returnPickupTime");
    if (values.pickup === "private_address") step2Fields.push("pickupAddress");
    if (values.destination === "private_address") step2Fields.push("dropoffAddress");
    if (!isDailyChauffeur) step2Fields.push("hotelName", "flightNumber");
    const valid = await trigger(step2Fields);
    if (!valid) return;
    window.gtag?.("event", "booking_started", { route: values.destination, price: quote.price });
    setStep(3);
    window.setTimeout(() => document.querySelector("#customer-name")?.focus(), 100);
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
            pickupName,
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
                /* @__PURE__ */ jsx("select", { id: "guests", ...register("guests"), children: Array.from({ length: 12 }, (_, index) => /* @__PURE__ */ jsx("option", { value: index + 1, children: index + 1 }, index + 1)) })
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
            /* @__PURE__ */ jsxs("label", { className: fieldClass(errors.hotelName), children: [
              /* @__PURE__ */ jsx("span", { children: t("hotelNameLabel", "Hotel name") }),
              /* @__PURE__ */ jsxs("div", { className: "field-control", children: [
                /* @__PURE__ */ jsx(Icon, { name: "pin", className: "icon" }),
                /* @__PURE__ */ jsx("input", { id: "hotel-name", maxLength: 120, placeholder: t("hotelNamePlaceholder", "Hotel or accommodation name"), ...register("hotelName") })
              ] }),
              /* @__PURE__ */ jsx(FieldErrorMessage, { error: errors.hotelName })
            ] }),
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
                /* @__PURE__ */ jsx("span", { children: t("cashPaymentDescription", "No online prepayment. You pay the fixed total to your driver in cash at the start of the journey.") })
              ] }),
              /* @__PURE__ */ jsx(Icon, { name: "cash", className: "icon" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "booking-footer booking-footer-step", children: [
            !isDailyChauffeur && /* @__PURE__ */ jsxs("button", { className: "booking-back-btn", type: "button", onClick: () => setStep(2), children: [
              /* @__PURE__ */ jsx(Icon, { name: "arrow-right", className: "icon icon-flip" }),
              /* @__PURE__ */ jsx("span", { children: t("back", "Back") })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "booking-includes", children: isDailyChauffeur ? t("dailyQuoteIncludes", "Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.") : t("quoteIncludes", "Includes meet & greet, flight tracking, parking, 90 minutes of waiting and bottled water.") }),
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
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "confirmed-faq", children: [
            t("faqReminder", "Before your trip, please review the FAQ section on our website."),
            " ",
            /* @__PURE__ */ jsx("a", { href: faqUrlForLanguage(language), target: "_blank", rel: "noreferrer", children: t("viewFaq", "View FAQ") })
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
        /* @__PURE__ */ jsxs("picture", { children: [
          /* @__PURE__ */ jsx("source", { srcSet: "/assets/optimized/logo.webp", type: "image/webp" }),
          /* @__PURE__ */ jsx("img", { src: "/assets/optimized/logo.png", alt: "Antalya VIP Tourism", className: "brand-logo", width: "160", height: "120" })
        ] }),
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
const ReactPlayer = lazy(() => import("react-player"));
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
    "Your chauffeur welcomes you in arrivals and assists with luggage.",
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
    "L.E",
    "LE",
    "5 days ago",
    "It was a perfect experience — I recommend them :)",
    "🇫🇷 France"
  ],
  [
    "M.Ö",
    "MÖ",
    "2 months ago",
    "I found them online and booked after reading the reviews — so glad I did. The car was air-conditioned and spotless, and the driver was very friendly. They never left us struggling in the Antalya heat. Thank you.",
    "🇹🇷 Turkey"
  ],
  [
    "R.M",
    "RM",
    "1 week ago",
    "Thank you for your service. The driver was very patient — it was perfect 👌🙏❤️",
    "🇩🇿 Algeria"
  ],
  [
    "A.K",
    "AK",
    "2 months ago",
    "I had no issues at all during my transfer. The vehicles were new and clean, and they give the utmost importance to driving safety. Thank you.",
    "🇹🇷 Turkey"
  ],
  [
    "P.V",
    "PV",
    "1 week ago",
    "Perfect service.",
    "🇧🇪 Belgium"
  ],
  [
    "A.KA",
    "AK",
    "2 months ago",
    "We had a wonderful trip — cold refreshments on board, great comfort, and a smooth drive. It truly deserves 5 stars 😊",
    "🇹🇷 Turkey"
  ],
  [
    "M.A",
    "MA",
    "3 weeks ago",
    "I highly recommend them.",
    "🇸🇦 Saudi Arabia"
  ],
  [
    "E.D",
    "ED",
    "2 months ago",
    "It was a journey with excellent service. We were picked up right on time and the vehicle was very comfortable. Our driver was a true professional and got us there safely. We'll choose you again on our next trip. Thank you.",
    "🇹🇷 Turkey"
  ],
  [
    "A.I",
    "AI",
    "2 months ago",
    "We received support for our transfer in Antalya and were extremely satisfied. Many thanks to Antalya VIP Tourism for helping us with a super-luxurious vehicle and such a kind, friendly manner. Coming from Germany, getting service like this made us very happy. I highly recommend them to anyone who needs an airport–hotel transfer.",
    "🇩🇪 Germany"
  ],
  [
    "R.Ö",
    "RÖ",
    "2 months ago",
    "A genuinely attentive company — I recommend them to everyone. The staff were very helpful from the very first moment. Thanks for everything.",
    "🇳🇱 Netherlands"
  ],
  [
    "E.Y",
    "EY",
    "2 months ago",
    "It was flawless. Thank you!",
    "🇸🇦 Saudi Arabia"
  ],
  [
    "D.E",
    "DE",
    "2 months ago",
    "A reliable, friendly team. You can choose them with complete peace of mind.",
    "🇩🇪 Germany"
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
    guests: 12,
    bags: 12
  } : {
    name: "Mercedes Vito",
    shortName: "Vito",
    classKey: "fleetVitoClass",
    classFallback: "VIP · Grand Touring",
    descriptionKey: "fleetVitoDescription",
    descriptionFallback: "A refined private cabin for families and small groups travelling in comfort.",
    guests: 6,
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
  const faqItems = homeFaqGroups.flatMap((group) => group.items).map(({ key, slug }) => [
    t(`faq${key}Q`, "Frequently asked question"),
    t(`faq${key}A`, "Contact us for complete details."),
    faqAnchor(slug)
  ]);
  useEffect(() => {
    const openFromHash = () => {
      const hash = resolveFaqAnchor(window.location.hash.replace(/^#/, ""));
      if (!hash) return;
      const index = faqItems.findIndex(([, , id]) => id === hash);
      if (index >= 0) setOpenFaq(index);
      const target = document.getElementById(hash);
      if (target) {
        requestAnimationFrame(
          () => target.scrollIntoView({ behavior: "smooth", block: "start" })
        );
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
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
                "Personal meet & greet on arrival"
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
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { children: "5.0" }),
              /* @__PURE__ */ jsx("span", { className: "stars", children: "★★★★★" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "review-marquee", children: /* @__PURE__ */ jsx("div", { className: "review-track", children: [...reviews, ...reviews].map(
          ([name, initials, time, review, country], index) => /* @__PURE__ */ jsxs(
            "a",
            {
              className: "review-card",
              href: "https://www.google.com/maps/place/Antalya+Vip+Tourism/@36.7321721,30.4262099,17z",
              target: "_blank",
              rel: "noopener",
              "aria-hidden": index >= reviews.length,
              tabIndex: index >= reviews.length ? -1 : void 0,
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
                  /* @__PURE__ */ jsxs("div", { className: "review-meta", children: [
                    /* @__PURE__ */ jsx("time", { children: time }),
                    /* @__PURE__ */ jsx("span", { className: "review-country", children: country.split(" ")[0] })
                  ] })
                ] })
              ]
            },
            `${name}-${index}`
          )
        ) }) }),
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
            "Our chauffeurs wait at the Meet & Greet Area — meeting point J / 777. Exit baggage claim, head to point J / 777, and we handle the rest."
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
                  /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(
                    ReactPlayer,
                    {
                      src: `https://www.youtube.com/shorts/${VIDEO_ID}`,
                      playing: true,
                      controls: true,
                      width: "100%",
                      height: "100%"
                    }
                  ) })
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
        /* @__PURE__ */ jsx("div", { className: "accordion", children: (() => {
          let flatIndex = -1;
          return homeFaqGroups.map((group) => /* @__PURE__ */ jsxs("div", { className: "faq-group", children: [
            /* @__PURE__ */ jsx("h3", { className: "faq-category", children: t(group.labelKey, group.labelFallback) }),
            group.items.map(() => {
              flatIndex += 1;
              const index = flatIndex;
              const [question, answer, id] = faqItems[index];
              return /* @__PURE__ */ jsxs(
                "article",
                {
                  id,
                  className: `faq-item${openFaq === index ? " open" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        type: "button",
                        "aria-expanded": openFaq === index,
                        onClick: () => {
                          const next = openFaq === index ? -1 : index;
                          setOpenFaq(next);
                          if (next === index && typeof history !== "undefined") {
                            history.replaceState(null, "", `#${id}`);
                          }
                        },
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
              );
            })
          ] }, group.labelKey));
        })() })
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
          /* @__PURE__ */ jsxs("picture", { children: [
            /* @__PURE__ */ jsx("source", { srcSet: "/assets/optimized/logo.webp", type: "image/webp" }),
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
            )
          ] }),
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
const route23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
            /* @__PURE__ */ jsxs("picture", { children: [
              /* @__PURE__ */ jsx("source", { srcSet: "/assets/optimized/logo.webp", type: "image/webp" }),
              /* @__PURE__ */ jsx("img", { src: "/assets/optimized/logo.png", alt: "Antalya VIP Tourism", className: "brand-logo", width: "160", height: "120", loading: "lazy" })
            ] }),
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
const route46 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const route47 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  zh: {
    home: "首页",
    routes: "接送路线",
    priceHeading: "固定接送价格",
    included: "价格包含",
    duration: "预计时间",
    distance: "距离",
    from: "价格起于",
    book: "预订您的接送",
    faq: "常见问题",
    other: "其他安塔利亚机场接送",
    campaign: "所有接送路线均提供在线特惠价格。",
    contact: "预订及咨询请通过WhatsApp联系我们。",
    privacy: "隐私政策",
    imprint: "版本说明",
    privacyUrl: "/privacy/",
    imprintUrl: "/impressum.html",
    vito: "Mercedes Vito · 最多6位乘客",
    sprinter: "Mercedes Sprinter · 最多12位乘客",
    intro: (name, duration, distance) => `从安塔利亚机场到${name}的${distance}行程，在正常交通情况下约需${duration}。您的司机将在到达大厅迎接您，并直接送您前往住宿地。`,
    items: ["专人接机问候", "实时航班追踪", "机场停车与等候", "行李协助及瓶装水", "可应要求免费提供儿童座椅"],
    faqItems: (name, price, duration) => [[`从安塔利亚机场到${name}的接送需要多长时间？`, `在正常交通情况下，行程约需${duration}。`], [`到${name}的固定接送价格是多少？`, `Mercedes Vito价格每车€${price}起。确认的总价将在预订时显示。`], ["如果我的航班延误怎么办？", "我们会实时追踪您的航班，并免费调整接机时间。"], ["我的司机会在机场等候多久？", "落地后的前90分钟免费包含在内，如果您的航班延误，等候时间会自动顺延。"], ["我该如何支付接送费用？", "在行程开始时以现金支付给您的司机——即您预订时的固定价格，按每车计算。"]]
  },
  da: { home: "Hjem", routes: "Transferruter", priceHeading: "Faste transferpriser", included: "Inkluderet i prisen", duration: "Anslået tid", distance: "Afstand", from: "Pris fra", book: "Bestil din transfer", faq: "Ofte stillede spørgsmål", other: "Andre transfers fra Antalya Lufthavn", campaign: "Særlige online-priser er tilgængelige for alle transferruter.", contact: "Kontakt os på WhatsApp for bestillinger og spørgsmål.", privacy: "Privatliv", imprint: "Impressum", privacyUrl: "/privacy/", imprintUrl: "/impressum.html", vito: "Mercedes Vito · op til 6 passagerer", sprinter: "Mercedes Sprinter · op til 12 passagerer", intro: (name, duration, distance) => `Rejsen på ${distance} fra Antalya Lufthavn til ${name} tager cirka ${duration} i normal trafik. Din chauffør møder dig i ankomsthallen og kører direkte til din overnatning.`, items: ["Personlig Meet & Greet", "Flysporing i realtid", "Parkering og ventetid i lufthavnen", "Bagagehjælp og vand på flaske", "Gratis barnesæde efter ønske"], faqItems: (name, price, duration) => [[`Hvor lang er transferen fra Antalya Lufthavn til ${name}?`, `Rejsen tager cirka ${duration} i normal trafik.`], [`Hvad er den faste transferpris til ${name}?`, `Priser for Mercedes Vito starter fra €${price} pr. køretøj. Den bekræftede totalpris vises ved bestilling.`], ["Hvad sker der, hvis mit fly er forsinket?", "Vi sporer dit fly i realtid og justerer mødetidspunktet uden ekstra beregning."], ["Hvor længe venter min chauffør i lufthavnen?", "De første 90 minutter efter landing er inkluderet uden beregning, og tidsvinduet flyttes automatisk, hvis dit fly er forsinket."], ["Hvordan betaler jeg for transferen?", "Kontant til din chauffør ved rejsens start - den faste pris fra din bestilling, pr. køretøj."]] },
  es: { home: "Inicio", routes: "Rutas de traslado", priceHeading: "Precios fijos de traslado", included: "Incluido en el precio", duration: "Tiempo estimado", distance: "Distancia", from: "Precio desde", book: "Reserve su traslado", faq: "Preguntas frecuentes", other: "Otros traslados del Aeropuerto de Antalya", campaign: "Hay precios especiales online disponibles para todas las rutas de traslado.", contact: "Contáctenos por WhatsApp para reservas y consultas.", privacy: "Privacidad", imprint: "Aviso legal", privacyUrl: "/privacy/", imprintUrl: "/impressum.html", vito: "Mercedes Vito · hasta 6 pasajeros", sprinter: "Mercedes Sprinter · hasta 12 pasajeros", intro: (name, duration, distance) => `El trayecto de ${distance} desde el Aeropuerto de Antalya a ${name} dura aproximadamente ${duration} con tráfico normal. Su chófer le recibe en llegadas y le lleva directamente a su alojamiento.`, items: ["Recepción personal", "Seguimiento de vuelos en tiempo real", "Aparcamiento y espera en el aeropuerto", "Asistencia con el equipaje y agua embotellada", "Silla infantil gratuita bajo petición"], faqItems: (name, price, duration) => [[`¿Cuánto dura el traslado del Aeropuerto de Antalya a ${name}?`, `El trayecto dura aproximadamente ${duration} con tráfico normal.`], [`¿Cuál es el precio fijo del traslado a ${name}?`, `Los precios del Mercedes Vito comienzan desde €${price} por vehículo. El total confirmado se muestra al reservar.`], ["¿Qué ocurre si mi vuelo se retrasa?", "Seguimos su vuelo en tiempo real y ajustamos la hora de encuentro sin coste adicional."], ["¿Cuánto tiempo espera mi chófer en el aeropuerto?", "Los primeros 90 minutos tras el aterrizaje están incluidos de forma gratuita, y el margen se ajusta automáticamente si su vuelo se retrasa."], ["¿Cómo pago el traslado?", "En efectivo a su chófer al inicio del trayecto: el precio fijo de su reserva, por vehículo."]] },
  el: {
    home: "Αρχική",
    routes: "Διαδρομές μεταφοράς",
    priceHeading: "Σταθερές τιμές μεταφοράς",
    included: "Περιλαμβάνεται στην τιμή",
    duration: "Εκτιμώμενος χρόνος",
    distance: "Απόσταση",
    from: "Τιμή από",
    book: "Κλείστε τη μεταφορά σας",
    faq: "Συχνές ερωτήσεις",
    other: "Άλλες μεταφορές από το Αεροδρόμιο Αντάλια",
    campaign: "Ειδικές διαδικτυακές τιμές είναι διαθέσιμες για όλες τις διαδρομές μεταφοράς.",
    contact: "Επικοινωνήστε μαζί μας στο WhatsApp για κρατήσεις και ερωτήσεις.",
    privacy: "Απόρρητο",
    imprint: "Νομικές πληροφορίες",
    privacyUrl: "/privacy/",
    imprintUrl: "/impressum.html",
    vito: "Mercedes Vito · έως 6 επιβάτες",
    sprinter: "Mercedes Sprinter · έως 12 επιβάτες",
    intro: (name, duration, distance) => `Το ταξίδι των ${distance} από το Αεροδρόμιο Αντάλια προς ${name} διαρκεί περίπου ${duration} υπό κανονικές συνθήκες κυκλοφορίας. Ο οδηγός σας σας υποδέχεται στις αφίξεις και σας μεταφέρει απευθείας στο κατάλυμά σας.`,
    items: ["Προσωπική υποδοχή Meet & Greet", "Παρακολούθηση πτήσης σε πραγματικό χρόνο", "Στάθμευση και αναμονή στο αεροδρόμιο", "Βοήθεια με τις αποσκευές και εμφιαλωμένο νερό", "Δωρεάν παιδικό κάθισμα κατόπιν αιτήματος"],
    faqItems: (name, price, duration) => [[`Πόσο διαρκεί η μεταφορά από το Αεροδρόμιο Αντάλια προς ${name};`, `Το ταξίδι διαρκεί περίπου ${duration} υπό κανονικές συνθήκες κυκλοφορίας.`], [`Ποια είναι η σταθερή τιμή μεταφοράς προς ${name};`, `Οι τιμές για Mercedes Vito ξεκινούν από €${price} ανά όχημα. Το επιβεβαιωμένο σύνολο εμφανίζεται κατά την κράτηση.`], ["Τι συμβαίνει αν η πτήση μου καθυστερήσει;", "Παρακολουθούμε την πτήση σας σε πραγματικό χρόνο και προσαρμόζουμε την ώρα συνάντησης χωρίς επιπλέον χρέωση."], ["Πόση ώρα περιμένει ο οδηγός μου στο αεροδρόμιο;", "Τα πρώτα 90 λεπτά μετά την προσγείωση περιλαμβάνονται δωρεάν, και το χρονικό περιθώριο μετατοπίζεται αυτόματα αν η πτήση σας καθυστερήσει."], ["Πώς πληρώνω για τη μεταφορά;", "Σε μετρητά στον οδηγό σας στην αρχή του ταξιδιού - τη σταθερή τιμή από την κράτησή σας, ανά όχημα."]]
  },
  he: {
    home: "דף הבית",
    routes: "מסלולי העברה",
    priceHeading: "מחירי העברה קבועים",
    included: "כלול במחיר",
    duration: "זמן משוער",
    distance: "מרחק",
    from: "מחיר החל מ-",
    book: "הזמינו את ההעברה שלכם",
    faq: "שאלות נפוצות",
    other: "העברות נוספות משדה התעופה אנטליה",
    campaign: "מחירים מיוחדים באינטרנט זמינים לכל מסלולי ההעברה.",
    contact: "צרו איתנו קשר ב-WhatsApp להזמנות ולשאלות.",
    privacy: "פרטיות",
    imprint: "פרטי חברה",
    privacyUrl: "/privacy/",
    imprintUrl: "/impressum.html",
    vito: "Mercedes Vito · עד 6 נוסעים",
    sprinter: "Mercedes Sprinter · עד 12 נוסעים",
    intro: (name, duration, distance) => `הנסיעה במרחק ${distance} משדה התעופה אנטליה אל ${name} אורכת כ-${duration} בתנועה רגילה. הנהג שלכם מקבל את פניכם באולם הנוסעים ונוסע ישירות אל מקום הלינה שלכם.`,
    items: ["קבלת פנים אישית", "מעקב טיסות בזמן אמת", "חניה והמתנה בשדה התעופה", "סיוע במטען ובקבוקי מים", "כיסא בטיחות לילד ללא תשלום לפי בקשה"],
    faqItems: (name, price, duration) => [[`כמה זמן אורכת ההעברה משדה התעופה אנטליה אל ${name}?`, `הנסיעה אורכת כ-${duration} בתנועה רגילה.`], [`מהו המחיר הקבוע של ההעברה אל ${name}?`, `מחירי Mercedes Vito מתחילים מ-€${price} לרכב. הסכום הכולל המאושר מוצג בעת ההזמנה.`], ["מה קורה אם הטיסה שלי מתעכבת?", "אנו עוקבים אחר הטיסה שלכם בזמן אמת ומתאימים את שעת המפגש ללא תוספת תשלום."], ["כמה זמן ממתין הנהג שלי בשדה התעופה?", "90 הדקות הראשונות לאחר הנחיתה כלולות ללא תשלום, וחלון ההמתנה זז אוטומטית אם הטיסה מתעכבת."], ["כיצד אני משלם עבור ההעברה?", "במזומן לנהג בתחילת הנסיעה - המחיר הקבוע מתוך ההזמנה שלכם, לכל רכב."]]
  },
  hu: {
    home: "Főoldal",
    routes: "Transzfer útvonalak",
    priceHeading: "Fix transzfer árak",
    included: "Az árban benne van",
    duration: "Becsült idő",
    distance: "Távolság",
    from: "Ár ettől",
    book: "Foglalja le transzferét",
    faq: "Gyakran ismételt kérdések",
    other: "További antalyai reptéri transzferek",
    campaign: "Minden transzfer útvonalra online kedvezményes árazás érhető el.",
    contact: "Foglalásokkal és kérdésekkel kapcsolatban vegye fel velünk a kapcsolatot WhatsApp-on.",
    privacy: "Adatvédelem",
    imprint: "Impresszum",
    privacyUrl: "/privacy/",
    imprintUrl: "/impressum.html",
    vito: "Mercedes Vito · legfeljebb 6 utas",
    sprinter: "Mercedes Sprinter · legfeljebb 12 utas",
    intro: (name, duration, distance) => `Az antalyai repülőtérről ${name} felé vezető ${distance} út normál forgalomban körülbelül ${duration} tart. Sofőrje a megérkezési csarnokban fogadja Önt, és közvetlenül a szállásához viszi.`,
    items: ["Személyes Meet & Greet fogadás", "Valós idejű járatkövetés", "Reptéri parkolás és várakozás", "Csomagsegítség és palackozott víz", "Ingyenes gyermekülés kérésre"],
    faqItems: (name, price, duration) => [[`Mennyi ideig tart a transzfer az antalyai repülőtérről ${name} felé?`, `Az út normál forgalomban körülbelül ${duration} tart.`], [`Mennyi a fix transzfer ára ${name} felé?`, `A Mercedes Vito árai járművenként €${price}-tól kezdődnek. A megerősített végösszeg a foglaláskor jelenik meg.`], ["Mi történik, ha a járatom késik?", "Valós időben követjük a járatát, és extra költség nélkül igazítjuk a találkozás időpontját."], ["Meddig vár a sofőröm a repülőtéren?", "A leszállás utáni első 90 perc ingyenesen benne van, és az időablak automatikusan eltolódik, ha a járata késik."], ["Hogyan fizetek a transzferért?", "Készpénzben a sofőrnek az út elején – a foglalásból származó fix ár, járművenként."]]
  },
  it: {
    home: "Home",
    routes: "Percorsi di transfer",
    priceHeading: "Prezzi fissi dei transfer",
    included: "Incluso nel prezzo",
    duration: "Tempo stimato",
    distance: "Distanza",
    from: "Prezzo da",
    book: "Prenota il tuo transfer",
    faq: "Domande frequenti",
    other: "Altri transfer dall'Aeroporto di Antalya",
    campaign: "Prezzi speciali online disponibili per tutti i percorsi di transfer.",
    contact: "Contattaci su WhatsApp per prenotazioni e domande.",
    privacy: "Privacy",
    imprint: "Note legali",
    privacyUrl: "/privacy/",
    imprintUrl: "/impressum.html",
    vito: "Mercedes Vito · fino a 6 passeggeri",
    sprinter: "Mercedes Sprinter · fino a 12 passeggeri",
    intro: (name, duration, distance) => `Il viaggio di ${distance} dall'Aeroporto di Antalya a ${name} dura circa ${duration} con traffico normale. Il tuo autista ti accoglie agli arrivi e ti porta direttamente al tuo alloggio.`,
    items: ["Accoglienza personale Meet & Greet", "Monitoraggio del volo in tempo reale", "Parcheggio e attesa in aeroporto", "Assistenza bagagli e acqua in bottiglia", "Seggiolino per bambini gratuito su richiesta"],
    faqItems: (name, price, duration) => [[`Quanto dura il transfer dall'Aeroporto di Antalya a ${name}?`, `Il viaggio dura circa ${duration} con traffico normale.`], [`Qual è il prezzo fisso del transfer per ${name}?`, `I prezzi Mercedes Vito partono da €${price} per veicolo. Il totale confermato viene mostrato al momento della prenotazione.`], ["Cosa succede se il mio volo è in ritardo?", "Monitoriamo il tuo volo in tempo reale e adeguiamo l'orario dell'incontro senza costi aggiuntivi."], ["Quanto tempo aspetta il mio autista in aeroporto?", "I primi 90 minuti dopo l'atterraggio sono inclusi gratuitamente, e la finestra si sposta automaticamente se il tuo volo è in ritardo."], ["Come pago il transfer?", "In contanti al tuo autista all'inizio del viaggio - il prezzo fisso della tua prenotazione, per veicolo."]]
  },
  ja: { home: "ホーム", routes: "送迎ルート", priceHeading: "固定送迎料金", included: "料金に含まれるもの", duration: "所要時間の目安", distance: "距離", from: "料金", book: "送迎を予約する", faq: "よくある質問", other: "その他のアンタルヤ空港送迎", campaign: "すべての送迎ルートでオンライン特別料金をご利用いただけます。", contact: "ご予約やご質問はWhatsAppでお問い合わせください。", privacy: "プライバシー", imprint: "会社概要", privacyUrl: "/privacy/", imprintUrl: "/impressum.html", vito: "Mercedes Vito · 最大6名", sprinter: "Mercedes Sprinter · 最大12名", intro: (name, duration, distance) => `アンタルヤ空港から${name}までの${distance}の道のりは、通常の交通状況で約${duration}かかります。運転手が到着ロビーでお迎えし、宿泊先まで直接お送りします。`, items: ["個別のミート＆グリート", "リアルタイムのフライト追跡", "空港での駐車と待機", "手荷物のお手伝いとミネラルウォーター", "ご要望に応じた無料チャイルドシート"], faqItems: (name, price, duration) => [[`アンタルヤ空港から${name}までの送迎はどのくらいかかりますか？`, `通常の交通状況で所要時間は約${duration}です。`], [`${name}への固定送迎料金はいくらですか？`, `Mercedes Vitoの料金は1台あたり€${price}からです。確定合計金額は予約時に表示されます。`], ["フライトが遅延した場合はどうなりますか？", "私たちはお客様のフライトをリアルタイムで追跡し、追加料金なしでお迎え時間を調整します。"], ["運転手は空港でどのくらい待ちますか？", "着陸後の最初の90分は無料に含まれており、フライトが遅延した場合は自動的に時間枠が移動します。"], ["送迎料金の支払い方法は？", "旅程開始時に運転手へ現金でお支払いください。予約時の固定料金、1台あたりの金額です。"]] },
  ko: {
    home: "홈",
    routes: "이동 노선",
    priceHeading: "정찰제 이동 요금",
    included: "요금에 포함된 사항",
    duration: "예상 소요 시간",
    distance: "거리",
    from: "요금 시작가",
    book: "이동 예약하기",
    faq: "자주 묻는 질문",
    other: "기타 안탈리아 공항 이동 서비스",
    campaign: "모든 이동 노선에 온라인 특별 요금이 제공됩니다.",
    contact: "예약 및 문의는 WhatsApp으로 연락 주세요.",
    privacy: "개인정보 보호정책",
    imprint: "임프린트",
    privacyUrl: "/privacy/",
    imprintUrl: "/impressum.html",
    vito: "Mercedes Vito · 최대 6명 탑승",
    sprinter: "Mercedes Sprinter · 최대 12명 탑승",
    intro: (name, duration, distance) => `안탈리아 공항에서 ${name}까지 ${distance} 거리는 일반적인 교통 상황에서 약 ${duration} 소요됩니다. 기사님이 도착장에서 여러분을 맞이하고 숙소까지 곧바로 모셔다 드립니다.`,
    items: ["개인 미팅 서비스", "실시간 항공편 추적", "공항 주차 및 대기", "수하물 지원 및 생수 제공", "요청 시 무료 유아용 카시트"],
    faqItems: (name, price, duration) => [[`안탈리아 공항에서 ${name}까지 이동 시간은 얼마나 걸리나요?`, `일반적인 교통 상황에서 약 ${duration} 소요됩니다.`], [`${name}까지의 정찰제 이동 요금은 얼마인가요?`, `Mercedes Vito 요금은 차량당 €${price}부터 시작합니다. 확정 총액은 예약 시 표시됩니다.`], ["항공편이 지연되면 어떻게 되나요?", "실시간으로 항공편을 추적하며 추가 요금 없이 미팅 시간을 조정합니다."], ["기사님은 공항에서 얼마나 대기하나요?", "착륙 후 첫 90분은 무료로 포함되며, 항공편이 지연되면 대기 시간이 자동으로 조정됩니다."], ["이동 요금은 어떻게 결제하나요?", "이동 시작 시 기사님께 현금으로 결제합니다 - 예약 시 확정된 차량당 정찰제 요금입니다."]]
  },
  pt: {
    home: "Início",
    routes: "Rotas de transfer",
    priceHeading: "Preços fixos de transfer",
    included: "Incluído no preço",
    duration: "Tempo estimado",
    distance: "Distância",
    from: "Preço desde",
    book: "Reserve o seu transfer",
    faq: "Perguntas frequentes",
    other: "Outros transfers do Aeroporto de Antalya",
    campaign: "Preços especiais online disponíveis para todas as rotas de transfer.",
    contact: "Contacte-nos pelo WhatsApp para reservas e questões.",
    privacy: "Privacidade",
    imprint: "Ficha técnica",
    privacyUrl: "/privacy/",
    imprintUrl: "/impressum.html",
    vito: "Mercedes Vito · até 6 passageiros",
    sprinter: "Mercedes Sprinter · até 12 passageiros",
    intro: (name, duration, distance) => `A viagem de ${distance} do Aeroporto de Antalya para ${name} demora aproximadamente ${duration} em trânsito normal. O seu motorista recebe-o nas chegadas e conduz diretamente até ao seu alojamento.`,
    items: ["Receção personalizada", "Monitorização de voos em tempo real", "Estacionamento e espera no aeroporto", "Assistência com bagagem e água engarrafada", "Cadeira de criança gratuita mediante pedido"],
    faqItems: (name, price, duration) => [[`Quanto tempo demora o transfer do Aeroporto de Antalya para ${name}?`, `A viagem demora aproximadamente ${duration} em trânsito normal.`], [`Qual é o preço fixo do transfer para ${name}?`, `Os preços do Mercedes Vito começam em €${price} por veículo. O total confirmado é apresentado na reserva.`], ["O que acontece se o meu voo tiver atraso?", "Monitorizamos o seu voo em tempo real e ajustamos a hora do encontro sem custos adicionais."], ["Quanto tempo espera o meu motorista no aeroporto?", "Os primeiros 90 minutos após a aterragem estão incluídos gratuitamente, e o período ajusta-se automaticamente se o seu voo tiver atraso."], ["Como pago o transfer?", "Em dinheiro ao seu motorista no início da viagem - o preço fixo da sua reserva, por veículo."]]
  },
  ro: {
    home: "Acasă",
    routes: "Rute de transfer",
    priceHeading: "Prețuri fixe de transfer",
    included: "Inclus în preț",
    duration: "Timp estimat",
    distance: "Distanță",
    from: "Preț de la",
    book: "Rezervați transferul",
    faq: "Întrebări frecvente",
    other: "Alte transferuri de la Aeroportul Antalya",
    campaign: "Prețuri speciale online sunt disponibile pentru toate rutele de transfer.",
    contact: "Contactați-ne pe WhatsApp pentru rezervări și întrebări.",
    privacy: "Confidențialitate",
    imprint: "Imprint",
    privacyUrl: "/privacy/",
    imprintUrl: "/impressum.html",
    vito: "Mercedes Vito · până la 6 pasageri",
    sprinter: "Mercedes Sprinter · până la 12 pasageri",
    intro: (name, duration, distance) => `Călătoria de ${distance} de la Aeroportul Antalya la ${name} durează aproximativ ${duration} în condiții normale de trafic. Șoferul dumneavoastră vă întâmpină la sosiri și vă conduce direct la cazare.`,
    items: ["Întâmpinare personală", "Urmărirea zborului în timp real", "Parcare și așteptare la aeroport", "Asistență pentru bagaje și apă îmbuteliată", "Scaun pentru copil gratuit la cerere"],
    faqItems: (name, price, duration) => [[`Cât durează transferul de la Aeroportul Antalya la ${name}?`, `Călătoria durează aproximativ ${duration} în condiții normale de trafic.`], [`Care este prețul fix al transferului către ${name}?`, `Prețurile Mercedes Vito încep de la €${price} per vehicul. Totalul confirmat este afișat la momentul rezervării.`], ["Ce se întâmplă dacă zborul meu întârzie?", "Vă urmărim zborul în timp real și ajustăm ora întâlnirii fără costuri suplimentare."], ["Cât timp așteaptă șoferul la aeroport?", "Primele 90 de minute după aterizare sunt incluse gratuit, iar intervalul se ajustează automat dacă zborul dumneavoastră întârzie."], ["Cum plătesc transferul?", "În numerar șoferului la începutul călătoriei - prețul fix din rezervarea dumneavoastră, per vehicul."]]
  },
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
    vito: "Mercedes Vito · up to 6 passengers",
    sprinter: "Mercedes Sprinter · up to 12 passengers",
    intro: (name, duration, distance) => `The ${distance} journey from Antalya Airport to ${name} takes approximately ${duration} in normal traffic. Your chauffeur meets you in arrivals and drives directly to your accommodation.`,
    items: ["Personal meet and greet", "Real-time flight tracking", "Airport parking and waiting", "Luggage assistance and bottled water", "Free child seat on request"],
    faqItems: (name, price, duration) => [[`How long is the transfer from Antalya Airport to ${name}?`, `The journey takes approximately ${duration} in normal traffic.`], [`What is the fixed transfer price to ${name}?`, `Mercedes Vito prices start from €${price} per vehicle. The confirmed total is shown when booking.`], ["What happens if my flight is delayed?", "We track your flight in real time and adjust the meeting time at no extra charge."], ["How long does my chauffeur wait at the airport?", "The first 90 minutes after landing are included free of charge, and the window moves automatically if your flight is delayed."], ["How do I pay for the transfer?", "In cash to your chauffeur at the start of the journey - the fixed price from your booking, per vehicle."]]
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
    vito: "Mercedes Vito · bis 6 Personen",
    sprinter: "Mercedes Sprinter · bis 12 Personen",
    intro: (name, duration, distance) => `Die ${distance} lange Fahrt vom Flughafen Antalya nach ${name} dauert bei normalem Verkehr ungefähr ${duration}. Nachdem Sie Ihr Gepäck abgeholt haben, gehen Sie bitte zum Meet & Greet Bereich J / 777. Unser Flughafen-Team findet Ihre Buchung und bringt Sie mit Ihrem Fahrer zusammen; anschließend fahren Sie direkt zu Ihrer Unterkunft.`,
    items: ["Persönlicher Empfang", "Flugverfolgung in Echtzeit", "Flughafenparken und Wartezeit", "Gepäckhilfe und Mineralwasser", "Kostenloser Kindersitz auf Wunsch"],
    faqItems: (name, price, duration) => [[`Wie lange dauert der Transfer vom Flughafen Antalya nach ${name}?`, `Die Fahrt dauert bei normalem Verkehr ungefähr ${duration}.`], [`Was kostet der Festpreis-Transfer nach ${name}?`, `Die Preise für einen Mercedes Vito beginnen bei €${price} pro Fahrzeug. Der bestätigte Gesamtpreis wird bei der Buchung angezeigt.`], ["Was passiert bei einer Flugverspätung?", "Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit ohne Aufpreis an."], ["Wie lange wartet mein Chauffeur am Flughafen?", "Die ersten 90 Minuten nach der Landung sind kostenfrei enthalten, und bei Flugverspätungen verschiebt sich dieses Zeitfenster automatisch."], ["Wie bezahle ich den Transfer?", "Bar an Ihren Chauffeur zu Beginn der Fahrt - zum Festpreis aus Ihrer Buchung, pro Fahrzeug."]]
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
    vito: "Mercedes Vito · 6 yolcuya kadar",
    sprinter: "Mercedes Sprinter · 12 yolcuya kadar",
    intro: (name, duration, distance) => `Antalya Havalimanı ile ${name} arasındaki ${distance} mesafeli yolculuk normal trafik koşullarında yaklaşık ${duration} sürer. Şoförünüz sizi gelen yolcu salonunda karşılar ve doğrudan konaklama adresinize götürür.`,
    items: ["Kişisel karşılama", "Gerçek zamanlı uçuş takibi", "Havalimanı otoparkı ve bekleme", "Bagaj yardımı ve şişe su", "Talep üzerine ücretsiz çocuk koltuğu"],
    faqItems: (name, price, duration) => [[`Antalya Havalimanı ile ${name} arası transfer ne kadar sürer?`, `Normal trafik koşullarında yolculuk yaklaşık ${duration} sürer. Trafik ve otel konumu süreyi etkileyebilir.`], [`${name} transferinin sabit fiyatı nedir?`, `Mercedes Vito fiyatları araç başına €${price}'dan başlar. Kesin toplam rezervasyon sırasında gösterilir.`], ["Uçuşum gecikirse ne olur?", "Uçuşunuzu gerçek zamanlı takip eder, karşılama saatini ücretsiz olarak güncelleriz."], ["Şoförüm havalimanında ne kadar bekler?", "İnişten sonraki ilk 90 dakika ücretsiz olarak fiyata dahildir; uçuş gecikmelerinde bu süre otomatik olarak kayar."], ["Transfer ödemesini nasıl yapıyorum?", "Yolculuğun başında şoförünüze nakit olarak - rezervasyonda gördüğünüz sabit fiyat, araç başına."]]
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
    vito: "Mercedes Vito · до 6 пассажиров",
    sprinter: "Mercedes Sprinter · до 12 пассажиров",
    intro: (name, duration, distance) => `Поездка из аэропорта Антальи в ${name} на расстояние ${distance} занимает примерно ${duration} при обычном движении. Водитель встретит вас в зале прилёта и отвезёт прямо к месту проживания.`,
    items: ["Личная встреча", "Отслеживание рейса в реальном времени", "Парковка и ожидание в аэропорту", "Помощь с багажом и вода", "Бесплатное детское кресло по запросу"],
    faqItems: (name, price, duration) => [[`Сколько длится трансфер из аэропорта Антальи в ${name}?`, `При обычном движении поездка занимает около ${duration}. Точное время зависит от дорожной ситуации и расположения отеля.`], [`Сколько стоит трансфер в ${name}?`, `Стоимость Mercedes Vito начинается от €${price} за автомобиль. Итоговая фиксированная цена показывается при бронировании.`], ["Что произойдёт при задержке рейса?", "Мы отслеживаем рейс в реальном времени и бесплатно корректируем время встречи."], ["Сколько водитель ждёт в аэропорту?", "Первые 90 минут после посадки включены в стоимость, а при задержке рейса отсчёт сдвигается автоматически."], ["Как оплатить трансфер?", "Наличными водителю в начале поездки - по фиксированной цене из бронирования, за автомобиль."]]
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
    vito: "Mercedes Vito · jusqu'à 6 passagers",
    sprinter: "Mercedes Sprinter · jusqu'à 12 passagers",
    intro: (name, duration, distance) => `Le trajet de ${distance} depuis l'aéroport d'Antalya jusqu'à ${name} dure environ ${duration} en trafic normal. Après avoir récupéré vos bagages, rendez-vous dans la zone Meet & Greet J / 777. Notre équipe identifiera votre réservation et vous mettra en contact avec votre chauffeur.`,
    items: ["Accueil personnalisé", "Suivi du vol en temps réel", "Parking aéroport et attente inclus", "Aide aux bagages et eau en bouteille", "Siège enfant gratuit sur demande"],
    faqItems: (name, price, duration) => [[`Combien de temps dure le transfert de l'aéroport d'Antalya vers ${name} ?`, `Le trajet dure environ ${duration} en trafic normal.`], [`Quel est le prix fixe du transfert vers ${name} ?`, `Les prix Mercedes Vito commencent à €${price} par véhicule. Le montant total confirmé est affiché lors de la réservation.`], ["Que se passe-t-il si mon vol est retardé ?", "Nous suivons votre vol en temps réel et ajustons l'heure de prise en charge sans frais supplémentaires."], ["Combien de temps mon chauffeur attend-il à l'aéroport ?", "Les 90 premières minutes après l'atterrissage sont incluses sans frais, et ce délai se décale automatiquement en cas de retard de vol."], ["Comment régler le transfert ?", "En espèces à votre chauffeur au début du trajet - au prix fixe de votre réservation, par véhicule."]]
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
    vito: "Mercedes Vito · až 6 cestujících",
    sprinter: "Mercedes Sprinter · až 12 cestujících",
    intro: (name, duration, distance) => `Cesta z letiště Antalya do ${name}, vzdálená ${distance}, trvá přibližně ${duration} při běžném provozu. Váš šofér vás uvítá v příletové hale a odveze vás přímo do ubytování.`,
    items: ["Osobní uvítání", "Sledování letů v reálném čase", "Parkoviště na letišti a čekání", "Pomoc se zavazadly a balená voda", "Bezplatná dětská sedačka na vyžádání"],
    faqItems: (name, price, duration) => [[`Jak dlouho trvá transfer z letiště Antalya do ${name}?`, `Cesta trvá přibližně ${duration} při běžném provozu.`], [`Jaká je pevná cena transferu do ${name}?`, `Ceny Mercedes Vito začínají od €${price} za vozidlo. Potvrzená celková cena je zobrazena při rezervaci.`], ["Co se stane, když má můj let zpoždění?", "Sledujeme váš let v reálném čase a upravujeme čas setkání bez příplatku."], ["Jak dlouho na mě šofér na letišti čeká?", "Prvních 90 minut po přistání je zdarma v ceně a při zpoždění letu se tento interval automaticky posouvá."], ["Jak transfer zaplatím?", "V hotovosti šoférovi na začátku jízdy - pevnou cenou z vaší rezervace, za vozidlo."]]
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
    vito: "Mercedes Vito · до 6 пасажирів",
    sprinter: "Mercedes Sprinter · до 12 пасажирів",
    intro: (name, duration, distance) => `Поїздка з аеропорту Анталії до ${name} відстанню ${distance} займає приблизно ${duration} за звичайного руху. Ваш водій зустріне вас у залі прильоту та відвезе прямо до місця проживання.`,
    items: ["Особиста зустріч", "Відстеження рейсу в реальному часі", "Паркування та очікування в аеропорту", "Допомога з багажем і вода", "Безкоштовне дитяче крісло за запитом"],
    faqItems: (name, price, duration) => [[`Скільки триває трансфер з аеропорту Анталії до ${name}?`, `За звичайного руху поїздка займає близько ${duration}.`], [`Яка фіксована ціна трансферу до ${name}?`, `Ціни на Mercedes Vito починаються від €${price} за автомобіль. Підтверджена загальна сума показується під час бронювання.`], ["Що станеться, якщо мій рейс затримається?", "Ми відстежуємо ваш рейс у реальному часі та безкоштовно коригуємо час зустрічі."], ["Скільки водій чекає в аеропорту?", "Перші 90 хвилин після посадки включені у вартість, а в разі затримки рейсу відлік зміщується автоматично."], ["Як оплатити трансфер?", "Готівкою водієві на початку поїздки - за фіксованою ціною з бронювання, за автомобіль."]]
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
    vito: "Mercedes Vito · 6 مسافروں تک",
    sprinter: "Mercedes Sprinter · 12 مسافروں تک",
    intro: (name, duration, distance) => `انطالیہ ایئرپورٹ سے ${name} تک ${distance} کا سفر عام ٹریفک میں تقریباً ${duration} لیتا ہے۔ آپ کا ڈرائیور آپ کو آمد ہال میں ملے گا اور براہ راست آپ کی رہائش گاہ تک لے جائے گا۔`,
    items: ["ذاتی استقبال", "حقیقی وقت میں پرواز کی نگرانی", "ایئرپورٹ پارکنگ اور انتظار", "سامان میں مدد اور بوتل بند پانی", "درخواست پر مفت بچوں کی سیٹ"],
    faqItems: (name, price, duration) => [[`انطالیہ ایئرپورٹ سے ${name} تک ٹرانسفر میں کتنا وقت لگتا ہے؟`, `عام ٹریفک میں سفر تقریباً ${duration} لیتا ہے۔`], [`${name} تک ٹرانسفر کی مقررہ قیمت کیا ہے؟`, `Mercedes Vito کی قیمتیں €${price} فی گاڑی سے شروع ہوتی ہیں۔ تصدیق شدہ کل رقم بکنگ کے وقت دکھائی جاتی ہے۔`], ["اگر میری پرواز میں تاخیر ہو جائے تو کیا ہوگا؟", "ہم آپ کی پرواز کو حقیقی وقت میں ٹریک کرتے ہیں اور بغیر کسی اضافی چارج کے ملاقات کا وقت ایڈجسٹ کرتے ہیں۔"], ["میرا ڈرائیور ایئرپورٹ پر کتنی دیر انتظار کرتا ہے؟", "لینڈنگ کے بعد پہلے 90 منٹ مفت شامل ہیں، اور پرواز میں تاخیر کی صورت میں یہ دورانیہ خودکار طور پر آگے کھسک جاتا ہے۔"], ["ٹرانسفر کی ادائیگی کیسے کروں؟", "سفر کے آغاز پر ڈرائیور کو نقد - بکنگ کی مقررہ قیمت، فی گاڑی۔"]]
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
    vito: "Mercedes Vito · do 6 pasażerów",
    sprinter: "Mercedes Sprinter · do 12 pasażerów",
    intro: (name, duration, distance) => `Podróż o długości ${distance} z lotniska Antalya do ${name} trwa około ${duration} przy normalnym ruchu. Kierowca powita Cię w hali przylotów i zawiezie bezpośrednio do miejsca zakwaterowania.`,
    items: ["Osobiste powitanie", "Śledzenie lotu w czasie rzeczywistym", "Parking i oczekiwanie na lotnisku", "Pomoc z bagażem i woda butelkowana", "Bezpłatny fotelik dziecięcy na życzenie"],
    faqItems: (name, price, duration) => [[`Jak długo trwa transfer z lotniska Antalya do ${name}?`, `Przy normalnym ruchu podróż trwa około ${duration}.`], [`Jaka jest stała cena transferu do ${name}?`, `Ceny Mercedes Vito zaczynają się od €${price} za pojazd. Potwierdzona łączna kwota jest pokazywana podczas rezerwacji.`], ["Co się stanie, jeśli mój lot będzie opóźniony?", "Śledzimy Twój lot w czasie rzeczywistym i bez dodatkowych opłat dostosowujemy godzinę odbioru."], ["Jak długo kierowca czeka na lotnisku?", "Pierwsze 90 minut po wylądowaniu jest wliczone w cenę, a przy opóźnieniu lotu okno to przesuwa się automatycznie."], ["Jak zapłacić za transfer?", "Gotówką kierowcy na początku podróży - stała cena z rezerwacji, za pojazd."]]
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
    vito: "Mercedes Vito · tot 6 passagiers",
    sprinter: "Mercedes Sprinter · tot 12 passagiers",
    intro: (name, duration, distance) => `De rit van ${distance} van de luchthaven Antalya naar ${name} duurt ongeveer ${duration} bij normaal verkeer. Uw chauffeur ontvangt u in de aankomsthal en rijdt rechtstreeks naar uw accommodatie.`,
    items: ["Persoonlijke ontvangst", "Realtime vluchtvolging", "Parkeren en wachten op de luchthaven", "Bagagehulp en flessenwater", "Gratis kinderzitje op aanvraag"],
    faqItems: (name, price, duration) => [[`Hoe lang duurt de transfer van de luchthaven Antalya naar ${name}?`, `De rit duurt ongeveer ${duration} bij normaal verkeer.`], [`Wat is de vaste transferprijs naar ${name}?`, `Mercedes Vito-prijzen beginnen bij €${price} per voertuig. Het bevestigde totaal wordt getoond bij het boeken.`], ["Wat gebeurt er als mijn vlucht vertraging heeft?", "We volgen uw vlucht in realtime en passen de ophaaltijd zonder extra kosten aan."], ["Hoe lang wacht mijn chauffeur op de luchthaven?", "De eerste 90 minuten na de landing zijn kosteloos inbegrepen en dit tijdvenster schuift automatisch mee bij vertraging."], ["Hoe betaal ik de transfer?", "Contant aan uw chauffeur bij aanvang van de rit - de vaste prijs uit uw boeking, per voertuig."]]
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
    vito: "مرسيدس فيتو · حتى 6 ركاب",
    sprinter: "مرسيدس سبرينتر · حتى 12 راكبًا",
    intro: (name, duration, distance) => `تستغرق رحلة المسافة ${distance} من مطار أنطاليا إلى ${name} حوالي ${duration} في حركة المرور العادية. يستقبلك سائقك في صالة الوصول ويقودك مباشرة إلى مكان إقامتك.`,
    items: ["استقبال شخصي", "تتبع الرحلة في الوقت الفعلي", "موقف وانتظار في المطار", "المساعدة في الأمتعة ومياه معبأة", "مقعد أطفال مجاني عند الطلب"],
    faqItems: (name, price, duration) => [[`كم يستغرق النقل من مطار أنطاليا إلى ${name}؟`, `تستغرق الرحلة حوالي ${duration} في حركة المرور العادية.`], [`ما هو السعر الثابت للنقل إلى ${name}؟`, `تبدأ أسعار مرسيدس فيتو من €${price} لكل مركبة. يظهر الإجمالي المؤكد عند الحجز.`], ["ماذا يحدث إذا تأخرت رحلتي؟", "نتتبع رحلتك في الوقت الفعلي ونعدّل وقت اللقاء دون أي رسوم إضافية."], ["كم ينتظر السائق في المطار؟", "أول 90 دقيقة بعد الهبوط مشمولة مجانًا، وتتحرك هذه المدة تلقائيًا مع أي تأخير في الرحلة."], ["كيف أدفع قيمة النقل؟", "نقدًا للسائق في بداية الرحلة - بالسعر الثابت من حجزك، لكل مركبة."]]
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
    vito: "Mercedes Vito · upp till 6 passagerare",
    sprinter: "Mercedes Sprinter · upp till 12 passagerare",
    intro: (name, duration, distance) => `Resan på ${distance} från Antalya flygplats till ${name} tar ungefär ${duration} vid normal trafik. Din chaufför möter dig i ankomsthallen och kör dig direkt till ditt boende.`,
    items: ["Personligt möte", "Flygbevakning i realtid", "Parkering och väntan på flygplatsen", "Bagagehjälp och vatten på flaska", "Gratis barnstol på begäran"],
    faqItems: (name, price, duration) => [[`Hur lång tid tar transfern från Antalya flygplats till ${name}?`, `Resan tar cirka ${duration} vid normal trafik.`], [`Vad är det fasta transferpriset till ${name}?`, `Mercedes Vito-priser börjar från €${price} per fordon. Den bekräftade summan visas vid bokning.`], ["Vad händer om mitt flyg är försenat?", "Vi spårar ditt flyg i realtid och justerar mötestiden utan extra kostnad."], ["Hur länge väntar chauffören på flygplatsen?", "De första 90 minuterna efter landning ingår utan kostnad, och tidsfönstret förskjuts automatiskt vid flygförsening."], ["Hur betalar jag transfern?", "Kontant till chauffören när resan börjar - det fasta priset från din bokning, per fordon."]]
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
            /* @__PURE__ */ jsx("p", { children: "Der ausgewiesene Betrag ist ein fester Gesamtpreis für das Fahrzeug, nicht pro Person. Es gibt keine versteckten Zuschläge für die Flugüberwachung, die übliche Wartezeit oder Kindersitze auf Anfrage. Bezahlt wird bar direkt beim Fahrer, zu Beginn der Fahrt. Damit kennen Sie die Kosten schon vor der Anreise und können entspannt starten." }),
            /* @__PURE__ */ jsx("h3", { children: "Fahrzeug, Gepäck und Kinder" }),
            /* @__PURE__ */ jsx("p", { children: "Der Mercedes Vito eignet sich für bis zu sechs Personen mit normalem Reisegepäck; für größere Gruppen steht ein Mercedes Sprinter mit bis zu 12 Plätzen zur Verfügung. Teilen Sie uns Sondergepäck, einen Kinderwagen oder die benötigten Kindersitze bitte bei der Buchung mit. So planen wir Ihr Fahrzeug passend zu Ihrer Reisegruppe." })
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
const indexedLanguages = new Set(indexableLanguages);
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
const route49 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: transfer,
  loader: loader$2,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function HotelPage({ hotel: hotel2 }) {
  const route = localizedRoute(hotel2.regionSlug, "de");
  if (!route) return null;
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
            /* @__PURE__ */ jsx("strong", { children: route.durationLabel }),
            /* @__PURE__ */ jsx("span", { children: "Geschätzte Fahrzeit" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("strong", { children: route.distance }),
            /* @__PURE__ */ jsx("span", { children: "Entfernung" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("strong", { children: [
              "€",
              route.prices.vito
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
            route.durationLabel,
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
            /* @__PURE__ */ jsx("p", { children: "Mercedes Vito · bis 6 Personen" }),
            /* @__PURE__ */ jsxs("strong", { children: [
              "€",
              route.prices.vito
            ] }),
            /* @__PURE__ */ jsx("span", { children: "Preis für das gesamte Fahrzeug" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "localized-price", children: [
            /* @__PURE__ */ jsx("p", { children: "Mercedes Sprinter · bis 12 Personen" }),
            /* @__PURE__ */ jsxs("strong", { children: [
              "€",
              route.prices.sprinter
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
            route.durationLabel,
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Was kostet der Transfer?" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Der Mercedes Vito kostet ab €",
            route.prices.vito,
            " pro Fahrzeug."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Was passiert bei einer Flugverspätung?" }),
          /* @__PURE__ */ jsx("p", { children: "Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit ohne Aufpreis an." })
        ] }),
        /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Wie lange wartet mein Chauffeur am Flughafen?" }),
          /* @__PURE__ */ jsx("p", { children: "Die ersten 90 Minuten nach der Landung sind kostenfrei enthalten, und bei Flugverspätungen verschiebt sich dieses Zeitfenster automatisch." })
        ] }),
        /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Wie bezahle ich den Transfer?" }),
          /* @__PURE__ */ jsx("p", { children: "Bar an Ihren Chauffeur zu Beginn der Fahrt - zum Festpreis aus Ihrer Buchung, pro Fahrzeug." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "localized-contact", id: "kontakt", children: [
        /* @__PURE__ */ jsx("h2", { children: "Transfer buchen" }),
        /* @__PURE__ */ jsx("p", { children: "Für Buchungen und Fragen erreichen Sie uns über WhatsApp." }),
        /* @__PURE__ */ jsx("a", { className: "button button-gold", href: "https://wa.me/905302655790", children: "WhatsApp" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { hidden: true, "aria-hidden": "true", children: /* @__PURE__ */ jsx(BookingForm, { selection: { route: hotel2.regionSlug, vehicle: "vito", nonce: 1 }, scrollOnSelect: false }) })
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
const route50 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const route64 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: legal,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BD2P1iGF.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/errorBoundaries-Y42zlZbV.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/root-CtD6o1z4.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/errorBoundaries-Y42zlZbV.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-en": { "id": "home-en", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-de": { "id": "home-de", "parentId": "root", "path": "de", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-fr": { "id": "home-fr", "parentId": "root", "path": "fr", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-tr": { "id": "home-tr", "parentId": "root", "path": "tr", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-ru": { "id": "home-ru", "parentId": "root", "path": "ru", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-cs": { "id": "home-cs", "parentId": "root", "path": "cs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-uk": { "id": "home-uk", "parentId": "root", "path": "uk", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-ur": { "id": "home-ur", "parentId": "root", "path": "ur", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-pl": { "id": "home-pl", "parentId": "root", "path": "pl", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-nl": { "id": "home-nl", "parentId": "root", "path": "nl", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-ar": { "id": "home-ar", "parentId": "root", "path": "ar", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-sv": { "id": "home-sv", "parentId": "root", "path": "sv", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-da": { "id": "home-da", "parentId": "root", "path": "da", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-el": { "id": "home-el", "parentId": "root", "path": "el", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-es": { "id": "home-es", "parentId": "root", "path": "es", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-he": { "id": "home-he", "parentId": "root", "path": "he", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-hu": { "id": "home-hu", "parentId": "root", "path": "hu", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-it": { "id": "home-it", "parentId": "root", "path": "it", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-ja": { "id": "home-ja", "parentId": "root", "path": "ja", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-ko": { "id": "home-ko", "parentId": "root", "path": "ko", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-pt": { "id": "home-pt", "parentId": "root", "path": "pt", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-ro": { "id": "home-ro", "parentId": "root", "path": "ro", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "home-zh": { "id": "home-zh", "parentId": "root", "path": "zh", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-5SZRL55s.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-en": { "id": "health-en", "parentId": "root", "path": "health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-de": { "id": "health-de", "parentId": "root", "path": "de/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-fr": { "id": "health-fr", "parentId": "root", "path": "fr/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-tr": { "id": "health-tr", "parentId": "root", "path": "tr/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-ru": { "id": "health-ru", "parentId": "root", "path": "ru/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-cs": { "id": "health-cs", "parentId": "root", "path": "cs/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-uk": { "id": "health-uk", "parentId": "root", "path": "uk/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-ur": { "id": "health-ur", "parentId": "root", "path": "ur/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-pl": { "id": "health-pl", "parentId": "root", "path": "pl/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-nl": { "id": "health-nl", "parentId": "root", "path": "nl/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-ar": { "id": "health-ar", "parentId": "root", "path": "ar/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-sv": { "id": "health-sv", "parentId": "root", "path": "sv/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-da": { "id": "health-da", "parentId": "root", "path": "da/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-el": { "id": "health-el", "parentId": "root", "path": "el/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-es": { "id": "health-es", "parentId": "root", "path": "es/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-he": { "id": "health-he", "parentId": "root", "path": "he/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-hu": { "id": "health-hu", "parentId": "root", "path": "hu/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-it": { "id": "health-it", "parentId": "root", "path": "it/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-ja": { "id": "health-ja", "parentId": "root", "path": "ja/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-ko": { "id": "health-ko", "parentId": "root", "path": "ko/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-pt": { "id": "health-pt", "parentId": "root", "path": "pt/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-ro": { "id": "health-ro", "parentId": "root", "path": "ro/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "health-zh": { "id": "health-zh", "parentId": "root", "path": "zh/health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/health-Biw3xhkI.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/Header-VuLCgLNc.js", "/assets/Icon-cdn0c84e.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "clinic-tr": { "id": "clinic-tr", "parentId": "root", "path": "clinic", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/clinic-DAwQW_Nh.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "transfer-en": { "id": "transfer-en", "parentId": "root", "path": "transfers/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/transfer-CZ4Iz_p9.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/StaticPageHeader-DDzAlzLI.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "transfer-localized": { "id": "transfer-localized", "parentId": "root", "path": ":language/transfers/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/transfer-CZ4Iz_p9.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/StaticPageHeader-DDzAlzLI.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "hotel-de": { "id": "hotel-de", "parentId": "root", "path": "de/hotels/:hotelSlug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/hotel-BDflRJbX.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/BookingForm-DYCup_b2.js", "/assets/StaticPageHeader-DDzAlzLI.js", "/assets/Icon-cdn0c84e.js"], "css": ["/assets/BookingForm-DpsRipQV.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-en": { "id": "legal-imprint-en", "parentId": "root", "path": "impressum.html", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-DdxmrdXn.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-en": { "id": "legal-privacy-en", "parentId": "root", "path": "privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-DdxmrdXn.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-de": { "id": "legal-privacy-de", "parentId": "root", "path": "de/datenschutz", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-DdxmrdXn.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-de": { "id": "legal-imprint-de", "parentId": "root", "path": "de/impressum", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-DdxmrdXn.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-tr": { "id": "legal-privacy-tr", "parentId": "root", "path": "tr/gizlilik", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-DdxmrdXn.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-tr": { "id": "legal-imprint-tr", "parentId": "root", "path": "tr/kunye", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-DdxmrdXn.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-ru": { "id": "legal-privacy-ru", "parentId": "root", "path": "ru/privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-DdxmrdXn.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-ru": { "id": "legal-imprint-ru", "parentId": "root", "path": "ru/impressum", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-DdxmrdXn.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-cs": { "id": "legal-privacy-cs", "parentId": "root", "path": "cs/privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-DdxmrdXn.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-cs": { "id": "legal-imprint-cs", "parentId": "root", "path": "cs/impressum", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-DdxmrdXn.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-uk": { "id": "legal-privacy-uk", "parentId": "root", "path": "uk/privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-DdxmrdXn.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-uk": { "id": "legal-imprint-uk", "parentId": "root", "path": "uk/impressum", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-DdxmrdXn.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-privacy-ur": { "id": "legal-privacy-ur", "parentId": "root", "path": "ur/privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-DdxmrdXn.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "legal-imprint-ur": { "id": "legal-imprint-ur", "parentId": "root", "path": "ur/impressum", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legal-DdxmrdXn.js", "imports": ["/assets/components-Du9Ywr_M.js", "/assets/seo-DfBJJFmm.js", "/assets/StaticPageHeader-DDzAlzLI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-f66f38da.js", "version": "f66f38da", "sri": void 0 };
const assetsBuildDirectory = "build/public-react/client";
const basename = "/";
const future = { "unstable_enableNodeReadableStream": false, "unstable_optimizeDeps": false };
const ssr = false;
const isSpaMode = false;
const prerender = ["/", "/de/", "/fr/", "/tr/", "/ru/", "/cs/", "/uk/", "/ur/", "/pl/", "/nl/", "/ar/", "/sv/", "/da/", "/el/", "/es/", "/he/", "/hu/", "/it/", "/ja/", "/ko/", "/pt/", "/ro/", "/zh/", "/health/", "/de/health/", "/fr/health/", "/tr/health/", "/ru/health/", "/cs/health/", "/uk/health/", "/ur/health/", "/pl/health/", "/nl/health/", "/ar/health/", "/sv/health/", "/da/health/", "/el/health/", "/es/health/", "/he/health/", "/hu/health/", "/it/health/", "/ja/health/", "/ko/health/", "/pt/health/", "/ro/health/", "/zh/health/", "/clinic/", "/transfers/antalya/", "/transfers/belek/", "/transfers/side/", "/transfers/kemer/", "/transfers/alanya/", "/transfers/bogazkent/", "/transfers/manavgat/", "/transfers/kizilagac/", "/transfers/tekirova/", "/transfers/bodrum/", "/transfers/dalaman/", "/transfers/fethiye/", "/transfers/pamukkale/", "/transfers/kapadokya/", "/de/transfers/antalya/", "/de/transfers/belek/", "/de/transfers/side/", "/de/transfers/kemer/", "/de/transfers/alanya/", "/de/transfers/bogazkent/", "/de/transfers/manavgat/", "/de/transfers/kizilagac/", "/de/transfers/tekirova/", "/de/transfers/bodrum/", "/de/transfers/dalaman/", "/de/transfers/fethiye/", "/de/transfers/pamukkale/", "/de/transfers/kapadokya/", "/fr/transfers/antalya/", "/fr/transfers/belek/", "/fr/transfers/side/", "/fr/transfers/kemer/", "/fr/transfers/alanya/", "/fr/transfers/bogazkent/", "/fr/transfers/manavgat/", "/fr/transfers/kizilagac/", "/fr/transfers/tekirova/", "/fr/transfers/bodrum/", "/fr/transfers/dalaman/", "/fr/transfers/fethiye/", "/fr/transfers/pamukkale/", "/fr/transfers/kapadokya/", "/tr/transfers/antalya/", "/tr/transfers/belek/", "/tr/transfers/side/", "/tr/transfers/kemer/", "/tr/transfers/alanya/", "/tr/transfers/bogazkent/", "/tr/transfers/manavgat/", "/tr/transfers/kizilagac/", "/tr/transfers/tekirova/", "/tr/transfers/bodrum/", "/tr/transfers/dalaman/", "/tr/transfers/fethiye/", "/tr/transfers/pamukkale/", "/tr/transfers/kapadokya/", "/ru/transfers/antalya/", "/ru/transfers/belek/", "/ru/transfers/side/", "/ru/transfers/kemer/", "/ru/transfers/alanya/", "/ru/transfers/bogazkent/", "/ru/transfers/manavgat/", "/ru/transfers/kizilagac/", "/ru/transfers/tekirova/", "/ru/transfers/bodrum/", "/ru/transfers/dalaman/", "/ru/transfers/fethiye/", "/ru/transfers/pamukkale/", "/ru/transfers/kapadokya/", "/cs/transfers/antalya/", "/cs/transfers/belek/", "/cs/transfers/side/", "/cs/transfers/kemer/", "/cs/transfers/alanya/", "/cs/transfers/bogazkent/", "/cs/transfers/manavgat/", "/cs/transfers/kizilagac/", "/cs/transfers/tekirova/", "/cs/transfers/bodrum/", "/cs/transfers/dalaman/", "/cs/transfers/fethiye/", "/cs/transfers/pamukkale/", "/cs/transfers/kapadokya/", "/uk/transfers/antalya/", "/uk/transfers/belek/", "/uk/transfers/side/", "/uk/transfers/kemer/", "/uk/transfers/alanya/", "/uk/transfers/bogazkent/", "/uk/transfers/manavgat/", "/uk/transfers/kizilagac/", "/uk/transfers/tekirova/", "/uk/transfers/bodrum/", "/uk/transfers/dalaman/", "/uk/transfers/fethiye/", "/uk/transfers/pamukkale/", "/uk/transfers/kapadokya/", "/ur/transfers/antalya/", "/ur/transfers/belek/", "/ur/transfers/side/", "/ur/transfers/kemer/", "/ur/transfers/alanya/", "/ur/transfers/bogazkent/", "/ur/transfers/manavgat/", "/ur/transfers/kizilagac/", "/ur/transfers/tekirova/", "/ur/transfers/bodrum/", "/ur/transfers/dalaman/", "/ur/transfers/fethiye/", "/ur/transfers/pamukkale/", "/ur/transfers/kapadokya/", "/pl/transfers/antalya/", "/pl/transfers/belek/", "/pl/transfers/side/", "/pl/transfers/kemer/", "/pl/transfers/alanya/", "/pl/transfers/bogazkent/", "/pl/transfers/manavgat/", "/pl/transfers/kizilagac/", "/pl/transfers/tekirova/", "/pl/transfers/bodrum/", "/pl/transfers/dalaman/", "/pl/transfers/fethiye/", "/pl/transfers/pamukkale/", "/pl/transfers/kapadokya/", "/nl/transfers/antalya/", "/nl/transfers/belek/", "/nl/transfers/side/", "/nl/transfers/kemer/", "/nl/transfers/alanya/", "/nl/transfers/bogazkent/", "/nl/transfers/manavgat/", "/nl/transfers/kizilagac/", "/nl/transfers/tekirova/", "/nl/transfers/bodrum/", "/nl/transfers/dalaman/", "/nl/transfers/fethiye/", "/nl/transfers/pamukkale/", "/nl/transfers/kapadokya/", "/ar/transfers/antalya/", "/ar/transfers/belek/", "/ar/transfers/side/", "/ar/transfers/kemer/", "/ar/transfers/alanya/", "/ar/transfers/bogazkent/", "/ar/transfers/manavgat/", "/ar/transfers/kizilagac/", "/ar/transfers/tekirova/", "/ar/transfers/bodrum/", "/ar/transfers/dalaman/", "/ar/transfers/fethiye/", "/ar/transfers/pamukkale/", "/ar/transfers/kapadokya/", "/sv/transfers/antalya/", "/sv/transfers/belek/", "/sv/transfers/side/", "/sv/transfers/kemer/", "/sv/transfers/alanya/", "/sv/transfers/bogazkent/", "/sv/transfers/manavgat/", "/sv/transfers/kizilagac/", "/sv/transfers/tekirova/", "/sv/transfers/bodrum/", "/sv/transfers/dalaman/", "/sv/transfers/fethiye/", "/sv/transfers/pamukkale/", "/sv/transfers/kapadokya/", "/da/transfers/antalya/", "/da/transfers/belek/", "/da/transfers/side/", "/da/transfers/kemer/", "/da/transfers/alanya/", "/da/transfers/bogazkent/", "/da/transfers/manavgat/", "/da/transfers/kizilagac/", "/da/transfers/tekirova/", "/da/transfers/bodrum/", "/da/transfers/dalaman/", "/da/transfers/fethiye/", "/da/transfers/pamukkale/", "/da/transfers/kapadokya/", "/el/transfers/antalya/", "/el/transfers/belek/", "/el/transfers/side/", "/el/transfers/kemer/", "/el/transfers/alanya/", "/el/transfers/bogazkent/", "/el/transfers/manavgat/", "/el/transfers/kizilagac/", "/el/transfers/tekirova/", "/el/transfers/bodrum/", "/el/transfers/dalaman/", "/el/transfers/fethiye/", "/el/transfers/pamukkale/", "/el/transfers/kapadokya/", "/es/transfers/antalya/", "/es/transfers/belek/", "/es/transfers/side/", "/es/transfers/kemer/", "/es/transfers/alanya/", "/es/transfers/bogazkent/", "/es/transfers/manavgat/", "/es/transfers/kizilagac/", "/es/transfers/tekirova/", "/es/transfers/bodrum/", "/es/transfers/dalaman/", "/es/transfers/fethiye/", "/es/transfers/pamukkale/", "/es/transfers/kapadokya/", "/he/transfers/antalya/", "/he/transfers/belek/", "/he/transfers/side/", "/he/transfers/kemer/", "/he/transfers/alanya/", "/he/transfers/bogazkent/", "/he/transfers/manavgat/", "/he/transfers/kizilagac/", "/he/transfers/tekirova/", "/he/transfers/bodrum/", "/he/transfers/dalaman/", "/he/transfers/fethiye/", "/he/transfers/pamukkale/", "/he/transfers/kapadokya/", "/hu/transfers/antalya/", "/hu/transfers/belek/", "/hu/transfers/side/", "/hu/transfers/kemer/", "/hu/transfers/alanya/", "/hu/transfers/bogazkent/", "/hu/transfers/manavgat/", "/hu/transfers/kizilagac/", "/hu/transfers/tekirova/", "/hu/transfers/bodrum/", "/hu/transfers/dalaman/", "/hu/transfers/fethiye/", "/hu/transfers/pamukkale/", "/hu/transfers/kapadokya/", "/it/transfers/antalya/", "/it/transfers/belek/", "/it/transfers/side/", "/it/transfers/kemer/", "/it/transfers/alanya/", "/it/transfers/bogazkent/", "/it/transfers/manavgat/", "/it/transfers/kizilagac/", "/it/transfers/tekirova/", "/it/transfers/bodrum/", "/it/transfers/dalaman/", "/it/transfers/fethiye/", "/it/transfers/pamukkale/", "/it/transfers/kapadokya/", "/ja/transfers/antalya/", "/ja/transfers/belek/", "/ja/transfers/side/", "/ja/transfers/kemer/", "/ja/transfers/alanya/", "/ja/transfers/bogazkent/", "/ja/transfers/manavgat/", "/ja/transfers/kizilagac/", "/ja/transfers/tekirova/", "/ja/transfers/bodrum/", "/ja/transfers/dalaman/", "/ja/transfers/fethiye/", "/ja/transfers/pamukkale/", "/ja/transfers/kapadokya/", "/ko/transfers/antalya/", "/ko/transfers/belek/", "/ko/transfers/side/", "/ko/transfers/kemer/", "/ko/transfers/alanya/", "/ko/transfers/bogazkent/", "/ko/transfers/manavgat/", "/ko/transfers/kizilagac/", "/ko/transfers/tekirova/", "/ko/transfers/bodrum/", "/ko/transfers/dalaman/", "/ko/transfers/fethiye/", "/ko/transfers/pamukkale/", "/ko/transfers/kapadokya/", "/pt/transfers/antalya/", "/pt/transfers/belek/", "/pt/transfers/side/", "/pt/transfers/kemer/", "/pt/transfers/alanya/", "/pt/transfers/bogazkent/", "/pt/transfers/manavgat/", "/pt/transfers/kizilagac/", "/pt/transfers/tekirova/", "/pt/transfers/bodrum/", "/pt/transfers/dalaman/", "/pt/transfers/fethiye/", "/pt/transfers/pamukkale/", "/pt/transfers/kapadokya/", "/ro/transfers/antalya/", "/ro/transfers/belek/", "/ro/transfers/side/", "/ro/transfers/kemer/", "/ro/transfers/alanya/", "/ro/transfers/bogazkent/", "/ro/transfers/manavgat/", "/ro/transfers/kizilagac/", "/ro/transfers/tekirova/", "/ro/transfers/bodrum/", "/ro/transfers/dalaman/", "/ro/transfers/fethiye/", "/ro/transfers/pamukkale/", "/ro/transfers/kapadokya/", "/zh/transfers/antalya/", "/zh/transfers/belek/", "/zh/transfers/side/", "/zh/transfers/kemer/", "/zh/transfers/alanya/", "/zh/transfers/bogazkent/", "/zh/transfers/manavgat/", "/zh/transfers/kizilagac/", "/zh/transfers/tekirova/", "/zh/transfers/bodrum/", "/zh/transfers/dalaman/", "/zh/transfers/fethiye/", "/zh/transfers/pamukkale/", "/zh/transfers/kapadokya/", "/de/hotels/rixos-premium-belek/", "/de/hotels/the-land-of-legends/", "/de/hotels/maxx-royal-belek/", "/de/hotels/regnum-carya/", "/de/hotels/gloria-golf-resort/", "/de/hotels/cornelia-diamond-golf-resort/", "/de/hotels/ic-hotels-santai/", "/de/hotels/arum-barut-collection/", "/de/hotels/side-star-resort/", "/de/hotels/royal-dragon-hotel/", "/de/hotels/barut-hemera/", "/de/hotels/voyage-sorgun/", "/de/hotels/sentido-flora-garden/", "/de/hotels/crystal-sunset-luxury-resort/", "/de/hotels/rixos-premium-kemer/", "/de/hotels/maxx-royal-kemer/", "/de/hotels/orange-county-resort-kemer/", "/de/hotels/paloma-pasha-resort/", "/de/hotels/club-hotel-phaselis-rose/", "/de/hotels/utopia-world-hotel/", "/de/hotels/sentido-gold-island/", "/de/hotels/q-premium-resort/", "/de/hotels/kirman-arycanda/", "/de/hotels/delphin-diva/", "/de/hotels/rixos-premium-tekirova/", "/de/hotels/amara-prestige/", "/impressum.html", "/privacy/", "/de/datenschutz/", "/de/impressum/", "/tr/gizlilik/", "/tr/kunye/", "/ru/privacy/", "/ru/impressum/", "/cs/privacy/", "/cs/impressum/", "/uk/privacy/", "/uk/impressum/", "/ur/privacy/", "/ur/impressum/"];
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
    module: route23
  },
  "home-de": {
    id: "home-de",
    parentId: "root",
    path: "de",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-fr": {
    id: "home-fr",
    parentId: "root",
    path: "fr",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-tr": {
    id: "home-tr",
    parentId: "root",
    path: "tr",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-ru": {
    id: "home-ru",
    parentId: "root",
    path: "ru",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-cs": {
    id: "home-cs",
    parentId: "root",
    path: "cs",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-uk": {
    id: "home-uk",
    parentId: "root",
    path: "uk",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-ur": {
    id: "home-ur",
    parentId: "root",
    path: "ur",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-pl": {
    id: "home-pl",
    parentId: "root",
    path: "pl",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-nl": {
    id: "home-nl",
    parentId: "root",
    path: "nl",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-ar": {
    id: "home-ar",
    parentId: "root",
    path: "ar",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-sv": {
    id: "home-sv",
    parentId: "root",
    path: "sv",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-da": {
    id: "home-da",
    parentId: "root",
    path: "da",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-el": {
    id: "home-el",
    parentId: "root",
    path: "el",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-es": {
    id: "home-es",
    parentId: "root",
    path: "es",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-he": {
    id: "home-he",
    parentId: "root",
    path: "he",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-hu": {
    id: "home-hu",
    parentId: "root",
    path: "hu",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-it": {
    id: "home-it",
    parentId: "root",
    path: "it",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-ja": {
    id: "home-ja",
    parentId: "root",
    path: "ja",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-ko": {
    id: "home-ko",
    parentId: "root",
    path: "ko",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-pt": {
    id: "home-pt",
    parentId: "root",
    path: "pt",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-ro": {
    id: "home-ro",
    parentId: "root",
    path: "ro",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "home-zh": {
    id: "home-zh",
    parentId: "root",
    path: "zh",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "health-en": {
    id: "health-en",
    parentId: "root",
    path: "health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-de": {
    id: "health-de",
    parentId: "root",
    path: "de/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-fr": {
    id: "health-fr",
    parentId: "root",
    path: "fr/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-tr": {
    id: "health-tr",
    parentId: "root",
    path: "tr/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-ru": {
    id: "health-ru",
    parentId: "root",
    path: "ru/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-cs": {
    id: "health-cs",
    parentId: "root",
    path: "cs/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-uk": {
    id: "health-uk",
    parentId: "root",
    path: "uk/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-ur": {
    id: "health-ur",
    parentId: "root",
    path: "ur/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-pl": {
    id: "health-pl",
    parentId: "root",
    path: "pl/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-nl": {
    id: "health-nl",
    parentId: "root",
    path: "nl/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-ar": {
    id: "health-ar",
    parentId: "root",
    path: "ar/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-sv": {
    id: "health-sv",
    parentId: "root",
    path: "sv/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-da": {
    id: "health-da",
    parentId: "root",
    path: "da/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-el": {
    id: "health-el",
    parentId: "root",
    path: "el/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-es": {
    id: "health-es",
    parentId: "root",
    path: "es/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-he": {
    id: "health-he",
    parentId: "root",
    path: "he/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-hu": {
    id: "health-hu",
    parentId: "root",
    path: "hu/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-it": {
    id: "health-it",
    parentId: "root",
    path: "it/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-ja": {
    id: "health-ja",
    parentId: "root",
    path: "ja/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-ko": {
    id: "health-ko",
    parentId: "root",
    path: "ko/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-pt": {
    id: "health-pt",
    parentId: "root",
    path: "pt/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-ro": {
    id: "health-ro",
    parentId: "root",
    path: "ro/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "health-zh": {
    id: "health-zh",
    parentId: "root",
    path: "zh/health",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "clinic-tr": {
    id: "clinic-tr",
    parentId: "root",
    path: "clinic",
    index: void 0,
    caseSensitive: void 0,
    module: route47
  },
  "transfer-en": {
    id: "transfer-en",
    parentId: "root",
    path: "transfers/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route49
  },
  "transfer-localized": {
    id: "transfer-localized",
    parentId: "root",
    path: ":language/transfers/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route49
  },
  "hotel-de": {
    id: "hotel-de",
    parentId: "root",
    path: "de/hotels/:hotelSlug",
    index: void 0,
    caseSensitive: void 0,
    module: route50
  },
  "legal-imprint-en": {
    id: "legal-imprint-en",
    parentId: "root",
    path: "impressum.html",
    index: void 0,
    caseSensitive: void 0,
    module: route64
  },
  "legal-privacy-en": {
    id: "legal-privacy-en",
    parentId: "root",
    path: "privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route64
  },
  "legal-privacy-de": {
    id: "legal-privacy-de",
    parentId: "root",
    path: "de/datenschutz",
    index: void 0,
    caseSensitive: void 0,
    module: route64
  },
  "legal-imprint-de": {
    id: "legal-imprint-de",
    parentId: "root",
    path: "de/impressum",
    index: void 0,
    caseSensitive: void 0,
    module: route64
  },
  "legal-privacy-tr": {
    id: "legal-privacy-tr",
    parentId: "root",
    path: "tr/gizlilik",
    index: void 0,
    caseSensitive: void 0,
    module: route64
  },
  "legal-imprint-tr": {
    id: "legal-imprint-tr",
    parentId: "root",
    path: "tr/kunye",
    index: void 0,
    caseSensitive: void 0,
    module: route64
  },
  "legal-privacy-ru": {
    id: "legal-privacy-ru",
    parentId: "root",
    path: "ru/privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route64
  },
  "legal-imprint-ru": {
    id: "legal-imprint-ru",
    parentId: "root",
    path: "ru/impressum",
    index: void 0,
    caseSensitive: void 0,
    module: route64
  },
  "legal-privacy-cs": {
    id: "legal-privacy-cs",
    parentId: "root",
    path: "cs/privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route64
  },
  "legal-imprint-cs": {
    id: "legal-imprint-cs",
    parentId: "root",
    path: "cs/impressum",
    index: void 0,
    caseSensitive: void 0,
    module: route64
  },
  "legal-privacy-uk": {
    id: "legal-privacy-uk",
    parentId: "root",
    path: "uk/privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route64
  },
  "legal-imprint-uk": {
    id: "legal-imprint-uk",
    parentId: "root",
    path: "uk/impressum",
    index: void 0,
    caseSensitive: void 0,
    module: route64
  },
  "legal-privacy-ur": {
    id: "legal-privacy-ur",
    parentId: "root",
    path: "ur/privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route64
  },
  "legal-imprint-ur": {
    id: "legal-imprint-ur",
    parentId: "root",
    path: "ur/impressum",
    index: void 0,
    caseSensitive: void 0,
    module: route64
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
