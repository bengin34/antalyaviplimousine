# Geliş Uçuşu Doğrulama ve İniş Saati Otomatik Doldurma

**Tarih:** 2026-09-14
**Durum:** Tasarım onaylandı

## Problem

Rezervasyon formunda müşteri geliş uçuş numarasını ve varış saatini ayrı ayrı elle giriyor.
Bugünkü tek kontrol `public-app/app/lib/booking.ts` içindeki biçim regex'i
(`^[a-z0-9][a-z0-9 -]{1,11}$`) — uçuşun gerçekten var olup olmadığını, Antalya'ya (AYT)
inip inmediğini kimse kontrol etmiyor.

İki sonucu var:

1. Yanlış yazılan uçuş numarası operasyona hatalı veri olarak giriyor.
2. Müşterinin elle girdiği varış saati yanlış olabiliyor; şoför yanlış saatte gidiyor.

## Kapsam

**Kapsam içi:** Geliş uçuşu (`flightNumber`) için doğrulama + `arrivalTime` alanının
otomatik doldurulması.

**Kapsam dışı (bilinçli):**

- Gecikme takibi, uçuş durumu izleme, transfer saatinin otomatik kaydırılması.
  Operatör bunu istemedi; ayrı bir özellik.
- Dönüş uçuşu (`returnFlightNumber`) ve daily-chauffeur kalkış uçuşu
  (`departureFlightNumber`). Aynı altyapıyı sonradan kullanabilirler.
  Pickup saatini belirleyen alan geliş uçuşu olduğu için önce o.

## Yön veren karar: sessizlik varsayılan

Doğrulama **hiçbir koşulda** rezervasyonu engellemez ve müşteriyi bekletmez.

Antalya'ya gelen trafiğin önemli bir kısmı charter. Charter uçuşları tarife
veritabanlarında çoğu zaman yok, ayrıca rezervasyonlar haftalar önceden geliyor ve
tarife o tarihte henüz yüklenmemiş olabiliyor. Yani "bulunamadı" sonucunun büyük
çoğunluğu **yanlış alarm** olacak. Ödeme adımına giden bir müşteriye yanlış alarm
göstermek satış kaybıdır.

Bu yüzden müşteri olumsuz sonucu görmez. Tek istisna `wrong_airport`: uçuş bulundu ve
kesin olarak başka bir havalimanına iniyor. Bu belirsizlik değil, gerçek bir hata ve
müşteri kendisi düzeltebilir.

## İkinci yön veren karar: kota asla aşılmaz

Ücretsiz plan **ayda 400 çağrı**. Bu bir maliyet meselesi değil — para küçük — ama
kotanın aşılması hesabın askıya alınması demek. Bu yüzden aşmak *mümkün olmamalı*,
sadece *beklenmemeli* değil.

Üç katman:

1. **İstemci aynı şeyi iki kez sormaz.** Son sorulan `uçuş no + tarih` çifti
   hatırlanır; blur birden çok kez tetiklense de ağa tek çağrı gider.
2. **Önbellek kalıcıdır** (aşağıda).
3. **Sert tavan 380.** Aylık sayaç 380'e ulaştığında fonksiyon yukarı akışa hiç
   çıkmaz, doğrudan `unavailable` döner. Kalan 20, elle test payı.

Kota dolduğunda ayrı bir "manuel mod" yoktur ve gerekmez: `unavailable` zaten
müşteriye hiçbir şey göstermeyen, saat alanını sıradan elle doldurulan bir input
olarak bırakan durumdur. Özellik kapanınca form bugünkü davranışına döner.

## Mimari

```
BookingForm (tarayıcı)
   │  { flightNumber, date }
   ▼
verify-flight (Supabase Edge Function)   ← RAPIDAPI_API_KEY burada durur
   │
   ▼
AeroDataBox / RapidAPI
```

API anahtarı tarayıcıya konulamayacağı için proxy zorunlu.

### Bileşen 1 — `supabase/functions/verify-flight/index.ts`

Mevcut `create-booking` fonksiyonunun kalıbını izler (aynı `corsHeaders`,
aynı `jsonResponse` yardımcısı).

**Girdi:** `POST { flightNumber: string, date: string }` (date = `YYYY-MM-DD`)

**Çıktı:** her zaman HTTP 200, gövdede:

```ts
{
  status: "verified" | "not_found" | "wrong_airport" | "unavailable",
  arrivalTime?: string,      // "HH:MM", Antalya yerel saati
  arrivalAirport?: string,   // IATA, ör. "IST"
  terminal?: string,
}
```

**Durum eşlemesi:**

