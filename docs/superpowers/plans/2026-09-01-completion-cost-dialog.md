# Tamamlanan Transfer Maliyet Dialogu — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bir transfer ayağı `completed` işaretlendiği anda o ayağın tüm maliyet girdilerini tek-ayak bir dialogda topla; kâr/zarar ekranında sonradan düzeltme gerekmesin.

**Architecture:** Kâr/zarar motoruna saf tamamlanma-durumu yardımcısı eklenir; mevcut kâr/zarar kaydetme fonksiyonları ortak bir modüle taşınır; `BookingDetailPage` tamamlama akışına, mevcut `LegCostControls` editörlerini yeniden kullanan tek-ayak `CostDialog` bağlanır. Karşılama ücreti sabit 5 EUR yerine sabit 250 ₺ (TL kaynaklı) olur.

**Tech Stack:** React 18 + TypeScript (admin SPA), Supabase JS, Vitest.

**Referans spec:** `docs/superpowers/specs/2026-09-01-completion-cost-dialog-design.md`

**Test komutu:** `npx vitest run <dosya>` · tüm suite `npm test`

---

## Dosya yapısı

| Dosya | Sorumluluk |
|-------|-----------|
| `admin/profit-loss-metrics.js` | (mod) karşılama 250 ₺ TL kaynaklı; `bookingLegCostStatus` yardımcısı; `startsFromAirport` export |
| `admin/profit-loss-metrics.test.js` | (mod) karşılama + yardımcı testleri |
| `admin/react/lib/leg-cost-actions.ts` | (yeni) saf Supabase kaydetme eylemleri: distance/supplier/mode/meetFee |
| `admin/react/lib/leg-cost-actions.test.ts` | (yeni) eylem testleri (supabase mock) |
| `admin/react/pages/ProfitLossPage.tsx` | (mod) kaydetme mantığını ortak modülden kullan |
| `admin/react/components/CostDialog.tsx` | (yeni) tek-ayak maliyet dialogu |
| `admin/react/components/CostDialog.test.tsx` | (yeni) dialog davranış testleri |
| `admin/react/pages/BookingDetailPage.tsx` | (mod) tamamlama kancası + maliyet bandı |
| `admin/react/pages/BookingDetailPage.cost.test.tsx` | (yeni) band + kanca testleri |
| `admin/admin.css` | (mod) dialog + band stilleri |

---

## Task 1: Karşılama ücreti 250 ₺ (TL kaynaklı)

**Files:**
- Modify: `admin/profit-loss-metrics.js:5`, `:520-523`, `:635-637`
- Modify: `admin/profit-loss-metrics.js:25` (`startsFromAirport` export)
- Test: `admin/profit-loss-metrics.test.js`

- [ ] **Step 1: Karşılama testini güncelle/yaz (failing)**

`profit-loss-metrics.test.js` içinde karşılama gideri bekleyen mevcut testleri bul (ör. `AIRPORT_MEET_COST_EUR` veya `airportMeetCost` geçenler) ve 250 ₺ beklentisiyle güncelle. Ek olarak yeni test:

```js
test('havalimanı-başlangıç ayağı sabit 250 ₺ karşılama gideri taşır', () => {
  const booking = makeBooking({ pickup_location: 'airport', dropoff_location: 'belek', service_cost_mode: 'own_vehicle', manual_outbound_distance_km: 40 })
  const { resolvedLegs } = resolveRealizedLegs([booking], '2026-09-01', { '2026-09': { eurTryRate: 50, kmCostTry: 15 } })
  const out = resolvedLegs.find(l => l.leg === 'outbound')
  expect(out.airportMeetCostTry).toBe(250)
  expect(out.airportMeetCostEur).toBeCloseTo(5, 6) // 250 / 50
})

test('airport_meet_fee_applies=false karşılamayı sıfırlar', () => {
  const booking = makeBooking({ pickup_location: 'airport', dropoff_location: 'belek', service_cost_mode: 'own_vehicle', manual_outbound_distance_km: 40, airport_meet_fee_applies: false })
  const { resolvedLegs } = resolveRealizedLegs([booking], '2026-09-01', { '2026-09': { eurTryRate: 50, kmCostTry: 15 } })
  expect(resolvedLegs.find(l => l.leg === 'outbound').airportMeetCostTry).toBe(0)
})
```

