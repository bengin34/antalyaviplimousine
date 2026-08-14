import { useEffect, useState } from "react";

const demoWhatsApp =
  "https://wa.me/905302655790?text=" +
  encodeURIComponent(
    "Merhaba, kliniğim için ORIVA benzeri markama özel bir web sitesi demosu hakkında görüşmek istiyorum.",
  );

const services = [
  {
    index: "01",
    title: "Yüz & burun estetiği",
    text: "Burun, göz çevresi ve yüz cerrahisine ilişkin talepler; anatomi, işlev, tıbbi öykü ve kişisel beklentiler birlikte ele alınarak değerlendirilir.",
    note: "Nihai uygunluk yalnız hekim muayenesi ve gerekli tetkiklerden sonra belirlenebilir.",
  },
  {
    index: "02",
    title: "Vücut estetiği",
    text: "Meme ve vücut şekillendirme işlemleri; cerrahi değerlendirme, iyileşme beklentisi ve anestezi uygunluğuyla birlikte kişiye özel planlanır.",
    note: "Her cerrahi işlem risk içerir ve her işlem herkes için uygun değildir.",
  },
  {
    index: "03",
    title: "Saç restorasyonu",
    text: "Saç kaybının tipi, donör alanın kapasitesi, saç çizgisi beklentisi ve gelecekteki kayıp ihtimali aynı plan içinde değerlendirilir.",
    note: "Yöntem, olası greft planı ve uygunluk hekim değerlendirmesine bağlıdır; sonuç garanti edilemez.",
  },
  {
    index: "04",
    title: "Gülüş estetiği",
    text: "İmplant, restoratif uygulamalar ve estetik diş hekimliği seçenekleri; ağız sağlığı, görüntüleme ve fonksiyonla birlikte aşamalı olarak planlanır.",
    note: "Uzaktan hazırlanan fikir ön değerlendirmedir; nihai plan klinik ve radyolojik muayeneyle kesinleşir.",
  },
];

const doctors = [
  {
    name: "Dr. Ada Varel",
    role: "Estetik cerrahi odak alanı",
    image: "doctor-ada-varel",
    alt: "Yapay olarak üretilmiş kurgu hekim portresi Ada Varel",
    education:
      "Temsili tıp eğitimi ve estetik-rekonstrüktif cerrahi odaklı ileri eğitim kurgusu; yüz anatomisi, cerrahi güvenlik ve hasta iletişimi modülleri.",
    focus: "Yüz ve vücut cerrahisinde uygunluk değerlendirmesi, oran odaklı planlama ve iyileşme süreci iletişimi.",
    principle: "Hastanın yalnız neyi değiştirmek istediğini değil, neyi korumak istediğini de anlamak.",
  },
  {
    name: "Dr. Kerem Loran",
    role: "Saç restorasyonu odak alanı",
    image: "doctor-kerem-loran",
    alt: "Yapay olarak üretilmiş kurgu hekim portresi Kerem Loran",
    education:
      "Temsili tıp eğitimi; saçlı deri anatomisi, donör alan değerlendirmesi ve cerrahi saç restorasyonu üzerine mesleki gelişim kurgusu.",
    focus: "Saç çizgisi planlaması, donör kapasitesinin korunması ve uzun vadeli saç kaybının birlikte değerlendirilmesi.",
    principle: "En yüksek sayıyı değil, mevcut kaynakla sürdürülebilir bir planı konuşmak.",
  },
  {
    name: "Dt. Nil Arven",
    role: "Estetik diş hekimliği odak alanı",
    image: "doctor-nil-arven",
    alt: "Yapay olarak üretilmiş kurgu diş hekimi portresi Nil Arven",
    education:
      "Temsili diş hekimliği eğitimi; restoratif diş hekimliği, kapanış ilişkileri ve dijital gülüş planlaması odaklı eğitim kurgusu.",
    focus: "Diş dokusunu koruyan alternatifler, aşamalı tedavi planlaması ve işlev-estetik dengesi.",
    principle: "Görsel değişimi ağız sağlığı ve doğal fonksiyonla birlikte değerlendirmek.",
  },
];

