# Kâr/Zarar Muhasebeci Dashboard — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Kâr/zarar ekranını sabit KPI şeridi + dönem sekmeleri + gün bazlı düzenlenebilir Excel grid (mobilde kart) olan muhasebeci dashboard'a dönüştürmek; reklamı sefer başına dağıtmak.

**Architecture:** Sunum katmanı yeniden yapılandırılır; hesap `admin/profit-loss-metrics.js` içinde saf fonksiyonlarla genişler (per-leg reklam). Yeni `ProfitLedgerGrid` bileşeni gün gruplu tabloyu/kartları render eder. `ProfitLossPage` kabuğa iner: KPI + sekmeler. Yazma yolları, dağıtım snapshot'ları ve DB şeması **değişmez** — veri kaybı yok.

**Tech Stack:** React 19, TypeScript, react-router 8, Vitest + @testing-library/react, kendi CSS (`admin/react/styles.css`). Yeni bağımlılık yok.

**Spec:** `docs/superpowers/specs/2026-09-01-profit-loss-dashboard-redesign-design.md`

---

## Dosya yapısı

| Dosya | Sorumluluk | İşlem |
|-------|-----------|-------|
| `admin/profit-loss-metrics.js` | Per-leg reklam payı hesabı; bacak netine reklam dahil | Modify |
| `admin/profit-loss-metrics.advertising.test.js` | Per-leg reklam birim testleri | Create |
| `admin/react/components/ProfitLedgerGrid.tsx` | Gün gruplu Excel tablo + mobil kart; düzenlenebilir/salt-okunur | Create |
| `admin/react/components/ProfitLedgerGrid.test.tsx` | Grid render + düzenleme + salt-okunur testleri | Create |
| `admin/react/pages/ProfitLossPage.tsx` | Kabuk: KPI şeridi + dönem sekmeleri + aktif grid | Modify |
| `admin/react/pages/ProfitLossPage.tabs.test.tsx` | Sekme davranışı testleri | Create |
| `admin/react/components/ProfitDistributionSection.tsx` | Dağıt paneli "Dağıtılmamış" sekmesine; geçmiş listesi kaldırılır | Modify |
| `admin/react/styles.css` | Grid/tablo/kart/sekme/KPI stilleri | Modify |

**Not:** Mevcut `ProfitLossPage.*.test.tsx` ve `ProfitDistributionSection.test.tsx` testleri korunacak; taşınan yapıya göre gereken minimum güncelleme yapılacak (davranış korunur).

---

## Phase 1 — Hesap: sefer başına reklam

Reklam dağıtımı: aralığa gün oranıyla düşen reklam (mevcut `allocatedAdvertisingForRange` / `calculateProfitLossMetrics` içindeki aylık toplam) → o aralıktaki gerçekleşen bacak sayısına bölünür → her bacağa `advertisingPerLegEur/Try` yazılır. Toplam korunur.

### Task 1: Saf yardımcı `attachAdvertisingPerLeg`

**Files:**
- Modify: `admin/profit-loss-metrics.js`
- Test: `admin/profit-loss-metrics.advertising.test.js`

- [ ] **Step 1: Failing test yaz**

```js
// admin/profit-loss-metrics.advertising.test.js
import { describe, test, expect } from 'vitest'
import { attachAdvertisingPerLeg } from './profit-loss-metrics.js'

describe('attachAdvertisingPerLeg', () => {
  test('reklamı bacaklara eşit böler, toplam korunur', () => {
    const legs = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    const out = attachAdvertisingPerLeg(legs, { advertisingExpenseEur: 90, advertisingExpenseTry: 4500 })
    expect(out.map(l => l.advertisingPerLegEur)).toEqual([30, 30, 30])
    const sumEur = out.reduce((t, l) => t + l.advertisingPerLegEur, 0)
    expect(sumEur).toBeCloseTo(90, 2)
    const sumTry = out.reduce((t, l) => t + l.advertisingPerLegTry, 0)
    expect(sumTry).toBeCloseTo(4500, 2)
  })

  test('kuruş artığı ilk bacaklara dağıtılır, toplam bozulmaz', () => {
    const legs = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    const out = attachAdvertisingPerLeg(legs, { advertisingExpenseEur: 100, advertisingExpenseTry: 1000 })
    const sumEur = out.reduce((t, l) => t + l.advertisingPerLegEur, 0)
    expect(sumEur).toBeCloseTo(100, 2)
    // hiçbir bacak eksik/fazla kalmaz
    out.forEach(l => expect(l.advertisingPerLegEur).toBeGreaterThan(0))
  })

  test('0 bacak → hata yok, boş dizi döner', () => {
    expect(attachAdvertisingPerLeg([], { advertisingExpenseEur: 90, advertisingExpenseTry: 4500 })).toEqual([])
  })

  test('0 reklam → per-leg 0', () => {
    const out = attachAdvertisingPerLeg([{ id: 'a' }], { advertisingExpenseEur: 0, advertisingExpenseTry: 0 })
    expect(out[0].advertisingPerLegEur).toBe(0)
    expect(out[0].advertisingPerLegTry).toBe(0)
  })
})
```

