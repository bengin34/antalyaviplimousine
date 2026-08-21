# Airport meet-fee override

## Goal

Let an administrator exclude the airport meet-and-greet cost for a particular
booking when passengers will be collected from the airport without a greeting.

## Design

Add `airport_meet_fee_applies BOOLEAN NOT NULL DEFAULT TRUE` to `bookings`.
Existing rows therefore preserve the current calculation. The authenticated
admin update grant includes the new column.

The booking detail's editable transfer section shows a checkbox labelled
"Karşılama ücreti uygulanmasın" only when the outbound pickup is the airport
and the booking is not a daily chauffeur hire. Saving the form persists the
inverse value (`false`). Switching the pickup away from the airport retains
the preference but it has no effect; it becomes effective again if the pickup
is changed back to the airport.

Profit/loss data loading requests the column. An airport-originated,
non-daily-chauffeur leg adds the existing €5 cost only when the booking's value
is not `false`. Missing values are treated as `true` to keep historical data
and partially deployed clients backward compatible.

## Verification

Unit tests prove that an airport-origin booking with the stored override has
zero meet cost while the default still incurs €5. Component tests verify the
detail editor exposes the setting under the correct condition and sends the
persisted value. The existing profit-loss and admin test suites remain green.
