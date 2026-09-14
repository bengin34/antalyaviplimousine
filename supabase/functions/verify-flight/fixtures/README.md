# AeroDataBox cevap yapisi

Bu fixture'lar AeroDataBox `/flights/number/{number}/{date}` uc noktasinin
gercek cevaplaridir (RapidAPI uzerinden). Anahtar icermezler.

**Gozlemlenen vs cikarim:** Asagida her iddianin yaninda hangi dosya/HTTP
gozlemine dayandigi belirtilir. Belirtilmemis bir iddia varsa cikarimdir,
gozlem degil — Task 3 testlerini yazarken hangisinin oldugunu ayirt edin.

- `ayt-arrival.json` — `TK2412`, 2026-09-16: Istanbul (IST) -> Antalya (AYT).
  Varis alani AYT olan gercek bir bacak icerir.
- `not-ayt.json` — `TK1`, 2026-09-16: Istanbul (IST) -> New York JFK.
  Varis alani AYT OLMAYAN gercek bir bacak icerir (`wrong_airport` durumunu
  test etmek icin).
- `empty.json` — YOK. Var olmayan bir ucus numarasi (`ZZ9999`,
  2026-09-16) icin gerceklestirilen capraz-kontrol cagrisi **204 No
  Content** dondu, govde tamamen bostu (JSON degil, kaydedecek bir sey
  yok). Bkz. asagidaki "Bos sonuc" bolumu — bu gozlemdir, cikarim degil.

## Genel yapi

Cevap bir **dizi** (bare array, sarmalayici obje yok); her eleman bir ucus
bacagi (leg). Ucus numarasi ve tarih tek bir bacakla eslesirse dizide tek
eleman olur; kod hem 0 hem 1+ eleman durumlarini ele almali. (Gozlem:
`ayt-arrival.json`, `not-ayt.json` — ikisi de tek elemanli dizi.)

**Bos sonuc (GOZLEM, dogrudan curl ile status kodu olculdu):** var olmayan
bir ucus numarasi icin (`ZZ9999`, 2026-09-16) API **HTTP 204 No Content**
dondu, govde bos. Bu, ilk capraz-kontrolde varsayilan olarak yazilmis olan
"200 + `[]`" iddiasini DUZELTIYOR — o iddia dogrulanmamis bir cikarimdi ve
yanlisti. `verify.ts` hem "204 / bos govde" hem de (varsa baska bir
senaryoda gorulebilecek) "200 + bos dizi" durumunu `not_found` olarak ele
almali; sadece govdeyi JSON parse etmeye calismadan once status/bos govde
kontrolu yapilmali.

## Kullandigimiz alanlar

- `[].arrival.airport.iata` — varis havalimaninin IATA kodu (orn. `"AYT"`,
  `"JFK"`). `wrong_airport` / `verified` ayrimi bu alanla yapilir. (Gozlem:
  her iki fixture.)
- `[].arrival.airport.timeZone` — varis havalimaninin IANA zaman dilimi
  (orn. `"Europe/Istanbul"`). (Gozlem: her iki fixture.) `local` string'inin
  sonundaki ofseti kesip parse etmek yerine, inis saatini dogru bicimde
  gostermek icin bu alanla birlikte kullanmak daha saglam bir yaklasim —
  ileride bir gorev bunu tercih edebilir.
- `[].arrival.scheduledTime.local` — planlanan inis, yerel saat, gozlemlenen
  bicim tam olarak: `"2026-09-16 11:00+03:00"` (yani `"YYYY-MM-DD HH:MM+ZZ:ZZ"`,
  boslukla ayrilmis tarih/saat, sonda UTC ofseti; ISO 8601 `T` ayraci YOK).
  (Gozlem: her iki fixture.)
- `[].arrival.scheduledTime.utc` — ayni zaman UTC olarak, bicim:
  `"2026-09-16 08:00Z"` (yine boslukla ayrilmis, `T` yok, sonda `Z`).
  (Gozlem: her iki fixture.)
- `[].arrival.predictedTime.local` / `.utc` — tahmini (guncellenmis) inis
  zamani, ayni bicimde. **Gozlem:** her iki fixture'da da (`ayt-arrival.json`
  satir 50-53, `not-ayt.json` satir 50-53) bu alan MEVCUT. Alanin
  gercekten opsiyonel olup olmadigi, yokken anahtarin hic bulunmadigi mi
  yoksa `null` mi geldigi bu iki fixture ile GOZLEMLENMEDI — ikisi de
  bu alani iceren ucuslar. Kod her iki ihtimale karsi savunmaci yazilmali:
  hem anahtarin tamamen eksik olabilecegini hem de `null` gelebilecegini
  varsayin (orn. `flight?.arrival?.predictedTime?.local ?? null` gibi bir
  erisim, dogrudan `.predictedTime.local` degil).
- `[].arrival.terminal` — terminal, string (orn. `"D"`, `"1"`). **Gozlem:**
  her iki fixture'da da mevcut; eksik/opsiyonel oldugu GOZLEMLENMEDI, bu
  bir varsayimdir. Ayni sekilde savunmaci erisim onerilir.
- `[].number` — ucus numarasi, havayolu kodu ile arasinda bosluk var:
  `"TK 2412"` (girdi olarak kullanicidan `"TK2412"` gelse bile). (Gozlem:
  her iki fixture.)
- `[].status` — serbest metin durum (orn. `"Expected"`), sabit bir enum
  degil; mapping icin guvenilir birincil sinyal degil. (Gozlem.)
- `[].departure.airport.iata`, `[].departure.scheduledTime.*` — kalkis
  tarafi icin ayni sekil. (Gozlem.)

## Sablon ile fark

Gorevde verilen sablon dogruydu (`arrival.airport.iata`,
`arrival.scheduledTime.local`, `arrival.terminal` yollari birebir tutuyor).
Ek olarak gozlemlenenler:

- `scheduledTime.local` bicimi `"YYYY-MM-DD HH:MM+HH:MM"` — boslukla
  ayrilmis, ISO `T` ayraci yok. Parse ederken bunu hesaba katmak gerekir.
  (Gozlem.)
- `predictedTime` (varsa) inis icin daha guncel bir zaman sunuyor;
  `scheduledTime.local` her iki fixture'da da mevcut. `predictedTime`'in
  gercekten opsiyonel oldugu bu fixture'larla dogrulanmadi (yukariya
  bakiniz) — bu bir cikarimdir, gozlem degil.
- Bos/bulunamayan ucuslar icin API **HTTP 204 No Content, bos govde**
  donuyor (GOZLEM — `ZZ9999` / 2026-09-16 capraz-kontrolu ile dogrudan
  status kodu olculdu). Onceki surumde buradaki "200 + `[]`" iddiasi
  yanlisti ve dogrulanmamisti; DUZELTILDI.
- `arrival.airport.timeZone` (IANA zaman dilimi, orn. `"Europe/Istanbul"`)
  her iki fixture'da mevcut; inis saatini gostermek icin offset-kesme
  yerine bu alan tercih edilebilir.
