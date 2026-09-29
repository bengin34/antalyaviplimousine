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
  },
  "cappadocia-winter-trip": {
    "slug": "kappadokie-v-zime-z-antalye",
    "title": "Kappadokie v zimě z Antalye: sníh, balony a cesta tam",
    "heading": "Kappadokie v zimě: výlet z Antalye",
    "description": "Kappadokie v zimě z Antalye: sníh, počasí, lety balonem, jeskynní hotely, co vidět a jak v zimě probíhá 540 km dlouhá cesta autem přes Konyu.",
    "excerpt": "Pohádkové komíny pod sněhem a balony nad bílým údolím. Jak spojit zimní pobyt v Antalyi s Kappadokií a jaká je cesta v zimě.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Kappadokie v zimě patří k nejfotografovanějším krajinám Turecka: pohádkové komíny a údolí pod sněhem, jeskynní hotely s krbem a za jasných rán balony stoupající nad bílou krajinou. Z Antalye je to dlouhá, ale krásná cesta autem – a přirozený doplněk zimního pobytu na pobřeží."
      },
      {
        "type": "h2",
        "text": "Zimní počasí: úplně jiné klima než na pobřeží"
      },
      {
        "type": "p",
        "text": "Kappadokie leží na vysoké náhorní plošině, zhruba v 1 000 metrech nad mořem i výš, takže zima je tu opravdová. Přes den se teploty často drží kolem nuly, noci jsou hluboko pod nulou a od prosince do února je sníh běžný. Sbalte si pořádnou zimní bundu, rukavice, čepici a nepromokavé boty – oblečení, které v lednu stačí v Antalyi, tu nestačí."
      },
      {
        "type": "table",
        "head": [
          "",
          "Pobřeží Antalye",
          "Kappadokie"
        ],
        "rows": [
          [
            "Běžný zimní den",
            "asi 15 °C",
            "zhruba 0–5 °C"
          ],
          [
            "Zimní noci",
            "asi 6–8 °C",
            "často pod bodem mrazu"
          ],
          [
            "Sníh",
            "jen na horských vrcholech",
            "běžný od prosince do února"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Lety balonem v zimě"
      },
      {
        "type": "p",
        "text": "Balony létají celoročně, když to počasí dovolí, a let při východu slunce nad zasněženými údolími je obraz, kvůli kterému sem mnoho lidí jezdí. V zimě se ale lety častěji ruší kvůli větru, mlze nebo sněhu a rozhodují o nich úřady každé ráno. Naplánujte si v Kappadokii alespoň dvě noci, aby jeden zrušený let neznamenal, že o zážitek přijdete úplně."
      },
      {
        "type": "h2",
        "text": "Co vidět v Kappadokii v zimě"
      },
      {
        "type": "ul",
        "items": [
          "Skanzen Göreme: do skály vytesané kostely s freskami, v zimě klidnější než v kteroukoli jinou roční dobu.",
          "Podzemní města jako Derinkuyu a Kaymaklı: několik pater do hloubky a příjemná stálá teplota bez ohledu na počasí venku.",
          "Hrad Uçhisar a vyhlídky nad Göreme: nejlepší místa pro zasněžená panoramata.",
          "Krátké procházky Růžovým, Červeným a Údolím lásky za suchých a jasných dnů – po sněžení bývají cesty namrzlé.",
          "Jeskynní hotely: mnohé jsou vytápěné a mají krb a právě v zimě mají největší kouzlo."
        ]
      },
      {
        "type": "h2",
        "text": "Cesta z Antalye"
      },
      {
        "type": "p",
        "text": "Cesta měří asi 540 km a obvykle trvá 7 až 8 hodin – přes pohoří Taurus a dál po náhorní plošině přes Konyu. Konya s muzeem Mevlány je přirozenou zastávkou, kde si cestu rozdělit. V zimě může být na horském úseku sníh a led; silnice se udržují, ale vozidlo se zimní výbavou a řidič, který trasu zná, rozhodují o tom, zda to bude jen dlouhý den, nebo stresující."
      },
      {
        "type": "h2",
        "text": "Jak výlet naplánovat"
      },
      {
        "type": "ul",
        "items": [
          "Počítejte alespoň se dvěma nocemi, lépe se třemi, kvůli rezervě na zrušené lety a krátké zimní dny.",
          "Z Antalye vyjeďte ráno, abyste hory projeli za světla.",
          "Spojte výlet s pobytem na pobřeží: pár dní v Antalyi nebo Side, pak Kappadokie – nebo obráceně.",
          "Na Vánoce a Silvestra si jeskynní hotel i případný let balonem rezervujte s předstihem."
        ]
      },
      {
        "type": "h2",
        "text": "Transfer mezi Antalyí a Kappadokií"
      },
      {
        "type": "p",
        "text": "Zajišťujeme soukromé transfery z letiště Antalya a z hotelů na pobřeží do Kappadokie – jednosměrně nebo se zpáteční cestou v pozdějším termínu. Cena je pevná za vozidlo, můžete zastavit na fotky, jídlo i prohlídku Konyi a nečekáte na žádné další cestující. Při rezervaci uveďte hotel a termíny."
      }
    ],
    "faq": [
      [
        "Jak daleko je Kappadokie od Antalye?",
        "Po silnici asi 540 km. Cesta přes Konyu obvykle trvá 7 až 8 hodin, se zastávkami nebo za sněhu o něco déle."
      ],
      [
        "Vyplatí se jet do Kappadokie v zimě?",
        "Ano. Sníh na pohádkových komínech, klidné památky a útulné jeskynní hotely dělají ze zimy jedno z nejkrásnějších období. Vezměte si teplé oblečení: je tam mnohem chladněji než na pobřeží."
      ],
      [
        "Létají balony v Kappadokii i v zimě?",
        "Ano, kdykoli to počasí dovolí. V zimě se lety ruší častěji, proto si naplánujte alespoň dvě noci, abyste měli druhou šanci."
      ],
      [
        "Dá se z Antalye do Kappadokie jet soukromým transferem?",
        "Ano. Nabízíme soukromé transfery z letiště Antalya a hotelů na pobřeží do Kappadokie, jednosměrně nebo tam i zpět, za pevnou cenu za vozidlo."
      ]
    ]
  },
  "belek-winter-golf": {
    "slug": "zimni-golf-v-beleku",
    "title": "Zimní golf v Beleku: hra na Turecké riviéře od listopadu do března",
    "heading": "Zimní golf v Beleku",
    "description": "Proč je Belek cílem zimního golfu: počasí od listopadu do března, stav hřišť, nižší green fee, co si sbalit a jak se dostat do Beleku s golfovými bagy.",
    "excerpt": "Mírné dny, zelené fairwaye a volnější startovní časy. Co by golfisté měli vědět o hře v Beleku od listopadu do března, kdy jsou hřiště doma zavřená.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Když jsou hřiště v severní Evropě zamrzlá, podmáčená nebo zavřená, v Beleku se hraje dál. Skupina mistrovských hřišť 45 km východně od letiště Antalya je otevřená celou zimu a zimní golf v Beleku od listopadu do března se stal samostatnou sezonou pro golfisty, kteří nechtějí mezi říjnem a dubnem přestat hrát."
      },
      {
        "type": "h2",
        "text": "Jaké je počasí na hřišti"
      },
      {
        "type": "table",
        "head": [
          "Měsíc",
          "Běžný den",
          "Na hřišti"
        ],
        "rows": [
          [
            "Listopad",
            "asi 21 °C",
            "Výborné podmínky, stále podzimní vrchol sezony"
          ],
          [
            "Prosinec – leden",
            "asi 15–16 °C",
            "Mírně a často slunečno, občas deštivé dny"
          ],
          [
            "Únor",
            "asi 16 °C",
            "Dny se prodlužují, méně deštivých dnů"
          ],
          [
            "Březen",
            "asi 19 °C",
            "Začátek jarního vrcholu sezony"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Většinu zimních dnů se dá hrát v lehkém svetru. Déšť přichází spíš v krátkých přeháňkách než na celé týdny a hřiště jsou postavená tak, aby rychle odvodňovala. Rána bývají chladná a pozdě odpoledne se rychle stmívá, takže tee time bývá dřív než v létě."
      },
      {
        "type": "h2",
        "text": "Proč se zima vyplatí"
      },
      {
        "type": "ul",
        "items": [
          "Green fee a ceny hotelů jsou v prosinci, lednu a únoru obvykle nižší než na podzim a na jaře.",
          "Startovní listiny jsou méně plné, takže kola jsou rychlejší a oblíbené časy se snáz získávají.",
          "Několik golfových hotelů je otevřeno celou zimu, mnohé s krytými bazény a spa na odpoledne.",
          "Krátké lety z většiny Evropy dělají z prodlouženého víkendu stejně reálnou možnost jako týdenní pobyt."
        ]
      },
      {
        "type": "h2",
        "text": "Hřiště a hotely v zimě"
      },
      {
        "type": "p",
        "text": "Ne všechna hřiště a hotely v Beleku fungují v zimě podle stejného harmonogramu a údržba, jako je aerifikace nebo dosévání, se někdy plánuje na klidné měsíce. Při rezervaci se zeptejte, která hřiště jsou ve vašem termínu otevřená a zda není naplánovaná údržba. Golfové hotely obvykle zajišťují tee time i kyvadlovou dopravu na partnerská hřiště."
      },
      {
        "type": "h2",
        "text": "Co si sbalit na zimní golf"
      },
      {
        "type": "ul",
        "items": [
          "Vrstvy: funkční prádlo, svetr a větruodolnou vrchní vrstvu na chladná rána.",
          "Nepromokavou bundu a kalhoty na občasnou přeháňku.",
          "Zimní rukavice nebo palčáky mezi údery a k tomu běžné golfové rukavice.",
          "Ochranu před sluncem: za jasných dnů je zimní slunce stále silné."
        ]
      },
      {
        "type": "h2",
        "text": "Do Beleku s golfovými bagy"
      },
      {
        "type": "p",
        "text": "Z letiště Antalya do Beleku trvá cesta 35 až 40 minut a v zimě je terminál klidný, takže odpolední kolo v den příletu je často reálné. Cena je pevná za vozidlo, ne za bag: Mercedes Vito zpravidla pojme čtyři hráče se čtyřmi golfovými bagy a zavazadly, větší skupiny jedou Sprinterem. Při rezervaci uveďte počet bagů."
      }
    ],
    "faq": [
      [
        "Dá se v Beleku hrát golf i v zimě?",
        "Ano. Hřiště v Beleku jsou otevřená celou zimu, v prosinci a lednu bývá přes den kolem 15–16 °C a hrát se dá většinu dnů."
      ],
      [
        "Je golf v Beleku v zimě levnější?",
        "Green fee a ceny hotelů jsou v prosinci, lednu a únoru obvykle nižší než v podzimní a jarní hlavní sezoně. Přesné ceny závisí na hřišti a hotelu."
      ],
      [
        "Který měsíc je pro golf v Beleku nejlepší?",
        "Vrcholem golfové sezony jsou říjen–listopad a březen–duben. Zima je klidnější a levnější, s o něco chladnějšími dny."
      ],
      [
        "Platí se za golfové bagy při transferu příplatek?",
        "Ne. Cena je pevná za vozidlo. Pro více bagů přidělíme větší vozidlo a jeho cenu uvidíte při rezervaci."
      ]
    ]
  },
  "saklikent-ski-antalya": {
    "slug": "lyzovani-u-antalye-saklikent",
    "title": "Lyžování u Antalye: průvodce lyžařským střediskem Saklıkent",
    "heading": "Lyžování u Antalye: lyžařské středisko Saklıkent",
    "description": "Lyžování u Antalye v Saklıkentu: kde středisko leží, jak dlouho trvá cesta, kdy je sezona, co čekat na sjezdovkách a jak spojit lyže a moře v jednom dni.",
    "excerpt": "Ráno lyže, odpoledne procházka u moře. Praktický průvodce Saklıkentem, lyžařským střediskem Antalye, a cestou na něj z pobřeží.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Jen málo prázdninových oblastí nabízí lyžování i procházku u moře v jednom dni. Antalya ano: lyžařské středisko Saklıkent leží v pohoří Bakırlı, asi 50 km od města, a za pěkného zimního dne můžete být ráno na sjezdovce a na západ slunce zpět na nábřeží."
      },
      {
        "type": "h2",
        "text": "Kde Saklıkent leží"
      },
      {
        "type": "p",
        "text": "Lyžařské středisko se nachází ve výšce zhruba 1 900 metrů na svazích pohoří Bakırlı, západně od Antalye. Cesta z města trvá přibližně hodinu a půl a stoupá od pomerančových sadů přes borovicové lesy až ke sněhu. Za jasných dnů je z vrcholu vidět až na pobřeží a moře."
      },
      {
        "type": "h2",
        "text": "Kdy je sezona"
      },
      {
        "type": "p",
        "text": "Lyžařská sezona závisí zcela na sněhu a obvykle trvá od ledna do března. Některé zimy začíná dřív nebo končí dřív, proto si před plánováním výletu ověřte aktuální stav sněhu a vleků."
      },
      {
        "type": "h2",
        "text": "Co čekat na sjezdovkách"
      },
      {
        "type": "ul",
        "items": [
          "Malé, pohodové středisko – ideální pro začátečníky, rodiny a jeden lyžařský den během dovolené u moře, ne na celý lyžařský týden.",
          "Lyžařské a snowboardové vybavení si obvykle můžete půjčit přímo ve středisku; předem si ověřte otevírací dobu.",
          "Sáňkování a hraní ve sněhu je oblíbené u rodin, zejména o víkendech.",
          "O víkendech je rušno kvůli místním návštěvníkům, ve všední dny je mnohem klidněji."
        ]
      },
      {
        "type": "h2",
        "text": "Lyže a moře v jednom dni"
      },
      {
        "type": "ul",
        "items": [
          "Vyjeďte z pobřeží brzy ráno, abyste dorazili k otevření vleků.",
          "Lyžujte nebo si hrajte ve sněhu do časného odpoledne.",
          "Sjeďte dolů na pozdní oběd v Kaleiçi nebo na procházku po pláži Konyaaltı.",
          "Vezměte si oblečení na převlečení: teplotní rozdíl mezi sjezdovkou a pobřežím může být 15 stupňů i víc."
        ]
      },
      {
        "type": "h2",
        "text": "Cesta tam: horská silnice v zimě"
      },
      {
        "type": "p",
        "text": "Do střediska nejezdí pravidelná veřejná doprava a na posledním úseku horské silnice může být sníh a led. Mohou být vyžadovány zimní pneumatiky nebo řetězy. Soukromý transfer vás odveze z hotelu v Antalyi, Kemeru, Beleku nebo Side na sjezdovky a zpět a čas strávený na horách si určujete sami. Nejde o jednu z našich standardních tras, pošlete nám proto hotel, datum a počet osob a my vám připravíme pevnou cenu za vozidlo."
      },
      {
        "type": "h2",
        "text": "Další možnosti lyžování z Antalye"
      },
      {
        "type": "p",
        "text": "Na delší lyžařský výlet je tu Davraz u Isparty – větší středisko s více sjezdovkami, zhruba dvě a půl až tři hodiny jízdy od Antalye. Saklıkent zůstává nejsnazší volbou pro jeden sněhový den během pobytu na pobřeží."
      }
    ],
    "faq": [
      [
        "Dá se u Antalye lyžovat?",
        "Ano. Lyžařské středisko Saklıkent leží asi 50 km od Antalye, zhruba hodinu a půl jízdy, v pohoří Bakırlı."
      ],
      [
        "Kdy je lyžařská sezona v Saklıkentu?",
        "Záleží na sněhu. Sezona obvykle trvá od ledna do března; před cestou si ověřte aktuální podmínky."
      ],
      [
        "Dá se v Antalyi v jeden den lyžovat i koupat?",
        "Ráno můžete lyžovat a odpoledne být u moře. Koupání v zimě je pro odvážné: moře má kolem 17 °C."
      ],
      [
        "Jak se dostanu do Saklıkentu z hotelu?",
        "Pravidelná veřejná doprava tam nejezdí. Připravíme vám nabídku soukromého transferu z hotelu do lyžařského střediska a zpět za pevnou cenu za vozidlo."
      ]
    ]
  },
  "pamukkale-trip-from-antalya": {
    "slug": "pamukkale-z-antalye",
    "title": "Pamukkale z Antalye: jednodenní výlet, nebo s přespáním, a kdy jet",
    "heading": "Pamukkale z Antalye: jak naplánovat výlet",
    "description": "Výlet z Antalye do Pamukkale: vzdálenost a doba jízdy, jednodenní výlet, nebo s přespáním, travertiny, Hierapolis, Antický bazén a nejlepší roční období.",
    "excerpt": "Bílé travertinové terasy, římské město na kopci a bazén mezi antickými sloupy. Jak navštívit Pamukkale z Antalye a nestrávit celý den v autobuse.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Výlet do Pamukkale z Antalye patří k nejslavnějším zážitkům v Turecku: bílé travertinové terasy plné teplé vody bohaté na minerály a nad nimi ruiny římského města Hierapolis. Z Antalye je to po silnici asi 245 km, zhruba tři až tři a půl hodiny jízdy jedním směrem – dost blízko na jednodenní výlet, ale dost daleko na to, aby přespání udělalo návštěvu mnohem pohodovější."
      },
      {
        "type": "h2",
        "text": "Co vidět v Pamukkale"
      },
      {
        "type": "ul",
        "items": [
          "Travertiny: projděte se bosí po terasách mělkou teplou vodou – v botách se na bílý povrch nesmí.",
          "Hierapolis: velké římské město s divadlem, monumentální ulicí a jedním z největších antických pohřebišť v Anatolii.",
          "Antický bazén (Kleopatřin bazén): koupání v teplé termální vodě mezi spadlými antickými sloupy (samostatná vstupenka).",
          "Archeologické muzeum Hierapolis: nálezy z lokality v budově bývalých římských lázní.",
          "Laodikeia: kousek odsud další velké antické město s mnohem menším počtem návštěvníků."
        ]
      },
      {
        "type": "h2",
        "text": "Jednodenní výlet, nebo s přespáním?"
      },
      {
        "type": "table",
        "head": [
          "",
          "Jednodenní výlet",
          "S přespáním"
        ],
        "rows": [
          [
            "Čas na cestě",
            "6–7 hodin v jednom dni",
            "Rozloženo do dvou dnů"
          ],
          [
            "Čas na místě",
            "3–4 hodiny, obvykle v poledne",
            "Pozdní odpoledne a brzké ráno"
          ],
          [
            "Davy",
            "Příjezd spolu se zájezdovými autobusy",
            "Západ slunce a ráno s mnohem menším počtem lidí"
          ],
          [
            "Pro koho",
            "Pro cestovatele s málem času",
            "Pro rodiny, fotografy a všechny, kdo se chtějí koupat"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Většina skupinových zájezdů přijíždí kolem poledne, kdy je na terasách nejrušněji a v létě bílý povrch oslňuje a pálí. Přespání v Pamukkale nebo v termální vesnici Karahayıt vám umožní vidět travertiny při západu slunce a znovu v ranním klidu."
      },
      {
        "type": "h2",
        "text": "Nejlepší roční období pro Pamukkale"
      },
      {
        "type": "p",
        "text": "Jaro a podzim jsou nejpříjemnější: mírné teploty na procházku po Hierapolis a příjemná voda na terasách. V zimě je chladno a občas mrzne, ale teplá voda v chladném vzduchu paří a lokalita je nejklidnější. V červenci a srpnu může být polední vedro a odlesky na bílých terasách velmi intenzivní – přijeďte brzy ráno nebo pozdě odpoledne."
      },
      {
        "type": "h2",
        "text": "Po cestě: jezero Salda a pohoří Taurus"
      },
      {
        "type": "p",
        "text": "Silnice stoupá od pobřeží přes pohoří Taurus a vede krajem jezer. Jezero Salda s bílými břehy a tyrkysovou vodou je krátká odbočka a oblíbená zastávka na fotky. Se soukromým vozem sami rozhodujete, kde a jak dlouho zastavíte – to zájezdový autobus nenabídne."
      },
      {
        "type": "h2",
        "text": "Soukromý transfer do Pamukkale"
      },
      {
        "type": "p",
        "text": "Zajišťujeme soukromé transfery do Pamukkale z letiště Antalya a z hotelů na pobřeží, jedním směrem nebo se zpáteční cestou v jiný den. Cena je pevná za vůz, takže pro rodinu nebo malou skupinu je často srovnatelná s několika vstupenkami na autobusový zájezd – bez svážení z hotelů, pevného programu a zastávek v obchodech."
      }
    ],
    "faq": [
      [
        "Jak daleko je Pamukkale od Antalye?",
        "Po silnici asi 245 km. Cesta obvykle trvá tři až tři a půl hodiny jedním směrem."
      ],
      [
        "Dá se Pamukkale navštívit jako jednodenní výlet z Antalye?",
        "Ano, ale znamená to 6–7 hodin na cestě v jednom dni. Přespání v Pamukkale nebo Karahayıtu udělá návštěvu pohodovější a terasy uvidíte bez davů."
      ],
      [
        "Dá se v Pamukkale koupat?",
        "Po mělkých jezírkách na travertinech se dá chodit bosky. Plavat můžete v Antickém bazénu s teplou termální vodou, na který je potřeba samostatná vstupenka."
      ],
      [
        "Kdy je nejlepší jet do Pamukkale?",
        "Nejpříjemnější je jaro a podzim. Zima je klidná a atmosférická, v létě je nejlepší přijet brzy ráno nebo pozdě odpoledne."
      ]
    ]
  },
  "demre-myra-st-nicholas": {
    "slug": "demre-myra-kostel-sv-mikulase",
    "title": "Demre a Myra: kostel svatého Mikuláše – výlet z Antalye",
    "heading": "Demre, Myra a kostel svatého Mikuláše",
    "description": "Výlet z Antalye do Demre, antické Myry: kostel svatého Mikuláše, lýkijské skalní hrobky, Andriake a Kekova, doba jízdy a tipy na zimní či vánoční návštěvu.",
    "excerpt": "Rodné město skutečného Santa Clause leží dvě a půl hodiny od Antalye. Co vidět v Demre a Myře a jak strávit den na pobřeží.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Dávno předtím, než se z něj stal Santa Claus, byl svatý Mikuláš biskupem v Myře, lýkijském městě na pobřeží západně od Antalye. Dnes se město jmenuje Demre a kostel svatého Mikuláše, kde působil, lýkijské skalní hrobky a antický přístav z něj dělají jeden z nejzajímavějších jednodenních výletů z Antalye – zvlášť v prosinci."
      },
      {
        "type": "h2",
        "text": "Kdo byl svatý Mikuláš z Myry?"
      },
      {
        "type": "p",
        "text": "Mikuláš žil ve 4. století a proslavil se tajnou štědrostí, zejména vůči dětem a chudým. Jeho svátek, 6. prosince, se dodnes slaví po celé Evropě a legendy o něm se v průběhu staletí proměnily v postavu Santa Clause. Myra, kde byl biskupem, se stala významným poutním místem."
      },
      {
        "type": "h2",
        "text": "Co vidět v Demre"
      },
      {
        "type": "ul",
        "items": [
          "Kostel svatého Mikuláše: byzantský kostel s freskami, mozaikovými podlahami a sarkofágem, který se tradičně spojuje se světcem.",
          "Skalní hrobky v Myře: lýkijské hrobky ve tvaru domů vytesané do útesu nad velkým římským divadlem.",
          "Andriake: antický přístav Myry s obnovenou sýpkou, v níž sídlí Muzeum lýkijských civilizací.",
          "Kekova: výlety lodí z nedalekého Üçağızu míjejí částečně zatopené antické město a vesnici s hradem Kaleköy (v zimě jezdí méně lodí)."
        ]
      },
      {
        "type": "h2",
        "text": "Cesta: po pobřežní silnici na západ"
      },
      {
        "type": "p",
        "text": "Demre je asi dvě a půl hodiny od Antalye po jedné z nejkrásnějších pobřežních silnic v zemi, přes Kemer, hory kolem Olympu, Kumlucu a Finike. Silnice je dobrá po celý rok, ale vine se horami, takže počítejte s časem na zastávky a neplánujte cestu ve spěchu."
      },
      {
        "type": "h2",
        "text": "Den na pobřeží"
      },
      {
        "type": "ul",
        "items": [
          "Ráno: brzký odjezd z Antalye a zastávka s výhledem na pobřeží u Olympu.",
          "Dopoledne: kostel svatého Mikuláše dřív, než dorazí zájezdové skupiny.",
          "Poledne: skalní hrobky a divadlo v Myře, pak oběd v Demre nebo v Andriake.",
          "Odpoledne: v sezoně výlet lodí na Kekovu, nebo pokračování do Kaşe s přespáním.",
          "Večer: návrat do Antalye, nebo spojení výletu s několika dny v Kaşi."
        ]
      },
      {
        "type": "h2",
        "text": "Návštěva v zimě a o Vánocích"
      },
      {
        "type": "p",
        "text": "Prosinec je obzvlášť atmosférickou dobou k návštěvě: 6. prosince je svátek svatého Mikuláše a kolem Vánoc mnoho návštěvníků spojuje pobyt v Antalyi s výletem do světcova města. Zimní dny jsou mírné, ale krátké, proto vyrazte brzy. Památky jsou otevřené celý rok, výlety lodí na Kekovu závisí na počasí a sezoně."
      },
      {
        "type": "h2",
        "text": "Soukromý transfer do Demre"
      },
      {
        "type": "p",
        "text": "Zajišťujeme soukromé transfery z Antalye a letovisek na západním pobřeží do Kumlucy, Demre a Kaşe. Se soukromým vozem si sami volíte zastávky i tempo a cena je pevná za vůz, ne za osobu. Při rezervaci nám napište hotel, datum a zda chcete zpáteční cestu ve stejný den."
      }
    ],
    "faq": [
      [
        "Jak daleko je Demre od Antalye?",
        "Demre, antická Myra, je asi dvě a půl hodiny jízdy od Antalye po pobřežní silnici přes Kemer, Kumlucu a Finike."
      ],
      [
        "Je kostel svatého Mikuláše otevřený celý rok?",
        "Ano. Kostel svatého Mikuláše i antická lokalita Myra jsou pro návštěvníky otevřené po celý rok."
      ],
      [
        "Kdy je svátek svatého Mikuláše?",
        "Svátek svatého Mikuláše připadá na 6. prosince. Prosinec, včetně vánočního období, je oblíbenou dobou k návštěvě Demre."
      ],
      [
        "Dá se Demre a Kekova stihnout za jeden den?",
        "Ano, v sezoně lodních výletů je to možné s brzkým odjezdem. V zimě jezdí méně lodí, proto si počasí a jízdní řády ověřte na místě."
      ]
    ]
  },
  "lycian-way-spring-hiking": {
    "slug": "lykijska-stezka-u-antalye",
    "title": "Lýkijská stezka u Antalye: jarní průvodce nejlepšími úseky",
    "heading": "Lýkijská stezka: pěší turistika z Antalye",
    "description": "Lýkijská stezka u Antalye: nejlepší roční období, úseky kolem Kemeru, Olympu, Adrasanu a Kaşe, co si zabalit a jak se dostat na začátek trasy.",
    "excerpt": "Antické ruiny, borové lesy a výhledy na moře na jedné z velkých dálkových tras světa. Které úseky projít z Antalye a kdy jet.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Lýkijská stezka je značená dálková trasa dlouhá více než 500 km mezi Fethiye a Antalyí. Vede po starých cestách, soumarských stezkách a římských silnicích podél pobřeží a horami antické Lýkie. Abyste si ji užili, nepotřebujete týdny: mnoho jejích nejkrásnějších úseků leží kousek od Antalye a skvěle se hodí na jednodenní túry nebo krátkou turistickou dovolenou."
      },
      {
        "type": "h2",
        "text": "Kdy vyrazit: jaro a podzim"
      },
      {
        "type": "table",
        "head": [
          "Období",
          "Podmínky",
          "Hodnocení"
        ],
        "rows": [
          [
            "Březen – květen",
            "Mírné dny, zelené kopce, divoké květiny, prameny plné vody",
            "Nejlepší období"
          ],
          [
            "Červen – srpen",
            "Velké horko, na mnoha úsecích málo stínu, vyschlé prameny",
            "Jen brzy ráno nebo krátké túry"
          ],
          [
            "Září – listopad",
            "Teplé moře, stabilní počasí, od konce října chladněji",
            "Druhé nejlepší období"
          ],
          [
            "Prosinec – únor",
            "Na pobřeží mírno, deštivá období, sníh ve vysokých průsmycích",
            "Možné na nízkých pobřežních úsecích"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Úseky u Antalye"
      },
      {
        "type": "ul",
        "items": [
          "Göynük – okolí Kemeru: lesní stezky a výhledy do kaňonu kousek od letovisek u Kemeru.",
          "Çıralı a Olympos: pobřežní úsek mezi ruinami Olympu a věčnými plameny Chiméry.",
          "Adrasan – Olympos: jeden z nejdramatičtějších úseků s útesy, zátokami a dalekými výhledy na moře.",
          "Okolí Kaşe: pobřežní stezky s lýkijskými hrobkami, malými zátokami a řeckým ostrovem Meis nedaleko od břehu.",
          "Phaselis: kratší procházky kolem antického města a jeho tří přístavů, ideální na první ochutnávku."
        ]
      },
      {
        "type": "h2",
        "text": "Plánování túry"
      },
      {
        "type": "p",
        "text": "Stezka je značená červeno-bíle, ale některé úseky jsou nerovné, kamenité a strmé a značení místy chybí. Používejte dobrou mapu nebo GPS stopu, pokud možno choďte ve dvou a řekněte někomu svou trasu. Na mnoha úsecích nejsou mezi vesnicemi obchody ani voda, proto vyrážejte brzy a noste víc vody, než si myslíte, že budete potřebovat."
      },
      {
        "type": "h2",
        "text": "Co si zabalit"
      },
      {
        "type": "ul",
        "items": [
          "Turistické boty nebo pevné trailové boty – vápenec je místy ostrý a sypký.",
          "Alespoň dva litry vody na osobu a něco k jídlu.",
          "Klobouk, opalovací krém a lehkou vrstvu s dlouhým rukávem, i na jaře.",
          "Větrovku nebo nepromokavou bundu na horské úseky a proměnlivé jarní počasí.",
          "Malou lékárničku a nabitý telefon s offline mapou."
        ]
      },
      {
        "type": "h2",
        "text": "Cesta na stezku a zpět"
      },
      {
        "type": "p",
        "text": "Většina úseků začíná a končí ve vesnicích, kam se veřejnou dopravou dostanete jen těžko, a při túře jedním směrem skončíte jinde, než jste začali. Soukromý transfer vás doveze z letiště Antalya nebo z hotelu na začátek úseku a na konci vás může vyzvednout. Cena je pevná za vůz, takže se to vyplatí skupinám turistů; napište nám místo startu a cíle, datum a počet osob a cenu vám sdělíme předem."
      }
    ],
    "faq": [
      [
        "Jak dlouhá je Lýkijská stezka?",
        "Značená trasa měří více než 500 km a vede mezi Fethiye a Antalyí. Většina návštěvníků prochází vybrané úseky, ne celou trasu."
      ],
      [
        "Kdy je nejlepší jít po Lýkijské stezce?",
        "Nejlepší je jaro, od března do května, a po něm podzim, od září do listopadu. Léto je velmi horké a mnoho pramenů vysychá."
      ],
      [
        "Které úseky Lýkijské stezky jsou nejblíž Antalyi?",
        "Úseky kolem Göynüku a Kemeru, Çıralı a Olympu, Adrasanu a Phaselis jsou všechny zhruba jednu až dvě hodiny od Antalye. Úseky kolem Kaşe leží dál na západ."
      ],
      [
        "Dá se zajistit transfer na začátek úseku Lýkijské stezky?",
        "Ano. Pošlete nám místo startu a cíle a datum a my vám nabídneme soukromý transfer za pevnou cenu za vůz, včetně vyzvednutí na konci túry."
      ]
    ]
  },
  "koprulu-canyon-rafting": {
    "slug": "rafting-kanon-koprulu",
    "title": "Rafting v kaňonu Köprülü: praktický průvodce z Antalye a Side",
    "heading": "Rafting v kaňonu Köprülü",
    "description": "Rafting v kaňonu Köprülü u Antalye: kdy je sezona, jaká je řeka, pro koho se hodí, co si vzít s sebou a jak daleko je to ze Side, Beleku, Alanye a Antalye.",
    "excerpt": "Studená zelená voda, římský most a kaňon porostlý borovicemi. Co čekat od dne na raftu v kaňonu Köprülü a jak ho naplánovat z pobřeží.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Kaňon Köprülü je národní park v pohoří Taurus severně od Side a Manavgatu a rafting na řece, která jím protéká, je nejznámější vodní výlet v regionu. Jde spíš o pohodové dobrodružství než o extrém: většina peřejí je mírná, scenérie je úchvatná a začátečníci i rodiny s dětmi tu jezdí každý den sezony."
      },
      {
        "type": "h2",
        "text": "Jak rafting probíhá"
      },
      {
        "type": "p",
        "text": "Většina výletů vede úsekem řeky Köprüçay dlouhým zhruba tucet kilometrů a na vodě strávíte dvě až tři hodiny, se zastávkami na koupání, skoky ze skal nebo prosté plutí po proudu. Peřeje jsou převážně lehké až středně těžké, voda je čistá a zelená a po celý rok studená, protože řeku napájejí horské prameny. Průvodci vás poučí o bezpečnosti, přilby a záchranné vesty jsou k dispozici."
      },
      {
        "type": "h2",
        "text": "Kdy jet"
      },
      {
        "type": "table",
        "head": [
          "Období",
          "Řeka a počasí",
          "Vhodné pro"
        ],
        "rows": [
          [
            "Duben - květen",
            "Více vody z tajícího sněhu, živější peřeje, mírný vzduch",
            "Aktivní skupiny, méně lidí"
          ],
          [
            "Červen - srpen",
            "Horký vzduch, studená voda, nejrušnější měsíce",
            "Osvěžení v horkém dni"
          ],
          [
            "Září - říjen",
            "Klidnější voda, teplé dny, méně lidí",
            "Rodiny a začátečníky"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Sezona obvykle trvá zhruba od dubna do října, podle řeky a provozovatelů. Mimo toto období se výlety konají jen výjimečně, nebo vůbec."
      },
      {
        "type": "h2",
        "text": "Pro koho se hodí"
      },
      {
        "type": "ul",
        "items": [
          "Začátečníci: zkušenosti nejsou potřeba, raft řídí průvodce.",
          "Rodiny: provozovatelé stanovují minimální věk dětí, proto si ho ověřte při rezervaci.",
          "Party přátel a kolegů: raft obvykle sdílí šest až osm lidí.",
          "Není ideální pro neplavce, kteří mají z vody strach, ani v těhotenství."
        ]
      },
      {
        "type": "h2",
        "text": "Co si vzít s sebou"
      },
      {
        "type": "ul",
        "items": [
          "Plavky pod oblečením a ručník.",
          "Boty, které mohou namoknout a drží na noze - ne žabky.",
          "Opalovací krém a náhradní suché oblečení na cestu zpět.",
          "Vodotěsný vak nebo pouzdro na telefon; cennosti nechte v hotelu."
        ]
      },
      {
        "type": "h2",
        "text": "Víc než rafting: národní park"
      },
      {
        "type": "p",
        "text": "Kaňon překlenuje most Oluk, jednoobloukový římský most, podle kterého má oblast jméno - köprü znamená turecky „most“. Výš v horách leží mezi skalními útvary a vesnicemi ruiny antického města Selge. S vlastním vozem můžete rafting spojit se zastávkou u mostu a výjezdem nahoru k Selge."
      },
      {
        "type": "h2",
        "text": "Jak se tam dostat z pobřeží"
      },
      {
        "type": "p",
        "text": "Mnoho raftingových společností prodává výlety se společným svozem z hotelů, což může znamenat dlouhé dopoledne sbírání dalších hostů. Soukromý vůz ze Side, Manavgatu, Beleku, Alanye nebo Antalye vyjede, kdy chcete vy, a cestou může zastavit u mostu nebo v horách. Kaňon je zhruba hodinu jízdy ze Side a Manavgatu a dál z Antalye a Alanye; pošlete nám hotel a datum a nabídneme vám pevnou cenu za vůz."
      }
    ],
    "faq": [
      [
        "Je rafting v kaňonu Köprülü vhodný pro začátečníky?",
        "Ano. Peřeje jsou převážně lehké až středně těžké, zkušenosti nejsou potřeba a každý raft po bezpečnostní instruktáži řídí průvodce."
      ],
      [
        "Kdy je raftingová sezona v kaňonu Köprülü?",
        "Obvykle zhruba od dubna do října. Na jaře je voda díky tání sněhu živější, v září a říjnu je klidnější a méně lidí."
      ],
      [
        "Jak studená je voda?",
        "Studená po celý rok, protože řeku napájejí horské prameny. V horkém letním dni je to součást kouzla."
      ],
      [
        "Jak daleko je kaňon Köprülü od Side?",
        "Zhruba hodinu jízdy ze Side a Manavgatu a déle z Antalye, Beleku nebo Alanye, podle vašeho hotelu."
      ]
    ]
  },
  "kas-kalkan-autumn": {
    "slug": "kas-a-kalkan-na-podzim",
    "title": "Kaş a Kalkan na podzim: potápění, pláže a klidné zátoky",
    "heading": "Kaş a Kalkan na podzim",
    "description": "Proč jsou Kaş a Kalkan nejhezčí na podzim: teplé moře, potápění, pláže Kaputaş a Patara, Kekova na kajaku a lodí a jak se tam dostat z letiště Antalya.",
    "excerpt": "Nejteplejší moře roku, prázdné pláže a dvě malá přístavní městečka pod horami. Proč daleký západ pobřeží Antalye v říjnu září.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Kaş a Kalkan leží na divokém západním konci pobřeží Antalye, kde hory spadají přímo do moře. Velké resorty tu nenajdete - zato malé přístavy, bílé uličky a jednu z nejčistších vod ve Středomoří. Na podzim, když letní návštěvníci odjedou a moře je stále teplé, jsou Kaş a Kalkan v nejlepší formě."
      },
      {
        "type": "h2",
        "text": "Proč je tady sezona na podzim"
      },
      {
        "type": "ul",
        "items": [
          "Moře zůstává teplé až do října, často teplejší než v červnu.",
          "Viditelnost pod vodou je vynikající - dobrá zpráva pro potápěče i šnorchlaře.",
          "Po letních vedrech jsou procházky a túry zase příjemné.",
          "Restaurace a výlety lodí stále fungují, ale bez letních davů."
        ]
      },
      {
        "type": "h2",
        "text": "Kaş: potápění, kajaky a přístav"
      },
      {
        "type": "p",
        "text": "Kaş patří k nejznámějším potápěčským centrům Turecka, s lokalitami pro začátečníky i zkušené potápěče včetně vraků, stěn a podvodních jeskyní. Vrcholem je jízda na mořském kajaku nad potopenými ruinami Kekovy a přístav, antické divadlo s výhledem na moře a lýkijské hrobky přímo ve městě dělají večery pohodovými. Za jasného dne je kousek od břehu vidět řecký ostrov Meis."
      },
      {
        "type": "h2",
        "text": "Kalkan: terasy a klidné večery"
      },
      {
        "type": "p",
        "text": "Kalkan, asi půl hodiny západně od Kaşe, je menší a klidnější, postavený na svahu kolem malého přístavu. Je známý vilami s terasami s výhledem na moře a restauracemi na střechách. Hodí se pro páry a rodiny, které chtějí klidnou základnu s dobrým jídlem spíš než noční život."
      },
      {
        "type": "h2",
        "text": "Pláže mezi městy i za nimi"
      },
      {
        "type": "ul",
        "items": [
          "Kaputaş: malá tyrkysová zátoka na konci soutěsky mezi Kaşem a Kalkanem.",
          "Patara: jedna z nejdelších písečných pláží v Turecku, vedle ruin antické Patary a chráněného území.",
          "Poloostrov Kaş a městské koupací plošiny: skalnaté břehy a žebříky přímo do hluboké, čisté vody.",
          "Kekova a Üçağız: výlety lodí do chráněných zátok a do vesnice s hradem Kaleköy."
        ]
      },
      {
        "type": "h2",
        "text": "Co se mění v listopadu"
      },
      {
        "type": "p",
        "text": "Od listopadu sezona utichá: některé hotely, restaurace a výlety lodí končí, přicházejí první deště a večery se ochlazují. Kaş žije celý rok, protože tu mnoho lidí bydlí natrvalo, zatímco Kalkan se velmi ztiší. Pokud cestujete na konci sezony, ověřte si otevírací termíny."
      },
      {
        "type": "h2",
        "text": "Jak se dostat z letiště Antalya"
      },
      {
        "type": "p",
        "text": "Kaş je asi 185 km od letiště Antalya, zhruba dvě a půl až tři hodiny po pobřežní silnici přes Kemer, Kumlucu a Demre, a Kalkan je asi o půl hodiny dál. Někteří cestovatelé podle letů přilétají místo toho do Dalamanu. Soukromé transfery zajišťujeme z obou letišť za pevnou cenu za vůz, se zastávkami na fotky na jedné z nejmalebnějších silnic v zemi."
      }
    ],
    "faq": [
      [
        "Je moře v Kaşi v říjnu teplé?",
        "Ano. Moře obvykle zůstává teplé po většinu října, často teplejší než na začátku léta, a viditelnost pro potápění a šnorchlování je vynikající."
      ],
      [
        "Jak daleko je Kaş od letiště Antalya?",
        "Asi 185 km, zhruba dvě a půl až tři hodiny jízdy. Kalkan je asi o půl hodiny dál na západ."
      ],
      [
        "Kaş, nebo Kalkan: co je lepší?",
        "Kaş je živější, s potápěním, kajaky a městským životem po celý rok. Kalkan je menší a klidnější, s vilami a restauracemi s výhledem na moře."
      ],
      [
        "Jsou Kaş a Kalkan otevřené v listopadu?",
        "Kaş žije celý rok. V Kalkanu a v některých hotelech a lodních firmách končí sezona koncem října nebo v listopadu, takže si ověřte otevírací termíny."
      ]
    ]
  },
  "medical-travel-antalya-winter": {
    "slug": "zubni-osetreni-antalya-v-zime",
    "title": "Zubní ošetření a zdravotní turistika v Antalyi v zimě: co vědět předem",
    "heading": "Zubní ošetření a zdravotní cesty do Antalye v zimě",
    "description": "Zubní ošetření, transplantace vlasů nebo estetický zákrok v Antalyi v zimě: proč mnoho lidí volí mimosezonu, jak prověřit kliniku, dny rekonvalescence a transfer.",
    "excerpt": "Chladnější počasí, klidnější hotely a snazší termíny. Co si prověřit a naplánovat před rezervací, pokud jedete do Antalye za léčbou v zimě.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Antalya se vedle Istanbulu stala jedním z tureckých center zdravotní a zubní turistiky. Stále více lidí plánuje zubní ošetření v Antalyi, transplantaci vlasů nebo estetické zákroky na zimní měsíce, kdy je na pobřeží klid a počasí je mírné. Tento průvodce se věnuje praktické stránce takové cesty - nejde o lékařskou radu a každé klinické rozhodnutí patří kvalifikovanému lékaři."
      },
      {
        "type": "h2",
        "text": "Proč mnoho cestovatelů volí zimu"
      },
      {
        "type": "ul",
        "items": [
          "Mírné, chladnější počasí: mnoha pacientům je rekonvalescence příjemnější bez letního horka a ostrého slunce.",
          "Hotely a apartmány jsou klidnější a často levnější než v létě.",
          "Mimo hlavní prázdninové měsíce může být snazší sehnat termín.",
          "Cestu lze spojit s městem, muzei a nenáročnými procházkami místo dnů na pláži."
        ]
      },
      {
        "type": "h2",
        "text": "Výběr a prověření kliniky"
      },
      {
        "type": "p",
        "text": "Nejdůležitějším rozhodnutím je výběr zařízení, ne cena. Ověřte si, že klinika nebo nemocnice má licenci tureckého ministerstva zdravotnictví, zjistěte, kdo bude ošetřujícím lékařem a jakou má kvalifikaci, a požádejte o písemný plán, který uvádí, co je zahrnuto, co ne a jak se řeší komplikace a následná péče. Buďte opatrní u nabídek, které slibují konečný výsledek nebo pevnou cenu ještě před jakýmkoli vyšetřením."
      },
      {
        "type": "h2",
        "text": "Plánování dnů"
      },
      {
        "type": "table",
        "head": [
          "Typ léčby",
          "Na co se obvykle myslí při plánování",
          "Na co se zeptat kliniky"
        ],
        "rows": [
          [
            "Zubní ošetření",
            "Často více než jedna návštěva, někdy s odstupem týdnů nebo měsíců",
            "Kolik cest a kolik dní každá?"
          ],
          [
            "Transplantace vlasů",
            "Krátký pobyt s pokyny k péči na první dny",
            "Kdy můžete letět, umýt si vlasy a nosit čepici?"
          ],
          [
            "Plastická chirurgie",
            "Delší pobyt a dny rekonvalescence před odletem domů",
            "Po kolika nocích je let povolen?"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Počítejte s dny odpočinku, neplánujte zákrok na den příletu a řiďte se radou lékaře, kdy je bezpečné letět. U chirurgických zákroků se často doporučuje cestovat s doprovodem."
      },
      {
        "type": "h2",
        "text": "Pojištění, dokumenty a následná péče"
      },
      {
        "type": "ul",
        "items": [
          "Ověřte si, zda vaše cestovní pojištění kryje plánovanou léčbu v zahraničí - mnoho pojistek ji nekryje.",
          "Uschovejte si kopie všech lékařských zpráv, receptů a plánu léčby.",
          "Zeptejte se, jak funguje následná péče po návratu domů a zda se do ní může zapojit váš lékař doma.",
          "Zdravotní údaje sdílejte jen se zařízením, a to kanálem, který určí."
        ]
      },
      {
        "type": "h2",
        "text": "Z letiště do hotelu nebo na kliniku"
      },
      {
        "type": "p",
        "text": "Po letu a před zákrokem či po něm nechcete stát ve frontě na taxi ani jet sdíleným shuttlem, který staví u tuctu hotelů. Soukromý transfer vás odveze přímo z letiště Antalya do hotelu nebo na kliniku - řidič čeká na váš let a pomůže se zavazadly. Zpáteční jízdy lze načasovat podle termínů u lékaře a letu domů. Cena je pevná za vůz, takže doprovod jede bez příplatku."
      }
    ],
    "faq": [
      [
        "Proč jet za léčbou do Antalye v zimě?",
        "Mnoho cestovatelů dává přednost mírnějšímu počasí pro rekonvalescenci, klidnějším hotelům a snazším termínům mimo letní prázdninovou sezonu."
      ],
      [
        "Jak prověřit kliniku v Antalyi?",
        "Ověřte si, že má licenci tureckého ministerstva zdravotnictví, zjistěte, kdo je ošetřující lékař, a požádejte o písemný plán, který pokrývá, co je a není zahrnuto, komplikace a následnou péči."
      ],
      [
        "Jak dlouho zůstat po zákroku?",
        "To zcela závisí na typu léčby a radě lékaře. Zeptejte se kliniky, kolik nocí potřebujete před odletem domů, a naplánujte si dny odpočinku."
      ],
      [
        "Můžete mě odvézt z letiště na kliniku?",
        "Ano. Zajišťujeme soukromé transfery z letiště Antalya do hotelů a na kliniky a zpět za pevnou cenu za vůz."
      ]
    ]
  },
  "side-ancient-city-guide": {
    "slug": "side-anticke-mesto-pruvodce",
    "title": "Antické město Side: průvodce Apollónovým chrámem, divadlem a starým městem",
    "heading": "Side: průvodce antickým městem",
    "description": "Antické město Side: Apollónův chrám, velké divadlo, muzeum, hradby a staré město, kdy jet a jednodenní výlety do Aspendu a k vodopádu Manavgat.",
    "excerpt": "Římské divadlo, sloupy chrámu na břehu moře a přístavní městečko uvnitř antických hradeb. Jak zažít Side v nejlepším světle - mimo sezonu.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Antické město Side je jedním z mála míst na Turecké riviéře, kde moderní městečko žije uvnitř starověkého. Staré město zaplňuje malý poloostrov obklopený římskými a helénistickými ruinami: do restaurace jdete kolem sloupů a západ slunce rámuje chrám. Nejlepší je Side mimo léto, kdy je dost klidu na to, abyste historii opravdu vnímali."
      },
      {
        "type": "h2",
        "text": "Hlavní památky"
      },
      {
        "type": "ul",
        "items": [
          "Apollónův chrám: sloupy stojí na špičce poloostrova hned u moře - klasické místo pro západ slunce.",
          "Velké divadlo: jedno z největších antických divadel v regionu, zasazené do svahu u vstupu do starého města.",
          "Muzeum Side: sídlí v obnovených římských lázních a vystavuje sochy a reliéfy nalezené ve městě.",
          "Kolonáda a agora: antická hlavní osa vedoucí od městské brány k přístavu.",
          "Hradby a monumentální brána: vstupní cesta, kterou návštěvníci přicházejí už dva tisíce let."
        ]
      },
      {
        "type": "h2",
        "text": "Staré město dnes"
      },
      {
        "type": "p",
        "text": "Uvnitř hradeb vedou k přístavu uličky plné restaurací, kaváren a malých obchodů a z přístavu vyplouvají lodě na výlety podél pobřeží. Do většiny starého města auta nesmějí, takže se příjemně prochází pěšky. Na východ i na západ od poloostrova se táhnou široké písečné pláže."
      },
      {
        "type": "h2",
        "text": "Kdy jet"
      },
      {
        "type": "p",
        "text": "Ideální je jaro a podzim: dost teplo na pláž a dost chladno na procházku ruinami i v poledne. V zimě mnoho sezonních hotelů zavírá, ale staré město, ruiny a muzeum zůstávají otevřené a za slunečného dne je u chrámu a v přístavu téměř prázdno. V červenci a srpnu navštivte ruiny brzy ráno nebo při západu slunce."
      },
      {
        "type": "h2",
        "text": "Jednodenní výlety ze Side"
      },
      {
        "type": "table",
        "head": [
          "Cíl",
          "Proč jet",
          "Přibližná doba ze Side"
        ],
        "rows": [
          [
            "Aspendos",
            "Jedno z nejzachovalejších římských divadel na světě",
            "asi 40 minut"
          ],
          [
            "Vodopád Manavgat",
            "Široký, nízký vodopád v zeleném parku",
            "asi 15 minut"
          ],
          [
            "Perge",
            "Velké antické město se stadionem a kolonádami",
            "asi 1 hodina"
          ],
          [
            "Kaňon Köprülü",
            "Rafting a římský most v národním parku",
            "asi 1 hodina"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Jak se dostat do Side z letiště Antalya"
      },
      {
        "type": "p",
        "text": "Side je asi 65 km od letiště Antalya, zhruba 55 až 65 minut jízdy. Soukromý transfer vás odveze přímo do hotelu nebo na okraj pěší zóny starého města za pevnou cenu za vůz, která se nemění podle sezony ani času vašeho letu. Stejný vůz si můžete objednat i na jednodenní výlety do Aspendu, Perge nebo ke kaňonu."
      }
    ],
    "faq": [
      [
        "Co vidět v antickém Side?",
        "Apollónův chrám u moře, velké divadlo, muzeum v římských lázních, kolonádu, agoru a hradby - vše v pěší vzdálenosti od starého města."
      ],
      [
        "Vyplatí se Side v zimě?",
        "Ano, kvůli ruinám a starému městu. Mnoho sezonních hotelů zavírá, ale památky zůstávají otevřené a je tam mnohem klidněji než v létě."
      ],
      [
        "Jak daleko je Side od letiště Antalya?",
        "Asi 65 km, zhruba 55 až 65 minut jízdy."
      ],
      [
        "Mohu ze Side navštívit Aspendos?",
        "Ano. Aspendos je asi 40 minut jízdy ze Side a je to snadný půldenní výlet, často v kombinaci s Perge nebo vodopádem Manavgat."
      ]
    ]
  },
  "alanya-in-winter": {
    "slug": "alanya-v-zime",
    "title": "Alanya v zimě: počasí, co dělat a jednodenní výlety",
    "heading": "Alanya v zimě",
    "description": "Alanya od listopadu do března: zimní počasí a teplota moře, hrad a lanovka, jeskyně Damlataş a Dim, procházky, trhy a cesta z letiště Antalya.",
    "excerpt": "Mírné dny, prázdný hradní kopec a město, které žije dál, i když letní davy odjedou. Jaká je Alanya doopravdy mezi listopadem a březnem.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Alanya patří k mála místům na tureckém pobřeží, která se v zimě nevypínají. Celoročně tu žijí desítky tisíc lidí, mezi nimi mnoho Skandinávců, Němců, Nizozemců a Rusů, takže obchody, kavárny, trhy i restaurace zůstávají otevřené. Na krátkou zimní dovolenou nabízí něco, co je v Evropě vzácné: slunce, promenádu u moře, po které se dá chodit pěšky, a středověký hrad nad městem - a to s mnohem menším počtem lidí než v létě."
      },
      {
        "type": "h2",
        "text": "Počasí v Alanyi v zimě"
      },
      {
        "type": "table",
        "head": [
          "Měsíc",
          "Běžně ve dne",
          "Běžně v noci",
          "Moře"
        ],
        "rows": [
          [
            "Listopad",
            "20-22 °C",
            "11-13 °C",
            "asi 21 °C"
          ],
          [
            "Prosinec",
            "17-19 °C",
            "8-10 °C",
            "asi 19 °C"
          ],
          [
            "Leden",
            "16-17 °C",
            "7-9 °C",
            "asi 17 °C"
          ],
          [
            "Únor",
            "16-18 °C",
            "7-9 °C",
            "asi 17 °C"
          ],
          [
            "Březen",
            "18-20 °C",
            "9-11 °C",
            "asi 17 °C"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Jde o přibližné průměry. V zimě prší v obdobích - často den nebo dva vydatných přeháněk a pak jasné, slunečné dny. Alanyu chrání pohoří Taurus, díky kterému je tu o něco mírněji než na velké části pobřeží. Večery jsou chladné a domy i některé hotelové pokoje bývají studené, takže si přibalte něco teplého."
      },
      {
        "type": "h2",
        "text": "Hrad, lanovka a Červená věž"
      },
      {
        "type": "p",
        "text": "Hrad Alanya korunuje skalnatý poloostrov nad městem - najdete tu hradby, cisterny, byzantský kostel a výhledy podél pobřeží na obě strany. V létě je výstup dřina, v zimě příjemná procházka. Pokud chcete, vyveze vás nahoru za pár minut lanovka od pláže Damlataş. Dole u přístavu jsou jen kousek od sebe Červená věž (Kızıl Kule) ze 13. století a stará loděnice."
      },
      {
        "type": "h2",
        "text": "Jeskyně, řeky a procházky"
      },
      {
        "type": "ul",
        "items": [
          "Jeskyně Damlataş: malá kapníková jeskyně na konci pláže Damlataş, známá vlhkým vzduchem se stálou teplotou.",
          "Jeskyně Dim: větší jeskyně v kopcích na východ od města, s chodníkem a malým jezírkem uvnitř.",
          "Řeka Dim (Dim Çayı): restaurace na plošinách nad vodou, v zimě klidnější, některé otevřené celý rok.",
          "Promenáda u moře: kilometry rovné cesty pro chůzi i kolo podél pláží Keykubat a Kleopatra.",
          "Banánové plantáže a vesnice na svazích za městem, kde v mírné zimě roste tropické ovoce."
        ]
      },
      {
        "type": "h2",
        "text": "Koupání, trhy a každodenní život"
      },
      {
        "type": "p",
        "text": "Za slunečných dnů v listopadu, a dokonce i v zimě, uvidíte lidi plavat u pláže Kleopatra - moře je chladnější, než napovídá vzduch, ale mnoha návštěvníkům ze severu to nevadí. Na týdenních trzích se prodávají citrusy, granátová jablka, olivy a zelenina a centrum města žije spíš místními než zájezdy. Mnoho hotelů nabízí zimní ceny pro dlouhé pobyty a řada plážových resortů zůstává otevřená s krytými bazény."
      },
      {
        "type": "h2",
        "text": "Výlety z Alanye v zimě"
      },
      {
        "type": "p",
        "text": "Side a vodopád Manavgat jsou asi hodinu cesty na západ, Aspendos a Perge jsou delší, ale nenáročný celodenní výlet. Ve vnitrozemí padá v nejchladnějších týdnech ve vesnicích pohoří Taurus sníh, zatímco pobřeží zůstává zelené. Pokud tu zůstáváte spíš týdny než dny, dlouhým pobytům se podrobněji věnuje náš samostatný průvodce přezimováním na pobřeží Antalye."
      },
      {
        "type": "h2",
        "text": "Jak se dostat do Alanye z letiště Antalya"
      },
      {
        "type": "p",
        "text": "Alanya je asi 125 km od letiště Antalya, zhruba dvě hodiny jízdy po pobřeží přes Side a Manavgat. Letiště Gazipaşa-Alanya je blíž, ale má méně letů, zejména v zimě, a proto většina návštěvníků přistává v Antalyi. Soukromý transfer vás doveze až ke dveřím hotelu nebo apartmánu za pevnou cenu za vůz, bez příplatku za zimu, víkend nebo noc - to se hodí, když let přistává pozdě večer."
      }
    ],
    "faq": [
      [
        "Vyplatí se Alanya v zimě?",
        "Ano, pokud chcete mírné počasí, procházky a živé město místo plážového života. Dny bývají často slunečné, kolem 16-19 °C, a hrad i jeskyně jsou příjemné bez letního horka."
      ],
      [
        "Dá se v Alanyi v zimě koupat v moři?",
        "Někteří lidé se koupou. Moře má uprostřed zimy asi 17-19 °C, v listopadu je teplejší. Spíš osvěží, než zahřeje, a mnoho hotelů má vyhřívané kryté bazény."
      ],
      [
        "Jsou v Alanyi v zimě otevřené hotely a restaurace?",
        "Mnohé ano. Alanya má velký počet stálých obyvatel, takže centrum, trhy a mnoho restaurací zůstává otevřených. Některé velké sezonní resorty od listopadu do března zavírají."
      ],
      [
        "Jak daleko je Alanya od letiště Antalya?",
        "Asi 125 km, zhruba dvě hodiny jízdy. Soukromý transfer vás doveze přímo do hotelu za pevnou cenu za vůz."
      ],
      [
        "Prší v Alanyi v zimě hodně?",
        "Nejdeštivější měsíce jsou prosinec až únor, ale déšť obvykle přichází v obdobích jednoho až dvou dnů a mezi nimi jsou slunečné dny."
      ]
    ]
  },
  "tahtali-cable-car-olympos": {
    "slug": "lanovka-tahtali-olympos-chimera",
    "title": "Lanovka na Tahtalı, Olympos a plameny Chiméry z Kemeru",
    "heading": "Lanovka na Tahtalı, Olympos a Chiméra",
    "description": "Den u Kemeru: lanovka na Tahtalı do výšky 2 365 m, ruiny Olympu, pláž Çıralı a plameny Chiméry za soumraku - nejlepší období, co si obléct a jak se tam dostat.",
    "excerpt": "Horský vrchol, lýkijské město v říčním údolí a plameny, které šlehají ze skály už tisíce let - to vše do hodiny cesty z Kemeru.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Jižně od Kemeru se pohoří Taurus zvedá přímo z moře. Za jediný den můžete stát na vrcholu hory Tahtalı, projít ruinami Olympu až na pláž a za soumraku sledovat, jak na úbočí plápolají plameny Chiméry. Nejlepší je podzim a jaro: čistý vzduch pro výhledy, příjemné teploty na chůzi a žádné letní fronty."
      },
      {
        "type": "h2",
        "text": "Lanovka na Tahtalı: od moře do výšky 2 365 m"
      },
      {
        "type": "p",
        "text": "Lanovka Olympos začíná v borovém lese nad Tekirovou a zhruba za deset minut vyjede na vrchol Tahtalı, vysoký asi 2 365 m. Shora se díváte na celé pobřeží od Antalye po Kemer a Phaselis a za jasných dnů daleko do vnitrozemí. Na vrcholu je kavárna a vyhlídkové terasy. Jízdenky se kupují v dolní stanici nebo online, provozní doba a ceny se mění podle sezony."
      },
      {
        "type": "h2",
        "text": "Kdy jet a co si obléct"
      },
      {
        "type": "ul",
        "items": [
          "Říjen a listopad: čistý vzduch a nejlepší viditelnost v roce, u moře mírné počasí.",
          "Prosinec až březen: na vrcholu často leží sníh - úchvatný pohled na zelené pobřeží, ale nahoře se oblékněte jako v zimě.",
          "Duben a květen: sníh na vrcholu a květiny na nižších svazích, často v jediném pohledu.",
          "V kteroukoli roční dobu je nahoře o 10-15 °C chladněji než na pláži. Vezměte si bundu, i v říjnu.",
          "Při silném větru nebo bouřce lanovka nejezdí, takže si den nechte volný a před odjezdem si provoz ověřte."
        ]
      },
      {
        "type": "h2",
        "text": "Olympos: ruiny v říčním údolí"
      },
      {
        "type": "p",
        "text": "Antické lýkijské město Olympos leží v úzkém zalesněném údolí, které končí oblázkovou pláží. Hrobky, divadlo, lázně a byzantský kostel jsou roztroušené mezi vavříny a fíkovníky podél potoka. Cesta od vstupu na pláž trvá asi dvacet minut. Areál je součástí chráněného území a platí se vstupné, držitelé karty Museum Pass mají vstup zdarma."
      },
      {
        "type": "h2",
        "text": "Çıralı a plameny Chiméry"
      },
      {
        "type": "p",
        "text": "Na druhé straně pláže od Olympu leží Çıralı, klidná vesnice sadů a malých penzionů podél dlouhé pláže, kde hnízdí karety obecné. Nad ní, na svahu Yanartaş, uniká ze skály zemní plyn, který hoří už tisíce let - je to antická Chiméra z řecké legendy. K plamenům vede schodovitá stezka, výstup trvá asi 20-30 minut. Nejpůsobivější jsou za soumraku, takže si na cestu dolů vezměte baterku."
      },
      {
        "type": "h2",
        "text": "Jak si den naplánovat"
      },
      {
        "type": "table",
        "head": [
          "Zastávka",
          "Z Kemeru",
          "Počítejte s"
        ],
        "rows": [
          [
            "Lanovka na Tahtalı (dolní stanice)",
            "asi 30 minut",
            "1,5-2 hodiny"
          ],
          [
            "Ruiny Olympu a pláž",
            "asi 50 minut",
            "2 hodiny"
          ],
          [
            "Çıralı a Chiméra",
            "asi 50 minut",
            "1,5 hodiny, ideálně za soumraku"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Časy jízdy jsou přibližné. Osvědčené pořadí je lanovka ráno, kdy je vzduch nejčistší, odpoledne Olympos a oběd v Çıralı a Chiméra při západu slunce. Z Antalye připočítejte asi hodinu na každou cestu."
      },
      {
        "type": "h2",
        "text": "Jak se tam dostat"
      },
      {
        "type": "p",
        "text": "Kemer je asi 50 km od letiště Antalya a Tekirova asi 75 km, po pobřežní silnici. Veřejné autobusy k dolní stanici lanovky ani k Chiméře snadno nedojedou, a proto mnoho návštěvníků jede s řidičem. Zajišťujeme soukromé transfery z letiště do Kemeru, Tekirovy a Kumlucy za pevnou cenu za vůz a na požádání vám připravíme nabídku na celý den s řidičem na lanovku, do Olympu a Çıralı."
      }
    ],
    "faq": [
      [
        "Jak vysoko vede lanovka na Tahtalı?",
        "Vyjíždí na vrchol hory Tahtalı ve výšce asi 2 365 m, z dolní stanice v lese nad Tekirovou. Jízda trvá zhruba deset minut."
      ],
      [
        "Leží na Tahtalı v zimě sníh?",
        "Často ano - zhruba od prosince do března, někdy i v dubnu. Nahoře je vždy mnohem chladněji než na pobřeží, takže si vezměte teplou bundu."
      ],
      [
        "Kdy je nejlepší vidět plameny Chiméry?",
        "Za soumraku nebo po setmění, kdy plameny vyniknou na pozadí skály. Výstup trvá asi 20-30 minut, na cestu dolů si vezměte baterku."
      ],
      [
        "Dá se lanovka a Olympos stihnout za jeden den?",
        "Ano. Většina lidí jede lanovkou ráno, odpoledne navštíví Olympos a Çıralı a Chiméru vidí při západu slunce."
      ],
      [
        "Jak daleko je Kemer od letiště Antalya?",
        "Asi 50 km, zhruba 40-50 minut jízdy. Tekirova u lanovky je asi 75 km."
      ]
    ]
  },
  "perge-aspendos-day-trip": {
    "slug": "perge-a-aspendos-vylet-z-antalye",
    "title": "Perge a Aspendos: půldenní výlet za antickými památkami Antalye",
    "heading": "Perge a Aspendos z Antalye",
    "description": "Výlet do Perge a Aspendu z Antalye, Beleku nebo Side: co vidět, nejlepší období, kolik času počítat a jak obě antická místa spojit za půl dne.",
    "excerpt": "Římská ulice lemovaná sloupy, stadion pro 12 000 diváků a jedno z nejzachovalejších divadel antického světa - vše do hodiny od letiště.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Dvě z nejkrásnějších antických památek Turecka leží kousek od hlavní silnice mezi Antalyí a Side. Perge bylo velké řecko-římské město na pamfýlské nížině, Aspendos má římské divadlo tak zachovalé, že se v něm dodnes hraje. Spolu tvoří nenáročný půldenní výlet a nejlepší jsou mezi říjnem a dubnem, kdy slunce nepálí."
      },
      {
        "type": "h2",
        "text": "Perge: město sloupů"
      },
      {
        "type": "p",
        "text": "Perge je jen asi 15 minut od letiště Antalya. Vstoupíte helénistickou branou se dvěma kulatými věžemi a projdete dlouhou kolonádou s vodním kanálem uprostřed až k agoře, lázním a akropolskému pahorku. Hned za hradbami stojí velké divadlo a jeden z nejzachovalejších stadionů starověku. Mnoho soch z Perge je vystaveno v Antalyjském muzeu. Počítejte zhruba s hodinou a půl až dvěma hodinami."
      },
      {
        "type": "h2",
        "text": "Aspendos: divadlo, které přežilo"
      },
      {
        "type": "p",
        "text": "Aspendos nedaleko Seriku je proslulý římským divadlem z 2. století n. l., které pojalo mnoho tisíc diváků a dodnes má zachovanou scénickou budovu, galerie i vynikající akustiku. Za ním stoupá stezka k hornímu městu a k obloukům římského akvaduktu, který se táhne přes nížinu. Kousek autem odtud stojí za zastávku seldžucký most přes řeku Köprüçay. Počítejte zhruba s hodinou až hodinou a půl."
      },
      {
        "type": "h2",
        "text": "Nejlepší období na návštěvu ruin"
      },
      {
        "type": "ul",
        "items": [
          "Říjen a listopad: teplé, suché dny a měkké světlo na fotografování.",
          "Prosinec až únor: klidné památky a mírné počasí mezi deštivými dny - přibalte si nepromokavou vrstvu.",
          "Březen a duben: zelená tráva a divoké květiny mezi kameny, možná nejkrásnější období.",
          "Červen až září: obě místa mají málo stínu a polední horko je silné, v létě jeďte brzy ráno."
        ]
      },
      {
        "type": "h2",
        "text": "Jak obě místa spojit za půl dne"
      },
      {
        "type": "table",
        "head": [
          "Výchozí místo",
          "Do Perge",
          "Z Perge do Aspendu",
          "Z Aspendu zpět"
        ],
        "rows": [
          [
            "Antalya / Lara",
            "asi 25 minut",
            "asi 35 minut",
            "asi 45 minut"
          ],
          [
            "Belek",
            "asi 30 minut",
            "asi 35 minut",
            "asi 20 minut"
          ],
          [
            "Side / Manavgat",
            "asi 55 minut",
            "asi 35 minut",
            "asi 35 minut"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Časy jízdy jsou přibližné. Začít ráno v Perge a skončit v Aspendu se hodí z kteréhokoli z těchto míst. Na obou místech se platí vstupné a platí tu karta Museum Pass. Vezměte si pevné boty: povrch tvoří nerovný mramor a kámen a schody jsou všude."
      },
      {
        "type": "h2",
        "text": "Cestou z letiště nebo na letiště"
      },
      {
        "type": "p",
        "text": "Protože je Perge tak blízko letiště Antalya a Aspendos leží u silnice do Beleku a Side, obě místa se dobře vejdou do dne příletu nebo odletu s pozdním letem. Soukromý transfer může cestou zastavit u jednoho nebo obou, zavazadla přitom zůstanou bezpečně ve voze. Při rezervaci si řekněte o nabídku se zastávkami: cena zůstává pevná za vůz."
      }
    ],
    "faq": [
      [
        "Jak daleko je Perge od letiště Antalya?",
        "Jen asi 15 minut jízdy. Je to jedno z nejsnáze dostupných antických míst na den příletu nebo odletu."
      ],
      [
        "Dají se Perge a Aspendos stihnout za jeden den?",
        "Snadno - na obě stačí půl dne. Počítejte asi se dvěma hodinami v Perge, zhruba hodinou v Aspendu a asi 35 minutami jízdy mezi nimi."
      ],
      [
        "Používá se divadlo v Aspendu dodnes?",
        "Ano. Římské divadlo je tak zachovalé, že se v něm některé večery stále konají koncerty a představení, většinou v teplejších měsících."
      ],
      [
        "Kdy je nejlepší doba na návštěvu Perge a Aspendu?",
        "Od října do dubna. Na žádném z obou míst není moc stínu, takže v létě jeďte brzy ráno."
      ],
      [
        "Může transfer se zavazadly zastavit u ruin?",
        "Ano. Zastávky si objednejte při rezervaci, zavazadla zůstanou ve voze a cena zůstává pevná za vůz."
      ]
    ]
  },
  "ramadan-bayram-antalya": {
    "slug": "ramadan-a-bajram-v-antalyi",
    "title": "Ramadán a bajram v Antalyi: co by měli cestovatelé vědět",
    "heading": "Cesta do Antalye během ramadánu a bajramu",
    "description": "Co se v Antalyi mění během ramadánu a svátků bajram: restaurace, večery s iftarem, plné silnice o svátcích, hotely a jak naplánovat transfer z letiště.",
    "excerpt": "V letoviscích se běžný život během ramadánu téměř nemění. Svátky, které po něm následují, jsou jiná kapitola - co čekat a jak je zohlednit v plánech.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Ramadán a dva svátky bajram se v kalendáři posouvají, každý rok asi o 11 dní dříve. V nejbližších sezonách připadnou na konec zimy a jaro: ramadán a svátek konce ramadánu (Ramazan Bayramı) zhruba na únor a březen, Svátek oběti (Kurban Bayramı) zhruba na květen. Přesná data si ověřte v oficiálním kalendáři. Pro návštěvníky se na pobřeží během samotného postního měsíce mění jen málo - plánovat je potřeba hlavně kolem svátků."
      },
      {
        "type": "h2",
        "text": "Mění ramadán dovolenou v Antalyi?"
      },
      {
        "type": "p",
        "text": "Jen velmi málo. Hotely, restaurace, kavárny a obchody v Antalyi, Beleku, Side, Kemeru a Alanyi mají přes den otevřeno jako obvykle a alkohol se podává tam, kde se podává běžně. Mnoho lidí v Turecku se postí, mnoho ne, a od návštěvníků to nikdo neočekává. Je jen zdvořilé nejíst a nepít okázale před někým, kdo se zjevně postí, zvlášť v tradičních čtvrtích a vesnicích."
      },
      {
        "type": "h2",
        "text": "Iftar: ramadánové večery"
      },
      {
        "type": "ul",
        "items": [
          "Při západu slunce se půst přerušuje iftarem, často společným jídlem s polévkou, datlemi, olivami a zvláštním kulatým ramadánovým chlebem pide, který se prodává jen v tomto měsíci.",
          "Mnoho restaurací nabízí iftarové menu, stoly se zaplní těsně před západem slunce, takže pokud se chcete přidat, rezervujte si.",
          "Ve starém městě a u velkých mešit panuje večer sváteční atmosféra a rodiny zůstávají venku dlouho.",
          "Před úsvitem v některých čtvrtích prochází ulicemi bubeník a budí lidi k poslednímu jídlu (sahur) - i to patří k tradici."
        ]
      },
      {
        "type": "h2",
        "text": "Svátky bajram: kdy cestuje celé Turecko"
      },
      {
        "type": "p",
        "text": "Svátek konce ramadánu trvá tři dny a Svátek oběti čtyři, vláda je často prodlužuje na delší volno. Miliony lidí cestují za rodinou nebo k moři, takže vnitrostátní lety, dálkové autobusy i hotely se plní a silnice do Antalye jsou první a poslední den rušné. Banky a úřady zavírají, ale obchody, restaurace, muzea a turistická místa v letoviscích obvykle zůstávají otevřené."
      },
      {
        "type": "h2",
        "text": "Jak naplánovat transfer kolem svátků"
      },
      {
        "type": "ul",
        "items": [
          "Pokud přilétáte na začátku bajramu, rezervujte včas: po vozech a řidičích je velká poptávka.",
          "Na odlet v poslední den svátků si nechte časovou rezervu, letiště i silnice jsou tehdy nejvytíženější.",
          "Během ramadánu je hodinu před západem slunce hustý provoz a během samotného iftaru neobvykle klid.",
          "Sdělte nám číslo letu: sledujeme ho, takže vás zpožděný let v rušný den nepřipraví o vyzvednutí."
        ]
      },
      {
        "type": "h2",
        "text": "Dobré vědět"
      },
      {
        "type": "p",
        "text": "Během svátků se lidé zdraví „İyi bayramlar“ (šťastné svátky) a všude se rozdávají sladkosti - je to vlídné období pro pobyt v zemi. Naše ceny se kvůli ramadánu ani bajramu nemění: jedna pevná cena za vůz, bez příplatku za svátky, noc nebo sezonu."
      }
    ],
    "faq": [
      [
        "Jsou restaurace v Antalyi během ramadánu otevřené?",
        "Ano. V letoviscích i ve městě Antalya mají restaurace a kavárny přes den normálně otevřeno. Večer k tomu přibývají iftarová menu."
      ],
      [
        "Mohou turisté během ramadánu v Antalyi pít alkohol?",
        "Ano. Hotely, bary a restaurace, které alkohol běžně podávají, ho podávají i během ramadánu."
      ],
      [
        "Je v Antalyi během bajramu rušno?",
        "Ano. Mnoho tureckých rodin o bajramu cestuje, takže hotely, lety a silnice jsou vytíženější než obvykle, hlavně první a poslední den."
      ],
      [
        "Kdy je ramadán a bajram příští rok?",
        "Data se každý rok posouvají asi o 11 dní dříve. V nejbližších sezonách připadne ramadán a svátek konce ramadánu zhruba na únor-březen a Svátek oběti zhruba na květen, přesná data si ověřte v oficiálním kalendáři."
      ],
      [
        "Zdražují se transfery během bajramu?",
        "U nás ne. Cena je pevná za vůz, bez příplatku za svátky, noc nebo sezonu. Na sváteční termíny doporučujeme rezervovat včas."
      ]
    ]
  },
  "kaleici-old-town-guide": {
    "slug": "kaleici-stare-mesto-antalye-pruvodce",
    "title": "Kaleiçi, staré město Antalye: průvodce na procházku mimo sezonu",
    "heading": "Kaleiçi: staré město Antalye",
    "description": "Průvodce po Kaleiçi, opevněném starém městě Antalye: Hadriánova brána, Žlábkovaný minaret, starý přístav, butikové hotely a proč jet od podzimu do jara.",
    "excerpt": "Římské brány, osmanské domy a přístav pod útesy. Staré srdce Antalye se nejlépe poznává pomalu, v měsících, kdy město patří svým obyvatelům.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Kaleiçi - doslova „uvnitř hradu“ - je historické centrum Antalye, obehnané starými hradbami nad malým přístavem. Uličky lemují obnovené osmanské domy, v mnoha z nich dnes sídlí butikové hotely, kavárny a malé restaurace. V létě je tu horko a plno, od října do dubna je Kaleiçi v nejlepší formě: mírné dny, otevřené terasy na slunci a čas se toulat."
      },
      {
        "type": "h2",
        "text": "Procházka po Kaleiçi"
      },
      {
        "type": "ul",
        "items": [
          "Hadriánova brána: římská brána se třemi oblouky, postavená k návštěvě císaře ve 2. století n. l., tradiční vstup do starého města.",
          "Hodinová věž a náměstí Kalekapısı: místo, kde se staré město potkává s moderním.",
          "Žlábkovaný minaret (Yivli Minare): seldžucký symbol Antalye, viditelný z celého centra.",
          "Věž Hıdırlık: kulatá římská věž na jižním okraji s výhledem na západ slunce nad zálivem a horami.",
          "Zlomený minaret (Kesik Minare): stavba, která byla v průběhu staletí chrámem, kostelem i mešitou.",
          "Starý přístav: rybářské a výletní lodě pod útesy, dostanete se k nim uličkami nebo výtahem shora."
        ]
      },
      {
        "type": "h2",
        "text": "Za hradbami"
      },
      {
        "type": "p",
        "text": "Park Karaalioğlu se táhne podél útesů od věže Hıdırlık s výhledy přes záliv. Antalyjské muzeum, jedna z nejbohatších archeologických sbírek v Turecku, leží na začátku pláže Konyaaltı a je ideální na deštivý den, otevírací dobu si ověřte předem. Na východ od města padají vodopády Düden přímo z útesů do moře a horní vodopády leží ve stinném parku."
      },
      {
        "type": "h2",
        "text": "Proč jet od podzimu do jara"
      },
      {
        "type": "table",
        "head": [
          "Období",
          "Běžně ve dne",
          "V Kaleiçi"
        ],
        "rows": [
          [
            "Říjen - listopad",
            "22-27 °C",
            "Teplé večery, otevřené terasy, méně lidí"
          ],
          [
            "Prosinec - únor",
            "15-18 °C",
            "Klidné uličky, kavárny na slunci, občas deštivý den"
          ],
          [
            "Březen - duben",
            "18-22 °C",
            "Kvetoucí pomerančovníky, zelené parky, festivaly ve městě"
          ],
          [
            "Červen - srpen",
            "33-35 °C",
            "Velké horko a plno - nejlépe brzy ráno a večer"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Teploty jsou přibližné průměry. Většina restaurací, kaváren a butikových hotelů v Kaleiçi má otevřeno celý rok, protože staré město žije z návštěvníků města a místních obyvatel, nejen z plážové turistiky."
      },
      {
        "type": "h2",
        "text": "Ubytování ve starém městě"
      },
      {
        "type": "p",
        "text": "Hotely v Kaleiçi bývají malé, v přestavěných sídlech kolem nádvoří nebo malého bazénu. Mnoho uliček je pěších nebo příliš úzkých pro velká auta, takže vůz často zastaví u nejbližší brány nebo na náměstí a posledních pár metrů se jde pěšky. Při rezervaci nám napište název hotelu: naši řidiči vědí, který vstup je nejblíž, a pomohou vám se zavazadly."
      },
      {
        "type": "h2",
        "text": "Jak se dostat do Kaleiçi z letiště Antalya"
      },
      {
        "type": "p",
        "text": "Kaleiçi je asi 15 km od letiště Antalya, zhruba 20 až 30 minut jízdy. Letiště s centrem spojuje i tramvaj, ale s kufry je jednodušší soukromý transfer do hotelu, zvlášť pozdě v noci. Cena je pevná za vůz, bez nočního příplatku."
      }
    ],
    "faq": [
      [
        "Co je Kaleiçi v Antalyi?",
        "Kaleiçi je historické staré město Antalye, obehnané hradbami nad starým přístavem, s osmanskými domy, Hadriánovou branou, Žlábkovaným minaretem a mnoha butikovými hotely a kavárnami."
      ],
      [
        "Jak daleko je Kaleiçi od letiště Antalya?",
        "Asi 15 km, zhruba 20-30 minut jízdy."
      ],
      [
        "Dá se do Kaleiçi vjet autem?",
        "Jen částečně. Mnoho uliček je pěších nebo velmi úzkých, takže vozy často zastavují u nejbližší brány nebo na náměstí. Naši řidiči znají nejbližší příjezd ke každému hotelu."
      ],
      [
        "Vyplatí se Kaleiçi v zimě?",
        "Ano. Většina kaváren, restaurací a hotelů má otevřeno, uličky jsou klidné a dny bývají mírné a slunečné."
      ],
      [
        "Kolik času potřebuji na Kaleiçi?",
        "Na první procházku stačí půl dne. S muzeem, parkem Karaalioğlu a vodopády Düden je ideální celý den nebo dva."
      ]
    ]
  }
};
