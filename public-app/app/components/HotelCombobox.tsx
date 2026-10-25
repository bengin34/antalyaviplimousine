import { useId, useMemo, useState } from "react";
import type { HotelData, IndexedHotel } from "../lib/hotel-data";
import { Icon } from "./Icon";

/**
 * Hotel name field with suggestions from the static hotel index.
 *
 * Guests know their hotel, not the pricing region it sits in, so this is the
 * field that answers the question they can answer. Picking a suggestion hands
 * the caller the matching hotel, which is how the booking form fills in the
 * region — and therefore the price — on the guest's behalf.
 *
 * The guest is never trapped by the list: whatever they type stays in the
 * field, and `notListedLabel` dismisses the suggestions so they can carry on
 * with a hotel we have not indexed yet.
 *
 * `search` arrives from the parent and is null until the hotel index has
 * loaded (see ../lib/hotel-data), which `onEngage` asks for the moment the
 * guest reaches this field. While it is null the field takes input and offers
 * nothing — never "no hotel found", which would be a claim about an index that
 * is not here yet.
 */
export function HotelCombobox({
  id,
  value,
  onChange,
  onSelect,
  onNotListed,
  search,
  onEngage,
  placeholder,
  regionLabel,
  notListedLabel,
  noResultsLabel,
  describedBy,
  invalid = false,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (hotel: IndexedHotel) => void;
  onNotListed?: () => void;
  search: HotelData["searchHotels"] | null;
  onEngage: () => void;
  placeholder: string;
  regionLabel: (region: string) => string;
  notListedLabel: string;
  noResultsLabel: string;
  describedBy?: string;
  invalid?: boolean;
}) {
  const listId = useId();
  const statusId = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const matches = useMemo(() => (open && search ? search(value) : []), [open, search, value]);
  const showEmptyNote = Boolean(search) && open && matches.length === 0 && value.trim().length >= 2;

  const close = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const choose = (hotel: IndexedHotel) => {
    onSelect(hotel);
    close();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") onEngage();
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

  return (
    <div className="hotel-combobox">
      <div className="field-control">
        <Icon name="pin" className="icon" />
        <input
          id={id}
          type="text"
          role="combobox"
          autoComplete="off"
          maxLength={120}
          placeholder={placeholder}
          value={value}
          aria-expanded={open && matches.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-invalid={invalid || undefined}
          aria-busy={open && !search ? true : undefined}
          aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          aria-describedby={describedBy ? `${describedBy} ${statusId}` : statusId}
          onFocus={onEngage}
          onChange={(event) => {
            onEngage();
            onChange(event.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onBlur={close}
        />
      </div>
      {/* Suggestions appear and disappear as the guest types, with no other
          cue that the list changed. This says how many there are; it stays
          in the DOM so the live region is registered before it updates. */}
      <span className="sr-only" id={statusId} role="status" aria-live="polite">
        {open && matches.length > 0
          ? `${matches.length} hotel suggestions available. Use the arrow keys to review them.`
          : showEmptyNote
            ? noResultsLabel
            : ""}
      </span>
      {/* Keep focus on the input so the blur handler does not close the list
          before a click on one of its options is delivered. The dismiss
          button stays reachable even with an empty field or a single
          character typed, so a guest who knows their hotel is not listed
          is never stuck waiting on a second keystroke to say so. */}
      {open && (
        <div className="hotel-combobox-popover" onMouseDown={(event) => event.preventDefault()}>
          <ul className="hotel-combobox-list" id={listId} role="listbox" aria-label={placeholder}>
            {matches.map((hotel, index) => (
              <li
                key={hotel.slug}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                className={`hotel-combobox-option${index === activeIndex ? " is-active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => choose(hotel)}
              >
                <span className="hotel-combobox-name">{hotel.name}</span>
                <span className="hotel-combobox-meta">{hotel.district} · {regionLabel(hotel.region)}</span>
              </li>
            ))}
          </ul>
          {showEmptyNote && <p className="hotel-combobox-empty">{noResultsLabel}</p>}
          <button
            type="button"
            className="hotel-combobox-dismiss"
            onClick={() => {
              close();
              onNotListed?.();
            }}
          >
            {notListedLabel}
          </button>
        </div>
      )}
    </div>
  );
}
