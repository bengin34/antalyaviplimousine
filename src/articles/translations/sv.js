/**
 * Blog copy for sv: the page chrome plus every article body.
 * One file per language, so adding a market is adding a file.
 */
export const chrome = {
  locale: "sv_SE",
  indexTitle: "Guider om transfer i Antalya och researtiklar | Antalya VIP Tourism",
  indexDescription:
    "Praktiska guider om ankomsten till Antalya: privat transfer eller taxi, mötet med chauffören, resa med barn, avstånd längs kusten och när du bör åka.",
  heading: "Transferguider för Antalya",
  intro:
    "Praktiska artiklar om ankomsten till Antalyas flygplats och vägen till hotellet - hämtade från de transfers vi kör varje dag, inte från en broschyr.",
  blog: "Guider",
  readMore: "Läs guiden",
  minReadLabel: "{minutes} min läsning",
  updated: "Uppdaterad",
  contents: "I den här guiden",
  faqHeading: "Vanliga frågor",
  relatedHeading: "Transfersträckor i den här guiden",
  routeGuidesHeading: "Guider för den här transfern",
  moreHeading: "Fler guider",
  ctaHeading: "Transfer till fast pris från Antalya flygplats",
  ctaText:
    "Ett pris för hela fordonet, flygbevakning ingår och betalning kontant till chauffören. Kontrollera din sträcka och boka på en minut.",
  ctaButton: "Se ditt fasta pris",
  backToBlog: "Alla guider",
  home: "Hem",
  routes: "Transfersträckor",
  book: "Boka din transfer",
  imprint: "Juridisk information",
  privacy: "Integritet",
  imprintUrl: "/impressum.html",
  privacyUrl: "/privacy/",
};

