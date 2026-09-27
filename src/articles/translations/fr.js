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
  "antalya-in-autumn": {
    "slug": "que-faire-a-antalya-en-automne",
    "title": "Antalya en octobre et novembre : que faire en automne",
    "heading": "Antalya en automne : que faire en octobre et en novembre",
    "description": "Que faire à Antalya en automne, en octobre et novembre : mer encore chaude, plages calmes, sites antiques, canyons et golf. Météo, ce qui reste ouvert et votre arrivée.",
    "excerpt": "La mer est encore chaude, la foule est rentrée et la canicule est passée. Pourquoi octobre et novembre sont le secret le mieux gardé de la Riviera turque.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Que faire à Antalya en automne ? La plupart des vacanciers quittent la ville fin septembre, et c'est justement pour cela que l'automne est si agréable. La mer garde la chaleur de l'été pendant des semaines, les températures de la journée redescendent vers 20-25 °C, et les lieux insupportables en août – ruines, canyons, vieille ville – deviennent le meilleur moment du séjour."
      },
      {
        "type": "h2",
        "text": "La météo à Antalya en automne"
      },
      {
        "type": "table",
        "head": [
          "Mois",
          "Jour / nuit",
          "Mer",
          "Ressenti"
        ],
        "rows": [
          [
            "Octobre",
            "environ 27 °C / 16 °C",
            "environ 24 °C",
            "L'été sans la canicule – les journées plage restent la norme"
          ],
          [
            "Novembre",
            "environ 21 °C / 11 °C",
            "environ 21 °C",
            "Matinées ensoleillées, premières averses, soirées fraîches"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Prévoyez des affaires pour la plage et pour le soir : une veste légère suffit en octobre ; en novembre, une couche plus chaude et un imperméable sont conseillés."
      },
      {
        "type": "h2",
        "text": "Encore des vacances à la plage : octobre sur la côte"
      },
      {
        "type": "p",
        "text": "En octobre, les plages de Konyaaltı, Lara, Belek, Side et Alanya sont toujours ouvertes, l'eau est souvent plus chaude que l'air le matin et plus personne ne se bat pour les transats. La plupart des grands complexes de Belek, Side et Kemer restent ouverts jusqu'à fin octobre ; à partir de novembre, le choix se réduit, alors vérifiez les dates de saison de votre hôtel avant de réserver vos vols."
      },
      {
        "type": "h2",
        "text": "Les sites antiques sans la chaleur"
      },
      {
        "type": "p",
        "text": "L'automne est la saison des ruines de la région. Pergé et Aspendos ne sont qu'à un petit détour de la route de Belek et de Side, le temple d'Apollon de Side se dresse au bord du port, et Termessos, perché dans les montagnes derrière la ville, est une randonnée que personne ne devrait tenter en été. En novembre, vous aurez peut-être des rues entières de colonnades pour vous seul."
      },
      {
        "type": "h2",
        "text": "Nature : canyons, cascades et voie lycienne"
      },
      {
        "type": "ul",
        "items": [
          "Cascades de Düden : les chutes inférieures plongent directement dans la mer près de Lara, les chutes supérieures se trouvent dans un parc en ville.",
          "Canyon de Köprülü : la saison du rafting se prolonge généralement jusqu'en octobre, avec une eau plus calme qu'au printemps.",
          "Voie lycienne : l'automne et le printemps sont les deux saisons de randonnée – les étapes autour de Kemer, Olympos et Kaş sont alors à leur meilleur.",
          "Téléphérique du Tahtalı près de Kemer : l'air limpide de l'automne offre les plus belles vues depuis le sommet."
        ]
      },
      {
        "type": "h2",
        "text": "Golf, vie urbaine et festivals"
      },
      {
        "type": "p",
        "text": "L'automne est la haute saison du golf à Belek : les parcours sont verts, les températures idéales et les départs se remplissent de groupes venus d'Europe du Nord. En ville, les ruelles, cafés et petits musées de Kaleiçi reprennent vie une fois partis les croisiéristes et la foule estivale, et le Festival du film d'Antalya « Orange d'or » se tient traditionnellement à l'automne."
      },
      {
        "type": "h2",
        "text": "Arriver à Antalya en automne"
      },
      {
        "type": "ul",
        "items": [
          "Les vols restent nombreux en octobre ; à partir de novembre, les programmes s'allègent et davantage d'avions atterrissent tard le soir.",
          "Le terminal est plus calme qu'en été, et les temps de trajet vers Belek, Side et Alanya sont proches des durées annoncées.",
          "Un transfert réservé à l'avance suit votre numéro de vol : un vol du soir retardé n'est pas un problème.",
          "Nos prix sont fixes par véhicule et identiques en octobre et en août."
        ]
      }
    ],
    "faq": [
      [
        "Fait-il assez chaud pour se baigner à Antalya en octobre ?",
        "Oui. La mer tourne généralement autour de 24 °C en octobre, plus chaude que bien des mers européennes en été, et les journées à la plage restent la norme tout le mois."
      ],
      [
        "Les hôtels sont-ils ouverts à Antalya en novembre ?",
        "Les hôtels en ville et de nombreux complexes restent ouverts, mais plusieurs grands resorts du littoral ferment à partir de novembre. Vérifiez les dates de saison de votre hôtel avant de réserver vos vols."
      ],
      [
        "Que faire à Antalya en automne à part la plage ?",
        "Les sites antiques comme Pergé, Aspendos et Termessos, les cascades de Düden, le canyon de Köprülü, la randonnée sur la voie lycienne, le golf à Belek et la vieille ville de Kaleiçi."
      ],
      [
        "Le prix du transfert change-t-il après la saison estivale ?",
        "Non. Le prix est fixe par véhicule et ne varie ni selon la saison, ni selon la circulation, ni selon l'heure."
      ]
    ]
  },
  "antalya-in-winter": {
    "slug": "que-faire-a-antalya-en-hiver",
    "title": "Antalya en hiver : que faire de décembre à février",
    "heading": "Antalya en hiver : que faire entre décembre et février",
    "description": "Que faire à Antalya en hiver : vieille ville, cascades, sites antiques, ski à Saklıkent, golf d'hiver et hôtels spa. Météo, ce qui est ouvert et comment se déplacer.",
    "excerpt": "Des journées douces, de la neige sur les sommets et une ville rendue à ses habitants. Ce qu'Antalya offre de décembre à février – et ce qu'elle n'offre pas.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "L'hiver à Antalya, c'est la saison calme, pas la saison fermée. Les stations balnéaires se reposent, mais la ville, les montagnes et les sites antiques restent ouverts, la lumière est limpide et les journées sont souvent ensoleillées et douces. C'est le moment de découvrir la région comme ceux qui y vivent – et à des prix que les vacanciers d'été ne connaissent jamais."
      },
      {
        "type": "h2",
        "text": "La météo à Antalya en hiver"
      },
      {
        "type": "table",
        "head": [
          "Mois",
          "Jour / nuit",
          "Mer",
          "Bon à savoir"
        ],
        "rows": [
          [
            "Décembre",
            "environ 16 °C / 7 °C",
            "environ 19 °C",
            "Le mois le plus pluvieux, mais la pluie tombe par épisodes entre des journées de soleil"
          ],
          [
            "Janvier",
            "environ 15 °C / 6 °C",
            "environ 17 °C",
            "Le mois le plus frais ; neige sur les sommets du Taurus"
          ],
          [
            "Février",
            "environ 16 °C / 6 °C",
            "environ 17 °C",
            "Des journées plus longues, premiers amandiers en fleur"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Un après-midi d'hiver ensoleillé ressemble au printemps en Europe du Nord ; les soirées sont fraîches et les intérieurs ne sont pas toujours chauffés comme on en a l'habitude plus au nord. Prévoyez plusieurs couches, une veste imperméable et des chaussures confortables pour les rues pavées mouillées."
      },
      {
        "type": "h2",
        "text": "La ville : Kaleiçi, musées et cascades"
      },
      {
        "type": "ul",
        "items": [
          "Kaleiçi, la vieille ville fortifiée : la porte d'Hadrien, le minaret cannelé (Yivli Minare), le vieux port et des ruelles de maisons ottomanes devenues cafés et hôtels de charme.",
          "Musée d'Antalya : l'une des grandes collections archéologiques de Turquie, avec les statues de Pergé – idéal un jour de pluie.",
          "Cascades de Düden et de Kurşunlu : grâce aux pluies d'hiver, elles sont à leur débit maximal et les plus impressionnantes.",
          "Promenades de Konyaaltı et de Lara : longues balades, vélo et vue sur la mer sans la chaleur de l'été."
        ]
      },
      {
        "type": "h2",
        "text": "Des sites antiques sans file d'attente"
      },
      {
        "type": "p",
        "text": "Pergé, Aspendos et Side sont ouverts toute l'année, et en hiver vous les partagez avec une poignée de visiteurs. Phasélis, près de Kemer, compte trois ports au milieu d'une pinède ; Olympos et Çıralı sont paisibles hors saison. Termessos se trouve en montagne et peut être froid, humide, voire enneigé : choisissez un jour sec. Plus à l'ouest, l'église Saint-Nicolas de Demre est une visite toute trouvée en hiver, surtout à l'approche de Noël."
      },
      {
        "type": "h2",
        "text": "Ski et mer le même jour"
      },
      {
        "type": "p",
        "text": "La station de ski de Saklıkent, dans les monts Bakırlı, se trouve à environ 50 km de la ville, soit à peu près une heure et demie de route. Quand l'enneigement le permet, généralement de janvier à mars, vous pouvez skier le matin et vous promener au bord de la mer l'après-midi. La route de montagne peut exiger des pneus hiver ou des chaînes : vérifiez les conditions avant de partir et demandez-nous un devis pour le trajet à l'avance."
      },
      {
        "type": "h2",
        "text": "Golf d'hiver, hôtels spa et longs séjours"
      },
      {
        "type": "p",
        "text": "Les parcours de golf de Belek restent ouverts tout l'hiver, avec des green fees et des tarifs hôteliers bien inférieurs à ceux de l'automne et du printemps. Plusieurs complexes de Belek, Lara et Kemer gardent leur spa et leurs piscines intérieures ouverts en hiver, et Alanya et Side attirent des visiteurs d'Europe du Nord qui viennent pour des semaines, voire des mois de douceur."
      },
      {
        "type": "h2",
        "text": "Excursions plus lointaines"
      },
      {
        "type": "p",
        "text": "L'hiver se prête bien aux longues excursions, épuisantes en été : les travertins de Pamukkale et les ruines de Hiérapolis, ou la Cappadoce sous la neige, que beaucoup considèrent comme la plus belle saison là-bas. Ce sont deux longues journées de route, et un véhicule privé vous permet de vous arrêter où et quand vous le souhaitez."
      },
      {
        "type": "h2",
        "text": "Arriver à Antalya en hiver"
      },
      {
        "type": "ul",
        "items": [
          "Les vols directs sont moins nombreux et les arrivées de nuit plus fréquentes, souvent via Istanbul.",
          "De nombreux complexes du littoral sont fermés : vérifiez que votre hôtel est ouvert à vos dates.",
          "Les stations de taxis sont plus calmes la nuit qu'en été ; une prise en charge réservée à l'avance qui suit votre numéro de vol est l'option la plus sereine.",
          "Le prix fixe par véhicule est le même en hiver qu'en été – sans supplément de nuit ni de jour férié."
        ]
      }
    ],
    "faq": [
      [
        "Antalya vaut-elle le détour en hiver ?",
        "Oui, si vous venez pour la ville, les sites antiques, la nature et le golf plutôt que pour bronzer. Les journées sont souvent ensoleillées, autour de 15 °C, et il n'y a pas de foule."
      ],
      [
        "Peut-on se baigner à Antalya en hiver ?",
        "La mer reste autour de 17-19 °C, ce que certains visiteurs trouvent rafraîchissant par une journée ensoleillée. De nombreux hôtels ouverts en hiver disposent aussi de piscines intérieures chauffées."
      ],
      [
        "Peut-on skier près d'Antalya ?",
        "Oui. La station de ski de Saklıkent se trouve à environ 50 km de la ville. La saison dépend de l'enneigement et s'étend généralement de janvier à mars."
      ],
      [
        "Les hôtels d'Antalya sont-ils ouverts en hiver ?",
        "Les hôtels d'Antalya et de Kaleiçi sont ouverts toute l'année, tout comme plusieurs complexes de Lara, Belek, Kemer, Side et Alanya. Beaucoup de grands resorts saisonniers ferment de novembre à mars."
      ],
      [
        "Assurez-vous des transferts depuis l'aéroport d'Antalya en hiver ?",
        "Oui, toute l'année, y compris pour les arrivées de nuit et les jours fériés, au même prix fixe par véhicule."
      ]
    ]
  },
  "christmas-new-year-antalya": {
    "slug": "noel-et-nouvel-an-a-antalya",
    "title": "Noël et réveillon du Nouvel An à Antalya : guide pratique",
    "heading": "Noël et Nouvel An à Antalya",
    "description": "Passer Noël ou le réveillon du Nouvel An à Antalya : météo, hôtels ouverts, dîners de gala, Saint-Nicolas à Demre et trajets vers l'aéroport les soirs les plus chargés.",
    "excerpt": "Des journées ensoleillées, un gala du Nouvel An au bord de la mer et la ville de saint Nicolas à deux heures et demie de route. Comment préparer les fêtes à Antalya – et s'y rendre le soir J.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Noël et le Nouvel An à Antalya forment l'un des rares pics de l'hiver. Familles fuyant l'hiver du Nord, groupes venus fêter le réveillon et voyageurs qui associent les fêtes à quelques jours de soleil doux arrivent tous pendant la même quinzaine – alors que le reste de la côte vit sa saison calme."
      },
      {
        "type": "h2",
        "text": "À quoi s'attendre fin décembre"
      },
      {
        "type": "p",
        "text": "Les journées atteignent généralement 15-16 °C et sont souvent ensoleillées, même si décembre est aussi le mois le plus pluvieux de l'année. Noël n'est pas un jour férié en Turquie : commerces, restaurants et sites fonctionnent normalement le 25 décembre. Le réveillon du Nouvel An, en revanche, est largement fêté, et le 1er janvier est férié."
      },
      {
        "type": "h2",
        "text": "Quels hôtels sont ouverts"
      },
      {
        "type": "p",
        "text": "Les hôtels d'Antalya et de Kaleiçi sont ouverts toute l'année, et plusieurs complexes de Lara, Belek, Kemer, Side et Alanya ouvrent spécialement pour les fêtes avec un dîner de Noël et un gala du Nouvel An. Programmes, codes vestimentaires et suppléments gala varient beaucoup : demandez à votre hôtel ce qui est inclus avant de réserver. Les chambres des complexes ouverts partent vite pour ces dates."
      },
      {
        "type": "h2",
        "text": "Noël : la ville de saint Nicolas"
      },
      {
        "type": "p",
        "text": "Le saint Nicolas historique, l'évêque à l'origine de la légende du Père Noël, vivait à Myre – l'actuelle Demre, à environ deux heures et demie à l'ouest d'Antalya. L'église Saint-Nicolas et les tombeaux lyciens taillés dans la roche de Myre font une excursion de Noël mémorable, à combiner avec une halte à Kaş ou la route côtière autour de Kumluca."
      },
      {
        "type": "h2",
        "text": "Le réveillon du Nouvel An à Antalya"
      },
      {
        "type": "ul",
        "items": [
          "Galas d'hôtel : dîner, musique live et compte à rebours, généralement avec un menu fixe et un supplément.",
          "En ville : les restaurants de Kaleiçi et des abords du port de plaisance sont pleins ; réservez votre table à l'avance.",
          "Lara et Konyaaltı : beach clubs et restaurants avec vue sur la mer organisent leurs propres soirées.",
          "Des feux d'artifice sont visibles le long du front de mer, mais le programme change d'une année à l'autre."
        ]
      },
      {
        "type": "h2",
        "text": "Se déplacer les soirs les plus chargés"
      },
      {
        "type": "p",
        "text": "Le soir du réveillon et aux premières heures du 1er janvier, les taxis sont introuvables, et applis comme stations sont saturées au moment précis où tout le monde veut rentrer. Si vous fêtez le Nouvel An hors de votre hôtel – en ville, au restaurant ou dans la villa d'amis – réservez le retour à l'avance avec une heure de prise en charge fixe."
      },
      {
        "type": "h2",
        "text": "Arrivées et départs pendant les fêtes"
      },
      {
        "type": "ul",
        "items": [
          "Les vols autour du 20 décembre et du 2 janvier sont les plus chargés de l'hiver ; réservez tôt.",
          "Beaucoup de vols des fêtes atterrissent le soir ou la nuit – une prise en charge qui suit votre numéro de vol vous évite d'attendre au terminal.",
          "Familles avec cadeaux de Noël et bagages d'hiver : indiquez le nombre de valises pour que nous prévoyions le bon véhicule.",
          "Notre prix fixe par véhicule ne comporte aucun supplément pour les fêtes ni pour le réveillon."
        ]
      }
    ],
    "faq": [
      [
        "Quel temps fait-il à Antalya à Noël ?",
        "Doux : en général 15-16 °C en journée et 6-8 °C la nuit, avec des éclaircies entre les averses. Ce n'est pas un temps de plage, mais il est souvent agréable pour se promener et visiter."
      ],
      [
        "Fête-t-on Noël à Antalya ?",
        "Noël n'est pas un jour férié en Turquie, mais de nombreux hôtels accueillant une clientèle internationale organisent un dîner de Noël. Le réveillon du Nouvel An est largement fêté et le 1er janvier est férié."
      ],
      [
        "Où se trouve l'église Saint-Nicolas ?",
        "À Demre, l'antique Myre, à environ deux heures et demie de route à l'ouest d'Antalya. Elle se visite toute l'année."
      ],
      [
        "Puis-je réserver un transfert pour la nuit du réveillon ?",
        "Oui. Nous conseillons de réserver le retour avec une heure de prise en charge fixe, car les taxis sont très difficiles à trouver après minuit. Le prix fixe par véhicule ne comporte aucun supplément pour les fêtes."
      ]
    ]
  },
  "wintering-in-antalya": {
    "slug": "hiverner-a-antalya-guide-long-sejour",
    "title": "Hiverner à Antalya et Alanya : guide des longs séjours",
    "heading": "Passer l'hiver à Antalya : guide pour les longs séjours",
    "description": "Hiverner sur la Riviera turque : pourquoi Alanya, Side et Antalya séduisent les longs séjours, météo, logement, soins médicaux et arrivée avec beaucoup de bagages.",
    "excerpt": "Des semaines ou des mois de douceur au lieu de l'hiver du Nord. Ce qu'il faut savoir avant de passer l'hiver à Alanya, Side ou Antalya.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Chaque hiver, des milliers de visiteurs venus d'Allemagne, de Scandinavie, des Pays-Bas, de Russie et de Pologne troquent la grisaille contre la Riviera turque pour des semaines, voire des mois. Températures douces, longues promenades et coût de la vie inférieur à celui de chez eux font d'Antalya, Alanya et Side des destinations incontournables pour hiverner en Méditerranée."
      },
      {
        "type": "h2",
        "text": "Pourquoi passer l'hiver ici"
      },
      {
        "type": "ul",
        "items": [
          "Climat doux : des journées d'hiver autour de 15-17 °C, souvent ensoleillées, rarement de gel sur la côte.",
          "Lumière : nettement plus d'heures d'ensoleillement qu'en Europe du Nord et centrale.",
          "Espace : promenades, plages et vieilles villes sans la foule de l'été.",
          "Infrastructures : dans les grandes villes, commerces, marchés, restaurants et hôpitaux privés sont ouverts toute l'année."
        ]
      },
      {
        "type": "h2",
        "text": "Choisir où séjourner"
      },
      {
        "type": "table",
        "head": [
          "Lieu",
          "Idéal pour",
          "Distance de l'aéroport"
        ],
        "rows": [
          [
            "Antalya (ville)",
            "Vie urbaine, culture, musées, tous les services à portée de main",
            "environ 15 à 30 minutes"
          ],
          [
            "Side / Manavgat",
            "Une vieille ville tranquille, de longues plages, des balades sur le plat",
            "environ 1 heure"
          ],
          [
            "Alanya",
            "La plus grande communauté de longs séjours, promenades, vie hivernale animée",
            "environ 1 h 45"
          ],
          [
            "Kemer",
            "Montagne et mer, randonnée, une station plus petite",
            "environ 1 heure"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Alanya et ses quartiers voisins comme Mahmutlar et Oba réunissent la plus grande communauté d'hivernants, avec des clubs, des activités et des restaurants animés tout l'hiver. Side est plus calme ; Antalya convient à ceux qui veulent une vraie ville."
      },
      {
        "type": "h2",
        "text": "Hébergement : hôtels et appartements"
      },
      {
        "type": "p",
        "text": "Certains hôtels d'Alanya, Side et Antalya proposent des tarifs longs séjours à partir de quatre semaines, souvent en demi-pension. Un appartement en location offre plus d'espace et d'indépendance ; vérifiez qu'il dispose d'un chauffage ou d'une climatisation réversible, car les maisons de la côte turque sont conçues pour l'été et peuvent sembler froides les soirs d'hiver."
      },
      {
        "type": "h2",
        "text": "La vie au quotidien en hiver"
      },
      {
        "type": "ul",
        "items": [
          "Marchés hebdomadaires dans chaque quartier pour les fruits et légumes frais – l'hiver est la saison des agrumes.",
          "Marche et vélo le long des promenades d'Alanya, Side, Lara et Konyaaltı.",
          "Randonnée dans les contreforts du Taurus et sur la voie lycienne les jours secs.",
          "Excursions à la journée vers les sites antiques, la cascade de Manavgat ou la vieille ville d'Antalya.",
          "Hôpitaux privés et cliniques à Antalya et Alanya dotés de services pour patients internationaux."
        ]
      },
      {
        "type": "h2",
        "text": "Formalités et conseils pratiques"
      },
      {
        "type": "p",
        "text": "Les conditions d'entrée et la durée de séjour autorisée sans permis de résidence dépendent de votre nationalité et changent de temps à autre : vérifiez les règles en vigueur auprès des autorités turques officielles avant de partir. Une assurance voyage couvrant un long séjour à l'étranger est vivement recommandée."
      },
      {
        "type": "h2",
        "text": "Arriver avec des bagages pour plusieurs mois"
      },
      {
        "type": "p",
        "text": "Les hivernants voyagent avec plus qu'une simple valise de vacances. Indiquez-nous le nombre de valises et d'objets supplémentaires – vélos, déambulateurs ou cartons – et nous prévoirons un Mercedes Vito ou, si nécessaire, un Sprinter. Le prix est fixe par véhicule : les bagages supplémentaires sont pris en compte à la réservation, pas facturés au bord du trottoir. Le chauffeur vous aide à charger et décharger jusqu'à la porte."
      }
    ],
    "faq": [
      [
        "Où passer l'hiver sur la Riviera turque ?",
        "Alanya compte la plus grande communauté d'hivernants et la vie hivernale la plus animée ; Side est plus calme ; Antalya offre tous les services d'une grande ville. Les trois ont des hivers doux."
      ],
      [
        "Quelle température fait-il à Antalya en hiver ?",
        "En journée, il fait généralement 15-17 °C de décembre à février, avec des nuits autour de 6-8 °C. Le gel est rare sur la côte."
      ],
      [
        "Existe-t-il des offres d'hôtel pour les longs séjours en hiver ?",
        "Oui. Plusieurs hôtels d'Alanya, Side et Antalya proposent en hiver des tarifs mensuels ou longs séjours réduits. Renseignez-vous directement auprès de l'hôtel pour un séjour de quatre semaines ou plus."
      ],
      [
        "Peut-on emporter beaucoup de bagages lors du transfert aéroport ?",
        "Oui. Indiquez le nombre de valises et d'objets supplémentaires à la réservation et nous prévoirons un véhicule suffisamment spacieux. Le prix est par véhicule, sans frais par valise."
      ]
    ]
  },
  "antalya-in-spring": {
    "slug": "que-faire-a-antalya-au-printemps",
    "title": "Antalya au printemps : que faire de mars à mai",
    "heading": "Antalya au printemps : que faire entre mars et mai",
    "description": "Que faire à Antalya au printemps : fleurs d'oranger, randonnée sur la voie lycienne, rafting, vacances de Pâques et premiers bains. Météo mois par mois et arrivée.",
    "excerpt": "Des fleurs d'oranger dans les rues, de la neige sur les sommets et une mer qui se réchauffe de semaine en semaine. Pourquoi le printemps est la saison des vacances actives à Antalya.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Le printemps arrive tôt à Antalya et sur la Riviera turque. Dès mars, les orangers sont en fleur, les monts Taurus sont encore enneigés et il fait assez chaud pour s'installer en terrasse. C'est la meilleure saison pour marcher, pédaler et explorer, et en mai commencent les premières journées de plage de l'année."
      },
      {
        "type": "h2",
        "text": "La météo à Antalya au printemps"
      },
      {
        "type": "table",
        "head": [
          "Mois",
          "Jour / nuit",
          "Mer",
          "Idéal pour"
        ],
        "rows": [
          [
            "Mars",
            "environ 19 °C / 8 °C",
            "environ 17 °C",
            "Visites, randonnée, floraison"
          ],
          [
            "Avril",
            "environ 22 °C / 11 °C",
            "environ 18 °C",
            "Randonnée, rafting, vacances de Pâques"
          ],
          [
            "Mai",
            "environ 26 °C / 15 °C",
            "environ 21 °C",
            "Les premières journées de plage, toutes les activités"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Fleurs d'oranger et la ville au printemps"
      },
      {
        "type": "p",
        "text": "Au printemps, Antalya embaume la fleur d'oranger. La ville la célèbre avec le Carnaval de la fleur d'oranger, une fête de rue organisée au printemps autour de Kaleiçi et du centre-ville. C'est aussi le meilleur moment pour découvrir à pied la vieille ville, le musée d'Antalya et les falaises de Konyaaltı et de Lara avant l'arrivée des chaleurs estivales."
      },
      {
        "type": "h2",
        "text": "Vacances actives : randonnée, rafting et vélo"
      },
      {
        "type": "ul",
        "items": [
          "Voie lycienne : le printemps est la saison de randonnée la plus prisée, avec des fleurs sauvages le long des étapes près de Kemer, Olympos et Kaş.",
          "Canyon de Köprülü : la saison du rafting commence généralement en avril, avec des eaux vives grâce à la fonte des neiges.",
          "Téléphérique du Tahtalı : de la neige au sommet et des prairies fleuries en contrebas, souvent dans le même panorama.",
          "Vélo : routes tranquilles et températures douces autour de Belek, Side et des contreforts du Taurus.",
          "Golf : le printemps est la seconde haute saison sur les parcours de Belek."
        ]
      },
      {
        "type": "h2",
        "text": "Les sites antiques à la saison verte"
      },
      {
        "type": "p",
        "text": "Pergé, Aspendos, Side, Phasélis et Termessos sont au sommet de leur beauté au printemps, quand les ruines sont entourées d'herbe verte et de fleurs sauvages. Les longues excursions sont aussi agréables : Pamukkale et la Cappadoce offrent des températures clémentes, et les vols en montgolfière au-dessus de la Cappadoce sont fréquents au printemps quand la météo est stable."
      },
      {
        "type": "h2",
        "text": "Pâques et vacances de printemps"
      },
      {
        "type": "p",
        "text": "Pâques et les vacances scolaires de printemps en Allemagne, aux Pays-Bas, au Royaume-Uni et en Scandinavie amènent la première vague de familles. D'autres hôtels saisonniers ouvrent à partir d'avril, les vols se multiplient et, en mai, la plupart des complexes du littoral tournent à plein régime. Pour les dates de Pâques, réservez tôt hôtels et transferts."
      },
      {
        "type": "h2",
        "text": "Arriver à Antalya au printemps"
      },
      {
        "type": "ul",
        "items": [
          "En mars, certains complexes sont encore fermés ; à partir d'avril, le choix s'élargit rapidement.",
          "Le terminal et les routes sont calmes, les temps de trajet annoncés sont donc réalistes.",
          "Matériel de randonnée et de golf, vélos et sièges enfants sont à signaler lors de la réservation.",
          "Le prix est fixe par véhicule et ne change pas selon la saison."
        ]
      }
    ],
    "faq": [
      [
        "Fait-il assez chaud pour la plage à Antalya au printemps ?",
        "À partir de mai, oui : les journées atteignent environ 26 °C et la mer environ 21 °C. En mars et en avril, il fait assez chaud pour profiter du soleil, mais la mer reste fraîche pour la plupart des baigneurs."
      ],
      [
        "Quand a lieu le Carnaval de la fleur d'oranger à Antalya ?",
        "Il se tient au printemps, lorsque les orangers de la ville sont en fleur. Les dates changent chaque année : consultez les annonces officielles de la ville avant d'organiser votre voyage autour de l'événement."
      ],
      [
        "Le printemps est-il une bonne période pour randonner sur la voie lycienne ?",
        "Oui. Le printemps et l'automne sont les deux meilleures saisons de randonnée ; au printemps, les sentiers sont verts et couverts de fleurs sauvages, et les températures sont agréables."
      ],
      [
        "Les hôtels sont-ils ouverts à Antalya en mars ?",
        "Les hôtels en ville et certains complexes sont ouverts. De nombreux resorts saisonniers ouvrent courant avril, et en mai la majeure partie de la côte fonctionne à plein régime."
      ]
    ]
  },
  "cappadocia-winter-trip": {
    "slug": "cappadoce-en-hiver-depuis-antalya",
    "title": "La Cappadoce en hiver depuis Antalya : neige, montgolfières et route",
    "heading": "La Cappadoce en hiver : un voyage depuis Antalya",
    "description": "Cappadoce en hiver depuis Antalya : neige, météo, montgolfières, hôtels troglodytes, que voir et comment se passe en hiver la route de 540 km via Konya.",
    "excerpt": "Cheminées de fée sous la neige et montgolfières au-dessus d'une vallée blanche. Comment associer un séjour d'hiver à Antalya et la Cappadoce, et à quoi ressemble la route en hiver.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "La Cappadoce en hiver compte parmi les paysages les plus photographiés de Turquie : cheminées de fée et vallées sous la neige, hôtels troglodytes avec feu de cheminée et, par matin clair, montgolfières qui s'élèvent au-dessus d'un paysage tout blanc. Depuis Antalya, c'est un long mais magnifique voyage par la route, et le complément naturel d'un séjour d'hiver sur la côte."
      },
      {
        "type": "h2",
        "text": "La météo en hiver : un tout autre climat que sur la côte"
      },
      {
        "type": "p",
        "text": "La Cappadoce se trouve sur un haut plateau, à environ 1 000 mètres d'altitude ou plus : l'hiver y est donc un vrai hiver. En journée, les températures avoisinent souvent zéro, les nuits descendent bien en dessous et la neige est fréquente de décembre à février. Prévoyez un vrai manteau d'hiver, des gants, un bonnet et des chaussures imperméables : la tenue qui convient à Antalya en janvier ne suffit pas ici."
      },
      {
        "type": "table",
        "head": [
          "",
          "Côte d'Antalya",
          "Cappadoce"
        ],
        "rows": [
          [
            "Journée d'hiver type",
            "environ 15 °C",
            "autour de 0-5 °C"
          ],
          [
            "Nuits d'hiver",
            "environ 6-8 °C",
            "souvent sous zéro"
          ],
          [
            "Neige",
            "uniquement sur les sommets",
            "fréquente de décembre à février"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Les montgolfières en hiver"
      },
      {
        "type": "p",
        "text": "Les montgolfières volent toute l'année quand la météo le permet, et un vol au lever du soleil au-dessus des vallées enneigées est l'image que beaucoup viennent chercher. L'hiver entraîne aussi davantage d'annulations à cause du vent, du brouillard ou de la neige, et la décision est prise par les autorités tôt chaque matin. Prévoyez au moins deux nuits en Cappadoce, pour qu'un vol annulé ne signifie pas y renoncer complètement."
      },
      {
        "type": "h2",
        "text": "Que voir en hiver"
      },
      {
        "type": "ul",
        "items": [
          "Musée en plein air de Göreme : des églises rupestres ornées de fresques, plus calmes en hiver qu'à tout autre moment de l'année.",
          "Villes souterraines comme Derinkuyu et Kaymaklı : plusieurs niveaux de profondeur et une température agréable et constante, quel que soit le temps dehors.",
          "Le château d'Uçhisar et les points de vue au-dessus de Göreme : les meilleurs endroits pour des panoramas enneigés.",
          "Courtes balades dans les vallées Rose, Rouge et de l'Amour par temps sec et clair ; les sentiers peuvent être verglacés après la neige.",
          "Hôtels troglodytes : beaucoup sont chauffés et ont une cheminée, et c'est en hiver qu'ils sont les plus magiques."
        ]
      },
      {
        "type": "h2",
        "text": "La route depuis Antalya"
      },
      {
        "type": "p",
        "text": "Le trajet fait environ 540 km et dure en général 7 à 8 heures : on franchit les monts Taurus, puis on traverse le plateau via Konya. Konya et son musée Mevlana sont une étape toute trouvée pour couper le voyage. En hiver, la partie montagneuse peut être enneigée et verglacée ; les routes sont dégagées, mais un véhicule équipé pour l'hiver et un chauffeur qui connaît l'itinéraire font la différence entre une longue journée et une journée stressante."
      },
      {
        "type": "h2",
        "text": "Comment organiser le voyage"
      },
      {
        "type": "ul",
        "items": [
          "Comptez au moins deux nuits, idéalement trois, pour pallier les annulations de montgolfières et les journées d'hiver courtes.",
          "Quittez Antalya le matin pour traverser la montagne de jour.",
          "Associez le voyage à un séjour sur la côte : quelques jours à Antalya ou à Side, puis la Cappadoce, ou l'inverse.",
          "Réservez tôt l'hôtel troglodyte et un éventuel vol en montgolfière pour la période de Noël et du Nouvel An."
        ]
      },
      {
        "type": "h2",
        "text": "Transfert entre Antalya et la Cappadoce"
      },
      {
        "type": "p",
        "text": "Nous assurons des transferts privés depuis l'aéroport d'Antalya et les hôtels de la côte vers la Cappadoce, en aller simple ou avec un retour à une date ultérieure. Le prix est fixe par véhicule, vous pouvez vous arrêter pour les photos, les repas et une visite de Konya, et il n'y a pas d'autres passagers à attendre. Indiquez-nous votre hôtel et vos dates lors de la réservation."
      }
    ],
    "faq": [
      [
        "Quelle distance entre Antalya et la Cappadoce ?",
        "Environ 540 km par la route. Le trajet dure en général 7 à 8 heures via Konya, un peu plus avec des arrêts ou par temps de neige."
      ],
      [
        "La Cappadoce en hiver, ça vaut le coup ?",
        "Oui. La neige sur les cheminées de fée, des sites tranquilles et des hôtels troglodytes douillets font de l'hiver l'une des plus belles saisons là-bas. Emportez des vêtements chauds : il fait bien plus froid que sur la côte."
      ],
      [
        "Les montgolfières volent-elles en Cappadoce en hiver ?",
        "Oui, dès que la météo le permet. Les annulations sont plus fréquentes en hiver : prévoyez au moins deux nuits pour avoir une seconde chance."
      ],
      [
        "Peut-on aller d'Antalya en Cappadoce en transfert privé ?",
        "Oui. Nous proposons des transferts privés depuis l'aéroport d'Antalya et les hôtels de la côte vers la Cappadoce, en aller simple ou aller-retour, à prix fixe par véhicule."
      ]
    ]
  },
  "belek-winter-golf": {
    "slug": "golf-en-hiver-a-belek",
    "title": "Golf en hiver à Belek : jouer sur la Riviera turque de novembre à mars",
    "heading": "Le golf en hiver à Belek",
    "description": "Pourquoi Belek est une destination de golf en hiver : météo de novembre à mars, état des parcours, green fees réduits, quoi emporter et venir à Belek avec ses sacs de golf.",
    "excerpt": "Journées douces, fairways verts et départs moins chargés. Ce que les golfeurs doivent savoir pour jouer à Belek entre novembre et mars, quand les parcours chez eux sont fermés.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Quand les parcours d'Europe du Nord sont gelés, détrempés ou fermés, le golf en hiver continue à Belek. Le pôle de parcours de championnat situé à 45 km à l'est de l'aéroport d'Antalya reste ouvert tout l'hiver, et les mois de novembre à mars sont devenus une saison à part entière pour les golfeurs qui ne veulent pas s'arrêter entre octobre et avril."
      },
      {
        "type": "h2",
        "text": "Quel temps fait-il sur le parcours"
      },
      {
        "type": "table",
        "head": [
          "Mois",
          "Journée type",
          "Sur le parcours"
        ],
        "rows": [
          [
            "Novembre",
            "environ 21 °C",
            "Excellentes conditions, encore la haute saison d'automne"
          ],
          [
            "Décembre - janvier",
            "environ 15-16 °C",
            "Doux et souvent ensoleillé, avec quelques jours de pluie"
          ],
          [
            "Février",
            "environ 16 °C",
            "Les jours rallongent, moins de jours de pluie"
          ],
          [
            "Mars",
            "environ 19 °C",
            "Le début de la haute saison de printemps"
          ]
        ]
      },
      {
        "type": "p",
        "text": "La plupart des journées d'hiver se jouent avec un simple pull léger. La pluie tombe plutôt par courtes averses que pendant des semaines entières, et les parcours sont conçus pour drainer rapidement. Les matinées peuvent être fraîches et la lumière baisse dès la fin d'après-midi : les départs sont donc généralement plus tôt qu'en été."
      },
      {
        "type": "h2",
        "text": "Pourquoi l'hiver est rentable"
      },
      {
        "type": "ul",
        "items": [
          "Les green fees et les tarifs hôteliers sont généralement plus bas en décembre, janvier et février qu'en automne et au printemps.",
          "Les feuilles de départ sont moins chargées : les parties vont plus vite et les créneaux préférés sont plus faciles à obtenir.",
          "Plusieurs hôtels de golf restent ouverts tout l'hiver, beaucoup avec piscine intérieure et spa pour l'après-midi.",
          "Les vols courts depuis la majeure partie de l'Europe rendent un long week-end aussi réaliste qu'une semaine complète."
        ]
      },
      {
        "type": "h2",
        "text": "Parcours et hôtels en hiver"
      },
      {
        "type": "p",
        "text": "Tous les parcours et hôtels de Belek ne suivent pas le même calendrier en hiver, et des travaux d'entretien comme le carottage ou le sursemis sont parfois prévus pendant les mois calmes. Lors de la réservation, demandez quels parcours sont ouverts à vos dates et si des travaux sont programmés. Les hôtels de golf organisent généralement les heures de départ et les navettes vers leurs parcours partenaires."
      },
      {
        "type": "h2",
        "text": "Que mettre dans sa valise pour le golf en hiver"
      },
      {
        "type": "ul",
        "items": [
          "Des couches : un sous-vêtement technique, un pull et un haut coupe-vent pour les matinées fraîches.",
          "Veste et pantalon imperméables pour les averses occasionnelles.",
          "Gants ou moufles d'hiver entre les coups, en plus des gants de golf habituels.",
          "Protection solaire : le soleil d'hiver reste fort par temps clair."
        ]
      },
      {
        "type": "h2",
        "text": "Venir à Belek avec ses sacs de golf"
      },
      {
        "type": "p",
        "text": "De l'aéroport d'Antalya à Belek, comptez 35 à 40 minutes de route, et en hiver le terminal est calme : une partie l'après-midi du jour d'arrivée est donc souvent réaliste. Le prix est fixe par véhicule, pas par sac : en règle générale, un Mercedes Vito accueille quatre joueurs avec quatre sacs de golf et leurs bagages, et les groupes plus nombreux voyagent en Sprinter. Indiquez-nous le nombre de sacs lors de la réservation."
      }
    ],
    "faq": [
      [
        "Peut-on jouer au golf à Belek en hiver ?",
        "Oui. Les parcours de Belek restent ouverts tout l'hiver, avec des températures diurnes typiques d'environ 15-16 °C en décembre et janvier, et la plupart des jours sont jouables."
      ],
      [
        "Le golf est-il moins cher à Belek en hiver ?",
        "Les green fees et les tarifs hôteliers sont généralement plus bas en décembre, janvier et février qu'aux hautes saisons d'automne et de printemps. Les prix exacts dépendent du parcours et de l'hôtel."
      ],
      [
        "Quel est le meilleur mois pour jouer au golf à Belek ?",
        "Octobre-novembre et mars-avril sont les mois phares du golf. L'hiver est plus calme et moins cher, avec des journées un peu plus fraîches."
      ],
      [
        "Les sacs de golf sont-ils facturés en plus pour le transfert ?",
        "Non. Le prix est fixe par véhicule. Pour davantage de sacs, nous attribuons un véhicule plus grand, et vous voyez ce prix au moment de réserver."
      ]
    ]
  },
  "saklikent-ski-antalya": {
    "slug": "ski-pres-d-antalya-saklikent",
    "title": "Skier près d'Antalya : guide de la station de ski de Saklıkent",
    "heading": "Skier près d'Antalya : la station de Saklıkent",
    "description": "Skier près d'Antalya à Saklıkent : où se trouve la station, durée du trajet, dates de la saison, les pistes et comment combiner ski et mer dans la même journée.",
    "excerpt": "Le ski le matin, la promenade au bord de la mer l'après-midi. Un guide pratique de Saklıkent, la station de ski d'Antalya, et comment s'y rendre depuis la côte.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Rares sont les régions de vacances où l'on peut skier et se promener au bord de la mer le même jour. Antalya le permet : la station de ski de Saklıkent se trouve dans les monts Bakırlı, à environ 50 km de la ville, et par une belle journée d'hiver vous pouvez être sur les pistes le matin et de retour sur le front de mer pour le coucher du soleil."
      },
      {
        "type": "h2",
        "text": "Où se trouve Saklıkent"
      },
      {
        "type": "p",
        "text": "La station est située à environ 1 900 mètres d'altitude, sur les pentes des monts Bakırlı, à l'ouest d'Antalya. Depuis la ville, le trajet prend environ une heure et demie : on monte des orangeraies à la forêt de pins, puis à la neige. Par temps clair, la vue depuis le sommet porte jusqu'à la côte et à la mer."
      },
      {
        "type": "h2",
        "text": "Quand dure la saison"
      },
      {
        "type": "p",
        "text": "La saison de ski dépend entièrement de l'enneigement et s'étend généralement de janvier à mars. Certains hivers, elle commence plus tôt ou se termine plus vite : vérifiez l'enneigement et l'état des remontées avant d'organiser une journée autour."
      },
      {
        "type": "h2",
        "text": "À quoi s'attendre sur les pistes"
      },
      {
        "type": "ul",
        "items": [
          "Une petite station décontractée, idéale pour les débutants, les familles et une journée de ski pendant des vacances sur la côte plutôt que pour une semaine de ski complète.",
          "Le matériel de ski et de snowboard se loue généralement sur place ; vérifiez les horaires avant de partir.",
          "La luge et les jeux dans la neige sont très appréciés des familles, surtout le week-end.",
          "Le week-end, les visiteurs locaux sont nombreux ; en semaine, c'est beaucoup plus calme."
        ]
      },
      {
        "type": "h2",
        "text": "Ski et mer dans la même journée"
      },
      {
        "type": "ul",
        "items": [
          "Quittez la côte tôt le matin pour arriver à l'ouverture des remontées.",
          "Skiez ou jouez dans la neige jusqu'en début d'après-midi.",
          "Redescendez pour un déjeuner tardif à Kaleiçi ou une promenade sur la plage de Konyaaltı.",
          "Prévoyez des vêtements de rechange : l'écart de température entre les pistes et la côte peut atteindre 15 degrés ou plus."
        ]
      },
      {
        "type": "h2",
        "text": "S'y rendre : la route de montagne en hiver"
      },
      {
        "type": "p",
        "text": "Il n'y a pas de transports en commun réguliers jusqu'à la station, et la dernière partie de la route de montagne peut être enneigée et verglacée. Des pneus hiver ou des chaînes peuvent être obligatoires. Un transfert privé vous conduit de votre hôtel à Antalya, Kemer, Belek ou Side jusqu'aux pistes et retour, et c'est vous qui décidez du temps passé en montagne. Ce trajet ne fait pas partie de nos itinéraires standard : envoyez-nous votre hôtel, la date et la taille du groupe, et nous vous indiquerons un prix fixe par véhicule."
      },
      {
        "type": "h2",
        "text": "Autres options de ski depuis Antalya"
      },
      {
        "type": "p",
        "text": "Pour un séjour de ski plus long, Davraz, près d'Isparta, est une station plus grande avec davantage de pistes, à environ deux heures et demie à trois heures de route d'Antalya. Saklıkent reste le choix le plus simple pour une journée dans la neige pendant un séjour sur la côte."
      }
    ],
    "faq": [
      [
        "Peut-on skier près d'Antalya ?",
        "Oui. La station de ski de Saklıkent se trouve à environ 50 km de la ville d'Antalya, soit environ une heure et demie de route, dans les monts Bakırlı."
      ],
      [
        "Quand a lieu la saison de ski à Saklıkent ?",
        "Cela dépend de l'enneigement. La saison s'étend généralement de janvier à mars ; vérifiez les conditions actuelles avant de partir."
      ],
      [
        "Peut-on skier et se baigner le même jour à Antalya ?",
        "Vous pouvez skier le matin et être au bord de la mer l'après-midi. La baignade en hiver est réservée aux courageux : la mer est à environ 17 °C."
      ],
      [
        "Comment aller à Saklıkent depuis mon hôtel ?",
        "Il n'y a pas de transports en commun réguliers. Nous pouvons vous proposer un transfert privé aller-retour entre votre hôtel et la station, à prix fixe par véhicule."
      ]
    ]
  },
  "pamukkale-trip-from-antalya": {
    "slug": "excursion-pamukkale-depuis-antalya",
    "title": "Excursion à Pamukkale depuis Antalya : à la journée ou avec une nuit sur place",
    "heading": "Pamukkale depuis Antalya : bien préparer l'excursion",
    "description": "Excursion à Pamukkale depuis Antalya : distance et temps de route, aller-retour dans la journée ou nuit sur place, travertins, Hiérapolis, piscine antique et meilleure saison.",
    "excerpt": "Des terrasses de travertin blanc, une cité romaine sur la colline et une piscine parmi les colonnes antiques. Comment visiter Pamukkale depuis Antalya sans passer la journée dans un car.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Une excursion à Pamukkale depuis Antalya mène à l'un des sites les plus célèbres de Türkiye : des terrasses de travertin blanc remplies d'une eau tiède et riche en minéraux, dominées par les ruines de la cité romaine de Hiérapolis. Depuis Antalya, comptez environ 245 km de route, soit trois heures à trois heures et demie dans chaque sens – assez proche pour un aller-retour dans la journée, mais assez loin pour qu'une nuit sur place rende la visite bien plus détendue."
      },
      {
        "type": "h2",
        "text": "Que voir à Pamukkale ?"
      },
      {
        "type": "ul",
        "items": [
          "Les travertins : on marche pieds nus sur les terrasses, dans une eau tiède et peu profonde – les chaussures sont interdites sur la surface blanche.",
          "Hiérapolis : une grande cité romaine avec un théâtre, une rue monumentale et l'une des plus vastes nécropoles antiques d'Anatolie.",
          "La piscine antique : baignade dans une eau thermale chaude, entre des colonnes antiques effondrées (billet séparé).",
          "Le musée archéologique de Hiérapolis : les trouvailles du site, installées dans les anciens thermes romains.",
          "Laodicée : à peu de distance en voiture, une autre grande cité antique, beaucoup moins fréquentée."
        ]
      },
      {
        "type": "h2",
        "text": "À la journée ou avec une nuit sur place ?"
      },
      {
        "type": "table",
        "head": [
          "",
          "Aller-retour dans la journée",
          "Avec une nuit sur place"
        ],
        "rows": [
          [
            "Temps de route",
            "6-7 heures dans la même journée",
            "Réparti sur deux jours"
          ],
          [
            "Temps sur le site",
            "3-4 heures, généralement en milieu de journée",
            "Fin d'après-midi et tôt le matin"
          ],
          [
            "Affluence",
            "Arrivée en même temps que les cars d'excursion",
            "Coucher de soleil et matinée avec beaucoup moins de monde"
          ],
          [
            "Pour qui ?",
            "Voyageurs pressés",
            "Familles, photographes, tous ceux qui veulent se baigner"
          ]
        ]
      },
      {
        "type": "p",
        "text": "La plupart des excursions en groupe arrivent vers midi, quand les terrasses sont les plus fréquentées et qu'en été la surface blanche est éblouissante et brûlante. Une nuit à Pamukkale ou dans le village thermal de Karahayıt permet de voir les travertins au coucher du soleil, puis de nouveau dans le calme du matin."
      },
      {
        "type": "h2",
        "text": "Quand partir à Pamukkale ?"
      },
      {
        "type": "p",
        "text": "Le printemps et l'automne sont les saisons les plus agréables : températures douces pour arpenter Hiérapolis et eau plaisante sur les terrasses. L'hiver est frais, parfois avec du gel, mais l'eau chaude fume dans l'air froid et le site est au plus calme. En juillet et en août, la chaleur de midi et la réverbération sur les terrasses blanches peuvent être intenses – venez tôt le matin ou en fin de journée."
      },
      {
        "type": "h2",
        "text": "En chemin : le lac de Salda et le Taurus"
      },
      {
        "type": "p",
        "text": "La route quitte la côte, franchit les monts Taurus puis traverse la région des lacs. Le lac de Salda, avec ses rives blanches et son eau turquoise, ne demande qu'un petit détour et c'est un arrêt photo très apprécié. Avec un véhicule privé, vous décidez où vous arrêter et combien de temps – ce qu'aucune excursion en car ne peut offrir."
      },
      {
        "type": "h2",
        "text": "Transfert privé vers Pamukkale"
      },
      {
        "type": "p",
        "text": "Nous assurons des transferts privés vers Pamukkale depuis l'aéroport d'Antalya et les hôtels de la côte, en aller simple ou avec un retour à une date ultérieure. Le prix est fixe par véhicule : pour une famille ou un petit groupe, il revient souvent à peu près au même que plusieurs billets d'excursion en car – sans les ramassages dans les hôtels, l'horaire imposé ni les arrêts shopping."
      }
    ],
    "faq": [
      [
        "Quelle distance entre Antalya et Pamukkale ?",
        "Environ 245 km par la route. Le trajet dure en général trois heures à trois heures et demie dans chaque sens."
      ],
      [
        "Peut-on faire Pamukkale dans la journée depuis Antalya ?",
        "Oui, mais cela représente 6-7 heures de route dans la même journée. Une nuit à Pamukkale ou à Karahayıt rend la visite plus détendue et permet de voir les terrasses sans la foule."
      ],
      [
        "Peut-on se baigner à Pamukkale ?",
        "On peut marcher pieds nus dans les bassins peu profonds des travertins. La baignade est possible dans la piscine antique, alimentée en eau thermale chaude, avec un billet séparé."
      ],
      [
        "Quelle est la meilleure période pour visiter Pamukkale ?",
        "Le printemps et l'automne sont les plus agréables. L'hiver est calme et plein d'atmosphère ; en été, mieux vaut venir tôt le matin ou en fin d'après-midi."
      ]
    ]
  },
  "demre-myra-st-nicholas": {
    "slug": "demre-myra-eglise-saint-nicolas",
    "title": "Demre et Myra : visiter l'église Saint-Nicolas depuis Antalya",
    "heading": "Demre, Myra et l'église Saint-Nicolas",
    "description": "Excursion d'Antalya à Demre, l'antique Myra : l'église Saint-Nicolas, les tombeaux lyciens rupestres, Andriake et Kekova, temps de route et conseils pour l'hiver ou Noël.",
    "excerpt": "La ville du vrai Père Noël se trouve à deux heures et demie d'Antalya. Que voir à Demre et à Myra, et comment en faire une belle journée le long de la côte.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Bien avant de devenir le Père Noël, saint Nicolas fut évêque de Myra, une cité lycienne sur la côte à l'ouest d'Antalya. La ville s'appelle aujourd'hui Demre, et l'église Saint-Nicolas où il officia, les tombeaux lyciens taillés dans la roche et le port antique en font l'une des plus belles excursions au départ d'Antalya – surtout en décembre."
      },
      {
        "type": "h2",
        "text": "Qui était saint Nicolas de Myre ?"
      },
      {
        "type": "p",
        "text": "Nicolas vécut au IVe siècle et devint célèbre pour ses gestes de générosité discrets, en particulier envers les enfants et les pauvres. Sa fête, le 6 décembre, est encore célébrée dans toute l'Europe, et les légendes qui l'entourent ont donné naissance, au fil des siècles, au personnage du Père Noël. Myra, dont il était l'évêque, devint un important lieu de pèlerinage."
      },
      {
        "type": "h2",
        "text": "Que voir à Demre ?"
      },
      {
        "type": "ul",
        "items": [
          "L'église Saint-Nicolas : une église byzantine avec des fresques, des sols en mosaïque et le sarcophage traditionnellement attribué au saint.",
          "Les tombeaux rupestres de Myra : des tombes lyciennes en forme de maison, taillées dans la falaise au-dessus d'un grand théâtre romain.",
          "Andriake : le port antique de Myra, avec un grenier restauré qui abrite le musée des Civilisations lyciennes.",
          "Kekova : depuis le village voisin d'Üçağız, les bateaux longent la cité antique en partie engloutie et le village fortifié de Kaleköy (moins de départs en hiver)."
        ]
      },
      {
        "type": "h2",
        "text": "Y aller : la route côtière vers l'ouest"
      },
      {
        "type": "p",
        "text": "Demre se trouve à environ deux heures et demie d'Antalya par l'une des plus belles routes côtières du pays, via Kemer, les montagnes autour d'Olympos, Kumluca et Finike. La route est bonne toute l'année, mais elle serpente dans la montagne : prévoyez du temps pour les arrêts et ne partez pas au pas de course."
      },
      {
        "type": "h2",
        "text": "Une journée le long de la côte"
      },
      {
        "type": "ul",
        "items": [
          "Matin : départ tôt d'Antalya et pause panorama sur la côte près d'Olympos.",
          "Fin de matinée : l'église Saint-Nicolas avant l'arrivée des groupes.",
          "Midi : les tombeaux rupestres et le théâtre de Myra, puis déjeuner à Demre ou à Andriake.",
          "Après-midi : sortie en bateau à Kekova en saison, ou route vers Kaş pour y passer la nuit.",
          "Soir : retour à Antalya, ou prolongation par quelques jours à Kaş."
        ]
      },
      {
        "type": "h2",
        "text": "Visiter en hiver et à Noël"
      },
      {
        "type": "p",
        "text": "Décembre est une période particulièrement chargée d'atmosphère : le 6 décembre, c'est la Saint-Nicolas, et autour de Noël de nombreux voyageurs combinent un séjour à Antalya avec une visite de la ville du saint. Les journées d'hiver sont douces mais courtes, alors partez tôt. Les sites sont ouverts toute l'année, tandis que les sorties en bateau à Kekova dépendent de la météo et de la saison."
      },
      {
        "type": "h2",
        "text": "Transfert privé vers Demre"
      },
      {
        "type": "p",
        "text": "Nous assurons des transferts privés depuis Antalya et les stations balnéaires de la côte ouest vers Kumluca, Demre et Kaş. Avec un véhicule privé, vous choisissez les arrêts et le rythme, et le prix est fixe par véhicule, pas par personne. À la réservation, indiquez-nous votre hôtel, la date et si vous souhaitez un retour le jour même."
      }
    ],
    "faq": [
      [
        "Quelle distance entre Antalya et Demre ?",
        "Demre, l'antique Myra, se trouve à environ deux heures et demie de route d'Antalya par la route côtière, via Kemer, Kumluca et Finike."
      ],
      [
        "L'église Saint-Nicolas est-elle ouverte toute l'année ?",
        "Oui. L'église Saint-Nicolas et le site antique de Myra sont ouverts aux visiteurs toute l'année."
      ],
      [
        "Quand fête-t-on la Saint-Nicolas ?",
        "La Saint-Nicolas est fêtée le 6 décembre. Décembre, période de Noël comprise, est un moment prisé pour visiter Demre."
      ],
      [
        "Peut-on visiter Demre et Kekova dans la même journée ?",
        "Oui, pendant la saison des bateaux, à condition de partir tôt. En hiver, les bateaux sont moins nombreux : renseignez-vous sur place sur la météo et les horaires."
      ]
    ]
  },
  "lycian-way-spring-hiking": {
    "slug": "randonnee-voie-lycienne-antalya",
    "title": "Randonnée sur la Voie lycienne près d'Antalya : les plus belles étapes au printemps",
    "heading": "Randonnée sur la Voie lycienne au départ d'Antalya",
    "description": "Randonnée sur la Voie lycienne près d'Antalya : meilleure saison, étapes autour de Kemer, Olympos, Adrasan et Kaş, que mettre dans son sac et comment rejoindre le départ.",
    "excerpt": "Ruines antiques, forêts de pins et vues sur la mer le long de l'un des grands sentiers de randonnée au monde. Quelles étapes faire depuis Antalya, et à quelle saison.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "La Voie lycienne est un sentier de grande randonnée balisé de plus de 500 km entre Fethiye et Antalya, qui suit d'anciens chemins, des sentiers muletiers et des voies romaines le long de la côte et à travers les montagnes de l'antique Lycie. Pas besoin de plusieurs semaines pour faire de la randonnée sur la Voie lycienne : beaucoup de ses plus belles étapes sont faciles d'accès depuis Antalya et se prêtent parfaitement à des sorties à la journée ou à de courts séjours de randonnée."
      },
      {
        "type": "h2",
        "text": "Quand randonner : printemps et automne"
      },
      {
        "type": "table",
        "head": [
          "Saison",
          "Conditions",
          "Verdict"
        ],
        "rows": [
          [
            "Mars - mai",
            "Journées douces, collines vertes, fleurs sauvages, sources bien remplies",
            "La meilleure saison"
          ],
          [
            "Juin - août",
            "Très chaud, peu d'ombre sur de nombreuses étapes, sources à sec",
            "Seulement tôt le matin ou pour de courtes marches"
          ],
          [
            "Septembre - novembre",
            "Mer chaude, temps stable, plus frais à partir de fin octobre",
            "La deuxième meilleure saison"
          ],
          [
            "Décembre - février",
            "Doux sur la côte, épisodes pluvieux, neige sur les cols élevés",
            "Possible sur les étapes côtières basses"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Les étapes près d'Antalya"
      },
      {
        "type": "ul",
        "items": [
          "Göynük - secteur de Kemer : chemins forestiers et vues sur le canyon, tout près des stations de Kemer.",
          "Çıralı et Olympos : une étape côtière entre les ruines d'Olympos et les flammes éternelles de la Chimère.",
          "Adrasan - Olympos : l'un des tronçons les plus spectaculaires, avec falaises, criques et larges panoramas sur la mer.",
          "Autour de Kaş : sentiers côtiers avec tombeaux lyciens, petites baies et l'île grecque de Meis (Kastellorizo) au large.",
          "Phaselis : balades plus courtes autour de la cité antique et de ses trois ports, idéales pour une première découverte."
        ]
      },
      {
        "type": "h2",
        "text": "Préparer sa randonnée"
      },
      {
        "type": "p",
        "text": "Le sentier est balisé en rouge et blanc, mais certains tronçons sont accidentés, rocailleux et raides, et le balisage peut être irrégulier. Munissez-vous d'une bonne carte ou d'une trace GPS, marchez à deux si possible et indiquez votre itinéraire à quelqu'un. Sur de nombreuses étapes, il n'y a ni commerce ni point d'eau entre les villages : partez tôt et emportez plus d'eau que vous ne le pensez nécessaire."
      },
      {
        "type": "h2",
        "text": "Que mettre dans son sac ?"
      },
      {
        "type": "ul",
        "items": [
          "Chaussures de randonnée ou chaussures de trail robustes – le calcaire est coupant et instable par endroits.",
          "Au moins deux litres d'eau par personne, plus des en-cas.",
          "Chapeau, crème solaire et une couche légère à manches longues, même au printemps.",
          "Un coupe-vent ou une veste de pluie pour les passages en montagne et la météo changeante du printemps.",
          "Une petite trousse de premiers secours et un téléphone chargé avec une carte hors ligne."
        ]
      },
      {
        "type": "h2",
        "text": "Rejoindre le sentier et en revenir"
      },
      {
        "type": "p",
        "text": "La plupart des étapes commencent et se terminent dans des villages difficiles d'accès en transports en commun, et une randonnée en aller simple vous fait arriver ailleurs qu'au point de départ. Un transfert privé vous conduit de l'aéroport d'Antalya ou de votre hôtel jusqu'au début de votre étape et peut venir vous chercher à l'arrivée. Le prix est fixe par véhicule, ce qui convient bien aux groupes de randonneurs ; indiquez-nous vos points de départ et d'arrivée, la date et le nombre de personnes, et nous vous communiquerons le tarif à l'avance."
      }
    ],
    "faq": [
      [
        "Quelle est la longueur de la Voie lycienne ?",
        "Le sentier balisé s'étend sur plus de 500 km entre Fethiye et Antalya. La plupart des visiteurs en parcourent quelques étapes choisies plutôt que l'itinéraire complet."
      ],
      [
        "Quelle est la meilleure période pour randonner sur la Voie lycienne ?",
        "Le printemps, de mars à mai, est la meilleure saison, suivi de l'automne, de septembre à novembre. L'été est très chaud et de nombreuses sources s'assèchent."
      ],
      [
        "Quelles étapes de la Voie lycienne sont les plus proches d'Antalya ?",
        "Les tronçons autour de Göynük et Kemer, de Çıralı et Olympos, d'Adrasan et de Phaselis sont tous à environ une à deux heures d'Antalya. Les étapes autour de Kaş sont plus à l'ouest."
      ],
      [
        "Peut-on organiser un transfert jusqu'au départ d'une étape de la Voie lycienne ?",
        "Oui. Envoyez-nous vos points de départ et d'arrivée ainsi que la date, et nous vous proposerons un transfert privé à prix fixe par véhicule, avec reprise à la fin de votre randonnée."
      ]
    ]
  },
  "koprulu-canyon-rafting": {
    "slug": "rafting-canyon-de-koprulu-depuis-antalya",
    "title": "Rafting dans le canyon de Köprülü : guide pratique depuis Antalya et Side",
    "heading": "Rafting dans le canyon de Köprülü",
    "description": "Rafting dans le canyon de Köprülü près d'Antalya : saison, rivière, à qui il convient, quoi emporter et distance depuis Side, Belek, Alanya et Antalya.",
    "excerpt": "Une eau verte et froide, un pont romain et un canyon couvert de pins. Ce qui vous attend lors d'une journée de rafting à Köprülü, et comment l'organiser depuis la côte.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Le canyon de Köprülü est un parc national situé dans les monts Taurus, au nord de Side et de Manavgat, et la rivière qui le traverse offre la sortie rafting la plus connue de la région. C'est une aventure accessible plutôt qu'extrême : la plupart des rapides sont faciles, le paysage est spectaculaire, et des débutants comme des familles y participent chaque jour de la saison."
      },
      {
        "type": "h2",
        "text": "À quoi ressemble la descente en rafting"
      },
      {
        "type": "p",
        "text": "La plupart des sorties parcourent une douzaine de kilomètres sur la rivière Köprüçay et durent deux à trois heures sur l'eau, avec des arrêts pour se baigner, sauter des rochers ou simplement se laisser flotter. Les rapides sont surtout faciles à modérés, l'eau est claire et verte, et elle reste froide toute l'année car la rivière est alimentée par des sources de montagne. Les guides font un briefing de sécurité, et casques et gilets de sauvetage sont fournis."
      },
      {
        "type": "h2",
        "text": "Quand partir"
      },
      {
        "type": "table",
        "head": [
          "Période",
          "Rivière et météo",
          "Idéal pour"
        ],
        "rows": [
          [
            "Avril - mai",
            "Plus d'eau grâce à la fonte des neiges, rapides plus vifs, air doux",
            "Groupes sportifs, moins de monde"
          ],
          [
            "Juin - août",
            "Air chaud, eau froide, les mois les plus fréquentés",
            "Se rafraîchir par une journée chaude"
          ],
          [
            "Septembre - octobre",
            "Eau plus calme, journées chaudes, moins de monde",
            "Familles et débutants"
          ]
        ]
      },
      {
        "type": "p",
        "text": "La saison s'étend généralement d'avril à octobre environ, selon la rivière et les prestataires. En dehors de cette période, les sorties sont rares, voire inexistantes."
      },
      {
        "type": "h2",
        "text": "À qui s'adresse le rafting à Köprülü"
      },
      {
        "type": "ul",
        "items": [
          "Débutants : aucune expérience n'est nécessaire et le guide dirige le raft.",
          "Familles : les prestataires fixent un âge minimum pour les enfants, vérifiez-le à la réservation.",
          "Groupes d'amis et de collègues : un raft est généralement partagé par six à huit personnes.",
          "Peu adapté aux personnes qui ne savent pas nager et sont anxieuses dans l'eau, ni pendant la grossesse."
        ]
      },
      {
        "type": "h2",
        "text": "Quoi emporter"
      },
      {
        "type": "ul",
        "items": [
          "Un maillot de bain porté sous vos vêtements et une serviette.",
          "Des chaussures qui peuvent être mouillées et tiennent bien au pied - pas de tongs.",
          "De la crème solaire et des vêtements secs de rechange pour le retour.",
          "Une pochette ou un sac étanche pour votre téléphone ; laissez les objets de valeur à l'hôtel."
        ]
      },
      {
        "type": "h2",
        "text": "Plus que du rafting : le parc national"
      },
      {
        "type": "p",
        "text": "Le canyon est enjambé par le pont d'Oluk, un pont romain à arche unique qui a donné son nom au site - köprü signifie « pont » en turc. Plus haut dans la montagne se trouvent les ruines de la cité antique de Selge, au milieu de formations rocheuses et de villages. Avec votre propre véhicule, vous pouvez combiner le rafting avec un arrêt au pont et une montée en direction de Selge."
      },
      {
        "type": "h2",
        "text": "Y aller depuis la côte"
      },
      {
        "type": "p",
        "text": "Beaucoup d'agences de rafting vendent des sorties avec un ramassage collectif dans les hôtels, ce qui peut signifier une longue matinée à attendre les autres participants. Un véhicule privé depuis Side, Manavgat, Belek, Alanya ou Antalya part quand vous le souhaitez et vous permet de vous arrêter au pont ou dans la montagne en chemin. Le canyon se trouve à environ une heure de Side et de Manavgat, et plus loin depuis Antalya et Alanya ; envoyez-nous votre hôtel et votre date, et nous vous indiquerons un prix fixe par véhicule."
      }
    ],
    "faq": [
      [
        "Le rafting dans le canyon de Köprülü convient-il aux débutants ?",
        "Oui. Les rapides sont surtout faciles à modérés, aucune expérience n'est nécessaire, et un guide dirige chaque raft après un briefing de sécurité."
      ],
      [
        "Quand a lieu la saison de rafting à Köprülü ?",
        "En général d'avril à octobre environ. Au printemps, la fonte des neiges rend l'eau plus vive ; en septembre et octobre, elle est plus calme et il y a moins de monde."
      ],
      [
        "L'eau est-elle froide ?",
        "Froide toute l'année, car la rivière est alimentée par des sources de montagne. Par une chaude journée d'été, c'est justement ce qui fait son charme."
      ],
      [
        "À quelle distance de Side se trouve le canyon de Köprülü ?",
        "À environ une heure de route de Side et de Manavgat, et plus loin depuis Antalya, Belek ou Alanya selon votre hôtel."
      ]
    ]
  },
  "kas-kalkan-autumn": {
    "slug": "kas-et-kalkan-en-automne",
    "title": "Kaş et Kalkan en automne : plongée, plages et criques tranquilles",
    "heading": "Kaş et Kalkan en automne",
    "description": "Pourquoi Kaş et Kalkan sont à leur meilleur en automne : mer chaude, plongée, plages de Kaputaş et Patara, Kekova en kayak et en bateau, accès depuis l'aéroport d'Antalya.",
    "excerpt": "La mer la plus chaude de l'année, des plages désertes et deux petits ports au pied des montagnes. Pourquoi l'extrême ouest de la côte d'Antalya brille en octobre.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Kaş et Kalkan se trouvent à l'extrémité ouest, sauvage, de la côte d'Antalya, là où les montagnes plongent directement dans la mer. Aucune des deux n'a de grands complexes hôteliers ; toutes deux ont de petits ports, des ruelles blanchies à la chaux et certaines des eaux les plus claires de la Méditerranée. En automne, quand les vacanciers d'été sont partis et que la mer est encore chaude, Kaş et Kalkan sont à leur meilleur."
      },
      {
        "type": "h2",
        "text": "Pourquoi l'automne est la bonne saison ici"
      },
      {
        "type": "ul",
        "items": [
          "La mer reste chaude jusqu'en octobre, souvent plus qu'en juin.",
          "La visibilité sous l'eau est excellente - une bonne nouvelle pour les plongeurs et les amateurs de snorkeling.",
          "Marcher et randonner redevient agréable après la chaleur de l'été.",
          "Restaurants et excursions en bateau fonctionnent encore, mais sans la foule estivale."
        ]
      },
      {
        "type": "h2",
        "text": "Kaş : plongée, kayak et port"
      },
      {
        "type": "p",
        "text": "Kaş est l'un des centres de plongée les plus connus de Türkiye, avec des sites pour débutants et plongeurs confirmés, dont des épaves, des tombants et des grottes sous-marines. Le kayak de mer au-dessus des ruines englouties de Kekova est un temps fort, et le port, le théâtre antique face à la mer et les tombeaux lyciens en pleine ville rendent les soirées faciles. Par temps clair, l'île grecque de Meis est visible juste au large."
      },
      {
        "type": "h2",
        "text": "Kalkan : terrasses et soirées paisibles"
      },
      {
        "type": "p",
        "text": "Kalkan, à environ une demi-heure à l'ouest de Kaş, est plus petite et plus calme, bâtie à flanc de colline autour d'un petit port. Elle est connue pour ses villas avec terrasse vue mer et ses restaurants sur les toits. Elle convient aux couples et aux familles qui cherchent une base tranquille et une bonne table plutôt que la vie nocturne."
      },
      {
        "type": "h2",
        "text": "Les plages entre les deux villes et au-delà"
      },
      {
        "type": "ul",
        "items": [
          "Kaputaş : une petite crique turquoise au pied d'une gorge, entre Kaş et Kalkan.",
          "Patara : l'une des plus longues plages de sable de Türkiye, à côté des ruines de la Patara antique et d'une zone protégée.",
          "La péninsule de Kaş et les plateformes de baignade de la ville : côtes rocheuses et échelles menant directement dans une eau profonde et claire.",
          "Kekova et Üçağız : excursions en bateau vers des baies abritées et le village-château de Kaleköy."
        ]
      },
      {
        "type": "h2",
        "text": "Ce qui change en novembre"
      },
      {
        "type": "p",
        "text": "À partir de novembre, la saison touche à sa fin : certains hôtels, restaurants et excursions en bateau ferment, les premières pluies arrivent et les soirées se rafraîchissent. Kaş reste animée toute l'année car beaucoup de gens y vivent en permanence, tandis que Kalkan devient très calme. Vérifiez les dates d'ouverture si vous voyagez en fin de saison."
      },
      {
        "type": "h2",
        "text": "Y aller depuis l'aéroport d'Antalya"
      },
      {
        "type": "p",
        "text": "Kaş se trouve à environ 185 km de l'aéroport d'Antalya, soit deux heures et demie à trois heures par la route côtière via Kemer, Kumluca et Demre, et Kalkan est à environ une demi-heure de plus. Certains voyageurs atterrissent plutôt à Dalaman, selon les vols. Nous assurons des transferts privés depuis les deux aéroports à prix fixe par véhicule, avec des arrêts photo sur l'une des routes les plus pittoresques du pays."
      }
    ],
    "faq": [
      [
        "La mer est-elle chaude à Kaş en octobre ?",
        "Oui. La mer reste généralement chaude jusque tard en octobre, souvent plus qu'au début de l'été, et la visibilité pour la plongée et le snorkeling est excellente."
      ],
      [
        "À quelle distance de l'aéroport d'Antalya se trouve Kaş ?",
        "À environ 185 km, soit deux heures et demie à trois heures de route. Kalkan est à environ une demi-heure de plus vers l'ouest."
      ],
      [
        "Kaş ou Kalkan : laquelle choisir ?",
        "Kaş est plus animée, avec la plongée, le kayak et une vie locale toute l'année. Kalkan est plus petite et plus calme, avec ses villas et ses restaurants vue mer."
      ],
      [
        "Kaş et Kalkan sont-elles ouvertes en novembre ?",
        "Kaş reste active toute l'année. À Kalkan, ainsi que dans certains hôtels et chez certains loueurs de bateaux, la saison se termine fin octobre ou en novembre ; vérifiez donc les dates d'ouverture."
      ]
    ]
  },
  "medical-travel-antalya-winter": {
    "slug": "tourisme-medical-et-soins-dentaires-a-antalya-en-hiver",
    "title": "Tourisme médical à Antalya en hiver : ce qu'il faut savoir avant de partir",
    "heading": "Tourisme médical et soins dentaires à Antalya en hiver",
    "description": "Soins dentaires, greffe de cheveux ou chirurgie esthétique à Antalya en hiver : pourquoi la basse saison, comment vérifier une clinique, jours de repos et transfert aéroport.",
    "excerpt": "Un climat plus frais, des hôtels plus calmes et des rendez-vous plus faciles. Ce qu'il faut vérifier et prévoir avant de réserver un séjour de soins à Antalya en hiver.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Antalya est devenue, avec Istanbul, l'un des centres du tourisme médical et des soins dentaires en Türkiye. De plus en plus de visiteurs planifient des soins dentaires, une greffe de cheveux ou une intervention esthétique pendant les mois d'hiver, quand la côte est calme et le climat doux. Ce guide traite du côté pratique d'un tel voyage - il ne s'agit pas d'un avis médical, et toute décision clinique revient à un médecin qualifié."
      },
      {
        "type": "h2",
        "text": "Pourquoi beaucoup de voyageurs choisissent l'hiver"
      },
      {
        "type": "ul",
        "items": [
          "Un climat doux et plus frais : de nombreux patients trouvent la convalescence plus confortable loin de la chaleur et du soleil intense de l'été.",
          "Les hôtels et appartements sont plus calmes et souvent moins chers qu'en été.",
          "Les rendez-vous peuvent être plus faciles à obtenir en dehors des grands mois de vacances.",
          "Le séjour peut se combiner avec la ville, les musées et des promenades tranquilles plutôt qu'avec la plage."
        ]
      },
      {
        "type": "h2",
        "text": "Choisir et vérifier un prestataire"
      },
      {
        "type": "p",
        "text": "La décision la plus importante porte sur le prestataire, pas sur le prix. Vérifiez que la clinique ou l'hôpital est agréé par le ministère turc de la Santé, renseignez-vous sur le médecin qui vous traitera et sur ses qualifications, et demandez un plan écrit précisant ce qui est inclus, ce qui ne l'est pas, et comment les complications et le suivi sont pris en charge. Méfiez-vous des offres qui promettent un résultat final ou un prix fixe avant tout examen."
      },
      {
        "type": "h2",
        "text": "Organiser vos journées"
      },
      {
        "type": "table",
        "head": [
          "Type de traitement",
          "Point de planification typique",
          "À demander au prestataire"
        ],
        "rows": [
          [
            "Soins dentaires",
            "Souvent plus d'une visite, parfois à plusieurs semaines ou mois d'intervalle",
            "Combien de voyages, et combien de jours chacun ?"
          ],
          [
            "Greffe de cheveux",
            "Court séjour, avec des consignes de soins pour les premiers jours",
            "Quand peut-on prendre l'avion, se laver les cheveux et porter un chapeau ?"
          ],
          [
            "Chirurgie esthétique",
            "Séjour plus long et jours de convalescence avant le vol retour",
            "Combien de nuits avant d'être autorisé à prendre l'avion ?"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Prévoyez des jours de repos, évitez de programmer un traitement le jour de votre arrivée, et suivez l'avis du médecin sur le moment où vous pourrez prendre l'avion en toute sécurité. Voyager accompagné est souvent recommandé pour les interventions chirurgicales."
      },
      {
        "type": "h2",
        "text": "Assurance, documents et suivi"
      },
      {
        "type": "ul",
        "items": [
          "Vérifiez si votre assurance voyage couvre un traitement programmé à l'étranger - beaucoup de contrats ne le font pas.",
          "Conservez des copies de tous les comptes rendus médicaux, ordonnances et du plan de traitement.",
          "Demandez comment se déroule le suivi une fois rentré chez vous, et si votre médecin traitant peut y être associé.",
          "Ne transmettez vos informations médicales qu'au prestataire, par le canal qu'il indique."
        ]
      },
      {
        "type": "h2",
        "text": "De l'aéroport à votre hôtel ou à la clinique"
      },
      {
        "type": "p",
        "text": "Après un vol, avant ou après un traitement, la dernière chose dont vous avez envie est une file d'attente à la station de taxis ou une navette partagée qui s'arrête dans une douzaine d'hôtels. Un transfert privé vous conduit directement de l'aéroport d'Antalya à votre hôtel ou à la clinique, avec un chauffeur qui suit votre vol et vous aide avec les bagages. Les trajets retour peuvent être calés sur vos rendez-vous et votre vol de retour. Le prix est fixe par véhicule : un accompagnant voyage donc sans supplément."
      }
    ],
    "faq": [
      [
        "Pourquoi partir se faire soigner à Antalya en hiver ?",
        "Beaucoup de voyageurs préfèrent le climat plus doux pour la convalescence, des hôtels plus calmes et des rendez-vous plus faciles en dehors des vacances d'été."
      ],
      [
        "Comment vérifier une clinique à Antalya ?",
        "Vérifiez qu'elle est agréée par le ministère turc de la Santé, renseignez-vous sur le médecin traitant et demandez un plan écrit précisant ce qui est inclus et exclu, la gestion des complications et le suivi."
      ],
      [
        "Combien de temps rester après une intervention ?",
        "Cela dépend entièrement du traitement et de l'avis de votre médecin. Demandez à votre prestataire combien de nuits sont nécessaires avant le vol retour, et prévoyez des jours de repos."
      ],
      [
        "Pouvez-vous me conduire de l'aéroport à ma clinique ?",
        "Oui. Nous assurons des transferts privés de l'aéroport d'Antalya vers les hôtels et les cliniques, et retour, à prix fixe par véhicule."
      ]
    ]
  },
  "side-ancient-city-guide": {
    "slug": "side-cite-antique-guide-de-visite",
    "title": "Side, cité antique : guide du temple d'Apollon, du théâtre et de la vieille ville",
    "heading": "Side : guide de la cité antique",
    "description": "Visiter la cité antique de Side : temple d'Apollon, grand théâtre, musée, remparts et vieille ville, quand y aller, et excursions à Aspendos et à la cascade de Manavgat.",
    "excerpt": "Un théâtre romain, des colonnes de temple au bord de l'eau et un port bâti à l'intérieur des remparts antiques. Comment découvrir Side au mieux - hors saison.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Side est l'un des rares endroits de la Riviera turque où une ville moderne vit à l'intérieur d'une cité antique. La vieille ville occupe une petite péninsule entourée de ruines romaines et hellénistiques : on passe devant des colonnes pour rejoindre un restaurant, et le coucher de soleil se contemple encadré par un temple. La cité antique de Side est à son meilleur en dehors de l'été, quand elle est assez calme pour qu'on y ressente l'histoire."
      },
      {
        "type": "h2",
        "text": "Les principaux sites"
      },
      {
        "type": "ul",
        "items": [
          "Temple d'Apollon : ses colonnes se dressent à la pointe de la péninsule, au bord de la mer - le lieu classique pour le coucher de soleil.",
          "Le grand théâtre : l'un des plus grands théâtres antiques de la région, adossé à la pente à l'entrée de la vieille ville.",
          "Musée de Side : installé dans des thermes romains restaurés, avec des statues et des reliefs découverts dans la cité.",
          "La rue à colonnades et l'agora : l'ancien axe principal qui mène de la porte de la ville vers le port.",
          "Les remparts et la porte monumentale : l'entrée empruntée par les visiteurs depuis deux mille ans."
        ]
      },
      {
        "type": "h2",
        "text": "La vieille ville aujourd'hui"
      },
      {
        "type": "p",
        "text": "À l'intérieur des remparts, des ruelles bordées de restaurants, de cafés et de petites boutiques descendent vers le port, d'où partent des bateaux pour des excursions le long de la côte. Les voitures sont interdites dans la majeure partie de la vieille ville, ce qui la rend agréable à explorer à pied. De larges plages de sable s'étendent à l'est et à l'ouest de la péninsule."
      },
      {
        "type": "h2",
        "text": "Quand visiter"
      },
      {
        "type": "p",
        "text": "Le printemps et l'automne sont idéaux : assez chauds pour la plage, assez frais pour se promener dans les ruines en milieu de journée. En hiver, beaucoup d'hôtels saisonniers ferment, mais la vieille ville, les ruines et le musée restent ouverts, et par une journée ensoleillée le temple et le port sont presque déserts. En juillet et en août, visitez les ruines tôt le matin ou au coucher du soleil."
      },
      {
        "type": "h2",
        "text": "Excursions depuis Side"
      },
      {
        "type": "table",
        "head": [
          "Destination",
          "Pourquoi y aller",
          "Temps approximatif depuis Side"
        ],
        "rows": [
          [
            "Aspendos",
            "L'un des théâtres romains les mieux conservés au monde",
            "environ 40 minutes"
          ],
          [
            "Cascade de Manavgat",
            "Une chute d'eau large et basse dans un parc verdoyant",
            "environ 15 minutes"
          ],
          [
            "Pergé",
            "Une grande cité antique avec un stade et des rues à colonnades",
            "environ 1 heure"
          ],
          [
            "Canyon de Köprülü",
            "Rafting et pont romain dans un parc national",
            "environ 1 heure"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Rejoindre Side depuis l'aéroport d'Antalya"
      },
      {
        "type": "p",
        "text": "Side se trouve à environ 65 km de l'aéroport d'Antalya, soit 55 à 65 minutes de route. Un transfert privé vous conduit directement à votre hôtel ou à l'entrée de la vieille ville piétonne, à un prix fixe par véhicule qui ne change ni avec la saison ni avec l'heure de votre vol. Le même véhicule peut être réservé pour des excursions à Aspendos, à Pergé ou au canyon."
      }
    ],
    "faq": [
      [
        "Que voir dans la cité antique de Side ?",
        "Le temple d'Apollon au bord de la mer, le grand théâtre, le musée installé dans des thermes romains, la rue à colonnades, l'agora et les remparts - le tout à distance de marche de la vieille ville."
      ],
      [
        "Side vaut-elle le détour en hiver ?",
        "Oui, pour les ruines et la vieille ville. Beaucoup d'hôtels saisonniers ferment, mais les sites restent ouverts et sont bien plus calmes qu'en été."
      ],
      [
        "À quelle distance de l'aéroport d'Antalya se trouve Side ?",
        "À environ 65 km, soit 55 à 65 minutes de route."
      ],
      [
        "Peut-on visiter Aspendos depuis Side ?",
        "Oui. Aspendos est à environ 40 minutes de route de Side et se prête facilement à une excursion d'une demi-journée, souvent combinée avec Pergé ou la cascade de Manavgat."
      ]
    ]
  }
};
