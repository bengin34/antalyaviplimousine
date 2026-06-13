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
    paymentTitle: "Sichere Zahlung",
    paymentError: "Zahlung fehlgeschlagen. Bitte erneut versuchen.",
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
    paymentTitle: "Güvenli Ödeme",
    paymentError: "Ödeme başarısız. Lütfen tekrar deneyin.",
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
    paymentTitle: "Безопасная оплата",
    paymentError: "Оплата не прошла. Попробуйте ещё раз.",
  },
  pl: {
    navFleet: "Pojazdy", navService: "Usługi", navRoutes: "Trasy", navReviews: "Opinie", navContact: "Kontakt",
    bookNow: "Zarezerwuj", alwaysAvailable: "Do Twojej dyspozycji 24 godziny na dobę",
    heroEyebrow: "Prywatny serwis szoferski · Antalya",
    heroTitle: "Transfery lotniskowe premium<br />w Antalyi",
    heroSubtitle: "Prywatne transfery z szoferem z lotniska Antalya do Belek, Side, Kemer i Alanyi.",
    bookTransfer: "Zarezerwuj transfer", instantQuote: "Sprawdź cenę", googleRated: "Ocena Google",
    trustedGuests: "Zaufało nam ponad 2 500 gości", discover: "Odkryj", privateJourney: "Twoja prywatna podróż",
    quoteTitle: "Dokąd Cię zawieziemy?", pickup: "Miejsce odbioru", destination: "Cel podróży",
    date: "Data", guests: "Goście", hotelAddress: "Hotel / Adres prywatny", selectDestination: "Wybierz cel",
    oneGuest: "1 gość", twoGuests: "2 gości", threeGuests: "3 gości", fourGuests: "4 gości",
    fiveGuests: "5 gości", sixGuests: "6 gości", sevenGuests: "7 gości", viewQuote: "Pokaż cenę",
    flightTracking: "Śledzenie lotu w czasie rzeczywistym", fixedPrice: "Gwarantowana stała cena",
    meetGreet: "Osobiste powitanie", speakingDrivers: "Kierowcy mówiący po angielsku i niemiecku",
    welcomeEyebrow: "Witamy na najwyższym poziomie",
    welcomeTitle: "Podróżuj z klasą.<br />Przyjeżdżaj spokojnie.",
    welcomeBody: "Od chwili lądowania każdy szczegół jest dopracowany. Szofer czeka w hali przylotów, zajmuje się bagażem i odprowadza Cię do starannie przygotowanego pojazdu.",
    ourStandards: "Nasze standardy usług", concierge: "Usługi concierge", guestsWelcomed: "Powitanych gości",
    guestRating: "Średnia ocena gości", privateTransfers: "Prywatne transfery", fleetEyebrow: "Nasza flota",
    fleetTitle: "Twoja prywatna przestrzeń,<br />doskonała w każdym detalu.",
    fleetIntro: "Podróżuj komfortowo z obszernym miejscem dla rodziny, sprzętu golfowego i walizek.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription: "Wzorzec eleganckiej podróży grupowej: przestronny, wyjątkowo cichy i wyposażony dla bezproblemowego przybycia.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription: "Obszerna prywatna kabina dla większych rodzin, grup golfowych i gości z obfitym bagażem.",
    signatureFleet: "Flota Signature", passengers: "pasażerów", suitcases: "walizek",
    leatherSeats: "Skórzane fotele premium", wifi: "Bezpłatne WiFi", water: "Schłodzona woda mineralna",
    childSeats: "Foteliki dziecięce na życzenie", reserveVehicle: "Zarezerwuj pojazd",
    insideVclass: "Wnętrze V-Class",
    interiorTitle: "Prywatny salon<br />między lotniskiem a hotelem.",
    serviceEyebrow: "Standard Antalya VIP",
    serviceTitle: "Więcej niż transfer.<br />Wyjątkowe powitanie.",
    serviceIntro: "Uwaga na poziomie pięciogwiazdkowego hotelu, doświadczeni lokalni szoferzy i pełen spokój od lotniska po resort.",
    trackingTitle: "Śledzenie lotu",
    trackingBody: "Śledzimy Twój lot w czasie rzeczywistym i automatycznie dostosowujemy godzinę odbioru bez dodatkowych opłat.",
    chauffeurTitle: "Profesjonalni szoferzy",
    chauffeurBody: "Zawsze zadbani, dyskretni, wybrani za znajomość terenu i najwyższe standardy obsługi.",
    greetTitle: "Meet & Greet",
    greetBody: "Szofer wita Cię w hali przylotów z tabliczką z Twoim imieniem i pomaga z bagażem.",
    supportTitle: "Concierge 24/7",
    supportBody: "Przed, w trakcie i po podróży zawsze możesz skontaktować się z nami telefonicznie lub przez WhatsApp.",
    priceTitle: "Stałe ceny",
    priceBody: "Potwierdzona cena jest ceną ostateczną. Czas oczekiwania, parking i opóźnienia lotów są wliczone.",
    familyTitle: "Dla rodzin",
    familyBody: "Odpowiednie foteliki dziecięce, obszerne kabiny i cierpliwa pomoc dla spokojnego przybycia z rodziną.",
    routesEyebrow: "Nasze najpopularniejsze trasy",
    routesTitle: "Z lotniska Antalya<br />na Turecką Riwierę.",
    routesIntro: "Wszystkie ceny dotyczą pojazdu, nie osoby. Bezpłatny czas oczekiwania jest wliczony.",
    golfFavourite: "Ulubieniec golfistów", from: "Od",
    reviewsEyebrow: "Opinie gości", reviewsTitle: "Usługa, która<br />zostaje w pamięci.",
    googleReviews: "Na podstawie 387 zweryfikowanych opinii Google",
    reviewOne: "„Nasz kierowca czekał mimo 90-minutowego opóźnienia. V-Class był nieskazitelny, przyjemnie chłodny i wyposażony już w oba foteliki. Dokładnie takie powitanie potrzebowała nasza rodzina."",
    reviewTwo: "„Od pierwszego kontaktu WhatsApp po przyjazd do Belek wszystko było absolutnie pierwszorzędne. Punktualnie, dyskretnie i bardzo profesjonalnie. Torby golfowe bez problemu się zmieściły."",
    reviewThree: "„To było jak serwis szoferski hotelu, a nie taksówka na lotnisku. Jasna komunikacja, nieskazitelny pojazd i naprawdę uprzejmy kierowca."",
    trustedBy: "Wybór gości czołowych resortów w Antalyi", processEyebrow: "Celowo proste",
    processTitle: "Cztery kroki do<br />spokojnego przybycia.",
    stepOne: "Wybierz cel", stepOneBody: "Powiedz nam, dokąd i kiedy chcesz pojechać.",
    stepTwo: "Wybierz pojazd", stepTwoBody: "Wybierz odpowiednią przestrzeń i komfort.",
    stepThree: "Potwierdź rezerwację", stepThreeBody: "Otrzymaj natychmiastowe potwierdzenie ze stałą ceną.",
    stepFour: "Spotkaj szofera", stepFourBody: "Szofer wita Cię w hali przylotów.",
    faqEyebrow: "Często zadawane pytania", faqTitle: "Przed Twoją podróżą.",
    faqIntro: "Wszystko, co musisz wiedzieć o prywatnym transferze z lotniska w Antalyi.",
    askQuestion: "Zadaj pytanie",
    faqOneQ: "Co się stanie, jeśli mój lot się opóźni?",
    faqOneA: "Śledzimy każdy przylot w czasie rzeczywistym. Godzina odbioru jest automatycznie dostosowywana, a szofer czeka bez dodatkowych opłat.",
    faqTwoQ: "Gdzie spotkam mojego szofera?",
    faqTwoA: "Szofer czeka w hali przylotów tuż za wydawaniem bagażu z tabliczką z Twoim imieniem.",
    faqThreeQ: "Czy dostępne są foteliki dziecięce?",
    faqThreeA: "Tak. Nosidełka, foteliki i podkładki są dostępne bezpłatnie przy wcześniejszej rezerwacji.",
    faqFourQ: "Czy można przewieźć torby golfowe i duży bagaż?",
    faqFourA: "Tak. V-Class i Vito VIP są idealne dla grup golfowych. Podaj informacje o bagażu, a zaplanujemy odpowiedni pojazd.",
    faqFiveQ: "Czy podana cena jest ostateczna?",
    faqFiveA: "Tak. Opłaty lotniskowe, parking, czas oczekiwania i podatki są wliczone. Brak ukrytych kosztów.",
    contactEyebrow: "Twoja podróż zaczyna się tutaj",
    contactTitle: "Przybądź do Antalyi<br />wyjątkowo komfortowo.",
    contactBody: "Zarezerwuj online w mniej niż dwie minuty lub skontaktuj się bezpośrednio z naszym concierge 24/7.",
    whatsappUs: "WhatsApp", replyMinutes: "Odpowiedź zwykle w kilka minut", callUs: "Zadzwoń 24/7",
    emailUs: "E-mail do concierge", replyHour: "Odpowiedź w ciągu godziny",
    fromAirport: "Z lotniska Antalya", perVehicle: "za pojazd · stała cena",
    footerTagline: "Prywatne usługi szoferskie na całej Tureckiej Riwierze.",
    explore: "Odkryj", information: "Informacje",
    licensed: "Licencjonowany prywatny przewoźnik · Zgodny z TÜRSAB",
    quoteReady: "Twój prywatny transfer", vehicle: "Pojazd", journeyTime: "Czas podróży",
    totalFixed: "Cena łączna", quoteIncludes: "Wliczono: powitanie, śledzenie lotu, parking, czas oczekiwania i woda.",
    confirmWhatsapp: "Potwierdź przez WhatsApp", chatWithUs: "Napisz do nas", bookNowCta: "Zarezerwuj",
    backToQuote: "Wstecz", yourDetails: "Twoje dane", fullName: "Imię i nazwisko",
    emailLabel: "E-mail", phoneLabel: "Telefon / WhatsApp", flightNumber: "Numer lotu",
    flightArrivalTime: "Godzina przylotu", notesLabel: "Specjalne życzenia",
    confirmBooking: "Potwierdź rezerwację", payLaterNote: "Bezpieczna płatność online po potwierdzeniu.",
    bookingConfirmed: "Rezerwacja potwierdzona", referenceLabel: "Numer referencyjny",
    weWillContact: "Potwierdzenie wysłane na Twój e-mail. Skontaktujemy się w ciągu 30 minut.",
    paymentTitle: "Bezpieczna płatność", paymentError: "Płatność nie powiodła się. Spróbuj ponownie.",
  },
  nl: {
    navFleet: "Voertuigen", navService: "Service", navRoutes: "Routes", navReviews: "Reviews", navContact: "Contact",
    bookNow: "Nu boeken", alwaysAvailable: "24 uur per dag, elke dag bereikbaar",
    heroEyebrow: "Privé chauffeurservice · Antalya",
    heroTitle: "Premium luchthavenstransfers<br />in Antalya",
    heroSubtitle: "Privé transfers met chauffeur van Antalya Luchthaven naar Belek, Side, Kemer en Alanya.",
    bookTransfer: "Transfer boeken", instantQuote: "Direct prijs ontvangen", googleRated: "Google-beoordeling",
    trustedGuests: "Vertrouwd door meer dan 2.500 gasten", discover: "Ontdekken", privateJourney: "Uw privéreis",
    quoteTitle: "Waar mogen wij u naartoe brengen?", pickup: "Ophaallocatie", destination: "Bestemming",
    date: "Datum", guests: "Gasten", hotelAddress: "Hotel / Privéadres", selectDestination: "Kies bestemming",
    oneGuest: "1 gast", twoGuests: "2 gasten", threeGuests: "3 gasten", fourGuests: "4 gasten",
    fiveGuests: "5 gasten", sixGuests: "6 gasten", sevenGuests: "7 gasten", viewQuote: "Prijs bekijken",
    flightTracking: "Realtime vluchtvolgend", fixedPrice: "Gegarandeerde vaste prijs",
    meetGreet: "Persoonlijk welkom", speakingDrivers: "Chauffeurs die Engels en Duits spreken",
    welcomeEyebrow: "Welkom op het hoogste niveau",
    welcomeTitle: "Stijlvol reizen.<br />Ontspannen aankomen.",
    welcomeBody: "Vanaf uw landing is elk detail geregeld. Uw chauffeur wacht in de aankomsthal, zorgt voor uw bagage en begeleidt u naar uw zorgvuldig voorbereide privévoertuig.",
    ourStandards: "Onze servicestandaarden", concierge: "Conciërgeservice", guestsWelcomed: "Verwelkomde gasten",
    guestRating: "Gemiddelde gastbeoordeling", privateTransfers: "Privétransfers", fleetEyebrow: "Onze vloot",
    fleetTitle: "Uw privéruimte,<br />perfect tot in elk detail.",
    fleetIntro: "Reis comfortabel met ruimte voor familie, golfbagage en koffers.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription: "De maatstaf voor verfijnde groepsreizen: ruim, uitzonderlijk stil en uitgerust voor een probleemloze aankomst.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription: "Een ruime privécabine voor grotere families, golfgroepen en gasten met veel bagage.",
    signatureFleet: "Signature vloot", passengers: "passagiers", suitcases: "koffers",
    leatherSeats: "Premium leren stoelen", wifi: "Gratis WiFi", water: "Gekoeld mineraalwater",
    childSeats: "Kinderzitjes op verzoek", reserveVehicle: "Voertuig reserveren",
    insideVclass: "In het V-Class interieur",
    interiorTitle: "Een privélounge<br />tussen luchthaven en hotel.",
    serviceEyebrow: "De Antalya VIP-standaard",
    serviceTitle: "Meer dan een transfer.<br />Een bijzonder welkom.",
    serviceIntro: "Aandacht op hotelniveau, ervaren lokale chauffeurs en absolute gemoedsrust van luchthaven tot resort.",
    trackingTitle: "Vluchttracking",
    trackingBody: "We volgen uw vlucht in realtime en passen de ophaalafspraak automatisch en kosteloos aan.",
    chauffeurTitle: "Professionele chauffeurs",
    chauffeurBody: "Altijd verzorgd, discreet en geselecteerd op lokale kennis en hoogste servicestandaard.",
    greetTitle: "Meet & Greet",
    greetBody: "Uw chauffeur verwelkomt u in de aankomsthal met een naambordje en helpt met uw bagage.",
    supportTitle: "24/7 Conciërge",
    supportBody: "Voor, tijdens en na uw reis is er altijd iemand bereikbaar per telefoon of WhatsApp.",
    priceTitle: "Vaste prijzen",
    priceBody: "De bevestigde prijs is de definitieve prijs. Wachttijd, parkeren en vluchtvertragingen zijn inbegrepen.",
    familyTitle: "Voor gezinnen",
    familyBody: "Passende kinderzitjes, ruime interieurs en geduldige hulp voor een ontspannen familieaankomst.",
    routesEyebrow: "Onze populairste ritten",
    routesTitle: "Van Antalya Luchthaven<br />naar de Turkse Rivièra.",
    routesIntro: "Alle prijzen zijn per voertuig, nooit per persoon. Gratis wachttijd is inbegrepen.",
    golfFavourite: "Golfliefhebbersfavoriet", from: "Vanaf",
    reviewsEyebrow: "Gastbeoordelingen", reviewsTitle: "Service die lang<br />bijblijft.",
    googleReviews: "Gebaseerd op 387 geverifieerde Google-beoordelingen",
    reviewOne: "„Onze chauffeur wachtte ondanks 90 minuten vertraging. De V-Class was onberispelijk, aangenaam koel en al uitgerust met beide kinderzitjes. Precies de ontvangst die onze familie nodig had."",
    reviewTwo: "„Van het eerste WhatsApp-contact tot aankomst in Belek absoluut eersteklas. Punctueel, discreet en zeer professioneel. Ook onze golftassen pasten er gemakkelijk in."",
    reviewThree: "„Dit voelde als een chauffeurservice van een hotel, niet als een luchthaventaxi. Duidelijke communicatie, een onberispelijk voertuig en een oprecht beleefde chauffeur."",
    trustedBy: "Vertrouwd door gasten van toonaangevende resorts in Antalya",
    processEyebrow: "Bewust eenvoudig",
    processTitle: "Vier stappen naar<br />een ontspannen aankomst.",
    stepOne: "Kies bestemming", stepOneBody: "Vertel ons waarheen en wanneer u wilt reizen.",
    stepTwo: "Kies voertuig", stepTwoBody: "Kies de juiste ruimte en comfort.",
    stepThree: "Bevestig boeking", stepThreeBody: "Ontvang direct uw bevestiging met vaste prijs.",
    stepFour: "Ontmoet uw chauffeur", stepFourBody: "Uw chauffeur verwelkomt u in de aankomsthal.",
    faqEyebrow: "Veelgestelde vragen", faqTitle: "Vóór uw reis.",
    faqIntro: "Alles wat u moet weten over uw privétransfer van de luchthaven Antalya.",
    askQuestion: "Stel een vraag",
    faqOneQ: "Wat gebeurt er bij een vluchtvertraging?",
    faqOneA: "We volgen elke aankomst in realtime. Uw ophaaltijd wordt automatisch aangepast en uw chauffeur wacht zonder meerprijs.",
    faqTwoQ: "Waar ontmoet ik mijn chauffeur?",
    faqTwoA: "Uw chauffeur wacht direct na de bagageband in de aankomsthal met een persoonlijk naambordje.",
    faqThreeQ: "Zijn kinderzitjes beschikbaar?",
    faqThreeA: "Ja. Babyschalen, kinderzitjes en zitverhogers zijn bij vooraf boeken gratis beschikbaar.",
    faqFourQ: "Kunnen golfbags en groot bagage worden vervoerd?",
    faqFourA: "Ja. V-Class en Vito VIP zijn ideaal voor golfgroepen. Geef uw bagage op en wij plannen het juiste voertuig.",
    faqFiveQ: "Is de getoonde prijs definitief?",
    faqFiveA: "Ja. Luchthavengelden, parkeren, wachttijd en belastingen zijn inbegrepen. Geen verborgen kosten.",
    contactEyebrow: "Uw reis begint hier",
    contactTitle: "Buitengewoon goed<br />aankomen in Antalya.",
    contactBody: "Boek online in minder dan twee minuten of spreek direct met ons 24/7 conciërgeteam.",
    whatsappUs: "WhatsApp", replyMinutes: "Antwoord meestal binnen enkele minuten", callUs: "24/7 bellen",
    emailUs: "Conciërge e-mail", replyHour: "Antwoord binnen een uur",
    fromAirport: "Vanaf Antalya Luchthaven", perVehicle: "per voertuig · vaste prijs",
    footerTagline: "Privé chauffeurservices aan de hele Turkse Rivièra.",
    explore: "Ontdekken", information: "Informatie",
    licensed: "Erkende privé-transferaanbieder · TÜRSAB-conform",
    quoteReady: "Uw privétransfer", vehicle: "Voertuig", journeyTime: "Reistijd",
    totalFixed: "Totaalprijs", quoteIncludes: "Inclusief: welkom, vluchttracking, parkeren, wachttijd en water.",
    confirmWhatsapp: "Bevestigen via WhatsApp", chatWithUs: "Chat met ons", bookNowCta: "Nu boeken",
    backToQuote: "Terug", yourDetails: "Uw gegevens", fullName: "Volledige naam",
    emailLabel: "E-mail", phoneLabel: "Telefoon / WhatsApp", flightNumber: "Vluchtnummer",
    flightArrivalTime: "Aankomsttijd", notesLabel: "Speciale wensen",
    confirmBooking: "Boeking bevestigen", payLaterNote: "Veilige online betaling na bevestiging.",
    bookingConfirmed: "Boeking bevestigd", referenceLabel: "Referentie",
    weWillContact: "Bevestiging verzonden naar uw e-mail. We nemen binnen 30 minuten contact op.",
    paymentTitle: "Veilige betaling", paymentError: "Betaling mislukt. Probeer het opnieuw.",
  },
  uk: {
    navFleet: "Автопарк", navService: "Сервіс", navRoutes: "Маршрути", navReviews: "Відгуки", navContact: "Контакти",
    bookNow: "Забронювати", alwaysAvailable: "На зв'язку цілодобово, щодня",
    heroEyebrow: "Приватний шофер · Анталья",
    heroTitle: "Преміальний трансфер<br />з аеропорту Анталії",
    heroSubtitle: "Приватні трансфери з водієм з аеропорту Анталії до Белека, Сіде, Кемера та Аланії.",
    bookTransfer: "Замовити трансфер", instantQuote: "Дізнатися ціну", googleRated: "Рейтинг Google",
    trustedGuests: "Нам довіряють понад 2 500 гостей", discover: "Детальніше", privateJourney: "Ваша приватна поїздка",
    quoteTitle: "Куди вас відвезти?", pickup: "Місце зустрічі", destination: "Напрямок",
    date: "Дата", guests: "Гості", hotelAddress: "Готель / Приватна адреса", selectDestination: "Оберіть напрямок",
    oneGuest: "1 гість", twoGuests: "2 гості", threeGuests: "3 гості", fourGuests: "4 гості",
    fiveGuests: "5 гостей", sixGuests: "6 гостей", sevenGuests: "7 гостей", viewQuote: "Показати ціну",
    flightTracking: "Відстеження рейсу в реальному часі", fixedPrice: "Гарантія фіксованої ціни",
    meetGreet: "Особиста зустріч", speakingDrivers: "Водії розмовляють англійською та німецькою",
    welcomeEyebrow: "Ласкаво просимо на найвищий рівень",
    welcomeTitle: "Подорожуйте стильно.<br />Прибувайте спокійно.",
    welcomeBody: "З моменту посадки вашого літака кожна деталь продумана. Шофер чекає на вас у залі прильоту, піклується про багаж і супроводжує вас до підготовленого автомобіля.",
    ourStandards: "Наші стандарти сервісу", concierge: "Підтримка консьєржа", guestsWelcomed: "Зустрінутих гостей",
    guestRating: "Середня оцінка гостей", privateTransfers: "Приватні трансфери", fleetEyebrow: "Наш автопарк",
    fleetTitle: "Ваш особистий простір,<br />бездоганний у деталях.",
    fleetIntro: "Подорожуйте в тиші та комфорті з місцем для сім'ї, багажу та обладнання для гольфу.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription: "Еталон комфортних групових поїздок: просторий, надзвичайно тихий та оснащений для бездоганного прибуття.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription: "Просторий приватний салон для великих сімей, груп гравців у гольф та гостей з об'ємним багажем.",
    signatureFleet: "Фірмовий автопарк", passengers: "пасажирів", suitcases: "валіз",
    leatherSeats: "Преміальні шкіряні сидіння", wifi: "Безкоштовний WiFi", water: "Охолоджена вода",
    childSeats: "Дитячі крісла на запит", reserveVehicle: "Забронювати автомобіль",
    insideVclass: "Салон V-Class",
    interiorTitle: "Приватний лаунж<br />між аеропортом і готелем.",
    serviceEyebrow: "Стандарт Antalya VIP",
    serviceTitle: "Більше ніж трансфер.<br />Продумана зустріч.",
    serviceIntro: "Увага рівня п'ятизіркового готелю, досвідчені місцеві шофери та спокій від аеропорту до курорту.",
    trackingTitle: "Відстеження рейсу",
    trackingBody: "Ми відстежуємо ваш рейс у реальному часі та автоматично коригуємо час зустрічі без доплати.",
    chauffeurTitle: "Професійні шофери",
    chauffeurBody: "Завжди бездоганний вигляд, делікатність, знання регіону та найвищі стандарти обслуговування.",
    greetTitle: "Зустріч в аеропорту",
    greetBody: "Шофер зустріне вас у залі прильоту з табличкою з вашим ім'ям та допоможе з багажем.",
    supportTitle: "Консьєрж 24/7",
    supportBody: "До, під час і після поїздки вам завжди відповість людина по телефону або в WhatsApp.",
    priceTitle: "Фіксовані ціни",
    priceBody: "Підтверджена ціна є остаточною. Очікування, паркування та затримки рейсів вже включені.",
    familyTitle: "Для всієї родини",
    familyBody: "Дитячі крісла за віком, просторий салон та уважна допомога для спокійного сімейного прибуття.",
    routesEyebrow: "Найпопулярніші поїздки",
    routesTitle: "З аеропорту Анталії<br />на Турецьку Рив'єру.",
    routesIntro: "Всі ціни вказані за автомобіль, а не за пасажира. Безкоштовне очікування включено.",
    golfFavourite: "Вибір гравців у гольф", from: "Від",
    reviewsEyebrow: "Відгуки гостей", reviewsTitle: "Сервіс, який пам'ятають<br />після прибуття.",
    googleReviews: "На основі 387 підтверджених відгуків Google",
    reviewOne: "«Незважаючи на затримку рейсу на 90 хвилин, водій чекав на нас. V-Class був бездоганно чистим та прохолодним, а обидва дитячі крісла вже були встановлені. Саме така зустріч потрібна нашій родині».",
    reviewTwo: "«Від першого повідомлення в WhatsApp до прибуття в Белек все було на найвищому рівні. Пунктуально, делікатно і дуже професійно. Наші сумки для гольфу легко помістилися».",
    reviewThree: "«Це нагадувало трансфер від п'ятизіркового готелю, а не таксі з аеропорту. Чіткий зв'язок, бездоганний автомобіль та по-справжньому ввічливий водій».",
    trustedBy: "Нам довіряють гості провідних курортів Анталії", processEyebrow: "Навмисно просто",
    processTitle: "Чотири кроки<br />до комфортного прибуття.",
    stepOne: "Оберіть напрямок", stepOneBody: "Повідомте нам, куди і коли ви хочете поїхати.",
    stepTwo: "Оберіть автомобіль", stepTwoBody: "Підберіть простір і комфорт для вашої компанії.",
    stepThree: "Підтвердіть бронювання", stepThreeBody: "Отримайте миттєве підтвердження з фіксованою ціною.",
    stepFour: "Зустріньте водія", stepFourBody: "Ваш шофер зустріне вас у залі прильоту.",
    faqEyebrow: "Часті запитання", faqTitle: "Перед поїздкою.",
    faqIntro: "Все, що потрібно знати про приватний трансфер з аеропорту Анталії.",
    askQuestion: "Поставити запитання",
    faqOneQ: "Що станеться, якщо мій рейс затримається?",
    faqOneA: "Ми відстежуємо кожен рейс у реальному часі. Час зустрічі коригується автоматично, а водій чекає без доплати.",
    faqTwoQ: "Де я зустріну водія?",
    faqTwoA: "Ваш шофер чекатиме у залі прильоту одразу після видачі багажу з табличкою з вашим ім'ям.",
    faqThreeQ: "Чи є дитячі крісла?",
    faqThreeA: "Так. Автолюльки, дитячі крісла та бустери надаються безкоштовно на запит при бронюванні.",
    faqFourQ: "Чи можна перевезти сумки для гольфу та великий багаж?",
    faqFourA: "Так. V-Class і Vito VIP ідеально підходять для груп гравців у гольф. Повідомте об'єм багажу і ми підберемо автомобіль.",
    faqFiveQ: "Вказана ціна є остаточною?",
    faqFiveA: "Так. Аеропортові збори, паркування, очікування та податки включені. Прихованих платежів немає.",
    contactEyebrow: "Ваша подорож починається тут",
    contactTitle: "Прибудьте в Анталью<br />надзвичайно комфортно.",
    contactBody: "Забронюйте онлайн менш ніж за дві хвилини або зв'яжіться з нашою службою консьєржа 24/7.",
    whatsappUs: "Написати в WhatsApp", replyMinutes: "Зазвичай відповідаємо за кілька хвилин",
    callUs: "Зателефонувати 24/7", emailUs: "Написати консьєржу", replyHour: "Відповідь протягом години",
    fromAirport: "З аеропорту Анталії", perVehicle: "за автомобіль · фіксована ціна",
    footerTagline: "Приватні послуги шофера по всій Турецькій Рив'єрі.",
    explore: "Розділи", information: "Інформація",
    licensed: "Ліцензований оператор приватних трансферів · Відповідає вимогам TÜRSAB",
    quoteReady: "Ваш приватний трансфер", vehicle: "Автомобіль", journeyTime: "Час у дорозі",
    totalFixed: "Підсумкова ціна", quoteIncludes: "Включено: зустріч, відстеження рейсу, паркування, очікування та вода.",
    confirmWhatsapp: "Підтвердити в WhatsApp", chatWithUs: "Написати нам", bookNowCta: "Забронювати",
    backToQuote: "Назад", yourDetails: "Ваші дані", fullName: "Ім'я та прізвище",
    emailLabel: "Ел. пошта", phoneLabel: "Телефон / WhatsApp", flightNumber: "Номер рейсу",
    flightArrivalTime: "Час прильоту", notesLabel: "Особливі побажання",
    confirmBooking: "Підтвердити бронювання", payLaterNote: "Оплата онлайн після підтвердження.",
    bookingConfirmed: "Бронювання підтверджено", referenceLabel: "Референс",
    weWillContact: "Підтвердження надіслано на вашу пошту. Ми зв'яжемося з вами протягом 30 хвилин.",
    paymentTitle: "Безпечна оплата", paymentError: "Оплата не пройшла. Спробуйте ще раз.",
  },
  fr: {
    navFleet: "Véhicules", navService: "Service", navRoutes: "Itinéraires", navReviews: "Avis", navContact: "Contact",
    bookNow: "Réserver", alwaysAvailable: "Disponible 24h/24, 7j/7",
    heroEyebrow: "Service chauffeur privé · Antalya",
    heroTitle: "Transferts aéroport premium<br />à Antalya",
    heroSubtitle: "Transferts privés avec chauffeur depuis l'aéroport d'Antalya vers Belek, Side, Kemer et Alanya.",
    bookTransfer: "Réserver un transfert", instantQuote: "Obtenir un devis", googleRated: "Note Google",
    trustedGuests: "Approuvé par plus de 2 500 clients", discover: "Découvrir", privateJourney: "Votre voyage privé",
    quoteTitle: "Où souhaitez-vous aller ?", pickup: "Lieu de prise en charge", destination: "Destination",
    date: "Date", guests: "Passagers", hotelAddress: "Hôtel / Adresse privée", selectDestination: "Choisir une destination",
    oneGuest: "1 passager", twoGuests: "2 passagers", threeGuests: "3 passagers", fourGuests: "4 passagers",
    fiveGuests: "5 passagers", sixGuests: "6 passagers", sevenGuests: "7 passagers", viewQuote: "Voir le tarif",
    flightTracking: "Suivi de vol en temps réel", fixedPrice: "Prix fixe garanti",
    meetGreet: "Accueil personnalisé", speakingDrivers: "Chauffeurs parlant anglais et allemand",
    welcomeEyebrow: "Bienvenue au plus haut niveau",
    welcomeTitle: "Voyager avec élégance.<br />Arriver sereinement.",
    welcomeBody: "Dès votre atterrissage, chaque détail est organisé. Votre chauffeur vous attend dans le hall des arrivées, s'occupe de vos bagages et vous accompagne jusqu'à votre véhicule privé soigneusement préparé.",
    ourStandards: "Nos standards de service", concierge: "Service conciergerie", guestsWelcomed: "Clients accueillis",
    guestRating: "Note moyenne des clients", privateTransfers: "Transferts privés", fleetEyebrow: "Notre flotte",
    fleetTitle: "Votre espace privé,<br />parfait dans les moindres détails.",
    fleetIntro: "Voyagez confortablement avec suffisamment d'espace pour la famille, les équipements de golf et les valises.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription: "La référence des voyages de groupe raffinés : spacieux, exceptionnellement silencieux et équipé pour une arrivée sans tracas.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription: "Un vaste habitacle privé pour les grandes familles, les groupes de golf et les voyageurs avec beaucoup de bagages.",
    signatureFleet: "Flotte Signature", passengers: "passagers", suitcases: "valises",
    leatherSeats: "Sièges en cuir premium", wifi: "WiFi gratuit", water: "Eau minérale fraîche",
    childSeats: "Sièges enfants sur demande", reserveVehicle: "Réserver ce véhicule",
    insideVclass: "Intérieur V-Class",
    interiorTitle: "Un salon privé<br />entre l'aéroport et l'hôtel.",
    serviceEyebrow: "La norme Antalya VIP",
    serviceTitle: "Plus qu'un transfert.<br />Un accueil d'exception.",
    serviceIntro: "Une attention digne d'un hôtel cinq étoiles, des chauffeurs locaux expérimentés et une tranquillité absolue de l'aéroport jusqu'au resort.",
    trackingTitle: "Suivi de vol",
    trackingBody: "Nous suivons votre vol en temps réel et ajustons automatiquement l'heure de prise en charge, sans frais supplémentaires.",
    chauffeurTitle: "Chauffeurs professionnels",
    chauffeurBody: "Toujours soignés, discrets et sélectionnés pour leur connaissance locale et leurs standards de service irréprochables.",
    greetTitle: "Accueil Meet & Greet",
    greetBody: "Votre chauffeur vous accueille dans le hall des arrivées avec une pancarte à votre nom et vous aide avec vos bagages.",
    supportTitle: "Conciergerie 24/7",
    supportBody: "Avant, pendant et après votre voyage, une personne est toujours disponible par téléphone ou WhatsApp.",
    priceTitle: "Prix fixes",
    priceBody: "Le prix confirmé est le prix définitif. L'attente, le parking et les retards de vol sont inclus.",
    familyTitle: "Pour les familles",
    familyBody: "Sièges enfants adaptés, habitacles spacieux et aide patiente pour une arrivée familiale sereine.",
    routesEyebrow: "Nos trajets les plus populaires",
    routesTitle: "De l'aéroport d'Antalya<br />vers la Riviera turque.",
    routesIntro: "Tous les prix sont par véhicule, jamais par personne. L'attente gratuite est incluse.",
    golfFavourite: "Favori des golfeurs", from: "À partir de",
    reviewsEyebrow: "Avis clients", reviewsTitle: "Un service dont on<br />se souvient longtemps.",
    googleReviews: "Basé sur 387 avis Google vérifiés",
    reviewOne: "« Notre chauffeur a attendu malgré 90 minutes de retard. La V-Class était impeccable, agréablement fraîche et déjà équipée des deux sièges enfants. Exactement l'accueil dont notre famille avait besoin. »",
    reviewTwo: "« Du premier contact WhatsApp à notre arrivée à Belek, absolument irréprochable. Ponctuel, discret et très professionnel. Nos sacs de golf ont aussi tenu sans problème. »",
    reviewThree: "« C'était comme un service de chauffeur d'hôtel, pas un taxi d'aéroport. Communication claire, véhicule impeccable et chauffeur sincèrement courtois. »",
    trustedBy: "Recommandé par les clients des meilleurs resorts d'Antalya",
    processEyebrow: "Délibérément simple",
    processTitle: "Quatre étapes pour<br />une arrivée sereine.",
    stepOne: "Choisir la destination", stepOneBody: "Indiquez-nous où et quand vous souhaitez voyager.",
    stepTwo: "Choisir le véhicule", stepTwoBody: "Sélectionnez l'espace et le confort adaptés.",
    stepThree: "Confirmer la réservation", stepThreeBody: "Recevez immédiatement votre confirmation au prix fixe.",
    stepFour: "Rencontrer le chauffeur", stepFourBody: "Votre chauffeur vous accueille dans le hall des arrivées.",
    faqEyebrow: "Questions fréquentes", faqTitle: "Avant votre voyage.",
    faqIntro: "Tout ce que vous devez savoir sur votre transfert privé depuis l'aéroport d'Antalya.",
    askQuestion: "Poser une question",
    faqOneQ: "Que se passe-t-il en cas de retard de vol ?",
    faqOneA: "Nous suivons chaque arrivée en temps réel. Votre heure de prise en charge est ajustée automatiquement et votre chauffeur attend sans surcoût.",
    faqTwoQ: "Où vais-je retrouver mon chauffeur ?",
    faqTwoA: "Votre chauffeur vous attendra juste après le retrait des bagages dans le hall des arrivées, avec une pancarte à votre nom.",
    faqThreeQ: "Des sièges enfants sont-ils disponibles ?",
    faqThreeA: "Oui. Coques bébé, sièges enfants et rehausseurs sont disponibles gratuitement sur réservation.",
    faqFourQ: "Pouvez-vous transporter des sacs de golf et des bagages volumineux ?",
    faqFourA: "Oui. Le V-Class et le Vito VIP sont idéaux pour les groupes de golfeurs. Précisez vos bagages et nous planifions le véhicule adapté.",
    faqFiveQ: "Le prix affiché est-il définitif ?",
    faqFiveA: "Oui. Les taxes aéroportuaires, le parking, l'attente et les impôts sont inclus. Aucun frais caché.",
    contactEyebrow: "Votre voyage commence ici",
    contactTitle: "Arriver à Antalya<br />de manière exceptionnelle.",
    contactBody: "Réservez en ligne en moins de deux minutes ou parlez directement avec notre équipe de conciergerie 24/7.",
    whatsappUs: "WhatsApp", replyMinutes: "Réponse généralement en quelques minutes",
    callUs: "Appeler 24/7", emailUs: "E-mail conciergerie", replyHour: "Réponse en moins d'une heure",
    fromAirport: "Depuis l'aéroport d'Antalya", perVehicle: "par véhicule · prix fixe",
    footerTagline: "Services de chauffeur privé sur toute la Riviera turque.",
    explore: "Découvrir", information: "Informations",
    licensed: "Prestataire de transferts privés agréé · Conforme TÜRSAB",
    quoteReady: "Votre transfert privé", vehicle: "Véhicule", journeyTime: "Durée du trajet",
    totalFixed: "Prix total", quoteIncludes: "Inclus : accueil, suivi de vol, parking, attente et eau minérale.",
    confirmWhatsapp: "Confirmer via WhatsApp", chatWithUs: "Nous contacter", bookNowCta: "Réserver maintenant",
    backToQuote: "Retour", yourDetails: "Vos coordonnées", fullName: "Nom complet",
    emailLabel: "E-mail", phoneLabel: "Téléphone / WhatsApp", flightNumber: "Numéro de vol",
    flightArrivalTime: "Heure d'arrivée", notesLabel: "Demandes spéciales",
    confirmBooking: "Confirmer la réservation", payLaterNote: "Paiement en ligne sécurisé après confirmation.",
    bookingConfirmed: "Réservation confirmée", referenceLabel: "Référence",
    weWillContact: "Confirmation envoyée à votre e-mail. Nous vous contactons dans les 30 minutes.",
    paymentTitle: "Paiement sécurisé", paymentError: "Paiement échoué. Veuillez réessayer.",
  },
  sv: {
    navFleet: "Fordon", navService: "Service", navRoutes: "Rutter", navReviews: "Recensioner", navContact: "Kontakt",
    bookNow: "Boka nu", alwaysAvailable: "Tillgänglig 24 timmar om dygnet",
    heroEyebrow: "Privat chaufförstjänst · Antalya",
    heroTitle: "Premium flygplatstransfers<br />i Antalya",
    heroSubtitle: "Privata transfers med chaufför från Antalya flygplats till Belek, Side, Kemer och Alanya.",
    bookTransfer: "Boka transfer", instantQuote: "Få pris direkt", googleRated: "Google-betyg",
    trustedGuests: "Anlitad av över 2 500 gäster", discover: "Utforska", privateJourney: "Din privata resa",
    quoteTitle: "Vart vill du åka?", pickup: "Hämtplats", destination: "Destination",
    date: "Datum", guests: "Gäster", hotelAddress: "Hotell / Privat adress", selectDestination: "Välj destination",
    oneGuest: "1 gäst", twoGuests: "2 gäster", threeGuests: "3 gäster", fourGuests: "4 gäster",
    fiveGuests: "5 gäster", sixGuests: "6 gäster", sevenGuests: "7 gäster", viewQuote: "Visa pris",
    flightTracking: "Flygspårning i realtid", fixedPrice: "Garanterat fast pris",
    meetGreet: "Personlig välkomst", speakingDrivers: "Chaufförer som talar engelska och tyska",
    welcomeEyebrow: "Välkommen till högsta nivå",
    welcomeTitle: "Res med stil.<br />Anländ avslappnad.",
    welcomeBody: "Från det ögonblick ditt plan landar är varje detalj ordnad. Din chaufför väntar i ankomsthallen, tar hand om ditt bagage och eskorterar dig till ditt noggrant förberedda fordon.",
    ourStandards: "Våra servicestandarder", concierge: "Concierge-service", guestsWelcomed: "Välkomnade gäster",
    guestRating: "Genomsnittligt gästbetyg", privateTransfers: "Privata transfers", fleetEyebrow: "Vår flotta",
    fleetTitle: "Ditt privata utrymme,<br />perfekt i varje detalj.",
    fleetIntro: "Res bekvämt med gott om plats för familjen, golfbagaget och resväskorna.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription: "Riktmärket för sofistikerade gruppresor: rymlig, exceptionellt tyst och utrustad för en smidig ankomst.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription: "En rymlig privat kabin för större familjer, golfsällskap och gäster med mycket bagage.",
    signatureFleet: "Signature-flotta", passengers: "passagerare", suitcases: "resväskor",
    leatherSeats: "Premium läderstolar", wifi: "Gratis WiFi", water: "Kylt mineralvatten",
    childSeats: "Bilbarnstolar på begäran", reserveVehicle: "Boka fordon",
    insideVclass: "V-Class interiör",
    interiorTitle: "En privat lounge<br />mellan flygplatsen och hotellet.",
    serviceEyebrow: "Antalya VIP-standarden",
    serviceTitle: "Mer än en transfer.<br />Ett exceptionellt välkomnande.",
    serviceIntro: "Uppmärksamhet på hotellnivå, erfarna lokala chaufförer och fullständigt lugn från flygplats till resort.",
    trackingTitle: "Flygspårning",
    trackingBody: "Vi spårar din flyg i realtid och anpassar automatiskt hämtningstiden utan extra kostnad.",
    chauffeurTitle: "Professionella chaufförer",
    chauffeurBody: "Alltid välvårdade, diskreta och utvalda för lokal kunskap och högsta servicestandard.",
    greetTitle: "Meet & Greet",
    greetBody: "Din chaufför välkomnar dig i ankomsthallen med en skylt med ditt namn och hjälper med bagaget.",
    supportTitle: "Concierge 24/7",
    supportBody: "Före, under och efter din resa finns alltid någon tillgänglig per telefon eller WhatsApp.",
    priceTitle: "Fasta priser",
    priceBody: "Det bekräftade priset är slutpriset. Väntetid, parkering och flygförseningar ingår.",
    familyTitle: "För familjer",
    familyBody: "Lämpliga bilbarnstolar, rymliga interiörer och tålmodig hjälp för en avslappnad familjeankomst.",
    routesEyebrow: "Våra populäraste rutter",
    routesTitle: "Från Antalya flygplats<br />till Turkiska Rivieran.",
    routesIntro: "Alla priser gäller per fordon, aldrig per person. Gratis väntetid ingår.",
    golfFavourite: "Golfarnas favorit", from: "Från",
    reviewsEyebrow: "Gästrecensioner", reviewsTitle: "Service som minns<br />länge efter ankomsten.",
    googleReviews: "Baserat på 387 verifierade Google-recensioner",
    reviewOne: "„Vår chaufför väntade trots 90 minuters försening. V-Classen var makulös, behagligt sval och redan utrustad med båda barnstolarna. Precis det välkomnande vår familj behövde."",
    reviewTwo: "„Från första WhatsApp-kontakten till ankomst i Belek absolut förstklassigt. Punktlig, diskret och mycket professionell. Våra golfbagar fick också plats utan problem."",
    reviewThree: "„Det kändes som en chaufförstjänst från ett hotell, inte en flygplatstaxibil. Tydlig kommunikation, ett makulöst fordon och en genuint artig chaufför."",
    trustedBy: "Anlitad av gäster på ledande resorts i Antalya", processEyebrow: "Medvetet enkelt",
    processTitle: "Fyra steg till<br />en avslappnad ankomst.",
    stepOne: "Välj destination", stepOneBody: "Berätta för oss vart och när du vill resa.",
    stepTwo: "Välj fordon", stepTwoBody: "Välj rätt utrymme och komfort.",
    stepThree: "Bekräfta bokning", stepThreeBody: "Få din bekräftelse direkt till fast pris.",
    stepFour: "Möt din chaufför", stepFourBody: "Din chaufför välkomnar dig i ankomsthallen.",
    faqEyebrow: "Vanliga frågor", faqTitle: "Innan din resa.",
    faqIntro: "Allt du behöver veta om din privata transfer från Antalya flygplats.",
    askQuestion: "Ställ en fråga",
    faqOneQ: "Vad händer vid en flygförsening?",
    faqOneA: "Vi spårar varje ankomst i realtid. Din hämtningstid justeras automatiskt och din chaufför väntar utan extra kostnad.",
    faqTwoQ: "Var möter jag min chaufför?",
    faqTwoA: "Din chaufför väntar direkt efter bagageutlämningen i ankomsthallen med en personlig skylt med ditt namn.",
    faqThreeQ: "Finns det bilbarnstolar?",
    faqThreeA: "Ja. Babyskydd, barnstolar och bälteskuddar finns tillgängliga utan extra kostnad vid förbeställning.",
    faqFourQ: "Kan golfbagar och stort bagage transporteras?",
    faqFourA: "Ja. V-Class och Vito VIP är idealiska för golfsällskap. Meddela oss om ditt bagage så planerar vi rätt fordon.",
    faqFiveQ: "Är det visade priset slutgiltigt?",
    faqFiveA: "Ja. Flygplatsavgifter, parkering, väntetid och skatter ingår. Inga dolda kostnader.",
    contactEyebrow: "Din resa börjar här",
    contactTitle: "Anländ till Antalya<br />på ett exceptionellt sätt.",
    contactBody: "Boka online på under två minuter eller prata direkt med vårt concierge-team dygnet runt.",
    whatsappUs: "WhatsApp", replyMinutes: "Svar vanligtvis inom några minuter",
    callUs: "Ring 24/7", emailUs: "Concierge e-post", replyHour: "Svar inom en timme",
    fromAirport: "Från Antalya flygplats", perVehicle: "per fordon · fast pris",
    footerTagline: "Privata chaufförstjänster längs hela Turkiska Rivieran.",
    explore: "Utforska", information: "Information",
    licensed: "Licensierad privat transferoperatör · TÜRSAB-kompatibel",
    quoteReady: "Din privata transfer", vehicle: "Fordon", journeyTime: "Restid",
    totalFixed: "Totalt pris", quoteIncludes: "Inkluderar: välkomnande, flygspårning, parkering, väntetid och mineralvatten.",
    confirmWhatsapp: "Bekräfta via WhatsApp", chatWithUs: "Chatta med oss", bookNowCta: "Boka nu",
    backToQuote: "Tillbaka", yourDetails: "Dina uppgifter", fullName: "Fullständigt namn",
    emailLabel: "E-post", phoneLabel: "Telefon / WhatsApp", flightNumber: "Flygnummer",
    flightArrivalTime: "Ankomsttid", notesLabel: "Särskilda önskemål",
    confirmBooking: "Bekräfta bokning", payLaterNote: "Säker onlinebetalning efter bekräftelse.",
    bookingConfirmed: "Bokning bekräftad", referenceLabel: "Referensnummer",
    weWillContact: "Bekräftelse skickad till din e-post. Vi kontaktar dig inom 30 minuter.",
    paymentTitle: "Säker betalning", paymentError: "Betalning misslyckades. Försök igen.",
  },
  ja: {
    navFleet: "車両", navService: "サービス", navRoutes: "ルート", navReviews: "口コミ", navContact: "お問い合わせ",
    bookNow: "今すぐ予約", alwaysAvailable: "年中無休・24時間対応",
    heroEyebrow: "プライベートショーファーサービス · アンタルヤ",
    heroTitle: "アンタルヤ空港からの<br />プレミアム送迎サービス",
    heroSubtitle: "アンタルヤ空港からベレック、シデ、ケメル、アランヤへ専属ショーファー付きプライベート送迎。",
    bookTransfer: "送迎を予約する", instantQuote: "料金を確認する", googleRated: "Google評価",
    trustedGuests: "2,500名以上のお客様にご利用いただいています", discover: "詳しく見る",
    privateJourney: "あなただけのプライベートな旅",
    quoteTitle: "目的地をお知らせください", pickup: "お迎え場所", destination: "目的地",
    date: "日付", guests: "ご利用人数", hotelAddress: "ホテル / 住所", selectDestination: "目的地を選択",
    oneGuest: "1名", twoGuests: "2名", threeGuests: "3名", fourGuests: "4名",
    fiveGuests: "5名", sixGuests: "6名", sevenGuests: "7名", viewQuote: "料金を見る",
    flightTracking: "リアルタイムフライト追跡", fixedPrice: "料金固定保証",
    meetGreet: "ミート＆グリートサービス", speakingDrivers: "英語・ドイツ語対応ショーファー",
    welcomeEyebrow: "最高水準のサービスへようこそ",
    welcomeTitle: "上質な旅を。<br />安心してご到着を。",
    welcomeBody: "着陸の瞬間から、すべての細部が整っています。ショーファーが到着ロビーでお待ちし、お荷物をお預かりして、丁寧に準備された専用車両へとご案内します。",
    ourStandards: "私たちのサービス基準", concierge: "コンシェルジュサービス", guestsWelcomed: "お迎えしたゲスト数",
    guestRating: "ゲスト平均評価", privateTransfers: "プライベート送迎", fleetEyebrow: "車両ラインナップ",
    fleetTitle: "あなただけのプライベート空間。<br />細部まで完璧に。",
    fleetIntro: "ご家族、ゴルフ用具、荷物のための十分なスペースを備えた快適な移動をお楽しみください。",
    fleetVclassClass: "ビジネス · ファーストクラス",
    fleetVclassDescription: "洗練されたグループ旅行の基準。広々とした車内、卓越した静粛性、シームレスなご到着のための装備が揃っています。",
    fleetVitoClass: "VIP · グランドツーリング",
    fleetVitoDescription: "大家族、ゴルフグループ、大量の荷物をお持ちのゲストのための広々としたプライベートキャビン。",
    signatureFleet: "シグネチャーフリート", passengers: "名", suitcases: "個のスーツケース",
    leatherSeats: "プレミアムレザーシート", wifi: "無料WiFi", water: "冷えたミネラルウォーター",
    childSeats: "チャイルドシート（ご要望に応じて）", reserveVehicle: "この車両を予約する",
    insideVclass: "V-Classインテリア",
    interiorTitle: "空港とホテルの間の<br />プライベートラウンジ。",
    serviceEyebrow: "Antalya VIPスタンダード",
    serviceTitle: "送迎以上のもの。<br />特別なお出迎え。",
    serviceIntro: "5つ星ホテルレベルのアテンション、経験豊富な地元ショーファー、空港からリゾートまでの完全な安心感。",
    trackingTitle: "フライト追跡",
    trackingBody: "フライトをリアルタイムで追跡し、追加料金なしでお迎え時間を自動的に調整します。",
    chauffeurTitle: "プロフェッショナルショーファー",
    chauffeurBody: "常に清潔感があり、思いやりがあり、地元知識と最高のサービス基準のために厳選されています。",
    greetTitle: "ミート＆グリート",
    greetBody: "ショーファーはお名前のボードを持って到着ロビーでお出迎えし、お荷物をお手伝いします。",
    supportTitle: "24/7コンシェルジュ",
    supportBody: "旅の前・中・後、いつでも電話またはWhatsAppでご対応いたします。",
    priceTitle: "料金固定",
    priceBody: "確認された料金が最終料金です。待機時間、駐車料金、フライト遅延はすべて含まれています。",
    familyTitle: "ご家族向け",
    familyBody: "年齢に合ったチャイルドシート、広々とした車内、ご家族の安心到着のための丁寧なサポート。",
    routesEyebrow: "人気のルート",
    routesTitle: "アンタルヤ空港から<br />トルコリビエラへ。",
    routesIntro: "すべての料金は車両ごと（お一人様ではありません）。無料待機時間込み。",
    golfFavourite: "ゴルファーに人気", from: "から",
    reviewsEyebrow: "お客様の声", reviewsTitle: "到着後も語り継がれる<br />サービス。",
    googleReviews: "387件のGoogle認証レビューに基づく",
    reviewOne: "「90分のフライト遅延にもかかわらず、ドライバーは待ってくれました。V-Classは完璧に清潔で心地よく冷えており、チャイルドシートも両方設置済みでした。家族が必要としていたまさにそのお出迎えでした。」",
    reviewTwo: "「最初のWhatsAppのやり取りからベレックへの到着まで、すべてが最高でした。時間通り、控えめで、とてもプロフェッショナル。ゴルフバッグも余裕で収まりました。」",
    reviewThree: "「空港タクシーではなく、ホテルのショーファーサービスのようでした。明確なコミュニケーション、完璧な車両、そして心から礼儀正しいドライバー。」",
    trustedBy: "アンタルヤの一流リゾートのゲストにご利用いただいています", processEyebrow: "シンプルに設計",
    processTitle: "安心到着のための<br />4ステップ。",
    stepOne: "目的地を選ぶ", stepOneBody: "どこへ、いつ行きたいかをお知らせください。",
    stepTwo: "車両を選ぶ", stepTwoBody: "お好みのスペースと快適さをお選びください。",
    stepThree: "予約を確定する", stepThreeBody: "固定料金で即座に確認書を受け取れます。",
    stepFour: "ショーファーと合流", stepFourBody: "ショーファーが到着ロビーでお出迎えします。",
    faqEyebrow: "よくある質問", faqTitle: "ご旅行の前に。",
    faqIntro: "アンタルヤ空港からのプライベート送迎について知っておくべきこと。",
    askQuestion: "質問する",
    faqOneQ: "フライトが遅延した場合はどうなりますか？",
    faqOneA: "すべての到着便をリアルタイムで追跡しています。お迎え時間は自動的に調整され、ショーファーは追加料金なしでお待ちします。",
    faqTwoQ: "ショーファーはどこで待っていますか？",
    faqTwoA: "ショーファーは手荷物受取所の直後の到着ロビーで、お名前のボードを持ってお待ちしています。",
    faqThreeQ: "チャイルドシートはありますか？",
    faqThreeA: "はい。乳幼児用、チャイルドシート、ジュニアシートは予約時にご要望いただければ無料でご用意します。",
    faqFourQ: "ゴルフバッグや大きな荷物は運べますか？",
    faqFourA: "はい。V-ClassとVito VIPはゴルフグループに最適です。荷物の詳細をお知らせいただければ、適切な車両をご手配します。",
    faqFiveQ: "表示された料金は確定ですか？",
    faqFiveA: "はい。空港税、駐車料金、待機時間、税金はすべて含まれています。隠れた費用はありません。",
    contactEyebrow: "旅はここから始まります",
    contactTitle: "アンタルヤへ<br />格別の到着を。",
    contactBody: "2分以内にオンライン予約、または24/7コンシェルジュチームに直接お問い合わせください。",
    whatsappUs: "WhatsApp", replyMinutes: "通常数分以内に返信",
    callUs: "24/7電話", emailUs: "コンシェルジュメール", replyHour: "1時間以内に返信",
    fromAirport: "アンタルヤ空港から", perVehicle: "車両ごと · 固定料金",
    footerTagline: "トルコリビエラ全域のプライベートショーファーサービス。",
    explore: "探索する", information: "情報",
    licensed: "認定プライベート送迎事業者 · TÜRSAB準拠",
    quoteReady: "あなたのプライベート送迎", vehicle: "車両", journeyTime: "所要時間",
    totalFixed: "合計料金", quoteIncludes: "ミート＆グリート、フライト追跡、駐車料金、待機時間、ミネラルウォーター込み。",
    confirmWhatsapp: "WhatsAppで確認する", chatWithUs: "チャットする", bookNowCta: "今すぐ予約",
    backToQuote: "戻る", yourDetails: "お客様情報", fullName: "氏名",
    emailLabel: "メールアドレス", phoneLabel: "電話 / WhatsApp", flightNumber: "フライト番号",
    flightArrivalTime: "到着時刻", notesLabel: "特別なご要望",
    confirmBooking: "予約を確定する", payLaterNote: "確認後にオンラインで安全にお支払い。",
    bookingConfirmed: "予約確定", referenceLabel: "予約番号",
    weWillContact: "確認書をメールに送信しました。30分以内にご連絡いたします。",
    paymentTitle: "安全なお支払い", paymentError: "お支払いに失敗しました。もう一度お試しください。",
  },
  ko: {
    navFleet: "차량", navService: "서비스", navRoutes: "노선", navReviews: "리뷰", navContact: "문의",
    bookNow: "지금 예약", alwaysAvailable: "연중무휴 24시간 운영",
    heroEyebrow: "프라이빗 쇼퍼 서비스 · 안탈리아",
    heroTitle: "안탈리아 공항에서<br />프리미엄 공항 픽업 서비스",
    heroSubtitle: "안탈리아 공항에서 벨렉, 시데, 케메르, 알란야까지 전담 쇼퍼와 함께하는 프라이빗 이동.",
    bookTransfer: "셔틀 예약하기", instantQuote: "요금 확인하기", googleRated: "Google 평점",
    trustedGuests: "2,500명 이상의 고객이 이용했습니다", discover: "자세히 보기",
    privateJourney: "나만의 프라이빗 여행",
    quoteTitle: "어디로 모셔다 드릴까요?", pickup: "픽업 장소", destination: "목적지",
    date: "날짜", guests: "인원", hotelAddress: "호텔 / 개인 주소", selectDestination: "목적지 선택",
    oneGuest: "1명", twoGuests: "2명", threeGuests: "3명", fourGuests: "4명",
    fiveGuests: "5명", sixGuests: "6명", sevenGuests: "7명", viewQuote: "요금 보기",
    flightTracking: "실시간 항공편 추적", fixedPrice: "고정 요금 보장",
    meetGreet: "미트 앤 그리트 서비스", speakingDrivers: "영어·독일어 가능 쇼퍼",
    welcomeEyebrow: "최고 수준의 서비스에 오신 것을 환영합니다",
    welcomeTitle: "품격 있게 이동하세요.<br />편안하게 도착하세요.",
    welcomeBody: "착륙하는 순간부터 모든 세부 사항이 준비되어 있습니다. 쇼퍼가 도착 로비에서 기다리며 수하물을 챙기고 세심하게 준비된 전용 차량으로 안내해 드립니다.",
    ourStandards: "저희 서비스 기준", concierge: "컨시어지 서비스", guestsWelcomed: "환영한 고객 수",
    guestRating: "평균 고객 평점", privateTransfers: "프라이빗 이동", fleetEyebrow: "차량 라인업",
    fleetTitle: "나만의 프라이빗 공간,<br />세부 사항까지 완벽하게.",
    fleetIntro: "가족, 골프 장비, 여행 가방을 위한 충분한 공간을 갖춘 편안한 이동을 경험하세요.",
    fleetVclassClass: "비즈니스 · 퍼스트클래스",
    fleetVclassDescription: "정교한 그룹 여행의 기준. 넓고, 탁월하게 조용하며, 원활한 도착을 위한 장비를 갖추고 있습니다.",
    fleetVitoClass: "VIP · 그랜드 투어링",
    fleetVitoDescription: "대가족, 골프 그룹, 짐이 많은 고객을 위한 넓은 프라이빗 캐빈.",
    signatureFleet: "시그니처 플릿", passengers: "명", suitcases: "개의 캐리어",
    leatherSeats: "프리미엄 가죽 시트", wifi: "무료 WiFi", water: "시원한 생수",
    childSeats: "요청 시 카시트 제공", reserveVehicle: "이 차량 예약하기",
    insideVclass: "V-Class 인테리어",
    interiorTitle: "공항과 호텔 사이의<br />프라이빗 라운지.",
    serviceEyebrow: "Antalya VIP 기준",
    serviceTitle: "단순한 이동 그 이상.<br />특별한 환영.",
    serviceIntro: "5성급 호텔 수준의 세심한 배려, 경험 풍부한 현지 쇼퍼, 공항에서 리조트까지 완전한 안심.",
    trackingTitle: "항공편 추적",
    trackingBody: "항공편을 실시간으로 추적하여 추가 비용 없이 픽업 시간을 자동으로 조정합니다.",
    chauffeurTitle: "전문 쇼퍼",
    chauffeurBody: "항상 단정하고 신중하며, 현지 지식과 최고 서비스 기준으로 선별된 전문가들입니다.",
    greetTitle: "미트 앤 그리트",
    greetBody: "쇼퍼가 이름이 적힌 팻말을 들고 도착 로비에서 환영하며 수하물을 도와드립니다.",
    supportTitle: "24/7 컨시어지",
    supportBody: "여행 전, 중, 후 언제든지 전화 또는 WhatsApp으로 담당자와 연결됩니다.",
    priceTitle: "고정 요금",
    priceBody: "확인된 요금이 최종 요금입니다. 대기 시간, 주차비, 항공편 지연이 모두 포함됩니다.",
    familyTitle: "가족을 위한",
    familyBody: "연령에 맞는 카시트, 넓은 실내, 편안한 가족 도착을 위한 세심한 도움.",
    routesEyebrow: "인기 노선",
    routesTitle: "안탈리아 공항에서<br />터키 리비에라까지.",
    routesIntro: "모든 요금은 차량 기준(1인 기준 아님)입니다. 무료 대기 시간 포함.",
    golfFavourite: "골퍼들의 인기 선택", from: "부터",
    reviewsEyebrow: "고객 후기", reviewsTitle: "도착 후에도 오래 기억되는<br />서비스.",
    googleReviews: "387건의 Google 인증 리뷰 기준",
    reviewOne: "\"90분 지연에도 불구하고 기사님이 기다려 주셨습니다. V-Class는 완벽하게 청결하고 시원했으며 카시트 두 개도 이미 설치되어 있었습니다. 저희 가족에게 꼭 필요한 환영이었습니다.\"",
    reviewTwo: "\"첫 WhatsApp 연락부터 벨렉 도착까지 모든 것이 최고였습니다. 시간 엄수, 세심함, 매우 전문적. 골프백도 여유롭게 들어갔습니다.\"",
    reviewThree: "\"공항 택시가 아닌 호텔 쇼퍼 서비스 같았습니다. 명확한 소통, 완벽한 차량, 진심으로 예의 바른 기사님.\"",
    trustedBy: "안탈리아 주요 리조트 고객들이 선택했습니다", processEyebrow: "의도적으로 간단하게",
    processTitle: "편안한 도착을 위한<br />4단계.",
    stepOne: "목적지 선택", stepOneBody: "어디로, 언제 이동하고 싶은지 알려주세요.",
    stepTwo: "차량 선택", stepTwoBody: "적합한 공간과 편의를 선택하세요.",
    stepThree: "예약 확정", stepThreeBody: "고정 요금으로 즉시 확인서를 받으세요.",
    stepFour: "쇼퍼 만나기", stepFourBody: "쇼퍼가 도착 로비에서 환영합니다.",
    faqEyebrow: "자주 묻는 질문", faqTitle: "여행 전에.",
    faqIntro: "안탈리아 공항 프라이빗 픽업에 대해 알아야 할 모든 것.",
    askQuestion: "질문하기",
    faqOneQ: "항공편이 지연되면 어떻게 되나요?",
    faqOneA: "모든 도착 항공편을 실시간으로 추적합니다. 픽업 시간은 자동으로 조정되며 쇼퍼는 추가 비용 없이 기다립니다.",
    faqTwoQ: "기사님은 어디에서 기다리시나요?",
    faqTwoA: "쇼퍼는 수하물 수취 바로 다음 도착 로비에서 이름이 적힌 팻말을 들고 기다립니다.",
    faqThreeQ: "카시트를 이용할 수 있나요?",
    faqThreeA: "네. 신생아용 카시트, 아동용 카시트, 부스터 시트는 예약 시 요청하시면 무료로 제공됩니다.",
    faqFourQ: "골프백과 대형 수하물도 운반할 수 있나요?",
    faqFourA: "네. V-Class와 Vito VIP는 골프 그룹에 이상적입니다. 수하물 정보를 알려주시면 적합한 차량을 준비합니다.",
    faqFiveQ: "표시된 요금이 최종 요금인가요?",
    faqFiveA: "네. 공항 세금, 주차비, 대기 시간, 세금이 모두 포함됩니다. 숨겨진 비용이 없습니다.",
    contactEyebrow: "여행은 여기서 시작됩니다",
    contactTitle: "안탈리아에<br />특별하게 도착하세요.",
    contactBody: "2분 이내에 온라인 예약하거나 24/7 컨시어지 팀에 직접 문의하세요.",
    whatsappUs: "WhatsApp", replyMinutes: "보통 몇 분 내로 답변",
    callUs: "24/7 전화", emailUs: "컨시어지 이메일", replyHour: "1시간 내 답변",
    fromAirport: "안탈리아 공항에서", perVehicle: "차량 기준 · 고정 요금",
    footerTagline: "터키 리비에라 전역의 프라이빗 쇼퍼 서비스.",
    explore: "탐색", information: "정보",
    licensed: "인증된 프라이빗 이동 사업자 · TÜRSAB 준수",
    quoteReady: "나의 프라이빗 이동", vehicle: "차량", journeyTime: "소요 시간",
    totalFixed: "총 요금", quoteIncludes: "미트 앤 그리트, 항공편 추적, 주차비, 대기 시간, 생수 포함.",
    confirmWhatsapp: "WhatsApp으로 확인하기", chatWithUs: "채팅하기", bookNowCta: "지금 예약",
    backToQuote: "뒤로", yourDetails: "고객 정보", fullName: "성명",
    emailLabel: "이메일", phoneLabel: "전화 / WhatsApp", flightNumber: "항공편 번호",
    flightArrivalTime: "도착 시간", notesLabel: "특별 요청",
    confirmBooking: "예약 확정하기", payLaterNote: "확인 후 안전하게 온라인 결제.",
    bookingConfirmed: "예약 확정", referenceLabel: "예약 번호",
    weWillContact: "이메일로 확인서를 보냈습니다. 30분 내로 연락드리겠습니다.",
    paymentTitle: "안전한 결제", paymentError: "결제에 실패했습니다. 다시 시도해 주세요.",
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

let currentQuoteData = {};

const priceDisplay = document.querySelector("#booking-price-display");

const updateInlinePrice = (routeKey) => {
  const route = routeData[routeKey];
  if (!route || !priceDisplay) return;
  priceDisplay.innerHTML = `
    <span class="price-display-route">AYT → ${route.name}</span>
    <strong class="price-display-amount">€${route.price}</strong>
    <span class="price-display-note">fixed · per vehicle</span>
  `;
  priceDisplay.classList.add("visible");
  currentQuoteData = {
    pickup: document.querySelector("#pickup").value === "Antalya Airport (AYT)" ? "airport" : "hotel",
    destination: routeKey,
    price: route.price,
  };
};

destinationSelect.addEventListener("change", () => {
  if (destinationSelect.value) updateInlinePrice(destinationSelect.value);
});

const openConfirmation = () => {
  quoteModal.classList.add("open");
  quoteModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  quoteModal.querySelector(".modal-close").focus();
};

const closeConfirmation = () => {
  quoteModal.classList.remove("open");
  quoteModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

document.querySelector("#quote-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!destinationSelect.value) {
    destinationSelect.focus();
    return;
  }

  const name = document.querySelector("#customer-name").value.trim();
  const phone = document.querySelector("#customer-phone").value.trim();
  if (!name) { document.querySelector("#customer-name").focus(); return; }
  if (!phone) { document.querySelector("#customer-phone").focus(); return; }

  const submitBtn = document.querySelector("#main-book-submit");
  submitBtn.disabled = true;
  const originalText = submitBtn.querySelector("span").textContent;
  submitBtn.querySelector("span").textContent = "…";

  if (!currentQuoteData.destination) {
    currentQuoteData = {
      pickup: document.querySelector("#pickup").value === "Antalya Airport (AYT)" ? "airport" : "hotel",
      destination: destinationSelect.value,
      price: routeData[destinationSelect.value]?.price || 0,
    };
  }

  try {
    const booking = await createBooking({
      customer_name: name,
      customer_email: "",
      customer_phone: phone,
      flight_number: document.querySelector("#flight-number").value.trim() || null,
      flight_arrival_time: document.querySelector("#flight-arrival-time").value || null,
      notes: null,
      pickup_location: currentQuoteData.pickup || "airport",
      dropoff_location: currentQuoteData.destination || "",
      pickup_date: document.querySelector("#travel-date").value,
      guests: parseInt(document.querySelector("#guests").value, 10),
      vehicle_type: "vclass",
      price_eur: currentQuoteData.price || 0,
      language: document.documentElement.lang || "en",
    });

    document.querySelector("#confirmed-ref").textContent = booking.booking_ref;
    openConfirmation();
    event.target.reset();
    if (priceDisplay) priceDisplay.classList.remove("visible");
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

document.querySelectorAll(".route-card").forEach((card) => {
  card.querySelector("button").addEventListener("click", () => {
    destinationSelect.value = card.dataset.route;
    updateInlinePrice(card.dataset.route);
    document.querySelector("#booking").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.querySelector("#customer-name").focus(), 600);
  });
});

document.querySelectorAll(".price-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    destinationSelect.value = pill.dataset.route;
    updateInlinePrice(pill.dataset.route);
    document.querySelector("#booking").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.querySelector("#customer-name").focus(), 600);
  });
});