- [ ] **Step 2: Testin fail ettiğini doğrula**

Run: `npx vitest run admin/profit-loss-metrics.advertising.test.js`
Expected: FAIL — `attachAdvertisingPerLeg is not exported / not a function`

- [ ] **Step 3: Minimal implementasyon**

`admin/profit-loss-metrics.js` içine, mevcut `allocateMoneyAmounts` / `sumMoney` yardımcılarının yakınına ekle. `allocateMoneyAmounts` zaten kuruş-kesin eşit bölme yapıyor (dağıtım gelir bölüşümünde kullanılıyor) — onu kullan:

```js
/**
 * Aralığa düşen toplam reklamı (gün-payı) bacaklara kuruşu kuruşuna eşit böler.
 * Toplam korunur; artık kuruşlar ilk bacaklara gider (allocateMoneyAmounts).
 * Reklam yalnız gösterim/hesap katmanında; kayıtlı dağıtımları değiştirmez.
 */
export function attachAdvertisingPerLeg(legs, { advertisingExpenseEur = 0, advertisingExpenseTry = 0 } = {}) {
  if (!Array.isArray(legs) || legs.length === 0) return []
  const eurShares = allocateMoneyAmounts(advertisingExpenseEur, legs.length)
  const tryShares = allocateMoneyAmounts(advertisingExpenseTry, legs.length)
  return legs.map((leg, index) => ({
    ...leg,
    advertisingPerLegEur: eurShares[index] ?? 0,
    advertisingPerLegTry: tryShares[index] ?? 0,
  }))
}
```

Doğrula: `allocateMoneyAmounts` imzası `(amount, count)` ve kuruş-kesin. Değilse test Step 1'deki beklentiye göre uyarat.

- [ ] **Step 4: Test geçsin**

Run: `npx vitest run admin/profit-loss-metrics.advertising.test.js`
Expected: PASS (4 test)

- [ ] **Step 5: Commit**

```bash
git add admin/profit-loss-metrics.js admin/profit-loss-metrics.advertising.test.js
git commit -m "feat(profit): sefer başına reklam payı yardımcısı"
```

### Task 2: `calculateProfitLossMetrics` bacaklara reklam iliştirsin, bacak neti reklamı düşsün

**Files:**
- Modify: `admin/profit-loss-metrics.js:684-712` (`calculateProfitLossMetrics`)
- Test: `admin/profit-loss-metrics.advertising.test.js`

- [ ] **Step 1: Failing test ekle**

```js
// aynı dosyaya ekle
import { calculateProfitLossMetrics } from './profit-loss-metrics.js'

describe('calculateProfitLossMetrics per-leg reklam', () => {
  const settings = new Map([['2026-08', { period_month: '2026-08-01', km_cost_try: 15, eur_try_rate: 50, advertising_expense_try: 4500 }]])
  const bookings = [
    { id: '1', booking_ref: 'A1', trip_type: 'one_way', pickup_date: '2026-08-10', pickup_location: 'AYT', dropoff_location: 'Belek', price_eur: 100, service_cost_mode: 'no_cost', status: 'completed' },
    { id: '2', booking_ref: 'A2', trip_type: 'one_way', pickup_date: '2026-08-11', pickup_location: 'AYT', dropoff_location: 'Side', price_eur: 100, service_cost_mode: 'no_cost', status: 'completed' },
  ]

  test('her bacakta advertisingPerLegTry var ve toplamı dönem reklamına eşit', () => {
    const m = calculateProfitLossMetrics(bookings, '2026-08', '2026-09-01', settings, new Map())
    const legs = [...m.resolvedLegs, ...m.unresolvedLegs]
    const sum = legs.reduce((t, l) => t + (l.advertisingPerLegTry ?? 0), 0)
    expect(sum).toBeCloseTo(m.advertisingExpenseTry, 2)
    legs.forEach(l => expect(l.advertisingPerLegTry).toBeGreaterThan(0))
  })

  test('bacak net kârı reklam payını düşer', () => {
    const m = calculateProfitLossMetrics(bookings, '2026-08', '2026-09-01', settings, new Map())
    const leg = m.resolvedLegs[0]
    // no_cost: gider yok, sadece reklam düşer
    const expected = leg.revenueTry - (leg.advertisingPerLegTry ?? 0)
    expect(leg.netProfitTry).toBeCloseTo(expected, 2)
  })

  test('dönem net kârı bacak netlerinin toplamına eşit (regresyon)', () => {
    const m = calculateProfitLossMetrics(bookings, '2026-08', '2026-09-01', settings, new Map())
    const legSum = m.resolvedLegs.reduce((t, l) => t + l.netProfitTry, 0)
    expect(legSum).toBeCloseTo(m.netProfitTry, 2)
  })
})
```

