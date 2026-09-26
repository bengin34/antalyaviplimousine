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
  "antalya-in-autumn": {
    "slug": "o-que-fazer-em-antalya-no-outono",
    "title": "Antalya em outubro e novembro: o que fazer no outono",
    "heading": "Antalya no outono: o que fazer em outubro e novembro",
    "description": "O que fazer em Antalya no outono, em outubro e novembro: mar quente, praias calmas, sítios antigos, desfiladeiros e golfe. Clima, o que continua aberto e como chegar.",
    "excerpt": "O mar ainda está quente, as multidões já foram embora e o calor abrandou. Por que outubro e novembro são o segredo mais bem guardado da Riviera Turca.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "O que fazer em Antalya no outono? A maioria dos turistas vai embora no fim de setembro, e é exatamente por isso que o outono é tão bom. O mar guarda o calor do verão durante semanas, as temperaturas diurnas descem para uns agradáveis 20-25 °C e os lugares insuportáveis em agosto – ruínas, desfiladeiros, a cidade velha – passam a ser a melhor parte da viagem."
      },
      {
        "type": "h2",
        "text": "O clima em Antalya no outono"
      },
      {
        "type": "table",
        "head": [
          "Mês",
          "Dia / noite",
          "Mar",
          "Como é"
        ],
        "rows": [
          [
            "Outubro",
            "cerca de 27 °C / 16 °C",
            "cerca de 24 °C",
            "Verão sem o calor abrasador – dias de praia continuam a ser normais"
          ],
          [
            "Novembro",
            "cerca de 21 °C / 11 °C",
            "cerca de 21 °C",
            "Manhãs de sol, primeiros aguaceiros, noites frescas"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Leve roupa para a praia e para a noite: em outubro basta um casaco leve; em novembro convém uma camada mais quente e um impermeável."
      },
      {
        "type": "h2",
        "text": "Ainda férias de praia: outubro no litoral"
      },
      {
        "type": "p",
        "text": "Em outubro, as praias de Konyaaltı, Lara, Belek, Side e Alanya continuam abertas, de manhã a água está muitas vezes mais quente do que o ar e já ninguém disputa as espreguiçadeiras. A maioria dos grandes resorts de Belek, Side e Kemer fica aberta até ao fim de outubro; a partir de novembro a escolha diminui, por isso confirme a temporada do seu hotel antes de reservar os voos."
      },
      {
        "type": "h2",
        "text": "Sítios antigos sem o calor"
      },
      {
        "type": "p",
        "text": "O outono é a estação das ruínas da região. Perge e Aspendos ficam a um pequeno desvio da estrada para Belek e Side, o Templo de Apolo de Side ergue-se à beira do porto, e Termessos, no alto das montanhas atrás da cidade, é uma caminhada que ninguém deveria tentar no verão. Em novembro, pode ter ruas inteiras de colunatas só para si."
      },
      {
        "type": "h2",
        "text": "Natureza: desfiladeiros, cachoeiras e a Via Lícia"
      },
      {
        "type": "ul",
        "items": [
          "Cachoeiras de Düden: as inferiores caem diretamente no mar perto de Lara; as superiores ficam num parque dentro da cidade.",
          "Desfiladeiro de Köprülü: a temporada de rafting costuma prolongar-se até outubro, com águas mais calmas do que na primavera.",
          "Via Lícia: o outono e a primavera são as duas épocas de trilhas – as etapas perto de Kemer, Olympos e Kaş estão agora no seu melhor.",
          "Teleférico do Tahtalı, perto de Kemer: o ar límpido do outono oferece as melhores vistas do cume."
        ]
      },
      {
        "type": "h2",
        "text": "Golfe, vida urbana e festivais"
      },
      {
        "type": "p",
        "text": "O outono é a época alta do golfe em Belek: os campos estão verdes, as temperaturas são ideais e os horários de saída enchem-se de grupos do norte da Europa. Na cidade, as ruelas, cafés e pequenos museus de Kaleiçi voltam à vida quando os passageiros de cruzeiros e as multidões do verão partem, e o Festival de Cinema Laranja de Ouro de Antalya realiza-se tradicionalmente no outono."
      },
      {
        "type": "h2",
        "text": "Chegar a Antalya no outono"
      },
      {
        "type": "ul",
        "items": [
          "Em outubro ainda há muitos voos; a partir de novembro os horários diminuem e mais chegadas acontecem tarde da noite.",
          "O terminal está mais calmo do que no verão, por isso os tempos de viagem até Belek, Side e Alanya ficam próximos dos valores indicados.",
          "Um transfer reservado com antecedência acompanha o seu número de voo, por isso um voo noturno atrasado não é problema.",
          "Os nossos preços são fixos por veículo e são iguais em outubro e em agosto."
        ]
      }
    ],
    "faq": [
      [
        "Está calor suficiente para nadar em Antalya em outubro?",
        "Sim. Em outubro, o mar costuma rondar os 24 °C, mais quente do que muitos mares europeus no verão, e os dias de praia são normais durante todo o mês."
      ],
      [
        "Os hotéis em Antalya estão abertos em novembro?",
        "Os hotéis da cidade e muitos resorts continuam abertos, mas vários grandes resorts do litoral fecham a partir de novembro. Verifique as datas de temporada do seu hotel antes de reservar os voos."
      ],
      [
        "O que fazer em Antalya no outono além da praia?",
        "Sítios antigos como Perge, Aspendos e Termessos, as cachoeiras de Düden, o desfiladeiro de Köprülü, trilhas na Via Lícia, golfe em Belek e a cidade velha de Kaleiçi."
      ],
      [
        "O preço do transfer muda depois da temporada de verão?",
        "Não. O preço é fixo por veículo e não muda com a estação, o trânsito ou a hora do dia."
      ]
    ]
  },
  "antalya-in-winter": {
    "slug": "o-que-fazer-em-antalya-no-inverno",
    "title": "Antalya no inverno: o que fazer de dezembro a fevereiro",
    "heading": "Antalya no inverno: o que fazer entre dezembro e fevereiro",
    "description": "O que fazer em Antalya no inverno: cidade velha, cachoeiras, sítios antigos, esqui em Saklıkent, golfe de inverno e hotéis com spa. Clima, o que abre e como se deslocar.",
    "excerpt": "Dias amenos, neve nas montanhas e uma cidade que volta a pertencer aos seus moradores. O que Antalya oferece entre dezembro e fevereiro – e o que não oferece.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "O inverno em Antalya é a época tranquila, não a época fechada. Os resorts de praia descansam, mas a cidade, as montanhas e os sítios antigos continuam abertos, a luz é límpida e os dias são muitas vezes ensolarados e amenos. É o momento de ver a região como a veem os que cá vivem – e a preços que os turistas de verão nunca conseguem."
      },
      {
        "type": "h2",
        "text": "O clima em Antalya no inverno"
      },
      {
        "type": "table",
        "head": [
          "Mês",
          "Dia / noite",
          "Mar",
          "Bom saber"
        ],
        "rows": [
          [
            "Dezembro",
            "cerca de 16 °C / 7 °C",
            "cerca de 19 °C",
            "O mês mais chuvoso, mas a chuva vem em períodos curtos entre dias de sol"
          ],
          [
            "Janeiro",
            "cerca de 15 °C / 6 °C",
            "cerca de 17 °C",
            "O mês mais fresco; neve nos picos do Tauro"
          ],
          [
            "Fevereiro",
            "cerca de 16 °C / 6 °C",
            "cerca de 17 °C",
            "Dias mais longos, primeiras amendoeiras em flor"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Uma tarde ensolarada de inverno parece primavera no norte da Europa; as noites são frescas e os interiores nem sempre são aquecidos como nos países mais frios. Leve roupa em camadas, um casaco impermeável e sapatos confortáveis para as ruas de pedra molhadas."
      },
      {
        "type": "h2",
        "text": "A cidade: Kaleiçi, museus e cachoeiras"
      },
      {
        "type": "ul",
        "items": [
          "Kaleiçi, a cidade velha muralhada: a Porta de Adriano, o Minarete Canelado, o porto antigo e ruelas de casas otomanas, hoje cafés e hotéis boutique.",
          "Museu de Antalya: uma das grandes coleções arqueológicas da Turquia, com as estátuas de Perge – ideal para um dia de chuva.",
          "Cachoeiras de Düden e Kurşunlu: com as chuvas de inverno ficam no seu caudal máximo e mais impressionantes.",
          "Calçadões de Konyaaltı e Lara: longas caminhadas, bicicleta e vista para o mar sem o calor do verão."
        ]
      },
      {
        "type": "h2",
        "text": "Sítios antigos sem filas"
      },
      {
        "type": "p",
        "text": "Perge, Aspendos e Side abrem o ano inteiro, e no inverno divide-os com um punhado de visitantes. Faselis, perto de Kemer, tem três portos no meio de um pinhal; Olympos e Çıralı são tranquilos fora de época. Termessos fica na montanha e pode estar frio, molhado ou até com neve, por isso escolha um dia seco. Mais a oeste, a Igreja de São Nicolau em Demre é uma visita natural no inverno, sobretudo perto do Natal."
      },
      {
        "type": "h2",
        "text": "Esqui e mar no mesmo dia"
      },
      {
        "type": "p",
        "text": "A estância de esqui de Saklıkent, nos montes Bakırlı, fica a cerca de 50 km da cidade, mais ou menos uma hora e meia de estrada. Quando há neve suficiente, normalmente de janeiro a março, pode esquiar de manhã e passear à beira-mar à tarde. A estrada de montanha pode exigir pneus de inverno ou correntes, por isso verifique as condições antes de ir e peça-nos um orçamento para a viagem com antecedência."
      },
      {
        "type": "h2",
        "text": "Golfe de inverno, hotéis com spa e estadias longas"
      },
      {
        "type": "p",
        "text": "Os campos de golfe de Belek ficam abertos durante todo o inverno, e os green fees e as tarifas dos hotéis estão bem abaixo dos níveis do outono e da primavera. Vários resorts em Belek, Lara e Kemer mantêm o spa e as piscinas interiores abertos no inverno, e Alanya e Side atraem visitantes de longa estadia do norte da Europa que vêm por semanas ou meses de clima ameno."
      },
      {
        "type": "h2",
        "text": "Passeios mais distantes"
      },
      {
        "type": "p",
        "text": "O inverno é uma boa altura para as viagens longas que no verão são cansativas: os terraços de travertino de Pamukkale e as ruínas de Hierápolis, ou a Capadócia coberta de neve, que muitos consideram a época mais bonita do ano por lá. Ambas implicam longos dias de estrada, e um veículo privado permite-lhe parar quando e onde quiser."
      },
      {
        "type": "h2",
        "text": "Chegar a Antalya no inverno"
      },
      {
        "type": "ul",
        "items": [
          "Há menos voos diretos e mais chegadas noturnas, muitas vezes via Istambul.",
          "Muitos resorts do litoral estão fechados, por isso confirme que o seu hotel está aberto nas suas datas.",
          "As praças de táxi estão mais calmas à noite do que no verão; uma recolha reservada que acompanha o seu número de voo é a opção mais tranquila.",
          "O preço fixo por veículo é igual no inverno e no verão – sem acréscimo noturno ou de feriado."
        ]
      }
    ],
    "faq": [
      [
        "Vale a pena visitar Antalya no inverno?",
        "Sim, se vier pela cidade, pelos sítios antigos, pela natureza e pelo golfe, e não para apanhar sol. Os dias são muitas vezes ensolarados, com temperaturas por volta dos 15 °C, e não há multidões."
      ],
      [
        "Dá para nadar em Antalya no inverno?",
        "O mar mantém-se por volta dos 17-19 °C, o que alguns visitantes acham refrescante num dia de sol. Muitos hotéis abertos no inverno têm também piscinas interiores aquecidas."
      ],
      [
        "É possível esquiar perto de Antalya?",
        "Sim. A estância de esqui de Saklıkent fica a cerca de 50 km da cidade. A temporada depende da neve e costuma ir de janeiro a março."
      ],
      [
        "Os hotéis em Antalya estão abertos no inverno?",
        "Os hotéis da cidade e de Kaleiçi estão abertos o ano inteiro, assim como vários resorts em Lara, Belek, Kemer, Side e Alanya. Muitos grandes resorts sazonais fecham de novembro a março."
      ],
      [
        "Fazem transfers a partir do aeroporto de Antalya no inverno?",
        "Sim, durante todo o ano, incluindo chegadas noturnas e feriados, ao mesmo preço fixo por veículo."
      ]
    ]
  },
  "christmas-new-year-antalya": {
    "slug": "natal-e-ano-novo-em-antalya",
    "title": "Natal e Réveillon em Antalya: guia prático",
    "heading": "Natal e Ano Novo em Antalya",
    "description": "Passar o Natal ou o Réveillon em Antalya: clima, que hotéis abrem, jantares de gala, São Nicolau em Demre e como ir e voltar do aeroporto nas noites mais movimentadas.",
    "excerpt": "Dias de sol, uma gala de Ano Novo à beira-mar e a cidade de São Nicolau a duas horas e meia de distância. Como planear as festas em Antalya e como chegar na noite certa.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "O Natal e o Ano Novo em Antalya são um dos poucos picos do inverno. Famílias a fugir do inverno do norte, grupos a celebrar a passagem de ano e viajantes que juntam as festas a uns dias de sol ameno chegam todos na mesma quinzena – enquanto grande parte do litoral está na sua época tranquila."
      },
      {
        "type": "h2",
        "text": "O que esperar no fim de dezembro"
      },
      {
        "type": "p",
        "text": "Os dias costumam chegar aos 15-16 °C e são muitas vezes ensolarados, embora dezembro seja também o mês mais chuvoso do ano. O Natal não é feriado na Turquia, por isso lojas, restaurantes e atrações funcionam normalmente a 25 de dezembro. Já a noite de Ano Novo é amplamente celebrada, e 1 de janeiro é feriado."
      },
      {
        "type": "h2",
        "text": "Que hotéis estão abertos"
      },
      {
        "type": "p",
        "text": "Os hotéis da cidade e de Kaleiçi estão abertos o ano inteiro, e vários resorts em Lara, Belek, Kemer, Side e Alanya abrem especialmente para as festas, com ceia de Natal e gala de Réveillon. Programas, código de vestuário e suplementos da gala variam muito, por isso pergunte ao seu hotel o que está incluído antes de reservar. Os quartos dos resorts abertos esgotam cedo para estas datas."
      },
      {
        "type": "h2",
        "text": "Natal: a cidade de São Nicolau"
      },
      {
        "type": "p",
        "text": "O São Nicolau histórico, o bispo por trás da lenda do Pai Natal (o Papai Noel), viveu em Myra – a atual Demre, a cerca de duas horas e meia a oeste de Antalya. A Igreja de São Nicolau e os túmulos lícios escavados na rocha de Myra são um passeio de Natal memorável, que pode combinar com uma paragem em Kaş ou com a estrada costeira à volta de Kumluca."
      },
      {
        "type": "h2",
        "text": "Réveillon em Antalya"
      },
      {
        "type": "ul",
        "items": [
          "Galas de hotel: jantar, música ao vivo e contagem decrescente, normalmente com menu fixo e suplemento.",
          "A cidade: os restaurantes de Kaleiçi e da zona da marina enchem; reserve mesa com antecedência.",
          "Lara e Konyaaltı: beach clubs e restaurantes com vista para o mar organizam as suas próprias festas.",
          "Há fogo de artifício visível ao longo da orla marítima, embora o programa mude de ano para ano."
        ]
      },
      {
        "type": "h2",
        "text": "Como se deslocar nas noites mais movimentadas"
      },
      {
        "type": "p",
        "text": "Na noite de Réveillon e nas primeiras horas de 1 de janeiro é muito difícil encontrar táxi, e as aplicações e as praças ficam sobrecarregadas precisamente quando toda a gente quer ir embora. Se for celebrar fora do hotel – na cidade, num restaurante ou na moradia de amigos – reserve o regresso com antecedência e com uma hora de recolha fixa."
      },
      {
        "type": "h2",
        "text": "Chegadas e partidas nas festas"
      },
      {
        "type": "ul",
        "items": [
          "Os voos por volta de 20 de dezembro e 2 de janeiro são os mais movimentados do inverno; reserve cedo.",
          "Muitos voos das festas aterram ao fim do dia ou de noite – uma recolha que acompanha o seu número de voo evita esperas no terminal.",
          "Famílias com presentes de Natal e bagagem de inverno devem indicar o número de malas, para atribuirmos o veículo certo.",
          "O nosso preço fixo por veículo não tem acréscimo de feriado nem de Réveillon."
        ]
      }
    ],
    "faq": [
      [
        "Como está o tempo em Antalya no Natal?",
        "Ameno: normalmente cerca de 15-16 °C durante o dia e 6-8 °C à noite, com abertas de sol entre aguaceiros. Não é tempo de praia, mas costuma ser agradável para passear e visitar."
      ],
      [
        "Celebra-se o Natal em Antalya?",
        "O Natal não é feriado na Turquia, mas muitos hotéis com hóspedes internacionais organizam uma ceia de Natal. O Réveillon é amplamente celebrado e 1 de janeiro é feriado."
      ],
      [
        "Onde fica a Igreja de São Nicolau?",
        "Em Demre, a antiga Myra, a cerca de duas horas e meia de carro a oeste de Antalya. Está aberta a visitantes o ano inteiro."
      ],
      [
        "Posso reservar um transfer para a noite de Réveillon?",
        "Sim. Recomendamos reservar o regresso com uma hora de recolha fixa, porque depois da meia-noite é muito difícil encontrar táxi. O preço fixo por veículo não tem acréscimo de feriado."
      ]
    ]
  },
  "wintering-in-antalya": {
    "slug": "passar-o-inverno-em-antalya-guia-estadias-longas",
    "title": "Passar o inverno em Antalya e Alanya: guia de estadias longas",
    "heading": "Passar o inverno em Antalya: guia para estadias longas",
    "description": "Passar o inverno na Riviera Turca: por que Alanya, Side e Antalya atraem estadias longas, o que esperar do clima, alojamento, saúde e chegada com muita bagagem.",
    "excerpt": "Semanas ou meses de clima ameno em vez do inverno do norte. O que saber antes de passar o inverno em Alanya, Side ou Antalya.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Todos os invernos, milhares de visitantes da Alemanha, da Escandinávia, dos Países Baixos, da Rússia e da Polónia trocam os céus cinzentos pela Riviera Turca durante semanas ou meses. Temperaturas amenas, longos passeios à beira-mar e um custo de vida mais baixo do que em casa fazem de Antalya, Alanya e Side alguns dos destinos mais procurados do Mediterrâneo para passar o inverno."
      },
      {
        "type": "h2",
        "text": "Por que passar o inverno aqui"
      },
      {
        "type": "ul",
        "items": [
          "Clima ameno: dias de inverno por volta dos 15-17 °C, muitas vezes ensolarados, e geada rara no litoral.",
          "Luz: bastante mais horas de sol do que no norte e no centro da Europa.",
          "Espaço: passeios marítimos, praias e cidades velhas sem as multidões do verão.",
          "Infraestrutura: nas cidades maiores, lojas, mercados, restaurantes e hospitais privados abrem o ano inteiro."
        ]
      },
      {
        "type": "h2",
        "text": "Onde ficar"
      },
      {
        "type": "table",
        "head": [
          "Local",
          "Ideal para",
          "Distância do aeroporto"
        ],
        "rows": [
          [
            "Antalya (cidade)",
            "Vida urbana, cultura, museus, todos os serviços à porta",
            "cerca de 15-30 minutos"
          ],
          [
            "Side / Manavgat",
            "Uma cidade velha tranquila, praias extensas, passeios planos",
            "cerca de 1 hora"
          ],
          [
            "Alanya",
            "A maior comunidade de estadias longas, passeios marítimos, vida de inverno ativa",
            "cerca de 1 hora e 45 minutos"
          ],
          [
            "Kemer",
            "Montanha e mar, trilhas, uma estância mais pequena",
            "cerca de 1 hora"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Alanya e os bairros vizinhos, como Mahmutlar e Oba, reúnem a maior comunidade de hóspedes de longa estadia no inverno, com clubes, atividades e restaurantes animados durante toda a estação. Side é mais calma; Antalya é para quem quer uma cidade a sério."
      },
      {
        "type": "h2",
        "text": "Alojamento: hotéis e apartamentos"
      },
      {
        "type": "p",
        "text": "Alguns hotéis em Alanya, Side e Antalya oferecem tarifas especiais para estadias de quatro semanas ou mais, muitas vezes em meia pensão. Os apartamentos arrendados dão mais espaço e independência; verifique se têm aquecimento ou ar condicionado com função de aquecimento, porque as casas do litoral turco são feitas para o verão e podem parecer frias nas noites de inverno."
      },
      {
        "type": "h2",
        "text": "O dia a dia no inverno"
      },
      {
        "type": "ul",
        "items": [
          "Mercados semanais em cada bairro para fruta e legumes frescos – o inverno é a época dos citrinos.",
          "Caminhadas e bicicleta pelos passeios marítimos de Alanya, Side, Lara e Konyaaltı.",
          "Trilhas no sopé do Tauro e na Via Lícia nos dias secos.",
          "Passeios de um dia a sítios antigos, à cachoeira de Manavgat ou à cidade velha de Antalya.",
          "Hospitais privados e clínicas em Antalya e Alanya com departamentos para pacientes internacionais."
        ]
      },
      {
        "type": "h2",
        "text": "Documentação e aspetos práticos"
      },
      {
        "type": "p",
        "text": "As regras de entrada e o tempo de permanência permitido sem autorização de residência dependem da sua nacionalidade e mudam de tempos a tempos, por isso confirme as regras em vigor junto das autoridades turcas oficiais antes de viajar. Recomenda-se vivamente um seguro de viagem que cubra uma estadia longa no estrangeiro."
      },
      {
        "type": "h2",
        "text": "Chegar com bagagem para meses"
      },
      {
        "type": "p",
        "text": "Quem vem passar o inverno viaja com mais do que uma mala de férias. Diga-nos quantas malas e volumes extra traz – bicicletas, andarilhos ou caixas – e atribuiremos uma Mercedes Vito ou, se necessário, uma Sprinter. O preço é fixo por veículo, por isso a bagagem extra é tida em conta na reserva, e não cobrada no momento da recolha. O motorista ajuda a carregar e descarregar até à porta."
      }
    ],
    "faq": [
      [
        "Qual é o melhor lugar para passar o inverno na Riviera Turca?",
        "Alanya tem a maior comunidade de estadias longas e a vida de inverno mais animada; Side é mais calma; Antalya oferece todos os serviços de uma cidade. As três têm invernos amenos."
      ],
      [
        "Que temperatura faz em Antalya no inverno?",
        "Durante o dia, costuma rondar os 15-17 °C de dezembro a fevereiro, com noites por volta dos 6-8 °C. A geada no litoral é rara."
      ],
      [
        "Há ofertas de hotel para estadias longas no inverno?",
        "Sim. Vários hotéis em Alanya, Side e Antalya oferecem no inverno tarifas mensais ou de longa estadia reduzidas. Pergunte diretamente ao hotel por estadias de quatro semanas ou mais."
      ],
      [
        "Posso levar muita bagagem no transfer do aeroporto?",
        "Sim. Indique o número de malas e volumes extra na reserva e atribuiremos um veículo com espaço suficiente. O preço é por veículo, sem custo por mala."
      ]
    ]
  },
  "antalya-in-spring": {
    "slug": "o-que-fazer-em-antalya-na-primavera",
    "title": "Antalya na primavera: o que fazer de março a maio",
    "heading": "Antalya na primavera: o que fazer entre março e maio",
    "description": "O que fazer em Antalya na primavera: flor de laranjeira, trilhas na Via Lícia, rafting, férias da Páscoa e os primeiros dias de praia. Clima mês a mês e o que esperar.",
    "excerpt": "Flor de laranjeira nas ruas, neve nos picos e um mar que aquece semana após semana. Por que a primavera é a estação das férias ativas em Antalya.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "A primavera chega cedo a Antalya e à Riviera Turca. Em março as laranjeiras já estão em flor, os montes Tauro ainda têm neve e os dias estão quentes o suficiente para ficar ao ar livre. É a melhor estação para caminhar, pedalar e explorar, e em maio começam os primeiros dias de praia do ano."
      },
      {
        "type": "h2",
        "text": "O clima em Antalya na primavera"
      },
      {
        "type": "table",
        "head": [
          "Mês",
          "Dia / noite",
          "Mar",
          "Ideal para"
        ],
        "rows": [
          [
            "Março",
            "cerca de 19 °C / 8 °C",
            "cerca de 17 °C",
            "Passeios culturais, trilhas, floração"
          ],
          [
            "Abril",
            "cerca de 22 °C / 11 °C",
            "cerca de 18 °C",
            "Trilhas, rafting, férias da Páscoa"
          ],
          [
            "Maio",
            "cerca de 26 °C / 15 °C",
            "cerca de 21 °C",
            "Os primeiros dias de praia, todas as atividades"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Flor de laranjeira e a cidade na primavera"
      },
      {
        "type": "p",
        "text": "Na primavera, Antalya cheira a flor de laranjeira. A cidade celebra-a com o Carnaval da Flor de Laranjeira, uma festa de rua realizada na primavera em torno de Kaleiçi e do centro. É também a melhor altura para explorar a pé a cidade velha, o Museu de Antalya e as falésias de Konyaaltı e Lara antes de chegar o calor do verão."
      },
      {
        "type": "h2",
        "text": "Férias ativas: trilhas, rafting e bicicleta"
      },
      {
        "type": "ul",
        "items": [
          "Via Lícia: a primavera é a época de trilhas mais procurada, com flores silvestres ao longo das etapas perto de Kemer, Olympos e Kaş.",
          "Desfiladeiro de Köprülü: a temporada de rafting costuma começar em abril, com águas animadas pelo degelo.",
          "Teleférico do Tahtalı: neve no topo e prados floridos em baixo, muitas vezes na mesma vista.",
          "Bicicleta: estradas tranquilas e temperaturas amenas em torno de Belek, Side e do sopé do Tauro.",
          "Golfe: a primavera é a segunda época alta nos campos de Belek."
        ]
      },
      {
        "type": "h2",
        "text": "Sítios antigos na estação verde"
      },
      {
        "type": "p",
        "text": "Perge, Aspendos, Side, Faselis e Termessos estão no seu auge na primavera, quando as ruínas ficam rodeadas de relva verde e flores silvestres. As viagens mais longas também resultam bem: Pamukkale e a Capadócia têm temperaturas agradáveis, e os voos de balão sobre a Capadócia são frequentes na primavera quando o tempo está estável."
      },
      {
        "type": "h2",
        "text": "Páscoa e férias da primavera"
      },
      {
        "type": "p",
        "text": "A Páscoa e as férias escolares da primavera na Alemanha, nos Países Baixos, no Reino Unido e na Escandinávia trazem a primeira vaga de famílias. A partir de abril abrem mais hotéis sazonais, os voos aumentam e em maio a maioria dos resorts do litoral está em pleno funcionamento. Para as datas da Páscoa, reserve cedo hotel e transfer."
      },
      {
        "type": "h2",
        "text": "Chegar a Antalya na primavera"
      },
      {
        "type": "ul",
        "items": [
          "Em março alguns resorts ainda estão fechados; a partir de abril a escolha alarga-se rapidamente.",
          "O terminal e as estradas estão calmos, por isso os tempos de viagem indicados são realistas.",
          "Equipamento de trilhas e de golfe, bicicletas e cadeirinhas de criança devem ser indicados na reserva.",
          "O preço é fixo por veículo e não muda com a estação."
        ]
      }
    ],
    "faq": [
      [
        "Está calor suficiente para ir à praia em Antalya na primavera?",
        "A partir de maio, sim: os dias chegam a cerca de 26 °C e o mar a cerca de 21 °C. Em março e abril está calor suficiente para ficar ao sol, mas o mar ainda está frio para a maioria dos banhistas."
      ],
      [
        "Quando é o Carnaval da Flor de Laranjeira em Antalya?",
        "Realiza-se na primavera, quando as laranjeiras da cidade florescem. As datas mudam todos os anos, por isso consulte os anúncios oficiais da cidade antes de planear a viagem em função do evento."
      ],
      [
        "A primavera é uma boa época para fazer a Via Lícia?",
        "Sim. A primavera e o outono são as duas melhores épocas para trilhas; na primavera os caminhos estão verdes e cheios de flores silvestres, e as temperaturas são agradáveis."
      ],
      [
        "Os hotéis em Antalya estão abertos em março?",
        "Os hotéis da cidade e alguns resorts estão abertos. Muitos resorts sazonais abrem ao longo de abril, e em maio a maior parte do litoral está em pleno funcionamento."
      ]
    ]
  }
};
