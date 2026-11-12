# P10 | Attivazione moduli su Aruba

## Architettura

I moduli "Parla con noi" e "Lavora con noi" sono scritti nel codice del sito, senza Jotform, WordPress o servizi di form esterni.

- Frontend: `site-forms.js` (IT, EN, FR, DE) sullo stesso dominio del sito.
- Server: `api/csrf.php` e `api/submit.php` (PHP **8.2 o successivo**).
- Contatti: nome, email, eventuale telefono/località, messaggio.
- Candidature: nome, cognome, email, campi facoltativi, presentazione, CV PDF/DOC/DOCX fino a 10 MB.
- Invio via `mail()` PHP, allegato CV inoltrato per email, **nessun database né archivio permanente del CV sul server**.
- Misure implementate: HTTPS, origin e host verificati, token CSRF con cookie di sessione tecnico SameSite Strict/HttpOnly, honeypot, tempo minimo di compilazione, rate limit, campi validati lato server, estensione/MIME/firma file, messaggi di errore senza esposizione di dati.
- GitHub Pages non esegue PHP: i moduli si vedono per la revisione ma non trasmettono dati. Nessuna simulazione di esito positivo.

## Preparazione ambiente Aruba

Il servizio di hosting attuale deve essere verificato prima del caricamento. L'ultimo contesto P10 indica una migrazione programmata il 26/11/2026 verso Windows Server 2022/Plesk, **non attestata come completata**. Testare le funzionalità reali sul servizio scelto.

1. Verificare che il dominio finale usi HTTPS e PHP 8.2+ con `mbstring`, `fileinfo` e sessioni funzionanti. Se si accettano DOCX, raccomandata l'estensione `ZipArchive`.
2. **Fuori dalla cartella pubblica del sito**, creare `p10-private/forms.php`, in una directory sorella di `httpdocs` (o della docroot effettiva). Il percorso viene risolto da `api/common.php` con `dirname(__DIR__, 2)`. Modificare il percorso soltanto dopo aver verificato la struttura reale dell'hosting.
3. Inserire questa configurazione **fuori dal repository e fuori dall'area web**; non inserire password o segreti in Git:

```php
<?php
return [
  'enabled' => false, // impostare true SOLO dopo test ed approvazione
  'contact_to' => 'info@glcgrimaldelli.com',
  'career_to' => 'DA_DEFINIRE_CON_RISORSE_UMANE',
  'sender' => 'MITTENTE_VERIFICATO_SUL_DOMINIO',
  'rate_secret' => 'GENERA_QUI_UN_SEGRETO_CASUALE_DI_ALMENO_32_BYTE',
];
```

4. Confermare con l'azienda la **casella destinataria delle candidature** e gli autorizzati che ricevono i CV. È attualmente lasciata non configurata per non inoltrare dati HR a un indirizzo non approvato.
5. Testare nel pannello Aruba **Gestione PHP → Test PHP mail()**. Con posta Microsoft 365 sul dominio `glcgrimaldelli.com`, verificare SPF/DKIM/DMARC e l'uso di un mittente autorizzato: il solo esito positivo di `mail()` **non garantisce la consegna nella casella**.
6. Se il server non consente un invio autenticato e affidabile con `mail()`, sostituire il livello di consegna con SMTP autenticato **senza salvare credenziali in Git**. Questa variante richiede una verifica separata.
7. Accertarsi che il processo PHP abbia una directory temporanea scrivibile per sessioni e limitatore antispam; non sono previsti percorsi pubblici per conservare CV.
8. Approvare Privacy Policy e Cookie Policy per moduli attivi; il cookie di sessione del token CSRF è tecnico e non richiede consenso per profilazione.
9. Provare invio reale in tutte le lingue, messaggi e CV con allegati ammessi/non ammessi, formati e dimensioni fuori soglia, rate limit, CSRF, HTTPS e verifica di ricezione in casella autorizzata. Verificare i messaggi anche nelle cartelle antispam, senza inviare CV veri nei test.
10. In caso di errore o mancata consegna, mantenere `enabled=false`. Solo dopo esito completo e autorizzazione è possibile abilitare il servizio.

## Vincoli operativi

- **Nessun deploy** su Aruba o dominio ufficiale è implicito nella preparazione di questi file.
- La prova automatica locale del codice PHP non equivale a prova della configurazione PHP di Aruba, né a prova di recapito.
- Nessuna informazione sulla presenza di un backend va mostrata come testo di lavorazione nella pagina pubblica.
- Evitare qualsiasi backup contenente CV non autorizzati. Per le email ricevute va definita la retention e la governance degli accessi.
