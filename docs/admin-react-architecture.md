# Admin React Architecture

The `/admin/` application is a React + TypeScript SPA built by the existing Vite multi-page build. The public marketing pages remain framework-free.

## Entry points

- `admin/index.html` loads `admin/react/main.tsx`.
- `admin/react/App.tsx` owns session state and preserves the existing hash URLs.
- `admin/react/styles.css` loads Tailwind and the existing admin visual system in `admin/admin.css`.
- `public/admin/service-worker.js` provides the existing offline shell and asset cache.

## Routes

| Hash | React view |
| --- | --- |
| `#login` | Login |
| `#timeline` | Upcoming transfers |
| `#timeline?tab=past` | Past transfers |
| `#new` | New booking |
| `#detail/{booking_ref}` | Outbound booking detail |
| `#detail/{booking_ref}?leg=return` | Return-leg detail |
| `#budget` | Budget dashboard |
| `#profit-loss` | Profit/loss dashboard |
| `#admin` | Marketing export tools |

## Preserved domain modules

The DOM-free calculation and formatting modules remain shared JavaScript modules so their existing tests and contracts are unchanged:

- `budget-metrics.js`
- `profit-loss-metrics.js`
- `search-match.js`
- `turkish-formatters.js`
- `whatsapp-templates.js`

All rendering, state, forms, timers, authentication flow, offline handling, mutations, and navigation are implemented in React.

## Verification

```sh
npm run typecheck
npm test
npm run build
```
