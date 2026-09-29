/**
 * Blog copy for da: the page chrome plus every article body.
 * One file per language, so adding a market is adding a file.
 */
export const chrome = {
  locale: "da_DK",
  indexTitle: "Transferguides til Antalya og rejseartikler | Antalya VIP Tourism",
  indexDescription:
    "Praktiske guides til ankomsten i Antalya: privat transfer eller taxa, mødet med chaufføren, rejse med børn, afstande langs kysten og hvornår man skal rejse.",
  heading: "Transferguides til Antalya",
  intro:
    "Praktiske artikler om ankomsten i Antalya Lufthavn og vejen til hotellet - fra de transfers, vi kører hver dag, ikke fra en brochure.",
  blog: "Guides",
  readMore: "Læs guiden",
  minReadLabel: "{minutes} min læsning",
  updated: "Opdateret",
  contents: "I denne guide",
  faqHeading: "Ofte stillede spørgsmål",
  relatedHeading: "Transferruter i denne guide",
  routeGuidesHeading: "Guides til denne transfer",
  moreHeading: "Flere guides",
  ctaHeading: "Transfer til fast pris fra Antalya Lufthavn",
  ctaText:
    "Én pris for hele bilen, flyovervågning inkluderet og kontant betaling til chaufføren. Tjek din rute, og book på et minut.",
  ctaButton: "Se din faste pris",
  backToBlog: "Alle guides",
  home: "Forside",
  routes: "Transferruter",
  book: "Book din transfer",
  imprint: "Juridisk information",
  privacy: "Privatliv",
  imprintUrl: "/impressum.html",
  privacyUrl: "/privacy/",
};

