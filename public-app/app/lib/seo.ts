import { publicRouteSlugs, routeCatalog } from "../../../src/routes.js";
import { hotelBySlug } from "../../../src/hotels.js";
import translationData from "../generated/legacy-translations.json";
import { homeFaqOrder } from "./faq";

export const domain = "https://antalyaviptourism.com";
export const indexableLanguages = ["en", "de", "fr", "tr", "ru", "cs", "uk", "ur", "pl", "nl", "ar", "sv"] as const;
export type IndexableLanguage = (typeof indexableLanguages)[number];

const homeSeo = {
  en: { locale: "en_GB", title: "Antalya Airport Transfer | Private VIP Tourism Service", description: "Private fixed-price transfers from Antalya Airport to resorts across Türkiye." },
  de: { locale: "de_DE", title: "Flughafen Antalya Transfer | Privater VIP Chauffeurservice", description: "Private Festpreis-Transfers vom Flughafen Antalya zu Reisezielen in der gesamten Türkei." },
  tr: { locale: "tr_TR", title: "Antalya Havalimanı Transferi | Özel VIP Transfer", description: "Antalya Havalimanı'ndan Belek, Side, Kemer, Alanya ve çevresine özel sabit fiyatlı transfer. Vito ve Sprinter, uçuş takibi ve karşılama." },
  ru: { locale: "ru_RU", title: "Трансфер из аэропорта Антальи | Частный VIP-трансфер", description: "Частные трансферы по фиксированной цене из аэропорта Антальи в Белек, Сиде, Кемер, Аланью и другие курорты. Встреча и отслеживание рейса." },
  fr: { locale: "fr_FR", title: "Transfert Aéroport Antalya | Service VIP Privé", description: "Transferts privés à prix fixe depuis l'aéroport d'Antalya vers Belek, Side, Kemer et Alanya. Accueil, suivi de vol et service porte-à-porte." },
  cs: { locale: "cs_CZ", title: "Transfer z letiště Antalya | Soukromá VIP přeprava", description: "Soukromé transfery s pevnou cenou z letiště Antalya do Beleku, Side, Kemeru a Alanye. Uvítání, sledování letů a služba od dveří ke dveřím." },
  uk: { locale: "uk_UA", title: "Трансфер з аеропорту Анталії | Приватний VIP-трансфер", description: "Приватні трансфери за фіксованою ціною з аеропорту Анталії до Белека, Сіде, Кемера, Аланьї та інших курортів. Зустріч і відстеження рейсу." },
  ur: { locale: "ur_PK", title: "انطالیہ ایئرپورٹ ٹرانسفر | نجی وی آئی پی سروس", description: "انطالیہ ایئرپورٹ سے بیلک، سیدے، کیمر اور الانیا تک مقررہ قیمت پر نجی ٹرانسفر۔ استقبال، پرواز کی نگرانی اور دروازے تک سروس۔" },
  pl: { locale: "pl_PL", title: "Transfer z lotniska Antalya | Prywatny transfer VIP", description: "Prywatne transfery w stałej cenie z lotniska Antalya do Belek, Side, Kemer, Alanya i innych kurortów. Powitanie i śledzenie lotu." },
  nl: { locale: "nl_NL", title: "Luchthaven Antalya Transfer | Privé VIP-vervoer", description: "Privétransfers met vaste prijs vanaf de luchthaven Antalya naar Belek, Side, Kemer, Alanya en andere resorts. Ontvangst en vluchtvolging." },
  ar: { locale: "ar_SA", title: "نقل مطار أنطاليا | خدمة VIP خاصة", description: "نقل خاص بسعر ثابت من مطار أنطاليا إلى بيليك وسيدي وكيمر وألانيا وغيرها من المنتجعات. استقبال وتتبع الرحلات وخدمة من الباب إلى الباب." },
  sv: { locale: "sv_SE", title: "Antalya Flygplatstransfer | Privat VIP-transport", description: "Privata transfrar till fast pris från Antalya flygplats till Belek, Side, Kemer, Alanya och andra resorter. Möte och flygbevakning." },
} as const;

