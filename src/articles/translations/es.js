/**
 * Blog copy for es: the page chrome plus every article body.
 * One file per language, so adding a market is adding a file.
 */
export const chrome = {
  locale: "es_ES",
  indexTitle: "Guías de traslados en Antalya y artículos de viaje | Antalya VIP Tourism",
  indexDescription:
    "Guías prácticas para llegar a Antalya: traslado privado o taxi, el encuentro con el conductor, viajar con niños, distancias de la costa y cuándo viajar.",
  heading: "Guías de traslados en Antalya",
  intro:
    "Artículos prácticos sobre la llegada al aeropuerto de Antalya y el trayecto hasta su hotel - escritos desde los traslados que hacemos cada día, no desde un folleto.",
  blog: "Guías",
  readMore: "Leer la guía",
  minReadLabel: "{minutes} min de lectura",
  updated: "Actualizado",
  contents: "En esta guía",
  faqHeading: "Preguntas frecuentes",
  relatedHeading: "Rutas de traslado de esta guía",
  routeGuidesHeading: "Guías para este traslado",
  moreHeading: "Más guías",
  ctaHeading: "Traslado a precio fijo desde el aeropuerto de Antalya",
  ctaText:
    "Un precio por el vehículo completo, seguimiento de vuelo incluido y pago en efectivo al conductor. Compruebe su ruta y reserve en un minuto.",
  ctaButton: "Ver su precio fijo",
  backToBlog: "Todas las guías",
  home: "Inicio",
  routes: "Rutas de traslado",
  book: "Reserve su traslado",
  imprint: "Aviso legal",
  privacy: "Privacidad",
  imprintUrl: "/impressum.html",
  privacyUrl: "/privacy/",
};

