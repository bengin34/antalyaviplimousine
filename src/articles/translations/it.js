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
};
