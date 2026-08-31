import { publicRouteSlugs, routeCatalog } from "../../../src/routes.js";
import { hotelBySlug } from "../../../src/hotels.js";
import translationData from "../generated/legacy-translations.json";
import { homeFaqOrder } from "./faq";

export const domain = "https://antalyaviptourism.com";
export const indexableLanguages = ["en", "de", "fr", "tr", "ru", "cs", "uk", "ur", "pl", "nl", "ar", "sv", "da", "el", "es", "he", "hu", "it", "ja", "ko", "pt", "ro", "zh"] as const;
export type IndexableLanguage = (typeof indexableLanguages)[number];

const homeSeo = {
  zh: { locale: "zh_CN", title: "安塔利亚机场接送 | 私人VIP旅游服务", description: "从安塔利亚机场到土耳其各度假区的私人固定价格接送服务。" },
  da: { locale: "da_DK", title: "Antalya Lufthavnstransfer | Privat VIP-turistservice", description: "Private transfers til fast pris fra Antalya Lufthavn til feriesteder i hele Tyrkiet." },
  es: { locale: "es_ES", title: "Traslado Aeropuerto de Antalya | Servicio Turístico VIP Privado", description: "Traslados privados a precio fijo desde el Aeropuerto de Antalya a resorts de toda Türkiye." },
  el: { locale: "el_GR", title: "Μεταφορά από το Αεροδρόμιο Αντάλια | Ιδιωτική Υπηρεσία VIP Τουρισμού", description: "Ιδιωτικές μεταφορές με σταθερή τιμή από το Αεροδρόμιο της Αντάλια προς θέρετρα σε όλη την Τουρκία." },
  he: { locale: "he_IL", title: "העברות משדה התעופה אנטליה | שירות תיירות VIP פרטי", description: "העברות פרטיות במחיר קבוע משדה התעופה אנטליה לאתרי הנופש ברחבי טורקיה." },
  hu: { locale: "hu_HU", title: "Antalya reptéri transzfer | Privát VIP turisztikai szolgáltatás", description: "Privát, fix áras transzferek az antalyai repülőtérről a törökországi üdülőhelyekre." },
  it: { locale: "it_IT", title: "Transfer Aeroporto di Antalya | Servizio Turistico VIP Privato", description: "Transfer privati a prezzo fisso dall'Aeroporto di Antalya verso i resort di tutta la Türkiye." },
  ja: { locale: "ja_JP", title: "アンタルヤ空港送迎 | プライベートVIP観光サービス", description: "アンタルヤ空港からトルコ各地のリゾートへの固定料金プライベート送迎。" },
  ko: { locale: "ko_KR", title: "안탈리아 공항 이동 서비스 | 프라이빗 VIP 관광 서비스", description: "안탈리아 공항에서 튀르키예 전역의 리조트까지 정찰제 프라이빗 이동 서비스." },
  pt: { locale: "pt_PT", title: "Transfer do Aeroporto de Antalya | Serviço Privado de Turismo VIP", description: "Transfers privados a preço fixo do Aeroporto de Antalya para resorts em toda a Turquia." },
  ro: { locale: "ro_RO", title: "Transfer Aeroport Antalya | Serviciu Privat de Turism VIP", description: "Transferuri private cu preț fix de la Aeroportul Antalya către stațiunile din Turcia." },

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
  zh: {
    locale: "zh_CN",
    title: "安塔利亚健康旅行协调 | Antalya VIP旅游",
    description: "规划您的安塔利亚健康之旅，明确的服务方职责、私人接送、住宿协调，以及由授权医疗团队主导的连续护理。",
    service: "健康旅行协调与礼宾物流服务",
  },
  da: {
    locale: "da_DK",
    title: "Koordinering af sundhedsrejser i Antalya | Antalya VIP Tourism",
    description: "Planlæg din sundhedsrejse til Antalya med klare udbyderroller, private transfers, koordinering af overnatning og sammenhængende behandling ledet af autoriserede lægeteams.",
    service: "Koordinering af sundhedsrejser og concierge-logistik",
  },
  es: {
    locale: "es_ES",
    title: "Coordinación de Turismo de Salud en Antalya | Antalya VIP Tourism",
    description: "Planifique su viaje de salud a Antalya con funciones claras de los proveedores, traslados privados, coordinación de alojamiento y continuidad asistencial dirigida por equipos médicos autorizados.",
    service: "Coordinación de turismo de salud y logística de conserjería",
  },
  el: {
    locale: "el_GR",
    title: "Συντονισμός Ιατρικού Τουρισμού στην Αντάλια | Antalya VIP Tourism",
    description: "Σχεδιάστε το ιατρικό σας ταξίδι στην Αντάλια με σαφείς ρόλους παρόχων, ιδιωτικές μεταφορές, συντονισμό διαμονής και συνέχεια φροντίδας υπό την καθοδήγηση εξουσιοδοτημένων ιατρικών ομάδων.",
    service: "Συντονισμός ιατρικού τουρισμού και υπηρεσίες concierge logistics",
  },
  he: {
    locale: "he_IL",
    title: "תיאום תיירות רפואית באנטליה | Antalya VIP Tourism",
    description: "תכננו את מסע התיירות הרפואית שלכם באנטליה עם חלוקת תפקידים ברורה בין הספקים, העברות פרטיות, תיאום מקומות לינה ורצף טיפולי בהובלת צוותים רפואיים מורשים.",
    service: "תיאום תיירות רפואית ולוגיסטיקת קונסיירז'",
  },
  hu: {
    locale: "hu_HU",
    title: "Egészségturisztikai koordináció Antalyában | Antalya VIP Tourism",
    description: "Tervezze meg antalyai egészségügyi utazását világos szolgáltatói szerepekkel, privát transzferekkel, szálláskoordinációval és folyamatos ellátással, engedéllyel rendelkező orvosi csapatok vezetésével.",
    service: "Egészségturisztikai koordináció és concierge logisztika",
  },
  it: {
    locale: "it_IT",
    title: "Coordinamento del Turismo Sanitario ad Antalya | Antalya VIP Tourism",
    description: "Pianifica il tuo viaggio sanitario ad Antalya con ruoli chiari dei fornitori, transfer privati, coordinamento dell'alloggio e continuità delle cure guidate da équipe mediche autorizzate.",
    service: "Coordinamento del turismo sanitario e logistica concierge",
  },
  ja: {
    locale: "ja_JP",
    title: "アンタルヤの医療渡航コーディネート | Antalya VIP Tourism",
    description: "認可された医療チームが主導する明確な提供者の役割、プライベート送迎、宿泊手配、継続的なケアで、アンタルヤでの医療渡航を計画します。",
    service: "医療渡航コーディネートおよびコンシェルジュロジスティクス",
  },
  ko: {
    locale: "ko_KR",
    title: "안탈리아 의료 여행 코디네이션 | 안탈리아 VIP 관광",
    description: "명확한 제공자 역할, 프라이빗 이동, 숙박 코디네이션, 그리고 공인 의료팀이 이끄는 지속적인 케어로 안탈리아 의료 여행을 계획하세요.",
    service: "의료 여행 코디네이션 및 컨시어지 물류",
  },
  pt: {
    locale: "pt_PT",
    title: "Coordenação de Turismo de Saúde em Antalya | Antalya VIP Tourism",
    description: "Planeie a sua viagem de saúde em Antalya com funções de prestadores bem definidas, transfers privados, coordenação de alojamento e continuidade de cuidados liderada por equipas médicas autorizadas.",
    service: "Coordenação de turismo de saúde e logística de concierge",
  },
  ro: {
    locale: "ro_RO",
    title: "Coordonare Turism Medical în Antalya | Antalya VIP Tourism",
    description: "Planificați-vă călătoria medicală în Antalya cu roluri clare ale furnizorilor, transferuri private, coordonarea cazării și continuitatea îngrijirii asigurate de echipe medicale autorizate.",
    service: "Coordonare turism medical și logistică concierge",
  },

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
  zh: {
    title: (name: string) => `安塔利亚机场至${name}接送 | 私人固定价格服务`,
    description: (name: string, price: number) => `从安塔利亚机场至${name}的私人固定价格接送，€${price}起。含接机问候、航班追踪及门到门服务。`,
    heading: (name: string) => `从安塔利亚机场到${name}的私人接送`,
    faq: (name: string, price: number, duration: string) => [[`从安塔利亚机场到${name}的接送需要多长时间？`, `在正常交通情况下，行程约需${duration}。`], [`到${name}的固定接送价格是多少？`, `Mercedes Vito价格每车€${price}起。确认的总价将在预订时显示。`], ["如果我的航班延误怎么办？", "我们会实时追踪您的航班，并免费调整接机时间。"], ["我的司机会在机场等候多久？", "落地后的前90分钟免费包含在内，如果您的航班延误，等候时间会自动顺延。"], ["我该如何支付接送费用？", "在行程开始时以现金支付给您的司机——即您预订时的固定价格，按每车计算。"]],
  },
  da: {
    title: (name: string) => `Antalya Lufthavn til ${name} Transfer | Privat service til fast pris`,
    description: (name: string, price: number) => `Privat transfer til fast pris fra Antalya Lufthavn til ${name} fra €${price}. Meet & Greet, flysporing og dør-til-dør-service.`,
    heading: (name: string) => `Privat transfer fra Antalya Lufthavn til ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Hvor lang er transferen fra Antalya Lufthavn til ${name}?`, `Rejsen tager cirka ${duration} i normal trafik.`], [`Hvad er den faste transferpris til ${name}?`, `Priser for Mercedes Vito starter fra €${price} pr. køretøj. Den bekræftede totalpris vises ved bestilling.`], ["Hvad sker der, hvis mit fly er forsinket?", "Vi sporer dit fly i realtid og justerer mødetidspunktet uden ekstra beregning."], ["Hvor længe venter min chauffør i lufthavnen?", "De første 90 minutter efter landing er inkluderet uden beregning, og tidsvinduet flyttes automatisk, hvis dit fly er forsinket."], ["Hvordan betaler jeg for transferen?", "Kontant til din chauffør ved rejsens start - den faste pris fra din bestilling, pr. køretøj."]],
  },
  es: {
    title: (name: string) => `Traslado del Aeropuerto de Antalya a ${name} | Servicio Privado a Precio Fijo`,
    description: (name: string, price: number) => `Traslado privado a precio fijo desde el Aeropuerto de Antalya a ${name} desde €${price}. Recepción personal, seguimiento de vuelos y servicio puerta a puerta.`,
    heading: (name: string) => `Traslado privado del Aeropuerto de Antalya a ${name}`,
    faq: (name: string, price: number, duration: string) => [[`¿Cuánto dura el traslado del Aeropuerto de Antalya a ${name}?`, `El trayecto dura aproximadamente ${duration} con tráfico normal.`], [`¿Cuál es el precio fijo del traslado a ${name}?`, `Los precios del Mercedes Vito comienzan desde €${price} por vehículo. El total confirmado se muestra al reservar.`], ["¿Qué ocurre si mi vuelo se retrasa?", "Seguimos su vuelo en tiempo real y ajustamos la hora de encuentro sin coste adicional."], ["¿Cuánto tiempo espera mi chófer en el aeropuerto?", "Los primeros 90 minutos tras el aterrizaje están incluidos de forma gratuita, y el margen se ajusta automáticamente si su vuelo se retrasa."], ["¿Cómo pago el traslado?", "En efectivo a su chófer al inicio del trayecto: el precio fijo de su reserva, por vehículo."]],
  },
  el: {
    title: (name: string) => `Μεταφορά από το Αεροδρόμιο Αντάλια προς ${name} | Ιδιωτική Υπηρεσία με Σταθερή Τιμή`,
    description: (name: string, price: number) => `Ιδιωτική μεταφορά με σταθερή τιμή από το Αεροδρόμιο Αντάλια προς ${name} από €${price}. Υποδοχή Meet & Greet, παρακολούθηση πτήσης και εξυπηρέτηση από πόρτα σε πόρτα.`,
    heading: (name: string) => `Ιδιωτική μεταφορά από το Αεροδρόμιο Αντάλια προς ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Πόσο διαρκεί η μεταφορά από το Αεροδρόμιο Αντάλια προς ${name};`, `Το ταξίδι διαρκεί περίπου ${duration} υπό κανονικές συνθήκες κυκλοφορίας.`], [`Ποια είναι η σταθερή τιμή μεταφοράς προς ${name};`, `Οι τιμές για Mercedes Vito ξεκινούν από €${price} ανά όχημα. Το επιβεβαιωμένο σύνολο εμφανίζεται κατά την κράτηση.`], ["Τι συμβαίνει αν η πτήση μου καθυστερήσει;", "Παρακολουθούμε την πτήση σας σε πραγματικό χρόνο και προσαρμόζουμε την ώρα συνάντησης χωρίς επιπλέον χρέωση."], ["Πόση ώρα περιμένει ο οδηγός μου στο αεροδρόμιο;", "Τα πρώτα 90 λεπτά μετά την προσγείωση περιλαμβάνονται δωρεάν, και το χρονικό περιθώριο μετατοπίζεται αυτόματα αν η πτήση σας καθυστερήσει."], ["Πώς πληρώνω για τη μεταφορά;", "Σε μετρητά στον οδηγό σας στην αρχή του ταξιδιού - τη σταθερή τιμή από την κράτησή σας, ανά όχημα."]],
  },
  he: {
    title: (name: string) => `העברה משדה התעופה אנטליה אל ${name} | שירות פרטי במחיר קבוע`,
    description: (name: string, price: number) => `העברה פרטית במחיר קבוע משדה התעופה אנטליה אל ${name} החל מ-€${price}. קבלת פנים אישית, מעקב טיסות ושירות מדלת לדלת.`,
    heading: (name: string) => `העברה פרטית משדה התעופה אנטליה אל ${name}`,
    faq: (name: string, price: number, duration: string) => [[`כמה זמן אורכת ההעברה משדה התעופה אנטליה אל ${name}?`, `הנסיעה אורכת כ-${duration} בתנועה רגילה.`], [`מהו המחיר הקבוע של ההעברה אל ${name}?`, `מחירי Mercedes Vito מתחילים מ-€${price} לרכב. הסכום הכולל המאושר מוצג בעת ההזמנה.`], ["מה קורה אם הטיסה שלי מתעכבת?", "אנו עוקבים אחר הטיסה שלכם בזמן אמת ומתאימים את שעת המפגש ללא תוספת תשלום."], ["כמה זמן ממתין הנהג שלי בשדה התעופה?", "90 הדקות הראשונות לאחר הנחיתה כלולות ללא תשלום, וחלון ההמתנה זז אוטומטית אם הטיסה מתעכבת."], ["כיצד אני משלם עבור ההעברה?", "במזומן לנהג בתחילת הנסיעה - המחיר הקבוע מתוך ההזמנה שלכם, לכל רכב."]],
  },
  hu: {
    title: (name: string) => `Antalya repülőtér – ${name} transzfer | Privát, fix áras szolgáltatás`,
    description: (name: string, price: number) => `Privát, fix áras transzfer az antalyai repülőtérről ${name} felé, már €${price}-tól. Meet & Greet, járatkövetés és háztól házig szolgáltatás.`,
    heading: (name: string) => `Privát transzfer az antalyai repülőtérről ${name} felé`,
    faq: (name: string, price: number, duration: string) => [[`Mennyi ideig tart a transzfer az antalyai repülőtérről ${name} felé?`, `Az út normál forgalomban körülbelül ${duration} tart.`], [`Mennyi a fix transzfer ára ${name} felé?`, `A Mercedes Vito árai járművenként €${price}-tól kezdődnek. A megerősített végösszeg a foglaláskor jelenik meg.`], ["Mi történik, ha a járatom késik?", "Valós időben követjük a járatát, és extra költség nélkül igazítjuk a találkozás időpontját."], ["Meddig vár a sofőröm a repülőtéren?", "A leszállás utáni első 90 perc ingyenesen benne van, és az időablak automatikusan eltolódik, ha a járata késik."], ["Hogyan fizetek a transzferért?", "Készpénzben a sofőrnek az út elején – a foglalásból származó fix ár, járművenként."]],
  },
  it: {
    title: (name: string) => `Transfer dall'Aeroporto di Antalya a ${name} | Servizio Privato a Prezzo Fisso`,
    description: (name: string, price: number) => `Transfer privato a prezzo fisso dall'Aeroporto di Antalya a ${name} da €${price}. Meet & Greet, monitoraggio del volo e servizio porta a porta.`,
    heading: (name: string) => `Transfer privato dall'Aeroporto di Antalya a ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Quanto dura il transfer dall'Aeroporto di Antalya a ${name}?`, `Il viaggio dura circa ${duration} con traffico normale.`], [`Qual è il prezzo fisso del transfer per ${name}?`, `I prezzi Mercedes Vito partono da €${price} per veicolo. Il totale confermato viene mostrato al momento della prenotazione.`], ["Cosa succede se il mio volo è in ritardo?", "Monitoriamo il tuo volo in tempo reale e adeguiamo l'orario dell'incontro senza costi aggiuntivi."], ["Quanto tempo aspetta il mio autista in aeroporto?", "I primi 90 minuti dopo l'atterraggio sono inclusi gratuitamente, e la finestra si sposta automaticamente se il tuo volo è in ritardo."], ["Come pago il transfer?", "In contanti al tuo autista all'inizio del viaggio - il prezzo fisso della tua prenotazione, per veicolo."]],
  },
  ja: {
    title: (name: string) => `アンタルヤ空港から${name}への送迎 | プライベート固定料金サービス`,
    description: (name: string, price: number) => `アンタルヤ空港から${name}へのプライベート固定料金送迎、€${price}から。ミート＆グリート、フライト追跡、ドアツードアサービス。`,
    heading: (name: string) => `アンタルヤ空港から${name}へのプライベート送迎`,
    faq: (name: string, price: number, duration: string) => [[`アンタルヤ空港から${name}までの送迎はどのくらいかかりますか？`, `通常の交通状況で所要時間は約${duration}です。`], [`${name}への固定送迎料金はいくらですか？`, `Mercedes Vitoの料金は1台あたり€${price}からです。確定合計金額は予約時に表示されます。`], ["フライトが遅延した場合はどうなりますか？", "私たちはお客様のフライトをリアルタイムで追跡し、追加料金なしでお迎え時間を調整します。"], ["運転手は空港でどのくらい待ちますか？", "着陸後の最初の90分は無料に含まれており、フライトが遅延した場合は自動的に時間枠が移動します。"], ["送迎料金の支払い方法は？", "旅程開始時に運転手へ現金でお支払いください。予約時の固定料金、1台あたりの金額です。"]],
  },
  ko: {
    title: (name: string) => `안탈리아 공항에서 ${name}까지 이동 | 프라이빗 정찰제 서비스`,
    description: (name: string, price: number) => `안탈리아 공항에서 ${name}까지 €${price}부터 시작하는 프라이빗 정찰제 이동 서비스. 미팅 서비스, 항공편 추적, 도어 투 도어 서비스를 제공합니다.`,
    heading: (name: string) => `안탈리아 공항에서 ${name}까지 프라이빗 이동`,
    faq: (name: string, price: number, duration: string) => [[`안탈리아 공항에서 ${name}까지 이동 시간은 얼마나 걸리나요?`, `일반적인 교통 상황에서 약 ${duration} 소요됩니다.`], [`${name}까지의 정찰제 이동 요금은 얼마인가요?`, `Mercedes Vito 요금은 차량당 €${price}부터 시작합니다. 확정 총액은 예약 시 표시됩니다.`], ["항공편이 지연되면 어떻게 되나요?", "실시간으로 항공편을 추적하며 추가 요금 없이 미팅 시간을 조정합니다."], ["기사님은 공항에서 얼마나 대기하나요?", "착륙 후 첫 90분은 무료로 포함되며, 항공편이 지연되면 대기 시간이 자동으로 조정됩니다."], ["이동 요금은 어떻게 결제하나요?", "이동 시작 시 기사님께 현금으로 결제합니다 - 예약 시 확정된 차량당 정찰제 요금입니다."]],
  },
  pt: {
    title: (name: string) => `Transfer do Aeroporto de Antalya para ${name} | Serviço Privado a Preço Fixo`,
    description: (name: string, price: number) => `Transfer privado a preço fixo do Aeroporto de Antalya para ${name} desde €${price}. Serviço de receção personalizada, monitorização de voos e serviço porta a porta.`,
    heading: (name: string) => `Transfer privado do Aeroporto de Antalya para ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Quanto tempo demora o transfer do Aeroporto de Antalya para ${name}?`, `A viagem demora aproximadamente ${duration} em trânsito normal.`], [`Qual é o preço fixo do transfer para ${name}?`, `Os preços do Mercedes Vito começam em €${price} por veículo. O total confirmado é apresentado na reserva.`], ["O que acontece se o meu voo tiver atraso?", "Monitorizamos o seu voo em tempo real e ajustamos a hora do encontro sem custos adicionais."], ["Quanto tempo espera o meu motorista no aeroporto?", "Os primeiros 90 minutos após a aterragem estão incluídos gratuitamente, e o período ajusta-se automaticamente se o seu voo tiver atraso."], ["Como pago o transfer?", "Em dinheiro ao seu motorista no início da viagem - o preço fixo da sua reserva, por veículo."]],
  },
  ro: {
    title: (name: string) => `Transfer de la Aeroportul Antalya la ${name} | Serviciu Privat cu Preț Fix`,
    description: (name: string, price: number) => `Transfer privat cu preț fix de la Aeroportul Antalya la ${name} de la €${price}. Întâmpinare personală, urmărirea zborului și serviciu din ușă în ușă.`,
    heading: (name: string) => `Transfer privat de la Aeroportul Antalya la ${name}`,
    faq: (name: string, price: number, duration: string) => [[`Cât durează transferul de la Aeroportul Antalya la ${name}?`, `Călătoria durează aproximativ ${duration} în condiții normale de trafic.`], [`Care este prețul fix al transferului către ${name}?`, `Prețurile Mercedes Vito încep de la €${price} per vehicul. Totalul confirmat este afișat la momentul rezervării.`], ["Ce se întâmplă dacă zborul meu întârzie?", "Vă urmărim zborul în timp real și ajustăm ora întâlnirii fără costuri suplimentare."], ["Cât timp așteaptă șoferul la aeroport?", "Primele 90 de minute după aterizare sunt incluse gratuit, iar intervalul se ajustează automat dacă zborul dumneavoastră întârzie."], ["Cum plătesc transferul?", "În numerar șoferului la începutul călătoriei - prețul fix din rezervarea dumneavoastră, per vehicul."]],
  },

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
  return (indexableLanguages as readonly string[]).includes(candidate ?? "")
    ? (candidate as IndexableLanguage)
    : "en";
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
    { "@type": "Question", name: "Was passiert bei einer Flugverspätung?", acceptedAnswer: { "@type": "Answer", text: "Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit ohne Aufpreis an." } },
    { "@type": "Question", name: "Wie lange wartet mein Chauffeur am Flughafen?", acceptedAnswer: { "@type": "Answer", text: "Die ersten 90 Minuten nach der Landung sind kostenfrei enthalten, und bei Flugverspätungen verschiebt sich dieses Zeitfenster automatisch." } },
    { "@type": "Question", name: "Wie bezahle ich den Transfer?", acceptedAnswer: { "@type": "Answer", text: "Bar an Ihren Chauffeur zu Beginn der Fahrt - zum Festpreis aus Ihrer Buchung, pro Fahrzeug." } },
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