(Mevcut `makeBooking` yardımcısını dosyadaki örüntüye göre kullan; yoksa inline booking nesnesi kur.)

- [ ] **Step 2: Testi çalıştır, kırmızı gör**

Run: `npx vitest run admin/profit-loss-metrics.test.js`
Expected: FAIL (250 beklenirken ~5*rate dönüyor / `AIRPORT_MEET_COST_TRY` yok).

- [ ] **Step 3: Sabiti TL'ye çevir**

`:5` satırını değiştir:
```js
export const AIRPORT_MEET_COST_TRY = 250
```

- [ ] **Step 4: `resolveRealizedLegs` karşılamayı TL kaynaklı üret** (`:520-523`)

```js
      legDetails.airportMeetCostTry = !leg.isDailyChauffeur && startsFromAirport(leg.from) && booking.airport_meet_fee_applies !== false
        ? AIRPORT_MEET_COST_TRY
        : 0
      legDetails.airportMeetCostEur = eurTryRate > 0 ? legDetails.airportMeetCostTry / eurTryRate : 0
```

- [ ] **Step 5: Dağıtım hesabında EUR'yu TL'den üret** (`:635-637`)

```js
  const airportMeetCostTry = roundMoney(leg.airportMeetCostTry ?? 0)
  const airportMeetCostEur = centsToNumber(multiplyDivideMoneyToCents(airportMeetCostTry, 1, eurTryRate))
```

- [ ] **Step 6: `startsFromAirport`'ı export et** (`:25`)

`function startsFromAirport` → `export function startsFromAirport`.

- [ ] **Step 7: Testleri çalıştır, yeşil gör**

Run: `npx vitest run admin/profit-loss-metrics.test.js`
Expected: PASS. Kırılan başka karşılama/dağıtım testi varsa 250 ₺ modeline göre güncelle (beklentiler artık TL kaynaklı).

- [ ] **Step 8: Commit**

```bash
git add admin/profit-loss-metrics.js admin/profit-loss-metrics.test.js
git commit -m "Karşılama ücreti: sabit 250₺ (TL kaynaklı hesap)"
```

---

## Task 2: `bookingLegCostStatus` yardımcısı

**Files:**
- Modify: `admin/profit-loss-metrics.js` (yeni export fonksiyon, dosya sonuna yakın)
- Test: `admin/profit-loss-metrics.test.js`

- [ ] **Step 1: Test yaz (failing)**

```js
describe('bookingLegCostStatus', () => {
  const settings = { '2026-09': { eurTryRate: 50, kmCostTry: 15 } }
  test('own_vehicle bilinmeyen rota → incomplete', () => {
    const b = makeBooking({ pickup_location: 'private_address', dropoff_location: 'private_address', service_cost_mode: 'own_vehicle' })
    const s = bookingLegCostStatus(b, 'outbound', '2026-09-01', settings)
    expect(s.applicable).toBe(true)
    expect(s.complete).toBe(false)
    expect(s.costMode).toBe('own_vehicle')
  })
  test('own_vehicle bilinen rota → complete', () => {
    const b = makeBooking({ pickup_location: 'airport', dropoff_location: 'belek', service_cost_mode: 'own_vehicle' })
    expect(bookingLegCostStatus(b, 'outbound', '2026-09-01', settings).complete).toBe(true)
  })
  test('sold_transfer → complete, no_cost → complete', () => {
    const sold = makeBooking({ service_cost_mode: 'sold_transfer', sold_transfer_cost_try: 900 })
    const none = makeBooking({ service_cost_mode: 'no_cost' })
    expect(bookingLegCostStatus(sold, 'outbound', '2026-09-01', settings).complete).toBe(true)
    expect(bookingLegCostStatus(none, 'outbound', '2026-09-01', settings).complete).toBe(true)
  })
  test('one_way rezervasyonda return → applicable:false', () => {
    const b = makeBooking({ trip_type: 'one_way' })
    expect(bookingLegCostStatus(b, 'return', '2026-09-01', settings).applicable).toBe(false)
  })
  test('havalimanı-başlangıç → meetFeeApplicable true', () => {
    const b = makeBooking({ pickup_location: 'airport', dropoff_location: 'belek', service_cost_mode: 'own_vehicle' })
    const s = bookingLegCostStatus(b, 'outbound', '2026-09-01', settings)
    expect(s.meetFeeApplicable).toBe(true)
    expect(s.meetFeeApplies).toBe(true)
  })
})
```