| Koşul | status |
|---|---|
| Uçuş bulundu, varış AYT | `verified` (+ `arrivalTime`, `terminal`) |
| Uçuş bulundu, varış AYT değil | `wrong_airport` (+ `arrivalAirport`) |
| API 204 + boş gövde (ölçüldü: gerçek "bulunamadı" biçimi) | `not_found` |
| API 404 veya boş dizi (savunma amaçlı) | `not_found` |
| Timeout, 5xx, kota aşımı, anahtar yok, geçersiz gövde | `unavailable` |

AeroDataBox bir uçuş numarası + tarih sorgusuna **dizi** döner (aktarmalı bacaklar,
codeshare kayıtları). Kural: bacaklardan **herhangi biri** AYT'ye iniyorsa `verified`
ve o bacağın saati kullanılır. Hiçbiri inmiyorsa `wrong_airport` ve **ilk** kaydın
varış havalimanı bildirilir.

**Değişmezler:**

- Fonksiyon asla 4xx/5xx dönmez. Çağıran taraf için tek bir başarısızlık biçimi var:
  `unavailable`. Böylece istemcide hata dalı tek.
- Yukarı akış çağrısına **3 saniye timeout**. Süre dolarsa `unavailable`.
- `RAPIDAPI_API_KEY` ortam değişkeni yoksa `unavailable` döner — özellik
  yapılandırılmamış bir ortamda formu bozmaz.
- Uçuş numarası normalize edilir: boşluk/tire atılır, büyük harfe çevrilir.
- Boş gövde `not_found` demektir, `unavailable` değil. AeroDataBox tanımadığı uçuş
  için **204 No Content** dönüyor (ölçüldü). Bunu `unavailable`'a düşürmek iki şeyi
  bozar: panelde `bulunamadı` rozeti hiç çıkmaz — oysa yanlış yazılmış uçuş numarası
  bu özelliğin yakalamak için var olduğu tek durumdur — ve `unavailable` önbelleğe
  girmediği için aynı hatalı numara her sorulduğunda kotadan yeni bir hak yer.

**Önbellek ve kota, `LookupStore` arkasında.** Fonksiyon bir depoya bağımlıdır:
`get` / `put` (önbellek) ve `consumeQuota` (aylık sayaç). Gerçeklemesi Postgres,
testlerde sahte.

- **Önbellek kalıcı**, `flight_lookups` tablosunda, anahtar `FLIGHTNO:YYYY-MM-DD`.
  Bellekte tutulamaz: Edge Function örneği soğuduğunda önbellek kaybolur ve aynı
  uçuş yeniden sorulur. Ayda 400 çağrılık kotayla bu israfı göze alamayız. Aynı
  uçaktan çıkan ikinci, üçüncü transfer bedavaya gelir.
- **Yalnızca kesin sonuçlar önbelleğe girer.** `unavailable` saklanmaz — geçici bir
  aksaklık kalıcı hale gelmemeli.
- **Sayaç çağrıdan önce artar.** Sonra istek başarısız olursa bir hak boşa gider;
  tersi (sonra artırmak) eşzamanlı isteklerin kotayı birlikte aşmasına izin verirdi.
  Eksik saymak güvenli, fazla saymak değil.
- **Sayaç okunamıyorsa çağrı yapılmaz.** Kotayı korumak, özelliği çalıştırmaktan
  önceliklidir.

### Bileşen 2 — `BookingForm.tsx` davranışı

Sorgu, uçuş numarası alanından çıkıldığında (blur) ve `travelDate` doluysa tetiklenir.
Arka planda döner; form hiçbir aşamada beklemez, gönderim engellenmez.

| status | Müşteri ne görür | `arrivalTime` alanı |
|---|---|---|
| `verified` | `✓ TK2412 · Antalya'ya 14:35'te iniyor` | **Boşsa** doldurulur |
| `wrong_airport` | `⚠ Bu uçuş İstanbul'a (IST) iniyor` | Dokunulmaz |
| `not_found` | — | Dokunulmaz |
| `unavailable` | — | Dokunulmaz |

**Otomatik doldurma kuralı — tek cümle:** `arrivalTime` yalnızca boşken ve müşteri o
alana hiç dokunmamışken doldurulur.

Bunun sonuçları:

- Müşteri saati elle girdiyse, sonradan gelen API cevabı **asla** üzerine yazmaz.
- Otomatik dolan saatin üzerine müşteri yazabilir; alan sıradan, düzenlenebilir bir
  input olmaya devam eder. Salt okunur/kilitli bir hâli yoktur.
- Müşteri otomatik dolan saati silerse, alan boş kalır; yeni bir doğrulama gelmedikçe
  yeniden doldurulmaz.

`react-hook-form`'un dirty durumu bu kuralın kaynağıdır; `arrivalTime` dirty ise
otomatik doldurma yapılmaz.

