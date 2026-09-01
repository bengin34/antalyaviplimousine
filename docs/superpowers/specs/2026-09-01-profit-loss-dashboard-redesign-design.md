# Kâr/Zarar Paneli Yeniden Tasarımı — Muhasebeci Dashboard

**Tarih:** 2026-09-01
**Durum:** Tasarım onaylandı, spec inceleme aşamasında
**İlgili:** [2026-08-21-profit-loss-dashboard-design.md](2026-08-21-profit-loss-dashboard-design.md), [2026-08-21-profit-distribution-design.md](2026-08-21-profit-distribution-design.md)

## 1. Amaç

Mevcut kâr/zarar ekranı bölümleri dikey yığıyor (KPI → dağıtım → gider dağılımı → seyahat geçmişi), sonsuz aşağı scroll üretiyor. Kullanıcı (işletme sahibi) muhasebeci gibi gün bazlı, Excel benzeri, satır/hücre düzenlenebilir bir görünüm istiyor. Masaüstünde tablo, mobilde kart olmalı.

Yeniden tasarım:
- Sabit KPI şeridi + dönem sekmeleri + tek aktif grid.
- Gün gruplu Excel tablosu, gün ara toplamları, düzenlenebilir gider hücreleri.
- Araç gideri KM tabanlı; reklam gideri sefer başına yeniden dağıtılır.
- Dağıtılmış/dağıtılmamış kâr mantığı **aynen korunur**.

Kapsam dışı (YAGNI): yeni ödeme/rezervasyon alanları, kolon sıralama/filtre, CSV dışa aktarım, yeni DB tabloları, yeni harici kütüphane.

## 2. Mimari & bileşenler

Tümü mevcut admin React uygulaması içinde (`admin/react/`), kendi CSS'i (`admin/react/styles.css`). Yeni bağımlılık yok.

### 2.1 `ProfitLossPage.tsx` (yeniden yapılandırılır)
Şu an 724 satır ve çok iş yapıyor. Grid mantığı ayrı dosyaya çıkınca kabuğa iner:
- Veri çekme (`fetchAllBookings`, `fetchSettings`, dağıtım defteri) — **değişmez**.
- Sabit üst şerit: aktif dönemin KPI'ları (Net kâr, Gelir, Toplam gider, Marj).
- Dönem sekmeleri: `Dağıtılmamış` · her dağıtım (`period_start–period_end`) · `Tümü`.
- Aktif sekmeye göre `ProfitLedgerGrid` render eder.
- Mevcut kaydetme handler'ları (`saveDistance`, `saveSupplierCost`, `saveCostMode`, `saveNoCost`, `saveSetting`, `confirmDistribution`, `saveShareSettings`) korunur, grid'e ve dağıtım paneline geçirilir.

### 2.2 `ProfitLedgerGrid.tsx` (YENİ)
Tek sorumluluk: bir bacak (leg) listesini gün gruplu, düzenlenebilir/salt-okunur olarak sunmak. Responsive: masaüstü tablo, mobil kart.

Girdi (props):
- `legs: ProfitLeg[]` (çözülmüş + çözülmemiş, tarihe göre)
- `bookingsById: Map<string, Booking>`
- `editable: boolean` (Dağıtılmamış/Tümü = true, dağıtılmış dönem = false)
- `kmCostByMonth` bilgisi (araç gideri gösterimi için — metrics zaten hesaplar)
- kaydetme geri çağrıları (editable ise)
- `onFocusLeg`, `navigate`

Çıktı: gün gruplu tablo. Her gün: başlık satırı (tarih · sefer sayısı · gün net kârı) + ayak satırları + gün ara toplam satırı (Gelir/Araç/Tedarikçi/Karşılama/Reklam/Kâr).

Sütunlar: Sefer(ref+müşteri) · Rota · Gelir · **KM** · Araç · **Tedarikçi** · **Karşılama** · Reklam · Kâr. Koyu/işaretli hücreler düzenlenebilir; `editable=false` iken salt gösterim.

