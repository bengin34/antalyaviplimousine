/**
 * Blog copy for pt: the page chrome plus every article body.
 * One file per language, so adding a market is adding a file.
 */
export const chrome = {
  locale: "pt_PT",
  indexTitle: "Guias de transferes em Antalya e artigos de viagem | Antalya VIP Tourism",
  indexDescription:
    "Guias práticos para a chegada a Antalya: transfer privado ou táxi, o encontro com o motorista, viajar com crianças, distâncias da costa e quando viajar.",
  heading: "Guias de transferes em Antalya",
  intro:
    "Artigos práticos sobre a chegada ao aeroporto de Antalya e o percurso até ao hotel - escritos a partir dos transferes que fazemos todos os dias, não de uma brochura.",
  blog: "Guias",
  readMore: "Ler o guia",
  minReadLabel: "{minutes} min de leitura",
  updated: "Atualizado",
  contents: "Neste guia",
  faqHeading: "Perguntas frequentes",
  relatedHeading: "Rotas de transfer neste guia",
  routeGuidesHeading: "Guias para este transfer",
  moreHeading: "Mais guias",
  ctaHeading: "Transfer a preço fixo a partir do aeroporto de Antalya",
  ctaText:
    "Um preço para o veículo inteiro, monitorização do voo incluída e pagamento em dinheiro ao motorista. Verifique a sua rota e reserve num minuto.",
  ctaButton: "Ver o seu preço fixo",
  backToBlog: "Todos os guias",
  home: "Início",
  routes: "Rotas de transfer",
  book: "Reserve o seu transfer",
  imprint: "Ficha técnica",
  privacy: "Privacidade",
  imprintUrl: "/impressum.html",
  privacyUrl: "/privacy/",
};

