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
  }
};
