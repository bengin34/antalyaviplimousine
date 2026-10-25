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
  },
};