export const articles = {
  "transfer-vs-taxi": {
    slug: "transfer-eller-taxa-antalya-lufthavn",
    title: "Antalya Lufthavn: privat transfer, taxa eller delt shuttle?",
    heading: "Privat transfer, taxa eller delt shuttle fra Antalya Lufthavn?",
    description:
      "Hvad de tre muligheder fra Antalya Lufthavn reelt koster, hvor lang tid de tager, og hvilken der passer til jeres selskab. Sammenligning med fast pris pr. bil.",
    excerpt:
      "Tre måder at forlade Antalya Lufthavn på og tre meget forskellige starter på ferien. Hvad hver enkelt koster, hvor lang tid den tager, og hvem den passer til.",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "Du lander i Antalya Lufthavn (AYT) efter tre til fem timers flyvning, ofte sent om aftenen, som regel med bagage og ikke sjældent med børn. De næste fyrre minutter afgør, hvordan ferien begynder. Der er tre realistiske veje ud af terminalen, og den laveste skiltede pris er sjældent den billigste tur." },
      { type: "h2", text: "De tre muligheder side om side" },
      {
        type: "table",
        head: ["", "Privat transfer", "Lufthavnstaxa", "Delt shuttle"],
        rows: [
          ["Prisgrundlag", "Fast, pr. bil", "Taxameter, pr. tur", "Pr. person"],
          ["Kendt på forhånd", "Ja", "Nej", "Ja"],
          ["Venter ved forsinkelse", "Ja, med flyovervågning", "Nej", "Begrænset"],
          ["Stop før jeres hotel", "Ingen", "Ingen", "Op til 8"],
          ["Bagagekapacitet", "Som en minibus", "Som en personbil", "Delt"],
          ["Autostol", "På forespørgsel, gratis", "Sjældent", "Nej"],
        ],
      },
      { type: "h2", text: "Hvad en taxa reelt koster" },
      { type: "p", text: "Taxaen er det oplagte svar i enhver lufthavn, og på korte afstande er den et fornuftigt valg. På Den Tyrkiske Riviera er afstanden problemet: Belek ligger 45 km væk, Side 65 km, Alanya 125 km. Et taxameter, der kører 125 km om natten, med en returtur chaufføren skal indregne, giver et beløb, ingen oplyste på forhånd. Og du har intet at støtte dig til, hvis ruten ikke var den direkte." },
      { type: "p", text: "En privat transfer vender det om: prisen for hele bilen er aftalt, før du flyver, den ændrer sig ikke i tæt trafik, og den er den samme, uanset om der kører én eller seks." },
      { type: "h2", text: "Hvorfor delt shuttle ser billig ud uden at være det" },
      { type: "p", text: "En pris pr. person ser uovertruffen ud for den, der rejser alene, og holder op med at være billig allerede ved to. For en familie på fire til Side koster fire pladser typisk mere end én minibus til fast pris. Den reelle pris er dog tid: bilen kører, når den er fuld, og sætter gæster af langs kystvejen i den rækkefølge, der passer ruten, ikke jer. At komme sidst efter en natflyvning lægger let mere end en time oveni." },
      { type: "h2", text: "Hvornår hvilken løsning er den rigtige" },
      {
        type: "ul",
        items: [
          "Alene, håndbagage, landing om dagen, hotel i Antalya by: taxa eller shuttle er fint.",
          "To eller flere med hotel uden for byen: egen bil er som regel billigere og altid hurtigere.",
          "Familier med autostole, klapvogn eller golfbags: privat, fordi kapaciteten er bekræftet på forhånd.",
          "Natankomster og forbindelser, der kan skride: privat, fordi afhentningen følger flyet og ikke en køreplan.",
        ],
      },
      { type: "h2", text: "Hvad du bør tjekke før du booker" },
      { type: "p", text: "Tre spørgsmål gør forskellen tydelig. Er prisen pr. bil eller pr. person? Er den fast, eller flytter den sig med trafik og tidspunkt? Og hvad sker der, hvis flyet lander to timer for sent - står der stadig nogen, og koster det ekstra? Vores faste priser er pr. bil, flyovervågning er inkluderet, og de første 90 minutters ventetid efter landing er gratis og rykker automatisk ved forsinkelse." },
    ],
    faq: [
      ["Er en privat transfer dyrere end en taxa i Antalya?", "Til Antalya by er det sammenligneligt. Til Belek, Side, Kemer eller Alanya ligger en fast pris pr. bil normalt under taxameterprisen på samme strækning, og du kender den, før du flyver."],
      ["Betaler jeg pr. person eller pr. bil?", "Pr. bil. Prisen for en Mercedes Vito dækker op til seks passagerer; Sprinter er til større selskaber. En passager mere ændrer ikke prisen."],
      ["Hvad hvis mit fly er forsinket?", "Vi følger flyet i realtid og rykker afhentningen uden ekstra omkostning. De inkluderede 90 minutters ventetid regnes fra den faktiske landing."],
      ["Kan jeg betale kontant ved ankomst?", "Ja. Forudbetaling er ikke nødvendig; du betaler det faste beløb fra din booking direkte til chaufføren, når turen begynder."],
    ],
  },
  "airport-arrival-guide": {
    slug: "ankomst-antalya-lufthavn-guide",
    title: "Ankomst i Antalya Lufthavn: terminaler, mødested og ventetid",
    heading: "Ankomst i Antalya Lufthavn: hvad der sker efter landing",
    description:
      "Trin for trin gennem ankomsten i Antalya Lufthavn - terminaler, paskontrol, bagage, hvor chaufføren venter, og hvor længe den gratis ventetid varer.",
    excerpt:
      "Fra hjulene rammer banen til bildøren: terminaler, paskontrol, mødestedet og hvad der sker, når flyet er forsinket.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Antalya Lufthavn ekspederer over tredive millioner passagerer om året, og næsten alle ankommer inden for et smalt sommervindue. Kender du rækkefølgen på forhånd, bliver en fyldt terminal til en formalitet på tyve minutter." },
      { type: "h2", text: "Hvilken terminal du lander i" },
      { type: "p", text: "AYT har tre terminaler. De fleste internationale ruteflyvninger bruger Terminal 1 eller Terminal 2; charter- og sæsonflyvninger håndteres normalt i Terminal 2. Indenrigsterminalen betjener fly fra Istanbul, Ankara og Izmir. Du behøver ikke finde ud af det selv: flynummeret fortæller os det, og chaufføren sendes til den rigtige ankomsthal." },
      { type: "h2", text: "Paskontrol og bagage" },
      { type: "p", text: "De fleste europæiske statsborgere rejser ind i Tyrkiet uden visum ved korte ophold, men tjek reglerne for dit eget pas før afrejsen. Regn med 20 til 45 minutter fra landing til du er ude med bagagen i højsæsonen, mindre uden for juli og august. Bagageudleveringen varierer mest, og derfor betyder et ventevindue mere end et lovet afhentningstidspunkt." },
      { type: "h2", text: "Hvor chaufføren møder jer" },
      {
        type: "ul",
        items: [
          "Hent bagagen, og gå videre til ankomsthallen.",
          "Gå mod meet & greet-området J / 777.",
          "Vores lufthavnsteam finder jeres booking og følger jer til chaufføren.",
          "Chaufføren bærer bagagen til bilen på den nærliggende parkering.",
        ],
      },
      { type: "p", text: "I skal ikke lede efter et navneskilt blandt halvtreds andre. Teamet står et fast sted og har jeres bookingnummer, så overleveringen fungerer ens kl. 06.00 og kl. 02.00." },
      { type: "h2", text: "Hvad der sker, hvis flyet er forsinket" },
      { type: "p", text: "Vi følger selve flyet, ikke den køreplan I bookede efter. Lander det to timer for sent, rykker afhentningen to timer, og prisen ændrer sig ikke. De første 90 minutters ventetid efter den faktiske landing er inkluderet uden beregning - det dækker en lang paskø eller forsinket bagage." },
      { type: "h2", text: "Før afrejsen" },
      { type: "p", text: "To detaljer gør dagen nem: giv os flynummeret og ikke kun ankomsttidspunktet, og oplys antallet af autostole allerede ved bookingen. Begge dele er gratis - og begge dele er langt sværere at arrangere kl. 01.00 i ankomsthallen." },
    ],
    faq: [
      ["Hvor præcist møder jeg chaufføren i Antalya Lufthavn?", "I meet & greet-området J / 777 i ankomsthallen, efter I har hentet bagagen. Vores team har jeres booking og følger jer til chaufføren."],
      ["Hvor længe venter chaufføren?", "De første 90 minutter efter jeres faktiske landingstidspunkt er inkluderet gratis, og vinduet rykker automatisk, hvis flyet er forsinket."],
      ["Hvor lang tid tager det at komme ud af terminalen?", "Typisk 20 til 45 minutter fra landing, afhængigt af paskontrol og bagageudlevering. Længst tid tager det i juli og august."],
      ["Skal jeg sende mit flynummer?", "Ja, tak. Med flynummeret følger vi den reelle landingstid og sender chaufføren til den rigtige terminal."],
    ],
  },
  "alanya-distance-guide": {
    slug: "antalya-lufthavn-til-alanya-afstand",
    title: "Antalya Lufthavn til Alanya: afstand, køretid og transfermuligheder",
    heading: "Fra Antalya Lufthavn til Alanya: hvor langt der reelt er",
    description:
      "125 km ad kystvejen D400. Hvor lang turen til Alanya reelt er, hvor feriedistrikterne ligger, og hvordan man planlægger en sen ankomst.",
    excerpt:
      "Alanya er den længste af de gængse transfers fra Antalya. Den reelle afstand, den reelle køretid og hvad der ændrer sig ved en natankomst.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Alanya ligger 125 km øst for Antalya Lufthavn, hvilket gør det til den længste rutinemæssigt bookede transfer på Den Tyrkiske Riviera. Netop den afstand former alle andre beslutninger om turen." },
      { type: "h2", text: "Afstand og køretid" },
      {
        type: "table",
        head: ["Destination", "Afstand fra AYT", "Typisk køretid"],
        rows: [
          ["Antalya by", "15 km", "20-30 minutter"],
          ["Side", "65 km", "55-65 minutter"],
          ["Manavgat", "75 km", "60-70 minutter"],
          ["Kızılağaç", "85 km", "70-80 minutter"],
          ["Alanya", "125 km", "110-130 minutter"],
        ],
      },
      { type: "p", text: "Ruten følger kystvejen D400 mod øst gennem Serik, Manavgat og Kızılağaç. Det er en god vej, men den går gennem byerne i stedet for uden om dem, så sommereftermiddage og lørdagens chartertoppe lægger tid oveni, som ingen køreplan kan fjerne." },
      { type: "h2", text: "Alanya er ikke ét sted" },
      { type: "p", text: "Hoteller, der sælges som \"Alanya\", fordeler sig over cirka 65 km kyst. Avsallar, Türkler og Okurcalar ligger vest for centrum og mærkbart tættere på lufthavnen; Mahmutlar, Kestel, Kargıcak og Demirtaş ligger øst for det og lægger 20 til 45 minutter til. Angiv hotellets navn ved booking, ikke kun feriebyen - det afgør både køretid og den korrekte faste pris." },
      { type: "h2", text: "Hvorfor delt shuttle gør mest ondt her" },
      { type: "p", text: "På en strækning på 125 km er hvert ekstra hotelstop en reel omvej. En shuttle, der sætter otte selskaber af langs kysten, gør let to timer til fire, og den familie, der står af sidst, bor normalt længst mod øst. En privat bil kører ruten én gang, i jeres rækkefølge, og den faste pris flytter sig ikke med trafikken." },
      { type: "h2", text: "At planlægge en sen ankomst" },
      { type: "p", text: "Mange fly til Alanya lander efter kl. 23.00. Så betyder to ting noget: at nogen med sikkerhed venter, og at prisen var aftalt, før I fløj. Vi følger flyet, så en forsinket landing rykker afhentningen i stedet for at aflyse den, og de første 90 minutters ventetid er inkluderet. Der betales kontant til chaufføren ved turens start, så intet skal arrangeres midt om natten." },
    ],
    faq: [
      ["Hvor langt er der fra Antalya Lufthavn til Alanya?", "125 km ad kystvejen D400, normalt 110 til 130 minutters kørsel."],
      ["Er transferprisen den samme for alle hoteller i Alanya?", "Nej. Alanyas kyst strækker sig cirka 65 km, så hoteller i Avsallar eller Okurcalar prissættes anderledes end i Mahmutlar eller Kargıcak. Angiv hotellets navn, og du ser den korrekte faste pris."],
      ["Er der et stop undervejs?", "På en privat transfer kan vi holde kort på forespørgsel. Der er ingen planlagte stop og ingen andre passagerer."],
      ["Hvad hvis jeg lander efter midnat?", "Afhentningen følger jeres faktiske landingstidspunkt. Natankomster er normale på denne rute og uden tillæg."],
    ],
  },
  "family-child-seats": {
    slug: "transfer-antalya-lufthavn-med-boern",
    title: "Transfer fra Antalya Lufthavn med børn: autostole, klapvogne, bagage",
    heading: "Turen til hotellet med børn",
    description:
      "Autostole, klapvogne og bagage ved transfer fra Antalya Lufthavn. Hvad I skal oplyse ved booking, og hvorfor privat er enklere med små børn.",
    excerpt:
      "Autostole er gratis på forespørgsel, men kun hvis vi ved det, før I lander. Hvad I skal fortælle os, og hvad der reelt kan være i bilen.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "En transfer med små børn er et logistikproblem, ikke et prisproblem. Stole, en klapvogn, en rejseseng og fire kufferter skal kunne være i den samme bil samtidig - og beslutningerne, der gør det muligt, træffes ved bookingen, ikke i terminalen." },
      { type: "h2", text: "Autostole" },
      { type: "p", text: "Vi stiller autostole til rådighed uden beregning på forespørgsel. Oplys antal børn og deres alder ved bookingen; det afgør, om der skal bruges babyautostol, autostol til småbørn eller selepude. Stolene klargøres sammen med bilen, så der er intet at bære gennem lufthavnen og intet at arrangere kl. 01.00 i ankomsthallen." },
      { type: "h2", text: "Hvad der er plads til i bilen" },
      {
        type: "ul",
        items: [
          "Mercedes Vito: op til seks passagerer med almindelig ferie-bagage.",
          "Mercedes Sprinter: større selskaber, op til 12 pladser, og det rigtige valg, når klapvogn og rejseseng er med.",
          "Klapvogne og autostole tæller ikke med i antallet af passagerer, men fylder i bagagerummet - sig til, så tilpasser vi bilen.",
        ],
      },
      { type: "p", text: "Den faste pris gælder bilen, ikke sædet, så et barn mere ændrer aldrig prisen. Det, der ændrer sig, er hvilken bil vi sender." },
      { type: "h2", text: "Hvorfor privat betyder mere med børn" },
      { type: "p", text: "I en delt shuttle venter familien først på, at bilen bliver fuld, og kører derefter langs kysten, mens andre sættes af. Med et lille barn efter en natflyvning er det forskellen mellem fyrre minutter og tre timer. En privat bil kører, når I er klar, og kører direkte til hotellets reception." },
      { type: "h2", text: "Praktiske detaljer" },
      { type: "p", text: "Der er drikkevand i bilen. Er der brug for et kort stop på den lange tur til Side eller Alanya, så sig det bare til chaufføren - der er ingen køreplan at overholde. Og fordi der betales kontant ved turens start, skal ingen lede efter kort eller dækning med et sovende barn på armen." },
    ],
    faq: [
      ["Er autostole gratis?", "Ja. Autostole stilles til rådighed uden ekstra beregning på forespørgsel. Oplys venligst antal børn og deres alder ved bookingen."],
      ["Må jeg tage en klapvogn med?", "Ja. Sig til ved bookingen, så vi afsætter plads - en klapvogn plus et fuldt sæt kufferter kan betyde Sprinter i stedet for Vito."],
      ["Tæller børn med i passagerantallet?", "For antallet af pladser, ja. Prisen ændrer sig ikke: den er fast pr. bil, ikke pr. person."],
      ["Kan vi holde ind på en lang transfer?", "Ja. På en privat transfer kan chaufføren holde kort på forespørgsel; der venter ingen andre passagerer."],
    ],
  },
  "belek-golf-transfer": {
    slug: "golftransfer-til-belek",
    title: "Golftransfer til Belek: køller, selskaber og timing fra AYT",
    heading: "Fra Antalya Lufthavn til Belek med golfbags",
    description:
      "Hvordan golfbagage rejser fra Antalya Lufthavn til Belek: valg af bil, selskabets størrelse, timing i forhold til starttid og hvad I skal oplyse ved booking.",
    excerpt:
      "Belek er først en golfdestination og dernæst et badested. Hvad det betyder for bagagerummet, valget af bil og turen fra AYT.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Belek ligger 45 km øst for Antalya Lufthavn, 35 til 40 minutters kørsel, og rummer den tætteste samling af mesterskabsbaner i Tyrkiet. De fleste selskaber, der ankommer dertil, har noget med, som en almindelig transfer ikke er dimensioneret til: golfbags." },
      { type: "h2", text: "Golfbags og valg af bil" },
      { type: "p", text: "En tourbag er cirka 130 cm lang og deler pladsen dårligt med kufferter. Som tommelfingerregel klarer en Mercedes Vito fire passagerer med fire golfbags og deres almindelige bagage; derudover er en Mercedes Sprinter den rigtige bil. Oplys antallet af bags ved bookingen, så tilpasser vi bilen efter lasten og ikke efter antallet af personer." },
      {
        type: "ul",
        items: [
          "Fire spillere, fire bags, almindelige kufferter: Vito.",
          "Seks til otte spillere, eller bags plus store kufferter: Sprinter.",
          "Blandet selskab med ikke-spillende ledsagere: tæl bags, ikke personer.",
        ],
      },
      { type: "h2", text: "Timing i forhold til starttiden" },
      { type: "p", text: "Turen er kort, lufthavnen ikke. Regn med 20 til 45 minutter fra landing til I forlader terminalen i højsæsonen, og derefter 35 til 40 minutter på vejen. En starttid om formiddagen på ankomstdagen er kun realistisk for fly, der lander før cirka kl. 07.00; ellers planlæg første runde til næste morgen." },
      { type: "h2", text: "Baner og hoteller i området" },
      { type: "p", text: "Resorterne i Belek - blandt dem Regnum Carya, Gloria, Cornelia og Maxx Royal - ligger få kilometer fra hinanden og fra banerne, så et ekstra stop for en medspiller på et andet hotel koster minutter frem for en time. På en privat transfer kan det lade sig gøre; i en delt shuttle bestemmer I ikke rækkefølgen." },
      { type: "h2", text: "Hvad I skal bekræfte ved booking" },
      { type: "p", text: "Tre ting: antallet af golfbags, hotellets navn og afhentningstidspunktet for returen, hvis I allerede kender afrejsen. Prisen er fast pr. bil, så en større bil på grund af bagagen er et tilbud, I ser før rejsen, aldrig et tillæg ved kantstenen." },
    ],
    faq: [
      ["Koster golfbagage ekstra?", "Nej. Prisen er fast pr. bil. Større bagage kan betyde, at vi sender en Sprinter i stedet for en Vito, og den pris ser I ved bookingen."],
      ["Hvor mange golfbags er der plads til i en Vito?", "Som praktisk regel fire bags med fire passagerer og almindelige kufferter. Ved flere bags eller spillere bruger vi en Sprinter."],
      ["Hvor lang er turen fra Antalya Lufthavn til Belek?", "45 km, normalt 35 til 40 minutter i almindelig trafik."],
      ["Kan vi holde ved et andet hotel i Belek?", "Ja. Resorterne ligger tæt på hinanden, så en ekstra afsætning på en privat transfer koster kun få minutter. Nævn det ved bookingen."],
    ],
  },
  "when-to-visit-antalya": {
    slug: "bedste-tid-at-besoege-antalya",
    title: "Bedste tid at besøge Antalya: sæson for sæson og hvad det betyder for transferen",
    heading: "Hvornår man skal besøge Antalya - og hvordan sæsonen ændrer ankomsten",
    description:
      "Antalya sæson for sæson: vejr, travlhed, priser og lufthavnstrafik. Hvad hver måned betyder for flytider, trafik og planlægningen af jeres ankomst.",
    excerpt:
      "Hver sæson på Den Tyrkiske Riviera giver en anden ankomst. Hvad der ændrer sig mellem april og oktober, og hvorfor det betyder noget på vejen.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Antalya er travl i omkring syv måneder og stille i fem, og forskellen viser sig længe før stranden - i flypriser, køer i lufthavnen og trafikken på D400." },
      { type: "h2", text: "April til maj: vinduet med bedst værdi" },
      { type: "p", text: "Vandtemperaturen stiger gennem maj, dagtemperaturerne ligger over tyve grader, og kystvejen er tom efter sommerstandard. Flyene lander på civiliserede tidspunkter, og terminalen tømmes hurtigt. Det er også her, en tur til Alanya eller Kaş er en fornøjelse frem for en udholdenhedsprøve." },
      { type: "h2", text: "Juni til august: højsæson" },
      { type: "p", text: "Juli og august er varme, fyldte og dyre. Antalya Lufthavn har sin tungeste trafik, paskontrol og bagage tager længst tid, og kystvejen bærer både ferietrafik og lokal weekendtrafik. Det er da, en fast pris og en flyovervåget afhentning gør mest nytte: intet på vejen er forudsigeligt, så alt, der kan låses på forhånd, er værd at låse." },
      { type: "h2", text: "September til oktober: det bedste kompromis" },
      { type: "p", text: "Havet er varmest, travlheden aftager uge for uge, og priserne falder fra midten af september. Mange faste gæster anser slutningen af september for årets bedste uge på denne kyst. Transfers holder igen nogenlunde deres nominelle tider." },
      { type: "h2", text: "November til marts: den stille sæson" },
      { type: "p", text: "Dagtemperaturerne forbliver milde, mange strandhoteller lukker, og byen, bjergene og ruinerne overtager efter kysten. Flyudbuddet skrumper, og ankomsttiderne bliver mindre bekvemme - hvilket er præcis, når en forudbestilt bil slår improvisation i terminalen." },
      { type: "h2", text: "Hvad sæsonen ændrer ved jeres transfer" },
      {
        type: "ul",
        items: [
          "Højsommer: regn med op til 45 minutter fra landing til I forlader terminalen, og længere køretider øst for Manavgat.",
          "Mellemsæson: de oplyste køretider er realistiske.",
          "Vinter: færre fly og flere natlandinger, så bekræft flynummeret, og lad afhentningen følge det.",
          "Hele året: den faste pris pr. bil ændrer sig ikke med sæson, trafik eller tidspunkt.",
        ],
      },
    ],
    faq: [
      ["Hvilken måned er bedst at besøge Antalya?", "Slutningen af september giver som regel den bedste kombination: havet er varmest, travlheden er aftaget, og priserne er begyndt at falde."],
      ["Er Antalya Lufthavn mere travl om sommeren?", "Betydeligt. Regn i juli og august med op til 45 minutter fra landing til I forlader terminalen; i mellemsæsonen er det ofte halvdelen."],
      ["Ændrer transferpriserne sig efter sæson?", "Nej. Vores priser er faste pr. bil og ændrer sig ikke med sæson, trafik eller tidspunkt."],
      ["Er Antalya et besøg værd om vinteren?", "Ja, for byen, bjergene og de arkæologiske steder snarere end for stranden. Mange kysthoteller er lukkede fra november til marts."],
    ],
  },
  "antalya-in-autumn": {
    "slug": "antalya-om-efteraaret-oplevelser",
    "title": "Antalya i oktober og november: oplevelser om efteråret",
    "heading": "Antalya om efteråret: hvad kan man lave i oktober og november?",
    "description": "Antalya om efteråret: varmt hav, rolige strande, antikke ruiner, kløftvandringer og golf i oktober og november. Vejret, hvad der har åbent, og hvordan du planlægger ankomsten.",
    "excerpt": "Havet er stadig varmt, menneskemængderne er taget hjem, og heden er brudt. Derfor er oktober og november Den Tyrkiske Rivieras bedst bevarede hemmelighed.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "De fleste turister forlader Antalya i slutningen af september – og det er netop derfor, Antalya om efteråret fungerer så godt. Havet holder på sommervarmen i flere uger, dagtemperaturen falder til behagelige 20 grader, og de steder, der er uudholdelige i august – ruinerne, kløfterne, den gamle bydel – bliver rejsens højdepunkt."
      },
      {
        "type": "h2",
        "text": "Vejret i Antalya om efteråret"
      },
      {
        "type": "table",
        "head": [
          "Måned",
          "Dag / nat",
          "Hav",
          "Sådan føles det"
        ],
        "rows": [
          [
            "Oktober",
            "ca. 27 °C / 16 °C",
            "ca. 24 °C",
            "Sommer uden hede – strandture er stadig det normale"
          ],
          [
            "November",
            "ca. 21 °C / 11 °C",
            "ca. 21 °C",
            "Solrige formiddage, de første regnbyger, kølige aftener"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Pak til både stranden og aftenen: en let jakke er nok i oktober, mens et varmere lag og en regnjakke er fornuftigt i november."
      },
      {
        "type": "h2",
        "text": "Stadig badeferie: oktober ved kysten"
      },
      {
        "type": "p",
        "text": "I oktober har strandene i Konyaaltı, Lara, Belek, Side og Alanya stadig åbent, vandet er ofte varmere end luften om morgenen, og der er ikke længere kamp om liggestolene. De fleste store resorts i Belek, Side og Kemer har åbent til slutningen af oktober; fra november bliver udvalget mindre, så tjek hotellets sæson, før du bestiller fly."
      },
      {
        "type": "h2",
        "text": "Antikke steder uden hede"
      },
      {
        "type": "p",
        "text": "Efteråret er sæsonen for egnens ruiner. Perge og Aspendos ligger en kort omvej fra vejen til Belek og Side, Apollontemplet i Side står ved havnens kant, og Termessos, højt oppe i bjergene bag byen, er en vandretur, som ingen bør begive sig ud på om sommeren. I november kan du have hele søjlegader for dig selv."
      },
      {
        "type": "h2",
        "text": "Natur: kløfter, vandfald og Den Lykiske Sti"
      },
      {
        "type": "ul",
        "items": [
          "Düden-vandfaldene: de nederste fald styrter direkte ud i havet nær Lara, de øverste ligger i en park inde i byen.",
          "Köprülü-kløften: raftingsæsonen varer som regel ind i oktober, med roligere vand end om foråret.",
          "Den Lykiske Sti: efterår og forår er de to vandresæsoner – etaperne omkring Kemer, Olympos og Kaş er på deres bedste nu.",
          "Tahtalı-svævebanen nær Kemer: den klare efterårsluft giver den bedste udsigt fra toppen."
        ]
      },
      {
        "type": "h2",
        "text": "Golf, byliv og festivaler"
      },
      {
        "type": "p",
        "text": "Efteråret er højsæson for golf i Belek: banerne er grønne, temperaturen er ideel, og starttiderne fyldes op af grupper fra Nordeuropa. Inde i byen vågner Kaleiçis gyder, caféer og små museer til live igen, når krydstogts- og sommerturisterne er taget hjem, og Antalyas filmfestival Golden Orange er traditionelt blevet afholdt om efteråret."
      },
      {
        "type": "h2",
        "text": "Ankomst om efteråret"
      },
      {
        "type": "ul",
        "items": [
          "Der er stadig mange fly i oktober; fra november bliver fartplanerne tyndere, og flere fly lander sent om aftenen.",
          "Terminalen er roligere end om sommeren, så køretiderne til Belek, Side og Alanya ligger tæt på de oplyste.",
          "En forudbestilt transfer følger dit flynummer, så et forsinket aftenfly er ikke noget problem.",
          "Vores priser er faste pr. køretøj og er de samme i oktober som i august."
        ]
      }
    ],
    "faq": [
      [
        "Er det varmt nok til at bade i Antalya i oktober?",
        "Ja. Havet er som regel omkring 24 °C i oktober, varmere end mange europæiske have om sommeren, og strandture er det normale hele måneden."
      ],
      [
        "Har hotellerne i Antalya åbent i november?",
        "Byhoteller og mange resorts har åbent, men en del store kystresorts lukker fra november. Tjek hotellets sæsondatoer, før du bestiller fly."
      ],
      [
        "Hvad kan man lave i Antalya om efteråret ud over stranden?",
        "Antikke steder som Perge, Aspendos og Termessos, Düden-vandfaldene, Köprülü-kløften, vandring på Den Lykiske Sti, golf i Belek og den gamle bydel Kaleiçi."
      ],
      [
        "Ændrer transferprisen sig efter sommersæsonen?",
        "Nej. Prisen er fast pr. køretøj og ændrer sig ikke med sæsonen, trafikken eller tidspunktet på døgnet."
      ]
    ]
  },
  "antalya-in-winter": {
    "slug": "antalya-om-vinteren-oplevelser",
    "title": "Antalya om vinteren: oplevelser fra december til februar",
    "heading": "Antalya om vinteren: hvad kan man lave mellem december og februar?",
    "description": "Antalya om vinteren: den gamle bydel, vandfald, antikke ruiner, skiløb i Saklıkent, vintergolf og spahoteller. Vejret, hvad der har åbent, og hvordan du kommer rundt.",
    "excerpt": "Milde dage, sne på bjergene og en by, der igen tilhører sine indbyggere. Hvad Antalya byder på mellem december og februar – og hvad den ikke byder på.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Antalya om vinteren er lavsæson, ikke lukket. Badebyerne hviler, men byen, bjergene og de antikke steder har åbent, lyset er klart, og dagene er ofte solrige og milde. Det er tiden til at se egnen, som de lokale ser den – og til priser, som sommerturisterne aldrig får."
      },
      {
        "type": "h2",
        "text": "Vejret i Antalya om vinteren"
      },
      {
        "type": "table",
        "head": [
          "Måned",
          "Dag / nat",
          "Hav",
          "Godt at vide"
        ],
        "rows": [
          [
            "December",
            "ca. 16 °C / 7 °C",
            "ca. 19 °C",
            "Årets mest regnfulde måned, men regnen kommer i byger mellem solrige dage"
          ],
          [
            "Januar",
            "ca. 15 °C / 6 °C",
            "ca. 17 °C",
            "Koldeste måned; sne på Taurusbjergenes tinder"
          ],
          [
            "Februar",
            "ca. 16 °C / 6 °C",
            "ca. 17 °C",
            "Længere dage, de første mandelblomster"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Solrige vintereftermiddage føles som forår i Skandinavien; aftenerne er kølige, og indendørs er der ikke altid varmet op efter nordisk standard. Tag lag-på-lag-tøj, en vandtæt jakke og behagelige sko til våde brostensgader med."
      },
      {
        "type": "h2",
        "text": "Byen: Kaleiçi, museer og vandfald"
      },
      {
        "type": "ul",
        "items": [
          "Kaleiçi, den befæstede gamle bydel: Hadrians Port, den riflede Yivli-minaret, den gamle havn og gyder med osmanniske huse, der i dag er caféer og boutiquehoteller.",
          "Antalya Museum: en af Tyrkiets store arkæologiske samlinger med statuerne fra Perge – et ideelt besøg på en regnvejrsdag.",
          "Düden- og Kurşunlu-vandfaldene: vinterregnen gør dem fyldigst og mest imponerende.",
          "Strandpromenaderne i Konyaaltı og Lara: lange gåture, cykling og havudsigt uden sommerheden."
        ]
      },
      {
        "type": "h2",
        "text": "Antikke steder uden kø"
      },
      {
        "type": "p",
        "text": "Perge, Aspendos og Side har åbent hele året, og om vinteren deler du dem med en håndfuld besøgende. Phaselis nær Kemer har tre havne i en fyrreskov; Olympos og Çıralı er fredfyldte uden for sæsonen. Termessos ligger i bjergene og kan være koldt, vådt eller endda snedækket, så vælg en tør dag. Længere mod vest er Sankt Nikolaj-kirken i Demre et oplagt vinterbesøg, især omkring jul."
      },
      {
        "type": "h2",
        "text": "Skiløb og hav samme dag"
      },
      {
        "type": "p",
        "text": "Skicentret Saklıkent i Bakırlı-bjergene ligger ca. 50 km fra byen, omkring halvanden time i bil. Når der er sne nok, som regel fra januar til marts, kan du stå på ski om formiddagen og gå langs havet om eftermiddagen. Bjergvejen kan kræve vinterdæk eller snekæder, så tjek forholdene, før du tager af sted, og få et tilbud på turen fra os på forhånd."
      },
      {
        "type": "h2",
        "text": "Vintergolf, spahoteller og lange ophold"
      },
      {
        "type": "p",
        "text": "Golfbanerne i Belek har åbent hele vinteren, og greenfee og hotelpriser ligger et godt stykke under niveauet om efteråret og foråret. Flere resorts i Belek, Lara og Kemer holder spa og indendørs pools åbne om vinteren, og Alanya og Side tiltrækker langtidsgæster fra Nordeuropa, der kommer i uger eller måneder for det milde vejr."
      },
      {
        "type": "h2",
        "text": "Længere udflugter"
      },
      {
        "type": "p",
        "text": "Vinteren er et godt tidspunkt til de længere ture, der er udmattende om sommeren: travertinterrasserne i Pamukkale og ruinerne af Hierapolis, eller Kappadokien under sne, som mange besøgende anser for den smukkeste tid på året dér. Begge er lange dage på vejen, og med et privat køretøj kan du stoppe, når og hvor du vil."
      },
      {
        "type": "h2",
        "text": "Ankomst om vinteren"
      },
      {
        "type": "ul",
        "items": [
          "Der er færre direkte fly og flere natankomster, ofte via Istanbul.",
          "Mange kystresorts er lukket, så tjek, at dit hotel har åbent på dine datoer.",
          "Taxaholdepladserne er mere stille om natten end om sommeren; en forudbestilt afhentning, der følger dit flynummer, er den roligere løsning.",
          "Den faste pris pr. køretøj er den samme om vinteren som om sommeren – intet nat- eller helligdagstillæg."
        ]
      }
    ],
    "faq": [
      [
        "Er Antalya et besøg værd om vinteren?",
        "Ja, hvis du kommer for byen, de antikke steder, naturen og golfen frem for solbadning. Dagene er ofte solrige med temperaturer omkring 15 °C, og der er ingen menneskemængder."
      ],
      [
        "Kan man bade i Antalya om vinteren?",
        "Havet holder sig omkring 17–19 °C, hvilket nogle besøgende synes er forfriskende på en solrig dag. Mange hoteller, der har åbent om vinteren, har også opvarmede indendørs pools."
      ],
      [
        "Kan man stå på ski nær Antalya?",
        "Ja. Skicentret Saklıkent ligger ca. 50 km fra byen. Sæsonen afhænger af snefaldet og varer som regel fra januar til marts."
      ],
      [
        "Har hotellerne i Antalya åbent om vinteren?",
        "Byhotellerne i Antalya og Kaleiçi har åbent hele året, ligesom flere resorts i Lara, Belek, Kemer, Side og Alanya. Mange store sæsonresorts lukker fra november til marts."
      ],
      [
        "Kører I transfer fra Antalya Lufthavn om vinteren?",
        "Ja, hele året, også ved natankomster og på helligdage, til den samme faste pris pr. køretøj."
      ]
    ]
  },
  "christmas-new-year-antalya": {
    "slug": "jul-og-nytaar-i-antalya",
    "title": "Jul og nytårsaften i Antalya: en praktisk guide",
    "heading": "Jul og nytår i Antalya",
    "description": "Jul eller nytår i Antalya: vejret, hvilke hoteller der har åbent, galamiddage, Sankt Nikolaj i Demre og transport til og fra lufthavnen på årets travleste nætter.",
    "excerpt": "Solrige dage, nytårsgalla ved havet og Sankt Nikolajs by to og en halv time væk. Sådan planlægger du højtiden i Antalya – og sådan kommer du rundt nytårsnat.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Jul og nytår i Antalya er en af de få vintertoppe på egnen. Familier, der flygter fra den nordiske vinter, grupper, der fejrer nytårsaften, og gæster, der kombinerer højtiden med et par dage i mild sol, ankommer alle i de samme to uger – mens store dele af kysten ellers har lavsæson."
      },
      {
        "type": "h2",
        "text": "Hvad kan man forvente i slutningen af december?"
      },
      {
        "type": "p",
        "text": "Dagene når som regel omkring 15–16 °C og er ofte solrige, selvom december også er årets mest regnfulde måned. Jul er ikke en officiel helligdag i Tyrkiet, så butikker, restauranter og seværdigheder har åbent som normalt den 25. december. Nytårsaften fejres til gengæld bredt, og 1. januar er en officiel helligdag."
      },
      {
        "type": "h2",
        "text": "Hvilke hoteller har åbent?"
      },
      {
        "type": "p",
        "text": "Byhotellerne i Antalya og Kaleiçi har åbent hele året, og flere resorts i Lara, Belek, Kemer, Side og Alanya åbner specielt i højtiden med julemiddag og nytårsgalla. Program, dresscode og gallatillæg varierer meget, så spørg hotellet, hvad der er inkluderet, før du booker. Værelserne på de åbne resorts bliver hurtigt udsolgt på disse datoer."
      },
      {
        "type": "h2",
        "text": "Jul: Sankt Nikolajs by"
      },
      {
        "type": "p",
        "text": "Den historiske Sankt Nikolaj, biskoppen bag legenden om julemanden, levede i Myra – det nuværende Demre, omkring to en halv time vest for Antalya. Sankt Nikolaj-kirken og Myras klippehuggede lykiske grave er en mindeværdig juleudflugt, der kan kombineres med et stop i Kaş eller kystvejen omkring Kumluca."
      },
      {
        "type": "h2",
        "text": "Nytårsaften i Antalya"
      },
      {
        "type": "ul",
        "items": [
          "Hotelgallaer: middag, livemusik og nedtælling, som regel med fast menu og tillæg.",
          "Byen: restauranterne i Kaleiçi og omkring lystbådehavnen er fyldte; bestil bord i forvejen.",
          "Lara og Konyaaltı: strandklubber og restauranter med havudsigt holder deres egne fester.",
          "Fyrværkeri kan ses langs strandpromenaden, men programmet skifter fra år til år."
        ]
      },
      {
        "type": "h2",
        "text": "Transport på de travleste nætter"
      },
      {
        "type": "p",
        "text": "Nytårsaften og i de tidlige timer den 1. januar er det svært at finde en taxa, og apps og holdepladser er overbelastede, præcis når alle vil hjem. Hvis du fejrer nytår et andet sted end på hotellet – i byen, på en restaurant eller i en vens villa – så bestil hjemturen på forhånd med et fast afhentningstidspunkt."
      },
      {
        "type": "h2",
        "text": "Ankomst og afrejse i højtiden"
      },
      {
        "type": "ul",
        "items": [
          "Flyene omkring den 20. december og den 2. januar er vinterens travleste; book tidligt.",
          "Mange fly i højtiden lander om aftenen eller natten – en afhentning, der følger dit flynummer, sparer dig for ventetid i terminalen.",
          "Familier med julegaver og vinterbagage bør oplyse antallet af kufferter, så vi sender det rigtige køretøj.",
          "Vores faste pris pr. køretøj har intet helligdags- eller nytårstillæg."
        ]
      }
    ],
    "faq": [
      [
        "Hvordan er vejret i Antalya i julen?",
        "Mildt: typisk omkring 15–16 °C om dagen og 6–8 °C om natten, med solrige perioder mellem bygerne. Det er ikke strandvejr, men ofte behageligt til gåture og sightseeing."
      ],
      [
        "Fejres julen i Antalya?",
        "Jul er ikke en officiel helligdag i Tyrkiet, men mange hoteller med internationale gæster arrangerer julemiddag. Nytårsaften fejres bredt, og 1. januar er en officiel helligdag."
      ],
      [
        "Hvor ligger Sankt Nikolaj-kirken?",
        "I Demre, det antikke Myra, omkring to en halv times kørsel vest for Antalya. Den har åbent for besøgende hele året."
      ],
      [
        "Kan jeg bestille transfer nytårsnat?",
        "Ja. Vi anbefaler at bestille hjemturen med et fast afhentningstidspunkt, fordi det er meget svært at finde en taxa efter midnat. Den faste pris pr. køretøj har intet helligdagstillæg."
      ]
    ]
  },
  "wintering-in-antalya": {
    "slug": "overvintre-i-alanya-og-antalya",
    "title": "Overvintre i Antalya og Alanya: guide til lange ophold",
    "heading": "Overvintre i Antalya: en guide til lange ophold",
    "description": "Overvintre i Alanya, Side eller Antalya på Den Tyrkiske Riviera: vejret, bolig, sundhedsvæsen og ankomst med meget bagage – det bør du vide før et langt ophold.",
    "excerpt": "Uger eller måneder med mildt vejr i stedet for en nordisk vinter. Det bør langtidsgæster vide, før de overvintrer i Alanya, Side eller Antalya.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Hver vinter bytter tusindvis af gæster fra Tyskland, Skandinavien, Holland, Rusland og Polen den grå himmel ud med Den Tyrkiske Riviera i uger eller måneder ad gangen. At overvintre i Alanya, Side eller Antalya lokker med milde temperaturer, lange strandpromenader og lavere leveomkostninger end derhjemme – byerne er blandt Middelhavets mest populære vinterdestinationer."
      },
      {
        "type": "h2",
        "text": "Derfor skal du overvintre her"
      },
      {
        "type": "ul",
        "items": [
          "Mildt klima: vinterdage omkring 15–17 °C, ofte solrigt, sjældent frost ved kysten.",
          "Dagslys: mærkbart flere solskinstimer end i Nord- og Centraleuropa.",
          "Plads: strandpromenader, strande og gamle bydele uden sommerens menneskemængder.",
          "Infrastruktur: butikker, markeder, restauranter og privathospitaler har åbent hele året i de større byer."
        ]
      },
      {
        "type": "h2",
        "text": "Vælg, hvor du vil bo"
      },
      {
        "type": "table",
        "head": [
          "Sted",
          "Passer til",
          "Afstand fra lufthavnen"
        ],
        "rows": [
          [
            "Antalya by",
            "Byliv, kultur, museer, alle tilbud lige om hjørnet",
            "ca. 15–30 minutter"
          ],
          [
            "Side / Manavgat",
            "En rolig gammel bydel, lange strande, flade gåture",
            "ca. 1 time"
          ],
          [
            "Alanya",
            "Det største miljø af langtidsgæster, strandpromenader, aktivt vinterliv",
            "ca. 1 time og 45 minutter"
          ],
          [
            "Kemer",
            "Bjerge og hav, vandring, en mindre ferieby",
            "ca. 1 time"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Alanya og nabobydelene som Mahmutlar og Oba har det største vintermiljø af langtidsgæster, med klubber, aktiviteter og restauranter, der er travle hele vinteren. Side er roligere; Antalya passer til dig, der vil bo i en rigtig by."
      },
      {
        "type": "h2",
        "text": "Bolig: hoteller og lejligheder"
      },
      {
        "type": "p",
        "text": "Nogle hoteller i Alanya, Side og Antalya tilbyder særlige langtidspriser for ophold på fire uger eller mere, ofte med halvpension. En lejet lejlighed giver mere plads og frihed; tjek, om den har varme eller aircondition med varmefunktion, for tyrkiske kysthuse er bygget til sommer og kan føles kolde på vinteraftener."
      },
      {
        "type": "h2",
        "text": "Hverdagsliv om vinteren"
      },
      {
        "type": "ul",
        "items": [
          "Ugentlige markeder i hver bydel med frisk frugt og grønt – vinteren er citrussæson.",
          "Gåture og cykling langs strandpromenaderne i Alanya, Side, Lara og Konyaaltı.",
          "Vandring ved foden af Taurusbjergene og på Den Lykiske Sti på tørre dage.",
          "Dagsture til antikke steder, Manavgat-vandfaldet eller Antalyas gamle bydel.",
          "Privathospitaler og klinikker i Antalya og Alanya med afdelinger for internationale patienter."
        ]
      },
      {
        "type": "h2",
        "text": "Papirer og praktiske forhold"
      },
      {
        "type": "p",
        "text": "Indrejseregler og hvor længe du må blive uden opholdstilladelse, afhænger af dit statsborgerskab og ændres fra tid til anden, så tjek de gældende regler hos de officielle tyrkiske myndigheder, før du rejser. En rejseforsikring, der dækker et langt ophold i udlandet, anbefales stærkt."
      },
      {
        "type": "h2",
        "text": "Ankomst med bagage til flere måneder"
      },
      {
        "type": "p",
        "text": "Langtidsgæster rejser med mere end en feriekuffert. Fortæl os, hvor mange kufferter og ekstra ting du har med – cykler, rollatorer eller kasser – så sender vi en Mercedes Vito eller om nødvendigt en Sprinter. Prisen er fast pr. køretøj, så ekstra bagage indregnes, når du booker, i stedet for at blive opkrævet ved kantstenen. Chaufføren hjælper med at læsse af og på ved døren."
      }
    ],
    "faq": [
      [
        "Hvor er det bedst at overvintre på Den Tyrkiske Riviera?",
        "Alanya har det største miljø af langtidsgæster og det travleste vinterliv; Side er roligere; Antalya har alle en storbys tilbud. Alle tre har milde vintre."
      ],
      [
        "Hvor varmt er det i Antalya om vinteren?",
        "Dagtemperaturen ligger som regel omkring 15–17 °C fra december til februar, med nætter omkring 6–8 °C. Frost ved kysten er sjælden."
      ],
      [
        "Findes der hoteltilbud til lange ophold om vinteren?",
        "Ja. Flere hoteller i Alanya, Side og Antalya tilbyder nedsatte måneds- eller langtidspriser om vinteren. Spørg hotellet direkte om ophold på fire uger eller mere."
      ],
      [
        "Kan man have meget bagage med på lufthavnstransferen?",
        "Ja. Oplys antallet af kufferter og ekstra ting, når du booker, så sender vi et køretøj med plads nok. Prisen er pr. køretøj, uden gebyr pr. kuffert."
      ]
    ]
  },
  "antalya-in-spring": {
    "slug": "antalya-om-foraaret-oplevelser",
    "title": "Antalya om foråret: oplevelser fra marts til maj",
    "heading": "Antalya om foråret: hvad kan man lave mellem marts og maj?",
    "description": "Antalya om foråret: appelsinblomster, vandring på Den Lykiske Sti, rafting, påskeferie og årets første strandture. Vejret måned for måned og hvad du kan forvente ved ankomst.",
    "excerpt": "Appelsinblomster i gaderne, sne på tinderne og et hav, der bliver varmere uge for uge. Derfor er foråret sæsonen for aktiv ferie omkring Antalya.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Foråret kommer tidligt til Den Tyrkiske Riviera, og Antalya om foråret er noget helt særligt. Allerede i marts blomstrer appelsintræerne, Taurusbjergene har stadig sne, og dagene er varme nok til at sidde udenfor. Det er den bedste sæson til vandring, cykling og opdagelsesture, og i maj begynder årets første strandture."
      },
      {
        "type": "h2",
        "text": "Vejret i Antalya om foråret"
      },
      {
        "type": "table",
        "head": [
          "Måned",
          "Dag / nat",
          "Hav",
          "Bedst til"
        ],
        "rows": [
          [
            "Marts",
            "ca. 19 °C / 8 °C",
            "ca. 17 °C",
            "Sightseeing, vandring, blomstring"
          ],
          [
            "April",
            "ca. 22 °C / 11 °C",
            "ca. 18 °C",
            "Vandring, rafting, påskeferie"
          ],
          [
            "Maj",
            "ca. 26 °C / 15 °C",
            "ca. 21 °C",
            "Årets første strandture, alle aktiviteter"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Appelsinblomster og byen om foråret"
      },
      {
        "type": "p",
        "text": "Om foråret dufter Antalya af appelsinblomster. Byen fejrer det med appelsinblomstkarnevalet, en gadefestival, der holdes om foråret omkring Kaleiçi og bymidten. Det er også det bedste tidspunkt at udforske den gamle bydel, Antalya Museum og klipperne ved Konyaaltı og Lara til fods, før sommerheden sætter ind."
      },
      {
        "type": "h2",
        "text": "Aktiv ferie: vandring, rafting og cykling"
      },
      {
        "type": "ul",
        "items": [
          "Den Lykiske Sti: foråret er den mest populære vandresæson, med vilde blomster langs etaperne nær Kemer, Olympos og Kaş.",
          "Köprülü-kløften: raftingsæsonen starter som regel i april, med livligt vand fra snesmeltningen.",
          "Tahtalı-svævebanen: sne på toppen og blomstrende enge nedenfor, ofte i samme udsigt.",
          "Cykling: rolige veje og milde temperaturer omkring Belek, Side og Taurusbjergenes udløbere.",
          "Golf: foråret er den anden højsæson på banerne i Belek."
        ]
      },
      {
        "type": "h2",
        "text": "Antikke steder i den grønne sæson"
      },
      {
        "type": "p",
        "text": "Perge, Aspendos, Side, Phaselis og Termessos er smukkest om foråret, når ruinerne er omgivet af grønt græs og vilde blomster. Længere ture fungerer også godt: Pamukkale og Kappadokien har behagelige temperaturer, og ballonflyvninger over Kappadokien er hyppige om foråret, når vejret er stabilt."
      },
      {
        "type": "h2",
        "text": "Påske og forårsferie"
      },
      {
        "type": "p",
        "text": "Påsken og forårsferierne i Tyskland, Holland, Storbritannien og Skandinavien bringer den første bølge af børnefamilier. Flere sæsonhoteller åbner fra april, antallet af fly stiger, og i maj er de fleste kystresorts i fuld drift. Book både hotel og transfer tidligt, hvis du rejser i påsken."
      },
      {
        "type": "h2",
        "text": "Ankomst om foråret"
      },
      {
        "type": "ul",
        "items": [
          "I marts er nogle resorts stadig lukket; fra april vokser udvalget hurtigt.",
          "Terminalen og vejene er rolige, så de oplyste køretider er realistiske.",
          "Vandre- og golfudstyr, cykler og autostole bør oplyses, når du booker.",
          "Prisen er fast pr. køretøj og ændrer sig ikke med sæsonen."
        ]
      }
    ],
    "faq": [
      [
        "Er det varmt nok til stranden i Antalya om foråret?",
        "Fra maj, ja: dagene når omkring 26 °C og havet omkring 21 °C. I marts og april er det varmt nok til at sidde i solen, men havet er stadig køligt for de fleste badende."
      ],
      [
        "Hvornår er appelsinblomstkarnevalet i Antalya?",
        "Det holdes om foråret, når byens appelsintræer blomstrer. Datoerne skifter hvert år, så tjek byens officielle meddelelser, før du planlægger rejsen efter det."
      ],
      [
        "Er foråret et godt tidspunkt at vandre på Den Lykiske Sti?",
        "Ja. Forår og efterår er de to bedste vandresæsoner; om foråret er stierne grønne og fulde af vilde blomster, og temperaturerne er behagelige."
      ],
      [
        "Har hotellerne i Antalya åbent i marts?",
        "Byhoteller og nogle resorts har åbent. Mange sæsonresorts åbner i løbet af april, og i maj er størstedelen af kysten i fuld drift."
      ]
    ]
  },
  "cappadocia-winter-trip": {
    "slug": "kappadokien-om-vinteren-fra-antalya",
    "title": "Kappadokien om vinteren fra Antalya: sne, balloner og vejen derhen",
    "heading": "Kappadokien om vinteren: en tur fra Antalya",
    "description": "Kappadokien om vinteren fra Antalya: sne, vejr, luftballoner, hulehoteller, hvad du skal se, og hvordan den 540 km lange køretur via Konya foregår om vinteren.",
    "excerpt": "Eventyrskorstene under sne og balloner over en hvid dal. Sådan kombinerer du et vinterophold i Antalya med Kappadokien – og sådan er vejen om vinteren.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Kappadokien om vinteren er et af de mest fotograferede landskaber i Tyrkiet: eventyrskorstene og dale under sne, hulehoteller med knitrende pejs og, på klare morgener, balloner der stiger op over et hvidt landskab. Fra Antalya er det en lang, men smuk køretur – og en naturlig tilføjelse til et vinterophold ved kysten."
      },
      {
        "type": "h2",
        "text": "Vintervejret: et helt andet klima end ved kysten"
      },
      {
        "type": "p",
        "text": "Kappadokien ligger på en højslette i omkring 1.000 meters højde eller mere, så vinteren er en rigtig vinter. Om dagen ligger temperaturen ofte omkring frysepunktet, om natten et godt stykke under, og sne er almindeligt fra december til februar. Pak en ordentlig vinterjakke, handsker, hue og vandtætte sko – tøj, der passer til Antalya i januar, er ikke nok her."
      },
      {
        "type": "table",
        "head": [
          "",
          "Antalya-kysten",
          "Kappadokien"
        ],
        "rows": [
          [
            "Typisk vinterdag",
            "omkring 15 °C",
            "omkring 0-5 °C"
          ],
          [
            "Vinternætter",
            "omkring 6-8 °C",
            "ofte frost"
          ],
          [
            "Sne",
            "kun på bjergtoppene",
            "almindeligt fra december til februar"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Luftballoner om vinteren"
      },
      {
        "type": "p",
        "text": "Ballonerne flyver hele året, når vejret tillader det, og en solopgangstur over snedækkede dale er det billede, mange kommer for. Om vinteren bliver flere ture dog aflyst på grund af vind, tåge eller sne, og myndighederne træffer beslutningen tidligt hver morgen. Planlæg mindst to nætter i Kappadokien, så én aflyst tur ikke betyder, at du går helt glip af oplevelsen."
      },
      {
        "type": "h2",
        "text": "Hvad du kan se om vinteren"
      },
      {
        "type": "ul",
        "items": [
          "Göreme frilandsmuseum: klippehuggede kirker med kalkmalerier, roligere om vinteren end på noget andet tidspunkt af året.",
          "Underjordiske byer som Derinkuyu og Kaymaklı: flere etager dybe og med en behagelig, konstant temperatur uanset vejret udenfor.",
          "Uçhisar-borgen og udsigtspunkterne over Göreme: de bedste steder til snedækkede panoramaer.",
          "Korte gåture i Rosendalen, Den Røde Dal og Kærlighedsdalen på tørre, klare dage – stierne kan være glatte efter snefald.",
          "Hulehoteller: mange er opvarmede og har pejs, og det er om vinteren, de føles allermest specielle."
        ]
      },
      {
        "type": "h2",
        "text": "Vejen fra Antalya"
      },
      {
        "type": "p",
        "text": "Turen er omkring 540 km og tager som regel 7 til 8 timer: over Taurusbjergene og videre over højsletten via Konya. Konya med Mevlana-museet er et naturligt stop undervejs. Om vinteren kan der være sne og is på bjergstrækningen; vejene bliver ryddet, men et køretøj med vinterudstyr og en chauffør, der kender ruten, gør forskellen mellem en lang dag og en stressende dag."
      },
      {
        "type": "h2",
        "text": "Sådan planlægger du turen"
      },
      {
        "type": "ul",
        "items": [
          "Sæt mindst to nætter af, gerne tre, så der er plads til aflyste ballonture og korte vinterdage.",
          "Kør fra Antalya om morgenen, så du krydser bjergene i dagslys.",
          "Kombiner turen med et ophold ved kysten: et par dage i Antalya eller Side og derefter Kappadokien – eller omvendt.",
          "Book hulehotellet og en eventuel ballontur i god tid til jul og nytår."
        ]
      },
      {
        "type": "h2",
        "text": "Transfer mellem Antalya og Kappadokien"
      },
      {
        "type": "p",
        "text": "Vi kører private transfers fra Antalya Lufthavn og fra hoteller langs kysten til Kappadokien, enkeltvis eller med retur på en senere dato. Prisen er fast pr. køretøj, du kan stoppe for billeder, måltider og et besøg i Konya, og der er ingen andre passagerer at vente på. Oplys dit hotel og dine datoer, når du booker."
      }
    ],
    "faq": [
      [
        "Hvor langt er der fra Antalya til Kappadokien?",
        "Omkring 540 km ad landevejen. Turen via Konya tager som regel 7 til 8 timer, lidt længere med pauser eller ved sne."
      ],
      [
        "Er det værd at besøge Kappadokien om vinteren?",
        "Ja. Sne på eventyrskorstenene, rolige seværdigheder og hyggelige hulehoteller gør vinteren til en af de smukkeste tider at besøge egnen. Tag varmt tøj med: det er meget koldere end ved kysten."
      ],
      [
        "Flyver luftballonerne i Kappadokien om vinteren?",
        "Ja, når vejret tillader det. Aflysninger er hyppigere om vinteren, så planlæg mindst to nætter for at få en ekstra chance."
      ],
      [
        "Kan jeg tage en privat transfer fra Antalya til Kappadokien?",
        "Ja. Vi tilbyder private transfers fra Antalya Lufthavn og hoteller ved kysten til Kappadokien, enkeltvis eller tur-retur, til fast pris pr. køretøj."
      ]
    ]
  },
  "belek-winter-golf": {
    "slug": "vintergolf-i-belek",
    "title": "Vintergolf i Belek: golf på Den Tyrkiske Riviera fra november til marts",
    "heading": "Vintergolf i Belek",
    "description": "Derfor er Belek et mål for vintergolf: vejret fra november til marts, banernes stand, lavere greenfee, hvad du skal pakke, og hvordan du kommer til Belek med golfbags.",
    "excerpt": "Milde dage, grønne fairways og roligere starttider. Det bør golfspillere vide om at spille i Belek mellem november og marts, når banerne derhjemme er lukket.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Når banerne i Nordeuropa er frosne, vandlidende eller lukkede, spiller man videre i Belek. Samlingen af mesterskabsbaner 45 km øst for Antalya Lufthavn holder åbent hele vinteren, og månederne fra november til marts er blevet en sæson for sig for golfspillere, der ikke vil holde pause mellem oktober og april."
      },
      {
        "type": "h2",
        "text": "Sådan er vejret på banen"
      },
      {
        "type": "table",
        "head": [
          "Måned",
          "Typisk dag",
          "På banen"
        ],
        "rows": [
          [
            "November",
            "omkring 21 °C",
            "Fremragende forhold, stadig højsæson om efteråret"
          ],
          [
            "December - januar",
            "omkring 15-16 °C",
            "Mildt og ofte solrigt, med enkelte regnvejrsdage"
          ],
          [
            "Februar",
            "omkring 16 °C",
            "Dagene bliver længere, færre regnvejrsdage"
          ],
          [
            "Marts",
            "omkring 19 °C",
            "Starten på forårets højsæson"
          ]
        ]
      },
      {
        "type": "p",
        "text": "De fleste vinterdage kan man spille i en tynd trøje. Regnen kommer typisk i korte byger frem for hele uger, og banerne er anlagt til at dræne hurtigt. Morgenerne kan være kølige, og lyset forsvinder sidst på eftermiddagen, så starttiderne ligger som regel tidligere end om sommeren."
      },
      {
        "type": "h2",
        "text": "Derfor kan vinteren betale sig"
      },
      {
        "type": "ul",
        "items": [
          "Greenfee og hotelpriser er generelt lavere i december, januar og februar end om efteråret og foråret.",
          "Startlisterne er mindre fyldte, så runderne går hurtigere, og ønsketider er nemmere at få.",
          "Flere golfhoteller holder åbent hele vinteren, mange med indendørs pool og spa til eftermiddagen.",
          "Korte flyrejser fra det meste af Europa gør en forlænget weekend lige så realistisk som en hel uge."
        ]
      },
      {
        "type": "h2",
        "text": "Baner og hoteller om vinteren"
      },
      {
        "type": "p",
        "text": "Ikke alle baner og hoteller i Belek kører efter samme plan om vinteren, og vedligeholdelse som prikning eller eftersåning bliver nogle gange lagt i de rolige måneder. Spørg, når du booker, hvilke baner der er åbne i din periode, og om der er planlagt vedligeholdelse. Golfhotellerne arrangerer som regel starttider og shuttle til deres partnerbaner."
      },
      {
        "type": "h2",
        "text": "Hvad du skal pakke til vintergolf"
      },
      {
        "type": "ul",
        "items": [
          "Lag på lag: et skiundertøj, en trøje og en vindtæt jakke til kølige morgener.",
          "Regnjakke og regnbukser til den lejlighedsvise byge.",
          "Vinterhandsker eller luffer mellem slagene, plus almindelige golfhandsker.",
          "Solbeskyttelse: vintersolen er stadig stærk på klare dage."
        ]
      },
      {
        "type": "h2",
        "text": "Til Belek med golfbags"
      },
      {
        "type": "p",
        "text": "Fra Antalya Lufthavn til Belek tager det 35 til 40 minutter i bil, og om vinteren er terminalen rolig, så en eftermiddagsrunde på ankomstdagen er ofte realistisk. Prisen er fast pr. køretøj, ikke pr. bag: som hovedregel kan en Mercedes Vito tage fire spillere med fire golfbags og deres bagage, og større grupper kører i en Sprinter. Oplys antallet af golfbags, når du booker."
      }
    ],
    "faq": [
      [
        "Kan man spille golf i Belek om vinteren?",
        "Ja. Banerne i Belek holder åbent hele vinteren, med typiske dagtemperaturer omkring 15-16 °C i december og januar, og de fleste dage kan man sagtens spille."
      ],
      [
        "Er golf billigere i Belek om vinteren?",
        "Greenfee og hotelpriser er generelt lavere i december, januar og februar end i højsæsonerne om efteråret og foråret. De præcise priser afhænger af bane og hotel."
      ],
      [
        "Hvilken måned er bedst til golf i Belek?",
        "Oktober-november og marts-april er de store golfmåneder. Vinteren er roligere og billigere, med lidt køligere dage."
      ],
      [
        "Koster golfbags ekstra på transferen?",
        "Nej. Prisen er fast pr. køretøj. Til flere bags sætter vi et større køretøj ind, og den pris ser du, når du booker."
      ]
    ]
  },
  "saklikent-ski-antalya": {
    "slug": "skiloeb-ved-antalya-saklikent",
    "title": "Skiløb ved Antalya: guide til skisportsstedet Saklıkent",
    "heading": "Skiløb ved Antalya: skisportsstedet Saklıkent",
    "description": "Skiløb ved Antalya i Saklıkent: hvor det ligger, hvor lang køreturen er, hvornår sæsonen er, hvad der venter på pisterne, og hvordan du kombinerer ski og hav på én dag.",
    "excerpt": "Stå på ski om formiddagen, gå tur ved havet om eftermiddagen. En praktisk guide til Saklıkent, Antalyas eget skisportssted, og hvordan du kommer dertil fra kysten.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Få feriesteder lader dig stå på ski og gå tur ved havet samme dag. Det gør Antalya: skisportsstedet Saklıkent ligger i Bakırlı-bjergene, omkring 50 km fra byen, og på en god vinterdag kan du være på pisten om morgenen og tilbage på strandpromenaden til solnedgang."
      },
      {
        "type": "h2",
        "text": "Hvor Saklıkent ligger"
      },
      {
        "type": "p",
        "text": "Skisportsstedet ligger i omkring 1.900 meters højde på skråningerne af Bakırlı-bjergene, vest for Antalya. Køreturen fra byen tager cirka halvanden time og stiger fra appelsinlunde gennem fyrreskov og op til sneen. På klare dage rækker udsigten fra toppen helt ned til kysten og havet."
      },
      {
        "type": "h2",
        "text": "Hvornår sæsonen er"
      },
      {
        "type": "p",
        "text": "Skisæsonen afhænger helt af snefaldet og løber som regel fra januar til marts. Nogle vintre starter den tidligere eller slutter før, så tjek det aktuelle snedække og liftforholdene, før du planlægger en dag omkring det."
      },
      {
        "type": "h2",
        "text": "Hvad der venter på pisterne"
      },
      {
        "type": "ul",
        "items": [
          "Et lille, afslappet skisportssted – ideelt til begyndere, familier og en skidag under en badeferie frem for en hel skiuge.",
          "Ski- og snowboardudstyr kan som regel lejes på stedet; tjek åbningstiderne, før du tager af sted.",
          "Kælkning og leg i sneen er populært hos familier, især i weekenden.",
          "I weekenderne er der mange lokale besøgende; på hverdage er der langt mere roligt."
        ]
      },
      {
        "type": "h2",
        "text": "Ski og hav på én dag"
      },
      {
        "type": "ul",
        "items": [
          "Kør fra kysten tidligt om morgenen, så du er fremme, når liftene åbner.",
          "Stå på ski eller leg i sneen til først på eftermiddagen.",
          "Kør ned igen til en sen frokost i Kaleiçi eller en gåtur langs Konyaaltı-stranden.",
          "Tag skiftetøj med: temperaturforskellen mellem pisten og kysten kan være 15 grader eller mere."
        ]
      },
      {
        "type": "h2",
        "text": "Sådan kommer du derop: bjergvejen om vinteren"
      },
      {
        "type": "p",
        "text": "Der er ingen fast offentlig transport til skisportsstedet, og på det sidste stykke af bjergvejen kan der være sne og is. Vinterdæk eller snekæder kan være påkrævet. En privat transfer kører dig fra dit hotel i Antalya, Kemer, Belek eller Side til pisterne og tilbage, og du bestemmer selv, hvor længe du bliver på bjerget. Det er ikke en af vores standardruter, så send os hotel, dato og gruppestørrelse, så giver vi dig en fast pris pr. køretøj."
      },
      {
        "type": "h2",
        "text": "Andre skimuligheder fra Antalya"
      },
      {
        "type": "p",
        "text": "Til en længere skitur er Davraz ved Isparta et større skisportssted med flere pister, cirka to en halv til tre timers kørsel fra Antalya. Saklıkent er stadig det nemmeste valg til en enkelt dag i sneen under et ophold ved kysten."
      }
    ],
    "faq": [
      [
        "Kan man stå på ski ved Antalya?",
        "Ja. Skisportsstedet Saklıkent ligger i Bakırlı-bjergene, omkring 50 km fra Antalya by, cirka halvanden times kørsel."
      ],
      [
        "Hvornår er skisæsonen i Saklıkent?",
        "Det afhænger af snefaldet. Sæsonen løber som regel fra januar til marts; tjek de aktuelle forhold, før du tager af sted."
      ],
      [
        "Kan man stå på ski og bade samme dag i Antalya?",
        "Du kan stå på ski om formiddagen og være ved havet om eftermiddagen. Vinterbadning er for de modige: havet er omkring 17 °C."
      ],
      [
        "Hvordan kommer jeg til Saklıkent fra mit hotel?",
        "Der er ingen fast offentlig transport. Vi giver gerne et tilbud på en privat transfer fra dit hotel til skisportsstedet og tilbage, til fast pris pr. køretøj."
      ]
    ]
  },
  "pamukkale-trip-from-antalya": {
    "slug": "pamukkale-fra-antalya-udflugt",
    "title": "Pamukkale fra Antalya: endagsudflugt eller overnatning – og hvornår?",
    "heading": "Pamukkale fra Antalya: sådan planlægger du turen",
    "description": "Planlæg en udflugt fra Antalya til Pamukkale: afstand og køretid, endagstur eller overnatning, travertinerne, Hierapolis, Det Antikke Bassin og den bedste sæson.",
    "excerpt": "Hvide travertinterrasser, en romersk by på bakken og et bassin mellem antikke søjler. Sådan besøger du Pamukkale fra Antalya uden at sidde hele dagen i en turistbus.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Pamukkale er en af Tyrkiets mest berømte seværdigheder: hvide travertinterrasser fyldt med varmt, mineralrigt vand og over dem ruinerne af den romerske by Hierapolis. Fra Antalya til Pamukkale er der omkring 245 km ad landevejen, cirka tre til tre en halv time hver vej – tæt nok på til en endagsudflugt, men langt nok til at en overnatning gør besøget meget mere afslappet."
      },
      {
        "type": "h2",
        "text": "Seværdigheder i Pamukkale"
      },
      {
        "type": "ul",
        "items": [
          "Travertinerne: gå barfodet langs terrasserne gennem lavt, varmt vand – sko er ikke tilladt på den hvide overflade.",
          "Hierapolis: en stor romersk by med teater, en monumental hovedgade og en af Anatoliens største antikke gravpladser.",
          "Det Antikke Bassin: svøm i varmt termalvand mellem væltede antikke søjler (separat billet).",
          "Hierapolis Arkæologiske Museum: fund fra udgravningen, indrettet i de tidligere romerske bade.",
          "Laodikeia: en kort køretur væk, endnu en stor antik by med langt færre besøgende."
        ]
      },
      {
        "type": "h2",
        "text": "Endagstur eller overnatning?"
      },
      {
        "type": "table",
        "head": [
          "",
          "Endagstur",
          "Med overnatning"
        ],
        "rows": [
          [
            "Tid på vejen",
            "6-7 timer på én dag",
            "Fordelt over to dage"
          ],
          [
            "Tid på stedet",
            "3-4 timer, som regel midt på dagen",
            "Sen eftermiddag og tidlig morgen"
          ],
          [
            "Mængden af mennesker",
            "Ankommer sammen med turistbusserne",
            "Solnedgang og morgen med langt færre mennesker"
          ],
          [
            "Passer til",
            "Rejsende med kort tid",
            "Familier, fotografer og alle, der vil bade"
          ]
        ]
      },
      {
        "type": "p",
        "text": "De fleste grupperejser ankommer midt på dagen, når der er flest mennesker på terrasserne, og den hvide overflade om sommeren er blændende og varm. Overnatter du i Pamukkale eller i kurbyen Karahayıt, kan du se travertinerne i solnedgangen og igen i morgenens ro."
      },
      {
        "type": "h2",
        "text": "Den bedste sæson til Pamukkale"
      },
      {
        "type": "p",
        "text": "Forår og efterår er de mest behagelige årstider: milde temperaturer til at gå rundt i Hierapolis og behageligt vand på terrasserne. Om vinteren er det køligt og af og til frost, men det varme vand damper i den kolde luft, og stedet er mest stille. I juli og august kan middagsheden og genskinnet fra de hvide terrasser være voldsomt – tag af sted tidligt eller sent på dagen."
      },
      {
        "type": "h2",
        "text": "Undervejs: Saldasøen og Taurusbjergene"
      },
      {
        "type": "p",
        "text": "Vejen stiger fra kysten over Taurusbjergene og gennem søområdet. Saldasøen med sine hvide bredder og turkise vand er en kort omvej og et populært fotostop. Med et privat køretøj bestemmer du selv, hvor og hvor længe I stopper – noget en busudflugt ikke kan tilbyde."
      },
      {
        "type": "h2",
        "text": "Privat transfer til Pamukkale"
      },
      {
        "type": "p",
        "text": "Vi kører private transfers fra Antalya Lufthavn og fra hoteller langs kysten til Pamukkale, enkeltvis eller med retur på en senere dato. Prisen er fast pr. køretøj, så for en familie eller en lille gruppe svarer den ofte til flere billetter til en busudflugt – uden hotelafhentninger, fast tidsplan eller shoppingstop."
      }
    ],
    "faq": [
      [
        "Hvor langt er der fra Antalya til Pamukkale?",
        "Omkring 245 km ad landevejen. Turen tager som regel tre til tre en halv time hver vej."
      ],
      [
        "Kan man besøge Pamukkale på en endagsudflugt fra Antalya?",
        "Ja, men det betyder 6-7 timer på vejen på én dag. En overnatning i Pamukkale eller Karahayıt gør besøget mere afslappet, og du kan se terrasserne uden menneskemængderne."
      ],
      [
        "Kan man bade i Pamukkale?",
        "Du kan gå barfodet gennem de lave bassiner på travertinerne. Svømning er muligt i Det Antikke Bassin, som har varmt termalvand og kræver separat billet."
      ],
      [
        "Hvornår på året er det bedst at besøge Pamukkale?",
        "Forår og efterår er mest behagelige. Vinteren er stille og stemningsfuld; om sommeren er det bedst at komme tidligt om morgenen eller sent på eftermiddagen."
      ]
    ]
  },
  "demre-myra-st-nicholas": {
    "slug": "demre-myra-sankt-nikolaj-kirke",
    "title": "Demre og Myra: besøg Sankt Nikolaj Kirke fra Antalya",
    "heading": "Demre, Myra og Sankt Nikolaj Kirke",
    "description": "En udflugt fra Antalya til Demre, det antikke Myra: Sankt Nikolaj Kirke, lykiske klippegrave, Andriake og Kekova, med køretider og tips til et besøg om vinteren eller i julen.",
    "excerpt": "Den ægte julemands hjemby ligger to en halv time fra Antalya. Hvad du skal se i Demre og Myra, og hvordan du gør det til en hel dag langs kysten.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Længe før han blev til julemanden, var Sankt Nikolaj biskop i Myra, en lykisk by ved kysten vest for Antalya. I dag hedder byen Demre, og Sankt Nikolaj Kirke, hvor han virkede, de lykiske klippegrave og den antikke havn gør den til en af de mest givende endagsudflugter fra Antalya – især i december."
      },
      {
        "type": "h2",
        "text": "Hvem var Sankt Nikolaj af Myra?"
      },
      {
        "type": "p",
        "text": "Nikolaj levede i det 4. århundrede og blev berømt for sin hemmelige gavmildhed, især over for børn og fattige. Hans festdag, den 6. december, fejres stadig over hele Europa, og legenderne om ham voksede gennem århundrederne til figuren Santa Claus – julemanden. Myra, hvor han var biskop, blev et vigtigt pilgrimssted."
      },
      {
        "type": "h2",
        "text": "Seværdigheder i Demre"
      },
      {
        "type": "ul",
        "items": [
          "Sankt Nikolaj Kirke: en byzantinsk kirke med kalkmalerier, mosaikgulve og den sarkofag, der traditionelt forbindes med helgenen.",
          "Klippegravene i Myra: lykiske grave formet som huse, hugget ind i klippevæggen over et stort romersk teater.",
          "Andriake: Myras antikke havn med et restaureret kornmagasin, der huser Museet for Lykiske Civilisationer.",
          "Kekova: bådture fra det nærliggende Üçağız sejler forbi den delvist sunkne antikke by og borglandsbyen Kaleköy (færre både sejler om vinteren)."
        ]
      },
      {
        "type": "h2",
        "text": "Vejen derhen: kystvejen mod vest"
      },
      {
        "type": "p",
        "text": "Demre ligger omkring to en halv time fra Antalya ad en af landets smukkeste kystveje, forbi Kemer, bjergene omkring Olympos, Kumluca og Finike. Vejen er god hele året, men snor sig gennem bjergene, så sæt tid af til stop, og planlæg den ikke som en hastetur."
      },
      {
        "type": "h2",
        "text": "En dag langs kysten"
      },
      {
        "type": "ul",
        "items": [
          "Morgen: kør tidligt fra Antalya, og stop for udsigten over kysten ved Olympos.",
          "Formiddag: Sankt Nikolaj Kirke, før turistgrupperne kommer.",
          "Middag: klippegravene og teatret i Myra, derefter frokost i Demre eller ved Andriake.",
          "Eftermiddag: en bådtur til Kekova i sæsonen, eller fortsæt til Kaş og overnat der.",
          "Aften: tilbage til Antalya, eller kombinér turen med et par dage i Kaş."
        ]
      },
      {
        "type": "h2",
        "text": "Besøg om vinteren og i julen"
      },
      {
        "type": "p",
        "text": "December er en særlig stemningsfuld tid at besøge stedet: den 6. december er Sankt Nikolaj-dag, og omkring jul kombinerer mange besøgende et ophold i Antalya med en tur til helgenens by. Vinterdagene er milde, men korte, så tag tidligt af sted. Seværdighederne er åbne hele året, mens bådturene til Kekova afhænger af vejret og sæsonen."
      },
      {
        "type": "h2",
        "text": "Privat transfer til Demre"
      },
      {
        "type": "p",
        "text": "Vi kører private transfers fra Antalya og badebyerne langs vestkysten til Kumluca, Demre og Kaş. Med et privat køretøj vælger du selv stop og tempo, og prisen er fast pr. køretøj, ikke pr. person. Fortæl os dit hotel, datoen, og om du ønsker retur samme dag, når du booker."
      }
    ],
    "faq": [
      [
        "Hvor langt er der fra Antalya til Demre?",
        "Demre, det antikke Myra, ligger omkring to en halv times kørsel fra Antalya ad kystvejen via Kemer, Kumluca og Finike."
      ],
      [
        "Er Sankt Nikolaj Kirke åben hele året?",
        "Ja. Sankt Nikolaj Kirke og det antikke Myra er åbne for besøgende året rundt."
      ],
      [
        "Hvornår er Sankt Nikolaj-dag?",
        "Sankt Nikolajs festdag er den 6. december. December, inklusive juleperioden, er en populær tid at besøge Demre."
      ],
      [
        "Kan jeg besøge Demre og Kekova på én dag?",
        "Ja, i bådsæsonen kan det lade sig gøre med en tidlig start. Om vinteren sejler færre både, så tjek vejret og sejlplanerne på stedet."
      ]
    ]
  },
  "lycian-way-spring-hiking": {
    "slug": "lykiske-sti-vandring-ved-antalya",
    "title": "Vandring på Den Lykiske Sti ved Antalya: forårsguide til de bedste etaper",
    "heading": "Vandring på Den Lykiske Sti fra Antalya",
    "description": "Vandring på Den Lykiske Sti ved Antalya: den bedste sæson, etaper omkring Kemer, Olympos, Adrasan og Kaş, hvad du skal pakke, og hvordan du kommer til startpunktet.",
    "excerpt": "Antikke ruiner, fyrreskove og havudsigt langs en af verdens store vandreruter. Hvilke etaper du kan gå fra Antalya, og hvornår du skal tage af sted.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Den Lykiske Sti (Lycian Way) er en afmærket vandrerute på mere end 500 km mellem Fethiye og Antalya, der følger gamle stier, muldyrsstier og romerske veje langs kysten og gennem bjergene i det antikke Lykien. Du behøver ikke flere uger til vandring på Den Lykiske Sti: mange af de fineste etaper ligger tæt på Antalya og er fremragende til dagsture eller en kort vandreferie."
      },
      {
        "type": "h2",
        "text": "Hvornår skal man vandre: forår og efterår"
      },
      {
        "type": "table",
        "head": [
          "Sæson",
          "Forhold",
          "Vurdering"
        ],
        "rows": [
          [
            "Marts - maj",
            "Milde dage, grønne bakker, vilde blomster, kilder fulde af vand",
            "Den bedste sæson"
          ],
          [
            "Juni - august",
            "Meget varmt, lidt skygge på mange etaper, udtørrede kilder",
            "Kun tidligt om morgenen eller korte ture"
          ],
          [
            "September - november",
            "Varmt hav, stabilt vejr, køligere fra slutningen af oktober",
            "Den næstbedste sæson"
          ],
          [
            "December - februar",
            "Mildt ved kysten, regnperioder, sne på de høje pas",
            "Muligt på lave kystetaper"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Etaper nær Antalya"
      },
      {
        "type": "ul",
        "items": [
          "Göynük – Kemer-området: skovstier og udsigt over kløften tæt på badebyerne i Kemer.",
          "Çıralı og Olympos: en kystetape mellem ruinerne af Olympos og Chimairas evige flammer.",
          "Adrasan – Olympos: en af de mest dramatiske strækninger med klipper, bugter og vid udsigt over havet.",
          "Omkring Kaş: kyststier med lykiske grave, små bugter og den græske ø Meis ud for kysten.",
          "Phaselis: kortere ture omkring den antikke by og dens tre havne, ideelt som en første smagsprøve."
        ]
      },
      {
        "type": "h2",
        "text": "Planlæg din vandretur"
      },
      {
        "type": "p",
        "text": "Ruten er afmærket med rødt og hvidt, men nogle strækninger er ujævne, stenede og stejle, og skiltningen kan være mangelfuld. Brug et godt kort eller et GPS-spor, gå helst to sammen, og fortæl nogen, hvilken rute du tager. På mange etaper er der hverken butikker eller vand mellem landsbyerne, så start tidligt, og bær mere vand, end du tror, du får brug for."
      },
      {
        "type": "h2",
        "text": "Pakkeliste"
      },
      {
        "type": "ul",
        "items": [
          "Vandrestøvler eller solide trailsko – kalkstenen er skarp og løs nogle steder.",
          "Mindst to liter vand pr. person samt snacks.",
          "Solhat, solcreme og et let langærmet lag, også om foråret.",
          "En vindtæt jakke eller regnjakke til bjergstrækninger og skiftende forårsvejr.",
          "Et lille førstehjælpssæt og en opladet telefon med offlinekort."
        ]
      },
      {
        "type": "h2",
        "text": "Til og fra ruten"
      },
      {
        "type": "p",
        "text": "De fleste etaper starter og slutter i landsbyer, som er svære at nå med offentlig transport, og går du en envejstur, slutter du et andet sted, end du startede. En privat transfer kører dig fra Antalya Lufthavn eller dit hotel til starten af din etape og kan hente dig ved målet. Prisen er fast pr. køretøj, så det fungerer godt for grupper af vandrere; oplys start- og slutpunkt, dato og antal personer, så giver vi dig en pris på forhånd."
      }
    ],
    "faq": [
      [
        "Hvor lang er Den Lykiske Sti?",
        "Den afmærkede rute er mere end 500 km lang og går mellem Fethiye og Antalya. De fleste besøgende går udvalgte etaper frem for hele ruten."
      ],
      [
        "Hvornår er det bedst at vandre på Den Lykiske Sti?",
        "Foråret, fra marts til maj, er den bedste sæson, efterfulgt af efteråret fra september til november. Sommeren er meget varm, og mange kilder tørrer ud."
      ],
      [
        "Hvilke etaper af Den Lykiske Sti ligger tættest på Antalya?",
        "Strækningerne omkring Göynük og Kemer, Çıralı og Olympos, Adrasan og Phaselis ligger alle cirka en til to timer fra Antalya. Etaperne omkring Kaş ligger længere mod vest."
      ],
      [
        "Kan man arrangere transfer til starten af en etape på Den Lykiske Sti?",
        "Ja. Send os start- og slutpunkt og datoen, så giver vi en pris på en privat transfer til fast pris pr. køretøj, inklusive afhentning ved slutningen af din vandretur."
      ]
    ]
  },
  "koprulu-canyon-rafting": {
    "slug": "rafting-koprulu-canyon-fra-antalya",
    "title": "Rafting i Köprülü Canyon: praktisk guide fra Antalya og Side",
    "heading": "Rafting i Köprülü Canyon",
    "description": "Rafting i Köprülü Canyon ved Antalya: hvornår sæsonen er, hvordan floden er, hvem det passer til, hvad du skal have med, og hvor langt der er fra Side, Belek, Alanya og Antalya.",
    "excerpt": "Koldt grønt vand, en romersk bro og en kløft fuld af fyrretræer. Hvad du kan forvente af en raftingdag i Köprülü Canyon, og hvordan du planlægger den fra kysten.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Rafting i Köprülü Canyon er den mest kendte raftingtur på Den Tyrkiske Riviera. Canyonen er en nationalpark i Taurusbjergene nord for Side og Manavgat, og floden, der løber gennem den, byder på et roligt snarere end ekstremt eventyr: De fleste strømfald er milde, landskabet er spektakulært, og nybegyndere og børnefamilier er med hver dag i sæsonen."
      },
      {
        "type": "h2",
        "text": "Sådan foregår raftingturen"
      },
      {
        "type": "p",
        "text": "De fleste ture dækker en strækning på omkring tolv kilometer af floden Köprüçay og varer to til tre timer på vandet, med stop til at svømme, springe fra klipper eller bare lade sig drive. Strømfaldene er for det meste lette til moderate, vandet er klart og grønt, og det er koldt hele året, fordi floden fødes af bjergkilder. Guiderne giver en sikkerhedsinstruktion, og hjelm og redningsvest stilles til rådighed."
      },
      {
        "type": "h2",
        "text": "Hvornår skal man tage af sted?"
      },
      {
        "type": "table",
        "head": [
          "Periode",
          "Flod og vejr",
          "Godt til"
        ],
        "rows": [
          [
            "April – maj",
            "Mere vand fra snesmeltningen, livligere strømfald, mild luft",
            "Aktive grupper, færre mennesker"
          ],
          [
            "Juni – august",
            "Varm luft, koldt vand, de travleste måneder",
            "At køle af på en varm dag"
          ],
          [
            "September – oktober",
            "Roligere vand, varme dage, færre mennesker",
            "Børnefamilier og nybegyndere"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Sæsonen løber som regel fra omkring april til oktober, afhængigt af floden og udbyderne. Uden for denne periode er ture sjældne eller tilbydes slet ikke."
      },
      {
        "type": "h2",
        "text": "Hvem passer det til?"
      },
      {
        "type": "ul",
        "items": [
          "Nybegyndere: Der kræves ingen erfaring, og guiden styrer båden.",
          "Børnefamilier: Udbyderne har en minimumsalder for børn, så tjek den, når du booker.",
          "Venner og kolleger: En båd deles som regel af seks til otte personer.",
          "Mindre egnet for ikke-svømmere, der er utrygge i vand, og under graviditet."
        ]
      },
      {
        "type": "h2",
        "text": "Hvad skal man have med?"
      },
      {
        "type": "ul",
        "items": [
          "Badetøj under tøjet og et håndklæde.",
          "Sko, der må blive våde og sidder fast på fødderne – ikke klipklappere.",
          "Solcreme og et sæt tørt skiftetøj til turen hjem.",
          "En vandtæt pose eller et etui til telefonen; lad værdigenstande blive på hotellet."
        ]
      },
      {
        "type": "h2",
        "text": "Mere end rafting: nationalparken"
      },
      {
        "type": "p",
        "text": "Over canyonen går Oluk-broen, en romersk bro med én bue, som har givet området navn – köprü betyder bro på tyrkisk. Højere oppe ad bjerget ligger ruinerne af oldtidsbyen Selge mellem klippeformationer og landsbyer. Med egen bil kan du kombinere raftingen med et stop ved broen og en tur op mod Selge."
      },
      {
        "type": "h2",
        "text": "Sådan kommer du dertil fra kysten"
      },
      {
        "type": "p",
        "text": "Mange raftingfirmaer sælger ture med fælles afhentning ved hotellerne, hvilket kan betyde en lang formiddag med at samle andre gæster op. En privat bil fra Side, Manavgat, Belek, Alanya eller Antalya kører, når du vil, og kan stoppe ved broen eller i bjergene undervejs. Canyonen ligger omkring en time fra Side og Manavgat og længere fra Antalya og Alanya; send os dit hotel og din dato, så giver vi en fast pris pr. bil."
      }
    ],
    "faq": [
      [
        "Er rafting i Köprülü Canyon egnet til begyndere?",
        "Ja. Strømfaldene er for det meste lette til moderate, der kræves ingen erfaring, og en guide styrer hver båd efter en sikkerhedsinstruktion."
      ],
      [
        "Hvornår er raftingsæsonen i Köprülü Canyon?",
        "Som regel fra omkring april til oktober. Om foråret er vandet livligere på grund af snesmeltningen; september og oktober er roligere og mindre travle."
      ],
      [
        "Hvor koldt er vandet?",
        "Koldt hele året, fordi floden fødes af bjergkilder. På en varm sommerdag er det en del af charmen."
      ],
      [
        "Hvor langt er Köprülü Canyon fra Side?",
        "Omkring en times kørsel fra Side og Manavgat og længere fra Antalya, Belek eller Alanya afhængigt af dit hotel."
      ]
    ]
  },
  "kas-kalkan-autumn": {
    "slug": "kas-og-kalkan-om-efteraaret",
    "title": "Kaş og Kalkan om efteråret: dykning, strande og stille bugter",
    "heading": "Kaş og Kalkan om efteråret",
    "description": "Derfor er Kaş og Kalkan bedst om efteråret: varmt hav, dykning, strandene Kaputaş og Patara, Kekova i kajak og båd, og hvordan du kommer dertil fra Antalya Lufthavn.",
    "excerpt": "Årets varmeste hav, tomme strande og to små havnebyer ved foden af bjergene. Derfor stråler den yderste vestlige del af Antalya-kysten i oktober.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Kaş og Kalkan ligger på den vilde vestlige ende af Antalya-kysten, hvor bjergene falder lige ned i havet. Ingen af dem har store resorts; begge har små havne, hvidkalkede gader og noget af det klareste vand i Middelhavet. Om efteråret, når sommergæsterne er rejst og havet stadig er varmt, er Kaş og Kalkan på deres allerbedste."
      },
      {
        "type": "h2",
        "text": "Derfor er efteråret sæsonen her"
      },
      {
        "type": "ul",
        "items": [
          "Havet holder sig varmt ind i oktober, ofte varmere end i juni.",
          "Sigtbarheden under vandet er fremragende – gode nyheder for dykkere og snorklere.",
          "Gåture og vandreture bliver behagelige igen efter sommervarmen.",
          "Restauranter og bådture kører stadig, men uden sommerens trængsel."
        ]
      },
      {
        "type": "h2",
        "text": "Kaş: dykning, kajak og havnen"
      },
      {
        "type": "p",
        "text": "Kaş er et af Tyrkiets mest kendte dykkercentre, med dykkersteder for både begyndere og erfarne dykkere, blandt andet vrag, vægge og undervandsgrotter. Havkajak over de sunkne ruiner ved Kekova er et højdepunkt, og havnen, det antikke teater med udsigt over havet og de lykiske grave i byen gør aftenerne nemme. På en klar dag kan man se den græske ø Meis lige ud for kysten."
      },
      {
        "type": "h2",
        "text": "Kalkan: terrasser og stille aftener"
      },
      {
        "type": "p",
        "text": "Kalkan, omkring en halv time vest for Kaş, er mindre og roligere, bygget på en skråning omkring en lille havn. Byen er kendt for sine villaer med terrasser ud mod havet og sine tagterrasserestauranter. Den passer til par og familier, der ønsker en rolig base med god mad frem for natteliv."
      },
      {
        "type": "h2",
        "text": "Strande mellem og omkring byerne"
      },
      {
        "type": "ul",
        "items": [
          "Kaputaş: en lille turkis bugt ved foden af en kløft mellem Kaş og Kalkan.",
          "Patara: en af Tyrkiets længste sandstrande, ved siden af ruinerne af det antikke Patara og et beskyttet område.",
          "Kaş-halvøen og byens badeplatforme: klippekyst og stiger direkte ned i dybt, klart vand.",
          "Kekova og Üçağız: bådture til beskyttede bugter og borglandsbyen Kaleköy."
        ]
      },
      {
        "type": "h2",
        "text": "Hvad ændrer sig i november?"
      },
      {
        "type": "p",
        "text": "Fra november går sæsonen på hæld: Nogle hoteller, restauranter og bådture lukker, den første regn kommer, og aftenerne bliver kølige. Kaş er livlig hele året, fordi mange bor der fast, mens Kalkan bliver meget stille. Tjek åbningsdatoer, hvis du rejser sent i sæsonen."
      },
      {
        "type": "h2",
        "text": "Fra Antalya Lufthavn til Kaş og Kalkan"
      },
      {
        "type": "p",
        "text": "Kaş ligger omkring 185 km fra Antalya Lufthavn, cirka to en halv til tre timer ad kystvejen via Kemer, Kumluca og Demre, og Kalkan ligger omkring en halv time længere væk. Afhængigt af flyforbindelserne lander nogle rejsende i stedet i Dalaman. Vi kører private transfers fra begge lufthavne til fast pris pr. bil, med fotostop langs en af landets smukkeste veje."
      }
    ],
    "faq": [
      [
        "Er havet varmt i Kaş i oktober?",
        "Ja. Havet holder sig som regel varmt langt ind i oktober, ofte varmere end i forsommeren, og sigtbarheden til dykning og snorkling er fremragende."
      ],
      [
        "Hvor langt er Kaş fra Antalya Lufthavn?",
        "Omkring 185 km, cirka to en halv til tre timer i bil. Kalkan ligger omkring en halv time længere mod vest."
      ],
      [
        "Kaş eller Kalkan: hvad er bedst?",
        "Kaş er mere livlig, med dykning, kajak og byliv hele året. Kalkan er mindre og roligere, med villaer og restauranter med havudsigt."
      ],
      [
        "Har Kaş og Kalkan åbent i november?",
        "Kaş er aktiv hele året. I Kalkan og hos nogle hoteller og bådfirmaer slutter sæsonen i slutningen af oktober eller i november, så tjek åbningsdatoerne."
      ]
    ]
  },
  "medical-travel-antalya-winter": {
    "slug": "tandbehandling-i-antalya-om-vinteren",
    "title": "Tandbehandling og medicinske rejser til Antalya om vinteren: det skal du vide",
    "heading": "Tandbehandling og medicinske rejser til Antalya om vinteren",
    "description": "Tandbehandling i Antalya, hårtransplantation eller kosmetisk behandling om vinteren: hvorfor mange vælger lavsæsonen, hvordan du tjekker en klinik, hviledage og transfer.",
    "excerpt": "Køligere vejr, roligere hoteller og lettere at få tider. Hvad du bør tjekke og planlægge, før du booker, hvis du rejser til Antalya for behandling om vinteren.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Til tandbehandling i Antalya og andre medicinske rejser er byen ved siden af Istanbul blevet et af Tyrkiets centre. Flere og flere besøgende planlægger tandbehandlinger, hårtransplantationer eller kosmetiske indgreb i vintermånederne, når kysten er stille og vejret mildt. Denne guide handler om den praktiske side af sådan en rejse – den er ikke medicinsk rådgivning, og enhver lægefaglig beslutning hører til hos en kvalificeret læge."
      },
      {
        "type": "h2",
        "text": "Derfor vælger mange rejsende vinteren"
      },
      {
        "type": "ul",
        "items": [
          "Mildt, køligere vejr: Mange patienter oplever restitutionen som mere behagelig uden sommervarme og stærk sol.",
          "Hoteller og lejligheder er roligere og ofte billigere end om sommeren.",
          "Det kan være lettere at få tider uden for de travleste feriemåneder.",
          "Rejsen kan kombineres med byen, museer og rolige gåture i stedet for stranddage."
        ]
      },
      {
        "type": "h2",
        "text": "Vælg og tjek en behandler"
      },
      {
        "type": "p",
        "text": "Den vigtigste beslutning er behandleren, ikke prisen. Tjek, at klinikken eller hospitalet har tilladelse fra det tyrkiske sundhedsministerium, find ud af, hvem den behandlende læge er, og hvilke kvalifikationer vedkommende har, og bed om en skriftlig plan, der beskriver, hvad der er inkluderet, hvad der ikke er, og hvordan komplikationer og opfølgning håndteres. Vær forsigtig med tilbud, der lover et endeligt resultat eller en fast pris før nogen form for undersøgelse."
      },
      {
        "type": "h2",
        "text": "Planlæg dine dage"
      },
      {
        "type": "table",
        "head": [
          "Type behandling",
          "Typisk planlægningspunkt",
          "Spørg din behandler"
        ],
        "rows": [
          [
            "Tandbehandling",
            "Ofte mere end ét besøg, nogle gange med uger eller måneder imellem",
            "Hvor mange rejser og hvor mange dage hver gang?"
          ],
          [
            "Hårtransplantation",
            "Kort ophold, med plejeinstruktioner for de første dage",
            "Hvornår må du flyve, vaske hår og bære hat?"
          ],
          [
            "Kosmetisk kirurgi",
            "Længere ophold og restitutionsdage før hjemrejsen",
            "Hvor mange nætter før du må flyve?"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Læg hviledage ind i planen, undgå behandling samme dag, som du lander, og følg lægens råd om, hvornår det er sikkert at flyve. Ved kirurgiske indgreb anbefales det ofte at rejse med en ledsager."
      },
      {
        "type": "h2",
        "text": "Forsikring, dokumenter og opfølgning"
      },
      {
        "type": "ul",
        "items": [
          "Tjek, om din rejseforsikring dækker planlagt behandling i udlandet – mange policer gør ikke.",
          "Gem kopier af alle lægerapporter, recepter og behandlingsplanen.",
          "Spørg, hvordan opfølgningen foregår, når du er hjemme igen, og om din egen læge kan inddrages.",
          "Del kun helbredsoplysninger med behandleren, via den kanal de angiver."
        ]
      },
      {
        "type": "h2",
        "text": "Fra lufthavnen til dit hotel eller din klinik"
      },
      {
        "type": "p",
        "text": "Efter en flyrejse og før eller efter en behandling er det sidste, du har brug for, en kø ved taxaholdepladsen eller en fælles shuttlebus, der stopper ved et dusin hoteller. En privat transfer kører dig direkte fra Antalya Lufthavn til dit hotel eller din klinik; chaufføren venter på dit fly og hjælper med bagagen. Returture kan tilpasses dine aftaler og dit fly hjem. Prisen er fast pr. bil, så en ledsager kører med uden ekstra omkostninger."
      }
    ],
    "faq": [
      [
        "Hvorfor rejse til Antalya for behandling om vinteren?",
        "Mange rejsende foretrækker det mildere vejr til restitutionen, roligere hoteller og lettere planlægning uden for sommerferiesæsonen."
      ],
      [
        "Hvordan tjekker jeg en klinik i Antalya?",
        "Tjek, at den har tilladelse fra det tyrkiske sundhedsministerium, find ud af, hvem den behandlende læge er, og bed om en skriftlig plan, der dækker, hvad der er inkluderet og udelukket, komplikationer og opfølgning."
      ],
      [
        "Hvor længe skal jeg blive efter et indgreb?",
        "Det afhænger helt af behandlingen og din læges råd. Spørg din behandler, hvor mange nætter du skal bruge før hjemrejsen, og planlæg hviledage."
      ],
      [
        "Kan I køre mig fra lufthavnen til min klinik?",
        "Ja. Vi tilbyder private transfers fra Antalya Lufthavn til hoteller og klinikker og tilbage igen, til fast pris pr. bil."
      ]
    ]
  },
  "side-ancient-city-guide": {
    "slug": "side-antikke-by-guide",
    "title": "Side antikke by: guide til Apollontemplet, teatret og den gamle bydel",
    "heading": "Side: guide til den antikke by",
    "description": "Besøg den antikke by Side: Apollontemplet, det store teater, museet, bymurene og den gamle bydel, hvornår du skal tage af sted, og udflugter til Aspendos og Manavgat-vandfaldet.",
    "excerpt": "Et romersk teater, tempelsøjler ved vandkanten og en havneby bygget inden for de antikke mure. Sådan oplever du Side, når den er bedst – uden for sæsonen.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Den antikke by Side er et af de få steder på Den Tyrkiske Riviera, hvor en moderne by lever inde i en antik by. Den gamle bydel fylder en lille halvø omgivet af romerske og hellenistiske ruiner: Du går forbi søjler på vej til restauranten, og solnedgangen indrammes af et tempel. Side er bedst uden for sommeren, når der er roligt nok til at mærke historien."
      },
      {
        "type": "h2",
        "text": "De vigtigste seværdigheder"
      },
      {
        "type": "ul",
        "items": [
          "Apollontemplet: Søjlerne står yderst på halvøen, lige ved havet – det klassiske sted for solnedgangen.",
          "Det store teater: et af regionens største antikke teatre, bygget ind i skråningen ved indgangen til den gamle bydel.",
          "Side Museum: indrettet i et restaureret romersk bad, med statuer og relieffer fundet i byen.",
          "Søjlegaden og agoraen: den antikke hovedakse fra byporten ned mod havnen.",
          "Bymurene og den monumentale port: den indgangsvej, besøgende har brugt i to tusind år."
        ]
      },
      {
        "type": "h2",
        "text": "Den gamle bydel i dag"
      },
      {
        "type": "p",
        "text": "Inden for murene fører gader med restauranter, caféer og små butikker ned til havnen, hvor både sejler ud på ture langs kysten. Biler holdes ude af det meste af den gamle bydel, så den er behagelig at udforske til fods. Brede sandstrande strækker sig øst og vest for halvøen."
      },
      {
        "type": "h2",
        "text": "Hvornår skal man tage af sted?"
      },
      {
        "type": "p",
        "text": "Forår og efterår er ideelle: varmt nok til stranden, køligt nok til at gå rundt i ruinerne midt på dagen. Om vinteren lukker mange sæsonhoteller, men den gamle bydel, ruinerne og museet holder åbent, og på en solrig dag er templet og havnen næsten tomme. I juli og august bør du besøge ruinerne tidligt om morgenen eller ved solnedgang."
      },
      {
        "type": "h2",
        "text": "Udflugter fra Side"
      },
      {
        "type": "table",
        "head": [
          "Destination",
          "Hvorfor tage dertil",
          "Omtrentlig tid fra Side"
        ],
        "rows": [
          [
            "Aspendos",
            "Et af verdens bedst bevarede romerske teatre",
            "omkring 40 minutter"
          ],
          [
            "Manavgat-vandfaldet",
            "Et bredt, lavt vandfald i en grøn park",
            "omkring 15 minutter"
          ],
          [
            "Perge",
            "En stor antik by med stadion og søjlegader",
            "omkring 1 time"
          ],
          [
            "Köprülü Canyon",
            "Rafting og en romersk bro i en nationalpark",
            "omkring 1 time"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Fra Antalya Lufthavn til Side"
      },
      {
        "type": "p",
        "text": "Side ligger omkring 65 km fra Antalya Lufthavn, cirka 55 til 65 minutter i bil. En privat transfer kører dig direkte til dit hotel eller til kanten af den bilfri gamle bydel, til en fast pris pr. bil, der ikke ændrer sig med sæsonen eller tidspunktet for dit fly. Den samme bil kan bookes til udflugter til Aspendos, Perge eller canyonen."
      }
    ],
    "faq": [
      [
        "Hvad kan man se i det antikke Side?",
        "Apollontemplet ved havet, det store teater, museet i et romersk bad, søjlegaden, agoraen og bymurene – alt sammen inden for gåafstand af den gamle bydel."
      ],
      [
        "Er Side et besøg værd om vinteren?",
        "Ja, for ruinernes og den gamle bydels skyld. Mange sæsonhoteller lukker, men seværdighederne holder åbent og er meget roligere end om sommeren."
      ],
      [
        "Hvor langt er Side fra Antalya Lufthavn?",
        "Omkring 65 km, cirka 55 til 65 minutter i bil."
      ],
      [
        "Kan jeg besøge Aspendos fra Side?",
        "Ja. Aspendos ligger omkring 40 minutter fra Side i bil og er en nem halvdagstur, ofte kombineret med Perge eller Manavgat-vandfaldet."
      ]
    ]
  },
  "alanya-in-winter": {
    "slug": "alanya-om-vinteren",
    "title": "Alanya om vinteren: vejret, oplevelser og udflugter",
    "heading": "Alanya om vinteren",
    "description": "Alanya fra november til marts: vintervejret og havtemperaturen, borgen og svævebanen, Damlataş- og Dim-grotten, gåture, markeder og turen fra Antalya Lufthavn.",
    "excerpt": "Milde dage, en tom borgklippe og en by, der bliver ved med at leve, når sommergæsterne er rejst hjem. Sådan er Alanya i virkeligheden fra november til marts.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Alanya er et af de få steder på den tyrkiske kyst, der ikke lukker ned om vinteren. Titusindvis af mennesker bor her hele året, mange af dem fra Skandinavien, Tyskland, Holland og Rusland, så butikker, caféer, markeder og restauranter holder åbent. Til en kort vinterferie byder Alanya på noget, der er sjældent i Europa: solskin, en strandpromenade til gåture og en middelalderborg over byen – med langt færre mennesker end om sommeren."
      },
      {
        "type": "h2",
        "text": "Vejret i Alanya om vinteren"
      },
      {
        "type": "table",
        "head": [
          "Måned",
          "Typisk dag",
          "Typisk nat",
          "Havet"
        ],
        "rows": [
          [
            "November",
            "20-22 °C",
            "11-13 °C",
            "omkring 21 °C"
          ],
          [
            "December",
            "17-19 °C",
            "8-10 °C",
            "omkring 19 °C"
          ],
          [
            "Januar",
            "16-17 °C",
            "7-9 °C",
            "omkring 17 °C"
          ],
          [
            "Februar",
            "16-18 °C",
            "7-9 °C",
            "omkring 17 °C"
          ],
          [
            "Marts",
            "18-20 °C",
            "9-11 °C",
            "omkring 17 °C"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Tallene er omtrentlige gennemsnit. Vinteren bringer regn i perioder – ofte en dag eller to med kraftige byger efterfulgt af klare, solrige dage. Alanya ligger i læ af Taurusbjergene, som gør byen lidt mildere end store dele af kysten. Aftenerne er kølige, og boliger og nogle hotelværelser føles kolde, så pak et varmt lag tøj."
      },
      {
        "type": "h2",
        "text": "Borgen, svævebanen og Det Røde Tårn"
      },
      {
        "type": "p",
        "text": "Alanya-borgen kroner den klippefyldte halvø over byen, med mure, cisterner, en byzantinsk kirke og udsigt langs kysten i begge retninger. Om sommeren er turen op hårdt arbejde; om vinteren er det en behagelig gåtur. Foretrækker du det, bringer svævebanen fra Damlataş-stranden dig op på få minutter. Nede ved havnen ligger Det Røde Tårn (Kızıl Kule) fra 1200-tallet og det gamle skibsværft med kort gåafstand imellem."
      },
      {
        "type": "h2",
        "text": "Grotter, floder og gåture"
      },
      {
        "type": "ul",
        "items": [
          "Damlataş-grotten: en lille drypstensgrotte yderst på Damlataş-stranden, kendt for sin fugtige luft med konstant temperatur.",
          "Dim-grotten: en større grotte i bakkerne øst for byen, med gangsti og en lille sø indeni.",
          "Dim-floden (Dim Çayı): flodrestauranter med platforme over vandet, roligere om vinteren og nogle åbne hele året.",
          "Strandpromenaden: kilometervis af flad strækning til gåture og cykling langs Keykubat- og Kleopatra-stranden.",
          "Bananplantager og landsbyer på skråningerne bag byen, hvor tropiske frugter gror i den milde vinter."
        ]
      },
      {
        "type": "h2",
        "text": "Badning, markeder og hverdagsliv"
      },
      {
        "type": "p",
        "text": "På solrige dage i november, og endda midt om vinteren, ser du folk bade fra Kleopatra-stranden – havet er koldere, end luften føles, men mange nordiske gæster synes, det går fint. På ugemarkederne sælges citrusfrugter, granatæbler, oliven og grøntsager, og bymidten summer af fastboende frem for turistgrupper. Mange hoteller har vinterpriser for længere ophold, og en række strandhoteller holder åbent med indendørs pool."
      },
      {
        "type": "h2",
        "text": "Udflugter fra Alanya om vinteren"
      },
      {
        "type": "p",
        "text": "Side og Manavgat-vandfaldet ligger omkring en time mod vest; Aspendos og Perge giver en længere, men nem heldagstur. Inde i landet får landsbyerne i Taurusbjergene sne i de koldeste uger, mens kysten forbliver grøn. Bliver du i uger frem for dage, gennemgår vores separate guide om at overvintre på Antalya-kysten lange ophold mere detaljeret."
      },
      {
        "type": "h2",
        "text": "Fra Antalya Lufthavn til Alanya"
      },
      {
        "type": "p",
        "text": "Alanya ligger omkring 125 km fra Antalya Lufthavn, cirka to timer ad vejen langs kysten via Side og Manavgat. Gazipaşa-Alanya Lufthavn ligger tættere på, men har færre fly, især om vinteren, så de fleste lander i Antalya. En privat transfer kører dig helt til døren ved hotellet eller lejligheden til en fast pris pr. køretøj, uden tillæg for vinter, weekend eller nat – praktisk, når flyet lander sent om aftenen."
      }
    ],
    "faq": [
      [
        "Er Alanya et besøg værd om vinteren?",
        "Ja, hvis du søger mildt vejr, gåture og en levende by frem for strandliv. Dagene er ofte solrige og omkring 16-19 °C, og borgen og grotterne er behagelige uden sommervarmen."
      ],
      [
        "Kan man bade i Alanya om vinteren?",
        "Nogle gør. Havet er omkring 17-19 °C midt om vinteren og varmere i november. Det er forfriskende snarere end varmt, og mange hoteller har opvarmede indendørs pools."
      ],
      [
        "Har hoteller og restauranter åbent i Alanya om vinteren?",
        "Mange har. Alanya har en stor helårsbefolkning, så bymidten, markederne og mange restauranter holder åbent. Nogle store sæsonresorts lukker fra november til marts."
      ],
      [
        "Hvor langt er der fra Antalya Lufthavn til Alanya?",
        "Omkring 125 km, cirka to timer i bil. En privat transfer bringer dig direkte til hotellet til en fast pris pr. køretøj."
      ],
      [
        "Regner det meget i Alanya om vinteren?",
        "December til februar er de vådeste måneder, men regnen kommer som regel i perioder på en dag eller to med solrige dage imellem."
      ]
    ]
  },
  "tahtali-cable-car-olympos": {
    "slug": "tahtali-svaevebanen-olympos-chimaira",
    "title": "Tahtalı-svævebanen, Olympos og Chimairas flammer – en dag fra Kemer",
    "heading": "Tahtalı-svævebanen, Olympos og Chimaira",
    "description": "En dag nær Kemer: Tahtalı-svævebanen til 2.365 m, ruinerne i Olympos, Çıralı-stranden og Chimairas flammer i skumringen – bedste sæson, påklædning og transport.",
    "excerpt": "En bjergtop, en lykisk by i en floddal og flammer, der har brændt ud af klippen i tusinder af år – alt sammen inden for en time fra Kemer.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Syd for Kemer rejser Taurusbjergene sig lige op af havet. På én dag kan du stå på toppen af bjerget Tahtalı, gå gennem ruinerne i Olympos ned til stranden og se Chimairas flammer blafre på en skråning i skumringen. Efterår og forår er de bedste sæsoner: klar luft til udsigten, behagelige temperaturer til gåture og ingen sommerkøer."
      },
      {
        "type": "h2",
        "text": "Tahtalı-svævebanen: fra havet til 2.365 m"
      },
      {
        "type": "p",
        "text": "Olympos-svævebanen starter i fyrreskoven over Tekirova og kører på cirka ti minutter op til toppen af Tahtalı, omkring 2.365 m over havet. Deroppefra ser du ud over hele kysten fra Antalya til Kemer og Phaselis og på klare dage langt ind i landet. På toppen er der en café og udsigtsterrasser. Billetter købes ved dalstationen eller online; åbningstider og priser skifter med sæsonen."
      },
      {
        "type": "h2",
        "text": "Hvornår skal man tage af sted, og hvad skal man have på?"
      },
      {
        "type": "ul",
        "items": [
          "Oktober og november: klar luft og årets bedste sigtbarhed, med mildt vejr ved havniveau.",
          "December til marts: sne på toppen er almindeligt – en slående udsigt over en grøn kyst, men klæd dig på til vinter deroppe.",
          "April og maj: sne på toppen og blomster på de lavere skråninger, ofte i samme udsigt.",
          "Uanset årstid er det 10-15 °C koldere på toppen end på stranden. Tag en jakke med, også i oktober.",
          "Svævebanen standser ved kraftig vind eller uvejr, så hold dagen fleksibel og tjek, før du tager af sted."
        ]
      },
      {
        "type": "h2",
        "text": "Olympos: ruiner i en floddal"
      },
      {
        "type": "p",
        "text": "Den antikke lykiske by Olympos ligger i en smal, skovklædt dal, der ender ved en stenstrand. Grave, et teater, et badehus og en byzantinsk kirke ligger spredt mellem laurbær- og figentræer langs en bæk. Gåturen fra indgangen til stranden tager cirka tyve minutter. Stedet ligger i et beskyttet område og koster entré; med Museum Pass kommer du gratis ind."
      },
      {
        "type": "h2",
        "text": "Çıralı og Chimairas flammer"
      },
      {
        "type": "p",
        "text": "På den anden side af stranden fra Olympos ligger Çıralı, en stille landsby med frugtplantager og små pensionater langs en lang strand, hvor uægte karetteskildpadder lægger æg. Ovenover, på skråningen ved Yanartaş, siver naturgas ud af klippen og har brændt i tusinder af år – den antikke Chimaira fra den græske myte. En sti med trapper på omkring 20-30 minutter fører op til flammerne. De er mest imponerende i skumringen, så tag en lommelygte med til turen ned."
      },
      {
        "type": "h2",
        "text": "Sådan planlægger du dagen"
      },
      {
        "type": "table",
        "head": [
          "Stop",
          "Fra Kemer",
          "Beregn"
        ],
        "rows": [
          [
            "Tahtalı-svævebanen (dalstationen)",
            "omkring 30 minutter",
            "1,5-2 timer"
          ],
          [
            "Olympos-ruinerne og stranden",
            "omkring 50 minutter",
            "2 timer"
          ],
          [
            "Çıralı og Chimaira",
            "omkring 50 minutter",
            "1,5 time, helst i skumringen"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Køretiderne er omtrentlige. En god rækkefølge er svævebanen om formiddagen, når luften er klarest, Olympos og frokost i Çıralı om eftermiddagen og Chimaira ved solnedgang. Fra Antalya by skal du lægge cirka en time til hver vej."
      },
      {
        "type": "h2",
        "text": "Sådan kommer du derhen"
      },
      {
        "type": "p",
        "text": "Kemer ligger omkring 50 km fra Antalya Lufthavn og Tekirova omkring 75 km, ad kystvejen. Offentlige busser kommer ikke let frem til svævebanens station eller Chimaira, og derfor tager mange besøgende af sted med chauffør. Vi kører private transfers fra lufthavnen til Kemer, Tekirova og Kumluca til en fast pris pr. køretøj og kan på forespørgsel give et tilbud på en dag med chauffør til svævebanen, Olympos og Çıralı."
      }
    ],
    "faq": [
      [
        "Hvor højt kører Tahtalı-svævebanen?",
        "Den kører op til toppen af bjerget Tahtalı i omkring 2.365 m fra en dalstation i skoven over Tekirova. Turen tager cirka ti minutter."
      ],
      [
        "Er der sne på Tahtalı om vinteren?",
        "Ofte, ja – fra cirka december til marts og nogle gange ind i april. Det er altid meget koldere på toppen end ved kysten, så tag en varm jakke med."
      ],
      [
        "Hvornår er det bedste tidspunkt at se Chimairas flammer?",
        "I skumringen eller efter mørkets frembrud, når flammerne står tydeligt frem mod klippen. Stien op tager omkring 20-30 minutter; tag en lommelygte med til turen ned."
      ],
      [
        "Kan man nå Olympos og svævebanen på én dag?",
        "Ja. De fleste tager svævebanen om formiddagen, besøger Olympos og Çıralı om eftermiddagen og ser Chimaira ved solnedgang."
      ],
      [
        "Hvor langt er der fra Antalya Lufthavn til Kemer?",
        "Omkring 50 km, cirka 40-50 minutter i bil. Tekirova, tæt på svævebanen, ligger omkring 75 km væk."
      ]
    ]
  },
  "perge-aspendos-day-trip": {
    "slug": "perge-og-aspendos-udflugt",
    "title": "Perge og Aspendos: en halvdagstur blandt Antalyas ruiner",
    "heading": "Perge og Aspendos fra Antalya",
    "description": "Besøg Perge og Aspendos fra Antalya, Belek eller Side: hvad du skal se, den bedste sæson, hvor lang tid du skal bruge, og hvordan du kombinerer de to antikke steder på en halv dag.",
    "excerpt": "En romersk søjlegade, et stadion til 12.000 tilskuere og et af antikkens bedst bevarede teatre – alt sammen inden for en time fra lufthavnen.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "To af Tyrkiets fineste antikke steder ligger lige ved hovedvejen mellem Antalya og Side. Perge var en stor græsk-romersk by på den pamfyliske slette; Aspendos har et romersk teater, der er så velbevaret, at det stadig bruges til forestillinger. Sammen giver de en nem halv dag, og fra oktober til april, når solen er mild, er de på deres bedste."
      },
      {
        "type": "h2",
        "text": "Perge: søjlernes by"
      },
      {
        "type": "p",
        "text": "Perge ligger kun omkring 15 minutter fra Antalya Lufthavn. Du går ind gennem den hellenistiske port med de to runde tårne og videre ad en lang søjlegade med en vandkanal ned gennem midten til agoraen, badene og akropolis-højen. Lige uden for murene ligger et stort teater og et af antikkens bedst bevarede stadioner. Mange af Perges statuer er udstillet på Antalya Museum. Beregn cirka halvanden til to timer."
      },
      {
        "type": "h2",
        "text": "Aspendos: teatret, der overlevede"
      },
      {
        "type": "p",
        "text": "Aspendos nær Serik er berømt for sit romerske teater fra 100-tallet e.Kr., der rummede mange tusinde tilskuere og stadig har sin scenebygning, sine gallerier og en fremragende akustik. Bag teatret fører en sti op til den øvre by og til buerne på en romersk akvædukt, der strækker sig hen over sletten. Et kort stykke derfra er den seldsjukiske bro over floden Köprüçay et stop værd. Beregn cirka en til halvanden time."
      },
      {
        "type": "h2",
        "text": "Den bedste sæson for ruinerne"
      },
      {
        "type": "ul",
        "items": [
          "Oktober og november: varme, tørre dage og blødt lys til fotografering.",
          "December til februar: stille steder og mildt vejr mellem regnvejrsdagene – tag et vandtæt lag med.",
          "Marts og april: grønt græs og vilde blomster mellem stenene, formentlig den smukkeste tid.",
          "Juni til september: begge steder har kun lidt skygge, og middagsheden er intens; tag af sted tidligt om morgenen, hvis du besøger dem om sommeren."
        ]
      },
      {
        "type": "h2",
        "text": "Begge steder på en halv dag"
      },
      {
        "type": "table",
        "head": [
          "Udgangspunkt",
          "Til Perge",
          "Perge til Aspendos",
          "Aspendos tilbage"
        ],
        "rows": [
          [
            "Antalya by / Lara",
            "omkring 25 minutter",
            "omkring 35 minutter",
            "omkring 45 minutter"
          ],
          [
            "Belek",
            "omkring 30 minutter",
            "omkring 35 minutter",
            "omkring 20 minutter"
          ],
          [
            "Side / Manavgat",
            "omkring 55 minutter",
            "omkring 35 minutter",
            "omkring 35 minutter"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Køretiderne er omtrentlige. At starte i Perge om morgenen og slutte i Aspendos fungerer fra alle disse udgangspunkter. Begge steder koster entré og accepterer Museum Pass. Tag gode sko på: underlaget er ujævn marmor og sten, og der er trapper overalt."
      },
      {
        "type": "h2",
        "text": "På vej til eller fra lufthavnen"
      },
      {
        "type": "p",
        "text": "Fordi Perge ligger så tæt på Antalya Lufthavn, og Aspendos ligger nær vejen mod Belek og Side, passer de to steder godt ind på en ankomst- eller afrejsedag med et sent fly. En privat transfer kan stoppe ved det ene eller begge steder undervejs, med bagagen sikkert i køretøjet. Bed om et tilbud med stop, når du booker: prisen forbliver fast pr. køretøj."
      }
    ],
    "faq": [
      [
        "Hvor langt er der fra Antalya Lufthavn til Perge?",
        "Kun omkring 15 minutter i bil. Det er et af de nemmeste antikke steder at besøge på en ankomst- eller afrejsedag."
      ],
      [
        "Kan man besøge Perge og Aspendos på én dag?",
        "Sagtens – en halv dag er nok til begge. Beregn cirka to timer i Perge, en times tid i Aspendos og omkring 35 minutters kørsel imellem dem."
      ],
      [
        "Bruges teatret i Aspendos stadig?",
        "Ja. Det romerske teater er så velbevaret, at der stadig er koncerter og forestillinger nogle aftener, mest i de varmere måneder."
      ],
      [
        "Hvornår er det bedst at besøge Perge og Aspendos?",
        "Fra oktober til april. Der er kun lidt skygge begge steder, så om sommeren bør du tage af sted tidligt om morgenen."
      ],
      [
        "Kan en transfer stoppe ved ruinerne med min bagage?",
        "Ja. Bed om stop, når du booker; bagagen bliver i køretøjet, og prisen forbliver fast pr. køretøj."
      ]
    ]
  },
  "ramadan-bayram-antalya": {
    "slug": "ramadan-og-eid-i-antalya",
    "title": "Ramadan og eid i Antalya: det skal du vide som rejsende",
    "heading": "Rejs til Antalya under ramadan og eid",
    "description": "Hvad ændrer sig i Antalya under ramadanen og eid-helligdagene? Restauranter, iftar-aftener, travle veje, hoteller og hvordan du planlægger din lufthavnstransfer.",
    "excerpt": "På feriestederne ændrer hverdagen sig næsten ikke under ramadanen. Helligdagene bagefter er en anden sag – her er, hvad du kan forvente, og hvordan du planlægger.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Ramadanen og de to eid-højtider flytter sig i kalenderen, omkring 11 dage tidligere hvert år. I de kommende sæsoner falder de i senvinteren og foråret: ramadanen og eid al-fitr (Ramazan Bayramı) omkring februar og marts og offerfesten eid al-adha (Kurban Bayramı) omkring maj. Tjek den officielle kalender for de præcise datoer. For besøgende ændrer selve fastemåneden ikke meget ved kysten; det er helligdagene, du skal planlægge efter."
      },
      {
        "type": "h2",
        "text": "Ændrer ramadanen en ferie i Antalya?"
      },
      {
        "type": "p",
        "text": "Meget lidt. Hoteller, restauranter, caféer og butikker i Antalya, Belek, Side, Kemer og Alanya har åbent som normalt om dagen, og der serveres alkohol de steder, der normalt gør det. Mange i Tyrkiet faster, mange gør ikke, og ingen forventer, at turister gør det. Det er blot høfligt ikke at spise eller drikke demonstrativt foran nogen, der tydeligvis faster, især i traditionelle kvarterer og landsbyer."
      },
      {
        "type": "h2",
        "text": "Iftar: ramadanens aftener"
      },
      {
        "type": "ul",
        "items": [
          "Ved solnedgang brydes fasten med iftar, ofte et fælles måltid med suppe, dadler, oliven og det særlige runde ramadan-pidebrød, der kun sælges i denne måned.",
          "Mange restauranter har en iftar-menu; bordene fyldes lige før solnedgang, så reservér, hvis du vil være med.",
          "I den gamle bydel og omkring de store moskeer er der feststemning om aftenen med familier ude til sent.",
          "Før daggry går en trommeslager i nogle kvarterer rundt i gaderne og vækker folk til det sidste måltid (sahur) – en del af traditionen."
        ]
      },
      {
        "type": "h2",
        "text": "Eid-helligdagene: når hele Tyrkiet rejser"
      },
      {
        "type": "p",
        "text": "Eid al-fitr varer tre dage og offerfesten fire; regeringen forlænger dem ofte til en længere ferie. Millioner af mennesker rejser til familien eller til kysten, så indenrigsfly, langdistancebusser og hoteller bliver fyldt op, og vejene ind til Antalya er travle på første og sidste dag. Banker og offentlige kontorer lukker, men butikker, restauranter, museer og seværdigheder på feriestederne holder som regel åbent."
      },
      {
        "type": "h2",
        "text": "Planlæg din transfer omkring helligdagene"
      },
      {
        "type": "ul",
        "items": [
          "Book tidligt, hvis du lander i starten af en eid-helligdag: efterspørgslen på køretøjer og chauffører er stor.",
          "Beregn ekstra tid ved afrejse på sidste dag af en helligdag, hvor lufthavnen og vejene er mest belastede.",
          "Under ramadanen er trafikken tæt i timen før solnedgang og usædvanligt stille under selve iftar.",
          "Oplys dit flynummer: vi følger flyet, så en forsinkelse på en travl dag ikke koster dig din afhentning."
        ]
      },
      {
        "type": "h2",
        "text": "Godt at vide"
      },
      {
        "type": "p",
        "text": "Under helligdagene hilser man på hinanden med „İyi bayramlar“ (god helligdag), og der deles slik ud overalt – det er en varm tid at være i landet. Vores priser ændrer sig ikke under ramadan eller eid: én fast pris pr. køretøj, uden tillæg for helligdag, nat eller sæson."
      }
    ],
    "faq": [
      [
        "Har restauranterne åbent i Antalya under ramadanen?",
        "Ja. På feriestederne og i Antalya by har restauranter og caféer åbent som normalt om dagen. Om aftenen kommer der iftar-menuer til."
      ],
      [
        "Må turister drikke alkohol under ramadanen i Antalya?",
        "Ja. Hoteller, barer og restauranter, der normalt serverer alkohol, fortsætter med det under ramadanen."
      ],
      [
        "Er der travlt i Antalya under eid-helligdagene?",
        "Ja. Mange tyrkiske familier rejser under eid, så hoteller, fly og veje er mere travle end normalt, især på første og sidste dag."
      ],
      [
        "Hvornår er ramadan og eid næste år?",
        "Datoerne rykker sig omkring 11 dage tidligere hvert år. I de kommende sæsoner falder ramadanen og eid al-fitr omkring februar-marts og offerfesten omkring maj; tjek den officielle kalender for de præcise datoer."
      ],
      [
        "Stiger transferpriserne under eid?",
        "Ikke hos os. Prisen er fast pr. køretøj, uden tillæg for helligdag, nat eller sæson. Vi anbefaler at booke tidligt til helligdage."
      ]
    ]
  },
  "kaleici-old-town-guide": {
    "slug": "kaleici-antalya-gamle-bydel-guide",
    "title": "Kaleiçi, Antalyas gamle bydel: en gåtursguide til lavsæsonen",
    "heading": "Kaleiçi: Antalyas gamle bydel",
    "description": "Gåtursguide til Kaleiçi, Antalyas befæstede gamle bydel: Hadrians Port, den riflede minaret, den gamle havn, boutiquehoteller og hvorfor efterår til forår er bedst.",
    "excerpt": "Romerske porte, osmanniske huse og en havn under klipperne. Antalyas gamle hjerte opleves bedst i roligt tempo, i de måneder hvor byen tilhører sine beboere.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Kaleiçi – direkte oversat „inden for borgen“ – er Antalyas historiske centrum, omgivet af gamle bymure over en lille havn. Gaderne er omkranset af restaurerede osmanniske huse, mange af dem i dag boutiquehoteller, caféer og små restauranter. Om sommeren er her varmt og overfyldt; fra oktober til april er den gamle bydel på sit bedste, med milde dage, åbne terrasser i solen og tid til at slentre."
      },
      {
        "type": "h2",
        "text": "En gåtur gennem Kaleiçi"
      },
      {
        "type": "ul",
        "items": [
          "Hadrians Port: den romerske port med tre buer, bygget til kejserens besøg i 100-tallet e.Kr., den traditionelle indgang til den gamle bydel.",
          "Klokketårnet og pladsen Kalekapısı: mødestedet mellem den gamle bydel og den moderne by.",
          "Den riflede minaret (Yivli Minare): Antalyas seldsjukiske vartegn, synlig fra hele centrum.",
          "Hıdırlık-tårnet: et rundt romersk tårn i den sydlige kant, med solnedgangsudsigt over bugten og bjergene.",
          "Den knækkede minaret (Kesik Minare): en bygning, der gennem århundrederne har været tempel, kirke og moské.",
          "Den gamle havn: fiskerbåde og udflugtsbåde under klipperne, som du når via gaderne eller med elevator fra toppen."
        ]
      },
      {
        "type": "h2",
        "text": "Uden for murene"
      },
      {
        "type": "p",
        "text": "Karaalioğlu-parken strækker sig langs klipperne fra Hıdırlık-tårnet med udsigt over bugten. Antalya Museum, en af Tyrkiets rigeste arkæologiske samlinger, ligger, hvor Konyaaltı-stranden begynder, og er ideelt på en regnvejrsdag; tjek åbningstiderne, før du tager af sted. Øst for byen styrter Düden-vandfaldene direkte ud over klipperne i havet, og de øverste fald ligger i en skyggefuld park."
      },
      {
        "type": "h2",
        "text": "Hvorfor efterår til forår?"
      },
      {
        "type": "table",
        "head": [
          "Sæson",
          "Typisk dag",
          "I Kaleiçi"
        ],
        "rows": [
          [
            "Oktober – november",
            "22-27 °C",
            "Varme aftener, åbne terrasser, færre mennesker"
          ],
          [
            "December – februar",
            "15-18 °C",
            "Stille gader, solrige caféer, en enkelt regnvejrsdag"
          ],
          [
            "Marts – april",
            "18-22 °C",
            "Appelsinblomster, grønne parker, festivaler i byen"
          ],
          [
            "Juni – august",
            "33-35 °C",
            "Meget varmt og travlt – bedst tidligt og sent på dagen"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Temperaturerne er omtrentlige gennemsnit. De fleste restauranter, caféer og boutiquehoteller i Kaleiçi har åbent hele året, fordi den gamle bydel lever af byturister og beboere, ikke kun af strandturisme."
      },
      {
        "type": "h2",
        "text": "At bo i den gamle bydel"
      },
      {
        "type": "p",
        "text": "Hotellerne i Kaleiçi er som regel små og indrettet i ombyggede palæer omkring en gårdhave eller en lille pool. Mange gader er gågader eller for smalle til større køretøjer, så bilen stopper ofte ved den nærmeste port eller plads, og de sidste meter går du til fods. Fortæl os navnet på dit hotel, når du booker; vores chauffører ved, hvilken indgang der er nærmest, og hjælper med bagagen."
      },
      {
        "type": "h2",
        "text": "Fra Antalya Lufthavn til Kaleiçi"
      },
      {
        "type": "p",
        "text": "Kaleiçi ligger omkring 15 km fra Antalya Lufthavn, cirka 20 til 30 minutter i bil. Sporvognen forbinder også lufthavnen med centrum, men med kufferter er en privat transfer til hotellet nemmere, især sent om natten. Prisen er fast pr. køretøj, uden nattillæg."
      }
    ],
    "faq": [
      [
        "Hvad er Kaleiçi i Antalya?",
        "Kaleiçi er Antalyas historiske gamle bydel, omgivet af bymure over den gamle havn, med osmanniske huse, Hadrians Port, den riflede minaret og mange boutiquehoteller og caféer."
      ],
      [
        "Hvor langt er der fra Antalya Lufthavn til Kaleiçi?",
        "Omkring 15 km, cirka 20-30 minutter i bil."
      ],
      [
        "Kan man køre bil ind i Kaleiçi?",
        "Kun delvist. Mange gader er gågader eller meget smalle, så køretøjer stopper ofte ved den nærmeste port eller plads. Vores chauffører kender den nærmeste adgang til hvert hotel."
      ],
      [
        "Er Kaleiçi et besøg værd om vinteren?",
        "Ja. De fleste caféer, restauranter og hoteller holder åbent, gaderne er stille, og dagene er som regel milde og solrige."
      ],
      [
        "Hvor meget tid skal man bruge i Kaleiçi?",
        "En halv dag er nok til en første gåtur. Med museet, Karaalioğlu-parken og Düden-vandfaldene er en hel dag eller to ideelt."
      ]
    ]
  }
};