const healthSeo = {
  en: {
    locale: "en_GB",
    title: "Health Travel Coordination in Antalya | Antalya VIP Tourism",
    description: "Plan your Antalya health journey with clear provider roles, private transfers, accommodation coordination and continuity of care led by authorised medical teams.",
    service: "Health travel coordination and concierge logistics",
  },
  de: {
    locale: "de_DE",
    title: "Koordination Ihrer Gesundheitsreise in Antalya | Antalya VIP Tourism",
    description: "Planen Sie Ihre Gesundheitsreise nach Antalya mit klaren Zuständigkeiten, privaten Transfers, Unterkunftskoordination und ärztlich geführter Betreuung.",
    service: "Koordination von Gesundheitsreisen und Concierge-Logistik",
  },
  tr: {
    locale: "tr_TR",
    title: "Antalya Sağlık Seyahati Koordinasyonu | Antalya VIP Tourism",
    description: "Antalya'daki sağlık seyahatinizi net görev ayrımı, özel transfer, konaklama koordinasyonu ve yetkili sağlık ekiplerinin klinik takibiyle planlayın.",
    service: "Sağlık seyahati koordinasyonu ve concierge lojistiği",
  },
  ru: {
    locale: "ru_RU",
    title: "Координация медицинской поездки в Анталью | Antalya VIP Tourism",
    description: "Спланируйте поездку в Анталью с чётким разделением обязанностей, частным трансфером, координацией проживания и наблюдением медицинской команды.",
    service: "Координация медицинских поездок и консьерж-логистика",
  },
  fr: {
    locale: "fr_FR",
    title: "Coordination de voyage de santé à Antalya | Antalya VIP Tourism",
    description: "Planifiez votre voyage de santé à Antalya avec des rôles clairs, des transferts privés, une coordination d'hébergement et un suivi médical continu par des équipes autorisées.",
    service: "Coordination de voyages de santé et logistique conciergerie",
  },
  cs: {
    locale: "cs_CZ",
    title: "Koordinace zdravotní cesty do Antalye | Antalya VIP Tourism",
    description: "Naplánujte svou zdravotní cestu do Antalye s jasným rozdělením rolí, soukromými transfery, koordinací ubytování a kontinuální péčí vedenou odbornými lékařskými týmy.",
    service: "Koordinace zdravotní cesty a concierge logistika",
  },
  uk: {
    locale: "uk_UA",
    title: "Координація медичної подорожі в Анталії | Antalya VIP Tourism",
    description: "Сплануйте свою медичну подорож до Анталії з чітким розподілом ролей, приватними трансферами, координацією проживання та безперервним медичним супроводом уповноважених команд.",
    service: "Координація медичних подорожей та консьєрж-логістика",
  },
  ur: {
    locale: "ur_PK",
    title: "انطالیہ میں طبی سفر کوآرڈینیشن | Antalya VIP Tourism",
    description: "انطالیہ میں اپنے طبی سفر کی منصوبہ بندی واضح ذمہ داریوں، نجی ٹرانسفر، رہائش کوآرڈینیشن اور مجاز طبی ٹیموں کی مسلسل نگہداشت کے ساتھ کریں۔",
    service: "طبی سفر کوآرڈینیشن اور کنسیئرج لاجسٹکس",
  },
  pl: {
    locale: "pl_PL",
    title: "Koordynacja podróży medycznej w Antalyi | Antalya VIP Tourism",
    description: "Zaplanuj swoją podróż medyczną do Antalyi z jasnym podziałem ról, prywatnymi transferami, koordynacją zakwaterowania i ciągłą opieką prowadzoną przez uprawnione zespoły medyczne.",
    service: "Koordynacja podróży medycznych i logistyka concierge",
  },
  nl: {
    locale: "nl_NL",
    title: "Coördinatie van medische reizen in Antalya | Antalya VIP Tourism",
    description: "Plan uw medische reis naar Antalya met duidelijke rolverdeling, privétransfers, coördinatie van accommodatie en continue zorg onder leiding van bevoegde medische teams.",
    service: "Coördinatie van medische reizen en conciërgelogistiek",
  },
  ar: {
    locale: "ar_SA",
    title: "تنسيق الرحلات الصحية في أنطاليا | Antalya VIP Tourism",
    description: "خطط لرحلتك الصحية إلى أنطاليا مع أدوار واضحة، ونقل خاص، وتنسيق الإقامة، ورعاية مستمرة يقودها فريق طبي معتمد.",
    service: "تنسيق الرحلات الصحية والخدمات اللوجستية للكونسيرج",
  },
  sv: {
    locale: "sv_SE",
    title: "Samordning av hälsoresor i Antalya | Antalya VIP Tourism",
    description: "Planera din hälsoresa till Antalya med tydlig ansvarsfördelning, privata transfrar, boendesamordning och kontinuerlig vård ledd av auktoriserade medicinska team.",
    service: "Samordning av hälsoresor och conciergelogistik",
  },
} as const;

