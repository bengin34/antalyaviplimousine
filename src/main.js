import "./consent.js";
import { resolvePriceTokens, routeData } from "./prices.js";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import fallbackChauffeurPhoto from "../assets/optimized/chauffeur-arrival.jpg?url";
import fallbackInteriorPhoto from "../assets/optimized/executive-interior.jpg?url";
import fallbackHeroPhoto from "../assets/optimized/antalya-coastline-hero.jpg?url";

const vehiclePhotoModules = import.meta.glob(
  "../assets/optimized/images/*.webp",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
);

const customerPhotoModules = import.meta.glob(
  "../assets/optimized/customers/*.jpg",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
);

const translations = {

  zh: {
    navFleet: "车型",
    navService: "服务",
    navRoutes: "路线",
    navReviews: "评价",
    navContact: "联系",
    bookNow: "立即预订",
    alwaysAvailable: "全天候24小时随时为您服务",
    heroEyebrow: "私人司机服务 · Antalya",
    heroTitle: "Antalya高端机场接送<br />专属服务",
    heroSubtitle:
      "从Antalya机场前往Belek、Side、Kemer和Alanya的私人专车接送服务。",
    campaignBadge: "在线特惠",
    campaignDiscount: "特惠价",
    campaignScope: "适用于所有接送价格",
    campaignApplied: "已应用在线特惠价",
    onlineDiscountShort: "在线特惠价",
    discountPricesShown: "已显示在线特惠价",
    bookTransfer: "预订接送",
    instantQuote: "立即获取报价",
    googleRated: "Google评分",
    trustedGuests: "已有超过2.500位客人预订",
    discover: "探索",
    privateJourney: "您的私人之旅",
    quoteTitle: "我们可以送您去哪里？",
    pickup: "上车地点",
    destination: "目的地",
    date: "日期",
    tripType: "行程类型",
    oneWay: "单程",
    roundTrip: "往返",
    roundTripHint:
      "选择往返时，返程将沿相同路线反向行驶。",
    returnDate: "返程日期",
    returnPickupTime: "返程接车时间",
    returnFlightNumber: "返程航班号",
    arrivalDate: "抵达日期",
    arrivalFlightTime: "航班抵达时间",
    arrivalFlightNumber: "抵达航班号",
    roundTripPriceNote: "往返 · 2次行程",
    guests: "乘客",
    airportOption: "Antalya机场 (AYT)",
    hotelOption: "酒店",
    privateAddressOption: "私人地址",
    pickupAddress: "完整上车地址",
    pickupAddressPlaceholder: "酒店名称、街道、门牌号及所在区域",
    dropoffAddress: "完整目的地地址",
    dropoffAddressPlaceholder: "酒店名称、街道、门牌号及所在区域",
    dropoffAddressRequired:
      "目的地地址长度须在6至160个字符之间。",
    customDestinationPrice:
      "价格将在核实目的地地址后确认。",
    selectDestination: "选择目的地",
    airportReturnPrice:
      "价格将在核实酒店或上车地址后确认。",
    oneGuest: "1位乘客",
    twoGuests: "2位乘客",
    threeGuests: "3位乘客",
    fourGuests: "4位乘客",
    fiveGuests: "5位乘客",
    sixGuests: "6位乘客",
    sevenGuests: "7位乘客",
    viewQuote: "查看价格",
    flightTracking: "实时航班追踪",
    fixedPrice: "保证固定价格",
    meetGreet: "专人接机",
    speakingDrivers: "会讲德语和英语",
    tbLicensed: "TÜRSAB认证",
    tbFlightTracking: "航班追踪",
    tbFixedPrice: "固定价格保证",
    tb247Concierge: "24/7礼宾服务",
    tbChildSeats: "含儿童座椅",
    welcomeEyebrow: "至高标准的欢迎",
    welcomeTitle: "尊贵出行。<br />轻松抵达。",
    welcomeBody:
      "从您落地的那一刻起，每一个细节都已为您考虑周全。我们的机场团队会迎接您，您的司机会驶至上车点，您的行李将被装入一辆精心准备的私人车辆。",
    ourStandards: "我们的服务标准",
    concierge: "礼宾服务",
    guestsWelcomed: "已接待客人",
    guestRating: "平均评分",
    privateTransfers: "私人接送",
    fleetEyebrow: "我们的车队",
    fleetTitle: "您的私人空间，<br />细节尽善尽美。",
    fleetIntro:
      "舒适出行，宽敞空间可容纳家人、高尔夫装备和行李。",
    fleetVclassClass: "商务 · 头等",
    fleetVclassDescription:
      "为大型团体提供宽敞的VIP出行，充裕空间可容纳乘客和行李。",
    fleetVitoClass: "VIP · 豪华旅行",
    fleetVitoDescription:
      "为家庭和小型团体提供舒适的私人车厢。",
    signatureFleet: "标志性车队",
    passengers: "乘客",
    suitcases: "行李箱",
    luggageLabel: "大件行李",
    capacitySwitchedSprinter:
      "乘客与行李数量超出Vito的承载能力 — 已改为Mercedes Sprinter。",
    capacityNoVehicle:
      "如此多的乘客与行李超出了我们车辆的承载能力。请通过WhatsApp联系我们。",
    leatherSeats: "高级真皮座椅",
    wifi: "免费WLAN",
    water: "冰镇矿泉水",
    childSeats: "可按需提供儿童座椅",
    television: "车内电视",
    coldDrinks: "冷饮",
    snacks: "小吃",
    nameSignGreeting: "在J / 777柜台迎接",
    reserveVehicle: "预订车辆",
    insideVclass: "Sprinter内饰",
    interiorTitle: "机场与酒店之间的<br />私人休息室。",
    serviceEyebrow: "Antalya VIP标准",
    serviceTitle: "不止是一次接送。<br />更是一场专属欢迎。",
    serviceIntro:
      "酒店级的悉心关照、经验丰富的本地司机，以及从机场到度假村的全程安全保障。",
    trackingTitle: "航班追踪",
    trackingBody:
      "我们实时追踪您的航班，并自动免费调整接车时间。",
    chauffeurTitle: "专业司机",
    chauffeurBody:
      "始终仪表整洁、言行谨慎，因熟悉本地路况和最高服务水准而甄选。",
    greetTitle: "Meet & Greet",
    greetBody:
      "国际航班抵达时，我们的机场团队会在J / 777柜台迎接您，通知您的司机前往上车点，并协助搬运行李。",
    supportTitle: "24/7礼宾服务",
    supportBody:
      "在您旅程的出发前、途中和结束后，始终有专属联系人随时为您服务。",
    priceTitle: "固定价格",
    priceBody:
      "确认后的价格即为最终价格。等候时间、停车费和航班延误均已包含在内。",
    familyTitle: "为家庭而设",
    familyBody:
      "合适的儿童座椅、宽敞的车内空间，以及耐心的协助，让您轻松抵达。",
    routesEyebrow: "我们最受欢迎的行程",
    routesTitle: "从Antalya机场<br />前往土耳其里维埃拉。",
    routesIntro:
      "所有价格均按每车计算，而非按人计算，含90分钟等候时间。",
    golfFavourite: "高尔夫首选",
    from: "起价",
    reviewsEyebrow: "客人评价",
    reviewsTitle: "令人久久<br />难忘的服务。",
    googleReviews: "基于387条经验证的Google评价",
    reviewOne:
      "“尽管航班延误了90分钟，我们的司机仍在等候。车辆一尘不染，凉爽宜人，并已配备好两个儿童座椅。这正是我们一家所需要的迎接。”",
    reviewTwo:
      "“从第一次WhatsApp联系到抵达Belek，全程绝对一流。准时、谨慎且非常专业。我们的高尔夫球包也放得从容宽裕。”",
    reviewThree:
      "“这感觉就像酒店的私人司机服务，而不是机场出租车。沟通清晰、车辆无可挑剔、司机真诚有礼。”",
    trustedBy: "深受Antalya顶级度假村客人的信赖预订",
    faqEyebrow: "常见问题",
    faqTitle: "在您出行之前。",
    faqCatArrival: "抵达与接送",
    faqCatJourney: "返程与行程",
    faqCatPayment: "付款与价格",
    faqCatVehicle: "车辆与行李",
    faqReminder: "请在出行前阅读我们网站上的FAQ部分。",
    viewFaq: "查看FAQ",
    faqIntro:
      "关于您在Antalya的私人机场接送，您需要了解的一切。",
    askQuestion: "提出问题",
    faqOneQ: "航班延误怎么办？",
    faqOneA:
      "您无需做任何事情。我们会实时追踪您的航班，并自动调整您的接车时间。我们从不收取航空公司延误的费用——无论您何时落地，您的司机都会在场，落地后的前90分钟始终包含在内。",
    faqTwoQ:
      "我乘坐国际航班抵达。接机流程是怎样的？",
    faqTwoA:
      "在通过护照检查和领取行李后，您跟随其他乘客前往Meet & Greet区域，来到我们的J / 777柜台。只需向我们的工作人员说出您的名字即可——这就足够了。我们的团队会立即通知您的司机；他会驶入机场并在上车点等候，而我们的工作人员会陪同您前往车辆。整个流程约需7–8分钟。",
    faqSixQ:
      "我乘坐国内航班抵达。在哪里能找到我的司机？",
    faqSixA:
      "Meet & Greet区域仅供国际航班抵达的旅客使用。因此我们对国内旅客采取不同的方式：我们会在接送前将您司机的电话号码发送给您。落地后简短告知他一声——他会在到达大厅接您。",
    faqSevenQ: "如果J / 777柜台没有人怎么办？",
    faqSevenA:
      "我们的柜台始终有两名工作人员值守，他们唯一的任务就是陪同抵达的客人前往车辆。如果柜台短暂无人，说明有同事正在陪同您前面的客人——每次陪同约需7–8分钟。请稍等约10分钟。如果届时仍无人返回，请通过WhatsApp给我们留言：我们会立即通知您的司机，让他在最近的地点停车，并直接引导您前往车辆，无需再等候。",
    faqEightQ:
      "如果我走出机场需要超过90分钟，会怎样？",
    faqEightA:
      "落地后的前90分钟免费包含在内——远超护照检查、取行李和海关所需的时间——并且该时间窗口会在航班延误时自动顺延。只有当您因与航班无关的原因在航站楼停留更久时，才会按每多一小时5 €收取停车费。实际上这几乎从未发生：我们几乎所有的客人早在此之前就已上路。",
    faqNineQ: "我如何付款？",
    faqNineA:
      "您在行程开始时以现金向司机付款——不支持刷卡。价格以欧元（EUR）标定：固定金额与您预订时看到的完全一致——按每车计算，含所有机场和停车费用，之后不会有任何附加费。您更希望以美元或土耳其里拉付款吗？请事先通过WhatsApp联系我们获取单独报价，因为汇率有所不同。您的司机会迎接您、装载您的行李并安装您所需的儿童座椅；付款后您的行程即开始。",
    faqTenQ: "返程接送时我如何保持联系？",
    faqTenA:
      "一旦您通过WhatsApp与我们的团队确认了返程的日期和时间，我们会在接送前几小时为您安排车辆，并通过WhatsApp向您发送车辆照片——如有需要也会提供您司机的电话号码。当您的司机抵达酒店时，他会通知前台，前台会在车辆就绪后通知您的房间。我们的司机从不直接致电客人：所有沟通均通过我们的中央WhatsApp服务进行，因此您始终清楚知道自己在与谁交谈。",
    faqElevenQ: "我可以取消或更改我的预订吗？",
    faqElevenA:
      "可以，并且始终免费。由于我们不收取预付款，因此无需退款，也无需等待您的款项——如果您的计划有变，只需通过WhatsApp发一条消息即可。更改时间、航班号或目的地地址同样办理，无需加价。",
    faqTwelveQ: "我可以用哪种货币付款？",
    faqTwelveA:
      "我们的价格以欧元（EUR）标定并以现金支付；不接受刷卡。如果您希望以美元或土耳其里拉付款，金额取决于当日汇率——因此请在接送前通过WhatsApp联系我们。我们会为您提供明确的报价并通知您的司机，这样车内就无需任何议价。",
    faqThirteenQ: "我可以携带多少行李？",
    faqThirteenA:
      "通常每人一个大行李箱和一件手提行李。如果您携带更多——额外的行李箱、高尔夫球包、婴儿车、滑雪板或自行车——只需在预订时告知我们；我们会免费提供承载能力合适的车辆。关键只在于我们事先知晓。一辆Mercedes Vito最多可容纳6人，一辆Sprinter最多可容纳12人。",
    faqFourteenQ: "如果返程接送时我迟到了，会怎样？",
    faqFourteenA:
      "您的司机会在约定时间抵达您的酒店，并免费等候15分钟。如果预计会有延误，只需通过WhatsApp发一条消息：我们会核对您的航班时间、通知您的司机，并与您协调安排。我们的目标不是催促您，而是让您从容地赶上航班。",
    faqFifteenQ: "行程途中可以中途停车吗？",
    faqFifteenA:
      "当然可以。如果您想在超市或药店停留，或短暂停下拍张照片，只需在预订时或通过WhatsApp告知我们——我们会相应地规划路线。如果某处停靠明显偏离您的路线，我们会在出发前告知您是否会产生额外费用；绝不会事后给您意外。",
    faqThreeQ: "是否提供儿童座椅？",
    faqThreeA:
      "是的。婴儿提篮、儿童座椅和增高垫在预订时可免费提供。",
    faqFourQ: "可以运送高尔夫球包和大件行李吗？",
    faqFourA:
      "可以。Sprinter和Vito非常适合高尔夫团体。请告知我们您的行李情况，我们会安排合适的车辆。",
    faqFiveQ: "显示的价格是最终价格吗？",
    faqFiveA:
      "是的。您预订时的价格就是您以现金交给司机的金额——按每车计算，含所有机场费用、停车费以及前90分钟等候时间。没有任何隐藏费用。",
    contactEyebrow: "您的旅程从这里开始",
    contactTitle: "以非凡的方式<br />抵达Antalya。",
    contactBody:
      "在不到两分钟内在线预订，或直接与我们的24/7礼宾团队沟通。",
    whatsappUs: "WhatsApp",
    replyMinutes: "通常在几分钟内回复",
    callUs: "24/7致电",
    emailUs: "礼宾邮箱",
    replyHour: "一小时内回复",
    fromAirport: "从Antalya机场出发",
    perVehicle: "每车 · 固定价格",
    footerTagline:
      "遍及整个土耳其里维埃拉的私人司机服务。",
    explore: "探索",
    information: "信息",
    licensed: "持牌私人接送服务提供商 · 符合TÜRSAB规定",
    quoteReady: "您的私人接送",
    vehicle: "车辆",
    journeyTime: "行程时间",
    totalFixed: "总价",
    quoteIncludes:
      "含Meet & Greet、航班追踪、停车、90分钟等候时间及矿泉水。",
    confirmWhatsapp: "通过WhatsApp确认",
    chatWithUs: "与我们聊天",
    bookNowCta: "立即预订",
    backToQuote: "返回",
    yourDetails: "您的信息",
    fullName: "全名",
    emailLabel: "电子邮箱",
    phoneLabel: "电话 / WhatsApp",
    flightNumber: "航班号",
    flightArrivalTime: "抵达时间",
    notesLabel: "特殊需求",
    confirmBooking: "确认预订",
    bookingConfirmed: "预订已确认",
    referenceLabel: "参考编号",
    weWillContact:
      "您的预订请求已发送。我们将在30分钟内与您联系。",
    paymentError: "付款失败。请重试。",
  },
  da: {
    navFleet: "Køretøjer",
    navService: "Service",
    navRoutes: "Ruter",
    navReviews: "Anmeldelser",
    navContact: "Kontakt",
    bookNow: "Book nu",
    alwaysAvailable: "Tilgængelig 24 timer i døgnet, hver dag",
    heroEyebrow: "Privat chaufførservice · Antalya",
    heroTitle: "Premium lufthavnstransfer<br />i Antalya",
    heroSubtitle:
      "Private transfers med chauffør fra Antalya Lufthavn til Belek, Side, Kemer og Alanya.",
    campaignBadge: "Online-tilbud",
    campaignDiscount: "Særpris",
    campaignScope: "på alle transferpriser",
    campaignApplied: "Online-særpris anvendt",
    onlineDiscountShort: "Online-særpris",
    discountPricesShown: "Online-særpriser vises",
    bookTransfer: "Book transfer",
    instantQuote: "Få pris med det samme",
    googleRated: "Google-bedømmelse",
    trustedGuests: "Booket af over 2.500 gæster",
    discover: "Opdag",
    privateJourney: "Din private rejse",
    quoteTitle: "Hvor må vi køre dig hen?",
    pickup: "Afhentning",
    destination: "Destination",
    date: "Dato",
    tripType: "Rejsetype",
    oneWay: "Enkeltrejse",
    roundTrip: "Tur-retur",
    roundTripHint:
      "Ved tur-retur foregår returrejsen ad samme rute i modsat retning.",
    returnDate: "Returdato",
    returnPickupTime: "Afhentningstidspunkt for returrejsen",
    returnFlightNumber: "Returflynummer",
    arrivalDate: "Ankomstdato",
    arrivalFlightTime: "Flyets ankomsttid",
    arrivalFlightNumber: "Ankomstflynummer",
    roundTripPriceNote: "Tur-retur · 2 rejser",
    guests: "Gæster",
    airportOption: "Antalya Lufthavn (AYT)",
    hotelOption: "Hotel",
    privateAddressOption: "Privatadresse",
    pickupAddress: "Fuld afhentningsadresse",
    pickupAddressPlaceholder: "Hotelnavn, gade, husnummer og bydel",
    dropoffAddress: "Fuld destinationsadresse",
    dropoffAddressPlaceholder: "Hotelnavn, gade, husnummer og bydel",
    dropoffAddressRequired:
      "Destinationsadressen skal være mellem 6 og 160 tegn.",
    customDestinationPrice:
      "Prisen bekræftes efter kontrol af destinationsadressen.",
    selectDestination: "Vælg destination",
    airportReturnPrice:
      "Prisen bekræftes efter kontrol af hotellet eller afhentningsadressen.",
    oneGuest: "1 gæst",
    twoGuests: "2 gæster",
    threeGuests: "3 gæster",
    fourGuests: "4 gæster",
    fiveGuests: "5 gæster",
    sixGuests: "6 gæster",
    sevenGuests: "7 gæster",
    viewQuote: "Vis pris",
    flightTracking: "Flysporing i realtid",
    fixedPrice: "Garanteret fast pris",
    meetGreet: "Personlig modtagelse",
    speakingDrivers: "Taler tysk og engelsk",
    tbLicensed: "TÜRSAB-certificeret",
    tbFlightTracking: "Flysporing",
    tbFixedPrice: "Fastprisgaranti",
    tb247Concierge: "24/7 concierge",
    tbChildSeats: "Barnesæder inkluderet",
    welcomeEyebrow: "Velkommen på højeste niveau",
    welcomeTitle: "Rejs med stil.<br />Ankom afslappet.",
    welcomeBody:
      "Fra det øjeblik du lander, er der tænkt på hver eneste detalje. Vores lufthavnsteam tager imod dig, din chauffør kører frem til afhentningsstedet, og din bagage lastes i et omhyggeligt forberedt privat køretøj.",
    ourStandards: "Vores servicestandarder",
    concierge: "Concierge-service",
    guestsWelcomed: "Modtagne gæster",
    guestRating: "Gennemsnitlig bedømmelse",
    privateTransfers: "Private transfers",
    fleetEyebrow: "Vores flåde",
    fleetTitle: "Dit private rum,<br />fuldendt ned til mindste detalje.",
    fleetIntro:
      "Rejs komfortabelt med god plads til familien, golfudstyr og kufferter.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Rummelig VIP-transport til større grupper med masser af plads til passagerer og bagage.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "En komfortabel privat kabine til familier og små grupper.",
    signatureFleet: "Signature-flåde",
    passengers: "Passagerer",
    suitcases: "Kufferter",
    luggageLabel: "Stor bagage",
    capacitySwitchedSprinter:
      "Passagerer og bagage overstiger Vito — skiftet til Mercedes Sprinter.",
    capacityNoVehicle:
      "Så mange passagerer og så meget bagage overstiger vores køretøjer. Kontakt os venligst via WhatsApp.",
    leatherSeats: "Premium lædersæder",
    wifi: "Gratis WiFi",
    water: "Afkølet mineralvand",
    childSeats: "Barnesæder efter ønske",
    television: "Tv i køretøjet",
    coldDrinks: "Kolde drikke",
    snacks: "Snacks",
    nameSignGreeting: "Modtagelse ved skranke J / 777",
    reserveVehicle: "Reserver køretøj",
    insideVclass: "Sprinter-interiør",
    interiorTitle: "En privat lounge mellem<br />lufthavn og hotel.",
    serviceEyebrow: "Antalya VIP-standarden",
    serviceTitle: "Mere end en transfer.<br />En særlig modtagelse.",
    serviceIntro:
      "Opmærksomhed på hotelniveau, erfarne lokale chauffører og fuldkommen tryghed fra lufthavnen til resortet.",
    trackingTitle: "Flysporing",
    trackingBody:
      "Vi sporer dit fly i realtid og tilpasser afhentningen automatisk og gratis.",
    chauffeurTitle: "Professionelle chauffører",
    chauffeurBody:
      "Altid velplejede, diskrete og udvalgt for lokalkendskab og højeste servicestandard.",
    greetTitle: "Meet & Greet",
    greetBody:
      "Ved internationale ankomster tager vores lufthavnsteam imod dig ved skranke J / 777, tilkalder din chauffør til afhentningsstedet og hjælper med bagagen.",
    supportTitle: "24/7 concierge",
    supportBody:
      "Før, under og efter din rejse er der altid en personlig kontaktperson til rådighed.",
    priceTitle: "Faste priser",
    priceBody:
      "Den bekræftede pris er den endelige pris. Ventetid, parkering og flyforsinkelser er inkluderet.",
    familyTitle: "Til familier",
    familyBody:
      "Passende barnesæder, rummelige interiører og tålmodig hjælp til en afslappet ankomst.",
    routesEyebrow: "Vores mest populære rejser",
    routesTitle: "Fra Antalya Lufthavn<br />til den tyrkiske riviera.",
    routesIntro:
      "Alle priser gælder pr. køretøj, ikke pr. person, inklusive 90 minutters ventetid.",
    golfFavourite: "Golf-favorit",
    from: "Fra",
    reviewsEyebrow: "Gæsteanmeldelser",
    reviewsTitle: "Service, der huskes<br />længe efter.",
    googleReviews: "Baseret på 387 verificerede Google-anmeldelser",
    reviewOne:
      "„Vores chauffør ventede trods 90 minutters flyforsinkelse. Køretøjet var pletfrit, behageligt køligt og allerede udstyret med begge barnesæder. Præcis den modtagelse, vores familie havde brug for.“",
    reviewTwo:
      "„Fra den første WhatsApp-kontakt til ankomsten i Belek var det helt igennem førsteklasses. Punktlig, diskret og meget professionel. Selv vores golftasker havde nem plads.“",
    reviewThree:
      "„Det føltes som et hotels chaufførservice, ikke som en lufthavnstaxi. Klar kommunikation, et pletfrit køretøj og en oprigtigt høflig chauffør.“",
    trustedBy: "Booket af gæster på førende resorts i Antalya",
    faqEyebrow: "Ofte stillede spørgsmål",
    faqTitle: "Før din rejse.",
    faqCatArrival: "Ankomst & transfer",
    faqCatJourney: "Returrejse & kørsel",
    faqCatPayment: "Betaling & pris",
    faqCatVehicle: "Køretøj & bagage",
    faqReminder: "Læs venligst FAQ-afsnittet på vores hjemmeside før din rejse.",
    viewFaq: "Se FAQ",
    faqIntro:
      "Alt, hvad du har brug for at vide om din private lufthavnstransfer i Antalya.",
    askQuestion: "Stil et spørgsmål",
    faqOneQ: "Hvad sker der ved en flyforsinkelse?",
    faqOneA:
      "Du behøver ikke foretage dig noget. Vi sporer dit fly i realtid og tilpasser dit afhentningstidspunkt automatisk. Vi opkræver aldrig for flyselskabets forsinkelser – din chauffør er der, uanset hvornår du lander, og de første 90 minutter efter landing er altid inkluderet.",
    faqTwoQ:
      "Jeg ankommer med et internationalt fly. Hvordan foregår afhentningen?",
    faqTwoA:
      "Efter paskontrol og bagageudlevering følger du de øvrige passagerer ind i Meet & Greet-området og går hen til vores skranke J / 777. Fortæl blot vores medarbejdere dit navn – det er nok. Vores team informerer straks din chauffør; han kører ind i lufthavnen og står klar ved afhentningsstedet, mens vores medarbejder følger dig til køretøjet. Hele forløbet tager cirka 7-8 minutter.",
    faqSixQ:
      "Jeg ankommer med et indenrigsfly. Hvor finder jeg min chauffør?",
    faqSixA:
      "Meet & Greet-området er udelukkende forbeholdt internationale ankomster. Indenrigsgæster tager vi os derfor af på en anden måde: Vi sender dig din chaufførs telefonnummer før transferen. Giv ham en kort besked efter landing – han henter dig i ankomsthallen.",
    faqSevenQ: "Hvad gør jeg, hvis der ikke er nogen ved skranke J / 777?",
    faqSevenA:
      "Ved vores skranke er der løbende to medarbejdere på arbejde, hvis eneste opgave er at følge ankommende gæster til deres køretøj. Er skranken kortvarigt ubemandet, er en kollega netop ved at følge gæsten før dig – hver ledsagelse tager cirka 7-8 minutter. Vent venligst omkring 10 minutter. Er der ingen tilbage til den tid, så skriv til os via WhatsApp: Vi informerer straks din chauffør, lader ham holde ved det nærmeste punkt og fører dig direkte til din bil uden yderligere ventetid.",
    faqEightQ:
      "Hvad gælder, hvis jeg bruger mere end 90 minutter på at komme ud af lufthavnen?",
    faqEightA:
      "De første 90 minutter efter landing er inkluderet gratis – betydeligt mere, end paskontrol, bagage og told kræver – og dette tidsvindue forskydes automatisk ved flyforsinkelser. Kun hvis du bliver længere i terminalen af grunde, der ikke hænger sammen med dit fly, kommer der et parkeringsbidrag på 5 € pr. yderligere time til. I praksis sker det stort set aldrig: Næsten alle vores gæster er for længst på vej inden da.",
    faqNineQ: "Hvordan betaler jeg?",
    faqNineA:
      "Du betaler din chauffør kontant ved rejsens begyndelse – kortbetaling er ikke mulig. Priserne er fastsat i euro (EUR): Det faste beløb svarer nøjagtigt til det, du så ved bookingen – pr. køretøj, inklusive alle lufthavns- og parkeringsgebyrer, uden senere tillæg. Vil du hellere betale i amerikanske dollars eller tyrkiske lira? Skriv til os på forhånd via WhatsApp for en separat pris, da vekselkursen afviger. Din chauffør byder dig velkommen, laster din bagage og monterer de ønskede barnesæder; efter betalingen begynder din rejse.",
    faqTenQ: "Hvordan holder jeg kontakten ved returtransferen?",
    faqTenA:
      "Så snart du har bekræftet dato og tidspunkt for din returrejse med vores team via WhatsApp, tildeler vi dig dit køretøj nogle timer før transferen og sender dig billeder af det via WhatsApp – på ønske også din chaufførs telefonnummer. Når din chauffør når hotellet, informerer han receptionen, som giver dit værelse besked, så snart bilen står klar. Vores chauffører ringer aldrig direkte til gæster: Al kommunikation foregår via vores centrale WhatsApp-service, så du altid ved præcis, hvem du taler med.",
    faqElevenQ: "Kan jeg annullere eller ændre min booking?",
    faqElevenA:
      "Ja, og altid gratis. Da vi ikke tager forudbetaling, er der intet at refundere og ingen ventetid på dine penge — ændrer dine planer sig, er en besked via WhatsApp nok. Ændringer af tidspunkt, flynummer eller destinationsadresse ordner vi ligeledes uden tillæg.",
    faqTwelveQ: "I hvilken valuta kan jeg betale?",
    faqTwelveA:
      "Vores priser er fastsat i euro (EUR) og betales kontant; kort accepteres ikke. Vil du betale i amerikanske dollars eller tyrkiske lira, afhænger beløbet af dagskursen — skriv derfor til os via WhatsApp før din transfer. Vi giver dig en klar pris og informerer din chauffør, så der ikke forhandles i køretøjet.",
    faqThirteenQ: "Hvor meget bagage må jeg tage med?",
    faqThirteenA:
      "Som regel én stor kuffert og ét stykke håndbagage pr. person. Har du mere med — en ekstra kuffert, en golfbag, en klapvogn, ski eller en cykel — så sig det blot ved bookingen; vi stiller et køretøj med passende kapacitet til rådighed uden tillæg. Det afgørende er kun, at vi ved det på forhånd. En Mercedes Vito rummer op til 6 personer, en Sprinter op til 12.",
    faqFourteenQ: "Hvad sker der, hvis jeg bliver forsinket ved returtransferen?",
    faqFourteenA:
      "Din chauffør er ved dit hotel til det aftalte tidspunkt og venter 15 minutter gratis. Tegner der sig en forsinkelse, er en besked via WhatsApp nok: Vi tjekker din flytid, informerer din chauffør og afstemmer forløbet med dig. Vores mål er ikke at stresse dig, men at bringe dig afslappet til dit fly.",
    faqFifteenQ: "Er mellemstop mulige undervejs?",
    faqFifteenA:
      "Naturligvis. Vil du holde ved et supermarked eller et apotek eller stoppe kort for et foto, så sig det blot ved bookingen eller via WhatsApp — vi planlægger ruten derefter. Fører et stop dig betydeligt væk fra din rute, siger vi det til dig før afgang, om der kommer noget til; du bliver ikke overrasket bagefter.",
    faqThreeQ: "Er der barnesæder til rådighed?",
    faqThreeA:
      "Ja. Babyautostole, barnesæder og selepuder er gratis til rådighed ved forudbestilling.",
    faqFourQ: "Kan golfbags og stor bagage transporteres?",
    faqFourA:
      "Ja. Sprinter og Vito er ideelle til golfgrupper. Fortæl os om din bagage, så planlægger vi det passende køretøj.",
    faqFiveQ: "Er den viste pris endelig?",
    faqFiveA:
      "Ja. Prisen fra din booking er det beløb, du giver din chauffør kontant – pr. køretøj, inklusive alle lufthavnsgebyrer, parkeringsomkostninger og de første 90 minutters ventetid. Der er ingen skjulte omkostninger.",
    contactEyebrow: "Din rejse begynder her",
    contactTitle: "Ankom usædvanligt godt<br />til Antalya.",
    contactBody:
      "Book online på under to minutter, eller tal direkte med vores 24/7 concierge-team.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Svar oftest inden for få minutter",
    callUs: "Ring 24/7",
    emailUs: "Concierge-e-mail",
    replyHour: "Svar inden for en time",
    fromAirport: "Fra Antalya Lufthavn",
    perVehicle: "pr. køretøj · fast pris",
    footerTagline:
      "Private chaufførservices på hele den tyrkiske riviera.",
    explore: "Opdag",
    information: "Information",
    licensed: "Licenseret privat transferudbyder · TÜRSAB-godkendt",
    quoteReady: "Din private transfer",
    vehicle: "Køretøj",
    journeyTime: "Køretid",
    totalFixed: "Samlet pris",
    quoteIncludes:
      "Inklusive Meet & Greet, flysporing, parkering, 90 minutters ventetid og mineralvand.",
    confirmWhatsapp: "Bekræft via WhatsApp",
    chatWithUs: "Chat med os",
    bookNowCta: "Book nu",
    backToQuote: "Tilbage",
    yourDetails: "Dine oplysninger",
    fullName: "Fulde navn",
    emailLabel: "E-mail",
    phoneLabel: "Telefon / WhatsApp",
    flightNumber: "Flynummer",
    flightArrivalTime: "Ankomsttid",
    notesLabel: "Særlige ønsker",
    confirmBooking: "Bekræft booking",
    bookingConfirmed: "Booking bekræftet",
    referenceLabel: "Reference",
    weWillContact:
      "Din bookingforespørgsel er sendt. Vi vender tilbage inden for 30 minutter.",
    paymentError: "Betalingen mislykkedes. Prøv venligst igen.",
  },
  es: {
    navFleet: "Vehículos",
    navService: "Servicio",
    navRoutes: "Rutas",
    navReviews: "Opiniones",
    navContact: "Contacto",
    bookNow: "Reservar ahora",
    alwaysAvailable: "Disponibles las 24 horas, todos los días",
    heroEyebrow: "Servicio privado de chófer · Antalya",
    heroTitle: "Traslados premium al aeropuerto<br />en Antalya",
    heroSubtitle:
      "Traslados privados con chófer desde el aeropuerto de Antalya a Belek, Side, Kemer y Alanya.",
    campaignBadge: "Oferta online",
    campaignDiscount: "Precio especial",
    campaignScope: "en todos los precios de traslado",
    campaignApplied: "Precio especial online aplicado",
    onlineDiscountShort: "Precio especial online",
    discountPricesShown: "Se muestran los precios especiales online",
    bookTransfer: "Reservar traslado",
    instantQuote: "Obtener precio al instante",
    googleRated: "Valoración de Google",
    trustedGuests: "Reservado por más de 2.500 huéspedes",
    discover: "Descubrir",
    privateJourney: "Su viaje privado",
    quoteTitle: "¿A dónde le llevamos?",
    pickup: "Recogida",
    destination: "Destino",
    date: "Fecha",
    tripType: "Tipo de viaje",
    oneWay: "Solo ida",
    roundTrip: "Ida y vuelta",
    roundTripHint:
      "En un viaje de ida y vuelta, el regreso se realiza por la misma ruta en sentido inverso.",
    returnDate: "Fecha de regreso",
    returnPickupTime: "Hora de recogida del regreso",
    returnFlightNumber: "Número de vuelo de regreso",
    arrivalDate: "Fecha de llegada",
    arrivalFlightTime: "Hora de llegada del vuelo",
    arrivalFlightNumber: "Número de vuelo de llegada",
    roundTripPriceNote: "Ida y vuelta · 2 trayectos",
    guests: "Pasajeros",
    airportOption: "Aeropuerto de Antalya (AYT)",
    hotelOption: "Hotel",
    privateAddressOption: "Dirección particular",
    pickupAddress: "Dirección completa de recogida",
    pickupAddressPlaceholder: "Nombre del hotel, calle, número y barrio",
    dropoffAddress: "Dirección completa de destino",
    dropoffAddressPlaceholder: "Nombre del hotel, calle, número y barrio",
    dropoffAddressRequired:
      "La dirección de destino debe tener entre 6 y 160 caracteres.",
    customDestinationPrice:
      "El precio se confirmará tras revisar la dirección de destino.",
    selectDestination: "Seleccionar destino",
    airportReturnPrice:
      "El precio se confirmará tras revisar el hotel o la dirección de recogida.",
    oneGuest: "1 pasajero",
    twoGuests: "2 pasajeros",
    threeGuests: "3 pasajeros",
    fourGuests: "4 pasajeros",
    fiveGuests: "5 pasajeros",
    sixGuests: "6 pasajeros",
    sevenGuests: "7 pasajeros",
    viewQuote: "Ver precio",
    flightTracking: "Seguimiento del vuelo en tiempo real",
    fixedPrice: "Precio fijo garantizado",
    meetGreet: "Recepción personalizada",
    speakingDrivers: "Hablan alemán e inglés",
    tbLicensed: "Certificado por TÜRSAB",
    tbFlightTracking: "Seguimiento de vuelos",
    tbFixedPrice: "Garantía de precio fijo",
    tb247Concierge: "Concierge 24/7",
    tbChildSeats: "Sillas infantiles incluidas",
    welcomeEyebrow: "Bienvenido al más alto nivel",
    welcomeTitle: "Viaje con estilo.<br />Llegue relajado.",
    welcomeBody:
      "Desde el momento en que aterriza, cada detalle está previsto. Nuestro equipo del aeropuerto le recibe, su chófer se acerca al punto de recogida y su equipaje se carga en un vehículo privado cuidadosamente preparado.",
    ourStandards: "Nuestros estándares de servicio",
    concierge: "Servicio de concierge",
    guestsWelcomed: "Huéspedes recibidos",
    guestRating: "Valoración media",
    privateTransfers: "Traslados privados",
    fleetEyebrow: "Nuestra flota",
    fleetTitle: "Su espacio privado,<br />perfecto hasta el último detalle.",
    fleetIntro:
      "Viaje con comodidad y amplio espacio para la familia, el equipaje de golf y las maletas.",
    fleetVclassClass: "Business · Primera clase",
    fleetVclassDescription:
      "Transporte VIP espacioso para grupos grandes, con amplio espacio para pasajeros y equipaje.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Una cómoda cabina privada para familias y grupos pequeños.",
    signatureFleet: "Flota Signature",
    passengers: "Pasajeros",
    suitcases: "Maletas",
    luggageLabel: "Equipaje grande",
    capacitySwitchedSprinter:
      "Los pasajeros y el equipaje superan la capacidad del Vito — cambiado a Mercedes Sprinter.",
    capacityNoVehicle:
      "Esta cantidad de pasajeros y equipaje supera la capacidad de nuestros vehículos. Contáctenos por WhatsApp.",
    leatherSeats: "Asientos de cuero premium",
    wifi: "WiFi gratuito",
    water: "Agua mineral fría",
    childSeats: "Sillas infantiles bajo petición",
    television: "Televisor en el vehículo",
    coldDrinks: "Bebidas frías",
    snacks: "Aperitivos",
    nameSignGreeting: "Recepción en el mostrador J / 777",
    reserveVehicle: "Reservar vehículo",
    insideVclass: "Interior del Sprinter",
    interiorTitle: "Un salón privado entre<br />el aeropuerto y el hotel.",
    serviceEyebrow: "El estándar VIP de Antalya",
    serviceTitle: "Más que un traslado.<br />Una recepción especial.",
    serviceIntro:
      "Atención de nivel hotelero, chóferes locales experimentados y total seguridad desde el aeropuerto hasta el resort.",
    trackingTitle: "Seguimiento del vuelo",
    trackingBody:
      "Seguimos su vuelo en tiempo real y ajustamos la recogida de forma automática y gratuita.",
    chauffeurTitle: "Chóferes profesionales",
    chauffeurBody:
      "Siempre impecables, discretos y seleccionados por su conocimiento local y su máximo nivel de servicio.",
    greetTitle: "Meet & Greet",
    greetBody:
      "En las llegadas internacionales, nuestro equipo del aeropuerto le recibe en el mostrador J / 777, llama a su chófer al punto de recogida y le ayuda con el equipaje.",
    supportTitle: "Concierge 24/7",
    supportBody:
      "Antes, durante y después de su viaje, siempre tendrá disponible una persona de contacto.",
    priceTitle: "Precios fijos",
    priceBody:
      "El precio confirmado es el precio final. El tiempo de espera, el aparcamiento y los retrasos de vuelo están incluidos.",
    familyTitle: "Para familias",
    familyBody:
      "Sillas infantiles adecuadas, interiores amplios y una ayuda paciente para una llegada relajada.",
    routesEyebrow: "Nuestros trayectos más populares",
    routesTitle: "Desde el aeropuerto de Antalya<br />a la Riviera turca.",
    routesIntro:
      "Todos los precios son por vehículo, no por persona, e incluyen 90 minutos de tiempo de espera.",
    golfFavourite: "Favorito del golf",
    from: "Desde",
    reviewsEyebrow: "Opiniones de huéspedes",
    reviewsTitle: "Un servicio que perdura<br />en la memoria.",
    googleReviews: "Basado en 387 opiniones verificadas de Google",
    reviewOne:
      "«Nuestro chófer esperó a pesar de un retraso de 90 minutos del vuelo. El vehículo estaba impecable, con una temperatura agradable y ya equipado con las dos sillas infantiles. Justo la recepción que nuestra familia necesitaba.»",
    reviewTwo:
      "«Desde el primer contacto por WhatsApp hasta la llegada a Belek, todo fue de primera clase. Puntual, discreto y muy profesional. Nuestras bolsas de golf también cupieron cómodamente.»",
    reviewThree:
      "«Se sintió como el servicio de chófer de un hotel, no como un taxi de aeropuerto. Comunicación clara, un vehículo impecable y un chófer sinceramente amable.»",
    trustedBy: "Reservado por huéspedes de los principales resorts de Antalya",
    faqEyebrow: "Preguntas frecuentes",
    faqTitle: "Antes de su viaje.",
    faqCatArrival: "Llegada y traslado",
    faqCatJourney: "Regreso y trayecto",
    faqCatPayment: "Pago y precio",
    faqCatVehicle: "Vehículo y equipaje",
    faqReminder: "Antes de su viaje, lea la sección de preguntas frecuentes de nuestra web.",
    viewFaq: "Ver preguntas frecuentes",
    faqIntro:
      "Todo lo que necesita saber sobre su traslado privado al aeropuerto de Antalya.",
    askQuestion: "Hacer una pregunta",
    faqOneQ: "¿Qué ocurre si mi vuelo se retrasa?",
    faqOneA:
      "No tiene que hacer nada. Seguimos su vuelo en tiempo real y ajustamos automáticamente su hora de recogida. Nunca cobramos los retrasos de la aerolínea: su chófer estará allí cuando quiera que aterrice, y los primeros 90 minutos tras el aterrizaje siempre están incluidos.",
    faqTwoQ:
      "Llego en un vuelo internacional. ¿Cómo es la recogida?",
    faqTwoA:
      "Tras el control de pasaportes y la recogida de equipaje, siga al resto de los pasajeros hasta la zona de Meet & Greet y acérquese a nuestro mostrador J / 777. Solo tiene que decir su nombre a nuestro personal; con eso basta. Nuestro equipo avisa de inmediato a su chófer, que entra en el aeropuerto y espera en el punto de recogida mientras nuestro personal le acompaña al vehículo. Todo el proceso dura unos 7-8 minutos.",
    faqSixQ:
      "Llego en un vuelo nacional. ¿Dónde encuentro a mi chófer?",
    faqSixA:
      "La zona de Meet & Greet está disponible exclusivamente para las llegadas internacionales. Por eso atendemos a los huéspedes de vuelos nacionales de otra manera: le enviamos el número de teléfono de su chófer antes del traslado. Avísele brevemente tras aterrizar; él le recogerá en la sala de llegadas.",
    faqSevenQ: "¿Qué hago si no hay nadie en el mostrador J / 777?",
    faqSevenA:
      "En nuestro mostrador hay siempre dos empleados cuya única tarea es acompañar a los huéspedes que llegan hasta su vehículo. Si el mostrador está momentáneamente vacío, es porque un compañero está acompañando al huésped anterior; cada acompañamiento dura unos 7-8 minutos. Espere unos 10 minutos, por favor. Si para entonces nadie ha regresado, escríbanos por WhatsApp: avisamos de inmediato a su chófer, hacemos que se detenga en el punto más cercano y le llevamos directamente a su coche sin más esperas.",
    faqEightQ:
      "¿Qué ocurre si tardo más de 90 minutos en salir del aeropuerto?",
    faqEightA:
      "Los primeros 90 minutos tras el aterrizaje están incluidos sin coste — bastante más de lo que requieren el control de pasaportes, el equipaje y la aduana — y este margen de tiempo se ajusta automáticamente en caso de retraso del vuelo. Solo si permanece más tiempo en la terminal por motivos ajenos a su vuelo se añade una contribución al aparcamiento de 5 € por cada hora adicional. En la práctica, esto casi nunca ocurre: prácticamente todos nuestros huéspedes ya están en camino mucho antes.",
    faqNineQ: "¿Cómo pago?",
    faqNineA:
      "Paga a su chófer en efectivo al inicio del trayecto; no es posible pagar con tarjeta. Los precios están fijados en euros (EUR): el importe fijo corresponde exactamente a lo que vio al reservar — por vehículo, incluidas todas las tasas de aeropuerto y aparcamiento, sin añadidos posteriores. ¿Prefiere pagar en dólares estadounidenses o en liras turcas? Escríbanos con antelación por WhatsApp para un precio aparte, ya que el tipo de cambio varía. Su chófer le da la bienvenida, carga su equipaje y monta las sillas infantiles solicitadas; tras el pago comienza su trayecto.",
    faqTenQ: "¿Cómo mantengo el contacto en el traslado de regreso?",
    faqTenA:
      "Una vez que haya confirmado la fecha y la hora de su regreso por WhatsApp con nuestro equipo, le asignamos su vehículo unas horas antes del traslado y le enviamos fotos del mismo por WhatsApp; si lo desea, también el número de teléfono de su chófer. Cuando su chófer llega al hotel, avisa a la recepción, que informa a su habitación en cuanto el coche está listo. Nuestros chóferes nunca llaman directamente a los huéspedes: toda la comunicación pasa por nuestra atención central de WhatsApp, de modo que siempre sabe exactamente con quién está hablando.",
    faqElevenQ: "¿Puedo cancelar o modificar mi reserva?",
    faqElevenA:
      "Sí, y siempre de forma gratuita. Como no cobramos ningún pago por adelantado, no hay nada que reembolsar ni ninguna espera para recuperar su dinero: si sus planes cambian, basta con un mensaje por WhatsApp. Los cambios de hora, número de vuelo o dirección de destino los gestionamos igualmente, sin recargo.",
    faqTwelveQ: "¿En qué moneda puedo pagar?",
    faqTwelveA:
      "Nuestros precios están fijados en euros (EUR) y se pagan en efectivo; no se aceptan tarjetas. Si desea pagar en dólares estadounidenses o en liras turcas, el importe depende del tipo de cambio del día; por eso, escríbanos por WhatsApp antes de su traslado. Le indicamos un precio claro e informamos a su chófer, de modo que no haya nada que negociar en el vehículo.",
    faqThirteenQ: "¿Cuánto equipaje puedo llevar?",
    faqThirteenA:
      "Por lo general, una maleta grande y una pieza de equipaje de mano por persona. Si lleva más — una maleta adicional, una bolsa de golf, un cochecito, esquís o una bicicleta — solo tiene que indicarlo al reservar; sin recargo, ponemos a su disposición un vehículo con la capacidad adecuada. Lo único que importa es que lo sepamos con antelación. Un Mercedes Vito admite hasta 6 personas y un Sprinter hasta 12.",
    faqFourteenQ: "¿Qué ocurre si me retraso en el traslado de regreso?",
    faqFourteenA:
      "Su chófer estará en su hotel a la hora acordada y espera 15 minutos sin coste. Si se prevé un retraso, basta con un mensaje por WhatsApp: comprobamos la hora de su vuelo, informamos a su chófer y coordinamos el proceso con usted. Nuestro objetivo no es meterle prisa, sino llevarle a su vuelo de forma relajada.",
    faqFifteenQ: "¿Es posible hacer paradas durante el trayecto?",
    faqFifteenA:
      "Por supuesto. Si desea parar en un supermercado o una farmacia, o detenerse brevemente para una foto, solo tiene que indicarlo al reservar o por WhatsApp; planificamos la ruta en consecuencia. Si una parada le desvía considerablemente de su recorrido, le informamos antes de la salida de si hay algún coste adicional; nada le sorprenderá después.",
    faqThreeQ: "¿Hay sillas infantiles disponibles?",
    faqThreeA:
      "Sí. Portabebés, sillas infantiles y elevadores están disponibles gratuitamente si se reservan con antelación.",
    faqFourQ: "¿Se pueden transportar bolsas de golf y equipaje grande?",
    faqFourA:
      "Sí. El Sprinter y el Vito son ideales para grupos de golf. Indíquenos su equipaje y planificaremos el vehículo adecuado.",
    faqFiveQ: "¿Es definitivo el precio mostrado?",
    faqFiveA:
      "Sí. El precio de su reserva es el importe que entrega a su chófer en efectivo — por vehículo, incluidas todas las tasas de aeropuerto, los costes de aparcamiento y los primeros 90 minutos de tiempo de espera. No hay costes ocultos.",
    contactEyebrow: "Su viaje comienza aquí",
    contactTitle: "Llegue a Antalya<br />de forma excepcional.",
    contactBody:
      "Reserve online en menos de dos minutos o hable directamente con nuestro equipo de concierge 24/7.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Respuesta normalmente en pocos minutos",
    callUs: "Llamar 24/7",
    emailUs: "Correo del concierge",
    replyHour: "Respuesta en menos de una hora",
    fromAirport: "Desde el aeropuerto de Antalya",
    perVehicle: "por vehículo · precio fijo",
    footerTagline:
      "Servicios privados de chófer en toda la Riviera turca.",
    explore: "Descubrir",
    information: "Información",
    licensed: "Proveedor de traslados privados con licencia · Conforme a TÜRSAB",
    quoteReady: "Su traslado privado",
    vehicle: "Vehículo",
    journeyTime: "Tiempo de viaje",
    totalFixed: "Precio total",
    quoteIncludes:
      "Incluye Meet & Greet, seguimiento del vuelo, aparcamiento, 90 minutos de tiempo de espera y agua mineral.",
    confirmWhatsapp: "Confirmar por WhatsApp",
    chatWithUs: "Chatee con nosotros",
    bookNowCta: "Reservar ahora",
    backToQuote: "Volver",
    yourDetails: "Sus datos",
    fullName: "Nombre completo",
    emailLabel: "Correo electrónico",
    phoneLabel: "Teléfono / WhatsApp",
    flightNumber: "Número de vuelo",
    flightArrivalTime: "Hora de llegada",
    notesLabel: "Peticiones especiales",
    confirmBooking: "Confirmar reserva",
    bookingConfirmed: "Reserva confirmada",
    referenceLabel: "Referencia",
    weWillContact:
      "Su solicitud de reserva ha sido enviada. Le contactaremos en un plazo de 30 minutos.",
    paymentError: "El pago ha fallado. Inténtelo de nuevo.",
  },
  el: {
    navFleet: "Οχήματα",
    navService: "Υπηρεσίες",
    navRoutes: "Διαδρομές",
    navReviews: "Κριτικές",
    navContact: "Επικοινωνία",
    bookNow: "Κράτηση τώρα",
    alwaysAvailable: "Διαθέσιμοι 24 ώρες, κάθε μέρα",
    heroEyebrow: "Ιδιωτική υπηρεσία σοφέρ · Antalya",
    heroTitle: "Premium μεταφορές από το αεροδρόμιο<br />στην Antalya",
    heroSubtitle:
      "Ιδιωτικές μεταφορές με σοφέρ από το αεροδρόμιο της Antalya προς Belek, Side, Kemer και Alanya.",
    campaignBadge: "Online Προσφορά",
    campaignDiscount: "Ειδική τιμή",
    campaignScope: "σε όλες τις τιμές μεταφοράς",
    campaignApplied: "Εφαρμόστηκε η online ειδική τιμή",
    onlineDiscountShort: "Online ειδική τιμή",
    discountPricesShown: "Εμφανίζονται οι online ειδικές τιμές",
    bookTransfer: "Κράτηση μεταφοράς",
    instantQuote: "Άμεση προσφορά τιμής",
    googleRated: "Βαθμολογία Google",
    trustedGuests: "Κρατήσεις από πάνω από 2.500 επισκέπτες",
    discover: "Ανακαλύψτε",
    privateJourney: "Το ιδιωτικό σας ταξίδι",
    quoteTitle: "Πού θα θέλατε να σας μεταφέρουμε;",
    pickup: "Παραλαβή",
    destination: "Προορισμός",
    date: "Ημερομηνία",
    tripType: "Τύπος διαδρομής",
    oneWay: "Απλή διαδρομή",
    roundTrip: "Μετ' επιστροφής",
    roundTripHint:
      "Στη διαδρομή μετ' επιστροφής, η επιστροφή ακολουθεί την ίδια διαδρομή αντίστροφα.",
    returnDate: "Ημερομηνία επιστροφής",
    returnPickupTime: "Ώρα παραλαβής επιστροφής",
    returnFlightNumber: "Αριθμός πτήσης επιστροφής",
    arrivalDate: "Ημερομηνία άφιξης",
    arrivalFlightTime: "Ώρα άφιξης πτήσης",
    arrivalFlightNumber: "Αριθμός πτήσης άφιξης",
    roundTripPriceNote: "Μετ' επιστροφής · 2 διαδρομές",
    guests: "Επισκέπτες",
    airportOption: "Αεροδρόμιο Antalya (AYT)",
    hotelOption: "Ξενοδοχείο",
    privateAddressOption: "Ιδιωτική διεύθυνση",
    pickupAddress: "Πλήρης διεύθυνση παραλαβής",
    pickupAddressPlaceholder: "Όνομα ξενοδοχείου, οδός, αριθμός και περιοχή",
    dropoffAddress: "Πλήρης διεύθυνση προορισμού",
    dropoffAddressPlaceholder: "Όνομα ξενοδοχείου, οδός, αριθμός και περιοχή",
    dropoffAddressRequired:
      "Η διεύθυνση προορισμού πρέπει να έχει μήκος από 6 έως 160 χαρακτήρες.",
    customDestinationPrice:
      "Η τιμή θα επιβεβαιωθεί μετά τον έλεγχο της διεύθυνσης προορισμού.",
    selectDestination: "Επιλέξτε προορισμό",
    airportReturnPrice:
      "Η τιμή θα επιβεβαιωθεί μετά τον έλεγχο του ξενοδοχείου ή της διεύθυνσης παραλαβής.",
    oneGuest: "1 επισκέπτης",
    twoGuests: "2 επισκέπτες",
    threeGuests: "3 επισκέπτες",
    fourGuests: "4 επισκέπτες",
    fiveGuests: "5 επισκέπτες",
    sixGuests: "6 επισκέπτες",
    sevenGuests: "7 επισκέπτες",
    viewQuote: "Προβολή τιμής",
    flightTracking: "Παρακολούθηση πτήσης σε πραγματικό χρόνο",
    fixedPrice: "Εγγυημένη σταθερή τιμή",
    meetGreet: "Προσωπική υποδοχή",
    speakingDrivers: "Ομιλούν Γερμανικά & Αγγλικά",
    tbLicensed: "Πιστοποίηση TÜRSAB",
    tbFlightTracking: "Παρακολούθηση πτήσης",
    tbFixedPrice: "Εγγύηση σταθερής τιμής",
    tb247Concierge: "24/7 Concierge",
    tbChildSeats: "Παιδικά καθίσματα περιλαμβάνονται",
    welcomeEyebrow: "Καλώς ήρθατε στο υψηλότερο επίπεδο",
    welcomeTitle: "Ταξιδέψτε με στιλ.<br />Φτάστε ξεκούραστοι.",
    welcomeBody:
      "Από τη στιγμή της προσγείωσής σας, κάθε λεπτομέρεια είναι φροντισμένη. Η ομάδα μας στο αεροδρόμιο σας υποδέχεται, ο σοφέρ σας σταθμεύει στο σημείο παραλαβής και οι αποσκευές σας φορτώνονται σε ένα προσεκτικά προετοιμασμένο ιδιωτικό όχημα.",
    ourStandards: "Τα πρότυπα υπηρεσιών μας",
    concierge: "Υπηρεσία Concierge",
    guestsWelcomed: "Επισκέπτες που υποδεχθήκαμε",
    guestRating: "Μέση βαθμολογία",
    privateTransfers: "Ιδιωτικές μεταφορές",
    fleetEyebrow: "Ο στόλος μας",
    fleetTitle: "Ο ιδιωτικός σας χώρος,<br />τέλειος μέχρι την τελευταία λεπτομέρεια.",
    fleetIntro:
      "Ταξιδέψτε άνετα με άφθονο χώρο για την οικογένεια, τις αποσκευές γκολφ και τις βαλίτσες.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Ευρύχωρη VIP μεταφορά για μεγαλύτερες ομάδες με άφθονο χώρο για επιβάτες και αποσκευές.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Μια άνετη ιδιωτική καμπίνα για οικογένειες και μικρές ομάδες.",
    signatureFleet: "Signature στόλος",
    passengers: "Επιβάτες",
    suitcases: "Βαλίτσες",
    luggageLabel: "Μεγάλες αποσκευές",
    capacitySwitchedSprinter:
      "Οι επιβάτες και οι αποσκευές υπερβαίνουν το Vito — έγινε αλλαγή σε Mercedes Sprinter.",
    capacityNoVehicle:
      "Τόσοι επιβάτες και αποσκευές υπερβαίνουν τα οχήματά μας. Παρακαλούμε επικοινωνήστε μαζί μας μέσω WhatsApp.",
    leatherSeats: "Premium δερμάτινα καθίσματα",
    wifi: "Δωρεάν WiFi",
    water: "Παγωμένο εμφιαλωμένο νερό",
    childSeats: "Παιδικά καθίσματα κατόπιν αιτήματος",
    television: "Τηλεόραση στο όχημα",
    coldDrinks: "Κρύα ροφήματα",
    snacks: "Σνακ",
    nameSignGreeting: "Υποδοχή στο σημείο J / 777",
    reserveVehicle: "Κράτηση οχήματος",
    insideVclass: "Στο εσωτερικό του Sprinter",
    interiorTitle: "Ένα ιδιωτικό lounge ανάμεσα<br />στο αεροδρόμιο και το ξενοδοχείο.",
    serviceEyebrow: "Το πρότυπο Antalya VIP",
    serviceTitle: "Κάτι περισσότερο από μεταφορά.<br />Μια ξεχωριστή υποδοχή.",
    serviceIntro:
      "Φροντίδα επιπέδου ξενοδοχείου, έμπειροι τοπικοί σοφέρ και απόλυτη ασφάλεια από το αεροδρόμιο μέχρι το θέρετρο.",
    trackingTitle: "Παρακολούθηση πτήσης",
    trackingBody:
      "Παρακολουθούμε την πτήση σας σε πραγματικό χρόνο και προσαρμόζουμε την παραλαβή αυτόματα και δωρεάν.",
    chauffeurTitle: "Επαγγελματίες σοφέρ",
    chauffeurBody:
      "Πάντα περιποιημένοι, διακριτικοί και επιλεγμένοι για την τοπική τους γνώση και το υψηλότερο επίπεδο εξυπηρέτησης.",
    greetTitle: "Meet & Greet",
    greetBody:
      "Στις διεθνείς αφίξεις, η ομάδα μας στο αεροδρόμιο σας υποδέχεται στο σημείο J / 777, καλεί τον σοφέρ σας στο σημείο παραλαβής και βοηθά με τις αποσκευές.",
    supportTitle: "24/7 Concierge",
    supportBody:
      "Πριν, κατά τη διάρκεια και μετά το ταξίδι σας, ένας προσωπικός σύμβουλος είναι πάντα διαθέσιμος.",
    priceTitle: "Σταθερές τιμές",
    priceBody:
      "Η επιβεβαιωμένη τιμή είναι η τελική τιμή. Ο χρόνος αναμονής, η στάθμευση και οι καθυστερήσεις πτήσεων περιλαμβάνονται.",
    familyTitle: "Για οικογένειες",
    familyBody:
      "Κατάλληλα παιδικά καθίσματα, ευρύχωροι εσωτερικοί χώροι και υπομονετική βοήθεια για μια ξεκούραστη άφιξη.",
    routesEyebrow: "Οι πιο δημοφιλείς διαδρομές μας",
    routesTitle: "Από το αεροδρόμιο της Antalya<br />στην Τουρκική Ριβιέρα.",
    routesIntro:
      "Όλες οι τιμές ισχύουν ανά όχημα, όχι ανά άτομο, και περιλαμβάνουν 90 λεπτά χρόνου αναμονής.",
    golfFavourite: "Αγαπημένο των γκολφ",
    from: "Από",
    reviewsEyebrow: "Κριτικές επισκεπτών",
    reviewsTitle: "Μια εξυπηρέτηση που μένει<br />για καιρό στη μνήμη.",
    googleReviews: "Βάσει 387 επαληθευμένων κριτικών Google",
    reviewOne:
      "„Ο οδηγός μας περίμενε παρά την καθυστέρηση της πτήσης κατά 90 λεπτά. Το όχημα ήταν άψογο, ευχάριστα δροσερό και ήδη εξοπλισμένο με τα δύο παιδικά καθίσματα. Ακριβώς η υποδοχή που χρειαζόταν η οικογένειά μας.“",
    reviewTwo:
      "„Από την πρώτη επαφή μέσω WhatsApp μέχρι την άφιξη στο Belek, απόλυτα κορυφαία. Ακριβής στην ώρα, διακριτικός και πολύ επαγγελματίας. Ακόμη και οι τσάντες γκολφ μας χώρεσαν άνετα.“",
    reviewThree:
      "„Έμοιαζε με την υπηρεσία σοφέρ ενός ξενοδοχείου, όχι με ταξί αεροδρομίου. Σαφής επικοινωνία, ένα άψογο όχημα και ένας ειλικρινά ευγενικός οδηγός.“",
    trustedBy: "Επιλογή επισκεπτών των κορυφαίων θερέτρων της Antalya",
    faqEyebrow: "Συχνές ερωτήσεις",
    faqTitle: "Πριν από το ταξίδι σας.",
    faqCatArrival: "Άφιξη & Μεταφορά",
    faqCatJourney: "Επιστροφή & Διαδρομή",
    faqCatPayment: "Πληρωμή & Τιμή",
    faqCatVehicle: "Όχημα & Αποσκευές",
    faqReminder: "Παρακαλούμε διαβάστε την ενότητα συχνών ερωτήσεων στον ιστότοπό μας πριν από το ταξίδι σας.",
    viewFaq: "Δείτε τις συχνές ερωτήσεις",
    faqIntro:
      "Όλα όσα πρέπει να γνωρίζετε για την ιδιωτική σας μεταφορά από το αεροδρόμιο της Antalya.",
    askQuestion: "Κάντε μια ερώτηση",
    faqOneQ: "Τι γίνεται σε περίπτωση καθυστέρησης πτήσης;",
    faqOneA:
      "Δεν χρειάζεται να κάνετε τίποτα. Παρακολουθούμε την πτήση σας σε πραγματικό χρόνο και προσαρμόζουμε αυτόματα την ώρα παραλαβής σας. Ποτέ δεν χρεώνουμε καθυστερήσεις της αεροπορικής εταιρείας – ο σοφέρ σας είναι εκεί όποτε κι αν προσγειωθείτε, και τα πρώτα 90 λεπτά μετά την προσγείωση περιλαμβάνονται πάντα.",
    faqTwoQ:
      "Φτάνω με διεθνή πτήση. Πώς γίνεται η παραλαβή;",
    faqTwoA:
      "Μετά τον έλεγχο διαβατηρίων και την παραλαβή αποσκευών, ακολουθείτε τους υπόλοιπους επιβάτες προς την περιοχή Meet & Greet και έρχεστε στο σημείο μας J / 777. Απλώς πείτε το όνομά σας στο προσωπικό μας – αυτό αρκεί. Η ομάδα μας ενημερώνει αμέσως τον σοφέρ σας· εκείνος εισέρχεται στο αεροδρόμιο και βρίσκεται έτοιμος στο σημείο παραλαβής, ενώ ο συνεργάτης μας σας συνοδεύει στο όχημα. Όλη η διαδικασία διαρκεί περίπου 7–8 λεπτά.",
    faqSixQ:
      "Φτάνω με εσωτερική πτήση. Πού θα βρω τον σοφέρ μου;",
    faqSixA:
      "Η περιοχή Meet & Greet είναι διαθέσιμη αποκλειστικά για διεθνείς αφίξεις. Γι' αυτό εξυπηρετούμε τους επισκέπτες εσωτερικών πτήσεων διαφορετικά: Σας στέλνουμε πριν τη μεταφορά τον αριθμό τηλεφώνου του σοφέρ σας. Μόλις προσγειωθείτε, ενημερώστε τον σύντομα – θα σας παραλάβει στην αίθουσα αφίξεων.",
    faqSevenQ: "Τι κάνω αν δεν υπάρχει κανείς στο σημείο J / 777;",
    faqSevenA:
      "Στο σημείο μας βρίσκονται συνεχώς δύο συνεργάτες, με μοναδικό καθήκον να συνοδεύουν τους αφικνούμενους επισκέπτες στο όχημά τους. Αν το σημείο είναι στιγμιαία χωρίς προσωπικό, ένας συνάδελφος συνοδεύει τη στιγμή εκείνη τον προηγούμενο επισκέπτη – κάθε συνοδεία διαρκεί περίπου 7–8 λεπτά. Παρακαλούμε περιμένετε περίπου 10 λεπτά. Αν μέχρι τότε δεν έχει επιστρέψει κανείς, γράψτε μας μέσω WhatsApp: Ενημερώνουμε αμέσως τον σοφέρ σας, τον βάζουμε να σταθμεύσει στο πλησιέστερο σημείο και σας οδηγούμε απευθείας στο όχημά σας χωρίς άλλη αναμονή.",
    faqEightQ:
      "Τι ισχύει αν χρειαστώ περισσότερο από 90 λεπτά για να βγω από το αεροδρόμιο;",
    faqEightA:
      "Τα πρώτα 90 λεπτά μετά την προσγείωση περιλαμβάνονται δωρεάν – σαφώς περισσότερα από όσα απαιτούν ο έλεγχος διαβατηρίων, οι αποσκευές και το τελωνείο – και αυτό το χρονικό διάστημα μετατοπίζεται αυτόματα σε περίπτωση καθυστέρησης πτήσης. Μόνο αν παραμείνετε περισσότερο στο τερματικό για λόγους που δεν σχετίζονται με την πτήση σας, προστίθεται μια συνεισφορά στα έξοδα στάθμευσης 5 € για κάθε επιπλέον ώρα. Στην πράξη αυτό δεν συμβαίνει σχεδόν ποτέ: Σχεδόν όλοι οι επισκέπτες μας βρίσκονται καθ' οδόν πολύ νωρίτερα.",
    faqNineQ: "Πώς πληρώνω;",
    faqNineA:
      "Πληρώνετε τον σοφέρ σας στην αρχή της διαδρομής μετρητοίς – πληρωμή με κάρτα δεν είναι δυνατή. Οι τιμές ορίζονται σε ευρώ (EUR): Το σταθερό ποσό αντιστοιχεί ακριβώς σε αυτό που είδατε κατά την κράτηση – ανά όχημα, με όλα τα τέλη αεροδρομίου και στάθμευσης, χωρίς μεταγενέστερες προσθήκες. Θα προτιμούσατε να πληρώσετε σε δολάρια ΗΠΑ ή τουρκικές λίρες; Γράψτε μας εκ των προτέρων μέσω WhatsApp για ξεχωριστή τιμή, καθώς η ισοτιμία διαφέρει. Ο σοφέρ σας σας καλωσορίζει, φορτώνει τις αποσκευές σας και τοποθετεί τα παιδικά καθίσματα που ζητήσατε· μετά την πληρωμή αρχίζει η διαδρομή σας.",
    faqTenQ: "Πώς διατηρώ επαφή στη μεταφορά επιστροφής;",
    faqTenA:
      "Μόλις επιβεβαιώσετε την ημερομηνία και την ώρα της επιστροφής σας μέσω WhatsApp με την ομάδα μας, σας αναθέτουμε ένα όχημα μερικές ώρες πριν τη μεταφορά και σας στέλνουμε φωτογραφίες του μέσω WhatsApp – κατόπιν αιτήματος και τον αριθμό τηλεφώνου του σοφέρ σας. Όταν ο σοφέρ σας φτάσει στο ξενοδοχείο, ενημερώνει τη ρεσεψιόν, η οποία ειδοποιεί το δωμάτιό σας μόλις το όχημα είναι έτοιμο. Οι σοφέρ μας δεν καλούν ποτέ απευθείας τους επισκέπτες: Όλη η επικοινωνία γίνεται μέσω της κεντρικής μας εξυπηρέτησης WhatsApp, ώστε να γνωρίζετε πάντα ακριβώς με ποιον μιλάτε.",
    faqElevenQ: "Μπορώ να ακυρώσω ή να αλλάξω την κράτησή μου;",
    faqElevenA:
      "Ναι, και πάντα δωρεάν. Επειδή δεν λαμβάνουμε προκαταβολή, δεν υπάρχει κάτι προς επιστροφή ούτε αναμονή για τα χρήματά σας — αν αλλάξουν τα σχέδιά σας, αρκεί ένα μήνυμα μέσω WhatsApp. Αλλαγές ώρας, αριθμού πτήσης ή διεύθυνσης προορισμού τις διευθετούμε εξίσου, χωρίς επιπλέον χρέωση.",
    faqTwelveQ: "Σε ποιο νόμισμα μπορώ να πληρώσω;",
    faqTwelveA:
      "Οι τιμές μας ορίζονται σε ευρώ (EUR) και πληρώνονται μετρητοίς· κάρτες δεν γίνονται δεκτές. Αν θέλετε να πληρώσετε σε δολάρια ΗΠΑ ή τουρκικές λίρες, το ποσό εξαρτάται από την ημερήσια ισοτιμία — γι' αυτό γράψτε μας πριν τη μεταφορά σας μέσω WhatsApp. Σας δίνουμε μια σαφή τιμή και ενημερώνουμε τον σοφέρ σας, ώστε να μη γίνεται καμία διαπραγμάτευση μέσα στο όχημα.",
    faqThirteenQ: "Πόσες αποσκευές μπορώ να πάρω μαζί μου;",
    faqThirteenA:
      "Κατά κανόνα μία μεγάλη βαλίτσα και μία χειραποσκευή ανά άτομο. Αν έχετε περισσότερα — μια επιπλέον βαλίτσα, μια τσάντα γκολφ, ένα καρότσι, πέδιλα σκι ή ένα ποδήλατο — απλώς πείτε το κατά την κράτηση· διαθέτουμε χωρίς επιπλέον χρέωση όχημα με κατάλληλη χωρητικότητα. Το μόνο που έχει σημασία είναι να το γνωρίζουμε εκ των προτέρων. Ένα Mercedes Vito χωράει έως 6 άτομα, ένα Sprinter έως 12.",
    faqFourteenQ: "Τι γίνεται αν καθυστερήσω στη μεταφορά επιστροφής;",
    faqFourteenA:
      "Ο σοφέρ σας βρίσκεται στην καθορισμένη ώρα στο ξενοδοχείο σας και περιμένει 15 λεπτά δωρεάν. Αν διαφαίνεται καθυστέρηση, αρκεί ένα μήνυμα μέσω WhatsApp: Ελέγχουμε την ώρα της πτήσης σας, ενημερώνουμε τον σοφέρ σας και συντονίζουμε τη διαδικασία μαζί σας. Στόχος μας δεν είναι να σας βιάσουμε, αλλά να σας μεταφέρουμε ξεκούραστους στην πτήση σας.",
    faqFifteenQ: "Είναι δυνατές ενδιάμεσες στάσεις κατά τη διαδρομή;",
    faqFifteenA:
      "Φυσικά. Αν θέλετε να σταματήσετε σε ένα σούπερ μάρκετ ή ένα φαρμακείο ή για μια σύντομη φωτογραφία, απλώς πείτε το κατά την κράτηση ή μέσω WhatsApp — σχεδιάζουμε τη διαδρομή αναλόγως. Αν μια στάση σας απομακρύνει σημαντικά από τη διαδρομή σας, σας ενημερώνουμε πριν την αναχώρηση αν προστίθεται κάτι· τίποτα δεν σας εκπλήσσει εκ των υστέρων.",
    faqThreeQ: "Διατίθενται παιδικά καθίσματα;",
    faqThreeA:
      "Ναι. Βρεφικά καθίσματα, παιδικά καθίσματα και καθίσματα ανύψωσης διατίθενται δωρεάν κατόπιν προκράτησης.",
    faqFourQ: "Μπορούν να μεταφερθούν τσάντες γκολφ και μεγάλες αποσκευές;",
    faqFourA:
      "Ναι. Τα Sprinter και Vito είναι ιδανικά για ομάδες γκολφ. Ενημερώστε μας για τις αποσκευές σας και σχεδιάζουμε το κατάλληλο όχημα.",
    faqFiveQ: "Είναι η εμφανιζόμενη τιμή τελική;",
    faqFiveA:
      "Ναι. Η τιμή της κράτησής σας είναι το ποσό που παραδίδετε μετρητοίς στον σοφέρ σας – ανά όχημα, με όλα τα τέλη αεροδρομίου, τα έξοδα στάθμευσης και τα πρώτα 90 λεπτά χρόνου αναμονής. Δεν υπάρχουν κρυφές χρεώσεις.",
    contactEyebrow: "Το ταξίδι σας ξεκινά εδώ",
    contactTitle: "Φτάστε εξαιρετικά<br />στην Antalya.",
    contactBody:
      "Κάντε την κράτησή σας online σε λιγότερο από δύο λεπτά ή μιλήστε απευθείας με την ομάδα Concierge μας 24/7.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Απάντηση συνήθως σε λίγα λεπτά",
    callUs: "Καλέστε 24/7",
    emailUs: "Email Concierge",
    replyHour: "Απάντηση εντός μίας ώρας",
    fromAirport: "Από το αεροδρόμιο της Antalya",
    perVehicle: "ανά όχημα · σταθερή τιμή",
    footerTagline:
      "Ιδιωτικές υπηρεσίες σοφέρ σε ολόκληρη την Τουρκική Ριβιέρα.",
    explore: "Ανακαλύψτε",
    information: "Πληροφορίες",
    licensed: "Αδειοδοτημένος πάροχος ιδιωτικών μεταφορών · Σύμφωνος με TÜRSAB",
    quoteReady: "Η ιδιωτική σας μεταφορά",
    vehicle: "Όχημα",
    journeyTime: "Χρόνος διαδρομής",
    totalFixed: "Συνολική τιμή",
    quoteIncludes:
      "Περιλαμβάνει Meet & Greet, παρακολούθηση πτήσης, στάθμευση, 90 λεπτά χρόνου αναμονής και εμφιαλωμένο νερό.",
    confirmWhatsapp: "Επιβεβαίωση μέσω WhatsApp",
    chatWithUs: "Συνομιλήστε μαζί μας",
    bookNowCta: "Κράτηση τώρα",
    backToQuote: "Πίσω",
    yourDetails: "Τα στοιχεία σας",
    fullName: "Ονοματεπώνυμο",
    emailLabel: "Email",
    phoneLabel: "Τηλέφωνο / WhatsApp",
    flightNumber: "Αριθμός πτήσης",
    flightArrivalTime: "Ώρα άφιξης",
    notesLabel: "Ειδικά αιτήματα",
    confirmBooking: "Επιβεβαίωση κράτησης",
    bookingConfirmed: "Η κράτηση επιβεβαιώθηκε",
    referenceLabel: "Αναφορά",
    weWillContact:
      "Το αίτημα κράτησής σας εστάλη. Θα επικοινωνήσουμε μαζί σας εντός 30 λεπτών.",
    paymentError: "Η πληρωμή απέτυχε. Παρακαλούμε δοκιμάστε ξανά.",
  },
  he: {
    navFleet: "רכבים",
    navService: "שירות",
    navRoutes: "מסלולים",
    navReviews: "ביקורות",
    navContact: "צור קשר",
    bookNow: "הזמינו עכשיו",
    alwaysAvailable: "זמינים 24 שעות ביממה, בכל יום",
    heroEyebrow: "שירות שופר פרטי · Antalya",
    heroTitle: "העברות פרימיום משדה התעופה<br />ב-Antalya",
    heroSubtitle:
      "העברות פרטיות עם שופר משדה התעופה Antalya לבלק, סידה, קמר ואלניה.",
    campaignBadge: "מבצע אונליין",
    campaignDiscount: "מחיר מיוחד",
    campaignScope: "על כל מחירי ההעברות",
    campaignApplied: "מחיר אונליין מיוחד הוחל",
    onlineDiscountShort: "מחיר אונליין מיוחד",
    discountPricesShown: "מוצגים מחירי אונליין מיוחדים",
    bookTransfer: "הזמינו העברה",
    instantQuote: "קבלו מחיר מיידי",
    googleRated: "דירוג Google",
    trustedGuests: "הוזמן על ידי יותר מ-2,500 אורחים",
    discover: "גלו",
    privateJourney: "המסע הפרטי שלכם",
    quoteTitle: "לאן תרצו שניקח אתכם?",
    pickup: "איסוף",
    destination: "יעד",
    date: "תאריך",
    tripType: "סוג הנסיעה",
    oneWay: "נסיעה בכיוון אחד",
    roundTrip: "הלוך ושוב",
    roundTripHint:
      "בנסיעת הלוך ושוב, נסיעת החזור מתבצעת באותו מסלול בכיוון ההפוך.",
    returnDate: "תאריך חזור",
    returnPickupTime: "שעת איסוף לחזור",
    returnFlightNumber: "מספר טיסת החזור",
    arrivalDate: "תאריך הגעה",
    arrivalFlightTime: "שעת נחיתת הטיסה",
    arrivalFlightNumber: "מספר טיסת ההגעה",
    roundTripPriceNote: "הלוך ושוב · 2 נסיעות",
    guests: "אורחים",
    airportOption: "שדה התעופה Antalya (AYT)",
    hotelOption: "מלון",
    privateAddressOption: "כתובת פרטית",
    pickupAddress: "כתובת איסוף מלאה",
    pickupAddressPlaceholder: "שם המלון, רחוב, מספר בית ושכונה",
    dropoffAddress: "כתובת יעד מלאה",
    dropoffAddressPlaceholder: "שם המלון, רחוב, מספר בית ושכונה",
    dropoffAddressRequired:
      "כתובת היעד חייבת להיות באורך של בין 6 ל-160 תווים.",
    customDestinationPrice:
      "המחיר יאושר לאחר בדיקת כתובת היעד.",
    selectDestination: "בחרו יעד",
    airportReturnPrice:
      "המחיר יאושר לאחר בדיקת המלון או כתובת האיסוף.",
    oneGuest: "אורח 1",
    twoGuests: "2 אורחים",
    threeGuests: "3 אורחים",
    fourGuests: "4 אורחים",
    fiveGuests: "5 אורחים",
    sixGuests: "6 אורחים",
    sevenGuests: "7 אורחים",
    viewQuote: "הצג מחיר",
    flightTracking: "מעקב טיסות בזמן אמת",
    fixedPrice: "מחיר קבוע מובטח",
    meetGreet: "קבלת פנים אישית",
    speakingDrivers: "דוברי גרמנית ואנגלית",
    tbLicensed: "מוסמך TÜRSAB",
    tbFlightTracking: "מעקב טיסות",
    tbFixedPrice: "ערבות מחיר קבוע",
    tb247Concierge: "קונסיירז' 24/7",
    tbChildSeats: "כיסאות בטיחות לילדים כלולים",
    welcomeEyebrow: "ברוכים הבאים לרמה הגבוהה ביותר",
    welcomeTitle: "נסעו בסטייל.<br />הגיעו רגועים.",
    welcomeBody:
      "מרגע נחיתתכם, דאגנו לכל פרט. צוות שדה התעופה שלנו יקבל את פניכם, השופר שלכם יגיע לנקודת האיסוף והמזוודות שלכם ייטענו לרכב פרטי שהוכן בקפידה.",
    ourStandards: "תקני השירות שלנו",
    concierge: "שירות קונסיירז'",
    guestsWelcomed: "אורחים שקיבלנו",
    guestRating: "דירוג ממוצע",
    privateTransfers: "העברות פרטיות",
    fleetEyebrow: "הצי שלנו",
    fleetTitle: "המרחב הפרטי שלכם,<br />מושלם עד לפרט האחרון.",
    fleetIntro:
      "נסעו בנוחות עם מרחב נדיב למשפחה, ציוד גולף ומזוודות.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "הובלת VIP מרווחת לקבוצות גדולות יותר עם מקום רב לנוסעים ולמטען.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "תא פרטי ונוח למשפחות ולקבוצות קטנות.",
    signatureFleet: "צי Signature",
    passengers: "נוסעים",
    suitcases: "מזוודות",
    luggageLabel: "מטען גדול",
    capacitySwitchedSprinter:
      "מספר הנוסעים והמטען חורגים מקיבולת ה-Vito — הוסב ל-Mercedes Sprinter.",
    capacityNoVehicle:
      "מספר כה גדול של נוסעים ומטען חורג מקיבולת הרכבים שלנו. אנא צרו איתנו קשר ב-WhatsApp.",
    leatherSeats: "מושבי עור פרימיום",
    wifi: "WiFi חינם",
    water: "מים מינרליים מקוררים",
    childSeats: "כיסאות בטיחות לילדים לפי בקשה",
    television: "טלוויזיה ברכב",
    coldDrinks: "משקאות קרים",
    snacks: "חטיפים",
    nameSignGreeting: "קבלת פנים בדלפק J / 777",
    reserveVehicle: "שריינו רכב",
    insideVclass: "פנים ה-Sprinter",
    interiorTitle: "טרקלין פרטי בין<br />שדה התעופה למלון.",
    serviceEyebrow: "תקן ה-VIP של Antalya",
    serviceTitle: "יותר מהעברה.<br />קבלת פנים מיוחדת.",
    serviceIntro:
      "תשומת לב ברמת מלון, שופרים מקומיים מנוסים וביטחון מוחלט משדה התעופה ועד לריזורט.",
    trackingTitle: "מעקב טיסות",
    trackingBody:
      "אנו עוקבים אחר טיסתכם בזמן אמת ומתאימים את האיסוף אוטומטית וללא תשלום.",
    chauffeurTitle: "שופרים מקצועיים",
    chauffeurBody:
      "תמיד מטופחים, דיסקרטיים ונבחרים בזכות היכרותם עם האזור ותקן השירות הגבוה ביותר.",
    greetTitle: "Meet & Greet",
    greetBody:
      "בהגעות בינלאומיות צוות שדה התעופה שלנו יקבל את פניכם בדלפק J / 777, יזמן את השופר שלכם לנקודת האיסוף ויסייע עם המטען.",
    supportTitle: "קונסיירז' 24/7",
    supportBody:
      "לפני, במהלך ואחרי המסע שלכם, איש קשר אישי זמין תמיד.",
    priceTitle: "מחירים קבועים",
    priceBody:
      "המחיר המאושר הוא המחיר הסופי. זמן המתנה, חניה ועיכובי טיסה כלולים.",
    familyTitle: "למשפחות",
    familyBody:
      "כיסאות בטיחות מתאימים, פנים מרווחים וסיוע סבלני להגעה רגועה.",
    routesEyebrow: "הנסיעות הפופולריות ביותר שלנו",
    routesTitle: "משדה התעופה Antalya<br />אל הריביירה הטורקית.",
    routesIntro:
      "כל המחירים הם לרכב, לא לאדם, וכוללים 90 דקות זמן המתנה.",
    golfFavourite: "מועדף בקרב שחקני גולף",
    from: "מ-",
    reviewsEyebrow: "ביקורות אורחים",
    reviewsTitle: "שירות שנשאר<br />זמן רב בזיכרון.",
    googleReviews: "מבוסס על 387 ביקורות Google מאומתות",
    reviewOne:
      "„הנהג שלנו המתין למרות עיכוב טיסה של 90 דקות. הרכב היה ללא רבב, נעים וקריר וכבר מצויד בשני כיסאות בטיחות לילדים. בדיוק קבלת הפנים שמשפחתנו הייתה צריכה.“",
    reviewTwo:
      "„מהמגע הראשון ב-WhatsApp ועד ההגעה לבלק, ברמה מעולה לחלוטין. בזמן, דיסקרטי ומקצועי מאוד. גם לתיקי הגולף שלנו היה מקום בנוחות.“",
    reviewThree:
      "„זה הרגיש כמו שירות שופר של מלון, לא כמו מונית שדה תעופה. תקשורת ברורה, רכב ללא רבב ונהג אדיב בכנות.“",
    trustedBy: "הוזמן על ידי אורחי הריזורטים המובילים ב-Antalya",
    faqEyebrow: "שאלות נפוצות",
    faqTitle: "לפני המסע שלכם.",
    faqCatArrival: "הגעה והעברה",
    faqCatJourney: "חזור ונסיעה",
    faqCatPayment: "תשלום ומחיר",
    faqCatVehicle: "רכב ומטען",
    faqReminder: "אנא קראו את מדור השאלות הנפוצות באתר שלנו לפני המסע.",
    viewFaq: "צפו בשאלות הנפוצות",
    faqIntro:
      "כל מה שאתם צריכים לדעת על ההעברה הפרטית שלכם משדה התעופה ב-Antalya.",
    askQuestion: "שאלו שאלה",
    faqOneQ: "מה קורה במקרה של עיכוב טיסה?",
    faqOneA:
      "אינכם צריכים לעשות דבר. אנו עוקבים אחר טיסתכם בזמן אמת ומתאימים את שעת האיסוף שלכם אוטומטית. איננו גובים לעולם על עיכובים של חברת התעופה — השופר שלכם ימתין מתי שלא תנחתו, ו-90 הדקות הראשונות לאחר הנחיתה כלולות תמיד.",
    faqTwoQ:
      "אני מגיע בטיסה בינלאומית. כיצד מתבצע האיסוף?",
    faqTwoA:
      "לאחר ביקורת הדרכונים ואיסוף המזוודות, עקבו אחר שאר הנוסעים אל אזור ה-Meet & Greet והגיעו לדלפק שלנו J / 777. פשוט מסרו את שמכם לצוות שלנו — זה מספיק. הצוות שלנו יעדכן מיד את השופר שלכם; הוא ייכנס לשדה התעופה ויהיה מוכן בנקודת האיסוף בזמן שאיש הצוות שלנו ילווה אתכם אל הרכב. כל התהליך אורך כ-7–8 דקות.",
    faqSixQ:
      "אני מגיע בטיסה פנים-ארצית. היכן אמצא את השופר שלי?",
    faqSixA:
      "אזור ה-Meet & Greet זמין באופן בלעדי להגעות בינלאומיות. לכן אנו מטפלים באורחים בטיסות פנים באופן שונה: נשלח לכם לפני ההעברה את מספר הטלפון של השופר שלכם. לאחר הנחיתה, עדכנו אותו בקצרה — הוא יאסוף אתכם באולם ההגעות.",
    faqSevenQ: "מה עליי לעשות אם אין אף אחד בדלפק J / 777?",
    faqSevenA:
      "בדלפק שלנו מוצבים ברציפות שני אנשי צוות, שתפקידם היחיד הוא ללוות אורחים מגיעים אל הרכב שלהם. אם הדלפק אינו מאויש לרגע, זה משום שעמית מלווה כרגע את האורח שלפניכם — כל ליווי אורך כ-7–8 דקות. אנא המתינו כ-10 דקות. אם עד אז אף אחד לא חזר, כתבו לנו ב-WhatsApp: נעדכן מיד את השופר שלכם, נדאג שיעצור בנקודה הקרובה ביותר ונוביל אתכם ישירות לרכב ללא המתנה נוספת.",
    faqEightQ:
      "מה קורה אם אצטרך יותר מ-90 דקות כדי לצאת משדה התעופה?",
    faqEightA:
      "90 הדקות הראשונות לאחר הנחיתה כלולות ללא תשלום — הרבה יותר מהזמן הדרוש לביקורת דרכונים, מטען ומכס — וחלון זמן זה נדחה אוטומטית במקרה של עיכובי טיסה. רק אם תישארו זמן רב יותר בטרמינל מסיבות שאינן קשורות לטיסתכם, יתווסף דמי חניה של 5 € לכל שעה נוספת. בפועל זה כמעט אף פעם לא קורה: כמעט כל האורחים שלנו כבר בדרכם הרבה קודם.",
    faqNineQ: "כיצד אני משלם?",
    faqNineA:
      "אתם משלמים לשופר שלכם במזומן בתחילת הנסיעה — תשלום בכרטיס אינו אפשרי. המחירים נקבעים ביורו (EUR): הסכום הקבוע תואם בדיוק למה שראיתם בעת ההזמנה — לרכב, כולל כל אגרות שדה התעופה והחניה, ללא תוספות מאוחרות. מעדיפים לשלם בדולר אמריקאי או בלירה טורקית? כתבו לנו מראש ב-WhatsApp למחיר נפרד, שכן שער החליפין שונה. השופר שלכם יקבל את פניכם, ייטען את המטען ויתקין את כיסאות הבטיחות הרצויים; לאחר התשלום נסיעתכם מתחילה.",
    faqTenQ: "כיצד אשמור על קשר בהעברת החזור?",
    faqTenA:
      "לאחר שתאשרו את תאריך ושעת נסיעת החזור שלכם ב-WhatsApp עם הצוות שלנו, נשייך לכם את הרכב מספר שעות לפני ההעברה ונשלח לכם תמונות שלו ב-WhatsApp — ולפי בקשה גם את מספר הטלפון של השופר שלכם. כאשר השופר שלכם מגיע למלון, הוא מעדכן את הקבלה, שמודיעה לחדרכם ברגע שהרכב מוכן. השופרים שלנו לעולם אינם מתקשרים ישירות לאורחים: כל התקשורת עוברת דרך מוקד ה-WhatsApp המרכזי שלנו, כך שתמיד תדעו בדיוק עם מי אתם מדברים.",
    faqElevenQ: "האם אוכל לבטל או לשנות את ההזמנה שלי?",
    faqElevenA:
      "כן, ותמיד ללא תשלום. מכיוון שאיננו גובים תשלום מראש, אין דבר להשיב ואין המתנה לכסף שלכם — אם התוכניות שלכם משתנות, די בהודעה ב-WhatsApp. שינויים בשעה, במספר הטיסה או בכתובת היעד מטופלים אף הם ללא תוספת תשלום.",
    faqTwelveQ: "באיזה מטבע אוכל לשלם?",
    faqTwelveA:
      "המחירים שלנו נקבעים ביורו (EUR) ומשולמים במזומן; כרטיסים אינם מתקבלים. אם ברצונכם לשלם בדולר אמריקאי או בלירה טורקית, הסכום תלוי בשער היומי — לכן כתבו לנו לפני ההעברה ב-WhatsApp. נמסור לכם מחיר ברור ונעדכן את השופר שלכם, כך שברכב לא יתנהל שום משא ומתן.",
    faqThirteenQ: "כמה מטען מותר לי לקחת?",
    faqThirteenA:
      "בדרך כלל מזוודה גדולה אחת ופריט מטען יד אחד לאדם. אם יש לכם יותר — מזוודה נוספת, תיק גולף, עגלת תינוק, מגלשי סקי או אופניים — פשוט ציינו זאת בעת ההזמנה; נספק ללא תוספת תשלום רכב בקיבולת מתאימה. החשוב הוא רק שנדע זאת מראש. Mercedes Vito מכיל עד 6 אנשים, ו-Sprinter עד 12.",
    faqFourteenQ: "מה קורה אם אאחר בהעברת החזור?",
    faqFourteenA:
      "השופר שלכם יגיע למלונכם בשעה שנקבעה וימתין 15 דקות ללא תשלום. אם מסתמן עיכוב, די בהודעה ב-WhatsApp: נבדוק את שעת הטיסה שלכם, נעדכן את השופר שלכם ונתאם איתכם את התהליך. מטרתנו אינה לדחוק בכם, אלא להביא אתכם רגועים לטיסתכם.",
    faqFifteenQ: "האם אפשריות עצירות ביניים במהלך הנסיעה?",
    faqFifteenA:
      "בהחלט. אם ברצונכם לעצור בסופרמרקט או בבית מרקחת, או לעצור לרגע לצילום, פשוט ציינו זאת בעת ההזמנה או ב-WhatsApp — נתכנן את המסלול בהתאם. אם עצירה מרחיקה משמעותית מהמסלול שלכם, נודיע לכם לפני היציאה אם מתווספת עלות; דבר לא יפתיע אתכם בדיעבד.",
    faqThreeQ: "האם כיסאות בטיחות לילדים זמינים?",
    faqThreeA:
      "כן. סלקלים, כיסאות בטיחות ומגביהי מושב זמינים ללא תשלום בהזמנה מראש.",
    faqFourQ: "האם ניתן להוביל תיקי גולף ומטען גדול?",
    faqFourA:
      "כן. ה-Sprinter וה-Vito אידיאליים לקבוצות גולף. ספרו לנו על המטען שלכם ונתכנן את הרכב המתאים.",
    faqFiveQ: "האם המחיר המוצג סופי?",
    faqFiveA:
      "כן. המחיר מההזמנה שלכם הוא הסכום שתמסרו לשופר שלכם במזומן — לרכב, כולל כל אגרות שדה התעופה, עלויות החניה ו-90 דקות זמן ההמתנה הראשונות. אין עלויות נסתרות.",
    contactEyebrow: "המסע שלכם מתחיל כאן",
    contactTitle: "הגיעו יוצא דופן<br />ל-Antalya.",
    contactBody:
      "הזמינו אונליין בפחות משתי דקות או דברו ישירות עם צוות הקונסיירז' שלנו 24/7.",
    whatsappUs: "WhatsApp",
    replyMinutes: "מענה בדרך כלל בתוך דקות ספורות",
    callUs: "התקשרו 24/7",
    emailUs: "אימייל קונסיירז'",
    replyHour: "מענה בתוך שעה",
    fromAirport: "משדה התעופה Antalya",
    perVehicle: "לרכב · מחיר קבוע",
    footerTagline:
      "שירותי שופר פרטיים בכל רחבי הריביירה הטורקית.",
    explore: "גלו",
    information: "מידע",
    licensed: "ספק העברות פרטי מורשה · תואם TÜRSAB",
    quoteReady: "ההעברה הפרטית שלכם",
    vehicle: "רכב",
    journeyTime: "זמן נסיעה",
    totalFixed: "מחיר כולל",
    quoteIncludes:
      "כולל Meet & Greet, מעקב טיסות, חניה, 90 דקות זמן המתנה ומים מינרליים.",
    confirmWhatsapp: "אשרו דרך WhatsApp",
    chatWithUs: "שוחחו איתנו",
    bookNowCta: "הזמינו עכשיו",
    backToQuote: "חזרה",
    yourDetails: "הפרטים שלכם",
    fullName: "שם מלא",
    emailLabel: "אימייל",
    phoneLabel: "טלפון / WhatsApp",
    flightNumber: "מספר טיסה",
    flightArrivalTime: "שעת הגעה",
    notesLabel: "בקשות מיוחדות",
    confirmBooking: "אשרו הזמנה",
    bookingConfirmed: "ההזמנה אושרה",
    referenceLabel: "מספר אסמכתא",
    weWillContact:
      "בקשת ההזמנה שלכם נשלחה. ניצור איתכם קשר בתוך 30 דקות.",
    paymentError: "התשלום נכשל. אנא נסו שוב.",
  },
  it: {
    navFleet: "Veicoli",
    navService: "Servizi",
    navRoutes: "Tratte",
    navReviews: "Recensioni",
    navContact: "Contatti",
    bookNow: "Prenota ora",
    alwaysAvailable: "Disponibili 24 ore su 24, tutti i giorni",
    heroEyebrow: "Servizio di autista privato · Antalya",
    heroTitle: "Transfer aeroportuali premium<br />ad Antalya",
    heroSubtitle:
      "Transfer privati con autista dall'aeroporto di Antalya verso Belek, Side, Kemer e Alanya.",
    campaignBadge: "Offerta online",
    campaignDiscount: "Prezzo speciale",
    campaignScope: "su tutti i prezzi dei transfer",
    campaignApplied: "Prezzo speciale online applicato",
    onlineDiscountShort: "Prezzo speciale online",
    discountPricesShown: "Vengono mostrati i prezzi speciali online",
    bookTransfer: "Prenota il transfer",
    instantQuote: "Ottieni il prezzo immediato",
    googleRated: "Valutazione Google",
    trustedGuests: "Prenotato da oltre 2.500 ospiti",
    discover: "Scopri",
    privateJourney: "Il tuo viaggio privato",
    quoteTitle: "Dove desidera essere accompagnato?",
    pickup: "Punto di ritiro",
    destination: "Destinazione",
    date: "Data",
    tripType: "Tipo di viaggio",
    oneWay: "Solo andata",
    roundTrip: "Andata e ritorno",
    roundTripHint:
      "Per l'andata e ritorno, il ritorno avviene sulla stessa tratta in senso inverso.",
    returnDate: "Data del ritorno",
    returnPickupTime: "Orario di ritiro del ritorno",
    returnFlightNumber: "Numero del volo di ritorno",
    arrivalDate: "Data di arrivo",
    arrivalFlightTime: "Orario di arrivo del volo",
    arrivalFlightNumber: "Numero del volo in arrivo",
    roundTripPriceNote: "Andata e ritorno · 2 tratte",
    guests: "Ospiti",
    airportOption: "Aeroporto di Antalya (AYT)",
    hotelOption: "Hotel",
    privateAddressOption: "Indirizzo privato",
    pickupAddress: "Indirizzo di ritiro completo",
    pickupAddressPlaceholder: "Nome dell'hotel, via, numero civico e quartiere",
    dropoffAddress: "Indirizzo di destinazione completo",
    dropoffAddressPlaceholder: "Nome dell'hotel, via, numero civico e quartiere",
    dropoffAddressRequired:
      "L'indirizzo di destinazione deve avere una lunghezza compresa tra 6 e 160 caratteri.",
    customDestinationPrice:
      "Il prezzo sarà confermato dopo la verifica dell'indirizzo di destinazione.",
    selectDestination: "Seleziona la destinazione",
    airportReturnPrice:
      "Il prezzo sarà confermato dopo la verifica dell'hotel o dell'indirizzo di ritiro.",
    oneGuest: "1 ospite",
    twoGuests: "2 ospiti",
    threeGuests: "3 ospiti",
    fourGuests: "4 ospiti",
    fiveGuests: "5 ospiti",
    sixGuests: "6 ospiti",
    sevenGuests: "7 ospiti",
    viewQuote: "Mostra il prezzo",
    flightTracking: "Monitoraggio del volo in tempo reale",
    fixedPrice: "Prezzo fisso garantito",
    meetGreet: "Accoglienza personale",
    speakingDrivers: "Autisti che parlano tedesco e inglese",
    tbLicensed: "Certificato TÜRSAB",
    tbFlightTracking: "Monitoraggio del volo",
    tbFixedPrice: "Garanzia di prezzo fisso",
    tb247Concierge: "Concierge 24/7",
    tbChildSeats: "Seggiolini per bambini inclusi",
    welcomeEyebrow: "Benvenuti al massimo livello",
    welcomeTitle: "Viaggiare con stile.<br />Arrivare rilassati.",
    welcomeBody:
      "Dal momento del vostro atterraggio, ogni dettaglio è curato. Il nostro team in aeroporto vi accoglie, il vostro autista vi attende al punto di ritiro e i vostri bagagli vengono caricati in un veicolo privato accuratamente preparato.",
    ourStandards: "I nostri standard di servizio",
    concierge: "Servizio concierge",
    guestsWelcomed: "Ospiti accolti",
    guestRating: "Valutazione media",
    privateTransfers: "Transfer privati",
    fleetEyebrow: "La nostra flotta",
    fleetTitle: "Il vostro spazio privato,<br />curato in ogni dettaglio.",
    fleetIntro:
      "Viaggiate comodamente con ampio spazio per la famiglia, l'attrezzatura da golf e i bagagli.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Trasporto VIP spazioso per gruppi più numerosi, con ampio spazio per passeggeri e bagagli.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Un abitacolo privato e confortevole per famiglie e piccoli gruppi.",
    signatureFleet: "Flotta Signature",
    passengers: "Passeggeri",
    suitcases: "Valigie",
    luggageLabel: "Bagagli grandi",
    capacitySwitchedSprinter:
      "Passeggeri e bagagli superano la capacità del Vito — passaggio al Mercedes Sprinter.",
    capacityNoVehicle:
      "Un numero così elevato di passeggeri e bagagli supera la capacità dei nostri veicoli. Vi preghiamo di contattarci via WhatsApp.",
    leatherSeats: "Sedili in pelle premium",
    wifi: "Wi-Fi gratuito",
    water: "Acqua minerale fresca",
    childSeats: "Seggiolini per bambini su richiesta",
    television: "Televisore a bordo",
    coldDrinks: "Bevande fredde",
    snacks: "Snack",
    nameSignGreeting: "Accoglienza al banco J / 777",
    reserveVehicle: "Prenota il veicolo",
    insideVclass: "Interni dello Sprinter",
    interiorTitle: "Una lounge privata tra<br />aeroporto e hotel.",
    serviceEyebrow: "Lo standard Antalya VIP",
    serviceTitle: "Più di un transfer.<br />Un'accoglienza speciale.",
    serviceIntro:
      "Attenzione da hotel di lusso, autisti locali esperti e assoluta sicurezza dall'aeroporto al resort.",
    trackingTitle: "Monitoraggio del volo",
    trackingBody:
      "Monitoriamo il vostro volo in tempo reale e adattiamo automaticamente il ritiro, senza costi aggiuntivi.",
    chauffeurTitle: "Autisti professionisti",
    chauffeurBody:
      "Sempre curati, discreti e selezionati per la conoscenza del territorio e il massimo standard di servizio.",
    greetTitle: "Meet & Greet",
    greetBody:
      "In caso di arrivi internazionali, il nostro team in aeroporto vi accoglie al banco J / 777, chiama il vostro autista al punto di ritiro e vi aiuta con i bagagli.",
    supportTitle: "Concierge 24/7",
    supportBody:
      "Prima, durante e dopo il vostro viaggio, un referente personale è sempre raggiungibile.",
    priceTitle: "Prezzi fissi",
    priceBody:
      "Il prezzo confermato è il prezzo finale. Tempo di attesa, parcheggio e ritardi del volo sono inclusi.",
    familyTitle: "Per le famiglie",
    familyBody:
      "Seggiolini adeguati, interni spaziosi e assistenza paziente per un arrivo rilassato.",
    routesEyebrow: "I nostri viaggi più richiesti",
    routesTitle: "Dall'aeroporto di Antalya<br />alla Riviera Turca.",
    routesIntro:
      "Tutti i prezzi si intendono per veicolo, non per persona, e includono 90 minuti di attesa.",
    golfFavourite: "Preferito dei golfisti",
    from: "Da",
    reviewsEyebrow: "Recensioni degli ospiti",
    reviewsTitle: "Un servizio che resta<br />a lungo nella memoria.",
    googleReviews: "Basato su 387 recensioni Google verificate",
    reviewOne:
      "„Il nostro autista ci ha aspettato nonostante 90 minuti di ritardo del volo. Il veicolo era impeccabile, piacevolmente fresco e già dotato di entrambi i seggiolini per bambini. Esattamente l'accoglienza di cui la nostra famiglia aveva bisogno.“",
    reviewTwo:
      "„Dal primo contatto via WhatsApp fino all'arrivo a Belek, assolutamente di prim'ordine. Puntuali, discreti e molto professionali. Anche le nostre sacche da golf hanno trovato posto comodamente.“",
    reviewThree:
      "„Sembrava il servizio di autista di un hotel, non un taxi aeroportuale. Comunicazione chiara, un veicolo impeccabile e un autista sinceramente cortese.“",
    trustedBy: "Prenotato dagli ospiti dei principali resort di Antalya",
    faqEyebrow: "Domande frequenti",
    faqTitle: "Prima del vostro viaggio.",
    faqCatArrival: "Arrivo e transfer",
    faqCatJourney: "Ritorno e viaggio",
    faqCatPayment: "Pagamento e prezzo",
    faqCatVehicle: "Veicolo e bagagli",
    faqReminder: "Vi preghiamo di leggere la sezione FAQ del nostro sito prima del vostro viaggio.",
    viewFaq: "Vedi le FAQ",
    faqIntro:
      "Tutto ciò che dovete sapere sul vostro transfer aeroportuale privato ad Antalya.",
    askQuestion: "Fai una domanda",
    faqOneQ: "Cosa succede in caso di ritardo del volo?",
    faqOneA:
      "Non dovete fare nulla. Monitoriamo il vostro volo in tempo reale e adattiamo automaticamente l'orario di ritiro. Non addebitiamo mai i ritardi della compagnia aerea: il vostro autista è presente ogni volta che atterrate, e i primi 90 minuti dopo l'atterraggio sono sempre inclusi.",
    faqTwoQ:
      "Arrivo con un volo internazionale. Come avviene il ritiro?",
    faqTwoA:
      "Dopo il controllo passaporti e il ritiro bagagli, seguite gli altri passeggeri fino all'area Meet & Greet e raggiungete il nostro banco J / 777. È sufficiente comunicare il vostro nome al nostro personale. Il nostro team informa immediatamente il vostro autista, che entra in aeroporto e si posiziona al punto di ritiro, mentre il nostro incaricato vi accompagna al veicolo. L'intera procedura dura circa 7-8 minuti.",
    faqSixQ:
      "Arrivo con un volo nazionale. Dove trovo il mio autista?",
    faqSixA:
      "L'area Meet & Greet è riservata esclusivamente agli arrivi internazionali. Per questo motivo assistiamo gli ospiti dei voli nazionali in modo diverso: vi inviamo il numero di telefono del vostro autista prima del transfer. Dopo l'atterraggio, avvisatelo brevemente: verrà a prendervi nella sala arrivi.",
    faqSevenQ: "Cosa faccio se al banco J / 777 non c'è nessuno?",
    faqSevenA:
      "Al nostro banco sono sempre presenti due incaricati il cui unico compito è accompagnare gli ospiti in arrivo al loro veicolo. Se il banco è momentaneamente vuoto, significa che un collega sta accompagnando l'ospite prima di voi: ogni accompagnamento dura circa 7-8 minuti. Vi preghiamo di attendere circa 10 minuti. Se entro questo tempo non è ancora tornato nessuno, scriveteci via WhatsApp: informeremo immediatamente il vostro autista, lo faremo fermare al punto più vicino e vi accompagneremo direttamente alla vostra vettura senza ulteriori attese.",
    faqEightQ:
      "Cosa succede se impiego più di 90 minuti per uscire dall'aeroporto?",
    faqEightA:
      "I primi 90 minuti dopo l'atterraggio sono inclusi gratuitamente — molto più del tempo necessario per controllo passaporti, bagagli e dogana — e questa finestra si sposta automaticamente in caso di ritardo del volo. Solo se rimanete più a lungo nel terminal per motivi non legati al vostro volo, si aggiunge un contributo per il parcheggio di 5 € per ogni ora ulteriore. Nella pratica ciò non accade quasi mai: quasi tutti i nostri ospiti sono già in viaggio molto prima.",
    faqNineQ: "Come pago?",
    faqNineA:
      "Pagate al vostro autista in contanti all'inizio del viaggio: il pagamento con carta non è possibile. I prezzi sono fissati in euro (EUR): l'importo fisso corrisponde esattamente a quanto visto al momento della prenotazione — per veicolo, incluse tutte le tasse aeroportuali e di parcheggio, senza aggiunte successive. Preferite pagare in dollari USA o lire turche? Scriveteci in anticipo via WhatsApp per un prezzo separato, poiché il tasso di cambio è diverso. Il vostro autista vi accoglie, carica i vostri bagagli e installa i seggiolini richiesti; dopo il pagamento inizia il vostro viaggio.",
    faqTenQ: "Come mantengo il contatto durante il transfer di ritorno?",
    faqTenA:
      "Non appena avrete confermato data e orario del vostro ritorno via WhatsApp con il nostro team, vi assegneremo un veicolo alcune ore prima del transfer e vi invieremo le sue foto via WhatsApp — su richiesta anche il numero di telefono del vostro autista. Quando il vostro autista raggiunge l'hotel, informa la reception, che avvisa la vostra camera non appena la vettura è pronta. I nostri autisti non chiamano mai direttamente gli ospiti: tutta la comunicazione avviene tramite la nostra assistenza WhatsApp centrale, così sapete sempre con precisione con chi state parlando.",
    faqElevenQ: "Posso annullare o modificare la mia prenotazione?",
    faqElevenA:
      "Sì, e sempre gratuitamente. Poiché non richiediamo alcun pagamento anticipato, non c'è nulla da rimborsare né tempi di attesa per il vostro denaro: se i vostri programmi cambiano, basta un messaggio via WhatsApp. Modifiche di orario, numero del volo o indirizzo di destinazione le gestiamo allo stesso modo, senza costi aggiuntivi.",
    faqTwelveQ: "In quale valuta posso pagare?",
    faqTwelveA:
      "I nostri prezzi sono fissati in euro (EUR) e si pagano in contanti; le carte non sono accettate. Se desiderate pagare in dollari USA o lire turche, l'importo dipende dal tasso di cambio giornaliero — per questo scriveteci via WhatsApp prima del vostro transfer. Vi indicheremo un prezzo chiaro e informeremo il vostro autista, così a bordo non si negozia nulla.",
    faqThirteenQ: "Quanti bagagli posso portare?",
    faqThirteenA:
      "Di norma una valigia grande e un bagaglio a mano per persona. Se avete di più — una valigia aggiuntiva, una sacca da golf, un passeggino, sci o una bicicletta — basta comunicarlo al momento della prenotazione; metteremo a disposizione senza costi aggiuntivi un veicolo con la capacità adeguata. L'importante è solo che lo sappiamo in anticipo. Un Mercedes Vito ospita fino a 6 persone, uno Sprinter fino a 12.",
    faqFourteenQ: "Cosa succede se sono in ritardo per il transfer di ritorno?",
    faqFourteenA:
      "Il vostro autista è presso il vostro hotel all'orario concordato e attende 15 minuti gratuitamente. Se si prospetta un ritardo, basta un messaggio via WhatsApp: verifichiamo l'orario del vostro volo, informiamo il vostro autista e concordiamo con voi la procedura. Il nostro obiettivo non è mettervi fretta, ma portarvi rilassati al vostro volo.",
    faqFifteenQ: "Sono possibili soste durante il viaggio?",
    faqFifteenA:
      "Naturalmente. Se desiderate fermarvi a un supermercato o a una farmacia, oppure sostare brevemente per una foto, basta comunicarlo al momento della prenotazione o via WhatsApp — pianificheremo il percorso di conseguenza. Se una sosta si allontana notevolmente dalla vostra tratta, vi comunicheremo prima della partenza se vi è un supplemento; nessuna sorpresa successiva.",
    faqThreeQ: "Sono disponibili seggiolini per bambini?",
    faqThreeA:
      "Sì. Ovetti, seggiolini e rialzi sono disponibili gratuitamente su prenotazione anticipata.",
    faqFourQ: "È possibile trasportare sacche da golf e bagagli voluminosi?",
    faqFourA:
      "Sì. Sprinter e Vito sono ideali per i gruppi di golfisti. Comunicateci i vostri bagagli e pianificheremo il veicolo adeguato.",
    faqFiveQ: "Il prezzo indicato è definitivo?",
    faqFiveA:
      "Sì. Il prezzo della vostra prenotazione è l'importo che consegnate in contanti al vostro autista — per veicolo, incluse tutte le tasse aeroportuali, i costi di parcheggio e i primi 90 minuti di attesa. Non ci sono costi nascosti.",
    contactEyebrow: "Il vostro viaggio inizia qui",
    contactTitle: "Arrivare ad Antalya<br />in modo straordinario.",
    contactBody:
      "Prenotate online in meno di due minuti oppure parlate direttamente con il nostro team concierge 24/7.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Risposta di solito in pochi minuti",
    callUs: "Chiama 24/7",
    emailUs: "E-mail concierge",
    replyHour: "Risposta entro un'ora",
    fromAirport: "Dall'aeroporto di Antalya",
    perVehicle: "per veicolo · prezzo fisso",
    footerTagline:
      "Servizi di autista privato in tutta la Riviera Turca.",
    explore: "Scopri",
    information: "Informazioni",
    licensed: "Fornitore autorizzato di transfer privati · conforme TÜRSAB",
    quoteReady: "Il vostro transfer privato",
    vehicle: "Veicolo",
    journeyTime: "Durata del viaggio",
    totalFixed: "Prezzo totale",
    quoteIncludes:
      "Include Meet & Greet, monitoraggio del volo, parcheggio, 90 minuti di attesa e acqua minerale.",
    confirmWhatsapp: "Conferma via WhatsApp",
    chatWithUs: "Chatta con noi",
    bookNowCta: "Prenota ora",
    backToQuote: "Indietro",
    yourDetails: "I vostri dati",
    fullName: "Nome completo",
    emailLabel: "E-mail",
    phoneLabel: "Telefono / WhatsApp",
    flightNumber: "Numero del volo",
    flightArrivalTime: "Orario di arrivo",
    notesLabel: "Richieste particolari",
    confirmBooking: "Conferma la prenotazione",
    bookingConfirmed: "Prenotazione confermata",
    referenceLabel: "Riferimento",
    weWillContact:
      "La vostra richiesta di prenotazione è stata inviata. Vi ricontatteremo entro 30 minuti.",
    paymentError: "Pagamento non riuscito. Vi preghiamo di riprovare.",
  },
  hu: {
    navFleet: "Járművek",
    navService: "Szolgáltatás",
    navRoutes: "Útvonalak",
    navReviews: "Vélemények",
    navContact: "Kapcsolat",
    bookNow: "Foglaljon most",
    alwaysAvailable: "A nap 24 órájában, minden nap elérhető",
    heroEyebrow: "Privát sofőrszolgálat · Antalya",
    heroTitle: "Prémium reptéri transzferek<br />Antalyában",
    heroSubtitle:
      "Privát transzferek sofőrrel az antalyai repülőtérről Belekbe, Side-ba, Kemerbe és Alanyába.",
    campaignBadge: "Online ajánlat",
    campaignDiscount: "Kedvezményes ár",
    campaignScope: "minden transzferárra",
    campaignApplied: "Online kedvezményes ár alkalmazva",
    onlineDiscountShort: "Online kedvezményes ár",
    discountPricesShown: "Az online kedvezményes árak láthatók",
    bookTransfer: "Transzfer foglalása",
    instantQuote: "Kérjen azonnali árat",
    googleRated: "Google-értékelés",
    trustedGuests: "Több mint 2.500 vendég foglalta",
    discover: "Fedezze fel",
    privateJourney: "Az Ön privát utazása",
    quoteTitle: "Hová vihetjük Önt?",
    pickup: "Felvétel",
    destination: "Úti cél",
    date: "Dátum",
    tripType: "Utazás típusa",
    oneWay: "Egyszeri út",
    roundTrip: "Oda-vissza út",
    roundTripHint:
      "Oda-vissza út esetén a visszaút ugyanazon az útvonalon, fordított irányban történik.",
    returnDate: "Visszaút dátuma",
    returnPickupTime: "Visszaút felvételi ideje",
    returnFlightNumber: "Visszaút járatszáma",
    arrivalDate: "Érkezés dátuma",
    arrivalFlightTime: "A járat érkezési ideje",
    arrivalFlightNumber: "Érkező járat száma",
    roundTripPriceNote: "Oda-vissza út · 2 utazás",
    guests: "Vendégek",
    airportOption: "Antalya repülőtér (AYT)",
    hotelOption: "Hotel",
    privateAddressOption: "Magáncím",
    pickupAddress: "Teljes felvételi cím",
    pickupAddressPlaceholder: "Hotel neve, utca, házszám és városrész",
    dropoffAddress: "Teljes úti cél cím",
    dropoffAddressPlaceholder: "Hotel neve, utca, házszám és városrész",
    dropoffAddressRequired:
      "Az úti cél címének 6 és 160 karakter között kell lennie.",
    customDestinationPrice:
      "Az árat az úti cél címének ellenőrzése után erősítjük meg.",
    selectDestination: "Válassza ki az úti célt",
    airportReturnPrice:
      "Az árat a hotel vagy a felvételi cím ellenőrzése után erősítjük meg.",
    oneGuest: "1 vendég",
    twoGuests: "2 vendég",
    threeGuests: "3 vendég",
    fourGuests: "4 vendég",
    fiveGuests: "5 vendég",
    sixGuests: "6 vendég",
    sevenGuests: "7 vendég",
    viewQuote: "Ár megtekintése",
    flightTracking: "Valós idejű járatkövetés",
    fixedPrice: "Garantált fix ár",
    meetGreet: "Személyes fogadás",
    speakingDrivers: "Németül és angolul beszélő",
    tbLicensed: "TÜRSAB-tanúsított",
    tbFlightTracking: "Járatkövetés",
    tbFixedPrice: "Fix ár garancia",
    tb247Concierge: "24/7 concierge",
    tbChildSeats: "Gyerekülések ingyen",
    welcomeEyebrow: "Üdvözöljük a legmagasabb színvonalon",
    welcomeTitle: "Utazzon stílusosan.<br />Érkezzen meg nyugodtan.",
    welcomeBody:
      "A landolás pillanatától kezdve minden apró részletre gondolunk. Reptéri csapatunk fogadja Önt, sofőrje a felvételi ponthoz áll, csomagjait pedig egy gondosan előkészített privát járműbe rakodjuk.",
    ourStandards: "Szolgáltatási színvonalunk",
    concierge: "Concierge-szolgáltatás",
    guestsWelcomed: "Fogadott vendégek",
    guestRating: "Átlagos értékelés",
    privateTransfers: "Privát transzferek",
    fleetEyebrow: "Járműparkunk",
    fleetTitle: "Az Ön privát tere,<br />a legapróbb részletig kidolgozva.",
    fleetIntro:
      "Utazzon kényelmesen, bőséges hellyel a család, a golffelszerelés és a poggyász számára.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Tágas VIP-szállítás nagyobb csoportoknak, bőséges hellyel az utasok és a csomagok számára.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Kényelmes privát kabin családok és kisebb csoportok számára.",
    signatureFleet: "Signature járműpark",
    passengers: "Utasok",
    suitcases: "Bőröndök",
    luggageLabel: "Nagy poggyász",
    capacitySwitchedSprinter:
      "Az utasok és a poggyász meghaladja a Vito kapacitását — átváltottunk Mercedes Sprinterre.",
    capacityNoVehicle:
      "Ennyi utas és poggyász meghaladja járműveink kapacitását. Kérjük, vegye fel velünk a kapcsolatot WhatsApp-on.",
    leatherSeats: "Prémium bőrülések",
    wifi: "Ingyenes WiFi",
    water: "Hűtött ásványvíz",
    childSeats: "Gyerekülések kérésre",
    television: "Televízió a járműben",
    coldDrinks: "Hideg italok",
    snacks: "Snackek",
    nameSignGreeting: "Fogadás a J / 777 pultnál",
    reserveVehicle: "Jármű foglalása",
    insideVclass: "A Sprinter belső tere",
    interiorTitle: "Egy privát lounge a repülőtér<br />és a hotel között.",
    serviceEyebrow: "Az Antalya VIP színvonal",
    serviceTitle: "Több mint egy transzfer.<br />Egy különleges fogadás.",
    serviceIntro:
      "Hotelszintű figyelmesség, tapasztalt helyi sofőrök és teljes biztonság a repülőtértől a resortig.",
    trackingTitle: "Járatkövetés",
    trackingBody:
      "Valós időben követjük járatát, és a felvételt automatikusan, díjmentesen igazítjuk hozzá.",
    chauffeurTitle: "Professzionális sofőrök",
    chauffeurBody:
      "Mindig ápoltak, diszkrétek, és a helyismeretük, valamint a legmagasabb szolgáltatási színvonaluk alapján válogatva.",
    greetTitle: "Meet & Greet",
    greetBody:
      "Nemzetközi érkezéseknél reptéri csapatunk a J / 777 pultnál fogadja Önt, hívja sofőrjét a felvételi ponthoz, és segít a poggyásszal.",
    supportTitle: "24/7 concierge",
    supportBody:
      "Utazása előtt, közben és után mindig elérhető egy személyes kapcsolattartó.",
    priceTitle: "Fix árak",
    priceBody:
      "A megerősített ár a végleges ár. A várakozási idő, a parkolás és a járatkésések benne foglaltatnak.",
    familyTitle: "Családoknak",
    familyBody:
      "Megfelelő gyerekülések, tágas belső terek és türelmes segítség a nyugodt megérkezéshez.",
    routesEyebrow: "Legnépszerűbb utazásaink",
    routesTitle: "Az antalyai repülőtérről<br />a Török Riviérára.",
    routesIntro:
      "Minden ár járművenként értendő, nem személyenként, és 90 perc várakozási időt tartalmaz.",
    golfFavourite: "Golf-kedvenc",
    from: "Ettől",
    reviewsEyebrow: "Vendégvélemények",
    reviewsTitle: "Olyan szolgáltatás, amely sokáig<br />emlékezetes marad.",
    googleReviews: "387 ellenőrzött Google-értékelés alapján",
    reviewOne:
      "„Sofőrünk a 90 perces járatkésés ellenére is várt ránk. A jármű makulátlan, kellemesen hűvös volt, és már be volt szerelve mindkét gyerekülés. Pontosan az a fogadás, amelyre a családunknak szüksége volt.”",
    reviewTwo:
      "„Az első WhatsApp-üzenettől a beleki megérkezésig teljesen elsőrangú volt. Pontos, diszkrét és nagyon professzionális. Még a golftáskáink is kényelmesen elfértek.”",
    reviewThree:
      "„Olyan érzés volt, mintha egy hotel sofőrszolgálata lenne, nem pedig egy reptéri taxi. Világos kommunikáció, makulátlan jármű és őszintén udvarias sofőr.”",
    trustedBy: "Antalya vezető resortjainak vendégei által foglalva",
    faqEyebrow: "Gyakran kérdezik",
    faqTitle: "Utazása előtt.",
    faqCatArrival: "Érkezés és transzfer",
    faqCatJourney: "Visszaút és utazás",
    faqCatPayment: "Fizetés és ár",
    faqCatVehicle: "Jármű és poggyász",
    faqReminder: "Kérjük, utazása előtt olvassa el a weboldalunkon található GYIK-részt.",
    viewFaq: "GYIK megtekintése",
    faqIntro:
      "Minden, amit tudnia kell az antalyai privát reptéri transzferéről.",
    askQuestion: "Kérdés feltevése",
    faqOneQ: "Mi történik járatkésés esetén?",
    faqOneA:
      "Önnek semmit sem kell tennie. Valós időben követjük járatát, és automatikusan hozzáigazítjuk a felvételi idejét. A légitársaság késéseit soha nem számítjuk fel – sofőrje ott van, bármikor is landol, és a landolás utáni első 90 perc mindig benne foglaltatik.",
    faqTwoQ:
      "Nemzetközi járattal érkezem. Hogyan zajlik a felvétel?",
    faqTwoA:
      "Az útlevél-ellenőrzés és a poggyászfelvétel után kövesse a többi utast a Meet & Greet területre, és jöjjön a J / 777 pultunkhoz. Egyszerűen mondja meg munkatársainknak a nevét – ez elegendő. Csapatunk azonnal értesíti sofőrjét; ő behajt a repülőtérre, és a felvételi ponton áll, míg munkatársunk a járműhöz kíséri Önt. Az egész folyamat körülbelül 7–8 percet vesz igénybe.",
    faqSixQ:
      "Belföldi járattal érkezem. Hol találom a sofőrömet?",
    faqSixA:
      "A Meet & Greet terület kizárólag a nemzetközi érkezések számára áll rendelkezésre. A belföldi vendégeket ezért máshogy kezeljük: a transzfer előtt elküldjük Önnek sofőrje telefonszámát. A landolás után röviden jelezzen neki – ő az érkezési csarnokban veszi fel Önt.",
    faqSevenQ: "Mit tegyek, ha senki sincs a J / 777 pultnál?",
    faqSevenA:
      "Pultunknál folyamatosan két munkatárs dolgozik, akiknek egyetlen feladata, hogy az érkező vendégeket a járművükhöz kísérjék. Ha a pult rövid ideig üres, egy kollégánk éppen az Ön előtt érkező vendéget kíséri – minden kíséret körülbelül 7–8 percig tart. Kérjük, várjon körülbelül 10 percet. Ha addig senki sem tér vissza, írjon nekünk WhatsApp-on: azonnal értesítjük sofőrjét, megállítjuk őt a legközelebbi ponton, és minden további várakozás nélkül közvetlenül a járművéhez vezetjük Önt.",
    faqEightQ:
      "Mi van, ha 90 percnél tovább tart, míg kijutok a repülőtérről?",
    faqEightA:
      "A landolás utáni első 90 perc díjmentesen benne foglaltatik – lényegesen több, mint amennyit az útlevél-ellenőrzés, a poggyász és a vám igényel –, és ez az időkeret járatkésés esetén automatikusan eltolódik. Csak akkor, ha a járatától független okokból marad tovább a terminálon, jön hozzá egy 5 €-os parkolási hozzájárulás minden további megkezdett óráért. A gyakorlatban ez szinte soha nem fordul elő: vendégeink szinte mindegyike jóval korábban úton van.",
    faqNineQ: "Hogyan fizetek?",
    faqNineA:
      "Az utazás elején készpénzben fizet sofőrjének – kártyás fizetés nem lehetséges. Az árak euróban (EUR) rögzítettek: a fix összeg pontosan annyi, amennyit a foglaláskor látott – járművenként, minden reptéri és parkolási díjjal együtt, utólagos felárak nélkül. Inkább amerikai dollárban vagy török lírában fizetne? Írjon nekünk előre WhatsApp-on egy külön árért, mivel az árfolyam eltér. Sofőrje üdvözli Önt, berakodja poggyászát és beszereli a kért gyereküléseket; a fizetés után indul az utazása.",
    faqTenQ: "Hogyan tartok kapcsolatot a visszatranszfer során?",
    faqTenA:
      "Amint WhatsApp-on megerősítette csapatunkkal a visszaútja dátumát és időpontját, néhány órával a transzfer előtt kijelöljük járművét, és WhatsApp-on elküldjük róla a fotókat – kérésre sofőrje telefonszámát is. Amikor sofőrje eléri a hotelt, értesíti a recepciót, amely tájékoztatja szobáját, amint a jármű készen áll. Sofőrjeink soha nem hívják közvetlenül a vendégeket: a teljes kommunikáció központi WhatsApp-ügyfélszolgálatunkon keresztül zajlik, így mindig pontosan tudja, kivel beszél.",
    faqElevenQ: "Lemondhatom vagy módosíthatom a foglalásomat?",
    faqElevenA:
      "Igen, és mindig díjmentesen. Mivel nem kérünk előleget, nincs mit visszatéríteni, és nem kell várni a pénzére — ha megváltoznak a tervei, elég egy üzenet WhatsApp-on. Az időpont, a járatszám vagy az úti cél címének módosítását szintén felár nélkül intézzük.",
    faqTwelveQ: "Milyen pénznemben fizethetek?",
    faqTwelveA:
      "Áraink euróban (EUR) rögzítettek, és készpénzben fizetendők; kártyát nem fogadunk el. Ha amerikai dollárban vagy török lírában szeretne fizetni, az összeg a napi árfolyamtól függ — ezért írjon nekünk transzfere előtt WhatsApp-on. Világos árat adunk Önnek, és értesítjük sofőrjét, így a járműben nincs alkudozás.",
    faqThirteenQ: "Mennyi poggyászt vihetek magammal?",
    faqThirteenA:
      "Általában egy nagy bőrönd és egy kézipoggyász személyenként. Ha több van Önnél — egy plusz bőrönd, egy golftáska, egy babakocsi, síléc vagy kerékpár —, egyszerűen mondja meg a foglaláskor; felár nélkül biztosítunk megfelelő kapacitású járművet. Csak az a lényeg, hogy előre tudjuk. Egy Mercedes Vito legfeljebb 6 személyt, egy Sprinter legfeljebb 12-t szállít.",
    faqFourteenQ: "Mi történik, ha késem a visszatranszferről?",
    faqFourteenA:
      "Sofőrje a megbeszélt időpontban a hotelnél van, és 15 percet díjmentesen vár. Ha késés körvonalazódik, elég egy üzenet WhatsApp-on: ellenőrizzük a repülési idejét, értesítjük sofőrjét, és egyeztetjük Önnel a folyamatot. Célunk nem az, hogy siettessük Önt, hanem hogy nyugodtan eljuttassuk a járatához.",
    faqFifteenQ: "Lehetségesek-e közbenső megállók az út során?",
    faqFifteenA:
      "Természetesen. Ha meg szeretne állni egy szupermarketnél vagy egy gyógyszertárnál, vagy röviden egy fotóért, egyszerűen mondja meg a foglaláskor vagy WhatsApp-on — ennek megfelelően tervezzük az útvonalat. Ha egy megálló jelentősen eltér az útvonalától, indulás előtt megmondjuk, hogy jön-e hozzá valami; utólag semmi sem éri meglepetésként.",
    faqThreeQ: "Elérhetők-e gyerekülések?",
    faqThreeA:
      "Igen. Babahordozók, gyerekülések és ülésmagasítók előrendelés esetén díjmentesen elérhetők.",
    faqFourQ: "Szállíthatók-e golftáskák és nagy poggyász?",
    faqFourA:
      "Igen. A Sprinter és a Vito ideális golfcsoportok számára. Adja meg poggyászát, és megtervezzük a megfelelő járművet.",
    faqFiveQ: "Végleges-e a megjelenített ár?",
    faqFiveA:
      "Igen. A foglalásában szereplő ár az az összeg, amelyet készpénzben átad sofőrjének – járművenként, minden reptéri díjjal, parkolási költséggel és az első 90 perc várakozási idővel együtt. Nincsenek rejtett költségek.",
    contactEyebrow: "Az utazása itt kezdődik",
    contactTitle: "Érkezzen meg rendkívüli<br />módon Antalyába.",
    contactBody:
      "Foglaljon online kevesebb mint két perc alatt, vagy beszéljen közvetlenül 24/7 concierge-csapatunkkal.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Válasz általában néhány percen belül",
    callUs: "Hívjon 24/7",
    emailUs: "Concierge e-mail",
    replyHour: "Válasz egy órán belül",
    fromAirport: "Az antalyai repülőtérről",
    perVehicle: "járművenként · fix ár",
    footerTagline:
      "Privát sofőrszolgálat a teljes Török Riviérán.",
    explore: "Fedezze fel",
    information: "Információ",
    licensed: "Engedéllyel rendelkező privát transzferszolgáltató · TÜRSAB-megfelelő",
    quoteReady: "Az Ön privát transzfere",
    vehicle: "Jármű",
    journeyTime: "Utazási idő",
    totalFixed: "Végösszeg",
    quoteIncludes:
      "Tartalmazza a Meet & Greet szolgáltatást, a járatkövetést, a parkolást, 90 perc várakozási időt és az ásványvizet.",
    confirmWhatsapp: "Megerősítés WhatsApp-on",
    chatWithUs: "Csevegjen velünk",
    bookNowCta: "Foglaljon most",
    backToQuote: "Vissza",
    yourDetails: "Az Ön adatai",
    fullName: "Teljes név",
    emailLabel: "E-mail",
    phoneLabel: "Telefon / WhatsApp",
    flightNumber: "Járatszám",
    flightArrivalTime: "Érkezési idő",
    notesLabel: "Különleges kérések",
    confirmBooking: "Foglalás megerősítése",
    bookingConfirmed: "Foglalás megerősítve",
    referenceLabel: "Referencia",
    weWillContact:
      "Foglalási kérelmét elküldtük. 30 percen belül jelentkezünk.",
    paymentError: "A fizetés sikertelen. Kérjük, próbálja újra.",
  },
  pt: {
    navFleet: "Veículos",
    navService: "Serviço",
    navRoutes: "Rotas",
    navReviews: "Avaliações",
    navContact: "Contacto",
    bookNow: "Reservar agora",
    alwaysAvailable: "Disponível 24 horas, todos os dias",
    heroEyebrow: "Serviço privado de motorista · Antalya",
    heroTitle: "Transferes premium de aeroporto<br />em Antalya",
    heroSubtitle:
      "Transferes privados com motorista do aeroporto de Antalya para Belek, Side, Kemer e Alanya.",
    campaignBadge: "Especial Online",
    campaignDiscount: "Preço especial",
    campaignScope: "em todos os preços de transfere",
    campaignApplied: "Preço especial online aplicado",
    onlineDiscountShort: "Preço especial online",
    discountPricesShown: "São apresentados os preços especiais online",
    bookTransfer: "Reservar transfere",
    instantQuote: "Obter preço imediato",
    googleRated: "Avaliação Google",
    trustedGuests: "Reservado por mais de 2.500 clientes",
    discover: "Descobrir",
    privateJourney: "A sua viagem privada",
    quoteTitle: "Para onde o podemos levar?",
    pickup: "Recolha",
    destination: "Destino",
    date: "Data",
    tripType: "Tipo de viagem",
    oneWay: "Viagem só de ida",
    roundTrip: "Ida e volta",
    roundTripHint:
      "Numa viagem de ida e volta, o regresso é feito pela mesma rota no sentido inverso.",
    returnDate: "Data de regresso",
    returnPickupTime: "Hora de recolha do regresso",
    returnFlightNumber: "Número do voo de regresso",
    arrivalDate: "Data de chegada",
    arrivalFlightTime: "Hora de chegada do voo",
    arrivalFlightNumber: "Número do voo de chegada",
    roundTripPriceNote: "Ida e volta · 2 viagens",
    guests: "Passageiros",
    airportOption: "Aeroporto de Antalya (AYT)",
    hotelOption: "Hotel",
    privateAddressOption: "Morada privada",
    pickupAddress: "Morada de recolha completa",
    pickupAddressPlaceholder: "Nome do hotel, rua, número e bairro",
    dropoffAddress: "Morada de destino completa",
    dropoffAddressPlaceholder: "Nome do hotel, rua, número e bairro",
    dropoffAddressRequired:
      "A morada de destino deve ter entre 6 e 160 caracteres.",
    customDestinationPrice:
      "O preço será confirmado após verificação da morada de destino.",
    selectDestination: "Selecionar destino",
    airportReturnPrice:
      "O preço será confirmado após verificação do hotel ou da morada de recolha.",
    oneGuest: "1 passageiro",
    twoGuests: "2 passageiros",
    threeGuests: "3 passageiros",
    fourGuests: "4 passageiros",
    fiveGuests: "5 passageiros",
    sixGuests: "6 passageiros",
    sevenGuests: "7 passageiros",
    viewQuote: "Ver preço",
    flightTracking: "Rastreio de voo em tempo real",
    fixedPrice: "Preço fixo garantido",
    meetGreet: "Receção pessoal",
    speakingDrivers: "Falam alemão e inglês",
    tbLicensed: "Certificado TÜRSAB",
    tbFlightTracking: "Rastreio de voo",
    tbFixedPrice: "Garantia de preço fixo",
    tb247Concierge: "Concierge 24/7",
    tbChildSeats: "Cadeiras para crianças incluídas",
    welcomeEyebrow: "Bem-vindo ao mais alto nível",
    welcomeTitle: "Viaje com estilo.<br />Chegue descansado.",
    welcomeBody:
      "A partir do momento em que aterra, cada detalhe está pensado. A nossa equipa no aeroporto recebe-o, o seu motorista aproxima-se do ponto de recolha e a sua bagagem é colocada num veículo privado cuidadosamente preparado.",
    ourStandards: "Os nossos padrões de serviço",
    concierge: "Serviço de concierge",
    guestsWelcomed: "Clientes recebidos",
    guestRating: "Avaliação média",
    privateTransfers: "Transferes privados",
    fleetEyebrow: "A nossa frota",
    fleetTitle: "O seu espaço privado,<br />perfeito até ao detalhe.",
    fleetIntro:
      "Viaje com conforto e amplo espaço para a família, os sacos de golfe e as malas.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Transporte VIP espaçoso para grupos maiores, com muito espaço para passageiros e bagagem.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Uma cabina privada e confortável para famílias e pequenos grupos.",
    signatureFleet: "Frota Signature",
    passengers: "Passageiros",
    suitcases: "Malas",
    luggageLabel: "Bagagem volumosa",
    capacitySwitchedSprinter:
      "Os passageiros e a bagagem excedem a capacidade do Vito — alterado para Mercedes Sprinter.",
    capacityNoVehicle:
      "Este número de passageiros e bagagem excede a capacidade dos nossos veículos. Contacte-nos por WhatsApp.",
    leatherSeats: "Bancos em pele premium",
    wifi: "Wi-Fi gratuito",
    water: "Água mineral fresca",
    childSeats: "Cadeiras para crianças a pedido",
    television: "Televisão no veículo",
    coldDrinks: "Bebidas frias",
    snacks: "Snacks",
    nameSignGreeting: "Receção no balcão J / 777",
    reserveVehicle: "Reservar veículo",
    insideVclass: "Interior do Sprinter",
    interiorTitle: "Um lounge privado entre<br />o aeroporto e o hotel.",
    serviceEyebrow: "O padrão Antalya VIP",
    serviceTitle: "Mais do que um transfere.<br />Uma receção especial.",
    serviceIntro:
      "Atenção ao nível de um hotel, motoristas locais experientes e total segurança do aeroporto até ao resort.",
    trackingTitle: "Rastreio de voo",
    trackingBody:
      "Acompanhamos o seu voo em tempo real e ajustamos a recolha de forma automática e gratuita.",
    chauffeurTitle: "Motoristas profissionais",
    chauffeurBody:
      "Sempre cuidados, discretos e selecionados pelo seu conhecimento local e pelo mais alto padrão de serviço.",
    greetTitle: "Meet & Greet",
    greetBody:
      "Nas chegadas internacionais, a nossa equipa no aeroporto recebe-o no balcão J / 777, chama o seu motorista ao ponto de recolha e ajuda com a bagagem.",
    supportTitle: "Concierge 24/7",
    supportBody:
      "Antes, durante e depois da sua viagem, tem sempre um contacto pessoal disponível.",
    priceTitle: "Preços fixos",
    priceBody:
      "O preço confirmado é o preço final. O tempo de espera, o estacionamento e os atrasos de voo estão incluídos.",
    familyTitle: "Para famílias",
    familyBody:
      "Cadeiras para crianças adequadas, interiores espaçosos e ajuda paciente para uma chegada tranquila.",
    routesEyebrow: "As nossas viagens mais populares",
    routesTitle: "Do aeroporto de Antalya<br />à Riviera Turca.",
    routesIntro:
      "Todos os preços são por veículo, não por pessoa, e incluem 90 minutos de tempo de espera.",
    golfFavourite: "Favorito dos golfistas",
    from: "Desde",
    reviewsEyebrow: "Avaliações dos clientes",
    reviewsTitle: "Um serviço que fica<br />na memória.",
    googleReviews: "Com base em 387 avaliações Google verificadas",
    reviewOne:
      "„O nosso motorista esperou apesar de um atraso de voo de 90 minutos. O veículo estava impecável, agradavelmente fresco e já equipado com as duas cadeiras para crianças. Exatamente a receção de que a nossa família precisava.“",
    reviewTwo:
      "„Do primeiro contacto por WhatsApp até à chegada a Belek, absolutamente excelente. Pontual, discreto e muito profissional. Os nossos sacos de golfe também couberam com folga.“",
    reviewThree:
      "„Pareceu o serviço de motorista de um hotel, e não um táxi de aeroporto. Comunicação clara, um veículo impecável e um motorista genuinamente atencioso.“",
    trustedBy: "Reservado por clientes dos principais resorts de Antalya",
    faqEyebrow: "Perguntas frequentes",
    faqTitle: "Antes da sua viagem.",
    faqCatArrival: "Chegada e transfere",
    faqCatJourney: "Regresso e viagem",
    faqCatPayment: "Pagamento e preço",
    faqCatVehicle: "Veículo e bagagem",
    faqReminder: "Antes da sua viagem, leia a secção de perguntas frequentes no nosso site.",
    viewFaq: "Ver FAQ",
    faqIntro:
      "Tudo o que precisa de saber sobre o seu transfere privado de aeroporto em Antalya.",
    askQuestion: "Fazer uma pergunta",
    faqOneQ: "O que acontece em caso de atraso do voo?",
    faqOneA:
      "Não precisa de fazer nada. Acompanhamos o seu voo em tempo real e ajustamos automaticamente a hora de recolha. Nunca cobramos os atrasos da companhia aérea — o seu motorista está lá sempre que aterrar, e os primeiros 90 minutos após a aterragem estão sempre incluídos.",
    faqTwoQ:
      "Chego num voo internacional. Como decorre a recolha?",
    faqTwoA:
      "Após o controlo de passaportes e a recolha de bagagem, siga os restantes passageiros até à zona de Meet & Greet e dirija-se ao nosso balcão J / 777. Basta indicar o seu nome à nossa equipa — é suficiente. A nossa equipa informa de imediato o seu motorista; ele entra no aeroporto e fica pronto no ponto de recolha, enquanto o nosso colaborador o acompanha até ao veículo. Todo o processo demora cerca de 7 a 8 minutos.",
    faqSixQ:
      "Chego num voo doméstico. Onde encontro o meu motorista?",
    faqSixA:
      "A zona de Meet & Greet está disponível exclusivamente para chegadas internacionais. Por isso, tratamos os clientes de voos domésticos de forma diferente: enviamos-lhe o número de telefone do seu motorista antes do transfere. Após a aterragem, avise-o com uma mensagem breve — ele recolhe-o no hall de chegadas.",
    faqSevenQ: "O que faço se não estiver ninguém no balcão J / 777?",
    faqSevenA:
      "No nosso balcão estão sempre dois colaboradores em serviço, cuja única tarefa é acompanhar os clientes que chegam até ao seu veículo. Se o balcão estiver momentaneamente vazio, é porque um colega está a acompanhar o cliente anterior — cada acompanhamento demora cerca de 7 a 8 minutos. Aguarde cerca de 10 minutos. Se ninguém regressar até lá, escreva-nos por WhatsApp: informamos de imediato o seu motorista, pedimos-lhe que pare no ponto mais próximo e conduzimo-lo diretamente ao seu veículo, sem mais esperas.",
    faqEightQ:
      "O que acontece se demorar mais de 90 minutos a sair do aeroporto?",
    faqEightA:
      "Os primeiros 90 minutos após a aterragem estão incluídos gratuitamente — bem mais do que o necessário para o controlo de passaportes, a bagagem e a alfândega — e este período ajusta-se automaticamente em caso de atrasos de voo. Só se permanecer mais tempo no terminal por motivos alheios ao seu voo é que se aplica uma contribuição de estacionamento de 5 € por cada hora adicional. Na prática, isto quase nunca acontece: quase todos os nossos clientes já estão a caminho muito antes disso.",
    faqNineQ: "Como pago?",
    faqNineA:
      "Paga ao seu motorista em dinheiro no início da viagem — não é possível pagar com cartão. Os preços são fixados em euros (EUR): o valor fixo corresponde exatamente ao que viu na reserva — por veículo, incluindo todas as taxas de aeroporto e estacionamento, sem custos posteriores. Prefere pagar em dólares americanos ou em liras turcas? Escreva-nos previamente por WhatsApp para obter um preço separado, uma vez que a taxa de câmbio é diferente. O seu motorista recebe-o, carrega a sua bagagem e instala as cadeiras para crianças que solicitou; após o pagamento, começa a sua viagem.",
    faqTenQ: "Como mantenho o contacto no transfere de regresso?",
    faqTenA:
      "Assim que confirmar a data e a hora do seu regresso com a nossa equipa por WhatsApp, atribuímos-lhe um veículo algumas horas antes do transfere e enviamos-lhe fotografias do mesmo por WhatsApp — e, se desejar, também o número de telefone do seu motorista. Quando o seu motorista chega ao hotel, informa a receção, que avisa o seu quarto assim que o veículo estiver pronto. Os nossos motoristas nunca ligam diretamente aos clientes: toda a comunicação é feita através do nosso apoio central por WhatsApp, para que saiba sempre exatamente com quem está a falar.",
    faqElevenQ: "Posso cancelar ou alterar a minha reserva?",
    faqElevenA:
      "Sim, e sempre de forma gratuita. Como não cobramos qualquer pagamento antecipado, não há nada a reembolsar nem tempo de espera pelo seu dinheiro — se os seus planos mudarem, basta uma mensagem por WhatsApp. Alterações de hora, número de voo ou morada de destino são tratadas da mesma forma, sem custo adicional.",
    faqTwelveQ: "Em que moeda posso pagar?",
    faqTwelveA:
      "Os nossos preços são fixados em euros (EUR) e pagos em dinheiro; não aceitamos cartões. Se pretender pagar em dólares americanos ou em liras turcas, o valor depende da taxa de câmbio do dia — por isso, escreva-nos por WhatsApp antes do seu transfere. Indicamos-lhe um preço claro e informamos o seu motorista, para que não haja qualquer negociação dentro do veículo.",
    faqThirteenQ: "Quanta bagagem posso levar?",
    faqThirteenA:
      "Em regra, uma mala grande e uma peça de bagagem de mão por pessoa. Se levar mais — uma mala adicional, um saco de golfe, um carrinho de bebé, esquis ou uma bicicleta — basta indicá-lo na reserva; disponibilizamos, sem custo adicional, um veículo com a capacidade adequada. O importante é apenas que saibamos com antecedência. Um Mercedes Vito acomoda até 6 pessoas e um Sprinter até 12.",
    faqFourteenQ: "O que acontece se me atrasar no transfere de regresso?",
    faqFourteenA:
      "O seu motorista está no seu hotel à hora combinada e aguarda 15 minutos sem custo. Se se perspetivar um atraso, basta uma mensagem por WhatsApp: verificamos a hora do seu voo, informamos o seu motorista e combinamos consigo o procedimento. O nosso objetivo não é apressá-lo, mas levá-lo tranquilamente ao seu voo.",
    faqFifteenQ: "É possível fazer paragens durante a viagem?",
    faqFifteenA:
      "Com certeza. Se quiser parar num supermercado ou numa farmácia, ou fazer uma breve paragem para uma fotografia, basta indicá-lo na reserva ou por WhatsApp — planeamos a rota em conformidade. Se uma paragem se afastar significativamente do seu percurso, informamo-lo antes da partida se houver algum custo adicional; não há surpresas posteriores.",
    faqThreeQ: "Existem cadeiras para crianças disponíveis?",
    faqThreeA:
      "Sim. Alcofas, cadeiras para crianças e assentos elevatórios estão disponíveis gratuitamente mediante reserva prévia.",
    faqFourQ: "É possível transportar sacos de golfe e bagagem volumosa?",
    faqFourA:
      "Sim. O Sprinter e o Vito são ideais para grupos de golfe. Indique-nos a sua bagagem e planeamos o veículo adequado.",
    faqFiveQ: "O preço apresentado é definitivo?",
    faqFiveA:
      "Sim. O preço da sua reserva é o valor que entrega ao seu motorista em dinheiro — por veículo, incluindo todas as taxas de aeroporto, os custos de estacionamento e os primeiros 90 minutos de tempo de espera. Não há custos ocultos.",
    contactEyebrow: "A sua viagem começa aqui",
    contactTitle: "Chegue a Antalya<br />de forma excecional.",
    contactBody:
      "Reserve online em menos de dois minutos ou fale diretamente com a nossa equipa de concierge 24/7.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Resposta normalmente em poucos minutos",
    callUs: "Ligar 24/7",
    emailUs: "E-mail do concierge",
    replyHour: "Resposta no prazo de uma hora",
    fromAirport: "Do aeroporto de Antalya",
    perVehicle: "por veículo · preço fixo",
    footerTagline:
      "Serviços privados de motorista em toda a Riviera Turca.",
    explore: "Descobrir",
    information: "Informação",
    licensed: "Fornecedor licenciado de transferes privados · Conforme TÜRSAB",
    quoteReady: "O seu transfere privado",
    vehicle: "Veículo",
    journeyTime: "Tempo de viagem",
    totalFixed: "Preço total",
    quoteIncludes:
      "Inclui Meet & Greet, rastreio de voo, estacionamento, 90 minutos de tempo de espera e água mineral.",
    confirmWhatsapp: "Confirmar por WhatsApp",
    chatWithUs: "Fale connosco",
    bookNowCta: "Reservar agora",
    backToQuote: "Voltar",
    yourDetails: "Os seus dados",
    fullName: "Nome completo",
    emailLabel: "E-mail",
    phoneLabel: "Telefone / WhatsApp",
    flightNumber: "Número do voo",
    flightArrivalTime: "Hora de chegada",
    notesLabel: "Pedidos especiais",
    confirmBooking: "Confirmar reserva",
    bookingConfirmed: "Reserva confirmada",
    referenceLabel: "Referência",
    weWillContact:
      "O seu pedido de reserva foi enviado. Entraremos em contacto no prazo de 30 minutos.",
    paymentError: "O pagamento falhou. Tente novamente.",
  },
  ro: {
    navFleet: "Vehicule",
    navService: "Servicii",
    navRoutes: "Rute",
    navReviews: "Recenzii",
    navContact: "Contact",
    bookNow: "Rezervă acum",
    alwaysAvailable: "Disponibil 24 de ore, în fiecare zi",
    heroEyebrow: "Serviciu privat de șofer · Antalya",
    heroTitle: "Transferuri premium de la aeroport<br />în Antalya",
    heroSubtitle:
      "Transferuri private cu șofer de la aeroportul Antalya către Belek, Side, Kemer și Alanya.",
    campaignBadge: "Ofertă online",
    campaignDiscount: "Preț special",
    campaignScope: "la toate prețurile de transfer",
    campaignApplied: "Preț special online aplicat",
    onlineDiscountShort: "Preț special online",
    discountPricesShown: "Se afișează prețurile speciale online",
    bookTransfer: "Rezervă transferul",
    instantQuote: "Obține prețul instant",
    googleRated: "Evaluare Google",
    trustedGuests: "Rezervat de peste 2.500 de oaspeți",
    discover: "Descoperă",
    privateJourney: "Călătoria dumneavoastră privată",
    quoteTitle: "Unde doriți să vă ducem?",
    pickup: "Preluare",
    destination: "Destinație",
    date: "Dată",
    tripType: "Tip de călătorie",
    oneWay: "Doar dus",
    roundTrip: "Dus-întors",
    roundTripHint:
      "În cazul unei călătorii dus-întors, întoarcerea se face pe aceeași rută în sens invers.",
    returnDate: "Data întoarcerii",
    returnPickupTime: "Ora de preluare la întoarcere",
    returnFlightNumber: "Numărul zborului de întoarcere",
    arrivalDate: "Data sosirii",
    arrivalFlightTime: "Ora sosirii zborului",
    arrivalFlightNumber: "Numărul zborului de sosire",
    roundTripPriceNote: "Dus-întors · 2 călătorii",
    guests: "Oaspeți",
    airportOption: "Aeroportul Antalya (AYT)",
    hotelOption: "Hotel",
    privateAddressOption: "Adresă privată",
    pickupAddress: "Adresa completă de preluare",
    pickupAddressPlaceholder: "Numele hotelului, strada, numărul și cartierul",
    dropoffAddress: "Adresa completă de destinație",
    dropoffAddressPlaceholder: "Numele hotelului, strada, numărul și cartierul",
    dropoffAddressRequired:
      "Adresa de destinație trebuie să aibă între 6 și 160 de caractere.",
    customDestinationPrice:
      "Prețul va fi confirmat după verificarea adresei de destinație.",
    selectDestination: "Selectați destinația",
    airportReturnPrice:
      "Prețul va fi confirmat după verificarea hotelului sau a adresei de preluare.",
    oneGuest: "1 oaspete",
    twoGuests: "2 oaspeți",
    threeGuests: "3 oaspeți",
    fourGuests: "4 oaspeți",
    fiveGuests: "5 oaspeți",
    sixGuests: "6 oaspeți",
    sevenGuests: "7 oaspeți",
    viewQuote: "Afișează prețul",
    flightTracking: "Urmărirea zborului în timp real",
    fixedPrice: "Preț fix garantat",
    meetGreet: "Întâmpinare personală",
    speakingDrivers: "Vorbitori de germană și engleză",
    tbLicensed: "Certificat TÜRSAB",
    tbFlightTracking: "Urmărirea zborului",
    tbFixedPrice: "Garanția prețului fix",
    tb247Concierge: "Concierge 24/7",
    tbChildSeats: "Scaune pentru copii incluse",
    welcomeEyebrow: "Bine ați venit la cel mai înalt nivel",
    welcomeTitle: "Călătoriți cu stil.<br />Sosiți relaxat.",
    welcomeBody:
      "Din momentul aterizării, ne-am gândit la fiecare detaliu. Echipa noastră de la aeroport vă întâmpină, șoferul dumneavoastră trage la punctul de preluare, iar bagajele sunt încărcate într-un vehicul privat atent pregătit.",
    ourStandards: "Standardele noastre de serviciu",
    concierge: "Serviciu concierge",
    guestsWelcomed: "Oaspeți întâmpinați",
    guestRating: "Evaluare medie",
    privateTransfers: "Transferuri private",
    fleetEyebrow: "Flota noastră",
    fleetTitle: "Spațiul dumneavoastră privat,<br />desăvârșit în fiecare detaliu.",
    fleetIntro:
      "Călătoriți confortabil, cu spațiu generos pentru familie, echipament de golf și bagaje.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Transport VIP spatios pentru grupuri mari, cu mult loc pentru pasageri și bagaje.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "O cabină privată confortabilă pentru familii și grupuri mici.",
    signatureFleet: "Flota Signature",
    passengers: "Pasageri",
    suitcases: "Valize",
    luggageLabel: "Bagaje voluminoase",
    capacitySwitchedSprinter:
      "Numărul de pasageri și bagaje depășește capacitatea Vito — s-a comutat pe Mercedes Sprinter.",
    capacityNoVehicle:
      "Acest număr de pasageri și bagaje depășește capacitatea vehiculelor noastre. Vă rugăm să ne contactați prin WhatsApp.",
    leatherSeats: "Scaune premium din piele",
    wifi: "WiFi gratuit",
    water: "Apă minerală răcită",
    childSeats: "Scaune pentru copii la cerere",
    television: "Televizor în vehicul",
    coldDrinks: "Băuturi reci",
    snacks: "Gustări",
    nameSignGreeting: "Întâmpinare la ghișeul J / 777",
    reserveVehicle: "Rezervă vehiculul",
    insideVclass: "Interiorul Sprinter",
    interiorTitle: "Un salon privat între<br />aeroport și hotel.",
    serviceEyebrow: "Standardul Antalya VIP",
    serviceTitle: "Mai mult decât un transfer.<br />O întâmpinare deosebită.",
    serviceIntro:
      "Atenție la nivel de hotel, șoferi locali experimentați și siguranță absolută de la aeroport până la resort.",
    trackingTitle: "Urmărirea zborului",
    trackingBody:
      "Vă urmărim zborul în timp real și ajustăm automat și gratuit ora de preluare.",
    chauffeurTitle: "Șoferi profesioniști",
    chauffeurBody:
      "Mereu îngrijiți, discreți și aleși pentru cunoașterea zonei și cel mai înalt standard de serviciu.",
    greetTitle: "Meet & Greet",
    greetBody:
      "La sosirile internaționale, echipa noastră de la aeroport vă întâmpină la ghișeul J / 777, cheamă șoferul la punctul de preluare și vă ajută cu bagajele.",
    supportTitle: "Concierge 24/7",
    supportBody:
      "Înainte, în timpul și după călătoria dumneavoastră, o persoană de contact personală este mereu disponibilă.",
    priceTitle: "Prețuri fixe",
    priceBody:
      "Prețul confirmat este prețul final. Timpul de așteptare, parcarea și întârzierile de zbor sunt incluse.",
    familyTitle: "Pentru familii",
    familyBody:
      "Scaune potrivite pentru copii, interioare spațioase și ajutor plin de răbdare pentru o sosire relaxată.",
    routesEyebrow: "Cele mai populare călătorii ale noastre",
    routesTitle: "De la aeroportul Antalya<br />către Riviera Turcească.",
    routesIntro:
      "Toate prețurile sunt per vehicul, nu per persoană, incluzând 90 de minute de așteptare.",
    golfFavourite: "Preferatul golfiștilor",
    from: "De la",
    reviewsEyebrow: "Recenziile oaspeților",
    reviewsTitle: "Un serviciu care rămâne<br />mult timp în amintire.",
    googleReviews: "Pe baza a 387 de recenzii Google verificate",
    reviewOne:
      "„Șoferul nostru a așteptat în ciuda unei întârzieri de 90 de minute a zborului. Vehiculul era impecabil, plăcut de răcoros și deja echipat cu ambele scaune pentru copii. Exact întâmpinarea de care familia noastră avea nevoie.”",
    reviewTwo:
      "„De la primul contact pe WhatsApp și până la sosirea în Belek, totul a fost de primă clasă. Punctual, discret și foarte profesionist. Chiar și genților noastre de golf le-a fost loc din belșug.”",
    reviewThree:
      "„S-a simțit ca serviciul de șofer al unui hotel, nu ca un taxi de aeroport. Comunicare clară, un vehicul impecabil și un șofer sincer politicos.”",
    trustedBy: "Rezervat de oaspeți ai celor mai importante resorturi din Antalya",
    faqEyebrow: "Întrebări frecvente",
    faqTitle: "Înainte de călătoria dumneavoastră.",
    faqCatArrival: "Sosire și transfer",
    faqCatJourney: "Întoarcere și călătorie",
    faqCatPayment: "Plată și preț",
    faqCatVehicle: "Vehicul și bagaje",
    faqReminder: "Vă rugăm să citiți secțiunea de întrebări frecvente de pe site-ul nostru înainte de călătorie.",
    viewFaq: "Vezi întrebările frecvente",
    faqIntro:
      "Tot ce trebuie să știți despre transferul dumneavoastră privat de la aeroportul Antalya.",
    askQuestion: "Pune o întrebare",
    faqOneQ: "Ce se întâmplă în caz de întârziere a zborului?",
    faqOneA:
      "Nu trebuie să faceți nimic. Vă urmărim zborul în timp real și vă ajustăm automat ora de preluare. Nu percepem niciodată taxe pentru întârzierile companiei aeriene – șoferul dumneavoastră este acolo oricând aterizați, iar primele 90 de minute după aterizare sunt întotdeauna incluse.",
    faqTwoQ:
      "Sosesc cu un zbor internațional. Cum decurge preluarea?",
    faqTwoA:
      "După controlul pașapoartelor și ridicarea bagajelor, urmați ceilalți pasageri către zona Meet & Greet și veniți la ghișeul nostru J / 777. Spuneți-le pur și simplu colegilor noștri numele dumneavoastră – atât este suficient. Echipa noastră vă anunță imediat șoferul; acesta intră în aeroport și așteaptă la punctul de preluare, în timp ce colegul nostru vă însoțește până la vehicul. Întregul proces durează aproximativ 7–8 minute.",
    faqSixQ:
      "Sosesc cu un zbor intern. Unde îmi găsesc șoferul?",
    faqSixA:
      "Zona Meet & Greet este disponibilă exclusiv pentru sosirile internaționale. De aceea, oaspeții de pe zboruri interne sunt deserviți diferit: vă trimitem numărul de telefon al șoferului înainte de transfer. Anunțați-l scurt după aterizare – vă va prelua din holul de sosiri.",
    faqSevenQ: "Ce fac dacă nu este nimeni la ghișeul J / 777?",
    faqSevenA:
      "La ghișeul nostru sunt permanent doi colegi a căror unică sarcină este să însoțească oaspeții sosiți până la vehiculul lor. Dacă ghișeul este momentan neocupat, un coleg tocmai însoțește oaspetele dinaintea dumneavoastră – fiecare însoțire durează aproximativ 7–8 minute. Vă rugăm să așteptați circa 10 minute. Dacă până atunci nu s-a întors nimeni, scrieți-ne prin WhatsApp: vă anunțăm imediat șoferul, îl punem să oprească în cel mai apropiat punct și vă conducem direct la vehicul, fără altă așteptare.",
    faqEightQ:
      "Ce se întâmplă dacă am nevoie de mai mult de 90 de minute să ies din aeroport?",
    faqEightA:
      "Primele 90 de minute după aterizare sunt incluse gratuit – considerabil mai mult decât necesită controlul pașapoartelor, bagajele și vama – iar acest interval se decalează automat în caz de întârziere a zborului. Doar dacă rămâneți mai mult în terminal din motive fără legătură cu zborul, se adaugă o contribuție la costul parcării de 5 € pentru fiecare oră suplimentară. În practică, acest lucru nu se întâmplă aproape niciodată: aproape toți oaspeții noștri sunt pe drum cu mult înainte.",
    faqNineQ: "Cum plătesc?",
    faqNineA:
      "Plătiți șoferului dumneavoastră în numerar la începutul călătoriei – plata cu cardul nu este posibilă. Prețurile sunt stabilite în euro (EUR): suma fixă corespunde exact cu ceea ce ați văzut la rezervare – per vehicul, incluzând toate taxele de aeroport și de parcare, fără suplimente ulterioare. Preferați să plătiți în dolari americani sau lire turcești? Scrieți-ne în prealabil prin WhatsApp pentru un preț separat, deoarece cursul de schimb diferă. Șoferul dumneavoastră vă întâmpină, vă încarcă bagajele și montează scaunele pentru copii dorite; după plată începe călătoria.",
    faqTenQ: "Cum păstrez legătura la transferul de întoarcere?",
    faqTenA:
      "De îndată ce ați confirmat data și ora întoarcerii prin WhatsApp cu echipa noastră, vă alocăm vehiculul cu câteva ore înainte de transfer și vă trimitem fotografii cu acesta prin WhatsApp – la cerere și numărul de telefon al șoferului. Când șoferul ajunge la hotel, informează recepția, care vă anunță camera de îndată ce vehiculul este pregătit. Șoferii noștri nu sună niciodată direct oaspeții: întreaga comunicare se desfășoară prin serviciul nostru central WhatsApp, astfel încât să știți întotdeauna exact cu cine vorbiți.",
    faqElevenQ: "Pot să anulez sau să modific rezervarea?",
    faqElevenA:
      "Da, și întotdeauna gratuit. Deoarece nu percepem plată în avans, nu există nimic de rambursat și nicio așteptare pentru banii dumneavoastră — dacă planurile se schimbă, un mesaj prin WhatsApp este suficient. Modificările de oră, număr de zbor sau adresă de destinație le rezolvăm la fel, fără costuri suplimentare.",
    faqTwelveQ: "În ce monedă pot plăti?",
    faqTwelveA:
      "Prețurile noastre sunt stabilite în euro (EUR) și se plătesc în numerar; cardurile nu sunt acceptate. Dacă doriți să plătiți în dolari americani sau lire turcești, suma depinde de cursul zilei — de aceea scrieți-ne înainte de transfer prin WhatsApp. Vă comunicăm un preț clar și vă informăm șoferul, astfel încât în vehicul să nu se negocieze nimic.",
    faqThirteenQ: "Câte bagaje pot lua cu mine?",
    faqThirteenA:
      "De regulă, o valiză mare și un bagaj de mână de persoană. Dacă aveți mai mult — o valiză suplimentară, o geantă de golf, un cărucior, schiuri sau o bicicletă — spuneți-ne pur și simplu la rezervare; vom pune la dispoziție, fără cost suplimentar, un vehicul cu capacitate potrivită. Important este doar să știm dinainte. Un Mercedes Vito are loc pentru până la 6 persoane, iar un Sprinter pentru până la 12.",
    faqFourteenQ: "Ce se întâmplă dacă întârzii la transferul de întoarcere?",
    faqFourteenA:
      "Șoferul dumneavoastră este la hotel la ora stabilită și așteaptă 15 minute gratuit. Dacă se conturează o întârziere, un mesaj prin WhatsApp este suficient: vă verificăm ora zborului, vă informăm șoferul și stabilim împreună cu dumneavoastră programul. Scopul nostru nu este să vă grăbim, ci să vă ducem relaxat la zbor.",
    faqFifteenQ: "Sunt posibile opriri intermediare în timpul călătoriei?",
    faqFifteenA:
      "Bineînțeles. Dacă doriți să opriți la un supermarket sau la o farmacie ori să vă opriți scurt pentru o fotografie, spuneți-ne pur și simplu la rezervare sau prin WhatsApp — planificăm ruta în consecință. Dacă o oprire vă abate considerabil de la traseu, vă spunem înainte de plecare dacă se adaugă ceva; nimic nu vă surprinde ulterior.",
    faqThreeQ: "Sunt disponibile scaune pentru copii?",
    faqThreeA:
      "Da. Scaunele pentru bebeluși, scaunele pentru copii și înălțătoarele sunt disponibile gratuit la comandă anticipată.",
    faqFourQ: "Pot fi transportate genți de golf și bagaje voluminoase?",
    faqFourA:
      "Da. Sprinter și Vito sunt ideale pentru grupurile de golf. Comunicați-ne bagajele dumneavoastră și planificăm vehiculul potrivit.",
    faqFiveQ: "Prețul afișat este definitiv?",
    faqFiveA:
      "Da. Prețul din rezervarea dumneavoastră este suma pe care o dați șoferului în numerar – per vehicul, incluzând toate taxele de aeroport, costurile de parcare și primele 90 de minute de așteptare. Nu există costuri ascunse.",
    contactEyebrow: "Călătoria dumneavoastră începe aici",
    contactTitle: "Sosiți excepțional de bine<br />în Antalya.",
    contactBody:
      "Rezervați online în mai puțin de două minute sau vorbiți direct cu echipa noastră de concierge 24/7.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Răspuns de obicei în câteva minute",
    callUs: "Sunați 24/7",
    emailUs: "E-mail concierge",
    replyHour: "Răspuns în decurs de o oră",
    fromAirport: "De la aeroportul Antalya",
    perVehicle: "per vehicul · preț fix",
    footerTagline:
      "Servicii private de șofer pe toată Riviera Turcească.",
    explore: "Descoperă",
    information: "Informații",
    licensed: "Furnizor autorizat de transferuri private · conform TÜRSAB",
    quoteReady: "Transferul dumneavoastră privat",
    vehicle: "Vehicul",
    journeyTime: "Durata călătoriei",
    totalFixed: "Preț total",
    quoteIncludes:
      "Include Meet & Greet, urmărirea zborului, parcarea, 90 de minute de așteptare și apă minerală.",
    confirmWhatsapp: "Confirmă prin WhatsApp",
    chatWithUs: "Discutați cu noi",
    bookNowCta: "Rezervă acum",
    backToQuote: "Înapoi",
    yourDetails: "Datele dumneavoastră",
    fullName: "Nume complet",
    emailLabel: "E-mail",
    phoneLabel: "Telefon / WhatsApp",
    flightNumber: "Numărul zborului",
    flightArrivalTime: "Ora sosirii",
    notesLabel: "Cerințe speciale",
    confirmBooking: "Confirmă rezervarea",
    bookingConfirmed: "Rezervare confirmată",
    referenceLabel: "Referință",
    weWillContact:
      "Cererea dumneavoastră de rezervare a fost trimisă. Vă contactăm în decurs de 30 de minute.",
    paymentError: "Plata a eșuat. Vă rugăm să încercați din nou.",
  },

  de: {
    hotelSearchHint: "Geben Sie Ihren Hotelnamen ein und wählen Sie ihn aus der Liste – Zielregion und Preis tragen wir für Sie ein.",
    hotelNotListed: "Mein Hotel ist nicht in der Liste",
    hotelNoMatch: "Noch kein Treffer. Geben Sie den Namen ein und wählen Sie die Region selbst.",
    navFleet: "Fahrzeuge",
    navService: "Service",
    navRoutes: "Strecken",
    navReviews: "Bewertungen",
    navContact: "Kontakt",
    bookNow: "Jetzt buchen",
    alwaysAvailable: "24 Stunden, jeden Tag erreichbar",
    heroEyebrow: "Privater Chauffeurservice · Antalya",
    heroTitle: "Premium Flughafentransfers<br />in Antalya",
    heroSubtitle:
      "Private Transfers mit Chauffeur vom Flughafen Antalya nach Belek, Side, Kemer und Alanya.",
    campaignBadge: "Online Spezial",
    campaignDiscount: "Sonderpreis",
    campaignScope: "auf alle Transferpreise",
    campaignApplied: "Online-Sonderpreis angewendet",
    onlineDiscountShort: "Online-Sonderpreis",
    discountPricesShown: "Online-Sonderpreise werden angezeigt",
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
    tripType: "Fahrtart",
    oneWay: "Einfache Fahrt",
    roundTrip: "Hin- und Rückfahrt",
    roundTripHint:
      "Bei Hin- und Rückfahrt erfolgt die Rückfahrt auf derselben Strecke in umgekehrter Richtung.",
    returnDate: "Rückfahrtdatum",
    returnPickupTime: "Abholzeit der Rückfahrt",
    returnFlightNumber: "Rückflugnummer",
    arrivalDate: "Ankunftsdatum",
    arrivalFlightTime: "Ankunftszeit des Fluges",
    arrivalFlightNumber: "Ankunftsflugnummer",
    roundTripPriceNote: "Hin- und Rückfahrt · 2 Fahrten",
    guests: "Gäste",
    airportOption: "Flughafen Antalya (AYT)",
    hotelOption: "Hotel",
    privateAddressOption: "Privatadresse",
    pickupAddress: "Vollständige Abholadresse",
    pickupAddressPlaceholder: "Hotelname, Straße, Hausnummer und Stadtteil",
    dropoffAddress: "Vollständige Zieladresse",
    dropoffAddressPlaceholder: "Hotelname, Straße, Hausnummer und Stadtteil",
    dropoffAddressRequired:
      "Die Zieladresse muss zwischen 6 und 160 Zeichen lang sein.",
    customDestinationPrice:
      "Der Preis wird nach Prüfung der Zieladresse bestätigt.",
    selectDestination: "Ziel auswählen",
    airportReturnPrice:
      "Der Preis wird nach Prüfung des Hotels oder der Abholadresse bestätigt.",
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
    tbLicensed: "TÜRSAB-zertifiziert",
    tbFlightTracking: "Flugverfolgung",
    tbFixedPrice: "Festpreisgarantie",
    tb247Concierge: "24/7 Concierge",
    tbChildSeats: "Kindersitze inklusive",
    welcomeEyebrow: "Willkommen auf höchstem Niveau",
    welcomeTitle: "Stilvoll reisen.<br />Entspannt ankommen.",
    welcomeBody:
      "Vom Moment Ihrer Landung an ist an jedes Detail gedacht. Unser Flughafenteam empfängt Sie, Ihr Chauffeur fährt am Abholpunkt vor und Ihr Gepäck wird in ein sorgfältig vorbereitetes Privatfahrzeug geladen.",
    ourStandards: "Unsere Servicestandards",
    concierge: "Concierge-Service",
    guestsWelcomed: "Begrüßte Gäste",
    guestRating: "Durchschnittliche Bewertung",
    privateTransfers: "Private Transfers",
    fleetEyebrow: "Unsere Flotte",
    fleetTitle: "Ihr privater Raum,<br />vollendet bis ins Detail.",
    fleetIntro:
      "Reisen Sie komfortabel mit großzügigem Platz für Familie, Golfgepäck und Koffer.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Großzügiger VIP-Transport für größere Gruppen mit viel Platz für Passagiere und Gepäck.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Eine komfortable Privatkabine für Familien und kleine Gruppen.",
    signatureFleet: "Signature Flotte",
    passengers: "Passagiere",
    suitcases: "Koffer",
    luggageLabel: "Großes Gepäck",
    capacitySwitchedSprinter:
      "Passagiere und Gepäck übersteigen den Vito — auf Mercedes Sprinter umgestellt.",
    capacityNoVehicle:
      "So viele Passagiere und Gepäck übersteigen unsere Fahrzeuge. Bitte kontaktieren Sie uns per WhatsApp.",
    leatherSeats: "Premium-Ledersitze",
    wifi: "Kostenloses WLAN",
    water: "Gekühltes Mineralwasser",
    childSeats: "Kindersitze auf Wunsch",
    television: "Fernseher im Fahrzeug",
    coldDrinks: "Kalte Getränke",
    snacks: "Snacks",
    nameSignGreeting: "Empfang am Schalter J / 777",
    reserveVehicle: "Fahrzeug reservieren",
    insideVclass: "Im Sprinter Interieur",
    interiorTitle: "Eine private Lounge zwischen<br />Flughafen und Hotel.",
    serviceEyebrow: "Der Antalya VIP Standard",
    serviceTitle: "Mehr als ein Transfer.<br />Ein besonderer Empfang.",
    serviceIntro:
      "Aufmerksamkeit auf Hotelniveau, erfahrene lokale Chauffeure und absolute Sicherheit vom Flughafen bis zum Resort.",
    trackingTitle: "Flugverfolgung",
    trackingBody:
      "Wir verfolgen Ihren Flug in Echtzeit und passen die Abholung automatisch und kostenlos an.",
    chauffeurTitle: "Professionelle Chauffeure",
    chauffeurBody:
      "Stets gepflegt, diskret und ausgewählt für Ortskenntnis und höchsten Servicestandard.",
    greetTitle: "Meet & Greet",
    greetBody:
      "Bei internationalen Ankünften empfängt Sie unser Flughafenteam am Schalter J / 777, ruft Ihren Chauffeur zum Abholpunkt und hilft mit dem Gepäck.",
    supportTitle: "24/7 Concierge",
    supportBody:
      "Vor, während und nach Ihrer Reise ist immer ein persönlicher Ansprechpartner erreichbar.",
    priceTitle: "Festpreise",
    priceBody:
      "Der bestätigte Preis ist der Endpreis. Wartezeit, Parken und Flugverspätungen sind inklusive.",
    familyTitle: "Für Familien",
    familyBody:
      "Passende Kindersitze, großzügige Innenräume und geduldige Hilfe für eine entspannte Ankunft.",
    routesEyebrow: "Unsere beliebtesten Fahrten",
    routesTitle: "Vom Flughafen Antalya<br />an die Türkische Riviera.",
    routesIntro:
      "Alle Preise gelten pro Fahrzeug, nicht pro Person, inklusive 90 Minuten Wartezeit.",
    golfFavourite: "Golf-Favorit",
    from: "Ab",
    reviewsEyebrow: "Gästebewertungen",
    reviewsTitle: "Service, der lange<br />in Erinnerung bleibt.",
    googleReviews: "Basierend auf 387 verifizierten Google-Bewertungen",
    reviewOne:
      "„Unser Fahrer wartete trotz 90 Minuten Flugverspätung. Das Fahrzeug war makellos, angenehm kühl und bereits mit beiden Kindersitzen ausgestattet. Genau der Empfang, den unsere Familie brauchte.“",
    reviewTwo:
      "„Vom ersten WhatsApp-Kontakt bis zur Ankunft in Belek absolut erstklassig. Pünktlich, diskret und sehr professionell. Auch unsere Golftaschen hatten bequem Platz.“",
    reviewThree:
      "„Das fühlte sich wie der Chauffeurservice eines Hotels an, nicht wie ein Flughafentaxi. Klare Kommunikation, ein makelloses Fahrzeug und ein aufrichtig höflicher Fahrer.“",
    trustedBy: "Gebucht von Gästen führender Resorts in Antalya",
    faqEyebrow: "Häufig gefragt",
    faqTitle: "Vor Ihrer Reise.",
    faqCatArrival: "Ankunft & Transfer",
    faqCatJourney: "Rückfahrt & Fahrt",
    faqCatPayment: "Zahlung & Preis",
    faqCatVehicle: "Fahrzeug & Gepäck",
    faqReminder: "Bitte lesen Sie vor Ihrer Reise den FAQ-Bereich auf unserer Website.",
    viewFaq: "FAQ ansehen",
    faqIntro:
      "Alles, was Sie über Ihren privaten Flughafentransfer in Antalya wissen müssen.",
    askQuestion: "Frage stellen",
    faqOneQ: "Was passiert bei einer Flugverspätung?",
    faqOneA:
      "Sie müssen nichts unternehmen. Wir verfolgen Ihren Flug in Echtzeit und passen Ihre Abholzeit automatisch an. Verspätungen der Fluggesellschaft berechnen wir nie – Ihr Chauffeur ist da, wann immer Sie landen, und die ersten 90 Minuten nach der Landung sind immer inklusive.",
    faqTwoQ:
      "Ich komme mit einem internationalen Flug an. Wie läuft die Abholung ab?",
    faqTwoA:
      "Nach Passkontrolle und Gepäckausgabe folgen Sie den übrigen Passagieren in den Meet & Greet Bereich und kommen zu unserem Schalter J / 777. Nennen Sie unseren Mitarbeitern einfach Ihren Namen – das genügt. Unser Team informiert sofort Ihren Chauffeur; er fährt in den Flughafen ein und steht am Abholpunkt bereit, während unser Mitarbeiter Sie zum Fahrzeug begleitet. Der gesamte Ablauf dauert etwa 7–8 Minuten.",
    faqSixQ:
      "Ich komme mit einem Inlandsflug an. Wo finde ich meinen Chauffeur?",
    faqSixA:
      "Der Meet & Greet Bereich steht ausschließlich internationalen Ankünften zur Verfügung. Inlandsgäste betreuen wir deshalb anders: Wir senden Ihnen vor dem Transfer die Telefonnummer Ihres Chauffeurs. Geben Sie ihm nach der Landung kurz Bescheid – er holt Sie in der Ankunftshalle ab.",
    faqSevenQ: "Was tue ich, wenn am Schalter J / 777 niemand ist?",
    faqSevenA:
      "An unserem Schalter sind durchgehend zwei Mitarbeiter im Einsatz, deren einzige Aufgabe es ist, ankommende Gäste zu ihrem Fahrzeug zu begleiten. Ist der Schalter kurz unbesetzt, begleitet ein Kollege gerade den Gast vor Ihnen – jede Begleitung dauert etwa 7–8 Minuten. Bitte warten Sie rund 10 Minuten. Ist bis dahin niemand zurück, schreiben Sie uns über WhatsApp: Wir informieren Ihren Chauffeur umgehend, lassen ihn am nächstgelegenen Punkt halten und führen Sie ohne weiteres Warten direkt zu Ihrem Wagen.",
    faqEightQ:
      "Was gilt, wenn ich länger als 90 Minuten für den Weg aus dem Flughafen brauche?",
    faqEightA:
      "Die ersten 90 Minuten nach der Landung sind kostenfrei enthalten – deutlich mehr, als Passkontrolle, Gepäck und Zoll benötigen – und dieses Zeitfenster verschiebt sich bei Flugverspätungen automatisch. Nur wenn Sie aus Gründen, die nicht mit Ihrem Flug zusammenhängen, länger im Terminal bleiben, kommt ein Parkkostenbeitrag von 5 € je weitere Stunde hinzu. In der Praxis kommt das so gut wie nie vor: Nahezu alle unsere Gäste sind längst vorher unterwegs.",
    faqNineQ: "Wie bezahle ich?",
    faqNineA:
      "Sie bezahlen Ihrem Chauffeur zu Beginn der Fahrt bar – Kartenzahlung ist nicht möglich. Die Preise sind in Euro (EUR) festgelegt: Der Festbetrag entspricht genau dem, was Sie bei der Buchung gesehen haben – pro Fahrzeug, inklusive aller Flughafen- und Parkgebühren, ohne spätere Zusätze. Möchten Sie lieber in US-Dollar oder Türkischer Lira zahlen? Schreiben Sie uns vorab über WhatsApp für einen separaten Preis, da der Wechselkurs abweicht. Ihr Chauffeur begrüßt Sie, verlädt Ihr Gepäck und montiert die gewünschten Kindersitze; nach der Zahlung beginnt Ihre Fahrt.",
    faqTenQ: "Wie halte ich beim Rücktransfer Kontakt?",
    faqTenA:
      "Sobald Sie Datum und Uhrzeit Ihrer Rückfahrt per WhatsApp mit unserem Team bestätigt haben, teilen wir Ihnen einige Stunden vor dem Transfer Ihr Fahrzeug zu und senden Ihnen Fotos davon über WhatsApp – auf Wunsch auch die Telefonnummer Ihres Chauffeurs. Erreicht Ihr Chauffeur das Hotel, informiert er die Rezeption, die Ihr Zimmer benachrichtigt, sobald der Wagen bereitsteht. Unsere Chauffeure rufen Gäste nie direkt an: Die gesamte Kommunikation läuft über unsere zentrale WhatsApp-Betreuung, sodass Sie immer genau wissen, mit wem Sie sprechen.",
    faqElevenQ: "Kann ich meine Buchung stornieren oder ändern?",
    faqElevenA:
      "Ja, und das immer kostenfrei. Da wir keine Vorauszahlung nehmen, gibt es nichts zu erstatten und keine Wartezeit auf Ihr Geld — ändern sich Ihre Pläne, genügt eine Nachricht über WhatsApp. Änderungen von Uhrzeit, Flugnummer oder Zieladresse regeln wir ebenso, ohne Aufpreis.",
    faqTwelveQ: "In welcher Währung kann ich bezahlen?",
    faqTwelveA:
      "Unsere Preise sind in Euro (EUR) festgelegt und werden bar bezahlt; Karten werden nicht akzeptiert. Möchten Sie in US-Dollar oder Türkischen Lira zahlen, hängt der Betrag vom Tageskurs ab — schreiben Sie uns deshalb vor Ihrem Transfer über WhatsApp. Wir nennen Ihnen einen klaren Preis und informieren Ihren Chauffeur, sodass im Fahrzeug nichts verhandelt wird.",
    faqThirteenQ: "Wie viel Gepäck darf ich mitnehmen?",
    faqThirteenA:
      "In der Regel ein großer Koffer und ein Handgepäckstück pro Person. Haben Sie mehr dabei — einen zusätzlichen Koffer, ein Golfbag, einen Kinderwagen, Ski oder ein Fahrrad — sagen Sie es einfach bei der Buchung; wir stellen ohne Aufpreis ein Fahrzeug mit passender Kapazität. Entscheidend ist nur, dass wir es vorher wissen. Ein Mercedes Vito fasst bis zu 6 Personen, ein Sprinter bis zu 12.",
    faqFourteenQ: "Was passiert, wenn ich mich beim Rücktransfer verspäte?",
    faqFourteenA:
      "Ihr Chauffeur ist zur vereinbarten Zeit an Ihrem Hotel und wartet 15 Minuten kostenfrei. Zeichnet sich eine Verzögerung ab, genügt eine Nachricht über WhatsApp: Wir prüfen Ihre Flugzeit, informieren Ihren Chauffeur und stimmen den Ablauf mit Ihnen ab. Unser Ziel ist nicht, Sie zu hetzen, sondern Sie entspannt zu Ihrem Flug zu bringen.",
    faqFifteenQ: "Sind Zwischenstopps während der Fahrt möglich?",
    faqFifteenA:
      "Selbstverständlich. Möchten Sie an einem Supermarkt oder einer Apotheke halten oder kurz für ein Foto anhalten, sagen Sie es einfach bei der Buchung oder über WhatsApp — wir planen die Route entsprechend. Führt ein Halt deutlich von Ihrer Strecke weg, sagen wir Ihnen vor der Abfahrt, ob etwas hinzukommt; nachträglich überrascht Sie nichts.",
    faqThreeQ: "Sind Kindersitze verfügbar?",
    faqThreeA:
      "Ja. Babyschalen, Kindersitze und Sitzerhöhungen sind bei Vorbestellung kostenlos verfügbar.",
    faqFourQ: "Können Golfbags und großes Gepäck transportiert werden?",
    faqFourA:
      "Ja. Sprinter und Vito sind ideal für Golfgruppen. Teilen Sie uns Ihr Gepäck mit und wir planen das passende Fahrzeug.",
    faqFiveQ: "Ist der angezeigte Preis endgültig?",
    faqFiveA:
      "Ja. Der Preis aus Ihrer Buchung ist der Betrag, den Sie Ihrem Chauffeur bar übergeben – pro Fahrzeug, inklusive aller Flughafengebühren, Parkkosten und der ersten 90 Minuten Wartezeit. Es gibt keine versteckten Kosten.",
    contactEyebrow: "Ihre Reise beginnt hier",
    contactTitle: "Außergewöhnlich gut<br />in Antalya ankommen.",
    contactBody:
      "Buchen Sie in weniger als zwei Minuten online oder sprechen Sie direkt mit unserem 24/7 Concierge-Team.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Antwort meist in wenigen Minuten",
    callUs: "24/7 anrufen",
    emailUs: "Concierge E-Mail",
    replyHour: "Antwort innerhalb einer Stunde",
    fromAirport: "Ab Flughafen Antalya",
    perVehicle: "pro Fahrzeug · Festpreis",
    footerTagline:
      "Private Chauffeurservices an der gesamten Türkischen Riviera.",
    explore: "Entdecken",
    information: "Information",
    licensed: "Lizenzierter privater Transferanbieter · TÜRSAB-konform",
    quoteReady: "Ihr privater Transfer",
    vehicle: "Fahrzeug",
    journeyTime: "Fahrzeit",
    totalFixed: "Gesamtpreis",
    quoteIncludes:
      "Inklusive Meet & Greet, Flugverfolgung, Parken, 90 Minuten Wartezeit und Mineralwasser.",
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
    bookingConfirmed: "Buchung bestätigt",
    referenceLabel: "Referenz",
    weWillContact:
      "Ihre Buchungsanfrage wurde gesendet. Wir melden uns innerhalb von 30 Minuten.",
    paymentError: "Zahlung fehlgeschlagen. Bitte erneut versuchen.",
  },
  tr: {
    hotelSearchHint: "Otelinizin adını yazıp listeden seçin; varış bölgesini ve fiyatı sizin için dolduralım.",
    hotelNotListed: "Otelim listede yok",
    hotelNoMatch: "Henüz eşleşme yok. Adı yazıp bölgeyi kendiniz seçebilirsiniz.",
    navFleet: "Araçlar",
    navService: "Hizmetler",
    navRoutes: "Rotalar",
    navReviews: "Yorumlar",
    navContact: "İletişim",
    bookNow: "Hemen rezervasyon",
    alwaysAvailable: "Her gün 24 saat hizmetinizdeyiz",
    heroEyebrow: "Özel şoför hizmeti · Antalya",
    heroTitle: "Antalya'da Premium<br />Havalimanı Transferi",
    heroSubtitle:
      "Antalya Havalimanı'ndan Belek, Side, Kemer ve Alanya'ya özel şoförlü transfer.",
    campaignBadge: "Online'a özel",
    campaignDiscount: "Özel fiyat",
    campaignScope: "tüm transfer fiyatlarında",
    campaignApplied: "Online'a özel fiyat uygulanmıştır",
    onlineDiscountShort: "Online özel fiyat",
    discountPricesShown: "Online'a özel fiyatlar gösteriliyor",
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
    tripType: "Yolculuk türü",
    oneWay: "Tek yön",
    roundTrip: "Gidiş–dönüş",
    roundTripHint:
      "Gidiş–dönüş rezervasyonunda dönüş, aynı rotanın ters yönünde gerçekleşir.",
    returnDate: "Dönüş tarihi",
    returnPickupTime: "Dönüş alış saati",
    returnFlightNumber: "Dönüş uçuş numarası",
    arrivalDate: "Geliş tarihi",
    arrivalFlightTime: "Geliş uçuş saati",
    arrivalFlightNumber: "Geliş uçuş numarası",
    roundTripPriceNote: "gidiş–dönüş · 2 yolculuk",
    guests: "Misafir",
    airportOption: "Antalya Havalimanı (AYT)",
    hotelOption: "Otel",
    privateAddressOption: "Özel adres",
    pickupAddress: "Tam alış adresi",
    pickupAddressPlaceholder: "Otel adı, cadde, bina numarası ve ilçe",
    dropoffAddress: "Tam varış adresi",
    dropoffAddressPlaceholder: "Otel adı, cadde, bina numarası ve ilçe",
    dropoffAddressRequired: "Varış adresi 6–160 karakter arasında olmalıdır.",
    customDestinationPrice:
      "Fiyat, varış adresi kontrol edildikten sonra teyit edilecektir.",
    selectDestination: "Varış noktası seçin",
    airportReturnPrice:
      "Fiyat, otel veya alış adresi kontrol edildikten sonra teyit edilecektir.",
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
    tbLicensed: "TÜRSAB Lisanslı",
    tbFlightTracking: "Uçuş Takibi",
    tbFixedPrice: "Sabit Fiyat",
    tb247Concierge: "7/24 Concierge",
    tbChildSeats: "Çocuk Koltuğu Dahil",
    welcomeEyebrow: "Daha iyi bir karşılamaya hoş geldiniz",
    welcomeTitle: "Zarafetle seyahat edin.<br />Rahatça varın.",
    welcomeBody:
      "Uçağınız indiği andan itibaren her ayrıntı düşünülür. Havalimanı ekibimiz sizi karşılar, şoförünüz aracıyla karşılama noktasına gelir ve bagajlarınız özenle hazırlanmış özel aracınıza yerleştirilir.",
    ourStandards: "Hizmet standartlarımız",
    concierge: "Concierge desteği",
    guestsWelcomed: "Karşılanan misafir",
    guestRating: "Ortalama misafir puanı",
    privateTransfers: "Özel transfer",
    fleetEyebrow: "Araç filomuz",
    fleetTitle: "Size özel alan,<br />her ayrıntıda kusursuz.",
    fleetIntro:
      "Aileniz, golf ekipmanınız ve bagajınız için geniş alan sunan sessiz bir konforla seyahat edin.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Kalabalık gruplar için geniş yolcu ve bagaj alanı sunan VIP ulaşım.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Aileler ve küçük gruplar için konforlu ve özel bir kabin.",
    signatureFleet: "Seçkin filo",
    passengers: "yolcu",
    suitcases: "bavul",
    luggageLabel: "Büyük bavul",
    capacitySwitchedSprinter:
      "Yolcu ve bagajınız Vito kapasitesini aşıyor — Mercedes Sprinter'a geçildi.",
    capacityNoVehicle:
      "Bu kadar yolcu ve bavul araçlarımızın kapasitesini aşıyor. Lütfen WhatsApp'tan bize ulaşın.",
    leatherSeats: "Premium deri koltuklar",
    wifi: "Ücretsiz WiFi",
    water: "Soğuk şişe su",
    childSeats: "Talep üzerine çocuk koltuğu",
    television: "Araç içi televizyon",
    coldDrinks: "Soğuk içecekler",
    snacks: "Atıştırmalıklar",
    nameSignGreeting: "J / 777 kontuarında karşılama",
    reserveVehicle: "Bu aracı ayırtın",
    insideVclass: "Sprinter'ın içinde",
    interiorTitle:
      "Havalimanı ile oteliniz arasında<br />size özel bir lounge.",
    serviceEyebrow: "Antalya VIP standardı",
    serviceTitle: "Transferden fazlası.<br />Özenli bir karşılama.",
    serviceIntro:
      "Havalimanından otele kadar beş yıldızlı ilgi, deneyimli yerel şoförler ve tam huzur.",
    trackingTitle: "Uçuş takibi",
    trackingBody:
      "Uçuşunuzu gerçek zamanlı takip eder, alış saatinizi hiçbir ek ücret olmadan otomatik olarak ayarlarız.",
    chauffeurTitle: "Profesyonel şoförler",
    chauffeurBody:
      "Bakımlı, gizliliğe önem veren ve yerel bilgisi ile hizmet kalitesi için seçilmiş profesyoneller.",
    greetTitle: "Karşılama hizmeti",
    greetBody:
      "Dış hat gelişlerinde havalimanı ekibimiz sizi J / 777 kontuarında karşılar, şoförünüzü karşılama noktasına çağırır ve bagajınıza yardımcı olur.",
    supportTitle: "7/24 concierge",
    supportBody:
      "Yolculuğunuzdan önce, yolculuk sırasında ve sonrasında telefon veya WhatsApp üzerinden gerçek bir kişiye ulaşabilirsiniz.",
    priceTitle: "Sabit fiyatlar",
    priceBody:
      "Onaylanan fiyat ödeyeceğiniz nihai fiyattır. Bekleme, otopark ve uçuş gecikmeleri dahildir.",
    familyTitle: "Ailelere hazır",
    familyBody:
      "Yaşa uygun çocuk koltukları, geniş kabinler ve rahat bir aile karşılaması için özenli destek.",
    routesEyebrow: "En çok tercih edilen yolculuklar",
    routesTitle: "Antalya Havalimanı'ndan<br />Türk Rivierası'na.",
    routesIntro:
      "Tüm fiyatlar kişi başı değil, araç başıdır ve 90 dakika bekleme dahildir.",
    golfFavourite: "Golf misafirlerinin favorisi",
    from: "Başlangıç",
    reviewsEyebrow: "Misafir yorumları",
    reviewsTitle: "Varıştan sonra da<br />hatırlanan hizmet.",
    googleReviews: "Doğrulanmış 387 Google yorumuna göre",
    reviewOne:
      "“Uçağımız 90 dakika gecikmesine rağmen şoförümüz bizi bekliyordu. Aracımız kusursuz, serin ve iki çocuk koltuğu da hazırdı. Ailemizin tam olarak ihtiyaç duyduğu karşılamaydı.”",
    reviewTwo:
      "“İlk WhatsApp görüşmesinden Belek'e varışımıza kadar her şey birinci sınıftı. Dakik, gizliliğe önem veren ve son derece profesyonel. Golf çantalarımız da rahatça sığdı.”",
    reviewThree:
      "“Bu bir havalimanı taksisinden çok beş yıldızlı otel şoför hizmeti gibiydi. Net iletişim, tertemiz araç ve gerçekten nazik bir şoför.”",
    trustedBy: "Antalya'nın önde gelen resort misafirlerinin tercihi",
    faqEyebrow: "Sık sorulanlar",
    faqTitle: "Seyahatinizden önce.",
    faqCatArrival: "Karşılama & Transfer",
    faqCatJourney: "Dönüş & Yolculuk",
    faqCatPayment: "Ödeme & Fiyat",
    faqCatVehicle: "Araç & Bagaj",
    faqReminder: "Seyahatinizden önce lütfen sitemizdeki SSS bölümünü inceleyin.",
    viewFaq: "SSS'yi görüntüle",
    faqIntro:
      "Antalya'daki özel havalimanı transferiniz hakkında bilmeniz gereken her şey.",
    askQuestion: "Bize sorun",
    faqOneQ: "Uçuşum gecikirse ne olur?",
    faqOneA:
      "Sizin yapmanız gereken hiçbir şey yok. Uçuşunuzu canlı takip eder, alış saatinizi otomatik olarak güncelleriz. Uçuş kaynaklı gecikmeler için hiçbir ek ücret alınmaz; ne zaman inerseniz inin şoförünüz sizi bekliyor olur ve inişten sonraki ilk 90 dakika her zaman fiyata dahildir.",
    faqTwoQ: "Dış hat uçuşuyla geliyorum, karşılama nasıl işliyor?",
    faqTwoA:
      "Pasaport kontrolü ve bagajınızı aldıktan sonra tüm yolcuların yöneldiği Karşılama (Meet & Greet) alanına ilerleyin ve J / 777 numaralı kontuarımıza gelin. Personelimize adınızı söylemeniz yeterli. Personelimiz aynı anda şoförünüzü bilgilendirir; şoförünüz havalimanına giriş yapıp karşılama noktasındaki yerini alır, siz de personelimiz eşliğinde aracınıza ilerlersiniz. Tüm süreç ortalama 7-8 dakika sürer.",
    faqSixQ: "Yurt içi uçuşla geliyorum, şoförümü nasıl bulacağım?",
    faqSixA:
      "Karşılama (Meet & Greet) alanı yalnızca dış hat yolcuları içindir; iç hatlarda böyle bir alan bulunmaz. Bu nedenle iç hat misafirlerimize transferden önce şoförlerinin telefon numarasını iletiriz. İndiğinizde kendisine kısaca haber vermeniz yeterli; şoförünüz sizi yolcu karşılama bölümünden alır.",
    faqSevenQ: "J / 777 kontuarında görevli yoksa ne yapmalıyım?",
    faqSevenA:
      "Kontuarımızda sürekli iki personelimiz görev yapar ve tek işleri gelen misafirleri araçlarına yönlendirmektir. Kontuarı bir an boş bulursanız bu, personelimizin sizden hemen önce gelen misafiri aracına götürdüğü anlamına gelir; her yönlendirme yaklaşık 7-8 dakika sürer. Lütfen yaklaşık 10 dakika bekleyin. Bu sürenin sonunda hâlâ kimse dönmediyse WhatsApp hattımızdan bize yazın: şoförünüzü anında bilgilendirir, en yakın noktaya park etmesini sağlar ve sizi hiç bekletmeden doğrudan aracınıza ulaştırırız.",
    faqEightQ: "Havalimanından çıkmam 90 dakikadan uzun sürerse ne olur?",
    faqEightA:
      "Uçağınız indikten sonraki ilk 90 dakika ücretsiz olarak fiyata dahildir; pasaport, bagaj ve gümrük için fazlasıyla yeterli bir süredir ve uçuş gecikmelerinde bu süre otomatik olarak kayar. Yalnızca uçuşunuzla ilgisi olmayan bir nedenle terminalde 90 dakikadan uzun kalırsanız, aracınızın otoparkta geçirdiği her ek saat için 5 € otopark katkı bedeli eklenir. Uygulamada bu neredeyse hiç yaşanmaz; misafirlerimizin tamamına yakını bu sürenin çok öncesinde yola çıkar.",
    faqNineQ: "Ödemeyi nasıl yapıyorum?",
    faqNineA:
      "Ödemenizi yolculuğun başında, doğrudan şoförünüze nakit olarak yaparsınız; kart geçmez. Fiyatlar euro (EUR) üzerinden belirlenir: ödeyeceğiniz sabit tutar, rezervasyonda gördüğünüz tutarın aynısıdır – araç başına, tüm havalimanı ve otopark ücretleri dahil, sonradan eklenen kalem yok. Amerikan doları veya Türk lirasıyla ödemek isterseniz, kur farklı olduğundan ayrı bir fiyat için önceden WhatsApp'tan bize yazın. Şoförünüz sizi karşılar, bagajlarınızı yükler, talep ettiyseniz çocuk koltuklarını hazırlar; ödemenizin ardından yolculuğunuz başlar.",
    faqTenQ: "Dönüş transferimde iletişimi nasıl kuracağım?",
    faqTenA:
      "Dönüş gün ve saatinizi ekibimizle WhatsApp üzerinden teyit ettikten sonra, transferinize saatler kala aracınızı belirler ve size WhatsApp'tan aracın fotoğraflarını gönderiririz; dilerseniz şoförünüzün telefon numarasını da paylaşırız. Şoförünüz belirlenen saatte otelinize ulaştığında resepsiyona haber verir, resepsiyon da odanıza aracınızın hazır olduğunu bildirir. Şoförlerimiz misafirlerimizi doğrudan aramaz; tüm iletişim tek bir noktadan, WhatsApp müşteri destek hattımız üzerinden yürür. Böylece kiminle konuştuğunuzdan her zaman emin olursunuz.",
    faqElevenQ: "Rezervasyonumu iptal edebilir veya değiştirebilir miyim?",
    faqElevenA:
      "Elbette, üstelik tamamen ücretsiz. Ön ödeme almadığımız için iptalde iade edilecek bir tutar ve beklenecek bir iade süreci yoktur — planınız değişirse WhatsApp'tan haber vermeniz yeterli. Saat, uçuş numarası veya varış adresi değişikliklerini de aynı şekilde, ek ücret olmadan yaparız.",
    faqTwelveQ: "Hangi para birimiyle ödeyebilirim?",
    faqTwelveA:
      "Fiyatlarımız euro (EUR) üzerinden belirlenir ve ödeme nakit olarak yapılır; kart geçmez. Amerikan doları veya Türk lirasıyla ödemek isterseniz tutar günün kuruna bağlı olarak değişir; bu nedenle transferinizden önce WhatsApp'tan bize yazın. Size net bir fiyat verir ve şoförünüzü bilgilendiririz — araç içinde pazarlık yapılmaz.",
    faqThirteenQ: "Ne kadar bagaj getirebilirim?",
    faqThirteenA:
      "Kural olarak yolcu başına bir büyük valiz ve bir el bagajı. Daha fazlası varsa — ek valiz, golf çantası, bebek arabası, kayak veya bisiklet — rezervasyon sırasında belirtmeniz yeterli; ek ücret almadan uygun kapasitede bir araç planlarız. Önemli olan tek şey, bunu önceden biliyor olmamız. Mercedes Vito 6, Mercedes Sprinter ise 12 yolcuya kadar taşır.",
    faqFourteenQ: "Dönüş transferime geç kalırsam ne olur?",
    faqFourteenA:
      "Şoförünüz belirlenen saatte otelinizde olur ve 15 dakika ücretsiz bekler. Gecikeceğinizi düşünüyorsanız WhatsApp'tan tek bir mesaj yeterli: uçuş saatinizi kontrol eder, şoförünüzü bilgilendirir ve programı sizinle birlikte ayarlarız. Amacımız sizi acele ettirmek değil, uçağınıza rahatça yetiştirmektir.",
    faqFifteenQ: "Yolculuk sırasında ek durak mümkün mü?",
    faqFifteenA:
      "Elbette mümkün. Market, eczane veya kısa bir fotoğraf molası isterseniz rezervasyon sırasında ya da WhatsApp üzerinden belirtmeniz yeterli; güzergâhı buna göre planlarız. Rotanızdan belirgin şekilde sapan uzun bir durak söz konusuysa, ek bir tutar olup olmadığını yola çıkmadan önce net olarak paylaşırız — sonradan eklenen hiçbir kalem olmaz.",
    faqThreeQ: "Çocuk koltuğu var mı?",
    faqThreeA:
      "Evet. Bebek koltuğu, çocuk koltuğu ve yükseltici koltuk rezervasyon sırasında ücretsiz olarak talep edilebilir.",
    faqFourQ: "Golf çantası ve büyük bagaj taşıyor musunuz?",
    faqFourA:
      "Evet. Sprinter ve Vito araçlarımız golf grupları için idealdir. Bagaj bilgilerinizi paylaşın, uygun aracı planlayalım.",
    faqFiveQ: "Verilen fiyat kesin mi?",
    faqFiveA:
      "Evet. Rezervasyonda gördüğünüz tutar, yolculuğun başında şoförünüze nakit ödeyeceğiniz tutardır: araç başına; tüm havalimanı ücretleri, otopark ve inişten sonraki ilk 90 dakikalık bekleme dahil. Gizli ücret yoktur.",
    contactEyebrow: "Yolculuğunuz burada başlar",
    contactTitle: "Antalya'ya ayrıcalıklı<br />bir şekilde varın.",
    contactBody:
      "İki dakikadan kısa sürede online rezervasyon yapın veya 7/24 concierge ekibimizle doğrudan görüşün.",
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
    quoteIncludes:
      "Karşılama, uçuş takibi, otopark, 90 dakika bekleme ve şişe su dahildir.",
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
    bookingConfirmed: "Rezervasyon Onaylandı",
    referenceLabel: "Referans",
    weWillContact:
      "Rezervasyon talebiniz gönderildi. 30 dakika içinde sizinle iletişime geçeceğiz.",
    paymentError: "Ödeme başarısız. Lütfen tekrar deneyin.",
  },
  ru: {
    hotelSearchHint: "Введите название отеля и выберите его из списка — регион и цену мы заполним за вас.",
    hotelNotListed: "Моего отеля нет в списке",
    hotelNoMatch: "Совпадений пока нет. Введите название и выберите регион самостоятельно.",
    navFleet: "Автопарк",
    navService: "Сервис",
    navRoutes: "Маршруты",
    navReviews: "Отзывы",
    navContact: "Контакты",
    bookNow: "Забронировать",
    alwaysAvailable: "Мы на связи круглосуточно, каждый день",
    heroEyebrow: "Персональный шофёр · Анталья",
    heroTitle: "Премиальный трансфер<br />из аэропорта Антальи",
    heroSubtitle:
      "Индивидуальные трансферы с водителем из аэропорта Антальи в Белек, Сиде, Кемер и Аланью.",
    campaignBadge: "Онлайн-акция",
    campaignDiscount: "спеццена",
    campaignScope: "на все трансферы",
    campaignApplied: "Применена специальная онлайн-цена",
    onlineDiscountShort: "Онлайн-спеццена",
    discountPricesShown: "Показаны специальные онлайн-цены",
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
    tripType: "Тип поездки",
    oneWay: "В одну сторону",
    roundTrip: "Туда и обратно",
    roundTripHint:
      "Обратная поездка проходит по тому же маршруту в обратном направлении.",
    returnDate: "Дата возвращения",
    returnPickupTime: "Время подачи на обратный путь",
    returnFlightNumber: "Номер обратного рейса",
    arrivalDate: "Дата прибытия",
    arrivalFlightTime: "Время прибытия рейса",
    arrivalFlightNumber: "Номер рейса прибытия",
    roundTripPriceNote: "туда и обратно · 2 поездки",
    guests: "Гости",
    airportOption: "Аэропорт Антальи (AYT)",
    hotelOption: "Отель",
    privateAddressOption: "Частный адрес",
    pickupAddress: "Полный адрес подачи",
    pickupAddressPlaceholder: "Название отеля, улица, номер дома и район",
    dropoffAddress: "Полный адрес назначения",
    dropoffAddressPlaceholder: "Название отеля, улица, номер дома и район",
    dropoffAddressRequired:
      "Адрес назначения должен содержать от 6 до 160 символов.",
    customDestinationPrice:
      "Цена будет подтверждена после проверки адреса назначения.",
    selectDestination: "Выберите направление",
    airportReturnPrice:
      "Цена будет подтверждена после проверки отеля или адреса подачи.",
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
    tbLicensed: "Лицензия TÜRSAB",
    tbFlightTracking: "Отслеживание рейса",
    tbFixedPrice: "Фиксированная цена",
    tb247Concierge: "Консьерж 24/7",
    tbChildSeats: "Детские кресла в комплекте",
    welcomeEyebrow: "Добро пожаловать на новый уровень сервиса",
    welcomeTitle: "Путешествуйте красиво.<br />Прибывайте без забот.",
    welcomeBody:
      "С момента посадки продумана каждая деталь. Наша команда в аэропорту встречает вас, водитель подаёт машину к месту посадки, а багаж загружается в тщательно подготовленный частный автомобиль.",
    ourStandards: "Наши стандарты сервиса",
    concierge: "Поддержка консьержа",
    guestsWelcomed: "Встреченных гостей",
    guestRating: "Средняя оценка гостей",
    privateTransfers: "Частные трансферы",
    fleetEyebrow: "Наш автопарк",
    fleetTitle: "Ваше личное пространство,<br />безупречное в деталях.",
    fleetIntro:
      "Путешествуйте в тишине и комфорте: достаточно места для семьи, багажа и оборудования для гольфа.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Эталон комфортных групповых поездок: просторный, исключительно тихий салон и всё необходимое для беззаботного прибытия.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Просторный частный салон для больших семей, групп игроков в гольф и гостей с объёмным багажом.",
    signatureFleet: "Фирменный автопарк",
    passengers: "пассажиров",
    suitcases: "чемоданов",
    luggageLabel: "Крупный багаж",
    capacitySwitchedSprinter:
      "Пассажиры и багаж превышают вместимость Vito — выбран Mercedes Sprinter.",
    capacityNoVehicle:
      "Столько пассажиров и багажа превышает вместимость наших автомобилей. Напишите нам в WhatsApp.",
    leatherSeats: "Премиальные кожаные сиденья",
    wifi: "Бесплатный WiFi",
    water: "Охлаждённая вода",
    childSeats: "Детские кресла по запросу",
    television: "Телевизор в автомобиле",
    coldDrinks: "Холодные напитки",
    snacks: "Закуски",
    nameSignGreeting: "Встреча у стойки J / 777",
    reserveVehicle: "Забронировать автомобиль",
    insideVclass: "Салон Sprinter",
    interiorTitle: "Персональный лаунж<br />между аэропортом и отелем.",
    serviceEyebrow: "Стандарт Antalya VIP",
    serviceTitle: "Больше, чем трансфер.<br />Продуманная встреча.",
    serviceIntro:
      "Внимание уровня пятизвёздочного отеля, опытные местные шофёры и спокойствие от аэропорта до курорта.",
    trackingTitle: "Отслеживание рейса",
    trackingBody:
      "Мы отслеживаем ваш рейс в реальном времени и автоматически корректируем время встречи без доплаты.",
    chauffeurTitle: "Профессиональные шофёры",
    chauffeurBody:
      "Безупречный внешний вид, деликатность, знание региона и высокие стандарты обслуживания.",
    greetTitle: "Встреча в аэропорту",
    greetBody:
      "При международных прилётах наша команда встречает вас у стойки J / 777, вызывает водителя к месту посадки и помогает с багажом.",
    supportTitle: "Консьерж 24/7",
    supportBody:
      "До, во время и после поездки вам всегда ответит человек по телефону или в WhatsApp.",
    priceTitle: "Фиксированные цены",
    priceBody:
      "Подтверждённая цена является окончательной. Ожидание, парковка и задержка рейса уже включены.",
    familyTitle: "Для всей семьи",
    familyBody:
      "Детские кресла по возрасту, просторный салон и внимательная помощь для спокойного семейного приезда.",
    routesEyebrow: "Самые популярные поездки",
    routesTitle: "Из аэропорта Антальи<br />на Турецкую Ривьеру.",
    routesIntro:
      "Все цены указаны за автомобиль, а не за пассажира, и включают 90 минут ожидания.",
    golfFavourite: "Выбор игроков в гольф",
    from: "От",
    reviewsEyebrow: "Отзывы гостей",
    reviewsTitle: "Сервис, который помнят<br />после прибытия.",
    googleReviews: "На основе 387 подтверждённых отзывов Google",
    reviewOne:
      "«Несмотря на задержку рейса на 90 минут, водитель ждал нас. Автомобиль был безупречно чистым и прохладным, а оба детских кресла уже были установлены. Именно такая встреча была нужна нашей семье».",
    reviewTwo:
      "«От первого сообщения в WhatsApp до прибытия в Белек всё было на высшем уровне. Пунктуально, деликатно и очень профессионально. Наши сумки для гольфа легко поместились».",
    reviewThree:
      "«Это было похоже на трансфер от пятизвёздочного отеля, а не на такси из аэропорта. Чёткая связь, безупречный автомобиль и по-настоящему вежливый водитель».",
    trustedBy: "Нам доверяют гости ведущих курортов Антальи",
    faqEyebrow: "Частые вопросы",
    faqTitle: "Перед поездкой.",
    faqCatArrival: "Встреча и трансфер",
    faqCatJourney: "Обратный трансфер и поездка",
    faqCatPayment: "Оплата и цена",
    faqCatVehicle: "Автомобиль и багаж",
    faqReminder: "Перед поездкой ознакомьтесь с разделом вопросов и ответов на нашем сайте.",
    viewFaq: "Открыть FAQ",
    faqIntro: "Всё, что нужно знать о частном трансфере из аэропорта Антальи.",
    askQuestion: "Задать вопрос",
    faqOneQ: "Что произойдёт, если мой рейс задержится?",
    faqOneA:
      "От вас ничего не требуется. Мы отслеживаем ваш рейс в режиме реального времени и автоматически корректируем время подачи автомобиля. Задержки по вине авиакомпании никогда не оплачиваются дополнительно — водитель встретит вас в любое время прилёта, а первые 90 минут после посадки всегда включены в стоимость.",
    faqTwoQ: "Я прилетаю международным рейсом. Как проходит встреча?",
    faqTwoA:
      "После паспортного контроля и получения багажа следуйте вместе с другими пассажирами в зону встречи Meet & Greet и подойдите к нашей стойке J / 777. Просто назовите сотруднику своё имя — этого достаточно. Наша команда сразу сообщает водителю; он въезжает на территорию аэропорта и подаёт машину к месту посадки, а сотрудник в это время провожает вас к автомобилю. Вся процедура занимает около 7–8 минут.",
    faqSixQ: "Я прилетаю внутренним рейсом. Где найти водителя?",
    faqSixA:
      "Зона встречи Meet & Greet работает только для международных рейсов, поэтому гостей внутренних рейсов мы сопровождаем иначе: перед трансфером мы присылаем вам номер телефона водителя. После посадки просто сообщите ему об этом — он встретит вас в зале прилёта.",
    faqSevenQ: "Что делать, если у стойки J / 777 никого нет?",
    faqSevenA:
      "На стойке постоянно дежурят два наших сотрудника, и их единственная задача — проводить прибывающих гостей к автомобилю. Если стойка на минуту пуста, значит коллега сопровождает гостя, прилетевшего прямо перед вами: каждое сопровождение занимает около 7–8 минут. Пожалуйста, подождите примерно 10 минут. Если за это время никто не вернулся, напишите нам в WhatsApp: мы немедленно свяжемся с водителем, он подъедет к ближайшей точке, и мы проводим вас прямо к машине без дальнейшего ожидания.",
    faqEightQ:
      "Что будет, если мне понадобится больше 90 минут, чтобы выйти из аэропорта?",
    faqEightA:
      "Первые 90 минут после посадки включены в стоимость — этого с запасом хватает на паспортный контроль, багаж и таможню, а при задержке рейса отсчёт сдвигается автоматически. Только если вы задержитесь в терминале дольше по причинам, не связанным с рейсом, добавляется парковочный сбор 5 € за каждый дополнительный час. На практике это почти не случается: подавляющее большинство гостей выезжает задолго до этого.",
    faqNineQ: "Как проходит оплата?",
    faqNineA:
      "Вы оплачиваете поездку водителю наличными в начале трансфера — карты не принимаются. Цены установлены в евро (EUR): фиксированная сумма в точности соответствует той, что вы видели при бронировании, — за автомобиль, со всеми аэропортовыми и парковочными сборами, без доплат впоследствии. Хотите оплатить в долларах США или турецких лирах? Напишите нам заранее в WhatsApp, чтобы получить отдельную цену, так как курс отличается. Водитель встречает вас, загружает багаж и устанавливает заказанные детские кресла; после оплаты начинается ваша поездка.",
    faqTenQ: "Как поддерживать связь при обратном трансфере?",
    faqTenA:
      "После того как вы подтвердите дату и время обратной поездки нашей команде в WhatsApp, мы за несколько часов до трансфера назначаем автомобиль и присылаем вам его фотографии в WhatsApp — при желании также номер телефона водителя. Когда водитель приезжает в отель, он сообщает на стойку регистрации, а та передаёт в ваш номер, что машина подана. Наши водители никогда не звонят гостям напрямую: всё общение идёт через единую линию поддержки в WhatsApp, поэтому вы всегда точно знаете, с кем разговариваете.",
    faqElevenQ: "Могу ли я отменить или изменить бронирование?",
    faqElevenA:
      "Да, и всегда бесплатно. Мы не берём предоплату, поэтому возвращать нечего и ждать возврата денег не нужно — если планы изменились, достаточно написать нам в WhatsApp. Изменение времени, номера рейса или адреса назначения оформляем так же, без доплат.",
    faqTwelveQ: "В какой валюте можно оплатить?",
    faqTwelveA:
      "Наши цены установлены в евро (EUR) и оплачиваются наличными; карты не принимаются. Если удобнее заплатить в долларах США или турецких лирах, сумма зависит от курса на день, поэтому напишите нам в WhatsApp до трансфера: мы назовём точную цену и предупредим водителя — в машине ничего не обсуждается.",
    faqThirteenQ: "Сколько багажа можно взять?",
    faqThirteenA:
      "Как правило, один большой чемодан и одно место ручной клади на пассажира. Если багажа больше — дополнительный чемодан, гольф-бэг, коляска, лыжи или велосипед — просто укажите это при бронировании, и мы без доплаты подадим автомобиль подходящей вместимости. Важно лишь предупредить заранее. Mercedes Vito вмещает до 6 пассажиров, Sprinter — до 12.",
    faqFourteenQ: "Что делать, если я опаздываю на обратный трансфер?",
    faqFourteenA:
      "Водитель приезжает к отелю в назначенное время и ждёт 15 минут бесплатно. Если понимаете, что задержитесь, напишите нам в WhatsApp: мы проверим время вылета, предупредим водителя и вместе скорректируем план. Наша задача — не торопить вас, а спокойно доставить к рейсу.",
    faqFifteenQ: "Можно ли сделать остановку в пути?",
    faqFifteenA:
      "Конечно. Если хотите заехать в супермаркет или аптеку либо остановиться для фотографии, скажите об этом при бронировании или напишите в WhatsApp — мы спланируем маршрут с учётом остановки. Если остановка заметно уводит в сторону от маршрута, мы до выезда сообщим, добавляется ли что-то к сумме: постфактум сюрпризов не бывает.",
    faqThreeQ: "Есть ли детские кресла?",
    faqThreeA:
      "Да. Автолюльки, детские кресла и бустеры предоставляются бесплатно по запросу при бронировании.",
    faqFourQ: "Можно ли взять сумки для гольфа и крупный багаж?",
    faqFourA:
      "Да. Sprinter и Vito идеально подходят для групп игроков в гольф. Сообщите объём багажа, и мы подберём автомобиль.",
    faqFiveQ: "Указанная цена окончательная?",
    faqFiveA:
      "Да. Цена, которую вы видите при бронировании, — это сумма, которую вы передаёте водителю наличными: за автомобиль, включая все аэропортовые сборы, парковку и первые 90 минут ожидания. Скрытых платежей нет.",
    contactEyebrow: "Ваше путешествие начинается здесь",
    contactTitle: "Прибудьте в Анталью<br />исключительно комфортно.",
    contactBody:
      "Забронируйте онлайн менее чем за две минуты или свяжитесь с нашей службой консьержа 24/7.",
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
    licensed:
      "Лицензированный оператор частных трансферов · Соответствует требованиям TÜRSAB",
    quoteReady: "Ваш частный трансфер",
    vehicle: "Автомобиль",
    journeyTime: "Время в пути",
    totalFixed: "Итоговая цена",
    quoteIncludes:
      "Включены встреча, отслеживание рейса, парковка, 90 минут ожидания и питьевая вода.",
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
    bookingConfirmed: "Бронирование подтверждено",
    referenceLabel: "Референс",
    weWillContact:
      "Ваш запрос на бронирование отправлен. Мы свяжемся с вами в течение 30 минут.",
    paymentError: "Оплата не прошла. Попробуйте ещё раз.",
  },
  cs: {
    hotelSearchHint: "Zadejte název hotelu a vyberte jej ze seznamu – cílovou oblast i cenu doplníme za vás.",
    hotelNotListed: "Můj hotel není v seznamu",
    hotelNoMatch: "Zatím žádná shoda. Zadejte název a oblast vyberte sami.",
    navFleet: "Vozový park",
    navService: "Služby",
    navRoutes: "Trasy",
    navReviews: "Recenze",
    navContact: "Kontakt",
    bookNow: "Rezervovat",
    alwaysAvailable: "Dostupní 24 hodin denně",
    heroEyebrow: "Soukromá šoférská služba · Antalya",
    campaignBadge: "Online akce",
    campaignDiscount: "Speciální cena",
    campaignScope: "ze všech cen transferů",
    heroTitle: "Prémiové letištní<br />transfery v Antalyi",
    heroSubtitle:
      "Soukromé transfery se šoférem z letiště Antalya do Beleku, Side, Kemeru a Alanye.",
    bookTransfer: "Rezervovat transfer",
    instantQuote: "Okamžitá nabídka",
    googleRated: "Hodnocení Google",
    trustedGuests: "Důvěryhodné u 2 500+ hostů",
    discover: "Objevit",
    tbLicensed: "Licence TÜRSAB",
    tbFlightTracking: "Sledování letů",
    tbFixedPrice: "Pevné ceny",
    tb247Concierge: "Recepce 24/7",
    tbChildSeats: "Dětské sedačky v ceně",
    privateJourney: "Váš soukromý výlet",
    tripType: "Typ cesty",
    oneWay: "Jednosměrně",
    roundTrip: "Tam a zpět",
    roundTripHint:
      "U zpáteční cesty následuje zpáteční trasa stejnou cestou v opačném směru.",
    pickup: "Místo vyzvednutí",
    airportOption: "Letiště Antalya (AYT)",
    hotelOption: "Hotel",
    privateAddressOption: "Soukromá adresa",
    destination: "Cíl",
    selectDestination: "Vyberte cíl",
    vehicle: "Vozidlo",
    guests: "Hosté",
    arrivalDate: "Datum příjezdu",
    arrivalFlightTime: "Čas příjezdu letu",
    chooseTime: "Vyberte čas",
    arrivalFlightNumber: "Číslo příletového letu",
    returnDate: "Datum návratu",
    returnPickupTime: "Čas vyzvednutí při návratu",
    returnFlightNumber: "Číslo zpátečního letu",
    pickupAddress: "Úplná adresa vyzvednutí",
    dropoffAddress: "Úplná adresa vysazení",
    luggageLabel: "Velká zavazadla",
    hotelNameLabel: "Název hotelu",
    childSeatLabel: "Dětské sedačky",
    childSeatNone: "Bez dětské sedačky",
    oneChildSeat: "1 dětská sedačka",
    twoChildSeats: "2 dětské sedačky",
    threeChildSeats: "3 dětské sedačky",
    fourChildSeats: "4 dětské sedačky",
    fullName: "Celé jméno",
    phoneLabel: "Telefon / WhatsApp",
    emailLabel: "E-mail",
    paymentMethod: "Zvolte způsob platby",
    cashPayment: "Platba ve vozidle",
    recommended: "Doporučeno",
    cashPaymentDescription:
      "Žádná platba online předem. Pevnou částku předáte řidiči v hotovosti na začátku jízdy.",
    quoteIncludes:
      "Zahrnuje přivítání, sledování letu, parkování, 90 minut čekání a balenou vodu.",
    confirmCashBooking: "Potvrdit rezervaci — platba ve vozidle",
    flightTracking: "Sledování letů v reálném čase",
    fixedPrice: "Garance pevné ceny",
    meetGreet: "Osobní uvítání",
    speakingDrivers: "Anglicky a německy mluvící",
    fromAirport: "Z letiště Antalya",
    campaignApplied: "Byla použita speciální online cena",
    welcomeEyebrow: "Vítejte na lepším příjezdu",
    welcomeTitle: "Cestujte krásně.<br />Přijíždějte bez starostí.",
    welcomeBody:
      "Od okamžiku přistání je promyšlen každý detail. Náš tým na letišti vás přivítá, šofér přistaví vůz na místo vyzvednutí a vaše zavazadla putují do pečlivě připraveného soukromého vozu.",
    ourStandards: "Naše standardy služeb",
    concierge: "Podpora recepce",
    guestsWelcomed: "Přivítaných hostů",
    guestRating: "Průměrné hodnocení hostů",
    privateTransfers: "Soukromé transfery",
    fleetEyebrow: "Vozový park",
    fleetTitle: "Váš soukromý prostor,<br />vyladěný do každého detailu.",
    fleetIntro:
      "Cestujte v tiché pohodlí s dostatkem místa pro rodinu, golfové vybavení a zavazadla.",
    signatureFleet: "Prémiový vozový park",
    fleetVclassClass: "Business · První třída",
    fleetVclassDescription:
      "Prostorný VIP transport pro větší skupiny s dostatkem místa pro cestující i zavazadla.",
    passengers: "cestujících",
    suitcases: "kufrů",
    television: "TV ve vozidle",
    coldDrinks: "Studené nápoje",
    snacks: "Občerstvení",
    childSeats: "Dětská sedačka k dispozici",
    wifi: "Bezplatné WiFi",
    nameSignGreeting: "Uvítání u přepážky J / 777",
    reserveVehicle: "Rezervovat vozidlo",
    insideVclass: "Interiér Sprinteru",
    interiorTitle: "Soukromý salon mezi<br />letištěm a vaším hotelem.",
    serviceEyebrow: "Standard Antalya VIP",
    serviceTitle: "Víc než transfer.<br />Uvítání s péčí.",
    serviceIntro:
      "Pozornost na úrovni hotelu, zkušení místní šoféři a naprostý klid od vzletu až po resort.",
    trackingTitle: "Sledování letů",
    trackingBody:
      "Monitorujeme váš let v reálném čase a automaticky upravujeme čas vyzvednutí, bez příplatku.",
    chauffeurTitle: "Profesionální šoféři",
    chauffeurBody:
      "Bezchybně upravení, diskrétní a vybíraní pro místní znalosti a standardy služeb.",
    greetTitle: "Uvítání",
    greetBody:
      "U mezinárodních příletů vás náš tým přivítá u přepážky J / 777, přivolá šoféra na místo vyzvednutí a pomůže se zavazadly.",
    supportTitle: "Recepce 24/7",
    supportBody:
      "Skutečná osoba je vždy dostupná telefonicky nebo přes WhatsApp před, během a po cestě.",
    priceTitle: "Pevné ceny",
    priceBody:
      "Potvrzená cena je cena, kterou zaplatíte. Čekání, parkování a zpoždění letu jsou zahrnuty.",
    familyTitle: "Přátelské pro rodiny",
    familyBody:
      "Věkově vhodné dětské sedačky, prostorné kabiny a trpělivá pomoc pro klidný rodinný příjezd.",
    routesEyebrow: "Nejžádanější trasy",
    routesTitle: "Z letiště Antalya<br />na tureckou riviéru.",
    routesIntro:
      "Všechny ceny jsou za vozidlo, nikoli za osobu, a zahrnují 90 minut čekání.",
    discountPricesShown: "Zobrazeny online speciální ceny",
    golfFavourite: "Oblíbené pro golf",
    onlineDiscountShort: "Online speciál",
    reviewsEyebrow: "Recenze hostů",
    reviewsTitle: "Služba, na kterou se<br />nezapomíná ani po příjezdu.",
    googleReviews: "Na základě 387 ověřených recenzí Google",
    trustedBy: "Oblíbené u hostů předních antalyských resortů",
    faqEyebrow: "Často kladené dotazy",
    faqTitle: "Před vaší cestou.",
    faqCatArrival: "Vyzvednutí a transfer",
    faqCatJourney: "Zpáteční cesta a jízda",
    faqCatPayment: "Platba a cena",
    faqCatVehicle: "Vozidlo a zavazadla",
    faqReminder: "Před cestou si prosím přečtěte sekci častých dotazů na našem webu.",
    viewFaq: "Zobrazit FAQ",
    faqIntro:
      "Vše, co potřebujete vědět o svém soukromém transferu z letiště Antalya.",
    askQuestion: "Zeptejte se nás",
    faqOneQ: "Co se stane, když má můj let zpoždění?",
    faqOneA:
      "Nemusíte dělat vůbec nic. Váš let sledujeme v reálném čase a čas vyzvednutí upravíme automaticky. Zpoždění způsobená leteckou společností nikdy neúčtujeme – řidič na vás počká, ať přistanete kdykoli, a prvních 90 minut po přistání je vždy v ceně.",
    faqTwoQ: "Přilétám mezinárodním letem. Jak vyzvednutí probíhá?",
    faqTwoA:
      "Po pasové kontrole a výdeji zavazadel se vydejte s ostatními cestujícími do zóny Meet & Greet a přijďte k naší přepážce J / 777. Stačí říct našemu pracovníkovi své jméno. Náš tým okamžitě informuje řidiče; ten vjede na letiště a přistaví vůz na místo pro vyzvednutí, zatímco vás náš pracovník doprovodí k autu. Celý proces trvá přibližně 7–8 minut.",
    faqSixQ: "Přilétám vnitrostátním letem. Kde najdu svého řidiče?",
    faqSixA:
      "Zóna Meet & Greet slouží pouze mezinárodním příletům, proto se o hosty z vnitrostátních letů staráme jinak: před transferem vám pošleme telefonní číslo řidiče. Po přistání mu stačí dát vědět a vyzvedne vás v příletové hale.",
    faqSevenQ: "Co mám dělat, když u přepážky J / 777 nikdo není?",
    faqSevenA:
      "U přepážky trvale slouží dva naši pracovníci a jejich jediným úkolem je doprovodit přilétající hosty k vozu. Pokud je přepážka na chvíli prázdná, znamená to, že kolega právě doprovází hosta, který přiletěl těsně před vámi – každý doprovod trvá asi 7–8 minut. Počkejte prosím zhruba 10 minut. Pokud se do té doby nikdo nevrátí, napište nám na WhatsApp: okamžitě informujeme vašeho řidiče, necháme ho zastavit na nejbližším místě a dovedeme vás rovnou k vozu bez dalšího čekání.",
    faqEightQ: "Co když budu potřebovat na odchod z letiště více než 90 minut?",
    faqEightA:
      "Prvních 90 minut po přistání je zdarma v ceně – s rezervou více, než vyžaduje pasová kontrola, zavazadla a celní odbavení – a při zpoždění letu se tento interval automaticky posouvá. Pouze pokud vás v terminálu zdrží něco, co s letem nesouvisí, připočítáváme příspěvek na parkování 5 € za každou další hodinu. V praxi k tomu téměř nikdy nedojde: naprostá většina hostů je na cestě dávno předtím.",
    faqNineQ: "Jak probíhá platba?",
    faqNineA:
      "Řidiči platíte v hotovosti na začátku jízdy – karty nepřijímáme. Ceny jsou stanoveny v eurech (EUR): pevná částka přesně odpovídá té, kterou jste viděli při rezervaci – za vozidlo, včetně všech letištních a parkovacích poplatků, bez dodatečných položek. Chcete raději platit v amerických dolarech nebo tureckých lirách? Napište nám předem na WhatsApp pro samostatnou cenu, protože kurz se liší. Řidič vás přivítá, naloží zavazadla a připraví objednané dětské sedačky; po zaplacení vaše cesta začíná.",
    faqTenQ: "Jak zůstanu ve spojení při zpátečním transferu?",
    faqTenA:
      "Jakmile s naším týmem potvrdíte datum a čas zpáteční cesty přes WhatsApp, několik hodin před transferem přidělíme vozidlo a pošleme vám jeho fotografie na WhatsApp – na přání i telefonní číslo řidiče. Když řidič dorazí k hotelu, oznámí to recepci, která dá vědět na váš pokoj, že vůz je připraven. Naši řidiči hostům nikdy nevolají přímo: veškerá komunikace probíhá přes jedinou zákaznickou linku na WhatsAppu, takže vždy víte, s kým mluvíte.",
    faqElevenQ: "Mohu rezervaci zrušit nebo změnit?",
    faqElevenA:
      "Ano, a vždy zdarma. Nevybíráme platbu předem, takže není co vracet ani na co čekat — pokud se vaše plány změní, stačí zpráva na WhatsAppu. Změnu času, čísla letu nebo cílové adresy vyřídíme stejně, bez příplatku.",
    faqTwelveQ: "V jaké měně mohu zaplatit?",
    faqTwelveA:
      "Naše ceny jsou stanoveny v eurech (EUR) a platí se v hotovosti; karty nepřijímáme. Chcete-li platit v amerických dolarech nebo tureckých lirách, částka závisí na denním kurzu — napište nám proto před transferem na WhatsApp. Sdělíme vám jasnou cenu a informujeme šoféra, takže ve voze se o ničem nevyjednává.",
    faqThirteenQ: "Kolik zavazadel si mohu vzít?",
    faqThirteenA:
      "Zpravidla jeden velký kufr a jedno příruční zavazadlo na osobu. Pokud máte více — kufr navíc, golfovou výbavu, kočárek, lyže nebo kolo — stačí to uvést při rezervaci a bez příplatku přistavíme vůz s odpovídající kapacitou. Důležité je jen dát nám vědět předem. Mercedes Vito pojme až 6 cestujících, Sprinter až 12.",
    faqFourteenQ: "Co když se na zpáteční transfer opozdím?",
    faqFourteenA:
      "Šofér je u hotelu v dohodnutý čas a čeká 15 minut zdarma. Pokud tušíte zdržení, napište nám na WhatsApp: zkontrolujeme čas odletu, informujeme šoféra a plán upravíme společně s vámi. Nechceme vás popohánět, ale v klidu vás doručit k letadlu.",
    faqFifteenQ: "Je možné se během cesty zastavit?",
    faqFifteenA:
      "Samozřejmě. Chcete-li se cestou zastavit v supermarketu či lékárně nebo na chvíli kvůli fotografii, řekněte nám to při rezervaci nebo na WhatsAppu — trasu podle toho naplánujeme. Pokud zastávka vede výrazně mimo trasu, před odjezdem vám řekneme, zda se něco připočítává; dodatečně vás nic nepřekvapí.",
    faqThreeQ: "Jsou k dispozici dětské sedačky?",
    faqThreeA:
      "Ano. Sedačky pro kojence, batolata i posilovací sedačky jsou k dispozici zdarma při objednávce.",
    faqFourQ: "Přepravíte golfové tašky a velká zavazadla?",
    faqFourA:
      "Ano. Naše vozidla Sprinter a Vito jsou ideální pro golfové skupiny. Sdělte nám detaily o zavazadlech a přidělíme správné vozidlo.",
    faqFiveQ: "Je nabízená cena konečná?",
    faqFiveA:
      "Ano. Cena, kterou vidíte při rezervaci, je částka, kterou předáte řidiči v hotovosti – za vozidlo, včetně všech letištních poplatků, parkování a prvních 90 minut čekání. Žádné skryté poplatky.",
    contactEyebrow: "Vaše cesta začíná zde",
    contactTitle: "Přijeďte do Antalye<br />výjimečně dobře.",
    contactBody:
      "Rezervujte online za méně než dvě minuty nebo mluvte přímo s naším týmem recepce 24/7.",
    whatsappUs: "Napište nám na WhatsApp",
    replyMinutes: "Obvykle odpovídáme do několika minut",
    callUs: "Volejte nás 24/7",
    emailUs: "E-mail recepce",
    replyHour: "Odpovídáme do jedné hodiny",
    footerTagline: "Soukromé šoférské služby na turecké riviéře.",
    explore: "Prozkoumat",
    information: "Informace",
    licensed: "Licencovaný soukromý přepravce · v souladu s TÜRSAB",
    bookingConfirmed: "Rezervace potvrzena",
    referenceLabel: "Reference",
    weWillContact:
      "Vaše žádost o rezervaci byla odeslána. Kontaktujeme vás do 30 minut.",
    chatWithUs: "Napište nám",
    pickupAddressPlaceholder: "Název hotelu, ulice, číslo budovy a čtvrť",
    dropoffAddressPlaceholder: "Název hotelu, ulice, číslo budovy a čtvrť",
    hotelNamePlaceholder: "Název hotelu nebo ubytování",
    requestQuote: "Požádat o cenovou nabídku",
    cashConfirmation:
      "Vaše rezervace je potvrzena. Pevnou částku předáte řidiči v hotovosti na začátku jízdy.",
    bookingError:
      "Vaši rezervaci se nepodařilo dokončit. Zkuste to prosím znovu.",
    formIncomplete: "Prosím vyplňte zvýrazněná pole.",
    requiredField: "Toto pole je povinné.",
    destinationRequired: "Prosím vyberte cíl.",
    dateInvalid: "Prosím vyberte dnešní nebo budoucí datum.",
    emailInvalid: "Prosím zadejte platnou e-mailovou adresu.",
    nameInvalid: "Prosím zadejte platné celé jméno.",
    phoneInvalid:
      "Prosím zadejte platné číslo včetně předvolby země (například +420).",
    flightInvalid: "Prosím zadejte platné číslo letu.",
    pickupAddressRequired: "Adresa vyzvednutí musí mít 6 až 160 znaků.",
    dropoffAddressRequired: "Adresa vysazení musí mít 6 až 160 znaků.",
    addressesMustDiffer: "Adresy vyzvednutí a vysazení musí být různé.",
    customDestinationPrice: "Cena bude potvrzena po ověření adresy vysazení.",
    hotelNameRequired: "Prosím zadejte název hotelu.",
    roundTripPriceNote: "zpáteční · 2 cesty",
    returnDateRequired: "Prosím vyberte datum návratu.",
    returnDateInvalid: "Prosím vyberte datum návratu nejdříve v den odjezdu.",
    returnTimeRequired: "Prosím vyberte čas vyzvednutí při návratu.",
    dailyChauffeur: "Denní vozidlo + šofér",
    days: "dní",
    dailyChauffeurHint:
      "Pronajměte si soukromé vozidlo a šoféra na celý den bez limitu kilometrů nebo hodin. Pohonné hmoty se platí zvlášť.",
    serviceStartDate: "První den služby",
    serviceEndDate: "Poslední den služby",
    dailyPickupTime: "Čas začátku služby",
    dailyPickupTimeRequired: "Prosím vyberte denní čas začátku služby.",
    serviceEndDateRequired: "Prosím vyberte poslední den služby.",
    servicePeriodInvalid: "Prosím vyberte období od 1 do 30 dní.",
    arrivalFlightTimeOptional: "Čas příjezdu letu (nepovinné)",
    arrivalFlightNumberOptional: "Číslo příletového letu (nepovinné)",
    servicePrice: "Cena služby",
    fuelExcludedShort: "pohonné hmoty nezahrnuty",
    fuelExcludedDetail:
      "Pohonné hmoty nejsou zahrnuty a platí se zvlášť podle spotřeby.",
    departureFlightDate: "Datum odletového letu (nepovinné)",
    departureFlightTime: "Čas odletového letu",
    departureFlightNumber: "Číslo odletového letu",
    departureFlightDateRequired: "Prosím vyberte datum odletového letu.",
    departureFlightDateInvalid:
      "Datum odletového letu nesmí být dříve než začátek služby.",
    dailyQuoteIncludes:
      "Zahrnuje vybrané vozidlo a šoféra bez limitu kilometrů nebo hodin. Pohonné hmoty jsou vyloučeny.",
    reviewAndConfirm: "Přezkoumat a potvrdit",
    fuelTermsTitle: "Důležité informace o pohonných hmotách",
    fuelTermsBody:
      "Denní poplatek €150 za službu zahrnuje vozidlo a šoféra. Pohonné hmoty nejsou zahrnuty. Skutečné náklady na pohonné hmoty zaplatíte zvlášť podle spotřeby.",
    fuelTermsCheckbox:
      "Chápu, že pohonné hmoty jsou vyloučeny a budou placeny zvlášť podle spotřeby.",
    cancel: "Zrušit",
    close: "Zavřít",
    understandAndConfirm: "Chápu a potvrzuji",
    dailyCashConfirmation:
      "Váš denní pronájem šoféra je potvrzen. Cena služby nezahrnuje pohonné hmoty, které se platí zvlášť podle spotřeby.",
    stepRoute: "Trasa",
    stepDetails: "Podrobnosti",
    stepContact: "Kontakt",
    continue: "Pokračovat",
    back: "Zpět",
    reserveForPrice: "Rezervovat",
    perVehicleNote: "Na vozidlo — ne na osobu · Až 6 cestujících",
    perVehicleNoteVito: "Na vozidlo — ne na osobu · Až 6 cestujících",
    perVehicleNoteSprinter: "Na vozidlo — ne na osobu · Až 12 cestujících",
    perVehicle: "pevná cena · na vozidlo",
    capacitySwitchedSprinter:
      "Počet cestujících a zavazadel přesahuje kapacitu Vito — přepnuto na Mercedes Sprinter.",
  },

  pl: {
    navFleet: "Pojazdy",
    navService: "Usługi",
    navRoutes: "Trasy",
    navReviews: "Opinie",
    navContact: "Kontakt",
    bookNow: "Zarezerwuj",
    alwaysAvailable: "Do Twojej dyspozycji 24 godziny na dobę",
    heroEyebrow: "Prywatny serwis szoferski · Antalya",
    heroTitle: "Transfery lotniskowe premium<br />w Antalyi",
    heroSubtitle:
      "Prywatne transfery z szoferem z lotniska Antalya do Belek, Side, Kemer i Alanyi.",
    bookTransfer: "Zarezerwuj transfer",
    instantQuote: "Sprawdź cenę",
    googleRated: "Ocena Google",
    trustedGuests: "Zaufało nam ponad 2 500 gości",
    discover: "Odkryj",
    privateJourney: "Twoja prywatna podróż",
    quoteTitle: "Dokąd Cię zawieziemy?",
    pickup: "Miejsce odbioru",
    destination: "Cel podróży",
    date: "Data",
    guests: "Goście",
    airportOption: "Lotnisko Antalya (AYT)",
    hotelOption: "Hotel",
    privateAddressOption: "Adres prywatny",
    pickupAddress: "Pełny adres odbioru",
    pickupAddressPlaceholder: "Nazwa hotelu, ulica, numer budynku i dzielnica",
    dropoffAddress: "Pełny adres docelowy",
    dropoffAddressPlaceholder: "Nazwa hotelu, ulica, numer budynku i dzielnica",
    selectDestination: "Wybierz cel",
    airportReturnPrice:
      "Cena zostanie potwierdzona po sprawdzeniu hotelu lub adresu odbioru.",
    oneGuest: "1 gość",
    twoGuests: "2 gości",
    threeGuests: "3 gości",
    fourGuests: "4 gości",
    fiveGuests: "5 gości",
    sixGuests: "6 gości",
    sevenGuests: "7 gości",
    viewQuote: "Pokaż cenę",
    flightTracking: "Śledzenie lotu w czasie rzeczywistym",
    fixedPrice: "Gwarantowana stała cena",
    meetGreet: "Osobiste powitanie",
    speakingDrivers: "Kierowcy mówiący po angielsku i niemiecku",
    tbLicensed: "Licencja TÜRSAB",
    tbFlightTracking: "Śledzenie lotu",
    tbFixedPrice: "Stała cena",
    tb247Concierge: "Concierge 24/7",
    tbChildSeats: "Foteliki w cenie",
    welcomeEyebrow: "Witamy na najwyższym poziomie",
    welcomeTitle: "Podróżuj z klasą.<br />Przyjeżdżaj spokojnie.",
    welcomeBody:
      "Od chwili lądowania dopracowany jest każdy szczegół. Nasz zespół na lotnisku wita Cię, kierowca podjeżdża w miejsce odbioru, a bagaże trafiają do starannie przygotowanego prywatnego auta.",
    ourStandards: "Nasze standardy usług",
    concierge: "Usługi concierge",
    guestsWelcomed: "Powitanych gości",
    guestRating: "Średnia ocena gości",
    privateTransfers: "Prywatne transfery",
    fleetEyebrow: "Nasza flota",
    fleetTitle: "Twoja prywatna przestrzeń,<br />doskonała w każdym detalu.",
    fleetIntro:
      "Podróżuj komfortowo z obszernym miejscem dla rodziny, sprzętu golfowego i walizek.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Wzorzec eleganckiej podróży grupowej: przestronny, wyjątkowo cichy i wyposażony dla bezproblemowego przybycia.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Obszerna prywatna kabina dla większych rodzin, grup golfowych i gości z obfitym bagażem.",
    signatureFleet: "Flota Signature",
    passengers: "pasażerów",
    suitcases: "walizek",
    luggageLabel: "Duży bagaż",
    capacitySwitchedSprinter:
      "Pasażerowie i bagaż przekraczają Vito — przełączono na Mercedes Sprinter.",
    capacityNoVehicle:
      "Tylu pasażerów i bagażu przekracza nasze pojazdy. Skontaktuj się z nami na WhatsApp.",
    leatherSeats: "Skórzane fotele premium",
    wifi: "Bezpłatne WiFi",
    water: "Schłodzona woda mineralna",
    childSeats: "Foteliki dziecięce na życzenie",
    television: "Telewizor w pojeździe",
    coldDrinks: "Zimne napoje",
    snacks: "Przekąski",
    nameSignGreeting: "Powitanie przy stanowisku J / 777",
    reserveVehicle: "Zarezerwuj pojazd",
    insideVclass: "Wnętrze Sprinter",
    interiorTitle: "Prywatny salon<br />między lotniskiem a hotelem.",
    serviceEyebrow: "Standard Antalya VIP",
    serviceTitle: "Więcej niż transfer.<br />Wyjątkowe powitanie.",
    serviceIntro:
      "Uwaga na poziomie pięciogwiazdkowego hotelu, doświadczeni lokalni szoferzy i pełen spokój od lotniska po resort.",
    trackingTitle: "Śledzenie lotu",
    trackingBody:
      "Śledzimy Twój lot w czasie rzeczywistym i automatycznie dostosowujemy godzinę odbioru bez dodatkowych opłat.",
    chauffeurTitle: "Profesjonalni szoferzy",
    chauffeurBody:
      "Zawsze zadbani, dyskretni, wybrani za znajomość terenu i najwyższe standardy obsługi.",
    greetTitle: "Meet & Greet",
    greetBody:
      "Przy przylotach międzynarodowych nasz zespół wita Cię przy stanowisku J / 777, wzywa kierowcę w miejsce odbioru i pomaga z bagażem.",
    supportTitle: "Concierge 24/7",
    supportBody:
      "Przed, w trakcie i po podróży zawsze możesz skontaktować się z nami telefonicznie lub przez WhatsApp.",
    priceTitle: "Stałe ceny",
    priceBody:
      "Potwierdzona cena jest ceną ostateczną. Czas oczekiwania, parking i opóźnienia lotów są wliczone.",
    familyTitle: "Dla rodzin",
    familyBody:
      "Odpowiednie foteliki dziecięce, obszerne kabiny i cierpliwa pomoc dla spokojnego przybycia z rodziną.",
    routesEyebrow: "Nasze najpopularniejsze trasy",
    routesTitle: "Z lotniska Antalya<br />na Turecką Riwierę.",
    routesIntro:
      "Wszystkie ceny są za pojazd, nie za osobę, i obejmują 90 minut oczekiwania.",
    golfFavourite: "Ulubieniec golfistów",
    from: "Od",
    reviewsEyebrow: "Opinie gości",
    reviewsTitle: "Usługa, która<br />zostaje w pamięci.",
    googleReviews: "Na podstawie 387 zweryfikowanych opinii Google",
    reviewOne:
      "„Nasz kierowca czekał mimo 90-minutowego opóźnienia. Pojazd był nieskazitelny, przyjemnie chłodny i wyposażony już w oba foteliki. Dokładnie takie powitanie potrzebowała nasza rodzina.”",
    reviewTwo:
      "„Od pierwszego kontaktu WhatsApp po przyjazd do Belek wszystko było absolutnie pierwszorzędne. Punktualnie, dyskretnie i bardzo profesjonalnie. Torby golfowe bez problemu się zmieściły.”",
    reviewThree:
      "„To było jak serwis szoferski hotelu, a nie taksówka na lotnisku. Jasna komunikacja, nieskazitelny pojazd i naprawdę uprzejmy kierowca.”",
    trustedBy: "Wybór gości czołowych resortów w Antalyi",
    faqEyebrow: "Często zadawane pytania",
    faqTitle: "Przed Twoją podróżą.",
    faqCatArrival: "Odbiór i transfer",
    faqCatJourney: "Powrót i podróż",
    faqCatPayment: "Płatność i cena",
    faqCatVehicle: "Pojazd i bagaż",
    faqReminder: "Przed podróżą zapoznaj się z sekcją FAQ na naszej stronie.",
    viewFaq: "Zobacz FAQ",
    faqIntro:
      "Wszystko, co musisz wiedzieć o prywatnym transferze z lotniska w Antalyi.",
    askQuestion: "Zadaj pytanie",
    faqOneQ: "Co się stanie, jeśli mój lot się opóźni?",
    faqOneA:
      "Nie musisz nic robić. Śledzimy Twój lot na bieżąco i automatycznie dostosowujemy godzinę odbioru. Za opóźnienia linii lotniczych nigdy nie pobieramy dopłat – kierowca czeka bez względu na godzinę lądowania, a pierwsze 90 minut po wylądowaniu zawsze jest wliczone w cenę.",
    faqTwoQ: "Przylatuję lotem międzynarodowym. Jak wygląda odbiór?",
    faqTwoA:
      "Po kontroli paszportowej i odbiorze bagażu udaj się razem z innymi pasażerami do strefy Meet & Greet i podejdź do naszego stanowiska J / 777. Wystarczy podać naszemu pracownikowi swoje nazwisko. Nasz zespół natychmiast powiadamia kierowcę; wjeżdża on na teren lotniska i podjeżdża w miejsce odbioru, a nasz pracownik odprowadza Cię do samochodu. Cały proces trwa około 7–8 minut.",
    faqSixQ: "Przylatuję lotem krajowym. Gdzie znajdę kierowcę?",
    faqSixA:
      "Strefa Meet & Greet obsługuje wyłącznie przyloty międzynarodowe, dlatego gośćmi lotów krajowych zajmujemy się inaczej: przed transferem wysyłamy Ci numer telefonu kierowcy. Po wylądowaniu wystarczy dać mu znać – odbierze Cię w hali przylotów.",
    faqSevenQ: "Co zrobić, jeśli przy stanowisku J / 777 nikogo nie ma?",
    faqSevenA:
      "Przy stanowisku stale dyżurują dwie osoby z naszego zespołu, a ich jedynym zadaniem jest odprowadzanie przybywających gości do samochodów. Jeśli zastaniesz stanowisko na moment puste, oznacza to, że kolega odprowadza właśnie gościa, który przyleciał tuż przed Tobą – każde odprowadzenie trwa około 7–8 minut. Poczekaj proszę około 10 minut. Jeśli w tym czasie nikt nie wróci, napisz do nas na WhatsAppie: natychmiast powiadomimy kierowcę, poprosimy go o podjechanie w najbliższe miejsce i zaprowadzimy Cię prosto do auta bez dalszego czekania.",
    faqEightQ: "Co, jeśli wyjście z lotniska zajmie mi więcej niż 90 minut?",
    faqEightA:
      "Pierwsze 90 minut po wylądowaniu jest wliczone w cenę – z zapasem wystarcza na kontrolę paszportową, bagaż i odprawę celną – a przy opóźnieniu lotu okno to przesuwa się automatycznie. Dopiero jeśli coś niezwiązanego z lotem zatrzyma Cię w terminalu dłużej, doliczamy 5 € dopłaty parkingowej za każdą kolejną godzinę. W praktyce zdarza się to niezwykle rzadko: niemal wszyscy nasi goście są w drodze na długo przed upływem tego czasu.",
    faqNineQ: "Jak wygląda płatność?",
    faqNineA:
      "Płacisz kierowcy gotówką na początku podróży – nie przyjmujemy kart. Ceny są ustalane w euro (EUR): stała kwota jest dokładnie taka, jaką widziałeś przy rezerwacji – za pojazd, ze wszystkimi opłatami lotniskowymi i parkingowymi, bez późniejszych dopłat. Wolisz zapłacić w dolarach amerykańskich lub lirach tureckich? Napisz do nas wcześniej na WhatsAppie po osobną wycenę, ponieważ kurs się różni. Kierowca wita Cię, ładuje bagaże i montuje zamówione foteliki dziecięce; po uregulowaniu płatności rozpoczyna się podróż.",
    faqTenQ: "Jak utrzymać kontakt przy transferze powrotnym?",
    faqTenA:
      "Gdy potwierdzisz naszemu zespołowi datę i godzinę powrotu przez WhatsApp, na kilka godzin przed transferem przydzielamy pojazd i wysyłamy Ci jego zdjęcia na WhatsAppie – a jeśli chcesz, także numer telefonu kierowcy. Gdy kierowca dotrze do hotelu, informuje recepcję, która przekazuje do Twojego pokoju, że samochód czeka. Nasi kierowcy nigdy nie dzwonią do gości bezpośrednio: cała komunikacja przechodzi przez jedną linię wsparcia na WhatsAppie, więc zawsze wiesz dokładnie, z kim rozmawiasz.",
    faqElevenQ: "Czy mogę anulować lub zmienić rezerwację?",
    faqElevenA:
      "Tak, i zawsze bezpłatnie. Nie pobieramy przedpłaty, więc nie ma czego zwracać ani na co czekać — jeśli plany się zmienią, wystarczy wiadomość na WhatsAppie. Zmianę godziny, numeru lotu czy adresu docelowego załatwiamy tak samo, bez dopłat.",
    faqTwelveQ: "W jakiej walucie mogę zapłacić?",
    faqTwelveA:
      "Nasze ceny ustalane są w euro (EUR) i płatne gotówką; kart nie przyjmujemy. Jeśli wolisz zapłacić w dolarach amerykańskich lub lirach tureckich, kwota zależy od kursu z danego dnia — napisz więc do nas na WhatsAppie przed transferem. Podamy jasną cenę i poinformujemy kierowcę, więc w aucie nie ma żadnych negocjacji.",
    faqThirteenQ: "Ile bagażu mogę zabrać?",
    faqThirteenA:
      "Zasadniczo jedna duża walizka i jeden bagaż podręczny na osobę. Jeśli masz więcej — dodatkową walizkę, sprzęt golfowy, wózek, narty czy rower — po prostu zaznacz to przy rezerwacji, a bez dopłaty podstawimy pojazd o odpowiedniej pojemności. Liczy się tylko to, żebyśmy wiedzieli wcześniej. Mercedes Vito zabiera do 6 pasażerów, a Sprinter do 12.",
    faqFourteenQ: "Co jeśli spóźnię się na transfer powrotny?",
    faqFourteenA:
      "Kierowca jest pod hotelem o umówionej godzinie i czeka 15 minut bezpłatnie. Jeśli przewidujesz opóźnienie, wystarczy jedna wiadomość na WhatsAppie: sprawdzimy godzinę wylotu, poinformujemy kierowcę i wspólnie dostosujemy plan. Nie chodzi o pośpiech, lecz o spokojny dojazd na lot.",
    faqFifteenQ: "Czy w trakcie podróży można zrobić dodatkowy postój?",
    faqFifteenA:
      "Oczywiście. Jeśli chcesz zatrzymać się przy supermarkecie lub aptece albo na chwilę na zdjęcie, powiedz nam o tym przy rezerwacji lub na WhatsAppie — zaplanujemy trasę z takim postojem. Jeśli postój wyraźnie zbacza z trasy, przed wyjazdem powiemy, czy coś dochodzi do kwoty; nic nie pojawia się później jako niespodzianka.",
    faqThreeQ: "Czy dostępne są foteliki dziecięce?",
    faqThreeA:
      "Tak. Nosidełka, foteliki i podkładki są dostępne bezpłatnie przy wcześniejszej rezerwacji.",
    faqFourQ: "Czy można przewieźć torby golfowe i duży bagaż?",
    faqFourA:
      "Tak. Sprinter i Vito są idealne dla grup golfowych. Podaj informacje o bagażu, a zaplanujemy odpowiedni pojazd.",
    faqFiveQ: "Czy podana cena jest ostateczna?",
    faqFiveA:
      "Tak. Cena, którą widzisz przy rezerwacji, to kwota, którą przekazujesz kierowcy gotówką – za pojazd, ze wszystkimi opłatami lotniskowymi, parkingiem i pierwszymi 90 minutami oczekiwania. Nie ma żadnych ukrytych opłat.",
    contactEyebrow: "Twoja podróż zaczyna się tutaj",
    contactTitle: "Przybądź do Antalyi<br />wyjątkowo komfortowo.",
    contactBody:
      "Zarezerwuj online w mniej niż dwie minuty lub skontaktuj się bezpośrednio z naszym concierge 24/7.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Odpowiedź zwykle w kilka minut",
    callUs: "Zadzwoń 24/7",
    emailUs: "E-mail do concierge",
    replyHour: "Odpowiedź w ciągu godziny",
    fromAirport: "Z lotniska Antalya",
    perVehicle: "za pojazd · stała cena",
    footerTagline: "Prywatne usługi szoferskie na całej Tureckiej Riwierze.",
    explore: "Odkryj",
    information: "Informacje",
    licensed: "Licencjonowany prywatny przewoźnik · Zgodny z TÜRSAB",
    quoteReady: "Twój prywatny transfer",
    vehicle: "Pojazd",
    journeyTime: "Czas podróży",
    totalFixed: "Cena łączna",
    quoteIncludes:
      "Obejmuje powitanie, śledzenie lotu, parking, 90 minut oczekiwania i wodę butelkowaną.",
    confirmWhatsapp: "Potwierdź przez WhatsApp",
    chatWithUs: "Napisz do nas",
    bookNowCta: "Zarezerwuj",
    backToQuote: "Wstecz",
    yourDetails: "Twoje dane",
    fullName: "Imię i nazwisko",
    emailLabel: "E-mail",
    phoneLabel: "Telefon / WhatsApp",
    flightNumber: "Numer lotu",
    flightArrivalTime: "Godzina przylotu",
    notesLabel: "Specjalne życzenia",
    confirmBooking: "Potwierdź rezerwację",
    bookingConfirmed: "Rezerwacja potwierdzona",
    referenceLabel: "Numer referencyjny",
    weWillContact:
      "Twoje zgłoszenie rezerwacji zostało wysłane. Skontaktujemy się w ciągu 30 minut.",
    paymentError: "Płatność nie powiodła się. Spróbuj ponownie.",
  },
  nl: {
    navFleet: "Voertuigen",
    navService: "Service",
    navRoutes: "Routes",
    navReviews: "Reviews",
    navContact: "Contact",
    bookNow: "Nu boeken",
    alwaysAvailable: "24 uur per dag, elke dag bereikbaar",
    heroEyebrow: "Privé chauffeurservice · Antalya",
    heroTitle: "Premium luchthavenstransfers<br />in Antalya",
    heroSubtitle:
      "Privé transfers met chauffeur van Antalya Luchthaven naar Belek, Side, Kemer en Alanya.",
    bookTransfer: "Transfer boeken",
    instantQuote: "Direct prijs ontvangen",
    googleRated: "Google-beoordeling",
    trustedGuests: "Vertrouwd door meer dan 2.500 gasten",
    discover: "Ontdekken",
    privateJourney: "Uw privéreis",
    quoteTitle: "Waar mogen wij u naartoe brengen?",
    pickup: "Ophaallocatie",
    destination: "Bestemming",
    date: "Datum",
    guests: "Gasten",
    airportOption: "Luchthaven Antalya (AYT)",
    hotelOption: "Hotel",
    privateAddressOption: "Privéadres",
    pickupAddress: "Volledig ophaaladres",
    pickupAddressPlaceholder: "Hotelnaam, straat, huisnummer en wijk",
    dropoffAddress: "Volledig bestemmingsadres",
    dropoffAddressPlaceholder: "Hotelnaam, straat, huisnummer en wijk",
    selectDestination: "Kies bestemming",
    airportReturnPrice:
      "De prijs wordt bevestigd nadat het hotel of ophaaladres is gecontroleerd.",
    oneGuest: "1 gast",
    twoGuests: "2 gasten",
    threeGuests: "3 gasten",
    fourGuests: "4 gasten",
    fiveGuests: "5 gasten",
    sixGuests: "6 gasten",
    sevenGuests: "7 gasten",
    viewQuote: "Prijs bekijken",
    flightTracking: "Realtime vluchtvolgend",
    fixedPrice: "Gegarandeerde vaste prijs",
    meetGreet: "Persoonlijk welkom",
    speakingDrivers: "Chauffeurs die Engels en Duits spreken",
    tbLicensed: "TÜRSAB Erkend",
    tbFlightTracking: "Vluchttracking",
    tbFixedPrice: "Vaste prijs",
    tb247Concierge: "Concierge 24/7",
    tbChildSeats: "Kinderzitjes inbegrepen",
    welcomeEyebrow: "Welkom op het hoogste niveau",
    welcomeTitle: "Stijlvol reizen.<br />Ontspannen aankomen.",
    welcomeBody:
      "Vanaf het moment dat u landt, is aan elk detail gedacht. Ons luchthaventeam ontvangt u, uw chauffeur staat klaar op het ophaalpunt en uw bagage gaat in een zorgvuldig voorbereide privéwagen.",
    ourStandards: "Onze servicestandaarden",
    concierge: "Conciërgeservice",
    guestsWelcomed: "Verwelkomde gasten",
    guestRating: "Gemiddelde gastbeoordeling",
    privateTransfers: "Privétransfers",
    fleetEyebrow: "Onze vloot",
    fleetTitle: "Uw privéruimte,<br />perfect tot in elk detail.",
    fleetIntro:
      "Reis comfortabel met ruimte voor familie, golfbagage en koffers.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "De maatstaf voor verfijnde groepsreizen: ruim, uitzonderlijk stil en uitgerust voor een probleemloze aankomst.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Een ruime privécabine voor grotere families, golfgroepen en gasten met veel bagage.",
    signatureFleet: "Signature vloot",
    passengers: "passagiers",
    suitcases: "koffers",
    luggageLabel: "Grote bagage",
    capacitySwitchedSprinter:
      "Passagiers en bagage overschrijden de Vito — overgeschakeld naar Mercedes Sprinter.",
    capacityNoVehicle:
      "Zoveel passagiers en bagage overschrijdt onze voertuigen. Neem contact op via WhatsApp.",
    leatherSeats: "Premium leren stoelen",
    wifi: "Gratis WiFi",
    water: "Gekoeld mineraalwater",
    childSeats: "Kinderzitjes op verzoek",
    television: "Televisie in het voertuig",
    coldDrinks: "Koude dranken",
    snacks: "Snacks",
    nameSignGreeting: "Ontvangst bij balie J / 777",
    reserveVehicle: "Voertuig reserveren",
    insideVclass: "In het Sprinter interieur",
    interiorTitle: "Een privélounge<br />tussen luchthaven en hotel.",
    serviceEyebrow: "De Antalya VIP-standaard",
    serviceTitle: "Meer dan een transfer.<br />Een bijzonder welkom.",
    serviceIntro:
      "Aandacht op hotelniveau, ervaren lokale chauffeurs en absolute gemoedsrust van luchthaven tot resort.",
    trackingTitle: "Vluchttracking",
    trackingBody:
      "We volgen uw vlucht in realtime en passen de ophaalafspraak automatisch en kosteloos aan.",
    chauffeurTitle: "Professionele chauffeurs",
    chauffeurBody:
      "Altijd verzorgd, discreet en geselecteerd op lokale kennis en hoogste servicestandaard.",
    greetTitle: "Meet & Greet",
    greetBody:
      "Bij internationale aankomsten ontvangt ons team u bij balie J / 777, roept uw chauffeur naar het ophaalpunt en helpt met de bagage.",
    supportTitle: "24/7 Conciërge",
    supportBody:
      "Voor, tijdens en na uw reis is er altijd iemand bereikbaar per telefoon of WhatsApp.",
    priceTitle: "Vaste prijzen",
    priceBody:
      "De bevestigde prijs is de definitieve prijs. Wachttijd, parkeren en vluchtvertragingen zijn inbegrepen.",
    familyTitle: "Voor gezinnen",
    familyBody:
      "Passende kinderzitjes, ruime interieurs en geduldige hulp voor een ontspannen familieaankomst.",
    routesEyebrow: "Onze populairste ritten",
    routesTitle: "Van Antalya Luchthaven<br />naar de Turkse Rivièra.",
    routesIntro:
      "Alle prijzen gelden per voertuig, niet per persoon, inclusief 90 minuten wachttijd.",
    golfFavourite: "Golfliefhebbersfavoriet",
    from: "Vanaf",
    reviewsEyebrow: "Gastbeoordelingen",
    reviewsTitle: "Service die lang<br />bijblijft.",
    googleReviews: "Gebaseerd op 387 geverifieerde Google-beoordelingen",
    reviewOne:
      "„Onze chauffeur wachtte ondanks 90 minuten vertraging. Het voertuig was onberispelijk, aangenaam koel en al uitgerust met beide kinderzitjes. Precies de ontvangst die onze familie nodig had.”",
    reviewTwo:
      "„Van het eerste WhatsApp-contact tot aankomst in Belek absoluut eersteklas. Punctueel, discreet en zeer professioneel. Ook onze golftassen pasten er gemakkelijk in.”",
    reviewThree:
      "„Dit voelde als een chauffeurservice van een hotel, niet als een luchthaventaxi. Duidelijke communicatie, een onberispelijk voertuig en een oprecht beleefde chauffeur.”",
    trustedBy: "Vertrouwd door gasten van toonaangevende resorts in Antalya",
    faqEyebrow: "Veelgestelde vragen",
    faqTitle: "Vóór uw reis.",
    faqCatArrival: "Aankomst & transfer",
    faqCatJourney: "Terugrit & onderweg",
    faqCatPayment: "Betaling & prijs",
    faqCatVehicle: "Voertuig & bagage",
    faqReminder: "Lees vóór uw reis het FAQ-gedeelte op onze website.",
    viewFaq: "FAQ bekijken",
    faqIntro:
      "Alles wat u moet weten over uw privétransfer van de luchthaven Antalya.",
    askQuestion: "Stel een vraag",
    faqOneQ: "Wat gebeurt er bij een vluchtvertraging?",
    faqOneA:
      "U hoeft niets te doen. Wij volgen uw vlucht live en passen uw ophaaltijd automatisch aan. Vertragingen van de luchtvaartmaatschappij brengen wij nooit in rekening – uw chauffeur staat er, hoe laat u ook landt, en de eerste 90 minuten na de landing zijn altijd inbegrepen.",
    faqTwoQ:
      "Ik kom aan met een internationale vlucht. Hoe verloopt de ontvangst?",
    faqTwoA:
      "Loop na de paspoortcontrole en bagageafhandeling met de andere passagiers mee naar de Meet & Greet-zone en kom naar onze balie J / 777. Geef onze medewerker eenvoudig uw naam door – dat volstaat. Ons team waarschuwt meteen uw chauffeur; hij rijdt het luchthaventerrein op en staat klaar op het ophaalpunt, terwijl onze medewerker u naar de auto begeleidt. Het hele proces duurt ongeveer 7–8 minuten.",
    faqSixQ:
      "Ik kom aan met een binnenlandse vlucht. Waar vind ik mijn chauffeur?",
    faqSixA:
      "De Meet & Greet-zone is uitsluitend voor internationale aankomsten. Gasten van binnenlandse vluchten begeleiden wij daarom anders: wij sturen u vóór de transfer het telefoonnummer van uw chauffeur. Laat het hem na de landing kort weten – hij haalt u op in de aankomsthal.",
    faqSevenQ: "Wat als er niemand bij balie J / 777 staat?",
    faqSevenA:
      "Bij onze balie zijn permanent twee medewerkers aanwezig; hun enige taak is aankomende gasten naar hun voertuig te begeleiden. Treft u de balie even onbemand aan, dan begeleidt een collega net de gast die vlak vóór u aankwam – elke begeleiding duurt ongeveer 7–8 minuten. Wacht dan alstublieft zo'n 10 minuten. Is er daarna nog niemand terug, stuur ons dan een bericht via WhatsApp: wij informeren uw chauffeur direct, laten hem op het dichtstbijzijnde punt stoppen en begeleiden u zonder verder wachten rechtstreeks naar uw auto.",
    faqEightQ:
      "Wat als ik meer dan 90 minuten nodig heb om de luchthaven te verlaten?",
    faqEightA:
      "De eerste 90 minuten na de landing zijn kosteloos inbegrepen – ruim meer dan paspoortcontrole, bagage en douane vragen – en dit tijdvenster schuift automatisch mee bij vertraging. Alleen wanneer iets dat losstaat van uw vlucht u langer in de terminal houdt, komt er een parkeerbijdrage van € 5 per extra uur bij. In de praktijk gebeurt dat vrijwel nooit: bijna al onze gasten zijn ruim daarvoor onderweg.",
    faqNineQ: "Hoe betaal ik?",
    faqNineA:
      "U betaalt uw chauffeur contant aan het begin van de rit – kaarten accepteren we niet. De prijzen zijn vastgesteld in euro's (EUR): het vaste bedrag is precies wat u bij het boeken zag – per voertuig, inclusief alle luchthaven- en parkeerkosten, zonder latere toeslagen. Wilt u liever in Amerikaanse dollars of Turkse lira betalen? Stuur ons vooraf een bericht via WhatsApp voor een aparte prijs, aangezien de wisselkoers verschilt. Uw chauffeur verwelkomt u, laadt uw bagage in en plaatst de gevraagde kinderzitjes; na de betaling begint uw rit.",
    faqTenQ: "Hoe houd ik contact voor de terugtransfer?",
    faqTenA:
      "Zodra u datum en tijd van uw terugreis via WhatsApp met ons team hebt bevestigd, wijzen wij enkele uren vóór de transfer uw voertuig toe en sturen wij u foto's ervan via WhatsApp – desgewenst ook het telefoonnummer van uw chauffeur. Zodra uw chauffeur bij het hotel is, meldt hij zich bij de receptie, die uw kamer laat weten dat de auto klaarstaat. Onze chauffeurs bellen gasten nooit rechtstreeks: alle contact loopt via onze centrale WhatsApp-supportlijn, zodat u altijd precies weet met wie u spreekt.",
    faqElevenQ: "Kan ik mijn boeking annuleren of wijzigen?",
    faqElevenA:
      "Ja, en altijd kosteloos. Wij vragen geen vooruitbetaling, dus er valt niets terug te betalen en u hoeft nergens op te wachten — veranderen uw plannen, dan volstaat een bericht via WhatsApp. Een ander tijdstip, vluchtnummer of afleveradres regelen wij op dezelfde manier, zonder meerkosten.",
    faqTwelveQ: "In welke valuta kan ik betalen?",
    faqTwelveA:
      "Onze prijzen zijn in euro's (EUR) en worden contant voldaan; kaarten accepteren wij niet. Betaalt u liever in Amerikaanse dollars of Turkse lira, dan hangt het bedrag af van de dagkoers — stuur ons daarom vóór uw transfer een bericht via WhatsApp. Wij bevestigen een duidelijke prijs en informeren uw chauffeur, zodat er in de auto niets onderhandeld wordt.",
    faqThirteenQ: "Hoeveel bagage mag ik meenemen?",
    faqThirteenA:
      "In de regel één grote koffer en één handbagagestuk per passagier. Hebt u meer bij zich — een extra koffer, golftas, kinderwagen, ski's of een fiets — geef het dan aan bij het boeken; wij zetten zonder meerkosten een voertuig met de juiste capaciteit in. Het enige wat telt, is dat wij het vooraf weten. Een Mercedes Vito vervoert tot 6 passagiers, een Sprinter tot 12.",
    faqFourteenQ: "Wat als ik te laat ben voor mijn terugtransfer?",
    faqFourteenA:
      "Uw chauffeur staat op het afgesproken tijdstip bij uw hotel en wacht 15 minuten kosteloos. Verwacht u vertraging, stuur dan één bericht via WhatsApp: wij controleren uw vluchttijd, informeren uw chauffeur en stemmen het plan met u af. Wij willen u niet opjagen, maar u rustig op tijd bij uw vlucht krijgen.",
    faqFifteenQ: "Is een tussenstop tijdens de rit mogelijk?",
    faqFifteenA:
      "Natuurlijk. Wilt u onderweg stoppen bij een supermarkt of apotheek of even voor een foto, laat het ons weten bij het boeken of via WhatsApp — wij plannen de route erop. Leidt een stop ver van uw route af, dan zeggen wij vóór vertrek of er iets bij komt; achteraf verrast u niets.",
    faqThreeQ: "Zijn kinderzitjes beschikbaar?",
    faqThreeA:
      "Ja. Babyschalen, kinderzitjes en zitverhogers zijn bij vooraf boeken gratis beschikbaar.",
    faqFourQ: "Kunnen golfbags en groot bagage worden vervoerd?",
    faqFourA:
      "Ja. Sprinter en Vito zijn ideaal voor golfgroepen. Geef uw bagage op en wij plannen het juiste voertuig.",
    faqFiveQ: "Is de getoonde prijs definitief?",
    faqFiveA:
      "Ja. De prijs die u bij het boeken ziet, is het bedrag dat u contant aan uw chauffeur geeft – per voertuig, inclusief alle luchthavenkosten, parkeren en de eerste 90 minuten wachttijd. Er zijn geen verborgen kosten.",
    contactEyebrow: "Uw reis begint hier",
    contactTitle: "Buitengewoon goed<br />aankomen in Antalya.",
    contactBody:
      "Boek online in minder dan twee minuten of spreek direct met ons 24/7 conciërgeteam.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Antwoord meestal binnen enkele minuten",
    callUs: "24/7 bellen",
    emailUs: "Conciërge e-mail",
    replyHour: "Antwoord binnen een uur",
    fromAirport: "Vanaf Antalya Luchthaven",
    perVehicle: "per voertuig · vaste prijs",
    footerTagline: "Privé chauffeurservices aan de hele Turkse Rivièra.",
    explore: "Ontdekken",
    information: "Informatie",
    licensed: "Erkende privé-transferaanbieder · TÜRSAB-conform",
    quoteReady: "Uw privétransfer",
    vehicle: "Voertuig",
    journeyTime: "Reistijd",
    totalFixed: "Totaalprijs",
    quoteIncludes:
      "Inclusief meet & greet, vluchtvolging, parkeren, 90 minuten wachttijd en flesje water.",
    confirmWhatsapp: "Bevestigen via WhatsApp",
    chatWithUs: "Chat met ons",
    bookNowCta: "Nu boeken",
    backToQuote: "Terug",
    yourDetails: "Uw gegevens",
    fullName: "Volledige naam",
    emailLabel: "E-mail",
    phoneLabel: "Telefoon / WhatsApp",
    flightNumber: "Vluchtnummer",
    flightArrivalTime: "Aankomsttijd",
    notesLabel: "Speciale wensen",
    confirmBooking: "Boeking bevestigen",
    bookingConfirmed: "Boeking bevestigd",
    referenceLabel: "Referentie",
    weWillContact:
      "Uw boekingsaanvraag is verzonden. We nemen binnen 30 minuten contact op.",
    paymentError: "Betaling mislukt. Probeer het opnieuw.",
  },
  uk: {
    hotelSearchHint: "Введіть назву готелю та оберіть її зі списку — регіон і ціну ми заповнимо за вас.",
    hotelNotListed: "Мого готелю немає у списку",
    hotelNoMatch: "Збігів поки немає. Введіть назву та оберіть регіон самостійно.",
    navFleet: "Автопарк",
    navService: "Сервіс",
    navRoutes: "Маршрути",
    navReviews: "Відгуки",
    navContact: "Контакти",
    bookNow: "Забронювати",
    alwaysAvailable: "На зв'язку цілодобово, щодня",
    heroEyebrow: "Приватний шофер · Анталья",
    heroTitle: "Преміальний трансфер<br />з аеропорту Анталії",
    heroSubtitle:
      "Приватні трансфери з водієм з аеропорту Анталії до Белека, Сіде, Кемера та Аланії.",
    bookTransfer: "Замовити трансфер",
    instantQuote: "Дізнатися ціну",
    googleRated: "Рейтинг Google",
    trustedGuests: "Нам довіряють понад 2 500 гостей",
    discover: "Детальніше",
    privateJourney: "Ваша приватна поїздка",
    quoteTitle: "Куди вас відвезти?",
    pickup: "Місце зустрічі",
    destination: "Напрямок",
    date: "Дата",
    guests: "Гості",
    airportOption: "Аеропорт Анталії (AYT)",
    hotelOption: "Готель",
    privateAddressOption: "Приватна адреса",
    pickupAddress: "Повна адреса подачі",
    pickupAddressPlaceholder: "Назва готелю, вулиця, номер будинку та район",
    dropoffAddress: "Повна адреса призначення",
    dropoffAddressPlaceholder: "Назва готелю, вулиця, номер будинку та район",
    selectDestination: "Оберіть напрямок",
    airportReturnPrice:
      "Ціну буде підтверджено після перевірки готелю або адреси подачі.",
    oneGuest: "1 гість",
    twoGuests: "2 гості",
    threeGuests: "3 гості",
    fourGuests: "4 гості",
    fiveGuests: "5 гостей",
    sixGuests: "6 гостей",
    sevenGuests: "7 гостей",
    viewQuote: "Показати ціну",
    flightTracking: "Відстеження рейсу в реальному часі",
    fixedPrice: "Гарантія фіксованої ціни",
    meetGreet: "Особиста зустріч",
    speakingDrivers: "Водії розмовляють англійською та німецькою",
    tbLicensed: "Ліцензія TÜRSAB",
    tbFlightTracking: "Відстеження рейсу",
    tbFixedPrice: "Фіксована ціна",
    tb247Concierge: "Консьєрж 24/7",
    tbChildSeats: "Дитячі крісла в комплекті",
    welcomeEyebrow: "Ласкаво просимо на найвищий рівень",
    welcomeTitle: "Подорожуйте стильно.<br />Прибувайте спокійно.",
    welcomeBody:
      "З моменту приземлення продумано кожну деталь. Наша команда в аеропорту зустрічає вас, водій подає автомобіль до місця посадки, а багаж завантажують у ретельно підготовлене приватне авто.",
    ourStandards: "Наші стандарти сервісу",
    concierge: "Підтримка консьєржа",
    guestsWelcomed: "Зустрінутих гостей",
    guestRating: "Середня оцінка гостей",
    privateTransfers: "Приватні трансфери",
    fleetEyebrow: "Наш автопарк",
    fleetTitle: "Ваш особистий простір,<br />бездоганний у деталях.",
    fleetIntro:
      "Подорожуйте в тиші та комфорті з місцем для сім'ї, багажу та обладнання для гольфу.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Еталон комфортних групових поїздок: просторий, надзвичайно тихий та оснащений для бездоганного прибуття.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Просторий приватний салон для великих сімей, груп гравців у гольф та гостей з об'ємним багажем.",
    signatureFleet: "Фірмовий автопарк",
    passengers: "пасажирів",
    suitcases: "валіз",
    luggageLabel: "Великий багаж",
    capacitySwitchedSprinter:
      "Пасажири та багаж перевищують Vito — обрано Mercedes Sprinter.",
    capacityNoVehicle:
      "Стільки пасажирів і багажу перевищує наші автомобілі. Напишіть нам у WhatsApp.",
    leatherSeats: "Преміальні шкіряні сидіння",
    wifi: "Безкоштовний WiFi",
    water: "Охолоджена вода",
    childSeats: "Дитячі крісла на запит",
    television: "Телевізор в автомобілі",
    coldDrinks: "Холодні напої",
    snacks: "Закуски",
    nameSignGreeting: "Зустріч біля стійки J / 777",
    reserveVehicle: "Забронювати автомобіль",
    insideVclass: "Салон Sprinter",
    interiorTitle: "Приватний лаунж<br />між аеропортом і готелем.",
    serviceEyebrow: "Стандарт Antalya VIP",
    serviceTitle: "Більше ніж трансфер.<br />Продумана зустріч.",
    serviceIntro:
      "Увага рівня п'ятизіркового готелю, досвідчені місцеві шофери та спокій від аеропорту до курорту.",
    trackingTitle: "Відстеження рейсу",
    trackingBody:
      "Ми відстежуємо ваш рейс у реальному часі та автоматично коригуємо час зустрічі без доплати.",
    chauffeurTitle: "Професійні шофери",
    chauffeurBody:
      "Завжди бездоганний вигляд, делікатність, знання регіону та найвищі стандарти обслуговування.",
    greetTitle: "Зустріч в аеропорту",
    greetBody:
      "Під час міжнародних прильотів наша команда зустрічає вас біля стійки J / 777, викликає водія до місця посадки та допомагає з багажем.",
    supportTitle: "Консьєрж 24/7",
    supportBody:
      "До, під час і після поїздки вам завжди відповість людина по телефону або в WhatsApp.",
    priceTitle: "Фіксовані ціни",
    priceBody:
      "Підтверджена ціна є остаточною. Очікування, паркування та затримки рейсів вже включені.",
    familyTitle: "Для всієї родини",
    familyBody:
      "Дитячі крісла за віком, просторий салон та уважна допомога для спокійного сімейного прибуття.",
    routesEyebrow: "Найпопулярніші поїздки",
    routesTitle: "З аеропорту Анталії<br />на Турецьку Рив'єру.",
    routesIntro:
      "Усі ціни вказані за автомобіль, а не за пасажира, і включають 90 хвилин очікування.",
    golfFavourite: "Вибір гравців у гольф",
    from: "Від",
    reviewsEyebrow: "Відгуки гостей",
    reviewsTitle: "Сервіс, який пам'ятають<br />після прибуття.",
    googleReviews: "На основі 387 підтверджених відгуків Google",
    reviewOne:
      "«Незважаючи на затримку рейсу на 90 хвилин, водій чекав на нас. Автомобіль був бездоганно чистим та прохолодним, а обидва дитячі крісла вже були встановлені. Саме така зустріч потрібна нашій родині».",
    reviewTwo:
      "«Від першого повідомлення в WhatsApp до прибуття в Белек все було на найвищому рівні. Пунктуально, делікатно і дуже професійно. Наші сумки для гольфу легко помістилися».",
    reviewThree:
      "«Це нагадувало трансфер від п'ятизіркового готелю, а не таксі з аеропорту. Чіткий зв'язок, бездоганний автомобіль та по-справжньому ввічливий водій».",
    trustedBy: "Нам довіряють гості провідних курортів Анталії",
    faqEyebrow: "Часті запитання",
    faqTitle: "Перед поїздкою.",
    faqCatArrival: "Зустріч і трансфер",
    faqCatJourney: "Зворотний трансфер і поїздка",
    faqCatPayment: "Оплата й ціна",
    faqCatVehicle: "Автомобіль і багаж",
    faqReminder: "Перед поїздкою ознайомтеся з розділом поширених запитань на нашому сайті.",
    viewFaq: "Переглянути FAQ",
    faqIntro:
      "Все, що потрібно знати про приватний трансфер з аеропорту Анталії.",
    askQuestion: "Поставити запитання",
    faqOneQ: "Що станеться, якщо мій рейс затримається?",
    faqOneA:
      "Від вас нічого не потрібно. Ми стежимо за вашим рейсом у реальному часі й автоматично коригуємо час подачі автомобіля. За затримки авіакомпанії ми ніколи не беремо доплат — водій зустріне вас о будь-якій годині, а перші 90 хвилин після посадки завжди включені у вартість.",
    faqTwoQ: "Я прилітаю міжнародним рейсом. Як відбувається зустріч?",
    faqTwoA:
      "Після паспортного контролю та отримання багажу прямуйте разом з іншими пасажирами до зони зустрічі Meet & Greet і підійдіть до нашої стійки J / 777. Достатньо назвати нашому працівникові своє ім'я. Наша команда одразу повідомляє водія; він в'їжджає на територію аеропорту та подає автомобіль до місця посадки, а працівник тим часом проводжає вас до авто. Уся процедура триває близько 7–8 хвилин.",
    faqSixQ: "Я прилітаю внутрішнім рейсом. Де знайти водія?",
    faqSixA:
      "Зона Meet & Greet працює лише для міжнародних прильотів, тому гостей внутрішніх рейсів ми супроводжуємо інакше: перед трансфером надсилаємо вам номер телефону водія. Після посадки просто повідомте йому — він зустріне вас у залі прильотів.",
    faqSevenQ: "Що робити, якщо біля стійки J / 777 нікого немає?",
    faqSevenA:
      "На стійці постійно чергують двоє наших працівників, і їхнє єдине завдання — провести гостей до автомобіля. Якщо стійка на мить порожня, це означає, що колега саме супроводжує гостя, який прилетів перед вами: кожен супровід триває близько 7–8 хвилин. Будь ласка, зачекайте приблизно 10 хвилин. Якщо за цей час ніхто не повернувся, напишіть нам у WhatsApp: ми негайно повідомимо водія, він під'їде до найближчої точки, і ми проведемо вас просто до авто без подальшого очікування.",
    faqEightQ:
      "Що буде, якщо мені знадобиться більше ніж 90 хвилин, щоб вийти з аеропорту?",
    faqEightA:
      "Перші 90 хвилин після посадки включені у вартість — цього з запасом вистачає на паспортний контроль, багаж і митницю, а в разі затримки рейсу відлік зміщується автоматично. Лише якщо ви затримаєтеся в терміналі довше з причин, не пов'язаних із рейсом, додається паркувальний внесок 5 € за кожну додаткову годину. На практиці це трапляється майже ніколи: переважна більшість гостей вирушає задовго до цього.",
    faqNineQ: "Як відбувається оплата?",
    faqNineA:
      "Ви розраховуєтеся з водієм готівкою на початку поїздки — картки не приймаються. Ціни встановлені в євро (EUR): фіксована сума точно відповідає тій, яку ви бачили під час бронювання, — за автомобіль, з усіма аеропортовими та паркувальними зборами, без подальших доплат. Бажаєте сплатити в доларах США чи турецьких лірах? Напишіть нам заздалегідь у WhatsApp, щоб отримати окрему ціну, оскільки курс відрізняється. Водій зустрічає вас, завантажує багаж і встановлює замовлені дитячі крісла; після оплати ваша поїздка починається.",
    faqTenQ: "Як підтримувати зв'язок під час зворотного трансферу?",
    faqTenA:
      "Щойно ви підтвердите дату й час зворотної поїздки нашій команді у WhatsApp, за кілька годин до трансферу ми призначаємо автомобіль і надсилаємо вам його фотографії у WhatsApp — за бажанням також номер телефону водія. Коли водій приїжджає до готелю, він повідомляє рецепцію, а вона передає у ваш номер, що авто подано. Наші водії ніколи не телефонують гостям напряму: усе спілкування відбувається через єдину лінію підтримки у WhatsApp, тож ви завжди точно знаєте, з ким розмовляєте.",
    faqElevenQ: "Чи можу я скасувати або змінити бронювання?",
    faqElevenA:
      "Так, і завжди безкоштовно. Ми не беремо передоплати, тож повертати нічого й чекати на гроші не доводиться — якщо плани змінилися, достатньо написати нам у WhatsApp. Зміну часу, номера рейсу чи адреси призначення оформлюємо так само, без доплат.",
    faqTwelveQ: "У якій валюті можна розрахуватися?",
    faqTwelveA:
      "Наші ціни встановлені в євро (EUR) і сплачуються готівкою; картки не приймаємо. Якщо зручніше платити в доларах США чи турецьких лірах, сума залежить від курсу на день, тому напишіть нам у WhatsApp перед трансфером: ми назвемо чітку ціну та попередимо водія — в автомобілі нічого не обговорюється.",
    faqThirteenQ: "Скільки багажу можна взяти?",
    faqThirteenA:
      "Як правило, одна велика валіза та одне місце ручної поклажі на пасажира. Якщо багажу більше — додаткова валіза, гольф-бег, візочок, лижі чи велосипед — просто зазначте це під час бронювання, і ми без доплат подамо автомобіль потрібної місткості. Головне — попередити заздалегідь. Mercedes Vito вміщує до 6 пасажирів, Sprinter — до 12.",
    faqFourteenQ: "Що робити, якщо я запізнююся на зворотний трансфер?",
    faqFourteenA:
      "Водій приїжджає до готелю в узгоджений час і чекає 15 хвилин безкоштовно. Якщо розумієте, що затримаєтеся, напишіть нам у WhatsApp: ми перевіримо час вильоту, повідомимо водія та скоригуємо план разом із вами. Наша мета — не квапити вас, а спокійно доправити на рейс.",
    faqFifteenQ: "Чи можна зробити зупинку в дорозі?",
    faqFifteenA:
      "Звісно. Якщо хочете заїхати до супермаркету чи аптеки або зупинитися для фото, скажіть про це під час бронювання або напишіть у WhatsApp — ми спланусмо маршрут із урахуванням зупинки. Якщо зупинка суттєво відхиляє від маршруту, перед виїздом повідомимо, чи додається щось до суми: жодних сюрпризів потім.",
    faqThreeQ: "Чи є дитячі крісла?",
    faqThreeA:
      "Так. Автолюльки, дитячі крісла та бустери надаються безкоштовно на запит при бронюванні.",
    faqFourQ: "Чи можна перевезти сумки для гольфу та великий багаж?",
    faqFourA:
      "Так. Sprinter і Vito ідеально підходять для груп гравців у гольф. Повідомте об'єм багажу і ми підберемо автомобіль.",
    faqFiveQ: "Вказана ціна є остаточною?",
    faqFiveA:
      "Так. Ціна, яку ви бачите під час бронювання, — це сума, яку ви передаєте водієві готівкою: за автомобіль, з усіма аеропортовими зборами, паркуванням і першими 90 хвилинами очікування. Прихованих платежів немає.",
    contactEyebrow: "Ваша подорож починається тут",
    contactTitle: "Прибудьте в Анталью<br />надзвичайно комфортно.",
    contactBody:
      "Забронюйте онлайн менш ніж за дві хвилини або зв'яжіться з нашою службою консьєржа 24/7.",
    whatsappUs: "Написати в WhatsApp",
    replyMinutes: "Зазвичай відповідаємо за кілька хвилин",
    callUs: "Зателефонувати 24/7",
    emailUs: "Написати консьєржу",
    replyHour: "Відповідь протягом години",
    fromAirport: "З аеропорту Анталії",
    perVehicle: "за автомобіль · фіксована ціна",
    footerTagline: "Приватні послуги шофера по всій Турецькій Рив'єрі.",
    explore: "Розділи",
    information: "Інформація",
    licensed:
      "Ліцензований оператор приватних трансферів · Відповідає вимогам TÜRSAB",
    quoteReady: "Ваш приватний трансфер",
    vehicle: "Автомобіль",
    journeyTime: "Час у дорозі",
    totalFixed: "Підсумкова ціна",
    quoteIncludes:
      "Включено зустріч, відстеження рейсу, паркування, 90 хвилин очікування та питну воду.",
    confirmWhatsapp: "Підтвердити в WhatsApp",
    chatWithUs: "Написати нам",
    bookNowCta: "Забронювати",
    backToQuote: "Назад",
    yourDetails: "Ваші дані",
    fullName: "Ім'я та прізвище",
    emailLabel: "Ел. пошта",
    phoneLabel: "Телефон / WhatsApp",
    flightNumber: "Номер рейсу",
    flightArrivalTime: "Час прильоту",
    notesLabel: "Особливі побажання",
    confirmBooking: "Підтвердити бронювання",
    bookingConfirmed: "Бронювання підтверджено",
    referenceLabel: "Референс",
    weWillContact:
      "Ваш запит на бронювання надіслано. Ми зв'яжемося з вами протягом 30 хвилин.",
    paymentError: "Оплата не пройшла. Спробуйте ще раз.",
  },
  ur: {
    hotelSearchHint: "اپنے ہوٹل کا نام لکھیں اور فہرست میں سے منتخب کریں؛ منزل کا علاقہ اور قیمت ہم خود بھر دیں گے۔",
    hotelNotListed: "میرا ہوٹل فہرست میں نہیں ہے",
    hotelNoMatch: "ابھی کوئی مماثلت نہیں۔ نام لکھیں اور علاقہ خود منتخب کریں۔",
    navFleet: "گاڑیاں",
    navService: "خدمات",
    navRoutes: "راستے",
    navReviews: "جائزے",
    navContact: "رابطہ",
    bookNow: "ابھی بک کریں",
    alwaysAvailable: "24 گھنٹے، ہر روز دستیاب",
    heroEyebrow: "نجی شوفر سروس · انطالیہ",
    campaignBadge: "آن لائن خصوصی",
    campaignDiscount: "خصوصی قیمت",
    campaignScope: "تمام ٹرانسفر قیمتوں پر",
    heroTitle: "انطالیہ میں پریمیم<br />ایئرپورٹ ٹرانسفر",
    heroSubtitle:
      "انطالیہ ایئرپورٹ سے بیلک، سیدے، کیمر اور الانیا تک نجی شوفر سروس۔",
    bookTransfer: "ٹرانسفر بک کریں",
    instantQuote: "فوری قیمت جانیں",
    googleRated: "گوگل ریٹڈ",
    trustedGuests: "2,500+ مسافروں کا اعتماد",
    discover: "دریافت کریں",
    tbLicensed: "TÜRSAB لائسنس یافتہ",
    tbFlightTracking: "فلائٹ ٹریکنگ",
    tbFixedPrice: "مقررہ قیمت",
    tb247Concierge: "24/7 کنسیرج",
    tbChildSeats: "بچوں کی نشستیں شامل",
    privateJourney: "آپ کا نجی سفر",
    tripType: "سفر کی قسم",
    oneWay: "ایک طرفہ",
    roundTrip: "آنا جانا",
    roundTripHint: "واپسی کا سفر اسی راستے سے ہوگا۔",
    pickup: "پک اپ",
    airportOption: "انطالیہ ایئرپورٹ (AYT)",
    hotelOption: "ہوٹل",
    privateAddressOption: "نجی پتہ",
    destination: "منزل",
    selectDestination: "منزل منتخب کریں",
    vehicle: "گاڑی",
    guests: "مسافر",
    arrivalDate: "آمد کی تاریخ",
    arrivalFlightTime: "فلائٹ آمد کا وقت",
    chooseTime: "وقت منتخب کریں",
    arrivalFlightNumber: "آمد کا فلائٹ نمبر",
    returnDate: "واپسی کی تاریخ",
    returnPickupTime: "واپسی کا پک اپ وقت",
    returnFlightNumber: "واپسی کا فلائٹ نمبر",
    pickupAddress: "پک اپ کا مکمل پتہ",
    dropoffAddress: "ڈراپ آف کا مکمل پتہ",
    luggageLabel: "بڑا سامان",
    hotelNameLabel: "ہوٹل کا نام",
    childSeatLabel: "بچوں کی نشستیں",
    childSeatNone: "کوئی بچوں کی نشست نہیں",
    oneChildSeat: "1 بچوں کی نشست",
    twoChildSeats: "2 بچوں کی نشستیں",
    threeChildSeats: "3 بچوں کی نشستیں",
    fourChildSeats: "4 بچوں کی نشستیں",
    fullName: "پورا نام",
    phoneLabel: "فون / واٹس ایپ",
    emailLabel: "ای میل",
    paymentMethod: "ادائیگی کا طریقہ منتخب کریں",
    cashPayment: "گاڑی میں ادائیگی",
    recommended: "تجویز کردہ",
    cashPaymentDescription:
      "آن لائن پیشگی ادائیگی نہیں۔ مقررہ رقم آپ سفر کے آغاز پر ڈرائیور کو نقد ادا کرتے ہیں۔",
    quoteIncludes:
      "استقبال، فلائٹ ٹریکنگ، پارکنگ، 90 منٹ انتظار اور بوتل بند پانی شامل ہے۔",
    confirmCashBooking: "بکنگ کی تصدیق کریں — گاڑی میں ادا کریں",
    flightTracking: "حقیقی وقت کی فلائٹ ٹریکنگ",
    fixedPrice: "مقررہ قیمت کی ضمانت",
    meetGreet: "ذاتی میٹ اینڈ گریٹ",
    speakingDrivers: "انگریزی اور جرمن بولنے والے",
    fromAirport: "انطالیہ ایئرپورٹ سے",
    campaignApplied: "آن لائن خصوصی قیمت لاگو ہو گئی",
    welcomeEyebrow: "ایک بہتر آمد میں خوش آمدید",
    welcomeTitle: "خوبصورتی سے سفر کریں۔<br />آسانی سے پہنچیں۔",
    welcomeBody:
      "آپ کی لینڈنگ کے لمحے سے ہر تفصیل کا خیال رکھا جاتا ہے۔ ہماری ایئرپورٹ ٹیم آپ کا استقبال کرتی ہے، آپ کا ڈرائیور پک اپ پوائنٹ پر گاڑی لے آتا ہے اور آپ کا سامان احتیاط سے تیار کی گئی نجی گاڑی میں رکھا جاتا ہے۔",
    ourStandards: "ہمارے سروس معیارات",
    concierge: "کنسیرج سپورٹ",
    guestsWelcomed: "مسافروں کا استقبال",
    guestRating: "اوسط مسافر ریٹنگ",
    privateTransfers: "نجی ٹرانسفر",
    fleetEyebrow: "گاڑیاں",
    fleetTitle: "آپ کی نجی جگہ،<br />ہر تفصیل میں بہترین۔",
    fleetIntro:
      "اپنے خاندان، گولف کا سامان اور سامان کے لیے کافی جگہ کے ساتھ پرسکون آرام سے سفر کریں۔",
    signatureFleet: "سگنیچر فلیٹ",
    fleetVclassClass: "بزنس · فرسٹ کلاس",
    fleetVclassDescription:
      "بڑے گروپوں کے لیے کشادہ VIP ٹرانسپورٹ، مسافروں اور سامان کے لیے وافر جگہ کے ساتھ۔",
    passengers: "مسافر",
    suitcases: "سوٹ کیس",
    television: "گاڑی میں ٹیلی ویژن",
    coldDrinks: "ٹھنڈے مشروبات",
    snacks: "اسنیکس",
    childSeats: "بچوں کی نشست دستیاب",
    wifi: "مجانی WiFi",
    nameSignGreeting: "کاؤنٹر J / 777 پر استقبال",
    reserveVehicle: "یہ گاڑی بک کریں",
    insideVclass: "اسپرنٹر کے اندر",
    interiorTitle: "ایئرپورٹ اور آپ کے ہوٹل کے<br />درمیان ایک نجی لاؤنج۔",
    serviceEyebrow: "انطالیہ VIP معیار",
    serviceTitle: "صرف ٹرانسفر سے بڑھ کر۔<br />ایک سوچا سمجھا خیرمقدم۔",
    serviceIntro:
      "ہوٹل جیسی توجہ، تجربہ کار مقامی شوفر اور رن وے سے ریزورٹ تک مکمل سکون۔",
    trackingTitle: "فلائٹ ٹریکنگ",
    trackingBody:
      "ہم آپ کی فلائٹ کو حقیقی وقت میں مانیٹر کرتے ہیں اور آپ کا پک اپ خودکار طور پر ایڈجسٹ کرتے ہیں، بغیر کسی اضافی چارج کے۔",
    chauffeurTitle: "پیشہ ور شوفر",
    chauffeurBody:
      "بے داغ پیش کردہ، سمجھدار اور اپنی مقامی معلومات اور سروس معیارات کے لیے منتخب۔",
    greetTitle: "میٹ اینڈ گریٹ",
    greetBody:
      "بین الاقوامی آمد پر ہماری ایئرپورٹ ٹیم آپ کو کاؤنٹر J / 777 پر ملتی ہے، ڈرائیور کو پک اپ پوائنٹ پر بلاتی ہے اور سامان میں مدد کرتی ہے۔",
    supportTitle: "24/7 کنسیرج",
    supportBody:
      "آپ کے سفر سے پہلے، دوران اور بعد میں ایک حقیقی شخص فون یا واٹس ایپ پر ہمیشہ دستیاب ہے۔",
    priceTitle: "مقررہ قیمتیں",
    priceBody:
      "تصدیق شدہ قیمت وہی ہے جو آپ ادا کرتے ہیں۔ انتظار کا وقت، پارکنگ اور فلائٹ میں تاخیر شامل ہے۔",
    familyTitle: "خاندان کے لیے تیار",
    familyBody:
      "عمر کے مطابق بچوں کی نشستیں، کشادہ کیبن اور پرسکون خاندانی آمد کے لیے صبر مند مدد۔",
    routesEyebrow: "ہمارے سب سے مطلوب سفر",
    routesTitle: "انطالیہ ایئرپورٹ سے<br />ترکی ریویرا تک۔",
    routesIntro:
      "تمام قیمتیں فی گاڑی ہیں، فی مسافر نہیں، اور ان میں 90 منٹ کا انتظار شامل ہے۔",
    discountPricesShown: "آن لائن خصوصی قیمتیں دکھائی جا رہی ہیں",
    golfFavourite: "گولف کا پسندیدہ",
    onlineDiscountShort: "آن لائن خصوصی قیمت",
    reviewsEyebrow: "مسافروں کے جائزے",
    reviewsTitle: "آمد کے بعد بھی یاد رہنے<br />والی سروس۔",
    googleReviews: "387 تصدیق شدہ گوگل جائزوں پر مبنی",
    trustedBy: "انطالیہ کے معروف ریزورٹس کے مسافروں کا اعتماد",
    faqEyebrow: "اکثر پوچھے گئے سوالات",
    faqTitle: "سفر سے پہلے۔",
    faqCatArrival: "آمد اور ٹرانسفر",
    faqCatJourney: "واپسی اور سفر",
    faqCatPayment: "ادائیگی اور قیمت",
    faqCatVehicle: "گاڑی اور سامان",
    faqReminder: "اپنے سفر سے پہلے براہِ کرم ہماری ویب سائٹ کا FAQ سیکشن ملاحظہ کریں۔",
    viewFaq: "FAQ دیکھیں",
    faqIntro:
      "اپنے نجی انطالیہ ایئرپورٹ ٹرانسفر کے بارے میں آپ کو جو کچھ جاننا ضروری ہے۔",
    askQuestion: "ہم سے سوال پوچھیں",
    faqOneQ: "اگر میری پرواز میں تاخیر ہو جائے تو کیا ہوگا؟",
    faqOneA:
      "آپ کو کچھ کرنے کی ضرورت نہیں۔ ہم آپ کی پرواز کو حقیقی وقت میں ٹریک کرتے ہیں اور پک اپ کا وقت خودکار طور پر ایڈجسٹ کر دیتے ہیں۔ ایئر لائن کی وجہ سے ہونے والی تاخیر پر کبھی کوئی اضافی چارج نہیں لیا جاتا — آپ جب بھی لینڈ کریں، آپ کا ڈرائیور موجود ہوگا، اور لینڈنگ کے بعد پہلے 90 منٹ ہمیشہ قیمت میں شامل ہیں۔",
    faqTwoQ: "میں بین الاقوامی پرواز سے آ رہا ہوں، استقبال کیسے ہوتا ہے؟",
    faqTwoA:
      "پاسپورٹ کنٹرول اور سامان وصول کرنے کے بعد دیگر مسافروں کے ساتھ Meet & Greet ایریا کی طرف بڑھیں اور ہمارے کاؤنٹر J / 777 پر آئیں۔ ہمارے عملے کو صرف اپنا نام بتائیں — کم رش کے اوقات میں آپ کو اپنے نام کا سائن بورڈ بھی نظر آئے گا، جبکہ مصروف اوقات میں نام بتانا ہی کافی ہے۔ ہماری ٹیم فوراً آپ کے ڈرائیور کو اطلاع دیتی ہے؛ وہ ایئرپورٹ میں داخل ہو کر پک اپ پوائنٹ پر گاڑی لے آتا ہے اور اسی دوران ہمارا عملہ آپ کو گاڑی تک پہنچاتا ہے۔ پورا عمل تقریباً 7 سے 8 منٹ لیتا ہے۔",
    faqSixQ:
      "میں ملکی (ڈومیسٹک) پرواز سے آ رہا ہوں، اپنے ڈرائیور کو کہاں تلاش کروں؟",
    faqSixA:
      "Meet & Greet ایریا صرف بین الاقوامی آمد کے لیے ہے، اس لیے ڈومیسٹک مہمانوں کا انتظام مختلف ہے: ہم ٹرانسفر سے پہلے آپ کو ڈرائیور کا فون نمبر بھیج دیتے ہیں۔ لینڈ کرنے کے بعد انہیں مختصر اطلاع دیں — وہ آپ کو ارائیول ہال سے وصول کریں گے۔",
    faqSevenQ: "اگر کاؤنٹر J / 777 پر کوئی موجود نہ ہو تو کیا کروں؟",
    faqSevenA:
      "ہمارے کاؤنٹر پر مستقل طور پر دو اہلکار موجود رہتے ہیں اور ان کا واحد کام آنے والے مہمانوں کو ان کی گاڑی تک پہنچانا ہے۔ اگر کاؤنٹر لمحہ بھر کے لیے خالی ملے تو اس کا مطلب ہے کہ ساتھی اہلکار آپ سے پہلے آنے والے مہمان کو گاڑی تک لے گیا ہے — ہر مہمان کو پہنچانے میں تقریباً 7 سے 8 منٹ لگتے ہیں۔ براہِ کرم تقریباً 10 منٹ انتظار کریں۔ اگر اس دوران بھی کوئی واپس نہ آئے تو ہمیں WhatsApp پر پیغام دیں: ہم فوراً آپ کے ڈرائیور کو اطلاع دیں گے، اسے قریب ترین مقام پر کھڑا کروائیں گے اور آپ کو مزید انتظار کے بغیر سیدھا گاڑی تک پہنچا دیں گے۔",
    faqEightQ:
      "اگر مجھے ایئرپورٹ سے نکلنے میں 90 منٹ سے زیادہ لگ جائیں تو کیا ہوگا؟",
    faqEightA:
      "طیارے کی لینڈنگ کے بعد پہلے 90 منٹ مفت شامل ہیں — پاسپورٹ کنٹرول، سامان اور کسٹم کے لیے یہ وقت بخوبی کافی ہے، اور پرواز میں تاخیر کی صورت میں یہ دورانیہ خودکار طور پر آگے کھسک جاتا ہے۔ صرف اس صورت میں جب پرواز سے غیر متعلق کوئی وجہ آپ کو ٹرمینل میں زیادہ دیر روکے، ہر اضافی گھنٹے کے لیے 5 یورو پارکنگ چارج شامل کیا جاتا ہے۔ عملی طور پر ایسا تقریباً کبھی نہیں ہوتا؛ ہمارے تقریباً تمام مہمان اس سے کہیں پہلے روانہ ہو چکے ہوتے ہیں۔",
    faqNineQ: "ادائیگی کیسے کی جاتی ہے؟",
    faqNineA:
      "آپ سفر کے آغاز پر اپنے ڈرائیور کو نقد ادائیگی کرتے ہیں — ہم کارڈ قبول نہیں کرتے۔ قیمتیں یورو (EUR) میں مقرر ہیں: مقررہ رقم بالکل وہی ہے جو بکنگ کے وقت آپ نے دیکھی تھی — فی گاڑی، تمام ایئرپورٹ اور پارکنگ فیس سمیت، بعد میں کچھ شامل نہیں ہوتا۔ اگر آپ امریکی ڈالر یا ترک لیرا میں ادائیگی کرنا چاہیں تو پہلے سے WhatsApp پر ہمیں پیغام بھیجیں تاکہ الگ قیمت دی جا سکے، کیونکہ شرحِ تبادلہ مختلف ہوتی ہے۔ آپ کا ڈرائیور آپ کا استقبال کرتا ہے، سامان گاڑی میں رکھتا ہے اور درخواست کردہ چائلڈ سیٹس لگاتا ہے؛ ادائیگی کے بعد آپ کا سفر شروع ہو جاتا ہے۔",
    faqTenQ: "واپسی کے ٹرانسفر کے لیے رابطہ کیسے رہے گا؟",
    faqTenA:
      "جب آپ WhatsApp پر ہماری ٹیم کے ساتھ واپسی کی تاریخ اور وقت کی تصدیق کر دیتے ہیں، تو ہم ٹرانسفر سے چند گھنٹے پہلے آپ کی گاڑی مقرر کرتے ہیں اور WhatsApp پر اس کی تصاویر بھیجتے ہیں — آپ چاہیں تو ڈرائیور کا فون نمبر بھی۔ ڈرائیور ہوٹل پہنچ کر استقبالیہ کو اطلاع دیتا ہے، اور استقبالیہ آپ کے کمرے میں بتا دیتا ہے کہ گاڑی تیار ہے۔ ہمارے ڈرائیور مہمانوں کو براہِ راست فون نہیں کرتے: تمام رابطہ ہماری واحد WhatsApp سپورٹ لائن کے ذریعے ہوتا ہے، تاکہ آپ کو ہمیشہ معلوم ہو کہ آپ کس سے بات کر رہے ہیں۔",
    faqElevenQ: "کیا میں اپنی بکنگ منسوخ یا تبدیل کر سکتا ہوں؟",
    faqElevenA:
      "جی ہاں، اور ہمیشہ مفت۔ چونکہ ہم پیشگی ادائیگی نہیں لیتے، اس لیے واپس کرنے کو کچھ نہیں ہوتا اور رقم کی واپسی کا انتظار بھی نہیں کرنا پڑتا — منصوبہ بدل جائے تو WhatsApp پر ایک پیغام کافی ہے۔ وقت، فلائٹ نمبر یا منزل کے پتے کی تبدیلی بھی اسی طرح، بغیر کسی اضافی چارج کے کر دی جاتی ہے۔",
    faqTwelveQ: "میں کس کرنسی میں ادائیگی کر سکتا ہوں؟",
    faqTwelveA:
      "ہماری قیمتیں یورو (EUR) میں مقرر ہیں اور ادائیگی نقد ہوتی ہے؛ کارڈ قبول نہیں کیے جاتے۔ اگر آپ امریکی ڈالر یا ترک لیرا میں ادائیگی کرنا چاہیں تو رقم اُس دن کے ریٹ پر منحصر ہوگی، اس لیے ٹرانسفر سے پہلے ہمیں WhatsApp پر پیغام دیں۔ ہم آپ کو واضح قیمت بتا دیں گے اور ڈرائیور کو بھی مطلع کر دیں گے — گاڑی میں کوئی بات چیت نہیں ہوتی۔",
    faqThirteenQ: "میں کتنا سامان لا سکتا ہوں؟",
    faqThirteenA:
      "عام اصول یہ ہے کہ فی مسافر ایک بڑا سوٹ کیس اور ایک ہینڈ بیگ۔ اگر اس سے زیادہ ہو — اضافی سوٹ کیس، گولف بیگ، بچوں کی پرام، اسکیز یا سائیکل — تو بکنگ کے وقت بتا دیں؛ ہم بغیر اضافی چارج کے مناسب گنجائش والی گاڑی مقرر کر دیں گے۔ اہم صرف یہ ہے کہ ہمیں پہلے سے علم ہو۔ مرسیڈیز ویٹو 6 مسافروں تک اور سپرنٹر 12 مسافروں تک لے جاتی ہے۔",
    faqFourteenQ: "اگر میں واپسی کے ٹرانسفر کے لیے دیر کر دوں تو کیا ہوگا؟",
    faqFourteenA:
      "آپ کا ڈرائیور مقررہ وقت پر ہوٹل پہنچ جاتا ہے اور 15 منٹ مفت انتظار کرتا ہے۔ اگر آپ کو تاخیر کا اندازہ ہو تو WhatsApp پر ایک پیغام کافی ہے: ہم آپ کی پرواز کا وقت دیکھتے ہیں، ڈرائیور کو بتاتے ہیں اور آپ کے ساتھ مل کر پروگرام ترتیب دیتے ہیں۔ ہمارا مقصد آپ کو جلدی میں ڈالنا نہیں بلکہ آرام سے آپ کی پرواز تک پہنچانا ہے۔",
    faqFifteenQ: "کیا سفر کے دوران اضافی اسٹاپ ممکن ہے؟",
    faqFifteenA:
      "بالکل ممکن ہے۔ اگر آپ راستے میں سپر مارکیٹ یا فارمیسی پر رکنا چاہیں یا تصویر کے لیے مختصر وقفہ لینا چاہیں تو بکنگ کے وقت یا WhatsApp پر بتا دیں — ہم راستہ اسی حساب سے ترتیب دیں گے۔ اگر اسٹاپ آپ کے راستے سے نمایاں طور پر دور لے جائے تو روانگی سے پہلے واضح کر دیتے ہیں کہ کوئی اضافی رقم ہوگی یا نہیں؛ بعد میں کچھ بھی شامل نہیں کیا جاتا۔",
    faqThreeQ: "کیا بچوں کی نشستیں دستیاب ہیں؟",
    faqThreeA:
      "ہاں۔ بکنگ کے وقت درخواست کرنے پر شیر خوار، چھوٹے بچوں اور بوسٹر نشستیں مجانی دستیاب ہیں۔",
    faqFourQ: "کیا آپ گولف بیگ اور بڑا سامان لے جا سکتے ہیں؟",
    faqFourA:
      "ہاں۔ ہماری اسپرنٹر اور ویٹو گاڑیاں گولف گروپوں کے لیے موزوں ہیں۔ ہمیں اپنے سامان کی تفصیلات بتائیں اور ہم صحیح گاڑی مختص کریں گے۔",
    faqFiveQ: "کیا دی گئی قیمت حتمی ہے؟",
    faqFiveA:
      "جی ہاں۔ بکنگ کے وقت نظر آنے والی قیمت ہی وہ رقم ہے جو آپ ڈرائیور کو نقد دیتے ہیں — فی گاڑی، تمام ایئرپورٹ فیس، پارکنگ اور لینڈنگ کے بعد پہلے 90 منٹ کے انتظار سمیت۔ کوئی پوشیدہ چارجز نہیں۔",
    contactEyebrow: "آپ کا سفر یہاں سے شروع ہوتا ہے",
    contactTitle: "انطالیہ میں<br />شاندار طریقے سے پہنچیں۔",
    contactBody:
      "دو منٹ سے کم میں آن لائن بک کریں یا ہماری 24/7 کنسیرج ٹیم سے براہ راست بات کریں۔",
    whatsappUs: "واٹس ایپ کریں",
    replyMinutes: "عام طور پر منٹوں میں جواب دیتے ہیں",
    callUs: "24/7 کال کریں",
    emailUs: "کنسیرج کو ای میل کریں",
    replyHour: "ایک گھنٹے کے اندر جواب دیتے ہیں",
    footerTagline: "ترکی ریویرا میں نجی شوفر خدمات۔",
    explore: "دریافت کریں",
    information: "معلومات",
    licensed: "لائسنس یافتہ نجی ٹرانسفر آپریٹر · TÜRSAB تعمیل",
    bookingConfirmed: "بکنگ کی تصدیق ہو گئی",
    referenceLabel: "حوالہ",
    weWillContact:
      "آپ کی بکنگ کی درخواست بھیج دی گئی۔ ہم 30 منٹ کے اندر آپ سے رابطہ کریں گے۔",
    chatWithUs: "ہم سے چیٹ کریں",
    pickupAddressPlaceholder: "ہوٹل کا نام، گلی، عمارت نمبر اور علاقہ",
    dropoffAddressPlaceholder: "ہوٹل کا نام، گلی، عمارت نمبر اور علاقہ",
    hotelNamePlaceholder: "ہوٹل یا رہائش کا نام",
    requestQuote: "قیمت کا اندازہ لگائیں",
    cashConfirmation:
      "آپ کی بکنگ کی تصدیق ہو گئی۔ مقررہ کل رقم آپ سفر کے آغاز پر ڈرائیور کو نقد ادا کریں گے۔",
    bookingError: "آپ کی بکنگ مکمل نہیں ہو سکی۔ براہ کرم دوبارہ کوشش کریں۔",
    formIncomplete: "براہ کرم نمایاں شدہ خانے مکمل کریں۔",
    requiredField: "یہ خانہ ضروری ہے۔",
    destinationRequired: "براہ کرم ایک منزل منتخب کریں۔",
    dateInvalid: "براہ کرم آج یا مستقبل کی تاریخ منتخب کریں۔",
    emailInvalid: "براہ کرم ایک درست ای میل پتہ درج کریں۔",
    nameInvalid: "براہ کرم ایک درست پورا نام درج کریں۔",
    phoneInvalid:
      "براہ کرم ملک کوڈ کے ساتھ ایک درست نمبر درج کریں (مثال کے طور پر +92)۔",
    flightInvalid: "براہ کرم ایک درست فلائٹ نمبر درج کریں۔",
    pickupAddressRequired: "پک اپ کا پتہ 6 سے 160 حروف کے درمیان ہونا چاہیے۔",
    dropoffAddressRequired:
      "ڈراپ آف کا پتہ 6 سے 160 حروف کے درمیان ہونا چاہیے۔",
    addressesMustDiffer: "پک اپ اور ڈراپ آف کے پتے مختلف ہونے چاہئیں۔",
    customDestinationPrice:
      "ڈراپ آف پتہ جانچنے کے بعد قیمت کی تصدیق کی جائے گی۔",
    hotelNameRequired: "براہ کرم ہوٹل کا نام درج کریں۔",
    roundTripPriceNote: "آنا جانا · 2 سفر",
    returnDateRequired: "براہ کرم واپسی کی تاریخ منتخب کریں۔",
    returnDateInvalid:
      "براہ کرم جانے کے سفر پر یا اس کے بعد کی واپسی کی تاریخ منتخب کریں۔",
    returnTimeRequired: "براہ کرم واپسی کا پک اپ وقت منتخب کریں۔",
    dailyChauffeur: "روزانہ گاڑی + شوفر",
    days: "دن",
    dailyChauffeurHint:
      "بغیر کلومیٹر یا گھنٹے کی حد کے روزانہ کی بنیاد پر نجی گاڑی اور شوفر کرایہ پر لیں۔ ایندھن الگ ادا کیا جاتا ہے۔",
    serviceStartDate: "پہلی سروس کا دن",
    serviceEndDate: "آخری سروس کا دن",
    dailyPickupTime: "سروس شروع ہونے کا وقت",
    dailyPickupTimeRequired:
      "براہ کرم روزانہ سروس شروع ہونے کا وقت منتخب کریں۔",
    serviceEndDateRequired: "براہ کرم آخری سروس کا دن منتخب کریں۔",
    servicePeriodInvalid: "براہ کرم 1 سے 30 دن کے درمیان مدت منتخب کریں۔",
    arrivalFlightTimeOptional: "آمد کا فلائٹ وقت (اختیاری)",
    arrivalFlightNumberOptional: "آمد کا فلائٹ نمبر (اختیاری)",
    servicePrice: "سروس قیمت",
    fuelExcludedShort: "ایندھن شامل نہیں",
    fuelExcludedDetail:
      "ایندھن شامل نہیں ہے اور استعمال کے مطابق الگ ادا کیا جاتا ہے۔",
    departureFlightDate: "روانگی کی فلائٹ کی تاریخ",
    departureFlightTime: "روانگی کی فلائٹ کا وقت",
    departureFlightNumber: "روانگی کا فلائٹ نمبر",
    departureFlightDateRequired:
      "براہ کرم روانگی کی فلائٹ کی تاریخ منتخب کریں۔",
    departureFlightDateInvalid: "براہ کرم آج یا مستقبل کی تاریخ منتخب کریں۔",
    dailyQuoteIncludes:
      "بغیر کلومیٹر یا گھنٹے کی حد کے روزانہ شوفر سروس شامل ہے۔ ایندھن الگ ادا کیا جاتا ہے۔",
    reviewAndConfirm: "جائزہ لیں اور تصدیق کریں",
    fuelTermsTitle: "ایندھن کی شرائط",
    fuelTermsBody:
      "روزانہ شوفر سروس کے لیے، ایندھن کی لاگت شامل نہیں ہے۔ آپ ڈرائیور کو براہ راست استعمال شدہ ایندھن کی ادائیگی کریں گے۔",
    fuelTermsCheckbox: "میں سمجھتا/سمجھتی ہوں کہ ایندھن الگ ادا کیا جائے گا",
    cancel: "منسوخ کریں",
    close: "بند کریں",
    understandAndConfirm: "سمجھ گیا، تصدیق کریں",
    dailyCashConfirmation:
      "آپ کی روزانہ شوفر سروس کی بکنگ کی تصدیق ہو گئی۔ ہر دن کے اختتام پر اپنے ڈرائیور کو ادا کریں۔",
    quoteTitle: "آپ کا کوٹ",
    date: "تاریخ",
    airportReturnPrice: "ایئرپورٹ واپسی قیمت",
    oneGuest: "1 مسافر",
    twoGuests: "2 مسافر",
    threeGuests: "3 مسافر",
    fourGuests: "4 مسافر",
    fiveGuests: "5 مسافر",
    sixGuests: "6 مسافر",
    sevenGuests: "7 مسافر",
    viewQuote: "کوٹ دیکھیں",
    fleetVitoClass: "پریمیم · VIP",
    fleetVitoDescription:
      "چھوٹے گروپوں کے لیے ایگزیکٹو VIP ٹرانسپورٹ، کشادہ اندرونی حصے اور پریمیم آرام کے ساتھ۔",
    capacitySwitchedSprinter:
      "8 یا اس سے زیادہ مسافروں کے لیے اسپرنٹر خودکار طور پر منتخب ہو گیا",
    capacityNoVehicle: "موجودہ مسافروں کے لیے کوئی گاڑی دستیاب نہیں",
    leatherSeats: "چمڑے کی نشستیں",
    water: "پانی",
    from: "سے",
    reviewOne:
      "ویٹو ڈرائیور وقت پر تھے، بہترین گاڑی، ہر چیز بہت اچھی طرح منظم تھی۔",
    reviewTwo:
      "شاندار سروس! ڈرائیور وقت پر تھا، گاڑی بالکل صاف تھی، اور سفر بہت آرام دہ تھا۔",
    reviewThree:
      "بہترین ٹرانسفر سروس جو ہم نے انطالیہ میں استعمال کی ہے۔ انتہائی پیشہ ورانہ اور قابل اعتماد۔",
    perVehicle: "فی گاڑی",
    quoteReady: "آپ کا کوٹ تیار ہے",
    journeyTime: "سفر کا وقت",
    totalFixed: "کل مقررہ",
    confirmWhatsapp: "واٹس ایپ سے تصدیق کریں",
    bookNowCta: "ابھی بک کریں",
    backToQuote: "کوٹ پر واپس جائیں",
    yourDetails: "آپ کی تفصیلات",
    flightNumber: "فلائٹ نمبر",
    flightArrivalTime: "فلائٹ آمد کا وقت",
    notesLabel: "نوٹس",
    confirmBooking: "بکنگ کی تصدیق کریں",
    paymentError: "ادائیگی کی خرابی۔ براہ کرم دوبارہ کوشش کریں۔",
    stepRoute: "راستہ",
    stepDetails: "تفصیلات",
    stepContact: "رابطہ",
    continue: "جاری رکھیں",
    back: "پیچھے",
    reserveForPrice: "بک کریں",
    perVehicleNote: "فی گاڑی — فی شخص نہیں · زیادہ سے زیادہ 6 مسافر",
    perVehicleNoteVito: "فی گاڑی — فی شخص نہیں · زیادہ سے زیادہ 6 مسافر",
    perVehicleNoteSprinter: "فی گاڑی — فی شخص نہیں · زیادہ سے زیادہ 12 مسافر",
  },
  fr: {
    navFleet: "Véhicules",
    navService: "Service",
    navRoutes: "Itinéraires",
    navReviews: "Avis",
    navContact: "Contact",
    bookNow: "Réserver",
    alwaysAvailable: "Disponible 24h/24, 7j/7",
    heroEyebrow: "Service chauffeur privé · Antalya",
    heroTitle: "Transferts aéroport premium<br />à Antalya",
    heroSubtitle:
      "Transferts privés avec chauffeur depuis l'aéroport d'Antalya vers Belek, Side, Kemer et Alanya.",
    bookTransfer: "Réserver un transfert",
    instantQuote: "Obtenir un devis",
    googleRated: "Note Google",
    trustedGuests: "Approuvé par plus de 2 500 clients",
    discover: "Découvrir",
    privateJourney: "Votre voyage privé",
    quoteTitle: "Où souhaitez-vous aller ?",
    pickup: "Lieu de prise en charge",
    destination: "Destination",
    date: "Date",
    guests: "Passagers",
    airportOption: "Aéroport d’Antalya (AYT)",
    hotelOption: "Hôtel",
    privateAddressOption: "Adresse privée",
    pickupAddress: "Adresse complète de prise en charge",
    pickupAddressPlaceholder: "Nom de l'hôtel, rue, numéro et quartier",
    dropoffAddress: "Adresse complète de destination",
    dropoffAddressPlaceholder: "Nom de l'hôtel, rue, numéro et quartier",
    selectDestination: "Choisir une destination",
    airportReturnPrice:
      "Le prix sera confirmé après vérification de l’hôtel ou de l’adresse de prise en charge.",
    oneGuest: "1 passager",
    twoGuests: "2 passagers",
    threeGuests: "3 passagers",
    fourGuests: "4 passagers",
    fiveGuests: "5 passagers",
    sixGuests: "6 passagers",
    sevenGuests: "7 passagers",
    viewQuote: "Voir le tarif",
    flightTracking: "Suivi de vol en temps réel",
    fixedPrice: "Prix fixe garanti",
    meetGreet: "Accueil personnalisé",
    speakingDrivers: "Chauffeurs parlant anglais et allemand",
    tbLicensed: "Agréé TÜRSAB",
    tbFlightTracking: "Suivi de vol",
    tbFixedPrice: "Prix fixe",
    tb247Concierge: "Conciergerie 24/7",
    tbChildSeats: "Sièges enfants inclus",
    welcomeEyebrow: "Bienvenue au plus haut niveau",
    welcomeTitle: "Voyager avec élégance.<br />Arriver sereinement.",
    welcomeBody:
      "Dès l'atterrissage, chaque détail est pensé. Notre équipe de l'aéroport vous accueille, votre chauffeur se présente au point de prise en charge et vos bagages sont chargés dans un véhicule privé soigneusement préparé.",
    ourStandards: "Nos standards de service",
    concierge: "Service conciergerie",
    guestsWelcomed: "Clients accueillis",
    guestRating: "Note moyenne des clients",
    privateTransfers: "Transferts privés",
    fleetEyebrow: "Notre flotte",
    fleetTitle: "Votre espace privé,<br />parfait dans les moindres détails.",
    fleetIntro:
      "Voyagez confortablement avec suffisamment d'espace pour la famille, les équipements de golf et les valises.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "La référence des voyages de groupe raffinés : spacieux, exceptionnellement silencieux et équipé pour une arrivée sans tracas.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "Un vaste habitacle privé pour les grandes familles, les groupes de golf et les voyageurs avec beaucoup de bagages.",
    signatureFleet: "Flotte Signature",
    passengers: "passagers",
    suitcases: "valises",
    luggageLabel: "Gros bagages",
    capacitySwitchedSprinter:
      "Passagers et bagages dépassent le Vito — passage au Mercedes Sprinter.",
    capacityNoVehicle:
      "Autant de passagers et de bagages dépasse nos véhicules. Contactez-nous sur WhatsApp.",
    leatherSeats: "Sièges en cuir premium",
    wifi: "WiFi gratuit",
    water: "Eau minérale fraîche",
    childSeats: "Sièges enfants sur demande",
    television: "Télévision à bord",
    coldDrinks: "Boissons fraîches",
    snacks: "En-cas",
    nameSignGreeting: "Accueil au comptoir J / 777",
    reserveVehicle: "Réserver ce véhicule",
    insideVclass: "Intérieur Sprinter",
    interiorTitle: "Un salon privé<br />entre l'aéroport et l'hôtel.",
    serviceEyebrow: "La norme Antalya VIP",
    serviceTitle: "Plus qu'un transfert.<br />Un accueil d'exception.",
    serviceIntro:
      "Une attention digne d'un hôtel cinq étoiles, des chauffeurs locaux expérimentés et une tranquillité absolue de l'aéroport jusqu'au resort.",
    trackingTitle: "Suivi de vol",
    trackingBody:
      "Nous suivons votre vol en temps réel et ajustons automatiquement l'heure de prise en charge, sans frais supplémentaires.",
    chauffeurTitle: "Chauffeurs professionnels",
    chauffeurBody:
      "Toujours soignés, discrets et sélectionnés pour leur connaissance locale et leurs standards de service irréprochables.",
    greetTitle: "Accueil Meet & Greet",
    greetBody:
      "Pour les arrivées internationales, notre équipe vous accueille au comptoir J / 777, appelle votre chauffeur au point de prise en charge et vous aide avec vos bagages.",
    supportTitle: "Conciergerie 24/7",
    supportBody:
      "Avant, pendant et après votre voyage, une personne est toujours disponible par téléphone ou WhatsApp.",
    priceTitle: "Prix fixes",
    priceBody:
      "Le prix confirmé est le prix définitif. L'attente, le parking et les retards de vol sont inclus.",
    familyTitle: "Pour les familles",
    familyBody:
      "Sièges enfants adaptés, habitacles spacieux et aide patiente pour une arrivée familiale sereine.",
    routesEyebrow: "Nos trajets les plus populaires",
    routesTitle: "De l'aéroport d'Antalya<br />vers la Riviera turque.",
    routesIntro:
      "Tous les prix s'entendent par véhicule, jamais par passager, avec 90 minutes d'attente incluses.",
    golfFavourite: "Favori des golfeurs",
    from: "À partir de",
    reviewsEyebrow: "Avis clients",
    reviewsTitle: "Un service dont on<br />se souvient longtemps.",
    googleReviews: "Basé sur 387 avis Google vérifiés",
    reviewOne:
      "« Notre chauffeur a attendu malgré 90 minutes de retard. Le véhicule était impeccable, agréablement frais et déjà équipé des deux sièges enfants. Exactement l'accueil dont notre famille avait besoin. »",
    reviewTwo:
      "« Du premier contact WhatsApp à notre arrivée à Belek, absolument irréprochable. Ponctuel, discret et très professionnel. Nos sacs de golf ont aussi tenu sans problème. »",
    reviewThree:
      "« C'était comme un service de chauffeur d'hôtel, pas un taxi d'aéroport. Communication claire, véhicule impeccable et chauffeur sincèrement courtois. »",
    trustedBy: "Recommandé par les clients des meilleurs resorts d'Antalya",
    faqEyebrow: "Questions fréquentes",
    faqTitle: "Avant votre voyage.",
    faqCatArrival: "Arrivée & transfert",
    faqCatJourney: "Retour & trajet",
    faqCatPayment: "Paiement & prix",
    faqCatVehicle: "Véhicule & bagages",
    faqReminder: "Avant votre voyage, veuillez consulter la section FAQ de notre site.",
    viewFaq: "Voir la FAQ",
    faqIntro:
      "Tout ce que vous devez savoir sur votre transfert privé depuis l'aéroport d'Antalya.",
    askQuestion: "Poser une question",
    faqOneQ: "Que se passe-t-il en cas de retard de vol ?",
    faqOneA:
      "Vous n'avez rien à faire. Nous suivons votre vol en temps réel et ajustons automatiquement l'heure de prise en charge. Les retards imputables à la compagnie aérienne ne sont jamais facturés : votre chauffeur est présent quelle que soit l'heure d'atterrissage, et les 90 premières minutes après l'atterrissage sont toujours comprises.",
    faqTwoQ:
      "J'arrive sur un vol international. Comment se déroule l'accueil ?",
    faqTwoA:
      "Après le contrôle des passeports et la récupération des bagages, suivez les autres passagers jusqu'à la zone Meet & Greet et présentez-vous à notre comptoir J / 777. Il suffit d'indiquer votre nom à notre personnel : aux heures calmes, vous verrez également votre panonceau nominatif, et aux heures de pointe, votre nom suffit. Notre équipe prévient immédiatement votre chauffeur ; il entre dans l'aéroport et se place au point de prise en charge pendant que notre personnel vous accompagne jusqu'au véhicule. L'ensemble prend environ 7 à 8 minutes.",
    faqSixQ: "J'arrive sur un vol intérieur. Où trouver mon chauffeur ?",
    faqSixA:
      "La zone Meet & Greet est réservée aux arrivées internationales ; les clients des vols intérieurs sont donc accueillis différemment : nous vous transmettons le numéro de téléphone de votre chauffeur avant le transfert. Prévenez-le simplement après l'atterrissage, il vous retrouvera dans le hall des arrivées.",
    faqSevenQ: "Que faire si personne ne se trouve au comptoir J / 777 ?",
    faqSevenA:
      "Deux membres de notre équipe sont en permanence au comptoir et leur seule mission est d'accompagner les clients jusqu'à leur véhicule. Si vous trouvez le comptoir momentanément vide, c'est qu'un collègue accompagne le client arrivé juste avant vous : chaque accompagnement dure environ 7 à 8 minutes. Patientez environ 10 minutes. Si personne n'est revenu d'ici là, écrivez-nous sur WhatsApp : nous prévenons immédiatement votre chauffeur, le faisons stationner au point le plus proche et vous guidons directement vers votre voiture, sans attente supplémentaire.",
    faqEightQ:
      "Que se passe-t-il s'il me faut plus de 90 minutes pour sortir de l'aéroport ?",
    faqEightA:
      "Les 90 premières minutes après l'atterrissage sont incluses sans frais — largement plus que ne demandent le contrôle des passeports, les bagages et la douane — et ce délai se décale automatiquement en cas de retard de vol. Ce n'est que si un motif sans lien avec votre vol vous retient plus longtemps dans le terminal qu'une participation au stationnement de 5 € par heure supplémentaire s'ajoute. Dans les faits, cela n'arrive pour ainsi dire jamais : la quasi-totalité de nos clients est sur la route bien avant.",
    faqNineQ: "Comment se déroule le paiement ?",
    faqNineA:
      "Vous réglez votre chauffeur en espèces au début du trajet – nous n'acceptons pas les cartes. Les prix sont fixés en euros (EUR) : le montant fixe correspond exactement à celui affiché lors de la réservation – par véhicule, tous frais d'aéroport et de stationnement compris, sans supplément ultérieur. Vous préférez payer en dollars américains ou en livres turques ? Écrivez-nous au préalable sur WhatsApp pour obtenir un tarif distinct, car le taux de change diffère. Votre chauffeur vous accueille, charge vos bagages et installe les sièges enfant demandés ; une fois le paiement réglé, votre trajet commence.",
    faqTenQ: "Comment rester en contact pour le transfert retour ?",
    faqTenA:
      "Une fois la date et l'heure de votre retour confirmées avec notre équipe sur WhatsApp, nous attribuons votre véhicule quelques heures avant le transfert et vous en envoyons les photos sur WhatsApp — ainsi que le numéro de votre chauffeur si vous le souhaitez. À son arrivée à l'hôtel, votre chauffeur prévient la réception, qui informe votre chambre que la voiture est prête. Nos chauffeurs n'appellent jamais directement les clients : tous les échanges passent par notre ligne d'assistance WhatsApp unique, afin que vous sachiez toujours exactement à qui vous parlez.",
    faqElevenQ: "Puis-je annuler ou modifier ma réservation ?",
    faqElevenA:
      "Oui, et toujours gratuitement. Comme nous ne prenons aucun prépaiement, il n'y a rien à rembourser ni d'attente pour récupérer votre argent : si vos plans changent, un message sur WhatsApp suffit. Un changement d'horaire, de numéro de vol ou d'adresse se règle de la même façon, sans frais.",
    faqTwelveQ: "Dans quelle devise puis-je payer ?",
    faqTwelveA:
      "Nos prix sont fixés en euros (EUR) et réglés en espèces ; les cartes ne sont pas acceptées. Si vous préférez payer en dollars américains ou en livres turques, le montant dépend du cours du jour : écrivez-nous sur WhatsApp avant votre transfert. Nous vous confirmons un prix clair et prévenons votre chauffeur, afin que rien ne se négocie dans la voiture.",
    faqThirteenQ: "Quelle quantité de bagages puis-je emporter ?",
    faqThirteenA:
      "En règle générale, une grande valise et un bagage à main par passager. Si vous avez davantage — une valise supplémentaire, un sac de golf, une poussette, des skis ou un vélo — indiquez-le lors de la réservation : nous prévoyons sans supplément un véhicule à la capacité adaptée. L'essentiel est simplement que nous le sachions à l'avance. Un Mercedes Vito accueille jusqu'à 6 passagers et un Sprinter jusqu'à 12.",
    faqFourteenQ:
      "Que se passe-t-il si je suis en retard pour mon transfert retour ?",
    faqFourteenA:
      "Votre chauffeur se présente à l'hôtel à l'heure convenue et attend 15 minutes sans frais. Si vous prévoyez du retard, un message sur WhatsApp suffit : nous vérifions l'heure de votre vol, prévenons votre chauffeur et ajustons le programme avec vous. Notre objectif n'est pas de vous presser, mais de vous conduire sereinement à votre vol.",
    faqFifteenQ: "Puis-je demander un arrêt pendant le trajet ?",
    faqFifteenA:
      "Bien sûr. Si vous souhaitez vous arrêter à un supermarché ou à une pharmacie, ou faire une courte pause photo, indiquez-le lors de la réservation ou sur WhatsApp : nous organisons l'itinéraire en conséquence. Si l'arrêt vous éloigne nettement de votre route, nous vous disons avant le départ si un montant s'ajoute ; rien n'apparaît après coup.",
    faqThreeQ: "Des sièges enfants sont-ils disponibles ?",
    faqThreeA:
      "Oui. Coques bébé, sièges enfants et rehausseurs sont disponibles gratuitement sur réservation.",
    faqFourQ:
      "Pouvez-vous transporter des sacs de golf et des bagages volumineux ?",
    faqFourA:
      "Oui. Le Sprinter et le Vito sont idéaux pour les groupes de golfeurs. Précisez vos bagages et nous planifions le véhicule adapté.",
    faqFiveQ: "Le prix affiché est-il définitif ?",
    faqFiveA:
      "Oui. Le prix affiché à la réservation est le montant que vous remettez en espèces à votre chauffeur : par véhicule, tous frais d'aéroport, stationnement et 90 premières minutes d'attente compris. Aucun frais caché.",
    contactEyebrow: "Votre voyage commence ici",
    contactTitle: "Arriver à Antalya<br />de manière exceptionnelle.",
    contactBody:
      "Réservez en ligne en moins de deux minutes ou parlez directement avec notre équipe de conciergerie 24/7.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Réponse généralement en quelques minutes",
    callUs: "Appeler 24/7",
    emailUs: "E-mail conciergerie",
    replyHour: "Réponse en moins d'une heure",
    fromAirport: "Depuis l'aéroport d'Antalya",
    perVehicle: "par véhicule · prix fixe",
    footerTagline: "Services de chauffeur privé sur toute la Riviera turque.",
    explore: "Découvrir",
    information: "Informations",
    licensed: "Prestataire de transferts privés agréé · Conforme TÜRSAB",
    quoteReady: "Votre transfert privé",
    vehicle: "Véhicule",
    journeyTime: "Durée du trajet",
    totalFixed: "Prix total",
    quoteIncludes:
      "Inclus : accueil, suivi de vol, parking, 90 minutes d'attente et eau minérale.",
    confirmWhatsapp: "Confirmer via WhatsApp",
    chatWithUs: "Nous contacter",
    bookNowCta: "Réserver maintenant",
    backToQuote: "Retour",
    yourDetails: "Vos coordonnées",
    fullName: "Nom complet",
    emailLabel: "E-mail",
    phoneLabel: "Téléphone / WhatsApp",
    flightNumber: "Numéro de vol",
    flightArrivalTime: "Heure d'arrivée",
    notesLabel: "Demandes spéciales",
    confirmBooking: "Confirmer la réservation",
    bookingConfirmed: "Réservation confirmée",
    referenceLabel: "Référence",
    weWillContact:
      "Votre demande de réservation a été envoyée. Nous vous contactons dans les 30 minutes.",
    paymentError: "Paiement échoué. Veuillez réessayer.",
  },
  sv: {
    navFleet: "Fordon",
    navService: "Service",
    navRoutes: "Rutter",
    navReviews: "Recensioner",
    navContact: "Kontakt",
    bookNow: "Boka nu",
    alwaysAvailable: "Tillgänglig 24 timmar om dygnet",
    heroEyebrow: "Privat chaufförstjänst · Antalya",
    heroTitle: "Premium flygplatstransfers<br />i Antalya",
    heroSubtitle:
      "Privata transfers med chaufför från Antalya flygplats till Belek, Side, Kemer och Alanya.",
    bookTransfer: "Boka transfer",
    instantQuote: "Få pris direkt",
    googleRated: "Google-betyg",
    trustedGuests: "Anlitad av över 2 500 gäster",
    discover: "Utforska",
    privateJourney: "Din privata resa",
    quoteTitle: "Vart vill du åka?",
    pickup: "Hämtplats",
    destination: "Destination",
    date: "Datum",
    guests: "Gäster",
    airportOption: "Antalya flygplats (AYT)",
    hotelOption: "Hotell",
    privateAddressOption: "Privat adress",
    pickupAddress: "Fullständig hämtningsadress",
    pickupAddressPlaceholder: "Hotellnamn, gata, husnummer och område",
    dropoffAddress: "Fullständig destinationsadress",
    dropoffAddressPlaceholder: "Hotellnamn, gata, husnummer och område",
    selectDestination: "Välj destination",
    airportReturnPrice:
      "Priset bekräftas efter att hotellet eller hämtningsadressen har kontrollerats.",
    oneGuest: "1 gäst",
    twoGuests: "2 gäster",
    threeGuests: "3 gäster",
    fourGuests: "4 gäster",
    fiveGuests: "5 gäster",
    sixGuests: "6 gäster",
    sevenGuests: "7 gäster",
    viewQuote: "Visa pris",
    flightTracking: "Flygspårning i realtid",
    fixedPrice: "Garanterat fast pris",
    meetGreet: "Personlig välkomst",
    speakingDrivers: "Chaufförer som talar engelska och tyska",
    tbLicensed: "TÜRSAB-licensierad",
    tbFlightTracking: "Flygspårning",
    tbFixedPrice: "Fast pris",
    tb247Concierge: "Concierge dygnet runt",
    tbChildSeats: "Bilbarnstolar ingår",
    welcomeEyebrow: "Välkommen till högsta nivå",
    welcomeTitle: "Res med stil.<br />Anländ avslappnad.",
    welcomeBody:
      "Från det ögonblick du landar är varje detalj genomtänkt. Vårt flygplatsteam möter dig, chauffören står vid upphämtningsplatsen och ditt bagage lastas in i en omsorgsfullt förberedd privat bil.",
    ourStandards: "Våra servicestandarder",
    concierge: "Concierge-service",
    guestsWelcomed: "Välkomnade gäster",
    guestRating: "Genomsnittligt gästbetyg",
    privateTransfers: "Privata transfers",
    fleetEyebrow: "Vår flotta",
    fleetTitle: "Ditt privata utrymme,<br />perfekt i varje detalj.",
    fleetIntro:
      "Res bekvämt med gott om plats för familjen, golfbagaget och resväskorna.",
    fleetVclassClass: "Business · First Class",
    fleetVclassDescription:
      "Riktmärket för sofistikerade gruppresor: rymlig, exceptionellt tyst och utrustad för en smidig ankomst.",
    fleetVitoClass: "VIP · Grand Touring",
    fleetVitoDescription:
      "En rymlig privat kabin för större familjer, golfsällskap och gäster med mycket bagage.",
    signatureFleet: "Signature-flotta",
    passengers: "passagerare",
    suitcases: "resväskor",
    luggageLabel: "Stort bagage",
    capacitySwitchedSprinter:
      "Passagerare och bagage överstiger Vito — bytte till Mercedes Sprinter.",
    capacityNoVehicle:
      "Så många passagerare och bagage överstiger våra fordon. Kontakta oss på WhatsApp.",
    leatherSeats: "Premium läderstolar",
    wifi: "Gratis WiFi",
    water: "Kylt mineralvatten",
    childSeats: "Bilbarnstolar på begäran",
    television: "TV i fordonet",
    coldDrinks: "Kalla drycker",
    snacks: "Snacks",
    nameSignGreeting: "Mottagning vid disk J / 777",
    reserveVehicle: "Boka fordon",
    insideVclass: "Sprinter interiör",
    interiorTitle: "En privat lounge<br />mellan flygplatsen och hotellet.",
    serviceEyebrow: "Antalya VIP-standarden",
    serviceTitle: "Mer än en transfer.<br />Ett exceptionellt välkomnande.",
    serviceIntro:
      "Uppmärksamhet på hotellnivå, erfarna lokala chaufförer och fullständigt lugn från flygplats till resort.",
    trackingTitle: "Flygspårning",
    trackingBody:
      "Vi spårar din flyg i realtid och anpassar automatiskt hämtningstiden utan extra kostnad.",
    chauffeurTitle: "Professionella chaufförer",
    chauffeurBody:
      "Alltid välvårdade, diskreta och utvalda för lokal kunskap och högsta servicestandard.",
    greetTitle: "Meet & Greet",
    greetBody:
      "Vid utrikes ankomster möter vårt flygplatsteam dig vid disk J / 777, kallar din chaufför till upphämtningsplatsen och hjälper till med bagaget.",
    supportTitle: "Concierge 24/7",
    supportBody:
      "Före, under och efter din resa finns alltid någon tillgänglig per telefon eller WhatsApp.",
    priceTitle: "Fasta priser",
    priceBody:
      "Det bekräftade priset är slutpriset. Väntetid, parkering och flygförseningar ingår.",
    familyTitle: "För familjer",
    familyBody:
      "Lämpliga bilbarnstolar, rymliga interiörer och tålmodig hjälp för en avslappnad familjeankomst.",
    routesEyebrow: "Våra populäraste rutter",
    routesTitle: "Från Antalya flygplats<br />till Turkiska Rivieran.",
    routesIntro:
      "Alla priser gäller per fordon, aldrig per passagerare, med 90 minuters väntetid inkluderad.",
    golfFavourite: "Golfarnas favorit",
    from: "Från",
    reviewsEyebrow: "Gästrecensioner",
    reviewsTitle: "Service som minns<br />länge efter ankomsten.",
    googleReviews: "Baserat på 387 verifierade Google-recensioner",
    reviewOne:
      "„Vår chaufför väntade trots 90 minuters försening. Fordonet var makulöst, behagligt svalt och redan utrustat med båda barnstolarna. Precis det välkomnande vår familj behövde.”",
    reviewTwo:
      "„Från första WhatsApp-kontakten till ankomst i Belek absolut förstklassigt. Punktlig, diskret och mycket professionell. Våra golfbagar fick också plats utan problem.”",
    reviewThree:
      "„Det kändes som en chaufförstjänst från ett hotell, inte en flygplatstaxibil. Tydlig kommunikation, ett makulöst fordon och en genuint artig chaufför.”",
    trustedBy: "Anlitad av gäster på ledande resorts i Antalya",
    faqEyebrow: "Vanliga frågor",
    faqTitle: "Innan din resa.",
    faqCatArrival: "Ankomst & transfer",
    faqCatJourney: "Hemresa & färd",
    faqCatPayment: "Betalning & pris",
    faqCatVehicle: "Fordon & bagage",
    faqReminder: "Läs gärna FAQ-avsnittet på vår webbplats innan din resa.",
    viewFaq: "Visa FAQ",
    faqIntro:
      "Allt du behöver veta om din privata transfer från Antalya flygplats.",
    askQuestion: "Ställ en fråga",
    faqOneQ: "Vad händer vid en flygförsening?",
    faqOneA:
      "Du behöver inte göra något. Vi följer ditt flyg i realtid och justerar upphämtningstiden automatiskt. Förseningar som beror på flygbolaget debiteras aldrig – din chaufför är på plats oavsett när du landar, och de första 90 minuterna efter landning ingår alltid.",
    faqTwoQ: "Jag kommer med ett utrikesflyg. Hur går upphämtningen till?",
    faqTwoA:
      "Efter passkontroll och bagageutlämning följer du med övriga passagerare till Meet & Greet-området och kommer till vår disk J / 777. Det räcker att du uppger ditt namn för vår personal. Vårt team meddelar din chaufför direkt; han kör in på flygplatsen och står vid upphämtningsplatsen medan vår personal följer dig till bilen. Hela processen tar ungefär 7–8 minuter.",
    faqSixQ: "Jag kommer med ett inrikesflyg. Var hittar jag min chaufför?",
    faqSixA:
      "Meet & Greet-området är endast till för utrikes ankomster, så gäster på inrikesflyg tas emot på ett annat sätt: vi skickar dig chaufförens telefonnummer före transfern. Hör bara av dig till honom när du landat – han möter dig i ankomsthallen.",
    faqSevenQ: "Vad gör jag om ingen finns vid disk J / 777?",
    faqSevenA:
      "Två av våra medarbetare tjänstgör alltid vid disken och deras enda uppgift är att följa ankommande gäster till bilen. Om disken står tom ett ögonblick betyder det att en kollega just följer gästen som anlände strax före dig – varje följe tar cirka 7–8 minuter. Vänta gärna omkring 10 minuter. Om ingen är tillbaka då, skriv till oss på WhatsApp: vi meddelar din chaufför omedelbart, låter honom stanna vid närmaste plats och leder dig direkt till bilen utan mer väntan.",
    faqEightQ:
      "Vad händer om jag behöver mer än 90 minuter för att lämna flygplatsen?",
    faqEightA:
      "De första 90 minuterna efter landning ingår utan kostnad – gott och väl mer än vad passkontroll, bagage och tull kräver – och tidsfönstret förskjuts automatiskt vid flygförsening. Endast om något som inte har med flyget att göra håller kvar dig längre i terminalen tillkommer ett parkeringsbidrag på 5 € för varje ytterligare timme. I praktiken händer det nästan aldrig: så gott som alla våra gäster är på väg långt innan dess.",
    faqNineQ: "Hur betalar jag?",
    faqNineA:
      "Du betalar din chaufför kontant i början av resan – vi tar inte kort. Priserna anges i euro (EUR): det fasta beloppet är exakt det du såg vid bokningen – per fordon, med alla flygplats- och parkeringsavgifter inkluderade, utan tillägg i efterhand. Vill du hellre betala i amerikanska dollar eller turkiska lira? Skriv till oss i förväg på WhatsApp för ett separat pris, eftersom växelkursen skiljer sig. Chauffören välkomnar dig, lastar bagaget och monterar de bilbarnstolar du beställt; när betalningen är klar börjar din resa.",
    faqTenQ: "Hur håller jag kontakten inför hemtransfern?",
    faqTenA:
      "När du har bekräftat datum och tid för hemresan med vårt team på WhatsApp tilldelar vi ditt fordon några timmar före transfern och skickar bilder på det via WhatsApp – och chaufförens telefonnummer om du vill ha det. När chauffören kommer till hotellet meddelar han receptionen, som ringer upp ditt rum och berättar att bilen står redo. Våra chaufförer ringer aldrig gästerna direkt: all kontakt går via vår enda WhatsApp-supportlinje, så du vet alltid exakt vem du talar med.",
    faqElevenQ: "Kan jag avboka eller ändra min bokning?",
    faqElevenA:
      "Ja, och alltid kostnadsfritt. Eftersom vi inte tar någon förskottsbetalning finns det inget att återbetala och inget att vänta på — ändras dina planer räcker ett meddelande på WhatsApp. Ändrad tid, nytt flightnummer eller ny adress ordnar vi på samma sätt, utan extra kostnad.",
    faqTwelveQ: "Vilken valuta kan jag betala i?",
    faqTwelveA:
      "Våra priser anges i euro (EUR) och betalas kontant; kort tas inte emot. Vill du hellre betala i amerikanska dollar eller turkiska lira beror beloppet på dagskursen — skriv därför till oss på WhatsApp före transfern. Vi bekräftar ett tydligt pris och informerar chauffören, så att inget förhandlas i bilen.",
    faqThirteenQ: "Hur mycket bagage får jag ta med?",
    faqThirteenA:
      "Som regel en stor resväska och ett handbagage per person. Har du mer med dig — en extra väska, golfbag, barnvagn, skidor eller cykel — nämn det vid bokningen, så sätter vi in ett fordon med rätt kapacitet utan extra kostnad. Det enda som betyder något är att vi vet om det i förväg. En Mercedes Vito tar upp till 6 passagerare och en Sprinter upp till 12.",
    faqFourteenQ: "Vad händer om jag blir sen till hemtransfern?",
    faqFourteenA:
      "Chauffören är vid hotellet på avtalad tid och väntar 15 minuter kostnadsfritt. Tror du att du blir försenad räcker ett meddelande på WhatsApp: vi kontrollerar din avgångstid, informerar chauffören och justerar upplägget tillsammans med dig. Målet är aldrig att stressa dig, bara att få dig i god tid till flyget.",
    faqFifteenQ: "Går det att göra ett stopp under resan?",
    faqFifteenA:
      "Självklart. Vill du stanna vid en mataffär eller ett apotek, eller ta en kort fotopaus, säg till vid bokningen eller på WhatsApp — vi planerar rutten efter det. Tar stoppet dig långt från vägen säger vi före avfärd om något tillkommer; inget dyker upp i efterhand.",
    faqThreeQ: "Finns det bilbarnstolar?",
    faqThreeA:
      "Ja. Babyskydd, barnstolar och bälteskuddar finns tillgängliga utan extra kostnad vid förbeställning.",
    faqFourQ: "Kan golfbagar och stort bagage transporteras?",
    faqFourA:
      "Ja. Sprinter och Vito är idealiska för golfsällskap. Meddela oss om ditt bagage så planerar vi rätt fordon.",
    faqFiveQ: "Är det visade priset slutgiltigt?",
    faqFiveA:
      "Ja. Priset du ser vid bokningen är beloppet du lämnar kontant till chauffören – per fordon, inklusive alla flygplatsavgifter, parkering och de första 90 minuternas väntetid. Inga dolda avgifter.",
    contactEyebrow: "Din resa börjar här",
    contactTitle: "Anländ till Antalya<br />på ett exceptionellt sätt.",
    contactBody:
      "Boka online på under två minuter eller prata direkt med vårt concierge-team dygnet runt.",
    whatsappUs: "WhatsApp",
    replyMinutes: "Svar vanligtvis inom några minuter",
    callUs: "Ring 24/7",
    emailUs: "Concierge e-post",
    replyHour: "Svar inom en timme",
    fromAirport: "Från Antalya flygplats",
    perVehicle: "per fordon · fast pris",
    footerTagline: "Privata chaufförstjänster längs hela Turkiska Rivieran.",
    explore: "Utforska",
    information: "Information",
    licensed: "Licensierad privat transferoperatör · TÜRSAB-kompatibel",
    quoteReady: "Din privata transfer",
    vehicle: "Fordon",
    journeyTime: "Restid",
    totalFixed: "Totalt pris",
    quoteIncludes:
      "Inkluderar möte, flygbevakning, parkering, 90 minuters väntetid och vatten på flaska.",
    confirmWhatsapp: "Bekräfta via WhatsApp",
    chatWithUs: "Chatta med oss",
    bookNowCta: "Boka nu",
    backToQuote: "Tillbaka",
    yourDetails: "Dina uppgifter",
    fullName: "Fullständigt namn",
    emailLabel: "E-post",
    phoneLabel: "Telefon / WhatsApp",
    flightNumber: "Flygnummer",
    flightArrivalTime: "Ankomsttid",
    notesLabel: "Särskilda önskemål",
    confirmBooking: "Bekräfta bokning",
    bookingConfirmed: "Bokning bekräftad",
    referenceLabel: "Referensnummer",
    weWillContact:
      "Din bokningsförfrågan har skickats. Vi kontaktar dig inom 30 minuter.",
    paymentError: "Betalning misslyckades. Försök igen.",
  },
  ja: {
    navFleet: "車両",
    navService: "サービス",
    navRoutes: "ルート",
    navReviews: "口コミ",
    navContact: "お問い合わせ",
    bookNow: "今すぐ予約",
    alwaysAvailable: "年中無休・24時間対応",
    heroEyebrow: "プライベートショーファーサービス · アンタルヤ",
    heroTitle: "アンタルヤ空港からの<br />プレミアム送迎サービス",
    heroSubtitle:
      "アンタルヤ空港からベレック、シデ、ケメル、アランヤへ専属ショーファー付きプライベート送迎。",
    bookTransfer: "送迎を予約する",
    instantQuote: "料金を確認する",
    googleRated: "Google評価",
    trustedGuests: "2,500名以上のお客様にご利用いただいています",
    discover: "詳しく見る",
    privateJourney: "あなただけのプライベートな旅",
    quoteTitle: "目的地をお知らせください",
    pickup: "お迎え場所",
    destination: "目的地",
    date: "日付",
    guests: "ご利用人数",
    airportOption: "アンタルヤ空港 (AYT)",
    hotelOption: "ホテル",
    privateAddressOption: "個人住所",
    pickupAddress: "お迎え先の詳しい住所",
    pickupAddressPlaceholder: "ホテル名、通り、建物番号、地区",
    dropoffAddress: "目的地の詳しい住所",
    dropoffAddressPlaceholder: "ホテル名、通り、建物番号、地区",
    selectDestination: "目的地を選択",
    airportReturnPrice:
      "ホテルまたはお迎え先住所の確認後に料金をご案内します。",
    oneGuest: "1名",
    twoGuests: "2名",
    threeGuests: "3名",
    fourGuests: "4名",
    fiveGuests: "5名",
    sixGuests: "6名",
    sevenGuests: "7名",
    viewQuote: "料金を見る",
    flightTracking: "リアルタイムフライト追跡",
    fixedPrice: "料金固定保証",
    meetGreet: "ミート＆グリートサービス",
    speakingDrivers: "英語・ドイツ語対応ショーファー",
    tbLicensed: "TÜRSAB認可",
    tbFlightTracking: "フライト追跡",
    tbFixedPrice: "固定料金",
    tb247Concierge: "24時間コンシェルジュ",
    tbChildSeats: "チャイルドシート込み",
    welcomeEyebrow: "最高水準のサービスへようこそ",
    welcomeTitle: "上質な旅を。<br />安心してご到着を。",
    welcomeBody:
      "着陸の瞬間から、細部まで整えてお待ちしています。空港スタッフがお出迎えし、ドライバーが乗車地点に車をつけ、丁寧に準備された専用車へお荷物をお積みします。",
    ourStandards: "私たちのサービス基準",
    concierge: "コンシェルジュサービス",
    guestsWelcomed: "お迎えしたゲスト数",
    guestRating: "ゲスト平均評価",
    privateTransfers: "プライベート送迎",
    fleetEyebrow: "車両ラインナップ",
    fleetTitle: "あなただけのプライベート空間。<br />細部まで完璧に。",
    fleetIntro:
      "ご家族、ゴルフ用具、荷物のための十分なスペースを備えた快適な移動をお楽しみください。",
    fleetVclassClass: "ビジネス · ファーストクラス",
    fleetVclassDescription:
      "洗練されたグループ旅行の基準。広々とした車内、卓越した静粛性、シームレスなご到着のための装備が揃っています。",
    fleetVitoClass: "VIP · グランドツーリング",
    fleetVitoDescription:
      "大家族、ゴルフグループ、大量の荷物をお持ちのゲストのための広々としたプライベートキャビン。",
    signatureFleet: "シグネチャーフリート",
    passengers: "名",
    suitcases: "個のスーツケース",
    luggageLabel: "大型荷物",
    capacitySwitchedSprinter:
      "乗客と荷物がVitoの容量を超えています — メルセデス・スプリンターに変更しました。",
    capacityNoVehicle:
      "この人数と荷物は当社の車両を超えています。WhatsAppでお問い合わせください。",
    leatherSeats: "プレミアムレザーシート",
    wifi: "無料WiFi",
    water: "冷えたミネラルウォーター",
    childSeats: "チャイルドシート（ご要望に応じて）",
    television: "車内テレビ",
    coldDrinks: "冷たいお飲み物",
    snacks: "スナック",
    nameSignGreeting: "カウンター J / 777 でのお出迎え",
    reserveVehicle: "この車両を予約する",
    insideVclass: "Sprinterインテリア",
    interiorTitle: "空港とホテルの間の<br />プライベートラウンジ。",
    serviceEyebrow: "Antalya VIPスタンダード",
    serviceTitle: "送迎以上のもの。<br />特別なお出迎え。",
    serviceIntro:
      "5つ星ホテルレベルのアテンション、経験豊富な地元ショーファー、空港からリゾートまでの完全な安心感。",
    trackingTitle: "フライト追跡",
    trackingBody:
      "フライトをリアルタイムで追跡し、追加料金なしでお迎え時間を自動的に調整します。",
    chauffeurTitle: "プロフェッショナルショーファー",
    chauffeurBody:
      "常に清潔感があり、思いやりがあり、地元知識と最高のサービス基準のために厳選されています。",
    greetTitle: "ミート＆グリート",
    greetBody: "国際線到着では、空港スタッフがカウンター J / 777 でお出迎えし、ドライバーを乗車地点に呼び、お荷物をお手伝いします。",
    supportTitle: "24/7コンシェルジュ",
    supportBody:
      "旅の前・中・後、いつでも電話またはWhatsAppでご対応いたします。",
    priceTitle: "料金固定",
    priceBody:
      "確認された料金が最終料金です。待機時間、駐車料金、フライト遅延はすべて含まれています。",
    familyTitle: "ご家族向け",
    familyBody:
      "年齢に合ったチャイルドシート、広々とした車内、ご家族の安心到着のための丁寧なサポート。",
    routesEyebrow: "人気のルート",
    routesTitle: "アンタルヤ空港から<br />トルコリビエラへ。",
    routesIntro: "料金はすべて1台あたり（お一人あたりではありません）で、90分の待機時間を含みます。",
    golfFavourite: "ゴルファーに人気",
    from: "から",
    reviewsEyebrow: "お客様の声",
    reviewsTitle: "到着後も語り継がれる<br />サービス。",
    googleReviews: "387件のGoogle認証レビューに基づく",
    reviewOne:
      "「90分のフライト遅延にもかかわらず、ドライバーは待ってくれました。車両は完璧に清潔で心地よく冷えており、チャイルドシートも両方設置済みでした。家族が必要としていたまさにそのお出迎えでした。」",
    reviewTwo:
      "「最初のWhatsAppのやり取りからベレックへの到着まで、すべてが最高でした。時間通り、控えめで、とてもプロフェッショナル。ゴルフバッグも余裕で収まりました。」",
    reviewThree:
      "「空港タクシーではなく、ホテルのショーファーサービスのようでした。明確なコミュニケーション、完璧な車両、そして心から礼儀正しいドライバー。」",
    trustedBy: "アンタルヤの一流リゾートのゲストにご利用いただいています",
    faqEyebrow: "よくある質問",
    faqTitle: "ご旅行の前に。",
    faqCatArrival: "到着・送迎",
    faqCatJourney: "復路・道中",
    faqCatPayment: "お支払い・料金",
    faqCatVehicle: "車両・お手荷物",
    faqReminder: "ご旅行の前に、当サイトのFAQをご確認ください。",
    viewFaq: "FAQを見る",
    faqIntro:
      "アンタルヤ空港からのプライベート送迎について知っておくべきこと。",
    askQuestion: "質問する",
    faqOneQ: "フライトが遅延した場合はどうなりますか？",
    faqOneA:
      "お客様に必要な手続きはございません。フライトをリアルタイムで追跡し、お迎え時刻を自動的に調整いたします。航空会社都合の遅延に追加料金は一切かかりません。到着が何時になってもドライバーがお待ちしており、着陸後最初の90分は常に料金に含まれています。",
    faqTwoQ: "国際線で到着します。お迎えの流れを教えてください。",
    faqTwoA:
      "入国審査と手荷物の受け取りを終えられたら、ほかのお客様と同じくミート＆グリートエリアへお進みいただき、当社カウンター J / 777 へお越しください。スタッフにお名前をお伝えいただくだけで結構です。スタッフがただちにドライバーへ連絡し、ドライバーは空港に入って乗車地点に車をつけます。その間、スタッフがお客様を車までご案内いたします。所要時間はおよそ7〜8分です。",
    faqSixQ: "国内線で到着します。ドライバーはどこで見つけられますか？",
    faqSixA:
      "ミート＆グリートエリアは国際線到着のお客様専用のため、国内線でお越しのお客様は別のご案内となります。送迎の前にドライバーの電話番号をお送りしますので、到着後に一言ご連絡ください。到着ロビーでお迎えいたします。",
    faqSevenQ: "カウンター J / 777 に誰もいない場合はどうすればよいですか？",
    faqSevenA:
      "カウンターには常時2名のスタッフが常駐しており、到着されたお客様を車までご案内することだけを担当しています。カウンターが一時的に空いている場合は、直前に到着されたお客様をご案内している最中です。1組あたりのご案内には約7〜8分かかります。10分ほどお待ちください。それでも誰も戻らない場合は、WhatsApp でご連絡ください。ただちにドライバーへ連絡し、最寄りの場所に車をつけさせて、お待たせすることなく車まで直接ご案内いたします。",
    faqEightQ: "空港を出るまでに90分以上かかった場合はどうなりますか？",
    faqEightA:
      "着陸後最初の90分は無料で料金に含まれています。入国審査・手荷物・税関には十分すぎる時間で、フライトが遅延した場合はこの時間も自動的にずれます。フライトと関係のない事情でターミナル内に90分を超えて留まられた場合のみ、追加1時間ごとに5ユーロの駐車協力金を申し受けます。実際にはほとんど発生いたしません。ほぼすべてのお客様がそれよりずっと早くご出発になっています。",
    faqNineQ: "支払い方法を教えてください。",
    faqNineA:
      "ご乗車時に、ドライバーへ現金でお支払いいただきます（カードはご利用いただけません）。料金はユーロ（EUR）建てで、ご予約時にご覧いただいた定額と同額です。車両単位、空港料金・駐車料金込みで、後からの追加はございません。米ドルまたはトルコリラでのお支払いをご希望の場合は、為替レートが異なるため、事前にWhatsAppでご連絡いただき、別途お見積りをお受け取りください。ドライバーがお出迎えし、お荷物を積み込み、ご希望のチャイルドシートを設置いたします。お支払いののち、ご出発となります。",
    faqTenQ: "復路の送迎ではどのように連絡を取りますか？",
    faqTenA:
      "WhatsApp で復路の日時をご確定いただいた後、送迎の数時間前に車両を手配し、WhatsApp で車両の写真をお送りします。ご希望であればドライバーの電話番号もお伝えします。ドライバーがホテルに到着するとフロントへ伝え、フロントからお部屋へ車の準備が整った旨をご連絡いたします。ドライバーがお客様に直接お電話することはありません。ご連絡はすべて WhatsApp のカスタマーサポート窓口に一本化されていますので、どなたとやり取りしているか常に明確です。",
    faqElevenQ: "予約のキャンセルや変更はできますか？",
    faqElevenA:
      "はい、いつでも無料です。事前決済をいただいていないため、返金する金額も、お金が戻るのを待つ必要もありません。ご予定が変わったら WhatsApp にご一報ください。時刻・便名・目的地の変更も同様に、追加料金なく承ります。",
    faqTwelveQ: "どの通貨で支払えますか？",
    faqTwelveA:
      "料金はユーロ（EUR）建てで、現金でのお支払いとなります。カードはご利用いただけません。米ドルまたはトルコリラでのお支払いをご希望の場合、金額はその日のレートによって変わりますので、送迎前に WhatsApp までご連絡ください。明確な金額をお伝えし、ドライバーにも共有しますので、車内で金額の相談が生じることはありません。",
    faqThirteenQ: "荷物はどのくらい持ち込めますか？",
    faqThirteenA:
      "目安はお一人につき大型スーツケース1個と手荷物1個です。それ以上ある場合 — 追加のスーツケース、ゴルフバッグ、ベビーカー、スキー、自転車など — はご予約時にお知らせください。追加料金なしで十分な積載量の車両をご用意します。大切なのは、事前に把握できていることだけです。 メルセデス・ヴィートは最大6名、スプリンターは最大12名までご乗車いただけます。",
    faqFourteenQ: "復路の送迎に遅れそうな場合はどうなりますか？",
    faqFourteenA:
      "ドライバーはお約束の時刻にホテルへ到着し、15分間は無料でお待ちします。遅れそうなときは WhatsApp にご一報ください。搭乗時刻を確認し、ドライバーに伝え、一緒に段取りを調整いたします。お急かしするためではなく、余裕をもってご搭乗いただくためのご案内です。",
    faqFifteenQ: "途中で立ち寄りをお願いできますか？",
    faqFifteenA:
      "もちろん可能です。スーパーや薬局に立ち寄りたい、途中で写真を撮りたいといったご希望は、ご予約時または WhatsApp でお知らせください。ルートをそれに合わせてご用意します。ルートから大きく外れる立ち寄りの場合は、追加が生じるかどうかをご出発前に明確にお伝えします。後から加算されることはありません。",
    faqThreeQ: "チャイルドシートはありますか？",
    faqThreeA:
      "はい。乳幼児用、チャイルドシート、ジュニアシートは予約時にご要望いただければ無料でご用意します。",
    faqFourQ: "ゴルフバッグや大きな荷物は運べますか？",
    faqFourA:
      "はい。SprinterとVitoはゴルフグループに最適です。荷物の詳細をお知らせいただければ、適切な車両をご手配します。",
    faqFiveQ: "表示された料金は確定ですか？",
    faqFiveA:
      "はい。ご予約時にご覧いただいた金額を、そのままドライバーへ現金でお支払いいただきます。車両単位で、空港諸費用・駐車料金・着陸後90分までの待機時間がすべて含まれ、隠れた費用はありません。",
    contactEyebrow: "旅はここから始まります",
    contactTitle: "アンタルヤへ<br />格別の到着を。",
    contactBody:
      "2分以内にオンライン予約、または24/7コンシェルジュチームに直接お問い合わせください。",
    whatsappUs: "WhatsApp",
    replyMinutes: "通常数分以内に返信",
    callUs: "24/7電話",
    emailUs: "コンシェルジュメール",
    replyHour: "1時間以内に返信",
    fromAirport: "アンタルヤ空港から",
    perVehicle: "車両ごと · 固定料金",
    footerTagline: "トルコリビエラ全域のプライベートショーファーサービス。",
    explore: "探索する",
    information: "情報",
    licensed: "認定プライベート送迎事業者 · TÜRSAB準拠",
    quoteReady: "あなたのプライベート送迎",
    vehicle: "車両",
    journeyTime: "所要時間",
    totalFixed: "合計料金",
    quoteIncludes: "お出迎え、フライト追跡、駐車料金、90分の待機、ボトル入りの水が含まれます。",
    confirmWhatsapp: "WhatsAppで確認する",
    chatWithUs: "チャットする",
    bookNowCta: "今すぐ予約",
    backToQuote: "戻る",
    yourDetails: "お客様情報",
    fullName: "氏名",
    emailLabel: "メールアドレス",
    phoneLabel: "電話 / WhatsApp",
    flightNumber: "フライト番号",
    flightArrivalTime: "到着時刻",
    notesLabel: "特別なご要望",
    confirmBooking: "予約を確定する",
    bookingConfirmed: "予約確定",
    referenceLabel: "予約番号",
    weWillContact: "予約リクエストを送信しました。30分以内にご連絡いたします。",
    paymentError: "お支払いに失敗しました。もう一度お試しください。",
  },
  ko: {
    navFleet: "차량",
    navService: "서비스",
    navRoutes: "노선",
    navReviews: "리뷰",
    navContact: "문의",
    bookNow: "지금 예약",
    alwaysAvailable: "연중무휴 24시간 운영",
    heroEyebrow: "프라이빗 쇼퍼 서비스 · 안탈리아",
    heroTitle: "안탈리아 공항에서<br />프리미엄 공항 픽업 서비스",
    heroSubtitle:
      "안탈리아 공항에서 벨렉, 시데, 케메르, 알란야까지 전담 쇼퍼와 함께하는 프라이빗 이동.",
    bookTransfer: "셔틀 예약하기",
    instantQuote: "요금 확인하기",
    googleRated: "Google 평점",
    trustedGuests: "2,500명 이상의 고객이 이용했습니다",
    discover: "자세히 보기",
    privateJourney: "나만의 프라이빗 여행",
    quoteTitle: "어디로 모셔다 드릴까요?",
    pickup: "픽업 장소",
    destination: "목적지",
    date: "날짜",
    guests: "인원",
    airportOption: "안탈리아 공항 (AYT)",
    hotelOption: "호텔",
    privateAddressOption: "개인 주소",
    pickupAddress: "전체 픽업 주소",
    pickupAddressPlaceholder: "호텔명, 도로명, 건물 번호 및 지역",
    dropoffAddress: "전체 목적지 주소",
    dropoffAddressPlaceholder: "호텔명, 도로명, 건물 번호 및 지역",
    selectDestination: "목적지 선택",
    airportReturnPrice:
      "호텔 또는 픽업 주소를 확인한 후 요금을 안내해 드립니다.",
    oneGuest: "1명",
    twoGuests: "2명",
    threeGuests: "3명",
    fourGuests: "4명",
    fiveGuests: "5명",
    sixGuests: "6명",
    sevenGuests: "7명",
    viewQuote: "요금 보기",
    flightTracking: "실시간 항공편 추적",
    fixedPrice: "고정 요금 보장",
    meetGreet: "미트 앤 그리트 서비스",
    speakingDrivers: "영어·독일어 가능 쇼퍼",
    tbLicensed: "TÜRSAB 인증",
    tbFlightTracking: "항공편 추적",
    tbFixedPrice: "고정 요금",
    tb247Concierge: "24/7 컨시어지",
    tbChildSeats: "카시트 포함",
    welcomeEyebrow: "최고 수준의 서비스에 오신 것을 환영합니다",
    welcomeTitle: "품격 있게 이동하세요.<br />편안하게 도착하세요.",
    welcomeBody:
      "착륙하는 순간부터 모든 것이 준비되어 있습니다. 공항 직원이 고객님을 맞이하고, 기사가 픽업 지점에 차량을 대며, 짐은 정성껏 준비된 전용 차량에 실립니다.",
    ourStandards: "저희 서비스 기준",
    concierge: "컨시어지 서비스",
    guestsWelcomed: "환영한 고객 수",
    guestRating: "평균 고객 평점",
    privateTransfers: "프라이빗 이동",
    fleetEyebrow: "차량 라인업",
    fleetTitle: "나만의 프라이빗 공간,<br />세부 사항까지 완벽하게.",
    fleetIntro:
      "가족, 골프 장비, 여행 가방을 위한 충분한 공간을 갖춘 편안한 이동을 경험하세요.",
    fleetVclassClass: "비즈니스 · 퍼스트클래스",
    fleetVclassDescription:
      "정교한 그룹 여행의 기준. 넓고, 탁월하게 조용하며, 원활한 도착을 위한 장비를 갖추고 있습니다.",
    fleetVitoClass: "VIP · 그랜드 투어링",
    fleetVitoDescription:
      "대가족, 골프 그룹, 짐이 많은 고객을 위한 넓은 프라이빗 캐빈.",
    signatureFleet: "시그니처 플릿",
    passengers: "명",
    suitcases: "개의 캐리어",
    luggageLabel: "대형 수하물",
    capacitySwitchedSprinter:
      "승객과 수하물이 비토 용량을 초과합니다 — 메르세데스 스프린터로 변경되었습니다.",
    capacityNoVehicle:
      "이 인원과 수하물은 차량 용량을 초과합니다. WhatsApp으로 문의해 주세요.",
    leatherSeats: "프리미엄 가죽 시트",
    wifi: "무료 WiFi",
    water: "시원한 생수",
    childSeats: "요청 시 카시트 제공",
    television: "차량 내 TV",
    coldDrinks: "차가운 음료",
    snacks: "스낵",
    nameSignGreeting: "J / 777 카운터에서 미팅",
    reserveVehicle: "이 차량 예약하기",
    insideVclass: "Sprinter 인테리어",
    interiorTitle: "공항과 호텔 사이의<br />프라이빗 라운지.",
    serviceEyebrow: "Antalya VIP 기준",
    serviceTitle: "단순한 이동 그 이상.<br />특별한 환영.",
    serviceIntro:
      "5성급 호텔 수준의 세심한 배려, 경험 풍부한 현지 쇼퍼, 공항에서 리조트까지 완전한 안심.",
    trackingTitle: "항공편 추적",
    trackingBody:
      "항공편을 실시간으로 추적하여 추가 비용 없이 픽업 시간을 자동으로 조정합니다.",
    chauffeurTitle: "전문 쇼퍼",
    chauffeurBody:
      "항상 단정하고 신중하며, 현지 지식과 최고 서비스 기준으로 선별된 전문가들입니다.",
    greetTitle: "미트 앤 그리트",
    greetBody: "국제선 도착 시 공항 직원이 J / 777 카운터에서 맞이하고, 픽업 지점으로 기사를 부르며 짐을 도와드립니다.",
    supportTitle: "24/7 컨시어지",
    supportBody:
      "여행 전, 중, 후 언제든지 전화 또는 WhatsApp으로 담당자와 연결됩니다.",
    priceTitle: "고정 요금",
    priceBody:
      "확인된 요금이 최종 요금입니다. 대기 시간, 주차비, 항공편 지연이 모두 포함됩니다.",
    familyTitle: "가족을 위한",
    familyBody:
      "연령에 맞는 카시트, 넓은 실내, 편안한 가족 도착을 위한 세심한 도움.",
    routesEyebrow: "인기 노선",
    routesTitle: "안탈리아 공항에서<br />터키 리비에라까지.",
    routesIntro: "모든 요금은 인당이 아닌 차량당이며, 90분의 대기 시간이 포함됩니다.",
    golfFavourite: "골퍼들의 인기 선택",
    from: "부터",
    reviewsEyebrow: "고객 후기",
    reviewsTitle: "도착 후에도 오래 기억되는<br />서비스.",
    googleReviews: "387건의 Google 인증 리뷰 기준",
    reviewOne:
      '"90분 지연에도 불구하고 기사님이 기다려 주셨습니다. 차량은 완벽하게 청결하고 시원했으며 카시트 두 개도 이미 설치되어 있었습니다. 저희 가족에게 꼭 필요한 환영이었습니다."',
    reviewTwo:
      '"첫 WhatsApp 연락부터 벨렉 도착까지 모든 것이 최고였습니다. 시간 엄수, 세심함, 매우 전문적. 골프백도 여유롭게 들어갔습니다."',
    reviewThree:
      '"공항 택시가 아닌 호텔 쇼퍼 서비스 같았습니다. 명확한 소통, 완벽한 차량, 진심으로 예의 바른 기사님."',
    trustedBy: "안탈리아 주요 리조트 고객들이 선택했습니다",
    faqEyebrow: "자주 묻는 질문",
    faqTitle: "여행 전에.",
    faqCatArrival: "도착 및 이동",
    faqCatJourney: "복귀 및 이동",
    faqCatPayment: "결제 및 요금",
    faqCatVehicle: "차량 및 수하물",
    faqReminder: "여행 전에 저희 웹사이트의 FAQ를 확인해 주세요.",
    viewFaq: "FAQ 보기",
    faqIntro: "안탈리아 공항 프라이빗 픽업에 대해 알아야 할 모든 것.",
    askQuestion: "질문하기",
    faqOneQ: "항공편이 지연되면 어떻게 되나요?",
    faqOneA:
      "고객님께서 하실 일은 없습니다. 항공편을 실시간으로 추적해 픽업 시간을 자동으로 조정합니다. 항공사 사정으로 인한 지연에는 추가 요금이 전혀 없으며, 언제 도착하시든 기사가 대기하고 있습니다. 착륙 후 첫 90분은 언제나 요금에 포함됩니다.",
    faqTwoQ: "국제선으로 도착합니다. 미팅 절차는 어떻게 되나요?",
    faqTwoA:
      "입국 심사와 수하물 수령을 마치신 후 다른 승객들과 함께 미트 앤 그리트(Meet & Greet) 구역으로 이동하셔서 저희 J / 777 카운터로 오십시오. 직원에게 성함만 말씀해 주시면 됩니다. 한산한 시간대에는 성함이 적힌 안내판도 준비되어 있으며, 혼잡한 시간대에는 성함을 말씀해 주시는 것으로 충분합니다. 직원이 즉시 기사에게 연락하면 기사는 공항으로 진입해 픽업 지점에 차를 대고, 그동안 직원이 고객님을 차량까지 안내해 드립니다. 전체 과정은 약 7~8분 소요됩니다.",
    faqSixQ: "국내선으로 도착합니다. 기사를 어디에서 만나나요?",
    faqSixA:
      "미트 앤 그리트 구역은 국제선 도착 승객만을 위한 공간이므로 국내선 고객님은 다른 방식으로 안내해 드립니다. 출발 전에 기사 연락처를 보내 드리니, 도착하신 후 간단히 알려 주시면 기사가 도착 로비에서 모시겠습니다.",
    faqSevenQ: "J / 777 카운터에 아무도 없으면 어떻게 해야 하나요?",
    faqSevenA:
      "카운터에는 항상 두 명의 직원이 상주하며, 도착하신 고객님을 차량까지 안내하는 것이 유일한 업무입니다. 카운터가 잠시 비어 있다면 직전에 도착한 고객을 안내 중이라는 뜻이며, 한 번 안내에 약 7~8분이 소요됩니다. 10분 정도 기다려 주십시오. 그때까지 아무도 돌아오지 않으면 WhatsApp으로 메시지를 보내 주십시오. 즉시 기사에게 연락해 가장 가까운 지점에 차를 대도록 하고, 더 기다리실 필요 없이 차량까지 바로 안내해 드리겠습니다.",
    faqEightQ: "공항을 나오는 데 90분 이상 걸리면 어떻게 되나요?",
    faqEightA:
      "착륙 후 첫 90분은 무료로 포함되어 있습니다. 입국 심사와 수하물, 세관 절차에 충분하고도 남는 시간이며, 항공편이 지연되면 이 시간도 자동으로 조정됩니다. 항공편과 무관한 사유로 터미널에 90분을 넘겨 머무르시는 경우에만 추가 1시간마다 5유로의 주차 비용이 더해집니다. 실제로는 거의 발생하지 않으며, 대부분의 고객님은 그보다 훨씬 이전에 출발하십니다.",
    faqNineQ: "결제는 어떻게 하나요?",
    faqNineA:
      "출발할 때 기사에게 현금으로 결제하십니다(카드는 받지 않습니다). 요금은 유로(EUR) 기준이며, 예약 시 확인하신 고정 금액과 동일합니다. 차량 단위로 모든 공항 및 주차 비용이 포함되어 있고 이후 추가되는 항목은 없습니다. 미국 달러나 터키 리라로 결제를 원하시면 환율이 다르므로 미리 WhatsApp으로 연락 주시면 별도의 금액을 안내해 드립니다. 기사가 고객님을 맞이해 짐을 싣고 요청하신 카시트를 장착해 드리며, 결제가 끝나면 여정이 시작됩니다.",
    faqTenQ: "돌아가는 차량과는 어떻게 연락하나요?",
    faqTenA:
      "WhatsApp으로 저희 팀과 복귀 날짜와 시간을 확정하시면, 이동 몇 시간 전에 차량을 배정하고 WhatsApp으로 차량 사진을 보내 드립니다. 원하시면 기사 연락처도 함께 전달해 드립니다. 기사가 호텔에 도착하면 프런트에 알리고, 프런트에서 객실로 차량이 준비되었음을 안내해 드립니다. 저희 기사는 고객님께 직접 전화하지 않으며, 모든 연락은 WhatsApp 고객지원 창구 한 곳을 통해 이루어집니다. 그래서 누구와 대화하고 있는지 항상 분명합니다.",
    faqElevenQ: "예약을 취소하거나 변경할 수 있나요?",
    faqElevenA:
      "네, 언제나 무료입니다. 선결제를 받지 않기 때문에 환불할 금액도, 돈이 돌아오기를 기다릴 일도 없습니다. 일정이 바뀌면 WhatsApp으로 알려 주시면 됩니다. 시간, 항공편 번호, 도착 주소 변경도 같은 방식으로 추가 비용 없이 처리해 드립니다.",
    faqTwelveQ: "어떤 통화로 결제할 수 있나요?",
    faqTwelveA:
      "요금은 유로(EUR) 기준이며 현금으로 결제하십니다. 카드는 받지 않습니다. 미국 달러나 튀르키예 리라로 결제하고 싶으시면 금액이 그날의 환율에 따라 달라지므로, 이동 전에 WhatsApp으로 알려 주십시오. 정확한 금액을 확정해 드리고 기사에게도 전달하므로 차 안에서 금액을 조율할 일이 없습니다.",
    faqThirteenQ: "짐은 얼마나 가져올 수 있나요?",
    faqThirteenA:
      "원칙적으로 승객 한 분당 대형 캐리어 1개와 기내용 가방 1개입니다. 그보다 많다면 — 추가 캐리어, 골프백, 유모차, 스키, 자전거 등 — 예약 시 알려 주십시오. 추가 요금 없이 적절한 적재 공간을 갖춘 차량을 배정해 드립니다. 중요한 것은 미리 알려 주시는 것뿐입니다. 메르세데스 비토는 최대 6명, 스프린터는 최대 12명까지 탑승하실 수 있습니다.",
    faqFourteenQ: "복귀 차량 시간에 늦을 것 같으면 어떻게 되나요?",
    faqFourteenA:
      "기사는 약속된 시간에 호텔에 도착해 15분간 무료로 대기합니다. 늦어질 것 같으면 WhatsApp으로 한 번만 알려 주십시오. 항공편 시간을 확인하고 기사에게 전달한 뒤 일정을 함께 조정해 드립니다. 서두르시게 하려는 것이 아니라 여유롭게 비행기를 타시도록 돕기 위한 것입니다.",
    faqFifteenQ: "이동 중에 잠시 들를 수 있나요?",
    faqFifteenA:
      "물론입니다. 가는 길에 마트나 약국에 들르거나 잠시 사진을 찍고 싶으시면 예약 시 또는 WhatsApp으로 알려 주십시오. 경로를 그에 맞춰 계획해 드립니다. 경로에서 크게 벗어나는 정차라면 추가 금액이 있는지 출발 전에 분명히 알려 드리며, 나중에 붙는 금액은 없습니다.",
    faqThreeQ: "카시트를 이용할 수 있나요?",
    faqThreeA:
      "네. 신생아용 카시트, 아동용 카시트, 부스터 시트는 예약 시 요청하시면 무료로 제공됩니다.",
    faqFourQ: "골프백과 대형 수하물도 운반할 수 있나요?",
    faqFourA:
      "네. Sprinter와 Vito는 골프 그룹에 이상적입니다. 수하물 정보를 알려주시면 적합한 차량을 준비합니다.",
    faqFiveQ: "표시된 요금이 최종 요금인가요?",
    faqFiveA:
      "네. 예약 시 확인하신 금액을 그대로 기사에게 현금으로 전달하시면 됩니다. 차량 단위이며 모든 공항 비용, 주차료, 착륙 후 첫 90분의 대기 시간이 포함되어 있습니다. 숨겨진 요금은 없습니다.",
    contactEyebrow: "여행은 여기서 시작됩니다",
    contactTitle: "안탈리아에<br />특별하게 도착하세요.",
    contactBody:
      "2분 이내에 온라인 예약하거나 24/7 컨시어지 팀에 직접 문의하세요.",
    whatsappUs: "WhatsApp",
    replyMinutes: "보통 몇 분 내로 답변",
    callUs: "24/7 전화",
    emailUs: "컨시어지 이메일",
    replyHour: "1시간 내 답변",
    fromAirport: "안탈리아 공항에서",
    perVehicle: "차량 기준 · 고정 요금",
    footerTagline: "터키 리비에라 전역의 프라이빗 쇼퍼 서비스.",
    explore: "탐색",
    information: "정보",
    licensed: "인증된 프라이빗 이동 사업자 · TÜRSAB 준수",
    quoteReady: "나의 프라이빗 이동",
    vehicle: "차량",
    journeyTime: "소요 시간",
    totalFixed: "총 요금",
    quoteIncludes: "미팅 서비스, 항공편 추적, 주차, 90분 대기, 생수가 포함됩니다.",
    confirmWhatsapp: "WhatsApp으로 확인하기",
    chatWithUs: "채팅하기",
    bookNowCta: "지금 예약",
    backToQuote: "뒤로",
    yourDetails: "고객 정보",
    fullName: "성명",
    emailLabel: "이메일",
    phoneLabel: "전화 / WhatsApp",
    flightNumber: "항공편 번호",
    flightArrivalTime: "도착 시간",
    notesLabel: "특별 요청",
    confirmBooking: "예약 확정하기",
    bookingConfirmed: "예약 확정",
    referenceLabel: "예약 번호",
    weWillContact: "예약 요청이 전송되었습니다. 30분 내로 연락드리겠습니다.",
    paymentError: "결제에 실패했습니다. 다시 시도해 주세요.",
  },
  ar: {
    navFleet: "أسطولنا",
    navService: "الخدمات",
    navRoutes: "الوجهات",
    navReviews: "التقييمات",
    navContact: "اتصل بنا",
    bookNow: "احجز الآن",
    alwaysAvailable: "متاحون على مدار الساعة، كل يوم",
    heroEyebrow: "خدمة سائق خاص · أنطاليا",
    heroTitle: "خدمة نقل فاخرة من المطار<br />في أنطاليا",
    heroSubtitle:
      "خدمة نقل خاصة مع سائق من مطار أنطاليا إلى بيليك وسيده وكيمر وألانيا.",
    campaignBadge: "عرض الحجز عبر الإنترنت",
    campaignDiscount: "سعر خاص",
    campaignScope: "على جميع أسعار النقل",
    campaignApplied: "تم تطبيق السعر الخاص عبر الإنترنت",
    onlineDiscountShort: "سعر خاص عبر الإنترنت",
    discountPricesShown: "الأسعار المعروضة هي أسعار خاصة عبر الإنترنت",
    bookTransfer: "احجز خدمة النقل",
    instantQuote: "احصل على السعر فوراً",
    googleRated: "تقييم Google",
    trustedGuests: "اختيار أكثر من 2,500 ضيف",
    discover: "اكتشف المزيد",
    privateJourney: "رحلتك الخاصة",
    quoteTitle: "إلى أين نوصلك؟",
    pickup: "مكان الاستقبال",
    destination: "الوجهة",
    date: "التاريخ",
    tripType: "نوع الرحلة",
    oneWay: "ذهاب فقط",
    roundTrip: "ذهاب وعودة",
    roundTripHint:
      "في رحلة الذهاب والعودة، تكون رحلة العودة على المسار نفسه بالاتجاه المعاكس.",
    returnDate: "تاريخ العودة",
    returnPickupTime: "وقت الاستقبال للعودة",
    returnFlightNumber: "رقم رحلة العودة",
    arrivalDate: "تاريخ الوصول",
    arrivalFlightTime: "وقت وصول الرحلة",
    arrivalFlightNumber: "رقم رحلة الوصول",
    roundTripPriceNote: "ذهاب وعودة · رحلتان",
    guests: "الركاب",
    airportOption: "مطار أنطاليا (AYT)",
    hotelOption: "فندق",
    privateAddressOption: "عنوان خاص",
    pickupAddress: "عنوان الاستقبال الكامل",
    pickupAddressPlaceholder: "اسم الفندق، الشارع، رقم المبنى والمنطقة",
    dropoffAddress: "عنوان الوصول الكامل",
    dropoffAddressPlaceholder: "اسم الفندق، الشارع، رقم المبنى والمنطقة",
    dropoffAddressRequired: "يجب أن يتراوح عنوان الوصول بين 6 و160 حرفاً.",
    customDestinationPrice: "سيتم تأكيد السعر بعد مراجعة عنوان الوصول.",
    selectDestination: "اختر الوجهة",
    airportReturnPrice:
      "سيتم تأكيد السعر بعد مراجعة الفندق أو عنوان الاستقبال.",
    oneGuest: "راكب واحد",
    twoGuests: "راكبان",
    threeGuests: "3 ركاب",
    fourGuests: "4 ركاب",
    fiveGuests: "5 ركاب",
    sixGuests: "6 ركاب",
    sevenGuests: "7 ركاب",
    viewQuote: "عرض السعر",
    flightTracking: "تتبع الرحلة مباشرة",
    fixedPrice: "سعر ثابت مضمون",
    meetGreet: "استقبال شخصي",
    speakingDrivers: "سائقون يتحدثون الإنجليزية والألمانية",
    tbLicensed: "مرخصون من TÜRSAB",
    tbFlightTracking: "تتبع الرحلات",
    tbFixedPrice: "سعر ثابت",
    tb247Concierge: "كونسيرج 24/7",
    tbChildSeats: "مقاعد أطفال مشمولة",
    welcomeEyebrow: "مرحباً بك في مستوى أرقى من الخدمة",
    welcomeTitle: "سافر بأناقة.<br />وصل براحة.",
    welcomeBody:
      "منذ لحظة هبوطك، رُوعيت كل التفاصيل. يستقبلك فريقنا في المطار، ويقف سائقك في نقطة الاستقبال، وتُحمَّل أمتعتك في سيارة خاصة أُعدّت بعناية.",
    ourStandards: "معايير خدمتنا",
    concierge: "خدمة الكونسيرج",
    guestsWelcomed: "الضيوف الذين استقبلناهم",
    guestRating: "متوسط تقييم الضيوف",
    privateTransfers: "رحلات نقل خاصة",
    fleetEyebrow: "أسطولنا",
    fleetTitle: "مساحتك الخاصة،<br />مصممة بأدق التفاصيل.",
    fleetIntro: "سافر براحة مع مساحة واسعة للعائلة وحقائب الغولف والأمتعة.",
    fleetVclassClass: "درجة رجال الأعمال · الدرجة الأولى",
    fleetVclassDescription:
      "وسيلة نقل VIP رحبة للمجموعات الكبيرة، مع مساحة واسعة للركاب والأمتعة.",
    fleetVitoClass: "VIP · جراند تورينغ",
    fleetVitoDescription: "مقصورة خاصة ومريحة للعائلات والمجموعات الصغيرة.",
    signatureFleet: "الأسطول المميز",
    passengers: "ركاب",
    suitcases: "حقائب",
    luggageLabel: "أمتعة كبيرة",
    capacitySwitchedSprinter:
      "عدد الركاب والأمتعة يتجاوز سعة Vito — تم التبديل إلى Mercedes Sprinter.",
    capacityNoVehicle:
      "هذا العدد من الركاب والأمتعة يتجاوز سعة مركباتنا. يرجى التواصل معنا عبر WhatsApp.",
    leatherSeats: "مقاعد جلدية فاخرة",
    wifi: "واي فاي مجاني",
    water: "مياه معدنية باردة",
    childSeats: "مقاعد أطفال عند الطلب",
    television: "تلفاز داخل السيارة",
    coldDrinks: "مشروبات باردة",
    snacks: "وجبات خفيفة",
    nameSignGreeting: "استقبال عند المكتب J / 777",
    reserveVehicle: "احجز هذه السيارة",
    insideVclass: "مقصورة Sprinter الداخلية",
    interiorTitle: "صالة خاصة بين<br />المطار والفندق.",
    serviceEyebrow: "معيار Antalya VIP",
    serviceTitle: "أكثر من مجرد نقل.<br />إنه ترحيب استثنائي.",
    serviceIntro:
      "عناية بمستوى الفنادق الفاخرة، وسائقون محليون ذوو خبرة، وراحة تامة من المطار إلى المنتجع.",
    trackingTitle: "تتبع الرحلة",
    trackingBody:
      "نتابع رحلتك مباشرة ونعدّل وقت الاستقبال تلقائياً من دون أي تكلفة إضافية.",
    chauffeurTitle: "سائقون محترفون",
    chauffeurBody:
      "سائقون أنيقون وكتومون دائماً، تم اختيارهم لمعرفتهم المحلية والتزامهم بأعلى معايير الخدمة.",
    greetTitle: "الاستقبال والترحيب",
    greetBody:
      "في القدوم الدولي يستقبلك فريقنا عند المكتب J / 777، ويستدعي سائقك إلى نقطة الاستقبال، ويساعدك في الأمتعة.",
    supportTitle: "كونسيرج 24/7",
    supportBody:
      "قبل رحلتك وأثناءها وبعدها، يمكنك دائماً التواصل مع شخص حقيقي عبر الهاتف أو WhatsApp.",
    priceTitle: "أسعار ثابتة",
    priceBody:
      "السعر المؤكد هو السعر النهائي. يشمل وقت الانتظار ومواقف السيارات وتأخير الرحلات.",
    familyTitle: "مناسب للعائلات",
    familyBody:
      "مقاعد أطفال مناسبة للأعمار، ومساحات داخلية واسعة، ومساعدة هادئة لوصول عائلي مريح.",
    routesEyebrow: "رحلاتنا الأكثر طلباً",
    routesTitle: "من مطار أنطاليا<br />إلى الريفييرا التركية.",
    routesIntro:
      "جميع الأسعار لكل مركبة وليست لكل راكب، وتشمل 90 دقيقة انتظار.",
    golfFavourite: "المفضل لدى لاعبي الغولف",
    from: "ابتداءً من",
    reviewsEyebrow: "آراء الضيوف",
    reviewsTitle: "خدمة تبقى في الذاكرة<br />بعد الوصول.",
    googleReviews: "استناداً إلى 387 تقييماً موثقاً على Google",
    reviewOne:
      '"انتظرنا السائق رغم تأخر الرحلة 90 دقيقة. كانت السيارة نظيفة تماماً وباردة، ومقعدا الأطفال مجهزين مسبقاً. كان هذا بالضبط ما احتاجته عائلتنا عند الوصول."',
    reviewTwo:
      '"من أول تواصل عبر WhatsApp حتى وصولنا إلى بيليك، كانت الخدمة ممتازة. التزام بالمواعيد واحترافية عالية، مع مساحة مريحة لحقائب الغولف."',
    reviewThree:
      '"شعرنا وكأنها خدمة سائق فندق فاخر وليست سيارة أجرة من المطار. تواصل واضح، وسيارة مثالية، وسائق مهذب بصدق."',
    trustedBy: "موثوق من ضيوف أبرز منتجعات أنطاليا",
    faqEyebrow: "الأسئلة الشائعة",
    faqTitle: "قبل رحلتك.",
    faqCatArrival: "الوصول والنقل",
    faqCatJourney: "العودة والرحلة",
    faqCatPayment: "الدفع والسعر",
    faqCatVehicle: "المركبة والأمتعة",
    faqReminder: "قبل رحلتك، يُرجى الاطلاع على قسم الأسئلة الشائعة على موقعنا.",
    viewFaq: "عرض الأسئلة الشائعة",
    faqIntro: "كل ما تحتاج إلى معرفته عن خدمة النقل الخاصة من مطار أنطاليا.",
    askQuestion: "اطرح سؤالاً",
    faqOneQ: "ماذا يحدث إذا تأخرت رحلتي؟",
    faqOneA:
      "لا يتطلب الأمر منك شيئًا. نتابع رحلتك لحظة بلحظة ونعدّل موعد الاستقبال تلقائيًا. لا نفرض أي رسوم إضافية على التأخيرات الناتجة عن شركة الطيران؛ سائقك في انتظارك مهما كان وقت الهبوط، وأول 90 دقيقة بعد الهبوط مشمولة دائمًا في السعر.",
    faqTwoQ: "سأصل على رحلة دولية. كيف تتم عملية الاستقبال؟",
    faqTwoA:
      "بعد إنهاء إجراءات الجوازات واستلام الأمتعة، توجّه مع بقية المسافرين إلى منطقة الاستقبال Meet & Greet وتعال إلى مكتبنا رقم J / 777. يكفي أن تذكر اسمك لموظفينا. يبلّغ فريقنا سائقك على الفور، فيدخل إلى المطار ويقف في نقطة الاستقبال، بينما يرافقك موظفنا إلى السيارة. تستغرق العملية كاملة نحو 7 إلى 8 دقائق.",
    faqSixQ: "سأصل على رحلة داخلية. أين أجد سائقي؟",
    faqSixA:
      "منطقة الاستقبال Meet & Greet مخصصة للرحلات الدولية فقط، لذلك نتعامل مع ضيوف الرحلات الداخلية بطريقة مختلفة: نرسل إليك رقم هاتف السائق قبل موعد النقل. ما عليك سوى إبلاغه بعد الهبوط، وسيستقبلك في صالة القدوم.",
    faqSevenQ: "ماذا أفعل إذا لم يكن أحد في المكتب J / 777؟",
    faqSevenA:
      "يعمل في المكتب موظفان بشكل دائم، ومهمتهما الوحيدة هي مرافقة الضيوف القادمين إلى سياراتهم. إذا وجدت المكتب خاليًا للحظات، فهذا يعني أن أحد الزملاء يرافق الضيف الذي وصل قبلك مباشرة؛ إذ تستغرق كل مرافقة نحو 7 إلى 8 دقائق. يرجى الانتظار نحو 10 دقائق. وإذا لم يعد أحد خلال هذه المدة، راسلنا عبر WhatsApp: سنبلغ سائقك فورًا ونطلب منه التوقف في أقرب نقطة، ونرشدك مباشرة إلى سيارتك دون مزيد من الانتظار.",
    faqEightQ: "ماذا لو احتجت إلى أكثر من 90 دقيقة للخروج من المطار؟",
    faqEightA:
      "أول 90 دقيقة بعد هبوط الطائرة مشمولة مجانًا، وهي مدة تزيد عمّا تتطلبه إجراءات الجوازات والأمتعة والجمارك، وتتحرك تلقائيًا مع أي تأخير في الرحلة. وفقط إذا أبقاك داخل الصالة سبب لا علاقة له برحلتك مدة أطول، تُضاف مساهمة وقوف بقيمة 5 يورو عن كل ساعة إضافية. عمليًا لا يحدث ذلك تقريبًا؛ فجميع ضيوفنا تقريبًا ينطلقون قبل ذلك بكثير.",
    faqNineQ: "كيف تتم عملية الدفع؟",
    faqNineA:
      "تدفع لسائقك نقدًا في بداية الرحلة — لا نقبل البطاقات. الأسعار محددة باليورو (EUR): المبلغ الثابت هو نفسه تمامًا الذي رأيته عند الحجز، لكل مركبة، شاملًا جميع رسوم المطار والوقوف، دون أي إضافات لاحقة. هل تفضّل الدفع بالدولار الأمريكي أو الليرة التركية؟ راسِلنا مسبقًا عبر واتساب للحصول على سعر منفصل، لأن سعر الصرف يختلف. يستقبلك السائق ويحمّل أمتعتك ويركّب مقاعد الأطفال التي طلبتها، وبعد إتمام الدفع تبدأ رحلتك.",
    faqTenQ: "كيف أبقى على تواصل في رحلة العودة؟",
    faqTenA:
      "بعد تأكيد تاريخ العودة وموعدها مع فريقنا عبر WhatsApp، نخصص مركبتك قبل الموعد بساعات ونرسل إليك صورها عبر WhatsApp، ورقم هاتف السائق أيضًا إذا رغبت. وعند وصول السائق إلى الفندق يُبلغ الاستقبال، ويقوم الاستقبال بإخطار غرفتك بأن السيارة جاهزة. لا يتصل سائقونا بالضيوف مباشرة أبدًا: يمر التواصل كله عبر خط دعم العملاء الوحيد على WhatsApp، لتعرف دائمًا بالضبط مع من تتحدث.",
    faqElevenQ: "هل يمكنني إلغاء الحجز أو تعديله؟",
    faqElevenA:
      "نعم، ودائمًا مجانًا. لأننا لا نأخذ أي دفعة مسبقة، فليس هناك ما يُسترد ولا انتظار لعودة أموالك — إذا تغيرت خططك تكفي رسالة عبر WhatsApp. وتعديل الموعد أو رقم الرحلة أو عنوان الوصول يتم بالطريقة نفسها، دون رسوم إضافية.",
    faqTwelveQ: "بأي عملة يمكنني الدفع؟",
    faqTwelveA:
      "أسعارنا محددة باليورو (EUR) وتُدفع نقدًا؛ ولا نقبل البطاقات. وإذا فضّلت الدفع بالدولار الأمريكي أو بالليرة التركية فإن المبلغ يعتمد على سعر الصرف في ذلك اليوم، لذا راسلنا عبر WhatsApp قبل موعد النقل: نؤكد لك سعرًا واضحًا ونبلّغ سائقك، فلا يجري أي تفاوض داخل السيارة.",
    faqThirteenQ: "ما مقدار الأمتعة التي يمكنني اصطحابها؟",
    faqThirteenA:
      "القاعدة هي حقيبة كبيرة واحدة وحقيبة يد واحدة لكل راكب. وإذا كان لديك أكثر من ذلك — حقيبة إضافية أو حقيبة غولف أو عربة أطفال أو تزلج أو دراجة — فاذكر ذلك عند الحجز، وسنخصص مركبة بسعة مناسبة دون أي تكلفة إضافية. المهم فقط أن نعرف مسبقًا. تتسع مرسيدس فيتو حتى 6 ركاب، وسبرينتر حتى 12 راكبًا.",
    faqFourteenQ: "ماذا لو تأخرت عن رحلة العودة؟",
    faqFourteenA:
      "يصل سائقك إلى الفندق في الموعد المتفق عليه وينتظر 15 دقيقة مجانًا. وإذا توقعت تأخرًا تكفي رسالة واحدة عبر WhatsApp: نتحقق من موعد رحلتك، ونبلّغ سائقك، ونعدّل البرنامج معك. هدفنا ليس استعجالك، بل إيصالك إلى رحلتك براحة.",
    faqFifteenQ: "هل يمكن التوقف في الطريق؟",
    faqFifteenA:
      "بالطبع. إذا رغبت في التوقف عند سوق أو صيدلية أو لالتقاط صورة في الطريق، فاذكر ذلك عند الحجز أو عبر WhatsApp وسنخطّط المسار على هذا الأساس. وإذا كان التوقف يبعدك كثيرًا عن مسارك، نخبرك قبل الانطلاق بما إذا كان سيُضاف أي مبلغ؛ فلا شيء يظهر لاحقًا كمفاجأة.",
    faqThreeQ: "هل تتوفر مقاعد للأطفال؟",
    faqThreeA:
      "نعم. تتوفر مقاعد للرضع والأطفال والمقاعد المعززة مجاناً عند طلبها أثناء الحجز.",
    faqFourQ: "هل يمكن نقل حقائب الغولف والأمتعة الكبيرة؟",
    faqFourA:
      "نعم. سيارات Sprinter وVito مناسبة لمجموعات الغولف. أخبرنا بأمتعتك لنجهز السيارة المناسبة.",
    faqFiveQ: "هل السعر المعروض نهائي؟",
    faqFiveA:
      "نعم. السعر الذي تراه عند الحجز هو المبلغ الذي تسلّمه للسائق نقدًا: لكل مركبة، شاملًا جميع رسوم المطار والوقوف وأول 90 دقيقة من الانتظار. لا توجد رسوم خفية.",
    contactEyebrow: "رحلتك تبدأ هنا",
    contactTitle: "ابدأ وصولك إلى أنطاليا<br />بطريقة استثنائية.",
    contactBody:
      "احجز عبر الإنترنت خلال دقيقتين، أو تحدث مباشرة إلى فريق الكونسيرج 24/7.",
    whatsappUs: "تواصل عبر WhatsApp",
    replyMinutes: "نرد عادةً خلال دقائق",
    callUs: "اتصل بنا 24/7",
    emailUs: "بريد الكونسيرج",
    replyHour: "نرد خلال ساعة",
    fromAirport: "من مطار أنطاليا",
    perVehicle: "لكل سيارة · سعر ثابت",
    footerTagline: "خدمة سائق خاص في أنحاء الريفييرا التركية.",
    explore: "استكشف",
    information: "معلومات",
    licensed: "مزود نقل خاص مرخص · متوافق مع TÜRSAB",
    quoteReady: "رحلتك الخاصة",
    vehicle: "السيارة",
    journeyTime: "مدة الرحلة",
    totalFixed: "الإجمالي الثابت",
    quoteIncludes:
      "يشمل الاستقبال وتتبع الرحلة ووقوف السيارة و90 دقيقة انتظار ومياه معبأة.",
    confirmWhatsapp: "التأكيد عبر WhatsApp",
    chatWithUs: "تحدث معنا",
    bookNowCta: "احجز الآن",
    backToQuote: "رجوع",
    yourDetails: "بياناتك",
    fullName: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "الهاتف / WhatsApp",
    flightNumber: "رقم الرحلة",
    flightArrivalTime: "وقت الوصول",
    notesLabel: "طلبات خاصة",
    confirmBooking: "تأكيد الحجز",
    bookingConfirmed: "تم تأكيد الحجز",
    referenceLabel: "الرقم المرجعي",
    weWillContact: "تم إرسال طلب حجزك. سنتواصل معك خلال 30 دقيقة.",
    paymentError: "تعذر إتمام الدفع. يرجى المحاولة مرة أخرى.",
  },
};

const paymentTranslations = {

  zh: {
    paymentMethod: "选择付款方式",
    cashPayment: "在车内付款",
    recommended: "推荐",
    cashPaymentDescription:
      "无需在线预付。您在行程开始时以现金向司机支付固定总额。",
    confirmCashBooking: "确认预订 — 在车内付款",
    perVehicleNote: "按每车计算 — 而非按人计算 · 最多6位乘客",
    meetGreetNote: "机场Meet &amp; Greet · 会合点J / 777",
    stepRoute: "路线",
    stepDetails: "详情",
    stepContact: "联系方式",
    reserveForPrice: "预订",
    continue: "继续",
    back: "返回",
    perVehicleNoteVito: "按每车计算 — 而非按人计算 · 最多6位乘客",
    perVehicleNoteSprinter:
      "按每车计算 — 而非按人计算 · 最多12位乘客",
    perVehicle: "固定 · 每车",
    requestQuote: "请求价格报价",
    cashConfirmation:
      "您的预订已确认。您在行程开始时以现金向司机支付固定总额。",
    bookingError: "您的预订未能完成。请重试。",
    chooseTime: "选择时间",
    formIncomplete: "请填写高亮标示的字段。",
    requiredField: "此字段为必填项。",
    destinationRequired: "请选择目的地。",
    dateInvalid: "请选择今天或未来的日期。",
    emailInvalid: "请输入有效的电子邮箱地址。",
    nameInvalid: "请输入有效的全名。",
    phoneInvalid:
      "请输入包含国家代码的有效号码（例如 +49）。",
    flightInvalid: "请输入有效的航班号。",
    pickupAddressRequired:
      "上车地址长度须在6至160个字符之间。",
    dropoffAddress: "完整目的地地址",
    dropoffAddressPlaceholder:
      "酒店名称、街道、门牌号及所在区域",
    dropoffAddressRequired:
      "目的地地址长度须在6至160个字符之间。",
    addressesMustDiffer: "上车地址与目的地地址必须不同。",
    customDestinationPrice:
      "价格将在我们核实目的地地址后确认。",
    hotelNameLabel: "酒店名称",
    hotelNamePlaceholder: "酒店或住宿名称",
    hotelNameRequired: "请输入酒店名称。",
    childSeatLabel: "儿童座椅",
    childSeatNone: "无儿童座椅",
    oneChildSeat: "1个儿童座椅",
    twoChildSeats: "2个儿童座椅",
    threeChildSeats: "3个儿童座椅",
    fourChildSeats: "4个儿童座椅",
  },
  da: {
    paymentMethod: "Vælg betalingsmetode",
    cashPayment: "Betal i køretøjet",
    recommended: "Anbefalet",
    cashPaymentDescription:
      "Ingen online-forudbetaling. Du betaler den faste totalpris kontant til din chauffør ved rejsens begyndelse.",
    confirmCashBooking: "Bekræft booking — betal i køretøjet",
    perVehicleNote: "Pr. køretøj — ikke pr. person · Op til 6 passagerer",
    meetGreetNote: "Lufthavns-Meet &amp; Greet · Mødested J / 777",
    stepRoute: "Rute",
    stepDetails: "Detaljer",
    stepContact: "Kontakt",
    reserveForPrice: "Reserver",
    continue: "Fortsæt",
    back: "Tilbage",
    perVehicleNoteVito: "Pr. køretøj — ikke pr. person · Op til 6 passagerer",
    perVehicleNoteSprinter:
      "Pr. køretøj — ikke pr. person · Op til 12 passagerer",
    perVehicle: "fast · pr. køretøj",
    requestQuote: "Anmod om et pristilbud",
    cashConfirmation:
      "Din booking er bekræftet. Du betaler den faste totalpris kontant til din chauffør ved rejsens begyndelse.",
    bookingError: "Din booking kunne ikke gennemføres. Prøv venligst igen.",
    chooseTime: "Vælg tidspunkt",
    formIncomplete: "Udfyld venligst de fremhævede felter.",
    requiredField: "Dette felt er påkrævet.",
    destinationRequired: "Vælg venligst en destination.",
    dateInvalid: "Vælg venligst i dag eller en fremtidig dato.",
    emailInvalid: "Indtast venligst en gyldig e-mailadresse.",
    nameInvalid: "Indtast venligst et gyldigt fuldt navn.",
    phoneInvalid:
      "Indtast venligst et gyldigt nummer inklusive landekoden (for eksempel +45).",
    flightInvalid: "Indtast venligst et gyldigt flynummer.",
    pickupAddressRequired:
      "Afhentningsadressen skal være mellem 6 og 160 tegn.",
    dropoffAddress: "Fuld destinationsadresse",
    dropoffAddressPlaceholder:
      "Hotelnavn, gade, husnummer og bydel",
    dropoffAddressRequired:
      "Destinationsadressen skal være mellem 6 og 160 tegn.",
    addressesMustDiffer: "Afhentnings- og destinationsadresse skal være forskellige.",
    customDestinationPrice:
      "Prisen bekræftes, efter vi har kontrolleret destinationsadressen.",
    hotelNameLabel: "Hotelnavn",
    hotelNamePlaceholder: "Navn på hotel eller indkvartering",
    hotelNameRequired: "Indtast venligst hotellets navn.",
    childSeatLabel: "Barnesæder",
    childSeatNone: "Intet barnesæde",
    oneChildSeat: "1 barnesæde",
    twoChildSeats: "2 barnesæder",
    threeChildSeats: "3 barnesæder",
    fourChildSeats: "4 barnesæder",
  },
  es: {
    paymentMethod: "Elija el método de pago",
    cashPayment: "Pagar en el vehículo",
    recommended: "Recomendado",
    cashPaymentDescription:
      "Sin pago anticipado online. Paga el total fijo a su chófer en efectivo al inicio del trayecto.",
    confirmCashBooking: "Confirmar reserva — pagar en el vehículo",
    perVehicleNote: "Por vehículo — no por persona · Hasta 6 pasajeros",
    meetGreetNote: "Meet &amp; Greet en el aeropuerto · Punto de encuentro J / 777",
    stepRoute: "Ruta",
    stepDetails: "Detalles",
    stepContact: "Contacto",
    reserveForPrice: "Reservar",
    continue: "Continuar",
    back: "Volver",
    perVehicleNoteVito: "Por vehículo — no por persona · Hasta 6 pasajeros",
    perVehicleNoteSprinter:
      "Por vehículo — no por persona · Hasta 12 pasajeros",
    perVehicle: "fijo · por vehículo",
    requestQuote: "Solicitar un presupuesto",
    cashConfirmation:
      "Su reserva está confirmada. Paga el total fijo a su chófer en efectivo al inicio del trayecto.",
    bookingError: "No se ha podido completar su reserva. Inténtelo de nuevo.",
    chooseTime: "Elija la hora",
    formIncomplete: "Complete los campos resaltados.",
    requiredField: "Este campo es obligatorio.",
    destinationRequired: "Seleccione un destino.",
    dateInvalid: "Elija hoy o una fecha futura.",
    emailInvalid: "Introduzca una dirección de correo electrónico válida.",
    nameInvalid: "Introduzca un nombre completo válido.",
    phoneInvalid:
      "Introduzca un número válido incluyendo el prefijo del país (por ejemplo +49).",
    flightInvalid: "Introduzca un número de vuelo válido.",
    pickupAddressRequired:
      "La dirección de recogida debe tener entre 6 y 160 caracteres.",
    dropoffAddress: "Dirección completa de destino",
    dropoffAddressPlaceholder:
      "Nombre del hotel, calle, número y barrio",
    dropoffAddressRequired:
      "La dirección de destino debe tener entre 6 y 160 caracteres.",
    addressesMustDiffer: "Las direcciones de recogida y de destino deben ser diferentes.",
    customDestinationPrice:
      "El precio se confirmará tras revisar la dirección de destino.",
    hotelNameLabel: "Nombre del hotel",
    hotelNamePlaceholder: "Nombre del hotel o alojamiento",
    hotelNameRequired: "Introduzca el nombre del hotel.",
    childSeatLabel: "Sillas infantiles",
    childSeatNone: "Sin silla infantil",
    oneChildSeat: "1 silla infantil",
    twoChildSeats: "2 sillas infantiles",
    threeChildSeats: "3 sillas infantiles",
    fourChildSeats: "4 sillas infantiles",
  },
  el: {
    paymentMethod: "Επιλέξτε μέθοδο πληρωμής",
    cashPayment: "Πληρωμή στο όχημα",
    recommended: "Προτεινόμενο",
    cashPaymentDescription:
      "Χωρίς online προπληρωμή. Πληρώνετε τη σταθερή συνολική τιμή στον οδηγό σας μετρητοίς στην αρχή της διαδρομής.",
    confirmCashBooking: "Επιβεβαίωση κράτησης — πληρωμή στο όχημα",
    perVehicleNote: "Ανά όχημα — όχι ανά άτομο · Έως 6 επιβάτες",
    meetGreetNote: "Meet &amp; Greet στο αεροδρόμιο · Σημείο συνάντησης J / 777",
    stepRoute: "Διαδρομή",
    stepDetails: "Στοιχεία",
    stepContact: "Επικοινωνία",
    reserveForPrice: "Κράτηση",
    continue: "Συνέχεια",
    back: "Πίσω",
    perVehicleNoteVito: "Ανά όχημα — όχι ανά άτομο · Έως 6 επιβάτες",
    perVehicleNoteSprinter:
      "Ανά όχημα — όχι ανά άτομο · Έως 12 επιβάτες",
    perVehicle: "σταθερή · ανά όχημα",
    requestQuote: "Ζητήστε προσφορά τιμής",
    cashConfirmation:
      "Η κράτησή σας επιβεβαιώθηκε. Πληρώνετε τη σταθερή συνολική τιμή στον οδηγό σας μετρητοίς στην αρχή της διαδρομής.",
    bookingError: "Η κράτησή σας δεν ολοκληρώθηκε. Παρακαλούμε δοκιμάστε ξανά.",
    chooseTime: "Επιλέξτε ώρα",
    formIncomplete: "Παρακαλούμε συμπληρώστε τα επισημασμένα πεδία.",
    requiredField: "Αυτό το πεδίο είναι υποχρεωτικό.",
    destinationRequired: "Παρακαλούμε επιλέξτε προορισμό.",
    dateInvalid: "Παρακαλούμε επιλέξτε τη σημερινή ή μια μελλοντική ημερομηνία.",
    emailInvalid: "Παρακαλούμε εισαγάγετε μια έγκυρη διεύθυνση email.",
    nameInvalid: "Παρακαλούμε εισαγάγετε ένα έγκυρο ονοματεπώνυμο.",
    phoneInvalid:
      "Παρακαλούμε εισαγάγετε έναν έγκυρο αριθμό μαζί με τον κωδικό χώρας (για παράδειγμα +49).",
    flightInvalid: "Παρακαλούμε εισαγάγετε έναν έγκυρο αριθμό πτήσης.",
    pickupAddressRequired:
      "Η διεύθυνση παραλαβής πρέπει να έχει μήκος από 6 έως 160 χαρακτήρες.",
    dropoffAddress: "Πλήρης διεύθυνση προορισμού",
    dropoffAddressPlaceholder:
      "Όνομα ξενοδοχείου, οδός, αριθμός και περιοχή",
    dropoffAddressRequired:
      "Η διεύθυνση προορισμού πρέπει να έχει μήκος από 6 έως 160 χαρακτήρες.",
    addressesMustDiffer: "Οι διευθύνσεις παραλαβής και προορισμού πρέπει να διαφέρουν.",
    customDestinationPrice:
      "Η τιμή θα επιβεβαιωθεί μετά τον έλεγχο της διεύθυνσης προορισμού.",
    hotelNameLabel: "Όνομα ξενοδοχείου",
    hotelNamePlaceholder: "Όνομα ξενοδοχείου ή καταλύματος",
    hotelNameRequired: "Παρακαλούμε εισαγάγετε το όνομα του ξενοδοχείου.",
    childSeatLabel: "Παιδικά καθίσματα",
    childSeatNone: "Χωρίς παιδικό κάθισμα",
    oneChildSeat: "1 παιδικό κάθισμα",
    twoChildSeats: "2 παιδικά καθίσματα",
    threeChildSeats: "3 παιδικά καθίσματα",
    fourChildSeats: "4 παιδικά καθίσματα",
  },
  he: {
    paymentMethod: "בחרו אמצעי תשלום",
    cashPayment: "שלמו ברכב",
    recommended: "מומלץ",
    cashPaymentDescription:
      "ללא תשלום מראש אונליין. אתם משלמים את הסכום הכולל הקבוע לנהג שלכם במזומן בתחילת הנסיעה.",
    confirmCashBooking: "אשרו הזמנה — שלמו ברכב",
    perVehicleNote: "לרכב — לא לאדם · עד 6 נוסעים",
    meetGreetNote: "Meet &amp; Greet בשדה התעופה · נקודת מפגש J / 777",
    stepRoute: "מסלול",
    stepDetails: "פרטים",
    stepContact: "צור קשר",
    reserveForPrice: "שריינו",
    continue: "המשך",
    back: "חזרה",
    perVehicleNoteVito: "לרכב — לא לאדם · עד 6 נוסעים",
    perVehicleNoteSprinter:
      "לרכב — לא לאדם · עד 12 נוסעים",
    perVehicle: "קבוע · לרכב",
    requestQuote: "בקשו הצעת מחיר",
    cashConfirmation:
      "ההזמנה שלכם אושרה. אתם משלמים את הסכום הכולל הקבוע לנהג שלכם במזומן בתחילת הנסיעה.",
    bookingError: "לא ניתן היה להשלים את ההזמנה שלכם. אנא נסו שוב.",
    chooseTime: "בחרו שעה",
    formIncomplete: "אנא מלאו את השדות המסומנים.",
    requiredField: "שדה זה הוא חובה.",
    destinationRequired: "אנא בחרו יעד.",
    dateInvalid: "אנא בחרו את היום או תאריך עתידי.",
    emailInvalid: "אנא הזינו כתובת אימייל תקינה.",
    nameInvalid: "אנא הזינו שם מלא תקין.",
    phoneInvalid:
      "אנא הזינו מספר תקין הכולל את קידומת המדינה (לדוגמה ‎+49).",
    flightInvalid: "אנא הזינו מספר טיסה תקין.",
    pickupAddressRequired:
      "כתובת האיסוף חייבת להיות באורך של בין 6 ל-160 תווים.",
    dropoffAddress: "כתובת יעד מלאה",
    dropoffAddressPlaceholder:
      "שם המלון, רחוב, מספר בית ושכונה",
    dropoffAddressRequired:
      "כתובת היעד חייבת להיות באורך של בין 6 ל-160 תווים.",
    addressesMustDiffer: "כתובת האיסוף וכתובת היעד חייבות להיות שונות.",
    customDestinationPrice:
      "המחיר יאושר לאחר בדיקת כתובת היעד.",
    hotelNameLabel: "שם המלון",
    hotelNamePlaceholder: "שם המלון או מקום הלינה",
    hotelNameRequired: "אנא הזינו את שם המלון.",
    childSeatLabel: "כיסאות בטיחות לילדים",
    childSeatNone: "ללא כיסא בטיחות",
    oneChildSeat: "כיסא בטיחות 1",
    twoChildSeats: "2 כיסאות בטיחות",
    threeChildSeats: "3 כיסאות בטיחות",
    fourChildSeats: "4 כיסאות בטיחות",
  },
  it: {
    paymentMethod: "Scegli il metodo di pagamento",
    cashPayment: "Paga nel veicolo",
    recommended: "Consigliato",
    cashPaymentDescription:
      "Nessun pagamento anticipato online. Paghi l'importo totale fisso al tuo autista in contanti all'inizio del viaggio.",
    confirmCashBooking: "Conferma la prenotazione — paga nel veicolo",
    perVehicleNote: "Per veicolo — non per persona · Fino a 6 passeggeri",
    meetGreetNote: "Meet &amp; Greet in aeroporto · Punto d'incontro J / 777",
    stepRoute: "Tratta",
    stepDetails: "Dettagli",
    stepContact: "Contatti",
    reserveForPrice: "Prenota",
    continue: "Continua",
    back: "Indietro",
    perVehicleNoteVito: "Per veicolo — non per persona · Fino a 6 passeggeri",
    perVehicleNoteSprinter:
      "Per veicolo — non per persona · Fino a 12 passeggeri",
    perVehicle: "fisso · per veicolo",
    requestQuote: "Richiedi un preventivo",
    cashConfirmation:
      "La tua prenotazione è confermata. Paghi l'importo totale fisso al tuo autista in contanti all'inizio del viaggio.",
    bookingError: "Non è stato possibile completare la tua prenotazione. Vi preghiamo di riprovare.",
    chooseTime: "Scegli l'orario",
    formIncomplete: "Vi preghiamo di completare i campi evidenziati.",
    requiredField: "Questo campo è obbligatorio.",
    destinationRequired: "Vi preghiamo di selezionare una destinazione.",
    dateInvalid: "Vi preghiamo di scegliere la data di oggi o una data futura.",
    emailInvalid: "Vi preghiamo di inserire un indirizzo e-mail valido.",
    nameInvalid: "Vi preghiamo di inserire un nome completo valido.",
    phoneInvalid:
      "Vi preghiamo di inserire un numero valido con il prefisso internazionale (ad esempio +49).",
    flightInvalid: "Vi preghiamo di inserire un numero di volo valido.",
    pickupAddressRequired:
      "L'indirizzo di ritiro deve avere una lunghezza compresa tra 6 e 160 caratteri.",
    dropoffAddress: "Indirizzo di destinazione completo",
    dropoffAddressPlaceholder:
      "Nome dell'hotel, via, numero civico e quartiere",
    dropoffAddressRequired:
      "L'indirizzo di destinazione deve avere una lunghezza compresa tra 6 e 160 caratteri.",
    addressesMustDiffer: "L'indirizzo di ritiro e quello di destinazione devono essere diversi.",
    customDestinationPrice:
      "Il prezzo sarà confermato dopo la verifica dell'indirizzo di destinazione.",
    hotelNameLabel: "Nome dell'hotel",
    hotelNamePlaceholder: "Nome dell'hotel o della struttura",
    hotelNameRequired: "Vi preghiamo di inserire il nome dell'hotel.",
    childSeatLabel: "Seggiolini per bambini",
    childSeatNone: "Nessun seggiolino",
    oneChildSeat: "1 seggiolino",
    twoChildSeats: "2 seggiolini",
    threeChildSeats: "3 seggiolini",
    fourChildSeats: "4 seggiolini",
  },
  hu: {
    paymentMethod: "Válasszon fizetési módot",
    cashPayment: "Fizetés a járműben",
    recommended: "Ajánlott",
    cashPaymentDescription:
      "Nincs online előre fizetés. A fix végösszeget készpénzben fizeti sofőrjének az utazás elején.",
    confirmCashBooking: "Foglalás megerősítése — fizetés a járműben",
    perVehicleNote: "Járművenként — nem személyenként · Legfeljebb 6 utas",
    meetGreetNote: "Reptéri Meet &amp; Greet · Találkozási pont J / 777",
    stepRoute: "Útvonal",
    stepDetails: "Részletek",
    stepContact: "Kapcsolat",
    reserveForPrice: "Foglalás",
    continue: "Tovább",
    back: "Vissza",
    perVehicleNoteVito: "Járművenként — nem személyenként · Legfeljebb 6 utas",
    perVehicleNoteSprinter:
      "Járművenként — nem személyenként · Legfeljebb 12 utas",
    perVehicle: "fix · járművenként",
    requestQuote: "Árajánlat kérése",
    cashConfirmation:
      "Foglalása megerősítve. A fix végösszeget készpénzben fizeti sofőrjének az utazás elején.",
    bookingError: "Foglalását nem sikerült véglegesíteni. Kérjük, próbálja újra.",
    chooseTime: "Válasszon időpontot",
    formIncomplete: "Kérjük, töltse ki a kiemelt mezőket.",
    requiredField: "Ez a mező kötelező.",
    destinationRequired: "Kérjük, válasszon úti célt.",
    dateInvalid: "Kérjük, válassza a mai vagy egy jövőbeli dátumot.",
    emailInvalid: "Kérjük, adjon meg egy érvényes e-mail-címet.",
    nameInvalid: "Kérjük, adjon meg egy érvényes teljes nevet.",
    phoneInvalid:
      "Kérjük, adjon meg egy érvényes számot az országhívószámmal együtt (például +49).",
    flightInvalid: "Kérjük, adjon meg egy érvényes járatszámot.",
    pickupAddressRequired:
      "A felvételi címnek 6 és 160 karakter között kell lennie.",
    dropoffAddress: "Teljes úti cél cím",
    dropoffAddressPlaceholder:
      "Hotel neve, utca, házszám és városrész",
    dropoffAddressRequired:
      "Az úti cél címének 6 és 160 karakter között kell lennie.",
    addressesMustDiffer: "A felvételi és az úti cél címének különböznie kell.",
    customDestinationPrice:
      "Az árat az úti cél címének ellenőrzése után erősítjük meg.",
    hotelNameLabel: "Hotel neve",
    hotelNamePlaceholder: "Hotel vagy szálláshely neve",
    hotelNameRequired: "Kérjük, adja meg a hotel nevét.",
    childSeatLabel: "Gyerekülések",
    childSeatNone: "Nincs gyerekülés",
    oneChildSeat: "1 gyerekülés",
    twoChildSeats: "2 gyerekülés",
    threeChildSeats: "3 gyerekülés",
    fourChildSeats: "4 gyerekülés",
  },
  pt: {
    paymentMethod: "Escolher método de pagamento",
    cashPayment: "Pagar no veículo",
    recommended: "Recomendado",
    cashPaymentDescription:
      "Sem pagamento antecipado online. Paga o valor total fixo ao seu motorista em dinheiro no início da viagem.",
    confirmCashBooking: "Confirmar reserva — pagar no veículo",
    perVehicleNote: "Por veículo — não por pessoa · Até 6 passageiros",
    meetGreetNote: "Meet &amp; Greet no aeroporto · Ponto de encontro J / 777",
    stepRoute: "Rota",
    stepDetails: "Detalhes",
    stepContact: "Contacto",
    reserveForPrice: "Reservar",
    continue: "Continuar",
    back: "Voltar",
    perVehicleNoteVito: "Por veículo — não por pessoa · Até 6 passageiros",
    perVehicleNoteSprinter:
      "Por veículo — não por pessoa · Até 12 passageiros",
    perVehicle: "fixo · por veículo",
    requestQuote: "Pedir um orçamento",
    cashConfirmation:
      "A sua reserva está confirmada. Paga o valor total fixo ao seu motorista em dinheiro no início da viagem.",
    bookingError: "Não foi possível concluir a sua reserva. Tente novamente.",
    chooseTime: "Escolher hora",
    formIncomplete: "Preencha os campos assinalados.",
    requiredField: "Este campo é obrigatório.",
    destinationRequired: "Selecione um destino.",
    dateInvalid: "Escolha a data de hoje ou uma data futura.",
    emailInvalid: "Introduza um endereço de e-mail válido.",
    nameInvalid: "Introduza um nome completo válido.",
    phoneInvalid:
      "Introduza um número válido, incluindo o indicativo do país (por exemplo +49).",
    flightInvalid: "Introduza um número de voo válido.",
    pickupAddressRequired:
      "A morada de recolha deve ter entre 6 e 160 caracteres.",
    dropoffAddress: "Morada de destino completa",
    dropoffAddressPlaceholder:
      "Nome do hotel, rua, número e bairro",
    dropoffAddressRequired:
      "A morada de destino deve ter entre 6 e 160 caracteres.",
    addressesMustDiffer: "As moradas de recolha e de destino devem ser diferentes.",
    customDestinationPrice:
      "O preço será confirmado após verificação da morada de destino.",
    hotelNameLabel: "Nome do hotel",
    hotelNamePlaceholder: "Nome do hotel ou alojamento",
    hotelNameRequired: "Introduza o nome do hotel.",
    childSeatLabel: "Cadeiras para crianças",
    childSeatNone: "Sem cadeira para crianças",
    oneChildSeat: "1 cadeira para crianças",
    twoChildSeats: "2 cadeiras para crianças",
    threeChildSeats: "3 cadeiras para crianças",
    fourChildSeats: "4 cadeiras para crianças",
  },
  ro: {
    paymentMethod: "Alegeți metoda de plată",
    cashPayment: "Plătiți în vehicul",
    recommended: "Recomandat",
    cashPaymentDescription:
      "Fără plată online în avans. Plătiți suma totală fixă șoferului în numerar la începutul călătoriei.",
    confirmCashBooking: "Confirmă rezervarea — plată în vehicul",
    perVehicleNote: "Per vehicul — nu per persoană · Până la 6 pasageri",
    meetGreetNote: "Meet &amp; Greet la aeroport · Punct de întâlnire J / 777",
    stepRoute: "Rută",
    stepDetails: "Detalii",
    stepContact: "Contact",
    reserveForPrice: "Rezervă",
    continue: "Continuă",
    back: "Înapoi",
    perVehicleNoteVito: "Per vehicul — nu per persoană · Până la 6 pasageri",
    perVehicleNoteSprinter:
      "Per vehicul — nu per persoană · Până la 12 pasageri",
    perVehicle: "fix · per vehicul",
    requestQuote: "Solicitați o ofertă de preț",
    cashConfirmation:
      "Rezervarea dumneavoastră este confirmată. Plătiți suma totală fixă șoferului în numerar la începutul călătoriei.",
    bookingError: "Rezervarea dumneavoastră nu a putut fi finalizată. Vă rugăm să încercați din nou.",
    chooseTime: "Alegeți ora",
    formIncomplete: "Vă rugăm să completați câmpurile evidențiate.",
    requiredField: "Acest câmp este obligatoriu.",
    destinationRequired: "Vă rugăm să selectați o destinație.",
    dateInvalid: "Vă rugăm să alegeți data de azi sau o dată viitoare.",
    emailInvalid: "Vă rugăm să introduceți o adresă de e-mail validă.",
    nameInvalid: "Vă rugăm să introduceți un nume complet valid.",
    phoneInvalid:
      "Vă rugăm să introduceți un număr valid, inclusiv prefixul de țară (de exemplu +49).",
    flightInvalid: "Vă rugăm să introduceți un număr de zbor valid.",
    pickupAddressRequired:
      "Adresa de preluare trebuie să aibă între 6 și 160 de caractere.",
    dropoffAddress: "Adresa completă de destinație",
    dropoffAddressPlaceholder:
      "Numele hotelului, strada, numărul clădirii și cartierul",
    dropoffAddressRequired:
      "Adresa de destinație trebuie să aibă între 6 și 160 de caractere.",
    addressesMustDiffer: "Adresa de preluare și cea de destinație trebuie să fie diferite.",
    customDestinationPrice:
      "Prețul va fi confirmat după verificarea adresei de destinație.",
    hotelNameLabel: "Numele hotelului",
    hotelNamePlaceholder: "Numele hotelului sau al cazării",
    hotelNameRequired: "Vă rugăm să introduceți numele hotelului.",
    childSeatLabel: "Scaune pentru copii",
    childSeatNone: "Fără scaun pentru copil",
    oneChildSeat: "1 scaun pentru copil",
    twoChildSeats: "2 scaune pentru copii",
    threeChildSeats: "3 scaune pentru copii",
    fourChildSeats: "4 scaune pentru copii",
  },

  en: {
    paymentMethod: "Choose payment method",
    cashPayment: "Pay in the vehicle",
    recommended: "Recommended",
    cashPaymentDescription:
      "No online prepayment. You pay the fixed total to your driver in cash at the start of the journey.",
    confirmCashBooking: "Confirm booking — pay in vehicle",
    perVehicleNote: "Per vehicle — not per person · Up to 6 passengers",
    meetGreetNote: "Airport Meet &amp; Greet · Meeting point J / 777",
    stepRoute: "Route",
    stepDetails: "Details",
    stepContact: "Contact",
    reserveForPrice: "Reserve",
    continue: "Continue",
    back: "Back",
    perVehicleNoteVito: "Per vehicle — not per person · Up to 6 passengers",
    perVehicleNoteSprinter:
      "Per vehicle — not per person · Up to 12 passengers",
    perVehicle: "fixed · per vehicle",
    requestQuote: "Request a price quote",
    cashConfirmation:
      "Your booking is confirmed. You pay the fixed total to your driver in cash at the start of the journey.",
    bookingError: "Your booking could not be completed. Please try again.",
    chooseTime: "Choose time",
    formIncomplete: "Please complete the highlighted fields.",
    requiredField: "This field is required.",
    destinationRequired: "Please select a destination.",
    dateInvalid: "Please choose today or a future date.",
    emailInvalid: "Please enter a valid email address.",
    nameInvalid: "Please enter a valid full name.",
    phoneInvalid:
      "Please enter a valid number including the country code (for example +49).",
    flightInvalid: "Please enter a valid flight number.",
    pickupAddressRequired:
      "The pick-up address must be between 6 and 160 characters.",
    dropoffAddress: "Full drop-off address",
    dropoffAddressPlaceholder:
      "Hotel name, street, building number and district",
    dropoffAddressRequired:
      "The drop-off address must be between 6 and 160 characters.",
    addressesMustDiffer: "Pick-up and drop-off addresses must be different.",
    customDestinationPrice:
      "The price will be confirmed after we check the drop-off address.",
    hotelNameLabel: "Hotel name",
    hotelNamePlaceholder: "Hotel or accommodation name",
    hotelNameRequired: "Please enter the hotel name.",
    childSeatLabel: "Child seats",
    childSeatNone: "No child seat",
    oneChildSeat: "1 child seat",
    twoChildSeats: "2 child seats",
    threeChildSeats: "3 child seats",
    fourChildSeats: "4 child seats",
  },
  de: {
    paymentMethod: "Zahlungsart wählen",
    cashPayment: "Im Fahrzeug bezahlen",
    recommended: "Empfohlen",
    cashPaymentDescription:
      "Keine Online-Vorauszahlung. Den Festpreis zahlen Sie zu Beginn der Fahrt bar an Ihren Chauffeur.",
    confirmCashBooking: "Buchung bestätigen — im Fahrzeug zahlen",
    perVehicleNote: "Pro Fahrzeug — nicht pro Person · Bis zu 6 Personen",
    meetGreetNote: "Airport Meet &amp; Greet · Treffpunkt J / 777",
    stepRoute: "Route",
    stepDetails: "Details",
    stepContact: "Kontakt",
    continue: "Weiter",
    back: "Zurück",
    reserveForPrice: "Reservieren",
    perVehicleNoteVito: "Pro Fahrzeug — nicht pro Person · Bis zu 6 Personen",
    perVehicleNoteSprinter:
      "Pro Fahrzeug — nicht pro Person · Bis zu 12 Personen",
    requestQuote: "Preisangebot anfordern",
    cashConfirmation:
      "Ihre Buchung ist bestätigt. Den Festpreis zahlen Sie zu Beginn der Fahrt bar an Ihren Chauffeur.",
    bookingError:
      "Ihre Buchung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
    chooseTime: "Uhrzeit wählen",
    formIncomplete: "Bitte füllen Sie die markierten Felder aus.",
    requiredField: "Dieses Feld ist erforderlich.",
    destinationRequired: "Bitte wählen Sie ein Ziel.",
    dateInvalid: "Bitte wählen Sie heute oder ein zukünftiges Datum.",
    emailInvalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    nameInvalid: "Bitte geben Sie einen gültigen vollständigen Namen ein.",
    phoneInvalid:
      "Bitte geben Sie eine gültige Nummer mit Ländervorwahl ein (zum Beispiel +49).",
    flightInvalid: "Bitte geben Sie eine gültige Flugnummer ein.",
    pickupAddressRequired:
      "Die Abholadresse muss zwischen 6 und 160 Zeichen lang sein.",
    dropoffAddressRequired:
      "Die Zieladresse muss zwischen 6 und 160 Zeichen lang sein.",
    addressesMustDiffer: "Abhol- und Zieladresse müssen unterschiedlich sein.",
    customDestinationPrice:
      "Der Preis wird nach Prüfung der Zieladresse bestätigt.",
    hotelNameLabel: "Hotelname",
    hotelNamePlaceholder: "Hotel- oder Unterkunftsname",
    hotelNameRequired: "Bitte geben Sie den Hotelnamen ein.",
    childSeatLabel: "Kindersitze",
    childSeatNone: "Kein Kindersitz",
    oneChildSeat: "1 Kindersitz",
    twoChildSeats: "2 Kindersitze",
    threeChildSeats: "3 Kindersitze",
    fourChildSeats: "4 Kindersitze",
  },
  tr: {
    paymentMethod: "Ödeme yöntemini seçin",
    cashPayment: "Araçta öde",
    recommended: "Önerilen",
    cashPaymentDescription:
      "Online ön ödeme yok. Sabit tutarı yolculuğun başında şoförünüze nakit olarak ödersiniz.",
    confirmCashBooking: "Rezervasyonu onayla — araçta öde",
    perVehicleNote: "Araç başına — kişi başına değil · 6 yolcuya kadar",
    meetGreetNote: "Havalimanı Karşılama · Buluşma noktası J / 777",
    stepRoute: "Rota",
    stepDetails: "Detaylar",
    stepContact: "İletişim",
    continue: "Devam",
    back: "Geri",
    reserveForPrice: "Rezerve et",
    perVehicleNoteVito: "Araç başına — kişi başına değil · 6 yolcuya kadar",
    perVehicleNoteSprinter:
      "Araç başına — kişi başına değil · 12 yolcuya kadar",
    requestQuote: "Fiyat teklifi al",
    cashConfirmation:
      "Rezervasyonunuz onaylandı. Sabit toplam tutarı yolculuğun başında şoförünüze nakit olarak ödersiniz.",
    bookingError: "Rezervasyonunuz tamamlanamadı. Lütfen tekrar deneyin.",
    chooseTime: "Saat seçin",
    formIncomplete: "Lütfen işaretli alanları doldurun.",
    requiredField: "Bu alan zorunludur.",
    destinationRequired: "Lütfen bir varış noktası seçin.",
    dateInvalid: "Lütfen bugünü veya gelecekteki bir tarihi seçin.",
    emailInvalid: "Lütfen geçerli bir e-posta adresi girin.",
    nameInvalid: "Lütfen geçerli bir ad soyad girin.",
    phoneInvalid:
      "Lütfen ülke koduyla birlikte geçerli bir numara girin (örneğin +49).",
    flightInvalid: "Lütfen geçerli bir uçuş numarası girin.",
    pickupAddressRequired: "Alış adresi 6–160 karakter arasında olmalıdır.",
    dropoffAddressRequired: "Varış adresi 6–160 karakter arasında olmalıdır.",
    addressesMustDiffer: "Alış ve varış adresleri farklı olmalıdır.",
    customDestinationPrice:
      "Fiyat, varış adresi kontrol edildikten sonra teyit edilecektir.",
    hotelNameLabel: "Otel ismi",
    hotelNamePlaceholder: "Otel veya konaklama adı",
    hotelNameRequired: "Lütfen otel ismini girin.",
    childSeatLabel: "Çocuk koltuğu",
    childSeatNone: "Çocuk koltuğu istemiyorum",
    oneChildSeat: "1 çocuk koltuğu",
    twoChildSeats: "2 çocuk koltuğu",
    threeChildSeats: "3 çocuk koltuğu",
    fourChildSeats: "4 çocuk koltuğu",
  },
  ru: {
    paymentMethod: "Выберите способ оплаты",
    cashPayment: "Оплата в автомобиле",
    recommended: "Рекомендуем",
    cashPaymentDescription:
      "Без предоплаты онлайн. Фиксированную сумму вы передаёте водителю наличными в начале поездки.",
    confirmCashBooking: "Подтвердить — оплата в автомобиле",
    perVehicleNote: "За автомобиль — не за человека · До 6 пассажиров",
    meetGreetNote: "Встреча в аэропорту · Пункт встречи J / 777",
    stepRoute: "Маршрут",
    stepDetails: "Детали",
    stepContact: "Контакты",
    continue: "Продолжить",
    back: "Назад",
    reserveForPrice: "Забронировать",
    perVehicleNoteVito: "За автомобиль — не за человека · До 6 пассажиров",
    perVehicleNoteSprinter: "За автомобиль — не за человека · До 12 пассажиров",
    requestQuote: "Запросить расчёт",
    cashConfirmation:
      "Ваше бронирование подтверждено. Фиксированную сумму вы передадите водителю наличными в начале поездки.",
    bookingError: "Не удалось завершить бронирование. Попробуйте ещё раз.",
    chooseTime: "Выберите время",
    formIncomplete: "Заполните выделенные поля.",
    requiredField: "Это поле обязательно.",
    destinationRequired: "Выберите направление.",
    dateInvalid: "Выберите сегодняшнюю или будущую дату.",
    emailInvalid: "Введите действительный адрес электронной почты.",
    nameInvalid: "Введите действительное полное имя.",
    phoneInvalid:
      "Введите действительный номер с кодом страны (например, +49).",
    flightInvalid: "Введите действительный номер рейса.",
    pickupAddressRequired:
      "Адрес подачи должен содержать от 6 до 160 символов.",
    dropoffAddressRequired:
      "Адрес назначения должен содержать от 6 до 160 символов.",
    addressesMustDiffer: "Адреса подачи и назначения должны отличаться.",
    customDestinationPrice:
      "Цена будет подтверждена после проверки адреса назначения.",
    hotelNameLabel: "Название отеля",
    hotelNamePlaceholder: "Название отеля или места проживания",
    hotelNameRequired: "Введите название отеля.",
    childSeatLabel: "Детские кресла",
    childSeatNone: "Без детского кресла",
    oneChildSeat: "1 детское кресло",
    twoChildSeats: "2 детских кресла",
    threeChildSeats: "3 детских кресла",
    fourChildSeats: "4 детских кресла",
  },
  pl: {
    paymentMethod: "Wybierz metodę płatności",
    cashPayment: "Zapłać w pojeździe",
    recommended: "Polecane",
    cashPaymentDescription:
      "Bez przedpłaty online. Stałą kwotę przekazujesz kierowcy gotówką na początku podróży.",
    confirmCashBooking: "Potwierdź — zapłać w pojeździe",
    stepRoute: "Trasa",
    stepDetails: "Szczegóły",
    stepContact: "Kontakt",
    continue: "Dalej",
    back: "Wstecz",
    reserveForPrice: "Zarezerwuj",
    perVehicleNote: "Za pojazd — nie za osobę · Do 6 pasażerów",
    perVehicleNoteVito: "Za pojazd — nie za osobę · Do 6 pasażerów",
    perVehicleNoteSprinter: "Za pojazd — nie za osobę · Do 12 pasażerów",
    requestQuote: "Poproś o wycenę",
    cashConfirmation:
      "Twoja rezerwacja jest potwierdzona. Stałą kwotę przekażesz kierowcy gotówką na początku podróży.",
    bookingError: "Nie udało się dokończyć rezerwacji. Spróbuj ponownie.",
    chooseTime: "Wybierz godzinę",
    formIncomplete: "Uzupełnij zaznaczone pola.",
    requiredField: "To pole jest wymagane.",
    destinationRequired: "Wybierz cel podróży.",
    dateInvalid: "Wybierz dzisiejszą lub przyszłą datę.",
    emailInvalid: "Wprowadź prawidłowy adres e-mail.",
    nameInvalid: "Wprowadź prawidłowe imię i nazwisko.",
    phoneInvalid: "Wprowadź prawidłowy numer z kodem kraju (na przykład +49).",
    flightInvalid: "Wprowadź prawidłowy numer lotu.",
    pickupAddressRequired: "Adres odbioru musi mieć od 6 do 160 znaków.",
    dropoffAddressRequired: "Adres docelowy musi mieć od 6 do 160 znaków.",
    addressesMustDiffer: "Adres odbioru i adres docelowy muszą być różne.",
    customDestinationPrice:
      "Cena zostanie potwierdzona po sprawdzeniu adresu docelowego.",
    hotelNameLabel: "Nazwa hotelu",
    hotelNamePlaceholder: "Nazwa hotelu lub zakwaterowania",
    hotelNameRequired: "Wprowadź nazwę hotelu.",
    childSeatLabel: "Foteliki dziecięce",
    childSeatNone: "Bez fotelika dziecięcego",
    oneChildSeat: "1 fotelik dziecięcy",
    twoChildSeats: "2 foteliki dziecięce",
    threeChildSeats: "3 foteliki dziecięce",
    fourChildSeats: "4 foteliki dziecięce",
  },
  nl: {
    paymentMethod: "Kies betaalmethode",
    cashPayment: "Betaal in het voertuig",
    recommended: "Aanbevolen",
    cashPaymentDescription:
      "Geen online vooruitbetaling. U betaalt het vaste bedrag contant aan uw chauffeur bij aanvang van de rit.",
    confirmCashBooking: "Bevestig — betaal in het voertuig",
    stepRoute: "Route",
    stepDetails: "Details",
    stepContact: "Contact",
    continue: "Verder",
    back: "Terug",
    reserveForPrice: "Reserveren",
    perVehicleNote: "Per voertuig — niet per persoon · Tot 6 passagiers",
    perVehicleNoteVito: "Per voertuig — niet per persoon · Tot 6 passagiers",
    perVehicleNoteSprinter:
      "Per voertuig — niet per persoon · Tot 12 passagiers",
    requestQuote: "Prijsopgave aanvragen",
    cashConfirmation:
      "Uw boeking is bevestigd. U betaalt het vaste bedrag contant aan uw chauffeur bij aanvang van de rit.",
    bookingError: "Uw boeking kon niet worden voltooid. Probeer het opnieuw.",
    chooseTime: "Kies tijd",
    formIncomplete: "Vul de gemarkeerde velden in.",
    requiredField: "Dit veld is verplicht.",
    destinationRequired: "Kies een bestemming.",
    dateInvalid: "Kies vandaag of een toekomstige datum.",
    emailInvalid: "Voer een geldig e-mailadres in.",
    nameInvalid: "Voer een geldige volledige naam in.",
    phoneInvalid: "Voer een geldig nummer met landcode in (bijvoorbeeld +49).",
    flightInvalid: "Voer een geldig vluchtnummer in.",
    pickupAddressRequired:
      "Het ophaaladres moet tussen 6 en 160 tekens lang zijn.",
    dropoffAddressRequired:
      "Het bestemmingsadres moet tussen 6 en 160 tekens lang zijn.",
    addressesMustDiffer: "Het ophaal- en bestemmingsadres moeten verschillen.",
    customDestinationPrice:
      "De prijs wordt bevestigd na controle van het bestemmingsadres.",
    hotelNameLabel: "Hotelnaam",
    hotelNamePlaceholder: "Naam van hotel of accommodatie",
    hotelNameRequired: "Voer de hotelnaam in.",
    childSeatLabel: "Kinderzitjes",
    childSeatNone: "Geen kinderzitje",
    oneChildSeat: "1 kinderzitje",
    twoChildSeats: "2 kinderzitjes",
    threeChildSeats: "3 kinderzitjes",
    fourChildSeats: "4 kinderzitjes",
  },
  uk: {
    paymentMethod: "Оберіть спосіб оплати",
    cashPayment: "Оплата в автомобілі",
    recommended: "Рекомендуємо",
    cashPaymentDescription:
      "Без онлайн-передоплати. Фіксовану суму ви передаєте водієві готівкою на початку поїздки.",
    confirmCashBooking: "Підтвердити — оплата в автомобілі",
    stepRoute: "Маршрут",
    stepDetails: "Деталі",
    stepContact: "Контакт",
    continue: "Продовжити",
    back: "Назад",
    reserveForPrice: "Забронювати",
    perVehicleNote: "За автомобіль — не за особу · До 6 пасажирів",
    perVehicleNoteVito: "За автомобіль — не за особу · До 6 пасажирів",
    perVehicleNoteSprinter: "За автомобіль — не за особу · До 12 пасажирів",
    requestQuote: "Запросити розрахунок",
    cashConfirmation:
      "Ваше бронювання підтверджено. Фіксовану суму ви передасте водієві готівкою на початку поїздки.",
    bookingError: "Не вдалося завершити бронювання. Спробуйте ще раз.",
    chooseTime: "Оберіть час",
    formIncomplete: "Заповніть виділені поля.",
    requiredField: "Це поле обов'язкове.",
    destinationRequired: "Оберіть напрямок.",
    dateInvalid: "Оберіть сьогоднішню або майбутню дату.",
    emailInvalid: "Введіть дійсну електронну адресу.",
    nameInvalid: "Введіть дійсне повне ім'я.",
    phoneInvalid: "Введіть дійсний номер із кодом країни (наприклад, +49).",
    flightInvalid: "Введіть дійсний номер рейсу.",
    pickupAddressRequired: "Адреса подачі має містити від 6 до 160 символів.",
    dropoffAddressRequired:
      "Адреса призначення має містити від 6 до 160 символів.",
    addressesMustDiffer: "Адреси подачі та призначення мають відрізнятися.",
    customDestinationPrice:
      "Ціна буде підтверджена після перевірки адреси призначення.",
    hotelNameLabel: "Назва готелю",
    hotelNamePlaceholder: "Назва готелю або місця проживання",
    hotelNameRequired: "Введіть назву готелю.",
    childSeatLabel: "Дитячі крісла",
    childSeatNone: "Без дитячого крісла",
    oneChildSeat: "1 дитяче крісло",
    twoChildSeats: "2 дитячі крісла",
    threeChildSeats: "3 дитячі крісла",
    fourChildSeats: "4 дитячі крісла",
  },
  fr: {
    paymentMethod: "Choisissez le mode de paiement",
    cashPayment: "Payer dans le véhicule",
    recommended: "Recommandé",
    cashPaymentDescription:
      "Aucun prépaiement en ligne. Vous réglez le prix fixe en espèces à votre chauffeur au début du trajet.",
    confirmCashBooking: "Confirmer — payer dans le véhicule",
    stepRoute: "Trajet",
    stepDetails: "Détails",
    stepContact: "Contact",
    continue: "Continuer",
    back: "Retour",
    reserveForPrice: "Réserver",
    perVehicleNote: "Par véhicule — non par personne · Jusqu'à 6 passagers",
    perVehicleNoteVito: "Par véhicule — non par personne · Jusqu'à 6 passagers",
    perVehicleNoteSprinter:
      "Par véhicule — non par personne · Jusqu'à 12 passagers",
    requestQuote: "Demander un devis",
    cashConfirmation:
      "Votre réservation est confirmée. Vous réglerez le prix fixe en espèces à votre chauffeur au début du trajet.",
    bookingError:
      "Votre réservation n'a pas pu être finalisée. Veuillez réessayer.",
    chooseTime: "Choisir l'heure",
    formIncomplete: "Veuillez compléter les champs indiqués.",
    requiredField: "Ce champ est obligatoire.",
    destinationRequired: "Veuillez choisir une destination.",
    dateInvalid: "Veuillez choisir aujourd'hui ou une date future.",
    emailInvalid: "Veuillez saisir une adresse e-mail valide.",
    nameInvalid: "Veuillez saisir un nom complet valide.",
    phoneInvalid:
      "Saisissez un numéro valide avec l’indicatif du pays (par exemple +49).",
    flightInvalid: "Veuillez saisir un numéro de vol valide.",
    pickupAddressRequired:
      "L'adresse de prise en charge doit contenir entre 6 et 160 caractères.",
    dropoffAddressRequired:
      "L'adresse de destination doit contenir entre 6 et 160 caractères.",
    addressesMustDiffer:
      "Les adresses de prise en charge et de destination doivent être différentes.",
    customDestinationPrice:
      "Le prix sera confirmé après vérification de l'adresse de destination.",
    hotelNameLabel: "Nom de l'hôtel",
    hotelNamePlaceholder: "Nom de l'hôtel ou de l'hébergement",
    hotelNameRequired: "Veuillez saisir le nom de l'hôtel.",
    childSeatLabel: "Sièges enfant",
    childSeatNone: "Aucun siège enfant",
    oneChildSeat: "1 siège enfant",
    twoChildSeats: "2 sièges enfant",
    threeChildSeats: "3 sièges enfant",
    fourChildSeats: "4 sièges enfant",
  },
  sv: {
    paymentMethod: "Välj betalningsmetod",
    cashPayment: "Betala i fordonet",
    recommended: "Rekommenderas",
    cashPaymentDescription:
      "Ingen förskottsbetalning online. Du betalar det fasta beloppet kontant till chauffören när resan börjar.",
    confirmCashBooking: "Bekräfta — betala i fordonet",
    stepRoute: "Rutt",
    stepDetails: "Detaljer",
    stepContact: "Kontakt",
    continue: "Fortsätt",
    back: "Tillbaka",
    reserveForPrice: "Boka",
    perVehicleNote: "Per fordon — inte per person · Upp till 6 passagerare",
    perVehicleNoteVito: "Per fordon — inte per person · Upp till 6 passagerare",
    perVehicleNoteSprinter:
      "Per fordon — inte per person · Upp till 12 passagerare",
    requestQuote: "Begär prisuppgift",
    cashConfirmation:
      "Din bokning är bekräftad. Du betalar det fasta beloppet kontant till chauffören när resan börjar.",
    bookingError: "Bokningen kunde inte slutföras. Försök igen.",
    chooseTime: "Välj tid",
    formIncomplete: "Fyll i de markerade fälten.",
    requiredField: "Detta fält är obligatoriskt.",
    destinationRequired: "Välj en destination.",
    dateInvalid: "Välj dagens datum eller ett framtida datum.",
    emailInvalid: "Ange en giltig e-postadress.",
    nameInvalid: "Ange ett giltigt fullständigt namn.",
    phoneInvalid: "Ange ett giltigt nummer med landskod (till exempel +49).",
    flightInvalid: "Ange ett giltigt flightnummer.",
    pickupAddressRequired:
      "Hämtningsadressen måste vara mellan 6 och 160 tecken.",
    dropoffAddressRequired:
      "Destinationsadressen måste vara mellan 6 och 160 tecken.",
    addressesMustDiffer:
      "Hämtnings- och destinationsadressen måste vara olika.",
    customDestinationPrice:
      "Priset bekräftas efter att destinationsadressen kontrollerats.",
    hotelNameLabel: "Hotellnamn",
    hotelNamePlaceholder: "Hotell- eller boendenamn",
    hotelNameRequired: "Ange hotellnamnet.",
    childSeatLabel: "Barnstolar",
    childSeatNone: "Ingen barnstol",
    oneChildSeat: "1 barnstol",
    twoChildSeats: "2 barnstolar",
    threeChildSeats: "3 barnstolar",
    fourChildSeats: "4 barnstolar",
  },
  ja: {
    paymentMethod: "お支払い方法を選択",
    cashPayment: "車内で支払う",
    recommended: "おすすめ",
    cashPaymentDescription: "オンラインでの事前決済はありません。定額料金はご乗車時にドライバーへ現金でお支払いいただきます。",
    confirmCashBooking: "予約確定 — 車内払い",
    stepRoute: "ルート",
    stepDetails: "詳細",
    stepContact: "連絡先",
    continue: "続ける",
    back: "戻る",
    reserveForPrice: "予約する",
    perVehicleNote: "1台あたり — 1人あたりではありません · 最大6名",
    perVehicleNoteVito: "1台あたり — 1人あたりではありません · 最大6名",
    perVehicleNoteSprinter: "1台あたり — 1人あたりではありません · 最大12名",
    requestQuote: "見積もりを依頼",
    cashConfirmation: "ご予約が確定しました。定額料金はご乗車時にドライバーへ現金でお支払いください。",
    bookingError: "予約を完了できませんでした。もう一度お試しください。",
    chooseTime: "時間を選択",
    formIncomplete: "表示された必須項目を入力してください。",
    requiredField: "この項目は必須です。",
    destinationRequired: "目的地を選択してください。",
    dateInvalid: "今日または今後の日付を選択してください。",
    emailInvalid: "有効なメールアドレスを入力してください。",
    nameInvalid: "有効な氏名を入力してください。",
    phoneInvalid: "国番号を含む有効な電話番号を入力してください（例：+49）。",
    flightInvalid: "有効なフライト番号を入力してください。",
    pickupAddressRequired:
      "お迎え先の住所は6文字以上160文字以内で入力してください。",
    dropoffAddressRequired:
      "目的地の住所は6文字以上160文字以内で入力してください。",
    addressesMustDiffer: "お迎え先と目的地には異なる住所を入力してください。",
    customDestinationPrice: "目的地の住所を確認後、料金をご案内いたします。",
    hotelNameLabel: "ホテル名",
    hotelNamePlaceholder: "ホテルまたは宿泊施設名",
    hotelNameRequired: "ホテル名を入力してください。",
    childSeatLabel: "チャイルドシート",
    childSeatNone: "チャイルドシート不要",
    oneChildSeat: "チャイルドシート 1台",
    twoChildSeats: "チャイルドシート 2台",
    threeChildSeats: "チャイルドシート 3台",
    fourChildSeats: "チャイルドシート 4台",
  },
  ko: {
    paymentMethod: "결제 방법 선택",
    cashPayment: "차량에서 결제",
    recommended: "추천",
    cashPaymentDescription: "온라인 선결제가 없습니다. 고정 요금은 출발할 때 기사에게 현금으로 결제하시면 됩니다.",
    confirmCashBooking: "예약 확정 — 차량에서 결제",
    stepRoute: "경로",
    stepDetails: "세부 정보",
    stepContact: "연락처",
    continue: "계속",
    back: "뒤로",
    reserveForPrice: "예약하기",
    perVehicleNote: "차량 기준 — 1인 기준 아님 · 최대 6명",
    perVehicleNoteVito: "차량 기준 — 1인 기준 아님 · 최대 6명",
    perVehicleNoteSprinter: "차량 기준 — 1인 기준 아님 · 최대 12명",
    requestQuote: "견적 요청",
    cashConfirmation: "예약이 확정되었습니다. 고정 요금은 출발할 때 기사에게 현금으로 결제해 주십시오.",
    bookingError: "예약을 완료하지 못했습니다. 다시 시도해 주세요.",
    chooseTime: "시간 선택",
    formIncomplete: "표시된 필수 항목을 입력해 주세요.",
    requiredField: "필수 입력 항목입니다.",
    destinationRequired: "목적지를 선택해 주세요.",
    dateInvalid: "오늘 또는 이후 날짜를 선택해 주세요.",
    emailInvalid: "올바른 이메일 주소를 입력해 주세요.",
    nameInvalid: "올바른 전체 이름을 입력해 주세요.",
    phoneInvalid: "국가 코드를 포함한 올바른 번호를 입력해 주세요(예: +49).",
    flightInvalid: "올바른 항공편 번호를 입력해 주세요.",
    pickupAddressRequired: "픽업 주소는 6자 이상 160자 이하로 입력해 주세요.",
    dropoffAddressRequired:
      "목적지 주소는 6자 이상 160자 이하로 입력해 주세요.",
    addressesMustDiffer: "픽업 주소와 목적지 주소는 달라야 합니다.",
    customDestinationPrice: "목적지 주소 확인 후 가격이 확정됩니다.",
    hotelNameLabel: "호텔명",
    hotelNamePlaceholder: "호텔 또는 숙소 이름",
    hotelNameRequired: "호텔명을 입력해 주세요.",
    childSeatLabel: "어린이 좌석",
    childSeatNone: "어린이 좌석 없음",
    oneChildSeat: "어린이 좌석 1개",
    twoChildSeats: "어린이 좌석 2개",
    threeChildSeats: "어린이 좌석 3개",
    fourChildSeats: "어린이 좌석 4개",
  },
  ar: {
    paymentMethod: "اختر طريقة الدفع",
    cashPayment: "الدفع داخل السيارة",
    recommended: "موصى به",
    cashPaymentDescription:
      "لا دفع مسبق عبر الإنترنت. تدفع السعر الثابت نقدًا لسائقك في بداية الرحلة.",
    confirmCashBooking: "تأكيد الحجز — الدفع داخل السيارة",
    stepRoute: "المسار",
    stepDetails: "التفاصيل",
    stepContact: "التواصل",
    continue: "متابعة",
    back: "رجوع",
    reserveForPrice: "احجز",
    perVehicleNote: "لكل سيارة — لا للفرد · حتى 6 ركاب",
    perVehicleNoteVito: "لكل سيارة — لا للفرد · حتى 6 ركاب",
    perVehicleNoteSprinter: "لكل سيارة — لا للفرد · حتى 12 راكباً",
    requestQuote: "طلب عرض سعر",
    cashConfirmation:
      "تم تأكيد حجزك. تدفع المبلغ الثابت نقدًا لسائقك في بداية الرحلة.",
    bookingError: "تعذر إكمال حجزك. يرجى المحاولة مرة أخرى.",
    chooseTime: "اختر الوقت",
    formIncomplete: "يرجى إكمال الحقول المحددة.",
    requiredField: "هذا الحقل مطلوب.",
    destinationRequired: "يرجى اختيار وجهة.",
    dateInvalid: "يرجى اختيار تاريخ اليوم أو تاريخ لاحق.",
    emailInvalid: "يرجى إدخال بريد إلكتروني صالح.",
    nameInvalid: "يرجى إدخال الاسم الكامل بشكل صحيح.",
    phoneInvalid: "يرجى إدخال رقم صالح مع رمز الدولة (مثلاً +49).",
    flightInvalid: "يرجى إدخال رقم رحلة صالح.",
    pickupAddressRequired: "يجب أن يتراوح عنوان الاستقبال بين 6 و160 حرفاً.",
    dropoffAddressRequired: "يجب أن يتراوح عنوان الوصول بين 6 و160 حرفاً.",
    addressesMustDiffer: "يجب أن يختلف عنوان الاستقبال عن عنوان الوصول.",
    customDestinationPrice: "سيتم تأكيد السعر بعد مراجعة عنوان الوصول.",
    hotelNameLabel: "اسم الفندق",
    hotelNamePlaceholder: "اسم الفندق أو مكان الإقامة",
    hotelNameRequired: "يرجى إدخال اسم الفندق.",
    childSeatLabel: "مقاعد الأطفال",
    childSeatNone: "من دون مقعد أطفال",
    oneChildSeat: "مقعد أطفال واحد",
    twoChildSeats: "مقعدا أطفال",
    threeChildSeats: "3 مقاعد أطفال",
    fourChildSeats: "4 مقاعد أطفال",
  },
};

const tripTranslations = {

  zh: {
    tripType: "行程类型",
    oneWay: "单程",
    roundTrip: "往返",
    roundTripHint:
      "选择往返时，返程将沿相同路线反向行驶。",
    returnDate: "返程日期",
    returnPickupTime: "返程接车时间",
    returnFlightNumber: "返程航班号",
    arrivalDate: "抵达日期",
    arrivalFlightTime: "航班抵达时间",
    arrivalFlightNumber: "抵达航班号",
    roundTripPriceNote: "往返 · 2次行程",
    returnDateRequired: "请选择返程日期。",
    returnDateInvalid:
      "请选择不早于去程的返程日期。",
    returnTimeRequired: "请选择返程接车时间。",
    dailyChauffeur: "按日租车 + 司机",
    days: "天",
    dailyChauffeurHint:
      "按日租用私人车辆和司机，无公里数或时长限制。燃油费另行支付。",
    serviceStartDate: "首个服务日",
    serviceEndDate: "最后服务日",
    dailyPickupTime: "服务开始时间",
    dailyPickupTimeRequired: "请选择每日服务开始时间。",
    serviceEndDateRequired: "请选择最后服务日。",
    servicePeriodInvalid: "请选择1至30天之间的时段。",
    arrivalFlightTimeOptional: "航班抵达时间（可选）",
    arrivalFlightNumberOptional: "抵达航班号（可选）",
    servicePrice: "服务价格",
    fuelExcludedShort: "不含燃油",
    fuelExcludedDetail:
      "燃油费不包含在内，按实际使用情况另行支付。",
    departureFlightDate: "出发航班日期（可选）",
    departureFlightTime: "出发航班时间",
    departureFlightNumber: "出发航班号",
    departureFlightDateRequired: "请选择出发航班日期。",
    departureFlightDateInvalid:
      "出发航班日期不能早于服务开始日期。",
    dailyQuoteIncludes:
      "含所选车辆和司机，无公里数或时长限制。不含燃油费。",
    reviewAndConfirm: "查看并确认",
    fuelTermsTitle: "关于燃油的重要信息",
    fuelTermsBody:
      "每日€150的服务费含车辆和司机。不含燃油费。您将按实际使用情况另行支付实际燃油费用。",
    fuelTermsCheckbox:
      "我理解燃油费不包含在内，将按实际使用情况另行支付。",
    cancel: "取消",
    close: "关闭",
    understandAndConfirm: "我已理解并确认",
    dailyCashConfirmation:
      "您的按日租车服务已确认。服务价格不含燃油费，燃油费按实际使用情况另行支付。",
  },
  da: {
    tripType: "Rejsetype",
    oneWay: "Enkeltrejse",
    roundTrip: "Tur-retur",
    roundTripHint:
      "Ved tur-retur følger returrejsen samme rute i modsat retning.",
    returnDate: "Returdato",
    returnPickupTime: "Afhentningstidspunkt for returrejsen",
    returnFlightNumber: "Returflynummer",
    arrivalDate: "Ankomstdato",
    arrivalFlightTime: "Flyets ankomsttid",
    arrivalFlightNumber: "Ankomstflynummer",
    roundTripPriceNote: "tur-retur · 2 rejser",
    returnDateRequired: "Vælg venligst en returdato.",
    returnDateInvalid:
      "Vælg venligst en returdato på eller efter udrejsen.",
    returnTimeRequired: "Vælg venligst afhentningstidspunktet for returrejsen.",
    dailyChauffeur: "Køretøj + chauffør pr. dag",
    days: "dage",
    dailyChauffeurHint:
      "Lej et privat køretøj og en chauffør pr. dag uden kilometer- eller timebegrænsning. Brændstof betales separat.",
    serviceStartDate: "Første servicedag",
    serviceEndDate: "Sidste servicedag",
    dailyPickupTime: "Starttidspunkt for service",
    dailyPickupTimeRequired: "Vælg venligst det daglige starttidspunkt for service.",
    serviceEndDateRequired: "Vælg venligst den sidste servicedag.",
    servicePeriodInvalid: "Vælg venligst en periode mellem 1 og 30 dage.",
    arrivalFlightTimeOptional: "Flyets ankomsttid (valgfrit)",
    arrivalFlightNumberOptional: "Ankomstflynummer (valgfrit)",
    servicePrice: "Servicepris",
    fuelExcludedShort: "brændstof ikke inkluderet",
    fuelExcludedDetail:
      "Brændstof er ikke inkluderet og betales separat efter forbrug.",
    departureFlightDate: "Afgangsflyets dato (valgfrit)",
    departureFlightTime: "Afgangsflyets tidspunkt",
    departureFlightNumber: "Afgangsflynummer",
    departureFlightDateRequired: "Vælg venligst afgangsflyets dato.",
    departureFlightDateInvalid:
      "Afgangsflyets dato kan ikke være før servicen begynder.",
    dailyQuoteIncludes:
      "Inkluderer det valgte køretøj og chaufføren uden kilometer- eller timebegrænsning. Brændstof er ikke inkluderet.",
    reviewAndConfirm: "Gennemse og bekræft",
    fuelTermsTitle: "Vigtig information om brændstof",
    fuelTermsBody:
      "Det daglige servicegebyr på 150 € inkluderer køretøjet og chaufføren. Brændstof er ikke inkluderet. Du betaler den faktiske brændstofudgift separat efter forbrug.",
    fuelTermsCheckbox:
      "Jeg forstår, at brændstof ikke er inkluderet og betales separat efter forbrug.",
    cancel: "Annuller",
    close: "Luk",
    understandAndConfirm: "Jeg forstår og bekræfter",
    dailyCashConfirmation:
      "Din daglige chaufførleje er bekræftet. Serviceprisen inkluderer ikke brændstof, som betales separat efter forbrug.",
  },
  es: {
    tripType: "Tipo de viaje",
    oneWay: "Solo ida",
    roundTrip: "Ida y vuelta",
    roundTripHint:
      "En un viaje de ida y vuelta, el regreso se realiza por la misma ruta en sentido inverso.",
    returnDate: "Fecha de regreso",
    returnPickupTime: "Hora de recogida del regreso",
    returnFlightNumber: "Número de vuelo de regreso",
    arrivalDate: "Fecha de llegada",
    arrivalFlightTime: "Hora de llegada del vuelo",
    arrivalFlightNumber: "Número de vuelo de llegada",
    roundTripPriceNote: "ida y vuelta · 2 trayectos",
    returnDateRequired: "Elija una fecha de regreso.",
    returnDateInvalid:
      "Elija una fecha de regreso igual o posterior al viaje de ida.",
    returnTimeRequired: "Elija la hora de recogida del regreso.",
    dailyChauffeur: "Vehículo + chófer por día",
    days: "días",
    dailyChauffeurHint:
      "Contrate un vehículo privado con chófer por día, sin límite de kilómetros ni de horas. El combustible se paga aparte.",
    serviceStartDate: "Primer día de servicio",
    serviceEndDate: "Último día de servicio",
    dailyPickupTime: "Hora de inicio del servicio",
    dailyPickupTimeRequired: "Seleccione la hora de inicio del servicio diario.",
    serviceEndDateRequired: "Seleccione el último día de servicio.",
    servicePeriodInvalid: "Seleccione un periodo de entre 1 y 30 días.",
    arrivalFlightTimeOptional: "Hora de llegada del vuelo (opcional)",
    arrivalFlightNumberOptional: "Número de vuelo de llegada (opcional)",
    servicePrice: "Precio del servicio",
    fuelExcludedShort: "combustible no incluido",
    fuelExcludedDetail:
      "El combustible no está incluido y se paga aparte según el uso.",
    departureFlightDate: "Fecha del vuelo de salida (opcional)",
    departureFlightTime: "Hora del vuelo de salida",
    departureFlightNumber: "Número del vuelo de salida",
    departureFlightDateRequired: "Seleccione la fecha del vuelo de salida.",
    departureFlightDateInvalid:
      "La fecha del vuelo de salida no puede ser anterior al inicio del servicio.",
    dailyQuoteIncludes:
      "Incluye el vehículo seleccionado y el chófer, sin límite de kilómetros ni de horas. El combustible no está incluido.",
    reviewAndConfirm: "Revisar y confirmar",
    fuelTermsTitle: "Información importante sobre el combustible",
    fuelTermsBody:
      "La tarifa diaria de servicio de 150 € incluye el vehículo y el chófer. El combustible no está incluido. Pagará el coste real del combustible aparte según el uso.",
    fuelTermsCheckbox:
      "Entiendo que el combustible no está incluido y se pagará aparte según el uso.",
    cancel: "Cancelar",
    close: "Cerrar",
    understandAndConfirm: "Lo entiendo y confirmo",
    dailyCashConfirmation:
      "Su contratación de chófer por día está confirmada. El precio del servicio no incluye el combustible, que se paga aparte según el uso.",
  },
  el: {
    tripType: "Τύπος διαδρομής",
    oneWay: "Απλή διαδρομή",
    roundTrip: "Μετ' επιστροφής",
    roundTripHint:
      "Στη διαδρομή μετ' επιστροφής, η επιστροφή ακολουθεί την ίδια διαδρομή αντίστροφα.",
    returnDate: "Ημερομηνία επιστροφής",
    returnPickupTime: "Ώρα παραλαβής επιστροφής",
    returnFlightNumber: "Αριθμός πτήσης επιστροφής",
    arrivalDate: "Ημερομηνία άφιξης",
    arrivalFlightTime: "Ώρα άφιξης πτήσης",
    arrivalFlightNumber: "Αριθμός πτήσης άφιξης",
    roundTripPriceNote: "μετ' επιστροφής · 2 διαδρομές",
    returnDateRequired: "Παρακαλούμε επιλέξτε ημερομηνία επιστροφής.",
    returnDateInvalid:
      "Παρακαλούμε επιλέξτε ημερομηνία επιστροφής ίδια ή μεταγενέστερη από τη διαδρομή μετάβασης.",
    returnTimeRequired: "Παρακαλούμε επιλέξτε την ώρα παραλαβής επιστροφής.",
    dailyChauffeur: "Ημερήσιο όχημα + σοφέρ",
    days: "ημέρες",
    dailyChauffeurHint:
      "Μισθώστε ιδιωτικό όχημα και σοφέρ με την ημέρα, χωρίς όριο χιλιομέτρων ή ωρών. Τα καύσιμα πληρώνονται ξεχωριστά.",
    serviceStartDate: "Πρώτη ημέρα υπηρεσίας",
    serviceEndDate: "Τελευταία ημέρα υπηρεσίας",
    dailyPickupTime: "Ώρα έναρξης υπηρεσίας",
    dailyPickupTimeRequired: "Παρακαλούμε επιλέξτε την ημερήσια ώρα έναρξης της υπηρεσίας.",
    serviceEndDateRequired: "Παρακαλούμε επιλέξτε την τελευταία ημέρα υπηρεσίας.",
    servicePeriodInvalid: "Παρακαλούμε επιλέξτε περίοδο μεταξύ 1 και 30 ημερών.",
    arrivalFlightTimeOptional: "Ώρα άφιξης πτήσης (προαιρετικό)",
    arrivalFlightNumberOptional: "Αριθμός πτήσης άφιξης (προαιρετικό)",
    servicePrice: "Τιμή υπηρεσίας",
    fuelExcludedShort: "χωρίς καύσιμα",
    fuelExcludedDetail:
      "Τα καύσιμα δεν περιλαμβάνονται και πληρώνονται ξεχωριστά ανάλογα με τη χρήση.",
    departureFlightDate: "Ημερομηνία πτήσης αναχώρησης (προαιρετικό)",
    departureFlightTime: "Ώρα πτήσης αναχώρησης",
    departureFlightNumber: "Αριθμός πτήσης αναχώρησης",
    departureFlightDateRequired: "Παρακαλούμε επιλέξτε την ημερομηνία πτήσης αναχώρησης.",
    departureFlightDateInvalid:
      "Η ημερομηνία πτήσης αναχώρησης δεν μπορεί να είναι πριν από την έναρξη της υπηρεσίας.",
    dailyQuoteIncludes:
      "Περιλαμβάνει το επιλεγμένο όχημα και σοφέρ χωρίς όριο χιλιομέτρων ή ωρών. Τα καύσιμα δεν περιλαμβάνονται.",
    reviewAndConfirm: "Έλεγχος και επιβεβαίωση",
    fuelTermsTitle: "Σημαντικές πληροφορίες σχετικά με τα καύσιμα",
    fuelTermsBody:
      "Η ημερήσια χρέωση υπηρεσίας των 150 € περιλαμβάνει το όχημα και τον σοφέρ. Τα καύσιμα δεν περιλαμβάνονται. Θα πληρώσετε το πραγματικό κόστος καυσίμων ξεχωριστά ανάλογα με τη χρήση.",
    fuelTermsCheckbox:
      "Κατανοώ ότι τα καύσιμα δεν περιλαμβάνονται και θα πληρωθούν ξεχωριστά βάσει της χρήσης.",
    cancel: "Ακύρωση",
    close: "Κλείσιμο",
    understandAndConfirm: "Κατανοώ και επιβεβαιώνω",
    dailyCashConfirmation:
      "Η ημερήσια μίσθωση σοφέρ σας επιβεβαιώθηκε. Η τιμή της υπηρεσίας δεν περιλαμβάνει καύσιμα, τα οποία πληρώνονται ξεχωριστά βάσει της χρήσης.",
  },
  he: {
    tripType: "סוג הנסיעה",
    oneWay: "כיוון אחד",
    roundTrip: "הלוך ושוב",
    roundTripHint:
      "בנסיעת הלוך ושוב, החזור מתבצע באותו מסלול בכיוון ההפוך.",
    returnDate: "תאריך חזור",
    returnPickupTime: "שעת איסוף לחזור",
    returnFlightNumber: "מספר טיסת החזור",
    arrivalDate: "תאריך הגעה",
    arrivalFlightTime: "שעת נחיתת הטיסה",
    arrivalFlightNumber: "מספר טיסת ההגעה",
    roundTripPriceNote: "הלוך ושוב · 2 נסיעות",
    returnDateRequired: "אנא בחרו תאריך חזור.",
    returnDateInvalid:
      "אנא בחרו תאריך חזור ביום הנסיעה הלוך או לאחריו.",
    returnTimeRequired: "אנא בחרו את שעת האיסוף לחזור.",
    dailyChauffeur: "רכב + שופר יומי",
    days: "ימים",
    dailyChauffeurHint:
      "שכרו רכב פרטי ושופר לפי יום ללא מגבלת קילומטרים או שעות. הדלק משולם בנפרד.",
    serviceStartDate: "יום השירות הראשון",
    serviceEndDate: "יום השירות האחרון",
    dailyPickupTime: "שעת התחלת השירות",
    dailyPickupTimeRequired: "אנא בחרו את שעת התחלת השירות היומי.",
    serviceEndDateRequired: "אנא בחרו את יום השירות האחרון.",
    servicePeriodInvalid: "אנא בחרו תקופה של בין 1 ל-30 ימים.",
    arrivalFlightTimeOptional: "שעת נחיתת הטיסה (אופציונלי)",
    arrivalFlightNumberOptional: "מספר טיסת ההגעה (אופציונלי)",
    servicePrice: "מחיר השירות",
    fuelExcludedShort: "ללא דלק",
    fuelExcludedDetail:
      "הדלק אינו כלול ומשולם בנפרד לפי השימוש.",
    departureFlightDate: "תאריך טיסת היציאה (אופציונלי)",
    departureFlightTime: "שעת טיסת היציאה",
    departureFlightNumber: "מספר טיסת היציאה",
    departureFlightDateRequired: "אנא בחרו את תאריך טיסת היציאה.",
    departureFlightDateInvalid:
      "תאריך טיסת היציאה אינו יכול להיות לפני תחילת השירות.",
    dailyQuoteIncludes:
      "כולל את הרכב והשופר הנבחרים ללא מגבלת קילומטרים או שעות. הדלק אינו כלול.",
    reviewAndConfirm: "בדקו ואשרו",
    fuelTermsTitle: "מידע חשוב בנוגע לדלק",
    fuelTermsBody:
      "דמי השירות היומיים בסך 150 € כוללים את הרכב והשופר. הדלק אינו כלול. תשלמו את עלות הדלק בפועל בנפרד לפי השימוש.",
    fuelTermsCheckbox:
      "אני מבין שהדלק אינו כלול וישולם בנפרד לפי השימוש.",
    cancel: "ביטול",
    close: "סגור",
    understandAndConfirm: "אני מבין ומאשר",
    dailyCashConfirmation:
      "שכירת השופר היומית שלכם אושרה. מחיר השירות אינו כולל דלק, המשולם בנפרד לפי השימוש.",
  },
  it: {
    tripType: "Tipo di viaggio",
    oneWay: "Solo andata",
    roundTrip: "Andata e ritorno",
    roundTripHint:
      "Per l'andata e ritorno, il ritorno segue la stessa tratta in senso inverso.",
    returnDate: "Data del ritorno",
    returnPickupTime: "Orario di ritiro del ritorno",
    returnFlightNumber: "Numero del volo di ritorno",
    arrivalDate: "Data di arrivo",
    arrivalFlightTime: "Orario di arrivo del volo",
    arrivalFlightNumber: "Numero del volo in arrivo",
    roundTripPriceNote: "andata e ritorno · 2 tratte",
    returnDateRequired: "Vi preghiamo di scegliere una data di ritorno.",
    returnDateInvalid:
      "Vi preghiamo di scegliere una data di ritorno pari o successiva a quella dell'andata.",
    returnTimeRequired: "Vi preghiamo di scegliere l'orario di ritiro del ritorno.",
    dailyChauffeur: "Veicolo + autista a giornata",
    days: "giorni",
    dailyChauffeurHint:
      "Noleggia un veicolo privato con autista a giornata, senza limiti di chilometri o di ore. Il carburante si paga a parte.",
    serviceStartDate: "Primo giorno di servizio",
    serviceEndDate: "Ultimo giorno di servizio",
    dailyPickupTime: "Orario di inizio del servizio",
    dailyPickupTimeRequired: "Vi preghiamo di selezionare l'orario di inizio del servizio giornaliero.",
    serviceEndDateRequired: "Vi preghiamo di selezionare l'ultimo giorno di servizio.",
    servicePeriodInvalid: "Vi preghiamo di selezionare un periodo compreso tra 1 e 30 giorni.",
    arrivalFlightTimeOptional: "Orario di arrivo del volo (facoltativo)",
    arrivalFlightNumberOptional: "Numero del volo in arrivo (facoltativo)",
    servicePrice: "Prezzo del servizio",
    fuelExcludedShort: "carburante escluso",
    fuelExcludedDetail:
      "Il carburante non è incluso e si paga a parte in base all'utilizzo.",
    departureFlightDate: "Data del volo di partenza (facoltativo)",
    departureFlightTime: "Orario del volo di partenza",
    departureFlightNumber: "Numero del volo di partenza",
    departureFlightDateRequired: "Vi preghiamo di selezionare la data del volo di partenza.",
    departureFlightDateInvalid:
      "La data del volo di partenza non può essere anteriore all'inizio del servizio.",
    dailyQuoteIncludes:
      "Include il veicolo selezionato e l'autista, senza limiti di chilometri o di ore. Il carburante è escluso.",
    reviewAndConfirm: "Verifica e conferma",
    fuelTermsTitle: "Informazioni importanti sul carburante",
    fuelTermsBody:
      "La tariffa giornaliera di 150 € per il servizio include il veicolo e l'autista. Il carburante non è incluso. Pagherete separatamente il costo effettivo del carburante in base all'utilizzo.",
    fuelTermsCheckbox:
      "Comprendo che il carburante è escluso e sarà pagato separatamente in base all'utilizzo.",
    cancel: "Annulla",
    close: "Chiudi",
    understandAndConfirm: "Ho capito e confermo",
    dailyCashConfirmation:
      "Il vostro noleggio con autista a giornata è confermato. Il prezzo del servizio esclude il carburante, che si paga separatamente in base all'utilizzo.",
  },
  hu: {
    tripType: "Utazás típusa",
    oneWay: "Egyszeri út",
    roundTrip: "Oda-vissza út",
    roundTripHint:
      "Oda-vissza út esetén a visszaút ugyanazon az útvonalon, fordított irányban történik.",
    returnDate: "Visszaút dátuma",
    returnPickupTime: "Visszaút felvételi ideje",
    returnFlightNumber: "Visszaút járatszáma",
    arrivalDate: "Érkezés dátuma",
    arrivalFlightTime: "A járat érkezési ideje",
    arrivalFlightNumber: "Érkező járat száma",
    roundTripPriceNote: "oda-vissza út · 2 utazás",
    returnDateRequired: "Kérjük, válasszon visszaút dátumot.",
    returnDateInvalid:
      "Kérjük, válasszon az odaúttal azonos vagy azt követő visszaút dátumot.",
    returnTimeRequired: "Kérjük, válassza ki a visszaút felvételi idejét.",
    dailyChauffeur: "Napi jármű + sofőr",
    days: "nap",
    dailyChauffeurHint:
      "Béreljen privát járművet és sofőrt napra, kilométer- vagy órakorlát nélkül. Az üzemanyagot külön fizeti.",
    serviceStartDate: "Első szolgálati nap",
    serviceEndDate: "Utolsó szolgálati nap",
    dailyPickupTime: "Szolgálat kezdési ideje",
    dailyPickupTimeRequired: "Kérjük, válassza ki a napi szolgálat kezdési idejét.",
    serviceEndDateRequired: "Kérjük, válassza ki az utolsó szolgálati napot.",
    servicePeriodInvalid: "Kérjük, válasszon 1 és 30 nap közötti időszakot.",
    arrivalFlightTimeOptional: "A járat érkezési ideje (opcionális)",
    arrivalFlightNumberOptional: "Érkező járat száma (opcionális)",
    servicePrice: "Szolgáltatás ára",
    fuelExcludedShort: "üzemanyag nélkül",
    fuelExcludedDetail:
      "Az üzemanyag nincs benne, és a használatnak megfelelően külön fizetendő.",
    departureFlightDate: "Induló járat dátuma (opcionális)",
    departureFlightTime: "Induló járat ideje",
    departureFlightNumber: "Induló járat száma",
    departureFlightDateRequired: "Kérjük, válassza ki az induló járat dátumát.",
    departureFlightDateInvalid:
      "Az induló járat dátuma nem lehet korábbi, mint a szolgálat kezdete.",
    dailyQuoteIncludes:
      "Tartalmazza a kiválasztott járművet és sofőrt kilométer- vagy órakorlát nélkül. Az üzemanyag nincs benne.",
    reviewAndConfirm: "Áttekintés és megerősítés",
    fuelTermsTitle: "Fontos információ az üzemanyagról",
    fuelTermsBody:
      "A napi 150 €-os szolgáltatási díj tartalmazza a járművet és a sofőrt. Az üzemanyag nincs benne. A tényleges üzemanyagköltséget a használatnak megfelelően külön fizeti.",
    fuelTermsCheckbox:
      "Megértettem, hogy az üzemanyag nincs benne, és a használat alapján külön fizetendő.",
    cancel: "Mégse",
    close: "Bezárás",
    understandAndConfirm: "Megértettem és megerősítem",
    dailyCashConfirmation:
      "Napi sofőrbérlése megerősítve. A szolgáltatás ára nem tartalmazza az üzemanyagot, amelyet a használat alapján külön fizet.",
  },
  pt: {
    tripType: "Tipo de viagem",
    oneWay: "Só de ida",
    roundTrip: "Ida e volta",
    roundTripHint:
      "Numa viagem de ida e volta, o regresso é feito pela mesma rota no sentido inverso.",
    returnDate: "Data de regresso",
    returnPickupTime: "Hora de recolha do regresso",
    returnFlightNumber: "Número do voo de regresso",
    arrivalDate: "Data de chegada",
    arrivalFlightTime: "Hora de chegada do voo",
    arrivalFlightNumber: "Número do voo de chegada",
    roundTripPriceNote: "ida e volta · 2 viagens",
    returnDateRequired: "Escolha uma data de regresso.",
    returnDateInvalid:
      "Escolha uma data de regresso igual ou posterior à viagem de ida.",
    returnTimeRequired: "Escolha a hora de recolha do regresso.",
    dailyChauffeur: "Veículo + motorista por dia",
    days: "dias",
    dailyChauffeurHint:
      "Contrate um veículo privado com motorista ao dia, sem limite de quilómetros ou horas. O combustível é pago à parte.",
    serviceStartDate: "Primeiro dia de serviço",
    serviceEndDate: "Último dia de serviço",
    dailyPickupTime: "Hora de início do serviço",
    dailyPickupTimeRequired: "Selecione a hora de início do serviço diário.",
    serviceEndDateRequired: "Selecione o último dia de serviço.",
    servicePeriodInvalid: "Selecione um período entre 1 e 30 dias.",
    arrivalFlightTimeOptional: "Hora de chegada do voo (opcional)",
    arrivalFlightNumberOptional: "Número do voo de chegada (opcional)",
    servicePrice: "Preço do serviço",
    fuelExcludedShort: "combustível não incluído",
    fuelExcludedDetail:
      "O combustível não está incluído e é pago à parte de acordo com o consumo.",
    departureFlightDate: "Data do voo de partida (opcional)",
    departureFlightTime: "Hora do voo de partida",
    departureFlightNumber: "Número do voo de partida",
    departureFlightDateRequired: "Selecione a data do voo de partida.",
    departureFlightDateInvalid:
      "A data do voo de partida não pode ser anterior ao início do serviço.",
    dailyQuoteIncludes:
      "Inclui o veículo selecionado e o motorista, sem limite de quilómetros ou horas. O combustível não está incluído.",
    reviewAndConfirm: "Rever e confirmar",
    fuelTermsTitle: "Informação importante sobre o combustível",
    fuelTermsBody:
      "A taxa diária de serviço de 150 € inclui o veículo e o motorista. O combustível não está incluído. Pagará o custo real do combustível à parte, de acordo com o consumo.",
    fuelTermsCheckbox:
      "Compreendo que o combustível não está incluído e será pago à parte com base no consumo.",
    cancel: "Cancelar",
    close: "Fechar",
    understandAndConfirm: "Compreendo e confirmo",
    dailyCashConfirmation:
      "A sua contratação de motorista ao dia está confirmada. O preço do serviço não inclui combustível, que é pago à parte com base no consumo.",
  },
  ro: {
    tripType: "Tip de călătorie",
    oneWay: "Doar dus",
    roundTrip: "Dus-întors",
    roundTripHint:
      "În cazul unei călătorii dus-întors, întoarcerea se face pe aceeași rută în sens invers.",
    returnDate: "Data întoarcerii",
    returnPickupTime: "Ora de preluare la întoarcere",
    returnFlightNumber: "Numărul zborului de întoarcere",
    arrivalDate: "Data sosirii",
    arrivalFlightTime: "Ora sosirii zborului",
    arrivalFlightNumber: "Numărul zborului de sosire",
    roundTripPriceNote: "dus-întors · 2 călătorii",
    returnDateRequired: "Vă rugăm să alegeți o dată de întoarcere.",
    returnDateInvalid:
      "Vă rugăm să alegeți o dată de întoarcere în ziua călătoriei de dus sau după aceasta.",
    returnTimeRequired: "Vă rugăm să alegeți ora de preluare la întoarcere.",
    dailyChauffeur: "Vehicul + șofer cu ziua",
    days: "zile",
    dailyChauffeurHint:
      "Închiriați cu ziua un vehicul și un șofer privat, fără limită de kilometri sau ore. Combustibilul se plătește separat.",
    serviceStartDate: "Prima zi de serviciu",
    serviceEndDate: "Ultima zi de serviciu",
    dailyPickupTime: "Ora de începere a serviciului",
    dailyPickupTimeRequired: "Vă rugăm să selectați ora de începere a serviciului zilnic.",
    serviceEndDateRequired: "Vă rugăm să selectați ultima zi de serviciu.",
    servicePeriodInvalid: "Vă rugăm să selectați o perioadă între 1 și 30 de zile.",
    arrivalFlightTimeOptional: "Ora sosirii zborului (opțional)",
    arrivalFlightNumberOptional: "Numărul zborului de sosire (opțional)",
    servicePrice: "Prețul serviciului",
    fuelExcludedShort: "combustibil neinclus",
    fuelExcludedDetail:
      "Combustibilul nu este inclus și se plătește separat, în funcție de utilizare.",
    departureFlightDate: "Data zborului de plecare (opțional)",
    departureFlightTime: "Ora zborului de plecare",
    departureFlightNumber: "Numărul zborului de plecare",
    departureFlightDateRequired: "Vă rugăm să selectați data zborului de plecare.",
    departureFlightDateInvalid:
      "Data zborului de plecare nu poate fi anterioară începerii serviciului.",
    dailyQuoteIncludes:
      "Include vehiculul selectat și șoferul, fără limită de kilometri sau ore. Combustibilul nu este inclus.",
    reviewAndConfirm: "Verificați și confirmați",
    fuelTermsTitle: "Informații importante despre combustibil",
    fuelTermsBody:
      "Tariful zilnic de serviciu de 150 € include vehiculul și șoferul. Combustibilul nu este inclus. Veți plăti separat costul real al combustibilului, în funcție de utilizare.",
    fuelTermsCheckbox:
      "Înțeleg că combustibilul nu este inclus și va fi plătit separat, în funcție de utilizare.",
    cancel: "Anulează",
    close: "Închide",
    understandAndConfirm: "Înțeleg și confirm",
    dailyCashConfirmation:
      "Închirierea zilnică cu șofer este confirmată. Prețul serviciului nu include combustibilul, care se plătește separat în funcție de utilizare.",
  },

  en: {
    tripType: "Journey type",
    oneWay: "One way",
    roundTrip: "Round trip",
    roundTripHint:
      "For a round trip, the return follows the same route in reverse.",
    returnDate: "Return date",
    returnPickupTime: "Return pick-up time",
    returnFlightNumber: "Return flight number",
    arrivalDate: "Arrival date",
    arrivalFlightTime: "Flight arrival time",
    arrivalFlightNumber: "Arrival flight number",
    roundTripPriceNote: "round trip · 2 journeys",
    returnDateRequired: "Please choose a return date.",
    returnDateInvalid:
      "Please choose a return date on or after the outward journey.",
    returnTimeRequired: "Please choose the return pick-up time.",
    dailyChauffeur: "Daily vehicle + chauffeur",
    days: "days",
    dailyChauffeurHint:
      "Hire a private vehicle and chauffeur by the day with no kilometre or hour limit. Fuel is paid separately.",
    serviceStartDate: "First service day",
    serviceEndDate: "Last service day",
    dailyPickupTime: "Service start time",
    dailyPickupTimeRequired: "Please select the daily service start time.",
    serviceEndDateRequired: "Please select the last service day.",
    servicePeriodInvalid: "Please select a period between 1 and 30 days.",
    arrivalFlightTimeOptional: "Arrival flight time (optional)",
    arrivalFlightNumberOptional: "Arrival flight number (optional)",
    servicePrice: "Service price",
    fuelExcludedShort: "fuel excluded",
    fuelExcludedDetail:
      "Fuel is not included and is paid separately according to use.",
    departureFlightDate: "Departure flight date (optional)",
    departureFlightTime: "Departure flight time",
    departureFlightNumber: "Departure flight number",
    departureFlightDateRequired: "Please select the departure flight date.",
    departureFlightDateInvalid:
      "Departure flight date cannot be before the service starts.",
    dailyQuoteIncludes:
      "Includes the selected vehicle and chauffeur with no kilometre or hour limit. Fuel is excluded.",
    reviewAndConfirm: "Review and confirm",
    fuelTermsTitle: "Important information about fuel",
    fuelTermsBody:
      "The daily €150 service fee includes the vehicle and chauffeur. Fuel is not included. You will pay the actual fuel cost separately according to use.",
    fuelTermsCheckbox:
      "I understand that fuel is excluded and will be paid separately based on use.",
    cancel: "Cancel",
    close: "Close",
    understandAndConfirm: "I understand and confirm",
    dailyCashConfirmation:
      "Your daily chauffeur hire is confirmed. The service price excludes fuel, which is paid separately based on use.",
  },
  de: {
    tripType: "Fahrtart",
    oneWay: "Einfache Fahrt",
    roundTrip: "Hin- und Rückfahrt",
    roundTripHint:
      "Bei Hin- und Rückfahrt erfolgt die Rückfahrt auf derselben Strecke in umgekehrter Richtung.",
    returnDate: "Rückfahrtdatum",
    returnPickupTime: "Abholzeit der Rückfahrt",
    returnFlightNumber: "Rückflugnummer",
    arrivalDate: "Ankunftsdatum",
    arrivalFlightTime: "Ankunftszeit des Fluges",
    arrivalFlightNumber: "Ankunftsflugnummer",
    roundTripPriceNote: "Hin- und Rückfahrt · 2 Fahrten",
    returnDateRequired: "Bitte wählen Sie ein Rückfahrtdatum.",
    returnDateInvalid:
      "Bitte wählen Sie ein Rückfahrtdatum am oder nach dem Datum der Hinfahrt.",
    returnTimeRequired: "Bitte wählen Sie die Abholzeit für die Rückfahrt.",
    dailyChauffeur: "Fahrzeug + Chauffeur pro Tag",
    days: "Tage",
    dailyChauffeurHint:
      "Mieten Sie Fahrzeug und Chauffeur tageweise ohne Kilometer- oder Stundenlimit. Kraftstoff wird separat bezahlt.",
    serviceStartDate: "Erster Servicetag",
    serviceEndDate: "Letzter Servicetag",
    dailyPickupTime: "Startzeit des Services",
    dailyPickupTimeRequired: "Bitte wählen Sie die tägliche Startzeit.",
    serviceEndDateRequired: "Bitte wählen Sie den letzten Servicetag.",
    servicePeriodInvalid: "Bitte wählen Sie einen Zeitraum von 1 bis 30 Tagen.",
    arrivalFlightTimeOptional: "Ankunftszeit (optional)",
    arrivalFlightNumberOptional: "Ankunftsflugnummer (optional)",
    servicePrice: "Servicepreis",
    fuelExcludedShort: "Kraftstoff nicht inbegriffen",
    fuelExcludedDetail:
      "Kraftstoff ist nicht enthalten und wird je nach Verbrauch separat bezahlt.",
    departureFlightDate: "Abflugdatum (optional)",
    departureFlightTime: "Abflugzeit",
    departureFlightNumber: "Abflugnummer",
    departureFlightDateRequired: "Bitte wählen Sie das Abflugdatum.",
    departureFlightDateInvalid:
      "Das Abflugdatum darf nicht vor Servicebeginn liegen.",
    dailyQuoteIncludes:
      "Inklusive Fahrzeug und Chauffeur ohne Kilometer- oder Stundenlimit. Kraftstoff ist nicht enthalten.",
    reviewAndConfirm: "Prüfen und bestätigen",
    fuelTermsTitle: "Wichtige Information zum Kraftstoff",
    fuelTermsBody:
      "Die Tagesgebühr von 150 € beinhaltet Fahrzeug und Chauffeur. Kraftstoff ist nicht enthalten und wird nach tatsächlichem Verbrauch separat bezahlt.",
    fuelTermsCheckbox:
      "Ich verstehe, dass Kraftstoff nicht enthalten ist und nach Verbrauch separat bezahlt wird.",
    cancel: "Abbrechen",
    close: "Schließen",
    understandAndConfirm: "Verstanden und bestätigen",
    dailyCashConfirmation:
      "Ihre tägliche Chauffeurbuchung ist bestätigt. Kraftstoff ist nicht enthalten und wird nach Verbrauch separat bezahlt.",
  },
  tr: {
    tripType: "Yolculuk türü",
    oneWay: "Tek yön",
    roundTrip: "Gidiş–dönüş",
    roundTripHint:
      "Gidiş–dönüş rezervasyonunda dönüş, aynı rotanın ters yönünde gerçekleşir.",
    returnDate: "Dönüş tarihi",
    returnPickupTime: "Dönüş alış saati",
    returnFlightNumber: "Dönüş uçuş numarası",
    arrivalDate: "Geliş tarihi",
    arrivalFlightTime: "Geliş uçuş saati",
    arrivalFlightNumber: "Geliş uçuş numarası",
    roundTripPriceNote: "gidiş–dönüş · 2 yolculuk",
    returnDateRequired: "Lütfen dönüş tarihini seçin.",
    returnDateInvalid:
      "Lütfen gidiş tarihiyle aynı veya daha sonraki bir dönüş tarihi seçin.",
    returnTimeRequired: "Lütfen dönüş için alış saatini seçin.",
    dailyChauffeur: "Günlük araç + şoför",
    days: "gün",
    dailyChauffeurHint:
      "Özel araç ve şoförü kilometre ve saat sınırı olmadan günlük kiralayın. Yakıt ayrıca ödenir.",
    serviceStartDate: "İlk hizmet günü",
    serviceEndDate: "Son hizmet günü",
    dailyPickupTime: "Hizmet başlangıç saati",
    dailyPickupTimeRequired: "Lütfen günlük hizmet başlangıç saatini seçin.",
    serviceEndDateRequired: "Lütfen son hizmet gününü seçin.",
    servicePeriodInvalid: "Lütfen 1 ile 30 gün arasında bir süre seçin.",
    arrivalFlightTimeOptional: "Geliş uçuş saati (isteğe bağlı)",
    arrivalFlightNumberOptional: "Geliş uçuş numarası (isteğe bağlı)",
    servicePrice: "Hizmet bedeli",
    fuelExcludedShort: "yakıt hariç",
    fuelExcludedDetail: "Yakıt dahil değildir ve kullanıma göre ayrıca ödenir.",
    departureFlightDate: "Dönüş uçuş tarihi (isteğe bağlı)",
    departureFlightTime: "Dönüş uçuş saati",
    departureFlightNumber: "Dönüş uçuş numarası",
    departureFlightDateRequired: "Lütfen dönüş uçuş tarihini seçin.",
    departureFlightDateInvalid:
      "Dönüş uçuş tarihi hizmet başlangıcından önce olamaz.",
    dailyQuoteIncludes:
      "Seçilen araç ve şoför, kilometre ve saat sınırı olmadan dahildir. Yakıt hariçtir.",
    reviewAndConfirm: "İncele ve onayla",
    fuelTermsTitle: "Yakıt ücreti hakkında önemli bilgi",
    fuelTermsBody:
      "Günlük €150 hizmet bedeline araç ve şoför dahildir. Yakıt ücreti dahil değildir. Gerçekleşen yakıt masrafını kullanıma göre ayrıca ödeyeceksiniz.",
    fuelTermsCheckbox:
      "Yakıtın dahil olmadığını ve kullanıma göre ayrıca ödeneceğini anladım.",
    cancel: "Vazgeç",
    close: "Kapat",
    understandAndConfirm: "Anladım ve onaylıyorum",
    dailyCashConfirmation:
      "Günlük araç ve şoför rezervasyonunuz onaylandı. Hizmet bedeline yakıt dahil değildir; yakıt kullanıma göre ayrıca ödenir.",
  },
  ru: {
    tripType: "Тип поездки",
    oneWay: "В одну сторону",
    roundTrip: "Туда и обратно",
    roundTripHint:
      "Обратная поездка проходит по тому же маршруту в обратном направлении.",
    returnDate: "Дата возвращения",
    returnPickupTime: "Время подачи на обратный путь",
    returnFlightNumber: "Номер обратного рейса",
    arrivalDate: "Дата прибытия",
    arrivalFlightTime: "Время прибытия рейса",
    arrivalFlightNumber: "Номер рейса прибытия",
    roundTripPriceNote: "туда и обратно · 2 поездки",
    returnDateRequired: "Выберите дату возвращения.",
    returnDateInvalid:
      "Дата возвращения должна совпадать с датой поездки туда или быть позже.",
    returnTimeRequired: "Выберите время подачи на обратный путь.",
  },
  ar: {
    tripType: "نوع الرحلة",
    oneWay: "ذهاب فقط",
    roundTrip: "ذهاب وعودة",
    roundTripHint:
      "في رحلة الذهاب والعودة، تكون رحلة العودة على المسار نفسه بالاتجاه المعاكس.",
    returnDate: "تاريخ العودة",
    returnPickupTime: "وقت الاستقبال للعودة",
    returnFlightNumber: "رقم رحلة العودة",
    arrivalDate: "تاريخ الوصول",
    arrivalFlightTime: "وقت وصول الرحلة",
    arrivalFlightNumber: "رقم رحلة الوصول",
    roundTripPriceNote: "ذهاب وعودة · رحلتان",
    returnDateRequired: "يرجى اختيار تاريخ العودة.",
    returnDateInvalid:
      "يرجى اختيار تاريخ عودة يوافق تاريخ الذهاب أو يأتي بعده.",
    returnTimeRequired: "يرجى اختيار وقت الاستقبال للعودة.",
  },
};

Object.entries(paymentTranslations).forEach(([language, copy]) => {
  translations[language] = { ...(translations[language] || {}), ...copy };
});

Object.keys(translations).forEach((language) => {
  translations[language] = {
    ...tripTranslations.en,
    ...translations[language],
    ...(tripTranslations[language] || {}),
  };
});

const fleetData = {
  sprinter: {
    classKey: "fleetVclassClass",
    className: "Business · First Class",
    name: "Mercedes Sprinter",
    shortName: "Sprinter",
    descriptionKey: "fleetVclassDescription",
    description:
      "Spacious VIP transport for larger groups, with generous room for passengers and luggage.",
    guests: "12",
    bags: "12",
    maxUnits: 25,
  },
  vito: {
    classKey: "fleetVitoClass",
    className: "VIP · Grand Touring",
    name: "Mercedes Vito",
    shortName: "Vito",
    descriptionKey: "fleetVitoDescription",
    description:
      "A refined private cabin for families and small groups travelling in comfort.",
    guests: "6",
    bags: "6",
    maxUnits: 11,
  },
};

const fallbackFleetPhotos = [
  {
    src: fallbackChauffeurPhoto,
    alt: "Professional chauffeur opening a luxury black executive van",
    caption: "Chauffeur arrival",
    vehicle: "all",
  },
  {
    src: fallbackInteriorPhoto,
    alt: "Cream leather executive seating inside a luxury passenger van",
    caption: "VIP interior",
    vehicle: "all",
  },
  {
    src: fallbackHeroPhoto,
    alt: "Luxury black executive van driving along Antalya's coastline",
    caption: "Exterior",
    vehicle: "all",
  },
];

const getPhotoCaption = (fileName) => {
  const normalized = fileName.toLowerCase();
  if (normalized.includes("customer")) return "Happy customer";
  if (normalized.includes("interior") || normalized.includes("lounge"))
    return "VIP interior";
  if (normalized.includes("cabin") || normalized.includes("seat"))
    return "Passenger cabin";
  if (
    normalized.includes("arrival") ||
    normalized.includes("chauffeur") ||
    normalized.includes("driver")
  )
    return "Chauffeur arrival";
  if (
    normalized.includes("exterior") ||
    normalized.includes("front") ||
    normalized.includes("side")
  )
    return "Exterior";
  return "Our vehicle";
};

const getPhotoVehicle = (fileName) => {
  const normalized = fileName.toLowerCase();
  if (normalized.includes("sprinter")) return "sprinter";
  if (normalized.includes("vito")) return "vito";
  return "all";
};

const customerPhotos = Object.entries(customerPhotoModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([path, src]) => ({
    src,
    caption: "Happy customer",
    vehicle: "all",
    alt: "Satisfied customer with Antalya VIP Tourism transfer service",
    isCustomer: true,
  }));

const vehiclePhotos = Object.entries(vehiclePhotoModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([path, src]) => {
    const fileName = path.split("/").pop() || "vehicle";
    const caption = getPhotoCaption(fileName);
    return {
      src,
      caption,
      vehicle: getPhotoVehicle(fileName),
      alt: `${caption} photo from Antalya VIP Tourism fleet`,
    };
  });

const fleetPhotos = (() => {
  const mixed = [...vehiclePhotos];
  const step = mixed.length / (customerPhotos.length + 1);
  customerPhotos.forEach((photo, i) => {
    mixed.splice(Math.round(step * (i + 1)) + i, 0, photo);
  });
  return mixed;
})();

let activeFleetPhotoIndex = 0;
let activeFleetPhotos = fleetPhotos.length ? fleetPhotos : fallbackFleetPhotos;

const fleetCarousel = document.querySelector(".fleet-carousel");
const fleetCarouselImage = document.querySelector("#fleet-carousel-image");
const fleetCarouselCaption = document.querySelector("#fleet-carousel-caption");
const fleetCarouselDots = document.querySelector("#fleet-carousel-dots");
const fleetCarouselPrev = document.querySelector("#fleet-carousel-prev");
const fleetCarouselNext = document.querySelector("#fleet-carousel-next");

const getPhotosForFleet = (fleetKey) => {
  if (!fleetPhotos.length) return fallbackFleetPhotos;
  const vehiclePhotos = fleetPhotos.filter(
    (photo) => photo.vehicle === fleetKey || photo.vehicle === "all",
  );
  return vehiclePhotos.length ? vehiclePhotos : fleetPhotos;
};

const renderFleetCarouselDots = () => {
  if (!fleetCarouselDots) return;
  fleetCarouselDots.innerHTML = "";
  activeFleetPhotos.forEach((photo, index) => {
    const dot = document.createElement("button");
    dot.className = "fleet-carousel-dot";
    dot.type = "button";
    dot.setAttribute(
      "aria-label",
      `Show ${photo.caption.toLowerCase()} photo ${index + 1}`,
    );
    dot.setAttribute("aria-current", String(index === activeFleetPhotoIndex));
    dot.classList.toggle("active", index === activeFleetPhotoIndex);
    dot.addEventListener("click", () => updateFleetCarousel(index));
    fleetCarouselDots.appendChild(dot);
  });
};

const updateFleetCarousel = (nextIndex) => {
  if (!fleetCarouselImage || !fleetCarouselCaption) return;
  const totalPhotos = activeFleetPhotos.length;
  if (!totalPhotos) return;
  activeFleetPhotoIndex = (nextIndex + totalPhotos) % totalPhotos;
  const photo = activeFleetPhotos[activeFleetPhotoIndex];

  fleetCarousel?.classList.add("is-changing");
  window.setTimeout(() => {
    fleetCarouselImage.src = photo.src;
    fleetCarouselImage.alt = photo.alt;
    fleetCarouselCaption.textContent = photo.caption;
    fleetCarouselImage.classList.toggle("is-customer", !!photo.isCustomer);
    renderFleetCarouselDots();
    fleetCarousel?.classList.remove("is-changing");
  }, 120);
};

const syncFleetCarouselForVehicle = (fleetKey) => {
  activeFleetPhotos = getPhotosForFleet(fleetKey);
  activeFleetPhotoIndex = 0;
  updateFleetCarousel(0);
};

const formatEuroAmount = (price) => {
  const value = Number(price);
  if (!Number.isFinite(value)) return "€0";
  return `€${Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2)}`;
};

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const quoteModal = document.querySelector("#quote-modal");
const pickupSelect = document.querySelector("#pickup");
const pickupAddressRow = document.querySelector("#pickup-address-row");
const pickupAddressInput = document.querySelector("#pickup-address");
const dropoffAddressRow = document.querySelector("#dropoff-address-row");
const dropoffAddressInput = document.querySelector("#dropoff-address");
const hotelNameInput = document.querySelector("#hotel-name");
const childSeatsSelect = document.querySelector("#child-seats");
const destinationSelect = document.querySelector("#destination");
const airportDestinationOption = destinationSelect?.querySelector(
  'option[value="airport"]',
);
const vehicleSelect = document.querySelector("#vehicle-type");
const guestsSelect = document.querySelector("#guests");
const luggageSelect = document.querySelector("#luggage");
const capacityNote = document.querySelector("#capacity-note");
const travelDate = document.querySelector("#travel-date");
const tripTypeInputs = document.querySelectorAll('input[name="tripType"]');
const returnJourneyRow = document.querySelector("#return-journey-row");
const returnDateInput = document.querySelector("#return-date");
const returnPickupTimeInput = document.querySelector("#return-pickup-time");
const returnFlightNumberInput = document.querySelector("#return-flight-number");
const quoteForm = document.querySelector("#quote-form");
const paymentErrorMessage = document.querySelector("#payment-error-message");
const confirmationMessage = document.querySelector(".confirmed-msg");
const nameInput = document.querySelector("#customer-name");
const phoneInput = document.querySelector("#customer-phone");
const emailInput = document.querySelector("#customer-email");
const flightNumberInput = document.querySelector("#flight-number");
const arrivalTimeInput = document.querySelector("#flight-arrival-time");
const arrivalTimeControl = arrivalTimeInput?.closest(".time-field-control");
const arrivalTimeValue =
  arrivalTimeControl?.querySelector(".time-picker-value");
const returnTimeControl = returnPickupTimeInput?.closest(".time-field-control");
const returnTimeValue = returnTimeControl?.querySelector(".time-picker-value");

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

mobileMenu
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];
travelDate.min = localToday;
travelDate.value = localToday;
returnDateInput.min = localToday;

const openNativeDatePicker = (input) => {
  if (typeof input.showPicker !== "function") return;

  try {
    input.showPicker();
  } catch {
    input.focus();
  }
};

travelDate.addEventListener("click", () => openNativeDatePicker(travelDate));
travelDate.closest(".field-control")?.addEventListener("click", (event) => {
  if (event.target === travelDate) return;
  travelDate.focus();
  openNativeDatePicker(travelDate);
});

returnDateInput.addEventListener("click", () =>
  openNativeDatePicker(returnDateInput),
);
returnDateInput
  .closest(".field-control")
  ?.addEventListener("click", (event) => {
    if (event.target === returnDateInput) return;
    returnDateInput.focus();
    openNativeDatePicker(returnDateInput);
  });

travelDate.addEventListener("change", () => {
  returnDateInput.min = travelDate.value || localToday;
  if (returnDateInput.value && returnDateInput.value < returnDateInput.min) {
    returnDateInput.value = returnDateInput.min;
  }
});

const updateFleet = (fleetKey) => {
  const selected = fleetData[fleetKey];
  const language = document.documentElement.lang;
  const fleetClass = document.querySelector("#fleet-class");
  const fleetDescription = document.querySelector("#fleet-description");

  fleetClass.dataset.i18n = selected.classKey;
  fleetClass.dataset.original = selected.className;
  fleetDescription.dataset.i18n = selected.descriptionKey;
  fleetDescription.dataset.original = selected.description;
  fleetClass.innerHTML =
    translations[language]?.[selected.classKey] || selected.className;
  fleetDescription.innerHTML =
    translations[language]?.[selected.descriptionKey] || selected.description;
  document.querySelector("#fleet-name").textContent = selected.name;
  document.querySelector("#fleet-badge-name").textContent = selected.shortName;
  document.querySelector("#fleet-guests").textContent = selected.guests;
  document.querySelector("#fleet-bags").textContent = selected.bags;
  syncFleetCarouselForVehicle(fleetKey);
};

document.querySelectorAll(".fleet-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".fleet-tab")
      .forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    updateFleet(tab.dataset.fleet);
    vehicleSelect.value = tab.dataset.fleet;
    updateGuestCapacity();
    if (destinationSelect.value) updateInlinePrice(destinationSelect.value);
  });
});

fleetCarouselPrev?.addEventListener("click", () =>
  updateFleetCarousel(activeFleetPhotoIndex - 1),
);
fleetCarouselNext?.addEventListener("click", () =>
  updateFleetCarousel(activeFleetPhotoIndex + 1),
);

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
const handleSwipe = () => {
  const diffX = touchStartX - touchEndX;
  const diffY = touchStartY - touchEndY;
  const threshold = 50;
  if (Math.abs(diffX) > threshold && Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) {
      updateFleetCarousel(activeFleetPhotoIndex + 1);
    } else {
      updateFleetCarousel(activeFleetPhotoIndex - 1);
    }
  }
};
fleetCarousel?.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  },
  { passive: true },
);
fleetCarousel?.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
  },
  { passive: true },
);

syncFleetCarouselForVehicle(
  document.querySelector(".fleet-tab.active")?.dataset.fleet || "sprinter",
);

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
const getSelectedTripType = () =>
  document.querySelector('input[name="tripType"]:checked')?.value || "one_way";
const isRoundTrip = () => getSelectedTripType() === "round_trip";

// Vehicle order cheapest → largest. Combined capacity: a guest needs a seat,
// a large bag only needs boot space. So each vehicle has a seat cap (guests)
// and a combined unit cap (guests + big bags). Vito boundary = 6 pax + 5 bags.
const VEHICLE_ORDER = ["vito", "sprinter"];

// English lives in the HTML defaults, so `translations` has no `en` entry.
const capacityFallback = {
  capacitySwitchedSprinter:
    "Your party and luggage exceed the Vito — switched to the Mercedes Sprinter.",
  capacityNoVehicle:
    "This many passengers and bags exceed our vehicles. Please contact us on WhatsApp.",
};

const vehicleFits = (key, guests, luggage) => {
  const spec = fleetData[key];
  if (!spec) return false;
  const seats = Number(spec.guests) || 0;
  const units = Number(spec.maxUnits) || seats;
  return guests <= seats && guests + luggage <= units;
};

const setCapacityNote = (state) => {
  if (!capacityNote) return;
  if (!state) {
    capacityNote.hidden = true;
    capacityNote.textContent = "";
    capacityNote.removeAttribute("data-i18n");
    return;
  }
  const lang = document.documentElement.lang;
  const key =
    state === "none" ? "capacityNoVehicle" : "capacitySwitchedSprinter";
  capacityNote.dataset.i18n = key;
  capacityNote.textContent = translations[lang]?.[key] || capacityFallback[key];
  capacityNote.hidden = false;
  capacityNote.classList.toggle("capacity-note-error", state === "none");
};

const updateGuestCapacity = () => {
  const guests = Number(guestsSelect.value) || 1;
  const luggage = Number(luggageSelect?.value) || 0;

  Array.from(vehicleSelect.options).forEach((option) => {
    option.disabled = !vehicleFits(option.value, guests, luggage);
  });

  if (vehicleFits(vehicleSelect.value, guests, luggage)) {
    setCapacityNote(null);
    return;
  }

  const fit = VEHICLE_ORDER.find((key) => vehicleFits(key, guests, luggage));
  if (fit) {
    vehicleSelect.value = fit;
    setCapacityNote("switched");
    if (destinationSelect.value) updateInlinePrice(destinationSelect.value);
  } else {
    setCapacityNote("none");
  }
};

const updateInlinePrice = (routeKey, vehicleKey = vehicleSelect.value) => {
  const route = routeData[routeKey];
  const journeyCount = isRoundTrip() ? 2 : 1;
  const routeArrow = isRoundTrip() ? "⇄" : "→";
  const basePrice = route?.prices[vehicleKey];
  const baseOriginalPrice = route?.originalPrices?.[vehicleKey];
  const price = basePrice ? basePrice * journeyCount : 0;
  const originalPrice = baseOriginalPrice
    ? baseOriginalPrice * journeyCount
    : 0;
  currentQuoteData = {
    pickup: pickupSelect.value,
    destination: routeKey,
    vehicle: vehicleKey,
    price: price || 0,
    originalPrice: originalPrice || 0,
    tripType: getSelectedTripType(),
    journeyCount,
  };

  if (routeKey === "airport" && priceDisplay) {
    const language = document.documentElement.lang;
    const pickupName =
      pickupSelect.options[pickupSelect.selectedIndex]?.textContent.trim() ||
      pickupSelect.value;
    const airportName =
      airportDestinationOption?.textContent.trim() || "Antalya Airport (AYT)";
    const priceNote =
      translations[language]?.airportReturnPrice ||
      "The price will be confirmed after we check the hotel or pick-up address.";
    priceDisplay.innerHTML = `
      <span class="price-display-route">${pickupName} ${routeArrow} ${airportName}</span>
      <span class="price-display-note">${priceNote}</span>
    `;
    priceDisplay.classList.add("visible");
    return;
  }

  if (routeKey === "private_address" && priceDisplay) {
    const language = document.documentElement.lang;
    const pickupName =
      pickupSelect.options[pickupSelect.selectedIndex]?.textContent.trim() ||
      pickupSelect.value;
    const destLabel =
      destinationSelect.options[
        destinationSelect.selectedIndex
      ]?.textContent.trim() || "Private address";
    const priceNote =
      translations[language]?.customDestinationPrice ||
      "The price will be confirmed after we check the drop-off address.";
    priceDisplay.innerHTML = `
      <span class="price-display-route">${pickupName} ${routeArrow} ${destLabel}</span>
      <span class="price-display-note">${priceNote}</span>
    `;
    priceDisplay.classList.add("visible");
    return;
  }

  if (!route || !price || !priceDisplay) {
    priceDisplay?.classList.remove("visible");
    if (priceDisplay) priceDisplay.innerHTML = "";
    return;
  }
  const language = document.documentElement.lang;
  const vehicleName = fleetData[vehicleKey]?.name || vehicleKey;
  const fixedPriceNote =
    translations[language]?.perVehicle || "fixed · per vehicle";
  const priceNote = isRoundTrip()
    ? `${translations[language]?.roundTripPriceNote || tripTranslations.en.roundTripPriceNote} · ${fixedPriceNote}`
    : fixedPriceNote;
  priceDisplay.innerHTML = `
    <span class="price-display-route">AYT ${routeArrow} ${route.name}</span>
    <span class="price-display-prices">
      <strong class="price-display-amount">${formatEuroAmount(price)}</strong>
    </span>
    <span class="price-display-note">${vehicleName} · ${priceNote}</span>
  `;
  priceDisplay.classList.add("visible");
};

const updateTripTypeUI = () => {
  const roundTrip = isRoundTrip();
  returnJourneyRow.hidden = !roundTrip;
  returnJourneyRow.setAttribute("aria-hidden", String(!roundTrip));
  returnDateInput.required = roundTrip;
  returnPickupTimeInput.required = roundTrip;

  if (roundTrip) {
    returnDateInput.min = travelDate.value || localToday;
    if (!returnDateInput.value || returnDateInput.value < returnDateInput.min) {
      returnDateInput.value = returnDateInput.min;
    }
  } else {
    [returnDateInput, returnPickupTimeInput, returnFlightNumberInput].forEach(
      (input) => {
        input.value = "";
        const field = input.closest(".booking-field");
        field?.classList.remove("has-error");
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
        field?.querySelector(".field-error-message")?.remove();
      },
    );
    returnTimeControl.classList.remove("has-value");
    returnTimeValue.dataset.i18n = "chooseTime";
    returnTimeValue.textContent =
      translations[document.documentElement.lang]?.chooseTime ||
      paymentTranslations.en.chooseTime;
  }

  if (destinationSelect.value) updateInlinePrice(destinationSelect.value);
};

const updateDestinationAvailability = () => {
  if (!airportDestinationOption) return;

  const canSelectAirport = pickupSelect.value !== "airport";
  airportDestinationOption.disabled = !canSelectAirport;

  if (!canSelectAirport && destinationSelect.value === "airport") {
    destinationSelect.value = "";
    currentQuoteData = {};
    priceDisplay?.classList.remove("visible");
    if (priceDisplay) priceDisplay.innerHTML = "";
  }
};

const updatePickupAddress = () => {
  const needsAddress = pickupSelect.value === "private_address";
  pickupAddressRow.hidden = !needsAddress;
  pickupAddressInput.required = needsAddress;
  pickupAddressInput.setAttribute("aria-required", String(needsAddress));
  if (!needsAddress) {
    pickupAddressInput.value = "";
    const addressField = pickupAddressInput.closest(".booking-field");
    addressField?.classList.remove("has-error");
    pickupAddressInput.removeAttribute("aria-invalid");
    pickupAddressInput.removeAttribute("aria-describedby");
    addressField?.querySelector(".field-error-message")?.remove();
  }
};

const updateDropoffAddress = () => {
  const needsAddress = destinationSelect.value === "private_address";
  if (dropoffAddressRow) {
    dropoffAddressRow.hidden = !needsAddress;
    dropoffAddressInput.required = needsAddress;
    dropoffAddressInput.setAttribute("aria-required", String(needsAddress));
    if (!needsAddress) {
      dropoffAddressInput.value = "";
      const addressField = dropoffAddressInput.closest(".booking-field");
      addressField?.classList.remove("has-error");
      dropoffAddressInput.removeAttribute("aria-invalid");
      dropoffAddressInput.removeAttribute("aria-describedby");
      addressField?.querySelector(".field-error-message")?.remove();
    }
  }
};

const updateHotelRequirement = () => {
  const needsHotel =
    pickupSelect.value === "hotel" ||
    destinationSelect.value !== "private_address";
  hotelNameInput.required = needsHotel;
  hotelNameInput.setAttribute("aria-required", String(needsHotel));

  if (!needsHotel) {
    const hotelField = hotelNameInput.closest(".booking-field");
    hotelField?.classList.remove("has-error");
    hotelNameInput.removeAttribute("aria-invalid");
    hotelNameInput.removeAttribute("aria-describedby");
    hotelField?.querySelector(".field-error-message")?.remove();
  }
};

pickupSelect.addEventListener("change", () => {
  updatePickupAddress();
  updateDestinationAvailability();
  updateHotelRequirement();
  if (destinationSelect.value) updateInlinePrice(destinationSelect.value);
});

destinationSelect.addEventListener("change", () => {
  updateDropoffAddress();
  updateHotelRequirement();
  if (destinationSelect.value) {
    const routeName =
      routeData[destinationSelect.value]?.name || destinationSelect.value;
    const price =
      (routeData[destinationSelect.value]?.prices[vehicleSelect.value] || 0) *
      (isRoundTrip() ? 2 : 1);

    gtag("event", "view_item", {
      trip_type: getSelectedTripType(),
      items: [
        {
          item_id: destinationSelect.value,
          item_name: `Transfer to ${routeName}`,
          price: price,
        },
      ],
    });

    updateInlinePrice(destinationSelect.value);
  }
});

vehicleSelect.addEventListener("change", () => {
  updateGuestCapacity();
  if (destinationSelect.value) updateInlinePrice(destinationSelect.value);
  if (vehicleSelect.value) {
    gtag?.("event", "vehicle_selected", {
      vehicle: vehicleSelect.value,
      route: destinationSelect.value || null,
    });
  }
});

guestsSelect.addEventListener("change", updateGuestCapacity);
luggageSelect?.addEventListener("change", updateGuestCapacity);
tripTypeInputs.forEach((input) =>
  input.addEventListener("change", updateTripTypeUI),
);

updateGuestCapacity();
updatePickupAddress();
updateDropoffAddress();
updateDestinationAvailability();
updateHotelRequirement();
updateTripTypeUI();
if (destinationSelect.value) updateInlinePrice(destinationSelect.value);

const normalizeWhitespace = (value) => value.trim().replace(/\s+/g, " ");
const allowedPhoneCharacters = /[^\d+()\s.-]/g;
const flightNumberCharacters = /[^a-z0-9 -]/gi;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const flightNumberPattern = /^[a-z0-9][a-z0-9 -]{1,11}$/i;

const isValidName = (value) => {
  const normalized = normalizeWhitespace(value);
  const letterCount = normalized.match(/\p{L}/gu)?.length || 0;
  return (
    normalized.length >= 2 &&
    normalized.length <= 80 &&
    letterCount >= 2 &&
    !/\d/u.test(normalized)
  );
};

const isValidPhone = (value) => {
  const normalized = normalizeWhitespace(value);
  const digits = normalized.replace(/\D/g, "");
  const hasValidGeneralFormat =
    digits.length >= 7 &&
    digits.length <= 15 &&
    /^[+]?[\d\s().-]+$/.test(normalized) &&
    !/(?!^)\+/.test(normalized);

  if (!hasValidGeneralFormat) return false;

  const internationalNumber = normalized.replace(/^00/, "+");
  if (!internationalNumber.startsWith("+")) return false;

  return Boolean(parsePhoneNumberFromString(internationalNumber)?.isValid());
};

const isValidEmail = (value) => {
  const normalized = value.trim();
  return normalized.length <= 120 && emailPattern.test(normalized);
};

const isValidTravelDate = (value) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && value >= localToday;
};

const isValidFlightNumber = (value) => {
  const normalized = normalizeWhitespace(value);
  if (!normalized) return true;
  const alphanumericCount = normalized.replace(/[^a-z0-9]/gi, "").length;
  return (
    normalized.length >= 2 &&
    normalized.length <= 12 &&
    alphanumericCount >= 2 &&
    flightNumberPattern.test(normalized)
  );
};

const isValidHotelName = (value) => {
  const normalized = normalizeWhitespace(value);
  const letterCount = normalized.match(/\p{L}/gu)?.length || 0;
  return normalized.length >= 2 && normalized.length <= 120 && letterCount >= 2;
};

let _bookingStartedFired = false;
const _fireBookingStarted = () => {
  if (_bookingStartedFired) return;
  _bookingStartedFired = true;
  gtag?.("event", "booking_started", {
    route: destinationSelect.value || null,
    language: document.documentElement.lang || "en",
  });
};
nameInput?.addEventListener("focus", _fireBookingStarted, { once: true });

phoneInput.addEventListener("input", () => {
  const sanitized = phoneInput.value
    .replace(allowedPhoneCharacters, "")
    .replace(/(?!^)\+/g, "");
  if (phoneInput.value !== sanitized) phoneInput.value = sanitized;
});

flightNumberInput.addEventListener("input", () => {
  const sanitized = flightNumberInput.value
    .replace(flightNumberCharacters, "")
    .toUpperCase();
  if (flightNumberInput.value !== sanitized)
    flightNumberInput.value = sanitized;
});

returnFlightNumberInput.addEventListener("input", () => {
  const sanitized = returnFlightNumberInput.value
    .replace(flightNumberCharacters, "")
    .toUpperCase();
  if (returnFlightNumberInput.value !== sanitized) {
    returnFlightNumberInput.value = sanitized;
  }
});

const clearFieldError = (input) => {
  const field = input.closest(".booking-field");
  if (!field) return;
  field.classList.remove("has-error");
  input.removeAttribute("aria-invalid");
  input.removeAttribute("aria-describedby");
  field.querySelector(".field-error-message")?.remove();
};

const showFieldError = (input, message) => {
  const field = input.closest(".booking-field");
  if (!field) return;
  clearFieldError(input);
  field.classList.add("has-error");
  input.setAttribute("aria-invalid", "true");
  const error = document.createElement("span");
  error.className = "field-error-message";
  error.id = `${input.id}-error`;
  error.textContent = message;
  input.setAttribute("aria-describedby", error.id);
  field.append(error);
};

const validateBookingForm = () => {
  const language = document.documentElement.lang || "en";
  const copy = translations[language] || paymentTranslations.en;
  nameInput.value = normalizeWhitespace(nameInput.value);
  phoneInput.value = normalizeWhitespace(phoneInput.value);
  emailInput.value = emailInput.value.trim();
  flightNumberInput.value = normalizeWhitespace(
    flightNumberInput.value,
  ).toUpperCase();
  returnFlightNumberInput.value = normalizeWhitespace(
    returnFlightNumberInput.value,
  ).toUpperCase();
  hotelNameInput.value = normalizeWhitespace(hotelNameInput.value);

  const fields = [
    destinationSelect,
    travelDate,
    returnDateInput,
    returnPickupTimeInput,
    returnFlightNumberInput,
    pickupAddressInput,
    dropoffAddressInput,
    hotelNameInput,
    nameInput,
    phoneInput,
    emailInput,
    flightNumberInput,
  ];
  fields.forEach(clearFieldError);

  const errors = [];
  if (!destinationSelect.value) {
    errors.push([destinationSelect, copy.destinationRequired]);
  }
  if (!travelDate.value) {
    errors.push([travelDate, copy.requiredField]);
  } else if (!isValidTravelDate(travelDate.value)) {
    errors.push([travelDate, copy.dateInvalid]);
  }
  if (isRoundTrip()) {
    if (!returnDateInput.value) {
      errors.push([
        returnDateInput,
        copy.returnDateRequired || tripTranslations.en.returnDateRequired,
      ]);
    } else if (
      !isValidTravelDate(returnDateInput.value) ||
      returnDateInput.value < travelDate.value
    ) {
      errors.push([
        returnDateInput,
        copy.returnDateInvalid || tripTranslations.en.returnDateInvalid,
      ]);
    }
    if (!returnPickupTimeInput.value) {
      errors.push([
        returnPickupTimeInput,
        copy.returnTimeRequired || tripTranslations.en.returnTimeRequired,
      ]);
    }
    if (!isValidFlightNumber(returnFlightNumberInput.value)) {
      errors.push([returnFlightNumberInput, copy.flightInvalid]);
    }
  }
  if (pickupSelect.value === "private_address") {
    pickupAddressInput.value = normalizeWhitespace(pickupAddressInput.value);
    if (
      pickupAddressInput.value.length < 6 ||
      pickupAddressInput.value.length > 160
    ) {
      errors.push([pickupAddressInput, copy.pickupAddressRequired]);
    }
  }
  if (destinationSelect.value === "private_address" && dropoffAddressInput) {
    dropoffAddressInput.value = normalizeWhitespace(dropoffAddressInput.value);
    if (
      dropoffAddressInput.value.length < 6 ||
      dropoffAddressInput.value.length > 160
    ) {
      errors.push([dropoffAddressInput, copy.dropoffAddressRequired]);
    }
  }
  if (
    pickupSelect.value === "private_address" &&
    destinationSelect.value === "private_address" &&
    pickupAddressInput.value.length >= 6 &&
    dropoffAddressInput.value.length >= 6 &&
    pickupAddressInput.value.toLocaleLowerCase() ===
      dropoffAddressInput.value.toLocaleLowerCase()
  ) {
    errors.push([
      dropoffAddressInput,
      copy.addressesMustDiffer || paymentTranslations.en.addressesMustDiffer,
    ]);
  }
  const hotelRequired =
    pickupSelect.value === "hotel" ||
    destinationSelect.value !== "private_address";
  if (hotelRequired && !hotelNameInput.value.trim()) {
    errors.push([hotelNameInput, copy.requiredField]);
  } else if (hotelNameInput.value && !isValidHotelName(hotelNameInput.value)) {
    errors.push([hotelNameInput, copy.hotelNameRequired]);
  }
  if (!nameInput.value.trim()) {
    errors.push([nameInput, copy.requiredField]);
  } else if (!isValidName(nameInput.value)) {
    errors.push([nameInput, copy.nameInvalid]);
  }
  if (!phoneInput.value.trim()) {
    errors.push([phoneInput, copy.requiredField]);
  } else if (!isValidPhone(phoneInput.value)) {
    errors.push([phoneInput, copy.phoneInvalid]);
  }
  if (!emailInput.value.trim()) {
    errors.push([emailInput, copy.requiredField]);
  } else if (!emailInput.checkValidity() || !isValidEmail(emailInput.value)) {
    errors.push([emailInput, copy.emailInvalid]);
  }
  if (!isValidFlightNumber(flightNumberInput.value)) {
    errors.push([flightNumberInput, copy.flightInvalid]);
  }

  errors.forEach(([input, message]) => showFieldError(input, message));
  if (!errors.length) return true;

  paymentErrorMessage.textContent = copy.formIncomplete;
  paymentErrorMessage.hidden = false;
  errors[0][0].focus();
  errors[0][0]
    .closest(".booking-field")
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
  return false;
};

quoteForm.querySelectorAll("input, select").forEach((input) => {
  input.addEventListener(
    input.tagName === "SELECT" ? "change" : "input",
    () => {
      clearFieldError(input);
      paymentErrorMessage.hidden = true;
    },
  );
});

const setupTimePicker = (input, control, valueElement) => {
  const syncState = () => {
    const hasValue = Boolean(input.value);
    control.classList.toggle("has-value", hasValue);

    if (hasValue) {
      valueElement.removeAttribute("data-i18n");
      valueElement.textContent = input.value;
    } else {
      valueElement.dataset.i18n = "chooseTime";
      valueElement.textContent =
        translations[document.documentElement.lang]?.chooseTime ||
        paymentTranslations.en.chooseTime;
    }
  };

  control.addEventListener("click", (event) => {
    if (event.target === input) return;
    event.preventDefault();
    input.focus();

    try {
      if (typeof input.showPicker === "function") {
        input.showPicker();
      } else {
        input.click();
      }
    } catch {
      input.click();
    }
  });

  input.addEventListener("input", syncState);
  input.addEventListener("change", syncState);
  syncState();
  return syncState;
};

const syncArrivalTimeState = setupTimePicker(
  arrivalTimeInput,
  arrivalTimeControl,
  arrivalTimeValue,
);
const syncReturnTimeState = setupTimePicker(
  returnPickupTimeInput,
  returnTimeControl,
  returnTimeValue,
);
syncArrivalTimeState();
syncReturnTimeState();

const setWhatsAppBookingUrl = (details) => {
  const waBtn = document.querySelector("#confirmed-whatsapp");
  if (!waBtn) return;
  const lines = ["🚗 *Antalya VIP Tourism — New Booking*"];
  if (details.ref) lines.push(`📋 Ref: ${details.ref}`);
  if (details.name) lines.push(`👤 Name: ${details.name}`);
  if (details.phone) lines.push(`📞 Phone: ${details.phone}`);
  if (details.email) lines.push(`✉️ Email: ${details.email}`);
  if (details.tripType) lines.push(`↔️ Journey: ${details.tripType}`);
  if (details.date) lines.push(`📅 Date: ${details.date}`);
  if (details.hotel) lines.push(`🏨 Hotel: ${details.hotel}`);
  if (details.childSeats) lines.push(`👶 Child seats: ${details.childSeats}`);
  if (details.luggage) lines.push(`🧳 Luggage: ${details.luggage}`);
  if (details.pickup) lines.push(`📍 Pickup: ${details.pickup}`);
  if (details.dropoff) lines.push(`🏁 Dropoff: ${details.dropoff}`);
  if (details.vehicle) lines.push(`🚘 Vehicle: ${details.vehicle}`);
  if (details.guests) lines.push(`👥 Guests: ${details.guests}`);
  if (details.flight) lines.push(`✈️ Flight: ${details.flight}`);
  if (details.arrival) lines.push(`🕐 Arrival: ${details.arrival}`);
  if (details.returnDate) lines.push(`📅 Return date: ${details.returnDate}`);
  if (details.returnPickupTime)
    lines.push(`🕐 Return pickup: ${details.returnPickupTime}`);
  if (details.returnFlight)
    lines.push(`✈️ Return flight: ${details.returnFlight}`);
  if (details.price) lines.push(`💶 Price: ${formatEuroAmount(details.price)}`);
  if (details.payment) lines.push(`💳 Payment: ${details.payment}`);
  const msg = encodeURIComponent(lines.join("\n"));
  waBtn.href = `https://wa.me/905302655790?text=${msg}`;
};

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

quoteForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  paymentErrorMessage.hidden = true;
  paymentErrorMessage.textContent = "";

  if (!validateBookingForm()) return;

  gtag("event", "begin_checkout", {
    currency: "EUR",
    value: currentQuoteData.price || 0,
    trip_type: getSelectedTripType(),
    items: [
      {
        item_id: currentQuoteData.destination,
        item_name: `Transfer to ${currentQuoteData.destination}`,
        price: currentQuoteData.price || 0,
        quantity: 1,
      },
    ],
  });

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();
  const hotelName = hotelNameInput.value.trim();
  const childSeatCount = parseInt(childSeatsSelect.value || "0", 10);
  const luggageCount = parseInt(luggageSelect?.value || "0", 10);
  const pickupAddress = pickupAddressInput.value.trim();
  const tripType = getSelectedTripType();

  const submitBtn = document.querySelector("#main-book-submit");
  submitBtn.disabled = true;
  const originalText = submitBtn.querySelector("span").textContent;
  submitBtn.querySelector("span").textContent = "…";

  if (!currentQuoteData.destination) {
    const journeyCount = tripType === "round_trip" ? 2 : 1;
    currentQuoteData = {
      pickup: pickupSelect.value,
      destination: destinationSelect.value,
      vehicle: vehicleSelect.value,
      price:
        (routeData[destinationSelect.value]?.prices[vehicleSelect.value] || 0) *
        journeyCount,
      tripType,
      journeyCount,
    };
  }

  try {
    const { createBooking } = await import("./lib/api.js");
    const booking = await createBooking({
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      hotel_name: hotelName,
      child_seat_count: childSeatCount,
      luggage_count: luggageCount,
      flight_number: flightNumberInput.value.trim() || null,
      flight_arrival_time:
        document.querySelector("#flight-arrival-time").value || null,
      pickup_location: currentQuoteData.pickup || "airport",
      pickup_address:
        currentQuoteData.pickup === "private_address" ? pickupAddress : null,
      dropoff_address:
        currentQuoteData.destination === "private_address"
          ? dropoffAddressInput?.value.trim() || null
          : null,
      dropoff_location: currentQuoteData.destination || "",
      pickup_date: document.querySelector("#travel-date").value,
      trip_type: tripType,
      return_date: tripType === "round_trip" ? returnDateInput.value : null,
      return_pickup_time:
        tripType === "round_trip" ? returnPickupTimeInput.value : null,
      return_flight_number:
        tripType === "round_trip"
          ? returnFlightNumberInput.value.trim() || null
          : null,
      guests: parseInt(document.querySelector("#guests").value, 10),
      vehicle_type: currentQuoteData.vehicle === "sprinter" ? "vclass" : "vito",
      payment_method: "cash",
      language: document.documentElement.lang || "en",
      ..._utmParams,
    });

    document.querySelector("#confirmed-ref").textContent = booking.booking_ref;
    const confirmationKey =
      currentQuoteData.destination === "airport"
        ? "airportReturnPrice"
        : currentQuoteData.destination === "private_address"
          ? "customDestinationPrice"
          : "cashConfirmation";
    confirmationMessage.dataset.i18n = confirmationKey;
    confirmationMessage.textContent =
      translations[document.documentElement.lang]?.[confirmationKey] ||
      (confirmationKey === "airportReturnPrice"
        ? "The price will be confirmed after we check the hotel or pick-up address."
        : confirmationKey === "customDestinationPrice"
          ? paymentTranslations.en.customDestinationPrice
          : paymentTranslations.en.cashConfirmation);

    if (currentQuoteData.price > 0) {
      gtag("event", "purchase", {
        transaction_id: booking.booking_ref,
        currency: "EUR",
        value: currentQuoteData.price,
        payment_type: "cash",
        items: [
          {
            item_id: currentQuoteData.destination,
            item_name: `Transfer to ${currentQuoteData.destination}`,
            price: currentQuoteData.price,
            quantity: 1,
          },
        ],
      });
      gtag("event", "conversion", {
        send_to: "AW-18248114753/IW8CCL7H38AcEMHEsP1D",
        transaction_id: booking.booking_ref,
        value: currentQuoteData.price,
        currency: "EUR",
      });
    }

    setWhatsAppBookingUrl({
      ref: booking.booking_ref,
      name,
      phone,
      email,
      date: document.querySelector("#travel-date").value,
      tripType: tripType === "round_trip" ? "Round trip" : "One way",
      hotel: hotelName,
      childSeats: childSeatCount,
      luggage: luggageCount,
      pickup:
        currentQuoteData.pickup === "private_address"
          ? pickupAddress
          : currentQuoteData.pickup === "airport"
            ? "Antalya Airport"
            : hotelName,
      dropoff:
        currentQuoteData.destination === "airport"
          ? "Antalya Airport"
          : currentQuoteData.destination === "private_address"
            ? dropoffAddressInput.value.trim()
            : routeData[currentQuoteData.destination]?.name ||
              currentQuoteData.destination,
      vehicle:
        currentQuoteData.vehicle === "sprinter"
          ? "V-Class (Sprinter)"
          : "Mercedes Vito",
      guests: document.querySelector("#guests").value,
      flight: flightNumberInput.value.trim() || null,
      arrival: document.querySelector("#flight-arrival-time").value || null,
      returnDate: tripType === "round_trip" ? returnDateInput.value : null,
      returnPickupTime:
        tripType === "round_trip" ? returnPickupTimeInput.value : null,
      returnFlight:
        tripType === "round_trip"
          ? returnFlightNumberInput.value.trim() || null
          : null,
      price: currentQuoteData.price || null,
      payment: "Cash in vehicle",
    });
    event.target.reset();
    travelDate.value = localToday;
    currentQuoteData = {};
    updateGuestCapacity();
    updatePickupAddress();
    updateDropoffAddress();
    updateDestinationAvailability();
    updateHotelRequirement();
    updateTripTypeUI();
    syncArrivalTimeState();
    syncReturnTimeState();
    if (priceDisplay) priceDisplay.classList.remove("visible");
    openConfirmation();
  } catch (err) {
    console.error("Booking error:", err);
    const language = document.documentElement.lang || "en";
    paymentErrorMessage.textContent =
      translations[language]?.bookingError ||
      paymentTranslations.en.bookingError;
    paymentErrorMessage.hidden = false;
  } finally {
    submitBtn.disabled = false;
    if (submitBtn.querySelector("span").textContent === "…") {
      submitBtn.querySelector("span").textContent = originalText;
    }
    syncArrivalTimeState();
    syncReturnTimeState();
  }
});

document.querySelectorAll(".route-price-button").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedVehicle =
      button.dataset.vehicle || vehicleSelect.value || "vito";
    destinationSelect.value = button.dataset.route;
    vehicleSelect.value = selectedVehicle;
    updateDropoffAddress();
    updateHotelRequirement();
    updateGuestCapacity();
    updateInlinePrice(button.dataset.route, selectedVehicle);
    gtag?.("event", "route_selected", {
      route: button.dataset.route,
      source: "route_card",
    });
    document.querySelector("#booking").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.querySelector("#customer-name").focus(), 600);
  });
});

const routeSlider = document.querySelector("#route-slider");
const routeSliderPrev = document.querySelector(".route-slider-prev");
const routeSliderNext = document.querySelector(".route-slider-next");

const updateRouteSliderControls = () => {
  if (!routeSlider) return;
  const maxScroll = routeSlider.scrollWidth - routeSlider.clientWidth;
  routeSliderPrev.disabled = routeSlider.scrollLeft <= 4;
  routeSliderNext.disabled = routeSlider.scrollLeft >= maxScroll - 4;
};

const scrollRouteSlider = (direction) => {
  const card = routeSlider?.querySelector(".route-card");
  if (!routeSlider || !card) return;
  const gap = parseFloat(getComputedStyle(routeSlider).gap) || 0;
  routeSlider.scrollBy({
    left: direction * (card.getBoundingClientRect().width + gap),
    behavior: "smooth",
  });
};

routeSliderPrev?.addEventListener("click", () => scrollRouteSlider(-1));
routeSliderNext?.addEventListener("click", () => scrollRouteSlider(1));
routeSlider?.addEventListener("scroll", updateRouteSliderControls, {
  passive: true,
});
routeSlider?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    scrollRouteSlider(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    scrollRouteSlider(1);
  }
});
window.addEventListener("resize", updateRouteSliderControls);
updateRouteSliderControls();

document.querySelectorAll(".price-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    destinationSelect.value = pill.dataset.route;
    updateDropoffAddress();
    updateHotelRequirement();
    updateInlinePrice(pill.dataset.route);
    gtag?.("event", "route_selected", {
      route: pill.dataset.route,
      source: "price_pill",
    });
    document.querySelector("#booking").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.querySelector("#customer-name").focus(), 600);
  });
});

quoteModal
  .querySelector(".modal-close")
  .addEventListener("click", closeConfirmation);
quoteModal
  .querySelector(".modal-backdrop")
  .addEventListener("click", closeConfirmation);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeConfirmation();
    closeMenu();
  }
});

const LANG_FLAGS = {
  en: "🇬🇧",
  de: "🇩🇪",
  tr: "🇹🇷",
  ru: "🇷🇺",
  ar: "🇸🇦",
  pl: "🇵🇱",
  nl: "🇳🇱",
  uk: "🇺🇦",
  fr: "🇫🇷",
  sv: "🇸🇪",
  ja: "🇯🇵",
  ko: "🇰🇷",
  zh: "🇨🇳",
  da: "🇩🇰",
  es: "🇪🇸",
  el: "🇬🇷",
  he: "🇮🇱",
  it: "🇮🇹",
  hu: "🇭🇺",
  pt: "🇵🇹",
  ro: "🇷🇴",
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
  const supportedLanguage =
    translations[language] || language === "en" ? language : "en";
  document.documentElement.lang = supportedLanguage;
  document.documentElement.dir = ["ar", "ur", "he"].includes(supportedLanguage)
    ? "rtl"
    : "ltr";

  if (langFlagEl)
    langFlagEl.textContent = LANG_FLAGS[supportedLanguage] || "🌐";

  document.querySelectorAll(".language-button").forEach((item) => {
    const isActive = item.dataset.language === supportedLanguage;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    if (!element.dataset.original) element.dataset.original = element.innerHTML;
    element.innerHTML = resolvePriceTokens(
      translations[supportedLanguage]?.[element.dataset.i18n] ||
        element.dataset.original,
    );
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    if (!element.dataset.originalPlaceholder) {
      element.dataset.originalPlaceholder =
        element.getAttribute("placeholder") || "";
    }
    element.setAttribute(
      "placeholder",
      translations[supportedLanguage]?.[element.dataset.i18nPlaceholder] ||
        element.dataset.originalPlaceholder,
    );
  });

  const activeFleet = document.querySelector(".fleet-tab.active");
  if (activeFleet) updateFleet(activeFleet.dataset.fleet);
  if (destinationSelect.value && priceDisplay.classList.contains("visible")) {
    updateInlinePrice(destinationSelect.value);
  }
  try {
    localStorage.setItem("avl-language", supportedLanguage);
  } catch {}
};

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => {
    const language = button.dataset.language;
    const languageUrl = getLanguageUrl(language);
    if (languageUrl) {
      try {
        localStorage.setItem("avl-language", language);
      } catch {}
      window.location.assign(languageUrl);
      return;
    }

    gtag?.("event", "language_selected", { language });
    applyLanguage(language);
    closeLangDropdown();
    if (mobileMenu.classList.contains("open")) closeMenu();
  });
});

const normalizeDirectoryPath = (pathname) => {
  if (pathname.endsWith("/")) return pathname;
  if (pathname.endsWith("/index.html")) {
    return pathname.replace(/index\.html$/, "");
  }
  return `${pathname}/`;
};

function getLanguageUrl(language) {
  const pathname = normalizeDirectoryPath(window.location.pathname);
  const hash = window.location.hash || "";

  const localizedMatch = pathname.match(/^\/(de|tr|ru)(\/.*)?$/);
  const basePath = localizedMatch ? localizedMatch[2] || "/" : pathname;
  const isIndexablePath =
    basePath === "/" || basePath.startsWith("/transfers/");

  if (isIndexablePath && ["en", "de", "tr", "ru"].includes(language)) {
    const prefix = language === "en" ? "" : `/${language}`;
    return `${prefix}${basePath}${hash}`;
  }

  return null;
}

const SUPPORTED_LANGS = [
  "en",
  "de",
  "tr",
  "ru",
  "cs",
  "ar",
  "pl",
  "nl",
  "uk",
  "ur",
  "fr",
  "sv",
  "ja",
  "ko",
];

function detectBrowserLanguage() {
  const langs = navigator.languages?.length
    ? navigator.languages
    : [navigator.language || "en"];
  for (const l of langs) {
    const code = l.split("-")[0].toLowerCase();
    if (SUPPORTED_LANGS.includes(code)) return code;
  }
  return "en";
}

const pathLanguage =
  window.location.pathname.match(/^\/(de|tr|ru)(?:\/|$)/)?.[1] ||
  document.documentElement.lang ||
  "en";
let savedLanguage = pathLanguage;
try {
  savedLanguage = ["de", "tr", "ru"].includes(pathLanguage)
    ? pathLanguage
    : localStorage.getItem("avl-language") ||
      pathLanguage ||
      detectBrowserLanguage();
} catch {
  savedLanguage = pathLanguage || detectBrowserLanguage();
}
applyLanguage(savedLanguage);

const _utmParams = (() => {
  try {
    const sp = new URLSearchParams(window.location.search);
    const stored = JSON.parse(sessionStorage.getItem("avl-attribution") || "{}");
    const fresh = {
      utm_source: sp.get("utm_source"),
      utm_medium: sp.get("utm_medium"),
      utm_campaign: sp.get("utm_campaign"),
      utm_term: sp.get("utm_term"),
      utm_content: sp.get("utm_content"),
      gclid: sp.get("gclid"),
    };
    const merged = {};
    for (const k of Object.keys(fresh)) merged[k] = fresh[k] || stored[k] || null;
    merged.landing_page = stored.landing_page || window.location.pathname;
    merged.referrer = stored.referrer || (document.referrer || null);
    sessionStorage.setItem("avl-attribution", JSON.stringify(merged));
    return merged;
  } catch {
    return {};
  }
})();

gtag?.("event", "landing_view", {
  language: savedLanguage,
  page: window.location.pathname,
  source: document.referrer ? "referral" : "direct",
  utm_source: _utmParams.utm_source,
  utm_campaign: _utmParams.utm_campaign,
});

document.querySelectorAll("a[href*='wa.me']").forEach((link) => {
  link.addEventListener(
    "click",
    () => {
      gtag?.("event", "whatsapp_clicked", {
        source: link.closest("[id]")?.id || "unknown",
      });
    },
    { once: false },
  );
});

document.querySelectorAll("a[href^='tel:']").forEach((link) => {
  link.addEventListener("click", () => {
    gtag?.("event", "phone_clicked", {
      source: link.closest("[id]")?.id || "unknown",
    });
  });
});

// Handle the verified iyzico callback return.
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("payment") === "success" && urlParams.get("booking_ref")) {
  const bookingRef = urlParams.get("booking_ref");
  document.querySelector("#confirmed-ref").textContent = bookingRef;
  confirmationMessage.dataset.i18n = "weWillContact";
  confirmationMessage.textContent =
    translations[document.documentElement.lang]?.weWillContact ||
    "Your payment was successful. We will contact you within 30 minutes.";
  setWhatsAppBookingUrl({ ref: bookingRef, payment: "Card (paid online)" });
  openConfirmation();
  window.history.replaceState({}, "", window.location.pathname);
} else if (urlParams.get("payment") === "failed") {
  const language = document.documentElement.lang || "en";
  paymentErrorMessage.textContent =
    translations[language]?.paymentError || "Payment failed. Please try again.";
  paymentErrorMessage.hidden = false;
  document.querySelector("#booking").scrollIntoView({ behavior: "smooth" });
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
  { threshold: 0.12 },
);

document
  .querySelectorAll(".service-card, .route-card, .review-card")
  .forEach((element) => {
    const siblings = Array.from(element.parentElement.children);
    const delay = (siblings.indexOf(element) % 4) * 0.09;
    element.style.opacity = "0";
    element.style.transform = "translateY(22px)";
    element.style.transition = `opacity .65s ease ${delay}s, transform .65s ease ${delay}s, box-shadow .35s ease`;
    observer.observe(element);
  });

const revealStyle = document.createElement("style");
revealStyle.textContent =
  ".is-visible{opacity:1!important;transform:translateY(0)!important}";
document.head.appendChild(revealStyle);

// Count-up animation for luxury stats
document.querySelectorAll(".luxury-stats strong").forEach((el) => {
  const raw = el.textContent.trim();
  const match = raw.match(/^([\d,]+)(\+?)(%?)$/);
  if (!match) return;
  const target = parseInt(match[1].replace(/,/g, ""), 10);
  const suffix = match[2] + match[3];
  const statsObs = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      statsObs.unobserve(el);
      let startTs = null;
      const duration = 1800;
      const step = (ts) => {
        if (!startTs) startTs = ts;
        const progress = Math.min((ts - startTs) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent =
          (current >= 1000 ? current.toLocaleString() : current) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else
          el.textContent =
            (target >= 1000 ? target.toLocaleString() : target) + suffix;
      };
      requestAnimationFrame(step);
    },
    { threshold: 0.5 },
  );
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
  <a class="btn-wa" href="https://wa.me/905302655790" target="_blank" rel="noreferrer" aria-label="WhatsApp">
    <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" viewBox="0 0 24 24"><path d="M20 11.5a8 8 0 0 1-11.8 7L3 20l1.5-5.1A8 8 0 1 1 20 11.5Z"/><path d="M8 8.5c.8 3 2.5 4.7 5.5 5.5"/></svg>
  </a>
`;
document.body.appendChild(bookBar);

const bookBarLabel = bookBar.querySelector("[data-i18n='bookTransfer']");
bookBarLabel.dataset.original = bookBarLabel.innerHTML;
bookBarLabel.innerHTML =
  translations[document.documentElement.lang]?.bookTransfer ||
  bookBarLabel.dataset.original;

const heroSection = document.querySelector(".hero");
const barObs = new IntersectionObserver(
  (entries) => {
    bookBar.classList.toggle("visible", !entries[0].isIntersecting);
  },
  { threshold: 0.1 },
);
barObs.observe(heroSection);
