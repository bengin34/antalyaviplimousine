/**
 * Blog copy for fr: the page chrome plus every article body.
 * One file per language, so adding a market is adding a file.
 */
export const chrome = {
  locale: "fr_FR",
  indexTitle: "Guides de transfert à Antalya et articles de voyage | Antalya VIP Tourism",
  indexDescription:
    "Des guides pratiques pour arriver à Antalya : transfert privé ou taxi, rencontre avec le chauffeur, voyage avec enfants, distances de la côte et quand partir.",
  heading: "Guides de transfert à Antalya",
  intro:
    "Des articles pratiques sur l'arrivée à l'aéroport d'Antalya et le trajet jusqu'à votre hôtel - tirés des transferts que nous assurons chaque jour, pas d'une brochure.",
  blog: "Guides",
  readMore: "Lire le guide",
  minReadLabel: "{minutes} min de lecture",
  updated: "Mis à jour",
  contents: "Dans ce guide",
  faqHeading: "Questions fréquentes",
  relatedHeading: "Trajets de transfert de ce guide",
  routeGuidesHeading: "Guides pour ce transfert",
  moreHeading: "Autres guides",
  ctaHeading: "Transfert à prix fixe depuis l'aéroport d'Antalya",
  ctaText:
    "Un prix pour tout le véhicule, suivi de vol inclus et paiement en espèces au chauffeur. Vérifiez votre trajet et réservez en une minute.",
  ctaButton: "Voir votre prix fixe",
  backToBlog: "Tous les guides",
  home: "Accueil",
  routes: "Trajets de transfert",
  book: "Réserver votre transfert",
  imprint: "Mentions légales",
  privacy: "Confidentialité",
  imprintUrl: "/impressum.html",
  privacyUrl: "/privacy/",
};

