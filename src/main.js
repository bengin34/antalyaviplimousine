import { createBooking } from './lib/api.js'

const translations = {
  de: {
    navFleet: "Fahrzeuge",
    navService: "Service",
    navRoutes: "Strecken",
    navReviews: "Bewertungen",
    navContact: "Kontakt",
    bookNow: "Jetzt buchen",
    alwaysAvailable: "24 Stunden, jeden Tag erreichbar",
    heroEyebrow: "Privater Chauffeurservice · Antalya",
    heroTitle: "Premium Flughafentransfers<br />in Antalya",
    heroSubtitle: "Private Transfers mit Chauffeur vom Flughafen Antalya nach Belek, Side, Kemer und Alanya.",
    bookTransfer: "Transfer buchen",
    instantQuote: "Sofortpreis erhalten",
    googleRated: "Google-Bewertung",
    trustedGuests: "Von über 2.500 Gästen gebucht",
    discover: "Entdecken",
    privateJourney: "Ihre private Reise",
    quoteTitle: "Wohin dürfen wir Sie bringen?",
    pickup: "Abholung",
    destination: "Zielort",
    date: "Datum",
    guests: "Gäste",
    hotelAddress: "Hotel / Privatadresse",
    selectDestination: "Ziel auswählen",
    oneGuest: "1 Gast",
    twoGuests: "2 Gäste",
    threeGuests: "3 Gäste",
    fourGuests: "4 Gäste",
    fiveGuests: "5 Gäste",
    sixGuests: "6 Gäste",
    sevenGuests: "7 Gäste",
    viewQuote: "Preis anzeigen",
    flightTracking: "Flugverfolgung in Echtzeit",
    fixedPrice: "Garantierter Festpreis",
    meetGreet: "Persönlicher Empfang",
    speakingDrivers: "Deutsch & Englisch sprechend",
    welcomeEyebrow: "Willkommen auf höchstem Niveau",
    welcomeTitle: "Stilvoll reisen.<br />Entspannt ankommen.",
    welcomeBody: "Ab Ihrer Landung ist jedes Detail organisiert. Ihr Chauffeur wartet in der Ankunftshalle, kümmert sich um Ihr Gepäck und begleitet Sie zu Ihrem sorgfältig vorbereiteten Privatfahrzeug.",
    ourStandards: "Unsere Servicestandards",
    concierge: "Concierge-Service",
    guestsWelcomed: "Begrüßte Gäste",
    guestRating: "Durchschnittliche Bewertung",
    privateTransfers: "Private Transfers",
    fleetEyebrow: "Unsere Flotte",
    fleetTitle: "Ihr privater Raum,<br />vollendet bis ins Detail.",
    fleetIntro: "Reisen Sie komfortabel mit großzügigem Platz für Familie, Golfgepäck und Koffer.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription: "Der Maßstab für anspruchsvolle Gruppenreisen: großzügig, außergewöhnlich leise und für eine mühelose Ankunft ausgestattet.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription: "Eine großzügige Privatkabine für größere Familien, Golfgruppen und Gäste mit umfangreichem Gepäck.",
    signatureFleet: "Signature Flotte",
    passengers: "Passagiere",
    suitcases: "Koffer",
    leatherSeats: "Premium-Ledersitze",
    wifi: "Kostenloses WLAN",
    water: "Gekühltes Mineralwasser",
    childSeats: "Kindersitze auf Wunsch",
    reserveVehicle: "Fahrzeug reservieren",
    insideVclass: "Im V-Class Interieur",
    interiorTitle: "Eine private Lounge zwischen<br />Flughafen und Hotel.",
    serviceEyebrow: "Der Antalya VIP Standard",
    serviceTitle: "Mehr als ein Transfer.<br />Ein besonderer Empfang.",
    serviceIntro: "Aufmerksamkeit auf Hotelniveau, erfahrene lokale Chauffeure und absolute Sicherheit vom Flughafen bis zum Resort.",
    trackingTitle: "Flugverfolgung",
    trackingBody: "Wir verfolgen Ihren Flug in Echtzeit und passen die Abholung automatisch und kostenlos an.",
    chauffeurTitle: "Professionelle Chauffeure",
    chauffeurBody: "Stets gepflegt, diskret und ausgewählt für Ortskenntnis und höchsten Servicestandard.",
    greetTitle: "Meet & Greet",
    greetBody: "Ihr Chauffeur empfängt Sie mit Namensschild in der Ankunftshalle und hilft mit dem Gepäck.",
    supportTitle: "24/7 Concierge",
    supportBody: "Vor, während und nach Ihrer Reise ist immer ein persönlicher Ansprechpartner erreichbar.",
    priceTitle: "Festpreise",
    priceBody: "Der bestätigte Preis ist der Endpreis. Wartezeit, Parken und Flugverspätungen sind inklusive.",
    familyTitle: "Für Familien",
    familyBody: "Passende Kindersitze, großzügige Innenräume und geduldige Hilfe für eine entspannte Ankunft.",
    routesEyebrow: "Unsere beliebtesten Fahrten",
    routesTitle: "Vom Flughafen Antalya<br />an die Türkische Riviera.",
    routesIntro: "Alle Preise gelten pro Fahrzeug, nie pro Person. Kostenlose Wartezeit ist inklusive.",
    golfFavourite: "Golf-Favorit",
    from: "Ab",
    reviewsEyebrow: "Gästebewertungen",
    reviewsTitle: "Service, der lange<br />in Erinnerung bleibt.",
    googleReviews: "Basierend auf 387 verifizierten Google-Bewertungen",
    reviewOne: "„Unser Fahrer wartete trotz 90 Minuten Flugverspätung. Die V-Class war makellos, angenehm kühl und bereits mit beiden Kindersitzen ausgestattet. Genau der Empfang, den unsere Familie brauchte.“",
    reviewTwo: "„Vom ersten WhatsApp-Kontakt bis zur Ankunft in Belek absolut erstklassig. Pünktlich, diskret und sehr professionell. Auch unsere Golftaschen hatten bequem Platz.“",
    reviewThree: "„Das fühlte sich wie der Chauffeurservice eines Hotels an, nicht wie ein Flughafentaxi. Klare Kommunikation, ein makelloses Fahrzeug und ein aufrichtig höflicher Fahrer.“",
    trustedBy: "Gebucht von Gästen führender Resorts in Antalya",
    processEyebrow: "Bewusst einfach",
    processTitle: "Vier Schritte zur<br />entspannten Ankunft.",
    stepOne: "Ziel wählen",
    stepOneBody: "Sagen Sie uns, wohin und wann Sie reisen möchten.",
    stepTwo: "Fahrzeug auswählen",
    stepTwoBody: "Wählen Sie den passenden Raum und Komfort.",
    stepThree: "Buchung bestätigen",
    stepThreeBody: "Erhalten Sie sofort Ihre Bestätigung zum Festpreis.",
    stepFour: "Chauffeur treffen",
    stepFourBody: "Ihr Chauffeur empfängt Sie in der Ankunftshalle.",
    faqEyebrow: "Häufig gefragt",
    faqTitle: "Vor Ihrer Reise.",
    faqIntro: "Alles, was Sie über Ihren privaten Flughafentransfer in Antalya wissen müssen.",
    askQuestion: "Frage stellen",
    faqOneQ: "Was passiert bei einer Flugverspätung?",
    faqOneA: "Wir verfolgen jede Ankunft in Echtzeit. Ihre Abholzeit wird automatisch angepasst und Ihr Chauffeur wartet ohne Aufpreis.",
    faqTwoQ: "Wo treffe ich meinen Chauffeur?",
    faqTwoA: "Ihr Chauffeur wartet direkt hinter der Gepäckausgabe in der Ankunftshalle mit einem persönlichen Namensschild.",
    faqThreeQ: "Sind Kindersitze verfügbar?",
    faqThreeA: "Ja. Babyschalen, Kindersitze und Sitzerhöhungen sind bei Vorbestellung kostenlos verfügbar.",
    faqFourQ: "Können Golfbags und großes Gepäck transportiert werden?",
    faqFourA: "Ja. V-Class und Vito VIP sind ideal für Golfgruppen. Teilen Sie uns Ihr Gepäck mit und wir planen das passende Fahrzeug.",
    faqFiveQ: "Ist der angezeigte Preis endgültig?",
    faqFiveA: "Ja. Flughafengebühren, Parken, Wartezeit und Steuern sind inklusive. Es gibt keine versteckten Kosten.",
    contactEyebrow: "Ihre Reise beginnt hier",
    contactTitle: "Außergewöhnlich gut<br />in Antalya ankommen.",
    contactBody: "Buchen Sie in weniger als zwei Minuten online oder sprechen Sie direkt mit unserem 24/7 Concierge-Team.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Antwort meist in wenigen Minuten",
    callUs: "24/7 anrufen",
    emailUs: "Concierge E-Mail",
    replyHour: "Antwort innerhalb einer Stunde",
    fromAirport: "Ab Flughafen Antalya",
    perVehicle: "pro Fahrzeug · Festpreis",
    footerTagline: "Private Chauffeurservices an der gesamten Türkischen Riviera.",
    explore: "Entdecken",
    information: "Information",
    licensed: "Lizenzierter privater Transferanbieter · TÜRSAB-konform",
    quoteReady: "Ihr privater Transfer",
    vehicle: "Fahrzeug",
    journeyTime: "Fahrzeit",
    totalFixed: "Gesamtpreis",
    quoteIncludes: "Inklusive Meet & Greet, Flugverfolgung, Parken, Wartezeit und Mineralwasser.",
    confirmWhatsapp: "Über WhatsApp bestätigen",
    chatWithUs: "Mit uns chatten",
    bookNowCta: "Jetzt buchen",
    backToQuote: "Zurück",
    yourDetails: "Ihre Daten",
    fullName: "Vollständiger Name",
    emailLabel: "E-Mail",
    phoneLabel: "Telefon / WhatsApp",
    flightNumber: "Flugnummer",
    flightArrivalTime: "Ankunftszeit",
    notesLabel: "Besondere Wünsche",
    confirmBooking: "Buchung bestätigen",
    payLaterNote: "Sichere Online-Zahlung nach Bestätigung.",
    bookingConfirmed: "Buchung bestätigt",
    referenceLabel: "Referenz",
    weWillContact: "Bestätigung an Ihre E-Mail gesendet. Wir melden uns innerhalb von 30 Minuten.",
  },
  tr: {
    navFleet: "Araçlar",
    navService: "Hizmetler",
    navRoutes: "Rotalar",
    navReviews: "Yorumlar",
    navContact: "İletişim",
    bookNow: "Hemen rezervasyon",
    alwaysAvailable: "Her gün 24 saat hizmetinizdeyiz",
    heroEyebrow: "Özel şoför hizmeti · Antalya",
    heroTitle: "Antalya'da Premium<br />Havalimanı Transferi",
    heroSubtitle: "Antalya Havalimanı'ndan Belek, Side, Kemer ve Alanya'ya özel şoförlü transfer.",
    bookTransfer: "Transferinizi ayırtın",
    instantQuote: "Anında fiyat alın",
    googleRated: "Google puanı",
    trustedGuests: "2.500'den fazla misafirin tercihi",
    discover: "Keşfedin",
    privateJourney: "Size özel yolculuk",
    quoteTitle: "Sizi nereye götürelim?",
    pickup: "Alış noktası",
    destination: "Varış noktası",
    date: "Tarih",
    guests: "Misafir",
    hotelAddress: "Otel / Özel adres",
    selectDestination: "Varış noktası seçin",
    oneGuest: "1 misafir",
    twoGuests: "2 misafir",
    threeGuests: "3 misafir",
    fourGuests: "4 misafir",
    fiveGuests: "5 misafir",
    sixGuests: "6 misafir",
    sevenGuests: "7 misafir",
    viewQuote: "Fiyatı görüntüle",
    flightTracking: "Gerçek zamanlı uçuş takibi",
    fixedPrice: "Sabit fiyat garantisi",
    meetGreet: "Kişisel karşılama",
    speakingDrivers: "İngilizce ve Almanca konuşan şoförler",
    welcomeEyebrow: "Daha iyi bir karşılamaya hoş geldiniz",
    welcomeTitle: "Zarafetle seyahat edin.<br />Rahatça varın.",
    welcomeBody: "Uçağınız indiği andan itibaren her ayrıntı düşünülür. Şoförünüz gelen yolcu salonunda bekler, bagajınızla ilgilenir ve sizi özenle hazırlanmış özel aracınıza götürür.",
    ourStandards: "Hizmet standartlarımız",
    concierge: "Concierge desteği",
    guestsWelcomed: "Karşılanan misafir",
    guestRating: "Ortalama misafir puanı",
    privateTransfers: "Özel transfer",
    fleetEyebrow: "Araç filomuz",
    fleetTitle: "Size özel alan,<br />her ayrıntıda kusursuz.",
    fleetIntro: "Aileniz, golf ekipmanınız ve bagajınız için geniş alan sunan sessiz bir konforla seyahat edin.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription: "Seçkin grup seyahatlerinin ölçütü. Geniş, son derece sessiz ve kusursuz bir varış için özenle donatılmış.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription: "Kalabalık aileler, golf grupları ve fazla bagajla seyahat eden misafirler için geniş bir özel kabin.",
    signatureFleet: "Seçkin filo",
    passengers: "yolcu",
    suitcases: "bavul",
    leatherSeats: "Premium deri koltuklar",
    wifi: "Ücretsiz WiFi",
    water: "Soğuk şişe su",
    childSeats: "Talep üzerine çocuk koltuğu",
    reserveVehicle: "Bu aracı ayırtın",
    insideVclass: "V-Class'ın içinde",
    interiorTitle: "Havalimanı ile oteliniz arasında<br />size özel bir lounge.",
    serviceEyebrow: "Antalya VIP standardı",
    serviceTitle: "Transferden fazlası.<br />Özenli bir karşılama.",
    serviceIntro: "Havalimanından otele kadar beş yıldızlı ilgi, deneyimli yerel şoförler ve tam huzur.",
    trackingTitle: "Uçuş takibi",
    trackingBody: "Uçuşunuzu gerçek zamanlı takip eder, alış saatinizi hiçbir ek ücret olmadan otomatik olarak ayarlarız.",
    chauffeurTitle: "Profesyonel şoförler",
    chauffeurBody: "Bakımlı, gizliliğe önem veren ve yerel bilgisi ile hizmet kalitesi için seçilmiş profesyoneller.",
    greetTitle: "Karşılama hizmeti",
    greetBody: "Şoförünüz sizi gelen yolcu salonunda isminizin yazılı olduğu tabela ile karşılar ve bagajınıza yardımcı olur.",
    supportTitle: "7/24 concierge",
    supportBody: "Yolculuğunuzdan önce, yolculuk sırasında ve sonrasında telefon veya WhatsApp üzerinden gerçek bir kişiye ulaşabilirsiniz.",
    priceTitle: "Sabit fiyatlar",
    priceBody: "Onaylanan fiyat ödeyeceğiniz nihai fiyattır. Bekleme, otopark ve uçuş gecikmeleri dahildir.",
    familyTitle: "Ailelere hazır",
    familyBody: "Yaşa uygun çocuk koltukları, geniş kabinler ve rahat bir aile karşılaması için özenli destek.",
    routesEyebrow: "En çok tercih edilen yolculuklar",
    routesTitle: "Antalya Havalimanı'ndan<br />Türk Rivierası'na.",
    routesIntro: "Tüm fiyatlar kişi başı değil, araç başıdır ve ücretsiz bekleme süresi dahildir.",
    golfFavourite: "Golf misafirlerinin favorisi",
    from: "Başlangıç",
    reviewsEyebrow: "Misafir yorumları",
    reviewsTitle: "Varıştan sonra da<br />hatırlanan hizmet.",
    googleReviews: "Doğrulanmış 387 Google yorumuna göre",
    reviewOne: "“Uçağımız 90 dakika gecikmesine rağmen şoförümüz bizi bekliyordu. V-Class kusursuz, serin ve iki çocuk koltuğu da hazırdı. Ailemizin tam olarak ihtiyaç duyduğu karşılamaydı.”",
    reviewTwo: "“İlk WhatsApp görüşmesinden Belek'e varışımıza kadar her şey birinci sınıftı. Dakik, gizliliğe önem veren ve son derece profesyonel. Golf çantalarımız da rahatça sığdı.”",
    reviewThree: "“Bu bir havalimanı taksisinden çok beş yıldızlı otel şoför hizmeti gibiydi. Net iletişim, tertemiz araç ve gerçekten nazik bir şoför.”",
    trustedBy: "Antalya'nın önde gelen resort misafirlerinin tercihi",
    processEyebrow: "Sade ve kolay",
    processTitle: "Kusursuz bir varış için<br />dört adım.",
    stepOne: "Varış noktasını seçin",
    stepOneBody: "Nereye ve ne zaman seyahat etmek istediğinizi belirtin.",
    stepTwo: "Aracınızı seçin",
    stepTwoBody: "Grubunuza uygun alanı ve konforu seçin.",
    stepThree: "Rezervasyonu onaylayın",
    stepThreeBody: "Sabit toplam fiyatla anında onay alın.",
    stepFour: "Şoförünüzle buluşun",
    stepFourBody: "Şoförünüz sizi gelen yolcu salonunda karşılar.",
    faqEyebrow: "Sık sorulanlar",
    faqTitle: "Seyahatinizden önce.",
    faqIntro: "Antalya'daki özel havalimanı transferiniz hakkında bilmeniz gereken her şey.",
    askQuestion: "Bize sorun",
    faqOneQ: "Uçağım gecikirse ne olur?",
    faqOneA: "Tüm uçuşları gerçek zamanlı takip ederiz. Alış saatiniz otomatik olarak güncellenir ve şoförünüz ek ücret olmadan bekler.",
    faqTwoQ: "Şoförümle nerede buluşacağım?",
    faqTwoA: "Şoförünüz bagaj tesliminden hemen sonra gelen yolcu salonunda, isminizin yazılı olduğu tabela ile bekler.",
    faqThreeQ: "Çocuk koltuğu var mı?",
    faqThreeA: "Evet. Bebek koltuğu, çocuk koltuğu ve yükseltici koltuk rezervasyon sırasında ücretsiz olarak talep edilebilir.",
    faqFourQ: "Golf çantası ve büyük bagaj taşıyor musunuz?",
    faqFourA: "Evet. V-Class ve Vito VIP araçlarımız golf grupları için idealdir. Bagaj bilgilerinizi paylaşın, uygun aracı planlayalım.",
    faqFiveQ: "Verilen fiyat kesin mi?",
    faqFiveA: "Evet. Havalimanı ücretleri, otopark, bekleme süresi ve vergiler dahildir. Gizli ücret yoktur.",
    contactEyebrow: "Yolculuğunuz burada başlar",
    contactTitle: "Antalya'ya ayrıcalıklı<br />bir şekilde varın.",
    contactBody: "İki dakikadan kısa sürede online rezervasyon yapın veya 7/24 concierge ekibimizle doğrudan görüşün.",
    whatsappUs: "WhatsApp'tan yazın",
    replyMinutes: "Genellikle birkaç dakika içinde yanıt veririz",
    callUs: "7/24 arayın",
    emailUs: "Concierge e-postası",
    replyHour: "Bir saat içinde yanıt",
    fromAirport: "Antalya Havalimanı'ndan",
    perVehicle: "araç başı · sabit fiyat",
    footerTagline: "Türk Rivierası genelinde özel şoför hizmetleri.",
    explore: "Keşfedin",
    information: "Bilgi",
    licensed: "Lisanslı özel transfer işletmesi · TÜRSAB standartlarına uygun",
    quoteReady: "Size özel transfer",
    vehicle: "Araç",
    journeyTime: "Yolculuk süresi",
    totalFixed: "Toplam sabit fiyat",
    quoteIncludes: "Karşılama, uçuş takibi, otopark, bekleme süresi ve şişe su dahildir.",
    confirmWhatsapp: "WhatsApp ile onaylayın",
    chatWithUs: "Bize yazın",
    bookNowCta: "Rezervasyon yap",
    backToQuote: "Geri",
    yourDetails: "Bilgileriniz",
    fullName: "Ad Soyad",
    emailLabel: "E-posta",
    phoneLabel: "Telefon / WhatsApp",
    flightNumber: "Uçuş numarası",
    flightArrivalTime: "Varış saati",
    notesLabel: "Özel istekler",
    confirmBooking: "Rezervasyonu onayla",
    payLaterNote: "Onay sonrası güvenli online ödeme.",
    bookingConfirmed: "Rezervasyon Onaylandı",
    referenceLabel: "Referans",
    weWillContact: "Onay e-postanıza gönderildi. 30 dakika içinde sizinle iletişime geçeceğiz.",
  },
  ru: {
    navFleet: "Автопарк",
    navService: "Сервис",
    navRoutes: "Маршруты",
    navReviews: "Отзывы",
    navContact: "Контакты",
    bookNow: "Забронировать",
    alwaysAvailable: "Мы на связи круглосуточно, каждый день",
    heroEyebrow: "Персональный шофёр · Анталья",
    heroTitle: "Премиальный трансфер<br />из аэропорта Антальи",
    heroSubtitle: "Индивидуальные трансферы с водителем из аэропорта Антальи в Белек, Сиде, Кемер и Аланью.",
    bookTransfer: "Забронировать трансфер",
    instantQuote: "Узнать цену",
    googleRated: "Рейтинг Google",
    trustedGuests: "Нам доверяют более 2 500 гостей",
    discover: "Подробнее",
    privateJourney: "Ваша частная поездка",
    quoteTitle: "Куда вас отвезти?",
    pickup: "Место встречи",
    destination: "Направление",
    date: "Дата",
    guests: "Гости",
    hotelAddress: "Отель / Частный адрес",
    selectDestination: "Выберите направление",
    oneGuest: "1 гость",
    twoGuests: "2 гостя",
    threeGuests: "3 гостя",
    fourGuests: "4 гостя",
    fiveGuests: "5 гостей",
    sixGuests: "6 гостей",
    sevenGuests: "7 гостей",
    viewQuote: "Показать цену",
    flightTracking: "Отслеживание рейса",
    fixedPrice: "Гарантия фиксированной цены",
    meetGreet: "Персональная встреча",
    speakingDrivers: "Водители говорят на английском и немецком",
    welcomeEyebrow: "Добро пожаловать на новый уровень сервиса",
    welcomeTitle: "Путешествуйте красиво.<br />Прибывайте без забот.",
    welcomeBody: "С момента посадки вашего самолёта мы продумываем каждую деталь. Шофёр встретит вас в зале прилёта, поможет с багажом и проводит к подготовленному автомобилю.",
    ourStandards: "Наши стандарты сервиса",
    concierge: "Поддержка консьержа",
    guestsWelcomed: "Встреченных гостей",
    guestRating: "Средняя оценка гостей",
    privateTransfers: "Частные трансферы",
    fleetEyebrow: "Наш автопарк",
    fleetTitle: "Ваше личное пространство,<br />безупречное в деталях.",
    fleetIntro: "Путешествуйте в тишине и комфорте: достаточно места для семьи, багажа и оборудования для гольфа.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription: "Эталон комфортных групповых поездок: просторный, исключительно тихий салон и всё необходимое для беззаботного прибытия.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription: "Просторный частный салон для больших семей, групп игроков в гольф и гостей с объёмным багажом.",
    signatureFleet: "Фирменный автопарк",
    passengers: "пассажиров",
    suitcases: "чемоданов",
    leatherSeats: "Премиальные кожаные сиденья",
    wifi: "Бесплатный WiFi",
    water: "Охлаждённая вода",
    childSeats: "Детские кресла по запросу",
    reserveVehicle: "Забронировать автомобиль",
    insideVclass: "Салон V-Class",
    interiorTitle: "Персональный лаунж<br />между аэропортом и отелем.",
    serviceEyebrow: "Стандарт Antalya VIP",
    serviceTitle: "Больше, чем трансфер.<br />Продуманная встреча.",
    serviceIntro: "Внимание уровня пятизвёздочного отеля, опытные местные шофёры и спокойствие от аэропорта до курорта.",
    trackingTitle: "Отслеживание рейса",
    trackingBody: "Мы отслеживаем ваш рейс в реальном времени и автоматически корректируем время встречи без доплаты.",
    chauffeurTitle: "Профессиональные шофёры",
    chauffeurBody: "Безупречный внешний вид, деликатность, знание региона и высокие стандарты обслуживания.",
    greetTitle: "Встреча в аэропорту",
    greetBody: "Шофёр встретит вас в зале прилёта с именной табличкой и поможет с багажом.",
    supportTitle: "Консьерж 24/7",
    supportBody: "До, во время и после поездки вам всегда ответит человек по телефону или в WhatsApp.",
    priceTitle: "Фиксированные цены",
    priceBody: "Подтверждённая цена является окончательной. Ожидание, парковка и задержка рейса уже включены.",
    familyTitle: "Для всей семьи",
    familyBody: "Детские кресла по возрасту, просторный салон и внимательная помощь для спокойного семейного приезда.",
    routesEyebrow: "Самые популярные поездки",
    routesTitle: "Из аэропорта Антальи<br />на Турецкую Ривьеру.",
    routesIntro: "Все цены указаны за автомобиль, а не за пассажира. Бесплатное ожидание включено.",
    golfFavourite: "Выбор игроков в гольф",
    from: "От",
    reviewsEyebrow: "Отзывы гостей",
    reviewsTitle: "Сервис, который помнят<br />после прибытия.",
    googleReviews: "На основе 387 подтверждённых отзывов Google",
    reviewOne: "«Несмотря на задержку рейса на 90 минут, водитель ждал нас. V-Class был безупречно чистым и прохладным, а оба детских кресла уже были установлены. Именно такая встреча была нужна нашей семье».",
    reviewTwo: "«От первого сообщения в WhatsApp до прибытия в Белек всё было на высшем уровне. Пунктуально, деликатно и очень профессионально. Наши сумки для гольфа легко поместились».",
    reviewThree: "«Это было похоже на трансфер от пятизвёздочного отеля, а не на такси из аэропорта. Чёткая связь, безупречный автомобиль и по-настоящему вежливый водитель».",
    trustedBy: "Нам доверяют гости ведущих курортов Антальи",
    processEyebrow: "Продуманная простота",
    processTitle: "Четыре шага<br />к комфортному прибытию.",
    stepOne: "Выберите направление",
    stepOneBody: "Сообщите нам, куда и когда вы хотите поехать.",
    stepTwo: "Выберите автомобиль",
    stepTwoBody: "Подберите пространство и комфорт для вашей компании.",
    stepThree: "Подтвердите бронирование",
    stepThreeBody: "Сразу получите подтверждение с фиксированной ценой.",
    stepFour: "Встретьте водителя",
    stepFourBody: "Ваш шофёр встретит вас в зале прилёта.",
    faqEyebrow: "Частые вопросы",
    faqTitle: "Перед поездкой.",
    faqIntro: "Всё, что нужно знать о частном трансфере из аэропорта Антальи.",
    askQuestion: "Задать вопрос",
    faqOneQ: "Что произойдёт, если мой рейс задержится?",
    faqOneA: "Мы отслеживаем каждый рейс в реальном времени. Время встречи корректируется автоматически, а водитель ждёт без дополнительной платы.",
    faqTwoQ: "Где я встречу водителя?",
    faqTwoA: "Ваш шофёр будет ждать в зале прилёта сразу после выдачи багажа с именной табличкой.",
    faqThreeQ: "Есть ли детские кресла?",
    faqThreeA: "Да. Автолюльки, детские кресла и бустеры предоставляются бесплатно по запросу при бронировании.",
    faqFourQ: "Можно ли взять сумки для гольфа и крупный багаж?",
    faqFourA: "Да. V-Class и Vito VIP идеально подходят для групп игроков в гольф. Сообщите объём багажа, и мы подберём автомобиль.",
    faqFiveQ: "Указанная цена окончательная?",
    faqFiveA: "Да. Аэропортовые сборы, парковка, ожидание и налоги включены. Скрытых платежей нет.",
    contactEyebrow: "Ваше путешествие начинается здесь",
    contactTitle: "Прибудьте в Анталью<br />исключительно комфортно.",
    contactBody: "Забронируйте онлайн менее чем за две минуты или свяжитесь с нашей службой консьержа 24/7.",
    whatsappUs: "Написать в WhatsApp",
    replyMinutes: "Обычно отвечаем за несколько минут",
    callUs: "Позвонить 24/7",
    emailUs: "Написать консьержу",
    replyHour: "Ответ в течение часа",
    fromAirport: "Из аэропорта Антальи",
    perVehicle: "за автомобиль · фиксированная цена",
    footerTagline: "Частные услуги шофёра по всей Турецкой Ривьере.",
    explore: "Разделы",
    information: "Информация",
    licensed: "Лицензированный оператор частных трансферов · Соответствует требованиям TÜRSAB",
    quoteReady: "Ваш частный трансфер",
    vehicle: "Автомобиль",
    journeyTime: "Время в пути",
    totalFixed: "Итоговая цена",
    quoteIncludes: "Включены встреча, отслеживание рейса, парковка, ожидание и питьевая вода.",
    confirmWhatsapp: "Подтвердить в WhatsApp",
    chatWithUs: "Написать нам",
    bookNowCta: "Забронировать",
    backToQuote: "Назад",
    yourDetails: "Ваши данные",
    fullName: "Имя и фамилия",
    emailLabel: "Эл. почта",
    phoneLabel: "Телефон / WhatsApp",
    flightNumber: "Номер рейса",
    flightArrivalTime: "Время прилёта",
    notesLabel: "Особые пожелания",
    confirmBooking: "Подтвердить бронирование",
    payLaterNote: "Оплата онлайн после подтверждения.",
    bookingConfirmed: "Бронирование подтверждено",
    referenceLabel: "Референс",
    weWillContact: "Подтверждение отправлено на вашу почту. Мы свяжемся с вами в течение 30 минут.",
  }
};

