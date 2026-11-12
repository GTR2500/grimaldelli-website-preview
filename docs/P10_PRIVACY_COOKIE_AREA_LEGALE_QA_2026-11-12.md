# P10 - Verifica privacy, cookie e Area legale
Data: 12 novembre 2026
Ambiente: GitHub DEV, branch `dev/p10-privacy-cookie-fixes-20261112`
Stato: implementazione in DEV, **non pronta per produzione senza verifiche finali**.

## Fatto e verificato
- Copiati nel repository 12 PDF pubblici dal sito `https://www.glcgrimaldelli.com/area_legale/` in `legal-docs/`, 2.587.044 byte complessivi.
- Documenti verificati con intestazione `%PDF-`, fine file `%%EOF` e SHA-256; il manifest conserva hash e URL originale.
- Tutti i 12 link dei PDF in `area-legale.html` sono relativi al repository; sono aggiunti anche i link alle policy del nuovo sito `privacy-sito.html` e `privacy-cookie.html`.
- Le vecchie policy PDF restano copie originali d'archivio, non sostituiscono le policy del nuovo sito. Il vecchio PDF cookie dichiara Google Analytics; nel codice esaminato del nuovo sito non c'e' tale integrazione.
- I form della demo sono ancora dimostrativi e non inviano dati o CV; aggiornata la navigazione dalla nota privacy del modulo alla nuova informativa.
- `node --check site.js` superato.
- Il branch `main` e GitHub Pages non sono stati modificati, e nessun deploy su dominio o Aruba e' stato eseguito.
- Clone Git temporaneo utilizzato per importazione e push; non deve rimanere una copia permanente di `D:\Dev\grimaldelli-website-preview`.

## Test dinamico eseguito sul sito attualmente visibile su GitHub Pages (main)
- URL: `https://gtr2500.github.io/grimaldelli-website-preview/`
- Browser headless Chromium, nuovo contesto isolato senza cookie preesistenti, service worker disabilitati.
- Percorsi visitati: home, azienda, soluzioni, prodotti, realizzazioni, dicono-di-noi, contatti, lavora-con-noi (8 di 8).
- 33 richieste osservate; host richiesti: **solo** `gtr2500.github.io`.
- Nessun `Set-Cookie` registrato; cookie browser: `[]`; localStorage: `[]`; sessionStorage: `[]`; iframe presenti nell'ultima pagina: 0; errori JavaScript: 0.
- Non sono stati aperti social o PDF esterni, perche' richiedono un clic.
- Questo test non e' un collaudo browser del branch DEV, che non e' pubblicato. Non prova il comportamento di tutti i browser, dei servizi del provider o del futuro hosting Aruba.

## Valutazione informativa
- La Cookie Policy del vecchio sito **dichiara Google Analytics** e cita procedure di browser ormai datate; non va riutilizzata come policy attuale del nuovo sito.
- La Privacy Policy PDF storica contempla dati di navigazione, moduli Contatti e Lavora con noi e indica base art. 6.1(b) GDPR per i moduli; non stabilisce una retention precisa per i CV, rinviando alla richiesta di informazioni. Contiene descrizioni da verificare rispetto al nuovo runtime e al servizio di ricezione futuro.
- Nella bozza del nuovo sito sono inclusi: titolare, contatto privacy ufficiale `privacy@glcgrimaldelli.com`, trattamento tecnico di navigazione, demo form, diritti, link ai PDF e precisazioni su soggetti esterni. Richiesta approvazione del titolare/referente privacy.

## Decisioni e blocchi residui
1. Definire il servizio effettivo per ricezione e conservazione di richieste e CV; introdurre misure tecniche per allegati e gestione autorizzazioni.
2. Validare formalmente informativa Contatti, informativa Candidati, basi giuridiche, destinatari, eventuali trasferimenti, cancellazione e tempi di conservazione.
3. Verificare date di validita', campo di certificazione e approvazione dei 5 certificati prima del rilascio.
4. Effettuare il test completo dei cookie **sull'hosting definitivo**, dopo configurazione TLS, moduli, DNS, terze parti, firewall e log. Se si introducono strumenti non tecnici, applicare un consenso preventivo correttamente gestito.
5. Effettuare QA reale sulle pagine del branch DEV prima di un merge in `main`; l'assenza di errori sintattici JS non equivale ad accettazione funzionale.

Fonti regolamentari:
- https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876
- https://www.garanteprivacy.it/faq/Cookie