> Not: makeBooking varsayılanı geçmiş/bugün tarihli ve tamamlanmış ayak üretmeli ki `isRealizedLeg` ayağı dahil etsin (pickup_date ≤ today, status uygun). Dosyadaki mevcut yardımcı bunu sağlamıyorsa test booking'ine `pickup_date: '2026-09-01', status: 'completed'` ekle.

- [ ] **Step 2: Kırmızı gör**

Run: `npx vitest run admin/profit-loss-metrics.test.js -t bookingLegCostStatus`
Expected: FAIL (`bookingLegCostStatus is not a function`).

- [ ] **Step 3: Yardımcıyı yaz**

`legCostModel` ve `resolveRealizedLegs`'in altına ekle:
```js
export function bookingLegCostStatus(booking, leg, today, settingsByMonth = {}, ratesByDate = null) {
  const { resolvedLegs, unresolvedLegs } = resolveRealizedLegs([booking], today, settingsByMonth, ratesByDate)
  const match = [...resolvedLegs, ...unresolvedLegs].find(item => item.leg === leg)
  if (!match) return { applicable: false, complete: true }
  const complete = !unresolvedLegs.some(item => item.leg === leg)
  const { costMode } = legCostModel(booking, leg)
  return {
    applicable: true,
    complete,
    costMode,
    oneWayKm: match.oneWayKm ?? null,
    supplierCostTry: match.supplierCostTry ?? null,
    meetFeeApplicable: startsFromAirport(match.from),
    meetFeeApplies: booking.airport_meet_fee_applies !== false,
    meetCostTry: match.airportMeetCostTry ?? 0,
  }
}
```

- [ ] **Step 4: Yeşil gör**

Run: `npx vitest run admin/profit-loss-metrics.test.js -t bookingLegCostStatus`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add admin/profit-loss-metrics.js admin/profit-loss-metrics.test.js
git commit -m "Motor: bookingLegCostStatus tek-ayak tamamlanma yardımcısı"
```

---

## Task 3: Ortak kaydetme eylemleri (`leg-cost-actions.ts`)

**Files:**
- Create: `admin/react/lib/leg-cost-actions.ts`
- Create: `admin/react/lib/leg-cost-actions.test.ts`
- Modify: `admin/react/pages/ProfitLossPage.tsx:625-704` (mantığı ortak modüle taşı)

Amaç: `ProfitLossPage`'teki dört kaydetme fonksiyonunun **Supabase yazma** kısmını saf, döndüren fonksiyonlara ayır. UI (`setBookings`/`setStatus`) çağıran tarafta kalır.

- [ ] **Step 1: Test yaz (failing)**

`supabase`'i mock'la; her eylemin doğru kolonları update ettiğini ve dönen `Partial<Booking>`'i doğrula.
```ts
import { describe, expect, test, vi, beforeEach } from 'vitest'

const single = vi.fn()
const select = vi.fn(() => ({ single }))
const eq = vi.fn(() => ({ select }))
const update = vi.fn(() => ({ eq }))
vi.mock('./supabase', () => ({ supabase: { from: () => ({ update }) } }))
import { saveLegDistance, saveLegSupplierCost, saveLegCostMode, saveLegMeetFee } from './leg-cost-actions'

