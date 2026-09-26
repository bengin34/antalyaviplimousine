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
  }
};