const routeText = {
  en: {
    title: (name: string) => `Antalya Airport to ${name} Transfer | Private Fixed-Price Service`,
    description: (name: string, price: number) => `Private fixed-price transfer from Antalya Airport to ${name} from €${price}. Meet and greet, flight tracking and door-to-door service.`,
    heading: (name: string) => `Private transfer from Antalya Airport to ${name}`,
    faq: (name: string, price: number, duration: string) => [[`How long is the transfer from Antalya Airport to ${name}?`, `The journey takes approximately ${duration} in normal traffic.`], [`What is the fixed transfer price to ${name}?`, `Mercedes Vito prices start from €${price} per vehicle. The confirmed total is shown when booking.`], ["What happens if my flight is delayed?", "We track your flight in real time and adjust the meeting time at no extra charge."], ["How long does my chauffeur wait at the airport?", "The first 90 minutes after landing are included free of charge, and the window moves automatically if your flight is delayed."], ["How do I pay for the transfer?", "In cash to your chauffeur at the start of the journey - the fixed price from your booking, per vehicle."]],
  },
  de: {
    title: (name: string) => `Flughafen Antalya nach ${name} Transfer | Privater Festpreis-Transfer`,
    description: (name: string, price: number) => `Privater Festpreis-Transfer vom Flughafen Antalya nach ${name} ab €${price}. Meet & Greet, Flugverfolgung und Tür-zu-Tür-Service.`,
    heading: (name: string) => `Privater Transfer vom Flughafen Antalya nach ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Wie lange dauert der Transfer vom Flughafen Antalya nach ${name}?`, `Die Fahrt dauert bei normalem Verkehr ungefähr ${duration}.`], [`Was kostet der Festpreis-Transfer nach ${name}?`, `Die Preise für einen Mercedes Vito beginnen bei €${price} pro Fahrzeug.`], ["Was passiert bei einer Flugverspätung?", "Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit ohne Aufpreis an."], ["Wie lange wartet mein Chauffeur am Flughafen?", "Die ersten 90 Minuten nach der Landung sind kostenfrei enthalten, und bei Flugverspätungen verschiebt sich dieses Zeitfenster automatisch."], ["Wie bezahle ich den Transfer?", "Bar an Ihren Chauffeur zu Beginn der Fahrt - zum Festpreis aus Ihrer Buchung, pro Fahrzeug."]],
  },
  tr: {
    title: (name: string) => `Antalya Havalimanı ${name} Transferi | Özel Sabit Fiyat`,
    description: (name: string, price: number) => `Antalya Havalimanı'ndan ${name} bölgesine €${price}'dan başlayan özel sabit fiyatlı transfer. Uçuş takibi, karşılama ve kapıdan kapıya hizmet.`,
    heading: (name: string) => `Antalya Havalimanı'ndan ${name} bölgesine özel transfer`,
    faq: (name: string, price: number, duration: string) => [[`Antalya Havalimanı ile ${name} arası transfer ne kadar sürer?`, `Normal trafik koşullarında yolculuk yaklaşık ${duration} sürer.`], [`${name} transferinin sabit fiyatı nedir?`, `Mercedes Vito fiyatları araç başına €${price}'dan başlar.`], ["Uçuşum gecikirse ne olur?", "Uçuşunuzu gerçek zamanlı takip eder, karşılama saatini ücretsiz olarak güncelleriz."], ["Şoförüm havalimanında ne kadar bekler?", "İnişten sonraki ilk 90 dakika ücretsiz olarak fiyata dahildir; uçuş gecikmelerinde bu süre otomatik olarak kayar."], ["Transfer ödemesini nasıl yapıyorum?", "Yolculuğun başında şoförünüze nakit olarak - rezervasyonda gördüğünüz sabit fiyat, araç başına."]],
  },
  ru: {
    title: (name: string) => `Трансфер из аэропорта Антальи в ${name} | Фиксированная цена`,
    description: (name: string, price: number) => `Частный трансфер из аэропорта Антальи в ${name} от €${price} за автомобиль. Встреча, отслеживание рейса и доставка до отеля.`,
    heading: (name: string) => `Частный трансфер из аэропорта Антальи в ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Сколько длится трансфер из аэропорта Антальи в ${name}?`, `При обычном движении поездка занимает около ${duration}.`], [`Сколько стоит трансфер в ${name}?`, `Стоимость Mercedes Vito начинается от €${price} за автомобиль.`], ["Что произойдёт при задержке рейса?", "Мы отслеживаем рейс в реальном времени и бесплатно корректируем время встречи."], ["Сколько водитель ждёт в аэропорту?", "Первые 90 минут после посадки включены в стоимость, а при задержке рейса отсчёт сдвигается автоматически."], ["Как оплатить трансфер?", "Наличными водителю в начале поездки - по фиксированной цене из бронирования, за автомобиль."]],
  },
  fr: {
    title: (name: string) => `Transfert Aéroport Antalya vers ${name} | Prix Fixe Privé`,
    description: (name: string, price: number) => `Transfert privé à prix fixe depuis l'aéroport d'Antalya vers ${name} à partir de €${price}. Accueil, suivi de vol et service porte-à-porte.`,
    heading: (name: string) => `Transfert privé depuis l'aéroport d'Antalya vers ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Combien de temps dure le transfert de l'aéroport d'Antalya vers ${name} ?`, `Le trajet dure environ ${duration} en trafic normal.`], [`Quel est le prix fixe du transfert vers ${name} ?`, `Les prix Mercedes Vito commencent à €${price} par véhicule. Le montant total confirmé est affiché lors de la réservation.`], ["Que se passe-t-il si mon vol est retardé ?", "Nous suivons votre vol en temps réel et ajustons l'heure de prise en charge sans frais supplémentaires."], ["Combien de temps mon chauffeur attend-il à l'aéroport ?", "Les 90 premières minutes après l'atterrissage sont incluses sans frais, et ce délai se décale automatiquement en cas de retard de vol."], ["Comment régler le transfert ?", "En espèces à votre chauffeur au début du trajet - au prix fixe de votre réservation, par véhicule."]],
  },
  cs: {
    title: (name: string) => `Transfer z letiště Antalya do ${name} | Soukromá pevná cena`,
    description: (name: string, price: number) => `Soukromý transfer s pevnou cenou z letiště Antalya do ${name} od €${price}. Uvítání, sledování letů a přeprava od dveří ke dveřím.`,
    heading: (name: string) => `Soukromý transfer z letiště Antalya do ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Jak dlouho trvá transfer z letiště Antalya do ${name}?`, `Cesta trvá přibližně ${duration} při běžném provozu.`], [`Jaká je pevná cena transferu do ${name}?`, `Ceny Mercedes Vito začínají od €${price} za vozidlo. Potvrzená celková cena je zobrazena při rezervaci.`], ["Co se stane, když má můj let zpoždění?", "Sledujeme váš let v reálném čase a upravujeme čas setkání bez příplatku."], ["Jak dlouho na mě šofér na letišti čeká?", "Prvních 90 minut po přistání je zdarma v ceně a při zpoždění letu se tento interval automaticky posouvá."], ["Jak transfer zaplatím?", "V hotovosti šoférovi na začátku jízdy - pevnou cenou z vaší rezervace, za vozidlo."]],
  },
  uk: {
    title: (name: string) => `Трансфер з аеропорту Анталії до ${name} | Фіксована ціна`,
    description: (name: string, price: number) => `Приватний трансфер за фіксованою ціною з аеропорту Анталії до ${name} від €${price} за автомобіль. Зустріч, відстеження рейсу та доставка до готелю.`,
    heading: (name: string) => `Приватний трансфер з аеропорту Анталії до ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Скільки триває трансфер з аеропорту Анталії до ${name}?`, `За звичайного руху поїздка займає близько ${duration}.`], [`Яка фіксована ціна трансферу до ${name}?`, `Ціни на Mercedes Vito починаються від €${price} за автомобіль. Підтверджена загальна сума показується під час бронювання.`], ["Що станеться, якщо мій рейс затримається?", "Ми відстежуємо ваш рейс у реальному часі та безкоштовно коригуємо час зустрічі."], ["Скільки водій чекає в аеропорту?", "Перші 90 хвилин після посадки включені у вартість, а в разі затримки рейсу відлік зміщується автоматично."], ["Як оплатити трансфер?", "Готівкою водієві на початку поїздки - за фіксованою ціною з бронювання, за автомобіль."]],
  },
  ur: {
    title: (name: string) => `انطالیہ ایئرپورٹ سے ${name} ٹرانسفر | نجی مقررہ قیمت`,
    description: (name: string, price: number) => `انطالیہ ایئرپورٹ سے ${name} تک مقررہ قیمت پر نجی ٹرانسفر €${price} فی گاڑی سے شروع۔ استقبال، پرواز کی نگرانی اور دروازے تک سروس۔`,
    heading: (name: string) => `انطالیہ ایئرپورٹ سے ${name} تک نجی ٹرانسفر`,
    faq: (name: string, price: number, duration: string) => [[`انطالیہ ایئرپورٹ سے ${name} تک ٹرانسفر میں کتنا وقت لگتا ہے؟`, `عام ٹریفک میں سفر تقریباً ${duration} لیتا ہے۔`], [`${name} تک ٹرانسفر کی مقررہ قیمت کیا ہے؟`, `Mercedes Vito کی قیمتیں €${price} فی گاڑی سے شروع ہوتی ہیں۔ تصدیق شدہ کل رقم بکنگ کے وقت دکھائی جاتی ہے۔`], ["اگر میری پرواز میں تاخیر ہو جائے تو کیا ہوگا؟", "ہم آپ کی پرواز کو حقیقی وقت میں ٹریک کرتے ہیں اور بغیر کسی اضافی چارج کے ملاقات کا وقت ایڈجسٹ کرتے ہیں۔"], ["میرا ڈرائیور ایئرپورٹ پر کتنی دیر انتظار کرتا ہے؟", "لینڈنگ کے بعد پہلے 90 منٹ مفت شامل ہیں، اور پرواز میں تاخیر کی صورت میں یہ دورانیہ خودکار طور پر آگے کھسک جاتا ہے۔"], ["ٹرانسفر کی ادائیگی کیسے کروں؟", "سفر کے آغاز پر ڈرائیور کو نقد - بکنگ کی مقررہ قیمت، فی گاڑی۔"]],
  },
  pl: {
    title: (name: string) => `Transfer z lotniska Antalya do ${name} | Prywatna stała cena`,
    description: (name: string, price: number) => `Prywatny transfer w stałej cenie z lotniska Antalya do ${name} od €${price} za pojazd. Powitanie, śledzenie lotu i dowóz pod hotel.`,
    heading: (name: string) => `Prywatny transfer z lotniska Antalya do ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Jak długo trwa transfer z lotniska Antalya do ${name}?`, `Przy normalnym ruchu podróż trwa około ${duration}.`], [`Jaka jest stała cena transferu do ${name}?`, `Ceny Mercedes Vito zaczynają się od €${price} za pojazd. Potwierdzona łączna kwota jest pokazywana podczas rezerwacji.`], ["Co się stanie, jeśli mój lot będzie opóźniony?", "Śledzimy Twój lot w czasie rzeczywistym i bez dodatkowych opłat dostosowujemy godzinę odbioru."], ["Jak długo kierowca czeka na lotnisku?", "Pierwsze 90 minut po wylądowaniu jest wliczone w cenę, a przy opóźnieniu lotu okno to przesuwa się automatycznie."], ["Jak zapłacić za transfer?", "Gotówką kierowcy na początku podróży - stała cena z rezerwacji, za pojazd."]],
  },
  nl: {
    title: (name: string) => `Luchthaven Antalya naar ${name} Transfer | Privé Vaste Prijs`,
    description: (name: string, price: number) => `Privétransfer met vaste prijs van de luchthaven Antalya naar ${name} vanaf €${price} per voertuig. Ontvangst, vluchtvolging en deur-tot-deur service.`,
    heading: (name: string) => `Privétransfer van de luchthaven Antalya naar ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Hoe lang duurt de transfer van de luchthaven Antalya naar ${name}?`, `De rit duurt ongeveer ${duration} bij normaal verkeer.`], [`Wat is de vaste transferprijs naar ${name}?`, `Mercedes Vito-prijzen beginnen bij €${price} per voertuig. Het bevestigde totaal wordt getoond bij het boeken.`], ["Wat gebeurt er als mijn vlucht vertraging heeft?", "We volgen uw vlucht in realtime en passen de ophaaltijd zonder extra kosten aan."], ["Hoe lang wacht mijn chauffeur op de luchthaven?", "De eerste 90 minuten na de landing zijn kosteloos inbegrepen en dit tijdvenster schuift automatisch mee bij vertraging."], ["Hoe betaal ik de transfer?", "Contant aan uw chauffeur bij aanvang van de rit - de vaste prijs uit uw boeking, per voertuig."]],
  },
  ar: {
    title: (name: string) => `نقل من مطار أنطاليا إلى ${name} | سعر ثابت خاص`,
    description: (name: string, price: number) => `نقل خاص بسعر ثابت من مطار أنطاليا إلى ${name} يبدأ من €${price} لكل مركبة. استقبال وتتبع الرحلة وخدمة من الباب إلى الباب.`,
    heading: (name: string) => `نقل خاص من مطار أنطاليا إلى ${name}`,
    faq: (name: string, price: number, duration: string) => [[`كم يستغرق النقل من مطار أنطاليا إلى ${name}؟`, `تستغرق الرحلة حوالي ${duration} في حركة المرور العادية.`], [`ما هو السعر الثابت للنقل إلى ${name}؟`, `تبدأ أسعار مرسيدس فيتو من €${price} لكل مركبة. يظهر الإجمالي المؤكد عند الحجز.`], ["ماذا يحدث إذا تأخرت رحلتي؟", "نتتبع رحلتك في الوقت الفعلي ونعدّل وقت اللقاء دون أي رسوم إضافية."], ["كم ينتظر السائق في المطار؟", "أول 90 دقيقة بعد الهبوط مشمولة مجانًا، وتتحرك هذه المدة تلقائيًا مع أي تأخير في الرحلة."], ["كيف أدفع قيمة النقل؟", "نقدًا للسائق في بداية الرحلة - بالسعر الثابت من حجزك، لكل مركبة."]],
  },
  sv: {
    title: (name: string) => `Antalya Flygplats till ${name} Transfer | Privat Fast Pris`,
    description: (name: string, price: number) => `Privat transfer till fast pris från Antalya flygplats till ${name} från €${price} per fordon. Möte, flygbevakning och dörr-till-dörr-service.`,
    heading: (name: string) => `Privat transfer från Antalya flygplats till ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Hur lång tid tar transfern från Antalya flygplats till ${name}?`, `Resan tar cirka ${duration} vid normal trafik.`], [`Vad är det fasta transferpriset till ${name}?`, `Mercedes Vito-priser börjar från €${price} per fordon. Den bekräftade summan visas vid bokning.`], ["Vad händer om mitt flyg är försenat?", "Vi spårar ditt flyg i realtid och justerar mötestiden utan extra kostnad."], ["Hur länge väntar chauffören på flygplatsen?", "De första 90 minuterna efter landning ingår utan kostnad, och tidsfönstret förskjuts automatiskt vid flygförsening."], ["Hur betalar jag transfern?", "Kontant till chauffören när resan börjar - det fasta priset från din bokning, per fordon."]],
  },
} as const;