### 2.3 `ProfitLedgerCell` / satır-içi düzenleyici (YENİ, küçük)
Bir hücreye dokununca sayı girişi açan hafif bileşen. Mevcut `LegCostControls` (KM ve tedarikçi mantığını, maliyet modu geçişini biliyor) yeniden kullanılır ya da grid'e uygun ince bir sarmalayıcı yazılır. Kaydetme mevcut handler'lara gider — **yeni yazma yolu yok**.

### 2.4 `ProfitDistributionSection.tsx` (yeri değişir)
`Dağıtılmamış` sekmesinin içine yerleşir: dağıtım başlangıç/bitiş, pay yüzdeleri, dağıt butonu, blocker kartları. Dağıtım geçmişi listesi kaldırılır — geçmiş artık dönem sekmeleri olarak görünür. Snapshot okuma/yazma mantığı **değişmez**.

## 3. Dönem sekmeleri & veri kaynağı

| Sekme | Aralık | Kaynak | Düzenleme |
|-------|--------|--------|-----------|
| Dağıtılmamış | `latestOpenStart(settings, distributions)` → dün | Canlı `bookings` üzerinden hesap | **Evet** |
| Her dağıtım | `period_start`–`period_end` | Başlık: kayıtlı **snapshot** (değişmez, otoriter). Liste: aynı aralık için canlı yeniden hesaplanan bacaklar (salt gösterim) | Hayır |
| Tümü | Tüm zamanlar | Canlı hesap | Evet |

**Snapshot otoritesi:** Dağıtılmış dönemin başlık rakamları (gelir/gider/net/paylar) her zaman kayıtlı snapshot'tan gelir — sonradan veri değişse bile dağıtım anındaki değerler korunur (mevcut davranış). Alttaki bacak listesi bilgilendirme amaçlı yeniden hesaplanır; snapshot ile canlı hesap farklıysa küçük bir not gösterilir ("Güncel veriye göre; dağıtım anındaki değerler üstteki özettedir").

## 4. KM ve reklam mantığı

### 4.1 Araç gideri
`Araç gideri = tek yön KM × dönem km-başı ₺`. KM hücresi düzenlenir; araç gideri hesaplanan (salt gösterim). Bu mantık `resolveRealizedLegs`/`legCostModel` içinde zaten var — grid sadece gösterir. Satılan transfer bacağında KM yok; tedarikçi hücresi düzenlenir.

### 4.2 Reklam — sefer başına yeniden dağıtım (DEĞİŞİKLİK)
Aylık toplam reklam gideri tek yerden (dönem ayarı `advertising_expense_try`) girilir — **mevcut giriş korunur**. Dağıtım kuralı:

1. Aralığa gün oranıyla düşen reklam = mevcut `allocatedAdvertisingForRange` (aylık × dönem-günü/ay-günü).
2. Bu tutar, o aralıktaki **gerçekleşen bacak sayısına** bölünür → `advertisingPerLeg`.
3. Her bacağa `advertisingPerLeg` yazılır ve bacağın net kârına dahil edilir.

Dönem/gün toplam reklamı **değişmez** (bacak paylarının toplamı = gün-payı toplamı). Bacak sayısı 0 ise per-leg = 0.

Aylık dönem görünümlerinde (ör. "Ağustos") aralık = ayın tamamı; per-leg = aylık reklam ÷ o aydaki bacak sayısı.

## 5. Hesap katmanı değişiklikleri (`admin/profit-loss-metrics.js`)

