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
  "antalya-in-autumn": {
    "slug": "antalya-pa-hosten-saker-att-gora",
    "title": "Antalya i oktober och november: saker att göra på hösten",
    "heading": "Antalya på hösten: vad kan man göra i oktober och november?",
    "description": "Antalya på hösten: varmt hav, lugna stränder, antika ruiner, kanjonvandringar och golf i oktober och november. Väder, vad som har öppet och hur du planerar ankomsten.",
    "excerpt": "Havet är fortfarande varmt, folkmassorna har åkt hem och hettan har gett med sig. Därför är oktober och november Turkiska rivierans bäst bevarade hemlighet.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "De flesta turister lämnar Antalya i slutet av september – och det är precis därför Antalya på hösten fungerar så bra. Havet håller kvar sommarvärmen i flera veckor, dagstemperaturen sjunker till behagliga 20 grader och platserna som är outhärdliga i augusti – ruinerna, kanjonerna, gamla stan – blir resans höjdpunkt."
      },
      {
        "type": "h2",
        "text": "Höstväder i Antalya"
      },
      {
        "type": "table",
        "head": [
          "Månad",
          "Dag / natt",
          "Hav",
          "Hur det känns"
        ],
        "rows": [
          [
            "Oktober",
            "cirka 27 °C / 16 °C",
            "cirka 24 °C",
            "Sommar utan hetta – stranddagar är fortfarande det normala"
          ],
          [
            "November",
            "cirka 21 °C / 11 °C",
            "cirka 21 °C",
            "Soliga förmiddagar, de första regnskurarna, svala kvällar"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Packa för både stranden och kvällen: en lätt jacka räcker i oktober, i november är ett varmare lager och en regnjacka klokt."
      },
      {
        "type": "h2",
        "text": "Fortfarande badsemester: oktober vid kusten"
      },
      {
        "type": "p",
        "text": "I oktober har stränderna i Konyaaltı, Lara, Belek, Side och Alanya fortfarande öppet, vattnet är ofta varmare än luften på morgonen och det är ingen kamp om solstolarna längre. De flesta stora resorthotellen i Belek, Side och Kemer har öppet till slutet av oktober; från november minskar utbudet, så kontrollera hotellets säsong innan du bokar flyg."
      },
      {
        "type": "h2",
        "text": "Antika platser utan hetta"
      },
      {
        "type": "p",
        "text": "Hösten är säsongen för regionens ruiner. Perge och Aspendos ligger en kort avstickare från vägen till Belek och Side, Apollontemplet i Side står vid hamnens kant, och Termessos, högt uppe i bergen bakom staden, är en vandring som ingen bör ge sig på under sommaren. I november kan du ha hela kolonnadgator för dig själv."
      },
      {
        "type": "h2",
        "text": "Natur: kanjoner, vattenfall och Lykiska leden"
      },
      {
        "type": "ul",
        "items": [
          "Düdenvattenfallen: de nedre fallen störtar rakt ut i havet nära Lara, de övre ligger i en park inne i staden.",
          "Köprülükanjonen: forsränningssäsongen pågår oftast in i oktober, med lugnare vatten än på våren.",
          "Lykiska leden: hösten och våren är de två vandringssäsongerna – etapperna kring Kemer, Olympos och Kaş är som bäst nu.",
          "Linbanan till Tahtalı nära Kemer: den klara höstluften ger den bästa utsikten från toppen."
        ]
      },
      {
        "type": "h2",
        "text": "Golf, stadsliv och festivaler"
      },
      {
        "type": "p",
        "text": "Hösten är högsäsong för golf i Belek: banorna är gröna, temperaturen är perfekt och starttiderna fylls av grupper från norra Europa. Inne i staden vaknar Kaleiçis gränder, kaféer och små museer till liv igen när kryssnings- och sommarturisterna har åkt, och Antalyas filmfestival Golden Orange har traditionellt hållits på hösten."
      },
      {
        "type": "h2",
        "text": "Ankomst på hösten"
      },
      {
        "type": "ul",
        "items": [
          "Flygen går fortfarande ofta i oktober; från november glesas tidtabellerna ut och fler plan landar sent på kvällen.",
          "Terminalen är lugnare än på sommaren, så körtiderna till Belek, Side och Alanya ligger nära de angivna.",
          "En förbokad transfer följer ditt flightnummer, så ett försenat kvällsflyg är inget problem.",
          "Våra priser är fasta per fordon och är desamma i oktober som i augusti."
        ]
      }
    ],
    "faq": [
      [
        "Är det tillräckligt varmt för att bada i Antalya i oktober?",
        "Ja. Havet håller oftast runt 24 °C i oktober, varmare än många europeiska hav på sommaren, och stranddagar är det normala hela månaden."
      ],
      [
        "Har hotellen i Antalya öppet i november?",
        "Stadshotell och många resorthotell har öppet, men en del stora kusthotell stänger från november. Kontrollera hotellets säsongsdatum innan du bokar flyg."
      ],
      [
        "Vad kan man göra i Antalya på hösten förutom att ligga på stranden?",
        "Antika platser som Perge, Aspendos och Termessos, Düdenvattenfallen, Köprülükanjonen, vandring på Lykiska leden, golf i Belek och gamla stan Kaleiçi."
      ],
      [
        "Ändras priset för transfern efter sommarsäsongen?",
        "Nej. Priset är fast per fordon och ändras inte med säsong, trafik eller tid på dygnet."
      ]
    ]
  },
  "antalya-in-winter": {
    "slug": "antalya-pa-vintern-saker-att-gora",
    "title": "Antalya på vintern: saker att göra december–februari",
    "heading": "Antalya på vintern: vad kan man göra mellan december och februari?",
    "description": "Antalya på vintern: gamla stan, vattenfall, antika ruiner, skidåkning i Saklıkent, vintergolf och spahotell. Väder, vad som har öppet och hur du tar dig runt.",
    "excerpt": "Milda dagar, snö på bergen och en stad som åter tillhör sina invånare. Vad Antalya har att erbjuda mellan december och februari – och vad det inte har.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Antalya på vintern är lågsäsong, inte stängt. Badorterna vilar, men staden, bergen och de antika platserna har öppet, ljuset är klart och dagarna är ofta soliga och milda. Det är tiden att se regionen som de som bor här ser den – och till priser som sommarturisterna aldrig får."
      },
      {
        "type": "h2",
        "text": "Vinterväder i Antalya"
      },
      {
        "type": "table",
        "head": [
          "Månad",
          "Dag / natt",
          "Hav",
          "Bra att veta"
        ],
        "rows": [
          [
            "December",
            "cirka 16 °C / 7 °C",
            "cirka 19 °C",
            "Årets regnigaste månad, men regnet kommer i skurar mellan soliga dagar"
          ],
          [
            "Januari",
            "cirka 15 °C / 6 °C",
            "cirka 17 °C",
            "Kallaste månaden; snö på Taurusbergens toppar"
          ],
          [
            "Februari",
            "cirka 16 °C / 6 °C",
            "cirka 17 °C",
            "Längre dagar, de första mandelblommorna"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Soliga vintereftermiddagar känns som vår i Norden; kvällarna är svala och inomhus är det inte alltid uppvärmt efter nordisk standard. Ta med lager på lager, en vattentät jacka och bekväma skor för blöta stengator."
      },
      {
        "type": "h2",
        "text": "Staden: Kaleiçi, museer och vattenfall"
      },
      {
        "type": "ul",
        "items": [
          "Kaleiçi, den muromgärdade gamla stan: Hadrianus port, den räfflade minareten Yivli, gamla hamnen och gränder med osmanska hus som i dag är kaféer och boutiquehotell.",
          "Antalyas arkeologiska museum: en av Turkiets främsta arkeologiska samlingar, med statyerna från Perge – ett perfekt besök en regnig dag.",
          "Düden- och Kurşunluvattenfallen: vinterregnen gör dem som mäktigast och mest imponerande.",
          "Strandpromenaderna i Konyaaltı och Lara: långa promenader, cykling och havsutsikt utan sommarhettan."
        ]
      },
      {
        "type": "h2",
        "text": "Antika platser utan köer"
      },
      {
        "type": "p",
        "text": "Perge, Aspendos och Side har öppet året runt, och på vintern delar du dem med en handfull besökare. Phaselis nära Kemer har tre hamnar i en tallskog; Olympos och Çıralı är fridfulla utanför säsong. Termessos ligger i bergen och kan vara kallt, blött eller till och med snöigt, så välj en torr dag. Längre västerut är Sankt Nikolauskyrkan i Demre ett självklart vinterbesök, särskilt runt jul."
      },
      {
        "type": "h2",
        "text": "Skidåkning och hav samma dag"
      },
      {
        "type": "p",
        "text": "Skidorten Saklıkent i Bakırlıbergen ligger cirka 50 km från staden, ungefär en och en halv timme med bil. När det finns tillräckligt med snö, oftast från januari till mars, kan du åka skidor på förmiddagen och promenera längs havet på eftermiddagen. Bergsvägen kan kräva vinterdäck eller snökedjor, så kolla förhållandena innan du åker och be oss om en offert för resan i förväg."
      },
      {
        "type": "h2",
        "text": "Vintergolf, spahotell och långa vistelser"
      },
      {
        "type": "p",
        "text": "Golfbanorna i Belek har öppet hela vintern, och greenfee och hotellpriser ligger klart under nivåerna på hösten och våren. Flera resorthotell i Belek, Lara och Kemer håller spa och inomhuspooler öppna under vintern, och Alanya och Side lockar långliggare från norra Europa som stannar i veckor eller månader för det milda vädret."
      },
      {
        "type": "h2",
        "text": "Längre utflykter"
      },
      {
        "type": "p",
        "text": "Vintern passar bra för de längre utflykterna som är utmattande på sommaren: travertinterrasserna i Pamukkale och ruinerna av Hierapolis, eller Kappadokien i snö, som många besökare anser är den vackraste årstiden där. Båda är långa dagar på vägen, och med ett privat fordon kan du stanna när och var du vill."
      },
      {
        "type": "h2",
        "text": "Ankomst på vintern"
      },
      {
        "type": "ul",
        "items": [
          "Det finns färre direktflyg och fler nattankomster, ofta via Istanbul.",
          "Många kusthotell är stängda, så kontrollera att ditt hotell har öppet de datum du reser.",
          "Taxikön är glesare på natten än på sommaren; en förbokad upphämtning som följer ditt flightnummer är det lugnare alternativet.",
          "Det fasta priset per fordon är detsamma på vintern som på sommaren – inget natt- eller helgdagstillägg."
        ]
      }
    ],
    "faq": [
      [
        "Är Antalya värt att besöka på vintern?",
        "Ja, om du kommer för staden, de antika platserna, naturen och golfen snarare än för att sola. Dagarna är ofta soliga med temperaturer runt 15 °C, och det är inga folkmassor."
      ],
      [
        "Kan man bada i Antalya på vintern?",
        "Havet håller runt 17–19 °C, vilket en del besökare tycker är uppfriskande en solig dag. Många hotell som har öppet på vintern har också uppvärmda inomhuspooler."
      ],
      [
        "Kan man åka skidor nära Antalya?",
        "Ja. Skidorten Saklıkent ligger cirka 50 km från staden. Säsongen beror på snömängden och pågår oftast från januari till mars."
      ],
      [
        "Har hotellen i Antalya öppet på vintern?",
        "Stadshotellen i Antalya och Kaleiçi har öppet året runt, liksom flera resorthotell i Lara, Belek, Kemer, Side och Alanya. Många stora säsongshotell stänger från november till mars."
      ],
      [
        "Kör ni transfer från Antalyas flygplats på vintern?",
        "Ja, året runt, även vid nattankomster och helgdagar, till samma fasta pris per fordon."
      ]
    ]
  },
  "christmas-new-year-antalya": {
    "slug": "jul-och-nyar-i-antalya",
    "title": "Jul och nyårsafton i Antalya: en praktisk guide",
    "heading": "Jul och nyår i Antalya",
    "description": "Fira jul eller nyår i Antalya: väder, vilka hotell som har öppet, galamiddagar, Sankt Nikolaus i Demre och resan till och från flygplatsen de mest hektiska nätterna.",
    "excerpt": "Soliga dagar, nyårsgala vid havet och Sankt Nikolaus stad två och en halv timme bort. Så planerar du helgerna i Antalya – och så tar du dig fram på nyårsnatten.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Jul och nyår i Antalya är en av få vintertoppar i regionen. Familjer som flyr den nordiska vintern, sällskap som firar nyårsafton och besökare som kombinerar helgerna med några dagar i mild sol anländer alla under samma två veckor – medan stora delar av kusten annars har lågsäsong."
      },
      {
        "type": "h2",
        "text": "Vad kan man vänta sig i slutet av december?"
      },
      {
        "type": "p",
        "text": "Dagarna når oftast runt 15–16 °C och är ofta soliga, även om december också är årets regnigaste månad. Julen är ingen allmän helgdag i Turkiet, så affärer, restauranger och sevärdheter har öppet som vanligt den 25 december. Nyårsafton firas däremot flitigt, och den 1 januari är allmän helgdag."
      },
      {
        "type": "h2",
        "text": "Vilka hotell har öppet?"
      },
      {
        "type": "p",
        "text": "Stadshotellen i Antalya och Kaleiçi har öppet året runt, och flera resorthotell i Lara, Belek, Kemer, Side och Alanya öppnar särskilt för helgerna med julmiddag och nyårsgala. Program, klädkod och galatillägg varierar mycket, så fråga hotellet vad som ingår innan du bokar. Rummen på de öppna resorthotellen tar slut tidigt för de här datumen."
      },
      {
        "type": "h2",
        "text": "Jul: Sankt Nikolaus stad"
      },
      {
        "type": "p",
        "text": "Den historiske Sankt Nikolaus, biskopen bakom legenden om jultomten, levde i Myra – dagens Demre, ungefär två och en halv timme väster om Antalya. Sankt Nikolauskyrkan och Myras klipphuggna lykiska gravar blir en minnesvärd utflykt i juletid, som kan kombineras med ett stopp i Kaş eller kustvägen kring Kumluca."
      },
      {
        "type": "h2",
        "text": "Nyårsafton i Antalya"
      },
      {
        "type": "ul",
        "items": [
          "Hotellgalor: middag, livemusik och nedräkning, oftast med fast meny och tillägg.",
          "Staden: restaurangerna i Kaleiçi och runt marinan är fullsatta; boka bord i förväg.",
          "Lara och Konyaaltı: beachklubbar och restauranger med havsutsikt ordnar egna fester.",
          "Fyrverkerier syns längs strandpromenaden, men programmet ändras från år till år."
        ]
      },
      {
        "type": "h2",
        "text": "Att ta sig runt de mest hektiska nätterna"
      },
      {
        "type": "p",
        "text": "På nyårsafton och de tidiga timmarna den 1 januari är det svårt att få tag på taxi, och appar och taxiköer är överbelastade precis när alla vill hem. Om du firar någon annanstans än på hotellet – i staden, på en restaurang eller i en väns villa – boka hemresan i förväg med en fast upphämtningstid."
      },
      {
        "type": "h2",
        "text": "Ankomst och avresa under helgerna"
      },
      {
        "type": "ul",
        "items": [
          "Flygen runt den 20 december och den 2 januari är vinterns mest belagda; boka tidigt.",
          "Många flyg under helgerna landar på kvällen eller natten – en upphämtning som följer ditt flightnummer gör att du slipper vänta i terminalen.",
          "Familjer med julklappar och vinterbagage bör ange antalet resväskor, så att vi skickar rätt fordon.",
          "Vårt fasta pris per fordon har inget helgdags- eller nyårstillägg."
        ]
      }
    ],
    "faq": [
      [
        "Hur är vädret i Antalya i juletid?",
        "Milt: oftast runt 15–16 °C på dagen och 6–8 °C på natten, med soliga perioder mellan skurarna. Det är inget strandväder, men ofta behagligt för promenader och sightseeing."
      ],
      [
        "Firas jul i Antalya?",
        "Julen är ingen allmän helgdag i Turkiet, men många hotell med internationella gäster ordnar julmiddag. Nyårsafton firas flitigt och den 1 januari är allmän helgdag."
      ],
      [
        "Var ligger Sankt Nikolauskyrkan?",
        "I Demre, antikens Myra, ungefär två och en halv timmes bilresa väster om Antalya. Den har öppet för besökare året runt."
      ],
      [
        "Kan jag boka transfer på nyårsnatten?",
        "Ja. Vi rekommenderar att du bokar hemresan med en fast upphämtningstid, eftersom det är mycket svårt att få tag på taxi efter midnatt. Det fasta priset per fordon har inget helgdagstillägg."
      ]
    ]
  },
  "wintering-in-antalya": {
    "slug": "overvintra-i-alanya-och-antalya",
    "title": "Övervintra i Antalya och Alanya: guide för långliggare",
    "heading": "Övervintra i Antalya: en guide för långa vistelser",
    "description": "Övervintra i Alanya, Side eller Antalya på Turkiska rivieran: väder, boende, sjukvård och hur du anländer med mycket bagage – det här behöver långliggare veta.",
    "excerpt": "Veckor eller månader av milt väder i stället för en nordisk vinter. Det här bör långliggare veta innan de övervintrar i Alanya, Side eller Antalya.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Varje vinter byter tusentals besökare från Tyskland, Skandinavien, Nederländerna, Ryssland och Polen grå himmel mot Turkiska rivieran i veckor eller månader. Att övervintra i Alanya, Side eller Antalya lockar med milda temperaturer, långa strandpromenader och lägre levnadskostnader än hemma – orterna hör till Medelhavets populäraste vintermål."
      },
      {
        "type": "h2",
        "text": "Därför ska du övervintra här"
      },
      {
        "type": "ul",
        "items": [
          "Milt klimat: vinterdagar runt 15–17 °C, ofta soligt, sällan frost vid kusten.",
          "Dagsljus: märkbart fler soltimmar än i norra och centrala Europa.",
          "Utrymme: strandpromenader, stränder och gamla stadskärnor utan sommarens folkmassor.",
          "Infrastruktur: affärer, marknader, restauranger och privata sjukhus har öppet året runt i de större orterna."
        ]
      },
      {
        "type": "h2",
        "text": "Välj var du ska bo"
      },
      {
        "type": "table",
        "head": [
          "Ort",
          "Passar för",
          "Avstånd från flygplatsen"
        ],
        "rows": [
          [
            "Antalya stad",
            "Stadsliv, kultur, museer, all service runt hörnet",
            "cirka 15–30 minuter"
          ],
          [
            "Side / Manavgat",
            "En lugn gammal stadskärna, långa stränder, platta promenader",
            "cirka 1 timme"
          ],
          [
            "Alanya",
            "Den största kolonin av långliggare, strandpromenader, aktivt vinterliv",
            "cirka 1 timme 45 minuter"
          ],
          [
            "Kemer",
            "Berg och hav, vandring, en mindre semesterort",
            "cirka 1 timme"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Alanya och grannområden som Mahmutlar och Oba har den största vinterkolonin av långliggare, med klubbar, aktiviteter och restauranger som är livliga hela vintern. Side är lugnare; Antalya passar dig som vill bo i en riktig stad."
      },
      {
        "type": "h2",
        "text": "Boende: hotell och lägenheter"
      },
      {
        "type": "p",
        "text": "En del hotell i Alanya, Side och Antalya erbjuder särskilda långtidspriser för vistelser på fyra veckor eller mer, ofta med halvpension. En hyrd lägenhet ger mer utrymme och frihet; kontrollera att den har värme eller luftkonditionering med värmefunktion, eftersom turkiska kusthus är byggda för sommaren och kan kännas kalla på vinterkvällarna."
      },
      {
        "type": "h2",
        "text": "Vardagsliv på vintern"
      },
      {
        "type": "ul",
        "items": [
          "Veckomarknader i varje stadsdel med färsk frukt och grönsaker – vintern är citrussäsong.",
          "Promenader och cykling längs strandpromenaderna i Alanya, Side, Lara och Konyaaltı.",
          "Vandring vid foten av Taurusbergen och på Lykiska leden under torra dagar.",
          "Dagsutflykter till antika platser, Manavgatvattenfallet eller Antalyas gamla stad.",
          "Privata sjukhus och kliniker i Antalya och Alanya med avdelningar för internationella patienter."
        ]
      },
      {
        "type": "h2",
        "text": "Papper och praktiska frågor"
      },
      {
        "type": "p",
        "text": "Inreseregler och hur länge du får stanna utan uppehållstillstånd beror på ditt medborgarskap och ändras då och då, så kontrollera gällande regler hos officiella turkiska myndigheter innan du reser. En reseförsäkring som täcker en lång vistelse utomlands rekommenderas starkt."
      },
      {
        "type": "h2",
        "text": "Ankomst med bagage för flera månader"
      },
      {
        "type": "p",
        "text": "Långliggare reser med mer än en semesterresväska. Berätta hur många resväskor och extra saker du tar med – cyklar, rollatorer eller kartonger – så skickar vi en Mercedes Vito eller vid behov en Sprinter. Priset är fast per fordon, så extra bagage räknas in när du bokar i stället för att debiteras vid trottoarkanten. Chauffören hjälper till med i- och urlastning vid dörren."
      }
    ],
    "faq": [
      [
        "Var är det bäst att övervintra på Turkiska rivieran?",
        "Alanya har den största kolonin av långliggare och det livligaste vinterlivet; Side är lugnare; Antalya har all service som en storstad erbjuder. Alla tre har milda vintrar."
      ],
      [
        "Hur varmt är det i Antalya på vintern?",
        "Dagstemperaturen ligger oftast runt 15–17 °C från december till februari, med nätter runt 6–8 °C. Frost vid kusten är sällsynt."
      ],
      [
        "Finns det hotellerbjudanden för långa vistelser på vintern?",
        "Ja. Flera hotell i Alanya, Side och Antalya erbjuder rabatterade månads- eller långtidspriser på vintern. Fråga hotellet direkt om vistelser på fyra veckor eller mer."
      ],
      [
        "Kan man ta med mycket bagage på flygplatstransfern?",
        "Ja. Ange antalet resväskor och extra saker när du bokar, så skickar vi ett fordon med tillräckligt med plats. Priset gäller per fordon, utan avgift per resväska."
      ]
    ]
  },
  "antalya-in-spring": {
    "slug": "antalya-pa-varen-saker-att-gora",
    "title": "Antalya på våren: saker att göra mars–maj",
    "heading": "Antalya på våren: vad kan man göra mellan mars och maj?",
    "description": "Antalya på våren: apelsinblom, vandring på Lykiska leden, forsränning, påsklov och årets första stranddagar. Väder månad för månad och vad du kan vänta dig vid ankomst.",
    "excerpt": "Apelsinblom på gatorna, snö på topparna och ett hav som blir varmare vecka för vecka. Därför är våren säsongen för aktiv semester kring Antalya.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Våren kommer tidigt till Turkiska rivieran, och Antalya på våren är något alldeles särskilt. Redan i mars blommar apelsinträden, Taurusbergen har fortfarande snö och dagarna är tillräckligt varma för att sitta ute. Det är den bästa säsongen för vandring, cykling och upptäcktsfärder, och i maj börjar årets första stranddagar."
      },
      {
        "type": "h2",
        "text": "Vårväder i Antalya"
      },
      {
        "type": "table",
        "head": [
          "Månad",
          "Dag / natt",
          "Hav",
          "Bäst för"
        ],
        "rows": [
          [
            "Mars",
            "cirka 19 °C / 8 °C",
            "cirka 17 °C",
            "Sightseeing, vandring, blomning"
          ],
          [
            "April",
            "cirka 22 °C / 11 °C",
            "cirka 18 °C",
            "Vandring, forsränning, påsklov"
          ],
          [
            "Maj",
            "cirka 26 °C / 15 °C",
            "cirka 21 °C",
            "Årets första stranddagar, alla aktiviteter"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Apelsinblom och staden på våren"
      },
      {
        "type": "p",
        "text": "På våren doftar Antalya apelsinblom. Staden firar det med apelsinblomskarnevalen, en gatufestival som hålls på våren kring Kaleiçi och centrum. Det är också den bästa tiden att utforska gamla stan, Antalyas arkeologiska museum och klipporna vid Konyaaltı och Lara till fots innan sommarhettan kommer."
      },
      {
        "type": "h2",
        "text": "Aktiv semester: vandring, forsränning och cykling"
      },
      {
        "type": "ul",
        "items": [
          "Lykiska leden: våren är den populäraste vandringssäsongen, med vilda blommor längs etapperna nära Kemer, Olympos och Kaş.",
          "Köprülükanjonen: forsränningssäsongen startar oftast i april, med livligt vatten från snösmältningen.",
          "Linbanan till Tahtalı: snö på toppen och blommande ängar nedanför, ofta i samma vy.",
          "Cykling: lugna vägar och milda temperaturer kring Belek, Side och Taurusbergens utlöpare.",
          "Golf: våren är den andra högsäsongen på banorna i Belek."
        ]
      },
      {
        "type": "h2",
        "text": "Antika platser i den gröna säsongen"
      },
      {
        "type": "p",
        "text": "Perge, Aspendos, Side, Phaselis och Termessos är som vackrast på våren, när ruinerna omges av grönt gräs och vilda blommor. Längre utflykter fungerar också bra: Pamukkale och Kappadokien har behagliga temperaturer, och ballongturer över Kappadokien går ofta på våren när vädret är stabilt."
      },
      {
        "type": "h2",
        "text": "Påsk och vårlov"
      },
      {
        "type": "p",
        "text": "Påsken och vårloven i Tyskland, Nederländerna, Storbritannien och Skandinavien för med sig den första vågen av barnfamiljer. Fler säsongshotell öppnar från april, antalet flyg ökar och i maj är de flesta kusthotell i full drift. Boka både hotell och transfer tidigt om du reser under påsken."
      },
      {
        "type": "h2",
        "text": "Ankomst på våren"
      },
      {
        "type": "ul",
        "items": [
          "I mars är en del resorthotell fortfarande stängda; från april växer utbudet snabbt.",
          "Terminalen och vägarna är lugna, så de angivna körtiderna är realistiska.",
          "Vandrings- och golfutrustning, cyklar och bilbarnstolar bör anges när du bokar.",
          "Priset är fast per fordon och ändras inte med säsongen."
        ]
      }
    ],
    "faq": [
      [
        "Är det tillräckligt varmt för stranden i Antalya på våren?",
        "Från maj, ja: dagarna når runt 26 °C och havet runt 21 °C. I mars och april är det tillräckligt varmt för att sitta i solen, men havet är fortfarande svalt för de flesta badare."
      ],
      [
        "När är apelsinblomskarnevalen i Antalya?",
        "Den hålls på våren, när stadens apelsinträd blommar. Datumen ändras varje år, så kolla stadens officiella besked innan du planerar resan efter den."
      ],
      [
        "Är våren en bra tid att vandra Lykiska leden?",
        "Ja. Våren och hösten är de två bästa vandringssäsongerna; på våren är stigarna gröna och fulla av vilda blommor, och temperaturerna är behagliga."
      ],
      [
        "Har hotellen i Antalya öppet i mars?",
        "Stadshotell och en del resorthotell har öppet. Många säsongshotell öppnar under april, och i maj är större delen av kusten i full drift."
      ]
    ]
  },
  "cappadocia-winter-trip": {
    "slug": "kappadokien-pa-vintern-fran-antalya",
    "title": "Kappadokien på vintern från Antalya: snö, ballonger och vägen dit",
    "heading": "Kappadokien på vintern: en resa från Antalya",
    "description": "Kappadokien på vintern från Antalya: snö, väder, luftballonger, grotthotell, vad du ska se och hur den 540 km långa bilresan via Konya fungerar på vintern.",
    "excerpt": "Älvskorstenar under snö och ballonger över en vit dal. Så kombinerar du en vintervistelse i Antalya med Kappadokien – och så är vägen dit på vintern.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Kappadokien på vintern är ett av Turkiets mest fotograferade landskap: älvskorstenar och dalar under snö, grotthotell med sprakande brasor och, på klara morgnar, ballonger som stiger över ett vitt landskap. Från Antalya är det en lång men vacker bilresa – och ett naturligt tillägg till en vintervistelse vid kusten."
      },
      {
        "type": "h2",
        "text": "Vintervädret: ett helt annat klimat än vid kusten"
      },
      {
        "type": "p",
        "text": "Kappadokien ligger på en högplatå på runt 1 000 meter eller mer, så vintern där är en riktig vinter. Dagtemperaturen ligger ofta kring nollstrecket, nätterna är långt under noll och snö är vanligt från december till februari. Packa en ordentlig vinterjacka, handskar, mössa och vattentäta skor – kläder som passar Antalya i januari räcker inte här."
      },
      {
        "type": "table",
        "head": [
          "",
          "Antalyakusten",
          "Kappadokien"
        ],
        "rows": [
          [
            "Typisk vinterdag",
            "cirka 15 °C",
            "runt 0–5 °C"
          ],
          [
            "Vinternätter",
            "cirka 6–8 °C",
            "ofta minusgrader"
          ],
          [
            "Snö",
            "bara på bergstopparna",
            "vanligt från december till februari"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Luftballonger på vintern"
      },
      {
        "type": "p",
        "text": "Ballongerna flyger året runt när vädret tillåter, och en soluppgångsflygning över snötäckta dalar är bilden många reser dit för. Vintern innebär dock fler inställda flygningar på grund av vind, dimma eller snö, och myndigheterna fattar beslutet tidigt varje morgon. Planera minst två nätter i Kappadokien, så att en inställd flygning inte betyder att du missar upplevelsen helt."
      },
      {
        "type": "h2",
        "text": "Vad du kan se på vintern"
      },
      {
        "type": "ul",
        "items": [
          "Göreme friluftsmuseum: klipphuggna kyrkor med fresker, lugnare på vintern än någon annan tid på året.",
          "Underjordiska städer som Derinkuyu och Kaymaklı: flera våningar djupa och med en behaglig, jämn temperatur oavsett vädret ute.",
          "Uçhisars borg och utsiktsplatserna ovanför Göreme: de bästa platserna för snöiga panoramavyer.",
          "Korta promenader i Rosendalen, Röda dalen och Kärleksdalen på torra, klara dagar – stigarna kan vara isiga efter snöfall.",
          "Grotthotell: många har värme och öppen spis, och det är på vintern de känns som mest speciella."
        ]
      },
      {
        "type": "h2",
        "text": "Vägen från Antalya"
      },
      {
        "type": "p",
        "text": "Sträckan är cirka 540 km och tar oftast 7 till 8 timmar: över Taurusbergen och vidare över högplatån via Konya. Konya, med Mevlanamuseet, är ett naturligt stopp för att bryta resan. På vintern kan det ligga snö och is på bergsavsnittet; vägarna plogas, men ett fordon med vinterutrustning och en förare som kan vägen gör skillnaden mellan en lång dag och en stressig."
      },
      {
        "type": "h2",
        "text": "Så planerar du resan"
      },
      {
        "type": "ul",
        "items": [
          "Räkna med minst två nätter, helst tre, för att ha marginal för inställda ballongflygningar och korta vinterdagar.",
          "Åk från Antalya på morgonen för att korsa bergen i dagsljus.",
          "Kombinera resan med en vistelse vid kusten: några dagar i Antalya eller Side och sedan Kappadokien, eller tvärtom.",
          "Boka grotthotellet och eventuell ballongflygning i god tid inför jul och nyår."
        ]
      },
      {
        "type": "h2",
        "text": "Transfer mellan Antalya och Kappadokien"
      },
      {
        "type": "p",
        "text": "Vi kör privata transfers från Antalya flygplats och från hotell längs kusten till Kappadokien, enkel resa eller med retur ett senare datum. Priset är fast per fordon, du kan stanna för foton, måltider och ett besök i Konya, och det finns inga andra passagerare att vänta på. Uppge ditt hotell och dina datum när du bokar."
      }
    ],
    "faq": [
      [
        "Hur långt är det från Antalya till Kappadokien?",
        "Cirka 540 km på väg. Resan via Konya tar oftast 7 till 8 timmar, lite längre med stopp eller vid snö."
      ],
      [
        "Är det värt att besöka Kappadokien på vintern?",
        "Ja. Snö på älvskorstenarna, lugna sevärdheter och mysiga grotthotell gör vintern till en av de vackraste tiderna där. Ta med varma kläder: det är mycket kallare än vid kusten."
      ],
      [
        "Flyger luftballongerna i Kappadokien på vintern?",
        "Ja, så länge vädret tillåter. Inställda flygningar är vanligare på vintern, så planera minst två nätter för att få en andra chans."
      ],
      [
        "Kan jag åka privat transfer från Antalya till Kappadokien?",
        "Ja. Vi erbjuder privata transfers från Antalya flygplats och hotell vid kusten till Kappadokien, enkel resa eller tur och retur, till fast pris per fordon."
      ]
    ]
  },
  "belek-winter-golf": {
    "slug": "vintergolf-i-belek",
    "title": "Vintergolf i Belek: spela på Turkiska rivieran från november till mars",
    "heading": "Vintergolf i Belek",
    "description": "Därför är Belek ett resmål för vintergolf: vädret från november till mars, banornas skick, lägre greenfee, vad du ska packa och hur du tar dig till Belek med golfbagar.",
    "excerpt": "Milda dagar, gröna fairways och lugnare starttider. Det här bör golfare veta om att spela i Belek mellan november och mars, när banorna hemma är stängda.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "När banorna i norra Europa är frusna, vattensjuka eller stängda fortsätter spelet i Belek. Samlingen av mästerskapsbanor 45 km öster om Antalya flygplats håller öppet hela vintern, och månaderna november till mars har blivit en egen vintergolfsäsong för golfare som inte vill göra uppehåll mellan oktober och april."
      },
      {
        "type": "h2",
        "text": "Så är vädret på banan"
      },
      {
        "type": "table",
        "head": [
          "Månad",
          "Typisk dag",
          "På banan"
        ],
        "rows": [
          [
            "November",
            "cirka 21 °C",
            "Utmärkta förhållanden, fortfarande högsäsong på hösten"
          ],
          [
            "December – januari",
            "cirka 15–16 °C",
            "Milt och ofta soligt, med några regndagar"
          ],
          [
            "Februari",
            "cirka 16 °C",
            "Dagarna blir längre, färre regndagar"
          ],
          [
            "Mars",
            "cirka 19 °C",
            "Början på vårens högsäsong"
          ]
        ]
      },
      {
        "type": "p",
        "text": "De flesta vinterdagar går det bra att spela i en tunn tröja. Regnet kommer oftast i korta skurar snarare än hela veckor, och banorna är byggda för att dränera snabbt. Morgnarna kan vara svala och ljuset försvinner sent på eftermiddagen, så starttiderna ligger oftast tidigare än på sommaren."
      },
      {
        "type": "h2",
        "text": "Därför lönar sig vintern"
      },
      {
        "type": "ul",
        "items": [
          "Greenfee och hotellpriser är generellt lägre i december, januari och februari än på hösten och våren.",
          "Startlistorna är mindre fulla, så rundorna går snabbare och önskade tider är lättare att få.",
          "Flera golfhotell håller öppet hela vintern, många med inomhuspool och spa för eftermiddagen.",
          "Korta flyg från större delen av Europa gör en långhelg lika realistisk som en hel vecka."
        ]
      },
      {
        "type": "h2",
        "text": "Banor och hotell på vintern"
      },
      {
        "type": "p",
        "text": "Alla banor och hotell i Belek har inte samma öppettider på vintern, och skötsel som håltagning eller eftersådd planeras ibland till de lugna månaderna. Fråga när du bokar vilka banor som är öppna under dina datum och om något underhåll är inplanerat. Golfhotellen ordnar oftast starttider och transport till sina partnerbanor."
      },
      {
        "type": "h2",
        "text": "Vad du ska packa för vintergolf"
      },
      {
        "type": "ul",
        "items": [
          "Lager på lager: ett underställ, en tröja och en vindtät jacka för svala morgnar.",
          "Regnjacka och regnbyxor för en och annan skur.",
          "Vintervantar eller tumvantar mellan slagen, plus vanliga golfhandskar.",
          "Solskydd: vintersolen är fortfarande stark på klara dagar."
        ]
      },
      {
        "type": "h2",
        "text": "Till Belek med golfbagar"
      },
      {
        "type": "p",
        "text": "Från Antalya flygplats till Belek tar det 35 till 40 minuter med bil, och på vintern är terminalen lugn, så en eftermiddagsrunda på ankomstdagen är ofta realistisk. Priset är fast per fordon, inte per bag: som regel tar en Mercedes Vito fyra spelare med fyra golfbagar och deras bagage, och större grupper åker i en Sprinter. Uppge antalet golfbagar när du bokar."
      }
    ],
    "faq": [
      [
        "Kan man spela golf i Belek på vintern?",
        "Ja. Banorna i Belek håller öppet hela vintern, med typiska dagtemperaturer runt 15–16 °C i december och januari, och de flesta dagar går det bra att spela."
      ],
      [
        "Är golf billigare i Belek på vintern?",
        "Greenfee och hotellpriser är generellt lägre i december, januari och februari än under högsäsongerna på hösten och våren. Exakta priser beror på bana och hotell."
      ],
      [
        "Vilken månad är bäst för golf i Belek?",
        "Oktober–november och mars–april är de stora golfmånaderna. Vintern är lugnare och billigare, med något svalare dagar."
      ],
      [
        "Kostar golfbagar extra på transfern?",
        "Nej. Priset är fast per fordon. För fler bagar sätter vi in ett större fordon, och det priset ser du när du bokar."
      ]
    ]
  },
  "saklikent-ski-antalya": {
    "slug": "skidakning-nara-antalya-saklikent",
    "title": "Skidåkning nära Antalya: guide till skidorten Saklıkent",
    "heading": "Skidåkning nära Antalya: skidorten Saklıkent",
    "description": "Skidåkning nära Antalya i Saklıkent: var det ligger, hur lång resan är, när säsongen pågår, vad som väntar i backen och hur du kombinerar skidor och hav på en dag.",
    "excerpt": "Åk skidor på förmiddagen och promenera vid havet på eftermiddagen. En praktisk guide till Saklıkent, Antalyas egen skidort, och hur du tar dig dit från kusten.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Få semesterorter låter dig åka skidor och promenera vid havet samma dag. Antalya gör det: skidorten Saklıkent ligger i Bakırlıbergen, cirka 50 km från staden, och en fin vinterdag kan du stå i backen på morgonen och vara tillbaka vid strandpromenaden till solnedgången."
      },
      {
        "type": "h2",
        "text": "Var Saklıkent ligger"
      },
      {
        "type": "p",
        "text": "Skidorten ligger på runt 1 900 meters höjd på sluttningarna av Bakırlıbergen, väster om Antalya. Resan från staden tar ungefär en och en halv timme och klättrar från apelsinlundar genom tallskog och upp till snön. På klara dagar når utsikten från toppen ända ner till kusten och havet."
      },
      {
        "type": "h2",
        "text": "När säsongen pågår"
      },
      {
        "type": "p",
        "text": "Skidsäsongen beror helt på snöfallet och pågår oftast från januari till mars. Vissa vintrar börjar den tidigare eller slutar tidigare, så kolla aktuellt snöläge och liftstatus innan du planerar en dag kring den."
      },
      {
        "type": "h2",
        "text": "Vad som väntar i backen"
      },
      {
        "type": "ul",
        "items": [
          "En liten, avslappnad skidort – perfekt för nybörjare, familjer och en skiddag under en badsemester snarare än en hel skidvecka.",
          "Skid- och snowboardutrustning går oftast att hyra på plats; kolla öppettiderna innan du åker.",
          "Pulkaåkning och lek i snön är populärt bland familjer, särskilt på helgerna.",
          "Helgerna är fulla av lokala besökare; vardagar är det betydligt lugnare."
        ]
      },
      {
        "type": "h2",
        "text": "Skidor och hav på en dag"
      },
      {
        "type": "ul",
        "items": [
          "Åk från kusten tidigt på morgonen för att vara framme när liftarna öppnar.",
          "Åk skidor eller lek i snön till tidig eftermiddag.",
          "Kör ner igen för en sen lunch i Kaleiçi eller en promenad längs Konyaaltıstranden.",
          "Ta med ombyte: temperaturskillnaden mellan backen och kusten kan vara 15 grader eller mer."
        ]
      },
      {
        "type": "h2",
        "text": "Att ta sig dit: bergsvägen på vintern"
      },
      {
        "type": "p",
        "text": "Det finns ingen reguljär kollektivtrafik till skidorten, och på sista biten av bergsvägen kan det ligga snö och is. Vinterdäck eller snökedjor kan krävas. En privat transfer tar dig från ditt hotell i Antalya, Kemer, Belek eller Side till backen och tillbaka, och du bestämmer själv hur länge du stannar på berget. Det här är inte en av våra standardrutter, så skicka oss hotell, datum och gruppstorlek så ger vi dig ett fast pris per fordon."
      },
      {
        "type": "h2",
        "text": "Fler skidalternativ från Antalya"
      },
      {
        "type": "p",
        "text": "För en längre skidresa är Davraz nära Isparta en större skidort med fler nedfarter, ungefär två och en halv till tre timmar från Antalya med bil. Saklıkent är fortfarande det enklaste valet för en enstaka snödag under en vistelse vid kusten."
      }
    ],
    "faq": [
      [
        "Kan man åka skidor nära Antalya?",
        "Ja. Skidorten Saklıkent ligger i Bakırlıbergen, cirka 50 km från Antalya stad, ungefär en och en halv timme med bil."
      ],
      [
        "När är skidsäsongen i Saklıkent?",
        "Det beror på snöfallet. Säsongen pågår oftast från januari till mars; kolla aktuella förhållanden innan du åker."
      ],
      [
        "Kan man åka skidor och bada samma dag i Antalya?",
        "Du kan åka skidor på förmiddagen och vara vid havet på eftermiddagen. Vinterbad är för de modiga: havet håller runt 17 °C."
      ],
      [
        "Hur tar jag mig till Saklıkent från mitt hotell?",
        "Det finns ingen reguljär kollektivtrafik. Vi kan ge dig ett pris på en privat transfer från ditt hotell till skidorten och tillbaka, till fast pris per fordon."
      ]
    ]
  },
  "pamukkale-trip-from-antalya": {
    "slug": "pamukkale-fran-antalya-dagsutflykt",
    "title": "Pamukkale från Antalya: dagsutflykt eller övernattning, och när du ska åka",
    "heading": "Pamukkale från Antalya: så planerar du resan",
    "description": "Planera en utflykt från Antalya till Pamukkale: avstånd och restid, dagsutflykt eller övernattning, travertinerna, Hierapolis, Antika poolen och bästa säsongen.",
    "excerpt": "Vita travertinterrasser, en romersk stad på kullen och en pool bland antika kolonner. Så besöker du Pamukkale från Antalya utan att sitta hela dagen på en turistbuss.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Pamukkale är en av Turkiets mest kända sevärdheter: vita travertinterrasser fyllda med varmt, mineralrikt vatten och ovanför dem ruinerna av den romerska staden Hierapolis. Från Antalya till Pamukkale är det cirka 245 km med bil, ungefär tre till tre och en halv timme i vardera riktningen – nära nog för en dagsutflykt, men så långt att en övernattning gör besöket betydligt mer avslappnat."
      },
      {
        "type": "h2",
        "text": "Att se i Pamukkale"
      },
      {
        "type": "ul",
        "items": [
          "Travertinerna: gå barfota längs terrasserna genom grunt, varmt vatten – skor är inte tillåtna på den vita ytan.",
          "Hierapolis: en stor romersk stad med teater, en monumental huvudgata och en av Anatoliens största antika begravningsplatser.",
          "Antika poolen: bada i varmt termalvatten bland nedfallna antika kolonner (separat biljett).",
          "Hierapolis arkeologiska museum: fynd från platsen, inrymt i de forna romerska baden.",
          "Laodikeia: en kort bilresa bort, ännu en stor antik stad med betydligt färre besökare."
        ]
      },
      {
        "type": "h2",
        "text": "Dagsutflykt eller övernattning?"
      },
      {
        "type": "table",
        "head": [
          "",
          "Dagsutflykt",
          "Med övernattning"
        ],
        "rows": [
          [
            "Restid",
            "6–7 timmar på en dag",
            "Uppdelat på två dagar"
          ],
          [
            "Tid på plats",
            "3–4 timmar, oftast mitt på dagen",
            "Sen eftermiddag och tidig morgon"
          ],
          [
            "Trängsel",
            "Kommer samtidigt som turistbussarna",
            "Solnedgång och morgon med betydligt färre människor"
          ],
          [
            "Passar",
            "Resenärer med ont om tid",
            "Familjer, fotografer och alla som vill bada"
          ]
        ]
      },
      {
        "type": "p",
        "text": "De flesta gruppturer kommer fram mitt på dagen, när terrasserna är som mest välbesökta och den vita ytan på sommaren är bländande och het. Om du övernattar i Pamukkale eller i kurorten Karahayıt ser du travertinerna i solnedgången och igen i morgonens lugn."
      },
      {
        "type": "h2",
        "text": "Bästa säsongen för Pamukkale"
      },
      {
        "type": "p",
        "text": "Vår och höst är de behagligaste årstiderna: milda temperaturer för att vandra runt i Hierapolis och skönt vatten på terrasserna. På vintern är det svalt och ibland frost, men det varma vattnet ångar i den kalla luften och platsen är som lugnast. I juli och augusti kan middagshettan och bländningen från de vita terrasserna vara intensiv – åk tidigt eller sent på dagen."
      },
      {
        "type": "h2",
        "text": "På vägen: Saldasjön och Taurusbergen"
      },
      {
        "type": "p",
        "text": "Vägen klättrar från kusten över Taurusbergen och genom sjödistriktet. Saldasjön, med sina vita stränder och turkosa vatten, är en kort avstickare och ett populärt fotostopp. Med ett privat fordon bestämmer du själv var och hur länge ni stannar – något en bussutflykt inte kan erbjuda."
      },
      {
        "type": "h2",
        "text": "Privat transfer till Pamukkale"
      },
      {
        "type": "p",
        "text": "Vi kör privata transfers från Antalyas flygplats och från hotell längs kusten till Pamukkale, enkel resa eller med återresa ett senare datum. Priset är fast per fordon, så för en familj eller ett litet sällskap är det ofta jämförbart med flera biljetter till en bussutflykt – utan hotellupphämtningar, fast schema eller shoppingstopp."
      }
    ],
    "faq": [
      [
        "Hur långt är det från Antalya till Pamukkale?",
        "Cirka 245 km med bil. Resan tar oftast tre till tre och en halv timme i vardera riktningen."
      ],
      [
        "Kan man besöka Pamukkale på en dagsutflykt från Antalya?",
        "Ja, men det innebär 6–7 timmar på vägen på en dag. En övernattning i Pamukkale eller Karahayıt gör besöket mer avslappnat och låter dig se terrasserna utan folkmassorna."
      ],
      [
        "Kan man bada i Pamukkale?",
        "Du kan gå barfota genom de grunda bassängerna på travertinerna. Att simma går bra i Antika poolen, som har varmt termalvatten och kräver separat biljett."
      ],
      [
        "Vilken tid på året är bäst för att besöka Pamukkale?",
        "Vår och höst är behagligast. Vintern är lugn och stämningsfull; på sommaren är det bäst att besöka platsen tidigt på morgonen eller sent på eftermiddagen."
      ]
    ]
  },
  "demre-myra-st-nicholas": {
    "slug": "demre-myra-sankt-nikolaus-kyrka",
    "title": "Demre och Myra: besök Sankt Nikolaus kyrka från Antalya",
    "heading": "Demre, Myra och Sankt Nikolaus kyrka",
    "description": "En utflykt från Antalya till Demre, antikens Myra: Sankt Nikolaus kyrka, lykiska klippgravar, Andriake och Kekova, med restider och tips för ett besök på vintern eller i jul.",
    "excerpt": "Den riktiga jultomtens hemstad ligger två och en halv timme från Antalya. Vad du ska se i Demre och Myra, och hur du gör en heldag av det längs kusten.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Långt innan han blev jultomten var Sankt Nikolaus biskop i Myra, en lykisk stad vid kusten väster om Antalya. I dag heter orten Demre, och Sankt Nikolaus kyrka där han verkade, de lykiska klippgravarna och den antika hamnen gör den till en av de mest givande dagsutflykterna från Antalya – särskilt i december."
      },
      {
        "type": "h2",
        "text": "Vem var Sankt Nikolaus av Myra?"
      },
      {
        "type": "p",
        "text": "Nikolaus levde på 300-talet och blev känd för sin hemliga generositet, särskilt mot barn och fattiga. Hans festdag, den 6 december, firas fortfarande runt om i Europa, och legenderna om honom växte under århundradena till figuren Santa Claus, jultomten. Myra, där han var biskop, blev en viktig pilgrimsort."
      },
      {
        "type": "h2",
        "text": "Att se i Demre"
      },
      {
        "type": "ul",
        "items": [
          "Sankt Nikolaus kyrka: en bysantinsk kyrka med fresker, mosaikgolv och den sarkofag som traditionellt förknippas med helgonet.",
          "Klippgravarna i Myra: lykiska gravar formade som hus, uthuggna i klippväggen ovanför en stor romersk teater.",
          "Andriake: Myras antika hamn, med ett restaurerat spannmålsmagasin som rymmer Museet för lykiska civilisationer.",
          "Kekova: båtturer från närliggande Üçağız passerar den delvis sjunkna antika staden och borgbyn Kaleköy (färre båtar går på vintern)."
        ]
      },
      {
        "type": "h2",
        "text": "Dit: kustvägen västerut"
      },
      {
        "type": "p",
        "text": "Demre ligger cirka två och en halv timme från Antalya längs en av landets vackraste kustvägar, förbi Kemer, bergen runt Olympos, Kumluca och Finike. Vägen är bra året runt men slingrar sig genom bergen, så räkna med tid för stopp och planera inte in den som en stressad körning."
      },
      {
        "type": "h2",
        "text": "En dag längs kusten"
      },
      {
        "type": "ul",
        "items": [
          "Morgon: åk tidigt från Antalya och stanna för utsikten över kusten nära Olympos.",
          "Förmiddag: Sankt Nikolaus kyrka innan turistgrupperna kommer.",
          "Mitt på dagen: klippgravarna och teatern i Myra, sedan lunch i Demre eller vid Andriake.",
          "Eftermiddag: en båttur till Kekova under säsong, eller fortsätt till Kaş och övernatta där.",
          "Kväll: tillbaka till Antalya, eller kombinera utflykten med några dagar i Kaş."
        ]
      },
      {
        "type": "h2",
        "text": "Besök på vintern och i jul"
      },
      {
        "type": "p",
        "text": "December är en särskilt stämningsfull tid för ett besök: den 6 december är Sankt Nikolaus dag, och runt jul kombinerar många besökare en vistelse i Antalya med en utflykt till helgonets stad. Vinterdagarna är milda men korta, så åk tidigt. Sevärdheterna är öppna året runt, medan båtturerna till Kekova beror på vädret och säsongen."
      },
      {
        "type": "h2",
        "text": "Privat transfer till Demre"
      },
      {
        "type": "p",
        "text": "Vi kör privata transfers från Antalya och semesterorterna längs västkusten till Kumluca, Demre och Kaş. Med ett privat fordon väljer du själv stopp och tempo, och priset är fast per fordon, inte per person. Berätta vilket hotell och datum det gäller och om du vill ha återresa samma dag när du bokar."
      }
    ],
    "faq": [
      [
        "Hur långt är det från Antalya till Demre?",
        "Demre, antikens Myra, ligger cirka två och en halv timmes bilresa från Antalya längs kustvägen via Kemer, Kumluca och Finike."
      ],
      [
        "Är Sankt Nikolaus kyrka öppen året runt?",
        "Ja. Sankt Nikolaus kyrka och den antika platsen Myra är öppna för besökare året runt."
      ],
      [
        "När är Sankt Nikolaus dag?",
        "Sankt Nikolaus festdag infaller den 6 december. December, inklusive julperioden, är en populär tid att besöka Demre."
      ],
      [
        "Kan jag besöka Demre och Kekova på samma dag?",
        "Ja, under båtsäsongen går det med en tidig start. På vintern går färre båtar, så kontrollera vädret och tidtabellerna på plats."
      ]
    ]
  },
  "lycian-way-spring-hiking": {
    "slug": "lykiska-leden-vandring-nara-antalya",
    "title": "Vandra Lykiska leden nära Antalya: vårguide till de bästa etapperna",
    "heading": "Vandra Lykiska leden från Antalya",
    "description": "Vandra Lykiska leden nära Antalya: bästa säsongen, etapper runt Kemer, Olympos, Adrasan och Kaş, packlista och hur du tar dig till startpunkten för din vandring.",
    "excerpt": "Antika ruiner, tallskogar och havsutsikt längs en av världens stora vandringsleder. Vilka etapper du kan vandra från Antalya och när du ska åka.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Lykiska leden (Lycian Way) är en markerad långdistansled på mer än 500 km mellan Fethiye och Antalya som följer gamla stigar, åsnestigar och romerska vägar längs kusten och genom bergen i det antika Lykien. Du behöver inte veckor för att vandra Lykiska leden: många av de finaste etapperna ligger nära Antalya och passar perfekt för dagsvandringar eller en kort vandringssemester."
      },
      {
        "type": "h2",
        "text": "När ska man vandra: vår och höst"
      },
      {
        "type": "table",
        "head": [
          "Säsong",
          "Förhållanden",
          "Omdöme"
        ],
        "rows": [
          [
            "Mars – maj",
            "Milda dagar, gröna kullar, vilda blommor, källor fulla av vatten",
            "Bästa säsongen"
          ],
          [
            "Juni – augusti",
            "Mycket varmt, lite skugga på många etapper, uttorkade källor",
            "Bara tidiga morgnar eller korta turer"
          ],
          [
            "September – november",
            "Varmt hav, stabilt väder, svalare från slutet av oktober",
            "Näst bästa säsongen"
          ],
          [
            "December – februari",
            "Milt vid kusten, regnperioder, snö på de höga passen",
            "Möjligt på låga kustetapper"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Etapper nära Antalya"
      },
      {
        "type": "ul",
        "items": [
          "Göynük – Kemerområdet: skogsstigar och utsikt över kanjonen, nära semesterorterna i Kemer.",
          "Çıralı och Olympos: en kustetapp mellan ruinerna av Olympos och Chimairas eviga lågor.",
          "Adrasan – Olympos: en av de mest dramatiska sträckorna, med klippor, vikar och vida vyer över havet.",
          "Runt Kaş: kuststigar med lykiska gravar, små vikar och den grekiska ön Meis utanför kusten.",
          "Phaselis: kortare vandringar runt den antika staden och dess tre hamnar, perfekt som en första smakbit."
        ]
      },
      {
        "type": "h2",
        "text": "Planera din vandring"
      },
      {
        "type": "p",
        "text": "Leden är rödvitt markerad, men vissa sträckor är oländiga, steniga och branta, och skyltningen kan vara bristfällig. Använd en bra karta eller ett GPS-spår, vandra helst två och två och berätta för någon vilken rutt du tar. På många etapper finns varken affärer eller vatten mellan byarna, så starta tidigt och bär mer vatten än du tror att du behöver."
      },
      {
        "type": "h2",
        "text": "Packlista"
      },
      {
        "type": "ul",
        "items": [
          "Vandringskängor eller stadiga terrängskor – kalkstenen är vass och lös på sina ställen.",
          "Minst två liter vatten per person, plus snacks.",
          "Solhatt, solskydd och ett lätt långärmat plagg, även på våren.",
          "En vindtät jacka eller regnjacka för bergssträckor och växlande vårväder.",
          "Ett litet första hjälpen-kit och en laddad mobil med offlinekarta."
        ]
      },
      {
        "type": "h2",
        "text": "Till och från leden"
      },
      {
        "type": "p",
        "text": "De flesta etapper börjar och slutar i byar som är svåra att nå med kollektivtrafik, och vandrar du i en riktning slutar du någon annanstans än där du började. En privat transfer tar dig från Antalyas flygplats eller ditt hotell till starten av din etapp och kan hämta dig vid målet. Priset är fast per fordon, så det passar bra för vandringsgrupper; berätta start- och slutpunkt, datum och antal personer så lämnar vi prisuppgift i förväg."
      }
    ],
    "faq": [
      [
        "Hur lång är Lykiska leden?",
        "Den markerade leden är mer än 500 km lång och går mellan Fethiye och Antalya. De flesta besökare vandrar utvalda etapper snarare än hela sträckan."
      ],
      [
        "När är bästa tiden att vandra Lykiska leden?",
        "Våren, från mars till maj, är bästa säsongen, följd av hösten från september till november. Sommaren är mycket varm och många källor torkar ut."
      ],
      [
        "Vilka etapper av Lykiska leden ligger närmast Antalya?",
        "Sträckorna runt Göynük och Kemer, Çıralı och Olympos, Adrasan och Phaselis ligger alla ungefär en till två timmar från Antalya. Etapperna runt Kaş ligger längre västerut."
      ],
      [
        "Kan man ordna transfer till starten av en etapp på Lykiska leden?",
        "Ja. Skicka oss start- och slutpunkt och datum, så lämnar vi prisuppgift på en privat transfer till fast pris per fordon, inklusive upphämtning när vandringen är slut."
      ]
    ]
  },
  "koprulu-canyon-rafting": {
    "slug": "rafting-koprulu-kanjon-fran-antalya",
    "title": "Rafting i Köprülükanjonen: praktisk guide från Antalya och Side",
    "heading": "Rafting i Köprülükanjonen",
    "description": "Rafting i Köprülükanjonen nära Antalya: när säsongen pågår, hur floden är, vem det passar, vad du ska packa och hur långt det är från Side, Belek, Alanya och Antalya.",
    "excerpt": "Kallt grönt vatten, en romersk bro och en tallklädd kanjon. Vad du kan vänta dig av en raftingdag i Köprülükanjonen och hur du planerar den från kusten.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Rafting i Köprülükanjonen (Köprülü Kanyon) är den mest kända raftingturen på Turkiska rivieran. Kanjonen är en nationalpark i Taurusbergen norr om Side och Manavgat, och floden som rinner genom den bjuder på ett lugnt snarare än extremt äventyr: de flesta forsarna är milda, landskapet är storslaget och nybörjare och barnfamiljer är med varje dag under säsongen."
      },
      {
        "type": "h2",
        "text": "Så går raftingturen till"
      },
      {
        "type": "p",
        "text": "De flesta turer följer en sträcka på ungefär tolv kilometer av floden Köprüçay och tillbringar två till tre timmar på vattnet, med stopp för att bada, hoppa från klippor eller bara flyta med. Forsarna är mestadels lätta till medelsvåra, vattnet är klart och grönt, och det är kallt året runt eftersom floden får sitt vatten från bergskällor. Guiderna håller en säkerhetsgenomgång, och hjälm och flytväst ingår."
      },
      {
        "type": "h2",
        "text": "När ska man åka?"
      },
      {
        "type": "table",
        "head": [
          "Period",
          "Flod och väder",
          "Passar för"
        ],
        "rows": [
          [
            "April – maj",
            "Mer vatten från snösmältningen, livligare forsar, mild luft",
            "Aktiva grupper, mindre trängsel"
          ],
          [
            "Juni – augusti",
            "Het luft, kallt vatten, de mest besökta månaderna",
            "Att svalka sig en varm dag"
          ],
          [
            "September – oktober",
            "Lugnare vatten, varma dagar, färre människor",
            "Barnfamiljer och nybörjare"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Säsongen pågår oftast från ungefär april till oktober, beroende på floden och arrangörerna. Utanför den perioden är turer sällsynta eller erbjuds inte alls."
      },
      {
        "type": "h2",
        "text": "Vem passar det för?"
      },
      {
        "type": "ul",
        "items": [
          "Nybörjare: ingen erfarenhet behövs och guiden styr flotten.",
          "Barnfamiljer: arrangörerna har en lägsta ålder för barn, så kontrollera den när du bokar.",
          "Vänner och kollegor: en flotte delas oftast av sex till åtta personer.",
          "Mindre lämpligt för den som inte kan simma och känner sig osäker i vatten, eller under graviditet."
        ]
      },
      {
        "type": "h2",
        "text": "Vad ska man ta med?"
      },
      {
        "type": "ul",
        "items": [
          "Badkläder under kläderna och en handduk.",
          "Skor som tål att bli blöta och sitter kvar på fötterna – inte flip-flops.",
          "Solkräm och ett ombyte torra kläder till hemvägen.",
          "En vattentät påse eller ett fodral till mobilen; lämna värdesaker på hotellet."
        ]
      },
      {
        "type": "h2",
        "text": "Mer än rafting: nationalparken"
      },
      {
        "type": "p",
        "text": "Över kanjonen går Olukbron, en romersk bro med ett enda valv som har gett området dess namn – köprü betyder bro på turkiska. Högre upp på berget ligger ruinerna av den antika staden Selge, bland klippformationer och byar. Med eget fordon kan du kombinera raftingen med ett stopp vid bron och en tur upp mot Selge."
      },
      {
        "type": "h2",
        "text": "Så tar du dig dit från kusten"
      },
      {
        "type": "p",
        "text": "Många raftingföretag säljer turer med gemensam upphämtning på hotellen, vilket kan innebära en lång förmiddag med att hämta upp andra gäster. Ett privat fordon från Side, Manavgat, Belek, Alanya eller Antalya åker när du vill och kan stanna vid bron eller i bergen på vägen. Kanjonen ligger ungefär en timme från Side och Manavgat och längre från Antalya och Alanya; skicka oss ditt hotell och datum så ger vi dig ett fast pris per fordon."
      }
    ],
    "faq": [
      [
        "Passar rafting i Köprülükanjonen för nybörjare?",
        "Ja. Forsarna är mestadels lätta till medelsvåra, ingen erfarenhet behövs och en guide styr varje flotte efter en säkerhetsgenomgång."
      ],
      [
        "När är raftingsäsongen i Köprülükanjonen?",
        "Oftast från ungefär april till oktober. På våren är vattnet livligare tack vare snösmältningen; september och oktober är lugnare och mindre besökta."
      ],
      [
        "Hur kallt är vattnet?",
        "Kallt året runt, eftersom floden får sitt vatten från bergskällor. En het sommardag är det en del av charmen."
      ],
      [
        "Hur långt är det från Side till Köprülükanjonen?",
        "Ungefär en timme med bil från Side och Manavgat, och längre från Antalya, Belek eller Alanya beroende på hotell."
      ]
    ]
  },
  "kas-kalkan-autumn": {
    "slug": "kas-och-kalkan-pa-hosten",
    "title": "Kaş och Kalkan på hösten: dykning, stränder och lugna vikar",
    "heading": "Kaş och Kalkan på hösten",
    "description": "Därför är Kaş och Kalkan som bäst på hösten: varmt hav, dykning, stränderna Kaputaş och Patara, Kekova med kajak och båt och hur du tar dig dit från Antalyas flygplats.",
    "excerpt": "Årets varmaste hav, tomma stränder och två små hamnstäder vid bergens fot. Därför glänser den yttersta västra delen av Antalyakusten i oktober.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Kaş och Kalkan ligger på den vilda västra delen av Antalyakusten, där bergen stupar rakt ner i havet. Ingen av orterna har stora resorter; båda har små hamnar, vitkalkade gränder och något av det klaraste vattnet i Medelhavet. På hösten, när sommarturisterna har åkt hem och havet fortfarande är varmt, är Kaş och Kalkan som allra bäst."
      },
      {
        "type": "h2",
        "text": "Därför är hösten säsongen här"
      },
      {
        "type": "ul",
        "items": [
          "Havet håller sig varmt in i oktober, ofta varmare än i juni.",
          "Sikten under vattnet är utmärkt – goda nyheter för dykare och snorklare.",
          "Promenader och vandringar blir behagliga igen efter sommarvärmen.",
          "Restauranger och båtturer är fortfarande igång, men utan sommarens trängsel."
        ]
      },
      {
        "type": "h2",
        "text": "Kaş: dykning, kajak och hamnen"
      },
      {
        "type": "p",
        "text": "Kaş är ett av Turkiets mest kända dykcentrum, med dykplatser för både nybörjare och erfarna dykare, bland annat vrak, väggar och undervattensgrottor. Havskajak över Kekovas sjunkna ruiner är en höjdpunkt, och hamnen, den antika teatern med utsikt över havet och de lykiska gravarna i staden gör kvällarna enkla. En klar dag syns den grekiska ön Meis strax utanför kusten."
      },
      {
        "type": "h2",
        "text": "Kalkan: terrasser och lugna kvällar"
      },
      {
        "type": "p",
        "text": "Kalkan, ungefär en halvtimme väster om Kaş, är mindre och lugnare och byggt på en sluttning runt en liten hamn. Orten är känd för sina villor med terrasser mot havet och sina takrestauranger. Den passar par och familjer som vill ha en lugn bas med god mat snarare än nattliv."
      },
      {
        "type": "h2",
        "text": "Stränder mellan och runt orterna"
      },
      {
        "type": "ul",
        "items": [
          "Kaputaş: en liten turkos vik vid foten av en ravin, mellan Kaş och Kalkan.",
          "Patara: en av Turkiets längsta sandstränder, intill ruinerna av antika Patara och ett skyddat område.",
          "Kaşhalvön och stadens badplattformar: klippstränder och stegar rakt ner i djupt, klart vatten.",
          "Kekova och Üçağız: båtturer till skyddade vikar och borgbyn Kaleköy."
        ]
      },
      {
        "type": "h2",
        "text": "Vad händer i november?"
      },
      {
        "type": "p",
        "text": "Från november går säsongen mot sitt slut: en del hotell, restauranger och båtturer stänger, det första regnet kommer och kvällarna blir svala. Kaş är livligt året runt eftersom många bor där permanent, medan Kalkan blir mycket stilla. Kontrollera öppettider om du reser sent på säsongen."
      },
      {
        "type": "h2",
        "text": "Från Antalyas flygplats till Kaş och Kalkan"
      },
      {
        "type": "p",
        "text": "Kaş ligger cirka 185 km från Antalyas flygplats, ungefär två och en halv till tre timmar längs kustvägen via Kemer, Kumluca och Demre, och Kalkan ligger ungefär en halvtimme längre bort. Beroende på flyg landar en del resenärer i Dalaman i stället. Vi kör privata transfers från båda flygplatserna till fast pris per fordon, med fotostopp längs en av landets vackraste vägar."
      }
    ],
    "faq": [
      [
        "Är havet varmt i Kaş i oktober?",
        "Ja. Havet håller sig oftast varmt långt in i oktober, ofta varmare än på försommaren, och sikten för dykning och snorkling är utmärkt."
      ],
      [
        "Hur långt är det från Antalyas flygplats till Kaş?",
        "Cirka 185 km, ungefär två och en halv till tre timmar med bil. Kalkan ligger ungefär en halvtimme längre västerut."
      ],
      [
        "Kaş eller Kalkan: vilket är bäst?",
        "Kaş är livligare, med dykning, kajak och stadsliv året runt. Kalkan är mindre och lugnare, med villor och restauranger med havsutsikt."
      ],
      [
        "Har Kaş och Kalkan öppet i november?",
        "Kaş är aktivt året runt. I Kalkan och hos en del hotell och båtföretag slutar säsongen i slutet av oktober eller i november, så kontrollera öppettiderna."
      ]
    ]
  },
  "medical-travel-antalya-winter": {
    "slug": "tandvard-i-antalya-pa-vintern",
    "title": "Tandvård och medicinska resor till Antalya på vintern: det här bör du veta",
    "heading": "Tandvård och medicinska resor till Antalya på vintern",
    "description": "Tandvård i Antalya, hårtransplantation eller kosmetisk behandling på vintern: varför många väljer lågsäsong, hur du granskar en klinik, vilodagar och flygplatstransfer.",
    "excerpt": "Svalare väder, lugnare hotell och enklare att boka tider. Vad du som reser till Antalya för behandling på vintern bör kontrollera och planera innan du bokar.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "För tandvård i Antalya och andra medicinska resor har staden, vid sidan av Istanbul, blivit ett av Turkiets centrum. Allt fler besökare planerar tandbehandlingar, hårtransplantationer eller kosmetiska ingrepp till vintermånaderna, när kusten är lugn och vädret milt. Den här guiden handlar om de praktiska delarna av en sådan resa – den är inte medicinsk rådgivning, och varje medicinskt beslut ska fattas av en behörig läkare."
      },
      {
        "type": "h2",
        "text": "Därför väljer många resenärer vintern"
      },
      {
        "type": "ul",
        "items": [
          "Milt, svalare väder: många patienter tycker att återhämtningen blir behagligare utan sommarhetta och stark sol.",
          "Hotell och lägenheter är lugnare och ofta billigare än på sommaren.",
          "Det kan vara lättare att få tider utanför de mest populära semestermånaderna.",
          "Resan kan kombineras med staden, museer och lugna promenader i stället för stranddagar."
        ]
      },
      {
        "type": "h2",
        "text": "Välja och granska en vårdgivare"
      },
      {
        "type": "p",
        "text": "Det viktigaste beslutet är vårdgivaren, inte priset. Kontrollera att kliniken eller sjukhuset har tillstånd från det turkiska hälsoministeriet, ta reda på vem den behandlande läkaren är och vilka kvalifikationer hen har, och be om en skriftlig plan som anger vad som ingår, vad som inte ingår och hur komplikationer och uppföljning hanteras. Var försiktig med erbjudanden som utlovar ett slutresultat eller ett fast pris innan någon undersökning har gjorts."
      },
      {
        "type": "h2",
        "text": "Planera dina dagar"
      },
      {
        "type": "table",
        "head": [
          "Typ av behandling",
          "Typisk planeringsfråga",
          "Fråga din vårdgivare"
        ],
        "rows": [
          [
            "Tandbehandling",
            "Ofta mer än ett besök, ibland med veckor eller månader emellan",
            "Hur många resor och hur många dagar varje gång?"
          ],
          [
            "Hårtransplantation",
            "Kort vistelse, med skötselråd för de första dagarna",
            "När får du flyga, tvätta håret och bära mössa?"
          ],
          [
            "Kosmetisk kirurgi",
            "Längre vistelse och återhämtningsdagar före hemresan",
            "Hur många nätter innan du får flyga?"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Planera in vilodagar, lägg inte behandlingen samma dag som du landar och följ läkarens råd om när det är säkert att flyga. Vid kirurgiska ingrepp rekommenderas ofta att man reser med sällskap."
      },
      {
        "type": "h2",
        "text": "Försäkring, dokument och uppföljning"
      },
      {
        "type": "ul",
        "items": [
          "Kontrollera om din reseförsäkring täcker planerad behandling utomlands – många försäkringar gör det inte.",
          "Spara kopior av alla läkarintyg, recept och behandlingsplanen.",
          "Fråga hur uppföljningen fungerar när du är hemma igen och om din egen läkare kan involveras.",
          "Dela medicinsk information bara med vårdgivaren, via den kanal de anger."
        ]
      },
      {
        "type": "h2",
        "text": "Från flygplatsen till hotellet eller kliniken"
      },
      {
        "type": "p",
        "text": "Efter en flygresa och före eller efter en behandling vill du inte stå i taxikö eller åka en delad buss som stannar vid ett dussin hotell. En privat transfer tar dig direkt från Antalyas flygplats till ditt hotell eller din klinik, och föraren väntar in ditt flyg och hjälper till med bagaget. Returresor kan anpassas efter dina tider och ditt hemflyg. Priset är fast per fordon, så ett sällskap åker med utan extra kostnad."
      }
    ],
    "faq": [
      [
        "Varför resa till Antalya för behandling på vintern?",
        "Många resenärer föredrar det mildare vädret för återhämtningen, lugnare hotell och att det är enklare att boka tider utanför sommarsäsongen."
      ],
      [
        "Hur granskar jag en klinik i Antalya?",
        "Kontrollera att den har tillstånd från det turkiska hälsoministeriet, ta reda på vem den behandlande läkaren är och be om en skriftlig plan över vad som ingår och inte ingår, komplikationer och uppföljning."
      ],
      [
        "Hur länge bör jag stanna efter ett ingrepp?",
        "Det beror helt på behandlingen och din läkares råd. Fråga din vårdgivare hur många nätter du behöver innan hemresan och planera in vilodagar."
      ],
      [
        "Kan ni köra mig från flygplatsen till min klinik?",
        "Ja. Vi erbjuder privata transfers från Antalyas flygplats till hotell och kliniker, och tillbaka, till fast pris per fordon."
      ]
    ]
  },
  "side-ancient-city-guide": {
    "slug": "side-antika-staden-guide",
    "title": "Side antika staden: guide till Apollontemplet, teatern och gamla stan",
    "heading": "Side: guide till den antika staden",
    "description": "Besök antika Side: Apollontemplet, den stora teatern, museet, stadsmurarna och gamla stan, bästa tiden att åka och dagsutflykter till Aspendos och Manavgatvattenfallet.",
    "excerpt": "En romersk teater, tempelpelare vid vattenbrynet och en hamnstad byggd innanför de antika murarna. Så ser du Side när det är som bäst – utanför säsongen.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Den antika staden Side är en av få platser på Turkiska rivieran där en modern ort lever mitt i en antik stad. Gamla stan fyller en liten halvö omgiven av romerska och hellenistiska ruiner: du går förbi pelare på väg till restaurangen, och solnedgången ramas in av ett tempel. Side är som bäst utanför sommaren, när det är lugnt nog att känna historiens vingslag."
      },
      {
        "type": "h2",
        "text": "De viktigaste sevärdheterna"
      },
      {
        "type": "ul",
        "items": [
          "Apollontemplet: pelarna står längst ut på halvön, precis vid havet – den klassiska platsen för solnedgången.",
          "Den stora teatern: en av regionens största antika teatrar, byggd in i sluttningen vid entrén till gamla stan.",
          "Sides museum: inrymt i ett restaurerat romerskt bad, med statyer och reliefer som hittats i staden.",
          "Pelargatan och agoran: den antika huvudaxeln från stadsporten mot hamnen.",
          "Stadsmurarna och den monumentala porten: entrévägen som besökare har använt i två tusen år."
        ]
      },
      {
        "type": "h2",
        "text": "Gamla stan i dag"
      },
      {
        "type": "p",
        "text": "Innanför murarna leder gränder med restauranger, kaféer och små butiker ner till hamnen, där båtar avgår på turer längs kusten. Bilar hålls borta från större delen av gamla stan, så den är trevlig att utforska till fots. Breda sandstränder sträcker sig öster och väster om halvön."
      },
      {
        "type": "h2",
        "text": "När ska man åka?"
      },
      {
        "type": "p",
        "text": "Våren och hösten är perfekta: tillräckligt varmt för stranden, tillräckligt svalt för att gå runt bland ruinerna mitt på dagen. På vintern stänger många säsongshotell, men gamla stan, ruinerna och museet är öppna, och en solig dag är templet och hamnen nästan tomma. I juli och augusti besöker du ruinerna bäst tidigt på morgonen eller vid solnedgången."
      },
      {
        "type": "h2",
        "text": "Dagsutflykter från Side"
      },
      {
        "type": "table",
        "head": [
          "Resmål",
          "Varför åka dit",
          "Ungefärlig restid från Side"
        ],
        "rows": [
          [
            "Aspendos",
            "En av världens bäst bevarade romerska teatrar",
            "cirka 40 minuter"
          ],
          [
            "Manavgatvattenfallet",
            "Ett brett, lågt vattenfall i en grön park",
            "cirka 15 minuter"
          ],
          [
            "Perge",
            "En stor antik stad med stadion och pelargator",
            "cirka 1 timme"
          ],
          [
            "Köprülükanjonen",
            "Rafting och en romersk bro i en nationalpark",
            "cirka 1 timme"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Från Antalyas flygplats till Side"
      },
      {
        "type": "p",
        "text": "Side ligger cirka 65 km från Antalyas flygplats, ungefär 55 till 65 minuter med bil. En privat transfer tar dig direkt till ditt hotell eller till kanten av den bilfria gamla stan, till ett fast pris per fordon som inte ändras med säsongen eller tiden för ditt flyg. Samma fordon kan bokas för dagsutflykter till Aspendos, Perge eller kanjonen."
      }
    ],
    "faq": [
      [
        "Vad finns att se i antika Side?",
        "Apollontemplet vid havet, den stora teatern, museet i ett romerskt bad, pelargatan, agoran och stadsmurarna – allt på gångavstånd från gamla stan."
      ],
      [
        "Är Side värt att besöka på vintern?",
        "Ja, för ruinerna och gamla stan. Många säsongshotell stänger, men sevärdheterna är öppna och mycket lugnare än på sommaren."
      ],
      [
        "Hur långt är det från Antalyas flygplats till Side?",
        "Cirka 65 km, ungefär 55 till 65 minuter med bil."
      ],
      [
        "Kan jag besöka Aspendos från Side?",
        "Ja. Aspendos ligger cirka 40 minuter från Side med bil och är en enkel halvdagsutflykt, ofta i kombination med Perge eller Manavgatvattenfallet."
      ]
    ]
  },
  "alanya-in-winter": {
    "slug": "alanya-pa-vintern",
    "title": "Alanya på vintern: väder, vad man gör och dagsutflykter",
    "heading": "Alanya på vintern",
    "description": "Alanya november till mars: vädret och vattentemperaturen på vintern, borgen och linbanan, Damlataş- och Dimgrottan, promenader, marknader och resan från Antalya flygplats.",
    "excerpt": "Milda dagar, en tom borgklippa och en stad som fortsätter att leva när sommarturisterna har åkt hem. Så är Alanya egentligen mellan november och mars.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Alanya är en av få orter på den turkiska kusten som inte stänger ner på vintern. Tiotusentals människor bor här året runt, många av dem från Skandinavien, Tyskland, Nederländerna och Ryssland, så butiker, kaféer, marknader och restauranger håller öppet. För en kort vintersemester erbjuder Alanya något som är sällsynt i Europa: sol, en strandpromenad att flanera på och en medeltida borg ovanför staden – med betydligt färre människor än på sommaren."
      },
      {
        "type": "h2",
        "text": "Vädret i Alanya på vintern"
      },
      {
        "type": "table",
        "head": [
          "Månad",
          "Normal dagtemperatur",
          "Normal nattemperatur",
          "Havet"
        ],
        "rows": [
          [
            "November",
            "20-22 °C",
            "11-13 °C",
            "cirka 21 °C"
          ],
          [
            "December",
            "17-19 °C",
            "8-10 °C",
            "cirka 19 °C"
          ],
          [
            "Januari",
            "16-17 °C",
            "7-9 °C",
            "cirka 17 °C"
          ],
          [
            "Februari",
            "16-18 °C",
            "7-9 °C",
            "cirka 17 °C"
          ],
          [
            "Mars",
            "18-20 °C",
            "9-11 °C",
            "cirka 17 °C"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Siffrorna är ungefärliga medelvärden. Vintern bjuder på regn i perioder – ofta en dag eller två med kraftiga skurar och sedan klara, soliga dagar. Alanya skyddas av Taurusbergen, som gör staden lite mildare än stora delar av kusten. Kvällarna är svala, och bostäder och en del hotellrum känns kalla, så packa ett varmt plagg."
      },
      {
        "type": "h2",
        "text": "Borgen, linbanan och Röda tornet"
      },
      {
        "type": "p",
        "text": "Alanyas borg kröner den klippiga halvön ovanför staden, med murar, cisterner, en bysantinsk kyrka och utsikt längs kusten åt båda hållen. På sommaren är klättringen upp ett slit; på vintern är den en behaglig promenad. Vill du hellre åka tar linbanan från Damlataşstranden dig upp på några minuter. Nere vid hamnen ligger Röda tornet (Kızıl Kule) från 1200-talet och det gamla varvet på kort promenadavstånd från varandra."
      },
      {
        "type": "h2",
        "text": "Grottor, floder och promenader"
      },
      {
        "type": "ul",
        "items": [
          "Damlataşgrottan: en liten droppstensgrotta längst bort på Damlataşstranden, känd för sin fuktiga luft med jämn temperatur.",
          "Dimgrottan: en större grotta i bergen öster om staden, med gångbana och en liten sjö därinne.",
          "Dimfloden (Dim Çayı): restauranger längs floden med plattformar över vattnet, lugnare på vintern och några öppna året runt.",
          "Strandpromenaden: flera kilometer plan sträcka för promenader och cykling längs Keykubat- och Kleopatrastranden.",
          "Bananodlingar och byar på sluttningarna bakom staden, där tropisk frukt växer under den milda vintern."
        ]
      },
      {
        "type": "h2",
        "text": "Bad, marknader och vardagsliv"
      },
      {
        "type": "p",
        "text": "Soliga dagar i november, och till och med mitt i vintern, ser du folk bada från Kleopatrastranden – havet är kallare än luften känns, men många besökare från norr tycker att det går bra. På veckomarknaderna säljs citrusfrukter, granatäpplen, oliver och grönsaker, och stadskärnan lever med bofasta i stället för turistgrupper. Många hotell har vinterpriser för långa vistelser, och en del strandhotell håller öppet med inomhuspool."
      },
      {
        "type": "h2",
        "text": "Dagsutflykter från Alanya på vintern"
      },
      {
        "type": "p",
        "text": "Side och Manavgatvattenfallet ligger cirka en timme västerut; Aspendos och Perge blir en längre men enkel heldag. Inåt land får byarna i Taurusbergen snö under de kallaste veckorna, medan kusten förblir grön. Stannar du i veckor snarare än dagar tar vår separata guide om att övervintra på Antalyakusten upp långa vistelser mer i detalj."
      },
      {
        "type": "h2",
        "text": "Från Antalya flygplats till Alanya"
      },
      {
        "type": "p",
        "text": "Alanya ligger cirka 125 km från Antalya flygplats, ungefär två timmar på vägen längs kusten via Side och Manavgat. Gazipaşa-Alanya flygplats ligger närmare men har färre flyg, särskilt på vintern, så de flesta landar i Antalya. En privat transfer kör dig ända fram till hotellet eller lägenheten till ett fast pris per fordon, utan tillägg för vinter, helg eller natt – praktiskt när flyget landar sent på kvällen."
      }
    ],
    "faq": [
      [
        "Är Alanya värt ett besök på vintern?",
        "Ja, om du söker milt väder, promenader och en levande stad snarare än strandliv. Dagarna är ofta soliga och runt 16-19 °C, och borgen och grottorna är behagliga utan sommarhettan."
      ],
      [
        "Kan man bada i Alanya på vintern?",
        "En del gör det. Havet håller cirka 17-19 °C mitt i vintern och är varmare i november. Det är uppfriskande snarare än varmt, och många hotell har uppvärmda inomhuspooler."
      ],
      [
        "Har hotell och restauranger öppet i Alanya på vintern?",
        "Många har det. Alanya har en stor befolkning året runt, så stadskärnan, marknaderna och många restauranger håller öppet. En del stora säsongsanläggningar stänger från november till mars."
      ],
      [
        "Hur långt är det från Antalya flygplats till Alanya?",
        "Cirka 125 km, ungefär två timmar med bil. En privat transfer tar dig direkt till hotellet till ett fast pris per fordon."
      ],
      [
        "Regnar det mycket i Alanya på vintern?",
        "December till februari är de blötaste månaderna, men regnet kommer oftast i perioder om en dag eller två, med soliga dagar emellan."
      ]
    ]
  },
  "tahtali-cable-car-olympos": {
    "slug": "tahtali-linbana-olympos-chimaira",
    "title": "Tahtalı linbana, Olympos och Chimairas lågor – en dag från Kemer",
    "heading": "Tahtalı linbana, Olympos och Chimaira",
    "description": "En dag nära Kemer: Tahtalı linbana till 2 365 m, ruinerna i Olympos, Çıralıstranden och Chimairas lågor i skymningen – bästa säsongen, vad du ska ha på dig och hur du tar dig dit.",
    "excerpt": "En bergstopp, en lykisk stad i en floddal och lågor som har brunnit ur berget i tusentals år – allt inom en timme från Kemer.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Söder om Kemer reser sig Taurusbergen rakt upp ur havet. På en och samma dag kan du stå på toppen av berget Tahtalı, gå genom ruinerna i Olympos ner till stranden och se Chimairas lågor fladdra på en sluttning i skymningen. Hösten och våren är bästa säsongerna: klar luft för utsikten, behagliga temperaturer för promenader och inga sommarköer."
      },
      {
        "type": "h2",
        "text": "Tahtalı linbana: från havet till 2 365 m"
      },
      {
        "type": "p",
        "text": "Olympos linbana startar i tallskogen ovanför Tekirova och klättrar på ungefär tio minuter upp till toppen av Tahtalı, cirka 2 365 m över havet. Därifrån ser du ut över hela kusten från Antalya till Kemer och Phaselis, och klara dagar långt inåt land. På toppen finns ett kafé och utsiktsterrasser. Biljetter köps vid dalstationen eller på nätet; öppettider och priser varierar med säsongen."
      },
      {
        "type": "h2",
        "text": "När ska man åka och vad ska man ha på sig?"
      },
      {
        "type": "ul",
        "items": [
          "Oktober och november: klar luft och årets bästa sikt, med milt väder vid havsnivå.",
          "December till mars: snö på toppen är vanligt – en slående utsikt över en grön kust, men klä dig för vinter där uppe.",
          "April och maj: snö på toppen och blommor på de lägre sluttningarna, ofta i samma vy.",
          "Oavsett årstid är det 10-15 °C kallare på toppen än på stranden. Ta med en jacka, även i oktober.",
          "Linbanan stannar vid hård vind eller oväder, så håll dagen flexibel och kontrollera innan du åker."
        ]
      },
      {
        "type": "h2",
        "text": "Olympos: ruiner i en floddal"
      },
      {
        "type": "p",
        "text": "Den antika lykiska staden Olympos ligger i en smal, skogklädd dal som slutar vid en stenstrand. Gravar, en teater, ett badhus och en bysantinsk kyrka ligger utspridda bland lager- och fikonträd längs en bäck. Promenaden från entrén till stranden tar ungefär tjugo minuter. Området ingår i ett skyddat område och kostar inträde; med Museum Pass går du in gratis."
      },
      {
        "type": "h2",
        "text": "Çıralı och Chimairas lågor"
      },
      {
        "type": "p",
        "text": "På andra sidan stranden från Olympos ligger Çıralı, en lugn by med fruktodlingar och små pensionat längs en lång strand där karettsköldpaddor lägger ägg. Ovanför, på sluttningen vid Yanartaş, sipprar naturgas ut ur berget och har brunnit i tusentals år – den antika Chimaira från den grekiska sagan. En trappad stig på cirka 20-30 minuter leder upp till lågorna. De är mest imponerande i skymningen, så ta med en ficklampa för vägen ner."
      },
      {
        "type": "h2",
        "text": "Planera dagen"
      },
      {
        "type": "table",
        "head": [
          "Stopp",
          "Från Kemer",
          "Räkna med"
        ],
        "rows": [
          [
            "Tahtalı linbana (dalstationen)",
            "cirka 30 minuter",
            "1,5-2 timmar"
          ],
          [
            "Olympos ruiner och strand",
            "cirka 50 minuter",
            "2 timmar"
          ],
          [
            "Çıralı och Chimaira",
            "cirka 50 minuter",
            "1,5 timme, helst i skymningen"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Restiderna är ungefärliga. En bra ordning är linbanan på förmiddagen när luften är som klarast, Olympos och lunch i Çıralı på eftermiddagen och Chimaira vid solnedgången. Från Antalya stad lägger du till ungefär en timme åt varje håll."
      },
      {
        "type": "h2",
        "text": "Så tar du dig dit"
      },
      {
        "type": "p",
        "text": "Kemer ligger cirka 50 km från Antalya flygplats och Tekirova cirka 75 km, längs kustvägen. Kollektivtrafiken når inte linbanans dalstation eller Chimaira särskilt smidigt, och därför åker många besökare med chaufför. Vi kör privata transfers från flygplatsen till Kemer, Tekirova och Kumluca till ett fast pris per fordon, och kan på förfrågan ge en offert på en dag med chaufför till linbanan, Olympos och Çıralı."
      }
    ],
    "faq": [
      [
        "Hur högt går Tahtalı linbana?",
        "Den går upp till toppen av berget Tahtalı på cirka 2 365 m, från en dalstation i skogen ovanför Tekirova. Åkturen tar ungefär tio minuter."
      ],
      [
        "Finns det snö på Tahtalı på vintern?",
        "Ofta, ja – från ungefär december till mars, ibland ända in i april. Det är alltid mycket kallare på toppen än vid kusten, så ta med en varm jacka."
      ],
      [
        "När är bästa tiden att se Chimairas lågor?",
        "I skymningen eller efter mörkrets inbrott, när lågorna syns tydligt mot berget. Stigen upp tar cirka 20-30 minuter; ta med en ficklampa för vägen ner."
      ],
      [
        "Kan man hinna med Olympos och linbanan på en dag?",
        "Ja. De flesta åker linbanan på förmiddagen, besöker Olympos och Çıralı på eftermiddagen och ser Chimaira vid solnedgången."
      ],
      [
        "Hur långt är det från Antalya flygplats till Kemer?",
        "Cirka 50 km, ungefär 40-50 minuter med bil. Tekirova, nära linbanan, ligger cirka 75 km bort."
      ]
    ]
  },
  "perge-aspendos-day-trip": {
    "slug": "perge-och-aspendos-utflykt",
    "title": "Perge och Aspendos: en halvdagsutflykt bland Antalyas ruiner",
    "heading": "Perge och Aspendos från Antalya",
    "description": "Besök Perge och Aspendos från Antalya, Belek eller Side: vad du ska se, bästa säsongen, hur lång tid du behöver och hur du kombinerar de två antika platserna på en halvdag.",
    "excerpt": "En romersk pelargata, en stadion för 12 000 åskådare och en av antikens bäst bevarade teatrar – allt inom en timme från flygplatsen.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Två av Turkiets finaste antika platser ligger strax intill huvudvägen mellan Antalya och Side. Perge var en stor grekisk-romersk stad på den pamfyliska slätten; Aspendos har en romersk teater som är så välbevarad att den fortfarande används för föreställningar. Tillsammans blir de en enkel halvdag, och mellan oktober och april, när solen är mild, är de som bäst."
      },
      {
        "type": "h2",
        "text": "Perge: pelarnas stad"
      },
      {
        "type": "p",
        "text": "Perge ligger bara cirka 15 minuter från Antalya flygplats. Du går in genom den hellenistiska porten med sina två runda torn och vidare längs en lång pelargata, med en vattenkanal mitt i, till agoran, baden och akropolishöjden. Strax utanför murarna finns en stor teater och en av antikens bäst bevarade stadioner. Många av Perges statyer visas på Antalyas arkeologiska museum. Räkna med ungefär en och en halv till två timmar."
      },
      {
        "type": "h2",
        "text": "Aspendos: teatern som överlevde"
      },
      {
        "type": "p",
        "text": "Aspendos, nära Serik, är känt för sin romerska teater från 100-talet e.Kr., som rymde många tusen åskådare och fortfarande har kvar scenbyggnaden, gallerierna och en utmärkt akustik. Bakom teatern klättrar en stig upp till den övre staden och till valven i en romersk akvedukt som sträcker sig över slätten. En kort bilresa bort är den seldjukiska bron över floden Köprüçay värd ett stopp. Räkna med ungefär en till en och en halv timme."
      },
      {
        "type": "h2",
        "text": "Bästa säsongen för ruinerna"
      },
      {
        "type": "ul",
        "items": [
          "Oktober och november: varma, torra dagar och mjukt ljus för fotografering.",
          "December till februari: lugna platser och milt väder mellan regndagarna – ta med ett regnskydd.",
          "Mars och april: grönt gräs och vilda blommor mellan stenarna, kanske den vackraste tiden.",
          "Juni till september: båda platserna har lite skugga och middagshettan är intensiv; åk tidigt på morgonen om du besöker dem på sommaren."
        ]
      },
      {
        "type": "h2",
        "text": "Båda platserna på en halvdag"
      },
      {
        "type": "table",
        "head": [
          "Utgångspunkt",
          "Till Perge",
          "Perge till Aspendos",
          "Aspendos tillbaka"
        ],
        "rows": [
          [
            "Antalya stad / Lara",
            "cirka 25 minuter",
            "cirka 35 minuter",
            "cirka 45 minuter"
          ],
          [
            "Belek",
            "cirka 30 minuter",
            "cirka 35 minuter",
            "cirka 20 minuter"
          ],
          [
            "Side / Manavgat",
            "cirka 55 minuter",
            "cirka 35 minuter",
            "cirka 35 minuter"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Restiderna är ungefärliga. Att börja i Perge på morgonen och avsluta i Aspendos fungerar från alla dessa utgångspunkter. Båda platserna tar inträde och godtar Museum Pass. Ha bra skor: marken är ojämn marmor och sten, och det finns trappsteg överallt."
      },
      {
        "type": "h2",
        "text": "På vägen till eller från flygplatsen"
      },
      {
        "type": "p",
        "text": "Eftersom Perge ligger så nära Antalya flygplats och Aspendos ligger nära vägen mot Belek och Side passar de båda bra in på en ankomst- eller avresedag med sent flyg. En privat transfer kan stanna vid den ena eller båda på vägen, med bagaget säkert i fordonet. Be om en offert med stopp när du bokar: priset är fortfarande fast per fordon."
      }
    ],
    "faq": [
      [
        "Hur långt är det från Antalya flygplats till Perge?",
        "Bara cirka 15 minuter med bil. Det är en av de enklaste antika platserna att besöka på en ankomst- eller avresedag."
      ],
      [
        "Kan man besöka Perge och Aspendos på en dag?",
        "Absolut – en halvdag räcker för båda. Räkna med cirka två timmar i Perge, ungefär en timme i Aspendos och runt 35 minuters bilresa mellan dem."
      ],
      [
        "Används teatern i Aspendos fortfarande?",
        "Ja. Den romerska teatern är så välbevarad att den fortfarande har konserter och föreställningar vissa kvällar, mest under de varmare månaderna."
      ],
      [
        "När är bästa tiden att besöka Perge och Aspendos?",
        "Oktober till april. Det finns lite skugga på båda platserna, så på sommaren bör du åka tidigt på morgonen."
      ],
      [
        "Kan en transfer stanna vid ruinerna med mitt bagage?",
        "Ja. Be om stopp när du bokar; bagaget stannar i fordonet och priset är fortfarande fast per fordon."
      ]
    ]
  },
  "ramadan-bayram-antalya": {
    "slug": "ramadan-och-eid-i-antalya",
    "title": "Ramadan och eid i Antalya: det här behöver resenärer veta",
    "heading": "Resa till Antalya under ramadan och eid",
    "description": "Vad förändras i Antalya under ramadan och eid? Restauranger, iftarkvällar, fulla vägar under helgerna, hotell och hur du planerar din transfer från flygplatsen.",
    "excerpt": "På semesterorterna märks ramadan knappt i vardagen. Helgerna som följer är en annan sak – här är vad du kan vänta dig och hur du planerar runt dem.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Ramadan och de två eidhögtiderna flyttar sig i kalendern, cirka 11 dagar tidigare varje år. De kommande säsongerna infaller de på senvintern och våren: ramadan och eid al-fitr (Ramazan Bayramı) runt februari och mars, och offerfesten eid al-adha (Kurban Bayramı) runt maj. Kontrollera den officiella kalendern för exakta datum. För besökare förändrar själva fastemånaden inte mycket vid kusten; det är helgerna du behöver planera för."
      },
      {
        "type": "h2",
        "text": "Påverkar ramadan en semester i Antalya?"
      },
      {
        "type": "p",
        "text": "Mycket lite. Hotell, restauranger, kaféer och butiker i Antalya, Belek, Side, Kemer och Alanya har öppet som vanligt under dagen, och alkohol serveras på de ställen som normalt serverar det. Många i Turkiet fastar, många gör det inte, och ingen förväntar sig att besökare ska göra det. Det är helt enkelt artigt att inte äta eller dricka demonstrativt framför någon som uppenbart fastar, särskilt i traditionella stadsdelar och byar."
      },
      {
        "type": "h2",
        "text": "Iftar: ramadans kvällar"
      },
      {
        "type": "ul",
        "items": [
          "Vid solnedgången bryts fastan med iftar, ofta en gemensam måltid med soppa, dadlar, oliver och det runda ramadanbrödet pide som bara säljs den här månaden.",
          "Många restauranger har en iftarmeny; borden fylls strax före solnedgången, så boka om du vill vara med.",
          "I gamla stan och runt de stora moskéerna råder feststämning på kvällen, med familjer ute sent.",
          "Före gryningen går i vissa stadsdelar en trummis runt på gatorna och väcker folk till den sista måltiden (sahur) – en del av traditionen."
        ]
      },
      {
        "type": "h2",
        "text": "Eidhelgerna: när hela Turkiet reser"
      },
      {
        "type": "p",
        "text": "Eid al-fitr varar i tre dagar och offerfesten i fyra; regeringen förlänger dem ofta till en längre ledighet. Miljontals människor reser till sina familjer eller till kusten, så inrikesflyg, långfärdsbussar och hotell blir fullbokade och vägarna in till Antalya är hårt trafikerade den första och sista dagen. Banker och myndigheter stänger, men butiker, restauranger, museer och sevärdheter på semesterorterna håller oftast öppet."
      },
      {
        "type": "h2",
        "text": "Planera din transfer runt helgerna"
      },
      {
        "type": "ul",
        "items": [
          "Boka tidigt om du landar i början av en eidhelg: efterfrågan på fordon och chaufförer är stor.",
          "Räkna med extra tid vid avresa den sista dagen av en helg, då flygplatsen och vägarna är som mest belastade.",
          "Under ramadan är trafiken tät timmen före solnedgången och ovanligt lugn under själva iftar.",
          "Uppge ditt flightnummer: vi följer flyget, så en försening en hektisk dag kostar dig inte din upphämtning."
        ]
      },
      {
        "type": "h2",
        "text": "Bra att veta"
      },
      {
        "type": "p",
        "text": "Under helgerna hälsar man på varandra med ”İyi bayramlar” (trevlig helg), och det delas ut sötsaker överallt – det är en varm tid att vara i landet. Våra priser ändras inte under ramadan eller eid: ett fast pris per fordon, utan tillägg för helg, natt eller säsong."
      }
    ],
    "faq": [
      [
        "Har restaurangerna öppet i Antalya under ramadan?",
        "Ja. På semesterorterna och i Antalya stad har restauranger och kaféer öppet som vanligt under dagen. På kvällen tillkommer iftarmenyer."
      ],
      [
        "Kan turister dricka alkohol under ramadan i Antalya?",
        "Ja. Hotell, barer och restauranger som normalt serverar alkohol fortsätter med det under ramadan."
      ],
      [
        "Är det mycket folk i Antalya under eidhelgerna?",
        "Ja. Många turkiska familjer reser under eid, så hotell, flyg och vägar är mer belastade än vanligt, särskilt den första och sista dagen."
      ],
      [
        "När är ramadan och eid nästa år?",
        "Datumen flyttas cirka 11 dagar tidigare varje år. De kommande säsongerna infaller ramadan och eid al-fitr runt februari-mars och offerfesten runt maj; kontrollera den officiella kalendern för exakta datum."
      ],
      [
        "Blir transferpriserna dyrare under eid?",
        "Inte hos oss. Priset är fast per fordon, utan tillägg för helg, natt eller säsong. Vi rekommenderar att du bokar tidigt inför helgdagar."
      ]
    ]
  },
  "kaleici-old-town-guide": {
    "slug": "kaleici-antalya-gamla-stan-guide",
    "title": "Kaleiçi, Antalyas gamla stan: en promenadguide för lågsäsongen",
    "heading": "Kaleiçi: Antalyas gamla stan",
    "description": "Promenadguide till Kaleiçi, Antalyas muromgärdade gamla stan: Hadrianus port, den räfflade minareten, gamla hamnen, boutiquehotell och varför höst till vår är bästa tiden.",
    "excerpt": "Romerska portar, osmanska hus och en hamn under klipporna. Antalyas gamla hjärta upplever du bäst i lugn takt, de månader då staden tillhör sina invånare.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Kaleiçi – ordagrant ”innanför borgen” – är Antalyas historiska centrum, omgivet av gamla stadsmurar ovanför en liten hamn. Gränderna kantas av restaurerade osmanska hus, många av dem numera boutiquehotell, kaféer och små restauranger. På sommaren är det varmt och trångt; från oktober till april är gamla stan som bäst, med milda dagar, öppna terrasser i solen och tid att strosa."
      },
      {
        "type": "h2",
        "text": "En promenad genom Kaleiçi"
      },
      {
        "type": "ul",
        "items": [
          "Hadrianus port: den romerska porten med tre valv, byggd till kejsarens besök på 100-talet e.Kr., den traditionella ingången till gamla stan.",
          "Klocktornet och torget Kalekapısı: mötesplatsen mellan gamla stan och den moderna staden.",
          "Den räfflade minareten (Yivli Minare): Antalyas seldjukiska symbol, synlig från hela centrum.",
          "Hıdırlıktornet: ett runt romerskt torn i södra kanten, med solnedgångsutsikt över bukten och bergen.",
          "Den brutna minareten (Kesik Minare): en byggnad som genom seklerna har varit tempel, kyrka och moské.",
          "Gamla hamnen: fiskebåtar och utflyktsbåtar under klipporna, dit du kommer via gränderna eller med hiss från ovan."
        ]
      },
      {
        "type": "h2",
        "text": "Utanför murarna"
      },
      {
        "type": "p",
        "text": "Karaalioğluparken sträcker sig längs klipporna från Hıdırlıktornet med utsikt över bukten. Antalyas arkeologiska museum, en av Turkiets rikaste arkeologiska samlingar, ligger där Konyaaltıstranden börjar och är perfekt en regnig dag; kontrollera öppettiderna innan du går dit. Öster om staden störtar Düdenvattenfallen rakt ut från klipporna i havet, och de övre fallen ligger i en skuggig park."
      },
      {
        "type": "h2",
        "text": "Varför höst till vår?"
      },
      {
        "type": "table",
        "head": [
          "Säsong",
          "Normal dagtemperatur",
          "I Kaleiçi"
        ],
        "rows": [
          [
            "Oktober – november",
            "22-27 °C",
            "Varma kvällar, öppna terrasser, färre människor"
          ],
          [
            "December – februari",
            "15-18 °C",
            "Lugna gränder, soliga kaféer, en och annan regnig dag"
          ],
          [
            "Mars – april",
            "18-22 °C",
            "Apelsinblom, gröna parker, festivaler i staden"
          ],
          [
            "Juni – augusti",
            "33-35 °C",
            "Mycket varmt och fullt – bäst tidigt och sent på dagen"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Temperaturerna är ungefärliga medelvärden. De flesta restauranger, kaféer och boutiquehotell i Kaleiçi har öppet året runt, eftersom gamla stan lever på stadsbesökare och invånare, inte bara på badturism."
      },
      {
        "type": "h2",
        "text": "Att bo i gamla stan"
      },
      {
        "type": "p",
        "text": "Hotellen i Kaleiçi är oftast små och inrymda i ombyggda herrgårdar runt en innergård eller en liten pool. Många gränder är gågator eller för smala för större fordon, så bilen stannar ofta vid närmaste port eller torg och de sista metrarna går du till fots. Berätta vilket hotell du bor på när du bokar; våra chaufförer vet vilken ingång som ligger närmast och hjälper till med bagaget."
      },
      {
        "type": "h2",
        "text": "Från Antalya flygplats till Kaleiçi"
      },
      {
        "type": "p",
        "text": "Kaleiçi ligger cirka 15 km från Antalya flygplats, ungefär 20 till 30 minuter med bil. Spårvagnen går också mellan flygplatsen och centrum, men med resväskor är en privat transfer till hotellet enklare, särskilt sent på natten. Priset är fast per fordon, utan nattillägg."
      }
    ],
    "faq": [
      [
        "Vad är Kaleiçi i Antalya?",
        "Kaleiçi är Antalyas historiska gamla stan, omgiven av stadsmurar ovanför den gamla hamnen, med osmanska hus, Hadrianus port, den räfflade minareten och många boutiquehotell och kaféer."
      ],
      [
        "Hur långt är det från Antalya flygplats till Kaleiçi?",
        "Cirka 15 km, ungefär 20-30 minuter med bil."
      ],
      [
        "Kan man köra bil in i Kaleiçi?",
        "Bara delvis. Många gränder är gågator eller mycket smala, så fordon stannar ofta vid närmaste port eller torg. Våra chaufförer känner till den närmaste tillfarten till varje hotell."
      ],
      [
        "Är Kaleiçi värt ett besök på vintern?",
        "Ja. De flesta kaféer, restauranger och hotell har öppet, gränderna är lugna och dagarna är oftast milda och soliga."
      ],
      [
        "Hur mycket tid behöver man i Kaleiçi?",
        "En halvdag räcker för en första promenad. Med museet, Karaalioğluparken och Düdenvattenfallen är en hel dag eller två idealiskt."
      ]
    ]
  }
};
