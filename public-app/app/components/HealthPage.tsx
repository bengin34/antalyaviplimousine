import { useState } from "react";
import { useLanguage } from "../i18n";
import { Header } from "./Header";
import { Icon } from "./Icon";

type HealthLanguage = "en" | "de" | "tr" | "ru";
type HealthIcon = "sparkle" | "user-check" | "shield" | "check-circle";

type HealthCopy = {
  navCta: string;
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
    note: string;
    imageAlt: string;
  };
  principles: Array<{ title: string; body: string }>;
  consultation: {
    label: string;
    title: string;
    body: string;
    field: string;
    options: string[];
    cta: string;
    call: string;
    note: string;
    message: string;
  };
  trust: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    suitability: string;
    items: Array<{
      number: string;
      title: string;
      body: string;
      note: string;
      icon: HealthIcon;
    }>;
  };
  roles: {
    eyebrow: string;
    title: string;
    intro: string;
    coordinatorTitle: string;
    coordinatorItems: string[];
    medicalTitle: string;
    medicalItems: string[];
    notice: string;
  };
  journey: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  standards: {
    eyebrow: string;
    title: string;
    intro: string;
    items: string[];
    cardLabel: string;
    cardTitle: string;
    cardBody: string;
    cardItems: string[];
  };
  scope: {
    eyebrow: string;
    title: string;
    intro: string;
    includedTitle: string;
    included: string[];
    separateTitle: string;
    separate: string[];
    note: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ question: string; answer: string }>;
  };
  final: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    secondary: string;
    notice: string;
  };
  footer: {
    tagline: string;
    explore: string;
    home: string;
    services: string;
    process: string;
    contact: string;
    legal: string;
    privacy: string;
    imprint: string;
    disclaimer: string;
  };
};

