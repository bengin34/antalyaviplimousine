# Kâr/Zarar Tablosunda Tam Düzenlenebilirlik ve Gidiş-Dönüş Onay Mesajı — Tasarım

**Tarih:** 2026-09-14
**Kapsam:** `admin/profit-loss-metrics.js`, `admin/whatsapp-templates.js`, `admin/react` kâr/zarar tablosu ve rezervasyon detayı mesaj paneli, bir Supabase migration'ı.

## 1. Sorun

Kâr/zarar tablosu bir rapor gibi davranıyor, oysa operatör sayıları orada düzeltmek istiyor:

- **Maliyet €** yalnız "kendi araç", **Tedarikçi ₺** yalnız "satılan transfer" modunda düzenlenebiliyor; diğer durumda hücre `—` gösteriyor ve modeli önce ayrı bir hücreden değiştirmek gerekiyor.
- **Gelir €** hiç düzenlenemiyor. Müşteri bazen anlaşılan fiyattan az ödüyor; defterdeki gelir gerçeği göstermiyor.
- **Karşılama** ve **Otopark saat** yalnız havalimanından kalkan ayaklarda düzenlenebiliyor.
- Kapalı `EditableCell` yalnız metni kadar geniş bir buton; hücre sağa yaslı olduğu için pratikte sadece en sağdaki `—` tıklanabiliyor.
- Sayılar sola/sağa yaslı, ₺ ve € tek bir metinde birleşiyor (`€120,00 · ₺6.500,00`), göz ayıramıyor.
- Yolcu adına tıklamak aynı sekmede rezervasyona gidiyor; operatör tablodaki yerini kaybediyor.

Mesaj tarafında: gidiş-dönüş rezervasyonlarda onay mesajı yalnız açık olan ayağa ait. Diğer ayağın onayı için rezervasyonu öbür bacaktan açmak gerekiyor, müşteri de iki ayrı mesaj alıyor.

## 2. Veri modeli

Tek migration, iki nullable kolon çifti. Hepsi **boşken bugünkü davranış aynen sürer** — geçmiş dönemlerin kârı değişmez, kayıtlı dağıtımlar etkilenmez.

| Kolon | Anlamı |
|---|---|
| `revenue_eur`, `return_revenue_eur` (numeric(10,2) null) | O ayaktan tahsil edilen gerçek gelir. Boşsa bugünkü kural: `price_eur`, gidiş-dönüşte ikiye bölünmüş. |
| `meet_fee_override`, `return_meet_fee_override` (boolean null) | `null` → bugünkü konum kuralı; `true` → 250 ₺ karşılama; `false` → otopark saati üzerinden gider. |

Kararlar:

- **Gelir ayrı bir alan, `price_eur` değil.** `price_eur` müşteriye giden fiyattır; onay mesajında, fiyat listelerinde ve faturada görünür. Az tahsilat fiyatı değil geliri düzeltir, bu yüzden defter kendi alanını taşır.
- **Override üçlü durum taşır.** `airport_meet_fee_applies` kolonunun varsayılanı `TRUE` olduğundan onu havalimanı dışı ayaklara genişletmek geçmişteki her şehir içi transfere 250 ₺ bindirirdi. Nullable override bu tuzağı kapatır: karar ancak elle verilince geçerli olur.
- **Otopark saati rezervasyon düzeyinde kalır** (`airport_meet_fee_parking_hours`). İki ayak aynı saati paylaşmaya devam eder; ayak başına saat isteği yok.
- Yeni kolonlara `authenticated` rolü için `GRANT UPDATE` verilir; `bookings` üzerindeki mevcut sütun bazlı yetki düzeni korunur.

## 3. Hesap katmanı (`profit-loss-metrics.js`)

- `bookingLegs`: ayak geliri artık `revenue_eur` / `return_revenue_eur` doluysa o değer, boşsa bugünkü bölüşüm. Günlük şoförlü hizmet etkilenmez.
- `resolveRealizedLegs`: karşılama/otopark kararı önce override'a bakar:

```
override null  → startsAtAirport && airport_meet_fee_applies   (bugünkü kural)
override true  → 250 ₺ karşılama
override false → otopark saati × saatlik ücret
```

Toplamlar, net kâr ve dağıtım snapshot'ı bu değerlerden türemeye devam eder; formüller değişmez.

## 4. Tablo (`ledger-columns.tsx`, `EditableCell.tsx`, `admin.css`)

- **Gelir €** düzenlenebilir; ilgili ayağın gelir kolonuna yazar. Boşaltmak bugünkü bölüşüme döner.
- **Maliyet €, Reklam öncesi kâr, Tedarikçi ₺** modelden bağımsız düzenlenebilir. Değer kaydedilirken maliyet modeli de hedefine çevrilir: maliyet/kâr → `own_vehicle`, tedarikçi → `sold_transfer`. Tek kaydetme, iki alan.
- **Karşılama** ve **Otopark saat** her ayakta düzenlenebilir; override kolonuna yazar.
- **Hücreye tıklama:** kapalı `EditableCell` butonu hücreyi tamamen kaplar (`display:block; width:100%`), böylece boş hücrede de tıklanacak bir alan olur.
- **Hizalama:** tüm hücreler ortalanır; `ColumnMeta.align` kaldırılır.
- **İki para birimi, iki renk:** `dualFromEur` / `dualFromTry` / `profitDual` metin yerine iki `<span>` döndürür (`money-eur`, `money-try`), CSS ayrı renk verir. CSV çıktısı değişmez.
- **Yolcu linki:** `<a href="#detail/…" target="_blank" rel="noopener">` — yeni sekmede açılır, tablodaki konum korunur.

Reklam ₺, Net kâr ₺, Kur ve tarih türetilmiş değerlerdir; düzenlenebilir olmazlar.

## 5. Onay mesajı (`whatsapp-templates.js`, `BookingDetailPage.tsx`)

- `buildConfirmMessage` gidiş-dönüş rezervasyonlarda tek mesajda iki blok üretebilir: `*Gidiş transferi*` ve `*Dönüş transferi*`. Selam ve kapanış bir kez yazılır.
- Rezervasyon detayında gidiş görünümündeki onay kartı bu birleşik mesajı açar.
- **Dönüş ayağında yalnız dönüş onayı** görünür — o ekrandan gidiş onayı gönderilemez.
- Hatırlatma, karşılama ve yorum mesajları bugünkü ayak davranışını korur.

## 6. Test

- `profit-loss-metrics`: gelir override'ı (tek yön, gidiş-dönüş, boş), karşılama override'ının üç durumu, override yokken geçmiş davranışın aynı kalması.
- `whatsapp-templates`: birleşik mesajda iki bloğun da bulunması, tek yön rezervasyonda tek blok, dönüş ayağında yalnız dönüş metni.
- Grid: her hücrenin düzenlenebilirliği ve model otomatik geçişi, tıklama hedefinin hücre genişliğinde olması, yolcu linkinin `target="_blank"` taşıması.
