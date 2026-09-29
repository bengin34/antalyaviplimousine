/**
 * Blog copy for ro: the page chrome plus every article body.
 * One file per language, so adding a market is adding a file.
 */
export const chrome = {
  locale: "ro_RO",
  indexTitle: "Ghiduri de transfer Antalya și articole de călătorie | Antalya VIP Tourism",
  indexDescription:
    "Ghiduri practice despre sosirea în Antalya: transfer versus taxi, întâlnirea cu șoferul, călătoria cu copii, distanțele de pe coastă și când să mergi.",
  heading: "Ghiduri de transfer Antalya",
  intro:
    "Articole practice despre sosirea pe aeroportul din Antalya și drumul până la hotel - din transferurile pe care le facem zilnic, nu dintr-o broșură.",
  blog: "Ghiduri",
  readMore: "Citește ghidul",
  minReadLabel: "{minutes} min de citit",
  updated: "Actualizat",
  contents: "În acest ghid",
  faqHeading: "Întrebări frecvente",
  relatedHeading: "Rutele de transfer din acest ghid",
  routeGuidesHeading: "Ghiduri pentru acest transfer",
  moreHeading: "Alte ghiduri",
  ctaHeading: "Transfer cu preț fix de pe aeroportul din Antalya",
  ctaText:
    "Un preț pentru tot vehiculul, monitorizarea zborului inclusă și plata cash la șofer. Verifică ruta și rezervă într-un minut.",
  ctaButton: "Vezi prețul fix",
  backToBlog: "Toate ghidurile",
  home: "Acasă",
  routes: "Rute de transfer",
  book: "Rezervă transferul",
  imprint: "Informații legale",
  privacy: "Confidențialitate",
  imprintUrl: "/impressum.html",
  privacyUrl: "/privacy/",
};