beforeEach(() => { vi.clearAllMocks() })

test('saveLegDistance dönüş ayağında return kolonunu yazar', async () => {
  single.mockResolvedValue({ data: { id: 'b1', manual_return_distance_km: 42 }, error: null })
  const patch = await saveLegDistance('b1', 'return', 42)
  expect(update).toHaveBeenCalledWith({ manual_return_distance_km: 42 })
  expect(patch).toEqual({ manual_return_distance_km: 42 })
})

test('saveLegSupplierCost mode+cost yazar', async () => {
  single.mockResolvedValue({ data: { id: 'b1', service_cost_mode: 'sold_transfer', sold_transfer_cost_try: 900 }, error: null })
  const patch = await saveLegSupplierCost('b1', 'outbound', 900)
  expect(update).toHaveBeenCalledWith({ sold_transfer_cost_try: 900, service_cost_mode: 'sold_transfer' })
  expect(patch.sold_transfer_cost_try).toBe(900)
})

test('saveLegMeetFee airport_meet_fee_applies yazar', async () => {
  single.mockResolvedValue({ data: { id: 'b1', airport_meet_fee_applies: false }, error: null })
  const patch = await saveLegMeetFee('b1', false)
  expect(update).toHaveBeenCalledWith({ airport_meet_fee_applies: false })
  expect(patch).toEqual({ airport_meet_fee_applies: false })
})

test('hata fırlatır', async () => {
  single.mockResolvedValue({ data: null, error: { message: 'x' } })
  await expect(saveLegDistance('b1', 'outbound', 10)).rejects.toBeTruthy()
})
```

- [ ] **Step 2: Kırmızı gör**

Run: `npx vitest run admin/react/lib/leg-cost-actions.test.ts`
Expected: FAIL (modül yok).

- [ ] **Step 3: `leg-cost-actions.ts` yaz**

`ProfitLossPage`'teki Supabase mantığını taşı. `legCostColumns` `LegCostEditors`'tan gelir.
```ts
import { supabase } from './supabase'
import { legCostColumns, type CostMode, type LegKey } from '../components/LegCostEditors'
import type { Booking } from '../types'

export async function saveLegDistance(bookingId: string, leg: LegKey, distanceKm: number): Promise<Partial<Booking>> {
  const column = leg === 'return' ? 'manual_return_distance_km' : 'manual_outbound_distance_km'
  const { data, error } = await supabase.from('bookings').update({ [column]: distanceKm }).eq('id', bookingId).select(`id, ${column}`).single()
  if (error || !data) throw error ?? new Error('KM kaydı dönmedi')
  return { [column]: Number((data as Record<string, unknown>)[column]) } as Partial<Booking>
}

export async function saveLegSupplierCost(bookingId: string, leg: LegKey, costTry: number): Promise<Partial<Booking>> {
  const columns = legCostColumns(leg)
  const { data, error } = await supabase.from('bookings').update({ [columns.cost]: costTry, [columns.mode]: 'sold_transfer' }).eq('id', bookingId).select(`id, ${columns.mode}, ${columns.cost}`).single()
  if (error || !data) throw error ?? new Error('Maliyet kaydı dönmedi')
  const saved = data as Record<string, unknown>
  return { [columns.mode]: saved[columns.mode], [columns.cost]: Number(saved[columns.cost]) } as Partial<Booking>
}

export async function saveLegCostMode(bookingId: string, leg: LegKey, nextMode: CostMode): Promise<Partial<Booking>> {
  const columns = legCostColumns(leg)
  const update = nextMode === 'sold_transfer' ? { [columns.mode]: nextMode } : { [columns.mode]: nextMode, [columns.cost]: null }
  const { data, error } = await supabase.from('bookings').update(update).eq('id', bookingId).select(`id, ${columns.mode}, ${columns.cost}`).single()
  if (error || !data) throw error ?? new Error('Maliyet modeli kaydı dönmedi')
  const saved = data as Record<string, unknown>
  return { [columns.mode]: saved[columns.mode], [columns.cost]: saved[columns.cost] } as Partial<Booking>
}