const healthCopy: Record<HealthLanguage, HealthCopy> = {
  en: {
    navCta: "Request a consultation",
    hero: {
      eyebrow: "International health travel coordination · Antalya",
      title: "A considered journey, built around your health.",
      body: "Antalya VIP Tourism coordinates appointments with authorised healthcare providers, private transfers, accommodation and travel logistics. Medical assessment, treatment decisions and clinical follow-up remain exclusively with the treating physician and healthcare provider.",
      primary: "Request a coordination call",
      secondary: "See how it works",
      note: "Clear roles · Written plan · Named provider · Respect for your data",
      imageAlt: "Calm private consultation lounge overlooking the Mediterranean in Antalya",
    },
    principles: [
      { title: "Every role is clear", body: "The provider, physician and coordination responsibilities are explained separately." },
      { title: "Clinical decisions stay clinical", body: "Suitability, method and treatment scope are determined only by an authorised physician." },
      { title: "The plan is written", body: "Timing, inclusions, exclusions and possible changes are set out before you travel." },
      { title: "Aftercare is mapped", body: "Discharge advice, follow-up dates and the clinical contact route are clarified before departure." },
    ],
    consultation: {
      label: "Start with a conversation",
      title: "Tell us what you are considering.",
      body: "Choose an area and request a callback. We will explain the coordination route before any medical information is requested.",
      field: "Area of interest",
      options: ["Hair restoration", "Aesthetic surgery", "Dental care", "Non-surgical aesthetics", "I am not sure yet"],
      cta: "Continue on WhatsApp",
      call: "Or call +90 530 265 57 90",
      note: "Please do not send medical records or photographs in the first message. The receiving healthcare provider and consent process should be confirmed first.",
      message: "Hello, I would like to request an initial health travel coordination call. Area of interest:",
    },
    trust: {
      eyebrow: "A more responsible standard",
      title: "Trust starts with the right information.",
      intro: "Before any journey, you should know who will assess you, where the service will take place, what the indicative plan includes and who remains responsible after you return home. Our job is to make those answers visible and keep the non-clinical parts moving together.",
    },
    services: {
      eyebrow: "Areas we coordinate",
      title: "One journey. Specialist-led care.",
      intro: "We coordinate the travel around your care. The healthcare provider evaluates suitability and defines every clinical detail.",
      suitability: "Final suitability requires a physician's assessment.",
      items: [
        { number: "01", title: "Hair restoration", body: "Coordination for hair-transplant enquiries, provider appointments, private transport, accommodation and the schedule around treatment.", note: "FUE, DHI or another approach is selected by the treating team after assessment.", icon: "sparkle" },
        { number: "02", title: "Aesthetic surgery", body: "A carefully paced travel plan for facial and body procedures, including appointments, companion logistics and recovery-day transport.", note: "An online review is not final surgical approval; the plan may change after examination and tests.", icon: "user-check" },
        { number: "03", title: "Dental care", body: "Coordination for implant, restorative and smile-related enquiries, with travel timing built around the number of clinical visits.", note: "The dental plan is confirmed after examination and any required imaging.", icon: "shield" },
        { number: "04", title: "Non-surgical aesthetics", body: "Appointment and travel coordination for eligible physician-led aesthetic applications, with transparent provider and product information.", note: "Indication, product, dose and risks must be discussed directly with the healthcare professional.", icon: "check-circle" },
      ],
    },
    roles: {
      eyebrow: "One point of contact, two distinct roles",
      title: "Coordination is not medical care.",
      intro: "Keeping this boundary visible is essential. We organise the journey; authorised medical professionals assess and treat you.",
      coordinatorTitle: "Antalya VIP Tourism coordinates",
      coordinatorItems: ["Airport, hotel and provider transfers", "Accommodation and companion logistics", "Appointment and daily itinerary flow", "Language and communication assistance where arranged", "Non-clinical changes to the travel plan"],
      medicalTitle: "The healthcare provider manages",
      medicalItems: ["Diagnosis and medical suitability", "Choice and scope of treatment", "Risks, alternatives and recovery guidance", "Informed consent, procedures and medication", "Clinical follow-up and complication management"],
      notice: "Antalya VIP Tourism is not a healthcare provider and does not diagnose, recommend a treatment method or promise a medical or aesthetic outcome.",
    },
    journey: {
      eyebrow: "Your journey",
      title: "Six clear steps from first call to return.",
      intro: "Each handover is defined so you always know who you are speaking to and what happens next.",
      items: [
        { title: "Initial conversation", body: "We learn your travel expectations, preferred language and approximate dates without requesting detailed health data." },
        { title: "Provider introduction", body: "The healthcare provider responsible for the assessment is identified before records are shared." },
        { title: "Consent and records", body: "Only necessary information is transferred to the named provider after the relevant privacy and consent information is clear." },
        { title: "Physician pre-assessment", body: "The clinical team gives an initial view. This is not a final diagnosis, treatment approval or result guarantee." },
        { title: "Written plan", body: "Clinical and travel costs, inclusions, exclusions, timing and possible changes are presented separately." },
        { title: "Arrival and follow-up", body: "The final plan follows in-person assessment. Before return, the provider supplies aftercare and contact instructions." },
      ],
    },
    standards: {
      eyebrow: "Provider selection",
      title: "What we look for before making an introduction.",
      intro: "A polished lobby is not evidence of clinical quality. Provider identity, authority, physician responsibility and continuity of care matter more.",
      items: ["Verifiable legal identity and physical address", "Relevant international health-tourism authorisation", "Named physician and clearly stated specialty", "Written consent, risk and alternatives process", "Transparent clinical and non-clinical pricing", "Documented discharge and follow-up route"],
      cardLabel: "Before you decide",
      cardTitle: "Ask for the complete picture.",
      cardBody: "You should receive enough information to compare options calmly, without countdowns, pressure or guaranteed-result language.",
      cardItems: ["Who will perform each stage?", "What can change after examination?", "Which costs sit outside the plan?", "Who is the clinical contact after return?"],
    },
    scope: {
      eyebrow: "Transparent scope",
      title: "No vague 'all-inclusive' promise.",
      intro: "Medical care and travel services should be shown as separate lines. Your written plan should state exactly what is included and what remains conditional.",
      includedTitle: "Travel coordination may include",
      included: ["Private airport and local transfers", "Accommodation coordination", "Appointment and itinerary management", "Companion and language logistics", "Return-travel planning around clinical advice"],
      separateTitle: "Always confirmed separately",
      separate: ["Healthcare provider's clinical fees", "Tests, medication and additional procedures", "Flights, insurance and visa costs", "Changes following in-person examination", "Unexpected or emergency medical care"],
      note: "The exact scope is defined in the written proposal. Flights should be booked only after the treating provider confirms the recommended schedule.",
    },
    faq: {
      eyebrow: "Frequently asked",
      title: "Questions worth asking before you travel.",
      intro: "Clear answers are part of informed decision-making.",
      items: [
        { question: "Does Antalya VIP Tourism provide treatment?", answer: "No. Antalya VIP Tourism is not a healthcare provider. Diagnosis, treatment and clinical follow-up are delivered by the identified authorised healthcare provider and its medical professionals." },
        { question: "Which technique is right for me?", answer: "Only the relevant physician can answer after reviewing your history, examination findings and any necessary tests. Our coordination team does not recommend a clinical method." },
        { question: "Is an online plan final?", answer: "No. An online review is preliminary. The plan and price may change after in-person examination or additional tests; any change should be explained and approved before treatment." },
        { question: "Can a result be guaranteed?", answer: "No. Medical and aesthetic outcomes vary by person, procedure and recovery. A responsible provider does not guarantee a specific result." },
        { question: "How long should I stay in Antalya?", answer: "The safe duration depends on the procedure and the treating physician's advice. Confirm the clinical schedule before booking flights." },
        { question: "What happens after I return home?", answer: "The provider should issue written aftercare and follow-up instructions. The coordination line is not an emergency medical service; use local emergency care whenever urgent help is needed." },
      ],
    },
    final: {
      eyebrow: "Your first step",
      title: "See the whole picture before you decide.",
      body: "Tell us the area you are considering. We will explain what information is needed, which healthcare provider would assess it and how the travel stages fit together.",
      cta: "Request a coordination call",
      secondary: "Call us",
      notice: "This is not a medical diagnosis or emergency channel. No medical documents are requested at the first step.",
    },
    footer: {
      tagline: "Private travel and concierge coordination in Antalya.",
      explore: "Explore",
      home: "Home",
      services: "Areas",
      process: "Process",
      contact: "Contact",
      legal: "Information",
      privacy: "Privacy",
      imprint: "Imprint",
      disclaimer: "Antalya VIP Tourism is not a healthcare provider. All medical assessment, treatment and clinical follow-up are the responsibility of the identified authorised healthcare provider and treating professionals.",
    },
  },
  tr: {
    navCta: "Ön görüşme iste",
    hero: {
      eyebrow: "Antalya'da uluslararası sağlık seyahati koordinasyonu",
      title: "Sağlığınız için doğru sorularla başlayan planlı bir yolculuk.",
      body: "Antalya VIP Tourism; yetkili sağlık kuruluşlarıyla randevu, özel transfer, konaklama ve seyahat lojistiğini koordine eder. Tıbbi değerlendirme, tedavi kararı ve klinik takip yalnızca ilgili hekim ve sağlık kuruluşu tarafından yürütülür.",
      primary: "Koordinasyon görüşmesi iste",
      secondary: "Süreç nasıl işliyor?",
      note: "Rolü açık · Planı yazılı · Sağlık kuruluşu belli · Kişisel veriye saygılı",
      imageAlt: "Antalya'da Akdeniz manzaralı sakin özel görüşme salonu",
    },
    principles: [
      { title: "Kimin ne yaptığı açık", body: "Sağlık kuruluşu, hekim ve koordinasyon sorumlulukları ayrı ayrı belirtilir." },
      { title: "Tıbbi karar hekime ait", body: "Uygunluk, yöntem ve tedavi kapsamı yalnızca yetkili hekim tarafından belirlenir." },
      { title: "Plan ve kapsam yazılı", body: "Takvim, dahil olanlar, hariç olanlar ve olası değişiklikler seyahatten önce sunulur." },
      { title: "Dönüş sonrası yol belli", body: "Taburculuk bilgisi, kontrol takvimi ve klinik iletişim kanalı ayrılmadan netleşir." },
    ],
    consultation: {
      label: "İlk adım bir görüşme",
      title: "Neyi değerlendirdiğinizi anlatın.",
      body: "İlgilendiğiniz alanı seçin ve geri arama talep edin. Sağlık bilgisi istenmeden önce koordinasyon yolunu açıklayalım.",
      field: "İlgilendiğiniz alan",
      options: ["Saç ekimi", "Estetik cerrahi", "Diş tedavisi", "Cerrahi olmayan estetik", "Henüz emin değilim"],
      cta: "WhatsApp'ta devam et",
      call: "Ya da +90 530 265 57 90'ı arayın",
      note: "İlk mesajda tıbbi belge veya fotoğraf göndermeyin. Önce değerlendirecek sağlık kuruluşu ve açık rıza süreci netleşmelidir.",
      message: "Merhaba, sağlık seyahati koordinasyonu için ilk görüşme talep ediyorum. İlgilendiğim alan:",
    },
    trust: {
      eyebrow: "Daha sorumlu bir standart",
      title: "Güven, doğru bilgiyle başlar.",
      intro: "Yola çıkmadan önce sizi kimin değerlendireceğini, işlemin nerede yapılacağını, planın neleri kapsadığını ve ülkenize döndükten sonra klinik sorumluluğun kimde olduğunu bilmelisiniz. Biz bu yanıtları görünür kılar, tıbbi olmayan parçaların birlikte ilerlemesini koordine ederiz.",
    },
    services: {
      eyebrow: "Koordine ettiğimiz alanlar",
      title: "Tek yolculuk. Uzmanların yönettiği bakım.",
      intro: "Biz bakımın çevresindeki seyahati koordine ederiz. Uygunluğu sağlık kuruluşu değerlendirir, tüm klinik ayrıntıları hekim belirler.",
      suitability: "Nihai uygunluk için hekim değerlendirmesi gerekir.",
      items: [
        { number: "01", title: "Saç ekimi", body: "Saç ekimi talepleri için sağlık kuruluşu randevusu, özel ulaşım, konaklama ve işlem çevresindeki programın koordinasyonu.", note: "FUE, DHI veya başka bir yönteme yalnız değerlendirme sonrası sağlık ekibi karar verir.", icon: "sparkle" },
        { number: "02", title: "Estetik cerrahi", body: "Yüz ve vücut cerrahilerinde randevu, refakatçi lojistiği ve iyileşme günlerine uygun transferleri içeren dengeli bir seyahat planı.", note: "Çevrim içi inceleme nihai ameliyat onayı değildir; plan muayene ve tetkiklerden sonra değişebilir.", icon: "user-check" },
        { number: "03", title: "Diş tedavisi", body: "İmplant, restoratif uygulamalar ve gülüş estetiği taleplerinde ziyaret sayısına göre randevu ve seyahat koordinasyonu.", note: "Diş tedavisi planı, muayene ve gerekli görüntüleme sonrasında kesinleşir.", icon: "shield" },
        { number: "04", title: "Cerrahi olmayan estetik", body: "Hekim tarafından yürütülen uygun estetik uygulamalar için şeffaf kuruluş ve ürün bilgisiyle randevu ve seyahat koordinasyonu.", note: "Endikasyon, ürün, doz ve riskler doğrudan sağlık meslek mensubuyla görüşülmelidir.", icon: "check-circle" },
      ],
    },
    roles: {
      eyebrow: "Tek iletişim noktası, iki ayrı rol",
      title: "Koordinasyon, sağlık hizmeti değildir.",
      intro: "Bu sınırın görünür kalması esastır. Biz yolculuğu düzenleriz; yetkili sağlık profesyonelleri sizi değerlendirir ve tedaviyi yürütür.",
      coordinatorTitle: "Antalya VIP Tourism koordine eder",
      coordinatorItems: ["Havalimanı, otel ve sağlık kuruluşu transferleri", "Konaklama ve refakatçi lojistiği", "Randevu ve günlük program akışı", "Planlanmışsa dil ve iletişim desteği", "Seyahat planındaki tıbbi olmayan değişiklikler"],
      medicalTitle: "Sağlık kuruluşu yürütür",
      medicalItems: ["Tanı ve tıbbi uygunluk değerlendirmesi", "Tedavi yönteminin ve kapsamının belirlenmesi", "Risk, alternatif ve iyileşme bilgisinin verilmesi", "Aydınlatılmış onam, işlem ve ilaç yönetimi", "Klinik takip ve komplikasyon yönetimi"],
      notice: "Antalya VIP Tourism bir sağlık kuruluşu değildir; tanı koymaz, tedavi yöntemi önermez ve tıbbi ya da estetik sonuç vaat etmez.",
    },
    journey: {
      eyebrow: "Yolculuğunuz",
      title: "İlk görüşmeden dönüşe altı net adım.",
      intro: "Her geçişin sorumlusu bellidir; böylece her aşamada kiminle konuştuğunuzu ve sırada ne olduğunu bilirsiniz.",
      items: [
        { title: "İlk görüşme", body: "Ayrıntılı sağlık verisi istemeden seyahat beklentinizi, tercih ettiğiniz dili ve yaklaşık tarihleri öğreniriz." },
        { title: "Sağlık kuruluşunun tanıtılması", body: "Belgeler paylaşılmadan önce değerlendirmeden sorumlu sağlık kuruluşu açıkça belirtilir." },
        { title: "Onam ve belge aktarımı", body: "Yalnız gerekli bilgiler, mahremiyet ve onam süreci açıklandıktan sonra adı belirtilen kuruluşa iletilir." },
        { title: "Hekim ön değerlendirmesi", body: "Sağlık ekibi ilk görüşünü verir. Bu, nihai tanı, tedavi onayı veya sonuç garantisi değildir." },
        { title: "Yazılı plan", body: "Tıbbi ve seyahat bedelleri, kapsam, takvim ve olası değişiklikler ayrı kalemlerle sunulur." },
        { title: "Varış ve dönüş takibi", body: "Nihai plan yüz yüze muayeneyle kesinleşir. Dönüşten önce sağlık kuruluşu bakım ve iletişim talimatlarını verir." },
      ],
    },
    standards: {
      eyebrow: "Kuruluş seçimi",
      title: "Sizi bir kuruluşla tanıştırmadan önce aradıklarımız.",
      intro: "Şık bir lobi klinik kalitenin kanıtı değildir. Kuruluşun kimliği, yetkisi, hekimin sorumluluğu ve bakımın devamlılığı daha önemlidir.",
      items: ["Doğrulanabilir ticari kimlik ve fiziksel adres", "İlgili uluslararası sağlık turizmi yetkisi", "Adı ve uzmanlığı açıkça belirtilen hekim", "Yazılı onam, risk ve alternatifler süreci", "Şeffaf klinik ve seyahat fiyatlandırması", "Belgeli taburculuk ve takip planı"],
      cardLabel: "Karar vermeden önce",
      cardTitle: "Bütün tabloyu isteyin.",
      cardBody: "Seçenekleri; geri sayım, baskı veya garantili sonuç dili olmadan sakin biçimde karşılaştırabilmelisiniz.",
      cardItems: ["Her aşamayı kim uygulayacak?", "Muayene sonrası neler değişebilir?", "Hangi bedeller planın dışında?", "Dönüşte klinik muhatap kim?"],
    },
    scope: {
      eyebrow: "Şeffaf kapsam",
      title: "Belirsiz bir 'her şey dahil' vaadi yok.",
      intro: "Sağlık hizmeti ve seyahat hizmetleri ayrı kalemlerde gösterilmelidir. Yazılı planınız nelerin dahil, nelerin koşula bağlı olduğunu açıkça belirtmelidir.",
      includedTitle: "Seyahat koordinasyonuna dahil edilebilir",
      included: ["Özel havalimanı ve şehir içi transferler", "Konaklama koordinasyonu", "Randevu ve program yönetimi", "Refakatçi ve dil lojistiği", "Hekim önerisine göre dönüş planlaması"],
      separateTitle: "Her zaman ayrıca teyit edilir",
      separate: ["Sağlık kuruluşunun klinik hizmet bedeli", "Tetkik, ilaç ve ek işlemler", "Uçuş, sigorta ve vize giderleri", "Yüz yüze muayene sonrası değişiklikler", "Beklenmedik veya acil sağlık hizmetleri"],
      note: "Kesin kapsam yazılı teklifte tanımlanır. Uçuşlar, ilgili sağlık kuruluşu önerilen takvimi teyit ettikten sonra alınmalıdır.",
    },
    faq: {
      eyebrow: "Sık sorulanlar",
      title: "Yola çıkmadan sorulması gerekenler.",
      intro: "Açık yanıtlar, bilinçli kararın bir parçasıdır.",
      items: [
        { question: "Antalya VIP Tourism tedavi hizmeti sunuyor mu?", answer: "Hayır. Antalya VIP Tourism bir sağlık kuruluşu değildir. Tanı, tedavi ve klinik takip; kimliği açıklanan yetkili sağlık kuruluşu ve onun sağlık meslek mensupları tarafından yürütülür." },
        { question: "Benim için hangi yöntem uygun?", answer: "Buna yalnızca ilgili hekim; tıbbi öykünüzü, muayene bulgularını ve gerekli tetkikleri değerlendirdikten sonra karar verebilir. Koordinasyon ekibimiz yöntem önermez." },
        { question: "Çevrim içi plan kesin midir?", answer: "Hayır. Çevrim içi inceleme ön bilgi sağlar. Plan ve fiyat yüz yüze muayene veya ek tetkikler sonrasında değişebilir; her değişiklik işlemden önce açıklanmalı ve onayınıza sunulmalıdır." },
        { question: "Sonuç garantisi verilebilir mi?", answer: "Hayır. Tıbbi ve estetik sonuçlar kişiye, işleme ve iyileşmeye göre değişir. Sorumlu bir sağlık kuruluşu belirli bir sonucu garanti etmez." },
        { question: "Antalya'da ne kadar kalmalıyım?", answer: "Güvenli süre işleme ve hekimin önerisine göre değişir. Uçuşunuzu almadan önce klinik takvimi teyit edin." },
        { question: "Ülkeme döndükten sonra ne olur?", answer: "Sağlık kuruluşu yazılı bakım ve kontrol talimatı vermelidir. Koordinasyon hattı acil sağlık hizmeti değildir; acil durumda bulunduğunuz ülkedeki acil yardım hizmetine başvurun." },
      ],
    },
    final: {
      eyebrow: "İlk adımınız",
      title: "Karar vermeden önce bütün tabloyu görün.",
      body: "İlgilendiğiniz alanı paylaşın. Hangi bilginin gerektiğini, değerlendirmeyi hangi sağlık kuruluşunun yapacağını ve seyahat aşamalarını açıkça anlatalım.",
      cta: "Koordinasyon görüşmesi iste",
      secondary: "Bizi arayın",
      notice: "Bu kanal tıbbi tanı veya acil yardım kanalı değildir. İlk adımda sağlık belgesi istenmez.",
    },
    footer: {
      tagline: "Antalya'da özel seyahat ve concierge koordinasyonu.",
      explore: "Keşfedin",
      home: "Ana sayfa",
      services: "Alanlar",
      process: "Süreç",
      contact: "İletişim",
      legal: "Bilgi",
      privacy: "Gizlilik",
      imprint: "Künye",
      disclaimer: "Antalya VIP Tourism bir sağlık kuruluşu değildir. Tüm tıbbi değerlendirme, tedavi ve klinik takip, kimliği açıklanan yetkili sağlık kuruluşu ve ilgili sağlık meslek mensuplarının sorumluluğundadır.",
    },
  },
  de: {
    navCta: "Erstgespräch anfragen",
    hero: {
      eyebrow: "Koordination internationaler Gesundheitsreisen · Antalya",
      title: "Eine durchdachte Reise rund um Ihre Gesundheit.",
      body: "Antalya VIP Tourism koordiniert Termine bei autorisierten Gesundheitseinrichtungen, private Transfers, Unterkunft und Reiselogistik. Medizinische Beurteilung, Behandlungsentscheidung und klinische Nachsorge liegen ausschließlich beim behandelnden Arzt und der Gesundheitseinrichtung.",
      primary: "Koordinationsgespräch anfragen",
      secondary: "So funktioniert es",
      note: "Klare Rollen · Schriftlicher Plan · Benannte Einrichtung · Respekt vor Ihren Daten",
      imageAlt: "Ruhige private Beratungslounge mit Blick auf das Mittelmeer in Antalya",
    },
    principles: [
      { title: "Jede Rolle ist klar", body: "Die Aufgaben von Einrichtung, Arzt und Koordination werden getrennt erläutert." },
      { title: "Medizin bleibt Arztsache", body: "Eignung, Methode und Umfang bestimmt ausschließlich ein autorisierter Arzt." },
      { title: "Der Plan ist schriftlich", body: "Zeitplan, Leistungen, Ausschlüsse und mögliche Änderungen liegen vor der Reise vor." },
      { title: "Nachsorge ist geklärt", body: "Entlassungshinweise, Kontrollen und klinischer Kontakt stehen vor der Abreise fest." },
    ],
    consultation: {
      label: "Beginnen Sie mit einem Gespräch",
      title: "Wofür interessieren Sie sich?",
      body: "Wählen Sie einen Bereich und bitten Sie um Rückruf. Wir erklären den Ablauf, bevor medizinische Informationen angefragt werden.",
      field: "Interessensbereich",
      options: ["Haartransplantation", "Ästhetische Chirurgie", "Zahnmedizin", "Nichtoperative Ästhetik", "Ich bin noch unsicher"],
      cta: "Über WhatsApp fortfahren",
      call: "Oder +90 530 265 57 90 anrufen",
      note: "Bitte senden Sie in der ersten Nachricht keine Befunde oder Fotos. Zuerst müssen die empfangende Gesundheitseinrichtung und das Einwilligungsverfahren geklärt sein.",
      message: "Hallo, ich wünsche ein Erstgespräch zur Koordination einer Gesundheitsreise. Interessensbereich:",
    },
    trust: {
      eyebrow: "Ein verantwortungsvollerer Standard",
      title: "Vertrauen beginnt mit den richtigen Informationen.",
      intro: "Vor der Reise sollten Sie wissen, wer Sie beurteilt, wo die Leistung stattfindet, was der vorläufige Plan umfasst und wer nach Ihrer Rückkehr verantwortlich bleibt. Wir machen diese Antworten sichtbar und koordinieren die nichtmedizinischen Bestandteile.",
    },
    services: {
      eyebrow: "Bereiche, die wir koordinieren",
      title: "Eine Reise. Fachärztlich geführte Versorgung.",
      intro: "Wir koordinieren die Reise rund um Ihre Versorgung. Die Einrichtung prüft die Eignung; der Arzt legt alle klinischen Details fest.",
      suitability: "Die endgültige Eignung erfordert eine ärztliche Beurteilung.",
      items: [
        { number: "01", title: "Haartransplantation", body: "Koordination von Anfragen, Terminen, Privattransfer, Unterkunft und Zeitplan rund um die Behandlung.", note: "Über FUE, DHI oder eine andere Methode entscheidet das Behandlungsteam erst nach der Beurteilung.", icon: "sparkle" },
        { number: "02", title: "Ästhetische Chirurgie", body: "Ein angemessen getakteter Reiseplan für Gesichts- und Körpereingriffe, einschließlich Begleitperson und Transfers an Erholungstagen.", note: "Eine Online-Prüfung ist keine endgültige Operationsfreigabe; der Plan kann sich nach Untersuchung und Tests ändern.", icon: "user-check" },
        { number: "03", title: "Zahnmedizin", body: "Koordination von Implantat-, Restaurations- und ästhetischen Anfragen mit einer Reiseplanung nach Zahl der Behandlungstermine.", note: "Der Behandlungsplan wird nach Untersuchung und erforderlicher Bildgebung bestätigt.", icon: "shield" },
        { number: "04", title: "Nichtoperative Ästhetik", body: "Termin- und Reisekoordination für geeignete ärztlich durchgeführte Anwendungen mit transparenter Anbieter- und Produktinformation.", note: "Indikation, Produkt, Dosis und Risiken müssen direkt mit dem medizinischen Fachpersonal besprochen werden.", icon: "check-circle" },
      ],
    },
    roles: {
      eyebrow: "Ein Ansprechpartner, zwei getrennte Rollen",
      title: "Koordination ist keine medizinische Versorgung.",
      intro: "Diese Grenze muss sichtbar bleiben. Wir organisieren die Reise; autorisierte Fachkräfte beurteilen und behandeln Sie.",
      coordinatorTitle: "Antalya VIP Tourism koordiniert",
      coordinatorItems: ["Transfers zwischen Flughafen, Hotel und Einrichtung", "Unterkunft und Logistik für Begleitpersonen", "Termine und täglicher Programmablauf", "Vereinbarte Sprach- und Kommunikationshilfe", "Nichtmedizinische Änderungen des Reiseplans"],
      medicalTitle: "Die Gesundheitseinrichtung verantwortet",
      medicalItems: ["Diagnose und medizinische Eignung", "Wahl und Umfang der Behandlung", "Risiken, Alternativen und Genesungsinformationen", "Aufklärung, Eingriff und Medikation", "Klinische Nachsorge und Komplikationsmanagement"],
      notice: "Antalya VIP Tourism ist keine Gesundheitseinrichtung, stellt keine Diagnose, empfiehlt keine Behandlungsmethode und verspricht kein medizinisches oder ästhetisches Ergebnis.",
    },
    journey: {
      eyebrow: "Ihre Reise",
      title: "Sechs klare Schritte vom Erstgespräch bis zur Rückkehr.",
      intro: "Jede Übergabe ist definiert, damit Sie jederzeit wissen, mit wem Sie sprechen und was als Nächstes geschieht.",
      items: [
        { title: "Erstgespräch", body: "Wir klären Reiseerwartungen, Sprache und ungefähre Daten, ohne detaillierte Gesundheitsdaten anzufordern." },
        { title: "Vorstellung der Einrichtung", body: "Die für die Beurteilung verantwortliche Gesundheitseinrichtung wird vor jeder Datenübermittlung benannt." },
        { title: "Einwilligung und Unterlagen", body: "Nur erforderliche Informationen werden nach geklärtem Datenschutz und Einwilligung an die benannte Einrichtung übermittelt." },
        { title: "Ärztliche Vorbeurteilung", body: "Das medizinische Team gibt eine erste Einschätzung. Sie ist keine endgültige Diagnose, Freigabe oder Ergebnisgarantie." },
        { title: "Schriftlicher Plan", body: "Medizinische und Reiseleistungen, Umfang, Zeitplan und mögliche Änderungen werden getrennt ausgewiesen." },
        { title: "Ankunft und Nachsorge", body: "Der endgültige Plan folgt nach persönlicher Untersuchung. Vor der Rückreise erhalten Sie Nachsorge- und Kontaktangaben." },
      ],
    },
    standards: {
      eyebrow: "Auswahl der Einrichtung",
      title: "Was wir vor einer Vorstellung prüfen.",
      intro: "Eine elegante Lobby beweist keine klinische Qualität. Identität, Autorisierung, ärztliche Verantwortung und Versorgungskontinuität zählen mehr.",
      items: ["Überprüfbare Rechtspersönlichkeit und Adresse", "Relevante Autorisierung für internationale Gesundheitsreisen", "Namentlich genannter Arzt mit klarer Fachrichtung", "Schriftliche Aufklärung zu Einwilligung, Risiken und Alternativen", "Transparente medizinische und nichtmedizinische Kosten", "Dokumentierte Entlassungs- und Nachsorgewege"],
      cardLabel: "Vor Ihrer Entscheidung",
      cardTitle: "Verlangen Sie das vollständige Bild.",
      cardBody: "Sie sollten Optionen in Ruhe vergleichen können – ohne Countdown, Druck oder garantierte Ergebnisse.",
      cardItems: ["Wer führt welchen Schritt durch?", "Was kann sich nach der Untersuchung ändern?", "Welche Kosten liegen außerhalb des Plans?", "Wer ist nach der Rückkehr klinisch zuständig?"],
    },
    scope: {
      eyebrow: "Transparenter Umfang",
      title: "Kein vages „Alles inklusive“.",
      intro: "Medizinische und Reiseleistungen sollten getrennt ausgewiesen werden. Der schriftliche Plan muss klar sagen, was enthalten und was bedingt ist.",
      includedTitle: "Die Reisekoordination kann umfassen",
      included: ["Private Flughafen- und Lokaltransfers", "Koordination der Unterkunft", "Termin- und Programmmanagement", "Begleitpersonen- und Sprachlogistik", "Rückreiseplanung nach ärztlicher Empfehlung"],
      separateTitle: "Immer separat zu bestätigen",
      separate: ["Medizinische Gebühren der Einrichtung", "Tests, Medikamente und Zusatzverfahren", "Flüge, Versicherung und Visum", "Änderungen nach persönlicher Untersuchung", "Unerwartete oder dringende medizinische Versorgung"],
      note: "Der genaue Umfang steht im schriftlichen Angebot. Buchen Sie Flüge erst, nachdem die behandelnde Einrichtung den empfohlenen Zeitplan bestätigt hat.",
    },
    faq: {
      eyebrow: "Häufig gefragt",
      title: "Wichtige Fragen vor der Reise.",
      intro: "Klare Antworten gehören zu einer informierten Entscheidung.",
      items: [
        { question: "Bietet Antalya VIP Tourism Behandlungen an?", answer: "Nein. Antalya VIP Tourism ist keine Gesundheitseinrichtung. Diagnose, Behandlung und klinische Nachsorge erfolgen durch die benannte autorisierte Einrichtung und deren medizinisches Fachpersonal." },
        { question: "Welche Methode passt zu mir?", answer: "Das kann nur der zuständige Arzt nach Prüfung Ihrer Vorgeschichte, Untersuchung und notwendiger Tests entscheiden. Unser Koordinationsteam empfiehlt keine klinische Methode." },
        { question: "Ist ein Online-Plan endgültig?", answer: "Nein. Eine Online-Prüfung ist vorläufig. Plan und Preis können sich nach persönlicher Untersuchung oder weiteren Tests ändern; Änderungen müssen vor der Behandlung erläutert und genehmigt werden." },
        { question: "Kann ein Ergebnis garantiert werden?", answer: "Nein. Medizinische und ästhetische Ergebnisse unterscheiden sich je nach Person, Eingriff und Genesung. Ein verantwortungsvoller Anbieter garantiert kein bestimmtes Ergebnis." },
        { question: "Wie lange sollte ich in Antalya bleiben?", answer: "Die sichere Dauer hängt vom Eingriff und der ärztlichen Empfehlung ab. Bestätigen Sie den klinischen Zeitplan vor der Flugbuchung." },
        { question: "Was geschieht nach meiner Rückkehr?", answer: "Die Einrichtung sollte schriftliche Nachsorge- und Kontrollhinweise geben. Die Koordinationsnummer ist kein medizinischer Notdienst; nutzen Sie bei Dringlichkeit den lokalen Rettungsdienst." },
      ],
    },
    final: {
      eyebrow: "Ihr erster Schritt",
      title: "Sehen Sie das ganze Bild, bevor Sie entscheiden.",
      body: "Nennen Sie uns den Bereich. Wir erklären, welche Informationen benötigt werden, welche Einrichtung beurteilt und wie die Reisephasen zusammenpassen.",
      cta: "Koordinationsgespräch anfragen",
      secondary: "Rufen Sie uns an",
      notice: "Dies ist kein Diagnose- oder Notfallkanal. Im ersten Schritt werden keine medizinischen Unterlagen angefordert.",
    },
    footer: {
      tagline: "Private Reise- und Concierge-Koordination in Antalya.",
      explore: "Entdecken",
      home: "Startseite",
      services: "Bereiche",
      process: "Ablauf",
      contact: "Kontakt",
      legal: "Information",
      privacy: "Datenschutz",
      imprint: "Impressum",
      disclaimer: "Antalya VIP Tourism ist keine Gesundheitseinrichtung. Medizinische Beurteilung, Behandlung und Nachsorge liegen bei der benannten autorisierten Einrichtung und dem behandelnden Fachpersonal.",
    },
  },
  ru: {
    navCta: "Запросить консультацию",
    hero: {
      eyebrow: "Координация международных медицинских поездок · Анталья",
      title: "Продуманная поездка, построенная вокруг вашего здоровья.",
      body: "Antalya VIP Tourism координирует запись в уполномоченные медицинские учреждения, частные трансферы, проживание и логистику. Медицинская оценка, решение о лечении и клиническое наблюдение остаются исключительной ответственностью врача и учреждения.",
      primary: "Запросить беседу с координатором",
      secondary: "Как всё проходит",
      note: "Чёткие роли · Письменный план · Названное учреждение · Уважение к вашим данным",
      imageAlt: "Спокойная частная переговорная с видом на Средиземное море в Анталье",
    },
    principles: [
      { title: "Роли определены", body: "Обязанности учреждения, врача и координатора объясняются отдельно." },
      { title: "Медицинские решения — врачу", body: "Показания, метод и объём лечения определяет только уполномоченный врач." },
      { title: "План оформлен письменно", body: "Сроки, включённые услуги, исключения и возможные изменения известны до поездки." },
      { title: "Наблюдение согласовано", body: "Рекомендации, контроль и клинический контакт уточняются до отъезда." },
    ],
    consultation: {
      label: "Начните с разговора",
      title: "Расскажите, что вы рассматриваете.",
      body: "Выберите направление и запросите звонок. Сначала мы объясним процесс, не запрашивая медицинские данные.",
      field: "Интересующее направление",
      options: ["Трансплантация волос", "Эстетическая хирургия", "Стоматология", "Безоперационная эстетика", "Я пока не уверен(а)"],
      cta: "Продолжить в WhatsApp",
      call: "Или позвонить +90 530 265 57 90",
      note: "Не отправляйте медицинские документы или фотографии в первом сообщении. Сначала должны быть определены принимающее учреждение и порядок согласия.",
      message: "Здравствуйте, я хотел(а) бы запросить первичную беседу по координации медицинской поездки. Направление:",
    },
    trust: {
      eyebrow: "Более ответственный стандарт",
      title: "Доверие начинается с правильной информации.",
      intro: "До поездки важно знать, кто проводит оценку, где оказывается услуга, что входит в предварительный план и кто отвечает за наблюдение после возвращения. Мы делаем эти ответы видимыми и координируем немедицинские части поездки.",
    },
    services: {
      eyebrow: "Что мы координируем",
      title: "Одна поездка. Помощь под руководством специалистов.",
      intro: "Мы организуем поездку вокруг медицинской помощи. Учреждение оценивает показания, а врач определяет все клинические детали.",
      suitability: "Окончательные показания определяет врач.",
      items: [
        { number: "01", title: "Трансплантация волос", body: "Координация обращений, записи, частного транспорта, проживания и графика вокруг процедуры.", note: "FUE, DHI или иной метод выбирает медицинская команда после оценки.", icon: "sparkle" },
        { number: "02", title: "Эстетическая хирургия", body: "Продуманный план поездки для операций на лице и теле, включая логистику сопровождающего и трансферы в дни восстановления.", note: "Онлайн-оценка не является окончательным допуском; план может измениться после осмотра и анализов.", icon: "user-check" },
        { number: "03", title: "Стоматология", body: "Координация запросов по имплантации, реставрации и эстетике улыбки с учётом числа визитов.", note: "План подтверждается после осмотра и необходимой диагностики.", icon: "shield" },
        { number: "04", title: "Безоперационная эстетика", body: "Запись и логистика для подходящих врачебных процедур с прозрачной информацией об учреждении и препарате.", note: "Показания, препарат, дозу и риски следует обсуждать непосредственно с медицинским специалистом.", icon: "check-circle" },
      ],
    },
    roles: {
      eyebrow: "Один контакт, две разные роли",
      title: "Координация — не медицинская помощь.",
      intro: "Эта граница должна быть видимой. Мы организуем поездку; уполномоченные специалисты оценивают и лечат.",
      coordinatorTitle: "Antalya VIP Tourism координирует",
      coordinatorItems: ["Трансферы аэропорт — отель — учреждение", "Проживание и логистику сопровождающего", "Записи и ежедневный график", "Согласованную языковую поддержку", "Немедицинские изменения плана поездки"],
      medicalTitle: "Медицинское учреждение отвечает за",
      medicalItems: ["Диагностику и оценку показаний", "Выбор метода и объёма лечения", "Информацию о рисках, альтернативах и восстановлении", "Информированное согласие, процедуры и лекарства", "Клиническое наблюдение и осложнения"],
      notice: "Antalya VIP Tourism не является медицинским учреждением, не ставит диагнозы, не рекомендует метод лечения и не обещает медицинский или эстетический результат.",
    },
    journey: {
      eyebrow: "Ваша поездка",
      title: "Шесть понятных шагов от первого звонка до возвращения.",
      intro: "Каждая передача ответственности определена, чтобы вы всегда знали, с кем говорите и что будет дальше.",
      items: [
        { title: "Первичная беседа", body: "Мы уточняем ожидания, язык и примерные даты, не запрашивая подробных медицинских данных." },
        { title: "Знакомство с учреждением", body: "До передачи документов называется учреждение, ответственное за оценку." },
        { title: "Согласие и документы", body: "Только необходимые сведения передаются названному учреждению после разъяснения конфиденциальности и согласия." },
        { title: "Предварительная оценка врача", body: "Команда даёт первичное мнение. Это не окончательный диагноз, допуск или гарантия результата." },
        { title: "Письменный план", body: "Медицинские и дорожные расходы, объём, сроки и возможные изменения указываются отдельно." },
        { title: "Прибытие и наблюдение", body: "Окончательный план формируется после очного осмотра. До отъезда учреждение выдаёт рекомендации и контакты." },
      ],
    },
    standards: {
      eyebrow: "Выбор учреждения",
      title: "Что важно до знакомства с поставщиком.",
      intro: "Красивый холл не доказывает клиническое качество. Важнее личность учреждения, полномочия, ответственность врача и непрерывность помощи.",
      items: ["Проверяемое юридическое лицо и адрес", "Необходимое разрешение для международного медицинского туризма", "Названный врач и чётко указанная специальность", "Письменный порядок согласия, рисков и альтернатив", "Прозрачные медицинские и дорожные расходы", "Документированный план выписки и наблюдения"],
      cardLabel: "До принятия решения",
      cardTitle: "Запросите полную картину.",
      cardBody: "Вы должны спокойно сравнить варианты — без таймеров, давления и обещаний гарантированного результата.",
      cardItems: ["Кто выполняет каждый этап?", "Что может измениться после осмотра?", "Какие расходы вне плана?", "Кто остаётся клиническим контактом дома?"],
    },
    scope: {
      eyebrow: "Прозрачный объём",
      title: "Без расплывчатого «всё включено».",
      intro: "Медицинские и дорожные услуги должны быть указаны отдельно. Письменный план ясно показывает, что включено, а что зависит от условий.",
      includedTitle: "Координация поездки может включать",
      included: ["Частные трансферы из аэропорта и по городу", "Координацию проживания", "Управление записями и графиком", "Логистику сопровождающего и языка", "Планирование возвращения по совету врача"],
      separateTitle: "Всегда подтверждается отдельно",
      separate: ["Медицинские сборы учреждения", "Анализы, лекарства и дополнительные процедуры", "Перелёты, страхование и виза", "Изменения после очного осмотра", "Неожиданная или экстренная помощь"],
      note: "Точный объём определяется письменным предложением. Покупайте билеты после подтверждения рекомендуемого графика медицинским учреждением.",
    },
    faq: {
      eyebrow: "Частые вопросы",
      title: "Что стоит спросить до поездки.",
      intro: "Ясные ответы — часть осознанного решения.",
      items: [
        { question: "Antalya VIP Tourism оказывает лечение?", answer: "Нет. Antalya VIP Tourism не является медицинским учреждением. Диагностика, лечение и наблюдение выполняются названным уполномоченным учреждением и его специалистами." },
        { question: "Какой метод подходит мне?", answer: "Это может определить только врач после изучения анамнеза, осмотра и необходимых исследований. Координаторы не рекомендуют клинический метод." },
        { question: "Онлайн-план окончательный?", answer: "Нет. Онлайн-оценка предварительна. План и цена могут измениться после очного осмотра или исследований; изменения должны быть объяснены и согласованы до лечения." },
        { question: "Можно гарантировать результат?", answer: "Нет. Медицинские и эстетические результаты зависят от человека, процедуры и восстановления. Ответственный поставщик не гарантирует конкретный результат." },
        { question: "Сколько оставаться в Анталье?", answer: "Безопасный срок зависит от процедуры и совета врача. Подтвердите клинический график до покупки билетов." },
        { question: "Что будет после возвращения?", answer: "Учреждение должно выдать письменные рекомендации и график контроля. Координационная линия не является экстренной службой; при срочной ситуации обращайтесь в местную неотложную помощь." },
      ],
    },
    final: {
      eyebrow: "Ваш первый шаг",
      title: "Увидьте полную картину до решения.",
      body: "Назовите интересующее направление. Мы объясним, какая информация нужна, какое учреждение проведёт оценку и как связаны этапы поездки.",
      cta: "Запросить беседу с координатором",
      secondary: "Позвонить нам",
      notice: "Это не канал диагностики или экстренной помощи. На первом этапе медицинские документы не запрашиваются.",
    },
    footer: {
      tagline: "Частная координация поездок и консьерж-сервис в Анталье.",
      explore: "Разделы",
      home: "Главная",
      services: "Направления",
      process: "Процесс",
      contact: "Контакты",
      legal: "Информация",
      privacy: "Конфиденциальность",
      imprint: "Правовая информация",
      disclaimer: "Antalya VIP Tourism не является медицинским учреждением. Медицинская оценка, лечение и наблюдение являются ответственностью названного уполномоченного учреждения и лечащих специалистов.",
    },
  },
};