export const languageFromPath = (pathname: string): IndexableLanguage => {
  const candidate = pathname.split("/").filter(Boolean)[0];
  return candidate === "de" || candidate === "fr" || candidate === "tr" || candidate === "ru" || candidate === "cs" || candidate === "uk" || candidate === "ur" || candidate === "pl" || candidate === "nl" || candidate === "ar" || candidate === "sv" ? candidate : "en";
};

export const localizedPath = (language: IndexableLanguage, suffix = "") =>
  `/${language === "en" ? "" : `${language}/`}${suffix}`;

const alternateDescriptors = (suffix = "") => [
  ...indexableLanguages.map((language) => ({ tagName: "link", rel: "alternate", hrefLang: language, href: `${domain}${localizedPath(language, suffix)}` })),
  { tagName: "link", rel: "alternate", hrefLang: "x-default", href: `${domain}${localizedPath("en", suffix)}` },
];

const socialDescriptors = (
  title: string,
  description: string,
  url: string,
  locale: string,
  image = `${domain}/assets/optimized/og-antalya-transfer.jpg`,
) => [
  { property: "og:type", content: "website" }, { property: "og:url", content: url },
  { property: "og:site_name", content: "Antalya VIP Tourism" }, { property: "og:title", content: title },
  { property: "og:description", content: description }, { property: "og:image", content: image },
  { property: "og:locale", content: locale }, { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: title }, { name: "twitter:description", content: description },
  { name: "twitter:image", content: image },
];