export async function saveLegMeetFee(bookingId: string, applies: boolean): Promise<Partial<Booking>> {
  const { data, error } = await supabase.from('bookings').update({ airport_meet_fee_applies: applies }).eq('id', bookingId).select('id, airport_meet_fee_applies').single()
  if (error || !data) throw error ?? new Error('Karşılama ayarı dönmedi')
  return { airport_meet_fee_applies: (data as Record<string, unknown>).airport_meet_fee_applies as boolean } as Partial<Booking>
}
```

- [ ] **Step 4: Yeşil gör**

Run: `npx vitest run admin/react/lib/leg-cost-actions.test.ts`
Expected: PASS.

- [ ] **Step 5: `ProfitLossPage`'i ortak modüle bağla**

`ProfitLossPage.tsx:625-704` içindeki dört fonksiyonu, ortak eylemi çağırıp dönen patch'i `setBookings`/`setStatus` ile saran ince sarmalayıcılara indir. Örnek `saveDistance`:
```ts
const saveDistance = async (leg: ProfitLegRef, distanceKm: number) => {
  const patch = await saveLegDistance(leg.bookingId, leg.leg === 'return' ? 'return' : 'outbound', distanceKm)
  setBookings(current => current.map(b => b.id === leg.bookingId ? { ...b, ...patch } : b))
  setStatus(`${leg.bookingRef || 'Seyahat'} için tek yön ${formatNumber(Number(patch.manual_outbound_distance_km ?? patch.manual_return_distance_km), 2)} km kaydedildi · Hesap güncellendi`)
}
```
`saveSupplierCost` / `saveCostMode` benzer şekilde; `saveNoCost`'un günlük-hizmet dalı aynen kalır, transfer dalı `saveCostMode(booking, ..., 'no_cost')` yerine yerel `saveCostMode` sarmalayıcısını çağırır. Kullanılmayan importları (`legCostColumns` vb. artık modülde) temizle.

- [ ] **Step 6: Regresyon — ProfitLoss testleri yeşil**

Run: `npx vitest run admin/react/pages/ProfitLossPage.test.tsx admin/react/pages/ProfitLossPage.legfix.test.tsx admin/react/pages/ProfitLossPage.stale.test.tsx admin/react/pages/ProfitLossPage.triplist.test.tsx`
Expected: PASS (davranış değişmedi).

- [ ] **Step 7: Commit**

```bash
git add admin/react/lib/leg-cost-actions.ts admin/react/lib/leg-cost-actions.test.ts admin/react/pages/ProfitLossPage.tsx
git commit -m "Kâr/zarar kaydetme eylemlerini ortak leg-cost-actions modülüne taşı"
```

---

## Task 4: `CostDialog` bileşeni

**Files:**
- Create: `admin/react/components/CostDialog.tsx`
- Create: `admin/react/components/CostDialog.test.tsx`

Props: `{ booking: Booking; leg: 'outbound' | 'return'; today: string; onClose: () => void; onSaved: (updated: Booking) => void }`.

Davranış:
- Tek ayak kartı: `LegCostControls` (mevcut) ile mod + moda göre editör.
- `bookingLegCostStatus` ile `meetFeeApplicable` ise karşılama onay kutusu (250 ₺), `saveLegMeetFee` ile yazar.
- Her kaydetme dönen patch'i yerel `booking`'e uygular (`onSaved`).
- Alt bilgi canlı durum + **Sonra** (`onClose`) / **Kaydet** (`onSaved(current); onClose()`).

- [ ] **Step 1: Test yaz (failing)**

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import CostDialog from './CostDialog'

const base = { id: 'b1', booking_ref: 'AVL-1', trip_type: 'one_way', pickup_location: 'private_address', dropoff_location: 'private_address', service_cost_mode: 'own_vehicle', pickup_date: '2026-09-01', status: 'completed', airport_meet_fee_applies: true } as any

test('own_vehicle bilinmeyen rota → KM editörü ve eksik durumu', () => {
  render(<CostDialog booking={base} leg="outbound" today="2026-09-01" onClose={() => {}} onSaved={() => {}} />)
  expect(screen.getByText(/maliyeti girilmedi|eksik/i)).toBeTruthy()
  expect(screen.getByText(/KM/i)).toBeTruthy()
})

test('karşılama kutusu yalnızca havalimanı-başlangıç ayağında', () => {
  const { rerender } = render(<CostDialog booking={base} leg="outbound" today="2026-09-01" onClose={() => {}} onSaved={() => {}} />)
  expect(screen.queryByText(/Karşılama ücreti/i)).toBeNull()
  const airport = { ...base, pickup_location: 'airport', dropoff_location: 'belek' }
  rerender(<CostDialog booking={airport} leg="outbound" today="2026-09-01" onClose={() => {}} onSaved={() => {}} />)
  expect(screen.getByText(/Karşılama ücreti/i)).toBeTruthy()
})

test('Sonra onClose çağırır', () => {
  const onClose = vi.fn()
  render(<CostDialog booking={base} leg="outbound" today="2026-09-01" onClose={onClose} onSaved={() => {}} />)
  fireEvent.click(screen.getByText('Sonra'))
  expect(onClose).toHaveBeenCalled()
})
```

