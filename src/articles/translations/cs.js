/**
 * Blog copy for cs: the page chrome plus every article body.
 * One file per language, so adding a market is adding a file.
 */
export const chrome = {
  locale: "cs_CZ",
  indexTitle: "Průvodci transfery v Antalyi a články o cestování | Antalya VIP Tourism",
  indexDescription:
    "Praktičtí průvodci příletem do Antalye: transfer versus taxi, setkání s řidičem, cestování s dětmi, vzdálenosti podél pobřeží a kdy jet.",
  heading: "Průvodci transfery v Antalyi",
  intro:
    "Praktické články o příletu na letiště v Antalyi a cestě do hotelu - z transferů, které jezdíme každý den, ne z prospektu.",
  blog: "Průvodci",
  readMore: "Číst průvodce",
  minReadLabel: "{minutes} min čtení",
  updated: "Aktualizováno",
  contents: "V tomto průvodci",
  faqHeading: "Často kladené otázky",
  relatedHeading: "Trasy transferů v tomto průvodci",
  routeGuidesHeading: "Průvodci k tomuto transferu",
  moreHeading: "Další průvodci",
  ctaHeading: "Transfer z letiště Antalya za pevnou cenu",
  ctaText:
    "Jedna cena za celé vozidlo, sledování letu v ceně a platba v hotovosti řidiči. Zkontrolujte trasu a rezervujte za minutu.",
  ctaButton: "Zjistit pevnou cenu",
  backToBlog: "Všichni průvodci",
  home: "Domů",
  routes: "Trasy transferů",
  book: "Rezervovat transfer",
  imprint: "Tiráž",
  privacy: "Soukromí",
  imprintUrl: "/cs/impressum/",
  privacyUrl: "/cs/privacy/",
};