export function homeMeta(language: IndexableLanguage) {
  const seo = homeSeo[language];
  const pathname = localizedPath(language);
  const resources = translationData.resources as Record<string, Record<string, string>>;
  const copy = resources[language] ?? resources.en;
  const faq = homeFaqOrder.map((word) => ({ "@type": "Question", name: copy[`faq${word}Q`], acceptedAnswer: { "@type": "Answer", text: copy[`faq${word}A`] } }));
  const travelAgency = {
    "@context": "https://schema.org", "@type": "TravelAgency", name: "Antalya VIP Tourism",
    url: domain, telephone: "+90 530 265 57 90", image: `${domain}/assets/optimized/og-antalya-transfer.jpg`,
    address: { "@type": "PostalAddress", streetAddress: "Belek Mah. Belek 61 Sk. Belek Deniz Apt No: 19 Ic Kapi No: 4", addressLocality: "Serik", addressRegion: "Antalya", addressCountry: "TR" },
    areaServed: publicRouteSlugs.map((slug) => ({ "@type": "City", name: routeCatalog[slug].names.en })),
  };
  return [
    { title: seo.title }, { name: "description", content: seo.description },
    { tagName: "link", rel: "canonical", href: `${domain}${pathname}` }, ...alternateDescriptors(),
    ...socialDescriptors(seo.title, seo.description, `${domain}${pathname}`, seo.locale),
    { "script:ld+json": travelAgency },
    { "script:ld+json": { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq } },
  ];
}