export const articles = {
  "transfer-vs-taxi": {
    slug: "traslado-o-taxi-aeropuerto-antalya",
    title: "Aeropuerto de Antalya: ¿traslado privado, taxi o lanzadera compartida?",
    heading: "¿Traslado privado, taxi o lanzadera compartida desde el aeropuerto de Antalya?",
    description:
      "Lo que cuestan de verdad las tres opciones al salir del aeropuerto de Antalya, cuánto tardan y cuál conviene a su grupo. Comparativa con precio fijo por vehículo.",
    excerpt:
      "Tres formas de salir del aeropuerto de Antalya y tres comienzos de vacaciones muy distintos. Cuánto cuesta cada una, cuánto tarda y a quién conviene.",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "Aterriza en el aeropuerto de Antalya (AYT) tras tres a cinco horas de vuelo, a menudo de noche, normalmente con equipaje y con frecuencia con niños. Los cuarenta minutos siguientes deciden cómo empiezan sus vacaciones. Hay tres maneras realistas de salir de la terminal, y el precio más bajo del cartel rara vez es el trayecto más barato." },
      { type: "h2", text: "Las tres opciones, una al lado de otra" },
      {
        type: "table",
        head: ["", "Traslado privado", "Taxi del aeropuerto", "Lanzadera compartida"],
        rows: [
          ["Base del precio", "Fijo, por vehículo", "Taxímetro, por trayecto", "Por persona"],
          ["Conocido antes de llegar", "Sí", "No", "Sí"],
          ["Espera si el vuelo se retrasa", "Sí, con seguimiento", "No", "Limitado"],
          ["Paradas antes de su hotel", "Ninguna", "Ninguna", "Hasta 8"],
          ["Capacidad de equipaje", "De furgoneta", "De turismo", "Compartida"],
          ["Silla infantil", "Bajo petición, gratis", "Rara vez", "No"],
        ],
      },
      { type: "h2", text: "Lo que cuesta realmente un taxi" },
      { type: "p", text: "El taxi es la respuesta evidente en cualquier aeropuerto y, en distancias cortas, una opción razonable. En la Riviera turca el problema es la distancia: Belek está a 45 km, Side a 65 km, Alanya a 125 km. Un taxímetro corriendo de noche durante 125 km, con un regreso que el conductor tiene que repercutir, produce una cifra que nadie le anticipó. Y no tiene a qué agarrarse si la ruta seguida no fue la directa." },
      { type: "p", text: "El traslado privado invierte la lógica: el precio del vehículo completo se acuerda antes de volar, no cambia con el tráfico y es el mismo viaje una persona o seis." },
      { type: "h2", text: "Por qué la lanzadera parece barata y a menudo no lo es" },
      { type: "p", text: "Un precio por persona parece imbatible para quien viaja solo y deja de serlo ya con dos. Para una familia de cuatro hasta Side, cuatro plazas suelen costar más que una furgoneta a precio fijo. Pero el coste real es el tiempo: el vehículo sale cuando se llena y va dejando pasajeros por la carretera de la costa en el orden que conviene a la ruta, no a usted. Llegar el último tras un vuelo nocturno añade fácilmente más de una hora." },
      { type: "h2", text: "Cuándo es acertada cada opción" },
      {
        type: "ul",
        items: [
          "Viajero solo, equipaje de mano, aterrizaje de día, hotel en el centro de Antalya: el taxi o la lanzadera bastan.",
          "Dos personas o más con hotel fuera de la ciudad: el vehículo privado suele salir más barato y siempre es más rápido.",
          "Familias con sillas infantiles, carrito o bolsas de golf: privado, porque la capacidad se confirma de antemano.",
          "Llegadas nocturnas y conexiones que pueden desplazarse: privado, porque la recogida sigue a su vuelo y no a un horario.",
        ],
      },
      { type: "h2", text: "Qué comprobar antes de reservar" },
      { type: "p", text: "Tres preguntas hacen evidente la diferencia. ¿El precio es por vehículo o por persona? ¿Es fijo o se mueve con el tráfico y la hora? ¿Y qué pasa si el vuelo aterriza con dos horas de retraso: sigue habiendo alguien esperando y cuesta más? Nuestros precios fijos son por vehículo, el seguimiento de vuelo está incluido y los primeros 90 minutos de espera tras el aterrizaje son gratuitos y se desplazan automáticamente si hay retraso." },
    ],
    faq: [
      ["¿Es más caro un traslado privado que un taxi en Antalya?", "Hasta el centro de Antalya es comparable. Hasta Belek, Side, Kemer o Alanya, un precio fijo por vehículo suele quedar por debajo de la carrera con taxímetro en la misma distancia, y lo conoce antes de volar."],
      ["¿Pago por persona o por vehículo?", "Por vehículo. El precio de un Mercedes Vito cubre hasta seis pasajeros; el Sprinter es para grupos mayores. Un pasajero más no cambia el precio."],
      ["¿Qué ocurre si mi vuelo se retrasa?", "Seguimos el vuelo en tiempo real y desplazamos la recogida sin coste adicional. Los 90 minutos de espera incluidos empiezan a contar desde el aterrizaje real."],
      ["¿Puedo pagar en efectivo a la llegada?", "Sí. No se exige pago por adelantado; abona el importe fijo de su reserva directamente al conductor al inicio del trayecto."],
    ],
  },
  "airport-arrival-guide": {
    slug: "guia-llegada-aeropuerto-antalya",
    title: "Guía de llegada al aeropuerto de Antalya: terminales, punto de encuentro y espera",
    heading: "Llegar al aeropuerto de Antalya: qué ocurre tras aterrizar",
    description:
      "Paso a paso por la llegada al aeropuerto de Antalya: terminales, control de pasaportes, equipaje, dónde espera su conductor y cuánto dura la espera gratuita.",
    excerpt:
      "Del contacto con la pista a la puerta del vehículo: terminales, control de pasaportes, punto de encuentro y qué pasa si el vuelo llega tarde.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "El aeropuerto de Antalya gestiona más de treinta millones de pasajeros al año y casi todos llegan en una ventana estival muy estrecha. Conocer la secuencia de antemano convierte una terminal abarrotada en un trámite de veinte minutos." },
      { type: "h2", text: "En qué terminal aterriza" },
      { type: "p", text: "AYT tiene tres terminales. La mayoría de los vuelos internacionales regulares usan la Terminal 1 o la Terminal 2; los chárteres y los vuelos de temporada se gestionan normalmente en la Terminal 2. La terminal doméstica atiende los vuelos de Estambul, Ankara e Esmirna. No tiene que averiguarlo usted: el número de vuelo nos lo dice y el conductor se envía a la sala de llegadas correcta." },
      { type: "h2", text: "Control de pasaportes y equipaje" },
      { type: "p", text: "La mayoría de nacionalidades europeas entra en Türkiye sin visado para estancias cortas, pero compruebe las normas aplicables a su pasaporte antes de viajar. En temporada alta calcule de 20 a 45 minutos desde el aterrizaje hasta salir con las maletas; fuera de julio y agosto, menos. La recogida de equipaje es el paso que más varía, y por eso importa más una ventana de espera que una hora de recogida prometida." },
      { type: "h2", text: "Dónde le espera el conductor" },
      {
        type: "ul",
        items: [
          "Recoja su equipaje y pase a la sala de llegadas.",
          "Diríjase a la zona meet & greet J / 777.",
          "Nuestro equipo del aeropuerto localiza su reserva y le acompaña hasta su conductor.",
          "El conductor lleva su equipaje al vehículo, en el aparcamiento contiguo.",
        ],
      },
      { type: "p", text: "No tiene que buscar un cartel con su nombre entre cincuenta. El equipo está en un punto fijo y tiene su referencia de reserva, así que la entrega funciona igual a las 06:00 que a las 02:00." },
      { type: "h2", text: "Qué ocurre si el vuelo llega tarde" },
      { type: "p", text: "Seguimos el vuelo en sí, no el horario con el que reservó. Si aterriza con dos horas de retraso, la recogida se desplaza dos horas y el precio no cambia. Los primeros 90 minutos de espera desde la hora real de aterrizaje están incluidos sin coste, lo que cubre una cola lenta o un equipaje que tarda." },
      { type: "h2", text: "Antes de viajar" },
      { type: "p", text: "Dos detalles hacen el día sencillo: facilítenos el número de vuelo y no solo la hora de llegada, e indique el número de sillas infantiles al reservar. Ambos son gratuitos, y ambos son mucho más difíciles de organizar a la 01:00 en la sala de llegadas." },
    ],
    faq: [
      ["¿Dónde encuentro exactamente al conductor en el aeropuerto de Antalya?", "En la zona meet & greet J / 777 de la sala de llegadas, tras recoger su equipaje. Nuestro equipo tiene su reserva y le lleva hasta el conductor."],
      ["¿Cuánto espera el conductor?", "Los primeros 90 minutos desde su hora real de aterrizaje están incluidos sin coste, y la ventana se desplaza automáticamente si el vuelo se retrasa."],
      ["¿Cuánto se tarda en salir de la terminal?", "Normalmente de 20 a 45 minutos desde el aterrizaje, según el control de pasaportes y el equipaje. Es más largo en julio y agosto."],
      ["¿Tengo que enviar mi número de vuelo?", "Sí, por favor. El número de vuelo nos permite seguir la hora real de aterrizaje y enviar al conductor a la terminal correcta."],
    ],
  },
  "alanya-distance-guide": {
    slug: "aeropuerto-antalya-alanya-distancia",
    title: "Del aeropuerto de Antalya a Alanya: distancia, tiempo de trayecto y opciones",
    heading: "Del aeropuerto de Antalya a Alanya: lo lejos que está de verdad",
    description:
      "125 km por la carretera costera D400. Lo que dura realmente el trayecto a Alanya, dónde están los distritos hoteleros y cómo planificar una llegada tardía.",
    excerpt:
      "Alanya es el más largo de los traslados habituales desde Antalya. La distancia real, el tiempo real y qué cambia en una llegada nocturna.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Alanya está 125 km al este del aeropuerto de Antalya, lo que la convierte en el traslado más largo que se reserva de forma habitual en la Riviera turca. Esa distancia es el dato que condiciona todas las demás decisiones del viaje." },
      { type: "h2", text: "Distancia y tiempo de trayecto" },
      {
        type: "table",
        head: ["Destino", "Distancia desde AYT", "Trayecto habitual"],
        rows: [
          ["Centro de Antalya", "15 km", "20-30 minutos"],
          ["Side", "65 km", "55-65 minutos"],
          ["Manavgat", "75 km", "60-70 minutos"],
          ["Kızılağaç", "85 km", "70-80 minutos"],
          ["Alanya", "125 km", "110-130 minutos"],
        ],
      },
      { type: "p", text: "La ruta sigue la carretera costera D400 hacia el este por Serik, Manavgat y Kızılağaç. Es una buena carretera, pero atraviesa los pueblos en lugar de rodearlos, así que las tardes de verano y los picos de chárteres del sábado añaden un tiempo que ningún horario puede eliminar." },
      { type: "h2", text: "Alanya no es un solo lugar" },
      { type: "p", text: "Los hoteles vendidos como «Alanya» se reparten por unos 65 km de costa. Avsallar, Türkler y Okurcalar quedan al oeste del centro y claramente más cerca del aeropuerto; Mahmutlar, Kestel, Kargıcak y Demirtaş quedan al este y suman de 20 a 45 minutos. Al reservar, indique el nombre del hotel y no solo la localidad: eso determina tanto el tiempo de viaje como el precio fijo correcto." },
      { type: "h2", text: "Por qué la lanzadera duele más aquí" },
      { type: "p", text: "En un trayecto de 125 km, cada parada extra es un rodeo real. Una lanzadera que deja a ocho grupos por la costa convierte fácilmente dos horas en cuatro, y la última familia en bajar suele ser la que se aloja más al este. Un vehículo privado recorre la ruta una vez, en su orden, y el precio fijo no se mueve aunque lo haga el tráfico." },
      { type: "h2", text: "Planificar una llegada nocturna" },
      { type: "p", text: "Muchos vuelos a Alanya aterrizan después de las 23:00. Entonces importan dos cosas: que alguien esté esperando con seguridad y que el precio se acordara antes de volar. Seguimos el vuelo, así que un aterrizaje tardío desplaza la recogida en lugar de cancelarla, y los primeros 90 minutos de espera están incluidos. El pago es en efectivo al conductor al inicio del trayecto, de modo que no hay nada que organizar de madrugada." },
    ],
    faq: [
      ["¿A qué distancia está Alanya del aeropuerto de Antalya?", "A 125 km por la carretera costera D400, normalmente entre 110 y 130 minutos de trayecto."],
      ["¿El precio del traslado es igual para todos los hoteles de Alanya?", "No. La costa de Alanya abarca unos 65 km, así que los hoteles de Avsallar u Okurcalar tienen un precio distinto al de Mahmutlar o Kargıcak. Indique el nombre del hotel y verá el precio fijo correcto."],
      ["¿Hay alguna parada por el camino?", "En un traslado privado podemos parar brevemente si lo pide. No hay paradas programadas ni otros pasajeros."],
      ["¿Y si aterrizo después de medianoche?", "La recogida sigue su hora real de aterrizaje. Las llegadas nocturnas son habituales en esta ruta y no llevan recargo."],
    ],
  },
  "family-child-seats": {
    slug: "traslado-aeropuerto-antalya-con-ninos",
    title: "Traslado desde el aeropuerto de Antalya con niños: sillas, carritos y equipaje",
    heading: "Viajar hasta su hotel con niños",
    description:
      "Sillas infantiles, carritos y equipaje en un traslado desde el aeropuerto de Antalya. Qué pedir al reservar y por qué el privado es más sencillo con niños pequeños.",
    excerpt:
      "Las sillas infantiles son gratuitas bajo petición, pero solo si lo sabemos antes de que aterrice. Qué contarnos y qué cabe realmente en el vehículo.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Un traslado con niños pequeños es un problema de logística, no de precio. Las sillas, un carrito, una cuna de viaje y cuatro maletas tienen que caber en el mismo vehículo a la vez, y las decisiones que lo hacen posible se toman al reservar, no en la terminal." },
      { type: "h2", text: "Sillas infantiles" },
      { type: "p", text: "Facilitamos sillas infantiles sin coste bajo petición. Indíquenos el número de niños y sus edades al reservar; eso determina si hace falta un portabebés, una silla de niño pequeño o un elevador. Las sillas se preparan con el vehículo, así que no hay nada que cargar por el aeropuerto ni nada que organizar a la 01:00 en llegadas." },
      { type: "h2", text: "Qué cabe en el vehículo" },
      {
        type: "ul",
        items: [
          "Mercedes Vito: hasta seis pasajeros con equipaje de vacaciones normal.",
          "Mercedes Sprinter: grupos mayores, hasta 12 plazas, y la elección correcta cuando viajan carrito y cuna.",
          "Carritos y sillas no cuentan como pasajeros, pero ocupan maletero: avísenos y asignamos el vehículo en consecuencia.",
        ],
      },
      { type: "p", text: "El precio fijo es por vehículo, no por plaza, así que añadir un niño nunca cambia la tarifa. Lo que cambia es qué vehículo enviamos." },
      { type: "h2", text: "Por qué lo privado importa más con niños" },
      { type: "p", text: "En una lanzadera compartida, la familia espera primero a que se llene el vehículo y luego recorre la costa mientras bajan otros grupos. Con un niño pequeño tras un vuelo nocturno, esa es la diferencia entre cuarenta minutos y tres horas. Un vehículo privado sale cuando ustedes están listos y va directo a la recepción del hotel." },
      { type: "h2", text: "Detalles prácticos que conviene saber" },
      { type: "p", text: "Hay agua en el vehículo. Si alguien necesita una parada corta en el trayecto largo a Side o Alanya, basta con pedírselo al conductor: no hay horario que cumplir. Y como el pago es en efectivo al inicio del trayecto, nadie tiene que buscar una tarjeta o cobertura con un niño dormido en brazos." },
    ],
    faq: [
      ["¿Las sillas infantiles son gratuitas?", "Sí. Las sillas infantiles se facilitan sin coste adicional bajo petición. Indique el número de niños y sus edades al reservar."],
      ["¿Puedo llevar un carrito?", "Sí. Indíquelo al reservar para que reservemos espacio de maletero: un carrito más un juego completo de maletas puede implicar un Sprinter en lugar de un Vito."],
      ["¿Los niños cuentan para el límite de pasajeros?", "Para la capacidad de plazas, sí. El precio no cambia: es fijo por vehículo, no por persona."],
      ["¿Podemos parar en un traslado largo?", "Sí. En un traslado privado el conductor puede hacer una parada corta si lo piden; no hay otros pasajeros esperando."],
    ],
  },
  "belek-golf-transfer": {
    slug: "traslado-de-golf-a-belek",
    title: "Traslado de golf a Belek: palos, grupos y cálculo de tiempos desde AYT",
    heading: "Del aeropuerto de Antalya a Belek con bolsas de golf",
    description:
      "Cómo viaja el equipaje de golf del aeropuerto de Antalya a Belek: elección de vehículo, tamaño del grupo, cálculo hasta la salida y qué confirmar al reservar.",
    excerpt:
      "Belek es primero un destino de golf y después un resort de playa. Qué implica eso para el maletero, la elección de vehículo y el trayecto desde AYT.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Belek se encuentra 45 km al este del aeropuerto de Antalya, entre 35 y 40 minutos de trayecto, y concentra el conjunto de campos de campeonato más denso de Türkiye. La mayoría de los grupos que llegan allí llevan algo para lo que un traslado normal no está dimensionado: bolsas de golf." },
      { type: "h2", text: "Bolsas de golf y elección del vehículo" },
      { type: "p", text: "Una bolsa de torneo mide unos 130 cm y comparte mal el espacio con las maletas. Regla práctica: un Mercedes Vito admite cuatro pasajeros con cuatro bolsas de golf y su equipaje habitual; por encima de eso, el vehículo correcto es un Mercedes Sprinter. Indique el número de bolsas al reservar y asignamos el vehículo a la carga, no al número de personas." },
      {
        type: "ul",
        items: [
          "Cuatro jugadores, cuatro bolsas, maletas estándar: Vito.",
          "De seis a ocho jugadores, o bolsas más maletas grandes: Sprinter.",
          "Grupo mixto con acompañantes que no juegan: cuente las bolsas, no las personas.",
        ],
      },
      { type: "h2", text: "Ajustar los tiempos a la hora de salida" },
      { type: "p", text: "El trayecto es corto; el aeropuerto no. En temporada alta, calcule de 20 a 45 minutos desde el aterrizaje hasta salir de la terminal y luego de 35 a 40 minutos de carretera. Una salida por la mañana el día de llegada solo es realista para vuelos que aterrizan antes de las 07:00 aproximadamente; para el resto, planifique la primera vuelta a la mañana siguiente." },
      { type: "h2", text: "Campos y hoteles de la zona" },
      { type: "p", text: "Los resorts de Belek -entre ellos Regnum Carya, Gloria, Cornelia y Maxx Royal- están a pocos kilómetros entre sí y de sus campos, así que una parada extra por un compañero alojado en otro hotel cuesta minutos y no una hora. En un traslado privado se puede; en una lanzadera compartida no decide usted el orden." },
      { type: "h2", text: "Qué confirmar al reservar" },
      { type: "p", text: "Tres cosas: el número de bolsas de golf, el nombre del hotel y la hora de recogida de vuelta si ya conoce su salida. El precio es fijo por vehículo, así que un vehículo mayor por el equipaje es un presupuesto que ve antes de viajar, nunca un recargo en la acera." },
    ],
    faq: [
      ["¿Las bolsas de golf cuestan un extra?", "No. El precio es fijo por vehículo. Un equipaje mayor puede implicar que enviemos un Sprinter en lugar de un Vito, y ese precio lo ve al reservar."],
      ["¿Cuántas bolsas de golf caben en un Vito?", "Como regla práctica, cuatro bolsas con cuatro pasajeros y maletas estándar. Para más bolsas o jugadores usamos un Sprinter."],
      ["¿Cuánto dura el trayecto del aeropuerto de Antalya a Belek?", "45 km, normalmente de 35 a 40 minutos con tráfico habitual."],
      ["¿Podemos parar en un segundo hotel de Belek?", "Sí. Los resorts están cerca unos de otros, así que una entrega adicional en un traslado privado cuesta solo unos minutos. Indíquelo al reservar."],
    ],
  },
  "when-to-visit-antalya": {
    slug: "mejor-epoca-para-visitar-antalya",
    title: "Mejor época para visitar Antalya: temporada a temporada y su efecto en el traslado",
    heading: "Cuándo visitar Antalya y cómo la temporada cambia su llegada",
    description:
      "Antalya temporada a temporada: clima, afluencia, precios y tráfico aeroportuario. Qué implica cada mes para los horarios, el tráfico y la planificación de su llegada.",
    excerpt:
      "Cada temporada en la Riviera turca ofrece una llegada distinta. Qué cambia entre abril y octubre y por qué importa en la carretera.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Antalya está concurrida unos siete meses y tranquila cinco, y la diferencia se nota mucho antes de llegar a la playa: en los precios de los vuelos, las colas del aeropuerto y el tráfico de la D400." },
      { type: "h2", text: "Abril a mayo: la ventana de mejor relación" },
      { type: "p", text: "La temperatura del mar sube a lo largo de mayo, las máximas diurnas superan los veinte grados y la carretera de la costa está vacía para lo que es el verano. Los vuelos aterrizan a horas civilizadas y la terminal se despeja rápido. Es también cuando un trayecto a Alanya o Kaş resulta agradable en vez de una prueba de resistencia." },
      { type: "h2", text: "Junio a agosto: el pico" },
      { type: "p", text: "Julio y agosto son calurosos, llenos y caros. El aeropuerto de Antalya registra su tráfico más intenso, el control de pasaportes y el equipaje tardan lo máximo, y la carretera de la costa soporta a la vez el tráfico vacacional y el movimiento local de fin de semana. Es entonces cuando un precio fijo y una recogida con seguimiento de vuelo demuestran su valor: nada en la carretera es previsible, así que conviene fijar de antemano todo lo que se pueda fijar." },
      { type: "h2", text: "Septiembre a octubre: el mejor equilibrio" },
      { type: "p", text: "El mar está en su punto más cálido, la afluencia baja semana a semana y los precios caen desde mediados de septiembre. Muchos habituales consideran el final de septiembre la mejor semana del año en esta costa. Los traslados vuelven a cumplir aproximadamente sus tiempos nominales." },
      { type: "h2", text: "Noviembre a marzo: temporada tranquila" },
      { type: "p", text: "Las temperaturas diurnas siguen siendo suaves, muchos hoteles de playa cierran y la ciudad, las montañas y las ruinas toman el relevo de la costa. La oferta de vuelos se reduce y las horas de llegada son menos cómodas, que es justo cuando un vehículo reservado de antemano gana a improvisar en la terminal." },
      { type: "h2", text: "Qué cambia la temporada en su traslado" },
      {
        type: "ul",
        items: [
          "Pleno verano: calcule hasta 45 minutos desde el aterrizaje hasta salir de la terminal y tiempos más largos al este de Manavgat.",
          "Temporada media: los tiempos publicados son realistas.",
          "Invierno: menos vuelos y más aterrizajes nocturnos, así que confirme el número de vuelo y deje que la recogida lo siga.",
          "Todo el año: el precio fijo por vehículo no cambia con la temporada, el tráfico ni la hora.",
        ],
      },
    ],
    faq: [
      ["¿Cuál es el mejor mes para visitar Antalya?", "El final de septiembre suele ofrecer la mejor combinación: el mar en su punto más cálido, menos afluencia y precios ya a la baja."],
      ["¿Está el aeropuerto de Antalya más lleno en verano?", "Bastante más. En julio y agosto calcule hasta 45 minutos desde el aterrizaje hasta salir de la terminal; en temporada media suele ser la mitad."],
      ["¿Cambian los precios del traslado según la temporada?", "No. Nuestros precios son fijos por vehículo y no cambian con la temporada, el tráfico ni la hora del día."],
      ["¿Merece la pena Antalya en invierno?", "Sí, por la ciudad, las montañas y los yacimientos arqueológicos más que por la playa. Muchos hoteles de costa cierran entre noviembre y marzo."],
    ],
  },
};