const fleetData = {
  vclass: {
    classKey: "fleetVclassClass",
    className: "Business · First Class",
    name: "Mercedes V-Class",
    descriptionKey: "fleetVclassDescription",
    description: "The benchmark for sophisticated group travel. Spacious, exceptionally quiet and appointed for a seamless arrival.",
    guests: "6",
    bags: "6"
  },
  vito: {
    classKey: "fleetVitoClass",
    className: "VIP · Grand Touring",
    name: "Mercedes Vito VIP",
    descriptionKey: "fleetVitoDescription",
    description: "An expansive private cabin for larger families, golf parties and guests travelling with generous luggage.",
    guests: "7",
    bags: "8"
  }
};

const routeData = {
  belek: { code: "BELEK", name: "Belek", duration: "35 min", price: 45 },
  side: { code: "SIDE", name: "Side", duration: "55 min", price: 65 },
  kemer: { code: "KEMER", name: "Kemer", duration: "60 min", price: 70 },
  alanya: { code: "ALANYA", name: "Alanya", duration: "2 hr", price: 110 },
  antalya: { code: "ANTALYA", name: "Antalya City", duration: "25 min", price: 40 }
};

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const quoteModal = document.querySelector("#quote-modal");
const destinationSelect = document.querySelector("#destination");
const travelDate = document.querySelector("#travel-date");

