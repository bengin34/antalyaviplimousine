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
};