export const articles = {
  "transfer-vs-taxi": {
    slug: "transfer-sau-taxi-aeroport-antalya",
    title: "Aeroportul Antalya: transfer privat, taxi sau shuttle în comun?",
    heading: "Transfer privat, taxi sau shuttle în comun de pe aeroportul din Antalya?",
    description:
      "Cât costă cu adevărat cele trei variante de plecare din aeroportul Antalya, cât durează și care se potrivește grupului tău. Comparație cu preț fix pe vehicul.",
    excerpt:
      "Trei moduri de a ieși din aeroportul Antalya și trei începuturi de vacanță complet diferite. Costul, timpul și cui i se potrivește fiecare.",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "Aterizezi pe aeroportul din Antalya (AYT) după trei-cinci ore de zbor, adesea seara târziu, de obicei cu bagaje și deseori cu copii. Următoarele patruzeci de minute decid cum începe vacanța. Din terminal există trei căi realiste de ieșire, iar cel mai mic preț afișat rareori înseamnă cea mai ieftină cursă." },
      { type: "h2", text: "Cele trei variante, una lângă alta" },
      {
        type: "table",
        head: ["", "Transfer privat", "Taxi de aeroport", "Shuttle în comun"],
        rows: [
          ["Baza prețului", "Fix, pe vehicul", "Aparat de taxat, pe cursă", "De persoană"],
          ["Cunoscut dinainte", "Da", "Nu", "Da"],
          ["Așteaptă la întârzierea zborului", "Da, cu monitorizare", "Nu", "Limitat"],
          ["Opriri înainte de hotelul tău", "Niciuna", "Niciuna", "Până la 8"],
          ["Capacitate bagaje", "De microbuz", "De autoturism", "Comună"],
          ["Scaun pentru copil", "La cerere, gratuit", "Rar", "Nu"],
        ],
      },
      { type: "h2", text: "Cât costă de fapt un taxi" },
      { type: "p", text: "Taxiul e răspunsul evident în orice aeroport, iar pe distanțe scurte e unul rezonabil. Pe Riviera Turcească problema e distanța: până la Belek sunt 45 km, până la Side 65 km, până la Alanya 125 km. Un aparat care merge noaptea pe 125 km, cu drumul de întoarcere pe care șoferul trebuie să îl includă, produce o sumă pe care nimeni nu ți-a spus-o dinainte. Și nu ai niciun argument dacă ruta nu a fost cea directă." },
      { type: "p", text: "Transferul privat inversează logica: prețul pe tot vehiculul e stabilit înainte să zbori, nu se schimbă în trafic aglomerat și e același fie că merge o persoană, fie șase." },
      { type: "h2", text: "De ce shuttle-ul pare ieftin și adesea nu este" },
      { type: "p", text: "Prețul de persoană pare imbatabil pentru cine călătorește singur și încetează să fie avantajos deja la doi. Pentru o familie de patru până la Side, patru locuri costă de obicei mai mult decât un microbuz cu preț fix. Costul real e însă timpul: vehiculul pleacă când s-a umplut și lasă pasagerii de-a lungul coastei în ordinea care convine rutei, nu ție. După un zbor de noapte, să ajungi ultimul înseamnă ușor peste o oră în plus." },
      { type: "h2", text: "Când e potrivită fiecare variantă" },
      {
        type: "ul",
        items: [
          "Un singur pasager, bagaj de mână, aterizare ziua, hotel în centrul Antalyei: taxiul sau shuttle-ul sunt suficiente.",
          "Două persoane sau mai multe cu hotel în afara orașului: vehiculul propriu e de obicei mai ieftin și întotdeauna mai rapid.",
          "Familii cu scaun de copil, cărucior sau bagaj de golf: privat, pentru că spațiul e confirmat dinainte.",
          "Sosiri de noapte și conexiuni care se pot decala: privat, pentru că preluarea urmează zborul, nu un orar.",
        ],
      },
      { type: "h2", text: "Ce să verifici înainte de rezervare" },
      { type: "p", text: "Trei întrebări arată imediat diferența. Prețul e pe vehicul sau pe persoană? E fix sau se mișcă odată cu traficul și ora? Și ce se întâmplă dacă zborul aterizează cu două ore întârziere - te mai așteaptă cineva și costă suplimentar? Prețurile noastre fixe sunt pe vehicul, monitorizarea zborului e inclusă, iar primele 90 de minute de așteptare după aterizare sunt gratuite și se decalează automat la întârziere." },
    ],
    faq: [
      ["Transferul privat e mai scump decât taxiul în Antalya?", "Până în centrul Antalyei e comparabil. Până la Belek, Side, Kemer sau Alanya, un preț fix pe vehicul e de regulă mai mic decât suma de pe aparat pe aceeași distanță, și îl știi înainte să zbori."],
      ["Plătesc pe persoană sau pe vehicul?", "Pe vehicul. Prețul unui Mercedes Vito acoperă până la șase pasageri, Sprinterul grupurile mai mari. Un pasager în plus nu schimbă prețul."],
      ["Ce se întâmplă dacă zborul întârzie?", "Urmărim zborul în timp real și decalăm preluarea fără cost suplimentar. Cele 90 de minute de așteptare incluse pornesc de la aterizarea reală."],
      ["Pot plăti cash la sosire?", "Da. Plata în avans nu e necesară; achiți suma fixă din rezervare direct șoferului la începutul cursei."],
    ],
  },
  "airport-arrival-guide": {
    slug: "ghid-sosire-aeroport-antalya",
    title: "Ghid de sosire pe aeroportul Antalya: terminale, punct de întâlnire, așteptare",
    heading: "Sosirea pe aeroportul din Antalya: ce se întâmplă după aterizare",
    description:
      "Pas cu pas prin sosirea pe aeroportul din Antalya - terminale, control de pașapoarte, bagaje, unde te așteaptă șoferul și cât durează așteptarea gratuită.",
    excerpt:
      "De la atingerea pistei până la ușa mașinii: terminale, control de pașapoarte, punctul de întâlnire și ce se întâmplă la întârziere.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Aeroportul din Antalya procesează peste treizeci de milioane de pasageri pe an, aproape toți într-o fereastră îngustă de vară. Dacă știi succesiunea dinainte, un terminal aglomerat devine o formalitate de douăzeci de minute." },
      { type: "h2", text: "Pe ce terminal aterizezi" },
      { type: "p", text: "AYT are trei terminale. Majoritatea zborurilor internaționale regulate folosesc Terminalul 1 sau Terminalul 2; cursele charter și sezoniere sunt de obicei pe Terminalul 2. Terminalul intern deservește zborurile din Istanbul, Ankara și Izmir. Nu trebuie să afli asta singur: numărul zborului ne spune totul, iar șoferul e trimis la sala de sosiri corectă." },
      { type: "h2", text: "Controlul de pașapoarte și bagajele" },
      { type: "p", text: "Majoritatea cetățenilor europeni intră în Türkiye fără viză pentru șederi scurte, dar verifică regulile pentru propriul pașaport înainte de plecare. În vârf de sezon, alocă 20-45 de minute de la aterizare până ieși cu bagajele, mai puțin în afara lunilor iulie și august. Cel mai mult variază banda de bagaje, de aceea o fereastră de așteptare contează mai mult decât o oră promisă de preluare." },
      { type: "h2", text: "Unde te întâmpină șoferul" },
      {
        type: "ul",
        items: [
          "Ridică-ți bagajele și treci în sala de sosiri.",
          "Îndreaptă-te spre zona meet & greet J / 777.",
          "Echipa noastră de pe aeroport îți găsește rezervarea și te conduce la șofer.",
          "Șoferul duce bagajele la vehicul, în parcarea din apropiere.",
        ],
      },
      { type: "p", text: "Nu trebuie să cauți o plăcuță cu numele într-o mulțime de cincizeci de oameni. Echipa stă într-un punct fix și are numărul rezervării tale, așa că predarea funcționează la fel la 06:00 și la 02:00." },
      { type: "h2", text: "Ce se întâmplă dacă zborul întârzie" },
      { type: "p", text: "Urmărim zborul în sine, nu orarul din rezervare. Dacă aterizează cu două ore întârziere, preluarea se mută cu două ore și prețul nu se schimbă. Primele 90 de minute de așteptare de la aterizarea reală sunt incluse gratuit - acoperă o coadă lungă la pașapoarte sau bagaje întârziate." },
      { type: "h2", text: "Înainte de plecare" },
      { type: "p", text: "Două detalii fac ziua ușoară: dă-ne numărul zborului, nu doar ora sosirii, și spune câte scaune de copil îți trebuie chiar la rezervare. Ambele sunt gratuite - și ambele sunt mult mai greu de aranjat la 01:00 în sala de sosiri." },
    ],
    faq: [
      ["Unde exact mă întâlnesc cu șoferul pe aeroportul din Antalya?", "În zona meet & greet J / 777 din sala de sosiri, după ce ți-ai ridicat bagajele. Echipa noastră are rezervarea ta și te conduce la șofer."],
      ["Cât așteaptă șoferul?", "Primele 90 de minute de la aterizarea reală sunt incluse gratuit, iar fereastra se decalează automat dacă zborul întârzie."],
      ["Cât durează până ies din terminal?", "De obicei 20-45 de minute de la aterizare, în funcție de controlul de pașapoarte și de bagaje. Cel mai mult în iulie și august."],
      ["Trebuie să trimit numărul zborului?", "Da, te rugăm. Numărul zborului ne permite să urmărim ora reală de aterizare și să trimitem șoferul la terminalul corect."],
    ],
  },
  "alanya-distance-guide": {
    slug: "aeroport-antalya-alanya-distanta",
    title: "Aeroportul Antalya - Alanya: distanță, timp de mers și opțiuni de transfer",
    heading: "De la aeroportul din Antalya la Alanya: cât e cu adevărat",
    description:
      "125 km pe drumul de coastă D400. Cât durează efectiv drumul spre Alanya, unde se află cartierele de resort și cum planifici o sosire târzie.",
    excerpt:
      "Alanya e cel mai lung dintre transferurile populare din Antalya. Distanța reală, timpul real și ce se schimbă la o sosire de noapte.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Alanya se află la 125 km est de aeroportul din Antalya, ceea ce o face cel mai lung transfer rezervat în mod curent pe Riviera Turcească. Distanța e faptul care modelează toate celelalte decizii despre călătorie." },
      { type: "h2", text: "Distanță și timp de mers" },
      {
        type: "table",
        head: ["Destinație", "Distanță de la AYT", "Durată tipică"],
        rows: [
          ["Centrul Antalyei", "15 km", "20-30 de minute"],
          ["Side", "65 km", "55-65 de minute"],
          ["Manavgat", "75 km", "60-70 de minute"],
          ["Kızılağaç", "85 km", "70-80 de minute"],
          ["Alanya", "125 km", "110-130 de minute"],
        ],
      },
      { type: "p", text: "Ruta urmează drumul de coastă D400 spre est prin Serik, Manavgat și Kızılağaç. E un drum bun, dar trece prin localități, nu pe lângă ele, așa că după-amiezile de vară și vârfurile charter de sâmbătă adaugă timp pe care niciun orar nu îl poate elimina." },
      { type: "h2", text: "Alanya nu e un singur loc" },
      { type: "p", text: "Hotelurile vândute ca „Alanya\" se întind pe circa 65 km de coastă. Avsallar, Türkler și Okurcalar sunt la vest de centru și vizibil mai aproape de aeroport; Mahmutlar, Kestel, Kargıcak și Demirtaș sunt la est și adaugă 20-45 de minute. La rezervare dă numele hotelului, nu doar stațiunea: asta determină și durata, și prețul fix corect." },
      { type: "h2", text: "De ce shuttle-ul doare cel mai tare aici" },
      { type: "p", text: "Pe 125 km, fiecare oprire în plus e un ocol real. Un shuttle care lasă opt grupuri de-a lungul coastei transformă ușor două ore în patru, iar ultima familie care coboară e de obicei cea cazată cel mai la est. Un vehicul privat parcurge ruta o dată, în ordinea ta, iar prețul fix nu se mișcă odată cu traficul." },
      { type: "h2", text: "Planificarea unei sosiri de noapte" },
      { type: "p", text: "Multe zboruri spre Alanya aterizează după ora 23:00. Atunci contează două lucruri: ca cineva să aștepte sigur și ca prețul să fi fost stabilit înainte de zbor. Urmărim zborul, deci o aterizare întârziată mută preluarea, nu o anulează, iar primele 90 de minute de așteptare sunt incluse. Plata se face cash la șofer la începutul cursei, așa că nimic nu trebuie aranjat în miez de noapte." },
    ],
    faq: [
      ["Cât de departe e Alanya de aeroportul din Antalya?", "125 km pe drumul de coastă D400, în mod normal 110-130 de minute de mers."],
      ["Prețul transferului e același pentru toate hotelurile din Alanya?", "Nu. Coasta Alanyei se întinde pe circa 65 km, deci hotelurile din Avsallar sau Okurcalar se tarifează diferit față de Mahmutlar sau Kargıcak. Dă numele hotelului și vezi prețul fix corect."],
      ["Există o oprire pe drum?", "La un transfer privat putem opri scurt, la cerere. Nu există opriri programate și nici alți pasageri."],
      ["Ce se întâmplă dacă aterizez după miezul nopții?", "Preluarea urmează ora reală de aterizare. Sosirile de noapte sunt obișnuite pe această rută și nu au supliment."],
    ],
  },
  "family-child-seats": {
    slug: "transfer-aeroport-antalya-cu-copii",
    title: "Transfer de pe aeroportul Antalya cu copii: scaune, cărucioare, bagaje",
    heading: "Drumul spre hotel cu copii",
    description:
      "Scaune pentru copii, cărucioare și bagaje la un transfer de pe aeroportul din Antalya. Ce să ceri la rezervare și de ce e mai simplu un vehicul privat cu copii mici.",
    excerpt:
      "Scaunele pentru copii sunt gratuite la cerere, dar doar dacă aflăm de ele înainte să aterizezi. Ce să ne spui și ce încape efectiv în mașină.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Un transfer cu copii mici e o problemă de logistică, nu de preț. Scaunele, un cărucior, un pătuț de călătorie și patru valize trebuie să încapă simultan în același vehicul - iar deciziile care fac asta posibilă se iau la rezervare, nu la terminal." },
      { type: "h2", text: "Scaune pentru copii" },
      { type: "p", text: "Oferim scaune pentru copii gratuit, la cerere. Spune-ne la rezervare numărul copiilor și vârsta lor; asta stabilește dacă e nevoie de scoică, de scaun pentru toddler sau de înălțător. Scaunele sunt pregătite odată cu vehiculul, deci nu ai nimic de cărat prin aeroport și nimic de aranjat la 01:00 în sala de sosiri." },
      { type: "h2", text: "Ce încape în vehicul" },
      {
        type: "ul",
        items: [
          "Mercedes Vito: până la șase pasageri cu bagaje obișnuite de vacanță.",
          "Mercedes Sprinter: grupuri mai mari, până la 12 locuri, și alegerea corectă când vin și căruciorul, și pătuțul.",
          "Cărucioarele și scaunele nu intră în numărul de pasageri, dar ocupă spațiu de bagaje - spune-ne și alocăm vehiculul potrivit.",
        ],
      },
      { type: "p", text: "Prețul fix e pe vehicul, nu pe loc, deci un copil în plus nu schimbă niciodată tariful. Se schimbă doar vehiculul pe care îl trimitem." },
      { type: "h2", text: "De ce contează mai mult privatul cu copii" },
      { type: "p", text: "Într-un shuttle în comun, familia așteaptă întâi să se umple vehiculul, apoi merge de-a lungul coastei în timp ce alții coboară. Cu un copil mic după un zbor de noapte, asta e diferența dintre patruzeci de minute și trei ore. Un vehicul privat pleacă atunci când sunteți gata și merge direct la recepția hotelului." },
      { type: "h2", text: "Detalii practice utile" },
      { type: "p", text: "În vehicul există apă potabilă. Dacă e nevoie de o oprire scurtă pe drumul lung spre Side sau Alanya, spune-i șoferului - nu e niciun orar de respectat. Iar pentru că plata se face cash la începutul cursei, nimeni nu trebuie să caute un card sau semnal cu un copil adormit în brațe." },
    ],
    faq: [
      ["Scaunele pentru copii sunt gratuite?", "Da. Scaunele se oferă fără cost suplimentar, la cerere. Te rugăm să indici numărul copiilor și vârsta lor la rezervare."],
      ["Pot lua un cărucior?", "Da. Spune-ne la rezervare ca să prevedem spațiul - un cărucior plus un set complet de valize poate însemna Sprinter în loc de Vito."],
      ["Copiii intră în limita de pasageri?", "Pentru locuri, da. Prețul nu se schimbă: e fix pe vehicul, nu pe persoană."],
      ["Putem opri pe un transfer lung?", "Da. La un transfer privat, șoferul poate face o oprire scurtă la cerere; nu așteaptă alți pasageri."],
    ],
  },
  "belek-golf-transfer": {
    slug: "transfer-de-golf-spre-belek",
    title: "Transfer de golf spre Belek: crose, grupuri și calculul timpului din AYT",
    heading: "De la aeroportul din Antalya la Belek cu sacii de golf",
    description:
      "Cum ajunge bagajul de golf de pe aeroportul din Antalya la Belek: alegerea vehiculului, mărimea grupului, calculul până la tee time și ce să confirmi la rezervare.",
    excerpt:
      "Belek e întâi o destinație de golf și abia apoi o stațiune de plajă. Ce înseamnă asta pentru portbagaj, alegerea vehiculului și drumul din AYT.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Belek se află la 45 km est de aeroportul din Antalya, 35-40 de minute de mers, și concentrează cel mai dens grup de terenuri de campionat din Türkiye. Majoritatea grupurilor duc acolo ceva pentru care un transfer obișnuit nu e dimensionat: saci de golf." },
      { type: "h2", text: "Sacii de golf și alegerea vehiculului" },
      { type: "p", text: "Un tour bag are aproximativ 130 cm și nu împarte spațiul politicos cu valizele. Regula de lucru: un Mercedes Vito duce patru pasageri cu patru saci și bagajele lor obișnuite; peste atât, vehiculul potrivit e un Mercedes Sprinter. Spune-ne numărul de saci la rezervare și alocăm vehiculul după încărcătură, nu după numărul de persoane." },
      {
        type: "ul",
        items: [
          "Patru jucători, patru saci, valize standard: Vito.",
          "Șase-opt jucători, sau saci plus valize mari: Sprinter.",
          "Grup mixt cu însoțitori care nu joacă: numără sacii, nu oamenii.",
        ],
      },
      { type: "h2", text: "Calculul în jurul orei de start" },
      { type: "p", text: "Drumul e scurt, aeroportul nu. În vârf de sezon, alocă 20-45 de minute de la aterizare până ieși din terminal, apoi 35-40 de minute de mers. Un tee time dimineața în ziua sosirii e realist doar pentru zborurile care aterizează înainte de circa 07:00; pentru orice altceva, planifică primul tur a doua zi dimineață." },
      { type: "h2", text: "Terenuri și hoteluri din zonă" },
      { type: "p", text: "Resorturile din Belek - printre care Regnum Carya, Gloria, Cornelia și Maxx Royal - se află la câțiva kilometri unul de altul și de terenuri, deci o oprire în plus pentru un coechipier cazat în alt hotel costă minute, nu o oră. La un transfer privat se poate; într-un shuttle nu tu decizi ordinea." },
      { type: "h2", text: "Ce să confirmi la rezervare" },
      { type: "p", text: "Trei lucruri: numărul de saci de golf, numele hotelului și ora preluării de întoarcere, dacă știi deja plecarea. Prețul e fix pe vehicul, deci un vehicul mai mare pentru bagaje e o ofertă pe care o vezi înainte de călătorie, niciodată un supliment la bordură." },
    ],
    faq: [
      ["Bagajul de golf costă în plus?", "Nu. Prețul e fix pe vehicul. Bagajele mari pot însemna că trimitem un Sprinter în loc de Vito, iar prețul acela îl vezi la rezervare."],
      ["Câți saci de golf încap într-un Vito?", "Practic, patru saci cu patru pasageri și valize standard. Pentru mai mulți saci sau jucători folosim un Sprinter."],
      ["Cât durează drumul de la aeroportul din Antalya la Belek?", "45 km, în mod normal 35-40 de minute în trafic obișnuit."],
      ["Putem opri la un al doilea hotel în Belek?", "Da. Resorturile sunt aproape unul de altul, deci o oprire suplimentară la un transfer privat costă doar câteva minute. Menționează asta la rezervare."],
    ],
  },
  "when-to-visit-antalya": {
    slug: "cea-mai-buna-perioada-pentru-antalya",
    title: "Cea mai bună perioadă pentru Antalya: sezon cu sezon și ce înseamnă pentru transfer",
    heading: "Când să mergi în Antalya - și cum schimbă sezonul sosirea ta",
    description:
      "Antalya sezon cu sezon: vreme, aglomerație, prețuri și trafic pe aeroport. Ce înseamnă fiecare lună pentru orele de zbor, trafic și planificarea sosirii.",
    excerpt:
      "Fiecare sezon de pe Riviera Turcească înseamnă altă sosire. Ce se schimbă între aprilie și octombrie și de ce contează pe șosea.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Antalya e aglomerată vreo șapte luni și liniștită cinci, iar diferența se vede cu mult înainte de plajă - în prețurile biletelor, cozile de pe aeroport și traficul de pe D400." },
      { type: "h2", text: "Aprilie-mai: fereastra cu cel mai bun raport" },
      { type: "p", text: "Temperatura mării urcă în mai, ziua sunt peste douăzeci de grade, iar drumul de coastă e gol după standardele verii. Zborurile aterizează la ore civilizate și terminalul se golește repede. Tot atunci, drumul spre Alanya sau Kaș e o plăcere, nu o probă de rezistență." },
      { type: "h2", text: "Iunie-august: vârful" },
      { type: "p", text: "Iulie și august sunt calde, pline și scumpe. Aeroportul din Antalya e la încărcarea maximă, controlul de pașapoarte și bagajele durează cel mai mult, iar pe drumul de coastă se amestecă traficul de vacanță cu cel local de weekend. Atunci se amortizează prețul fix și preluarea după zborul real: pe șosea nimic nu e previzibil, deci merită fixat tot ce se poate fixa dinainte." },
      { type: "h2", text: "Septembrie-octombrie: cel mai bun compromis" },
      { type: "p", text: "Marea e cea mai caldă, aglomerația scade săptămână de săptămână, iar de la mijlocul lui septembrie prețurile coboară. Mulți vizitatori fideli consideră finalul lui septembrie cea mai bună săptămână a anului pe această coastă. Transferurile se încadrează din nou în timpii nominali." },
      { type: "h2", text: "Noiembrie-martie: sezonul liniștit" },
      { type: "p", text: "Temperaturile de zi rămân blânde, multe hoteluri de plajă se închid, iar orașul, munții și siturile antice iau locul litoralului. Oferta de zboruri se îngustează și orele de sosire devin mai incomode - exact momentul în care un vehicul rezervat dinainte bate improvizația de la terminal." },
      { type: "h2", text: "Ce schimbă sezonul la transferul tău" },
      {
        type: "ul",
        items: [
          "Miezul verii: alocă până la 45 de minute de la aterizare până ieși din terminal și așteaptă timpi mai lungi la est de Manavgat.",
          "Sezon intermediar: duratele publicate sunt realiste.",
          "Iarnă: mai puține zboruri și mai multe aterizări de noapte - dă numărul zborului și lasă preluarea să îl urmeze.",
          "Tot anul: prețul fix pe vehicul nu se schimbă cu sezonul, traficul sau ora.",
        ],
      },
    ],
    faq: [
      ["Care e cea mai bună lună pentru Antalya?", "Sfârșitul lui septembrie oferă de obicei cea mai bună combinație: marea la cea mai ridicată temperatură, aglomerație redusă și prețuri deja în scădere."],
      ["Aeroportul din Antalya e mai aglomerat vara?", "Considerabil. În iulie și august alocă până la 45 de minute de la aterizare până ieși din terminal; în sezonul intermediar e adesea jumătate."],
      ["Prețurile transferului se schimbă în funcție de sezon?", "Nu. Prețurile noastre sunt fixe pe vehicul și nu se schimbă cu sezonul, traficul sau ora."],
      ["Merită Antalya iarna?", "Da, pentru oraș, munți și siturile arheologice, nu pentru plajă. Multe hoteluri de pe litoral sunt închise între noiembrie și martie."],
    ],
  },
  "antalya-in-autumn": {
    "slug": "ce-sa-faci-in-antalya-toamna",
    "title": "Antalya toamna: ce să faci în octombrie și noiembrie",
    "heading": "Antalya toamna: ce să faci în octombrie și noiembrie",
    "description": "Ce să faci în Antalya toamna: mare caldă, plaje liniștite, situri antice, drumeții prin canioane și golf. Vremea, ce rămâne deschis și cum îți planifici sosirea.",
    "excerpt": "Marea e încă caldă, aglomerația a plecat acasă, iar căldura s-a domolit. De ce octombrie și noiembrie sunt cel mai bine păstrat secret al Rivierei Turcești.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Antalya toamna este o alegere excelentă tocmai pentru că majoritatea turiștilor pleacă la sfârșitul lui septembrie. Marea păstrează căldura verii încă multe săptămâni, temperaturile de zi coboară la 20 și ceva de grade, iar locurile de nesuportat în august – ruinele, canioanele, orașul vechi – devin partea cea mai frumoasă a călătoriei."
      },
      {
        "type": "h2",
        "text": "Vremea în Antalya toamna"
      },
      {
        "type": "table",
        "head": [
          "Luna",
          "Zi / noapte",
          "Marea",
          "Cum se simte"
        ],
        "rows": [
          [
            "Octombrie",
            "aproximativ 27 °C / 16 °C",
            "aproximativ 24 °C",
            "Vară fără caniculă – zilele de plajă sunt încă ceva obișnuit"
          ],
          [
            "Noiembrie",
            "aproximativ 21 °C / 11 °C",
            "aproximativ 21 °C",
            "Dimineți însorite, primele averse, seri răcoroase"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Pregătește bagajul și pentru plajă, și pentru seară: în octombrie ajunge o jachetă subțire, în noiembrie e bine să ai un strat mai gros și o geacă de ploaie."
      },
      {
        "type": "h2",
        "text": "Tot vacanță la mare: octombrie pe coastă"
      },
      {
        "type": "p",
        "text": "În octombrie plajele din Konyaaltı, Lara, Belek, Side și Alanya sunt încă deschise, dimineața apa e adesea mai caldă decât aerul, iar pe șezlonguri nu mai e concurență. Majoritatea resorturilor mari din Belek, Side și Kemer rămân deschise până la sfârșitul lui octombrie; din noiembrie oferta se restrânge, așa că verifică sezonul hotelului înainte să rezervi zborul."
      },
      {
        "type": "h2",
        "text": "Situri antice fără caniculă"
      },
      {
        "type": "p",
        "text": "Toamna este sezonul ruinelor din regiune. Perge și Aspendos se află la un mic ocol de drumul spre Belek și Side, Templul lui Apollo din Side se înalță la marginea portului, iar Termessos, sus în munții din spatele orașului, este o plimbare pe care nimeni nu ar trebui s-o încerce vara. În noiembrie s-ar putea să ai străzi întregi cu colonade doar pentru tine."
      },
      {
        "type": "h2",
        "text": "Natură: canioane, cascade și Drumul Lician"
      },
      {
        "type": "ul",
        "items": [
          "Cascadele Düden: cascada de jos cade direct în mare lângă Lara, cea de sus se află într-un parc din oraș.",
          "Canionul Köprülü: sezonul de rafting ține de obicei până în octombrie, cu apă mai liniștită decât primăvara.",
          "Drumul Lician: toamna și primăvara sunt cele două sezoane de drumeții – etapele din jurul Kemer, Olympos și Kaş sunt acum în cea mai bună formă.",
          "Telecabina Tahtalı de lângă Kemer: aerul limpede de toamnă oferă cele mai frumoase priveliști de pe vârf."
        ]
      },
      {
        "type": "h2",
        "text": "Golf, viața orașului și festivaluri"
      },
      {
        "type": "p",
        "text": "Toamna este sezonul de vârf pentru golf în Belek: terenurile sunt verzi, temperaturile ideale, iar orele de start se ocupă cu grupuri din nordul Europei. În oraș, străduțele, cafenelele și micile muzee din Kaleiçi prind din nou viață după ce pleacă turiștii de pe vasele de croazieră și cei de vară, iar Festivalul de Film Portocala de Aur din Antalya are loc în mod tradițional toamna."
      },
      {
        "type": "h2",
        "text": "Sosirea toamna"
      },
      {
        "type": "ul",
        "items": [
          "În octombrie zborurile sunt încă dese; din noiembrie orarele se răresc și mai multe curse aterizează târziu în noapte.",
          "Terminalul e mai liniștit decât vara, așa că timpii de drum spre Belek, Side și Alanya sunt apropiați de cei publicați.",
          "Un transfer rezervat din timp urmărește numărul zborului tău, așa că o cursă de seară întârziată nu este o problemă.",
          "Prețurile noastre sunt fixe pe vehicul și sunt aceleași în octombrie ca în august."
        ]
      }
    ],
    "faq": [
      [
        "Este destul de cald pentru înot în Antalya în octombrie?",
        "Da. În octombrie marea are de obicei în jur de 24 °C, mai caldă decât multe mări europene vara, iar zilele de plajă sunt ceva obișnuit toată luna."
      ],
      [
        "Sunt hotelurile din Antalya deschise în noiembrie?",
        "Hotelurile din oraș și multe resorturi rămân deschise, dar o parte dintre resorturile mari de pe coastă se închid din noiembrie. Verifică perioada de funcționare a hotelului înainte să rezervi zborul."
      ],
      [
        "Ce poți face în Antalya toamna, în afară de plajă?",
        "Situri antice precum Perge, Aspendos și Termessos, cascadele Düden, Canionul Köprülü, drumeții pe Drumul Lician, golf în Belek și orașul vechi Kaleiçi."
      ],
      [
        "Se schimbă prețul transferului după sezonul de vară?",
        "Nu. Prețul este fix pe vehicul și nu se schimbă în funcție de sezon, trafic sau ora din zi."
      ]
    ]
  },
  "antalya-in-winter": {
    "slug": "ce-sa-faci-in-antalya-iarna",
    "title": "Antalya iarna: ce să faci din decembrie până în februarie",
    "heading": "Antalya iarna: ce să faci între decembrie și februarie",
    "description": "Ce să faci în Antalya iarna: orașul vechi, cascade, situri antice, schi la Saklıkent, golf și hoteluri cu spa. Vremea, ce e deschis și cum te deplasezi.",
    "excerpt": "Zile blânde, zăpadă pe munți și un oraș care le aparține din nou localnicilor. Ce oferă Antalya între decembrie și februarie – și ce nu.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Antalya iarna intră în sezonul liniștit, nu în cel închis. Resorturile de plajă se odihnesc, dar orașul, munții și siturile antice sunt deschise, lumina este limpede, iar zilele sunt adesea însorite și blânde. Este momentul să vezi regiunea așa cum o văd cei care locuiesc aici – și la prețuri pe care turiștii de vară nu le prind niciodată."
      },
      {
        "type": "h2",
        "text": "Vremea în Antalya iarna"
      },
      {
        "type": "table",
        "head": [
          "Luna",
          "Zi / noapte",
          "Marea",
          "Bine de știut"
        ],
        "rows": [
          [
            "Decembrie",
            "aproximativ 16 °C / 7 °C",
            "aproximativ 19 °C",
            "Cea mai ploioasă lună, dar ploaia vine în reprize, între zile însorite"
          ],
          [
            "Ianuarie",
            "aproximativ 15 °C / 6 °C",
            "aproximativ 17 °C",
            "Cea mai rece lună; zăpadă pe vârfurile Munților Taurus"
          ],
          [
            "Februarie",
            "aproximativ 16 °C / 6 °C",
            "aproximativ 17 °C",
            "Zile mai lungi, primii migdali înfloriți"
          ]
        ]
      },
      {
        "type": "p",
        "text": "O după-amiază însorită de iarnă seamănă cu primăvara din nordul Europei; serile sunt răcoroase, iar interioarele nu sunt întotdeauna încălzite ca în nord. Ia haine în straturi, o geacă impermeabilă și încălțăminte comodă pentru străzile pavate ude."
      },
      {
        "type": "h2",
        "text": "Orașul: Kaleiçi, muzee și cascade"
      },
      {
        "type": "ul",
        "items": [
          "Kaleiçi, orașul vechi cu ziduri: Poarta lui Hadrian, Minaretul Canelat, portul vechi și străduțe cu case otomane transformate în cafenele și hoteluri boutique.",
          "Muzeul Antalya: una dintre marile colecții arheologice ale Turciei, cu statuile de la Perge – vizita ideală într-o zi ploioasă.",
          "Cascadele Düden și Kurşunlu: ploile de iarnă le fac cele mai bogate și mai impresionante.",
          "Promenadele Konyaaltı și Lara: plimbări lungi, ciclism și priveliști spre mare fără căldura verii."
        ]
      },
      {
        "type": "h2",
        "text": "Situri antice fără cozi"
      },
      {
        "type": "p",
        "text": "Perge, Aspendos și Side sunt deschise tot anul, iar iarna le împarți cu câțiva vizitatori. Phaselis, lângă Kemer, are trei porturi într-o pădure de pini; Olympos și Çıralı sunt liniștite în afara sezonului. Termessos se află în munți și poate fi rece, ud sau chiar înzăpezit, așa că alege o zi uscată. Mai spre vest, Biserica Sfântului Nicolae din Demre este o vizită firească iarna, mai ales în preajma Crăciunului."
      },
      {
        "type": "h2",
        "text": "Schi și mare în aceeași zi"
      },
      {
        "type": "p",
        "text": "Stațiunea de schi Saklıkent, în munții Bakırlı, se află la aproximativ 50 km de oraș, cam o oră și jumătate de mers cu mașina. Când e destulă zăpadă, de obicei din ianuarie până în martie, poți schia dimineața și te poți plimba pe malul mării după-amiaza. Drumul de munte poate cere anvelope de iarnă sau lanțuri, așa că verifică starea drumului înainte să pleci și cere-ne din timp o ofertă pentru excursie."
      },
      {
        "type": "h2",
        "text": "Golf de iarnă, hoteluri cu spa și sejururi lungi"
      },
      {
        "type": "p",
        "text": "Terenurile de golf din Belek rămân deschise toată iarna, iar taxele de joc și tarifele hotelurilor sunt mult sub nivelul din toamnă și primăvară. Mai multe resorturi din Belek, Lara și Kemer își țin spa-ul și piscinele interioare deschise iarna, iar Alanya și Side atrag vizitatori din nordul Europei care vin pentru sejururi lungi, de săptămâni sau luni de vreme blândă."
      },
      {
        "type": "h2",
        "text": "Excursii mai departe"
      },
      {
        "type": "p",
        "text": "Iarna este un moment bun pentru excursiile lungi care vara te epuizează: travertinele de la Pamukkale și ruinele din Hierapolis sau Cappadocia sub zăpadă, pe care mulți vizitatori o consideră cea mai frumoasă perioadă a anului acolo. Ambele înseamnă zile lungi pe drum, iar un vehicul privat îți permite să oprești când și unde vrei."
      },
      {
        "type": "h2",
        "text": "Sosirea iarna"
      },
      {
        "type": "ul",
        "items": [
          "Sunt mai puține zboruri directe și mai multe sosiri noaptea, adesea prin Istanbul.",
          "Multe resorturi de pe coastă sunt închise, așa că verifică dacă hotelul tău este deschis în perioada ta.",
          "Noaptea, stațiile de taxi sunt mai liniștite decât vara; un transfer rezervat din timp, care urmărește numărul zborului, este varianta mai relaxată.",
          "Prețul fix pe vehicul este același iarna ca vara – fără supliment de noapte sau de sărbători."
        ]
      }
    ],
    "faq": [
      [
        "Merită să vizitezi Antalya iarna?",
        "Da, dacă vii pentru oraș, situri antice, natură și golf, nu pentru plajă. Zilele sunt adesea însorite, cu temperaturi în jur de 15 °C, și nu e aglomerație."
      ],
      [
        "Se poate înota în Antalya iarna?",
        "Marea rămâne la aproximativ 17–19 °C, pe care unii vizitatori o găsesc revigorantă într-o zi însorită. Multe hoteluri deschise iarna au și piscine interioare încălzite."
      ],
      [
        "Se poate schia lângă Antalya?",
        "Da. Stațiunea de schi Saklıkent se află la aproximativ 50 km de oraș. Sezonul depinde de ninsori și ține de obicei din ianuarie până în martie."
      ],
      [
        "Sunt hotelurile din Antalya deschise iarna?",
        "Hotelurile din orașul Antalya și din Kaleiçi sunt deschise tot anul, la fel ca mai multe resorturi din Lara, Belek, Kemer, Side și Alanya. Multe resorturi mari sezoniere se închid din noiembrie până în martie."
      ],
      [
        "Faceți transferuri de la Aeroportul Antalya iarna?",
        "Da, tot anul, inclusiv pentru sosiri noaptea și de sărbători, la același preț fix pe vehicul."
      ]
    ]
  },
  "christmas-new-year-antalya": {
    "slug": "craciun-si-revelion-in-antalya",
    "title": "Crăciun și Revelion în Antalya: ghid practic",
    "heading": "Crăciun și Revelion în Antalya",
    "description": "Crăciun sau Revelion în Antalya: vremea, ce hoteluri sunt deschise, cine de gală, Sfântul Nicolae din Demre și drumul spre și dinspre aeroport în nopțile aglomerate.",
    "excerpt": "Zile însorite, o gală de Revelion lângă mare și orașul Sfântului Nicolae la două ore și jumătate distanță. Cum îți planifici sărbătorile în Antalya și cum ajungi în noaptea cea mare.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Crăciunul și Revelionul în Antalya formează unul dintre puținele vârfuri de iarnă ale regiunii. Familii care fug de iarna nordică, grupuri care sărbătoresc Revelionul și vizitatori care combină sărbătorile cu câteva zile de soare blând ajung toți în aceleași două săptămâni – în timp ce restul coastei este în sezonul liniștit."
      },
      {
        "type": "h2",
        "text": "La ce să te aștepți la sfârșitul lui decembrie"
      },
      {
        "type": "p",
        "text": "Ziua, temperaturile ajung de obicei la 15–16 °C și e adesea soare, deși decembrie este și cea mai ploioasă lună a anului. Crăciunul nu este zi liberă legală în Turcia, așa că magazinele, restaurantele și obiectivele turistice funcționează normal pe 25 decembrie. Revelionul, în schimb, este sărbătorit pe scară largă, iar 1 ianuarie este zi liberă legală."
      },
      {
        "type": "h2",
        "text": "Ce hoteluri sunt deschise"
      },
      {
        "type": "p",
        "text": "Hotelurile din orașul Antalya și din Kaleiçi sunt deschise tot anul, iar mai multe resorturi din Lara, Belek, Kemer, Side și Alanya se deschid special pentru perioada sărbătorilor, cu cină de Crăciun și gală de Revelion. Programele, codul vestimentar și suplimentele pentru gală diferă mult, așa că întreabă hotelul ce este inclus înainte să rezervi. Camerele din resorturile deschise se vând repede pentru aceste date."
      },
      {
        "type": "h2",
        "text": "Crăciunul: orașul Sfântului Nicolae"
      },
      {
        "type": "p",
        "text": "Sfântul Nicolae istoric, episcopul din spatele legendei lui Moș Crăciun, a trăit la Myra – actualul Demre, la aproximativ două ore și jumătate spre vest de Antalya. Biserica Sfântului Nicolae și mormintele liciene săpate în stâncă de la Myra sunt o excursie de Crăciun memorabilă, care poate fi combinată cu o oprire la Kaş sau cu drumul de coastă din jurul Kumluca."
      },
      {
        "type": "h2",
        "text": "Revelionul în Antalya"
      },
      {
        "type": "ul",
        "items": [
          "Gale la hotel: cină, muzică live și numărătoare inversă, de obicei cu meniu fix și supliment.",
          "Orașul: restaurantele din Kaleiçi și din jurul portului de agrement sunt pline; rezervă masa din timp.",
          "Lara și Konyaaltı: cluburile de plajă și restaurantele cu vedere la mare își organizează propriile petreceri.",
          "Artificiile se pot vedea de pe faleză, deși programul se schimbă de la an la an."
        ]
      },
      {
        "type": "h2",
        "text": "Deplasarea în cele mai aglomerate nopți"
      },
      {
        "type": "p",
        "text": "În noaptea de Revelion și în primele ore din 1 ianuarie taxiurile sunt greu de găsit, iar aplicațiile și stațiile sunt copleșite exact când toată lumea vrea să plece. Dacă petreci în altă parte decât la hotel – în oraș, la un restaurant sau în vila unor prieteni – rezervă din timp drumul de întoarcere, cu o oră fixă de preluare."
      },
      {
        "type": "h2",
        "text": "Sosiri și plecări de sărbători"
      },
      {
        "type": "ul",
        "items": [
          "Zborurile din jurul datelor de 20 decembrie și 2 ianuarie sunt cele mai aglomerate ale iernii; rezervă din timp.",
          "Multe zboruri de sărbători aterizează seara sau noaptea – o preluare care urmărește numărul zborului te scutește de așteptat în terminal.",
          "Familiile cu cadouri de Crăciun și bagaje de iarnă ar trebui să ne spună numărul de valize, ca să alocăm vehiculul potrivit.",
          "Prețul nostru fix pe vehicul nu are supliment de sărbători sau de Revelion."
        ]
      }
    ],
    "faq": [
      [
        "Cum este vremea în Antalya de Crăciun?",
        "Blândă: de obicei în jur de 15–16 °C ziua și 6–8 °C noaptea, cu perioade însorite între averse. Nu e vreme de plajă, dar este adesea plăcută pentru plimbări și vizitat."
      ],
      [
        "Se sărbătorește Crăciunul în Antalya?",
        "Crăciunul nu este zi liberă legală în Turcia, dar multe hoteluri cu oaspeți internaționali organizează o cină de Crăciun. Revelionul este sărbătorit pe scară largă, iar 1 ianuarie este zi liberă legală."
      ],
      [
        "Unde se află biserica Sfântului Nicolae?",
        "În Demre, antica Myra, la aproximativ două ore și jumătate de mers cu mașina spre vest de Antalya. Este deschisă vizitatorilor tot anul."
      ],
      [
        "Pot rezerva un transfer pentru noaptea de Revelion?",
        "Da. Îți recomandăm să rezervi drumul de întoarcere cu o oră fixă de preluare, pentru că după miezul nopții taxiurile sunt foarte greu de găsit. Prețul fix pe vehicul nu are supliment de sărbători."
      ]
    ]
  },
  "wintering-in-antalya": {
    "slug": "iernat-in-antalya-si-alanya-sejur-lung",
    "title": "Iernat în Antalya și Alanya: ghid pentru sejururi lungi",
    "heading": "Iarna în Antalya: ghid pentru sejururi lungi",
    "description": "Iernat pe Riviera Turcească: de ce Alanya, Side și Antalya atrag oaspeți pe termen lung și la ce să te aștepți de la vreme, cazare, servicii medicale și bagaje multe.",
    "excerpt": "Săptămâni sau luni de vreme blândă în locul unei ierni nordice. Ce trebuie să știi înainte să petreci iarna în Alanya, Side sau Antalya.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Iernatul în Antalya și Alanya atrage în fiecare an mii de vizitatori din Germania, Scandinavia, Țările de Jos, Rusia și Polonia, care schimbă cerul cenușiu pe Riviera Turcească pentru săptămâni sau luni întregi. Temperaturile blânde, promenadele lungi și costul vieții mai mic decât acasă fac din Antalya, Alanya și Side unele dintre cele mai populare destinații de iarnă din Mediterana."
      },
      {
        "type": "h2",
        "text": "De ce să petreci iarna aici"
      },
      {
        "type": "ul",
        "items": [
          "Climă blândă: zile de iarnă în jur de 15–17 °C, frecvent însorite, rareori îngheț pe coastă.",
          "Lumină: vizibil mai multe ore de soare decât în nordul și centrul Europei.",
          "Spațiu: promenade, plaje și orașe vechi fără aglomerația verii.",
          "Infrastructură: în orașele mai mari, magazinele, piețele, restaurantele și spitalele private sunt deschise tot anul."
        ]
      },
      {
        "type": "h2",
        "text": "Unde să stai"
      },
      {
        "type": "table",
        "head": [
          "Locul",
          "Potrivit pentru",
          "Distanța de la aeroport"
        ],
        "rows": [
          [
            "Orașul Antalya",
            "Viață urbană, cultură, muzee, toate serviciile la îndemână",
            "aproximativ 15–30 de minute"
          ],
          [
            "Side / Manavgat",
            "Un oraș vechi liniștit, plaje lungi, plimbări pe teren plat",
            "aproximativ 1 oră"
          ],
          [
            "Alanya",
            "Cea mai mare comunitate de sejur lung, promenade, viață activă iarna",
            "aproximativ 1 oră și 45 de minute"
          ],
          [
            "Kemer",
            "Munte și mare, drumeții, o stațiune mai mică",
            "aproximativ 1 oră"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Alanya și localitățile învecinate, precum Mahmutlar și Oba, au cea mai mare comunitate de oaspeți care petrec aici iarna, cu cluburi, activități și restaurante animate toată iarna. Side este mai liniștit; Antalya li se potrivește celor care vor un oraș adevărat."
      },
      {
        "type": "h2",
        "text": "Cazare: hoteluri și apartamente"
      },
      {
        "type": "p",
        "text": "Unele hoteluri din Alanya, Side și Antalya oferă tarife speciale pentru sejururi de patru săptămâni sau mai mult, adesea cu demipensiune. Apartamentele închiriate oferă mai mult spațiu și independență; verifică dacă au încălzire sau aer condiționat cu funcție de încălzire, pentru că locuințele de pe coasta turcească sunt construite pentru vară și pot părea reci în serile de iarnă."
      },
      {
        "type": "h2",
        "text": "Viața de zi cu zi iarna"
      },
      {
        "type": "ul",
        "items": [
          "Piețe săptămânale în fiecare cartier pentru fructe și legume proaspete – iarna este sezonul citricelor.",
          "Plimbări și ciclism pe promenadele din Alanya, Side, Lara și Konyaaltı.",
          "Drumeții pe dealurile de la poalele Munților Taurus și pe Drumul Lician în zilele uscate.",
          "Excursii de o zi la situri antice, la cascada Manavgat sau în orașul vechi al Antalyei.",
          "Spitale și clinici private în Antalya și Alanya, cu departamente pentru pacienți internaționali."
        ]
      },
      {
        "type": "h2",
        "text": "Acte și aspecte practice"
      },
      {
        "type": "p",
        "text": "Regulile de intrare și durata șederii permise fără permis de rezidență depind de cetățenie și se schimbă din când în când, așa că verifică regulile actuale la autoritățile oficiale turce înainte de călătorie. O asigurare de călătorie care acoperă un sejur lung în străinătate este puternic recomandată."
      },
      {
        "type": "h2",
        "text": "Sosirea cu bagaje pentru câteva luni"
      },
      {
        "type": "p",
        "text": "Oaspeții care stau mult călătoresc cu mai mult decât o valiză de vacanță. Spune-ne câte valize și obiecte în plus aduci – biciclete, cadre de mers sau cutii – și îți alocăm un Mercedes Vito sau, dacă e nevoie, un Sprinter. Prețul este fix pe vehicul, așa că bagajele suplimentare sunt luate în calcul la rezervare, nu taxate la bordură. Șoferul ajută la încărcare și descărcare la ușă."
      }
    ],
    "faq": [
      [
        "Care este cel mai bun loc pentru a petrece iarna pe Riviera Turcească?",
        "Alanya are cea mai mare comunitate de sejur lung și cea mai animată viață de iarnă; Side este mai liniștit; Antalya oferă toate serviciile unui oraș. Toate trei au ierni blânde."
      ],
      [
        "Cât de cald este în Antalya iarna?",
        "Din decembrie până în februarie, temperaturile de zi sunt de obicei în jur de 15–17 °C, iar nopțile în jur de 6–8 °C. Înghețul pe coastă este rar."
      ],
      [
        "Există oferte de hotel pentru sejururi lungi iarna?",
        "Da. Mai multe hoteluri din Alanya, Side și Antalya oferă iarna tarife lunare reduse sau tarife pentru sejururi lungi. Întreabă direct hotelul despre sejururile de patru săptămâni sau mai mult."
      ],
      [
        "Pot lua multe bagaje la transferul de la aeroport?",
        "Da. Spune-ne la rezervare numărul de valize și obiectele în plus și îți alocăm un vehicul cu spațiu suficient. Prețul este pe vehicul, fără taxă pe valiză."
      ]
    ]
  },
  "antalya-in-spring": {
    "slug": "ce-sa-faci-in-antalya-primavara",
    "title": "Antalya primăvara: ce să faci din martie până în mai",
    "heading": "Antalya primăvara: ce să faci între martie și mai",
    "description": "Ce să faci în Antalya primăvara: flori de portocal, drumeții pe Drumul Lician, rafting, vacanța de Paște și primele zile de plajă. Vremea pe luni și ce te așteaptă la sosire.",
    "excerpt": "Flori de portocal pe străzi, zăpadă pe vârfuri și o mare care se încălzește de la o săptămână la alta. De ce primăvara este sezonul vacanțelor active în jurul Antalyei.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Antalya primăvara se trezește devreme: pe Riviera Turcească, în martie portocalii sunt deja în floare, Munții Taurus mai au zăpadă, iar zilele sunt destul de calde ca să stai afară. Este cel mai bun sezon pentru plimbări, ciclism și explorare, iar în mai încep primele zile de plajă ale anului."
      },
      {
        "type": "h2",
        "text": "Vremea în Antalya primăvara"
      },
      {
        "type": "table",
        "head": [
          "Luna",
          "Zi / noapte",
          "Marea",
          "Ideal pentru"
        ],
        "rows": [
          [
            "Martie",
            "aproximativ 19 °C / 8 °C",
            "aproximativ 17 °C",
            "Vizitat obiective, drumeții, pomi înfloriți"
          ],
          [
            "Aprilie",
            "aproximativ 22 °C / 11 °C",
            "aproximativ 18 °C",
            "Drumeții, rafting, vacanța de Paște"
          ],
          [
            "Mai",
            "aproximativ 26 °C / 15 °C",
            "aproximativ 21 °C",
            "Primele zile de plajă, toate activitățile"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Flori de portocal și orașul primăvara"
      },
      {
        "type": "p",
        "text": "Primăvara, Antalya miroase a flori de portocal. Orașul sărbătorește acest lucru cu Carnavalul Florii de Portocal, un festival de stradă organizat primăvara în jurul Kaleiçi și în centrul orașului. Este și cel mai bun moment să explorezi pe jos orașul vechi, Muzeul Antalya și falezele din Konyaaltı și Lara, înainte să vină căldura verii."
      },
      {
        "type": "h2",
        "text": "Vacanțe active: drumeții, rafting și ciclism"
      },
      {
        "type": "ul",
        "items": [
          "Drumul Lician: primăvara este cel mai popular sezon de drumeții, cu flori sălbatice de-a lungul etapelor de lângă Kemer, Olympos și Kaş.",
          "Canionul Köprülü: sezonul de rafting începe de obicei în aprilie, cu apă vioaie din topirea zăpezii.",
          "Telecabina Tahtalı: zăpadă sus și pajiști înflorite jos, adesea în aceeași priveliște.",
          "Ciclism: drumuri liniștite și temperaturi blânde în jurul Belek, Side și la poalele Munților Taurus.",
          "Golf: primăvara este al doilea sezon de vârf pe terenurile din Belek."
        ]
      },
      {
        "type": "h2",
        "text": "Situri antice în sezonul verde"
      },
      {
        "type": "p",
        "text": "Perge, Aspendos, Side, Phaselis și Termessos sunt cele mai frumoase primăvara, când ruinele sunt înconjurate de iarbă verde și flori sălbatice. Merg bine și excursiile mai lungi: Pamukkale și Cappadocia au temperaturi plăcute, iar zborurile cu balonul cu aer cald deasupra Cappadociei sunt frecvente primăvara, când vremea este stabilă."
      },
      {
        "type": "h2",
        "text": "Paștele și vacanțele de primăvară"
      },
      {
        "type": "p",
        "text": "Paștele și vacanțele școlare de primăvară din Germania, Țările de Jos, Regatul Unit și Scandinavia aduc primul val de familii. Din aprilie se deschid mai multe hoteluri sezoniere, numărul zborurilor crește, iar în mai majoritatea resorturilor de pe coastă funcționează din plin. Pentru perioada Paștelui, rezervă din timp atât hotelul, cât și transferul."
      },
      {
        "type": "h2",
        "text": "Sosirea primăvara"
      },
      {
        "type": "ul",
        "items": [
          "În martie unele resorturi sunt încă închise; din aprilie oferta se lărgește rapid.",
          "Terminalul și drumurile sunt liniștite, așa că timpii de drum publicați sunt realiști.",
          "Echipamentul de drumeție și de golf, bicicletele și scaunele pentru copii trebuie menționate la rezervare.",
          "Prețul este fix pe vehicul și nu se schimbă în funcție de sezon."
        ]
      }
    ],
    "faq": [
      [
        "Este destul de cald pentru plajă în Antalya primăvara?",
        "Din mai, da: ziua temperaturile ajung la aproximativ 26 °C, iar marea la aproximativ 21 °C. În martie și aprilie e destul de cald să stai la soare, dar pentru majoritatea înotătorilor marea este încă rece."
      ],
      [
        "Când are loc Carnavalul Florii de Portocal în Antalya?",
        "Are loc primăvara, când înfloresc portocalii orașului. Datele se schimbă în fiecare an, așa că verifică anunțurile oficiale ale orașului înainte să-ți planifici călătoria în funcție de el."
      ],
      [
        "Este primăvara un moment bun pentru drumeții pe Drumul Lician?",
        "Da. Primăvara și toamna sunt cele mai bune două sezoane de drumeții; primăvara potecile sunt verzi și pline de flori sălbatice, iar temperaturile sunt plăcute."
      ],
      [
        "Sunt hotelurile din Antalya deschise în martie?",
        "Hotelurile din oraș și unele resorturi sunt deschise. Multe resorturi sezoniere se deschid în aprilie, iar până în mai cea mai mare parte a coastei funcționează din plin."
      ]
    ]
  },
  "cappadocia-winter-trip": {
    "slug": "capadocia-iarna-din-antalya",
    "title": "Capadocia iarna, din Antalya: zăpadă, baloane și drumul până acolo",
    "heading": "Capadocia iarna: o excursie din Antalya",
    "description": "Capadocia iarna, din Antalya: zăpadă, vreme, zboruri cu balonul, hoteluri-peșteră, ce să vezi și cum arată iarna drumul de 540 km prin Konya.",
    "excerpt": "Coșuri ale zânelor acoperite de zăpadă și baloane deasupra unei văi albe. Cum combini un sejur de iarnă în Antalya cu Capadocia și cum e drumul iarna.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Capadocia iarna este unul dintre cele mai fotografiate peisaje din Türkiye: coșurile zânelor și văile sub zăpadă, hoteluri-peșteră cu foc în șemineu și, în diminețile senine, baloane care se ridică deasupra unui peisaj alb. Din Antalya este un drum lung, dar frumos - și o completare firească pentru un sejur de iarnă pe litoral."
      },
      {
        "type": "h2",
        "text": "Vremea iarna: altă climă decât pe coastă"
      },
      {
        "type": "p",
        "text": "Capadocia se află pe un platou înalt, la aproximativ 1.000 de metri sau mai mult, așa că iarna de acolo este o iarnă adevărată. Ziua temperaturile sunt adesea în jurul punctului de îngheț, nopțile sunt mult sub zero, iar zăpada este frecventă din decembrie până în februarie. Ia o geacă de iarnă serioasă, mănuși, căciulă și încălțăminte impermeabilă - hainele potrivite pentru Antalya în ianuarie nu ajung aici."
      },
      {
        "type": "table",
        "head": [
          "",
          "Coasta Antalyei",
          "Capadocia"
        ],
        "rows": [
          [
            "Zi obișnuită de iarnă",
            "în jur de 15 °C",
            "aproximativ 0-5 °C"
          ],
          [
            "Nopți de iarnă",
            "în jur de 6-8 °C",
            "adesea sub zero"
          ],
          [
            "Zăpadă",
            "doar pe vârfurile munților",
            "frecventă din decembrie până în februarie"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Zboruri cu balonul iarna"
      },
      {
        "type": "p",
        "text": "Baloanele zboară tot anul, când vremea permite, iar un zbor la răsărit deasupra văilor înzăpezite este imaginea pentru care vin mulți. Iarna aduce însă și mai multe anulări din cauza vântului, a ceții sau a zăpezii, iar decizia o iau autoritățile devreme, în fiecare dimineață. Plănuiește cel puțin două nopți în Capadocia, ca un zbor anulat să nu însemne că ratezi experiența complet."
      },
      {
        "type": "h2",
        "text": "Ce să vezi iarna"
      },
      {
        "type": "ul",
        "items": [
          "Muzeul în aer liber Göreme: biserici săpate în stâncă, cu fresce, mai liniștit iarna decât în orice altă perioadă a anului.",
          "Orașe subterane precum Derinkuyu și Kaymaklı: mai multe niveluri în adâncime și o temperatură confortabilă, constantă, indiferent de vremea de afară.",
          "Cetatea Uçhisar și punctele de belvedere de deasupra Göreme: cele mai bune locuri pentru panorame cu zăpadă.",
          "Plimbări scurte în Valea Trandafirilor, Valea Roșie și Valea Iubirii în zilele uscate și senine - potecile pot fi înghețate după ninsoare.",
          "Hoteluri-peșteră: multe sunt încălzite și au șemineu, iar iarna este sezonul în care par cele mai speciale."
        ]
      },
      {
        "type": "h2",
        "text": "Drumul din Antalya"
      },
      {
        "type": "p",
        "text": "Distanța este de aproximativ 540 km, iar drumul durează de obicei 7-8 ore: traversează munții Taurus și continuă pe platou prin Konya. Konya, cu Muzeul Mevlana, este o oprire firească pentru a împărți călătoria. Iarna, porțiunea de munte poate avea zăpadă și gheață; drumurile sunt curățate, dar un vehicul echipat de iarnă și un șofer care cunoaște ruta fac diferența dintre o zi lungă și una stresantă."
      },
      {
        "type": "h2",
        "text": "Cum să planifici excursia"
      },
      {
        "type": "ul",
        "items": [
          "Rezervă cel puțin două nopți, ideal trei, ca să ai loc pentru anulări ale zborurilor cu balonul și pentru zilele scurte de iarnă.",
          "Pleacă din Antalya dimineața, ca să traversezi munții pe lumină.",
          "Combină excursia cu un sejur pe litoral: câteva zile în Antalya sau Side, apoi Capadocia, sau invers.",
          "Pentru perioada Crăciunului și a Revelionului, rezervă din timp hotelul-peșteră și eventualul zbor cu balonul."
        ]
      },
      {
        "type": "h2",
        "text": "Transfer între Antalya și Capadocia"
      },
      {
        "type": "p",
        "text": "Oferim transferuri private din Aeroportul Antalya și de la hotelurile de pe litoral până în Capadocia, doar dus sau cu întoarcere la o dată ulterioară. Prețul este fix per vehicul, poți opri pentru fotografii, masă și o vizită în Konya și nu aștepți alți pasageri. Spune-ne hotelul și datele când rezervi."
      }
    ],
    "faq": [
      [
        "Cât de departe este Capadocia de Antalya?",
        "Aproximativ 540 km pe șosea. Drumul durează de obicei 7-8 ore prin Konya, ceva mai mult cu opriri sau pe zăpadă."
      ],
      [
        "Merită să vizitezi Capadocia iarna?",
        "Da. Zăpada pe coșurile zânelor, obiectivele liniștite și hotelurile-peșteră primitoare fac din iarnă una dintre cele mai frumoase perioade acolo. Ia haine groase: este mult mai frig decât pe coastă."
      ],
      [
        "Zboară baloanele în Capadocia iarna?",
        "Da, ori de câte ori vremea permite. Anulările sunt mai frecvente iarna, așa că plănuiește cel puțin două nopți, ca să ai o a doua șansă."
      ],
      [
        "Pot merge din Antalya în Capadocia cu un transfer privat?",
        "Da. Oferim transferuri private din Aeroportul Antalya și de la hotelurile de pe litoral până în Capadocia, doar dus sau dus-întors, la preț fix per vehicul."
      ]
    ]
  },
  "belek-winter-golf": {
    "slug": "golf-iarna-in-belek",
    "title": "Golf iarna în Belek: Riviera Turcească din noiembrie până în martie",
    "heading": "Golf iarna în Belek",
    "description": "De ce Belek e o destinație de golf iarna: vremea din noiembrie până în martie, starea terenurilor, green fee mai mic, ce să iei și cum ajungi cu sacii de golf.",
    "excerpt": "Zile blânde, fairway-uri verzi și tee time-uri mai libere. Ce trebuie să știe jucătorii de golf despre Belek între noiembrie și martie, când terenurile de acasă sunt închise.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Când terenurile din nordul Europei sunt înghețate, îmbibate de apă sau închise, în Belek se joacă mai departe. Golf iarna în Belek este posibil pentru că grupul de terenuri de campionat aflat la 45 km est de Aeroportul Antalya rămâne deschis toată iarna, iar lunile noiembrie-martie au devenit un sezon de sine stătător pentru jucătorii care nu vor să facă pauză între octombrie și aprilie."
      },
      {
        "type": "h2",
        "text": "Cum e vremea pe teren"
      },
      {
        "type": "table",
        "head": [
          "Luna",
          "Zi obișnuită",
          "Pe teren"
        ],
        "rows": [
          [
            "Noiembrie",
            "în jur de 21 °C",
            "Condiții excelente, încă sezonul de vârf de toamnă"
          ],
          [
            "Decembrie - ianuarie",
            "în jur de 15-16 °C",
            "Blând și adesea însorit, cu câteva zile ploioase"
          ],
          [
            "Februarie",
            "în jur de 16 °C",
            "Zilele se lungesc, mai puține zile ploioase"
          ],
          [
            "Martie",
            "în jur de 19 °C",
            "Începutul sezonului de vârf de primăvară"
          ]
        ]
      },
      {
        "type": "p",
        "text": "În majoritatea zilelor de iarnă se poate juca într-un pulover subțire. Ploaia vine de obicei în reprize scurte, nu săptămâni întregi, iar terenurile sunt construite să dreneze repede. Diminețile pot fi răcoroase, iar lumina scade spre sfârșitul după-amiezii, așa că tee time-urile sunt de regulă mai devreme decât vara."
      },
      {
        "type": "h2",
        "text": "De ce merită iarna"
      },
      {
        "type": "ul",
        "items": [
          "Green fee-urile și tarifele hotelurilor sunt în general mai mici în decembrie, ianuarie și februarie decât toamna și primăvara.",
          "Tee sheet-urile sunt mai puțin aglomerate, deci rundele merg mai repede și orele preferate se obțin mai ușor.",
          "Mai multe hoteluri de golf rămân deschise toată iarna, multe cu piscine interioare și spa pentru după-amiază.",
          "Zborurile scurte din mare parte a Europei fac weekendurile prelungite la fel de realiste ca excursiile de o săptămână."
        ]
      },
      {
        "type": "h2",
        "text": "Terenuri și hoteluri iarna"
      },
      {
        "type": "p",
        "text": "Nu toate terenurile și hotelurile din Belek funcționează după același program iarna, iar lucrări de întreținere precum aerarea sau supraînsămânțarea sunt uneori planificate în lunile liniștite. Când rezervi, întreabă ce terenuri sunt deschise în perioada ta și dacă sunt programate lucrări. Hotelurile de golf organizează de obicei tee time-urile și transportul spre terenurile partenere."
      },
      {
        "type": "h2",
        "text": "Ce să iei pentru golf iarna"
      },
      {
        "type": "ul",
        "items": [
          "Straturi: un strat de bază, un pulover și o geacă rezistentă la vânt pentru diminețile răcoroase.",
          "Geacă și pantaloni impermeabili pentru averse ocazionale.",
          "Mănuși de iarnă între lovituri, plus mănușile obișnuite de golf.",
          "Protecție solară: soarele de iarnă este tot puternic în zilele senine."
        ]
      },
      {
        "type": "h2",
        "text": "Cum ajungi în Belek cu sacii de golf"
      },
      {
        "type": "p",
        "text": "De la Aeroportul Antalya până în Belek sunt 35-40 de minute pe șosea, iar iarna terminalul este liniștit, așa că o rundă în după-amiaza sosirii este adesea realistă. Prețul este fix per vehicul, nu per sac: de regulă, un Mercedes Vito ia patru jucători cu patru saci de golf și bagajele lor, iar grupurile mai mari călătoresc cu un Sprinter. Spune-ne numărul de saci când rezervi."
      }
    ],
    "faq": [
      [
        "Se poate juca golf în Belek iarna?",
        "Da. Terenurile din Belek rămân deschise toată iarna, cu temperaturi obișnuite ziua de aproximativ 15-16 °C în decembrie și ianuarie, iar în majoritatea zilelor se poate juca."
      ],
      [
        "Este golful mai ieftin în Belek iarna?",
        "Green fee-urile și tarifele hotelurilor sunt în general mai mici în decembrie, ianuarie și februarie decât în sezoanele de vârf de toamnă și primăvară. Prețurile exacte depind de teren și de hotel."
      ],
      [
        "Care este cea mai bună lună pentru golf în Belek?",
        "Octombrie-noiembrie și martie-aprilie sunt lunile de vârf pentru golf. Iarna este mai liniștită și mai ieftină, cu zile puțin mai răcoroase."
      ],
      [
        "Sacii de golf costă în plus la transfer?",
        "Nu. Prețul este fix per vehicul. Pentru mai mulți saci alocăm un vehicul mai mare, iar prețul îl vezi când rezervi."
      ]
    ]
  },
  "saklikent-ski-antalya": {
    "slug": "schi-langa-antalya-saklikent",
    "title": "Schi lângă Antalya: ghidul stațiunii Saklıkent",
    "heading": "Schi lângă Antalya: stațiunea de schi Saklıkent",
    "description": "Schi lângă Antalya, la Saklıkent: unde se află, cât durează drumul, când e sezonul, la ce să te aștepți pe pârtii și cum combini schiul și marea în aceeași zi.",
    "excerpt": "Dimineața la schi, după-amiaza la plimbare pe malul mării. Ghid practic pentru Saklıkent, stațiunea de schi a Antalyei, și cum ajungi acolo de pe litoral.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Puține regiuni de vacanță îți permit să schiezi și să te plimbi pe malul mării în aceeași zi. Antalya poate: pentru schi lângă Antalya există stațiunea Saklıkent, în munții Bakırlı, la aproximativ 50 km de oraș, iar într-o zi bună de iarnă poți fi pe pârtie dimineața și înapoi pe faleză la apus."
      },
      {
        "type": "h2",
        "text": "Unde se află Saklıkent"
      },
      {
        "type": "p",
        "text": "Stațiunea se află la aproximativ 1.900 de metri, pe versanții munților Bakırlı, la vest de Antalya. Drumul din oraș durează cam o oră și jumătate și urcă din livezile de portocali prin pădure de pin până la zăpadă. În zilele senine, priveliștea de sus ajunge până la coastă și la mare."
      },
      {
        "type": "h2",
        "text": "Când e sezonul"
      },
      {
        "type": "p",
        "text": "Sezonul de schi depinde în întregime de ninsori și durează de obicei din ianuarie până în martie. În unele ierni începe mai devreme sau se termină mai repede, așa că verifică stratul de zăpadă și starea teleschiurilor înainte să-ți planifici ziua."
      },
      {
        "type": "h2",
        "text": "La ce să te aștepți pe pârtii"
      },
      {
        "type": "ul",
        "items": [
          "O stațiune mică și relaxată - ideală pentru începători, familii și o zi de schi în timpul unei vacanțe pe litoral, nu pentru o săptămână întreagă de schi.",
          "Echipamentul de schi și snowboard se poate închiria de obicei în stațiune; verifică programul înainte să pleci.",
          "Săniușul și joaca în zăpadă sunt populare printre familii, mai ales în weekend.",
          "În weekend e aglomerat cu vizitatori locali; în cursul săptămânii e mult mai liniștit."
        ]
      },
      {
        "type": "h2",
        "text": "Schi și mare în aceeași zi"
      },
      {
        "type": "ul",
        "items": [
          "Pleacă de pe litoral dis-de-dimineață, ca să ajungi la deschiderea teleschiurilor.",
          "Schiază sau joacă-te în zăpadă până la începutul după-amiezii.",
          "Coboară pentru un prânz târziu în Kaleiçi sau o plimbare pe plaja Konyaaltı.",
          "Ia haine de schimb: diferența de temperatură dintre pârtie și coastă poate fi de 15 grade sau mai mult."
        ]
      },
      {
        "type": "h2",
        "text": "Cum ajungi: drumul de munte iarna"
      },
      {
        "type": "p",
        "text": "Nu există transport public regulat până la stațiune, iar ultima porțiune a drumului de munte poate avea zăpadă și gheață. Pot fi obligatorii anvelopele de iarnă sau lanțurile. Un transfer privat te duce de la hotelul tău din Antalya, Kemer, Belek sau Side până la pârtie și înapoi, iar timpul petrecut pe munte îl decizi tu. Aceasta nu este una dintre rutele noastre standard, așa că trimite-ne hotelul, data și numărul de persoane și îți oferim un preț fix per vehicul."
      },
      {
        "type": "h2",
        "text": "Alte opțiuni de schi din Antalya"
      },
      {
        "type": "p",
        "text": "Pentru o excursie de schi mai lungă, Davraz, lângă Isparta, este o stațiune mai mare, cu mai multe pârtii, la aproximativ două ore și jumătate - trei ore de Antalya pe șosea. Saklıkent rămâne cea mai simplă alegere pentru o singură zi pe zăpadă în timpul unui sejur pe litoral."
      }
    ],
    "faq": [
      [
        "Se poate schia lângă Antalya?",
        "Da. Stațiunea de schi Saklıkent se află la aproximativ 50 km de orașul Antalya, cam o oră și jumătate pe șosea, în munții Bakırlı."
      ],
      [
        "Când este sezonul de schi la Saklıkent?",
        "Depinde de ninsori. Sezonul durează de obicei din ianuarie până în martie; verifică condițiile actuale înainte să pleci."
      ],
      [
        "Poți schia și înota în aceeași zi în Antalya?",
        "Poți schia dimineața și să fii la mare după-amiaza. Înotul iarna este pentru curajoși: marea are în jur de 17 °C."
      ],
      [
        "Cum ajung la Saklıkent de la hotel?",
        "Nu există transport public regulat. Îți putem oferi un transfer privat de la hotel până la stațiune și înapoi, la preț fix per vehicul."
      ]
    ]
  },
  "pamukkale-trip-from-antalya": {
    "slug": "excursie-pamukkale-din-antalya",
    "title": "Pamukkale din Antalya: excursie de o zi sau cu cazare și când să mergi",
    "heading": "Excursie la Pamukkale din Antalya: cum să planifici drumul",
    "description": "Excursie la Pamukkale din Antalya: distanța și durata drumului, o zi sau cu cazare, travertinele, Hierapolis și Piscina Antică, plus cel mai bun sezon.",
    "excerpt": "Terase albe de travertin, un oraș roman pe deal și o piscină printre coloane antice. Cum vizitezi Pamukkale din Antalya fără să petreci toată ziua în autocar.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "O excursie la Pamukkale din Antalya te duce la unul dintre cele mai cunoscute obiective din Turcia: terase albe de travertin pline cu apă caldă, bogată în minerale, iar deasupra lor ruinele orașului roman Hierapolis. Din Antalya sunt aproximativ 245 km pe șosea, cam trei - trei ore și jumătate pe sens - destul de aproape pentru o excursie de o zi, dar destul de departe încât o noapte de cazare să facă vizita mult mai relaxată."
      },
      {
        "type": "h2",
        "text": "Ce să vezi la Pamukkale"
      },
      {
        "type": "ul",
        "items": [
          "Travertinele: mergi desculț pe terase, prin apă caldă și puțin adâncă - încălțămintea nu este permisă pe suprafața albă.",
          "Hierapolis: un oraș roman întins, cu teatru, o stradă monumentală și una dintre cele mai mari necropole antice din Anatolia.",
          "Piscina Antică: înoți în apă termală caldă printre coloane antice prăbușite (bilet separat).",
          "Muzeul de Arheologie din Hierapolis: descoperiri din situl antic, expuse în fostele terme romane.",
          "Laodiceea: la mică distanță cu mașina, un alt mare oraș antic, cu mult mai puțini vizitatori."
        ]
      },
      {
        "type": "h2",
        "text": "Excursie de o zi sau cu cazare?"
      },
      {
        "type": "table",
        "head": [
          "",
          "Excursie de o zi",
          "Cu o noapte de cazare"
        ],
        "rows": [
          [
            "Timp pe drum",
            "6-7 ore într-o singură zi",
            "Împărțit pe două zile"
          ],
          [
            "Timp la obiectiv",
            "3-4 ore, de obicei la prânz",
            "După-amiaza târziu și dimineața devreme"
          ],
          [
            "Aglomerație",
            "Ajungi odată cu autocarele de tur",
            "Apus și dimineață cu mult mai puțini oameni"
          ],
          [
            "Potrivit pentru",
            "Călători cu puțin timp",
            "Familii, fotografi, oricine vrea să înoate"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Majoritatea tururilor de grup ajung pe la mijlocul zilei, când terasele sunt cele mai aglomerate, iar vara suprafața albă este orbitoare și fierbinte. O noapte petrecută în Pamukkale sau în satul termal Karahayıt îți permite să vezi travertinele la apus și din nou în liniștea dimineții."
      },
      {
        "type": "h2",
        "text": "Cel mai bun sezon pentru Pamukkale"
      },
      {
        "type": "p",
        "text": "Primăvara și toamna sunt cele mai confortabile anotimpuri: temperaturi blânde pentru plimbarea prin Hierapolis și apă plăcută pe terase. Iarna este răcoare și uneori îngheață, dar apa caldă aburește în aerul rece, iar situl este cel mai liniștit. În iulie și august, căldura de la prânz și strălucirea teraselor albe pot fi foarte intense - mergi devreme sau spre seară."
      },
      {
        "type": "h2",
        "text": "Pe drum: lacul Salda și Munții Taurus"
      },
      {
        "type": "p",
        "text": "Drumul urcă de pe coastă peste Munții Taurus și traversează regiunea lacurilor. Lacul Salda, cu malurile lui albe și apa turcoaz, este un ocol scurt și o oprire foto foarte populară. Cu un vehicul privat decizi tu unde și cât timp te oprești - ceva ce un tur cu autocarul nu îți poate oferi."
      },
      {
        "type": "h2",
        "text": "Transfer privat la Pamukkale"
      },
      {
        "type": "p",
        "text": "Oferim transferuri private de la Aeroportul Antalya și de la hotelurile de pe coastă la Pamukkale, dus sau cu întoarcere la o dată ulterioară. Prețul este fix pe vehicul, așa că pentru o familie sau un grup mic este adesea comparabil cu mai multe bilete de tur cu autocarul - fără preluări de la hoteluri, fără program fix și fără opriri la magazine."
      }
    ],
    "faq": [
      [
        "Cât de departe este Pamukkale de Antalya?",
        "Aproximativ 245 km pe șosea. Drumul durează de obicei trei - trei ore și jumătate pe sens."
      ],
      [
        "Se poate vizita Pamukkale într-o excursie de o zi din Antalya?",
        "Da, dar înseamnă 6-7 ore pe drum într-o singură zi. O noapte de cazare în Pamukkale sau Karahayıt face vizita mai relaxată și îți permite să vezi terasele fără aglomerație."
      ],
      [
        "Se poate înota la Pamukkale?",
        "Poți merge desculț prin bazinele puțin adânci de pe travertine. Înotul este posibil în Piscina Antică, cu apă termală caldă, pentru care este nevoie de bilet separat."
      ],
      [
        "Care este cea mai bună perioadă a anului pentru Pamukkale?",
        "Primăvara și toamna sunt cele mai confortabile. Iarna este liniștită și plină de atmosferă; vara e bine să mergi dimineața devreme sau după-amiaza târziu."
      ]
    ]
  },
  "demre-myra-st-nicholas": {
    "slug": "demre-myra-biserica-sfantul-nicolae",
    "title": "Demre și Myra: vizită la Biserica Sfântului Nicolae din Antalya",
    "heading": "Demre, Myra și Biserica Sfântului Nicolae",
    "description": "Excursie din Antalya la Demre, vechea Myra: Biserica Sfântului Nicolae, mormintele liciene în stâncă, Andriake și Kekova, cu durata drumului și sfaturi pentru iarnă și Crăciun.",
    "excerpt": "Orașul adevăratului Moș Crăciun este la două ore și jumătate de Antalya. Ce să vezi în Demre și Myra și cum să transformi drumul într-o zi pe coastă.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Cu mult înainte să devină Moș Crăciun, Sfântul Nicolae a fost episcop al Myrei, un oraș lician de pe coasta de la vest de Antalya. Astăzi orașul se numește Demre, iar Biserica Sfântului Nicolae, unde a slujit, mormintele liciene săpate în stâncă și portul antic fac din el una dintre cele mai frumoase excursii de o zi din Antalya - mai ales în decembrie."
      },
      {
        "type": "h2",
        "text": "Cine a fost Sfântul Nicolae din Myra?"
      },
      {
        "type": "p",
        "text": "Nicolae a trăit în secolul al IV-lea și a devenit cunoscut pentru faptele sale de generozitate făcute în taină, mai ales față de copii și săraci. Ziua lui, 6 decembrie, este sărbătorită și astăzi în toată Europa, iar legendele despre el au crescut de-a lungul secolelor până la figura lui Moș Crăciun. Myra, unde a fost episcop, a devenit un important loc de pelerinaj."
      },
      {
        "type": "h2",
        "text": "Ce să vezi în Demre"
      },
      {
        "type": "ul",
        "items": [
          "Biserica Sfântului Nicolae: o biserică bizantină cu fresce, pardoseli din mozaic și sarcofagul asociat prin tradiție cu sfântul.",
          "Mormintele în stâncă de la Myra: morminte liciene în formă de casă, săpate în faleză deasupra unui mare teatru roman.",
          "Andriake: portul antic al Myrei, cu un grânar restaurat care găzduiește Muzeul Civilizațiilor Liciene.",
          "Kekova: excursiile cu barca din apropiatul Üçağız trec pe lângă orașul antic parțial scufundat și satul cu cetate Kaleköy (iarna circulă mai puține bărci)."
        ]
      },
      {
        "type": "h2",
        "text": "Cum ajungi: drumul de coastă spre vest"
      },
      {
        "type": "p",
        "text": "Demre este la aproximativ două ore și jumătate de Antalya, pe unul dintre cele mai frumoase drumuri de coastă din țară, trecând prin Kemer, pe lângă munții din jurul Olympos, prin Kumluca și Finike. Drumul este bun tot anul, dar șerpuiește prin munți, așa că lasă-ți timp pentru opriri și nu planifica excursia în grabă."
      },
      {
        "type": "h2",
        "text": "O zi pe coastă"
      },
      {
        "type": "ul",
        "items": [
          "Dimineața: pleci devreme din Antalya și te oprești pentru o priveliște asupra coastei lângă Olympos.",
          "Spre prânz: Biserica Sfântului Nicolae, înainte să sosească grupurile de turiști.",
          "La prânz: mormintele în stâncă și teatrul din Myra, apoi masa în Demre sau la Andriake.",
          "După-amiaza: o excursie cu barca la Kekova în sezon sau continui spre Kaş și rămâi peste noapte.",
          "Seara: întoarcere în Antalya sau combini excursia cu câteva zile în Kaş."
        ]
      },
      {
        "type": "h2",
        "text": "Vizita iarna și de Crăciun"
      },
      {
        "type": "p",
        "text": "Decembrie este o perioadă cu o atmosferă deosebită: pe 6 decembrie este ziua Sfântului Nicolae, iar în preajma Crăciunului mulți vizitatori combină un sejur în Antalya cu o excursie în orașul sfântului. Zilele de iarnă sunt blânde, dar scurte, așa că pleacă devreme. Obiectivele sunt deschise tot anul, în timp ce excursiile cu barca la Kekova depind de vreme și de sezon."
      },
      {
        "type": "h2",
        "text": "Transfer privat la Demre"
      },
      {
        "type": "p",
        "text": "Oferim transferuri private din Antalya și din stațiunile de pe coasta de vest spre Kumluca, Demre și Kaş. Cu un vehicul privat alegi tu opririle și ritmul, iar prețul este fix pe vehicul, nu pe persoană. La rezervare spune-ne hotelul, data și dacă vrei întoarcerea în aceeași zi."
      }
    ],
    "faq": [
      [
        "Cât de departe este Demre de Antalya?",
        "Demre, vechea Myra, se află la aproximativ două ore și jumătate de Antalya pe drumul de coastă, prin Kemer, Kumluca și Finike."
      ],
      [
        "Biserica Sfântului Nicolae este deschisă tot anul?",
        "Da. Biserica Sfântului Nicolae și situl antic Myra sunt deschise vizitatorilor pe tot parcursul anului."
      ],
      [
        "Când este ziua Sfântului Nicolae?",
        "Sărbătoarea Sfântului Nicolae este pe 6 decembrie. Decembrie, inclusiv perioada Crăciunului, este o perioadă populară pentru a vizita Demre."
      ],
      [
        "Pot vizita Demre și Kekova într-o singură zi?",
        "Da, în sezonul bărcilor este posibil dacă pleci devreme. Iarna circulă mai puține bărci, așa că verifică vremea și programul la fața locului."
      ]
    ]
  },
  "lycian-way-spring-hiking": {
    "slug": "drumul-lician-drumetii-langa-antalya",
    "title": "Drumul Lician lângă Antalya: ghid de primăvară pentru cele mai frumoase etape",
    "heading": "Drumeții pe Drumul Lician din Antalya",
    "description": "Drumeții pe Drumul Lician lângă Antalya: cel mai bun sezon, etapele din jurul Kemer, Olympos, Adrasan și Kaş, ce să iei în rucsac și cum ajungi la începutul traseului.",
    "excerpt": "Ruine antice, păduri de pin și priveliști spre mare pe unul dintre marile trasee lungi ale lumii. Ce etape să parcurgi din Antalya și când să mergi.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Drumul Lician (Likya Yolu) este un traseu marcat de peste 500 km între Fethiye și Antalya, care urmează poteci vechi, drumuri de catâri și drumuri romane de-a lungul coastei și prin munții vechii Licii. Nu ai nevoie de săptămâni ca să te bucuri de el: multe dintre cele mai frumoase etape sunt la îndemână din Antalya și sunt excelente pentru drumeții de o zi sau vacanțe scurte de drumeție."
      },
      {
        "type": "h2",
        "text": "Când să mergi: primăvara și toamna"
      },
      {
        "type": "table",
        "head": [
          "Sezon",
          "Condiții",
          "Verdict"
        ],
        "rows": [
          [
            "Martie - mai",
            "Zile blânde, dealuri verzi, flori sălbatice, izvoare pline de apă",
            "Cel mai bun sezon"
          ],
          [
            "Iunie - august",
            "Foarte cald, puțină umbră pe multe etape, izvoare secate",
            "Doar dimineața devreme sau trasee scurte"
          ],
          [
            "Septembrie - noiembrie",
            "Mare caldă, vreme stabilă, mai răcoare de la sfârșitul lui octombrie",
            "Al doilea cel mai bun sezon"
          ],
          [
            "Decembrie - februarie",
            "Blând pe coastă, perioade ploioase, zăpadă pe trecătorile înalte",
            "Posibil pe etapele joase de coastă"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Etape lângă Antalya"
      },
      {
        "type": "ul",
        "items": [
          "Göynük - zona Kemer: poteci prin pădure și priveliști spre canion, aproape de stațiunile din Kemer.",
          "Çıralı și Olympos: o etapă de coastă între ruinele din Olympos și flăcările veșnice ale Chimerei.",
          "Adrasan - Olympos: una dintre cele mai spectaculoase porțiuni, cu faleze, golfulețe și priveliști largi asupra mării.",
          "În jurul Kaş: poteci de coastă cu morminte liciene, golfuri mici și insula grecească Meis (Kastellorizo) în larg.",
          "Phaselis: plimbări mai scurte în jurul orașului antic și al celor trei porturi ale sale, ideale pentru un prim contact."
        ]
      },
      {
        "type": "h2",
        "text": "Cum îți planifici drumeția"
      },
      {
        "type": "p",
        "text": "Traseul este marcat cu roșu și alb, dar unele porțiuni sunt accidentate, stâncoase și abrupte, iar marcajele pot lipsi pe alocuri. Folosește o hartă bună sau un track GPS, mergi în doi când se poate și spune cuiva traseul tău. Pe multe etape nu există magazine sau apă între sate, așa că pornește devreme și ia mai multă apă decât crezi că îți trebuie."
      },
      {
        "type": "h2",
        "text": "Ce să iei în rucsac"
      },
      {
        "type": "ul",
        "items": [
          "Bocanci sau pantofi de trail solizi - calcarul este ascuțit și instabil pe alocuri.",
          "Cel puțin doi litri de apă de persoană, plus gustări.",
          "Pălărie de soare, cremă de protecție solară și un strat subțire cu mânecă lungă, chiar și primăvara.",
          "O geacă de vânt sau de ploaie pentru porțiunile montane și vremea schimbătoare de primăvară.",
          "O trusă mică de prim ajutor și un telefon încărcat cu o hartă offline."
        ]
      },
      {
        "type": "h2",
        "text": "Cum ajungi la traseu și înapoi"
      },
      {
        "type": "p",
        "text": "Majoritatea etapelor încep și se termină în sate greu accesibile cu transportul public, iar un traseu liniar înseamnă că ajungi în alt loc decât cel din care ai plecat. Un transfer privat te duce de la Aeroportul Antalya sau de la hotel la începutul etapei și te poate prelua la final. Prețul este fix pe vehicul, așa că funcționează bine pentru grupuri de drumeți; spune-ne punctele de start și de final, data și numărul de persoane, iar noi îți trimitem oferta în avans."
      }
    ],
    "faq": [
      [
        "Cât de lung este Drumul Lician?",
        "Traseul marcat are peste 500 km între Fethiye și Antalya. Majoritatea vizitatorilor parcurg doar anumite etape, nu întregul traseu."
      ],
      [
        "Care este cea mai bună perioadă pentru drumeții pe Drumul Lician?",
        "Primăvara, din martie până în mai, este cel mai bun sezon, urmată de toamnă, din septembrie până în noiembrie. Vara este foarte cald și multe izvoare seacă."
      ],
      [
        "Ce etape ale Drumului Lician sunt cele mai apropiate de Antalya?",
        "Porțiunile din jurul Göynük și Kemer, Çıralı și Olympos, Adrasan și Phaselis sunt toate la aproximativ una - două ore de Antalya. Etapele din jurul Kaş sunt mai spre vest."
      ],
      [
        "Puteți organiza un transfer până la începutul unei etape a Drumului Lician?",
        "Da. Trimite-ne punctele de start și de final și data, iar noi îți facem o ofertă pentru un transfer privat la preț fix pe vehicul, inclusiv preluarea de la finalul drumeției."
      ]
    ]
  },
  "koprulu-canyon-rafting": {
    "slug": "rafting-canionul-koprulu-antalya",
    "title": "Rafting în Canionul Köprülü: ghid practic din Antalya și Side",
    "heading": "Rafting în Canionul Köprülü",
    "description": "Rafting în Canionul Köprülü lângă Antalya: când ține sezonul, cum e râul, cui i se potrivește, ce să iei cu tine și cât de departe e de Side, Belek, Alanya și Antalya.",
    "excerpt": "Apă verde și rece, un pod roman și un canion acoperit de pini. La ce să te aștepți la o zi de rafting în Canionul Köprülü și cum o planifici de pe litoral.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Rafting-ul în Canionul Köprülü este cea mai cunoscută excursie de acest fel din zona Antalya. Canionul este un parc național în Munții Taurus, la nord de Side și Manavgat, iar râul care îl străbate oferă o aventură relaxată, nu una extremă: majoritatea rapidurilor sunt blânde, peisajul este spectaculos, iar începătorii și familiile participă în fiecare zi a sezonului."
      },
      {
        "type": "h2",
        "text": "Cum arată o tură de rafting"
      },
      {
        "type": "p",
        "text": "Majoritatea turelor parcurg o porțiune de aproximativ o duzină de kilometri din râul Köprüçay și petrec două-trei ore pe apă, cu opriri pentru înot, sărituri de pe stânci sau pur și simplu plutit. Rapidurile sunt în mare parte ușoare spre moderate, apa este limpede și verde și rece tot anul, pentru că râul este alimentat de izvoare de munte. Ghizii țin un instructaj de siguranță, iar căștile și vestele de salvare sunt asigurate."
      },
      {
        "type": "h2",
        "text": "Când să mergi"
      },
      {
        "type": "table",
        "head": [
          "Perioadă",
          "Râul și vremea",
          "Potrivit pentru"
        ],
        "rows": [
          [
            "Aprilie - mai",
            "Mai multă apă din topirea zăpezii, rapiduri mai vii, aer blând",
            "Grupuri active, mai puțină aglomerație"
          ],
          [
            "Iunie - august",
            "Aer fierbinte, apă rece, cele mai aglomerate luni",
            "Răcorire într-o zi toridă"
          ],
          [
            "Septembrie - octombrie",
            "Apă mai liniștită, zile calde, mai puțini oameni",
            "Familii și începători"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Sezonul ține de obicei cam din aprilie până în octombrie, în funcție de râu și de operatori. În afara acestei perioade, turele sunt rare sau nu se organizează deloc."
      },
      {
        "type": "h2",
        "text": "Cui i se potrivește"
      },
      {
        "type": "ul",
        "items": [
          "Începătorilor: nu e nevoie de experiență, iar ghidul conduce barca.",
          "Familiilor: operatorii stabilesc o vârstă minimă pentru copii, așa că verifică-o la rezervare.",
          "Grupurilor de prieteni și colegi: o barcă este de obicei împărțită de șase până la opt persoane.",
          "Nu e ideal pentru cei care nu știu să înoate și se tem de apă sau în timpul sarcinii."
        ]
      },
      {
        "type": "h2",
        "text": "Ce să iei cu tine"
      },
      {
        "type": "ul",
        "items": [
          "Costum de baie purtat pe sub haine și un prosop.",
          "Încălțăminte care se poate uda și rămâne bine pe picior - nu șlapi.",
          "Cremă de protecție solară și un set de haine uscate de schimb pentru drumul înapoi.",
          "O pungă sau o husă impermeabilă pentru telefon; lasă obiectele de valoare la hotel."
        ]
      },
      {
        "type": "h2",
        "text": "Mai mult decât rafting: parcul național"
      },
      {
        "type": "p",
        "text": "Canionul este traversat de Podul Oluk, un pod roman cu o singură arcadă care dă numele zonei - köprü înseamnă „pod” în turcă. Mai sus pe munte se află ruinele orașului antic Selge, printre formațiuni stâncoase și sate. Cu un vehicul propriu poți combina rafting-ul cu o oprire la pod și un drum în sus, spre Selge."
      },
      {
        "type": "h2",
        "text": "Cum ajungi de pe litoral"
      },
      {
        "type": "p",
        "text": "Multe firme de rafting vând ture cu preluare comună de la hoteluri, ceea ce poate însemna o dimineață lungă în care se adună ceilalți turiști. Un vehicul privat din Side, Manavgat, Belek, Alanya sau Antalya pleacă atunci când vrei tu și îți permite să te oprești la pod sau în munți pe drum. Canionul este la aproximativ o oră de Side și Manavgat și mai departe de Antalya și Alanya; trimite-ne hotelul și data, iar noi îți oferim un preț fix pe vehicul."
      }
    ],
    "faq": [
      [
        "Este rafting-ul în Canionul Köprülü potrivit pentru începători?",
        "Da. Rapidurile sunt în mare parte ușoare spre moderate, nu e nevoie de experiență, iar un ghid conduce fiecare barcă după un instructaj de siguranță."
      ],
      [
        "Când este sezonul de rafting în Canionul Köprülü?",
        "De obicei cam din aprilie până în octombrie. Primăvara apa e mai vie din cauza topirii zăpezii; septembrie și octombrie sunt mai liniștite și mai puțin aglomerate."
      ],
      [
        "Cât de rece este apa?",
        "Rece tot anul, pentru că râul este alimentat de izvoare de munte. Într-o zi fierbinte de vară, tocmai asta face parte din farmec."
      ],
      [
        "Cât de departe este Canionul Köprülü de Side?",
        "Aproximativ o oră cu mașina din Side și Manavgat și mai mult din Antalya, Belek sau Alanya, în funcție de hotel."
      ]
    ]
  },
  "kas-kalkan-autumn": {
    "slug": "kas-si-kalkan-toamna",
    "title": "Kaş și Kalkan toamna: scufundări, plaje și golfuri liniștite",
    "heading": "Kaş și Kalkan toamna",
    "description": "De ce Kaş și Kalkan arată cel mai bine toamna: mare caldă, scufundări, plajele Kaputaş și Patara, Kekova cu caiacul și cu barca și cum ajungi din Aeroportul Antalya.",
    "excerpt": "Cea mai caldă mare a anului, plaje goale și două mici orașe-port la poalele munților. De ce extremitatea vestică a coastei Antalya strălucește în octombrie.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Kaş și Kalkan toamna sunt la apogeu. Cele două orașe se află la capătul vestic, sălbatic, al coastei Antalya, unde munții coboară direct în mare. Niciunul nu are stațiuni mari; ambele au porturi mici, străduțe văruite și una dintre cele mai limpezi ape din Mediterana. Toamna, după plecarea turiștilor de vară și cu marea încă caldă, își arată cea mai bună față."
      },
      {
        "type": "h2",
        "text": "De ce toamna este sezonul aici"
      },
      {
        "type": "ul",
        "items": [
          "Marea rămâne caldă până în octombrie, adesea mai caldă decât în iunie.",
          "Vizibilitatea sub apă este excelentă - o veste bună pentru scafandri și amatorii de snorkeling.",
          "Plimbările și drumețiile devin din nou plăcute după căldura verii.",
          "Restaurantele și excursiile cu barca funcționează în continuare, dar fără aglomerația verii."
        ]
      },
      {
        "type": "h2",
        "text": "Kaş: scufundări, caiac și portul"
      },
      {
        "type": "p",
        "text": "Kaş este unul dintre cele mai cunoscute centre de scufundări din Türkiye, cu locuri pentru începători și scafandri experimentați, inclusiv epave, pereți și peșteri subacvatice. Caiacul pe mare deasupra ruinelor scufundate de la Kekova este un punct culminant, iar portul, teatrul antic cu fața spre mare și mormintele liciene din oraș fac serile ușoare. Într-o zi senină, insula grecească Meis se vede chiar în largul coastei."
      },
      {
        "type": "h2",
        "text": "Kalkan: terase și seri liniștite"
      },
      {
        "type": "p",
        "text": "Kalkan, la aproximativ o jumătate de oră vest de Kaş, este mai mic și mai liniștit, construit pe un deal în jurul unui port mic. Este cunoscut pentru vilele cu terase cu vedere la mare și pentru restaurantele de pe acoperișuri. Se potrivește cuplurilor și familiilor care vor o bază liniștită, cu mâncare bună, mai degrabă decât viață de noapte."
      },
      {
        "type": "h2",
        "text": "Plaje între orașe și dincolo de ele"
      },
      {
        "type": "ul",
        "items": [
          "Kaputaş: un mic golf turcoaz la poalele unui defileu, între Kaş și Kalkan.",
          "Patara: una dintre cele mai lungi plaje cu nisip din Türkiye, lângă ruinele anticei Patara și o zonă protejată.",
          "Peninsula Kaş și platformele de înot ale orașului: țărmuri stâncoase și scări direct în apă adâncă și limpede.",
          "Kekova și Üçağız: excursii cu barca spre golfuri adăpostite și satul cu castel Kaleköy."
        ]
      },
      {
        "type": "h2",
        "text": "Ce se schimbă în noiembrie"
      },
      {
        "type": "p",
        "text": "Din noiembrie sezonul se încheie treptat: unele hoteluri, restaurante și excursii cu barca se închid, vin primele ploi, iar serile devin răcoroase. Kaş rămâne animat tot anul, pentru că mulți oameni locuiesc acolo permanent, în timp ce Kalkan devine foarte liniștit. Verifică datele de funcționare dacă mergi la sfârșitul sezonului."
      },
      {
        "type": "h2",
        "text": "Cum ajungi din Aeroportul Antalya"
      },
      {
        "type": "p",
        "text": "Kaş se află la aproximativ 185 km de Aeroportul Antalya, cam două ore și jumătate - trei ore pe drumul de coastă prin Kemer, Kumluca și Demre, iar Kalkan este cu aproximativ o jumătate de oră mai departe. Unii călători aterizează în schimb la Dalaman, în funcție de zboruri. Oferim transferuri private din ambele aeroporturi la un preț fix pe vehicul, cu opriri pentru fotografii pe unul dintre cele mai pitorești drumuri din țară."
      }
    ],
    "faq": [
      [
        "Este marea caldă în Kaş în octombrie?",
        "Da. Marea rămâne de obicei caldă până târziu în octombrie, adesea mai caldă decât la începutul verii, iar vizibilitatea pentru scufundări și snorkeling este excelentă."
      ],
      [
        "Cât de departe este Kaş de Aeroportul Antalya?",
        "Aproximativ 185 km, cam două ore și jumătate - trei ore cu mașina. Kalkan este cu aproximativ o jumătate de oră mai spre vest."
      ],
      [
        "Kaş sau Kalkan: care e mai bun?",
        "Kaş este mai animat, cu scufundări, caiac și viață de oraș tot anul. Kalkan este mai mic și mai liniștit, cu vile și restaurante cu vedere la mare."
      ],
      [
        "Sunt deschise Kaş și Kalkan în noiembrie?",
        "Kaş rămâne activ tot anul. În Kalkan și la unele hoteluri și firme de excursii cu barca, sezonul se încheie la sfârșitul lui octombrie sau în noiembrie, așa că verifică datele de funcționare."
      ]
    ]
  },
  "medical-travel-antalya-winter": {
    "slug": "turism-medical-antalya-iarna",
    "title": "Turism medical în Antalya iarna: ce trebuie să știi înainte de plecare",
    "heading": "Turism medical și stomatologic în Antalya iarna",
    "description": "Planifici un tratament stomatologic, un transplant de păr sau o procedură estetică în Antalya iarna? De ce mulți aleg extrasezonul, cum verifici clinica, zilele de recuperare și transferul.",
    "excerpt": "Vreme mai răcoroasă, hoteluri mai liniștite și programări mai ușoare. Ce trebuie să verifice și să planifice cei care vin iarna în Antalya pentru tratament.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Turismul medical în Antalya iarna câștigă tot mai mult teren: alături de Istanbul, Antalya a devenit unul dintre centrele Türkiye pentru turism medical și tratamente dentare. Tot mai mulți vizitatori își planifică lucrări stomatologice, transplant de păr sau proceduri estetice în lunile de iarnă, când litoralul este liniștit și vremea blândă. Acest ghid acoperă partea practică a unei astfel de călătorii - nu reprezintă un sfat medical, iar orice decizie clinică aparține unui medic calificat."
      },
      {
        "type": "h2",
        "text": "De ce mulți călători aleg iarna"
      },
      {
        "type": "ul",
        "items": [
          "Vreme blândă și mai răcoroasă: mulți pacienți consideră recuperarea mai confortabilă departe de căldura verii și de soarele puternic.",
          "Hotelurile și apartamentele sunt mai liniștite și adesea mai ieftine decât vara.",
          "Programările pot fi mai ușor de obținut în afara lunilor de vârf ale vacanțelor.",
          "Călătoria poate fi combinată cu orașul, muzeele și plimbări ușoare, în loc de zile la plajă."
        ]
      },
      {
        "type": "h2",
        "text": "Alegerea și verificarea clinicii"
      },
      {
        "type": "p",
        "text": "Cea mai importantă decizie este furnizorul, nu prețul. Verifică dacă clinica sau spitalul este autorizat de Ministerul Sănătății din Turcia, află cine este medicul care te tratează și ce calificări are și cere un plan scris care să precizeze ce este inclus, ce nu este inclus și cum sunt gestionate complicațiile și controalele ulterioare. Fii atent la ofertele care promit un rezultat final sau un preț fix înainte de orice examinare."
      },
      {
        "type": "h2",
        "text": "Planificarea zilelor"
      },
      {
        "type": "table",
        "head": [
          "Tip de tratament",
          "Aspect tipic de planificare",
          "Întreabă furnizorul"
        ],
        "rows": [
          [
            "Tratament stomatologic",
            "Adesea mai multe vizite, uneori la distanță de săptămâni sau luni",
            "Câte călătorii și câte zile fiecare?"
          ],
          [
            "Transplant de păr",
            "Ședere scurtă, cu instrucțiuni de îngrijire pentru primele zile",
            "Când poți zbura, te poți spăla pe cap și purta o căciulă?"
          ],
          [
            "Chirurgie estetică",
            "Ședere mai lungă și zile de recuperare înainte de zborul spre casă",
            "Câte nopți trebuie să treacă înainte de a avea voie să zbori?"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Include zile de odihnă în plan, evită să programezi tratamentul în ziua sosirii și urmează sfatul medicului privind momentul în care poți zbura în siguranță. Pentru intervențiile chirurgicale se recomandă adesea să călătorești cu un însoțitor."
      },
      {
        "type": "h2",
        "text": "Asigurare, documente și controale"
      },
      {
        "type": "ul",
        "items": [
          "Verifică dacă asigurarea de călătorie acoperă un tratament planificat în străinătate - multe polițe nu îl acoperă.",
          "Păstrează copii după toate rapoartele medicale, rețetele și planul de tratament.",
          "Întreabă cum se desfășoară controalele după ce ajungi acasă și dacă medicul tău de acasă poate fi implicat.",
          "Împărtășește informațiile medicale doar cu furnizorul, prin canalul indicat de acesta."
        ]
      },
      {
        "type": "h2",
        "text": "De la aeroport la hotel sau la clinică"
      },
      {
        "type": "p",
        "text": "După un zbor și înainte sau după tratament, ultimul lucru de care ai nevoie este o coadă la taxi sau un microbuz comun care oprește la o duzină de hoteluri. Un transfer privat te duce direct de la Aeroportul Antalya la hotel sau la clinică, cu șoferul care îți urmărește zborul și te ajută cu bagajele. Drumurile de întoarcere pot fi programate în funcție de programări și de zborul spre casă. Prețul este fix pe vehicul, așa că un însoțitor călătorește fără cost suplimentar."
      }
    ],
    "faq": [
      [
        "De ce să mergi iarna în Antalya pentru tratament?",
        "Mulți călători preferă vremea mai blândă pentru recuperare, hotelurile mai liniștite și programările mai ușoare în afara sezonului de vacanță de vară."
      ],
      [
        "Cum verific o clinică din Antalya?",
        "Verifică dacă este autorizată de Ministerul Sănătății din Turcia, află cine este medicul care te tratează și cere un plan scris care acoperă ce este inclus, ce nu, complicațiile și controalele ulterioare."
      ],
      [
        "Cât timp ar trebui să rămân după o procedură?",
        "Depinde în întregime de tratament și de sfatul medicului. Întreabă furnizorul de câte nopți ai nevoie înainte de zborul spre casă și planifică zile de odihnă."
      ],
      [
        "Mă puteți duce de la aeroport la clinică?",
        "Da. Oferim transferuri private de la Aeroportul Antalya la hoteluri și clinici și înapoi, la un preț fix pe vehicul."
      ]
    ]
  },
  "side-ancient-city-guide": {
    "slug": "side-orasul-antic-ghid",
    "title": "Orașul antic Side: ghid pentru Templul lui Apollo, teatru și orașul vechi",
    "heading": "Side: ghid al orașului antic",
    "description": "Vizită în orașul antic Side: Templul lui Apollo, marele teatru, muzeul, zidurile și orașul vechi, când să mergi și excursii de o zi la Aspendos și cascada Manavgat.",
    "excerpt": "Un teatru roman, coloane de templu pe malul apei și un oraș-port construit între zidurile antice. Cum vezi Side în cea mai bună formă - în afara sezonului.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Orașul antic Side este unul dintre puținele locuri de pe Riviera Turcească unde un oraș modern trăiește în interiorul unuia antic. Orașul vechi ocupă o mică peninsulă înconjurată de ruine romane și elenistice: treci pe lângă coloane ca să ajungi la un restaurant, iar apusul este încadrat de un templu. Side arată cel mai bine în afara verii, când e suficient de liniștit ca să simți istoria."
      },
      {
        "type": "h2",
        "text": "Principalele obiective"
      },
      {
        "type": "ul",
        "items": [
          "Templul lui Apollo: coloanele se înalță în vârful peninsulei, chiar lângă mare - locul clasic pentru apus.",
          "Marele teatru: unul dintre cele mai mari teatre antice din regiune, construit în pantă la intrarea în orașul vechi.",
          "Muzeul Side: găzduit într-o baie romană restaurată, cu statui și reliefuri descoperite în oraș.",
          "Strada cu colonade și agora: axa principală antică, ce duce de la poarta orașului spre port.",
          "Zidurile orașului și poarta monumentală: drumul de intrare folosit de vizitatori de două mii de ani."
        ]
      },
      {
        "type": "h2",
        "text": "Orașul vechi astăzi"
      },
      {
        "type": "p",
        "text": "În interiorul zidurilor, străduțe cu restaurante, cafenele și magazine mici coboară spre port, de unde pleacă bărci în excursii de-a lungul coastei. Mașinile nu au acces în cea mai mare parte a orașului vechi, așa că este plăcut de explorat pe jos. Plaje largi cu nisip se întind la est și la vest de peninsulă."
      },
      {
        "type": "h2",
        "text": "Când să vizitezi"
      },
      {
        "type": "p",
        "text": "Primăvara și toamna sunt ideale: suficient de cald pentru plajă, suficient de răcoros ca să te plimbi printre ruine la mijlocul zilei. Iarna multe hoteluri sezoniere se închid, dar orașul vechi, ruinele și muzeul rămân deschise, iar într-o zi însorită templul și portul sunt aproape goale. În iulie și august vizitează ruinele dimineața devreme sau la apus."
      },
      {
        "type": "h2",
        "text": "Excursii de o zi din Side"
      },
      {
        "type": "table",
        "head": [
          "Destinație",
          "De ce merită",
          "Timp aproximativ din Side"
        ],
        "rows": [
          [
            "Aspendos",
            "Unul dintre cele mai bine păstrate teatre romane din lume",
            "aproximativ 40 de minute"
          ],
          [
            "Cascada Manavgat",
            "O cascadă lată și joasă într-un parc verde",
            "aproximativ 15 minute"
          ],
          [
            "Perge",
            "Un mare oraș antic cu stadion și străzi cu colonade",
            "aproximativ 1 oră"
          ],
          [
            "Canionul Köprülü",
            "Rafting și un pod roman într-un parc național",
            "aproximativ 1 oră"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Cum ajungi la Side din Aeroportul Antalya"
      },
      {
        "type": "p",
        "text": "Side se află la aproximativ 65 km de Aeroportul Antalya, cam 55-65 de minute cu mașina. Un transfer privat te duce direct la hotel sau la marginea orașului vechi pietonal, la un preț fix pe vehicul care nu se schimbă în funcție de sezon sau de ora zborului. Același vehicul poate fi rezervat pentru excursii de o zi la Aspendos, Perge sau canion."
      }
    ],
    "faq": [
      [
        "Ce poți vedea în orașul antic Side?",
        "Templul lui Apollo de lângă mare, marele teatru, muzeul dintr-o baie romană, strada cu colonade, agora și zidurile orașului - toate la distanță de mers pe jos de orașul vechi."
      ],
      [
        "Merită vizitat Side iarna?",
        "Da, pentru ruine și orașul vechi. Multe hoteluri sezoniere se închid, dar obiectivele rămân deschise și sunt mult mai liniștite decât vara."
      ],
      [
        "Cât de departe este Side de Aeroportul Antalya?",
        "Aproximativ 65 km, cam 55-65 de minute cu mașina."
      ],
      [
        "Pot vizita Aspendos din Side?",
        "Da. Aspendos este la aproximativ 40 de minute de Side cu mașina și se pretează la o excursie ușoară de jumătate de zi, adesea combinată cu Perge sau cascada Manavgat."
      ]
    ]
  },
  "alanya-in-winter": {
    "slug": "alanya-iarna",
    "title": "Alanya iarna: vremea, ce să faci și excursii de o zi",
    "heading": "Alanya iarna",
    "description": "Alanya din noiembrie până în martie: vremea și temperatura mării iarna, cetatea și telecabina, peșterile Damlataş și Dim, plimbări, piețe și drumul de la Aeroportul Antalya.",
    "excerpt": "Zile blânde, un deal al cetății aproape pustiu și un oraș care trăiește mai departe după ce pleacă mulțimile de vară. Cum e cu adevărat Alanya între noiembrie și martie.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Alanya este unul dintre puținele locuri de pe coasta Türkiye care nu se închid iarna. Zeci de mii de oameni locuiesc aici tot anul, mulți dintre ei din Scandinavia, Germania, Țările de Jos și Rusia, așa că magazinele, cafenelele, piețele și restaurantele rămân deschise. Pentru o scurtă vacanță de iarnă oferă ceva rar în Europa: soare, o faleză pe care o poți parcurge pe jos și o cetate medievală deasupra orașului, cu mult mai puțini oameni decât vara."
      },
      {
        "type": "h2",
        "text": "Vremea în Alanya iarna"
      },
      {
        "type": "table",
        "head": [
          "Luna",
          "Ziua, de obicei",
          "Noaptea, de obicei",
          "Marea"
        ],
        "rows": [
          [
            "Noiembrie",
            "20-22 °C",
            "11-13 °C",
            "aproximativ 21 °C"
          ],
          [
            "Decembrie",
            "17-19 °C",
            "8-10 °C",
            "aproximativ 19 °C"
          ],
          [
            "Ianuarie",
            "16-17 °C",
            "7-9 °C",
            "aproximativ 17 °C"
          ],
          [
            "Februarie",
            "16-18 °C",
            "7-9 °C",
            "aproximativ 17 °C"
          ],
          [
            "Martie",
            "18-20 °C",
            "9-11 °C",
            "aproximativ 17 °C"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Acestea sunt medii aproximative. Iarna ploaia vine în reprize - adesea o zi sau două de averse puternice, urmate de zile senine și însorite. Alanya este adăpostită de munții Taurus, care o fac puțin mai blândă decât o mare parte a coastei. Serile sunt răcoroase, iar casele și unele camere de hotel sunt reci, așa că ia cu tine un strat călduros."
      },
      {
        "type": "h2",
        "text": "Cetatea, telecabina și Turnul Roșu"
      },
      {
        "type": "p",
        "text": "Cetatea Alanya încoronează peninsula stâncoasă de deasupra orașului, cu ziduri, cisterne, o biserică bizantină și priveliști de-a lungul coastei în ambele direcții. Vara urcușul e greu; iarna e o plimbare plăcută. Dacă preferi, telecabina de lângă plaja Damlataş te duce sus în câteva minute. Jos, în port, Turnul Roșu (Kızıl Kule) din secolul al XIII-lea și vechiul șantier naval sunt la câțiva pași unul de altul."
      },
      {
        "type": "h2",
        "text": "Peșteri, râuri și plimbări"
      },
      {
        "type": "ul",
        "items": [
          "Peștera Damlataş: o peșteră mică cu stalactite la capătul plajei Damlataş, cunoscută pentru aerul umed și constant.",
          "Peștera Dim: o peșteră mai mare pe dealurile de la est de oraș, cu o pasarelă și un mic lac în interior.",
          "Râul Dim (Dim Çayı): restaurante cu platforme deasupra apei, mai liniștite iarna, unele deschise tot anul.",
          "Faleza: kilometri de traseu plat pentru mers pe jos și pe bicicletă de-a lungul plajelor Keykubat și Cleopatra.",
          "Plantații de banane și sate pe pantele din spatele orașului, unde fructele tropicale cresc în iarna blândă."
        ]
      },
      {
        "type": "h2",
        "text": "Înot, piețe și viața de zi cu zi"
      },
      {
        "type": "p",
        "text": "În zilele însorite din noiembrie, și chiar iarna, vei vedea oameni înotând pe plaja Cleopatra - marea e mai rece decât pare aerul, dar mulți vizitatori din nord o găsesc în regulă. Piețele săptămânale vând citrice, rodii, măsline și legume, iar centrul orașului e animat de localnici, nu de grupuri de turiști. Multe hoteluri au prețuri de iarnă pentru șederi lungi, iar o parte dintre resorturile de pe plajă rămân deschise, cu piscine interioare."
      },
      {
        "type": "h2",
        "text": "Excursii de o zi din Alanya iarna"
      },
      {
        "type": "p",
        "text": "Side și cascada Manavgat sunt la aproximativ o oră spre vest; Aspendos și Perge înseamnă o zi de excursie mai lungă, dar ușoară. În interior, satele din munții Taurus văd zăpadă în cele mai reci săptămâni, în timp ce coasta rămâne verde. Dacă stai săptămâni, nu zile, ghidul nostru separat despre iernatul pe coasta Antalyei tratează mai în detaliu șederile lungi."
      },
      {
        "type": "h2",
        "text": "Cum ajungi în Alanya de la Aeroportul Antalya"
      },
      {
        "type": "p",
        "text": "Alanya se află la aproximativ 125 km de Aeroportul Antalya, cam două ore de mers pe drumul de coastă, prin Side și Manavgat. Aeroportul Gazipaşa-Alanya este mai aproape, dar are mai puține zboruri, mai ales iarna, așa că majoritatea vizitatorilor aterizează în Antalya. Un transfer privat te duce până la ușa hotelului sau a apartamentului, la un preț fix pe vehicul, fără suprataxă de iarnă, de weekend sau de noapte - util când zborul aterizează seara târziu."
      }
    ],
    "faq": [
      [
        "Merită să vizitezi Alanya iarna?",
        "Da, dacă vrei vreme blândă, plimbări și un oraș viu, nu viață de plajă. Zilele sunt adesea însorite, în jur de 16-19 °C, iar cetatea și peșterile sunt plăcute fără căldura verii."
      ],
      [
        "Se poate înota în Alanya iarna?",
        "Unii o fac. Marea are aproximativ 17-19 °C în mijlocul iernii și e mai caldă în noiembrie. Mai degrabă te înviorează decât te încălzește, iar multe hoteluri au piscine interioare încălzite."
      ],
      [
        "Sunt deschise hotelurile și restaurantele din Alanya iarna?",
        "Multe, da. Alanya are o populație mare care locuiește aici tot anul, așa că centrul, piețele și multe restaurante rămân deschise. Unele resorturi mari sezoniere se închid din noiembrie până în martie."
      ],
      [
        "Cât de departe este Alanya de Aeroportul Antalya?",
        "Aproximativ 125 km, cam două ore cu mașina. Un transfer privat te duce direct la hotel, la un preț fix pe vehicul."
      ],
      [
        "Plouă mult în Alanya iarna?",
        "Decembrie-februarie sunt lunile cele mai ploioase, dar ploaia vine de obicei în reprize de o zi sau două, cu zile însorite între ele."
      ]
    ]
  },
  "tahtali-cable-car-olympos": {
    "slug": "telecabina-tahtali-olympos-chimera",
    "title": "Telecabina Tahtalı, Olympos și flăcările Chimerei din Kemer",
    "heading": "Telecabina Tahtalı, Olympos și Chimera",
    "description": "O zi lângă Kemer: telecabina Tahtalı până la 2.365 m, ruinele din Olympos, plaja Çıralı și flăcările Chimerei la apus - sezonul potrivit, ce să porți și cum ajungi.",
    "excerpt": "Un vârf de munte, un oraș lician într-o vale de râu și flăcări care ard din stâncă de mii de ani - totul la mai puțin de o oră de Kemer.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "La sud de Kemer, munții Taurus se ridică direct din mare. Într-o singură zi poți sta pe vârful muntelui Tahtalı, poți străbate ruinele din Olympos până la plajă și poți privi la apus flăcările Chimerei pâlpâind pe un versant. Toamna și primăvara sunt cele mai bune sezoane: aer limpede pentru priveliști, temperaturi plăcute pentru mers și fără cozile de vară."
      },
      {
        "type": "h2",
        "text": "Telecabina Tahtalı: de la mare la 2.365 m"
      },
      {
        "type": "p",
        "text": "Telecabina Olympos pornește din pădurea de pini de deasupra localității Tekirova și urcă pe vârful Tahtalı, înalt de aproximativ 2.365 m, în cam zece minute. De sus vezi toată coasta, de la Antalya la Kemer și Phaselis, iar în zilele senine mult spre interior. Pe vârf există o cafenea și terase panoramice. Biletele se cumpără de la stația de jos sau online; programul și prețurile se schimbă în funcție de sezon."
      },
      {
        "type": "h2",
        "text": "Când să mergi și ce să porți"
      },
      {
        "type": "ul",
        "items": [
          "Octombrie și noiembrie: aer limpede și cea mai bună vizibilitate din an, cu vreme blândă la nivelul mării.",
          "Decembrie-martie: zăpada pe vârf e frecventă - o priveliște impresionantă peste o coastă verde, dar sus îmbracă-te ca de iarnă.",
          "Aprilie și mai: zăpadă pe vârf și flori pe versanții de jos, adesea în aceeași priveliște.",
          "În orice anotimp, sus este cu 10-15 °C mai rece decât pe plajă. Ia o geacă, chiar și în octombrie.",
          "Telecabina se oprește pe vânt puternic sau furtună, așa că păstrează ziua flexibilă și verifică înainte de plecare."
        ]
      },
      {
        "type": "h2",
        "text": "Olympos: ruine într-o vale de râu"
      },
      {
        "type": "p",
        "text": "Orașul antic lician Olympos se află într-o vale îngustă și împădurită care se termină la o plajă cu pietriș. Morminte, un teatru, o baie și o biserică bizantină sunt risipite printre dafini și smochini, de-a lungul unui pârâu. Drumul pe jos de la intrare până la plajă durează aproximativ douăzeci de minute. Situl face parte dintr-o zonă protejată și are taxă de intrare; posesorii Museum Pass intră gratuit."
      },
      {
        "type": "h2",
        "text": "Çıralı și flăcările Chimerei"
      },
      {
        "type": "p",
        "text": "De cealaltă parte a plajei de la Olympos se află Çıralı, un sat liniștit cu livezi și mici pensiuni de-a lungul unei plaje lungi unde își depun ouăle țestoasele Caretta caretta. Deasupra, pe versantul Yanartaş, gazul natural iese din stâncă și arde de mii de ani - este Chimera antică din legenda greacă. O potecă cu trepte urcă în aproximativ 20-30 de minute până la flăcări. Sunt cele mai impresionante la apus, așa că ia o lanternă pentru coborâre."
      },
      {
        "type": "h2",
        "text": "Cum îți planifici ziua"
      },
      {
        "type": "table",
        "head": [
          "Oprire",
          "Din Kemer",
          "Timp necesar"
        ],
        "rows": [
          [
            "Telecabina Tahtalı (stația de jos)",
            "aproximativ 30 de minute",
            "1,5-2 ore"
          ],
          [
            "Ruinele și plaja din Olympos",
            "aproximativ 50 de minute",
            "2 ore"
          ],
          [
            "Çıralı și Chimera",
            "aproximativ 50 de minute",
            "1,5 ore, ideal la apus"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Duratele de drum sunt aproximative. O ordine bună: telecabina dimineața, când aerul e cel mai limpede, Olympos și prânzul în Çıralı după-amiaza, iar Chimera la apus. Din orașul Antalya adaugă cam o oră pe fiecare sens."
      },
      {
        "type": "h2",
        "text": "Cum ajungi acolo"
      },
      {
        "type": "p",
        "text": "Kemer se află la aproximativ 50 km de Aeroportul Antalya, iar Tekirova la aproximativ 75 km, pe drumul de coastă. Autobuzele publice nu ajung ușor la stația telecabinei sau la Chimera, de aceea mulți vizitatori merg cu șofer. Oferim transferuri private de la aeroport la Kemer, Tekirova și Kumluca la un preț fix pe vehicul și, la cerere, îți facem o ofertă pentru o zi cu șofer la telecabină, Olympos și Çıralı."
      }
    ],
    "faq": [
      [
        "Cât de sus urcă telecabina Tahtalı?",
        "Urcă pe vârful muntelui Tahtalı, la aproximativ 2.365 m, pornind de la stația de jos din pădurea de deasupra localității Tekirova. Urcarea durează în jur de zece minute."
      ],
      [
        "Este zăpadă pe Tahtalı iarna?",
        "Adesea, da - aproximativ din decembrie până în martie, uneori și în aprilie. Sus este întotdeauna mult mai frig decât pe coastă, așa că ia o geacă groasă."
      ],
      [
        "Când e cel mai bine să vezi flăcările Chimerei?",
        "La apus sau după lăsarea întunericului, când flăcările ies în evidență pe stâncă. Urcarea durează aproximativ 20-30 de minute; ia o lanternă pentru coborâre."
      ],
      [
        "Pot vizita Olympos și telecabina în aceeași zi?",
        "Da. Majoritatea urcă cu telecabina dimineața, vizitează Olympos și Çıralı după-amiaza și văd Chimera la apus."
      ],
      [
        "Cât de departe este Kemer de Aeroportul Antalya?",
        "Aproximativ 50 km, cam 40-50 de minute cu mașina. Tekirova, lângă telecabină, este la aproximativ 75 km."
      ]
    ]
  },
  "perge-aspendos-day-trip": {
    "slug": "perge-si-aspendos-excursie-din-antalya",
    "title": "Perge și Aspendos: excursie de jumătate de zi printre ruinele Antalyei",
    "heading": "Perge și Aspendos din Antalya",
    "description": "Vizită la Perge și Aspendos din Antalya, Belek sau Side: ce să vezi, sezonul potrivit, cât timp să aloci și cum combini cele două situri antice în jumătate de zi.",
    "excerpt": "O stradă romană cu colonade, un stadion pentru 12.000 de oameni și unul dintre cele mai bine păstrate teatre ale lumii antice, toate la mai puțin de o oră de aeroport.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Două dintre cele mai frumoase situri antice din Türkiye se află chiar lângă drumul principal dintre Antalya și Side. Perge a fost un mare oraș greco-roman pe câmpia Pamfiliei; Aspendos are un teatru roman atât de complet încât încă se țin spectacole în el. Împreună fac o excursie ușoară de jumătate de zi, iar între octombrie și aprilie, când soarele e blând, arată cel mai bine."
      },
      {
        "type": "h2",
        "text": "Perge: orașul coloanelor"
      },
      {
        "type": "p",
        "text": "Perge este la doar aproximativ 15 minute de Aeroportul Antalya. Intri prin poarta elenistică cu cele două turnuri rotunde și cobori pe o stradă lungă cu colonade, cu un canal de apă pe mijloc, până la agora, băi și dealul acropolei. Chiar în afara zidurilor se află un teatru mare și unul dintre cele mai bine păstrate stadioane ale Antichității. Multe dintre statuile din Perge sunt expuse la Muzeul din Antalya. Alocă aproximativ o oră și jumătate până la două ore."
      },
      {
        "type": "h2",
        "text": "Aspendos: teatrul care a supraviețuit"
      },
      {
        "type": "p",
        "text": "Aspendos, lângă Serik, este faimos pentru teatrul roman din secolul al II-lea d.Hr., care primea multe mii de spectatori și își păstrează încă clădirea scenei, galeriile și o acustică excelentă. În spatele lui, o potecă urcă spre orașul de sus și spre arcadele unui apeduct roman care traversează câmpia. La scurtă distanță cu mașina, podul selgiucid peste râul Köprüçay merită o oprire. Alocă aproximativ o oră până la o oră și jumătate."
      },
      {
        "type": "h2",
        "text": "Cel mai bun sezon pentru ruine"
      },
      {
        "type": "ul",
        "items": [
          "Octombrie și noiembrie: zile calde și uscate și o lumină blândă pentru fotografii.",
          "Decembrie-februarie: situri liniștite și vreme blândă între zilele ploioase - ia un strat impermeabil.",
          "Martie și aprilie: iarbă verde și flori sălbatice printre pietre, poate cea mai frumoasă perioadă.",
          "Iunie-septembrie: ambele situri au foarte puțină umbră, iar căldura de la prânz e intensă; vara mergi dimineața devreme."
        ]
      },
      {
        "type": "h2",
        "text": "Cum le combini în jumătate de zi"
      },
      {
        "type": "table",
        "head": [
          "Punct de plecare",
          "Până la Perge",
          "Perge - Aspendos",
          "Aspendos - înapoi"
        ],
        "rows": [
          [
            "Orașul Antalya / Lara",
            "aproximativ 25 de minute",
            "aproximativ 35 de minute",
            "aproximativ 45 de minute"
          ],
          [
            "Belek",
            "aproximativ 30 de minute",
            "aproximativ 35 de minute",
            "aproximativ 20 de minute"
          ],
          [
            "Side / Manavgat",
            "aproximativ 55 de minute",
            "aproximativ 35 de minute",
            "aproximativ 35 de minute"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Duratele de drum sunt aproximative. Să începi dimineața la Perge și să închei la Aspendos funcționează din oricare dintre aceste locuri. Ambele situri au taxă de intrare și acceptă Museum Pass. Poartă încălțăminte bună: terenul e din marmură și piatră denivelată, iar trepte sunt peste tot."
      },
      {
        "type": "h2",
        "text": "În drum spre sau de la aeroport"
      },
      {
        "type": "p",
        "text": "Pentru că Perge este atât de aproape de Aeroportul Antalya, iar Aspendos se află lângă drumul spre Belek și Side, cele două situri se potrivesc bine într-o zi de sosire sau de plecare cu zbor târziu. Un transfer privat poate opri la unul sau la ambele pe drum, cu bagajele în siguranță în vehicul. Cere o ofertă cu opriri când rezervi: prețul rămâne fix pe vehicul."
      }
    ],
    "faq": [
      [
        "Cât de departe este Perge de Aeroportul Antalya?",
        "Doar aproximativ 15 minute cu mașina. Este unul dintre cele mai ușor de vizitat situri antice într-o zi de sosire sau de plecare."
      ],
      [
        "Pot vizita Perge și Aspendos în aceeași zi?",
        "Ușor - jumătate de zi ajunge pentru amândouă. Alocă aproximativ două ore la Perge, cam o oră la Aspendos și în jur de 35 de minute pentru drumul dintre ele."
      ],
      [
        "Se mai folosește teatrul din Aspendos?",
        "Da. Teatrul roman este atât de bine păstrat încât în unele seri încă găzduiește concerte și spectacole, mai ales în lunile calde."
      ],
      [
        "Care este cea mai bună perioadă pentru Perge și Aspendos?",
        "Din octombrie până în aprilie. Niciunul dintre situri nu are multă umbră, așa că vara mergi dimineața devreme."
      ],
      [
        "Poate transferul să oprească la ruine cu bagajele mele?",
        "Da. Cere opririle când rezervi; bagajele rămân în vehicul, iar prețul rămâne fix pe vehicul."
      ]
    ]
  },
  "ramadan-bayram-antalya": {
    "slug": "ramadan-si-bayram-in-antalya",
    "title": "Ramadan și Bayram în Antalya: ce trebuie să știi ca turist",
    "heading": "Călătoria în Antalya în timpul Ramadanului și al Bayramului",
    "description": "Ce se schimbă în Antalya în Ramadan și în sărbătorile de Bayram: restaurante, serile de iftar, drumuri aglomerate, hoteluri și cum îți planifici transferul de la aeroport.",
    "excerpt": "În stațiuni, viața de zi cu zi aproape că nu se schimbă în Ramadan. Sărbătorile care urmează sunt altă poveste - iată la ce să te aștepți și cum să planifici.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Ramadanul și cele două sărbători de Bayram se mută prin calendar, cu aproximativ 11 zile mai devreme în fiecare an. În următoarele sezoane cad la sfârșitul iernii și primăvara: Ramadanul și Bayramul de la sfârșitul lui (Ramazan Bayramı) în jurul lunilor februarie și martie, iar Sărbătoarea Sacrificiului (Kurban Bayramı) în jurul lunii mai. Verifică datele exacte în calendarul oficial. Pentru vizitatori, luna de post în sine schimbă puțin pe coastă; sărbătorile sunt cele pe care trebuie să le iei în calcul."
      },
      {
        "type": "h2",
        "text": "Schimbă Ramadanul o vacanță în Antalya?"
      },
      {
        "type": "p",
        "text": "Foarte puțin. Hotelurile, restaurantele, cafenelele și magazinele din Antalya, Belek, Side, Kemer și Alanya sunt deschise ca de obicei în timpul zilei, iar alcool se servește în locurile care îl servesc în mod normal. Mulți oameni din Türkiye țin post, mulți nu, și nimeni nu se așteaptă ca vizitatorii să o facă. E doar politicos să nu mănânci sau să bei ostentativ în fața cuiva care ține vizibil post, mai ales în cartierele tradiționale și în sate."
      },
      {
        "type": "h2",
        "text": "Iftar: serile de Ramadan"
      },
      {
        "type": "ul",
        "items": [
          "La apus, postul se întrerupe cu iftarul, adesea o masă în comun cu supă, curmale, măsline și pâinea rotundă specială de Ramadan (pide), vândută doar în această lună.",
          "Multe restaurante au un meniu de iftar; mesele se umplu chiar înainte de apus, așa că rezervă dacă vrei să participi.",
          "În orașul vechi și în jurul moscheilor mari e seara o atmosferă de sărbătoare, cu familii care stau afară până târziu.",
          "Înainte de zori, în unele cartiere, un toboșar trece pe străzi ca să trezească oamenii pentru ultima masă (sahur) - parte din tradiție."
        ]
      },
      {
        "type": "h2",
        "text": "Sărbătorile de Bayram: când călătorește toată Türkiye"
      },
      {
        "type": "p",
        "text": "Ramazan Bayramı durează trei zile, iar Kurban Bayramı patru; guvernul le prelungește adesea într-o vacanță mai lungă. Milioane de oameni pleacă la familie sau pe litoral, așa că zborurile interne, autobuzele interurbane și hotelurile se umplu, iar drumurile spre Antalya sunt aglomerate în prima și în ultima zi. Băncile și instituțiile publice se închid, dar magazinele, restaurantele, muzeele și obiectivele turistice din stațiuni rămân de obicei deschise."
      },
      {
        "type": "h2",
        "text": "Cum îți planifici transferul în jurul sărbătorilor"
      },
      {
        "type": "ul",
        "items": [
          "Rezervă din timp dacă aterizezi la începutul unui Bayram: vehiculele și șoferii sunt foarte căutați.",
          "Lasă timp în plus pentru plecările din ultima zi a sărbătorii, când aeroportul și drumurile sunt cele mai aglomerate.",
          "În Ramadan, traficul e intens în ora dinaintea apusului și neobișnuit de liniștit în timpul iftarului.",
          "Trimite-ne numărul zborului: îl urmărim, așa că un zbor întârziat într-o zi aglomerată nu te lasă fără preluare."
        ]
      },
      {
        "type": "h2",
        "text": "Bine de știut"
      },
      {
        "type": "p",
        "text": "De sărbători, oamenii se salută cu „İyi bayramlar” (sărbători fericite), iar dulciurile se împart peste tot - e o perioadă caldă să fii în țară. Prețurile noastre nu se schimbă în Ramadan sau de Bayram: un singur preț fix pe vehicul, fără suprataxă de sărbătoare, de noapte sau de sezon."
      }
    ],
    "faq": [
      [
        "Sunt deschise restaurantele din Antalya în Ramadan?",
        "Da. În stațiuni și în orașul Antalya, restaurantele și cafenelele sunt deschise normal în timpul zilei. Seara se adaugă meniurile de iftar."
      ],
      [
        "Pot turiștii să bea alcool în Ramadan în Antalya?",
        "Da. Hotelurile, barurile și restaurantele care servesc în mod normal alcool continuă să îl servească și în Ramadan."
      ],
      [
        "Este aglomerat în Antalya de Bayram?",
        "Da. Multe familii turce călătoresc de Bayram, așa că hotelurile, zborurile și drumurile sunt mai aglomerate decât de obicei, mai ales în prima și în ultima zi."
      ],
      [
        "Când sunt Ramadanul și Bayramul anul viitor?",
        "Datele se mută cu aproximativ 11 zile mai devreme în fiecare an. În următoarele sezoane, Ramadanul și Ramazan Bayramı cad în jurul lunilor februarie-martie, iar Kurban Bayramı în jurul lunii mai; verifică datele exacte în calendarul oficial."
      ],
      [
        "Cresc prețurile transferurilor de Bayram?",
        "Nu la noi. Prețul este fix pe vehicul, fără suprataxă de sărbătoare, de noapte sau de sezon. Pentru datele de sărbătoare îți recomandăm să rezervi din timp."
      ]
    ]
  },
  "kaleici-old-town-guide": {
    "slug": "kaleici-orasul-vechi-antalya-ghid",
    "title": "Kaleiçi, orașul vechi din Antalya: ghid de plimbare în extrasezon",
    "heading": "Kaleiçi: orașul vechi din Antalya",
    "description": "Ghid de plimbare prin Kaleiçi, orașul vechi fortificat din Antalya: Poarta lui Hadrian, Minaretul Canelat, portul vechi, hoteluri boutique și de ce toamna-primăvara e ideal.",
    "excerpt": "Porți romane, case otomane și un port sub faleze. Inima veche a Antalyei se descoperă cel mai bine încet, în lunile în care orașul aparține locuitorilor săi.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Kaleiçi - literal „în interiorul cetății” - este centrul istoric al Antalyei, înconjurat de vechile ziduri ale orașului, deasupra unui port mic. Străduțele sunt mărginite de case otomane restaurate, multe devenite hoteluri boutique, cafenele și mici restaurante. Vara e cald și aglomerat; din octombrie până în aprilie arată cel mai bine, cu zile blânde, terase deschise în soare și timp să hoinărești."
      },
      {
        "type": "h2",
        "text": "O plimbare prin Kaleiçi"
      },
      {
        "type": "ul",
        "items": [
          "Poarta lui Hadrian: poarta romană cu trei arcade, construită pentru vizita împăratului în secolul al II-lea d.Hr., intrarea tradițională în orașul vechi.",
          "Turnul cu Ceas și piața Kalekapısı: punctul de întâlnire dintre orașul vechi și cel modern.",
          "Minaretul Canelat (Yivli Minare): simbolul selgiucid al Antalyei, vizibil din tot centrul.",
          "Turnul Hıdırlık: un turn roman rotund la marginea de sud, cu priveliști la apus peste golf și munți.",
          "Minaretul Frânt (Kesik Minare): o clădire care a fost de-a lungul secolelor templu, biserică și moschee.",
          "Portul vechi: bărci de pescari și de excursie sub faleze, la care ajungi pe străduțe sau cu un lift de sus."
        ]
      },
      {
        "type": "h2",
        "text": "Dincolo de ziduri"
      },
      {
        "type": "p",
        "text": "Parcul Karaalioğlu se întinde de-a lungul falezelor de la Turnul Hıdırlık, cu priveliști peste golf. Muzeul din Antalya, una dintre cele mai bogate colecții arheologice din Türkiye, se află la începutul plajei Konyaaltı și e ideal într-o zi ploioasă; verifică programul înainte să mergi. La est de oraș, cascadele Düden cad direct de pe faleze în mare, iar cascadele de sus se află într-un parc umbros."
      },
      {
        "type": "h2",
        "text": "De ce toamna până primăvara"
      },
      {
        "type": "table",
        "head": [
          "Sezon",
          "Ziua, de obicei",
          "În Kaleiçi"
        ],
        "rows": [
          [
            "Octombrie - noiembrie",
            "22-27 °C",
            "Seri calde, terase deschise, mai puțină lume"
          ],
          [
            "Decembrie - februarie",
            "15-18 °C",
            "Străduțe liniștite, cafenele în soare, câte o zi ploioasă"
          ],
          [
            "Martie - aprilie",
            "18-22 °C",
            "Portocali în floare, parcuri verzi, festivaluri în oraș"
          ],
          [
            "Iunie - august",
            "33-35 °C",
            "Foarte cald și aglomerat - cel mai bine dimineața devreme și seara"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Temperaturile sunt medii aproximative. Majoritatea restaurantelor, cafenelelor și hotelurilor boutique din Kaleiçi sunt deschise tot anul, pentru că orașul vechi trăiește din vizitatorii orașului și din localnici, nu doar din turismul de plajă."
      },
      {
        "type": "h2",
        "text": "Cazare în orașul vechi"
      },
      {
        "type": "p",
        "text": "Hotelurile din Kaleiçi sunt de obicei mici, amenajate în conace transformate, în jurul unei curți interioare sau al unei piscine mici. Multe străduțe sunt pietonale sau prea înguste pentru vehicule mari, așa că mașina oprește adesea la cea mai apropiată poartă sau piață, iar ultimii metri se fac pe jos. Spune-ne hotelul când rezervi; șoferii noștri știu care intrare e cea mai apropiată și te ajută cu bagajele."
      },
      {
        "type": "h2",
        "text": "Cum ajungi în Kaleiçi de la Aeroportul Antalya"
      },
      {
        "type": "p",
        "text": "Kaleiçi se află la aproximativ 15 km de Aeroportul Antalya, cam 20-30 de minute cu mașina. Și tramvaiul leagă aeroportul de centrul orașului, dar cu valize un transfer privat până la hotel e mai simplu, mai ales noaptea târziu. Prețul este fix pe vehicul, fără suprataxă de noapte."
      }
    ],
    "faq": [
      [
        "Ce este Kaleiçi în Antalya?",
        "Kaleiçi este orașul vechi istoric al Antalyei, înconjurat de ziduri deasupra portului vechi, cu case otomane, Poarta lui Hadrian, Minaretul Canelat și multe hoteluri boutique și cafenele."
      ],
      [
        "Cât de departe este Kaleiçi de Aeroportul Antalya?",
        "Aproximativ 15 km, cam 20-30 de minute cu mașina."
      ],
      [
        "Se poate intra cu mașina în Kaleiçi?",
        "Doar parțial. Multe străduțe sunt pietonale sau foarte înguste, așa că vehiculele opresc adesea la cea mai apropiată poartă sau piață. Șoferii noștri știu punctul de acces cel mai apropiat de fiecare hotel."
      ],
      [
        "Merită vizitat Kaleiçi iarna?",
        "Da. Majoritatea cafenelelor, restaurantelor și hotelurilor rămân deschise, străduțele sunt liniștite, iar zilele sunt de obicei blânde și însorite."
      ],
      [
        "Cât timp îmi trebuie pentru Kaleiçi?",
        "Jumătate de zi ajunge pentru o primă plimbare. Cu muzeul, Parcul Karaalioğlu și cascadele Düden, ideal e o zi sau două."
      ]
    ]
  }
};
