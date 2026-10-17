/**
 * The three Land of Legends strings the airport booking form shows (journey
 * option, hint, details link), without the excursion's full 23-language copy.
 *
 * The route loader passes the page language's strings in, so the first
 * render matches the prerendered HTML. If the visitor switches language on
 * the page, the new language's copy file is fetched on demand.
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { LandOfLegendsCopy } from "./land-of-legends-copy";
import type { LandOfLegendsLanguage } from "./land-of-legends-languages";

export type LandOfLegendsBookingCopy = Pick<LandOfLegendsCopy, "tripOption" | "tripHint" | "detailsLink">;
export type LandOfLegendsBookingCopyByLanguage = Partial<Record<LandOfLegendsLanguage, LandOfLegendsBookingCopy>>;

const copyModules = import.meta.glob<Record<string, LandOfLegendsCopy>>("./land-of-legends-copy/*.ts");
const loadedCopy = new Map<LandOfLegendsLanguage, LandOfLegendsBookingCopy>();

const pickBookingCopy = ({ tripOption, tripHint, detailsLink }: LandOfLegendsCopy): LandOfLegendsBookingCopy =>
  ({ tripOption, tripHint, detailsLink });

async function loadBookingCopy(language: LandOfLegendsLanguage) {
  const load = copyModules[`./land-of-legends-copy/${language}.ts`];
  if (!load) throw new Error(`No Land of Legends copy for ${language}`);
  const copy = (await load())[language];
  if (!copy) throw new Error(`Land of Legends copy for ${language} is empty`);
  const bookingCopy = pickBookingCopy(copy);
  loadedCopy.set(language, bookingCopy);
  return bookingCopy;
}

const BookingCopyContext = createContext<LandOfLegendsBookingCopyByLanguage>({});

export function LandOfLegendsBookingCopyProvider({
  copy,
  children,
}: {
  /** From the route loader: the page language's strings. */
  copy: LandOfLegendsBookingCopyByLanguage;
  children: ReactNode;
}) {
  return <BookingCopyContext.Provider value={copy}>{children}</BookingCopyContext.Provider>;
}

/**
 * Strings for `language`. Until another language's copy has arrived, the
 * strings the page was rendered with stay on screen.
 */
export function useLandOfLegendsBookingCopy(language: LandOfLegendsLanguage): LandOfLegendsBookingCopy | null {
  const initial = useContext(BookingCopyContext);
  const [fetched, setFetched] = useState<LandOfLegendsBookingCopyByLanguage>({});
  const available = initial[language] ?? fetched[language] ?? loadedCopy.get(language);

  useEffect(() => {
    if (available) return;
    let active = true;
    loadBookingCopy(language).then(
      (copy) => {
        if (active) setFetched((current) => ({ ...current, [language]: copy }));
      },
      () => {
        // The chunk could not be fetched: keep the strings already shown.
      },
    );
    return () => {
      active = false;
    };
  }, [available, language]);

  if (available) return available;
  const shown = Object.values(initial)[0] ?? Object.values(fetched)[0];
  return shown ?? null;
}