const setHeaderState = () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
};

const closeMenu = () => {
  menuButton.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("open");
  mobileMenu.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
};

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.classList.toggle("open", !isOpen);
  mobileMenu.setAttribute("aria-hidden", String(isOpen));
  document.body.classList.toggle("menu-open", !isOpen);
});

mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
travelDate.min = localToday;
travelDate.value = localToday;

const updateFleet = (fleetKey) => {
  const selected = fleetData[fleetKey];
  const language = document.documentElement.lang;
  const fleetClass = document.querySelector("#fleet-class");
  const fleetDescription = document.querySelector("#fleet-description");

  fleetClass.dataset.i18n = selected.classKey;
  fleetClass.dataset.original = selected.className;
  fleetDescription.dataset.i18n = selected.descriptionKey;
  fleetDescription.dataset.original = selected.description;
  fleetClass.innerHTML = translations[language]?.[selected.classKey] || selected.className;
  fleetDescription.innerHTML = translations[language]?.[selected.descriptionKey] || selected.description;
  document.querySelector("#fleet-name").textContent = selected.name;
  document.querySelector("#fleet-guests").textContent = selected.guests;
  document.querySelector("#fleet-bags").textContent = selected.bags;
};

document.querySelectorAll(".fleet-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".fleet-tab").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    updateFleet(tab.dataset.fleet);
  });
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach((faq) => {
      faq.classList.remove("open");
      faq.querySelector("button").setAttribute("aria-expanded", "false");
    });
    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const openQuote = (routeKey) => {
  const route = routeData[routeKey];
  const guests = document.querySelector("#guests").value;
  document.querySelector("#quote-code").textContent = route.code;
  document.querySelector("#quote-destination").textContent = route.name;
  document.querySelector("#quote-duration").textContent = route.duration;
  document.querySelector("#quote-guests").textContent = guests;
  document.querySelector("#quote-total").textContent = `€${route.price}`;
  currentQuoteData = {
    pickup: document.querySelector("#pickup").value === "Antalya Airport (AYT)" ? "airport" : "hotel",
    destination: routeKey,
    price: route.price,
  };
  showModalStep(1);
  quoteModal.classList.add("open");
  quoteModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  quoteModal.querySelector(".modal-close").focus();
};