Yarış durumu: müşteri uçuş numarasını değiştirirse önceki isteğin geç gelen cevabı
yok sayılır (istek sırası/AbortController).

### Bileşen 3 — Kalıcılık

Yeni migration (`supabase/migrations/YYYYMMDDHHMMSS_snake_case.sql` kalıbı):
`bookings` tablosuna iki kolon.

- `flight_verification_status text` — `verified` | `not_found` | `wrong_airport` | `unavailable`, nullable
- `flight_scheduled_arrival text` — doğrulanan iniş saati (`HH:MM`), nullable

Her ikisi de nullable; eski kayıtlar ve doğrulama çalışmayan akışlar `null` kalır.

`booking.ts` içindeki `buildPublicBookingPayload` bu iki alanı kolon adlarıyla birebir
aynı anahtarlarla üretir: `flight_verification_status`, `flight_scheduled_arrival`.
`create-booking/index.ts` insert'ünü açık bir alan listesinden kurduğu için (spread
değil) her iki anahtarın oraya da eklenmesi gerekir. `create-booking` Edge
Function'ı alanları kabul eder — ama **istemciden gelen değere güvenerek iş kararı
almaz**; bu alanlar yalnızca operatöre bilgi içindir.

### Bileşen 4 — Admin görünürlüğü

`BookingDetailPage` rezervasyon detayında uçuş satırının yanında durum rozeti:
`doğrulandı` / `bulunamadı` / `farklı havalimanı`. `unavailable` ve `null` (eski
kayıtlar ile anahtar tanımlanmadan önceki tüm kayıtlar) **hiçbir rozet göstermez** —
bunlar bir bulgu değil, bilgi yokluğudur. `bulunamadı` olanları operatör
elle teyit eder — günde bir iki tane olması beklenir.

### Bileşen 5 — Kota göstergesi

Panelin özet sayfasında aylık kullanım kartı: `137 / 380`, kalan hak azaldığında
amber, dolduğunda kırmızı ve "uçuş saatleri ay sonuna kadar elle girilecek" notu.

Bu kart, sessizliğin bedelidir. Kota dolduğunda özellik tasarım gereği hiçbir şey
söylemeden kapanır; göstergesi olmazsa operatör saatlerin neden dolmadığını
anlayamaz ve olmayan bir arıza arar.

`flight_api_usage` tablosu panele yalnızca **okuma** için açılır (giriş yapmış
kullanıcılar). Sayacı yalnızca `consume_flight_quota` artırır.

## Hata yönetimi

Tek ilke: **doğrulamanın başarısızlığı rezervasyonun başarısızlığı değildir.**

| Başarısızlık | Davranış |
|---|---|
| Edge Function erişilemiyor / ağ hatası | İstemci sessizce yutar, hiçbir şey göstermez |
| Yukarı akış API timeout | `unavailable`, müşteri fark etmez |
| Kota dolmuş | `unavailable`, müşteri fark etmez |
| API anahtarı tanımsız | `unavailable`, özellik sessizce devre dışı |

Hiçbir durumda gönderim butonu kilitlenmez, hiçbir durumda doğrulama hatası form
doğrulama hatası olarak gösterilmez.

## Test

**`verify-flight` (mock'lanmış yukarı akış):**

- AYT varışlı uçuş → `verified` + doğru yerel saat
- IST varışlı uçuş → `wrong_airport` + `arrivalAirport`
- 404 → `not_found`
- Timeout → `unavailable`
- 500 → `unavailable`
- Anahtar tanımsız → `unavailable`
- Aynı uçuş+tarih iki kez → yukarı akışa tek istek, kotadan tek hak (önbellek)
- Kota tükenmiş → yukarı akışa hiç çıkılmaz
- Kota tükendikten sonra önbellekteki uçuş hâlâ cevaplanır
- Depo erişilemiyor → `unavailable`, istisna değil

**Form davranışı:**

- `arrivalTime` boş → `verified` cevabı saati doldurur
- `arrivalTime` müşteri tarafından girilmiş → cevap üzerine yazmaz
- Otomatik dolan saat elle değiştirilebilir
- `not_found` / `unavailable` → hiçbir görsel değişiklik, gönderim serbest
- Uçuş numarası değişince eski cevap yok sayılır
- Aynı uçuş+tarih için blur tekrarlansa da ikinci istek çıkmaz

## Operatör görevi

RapidAPI üzerinden AeroDataBox anahtarı alınıp Supabase secret olarak
`RAPIDAPI_API_KEY` adıyla tanımlanacak. Ücretsiz tier bu hacim için yeterli.
Anahtar tanımlanana kadar özellik sessizce `unavailable` durumunda kalır ve mevcut
davranış hiç değişmez.
