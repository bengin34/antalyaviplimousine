import { useId, useMemo, useState } from "react";
import { hotelIndex } from "../../../src/hotel-index.js";
import { searchHotels } from "../../../src/hotel-search.js";
import { Icon } from "./Icon";

export type IndexedHotel = (typeof hotelIndex)[number];

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
 */
export function HotelCombobox({
  id,
  value,
  onChange,
  onSelect,
  onNotListed,
  placeholder,
  regionLabel,
  notListedLabel,
  noResultsLabel,
  describedBy,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (hotel: IndexedHotel) => void;
  onNotListed?: () => void;
  placeholder: string;
  regionLabel: (region: string) => string;
  notListedLabel: string;
  noResultsLabel: string;
  describedBy?: string;
}) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const matches = useMemo(() => (open ? searchHotels(value) : []), [open, value]);
  const showEmptyNote = open && matches.length === 0 && value.trim().length >= 2;

  const close = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const choose = (hotel: IndexedHotel) => {
    onSelect(hotel);
    close();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
          aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          aria-describedby={describedBy}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onBlur={close}
        />
      </div>
      {/* Keep focus on the input so the blur handler does not close the list
          before a click on one of its options is delivered. */}
      {(matches.length > 0 || showEmptyNote) && (
        <div className="hotel-combobox-popover" onMouseDown={(event) => event.preventDefault()}>
          <ul className="hotel-combobox-list" id={listId} role="listbox">
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