const closeQuote = () => {
  quoteModal.classList.remove("open");
  quoteModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  showModalStep(1);
};

// Modal step navigation
let currentQuoteData = {};

const showModalStep = (step) => {
  [1, 2, 3].forEach((n) => {
    const el = document.querySelector(`#modal-step-${n}`);
    if (el) el.hidden = n !== step;
  });
};

document.querySelector("#modal-book-now").addEventListener("click", () => {
  showModalStep(2);
  document.querySelector("#customer-name").focus();
});

document.querySelector("#modal-back").addEventListener("click", () => {
  showModalStep(1);
});

document.querySelector("#booking-details-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector("#booking-submit");

  // Basic validation
  const name = document.querySelector("#customer-name").value.trim();
  const email = document.querySelector("#customer-email").value.trim();
  const phone = document.querySelector("#customer-phone").value.trim();
  if (!name || !email || !phone) {
    if (!name) document.querySelector("#customer-name").focus();
    else if (!email) document.querySelector("#customer-email").focus();
    else document.querySelector("#customer-phone").focus();
    return;
  }

  submitBtn.disabled = true;
  const originalText = submitBtn.querySelector("span").textContent;
  submitBtn.querySelector("span").textContent = "…";

  try {
    const booking = await createBooking({
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      flight_number: document.querySelector("#flight-number").value.trim() || null,
      flight_arrival_time: document.querySelector("#flight-arrival-time").value || null,
      notes: document.querySelector("#booking-notes").value.trim() || null,
      pickup_location: currentQuoteData.pickup || "airport",
      dropoff_location: currentQuoteData.destination || "",
      pickup_date: document.querySelector("#travel-date").value,
      guests: parseInt(document.querySelector("#guests").value, 10),
      vehicle_type: "vclass",
      price_eur: currentQuoteData.price || 0,
      language: document.documentElement.lang || "en",
    });

    document.querySelector("#confirmed-ref").textContent = booking.booking_ref;
    showModalStep(3);
    form.reset();
  } catch (err) {
    console.error("Booking error:", err);
    submitBtn.querySelector("span").textContent = "Error — try WhatsApp";
  } finally {
    submitBtn.disabled = false;
    if (submitBtn.querySelector("span").textContent === "…") {
      submitBtn.querySelector("span").textContent = originalText;
    }
  }
});

