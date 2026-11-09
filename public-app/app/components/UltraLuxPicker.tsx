import { ULTRA_LUX } from "../../../supabase/functions/_shared/ultra-lux.js";
import { ultraLuxVehicles, type UltraLuxVehicle } from "../lib/booking";
import { ultraLuxCopy } from "../lib/ultra-lux-copy";

// Photos per vehicle in /assets/optimized/ultra-lux/, numbered from 1; the first is the cover.
const photos: Record<UltraLuxVehicle, { slug: string; count: number }> = {
  lux_lounge: { slug: "lux-lounge", count: 4 },
  lux_sprinter: { slug: "lux-sprinter", count: 5 },
  maybach: { slug: "maybach", count: 5 },
};

/** The Ultra Lux Edition block of the daily-hire form: three vehicles to pick from, with photos. */
export function UltraLuxPicker({ language, selected, onSelect, formatPrice = (eur) => `€${eur}` }: {
  language: string;
  selected: string;
  onSelect: (vehicle: UltraLuxVehicle) => void;
  formatPrice?: (eur: number) => string;
}) {
  const copy = ultraLuxCopy(language);
  return (
    <section className="ultra-lux" aria-labelledby="ultra-lux-title">
      <h3 id="ultra-lux-title">Ultra Lux Edition</h3>
      <p className="ultra-lux-note">{copy.note}</p>
      <div className="ultra-lux-cards">
        {ultraLuxVehicles.map((vehicle) => {
          const { name, dailyRateEur, maxGuests } = ULTRA_LUX[vehicle];
          const { slug, count } = photos[vehicle];
          return (
            <article className={`ultra-lux-card${selected === vehicle ? " selected" : ""}`} key={vehicle}>
              {/* Scroll-snap strip: swipeable, and focusable so keyboard users can scroll it. */}
              <div className="ultra-lux-photos" tabIndex={0} role="group" aria-label={name}>
                {Array.from({ length: count }, (_, index) => (
                  <img key={index} src={`/assets/optimized/ultra-lux/${slug}-${index + 1}.webp`} alt={`${name} ${index + 1}/${count}`} loading="lazy" decoding="async" />
                ))}
              </div>
              <button type="button" className="ultra-lux-select" aria-pressed={selected === vehicle} onClick={() => onSelect(vehicle)}>
                <strong>{name}</strong>
                <span>{copy.seats.replace("{n}", String(maxGuests))}</span>
                <span className="ultra-lux-price">{formatPrice(dailyRateEur)} <small>{copy.perDay}</small></span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