export function healthMeta(language: IndexableLanguage) {
  const seo = healthSeo[language];
  const pathname = localizedPath(language, "health/");
  const url = `${domain}${pathname}`;
  const image = `${domain}/assets/optimized/og-health-tourism.jpg`;
  const provider = {
    "@type": "TravelAgency",
    name: "Antalya VIP Tourism",
    url: domain,
    telephone: "+90 530 265 57 90",
  };

  return [
    { title: seo.title },
    { name: "description", content: seo.description },
    { tagName: "link", rel: "canonical", href: url },
    ...alternateDescriptors("health/"),
    ...socialDescriptors(seo.title, seo.description, url, seo.locale, image),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Antalya VIP Tourism", item: `${domain}${localizedPath(language)}` },
          { "@type": "ListItem", position: 2, name: seo.service, item: url },
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Service",
        name: seo.service,
        description: seo.description,
        url,
        provider,
        areaServed: { "@type": "AdministrativeArea", name: "Antalya, Türkiye" },
        audience: { "@type": "Audience", audienceType: "International travellers" },
      },
    },
  ];
}

export function clinicMeta() {
  const title = "ORIVA Clinic — Premium Estetik Klinik Web Sitesi Demosu";
  const description = "Antalya estetik klinikleri için hazırlanmış kurgusal premium web sitesi konsepti. Gerçek klinik, hekim, hasta veya tedavi sonucu içermez.";
  const url = `${domain}/clinic/`;
  const image = `${domain}/assets/optimized/og-clinic-demo.jpg`;

  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "noindex,nofollow" },
    { tagName: "link", rel: "canonical", href: url },
    ...socialDescriptors(title, description, url, "tr_TR", image),
  ];
}

