# P10 - Parità multilingue e moduli nativi per Aruba
Data: 12/11/2026
Ambito: sviluppo del nuovo sito nel repository GitHub Grimaldelli.
Branch: `dev/p10-parity-forms-20261112`
Stato: pronto per pubblicazione nell'anteprima GitHub Pages. **Invio moduli non attivo su GitHub Pages**.

## Interventi
- Corretto il taglio visivo dei caratteri nei titoli di EN/FR/DE (spaziatura e line-height; controllo screenshot).
- Pagina Azienda: un solo markup completo IT/EN/FR/DE con intervista, 4 capitoli, 5 tappe, fonti e collegamenti alla pubblicazione originale.
- Home EN/FR/DE: ripristinati marquee dei settori e fascia editoriale/fotografica presenti in IT.
- Dicono di noi EN/FR/DE: ripristinata la galleria fotografica a 6 immagini e la sezione dedicata a relazioni/comunità.
- Uniformate le etichette delle soluzioni nelle quattro lingue.
- Contatti e Lavora con noi: moduli nativi HTML/CSS/JS, senza Jotform e senza link diretti email per l'invio. I campi sono disponibili in IT/EN/FR/DE; allegati CV PDF/DOC/DOCX, fino a 10MB.
- Backend previsto per il dominio aziendale: PHP 8.2+, `api/csrf.php`, `api/submit.php`, `api/common.php`. Sicurezza con CSRF, cookie tecnico HttpOnly/SameSite Strict, rate limit, honeypot, validazioni server, filtro MIME + firme file. I CV vengono trattati temporaneamente per l'invio e non archivisti in un database del sito.
- Privacy e Cookie Policy aggiornate in quattro lingue per documentare i moduli e il cookie tecnico.
- Istruzioni installazione: `docs/P10_MODULI_ARUBA_CONFIGURAZIONE.md`.

## Verifiche eseguite
- CI GitHub Actions: `P10 - Syntax check JavaScript and PHP`: successo (JS e PHP).
- Browser Chromium su file del branch, 4 lingue × 4 larghezze schermo (320, 375, 768, 1440 px):
  - 64 rotte principali esaminate: PASS
  - 32 verifiche sui moduli Contatti e Candidature: PASS
  - 16 verifiche della pagina Azienda: 4 capitoli + 5 tappe + intervista + 2 link: PASS
  - Zero errori JS, zero risorse mancanti, zero immagini rotte, zero overflow rilevato.
  - Simulazione invio sull'anteprima: risposta esplicita di indisponibilità, **nessuna trasmissione di dati**.
- Confronto struttura italiana vs tre versioni estere sulle 10 rotte principali: 40 varianti, conteggio sezioni/articoli/immagini senza differenze dopo le correzioni.
- QA visivo tramite screenshot di Home e Azienda EN/FR/DE (desktop e mobile), nessun carattere troncato rilevato.

## Blocchi prima del deploy Aruba
1. Confermare servizio hosting reale (il piano storico P10 indicava migrazione Windows Server/Plesk al 26/11/2026: evento futuro non considerato già eseguito), versione PHP 8.2+ e modulo `mbstring`, `fileinfo`, sessioni, invio email.
2. Definire il destinatario autorizzato delle candidature; non inviare CV a caselle non approvate.
3. Configurare segreti e mittente verificato **fuori dalla cartella pubblica** (vedi guida).
4. Testare `mail()` e consegna effettiva con la posta Grimaldelli Microsoft 365: verificare SPF/DKIM/DMARC e cartelle antispam. `mail()=true` non prova la consegna.
5. Verificare processi HR, autorizzazioni, antivirus allegati e tempi di conservazione, validare ufficialmente Privacy Policy e Cookie Policy.
6. Attivare solo dopo test HTTPS, invio contatti e CV, input invalidi, protezione anti-abuso, ricezione, e approvazione CTO.
7. Nessuna modifica al sito pubblico `glcgrimaldelli.com`, DNS o Aruba in questa attività.

## Repository
Repository di sviluppo unico: https://github.com/GTR2500/grimaldelli-website-preview
Nessun clone permanente da mantenere su MZB: cartella QA temporanea da eliminare al termine.
