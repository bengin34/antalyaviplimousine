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
  "antalya-in-autumn": {
    "slug": "que-hacer-en-antalya-en-otono",
    "title": "Antalya en octubre y noviembre: qué hacer en otoño",
    "heading": "Antalya en otoño: qué hacer en octubre y noviembre",
    "description": "Qué hacer en Antalya en otoño, en octubre y noviembre: mar cálido, playas tranquilas, ruinas antiguas, cañones y golf. El tiempo, qué sigue abierto y cómo llegar.",
    "excerpt": "El mar sigue templado, las multitudes ya se han ido y el calor ha aflojado. Por qué octubre y noviembre son el secreto mejor guardado de la Riviera turca.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "¿Qué hacer en Antalya en otoño? La mayoría de los turistas se marcha a finales de septiembre, y precisamente por eso el otoño funciona tan bien. El mar conserva el calor del verano durante semanas, las temperaturas diurnas bajan a unos agradables 20-25 °C y los lugares que en agosto son insoportables – ruinas, cañones, el casco antiguo – se convierten en lo mejor del viaje."
      },
      {
        "type": "h2",
        "text": "El tiempo en Antalya en otoño"
      },
      {
        "type": "table",
        "head": [
          "Mes",
          "Día / noche",
          "Mar",
          "Sensación"
        ],
        "rows": [
          [
            "Octubre",
            "unos 27 °C / 16 °C",
            "unos 24 °C",
            "Verano sin el calor agobiante: los días de playa siguen siendo lo normal"
          ],
          [
            "Noviembre",
            "unos 21 °C / 11 °C",
            "unos 21 °C",
            "Mañanas soleadas, primeros chubascos, noches frescas"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Lleva ropa para la playa y para la noche: en octubre basta con una chaqueta ligera; en noviembre conviene una capa más abrigada y un chubasquero."
      },
      {
        "type": "h2",
        "text": "Todavía vacaciones de playa: octubre en la costa"
      },
      {
        "type": "p",
        "text": "En octubre las playas de Konyaaltı, Lara, Belek, Side y Alanya siguen abiertas, por la mañana el agua suele estar más caliente que el aire y ya nadie compite por las tumbonas. La mayoría de los grandes resorts de Belek, Side y Kemer abren hasta finales de octubre; a partir de noviembre la oferta se reduce, así que confirma la temporada de tu hotel antes de reservar los vuelos."
      },
      {
        "type": "h2",
        "text": "Yacimientos antiguos sin calor"
      },
      {
        "type": "p",
        "text": "El otoño es la temporada de las ruinas de la región. Perge y Aspendos quedan a un pequeño desvío de la carretera de Belek y Side, el templo de Apolo de Side se alza junto al puerto, y Termessos, en lo alto de las montañas detrás de la ciudad, es una caminata que nadie debería intentar en verano. En noviembre quizá tengas calles enteras de columnatas solo para ti."
      },
      {
        "type": "h2",
        "text": "Naturaleza: cañones, cascadas y la Ruta Licia"
      },
      {
        "type": "ul",
        "items": [
          "Cascadas de Düden: las inferiores caen directamente al mar cerca de Lara; las superiores están en un parque dentro de la ciudad.",
          "Cañón de Köprülü: la temporada de rafting suele alargarse hasta octubre, con aguas más tranquilas que en primavera.",
          "Ruta Licia: otoño y primavera son las dos temporadas de senderismo, y las etapas en torno a Kemer, Olympos y Kaş están ahora en su mejor momento.",
          "Teleférico de Tahtalı, cerca de Kemer: el aire limpio del otoño ofrece las mejores vistas desde la cumbre."
        ]
      },
      {
        "type": "h2",
        "text": "Golf, vida urbana y festivales"
      },
      {
        "type": "p",
        "text": "El otoño es temporada alta de golf en Belek: los campos están verdes, las temperaturas son ideales y las salidas se llenan de grupos del norte de Europa. En la ciudad, las callejuelas, cafés y pequeños museos de Kaleiçi recobran vida cuando se van los cruceristas y las multitudes del verano, y el Festival de Cine Naranja de Oro de Antalya se ha celebrado tradicionalmente en otoño."
      },
      {
        "type": "h2",
        "text": "Llegar a Antalya en otoño"
      },
      {
        "type": "ul",
        "items": [
          "En octubre sigue habiendo muchos vuelos; desde noviembre la programación se reduce y más llegadas aterrizan de noche.",
          "La terminal está más tranquila que en verano, así que los tiempos de trayecto a Belek, Side y Alanya se acercan a los publicados.",
          "Un traslado reservado con antelación sigue tu número de vuelo, así que un vuelo nocturno con retraso no es problema.",
          "Nuestros precios son fijos por vehículo y son los mismos en octubre que en agosto."
        ]
      }
    ],
    "faq": [
      [
        "¿Hace suficiente calor para bañarse en Antalya en octubre?",
        "Sí. El mar suele estar en torno a 24 °C en octubre, más cálido que muchos mares europeos en verano, y los días de playa son lo normal durante todo el mes."
      ],
      [
        "¿Están abiertos los hoteles en Antalya en noviembre?",
        "Los hoteles de la ciudad y muchos resorts siguen abiertos, pero varios grandes resorts de la costa cierran a partir de noviembre. Comprueba las fechas de temporada de tu hotel antes de reservar los vuelos."
      ],
      [
        "¿Qué hacer en Antalya en otoño además de ir a la playa?",
        "Visitar yacimientos antiguos como Perge, Aspendos y Termessos, las cascadas de Düden, el cañón de Köprülü, hacer senderismo por la Ruta Licia, jugar al golf en Belek y recorrer el casco antiguo de Kaleiçi."
      ],
      [
        "¿Cambia el precio del traslado después de la temporada de verano?",
        "No. El precio es fijo por vehículo y no cambia según la temporada, el tráfico ni la hora del día."
      ]
    ]
  },
  "antalya-in-winter": {
    "slug": "que-hacer-en-antalya-en-invierno",
    "title": "Antalya en invierno: qué hacer de diciembre a febrero",
    "heading": "Antalya en invierno: qué hacer entre diciembre y febrero",
    "description": "Qué hacer en Antalya en invierno: casco antiguo, cascadas, ruinas, esquí en Saklıkent, golf invernal y hoteles con spa. El tiempo, qué está abierto y cómo moverse.",
    "excerpt": "Días suaves, nieve en las montañas y una ciudad que vuelve a ser de sus vecinos. Lo que Antalya ofrece entre diciembre y febrero, y lo que no.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "El invierno en Antalya es temporada tranquila, no temporada cerrada. Los resorts de playa descansan, pero la ciudad, las montañas y los yacimientos antiguos siguen abiertos, la luz es clara y los días suelen ser soleados y templados. Es el momento de ver la región como la ven quienes viven aquí, y a precios que los turistas de verano nunca consiguen."
      },
      {
        "type": "h2",
        "text": "El tiempo en Antalya en invierno"
      },
      {
        "type": "table",
        "head": [
          "Mes",
          "Día / noche",
          "Mar",
          "Conviene saber"
        ],
        "rows": [
          [
            "Diciembre",
            "unos 16 °C / 7 °C",
            "unos 19 °C",
            "El mes más lluvioso, pero la lluvia llega a rachas entre días de sol"
          ],
          [
            "Enero",
            "unos 15 °C / 6 °C",
            "unos 17 °C",
            "El mes más fresco; nieve en las cumbres del Tauro"
          ],
          [
            "Febrero",
            "unos 16 °C / 6 °C",
            "unos 17 °C",
            "Días más largos, primeros almendros en flor"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Una tarde soleada de invierno se parece a la primavera del norte de Europa; las noches son frescas y los interiores no siempre están tan caldeados como en países más fríos. Lleva ropa por capas, una chaqueta impermeable y calzado cómodo para las calles empedradas mojadas."
      },
      {
        "type": "h2",
        "text": "La ciudad: Kaleiçi, museos y cascadas"
      },
      {
        "type": "ul",
        "items": [
          "Kaleiçi, el casco antiguo amurallado: la Puerta de Adriano, el Minarete Estriado, el puerto viejo y callejuelas de casas otomanas convertidas en cafés y hoteles boutique.",
          "Museo de Antalya: una de las grandes colecciones arqueológicas de Turquía, con las estatuas de Perge; ideal para un día de lluvia.",
          "Cascadas de Düden y Kurşunlu: con las lluvias de invierno lucen con su mayor caudal y resultan más impresionantes.",
          "Paseos marítimos de Konyaaltı y Lara: largas caminatas, bicicleta y vistas al mar sin el calor del verano."
        ]
      },
      {
        "type": "h2",
        "text": "Yacimientos antiguos sin colas"
      },
      {
        "type": "p",
        "text": "Perge, Aspendos y Side abren todo el año, y en invierno los compartes con un puñado de visitantes. Faselis, cerca de Kemer, tiene tres puertos en un pinar; Olympos y Çıralı son apacibles fuera de temporada. Termessos está en la montaña y puede hacer frío, llover o incluso nevar, así que elige un día seco. Más al oeste, la iglesia de San Nicolás en Demre es una visita natural en invierno, sobre todo en Navidad."
      },
      {
        "type": "h2",
        "text": "Esquí y mar el mismo día"
      },
      {
        "type": "p",
        "text": "La estación de esquí de Saklıkent, en los montes Bakırlı, está a unos 50 km de la ciudad, aproximadamente una hora y media por carretera. Cuando hay nieve suficiente, normalmente de enero a marzo, puedes esquiar por la mañana y pasear junto al mar por la tarde. La carretera de montaña puede exigir neumáticos de invierno o cadenas, así que consulta el estado antes de ir y pídenos presupuesto para el trayecto con antelación."
      },
      {
        "type": "h2",
        "text": "Golf en invierno, hoteles con spa y estancias largas"
      },
      {
        "type": "p",
        "text": "Los campos de golf de Belek siguen abiertos todo el invierno, y los green fees y las tarifas hoteleras están muy por debajo de los de otoño y primavera. Varios resorts de Belek, Lara y Kemer mantienen abiertos el spa y las piscinas cubiertas en invierno, y Alanya y Side atraen a visitantes de larga estancia del norte de Europa que vienen durante semanas o meses de clima suave."
      },
      {
        "type": "h2",
        "text": "Excursiones más lejanas"
      },
      {
        "type": "p",
        "text": "El invierno es buen momento para las excursiones largas que en verano agotan: los travertinos de Pamukkale y las ruinas de Hierápolis, o Capadocia nevada, que muchos consideran la época más bonita del año allí. Ambas suponen largas jornadas de carretera, y un vehículo privado te permite parar cuando y donde quieras."
      },
      {
        "type": "h2",
        "text": "Llegar a Antalya en invierno"
      },
      {
        "type": "ul",
        "items": [
          "Hay menos vuelos directos y más llegadas nocturnas, a menudo con escala en Estambul.",
          "Muchos resorts de la costa están cerrados, así que comprueba que tu hotel abra en tus fechas.",
          "Las paradas de taxi están más tranquilas de noche que en verano; una recogida reservada que sigue tu número de vuelo es la opción más cómoda.",
          "El precio fijo por vehículo es el mismo en invierno que en verano, sin recargo nocturno ni por festivos."
        ]
      }
    ],
    "faq": [
      [
        "¿Merece la pena visitar Antalya en invierno?",
        "Sí, si vienes por la ciudad, los yacimientos antiguos, la naturaleza y el golf más que para tomar el sol. Los días suelen ser soleados, con temperaturas en torno a 15 °C, y no hay aglomeraciones."
      ],
      [
        "¿Se puede nadar en Antalya en invierno?",
        "El mar se mantiene en torno a 17-19 °C, algo que a algunos visitantes les resulta refrescante en un día soleado. Muchos hoteles que abren en invierno tienen además piscinas cubiertas climatizadas."
      ],
      [
        "¿Se puede esquiar cerca de Antalya?",
        "Sí. La estación de esquí de Saklıkent está a unos 50 km de la ciudad. La temporada depende de la nieve y suele ir de enero a marzo."
      ],
      [
        "¿Están abiertos los hoteles de Antalya en invierno?",
        "Los hoteles de la ciudad y de Kaleiçi abren todo el año, igual que varios resorts de Lara, Belek, Kemer, Side y Alanya. Muchos grandes resorts de temporada cierran de noviembre a marzo."
      ],
      [
        "¿Hacéis traslados desde el aeropuerto de Antalya en invierno?",
        "Sí, durante todo el año, incluidas llegadas nocturnas y festivos, al mismo precio fijo por vehículo."
      ]
    ]
  },
  "christmas-new-year-antalya": {
    "slug": "navidad-y-nochevieja-en-antalya",
    "title": "Navidad y Nochevieja en Antalya: guía práctica",
    "heading": "Navidad y Año Nuevo en Antalya",
    "description": "Pasar la Navidad o la Nochevieja en Antalya: el tiempo, qué hoteles abren, cenas de gala, San Nicolás en Demre y cómo ir y volver del aeropuerto en las noches clave.",
    "excerpt": "Días de sol, una gala de Nochevieja junto al mar y la ciudad de San Nicolás a dos horas y media. Cómo planear las fiestas en Antalya y cómo llegar esa noche.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Navidad y Nochevieja en Antalya son uno de los pocos picos del invierno. Familias que huyen del invierno del norte, grupos que celebran el Año Nuevo y viajeros que combinan las fiestas con unos días de sol suave llegan todos en la misma quincena, mientras gran parte de la costa está en temporada tranquila."
      },
      {
        "type": "h2",
        "text": "Qué esperar a finales de diciembre"
      },
      {
        "type": "p",
        "text": "Los días suelen alcanzar unos 15-16 °C y a menudo son soleados, aunque diciembre es también el mes más lluvioso del año. La Navidad no es festivo en Turquía, así que tiendas, restaurantes y monumentos funcionan con normalidad el 25 de diciembre. La Nochevieja, en cambio, se celebra por todo lo alto, y el 1 de enero es festivo."
      },
      {
        "type": "h2",
        "text": "Qué hoteles están abiertos"
      },
      {
        "type": "p",
        "text": "Los hoteles de la ciudad y de Kaleiçi abren todo el año, y varios resorts de Lara, Belek, Kemer, Side y Alanya abren expresamente para las fiestas con cena de Navidad y gala de Nochevieja. Los programas, el código de vestimenta y los suplementos de gala varían mucho, así que pregunta a tu hotel qué incluye antes de reservar. Las habitaciones de los resorts abiertos se agotan pronto para estas fechas."
      },
      {
        "type": "h2",
        "text": "Navidad: la ciudad de San Nicolás"
      },
      {
        "type": "p",
        "text": "El San Nicolás histórico, el obispo que dio origen a la leyenda de Papá Noel, vivió en Myra, la actual Demre, a unas dos horas y media al oeste de Antalya. La iglesia de San Nicolás y las tumbas licias excavadas en la roca de Myra son una excursión navideña memorable, que puede combinarse con una parada en Kaş o con la carretera de la costa en torno a Kumluca."
      },
      {
        "type": "h2",
        "text": "Nochevieja en Antalya"
      },
      {
        "type": "ul",
        "items": [
          "Galas de hotel: cena, música en directo y cuenta atrás, normalmente con menú cerrado y suplemento.",
          "La ciudad: los restaurantes de Kaleiçi y de la zona del puerto deportivo se llenan; reserva mesa con antelación.",
          "Lara y Konyaaltı: beach clubs y restaurantes con vistas al mar organizan sus propias fiestas.",
          "Se pueden ver fuegos artificiales a lo largo del paseo marítimo, aunque el programa cambia de un año a otro."
        ]
      },
      {
        "type": "h2",
        "text": "Cómo moverse en las noches de más ajetreo"
      },
      {
        "type": "p",
        "text": "En Nochevieja y en las primeras horas del 1 de enero cuesta muchísimo encontrar taxi, y las apps y las paradas se saturan justo cuando todo el mundo quiere irse. Si celebras fuera de tu hotel – en la ciudad, en un restaurante o en la villa de unos amigos – reserva la vuelta con antelación y con una hora de recogida fija."
      },
      {
        "type": "h2",
        "text": "Llegadas y salidas en fiestas"
      },
      {
        "type": "ul",
        "items": [
          "Los vuelos en torno al 20 de diciembre y al 2 de enero son los más concurridos del invierno; reserva pronto.",
          "Muchos vuelos de las fiestas aterrizan por la tarde o de noche; una recogida que sigue tu número de vuelo evita esperas en la terminal.",
          "Si viajáis en familia con regalos de Navidad y equipaje de invierno, indicad el número de maletas para que asignemos el vehículo adecuado.",
          "Nuestro precio fijo por vehículo no tiene recargo por festivos ni por Nochevieja."
        ]
      }
    ],
    "faq": [
      [
        "¿Qué tiempo hace en Antalya en Navidad?",
        "Suave: normalmente unos 15-16 °C de día y 6-8 °C de noche, con ratos de sol entre chubascos. No es tiempo de playa, pero suele ser agradable para pasear y hacer turismo."
      ],
      [
        "¿Se celebra la Navidad en Antalya?",
        "La Navidad no es festivo en Turquía, pero muchos hoteles con clientela internacional organizan una cena de Navidad. La Nochevieja se celebra ampliamente y el 1 de enero es festivo."
      ],
      [
        "¿Dónde está la iglesia de San Nicolás?",
        "En Demre, la antigua Myra, a unas dos horas y media en coche al oeste de Antalya. Se puede visitar todo el año."
      ],
      [
        "¿Puedo reservar un traslado para la noche de Nochevieja?",
        "Sí. Recomendamos reservar la vuelta con una hora de recogida fija, porque después de medianoche es muy difícil encontrar taxi. El precio fijo por vehículo no tiene recargo por festivos."
      ]
    ]
  },
  "wintering-in-antalya": {
    "slug": "pasar-el-invierno-en-antalya-guia-larga-estancia",
    "title": "Pasar el invierno en Antalya y Alanya: guía de larga estancia",
    "heading": "Pasar el invierno en Antalya: guía para estancias largas",
    "description": "Pasar el invierno en la Riviera turca: por qué Alanya, Side y Antalya atraen estancias largas, qué esperar del clima, alojamiento, sanidad y llegar con mucho equipaje.",
    "excerpt": "Semanas o meses de clima suave en lugar del invierno del norte. Lo que conviene saber antes de pasar el invierno en Alanya, Side o Antalya.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Cada invierno, miles de visitantes de Alemania, Escandinavia, los Países Bajos, Rusia y Polonia cambian los cielos grises por la Riviera turca durante semanas o meses. Las temperaturas suaves, los largos paseos marítimos y un coste de vida más bajo que en casa convierten a Antalya, Alanya y Side en algunos de los destinos más populares del Mediterráneo para pasar el invierno."
      },
      {
        "type": "h2",
        "text": "Por qué pasar el invierno aquí"
      },
      {
        "type": "ul",
        "items": [
          "Clima suave: días de invierno en torno a 15-17 °C, a menudo soleados, y heladas poco frecuentes en la costa.",
          "Luz: bastantes más horas de sol que en el norte y el centro de Europa.",
          "Espacio: paseos, playas y cascos antiguos sin las multitudes del verano.",
          "Infraestructura: en las ciudades más grandes, tiendas, mercados, restaurantes y hospitales privados abren todo el año."
        ]
      },
      {
        "type": "h2",
        "text": "Dónde alojarse"
      },
      {
        "type": "table",
        "head": [
          "Lugar",
          "Ideal para",
          "Distancia desde el aeropuerto"
        ],
        "rows": [
          [
            "Antalya ciudad",
            "Vida urbana, cultura, museos, todos los servicios a mano",
            "unos 15-30 minutos"
          ],
          [
            "Side / Manavgat",
            "Un casco antiguo tranquilo, playas largas, paseos llanos",
            "alrededor de 1 hora"
          ],
          [
            "Alanya",
            "La mayor comunidad de estancias largas, paseos marítimos, vida invernal activa",
            "alrededor de 1 hora y 45 minutos"
          ],
          [
            "Kemer",
            "Montaña y mar, senderismo, un destino más pequeño",
            "alrededor de 1 hora"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Alanya y sus barrios vecinos, como Mahmutlar y Oba, reúnen la mayor comunidad invernal de huéspedes de larga estancia, con clubes, actividades y restaurantes animados todo el invierno. Side es más tranquilo; Antalya es para quien quiere una ciudad de verdad."
      },
      {
        "type": "h2",
        "text": "Alojamiento: hoteles y apartamentos"
      },
      {
        "type": "p",
        "text": "Algunos hoteles de Alanya, Side y Antalya ofrecen tarifas especiales para estancias de cuatro semanas o más, a menudo en media pensión. Un apartamento de alquiler da más espacio e independencia; comprueba si tiene calefacción o aire acondicionado con bomba de calor, porque las casas de la costa turca están pensadas para el verano y pueden resultar frías las noches de invierno."
      },
      {
        "type": "h2",
        "text": "El día a día en invierno"
      },
      {
        "type": "ul",
        "items": [
          "Mercados semanales en cada barrio para fruta y verdura fresca; el invierno es temporada de cítricos.",
          "Caminar y pedalear por los paseos marítimos de Alanya, Side, Lara y Konyaaltı.",
          "Senderismo en las estribaciones del Tauro y en la Ruta Licia los días secos.",
          "Excursiones de un día a yacimientos antiguos, a la cascada de Manavgat o al casco antiguo de Antalya.",
          "Hospitales privados y clínicas en Antalya y Alanya con departamentos de atención a pacientes internacionales."
        ]
      },
      {
        "type": "h2",
        "text": "Trámites y aspectos prácticos"
      },
      {
        "type": "p",
        "text": "Los requisitos de entrada y el tiempo de estancia permitido sin permiso de residencia dependen de tu nacionalidad y cambian de vez en cuando, así que consulta las normas vigentes con las autoridades turcas oficiales antes de viajar. Se recomienda encarecidamente un seguro de viaje que cubra una estancia larga en el extranjero."
      },
      {
        "type": "h2",
        "text": "Llegar con equipaje para meses"
      },
      {
        "type": "p",
        "text": "Quien viene a pasar el invierno viaja con algo más que una maleta de vacaciones. Dinos cuántas maletas y bultos adicionales traes – bicicletas, andadores o cajas – y asignaremos una Mercedes Vito o, si hace falta, una Sprinter. El precio es fijo por vehículo, así que el equipaje extra se tiene en cuenta al reservar, no se cobra en la acera. El conductor ayuda a cargar y descargar hasta la puerta."
      }
    ],
    "faq": [
      [
        "¿Cuál es el mejor lugar para pasar el invierno en la Riviera turca?",
        "Alanya tiene la mayor comunidad de estancias largas y la vida invernal más animada; Side es más tranquilo; Antalya ofrece todos los servicios de una ciudad. Los tres tienen inviernos suaves."
      ],
      [
        "¿Qué temperatura hace en Antalya en invierno?",
        "Las máximas suelen rondar los 15-17 °C de diciembre a febrero, con noches en torno a 6-8 °C. Las heladas en la costa son raras."
      ],
      [
        "¿Hay ofertas de hotel para estancias largas en invierno?",
        "Sí. Varios hoteles de Alanya, Side y Antalya ofrecen en invierno tarifas mensuales o de larga estancia reducidas. Pregunta directamente al hotel por estancias de cuatro semanas o más."
      ],
      [
        "¿Se puede llevar mucho equipaje en el traslado desde el aeropuerto?",
        "Sí. Indica el número de maletas y bultos adicionales al reservar y asignaremos un vehículo con espacio suficiente. El precio es por vehículo, sin cargo por maleta."
      ]
    ]
  },
  "antalya-in-spring": {
    "slug": "que-hacer-en-antalya-en-primavera",
    "title": "Antalya en primavera: qué hacer de marzo a mayo",
    "heading": "Antalya en primavera: qué hacer entre marzo y mayo",
    "description": "Qué hacer en Antalya en primavera: azahar, senderismo por la Ruta Licia, rafting, Semana Santa y los primeros días de playa. El tiempo mes a mes y qué esperar al llegar.",
    "excerpt": "Azahar en las calles, nieve en las cumbres y un mar que se templa semana a semana. Por qué la primavera es la temporada de las vacaciones activas en Antalya.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "La primavera llega pronto a Antalya y a la Riviera turca. En marzo los naranjos ya están en flor, los montes Tauro conservan la nieve y los días son lo bastante cálidos para sentarse al aire libre. Es la mejor temporada para caminar, pedalear y explorar, y en mayo empiezan los primeros días de playa del año."
      },
      {
        "type": "h2",
        "text": "El tiempo en Antalya en primavera"
      },
      {
        "type": "table",
        "head": [
          "Mes",
          "Día / noche",
          "Mar",
          "Ideal para"
        ],
        "rows": [
          [
            "Marzo",
            "unos 19 °C / 8 °C",
            "unos 17 °C",
            "Turismo, senderismo, floración"
          ],
          [
            "Abril",
            "unos 22 °C / 11 °C",
            "unos 18 °C",
            "Senderismo, rafting, Semana Santa"
          ],
          [
            "Mayo",
            "unos 26 °C / 15 °C",
            "unos 21 °C",
            "Los primeros días de playa, todas las actividades"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "El azahar y la ciudad en primavera"
      },
      {
        "type": "p",
        "text": "En primavera Antalya huele a azahar. La ciudad lo celebra con el Carnaval del Azahar, una fiesta callejera que se organiza en primavera en torno a Kaleiçi y el centro. Es también el mejor momento para recorrer a pie el casco antiguo, el Museo de Antalya y los acantilados de Konyaaltı y Lara antes de que llegue el calor del verano."
      },
      {
        "type": "h2",
        "text": "Vacaciones activas: senderismo, rafting y bicicleta"
      },
      {
        "type": "ul",
        "items": [
          "Ruta Licia: la primavera es la temporada de senderismo más popular, con flores silvestres en las etapas cerca de Kemer, Olympos y Kaş.",
          "Cañón de Köprülü: la temporada de rafting suele empezar en abril, con aguas vivas por el deshielo.",
          "Teleférico de Tahtalı: nieve en la cima y prados en flor abajo, a menudo en la misma vista.",
          "Bicicleta: carreteras tranquilas y temperaturas suaves en torno a Belek, Side y las estribaciones del Tauro.",
          "Golf: la primavera es la segunda temporada alta en los campos de Belek."
        ]
      },
      {
        "type": "h2",
        "text": "Yacimientos antiguos en la estación verde"
      },
      {
        "type": "p",
        "text": "Perge, Aspendos, Side, Faselis y Termessos están en su momento más bonito en primavera, cuando las ruinas se rodean de hierba verde y flores silvestres. Las excursiones largas también funcionan bien: Pamukkale y Capadocia tienen temperaturas agradables, y los vuelos en globo sobre Capadocia son frecuentes en primavera cuando el tiempo es estable."
      },
      {
        "type": "h2",
        "text": "Semana Santa y vacaciones de primavera"
      },
      {
        "type": "p",
        "text": "La Semana Santa y las vacaciones escolares de primavera en Alemania, los Países Bajos, el Reino Unido y Escandinavia traen la primera oleada de familias. Desde abril abren más hoteles de temporada, aumentan los vuelos y en mayo la mayoría de los resorts de la costa funcionan a pleno rendimiento. Para las fechas de Semana Santa, reserva pronto hotel y traslado."
      },
      {
        "type": "h2",
        "text": "Llegar a Antalya en primavera"
      },
      {
        "type": "ul",
        "items": [
          "En marzo algunos resorts siguen cerrados; desde abril la oferta crece rápidamente.",
          "La terminal y las carreteras están tranquilas, así que los tiempos de trayecto publicados son realistas.",
          "Indica al reservar si llevas equipo de senderismo o de golf, bicicletas o necesitas sillas infantiles.",
          "El precio es fijo por vehículo y no cambia con la temporada."
        ]
      }
    ],
    "faq": [
      [
        "¿Hace calor para ir a la playa en Antalya en primavera?",
        "A partir de mayo, sí: los días alcanzan unos 26 °C y el mar unos 21 °C. En marzo y abril hace buen tiempo para tomar el sol, pero el mar sigue fresco para la mayoría de los bañistas."
      ],
      [
        "¿Cuándo se celebra el Carnaval del Azahar en Antalya?",
        "Se celebra en primavera, cuando florecen los naranjos de la ciudad. Las fechas cambian cada año, así que consulta los anuncios oficiales de la ciudad antes de planear tu viaje en torno a él."
      ],
      [
        "¿Es la primavera buena época para hacer la Ruta Licia?",
        "Sí. La primavera y el otoño son las dos mejores temporadas de senderismo; en primavera los caminos están verdes y llenos de flores silvestres, y las temperaturas son agradables."
      ],
      [
        "¿Están abiertos los hoteles en Antalya en marzo?",
        "Los hoteles de la ciudad y algunos resorts están abiertos. Muchos resorts de temporada abren a lo largo de abril, y en mayo casi toda la costa funciona a pleno rendimiento."
      ]
    ]
  },
  "cappadocia-winter-trip": {
    "slug": "capadocia-en-invierno-desde-antalya",
    "title": "Capadocia en invierno desde Antalya: nieve, globos y la carretera",
    "heading": "Capadocia en invierno: un viaje desde Antalya",
    "description": "Capadocia en invierno desde Antalya: nieve, clima, globos aerostáticos, hoteles cueva, qué ver y cómo es en invierno el viaje de 540 km por carretera vía Konya.",
    "excerpt": "Chimeneas de hadas bajo la nieve y globos sobre un valle blanco. Cómo combinar una estancia de invierno en Antalya con Capadocia y cómo es la carretera en invierno.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Capadocia en invierno es uno de los paisajes más fotografiados de Turquía: chimeneas de hadas y valles bajo la nieve, hoteles cueva con chimenea encendida y, en las mañanas despejadas, globos que se elevan sobre un paisaje blanco. Desde Antalya es un viaje por carretera largo pero precioso, y el complemento natural de una estancia de invierno en la costa."
      },
      {
        "type": "h2",
        "text": "El clima en invierno: nada que ver con la costa"
      },
      {
        "type": "p",
        "text": "Capadocia está en una meseta elevada, a unos 1000 metros de altitud o más, así que allí el invierno es un invierno de verdad. Durante el día las temperaturas rondan a menudo los cero grados, por la noche bajan muy por debajo y la nieve es habitual de diciembre a febrero. Lleva un buen abrigo de invierno, guantes, gorro y calzado impermeable: la ropa adecuada para Antalya en enero no basta aquí."
      },
      {
        "type": "table",
        "head": [
          "",
          "Costa de Antalya",
          "Capadocia"
        ],
        "rows": [
          [
            "Día típico de invierno",
            "unos 15 °C",
            "entre 0 y 5 °C"
          ],
          [
            "Noches de invierno",
            "unos 6-8 °C",
            "a menudo bajo cero"
          ],
          [
            "Nieve",
            "solo en las cumbres",
            "habitual de diciembre a febrero"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Globos aerostáticos en invierno"
      },
      {
        "type": "p",
        "text": "Los globos vuelan todo el año cuando el tiempo lo permite, y un vuelo al amanecer sobre valles nevados es la imagen que muchos vienen a buscar. El invierno también trae más cancelaciones por viento, niebla o nieve, y la decisión la toman las autoridades cada mañana a primera hora. Reserva al menos dos noches en Capadocia para que un vuelo cancelado no signifique perdértelo del todo."
      },
      {
        "type": "h2",
        "text": "Qué ver en invierno"
      },
      {
        "type": "ul",
        "items": [
          "Museo al Aire Libre de Göreme: iglesias excavadas en la roca con frescos, más tranquilas en invierno que en cualquier otra época del año.",
          "Ciudades subterráneas como Derinkuyu y Kaymaklı: varios niveles de profundidad y una temperatura agradable y constante haga el tiempo que haga fuera.",
          "El castillo de Uçhisar y los miradores sobre Göreme: los mejores lugares para panorámicas nevadas.",
          "Paseos cortos por los valles Rosa, Rojo y del Amor en días secos y despejados; los senderos pueden estar helados después de nevar.",
          "Hoteles cueva: muchos tienen calefacción y chimenea, y el invierno es la temporada en que resultan más especiales."
        ]
      },
      {
        "type": "h2",
        "text": "La carretera desde Antalya"
      },
      {
        "type": "p",
        "text": "El trayecto es de unos 540 km y suele durar de 7 a 8 horas: se cruzan los montes Tauro y se continúa por la meseta vía Konya. Konya, con el Museo Mevlana, es la parada natural para partir el viaje. En invierno el tramo de montaña puede tener nieve y hielo; las carreteras se limpian, pero un vehículo con equipamiento de invierno y un conductor que conozca la ruta marcan la diferencia entre un día largo y un día estresante."
      },
      {
        "type": "h2",
        "text": "Cómo planificar el viaje"
      },
      {
        "type": "ul",
        "items": [
          "Calcula al menos dos noches, mejor tres, para tener margen ante cancelaciones de globos y los días cortos de invierno.",
          "Sal de Antalya por la mañana para cruzar las montañas con luz de día.",
          "Combina el viaje con una estancia en la costa: unos días en Antalya o Side y luego Capadocia, o al revés.",
          "Reserva con antelación el hotel cueva y el vuelo en globo para Navidad y Año Nuevo."
        ]
      },
      {
        "type": "h2",
        "text": "Traslado entre Antalya y Capadocia"
      },
      {
        "type": "p",
        "text": "Ofrecemos traslados privados desde el aeropuerto de Antalya y desde hoteles de la costa hasta Capadocia, solo ida o con regreso en una fecha posterior. El precio es fijo por vehículo, puedes parar para hacer fotos, comer y visitar Konya, y no hay otros pasajeros a los que esperar. Indícanos tu hotel y tus fechas al reservar."
      }
    ],
    "faq": [
      [
        "¿A qué distancia está Capadocia de Antalya?",
        "A unos 540 km por carretera. El trayecto suele durar de 7 a 8 horas vía Konya, algo más con paradas o con nieve."
      ],
      [
        "¿Merece la pena visitar Capadocia en invierno?",
        "Sí. La nieve sobre las chimeneas de hadas, los lugares tranquilos y los acogedores hoteles cueva hacen del invierno una de las épocas más bonitas allí. Lleva ropa de abrigo: hace mucho más frío que en la costa."
      ],
      [
        "¿Vuelan los globos en Capadocia en invierno?",
        "Sí, siempre que el tiempo lo permita. En invierno las cancelaciones son más frecuentes, así que calcula al menos dos noches para tener una segunda oportunidad."
      ],
      [
        "¿Puedo ir de Antalya a Capadocia en traslado privado?",
        "Sí. Ofrecemos traslados privados desde el aeropuerto de Antalya y hoteles de la costa hasta Capadocia, solo ida o ida y vuelta, a precio fijo por vehículo."
      ]
    ]
  },
  "belek-winter-golf": {
    "slug": "golf-en-invierno-en-belek",
    "title": "Golf en invierno en Belek: jugar en la Riviera turca de noviembre a marzo",
    "heading": "Golf en invierno en Belek",
    "description": "Por qué Belek es un destino de golf en invierno: clima de noviembre a marzo, estado de los campos, green fees más bajos, qué llevar y cómo llegar a Belek con las bolsas de golf.",
    "excerpt": "Días templados, calles verdes y salidas menos concurridas. Lo que debe saber un golfista para jugar en Belek entre noviembre y marzo, cuando los campos de casa están cerrados.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Cuando los campos del norte de Europa están helados, encharcados o cerrados, el golf en invierno sigue en Belek. El conjunto de campos de campeonato situado a 45 km al este del aeropuerto de Antalya permanece abierto todo el invierno, y los meses de noviembre a marzo se han convertido en una temporada propia para los golfistas que no quieren parar entre octubre y abril."
      },
      {
        "type": "h2",
        "text": "Qué tiempo hace en el campo"
      },
      {
        "type": "table",
        "head": [
          "Mes",
          "Día típico",
          "En el campo"
        ],
        "rows": [
          [
            "Noviembre",
            "unos 21 °C",
            "Condiciones excelentes, todavía temporada alta de otoño"
          ],
          [
            "Diciembre - enero",
            "unos 15-16 °C",
            "Templado y a menudo soleado, con algunos días de lluvia"
          ],
          [
            "Febrero",
            "unos 16 °C",
            "Los días se alargan, menos días de lluvia"
          ],
          [
            "Marzo",
            "unos 19 °C",
            "El comienzo de la temporada alta de primavera"
          ]
        ]
      },
      {
        "type": "p",
        "text": "La mayoría de los días de invierno se puede jugar con un jersey ligero. La lluvia suele llegar en chubascos cortos más que durante semanas enteras, y los campos están diseñados para drenar rápido. Las mañanas pueden ser frescas y la luz se va a última hora de la tarde, así que las salidas suelen ser más temprano que en verano."
      },
      {
        "type": "h2",
        "text": "Por qué el invierno sale a cuenta"
      },
      {
        "type": "ul",
        "items": [
          "Los green fees y las tarifas de hotel suelen ser más bajos en diciembre, enero y febrero que en otoño y primavera.",
          "Las hojas de salida están menos llenas, así que las vueltas son más rápidas y es más fácil conseguir los horarios preferidos.",
          "Varios hoteles de golf abren todo el invierno, muchos con piscina cubierta y spa para la tarde.",
          "Los vuelos cortos desde la mayor parte de Europa hacen que un puente largo sea tan viable como un viaje de una semana."
        ]
      },
      {
        "type": "h2",
        "text": "Campos y hoteles en invierno"
      },
      {
        "type": "p",
        "text": "No todos los campos y hoteles de Belek siguen el mismo calendario en invierno, y a veces se programan trabajos de mantenimiento como el pinchado o la resiembra en los meses tranquilos. Al reservar, pregunta qué campos están abiertos en tus fechas y si hay algún mantenimiento previsto. Los hoteles de golf suelen gestionar los horarios de salida y los traslados a sus campos asociados."
      },
      {
        "type": "h2",
        "text": "Qué llevar para jugar al golf en invierno"
      },
      {
        "type": "ul",
        "items": [
          "Capas: una primera capa térmica, un jersey y una prenda cortavientos para las mañanas frescas.",
          "Chaqueta y pantalón impermeables para algún chubasco ocasional.",
          "Guantes o manoplas de invierno entre golpe y golpe, además de los guantes de golf normales.",
          "Protección solar: el sol de invierno sigue siendo fuerte en los días despejados."
        ]
      },
      {
        "type": "h2",
        "text": "Cómo llegar a Belek con las bolsas de golf"
      },
      {
        "type": "p",
        "text": "Del aeropuerto de Antalya a Belek hay de 35 a 40 minutos por carretera, y en invierno la terminal está tranquila, así que jugar una vuelta la misma tarde de la llegada suele ser realista. El precio es fijo por vehículo, no por bolsa: por norma general, una Mercedes Vito lleva a cuatro jugadores con cuatro bolsas de golf y su equipaje, y los grupos más grandes viajan en una Sprinter. Indícanos el número de bolsas al reservar."
      }
    ],
    "faq": [
      [
        "¿Se puede jugar al golf en Belek en invierno?",
        "Sí. Los campos de Belek permanecen abiertos todo el invierno, con temperaturas diurnas típicas de unos 15-16 °C en diciembre y enero, y la mayoría de los días se puede jugar."
      ],
      [
        "¿Es más barato el golf en Belek en invierno?",
        "Los green fees y las tarifas de hotel suelen ser más bajos en diciembre, enero y febrero que en las temporadas altas de otoño y primavera. Los precios exactos dependen del campo y del hotel."
      ],
      [
        "¿Cuál es el mejor mes para jugar al golf en Belek?",
        "Octubre-noviembre y marzo-abril son los meses de temporada alta de golf. El invierno es más tranquilo y más barato, con días algo más frescos."
      ],
      [
        "¿Las bolsas de golf cuestan extra en el traslado?",
        "No. El precio es fijo por vehículo. Si hay más bolsas, asignamos un vehículo más grande y ves ese precio al reservar."
      ]
    ]
  },
  "saklikent-ski-antalya": {
    "slug": "esquiar-cerca-de-antalya-saklikent",
    "title": "Esquiar cerca de Antalya: guía de la estación de esquí de Saklıkent",
    "heading": "Esquiar cerca de Antalya: la estación de esquí de Saklıkent",
    "description": "Esquiar cerca de Antalya en Saklıkent: dónde está, cuánto se tarda en llegar, cuándo es la temporada, qué esperar en las pistas y cómo combinar esquí y mar en un solo día.",
    "excerpt": "Esquí por la mañana, paseo junto al mar por la tarde. Una guía práctica de Saklıkent, la estación de esquí de Antalya, y de cómo llegar desde la costa.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Pocas regiones de vacaciones permiten esquiar y pasear junto al mar el mismo día. Antalya sí: la estación de esquí de Saklıkent está en los montes Bakırlı, a unos 50 km de la ciudad, y en un buen día de invierno puedes estar en las pistas por la mañana y de vuelta en el paseo marítimo para ver la puesta de sol."
      },
      {
        "type": "h2",
        "text": "Dónde está Saklıkent"
      },
      {
        "type": "p",
        "text": "La estación se encuentra a unos 1900 metros de altitud, en las laderas de los montes Bakırlı, al oeste de Antalya. Desde la ciudad se tarda aproximadamente una hora y media, subiendo de los naranjales al pinar y luego a la nieve. En los días despejados, la vista desde arriba llega hasta la costa y el mar."
      },
      {
        "type": "h2",
        "text": "Cuándo es la temporada"
      },
      {
        "type": "p",
        "text": "La temporada de esquí depende por completo de la nieve y suele ir de enero a marzo. Algunos inviernos empieza antes o termina antes, así que consulta el estado de la nieve y de los remontes antes de planificar un día allí."
      },
      {
        "type": "h2",
        "text": "Qué esperar en las pistas"
      },
      {
        "type": "ul",
        "items": [
          "Una estación pequeña y tranquila, ideal para principiantes, familias y un día de esquí durante unas vacaciones en la costa más que para una semana entera de esquí.",
          "Normalmente se puede alquilar equipo de esquí y snowboard en la estación; consulta los horarios antes de ir.",
          "Los trineos y los juegos en la nieve son muy populares entre las familias, sobre todo los fines de semana.",
          "Los fines de semana hay mucho visitante local; entre semana está mucho más tranquilo."
        ]
      },
      {
        "type": "h2",
        "text": "Esquí y mar en un solo día"
      },
      {
        "type": "ul",
        "items": [
          "Sal de la costa temprano por la mañana para llegar cuando abran los remontes.",
          "Esquía o juega en la nieve hasta primera hora de la tarde.",
          "Baja de nuevo para comer tarde en Kaleiçi o pasear por la playa de Konyaaltı.",
          "Lleva ropa de recambio: la diferencia de temperatura entre las pistas y la costa puede ser de 15 grados o más."
        ]
      },
      {
        "type": "h2",
        "text": "Cómo llegar: la carretera de montaña en invierno"
      },
      {
        "type": "p",
        "text": "No hay transporte público regular hasta la estación, y el último tramo de la carretera de montaña puede tener nieve y hielo. Pueden exigirse neumáticos de invierno o cadenas. Un traslado privado te lleva desde tu hotel en Antalya, Kemer, Belek o Side hasta las pistas y de vuelta, y el tiempo en la montaña lo decides tú. No es una de nuestras rutas estándar, así que envíanos tu hotel, la fecha y el número de personas y te daremos un precio fijo por vehículo."
      },
      {
        "type": "h2",
        "text": "Otras opciones de esquí desde Antalya"
      },
      {
        "type": "p",
        "text": "Para un viaje de esquí más largo, Davraz, cerca de Isparta, es una estación más grande con más pistas, a unas dos horas y media o tres horas de Antalya por carretera. Saklıkent sigue siendo la opción más sencilla para un día de nieve durante una estancia en la costa."
      }
    ],
    "faq": [
      [
        "¿Se puede esquiar cerca de Antalya?",
        "Sí. La estación de esquí de Saklıkent está a unos 50 km de la ciudad de Antalya, aproximadamente una hora y media por carretera, en los montes Bakırlı."
      ],
      [
        "¿Cuándo es la temporada de esquí en Saklıkent?",
        "Depende de la nieve. La temporada suele ir de enero a marzo; consulta las condiciones actuales antes de ir."
      ],
      [
        "¿Se puede esquiar y bañarse el mismo día en Antalya?",
        "Puedes esquiar por la mañana y estar junto al mar por la tarde. Bañarse en invierno es para valientes: el mar está a unos 17 °C."
      ],
      [
        "¿Cómo llego a Saklıkent desde mi hotel?",
        "No hay transporte público regular. Podemos darte precio para un traslado privado desde tu hotel hasta la estación y de vuelta, a precio fijo por vehículo."
      ]
    ]
  },
  "pamukkale-trip-from-antalya": {
    "slug": "excursion-pamukkale-desde-antalya",
    "title": "Excursión a Pamukkale desde Antalya: en un día o con noche, y cuándo ir",
    "heading": "Pamukkale desde Antalya: cómo organizar la excursión",
    "description": "Excursión a Pamukkale desde Antalya: distancia y tiempo de viaje, ida y vuelta en un día o con noche, los travertinos, Hierápolis, la Piscina Antigua y la mejor época para ir.",
    "excerpt": "Terrazas de travertino blanco, una ciudad romana en la colina y una piscina entre columnas antiguas. Cómo visitar Pamukkale desde Antalya sin pasar el día entero en un autobús.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Una excursión a Pamukkale desde Antalya lleva a uno de los lugares más famosos de Türkiye: terrazas de travertino blanco llenas de agua templada y rica en minerales y, por encima, las ruinas de la ciudad romana de Hierápolis. Desde Antalya hay unos 245 km por carretera, entre tres y tres horas y media en cada sentido: lo bastante cerca para ir y volver en un día, pero lo bastante lejos como para que pasar una noche allí haga la visita mucho más tranquila."
      },
      {
        "type": "h2",
        "text": "Qué ver en Pamukkale"
      },
      {
        "type": "ul",
        "items": [
          "Los travertinos: se recorren descalzo por las terrazas, entre agua templada y poco profunda; no se permite el calzado sobre la superficie blanca.",
          "Hierápolis: una gran ciudad romana con teatro, una calle monumental y una de las necrópolis antiguas más grandes de Anatolia.",
          "La Piscina Antigua: baño en agua termal caliente entre columnas antiguas caídas (entrada aparte).",
          "El Museo Arqueológico de Hierápolis: hallazgos del yacimiento, expuestos en las antiguas termas romanas.",
          "Laodicea: a poca distancia en coche, otra gran ciudad antigua con muchos menos visitantes."
        ]
      },
      {
        "type": "h2",
        "text": "¿En un día o con noche?"
      },
      {
        "type": "table",
        "head": [
          "",
          "Ida y vuelta en un día",
          "Con una noche allí"
        ],
        "rows": [
          [
            "Tiempo en carretera",
            "6-7 horas en un solo día",
            "Repartido en dos días"
          ],
          [
            "Tiempo en el yacimiento",
            "3-4 horas, normalmente a mediodía",
            "Última hora de la tarde y primera de la mañana"
          ],
          [
            "Afluencia",
            "Llegada a la vez que los autobuses de excursión",
            "Atardecer y mañana con mucha menos gente"
          ],
          [
            "Ideal para",
            "Viajeros con poco tiempo",
            "Familias, fotógrafos y quien quiera bañarse"
          ]
        ]
      },
      {
        "type": "p",
        "text": "La mayoría de las excursiones en grupo llegan hacia mediodía, cuando las terrazas están más concurridas y, en verano, la superficie blanca deslumbra y quema. Pasar la noche en Pamukkale o en el pueblo termal de Karahayıt permite ver los travertinos al atardecer y de nuevo en la calma de la mañana."
      },
      {
        "type": "h2",
        "text": "La mejor época para visitar Pamukkale"
      },
      {
        "type": "p",
        "text": "La primavera y el otoño son las estaciones más agradables: temperaturas suaves para recorrer Hierápolis y agua agradable en las terrazas. En invierno hace fresco y a veces hiela, pero el agua caliente humea en el aire frío y el lugar está en su momento más tranquilo. En julio y agosto, el calor del mediodía y el reflejo del sol en las terrazas blancas pueden ser muy intensos: conviene ir a primera o a última hora del día."
      },
      {
        "type": "h2",
        "text": "Por el camino: el lago Salda y los montes Tauro"
      },
      {
        "type": "p",
        "text": "La carretera sube desde la costa, cruza los montes Tauro y atraviesa la región de los lagos. El lago Salda, con sus orillas blancas y su agua turquesa, queda a un pequeño desvío y es una parada muy popular para hacer fotos. Con un vehículo privado usted decide dónde parar y cuánto tiempo, algo que una excursión en autobús no puede ofrecer."
      },
      {
        "type": "h2",
        "text": "Traslado privado a Pamukkale"
      },
      {
        "type": "p",
        "text": "Ofrecemos traslados privados a Pamukkale desde el aeropuerto de Antalya y desde los hoteles de la costa, solo ida o con regreso en otra fecha. El precio es fijo por vehículo, así que para una familia o un grupo pequeño suele ser comparable a varias entradas de excursión en autobús, sin recogidas por los hoteles, sin horario fijo y sin paradas de compras."
      }
    ],
    "faq": [
      [
        "¿A qué distancia está Pamukkale de Antalya?",
        "A unos 245 km por carretera. El trayecto suele durar entre tres y tres horas y media en cada sentido."
      ],
      [
        "¿Se puede visitar Pamukkale en un día desde Antalya?",
        "Sí, pero supone 6-7 horas de carretera en un solo día. Pasar una noche en Pamukkale o en Karahayıt hace la visita más tranquila y permite ver las terrazas sin aglomeraciones."
      ],
      [
        "¿Se puede nadar en Pamukkale?",
        "Se puede caminar descalzo por las pozas poco profundas de los travertinos. Para nadar está la Piscina Antigua, con agua termal caliente, que requiere una entrada aparte."
      ],
      [
        "¿Cuál es la mejor época del año para visitar Pamukkale?",
        "La primavera y el otoño son las más agradables. El invierno es tranquilo y tiene mucho encanto; en verano es mejor ir a primera hora de la mañana o a última hora de la tarde."
      ]
    ]
  },
  "demre-myra-st-nicholas": {
    "slug": "demre-myra-iglesia-san-nicolas",
    "title": "Demre y Myra: visitar la iglesia de San Nicolás desde Antalya",
    "heading": "Demre, Myra y la iglesia de San Nicolás",
    "description": "Excursión de Antalya a Demre, la antigua Myra: la iglesia de San Nicolás, las tumbas licias excavadas en la roca, Andriake y Kekova, con tiempos de viaje y consejos para invierno y Navidad.",
    "excerpt": "La ciudad del verdadero Papá Noel está a dos horas y media de Antalya. Qué ver en Demre y Myra, y cómo aprovechar el día recorriendo la costa.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Mucho antes de convertirse en Papá Noel, San Nicolás fue obispo de Myra, una ciudad licia en la costa al oeste de Antalya. Hoy la localidad se llama Demre, y la iglesia de San Nicolás donde ejerció, las tumbas licias excavadas en la roca y el puerto antiguo la convierten en una de las excursiones más gratificantes desde Antalya, sobre todo en diciembre."
      },
      {
        "type": "h2",
        "text": "¿Quién fue San Nicolás de Myra?"
      },
      {
        "type": "p",
        "text": "Nicolás vivió en el siglo IV y se hizo famoso por sus actos de generosidad en secreto, sobre todo con los niños y los pobres. Su festividad, el 6 de diciembre, se sigue celebrando en toda Europa, y las leyendas en torno a él dieron forma con los siglos a la figura de Papá Noel. Myra, donde fue obispo, se convirtió en un importante lugar de peregrinación."
      },
      {
        "type": "h2",
        "text": "Qué ver en Demre"
      },
      {
        "type": "ul",
        "items": [
          "Iglesia de San Nicolás: una iglesia bizantina con frescos, suelos de mosaico y el sarcófago que la tradición asocia al santo.",
          "Tumbas rupestres de Myra: tumbas licias con forma de casa, talladas en el acantilado sobre un gran teatro romano.",
          "Andriake: el puerto antiguo de Myra, con un granero restaurado que alberga el Museo de las Civilizaciones Licias.",
          "Kekova: los barcos que salen de la cercana Üçağız pasan junto a la ciudad antigua parcialmente sumergida y el pueblo-castillo de Kaleköy (en invierno salen menos barcos)."
        ]
      },
      {
        "type": "h2",
        "text": "Cómo llegar: la carretera de la costa hacia el oeste"
      },
      {
        "type": "p",
        "text": "Demre está a unas dos horas y media de Antalya por una de las carreteras costeras más bonitas del país, pasando por Kemer, las montañas de los alrededores de Olympos, Kumluca y Finike. La carretera está en buen estado todo el año, pero tiene muchas curvas entre las montañas, así que conviene reservar tiempo para las paradas y no plantearlo con prisas."
      },
      {
        "type": "h2",
        "text": "Un día por la costa"
      },
      {
        "type": "ul",
        "items": [
          "Mañana: salida temprano de Antalya y parada en un mirador sobre la costa cerca de Olympos.",
          "Media mañana: la iglesia de San Nicolás antes de que lleguen los grupos.",
          "Mediodía: las tumbas rupestres y el teatro de Myra, y después comida en Demre o en Andriake.",
          "Tarde: paseo en barco a Kekova en temporada, o seguir hasta Kaş y hacer noche allí.",
          "Noche: regreso a Antalya, o combinar la excursión con unos días en Kaş."
        ]
      },
      {
        "type": "h2",
        "text": "Visitar Demre en invierno y en Navidad"
      },
      {
        "type": "p",
        "text": "Diciembre es una época con un ambiente especial: el 6 de diciembre es el día de San Nicolás y, en torno a Navidad, muchos viajeros combinan una estancia en Antalya con una visita a la ciudad del santo. Los días de invierno son suaves pero cortos, así que conviene salir temprano. Los lugares de interés abren todo el año, mientras que los paseos en barco a Kekova dependen del tiempo y de la temporada."
      },
      {
        "type": "h2",
        "text": "Traslado privado a Demre"
      },
      {
        "type": "p",
        "text": "Ofrecemos traslados privados desde Antalya y los centros turísticos de la costa occidental hasta Kumluca, Demre y Kaş. Con un vehículo privado usted elige las paradas y el ritmo, y el precio es fijo por vehículo, no por persona. Al reservar, indíquenos su hotel, la fecha y si desea volver el mismo día."
      }
    ],
    "faq": [
      [
        "¿A qué distancia está Demre de Antalya?",
        "Demre, la antigua Myra, está a unas dos horas y media por carretera desde Antalya, por la carretera de la costa que pasa por Kemer, Kumluca y Finike."
      ],
      [
        "¿La iglesia de San Nicolás abre todo el año?",
        "Sí. La iglesia de San Nicolás y el yacimiento antiguo de Myra se pueden visitar durante todo el año."
      ],
      [
        "¿Cuándo es el día de San Nicolás?",
        "La festividad de San Nicolás es el 6 de diciembre. Diciembre, incluidas las fechas de Navidad, es una época muy popular para visitar Demre."
      ],
      [
        "¿Se pueden visitar Demre y Kekova en un mismo día?",
        "Sí, en temporada de barcos es posible si se sale temprano. En invierno salen menos barcos, así que consulte allí el tiempo y los horarios."
      ]
    ]
  },
  "lycian-way-spring-hiking": {
    "slug": "ruta-licia-senderismo-antalya",
    "title": "Senderismo por la Ruta Licia cerca de Antalya: guía de primavera y mejores etapas",
    "heading": "Senderismo por la Ruta Licia desde Antalya",
    "description": "Senderismo por la Ruta Licia cerca de Antalya: la mejor época, etapas en torno a Kemer, Olympos, Adrasan y Kaş, qué llevar en la mochila y cómo llegar al inicio de la ruta.",
    "excerpt": "Ruinas antiguas, pinares y vistas al mar en uno de los grandes senderos de larga distancia del mundo. Qué etapas hacer desde Antalya y cuándo ir.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "La Ruta Licia es un sendero de gran recorrido señalizado de más de 500 km entre Fethiye y Antalya, que sigue caminos antiguos, sendas de mulas y calzadas romanas por la costa y las montañas de la antigua Licia. No hacen falta semanas para disfrutar del senderismo en la Ruta Licia: muchas de sus mejores etapas quedan a poca distancia de Antalya y son perfectas para excursiones de un día o para unas vacaciones cortas de senderismo."
      },
      {
        "type": "h2",
        "text": "Cuándo caminar: primavera y otoño"
      },
      {
        "type": "table",
        "head": [
          "Época",
          "Condiciones",
          "Valoración"
        ],
        "rows": [
          [
            "Marzo - mayo",
            "Días suaves, colinas verdes, flores silvestres, fuentes con mucha agua",
            "La mejor época"
          ],
          [
            "Junio - agosto",
            "Mucho calor, poca sombra en muchas etapas, fuentes secas",
            "Solo a primera hora o rutas cortas"
          ],
          [
            "Septiembre - noviembre",
            "Mar cálido, tiempo estable, más fresco desde finales de octubre",
            "La segunda mejor época"
          ],
          [
            "Diciembre - febrero",
            "Suave en la costa, rachas de lluvia, nieve en los pasos altos",
            "Posible en las etapas costeras bajas"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Etapas cerca de Antalya"
      },
      {
        "type": "ul",
        "items": [
          "Göynük - zona de Kemer: caminos entre bosques y vistas al cañón, muy cerca de los complejos turísticos de Kemer.",
          "Çıralı y Olympos: una etapa costera entre las ruinas de Olympos y las llamas eternas de la Quimera.",
          "Adrasan - Olympos: uno de los tramos más espectaculares, con acantilados, calas y amplias vistas al mar.",
          "Alrededores de Kaş: senderos costeros con tumbas licias, pequeñas bahías y la isla griega de Meis frente a la costa.",
          "Phaselis: paseos más cortos alrededor de la ciudad antigua y sus tres puertos, ideales para un primer contacto."
        ]
      },
      {
        "type": "h2",
        "text": "Cómo planificar la caminata"
      },
      {
        "type": "p",
        "text": "El sendero está señalizado con marcas rojas y blancas, pero algunos tramos son abruptos, pedregosos y empinados, y la señalización puede ser irregular. Lleve un buen mapa o un track GPS, camine en pareja siempre que pueda y cuente a alguien su recorrido. Muchas etapas no tienen tiendas ni agua entre pueblos, así que salga temprano y lleve más agua de la que crea necesitar."
      },
      {
        "type": "h2",
        "text": "Qué llevar en la mochila"
      },
      {
        "type": "ul",
        "items": [
          "Botas de montaña o zapatillas de trail resistentes: la caliza es cortante y en algunos puntos está suelta.",
          "Al menos dos litros de agua por persona, además de algo para picar.",
          "Gorra o sombrero, protector solar y una capa ligera de manga larga, incluso en primavera.",
          "Un cortavientos o chubasquero para los tramos de montaña y el tiempo cambiante de la primavera.",
          "Un pequeño botiquín y el móvil cargado con un mapa sin conexión."
        ]
      },
      {
        "type": "h2",
        "text": "Cómo llegar al sendero y volver"
      },
      {
        "type": "p",
        "text": "La mayoría de las etapas empiezan y terminan en pueblos a los que es difícil llegar en transporte público, y una caminata solo de ida significa terminar en un lugar distinto del de salida. Un traslado privado le lleva desde el aeropuerto de Antalya o su hotel hasta el inicio de la etapa y puede recogerle al final. El precio es fijo por vehículo, por lo que resulta práctico para grupos de senderistas; indíquenos el punto de inicio y de llegada, la fecha y el número de personas, y le daremos el precio por adelantado."
      }
    ],
    "faq": [
      [
        "¿Cuánto mide la Ruta Licia?",
        "El sendero señalizado tiene más de 500 km entre Fethiye y Antalya. La mayoría de los visitantes recorre algunas etapas escogidas en lugar de la ruta completa."
      ],
      [
        "¿Cuál es la mejor época para hacer la Ruta Licia?",
        "La primavera, de marzo a mayo, es la mejor época, seguida del otoño, de septiembre a noviembre. El verano es muy caluroso y muchas fuentes se secan."
      ],
      [
        "¿Qué etapas de la Ruta Licia están más cerca de Antalya?",
        "Los tramos de Göynük y Kemer, Çıralı y Olympos, Adrasan y Phaselis están todos a entre una y dos horas aproximadamente de Antalya. Las etapas de los alrededores de Kaş quedan más al oeste."
      ],
      [
        "¿Se puede organizar un traslado hasta el inicio de una etapa de la Ruta Licia?",
        "Sí. Envíenos el punto de inicio y de llegada y la fecha, y le presupuestaremos un traslado privado a precio fijo por vehículo, con recogida incluida al final de la caminata."
      ]
    ]
  },
  "koprulu-canyon-rafting": {
    "slug": "rafting-canon-de-koprulu-desde-antalya",
    "title": "Rafting en el cañón de Köprülü: guía práctica desde Antalya y Side",
    "heading": "Rafting en el cañón de Köprülü",
    "description": "Rafting en el cañón de Köprülü, cerca de Antalya: temporada, cómo es el río, para quién es, qué llevar y a qué distancia está de Side, Belek, Alanya y Antalya.",
    "excerpt": "Agua verde y fría, un puente romano y un cañón cubierto de pinos. Qué esperar de un día de rafting en Köprülü y cómo organizarlo desde la costa.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "El cañón de Köprülü es un parque nacional en los montes Tauro, al norte de Side y Manavgat, y el río que lo atraviesa ofrece la excursión de rafting más conocida de la región. Es una aventura tranquila más que extrema: la mayoría de los rápidos son suaves, el paisaje es espectacular, y cada día de la temporada participan principiantes y familias."
      },
      {
        "type": "h2",
        "text": "Cómo es la bajada en rafting"
      },
      {
        "type": "p",
        "text": "La mayoría de las excursiones recorren un tramo de una docena de kilómetros del río Köprüçay y pasan de dos a tres horas en el agua, con paradas para nadar, saltar desde las rocas o simplemente dejarse llevar. Los rápidos son en su mayoría de fáciles a moderados, el agua es clara y verde, y está fría todo el año porque el río se alimenta de manantiales de montaña. Los guías dan una charla de seguridad, y se proporcionan cascos y chalecos salvavidas."
      },
      {
        "type": "h2",
        "text": "Cuándo ir"
      },
      {
        "type": "table",
        "head": [
          "Época",
          "Río y clima",
          "Ideal para"
        ],
        "rows": [
          [
            "Abril - mayo",
            "Más caudal por el deshielo, rápidos más vivos, aire templado",
            "Grupos activos, menos gente"
          ],
          [
            "Junio - agosto",
            "Aire caluroso, agua fría, los meses de más afluencia",
            "Refrescarse en un día de calor"
          ],
          [
            "Septiembre - octubre",
            "Agua más tranquila, días cálidos, menos gente",
            "Familias y principiantes"
          ]
        ]
      },
      {
        "type": "p",
        "text": "La temporada suele ir aproximadamente de abril a octubre, según el río y las empresas. Fuera de ese periodo, las excursiones son escasas o directamente no se ofrecen."
      },
      {
        "type": "h2",
        "text": "Para quién es el rafting en Köprülü"
      },
      {
        "type": "ul",
        "items": [
          "Principiantes: no hace falta experiencia y el guía dirige la balsa.",
          "Familias: las empresas fijan una edad mínima para los niños, así que compruébala al reservar.",
          "Grupos de amigos y compañeros de trabajo: cada balsa suele compartirse entre seis y ocho personas.",
          "No es lo ideal para quien no sabe nadar y se pone nervioso en el agua, ni durante el embarazo."
        ]
      },
      {
        "type": "h2",
        "text": "Qué llevar"
      },
      {
        "type": "ul",
        "items": [
          "Bañador puesto bajo la ropa y una toalla.",
          "Calzado que se pueda mojar y que no se salga del pie - nada de chanclas.",
          "Protector solar y una muda de ropa seca para la vuelta.",
          "Una bolsa o funda impermeable para el móvil; deja los objetos de valor en el hotel."
        ]
      },
      {
        "type": "h2",
        "text": "Más que rafting: el parque nacional"
      },
      {
        "type": "p",
        "text": "Sobre el cañón se alza el puente de Oluk, un puente romano de un solo arco que da nombre a la zona: köprü significa «puente» en turco. Más arriba, en la montaña, se encuentran las ruinas de la antigua ciudad de Selge, entre formaciones rocosas y aldeas. Con vehículo propio puedes combinar el rafting con una parada en el puente y una subida en coche hacia Selge."
      },
      {
        "type": "h2",
        "text": "Cómo llegar desde la costa"
      },
      {
        "type": "p",
        "text": "Muchas empresas de rafting venden la excursión con recogida compartida en los hoteles, lo que puede suponer una larga mañana recogiendo a otros participantes. Un vehículo privado desde Side, Manavgat, Belek, Alanya o Antalya sale cuando tú quieras y te permite parar en el puente o en la montaña por el camino. El cañón está a aproximadamente una hora de Side y Manavgat, y más lejos desde Antalya y Alanya; envíanos tu hotel y la fecha y te daremos un precio fijo por vehículo."
      }
    ],
    "faq": [
      [
        "¿El rafting en el cañón de Köprülü es apto para principiantes?",
        "Sí. Los rápidos son en su mayoría de fáciles a moderados, no hace falta experiencia y un guía dirige cada balsa tras una charla de seguridad."
      ],
      [
        "¿Cuándo es la temporada de rafting en el cañón de Köprülü?",
        "Normalmente de abril a octubre, aproximadamente. En primavera el agua baja más viva por el deshielo; septiembre y octubre son más tranquilos y con menos gente."
      ],
      [
        "¿Qué tan fría está el agua?",
        "Fría todo el año, porque el río se alimenta de manantiales de montaña. En un día caluroso de verano, eso forma parte de su encanto."
      ],
      [
        "¿A qué distancia está el cañón de Köprülü de Side?",
        "A aproximadamente una hora por carretera desde Side y Manavgat, y más lejos desde Antalya, Belek o Alanya, según tu hotel."
      ]
    ]
  },
  "kas-kalkan-autumn": {
    "slug": "kas-y-kalkan-en-otono",
    "title": "Kaş y Kalkan en otoño: buceo, playas y calas tranquilas",
    "heading": "Kaş y Kalkan en otoño",
    "description": "Por qué Kaş y Kalkan están en su mejor momento en otoño: mar cálido, buceo, las playas de Kaputaş y Patara, Kekova en kayak y en barco, y cómo llegar desde el aeropuerto de Antalya.",
    "excerpt": "El mar más cálido del año, playas vacías y dos pequeños pueblos portuarios al pie de las montañas. Por qué el extremo oeste de la costa de Antalya brilla en octubre.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Kaş y Kalkan se encuentran en el extremo occidental, el más salvaje, de la costa de Antalya, donde las montañas caen directamente al mar. Ninguno tiene grandes complejos turísticos; ambos tienen pequeños puertos, callejuelas encaladas y algunas de las aguas más cristalinas del Mediterráneo. En otoño, cuando los veraneantes se han ido y el mar sigue cálido, Kaş y Kalkan viven su mejor momento."
      },
      {
        "type": "h2",
        "text": "Por qué el otoño es la temporada aquí"
      },
      {
        "type": "ul",
        "items": [
          "El mar se mantiene cálido hasta octubre, a menudo más que en junio.",
          "La visibilidad bajo el agua es excelente, una buena noticia para buceadores y aficionados al snorkel.",
          "Caminar y hacer senderismo vuelve a ser agradable tras el calor del verano.",
          "Los restaurantes y las excursiones en barco siguen funcionando, pero sin las multitudes del verano."
        ]
      },
      {
        "type": "h2",
        "text": "Kaş: buceo, kayak y el puerto"
      },
      {
        "type": "p",
        "text": "Kaş es uno de los centros de buceo más conocidos de Türkiye, con inmersiones para principiantes y buceadores experimentados, entre ellas pecios, paredes y cuevas submarinas. El kayak de mar sobre las ruinas sumergidas de Kekova es uno de los grandes momentos, y el puerto, el teatro antiguo frente al mar y las tumbas licias en pleno pueblo hacen que las tardes sean fáciles. En un día despejado, la isla griega de Meis se ve justo frente a la costa."
      },
      {
        "type": "h2",
        "text": "Kalkan: terrazas y noches tranquilas"
      },
      {
        "type": "p",
        "text": "Kalkan, a una media hora al oeste de Kaş, es más pequeño y tranquilo, construido en una ladera alrededor de un pequeño puerto. Es conocido por sus villas con terrazas con vistas al mar y sus restaurantes en azoteas. Es ideal para parejas y familias que buscan una base tranquila y buena comida más que vida nocturna."
      },
      {
        "type": "h2",
        "text": "Playas entre los dos pueblos y más allá"
      },
      {
        "type": "ul",
        "items": [
          "Kaputaş: una pequeña cala turquesa al pie de un desfiladero, entre Kaş y Kalkan.",
          "Patara: una de las playas de arena más largas de Türkiye, junto a las ruinas de la antigua Patara y a una zona protegida.",
          "La península de Kaş y las plataformas de baño del pueblo: costas rocosas y escalerillas que bajan directamente a aguas profundas y claras.",
          "Kekova y Üçağız: excursiones en barco a bahías resguardadas y al pueblo-castillo de Kaleköy."
        ]
      },
      {
        "type": "h2",
        "text": "Qué cambia en noviembre"
      },
      {
        "type": "p",
        "text": "A partir de noviembre la temporada va terminando: algunos hoteles, restaurantes y excursiones en barco cierran, llegan las primeras lluvias y las noches refrescan. Kaş sigue animado todo el año porque mucha gente vive allí de forma permanente, mientras que Kalkan se vuelve muy tranquilo. Comprueba las fechas de apertura si viajas al final de la temporada."
      },
      {
        "type": "h2",
        "text": "Cómo llegar desde el aeropuerto de Antalya"
      },
      {
        "type": "p",
        "text": "Kaş está a unos 185 km del aeropuerto de Antalya, entre dos horas y media y tres horas por la carretera de la costa pasando por Kemer, Kumluca y Demre, y Kalkan queda una media hora más allá. Algunos viajeros vuelan a Dalaman, según los vuelos. Ofrecemos traslados privados desde ambos aeropuertos a precio fijo por vehículo, con paradas para hacer fotos en una de las carreteras más bonitas del país."
      }
    ],
    "faq": [
      [
        "¿Está caliente el mar en Kaş en octubre?",
        "Sí. El mar suele mantenerse cálido hasta bien entrado octubre, a menudo más que a principios del verano, y la visibilidad para bucear y hacer snorkel es excelente."
      ],
      [
        "¿A qué distancia está Kaş del aeropuerto de Antalya?",
        "A unos 185 km, entre dos horas y media y tres horas por carretera. Kalkan queda una media hora más al oeste."
      ],
      [
        "Kaş o Kalkan: ¿cuál es mejor?",
        "Kaş es más animado, con buceo, kayak y vida local todo el año. Kalkan es más pequeño y tranquilo, con villas y restaurantes con vistas al mar."
      ],
      [
        "¿Kaş y Kalkan están abiertos en noviembre?",
        "Kaş sigue activo todo el año. En Kalkan, y en algunos hoteles y empresas de barcos, la temporada termina a finales de octubre o en noviembre, así que comprueba las fechas de apertura."
      ]
    ]
  },
  "medical-travel-antalya-winter": {
    "slug": "turismo-medico-y-dental-en-antalya-en-invierno",
    "title": "Turismo médico en Antalya en invierno: lo que debes saber antes de viajar",
    "heading": "Turismo médico y dental en Antalya en invierno",
    "description": "Tratamiento dental, injerto capilar o cirugía estética en Antalya en invierno: por qué elegir la temporada baja, cómo comprobar una clínica, días de recuperación y traslados.",
    "excerpt": "Un clima más fresco, hoteles más tranquilos y citas más fáciles. Qué deben comprobar y planificar antes de reservar quienes viajan a Antalya en invierno para un tratamiento.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Antalya se ha convertido, junto con Estambul, en uno de los centros del turismo médico y dental de Türkiye. Cada vez más visitantes planifican un tratamiento dental, un injerto capilar o una intervención estética para los meses de invierno, cuando la costa está tranquila y el clima es suave. Esta guía trata el lado práctico de un viaje así: no es consejo médico, y toda decisión clínica corresponde a un médico cualificado."
      },
      {
        "type": "h2",
        "text": "Por qué muchos viajeros eligen el invierno"
      },
      {
        "type": "ul",
        "items": [
          "Clima suave y más fresco: muchos pacientes encuentran la recuperación más cómoda lejos del calor y del sol intenso del verano.",
          "Los hoteles y apartamentos están más tranquilos y suelen ser más baratos que en verano.",
          "Puede ser más fácil conseguir cita fuera de los meses de vacaciones de mayor afluencia.",
          "El viaje puede combinarse con la ciudad, los museos y paseos tranquilos en lugar de días de playa."
        ]
      },
      {
        "type": "h2",
        "text": "Cómo elegir y comprobar un centro"
      },
      {
        "type": "p",
        "text": "La decisión más importante es el centro, no el precio. Comprueba que la clínica o el hospital tenga licencia del Ministerio de Sanidad turco, averigua quién es el médico que te tratará y qué titulación tiene, y pide un plan por escrito que indique qué incluye, qué no incluye y cómo se gestionan las complicaciones y el seguimiento. Desconfía de las ofertas que prometen un resultado final o un precio cerrado antes de cualquier revisión."
      },
      {
        "type": "h2",
        "text": "Cómo planificar los días"
      },
      {
        "type": "table",
        "head": [
          "Tipo de tratamiento",
          "Aspecto habitual a planificar",
          "Pregunta al centro"
        ],
        "rows": [
          [
            "Tratamiento dental",
            "A menudo más de una visita, a veces con semanas o meses de separación",
            "¿Cuántos viajes y cuántos días cada uno?"
          ],
          [
            "Injerto capilar",
            "Estancia corta, con instrucciones de cuidado para los primeros días",
            "¿Cuándo se puede volar, lavar el pelo y llevar gorro?"
          ],
          [
            "Cirugía estética",
            "Estancia más larga y días de recuperación antes de volver a casa",
            "¿Cuántas noches hay que esperar para poder volar?"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Incluye días de descanso en el plan, evita programar el tratamiento el mismo día de tu llegada y sigue el criterio del médico sobre cuándo es seguro volar. Para las intervenciones quirúrgicas se suele recomendar viajar acompañado."
      },
      {
        "type": "h2",
        "text": "Seguro, documentos y seguimiento"
      },
      {
        "type": "ul",
        "items": [
          "Comprueba si tu seguro de viaje cubre un tratamiento programado en el extranjero: muchas pólizas no lo hacen.",
          "Guarda copias de todos los informes médicos, recetas y del plan de tratamiento.",
          "Pregunta cómo funciona el seguimiento una vez en casa y si tu médico habitual puede participar.",
          "Comparte tu información médica solo con el centro, por el canal que este indique."
        ]
      },
      {
        "type": "h2",
        "text": "Del aeropuerto a tu hotel o clínica"
      },
      {
        "type": "p",
        "text": "Después de un vuelo, y antes o después de un tratamiento, lo último que quieres es hacer cola en una parada de taxis o subir a un shuttle compartido que para en una docena de hoteles. Un traslado privado te lleva directamente del aeropuerto de Antalya a tu hotel o clínica, con un conductor que sigue tu vuelo y te ayuda con el equipaje. Los trayectos de vuelta pueden ajustarse a tus citas y a tu vuelo de regreso. El precio es fijo por vehículo, así que un acompañante viaja sin coste adicional."
      }
    ],
    "faq": [
      [
        "¿Por qué viajar a Antalya en invierno para un tratamiento?",
        "Muchos viajeros prefieren el clima más suave para la recuperación, los hoteles más tranquilos y la mayor facilidad para conseguir cita fuera de las vacaciones de verano."
      ],
      [
        "¿Cómo compruebo una clínica en Antalya?",
        "Comprueba que tenga licencia del Ministerio de Sanidad turco, averigua quién es el médico responsable y pide un plan por escrito que detalle qué incluye y qué no, las complicaciones y el seguimiento."
      ],
      [
        "¿Cuánto tiempo debo quedarme después de una intervención?",
        "Depende por completo del tratamiento y del criterio de tu médico. Pregunta al centro cuántas noches necesitas antes de volver en avión y planifica días de descanso."
      ],
      [
        "¿Pueden llevarme del aeropuerto a mi clínica?",
        "Sí. Ofrecemos traslados privados desde el aeropuerto de Antalya a hoteles y clínicas, y de vuelta, a precio fijo por vehículo."
      ]
    ]
  },
  "side-ancient-city-guide": {
    "slug": "side-ciudad-antigua-guia-de-visita",
    "title": "Side, ciudad antigua: guía del templo de Apolo, el teatro y el casco antiguo",
    "heading": "Side: guía de la ciudad antigua",
    "description": "Visitar la ciudad antigua de Side: templo de Apolo, gran teatro, museo, murallas y casco antiguo, cuándo ir y excursiones a Aspendos y a la cascada de Manavgat.",
    "excerpt": "Un teatro romano, columnas de un templo a orillas del mar y un pueblo portuario dentro de las murallas antiguas. Cómo disfrutar de Side en su mejor momento: fuera de temporada.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Side es uno de los pocos lugares de la Riviera turca donde una ciudad moderna vive dentro de una ciudad antigua. El casco antiguo ocupa una pequeña península rodeada de ruinas romanas y helenísticas: pasas junto a columnas para llegar a un restaurante, y el atardecer se contempla enmarcado por un templo. La ciudad antigua de Side luce mejor fuera del verano, cuando hay la calma suficiente para sentir la historia."
      },
      {
        "type": "h2",
        "text": "Los principales lugares de interés"
      },
      {
        "type": "ul",
        "items": [
          "Templo de Apolo: sus columnas se alzan en la punta de la península, junto al mar; es el lugar clásico para ver el atardecer.",
          "El gran teatro: uno de los mayores teatros antiguos de la región, construido en la ladera a la entrada del casco antiguo.",
          "Museo de Side: instalado en unas termas romanas restauradas, con estatuas y relieves hallados en la ciudad.",
          "La calle columnada y el ágora: el antiguo eje principal que va de la puerta de la ciudad hacia el puerto.",
          "Las murallas y la puerta monumental: la entrada que usan los visitantes desde hace dos mil años."
        ]
      },
      {
        "type": "h2",
        "text": "El casco antiguo hoy"
      },
      {
        "type": "p",
        "text": "Dentro de las murallas, callejuelas llenas de restaurantes, cafés y pequeñas tiendas bajan hasta el puerto, de donde salen barcos para excursiones por la costa. Los coches no pueden entrar en la mayor parte del casco antiguo, así que es agradable recorrerlo a pie. Amplias playas de arena se extienden al este y al oeste de la península."
      },
      {
        "type": "h2",
        "text": "Cuándo visitarla"
      },
      {
        "type": "p",
        "text": "La primavera y el otoño son ideales: hace suficiente calor para la playa y suficiente fresco para recorrer las ruinas a mediodía. En invierno cierran muchos hoteles de temporada, pero el casco antiguo, las ruinas y el museo siguen abiertos, y en un día soleado el templo y el puerto están casi vacíos. En julio y agosto, visita las ruinas a primera hora de la mañana o al atardecer."
      },
      {
        "type": "h2",
        "text": "Excursiones desde Side"
      },
      {
        "type": "table",
        "head": [
          "Destino",
          "Por qué ir",
          "Tiempo aproximado desde Side"
        ],
        "rows": [
          [
            "Aspendos",
            "Uno de los teatros romanos mejor conservados del mundo",
            "unos 40 minutos"
          ],
          [
            "Cascada de Manavgat",
            "Una cascada ancha y baja en un parque verde",
            "unos 15 minutos"
          ],
          [
            "Perge",
            "Una gran ciudad antigua con estadio y calles columnadas",
            "aproximadamente 1 hora"
          ],
          [
            "Cañón de Köprülü",
            "Rafting y un puente romano en un parque nacional",
            "aproximadamente 1 hora"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Cómo llegar a Side desde el aeropuerto de Antalya"
      },
      {
        "type": "p",
        "text": "Side está a unos 65 km del aeropuerto de Antalya, entre 55 y 65 minutos por carretera. Un traslado privado te lleva directamente a tu hotel o al límite del casco antiguo peatonal, a un precio fijo por vehículo que no cambia con la temporada ni con la hora de tu vuelo. El mismo vehículo puede reservarse para excursiones a Aspendos, Perge o el cañón."
      }
    ],
    "faq": [
      [
        "¿Qué ver en la ciudad antigua de Side?",
        "El templo de Apolo junto al mar, el gran teatro, el museo en unas termas romanas, la calle columnada, el ágora y las murallas, todo a poca distancia a pie del casco antiguo."
      ],
      [
        "¿Merece la pena visitar Side en invierno?",
        "Sí, por las ruinas y el casco antiguo. Muchos hoteles de temporada cierran, pero los monumentos siguen abiertos y hay mucha menos gente que en verano."
      ],
      [
        "¿A qué distancia está Side del aeropuerto de Antalya?",
        "A unos 65 km, entre 55 y 65 minutos por carretera."
      ],
      [
        "¿Se puede visitar Aspendos desde Side?",
        "Sí. Aspendos está a unos 40 minutos de Side por carretera y es una excursión fácil de medio día, a menudo combinada con Perge o la cascada de Manavgat."
      ]
    ]
  }
};