export const articles = {
  "transfer-vs-taxi": {
    slug: "transfer-ou-taxi-aeroporto-antalya",
    title: "Aeroporto de Antalya: transfer privado, táxi ou shuttle partilhado?",
    heading: "Transfer privado, táxi ou shuttle partilhado a partir do aeroporto de Antalya?",
    description:
      "Quanto custam realmente as três opções à saída do aeroporto de Antalya, quanto demoram e qual serve o seu grupo. Comparação com preço fixo por veículo.",
    excerpt:
      "Três formas de sair do aeroporto de Antalya e três inícios de férias muito diferentes. Quanto custa cada uma, quanto demora e a quem serve.",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "Aterra no aeroporto de Antalya (AYT) após três a cinco horas de voo, muitas vezes ao fim da noite, normalmente com bagagem e frequentemente com crianças. Os quarenta minutos seguintes decidem como começam as férias. Há três formas realistas de sair do terminal, e o preço mais baixo afixado raramente é a viagem mais barata." },
      { type: "h2", text: "As três opções lado a lado" },
      {
        type: "table",
        head: ["", "Transfer privado", "Táxi do aeroporto", "Shuttle partilhado"],
        rows: [
          ["Base do preço", "Fixo, por veículo", "Taxímetro, por viagem", "Por pessoa"],
          ["Conhecido antes da chegada", "Sim", "Não", "Sim"],
          ["Espera em caso de atraso", "Sim, com monitorização", "Não", "Limitado"],
          ["Paragens antes do seu hotel", "Nenhuma", "Nenhuma", "Até 8"],
          ["Capacidade de bagagem", "De carrinha", "De ligeiro", "Partilhada"],
          ["Cadeira de criança", "A pedido, gratuita", "Raramente", "Não"],
        ],
      },
      { type: "h2", text: "Quanto custa realmente um táxi" },
      { type: "p", text: "O táxi é a resposta óbvia em qualquer aeroporto e, em distâncias curtas, é razoável. Na Riviera Turca o problema é a distância: Belek fica a 45 km, Side a 65 km, Alanya a 125 km. Um taxímetro a correr de noite ao longo de 125 km, com um regresso que o motorista tem de refletir no preço, produz um valor que ninguém lhe indicou antes. E não tem argumento se o percurso feito não foi o mais direto." },
      { type: "p", text: "O transfer privado inverte esta lógica: o preço do veículo inteiro é acordado antes de voar, não muda com o trânsito e é o mesmo quer viaje uma pessoa quer viajem seis." },
      { type: "h2", text: "Porque o shuttle parece barato e muitas vezes não é" },
      { type: "p", text: "Um preço por pessoa parece imbatível para quem viaja sozinho e deixa de ser vantajoso logo a dois. Para uma família de quatro até Side, quatro lugares custam normalmente mais do que uma carrinha a preço fixo. O custo real, porém, é o tempo: o veículo parte quando enche e vai deixando passageiros ao longo da estrada da costa pela ordem que convém ao percurso, não a si. Chegar em último após um voo noturno acrescenta facilmente mais de uma hora." },
      { type: "h2", text: "Quando cada opção é a certa" },
      {
        type: "ul",
        items: [
          "Viajante sozinho, bagagem de mão, aterragem de dia, hotel no centro de Antalya: táxi ou shuttle chegam.",
          "Duas pessoas ou mais com hotel fora da cidade: o veículo privado sai normalmente mais barato e é sempre mais rápido.",
          "Famílias com cadeiras de criança, carrinho de bebé ou sacos de golfe: privado, porque a capacidade é confirmada antecipadamente.",
          "Chegadas noturnas e ligações que podem deslizar: privado, porque a recolha segue o voo e não um horário.",
        ],
      },
      { type: "h2", text: "O que verificar antes de reservar" },
      { type: "p", text: "Três perguntas tornam a diferença evidente. O preço é por veículo ou por pessoa? É fixo ou mexe com o trânsito e a hora? E o que acontece se o voo aterrar com duas horas de atraso: continua alguém à espera e custa mais? Os nossos preços fixos são por veículo, a monitorização do voo está incluída e os primeiros 90 minutos de espera após a aterragem são gratuitos e deslocam-se automaticamente em caso de atraso." },
    ],
    faq: [
      ["Um transfer privado é mais caro do que um táxi em Antalya?", "Para o centro de Antalya é comparável. Para Belek, Side, Kemer ou Alanya, um preço fixo por veículo fica normalmente abaixo do valor do taxímetro na mesma distância, e conhece-o antes de voar."],
      ["Pago por pessoa ou por veículo?", "Por veículo. O preço de um Mercedes Vito abrange até seis passageiros; a Sprinter é para grupos maiores. Um passageiro adicional não altera o preço."],
      ["O que acontece se o meu voo atrasar?", "Seguimos o voo em tempo real e deslocamos a recolha sem custo adicional. Os 90 minutos de espera incluídos contam a partir da aterragem efetiva."],
      ["Posso pagar em dinheiro à chegada?", "Sim. Não é exigido pagamento antecipado; paga o valor fixo da sua reserva diretamente ao motorista no início da viagem."],
    ],
  },
  "airport-arrival-guide": {
    slug: "guia-chegada-aeroporto-antalya",
    title: "Guia de chegada ao aeroporto de Antalya: terminais, ponto de encontro, espera",
    heading: "Chegar ao aeroporto de Antalya: o que acontece depois de aterrar",
    description:
      "Passo a passo na chegada ao aeroporto de Antalya: terminais, controlo de passaportes, bagagem, onde espera o motorista e quanto dura a espera gratuita.",
    excerpt:
      "Do toque na pista até à porta do veículo: terminais, controlo de passaportes, ponto de encontro e o que acontece quando o voo atrasa.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "O aeroporto de Antalya movimenta mais de trinta milhões de passageiros por ano e quase todos chegam numa janela de verão muito estreita. Conhecer a sequência de antemão transforma um terminal cheio numa formalidade de vinte minutos." },
      { type: "h2", text: "Em que terminal aterra" },
      { type: "p", text: "O AYT tem três terminais. A maioria dos voos internacionais regulares usa o Terminal 1 ou o Terminal 2; os charters e voos sazonais são normalmente tratados no Terminal 2. O terminal doméstico serve os voos de Istambul, Ancara e Esmirna. Não tem de descobrir isto sozinho: o número do voo diz-nos e o motorista é enviado para a sala de chegadas certa." },
      { type: "h2", text: "Controlo de passaportes e bagagem" },
      { type: "p", text: "A maioria dos cidadãos europeus entra na Türkiye sem visto em estadias curtas, mas confirme as regras aplicáveis ao seu passaporte antes de viajar. Em época alta conte 20 a 45 minutos da aterragem até sair com as malas, menos fora de julho e agosto. A recolha de bagagem é a fase que mais varia, e por isso uma janela de espera importa mais do que uma hora de recolha prometida." },
      { type: "h2", text: "Onde o motorista o encontra" },
      {
        type: "ul",
        items: [
          "Recolha a bagagem e siga para a sala de chegadas.",
          "Dirija-se à zona meet & greet J / 777.",
          "A nossa equipa no aeroporto encontra a sua reserva e acompanha-o até ao motorista.",
          "O motorista leva a bagagem até ao veículo, no parque contíguo.",
        ],
      },
      { type: "p", text: "Não tem de procurar um cartaz com o seu nome entre cinquenta. A equipa está num ponto fixo e tem a referência da sua reserva, pelo que a entrega funciona igual às 06:00 e às 02:00." },
      { type: "h2", text: "O que acontece se o voo atrasar" },
      { type: "p", text: "Seguimos o próprio voo, não o horário com que reservou. Se aterrar com duas horas de atraso, a recolha desloca-se duas horas e o preço não muda. Os primeiros 90 minutos de espera a partir da hora real de aterragem estão incluídos sem custo, o que cobre uma fila longa no controlo ou bagagem atrasada." },
      { type: "h2", text: "Antes de viajar" },
      { type: "p", text: "Dois pormenores tornam o dia simples: dê-nos o número do voo e não apenas a hora de chegada, e indique o número de cadeiras de criança logo na reserva. Ambos são gratuitos, e ambos são muito mais difíceis de organizar à 01:00 na sala de chegadas." },
    ],
    faq: [
      ["Onde encontro exatamente o motorista no aeroporto de Antalya?", "Na zona meet & greet J / 777 da sala de chegadas, depois de recolher a bagagem. A nossa equipa tem a sua reserva e leva-o até ao motorista."],
      ["Quanto tempo espera o motorista?", "Os primeiros 90 minutos a partir da sua hora real de aterragem estão incluídos sem custo, e a janela desloca-se automaticamente se o voo atrasar."],
      ["Quanto tempo demora a sair do terminal?", "Normalmente 20 a 45 minutos após a aterragem, consoante o controlo de passaportes e a bagagem. É mais demorado em julho e agosto."],
      ["Preciso de enviar o número do voo?", "Sim, por favor. O número do voo permite-nos seguir a hora real de aterragem e enviar o motorista para o terminal correto."],
    ],
  },
  "alanya-distance-guide": {
    slug: "aeroporto-antalya-alanya-distancia",
    title: "Do aeroporto de Antalya a Alanya: distância, tempo de viagem e opções de transfer",
    heading: "Do aeroporto de Antalya a Alanya: a distância real",
    description:
      "125 km pela estrada costeira D400. Quanto dura realmente a viagem até Alanya, onde ficam as zonas hoteleiras e como planear uma chegada tardia.",
    excerpt:
      "Alanya é o mais longo dos transferes habituais a partir de Antalya. A distância real, o tempo real e o que muda numa chegada noturna.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Alanya fica 125 km a leste do aeroporto de Antalya, o que a torna o transfer mais longo reservado com regularidade na Riviera Turca. Essa distância é o facto que molda todas as outras decisões sobre a viagem." },
      { type: "h2", text: "Distância e tempo de viagem" },
      {
        type: "table",
        head: ["Destino", "Distância desde AYT", "Viagem típica"],
        rows: [
          ["Centro de Antalya", "15 km", "20-30 minutos"],
          ["Side", "65 km", "55-65 minutos"],
          ["Manavgat", "75 km", "60-70 minutos"],
          ["Kızılağaç", "85 km", "70-80 minutos"],
          ["Alanya", "125 km", "110-130 minutos"],
        ],
      },
      { type: "p", text: "O percurso segue a estrada costeira D400 para leste, por Serik, Manavgat e Kızılağaç. É uma boa estrada, mas atravessa as localidades em vez de as contornar, pelo que as tardes de verão e os picos de charters ao sábado acrescentam tempo que nenhum horário consegue eliminar." },
      { type: "h2", text: "Alanya não é um só lugar" },
      { type: "p", text: "Os hotéis vendidos como «Alanya» distribuem-se por cerca de 65 km de costa. Avsallar, Türkler e Okurcalar ficam a oeste do centro e bastante mais perto do aeroporto; Mahmutlar, Kestel, Kargıcak e Demirtaş ficam a leste e acrescentam 20 a 45 minutos. Ao reservar indique o nome do hotel e não apenas a estância: é isso que determina o tempo de viagem e o preço fixo correto." },
      { type: "h2", text: "Porque o shuttle pesa mais nesta rota" },
      { type: "p", text: "Num percurso de 125 km, cada paragem extra é um desvio a sério. Um shuttle que deixa oito grupos ao longo da costa transforma facilmente duas horas em quatro, e a última família a sair é normalmente a que fica mais a leste. Um veículo privado faz o percurso uma vez, pela sua ordem, e o preço fixo não se mexe com o trânsito." },
      { type: "h2", text: "Planear uma chegada noturna" },
      { type: "p", text: "Muitos voos para Alanya aterram depois das 23:00. Importam então duas coisas: que esteja mesmo alguém à espera e que o preço tenha sido acordado antes de voar. Seguimos o voo, por isso uma aterragem atrasada desloca a recolha em vez de a cancelar, e os primeiros 90 minutos de espera estão incluídos. O pagamento é em dinheiro ao motorista no início da viagem, pelo que nada tem de ser tratado a meio da noite." },
    ],
    faq: [
      ["A que distância fica Alanya do aeroporto de Antalya?", "125 km pela estrada costeira D400, normalmente 110 a 130 minutos de viagem."],
      ["O preço do transfer é igual para todos os hotéis de Alanya?", "Não. A costa de Alanya estende-se por cerca de 65 km, por isso os hotéis em Avsallar ou Okurcalar têm preço diferente dos de Mahmutlar ou Kargıcak. Indique o nome do hotel e verá o preço fixo correto."],
      ["Há alguma paragem pelo caminho?", "Num transfer privado podemos parar brevemente a pedido. Não há paragens programadas nem outros passageiros."],
      ["E se eu aterrar depois da meia-noite?", "A recolha segue a sua hora real de aterragem. As chegadas noturnas são normais nesta rota e não têm suplemento."],
    ],
  },
  "family-child-seats": {
    slug: "transfer-aeroporto-antalya-com-criancas",
    title: "Transfer do aeroporto de Antalya com crianças: cadeiras, carrinhos, bagagem",
    heading: "Ir até ao hotel com crianças",
    description:
      "Cadeiras de criança, carrinhos de bebé e bagagem num transfer do aeroporto de Antalya. O que pedir na reserva e porque o privado é mais simples com crianças pequenas.",
    excerpt:
      "As cadeiras de criança são gratuitas a pedido, mas só se soubermos antes de aterrar. O que nos deve dizer e o que cabe mesmo no veículo.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Um transfer com crianças pequenas é um problema de logística, não de preço. As cadeiras, um carrinho, uma cama de viagem e quatro malas têm de caber no mesmo veículo ao mesmo tempo - e as decisões que tornam isso possível tomam-se na reserva, não no terminal." },
      { type: "h2", text: "Cadeiras de criança" },
      { type: "p", text: "Disponibilizamos cadeiras de criança gratuitamente a pedido. Indique o número de crianças e as idades ao reservar; é isso que determina se é preciso ovinho, cadeira para criança pequena ou banco elevatório. As cadeiras são preparadas com o veículo, pelo que não há nada para transportar pelo aeroporto nem nada para tratar à 01:00 nas chegadas." },
      { type: "h2", text: "O que cabe no veículo" },
      {
        type: "ul",
        items: [
          "Mercedes Vito: até seis passageiros com bagagem de férias normal.",
          "Mercedes Sprinter: grupos maiores, até 12 lugares, e a escolha certa quando viajam carrinho de bebé e cama de viagem.",
          "Carrinhos e cadeiras não contam para o número de passageiros, mas ocupam bagageira - avise-nos e atribuímos o veículo em conformidade.",
        ],
      },
      { type: "p", text: "O preço fixo é do veículo, não do lugar, por isso acrescentar uma criança nunca altera a tarifa. O que muda é o veículo que enviamos." },
      { type: "h2", text: "Porque o privado conta mais com crianças" },
      { type: "p", text: "Num shuttle partilhado, a família espera primeiro que o veículo encha e depois percorre a costa enquanto outros grupos saem. Com uma criança pequena depois de um voo noturno, essa é a diferença entre quarenta minutos e três horas. Um veículo privado parte quando estiverem prontos e segue diretamente para a receção do hotel." },
      { type: "h2", text: "Pormenores práticos úteis" },
      { type: "p", text: "Há água no veículo. Se for preciso uma paragem curta no trajeto longo para Side ou Alanya, basta pedir ao motorista - não há horário a cumprir. E como o pagamento é em dinheiro no início da viagem, ninguém tem de procurar um cartão ou rede com uma criança a dormir ao colo." },
    ],
    faq: [
      ["As cadeiras de criança são gratuitas?", "Sim. As cadeiras são disponibilizadas sem custo adicional a pedido. Indique o número de crianças e as idades ao reservar."],
      ["Posso levar um carrinho de bebé?", "Sim. Avise na reserva para prevermos espaço de bagagem - um carrinho mais um conjunto completo de malas pode implicar uma Sprinter em vez de um Vito."],
      ["As crianças contam para o limite de passageiros?", "Para a lotação, sim. O preço não muda: é fixo por veículo, não por pessoa."],
      ["Podemos parar num transfer longo?", "Sim. Num transfer privado o motorista pode fazer uma paragem curta a pedido; não há outros passageiros à espera."],
    ],
  },
  "belek-golf-transfer": {
    slug: "transfer-de-golfe-para-belek",
    title: "Transfer de golfe para Belek: tacos, grupos e gestão do tempo a partir do AYT",
    heading: "Do aeroporto de Antalya a Belek com sacos de golfe",
    description:
      "Como viaja a bagagem de golfe do aeroporto de Antalya até Belek: escolha do veículo, dimensão do grupo, tempos face ao tee time e o que confirmar na reserva.",
    excerpt:
      "Belek é primeiro um destino de golfe e só depois uma estância balnear. O que isso implica para a bagageira, a escolha do veículo e a viagem desde o AYT.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Belek fica 45 km a leste do aeroporto de Antalya, 35 a 40 minutos de viagem, e concentra o conjunto mais denso de campos de campeonato da Türkiye. A maioria dos grupos que chega ali transporta algo para o qual um transfer normal não está dimensionado: sacos de golfe." },
      { type: "h2", text: "Sacos de golfe e escolha do veículo" },
      { type: "p", text: "Um saco de torneio tem cerca de 130 cm e divide mal o espaço com as malas. Regra prática: um Mercedes Vito leva quatro passageiros com quatro sacos de golfe e a bagagem habitual; acima disso, o veículo certo é uma Mercedes Sprinter. Indique o número de sacos na reserva e atribuímos o veículo à carga, não ao número de pessoas." },
      {
        type: "ul",
        items: [
          "Quatro jogadores, quatro sacos, malas normais: Vito.",
          "Seis a oito jogadores, ou sacos mais malas grandes: Sprinter.",
          "Grupo misto com acompanhantes que não jogam: conte os sacos, não as pessoas.",
        ],
      },
      { type: "h2", text: "Ajustar os tempos ao tee time" },
      { type: "p", text: "A viagem é curta, o aeroporto não. Em época alta conte 20 a 45 minutos da aterragem até sair do terminal e depois 35 a 40 minutos de estrada. Um tee time de manhã no dia da chegada só é realista para voos que aterrem antes das 07:00 aproximadamente; caso contrário, planeie a primeira volta para a manhã seguinte." },
      { type: "h2", text: "Campos e hotéis da zona" },
      { type: "p", text: "Os resorts de Belek - entre eles Regnum Carya, Gloria, Cornelia e Maxx Royal - ficam a poucos quilómetros uns dos outros e dos campos, pelo que uma paragem extra por um colega alojado noutro hotel custa minutos e não uma hora. Num transfer privado é possível; num shuttle partilhado não é você que decide a ordem." },
      { type: "h2", text: "O que confirmar na reserva" },
      { type: "p", text: "Três coisas: o número de sacos de golfe, o nome do hotel e a hora de recolha do regresso, se já souber a partida. O preço é fixo por veículo, por isso um veículo maior por causa da bagagem é um orçamento que vê antes de viajar, nunca um suplemento no passeio." },
    ],
    faq: [
      ["Os sacos de golfe custam extra?", "Não. O preço é fixo por veículo. Bagagem maior pode implicar o envio de uma Sprinter em vez de um Vito, e esse preço é visível na reserva."],
      ["Quantos sacos de golfe cabem num Vito?", "Como regra prática, quatro sacos com quatro passageiros e malas normais. Para mais sacos ou jogadores usamos uma Sprinter."],
      ["Quanto dura a viagem do aeroporto de Antalya a Belek?", "45 km, normalmente 35 a 40 minutos em trânsito habitual."],
      ["Podemos parar num segundo hotel em Belek?", "Sim. Os resorts ficam próximos, por isso uma entrega adicional num transfer privado custa apenas alguns minutos. Indique-o na reserva."],
    ],
  },
  "when-to-visit-antalya": {
    slug: "melhor-altura-para-visitar-antalya",
    title: "Melhor altura para visitar Antalya: época a época e o que muda no transfer",
    heading: "Quando visitar Antalya e como a época muda a sua chegada",
    description:
      "Antalya época a época: clima, afluência, preços e tráfego no aeroporto. O que cada mês significa para os horários, o trânsito e o planeamento da chegada.",
    excerpt:
      "Cada época na Riviera Turca significa uma chegada diferente. O que muda entre abril e outubro, e porque isso conta na estrada.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Antalya está cheia cerca de sete meses e calma cinco, e a diferença nota-se muito antes da praia: nos preços dos voos, nas filas do aeroporto e no trânsito da D400." },
      { type: "h2", text: "Abril a maio: a janela de melhor relação" },
      { type: "p", text: "A temperatura do mar sobe ao longo de maio, as máximas diurnas passam dos vinte graus e a estrada da costa está vazia para padrões de verão. Os voos aterram a horas civilizadas e o terminal esvazia depressa. É também quando uma viagem até Alanya ou Kaş é um prazer em vez de uma prova de resistência." },
      { type: "h2", text: "Junho a agosto: o pico" },
      { type: "p", text: "Julho e agosto são quentes, cheios e caros. O aeroporto de Antalya regista o tráfego mais intenso, o controlo de passaportes e a bagagem demoram mais, e a estrada da costa junta o trânsito de férias ao movimento local de fim de semana. É então que um preço fixo e uma recolha ligada ao voo se pagam: nada na estrada é previsível, por isso vale a pena fixar antecipadamente tudo o que for possível." },
      { type: "h2", text: "Setembro a outubro: o melhor compromisso" },
      { type: "p", text: "O mar está no ponto mais quente, a afluência diminui semana a semana e os preços descem a partir de meados de setembro. Muitos habituais consideram o final de setembro a melhor semana do ano nesta costa. Os transferes voltam a cumprir aproximadamente os tempos indicados." },
      { type: "h2", text: "Novembro a março: época calma" },
      { type: "p", text: "As temperaturas diurnas mantêm-se amenas, muitos hotéis de praia fecham, e a cidade, as montanhas e as ruínas substituem a costa. A oferta de voos reduz-se e as horas de chegada tornam-se menos cómodas - que é exatamente quando um veículo reservado antecipadamente ganha à improvisação no terminal." },
      { type: "h2", text: "O que a época muda no seu transfer" },
      {
        type: "ul",
        items: [
          "Pleno verão: conte até 45 minutos da aterragem até sair do terminal e tempos maiores a leste de Manavgat.",
          "Época intermédia: os tempos publicados são realistas.",
          "Inverno: menos voos e mais aterragens noturnas, por isso confirme o número do voo e deixe a recolha segui-lo.",
          "Todo o ano: o preço fixo por veículo não muda com a época, o trânsito ou a hora.",
        ],
      },
    ],
    faq: [
      ["Qual é o melhor mês para visitar Antalya?", "O final de setembro oferece normalmente a melhor combinação: mar no ponto mais quente, menos afluência e preços já a descer."],
      ["O aeroporto de Antalya está mais cheio no verão?", "Consideravelmente. Em julho e agosto conte até 45 minutos da aterragem até sair do terminal; na época intermédia é muitas vezes metade."],
      ["Os preços do transfer mudam com a época?", "Não. Os nossos preços são fixos por veículo e não mudam com a época, o trânsito ou a hora do dia."],
      ["Vale a pena visitar Antalya no inverno?", "Sim, pela cidade, pelas montanhas e pelos sítios arqueológicos mais do que pela praia. Muitos hotéis da costa fecham entre novembro e março."],
    ],
  },
};
