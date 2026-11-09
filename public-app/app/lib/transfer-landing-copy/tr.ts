import type { TransferLandingCopy } from "../transfer-landing-copy";

/**
 * Turkish serves two different readers: yurt dışından gelen Türk misafirler
 * ve yurt içi bağlantı uçuşuyla AYT'ye inenler. Metin ikisine de hitap eder,
 * fiyat ve ödeme kuralı Almanca sayfalarla birebir aynıdır.
 */
export const tr: TransferLandingCopy = {
  heroHeading: (name) => `Antalya Havalimanı → ${name} özel transfer`,
  heroCta: "Transferinizi ayırtın",
  heroTrust: [
    "7 kişiye kadar",
    "Ön ödeme gerekmez",
    "Ödeme doğrudan şoföre",
    "Sabit toplam fiyat, gizli ücret yok",
    "Talep üzerine ücretsiz çocuk koltuğu",
    "Uçuş takibi dahil",
  ],
  serviceHeading: (name) => `${name} için özel transferiniz`,
  aboutHeading: (name) => `${name} hakkında`,
  ownGroup: (name) =>
    `Araçta yalnızca kendi grubunuz olur ve doğrudan ${name} bölgesindeki otelinize gidersiniz. Servis aracı yok, tanımadığınız yolcu yok, gereksiz durak yok — sabit fiyat aracın tamamı için geçerlidir.`,
  arrivalHeading: "Antalya Havalimanı'na varışınız",
  arrivalBody:
    "Bagajınızı aldıktan sonra Meet & Greet J / 777 karşılama alanına geçin. Havalimanı ekibimiz rezervasyonunuzu bulur ve sizi şoförünüzle buluşturur. Uçuşunuzu takip ettiğimiz için rötar olduğunda karşılama saati ek ücret olmadan kayar.",
  returnHeading: "Gidiş ve dönüş transferi",
  returnBody: (name) =>
    `${name} bölgesinden Antalya Havalimanı'na dönüş transferinizi de biz planlarız. Rezervasyon sırasında uçuş numaranızı ve istediğiniz alış saatini bildirin.`,
  privateHeading: "Özel transfer, grup servisi değil",
  privateBody: (name) =>
    `Bu transferde araçta sadece siz ve yanınızdakiler bulunur. Rezervasyondan sonra seyahat bilgileriniz ve ulaşabileceğiniz bir numarayla birlikte net bir onay alırsınız. Varış günü ekibimiz uçuşunuzu izler; erken ya da geç inişte buluşmayı ona göre ayarlar. Şoförünüz sizi bagajınızla birlikte doğrudan otel resepsiyonuna ya da ${name} bölgesinde verdiğiniz özel adrese bırakır.`,
  priceBody:
    "Görünen tutar araç başına sabit toplam fiyattır, kişi başı değildir. Uçuş takibi, olağan bekleme süresi veya talep üzerine çocuk koltuğu için gizli ek ücret yoktur. Ödeme yolculuğun başında doğrudan şoföre nakit yapılır; böylece maliyeti yola çıkmadan önce bilirsiniz.",
  vehicleHeading: "Araç, bagaj ve çocuklar",
  vehicleBody:
    "Mercedes Vito, normal tatil bagajıyla altı kişiye kadar uygundur; daha büyük gruplar için 12 koltuğa kadar Mercedes Sprinter vardır. Büyük boy bagajınızı, bebek arabanızı veya ihtiyacınız olan çocuk koltuklarını rezervasyonda belirtin; aracı grubunuza göre ayarlarız.",
  wholeVehicle: "Aracın tamamı için fiyat",
  priceTrust: [
    "Ön ödeme gerekmez",
    "Ödeme doğrudan şoföre",
    "Gizli ücret yok",
  ],
  hotelsEyebrow: "Konaklamanız için",
  hotelsHeading: (name) => `${name} bölgesinde sık gidilen oteller`,
  hotelsBody: () => "Bu otellere ve bölgedeki diğer tüm otellere doğrudan gidiyoruz.",
  faq: [
    [
      "Antalya Havalimanı'nda transfer ekibiyle nerede buluşurum?",
      "Bagajınızı aldıktan sonra Meet & Greet J / 777 karşılama alanına geçin. Havalimanı ekibimiz rezervasyonunuzu bulup sizi şoförünüzle buluşturur.",
    ],
    [
      "Transferi önceden ödemem gerekiyor mu?",
      "Hayır. Ön ödeme gerekmez. Sabit toplam tutarı doğrudan şoföre ödersiniz.",
    ],
    [
      "Çocuk koltuğu var mı?",
      "Var. Çocuk koltuklarını talep üzerine ücretsiz veriyoruz. Rezervasyonda çocuk sayısını ve yaşlarını belirtmeniz yeterli.",
    ],
  ],
  regions: {
    antalya: {
      about: "Lara ve Kundu sahil şeridiyle Antalya şehri havalimanından yalnızca birkaç kilometre uzaktadır. Lara kıyısı boyunca büyük temalı tatil köyleri ve şehir otelleri sıralanır; batıdaki Konyaaltı ise çakıl plajı ve uzun sahil bandıyla öne çıkar.",
      routeDetails: "Antalya Havalimanı'ndan kısa yol Lara sahil yolundan ya da doğrudan şehir merkezine gider. Bu kısa mesafede bile özel transfer işe yarar: başka yolcu beklemek yok, aktarma yok, araç doğrudan otelinizin önüne gelir.",
    },
    belek: {
      about: "Belek, Antalya'nın doğusunda yer alır ve özellikle golf sahaları, büyük her şey dahil tesisler ve geniş kum plajlarıyla bilinir. Oteller Kadriye ile Serik kıyısı arasına yayıldığı için rezervasyonda tam otel adresi işimizi kolaylaştırır.",
      routeDetails: "Yol, Antalya Havalimanı'ndan D400 üzerinden Serik ve Belek yönüne çıkar. Aileler, golf oynayanlar ve gece uçuşuyla gelenler için doğrudan özel transfer en rahat seçenek: ara duraklar ve aktarma olmadan konaklamanıza varırsınız.",
    },
    side: {
      about: "Side, tarihî antik kentini uzun kum plajları ve geniş tatil tesisleriyle birleştirir. Side'nin yanı sıra Kumköy, Evrenseki, Çolaklı, Sorgun ve Titreyengöl otel bölgeleri de bu tatil yöresine dahildir.",
      routeDetails: "Antalya Havalimanı'ndan güzergâh sahil yolundan Manavgat ve Side yönüne gider. Özellikle gece varışlarında özel araç rahatlık sağlar: grubunuz başka otel misafirlerini beklemeden rezerve ettiği tesise gider.",
    },
    kemer: {
      about: "Kemer, Antalya'nın batısında Toros Dağları ile Akdeniz arasında yer alır. Bölge; Kemer merkezin yanında Beldibi, Göynük, Kiriş ve Çamyuva'yı kapsar — sahil otelleri, yat limanı ve arkada dağ manzarası.",
      routeDetails: "Doğrudan yol Antalya'nın batısında kıyıyı takip eder. Şoförünüz sizi aktarma olmadan otelinize bırakır; çocuklu seyahatlerde, spor ekipmanıyla gelirken veya akşam inişinden sonra bunun değeri daha da artar.",
    },
    alanya: {
      about: "Alanya, Türk Rivierası'nın en sevilen tatil yerlerinden biridir ve Antalya çevresindeki tesislerden belirgin biçimde daha doğuda kalır. Merkezin yanında en çok sorulan otel bölgeleri Mahmutlar, Kestel, Avsallar, Türkler ve Okurcalar'dır.",
      routeDetails: "Uzun kıyı yolculuğunda araç başına sabit fiyatın değeri net görülür. Özel transferle yalnızca kendi grubunuzla seyahat eder, inişten sonra otel resepsiyonuna kadar rahatça gidersiniz.",
    },
    kizilagac: {
      about: "Kızılağaç, Manavgat'ın doğusunda yer alır ve geniş sahil tesisleri ile sakin aile tatilleriyle bilinir. Bölge Sorgun ve Manavgat'a komşudur; pek çok otel ana yoldan biraz içeride, doğrudan deniz kıyısındadır.",
      routeDetails: "Antalya Havalimanı'ndan D400 ile Manavgat yönüne, ardından Kızılağaç'a devam edersiniz. Özel araç, tam bu güzergâhta grup transferlerinde sık görülen ek otel duraklarını ortadan kaldırır.",
    },
    tekirova: {
      about: "Tekirova, Kemer'in güneyinde Olympos-Beydağları Milli Parkı'nın sınırında yer alır. Bakımlı tesis alanlarını küçük koylarla birleştirir ve antik Phaselis'e yakındır.",
      routeDetails: "Yol Antalya Havalimanı'ndan Kemer üzerinden Tekirova'ya uzanır. Kıyı konumu ve mesafe doğrudan transferi mantıklı kılar: aktarma yapmadan ve başka misafirleri beklemeden otelinize varırsınız.",
    },
    bogazkent: {
      about: "Boğazkent, Belek ile Side arasındaki kıyıda, Serik ilçesinde yer alır. Büyük her şey dahil tesisler geniş bir kum plajının hemen kıyısında sıralanır, Belek'in golf sahaları da yalnızca birkaç dakika uzaktadır; bu yüzden hem aileler hem de golfçüler için sakin bir konaklama noktasıdır.",
      routeDetails: "Antalya Havalimanı'ndan yol D400 üzerinden doğuya, Belek'i geçerek ilerler, ardından kıyıya döner. Yaklaşık 48 km ile bu listedeki kısa transferlerden biridir; özel araç sizi varış salonundan tesisinizin girişine, başka otellerde durmadan götürür.",
    },
    manavgat: {
      about: "Manavgat, Side'nin doğusunda, aynı adı taşıyan nehrin kıyısında canlı bir ilçedir. Şelalesi, nehirde tekne turları ve haftalık pazarıyla bilinir; aynı zamanda bu kıyı şeridindeki tesislere açılan kapıdır. Bölge geniş olduğu için rezervasyon sırasında otelinizin tam adresini bildirmenizi rica ederiz.",
      routeDetails: "Güzergâh Antalya Havalimanı'ndan D400 üzerinden doğuya doğru yaklaşık 75 km sürer. Yolculuk bir saat kadar tutar; doğrudan özel transfer, bu yoğun sahil yolunda grup servislerinin yaptığı ek otel duraklarından sizi kurtarır.",
    },
    bodrum: {
      about: "Bodrum, Muğla ilinde Ege kıyısında yer alır; Haçlı kalesi, marinası ve yamaçlardaki beyaz evleriyle ünlüdür. Yarımada çevresinde Gümbet ve Bitez gibi hareketli semtlerin yanı sıra Yalıkavak, Türkbükü ve Gümüşlük'te daha sakin koylar bulunur.",
      routeDetails: "Yaklaşık 380 km ile sunduğumuz en uzun yolculuklardan biridir ve rahat molalarla beş ila altı saat sürer. Özel araç, toplu taşımaya göre günü çok kolaylaştırır: indiğiniz anda yola çıkar, istediğiniz yerde mola verir ve yarımadadaki kendi otelinize varırsınız. Yolculuğu planlayabilmemiz için rezervasyonda otelinizi ve iniş saatinizi bildirin.",
    },
    dalaman: {
      about: "Dalaman, Likya ve Karya kıyılarının kapısıdır. Havalimanı Sarıgerme ve Göcek gibi tatil yerlerine hizmet verir; yakındaki Dalyan ise nehir deltası, Kaunos kaya mezarları ve İztuzu kaplumbağa plajıyla tanınır.",
      routeDetails: "Antalya Havalimanı'ndan 235 km'lik yol, kıvrımlı Likya sahil yolunu izler ve üç ile üç buçuk saat sürer. Araç başına sabit fiyat uzun yolculuğun bütçesini kolaylaştırır; özel araçla grubunuz dilediği zaman dinlenmek veya yemek yemek için durabilir.",
    },
    fethiye: {
      about: "Fethiye, çam ormanlarıyla kaplı dağlarla çevrili geniş bir körfezde yer alır. Mavi lagünüyle Ölüdeniz'in, plajları ve gece hayatıyla Çalış'ın, daha sakin Hisarönü ve Kayaköy köylerinin çıkış noktasıdır. Birçok misafir ayrıca Babadağ'dan yamaç paraşütü ve On İki Ada tekne turları için gelir.",
      routeDetails: "Antalya Havalimanı'ndan 205 km'lik yol Likya kıyısı boyunca Kumluca, Kaş ve Kalkan üzerinden geçer ve yaklaşık iki buçuk ile üç saat sürer. Yol virajlı ve manzaralıdır. Özel transferle Fethiye'de araç değiştirmeniz gerekmez; şoför sizi Ölüdeniz, Çalış veya Hisarönü'ndeki otelinize götürür.",
    },
    pamukkale: {
      about: "Denizli ilindeki Pamukkale, beyaz travertenleri ve ılık termal havuzlarıyla tanınan bir UNESCO Dünya Mirası alanıdır. Üstteki tepede antik Hierapolis kenti; tiyatrosu, nekropolü ve ziyaretçilerin batık sütunlar arasında yüzebildiği antik havuzuyla yer alır.",
      routeDetails: "Güzergâh kıyıdan ayrılır ve Toroslar ile yayla üzerinden Denizli yönüne, iç kesimlerde yaklaşık 245 km sürer; yolculuk üç ile üç buçuk saat kadar tutar. Özel araç bu yolculuğa çok uygundur: araç değiştirmezsiniz, yolda mola planlayabilirsiniz ve Pamukkale veya Karahayıt'taki otelinize doğrudan varırsınız.",
    },
    kapadokya: {
      about: "İç Anadolu'daki Kapadokya, peri bacaları, kayaya oyulmuş kiliseleri ve yeraltı şehirleriyle bilinir. Gün doğarken Göreme, Uçhisar ve Ürgüp üzerinde sıcak hava balonları yükselir; birçok misafir kayaya oyulmuş bir otelde konaklar.",
      routeDetails: "Yaklaşık 540 km ile yolculuk Akdeniz'den Toroslar'ı aşıp Anadolu platosunu geçer ve molalarla yedi ila sekiz saat sürer. Özel transfer bunun için rahat yoldur: grubunuz birlikte seyahat eder, şoför molaları sizinle birlikte planlar ve sizi mağara otelinizin girişine bırakır. Günü planlayabilmemiz için rezervasyonda uçuş numaranızı ve otelinizi bildirin.",
    },
  },
};
