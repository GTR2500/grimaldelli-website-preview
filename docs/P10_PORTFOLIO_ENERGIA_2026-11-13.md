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

## Aggiornamento operativo: fotografie dal NAS aziendale (13 novembre 2026)

L'accesso con Desktop Commander, account **Lavoro**, è riuscito. La precedente segnalazione di blocco era riferita all'account Backup, non all'account Lavoro.

La cartella principale Fotovoltaico contiene **235 directory di primo livello**, molte delle quali sono amministrative o modelli. Il primo censimento ha identificato **46 cartelle di commesse con raccolte fotografiche di almeno quattro immagini**. Sono stati generati ed esaminati **12 provini di commesse**, selezionando gli scatti più pertinenti al sito.

Sono stati aggiunti al repository, su `dev/p10-ftv-nas-20261113`, **8 progetti e 32 fotografie** (4 per progetto) ottimizzate in WebP senza metadati EXIF:

| Realizzazione | Località | Anno da cartella di commessa |
|---|---|---:|
| Bettoni Gaia | Bordolano (CR) | 2023 |
| Baldini | Borgo Virgilio (MN) | 2023 |
| Parati | Madignano (CR) | 2023 |
| GO FARM Gozzini | Casalmorano (CR) | 2023 |
| Severgnini | Casale Cremasco (CR) | 2023 |
| Salomoni | Cremona (CR) | 2024 |
| Orsini | Montanaso Lombardo (LO) | 2023 |
| Livraschino (Morandi) | Castelverde (CR) | 2024 |

Le nuove gallerie sono gestite da `assets/energy/photovoltaic-nas/manifest.json`, senza URL di rete, path UNC, nomi degli originali e dati personali. Il filtro editoriale ha scartato foto ripetitive, targhe dei componenti, misure e schermate di controllo. Il caso Canavesi non è stato pubblicato perché le immagini disponibili nel primo campione non erano sufficientemente rappresentative.

Il portafoglio Fotovoltaico comprende ora **13 casi distinti**: 8 appena selezionati dal NAS più 5 dal sito storico e dalla raccolta Instagram. Il portafoglio Energia complessivo presenta **21 casi**, di cui 8 Biogas e 13 Fotovoltaico.

**Importante:** gli anni riportati sono riferimenti della cartella di commessa, non prove di collaudo o completamento. Non vengono indicate potenze per le nuove 8 commesse, perché questo dato non è stato verificato. I dettagli tecnici e le responsabilità contrattuali andranno controllati sulla documentazione tecnica prima di aggiungere descrizioni più specifiche.

### Materiale non importato

- Documenti di rendicontazione GSE, pratiche autorizzative, preventivi, documenti commerciali, report amministrativi.
- Fotografie di targhette e numeri di serie, misuratori e identificativi.
- Altre fotografie delle 46 raccolte candidate non ancora sottoposte a selezione editoriale.

### Stato rilascio

- Sviluppo nel branch GitHub, senza copie DEV permanenti.
- Sintassi e test Chromium delle quattro lingue richiesti prima del merge.
- Il sito ufficiale Aruba resta invariato.
- Da completare in futuro la selezione estesa sulle restanti cartelle e una revisione dei dati tecnici e delle liberatorie applicabili.