- [ ] **Step 2: Kırmızı gör**

Run: `npx vitest run admin/react/components/CostDialog.test.tsx`
Expected: FAIL (bileşen yok).

- [ ] **Step 3: `CostDialog.tsx` yaz**

`LegCostControls`, `legLabelFor`, `toLegKey` `LegCostEditors`'tan; `bookingLegCostStatus` motordan; eylemler `leg-cost-actions`'tan. Kaydetme callback'leri patch'i yerel state'e uygular:
```tsx
import { useState } from 'react'
import { LegCostControls, legLabelFor, type CostMode, type LegKey } from './LegCostEditors'
import { bookingLegCostStatus } from '../../profit-loss-metrics.js'
import { saveLegDistance, saveLegSupplierCost, saveLegCostMode, saveLegMeetFee } from '../lib/leg-cost-actions'
import type { Booking } from '../types'

export default function CostDialog({ booking: initial, leg, today, onClose, onSaved }: {
  booking: Booking; leg: LegKey; today: string; onClose: () => void; onSaved: (b: Booking) => void
}) {
  const [booking, setBooking] = useState(initial)
  const apply = (patch: Partial<Booking>) => setBooking(prev => { const next = { ...prev, ...patch }; onSaved(next); return next })
  const status = bookingLegCostStatus(booking, leg, today)
  const legRef = { bookingId: booking.id, bookingRef: booking.booking_ref, leg }
  const legLabel = legLabelFor(leg)
  const oneWayKm = leg === 'return' ? booking.manual_return_distance_km : booking.manual_outbound_distance_km
  const currentCostTry = Number(leg === 'return' ? booking.return_sold_transfer_cost_try : booking.sold_transfer_cost_try) || 0

  return (
    <div className="cost-dialog-overlay" role="dialog" aria-modal="true">
      <div className="cost-dialog">
        <div className="cost-dialog-head">
          <h3>{legLabel} maliyeti</h3>
          <p>{booking.booking_ref} · {booking.customer_name}</p>
        </div>
        <div className="cost-dialog-body">
          <LegCostControls
            booking={booking} legRef={legRef} leg={leg} legLabel={legLabel}
            currentCostTry={currentCostTry} isSoldTransfer={status.costMode === 'sold_transfer'}
            oneWayKm={typeof oneWayKm === 'number' ? oneWayKm : undefined}
            onSaveDistance={async (_l, km) => apply(await saveLegDistance(booking.id, leg, km))}
            onSaveCostMode={async (_b, l, mode: CostMode) => apply(await saveLegCostMode(booking.id, l, mode))}
            onSaveSupplierCost={async (_b, l, cost) => apply(await saveLegSupplierCost(booking.id, l, cost))}
          />
          {status.meetFeeApplicable && (
            <label className="meet-toggle">
              <input type="checkbox" checked={status.meetFeeApplies}
                onChange={async e => apply(await saveLegMeetFee(booking.id, e.target.checked))} />
              <span><strong>Karşılama ücreti · 250 ₺</strong><small>Havalimanı karşılaması. Vermediyseniz kaldırın.</small></span>
            </label>
          )}
        </div>
        <div className="cost-dialog-foot">
          <div className={`cost-dialog-status ${status.complete ? 'is-done' : 'is-need'}`}>
            {status.complete ? 'Maliyet hazır ✓' : `${legLabel} maliyeti girilmedi`}
          </div>
          <div className="cost-dialog-actions">
            <button type="button" className="btn-outline" onClick={onClose}>Sonra</button>
            <button type="button" className="btn" onClick={() => { onSaved(booking); onClose() }}>Kaydet</button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

> `LegCostControls` prop imzasını `LegCostEditors.tsx:228` ile birebir eşle. `autoOpenDistanceEditor` gerekmiyorsa geçme.

- [ ] **Step 4: Yeşil gör**

Run: `npx vitest run admin/react/components/CostDialog.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add admin/react/components/CostDialog.tsx admin/react/components/CostDialog.test.tsx
git commit -m "CostDialog: tek-ayak maliyet dialogu (LegCostControls yeniden kullanır)"
```

---

## Task 5: Tamamlama kancası + detay bandı

**Files:**
- Modify: `admin/react/pages/BookingDetailPage.tsx` (import, state, `updateStatus`, band render)
- Create: `admin/react/pages/BookingDetailPage.cost.test.tsx`

- [ ] **Step 1: Band + kanca testi yaz (failing)**

```tsx
// Tamamlanmış own_vehicle bilinmeyen rota → "Maliyet eksik" bandı görünür
// Tamamlanmış sold_transfer → özet + "Düzenle" görünür
// daily_chauffeur → band yok
```
Mevcut `BookingDetailPage.delete.test.tsx` kurulumunu (supabase mock, render) örnek al.

- [ ] **Step 2: Kırmızı gör**

Run: `npx vitest run admin/react/pages/BookingDetailPage.cost.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Import + state ekle**