- [ ] **Step 2: Fail doğrula**

Run: `npx vitest run admin/profit-loss-metrics.advertising.test.js -t "per-leg reklam"`
Expected: FAIL — `advertisingPerLegTry` undefined / `netProfitTry` bacakta yok

- [ ] **Step 3: Implementasyon**

`calculateProfitLossMetrics` içinde (spec §5). `resolvedLegs`/`unresolvedLegs` filtrelendikten ve `advertisingExpenseTry/Eur` hesaplandıktan sonra, `totals` üretiminden **önce** bacaklara reklam iliştir ve her bacağa `netProfitTry/Eur` ekle:

```js
// advertisingExpenseTry / advertisingExpenseEur zaten hesaplandı (satır ~697-703)
// resolvedLegs + unresolvedLegs birlikte reklam paylaşır (dönemdeki tüm gerçekleşen ayaklar)
const legsWithAds = attachAdvertisingPerLeg(
  [...resolvedLegs, ...unresolvedLegs],
  { advertisingExpenseEur, advertisingExpenseTry },
)
// per-leg net kâr (gösterim için); reklam dahil
const withNet = legsWithAds.map(leg => {
  const expenseTry = (leg.vehicleCostTry ?? 0) + (leg.supplierCostTry ?? 0)
    + (leg.airportMeetCostTry ?? 0) + (leg.advertisingPerLegTry ?? 0)
  const rate = leg.eurTryRate || 0
  const netProfitTry = (leg.revenueTry ?? 0) - expenseTry
  return { ...leg, netProfitTry, netProfitEur: rate ? netProfitTry / rate : (leg.revenueEur ?? 0) }
})
// çözülmüş/çözülmemiş ayrımını koru (id yerine referans sırası bozulmadan)
const resolvedCount = resolvedLegs.length
const resolvedWithNet = withNet.slice(0, resolvedCount)
const unresolvedWithNet = withNet.slice(resolvedCount)
```

Sonra döndürülen metrics'te `resolvedLegs`/`unresolvedLegs` yerine `resolvedWithNet`/`unresolvedWithNet` kullan. **Önemli:** `totals` (dönem toplamları) mevcut `totalsForLegs` ile hesaplanmaya devam eder (reklam toplamı ayrı `advertisingExpenseTry`); bu regresyonu bozmaz. Yalnız döndürülen bacak dizilerini reklam+net içerenlerle değiştir.

Dönüşte:
```js
return {
  ...totals,
  resolvedLegs: resolvedWithNet,
  unresolvedLegs: unresolvedWithNet,
  routes,   // mevcut
  completedLegs: resolvedWithNet.length + unresolvedWithNet.length, // mevcut hesaba göre koru
  // ... mevcut diğer alanlar
}
```

Mevcut dönüş nesnesini bozmadan yalnız `resolvedLegs`/`unresolvedLegs` alanlarını değiştir. `routeMap` döngüsü `resolvedLegs` kullanıyorsa, döngü reklam iliştirmeden önceki `resolvedLegs` ile de çalışır (rota toplamı reklam içermez) — mevcut haliyle bırak.

- [ ] **Step 4: Test geçsin + tüm metrics testleri**

Run: `npx vitest run admin/profit-loss-metrics.advertising.test.js && npx vitest run admin/profit-loss-metrics.test.js`
Expected: PASS (yeni + mevcut). Mevcut testte kırılma olursa: bacak dizileri artık ek alan taşıyor; toplamların değişmediğini doğrula. Kırılan test bacak net alanına dayanmıyorsa dokunma.

