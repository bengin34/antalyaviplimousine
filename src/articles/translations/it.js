/**
 * Blog copy for it: the page chrome plus every article body.
 * One file per language, so adding a market is adding a file.
 */
export const chrome = {
  locale: "it_IT",
  indexTitle: "Guide ai transfer di Antalya e articoli di viaggio | Antalya VIP Tourism",
  indexDescription:
    "Guide pratiche all'arrivo ad Antalya: transfer privato o taxi, l'incontro con l'autista, viaggiare con bambini, le distanze sulla costa e quando partire.",
  heading: "Guide ai transfer di Antalya",
  intro:
    "Articoli pratici sull'arrivo all'aeroporto di Antalya e sul tragitto fino all'hotel - scritti dai transfer che effettuiamo ogni giorno, non da una brochure.",
  blog: "Guide",
  readMore: "Leggi la guida",
  minReadLabel: "{minutes} min di lettura",
  updated: "Aggiornato",
  contents: "In questa guida",
  faqHeading: "Domande frequenti",
  relatedHeading: "Tratte di transfer in questa guida",
  routeGuidesHeading: "Guide per questo transfer",
  moreHeading: "Altre guide",
  ctaHeading: "Transfer a prezzo fisso dall'aeroporto di Antalya",
  ctaText:
    "Un prezzo per l'intero veicolo, monitoraggio del volo incluso e pagamento in contanti all'autista. Controlla la tratta e prenota in un minuto.",
  ctaButton: "Vedi il tuo prezzo fisso",
  backToBlog: "Tutte le guide",
  home: "Home",
  routes: "Tratte di transfer",
  book: "Prenota il transfer",
  imprint: "Note legali",
  privacy: "Privacy",
  imprintUrl: "/impressum.html",
  privacyUrl: "/privacy/",
};