```tsx
import CostDialog from '../components/CostDialog'
import { bookingLegCostStatus } from '../../profit-loss-metrics.js'
import { todayISO } from '../lib/format'
// ...
const [costDialogOpen, setCostDialogOpen] = useState(false)
```

- [ ] **Step 4: `updateStatus` içine kanca**

Başarılı yazımdan sonra (`error/count` kontrolünden sonra), `next === 'completed' && !dailyChauffeur` ise `setCostDialogOpen(true)`.

- [ ] **Step 5: Band + dialog render**

"Durum Güncelle" bölümünün üstüne, `displayStatus === 'completed' && !dailyChauffeur` için:
```tsx
{(() => {
  const legKey = isReturn && roundTrip ? 'return' : 'outbound'
  const cs = bookingLegCostStatus(booking, legKey, todayISO())
  if (!cs.applicable) return null
  return <div className="section">
    <div className="section-label">{legLabelFor(legKey)} Maliyeti</div>
    {cs.complete
      ? <div className="cost-banner ok"><span className="grow">{costSummary(cs)}</span><button className="btn-sm" type="button" onClick={() => setCostDialogOpen(true)}>Düzenle</button></div>
      : <div className="cost-banner warn"><span className="grow"><strong>Maliyet eksik</strong></span><button className="btn-sm" type="button" onClick={() => setCostDialogOpen(true)}>Maliyet gir</button></div>}
  </div>
})()}
{costDialogOpen && <CostDialog booking={booking} leg={isReturn && roundTrip ? 'return' : 'outbound'} today={todayISO()}
  onClose={() => setCostDialogOpen(false)} onSaved={updated => setBooking(updated)} />}
```
`costSummary(cs)` küçük yerel yardımcı: own_vehicle → `Kendi aracımız · {oneWayKm} km` (+ meetFee ise `· Karşılama 250 ₺`), sold_transfer → `Satılan transfer · ₺{supplierCostTry}`, no_cost → `Maliyeti yok`. `legLabelFor` `LegCostEditors`'tan import.

