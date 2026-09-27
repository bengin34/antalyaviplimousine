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
  }
};