document.querySelector("#quote-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!destinationSelect.value) {
    destinationSelect.focus();
    return;
  }
  openQuote(destinationSelect.value);
});

document.querySelectorAll(".route-card").forEach((card) => {
  card.querySelector("button").addEventListener("click", () => {
    destinationSelect.value = card.dataset.route;
    openQuote(card.dataset.route);
  });
});

document.querySelectorAll(".price-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    destinationSelect.value = pill.dataset.route;
    openQuote(pill.dataset.route);
  });
});

quoteModal.querySelector(".modal-close").addEventListener("click", closeQuote);
quoteModal.querySelector(".modal-backdrop").addEventListener("click", closeQuote);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeQuote();
    closeMenu();
  }
});

const applyLanguage = (language) => {
  const supportedLanguage = (translations[language] || language === "en") ? language : "en";
  document.documentElement.lang = supportedLanguage;

  document.querySelectorAll(".language-button").forEach((item) => {
    const isActive = item.dataset.language === supportedLanguage;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    if (!element.dataset.original) element.dataset.original = element.innerHTML;
    element.innerHTML = translations[supportedLanguage]?.[element.dataset.i18n] || element.dataset.original;
  });

  const activeFleet = document.querySelector(".fleet-tab.active");
  if (activeFleet) updateFleet(activeFleet.dataset.fleet);

  try {
    localStorage.setItem("avl-language", supportedLanguage);
  } catch {
    // Language persistence is optional when storage is unavailable.
  }
};

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.language);
    if (mobileMenu.classList.contains("open")) closeMenu();
  });
});

