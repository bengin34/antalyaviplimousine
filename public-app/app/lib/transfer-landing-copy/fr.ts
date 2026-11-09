import type { TransferLandingCopy } from "../transfer-landing-copy";

/**
 * `routeCatalog` carries no French route names, so every region states its own
 * place name here; without that the French pages would read "Antalya City".
 * Headings avoid the de/d' elision ("à propos de Belek" vs "d'Antalya") by
 * naming the destination after a colon or after "vers", which works for every
 * place name in the catalogue.
 *
 * Written by the team, not natively reviewed yet — flag any wording a French
 * reader would phrase differently before the next content pass.
 */
export const fr: TransferLandingCopy = {
  heroHeading: (name) => `Aéroport d’Antalya → ${name} : transfert privé`,
  heroCta: "Réserver le transfert",
  heroTrust: [
    "Jusqu’à 7 personnes",
    "Aucun paiement à l’avance",
    "Paiement directement au chauffeur",
    "Prix total fixe, sans frais cachés",
    "Siège enfant gratuit sur demande",
    "Suivi du vol inclus",
  ],
  serviceHeading: (name) => `Votre transfert privé vers ${name}`,
  aboutHeading: (name) => `Votre destination : ${name}`,
  ownGroup: (name) =>
    `Vous voyagez uniquement avec les personnes de votre groupe, directement jusqu’à votre hôtel à ${name}. Pas de navette collective, pas d’inconnus dans la voiture et aucun détour par d’autres hôtels — le prix fixe couvre le véhicule entier.`,
  arrivalHeading: "Votre arrivée à l’aéroport d’Antalya",
  arrivalBody:
    "Après avoir récupéré vos bagages, rendez-vous à l’espace Meet & Greet J / 777. Notre équipe à l’aéroport retrouve votre réservation et vous confie à votre chauffeur. Comme nous suivons votre vol, un retard décale la prise en charge sans supplément.",
  returnHeading: "Transfert retour",
  returnBody: (name) =>
    `Nous organisons également le retour depuis ${name} vers l’aéroport d’Antalya. Indiquez-nous votre numéro de vol et l’heure de prise en charge souhaitée lors de la réservation.`,
  privateHeading: "Privé, et non partagé",
  privateBody: (name) =>
    `Seuls vous et vos compagnons de voyage montez dans le véhicule. Après la réservation, vous recevez une confirmation claire avec vos informations de trajet et un contact direct. Le jour de l’arrivée, notre équipe suit votre vol ; si vous atterrissez plus tôt ou plus tard, nous ajustons la prise en charge. Votre chauffeur vous dépose avec vos bagages à la réception de l’hôtel ou à l’adresse privée indiquée à ${name}.`,
  priceBody:
    "Le montant affiché est un prix total fixe pour le véhicule, et non un prix par personne. Aucun supplément caché pour le suivi du vol, le temps d’attente habituel ou les sièges enfant sur demande. Vous payez en espèces directement au chauffeur au début du trajet, le coût est donc réglé avant même de partir.",
  vehicleHeading: "Véhicule, bagages et enfants",
  vehicleBody:
    "La Mercedes Vito convient jusqu’à six personnes avec des bagages de vacances habituels ; les groupes plus nombreux voyagent en Mercedes Sprinter, jusqu’à 12 places. Signalez-nous les bagages volumineux, une poussette ou les sièges enfant nécessaires lors de la réservation : nous adaptons le véhicule à votre groupe.",
  wholeVehicle: "Prix pour le véhicule entier",
  priceTrust: [
    "Aucun paiement à l’avance",
    "Paiement directement au chauffeur",
    "Sans frais cachés",
  ],
  hotelsEyebrow: "Pour votre hébergement",
  hotelsHeading: (name) => `Hôtels fréquents à ${name}`,
  hotelsBody: () => "Nous desservons directement ces hôtels et tous les autres établissements de la région.",
  faq: [
    [
      "Où retrouver l’équipe de transfert à l’aéroport d’Antalya ?",
      "Après avoir récupéré vos bagages, rendez-vous à l’espace Meet & Greet J / 777. Notre équipe retrouve votre réservation et vous accompagne jusqu’à votre chauffeur.",
    ],
    [
      "Faut-il payer le transfert à l’avance ?",
      "Non. Aucun paiement à l’avance n’est demandé. Vous réglez le prix total fixe directement au chauffeur.",
    ],
    [
      "Un siège enfant est-il disponible ?",
      "Oui. Les sièges enfant sont gratuits sur demande. Indiquez le nombre d’enfants et leur âge lors de la réservation.",
    ],
  ],
  regions: {
    antalya: {
      name: { nominative: "Antalya-ville", direction: "Antalya", location: "Antalya", origin: "Antalya" },
      about: "Antalya et ses fronts de mer de Lara et Kundu se trouvent à quelques kilomètres seulement de l’aéroport. De grands complexes à thème et des hôtels urbains bordent la côte de Lara, tandis que Konyaaltı, à l’ouest, offre une plage de galets et une longue promenade maritime.",
      routeDetails: "Le court trajet depuis l’aéroport d’Antalya suit la route côtière de Lara ou rejoint directement le centre-ville. Même sur une étape courte, la voiture privée reste gagnante : aucune attente d’autres passagers, aucun arrêt intermédiaire, et vous arrivez devant votre propre hôtel.",
    },
    belek: {
      name: { nominative: "Belek", direction: "Belek", location: "Belek", origin: "Belek" },
      about: "Belek se situe à l’est d’Antalya et doit sa réputation à ses parcours de golf, à ses grands complexes tout compris et à ses larges plages de sable. Les hôtels s’étendent entre Kadriye et le littoral près de Serik : l’adresse exacte de l’hôtel est donc utile lors de la réservation.",
      routeDetails: "Le trajet quitte l’aéroport d’Antalya par la D400 en direction de Serik et de Belek. Pour les familles, les golfeurs et les vols tardifs, le transfert privé direct est la solution simple : vous atteignez votre hébergement sans arrêt de ramassage ni changement de véhicule.",
    },
    side: {
      name: { nominative: "Side", direction: "Side", location: "Side", origin: "Side" },
      about: "Side associe une vieille ville antique à de longues plages de sable et à de vastes complexes de vacances. Outre Side même, la station englobe les zones hôtelières très demandées de Kumköy, Evrenseki, Çolaklı, Sorgun et Titreyengöl.",
      routeDetails: "Depuis l’aéroport d’Antalya, l’itinéraire suit la route côtière vers Manavgat et Side. Le véhicule privé est particulièrement appréciable lors d’une arrivée tardive : votre groupe rejoint directement le complexe réservé, sans attendre les clients d’autres hôtels.",
    },
    kemer: {
      name: { nominative: "Kemer", direction: "Kemer", location: "Kemer", origin: "Kemer" },
      about: "Kemer s’étend à l’ouest d’Antalya, entre les montagnes du Taurus et la Méditerranée. La zone couvre le centre de Kemer ainsi que Beldibi, Göynük, Kiriş et Çamyuva : hôtels de plage, port de plaisance et décor montagneux.",
      routeDetails: "Le trajet direct longe la côte à l’ouest d’Antalya. Votre chauffeur vous conduit jusqu’à l’hôtel sans changement de véhicule, ce qui compte surtout avec des enfants, avec du matériel de sport ou après un atterrissage en soirée.",
    },
    alanya: {
      name: { nominative: "Alanya", direction: "Alanya", location: "Alanya", origin: "Alanya" },
      about: "Alanya est l’une des destinations les plus appréciées de la Riviera turque et se trouve nettement plus à l’est que les stations autour d’Antalya. Outre le centre, Mahmutlar, Kestel, Avsallar, Türkler et Okurcalar sont les quartiers hôteliers les plus demandés.",
      routeDetails: "Sur un long trajet côtier, le prix fixe par véhicule montre toute sa valeur. Avec un transfert privé, vous voyagez avec votre seul groupe et poursuivez de l’avion jusqu’à la réception de votre hôtel.",
    },
    kizilagac: {
      name: { nominative: "Kızılağaç", direction: "Kızılağaç", location: "Kızılağaç", origin: "Kızılağaç" },
      about: "Kızılağaç se trouve à l’est de Manavgat et se distingue par de vastes complexes de plage et des vacances familiales tranquilles. Le secteur touche Sorgun et Manavgat ; de nombreux hôtels sont un peu à l’écart de la route principale, directement au bord de la mer.",
      routeDetails: "Depuis l’aéroport d’Antalya, la route emprunte la D400 vers Manavgat puis continue jusqu’à Kızılağaç. Le véhicule privé vous épargne les arrêts supplémentaires devant d’autres hôtels, fréquents sur ce tronçon avec les navettes partagées.",
    },
    tekirova: {
      name: { nominative: "Tekirova", direction: "Tekirova", location: "Tekirova", origin: "Tekirova" },
      about: "Tekirova se situe au sud de Kemer, en bordure du parc national d’Olympos-Beydağları. Le village associe des domaines hôteliers soignés à de petites criques et se trouve tout près du site antique de Phaselis.",
      routeDetails: "Le trajet part de l’aéroport d’Antalya, traverse Kemer et continue vers Tekirova. La situation côtière et la distance rendent le transfert direct raisonnable : aucun changement de véhicule et aucune attente d’autres clients jusqu’à votre hôtel.",
    },
    bogazkent: {
      name: { nominative: "Boğazkent", direction: "Boğazkent", location: "Boğazkent", origin: "Boğazkent" },
      about: "Boğazkent se trouve dans le district de Serik, sur la côte entre Belek et Side. De grands complexes tout compris s’alignent directement sur une large plage de sable, et les golfs de Belek sont à quelques minutes seulement : un point de chute tranquille pour les familles comme pour les golfeurs.",
      routeDetails: "Depuis l’aéroport d’Antalya, la route suit la D400 vers l’est, passe Belek puis rejoint la côte. Avec environ 48 km, c’est l’un des transferts les plus courts de cette liste, et la voiture privée vous conduit du hall des arrivées à l’entrée de votre complexe, sans arrêt devant d’autres hôtels.",
    },
    manavgat: {
      name: { nominative: "Manavgat", direction: "Manavgat", location: "Manavgat", origin: "Manavgat" },
      about: "Manavgat est une ville animée au bord du fleuve du même nom, à l’est de Side. Elle est connue pour sa cascade, ses excursions en bateau sur le fleuve et son marché hebdomadaire, et sert de porte d’entrée aux complexes de ce tronçon de côte. Indiquez-nous l’adresse exacte de votre hôtel lors de la réservation, car la zone est étendue.",
      routeDetails: "L’itinéraire longe la D400 vers l’est depuis l’aéroport d’Antalya sur environ 75 km. Le trajet dure à peu près une heure, et le transfert privé direct vous évite les arrêts supplémentaires que fait une navette partagée sur cette route côtière très fréquentée.",
    },
    bodrum: {
      name: { nominative: "Bodrum", direction: "Bodrum", location: "Bodrum", origin: "Bodrum" },
      about: "Bodrum se trouve sur la côte égéenne, dans la province de Muğla, et doit sa réputation à son château des croisés, à sa marina et à ses maisons blanches étagées sur les collines. Autour de la presqu’île, on trouve des quartiers animés comme Gümbet et Bitez, mais aussi des baies plus calmes à Yalıkavak, Türkbükü et Gümüşlük.",
      routeDetails: "Avec environ 380 km, c’est l’un des plus longs trajets que nous proposons : comptez cinq à six heures avec des pauses confortables. La voiture privée rend la journée bien plus simple que les transports en commun : vous partez dès l’atterrissage, vous vous arrêtez où vous le souhaitez et vous arrivez à votre propre hôtel sur la presqu’île. Indiquez-nous votre hôtel et l’heure d’atterrissage lors de la réservation afin que nous puissions organiser le trajet.",
    },
    dalaman: {
      name: { nominative: "Dalaman", direction: "Dalaman", location: "Dalaman", origin: "Dalaman" },
      about: "Dalaman est la porte d’entrée de la côte lycienne et carienne. Son aéroport dessert des stations comme Sarıgerme et Göcek, et la proche Dalyan est connue pour son delta, les tombeaux rupestres de Kaunos et la plage des tortues d’İztuzu.",
      routeDetails: "Les 235 km depuis l’aéroport d’Antalya suivent la route sinueuse de la côte lycienne, pour environ trois à trois heures et demie de trajet. Un prix fixe par véhicule permet de budgétiser facilement un long voyage, et la voiture privée vous laisse vous arrêter pour une pause ou un repas quand vous le souhaitez.",
    },
    fethiye: {
      name: { nominative: "Fethiye", direction: "Fethiye", location: "Fethiye", origin: "Fethiye" },
      about: "Fethiye s’étend au fond d’une large baie entourée de montagnes couvertes de pins. C’est le point de départ pour Ölüdeniz et son lagon bleu, pour les plages et la vie nocturne de Çalış, ainsi que pour les villages plus tranquilles de Hisarönü et de Kayaköy. Beaucoup de visiteurs viennent aussi pour le parapente depuis le Babadağ et pour les sorties en bateau autour des douze îles.",
      routeDetails: "Les 205 km depuis l’aéroport d’Antalya longent la côte lycienne en passant par Kumluca, Kaş et Kalkan, et prennent environ deux heures et demie à trois heures. La route est sinueuse et panoramique. Avec un transfert privé, pas de changement de véhicule à Fethiye : le chauffeur vous dépose directement à votre hôtel à Ölüdeniz, Çalış ou Hisarönü.",
    },
    pamukkale: {
      name: { nominative: "Pamukkale", direction: "Pamukkale", location: "Pamukkale", origin: "Pamukkale" },
      about: "Pamukkale, dans la province de Denizli, est classé au patrimoine mondial de l’UNESCO et célèbre pour ses terrasses de travertin blanc et ses bassins thermaux chauds. La cité antique d’Hiérapolis se dresse sur la colline qui les surplombe, avec son théâtre, sa nécropole et le bassin antique où l’on se baigne parmi des colonnes immergées.",
      routeDetails: "L’itinéraire quitte la côte et traverse l’intérieur des terres sur environ 245 km, par les montagnes du Taurus puis le plateau en direction de Denizli, pour à peu près trois à trois heures et demie de route. La voiture privée convient bien à ce trajet : pas de changement de véhicule, une pause possible en chemin, et vous arrivez directement à votre hôtel à Pamukkale ou à Karahayıt.",
    },
    kapadokya: {
      name: { nominative: "Cappadoce", direction: "la Cappadoce", location: "la Cappadoce", origin: "la Cappadoce" },
      about: "La Cappadoce, au cœur de l’Anatolie, est connue pour ses cheminées de fées, ses églises rupestres et ses villes souterraines. Au lever du soleil, les montgolfières s’élèvent au-dessus de Göreme, d’Uçhisar et d’Ürgüp, et beaucoup de visiteurs séjournent dans un hôtel creusé dans la roche.",
      routeDetails: "Avec environ 540 km, le trajet mène de la Méditerranée à travers les montagnes du Taurus puis le plateau anatolien, et dure sept à huit heures avec les pauses. Le transfert privé est la manière la plus confortable de le faire : votre groupe voyage ensemble, le chauffeur prévoit les pauses avec vous et vous dépose à l’entrée de votre hôtel troglodytique. Indiquez-nous votre numéro de vol et votre hôtel lors de la réservation afin que nous puissions organiser la journée.",
    },
  },
};
