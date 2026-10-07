import { locationLabel, navigationURLs } from "./turkish-formatters.js";

// Shared transfer start-time rule used by the React timeline and detail views.
function transferStartTime(pickupLocation, pickupTime, flightArrivalTime) {
  if (pickupLocation === "airport") return flightArrivalTime || pickupTime;
  return pickupTime;
}

// Postgres `time` columns arrive as HH:MM:SS; trim to HH:MM for the message.
function fmtTime(t) {
  return t ? String(t).slice(0, 5) : "—";
}

function fmtPrice(value) {
  const price = Number(value);
  if (!Number.isFinite(price)) return "0";
  return Number.isInteger(price)
    ? String(price)
    : price.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

const VEHICLE_LABELS = {
  vclass: "Mercedes V-Class",
  vito: "Mercedes Vito",
};

function vehicleLabel(type) {
  return VEHICLE_LABELS[type] ?? type;
}

// Per-language dictionaries for customer-facing WhatsApp messages.
// Values: labels and natural sentences for a VIP airport transfer service in Antalya.
const LANG = {
  en: {
    confirmGreeting: (name) =>
      `Dear ${name},\n\n✅ Your Antalya VIP transfer is confirmed. Here are the details:`,
    confirmClosing:
      "We'll be ready at the agreed time. If anything changes or you have a question, just message us. Have a good trip! 🚗",
    reminderGreeting: (name) =>
      `Dear ${name},\n\n🚙 A quick reminder about your upcoming transfer:`,
    reminderClosing:
      "Your driver will be there on time. If you need anything, we're one message away. 🌟",
    receivedGreeting: (name) =>
      `Dear ${name},\n\n✨ Thank you for your booking with Antalya VIP Tourism. We've received it and are reviewing the details.`,
    receivedClosing:
      "We'll get back to you shortly to confirm. 🎯",
    meetGreetGreeting: (name) =>
      `Dear ${name},\n\n✈️ Welcome to Antalya! Here are your Meet & Greet details:`,
    meetGreetClosing:
      "Our team will meet you at meeting point J / 777 with a name board. If you'd rather skip the wait inside, exit the terminal and meet us in front of Burger King — it's usually faster. Safe travels! 🌟",
    reviewGreeting: (name) =>
      `Dear ${name},\n\n🌟 Thank you for traveling with Antalya VIP Tourism. We hope everything went smoothly.`,
    reviewClosing:
      "If you have a moment, we'd appreciate a short review on Google — it really helps us. 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
    flightCheckGreeting: (name) =>
      `Dear ${name},\n\n✈️ A quick check about your transfer — we could not confirm your flight in the airline schedule:`,
    flightCheckNotFound: "We could not find this flight number for your travel date. Could you double-check it and send us the correct one? Without it we cannot follow your landing time, and your driver may not be waiting when you arrive.",
    flightCheckWrongAirport: "This flight does not appear to land at Antalya (AYT). If you are arriving at a different airport, or the flight number belongs to another leg of your journey, please let us know so we can plan the pick-up correctly.",
    flightCheckClosing: "Just reply with the flight number and we will take care of the rest. 🙏",
    flightCheckLabelDate: "Travel date",
    faqNote: "📖 Please read our FAQ before your trip:",
    faqTopicArrival: "Airport pickup — how it works",
    faqTopicReturn: "Return transfer — how we stay in touch",
    faqTopicPayment: "Payment & price",
    faqTopicDaily: "Your journey & extra stops",
    faqTopicGeneral: "All frequently asked questions",
    airportNote:
      "⚠️ *Important:* The moment you land in Antalya, please connect to the internet — the airport's free Wi-Fi, roaming or an eSIM all work — and send us a short WhatsApp message to let us know you have arrived. It is the one thing we ask of you: with that message we brief your chauffeur straight away and can reach you immediately if anything comes up. Please keep your phone switched on and WhatsApp reachable until you are in the vehicle.",
    labelRef: "Reference",
    labelDate: "Date",
    labelPickupTime: "Pickup time",
    labelRoute: "Route",
    labelVehicle: "Vehicle",
    labelGuests: "Guests",
    labelPrice: "Price",
    labelTransfer: "Transfer",
    labelOutbound: "Outbound transfer",
    labelReturn: "Return transfer",
    labelPickup: "Pickup location",
    labelDropoff: "Drop-off location",
    labelFlight: "Flight",
    labelFlightDeparture: "Departure",
    labelLuggage: "Luggage",
    labelChildSeats: "Child seats",
    labelGolfBags: "Golf bags",
    labelStrollers: "Strollers",
    labelDriver: "Driver",
    labelPlate: "Plate",
    labelDailyHire: "Daily vehicle + chauffeur",
    labelPeriod: "Service period",
    labelDailyRate: "Daily rate",
    labelTotal: "Total service price",
    labelFuel: "Fuel",
    fuelExcluded:
      "Not included; paid separately by the customer according to use",
    labelArrivalFlight: "Arrival flight",
    labelDepartureFlight: "Departure flight",
  },
  de: {
    confirmGreeting: (name) =>
      `Hallo ${name},\n\n✅ Ihr Antalya VIP-Transfer ist bestätigt. Hier die Details:`,
    confirmClosing:
      "Wir sind zur vereinbarten Zeit bereit. Bei Fragen oder Änderungen schreiben Sie uns einfach. Gute Reise! 🚗",
    reminderGreeting: (name) =>
      `Hallo ${name},\n\n🚙 Eine kurze Erinnerung an Ihren bevorstehenden Transfer:`,
    reminderClosing:
      "Ihr Fahrer ist pünktlich vor Ort. Bei Fragen sind wir für Sie da. 🌟",
    receivedGreeting: (name) =>
      `Hallo ${name},\n\n✨ Vielen Dank für Ihre Buchung bei Antalya VIP Tourism. Wir haben sie erhalten und prüfen die Details.`,
    receivedClosing:
      "Wir melden uns in Kürze zur Bestätigung. 🎯",
    meetGreetGreeting: (name) =>
      `Hallo ${name},\n\n✈️ Willkommen in Antalya! Hier Ihre Meet & Greet-Details:`,
    meetGreetClosing:
      "Unser Team erwartet Sie am Treffpunkt J / 777 mit einem Namensschild. Wenn Sie das Warten drinnen vermeiden möchten, verlassen Sie das Terminal und treffen Sie uns vor dem Burger King — meist geht es dort schneller. Gute Reise! 🌟",
    reviewGreeting: (name) =>
      `Hallo ${name},\n\n🌟 Danke, dass Sie mit Antalya VIP Tourism gefahren sind. Wir hoffen, alles ist gut verlaufen.`,
    reviewClosing:
      "Wenn Sie einen Moment haben, freuen wir uns über eine kurze Google-Bewertung — das hilft uns sehr. 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
    flightCheckGreeting: (name) =>
      `Guten Tag ${name},\n\n✈️ Eine kurze Rückfrage zu Ihrem Transfer — wir konnten Ihren Flug im Flugplan nicht bestätigen:`,
    flightCheckNotFound: "Diese Flugnummer konnten wir für Ihr Reisedatum nicht finden. Könnten Sie sie bitte prüfen und uns die richtige senden? Ohne sie können wir Ihre Landezeit nicht verfolgen und Ihr Fahrer wartet möglicherweise nicht rechtzeitig.",
    flightCheckWrongAirport: "Dieser Flug scheint nicht in Antalya (AYT) zu landen. Falls Sie an einem anderen Flughafen ankommen oder die Flugnummer zu einem anderen Reiseabschnitt gehört, sagen Sie uns bitte Bescheid, damit wir die Abholung richtig planen.",
    flightCheckClosing: "Antworten Sie einfach mit der Flugnummer, um den Rest kümmern wir uns. 🙏",
    flightCheckLabelDate: "Reisedatum",
    faqNote: "📖 Bitte lesen Sie vor Ihrer Reise unsere FAQ:",
    faqTopicArrival: "Flughafen-Abholung — so läuft es ab",
    faqTopicReturn: "Rücktransfer — so bleiben wir in Kontakt",
    faqTopicPayment: "Zahlung & Preis",
    faqTopicDaily: "Ihre Fahrt & Zwischenstopps",
    faqTopicGeneral: "Alle häufigen Fragen",
    airportNote:
      "⚠️ *Wichtig:* Sobald Sie in Antalya gelandet sind, gehen Sie bitte online — das kostenlose WLAN des Flughafens, Roaming oder eine eSIM genügen — und schreiben Sie uns eine kurze WhatsApp-Nachricht, dass Sie angekommen sind. Das ist das Einzige, worum wir Sie bitten: Mit dieser Nachricht informieren wir sofort Ihren Fahrer und können Sie umgehend erreichen, falls etwas dazwischenkommt. Bitte lassen Sie Ihr Telefon eingeschaltet und bleiben Sie über WhatsApp erreichbar, bis Sie im Fahrzeug sitzen.",
    labelRef: "Referenz",
    labelDate: "Datum",
    labelPickupTime: "Abholzeit",
    labelRoute: "Strecke",
    labelVehicle: "Fahrzeug",
    labelGuests: "Gäste",
    labelPrice: "Preis",
    labelTransfer: "Transfer",
    labelOutbound: "Hintransfer",
    labelReturn: "Rücktransfer",
    labelPickup: "Abholort",
    labelDropoff: "Zielort",
    labelFlight: "Flug",
    labelFlightDeparture: "Abflug",
    labelLuggage: "Gepäck",
    labelChildSeats: "Kindersitze",
    labelGolfBags: "Golftaschen",
    labelStrollers: "Kinderwagen",
    labelDriver: "Fahrer",
    labelPlate: "Kennzeichen",
  },
  ru: {
    confirmGreeting: (name) =>
      `Здравствуйте, ${name}!\n\n✅ Ваш трансфер Antalya VIP подтверждён. Детали ниже:`,
    confirmClosing:
      "Мы будем готовы в назначенное время. Если появятся вопросы или изменения — просто напишите нам. Хорошей поездки! 🚗",
    reminderGreeting: (name) =>
      `Здравствуйте, ${name}!\n\n🚙 Короткое напоминание о вашем предстоящем трансфере:`,
    reminderClosing:
      "Водитель подъедет вовремя. Если что-то понадобится — мы на связи. 🌟",
    receivedGreeting: (name) =>
      `Здравствуйте, ${name}!\n\n✨ Спасибо за бронирование в Antalya VIP Tourism. Мы получили заявку и проверяем детали.`,
    receivedClosing:
      "Скоро свяжемся с вами для подтверждения. 🎯",
    meetGreetGreeting: (name) =>
      `Здравствуйте, ${name}!\n\n✈️ Добро пожаловать в Анталью! Детали встречи Meet & Greet:`,
    meetGreetClosing:
      "Наша команда встретит вас в точке J / 777 с табличкой с вашим именем. Если не хотите ждать внутри, выходите из терминала и встретимся у Burger King — обычно так быстрее. Хорошей поездки! 🌟",
    reviewGreeting: (name) =>
      `Здравствуйте, ${name}!\n\n🌟 Спасибо, что выбрали Antalya VIP Tourism. Надеемся, всё прошло хорошо.`,
    reviewClosing:
      "Если найдётся минутка, будем благодарны за короткий отзыв на Google — это очень помогает нам. 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
    flightCheckGreeting: (name) =>
      `Здравствуйте, ${name}!\n\n✈️ Небольшой вопрос по вашему трансферу — мы не смогли подтвердить ваш рейс в расписании:`,
    flightCheckNotFound: "Мы не нашли этот номер рейса на дату вашей поездки. Пожалуйста, проверьте его и пришлите правильный. Без него мы не сможем отслеживать время прилёта, и водитель может не успеть вас встретить.",
    flightCheckWrongAirport: "Похоже, этот рейс прилетает не в Анталью (AYT). Если вы прилетаете в другой аэропорт или номер рейса относится к другому участку поездки, сообщите нам, чтобы мы правильно спланировали встречу.",
    flightCheckClosing: "Просто ответьте номером рейса — остальное мы сделаем сами. 🙏",
    flightCheckLabelDate: "Дата поездки",
    faqNote: "📖 Перед поездкой ознакомьтесь с нашими вопросами и ответами:",
    faqTopicArrival: "Встреча в аэропорту — как это происходит",
    faqTopicReturn: "Обратный трансфер — как мы остаёмся на связи",
    faqTopicPayment: "Оплата и стоимость",
    faqTopicDaily: "Поездка и дополнительные остановки",
    faqTopicGeneral: "Все частые вопросы",
    airportNote:
      "⚠️ *Важно:* Сразу после посадки в Анталье, пожалуйста, подключитесь к интернету — подойдёт бесплатный Wi-Fi аэропорта, роуминг или eSIM — и отправьте нам короткое сообщение в WhatsApp о том, что вы прилетели. Это единственное, о чём мы вас просим: получив его, мы сразу предупредим вашего водителя и сможем немедленно связаться с вами, если что-то пойдёт не по плану. Пожалуйста, держите телефон включённым и оставайтесь на связи в WhatsApp, пока не сядете в автомобиль.",
    labelRef: "Номер брони",
    labelDate: "Дата",
    labelPickupTime: "Время подачи",
    labelRoute: "Маршрут",
    labelVehicle: "Автомобиль",
    labelGuests: "Гостей",
    labelPrice: "Стоимость",
    labelTransfer: "Трансфер",
    labelOutbound: "Трансфер туда",
    labelReturn: "Обратный трансфер",
    labelPickup: "Место подачи",
    labelDropoff: "Место назначения",
    labelFlight: "Рейс",
    labelFlightDeparture: "Вылет",
    labelLuggage: "Багаж",
    labelChildSeats: "Детские кресла",
    labelGolfBags: "Сумки для гольфа",
    labelStrollers: "Детские коляски",
    labelDriver: "Водитель",
    labelPlate: "Номер машины",
  },
  tr: {
    confirmGreeting: (name) =>
      `Merhaba ${name},\n\n✅ Antalya VIP transferiniz onaylandı. Detaylar aşağıda:`,
    confirmClosing:
      "Belirlenen saatte hazır olacağız. Sorunuz veya bir değişiklik olursa bize yazmanız yeterli. İyi yolculuklar! 🚗",
    reminderGreeting: (name) =>
      `Merhaba ${name},\n\n🚙 Yaklaşan transferiniz için kısa bir hatırlatma:`,
    reminderClosing:
      "Sürücünüz zamanında yanınızda olacak. İhtiyacınız olursa bize ulaşabilirsiniz. 🌟",
    receivedGreeting: (name) =>
      `Merhaba ${name},\n\n✨ Antalya VIP Tourism'i tercih ettiğiniz için teşekkürler. Rezervasyonunuzu aldık, detayları kontrol ediyoruz.`,
    receivedClosing:
      "Onay için kısa süre içinde size döneceğiz. 🎯",
    meetGreetGreeting: (name) =>
      `Merhaba ${name},\n\n✈️ Antalya'ya hoş geldiniz! Karşılama (Meet & Greet) detaylarınız:`,
    meetGreetClosing:
      "Ekibimiz J / 777 buluşma noktasında isim tabelasıyla sizi karşılayacak. İçeride beklemek istemezseniz terminalden çıkıp Burger King önünde buluşabiliriz — genelde daha hızlı oluyor. İyi yolculuklar! 🌟",
    reviewGreeting: (name) =>
      `Merhaba ${name},\n\n🌟 Antalya VIP Tourism ile seyahat ettiğiniz için teşekkürler. Umarız her şey yolunda gitmiştir.`,
    reviewClosing:
      "Bir dakikanız olursa, Google'da bırakacağınız kısa bir değerlendirme bize çok yardımcı olur. 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
    flightCheckGreeting: (name) =>
      `Sayın ${name},\n\n✈️ Transferinizle ilgili küçük bir kontrol — uçuşunuzu tarifede doğrulayamadık:`,
    flightCheckNotFound: "Bu uçuş numarasını seyahat tarihinizde bulamadık. Kontrol edip doğrusunu iletebilir misiniz? Aksi halde iniş saatinizi takip edemeyiz ve şoförünüz sizi zamanında karşılayamayabilir.",
    flightCheckWrongAirport: "Bu uçuş Antalya'ya (AYT) inmiyor görünüyor. Farklı bir havalimanına iniyorsanız ya da uçuş numarası seyahatinizin başka bir bacağına aitse lütfen bize bildirin; karşılamayı ona göre planlayalım.",
    flightCheckClosing: "Uçuş numarasını yazmanız yeterli, gerisini biz hallederiz. 🙏",
    flightCheckLabelDate: "Seyahat tarihi",
    faqNote: "📖 Seyahatinizden önce lütfen SSS bölümümüzü okuyun:",
    faqTopicArrival: "Havalimanı karşılama — nasıl işliyor",
    faqTopicReturn: "Dönüş transferi — nasıl iletişimde kalıyoruz",
    faqTopicPayment: "Ödeme ve fiyat",
    faqTopicDaily: "Yolculuk ve ara duraklar",
    faqTopicGeneral: "Tüm sık sorulan sorular",
    airportNote:
      "⚠️ *Önemli:* Antalya'ya iner inmez lütfen internete bağlanın — havalimanının ücretsiz Wi-Fi ağı, roaming ya da eSIM, hepsi işinizi görür — ve WhatsApp'tan kısa bir mesajla indiğinizi bize bildirin. Sizden tek ricamız bu: bu mesajla şoförünüzü hemen yönlendirir, bir aksilik olursa size anında ulaşırız. Lütfen aracınıza binene kadar telefonunuz açık ve WhatsApp'tan ulaşılabilir olsun.",
    labelRef: "Rezervasyon No",
    labelDate: "Tarih",
    labelPickupTime: "Alış saati",
    labelRoute: "Güzergah",
    labelVehicle: "Araç",
    labelGuests: "Misafir",
    labelPrice: "Fiyat",
    labelTransfer: "Transfer",
    labelOutbound: "Gidiş transferi",
    labelReturn: "Dönüş transferi",
    labelPickup: "Alış konumu",
    labelDropoff: "Varış konumu",
    labelFlight: "Uçuş",
    labelFlightDeparture: "Kalkış",
    labelLuggage: "Bagaj",
    labelChildSeats: "Çocuk koltuğu",
    labelGolfBags: "Golf çantası",
    labelStrollers: "Bebek arabası",
    labelDriver: "Sürücü",
    labelPlate: "Plaka",
    labelDailyHire: "Günlük araç + şoför",
    labelPeriod: "Hizmet dönemi",
    labelDailyRate: "Günlük ücret",
    labelTotal: "Toplam hizmet bedeli",
    labelFuel: "Yakıt",
    fuelExcluded: "Dahil değildir; müşteri kullanıma göre ayrıca öder",
    labelArrivalFlight: "Geliş uçuşu",
    labelDepartureFlight: "Dönüş uçuşu",
  },
  fr: {
    confirmGreeting: (name) =>
      `Bonjour ${name},\n\n✅ Votre transfert Antalya VIP est confirmé. Voici les détails :`,
    confirmClosing:
      "Nous serons prêts à l'heure convenue. Pour toute question ou changement, écrivez-nous. Bon voyage ! 🚗",
    reminderGreeting: (name) =>
      `Bonjour ${name},\n\n🚙 Un petit rappel concernant votre transfert à venir :`,
    reminderClosing:
      "Votre chauffeur sera là à l'heure. N'hésitez pas à nous contacter si besoin. 🌟",
    receivedGreeting: (name) =>
      `Bonjour ${name},\n\n✨ Merci pour votre réservation chez Antalya VIP Tourism. Nous l'avons bien reçue et vérifions les détails.`,
    receivedClosing:
      "Nous revenons vers vous très vite pour la confirmation. 🎯",
    meetGreetGreeting: (name) =>
      `Bonjour ${name},\n\n✈️ Bienvenue à Antalya ! Voici les détails de votre accueil Meet & Greet :`,
    meetGreetClosing:
      "Notre équipe vous attendra au point de rencontre J / 777 avec un panneau à votre nom. Si vous préférez ne pas attendre à l'intérieur, sortez du terminal et retrouvez-nous devant le Burger King — c'est généralement plus rapide. Bon voyage ! 🌟",
    reviewGreeting: (name) =>
      `Bonjour ${name},\n\n🌟 Merci d'avoir voyagé avec Antalya VIP Tourism. Nous espérons que tout s'est bien passé.`,
    reviewClosing:
      "Si vous avez un instant, un court avis sur Google nous aiderait beaucoup. 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
    flightCheckGreeting: (name) =>
      `Bonjour ${name},\n\n✈️ Une petite vérification concernant votre transfert — nous n'avons pas pu confirmer votre vol dans les horaires :`,
    flightCheckNotFound: "Nous n'avons pas trouvé ce numéro de vol pour votre date de voyage. Pourriez-vous le vérifier et nous envoyer le bon ? Sans lui, nous ne pouvons pas suivre votre heure d'atterrissage et votre chauffeur risque de ne pas vous attendre.",
    flightCheckWrongAirport: "Ce vol ne semble pas atterrir à Antalya (AYT). Si vous arrivez dans un autre aéroport, ou si le numéro de vol correspond à une autre étape de votre voyage, dites-le nous afin que nous organisions correctement la prise en charge.",
    flightCheckClosing: "Répondez simplement avec le numéro de vol, nous nous occupons du reste. 🙏",
    flightCheckLabelDate: "Date du voyage",
    faqNote: "📖 Avant votre voyage, veuillez lire notre FAQ :",
    faqTopicArrival: "Accueil à l'aéroport — comment ça se passe",
    faqTopicReturn: "Transfert retour — comment nous restons en contact",
    faqTopicPayment: "Paiement et prix",
    faqTopicDaily: "Votre trajet et les arrêts",
    faqTopicGeneral: "Toutes les questions fréquentes",
    airportNote:
      "⚠️ *Important :* Dès votre atterrissage à Antalya, connectez-vous à internet — le Wi-Fi gratuit de l'aéroport, l'itinérance ou une eSIM conviennent — et envoyez-nous un court message WhatsApp pour nous signaler votre arrivée. C'est la seule chose que nous vous demandons : grâce à ce message, nous prévenons immédiatement votre chauffeur et pouvons vous joindre sans délai en cas d'imprévu. Merci de garder votre téléphone allumé et de rester joignable sur WhatsApp jusqu'à votre montée dans le véhicule.",
    labelRef: "Référence",
    labelDate: "Date",
    labelPickupTime: "Heure de prise en charge",
    labelRoute: "Itinéraire",
    labelVehicle: "Véhicule",
    labelGuests: "Passagers",
    labelPrice: "Prix",
    labelTransfer: "Transfert",
    labelOutbound: "Transfert aller",
    labelReturn: "Transfert retour",
    labelPickup: "Lieu de prise en charge",
    labelDropoff: "Lieu de destination",
    labelFlight: "Vol",
    labelFlightDeparture: "Décollage",
    labelLuggage: "Bagages",
    labelChildSeats: "Sièges enfant",
    labelGolfBags: "Sacs de golf",
    labelStrollers: "Poussettes",
    labelDriver: "Conducteur",
    labelPlate: "Plaque",
  },
  ar: {
    confirmGreeting: (name) =>
      `مرحباً ${name}،\n\n✅ تم تأكيد خدمة النقل Antalya VIP الخاصة بك. التفاصيل أدناه:`,
    confirmClosing:
      "سنكون جاهزين في الوقت المحدد. لأي سؤال أو تغيير، راسلنا فقط. رحلة سعيدة! 🚗",
    reminderGreeting: (name) =>
      `مرحباً ${name}،\n\n🚙 تذكير بسيط بخصوص رحلة النقل القادمة:`,
    reminderClosing:
      "سيكون سائقك في الموعد المحدد. نحن متاحون إن احتجت أي شيء. 🌟",
    receivedGreeting: (name) =>
      `مرحباً ${name}،\n\n✨ شكراً لحجزك مع Antalya VIP Tourism. لقد استلمنا الحجز ونراجع التفاصيل.`,
    receivedClosing:
      "سنعود إليك قريباً للتأكيد. 🎯",
    meetGreetGreeting: (name) =>
      `مرحباً ${name}،\n\n✈️ أهلاً بك في أنطاليا! تفاصيل الاستقبال Meet & Greet:`,
    meetGreetClosing:
      "سيستقبلك فريقنا عند نقطة اللقاء J / 777 بلافتة تحمل اسمك. إذا كنت تفضل عدم الانتظار بالداخل، يمكنك الخروج من الصالة ومقابلتنا أمام مطعم Burger King — عادةً ما يكون أسرع. رحلة موفقة! 🌟",
    reviewGreeting: (name) =>
      `مرحباً ${name}،\n\n🌟 شكراً لسفرك مع Antalya VIP Tourism. نأمل أن يكون كل شيء قد سار على ما يرام.`,
    reviewClosing:
      "إن توفّرت لديك لحظة، سنكون ممتنين لتقييم قصير على Google — فهذا يساعدنا كثيراً. 👇\n\nhttps://g.page/r/CbJCg7BC63cBEBI/review",
    flightCheckGreeting: (name) =>
      `عزيزي ${name}،\n\n✈️ استفسار سريع بخصوص نقلك — لم نتمكن من تأكيد رحلتك في جدول الرحلات:`,
    flightCheckNotFound: "لم نعثر على رقم الرحلة هذا في تاريخ سفرك. هل يمكنك التحقق منه وإرسال الرقم الصحيح؟ بدونه لا يمكننا متابعة وقت هبوطك وقد لا يكون السائق في انتظارك.",
    flightCheckWrongAirport: "يبدو أن هذه الرحلة لا تهبط في أنطاليا (AYT). إذا كنت تصل إلى مطار آخر أو كان رقم الرحلة يخص جزءاً آخر من سفرك، فأخبرنا لنخطط لاستقبالك بشكل صحيح.",
    flightCheckClosing: "فقط أرسل لنا رقم الرحلة وسنتكفل بالباقي. 🙏",
    flightCheckLabelDate: "تاريخ السفر",
    faqNote: "📖 قبل رحلتك، يُرجى قراءة الأسئلة الشائعة لدينا:",
    faqTopicArrival: "الاستقبال في المطار — كيف تتم العملية",
    faqTopicReturn: "رحلة العودة — كيف نبقى على تواصل",
    faqTopicPayment: "الدفع والسعر",
    faqTopicDaily: "رحلتك والتوقفات الإضافية",
    faqTopicGeneral: "كل الأسئلة الشائعة",
    airportNote:
      "⚠️ *مهم:* فور هبوطكم في أنطاليا، يُرجى الاتصال بالإنترنت — شبكة الواي فاي المجانية في المطار أو التجوال أو شريحة eSIM، جميعها تفي بالغرض — وإرسال رسالة قصيرة عبر واتساب تخبروننا فيها بوصولكم. هذا هو الشيء الوحيد الذي نطلبه منكم: بهذه الرسالة نُبلغ سائقكم على الفور، ويمكننا الوصول إليكم فورًا إذا استجدّ أي أمر. نرجو إبقاء هاتفكم مفتوحًا والبقاء متاحين على واتساب حتى ركوبكم السيارة.",
    labelRef: "رقم الحجز",
    labelDate: "التاريخ",
    labelPickupTime: "وقت الاستقبال",
    labelRoute: "المسار",
    labelVehicle: "السيارة",
    labelGuests: "الركاب",
    labelPrice: "السعر",
    labelTransfer: "خدمة النقل",
    labelOutbound: "رحلة الذهاب",
    labelReturn: "رحلة العودة",
    labelPickup: "موقع الاستقبال",
    labelDropoff: "موقع الوصول",
    labelFlight: "الرحلة الجوية",
    labelFlightDeparture: "الإقلاع",
    labelLuggage: "الأمتعة",
    labelChildSeats: "مقاعد الأطفال",
    labelGolfBags: "حقائب الغولف",
    labelStrollers: "عربات الأطفال",
    labelDriver: "السائق",
    labelPlate: "لوحة السيارة",
  },
};

function getLang(language) {
  return LANG[language] ?? LANG.en;
}

const FAQ_BASE = "https://antalyaviptourism.com";

// Deep links into the public site's FAQ accordion. The anchors are the slugs
// defined in public-app/app/lib/faq.ts, which the home page renders as element
// ids; following one opens that question and scrolls to it, so the customer
// lands on the answer rather than on a long list. The slug names the question,
// because the customer reads the whole link in the message.
const FAQ_TOPICS = {
  arrival: { anchor: "faq-airport-pickup", label: "faqTopicArrival" },
  return: { anchor: "faq-return-contact", label: "faqTopicReturn" },
  payment: { anchor: "faq-payment", label: "faqTopicPayment" },
  daily: { anchor: "faq-extra-stops", label: "faqTopicDaily" },
  general: { anchor: "faq", label: "faqTopicGeneral" },
};

/**
 * Language-specific FAQ URL customers should read before their trip.
 * Falls back to the English homepage when the language has no dedicated page.
 * @param {string} [language]
 * @param {keyof typeof FAQ_TOPICS} [topic]
 * @returns {string}
 */
export function faqURL(language, topic = "general") {
  const hasPage = language && language !== "en" && LANG[language];
  const { anchor } = FAQ_TOPICS[topic] ?? FAQ_TOPICS.general;
  return `${FAQ_BASE}${hasPage ? `/${language}` : ""}/#${anchor}`;
}

// The FAQ entry that answers the question customers actually ask at this point
// of the journey: how the airport pickup works before an arrival transfer, how
// we stay in touch before the trip home, extra stops for a daily chauffeur,
// payment for everything else.
//
// The direction of travel decides, not the leg label: a return transfer is
// often entered as its own one-way booking rather than as the return leg of a
// round trip, and that booking carries no "return" leg at all. Anything heading
// to the airport is the trip home, however it was booked.
export function faqTopicFor(transfer) {
  if (!transfer) return "general";
  if (transfer.isDailyChauffeur) return "daily";
  if (transfer.pickupLocation === "airport") return "arrival";
  if (transfer.dropoffLocation === "airport" || transfer.leg === "return")
    return "return";
  return "payment";
}

// "Please read this before your trip" block, closing every pre-trip message
// with the one FAQ answer that is relevant to it.
function faqLines(t, language, topic) {
  const english = LANG.en;
  const { label } = FAQ_TOPICS[topic] ?? FAQ_TOPICS.general;
  return [
    "",
    t.faqNote ?? english.faqNote,
    `${t[label] ?? english[label]}: ${faqURL(language, topic)}`,
  ];
}

// The one thing a guest has to do themselves: get online after landing and
// tell us. Only journeys that start at the airport carry it - a hotel pickup
// has nothing to report, and repeating the note there would train guests to
// skip past it on the message that does need acting on.
function startsAtAirport(transfer) {
  return Boolean(transfer) && transfer.pickupLocation === "airport";
}

// "Important" block, added to a pre-trip message about an airport pickup.
function airportNoteLines(t) {
  return ["", t.airportNote ?? LANG.en.airportNote];
}

function transferDetails(booking, requestedLeg = "outbound") {
  const b = booking ?? {};
  const isRoundTrip = b.trip_type === "round_trip";
  const isDailyChauffeur = b.trip_type === "daily_chauffeur";
  const isReturn = requestedLeg === "return" && isRoundTrip;

  if (isDailyChauffeur) {
    return {
      leg: "daily",
      date: b.pickup_date,
      time: b.pickup_time,
      flightNumber: b.flight_number,
      pickupLocation: b.pickup_location,
      pickupAddress: b.pickup_address,
      isRoundTrip: false,
      isDailyChauffeur: true,
      pickup:
        b.pickup_address || b.hotel_name || locationLabel(b.pickup_location),
      price: Number(b.price_eur) || 0,
    };
  }

  const transfer = isReturn
    ? {
        leg: "return",
        date: b.return_date,
        time: b.return_pickup_time,
        flightNumber: b.return_flight_number,
        // Dönüşte uçuşun kalkış saati verilir; alış saati buna göre planlanır.
        flightDepartureTime: b.return_flight_departure_time,
        pickupLocation: b.dropoff_location,
        pickupAddress: b.dropoff_address,
        dropoffLocation: b.pickup_location,
        dropoffAddress: b.pickup_address,
      }
    : {
        leg: "outbound",
        date: b.pickup_date,
        time: transferStartTime(
          b.pickup_location,
          b.pickup_time,
          b.flight_arrival_time,
        ),
        flightNumber: b.flight_number,
        pickupLocation: b.pickup_location,
        pickupAddress: b.pickup_address,
        dropoffLocation: b.dropoff_location,
        dropoffAddress: b.dropoff_address,
      };

  const navigation = navigationURLs({
    originValue: transfer.pickupLocation,
    originAddress: transfer.pickupAddress,
    destinationValue: transfer.dropoffLocation,
    destinationAddress: transfer.dropoffAddress,
    hotelName: b.hotel_name,
  });

  return {
    ...transfer,
    isRoundTrip,
    route: `${locationLabel(transfer.pickupLocation)} → ${locationLabel(transfer.dropoffLocation)}`,
    pickup: navigation.origin,
    dropoff: navigation.destination,
    price: isRoundTrip
      ? (Number(b.price_eur) || 0) / 2
      : Number(b.price_eur) || 0,
  };
}

function detailLines(booking, transfer, t) {
  const b = booking ?? {};
  if (transfer.isDailyChauffeur) {
    const english = LANG.en;
    const text = (key) => t[key] ?? english[key];
    const lines = [
      `*${text("labelDailyHire")}*`,
      `${text("labelPeriod")}: ${b.pickup_date || "—"} – ${b.service_end_date || "—"}`,
      `${t.labelPickupTime}: ${fmtTime(b.pickup_time)}`,
      `${t.labelPickup}: ${transfer.pickup}`,
      `${t.labelVehicle}: ${vehicleLabel(b.vehicle_type)}`,
      `${t.labelGuests}: ${b.guests ?? "—"}`,
      `${text("labelDailyRate")}: €${fmtPrice(b.daily_rate_eur)}`,
      `${text("labelTotal")}: €${fmtPrice(b.price_eur)}`,
      `${text("labelFuel")}: ${text("fuelExcluded")}`,
    ];
    if (b.flight_number)
      lines.push(
        `${text("labelArrivalFlight")}: ${b.flight_number} · ${fmtTime(b.flight_arrival_time)}`,
      );
    if (b.departure_flight_date)
      lines.push(
        `${text("labelDepartureFlight")}: ${b.departure_flight_date} · ${b.departure_flight_number || "—"} · ${fmtTime(b.departure_flight_time)}`,
      );
    if (Number(b.luggage_count) > 0)
      lines.push(`${t.labelLuggage}: ${b.luggage_count}`);
    if (Number(b.golf_bag_count) > 0)
      lines.push(`${t.labelGolfBags}: ${b.golf_bag_count}`);
    if (Number(b.stroller_count) > 0)
      lines.push(`${t.labelStrollers}: ${b.stroller_count}`);
    if (Number(b.child_seat_count) > 0) {
      lines.push(`${t.labelChildSeats}: ${b.child_seat_count}`);
      if (Array.isArray(b.child_ages) && b.child_ages.length > 0)
        lines.push(`Child ages: ${b.child_ages.map((age, i) => `${i + 1}: ${age === 0 ? '<1' : age + 'y'}`).join(', ')}`);
    }
    return lines;
  }
  const lines = [
    `*${transfer.isRoundTrip ? (transfer.leg === "return" ? t.labelReturn : t.labelOutbound) : t.labelTransfer}*`,
    `${t.labelRoute}: ${transfer.route}`,
    `${t.labelDate}: ${transfer.date || "—"}`,
    `${t.labelPickupTime}: ${fmtTime(transfer.time)}`,
  ];

  if (transfer.flightNumber) {
    const english = LANG.en;
    const departure = transfer.flightDepartureTime
      ? ` · ${t.labelFlightDeparture ?? english.labelFlightDeparture}: ${fmtTime(transfer.flightDepartureTime)}`
      : "";
    lines.push(`${t.labelFlight}: ${transfer.flightNumber}${departure}`);
  }

  lines.push(
    `${t.labelPickup}: ${transfer.pickup}`,
    `${t.labelDropoff}: ${transfer.dropoff}`,
  );

  lines.push(
    `${t.labelVehicle}: ${vehicleLabel(b.vehicle_type)}`,
    `${t.labelGuests}: ${b.guests ?? "—"}`,
  );

  if (Number(b.luggage_count) > 0)
    lines.push(`${t.labelLuggage}: ${b.luggage_count}`);
  if (Number(b.golf_bag_count) > 0)
    lines.push(`${t.labelGolfBags}: ${b.golf_bag_count}`);
  if (Number(b.stroller_count) > 0)
    lines.push(`${t.labelStrollers}: ${b.stroller_count}`);
  if (Number(b.child_seat_count) > 0) {
    lines.push(`${t.labelChildSeats}: ${b.child_seat_count}`);
    if (Array.isArray(b.child_ages) && b.child_ages.length > 0)
      lines.push(`Child ages: ${b.child_ages.map((age, i) => `${i + 1}: ${age === 0 ? '<1' : age + 'y'}`).join(', ')}`);
  }

  lines.push(`${t.labelPrice}: €${fmtPrice(transfer.price)}`);
  return lines;
}

/**
 * Build a WhatsApp confirmation message for a booking.
 * @param {object} booking
 * @param {{ leg?: string, language?: string }} [options]
 * @returns {string}
 */
export function buildConfirmMessage(booking, { leg = "outbound", language } = {}) {
  const b = booking ?? {};
  const lang = language ?? b.language;
  const t = getLang(lang);
  // "both": gidiş-dönüş tek mesajda onaylanır — tek selam, tek kapanış, iki
  // transfer bloğu. Dönüş ayağı olmayan rezervasyonda gidiş onayına eşittir.
  const bothLegs =
    leg === "both" && b.trip_type === "round_trip" && Boolean(b.return_date);
  const transfers = bothLegs
    ? [transferDetails(b, "outbound"), transferDetails(b, "return")]
    : [transferDetails(b, leg === "both" ? "outbound" : leg)];

  const lines = [
    t.confirmGreeting(b.customer_name),
    "",
    `${t.labelRef}: ${b.booking_ref}`,
    ...transfers.flatMap((transfer, index) =>
      index === 0
        ? detailLines(b, transfer, t)
        : ["", ...detailLines(b, transfer, t)],
    ),
    "",
    t.confirmClosing,
    // Birleşik mesajda uyarı gidiş ayağına göre eklenir: havalimanından
    // başlayan bacak odur.
    ...(transfers.some(startsAtAirport) ? airportNoteLines(t) : []),
    // Birleşik mesajda SSS bağlantısı gidiş ayağına göre seçilir: müşterinin
    // önce karşılaşacağı yolculuk odur.
    ...faqLines(t, lang, faqTopicFor(transfers[0])),
  ];

  return lines.join("\n");
}

/**
 * Build a WhatsApp reminder message for a booking.
 * Builds the reminder for the requested, currently displayed transfer leg.
 * @param {object} booking
 * @param {{ leg?: string, language?: string }} [options]
 * @returns {string}
 */
export function buildReminderMessage(booking, { leg = "outbound", language } = {}) {
  const b = booking ?? {};
  const lang = language ?? b.language;
  const t = getLang(lang);
  const transfer = transferDetails(b, leg);

  const lines = [
    t.reminderGreeting(b.customer_name),
    "",
    `${t.labelRef}: ${b.booking_ref}`,
    ...detailLines(b, transfer, t),
  ];

  if (b.driver_name) {
    lines.push(`${t.labelDriver}: ${b.driver_name}`);
  }
  if (b.vehicle_plate) {
    lines.push(`${t.labelPlate}: ${b.vehicle_plate}`);
  }

  lines.push("");
  lines.push(t.reminderClosing);
  if (startsAtAirport(transfer)) lines.push(...airportNoteLines(t));
  lines.push(...faqLines(t, lang, faqTopicFor(transfer)));

  return lines.join("\n");
}

/**
 * Build a WhatsApp message acknowledging receipt of booking request.
 * @param {object} booking
 * @returns {string}
 */
export function buildReceivedMessage(booking, { language } = {}) {
  const b = booking ?? {};
  const lang = language ?? b.language;
  const t = getLang(lang);

  const lines = [
    t.receivedGreeting(b.customer_name),
    "",
    t.receivedClosing,
    // Nothing is confirmed yet, so point at the FAQ as a whole rather than at
    // one leg's answer.
    ...faqLines(t, lang, "general"),
  ];

  return lines.join("\n");
}

/**
 * Build a WhatsApp message requesting customer review/feedback.
 * @param {object} booking
 * @returns {string}
 */
export function buildReviewMessage(booking, { language } = {}) {
  const b = booking ?? {};
  const t = getLang(language ?? b.language);

  const lines = [t.reviewGreeting(b.customer_name), "", t.reviewClosing];

  return lines.join("\n");
}

/**
 * Build a WhatsApp message asking the customer to confirm a flight number the
 * schedule lookup could not verify.
 *
 * Only the customer can resolve this: the lookup already failed, and guessing
 * a landing time would send a driver to the airport at the wrong hour. The
 * two failure kinds get different wording because they need different answers
 * — a wrong number versus a flight into another airport.
 *
 * @param {object} booking
 * @returns {string}
 */
export function buildFlightCheckMessage(booking, { language } = {}) {
  const b = booking ?? {};
  const lang = language ?? b.language;
  const t = getLang(lang);
  const flightNumber = b.flight_number ? String(b.flight_number).toUpperCase() : null;

  const details = [
    flightNumber ? `${t.labelFlight}: ${flightNumber}` : null,
    b.pickup_date ? `${t.flightCheckLabelDate}: ${b.pickup_date}` : null,
  ].filter(Boolean);

  const lines = [
    t.flightCheckGreeting(b.customer_name),
    "",
    ...details,
    "",
    b.flight_verification_status === "wrong_airport"
      ? t.flightCheckWrongAirport
      : t.flightCheckNotFound,
    "",
    t.flightCheckClosing,
  ];

  return lines.join("\n");
}

/**
 * Build a WhatsApp message for airport Meet & Greet service.
 * @param {object} booking
 * @returns {string}
 */
export function buildMeetGreetMessage(booking, { language } = {}) {
  const b = booking ?? {};
  const lang = language ?? b.language;
  const t = getLang(lang);

  const lines = [
    t.meetGreetGreeting(b.customer_name),
    "",
    t.meetGreetClosing,
    // Bu mesaj zaten yalnızca havalimanı karşılaması için gönderilir.
    ...airportNoteLines(t),
    ...faqLines(t, lang, "arrival"),
  ];

  return lines.join("\n");
}