const supportedHealthLanguages = new Set<HealthLanguage>(["en", "de", "tr", "ru"]);

export function HealthPage() {
  const { language } = useLanguage();
  const copyLanguage = supportedHealthLanguages.has(language as HealthLanguage)
    ? language as HealthLanguage
    : "en";
  const copy = healthCopy[copyLanguage];
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const prefix = ["de", "tr", "ru"].includes(copyLanguage) ? "/" + copyLanguage : "";
  const homeHref = prefix + "/";
  const privacyHref = copyLanguage === "de"
    ? "/de/datenschutz/"
    : copyLanguage === "tr"
      ? "/tr/gizlilik/"
      : copyLanguage === "ru"
        ? "/ru/privacy/"
        : "/privacy/";
  const imprintHref = copyLanguage === "de"
    ? "/de/impressum/"
    : copyLanguage === "tr"
      ? "/tr/kunye/"
      : copyLanguage === "ru"
        ? "/ru/impressum/"
        : "/impressum.html";
  const whatsappHref = "https://wa.me/905302655790?text=" + encodeURIComponent(
    copy.consultation.message + " " + copy.consultation.options[selectedServiceIndex],
  );

  return (
    <div className="health-page">
      <Header
        homeHref={homeHref}
        compact
        ctaHref="#health-consultation"
        ctaLabel={copy.navCta}
      />

      <main>
        <section className="health-hero" id="top">
          <picture className="health-hero-media">
            <source srcSet="/assets/optimized/health-coordination-hero.webp" type="image/webp" />
            <img
              src="/assets/optimized/health-coordination-hero.jpg"
              alt={copy.hero.imageAlt}
              width="1672"
              height="941"
              fetchPriority="high"
            />
          </picture>
          <div className="health-hero-overlay" />
          <div className="health-hero-content">
            <div className="health-hero-copy">
              <div className="eyebrow light">
                <span />
                <p>{copy.hero.eyebrow}</p>
              </div>
              <div className="health-brand-line">
                <span>Health Journey</span>
                <i />
                <strong>Antalya VIP Tourism</strong>
              </div>
              <h1>{copy.hero.title}</h1>
              <p>{copy.hero.body}</p>
              <div className="health-hero-actions">
                <a className="button button-gold" href="#health-consultation">
                  <span>{copy.hero.primary}</span>
                  <Icon name="arrow-right" className="icon" />
                </a>
                <a className="button health-button-ghost" href="#health-process">
                  {copy.hero.secondary}
                </a>
              </div>
              <div className="health-hero-note">
                <Icon name="shield" className="icon" />
                <span>{copy.hero.note}</span>
              </div>
            </div>

            <aside className="health-consultation-card" id="health-consultation">
              <span className="health-card-label">{copy.consultation.label}</span>
              <h2>{copy.consultation.title}</h2>
              <p>{copy.consultation.body}</p>
              <label htmlFor="health-service">{copy.consultation.field}</label>
              <div className="health-select-wrap">
                <select
                  id="health-service"
                  value={selectedServiceIndex}
                  onChange={(event) => setSelectedServiceIndex(Number(event.target.value))}
                >
                  {copy.consultation.options.map((option, index) => (
                    <option key={option} value={index}>{option}</option>
                  ))}
                </select>
                <span aria-hidden="true">⌄</span>
              </div>
              <a
                className="health-consultation-submit"
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="whatsapp" className="whatsapp-icon" />
                <span>{copy.consultation.cta}</span>
                <Icon name="arrow-up-right" className="icon" />
              </a>
              <a className="health-call-link" href="tel:+905302655790">{copy.consultation.call}</a>
              <small>{copy.consultation.note}</small>
            </aside>
          </div>
        </section>

        <section className="health-principle-bar" aria-label={copy.trust.title}>
          {copy.principles.map((principle, index) => (
            <article key={principle.title}>
              <span>0{index + 1}</span>
              <div>
                <h2>{principle.title}</h2>
                <p>{principle.body}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="health-trust section">
          <div className="health-section-intro">
            <div className="eyebrow">
              <span />
              <p>{copy.trust.eyebrow}</p>
            </div>
            <h2>{copy.trust.title}</h2>
            <p>{copy.trust.intro}</p>
          </div>
          <div className="health-trust-visual" aria-hidden="true">
            <div>
              <span>01</span><i />
              <strong>Role</strong>
            </div>
            <div>
              <span>02</span><i />
              <strong>Plan</strong>
            </div>
            <div>
              <span>03</span><i />
              <strong>Care</strong>
            </div>
          </div>
        </section>

        <section className="health-services section" id="health-services">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span />
                <p>{copy.services.eyebrow}</p>
              </div>
              <h2>{copy.services.title}</h2>
            </div>
            <p>{copy.services.intro}</p>
          </div>
          <div className="health-service-grid">
            {copy.services.items.map((service) => (
              <article className="health-service-card" key={service.number}>
                <div className="health-service-top">
                  <span>{service.number}</span>
                  <Icon name={service.icon} className="icon" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <div className="health-service-note">
                  <Icon name="check-circle" className="icon" />
                  <span>{service.note}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="health-suitability">
            <Icon name="shield" className="icon" />
            {copy.services.suitability}
          </p>
        </section>

        <section className="health-roles section-dark">
          <div className="section health-roles-inner">
            <div className="health-section-intro health-section-intro-light">
              <div className="eyebrow light">
                <span />
                <p>{copy.roles.eyebrow}</p>
              </div>
              <h2>{copy.roles.title}</h2>
              <p>{copy.roles.intro}</p>
            </div>
            <div className="health-role-grid">
              <article>
                <div className="health-role-icon"><Icon name="message" className="icon" /></div>
                <h3>{copy.roles.coordinatorTitle}</h3>
                <ul>
                  {copy.roles.coordinatorItems.map((item) => (
                    <li key={item}><Icon name="check" className="icon" /><span>{item}</span></li>
                  ))}
                </ul>
              </article>
              <article className="health-role-medical">
                <div className="health-role-icon"><Icon name="user-check" className="icon" /></div>
                <h3>{copy.roles.medicalTitle}</h3>
                <ul>
                  {copy.roles.medicalItems.map((item) => (
                    <li key={item}><Icon name="check" className="icon" /><span>{item}</span></li>
                  ))}
                </ul>
              </article>
            </div>
            <div className="health-role-notice">
              <Icon name="shield" className="icon" />
              <p>{copy.roles.notice}</p>
            </div>
          </div>
        </section>

        <section className="health-process section" id="health-process">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span />
                <p>{copy.journey.eyebrow}</p>
              </div>
              <h2>{copy.journey.title}</h2>
            </div>
            <p>{copy.journey.intro}</p>
          </div>
          <ol className="health-process-list">
            {copy.journey.items.map((step, index) => (
              <li key={step.title}>
                <div className="health-process-number">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="health-standards">
          <div className="section health-standards-grid">
            <div>
              <div className="eyebrow">
                <span />
                <p>{copy.standards.eyebrow}</p>
              </div>
              <h2>{copy.standards.title}</h2>
              <p>{copy.standards.intro}</p>
              <ul className="health-check-list">
                {copy.standards.items.map((item) => (
                  <li key={item}><Icon name="check" className="icon" /><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <aside className="health-question-card">
              <span>{copy.standards.cardLabel}</span>
              <h3>{copy.standards.cardTitle}</h3>
              <p>{copy.standards.cardBody}</p>
              <ol>
                {copy.standards.cardItems.map((item, index) => (
                  <li key={item}><span>0{index + 1}</span>{item}</li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        <section className="health-scope section">
          <div className="health-section-intro">
            <div className="eyebrow">
              <span />
              <p>{copy.scope.eyebrow}</p>
            </div>
            <h2>{copy.scope.title}</h2>
            <p>{copy.scope.intro}</p>
          </div>
          <div className="health-scope-grid">
            <article>
              <span className="health-scope-index">A</span>
              <h3>{copy.scope.includedTitle}</h3>
              <ul>
                {copy.scope.included.map((item) => (
                  <li key={item}><Icon name="check-circle" className="icon" />{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <span className="health-scope-index">B</span>
              <h3>{copy.scope.separateTitle}</h3>
              <ul>
                {copy.scope.separate.map((item) => (
                  <li key={item}><span className="health-minus">—</span>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <p className="health-scope-note">{copy.scope.note}</p>
        </section>

        <section className="health-faq section" id="health-faq">
          <div className="health-faq-heading">
            <div className="eyebrow">
              <span />
              <p>{copy.faq.eyebrow}</p>
            </div>
            <h2>{copy.faq.title}</h2>
            <p>{copy.faq.intro}</p>
          </div>
          <div className="health-accordion">
            {copy.faq.items.map((item, index) => (
              <article className={openFaq === index ? "open" : ""} key={item.question}>
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span className="health-faq-number">0{index + 1}</span>
                  <span>{item.question}</span>
                  <i />
                </button>
                <div className="health-faq-answer"><p>{item.answer}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="health-final section-dark" id="health-contact">
          <div className="health-final-glow" />
          <div className="section health-final-inner">
            <div>
              <div className="eyebrow light">
                <span />
                <p>{copy.final.eyebrow}</p>
              </div>
              <h2>{copy.final.title}</h2>
              <p>{copy.final.body}</p>
            </div>
            <div className="health-final-actions">
              <a className="button button-gold" href="#health-consultation">
                <span>{copy.final.cta}</span>
                <Icon name="arrow-right" className="icon" />
              </a>
              <a className="button health-button-ghost" href="tel:+905302655790">
                <Icon name="phone" className="icon" />
                <span>{copy.final.secondary}</span>
              </a>
              <small>{copy.final.notice}</small>
            </div>
          </div>
        </section>
      </main>

      <footer className="health-footer">
        <div className="health-footer-main">
          <div>
            <a className="brand footer-brand" href={homeHref}>
              <img src="/assets/optimized/logo.png" alt="Antalya VIP Tourism" className="brand-logo" width="160" height="120" loading="lazy" />
              <span className="brand-copy"><strong>Antalya VIP</strong><span>Tourism</span></span>
            </a>
            <p>{copy.footer.tagline}</p>
          </div>
          <div>
            <span>{copy.footer.explore}</span>
            <a href={homeHref}>{copy.footer.home}</a>
            <a href="#health-services">{copy.footer.services}</a>
            <a href="#health-process">{copy.footer.process}</a>
            <a href="#health-contact">{copy.footer.contact}</a>
          </div>
          <div>
            <span>{copy.footer.legal}</span>
            <a href={privacyHref}>{copy.footer.privacy}</a>
            <a href={imprintHref}>{copy.footer.imprint}</a>
            <a href="mailto:support@antalyaviptourism.com">support@antalyaviptourism.com</a>
          </div>
        </div>
        <div className="health-footer-disclaimer">
          <Icon name="shield" className="icon" />
          <p>{copy.footer.disclaimer}</p>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Antalya VIP Tourism</span>
          <span>Antalya · Türkiye</span>
        </div>
      </footer>

      <a className="health-mobile-cta" href="#health-consultation">
        <span>{copy.navCta}</span>
        <Icon name="arrow-right" className="icon" />
      </a>
    </div>
  );
}