- [ ] **Step 5: Commit**

```bash
git add admin/profit-loss-metrics.js admin/profit-loss-metrics.advertising.test.js
git commit -m "feat(profit): bacak netine reklam payı dahil, dönem toplamı korunur"
```

---

## Phase 2 — `ProfitLedgerGrid` bileşeni

Gün gruplu tablo (masaüstü) + kart (mobil). Düzenlenebilir hücreler mevcut `LegCostControls` mantığını kullanır. Salt-okunur modda düzenleyici yok.

### Task 3: Grid iskeleti + gün grubu + ara toplam (salt-okunur render)

**Files:**
- Create: `admin/react/components/ProfitLedgerGrid.tsx`
- Test: `admin/react/components/ProfitLedgerGrid.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
// ProfitLedgerGrid.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { ProfitLedgerGrid } from './ProfitLedgerGrid'

const legs = [
  { bookingId: '1', bookingRef: 'A102', customerName: 'Ali', leg: 'outbound', date: '2026-08-18', from: 'AYT', to: 'Belek', revenueEur: 85, revenueTry: 4250, oneWayKm: 40, vehicleCostTry: 600, supplierCostTry: 0, airportMeetCostTry: 250, advertisingPerLegTry: 155, advertisingPerLegEur: 3.1, netProfitTry: 3245, netProfitEur: 64.9, eurTryRate: 50 },
  { bookingId: '2', bookingRef: 'A103', customerName: 'Veli', leg: 'outbound', date: '2026-08-18', from: 'Belek', to: 'AYT', revenueEur: 80, revenueTry: 4000, oneWayKm: 0, vehicleCostTry: 0, supplierCostTry: 2750, airportMeetCostTry: 0, advertisingPerLegTry: 155, advertisingPerLegEur: 3.1, netProfitTry: 1095, netProfitEur: 21.9, eurTryRate: 50 },
]

describe('ProfitLedgerGrid', () => {
  test('gün başlığı ve gün ara toplamı render eder', () => {
    render(<ProfitLedgerGrid legs={legs} bookingsById={new Map()} editable={false} />)
    expect(screen.getByText(/18 Ağustos/)).toBeInTheDocument()
    expect(screen.getByText(/2 sefer/)).toBeInTheDocument()
    // gün ara toplam net = 3245+1095 = 4340 ₺
    expect(screen.getByText(/₺4\.340/)).toBeInTheDocument()
  })

  test('salt-okunur modda düzenleme kontrolü yok', () => {
    render(<ProfitLedgerGrid legs={legs} bookingsById={new Map()} editable={false} />)
    expect(screen.queryByRole('button', { name: /KM|düzenle|kaydet/i })).toBeNull()
  })
})
```

- [ ] **Step 2: Fail doğrula**

Run: `npx vitest run admin/react/components/ProfitLedgerGrid.test.tsx`
Expected: FAIL — modül yok

- [ ] **Step 3: İskelet implementasyon**

`ProfitLedgerGrid.tsx` oluştur. `ProfitLossPage.tsx`'teki `groupLegsByDate`, `legFinancials`, `legDirection` yardımcıları buraya taşınabilir (DRY) veya paylaşılan bir `leg-view.ts`'e çıkarılabilir — önce en basiti: grid içinde tutup Page'den kaldır (Phase 3'te). Bacak zaten `netProfitTry/Eur` ve `advertisingPerLegTry` taşıyor (Phase 1). Masaüstü `<table>`, gün başlık satırı + bacak satırları + ara toplam satırı. Düzenleme Task 4'te.

