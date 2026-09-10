# Kâr/Zarar Muhasebe Grid'i — Tasarım

**Tarih:** 2026-09-10
**Kapsam:** `admin/react` kâr/zarar sayfasındaki sefer listesini, sefer (leg) başına satırlı, hücre içi düzenlenebilir, sıralanabilir/filtrelenebilir bir muhasebe grid'ine dönüştürmek ve CSV export eklemek.

## 1. Amaç

Mevcut `ProfitLedgerGrid` günlere göre gruplu bir tablo; düzenleme yalnızca `✎` ikonuyla açılan `CostDialog` modalı üzerinden yapılıyor ve satırlar rezervasyon numarasıyla etiketleniyor. Kullanıcı (işletme sahibi) muhasebeciye verilecek düz bir Excel listesi görünümü istiyor: yolcu adı ön planda, rota dahil, finansal alanlar hücre içinde düzenlenebilir, dosya olarak indirilebilir.

Kararlar (kullanıcıyla netleşti):
- Satır birimi: **sefer (leg)** — gidiş, dönüş ve günlük hizmet günleri ayrı satır.
- Düzenlenebilir alanlar: **yalnız finansal alanlar**. Yolcu, rota, tarih, gelir salt okunur.
- Rezervasyon numarası **kolon olarak gösterilmez**; yolcu adı satırın kimliğidir.
- Mevcut gruplu tablo **değiştirilir** (yeni sayfa/sekme yok).
- CSV export **var**.
- Uygulama: **`@tanstack/react-table`** (headless).

## 2. Bağımlılık

Kök `package.json`'a `@tanstack/react-table` (v8) eklenir. Headless olduğu için stil mevcut `admin/react/styles.css` `ledger-*` sınıflarıyla yazılır; başka UI kütüphanesi eklenmez.

## 3. Bileşenler

### 3.1 `components/ProfitLedgerGrid.tsx` (yeniden yazılır)