export function routeMeta(language: IndexableLanguage, slug: string) {
  const route = routeCatalog[slug as keyof typeof routeCatalog];
  if (!route) return [];
  const text = routeText[language];
  const names = route.names as Record<string, string>;
  const durations = route.duration as Record<string, string>;
  const name = names[language] ?? names["en"];
  const title = text.title(name);
  const description = text.description(name, route.prices.vito);
  const pathname = localizedPath(language, `transfers/${slug}/`);
  const url = `${domain}${pathname}`;
  const faq = text.faq(name, route.prices.vito, durations[language] ?? durations["en"]);
  return [
    { title }, { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url }, ...alternateDescriptors(`transfers/${slug}/`),
    ...socialDescriptors(title, description, url, homeSeo[language].locale),
    { "script:ld+json": { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${domain}${localizedPath(language)}` }, { "@type": "ListItem", position: 2, name: "Transfer routes", item: `${domain}${localizedPath(language)}#routes` }, { "@type": "ListItem", position: 3, name: text.heading(name), item: url }] } },
    { "script:ld+json": { "@context": "https://schema.org", "@type": "Service", name: text.heading(name), url, provider: { "@type": "TravelAgency", name: "Antalya VIP Tourism", url: domain, telephone: "+90 530 265 57 90" }, areaServed: { "@type": "Place", name }, offers: [{ "@type": "Offer", name: "Mercedes Vito", price: String(route.prices.vito), priceCurrency: "EUR" }, { "@type": "Offer", name: "Mercedes Sprinter", price: String(route.prices.sprinter), priceCurrency: "EUR" }] } },
    { "script:ld+json": { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) } },
  ];
}

export function hotelMeta(slug: string) {
  const hotel = hotelBySlug(slug);
  if (!hotel) return [];
  const route = routeCatalog[hotel.regionSlug];
  const url = `${domain}/de/hotels/${hotel.slug}/`;
  const transferUrl = `${domain}/de/transfers/${hotel.regionSlug}/`;
  const title = `Flughafen Antalya → ${hotel.name} Transfer | Privater Festpreis`;
  const description = `Privater Transfer vom Flughafen Antalya zum ${hotel.name} ab €${route.prices.vito} pro Fahrzeug. Flugverfolgung, Empfang und direkte Fahrt zum Hotel.`;
  const serviceName = `Privattransfer vom Flughafen Antalya zum ${hotel.name}`;
  const faq = [
    { "@type": "Question", name: `Wie lange dauert die Fahrt zum ${hotel.name}?`, acceptedAnswer: { "@type": "Answer", text: `Bei normalem Verkehr ungefähr ${route.duration.de}.` } },
    { "@type": "Question", name: "Was kostet der Transfer?", acceptedAnswer: { "@type": "Answer", text: `Der Mercedes Vito kostet ab €${route.prices.vito} pro Fahrzeug.` } },
  ];
  return [
    { title }, { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    ...socialDescriptors(title, description, url, homeSeo.de.locale),
    { "script:ld+json": { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Antalya VIP Tourism", item: `${domain}/de/` }, { "@type": "ListItem", position: 2, name: `Transfer nach ${route.names.de}`, item: transferUrl }, { "@type": "ListItem", position: 3, name: hotel.name, item: url }] } },
    { "script:ld+json": { "@context": "https://schema.org", "@type": "Service", name: serviceName, description, url, provider: { "@type": "TravelAgency", name: "Antalya VIP Tourism", url: domain, telephone: "+90 530 265 57 90" }, areaServed: { "@type": "Hotel", name: hotel.name }, offers: [{ "@type": "Offer", name: "Mercedes Vito", price: String(route.prices.vito), priceCurrency: "EUR" }, { "@type": "Offer", name: "Mercedes Sprinter", price: String(route.prices.sprinter), priceCurrency: "EUR" }] } },
    { "script:ld+json": { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq } },
  ];
}

export const routeCopy = (language: IndexableLanguage) => routeText[language];