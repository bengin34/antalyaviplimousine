# Tamamlanan Transfer Maliyet Dialogu — Tasarım

**Tarih:** 2026-09-01
**Durum:** Onay bekliyor

## Problem

Bir transfer ayağı tamamlandığında (`status = completed`) maliyeti çoğu zaman
sonradan kâr/zarar ekranından girilmek zorunda kalıyor. Özellikle **kendi
aracımız** modelindeki ayaklarda tek yön KM üretimde toplanmadığı için ayak
kâr/zarar motorunda `unresolvedLegs`'e düşüyor ve operatör her tamamlanan
seferden sonra ayrı ekrana gidip KM giriyor.

Amaç: **ayak tamamlandığı anda**, o ayağın tüm maliyet girdilerini tek bir
dialogda toplamak; böylece kâr/zarar ekranında sonradan düzeltme gerekmesin.

## Kapsam ve kısıtlar

- Dialog **tek ayak** içindir. Gidiş ve dönüş ayrı günlerde, ayrı zamanlarda
  tamamlanır; asla aynı dialogda gösterilmez. Dialog, tamamlanan ayağın
  bağlamına (`isReturn`) göre gidiş **veya** dönüş için açılır.
- `daily_chauffeur` (günlük araç + şoför) kapsam dışı — maliyeti mevcut günlük
  editörden (`ChauffeurDayEditor`, KM/yakıt) yönetilir.
- Tek yön (`one_way`): tek gidiş ayağı → tek dialog.
- Gidiş-dönüş (`round_trip`): iki ayrı tamamlama olayı → iki ayrı tek-ayak dialog.
- Manuel dönüş (`manual_return_of_ref`): ayrı rezervasyon satırı, kendi tamamlama
  olayı → kendi tek-ayak dialogu. Doğal olarak kapsanır.

## Maliyet tamamlanma kuralı (mevcut motordan)

Bir ayak, `resolveRealizedLegs` motorunda `unresolvedLegs`'e **yalnızca**
şu durumda düşer: `own_vehicle` **ve** manuel KM yok **ve** rota için sabit
mesafe yok (`fixedRouteDistanceKm` null — örn. özel adres, bilinmeyen otel-otel).
Diğer tüm haller kendiliğinden çözülür:

| Model | Girdi | Tamam kabul |
|-------|-------|-------------|
| `own_vehicle`, bilinen rota | — (sabit mesafe) | evet |
| `own_vehicle`, bilinmeyen rota | tek yön KM | KM girilince |
| `sold_transfer` | tedarikçi bedeli ₺ | oluşturmada girilmiş |
| `no_cost` | — | evet |

Karşılama ücreti tamamlanmayı **etkilemez** (varsayılan açık, opsiyonel kaldırma).

## Karşılama ücreti değişikliği

Bugün: `AIRPORT_MEET_COST_EUR = 5`, EUR üzerinden hesaplanıp TL'ye çevriliyor.

Yeni: **sabit 250 ₺**. Kaynak birim TL olur; EUR toplamlar için `250 / kur`
ile geriye çevrilir. Yalnızca havalimanından **başlayan** ayaklara uygulanır
(dönüşte otel→havalimanı olduğu için zaten uygulanmaz) ve rezervasyon başına
`airport_meet_fee_applies` (varsayılan `true`) ile kaldırılabilir — bu kolon,
kısıt ve `authenticated` UPDATE yetkisi zaten mevcut.

## Bileşenler

### 1. Motor: tamamlanma yardımcısı — `admin/profit-loss-metrics.js`
`bookingLegCostStatus(booking, leg, today)` eklenir. Tek rezervasyon için
`resolveRealizedLegs([booking], today)` çalıştırır ve verilen ayak (`outbound`
| `return`) için döner:

```
{ applicable: boolean,   // ayak bu rezervasyonda var mı (round_trip değilse return → false)
  complete: boolean,      // unresolvedLegs dışında mı
  costMode: 'own_vehicle' | 'sold_transfer' | 'no_cost',
  oneWayKm: number | null,
  supplierCostTry: number | null,
  meetFeeApplicable: boolean,   // startsFromAirport(from)
  meetFeeApplies: boolean }     // airport_meet_fee_applies !== false
```

Saf fonksiyon; birim testlenebilir. `isRealizedLeg` geçmiş/bugün tarihli ve
tamamlanmış ayaklar için çalışır — yeni tamamlanan ayak bu koşulu sağlar.

### 2. Motor: karşılama ücreti TL kaynaklı — `admin/profit-loss-metrics.js`
- `AIRPORT_MEET_COST_EUR = 5` → `AIRPORT_MEET_COST_TRY = 250`.
- `resolveRealizedLegs`: `airportMeetCostTry = uygunsa 250 : 0`,
  `airportMeetCostEur = airportMeetCostTry / eurTryRate` (kur > 0 varsayımı,
  motorun ayar okuması zaten garanti ediyor).
- `distributionFinancialLeg` (mevcut satır ~635): TL'yi EUR'dan üretmek yerine
  EUR'yu TL'den üretecek şekilde çevrilir (`airportMeetCostTry` kaynak).
- Etki: karşılama gideri kalemi değişir → motor testleri güncellenir
  (`profit-loss-metrics.test.js` ve dağıtım testleri).

