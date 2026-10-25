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
  },
};