quoteModal.querySelector(".modal-close").addEventListener("click", closeConfirmation);
quoteModal.querySelector(".modal-backdrop").addEventListener("click", closeConfirmation);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeConfirmation();
    closeMenu();
  }
});

const LANG_FLAGS = {
  en: "🇬🇧", de: "🇩🇪", tr: "🇹🇷", ru: "🇷🇺",
  pl: "🇵🇱", nl: "🇳🇱", uk: "🇺🇦", fr: "🇫🇷",
  sv: "🇸🇪", ja: "🇯🇵", ko: "🇰🇷",
};

const langDropdown = document.getElementById("lang-dropdown");
const langTrigger = langDropdown?.querySelector(".lang-trigger");
const langFlagEl = langDropdown?.querySelector(".lang-flag-current");

const closeLangDropdown = () => {
  langDropdown?.classList.remove("open");
  langTrigger?.setAttribute("aria-expanded", "false");
};

langTrigger?.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = langDropdown.classList.toggle("open");
  langTrigger.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", (e) => {
  if (langDropdown && !langDropdown.contains(e.target)) closeLangDropdown();
});

const applyLanguage = (language) => {
  const supportedLanguage = (translations[language] || language === "en") ? language : "en";
  document.documentElement.lang = supportedLanguage;

  if (langFlagEl) langFlagEl.textContent = LANG_FLAGS[supportedLanguage] || "🌐";

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
  } catch {}
};

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.language);
    closeLangDropdown();
    if (mobileMenu.classList.contains("open")) closeMenu();
  });
});

const SUPPORTED_LANGS = ["en", "de", "tr", "ru", "pl", "nl", "uk", "fr", "sv", "ja", "ko"];

function detectBrowserLanguage() {
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language || "en"];
  for (const l of langs) {
    const code = l.split("-")[0].toLowerCase();
    if (SUPPORTED_LANGS.includes(code)) return code;
  }
  return "en";
}

let savedLanguage = "en";
try {
  savedLanguage = localStorage.getItem("avl-language") || detectBrowserLanguage();
} catch {
  savedLanguage = detectBrowserLanguage();
}
applyLanguage(savedLanguage);

// Handle redirect return (e.g. post-payment)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("booking_ref")) {
  document.querySelector("#confirmed-ref").textContent = urlParams.get("booking_ref");
  openConfirmation();
  window.history.replaceState({}, "", window.location.pathname);
}

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
