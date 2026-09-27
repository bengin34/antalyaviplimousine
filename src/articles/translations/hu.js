/**
 * Blog copy for hu: the page chrome plus every article body.
 * One file per language, so adding a market is adding a file.
 */
export const chrome = {
  locale: "hu_HU",
  indexTitle: "Antalyai transzfer útmutatók és utazási cikkek | Antalya VIP Tourism",
  indexDescription:
    "Gyakorlatias útmutatók az antalyai érkezéshez: transzfer vagy taxi, a sofőrrel való találkozás, utazás gyerekekkel, parti távolságok és mikor érdemes menni.",
  heading: "Antalyai transzfer útmutatók",
  intro:
    "Gyakorlatias cikkek az antalyai repülőtérre érkezésről és a szállodáig vezető útról - a naponta futtatott transzferjeinkből, nem prospektusból.",
  blog: "Útmutatók",
  readMore: "Útmutató elolvasása",
  minReadLabel: "{minutes} perc olvasás",
  updated: "Frissítve",
  contents: "Ebben az útmutatóban",
  faqHeading: "Gyakori kérdések",
  relatedHeading: "Az útmutatóban szereplő transzferútvonalak",
  routeGuidesHeading: "Útmutatók ehhez a transzferhez",
  moreHeading: "További útmutatók",
  ctaHeading: "Fix áras transzfer az antalyai repülőtérről",
  ctaText:
    "Egy ár a teljes járműre, a járatkövetés benne van, fizetés készpénzben a sofőrnek. Nézze meg az útvonalát, és foglaljon egy perc alatt.",
  ctaButton: "Fix ár megtekintése",
  backToBlog: "Összes útmutató",
  home: "Főoldal",
  routes: "Transzferútvonalak",
  book: "Transzfer foglalása",
  imprint: "Impresszum",
  privacy: "Adatvédelem",
  imprintUrl: "/impressum.html",
  privacyUrl: "/privacy/",
};

