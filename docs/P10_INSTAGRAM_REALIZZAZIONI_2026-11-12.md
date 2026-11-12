# P10 — Integrazione nativa di fotografie e video dei lavori

Stato aggiornato: 12 novembre 2026, ramo `dev/p10-media-local-firstparty-20261112`.

## Obiettivo

Mostrare **foto e video reali dei lavori all'interno del sito**, senza iframe Instagram e senza rimandare il visitatore a un social network. Codice, asset e manifest restano in GitHub come unica fonte di sviluppo; nessuna copia permanente sul PC DEV.

## Materiali acquisiti e salvati in Git

Sono stati recuperati i media associati a sette pubblicazioni del profilo aziendale Grimaldelli. Prima del recupero erano disponibili soltanto i permalink; ora sono presenti originali derivati e ottimizzati.

- **21 file immagine WebP**, comprese le copertine dei video.
- **3 video MP4**, uno ciascuno per Biloni, Cadilana e Bosetti, ottimizzati in H.264/AAC e con precaricamento disattivato.
- `assets/instagram/manifest.json` associa gli identificativi dei lavori ai file locali effettivamente presenti.
- I media sono serviti dalla stessa origine del sito. Non esistono dipendenze CDN Instagram nei componenti Realizzazioni.

| Lavoro | Origine contenuto | Collocazione | Tipo |
|---|---|---|---|
| Azienda Agricola Biloni | `https://www.instagram.com/p/DfnCdbEIRz8/` | Home, Realizzazioni, Zootecnia | Video e copertine |
| Cadilana | `https://www.instagram.com/reel/DfiO5WDOkg9/` | Home, Realizzazioni, Zootecnia | Video e copertine |
| Bosetti Farm | `https://www.instagram.com/reel/Cs5KMF3Ivcp/` | Realizzazioni, Zootecnia | Video e copertine |
| Franciosi (stalla da 8.000 m²) | `https://www.instagram.com/p/CddN6WFKW2H/` | Realizzazioni | Foto |
| Risaia del Duca | `https://www.instagram.com/p/CcXNY82K4dd/` | Realizzazioni | Foto |
| Nisoli (fotovoltaico 122 kW) | `https://www.instagram.com/p/CvrdB_ionuY/` | Realizzazioni, Fotovoltaico | Foto |
| Ginelli (fotovoltaico 75 kW) | `https://www.instagram.com/p/CvrJrWbItUF/` | Realizzazioni, Fotovoltaico | Foto |

## Comportamento frontend

- `site-instagram.js` legge solo `assets/instagram/manifest.json`. Non visualizza i contenuti per cui non esistono file.
- Fotografie in galleria con scorrimento precedente/successivo e apertura in un lightbox nativo.
- Video con elemento HTML5 `<video controls playsinline preload="none">`, copertina locale e nessun autoplay.
- Nessun iframe, pulsante Instagram, uscita verso un social o richiesta a Meta nella galleria.
- Traduzioni complete IT, EN, FR, DE. Nessuna replica superflua di file tra lingue.
- L'Area legale / Cookie Policy in quattro lingue descrive la distribuzione diretta dei media, senza cookie di terze parti.
- Il profilo Instagram resta documentato qui come fonte; **non compare come collegamento sostitutivo alle immagini nel componente**.

## Verifiche

- Sono stati verificati su branch GitHub asset e dimensioni non nulle, inclusi i video locali.
- Test funzionali: 4 lingue × 5 tipologie di pagina, nessuna uscita o incorporamento esterno, manifest di stessa origine, tutti i percorsi file esistenti.
- Test browser Chromium su 4 lingue × 4 rotte × 2 viewport (mobile 390 px / desktop 1440 px), senza errori JS o richieste esterne; controllata la navigazione della galleria fotografica.
- Dopo l'eventuale merge, verificare che il deploy GitHub Pages abbia effettivamente pubblicato il commit aggiornato e non una cache precedente.

## Vincoli

- Le descrizioni commerciali devono attenersi al perimetro dei lavori effettivamente svolti da Grimaldelli; per il fotovoltaico non attribuire indiscriminatamente la realizzazione dell'impianto completo.
- Per ogni media utilizzato serve confermare titolarità aziendale e liberatorie/diritti di riuso e riprese di terzi, quando applicabili.
- Nessun intervento su Aruba, DNS o sito pubblico ufficiale senza autorizzazione e collaudo.
