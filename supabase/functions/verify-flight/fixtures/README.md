# AeroDataBox cevap yapisi

Bu fixture'lar AeroDataBox `/flights/number/{number}/{date}` uc noktasinin
gercek cevaplaridir (RapidAPI uzerinden). Anahtar icermezler.

- `ayt-arrival.json` — `TK2412`, 2026-09-16: Istanbul (IST) -> Antalya (AYT).
  Varis alani AYT olan gercek bir bacak icerir.
- `not-ayt.json` — `TK1`, 2026-09-16: Istanbul (IST) -> New York JFK.
  Varis alani AYT OLMAYAN gercek bir bacak icerir (`wrong_airport` durumunu
  test etmek icin).

## Genel yapi

Cevap bir **dizi** (bare array, sarmalayici obje yok); her eleman bir ucus
bacagi (leg). Ucus numarasi ve tarih tek bir bacakla eslesirse dizide tek
eleman olur; kod hem 0 hem 1+ eleman durumlarini ele almali.

Bos sonuc (ucus o tarihte yok / bulunamadi) durumunda API bos bir dizi `[]`
doner (404 degil, 200 + `[]`).

## Kullandigimiz alanlar

- `[].arrival.airport.iata` — varis havalimaninin IATA kodu (orn. `"AYT"`,
  `"JFK"`). `wrong_airport` / `verified` ayrimi bu alanla yapilir.
- `[].arrival.scheduledTime.local` — planlanan inis, yerel saat, gozlemlenen
  bicim tam olarak: `"2026-09-16 11:00+03:00"` (yani `"YYYY-MM-DD HH:MM+ZZ:ZZ"`,
  boslukla ayrilmis tarih/saat, sonda UTC ofseti; ISO 8601 `T` ayraci YOK).
- `[].arrival.scheduledTime.utc` — ayni zaman UTC olarak, bicim:
  `"2026-09-16 08:00Z"` (yine boslukla ayrilmis, `T` yok, sonda `Z`).
- `[].arrival.predictedTime.local` / `.utc` — varsa tahmini (guncellenmis)
  inis zamani, ayni bicimde. Bu alan HER bacakta olmayabilir (opsiyonel);
  yoksa `arrival` objesinde anahtar hic bulunmuyor (null degil, eksik).
- `[].arrival.terminal` — terminal, string (orn. `"D"`, `"1"`). Opsiyonel
  olabilir.
- `[].number` — ucus numarasi, havayolu kodu ile arasinda bosluk var:
  `"TK 2412"` (girdi olarak kullanicidan `"TK2412"` gelse bile).
- `[].status` — serbest metin durum (orn. `"Expected"`), sabit bir enum
  degil; mapping icin guvenilir birincil sinyal degil.
- `[].departure.airport.iata`, `[].departure.scheduledTime.*` — kalkis
  tarafi icin ayni sekil.

## Sablon ile fark

Gorevde verilen sablon dogruydu (`arrival.airport.iata`,
`arrival.scheduledTime.local`, `arrival.terminal` yollari birebir tutuyor).
Ek olarak gozlemlenenler:

- `scheduledTime.local` bicimi `"YYYY-MM-DD HH:MM+HH:MM"` — boslukla
  ayrilmis, ISO `T` ayraci yok. Parse ederken bunu hesaba katmak gerekir.
- `predictedTime` (varsa) inis icin daha guncel bir zaman sunuyor;
  `scheduledTime.local` her zaman mevcut, `predictedTime.local` opsiyonel.
- Bos/bulunamayan ucuslar icin API 200 + bos dizi `[]` donuyor, 404 degil.