- [ ] **Step 6: Yeşil gör**

Run: `npx vitest run admin/react/pages/BookingDetailPage.cost.test.tsx`
Expected: PASS. Ayrıca mevcut `BookingDetailPage.delete.test.tsx` regresyon: PASS.

- [ ] **Step 7: Commit**

```bash
git add admin/react/pages/BookingDetailPage.tsx admin/react/pages/BookingDetailPage.cost.test.tsx
git commit -m "Detay: tamamlamada maliyet dialogu + ayak maliyet bandı"
```

---

## Task 6: Stiller

**Files:**
- Modify: `admin/admin.css`

- [ ] **Step 1: Dialog + band + toggle stillerini ekle**

`.cost-dialog-overlay/.cost-dialog/.cost-dialog-head/.cost-dialog-body/.cost-dialog-foot/.cost-dialog-status/.cost-dialog-actions`, `.cost-banner(.warn/.ok)`, `.btn-sm`, `.meet-toggle`. Mockup (`/tmp/cost-dialog-mockup.html`) değerlerini mevcut `--surface/--border/--accent/--radius` token'larıyla eşle. Overlay `position: fixed; inset: 0; z-index` ile admin modal örüntüsünü izlesin (varsa mevcut bir overlay sınıfını referans al).

- [ ] **Step 2: Gözle doğrula (build)**

Run: `npm run build 2>&1 | tail -5` — admin bundle hatasız derlenmeli.

- [ ] **Step 3: Commit**

```bash
git add admin/admin.css
git commit -m "Maliyet dialogu ve bandı stilleri"
```

---

## Task 7: Tam doğrulama

- [ ] **Step 1: Tüm test suite**

Run: `npm test`
Expected: PASS (motor, actions, dialog, detay, ProfitLoss regresyon).

- [ ] **Step 2: Prod build + React doğrulama**

Run: `node scripts/build-all.mjs 2>&1 | tail -5`
Expected: "Verified ... prerendered React pages ...".

- [ ] **Step 3: Manuel duman testi (opsiyonel, @superpowers:verification-before-completion)**

Admin'de bir transferi `in_transit → completed` yap → dialog açılır; own_vehicle bilinmeyen rota için KM iste; havalimanı-başlangıç ayağında karşılama 250 ₺ toggle; Sonra → band "Maliyet eksik"; tekrar aç → Kaydet → band özet + Düzenle. Kâr/zarar ekranında aynı ayağın artık uyarısız olduğunu gör.

---

## Notlar / dikkat

- **Tek-ayak ilkesi:** dialog ve band daima `isReturn ? 'return' : 'outbound'` bağlamındadır; gidiş ve dönüş asla birlikte gösterilmez.
- **Karşılama yalnızca havalimanı-başlangıç ayağı:** dönüş (otel→havalimanı) motorda zaten ücret almaz; toggle o ayakta görünmez.
- **Kısıt uyumu:** `saveLegCostMode` `own_vehicle`/`no_cost`'a geçerken bedeli NULL'lar (sütun kısıtı). Bu davranış ortak modüle taşınırken korunmalı.
- **`airport_meet_fee_applies` yetkisi** (`GRANT UPDATE`) migration `20260821130000` ile mevcut; yeni migration gerekmez.