### 3. Ortak kaydetme eylemleri — yeni `admin/react/lib/leg-cost-actions.ts`
`ProfitLossPage.tsx` içindeki `saveDistance` / `saveSupplierCost` /
`saveCostMode` / `saveNoCost` fonksiyonları buraya taşınır. Bunlar yalnızca
`supabase`'e yazıp güncellenen kolonları döndürür; `setBookings`/`setStatus`
yan etkileri, saf kaydetme (Supabase update → güncel `Booking` alanları döner)
ile UI güncellemesi ayrılacak şekilde imzalanır:

```
saveLegDistance(bookingId, leg, distanceKm): Promise<Partial<Booking>>
saveLegSupplierCost(bookingId, leg, costTry): Promise<Partial<Booking>>
saveLegCostMode(bookingId, leg, nextMode): Promise<Partial<Booking>>
saveLegMeetFee(bookingId, applies): Promise<Partial<Booking>>   // yeni
```

`ProfitLossPage` bunları içe aktarıp mevcut `setBookings`/`setStatus`
sarmalayıcılarını korur (davranış değişmez). Dialog aynı fonksiyonları kullanır.
`saveLegMeetFee` `airport_meet_fee_applies` kolonunu yazar.

### 4. `CostDialog` bileşeni — yeni `admin/react/components/CostDialog.tsx`
Props: `booking: Booking`, `leg: 'outbound' | 'return'`, `onClose()`,
`onSaved(updated: Booking)`.

- Tek ayak kartı: `legCostMode` toggle (own/sold/no_cost) + moda göre girdi.
  Mevcut `LegCostControls` (`DistanceEditor` / `SupplierCostEditor` /
  `CostModeToggle`) yeniden kullanılır.
- `meetFeeApplicable` ise (havalimanından başlayan ayak) **Karşılama ücreti ·
  250 ₺** onay kutusu (`airport_meet_fee_applies`), varsayılan işaretli.
- Alt bilgi: canlı durum ("... maliyeti girilmedi" / "Maliyet hazır ✓") +
  **Sonra** (kapat, eksik bırak) / **Kaydet**.
- Her düzenleme ortak eylemle doğrudan `bookings`'e yazar, dönen alanlarla
  yerel `booking` güncellenir ve `onSaved` üstüne aktarılır.

### 5. Tamamlama kancası — `admin/react/pages/BookingDetailPage.tsx`
`updateStatus` içinde `next === 'completed'` ve `!dailyChauffeur` ise, durum
yazımı başarılıysa `CostDialog` mevcut ayak (`isReturn ? 'return' : 'outbound'`)
için açılır.

### 6. Detay sayfası bandı — `admin/react/pages/BookingDetailPage.tsx`
Tamamlanmış, `daily_chauffeur` olmayan ayak için `bookingLegCostStatus`:
- `!complete` → `⚠ Maliyet eksik [Maliyet gir]` (uyarı bandı, dialogu açar).
- `complete` → tek satır özet (KM / ₺ / karşılama) + `[Düzenle]` (dialogu açar).

Sayfa zaten ayak-bazlı (`isReturn`), dolayısıyla band da o ayağın durumunu gösterir.

## Veri akışı

Dialog düzenlemeleri, kâr/zararın kullandığı **aynı** yazma yoluyla `bookings`
tablosuna yazar (tek kalıcılık yolu). Güncel `booking` `onSaved` ile geri döner,
band/özet yeniden hesaplanır. Kâr/zarar ekranı ek düzenleme olmadan sonucu
yansıtır — hedeflenen davranış.

## Test

- **Birim** `bookingLegCostStatus`: own_vehicle bilinmeyen rota → incomplete;
  own_vehicle bilinen rota / sold_transfer / no_cost → complete; round_trip'te
  gidiş vs dönüş ayrı; one_way'de return → `applicable:false`.
- **Birim** karşılama 250 ₺: havalimanı-başlangıç ayağında `airportMeetCostTry`
  = 250, EUR = 250/kur; `airport_meet_fee_applies=false` → 0; dönüş ayağı → 0.
  Motor + dağıtım testleri güncellenir.
- **Bileşen** `CostDialog`: ayak tipine göre doğru editör; own_vehicle'da
  KM girince complete; Sonra eksik bırakır; karşılama toggle yalnızca
  havalimanı-başlangıç ayağında görünür.
- **Bileşen** `BookingDetailPage` bandı: eksik → uyarı; tamam → özet; dialog
  açılır; günlük hizmette band yok.
- **Regresyon**: `ProfitLossPage` mevcut testleri ortak eyleme taşımadan sonra
  yeşil kalır.

## Dokunulan dosyalar

| Dosya | Değişiklik |
|-------|-----------|
| `admin/profit-loss-metrics.js` | `bookingLegCostStatus`, karşılama 250 ₺ TL kaynaklı |
| `admin/react/lib/leg-cost-actions.ts` | yeni — ortak kaydetme eylemleri (+ `saveLegMeetFee`) |
| `admin/react/components/CostDialog.tsx` | yeni — tek-ayak maliyet dialogu |
| `admin/react/pages/ProfitLossPage.tsx` | kaydetme eylemlerini ortak modüle taşı |
| `admin/react/pages/BookingDetailPage.tsx` | tamamlama kancası + maliyet bandı |
| `admin/admin.css` | dialog + band stilleri |
| ilgili `*.test.*` | motor, dialog, band, regresyon |

## Kapsam dışı (YAGNI)

- Tamamlanan seferler için ayrı "maliyet kuyruğu" ekranı (mevcut kâr/zarar
  uyarıları yeterli).
- Günlük araç + şoför maliyetinin dialoga taşınması.
- Karşılama ücretinin rezervasyon başına düzenlenebilir tutara çevrilmesi.