export const articles = {
  "transfer-vs-taxi": {
    slug: "transfer-eller-taxi-antalya-flygplats",
    title: "Antalya flygplats: privat transfer, taxi eller delad shuttle?",
    heading: "Privat transfer, taxi eller delad shuttle från Antalya flygplats?",
    description:
      "Vad de tre alternativen från Antalya flygplats faktiskt kostar, hur lång tid de tar och vilket som passar ditt sällskap. Jämförelse med fast pris per fordon.",
    excerpt:
      "Tre sätt att lämna Antalya flygplats och tre mycket olika starter på semestern. Vad varje alternativ kostar, hur lång tid det tar och vem det passar.",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "Du landar på Antalya flygplats (AYT) efter tre till fem timmars flyg, ofta sent på kvällen, oftast med bagage och inte sällan med barn. De följande fyrtio minuterna avgör hur semestern börjar. Det finns tre realistiska sätt att ta sig ut från terminalen, och det lägsta skyltade priset är sällan den billigaste resan." },
      { type: "h2", text: "De tre alternativen sida vid sida" },
      {
        type: "table",
        head: ["", "Privat transfer", "Flygplatstaxi", "Delad shuttle"],
        rows: [
          ["Prisgrund", "Fast, per fordon", "Taxameter, per resa", "Per person"],
          ["Känt i förväg", "Ja", "Nej", "Ja"],
          ["Väntar vid försening", "Ja, med flygbevakning", "Nej", "Begränsat"],
          ["Stopp före ditt hotell", "Inga", "Inga", "Upp till 8"],
          ["Bagageutrymme", "Skåpbil", "Personbil", "Delat"],
          ["Bilbarnstol", "På begäran, kostnadsfritt", "Sällan", "Nej"],
        ],
      },
      { type: "h2", text: "Vad en taxi faktiskt kostar" },
      { type: "p", text: "Taxi är det självklara svaret på varje flygplats, och på korta sträckor är det ett rimligt val. På turkiska rivieran är problemet avståndet: Belek ligger 45 km bort, Side 65 km, Alanya 125 km. En taxameter som går 125 km på natten, med en returresa som chauffören måste räkna in, ger en summa ingen nämnde i förväg. Du har inte heller något att luta dig mot om rutten inte var den direkta." },
      { type: "p", text: "En privat transfer vänder på det: priset för hela fordonet är överenskommet innan du flyger, det ändras inte i tät trafik och det är detsamma oavsett om en person eller sex reser." },
      { type: "h2", text: "Varför delad shuttle ser billig ut men sällan är det" },
      { type: "p", text: "Ett pris per person ser oslagbart ut för den som reser ensam och slutar vara billigt redan vid två. För en familj på fyra till Side kostar fyra platser oftast mer än en skåpbil till fast pris. Den verkliga kostnaden är dock tid: fordonet åker när det är fullt och släpper av gäster längs kustvägen i den ordning som passar rutten, inte dig. Att komma sist efter ett nattflyg lägger lätt på mer än en timme." },
      { type: "h2", text: "När respektive alternativ är rätt" },
      {
        type: "ul",
        items: [
          "Ensamresenär, handbagage, landning på dagen, hotell i centrala Antalya: taxi eller shuttle räcker.",
          "Två eller fler med hotell utanför staden: eget fordon är oftast billigare och alltid snabbare.",
          "Familjer med bilbarnstolar, barnvagn eller golfbagar: privat, eftersom kapaciteten är bekräftad i förväg.",
          "Nattankomster och anslutningar som kan glida: privat, eftersom hämtningen följer ditt flyg och inte en tidtabell.",
        ],
      },
      { type: "h2", text: "Vad du bör kontrollera före bokning" },
      { type: "p", text: "Tre frågor gör skillnaden tydlig. Gäller priset per fordon eller per person? Är det fast, eller rör det sig med trafik och tid på dygnet? Och vad händer om flyget landar två timmar sent - står någon kvar, och kostar det extra? Våra fasta priser gäller per fordon, flygbevakning ingår och de första 90 minuternas väntan efter landning är kostnadsfria och förskjuts automatiskt vid försening." },
    ],
    faq: [
      ["Är en privat transfer dyrare än taxi i Antalya?", "Till centrala Antalya är det jämförbart. Till Belek, Side, Kemer eller Alanya ligger ett fast fordonspris normalt under taxameterpriset på samma sträcka, och du känner det innan du flyger."],
      ["Betalar jag per person eller per fordon?", "Per fordon. Priset för en Mercedes Vito gäller upp till sex passagerare; Sprinter är för större sällskap. En passagerare till ändrar inte priset."],
      ["Vad händer om mitt flyg är försenat?", "Vi följer flyget i realtid och flyttar hämtningen utan extra kostnad. De 90 minuter som ingår räknas från den faktiska landningen."],
      ["Kan jag betala kontant vid ankomst?", "Ja. Förskottsbetalning krävs inte; du betalar det fasta beloppet från din bokning direkt till chauffören när resan börjar."],
    ],
  },
  "airport-arrival-guide": {
    slug: "ankomst-antalya-flygplats-guide",
    title: "Ankomst till Antalya flygplats: terminaler, mötesplats och väntetid",
    heading: "Ankomst till Antalya flygplats: vad som händer efter landning",
    description:
      "Steg för steg genom ankomsten på Antalya flygplats - terminaler, passkontroll, bagage, var chauffören väntar och hur länge den kostnadsfria väntan varar.",
    excerpt:
      "Från hjulen i marken till bildörren: terminaler, passkontroll, mötesplatsen och vad som händer när flyget är sent.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Antalya flygplats hanterar över trettio miljoner passagerare om året och nästan alla kommer inom ett smalt sommarfönster. Att känna till ordningsföljden i förväg förvandlar en full terminal till en formalitet på tjugo minuter." },
      { type: "h2", text: "Vilken terminal du landar på" },
      { type: "p", text: "AYT har tre terminaler. De flesta internationella reguljärflyg använder Terminal 1 eller Terminal 2; charter- och säsongsflyg hanteras oftast av Terminal 2. Inrikesterminalen betjänar flyg från Istanbul, Ankara och Izmir. Du behöver inte lista ut det själv: flightnumret säger oss vilket, och chauffören skickas till rätt ankomsthall." },
      { type: "h2", text: "Passkontroll och bagage" },
      { type: "p", text: "De flesta europeiska medborgare reser in i Türkiye utan visum för kortare vistelser, men kontrollera reglerna för ditt eget pass före avresan. Räkna med 20 till 45 minuter från landning till att du är ute med bagaget under högsäsong, mindre utanför juli och augusti. Bagageutlämningen varierar mest, och därför betyder ett väntfönster mer än en utlovad hämtningstid." },
      { type: "h2", text: "Var chauffören möter dig" },
      {
        type: "ul",
        items: [
          "Hämta ditt bagage och gå ut i ankomsthallen.",
          "Gå till meet & greet-området J / 777.",
          "Vårt flygplatsteam hittar din bokning och tar dig till chauffören.",
          "Chauffören bär bagaget till fordonet på parkeringen intill.",
        ],
      },
      { type: "p", text: "Du behöver inte leta efter en namnskylt bland femtio andra. Teamet står på en fast punkt och har din bokningsreferens, så överlämningen fungerar likadant klockan 06.00 som klockan 02.00." },
      { type: "h2", text: "Vad som händer om flyget är försenat" },
      { type: "p", text: "Vi följer själva flyget, inte tidtabellen du bokade mot. Landar det två timmar sent flyttas hämtningen två timmar och priset ändras inte. De första 90 minuterna av väntan efter den faktiska landningstiden ingår kostnadsfritt, vilket täcker en långsam passkö eller försenat bagage." },
      { type: "h2", text: "Före resan" },
      { type: "p", text: "Två detaljer gör dagen smidig: ge oss flightnumret och inte bara ankomsttiden, och ange antalet bilbarnstolar redan vid bokningen. Båda är kostnadsfria, och båda är betydligt svårare att ordna klockan 01.00 i ankomsthallen." },
    ],
    faq: [
      ["Var exakt möter jag chauffören på Antalya flygplats?", "Vid meet & greet-området J / 777 i ankomsthallen, efter att du hämtat bagaget. Vårt team har din bokning och tar dig till chauffören."],
      ["Hur länge väntar chauffören?", "De första 90 minuterna efter din faktiska landningstid ingår kostnadsfritt, och fönstret förskjuts automatiskt om flyget är försenat."],
      ["Hur lång tid tar det att komma ut ur terminalen?", "Vanligtvis 20 till 45 minuter från landning, beroende på passkontroll och bagageutlämning. Längst tid tar det i juli och augusti."],
      ["Måste jag skicka mitt flightnummer?", "Ja, tack. Med flightnumret följer vi den verkliga landningstiden och skickar chauffören till rätt terminal."],
    ],
  },
  "alanya-distance-guide": {
    slug: "antalya-flygplats-till-alanya-avstand",
    title: "Antalya flygplats till Alanya: avstånd, restid och transferalternativ",
    heading: "Antalya flygplats till Alanya: hur långt det verkligen är",
    description:
      "125 km längs kustvägen D400. Hur lång resan till Alanya faktiskt är, var hotellområdena ligger och hur du planerar en sen ankomst.",
    excerpt:
      "Alanya är den längsta av de vanliga transfersträckorna från Antalya. Det verkliga avståndet, den verkliga restiden och vad som ändras vid nattankomst.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Alanya ligger 125 km öster om Antalya flygplats, vilket gör det till den längsta rutinmässigt bokade transfern på turkiska rivieran. Det avståndet är det enda faktum som formar alla andra beslut om resan." },
      { type: "h2", text: "Avstånd och restid" },
      {
        type: "table",
        head: ["Destination", "Avstånd från AYT", "Normal restid"],
        rows: [
          ["Antalya centrum", "15 km", "20-30 minuter"],
          ["Side", "65 km", "55-65 minuter"],
          ["Manavgat", "75 km", "60-70 minuter"],
          ["Kızılağaç", "85 km", "70-80 minuter"],
          ["Alanya", "125 km", "110-130 minuter"],
        ],
      },
      { type: "p", text: "Rutten följer kustvägen D400 österut genom Serik, Manavgat och Kızılağaç. Vägen är bra, men den går genom orterna snarare än runt dem, så sommareftermiddagar och lördagarnas chartertoppar lägger på tid som ingen tidtabell kan ta bort." },
      { type: "h2", text: "Alanya är inte en enda plats" },
      { type: "p", text: "Hotell som säljs som \"Alanya\" sprider sig över ungefär 65 km kust. Avsallar, Türkler och Okurcalar ligger väster om centrum och märkbart närmare flygplatsen; Mahmutlar, Kestel, Kargıcak och Demirtaş ligger öster om det och lägger på 20 till 45 minuter. Ange hotellnamnet vid bokning, inte bara orten - det avgör både restiden och rätt fast pris." },
      { type: "h2", text: "Varför delad shuttle svider mest här" },
      { type: "p", text: "På en sträcka på 125 km är varje extra hotellstopp en verklig omväg. En shuttle som lämnar av åtta sällskap längs kusten förvandlar lätt två timmar till fyra, och den familj som stiger av sist bor oftast längst österut. Ett privat fordon kör sträckan en gång, i din ordning, och det fasta priset rör sig inte med trafiken." },
      { type: "h2", text: "Att planera en nattankomst" },
      { type: "p", text: "Många flyg till Alanya landar efter 23.00. Då spelar två saker roll: att någon säkert väntar och att priset var överenskommet innan du flög. Vi följer flyget, så en sen landning flyttar hämtningen i stället för att ställa in den, och de första 90 minuternas väntan ingår. Betalning sker kontant till chauffören när resan börjar, så inget behöver ordnas mitt i natten." },
    ],
    faq: [
      ["Hur långt är Alanya från Antalya flygplats?", "125 km längs kustvägen D400, normalt 110 till 130 minuters körning."],
      ["Är transferpriset detsamma för alla hotell i Alanya?", "Nej. Alanyas kust sträcker sig omkring 65 km, så hotell i Avsallar eller Okurcalar prissätts annorlunda än i Mahmutlar eller Kargıcak. Ange hotellnamnet så ser du rätt fast pris."],
      ["Görs något stopp på vägen?", "På en privat transfer kan vi stanna kort på begäran. Det finns inga schemalagda stopp och inga andra passagerare."],
      ["Vad händer om jag landar efter midnatt?", "Hämtningen följer din faktiska landningstid. Nattankomster är normala på den här sträckan och kostar inget extra."],
    ],
  },
  "family-child-seats": {
    slug: "transfer-antalya-flygplats-med-barn",
    title: "Transfer från Antalya flygplats med barn: bilbarnstolar, vagnar, bagage",
    heading: "Resa till hotellet med barn",
    description:
      "Bilbarnstolar, barnvagnar och bagage vid transfer från Antalya flygplats. Vad du ska begära vid bokning och varför privat är enklare med små barn.",
    excerpt:
      "Bilbarnstolar är kostnadsfria på begäran, men bara om vi vet om dem innan du landar. Vad du bör säga och vad som verkligen får plats i fordonet.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "En transfer med små barn är ett logistikproblem, inte ett prisproblem. Stolar, en barnvagn, en resesäng och fyra resväskor måste få plats i samma fordon samtidigt - och besluten som gör det möjligt fattas vid bokningen, inte vid terminalen." },
      { type: "h2", text: "Bilbarnstolar" },
      { type: "p", text: "Vi tillhandahåller bilbarnstolar kostnadsfritt på begäran. Ange antal barn och deras ålder när du bokar; det avgör om det behövs babyskydd, bilbarnstol eller bälteskudde. Stolarna förbereds med fordonet, så det finns inget att bära genom flygplatsen och inget att ordna klockan 01.00 i ankomsthallen." },
      { type: "h2", text: "Vad som får plats i fordonet" },
      {
        type: "ul",
        items: [
          "Mercedes Vito: upp till sex passagerare med normalt semesterbagage.",
          "Mercedes Sprinter: större sällskap, upp till 12 platser, och rätt val när barnvagn och resesäng följer med.",
          "Barnvagnar och bilbarnstolar räknas inte mot antalet passagerare, men tar bagageutrymme - säg till så anpassar vi fordonet.",
        ],
      },
      { type: "p", text: "Det fasta priset gäller fordonet, inte platsen, så ett barn till ändrar aldrig priset. Det som ändras är vilket fordon vi skickar." },
      { type: "h2", text: "Varför privat betyder mer med barn" },
      { type: "p", text: "I en delad shuttle väntar familjen först på att fordonet ska fyllas och åker sedan längs kusten medan andra sällskap lämnas av. Med ett litet barn efter ett nattflyg är det skillnaden mellan fyrtio minuter och tre timmar. Ett privat fordon åker när ni är redo och kör direkt till hotellets reception." },
      { type: "h2", text: "Praktiska detaljer" },
      { type: "p", text: "Det finns dricksvatten i fordonet. Behövs ett kort stopp på den långa sträckan till Side eller Alanya räcker det att säga till chauffören - det finns ingen tidtabell att hålla. Och eftersom betalningen sker kontant när resan börjar behöver ingen leta efter kort eller täckning med ett sovande barn i famnen." },
    ],
    faq: [
      ["Är bilbarnstolar kostnadsfria?", "Ja. Bilbarnstolar tillhandahålls utan extra kostnad på begäran. Ange antal barn och deras ålder vid bokningen."],
      ["Kan jag ta med barnvagn?", "Ja. Säg till vid bokningen så att vi räknar med bagageutrymmet - en barnvagn plus en full uppsättning resväskor kan betyda Sprinter i stället för Vito."],
      ["Räknas barn in i antalet passagerare?", "För platskapaciteten, ja. Priset ändras inte: det är fast per fordon, inte per person."],
      ["Kan vi stanna under en lång transfer?", "Ja. På en privat transfer kan chauffören stanna kort på begäran; inga andra passagerare väntar."],
    ],
  },
  "belek-golf-transfer": {
    slug: "golftransfer-till-belek",
    title: "Golftransfer till Belek: klubbor, sällskap och tidsplanering från AYT",
    heading: "Från Antalya flygplats till Belek med golfbagar",
    description:
      "Hur golfbagage reser från Antalya flygplats till Belek: val av fordon, sällskapets storlek, tidsplanering mot starttid och vad du bör uppge vid bokning.",
    excerpt:
      "Belek är först en golfdestination och därefter en badort. Vad det betyder för bagageutrymme, val av fordon och resan från AYT.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Belek ligger 45 km öster om Antalya flygplats, 35 till 40 minuters resa, och rymmer den tätaste samlingen mästerskapsbanor i Türkiye. De flesta sällskap som kommer dit bär med sig något som en vanlig transfer inte är dimensionerad för: golfbagar." },
      { type: "h2", text: "Golfbagar och val av fordon" },
      { type: "p", text: "En tourbag är ungefär 130 cm lång och delar utrymme illa med resväskor. Som tumregel klarar en Mercedes Vito fyra passagerare med fyra golfbagar och deras vanliga bagage; därutöver är en Mercedes Sprinter rätt fordon. Ange antalet bagar vid bokningen så anpassar vi fordonet efter lasten, inte efter antalet personer." },
      {
        type: "ul",
        items: [
          "Fyra spelare, fyra bagar, vanliga resväskor: Vito.",
          "Sex till åtta spelare, eller bagar plus stora väskor: Sprinter.",
          "Blandat sällskap med icke-spelande medresenärer: räkna bagarna, inte personerna.",
        ],
      },
      { type: "h2", text: "Tidsplanering mot starttiden" },
      { type: "p", text: "Resan är kort, flygplatsen inte. Räkna med 20 till 45 minuter från landning till att du lämnar terminalen under högsäsong, plus 35 till 40 minuter på vägen. En starttid på förmiddagen samma dag som ankomsten är realistisk bara för flyg som landar före cirka 07.00; annars planera den första rundan till morgonen därpå." },
      { type: "h2", text: "Banor och hotell i området" },
      { type: "p", text: "Anläggningarna i Belek - bland dem Regnum Carya, Gloria, Cornelia och Maxx Royal - ligger några kilometer från varandra och från banorna, så ett extra stopp för en medspelare på ett annat hotell kostar minuter i stället för en timme. På en privat transfer går det; i en delad shuttle bestämmer du inte ordningen." },
      { type: "h2", text: "Vad du bör bekräfta vid bokning" },
      { type: "p", text: "Tre saker: antalet golfbagar, hotellets namn och hämtningstiden för returen om du redan känner till avresan. Priset är fast per fordon, så ett större fordon för bagaget är en offert du ser före resan, aldrig ett tillägg vid trottoarkanten." },
    ],
    faq: [
      ["Kostar golfbagage extra?", "Nej. Priset är fast per fordon. Större bagage kan innebära att vi skickar en Sprinter i stället för en Vito, och det priset ser du vid bokningen."],
      ["Hur många golfbagar får plats i en Vito?", "Som praktisk regel fyra bagar med fyra passagerare och vanliga resväskor. För fler bagar eller spelare använder vi en Sprinter."],
      ["Hur lång är resan från Antalya flygplats till Belek?", "45 km, normalt 35 till 40 minuter i vanlig trafik."],
      ["Kan vi stanna vid ett andra hotell i Belek?", "Ja. Anläggningarna ligger nära varandra, så en extra avlämning på en privat transfer kostar bara några minuter. Nämn det vid bokningen."],
    ],
  },
  "when-to-visit-antalya": {
    slug: "basta-tiden-att-besoka-antalya",
    title: "Bästa tiden att besöka Antalya: säsong för säsong och vad det betyder för transfern",
    heading: "När du bör besöka Antalya - och hur säsongen ändrar din ankomst",
    description:
      "Antalya säsong för säsong: väder, trängsel, priser och flygplatstrafik. Vad varje månad betyder för flygtider, trafik och planeringen av din ankomst.",
    excerpt:
      "Varje säsong på turkiska rivieran ger en annan ankomst. Vad som ändras mellan april och oktober, och varför det spelar roll på vägen.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Antalya är fullt i ungefär sju månader och lugnt i fem, och skillnaden märks långt innan du når stranden - i flygpriser, köer på flygplatsen och trafiken på D400." },
      { type: "h2", text: "April till maj: fönstret med bäst värde" },
      { type: "p", text: "Vattentemperaturen stiger genom maj, dagstemperaturerna ligger över tjugo grader och kustvägen är tom med sommarmått mätt. Flygen landar på civiliserade tider och terminalen töms snabbt. Det är också då en resa till Alanya eller Kaş är ett nöje snarare än ett uthållighetsprov." },
      { type: "h2", text: "Juni till augusti: toppen" },
      { type: "p", text: "Juli och augusti är varma, fulla och dyra. Antalya flygplats hanterar sin tyngsta trafik, passkontroll och bagage tar som längst och kustvägen bär både semestertrafik och lokala helgresor. Det är då ett fast pris och en flygbevakad hämtning gör mest nytta: inget på vägen är förutsägbart, så det som går att låsa i förväg är värt att låsa." },
      { type: "h2", text: "September till oktober: bästa kompromissen" },
      { type: "p", text: "Havet är som varmast, trängseln tunnas ut vecka för vecka och priserna faller från mitten av september. Många återkommande gäster anser att slutet av september är årets bästa vecka på den här kusten. Transfererna håller åter ungefär sina nominella tider." },
      { type: "h2", text: "November till mars: lågsäsong" },
      { type: "p", text: "Dagstemperaturerna förblir milda, många badhotell stänger och staden, bergen och ruinerna tar över efter kusten. Flygutbudet krymper och ankomsttiderna blir mindre bekväma - vilket är precis när ett förbokat fordon slår improvisation vid terminalen." },
      { type: "h2", text: "Vad säsongen ändrar för din transfer" },
      {
        type: "ul",
        items: [
          "Högsommar: räkna med upp till 45 minuter från landning till att du lämnar terminalen, och längre restider öster om Manavgat.",
          "Mellansäsong: de angivna restiderna är realistiska.",
          "Vinter: färre flyg och fler nattlandningar, så bekräfta flightnumret och låt hämtningen följa det.",
          "Hela året: det fasta priset per fordon ändras inte med säsong, trafik eller tid på dygnet.",
        ],
      },
    ],
    faq: [
      ["Vilken månad är bäst för Antalya?", "Slutet av september ger oftast den bästa kombinationen: havet är som varmast, trängseln har tunnats ut och priserna har börjat falla."],
      ["Är Antalya flygplats fullare på sommaren?", "Betydligt. Räkna med upp till 45 minuter från landning till att du lämnar terminalen i juli och augusti; under mellansäsongen är det ofta hälften."],
      ["Ändras transferpriserna med säsongen?", "Nej. Våra priser är fasta per fordon och ändras inte med säsong, trafik eller tid på dygnet."],
      ["Är Antalya värt ett besök på vintern?", "Ja, för staden, bergen och de arkeologiska platserna snarare än för stranden. Många kusthotell stänger mellan november och mars."],
    ],
  },
};