const cases = [
  {
    number: "VAKA KURGUSU 01",
    title: "Doğal saç çizgisi planlaması",
    image: "case-hairline",
    alt: "Yapay olarak üretilmiş temsili saç çizgisi değerlendirme sahnesi",
    question: "Donör alan korunarak uzun dönemli bir plan nasıl yapılır?",
    assessment: "Saç kaybı tipi · Donör kapasitesi · Yüz oranları · Gelecek kayıp olasılığı",
    output: "Örnek değerlendirme gündemi ve takip aşamaları",
  },
  {
    number: "VAKA KURGUSU 02",
    title: "Yüz oranlarını koruyan yaklaşım",
    image: "case-facial-profile",
    alt: "Yapay olarak üretilmiş temsili yüz profili görüşmesi",
    question: "Profil görünümü ve işlevsel ihtiyaçlar birlikte nasıl değerlendirilir?",
    assessment: "Anatomi · İşlev · Doku özellikleri · Kişisel beklenti · Alternatifler",
    output: "Örnek muayene gündemi ve iyileşme iletişim planı",
  },
  {
    number: "VAKA KURGUSU 03",
    title: "Doku koruyucu gülüş planı",
    image: "case-smile-planning",
    alt: "Yapay olarak üretilmiş temsili dijital gülüş planlama görüşmesi",
    question: "Estetik beklenti, ağız sağlığı ve fonksiyonla nasıl dengelenir?",
    assessment: "Diş eti · Kapanış · Görüntüleme · Koruyucu seçenekler · Zaman planı",
    output: "Örnek tedavi karar çerçevesi ve ziyaret planı",
  },
];

const personas = [
  {
    code: "A",
    context: "Yurt dışından gelen cerrahi adayı",
    quote: "Yolculuk yapmadan önce kimin, neyi ve ne zaman yapacağını bilmek istiyorum.",
  },
  {
    code: "B",
    context: "Saç restorasyonu araştıran ziyaretçi",
    quote: "Sadece sonuç görseli değil, donör alanın nasıl değerlendirildiğini de anlamak istiyorum.",
  },
  {
    code: "C",
    context: "Diş tedavisi planlayan ziyaretçi",
    quote: "Ülkeme döndükten sonra hangi durumda kime ulaşacağımın açık olmasını istiyorum.",
  },
];

const journey = [
  ["İlk temas", "Genel beklenti, tercih edilen dil, sağlık öyküsü ve zaman planı dinlenir."],
  ["Doğru uzmanlık", "Talep, ilgili tıp veya diş hekimliği uzmanlık alanına yönlendirilir."],
  ["Ön değerlendirme", "Gerekli bilgiler güvenli kanalla incelenir; bunun nihai tanı olmadığı açıkça belirtilir."],
  ["Yazılı plan", "Seçenekler, riskler, alternatifler, tahmini takvim ve ücret kapsamı anlatılır."],
  ["Muayene & onam", "Nihai karar yüz yüze muayene, gerekli tetkikler ve aydınlatılmış onam sonrasında verilir."],
  ["Bakım & takip", "Bakım talimatları, kontrol tarihleri ve klinik iletişim yolu yazılı paylaşılır."],
];

const safeguards = [
  ["Yetki ve ruhsat", "Canlı projede resmi belge numarası ve doğrulama bağlantısı burada gösterilir."],
  ["Uzmanlık doğrulaması", "Hekimin mevzuatta tanımlı uzmanlığı ve çalıştığı sağlık kuruluşu açıkça belirtilir."],
  ["Gerçek tesis görünürlüğü", "Stok görsel yerine gerçek adres ve izinli tesis fotoğrafları kullanılır."],
  ["Anestezi ve acil plan", "Sorumlu ekip, tesis altyapısı ve sevk prosedürü işlem öncesinde açıklanır."],
  ["Onam ve mahremiyet", "Sağlık verisinin kimle, hangi amaçla paylaşılacağı görünür biçimde anlatılır."],
  ["Takip sorumluluğu", "Dönüş sonrası klinik sorumluluk ve ulaşılacak kanal önceden belirlenir."],
];

