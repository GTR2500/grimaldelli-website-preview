# P10 — Audit marketing, inventario fonti e criteri di rilascio

**Data:** 13 novembre 2026  
**Ambiente interessato:** repository `GTR2500/grimaldelli-website-preview`, preview GitHub Pages.  
**Esclusioni:** sito ufficiale, dominio, DNS, hosting, CMS, invio reale dei moduli, campagne e analytics.  
**Baseline approvata:** Home scura, 1964 nella cronologia Azienda, menu settori diretto, pagina Realizzazioni per lavori documentati, favicon circolare.

## 1. Interventi attuati nella preview

1. Home: messaggio B2B più diretto senza modificare fotografia e headline; strip di evidenze tracciabili (dal 1921, quattro aree, lavori documentati).
2. Prodotti: sezione di valutazione e richiesta più informata in tutte le schede; recuperate le caratteristiche verificabili dei **Raschiatori asporta letame** dalla [scheda ufficiale Grimaldelli](https://www.glcgrimaldelli.com/prodotto/raschiatori-asporta-letame/) con collegamento alla fonte.
3. Soluzioni: chiarito il perimetro di intervento nei quattro settori, senza attribuire automaticamente all'azienda l'intera costruzione di impianti biogas o fotovoltaici.
4. Conversione: ogni pagina prodotto inoltra a Contatti con codice prodotto; le pagine di settore inoltrano il settore. Il form presenta il contesto e il visitatore può aggiungere località, quantità, tempi e applicazione.
5. Preview: il form è intenzionalmente non operativo; aggiunto un comando email con oggetto e contesto, attivabile **solo dal visitatore**. Nessun messaggio di avvenuto invio viene simulato.
6. SEO/social: titoli e descrizioni coerenti con il percorso, metadati di condivisione di base. La preview mantiene `noindex`.
7. Lingue: copy e flussi introdotti in IT, EN, FR, DE, con test di caricamento e di regressione in CI.

## 2. Inventario del catalogo storico

Fonte primaria: `site-data.js`, estratta dal backup storico. Le voci non devono diventare schede commerciali tecniche definitive senza revisione.

- **29** famiglie e modelli catalogati
- **195** fotografie associate alle famiglie
- **29** voci marcate `reviewRequired` nel dataset
- **1** famiglia con dettagli pubblicati recuperati in questa passata: Raschiatori asporta letame; da verificare con Ufficio Tecnico in caso di nuova proposta commerciale.

| N. | Famiglia o modello | Gruppo | Foto | Stato documentazione |
|---:|---|---|---:|---|
| 1 | Stalle | strutture | 18 | Dati tecnici da verificare |
| 2 | Pensiline | strutture | 4 | Dati tecnici da verificare |
| 3 | Struttura monofalda | strutture | 8 | Dati tecnici da verificare |
| 4 | Strutture reticolari | strutture | 1 | Dati tecnici da verificare |
| 5 | Portici | strutture | 4 | Dati tecnici da verificare |
| 6 | Strutture industriali | strutture | 16 | Dati tecnici da verificare |
| 7 | Battifianco | zootecnia | 20 | Dati tecnici da verificare |
| 8 | Autocatture | zootecnia | 9 | Dati tecnici da verificare |
| 9 | Cancelli, divisori e recinzioni | zootecnia | 11 | Dati tecnici da verificare |
| 10 | Abbeveratoi | zootecnia | 14 | Dati tecnici da verificare |
| 11 | Materassini | zootecnia | 8 | Dati tecnici da verificare |
| 12 | Raschiatori asporta letame | zootecnia | 14 | Specifiche pubbliche recuperate; validazione tecnica finale aperta |
| 13 | Spazzole per bovini | zootecnia | 1 | Dati tecnici da verificare |
| 14 | Vasche per lavaggi podali | zootecnia | 1 | Dati tecnici da verificare |
| 15 | Tende | zootecnia | 3 | Dati tecnici da verificare |
| 16 | Gomma per pavimentazioni | zootecnia | 6 | Dati tecnici da verificare |
| 17 | Portaballoni di fieno | zootecnia | 4 | Dati tecnici da verificare |
| 18 | Ventilatori e doccette | zootecnia | 3 | Dati tecnici da verificare |
| 19 | Box su lettiera | zootecnia | 6 | Dati tecnici da verificare |
| 20 | Box su cuccette | zootecnia | 2 | Dati tecnici da verificare |
| 21 | Prefabbricati | zootecnia | 4 | Dati tecnici da verificare |
| 22 | Attrezzature rinforzate | zootecnia | 7 | Dati tecnici da verificare |
| 23 | Abbeveratoio Extralux | modelli | 3 | Dati tecnici da verificare |
| 24 | Tubo educatore Onda | modelli | 3 | Dati tecnici da verificare |
| 25 | Battifianco Libertà | modelli | 4 | Dati tecnici da verificare |
| 26 | Battifianco Flexy | modelli | 6 | Dati tecnici da verificare |
| 27 | Battifianco Green Stall | modelli | 11 | Dati tecnici da verificare |
| 28 | Calorix | modelli | 2 | Dati tecnici da verificare |
| 29 | Accessori | archivio | 2 | Dati tecnici da verificare |

## 3. Priorità residue per raggiungere livelli marketing elevati

| Priorità | Necessità | Responsabilità informativa | Esito richiesto |
|---|---|---|---|
| P0 | Convalidare dati, varianti e configurazioni delle famiglie di prodotto prioritarie | Ufficio Tecnico / prodotto | Schede tecniche verificabili, non solo foto |
| P0 | Definire esattamente le forniture Grimaldelli nei cantieri Biogas e FV | Ufficio Tecnico / Project Manager | Case study senza ambiguità EPC |
| P0 | Abilitare e collaudare l'invio dei contatti nell'ambiente di produzione, con privacy e protezione anti-spam | IT + titolare del trattamento + web provider | Lead effettivamente ricevuti, tracciati e gestiti |
| P1 | Selezionare clienti e progetti pubblicabili, con autorizzazioni | Commerciale / Direzione | Referenze credibili, prove documentate |
| P1 | Preparare URL indicizzabili (non `#/...`), metadata server-rendered, canonical, sitemap e Search Console | Web / SEO | SEO strutturale pubblicabile |
| P1 | Collaudare mobile su dispositivi reali e prestazioni (LCP/CLS/INP) | Web QA | Nessuna regressione sui dispositivi target |
| P1 | Definire analytics consent-aware e gestione lead | Marketing + privacy/IT | Misurazione del funnel senza tracciamenti non autorizzati |
| P2 | Testare messaggi e CTA con clienti e colleghi | Commerciale / Marketing | Conversione misurata, non giudizi estetici |

## 4. KPI da misurare **dopo** l'attivazione autorizzata del sito ufficiale

- **Lead qualificati** al mese: richieste con contatto utilizzabile + prodotto/settore + bisogno espresso.
- **Tasso di conversione del form**: richieste inviate e ricevute / sessioni sulla pagina contatti; distinguere i click email.
- **Click-through schede → contatti**: utenti che hanno attivato la richiesta contestuale / utenti che hanno visitato la scheda.
- **Qualità del lead**: percentuale delle richieste che contengono almeno applicazione, località e quantità/dimensione.
- **Funnel realizzazioni → contatti**: non confondere visualizzazioni dei progetti con nuovi contatti.
- **Core Web Vitals** mobile/desktop e regressioni di navigazione, oltre alla visibilità organica per settore.

Non attribuire punteggi 10/10 senza un periodo di dati confrontabili e un test con utenti esterni. Nessuna attività di marketing/tracking è stata attivata in produzione da questo progetto.

## 5. Vincoli di rilascio

- Proteggere `main` e mantenere disponibile il commit precedente come rollback; nessun deploy ufficiale automatico.
- Non rimuovere la cronologia Azienda (1921, **1964**, 1999, 2021, 2025), i quattro filtri e la distinzione tra prodotto e settore applicativo.
- Non rimuovere `noindex` dalla preview.
- Non dichiarare funzionante l'invio email tramite form prima di test su infrastruttura reale.
- Verificare preventivamente backup, migrazione hosting P05 del 26/11/2026 (annunciata, non verificata), e approvazione CTO prima di qualsiasi modifica al dominio ufficiale.

## Posizionamento distintivo: realizzazioni su misura

**Messaggio guida:** «Il catalogo è un punto di partenza. Il resto nasce su misura.»

Una parte rilevante delle strutture metalliche, delle attrezzature e delle lavorazioni viene realizzata o adattata alle esigenze del singolo progetto. Il messaggio commerciale deve mostrare comprensione dell'applicazione, qualità dell'esecuzione e cura dei dettagli.

**Applicazione editoriale**
- Home: promessa distintiva e invito a descrivere l'esigenza.
- Prodotti: catalogo come orientamento, non perimetro rigido. Specificare standard, configurabile o su specifica solo quando verificato.
- Settori: esprimere capacità di valutare lavorazioni su specifica senza ampliare impropriamente le forniture.
- Contatti: richiesta dedicata al lavoro su misura, con spazio per funzione, vincoli e dimensioni.
- Realizzazioni: presentare casi documentati esigenza → intervento → dettaglio esecutivo appena disponibili fonti e autorizzazioni.

**Vincoli di veridicità:** non affermare che tutti i prodotti siano personalizzati, non attribuire forniture complete di impianti energetici senza evidenza, non divulgare dati finanziari interni. Non inventare materiali, tolleranze, certificazioni o prestazioni.

**Test:** p10-marketing.test.cjs e p10-marketing-browser.cjs proteggono il messaggio nelle quattro lingue, su Home, catalogo, schede, settori e richieste contestuali.