Props (mevcut imza korunur + `periodLabel`; `ProfitLossPage` yalnız bu prop'u geçirmek için değişir):
```ts
{
  legs: LedgerLeg[]
  bookingsById: Map<string, Booking>
  editable: boolean
  attentionSince?: string
  navigate?: Navigate
  today?: string
  onBookingSaved?: (booking: Booking) => void
  onSaveNoCost?: (leg: LedgerLeg) => Promise<void>
  periodLabel: string            // CSV dosya adı için, örn. "2026-09" veya "tumu"
}
```

Sorumluluk: `legs` dizisini TanStack `useReactTable`'a verir; kolon tanımlarını `ledger-columns.tsx`'ten alır; toolbar (filtre, kolon görünürlüğü, CSV indir), `<table>` ve mobil kart listesini render eder.

Satır kimliği: `${bookingId}:${leg}` (`getRowId`).

Varsayılan sıralama: tarih azalan, sonra yolcu adı artan.

### 3.2 `components/ledger-columns.tsx` (yeni)

`createColumnHelper<LedgerLeg>()` ile kolon tanımları. Her kolonun `meta`'sı:
```ts
interface LedgerColumnMeta {
  align?: 'left' | 'right'
  csv: (leg: LedgerLeg, booking?: Booking) => string | number | ''
  editable?: boolean   // hücre EditableCell ile render edilir
}
```

| id | Başlık | Değer | Düzenleme |
|---|---|---|---|
| `date` | Tarih | `fmtDetailDate(leg.date)` | — |
| `passenger` | Yolcu | `leg.customerName ?? 'Kayıt'`; `navigate` varsa detay linki (`#detail/{bookingRef}?from=profit-loss[&leg=return]`) | — |
| `direction` | Yön | `legDirectionLabel(booking, leg.leg)` | — |
| `route` | Rota | `profitLocationLabel(from) → profitLocationLabel(to)` | — |
| `revenueEur` | Gelir € | `formatEuro` | — |
| `costEur` | Maliyet € | `revenueEur − ownVehicleProfitEur − extraCostEur` (kâr girilmemişse `—`) | sayı; kaydedilen = türetilen kâr |
| `profitEur` | Reklam öncesi kâr € / ₺ | `formatEuro · formatTry` | sayı (€) |
| `supplierTry` | Tedarikçi ₺ | `formatTry` veya `—` | sayı; yalnız `sold_transfer` modunda |
| `meetFee` | Karşılama | `airportMeetCostTry > 0 ? 'Evet' : 'Hayır'` | evet/hayır select |
| `parkingHours` | Otopark saat | `booking.airport_meet_fee_parking_hours` | sayı 0.25–24 |
| `advertisingTry` | Reklam ₺ | `formatTry` | — |
| `netProfitTry` | Net kâr ₺ | `formatTry`, `is-neg/is-pos` sınıfı | — |
| `costMode` | Model | `COST_MODE_LABELS[legCostMode(booking, legKey)]` | select (`own_vehicle` / `sold_transfer` / `no_cost`) |

Düzenlenebilirlik kuralları (hücre bazında, `canEdit(leg, booking)` yardımcı fonksiyonu):
- `editable === false` veya `booking` yok veya `today` yok → tüm hücreler salt okunur.
- Günlük hizmet (`isDailyChauffeur`) satırlarında hücreler salt okunur; `distanceSource === 'daily-missing'` ise `profitEur` hücresinde mevcut **"Maliyeti yok"** butonu (`onSaveNoCost`) gösterilir.
- `costEur` ve `profitEur`: mod `own_vehicle` ise düzenlenebilir; `sold_transfer` veya `no_cost` ise `—` ve salt okunur.
- `supplierTry`: mod `sold_transfer` ise düzenlenebilir; aksi halde `—`.
- `meetFee`, `parkingHours`, `costMode`: gidiş/dönüş ayaklarında düzenlenebilir.
- `parkingHours` yalnız karşılama ücreti **uygulanmıyorsa** anlamlı (motor: karşılama varsa otopark sayılmaz); karşılama "Evet" iken hücre soluk (`muted`) gösterilir ama yine düzenlenebilir.

Footer (`tfoot`): `revenueEur`, `costEur`, `profitEur`, `supplierTry`, `advertisingTry`, `netProfitTry` toplamları görünür (filtrelenmiş) satırlar üzerinden hesaplanır; karşılama+otopark toplamı `meetFee` kolonunun footer'ında `formatTry(airportMeet + parking)` olarak.

### 3.3 `components/EditableCell.tsx` (yeni)

Genel hücre içi editör.
```ts
{
  value: string                    // gösterilen metin (salt okunur halde)
  rawValue: string                 // input'a konacak ham değer
  kind: 'number' | 'select'
  options?: { value: string; label: string }[]
  min?: number; max?: number; step?: string
  disabled?: boolean
  onSave: (raw: string) => Promise<void>
  validate?: (raw: string) => string | null   // hata mesajı ya da null
  muted?: boolean
  label: string                    // aria-label, örn. "Ali Veli gidiş kâr"
}
```
Davranış:
- Salt okunur halde `button.ledger-cell-edit` olarak render edilir (klavye erişilebilir), tıkla/Enter → düzenleme moduna geçer, `autoFocus`.
- `number`: `Enter` → kaydet, `Escape` → iptal, `blur` → kaydet (değer değişmediyse sadece kapat).
- `select`: `change` → hemen kaydet.
- `validate` hata döndürürse kaydetmez, hücre altında `.inline-error` gösterir.
- Kaydederken input `disabled`, `aria-busy`.
- `onSave` reddederse "Kaydedilemedi, tekrar deneyin." gösterilir, düzenleme modunda kalır.
- Ondalık ayırıcı olarak virgül kabul edilir (`parseDecimal` `LegCostEditors`'tan export edilir).
- `disabled` iken düz `<span>` render edilir (buton yok).

### 3.4 Kaydetme akışı (`ProfitLedgerGrid` içinde)

Tüm yazımlar `lib/leg-cost-actions.ts`'teki mevcut fonksiyonlarla:

| Hücre | Fonksiyon | Not |
|---|---|---|
| `profitEur` | `saveLegOwnVehicleProfit(booking, legKey, profitEur)` | aralık ±999.999,99 |
| `costEur` | aynı fonksiyon; `profit = revenueEur − cost − extraCostEur` | `extraCostEur = (airportMeetCostTry + parkingCostTry) / eurTryRate` |
| `supplierTry` | `saveLegSupplierCost` | 0 < x ≤ 9.999.999,99 |
| `meetFee` | `saveLegMeetFee` | |
| `parkingHours` | `saveParkingHours` | 0 < x ≤ 24 |
| `costMode` | `saveLegCostMode`; `sold_transfer`'a geçerken tedarikçi bedeli yoksa mod kaydedilmez, `supplierTry` hücresi düzenleme moduna açılır; tedarikçi bedeli kaydedilince `saveLegSupplierCost` zaten modu `sold_transfer` yapar (mevcut `CostModeToggle.onNeedsCost` davranışı) | |

Her fonksiyonun döndürdüğü `Partial<Booking>` yaması `{ ...booking, ...patch }` olarak `onBookingSaved`'a verilir; `ProfitLossPage` zaten state'i güncelleyip ledger'ı yeniden hesaplıyor. Optimistik güncelleme yok; hücre kaydedilene kadar kilitli kalır.

`CostDialog` grid'den artık açılmaz. Plan aşamasında `grep -r CostDialog admin/` ile başka kullanıcı yoksa dosya ve testi silinir.

### 3.5 Toolbar

- **Metin filtresi**: yolcu + rota üzerinde `globalFilter`, `tr-TR` küçük harf karşılaştırma.
- **"Sadece eksik bilgi"** onay kutusu: `computeNeedsAttention(leg, booking) && date >= attentionSince` olan satırları bırakır (mevcut mantık korunur; satır `is-attention` sınıfını alır).
- **Kolonlar** menüsü: `columnVisibility`; tercih `localStorage['profit-ledger-columns']`'a yazılır, okuma/yazma `try/catch` ile.
- **CSV indir** butonu (bkz. §4).
- Satır sayısı ve görünür satırların toplam net kârı toolbar sağında.

### 3.6 Mobil

`ledger-cards` listesi korunur; kart başlığı yolcu adı, altında yön + rota, finansal alanlar `dl` içinde ve düzenlenebilir olanlar aynı `EditableCell` ile. Masaüstünde tablo `overflow-x: auto` sarmalayıcı içinde, `min-width` ile yatay kaydırılır; `passenger` kolonu `position: sticky; left: 0`.

## 4. CSV Export — `lib/ledger-csv.ts` (yeni)

Saf fonksiyon:
```ts
export interface CsvColumn { header: string; value: (leg: LedgerLeg, booking?: Booking) => string | number | '' }
export function ledgerToCsv(rows: LedgerLeg[], columns: CsvColumn[], bookingsById: Map<string, Booking>): string
```
- Ayırıcı `;`, satır sonu `\r\n`, başta UTF-8 BOM (`﻿`) — Türkçe Excel doğrudan açsın.
- Metin alanları çift tırnak içinde, içteki `"` → `""`.
- Sayılar ham (`1234.5`), para birimi simgesi yok; kâr kolonu CSV'de iki ayrı kolon olur: `Kâr €` ve `Kâr ₺`. Tarih ISO `YYYY-MM-DD`.
- `undefined`/`null` → boş hücre.
- Sıra ve kapsam: grid'in **o anki görünür ve filtrelenmiş** satırları, görünür kolonlar; en alta "Toplam" satırı (sayısal kolonlar toplanır, metin kolonları boş).

İndirme (`ProfitLedgerGrid` içinde): `Blob` + `URL.createObjectURL` + geçici `<a download>`; dosya adı `kar-zarar-{periodLabel}.csv`.

## 5. Stil

`styles.css`'e eklenir: `.ledger-toolbar`, `.ledger-scroll`, `.ledger-table th[aria-sort]` ok göstergesi, `.ledger-cell-edit` (nokta-çizgi alt çizgi, hover'da arka plan), `.ledger-cell-input` (hücreyle aynı genişlik, sağa hizalı sayı), `.ledger-cell-busy`, `.ledger-col-sticky`, `.is-muted`. Mevcut `is-attention`, `is-neg`, `is-pos`, `inline-error` yeniden kullanılır. Gün grubu stilleri (`.ledger-day*`) kaldırılır.

## 6. Hata durumları

- Supabase hatası → hücrede "Kaydedilemedi, tekrar deneyin."; düzenleme açık kalır, kullanıcı tekrar deneyebilir veya Esc ile iptal eder.
- Doğrulama hatası → kaydetmez, mesaj gösterir.
- `localStorage` erişilemezse kolon tercihi sessizce varsayılan olur.
- `eurTryRate` yoksa (`null`) `costEur` düzenlenemez (`extraCostEur` hesaplanamaz) → hücre `—` ve `title="Kur yok"`.

## 7. Test

Vitest + Testing Library, mevcut kalıplar:
- `ProfitLedgerGrid.test.tsx` (yeniden yazılır): kolon başlıkları; yolcu adının gösterilip rezervasyon numarasının gösterilmemesi; yolcu linkinin `navigate`'i doğru hash ile çağırması; tarihe göre sıralama tıklaması; metin filtresi; "sadece eksik bilgi"; `editable=false` iken hiçbir hücrenin düzenlenememesi; `profitEur` hücresinden kaydetmede `saveLegOwnVehicleProfit`'in doğru argümanlarla çağrılması ve `onBookingSaved`'ın yamalı booking alması; `costEur` girildiğinde kârın türetilmesi; `costMode` → `sold_transfer` seçilince tedarikçi bedeli yoksa `supplierTry` hücresinin açılması; hata durumunda mesaj; footer toplamları; günlük hizmet `daily-missing` satırında "Maliyeti yok" butonu; CSV indir tıklanınca `ledgerToCsv`'nin filtrelenmiş satırlarla çağrılması.
- `EditableCell.test.tsx` (yeni): Enter/Esc/blur, doğrulama, kayıt hatası, select anında kaydetme, disabled.
- `ledger-csv.test.ts` (yeni): BOM, `;` ayırıcı, tırnaklama, boş değer, toplam satırı, kolon sırası.
- Mevcut `ProfitLossPage.*.test.tsx` testleri geçmeye devam etmeli; rezervasyon numarasına dayanan seçiciler yolcu adına çevrilir.

## 8. Kapsam dışı

- Rezervasyon alanlarını (yolcu, rota, tarih, gelir) düzenleme.
- XLSX (yalnız CSV).
- Sunucu tarafı sayfalama; tüm dönem satırları istemcide.
- Yeni sayfa/menü.
