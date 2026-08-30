# FAQ Bölümü — Güncel Durum, Eksik Nokta ve Rakip Analizi

_Hazırlanma tarihi: 30 Ağustos 2026 · Kaynak dal: `claude/faq-section-refinement-zltubc` (PR #13)_

## 1. Güncel durum

Ana sayfadaki FAQ bölümü 10 soruya çıkarıldı ve 14 dilin tamamında yayına hazır.

| # | Soru (TR) | Anahtar |
|---|---|---|
| 1 | Uçuşum gecikirse ne olur? | `faqOne` |
| 2 | Dış hat uçuşuyla geliyorum, karşılama nasıl işliyor? | `faqTwo` |
| 3 | Yurt içi uçuşla geliyorum, şoförümü nasıl bulacağım? | `faqSix` |
| 4 | J / 777 kontuarında görevli yoksa ne yapmalıyım? | `faqSeven` |
| 5 | Havalimanından çıkmam 90 dakikadan uzun sürerse ne olur? | `faqEight` |
| 6 | Ödemeyi nasıl yapıyorum? | `faqNine` |
| 7 | Dönüş transferimde iletişimi nasıl kuracağım? | `faqTen` |
| 8 | Çocuk koltuğu var mı? | `faqThree` |
| 9 | Golf çantası ve büyük bagaj taşıyor musunuz? | `faqFour` |
| 10 | Verilen fiyat kesin mi? | `faqFive` |

Teknik durum:

- Metinler `index.html` (İngilizce baz) ve `src/main.js` (13 dil) içinde; `scripts/extract-public-translations.mjs` bunları `legacy-translations.json`'a çıkarıyor.
- Accordion sırası tek yerde: `public-app/app/lib/faq.ts`. Hem `HomePage.tsx` hem `seo.ts` bunu kullanıyor, dolayısıyla görünen liste ile `FAQPage` yapılandırılmış verisi ayrışamıyor.
- 10 sorunun tamamı `FAQPage` schema'sına giriyor — SEO tarafı doğru kurgulanmış.

## 2. Site içi tutarsızlıklar (öncelikli)

FAQ yeni karşılama akışını anlatıyor, ancak sitenin diğer bölümleri hâlâ eski akışı vaat ediyor. Bunlar yayına çıkmadan düzeltilmeli — misafir, FAQ'da okuduğuyla ana sayfada okuduğu arasında çelişki görüyor.

| Bulgu | Nerede | Şu an ne diyor | Sorun |
|---|---|---|---|
| **Şoför salonda tabelayla karşılıyor** | `greetBody`, `welcomeBody`, `nameSignGreeting` (14 dil) | "Şoförünüz sizi gelen yolcu salonunda isim tabelasıyla karşılar" | FAQ'ya göre şoför salona girmiyor; kontuardaki personel şoförü çağırıyor, şoför araçla karşılama noktasına geliyor |
| **Rota sayfalarında aynı vaat** | `TransferPage.tsx` — `intro` ve `items` (12 dil × tüm rotalar) | "Şoförünüz sizi gelen yolcu salonunda isim tabelasıyla karşılar" + "Havalimanı otoparkı ve bekleme" | Aynı çelişki, üstelik en çok SEO trafiği alan sayfalarda |
| **Sınırsız ücretsiz bekleme iması** | `routesIntro` (14 dil) | "…ve ücretsiz bekleme süresi dahildir" | 90 dakika sınırı belirtilmiyor; 5 € ek ücret tartışmaya açık hale geliyor |
| **Rota sayfası FAQ'sı eski** | `TransferPage.tsx` → `faqItems` | 3 soru: süre, fiyat, gecikme | Ana sayfa FAQ'sundaki 90 dakika ve ödeme bilgisi burada yok |

## 3. Eksik sorular — öncelik sırasına göre

### Kritik (rezervasyon kararını doğrudan etkiler)

1. **İptal ve değişiklik politikası.** Sitede hiçbir yerde geçmiyor — tarama sonucu sıfır. İncelediğimiz rakiplerin tamamında FAQ'nun ilk üç sorusundan biri. Ön ödeme almadığımız için burada güçlü bir avantajımız var ve bunu söylemiyoruz.
2. **Para birimi ve nakit detayı.** "Nakit ödersiniz" diyoruz ama hangi para birimleri (€ / ₺ / £ / $), kur nasıl uygulanıyor, üstü nasıl veriliyor, misafirde nakit yoksa ne oluyor (havalimanında ATM) — hiçbiri yok. Nakit-only politikada en sık gelecek soru bu.
3. **Kaç yolcu ve kaç bagaj sığar.** Araç sayfalarında kapasite yazıyor ama FAQ'da yok; rakiplerin çoğunda "kişi başı 1 valiz + 1 el bagajı, fazlası önceden bildirilmeli" şeklinde net kural var. Bizde kural belirsiz olduğu için havalimanında araç değişikliği riski doğuyor.
4. **Rezervasyonu ne kadar önce yapmalıyım / son dakika mümkün mü.**

### Yüksek (operasyonel soru trafiğini azaltır)

5. **Dönüşte otelden alınma saati ne zaman belirleniyor** ve **misafir dönüşte geç kalırsa ne oluyor.** Havalimanı için 90 dakika kuralı var, otel çıkışı için hiçbir şey yok.
6. **Yol süresi ve mesafe** (Belek 35–45 dk gibi) — rota sayfalarında var, FAQ'da yok; en çok aranan sorulardan biri.
7. **Ek durak talebi** (market, eczane, ikinci otel) mümkün mü, ücretli mi.
8. **Evcil hayvan** ve **tekerlekli sandalye / erişilebilirlik** — rakip FAQ'larının standart maddesi, bizde yok.
9. **Fatura / makbuz** verilip verilmediği (özellikle kurumsal ve B2B misafirler için).

### Orta (güven artırıcı)

10. **Şoförler hangi dilleri konuşuyor.**
11. **Araç tipini kim belirliyor, yükseltme olur mu, sigara politikası.**
12. **Gece transferi var mı, gece farkı alınıyor mu** (7/24 diyoruz ama ek ücret olmadığını söylemiyoruz — söylersek bu bir satış argümanı).
13. **Araçta unutulan eşya.**
14. **Lisans ve sigorta.** "TÜRSAB lisanslı" rozeti var ama FAQ'da yolcu sigortası açıklanmıyor.

## 4. Rakip analizi

### Bekleme süresi politikası

| Firma | Ücretsiz bekleme | Not |
|---|---|---|
| **Biz** | **İniş sonrası 90 dk**, sonrası saatlik 5 € | Sektörün üst bandında |
| Kiwitaxi | 90 dk (havalimanı) | Aşımda şoför ek ücret talep edebiliyor |
| Antalya Viva Transfer | Havalimanı 1 sa 15 dk / adres 15 dk | Bizden kısa |
| Genel platform standardı | İç hat 45 dk / dış hat 60 dk | Bizden belirgin kısa |

**Sonuç:** 90 dakika rekabetçi, hatta yerel rakiplerin üzerinde. Bunu bir kısıt gibi değil, **avantaj olarak** öne çıkarmalıyız — şu anki metin savunmacı bir tonda.

### İptal politikası

| Firma | Ücretsiz iptal |
|---|---|
| **Biz** | **Belirtilmemiş** |
| Transfer7 (Antalya) | Transferden 12 saat öncesine kadar |
| Kiwitaxi | Sınıfa göre 5 saat veya 24 saat; iade 3–5 iş günü |
| Suntransfers | 48 saat öncesine kadar |

**Sonuç:** En büyük eksiğimiz bu. Rakiplerin hepsinin iade süreci var (banka, kart, 5–7 iş günü); bizde ön ödeme olmadığı için iade süreci de yok. "Ön ödeme yok, iptal ücretsiz, iade beklemek yok" cümlesi rakiplerin hiçbirinin veremeyeceği bir mesaj ve şu anda sitede yok.

### Çocuk koltuğu

| Firma | Politika |
|---|---|
| **Biz** | **Ücretsiz, 4 adede kadar** |
| Bazı Antalya firmaları | Adet başına 200 TL / 5 € |
| Antalya Airport Shuttle | 0–3 yaş ücretsiz |
| Uluslararası platformlar | Genelde ücretsiz, talep üzerine |

**Sonuç:** Ücretsiz olması avantaj ama FAQ'da tek cümlelik geçiyor; yaş grupları (bebek / çocuk / yükseltici) ve 4 adet limiti yazılırsa aile segmentinde ayrışırız.

### Bagaj

Rakiplerde net kural standart: "kişi başı 1 valiz; fazlası rezervasyonda bildirilmeli, bildirilmezse varışta ek ücret." Bizde golf çantası maddesi var ama genel bagaj kuralı yok. Bu, havalimanında yaşanan en klasik sürtüşme noktası.

### Karşılama anlatımı

Rakiplerin tamamı tek cümlelik klasik vaadi kullanıyor: "şoförünüz isim tabelasıyla arrival salonunda bekler." Bizim akışımız (J / 777 kontuarı → personel → şoförün araçla gelmesi) farklı ve **açıklanmazsa dezavantaj, açıklanırsa avantaj**: yeni FAQ metinleri bunu doğru anlatıyor — asıl sorun, sitenin geri kalanının hâlâ rakiplerin cümlesini kullanıyor olması (bkz. bölüm 2).

## 5. Önerilen aksiyon planı

**Adım 1 — Tutarlılık (yayın öncesi zorunlu).** Bölüm 2'deki 4 maddeyi 14 dilde düzelt: karşılama anlatımını yeni akışa taşı, `routesIntro`'ya 90 dakikayı ekle, rota sayfası FAQ'sunu 4–5 soruya çıkar.

**Adım 2 — 5 yeni FAQ maddesi.** İptal ve değişiklik · para birimi ve nakit detayı · bagaj ve yolcu kapasitesi · dönüş saati ve gecikme · ek durak. Bunlar 15 soruya çıkarır; accordion sırası `faq.ts`'te tek satır değişikliğiyle güncellenir.

**Adım 3 — İkinci dalga (opsiyonel).** Evcil hayvan, erişilebilirlik, fatura, şoför dilleri, gece transferi, unutulan eşya.

**Adım 4 — SEO.** Rota sayfalarındaki 3 soruyu 5'e çıkar (süre, fiyat, gecikme + bekleme süresi + ödeme). `FAQPage` şeması zaten mevcut, sadece içerik genişliyor.

## Kaynaklar

- [Kiwitaxi — Help / FAQ](https://kiwitaxi.com/en/help)
- [Antalya Viva Transfer — Sıkça Sorulan Sorular](https://www.antalyavivatransfer.com/tr/faq)
- [Transfer7 — Rezervasyon, iptal ve iade koşulları](https://www.transfer7.com/tr/politikalar/rezervasyon-satis-iptal-ve-iade-kosullari)
- [Antalya Airport Transfers — Frequently Asked Questions](https://www.antalyaairporttransfers.co.uk/en/frequently-asked-questions)
- [Antalya Airport Shuttle — FAQ](https://www.antalyaairportshuttle.com/frequently-asked-questions)
- [Suntransfers](https://www.suntransfers.com/)
- [HolidayTaxis — FAQs](https://www.holidaytaxis.com/en/about/faq/)
- [Rapid Airport Transfers — FAQ](https://rapidairporttransfers.co.uk/faq)