```tsx
import { useMemo } from 'react'
import { fmtDetailDate, formatEuro, formatNumber, formatTry, profitLocationLabel } from '../lib/format'
import type { Booking } from '../types'

export interface LedgerLeg {
  bookingId: string; bookingRef?: string | null; customerName?: string | null
  leg: string; date: string; from?: unknown; to?: unknown
  revenueEur?: number; revenueTry?: number; oneWayKm?: number | null
  vehicleCostTry?: number; supplierCostTry?: number; airportMeetCostTry?: number
  advertisingPerLegEur?: number; advertisingPerLegTry?: number
  netProfitTry?: number; netProfitEur?: number; eurTryRate?: number | null
  isDailyChauffeur?: boolean; distanceSource?: string
}

function groupByDate(legs: LedgerLeg[]) {
  const groups = new Map<string, LedgerLeg[]>()
  for (const leg of legs) {
    const d = String(leg.date ?? '')
    const g = groups.get(d)
    if (g) g.push(leg); else groups.set(d, [leg])
  }
  const sum = (ls: LedgerLeg[], k: keyof LedgerLeg) => ls.reduce((t, l) => t + (Number(l[k]) || 0), 0)
  return [...groups.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([date, ls]) => ({
      date, legs: ls,
      revenueEur: sum(ls, 'revenueEur'), revenueTry: sum(ls, 'revenueTry'),
      vehicleCostTry: sum(ls, 'vehicleCostTry'), supplierCostTry: sum(ls, 'supplierCostTry'),
      airportMeetCostTry: sum(ls, 'airportMeetCostTry'), advertisingPerLegTry: sum(ls, 'advertisingPerLegTry'),
      netProfitTry: sum(ls, 'netProfitTry'),
    }))
}

export function ProfitLedgerGrid({ legs, bookingsById, editable }: {
  legs: LedgerLeg[]
  bookingsById: Map<string, Booking>
  editable: boolean
}) {
  const groups = useMemo(() => groupByDate([...legs].sort((a, b) =>
    String(b.date).localeCompare(String(a.date)) || String(a.bookingRef ?? '').localeCompare(String(b.bookingRef ?? '')),
  )), [legs])

  if (!groups.length) return <div className="ledger-empty">Bu dönemde gerçekleşmiş sefer yok.</div>

  return <div className="ledger">
    {groups.map(group => <section className="ledger-day" key={group.date}>
      <header className="ledger-day-head">
        <span>{fmtDetailDate(group.date)}</span>
        <span>{group.legs.length} sefer</span>
        <b className={group.netProfitTry < 0 ? 'is-neg' : 'is-pos'}>{formatTry(group.netProfitTry)}</b>
      </header>
      {/* masaüstü tablo */}
      <table className="ledger-table">
        <thead><tr>
          <th>Sefer</th><th>Rota</th><th>Gelir</th><th>KM</th><th>Araç</th>
          <th>Tedarikçi</th><th>Karşılama</th><th>Reklam</th><th>Kâr</th>
        </tr></thead>
        <tbody>
          {group.legs.map(leg => <tr key={`${leg.bookingId}:${leg.leg}`}>
            <td>{leg.bookingRef || leg.customerName || 'Kayıt'}</td>
            <td>{profitLocationLabel(leg.from)} → {profitLocationLabel(leg.to)}</td>
            <td>{formatEuro(leg.revenueEur ?? 0)}</td>
            <td>{leg.oneWayKm ? formatNumber(leg.oneWayKm, 1) : '—'}</td>
            <td>{formatTry(leg.vehicleCostTry ?? 0)}</td>
            <td>{(leg.supplierCostTry ?? 0) > 0 ? formatTry(leg.supplierCostTry) : '—'}</td>
            <td>{(leg.airportMeetCostTry ?? 0) > 0 ? formatTry(leg.airportMeetCostTry) : '—'}</td>
            <td>{formatTry(leg.advertisingPerLegTry ?? 0)}</td>
            <td className={(leg.netProfitTry ?? 0) < 0 ? 'is-neg' : 'is-pos'}>{formatTry(leg.netProfitTry ?? 0)}</td>
          </tr>)}
        </tbody>
        <tfoot><tr className="ledger-subtotal">
          <td colSpan={2}>Gün toplamı</td>
          <td>{formatEuro(group.revenueEur)}</td><td></td>
          <td>{formatTry(group.vehicleCostTry)}</td>
          <td>{formatTry(group.supplierCostTry)}</td>
          <td>{formatTry(group.airportMeetCostTry)}</td>
          <td>{formatTry(group.advertisingPerLegTry)}</td>
          <td className={group.netProfitTry < 0 ? 'is-neg' : 'is-pos'}>{formatTry(group.netProfitTry)}</td>
        </tr></tfoot>
      </table>
      {/* mobil kartlar Task 5'te aynı verilerle */}
    </section>)}
  </div>
}
```

- [ ] **Step 4: Test geçsin**

Run: `npx vitest run admin/react/components/ProfitLedgerGrid.test.tsx`
Expected: PASS (2 test)

- [ ] **Step 5: Commit**

```bash
git add admin/react/components/ProfitLedgerGrid.tsx admin/react/components/ProfitLedgerGrid.test.tsx
git commit -m "feat(profit): ProfitLedgerGrid gün gruplu salt-okunur tablo"
```