export const articles = {
  "transfer-vs-taxi": {
    slug: "transfer-o-taxi-aeroporto-antalya",
    title: "Aeroporto di Antalya: transfer privato, taxi o navetta condivisa?",
    heading: "Transfer privato, taxi o navetta condivisa dall'aeroporto di Antalya?",
    description:
      "Quanto costano davvero le tre opzioni in uscita dall'aeroporto di Antalya, quanto durano e quale conviene al tuo gruppo. Confronto con prezzo fisso per veicolo.",
    excerpt:
      "Tre modi per lasciare l'aeroporto di Antalya e tre inizi di vacanza molto diversi. Quanto costa ciascuno, quanto dura e a chi conviene.",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "Atterri all'aeroporto di Antalya (AYT) dopo tre-cinque ore di volo, spesso a tarda sera, di solito con i bagagli e spesso con bambini. I quaranta minuti successivi decidono come inizia la vacanza. Ci sono tre modi realistici di uscire dal terminal, e il prezzo più basso esposto è raramente il viaggio meno caro." },
      { type: "h2", text: "Le tre opzioni a confronto" },
      {
        type: "table",
        head: ["", "Transfer privato", "Taxi aeroportuale", "Navetta condivisa"],
        rows: [
          ["Base del prezzo", "Fisso, per veicolo", "Tassametro, a corsa", "A persona"],
          ["Noto prima dell'arrivo", "Sì", "No", "Sì"],
          ["Attende in caso di ritardo", "Sì, con monitoraggio", "No", "Limitato"],
          ["Soste prima del tuo hotel", "Nessuna", "Nessuna", "Fino a 8"],
          ["Capacità bagagli", "Da van", "Da berlina", "Condivisa"],
          ["Seggiolino", "Su richiesta, gratuito", "Raramente", "No"],
        ],
      },
      { type: "h2", text: "Quanto costa davvero un taxi" },
      { type: "p", text: "Il taxi è la risposta ovvia in qualsiasi aeroporto e, sulle brevi distanze, è anche ragionevole. Sulla Riviera turca il problema è la distanza: Belek dista 45 km, Side 65 km, Alanya 125 km. Un tassametro che corre di notte per 125 km, con un ritorno che l'autista deve mettere in conto, produce una cifra che nessuno ti ha anticipato. E non hai appigli se il percorso seguito non è stato il più diretto." },
      { type: "p", text: "Il transfer privato ribalta questa logica: il prezzo dell'intero veicolo è concordato prima della partenza, non cambia con il traffico ed è lo stesso che viaggino una persona o sei." },
      { type: "h2", text: "Perché la navetta sembra economica e spesso non lo è" },
      { type: "p", text: "Un prezzo a persona sembra imbattibile per chi viaggia da solo e smette di esserlo già in due. Per una famiglia di quattro diretta a Side, quattro posti costano di norma più di un van a prezzo fisso. Il costo reale, però, è il tempo: il veicolo parte quando è pieno e lascia i passeggeri lungo la costiera nell'ordine che conviene al percorso, non a te. Arrivare per ultimi dopo un volo notturno aggiunge facilmente più di un'ora." },
      { type: "h2", text: "Quando ogni opzione è quella giusta" },
      {
        type: "ul",
        items: [
          "Viaggiatore singolo, bagaglio a mano, atterraggio diurno, hotel nel centro di Antalya: taxi o navetta vanno bene.",
          "Due o più persone con hotel fuori città: il veicolo privato costa di solito meno ed è sempre più rapido.",
          "Famiglie con seggiolini, passeggino o sacche da golf: privato, perché la capienza è confermata in anticipo.",
          "Arrivi notturni e coincidenze che possono slittare: privato, perché il prelievo segue il volo e non un orario.",
        ],
      },
      { type: "h2", text: "Cosa verificare prima di prenotare" },
      { type: "p", text: "Tre domande rendono evidente la differenza. Il prezzo è per veicolo o a persona? È fisso o si muove con traffico e orario? E cosa succede se il volo atterra con due ore di ritardo: c'è ancora qualcuno ad attenderti e costa di più? I nostri prezzi fissi sono per veicolo, il monitoraggio del volo è incluso e i primi 90 minuti di attesa dopo l'atterraggio sono gratuiti e slittano automaticamente in caso di ritardo." },
    ],
    faq: [
      ["Un transfer privato costa più di un taxi ad Antalya?", "Verso il centro di Antalya è paragonabile. Verso Belek, Side, Kemer o Alanya un prezzo fisso per veicolo è di norma inferiore alla corsa a tassametro sulla stessa distanza, e lo conosci prima di partire."],
      ["Pago a persona o per veicolo?", "Per veicolo. Il prezzo di un Mercedes Vito copre fino a sei passeggeri; lo Sprinter è per gruppi più numerosi. Un passeggero in più non cambia il prezzo."],
      ["Cosa succede se il mio volo è in ritardo?", "Monitoriamo il volo in tempo reale e spostiamo il prelievo senza costi aggiuntivi. I 90 minuti di attesa inclusi partono dall'atterraggio effettivo."],
      ["Posso pagare in contanti all'arrivo?", "Sì. Non è richiesto alcun anticipo; paghi l'importo fisso della prenotazione direttamente all'autista all'inizio del viaggio."],
    ],
  },
  "airport-arrival-guide": {
    slug: "guida-arrivo-aeroporto-antalya",
    title: "Guida all'arrivo all'aeroporto di Antalya: terminal, punto d'incontro, attesa",
    heading: "Arrivare all'aeroporto di Antalya: cosa succede dopo l'atterraggio",
    description:
      "Passo per passo nell'arrivo all'aeroporto di Antalya: terminal, controllo passaporti, bagagli, dove attende l'autista e quanto dura l'attesa gratuita.",
    excerpt:
      "Dal contatto con la pista alla portiera: terminal, controllo passaporti, punto d'incontro e cosa accade se il volo è in ritardo.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "L'aeroporto di Antalya gestisce oltre trenta milioni di passeggeri l'anno e quasi tutti arrivano in una finestra estiva molto stretta. Conoscere in anticipo la sequenza trasforma un terminal affollato in una formalità di venti minuti." },
      { type: "h2", text: "A quale terminal atterri" },
      { type: "p", text: "AYT ha tre terminal. La maggior parte dei voli di linea internazionali usa il Terminal 1 o il Terminal 2; i charter e i voli stagionali sono gestiti di norma dal Terminal 2. Il terminal nazionale serve i voli da Istanbul, Ankara e Smirne. Non devi capirlo tu: il numero del volo ce lo dice e l'autista viene inviato alla sala arrivi giusta." },
      { type: "h2", text: "Controllo passaporti e bagagli" },
      { type: "p", text: "La maggior parte dei cittadini europei entra in Türkiye senza visto per soggiorni brevi, ma verifica le regole valide per il tuo passaporto prima di partire. In alta stagione calcola dai 20 ai 45 minuti dall'atterraggio all'uscita con i bagagli, meno fuori da luglio e agosto. Il ritiro bagagli è la fase che varia di più, ed è per questo che una finestra di attesa conta più di un orario di prelievo promesso." },
      { type: "h2", text: "Dove ti incontra l'autista" },
      {
        type: "ul",
        items: [
          "Ritira i bagagli e prosegui verso la sala arrivi.",
          "Dirigiti all'area meet & greet J / 777.",
          "Il nostro team in aeroporto trova la tua prenotazione e ti accompagna dall'autista.",
          "L'autista porta i bagagli al veicolo nel parcheggio vicino.",
        ],
      },
      { type: "p", text: "Non devi cercare un cartello con il tuo nome tra cinquanta. Il team è in un punto fisso e ha il riferimento della prenotazione, quindi la presa in carico funziona uguale alle 06:00 e alle 02:00." },
      { type: "h2", text: "Cosa succede se il volo è in ritardo" },
      { type: "p", text: "Monitoriamo il volo stesso, non l'orario su cui hai prenotato. Se atterra con due ore di ritardo, il prelievo si sposta di due ore e il prezzo non cambia. I primi 90 minuti di attesa dall'orario reale di atterraggio sono inclusi senza costi: coprono una fila lunga ai passaporti o bagagli in ritardo." },
      { type: "h2", text: "Prima di partire" },
      { type: "p", text: "Due dettagli rendono la giornata semplice: dacci il numero del volo e non solo l'orario di arrivo, e indica il numero di seggiolini già in fase di prenotazione. Entrambi sono gratuiti, ed entrambi sono molto più difficili da organizzare all'01:00 in sala arrivi." },
    ],
    faq: [
      ["Dove incontro esattamente l'autista all'aeroporto di Antalya?", "Nell'area meet & greet J / 777 della sala arrivi, dopo aver ritirato i bagagli. Il nostro team ha la tua prenotazione e ti accompagna dall'autista."],
      ["Quanto attende l'autista?", "I primi 90 minuti dall'orario reale di atterraggio sono inclusi gratuitamente e la finestra si sposta automaticamente se il volo è in ritardo."],
      ["Quanto ci vuole a uscire dal terminal?", "Di norma dai 20 ai 45 minuti dall'atterraggio, a seconda di controllo passaporti e ritiro bagagli. È più lungo a luglio e agosto."],
      ["Devo inviare il numero del volo?", "Sì, per favore. Il numero del volo ci permette di seguire l'orario reale di atterraggio e di inviare l'autista al terminal corretto."],
    ],
  },
  "alanya-distance-guide": {
    slug: "aeroporto-antalya-alanya-distanza",
    title: "Dall'aeroporto di Antalya ad Alanya: distanza, tempi e opzioni di transfer",
    heading: "Dall'aeroporto di Antalya ad Alanya: quanto dista davvero",
    description:
      "125 km lungo la strada costiera D400. Quanto dura realmente il tragitto verso Alanya, dove si trovano i quartieri turistici e come pianificare un arrivo tardivo.",
    excerpt:
      "Alanya è il più lungo fra i transfer abituali da Antalya. La distanza reale, i tempi reali e cosa cambia con un arrivo notturno.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Alanya si trova 125 km a est dell'aeroporto di Antalya, il che la rende il transfer più lungo prenotato abitualmente sulla Riviera turca. Quella distanza è il dato che condiziona ogni altra decisione sul viaggio." },
      { type: "h2", text: "Distanza e tempi di percorrenza" },
      {
        type: "table",
        head: ["Destinazione", "Distanza da AYT", "Tempo tipico"],
        rows: [
          ["Antalya città", "15 km", "20-30 minuti"],
          ["Side", "65 km", "55-65 minuti"],
          ["Manavgat", "75 km", "60-70 minuti"],
          ["Kızılağaç", "85 km", "70-80 minuti"],
          ["Alanya", "125 km", "110-130 minuti"],
        ],
      },
      { type: "p", text: "Il percorso segue la costiera D400 verso est passando per Serik, Manavgat e Kızılağaç. È una buona strada, ma attraversa i centri abitati invece di aggirarli: i pomeriggi estivi e i picchi charter del sabato aggiungono un tempo che nessun orario può eliminare." },
      { type: "h2", text: "Alanya non è un unico luogo" },
      { type: "p", text: "Gli hotel venduti come «Alanya» si distribuiscono su circa 65 km di costa. Avsallar, Türkler e Okurcalar stanno a ovest del centro e sono nettamente più vicini all'aeroporto; Mahmutlar, Kestel, Kargıcak e Demirtaş stanno a est e aggiungono dai 20 ai 45 minuti. In fase di prenotazione indica il nome dell'hotel e non solo la località: è ciò che determina sia il tempo di percorrenza sia il prezzo fisso corretto." },
      { type: "h2", text: "Perché qui la navetta pesa di più" },
      { type: "p", text: "Su 125 km ogni sosta in più è una deviazione vera. Una navetta che lascia otto gruppi lungo la costa trasforma facilmente due ore in quattro, e l'ultima famiglia a scendere è di solito quella alloggiata più a est. Un veicolo privato percorre la tratta una volta sola, nel tuo ordine, e il prezzo fisso non si muove con il traffico." },
      { type: "h2", text: "Pianificare un arrivo notturno" },
      { type: "p", text: "Molti voli per Alanya atterrano dopo le 23:00. Contano allora due cose: che qualcuno stia certamente aspettando e che il prezzo sia stato concordato prima della partenza. Monitoriamo il volo, quindi un atterraggio in ritardo sposta il prelievo invece di annullarlo, e i primi 90 minuti di attesa sono inclusi. Il pagamento è in contanti all'autista a inizio viaggio, così non resta nulla da organizzare nel cuore della notte." },
    ],
    faq: [
      ["Quanto dista Alanya dall'aeroporto di Antalya?", "125 km lungo la costiera D400, di norma dai 110 ai 130 minuti di viaggio."],
      ["Il prezzo del transfer è uguale per tutti gli hotel di Alanya?", "No. La costa di Alanya si estende per circa 65 km, quindi gli hotel di Avsallar o Okurcalar hanno un prezzo diverso da quelli di Mahmutlar o Kargıcak. Indica il nome dell'hotel e vedrai il prezzo fisso corretto."],
      ["C'è una sosta lungo il tragitto?", "Con un transfer privato possiamo fermarci brevemente su richiesta. Non ci sono soste programmate né altri passeggeri."],
      ["E se atterro dopo mezzanotte?", "Il prelievo segue l'orario reale di atterraggio. Gli arrivi notturni sono normali su questa tratta e non comportano supplementi."],
    ],
  },
  "family-child-seats": {
    slug: "transfer-aeroporto-antalya-con-bambini",
    title: "Transfer dall'aeroporto di Antalya con bambini: seggiolini, passeggini, bagagli",
    heading: "Raggiungere l'hotel con i bambini",
    description:
      "Seggiolini, passeggini e bagagli in un transfer dall'aeroporto di Antalya. Cosa chiedere in fase di prenotazione e perché il privato è più semplice con bimbi piccoli.",
    excerpt:
      "I seggiolini sono gratuiti su richiesta, ma solo se lo sappiamo prima che tu atterri. Cosa dirci e cosa entra davvero nel veicolo.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Un transfer con bambini piccoli è un problema di logistica, non di prezzo. Seggiolini, un passeggino, un lettino da viaggio e quattro valigie devono entrare nello stesso veicolo nello stesso momento - e le decisioni che lo rendono possibile si prendono alla prenotazione, non al terminal." },
      { type: "h2", text: "Seggiolini per bambini" },
      { type: "p", text: "Forniamo i seggiolini gratuitamente su richiesta. Indica il numero di bambini e la loro età in fase di prenotazione: è questo a determinare se serve un ovetto, un seggiolino per bimbi piccoli o un rialzo. I seggiolini vengono preparati insieme al veicolo, quindi non c'è nulla da trasportare in aeroporto né da organizzare all'01:00 in sala arrivi." },
      { type: "h2", text: "Cosa entra nel veicolo" },
      {
        type: "ul",
        items: [
          "Mercedes Vito: fino a sei passeggeri con normali bagagli da vacanza.",
          "Mercedes Sprinter: gruppi più numerosi, fino a 12 posti, ed è la scelta giusta quando viaggiano anche passeggino e lettino.",
          "Passeggini e seggiolini non rientrano nel numero di passeggeri, ma occupano spazio bagagli: segnalalo e assegneremo il veicolo di conseguenza.",
        ],
      },
      { type: "p", text: "Il prezzo fisso è per veicolo, non per posto, quindi un bambino in più non cambia mai la tariffa. Cambia solo quale veicolo inviamo." },
      { type: "h2", text: "Perché il privato conta di più con i bambini" },
      { type: "p", text: "Su una navetta condivisa la famiglia aspetta prima che il veicolo si riempia, poi percorre la costa mentre scendono altri gruppi. Con un bimbo piccolo dopo un volo notturno, è la differenza fra quaranta minuti e tre ore. Un veicolo privato parte quando siete pronti e va dritto alla reception dell'hotel." },
      { type: "h2", text: "Dettagli pratici utili" },
      { type: "p", text: "In vettura è disponibile acqua potabile. Se serve una sosta breve sul lungo tragitto verso Side o Alanya, basta chiederlo all'autista: non c'è alcun orario da rispettare. E poiché il pagamento avviene in contanti a inizio viaggio, nessuno deve cercare una carta o il segnale con un bambino addormentato in braccio." },
    ],
    faq: [
      ["I seggiolini sono gratuiti?", "Sì. I seggiolini sono forniti senza costi aggiuntivi su richiesta. Indica il numero di bambini e la loro età in fase di prenotazione."],
      ["Posso portare un passeggino?", "Sì. Segnalalo alla prenotazione così prevediamo lo spazio bagagli: un passeggino più un set completo di valigie può richiedere uno Sprinter invece di un Vito."],
      ["I bambini rientrano nel limite di passeggeri?", "Per la capienza dei posti, sì. Il prezzo non cambia: è fisso per veicolo, non per persona."],
      ["Possiamo fermarci in un transfer lungo?", "Sì. In un transfer privato l'autista può fare una breve sosta su richiesta; non ci sono altri passeggeri in attesa."],
    ],
  },
  "belek-golf-transfer": {
    slug: "transfer-golf-per-belek",
    title: "Transfer golf per Belek: sacche, gruppi e tempistiche dall'aeroporto",
    heading: "Dall'aeroporto di Antalya a Belek con le sacche da golf",
    description:
      "Come viaggiano i bagagli da golf dall'aeroporto di Antalya a Belek: scelta del veicolo, dimensione del gruppo, tempi rispetto al tee time e cosa confermare.",
    excerpt:
      "Belek è prima una destinazione golfistica e poi una località balneare. Cosa comporta per il bagagliaio, la scelta del veicolo e il tragitto da AYT.",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Belek si trova 45 km a est dell'aeroporto di Antalya, 35-40 minuti di auto, e concentra il gruppo più fitto di campi da campionato della Türkiye. La maggior parte dei gruppi che vi arrivano porta con sé qualcosa per cui un transfer normale non è dimensionato: le sacche da golf." },
      { type: "h2", text: "Sacche da golf e scelta del veicolo" },
      { type: "p", text: "Una tour bag è lunga circa 130 cm e divide male lo spazio con le valigie. Regola pratica: un Mercedes Vito gestisce quattro passeggeri con quattro sacche e i loro bagagli abituali; oltre, il veicolo corretto è un Mercedes Sprinter. Indicaci il numero di sacche in prenotazione e assegneremo il veicolo al carico, non al numero di persone." },
      {
        type: "ul",
        items: [
          "Quattro giocatori, quattro sacche, valigie standard: Vito.",
          "Da sei a otto giocatori, oppure sacche più valigie grandi: Sprinter.",
          "Gruppo misto con accompagnatori che non giocano: conta le sacche, non le persone.",
        ],
      },
      { type: "h2", text: "Calcolare i tempi rispetto al tee time" },
      { type: "p", text: "Il tragitto è breve, l'aeroporto no. In alta stagione calcola dai 20 ai 45 minuti dall'atterraggio all'uscita dal terminal, poi 35-40 minuti di strada. Un tee time mattutino nel giorno di arrivo è realistico solo per voli che atterrano prima delle 07:00 circa; altrimenti pianifica il primo giro per la mattina successiva." },
      { type: "h2", text: "Campi e hotel della zona" },
      { type: "p", text: "I resort di Belek - fra cui Regnum Carya, Gloria, Cornelia e Maxx Royal - distano pochi chilometri l'uno dall'altro e dai campi, quindi una sosta in più per un compagno alloggiato altrove costa minuti e non un'ora. Con un transfer privato si può fare; su una navetta condivisa non decidi tu l'ordine." },
      { type: "h2", text: "Cosa confermare in prenotazione" },
      { type: "p", text: "Tre cose: il numero di sacche da golf, il nome dell'hotel e l'orario di prelievo per il ritorno se conosci già la partenza. Il prezzo è fisso per veicolo, quindi un mezzo più grande per i bagagli è un preventivo che vedi prima di viaggiare, mai un supplemento sul marciapiede." },
    ],
    faq: [
      ["Le sacche da golf costano un supplemento?", "No. Il prezzo è fisso per veicolo. Bagagli più ingombranti possono comportare l'invio di uno Sprinter al posto di un Vito, e quel prezzo lo vedi in fase di prenotazione."],
      ["Quante sacche da golf entrano in un Vito?", "Come regola pratica, quattro sacche con quattro passeggeri e valigie standard. Per più sacche o giocatori usiamo uno Sprinter."],
      ["Quanto dura il tragitto dall'aeroporto di Antalya a Belek?", "45 km, di norma dai 35 ai 40 minuti con traffico normale."],
      ["Possiamo fermarci a un secondo hotel a Belek?", "Sì. I resort sono vicini fra loro, quindi una consegna aggiuntiva su un transfer privato costa solo pochi minuti. Segnalalo in fase di prenotazione."],
    ],
  },
  "when-to-visit-antalya": {
    slug: "periodo-migliore-per-visitare-antalya",
    title: "Periodo migliore per visitare Antalya: stagione per stagione e il suo effetto sul transfer",
    heading: "Quando visitare Antalya e come la stagione cambia il tuo arrivo",
    description:
      "Antalya stagione per stagione: clima, affollamento, prezzi e traffico aeroportuale. Cosa comporta ogni mese per gli orari, il traffico e la pianificazione dell'arrivo.",
    excerpt:
      "Ogni stagione sulla Riviera turca significa un arrivo diverso. Cosa cambia fra aprile e ottobre, e perché conta sulla strada.",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Antalya è affollata per circa sette mesi e tranquilla per cinque, e la differenza si vede molto prima della spiaggia: nei prezzi dei voli, nelle code in aeroporto e nel traffico sulla D400." },
      { type: "h2", text: "Aprile-maggio: la finestra col miglior rapporto" },
      { type: "p", text: "La temperatura del mare sale nel corso di maggio, le massime diurne superano i venti gradi e la costiera è vuota per gli standard estivi. I voli atterrano a orari civili e il terminal si svuota in fretta. È anche il periodo in cui un tragitto verso Alanya o Kaş è un piacere e non una prova di resistenza." },
      { type: "h2", text: "Giugno-agosto: il picco" },
      { type: "p", text: "Luglio e agosto sono caldi, pieni e cari. L'aeroporto di Antalya registra il traffico più intenso, controllo passaporti e bagagli richiedono più tempo, e la costiera porta insieme il traffico vacanziero e gli spostamenti locali del fine settimana. È allora che un prezzo fisso e un prelievo agganciato al volo si ripagano: sulla strada nulla è prevedibile, quindi conviene fissare in anticipo tutto ciò che si può." },
      { type: "h2", text: "Settembre-ottobre: il miglior compromesso" },
      { type: "p", text: "Il mare è al massimo del calore, l'affollamento cala settimana dopo settimana e i prezzi scendono da metà settembre. Molti habitué considerano la fine di settembre la settimana migliore dell'anno su questa costa. I transfer tornano vicini ai tempi nominali." },
      { type: "h2", text: "Novembre-marzo: stagione tranquilla" },
      { type: "p", text: "Le temperature diurne restano miti, molti hotel balneari chiudono, e la città, le montagne e i siti antichi prendono il posto della costa. L'offerta di voli si restringe e gli orari di arrivo diventano meno comodi - ed è esattamente quando un veicolo prenotato in anticipo batte l'improvvisazione al terminal." },
      { type: "h2", text: "Cosa cambia la stagione nel tuo transfer" },
      {
        type: "ul",
        items: [
          "Piena estate: calcola fino a 45 minuti dall'atterraggio all'uscita dal terminal e tempi più lunghi a est di Manavgat.",
          "Media stagione: i tempi indicati sono realistici.",
          "Inverno: meno voli e più atterraggi notturni, quindi conferma il numero del volo e lascia che il prelievo lo segua.",
          "Tutto l'anno: il prezzo fisso per veicolo non cambia con stagione, traffico o orario.",
        ],
      },
    ],
    faq: [
      ["Qual è il mese migliore per visitare Antalya?", "La fine di settembre offre di solito la combinazione migliore: mare al massimo del calore, affollamento in calo e prezzi già in discesa."],
      ["L'aeroporto di Antalya è più affollato d'estate?", "Nettamente. A luglio e agosto calcola fino a 45 minuti dall'atterraggio all'uscita dal terminal; in media stagione spesso la metà."],
      ["I prezzi del transfer cambiano con la stagione?", "No. I nostri prezzi sono fissi per veicolo e non cambiano con la stagione, il traffico o l'orario."],
      ["Vale la pena visitare Antalya in inverno?", "Sì, per la città, le montagne e i siti archeologici più che per la spiaggia. Molti hotel costieri chiudono fra novembre e marzo."],
    ],
  },
  "antalya-in-autumn": {
    "slug": "cosa-fare-ad-antalya-in-autunno",
    "title": "Antalya a ottobre e novembre: cosa fare in autunno",
    "heading": "Antalya in autunno: cosa fare a ottobre e novembre",
    "description": "Cosa fare ad Antalya in autunno, a ottobre e novembre: mare caldo, spiagge tranquille, siti antichi, canyon e golf. Meteo, cosa resta aperto e come organizzare l'arrivo.",
    "excerpt": "Il mare è ancora caldo, la folla è tornata a casa e l'afa è finita. Perché ottobre e novembre sono il segreto meglio custodito della Riviera turca.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Cosa fare ad Antalya in autunno? La maggior parte dei turisti riparte a fine settembre, ed è proprio per questo che l'autunno funziona così bene. Il mare conserva il calore dell'estate per settimane, le temperature diurne scendono sui piacevoli 20-25 °C e i luoghi insopportabili ad agosto – rovine, canyon, centro storico – diventano la parte migliore del viaggio."
      },
      {
        "type": "h2",
        "text": "Il meteo ad Antalya in autunno"
      },
      {
        "type": "table",
        "head": [
          "Mese",
          "Giorno / notte",
          "Mare",
          "Com'è"
        ],
        "rows": [
          [
            "Ottobre",
            "circa 27 °C / 16 °C",
            "circa 24 °C",
            "Estate senza l'afa: le giornate al mare sono ancora la norma"
          ],
          [
            "Novembre",
            "circa 21 °C / 11 °C",
            "circa 21 °C",
            "Mattine di sole, primi acquazzoni, serate fresche"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Mettete in valigia abiti da spiaggia e da sera: a ottobre basta una giacca leggera, a novembre conviene uno strato più caldo e un impermeabile."
      },
      {
        "type": "h2",
        "text": "Ancora vacanze al mare: ottobre sulla costa"
      },
      {
        "type": "p",
        "text": "A ottobre le spiagge di Konyaaltı, Lara, Belek, Side e Alanya sono ancora aperte, al mattino l'acqua è spesso più calda dell'aria e i lettini non sono più una gara. La maggior parte dei grandi resort di Belek, Side e Kemer resta aperta fino a fine ottobre; da novembre la scelta si riduce, quindi verificate le date di apertura del vostro hotel prima di prenotare i voli."
      },
      {
        "type": "h2",
        "text": "Siti antichi senza il caldo"
      },
      {
        "type": "p",
        "text": "L'autunno è la stagione delle rovine della regione. Perge e Aspendos sono a una breve deviazione dalla strada per Belek e Side, il Tempio di Apollo di Side si affaccia sul porto e Termessos, in alto tra le montagne alle spalle della città, è una camminata che nessuno dovrebbe tentare d'estate. A novembre potreste avere intere vie colonnate tutte per voi."
      },
      {
        "type": "h2",
        "text": "Natura: canyon, cascate e Via Licia"
      },
      {
        "type": "ul",
        "items": [
          "Cascate di Düden: quelle inferiori si tuffano direttamente in mare vicino a Lara, quelle superiori si trovano in un parco in città.",
          "Canyon di Köprülü: la stagione del rafting di solito prosegue fino a ottobre, con acque più calme che in primavera.",
          "Via Licia: autunno e primavera sono le due stagioni del trekking, e ora le tappe intorno a Kemer, Olympos e Kaş danno il meglio.",
          "Funivia del Tahtalı vicino a Kemer: l'aria limpida d'autunno regala le viste più belle dalla cima."
        ]
      },
      {
        "type": "h2",
        "text": "Golf, vita di città e festival"
      },
      {
        "type": "p",
        "text": "L'autunno è l'alta stagione del golf a Belek: i campi sono verdi, le temperature ideali e i tee time si riempiono di gruppi dal Nord Europa. In città, i vicoli, i caffè e i piccoli musei di Kaleiçi tornano a vivere quando se ne vanno i crocieristi e la folla estiva, e il Festival del cinema Arancia d'Oro di Antalya si svolge tradizionalmente in autunno."
      },
      {
        "type": "h2",
        "text": "Arrivare ad Antalya in autunno"
      },
      {
        "type": "ul",
        "items": [
          "A ottobre i voli sono ancora frequenti; da novembre gli orari si diradano e più arrivi atterrano a tarda sera.",
          "Il terminal è più tranquillo che d'estate, quindi i tempi di percorrenza verso Belek, Side e Alanya sono vicini a quelli indicati.",
          "Un transfer prenotato in anticipo segue il vostro numero di volo, quindi un volo serale in ritardo non è un problema.",
          "I nostri prezzi sono fissi per veicolo e sono gli stessi a ottobre e ad agosto."
        ]
      }
    ],
    "faq": [
      [
        "Fa abbastanza caldo per fare il bagno ad Antalya a ottobre?",
        "Sì. A ottobre il mare è di solito intorno ai 24 °C, più caldo di molti mari europei d'estate, e le giornate in spiaggia sono la norma per tutto il mese."
      ],
      [
        "Gli hotel ad Antalya sono aperti a novembre?",
        "Gli hotel in città e molti resort restano aperti, ma diversi grandi resort costieri chiudono da novembre. Controllate le date della stagione del vostro hotel prima di prenotare i voli."
      ],
      [
        "Cosa fare ad Antalya in autunno oltre al mare?",
        "Siti antichi come Perge, Aspendos e Termessos, le cascate di Düden, il canyon di Köprülü, il trekking sulla Via Licia, il golf a Belek e il centro storico di Kaleiçi."
      ],
      [
        "Il prezzo del transfer cambia dopo la stagione estiva?",
        "No. Il prezzo è fisso per veicolo e non cambia in base alla stagione, al traffico o all'ora del giorno."
      ]
    ]
  },
  "antalya-in-winter": {
    "slug": "cosa-fare-ad-antalya-in-inverno",
    "title": "Antalya in inverno: cosa fare da dicembre a febbraio",
    "heading": "Antalya in inverno: cosa fare tra dicembre e febbraio",
    "description": "Cosa fare ad Antalya in inverno: centro storico, cascate, siti antichi, sci a Saklıkent, golf invernale e hotel con spa. Meteo, cosa è aperto e come spostarsi.",
    "excerpt": "Giornate miti, neve sulle montagne e una città che torna ai suoi abitanti. Cosa offre Antalya tra dicembre e febbraio, e cosa no.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "L'inverno ad Antalya è la stagione tranquilla, non la stagione chiusa. I resort balneari riposano, ma la città, le montagne e i siti antichi restano aperti, la luce è limpida e le giornate sono spesso soleggiate e miti. È il momento di vedere la regione come la vede chi ci vive, e a prezzi che i turisti estivi non trovano mai."
      },
      {
        "type": "h2",
        "text": "Il meteo ad Antalya in inverno"
      },
      {
        "type": "table",
        "head": [
          "Mese",
          "Giorno / notte",
          "Mare",
          "Buono a sapersi"
        ],
        "rows": [
          [
            "Dicembre",
            "circa 16 °C / 7 °C",
            "circa 19 °C",
            "Il mese più piovoso, ma la pioggia arriva a scrosci tra giornate di sole"
          ],
          [
            "Gennaio",
            "circa 15 °C / 6 °C",
            "circa 17 °C",
            "Il mese più fresco; neve sulle vette del Tauro"
          ],
          [
            "Febbraio",
            "circa 16 °C / 6 °C",
            "circa 17 °C",
            "Giornate più lunghe, primi mandorli in fiore"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Un pomeriggio d'inverno soleggiato sembra primavera nel Nord Europa; le serate sono fresche e gli interni non sempre sono riscaldati come si è abituati più a nord. Portate abiti a strati, una giacca impermeabile e scarpe comode per le strade lastricate bagnate."
      },
      {
        "type": "h2",
        "text": "La città: Kaleiçi, musei e cascate"
      },
      {
        "type": "ul",
        "items": [
          "Kaleiçi, il centro storico racchiuso dalle mura: la Porta di Adriano, il Minareto Scanalato, il porto vecchio e vicoli di case ottomane oggi trasformate in caffè e boutique hotel.",
          "Museo di Antalya: una delle grandi collezioni archeologiche della Turchia, con le statue di Perge; ideale per una giornata di pioggia.",
          "Cascate di Düden e Kurşunlu: con le piogge invernali sono al massimo della portata e ancora più spettacolari.",
          "Lungomari di Konyaaltı e Lara: lunghe passeggiate, bicicletta e vista mare senza il caldo estivo."
        ]
      },
      {
        "type": "h2",
        "text": "Siti antichi senza code"
      },
      {
        "type": "p",
        "text": "Perge, Aspendos e Side sono aperti tutto l'anno, e d'inverno li condividete con una manciata di visitatori. Faselide, vicino a Kemer, ha tre porti in mezzo a una pineta; Olympos e Çıralı sono tranquilli fuori stagione. Termessos è in montagna e può essere fredda, bagnata o persino innevata, quindi scegliete una giornata asciutta. Più a ovest, la Chiesa di San Nicola a Demre è una visita naturale in inverno, soprattutto nel periodo di Natale."
      },
      {
        "type": "h2",
        "text": "Sci e mare nello stesso giorno"
      },
      {
        "type": "p",
        "text": "La stazione sciistica di Saklıkent, sui monti Bakırlı, si trova a circa 50 km dalla città, più o meno un'ora e mezza di strada. Quando c'è neve a sufficienza, di solito da gennaio a marzo, potete sciare al mattino e passeggiare lungo il mare nel pomeriggio. La strada di montagna può richiedere gomme invernali o catene, quindi verificate le condizioni prima di partire e chiedeteci in anticipo un preventivo per il tragitto."
      },
      {
        "type": "h2",
        "text": "Golf invernale, hotel con spa e soggiorni lunghi"
      },
      {
        "type": "p",
        "text": "I campi da golf di Belek restano aperti per tutto l'inverno, con green fee e tariffe alberghiere ben al di sotto dei livelli di autunno e primavera. Diversi resort di Belek, Lara e Kemer tengono aperti spa e piscine coperte in inverno, e Alanya e Side attirano ospiti di lungo soggiorno dal Nord Europa che vengono per settimane o mesi di clima mite."
      },
      {
        "type": "h2",
        "text": "Escursioni più lontane"
      },
      {
        "type": "p",
        "text": "L'inverno è un buon momento per le gite lunghe che d'estate sfiniscono: i travertini di Pamukkale e le rovine di Hierapolis, oppure la Cappadocia innevata, che molti considerano il periodo più bello dell'anno laggiù. Entrambe richiedono lunghe giornate in viaggio, e un veicolo privato vi permette di fermarvi quando e dove volete."
      },
      {
        "type": "h2",
        "text": "Arrivare ad Antalya in inverno"
      },
      {
        "type": "ul",
        "items": [
          "I voli diretti sono meno numerosi e gli arrivi notturni più frequenti, spesso via Istanbul.",
          "Molti resort costieri sono chiusi, quindi verificate che il vostro hotel sia aperto nelle vostre date.",
          "Di notte i posteggi dei taxi sono più tranquilli che d'estate; un pick-up prenotato che segue il vostro numero di volo è l'opzione più serena.",
          "Il prezzo fisso per veicolo è lo stesso d'inverno e d'estate, senza supplementi notturni o festivi."
        ]
      }
    ],
    "faq": [
      [
        "Vale la pena visitare Antalya in inverno?",
        "Sì, se venite per la città, i siti antichi, la natura e il golf più che per abbronzarvi. Le giornate sono spesso soleggiate con temperature intorno ai 15 °C, e non c'è folla."
      ],
      [
        "Si può fare il bagno ad Antalya in inverno?",
        "Il mare resta intorno ai 17-19 °C, che alcuni visitatori trovano rinfrescante in una giornata di sole. Molti hotel aperti d'inverno hanno anche piscine coperte riscaldate."
      ],
      [
        "Si può sciare vicino ad Antalya?",
        "Sì. La stazione sciistica di Saklıkent si trova a circa 50 km dalla città. La stagione dipende dalle nevicate e di solito va da gennaio a marzo."
      ],
      [
        "Gli hotel di Antalya sono aperti in inverno?",
        "Gli hotel in città e a Kaleiçi sono aperti tutto l'anno, così come diversi resort a Lara, Belek, Kemer, Side e Alanya. Molti grandi resort stagionali chiudono da novembre a marzo."
      ],
      [
        "Effettuate transfer dall'aeroporto di Antalya in inverno?",
        "Sì, tutto l'anno, compresi arrivi notturni e giorni festivi, allo stesso prezzo fisso per veicolo."
      ]
    ]
  },
  "christmas-new-year-antalya": {
    "slug": "natale-e-capodanno-ad-antalya",
    "title": "Natale e Capodanno ad Antalya: guida pratica",
    "heading": "Natale e Capodanno ad Antalya",
    "description": "Natale o Capodanno ad Antalya: meteo, quali hotel sono aperti, cene di gala, San Nicola a Demre e come andare e tornare dall'aeroporto nelle notti più affollate.",
    "excerpt": "Giornate di sole, un veglione di Capodanno sul mare e la città di San Nicola a due ore e mezza di distanza. Come organizzare le feste ad Antalya e come arrivarci la sera giusta.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Natale e Capodanno ad Antalya sono uno dei pochi picchi dell'inverno. Famiglie in fuga dall'inverno del nord, gruppi che festeggiano l'ultimo dell'anno e viaggiatori che uniscono le feste a qualche giorno di sole mite arrivano tutti nella stessa quindicina, mentre gran parte della costa è nella sua stagione tranquilla."
      },
      {
        "type": "h2",
        "text": "Cosa aspettarsi a fine dicembre"
      },
      {
        "type": "p",
        "text": "Di giorno le temperature arrivano di solito sui 15-16 °C e il cielo è spesso sereno, anche se dicembre è pure il mese più piovoso dell'anno. In Turchia il Natale non è un giorno festivo, quindi negozi, ristoranti e attrazioni funzionano normalmente il 25 dicembre. La notte di San Silvestro, invece, si festeggia ovunque e il 1° gennaio è festivo."
      },
      {
        "type": "h2",
        "text": "Quali hotel sono aperti"
      },
      {
        "type": "p",
        "text": "Gli hotel in città e a Kaleiçi sono aperti tutto l'anno, e diversi resort a Lara, Belek, Kemer, Side e Alanya aprono appositamente per le feste con cena di Natale e veglione di Capodanno. Programmi, dress code e supplementi per il gala variano molto, quindi chiedete al vostro hotel cosa è incluso prima di prenotare. Per queste date le camere dei resort aperti vanno esaurite presto."
      },
      {
        "type": "h2",
        "text": "Natale: la città di San Nicola"
      },
      {
        "type": "p",
        "text": "Il San Nicola storico, il vescovo da cui nasce la leggenda di Babbo Natale, visse a Myra, l'odierna Demre, a circa due ore e mezza a ovest di Antalya. La Chiesa di San Nicola e le tombe licie scavate nella roccia di Myra sono un'escursione natalizia memorabile, da abbinare a una sosta a Kaş o alla strada costiera intorno a Kumluca."
      },
      {
        "type": "h2",
        "text": "Capodanno ad Antalya"
      },
      {
        "type": "ul",
        "items": [
          "Gala in hotel: cena, musica dal vivo e conto alla rovescia, di solito con menù fisso e supplemento.",
          "La città: i ristoranti di Kaleiçi e della zona del porto turistico sono pieni; prenotate il tavolo in anticipo.",
          "Lara e Konyaaltı: beach club e ristoranti vista mare organizzano le proprie feste.",
          "I fuochi d'artificio si vedono lungo il lungomare, anche se il programma cambia di anno in anno."
        ]
      },
      {
        "type": "h2",
        "text": "Come spostarsi nelle notti più affollate"
      },
      {
        "type": "p",
        "text": "La sera di San Silvestro e nelle prime ore del 1° gennaio trovare un taxi è difficilissimo, e app e posteggi vanno in tilt proprio quando tutti vogliono andarsene. Se festeggiate lontano dal vostro hotel – in città, al ristorante o nella villa di amici – prenotate in anticipo il rientro con un orario di partenza fisso."
      },
      {
        "type": "h2",
        "text": "Arrivi e partenze durante le feste"
      },
      {
        "type": "ul",
        "items": [
          "I voli intorno al 20 dicembre e al 2 gennaio sono i più affollati dell'inverno; prenotate presto.",
          "Molti voli delle feste atterrano la sera o di notte: un pick-up che segue il vostro numero di volo evita attese al terminal.",
          "Le famiglie con regali di Natale e bagagli invernali dovrebbero indicare il numero di valigie, così assegniamo il veicolo giusto.",
          "Il nostro prezzo fisso per veicolo non prevede supplementi per le feste o per la notte di Capodanno."
        ]
      }
    ],
    "faq": [
      [
        "Che tempo fa ad Antalya a Natale?",
        "Mite: di solito circa 15-16 °C di giorno e 6-8 °C di notte, con schiarite tra un acquazzone e l'altro. Non è clima da spiaggia, ma spesso è piacevole per passeggiare e visitare."
      ],
      [
        "Ad Antalya si festeggia il Natale?",
        "In Turchia il Natale non è un giorno festivo, ma molti hotel con ospiti internazionali organizzano una cena di Natale. Il Capodanno si festeggia ovunque e il 1° gennaio è festivo."
      ],
      [
        "Dove si trova la Chiesa di San Nicola?",
        "A Demre, l'antica Myra, a circa due ore e mezza d'auto a ovest di Antalya. È visitabile tutto l'anno."
      ],
      [
        "Posso prenotare un transfer per la notte di Capodanno?",
        "Sì. Consigliamo di prenotare il rientro con un orario di partenza fisso, perché dopo mezzanotte i taxi sono introvabili. Il prezzo fisso per veicolo non prevede supplementi festivi."
      ]
    ]
  },
  "wintering-in-antalya": {
    "slug": "svernare-ad-antalya-guida-soggiorni-lunghi",
    "title": "Svernare ad Antalya e Alanya: guida ai soggiorni lunghi",
    "heading": "Passare l'inverno ad Antalya: guida ai soggiorni lunghi",
    "description": "Svernare sulla Riviera turca: perché Alanya, Side e Antalya attirano chi resta a lungo, cosa aspettarsi da clima, alloggi, assistenza sanitaria e arrivo con tanti bagagli.",
    "excerpt": "Settimane o mesi di clima mite al posto dell'inverno del nord. Cosa sapere prima di passare l'inverno ad Alanya, Side o Antalya.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "Ogni inverno migliaia di persone da Germania, Scandinavia, Paesi Bassi, Russia e Polonia lasciano i cieli grigi per svernare sulla Riviera turca per settimane o mesi. Temperature miti, lunghe passeggiate sul lungomare e un costo della vita più basso che a casa fanno di Antalya, Alanya e Side alcune delle mete invernali più amate del Mediterraneo."
      },
      {
        "type": "h2",
        "text": "Perché passare l'inverno qui"
      },
      {
        "type": "ul",
        "items": [
          "Clima mite: giornate invernali intorno ai 15-17 °C, spesso soleggiate, gelate rare sulla costa.",
          "Luce: molte più ore di sole rispetto al Nord e al Centro Europa.",
          "Spazio: lungomari, spiagge e centri storici senza la folla estiva.",
          "Servizi: nelle città più grandi negozi, mercati, ristoranti e ospedali privati sono aperti tutto l'anno."
        ]
      },
      {
        "type": "h2",
        "text": "Dove soggiornare"
      },
      {
        "type": "table",
        "head": [
          "Località",
          "Ideale per",
          "Distanza dall'aeroporto"
        ],
        "rows": [
          [
            "Antalya città",
            "Vita urbana, cultura, musei, tutti i servizi a portata di mano",
            "circa 15-30 minuti"
          ],
          [
            "Side / Manavgat",
            "Un centro storico tranquillo, lunghe spiagge, passeggiate in piano",
            "circa 1 ora"
          ],
          [
            "Alanya",
            "La più grande comunità di lungo soggiorno, lungomari, vita invernale attiva",
            "circa 1 ora e 45 minuti"
          ],
          [
            "Kemer",
            "Montagna e mare, escursioni, una località più piccola",
            "circa 1 ora"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Alanya e i quartieri vicini come Mahmutlar e Oba ospitano la più grande comunità invernale di ospiti di lungo soggiorno, con club, attività e ristoranti animati per tutto l'inverno. Side è più tranquilla; Antalya è adatta a chi vuole una vera città."
      },
      {
        "type": "h2",
        "text": "Alloggio: hotel e appartamenti"
      },
      {
        "type": "p",
        "text": "Alcuni hotel di Alanya, Side e Antalya offrono tariffe speciali per soggiorni di quattro settimane o più, spesso in mezza pensione. Gli appartamenti in affitto offrono più spazio e indipendenza; verificate che abbiano il riscaldamento o un condizionatore con pompa di calore, perché le case della costa turca sono pensate per l'estate e possono risultare fredde nelle serate invernali."
      },
      {
        "type": "h2",
        "text": "La vita quotidiana in inverno"
      },
      {
        "type": "ul",
        "items": [
          "Mercati settimanali in ogni quartiere per frutta e verdura fresca: l'inverno è la stagione degli agrumi.",
          "Passeggiate e bicicletta sui lungomari di Alanya, Side, Lara e Konyaaltı.",
          "Escursioni sulle pendici del Tauro e sulla Via Licia nelle giornate asciutte.",
          "Gite di un giorno ai siti antichi, alla cascata di Manavgat o al centro storico di Antalya.",
          "Ospedali privati e cliniche ad Antalya e Alanya con reparti dedicati ai pazienti internazionali."
        ]
      },
      {
        "type": "h2",
        "text": "Documenti e aspetti pratici"
      },
      {
        "type": "p",
        "text": "Le regole d'ingresso e la durata del soggiorno consentita senza permesso di residenza dipendono dalla vostra nazionalità e cambiano di tanto in tanto, quindi verificate le norme in vigore con le autorità turche ufficiali prima di partire. È vivamente consigliata un'assicurazione di viaggio che copra un lungo soggiorno all'estero."
      },
      {
        "type": "h2",
        "text": "Arrivare con i bagagli per mesi"
      },
      {
        "type": "p",
        "text": "Chi viene a svernare viaggia con più di una valigia da vacanza. Diteci quante valigie e oggetti extra portate – biciclette, deambulatori o scatoloni – e vi assegneremo un Mercedes Vito o, se necessario, uno Sprinter. Il prezzo è fisso per veicolo, quindi i bagagli extra si considerano al momento della prenotazione, non si pagano sul marciapiede. L'autista aiuta a caricare e scaricare fino alla porta."
      }
    ],
    "faq": [
      [
        "Qual è il posto migliore per svernare sulla Riviera turca?",
        "Alanya ha la più grande comunità di lungo soggiorno e la vita invernale più vivace; Side è più tranquilla; Antalya offre tutti i servizi di una città. Tutte e tre hanno inverni miti."
      ],
      [
        "Quanto fa caldo ad Antalya in inverno?",
        "Da dicembre a febbraio le temperature diurne sono di solito intorno ai 15-17 °C, con notti intorno ai 6-8 °C. Le gelate sulla costa sono rare."
      ],
      [
        "Ci sono offerte hotel per soggiorni lunghi in inverno?",
        "Sì. Diversi hotel ad Alanya, Side e Antalya propongono in inverno tariffe mensili o per lunghi soggiorni scontate. Chiedete direttamente all'hotel per soggiorni di quattro settimane o più."
      ],
      [
        "Si possono portare molti bagagli sul transfer dall'aeroporto?",
        "Sì. Indicate il numero di valigie e oggetti extra al momento della prenotazione e vi assegneremo un veicolo con spazio sufficiente. Il prezzo è per veicolo, senza costi per valigia."
      ]
    ]
  },
  "antalya-in-spring": {
    "slug": "cosa-fare-ad-antalya-in-primavera",
    "title": "Antalya in primavera: cosa fare da marzo a maggio",
    "heading": "Antalya in primavera: cosa fare tra marzo e maggio",
    "description": "Cosa fare ad Antalya in primavera: zagara, trekking sulla Via Licia, rafting, vacanze di Pasqua e i primi bagni. Meteo mese per mese e cosa aspettarsi all'arrivo.",
    "excerpt": "Zagara nelle strade, neve sulle vette e un mare che si scalda di settimana in settimana. Perché la primavera è la stagione delle vacanze attive ad Antalya.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "La primavera arriva presto ad Antalya e sulla Riviera turca. A marzo gli aranci sono già in fiore, i monti del Tauro sono ancora innevati e le giornate sono abbastanza calde da stare all'aperto. È la stagione migliore per camminare, pedalare ed esplorare, e a maggio iniziano le prime giornate di mare dell'anno."
      },
      {
        "type": "h2",
        "text": "Il meteo ad Antalya in primavera"
      },
      {
        "type": "table",
        "head": [
          "Mese",
          "Giorno / notte",
          "Mare",
          "Ideale per"
        ],
        "rows": [
          [
            "Marzo",
            "circa 19 °C / 8 °C",
            "circa 17 °C",
            "Visite, trekking, fioriture"
          ],
          [
            "Aprile",
            "circa 22 °C / 11 °C",
            "circa 18 °C",
            "Trekking, rafting, vacanze di Pasqua"
          ],
          [
            "Maggio",
            "circa 26 °C / 15 °C",
            "circa 21 °C",
            "Le prime giornate di mare, tutte le attività"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "La zagara e la città in primavera"
      },
      {
        "type": "p",
        "text": "In primavera Antalya profuma di zagara. La città la celebra con il Carnevale della Zagara, una festa di strada che si tiene in primavera intorno a Kaleiçi e al centro. È anche il momento migliore per esplorare a piedi il centro storico, il Museo di Antalya e le scogliere di Konyaaltı e Lara prima che arrivi il caldo estivo."
      },
      {
        "type": "h2",
        "text": "Vacanze attive: trekking, rafting e bicicletta"
      },
      {
        "type": "ul",
        "items": [
          "Via Licia: la primavera è la stagione di trekking più amata, con fiori di campo lungo le tappe vicino a Kemer, Olympos e Kaş.",
          "Canyon di Köprülü: la stagione del rafting inizia di solito ad aprile, con acque vivaci per lo scioglimento delle nevi.",
          "Funivia del Tahtalı: neve in cima e prati fioriti in basso, spesso nello stesso colpo d'occhio.",
          "Bicicletta: strade tranquille e temperature miti intorno a Belek, Side e alle pendici del Tauro.",
          "Golf: la primavera è la seconda alta stagione sui campi di Belek."
        ]
      },
      {
        "type": "h2",
        "text": "Siti antichi nella stagione verde"
      },
      {
        "type": "p",
        "text": "Perge, Aspendos, Side, Faselide e Termessos danno il meglio di sé in primavera, quando le rovine sono circondate da erba verde e fiori di campo. Anche le gite più lunghe funzionano bene: Pamukkale e la Cappadocia hanno temperature gradevoli, e i voli in mongolfiera sulla Cappadocia sono frequenti in primavera quando il tempo è stabile."
      },
      {
        "type": "h2",
        "text": "Pasqua e vacanze di primavera"
      },
      {
        "type": "p",
        "text": "Pasqua e le vacanze scolastiche primaverili in Germania, Paesi Bassi, Regno Unito e Scandinavia portano la prima ondata di famiglie. Da aprile aprono altri hotel stagionali, i voli aumentano e a maggio la maggior parte dei resort costieri è pienamente operativa. Per le date di Pasqua, prenotate presto sia l'hotel sia il transfer."
      },
      {
        "type": "h2",
        "text": "Arrivare ad Antalya in primavera"
      },
      {
        "type": "ul",
        "items": [
          "A marzo alcuni resort sono ancora chiusi; da aprile la scelta si amplia rapidamente.",
          "Il terminal e le strade sono tranquilli, quindi i tempi di percorrenza indicati sono realistici.",
          "Attrezzatura da trekking e da golf, biciclette e seggiolini per bambini vanno segnalati al momento della prenotazione.",
          "Il prezzo è fisso per veicolo e non cambia con la stagione."
        ]
      }
    ],
    "faq": [
      [
        "Fa abbastanza caldo per andare al mare ad Antalya in primavera?",
        "Da maggio sì: di giorno si arriva a circa 26 °C e il mare a circa 21 °C. A marzo e aprile fa abbastanza caldo per stare al sole, ma per la maggior parte dei bagnanti il mare è ancora freddo."
      ],
      [
        "Quando si tiene il Carnevale della Zagara ad Antalya?",
        "Si tiene in primavera, quando fioriscono gli aranci della città. Le date cambiano ogni anno, quindi consultate gli annunci ufficiali della città prima di organizzare il viaggio in base all'evento."
      ],
      [
        "La primavera è un buon periodo per percorrere la Via Licia?",
        "Sì. Primavera e autunno sono le due stagioni migliori per il trekking; in primavera i sentieri sono verdi e pieni di fiori di campo, e le temperature sono piacevoli."
      ],
      [
        "Gli hotel ad Antalya sono aperti a marzo?",
        "Gli hotel in città e alcuni resort sono aperti. Molti resort stagionali aprono nel corso di aprile, e a maggio quasi tutta la costa è pienamente operativa."
      ]
    ]
  },
  "cappadocia-winter-trip": {
    "slug": "cappadocia-in-inverno-da-antalya",
    "title": "Cappadocia in inverno da Antalya: neve, mongolfiere e il viaggio in auto",
    "heading": "Cappadocia in inverno: un viaggio da Antalya",
    "description": "Cappadocia in inverno da Antalya: neve, meteo, mongolfiere, hotel nelle grotte, cosa vedere e com'è d'inverno il viaggio di 540 km su strada passando per Konya.",
    "excerpt": "Camini delle fate sotto la neve e mongolfiere su una valle bianca. Come abbinare un soggiorno invernale ad Antalya alla Cappadocia e com'è la strada d'inverno.",
    "readingMinutes": 7,
    "blocks": [
      {
        "type": "p",
        "text": "La Cappadocia in inverno è uno dei paesaggi più fotografati della Turchia: camini delle fate e valli sotto la neve, hotel nelle grotte con il camino acceso e, nelle mattine limpide, mongolfiere che si alzano su un paesaggio bianco. Da Antalya è un viaggio su strada lungo ma bellissimo, e il complemento naturale di un soggiorno invernale sulla costa."
      },
      {
        "type": "h2",
        "text": "Il meteo in inverno: un clima diverso dalla costa"
      },
      {
        "type": "p",
        "text": "La Cappadocia si trova su un altopiano a circa 1.000 metri di quota o più, quindi lì l'inverno è un inverno vero. Di giorno le temperature sono spesso vicine allo zero, di notte scendono ben sotto e la neve è frequente da dicembre a febbraio. Porta un vero cappotto invernale, guanti, berretto e scarpe impermeabili: l'abbigliamento giusto per Antalya a gennaio qui non basta."
      },
      {
        "type": "table",
        "head": [
          "",
          "Costa di Antalya",
          "Cappadocia"
        ],
        "rows": [
          [
            "Giornata invernale tipica",
            "circa 15 °C",
            "intorno a 0-5 °C"
          ],
          [
            "Notti invernali",
            "circa 6-8 °C",
            "spesso sotto zero"
          ],
          [
            "Neve",
            "solo sulle cime dei monti",
            "frequente da dicembre a febbraio"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Le mongolfiere in inverno"
      },
      {
        "type": "p",
        "text": "Le mongolfiere volano tutto l'anno quando il meteo lo consente, e un volo all'alba sopra le valli innevate è l'immagine per cui molti vengono fin qui. L'inverno porta però anche più cancellazioni per vento, nebbia o neve, e la decisione viene presa dalle autorità ogni mattina all'alba. Prevedi almeno due notti in Cappadocia, così un volo cancellato non significa rinunciarvi del tutto."
      },
      {
        "type": "h2",
        "text": "Cosa vedere in inverno"
      },
      {
        "type": "ul",
        "items": [
          "Museo all'aperto di Göreme: chiese rupestri affrescate, più tranquille in inverno che in qualsiasi altro periodo dell'anno.",
          "Città sotterranee come Derinkuyu e Kaymaklı: diversi livelli di profondità e una temperatura gradevole e costante, qualunque tempo faccia fuori.",
          "Il castello di Uçhisar e i punti panoramici sopra Göreme: i posti migliori per i panorami innevati.",
          "Brevi passeggiate nelle valli Rosa, Rossa e dell'Amore nelle giornate asciutte e limpide; dopo una nevicata i sentieri possono essere ghiacciati.",
          "Hotel nelle grotte: molti sono riscaldati e hanno il camino, e l'inverno è la stagione in cui sono più suggestivi."
        ]
      },
      {
        "type": "h2",
        "text": "La strada da Antalya"
      },
      {
        "type": "p",
        "text": "Il tragitto è di circa 540 km e richiede di solito da 7 a 8 ore: si attraversano i monti del Tauro e si prosegue sull'altopiano passando per Konya. Konya, con il Museo di Mevlana, è la tappa naturale per spezzare il viaggio. In inverno il tratto di montagna può avere neve e ghiaccio; le strade vengono sgomberate, ma un veicolo con equipaggiamento invernale e un autista che conosce il percorso fanno la differenza tra una giornata lunga e una giornata stressante."
      },
      {
        "type": "h2",
        "text": "Come organizzare il viaggio"
      },
      {
        "type": "ul",
        "items": [
          "Prevedi almeno due notti, meglio tre, per avere margine in caso di voli in mongolfiera cancellati e giornate invernali corte.",
          "Parti da Antalya al mattino per attraversare le montagne con la luce del giorno.",
          "Abbina il viaggio a un soggiorno sulla costa: qualche giorno ad Antalya o a Side e poi la Cappadocia, o viceversa.",
          "Prenota per tempo l'hotel nelle grotte ed eventuali voli in mongolfiera per il periodo di Natale e Capodanno."
        ]
      },
      {
        "type": "h2",
        "text": "Transfer tra Antalya e la Cappadocia"
      },
      {
        "type": "p",
        "text": "Effettuiamo transfer privati dall'aeroporto di Antalya e dagli hotel della costa verso la Cappadocia, solo andata o con ritorno in una data successiva. Il prezzo è fisso per veicolo, puoi fermarti per foto, pasti e una visita a Konya, e non ci sono altri passeggeri da aspettare. Indicaci il tuo hotel e le date al momento della prenotazione."
      }
    ],
    "faq": [
      [
        "Quanto dista la Cappadocia da Antalya?",
        "Circa 540 km su strada. Il viaggio richiede di solito da 7 a 8 ore passando per Konya, un po' di più con le soste o con la neve."
      ],
      [
        "Vale la pena visitare la Cappadocia in inverno?",
        "Sì. La neve sui camini delle fate, i siti tranquilli e gli accoglienti hotel nelle grotte rendono l'inverno uno dei periodi più belli. Porta abiti caldi: fa molto più freddo che sulla costa."
      ],
      [
        "Le mongolfiere volano in Cappadocia in inverno?",
        "Sì, ogni volta che il meteo lo consente. In inverno le cancellazioni sono più frequenti, quindi prevedi almeno due notti per avere una seconda possibilità."
      ],
      [
        "Posso andare da Antalya in Cappadocia con un transfer privato?",
        "Sì. Offriamo transfer privati dall'aeroporto di Antalya e dagli hotel della costa verso la Cappadocia, solo andata o andata e ritorno, a prezzo fisso per veicolo."
      ]
    ]
  },
  "belek-winter-golf": {
    "slug": "golf-invernale-a-belek",
    "title": "Golf invernale a Belek: giocare sulla Riviera turca da novembre a marzo",
    "heading": "Golf invernale a Belek",
    "description": "Perché Belek è una meta di golf invernale: meteo da novembre a marzo, condizioni dei campi, green fee più bassi, cosa mettere in valigia e come arrivare a Belek con le sacche.",
    "excerpt": "Giornate miti, fairway verdi e partenze meno affollate. Cosa sapere per giocare a golf a Belek tra novembre e marzo, quando i campi di casa sono chiusi.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Quando i campi del Nord Europa sono gelati, allagati o chiusi, a Belek il golf invernale continua. Il comprensorio di campi da campionato a 45 km a est dell'aeroporto di Antalya resta aperto per tutto l'inverno, e i mesi da novembre a marzo sono diventati una stagione a sé per i golfisti che non vogliono fermarsi tra ottobre e aprile."
      },
      {
        "type": "h2",
        "text": "Che tempo fa sul campo"
      },
      {
        "type": "table",
        "head": [
          "Mese",
          "Giornata tipica",
          "Sul campo"
        ],
        "rows": [
          [
            "Novembre",
            "circa 21 °C",
            "Condizioni eccellenti, ancora alta stagione autunnale"
          ],
          [
            "Dicembre - gennaio",
            "circa 15-16 °C",
            "Mite e spesso soleggiato, con qualche giorno di pioggia"
          ],
          [
            "Febbraio",
            "circa 16 °C",
            "Le giornate si allungano, meno giorni di pioggia"
          ],
          [
            "Marzo",
            "circa 19 °C",
            "L'inizio dell'alta stagione primaverile"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Nella maggior parte delle giornate invernali si gioca con un maglione leggero. La pioggia arriva di solito in brevi rovesci più che per settimane intere, e i campi sono costruiti per drenare in fretta. Le mattine possono essere fresche e la luce cala nel tardo pomeriggio, quindi gli orari di partenza sono in genere più anticipati che in estate."
      },
      {
        "type": "h2",
        "text": "Perché l'inverno conviene"
      },
      {
        "type": "ul",
        "items": [
          "Green fee e tariffe degli hotel sono in genere più bassi a dicembre, gennaio e febbraio che in autunno e primavera.",
          "I tee sheet sono meno pieni, quindi i giri sono più rapidi e gli orari preferiti più facili da ottenere.",
          "Diversi golf hotel restano aperti tutto l'inverno, molti con piscina coperta e spa per il pomeriggio.",
          "I voli brevi da gran parte d'Europa rendono un weekend lungo realistico quanto una settimana intera."
        ]
      },
      {
        "type": "h2",
        "text": "Campi e hotel in inverno"
      },
      {
        "type": "p",
        "text": "Non tutti i campi e gli hotel di Belek seguono lo stesso calendario in inverno, e lavori di manutenzione come carotatura o trasemina vengono talvolta programmati nei mesi tranquilli. Al momento della prenotazione chiedi quali campi sono aperti nelle tue date e se sono previsti lavori. I golf hotel di solito organizzano tee time e navette verso i campi partner."
      },
      {
        "type": "h2",
        "text": "Cosa mettere in valigia per il golf invernale"
      },
      {
        "type": "ul",
        "items": [
          "Strati: uno strato base, un maglione e un capo antivento per le mattine fresche.",
          "Giacca e pantaloni impermeabili per qualche rovescio occasionale.",
          "Guanti o manopole invernali tra un colpo e l'altro, oltre ai normali guanti da golf.",
          "Protezione solare: il sole invernale resta forte nelle giornate limpide."
        ]
      },
      {
        "type": "h2",
        "text": "Arrivare a Belek con le sacche da golf"
      },
      {
        "type": "p",
        "text": "Dall'aeroporto di Antalya a Belek ci vogliono da 35 a 40 minuti di strada, e in inverno il terminal è tranquillo, quindi un giro nel pomeriggio del giorno d'arrivo è spesso realistico. Il prezzo è fisso per veicolo, non per sacca: di norma un Mercedes Vito porta quattro giocatori con quattro sacche da golf e i loro bagagli, mentre i gruppi più numerosi viaggiano su uno Sprinter. Indicaci il numero di sacche al momento della prenotazione."
      }
    ],
    "faq": [
      [
        "Si può giocare a golf a Belek in inverno?",
        "Sì. I campi di Belek restano aperti per tutto l'inverno, con temperature diurne tipiche di circa 15-16 °C a dicembre e gennaio, e nella maggior parte dei giorni si gioca."
      ],
      [
        "Il golf a Belek costa meno in inverno?",
        "Green fee e tariffe degli hotel sono in genere più bassi a dicembre, gennaio e febbraio che nelle alte stagioni autunnale e primaverile. I prezzi esatti dipendono dal campo e dall'hotel."
      ],
      [
        "Qual è il mese migliore per il golf a Belek?",
        "Ottobre-novembre e marzo-aprile sono i mesi di punta per il golf. L'inverno è più tranquillo ed economico, con giornate un po' più fresche."
      ],
      [
        "Le sacche da golf si pagano a parte nel transfer?",
        "No. Il prezzo è fisso per veicolo. Per più sacche assegniamo un veicolo più grande, e vedi quel prezzo al momento della prenotazione."
      ]
    ]
  },
  "saklikent-ski-antalya": {
    "slug": "sciare-vicino-ad-antalya-saklikent",
    "title": "Sciare vicino ad Antalya: guida alla stazione sciistica di Saklıkent",
    "heading": "Sciare vicino ad Antalya: la stazione sciistica di Saklıkent",
    "description": "Sciare vicino ad Antalya a Saklıkent: dove si trova, quanto dura il viaggio, quando è la stagione, cosa aspettarsi sulle piste e come unire sci e mare in un solo giorno.",
    "excerpt": "Sci al mattino, passeggiata sul mare al pomeriggio. Una guida pratica a Saklıkent, la stazione sciistica di Antalya, e a come arrivarci dalla costa.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Poche località di vacanza permettono di sciare e passeggiare sul mare nello stesso giorno. Antalya sì: la stazione sciistica di Saklıkent si trova sui monti Bakırlı, a circa 50 km dalla città, e in una bella giornata d'inverno puoi essere sulle piste al mattino e di nuovo sul lungomare per il tramonto."
      },
      {
        "type": "h2",
        "text": "Dove si trova Saklıkent"
      },
      {
        "type": "p",
        "text": "La stazione si trova a circa 1.900 metri di quota, sulle pendici dei monti Bakırlı, a ovest di Antalya. Dalla città ci vuole circa un'ora e mezza di strada, che sale dagli aranceti alla pineta e poi alla neve. Nelle giornate limpide la vista dalla cima arriva fino alla costa e al mare."
      },
      {
        "type": "h2",
        "text": "Quando è la stagione"
      },
      {
        "type": "p",
        "text": "La stagione sciistica dipende interamente dalle nevicate e di solito va da gennaio a marzo. In alcuni inverni inizia prima o finisce prima, quindi controlla l'innevamento e lo stato degli impianti prima di organizzare una giornata."
      },
      {
        "type": "h2",
        "text": "Cosa aspettarsi sulle piste"
      },
      {
        "type": "ul",
        "items": [
          "Una stazione piccola e rilassata, ideale per principianti, famiglie e una giornata di sci durante una vacanza al mare più che per una settimana bianca completa.",
          "Di solito si può noleggiare l'attrezzatura da sci e snowboard in stazione; controlla gli orari prima di partire.",
          "Slittino e giochi sulla neve sono molto amati dalle famiglie, soprattutto nel fine settimana.",
          "Nel fine settimana c'è molta gente del posto; nei giorni feriali è molto più tranquillo."
        ]
      },
      {
        "type": "h2",
        "text": "Sci e mare in un solo giorno"
      },
      {
        "type": "ul",
        "items": [
          "Parti dalla costa di buon mattino per arrivare all'apertura degli impianti.",
          "Scia o gioca sulla neve fino al primo pomeriggio.",
          "Riscendi per un pranzo tardivo a Kaleiçi o una passeggiata sulla spiaggia di Konyaaltı.",
          "Porta un cambio di vestiti: la differenza di temperatura tra le piste e la costa può essere di 15 gradi o più."
        ]
      },
      {
        "type": "h2",
        "text": "Come arrivare: la strada di montagna in inverno"
      },
      {
        "type": "p",
        "text": "Non ci sono mezzi pubblici regolari fino alla stazione, e l'ultimo tratto della strada di montagna può avere neve e ghiaccio. Possono essere obbligatori pneumatici invernali o catene. Un transfer privato ti porta dal tuo hotel ad Antalya, Kemer, Belek o Side fino alle piste e ritorno, e il tempo in montagna lo decidi tu. Non è uno dei nostri percorsi standard: inviaci hotel, data e numero di persone e ti faremo un preventivo a prezzo fisso per veicolo."
      },
      {
        "type": "h2",
        "text": "Altre opzioni per sciare da Antalya"
      },
      {
        "type": "p",
        "text": "Per una vacanza sulla neve più lunga, Davraz, vicino a Isparta, è una stazione più grande con più piste, a circa due ore e mezza - tre ore di strada da Antalya. Saklıkent resta la scelta più semplice per una giornata sulla neve durante un soggiorno sulla costa."
      }
    ],
    "faq": [
      [
        "Si può sciare vicino ad Antalya?",
        "Sì. La stazione sciistica di Saklıkent si trova a circa 50 km dalla città di Antalya, circa un'ora e mezza di strada, sui monti Bakırlı."
      ],
      [
        "Quando è la stagione sciistica a Saklıkent?",
        "Dipende dalle nevicate. La stagione di solito va da gennaio a marzo; controlla le condizioni attuali prima di partire."
      ],
      [
        "Si può sciare e fare il bagno nello stesso giorno ad Antalya?",
        "Puoi sciare al mattino ed essere al mare nel pomeriggio. Il bagno d'inverno è per i più coraggiosi: il mare è a circa 17 °C."
      ],
      [
        "Come arrivo a Saklıkent dal mio hotel?",
        "Non ci sono mezzi pubblici regolari. Possiamo farti un preventivo per un transfer privato dal tuo hotel alla stazione sciistica e ritorno, a prezzo fisso per veicolo."
      ]
    ]
  },
  "pamukkale-trip-from-antalya": {
    "slug": "escursione-pamukkale-da-antalya",
    "title": "Escursione a Pamukkale da Antalya: in giornata o con pernottamento, e quando andare",
    "heading": "Pamukkale da Antalya: come organizzare l'escursione",
    "description": "Escursione a Pamukkale da Antalya: distanza e tempi di viaggio, in giornata o con pernottamento, le travertine, Hierapolis, la Piscina Antica e il periodo migliore per andare.",
    "excerpt": "Terrazze di travertino bianco, una città romana sulla collina e una piscina tra colonne antiche. Come visitare Pamukkale da Antalya senza passare l'intera giornata in pullman.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Un'escursione a Pamukkale da Antalya porta a una delle meraviglie più famose della Türkiye: terrazze di travertino bianco piene di acqua tiepida e ricca di minerali e, sopra di esse, le rovine della città romana di Hierapolis. Da Antalya sono circa 245 km di strada, da tre a tre ore e mezza per tratta: abbastanza vicino per una gita in giornata, ma abbastanza lontano perché un pernottamento renda la visita molto più rilassata."
      },
      {
        "type": "h2",
        "text": "Cosa vedere a Pamukkale"
      },
      {
        "type": "ul",
        "items": [
          "Le travertine: si cammina a piedi nudi lungo le terrazze, nell'acqua tiepida e poco profonda; le scarpe non sono ammesse sulla superficie bianca.",
          "Hierapolis: una grande città romana con un teatro, una via monumentale e una delle più vaste necropoli antiche dell'Anatolia.",
          "La Piscina Antica: si nuota nell'acqua termale calda tra colonne antiche crollate (biglietto a parte).",
          "Il Museo Archeologico di Hierapolis: i reperti del sito, esposti nelle antiche terme romane.",
          "Laodicea: a breve distanza in auto, un'altra grande città antica con molti meno visitatori."
        ]
      },
      {
        "type": "h2",
        "text": "In giornata o con pernottamento?"
      },
      {
        "type": "table",
        "head": [
          "",
          "In giornata",
          "Con pernottamento"
        ],
        "rows": [
          [
            "Tempo in viaggio",
            "6-7 ore in un solo giorno",
            "Suddiviso in due giorni"
          ],
          [
            "Tempo sul sito",
            "3-4 ore, di solito a mezzogiorno",
            "Tardo pomeriggio e mattina presto"
          ],
          [
            "Affollamento",
            "Si arriva insieme ai pullman dei tour",
            "Tramonto e mattina con molta meno gente"
          ],
          [
            "Adatto a",
            "Chi ha poco tempo",
            "Famiglie, fotografi e chiunque voglia fare il bagno"
          ]
        ]
      },
      {
        "type": "p",
        "text": "La maggior parte dei tour di gruppo arriva verso mezzogiorno, quando le terrazze sono più affollate e, d'estate, la superficie bianca è abbagliante e rovente. Pernottare a Pamukkale o nel villaggio termale di Karahayıt permette di vedere le travertine al tramonto e poi di nuovo nella quiete del mattino."
      },
      {
        "type": "h2",
        "text": "Il periodo migliore per Pamukkale"
      },
      {
        "type": "p",
        "text": "Primavera e autunno sono le stagioni più piacevoli: temperature miti per girare Hierapolis e acqua gradevole sulle terrazze. D'inverno fa fresco e a volte gela, ma l'acqua calda fuma nell'aria fredda e il sito è al suo momento più tranquillo. A luglio e agosto il caldo di mezzogiorno e il riverbero sulle terrazze bianche possono essere intensi: meglio andare al mattino presto o nel tardo pomeriggio."
      },
      {
        "type": "h2",
        "text": "Lungo la strada: il lago Salda e il Tauro"
      },
      {
        "type": "p",
        "text": "La strada sale dalla costa, valica i monti del Tauro e attraversa la regione dei laghi. Il lago Salda, con le sue rive bianche e l'acqua turchese, richiede solo una breve deviazione ed è una sosta fotografica molto amata. Con un veicolo privato decidete voi dove fermarvi e per quanto tempo, cosa che un tour in pullman non può offrire."
      },
      {
        "type": "h2",
        "text": "Transfer privato per Pamukkale"
      },
      {
        "type": "p",
        "text": "Effettuiamo transfer privati per Pamukkale dall'aeroporto di Antalya e dagli hotel della costa, solo andata o con ritorno in una data successiva. Il prezzo è fisso per veicolo, quindi per una famiglia o un piccolo gruppo è spesso paragonabile a diversi biglietti di un tour in pullman, senza i giri di raccolta negli hotel, gli orari rigidi e le soste per lo shopping."
      }
    ],
    "faq": [
      [
        "Quanto dista Pamukkale da Antalya?",
        "Circa 245 km di strada. Il viaggio dura in genere da tre a tre ore e mezza per tratta."
      ],
      [
        "Si può visitare Pamukkale in giornata da Antalya?",
        "Sì, ma significa 6-7 ore di strada in un solo giorno. Un pernottamento a Pamukkale o a Karahayıt rende la visita più rilassata e permette di vedere le terrazze senza la folla."
      ],
      [
        "Si può fare il bagno a Pamukkale?",
        "Si può camminare a piedi nudi nelle vasche poco profonde delle travertine. Nuotare è possibile nella Piscina Antica, con acqua termale calda e biglietto a parte."
      ],
      [
        "Qual è il periodo migliore per visitare Pamukkale?",
        "Primavera e autunno sono i più piacevoli. L'inverno è tranquillo e suggestivo; d'estate è meglio andare al mattino presto o nel tardo pomeriggio."
      ]
    ]
  },
  "demre-myra-st-nicholas": {
    "slug": "demre-myra-chiesa-san-nicola",
    "title": "Demre e Myra: visitare la chiesa di San Nicola da Antalya",
    "heading": "Demre, Myra e la chiesa di San Nicola",
    "description": "Escursione da Antalya a Demre, l'antica Myra: la chiesa di San Nicola, le tombe rupestri licie, Andriake e Kekova, con tempi di viaggio e consigli per l'inverno o per Natale.",
    "excerpt": "La città del vero Babbo Natale è a due ore e mezza da Antalya. Cosa vedere a Demre e Myra, e come trasformarla in una giornata lungo la costa.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Molto prima di diventare Babbo Natale, San Nicola fu vescovo di Myra, una città licia sulla costa a ovest di Antalya. Oggi la cittadina si chiama Demre, e la chiesa di San Nicola dove esercitò il suo ministero, le tombe rupestri licie e l'antico porto ne fanno una delle escursioni più appaganti da Antalya, soprattutto a dicembre."
      },
      {
        "type": "h2",
        "text": "Chi era San Nicola di Myra?"
      },
      {
        "type": "p",
        "text": "Nicola visse nel IV secolo e divenne famoso per i suoi gesti di generosità compiuti in segreto, soprattutto verso i bambini e i poveri. La sua festa, il 6 dicembre, si celebra ancora in tutta Europa, e le leggende nate attorno a lui si sono trasformate nei secoli nella figura di Babbo Natale. Myra, dove fu vescovo, divenne un importante luogo di pellegrinaggio."
      },
      {
        "type": "h2",
        "text": "Cosa vedere a Demre"
      },
      {
        "type": "ul",
        "items": [
          "Chiesa di San Nicola: una chiesa bizantina con affreschi, pavimenti a mosaico e il sarcofago che la tradizione associa al santo.",
          "Tombe rupestri di Myra: tombe licie a forma di casa scavate nella parete rocciosa sopra un grande teatro romano.",
          "Andriake: l'antico porto di Myra, con un granaio restaurato che ospita il Museo delle Civiltà Licie.",
          "Kekova: le barche che partono dalla vicina Üçağız passano accanto alla città antica in parte sommersa e al borgo-castello di Kaleköy (d'inverno le partenze sono meno frequenti)."
        ]
      },
      {
        "type": "h2",
        "text": "Come arrivare: la strada costiera verso ovest"
      },
      {
        "type": "p",
        "text": "Demre si trova a circa due ore e mezza da Antalya lungo una delle strade costiere più belle del paese, passando per Kemer, le montagne attorno a Olympos, Kumluca e Finike. La strada è buona tutto l'anno, ma è tortuosa tra le montagne: calcolate il tempo per le soste e non affrontatela di corsa."
      },
      {
        "type": "h2",
        "text": "Una giornata lungo la costa"
      },
      {
        "type": "ul",
        "items": [
          "Mattina: partenza presto da Antalya e sosta panoramica sulla costa vicino a Olympos.",
          "Tarda mattinata: la chiesa di San Nicola prima dell'arrivo dei gruppi.",
          "Mezzogiorno: le tombe rupestri e il teatro di Myra, poi pranzo a Demre o ad Andriake.",
          "Pomeriggio: gita in barca a Kekova in stagione, oppure proseguire fino a Kaş e fermarsi per la notte.",
          "Sera: rientro ad Antalya, oppure abbinare la gita a qualche giorno a Kaş."
        ]
      },
      {
        "type": "h2",
        "text": "Visitare Demre d'inverno e a Natale"
      },
      {
        "type": "p",
        "text": "Dicembre è un periodo particolarmente suggestivo: il 6 dicembre è il giorno di San Nicola e, nel periodo natalizio, molti visitatori abbinano un soggiorno ad Antalya a una gita nella città del santo. Le giornate invernali sono miti ma corte, quindi partite presto. I siti sono aperti tutto l'anno, mentre le gite in barca a Kekova dipendono dal meteo e dalla stagione."
      },
      {
        "type": "h2",
        "text": "Transfer privato per Demre"
      },
      {
        "type": "p",
        "text": "Effettuiamo transfer privati da Antalya e dalle località balneari della costa occidentale verso Kumluca, Demre e Kaş. Con un veicolo privato scegliete voi le soste e il ritmo, e il prezzo è fisso per veicolo, non a persona. Al momento della prenotazione indicateci l'hotel, la data e se desiderate il ritorno in giornata."
      }
    ],
    "faq": [
      [
        "Quanto dista Demre da Antalya?",
        "Demre, l'antica Myra, si trova a circa due ore e mezza di strada da Antalya lungo la costiera che passa per Kemer, Kumluca e Finike."
      ],
      [
        "La chiesa di San Nicola è aperta tutto l'anno?",
        "Sì. La chiesa di San Nicola e il sito antico di Myra sono aperti ai visitatori tutto l'anno."
      ],
      [
        "Quando si festeggia San Nicola?",
        "La festa di San Nicola è il 6 dicembre. Dicembre, periodo natalizio compreso, è un momento molto richiesto per visitare Demre."
      ],
      [
        "Si possono visitare Demre e Kekova in un solo giorno?",
        "Sì, nella stagione delle barche è possibile partendo presto. D'inverno le barche sono meno frequenti, quindi verificate sul posto il meteo e gli orari."
      ]
    ]
  },
  "lycian-way-spring-hiking": {
    "slug": "trekking-via-licia-antalya",
    "title": "Trekking sulla Via Licia vicino ad Antalya: guida di primavera alle tappe migliori",
    "heading": "Trekking sulla Via Licia partendo da Antalya",
    "description": "Trekking sulla Via Licia vicino ad Antalya: il periodo migliore, le tappe attorno a Kemer, Olympos, Adrasan e Kaş, cosa mettere nello zaino e come raggiungere l'inizio del percorso.",
    "excerpt": "Rovine antiche, pinete e panorami sul mare lungo uno dei grandi sentieri a lunga percorrenza del mondo. Quali tappe percorrere da Antalya e quando andare.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "La Via Licia è un sentiero segnalato a lunga percorrenza di oltre 500 km tra Fethiye e Antalya, che segue antichi sentieri, mulattiere e strade romane lungo la costa e tra le montagne dell'antica Licia. Per un trekking sulla Via Licia non servono settimane: molte delle tappe più belle sono facilmente raggiungibili da Antalya e sono perfette per escursioni in giornata o brevi vacanze a piedi."
      },
      {
        "type": "h2",
        "text": "Quando camminare: primavera e autunno"
      },
      {
        "type": "table",
        "head": [
          "Stagione",
          "Condizioni",
          "Giudizio"
        ],
        "rows": [
          [
            "Marzo - maggio",
            "Giornate miti, colline verdi, fiori selvatici, sorgenti piene d'acqua",
            "La stagione migliore"
          ],
          [
            "Giugno - agosto",
            "Molto caldo, poca ombra su molte tappe, sorgenti secche",
            "Solo al mattino presto o per brevi camminate"
          ],
          [
            "Settembre - novembre",
            "Mare caldo, tempo stabile, più fresco da fine ottobre",
            "La seconda stagione migliore"
          ],
          [
            "Dicembre - febbraio",
            "Mite sulla costa, periodi di pioggia, neve sui passi alti",
            "Possibile sulle tappe costiere basse"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Le tappe vicino ad Antalya"
      },
      {
        "type": "ul",
        "items": [
          "Göynük - zona di Kemer: sentieri nel bosco e viste sul canyon, a due passi dai resort di Kemer.",
          "Çıralı e Olympos: una tappa costiera tra le rovine di Olympos e le fiamme eterne della Chimera.",
          "Adrasan - Olympos: uno dei tratti più spettacolari, con scogliere, calette e ampi panorami sul mare.",
          "Dintorni di Kaş: sentieri costieri con tombe licie, piccole baie e l'isola greca di Meis al largo.",
          "Phaselis: passeggiate più brevi attorno alla città antica e ai suoi tre porti, ideali per un primo assaggio."
        ]
      },
      {
        "type": "h2",
        "text": "Come organizzare la camminata"
      },
      {
        "type": "p",
        "text": "Il sentiero è segnato in bianco e rosso, ma alcuni tratti sono impervi, sassosi e ripidi, e la segnaletica può essere discontinua. Usate una buona carta o una traccia GPS, camminate in coppia quando possibile e comunicate a qualcuno il vostro itinerario. Su molte tappe non ci sono negozi né acqua tra un villaggio e l'altro: partite presto e portate più acqua di quanta pensiate di averne bisogno."
      },
      {
        "type": "h2",
        "text": "Cosa mettere nello zaino"
      },
      {
        "type": "ul",
        "items": [
          "Scarponi da trekking o scarpe da trail robuste: in alcuni punti il calcare è tagliente e instabile.",
          "Almeno due litri d'acqua a persona, più qualche snack.",
          "Cappello, crema solare e uno strato leggero a maniche lunghe, anche in primavera.",
          "Una giacca antivento o antipioggia per i tratti di montagna e il meteo variabile della primavera.",
          "Un piccolo kit di pronto soccorso e il telefono carico con una mappa offline."
        ]
      },
      {
        "type": "h2",
        "text": "Come raggiungere il sentiero e rientrare"
      },
      {
        "type": "p",
        "text": "La maggior parte delle tappe inizia e finisce in villaggi difficili da raggiungere con i mezzi pubblici, e una camminata di sola andata vi fa arrivare in un posto diverso da quello di partenza. Un transfer privato vi porta dall'aeroporto di Antalya o dal vostro hotel all'inizio della tappa e può venirvi a prendere alla fine. Il prezzo è fisso per veicolo, quindi è una soluzione comoda per i gruppi di escursionisti; indicateci punto di partenza e di arrivo, data e numero di persone e vi comunicheremo il prezzo in anticipo."
      }
    ],
    "faq": [
      [
        "Quanto è lunga la Via Licia?",
        "Il sentiero segnalato si snoda per oltre 500 km tra Fethiye e Antalya. La maggior parte dei visitatori percorre alcune tappe scelte anziché l'intero itinerario."
      ],
      [
        "Qual è il periodo migliore per fare trekking sulla Via Licia?",
        "La primavera, da marzo a maggio, è la stagione migliore, seguita dall'autunno, da settembre a novembre. L'estate è molto calda e molte sorgenti si seccano."
      ],
      [
        "Quali tappe della Via Licia sono più vicine ad Antalya?",
        "I tratti attorno a Göynük e Kemer, Çıralı e Olympos, Adrasan e Phaselis si trovano tutti a circa una o due ore da Antalya. Le tappe attorno a Kaş sono più a ovest."
      ],
      [
        "Si può organizzare un transfer fino all'inizio di una tappa della Via Licia?",
        "Sì. Inviateci punto di partenza e di arrivo e la data, e vi proporremo un transfer privato a prezzo fisso per veicolo, compreso il recupero alla fine della camminata."
      ]
    ]
  },
  "koprulu-canyon-rafting": {
    "slug": "rafting-canyon-di-koprulu-da-antalya",
    "title": "Rafting nel Canyon di Köprülü: guida pratica da Antalya e Side",
    "heading": "Rafting nel Canyon di Köprülü",
    "description": "Rafting nel Canyon di Köprülü vicino ad Antalya: stagione, com'è il fiume, a chi è adatto, cosa portare e quanto dista da Side, Belek, Alanya e Antalya.",
    "excerpt": "Acqua verde e fredda, un ponte romano e un canyon coperto di pini. Cosa aspettarsi da una giornata di rafting a Köprülü e come organizzarla dalla costa.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Il Canyon di Köprülü è un parco nazionale sui monti del Tauro, a nord di Side e Manavgat, e il fiume che lo attraversa offre l'escursione di rafting più famosa della zona. È un'avventura alla portata di tutti più che estrema: la maggior parte delle rapide è facile, il paesaggio è spettacolare, e principianti e famiglie partecipano ogni giorno della stagione."
      },
      {
        "type": "h2",
        "text": "Com'è la discesa in rafting"
      },
      {
        "type": "p",
        "text": "La maggior parte delle escursioni percorre un tratto di circa una dozzina di chilometri del fiume Köprüçay e prevede da due a tre ore in acqua, con soste per nuotare, tuffarsi dagli scogli o semplicemente lasciarsi galleggiare. Le rapide sono per lo più da facili a moderate, l'acqua è limpida e verde, ed è fredda tutto l'anno perché il fiume è alimentato da sorgenti di montagna. Le guide tengono un briefing sulla sicurezza e forniscono caschi e giubbotti di salvataggio."
      },
      {
        "type": "h2",
        "text": "Quando andare"
      },
      {
        "type": "table",
        "head": [
          "Periodo",
          "Fiume e clima",
          "Ideale per"
        ],
        "rows": [
          [
            "Aprile - maggio",
            "Più acqua per lo scioglimento delle nevi, rapide più vivaci, aria mite",
            "Gruppi sportivi, meno folla"
          ],
          [
            "Giugno - agosto",
            "Aria calda, acqua fredda, i mesi più affollati",
            "Rinfrescarsi in una giornata calda"
          ],
          [
            "Settembre - ottobre",
            "Acqua più calma, giornate calde, meno gente",
            "Famiglie e principianti"
          ]
        ]
      },
      {
        "type": "p",
        "text": "La stagione va di solito all'incirca da aprile a ottobre, a seconda del fiume e degli operatori. Fuori da questo periodo le escursioni sono rare o non vengono proposte affatto."
      },
      {
        "type": "h2",
        "text": "A chi è adatto il rafting a Köprülü"
      },
      {
        "type": "ul",
        "items": [
          "Principianti: non serve esperienza e la guida manovra il gommone.",
          "Famiglie: gli operatori fissano un'età minima per i bambini, quindi verificatela al momento della prenotazione.",
          "Gruppi di amici e colleghi: di solito un gommone è condiviso da sei a otto persone.",
          "Poco adatto a chi non sa nuotare e si agita in acqua, e in gravidanza."
        ]
      },
      {
        "type": "h2",
        "text": "Cosa portare"
      },
      {
        "type": "ul",
        "items": [
          "Costume da bagno indossato sotto i vestiti e un asciugamano.",
          "Scarpe che possano bagnarsi e restino ben salde al piede - niente infradito.",
          "Crema solare e un cambio di vestiti asciutti per il ritorno.",
          "Una busta o custodia impermeabile per il telefono; lasciate gli oggetti di valore in hotel."
        ]
      },
      {
        "type": "h2",
        "text": "Non solo rafting: il parco nazionale"
      },
      {
        "type": "p",
        "text": "Il canyon è attraversato dal ponte di Oluk, un ponte romano a una sola arcata che dà il nome alla zona: köprü in turco significa «ponte». Più in alto sulla montagna si trovano le rovine dell'antica città di Selge, tra formazioni rocciose e villaggi. Con un veicolo proprio potete abbinare il rafting a una sosta al ponte e a una salita in auto verso Selge."
      },
      {
        "type": "h2",
        "text": "Come arrivare dalla costa"
      },
      {
        "type": "p",
        "text": "Molte agenzie di rafting vendono escursioni con prelievo condiviso dagli hotel, il che può significare una lunga mattinata passata a raccogliere altri ospiti. Un veicolo privato da Side, Manavgat, Belek, Alanya o Antalya parte quando volete voi e vi permette di fermarvi al ponte o in montagna lungo il percorso. Il canyon dista circa un'ora da Side e Manavgat, di più da Antalya e Alanya; inviateci il vostro hotel e la data e vi indicheremo un prezzo fisso per veicolo."
      }
    ],
    "faq": [
      [
        "Il rafting nel Canyon di Köprülü è adatto ai principianti?",
        "Sì. Le rapide sono per lo più da facili a moderate, non serve esperienza e una guida manovra ogni gommone dopo un briefing sulla sicurezza."
      ],
      [
        "Quando è la stagione del rafting nel Canyon di Köprülü?",
        "Di solito all'incirca da aprile a ottobre. In primavera l'acqua è più vivace per lo scioglimento delle nevi; settembre e ottobre sono più calmi e tranquilli."
      ],
      [
        "Quanto è fredda l'acqua?",
        "Fredda tutto l'anno, perché il fiume è alimentato da sorgenti di montagna. In una calda giornata d'estate è proprio questo il bello."
      ],
      [
        "Quanto dista il Canyon di Köprülü da Side?",
        "Circa un'ora di strada da Side e Manavgat, e di più da Antalya, Belek o Alanya a seconda del vostro hotel."
      ]
    ]
  },
  "kas-kalkan-autumn": {
    "slug": "kas-e-kalkan-in-autunno",
    "title": "Kaş e Kalkan in autunno: immersioni, spiagge e calette tranquille",
    "heading": "Kaş e Kalkan in autunno",
    "description": "Perché Kaş e Kalkan danno il meglio in autunno: mare caldo, immersioni, le spiagge di Kaputaş e Patara, Kekova in kayak e in barca, e come arrivare dall'aeroporto di Antalya.",
    "excerpt": "Il mare più caldo dell'anno, spiagge vuote e due piccoli paesi di porto ai piedi delle montagne. Perché l'estremo ovest della costa di Antalya dà il meglio a ottobre.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Kaş e Kalkan si trovano all'estremità occidentale, la più selvaggia, della costa di Antalya, dove le montagne scendono a picco sul mare. Nessuna delle due ha grandi resort; entrambe hanno piccoli porti, vicoli imbiancati a calce e alcune delle acque più limpide del Mediterraneo. In autunno, quando i turisti estivi sono partiti e il mare è ancora caldo, Kaş e Kalkan danno il meglio di sé."
      },
      {
        "type": "h2",
        "text": "Perché qui la stagione giusta è l'autunno"
      },
      {
        "type": "ul",
        "items": [
          "Il mare resta caldo fino a ottobre, spesso più caldo che a giugno.",
          "La visibilità sott'acqua è eccellente - un'ottima notizia per sub e appassionati di snorkeling.",
          "Camminare e fare trekking torna piacevole dopo il caldo estivo.",
          "Ristoranti e gite in barca sono ancora attivi, ma senza la folla dell'estate."
        ]
      },
      {
        "type": "h2",
        "text": "Kaş: immersioni, kayak e il porto"
      },
      {
        "type": "p",
        "text": "Kaş è uno dei centri di immersione più noti della Türkiye, con siti per principianti e sub esperti, tra cui relitti, pareti e grotte sottomarine. Il kayak in mare sopra le rovine sommerse di Kekova è uno dei momenti più belli, e il porto, il teatro antico affacciato sul mare e le tombe licie in paese rendono le serate piacevoli. Nelle giornate limpide si vede, appena al largo, l'isola greca di Meis."
      },
      {
        "type": "h2",
        "text": "Kalkan: terrazze e serate tranquille"
      },
      {
        "type": "p",
        "text": "Kalkan, a circa mezz'ora a ovest di Kaş, è più piccola e tranquilla, costruita su una collina attorno a un porticciolo. È nota per le sue ville con terrazze vista mare e per i ristoranti sui tetti. È adatta a coppie e famiglie che cercano una base tranquilla e buona cucina più che la vita notturna."
      },
      {
        "type": "h2",
        "text": "Spiagge tra i due paesi e oltre"
      },
      {
        "type": "ul",
        "items": [
          "Kaputaş: una piccola caletta turchese ai piedi di una gola, tra Kaş e Kalkan.",
          "Patara: una delle spiagge sabbiose più lunghe della Türkiye, accanto alle rovine dell'antica Patara e a un'area protetta.",
          "La penisola di Kaş e le piattaforme per fare il bagno in paese: coste rocciose e scalette che scendono direttamente in acque profonde e limpide.",
          "Kekova e Üçağız: gite in barca verso baie riparate e il villaggio-castello di Kaleköy."
        ]
      },
      {
        "type": "h2",
        "text": "Cosa cambia a novembre"
      },
      {
        "type": "p",
        "text": "Da novembre la stagione volge al termine: alcuni hotel, ristoranti e gite in barca chiudono, arrivano le prime piogge e le serate si fanno fresche. Kaş resta vivace tutto l'anno perché molte persone ci vivono stabilmente, mentre Kalkan diventa molto tranquilla. Controllate le date di apertura se viaggiate a fine stagione."
      },
      {
        "type": "h2",
        "text": "Come arrivare dall'aeroporto di Antalya"
      },
      {
        "type": "p",
        "text": "Kaş dista circa 185 km dall'aeroporto di Antalya, cioè da due ore e mezza a tre ore lungo la strada costiera passando per Kemer, Kumluca e Demre, e Kalkan si trova circa mezz'ora più avanti. Alcuni viaggiatori atterrano invece a Dalaman, a seconda dei voli. Offriamo transfer privati da entrambi gli aeroporti a prezzo fisso per veicolo, con soste per le foto lungo una delle strade più panoramiche del Paese."
      }
    ],
    "faq": [
      [
        "Il mare a Kaş è caldo a ottobre?",
        "Sì. Il mare di solito resta caldo fino a ottobre inoltrato, spesso più che a inizio estate, e la visibilità per immersioni e snorkeling è eccellente."
      ],
      [
        "Quanto dista Kaş dall'aeroporto di Antalya?",
        "Circa 185 km, da due ore e mezza a tre ore di strada. Kalkan si trova circa mezz'ora più a ovest."
      ],
      [
        "Kaş o Kalkan: quale scegliere?",
        "Kaş è più vivace, con immersioni, kayak e una vita di paese tutto l'anno. Kalkan è più piccola e tranquilla, con ville e ristoranti vista mare."
      ],
      [
        "Kaş e Kalkan sono aperte a novembre?",
        "Kaş resta attiva tutto l'anno. A Kalkan, e in alcuni hotel e attività di gite in barca, la stagione finisce a fine ottobre o a novembre, quindi controllate le date di apertura."
      ]
    ]
  },
  "medical-travel-antalya-winter": {
    "slug": "turismo-medico-e-dentale-ad-antalya-in-inverno",
    "title": "Turismo medico ad Antalya in inverno: cosa sapere prima di partire",
    "heading": "Turismo medico e dentale ad Antalya in inverno",
    "description": "Cure dentali, trapianto di capelli o chirurgia estetica ad Antalya in inverno: perché la bassa stagione, come verificare una clinica, giorni di recupero e transfer dall'aeroporto.",
    "excerpt": "Clima più fresco, hotel più tranquilli e appuntamenti più facili. Cosa verificare e pianificare prima di prenotare un viaggio ad Antalya in inverno per un trattamento.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Antalya è diventata, insieme a Istanbul, uno dei centri del turismo medico e dentale della Türkiye. Un numero crescente di visitatori programma cure dentali, un trapianto di capelli o un intervento estetico nei mesi invernali, quando la costa è tranquilla e il clima è mite. Questa guida riguarda gli aspetti pratici di un viaggio di questo tipo: non è un consiglio medico, e ogni decisione clinica spetta a un medico qualificato."
      },
      {
        "type": "h2",
        "text": "Perché molti viaggiatori scelgono l'inverno"
      },
      {
        "type": "ul",
        "items": [
          "Clima mite e più fresco: molti pazienti trovano il recupero più confortevole lontano dal caldo e dal sole forte dell'estate.",
          "Hotel e appartamenti sono più tranquilli e spesso più economici che in estate.",
          "Fissare gli appuntamenti può essere più facile fuori dai mesi di alta stagione.",
          "Il viaggio si può abbinare alla città, ai musei e a passeggiate tranquille invece che a giornate in spiaggia."
        ]
      },
      {
        "type": "h2",
        "text": "Scegliere e verificare una struttura"
      },
      {
        "type": "p",
        "text": "La decisione più importante riguarda la struttura, non il prezzo. Verificate che la clinica o l'ospedale sia autorizzato dal Ministero della Salute turco, informatevi su chi sarà il medico curante e quali qualifiche abbia, e chiedete un piano scritto che indichi cosa è incluso, cosa no e come vengono gestiti complicazioni e follow-up. Diffidate delle offerte che promettono un risultato finale o un prezzo fisso prima di qualsiasi visita."
      },
      {
        "type": "h2",
        "text": "Pianificare le giornate"
      },
      {
        "type": "table",
        "head": [
          "Tipo di trattamento",
          "Aspetto tipico da pianificare",
          "Da chiedere alla struttura"
        ],
        "rows": [
          [
            "Cure dentali",
            "Spesso più di una visita, a volte a distanza di settimane o mesi",
            "Quanti viaggi e quanti giorni ciascuno?"
          ],
          [
            "Trapianto di capelli",
            "Soggiorno breve, con istruzioni di cura per i primi giorni",
            "Quando si può volare, lavare i capelli e indossare un cappello?"
          ],
          [
            "Chirurgia estetica",
            "Soggiorno più lungo e giorni di recupero prima del volo di ritorno",
            "Quante notti prima di poter prendere l'aereo?"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Inserite giorni di riposo nel programma, evitate di fissare un trattamento il giorno dell'arrivo e seguite le indicazioni del medico su quando sia sicuro volare. Per gli interventi chirurgici è spesso consigliato viaggiare con un accompagnatore."
      },
      {
        "type": "h2",
        "text": "Assicurazione, documenti e follow-up"
      },
      {
        "type": "ul",
        "items": [
          "Verificate se la vostra assicurazione di viaggio copre un trattamento programmato all'estero - molte polizze non lo fanno.",
          "Conservate copie di tutti i referti medici, delle prescrizioni e del piano di trattamento.",
          "Chiedete come funziona il follow-up una volta a casa e se il vostro medico di fiducia può essere coinvolto.",
          "Condividete le informazioni mediche solo con la struttura, tramite il canale che vi indica."
        ]
      },
      {
        "type": "h2",
        "text": "Dall'aeroporto all'hotel o alla clinica"
      },
      {
        "type": "p",
        "text": "Dopo un volo, prima o dopo un trattamento, l'ultima cosa che desiderate è una coda alla stazione dei taxi o una navetta condivisa che si ferma in una dozzina di hotel. Un transfer privato vi porta direttamente dall'aeroporto di Antalya al vostro hotel o alla clinica, con l'autista che monitora il vostro volo e vi aiuta con i bagagli. I viaggi di ritorno possono essere organizzati in base agli appuntamenti e al volo di rientro. Il prezzo è fisso per veicolo, quindi un accompagnatore viaggia senza costi aggiuntivi."
      }
    ],
    "faq": [
      [
        "Perché andare ad Antalya in inverno per un trattamento?",
        "Molti viaggiatori preferiscono il clima più mite per il recupero, hotel più tranquilli e appuntamenti più facili da fissare fuori dalla stagione delle vacanze estive."
      ],
      [
        "Come verifico una clinica ad Antalya?",
        "Verificate che sia autorizzata dal Ministero della Salute turco, informatevi su chi sia il medico curante e chiedete un piano scritto che indichi cosa è incluso ed escluso, le complicazioni e il follow-up."
      ],
      [
        "Quanto devo restare dopo un intervento?",
        "Dipende interamente dal trattamento e dalle indicazioni del medico. Chiedete alla struttura quante notti servono prima del volo di ritorno e prevedete giorni di riposo."
      ],
      [
        "Potete portarmi dall'aeroporto alla mia clinica?",
        "Sì. Offriamo transfer privati dall'aeroporto di Antalya verso hotel e cliniche, e ritorno, a prezzo fisso per veicolo."
      ]
    ]
  },
  "side-ancient-city-guide": {
    "slug": "side-citta-antica-guida-alla-visita",
    "title": "Side città antica: guida al Tempio di Apollo, al teatro e al centro storico",
    "heading": "Side: guida alla città antica",
    "description": "Visitare la città antica di Side: Tempio di Apollo, grande teatro, museo, mura e centro storico, quando andare ed escursioni ad Aspendos e alla cascata di Manavgat.",
    "excerpt": "Un teatro romano, le colonne di un tempio in riva al mare e un paese di porto costruito dentro le mura antiche. Come vedere Side al meglio - fuori stagione.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Side è uno dei pochi luoghi della Riviera turca dove una città moderna vive dentro una città antica. Il centro storico occupa una piccola penisola circondata da rovine romane ed ellenistiche: si passa accanto alle colonne per raggiungere un ristorante, e il tramonto si ammira incorniciato da un tempio. La città antica di Side dà il meglio fuori dall'estate, quando è abbastanza tranquilla da far sentire la storia."
      },
      {
        "type": "h2",
        "text": "Cosa vedere"
      },
      {
        "type": "ul",
        "items": [
          "Tempio di Apollo: le colonne si ergono sulla punta della penisola, proprio sul mare - il luogo classico per il tramonto.",
          "Il grande teatro: uno dei più grandi teatri antichi della regione, costruito sul pendio all'ingresso del centro storico.",
          "Museo di Side: ospitato in un bagno romano restaurato, con statue e rilievi ritrovati in città.",
          "La via colonnata e l'agorà: l'antico asse principale che porta dalla porta della città verso il porto.",
          "Le mura e la porta monumentale: l'ingresso usato dai visitatori da duemila anni."
        ]
      },
      {
        "type": "h2",
        "text": "Il centro storico oggi"
      },
      {
        "type": "p",
        "text": "Dentro le mura, vicoli pieni di ristoranti, caffè e piccoli negozi scendono fino al porto, da cui partono le barche per le gite lungo la costa. Le auto non possono entrare nella maggior parte del centro storico, quindi è piacevole esplorarlo a piedi. Ampie spiagge sabbiose si estendono a est e a ovest della penisola."
      },
      {
        "type": "h2",
        "text": "Quando visitarla"
      },
      {
        "type": "p",
        "text": "Primavera e autunno sono ideali: abbastanza caldi per la spiaggia, abbastanza freschi per girare tra le rovine a metà giornata. In inverno molti hotel stagionali chiudono, ma il centro storico, le rovine e il museo restano aperti, e nelle giornate di sole il tempio e il porto sono quasi deserti. A luglio e agosto visitate le rovine al mattino presto o al tramonto."
      },
      {
        "type": "h2",
        "text": "Escursioni da Side"
      },
      {
        "type": "table",
        "head": [
          "Destinazione",
          "Perché andarci",
          "Tempo indicativo da Side"
        ],
        "rows": [
          [
            "Aspendos",
            "Uno dei teatri romani meglio conservati al mondo",
            "circa 40 minuti"
          ],
          [
            "Cascata di Manavgat",
            "Una cascata ampia e bassa in un parco verde",
            "circa 15 minuti"
          ],
          [
            "Perge",
            "Una grande città antica con stadio e vie colonnate",
            "circa 1 ora"
          ],
          [
            "Canyon di Köprülü",
            "Rafting e un ponte romano in un parco nazionale",
            "circa 1 ora"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Come arrivare a Side dall'aeroporto di Antalya"
      },
      {
        "type": "p",
        "text": "Side dista circa 65 km dall'aeroporto di Antalya, cioè da 55 a 65 minuti di strada. Un transfer privato vi porta direttamente al vostro hotel o al limite del centro storico pedonale, a un prezzo fisso per veicolo che non cambia con la stagione né con l'orario del volo. Lo stesso veicolo si può prenotare per escursioni ad Aspendos, a Perge o al canyon."
      }
    ],
    "faq": [
      [
        "Cosa vedere nella città antica di Side?",
        "Il Tempio di Apollo sul mare, il grande teatro, il museo in un bagno romano, la via colonnata, l'agorà e le mura - tutto a pochi passi dal centro storico."
      ],
      [
        "Vale la pena visitare Side in inverno?",
        "Sì, per le rovine e il centro storico. Molti hotel stagionali chiudono, ma i siti restano aperti e sono molto più tranquilli che in estate."
      ],
      [
        "Quanto dista Side dall'aeroporto di Antalya?",
        "Circa 65 km, da 55 a 65 minuti di strada."
      ],
      [
        "Si può visitare Aspendos da Side?",
        "Sì. Aspendos dista circa 40 minuti da Side in auto ed è una facile gita di mezza giornata, spesso abbinata a Perge o alla cascata di Manavgat."
      ]
    ]
  },
  "alanya-in-winter": {
    "slug": "alanya-in-inverno",
    "title": "Alanya in inverno: meteo, cosa fare e gite di un giorno",
    "heading": "Alanya in inverno",
    "description": "Alanya da novembre a marzo: meteo e temperatura del mare in inverno, castello e funivia, grotte di Damlataş e Dim, passeggiate, mercati e come arrivare dall'aeroporto di Antalya.",
    "excerpt": "Giornate miti, la collina del castello quasi deserta e una città che continua a vivere quando la folla estiva se ne va. Com'è davvero Alanya tra novembre e marzo.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Alanya è uno dei pochi luoghi della costa turca che d'inverno non si spegne. Decine di migliaia di residenti vivono qui tutto l'anno, molti dei quali provenienti da Scandinavia, Germania, Paesi Bassi e Russia, quindi negozi, caffè, mercati e ristoranti restano aperti. Per una breve fuga invernale offre qualcosa di raro in Europa: sole, un lungomare da percorrere a piedi e un castello medievale che domina la città, con molta meno gente che in estate."
      },
      {
        "type": "h2",
        "text": "Il meteo ad Alanya in inverno"
      },
      {
        "type": "table",
        "head": [
          "Mese",
          "Di giorno",
          "Di notte",
          "Mare"
        ],
        "rows": [
          [
            "Novembre",
            "20-22 °C",
            "11-13 °C",
            "circa 21 °C"
          ],
          [
            "Dicembre",
            "17-19 °C",
            "8-10 °C",
            "circa 19 °C"
          ],
          [
            "Gennaio",
            "16-17 °C",
            "7-9 °C",
            "circa 17 °C"
          ],
          [
            "Febbraio",
            "16-18 °C",
            "7-9 °C",
            "circa 17 °C"
          ],
          [
            "Marzo",
            "18-20 °C",
            "9-11 °C",
            "circa 17 °C"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Sono medie indicative. L'inverno porta pioggia a ondate: spesso uno o due giorni di forti rovesci seguiti da giornate limpide e soleggiate. Alanya è riparata dai monti del Tauro, che la rendono un po' più mite di gran parte della costa. Le serate sono fresche, e le case e alcune camere d'albergo risultano fredde, quindi mettete in valigia uno strato caldo."
      },
      {
        "type": "h2",
        "text": "Il castello, la funivia e la Torre Rossa"
      },
      {
        "type": "p",
        "text": "Il castello di Alanya corona il promontorio roccioso sopra la città, con mura, cisterne, una chiesa bizantina e viste sulla costa in entrambe le direzioni. D'estate la salita è faticosa; d'inverno è una piacevole passeggiata. Se preferite, la funivia dalla spiaggia di Damlataş vi porta in cima in pochi minuti. Giù al porto, la Torre Rossa (Kızıl Kule) del XIII secolo e l'antico cantiere navale distano pochi passi l'una dall'altro."
      },
      {
        "type": "h2",
        "text": "Grotte, fiumi e passeggiate"
      },
      {
        "type": "ul",
        "items": [
          "Grotta di Damlataş: una piccola grotta di stalattiti in fondo alla spiaggia di Damlataş, nota per la sua aria umida e costante.",
          "Grotta di Dim: una grotta più grande sulle colline a est della città, con una passerella e un piccolo lago all'interno.",
          "Fiume Dim (Dim Çayı): ristoranti lungo il fiume con piattaforme sull'acqua, più tranquilli in inverno, alcuni aperti tutto l'anno.",
          "Il lungomare: chilometri di percorso pianeggiante a piedi o in bicicletta lungo le spiagge di Keykubat e Cleopatra.",
          "Piantagioni di banane e villaggi sui pendii alle spalle della città, dove la frutta tropicale cresce grazie all'inverno mite."
        ]
      },
      {
        "type": "h2",
        "text": "Bagni, mercati e vita quotidiana"
      },
      {
        "type": "p",
        "text": "Nelle giornate di sole a novembre, e persino in inverno, si vede gente che fa il bagno dalla spiaggia di Cleopatra: il mare è più fresco di quanto faccia pensare l'aria, ma molti visitatori del nord lo trovano piacevole. I mercati settimanali vendono agrumi, melograni, olive e verdure, e il centro è animato più dai residenti che dai gruppi turistici. Molti hotel offrono tariffe invernali per soggiorni lunghi, e diversi resort sul mare restano aperti con piscina coperta."
      },
      {
        "type": "h2",
        "text": "Escursioni da Alanya in inverno"
      },
      {
        "type": "p",
        "text": "Side e la cascata di Manavgat sono a circa un'ora verso ovest; Aspendos e Perge sono una gita più lunga ma facile. Nell'entroterra, i villaggi dei monti del Tauro vedono la neve nelle settimane più fredde mentre la costa resta verde. Se vi fermate per settimane anziché giorni, la nostra guida dedicata allo svernare sulla costa di Antalya approfondisce i soggiorni lunghi."
      },
      {
        "type": "h2",
        "text": "Come arrivare ad Alanya dall'aeroporto di Antalya"
      },
      {
        "type": "p",
        "text": "Alanya dista circa 125 km dall'aeroporto di Antalya, all'incirca due ore di strada lungo la costa passando per Side e Manavgat. L'aeroporto di Gazipaşa-Alanya è più vicino ma ha meno voli, soprattutto in inverno, perciò la maggior parte dei visitatori atterra ad Antalya. Un transfer privato vi porta fino alla porta dell'hotel o dell'appartamento a prezzo fisso per veicolo, senza supplementi per inverno, fine settimana o orario notturno: comodo quando i voli arrivano in tarda serata."
      }
    ],
    "faq": [
      [
        "Vale la pena visitare Alanya in inverno?",
        "Sì, se cercate un clima mite, passeggiate e una città vissuta più che la vita da spiaggia. Le giornate sono spesso soleggiate, intorno ai 16-19 °C, e il castello e le grotte si godono senza il caldo estivo."
      ],
      [
        "Si può fare il bagno ad Alanya in inverno?",
        "C'è chi lo fa. In pieno inverno il mare è a circa 17-19 °C, a novembre è più caldo. È rinfrescante più che caldo, e molti hotel hanno piscine coperte riscaldate."
      ],
      [
        "Hotel e ristoranti sono aperti ad Alanya in inverno?",
        "Molti sì. Alanya ha una numerosa popolazione residente tutto l'anno, quindi il centro, i mercati e molti ristoranti restano aperti. Alcuni grandi resort stagionali chiudono da novembre a marzo."
      ],
      [
        "Quanto dista Alanya dall'aeroporto di Antalya?",
        "Circa 125 km, all'incirca due ore di strada. Un transfer privato vi porta direttamente in hotel a prezzo fisso per veicolo."
      ],
      [
        "Piove molto ad Alanya in inverno?",
        "Da dicembre a febbraio sono i mesi più piovosi, ma di solito la pioggia arriva a ondate di uno o due giorni, con giornate di sole nel mezzo."
      ]
    ]
  },
  "tahtali-cable-car-olympos": {
    "slug": "funivia-tahtali-olympos-chimera",
    "title": "Funivia del Tahtalı, Olympos e le fiamme della Chimera da Kemer",
    "heading": "Funivia del Tahtalı, Olympos e la Chimera",
    "description": "Una giornata vicino a Kemer: la funivia del Tahtalı a 2.365 m, le rovine di Olympos, la spiaggia di Çıralı e le fiamme della Chimera al tramonto; stagioni, abbigliamento e come arrivare.",
    "excerpt": "La vetta di una montagna, una città licia in una valle fluviale e fiamme che escono dalla roccia da migliaia di anni: tutto a meno di un'ora da Kemer.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "A sud di Kemer i monti del Tauro si alzano direttamente dal mare. In un solo giorno potete stare in cima al monte Tahtalı, attraversare le rovine di Olympos fino alla spiaggia e guardare le fiamme della Chimera tremolare su un pendio al tramonto. Autunno e primavera sono le stagioni migliori: aria limpida per il panorama, temperature piacevoli per camminare e niente code estive."
      },
      {
        "type": "h2",
        "text": "Funivia del Tahtalı: dal mare a 2.365 m"
      },
      {
        "type": "p",
        "text": "La funivia di Olympos parte dalla pineta sopra Tekirova e sale in circa dieci minuti fino alla vetta del Tahtalı, a circa 2.365 m di altitudine. Dall'alto lo sguardo abbraccia tutta la costa da Antalya a Kemer e Phaselis e, nelle giornate limpide, arriva lontano nell'entroterra. In cima ci sono un bar e terrazze panoramiche. I biglietti si acquistano alla stazione a valle o online; orari e prezzi cambiano con la stagione."
      },
      {
        "type": "h2",
        "text": "Quando andare e come vestirsi"
      },
      {
        "type": "ul",
        "items": [
          "Ottobre e novembre: aria limpida e la migliore visibilità dell'anno, con clima mite al livello del mare.",
          "Da dicembre a marzo: la neve in vetta è frequente; una vista spettacolare su una costa verde, ma lassù vestitevi da inverno.",
          "Aprile e maggio: neve sulla cima e fiori sui pendii più bassi, spesso nello stesso colpo d'occhio.",
          "In qualsiasi periodo dell'anno in vetta fa 10-15 °C più freddo che in spiaggia. Portate una giacca, anche a ottobre.",
          "La funivia si ferma con vento forte o temporali, quindi tenete la giornata flessibile e informatevi prima di partire."
        ]
      },
      {
        "type": "h2",
        "text": "Olympos: rovine in una valle fluviale"
      },
      {
        "type": "p",
        "text": "L'antica città licia di Olympos si trova in una valle stretta e boscosa che termina su una spiaggia di ciottoli. Tombe, un teatro, un impianto termale e una chiesa bizantina sono sparsi tra allori e fichi lungo un torrente. Dall'ingresso alla spiaggia si cammina per una ventina di minuti. Il sito fa parte di un'area protetta e l'ingresso è a pagamento; chi ha il Museum Pass entra gratis."
      },
      {
        "type": "h2",
        "text": "Çıralı e le fiamme della Chimera"
      },
      {
        "type": "p",
        "text": "Dall'altra parte della spiaggia di Olympos c'è Çıralı, un villaggio tranquillo di frutteti e piccole pensioni lungo una lunga spiaggia dove nidificano le tartarughe Caretta caretta. Più in alto, sul pendio di Yanartaş, il gas naturale fuoriesce dalla roccia e brucia da migliaia di anni: è l'antica Chimera della leggenda greca. Un sentiero a gradini di circa 20-30 minuti sale fino alle fiamme. Sono più suggestive al crepuscolo, quindi portate una torcia per la discesa."
      },
      {
        "type": "h2",
        "text": "Organizzare la giornata"
      },
      {
        "type": "table",
        "head": [
          "Tappa",
          "Da Kemer",
          "Tempo da dedicare"
        ],
        "rows": [
          [
            "Funivia del Tahtalı (stazione a valle)",
            "circa 30 minuti",
            "1,5-2 ore"
          ],
          [
            "Rovine e spiaggia di Olympos",
            "circa 50 minuti",
            "2 ore"
          ],
          [
            "Çıralı e la Chimera",
            "circa 50 minuti",
            "1,5 ore, idealmente al crepuscolo"
          ]
        ]
      },
      {
        "type": "p",
        "text": "I tempi di percorrenza sono indicativi. Un buon ordine è la funivia al mattino, quando l'aria è più limpida, Olympos e pranzo a Çıralı nel pomeriggio e la Chimera al tramonto. Da Antalya città aggiungete circa un'ora per tratta."
      },
      {
        "type": "h2",
        "text": "Come arrivare"
      },
      {
        "type": "p",
        "text": "Kemer dista circa 50 km dall'aeroporto di Antalya e Tekirova circa 75 km, lungo la strada costiera. Gli autobus pubblici raggiungono con difficoltà la stazione della funivia e la Chimera, ed è per questo che molti visitatori ci vanno con un autista. Effettuiamo transfer privati dall'aeroporto a Kemer, Tekirova e Kumluca a prezzo fisso per veicolo e, su richiesta, possiamo preparare un preventivo per una giornata con autista tra funivia, Olympos e Çıralı."
      }
    ],
    "faq": [
      [
        "Quanto è alta la funivia del Tahtalı?",
        "Sale fino alla vetta del monte Tahtalı, a circa 2.365 m, partendo da una stazione a valle nel bosco sopra Tekirova. La corsa dura circa dieci minuti."
      ],
      [
        "C'è neve sul Tahtalı in inverno?",
        "Spesso sì, più o meno da dicembre a marzo e a volte fino ad aprile. In cima fa sempre molto più freddo che sulla costa, quindi portate una giacca pesante."
      ],
      [
        "Qual è il momento migliore per vedere le fiamme della Chimera?",
        "Al crepuscolo o dopo il buio, quando le fiamme risaltano sulla roccia. La salita richiede circa 20-30 minuti; portate una torcia per scendere."
      ],
      [
        "Si possono visitare Olympos e la funivia in un giorno?",
        "Sì. La maggior parte delle persone prende la funivia al mattino, visita Olympos e Çıralı nel pomeriggio e vede la Chimera al tramonto."
      ],
      [
        "Quanto dista Kemer dall'aeroporto di Antalya?",
        "Circa 50 km, all'incirca 40-50 minuti di strada. Tekirova, vicino alla funivia, dista circa 75 km."
      ]
    ]
  },
  "perge-aspendos-day-trip": {
    "slug": "perge-e-aspendos-escursione-da-antalya",
    "title": "Perge e Aspendos: mezza giornata tra le rovine di Antalya",
    "heading": "Perge e Aspendos da Antalya",
    "description": "Visitare Perge e Aspendos da Antalya, Belek o Side: cosa vedere, la stagione migliore, quanto tempo dedicare e come abbinare i due siti antichi in mezza giornata.",
    "excerpt": "Una strada romana colonnata, uno stadio da 12.000 posti e uno dei teatri meglio conservati del mondo antico, tutto a meno di un'ora dall'aeroporto.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Due dei più bei siti antichi della Türkiye si trovano a pochi passi dalla strada principale tra Antalya e Side. Perge era una grande città greco-romana della pianura della Panfilia; Aspendos ha un teatro romano così completo da essere ancora usato per gli spettacoli. Insieme sono una facile mezza giornata, e tra ottobre e aprile, quando il sole è gentile, danno il meglio di sé."
      },
      {
        "type": "h2",
        "text": "Perge: una città di colonne"
      },
      {
        "type": "p",
        "text": "Perge è a soli 15 minuti circa dall'aeroporto di Antalya. Si entra dalla porta ellenistica con le sue due torri rotonde e si percorre una lunga strada colonnata, con un canale d'acqua al centro, fino all'agorà, alle terme e alla collina dell'acropoli. Appena fuori dalle mura si trovano un grande teatro e uno degli stadi meglio conservati dell'antichità. Molte statue di Perge sono esposte al Museo di Antalya. Calcolate da un'ora e mezza a due ore."
      },
      {
        "type": "h2",
        "text": "Aspendos: il teatro sopravvissuto"
      },
      {
        "type": "p",
        "text": "Aspendos, vicino a Serik, è famosa per il suo teatro romano del II secolo d.C., che ospitava molte migliaia di spettatori e conserva ancora l'edificio scenico, le gallerie e un'acustica eccellente. Alle sue spalle un sentiero sale alla città alta e agli archi di un acquedotto romano che attraversa la pianura. A breve distanza in auto, il ponte selgiuchide sul fiume Köprüçay merita una sosta. Calcolate da un'ora a un'ora e mezza."
      },
      {
        "type": "h2",
        "text": "La stagione migliore per le rovine"
      },
      {
        "type": "ul",
        "items": [
          "Ottobre e novembre: giornate calde e asciutte e luce morbida per le foto.",
          "Da dicembre a febbraio: siti tranquilli e clima mite tra un giorno di pioggia e l'altro; portate uno strato impermeabile.",
          "Marzo e aprile: erba verde e fiori selvatici tra le pietre, probabilmente il periodo più bello.",
          "Da giugno a settembre: entrambi i siti hanno poca ombra e il caldo di mezzogiorno è intenso; d'estate andateci di primo mattino."
        ]
      },
      {
        "type": "h2",
        "text": "Abbinare i due siti in mezza giornata"
      },
      {
        "type": "table",
        "head": [
          "Punto di partenza",
          "Fino a Perge",
          "Da Perge ad Aspendos",
          "Da Aspendos al rientro"
        ],
        "rows": [
          [
            "Antalya città / Lara",
            "circa 25 minuti",
            "circa 35 minuti",
            "circa 45 minuti"
          ],
          [
            "Belek",
            "circa 30 minuti",
            "circa 35 minuti",
            "circa 20 minuti"
          ],
          [
            "Side / Manavgat",
            "circa 55 minuti",
            "circa 35 minuti",
            "circa 35 minuti"
          ]
        ]
      },
      {
        "type": "p",
        "text": "I tempi di percorrenza sono indicativi. Iniziare da Perge al mattino e finire ad Aspendos funziona da ognuna di queste basi. Entrambi i siti hanno un biglietto d'ingresso e accettano il Museum Pass. Indossate scarpe comode: il terreno è di marmo e pietra irregolari e ci sono gradini ovunque."
      },
      {
        "type": "h2",
        "text": "Lungo il tragitto da o per l'aeroporto"
      },
      {
        "type": "p",
        "text": "Poiché Perge è vicinissima all'aeroporto di Antalya e Aspendos si trova vicino alla strada per Belek e Side, i due siti si inseriscono bene in un giorno di arrivo o di partenza con un volo serale. Un transfer privato può fermarsi a uno o a entrambi lungo il percorso, con i bagagli al sicuro nel veicolo. Chiedete un preventivo con soste al momento della prenotazione: il prezzo resta fisso per veicolo."
      }
    ],
    "faq": [
      [
        "Quanto dista Perge dall'aeroporto di Antalya?",
        "Solo 15 minuti circa di strada. È uno dei siti antichi più facili da visitare nel giorno di arrivo o di partenza."
      ],
      [
        "Si possono visitare Perge e Aspendos in un giorno?",
        "Senza problemi: mezza giornata basta per entrambi. Calcolate circa due ore a Perge, un'ora circa ad Aspendos e circa 35 minuti di strada tra i due."
      ],
      [
        "Il teatro di Aspendos è ancora in uso?",
        "Sì. Il teatro romano è così ben conservato che in alcune serate ospita ancora concerti e spettacoli, soprattutto nei mesi più caldi."
      ],
      [
        "Qual è il periodo migliore per visitare Perge e Aspendos?",
        "Da ottobre ad aprile. In entrambi i siti c'è poca ombra, quindi d'estate andateci di primo mattino."
      ],
      [
        "Un transfer può fermarsi alle rovine con i miei bagagli?",
        "Sì. Chiedete le soste al momento della prenotazione; i bagagli restano nel veicolo e il prezzo resta fisso per veicolo."
      ]
    ]
  },
  "ramadan-bayram-antalya": {
    "slug": "ramadan-e-bayram-ad-antalya",
    "title": "Ramadan e Bayram ad Antalya: cosa devono sapere i viaggiatori",
    "heading": "Viaggiare ad Antalya durante il Ramadan e le feste",
    "description": "Cosa cambia ad Antalya durante il Ramadan e le feste di fine Ramadan e del Sacrificio: ristoranti, serate di iftar, strade trafficate, hotel e come organizzare il transfer.",
    "excerpt": "Nelle località turistiche la vita quotidiana cambia appena durante il Ramadan. Le feste che seguono sono un'altra storia: ecco cosa aspettarsi e come organizzarsi.",
    "readingMinutes": 5,
    "blocks": [
      {
        "type": "p",
        "text": "Il Ramadan e le due grandi feste islamiche si spostano nel calendario, anticipando di circa 11 giorni ogni anno. Nelle prossime stagioni cadono tra fine inverno e primavera: il Ramadan e la Festa di fine Ramadan (Ramazan Bayramı) verso febbraio e marzo, la Festa del Sacrificio (Kurban Bayramı) verso maggio. Consultate il calendario ufficiale per le date esatte. Per chi viaggia, il mese di digiuno in sé cambia poco sulla costa; sono le feste che vanno pianificate."
      },
      {
        "type": "h2",
        "text": "Il Ramadan cambia una vacanza ad Antalya?"
      },
      {
        "type": "p",
        "text": "Molto poco. Hotel, ristoranti, caffè e negozi di Antalya, Belek, Side, Kemer e Alanya aprono normalmente durante il giorno, e l'alcol viene servito nei locali che lo servono di solito. In Türkiye molte persone digiunano, molte no, e nessuno si aspetta che lo facciano i visitatori. È semplicemente educato non mangiare o bere in modo ostentato davanti a chi sta chiaramente digiunando, soprattutto nei quartieri tradizionali e nei villaggi."
      },
      {
        "type": "h2",
        "text": "L'iftar: le serate del Ramadan"
      },
      {
        "type": "ul",
        "items": [
          "Al tramonto il digiuno si rompe con l'iftar, spesso un pasto condiviso con zuppa, datteri, olive e lo speciale pane pide rotondo del Ramadan, venduto solo in questo mese.",
          "Molti ristoranti propongono un menu iftar; i tavoli si riempiono poco prima del tramonto, quindi prenotate se volete partecipare.",
          "Nella città vecchia e intorno alle grandi moschee la sera c'è un'atmosfera di festa, con famiglie in giro fino a tardi.",
          "Prima dell'alba, in alcuni quartieri, un tamburino percorre le strade per svegliare la gente per l'ultimo pasto (sahur): fa parte della tradizione."
        ]
      },
      {
        "type": "h2",
        "text": "Le feste del Bayram: quando la Türkiye si mette in viaggio"
      },
      {
        "type": "p",
        "text": "La Festa di fine Ramadan dura tre giorni e la Festa del Sacrificio quattro; spesso il governo le allunga in un ponte più lungo. Milioni di persone si spostano verso le famiglie o la costa, così voli nazionali, autobus interurbani e hotel si riempiono e le strade verso Antalya sono trafficate il primo e l'ultimo giorno. Banche e uffici pubblici chiudono, ma negozi, ristoranti, musei e siti turistici delle località di mare di solito restano aperti."
      },
      {
        "type": "h2",
        "text": "Organizzare il transfer durante le feste"
      },
      {
        "type": "ul",
        "items": [
          "Prenotate in anticipo se atterrate all'inizio di una festa: veicoli e autisti sono molto richiesti.",
          "Prevedete più tempo per le partenze nell'ultimo giorno di festa, quando aeroporto e strade sono più affollati.",
          "Durante il Ramadan il traffico è intenso nell'ora prima del tramonto e insolitamente tranquillo durante l'iftar.",
          "Comunicateci il numero del volo: lo monitoriamo, così un ritardo in una giornata di punta non vi fa perdere il ritiro."
        ]
      },
      {
        "type": "h2",
        "text": "Buono a sapersi"
      },
      {
        "type": "p",
        "text": "Durante le feste ci si saluta con «İyi bayramlar» (buone feste) e ovunque vengono offerti dolci: è un periodo caloroso per trovarsi nel Paese. I nostri prezzi non cambiano per il Ramadan o il Bayram: un prezzo fisso per veicolo, senza supplementi festivi, notturni o stagionali."
      }
    ],
    "faq": [
      [
        "I ristoranti sono aperti ad Antalya durante il Ramadan?",
        "Sì. Nelle località turistiche e ad Antalya città, ristoranti e caffè aprono normalmente durante il giorno. La sera si aggiungono i menu iftar."
      ],
      [
        "I turisti possono bere alcolici durante il Ramadan ad Antalya?",
        "Sì. Hotel, bar e ristoranti che servono normalmente alcolici continuano a farlo durante il Ramadan."
      ],
      [
        "Antalya è affollata durante le feste del Bayram?",
        "Sì. Molte famiglie turche viaggiano durante le feste, quindi hotel, voli e strade sono più affollati del solito, soprattutto il primo e l'ultimo giorno."
      ],
      [
        "Quando cadono il Ramadan e le feste il prossimo anno?",
        "Le date si anticipano di circa 11 giorni ogni anno. Nelle prossime stagioni il Ramadan e la Festa di fine Ramadan cadono verso febbraio-marzo e la Festa del Sacrificio verso maggio; consultate il calendario ufficiale per le date esatte."
      ],
      [
        "I prezzi dei transfer aumentano durante il Bayram?",
        "Con noi no. Il prezzo è fisso per veicolo, senza supplementi festivi, notturni o stagionali. Consigliamo di prenotare in anticipo per le date festive."
      ]
    ]
  },
  "kaleici-old-town-guide": {
    "slug": "kaleici-citta-vecchia-antalya-guida",
    "title": "Kaleiçi, la città vecchia di Antalya: guida a piedi per la bassa stagione",
    "heading": "Kaleiçi: la città vecchia di Antalya",
    "description": "Guida a piedi a Kaleiçi, il centro storico murato di Antalya: Porta di Adriano, Minareto Scanalato, porto vecchio, hotel boutique e perché andarci dall'autunno alla primavera.",
    "excerpt": "Porte romane, case ottomane e un porto sotto le scogliere. Il cuore antico di Antalya si scopre meglio con calma, nei mesi in cui la città appartiene ai suoi abitanti.",
    "readingMinutes": 6,
    "blocks": [
      {
        "type": "p",
        "text": "Kaleiçi, letteralmente «dentro il castello», è il centro storico di Antalya, racchiuso dalle antiche mura sopra un piccolo porto. I suoi vicoli sono fiancheggiati da case ottomane restaurate, molte delle quali oggi ospitano hotel boutique, caffè e piccoli ristoranti. D'estate fa caldo ed è affollato; da ottobre ad aprile dà il meglio di sé, con giornate miti, terrazze aperte al sole e tempo per passeggiare."
      },
      {
        "type": "h2",
        "text": "Una passeggiata a Kaleiçi"
      },
      {
        "type": "ul",
        "items": [
          "Porta di Adriano: la porta romana a tre archi costruita per la visita dell'imperatore nel II secolo d.C., ingresso tradizionale della città vecchia.",
          "La Torre dell'Orologio e piazza Kalekapısı: il punto d'incontro tra la città vecchia e quella moderna.",
          "Il Minareto Scanalato (Yivli Minare): il simbolo selgiuchide di Antalya, visibile da tutto il centro.",
          "Torre di Hıdırlık: una torre romana rotonda sul margine meridionale, con vista al tramonto sulla baia e sulle montagne.",
          "Il Minareto Mozzo (Kesik Minare): un edificio che nei secoli è stato tempio, chiesa e moschea.",
          "Il porto vecchio: barche da pesca e da escursione sotto le scogliere, raggiungibile dai vicoli o con un ascensore dall'alto."
        ]
      },
      {
        "type": "h2",
        "text": "Oltre le mura"
      },
      {
        "type": "p",
        "text": "Il parco Karaalioğlu corre lungo le scogliere a partire dalla Torre di Hıdırlık, con vista sulla baia. Il Museo di Antalya, una delle collezioni archeologiche più ricche della Türkiye, si trova all'inizio della spiaggia di Konyaaltı ed è ideale in una giornata di pioggia; verificate gli orari di apertura prima di andare. A est della città, le cascate di Düden precipitano direttamente dalle scogliere nel mare, mentre le cascate superiori si trovano in un parco ombreggiato."
      },
      {
        "type": "h2",
        "text": "Perché dall'autunno alla primavera"
      },
      {
        "type": "table",
        "head": [
          "Stagione",
          "Di giorno",
          "A Kaleiçi"
        ],
        "rows": [
          [
            "Ottobre - novembre",
            "22-27 °C",
            "Serate tiepide, terrazze aperte, meno folla"
          ],
          [
            "Dicembre - febbraio",
            "15-18 °C",
            "Vicoli tranquilli, caffè al sole, qualche giorno di pioggia"
          ],
          [
            "Marzo - aprile",
            "18-22 °C",
            "Zagara, parchi verdi, festival in città"
          ],
          [
            "Giugno - agosto",
            "33-35 °C",
            "Molto caldo e affollato: meglio al mattino presto e a sera"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Le temperature sono medie indicative. La maggior parte di ristoranti, caffè e hotel boutique di Kaleiçi resta aperta tutto l'anno, perché la città vecchia vive dei visitatori della città e dei residenti, non solo del turismo balneare."
      },
      {
        "type": "h2",
        "text": "Dormire nella città vecchia"
      },
      {
        "type": "p",
        "text": "Gli hotel di Kaleiçi sono di solito piccoli, ricavati in antiche dimore attorno a un cortile o a una piccola piscina. Molti vicoli sono pedonali o troppo stretti per i veicoli grandi, quindi l'auto spesso si ferma alla porta o alla piazza più vicina e gli ultimi metri si fanno a piedi. Indicateci l'hotel al momento della prenotazione; i nostri autisti sanno qual è l'accesso più vicino e vi aiutano con i bagagli."
      },
      {
        "type": "h2",
        "text": "Come arrivare dall'aeroporto di Antalya"
      },
      {
        "type": "p",
        "text": "Kaleiçi dista circa 15 km dall'aeroporto di Antalya, all'incirca 20-30 minuti di strada. Il tram collega anche l'aeroporto al centro, ma con le valigie un transfer privato fino all'hotel è più semplice, soprattutto a tarda notte. Il prezzo è fisso per veicolo, senza supplemento notturno."
      }
    ],
    "faq": [
      [
        "Che cos'è Kaleiçi ad Antalya?",
        "Kaleiçi è la città vecchia storica di Antalya, racchiusa dalle mura sopra il porto vecchio, con case ottomane, la Porta di Adriano, il Minareto Scanalato e tanti hotel boutique e caffè."
      ],
      [
        "Quanto dista Kaleiçi dall'aeroporto di Antalya?",
        "Circa 15 km, all'incirca 20-30 minuti di strada."
      ],
      [
        "Si può entrare in auto a Kaleiçi?",
        "Solo in parte. Molti vicoli sono pedonali o molto stretti, quindi i veicoli spesso si fermano alla porta o alla piazza più vicina. I nostri autisti conoscono l'accesso più vicino per ogni hotel."
      ],
      [
        "Vale la pena visitare Kaleiçi in inverno?",
        "Sì. La maggior parte di caffè, ristoranti e hotel resta aperta, i vicoli sono tranquilli e le giornate di solito miti e soleggiate."
      ],
      [
        "Quanto tempo serve per Kaleiçi?",
        "Mezza giornata basta per una prima passeggiata. Con il museo, il parco Karaalioğlu e le cascate di Düden, l'ideale è una giornata intera o due."
      ]
    ]
  }
};