const faqs = [
  ["ORIVA gerçek bir klinik mi?", "Hayır. ORIVA, premium klinik web deneyimini göstermek için oluşturulmuş kurgusal bir marka konseptidir. Bu sayfa randevu veya sağlık hizmeti sunmaz."],
  ["Bu sayfadaki hekimler gerçek mi?", "Hayır. İsimler, portreler, eğitim anlatıları ve deneyim alanları tamamen temsili tasarım içeriğidir; diploma, ruhsat veya meslek kaydı beyanı değildir."],
  ["Vaka ve hasta anlatıları gerçek mi?", "Hayır. Hiçbiri gerçek hastayı, tedaviyi, yorumu veya sonucu temsil etmez. Canlı projede yalnız açık kullanım izni bulunan, doğrulanabilir materyaller kullanılmalıdır."],
  ["Bir işlemin uygunluğuna çevrim içi karar verilebilir mi?", "Hayır. Çevrim içi görüşme yalnız ön bilgi sağlayabilir. Uygunluk, ilgili hekimin muayenesi ve gerekli tetkikler sonrasında belirlenir."],
  ["Tedavi sonucu garanti edilebilir mi?", "Hayır. Tıbbi ve estetik sonuçlar kişiden kişiye değişir; belirli bir sonuç, greft sayısı veya iyileşme süresi garanti edilemez."],
  ["Gerçek klinik sitesinde fiyat nasıl sunulmalı?", "Fiyat; kişisel plan, işlem kapsamı, tesis, tetkik ve takip ihtiyacına göre kalemlendirilmelidir. Kapsam değişirse nedeni ve ek maliyet karar öncesinde açıklanmalıdır."],
  ["Demo sağlık verisi topluyor mu?", "Hayır. Bu sayfadaki iletişim çağrısı yalnız klinik web sitesi sunumu içindir; sağlık raporu, hasta fotoğrafı veya tıbbi bilgi kabul etmez."],
];

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={down ? "M6 9l6 6 6-6" : "M5 19L19 5M8 5h11v11"} />
    </svg>
  );
}

function ClinicPicture({
  name,
  alt,
  className,
  eager = false,
}: {
  name: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <picture className={className}>
      <source srcSet={`/assets/optimized/clinic/${name}.webp`} type="image/webp" />
      <img
        src={`/assets/optimized/clinic/${name}.jpg`}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
      />
    </picture>
  );
}

