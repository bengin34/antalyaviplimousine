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
- `videoTitle` and `videoCardTitle` contain `<br />` — wrap in the existing `<LineBreakText>` component (same pattern as lines 934, 1079 of `HomePage.tsx`). Do **not** use `dangerouslySetInnerHTML` or plain `{t(...)}`.
- Right-side subtitle `<p>`: muted color, 15px, weight 300, max-width 420px — matches `.section-heading > p`.

### Video card (horizontal, style A)
- Single card: flex row, portrait thumbnail left, copy right.
- Border: `1px solid var(--line)`, hover → `border-color: var(--gold)`.
- Padding: `40px 48px`, max-width `880px`.
- Entire card is clickable (`onClick` on the outer div — opens modal).

**Mobile layout (≤600px breakpoint):**
- Card switches from `flex-row` to `flex-column` (thumbnail stacks on top, copy below).
- Thumbnail: `width: 100%`, keep `aspect-ratio: 9/16`, `max-width: 200px`, centered.
- Copy: full width, centered text alignment.

**Tablet (601px–900px):**
- Keep flex-row but reduce thumbnail to `110px` width, reduce card padding to `24px 28px`.

**Thumbnail:**
- Width: `140px` (desktop), `aspect-ratio: 9/16`, `object-fit: cover`.
- Source: `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`.
- Gold play button overlay (52×52px circle, `background: var(--gold)`, dark triangle inside).

**Copy:**
- Mini-label: `10px`, `letter-spacing: 0.24em`, `color: var(--gold-dark)`, uppercase.
- `<h3>`: Italiana serif, ~32px, weight 400. Wrap in `<LineBreakText>`.
- Body `<p>`: muted, 14px, line-height 1.8, max-width 340px.
- CTA button: `.button.button-outline-gold` — existing site button class. `type="button"`.

### Modal (lightbox)
- Native `<dialog>` element — zero new dependencies.
- Backdrop: `rgba(0,0,0,0.85)` via `::backdrop` pseudo-element.
- Content: YouTube `<iframe>`, `width: 100%`, `aspect-ratio: 9/16`, max-width `380px`.
- **Open:** `dialogRef.current.showModal()`, set iframe `src` to `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`.
- **Close via ✕ button:** `dialogRef.current.close()`, then set `iframeRef.current.src = ""` (stops video).
- **Close via backdrop click:** attach `onClick` on the `<dialog>` element itself; check `event.target === dialogRef.current` (the backdrop renders as the dialog element's area outside the inner content box). If true, close + clear src. Do **not** add a listener on `::backdrop` — it is a CSS pseudo-element, not a DOM event target.
- **Close via Escape key:** native `<dialog>` handles this; listen for the `cancel` event on the dialog to also clear iframe src.
- ✕ button: positioned `top: 12px; right: 12px`, `background: rgba(255,255,255,0.1)`, 36×36px circle.

**iframe attributes required:**
```jsx
<iframe
  ref={iframeRef}
  src=""
  title="Meet & greet at Antalya Airport"
  allow="autoplay; fullscreen"
  allowFullScreen
  style={{ width: "100%", aspectRatio: "9/16", border: 0, display: "block" }}
/>
```
`allow="autoplay"` is required — without it, `?autoplay=1` silently fails on most browsers.

---

## Video Source

- Platform: YouTube (unlisted or public).
- Orientation: vertical (9:16).
- `VIDEO_ID` constant at top of `HomePage.tsx`, value `"PLACEHOLDER"`.
- **Conditional render:** if `VIDEO_ID === "PLACEHOLDER"`, the entire section does **not** render. This prevents a broken thumbnail and malformed iframe src on the live site before the real ID is swapped in.

```tsx
const VIDEO_ID = "PLACEHOLDER"; // replace with real YouTube video ID before deploy

// In JSX:
{VIDEO_ID !== "PLACEHOLDER" && (
  <section className="video section" id="video">
    ...
  </section>
)}
```

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

Keys with `<br />` must be rendered via `<LineBreakText value={t(key, fallback)} />`.  
All other keys use plain `{t(key, fallback)}`.

---

## Files Changed

| File | Change |
|------|--------|
| `public-app/app/components/HomePage.tsx` | Add `VIDEO_ID` constant, video section JSX, `dialogRef`, `iframeRef`, open/close handlers |
| `public-app/app/react-public.css` | Add `.video-card`, `.video-thumb`, `.video-play-btn`, `.video-dialog` styles with mobile breakpoints |

No new npm packages. No changes to routing, i18n infrastructure, or other components.

---

## Accessibility

- `<dialog>` traps focus natively when open.
- Outer card div: `role="button"`, `tabIndex={0}`, `onKeyDown` fires open on Enter/Space.
- Play button overlay: `aria-label="Watch meet & greet video"`.
- Dialog: `aria-label="Airport meet and greet video"`.
- `<iframe>` has `title="Meet & greet at Antalya Airport"`.
- Pressing Escape closes dialog (native); `cancel` event listener clears iframe src.