export const articles = {
  "transfer-vs-taxi": {
    slug: "transfert-ou-taxi-aeroport-antalya",
    title: "Aéroport d'Antalya : transfert privé, taxi ou navette partagée ?",
    heading: "Transfert privé, taxi ou navette partagée depuis l'aéroport d'Antalya ?",
    description:
      "Ce que coûtent vraiment les trois options au départ de l'aéroport d'Antalya, leur durée et celle qui convient à votre groupe. Comparatif à prix fixe par véhicule.",
    excerpt:
      "Trois façons de quitter l'aéroport d'Antalya, trois débuts de vacances très différents. Le coût, la durée et à qui chaque option convient.",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "Vous atterrissez à l'aéroport d'Antalya (AYT) après trois à cinq heures de vol, souvent tard le soir, généralement avec des bagages et souvent avec des enfants. Les quarante minutes qui suivent décident de la façon dont vos vacances commencent. Il existe trois manières réalistes de quitter le terminal, et le prix affiché le plus bas est rarement le trajet le moins cher." },
      { type: "h2", text: "Les trois options côte à côte" },
      {
        type: "table",
        head: ["", "Transfert privé", "Taxi aéroport", "Navette partagée"],
        rows: [
          ["Base du prix", "Fixe, par véhicule", "Compteur, par course", "Par personne"],
          ["Connu avant l'arrivée", "Oui", "Non", "Oui"],
          ["Attend en cas de retard", "Oui, vol suivi", "Non", "Limité"],
          ["Arrêts avant votre hôtel", "Aucun", "Aucun", "Jusqu'à 8"],
          ["Capacité bagages", "De van", "De berline", "Partagée"],
          ["Siège enfant", "Sur demande, gratuit", "Rarement", "Non"],
        ],
      },
      { type: "h2", text: "Ce que coûte réellement un taxi" },
      { type: "p", text: "Le taxi est la réponse évidente dans tous les aéroports, et sur de courtes distances c'est un choix raisonnable. Sur la Riviera turque, le problème est la distance : Belek est à 45 km, Side à 65 km, Alanya à 125 km. Un compteur qui tourne de nuit sur 125 km, avec un retour que le chauffeur doit absorber, produit un montant que personne ne vous a annoncé. Et vous n'avez aucun recours si l'itinéraire emprunté n'était pas le plus direct." },
      { type: "p", text: "Le transfert privé inverse cette logique : le prix du véhicule entier est convenu avant votre départ, il ne bouge pas avec le trafic et il est identique que vous voyagiez à un ou à six." },
      { type: "h2", text: "Pourquoi la navette paraît bon marché sans l'être" },
      { type: "p", text: "Un tarif par personne semble imbattable pour un voyageur seul et cesse de l'être dès deux personnes. Pour une famille de quatre vers Side, quatre places coûtent généralement plus qu'un van à prix fixe. Mais le vrai coût, c'est le temps : le véhicule part une fois plein et dépose les passagers le long de la côte dans l'ordre qui arrange l'itinéraire, pas vous. Arriver le dernier après un vol de nuit ajoute facilement plus d'une heure." },
      { type: "h2", text: "Quand chaque option est la bonne" },
      {
        type: "ul",
        items: [
          "Voyageur seul, bagage à main, atterrissage de jour, hôtel dans le centre d'Antalya : un taxi ou une navette suffisent.",
          "Deux personnes ou plus au-delà du centre : un véhicule privé revient généralement moins cher et va toujours plus vite.",
          "Familles avec sièges enfant, poussette ou sacs de golf : privé, car la capacité est confirmée à l'avance.",
          "Arrivées de nuit et correspondances susceptibles de glisser : privé, car la prise en charge suit votre vol et non un horaire.",
        ],
      },
      { type: "h2", text: "Ce qu'il faut vérifier avant de réserver" },
      { type: "p", text: "Trois questions rendent la différence évidente. Le prix est-il par véhicule ou par personne ? Est-il fixe, ou varie-t-il selon le trafic et l'heure ? Et que se passe-t-il si le vol atterrit avec deux heures de retard : quelqu'un vous attend-il encore, et cela coûte-t-il un supplément ? Nos prix fixes sont par véhicule, le suivi de vol est inclus, et les 90 premières minutes d'attente après l'atterrissage sont offertes et se décalent automatiquement en cas de retard." },
    ],
    faq: [
      ["Un transfert privé est-il plus cher qu'un taxi à Antalya ?", "Pour le centre d'Antalya, c'est comparable. Pour Belek, Side, Kemer ou Alanya, un prix fixe par véhicule est normalement inférieur à une course au compteur sur la même distance, et vous le connaissez avant de partir."],
      ["Je paie par personne ou par véhicule ?", "Par véhicule. Le tarif d'un Mercedes Vito couvre jusqu'à six passagers ; le Sprinter concerne les groupes plus importants. Un passager de plus ne change pas le prix."],
      ["Que se passe-t-il si mon vol a du retard ?", "Nous suivons le vol en temps réel et décalons la prise en charge sans frais. Les 90 minutes d'attente incluses démarrent à l'heure réelle d'atterrissage."],
      ["Puis-je payer en espèces à l'arrivée ?", "Oui. Aucun prépaiement n'est demandé ; vous réglez le prix fixe de votre réservation directement au chauffeur au début du trajet."],
    ],
  },
  "airport-arrival-guide": {
    slug: "guide-arrivee-aeroport-antalya",
    title: "Guide d'arrivée à l'aéroport d'Antalya : terminaux, point de rendez-vous, attente",
    heading: "Arriver à l'aéroport d'Antalya : ce qui se passe après l'atterrissage",
    description:
      "Étape par étape à l'arrivée à l'aéroport d'Antalya - terminaux, contrôle des passeports, bagages, où attend votre chauffeur et la durée d'attente offerte.",
    excerpt:
      "Du toucher des roues à la portière : terminaux, contrôle des passeports, point de rendez-vous et ce qui se passe quand le vol est en retard.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "L'aéroport d'Antalya traite plus de trente millions de passagers par an et presque tous arrivent dans une étroite fenêtre estivale. Connaître la séquence à l'avance transforme un terminal bondé en une formalité de vingt minutes." },
      { type: "h2", text: "À quel terminal vous atterrissez" },
      { type: "p", text: "AYT compte trois terminaux. La plupart des vols internationaux réguliers utilisent le Terminal 1 ou le Terminal 2 ; les vols charters et saisonniers sont généralement traités au Terminal 2. Le terminal domestique dessert les vols d'Istanbul, Ankara et Izmir. Vous n'avez pas à le déterminer vous-même : le numéro de vol nous le dit et le chauffeur est envoyé au bon hall d'arrivée." },
      { type: "h2", text: "Contrôle des passeports et bagages" },
      { type: "p", text: "La plupart des ressortissants européens entrent en Türkiye sans visa pour de courts séjours, mais vérifiez les règles applicables à votre passeport avant de partir. En haute saison, comptez 20 à 45 minutes entre l'atterrissage et la sortie avec vos bagages, moins en dehors de juillet et août. C'est la livraison des bagages qui varie le plus, d'où l'importance d'une fenêtre d'attente plutôt que d'une heure de prise en charge promise." },
      { type: "h2", text: "Où le chauffeur vous retrouve" },
      {
        type: "ul",
        items: [
          "Récupérez vos bagages et rejoignez le hall d'arrivée.",
          "Dirigez-vous vers la zone meet & greet J / 777.",
          "Notre équipe d'aéroport retrouve votre réservation et vous accompagne jusqu'à votre chauffeur.",
          "Le chauffeur porte vos bagages jusqu'au véhicule, sur le parking voisin.",
        ],
      },
      { type: "p", text: "Vous n'avez pas à chercher une pancarte au milieu de cinquante autres. L'équipe se tient à un point fixe et dispose de votre référence de réservation, si bien que la prise en charge fonctionne de la même façon à 06h00 et à 02h00." },
      { type: "h2", text: "Ce qui se passe en cas de retard" },
      { type: "p", text: "Nous suivons le vol lui-même, pas l'horaire sur lequel vous avez réservé. S'il atterrit avec deux heures de retard, la prise en charge se décale d'autant et le prix ne change pas. Les 90 premières minutes d'attente à partir de l'heure réelle d'atterrissage sont incluses sans frais, ce qui couvre une file d'attente longue ou des bagages tardifs." },
      { type: "h2", text: "Avant de partir" },
      { type: "p", text: "Deux détails rendent la journée simple : donnez-nous le numéro de vol et pas seulement l'heure d'arrivée, et indiquez le nombre de sièges enfant dès la réservation. Les deux sont gratuits, et les deux sont bien plus difficiles à organiser à 01h00 dans le hall d'arrivée." },
    ],
    faq: [
      ["Où exactement retrouver le chauffeur à l'aéroport d'Antalya ?", "Dans la zone meet & greet J / 777 du hall d'arrivée, après avoir récupéré vos bagages. Notre équipe dispose de votre réservation et vous conduit au chauffeur."],
      ["Combien de temps le chauffeur attend-il ?", "Les 90 premières minutes suivant votre heure réelle d'atterrissage sont incluses sans frais, et la fenêtre se décale automatiquement en cas de retard."],
      ["Combien de temps pour sortir du terminal ?", "En général 20 à 45 minutes après l'atterrissage, selon le contrôle des passeports et la livraison des bagages. C'est le plus long en juillet et août."],
      ["Dois-je communiquer mon numéro de vol ?", "Oui, s'il vous plaît. Le numéro de vol nous permet de suivre l'heure réelle d'atterrissage et d'envoyer le chauffeur au bon terminal."],
    ],
  },
  "alanya-distance-guide": {
    slug: "aeroport-antalya-alanya-distance",
    title: "Aéroport d'Antalya à Alanya : distance, temps de trajet et options de transfert",
    heading: "De l'aéroport d'Antalya à Alanya : la distance réelle",
    description:
      "125 km le long de la route côtière D400. Ce que dure vraiment le trajet vers Alanya, où se situent les quartiers hôteliers et comment planifier une arrivée tardive.",
    excerpt:
      "Alanya est le plus long des transferts courants au départ d'Antalya. Distance réelle, durée réelle et ce qui change lors d'une arrivée de nuit.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Alanya se trouve à 125 km à l'est de l'aéroport d'Antalya, ce qui en fait le transfert le plus long réservé couramment sur la Riviera turque. Cette distance est le fait qui conditionne toutes les autres décisions du trajet." },
      { type: "h2", text: "Distance et temps de trajet" },
      {
        type: "table",
        head: ["Destination", "Distance depuis AYT", "Trajet habituel"],
        rows: [
          ["Centre d'Antalya", "15 km", "20-30 minutes"],
          ["Side", "65 km", "55-65 minutes"],
          ["Manavgat", "75 km", "60-70 minutes"],
          ["Kızılağaç", "85 km", "70-80 minutes"],
          ["Alanya", "125 km", "110-130 minutes"],
        ],
      },
      { type: "p", text: "L'itinéraire suit la route côtière D400 vers l'est, par Serik, Manavgat et Kızılağaç. C'est une bonne route, mais elle traverse les localités au lieu de les contourner : les après-midi d'été et les pics de vols charters du samedi ajoutent un temps qu'aucun horaire ne peut supprimer." },
      { type: "h2", text: "Alanya n'est pas un seul endroit" },
      { type: "p", text: "Les hôtels vendus comme « Alanya » s'étalent sur environ 65 km de côte. Avsallar, Türkler et Okurcalar sont à l'ouest du centre et nettement plus proches de l'aéroport ; Mahmutlar, Kestel, Kargıcak et Demirtaş sont à l'est et ajoutent 20 à 45 minutes. Au moment de réserver, indiquez le nom de l'hôtel et pas seulement la station : c'est ce qui détermine à la fois le temps de trajet et le bon prix fixe." },
      { type: "h2", text: "Pourquoi la navette partagée pèse le plus ici" },
      { type: "p", text: "Sur 125 km, chaque arrêt supplémentaire est un vrai détour. Une navette qui dépose huit groupes le long de la côte transforme facilement deux heures en quatre, et la dernière famille à descendre est généralement celle qui loge le plus à l'est. Un véhicule privé parcourt l'itinéraire une seule fois, dans votre ordre, et le prix fixe ne bouge pas avec le trafic." },
      { type: "h2", text: "Planifier une arrivée de nuit" },
      { type: "p", text: "De nombreux vols vers Alanya atterrissent après 23h00. Deux choses comptent alors : que quelqu'un attende à coup sûr, et que le prix ait été convenu avant le départ. Nous suivons le vol : un atterrissage retardé décale la prise en charge au lieu de l'annuler, et les 90 premières minutes d'attente sont incluses. Le paiement se fait en espèces au chauffeur au début du trajet, donc rien n'a à être organisé en pleine nuit." },
    ],
    faq: [
      ["À quelle distance se trouve Alanya de l'aéroport d'Antalya ?", "125 km par la route côtière D400, soit normalement 110 à 130 minutes de trajet."],
      ["Le prix du transfert est-il le même pour tous les hôtels d'Alanya ?", "Non. La côte d'Alanya s'étend sur environ 65 km : les hôtels d'Avsallar ou d'Okurcalar ne sont pas tarifés comme ceux de Mahmutlar ou Kargıcak. Indiquez le nom de l'hôtel et vous verrez le bon prix fixe."],
      ["Y a-t-il un arrêt en route ?", "Sur un transfert privé, nous pouvons faire une courte pause sur demande. Il n'y a ni arrêt programmé ni autre passager."],
      ["Et si j'atterris après minuit ?", "La prise en charge suit votre heure réelle d'atterrissage. Les arrivées de nuit sont courantes sur ce trajet et sans supplément."],
    ],
  },
  "family-child-seats": {
    slug: "transfert-aeroport-antalya-avec-enfants",
    title: "Transfert depuis l'aéroport d'Antalya avec des enfants : sièges, poussettes, bagages",
    heading: "Rejoindre votre hôtel avec des enfants",
    description:
      "Sièges enfant, poussettes et bagages lors d'un transfert depuis l'aéroport d'Antalya. Ce qu'il faut demander à la réservation et pourquoi le privé est plus simple.",
    excerpt:
      "Les sièges enfant sont gratuits sur demande, mais seulement si nous le savons avant votre atterrissage. Ce qu'il faut nous dire et ce qui entre vraiment dans le véhicule.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Un transfert avec de jeunes enfants est un problème de logistique, pas de prix. Les sièges, une poussette, un lit parapluie et quatre valises doivent tenir dans le même véhicule en même temps - et les décisions qui rendent cela possible se prennent à la réservation, pas au terminal." },
      { type: "h2", text: "Sièges enfant" },
      { type: "p", text: "Nous fournissons les sièges enfant gratuitement sur demande. Indiquez le nombre d'enfants et leur âge lors de la réservation : c'est ce qui détermine s'il faut une coque, un siège pour tout-petit ou un rehausseur. Les sièges sont préparés avec le véhicule, vous n'avez donc rien à porter dans l'aéroport ni rien à organiser à 01h00 dans le hall d'arrivée." },
      { type: "h2", text: "Ce qui entre dans le véhicule" },
      {
        type: "ul",
        items: [
          "Mercedes Vito : jusqu'à six passagers avec des bagages de vacances classiques.",
          "Mercedes Sprinter : groupes plus importants, jusqu'à 12 places, et le bon choix quand poussette et lit parapluie voyagent avec vous.",
          "Poussettes et sièges auto ne comptent pas dans le nombre de passagers, mais occupent de la soute - signalez-les et nous adaptons le véhicule.",
        ],
      },
      { type: "p", text: "Le prix fixe concerne le véhicule, pas la place : ajouter un enfant ne change jamais le tarif. Ce qui change, c'est le véhicule que nous envoyons." },
      { type: "h2", text: "Pourquoi le privé compte davantage avec des enfants" },
      { type: "p", text: "Dans une navette partagée, une famille attend d'abord que le véhicule se remplisse, puis longe la côte pendant que d'autres descendent. Avec un tout-petit après un vol de nuit, c'est la différence entre quarante minutes et trois heures. Un véhicule privé part quand vous êtes prêts et roule directement jusqu'à la réception de l'hôtel." },
      { type: "h2", text: "Détails pratiques utiles" },
      { type: "p", text: "De l'eau est disponible dans le véhicule. Si une courte pause est nécessaire sur un long trajet vers Side ou Alanya, demandez simplement au chauffeur : aucun horaire à respecter. Et comme le paiement se fait en espèces au début du trajet, personne n'a à chercher une carte ou du réseau avec un enfant endormi dans les bras." },
    ],
    faq: [
      ["Les sièges enfant sont-ils gratuits ?", "Oui. Les sièges enfant sont fournis sans supplément, sur demande. Merci d'indiquer le nombre d'enfants et leur âge lors de la réservation."],
      ["Puis-je emporter une poussette ?", "Oui. Signalez-le à la réservation pour que nous prévoyions la place - une poussette et un jeu complet de valises peuvent impliquer un Sprinter plutôt qu'un Vito."],
      ["Les enfants comptent-ils dans le nombre de passagers ?", "Pour la capacité en sièges, oui. Le prix ne change pas : il est fixe par véhicule, pas par personne."],
      ["Peut-on s'arrêter sur un long transfert ?", "Oui. Sur un transfert privé, le chauffeur peut faire une courte pause sur demande ; aucun autre passager n'attend."],
    ],
  },
  "belek-golf-transfer": {
    slug: "transfert-golf-vers-belek",
    title: "Transfert golf vers Belek : clubs, groupes et timing depuis l'aéroport",
    heading: "De l'aéroport d'Antalya à Belek avec des sacs de golf",
    description:
      "Comment les bagages de golf voyagent de l'aéroport d'Antalya à Belek : choix du véhicule, taille du groupe, timing des départs et ce qu'il faut confirmer.",
    excerpt:
      "Belek est d'abord une destination de golf, une station balnéaire ensuite. Ce que cela implique pour la soute, le choix du véhicule et le trajet depuis AYT.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Belek se situe à 45 km à l'est de l'aéroport d'Antalya, soit 35 à 40 minutes de route, et concentre la plus forte densité de parcours de championnat de Türkiye. La plupart des groupes qui y arrivent transportent quelque chose pour quoi un transfert standard n'est pas dimensionné : des sacs de golf." },
      { type: "h2", text: "Sacs de golf et choix du véhicule" },
      { type: "p", text: "Un sac de tournoi mesure environ 130 cm et partage mal l'espace avec les valises. Règle pratique : un Mercedes Vito accueille quatre passagers avec quatre sacs de golf et leurs bagages habituels ; au-delà, le Mercedes Sprinter est le bon véhicule. Indiquez le nombre de sacs à la réservation et nous adaptons le véhicule au chargement, pas au nombre de personnes." },
      {
        type: "ul",
        items: [
          "Quatre joueurs, quatre sacs, valises standard : Vito.",
          "Six à huit joueurs, ou sacs et grandes valises : Sprinter.",
          "Groupe mixte avec accompagnants non joueurs : comptez les sacs, pas les personnes.",
        ],
      },
      { type: "h2", text: "Caler le départ sur l'heure de jeu" },
      { type: "p", text: "Le trajet est court, l'aéroport non. En haute saison, comptez 20 à 45 minutes entre l'atterrissage et la sortie du terminal, puis 35 à 40 minutes de route. Un départ matinal le jour de l'arrivée n'est réaliste que pour les vols atterrissant avant 07h00 environ ; au-delà, prévoyez le premier parcours pour le lendemain matin." },
      { type: "h2", text: "Parcours et hôtels du secteur" },
      { type: "p", text: "Les resorts de Belek - parmi lesquels Regnum Carya, Gloria, Cornelia et Maxx Royal - se trouvent à quelques kilomètres les uns des autres et des parcours : un arrêt supplémentaire pour un partenaire logé ailleurs coûte des minutes et non une heure. Sur un transfert privé, c'est possible ; dans une navette partagée, vous ne décidez pas de l'ordre." },
      { type: "h2", text: "Ce qu'il faut confirmer à la réservation" },
      { type: "p", text: "Trois éléments : le nombre de sacs de golf, le nom de l'hôtel et l'heure de prise en charge retour si votre départ est connu. Le prix est fixe par véhicule : un véhicule plus grand pour les bagages est donc un devis que vous voyez avant de voyager, jamais un supplément au bord du trottoir." },
    ],
    faq: [
      ["Les sacs de golf coûtent-ils un supplément ?", "Non. Le prix est fixe par véhicule. Des bagages volumineux peuvent nous amener à envoyer un Sprinter plutôt qu'un Vito, et ce prix s'affiche lors de la réservation."],
      ["Combien de sacs de golf entrent dans un Vito ?", "En pratique, quatre sacs avec quatre passagers et des valises standard. Au-delà, nous utilisons un Sprinter."],
      ["Combien de temps dure le trajet de l'aéroport d'Antalya à Belek ?", "45 km, soit normalement 35 à 40 minutes en trafic habituel."],
      ["Peut-on s'arrêter à un second hôtel à Belek ?", "Oui. Les resorts sont proches les uns des autres : une dépose supplémentaire sur un transfert privé ne coûte que quelques minutes. Merci de le signaler à la réservation."],
    ],
  },
  "when-to-visit-antalya": {
    slug: "meilleure-periode-pour-antalya",
    title: "Quand partir à Antalya : saison par saison et ce que cela change au transfert",
    heading: "Quand visiter Antalya - et comment la saison change votre arrivée",
    description:
      "Antalya saison par saison : météo, affluence, prix et trafic aéroportuaire. Ce que chaque mois implique pour les horaires, la circulation et votre arrivée.",
    excerpt:
      "Chaque saison sur la Riviera turque offre une arrivée différente. Ce qui change entre avril et octobre, et pourquoi cela compte sur la route.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Antalya est animée environ sept mois et calme cinq, et la différence se manifeste bien avant la plage : sur les prix des vols, les files d'attente à l'aéroport et le trafic sur la D400." },
      { type: "h2", text: "Avril-mai : la fenêtre du bon rapport" },
      { type: "p", text: "La température de la mer grimpe au fil de mai, les maximales diurnes dépassent les vingt degrés et la route côtière est vide par rapport à l'été. Les vols atterrissent à des heures civilisées et le terminal se vide vite. C'est aussi la période où un trajet vers Alanya ou Kaş est un plaisir plutôt qu'une épreuve d'endurance." },
      { type: "h2", text: "Juin-août : le pic" },
      { type: "p", text: "Juillet et août sont chauds, pleins et chers. L'aéroport d'Antalya connaît son trafic le plus lourd, le contrôle des passeports et les bagages prennent le plus de temps, et la route côtière porte à la fois le trafic de vacances et les déplacements locaux du week-end. C'est là qu'un prix fixe et une prise en charge suivie sur le vol prouvent leur valeur : rien n'est prévisible sur la route, donc tout ce qui peut être figé à l'avance mérite de l'être." },
      { type: "h2", text: "Septembre-octobre : le meilleur compromis" },
      { type: "p", text: "La mer est à son maximum de chaleur, l'affluence baisse semaine après semaine et les prix reculent à partir de la mi-septembre. Beaucoup d'habitués considèrent la fin septembre comme la meilleure semaine de l'année sur cette côte. Les transferts retrouvent à peu près leurs durées nominales." },
      { type: "h2", text: "Novembre-mars : la saison calme" },
      { type: "p", text: "Les températures diurnes restent douces, de nombreux hôtels balnéaires ferment, et la ville, les montagnes et les sites antiques prennent le relais du littoral. L'offre de vols se réduit et les heures d'arrivée deviennent moins pratiques : c'est précisément le moment où un véhicule réservé à l'avance l'emporte sur l'improvisation au terminal." },
      { type: "h2", text: "Ce que la saison change à votre transfert" },
      {
        type: "ul",
        items: [
          "Plein été : prévoyez jusqu'à 45 minutes entre l'atterrissage et la sortie du terminal, et des temps de route plus longs à l'est de Manavgat.",
          "Intersaison : les durées annoncées sont réalistes.",
          "Hiver : moins de vols et plus d'atterrissages nocturnes, donc confirmez le numéro de vol et laissez la prise en charge le suivre.",
          "Toute l'année : le prix fixe par véhicule ne change ni avec la saison, ni avec le trafic, ni avec l'heure.",
        ],
      },
    ],
    faq: [
      ["Quel est le meilleur mois pour visiter Antalya ?", "La fin septembre offre généralement la meilleure combinaison : mer à son maximum de chaleur, affluence en baisse et prix déjà en recul."],
      ["L'aéroport d'Antalya est-il plus chargé l'été ?", "Nettement. En juillet et août, prévoyez jusqu'à 45 minutes entre l'atterrissage et la sortie du terminal ; en intersaison, c'est souvent la moitié."],
      ["Les prix des transferts varient-ils selon la saison ?", "Non. Nos prix sont fixes par véhicule et ne changent ni avec la saison, ni avec le trafic, ni avec l'heure."],
      ["Antalya vaut-elle le détour en hiver ?", "Oui, pour la ville, les montagnes et les sites archéologiques plutôt que pour la plage. Beaucoup d'hôtels du littoral ferment de novembre à mars."],
    ],
  },
};
