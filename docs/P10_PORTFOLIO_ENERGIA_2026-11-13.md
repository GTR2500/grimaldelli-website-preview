# P10 | Potenziamento settori Biogas/Biometano e Fotovoltaico

Data: 13 novembre 2026. Repository unico GitHub: `GTR2500/grimaldelli-website-preview`.

## Obiettivo e scelta editoriale

Riequilibrare la presentazione dei quattro ambiti industriali (carpenteria, zootecnia, biogas/biometano, fotovoltaico) senza attribuire alla società attività che le fonti non dimostrano. Le realizzazioni sono presentate con foto originali selezionate, ubicazione e potenza dichiarata dell'impianto dove nota; quest'ultima **non dimostra** un incarico EPC né il perimetro della fornitura Grimaldelli.

## Biogas e Biometano — archivio storico recuperato

Fonte aziendale: https://www.glcgrimaldelli.com/category/biogas/

**8 progetti**, con potenza dichiarata e foto documentate:

- Lupo Stanghellini — Chieve (CR), 300 kW
- Rota — Villanova del Sillaro (LO), 300 kW
- Bianchessi — Castelgabbiano (CR), 300 kW
- Rota — Corte Palasio (LO), 300 kW
- Campagnari — Marmirolo (MN), 300 kW
- Quarantore — San Martino dall'Argine (MN), 249 kW
- Balestrieri — San Daniele Po (CR), 300 kW
- Bondenta — Campagnola Cremasca (CR), 300 kW

Importati via GitHub Actions da pagine originali, conversione WebP e catalogazione della URL di ciascuna immagine. Ogni scheda mostra massimo quattro scatti selezionati e un'immagine di copertina. Uno screenshot del sistema di controllo non è stato proposto come foto di copertina.

Manifest: `assets/energy/biogas/manifest.json`. Origine conservata in ogni record.

## Fotovoltaico — archivio pubblico e raccolta precedente

Fonte aziendale: https://www.glcgrimaldelli.com/category/fotovoltaico/

Recuperati 4 post con foto storiche:
- Franciosi — Ossago Lodigiano (LO), 345,6 kW
- Aurora — Credera Rubbiano (CR), 122,4 kW
- Locatelli — Castelvisconti (CR), 122,4 kW
- Nisoli — Brignano Gera d'Adda (BG), 122,4 kW

Integrati con il materiale locale già importato dal profilo aziendale:
- Nisoli (riunito in un'unica scheda, senza duplicare il lavoro)
- Ginelli — Bagnolo Cremasco (CR), 75 kW

Totale **5 realizzazioni Fotovoltaico distinte**. Alcune fotografie provengono dai vecchi articoli aziendali; altre dalla raccolta Instagram precedente e sono già file locali nel repository.

Manifest: `assets/energy/photovoltaic/manifest.json`. Selezionate copertine dei tetti con pannelli, evitando come foto principali schermate di monitoraggio e dettagli di quadri.

## Come si presenta il sito

- Home: quattro aree originarie conservate; una sezione nuova mette in evidenza Biogas/Biometano e Fotovoltaico con vere fotografie e accesso alle pagine dedicate.
- Soluzioni: le due copertine Energia non sono più illustrazioni concettuali, ma immagini autentiche dai lavori pubblicati.
- Pagina Biogas/Biometano: 8 schede con fotografie, località, potenza dell'impianto, perimetro industriale espresso correttamente.
- Pagina Fotovoltaico: 5 schede con fotografie e dati verificati.
- Realizzazioni: una sezione energia dedicata con 13 casi, gallerie locali, nessuna uscita verso social.
- Parità per IT/EN/FR/DE e layout responsive.
- Tutte le fotografie vengono servite dal sito; nessun caricamento da WordPress o Meta in questi componenti.

## Controlli e vincoli

- GitHub Actions: verifiche di sintassi JS/PHP, test Javascript su 4 lingue, 4 rotte e manifest (8+5 realizzazioni).
- QA browser Chromium su desktop e mobile: test 32 combinazioni route/lingua/schermo, immagini caricate, overflow, console e HTTP.
- Non vengono modificati DNS, sito pubblico ufficiale o Aruba.
- Il repository GitHub resta la fonte unica.

## Parte non conclusa — archivio \\server

La richiesta originale include la scansione completa del percorso:

`\\server\Energie\Fotovoltaico\FTV - GRIMALDELLI\Bettoni Gaia - Bordolano - CR\2023 - FTV11734\10. GSE\DOCS RENDICONTAZIONE\FOTO`

Il connettore Desktop Commander su MZB ha restituito il blocco **limite mensile raggiunto**. L'archivio UNC non è stato letto, quindi **non** dichiariamo selezionate le fotografie di Bettoni Gaia né censite tutte le commesse esistenti sulla condivisione.

Quando tornerà disponibile il collegamento, la priorità sarà leggere l'indice delle commesse fotovoltaiche, generare provini, fare selezione editoriale di 3–5 immagini per intervento, verificare diritti di pubblicazione, metadata e classificazione, integrare i casi aggiuntivi senza duplicati. Non importare file di rendicontazione e documenti GSE non destinati alla pubblicazione.

## Attività successive

1. Verifica qualitativa e approvazione dei testi tecnici e delle fotografie delle 13 realizzazioni inserite.
2. Accesso al NAS aziendale e completamento selezione Fotovoltaico dagli originali.
3. Per ciascun caso: se disponibili, dati verificati sulla lavorazione eseguita, materiali, componenti e ruolo Grimaldelli; evitare la semplice ripetizione delle potenze.
4. Test finale sul dominio ufficiale e collaudo form; nessun deploy in produzione senza autorizzazione.
