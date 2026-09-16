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
};
