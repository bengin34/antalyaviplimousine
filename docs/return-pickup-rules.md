# Dönüş transferi: bölgelere göre otelden alınma kuralları

Dönüş transferinde referans nokta **uçağın kalkış saatidir** (varış değil).
Yolcunun havalimanında kalkıştan **2,5 saat** önce olması gerekir; buna bölgenin
yol süresi ve trafik payı eklenerek otelden alınma saati bulunur:

```
otelden alınma = dönüş uçuşu kalkış − (150 dk havalimanı payı + yol süresi + bölge trafik payı)
```

Sonuç, her zaman güvenli yöne (erkene) 5 dakikalık dilime yuvarlanır.

Kural motoru: [`src/airport-pickup.js`](../src/airport-pickup.js) ·
Testler: [`src/airport-pickup.test.js`](../src/airport-pickup.test.js)

## Bölge tablosu

Yol süreleri [`src/routes.js`](../src/routes.js) içindeki kanonik `durationMin`
değerleridir — güzergâh süresi değişirse orada güncellenir, burada değil.
Trafik payı bölgeye özgüdür ve `src/airport-pickup.js` içindeki
`REGION_TRAFFIC_BUFFER_MIN` tablosundan gelir.

| Bölge | Yol | Trafik payı | Toplam geri sayım | 14:00 kalkış için alış |
| --- | --- | --- | --- | --- |
| Antalya | 25 dk | 15 dk | 190 dk | 10:50 |
| Belek | 35 dk | 15 dk | 200 dk | 10:40 |
| Boğazkent | 45 dk | 15 dk | 210 dk | 10:30 |
| Side | 55 dk | 20 dk | 225 dk | 10:15 |
| Kemer | 60 dk | 25 dk | 235 dk | 10:05 |
| Manavgat | 65 dk | 20 dk | 235 dk | 10:05 |
| Kızılağaç | 75 dk | 20 dk | 245 dk | 09:55 |
| Tekirova | 75 dk | 25 dk | 250 dk | 09:50 |
| Alanya | 120 dk | 30 dk | 300 dk | 09:00 |
| Fethiye | 180 dk | 45 dk | 375 dk | 07:45 |
| Pamukkale | 180 dk | 45 dk | 375 dk | 07:45 |
| Dalaman | 210 dk | 45 dk | 405 dk | 07:15 |
| Bodrum | 300 dk | 60 dk | 510 dk | 05:30 |
| Kapadokya | 480 dk | 60 dk | 690 dk | 02:30 |
| _Bölge belirtilmedi_ (otel / özel adres) | 60 dk | 20 dk | 230 dk | 10:10 |

Trafik payları bölgenin yol koşullarını yansıtır: şehir içi trafik (Antalya),
tek güzergâhlı sahil yolu ve tünel (Kemer, Tekirova), uzun D400 hattı (Alanya),
şehirlerarası mesafe (Fethiye ve ötesi).

## Kuralların kullanıldığı yerler

- **Yeni kayıt / rezervasyon düzenleme:** dönüş uçuşu kalkış saati girildiğinde
  tavsiye edilen alış saati ve kuralın dökümü gösterilir; "Bu saati kullan"
  butonu alış saatini doldurur.
- **Zaman çizelgesi:** dönüş kartında girilen alış saati tavsiyeden 15 dakikadan
  fazla geç ise uyarı çıkar; kalkış saati girilmemişse eksik bilgi olarak
  işaretlenir.
- **Şoför bildirimi (WhatsApp):** dönüş ayağında uçuşun kalkış saati ve tavsiye
  edilen otelden alınma saati yazılır.
- **Müşteri mesajları (WhatsApp):** dönüş onay/hatırlatma mesajında uçuş
  numarasının yanında kalkış saati yer alır.

## Gece yarısını geçen uçuşlar

Çok erken kalkışlarda (örneğin Alanya'dan 02:00) tavsiye edilen alış bir önceki
güne düşer. Bu durumda arayüz "(bir önceki gün)" notunu gösterir ve saati tek
başına uygulayan butonu gizler; dönüş tarihinin de bir gün geri alınması gerekir.

## Değişiklik nasıl yapılır

- Bir bölgenin **yol süresi** değişecekse: `src/routes.js` içindeki `durationMin`.
- Bir bölgenin **trafik payı** değişecekse: `src/airport-pickup.js` içindeki
  `REGION_TRAFFIC_BUFFER_MIN`.
- **Havalimanı payı** (2,5 saat) değişecekse: `src/airport-pickup.js` içindeki
  `AIRPORT_CHECKIN_LEAD_MIN`.

Her üç değer de testlerle bağlıdır; değiştirdikten sonra
`npm test -- src/airport-pickup.test.js` çalıştırın.