let savedLanguage = "en";
try {
  savedLanguage = localStorage.getItem("avl-language") || "en";
} catch {
  savedLanguage = "en";
}
applyLanguage(savedLanguage);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".service-card, .route-card, .review-card, .process-line article").forEach((element) => {
  const siblings = Array.from(element.parentElement.children);
  const delay = siblings.indexOf(element) * 0.09;
  element.style.opacity = "0";
  element.style.transform = "translateY(22px)";
  element.style.transition = `opacity .65s ease ${delay}s, transform .65s ease ${delay}s, box-shadow .35s ease`;
  observer.observe(element);
});

const revealStyle = document.createElement("style");
revealStyle.textContent = ".is-visible{opacity:1!important;transform:translateY(0)!important}";
document.head.appendChild(revealStyle);

// Count-up animation for luxury stats
document.querySelectorAll(".luxury-stats strong").forEach((el) => {
  const raw = el.textContent.trim();
  const match = raw.match(/^([\d,]+)(\+?)(%?)$/);
  if (!match) return;
  const target = parseInt(match[1].replace(/,/g, ""), 10);
  const suffix = match[2] + match[3];
  const statsObs = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    statsObs.unobserve(el);
    let startTs = null;
    const duration = 1800;
    const step = (ts) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = (current >= 1000 ? current.toLocaleString() : current) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = (target >= 1000 ? target.toLocaleString() : target) + suffix;
    };
    requestAnimationFrame(step);
  }, { threshold: 0.5 });
  statsObs.observe(el);
});

// Mobile sticky booking bar
const bookBar = document.createElement("div");
bookBar.className = "mobile-book-bar";
bookBar.innerHTML = `
  <a class="button button-gold" href="#booking">
    <span data-i18n="bookTransfer">Book your transfer</span>
    <svg class="icon" aria-hidden="true"><use href="#icon-arrow-right"></use></svg>
  </a>
  <a class="btn-wa" href="https://wa.me/902420000000" target="_blank" rel="noreferrer" aria-label="WhatsApp">
    <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" viewBox="0 0 24 24"><path d="M20 11.5a8 8 0 0 1-11.8 7L3 20l1.5-5.1A8 8 0 1 1 20 11.5Z"/><path d="M8 8.5c.8 3 2.5 4.7 5.5 5.5"/></svg>
  </a>
`;
document.body.appendChild(bookBar);

const heroSection = document.querySelector(".hero");
const barObs = new IntersectionObserver((entries) => {
  bookBar.classList.toggle("visible", !entries[0].isIntersecting);
}, { threshold: 0.1 });
barObs.observe(heroSection);
