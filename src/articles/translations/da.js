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
  }
};
