import { useLoaderData } from "react-router";
import { hotelBySlug } from "../../../src/hotels.js";
import { CookieConsent } from "../components/CookieConsent";
import { HotelPage } from "../components/HotelPage";
import { LanguageProvider } from "../i18n";
import { hotelMeta } from "../lib/seo";

export function loader({ params }: { params: Record<string, string | undefined> }) {
  const hotel = hotelBySlug(params.hotelSlug ?? "");
  if (!hotel) throw new Response("Not found", { status: 404 });
  return { language: "de" as const, hotel };
}

export const meta = ({ loaderData }: { loaderData?: ReturnType<typeof loader> }) => hotelMeta(loaderData?.hotel.slug ?? "");

export default function HotelRoute() {
  const { hotel } = useLoaderData<typeof loader>();
  return <LanguageProvider initialLanguage="de"><HotelPage hotel={hotel} /><CookieConsent /></LanguageProvider>;
}
