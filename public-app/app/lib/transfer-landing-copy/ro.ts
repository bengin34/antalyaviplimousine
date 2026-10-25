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
  },
};
