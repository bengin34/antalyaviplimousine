# Findings detail

## vip/server-price-region-hotel-mismatch — medium (confirmed)

Trace: `create-booking/index.ts:148` reads `dropoff_location` → `transfer-price.ts:42` `airportTariffRegion` returns it as the tariff region → `index.ts:425-431` loads the `routes` row for that region → `payment.ts:15` allows card on any positive price. The hotel name (`index.ts:161,251`) is only validated by `isValidHotelName`. Hotel-to-hotel has the same gap on the destination end (`index.ts:417`).

Result (from source): an anonymous booker pays the cheaper region's tariff for a hotel in a pricier region; the operator email shows hotel and region without a mismatch flag.

Verified by an independent verifier (`verify-region`), who did not hunt. Not executed.

Fix: resolve the destination hotel with `resolveHotelRegion`; mismatch → 400; hotel not in index → operator quote (no card); add region row to the operator email; vitest on `transfer-price`. Tracked as MEN-242.
