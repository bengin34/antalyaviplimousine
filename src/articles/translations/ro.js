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
};
