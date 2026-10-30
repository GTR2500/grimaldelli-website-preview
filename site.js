/* GRIMALDELLI V3 - private editorial prototype; forms never submit or store files. */
(()=>{
'use strict';
if (!document.querySelector('link[href*="press-editorial.css"]')) { const p = document.createElement('link'); p.rel = 'stylesheet'; p.href = 'press-editorial.css?v=20261030'; document.head.appendChild(p); }
const D=window.GRIMALDELLI_DATA||{categories:[]};
const products=D.categories||[];
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const by=s=>products.find(p=>p.slug===s);
const image=(s,n=0)=>by(s)?.images?.[n]?.src||'assets/media/600ba26f7253d243.webp';
const heroPhoto=image('stalle',0);
const otherPhoto=image('strutture-industriali',0);
const zootPhoto=image('autocatture',0);
const sedePhoto='https://www.glcgrimaldelli.com/wp-content/uploads/2019/04/14608710_546150492261299_4874517992908070430_o.jpg';
const sedePhotoFallback='https://www.glcgrimaldelli.com/wp-content/uploads/2019/04/14608710_546150492261299_4874517992908070430_o-300x129.jpg';
const energy=(kind)=>kind==='biogas'?'assets/biogas-concept.svg':'assets/fotovoltaico-concept.svg';
const escapeHtml=v=>String(v??'').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
const photo=(src,alt='',cl='',load='lazy')=>`<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" class="${cl}" loading="${load}">`;
const action=(label,url,cls='button-primary')=>`<a href="${url}" class="${cls}">${label}<span class="circ" aria-hidden="true">&#8599;</span></a>`;
const eyebrow=(label,dark=false)=>`<div class="eyebrow ${dark?'on-dark':''}">${label}</div>`;
const top=(ey,title,desc='',dark=false)=>`<div class="section-top reveal"><div>${eyebrow(ey,dark)}<h2>${title}</h2></div>${desc?`<p class="section-lead">${desc}</p>`:''}</div>`;
const hero=(ey,title,desc,src='',idx='')=>`<section class="page-hero ${src?'photo':''}">${src?photo(src,'','', 'eager'):''}<div class="section-container">${eyebrow(ey,true)}<h1>${title}</h1><p>${desc}</p></div><span class="page-index">GRIMALDELLI / ${idx}</span></section>`;
const tag=(g)=>g==='strutture'?'Strutture':g==='zootecnia'?'Zootecnia':g==='modelli'?'Linea storica':'Archivio';
const sol=[
  {slug:'strutture',idx:'01',name:'Strutture<br>metalliche',label:'Carpenteria e strutture',img:image('stalle',0),type:'foto',desc:'Dalle strutture per il settore agricolo alle applicazioni industriali.'},
  {slug:'zootecnia',idx:'02',name:'Attrezzature<br>zootecniche',label:'Spazi di allevamento',img:image('autocatture',0),type:'foto',desc:'Allestimenti e attrezzature per gli ambienti dedicati agli animali.'},
  {slug:'biogas',idx:'03',name:'Impianti<br>biogas',label:'Energia e impianti',img:energy('biogas'),type:'concept',desc:'Attivita presente sul sito online. Fotografie e approfondimenti da integrare.'},
  {slug:'fotovoltaico',idx:'04',name:'Impianti<br>fotovoltaici',label:'Energia rinnovabile',img:energy('fotovoltaico'),type:'concept',desc:'Attivita presente sul sito online. Fotografie e approfondimenti da integrare.'}
];
let observer=null;
let selectedGroup='tutti';
let query='';
let lightImages=[];
let lightIndex=0;
let prevRoute='';
const app=$('#app');
const siteFooter=$('#site-footer');
function getPath(){let h=location.hash.replace(/^#/, '')||'/';let parts=h.split('?');return {path:decodeURIComponent(parts[0]),params:new URLSearchParams(parts[1]||'')};}
function baseFooter(){siteFooter.className='footer';siteFooter.innerHTML=`<div class="section-container"><div class="footer-top"><div>${eyebrow('REALIZZIAMO INSIEME',true)}<h2>Un progetto<br><span class="serif accent">da immaginare?</span></h2></div>${action('Contattaci','#/contatti','button-ghost')}</div><div class="footer-bottom-grid"><div><a href="#/" class="footer-logo-panel">${photo('assets/grimaldelli-logo-originale.png','Grimaldelli logo')}</a><p style="font-size:12px;color:#b5c0ba;max-width:260px;line-height:1.8;margin-top:25px">Carpenteria metallica, zootecnia e soluzioni per gli impianti. Il valore di una storia industriale.</p></div><div class="footer-col"><label>Esplora</label><a href="#/azienda">Azienda</a><a href="#/soluzioni">Soluzioni</a><a href="#/prodotti">Prodotti</a><a href="#/realizzazioni">Realizzazioni</a><a href="#/dicono-di-noi">Dicono di noi</a></div><div class="footer-col"><label>Contatti</label><a href="tel:+39037372435">+39 0373 72435</a><a href="mailto:info@glcgrimaldelli.com">info@glcgrimaldelli.com</a><p>Strada Provinciale 20<br>26010 Salvirola (CR)</p></div><div class="footer-col"><label>Azienda</label><a href="#/contatti">Richiedi informazioni</a><a href="#/lavora-con-noi">Lavora con noi</a><a href="https://www.glcgrimaldelli.com/area_legale/" target="_blank" rel="noopener noreferrer">Area legale sul sito attuale &#8599;</a><p>Grimaldelli SRL &middot; P.IVA 01190000198</p></div></div><div class="footer-social-row"><div><span class="social-caption">SEGUI GRIMALDELLI</span><p>Storie, lavorazioni e realizzazioni dai nostri canali ufficiali.</p></div><div class="social-links">${socialLinks()}</div></div><div class="footer-line"><span>&copy; Grimaldelli - Anteprima privata finale - nessuna pubblicazione</span><span>Identita e fotografie originali &middot; Contenuti in validazione</span></div></div>`;}

const officialSocials=[
  {name:'Instagram',abbr:'IG',url:'https://www.instagram.com/grimaldellisrl/'},
  {name:'Facebook',abbr:'FB',url:'https://www.facebook.com/grimaldelli'},
  {name:'LinkedIn',abbr:'IN',url:'https://www.linkedin.com/company/grimaldelli-srl'},
  {name:'YouTube',abbr:'YT',url:'https://www.youtube.com/@grimaldellisrl2669'},
  {name:'WhatsApp',abbr:'WA',url:'https://wa.me/39037372435'}
];
function socialLinks(){return officialSocials.map(x=>`<a class="social-pill" href="${x.url}" target="_blank" rel="noopener noreferrer" aria-label="Grimaldelli su ${x.name}"><span>${x.abbr}</span>${x.name}<b aria-hidden="true">&#8599;</b></a>`).join('');}
const coverage=[
  {
    "id": "impresa",
    "type": "Intervista",
    "date": "15 novembre 2025",
    "publication": "La Provincia",
    "sup": "Vite d’impresa",
    "title": "Un secolo di impresa, una visione rivolta al futuro",
    "summary": "Dalle origini nel 1921 alle tecnologie di progettazione tridimensionale: Claudio Grimaldelli racconta come esperienza, ricerca e persone guidano lo sviluppo dell’azienda a Salvirola.",
    "quote": "Le risorse umane sono il pilastro della nostra operatività quotidiana",
    "href": "https://edicola.laprovinciacr.it/vnprovincia/books/impresa/2025/20251115impresa/pdf/issue.pdf",
    "imageCategory": "stalle",
    "imageIndex": 0,
    "imageAlt": "Struttura metallica per allevamento realizzata da Grimaldelli",
    "imageNote": "Fotografia d’archivio Grimaldelli · immagine di contesto",
    "tier": "featured"
  },
  {
    "id": "felix",
    "type": "Riconoscimenti",
    "date": "20 marzo 2026",
    "publication": "Cremaoggi",
    "sup": "Economia e territorio",
    "title": "Grimaldelli premiata tra le 70 imprese della Lombardia",
    "summary": "Il quotidiano racconta il riconoscimento Industria Felix ricevuto a Milano e raccoglie il commento di Claudio Grimaldelli, che dedica il risultato al lavoro del team e agli investimenti in innovazione.",
    "quote": "È un risultato che condividiamo con tutto il nostro team",
    "href": "https://www.cremaoggi.it/2026/03/20/grimaldelli-srl-lazienda-di-salvirola-tra-le-70-imprese-piu-competitive-della-regione/",
    "imageCategory": "strutture-industriali",
    "imageIndex": 2,
    "imageAlt": "Architettura in carpenteria metallica nell’archivio Grimaldelli",
    "imageNote": "Fotografia d’archivio Grimaldelli · non della premiazione",
    "tier": "featured"
  },
  {
    "id": "cersi",
    "type": "Ricerca",
    "date": "2012",
    "publication": "Università Cattolica / CERSI",
    "sup": "Osservatorio sull’imprenditorialità",
    "title": "Grimaldelli come caso di studio dell’impresa cremonese",
    "summary": "L’Osservatorio CERSI dedica un approfondimento alla storia dell’azienda e alle scelte che ne hanno accompagnato l’evoluzione nel settore zootecnico.",
    "href": "https://centridiricerca.unicatt.it/cersi-20120920_Testo_OSSERVATORIO_2012.pdf",
    "imageCategory": "stalle",
    "imageIndex": 3,
    "imageAlt": "Interno di una struttura zootecnica presente nell’archivio Grimaldelli",
    "imageNote": "Fotografia d’archivio Grimaldelli",
    "tier": "story"
  },
  {
    "id": "pmiday19",
    "type": "Stampa locale",
    "date": "23 novembre 2019",
    "publication": "Il Nuovo Torrazzo",
    "sup": "Scuola e industria",
    "title": "Gli studenti alla scoperta della Grimaldelli",
    "summary": "Nel racconto del PMI Day, il settimanale documenta anche la visita degli studenti in azienda, con una fotografia e una didascalia dedicate.",
    "href": "https://ilnuovotorrazzo.it/wp-content/uploads/2019/12/23-novembre-2019.pdf",
    "imageCategory": "strutture-industriali",
    "imageIndex": 0,
    "imageAlt": "Vista di una realizzazione di carpenteria metallica Grimaldelli",
    "imageNote": "Fotografia d’archivio Grimaldelli · non della visita",
    "tier": "story"
  },
  {
    "id": "benessere",
    "type": "Intervento tecnico",
    "date": "12 dicembre 2018",
    "publication": "Regione Lombardia",
    "sup": "Incontri di settore",
    "title": "Claudio Grimaldelli interviene sul benessere bovino",
    "summary": "Un incontro tecnico regionale segnala il contributo di Claudio Grimaldelli sulla scelta delle attrezzature per le stalle da latte e sul benessere animale.",
    "href": "https://psr.regione.lombardia.it/it/pc1420/psr-2014-2022/archivio-eventi-2/stalle-da-latte-attrezzature-e-benessere-delle-bovine",
    "imageCategory": "autocatture",
    "imageIndex": 0,
    "imageAlt": "Attrezzatura zootecnica Grimaldelli per la gestione degli animali",
    "imageNote": "Fotografia d’archivio Grimaldelli",
    "tier": "story"
  },
  {
    "id": "inprimapagina",
    "type": "Segnalazione",
    "date": "aprile 2026",
    "publication": "inPRIMAPAGINA",
    "sup": "Industria Felix",
    "title": "Il riconoscimento Industria Felix sulla stampa locale",
    "summary": "Segnalazione dedicata alla presenza di Grimaldelli tra le aziende lombarde premiate. Riguarda lo stesso riconoscimento raccontato da Cremaoggi.",
    "href": "https://inprimapagina.com/node/33538",
    "imageCategory": "strutture-industriali",
    "imageIndex": 4,
    "imageAlt": "Struttura metallica dell’archivio Grimaldelli",
    "imageNote": "Immagine d’archivio",
    "tier": "archive"
  },
  {
    "id": "ansa",
    "type": "Comunicato stampa",
    "date": "17 marzo 2026",
    "publication": "ANSA / Industria Felix",
    "sup": "Fonte di settore",
    "title": "Industria Felix presenta le 70 imprese selezionate",
    "summary": "Nel comunicato diffuso su ANSA, Grimaldelli compare come azienda selezionata per la provincia di Cremona; non è un articolo redazionale indipendente.",
    "href": "https://www.ansa.it/pressrelease/economia/2026/03/17/industria-felix-il-decennale-della-lombardia-con-70-imprese-competitive_5bef40b7-e0ce-4bd4-b2a5-2182a56a7ff8.html",
    "imageCategory": "pensiline",
    "imageIndex": 1,
    "imageAlt": "Dettaglio di una copertura metallica realizzata da Grimaldelli",
    "imageNote": "Immagine d’archivio",
    "tier": "archive"
  },
  {
    "id": "industriafelix",
    "type": "Fonte ufficiale",
    "date": "marzo 2026",
    "publication": "Industria Felix",
    "sup": "Premio Lombardia",
    "title": "Il resoconto ufficiale della premiazione",
    "summary": "Il promotore dell’evento documenta la selezione regionale e la presenza di Grimaldelli. È una fonte primaria sul premio, non una nuova notizia.",
    "href": "https://www.industriafelix.it/industria-felix-in-lombardia-premiate-70-imprese-guida-milano-seguita-da-bergamo-lecco-e-pavia/",
    "imageCategory": "strutture-industriali",
    "imageIndex": 1,
    "imageAlt": "Struttura industriale nell’archivio Grimaldelli",
    "imageNote": "Immagine d’archivio",
    "tier": "archive"
  },
  {
    "id": "biogas",
    "type": "Catalogo di settore",
    "date": "2025",
    "publication": "Consorzio Italiano Biogas",
    "sup": "Impianti ed energia",
    "title": "Grimaldelli nel catalogo Biogas Italia",
    "summary": "La scheda del Consorzio presenta l’attività dell’azienda nel settore biogas e biometano, indicando Claudio Grimaldelli come referente.",
    "href": "https://www.consorziobiogas.it/wp-content/uploads/2025/01/web-BI-catalogo-soci-24-1.pdf",
    "imageCategory": "strutture-industriali",
    "imageIndex": 5,
    "imageAlt": "Carpenteria metallica dell’archivio aziendale",
    "imageNote": "Immagine d’archivio",
    "tier": "archive"
  },
  {
    "id": "pmiday18",
    "type": "Servizio associativo",
    "date": "dicembre 2018",
    "publication": "Mondo Business / Assindustria",
    "sup": "PMI Day",
    "title": "Le scuole visitano anche la sede Grimaldelli",
    "summary": "Il servizio sul PMI Day documenta la visita degli studenti all’azienda con una fotografia, all’interno di una cronaca più ampia dell’iniziativa.",
    "href": "https://www.assind.cr.it/allegati/user_upload/20181205_MB7.pdf",
    "imageCategory": "stalle",
    "imageIndex": 2,
    "imageAlt": "Struttura per allevamenti dall’archivio Grimaldelli",
    "imageNote": "Immagine d’archivio · non della visita",
    "tier": "archive"
  },
  {
    "id": "pmiday15",
    "type": "Menzione stampa",
    "date": "19 novembre 2015",
    "publication": "Mondo Padano",
    "sup": "Scuola e industria",
    "title": "Grimaldelli tra le aziende del PMI Day 2015",
    "summary": "La testata cita Grimaldelli di Salvirola tra le imprese partecipanti al programma di visite aziendali per gli studenti.",
    "href": "https://www.mondopadano.it/news/attualita/pmi-day-edizione-da-record/11986",
    "imageCategory": "strutture-industriali",
    "imageIndex": 6,
    "imageAlt": "Impianto in carpenteria metallica dell’archivio Grimaldelli",
    "imageNote": "Immagine d’archivio",
    "tier": "archive"
  }
];
function officialPhotoWall(){let imgs=[
 ['stalle',2,'Stalle e allevamenti'],['strutture-industriali',2,'Carpenteria metallica'],['autocatture',4,'Attrezzature zootecniche'],['pensiline',1,'Strutture e coperture'],['battifianco',5,'Dettagli e comfort animale'],['raschiatori-asporta-letame',4,'Soluzioni per la gestione della stalla']
 ];return `<div class="social-photo-wall">${imgs.map((item,i)=>`<a class="social-photo-tile" href="#/prodotto/${item[0]}" aria-label="Scopri ${item[2]}"><img loading="lazy" src="${image(item[0],item[1])}" alt="${item[2]} - foto d’archivio aziendale"><span>0${i+1} <small>${item[2]}</small><b>&#8599;</b></span></a>`).join('')}</div>`;}
function socialTeaser(){return `<section class="section social-teaser-section"><div class="section-container">${top('LA NOSTRA COMUNITÀ','L’azienda, <span class="serif accent">ogni giorno.</span>','Seguici nei cantieri, nelle lavorazioni e nelle realizzazioni raccontate dai canali ufficiali.')}<div class="social-teaser-layout"><div class="social-teaser-image reveal">${photo(image('stalle',2),'Stalla e animali - archivio fotografico Grimaldelli')}<span>ARCHIVIO AZIENDALE / PROVENIENZA VERIFICATA</span></div><div class="social-teaser-copy reveal delay-1"><div class="eyebrow">STORIE, IMMAGINI, PROGETTI</div><h3>Il lavoro prende<br><em>forma</em> ogni giorno.</h3><p>Le fotografie e gli aggiornamenti più recenti sono pubblicati sui profili ufficiali Grimaldelli. Le immagini di questa anteprima provengono dall’archivio aziendale: il nuovo materiale social sarà integrato dopo verifica dei file originali.</p><div class="social-links compact">${socialLinks()}</div>${action('Dicono di noi','#/dicono-di-noi','button-outline')}</div></div></div></section>`;}
function sedeSection(){return `<section class="section sede-section"><div class="section-container sede-layout"><div class="sede-copy reveal">${eyebrow('SEDE / SALVIROLA')}<h2>La sede di<br><span class="serif accent">Salvirola.</span></h2><p>A Salvirola, in provincia di Cremona, la nostra storia industriale incontra ogni giorno le esigenze di chi progetta, costruisce e produce. È da qui che prende forma il nostro lavoro.</p><div class="sede-meta"><div><small>INDIRIZZO</small><strong>Strada Provinciale 20<br>26010 Salvirola (CR)</strong></div><div><small>CONTATTO</small><strong><a href="tel:+39037372435">+39 0373 72435</a><br><a href="mailto:info@glcgrimaldelli.com">info@glcgrimaldelli.com</a></strong></div></div>${action('Vai ai contatti','#/contatti','button-outline')}</div><div class="sede-visual reveal delay-1"><div class="sede-photo-frame"><img src="${sedePhoto}" alt="Sede Grimaldelli a Salvirola" loading="lazy" onerror="this.onerror=null;this.src='${sedePhotoFallback}'"><span>LA NOSTRA SEDE / SALVIROLA (CR)</span></div></div></div></section>`;}
function newsFeature(it,i){return `<article class="news-feature"><div class="news-feature-body"><div class="news-feature-top"><span class="news-feature-number">0${i+1}</span><span class="news-feature-kicker">IN PRIMO PIANO</span></div><div class="news-meta"><span>${escapeHtml(it.type)}</span><time>${escapeHtml(it.date)}</time></div><div class="news-publisher">${escapeHtml(it.publication)} <span>/ ${escapeHtml(it.sup)}</span></div><h3>${escapeHtml(it.title)}</h3><p>${escapeHtml(it.summary)}</p>${it.quote?`<blockquote class="news-feature-quote">“${escapeHtml(it.quote)}”<cite>— Claudio Grimaldelli, fonte: ${escapeHtml(it.publication)}</cite></blockquote>`:''}<a class="news-read" href="${escapeHtml(it.href)}" target="_blank" rel="noopener noreferrer">Leggi il servizio originale <span aria-hidden="true">↗</span></a></div></article>`;}
function newsStory(it){return `<article class="news-story"><div class="news-story-body"><div class="news-meta"><span>${escapeHtml(it.type)}</span><time>${escapeHtml(it.date)}</time></div><div class="news-publisher">${escapeHtml(it.publication)}</div><h3>${escapeHtml(it.title)}</h3><p>${escapeHtml(it.summary)}</p><a class="news-read" href="${escapeHtml(it.href)}" target="_blank" rel="noopener noreferrer">Consulta la fonte <span aria-hidden="true">↗</span></a></div></article>`;}
function newsArchive(it){return `<article class="news-archive-item"><div class="news-archive-body"><div class="news-meta"><span>${escapeHtml(it.type)}</span><time>${escapeHtml(it.date)}</time></div><h3>${escapeHtml(it.title)}</h3><p>${escapeHtml(it.summary)}</p><div class="news-publisher">${escapeHtml(it.publication)}</div></div><a class="news-archive-action" href="${escapeHtml(it.href)}" target="_blank" rel="noopener noreferrer" aria-label="Apri ${escapeHtml(it.publication)}: ${escapeHtml(it.title)}">↗</a></article>`;}
function pressEditorial(){return `<section class="news-editorial-section"><div class="section-container"><div class="news-editorial-heading"><div><span class="news-edition">GRIMALDELLI · RASSEGNA STAMPA</span><h2>Una storia industriale.<br><em>Raccontata da fuori.</em></h2></div><div class="news-editorial-intro"><p>Articoli, interviste, studi e testimonianze documentali che restituiscono il percorso dell’azienda, delle sue persone e del territorio.</p><span>11 fonti pubbliche · Archivio selezionato</span></div></div><div class="news-feature-grid">${coverage.filter(x=>x.tier==='featured').map(newsFeature).join('')}</div><div class="news-section-heading"><div><span>STORIE, RICERCA E TERRITORIO</span><h2>Oltre la notizia.</h2></div><p>Approfondimenti e iniziative a cui Grimaldelli ha contribuito nel tempo.</p></div><div class="news-story-grid">${coverage.filter(x=>x.tier==='story').map(newsStory).join('')}</div><div class="news-section-heading news-section-heading--archive"><div><span>SEGNALAZIONI E DOCUMENTI</span><h2>L’archivio delle fonti.</h2></div><p>Comunicati, cataloghi e menzioni: li distinguiamo dalle interviste e dagli articoli dedicati.</p></div><div class="news-archive">${coverage.filter(x=>x.tier==='archive').map(newsArchive).join('')}</div><div class="news-editorial-note"><strong>Una rassegna trasparente.</strong><p>Ogni scheda rimanda alla pubblicazione originale. I comunicati stampa e le segnalazioni relative allo stesso evento non sono presentati come notizie indipendenti.</p></div></div></section>`;}
function testimonials(){app.innerHTML=`${hero('GRIMALDELLI / LE VOCI ESTERNE','Dicono<br><span class="serif accent">di noi.</span>','Il lavoro, le idee e le persone raccontati attraverso la stampa e i documenti pubblici.',image('strutture-industriali',2),'08')}${pressEditorial()}<section class="section social-gallery-section"><div class="section-container">${top('FOTOGRAFIE / DIARIO AZIENDALE','Dietro ogni progetto<br><span class="serif accent">c’è una storia.</span>','Una selezione originale dall’archivio Grimaldelli. Per le fotografie più recenti esplora i canali social ufficiali.')}${officialPhotoWall()}<div class="social-gallery-bottom"><div><strong>Le foto social più recenti</strong><p>I contenuti Instagram e Facebook non sono ancora importati nell’anteprima: l’accesso diretto ai post è limitato. Non pubblichiamo immagini non verificate o riferite ad aziende terze.</p></div><div class="social-links compact">${socialLinks()}</div></div></div></section><section class="section social-reviews-section"><div class="section-container"><div class="social-review-panel reveal">${eyebrow('CLIENTI / TESTIMONIANZE')}<div><h2>La fiducia<br><span class="serif accent">si costruisce.</span></h2><p>Le recensioni clienti saranno inserite solo con testo, autore e provenienza verificati. Al momento non sono state trovate recensioni pubbliche attribuibili con sufficiente certezza: nessuna testimonianza inventata, nessun punteggio non documentato.</p><a href="https://www.facebook.com/grimaldelli" target="_blank" rel="noopener noreferrer" class="text-link">Visita la pagina Facebook ufficiale <span>&#8599;</span></a></div></div></div></section>`;}

function solutionsCards(){return `<div class="solutions-grid">${sol.map((s,i)=>`<a href="#/soluzione/${s.slug}" class="solution-card reveal delay-${i%4}" aria-label="Scopri ${s.label}">${photo(s.img,s.label)}<div class="solution-top"><span>${s.idx} / 04</span><span>&#8599;</span></div><div class="solution-content"><h3>${s.name}</h3><div class="solution-cta"><span>Esplora la specializzazione</span><b>&#8599;</b></div></div></a>`).join('')}</div><div class="footnote">Le immagini per Biogas e Fotovoltaico sono illustrazioni concettuali, non fotografie di impianti Grimaldelli.</div>`;}
function tile(p,i){return `<a class="feature-tile reveal delay-${i%3}" href="#/prodotto/${p.slug}"><div class="feature-image">${photo(p.images?.[0]?.src||heroPhoto,p.title)}<span class="tile-number">${String(i+1).padStart(2,'0')} / SELEZIONE</span></div><div class="feature-title"><h3>${escapeHtml(p.title)}</h3><span>&#8599;</span></div></a>`;}
function homepage(){const featured=['stalle','strutture-industriali','autocatture','battifianco','abbeveratoi','raschiatori-asporta-letame'].map(by).filter(Boolean);app.innerHTML=`
  <section class="hero hero-salvirola">${photo(sedePhoto,'Ingresso e sede Grimaldelli a Salvirola, Strada Provinciale 20','hero-image','eager')}<div class="hero-shade"></div><div class="hero-grid"></div><div class="hero-content"><div class="hero-pre">${eyebrow('SALVIROLA / DAL 1921',true)}</div><h1><span class="mask-text"><span>Diamo</span></span><span class="mask-text"><span>struttura</span></span><span class="mask-text"><span class="serif">alle idee.</span></span></h1><div class="hero-bottom"><p>Carpenteria metallica, soluzioni zootecniche e impianti. Competenza tecnica al servizio dei progetti che durano.</p>${action('Scopri le soluzioni','#/soluzioni')}${action('Le nostre realizzazioni','#/realizzazioni','button-ghost')}</div></div><div class="hero-counter">SALVIROLA / CREMONA <span>SCORRI PER ESPLORARE</span></div><div class="hero-side">SEDE GRIMALDELLI / SALVIROLA (CR) / ITALIA</div></section>
  <div class="marquee-strap"><div class="marquee-track">${Array(2).fill('<span>Carpenteria metallica</span><b>+</b><span>Impianti zootecnici</span><b>+</b><span>Biogas</span><b>+</b><span>Fotovoltaico</span><b>+</b><span>Progettazione</span><b>+</b>').join('')}</div></div>
  <section class="section intro-section"><div class="section-container intro-layout"><div class="intro-copy reveal">${eyebrow('LA NOSTRA IDENTIT\u00c0')}<h2>La materia<br>incontra <span class="serif accent">il progetto.</span></h2><p>Da oltre tre generazioni, Grimaldelli opera al fianco delle imprese con soluzioni su misura. Il nuovo racconto valorizza l'esperienza costruttiva, la dimensione progettuale e le applicazioni concrete.</p><a href="#/azienda" class="text-link">Scopri la nostra storia <span>&#8599;</span></a></div><div class="intro-image reveal delay-1">${photo(otherPhoto,'Struttura metallica industriale presente nell\u0027archivio Grimaldelli')}<div class="intro-image-label"><span>CARPENTERIA METALLICA</span><span>FIG. 01</span></div><div class="intro-index"><b>1921</b><small>Origini aziendali</small></div></div></div></section>
  ${sedeSection()}
  <section class="section solutions-section" id="settori"><div class="section-container">${top('QUATTRO AREE DI ATTIVIT\u00c0','Un unico sguardo.<br><span class="serif accent">Quattro competenze.</span>','Una visione aziendale integrata: dalla costruzione alla funzionalit\u00e0 degli spazi, fino agli impianti per l energia.',true)}${solutionsCards()}</div></section>
  <section class="section feature-section"><div class="section-container">${top('DALLE FAMIGLIE DI PRODOTTO','La qualit\u00e0 si vede<br><span class="serif">nei dettagli.</span>','Una selezione fotografica dalle famiglie prodotto documentate nell\u0027archivio storico, organizzate in una vetrina contemporanea.')}<div class="feature-grid">${featured.map(tile).join('')}</div><div class="more-row reveal">${action('Esplora tutti i prodotti','#/prodotti','button-outline')}</div></div></section>
  <section class="editorial-band">${photo(image('stalle',11),'Dettaglio di struttura Grimaldelli')}<div class="section-container reveal">${eyebrow('PROGETTARE PER LE PERSONE E GLI ANIMALI',true)}<h2>Costruire meglio.<br><span class="serif">Lavorare meglio.</span></h2>${action('Il nostro approccio','#/azienda','button-ghost')}</div></section>
  <section class="section projects-section"><div class="section-container">${top('IL NOSTRO LAVORO SUL CAMPO','Le idee diventano<br><span class="serif">realt\u00e0.</span>','Una selezione di fotografie d\u0027archivio. Le singole commesse e i dati di progetto verranno collegati solo dopo verifica.')}<div class="projects-grid"><a class="project-item reveal" href="#/realizzazioni"><div class="photo">${photo(image('stalle',0),'Vista di una stalla realizzata')}</div><div class="project-title"><div><small>01 / ARCHIVIO</small><h3>Strutture per allevamenti</h3></div><span class="project-icon">&#8599;</span></div></a><a class="project-item reveal delay-1" href="#/realizzazioni"><div class="photo">${photo(image('strutture-industriali',0),'Struttura metallica industriale')}</div><div class="project-title"><div><small>02 / ARCHIVIO</small><h3>Carpenteria industriale</h3></div><span class="project-icon">&#8599;</span></div></a></div><div class="more-row reveal">${action('Guarda le realizzazioni','#/realizzazioni','button-outline')}</div></div></section>
  <section class="career-teaser"><div class="section-container career-teaser-inner"><div class="reveal">${eyebrow('LAVORA CON NOI',true)}<h2>Il futuro<br><span class="serif">si costruisce insieme.</span></h2></div><div class="reveal delay-1"><p>Competenze, persone e progetti. Se vuoi proporre la tua candidatura, puoi presentarti e allegare il curriculum.</p>${action('Invia la tua candidatura','#/lavora-con-noi','button-ghost')}</div></div></section>`;}
function company(){app.innerHTML=`${hero('AZIENDA / STORIA','La forza del fare.<br><span class="serif accent">Il valore di evolvere.</span>','Da una tradizione di carpenteria alla progettazione di strutture e soluzioni per il mondo produttivo.',otherPhoto,'02')}<section class="section"><div class="section-container intro-layout"><div class="intro-copy reveal">${eyebrow('DAL 1921')}<h2>Una storia<br><span class="serif accent">che continua.</span></h2><p>Le fonti pubbliche riportano il 1921 come anno di fondazione e descrivono oltre tre generazioni di esperienza. L'azienda sviluppa soluzioni rivolte alla zootecnia, alla carpenteria metallica e, secondo il sito attuale, anche agli impianti energetici.</p><p>Il nuovo sito racconta il metodo attraverso materiali reali: progettazione, produzione, applicazioni e realizzazioni.</p>${action('Le aree di attivit\u00e0','#/soluzioni')}</div><div class="intro-image reveal delay-1">${photo(image('stalle',13),'Struttura zootecnica in costruzione')}</div></div></section><section class="section solutions-section"><div class="section-container">${top('LE COMPETENZE','Una storia industriale.<br><span class="serif accent">Una visione integrata.</span>','Aree desunte dal sito online, senza affermazioni tecniche o certificazioni non validate.',true)}${solutionsCards()}</div></section>`;}
function solutions(){app.innerHTML=`${hero('SOLUZIONI / PANORAMICA','Quattro mondi.<br><span class="serif accent">Un solo partner.</span>','Le aree che oggi rappresentano l attivit\u00e0 aziendale. Esplora le applicazioni e il materiale fotografico disponibile.',heroPhoto,'03')}<section class="section solutions-section"><div class="section-container">${top('AREE DI SPECIALIZZAZIONE','Scegli il tuo<br><span class="serif accent">ambito.</span>','Le famiglie zootecniche e le strutture hanno fotografie storiche. Per gli impianti energetici servono foto e contenuti aggiornati.',true)}${solutionsCards()}</div></section>`;}
function solutionPage(slug){let s=sol.find(x=>x.slug===slug);if(!s){notFound();return;}let isEnergy=s.type==='concept';const group=slug==='strutture'?'strutture':'zootecnia';const list=products.filter(p=>p.group===group).slice(0,9);app.innerHTML=`${hero(`AREA ${s.idx} / ${escapeHtml(s.label.toUpperCase())}`,s.name,escapeHtml(s.desc),s.img,s.idx)}<section class="section solution-detail"><div class="section-container detail-hero"><div class="reveal">${eyebrow(isEnergy?'AREA DA DOCUMENTARE':'DAI PROGETTI ALLE APPLICAZIONI')}<h2>${s.name}</h2><p>${escapeHtml(s.desc)} ${isEnergy?'Il sito online presenta questa area, ma le immagini di archivio consegnate non permettono ancora di illustrare progetti specifici. Questa scheda \u00e8 volutamente essenziale.':'Scopri alcune famiglie prodotto recuperate dal catalogo storico. La disponibilit\u00e0 attuale va verificata prima del lancio.'}</p>${action(isEnergy?'Richiedi informazioni':'Esplora il catalogo',isEnergy?'#/contatti':`#/prodotti?gruppo=${group}`)}</div>${photo(s.img,s.label,'','eager')}</div>${!isEnergy?`<div class="section-container detail-copy">${top('FAMIGLIE COLLEGATE','Le applicazioni.')}<div class="feature-grid">${list.slice(0,6).map(tile).join('')}</div></div>`:''}</section>`;}
function catalogueCard(p){return `<a class="catalog-card reveal" href="#/prodotto/${encodeURIComponent(p.slug)}"><div class="crop">${photo(p.images?.[0]?.src||heroPhoto,p.title)}</div><div class="name">${escapeHtml(p.title)}</div><div class="meta">${tag(p.group)} / ${p.images?.length||0} immagini</div></a>`;}
function productsPage(params){selectedGroup=params.get('gruppo')||'tutti';query='';app.innerHTML=`${hero('PRODOTTI / VETRINA','Prodotti che<br><span class="serif accent">parlano da soli.</span>','Una selezione ragionata delle categorie e dei modelli del catalogo storico. Nessun acquisto online, solo panoramica e contatto.',image('abbeveratoi',0),'04')}<section class="catalog-section"><div class="section-container"><div class="filterbar"><div class="filter-pills">${[['tutti','Tutti'],['strutture','Strutture'],['zootecnia','Zootecnia'],['modelli','Linee storiche']].map(([v,t])=>`<button class="filter-pill ${selectedGroup===v?'active':''}" data-filter="${v}">${t}</button>`).join('')}</div><input id="catalog-search" class="search-field" type="search" aria-label="Cerca un prodotto" placeholder="Cerca una soluzione ..."></div><p id="catalog-count" style="font-size:11px;color:#77817a;letter-spacing:.11em;text-transform:uppercase;margin:10px 0 36px"></p><div id="catalog-grid" class="catalog-grid"></div></div></section>`;updateCatalog();$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{selectedGroup=b.dataset.filter;$$('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));updateCatalog();}));$('#catalog-search').addEventListener('input',e=>{query=e.target.value.toLowerCase().trim();updateCatalog();});}
function updateCatalog(){let list=products.filter(p=>p.group!=='archivio'&&(selectedGroup==='tutti'?p.group!=='modelli':p.group===selectedGroup));if(query)list=list.filter(p=>(p.title+' '+p.summary).toLowerCase().includes(query));let grid=$('#catalog-grid');if(!grid)return;grid.innerHTML=list.length?list.map(catalogueCard).join(''):'<div class="catalog-empty">Nessun prodotto corrisponde alla ricerca.</div>';$('#catalog-count').textContent=`${list.length} categorie e schede disponibili`;setupReveals();}
function productPage(slug){let p=by(slug);if(!p){notFound();return;}app.innerHTML=`${hero('PRODOTTI / '+tag(p.group).toUpperCase(),escapeHtml(p.title),escapeHtml(p.summary),p.images?.[0]?.src||heroPhoto,'CATALOGO')}<section class="section product-detail"><div class="section-container"><div class="detail-hero"><div class="reveal"><div class="detail-meta">PRODOTTO STORICO / DA VALIDARE</div><h2 style="font-size:clamp(43px,5vw,81px);letter-spacing:-.075em;font-weight:530;line-height:1.04">${escapeHtml(p.title)}</h2><p style="line-height:1.9;color:#65706d">${escapeHtml(p.summary)} Le caratteristiche e la disponibilit\u00e0 commerciale vanno confermate prima della pubblicazione.</p>${action('Richiedi informazioni','#/contatti')}</div>${photo(p.images?.[0]?.src||heroPhoto,p.title,'','eager')}</div><div class="detail-copy"><div class="eyebrow">GALLERIA D ARCHIVIO</div><h2 style="font-size:clamp(36px,4vw,59px);font-weight:550;letter-spacing:-.07em">Le immagini della <span class="serif">soluzione.</span></h2><div class="product-gallery">${(p.images||[]).map((im,i)=>`<figure><button type="button" class="gallery-photo" data-gallery="${i}" aria-label="Apri fotografia ${i+1}">${photo(im.src,p.title+' - '+im.caption)}</button><figcaption>${escapeHtml(im.caption)}</figcaption></figure>`).join('')}</div></div><a href="#/prodotti" class="text-link">&#8592; Torna alla panoramica prodotti</a></div></section>`;wireGallery(p.images||[]);}
function projects(){const list=[['stalle',0,'Strutture per allevamenti'],['strutture-industriali',0,'Carpenteria industriale'],['pensiline',0,'Pensiline e coperture'],['autocatture',0,'Allestimenti zootecnici'],['raschiatori-asporta-letame',0,'Sistemi di pulizia'],['battifianco',0,'Soluzioni per cuccette']];app.innerHTML=`${hero('REALIZZAZIONI / FOTOGRAFIE','Il lavoro<br><span class="serif accent">prende forma.</span>','La materia si trasforma in luoghi e soluzioni. Immagini tratte dall archivio fotografico storico, senza assegnazioni a commesse non verificate.',image('stalle',11),'05')}<section class="section"><div class="section-container">${top('GALLERIA SELEZIONATA','Progetti e<br><span class="serif">applicazioni.</span>','Questa galleria utilizza fotografie storiche. Le schede di progetto con clienti, date e prestazioni saranno aggiunte dopo conferma.')}<div class="feature-grid">${list.map(([slug,n,title],i)=>`<div class="feature-tile reveal delay-${i%3}"><button class="gallery-photo feature-image" data-gallery="${i}" style="display:block;width:100%">${photo(image(slug,n),title)}</button><div class="feature-title"><h3>${title}</h3><span>&#8599;</span></div></div>`).join('')}</div></div></section>`;wireGallery(list.map(([slug,n,title])=>({src:image(slug,n),caption:title})));}
const contactField=(label,id,type='text',required=true,full=false,placeholder='')=>`<div class="field ${full?'full':''}"><label for="${id}">${label} ${required?'<span class="required">*</span>':''}</label><input id="${id}" name="${id}" type="${type}" ${required?'required':''} placeholder="${placeholder}" autocomplete="${id==='email'?'email':id==='phone'?'tel':'off'}"></div>`;
const consent=(careers=false)=>`<label class="consent"><input type="checkbox" name="privacy" required><span>Dichiaro di aver preso visione dell'<a target="_blank" rel="noopener noreferrer" href="https://www.glcgrimaldelli.com/area_legale/">informativa privacy attualmente pubblicata</a>. ${careers?'Prima dell attivazione va verificata anche l informativa specifica per i candidati.':''}</span></label>`;
function contact(){app.innerHTML=`${hero('CONTATTI / PARLIAMONE','Un progetto?<br><span class="serif accent">Parliamone.</span>','Contattaci per informazioni sulle soluzioni o per una valutazione preliminare delle tue esigenze.','','06')}<section class="section"><div class="section-container contact-grid"><div class="contact-copy reveal">${eyebrow('DOVE TROVARCI')}<h2>La porta<br><span class="serif accent">e aperta.</span></h2><div class="contact-record"><small>Sede</small><p>Strada Provinciale 20<br>26010 Salvirola (CR), Italia</p></div><div class="contact-record"><small>Telefono</small><a href="tel:+39037372435">+39 0373 72435</a></div><div class="contact-record"><small>Email</small><a href="mailto:info@glcgrimaldelli.com">info@glcgrimaldelli.com</a></div><div class="contact-record"><small>Risorse umane</small><a href="#/lavora-con-noi">Lavora con noi &#8599;</a></div></div><div class="contact-form reveal delay-1"><h3>Scrivici un messaggio.</h3><p>Modulo dimostrativo: in questa anteprima non vengono raccolti ne inoltrati dati.</p><form class="demo-form" id="contact-form"><div class="form-grid">${contactField('Nome e cognome','name')}${contactField('Email','email','email')}${contactField('Localit\u00e0','city')}${contactField('Telefono','phone','tel',false)}<div class="field full"><label for="message">Il tuo messaggio <span class="required">*</span></label><textarea required id="message" name="message" placeholder="Raccontaci di cosa hai bisogno..."></textarea></div></div>${consent()}<div id="contact-response" class="form-message" role="status"></div><button class="button-primary form-submit" type="submit">Invia richiesta <span class="circ">&#8599;</span></button><p class="form-note">Anteprima privata / invio non attivo / nessun dato salvato</p></form></div></div></section>`;wireForm('contact-form','contact-response',false);}
function careers(){app.innerHTML=`${hero('CONTATTI / PERSONE','Lavora<br><span class="serif accent">con noi.</span>','Le persone sono parte di ogni progetto. Presenta la tua candidatura compilando il modulo e allegando il tuo CV.','', '07')}<section class="section"><div class="section-container career-about"><div class="reveal">${eyebrow('UN PERCORSO CONCRETO')}<h2>Il talento<br><span class="serif accent">trova spazio.</span></h2><p>Grimaldelli opera tra produzione, progettazione, zootecnia e impianti. La pagina candidature permette di presentare il proprio profilo e allegare il curriculum, mantenendo i campi presenti nel sito online.</p><div class="career-card"><b>01</b><span>Compila i dati personali</span></div><div class="career-card"><b>02</b><span>Racconta il tuo percorso</span></div><div class="career-card"><b>03</b><span>Allega il curriculum</span></div></div><div class="photo reveal delay-1">${photo(image('strutture-industriali',0),'Carpenteria metallica - fotografia di archivio')}</div></div></section><section class="career-form-section" id="candidatura"><div class="section-container career-form-grid"><div class="career-form-intro reveal">${eyebrow('CANDIDATURA')}<h2>Presentati.<br><span class="serif accent">Ti ascoltiamo.</span></h2><p>Il nuovo modulo riprende i dati richiesti dal sito attuale. L'invio \u00e8 disabilitato nella versione privata per evitare la raccolta di informazioni personali.</p><p style="font-size:12px">La gestione definitiva dei CV richiedera backend sicuro, notifiche, controlli sugli allegati e informativa candidati approvata.</p></div><div class="contact-form reveal delay-1"><form class="demo-form" id="career-form"><div class="form-block-head">01 / Dati anagrafici e contatti</div><div class="form-grid">${contactField('Nome','first_name')}${contactField('Cognome','last_name')}${contactField('La tua email','email','email')}${contactField('Telefono','phone','tel',false)}${contactField('Data di nascita','birth','date',false)}${contactField('Comune di residenza','city','text',false)}${contactField('Nazionalit\u00e0','nationality','text',false)}<div class="field"><label>Automunito</label><div class="radio-row"><label><input type="radio" name="car" value="si"> Si</label><label><input type="radio" name="car" value="no"> No</label></div></div></div><div class="form-block-head">02 / Formazione e disponibilit\u00e0</div><div class="form-grid"><div class="field"><label for="study">Titolo di studio</label><input id="study" name="study" type="text" placeholder="Titolo conseguito"></div><div class="field"><label for="mobility">Disponibile a spostarsi</label><select id="mobility" name="mobility"><option value="">Seleziona</option><option>Provincia</option><option>Regione</option></select></div><div class="field full"><label for="intro">Lettera di presentazione</label><textarea id="intro" name="intro" placeholder="Raccontaci brevemente la tua esperienza e le tue competenze..."></textarea></div></div><div class="form-block-head">03 / Curriculum e privacy</div><div class="form-grid"><div class="field full"><label for="cv">Carica CV <span class="required">*</span></label><div class="upload-zone" id="upload-zone"><input id="cv" name="cv" required type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" aria-describedby="file-note"><div class="upload-icon">&#8593;</div><b id="file-name">Seleziona il tuo curriculum</b><small id="file-note">PDF, DOC o DOCX / limite proposto 10 MB</small></div></div></div>${consent(true)}<div class="form-message" id="career-response" role="status"></div><button class="button-primary form-submit" type="submit">Invia la candidatura <span class="circ">&#8599;</span></button><p class="form-note">Versione dimostrativa: il browser controlla i campi, ma non trasmette il CV ne i dati. Per una candidatura reale usa il <a href="https://www.glcgrimaldelli.com/lavora-con-noi/" target="_blank" rel="noopener noreferrer" style="text-decoration:underline">modulo attuale sul sito Grimaldelli</a>.</p></form></div></div></section>`;wireForm('career-form','career-response',true);}
function wireForm(formId,responseId,isCareer){const form=document.getElementById(formId);if(!form)return;const response=document.getElementById(responseId);if(isCareer){let input=$('#cv');input.addEventListener('change',()=>{let f=input.files?.[0];$('#file-name').textContent=f?f.name:'Seleziona il tuo curriculum';$('#file-note').textContent=f?`${(f.size/1048576).toFixed(2)} MB / massimo 10 MB`:'PDF, DOC o DOCX / limite proposto 10 MB';});}form.addEventListener('submit',e=>{e.preventDefault();if(isCareer){let f=$('#cv').files?.[0];if(!f){response.textContent='Seleziona un curriculum.';response.classList.add('show');return;}let ext=f.name.split('.').pop().toLowerCase();if(!['pdf','doc','docx'].includes(ext)||f.size>10*1024*1024){response.textContent='Formato non supportato o file superiore al limite dimostrativo di 10 MB.';response.classList.add('show');return;}}response.textContent='Questa \u00e8 un\u0027anteprima privata: il modulo ha superato i controlli del browser, ma nessun dato'+(isCareer?' o curriculum':'')+' \u00e8 stato inviato o salvato. Il servizio di ricezione verr\u00e0 attivato solo dopo autorizzazione.';response.classList.add('show');response.scrollIntoView({block:'nearest',behavior:'smooth'});});}
function notFound(){app.innerHTML=`${hero('PAGINA NON DISPONIBILE','Percorso<br><span class="serif accent">non trovato.</span>','Torna alla panoramica delle soluzioni.','','00')}<section class="section"><div class="section-container">${action('Torna alla home','#/')}</div></section>`;}
function wireGallery(images){lightImages=images;$$('[data-gallery]').forEach(b=>b.addEventListener('click',()=>openLightbox(Number(b.dataset.gallery))));}
function openLightbox(i){if(!lightImages.length)return;lightIndex=(i+lightImages.length)%lightImages.length;$('#lightbox').classList.add('open');$('#lightbox').setAttribute('aria-hidden','false');renderLightbox();}
function renderLightbox(){let im=lightImages[lightIndex];$('#lightbox-img').src=im.src;$('#lightbox-img').alt=im.caption||'Fotografia di archivio';$('#lightbox-caption').textContent=`${im.caption||'Fotografia'} / ${lightIndex+1} di ${lightImages.length}`;}
function closeLightbox(){$('#lightbox').classList.remove('open');$('#lightbox').setAttribute('aria-hidden','true');}
let setup=()=>{};
function setupReveals(){if(observer)observer.disconnect();let elements=$$('.reveal');if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){elements.forEach(e=>e.classList.add('visible'));return;}observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.08,rootMargin:'0px 0px 35px 0px'});elements.forEach(el=>observer.observe(el));}
function render(){const {path,params}=getPath();let pathname=path==='/'?'/':path.replace(/\/$/,'');$('#mobile-menu').classList.remove('is-open');$('#mobile-menu').setAttribute('aria-hidden','true');$('#menu-toggle').setAttribute('aria-expanded','false');$$('.nav-desktop a').forEach(a=>a.classList.toggle('active',a.dataset.nav===pathname));if(pathname==='/'){homepage();app.insertAdjacentHTML('beforeend',socialTeaser());}else if(pathname==='/azienda')company();else if(pathname==='/soluzioni')solutions();else if(pathname.startsWith('/soluzione/'))solutionPage(pathname.split('/').pop());else if(pathname==='/prodotti')productsPage(params);else if(pathname.startsWith('/prodotto/'))productPage(pathname.split('/').pop());else if(pathname==='/realizzazioni')projects();else if(pathname==='/dicono-di-noi')testimonials();else if(pathname==='/contatti')contact();else if(pathname==='/lavora-con-noi')careers();else notFound();baseFooter();window.scrollTo({top:0,behavior:'instant'});setupReveals();document.title='Grimaldelli | '+(pathname==='/'?'Soluzioni che prendono forma':pathname.split('/').pop().replaceAll('-',' '))+' - Anteprima finale privata';}
function onRoute(){let current=getPath().path;if(prevRoute===current){render();return;}prevRoute=current;const mask=$('#route-mask');if(matchMedia('(prefers-reduced-motion: reduce)').matches){render();return;}mask.classList.add('active');setTimeout(()=>{render();mask.classList.remove('active');},175);}
$('#menu-toggle').addEventListener('click',()=>{const opened=$('#mobile-menu').classList.toggle('is-open');$('#mobile-menu').setAttribute('aria-hidden',String(!opened));$('#menu-toggle').setAttribute('aria-expanded',String(opened));});$('#mobile-menu').addEventListener('click',e=>{if(e.target.closest('a')){$('#mobile-menu').classList.remove('is-open');$('#mobile-menu').setAttribute('aria-hidden','true');}});$('#lightbox').addEventListener('click',e=>{if(e.target.id==='lightbox')closeLightbox();});$('.lightbox-close').addEventListener('click',closeLightbox);$('.lightbox-prev').addEventListener('click',()=>{lightIndex=(lightIndex-1+lightImages.length)%lightImages.length;renderLightbox();});$('.lightbox-next').addEventListener('click',()=>{lightIndex=(lightIndex+1)%lightImages.length;renderLightbox();});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLightbox();$('#mobile-menu').classList.remove('is-open');}if($('#lightbox').classList.contains('open')){if(e.key==='ArrowRight')$('.lightbox-next').click();if(e.key==='ArrowLeft')$('.lightbox-prev').click();}});
window.addEventListener('scroll',()=>{let p=document.documentElement;let max=p.scrollHeight-innerHeight;$('#progress').style.width=(max>0?(scrollY/max*100):0)+'%';},{passive:true});window.addEventListener('hashchange',onRoute);render();
})();