### Task 4: Düzenlenebilir hücreler (KM / tedarikçi / karşılama)

**Files:**
- Modify: `admin/react/components/ProfitLedgerGrid.tsx`
- Modify: `admin/react/components/ProfitLedgerGrid.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
import { fireEvent } from '@testing-library/react'
// ... mevcut importlara ekle

test('editable modda KM hücresi düzenleyici açar ve handler çağırır', async () => {
  const onSaveDistance = vi.fn().mockResolvedValue(undefined)
  const booking = { id: '1', booking_ref: 'A102', service_cost_mode: 'own_vehicle' } as any
  render(<ProfitLedgerGrid
    legs={[legs[0]]}
    bookingsById={new Map([['1', booking]])}
    editable={true}
    onSaveDistance={onSaveDistance}
    onSaveSupplierCost={vi.fn()}
    onSaveCostMode={vi.fn()}
  />)
  // LegCostControls'un düzenleme tetikleyicisi görünür
  expect(screen.getByRole('button', { name: /KM|Tek yön/i })).toBeInTheDocument()
})
```

`vi` importu: `import { describe, test, expect, vi } from 'vitest'`.

- [ ] **Step 2: Fail doğrula**

Run: `npx vitest run admin/react/components/ProfitLedgerGrid.test.tsx -t "editable"`
Expected: FAIL — düzenleme kontrolü yok / prop yok

- [ ] **Step 3: Implementasyon**

`ProfitLedgerGrid` props'una ekle: `onSaveDistance`, `onSaveSupplierCost`, `onSaveCostMode`, `onSaveNoCost?`, `period`, `navigate?`. `editable && booking && !isDailyChauffeur` iken bacak satırının aksiyon hücresinde mevcut `LegCostControls` bileşenini render et (imzası `ProfitLossPage.tsx:337-349`'daki `TripRow` kullanımıyla aynı). Tip importları `./LegCostEditors`'ten (`LegKey`, `ProfitLegRef`, `toLegKey`, `legCostColumns`, `legCostMode`).

Masaüstü tabloda düzenleyici için ek bir sütun/hücre; mobilde karttaki alanın yanında. Karmaşayı azaltmak için: KM/Tedarikçi hücrelerini tıklanınca `LegCostControls`'u açan buton yap (mevcut bileşen zaten satır-içi düzenleme sağlıyor). Salt-okunur (`editable=false`) iken sadece değer gösterilir (Task 3'teki gibi).

Reklam ve Araç hücreleri **hiçbir modda** düzenlenmez (hesaplanan). KM düzenlenince araç gideri otomatik güncellenir (handler `bookings` state'ini patch'ler, metrics yeniden hesaplar — mevcut akış).

- [ ] **Step 4: Test geçsin**

Run: `npx vitest run admin/react/components/ProfitLedgerGrid.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add admin/react/components/ProfitLedgerGrid.tsx admin/react/components/ProfitLedgerGrid.test.tsx
git commit -m "feat(profit): grid hücrelerinde satır-içi düzenleme (LegCostControls)"
```

### Task 5: Mobil kart görünümü

**Files:**
- Modify: `admin/react/components/ProfitLedgerGrid.tsx`
- Modify: `admin/react/components/ProfitLedgerGrid.test.tsx`
- Modify: `admin/react/styles.css`

- [ ] **Step 1: Failing test**

```tsx
test('mobil kart yapısı bacak başına render eder', () => {
  const { container } = render(<ProfitLedgerGrid legs={legs} bookingsById={new Map()} editable={false} />)
  expect(container.querySelectorAll('.ledger-card')).toHaveLength(2)
})
```

- [ ] **Step 2: Fail doğrula**

Run: `npx vitest run admin/react/components/ProfitLedgerGrid.test.tsx -t "mobil"`
Expected: FAIL — `.ledger-card` yok

- [ ] **Step 3: Implementasyon**

Her gün grubunda, `<table>`'ın yanına `<ul className="ledger-cards">` ekle; her bacak `<li className="ledger-card">` içinde alanları (Gelir, KM/Araç veya Tedarikçi, Karşılama, Reklam, Kâr) satır satır. CSS ile `@media (max-width: 640px)` tabloyu gizle, kartları göster; masaüstünde tersi. `editable` iken kartta da `LegCostControls`.

- [ ] **Step 4: Test + CSS**