export const articles = {
  "transfer-vs-taxi": {
    slug: "transfer-nebo-taxi-letiste-antalya",
    title: "Letiště Antalya: soukromý transfer, taxi, nebo sdílený shuttle?",
    heading: "Soukromý transfer, taxi, nebo sdílený shuttle z letiště Antalya?",
    description:
      "Kolik tři možnosti odjezdu z letiště v Antalyi opravdu stojí, jak dlouho trvají a která se hodí vaší skupině. Srovnání s pevnou cenou za vozidlo.",
    excerpt:
      "Tři způsoby, jak opustit letiště v Antalyi, a tři zcela odlišné začátky dovolené. Kolik co stojí, jak dlouho to trvá a komu se to hodí.",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "Přistáváte na letišti v Antalyi (AYT) po třech až pěti hodinách letu, často pozdě večer, obvykle se zavazadly a nezřídka s dětmi. Následujících čtyřicet minut rozhoduje o tom, jak vaše dovolená začne. Z terminálu vedou tři reálné cesty a nejnižší uvedená cena málokdy znamená nejlevnější jízdu." },
      { type: "h2", text: "Tři možnosti vedle sebe" },
      {
        type: "table",
        head: ["", "Soukromý transfer", "Letištní taxi", "Sdílený shuttle"],
        rows: [
          ["Základ ceny", "Pevná, za vozidlo", "Taxametr, za jízdu", "Za osobu"],
          ["Známá předem", "Ano", "Ne", "Ano"],
          ["Počká při zpoždění letu", "Ano, se sledováním", "Ne", "Omezeně"],
          ["Zastávky před vaším hotelem", "Žádné", "Žádné", "Až 8"],
          ["Kapacita zavazadel", "Jako v dodávce", "Jako v osobním voze", "Sdílená"],
          ["Dětská sedačka", "Na vyžádání, zdarma", "Zřídka", "Ne"],
        ],
      },
      { type: "h2", text: "Kolik taxi ve skutečnosti stojí" },
      { type: "p", text: "Taxi je na každém letišti nasnadě a na krátkou vzdálenost je to rozumná volba. Na Turecké riviéře je problémem vzdálenost: do Beleku je to 45 km, do Side 65 km, do Alanye 125 km. Taxametr běžící v noci 125 km, s cestou zpět, kterou řidič musí započítat, dá částku, kterou vám nikdo předem neřekl. A nemáte se čeho chytit, pokud se nejelo nejkratší trasou." },
      { type: "p", text: "Soukromý transfer to obrací: cena za celé vozidlo je dohodnutá před odletem, nemění se v zácpě a je stejná pro jednoho i pro šest cestujících." },
      { type: "h2", text: "Proč sdílený shuttle vypadá levně a často není" },
      { type: "p", text: "Cena za osobu působí neporazitelně u jednoho cestujícího a u dvou už výhodná není. Pro čtyřčlennou rodinu do Side stojí čtyři místa obvykle víc než jedna dodávka za pevnou cenu. Skutečnou cenou je ale čas: vozidlo vyjede, až je plné, a rozváží hosty podél pobřeží v pořadí, které vyhovuje trase, ne vám. Přijet po nočním letu jako poslední znamená klidně víc než hodinu navíc." },
      { type: "h2", text: "Kdy je která volba správná" },
      {
        type: "ul",
        items: [
          "Jeden cestující, příruční zavazadlo, denní přílet, hotel v centru Antalye: taxi nebo shuttle stačí.",
          "Dva a více lidí s hotelem mimo město: vlastní vozidlo je obvykle levnější a vždy rychlejší.",
          "Rodiny s dětskou sedačkou, kočárkem nebo golfovým bagem: soukromě, protože kapacita je potvrzená předem.",
          "Noční přílety a přestupy, které se mohou posunout: soukromě, protože přistavení jde za letem, ne za jízdním řádem.",
        ],
      },
      { type: "h2", text: "Na co se zeptat před rezervací" },
      { type: "p", text: "Tři otázky rozdíl okamžitě ukážou. Platí cena za vozidlo, nebo za osobu? Je pevná, nebo se hýbe s provozem a denní dobou? A co se stane, když let přiletí o dvě hodiny později - bude tam ještě někdo čekat a bude to stát navíc? Naše pevné ceny platí za vozidlo, sledování letu je v ceně a prvních 90 minut čekání po přistání je zdarma a při zpoždění se automaticky posouvá." },
    ],
    faq: [
      ["Je soukromý transfer dražší než taxi v Antalyi?", "Do centra Antalye je to srovnatelné. Do Beleku, Side, Kemeru nebo Alanye je pevná cena za vozidlo obvykle nižší než částka z taxametru na stejné vzdálenosti, a znáte ji před odletem."],
      ["Platím za osobu, nebo za vozidlo?", "Za vozidlo. Cena Mercedesu Vito platí až pro šest cestujících, Sprinter pro větší skupiny. Další cestující cenu nemění."],
      ["Co když má můj let zpoždění?", "Let sledujeme v reálném čase a přistavení posuneme bez příplatku. Zahrnutých 90 minut čekání se počítá od skutečného přistání."],
      ["Mohu zaplatit hotově po příletu?", "Ano. Platba předem není nutná; pevnou částku z rezervace zaplatíte řidiči na začátku jízdy."],
    ],
  },
  "airport-arrival-guide": {
    slug: "prilet-letiste-antalya-pruvodce",
    title: "Přílet na letiště Antalya: terminály, místo setkání, čekací doba",
    heading: "Přílet na letiště v Antalyi: co se děje po přistání",
    description:
      "Krok za krokem příletem na letiště v Antalyi - terminály, pasová kontrola, zavazadla, kde čeká řidič a jak dlouho trvá čekání zdarma.",
    excerpt:
      "Od dosednutí po dveře vozidla: terminály, pasová kontrola, místo setkání a co se stane při zpoždění.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Letiště v Antalyi odbaví přes třicet milionů cestujících ročně a téměř všichni přilétají v úzkém letním okně. Kdo zná pořadí předem, promění plný terminál ve dvacetiminutovou formalitu." },
      { type: "h2", text: "Na který terminál přistanete" },
      { type: "p", text: "AYT má tři terminály. Většina mezinárodních pravidelných letů používá Terminál 1 nebo Terminál 2; charterové a sezonní lety obvykle Terminál 2. Vnitrostátní terminál odbavuje lety z Istanbulu, Ankary a Izmiru. Nemusíte to řešit sami: číslo letu nám to řekne a řidič je poslán do správné příletové haly." },
      { type: "h2", text: "Pasová kontrola a zavazadla" },
      { type: "p", text: "Většina evropských občanů cestuje do Turecka na krátký pobyt bez víza, ale pravidla pro svůj pas si ověřte před cestou. V hlavní sezoně počítejte s 20 až 45 minutami od přistání po odchod se zavazadly, mimo červenec a srpen méně. Nejvíc kolísá výdej zavazadel, a proto je okno čekání důležitější než slíbený čas přistavení." },
      { type: "h2", text: "Kde na vás řidič čeká" },
      {
        type: "ul",
        items: [
          "Vyzvedněte si zavazadla a projděte do příletové haly.",
          "Zamiřte do zóny meet & greet J / 777.",
          "Náš tým na letišti najde vaši rezervaci a doprovodí vás k řidiči.",
          "Řidič odnese zavazadla k vozidlu na nedalekém parkovišti.",
        ],
      },
      { type: "p", text: "Nemusíte hledat cedulku se jménem v davu padesáti lidí. Tým stojí na pevném místě a má číslo vaší rezervace, takže předání funguje stejně v 06:00 i ve 02:00." },
      { type: "h2", text: "Co se stane při zpoždění letu" },
      { type: "p", text: "Sledujeme samotný let, ne jízdní řád, podle kterého jste rezervovali. Přistane-li o dvě hodiny později, přistavení se posune o dvě hodiny a cena se nemění. Prvních 90 minut čekání po skutečném přistání je zahrnuto zdarma - to pokryje dlouhou frontu na pasové kontrole i zpožděná zavazadla." },
      { type: "h2", text: "Před cestou" },
      { type: "p", text: "Dvě drobnosti udělají den klidným: dejte nám číslo letu, ne jen čas příletu, a nahlaste počet dětských sedaček už při rezervaci. Obojí je zdarma - a obojí se v jednu ráno v příletové hale shání mnohem hůř." },
    ],
    faq: [
      ["Kde přesně se setkám s řidičem na letišti v Antalyi?", "V zóně meet & greet J / 777 v příletové hale, po vyzvednutí zavazadel. Náš tým má vaši rezervaci a doprovodí vás k řidiči."],
      ["Jak dlouho řidič čeká?", "Prvních 90 minut po skutečném přistání je zahrnuto zdarma a okno se při zpoždění letu automaticky posouvá."],
      ["Jak dlouho trvá odchod z terminálu?", "Obvykle 20 až 45 minut od přistání podle pasové kontroly a výdeje zavazadel. Nejdéle v červenci a srpnu."],
      ["Musím poslat číslo letu?", "Ano, prosím. Podle čísla letu sledujeme skutečný čas přistání a posíláme řidiče na správný terminál."],
    ],
  },
  "alanya-distance-guide": {
    slug: "letiste-antalya-alanya-vzdalenost",
    title: "Letiště Antalya - Alanya: vzdálenost, doba jízdy a možnosti transferu",
    heading: "Z letiště v Antalyi do Alanye: jak daleko to opravdu je",
    description:
      "125 km po pobřežní silnici D400. Jak dlouho jízda do Alanye skutečně trvá, kde leží jednotlivé rezortní čtvrti a jak naplánovat pozdní přílet.",
    excerpt:
      "Alanya je nejdelší z běžných transferů z Antalye. Skutečná vzdálenost, skutečná doba jízdy a co mění noční přílet.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Alanya leží 125 km východně od letiště v Antalyi, což z ní dělá nejdelší běžně rezervovaný transfer na Turecké riviéře. Právě tato vzdálenost určuje všechna ostatní rozhodnutí o cestě." },
      { type: "h2", text: "Vzdálenost a doba jízdy" },
      {
        type: "table",
        head: ["Cíl", "Vzdálenost z AYT", "Obvyklá jízda"],
        rows: [
          ["Centrum Antalye", "15 km", "20-30 minut"],
          ["Side", "65 km", "55-65 minut"],
          ["Manavgat", "75 km", "60-70 minut"],
          ["Kızılağaç", "85 km", "70-80 minut"],
          ["Alanya", "125 km", "110-130 minut"],
        ],
      },
      { type: "p", text: "Trasa vede po pobřežní silnici D400 na východ přes Serik, Manavgat a Kızılağaç. Je to dobrá silnice, ale vede skrz města, ne kolem nich, takže letní odpoledne a sobotní charterové špičky přidají čas, který žádný jízdní řád neodstraní." },
      { type: "h2", text: "Alanya není jedno místo" },
      { type: "p", text: "Hotely prodávané jako „Alanya\" se rozprostírají zhruba po 65 km pobřeží. Avsallar, Türkler a Okurcalar leží západně od centra a jsou znatelně blíž letišti; Mahmutlar, Kestel, Kargıcak a Demirtaş leží východně a přidají 20 až 45 minut. Při rezervaci uveďte název hotelu, ne jen letovisko: určuje to jak dobu jízdy, tak správnou pevnou cenu." },
      { type: "h2", text: "Proč sdílený shuttle bolí nejvíc právě tady" },
      { type: "p", text: "Na 125 km je každá zastávka navíc skutečnou zajížďkou. Shuttle, který vysadí osm skupin podél pobřeží, promění dvě hodiny snadno ve čtyři - a poslední vystupuje obvykle rodina bydlící nejdál na východ. Soukromé vozidlo projede trasu jednou, ve vašem pořadí, a pevná cena se s provozem nehýbe." },
      { type: "h2", text: "Plánování pozdního příletu" },
      { type: "p", text: "Řada letů do Alanye přistává po 23:00. Tehdy záleží na dvou věcech: že někdo určitě čeká a že cena byla dohodnutá před odletem. Let sledujeme, takže pozdní přistání přistavení posune, nikoli zruší, a prvních 90 minut čekání je zahrnuto. Platí se hotově řidiči na začátku jízdy, takže uprostřed noci se už nic řešit nemusí." },
    ],
    faq: [
      ["Jak daleko je Alanya od letiště v Antalyi?", "125 km po pobřežní silnici D400, obvykle 110 až 130 minut jízdy."],
      ["Je cena transferu stejná pro všechny hotely v Alanyi?", "Ne. Pobřeží Alanye měří asi 65 km, takže hotely v Avsallaru nebo Okurcalaru se počítají jinak než v Mahmutlaru či Kargıcaku. Zadejte název hotelu a uvidíte správnou pevnou cenu."],
      ["Je po cestě zastávka?", "U soukromého transferu se na přání krátce zastavíme. Žádné plánované zastávky ani další cestující."],
      ["Co když přistanu po půlnoci?", "Přistavení se řídí vaším skutečným časem přistání. Noční přílety jsou na této trase běžné a bez příplatku."],
    ],
  },
  "family-child-seats": {
    slug: "transfer-letiste-antalya-s-detmi",
    title: "Transfer z letiště Antalya s dětmi: sedačky, kočárky, zavazadla",
    heading: "Cesta do hotelu s dětmi",
    description:
      "Dětské sedačky, kočárky a zavazadla při transferu z letiště v Antalyi. Co uvést při rezervaci a proč je s malými dětmi soukromé vozidlo jednodušší.",
    excerpt:
      "Dětské sedačky jsou na vyžádání zdarma, ale jen když o nich víme dřív, než přistanete. Co nám říct a co se do vozidla opravdu vejde.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Transfer s malými dětmi je logistický, ne cenový problém. Sedačky, kočárek, cestovní postýlka a čtyři kufry se musí vejít do jednoho vozidla naráz - a rozhodnutí, která to umožní, padají při rezervaci, ne na terminálu." },
      { type: "h2", text: "Dětské sedačky" },
      { type: "p", text: "Dětské sedačky poskytujeme na vyžádání zdarma. Uveďte při rezervaci počet dětí a jejich věk; podle toho se pozná, zda je potřeba vajíčko, sedačka pro batole nebo podsedák. Sedačky přijedou s vozidlem, takže nic nenesete přes letiště a v jednu ráno už nic neřešíte." },
      { type: "h2", text: "Co se do vozidla vejde" },
      {
        type: "ul",
        items: [
          "Mercedes Vito: až šest cestujících s běžnými dovolenkovými zavazadly.",
          "Mercedes Sprinter: větší skupiny, až 12 míst, a správná volba, když jede kočárek a cestovní postýlka.",
          "Kočárky a sedačky se nepočítají do počtu cestujících, ale zabírají zavazadlový prostor - nahlaste je a vozidlo tomu přizpůsobíme.",
        ],
      },
      { type: "p", text: "Pevná cena platí za vozidlo, ne za sedadlo, takže další dítě cenu nikdy nezmění. Mění se jen to, které vozidlo pošleme." },
      { type: "h2", text: "Proč s dětmi soukromě znamená víc" },
      { type: "p", text: "Ve sdíleném shuttlu rodina nejdřív čeká, až se vozidlo naplní, a pak jede podél pobřeží, zatímco vystupují ostatní. S batoletem po nočním letu je to rozdíl mezi čtyřiceti minutami a třemi hodinami. Soukromé vozidlo vyjede, až jste připraveni, a jede rovnou k recepci hotelu." },
      { type: "h2", text: "Praktické detaily" },
      { type: "p", text: "Ve vozidle je pitná voda. Pokud je na dlouhé trase do Side nebo Alanye potřeba krátká zastávka, stačí říct řidiči - žádný jízdní řád se dodržovat nemusí. A protože se platí hotově na začátku jízdy, nikdo nemusí hledat kartu ani signál se spícím dítětem v náručí." },
    ],
    faq: [
      ["Jsou dětské sedačky zdarma?", "Ano. Sedačky poskytujeme na vyžádání bez příplatku. Uveďte prosím při rezervaci počet dětí a jejich věk."],
      ["Mohu vzít kočárek?", "Ano. Nahlaste ho při rezervaci, ať naplánujeme zavazadlový prostor - kočárek plus kompletní kufry mohou znamenat Sprinter místo Vita."],
      ["Počítají se děti do limitu cestujících?", "Do počtu míst ano. Cena se nemění: je pevná za vozidlo, ne za osobu."],
      ["Můžeme na dlouhé trase zastavit?", "Ano. U soukromého transferu řidič na přání krátce zastaví; nečekají žádní další cestující."],
    ],
  },
  "belek-golf-transfer": {
    slug: "golfovy-transfer-do-beleku",
    title: "Golfový transfer do Beleku: hole, skupiny a načasování z AYT",
    heading: "Z letiště v Antalyi do Beleku s golfovými bagy",
    description:
      "Jak golfová zavazadla cestují z letiště v Antalyi do Beleku: volba vozidla, velikost skupiny, načasování kolem tee time a co nahlásit při rezervaci.",
    excerpt:
      "Belek je nejdřív golfová destinace a teprve pak plážové letovisko. Co to znamená pro zavazadlový prostor, volbu vozidla a jízdu z AYT.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Belek leží 45 km východně od letiště v Antalyi, 35 až 40 minut jízdy, a soustřeďuje nejhustší shluk šampionátových hřišť v Turecku. Většina skupin tam veze něco, na co běžný transfer není dimenzovaný: golfové bagy." },
      { type: "h2", text: "Golfové bagy a volba vozidla" },
      { type: "p", text: "Tour bag měří zhruba 130 cm a o prostor se s kufry dělí nerad. Pracovní pravidlo: Mercedes Vito zvládne čtyři cestující se čtyřmi bagy a běžnými zavazadly; nad to je správným vozidlem Mercedes Sprinter. Uveďte při rezervaci počet bagů a vozidlo přiřadíme k nákladu, ne k počtu hlav." },
      {
        type: "ul",
        items: [
          "Čtyři hráči, čtyři bagy, standardní kufry: Vito.",
          "Šest až osm hráčů, nebo bagy plus velké kufry: Sprinter.",
          "Smíšená skupina s nehrajícími partnery: počítejte bagy, ne lidi.",
        ],
      },
      { type: "h2", text: "Načasování kolem tee time" },
      { type: "p", text: "Jízda je krátká, letiště ne. V hlavní sezoně počítejte s 20 až 45 minutami od přistání po odchod z terminálu a k tomu 35 až 40 minut jízdy. Dopolední tee time v den příletu je reálný jen u letů přistávajících zhruba před 07:00; u pozdějších plánujte první kolo na další ráno." },
      { type: "h2", text: "Hřiště a hotely v okolí" },
      { type: "p", text: "Rezorty v Beleku - mezi nimi Regnum Carya, Gloria, Cornelia a Maxx Royal - leží pár kilometrů od sebe i od hřišť, takže zastávka navíc kvůli spoluhráči v jiném hotelu stojí minuty, ne hodinu. U soukromého transferu to jde; ve sdíleném shuttlu o pořadí nerozhodujete." },
      { type: "h2", text: "Co potvrdit při rezervaci" },
      { type: "p", text: "Tři věci: počet golfových bagů, název hotelu a čas zpátečního přistavení, pokud už znáte odlet. Cena je pevná za vozidlo, takže větší vozidlo kvůli zavazadlům je nabídka, kterou vidíte před cestou, nikdy příplatek u obrubníku." },
    ],
    faq: [
      ["Stojí golfová zavazadla něco navíc?", "Ne. Cena je pevná za vozidlo. Větší zavazadla mohou znamenat, že pošleme Sprinter místo Vita, a tuto cenu vidíte při rezervaci."],
      ["Kolik golfových bagů se vejde do Vita?", "Prakticky čtyři bagy při čtyřech cestujících se standardními kufry. Při větším počtu nasazujeme Sprinter."],
      ["Jak dlouho trvá jízda z letiště v Antalyi do Beleku?", "45 km, při běžném provozu obvykle 35 až 40 minut."],
      ["Můžeme zastavit u druhého hotelu v Beleku?", "Ano. Rezorty leží blízko sebe, takže další vysazení stojí u soukromého transferu jen pár minut. Uveďte to při rezervaci."],
    ],
  },
  "when-to-visit-antalya": {
    slug: "nejlepsi-doba-na-antalyu",
    title: "Nejlepší doba na Antalyu: sezona po sezoně a co to znamená pro transfer",
    heading: "Kdy jet do Antalye - a jak sezona mění váš přílet",
    description:
      "Antalya sezonu po sezoně: počasí, davy, ceny a provoz na letišti. Co každý měsíc znamená pro časy letů, dopravu a plánování příletu.",
    excerpt:
      "Každá sezona na Turecké riviéře znamená jiný přílet. Co se mění mezi dubnem a říjnem a proč na tom na silnici záleží.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Antalya je zhruba sedm měsíců plná a pět měsíců klidná, a rozdíl se projeví dávno před pláží - na cenách letenek, frontách na letišti a provozu na D400." },
      { type: "h2", text: "Duben až květen: okno nejlepšího poměru" },
      { type: "p", text: "Teplota moře v květnu stoupá, přes den je přes dvacet stupňů a pobřežní silnice je na letní poměry prázdná. Lety přistávají v civilizovaných časech a terminál se rychle vyprázdní. Tehdy je jízda do Alanye nebo Kaşu potěšením, ne zkouškou vytrvalosti." },
      { type: "h2", text: "Červen až srpen: špička" },
      { type: "p", text: "Červenec a srpen jsou horké, plné a drahé. Letiště v Antalyi jede na nejvyšší zátěž, pasová kontrola i zavazadla trvají nejdéle a na pobřežní silnici se mísí dovolenkový provoz s místním víkendovým. Právě tehdy se pevná cena a přistavení podle skutečného letu vyplatí: na silnici není předvídatelné nic, takže má smysl zafixovat všechno, co zafixovat lze." },
      { type: "h2", text: "Září až říjen: nejlepší kompromis" },
      { type: "p", text: "Moře je nejteplejší, davy týden po týdnu řídnou a od poloviny září klesají ceny. Mnoho stálých hostů považuje konec září za nejlepší týden roku na tomto pobřeží. Transfery se opět vejdou do nominálních časů." },
      { type: "h2", text: "Listopad až březen: klidná sezona" },
      { type: "p", text: "Denní teploty zůstávají mírné, mnoho plážových hotelů zavírá a místo pláže nastupují město, hory a antické památky. Nabídka letů se zúží a časy příletů přestanou být pohodlné - a právě tehdy předem rezervované vozidlo poráží improvizaci na terminálu." },
      { type: "h2", text: "Co sezona mění na vašem transferu" },
      {
        type: "ul",
        items: [
          "Vrchol léta: počítejte s až 45 minutami od přistání po odchod z terminálu a delší jízdou východně od Manavgatu.",
          "Přechodná sezona: uváděné doby jízdy jsou realistické.",
          "Zima: méně letů a více nočních přistání - uveďte číslo letu a nechte přistavení jít za ním.",
          "Celý rok: pevná cena za vozidlo se nemění se sezonou, provozem ani denní dobou.",
        ],
      },
    ],
    faq: [
      ["Který měsíc je na Antalyu nejlepší?", "Konec září obvykle nabízí nejlepší kombinaci: nejteplejší moře, prořídlé davy a ceny, které už klesají."],
      ["Je letiště v Antalyi v létě plnější?", "Výrazně. V červenci a srpnu počítejte s až 45 minutami od přistání po odchod z terminálu; v přechodné sezoně často s polovinou."],
      ["Mění se ceny transferů podle sezony?", "Ne. Naše ceny jsou pevné za vozidlo a nemění se se sezonou, provozem ani denní dobou."],
      ["Vyplatí se Antalya v zimě?", "Ano, kvůli městu, horám a archeologickým lokalitám, ne kvůli pláži. Mnoho pobřežních hotelů je od listopadu do března zavřených."],
    ],
  },
  "antalya-in-autumn": {
    "slug": "antalya-na-podzim",
    "title": "Antalya v říjnu a listopadu: co dělat na podzim",
    "heading": "Antalya na podzim: co dělat v říjnu a listopadu",
    "description": "Antalya na podzim: co dělat v říjnu a listopadu? Teplé moře, klidné pláže, antické památky, túry kaňony a golf. Počasí, co má otevřeno a jak naplánovat přílet.",
    "excerpt": "Moře je stále teplé, davy odjely domů a vedra polevila. Proč jsou říjen a listopad nejlépe střeženým tajemstvím Turecké riviéry.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Většina turistů opouští Antalyu koncem září – a právě proto je Antalya na podzim tak příjemná. Moře si letní teplo drží ještě celé týdny, denní teploty klesají na příjemných dvacet a něco stupňů a místa, která jsou v srpnu k nevydržení – ruiny, kaňony, staré město –, se stávají tím nejlepším z celé cesty."
      },
      {
        "type": "h2",
        "text": "Podzimní počasí v Antalyi"
      },
      {
        "type": "table",
        "head": [
          "Měsíc",
          "Den / noc",
          "Moře",
          "Jaké to je"
        ],
        "rows": [
          [
            "Říjen",
            "asi 27 °C / 16 °C",
            "asi 24 °C",
            "Léto bez veder – dny na pláži jsou stále běžné"
          ],
          [
            "Listopad",
            "asi 21 °C / 11 °C",
            "asi 21 °C",
            "Slunečná dopoledne, první přeháňky, chladné večery"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Balte se na pláž i na večer: v říjnu stačí lehká bunda, v listopadu se hodí teplejší vrstva a nepromokavá bunda."
      },
      {
        "type": "h2",
        "text": "Stále dovolená u moře: říjen na pobřeží"
      },
      {
        "type": "p",
        "text": "V říjnu jsou pláže v Konyaaltı, Laře, Beleku, Side a Alanyi stále otevřené, voda bývá ráno teplejší než vzduch a o lehátka už se nikdo nepere. Většina velkých resortů v Beleku, Side a Kemeru má otevřeno do konce října; od listopadu se nabídka zužuje, proto si před koupí letenek ověřte, do kdy trvá sezona vašeho hotelu."
      },
      {
        "type": "h2",
        "text": "Antické památky bez veder"
      },
      {
        "type": "p",
        "text": "Podzim je sezonou zdejších ruin. Perge a Aspendos leží jen kousek od silnice do Beleku a Side, Apollónův chrám v Side stojí na okraji přístavu a Termessos vysoko v horách za městem je túra, do které by se v létě nikdo pouštět neměl. V listopadu můžete mít celé kolonády jen pro sebe."
      },
      {
        "type": "h2",
        "text": "Příroda: kaňony, vodopády a Lýkijská stezka"
      },
      {
        "type": "ul",
        "items": [
          "Vodopády Düden: dolní vodopád padá u Lary přímo do moře, horní leží v parku ve městě.",
          "Kaňon Köprülü: raftingová sezona obvykle trvá až do října, s klidnější vodou než na jaře.",
          "Lýkijská stezka: podzim a jaro jsou dvě turistické sezony – úseky kolem Kemeru, Olympu a Kaşe jsou teď nejkrásnější.",
          "Lanovka na Tahtalı u Kemeru: čistý podzimní vzduch nabízí z vrcholu nejlepší výhledy."
        ]
      },
      {
        "type": "h2",
        "text": "Golf, život ve městě a festivaly"
      },
      {
        "type": "p",
        "text": "Podzim je v Beleku hlavní golfovou sezonou: hřiště jsou zelená, teploty ideální a startovní časy zaplňují skupiny ze severní Evropy. Ve městě ožívají uličky, kavárny a malá muzea Kaleiçi, jakmile odjedou pasažéři výletních lodí a letní turisté, a antalyjský filmový festival Zlatý pomeranč se tradičně koná na podzim."
      },
      {
        "type": "h2",
        "text": "Přílet na podzim"
      },
      {
        "type": "ul",
        "items": [
          "V říjnu je letů stále hodně; od listopadu jich ubývá a víc letadel přistává pozdě v noci.",
          "Terminál je klidnější než v létě, takže doba jízdy do Beleku, Side a Alanye odpovídá uváděným časům.",
          "Předem rezervovaný transfer sleduje číslo vašeho letu, takže zpožděný večerní let není problém.",
          "Naše ceny jsou pevné za vozidlo a v říjnu jsou stejné jako v srpnu."
        ]
      }
    ],
    "faq": [
      [
        "Dá se v Antalyi v říjnu ještě koupat?",
        "Ano. Moře má v říjnu obvykle kolem 24 °C, víc než mnohá evropská moře v létě, a dny na pláži jsou po celý měsíc běžné."
      ],
      [
        "Mají hotely v Antalyi v listopadu otevřeno?",
        "Městské hotely a mnoho resortů zůstává otevřených, ale řada velkých přímořských resortů od listopadu zavírá. Před koupí letenek si ověřte termíny sezony svého hotelu."
      ],
      [
        "Co dělat v Antalyi na podzim kromě pláže?",
        "Antické památky jako Perge, Aspendos a Termessos, vodopády Düden, kaňon Köprülü, turistika po Lýkijské stezce, golf v Beleku a staré město Kaleiçi."
      ],
      [
        "Mění se cena transferu po letní sezoně?",
        "Ne. Cena je pevná za vozidlo a nemění se podle sezony, provozu ani denní doby."
      ]
    ]
  },
  "antalya-in-winter": {
    "slug": "antalya-v-zime",
    "title": "Antalya v zimě: co dělat od prosince do února",
    "heading": "Antalya v zimě: co dělat mezi prosincem a únorem",
    "description": "Antalya v zimě: staré město, vodopády, antické památky, lyžování v Saklıkentu, zimní golf a hotely se spa. Počasí, co má otevřeno a jak se pohybovat po okolí.",
    "excerpt": "Mírné dny, sníh na horách a město, které opět patří svým obyvatelům. Co Antalya nabízí mezi prosincem a únorem – a co ne.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Antalya v zimě je v klidné sezoně, ne zavřená. Přímořská letoviska odpočívají, ale město, hory i antické památky jsou otevřené, světlo je čisté a dny bývají často slunečné a mírné. Je to čas poznat region tak, jak ho vidí místní – a za ceny, na které letní turisté nikdy nedosáhnou."
      },
      {
        "type": "h2",
        "text": "Zimní počasí v Antalyi"
      },
      {
        "type": "table",
        "head": [
          "Měsíc",
          "Den / noc",
          "Moře",
          "Dobré vědět"
        ],
        "rows": [
          [
            "Prosinec",
            "asi 16 °C / 7 °C",
            "asi 19 °C",
            "Nejdeštivější měsíc, ale déšť přichází v nárazech mezi slunečnými dny"
          ],
          [
            "Leden",
            "asi 15 °C / 6 °C",
            "asi 17 °C",
            "Nejchladnější měsíc; sníh na vrcholcích pohoří Taurus"
          ],
          [
            "Únor",
            "asi 16 °C / 6 °C",
            "asi 17 °C",
            "Delší dny, první kvetoucí mandloně"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Slunečná zimní odpoledne působí jako jaro v severní Evropě; večery jsou chladné a interiéry nejsou vždy vytápěné tak, jak jsme zvyklí ze severu. Vezměte si oblečení do vrstev, nepromokavou bundu a pohodlné boty na mokré dlážděné uličky."
      },
      {
        "type": "h2",
        "text": "Město: Kaleiçi, muzea a vodopády"
      },
      {
        "type": "ul",
        "items": [
          "Kaleiçi, staré město v hradbách: Hadriánova brána, minaret Yivli, starý přístav a uličky s osmanskými domy, dnes kavárnami a butikovými hotely.",
          "Antalyjské muzeum: jedna z největších archeologických sbírek v Turecku se sochami z Perge – ideální na deštivý den.",
          "Vodopády Düden a Kurşunlu: díky zimním dešťům jsou nejmohutnější a nejpůsobivější.",
          "Promenády v Konyaaltı a Laře: dlouhé procházky, cyklistika a výhled na moře bez letního horka."
        ]
      },
      {
        "type": "h2",
        "text": "Antické památky bez front"
      },
      {
        "type": "p",
        "text": "Perge, Aspendos a Side jsou otevřené celý rok a v zimě je sdílíte jen s hrstkou návštěvníků. Phaselis u Kemeru má tři přístavy v borovém lese; Olympos a Çıralı jsou mimo sezonu poklidné. Termessos leží v horách a může tam být chladno, mokro, nebo dokonce sníh, proto si vyberte suchý den. Dál na západě je přirozeným zimním výletem kostel svatého Mikuláše v Demre, zvlášť v době Vánoc."
      },
      {
        "type": "h2",
        "text": "Lyžování a moře v jeden den"
      },
      {
        "type": "p",
        "text": "Lyžařské středisko Saklıkent v pohoří Bakırlı leží asi 50 km od města, zhruba hodinu a půl jízdy autem. Když je dost sněhu, obvykle od ledna do března, můžete dopoledne lyžovat a odpoledne se procházet u moře. Na horské silnici mohou být nutné zimní pneumatiky nebo sněhové řetězy, proto si předem ověřte podmínky a nechte si od nás cestu nacenit dopředu."
      },
      {
        "type": "h2",
        "text": "Zimní golf, hotely se spa a dlouhé pobyty"
      },
      {
        "type": "p",
        "text": "Golfová hřiště v Beleku jsou otevřená celou zimu a green fee i ceny hotelů jsou výrazně nižší než na podzim a na jaře. Několik resortů v Beleku, Laře a Kemeru nechává v zimě otevřené spa a kryté bazény a Alanya a Side lákají dlouhodobé hosty ze severní Evropy, kteří sem přijíždějí na týdny či měsíce mírného počasí."
      },
      {
        "type": "h2",
        "text": "Výlety do vzdálenějšího okolí"
      },
      {
        "type": "p",
        "text": "Zima je vhodná pro delší výlety, které jsou v létě vyčerpávající: travertinové terasy Pamukkale a ruiny Hierapole nebo Kappadokie pod sněhem, kterou mnoho návštěvníků považuje za nejkrásnější v tomto ročním období. Obojí znamená dlouhý den na cestě a se soukromým vozidlem zastavíte, kdy a kde chcete."
      },
      {
        "type": "h2",
        "text": "Přílet v zimě"
      },
      {
        "type": "ul",
        "items": [
          "Přímých letů je méně a víc příletů je v noci, často přes Istanbul.",
          "Mnoho přímořských resortů je zavřených, proto si ověřte, že váš hotel má ve vašem termínu otevřeno.",
          "Stanoviště taxi jsou v noci klidnější než v létě; předem rezervované vyzvednutí, které sleduje číslo vašeho letu, je pohodlnější volba.",
          "Pevná cena za vozidlo je v zimě stejná jako v létě – bez nočních či svátečních příplatků."
        ]
      }
    ],
    "faq": [
      [
        "Vyplatí se Antalya v zimě?",
        "Ano, pokud přijedete kvůli městu, antickým památkám, přírodě a golfu, a ne kvůli opalování. Dny bývají často slunečné s teplotami kolem 15 °C a nejsou tu davy."
      ],
      [
        "Dá se v Antalyi v zimě koupat?",
        "Moře má kolem 17–19 °C, což někteří návštěvníci za slunečného dne považují za osvěžující. Mnoho hotelů otevřených v zimě má také vyhřívané kryté bazény."
      ],
      [
        "Dá se u Antalye lyžovat?",
        "Ano. Lyžařské středisko Saklıkent leží asi 50 km od města. Sezona závisí na sněhu a obvykle trvá od ledna do března."
      ],
      [
        "Mají hotely v Antalyi v zimě otevřeno?",
        "Městské hotely v Antalyi a Kaleiçi jsou otevřené celý rok, stejně jako několik resortů v Laře, Beleku, Kemeru, Side a Alanyi. Mnoho velkých sezonních resortů zavírá od listopadu do března."
      ],
      [
        "Jezdíte v zimě transfery z letiště Antalya?",
        "Ano, po celý rok, včetně nočních příletů a svátků, za stejnou pevnou cenu za vozidlo."
      ]
    ]
  },
  "christmas-new-year-antalya": {
    "slug": "vanoce-a-silvestr-v-antalyi",
    "title": "Vánoce a Silvestr v Antalyi: praktický průvodce",
    "heading": "Vánoce a Silvestr v Antalyi",
    "description": "Vánoce nebo Silvestr v Antalyi: počasí, které hotely mají otevřeno, galavečeře, svatý Mikuláš v Demre a cesta na letiště a z letiště v nejrušnějších nocích.",
    "excerpt": "Slunečné dny, silvestrovská gala u moře a město svatého Mikuláše dvě a půl hodiny cesty. Jak naplánovat svátky v Antalyi – a jak se tu noc dostat tam, kam potřebujete.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Vánoce a Silvestr v Antalyi patří k několika málo zimním vrcholům sezony. Rodiny prchající před severskou zimou, skupiny slavící Silvestr i návštěvníci, kteří spojují svátky s pár dny mírného slunce, přijíždějí ve stejných dvou týdnech – zatímco velká část pobřeží je jinak v klidné sezoně."
      },
      {
        "type": "h2",
        "text": "Co čekat koncem prosince"
      },
      {
        "type": "p",
        "text": "Přes den bývá obvykle kolem 15–16 °C a často svítí slunce, i když prosinec je zároveň nejdeštivějším měsícem roku. Vánoce nejsou v Turecku státním svátkem, takže obchody, restaurace a památky mají 25. prosince normálně otevřeno. Silvestr se naopak slaví všude a 1. leden je státní svátek."
      },
      {
        "type": "h2",
        "text": "Které hotely mají otevřeno"
      },
      {
        "type": "p",
        "text": "Městské hotely v Antalyi a Kaleiçi jsou otevřené celý rok a několik resortů v Laře, Beleku, Kemeru, Side a Alanyi otevírá speciálně na svátky s vánoční večeří a silvestrovskou galou. Programy, dress code i příplatky za galavečer se hodně liší, proto se před rezervací zeptejte hotelu, co je v ceně. Pokoje v otevřených resortech bývají na tyto termíny brzy vyprodané."
      },
      {
        "type": "h2",
        "text": "Vánoce: město svatého Mikuláše"
      },
      {
        "type": "p",
        "text": "Historický svatý Mikuláš, biskup, z jehož legendy vzešla postava Santa Clause, žil v Myře – dnešním Demre, asi dvě a půl hodiny západně od Antalye. Kostel svatého Mikuláše a do skály tesané lýkijské hrobky v Myře jsou nezapomenutelným vánočním výletem, který lze spojit se zastávkou v Kaşi nebo s pobřežní silnicí kolem Kumlucy."
      },
      {
        "type": "h2",
        "text": "Silvestr v Antalyi"
      },
      {
        "type": "ul",
        "items": [
          "Hotelové galavečery: večeře, živá hudba a odpočítávání, obvykle s pevným menu a příplatkem.",
          "Ve městě: restaurace v Kaleiçi a kolem přístavu jsou plné, stůl si rezervujte předem.",
          "Lara a Konyaaltı: plážové kluby a restaurace s výhledem na moře pořádají vlastní večírky.",
          "Ohňostroje je vidět podél nábřeží, program se však rok od roku mění."
        ]
      },
      {
        "type": "h2",
        "text": "Jak se dopravit v nejrušnějších nocích"
      },
      {
        "type": "p",
        "text": "Na Silvestra a v časných ranních hodinách 1. ledna se taxi shání jen těžko a aplikace i stanoviště jsou přetížené přesně ve chvíli, kdy chce každý odjet. Pokud slavíte mimo hotel – ve městě, v restauraci nebo ve vile u přátel –, zarezervujte si zpáteční cestu předem s pevným časem vyzvednutí."
      },
      {
        "type": "h2",
        "text": "Přílety a odlety o svátcích"
      },
      {
        "type": "ul",
        "items": [
          "Lety kolem 20. prosince a 2. ledna jsou nejvytíženější za celou zimu; rezervujte včas.",
          "Mnoho svátečních letů přistává večer nebo v noci – vyzvednutí, které sleduje číslo letu, vám ušetří čekání v terminálu.",
          "Rodiny s vánočními dárky a zimními zavazadly by měly uvést počet kufrů, abychom přidělili správné vozidlo.",
          "Naše pevná cena za vozidlo nemá žádný sváteční ani silvestrovský příplatek."
        ]
      }
    ],
    "faq": [
      [
        "Jaké je v Antalyi počasí o Vánocích?",
        "Mírné: přes den obvykle kolem 15–16 °C a v noci 6–8 °C, se slunečnými chvílemi mezi přeháňkami. Na pláž to není, ale na procházky a prohlídky bývá často příjemně."
      ],
      [
        "Slaví se v Antalyi Vánoce?",
        "Vánoce nejsou v Turecku státním svátkem, ale mnoho hotelů s mezinárodní klientelou pořádá vánoční večeři. Silvestr se slaví všude a 1. leden je státní svátek."
      ],
      [
        "Kde je kostel svatého Mikuláše?",
        "V Demre, antické Myře, asi dvě a půl hodiny jízdy západně od Antalye. Pro návštěvníky je otevřený celý rok."
      ],
      [
        "Mohu si zarezervovat transfer na silvestrovskou noc?",
        "Ano. Doporučujeme zarezervovat zpáteční cestu s pevným časem vyzvednutí, protože po půlnoci se taxi shání velmi těžko. Pevná cena za vozidlo nemá žádný sváteční příplatek."
      ]
    ]
  },
  "wintering-in-antalya": {
    "slug": "prezimovani-v-antalyi-a-alanyi",
    "title": "Přezimování v Antalyi a Alanyi: průvodce dlouhým pobytem",
    "heading": "Zima v Antalyi: průvodce pro dlouhodobé pobyty",
    "description": "Přezimování na Turecké riviéře: proč Alanya, Side a Antalya lákají dlouhodobé hosty a co čekat od počasí, ubytování, zdravotní péče i příletu s velkým množstvím zavazadel.",
    "excerpt": "Týdny či měsíce mírného počasí místo severské zimy. Co by měli dlouhodobí hosté vědět, než se vydají přezimovat do Alanye, Side nebo Antalye.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Každou zimu tisíce návštěvníků z Německa, Skandinávie, Nizozemska, Ruska a Polska vymění šedou oblohu za Tureckou riviéru, a to na celé týdny či měsíce. Mírné teploty, dlouhé promenády a nižší životní náklady než doma dělají z přezimování v Antalyi, Alanyi a Side jednu z nejoblíbenějších zimních voleb ve Středomoří."
      },
      {
        "type": "h2",
        "text": "Proč přezimovat právě tady"
      },
      {
        "type": "ul",
        "items": [
          "Mírné klima: zimní dny kolem 15–17 °C, často slunečno, na pobřeží jen výjimečně mráz.",
          "Denní světlo: znatelně víc slunečních hodin než v severní a střední Evropě.",
          "Prostor: promenády, pláže a stará města bez letních davů.",
          "Infrastruktura: obchody, trhy, restaurace a soukromé nemocnice jsou ve větších městech otevřené celý rok."
        ]
      },
      {
        "type": "h2",
        "text": "Kde se ubytovat"
      },
      {
        "type": "table",
        "head": [
          "Místo",
          "Hodí se pro",
          "Vzdálenost od letiště"
        ],
        "rows": [
          [
            "Město Antalya",
            "Městský život, kultura, muzea, všechny služby hned za dveřmi",
            "asi 15–30 minut"
          ],
          [
            "Side / Manavgat",
            "Klidné staré město, dlouhé pláže, procházky po rovině",
            "asi 1 hodina"
          ],
          [
            "Alanya",
            "Největší komunita dlouhodobých hostů, promenády, čilý zimní život",
            "asi 1 hodina 45 minut"
          ],
          [
            "Kemer",
            "Hory a moře, turistika, menší letovisko",
            "asi 1 hodina"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Alanya a sousední čtvrti jako Mahmutlar a Oba mají největší zimní komunitu dlouhodobých hostů, s kluby, aktivitami a restauracemi, které jsou plné celou zimu. Side je klidnější; Antalya se hodí pro ty, kdo chtějí skutečné město."
      },
      {
        "type": "h2",
        "text": "Ubytování: hotely a apartmány"
      },
      {
        "type": "p",
        "text": "Některé hotely v Alanyi, Side a Antalyi nabízejí zvláštní ceny pro pobyty na čtyři týdny a déle, často s polopenzí. Pronajatý apartmán dává víc prostoru a nezávislosti; ověřte si, zda má topení nebo klimatizaci s funkcí vytápění, protože turecké domy na pobřeží jsou stavěné na léto a za zimních večerů v nich může být chladno."
      },
      {
        "type": "h2",
        "text": "Všední den v zimě"
      },
      {
        "type": "ul",
        "items": [
          "Týdenní trhy v každé čtvrti s čerstvým ovocem a zeleninou – zima je sezonou citrusů.",
          "Procházky a jízda na kole po promenádách v Alanyi, Side, Laře a Konyaaltı.",
          "Turistika v podhůří pohoří Taurus a po Lýkijské stezce za suchých dnů.",
          "Jednodenní výlety k antickým památkám, k vodopádu Manavgat nebo do starého města Antalye.",
          "Soukromé nemocnice a kliniky v Antalyi a Alanyi s odděleními pro zahraniční pacienty."
        ]
      },
      {
        "type": "h2",
        "text": "Úřední záležitosti a praktické tipy"
      },
      {
        "type": "p",
        "text": "Podmínky vstupu a délka pobytu povolená bez povolení k pobytu závisí na vaší státní příslušnosti a čas od času se mění, proto si před cestou ověřte aktuální pravidla u oficiálních tureckých úřadů. Důrazně doporučujeme cestovní pojištění, které kryje dlouhý pobyt v zahraničí."
      },
      {
        "type": "h2",
        "text": "Přílet se zavazadly na několik měsíců"
      },
      {
        "type": "p",
        "text": "Dlouhodobí hosté cestují s víc než jedním dovolenkovým kufrem. Dejte nám vědět, kolik kufrů a dalších věcí vezete – jízdní kola, chodítka nebo krabice –, a my přidělíme Mercedes Vito, případně Sprinter. Cena je pevná za vozidlo, takže se další zavazadla zohlední už při rezervaci a neúčtují se až u obrubníku. Řidič vám u dveří pomůže s nakládáním i vykládáním."
      }
    ],
    "faq": [
      [
        "Kde je nejlepší přezimovat na Turecké riviéře?",
        "Alanya má největší komunitu dlouhodobých hostů a nejživější zimní život; Side je klidnější; Antalya nabízí veškeré služby velkého města. Všechna tři místa mají mírné zimy."
      ],
      [
        "Jak teplo je v Antalyi v zimě?",
        "Od prosince do února bývá přes den obvykle kolem 15–17 °C, v noci kolem 6–8 °C. Mráz na pobřeží je vzácný."
      ],
      [
        "Existují v zimě hotelové nabídky pro dlouhodobé pobyty?",
        "Ano. Několik hotelů v Alanyi, Side a Antalyi nabízí v zimě zvýhodněné měsíční nebo dlouhodobé ceny. Na pobyty od čtyř týdnů se ptejte přímo v hotelu."
      ],
      [
        "Mohu si na letištní transfer vzít hodně zavazadel?",
        "Ano. Při rezervaci nám uveďte počet kufrů a dalších věcí a my přidělíme vozidlo s dostatkem místa. Cena je za vozidlo, bez poplatku za kufr."
      ]
    ]
  },
  "antalya-in-spring": {
    "slug": "antalya-na-jare",
    "title": "Antalya na jaře: co dělat od března do května",
    "heading": "Antalya na jaře: co dělat mezi březnem a květnem",
    "description": "Antalya na jaře: kvetoucí pomerančovníky, túry po Lýkijské stezce, rafting, velikonoční dovolená a první dny na pláži. Počasí po měsících a co čekat po příletu.",
    "excerpt": "Pomerančové květy v ulicích, sníh na vrcholcích a moře, které se týden od týdne otepluje. Proč je jaro sezonou aktivní dovolené v okolí Antalye.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Jaro přichází na Tureckou riviéru brzy. Už v březnu kvetou pomerančovníky, na pohoří Taurus ještě leží sníh a dny jsou dost teplé na posezení venku. Antalya na jaře nabízí nejlepší sezonu pro pěší turistiku, cyklistiku a objevování a v květnu začínají první dny na pláži."
      },
      {
        "type": "h2",
        "text": "Jarní počasí v Antalyi"
      },
      {
        "type": "table",
        "head": [
          "Měsíc",
          "Den / noc",
          "Moře",
          "Nejlepší na"
        ],
        "rows": [
          [
            "Březen",
            "asi 19 °C / 8 °C",
            "asi 17 °C",
            "Památky, turistiku, květy"
          ],
          [
            "Duben",
            "asi 22 °C / 11 °C",
            "asi 18 °C",
            "Turistiku, rafting, velikonoční dovolenou"
          ],
          [
            "Květen",
            "asi 26 °C / 15 °C",
            "asi 21 °C",
            "První dny na pláži, všechny aktivity"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Pomerančové květy a město na jaře"
      },
      {
        "type": "p",
        "text": "Na jaře Antalya voní pomerančovými květy. Město je oslavuje Karnevalem pomerančových květů, pouličním festivalem, který se na jaře koná v okolí Kaleiçi a v centru města. Je to také nejlepší doba prozkoumat pěšky staré město, Antalyjské muzeum a útesy v Konyaaltı a Laře, než přijdou letní vedra."
      },
      {
        "type": "h2",
        "text": "Aktivní dovolená: turistika, rafting a cyklistika"
      },
      {
        "type": "ul",
        "items": [
          "Lýkijská stezka: jaro je nejoblíbenější turistickou sezonou, s divokými květinami podél úseků u Kemeru, Olympu a Kaşe.",
          "Kaňon Köprülü: raftingová sezona obvykle začíná v dubnu, s živou vodou z tajícího sněhu.",
          "Lanovka na Tahtalı: sníh na vrcholu a pod ním rozkvetlé louky, často v jediném pohledu.",
          "Cyklistika: klidné silnice a mírné teploty kolem Beleku, Side a v podhůří pohoří Taurus.",
          "Golf: jaro je druhou hlavní sezonou na hřištích v Beleku."
        ]
      },
      {
        "type": "h2",
        "text": "Antické památky v zelené sezoně"
      },
      {
        "type": "p",
        "text": "Perge, Aspendos, Side, Phaselis a Termessos jsou nejkrásnější na jaře, kdy ruiny obklopuje zelená tráva a divoké květiny. Dobře se hodí i delší výlety: v Pamukkale a Kappadokii jsou příjemné teploty a lety horkovzdušným balonem nad Kappadokií se na jaře při stabilním počasí konají často."
      },
      {
        "type": "h2",
        "text": "Velikonoce a jarní prázdniny"
      },
      {
        "type": "p",
        "text": "Velikonoce a jarní školní prázdniny v Německu, Nizozemsku, Velké Británii a Skandinávii přivádějí první vlnu rodin. Od dubna otevírá víc sezonních hotelů, přibývá letů a v květnu je většina přímořských resortů v plném provozu. Na velikonoční termíny si hotel i transfer rezervujte včas."
      },
      {
        "type": "h2",
        "text": "Přílet na jaře"
      },
      {
        "type": "ul",
        "items": [
          "V březnu jsou některé resorty ještě zavřené; od dubna se nabídka rychle rozšiřuje.",
          "Terminál i silnice jsou klidné, takže uváděné doby jízdy jsou realistické.",
          "Turistické a golfové vybavení, jízdní kola a dětské sedačky uveďte při rezervaci.",
          "Cena je pevná za vozidlo a nemění se podle sezony."
        ]
      }
    ],
    "faq": [
      [
        "Je v Antalyi na jaře dost teplo na pláž?",
        "Od května ano: přes den bývá kolem 26 °C a moře má kolem 21 °C. V březnu a dubnu je dost teplo na sezení na slunci, ale moře je pro většinu plavců ještě studené."
      ],
      [
        "Kdy se v Antalyi koná Karneval pomerančových květů?",
        "Koná se na jaře, když kvetou městské pomerančovníky. Termíny se každý rok mění, proto si před plánováním cesty ověřte oficiální oznámení města."
      ],
      [
        "Je jaro vhodnou dobou pro Lýkijskou stezku?",
        "Ano. Jaro a podzim jsou dvě nejlepší turistické sezony; na jaře jsou stezky zelené a plné divokých květin a teploty jsou příjemné."
      ],
      [
        "Mají hotely v Antalyi v březnu otevřeno?",
        "Městské hotely a některé resorty mají otevřeno. Mnoho sezonních resortů otevírá během dubna a v květnu je většina pobřeží v plném provozu."
      ]
    ]
  }
};
