import type { TransferLandingCopy } from "../transfer-landing-copy";

/**
 * Spanish-speaking arrivals book later and compare against the shared shuttle
 * offered in the resort packages, so the copy keeps the per-vehicle price and
 * the no-prepayment rule in front.
 *
 * Written by the team, not natively reviewed yet — flag any wording a Spanish
 * reader would phrase differently before the next content pass.
 */
export const es: TransferLandingCopy = {
  heroHeading: (name) => `Aeropuerto de Antalya → ${name}: traslado privado`,
  heroCta: "Reservar el traslado",
  heroTrust: [
    "Hasta 7 personas",
    "Sin pago por adelantado",
    "Pago directo al conductor",
    "Precio total fijo, sin cargos ocultos",
    "Silla infantil gratuita a petición",
    "Seguimiento del vuelo incluido",
  ],
  serviceHeading: (name) => `Su traslado privado a ${name}`,
  aboutHeading: (name) => `Sobre ${name}`,
  ownGroup: (name) =>
    `Viaja únicamente con su propio grupo, directamente hasta su hotel en ${name}. Sin autobús compartido, sin desconocidos en el vehículo y sin desvíos a otros hoteles: el precio fijo cubre el vehículo completo.`,
  arrivalHeading: "Su llegada al aeropuerto de Antalya",
  arrivalBody:
    "Cuando haya recogido su equipaje, diríjase a la zona Meet & Greet J / 777. Nuestro equipo del aeropuerto localiza su reserva y le presenta a su conductor. Como seguimos su vuelo, un retraso desplaza la recogida sin coste adicional.",
  returnHeading: "Traslado de regreso",
  returnBody: (name) =>
    `También organizamos el regreso desde ${name} al aeropuerto de Antalya. Indíquenos su número de vuelo y la hora de recogida que prefiere al hacer la reserva.`,
  privateHeading: "Privado, no compartido",
  privateBody: (name) =>
    `En el vehículo viajan solo usted y sus acompañantes. Tras la reserva recibe una confirmación clara con los datos del viaje y un contacto directo. El día de la llegada nuestro equipo sigue su vuelo; si aterriza antes o después, ajustamos el encuentro. Su conductor le lleva con el equipaje hasta la recepción del hotel o hasta la dirección privada que nos haya indicado en ${name}.`,
  priceBody:
    "El importe mostrado es un precio total fijo por vehículo, no por persona. No hay recargos ocultos por el seguimiento del vuelo, por el tiempo de espera habitual ni por las sillas infantiles a petición. Se paga en efectivo directamente al conductor al inicio del trayecto, así que el coste queda cerrado antes de viajar.",
  vehicleHeading: "Vehículo, equipaje y niños",
  vehicleBody:
    "El Mercedes Vito es adecuado para hasta seis pasajeros con equipaje de vacaciones normal; los grupos más grandes viajan en un Mercedes Sprinter de hasta 12 plazas. Indíquenos al reservar el equipaje voluminoso, el carrito del bebé o las sillas infantiles que necesite y ajustamos el vehículo a su grupo.",
  wholeVehicle: "Precio por el vehículo completo",
  priceTrust: [
    "Sin pago por adelantado",
    "Pago directo al conductor",
    "Sin cargos ocultos",
  ],
  hotelsEyebrow: "Para su alojamiento",
  hotelsHeading: (name) => `Hoteles habituales en ${name}`,
  hotelsBody: () => "Llevamos directamente a estos y a cualquier otro hotel de la zona.",
  faq: [
    [
      "¿Dónde encuentro al equipo de traslados en el aeropuerto de Antalya?",
      "Después de recoger el equipaje, vaya a la zona Meet & Greet J / 777. Nuestro equipo localiza su reserva y le acompaña hasta su conductor.",
    ],
    [
      "¿Hay que pagar el traslado por adelantado?",
      "No. No se exige ningún pago por adelantado. El precio total fijo se abona directamente al conductor.",
    ],
    [
      "¿Hay sillas infantiles disponibles?",
      "Sí. Las sillas infantiles son gratuitas a petición. Indique el número de niños y su edad al reservar.",
    ],
  ],
  regions: {
    antalya: {
      about: "La ciudad de Antalya, con los frentes de playa de Lara y Kundu, está a pocos kilómetros del aeropuerto. Grandes resorts temáticos y hoteles urbanos se alinean en la costa de Lara, mientras que Konyaaltı, al oeste, ofrece playa de guijarros y un largo paseo marítimo.",
      routeDetails: "El corto trayecto desde el aeropuerto de Antalya sigue la carretera costera de Lara o entra directamente al centro. Incluso en una etapa breve el coche privado compensa: sin esperas a otros pasajeros, sin paradas intermedias y con llegada a la puerta de su hotel.",
    },
    belek: {
      about: "Belek se encuentra al este de Antalya y es conocida sobre todo por sus campos de golf, sus grandes resorts con todo incluido y sus amplias playas de arena. Los hoteles se reparten entre Kadriye y la costa cercana a Serik, por lo que la dirección exacta del hotel ayuda al reservar.",
      routeDetails: "El trayecto sale del aeropuerto de Antalya por la D400 hacia Serik y Belek. Para familias, golfistas y vuelos nocturnos el traslado privado directo es la opción sencilla: llega a su alojamiento sin paradas de recogida ni cambio de vehículo.",
    },
    side: {
      about: "Side combina un casco antiguo histórico con largas playas de arena y amplios complejos vacacionales. Además de Side, el destino incluye las zonas hoteleras más solicitadas de Kumköy, Evrenseki, Çolaklı, Sorgun y Titreyengöl.",
      routeDetails: "Desde el aeropuerto de Antalya la ruta sigue la carretera de la costa hacia Manavgat y Side. El vehículo privado se agradece especialmente en una llegada tardía: su grupo va directo al complejo reservado, sin esperar a huéspedes de otros hoteles.",
    },
    kemer: {
      about: "Kemer se extiende al oeste de Antalya, entre los montes Tauro y el Mediterráneo. La zona abarca el centro de Kemer junto con Beldibi, Göynük, Kiriş y Çamyuva: hoteles de playa, un puerto deportivo y montañas como telón de fondo.",
      routeDetails: "El trayecto directo recorre la costa al oeste de Antalya. Su conductor le lleva hasta el hotel sin cambio de vehículo, algo que importa sobre todo cuando viaja con niños, con equipo deportivo o tras un aterrizaje nocturno.",
    },
    alanya: {
      about: "Alanya es uno de los destinos más queridos de la Riviera turca y queda bastante más al este que los complejos de los alrededores de Antalya. Junto al centro, Mahmutlar, Kestel, Avsallar, Türkler y Okurcalar son las zonas hoteleras más demandadas.",
      routeDetails: "En un trayecto costero largo, el precio fijo por vehículo es donde más se nota el valor. Con un traslado privado viaja con su propio grupo y continúa desde el aterrizaje hasta la recepción del hotel.",
    },
    kizilagac: {
      about: "Kızılağaç está al este de Manavgat y destaca por sus amplios resorts de playa y unas vacaciones familiares tranquilas. La zona limita con Sorgun y Manavgat; muchos hoteles quedan algo apartados de la carretera principal, junto al mar.",
      routeDetails: "Desde el aeropuerto de Antalya se toma la D400 hacia Manavgat y después se continúa hasta Kızılağaç. El vehículo privado le ahorra las paradas extra en otros hoteles que los traslados compartidos suelen hacer justo en este tramo.",
    },
    tekirova: {
      about: "Tekirova se sitúa al sur de Kemer, en el borde del parque nacional de Olympos-Beydağları. Combina recintos hoteleros bien cuidados con pequeñas calas y está muy cerca del yacimiento antiguo de Phaselis.",
      routeDetails: "El trayecto va del aeropuerto de Antalya pasando por Kemer y sigue hasta Tekirova. La situación costera y la distancia hacen razonable el traslado directo: sin cambio de vehículo y sin esperar a otros huéspedes camino del hotel.",
    },
    bogazkent: {
      about: "Boğazkent se encuentra en el distrito de Serik, en la costa entre Belek y Side. Grandes complejos todo incluido se alzan directamente sobre una amplia playa de arena, y los campos de golf de Belek están a pocos minutos, lo que convierte la zona en una base tranquila tanto para familias como para golfistas.",
      routeDetails: "Desde el aeropuerto de Antalya la ruta sigue la D400 hacia el este, pasa por Belek y gira después hacia la costa. Con unos 48 km es uno de los traslados más cortos de esta lista, y un coche privado le lleva desde la sala de llegadas hasta la entrada de su complejo, sin paradas en otros hoteles.",
    },
    manavgat: {
      about: "Manavgat es una localidad animada a orillas del río del mismo nombre, al este de Side. Es conocida por su cascada, las excursiones en barco río arriba y su mercado semanal, y sirve de puerta de entrada a los complejos de este tramo de costa. Indíquenos la dirección exacta de su hotel al reservar, porque la zona es extensa.",
      routeDetails: "La ruta discurre hacia el este por la D400 desde el aeropuerto de Antalya, unos 75 km. El trayecto dura alrededor de una hora, y un traslado privado directo le ahorra las paradas adicionales en hoteles que hace un microbús compartido en esta concurrida carretera costera.",
    },
    bodrum: {
      about: "Bodrum está en la costa del Egeo, en la provincia de Muğla, y es famosa por su castillo de los cruzados, su puerto deportivo y sus casas blancas en las laderas. Alrededor de la península hay zonas animadas como Gümbet y Bitez, y también bahías más tranquilas en Yalıkavak, Türkbükü y Gümüşlük.",
      routeDetails: "Con unos 380 km es uno de los trayectos más largos que ofrecemos y lleva entre cinco y seis horas con paradas cómodas. Un coche privado hace el día mucho más fácil que el transporte público: sale en cuanto aterriza, para donde quiera y llega a su propio hotel en la península. Indíquenos su hotel y la hora de aterrizaje al reservar para que podamos planificar el viaje.",
    },
    dalaman: {
      about: "Dalaman es la puerta de entrada a la costa licia y caria. Su aeropuerto da servicio a localidades como Sarıgerme y Göcek, y la cercana Dalyan es conocida por el delta del río, las tumbas rupestres de Kaunos y la playa de las tortugas de İztuzu.",
      routeDetails: "Los 235 km desde el aeropuerto de Antalya siguen la sinuosa carretera de la costa licia durante unas tres horas o tres horas y media. Un precio fijo por vehículo permite presupuestar con facilidad un viaje largo, y el coche privado deja que su grupo pare a descansar o a comer cuando quiera.",
    },
    fethiye: {
      about: "Fethiye se extiende por una amplia bahía rodeada de montañas cubiertas de pinos. Es el punto de partida para Ölüdeniz y su laguna azul, para las playas y la vida nocturna de Çalış y para los pueblos más tranquilos de Hisarönü y Kayaköy. Muchos viajeros vienen también para hacer parapente desde el Babadağ y para las excursiones en barco por las doce islas.",
      routeDetails: "Los 205 km desde el aeropuerto de Antalya recorren la costa licia por Kumluca, Kaş y Kalkan y llevan de dos horas y media a tres. La carretera es sinuosa y panorámica. Con un traslado privado no tiene que cambiar de vehículo en Fethiye, y el conductor le lleva a su hotel en Ölüdeniz, Çalış o Hisarönü.",
    },
    pamukkale: {
      about: "Pamukkale, en la provincia de Denizli, es Patrimonio de la Humanidad de la UNESCO y destaca por sus terrazas blancas de travertino y sus cálidas piscinas termales. En la colina que las domina se alza la ciudad antigua de Hierápolis, con su teatro, su necrópolis y la piscina antigua donde se puede nadar entre columnas sumergidas.",
      routeDetails: "La ruta deja la costa y recorre unos 245 km tierra adentro, por las montañas del Tauro y la meseta hacia Denizli, en unas tres horas o tres horas y media. Un coche privado encaja muy bien en este viaje: no hay cambio de vehículo, se puede planificar una parada de descanso por el camino y llega directamente a su hotel en Pamukkale o Karahayıt.",
    },
    kapadokya: {
      about: "Capadocia, en el centro de Anatolia, es conocida por sus chimeneas de hadas, sus iglesias rupestres y sus ciudades subterráneas. Al amanecer, los globos aerostáticos se elevan sobre Göreme, Uçhisar y Ürgüp, y muchos viajeros se alojan en un hotel excavado en la roca.",
      routeDetails: "Con unos 540 km, el viaje va del Mediterráneo por las montañas del Tauro y la meseta de Anatolia y lleva de siete a ocho horas con paradas. Un traslado privado es la forma cómoda de hacerlo: su grupo viaja unido, el conductor planifica con usted las paradas y le deja en la entrada de su hotel cueva. Indíquenos su número de vuelo y su hotel al reservar para que podamos planificar el día.",
    },
  },
};
