import { useLoaderData } from "react-router";
import { hotelBySlug } from "../../../src/hotels.js";
import { CookieConsent } from "../components/CookieConsent";
import { HotelPage } from "../components/HotelPage";
import { LanguageProvider } from "../i18n";
import { LandOfLegendsBookingCopyProvider } from "../lib/land-of-legends-booking-copy";
import { landOfLegendsBookingCopy, pageMessages } from "../lib/page-data.server";
import { hotelMeta } from "../lib/seo";

export function loader({ params }: { params: Record<string, string | undefined> }) {
  const hotel = hotelBySlug(params.hotelSlug ?? "");
  if (!hotel) throw new Response("Not found", { status: 404 });
  return {
    language: "de" as const,
    hotel,
    meta: hotelMeta(hotel.slug),
    messages: pageMessages("de"),
    landOfLegendsBooking: landOfLegendsBookingCopy("de"),
  };
}

export const meta = ({ loaderData }: { loaderData?: ReturnType<typeof loader> }) => loaderData?.meta ?? [];

export default function HotelRoute() {
  const { hotel, messages, landOfLegendsBooking } = useLoaderData<typeof loader>();
  return (
    <LanguageProvider initialLanguage="de" messages={messages}>
      <LandOfLegendsBookingCopyProvider copy={landOfLegendsBooking}>
        <HotelPage hotel={hotel} />
      </LandOfLegendsBookingCopyProvider>
      <CookieConsent />
    </LanguageProvider>
  );
}