export const articles = {
  "transfer-vs-taxi": {
    slug: "transzfer-vagy-taxi-antalya-repuloter",
    title: "Antalyai repülőtér: magántranszfer, taxi vagy közös shuttle?",
    heading: "Magántranszfer, taxi vagy közös shuttle az antalyai repülőtérről?",
    description:
      "Mennyibe kerül valójában a három lehetőség az antalyai repülőtérről, mennyi ideig tart, és melyik illik a társaságához. Összehasonlítás fix, járműre szóló árral.",
    excerpt:
      "Három út kifelé az antalyai repülőtérről, és három nagyon eltérő nyaraláskezdés. Mennyibe kerül, mennyi ideig tart, és kinek való.",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "Három-öt óra repülés után landol az antalyai repülőtéren (AYT), gyakran késő este, rendszerint csomagokkal és nemritkán gyerekekkel. A következő negyven perc dönti el, hogyan kezdődik a nyaralás. Három reális kiút vezet a terminálból, és a legalacsonyabb kiírt ár ritkán jelenti a legolcsóbb utat." },
      { type: "h2", text: "A három lehetőség egymás mellett" },
      {
        type: "table",
        head: ["", "Magántranszfer", "Repülőtéri taxi", "Közös shuttle"],
        rows: [
          ["Ár alapja", "Fix, járművenként", "Taxióra, utanként", "Személyenként"],
          ["Előre ismert", "Igen", "Nem", "Igen"],
          ["Vár késés esetén", "Igen, járatkövetéssel", "Nem", "Korlátozottan"],
          ["Megállók a szállodája előtt", "Nincs", "Nincs", "Akár 8"],
          ["Csomagtér", "Kisbusznyi", "Személyautónyi", "Megosztott"],
          ["Gyerekülés", "Kérésre, díjmentes", "Ritkán", "Nincs"],
        ],
      },
      { type: "h2", text: "Mennyibe kerül valójában a taxi" },
      { type: "p", text: "A taxi minden repülőtéren kézenfekvő válasz, és rövid távon ésszerű is. A Török Riviérán a távolság a gond: Belek 45 km, Side 65 km, Alanya 125 km. Egy éjjel 125 kilométeren át ketyegő taxióra, a sofőr által beárazott visszaúttal együtt, olyan összeget ad, amit előre senki nem mondott. És nincs mire hivatkoznia, ha nem a legrövidebb úton mentek." },
      { type: "p", text: "A magántranszfer ezt megfordítja: a teljes jármű ára az indulás előtt rögzített, dugóban sem változik, és ugyanannyi, akár egy, akár hat ember utazik." },
      { type: "h2", text: "Miért tűnik olcsónak a közös shuttle, és miért nem az" },
      { type: "p", text: "A személyenkénti ár egyedül utazónak verhetetlennek tűnik, és már két főnél megszűnik olcsónak lenni. Egy négyfős családnak Side-ba négy hely rendszerint többe kerül, mint egy fix áras kisbusz. A valódi ár azonban az idő: a jármű akkor indul, amikor megtelt, és a parti úton olyan sorrendben teszi ki az utasokat, ahogy az útvonalnak kényelmes, nem ahogy önnek. Egy éjszakai járat után utolsónak érkezni könnyen több mint egy órát ad hozzá." },
      { type: "h2", text: "Mikor melyik a helyes válasz" },
      {
        type: "ul",
        items: [
          "Egyedül, kézipoggyásszal, nappali landolással, Antalya belvárosi szállodával: a taxi vagy a shuttle megfelel.",
          "Ketten vagy többen a városon kívüli szállodával: a saját jármű általában olcsóbb és mindig gyorsabb.",
          "Gyerekülést, babakocsit vagy golfbagot vivő családok: magán, mert a kapacitás előre megerősített.",
          "Éjszakai érkezés és csúszó átszállás: magán, mert a felvétel a járatot követi, nem a menetrendet.",
        ],
      },
      { type: "h2", text: "Mit érdemes tisztázni foglalás előtt" },
      { type: "p", text: "Három kérdés azonnal láthatóvá teszi a különbséget. Az ár járműre vagy személyre szól? Fix, vagy mozog a forgalommal és a napszakkal? És mi történik, ha a járat két órát késik - vár-e még valaki, és kerül-e felárba? A mi fix áraink járműre szólnak, a járatkövetés benne van, és a landolás utáni első 90 perc várakozás díjmentes, késés esetén pedig automatikusan eltolódik." },
    ],
    faq: [
      ["Drágább a magántranszfer, mint a taxi Antalyában?", "Antalya belvárosáig összemérhető. Belekbe, Side-ba, Kemerbe vagy Alanyába a fix járműár jellemzően alatta marad az ugyanazon távon mért taxiórás összegnek, és már indulás előtt ismeri."],
      ["Személyenként vagy járművenként fizetek?", "Járművenként. A Mercedes Vito ára hat utasig érvényes, a Sprinter a nagyobb társaságoké. Egy plusz utas nem változtat az áron."],
      ["Mi történik, ha késik a járatom?", "Valós időben követjük a járatot, és felár nélkül toljuk a felvételt. A benne foglalt 90 perc várakozás a tényleges landolástól indul."],
      ["Fizethetek készpénzzel érkezéskor?", "Igen. Előleg nem szükséges; a foglalásában szereplő fix összeget közvetlenül a sofőrnek fizeti az út elején."],
    ],
  },
  "airport-arrival-guide": {
    slug: "erkezes-antalya-repuloter-utmutato",
    title: "Érkezés az antalyai repülőtérre: terminálok, találkozási pont, várakozás",
    heading: "Érkezés az antalyai repülőtérre: mi történik landolás után",
    description:
      "Lépésről lépésre az antalyai repülőtéri érkezésen - terminálok, útlevélvizsgálat, csomag, hol vár a sofőr és meddig tart a díjmentes várakozás.",
    excerpt:
      "A kerekek földet érésétől a jármű ajtajáig: terminálok, útlevélvizsgálat, a találkozási pont és mi történik késésnél.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Az antalyai repülőtér évente több mint harmincmillió utast kezel, és szinte mindegyikük egy szűk nyári ablakban érkezik. Ha előre ismeri a sorrendet, a zsúfolt terminál húszperces formalitássá válik." },
      { type: "h2", text: "Melyik terminálra érkezik" },
      { type: "p", text: "Az AYT-nek három terminálja van. A menetrend szerinti nemzetközi járatok többsége az 1-es vagy a 2-es terminált használja; a charter- és szezonális járatokat általában a 2-es kezeli. A belföldi terminál az isztambuli, ankarai és izmiri járatokat szolgálja ki. Ezt nem önnek kell kitalálnia: a járatszám elárulja nekünk, a sofőrt pedig a megfelelő érkezési csarnokba küldjük." },
      { type: "h2", text: "Útlevélvizsgálat és csomag" },
      { type: "p", text: "A legtöbb európai állampolgár rövid tartózkodásra vízum nélkül léphet be Törökországba, de indulás előtt ellenőrizze a saját útlevelére vonatkozó szabályokat. Főszezonban számoljon 20-45 perccel a landolástól a csomagokkal való kilépésig, július és augusztus kivételével kevesebbel. A csomagkiadás ingadozik a legjobban, ezért ér többet egy várakozási ablak, mint egy ígért felvételi időpont." },
      { type: "h2", text: "Hol találkozik a sofőrrel" },
      {
        type: "ul",
        items: [
          "Vegye fel a csomagját, és menjen ki az érkezési csarnokba.",
          "Induljon a meet & greet terület felé: J / 777.",
          "Repülőtéri csapatunk megtalálja a foglalását, és a sofőrhöz kíséri.",
          "A sofőr a közeli parkolóban álló járműhöz viszi a csomagokat.",
        ],
      },
      { type: "p", text: "Nem kell névtáblát keresnie ötven ember között. A csapat rögzített ponton áll, és nála van a foglalási száma, így az átadás ugyanúgy működik hajnali 6-kor és hajnali 2-kor." },
      { type: "h2", text: "Mi történik, ha késik a járat" },
      { type: "p", text: "Magát a járatot követjük, nem azt a menetrendet, amire foglalt. Ha két órát késve landol, a felvétel két órát csúszik, az ár pedig nem változik. A tényleges landolástól számított első 90 perc várakozás díjmentesen benne van - ez fedezi a hosszú útlevélsort vagy a késő csomagot." },
      { type: "h2", text: "Indulás előtt" },
      { type: "p", text: "Két apróság teszi gördülékennyé a napot: adja meg a járatszámot, ne csak az érkezési időt, és foglaláskor jelezze a gyerekülések számát. Mindkettő díjmentes - és mindkettőt sokkal nehezebb hajnali egykor megszervezni az érkezési csarnokban." },
    ],
    faq: [
      ["Pontosan hol találkozom a sofőrrel az antalyai repülőtéren?", "A meet & greet területen, a J / 777 pontnál az érkezési csarnokban, miután felvette a csomagját. Csapatunknál ott a foglalása, és a sofőrhöz kíséri."],
      ["Meddig vár a sofőr?", "A tényleges landolástól számított első 90 perc díjmentesen benne van, és késés esetén az ablak automatikusan eltolódik."],
      ["Mennyi idő kijutni a terminálból?", "Jellemzően 20-45 perc a landolástól, az útlevélvizsgálattól és a csomagkiadástól függően. Júliusban és augusztusban a leghosszabb."],
      ["Meg kell adnom a járatszámomat?", "Igen, kérjük. A járatszámmal követjük a valós landolási időt, és a megfelelő terminálra küldjük a sofőrt."],
    ],
  },
  "alanya-distance-guide": {
    slug: "antalya-repuloter-alanya-tavolsag",
    title: "Antalyai repülőtér - Alanya: távolság, menetidő és transzferlehetőségek",
    heading: "Az antalyai repülőtértől Alanyáig: valójában milyen messze van",
    description:
      "125 km a D400-as parti úton. Mennyi ideig tart valójában az út Alanyába, hol helyezkednek el az üdülőkörzetek, és hogyan tervezzen késői érkezést.",
    excerpt:
      "Alanya a legmesszebbi a gyakori antalyai transzferek közül. A valós távolság, a valós menetidő, és mi változik éjszakai érkezéskor.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Alanya 125 kilométerre keletre fekszik az antalyai repülőtértől, ezzel ez a Török Riviéra leghosszabb rendszeresen foglalt transzferje. Ez a távolság az az egyetlen tény, amely minden más döntést meghatároz az úton." },
      { type: "h2", text: "Távolság és menetidő" },
      {
        type: "table",
        head: ["Úticél", "Távolság az AYT-től", "Jellemző menetidő"],
        rows: [
          ["Antalya belváros", "15 km", "20-30 perc"],
          ["Side", "65 km", "55-65 perc"],
          ["Manavgat", "75 km", "60-70 perc"],
          ["Kızılağaç", "85 km", "70-80 perc"],
          ["Alanya", "125 km", "110-130 perc"],
        ],
      },
      { type: "p", text: "Az útvonal a D400-as parti utat követi keletre, Seriken, Manavgaton és Kızılağaçon át. Jó út, de a településeken keresztül vezet, nem körülöttük, így a nyári délutánok és a szombati charter-csúcsok olyan időt adnak hozzá, amit semmilyen menetrend nem tud eltüntetni." },
      { type: "h2", text: "Alanya nem egyetlen hely" },
      { type: "p", text: "Az „Alanya\" néven értékesített szállodák nagyjából 65 kilométernyi parton oszlanak el. Avsallar, Türkler és Okurcalar a központtól nyugatra fekszik, és érezhetően közelebb van a repülőtérhez; Mahmutlar, Kestel, Kargıcak és Demirtaş attól keletre, és 20-45 percet ad hozzá. Foglaláskor a szálloda nevét adja meg, ne csak az üdülőhelyet: ez határozza meg a menetidőt és a helyes fix árat is." },
      { type: "h2", text: "Miért fáj itt a legjobban a közös shuttle" },
      { type: "p", text: "Egy 125 kilométeres úton minden extra megálló valódi kitérő. Egy shuttle, amely nyolc társaságot tesz ki a part mentén, könnyen négy órává nyújtja a két órát, és rendszerint a legkeletebbre szálló család száll ki utoljára. A magánjármű egyszer, az ön sorrendjében teszi meg az utat, a fix ár pedig nem mozdul a forgalommal." },
      { type: "h2", text: "Késői érkezés tervezése" },
      { type: "p", text: "Sok alanyai járat 23:00 után landol. Ilyenkor két dolog számít: hogy biztosan várja valaki, és hogy az árat az indulás előtt megállapodták. Követjük a járatot, így a késő landolás eltolja a felvételt, nem törli, és az első 90 perc várakozás benne van. A fizetés készpénzben történik a sofőrnek az út elején, így az éjszaka közepén már semmit nem kell intézni." },
    ],
    faq: [
      ["Milyen messze van Alanya az antalyai repülőtértől?", "125 km a D400-as parti úton, ami rendesen 110-130 perc vezetést jelent."],
      ["Minden alanyai szállodára ugyanaz a transzferár?", "Nem. Alanya partja körülbelül 65 kilométer, ezért az avsallari vagy okurcalari szállodák ára eltér a mahmutlaritól vagy kargıcakitól. Adja meg a szálloda nevét, és a helyes fix árat látja."],
      ["Van megálló útközben?", "Magántranszfernél kérésre rövid megállót tartunk. Nincsenek menetrendi megállók és nincsenek más utasok."],
      ["Mi van, ha éjfél után landolok?", "A felvétel a tényleges landolási idejét követi. Az éjszakai érkezés ezen az útvonalon megszokott, és nincs felára."],
    ],
  },
  "family-child-seats": {
    slug: "antalya-repuloteri-transzfer-gyerekekkel",
    title: "Antalyai repülőtéri transzfer gyerekekkel: gyerekülés, babakocsi, csomag",
    heading: "Utazás a szállodáig gyerekekkel",
    description:
      "Gyerekülés, babakocsi és csomag az antalyai repülőtéri transzferen. Mit kérjen foglaláskor, és miért egyszerűbb a magánjármű kisgyerekekkel.",
    excerpt:
      "A gyerekülés kérésre díjmentes, de csak ha landolás előtt tudunk róla. Mit mondjon el nekünk, és mi fér be valójában a járműbe.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "A kisgyerekes transzfer logisztikai kérdés, nem árkérdés. Az üléseknek, egy babakocsinak, egy utazóágynak és négy bőröndnek egyszerre kell beférnie ugyanabba a járműbe - és az ezt lehetővé tevő döntések a foglaláskor születnek, nem a terminálon." },
      { type: "h2", text: "Gyerekülések" },
      { type: "p", text: "A gyereküléseket kérésre díjmentesen biztosítjuk. Foglaláskor adja meg a gyerekek számát és életkorát; ez határozza meg, hogy hordozóra, kisgyerekülésre vagy ülésmagasítóra van-e szükség. Az ülések a járművel együtt készülnek el, így nincs mit cipelni a repülőtéren és nincs mit intézni hajnali egykor az érkezési csarnokban." },
      { type: "h2", text: "Mi fér be a járműbe" },
      {
        type: "ul",
        items: [
          "Mercedes Vito: hat utasig, szokásos nyaralási csomaggal.",
          "Mercedes Sprinter: nagyobb társaságok, akár 12 hely, és a helyes választás, ha babakocsi és utazóágy is jön.",
          "A babakocsi és a gyerekülés nem számít bele az utaslétszámba, de csomagteret foglal - szóljon, és ennek megfelelően osztjuk be a járművet.",
        ],
      },
      { type: "p", text: "A fix ár a járműre vonatkozik, nem az ülésre, így egy plusz gyerek soha nem változtat a díjon. Az változik, melyik járművet küldjük." },
      { type: "h2", text: "Miért számít többet a magán gyerekekkel" },
      { type: "p", text: "Közös shuttle-nél a család előbb megvárja, míg megtelik a jármű, majd a part mentén halad, miközben másokat tesznek ki. Egy kisgyerekkel egy éjszakai járat után ez a különbség negyven perc és három óra között. A magánjármű akkor indul, amikor önök készen állnak, és egyenesen a szálloda recepciójához hajt." },
      { type: "h2", text: "Hasznos gyakorlati részletek" },
      { type: "p", text: "Ivóvíz van a járműben. Ha a hosszú Side-i vagy alanyai úton rövid megállóra van szükség, elég szólni a sofőrnek - nincs menetrend, amit tartani kell. És mivel a fizetés az út elején készpénzben történik, senkinek nem kell kártyát vagy térerőt keresnie alvó gyerekkel a karján." },
    ],
    faq: [
      ["Díjmentes a gyerekülés?", "Igen. A gyereküléseket kérésre felár nélkül biztosítjuk. Kérjük, foglaláskor adja meg a gyerekek számát és életkorát."],
      ["Vihetek babakocsit?", "Igen. Jelezze foglaláskor, hogy csomagteret tervezzünk rá - a babakocsi és egy teljes bőröndkészlet Sprintert jelenthet Vito helyett."],
      ["Beleszámítanak a gyerekek az utaslétszámba?", "A férőhelyek szempontjából igen. Az ár nem változik: járművenként fix, nem személyenként."],
      ["Megállhatunk egy hosszú transzferen?", "Igen. Magántranszfernél a sofőr kérésre rövid megállót tarthat; nem várnak más utasok."],
    ],
  },
  "belek-golf-transfer": {
    slug: "golftranszfer-belekbe",
    title: "Golftranszfer Belekbe: ütők, társaságok és időzítés az AYT-ről",
    heading: "Az antalyai repülőtérről Belekbe golfbagokkal",
    description:
      "Hogyan utazik a golfcsomag az antalyai repülőtérről Belekbe: járműválasztás, létszám, időzítés a kezdési időhöz és mit erősítsen meg foglaláskor.",
    excerpt:
      "Belek először golfcélpont, és csak utána tengerparti üdülőhely. Mit jelent ez a csomagtérre, a járműválasztásra és az AYT-ről vezető útra.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Belek 45 kilométerre keletre fekszik az antalyai repülőtértől, 35-40 perc autóútra, és Törökország legsűrűbb bajnokipálya-csoportját fogja össze. Az odaérkező társaságok többsége olyasmit hoz magával, amire egy szokványos transzfer nincs méretezve: golfbagokat." },
      { type: "h2", text: "Golfbagok és járműválasztás" },
      { type: "p", text: "Egy túrabag nagyjából 130 cm hosszú, és rosszul osztozik a helyen a bőröndökkel. Gyakorlati szabály: egy Mercedes Vito négy utast bír négy golfbaggal és a szokásos csomagjukkal; ezen felül a Mercedes Sprinter a helyes jármű. Foglaláskor adja meg a bagok számát, és a járművet a rakományhoz osztjuk be, nem a létszámhoz." },
      {
        type: "ul",
        items: [
          "Négy játékos, négy bag, normál bőröndök: Vito.",
          "Hat-nyolc játékos, vagy bagok és nagy bőröndök: Sprinter.",
          "Vegyes társaság nem játszó kísérőkkel: a bagokat számolja, ne az embereket.",
        ],
      },
      { type: "h2", text: "Időzítés a kezdési időhöz" },
      { type: "p", text: "Az út rövid, a repülőtér nem. Főszezonban számoljon 20-45 perccel a landolástól a terminál elhagyásáig, majd 35-40 perc autóúttal. Az érkezés napján délelőtti kezdés csak nagyjából 07:00 előtt landoló járatoknál reális; minden más esetben tervezze az első kört a következő reggelre." },
      { type: "h2", text: "Pályák és szállodák a környéken" },
      { type: "p", text: "A beleki üdülők - köztük a Regnum Carya, a Gloria, a Cornelia és a Maxx Royal - néhány kilométerre vannak egymástól és a pályáktól, így egy másik szállodában lakó játékostársért tett extra megálló percekbe kerül, nem órába. Magántranszferen ez megoldható; közös shuttle-nél nem ön dönt a sorrendről." },
      { type: "h2", text: "Mit erősítsen meg foglaláskor" },
      { type: "p", text: "Három dolgot: a golfbagok számát, a szálloda nevét és a visszaút felvételi idejét, ha már ismeri az indulást. Az ár járművenként fix, így a csomagok miatt nagyobb jármű olyan ajánlat, amelyet indulás előtt lát, sosem felár az útszélen." },
    ],
    faq: [
      ["Felárba kerül a golfcsomag?", "Nem. Az ár járművenként fix. A nagyobb csomag azt jelentheti, hogy Vito helyett Sprintert küldünk, és ezt az árat foglaláskor látja."],
      ["Hány golfbag fér egy Vitóba?", "Gyakorlati szabályként négy bag négy utassal és normál bőröndökkel. Több bagnál vagy játékosnál Sprintert használunk."],
      ["Mennyi az út az antalyai repülőtértől Belekbe?", "45 km, szokásos forgalomban rendesen 35-40 perc."],
      ["Megállhatunk egy második beleki szállodánál?", "Igen. Az üdülők közel vannak egymáshoz, így egy extra kitétel magántranszferen csak néhány percbe kerül. Kérjük, jelezze foglaláskor."],
    ],
  },
  "when-to-visit-antalya": {
    slug: "mikor-erdemes-antalyaba-menni",
    title: "Mikor érdemes Antalyába menni: évszakról évszakra és mit jelent a transzferre",
    heading: "Mikor látogasson Antalyába - és hogyan változtatja meg a szezon az érkezését",
    description:
      "Antalya évszakról évszakra: időjárás, tömeg, árak és repülőtéri forgalom. Mit jelent minden hónap a járatidőkre, a forgalomra és az érkezés tervezésére.",
    excerpt:
      "A Török Riviérán minden évszak más érkezést jelent. Mi változik április és október között, és miért számít ez az úton.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Antalya nagyjából hét hónapig forgalmas és ötig csendes, a különbség pedig jóval a strand előtt megmutatkozik - a repjegyárakban, a repülőtéri sorokban és a D400-as forgalmában." },
      { type: "h2", text: "Április-május: az ár-érték ablak" },
      { type: "p", text: "A tenger hőmérséklete májusban emelkedik, a nappali csúcsok húsz fok felettiek, a parti út pedig nyári mércével üres. A járatok civilizált időpontokban landolnak, és a terminál gyorsan kiürül. Ilyenkor az alanyai vagy kaşi út élvezet, nem állóképességi próba." },
      { type: "h2", text: "Június-augusztus: a csúcs" },
      { type: "p", text: "Július és augusztus forró, telt és drága. Az antalyai repülőtér a legnagyobb forgalmát bonyolítja, az útlevélvizsgálat és a csomagkiadás tart a legtovább, a parti út pedig egyszerre viszi a nyaralóforgalmat és a helyi hétvégi mozgást. Ilyenkor térül meg igazán a fix ár és a járatkövetéses felvétel: az úton semmi nem kiszámítható, ezért érdemes mindent rögzíteni, amit előre lehet." },
      { type: "h2", text: "Szeptember-október: a legjobb kompromisszum" },
      { type: "p", text: "A tenger ekkor a legmelegebb, a tömeg hétről hétre ritkul, az árak pedig szeptember közepétől esnek. Sok visszatérő vendég szerint szeptember vége az év legjobb hete ezen a parton. A transzferek ismét a névleges idejükhöz közel futnak." },
      { type: "h2", text: "November-március: a csendes szezon" },
      { type: "p", text: "A nappali hőmérséklet enyhe marad, sok tengerparti szálloda bezár, és a part helyét a város, a hegyek és az antik romok veszik át. A járatkínálat szűkül, az érkezési idők kényelmetlenebbé válnak - és pontosan ilyenkor veri az előre foglalt jármű a terminálon való rögtönzést." },
      { type: "h2", text: "Mit változtat a szezon a transzferén" },
      {
        type: "ul",
        items: [
          "Nyári csúcs: számoljon akár 45 perccel a landolástól a terminál elhagyásáig, és hosszabb menetidővel Manavgattól keletre.",
          "Átmeneti szezon: a közölt menetidők reálisak.",
          "Tél: kevesebb járat és több éjszakai landolás - erősítse meg a járatszámot, és hagyja, hogy a felvétel kövesse.",
          "Egész évben: a járművenkénti fix ár nem változik szezonnal, forgalommal vagy napszakkal.",
        ],
      },
    ],
    faq: [
      ["Melyik a legjobb hónap Antalyába?", "Szeptember vége adja általában a legjobb kombinációt: a tenger a legmelegebb, a tömeg megritkult, az árak pedig már esnek."],
      ["Forgalmasabb nyáron az antalyai repülőtér?", "Jelentősen. Júliusban és augusztusban számoljon akár 45 perccel a landolástól a terminál elhagyásáig; átmeneti szezonban gyakran ennek a felével."],
      ["Változnak a transzferárak szezononként?", "Nem. Áraink járművenként fixek, és nem változnak szezonnal, forgalommal vagy napszakkal."],
      ["Megéri télen Antalyába menni?", "Igen, a városért, a hegyekért és a régészeti helyszínekért, nem a strandért. Sok tengerparti szálloda november és március között zárva tart."],
    ],
  },
  "antalya-in-autumn": {
    "slug": "antalya-osszel-programok",
    "title": "Antalya ősszel: programok októberben és novemberben",
    "heading": "Antalya ősszel: mit csináljunk októberben és novemberben?",
    "description": "Antalya ősszel: meleg tenger, csendes strandok, ókori romok, kanyontúrák és golf. Időjárás októberben és novemberben, mi marad nyitva, és hogyan tervezd az érkezést.",
    "excerpt": "A tenger még meleg, a tömeg hazament, a hőség megtört. Miért október és november a Török Riviéra legjobban őrzött titka?",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Antalya ősszel azért olyan jó választás, mert a legtöbb látogató szeptember végén hazautazik. A tenger még hetekig őrzi a nyár melegét, a nappali hőmérséklet kellemes 20 fok körülire csökken, és azok a helyek, amelyek augusztusban elviselhetetlenek – a romok, a kanyonok, az óváros –, az utazás legszebb részévé válnak."
      },
      {
        "type": "h2",
        "text": "Őszi időjárás Antalyában"
      },
      {
        "type": "table",
        "head": [
          "Hónap",
          "Nappal / éjjel",
          "Tenger",
          "Milyen érzés?"
        ],
        "rows": [
          [
            "Október",
            "kb. 27 °C / 16 °C",
            "kb. 24 °C",
            "Nyár hőség nélkül – a strandnapok még teljesen megszokottak"
          ],
          [
            "November",
            "kb. 21 °C / 11 °C",
            "kb. 21 °C",
            "Napos reggelek, az első záporok, hűvös esték"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Csomagolj strandra és estére is: októberben elég egy könnyű kabát, novemberben érdemes egy melegebb réteget és egy esőkabátot is vinni."
      },
      {
        "type": "h2",
        "text": "Még mindig tengerparti nyaralás: október a parton"
      },
      {
        "type": "p",
        "text": "Októberben Konyaaltı, Lara, Belek, Side és Alanya strandjai még nyitva vannak, reggelente a víz gyakran melegebb a levegőnél, és a napozóágyakért sem kell már versenyezni. Belek, Side és Kemer nagy üdülőszállodáinak többsége október végéig nyitva tart; novembertől szűkül a választék, ezért a repülőjegy lefoglalása előtt ellenőrizd a szállodád szezonját."
      },
      {
        "type": "h2",
        "text": "Ókori romok hőség nélkül"
      },
      {
        "type": "p",
        "text": "Az ősz a környék romjainak évszaka. Perge és Aszpendosz csak egy rövid kitérőre van a Belek és Side felé vezető úttól, Side Apollón-temploma a kikötő szélén áll, a város mögötti hegyekben magasan fekvő Termesszosz pedig olyan túra, amelyet nyáron senkinek sem kellene megpróbálnia. Novemberben akár egész oszlopsoros utcák is csak a tieid lehetnek."
      },
      {
        "type": "h2",
        "text": "Természet: kanyonok, vízesések és a Likiai út"
      },
      {
        "type": "ul",
        "items": [
          "Düden-vízesések: az alsó vízesés Lara közelében egyenesen a tengerbe zuhan, a felső egy városi parkban található.",
          "Köprülü-kanyon: a raftingszezon általában októberig tart, a víz nyugodtabb, mint tavasszal.",
          "Likiai út: az ősz és a tavasz a két túraszezon – a Kemer, Olümposz és Kaş környéki szakaszok most a legszebbek.",
          "Tahtalı-kötélpálya Kemer mellett: a tiszta őszi levegőben nyílik a legszebb kilátás a csúcsról."
        ]
      },
      {
        "type": "h2",
        "text": "Golf, városi élet és fesztiválok"
      },
      {
        "type": "p",
        "text": "Ősszel van Beleken a golf főszezonja: a pályák zöldek, a hőmérséklet ideális, a kezdési időpontokat pedig észak-európai csoportok foglalják le. A városban a hajós és nyári tömegek távoztával Kaleiçi sikátorai, kávézói és kis múzeumai újra megélénkülnek, és az antalyai Arany Narancs Filmfesztivált is hagyományosan ősszel rendezik."
      },
      {
        "type": "h2",
        "text": "Érkezés ősszel"
      },
      {
        "type": "ul",
        "items": [
          "Októberben még sűrűn vannak járatok; novembertől ritkulnak, és több gép érkezik késő éjjel.",
          "A terminál csendesebb, mint nyáron, így a Belekre, Sidébe és Alanyába tartó menetidők közel vannak a megadottakhoz.",
          "Az előre foglalt transzfer követi a járatszámodat, így egy késő esti késés sem gond.",
          "Áraink járművenként fixek, és októberben ugyanannyiba kerülnek, mint augusztusban."
        ]
      }
    ],
    "faq": [
      [
        "Elég meleg van októberben a fürdéshez Antalyában?",
        "Igen. Októberben a tenger általában 24 °C körüli – melegebb, mint nyáron sok európai tenger –, és a strandnapok egész hónapban megszokottak."
      ],
      [
        "Nyitva vannak a szállodák Antalyában novemberben?",
        "A városi szállodák és sok üdülőszálloda nyitva marad, de a nagy tengerparti üdülők egy része novembertől bezár. A repülőjegy foglalása előtt nézd meg a szállodád szezonjának dátumait."
      ],
      [
        "Mit lehet csinálni Antalyában ősszel a strandon kívül?",
        "Ókori helyszínek, például Perge, Aszpendosz és Termesszosz, a Düden-vízesések, a Köprülü-kanyon, túrázás a Likiai úton, golf Beleken és Kaleiçi óvárosa."
      ],
      [
        "Változik a transzfer ára a nyári szezon után?",
        "Nem. Az ár járművenként fix, és nem függ az évszaktól, a forgalomtól vagy a napszaktól."
      ]
    ]
  },
  "antalya-in-winter": {
    "slug": "antalya-telen-programok",
    "title": "Antalya télen: programok decembertől februárig",
    "heading": "Antalya télen: mit csináljunk december és február között?",
    "description": "Antalya télen: óváros, vízesések, ókori romok, síelés Saklıkentben, téli golf és wellness-szállodák. Időjárás, mi van nyitva, és hogyan közlekedj.",
    "excerpt": "Enyhe napok, hó a hegyeken és egy város, amely újra a helyieké. Mit kínál Antalya december és február között – és mit nem.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Antalya télen a csendes, nem a zárt szezonját éli. A tengerparti üdülők pihennek, de a város, a hegyek és az ókori helyszínek nyitva vannak, a fény tiszta, a napok pedig gyakran naposak és enyhék. Ilyenkor úgy láthatod a vidéket, ahogy az itt élők – és olyan árakon, amilyeneket a nyári látogatók sosem kapnak."
      },
      {
        "type": "h2",
        "text": "Téli időjárás Antalyában"
      },
      {
        "type": "table",
        "head": [
          "Hónap",
          "Nappal / éjjel",
          "Tenger",
          "Jó tudni"
        ],
        "rows": [
          [
            "December",
            "kb. 16 °C / 7 °C",
            "kb. 19 °C",
            "A legcsapadékosabb hónap, de az eső napos napok között, rohamokban érkezik"
          ],
          [
            "Január",
            "kb. 15 °C / 6 °C",
            "kb. 17 °C",
            "A leghűvösebb hónap; hó a Taurus csúcsain"
          ],
          [
            "Február",
            "kb. 16 °C / 6 °C",
            "kb. 17 °C",
            "Hosszabbodó napok, az első mandulavirágzás"
          ]
        ]
      },
      {
        "type": "p",
        "text": "A napos téli délutánok olyanok, mint Észak-Európában a tavasz; az esték hűvösek, és a beltereket nem mindig fűtik északi mércével. Hozz rétegezhető ruhát, vízálló kabátot és kényelmes cipőt a nedves kőutcákhoz."
      },
      {
        "type": "h2",
        "text": "A város: Kaleiçi, múzeumok és vízesések"
      },
      {
        "type": "ul",
        "items": [
          "Kaleiçi, a falakkal körülvett óváros: a Hadrianus-kapu, a Bordázott minaret, a régi kikötő és oszmán házakkal szegélyezett sikátorok, ma kávézók és butikhotelek.",
          "Antalyai Múzeum: Törökország egyik legnagyobb régészeti gyűjteménye a pergéi szobrokkal – ideális program esős napra.",
          "Düden- és Kurşunlu-vízesések: a téli esőktől a legbővizűbbek és leglátványosabbak.",
          "Konyaaltı és Lara sétányai: hosszú séták, kerékpározás és tengeri kilátás nyári hőség nélkül."
        ]
      },
      {
        "type": "h2",
        "text": "Ókori helyszínek sorban állás nélkül"
      },
      {
        "type": "p",
        "text": "Perge, Aszpendosz és Side egész évben nyitva van, télen pedig csak maroknyi látogatóval kell osztozni rajtuk. A Kemer melletti Phaszélisznek három kikötője van egy fenyőerdőben; Olümposz és Çıralı szezonon kívül békés. Termesszosz a hegyekben fekszik, és hideg, nedves, sőt havas is lehet, ezért válassz száraz napot. Nyugatabbra a demrei Szent Miklós-templom kézenfekvő téli úti cél, különösen karácsony táján."
      },
      {
        "type": "h2",
        "text": "Síelés és tenger egy napon"
      },
      {
        "type": "p",
        "text": "A Bakırlı-hegységben fekvő Saklıkent síközpont körülbelül 50 km-re van a várostól, autóval nagyjából másfél óra. Ha van elég hó – általában januártól márciusig –, délelőtt síelhetsz, délután pedig a tengerparton sétálhatsz. A hegyi úton téli gumi vagy hólánc lehet szükséges, ezért indulás előtt nézd meg az útviszonyokat, és kérj tőlünk előre árajánlatot a kirándulásra."
      },
      {
        "type": "h2",
        "text": "Téli golf, wellness-szállodák és hosszú tartózkodás"
      },
      {
        "type": "p",
        "text": "Belek golfpályái egész télen nyitva vannak, a pályadíjak és a szállodai árak pedig jóval az őszi és tavaszi szint alatt maradnak. Több beleki, larai és kemeri üdülő télen is nyitva tartja wellnessrészlegét és fedett medencéit, Alanya és Side pedig észak-európai vendégeket vonz, akik hetekre vagy hónapokra jönnek az enyhe idő miatt."
      },
      {
        "type": "h2",
        "text": "Távolabbi kirándulások"
      },
      {
        "type": "p",
        "text": "A tél jó alkalom a hosszabb utakra, amelyek nyáron kimerítőek: Pamukkale mésztufateraszai és Hierapolisz romjai, vagy a havas Kappadókia, amelyet sok látogató az év legszebb időszakának tart ott. Mindkettő hosszú nap az úton, egy saját járművel pedig ott és akkor állsz meg, ahol és amikor szeretnél."
      },
      {
        "type": "h2",
        "text": "Érkezés télen"
      },
      {
        "type": "ul",
        "items": [
          "Kevesebb a közvetlen járat és több az éjszakai érkezés, gyakran isztambuli átszállással.",
          "Sok tengerparti üdülő zárva van, ezért ellenőrizd, hogy a szállodád nyitva lesz-e az utazásod idején.",
          "Éjjel a taxiállomások csendesebbek, mint nyáron; a járatszámodat követő, előre foglalt transzfer a nyugodtabb megoldás.",
          "A járművenkénti fix ár télen ugyanannyi, mint nyáron – nincs éjszakai vagy ünnepnapi felár."
        ]
      }
    ],
    "faq": [
      [
        "Megéri télen Antalyába utazni?",
        "Igen, ha a város, az ókori helyszínek, a természet és a golf miatt jössz, nem napozni. A napok gyakran naposak, 15 °C körüli hőmérséklettel, és nincs tömeg."
      ],
      [
        "Lehet télen fürdeni Antalyában?",
        "A tenger 17–19 °C körül marad, amit napos időben néhány látogató frissítőnek talál. Sok, télen is nyitva tartó szállodában fűtött fedett medence is van."
      ],
      [
        "Lehet síelni Antalya közelében?",
        "Igen. A Saklıkent síközpont körülbelül 50 km-re van a várostól. A szezon a havazástól függ, és általában januártól márciusig tart."
      ],
      [
        "Nyitva vannak a szállodák Antalyában télen?",
        "Antalya városi és kaleiçi szállodái egész évben nyitva vannak, ahogy több Lara, Belek, Kemer, Side és Alanya környéki üdülő is. Sok nagy szezonális üdülő novembertől márciusig zárva tart."
      ],
      [
        "Van transzfer az antalyai repülőtérről télen is?",
        "Igen, egész évben, éjszakai érkezéskor és ünnepnapokon is, ugyanazon a járművenkénti fix áron."
      ]
    ]
  },
  "christmas-new-year-antalya": {
    "slug": "karacsony-es-szilveszter-antalyaban",
    "title": "Karácsony és szilveszter Antalyában: gyakorlati útmutató",
    "heading": "Karácsony és szilveszter Antalyában",
    "description": "Karácsony vagy szilveszter Antalyában: időjárás, nyitva tartó szállodák, gálavacsorák, Szent Miklós Demrében és reptéri transzfer a legforgalmasabb éjszakákon.",
    "excerpt": "Napos napok, szilveszteri gála a tengerparton és Szent Miklós városa két és fél órányira. Így tervezd meg az ünnepeket Antalyában, és így juss oda a nagy éjszakán.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "A karácsony és a szilveszter Antalyában a kevés téli csúcsidőszak egyike. Az északi tél elől menekülő családok, szilvesztert ünneplő társaságok és az ünnepeket néhány nap enyhe napsütéssel összekötő látogatók mind ugyanabban a két hétben érkeznek – miközben a part nagy része egyébként csendes szezonját éli."
      },
      {
        "type": "h2",
        "text": "Mire számíts december végén?"
      },
      {
        "type": "p",
        "text": "Nappal általában 15–16 °C körül van, és gyakran süt a nap, bár a december egyben az év legcsapadékosabb hónapja. A karácsony Törökországban nem munkaszüneti nap, így december 25-én az üzletek, éttermek és látnivalók a szokásos módon működnek. A szilvesztert viszont széles körben ünneplik, január 1. pedig munkaszüneti nap."
      },
      {
        "type": "h2",
        "text": "Mely szállodák vannak nyitva?"
      },
      {
        "type": "p",
        "text": "Antalya városi és kaleiçi szállodái egész évben nyitva vannak, és több Lara, Belek, Kemer, Side és Alanya környéki üdülő kifejezetten az ünnepi időszakra nyit ki karácsonyi vacsorával és szilveszteri gálával. A programok, az öltözködési elvárások és a gála felára nagyon eltérő, ezért foglalás előtt kérdezd meg a szállodát, mi van benne az árban. A nyitva tartó üdülők szobái ezekre a napokra hamar elkelnek."
      },
      {
        "type": "h2",
        "text": "Karácsony: Szent Miklós városa"
      },
      {
        "type": "p",
        "text": "A történelmi Szent Miklós, a Mikulás-legenda mögött álló püspök Mirában élt – a mai Demrében, Antalyától nagyjából két és fél órára nyugatra. A Szent Miklós-templom és Mira sziklába vájt líkiai sírjai emlékezetes karácsonyi kirándulást kínálnak, amely összeköthető egy kaşi megállóval vagy a Kumluca körüli parti úttal."
      },
      {
        "type": "h2",
        "text": "Szilveszter Antalyában"
      },
      {
        "type": "ul",
        "items": [
          "Szállodai gálák: vacsora, élő zene és visszaszámlálás, általában fix menüvel és felárral.",
          "A város: Kaleiçi és a jachtkikötő környékének éttermei zsúfoltak; foglalj asztalt előre.",
          "Lara és Konyaaltı: a strandklubok és tengerre néző éttermek saját bulit rendeznek.",
          "Tűzijáték a tengerparton látható, bár a program évről évre változik."
        ]
      },
      {
        "type": "h2",
        "text": "Közlekedés a legforgalmasabb éjszakákon"
      },
      {
        "type": "p",
        "text": "Szilveszter éjjel és január 1. hajnalán nehéz taxit találni, az alkalmazások és a taxiállomások pont akkor telnek meg, amikor mindenki indulna. Ha nem a szállodádban ünnepelsz – hanem a városban, egy étteremben vagy barátok villájában –, a visszautat foglald le előre, fix indulási időponttal."
      },
      {
        "type": "h2",
        "text": "Ünnepi érkezések és indulások"
      },
      {
        "type": "ul",
        "items": [
          "A december 20. és január 2. körüli járatok a tél legzsúfoltabbjai; foglalj korán.",
          "Sok ünnepi járat este vagy éjjel landol – a járatszámodat követő transzferrel nem kell a terminálban várnod.",
          "A karácsonyi ajándékokkal és téli csomaggal utazó családok jelezzék a bőröndök számát, hogy a megfelelő járművet biztosítsuk.",
          "Járművenkénti fix árunkban nincs ünnepi vagy szilveszteri felár."
        ]
      }
    ],
    "faq": [
      [
        "Milyen az időjárás Antalyában karácsonykor?",
        "Enyhe: nappal jellemzően 15–16 °C, éjjel 6–8 °C körül, a záporok között napos időszakokkal. Nem strandidő, de sétához és városnézéshez gyakran kellemes."
      ],
      [
        "Ünneplik a karácsonyt Antalyában?",
        "A karácsony Törökországban nem munkaszüneti nap, de sok, nemzetközi vendégeket fogadó szálloda karácsonyi vacsorát szervez. A szilvesztert széles körben ünneplik, január 1. pedig munkaszüneti nap."
      ],
      [
        "Hol található a Szent Miklós-templom?",
        "Demrében, az ókori Mirában, Antalyától nyugatra, körülbelül két és fél óra autóútra. Egész évben látogatható."
      ],
      [
        "Foglalhatok transzfert szilveszter éjszakára?",
        "Igen. Javasoljuk, hogy a visszautat fix indulási időponttal foglald le, mert éjfél után nagyon nehéz taxit találni. A járművenkénti fix árban nincs ünnepi felár."
      ]
    ]
  },
  "wintering-in-antalya": {
    "slug": "teleles-antalyaban-es-alanyaban",
    "title": "Telelés Antalyában és Alanyában: útmutató hosszú tartózkodáshoz",
    "heading": "Telelés Antalyában: útmutató hosszú tartózkodáshoz",
    "description": "Telelés a Török Riviérán: miért vonzza Alanya, Side és Antalya a hosszú távra érkezőket, milyen az időjárás, a szállás, az egészségügy, és hogyan érkezz sok csomaggal.",
    "excerpt": "Hetek vagy hónapok enyhe időben az északi tél helyett. Amit a hosszú távra érkezőknek tudniuk kell, mielőtt Alanyában, Sidében vagy Antalyában töltik a telet.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "A telelés Antalyában és Alanyában évről évre népszerűbb: minden télen több ezer látogató érkezik Németországból, Skandináviából, Hollandiából, Oroszországból és Lengyelországból, hogy hetekre vagy hónapokra a Török Riviérára cserélje a szürke eget. Az enyhe hőmérséklet, a hosszú sétányok és az otthoninál alacsonyabb megélhetési költségek miatt Antalya, Alanya és Side a Földközi-tenger legnépszerűbb téli úti céljai közé tartozik."
      },
      {
        "type": "h2",
        "text": "Miért érdemes itt tölteni a telet?"
      },
      {
        "type": "ul",
        "items": [
          "Enyhe éghajlat: téli napokon 15–17 °C körül, gyakran napos idő, a parton ritka a fagy.",
          "Napfény: érezhetően több napsütéses óra, mint Észak- és Közép-Európában.",
          "Tér: sétányok, strandok és óvárosok nyári tömeg nélkül.",
          "Infrastruktúra: a nagyobb városokban az üzletek, piacok, éttermek és magánkórházak egész évben nyitva vannak."
        ]
      },
      {
        "type": "h2",
        "text": "Hol szállj meg?"
      },
      {
        "type": "table",
        "head": [
          "Hely",
          "Kinek ideális?",
          "Távolság a repülőtértől"
        ],
        "rows": [
          [
            "Antalya város",
            "Városi élet, kultúra, múzeumok, minden szolgáltatás kéznél",
            "kb. 15–30 perc"
          ],
          [
            "Side / Manavgat",
            "Csendes óváros, hosszú strandok, sík sétautak",
            "kb. 1 óra"
          ],
          [
            "Alanya",
            "A legnagyobb hosszú távú közösség, sétányok, pezsgő téli élet",
            "kb. 1 óra 45 perc"
          ],
          [
            "Kemer",
            "Hegyek és tenger, túrázás, kisebb üdülőhely",
            "kb. 1 óra"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Alanyában és a szomszédos településrészeken, például Mahmutlarban és Obában él a legnagyobb telelő közösség, klubokkal, programokkal és egész télen nyüzsgő éttermekkel. Side nyugodtabb; Antalya azoknak való, akik igazi városra vágynak."
      },
      {
        "type": "h2",
        "text": "Szállás: szállodák és apartmanok"
      },
      {
        "type": "p",
        "text": "Néhány alanyai, sidei és antalyai szálloda négyhetes vagy hosszabb tartózkodásra külön kedvezményes árat kínál, gyakran félpanzióval. A bérelt apartmanok több helyet és függetlenséget adnak; ellenőrizd, van-e fűtés vagy fűtési funkcióval rendelkező légkondicionáló, mert a török tengerparti házak nyárra épülnek, és a téli estéken hidegnek tűnhetnek."
      },
      {
        "type": "h2",
        "text": "Hétköznapok télen"
      },
      {
        "type": "ul",
        "items": [
          "Heti piacok minden kerületben friss gyümölccsel és zöldséggel – a tél a citrusfélék szezonja.",
          "Séta és kerékpározás Alanya, Side, Lara és Konyaaltı sétányain.",
          "Túrázás a Taurus-hegység előhegyeiben és száraz napokon a Likiai úton.",
          "Egynapos kirándulások ókori helyszínekre, a manavgati vízeséshez vagy Antalya óvárosába.",
          "Magánkórházak és klinikák Antalyában és Alanyában, nemzetközi betegosztállyal."
        ]
      },
      {
        "type": "h2",
        "text": "Papírmunka és gyakorlati tudnivalók"
      },
      {
        "type": "p",
        "text": "A beutazási szabályok és a tartózkodási engedély nélkül eltölthető idő hossza az állampolgárságodtól függ, és időről időre változik, ezért utazás előtt ellenőrizd az aktuális szabályokat a hivatalos török hatóságoknál. Erősen ajánlott egy hosszú külföldi tartózkodásra is kiterjedő utasbiztosítás."
      },
      {
        "type": "h2",
        "text": "Érkezés hónapokra elegendő csomaggal"
      },
      {
        "type": "p",
        "text": "A hosszú távra érkezők többel utaznak, mint egy nyaralós bőrönd. Mondd meg, hány bőröndöt és milyen extra tárgyakat hozol – kerékpárt, járókeretet vagy dobozokat –, és egy Mercedes Vitót vagy szükség esetén egy Sprintert biztosítunk. Az ár járművenként fix, így a többletpoggyászt a foglaláskor vesszük figyelembe, nem a járdaszélen számoljuk fel. A sofőr az ajtónál segít a be- és kipakolásban."
      }
    ],
    "faq": [
      [
        "Hol a legjobb telelni a Török Riviérán?",
        "Alanyában van a legnagyobb hosszú távú közösség és a legpezsgőbb téli élet; Side csendesebb; Antalya teljes körű városi szolgáltatásokat kínál. Mindhárom helyen enyhe a tél."
      ],
      [
        "Milyen meleg van Antalyában télen?",
        "Decembertől februárig a nappali hőmérséklet általában 15–17 °C körüli, éjjel 6–8 °C körül. A parton ritka a fagy."
      ],
      [
        "Vannak téli szállodai ajánlatok hosszú tartózkodásra?",
        "Igen. Több alanyai, sidei és antalyai szálloda kínál télen kedvezményes havi vagy hosszú tartózkodásra szóló árakat. A négyhetes vagy hosszabb tartózkodásról érdeklődj közvetlenül a szállodánál."
      ],
      [
        "Vihetek sok csomagot a reptéri transzferre?",
        "Igen. Foglaláskor add meg a bőröndök és az extra tárgyak számát, és elegendő hellyel rendelkező járművet biztosítunk. Az ár járművenként értendő, bőröndönként nincs díj."
      ]
    ]
  },
  "antalya-in-spring": {
    "slug": "antalya-tavasszal-programok",
    "title": "Antalya tavasszal: programok márciustól májusig",
    "heading": "Antalya tavasszal: mit csináljunk március és május között?",
    "description": "Antalya tavasszal: narancsvirágzás, túrázás a Likiai úton, rafting, húsvéti kiruccanások és az első strandnapok. Időjárás hónapról hónapra és tudnivalók érkezéskor.",
    "excerpt": "Narancsvirág az utcákon, hó a csúcsokon és hétről hétre melegedő tenger. Miért a tavasz az aktív nyaralás évszaka Antalya környékén?",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Antalya tavasszal korán virágba borul: a Török Riviérán márciusra már virágoznak a narancsfák, a Taurus-hegységben még hó van, a napok pedig elég melegek ahhoz, hogy a szabadban üljünk. Ez a legjobb évszak a gyalogláshoz, kerékpározáshoz és felfedezéshez, májusban pedig elkezdődnek az év első strandnapjai."
      },
      {
        "type": "h2",
        "text": "Tavaszi időjárás Antalyában"
      },
      {
        "type": "table",
        "head": [
          "Hónap",
          "Nappal / éjjel",
          "Tenger",
          "Mire ideális?"
        ],
        "rows": [
          [
            "Március",
            "kb. 19 °C / 8 °C",
            "kb. 17 °C",
            "Városnézés, túrázás, virágzás"
          ],
          [
            "Április",
            "kb. 22 °C / 11 °C",
            "kb. 18 °C",
            "Túrázás, rafting, húsvéti kiruccanás"
          ],
          [
            "Május",
            "kb. 26 °C / 15 °C",
            "kb. 21 °C",
            "Az első strandnapok, minden program"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Narancsvirág és a város tavasszal"
      },
      {
        "type": "p",
        "text": "Tavasszal Antalya narancsvirágillatú. A város ezt a Narancsvirág Karnevállal ünnepli, egy tavasszal Kaleiçi környékén és a belvárosban tartott utcai fesztivállal. Ez a legjobb időszak arra is, hogy a nyári hőség előtt gyalog fedezd fel az óvárost, az Antalyai Múzeumot, valamint Konyaaltı és Lara sziklafalait."
      },
      {
        "type": "h2",
        "text": "Aktív nyaralás: túrázás, rafting és kerékpározás"
      },
      {
        "type": "ul",
        "items": [
          "Likiai út: a tavasz a legnépszerűbb túraszezon, vadvirágokkal a Kemer, Olümposz és Kaş környéki szakaszok mentén.",
          "Köprülü-kanyon: a raftingszezon általában áprilisban kezdődik, a hóolvadás élénk vizével.",
          "Tahtalı-kötélpálya: fent hó, lent virágzó rétek, gyakran egyetlen látképben.",
          "Kerékpározás: csendes utak és enyhe hőmérséklet Belek, Side és a Taurus előhegyei környékén.",
          "Golf: a tavasz a második főszezon Belek pályáin."
        ]
      },
      {
        "type": "h2",
        "text": "Ókori helyszínek a zöld évszakban"
      },
      {
        "type": "p",
        "text": "Perge, Aszpendosz, Side, Phaszélisz és Termesszosz tavasszal a legszebb, amikor a romokat zöld fű és vadvirágok veszik körül. A hosszabb kirándulások is jól működnek: Pamukkaléban és Kappadókiában kellemes a hőmérséklet, és stabil időjárás esetén tavasszal gyakoriak a hőlégballonos repülések Kappadókia felett."
      },
      {
        "type": "h2",
        "text": "Húsvét és tavaszi szünet"
      },
      {
        "type": "p",
        "text": "A húsvét és a németországi, hollandiai, egyesült királyságbeli és skandináv tavaszi iskolai szünetek hozzák a családok első hullámát. Áprilistól egyre több szezonális szálloda nyit ki, nő a járatok száma, májusra pedig a legtöbb tengerparti üdülő teljes gőzzel működik. Húsvéti időpontokra a szállodát és a transzfert is foglald le korán."
      },
      {
        "type": "h2",
        "text": "Érkezés tavasszal"
      },
      {
        "type": "ul",
        "items": [
          "Márciusban néhány üdülő még zárva van; áprilistól gyorsan bővül a választék.",
          "A terminál és az utak csendesek, így a megadott menetidők reálisak.",
          "A túra- és golffelszerelést, a kerékpárokat és a gyerekülést foglaláskor jelezd.",
          "Az ár járművenként fix, és nem változik az évszakkal."
        ]
      }
    ],
    "faq": [
      [
        "Van már strandidő Antalyában tavasszal?",
        "Májustól igen: nappal 26 °C körül van, a tenger pedig 21 °C körüli. Márciusban és áprilisban elég meleg van ahhoz, hogy a napon üldögélj, de a tenger a legtöbb fürdőzőnek még hűvös."
      ],
      [
        "Mikor van az antalyai Narancsvirág Karnevál?",
        "Tavasszal rendezik, amikor a város narancsfái virágoznak. Az időpont évről évre változik, ezért ha az utazásodat hozzá igazítanád, előbb nézd meg a város hivatalos közleményeit."
      ],
      [
        "Jó időszak a tavasz a Likiai út bejárására?",
        "Igen. A tavasz és az ősz a két legjobb túraszezon; tavasszal az ösvények zöldek és tele vannak vadvirággal, a hőmérséklet pedig kellemes."
      ],
      [
        "Nyitva vannak a szállodák Antalyában márciusban?",
        "A városi szállodák és néhány üdülő nyitva van. Sok szezonális üdülő áprilisban nyit ki, és májusra a part nagy része teljes gőzzel működik."
      ]
    ]
  },
  "cappadocia-winter-trip": {
    "slug": "kappadokia-telen-antalyabol",
    "title": "Kappadókia télen Antalyából: hó, hőlégballonok és az odavezető út",
    "heading": "Kappadókia télen: kirándulás Antalyából",
    "description": "Kappadókia télen, Antalyából: hó, időjárás, hőlégballonok, barlangszállodák, látnivalók, és milyen télen a Konyán át vezető 540 km-es út.",
    "excerpt": "Hóval borított tündérkémények és ballonok a fehér völgy felett. Hogyan kösd össze az antalyai téli pihenést Kappadókiával, és milyen télen az út.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Kappadókia télen Türkiye egyik legtöbbet fotózott tája: hó alatt álló tündérkémények és völgyek, kandallós barlangszállodák, derült reggeleken pedig a fehér táj fölé emelkedő hőlégballonok. Antalyából hosszú, de gyönyörű az út - és a tengerparti téli nyaralás természetes kiegészítése."
      },
      {
        "type": "h2",
        "text": "Téli időjárás: egészen más éghajlat, mint a parton"
      },
      {
        "type": "p",
        "text": "Kappadókia egy magas fennsíkon fekszik, nagyjából 1000 méteren vagy még magasabban, így ott a tél igazi tél. Nappal a hőmérséklet gyakran fagypont körüli, éjszaka jóval fagypont alatti, és decembertől februárig gyakori a hó. Vigyél rendes télikabátot, kesztyűt, sapkát és vízálló cipőt - ami januárban Antalyában elég, az itt nem lesz elég."
      },
      {
        "type": "table",
        "head": [
          "",
          "Antalyai part",
          "Kappadókia"
        ],
        "rows": [
          [
            "Átlagos téli nap",
            "kb. 15 °C",
            "nagyjából 0-5 °C"
          ],
          [
            "Téli éjszakák",
            "kb. 6-8 °C",
            "gyakran fagypont alatt"
          ],
          [
            "Hó",
            "csak a hegycsúcsokon",
            "decembertől februárig gyakori"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Hőlégballonozás télen"
      },
      {
        "type": "p",
        "text": "A ballonok egész évben repülnek, amikor az időjárás engedi, és a hóval borított völgyek feletti napfelkeltés repülés az a kép, amiért sokan jönnek. A tél azonban több lemondást is hoz szél, köd vagy hó miatt, és a döntést a hatóságok minden reggel korán hozzák meg. Tervezz legalább két éjszakát Kappadókiában, hogy egy elmaradt repülés ne jelentse azt, hogy teljesen lemaradsz róla."
      },
      {
        "type": "h2",
        "text": "Mit érdemes megnézni télen"
      },
      {
        "type": "ul",
        "items": [
          "Göremei Szabadtéri Múzeum: sziklába vájt, freskós templomok, télen csendesebb, mint az év bármely más szakában.",
          "Földalatti városok, például Derinkuyu és Kaymaklı: több szint mélyen, kellemes, állandó hőmérséklettel, bármilyen is az idő odakint.",
          "Uçhisar vára és a Göreme feletti kilátópontok: a legjobb helyek a havas panorámához.",
          "Rövid séták a Rózsa-, a Vörös- és a Szerelmesek völgyében száraz, derült napokon - hóesés után az ösvények jegesek lehetnek.",
          "Barlangszállodák: sok fűtött és kandallós, és télen érződnek a legkülönlegesebbnek."
        ]
      },
      {
        "type": "h2",
        "text": "Az út Antalyából"
      },
      {
        "type": "p",
        "text": "A táv kb. 540 km, az út általában 7-8 óra: átkel a Taurus-hegységen, majd Konyán át halad tovább a fennsíkon. Konya a Mevlana Múzeummal természetes megálló az út megszakítására. Télen a hegyi szakaszon hó és jég lehet; az utakat takarítják, de egy téli felszereltségű jármű és egy útvonalat ismerő sofőr jelenti a különbséget egy hosszú és egy stresszes nap között."
      },
      {
        "type": "h2",
        "text": "Hogyan tervezd meg az utat"
      },
      {
        "type": "ul",
        "items": [
          "Számolj legalább két, inkább három éjszakával, hogy legyen tartalék a ballonos lemondásokra és a rövid téli nappalokra.",
          "Reggel indulj Antalyából, hogy világosban kelj át a hegyeken.",
          "Kösd össze a kirándulást egy tengerparti pihenéssel: néhány nap Antalyában vagy Side-ban, aztán Kappadókia, vagy fordítva.",
          "Karácsonyra és szilveszterre időben foglald le a barlangszállodát és az esetleges ballonos repülést."
        ]
      },
      {
        "type": "h2",
        "text": "Transzfer Antalya és Kappadókia között"
      },
      {
        "type": "p",
        "text": "Privát transzfert kínálunk az antalyai repülőtérről és a tengerparti szállodákból Kappadókiába, csak oda vagy egy későbbi időpontra szóló visszaúttal. Az ár járművenként fix, megállhatsz fotózni, enni és megnézni Konyát, és nem kell más utasokra várnod. Foglaláskor add meg a szállodád és az időpontokat."
      }
    ],
    "faq": [
      [
        "Milyen messze van Kappadókia Antalyától?",
        "Közúton kb. 540 km. Az út Konyán át általában 7-8 óra, megállókkal vagy havas időben valamivel több."
      ],
      [
        "Érdemes télen Kappadókiába utazni?",
        "Igen. A hó a tündérkéményeken, a csendes látnivalók és a hangulatos barlangszállodák miatt a tél az egyik legszebb időszak ott. Vigyél meleg ruhát: sokkal hidegebb van, mint a parton."
      ],
      [
        "Repülnek télen a hőlégballonok Kappadókiában?",
        "Igen, amikor az időjárás engedi. Télen gyakoribbak a lemondások, ezért tervezz legalább két éjszakát, hogy legyen második esélyed."
      ],
      [
        "Eljuthatok Antalyából Kappadókiába privát transzferrel?",
        "Igen. Privát transzfert kínálunk az antalyai repülőtérről és a tengerparti szállodákból Kappadókiába, csak oda vagy oda-vissza, járművenként fix áron."
      ]
    ]
  },
  "belek-winter-golf": {
    "slug": "teli-golf-belekben",
    "title": "Téli golf Belekben: golfozás a Török Riviérán novembertől márciusig",
    "heading": "Téli golf Belekben",
    "description": "Miért jó téli golf célpont Belek: időjárás novembertől márciusig, a pályák állapota, olcsóbb green fee, mit csomagolj, és hogyan jutsz el Belekbe golfzsákokkal.",
    "excerpt": "Enyhe napok, zöld fairwayek és kevésbé zsúfolt tee time-ok. Amit a golfozóknak tudniuk kell Belekről novembertől márciusig, amikor otthon zárva vannak a pályák.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Amikor Észak-Európában a pályák fagyottak, beáztak vagy zárva vannak, Belekben tovább megy a játék. A téli golf Belekben azért működik, mert az antalyai repülőtértől 45 km-re keletre fekvő bajnoki pályák egész télen nyitva tartanak, és a novembertől márciusig tartó hónapok önálló szezonná váltak azoknak a golfozóknak, akik nem akarnak októbertől áprilisig szünetet tartani."
      },
      {
        "type": "h2",
        "text": "Milyen az idő a pályán"
      },
      {
        "type": "table",
        "head": [
          "Hónap",
          "Átlagos nap",
          "A pályán"
        ],
        "rows": [
          [
            "November",
            "kb. 21 °C",
            "Kiváló körülmények, még az őszi főszezon"
          ],
          [
            "December - január",
            "kb. 15-16 °C",
            "Enyhe és gyakran napos, néhány esős nappal"
          ],
          [
            "Február",
            "kb. 16 °C",
            "Hosszabbodó nappalok, kevesebb esős nap"
          ],
          [
            "Március",
            "kb. 19 °C",
            "A tavaszi főszezon kezdete"
          ]
        ]
      },
      {
        "type": "p",
        "text": "A legtöbb téli napon egy vékony pulóverben is lehet játszani. Az eső általában rövid hullámokban jön, nem hetekig, és a pályákat gyors vízelvezetésre építették. A reggelek hűvösek lehetnek, késő délutánra pedig fogy a fény, ezért a tee time-ok általában korábban vannak, mint nyáron."
      },
      {
        "type": "h2",
        "text": "Miért éri meg télen"
      },
      {
        "type": "ul",
        "items": [
          "A green fee-k és a szállodai árak decemberben, januárban és februárban általában alacsonyabbak, mint ősszel és tavasszal.",
          "Kevésbé zsúfoltak a tee sheetek, így gyorsabbak a körök, és könnyebb megkapni a kívánt időpontokat.",
          "Több golfszálloda egész télen nyitva tart, sokban fedett medence és wellness is van a délutánokra.",
          "Európa nagy részéről rövid a repülőút, így egy hosszú hétvége ugyanolyan reális, mint egy egyhetes út."
        ]
      },
      {
        "type": "h2",
        "text": "Pályák és szállodák télen"
      },
      {
        "type": "p",
        "text": "Belekben nem minden pálya és szálloda működik télen ugyanazzal a menetrenddel, és az olyan karbantartási munkákat, mint a lyukasztásos levegőztetés vagy a felülvetés, néha a csendes hónapokra ütemezik. Foglaláskor kérdezd meg, mely pályák lesznek nyitva az időpontjaidban, és van-e tervezett karbantartás. A golfszállodák általában megszervezik a tee time-okat és a transzfert a partnerpályákra."
      },
      {
        "type": "h2",
        "text": "Mit csomagolj a téli golfhoz"
      },
      {
        "type": "ul",
        "items": [
          "Rétegek: aláöltözet, pulóver és szélálló felső a hűvös reggelekre.",
          "Vízálló dzseki és nadrág az alkalmi záporokra.",
          "Téli kesztyű vagy ujjatlan kesztyű az ütések között, plusz a szokásos golfkesztyű.",
          "Napvédelem: derült napokon a téli nap is erős."
        ]
      },
      {
        "type": "h2",
        "text": "Eljutás Belekbe golfzsákokkal"
      },
      {
        "type": "p",
        "text": "Az antalyai repülőtérről Belekbe közúton 35-40 perc az út, télen pedig csendes a terminál, így az érkezés napján délután gyakran belefér egy kör. Az ár járművenként fix, nem zsákonként: egy Mercedes Vito általában négy játékost visz négy golfzsákkal és a csomagjaikkal, a nagyobb csoportok Sprinterrel utaznak. Foglaláskor add meg a zsákok számát."
      }
    ],
    "faq": [
      [
        "Lehet télen golfozni Belekben?",
        "Igen. A beleki pályák egész télen nyitva vannak, decemberben és januárban a nappali hőmérséklet általában 15-16 °C körüli, és a legtöbb nap játszható."
      ],
      [
        "Olcsóbb télen a golf Belekben?",
        "A green fee-k és a szállodai árak decemberben, januárban és februárban általában alacsonyabbak, mint az őszi és tavaszi főszezonban. A pontos árak a pályától és a szállodától függnek."
      ],
      [
        "Melyik a legjobb hónap a golfhoz Belekben?",
        "Október-november és március-április a golf főszezonja. A tél csendesebb és olcsóbb, kicsit hűvösebb napokkal."
      ],
      [
        "Kell külön fizetni a golfzsákokért a transzfernél?",
        "Nem. Az ár járművenként fix. Több zsákhoz nagyobb járművet biztosítunk, és ezt az árat foglaláskor látod."
      ]
    ]
  },
  "saklikent-ski-antalya": {
    "slug": "sieles-antalya-kozeleben-saklikent",
    "title": "Síelés Antalya közelében: útmutató a Saklıkent síközponthoz",
    "heading": "Síelés Antalya közelében: a Saklıkent síközpont",
    "description": "Síelés Antalya közelében, Saklıkentben: hol van, mennyi az út, mikor tart a szezon, mire számíts a pályákon, és hogyan fér bele egy napba a síelés és a tenger.",
    "excerpt": "Délelőtt síelés, délután séta a tengerparton. Gyakorlati útmutató Saklıkenthez, Antalya saját síközpontjához, és ahhoz, hogyan jutsz fel oda a partról.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Kevés nyaralóhely kínálja, hogy ugyanazon a napon síelj és a tengerparton sétálj. Antalya igen: síelés Antalya közelében a Saklıkent síközpontban lehetséges, amely a Bakırlı-hegységben, a várostól kb. 50 km-re fekszik, és egy jó téli napon délelőtt a sípályán, naplementére pedig már újra a tengerparti sétányon lehetsz."
      },
      {
        "type": "h2",
        "text": "Hol van Saklıkent"
      },
      {
        "type": "p",
        "text": "A síközpont nagyjából 1900 méteres magasságban fekszik a Bakırlı-hegység lejtőin, Antalyától nyugatra. A városból körülbelül másfél óra az út, amely a narancsligetekből fenyőerdőn át egészen a hóig kapaszkodik. Derült napokon a csúcsról a kilátás egészen a partig és a tengerig ér."
      },
      {
        "type": "h2",
        "text": "Mikor tart a szezon"
      },
      {
        "type": "p",
        "text": "A síszezon teljes mértékben a havazástól függ, és általában januártól márciusig tart. Egyes teleken korábban kezdődik vagy hamarabb véget ér, ezért mielőtt egy napot erre tervezel, nézd meg az aktuális hó- és felvonóhelyzetet."
      },
      {
        "type": "h2",
        "text": "Mire számíts a pályákon"
      },
      {
        "type": "ul",
        "items": [
          "Kicsi, nyugodt síközpont - ideális kezdőknek, családoknak és egy tengerparti nyaralás közbeni síelős napra, nem pedig egy teljes sihétre.",
          "Sí- és snowboardfelszerelés általában bérelhető a központban; indulás előtt ellenőrizd a nyitvatartást.",
          "A szánkózás és a hóban játszás népszerű a családok körében, főleg hétvégén.",
          "Hétvégén sok a helyi látogató; hétköznap sokkal csendesebb."
        ]
      },
      {
        "type": "h2",
        "text": "Síelés és tenger egy napon"
      },
      {
        "type": "ul",
        "items": [
          "Kora reggel indulj el a partról, hogy a felvonók nyitására odaérj.",
          "Síelj vagy játssz a hóban kora délutánig.",
          "Aztán vissza le egy késői ebédre Kaleiçiben vagy egy sétára a Konyaaltı strandon.",
          "Vigyél váltóruhát: a sípálya és a part között 15 fok vagy még nagyobb is lehet a hőmérséklet-különbség."
        ]
      },
      {
        "type": "h2",
        "text": "Odajutás: a hegyi út télen"
      },
      {
        "type": "p",
        "text": "A síközpontba nincs rendszeres tömegközlekedés, és a hegyi út utolsó szakaszán hó és jég lehet. Téli gumi vagy hólánc kötelező lehet. Egy privát transzfer elvisz az antalyai, kemeri, beleki vagy side-i szállodádból a pályákig és vissza, a hegyen töltött időről pedig te döntesz. Ez nem tartozik a szokásos útvonalaink közé, ezért küldd el a szállodád, a dátumot és a létszámot, és járművenként fix árat adunk."
      },
      {
        "type": "h2",
        "text": "További síelési lehetőségek Antalyából"
      },
      {
        "type": "p",
        "text": "Hosszabb síútra az Isparta melletti Davraz nagyobb síközpont több pályával, Antalyától közúton nagyjából két és fél - három órára. Saklıkent marad a legegyszerűbb választás egyetlen havas napra egy tengerparti nyaralás alatt."
      }
    ],
    "faq": [
      [
        "Lehet síelni Antalya közelében?",
        "Igen. A Saklıkent síközpont Antalya városától kb. 50 km-re, közúton körülbelül másfél órára fekszik a Bakırlı-hegységben."
      ],
      [
        "Mikor van a síszezon Saklıkentben?",
        "A havazástól függ. A szezon általában januártól márciusig tart; indulás előtt nézd meg az aktuális viszonyokat."
      ],
      [
        "Lehet Antalyában egy napon síelni és úszni?",
        "Délelőtt síelhetsz, délután pedig a tengernél lehetsz. Télen úszni a bátraknak való: a tenger kb. 17 °C-os."
      ],
      [
        "Hogyan jutok el a szállodámból Saklıkentbe?",
        "Nincs rendszeres tömegközlekedés. Adhatunk ajánlatot privát transzferre a szállodádtól a síközpontig és vissza, járművenként fix áron."
      ]
    ]
  },
  "pamukkale-trip-from-antalya": {
    "slug": "pamukkale-kirandulas-antalyabol",
    "title": "Pamukkale Antalyából: egynapos kirándulás vagy éjszakázással, és mikor menjünk",
    "heading": "Pamukkale kirándulás Antalyából: így tervezd meg",
    "description": "Pamukkale kirándulás Antalyából: távolság és menetidő, egy nap vagy éjszakázással, a mésztufateraszok, Hierapolisz és az Antik medence, valamint a legjobb évszak.",
    "excerpt": "Fehér mésztufateraszok, római város a dombon és medence ókori oszlopok között. Így látogathatod meg Pamukkalét Antalyából anélkül, hogy az egész napot buszon töltenéd.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Egy Pamukkale kirándulás Antalyából Törökország egyik leghíresebb látnivalójához visz: meleg, ásványokban gazdag vízzel teli fehér mésztufateraszokhoz, fölöttük pedig Hierapolisz római város romjaihoz. Antalyából közúton körülbelül 245 km, irányonként nagyjából három-három és fél óra - elég közel egy egynapos kiránduláshoz, de elég messze ahhoz, hogy egy éjszaka ott alvás sokkal nyugodtabbá tegye a látogatást."
      },
      {
        "type": "h2",
        "text": "Mit érdemes megnézni Pamukkaléban?"
      },
      {
        "type": "ul",
        "items": [
          "A mésztufateraszok: sétálj mezítláb a teraszokon a sekély, meleg vízben - a fehér felületen cipőben járni tilos.",
          "Hierapolisz: kiterjedt római város színházzal, monumentális utcával és Anatólia egyik legnagyobb ókori temetőjével.",
          "Az Antik medence: ússz meleg termálvízben ledőlt ókori oszlopok között (külön jegy).",
          "A Hierapoliszi Régészeti Múzeum: a lelőhely leletei az egykori római fürdő épületében.",
          "Laodikeia: rövid autóútra egy másik nagy ókori város, sokkal kevesebb látogatóval."
        ]
      },
      {
        "type": "h2",
        "text": "Egynapos kirándulás vagy éjszakázással?"
      },
      {
        "type": "table",
        "head": [
          "",
          "Egynapos kirándulás",
          "Egy éjszaka ott alvással"
        ],
        "rows": [
          [
            "Úton töltött idő",
            "6-7 óra egyetlen nap alatt",
            "Két napra elosztva"
          ],
          [
            "Idő a helyszínen",
            "3-4 óra, általában délben",
            "Késő délután és kora reggel"
          ],
          [
            "Tömeg",
            "A turistabuszokkal együtt érkezel",
            "Naplemente és reggel sokkal kevesebb emberrel"
          ],
          [
            "Kinek ajánlott",
            "Kevés idővel rendelkező utazóknak",
            "Családoknak, fotósoknak, bárkinek, aki fürdeni szeretne"
          ]
        ]
      },
      {
        "type": "p",
        "text": "A csoportos túrák többsége a nap közepén érkezik, amikor a teraszok a legzsúfoltabbak, nyáron pedig a fehér felület vakító és forró. Ha Pamukkaléban vagy a termálfaluként ismert Karahayıtban töltesz egy éjszakát, a mésztufateraszokat naplementekor és a reggeli csendben is láthatod."
      },
      {
        "type": "h2",
        "text": "A legjobb évszak Pamukkaléhoz"
      },
      {
        "type": "p",
        "text": "A tavasz és az ősz a legkellemesebb: enyhe hőmérséklet a hierapoliszi sétához és kellemes víz a teraszokon. Télen hűvös van, olykor fagy is, de a meleg víz gőzölög a hideg levegőben, és a helyszín ilyenkor a legcsendesebb. Júliusban és augusztusban a déli hőség és a fehér teraszok vakító fénye nagyon erős lehet - menj korán reggel vagy késő délután."
      },
      {
        "type": "h2",
        "text": "Útközben: a Salda-tó és a Taurus-hegység"
      },
      {
        "type": "p",
        "text": "Az út a tengerpartról a Taurus-hegységen át kapaszkodik fel, majd a tóvidéken halad keresztül. A fehér partú, türkizkék vizű Salda-tó csak rövid kitérő, és népszerű fotós megálló. Saját autóval te döntöd el, hol és mennyi ideig állsz meg - ezt egy buszos túra nem tudja megadni."
      },
      {
        "type": "h2",
        "text": "Privát transzfer Pamukkaléba"
      },
      {
        "type": "p",
        "text": "Privát transzfert biztosítunk az antalyai repülőtérről és a tengerparti szállodákból Pamukkaléba, egy irányba vagy későbbi időpontban történő visszaúttal. Az ár járművenként fix, így egy család vagy kisebb csoport számára gyakran több buszos túrajegy árával vethető össze - szállodáról szállodára gyűjtés, kötött menetrend és vásárlási megállók nélkül."
      }
    ],
    "faq": [
      [
        "Milyen messze van Pamukkale Antalyától?",
        "Közúton körülbelül 245 km. Az út általában irányonként három-három és fél órát vesz igénybe."
      ],
      [
        "Meg lehet nézni Pamukkalét egynapos kirándulással Antalyából?",
        "Igen, de ez egyetlen nap alatt 6-7 óra utazást jelent. Egy éjszaka Pamukkaléban vagy Karahayıtban nyugodtabbá teszi a látogatást, és tömeg nélkül láthatod a teraszokat."
      ],
      [
        "Lehet fürdeni Pamukkaléban?",
        "A mésztufateraszok sekély medencéiben mezítláb sétálhatsz. Úszni az Antik medencében lehet, amelynek meleg termálvize van, és külön jegy kell hozzá."
      ],
      [
        "Melyik évszakban a legjobb Pamukkaléba menni?",
        "A tavasz és az ősz a legkellemesebb. A tél csendes és hangulatos; nyáron kora reggel vagy késő délután érdemes menni."
      ]
    ]
  },
  "demre-myra-st-nicholas": {
    "slug": "demre-mira-szent-miklos-templom",
    "title": "Demre és Mira: a Szent Miklós-templom meglátogatása Antalyából",
    "heading": "Demre, Mira és a Szent Miklós-templom",
    "description": "Kirándulás Antalyából Demrébe, az ókori Mirába: a Szent Miklós-templom, a líkiai sziklasírok, Andriaké és Kekova, menetidőkkel és tippekkel téli vagy karácsonyi látogatáshoz.",
    "excerpt": "Az igazi Mikulás városa két és fél órára van Antalyától. Mit érdemes megnézni Demrében és Mirában, és hogyan lesz belőle egy egész napos út a part mentén.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Jóval azelőtt, hogy Mikulás lett volna belőle, Szent Miklós Mira püspöke volt - egy líkiai városé Antalyától nyugatra, a tengerparton. A várost ma Demrének hívják, és a demrei Szent Miklós-templom, ahol szolgált, a sziklába vájt líkiai sírok és az ókori kikötő Antalya egyik legérdekesebb egynapos kirándulásává teszik - különösen decemberben."
      },
      {
        "type": "h2",
        "text": "Ki volt Myrai Szent Miklós?"
      },
      {
        "type": "p",
        "text": "Miklós a 4. században élt, és titokban gyakorolt jótetteiről vált híressé, különösen a gyermekek és a szegények iránt. Ünnepét, december 6-át ma is egész Európában megülik, a körülötte szövődött legendákból pedig az évszázadok során a Mikulás alakja született. Mira, ahol püspök volt, fontos zarándokhellyé vált."
      },
      {
        "type": "h2",
        "text": "Mit érdemes megnézni Demrében?"
      },
      {
        "type": "ul",
        "items": [
          "Szent Miklós-templom: bizánci templom freskókkal, mozaikpadlóval és a hagyomány szerint a szenthez kötött szarkofággal.",
          "Mira sziklasírjai: házat formázó líkiai sírok a sziklafalba vájva, egy nagy római színház fölött.",
          "Andriaké: Mira ókori kikötője, felújított gabonaraktárral, amelyben a Líkiai Civilizációk Múzeuma működik.",
          "Kekova: a közeli Üçağızból induló hajótúrák elhaladnak a részben víz alá süllyedt ókori város és a várral koronázott Kaleköy falu mellett (télen kevesebb hajó jár)."
        ]
      },
      {
        "type": "h2",
        "text": "Odajutás: a parti út nyugat felé"
      },
      {
        "type": "p",
        "text": "Demre körülbelül két és fél órára van Antalyától, az ország egyik legszebb parti útján, amely Kemeren, az Olympos körüli hegyeken, Kumlucán és Finikén halad át. Az út egész évben jó, de kanyarog a hegyek között, ezért hagyj időt a megállókra, és ne kapkodva tervezd."
      },
      {
        "type": "h2",
        "text": "Egy nap a part mentén"
      },
      {
        "type": "ul",
        "items": [
          "Reggel: indulj korán Antalyából, és állj meg egy kilátásért a partra Olympos közelében.",
          "Délelőtt: a Szent Miklós-templom, még a turistacsoportok érkezése előtt.",
          "Délben: Mira sziklasírjai és színháza, utána ebéd Demrében vagy Andriakéban.",
          "Délután: szezonban hajókirándulás Kekovához, vagy továbbutazás Kaşba és ottalvás.",
          "Este: visszaút Antalyába, vagy a kirándulás összekötése néhány kaşi nappal."
        ]
      },
      {
        "type": "h2",
        "text": "Látogatás télen és karácsonykor"
      },
      {
        "type": "p",
        "text": "December különösen hangulatos időszak a látogatásra: december 6. Szent Miklós napja, karácsony táján pedig sok látogató köti össze antalyai tartózkodását egy kirándulással a szent városába. A téli napok enyhék, de rövidek, ezért indulj korán. A látnivalók egész évben nyitva vannak, a kekovai hajótúrák viszont az időjárástól és a szezontól függnek."
      },
      {
        "type": "h2",
        "text": "Privát transzfer Demrébe"
      },
      {
        "type": "p",
        "text": "Privát transzfert biztosítunk Antalyából és a nyugati part üdülőhelyeiről Kumlucába, Demrébe és Kaşba. Saját járművel te választod meg a megállókat és a tempót, az ár pedig járművenként fix, nem személyenként. Foglaláskor add meg a szállodádat, a dátumot, és hogy kérsz-e aznapi visszautat."
      }
    ],
    "faq": [
      [
        "Milyen messze van Demre Antalyától?",
        "Demre, az ókori Mira, közúton körülbelül két és fél órára van Antalyától a Kemeren, Kumlucán és Finikén át vezető parti úton."
      ],
      [
        "Egész évben nyitva van a Szent Miklós-templom?",
        "Igen. A Szent Miklós-templom és Mira ókori romjai egész évben látogathatók."
      ],
      [
        "Mikor van Szent Miklós napja?",
        "Szent Miklós ünnepe december 6-án van. December, a karácsonyi időszakot is beleértve, népszerű időpont Demre meglátogatására."
      ],
      [
        "Meg lehet nézni Demrét és Kekovát egy nap alatt?",
        "Igen, hajószezonban korai indulással ez megoldható. Télen kevesebb hajó jár, ezért a helyszínen érdeklődj az időjárásról és a menetrendről."
      ]
    ]
  },
  "lycian-way-spring-hiking": {
    "slug": "likiai-ut-turazas-antalya-kozeleben",
    "title": "Túrázás a Likiai úton Antalya közelében: tavaszi útmutató a legszebb szakaszokhoz",
    "heading": "Túrázás a Likiai úton Antalyából",
    "description": "Túrázás a Likiai úton Antalya közelében: a legjobb évszak, szakaszok Kemer, Olympos, Adrasan és Kaş környékén, mit pakolj, és hogyan juthatsz el a túra kiindulópontjához.",
    "excerpt": "Ókori romok, fenyőerdők és kilátás a tengerre a világ egyik nagy távolsági túraútvonalán. Mely szakaszokat érdemes Antalyából bejárni, és mikor menj.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "A Likiai út (Likya Yolu) több mint 500 km hosszú, jelzett távolsági túraútvonal Fethiye és Antalya között, amely régi ösvényeket, öszvérutakat és római utakat követ a tengerparton és az ókori Líkia hegyei között. Nem kell hozzá hetekig menetelni: a Likiai út számos legszebb szakasza könnyen elérhető Antalyából, és kiváló egynapos túrákat vagy rövid túrázós nyaralást kínál."
      },
      {
        "type": "h2",
        "text": "Mikor érdemes menni: tavasszal és ősszel"
      },
      {
        "type": "table",
        "head": [
          "Évszak",
          "Körülmények",
          "Értékelés"
        ],
        "rows": [
          [
            "Március - május",
            "Enyhe napok, zöld dombok, vadvirágok, bővizű források",
            "A legjobb évszak"
          ],
          [
            "Június - augusztus",
            "Nagyon meleg, sok szakaszon kevés árnyék, kiszáradt források",
            "Csak kora reggel vagy rövid túrák"
          ],
          [
            "Szeptember - november",
            "Meleg tenger, stabil időjárás, október végétől hűvösebb",
            "A második legjobb évszak"
          ],
          [
            "December - február",
            "Enyhe a parton, esős időszakok, hó a magas hágókon",
            "Az alacsony parti szakaszokon lehetséges"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Szakaszok Antalya közelében"
      },
      {
        "type": "ul",
        "items": [
          "Göynük - Kemer környéke: erdei ösvények és kanyonkilátás a kemeri üdülőhelyek közelében.",
          "Çıralı és Olympos: parti szakasz Olympos romjai és a Khimaira örök lángjai között.",
          "Adrasan - Olympos: az egyik leglátványosabb szakasz sziklafalakkal, öblökkel és messzire nyúló tengeri kilátással.",
          "Kaş környéke: parti ösvények líkiai sírokkal, kis öblökkel és a partok előtt a görög Meis (Kasztellorizo) szigettel.",
          "Phaselis: rövidebb séták az ókori város és három kikötője körül, ideálisak az első ízelítőhöz."
        ]
      },
      {
        "type": "h2",
        "text": "A túra megtervezése"
      },
      {
        "type": "p",
        "text": "Az útvonal piros-fehér jelzésű, de egyes szakaszai egyenetlenek, kövesek és meredekek, a jelzések pedig helyenként hiányosak lehetnek. Használj jó térképet vagy GPS-nyomvonalat, lehetőleg ne egyedül menj, és szólj valakinek az útvonaladról. Sok szakaszon a falvak között nincs sem bolt, sem víz, ezért indulj korán, és vigyél több vizet, mint amennyire szerinted szükséged lesz."
      },
      {
        "type": "h2",
        "text": "Mit pakolj?"
      },
      {
        "type": "ul",
        "items": [
          "Túrabakancs vagy strapabíró terepfutó cipő - a mészkő helyenként éles és laza.",
          "Fejenként legalább két liter víz, plusz nassolnivaló.",
          "Napkalap, naptej és egy vékony, hosszú ujjú réteg, még tavasszal is.",
          "Szél- vagy esőkabát a hegyi szakaszokra és a változékony tavaszi időre.",
          "Kis elsősegélycsomag és feltöltött telefon offline térképpel."
        ]
      },
      {
        "type": "h2",
        "text": "Eljutás a túraútvonalra és vissza"
      },
      {
        "type": "p",
        "text": "A legtöbb szakasz olyan falvakban kezdődik és végződik, amelyek tömegközlekedéssel nehezen érhetők el, egy egyirányú túra pedig azt jelenti, hogy máshol érsz célba, mint ahonnan elindultál. Egy privát transzfer az antalyai repülőtérről vagy a szállodádból elvisz a szakasz kezdetéhez, és a végén érted is tud menni. Az ár járművenként fix, így túracsoportoknak is jól működik; add meg a kiinduló- és a végpontot, a dátumot és a létszámot, és előre megküldjük az árajánlatot."
      }
    ],
    "faq": [
      [
        "Milyen hosszú a Likiai út?",
        "A jelzett útvonal több mint 500 km hosszú Fethiye és Antalya között. A legtöbb látogató nem a teljes utat, hanem kiválasztott szakaszokat jár be."
      ],
      [
        "Mikor a legjobb túrázni a Likiai úton?",
        "A tavasz, márciustól májusig, a legjobb évszak, ezt követi az ősz szeptembertől novemberig. Nyáron nagyon meleg van, és sok forrás kiszárad."
      ],
      [
        "A Likiai út mely szakaszai vannak legközelebb Antalyához?",
        "A Göynük és Kemer, Çıralı és Olympos, Adrasan és Phaselis környéki szakaszok mind körülbelül egy-két órára vannak Antalyától. A Kaş környéki szakaszok nyugatabbra esnek."
      ],
      [
        "Lehet transzfert kérni a Likiai út egy szakaszának kezdőpontjához?",
        "Igen. Küldd el a kiinduló- és végpontot, valamint a dátumot, és járművenként fix áras ajánlatot adunk privát transzferre, a túra végén történő felvétellel együtt."
      ]
    ]
  }
};