`styles.css`'e ekle:
```css
.ledger-table { display: table; width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
.ledger-cards { display: none; }
@media (max-width: 640px) {
  .ledger-table { display: none; }
  .ledger-cards { display: grid; gap: 8px; }
}
```
Run: `npx vitest run admin/react/components/ProfitLedgerGrid.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add admin/react/components/ProfitLedgerGrid.tsx admin/react/components/ProfitLedgerGrid.test.tsx admin/react/styles.css
git commit -m "feat(profit): mobil sefer kartları + responsive geçiş"
```

---

## Phase 3 — `ProfitLossPage` kabuk + sekmeler

### Task 6: KPI şeridi + dönem sekmeleri (dağıtılmamış / dağıtımlar / tümü)

**Files:**
- Modify: `admin/react/pages/ProfitLossPage.tsx`
- Create: `admin/react/pages/ProfitLossPage.tabs.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
// ProfitLossPage.tabs.test.tsx — mevcut ProfitLossPage.test.tsx kurulumunu örnek al (supabase mock)
// Sekme butonları: Dağıtılmamış · her distribution (period_start–period_end) · Tümü
test('dağıtım varsa her dağıtım için bir sekme render edilir', async () => {
  // distributions ledger mock'u 1 dağıtım döndürür
  // render sonrası: 'Dağıtılmamış', '1 Ağustos 2026 – 10 Ağustos 2026', 'Tümü' sekmeleri görünür
})
```

Mevcut `ProfitLossPage.test.tsx` supabase/exchange-rate mock desenini birebir kopyala (aynı `vi.mock` çağrıları). Sekme etiketleri `fmtLongDate` ile.

- [ ] **Step 2: Fail doğrula**

