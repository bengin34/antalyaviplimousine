import type { TransferLandingCopy } from "../transfer-landing-copy";

/**
 * Italian headings say "nella zona di <luogo>" rather than "a <luogo>": the
 * catalogue names include Antalya, where the bare preposition would read
 * awkwardly, and the region wording is the same on every route.
 *
 * Written by the team, not natively reviewed yet — flag any wording an Italian
 * reader would phrase differently before the next content pass.
 */
export const it: TransferLandingCopy = {
  heroHeading: (name) => `Aeroporto di Antalya → ${name}: transfer privato`,
  heroCta: "Prenota il transfer",
  heroTrust: [
    "Fino a 7 persone",
    "Nessun pagamento anticipato",
    "Pagamento direttamente all’autista",
    "Prezzo totale fisso, senza costi nascosti",
    "Seggiolino per bambini gratuito su richiesta",
    "Monitoraggio del volo incluso",
  ],
  serviceHeading: (name) => `Il tuo transfer privato per ${name}`,
  aboutHeading: (name) => `La destinazione: ${name}`,
  ownGroup: (name) =>
    `Viaggi solo con il tuo gruppo, direttamente fino al tuo hotel nella zona di ${name}. Nessuna navetta collettiva, nessun estraneo in auto e nessuna deviazione verso altri hotel: il prezzo fisso vale per l’intero veicolo.`,
  arrivalHeading: "L’arrivo all’aeroporto di Antalya",
  arrivalBody:
    "Dopo aver ritirato i bagagli, raggiungi l’area Meet & Greet J / 777. Il nostro team in aeroporto trova la tua prenotazione e ti affida al tuo autista. Poiché monitoriamo il volo, un ritardo sposta il ritiro senza alcun sovrapprezzo.",
  returnHeading: "Transfer di ritorno",
  returnBody: (name) =>
    `Organizziamo anche il ritorno da ${name} all’aeroporto di Antalya. Comunicaci il numero del volo e l’ora di ritiro desiderata al momento della prenotazione.`,
  privateHeading: "Privato, non condiviso",
  privateBody: (name) =>
    `In auto viaggiate solo tu e i tuoi compagni di viaggio. Dopo la prenotazione ricevi una conferma chiara con i dati del viaggio e un contatto diretto. Il giorno dell’arrivo il nostro team segue il volo; se atterri prima o dopo, adeguiamo l’incontro. L’autista ti porta con i bagagli fino alla reception dell’hotel o all’indirizzo privato che ci hai indicato nella zona di ${name}.`,
  priceBody:
    "L’importo indicato è un prezzo totale fisso per il veicolo, non a persona. Non ci sono supplementi nascosti per il monitoraggio del volo, per la normale attesa o per i seggiolini su richiesta. Paghi in contanti direttamente all’autista all’inizio del viaggio, quindi il costo è definito prima della partenza.",
  vehicleHeading: "Veicolo, bagagli e bambini",
  vehicleBody:
    "La Mercedes Vito è adatta a un massimo di sei passeggeri con normali bagagli da vacanza; i gruppi più numerosi viaggiano su un Mercedes Sprinter con fino a 12 posti. Segnalaci in fase di prenotazione bagagli fuori misura, un passeggino o i seggiolini necessari: adattiamo il veicolo al tuo gruppo.",
  wholeVehicle: "Prezzo per l’intero veicolo",
  priceTrust: [
    "Nessun pagamento anticipato",
    "Pagamento direttamente all’autista",
    "Nessun costo nascosto",
  ],
  hotelsEyebrow: "Per il tuo soggiorno",
  hotelsHeading: (name) => `Hotel richiesti nella zona di ${name}`,
  hotelsBody: () => "Raggiungiamo direttamente questi e tutti gli altri hotel della zona.",
  faq: [
    [
      "Dove trovo il team transfer all’aeroporto di Antalya?",
      "Dopo il ritiro dei bagagli, vai all’area Meet & Greet J / 777. Il nostro team trova la tua prenotazione e ti accompagna al tuo autista.",
    ],
    [
      "Devo pagare il transfer in anticipo?",
      "No. Non è richiesto alcun pagamento anticipato. Il prezzo totale fisso si paga direttamente all’autista.",
    ],
    [
      "È disponibile un seggiolino per bambini?",
      "Sì. I seggiolini sono gratuiti su richiesta. Indica il numero dei bambini e la loro età al momento della prenotazione.",
    ],
  ],
  regions: {
    antalya: {
      about: "La città di Antalya, con i litorali di Lara e Kundu, si trova a pochi chilometri dall’aeroporto. Lungo la costa di Lara si allineano grandi resort a tema e hotel cittadini, mentre Konyaaltı, a ovest, offre una spiaggia di ghiaia e un lungomare molto esteso.",
      routeDetails: "Il breve tragitto dall’aeroporto di Antalya segue la strada costiera di Lara o entra direttamente in centro. Anche su una tratta corta l’auto privata conviene: nessuna attesa di altri passeggeri, nessuna sosta intermedia e arrivo davanti al tuo hotel.",
    },
    belek: {
      about: "Belek si trova a est di Antalya ed è nota soprattutto per i campi da golf, i grandi resort all inclusive e le ampie spiagge di sabbia. Gli hotel si distribuiscono tra Kadriye e la costa vicino a Serik, perciò l’indirizzo esatto dell’hotel aiuta in fase di prenotazione.",
      routeDetails: "Il percorso lascia l’aeroporto di Antalya sulla D400 verso Serik e Belek. Per famiglie, golfisti e voli serali il transfer privato diretto è la scelta semplice: raggiungi la struttura senza fermate di raccolta e senza cambio di veicolo.",
    },
    side: {
      about: "Side unisce un centro storico antico a lunghe spiagge sabbiose e a grandi complessi per vacanze. Oltre a Side, la destinazione comprende le zone alberghiere più richieste di Kumköy, Evrenseki, Çolaklı, Sorgun e Titreyengöl.",
      routeDetails: "Dall’aeroporto di Antalya il percorso segue la litoranea verso Manavgat e Side. L’auto privata è particolarmente comoda con un arrivo in tarda serata: il tuo gruppo va diretto al resort prenotato, senza attendere ospiti di altri hotel.",
    },
    kemer: {
      about: "Kemer si estende a ovest di Antalya, tra i monti del Tauro e il Mediterraneo. L’area comprende il centro di Kemer insieme a Beldibi, Göynük, Kiriş e Çamyuva: hotel sulla spiaggia, un porto turistico e le montagne come sfondo.",
      routeDetails: "Il tragitto diretto segue la costa a ovest di Antalya. L’autista ti porta fino all’hotel senza cambi di veicolo, cosa che conta soprattutto se viaggi con bambini, con attrezzatura sportiva o dopo un atterraggio serale.",
    },
    alanya: {
      about: "Alanya è una delle mete più amate della Riviera turca e si trova decisamente più a est rispetto ai resort intorno ad Antalya. Oltre al centro, Mahmutlar, Kestel, Avsallar, Türkler e Okurcalar sono le zone alberghiere più richieste.",
      routeDetails: "Su un tragitto costiero lungo il prezzo fisso per veicolo mostra tutto il suo valore. Con un transfer privato viaggi con il tuo gruppo e procedi dall’atterraggio fino alla reception dell’hotel.",
    },
    kizilagac: {
      about: "Kızılağaç si trova a est di Manavgat e si distingue per i resort spaziosi sulla spiaggia e per vacanze di famiglia tranquille. L’area confina con Sorgun e Manavgat; molti hotel sono un po’ discosti dalla strada principale, direttamente sul mare.",
      routeDetails: "Dall’aeroporto di Antalya si prende la D400 verso Manavgat e si continua fino a Kızılağaç. Il veicolo privato ti risparmia le fermate aggiuntive presso altri hotel, frequenti proprio su questa tratta con i transfer condivisi.",
    },
    tekirova: {
      about: "Tekirova si trova a sud di Kemer, ai margini del parco nazionale Olympos-Beydağları. Unisce aree alberghiere curate a piccole baie e si trova vicinissima al sito antico di Phaselis.",
      routeDetails: "Il percorso parte dall’aeroporto di Antalya, passa per Kemer e continua verso Tekirova. La posizione sulla costa e la distanza rendono sensato il transfer diretto: nessun cambio di veicolo e nessuna attesa di altri ospiti fino all’hotel.",
    },
    bogazkent: {
      about: "Boğazkent si trova nel distretto di Serik, sulla costa tra Belek e Side. Grandi resort all inclusive sorgono direttamente su un’ampia spiaggia di sabbia e i campi da golf di Belek sono a pochi minuti: una base tranquilla sia per le famiglie sia per i golfisti.",
      routeDetails: "Dall’aeroporto di Antalya il percorso segue la D400 verso est, supera Belek e poi svolta verso la costa. Con circa 48 km è uno dei transfer più brevi di questo elenco, e l’auto privata ti porta dalla sala arrivi all’ingresso del resort, senza soste presso altri hotel.",
    },
    manavgat: {
      about: "Manavgat è una vivace cittadina sull’omonimo fiume, a est di Side. È nota per la sua cascata, le gite in barca lungo il fiume e il mercato settimanale, e fa da porta d’accesso ai resort di questo tratto di costa. Al momento della prenotazione indicaci l’indirizzo esatto del tuo hotel, perché la zona è molto estesa.",
      routeDetails: "Il percorso corre verso est lungo la D400 dall’aeroporto di Antalya per circa 75 km. Il viaggio dura circa un’ora, e il transfer privato diretto ti evita le fermate aggiuntive che una navetta condivisa fa lungo questa trafficata strada costiera.",
    },
    bodrum: {
      about: "Bodrum si trova sulla costa egea, nella provincia di Muğla, ed è famosa per il castello dei crociati, il porto turistico e le case bianche sulle colline. Intorno alla penisola ci sono quartieri animati come Gümbet e Bitez, ma anche baie più tranquille a Yalıkavak, Türkbükü e Gümüşlük.",
      routeDetails: "Con circa 380 km è uno dei tragitti più lunghi che offriamo e richiede da cinque a sei ore con pause comode. L’auto privata rende la giornata molto più semplice rispetto ai mezzi pubblici: parti appena atterri, ti fermi dove vuoi e arrivi al tuo hotel sulla penisola. Al momento della prenotazione indicaci hotel e orario di atterraggio, così potremo pianificare il viaggio.",
    },
    dalaman: {
      about: "Dalaman è la porta d’ingresso alla costa licia e caria. Il suo aeroporto serve località come Sarıgerme e Göcek, e la vicina Dalyan è nota per il delta del fiume, le tombe rupestri di Kaunos e la spiaggia delle tartarughe di İztuzu.",
      routeDetails: "I 235 km dall’aeroporto di Antalya seguono la tortuosa strada della costa licia per circa tre ore o tre ore e mezza. Un prezzo fisso per veicolo rende facile calcolare il budget di un lungo viaggio, e con l’auto privata il tuo gruppo può fermarsi per una pausa o un pasto quando vuole.",
    },
    fethiye: {
      about: "Fethiye si affaccia su un’ampia baia circondata da montagne coperte di pini. È la base per Ölüdeniz e la sua laguna blu, per le spiagge e la vita notturna di Çalış e per i villaggi più tranquilli di Hisarönü e Kayaköy. Molti ospiti arrivano anche per il parapendio dal Babadağ e per le gite in barca intorno alle dodici isole.",
      routeDetails: "I 205 km dall’aeroporto di Antalya corrono lungo la costa licia attraverso Kumluca, Kaş e Kalkan e richiedono dalle due ore e mezza alle tre ore. La strada è tortuosa e panoramica. Con un transfer privato non devi cambiare veicolo a Fethiye, e l’autista ti accompagna al tuo hotel a Ölüdeniz, Çalış o Hisarönü.",
    },
    pamukkale: {
      about: "Pamukkale, nella provincia di Denizli, è Patrimonio dell’Umanità UNESCO ed è nota per le bianche terrazze di travertino e le calde piscine termali. Sulla collina che le sovrasta sorge l’antica città di Hierapolis, con il teatro, la necropoli e la piscina antica dove si nuota tra colonne sommerse.",
      routeDetails: "Il percorso lascia la costa e attraversa l’entroterra per circa 245 km, tra le montagne del Tauro e l’altopiano verso Denizli, in circa tre ore o tre ore e mezza. L’auto privata è adatta a questo viaggio: nessun cambio di veicolo, puoi pianificare una sosta lungo la strada e arrivi direttamente al tuo hotel a Pamukkale o Karahayıt.",
    },
    kapadokya: {
      about: "La Cappadocia, nel cuore dell’Anatolia, è nota per i camini delle fate, le chiese rupestri e le città sotterranee. All’alba le mongolfiere si alzano sopra Göreme, Uçhisar e Ürgüp, e molti ospiti scelgono di soggiornare in un hotel scavato nella roccia.",
      routeDetails: "Con circa 540 km il viaggio porta dal Mediterraneo, attraverso le montagne del Tauro e l’altopiano anatolico, e richiede da sette a otto ore con le pause. Il transfer privato è il modo più comodo per farlo: il tuo gruppo viaggia unito, l’autista pianifica con te le soste e ti porta all’ingresso del tuo hotel in grotta. Al momento della prenotazione indicaci numero di volo e hotel, così potremo pianificare la giornata.",
    },
  },
};
