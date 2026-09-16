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
};