Run: `npx vitest run admin/react/pages/ProfitLossPage.tabs.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implementasyon**

`ProfitLossPage.tsx` render'ını yeniden yapılandır:
- Üstte `ProfitHero` yerine kompakt sabit KPI şeridi (Net kâr / Gelir / Gider / Marj) — mevcut `metrics` alanlarını kullan.
- Dönem sekme grubu: `Dağıtılmamış` (açık aralık), `distributions` (yeniden→eskiye), `Tümü`. State: `activeTab`.
- Aktif sekmeye göre:
  - `Dağıtılmamış`: `ProfitDistributionSection` (dağıt paneli) + açık aralık için `ProfitLedgerGrid editable`. Açık aralık bacakları: `calculateProfitLossMetrics` yerine açık aralığı da kapsayan hesap; en basiti `calculateProfitDistribution(bookings, { startDate: openStart, endDate: today-1, ... })` bacaklarını kullan **ya da** mevcut ay-dönem metrics'i. Tutarlılık için `openStart..today-1` aralığını kapsayan bacakları `resolveRealizedLegs` + tarih filtresi ile türet ve `attachAdvertisingPerLeg` uygula (allocatedAdvertisingForRange ile).
  - Bir dağıtım sekmesi: snapshot başlığı (kayıtlı `distribution.*`) + o aralık için yeniden hesaplanan bacaklar `ProfitLedgerGrid editable={false}`.
  - `Tümü`: mevcut `period='all'` metrics + `ProfitLedgerGrid editable`.

Mevcut ay-bazlı sekmeler (`months`) kaldırılır; yerine dağıtım-dönemi sekmeleri gelir. `SettingsForm` (km/kur/reklam girişi) "Dağıtılmamış" sekmesinin altında `ExpandableSection` içinde kalır — **reklam girişi burada** (spec §4.2).

Eski `TravelHistorySection` kaldırılır; yerini `ProfitLedgerGrid` alır. `groupLegsByDate`/`legFinancials`/`TripRow` artık grid'de.

- [ ] **Step 4: Test geçsin**

Run: `npx vitest run admin/react/pages/ProfitLossPage.tabs.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add admin/react/pages/ProfitLossPage.tsx admin/react/pages/ProfitLossPage.tabs.test.tsx
git commit -m "feat(profit): KPI şeridi + dönem sekmeleri, grid'e geçiş"
```

### Task 7: `ProfitDistributionSection` — dağıtım geçmişi listesini kaldır (sekmeye taşındı)

**Files:**
- Modify: `admin/react/components/ProfitDistributionSection.tsx`
- Modify: `admin/react/components/ProfitDistributionSection.test.tsx`

- [ ] **Step 1: Test güncelle**

`DistributionHistory` artık Page'deki sekmeler tarafından karşılandığı için bileşenden kaldırılır. `ProfitDistributionSection.test.tsx`'te `distribution-history-row` bekleyen testi, geçmişin sekmelerde gösterildiğini doğrulayan `ProfitLossPage.tabs.test.tsx`'e taşı. Section testinde yalnız dağıt paneli + blocker + pay ayarı kalır.

- [ ] **Step 2: Fail doğrula**

Run: `npx vitest run admin/react/components/ProfitDistributionSection.test.tsx`
Expected: FAIL (kaldırılacak testler)

- [ ] **Step 3: Implementasyon**

`DistributionHistory` bileşenini ve çağrısını `ProfitDistributionSection`'dan çıkar. `HistoryFinancials` snapshot dökümü, dağıtım sekmesi başlığında yeniden kullanılacaksa `ProfitLossPage`'e taşı (veya paylaşılan bir yardımcıya). Section yalnız `OpenDistributionPreview` + setup/opening editor içerir.

- [ ] **Step 4: İlgili testler geçsin**

Run: `npx vitest run admin/react/components/ProfitDistributionSection.test.tsx admin/react/pages/ProfitLossPage.tabs.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add admin/react/components/ProfitDistributionSection.tsx admin/react/components/ProfitDistributionSection.test.tsx admin/react/pages/ProfitLossPage.tsx admin/react/pages/ProfitLossPage.tabs.test.tsx
git commit -m "refactor(profit): dağıtım geçmişi sekmelere taşındı, section sadeleşti"
```

---

## Phase 4 — Stil cilası + regresyon + teslim

### Task 8: KPI şeridi + sekme + tablo/kart stilleri

**Files:**
- Modify: `admin/react/styles.css`

- [ ] **Step 1: Stil ekle**

KPI şeridi (sabit üst, 4 hücre, tabular-nums), sekme grubu (mevcut `.budget-periods` desenini yeniden kullan), `.ledger-table` (zebra satır, sağa hizalı sayılar, gün başlığı/ara toplam vurgusu, düzenlenebilir hücre işareti), `.ledger-card` (mobil). Mevcut koyu tema değişkenlerini (`--green`, `--text-muted`, `--border-soft`) kullan.

- [ ] **Step 2: Görsel doğrulama**

Run: `npm run dev:admin` → Kâr/Zarar. Masaüstü tablo + mobil (dar viewport) kart. Not: mümkünse `verify` skill ile.

- [ ] **Step 3: Commit**

```bash
git add admin/react/styles.css
git commit -m "style(profit): KPI şeridi, sekme, Excel tablo ve mobil kart stilleri"
```

### Task 9: Tam regresyon + typecheck + build

**Files:** —

- [ ] **Step 1: Tüm testler**

Run: `npx vitest run`
Expected: PASS (tümü). Kırılan mevcut testleri davranış-koruyarak güncelle.

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: hata yok.

- [ ] **Step 3: Build (admin)**

Run: `npm run build:admin`
Expected: başarılı.

- [ ] **Step 4: Veri güvenliği kontrol**

Grep ile doğrula: yeni yazma yolu yok (yalnız `saveLegDistance/saveLegSupplierCost/saveLegCostMode/chauffeur_hire_days update` çağrılıyor); `buildProfitDistributionSnapshot` alanları değişmemiş; migration yok.
Run: `git diff main --stat` ve `git diff main -- admin/profit-loss-metrics.js | grep -i snapshot`
Expected: snapshot şeması değişmemiş.

- [ ] **Step 5: main'e merge + push**

```bash
git checkout main
git merge --no-ff feat/profit-loss-dashboard-redesign -m "feat: kâr/zarar muhasebeci dashboard yeniden tasarımı"
git push origin main
```

(Kullanıcı doğrudan main'e push onayı verdi.)

---

## Kabul kontrol listesi (spec §8)

- [ ] Sabit KPI + sekmeler + tek grid; sonsuz yığılı bölüm yok
- [ ] Masaüstü Excel tablo, mobil kart
- [ ] KM/tedarikçi/karşılama düzenlenebilir; kaydetme mevcut handler'lara gider
- [ ] Araç gideri = KM × km-başı ₺ gösterimi
- [ ] Reklam sefer başına (gün-payı ÷ bacak); dönem toplamı korunur
- [ ] Dağıtılmamış düzenlenebilir + dağıt; dağıtımlar salt-okunur snapshot; Tümü tüm zamanlar
- [ ] Şema/yazma/snapshot değişmez — veri kaybı yok
- [ ] Tüm testler geçer
