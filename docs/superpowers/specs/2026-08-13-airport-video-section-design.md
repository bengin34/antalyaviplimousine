# Airport Meet & Greet Video Section — Design Spec

**Date:** 2026-08-13  
**Status:** Approved

---

## Summary

Add a video section to the homepage that shows real meet & greet operations at Antalya Airport. Placed after the reviews section to serve curious, already-interested visitors without interrupting the primary trust-building sequence.

---

## Placement

- After `<section className="reviews section-dark">`, before the existing `<section className="process section">`.
- Sits between two existing sections with no structural changes to surrounding content.

---

## Design

### Section shell
- Background: `var(--paper)` — light, creates visual contrast after dark reviews section.
- Padding/max-width: uses existing `.section` class pattern (`max-width: 1440px`, `padding: 130px var(--section-x)`).
- No dark overlay; this is a standard light section.

### Section heading
- Eyebrow: `.eyebrow` (gold line + uppercase gold-dark label).
- `<h2>`: Italiana serif, font-weight 400, existing `.section-heading h2` sizing.
- Right-side subtitle `<p>`: muted color, 15px, weight 300, max-width 420px — matches `.section-heading > p`.

### Video card (horizontal, style A)
- Single card: flex row, portrait thumbnail left, copy right.
- Border: `1px solid var(--line)`, hover → `border-color: var(--gold)`.
- Padding: `40px 48px`, max-width `880px`.
- Entire card is clickable (opens modal).

**Thumbnail:**
- Width: `140px`, `aspect-ratio: 9/16`, `object-fit: cover`.
- Source: `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`.
- Gold play button overlay (52×52px circle, `background: var(--gold)`, dark triangle inside).

**Copy:**
- Mini-label: `10px`, `letter-spacing: 0.24em`, `color: var(--gold-dark)`, uppercase.
- `<h3>`: Italiana serif, ~32px, weight 400.
- Body `<p>`: muted, 14px, line-height 1.8, max-width 340px.
- CTA button: `.button.button-outline-gold` — existing site button class.

### Modal (lightbox)
- Native `<dialog>` element — zero new dependencies.
- Backdrop: `rgba(0,0,0,0.85)` via `::backdrop` pseudo-element.
- Content: YouTube `<iframe>`, `width: 100%`, `aspect-ratio: 9/16`, max-width ~380px.
- **Open:** `dialog.showModal()`, inject `?autoplay=1` into iframe `src`.
- **Close:** clicking `::backdrop` or ✕ button → `dialog.close()`, clear iframe `src` (stops video).
- ✕ button: top-right, `background: rgba(255,255,255,0.1)`, 36×36px circle.

---

## i18n Keys

| Key | Default (English) |
|-----|-------------------|
| `videoEyebrow` | `"Behind the scenes"` |
| `videoTitle` | `"See how we welcome<br />you at the airport."` |
| `videoSubtitle` | `"A glimpse of our meet & greet operations at Antalya Airport — the moment your journey begins."` |
| `videoCardTitle` | `"Meet & greet at<br />Antalya Airport"` |
| `videoCardBody` | `"Watch how our chauffeurs welcome guests in arrivals — the personalised name sign, luggage assistance, and the first moments of your VIP experience."` |
| `videoWatch` | `"Watch the clip"` |
| `videoClose` | `"Close"` |

All keys follow existing `t(key, fallback)` pattern from `i18n.tsx`.

---

## Video Source

- Platform: YouTube (unlisted or public).
- Orientation: vertical (9:16).
- `VIDEO_ID` constant defined at top of `HomePage.tsx` — user replaces placeholder with real ID before deploying.

---

## Files Changed

| File | Change |
|------|--------|
| `public-app/app/components/HomePage.tsx` | Add `VIDEO_ID` constant, video section JSX, dialog open/close handlers |
| `public-app/app/react-public.css` | Add `.video-section`, `.video-card`, `.video-thumb`, `.video-play-btn`, `.video-dialog` styles |

No new npm packages. No changes to routing, i18n infrastructure, or other components.

---

## Accessibility

- `<dialog>` traps focus natively when open.
- Play button has `aria-label="Watch meet & greet video"`.
- Dialog has `aria-label="Airport video"`.
- `<iframe>` has descriptive `title` attribute.
- Pressing Escape closes dialog (native `<dialog>` behavior).
