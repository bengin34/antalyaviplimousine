import type { TransferLandingCopy } from "../transfer-landing-copy";

/**
 * Romanian charter traffic lands late in the evening, so the arrival wording
 * leads with the tracked flight and the waiting time rather than with the
 * destination description.
 *
 * Written by the team, not natively reviewed yet — flag any wording a Romanian
 * reader would phrase differently before the next content pass.
 */
export const ro: TransferLandingCopy = {
  heroHeading: (name) => `Aeroportul Antalya → ${name}: transfer privat`,
  heroCta: "Rezervă transferul",
  heroTrust: [
    "Până la 7 persoane",
    "Fără plată în avans",
    "Plata direct la șofer",
    "Preț total fix, fără taxe ascunse",
    "Scaun pentru copii gratuit la cerere",
    "Monitorizarea zborului inclusă",
  ],
  serviceHeading: (name) => `Transferul tău privat spre ${name}`,
  aboutHeading: (name) => `Destinația: ${name}`,
  ownGroup: (name) =>
    `Călătorești doar cu grupul tău, direct până la hotelul din ${name}. Fără autocar în comun, fără necunoscuți în mașină și fără ocoluri pe la alte hoteluri — prețul fix acoperă întregul vehicul.`,
  arrivalHeading: "Sosirea pe aeroportul din Antalya",
  arrivalBody:
    "După ce îți ridici bagajele, mergi spre zona Meet & Greet J / 777. Echipa noastră din aeroport găsește rezervarea și te conduce la șofer. Pentru că urmărim zborul, o întârziere mută preluarea fără costuri suplimentare.",
  returnHeading: "Transfer de întoarcere",
  returnBody: (name) =>
    `Organizăm și întoarcerea din ${name} spre aeroportul din Antalya. Spune-ne numărul zborului și ora de preluare dorită la rezervare.`,
  privateHeading: "Privat, nu în comun",
  privateBody: (name) =>
    `În mașină sunteți doar tu și însoțitorii tăi. După rezervare primești o confirmare clară cu datele călătoriei și un contact direct. În ziua sosirii echipa noastră urmărește zborul; dacă aterizezi mai devreme sau mai târziu, mutăm întâlnirea în consecință. Șoferul te duce cu bagajele până la recepția hotelului sau la adresa privată indicată în ${name}.`,
  priceBody:
    "Suma afișată este un preț total fix pentru vehicul, nu pe persoană. Nu există suprataxe ascunse pentru monitorizarea zborului, pentru timpul obișnuit de așteptare sau pentru scaunele de copil la cerere. Plătești cash direct șoferului la începutul cursei, așa că prețul e stabilit înainte de plecare.",
  vehicleHeading: "Vehicul, bagaje și copii",
  vehicleBody:
    "Mercedes Vito este potrivit pentru până la șase pasageri cu bagaje obișnuite de vacanță; grupurile mai mari călătoresc cu un Mercedes Sprinter de până la 12 locuri. Spune-ne la rezervare despre bagajele supradimensionate, un cărucior sau scaunele de copil necesare și potrivim vehiculul cu grupul tău.",
  wholeVehicle: "Preț pentru întregul vehicul",
  priceTrust: [
    "Fără plată în avans",
    "Plata direct la șofer",
    "Fără taxe ascunse",
  ],
  hotelsEyebrow: "Pentru cazarea ta",
  hotelsHeading: (name) => `Hoteluri căutate în ${name}`,
  hotelsBody: () => "Mergem direct la acestea și la orice alt hotel din zonă.",
  faq: [
    [
      "Unde găsesc echipa de transfer pe aeroportul din Antalya?",
      "După ridicarea bagajelor, mergi în zona Meet & Greet J / 777. Echipa noastră găsește rezervarea și te conduce la șofer.",
    ],
    [
      "Trebuie să plătesc transferul în avans?",
      "Nu. Nu se cere nicio plată în avans. Prețul total fix se achită direct șoferului.",
    ],
    [
      "Există scaun pentru copii?",
      "Da. Scaunele pentru copii sunt gratuite la cerere. Spune-ne numărul copiilor și vârsta lor la rezervare.",
    ],
  ],
  regions: {
    antalya: {
      about: "Orașul Antalya, cu zonele de plajă Lara și Kundu, se află la doar câțiva kilometri de aeroport. Pe litoralul Lara se înșiră resorturi mari tematice și hoteluri urbane, în timp ce Konyaaltı, în vest, oferă plajă cu pietriș și o promenadă lungă pe malul mării.",
      routeDetails: "Drumul scurt de la aeroportul din Antalya urmează șoseaua de coastă prin Lara sau intră direct în centru. Chiar și pe o distanță mică mașina privată merită: nu aștepți alți pasageri, nu există opriri intermediare și ajungi la propriul hotel.",
    },
    belek: {
      about: "Belek se află la est de Antalya și este cunoscut mai ales pentru terenurile de golf, resorturile mari all inclusive și plajele largi cu nisip. Hotelurile se întind între Kadriye și litoralul de lângă Serik, de aceea adresa exactă a hotelului ajută la rezervare.",
      routeDetails: "Traseul pleacă de la aeroportul din Antalya pe D400 spre Serik și Belek. Pentru familii, jucătorii de golf și zborurile de seară transferul privat direct este varianta simplă: ajungi la cazare fără opriri de preluare și fără schimbarea vehiculului.",
    },
    side: {
      about: "Side îmbină un centru vechi istoric cu plaje lungi de nisip și complexe mari de vacanță. În afară de Side, destinația cuprinde zonele hoteliere foarte căutate Kumköy, Evrenseki, Çolaklı, Sorgun și Titreyengöl.",
      routeDetails: "De la aeroportul din Antalya traseul urmează șoseaua de coastă spre Manavgat și Side. Mașina privată este deosebit de utilă la o sosire târzie: grupul tău merge direct la resortul rezervat, fără să aștepte oaspeții altor hoteluri.",
    },
    kemer: {
      about: "Kemer se întinde la vest de Antalya, între munții Taurus și Mediterana. Zona cuprinde centrul Kemer, precum și Beldibi, Göynük, Kiriş și Çamyuva — hoteluri la plajă, un port de agrement și munții ca fundal.",
      routeDetails: "Drumul direct urmează litoralul la vest de Antalya. Șoferul te duce până la hotel fără schimbarea vehiculului, ceea ce contează mai ales când călătorești cu copii, cu echipament sportiv sau după o aterizare de seară.",
    },
    alanya: {
      about: "Alanya este una dintre cele mai iubite destinații ale Rivierei turcești și se află considerabil mai la est decât resorturile din jurul Antalyei. Pe lângă centru, Mahmutlar, Kestel, Avsallar, Türkler și Okurcalar sunt zonele hoteliere cele mai cerute.",
      routeDetails: "Pe un drum lung de coastă prețul fix pe vehicul se vede cel mai bine. Cu un transfer privat călătorești doar cu grupul tău și continui de la aterizare direct la recepția hotelului.",
    },
    kizilagac: {
      about: "Kızılağaç se află la est de Manavgat și este cunoscut pentru resorturile spațioase de pe plajă și pentru vacanțele de familie liniștite. Zona se învecinează cu Sorgun și Manavgat; multe hoteluri sunt puțin mai retrase de șoseaua principală, chiar lângă mare.",
      routeDetails: "De la aeroportul din Antalya se merge pe D400 spre Manavgat și apoi mai departe până la Kızılağaç. Vehiculul privat îți scutește opririle suplimentare la alte hoteluri, obișnuite exact pe acest tronson la transferurile în comun.",
    },
    tekirova: {
      about: "Tekirova se află la sud de Kemer, la marginea parcului național Olympos-Beydağları. Combină domenii hoteliere îngrijite cu golfuri mici și se găsește foarte aproape de situl antic Phaselis.",
      routeDetails: "Traseul pornește de la aeroportul din Antalya, trece prin Kemer și continuă spre Tekirova. Poziția pe litoral și distanța fac transferul direct rezonabil: fără schimbarea vehiculului și fără să aștepți alți oaspeți până la hotel.",
    },
    bogazkent: {
      about: "Boğazkent se află în districtul Serik, pe litoralul dintre Belek și Side. Resorturi mari all inclusive se înșiră direct pe o plajă largă de nisip, iar terenurile de golf din Belek sunt la doar câteva minute, ceea ce face din zonă o bază liniștită atât pentru familii, cât și pentru jucătorii de golf.",
      routeDetails: "De la aeroportul din Antalya traseul urmează D400 spre est, pe lângă Belek, apoi coboară spre coastă. Cu aproximativ 48 km este unul dintre cele mai scurte transferuri din această listă, iar mașina privată te duce din holul de sosiri până la intrarea resortului tău, fără opriri la alte hoteluri.",
    },
    manavgat: {
      about: "Manavgat este un oraș animat pe râul cu același nume, la est de Side. Este cunoscut pentru cascadă, pentru excursiile cu barca pe râu și pentru piața săptămânală și servește drept poartă de intrare spre resorturile de pe acest tronson al coastei. Te rugăm să ne dai adresa exactă a hotelului la rezervare, deoarece zona este întinsă.",
      routeDetails: "Traseul merge spre est pe D400, de la aeroportul din Antalya, pe aproximativ 75 km. Drumul durează cam o oră, iar un transfer privat direct îți scutește opririle suplimentare la hoteluri pe care le face un microbuz în comun pe această șosea de coastă aglomerată.",
    },
    bodrum: {
      about: "Bodrum se află pe litoralul Mării Egee, în provincia Muğla, și este celebru pentru castelul cruciaților, pentru marină și pentru casele albe de pe dealuri. În jurul peninsulei găsești cartiere animate precum Gümbet și Bitez, dar și golfuri mai liniștite la Yalıkavak, Türkbükü și Gümüşlük.",
      routeDetails: "Cu aproximativ 380 km, este unul dintre cele mai lungi drumuri pe care le oferim și durează între cinci și șase ore, cu pauze confortabile. O mașină privată face ziua mult mai ușoară decât transportul public: pleci imediat ce aterizezi, te oprești unde dorești și ajungi la propriul hotel de pe peninsulă. Spune-ne la rezervare hotelul și ora aterizării, ca să putem planifica drumul.",
    },
    dalaman: {
      about: "Dalaman este poarta de intrare spre litoralul lician și carian. Aeroportul său deservește stațiuni precum Sarıgerme și Göcek, iar Dalyan, aflat în apropiere, este cunoscut pentru delta râului, pentru mormintele săpate în stâncă de la Kaunos și pentru plaja țestoaselor de la İztuzu.",
      routeDetails: "Cei 235 km de la aeroportul din Antalya urmează șoseaua șerpuită a coastei licine și durează cam trei – trei ore și jumătate. Un preț fix pe vehicul îți permite să-ți faci ușor bugetul pentru un drum lung, iar mașina privată îți dă libertatea să te oprești pentru odihnă sau masă oricând dorești.",
    },
    fethiye: {
      about: "Fethiye se află într-un golf larg, înconjurat de munți acoperiți de păduri de pini. Este baza pentru Ölüdeniz și laguna sa albastră, pentru plajele și viața de noapte din Çalış și pentru satele mai liniștite Hisarönü și Kayaköy. Mulți oaspeți vin și pentru parapanta de la Babadağ și pentru excursiile cu barca în jurul celor douăsprezece insule.",
      routeDetails: "Cei 205 km de la aeroportul din Antalya merg pe coasta licină, prin Kumluca, Kaş și Kalkan, și durează cam două ore și jumătate – trei ore. Drumul este șerpuit și pitoresc. Cu un transfer privat nu schimbi vehiculul la Fethiye, iar șoferul te duce la hotelul tău din Ölüdeniz, Çalış sau Hisarönü.",
    },
    pamukkale: {
      about: "Pamukkale, în provincia Denizli, este un sit din Patrimoniul Mondial UNESCO, cunoscut pentru terasele sale albe de travertin și pentru bazinele termale calde. Orașul antic Hierapolis se înalță pe dealul de deasupra, cu teatru, necropolă și piscina antică în care vizitatorii pot înota printre coloane scufundate.",
      routeDetails: "Traseul părăsește coasta și merge pe aproximativ 245 km spre interior, peste munții Taurus și podișul spre Denizli, ceea ce durează cam trei – trei ore și jumătate. O mașină privată se potrivește bine acestui drum: nu schimbi vehiculul, poți planifica o oprire de odihnă pe parcurs și ajungi direct la hotelul din Pamukkale sau Karahayıt.",
    },
    kapadokya: {
      about: "Capadocia, în centrul Anatoliei, este cunoscută pentru coșurile zânelor, bisericile săpate în stâncă și orașele subterane. La răsărit, baloanele cu aer cald se ridică deasupra localităților Göreme, Uçhisar și Ürgüp, iar mulți oaspeți aleg să se cazeze într-un hotel săpat în piatră.",
      routeDetails: "Cu aproximativ 540 km, drumul duce de la Mediterana peste munții Taurus și peste podișul anatolian și durează între șapte și opt ore, cu pauze. Un transfer privat este varianta confortabilă: grupul tău călătorește împreună, șoferul stabilește împreună cu tine opririle de odihnă și te duce până la intrarea hotelului tău în stâncă. Spune-ne la rezervare numărul zborului și hotelul, ca să putem planifica ziua.",
    },
  },
};
