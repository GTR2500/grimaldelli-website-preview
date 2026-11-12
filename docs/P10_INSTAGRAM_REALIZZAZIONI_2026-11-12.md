# P10 — Materiali Instagram integrati nell’anteprima

Data: 12 novembre 2026. Repository: `GTR2500/grimaldelli-website-preview`.

## Stato delle fonti

La chat precedente di raccolta Instagram aveva catalogato **30 contenuti**, di cui **13 reel e 17 post/caroselli**, ma aveva registrato permalink e descrizioni, **non i file MP4 e le fotografie originali**. Non si deve dichiarare un download fisico mai verificato.

Attraverso il profilo Instagram ufficiale Grimaldelli sono stati verificati e selezionati i seguenti contenuti, direttamente attribuiti alla pubblicazione aziendale:

| ID | Ambito | Fonte originale | Nota documentale |
|---|---|---|---|
| biloni | Zootecnia | https://www.instagram.com/grimaldellisrl/p/DfnCdbEIRz8/ | Azienda Agricola Biloni, Trigolo (CR): ristrutturazione prima stalla completata, carosello del 11/11/2026 |
| cadilana | Zootecnia | https://www.instagram.com/grimaldellisrl/reel/DfiO5WDOkg9/ | Reel del 09/11/2026; hashtag stalla, benessere animale, bovini da latte, robot milking; località indicata Cadilana |
| bosetti | Zootecnia | https://www.instagram.com/grimaldellisrl/reel/Cs5KMF3Ivcp/ | Reel storico con dicitura Bosetti Farm |
| franciosi | Zootecnia | https://www.instagram.com/grimaldellisrl/p/CddN6WFKW2H/ | Stalla da 8000 m² in costruzione (testo originale del post) |
| risaia | Zootecnia | https://www.instagram.com/grimaldellisrl/p/CcXNY82K4dd/ | Risaia del Duca; tema comfort animale |
| nisoli | Fotovoltaico | https://www.instagram.com/grimaldellisrl/p/CvrdB_ionuY/ | Nisoli, Brignano Gera d’Adda (BG); post riferisce rimozione eternit e fotovoltaico da 122 kW |
| ginelli | Fotovoltaico | https://www.instagram.com/grimaldellisrl/p/CvrJrWbItUF/ | Ginelli, Bagnolo Cremasco; post riferisce fotovoltaico da 75 kW |

Le date non dichiarate nelle caption recuperate **non sono state inventate**: sul sito sono indicate come archivio.

## Implementazione

- `site-instagram.js` contiene i dati, i testi IT/EN/FR/DE e il caricamento su richiesta.
- `editorial.css` mantiene impaginazione corporate responsive.
- `site.js` attiva il modulo nelle sezioni: Home (2 post recenti), Realizzazioni (7), Zootecnia / Stalle (3), Fotovoltaico (2).
- `index.html` carica lo script locale con parametro di versione per la cache.
- Il clic del visitatore su **Visualizza il contenuto** crea un iframe Instagram; fino a quel momento **non vengono richiesti asset, cookie o script Meta**.
- Un collegamento esterno diretto a Instagram rimane sempre disponibile se l’iframe viene bloccato.
- Le quattro Cookie Policy documentano il caricamento opzionale di contenuti esterni e il possibile trattamento dati da parte di Meta.
- Nessuna modifica al backend dei moduli, ai DNS o al dominio ufficiale.

## QA e vincoli

- CI GitHub Actions: verifica sintassi JavaScript e PHP; test JS di cinque route e quattro lingue con asserzione che nessun iframe sia creato prima del clic, e che il contenuto venga rimosso alla chiusura.
- Questo aggiornamento riusa **i contenuti reali online** tramite embed, non genera fotografie, non usa foto di terzi per simulare lavori Grimaldelli e non archivia copie dei media.
- Per una futura versione indipendente da Instagram conviene ottenere l’esportazione autorizzata degli originali: JPG/PNG/HEIC/MP4 e relative caption. Convertire immagini in WebP/AVIF e video in MP4/WebM con poster locale, sottotitoli e `preload=none`, conservando fonte e autorizzazioni, quindi sostituire progressivamente gli embed.
- Le strutture e gli interventi descritti nei singoli post non devono essere attribuiti a Grimaldelli oltre quanto dichiarato dalla fonte. In particolare per i progetti fotovoltaici non va dedotta la realizzazione di un impianto completo quando il perimetro esatto non è documentato.