- `legFinancials` / bacak üretimi: bacağa `advertisingPerLeg` alanı eklenir; `netProfit` artık reklam payını da düşer. (Şu an reklam bacak netine girmiyor, yalnız aylık toplu gider olarak özet altında.)
- Bacak net kârı = `gelir − araç − tedarikçi − karşılama − reklamPayı`. Gün/dönem toplamları bacak toplamlarıyla birebir tutmalı.
- `calculateProfitLossMetrics` ve `calculateProfitDistribution` toplam reklamı eskisi gibi üretir; ek olarak per-leg reklam bacaklara iliştirilir. Dağıtım snapshot'ı (`buildProfitDistributionSnapshot`) alan/şema olarak **değişmez** — yalnız toplam bucket'lar yazılır (mevcut).
- Yeni saf (pure) yardımcı: `attachAdvertisingPerLeg(legs, allocatedAdvertisingEur/Try)` — test edilebilir tek amaçlı fonksiyon.

## 6. Veri güvenliği (kritik — hiçbir veri kaybı olmayacak)

- **Şema değişikliği yok.** Yeni tablo/kolon yok, migration yok.
- **Yazma yolları değişmez.** Düzenleme yalnız mevcut `saveLegDistance / saveLegSupplierCost / saveLegCostMode / chauffeur_hire_days update` üzerinden gider. Bunlar tek alan patch'ler; grid yeni bir toplu yazma eklemez.
- **Dağıtım snapshot'ları değişmez (immutable).** Reklam per-leg yalnız **gösterim/hesap** katmanında; kayıtlı dağıtım satırlarını değiştirmez. Geçmiş dağıtım rakamları snapshot'tan okunmaya devam eder.
- **Reklam değişikliği geri-yansımaz.** Yeni per-leg dağıtımı sadece canlı görünümde; mevcut kayıtlı dağıtımların reklam bucket'ı olduğu gibi kalır.
- **Salt-okunur dağıtılmış sekmeler.** Kullanıcı geçmiş dönemi yanlışlıkla düzenleyemez (`editable=false`).
- Yeniden yapılandırma tamamen sunum katmanı; `bookings`/`profit_loss_settings`/`profit_distributions` okuma sorguları (`BOOKING_COLUMNS` vb.) korunur.

## 7. Test stratejisi

**Birim (`admin/profit-loss-metrics.test` benzeri):**
- `attachAdvertisingPerLeg`: N bacağa eşit bölme; toplam korunur; 0 bacak → 0; kuruş yuvarlama tutarlı.
- Bacak net kârı reklam payını içerir; gün ara toplamı = bacak toplamı; dönem net = Σ bacak net.
- Toplam reklam (dönem) eskisiyle aynı kalır (regresyon).
- Dağıtım snapshot alanları değişmemiş (regresyon).

**Bileşen (`@testing-library/react`):**
- `ProfitLedgerGrid`: gün grubu başlığı + ara toplam render; düzenlenebilir hücre dokunma → doğru handler çağrısı; `editable=false` iken düzenleyici yok; mobil kart render (viewport/class).
- `ProfitLossPage`: sekme değişimi doğru aralığı/gridi gösterir; dağıtılmış sekme snapshot başlığı gösterir.

**Regresyon:** mevcut `ProfitDistributionSection.test.tsx`, `ProfitLossPage.*.test.tsx` yeşil kalır (gerekirse taşınan yapıya göre güncellenir, davranış korunur).

## 8. Kabul kriterleri

1. Kâr/zarar ekranı sabit KPI şeridi + dönem sekmeleri + tek grid gösterir; sonsuz yığılı bölüm yok.
2. Masaüstünde gün gruplu Excel tablosu, mobilde sefer kartları.
3. KM, tedarikçi, karşılama hücreleri düzenlenebilir; kaydetme mevcut handler'lara gider ve hesap anında güncellenir.
4. Araç gideri = KM × km-başı ₺ olarak gösterilir.
5. Reklam sefer başına dağıtılır (gün-payı ÷ bacak sayısı); dönem toplam reklamı korunur.
6. Dağıtılmamış sekme düzenlenebilir + dağıt butonu; dağıtılmış sekmeler salt-okunur snapshot; Tümü sekmesi tüm zamanlar.
7. Hiçbir veri kaybı: şema/yazma yolu/snapshot değişmez.
8. Tüm testler (yeni + mevcut) geçer.
