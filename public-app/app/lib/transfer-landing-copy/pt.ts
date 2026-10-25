import type { TransferLandingCopy } from "../transfer-landing-copy";

/**
 * Portuguese is written for both Portugal and Brazil, so the wording stays on
 * forms both readers accept ("transfer privado", "receção" avoided) and keeps
 * the per-vehicle price and cash-on-arrival rule explicit.
 *
 * Written by the team, not natively reviewed yet — flag any wording a
 * Portuguese reader would phrase differently before the next content pass.
 */
export const pt: TransferLandingCopy = {
  heroHeading: (name) => `Aeroporto de Antalya → ${name}: transfer privado`,
  heroCta: "Reservar o transfer",
  heroTrust: [
    "Até 7 pessoas",
    "Sem pagamento antecipado",
    "Pagamento diretamente ao motorista",
    "Preço total fixo, sem taxas escondidas",
    "Cadeirinha de criança gratuita a pedido",
    "Acompanhamento do voo incluído",
  ],
  serviceHeading: (name) => `O seu transfer privado para ${name}`,
  aboutHeading: (name) => `O destino: ${name}`,
  ownGroup: (name) =>
    `Viaja apenas com o seu grupo, diretamente até ao hotel em ${name}. Sem autocarro partilhado, sem desconhecidos no carro e sem desvios por outros hotéis — o preço fixo cobre o veículo inteiro.`,
  arrivalHeading: "A sua chegada ao aeroporto de Antalya",
  arrivalBody:
    "Depois de recolher a bagagem, siga para a área Meet & Greet J / 777. A nossa equipa no aeroporto encontra a sua reserva e apresenta-lhe o motorista. Como acompanhamos o voo, um atraso desloca a recolha sem custo adicional.",
  returnHeading: "Transfer de regresso",
  returnBody: (name) =>
    `Também organizamos o regresso de ${name} ao aeroporto de Antalya. Indique o número do voo e a hora de recolha pretendida ao reservar.`,
  privateHeading: "Privado, não partilhado",
  privateBody: (name) =>
    `No carro viajam apenas você e os seus acompanhantes. Depois da reserva recebe uma confirmação clara com os dados da viagem e um contacto direto. No dia da chegada a nossa equipa acompanha o voo; se aterrar mais cedo ou mais tarde, ajustamos o encontro. O motorista leva-o com a bagagem até à entrada do hotel ou até ao endereço privado que indicou em ${name}.`,
  priceBody:
    "O valor apresentado é um preço total fixo pelo veículo e não por pessoa. Não existem acréscimos escondidos pelo acompanhamento do voo, pelo tempo de espera habitual ou pelas cadeirinhas a pedido. Paga em dinheiro diretamente ao motorista no início da viagem, pelo que o custo fica fechado antes de partir.",
  vehicleHeading: "Veículo, bagagem e crianças",
  vehicleBody:
    "O Mercedes Vito serve até seis passageiros com bagagem de férias normal; grupos maiores viajam num Mercedes Sprinter com até 12 lugares. Informe-nos ao reservar sobre bagagem fora de medida, um carrinho de bebé ou as cadeirinhas necessárias e ajustamos o veículo ao seu grupo.",
  wholeVehicle: "Preço pelo veículo inteiro",
  priceTrust: [
    "Sem pagamento antecipado",
    "Pagamento diretamente ao motorista",
    "Sem taxas escondidas",
  ],
  hotelsEyebrow: "Para o seu alojamento",
  hotelsHeading: (name) => `Hotéis procurados em ${name}`,
  hotelsBody: () => "Vamos diretamente a estes e a qualquer outro hotel da zona.",
  faq: [
    [
      "Onde encontro a equipa de transfers no aeroporto de Antalya?",
      "Depois de recolher a bagagem, siga para a área Meet & Greet J / 777. A nossa equipa encontra a sua reserva e acompanha-o até ao motorista.",
    ],
    [
      "Tenho de pagar o transfer antecipadamente?",
      "Não. Não é exigido qualquer pagamento antecipado. O preço total fixo é pago diretamente ao motorista.",
    ],
    [
      "Existe cadeirinha de criança?",
      "Sim. As cadeirinhas são gratuitas a pedido. Indique o número de crianças e as idades ao reservar.",
    ],
  ],
  regions: {
    antalya: {
      about: "A cidade de Antalya, com as frentes de praia de Lara e Kundu, fica a poucos quilómetros do aeroporto. Ao longo da costa de Lara alinham-se grandes resorts temáticos e hotéis urbanos, enquanto Konyaaltı, a oeste, oferece praia de cascalho e uma longa marginal.",
      routeDetails: "O trajeto curto a partir do aeroporto de Antalya segue a estrada costeira de Lara ou entra diretamente no centro. Mesmo numa etapa curta o carro privado compensa: sem esperas por outros passageiros, sem paradas intermédias e com chegada à porta do seu hotel.",
    },
    belek: {
      about: "Belek fica a leste de Antalya e é conhecida sobretudo pelos campos de golfe, pelos grandes resorts com tudo incluído e pelas praias largas de areia. Os hotéis espalham-se entre Kadriye e a costa perto de Serik, por isso o endereço exato do hotel ajuda na reserva.",
      routeDetails: "O percurso sai do aeroporto de Antalya pela D400 em direção a Serik e Belek. Para famílias, golfistas e voos noturnos o transfer privado direto é a opção simples: chega ao alojamento sem paradas de recolha e sem mudar de veículo.",
    },
    side: {
      about: "Side combina um centro histórico antigo com longas praias de areia e grandes complexos de férias. Além de Side, o destino inclui as zonas hoteleiras muito procuradas de Kumköy, Evrenseki, Çolaklı, Sorgun e Titreyengöl.",
      routeDetails: "A partir do aeroporto de Antalya a rota segue a estrada da costa em direção a Manavgat e Side. O carro privado é especialmente útil numa chegada tardia: o seu grupo vai direto ao resort reservado, sem esperar por hóspedes de outros hotéis.",
    },
    kemer: {
      about: "Kemer estende-se a oeste de Antalya, entre a cordilheira de Tauro e o Mediterrâneo. A zona abrange o centro de Kemer e também Beldibi, Göynük, Kiriş e Çamyuva — hotéis de praia, uma marina e montanhas como cenário.",
      routeDetails: "O trajeto direto acompanha a costa a oeste de Antalya. O motorista leva-o até ao hotel sem mudança de veículo, o que conta sobretudo quando viaja com crianças, com equipamento desportivo ou depois de uma aterragem à noite.",
    },
    alanya: {
      about: "Alanya é um dos destinos mais estimados da Riviera turca e fica bastante mais a leste do que os resorts em torno de Antalya. Além do centro, Mahmutlar, Kestel, Avsallar, Türkler e Okurcalar são as zonas hoteleiras mais pedidas.",
      routeDetails: "Num trajeto costeiro longo é o preço fixo por veículo que mostra o seu valor. Com um transfer privado viaja só com o seu grupo e segue da aterragem até à entrada do hotel.",
    },
    kizilagac: {
      about: "Kızılağaç fica a leste de Manavgat e distingue-se pelos resorts amplos junto à praia e por férias de família tranquilas. A zona confina com Sorgun e Manavgat; muitos hotéis ficam um pouco afastados da estrada principal, à beira-mar.",
      routeDetails: "Do aeroporto de Antalya segue-se pela D400 em direção a Manavgat e depois até Kızılağaç. O veículo privado poupa-lhe as paradas extra noutros hotéis, frequentes exatamente neste trecho com os transfers partilhados.",
    },
    tekirova: {
      about: "Tekirova situa-se a sul de Kemer, no limite do parque nacional de Olympos-Beydağları. Combina espaços hoteleiros bem cuidados com pequenas enseadas e fica muito perto do sítio antigo de Phaselis.",
      routeDetails: "O percurso parte do aeroporto de Antalya, passa por Kemer e continua até Tekirova. A posição na costa e a distância tornam o transfer direto a escolha sensata: sem mudança de veículo e sem esperar por outros hóspedes até ao hotel.",
    },
  },
};