export function ClinicPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.body.classList.toggle("clinic-menu-open", menuOpen);
    return () => document.body.classList.remove("clinic-menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="clinic-page" id="clinic-top">
      <aside className="clinic-demo-ribbon" role="note">
        <strong>KURGU SATIŞ DEMOSU</strong>
        <span>ORIVA gerçek bir sağlık kuruluşu değildir; tüm kişi, vaka ve anlatılar temsilidir.</span>
      </aside>

      <header className="clinic-header">
        <a className="clinic-logo" href="#clinic-top" aria-label="ORIVA Concept Clinic demo ana sayfa">
          <span className="clinic-logo-mark" aria-hidden="true">O</span>
          <span><strong>ORIVA</strong><small>Concept Clinic · Antalya</small></span>
        </a>
        <nav className="clinic-desktop-nav" aria-label="Klinik demo navigasyonu">
          <a href="#clinic-approach">Yaklaşım</a>
          <a href="#clinic-services">Tedavi alanları</a>
          <a href="#clinic-team">Kurgu uzmanlar</a>
          <a href="#clinic-cases">Demo vakalar</a>
          <a href="#clinic-journey">Hasta yolculuğu</a>
        </nav>
        <a className="clinic-header-cta" href="#clinic-contact">
          Markanıza uyarlayın <Arrow />
        </a>
        <button
          className={`clinic-menu-button${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`clinic-mobile-menu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobil klinik demo navigasyonu">
          {[
            ["Yaklaşım", "#clinic-approach"],
            ["Tedavi alanları", "#clinic-services"],
            ["Kurgu uzmanlar", "#clinic-team"],
            ["Demo vakalar", "#clinic-cases"],
            ["Hasta yolculuğu", "#clinic-journey"],
            ["Güvenlik", "#clinic-safety"],
            ["SSS", "#clinic-faq"],
          ].map(([label, href]) => (
            <a href={href} key={href} onClick={closeMenu}>{label}</a>
          ))}
        </nav>
        <a href="#clinic-contact" className="clinic-mobile-menu-cta" onClick={closeMenu}>
          Markanıza özel demo isteyin <Arrow />
        </a>
      </div>

      <main>
        <section className="clinic-hero">
          <ClinicPicture
            name="oriva-hero"
            alt="Yapay olarak üretilmiş kurgu hekim ve premium klinik görüşme odası"
            className="clinic-hero-media"
            eager
          />
          <div className="clinic-hero-shade" aria-hidden="true" />
          <div className="clinic-hero-copy">
            <p className="clinic-kicker">ORIVA / ANTALYA — CONCEPT CLINIC</p>
            <h1>Daha fazlası değil.<br /><em>Size uygun olan.</em></h1>
            <p className="clinic-hero-lead">
              Estetik cerrahi, saç restorasyonu ve gülüş estetiğinde; tıbbi değerlendirmeyi,
              açık iletişimi ve sakin bir hasta deneyimini merkezine alan premium klinik konsepti.
            </p>
            <div className="clinic-hero-actions">
              <a className="clinic-button clinic-button-light" href="#clinic-journey">
                Demo süreci görün <Arrow />
              </a>
              <a className="clinic-text-link" href="#clinic-services">
                Tedavi alanlarını keşfedin <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="clinic-hero-note">Bu sayfa tasarım demosudur; randevu veya sağlık hizmeti sunmaz.</p>
          </div>
          <div className="clinic-hero-index" aria-hidden="true">
            <span>Antalya</span><i /><span>36.89° N</span>
          </div>
        </section>

        <section className="clinic-value-strip" aria-label="ORIVA yaklaşım ilkeleri">
          {["Doğru uzmanlık", "Kişisel değerlendirme", "Açık risk iletişimi", "Planlı takip"].map((item, index) => (
            <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
          ))}
        </section>

        <section className="clinic-section clinic-approach" id="clinic-approach">
          <div className="clinic-section-intro">
            <div>
              <p className="clinic-eyebrow">ORIVA YAKLAŞIMI</p>
              <h2>Bir işlemi değil,<br /><em>karar kalitesini</em> tasarlıyoruz.</h2>
            </div>
            <p>
              Güven, etkileyici bir sonuç vaadinden önce doğru uzmanlık, gerçekçi beklenti ve
              anlaşılır bir süreç gerektirir. ORIVA konsepti, hastanın karar vermeden önce doğru
              soruları görebildiği bir klinik deneyimini örnekler.
            </p>
          </div>
          <div className="clinic-approach-grid">
            {[
              ["Önce dinle", "İstenen değişiklik kadar korunmak istenen özellikleri de anlamaya odaklanan görüşme yapısı."],
              ["Açıkça anlat", "Alternatiflerin, risklerin, iyileşme sürecinin ve kapsam dışı kalemlerin karar öncesinde konuşulması."],
              ["Kişiye göre planla", "Tek tip paket yerine muayene, sağlık geçmişi ve kişisel önceliklere göre oluşturulan plan."],
              ["Takibi görünür kıl", "Bakım, kontrol ve iletişim adımlarının işlemden önce açıklanması."],
            ].map(([title, body], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="clinic-section clinic-services" id="clinic-services">
          <div className="clinic-section-intro clinic-section-intro-light">
            <div>
              <p className="clinic-eyebrow">TEDAVİ ALANLARI</p>
              <h2>Her talep,<br /><em>doğru uzmanlıkla</em> başlar.</h2>
            </div>
            <p>
              Paket satışı yerine klinik uygunluğu, alternatifleri ve kişisel öncelikleri görünür
              kılan örnek hizmet mimarisi.
            </p>
          </div>
          <div className="clinic-service-list">
            {services.map((service) => (
              <article key={service.index}>
                <span className="clinic-service-index">{service.index}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <small>{service.note}</small>
                <a href="#clinic-journey" aria-label={`${service.title} için örnek süreci görün`}>
                  Örnek süreci görün <Arrow />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="clinic-section clinic-team" id="clinic-team">
          <div className="clinic-section-heading-row">
            <div>
              <p className="clinic-eyebrow">TEMSİLİ EKİP · GERÇEK SAĞLIK MESLEK MENSUBU DEĞİLDİR</p>
              <h2>Uzmanlığı görünür kılan<br /><em>profil tasarımı.</em></h2>
            </div>
            <p>
              İsimler, portreler ve mesleki geçmişler yalnızca sunum amacıyla kurgulanmıştır.
              Canlı projede tüm bilgiler resmi kaynaklardan doğrulanır.
            </p>
          </div>
          <div className="clinic-doctor-grid">
            {doctors.map((doctor, index) => (
              <article className="clinic-doctor-card" key={doctor.name}>
                <div className="clinic-doctor-media">
                  <ClinicPicture name={doctor.image} alt={doctor.alt} />
                  <span>YAPAY ÜRETİM · KURGU PORTRE</span>
                </div>
                <div className="clinic-doctor-header">
                  <span>0{index + 1}</span>
                  <div><h3>{doctor.name}</h3><p>{doctor.role}</p></div>
                </div>
                <dl>
                  <div><dt>Eğitim odağı</dt><dd>{doctor.education}</dd></div>
                  <div><dt>Deneyim odağı</dt><dd>{doctor.focus}</dd></div>
                  <div><dt>Yaklaşımı</dt><dd>“{doctor.principle}”</dd></div>
                </dl>
                <p className="clinic-profile-note">Demo profilidir; gerçek kişi, diploma, ruhsat veya kurum bağlantısı değildir.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="clinic-section clinic-cases" id="clinic-cases">
          <div className="clinic-section-heading-row clinic-section-heading-row-dark">
            <div>
              <p className="clinic-eyebrow">TEMSİLİ VAKA KURGULARI · GERÇEK HASTA VEYA SONUÇ DEĞİLDİR</p>
              <h2>Sonuçtan önce<br /><em>karar sürecini</em> gösterin.</h2>
            </div>
            <p>
              Bu galeri “öncesi–sonrası” iddiası taşımaz. Her kart, klinik düşünme biçiminin ve
              hasta iletişiminin nasıl anlatılabileceğini örnekler.
            </p>
          </div>
          <div className="clinic-case-grid">
            {cases.map((item) => (
              <article key={item.number}>
                <div className="clinic-case-media">
                  <ClinicPicture name={item.image} alt={item.alt} />
                  <span>YAPAY OLARAK ÜRETİLMİŞ TEMSİLİ GÖRSEL</span>
                </div>
                <div className="clinic-case-copy">
                  <p className="clinic-case-number">{item.number}</p>
                  <h3>{item.title}</h3>
                  <dl>
                    <div><dt>Başlangıç sorusu</dt><dd>{item.question}</dd></div>
                    <div><dt>Değerlendirme</dt><dd>{item.assessment}</dd></div>
                    <div><dt>Demo çıktısı</dt><dd>{item.output}</dd></div>
                  </dl>
                  <small>Konsept görselleştirme · Tıbbi sonuç veya tedavi önerisi göstermez.</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="clinic-section clinic-personas" aria-labelledby="clinic-personas-title">
          <div className="clinic-persona-intro">
            <p className="clinic-eyebrow">KURGU HASTA PERSONALARI · GERÇEK YORUM DEĞİLDİR</p>
            <h2 id="clinic-personas-title">Memnuniyet iddiası değil,<br /><em>gerçek ihtiyacı</em> dinleyen anlatılar.</h2>
          </div>
          <div className="clinic-persona-grid">
            {personas.map((persona) => (
              <article key={persona.code}>
                <div className="clinic-persona-avatar" aria-hidden="true">{persona.code}</div>
                <p>“{persona.quote}”</p>
                <div><strong>Persona {persona.code}</strong><span>{persona.context}</span></div>
                <small>Tasarım araştırması için yazılmış temsili metindir; gerçek hasta görüşü değildir.</small>
              </article>
            ))}
          </div>
        </section>

        <section className="clinic-section clinic-journey" id="clinic-journey">
          <div className="clinic-journey-title">
            <p className="clinic-eyebrow">HASTA YOLCULUĞU</p>
            <h2>Belirsizliği azaltan<br /><em>altı net adım.</em></h2>
            <p>İlk temastan dönüş sonrası takibe kadar her sorumluluk, karar anından önce görünür olmalı.</p>
          </div>
          <ol className="clinic-journey-list">
            {journey.map(([title, body], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </li>
            ))}
          </ol>
          <p className="clinic-journey-note">
            Bu akış satış demosu için temsili hazırlanmıştır. Gerçek klinik süreç hizmete ve kişinin sağlık durumuna göre değişir.
          </p>
        </section>

        <section className="clinic-international">
          <div className="clinic-international-copy">
            <p className="clinic-eyebrow">ULUSLARARASI HASTA DENEYİMİ</p>
            <h2>Tedavi yolculuğu,<br /><em>parçalı hissettirmemeli.</em></h2>
            <p>
              Havaalanı, otel, klinik programı, dil desteği ve refakatçi planlamasının tek bir
              koordinasyon akışında nasıl sunulabileceğini gösteren örnek deneyim.
            </p>
          </div>
          <div className="clinic-international-grid">
            {["Tek koordinasyon noktası", "Havalimanı–otel–klinik programı", "Tercih edilen dilde iletişim", "Yazılı günlük plan", "Refakatçi lojistiği", "Dönüş öncesi kontrol takvimi"].map((item) => (
              <div key={item}><span aria-hidden="true">✓</span>{item}</div>
            ))}
          </div>
          <small>Canlı projede her hizmetin sağlayıcısı, kapsamı ve ücreti ayrı belirtilmelidir.</small>
        </section>

        <section className="clinic-section clinic-safety" id="clinic-safety">
          <div className="clinic-section-heading-row">
            <div>
              <p className="clinic-eyebrow">GÜVENLİK & KANIT ALANI</p>
              <h2>Konfor tasarlanır.<br /><em>Güvenlik belgelenir.</em></h2>
            </div>
            <p>
              Şık bir arayüz tek başına güven kanıtı değildir. Canlı projede bu alanlar yalnız
              doğrulanmış klinik bilgileriyle doldurulur.
            </p>
          </div>
          <div className="clinic-safety-grid">
            {safeguards.map(([title, body], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="clinic-section clinic-faq" id="clinic-faq">
          <div className="clinic-faq-intro">
            <p className="clinic-eyebrow">SIK SORULANLAR</p>
            <h2>Net cevaplar,<br /><em>güvenli kararlar.</em></h2>
            <p>Demo ile gerçek klinik içeriği arasındaki sınır burada açıkça tanımlanır.</p>
          </div>
          <div className="clinic-faq-list">
            {faqs.map(([question, answer], index) => {
              const open = openFaq === index;
              return (
                <article className={open ? "is-open" : ""} key={question}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`clinic-faq-answer-${index}`}
                    onClick={() => setOpenFaq(open ? -1 : index)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{question}</strong>
                    <i><Arrow down /></i>
                  </button>
                  <div id={`clinic-faq-answer-${index}`} hidden={!open}><p>{answer}</p></div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="clinic-contact" id="clinic-contact">
          <div className="clinic-contact-copy">
            <p className="clinic-eyebrow">KLİNİĞİNİZ İÇİN</p>
            <h2>Bu deneyimi<br /><em>gerçek markanızla</em> görün.</h2>
            <p>
              Doğrulanmış uzmanlıklarınız, gerçek tesisiniz ve hasta yolculuğunuzla; güven veren,
              çok dilli ve dönüşüm odaklı bir klinik web deneyimi tasarlayalım.
            </p>
            <a className="clinic-button clinic-button-copper" href={demoWhatsApp} target="_blank" rel="noreferrer">
              Canlı sunum talep edin <Arrow />
            </a>
            <small>Bu bağlantı yalnız web sitesi satış görüşmesi başlatır; tıbbi randevu veya ön değerlendirme oluşturmaz.</small>
          </div>
          <div className="clinic-contact-card">
            <p>MARKANIZA ÖZEL KAPSAM</p>
            <ul>
              <li><span>01</span>Gerçek hekim ve uzmanlık profilleri</li>
              <li><span>02</span>İzinli vaka ve hasta hikâyesi sistemi</li>
              <li><span>03</span>Çok dilli uluslararası hasta akışı</li>
              <li><span>04</span>KVKK uyumlu başvuru deneyimi</li>
              <li><span>05</span>SEO, performans ve mobil optimizasyon</li>
            </ul>
            <a href={demoWhatsApp} target="_blank" rel="noreferrer">İçerik kapsamını konuşalım <Arrow /></a>
          </div>
        </section>
      </main>

      <footer className="clinic-footer">
        <div className="clinic-footer-brand">
          <span className="clinic-logo-mark" aria-hidden="true">O</span>
          <div><strong>ORIVA</strong><small>Concept Clinic · Antalya</small></div>
        </div>
        <p className="clinic-demo-disclaimer">
          ORIVA Clinic ve bu sayfadaki kişiler, hizmet anlatıları, hasta yolculukları ve vaka
          içerikleri kurgusaldır. Sayfa yalnız web tasarımı ve satış sunumu amacıyla hazırlanmıştır;
          tıbbi tavsiye, randevu, kurum yetkisi veya klinik sonuç beyanı içermez.
        </p>
        <div className="clinic-footer-links">
          <a href="#clinic-top">Başa dön</a>
          <a href="#clinic-faq">Demo açıklaması</a>
          <a href={demoWhatsApp} target="_blank" rel="noreferrer">Satış görüşmesi</a>
        </div>
      </footer>

      <a className="clinic-mobile-sticky" href={demoWhatsApp} target="_blank" rel="noreferrer">
        <span><small>KLİNİĞİNİZ İÇİN</small>Markanıza özel demo</span><Arrow />
      </a>
    </div>
  );
}
