/* GRIMALDELLI V3 - private editorial prototype; forms never submit or store files. */
(()=>{
'use strict';
if (!document.querySelector('link[href*="press-editorial.css"]')) { const p = document.createElement('link'); p.rel = 'stylesheet'; p.href = 'press-editorial.css?v=20261030'; document.head.appendChild(p); }
const D=window.GRIMALDELLI_DATA||{categories:[]};
const activeLocale=(new URLSearchParams(location.search).get("lang")||"it").toLowerCase();
const currentLocale=["it","en","fr","de"].includes(activeLocale)?activeLocale:"it";
const localizedProducts=window.GRIMALDELLI_PRODUCT_LOCALES?.[currentLocale]||{};
const products=(D.categories||[]).map(p=>{const loc=localizedProducts[p.slug];return loc?{...p,title:loc[0],summary:loc[1]}:p;});
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const by=s=>products.find(p=>p.slug===s);
const image=(s,n=0)=>by(s)?.images?.[n]?.src||'assets/media/600ba26f7253d243.webp';
const heroPhoto=image('stalle',0);
const otherPhoto=image('strutture-industriali',0);
const zootPhoto=image('autocatture',0);
const sedePhoto='assets/sede-salvirola-2026.webp';

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
  {slug:'biogas',idx:'03',name:'Biogas e<br>biometano',label:'Allacciamenti e carpenterie',img:'assets/energy/biogas/campagnari/03.webp',type:'concept',desc:'Carpenterie metalliche e collegamenti per applicazioni nel settore biogas e biometano.'},
  {slug:'fotovoltaico',idx:'04',name:'Impianti<br>fotovoltaici',label:'Energia rinnovabile',img:'assets/energy/photovoltaic/soc-agr-aurora-credera-rubbiano-cr-impianto-fotovoltaico-da-1224-kw/01.webp',type:'concept',desc:'Strutture e componenti metallici per applicazioni nel settore fotovoltaico.'}
];
if(currentLocale!=="it"){
  const localizedSolutions=window.GRIMALDELLI_LOCALES?.[currentLocale]?.sols||[];
  sol.forEach((item,i)=>{const tr=localizedSolutions[i];if(tr){item.name=tr[0];item.label=tr[1];item.desc=tr[2];}});
}
// Energy families are catalogue entry points, not invented SKUs or complete EPC products.
const energyCatalogueLabels={
 it:["Biogas e biometano","Fotovoltaico","SETTORE ENERGIA"],
 en:["Biogas and biomethane","Photovoltaics","ENERGY SECTOR"],
 fr:["Biogaz et biométhane","Photovoltaïque","SECTEUR ÉNERGIE"],
 de:["Biogas und Biomethan","Photovoltaik","ENERGIEBEREICH"]
}[currentLocale];
sol.slice(2).forEach((sector,i)=>products.push({
 slug:sector.slug,group:sector.slug,title:energyCatalogueLabels[i],summary:sector.desc,
 images:[{src:sector.img,caption:energyCatalogueLabels[i]}],
 catalogUrl:`#/soluzione/${sector.slug}`,catalogMeta:energyCatalogueLabels[2]
}));
let observer=null;
let selectedGroup='tutti';
let query='';
let lightImages=[];
let lightIndex=0;
let prevRoute='';
const app=$('#app');
const siteFooter=$('#site-footer');
function getPath(){let h=location.hash.replace(/^#/, '')||'/';let parts=h.split('?');return {path:decodeURIComponent(parts[0]),params:new URLSearchParams(parts[1]||'')};}
function baseFooter(){window.GrimaldelliI18N.footer("it",{siteFooter,eyebrow,action,photo,socialLinks});}

const officialSocials=[
  {name:'Instagram',abbr:'IG',url:'https://www.instagram.com/grimaldellisrl/'},
  {name:'Facebook',abbr:'FB',url:'https://www.facebook.com/grimaldelli'},
  {name:'LinkedIn',abbr:'IN',url:'https://www.linkedin.com/company/grimaldelli-srl'},
  {name:'YouTube',abbr:'YT',url:'https://www.youtube.com/@grimaldellisrl2669'},
  {name:'WhatsApp',abbr:'WA',url:'https://wa.me/39037372435'}
];
const socialGlyphs={
  Instagram:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>',
  Facebook:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.6 21v-8h2.7l.4-3.3h-3.1V7.6c0-.95.28-1.6 1.65-1.6H18V3.1C17.1 3 16.05 3 15 3c-3.1 0-4.9 1.9-4.9 5.3v1.4H7.5V13h2.6v8h4.5Z"/></svg>',
  LinkedIn:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.9 8h3.4v12H4.9V8Zm1.7-5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM11 8h3.2v1.6h.05a3.6 3.6 0 0 1 3.25-1.8c3.5 0 4.1 2.2 4.1 5V20h-3.45v-6.3c0-1.5-.02-3.4-2.1-3.4-2.1 0-2.45 1.65-2.45 3.3V20H11V8Z"/></svg>',
  YouTube:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor"/><path d="m10 8 6 4-6 4z" fill="#141817"/></svg>',
  WhatsApp:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8.3 6.9c-.5 0-.8.3-1.1.7-1.8 2.7 2.2 5.3 4.7 7.8 2.2 2.2 4.7 3 6 2.1.5-.3.8-.8.9-1.3l-3.1-1.5-1.1 1.1c-1.7-.8-3-2.2-3.7-3.6l1-1.2-1.2-3.2Z" fill="currentColor"/></svg>'
};
function socialLinks(){return officialSocials.map(x=>`<a class="social-pill" href="${x.url}" target="_blank" rel="noopener noreferrer" aria-label="Grimaldelli su ${x.name}">${socialGlyphs[x.name]}<span>${x.name}</span><b aria-hidden="true">&#8599;</b></a>`).join('');}
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
    "href": "https://www.assind.cr.it/allegati/MAG-INDUSTRIALI-_-GRIMALDELLI-1.pdf",
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
function socialTeaser(){return `<section class="section social-teaser-section"><div class="section-container">${top('LA NOSTRA COMUNITÀ','L’azienda, <span class="serif accent">ogni giorno.</span>','Seguici nei cantieri, nelle lavorazioni e nelle realizzazioni raccontate dai canali ufficiali.')}<div class="social-teaser-layout"><div class="social-teaser-image reveal">${photo(image('stalle',2),'Stalla e animali - archivio fotografico Grimaldelli')}<span>IMMAGINI DAL NOSTRO ARCHIVIO</span></div><div class="social-teaser-copy reveal delay-1"><div class="eyebrow">STORIE, IMMAGINI, PROGETTI</div><h3>Il lavoro prende<br><em>forma</em> ogni giorno.</h3><p>Dai cantieri alle lavorazioni, dai prodotti alle persone: segui Grimaldelli attraverso le immagini e gli aggiornamenti condivisi sui nostri canali ufficiali.</p><div class="social-links compact">${socialLinks()}</div>${action('Dicono di noi','#/dicono-di-noi','button-outline')}</div></div></div></section>`;}
function sedeSection(){return `<section class="section sede-section"><div class="section-container sede-layout"><div class="sede-copy reveal">${eyebrow('SEDE / SALVIROLA')}<h2>La sede di<br><span class="serif accent">Salvirola.</span></h2><p>A Salvirola, in provincia di Cremona, la nostra storia industriale incontra ogni giorno le esigenze di chi progetta, costruisce e produce. È da qui che prende forma il nostro lavoro.</p><div class="sede-meta"><div><small>INDIRIZZO</small><strong>Strada Provinciale 20<br>26010 Salvirola (CR)</strong></div><div><small>CONTATTO</small><strong><a href="tel:+39037372435">+39 0373 72435</a><br><a href="mailto:info@glcgrimaldelli.com">info@glcgrimaldelli.com</a></strong></div></div>${action('Vai ai contatti','#/contatti','button-outline')}</div><div class="sede-visual reveal delay-1"><div class="sede-photo-frame"><img src="${sedePhoto}" alt="Sede Grimaldelli a Salvirola" loading="lazy"><span>LA NOSTRA SEDE / SALVIROLA (CR)</span></div></div></div></section>`;}
function newsFeature(it,i){return `<article class="news-feature"><div class="news-feature-body"><div class="news-feature-top"><span class="news-feature-number">0${i+1}</span><span class="news-feature-kicker">IN PRIMO PIANO</span></div><div class="news-meta"><span>${escapeHtml(it.type)}</span><time>${escapeHtml(it.date)}</time></div><div class="news-publisher">${escapeHtml(it.publication)} <span>/ ${escapeHtml(it.sup)}</span></div><h3>${escapeHtml(it.title)}</h3><p>${escapeHtml(it.summary)}</p>${it.quote?`<blockquote class="news-feature-quote">“${escapeHtml(it.quote)}”<cite>— Claudio Grimaldelli, fonte: ${escapeHtml(it.publication)}</cite></blockquote>`:''}<a class="news-read" href="${escapeHtml(it.href)}" target="_blank" rel="noopener noreferrer">Leggi il servizio originale <span aria-hidden="true">↗</span></a></div></article>`;}
function newsStory(it){return `<article class="news-story"><div class="news-story-body"><div class="news-meta"><span>${escapeHtml(it.type)}</span><time>${escapeHtml(it.date)}</time></div><div class="news-publisher">${escapeHtml(it.publication)}</div><h3>${escapeHtml(it.title)}</h3><p>${escapeHtml(it.summary)}</p><a class="news-read" href="${escapeHtml(it.href)}" target="_blank" rel="noopener noreferrer">Consulta la fonte <span aria-hidden="true">↗</span></a></div></article>`;}
function newsArchive(it){return `<article class="news-archive-item"><div class="news-archive-body"><div class="news-meta"><span>${escapeHtml(it.type)}</span><time>${escapeHtml(it.date)}</time></div><h3>${escapeHtml(it.title)}</h3><p>${escapeHtml(it.summary)}</p><div class="news-publisher">${escapeHtml(it.publication)}</div></div><a class="news-archive-action" href="${escapeHtml(it.href)}" target="_blank" rel="noopener noreferrer" aria-label="Apri ${escapeHtml(it.publication)}: ${escapeHtml(it.title)}">↗</a></article>`;}
function pressEditorial(){return `<section class="news-editorial-section"><div class="section-container"><div class="news-editorial-heading"><div><span class="news-edition">GRIMALDELLI · RASSEGNA STAMPA</span><h2>Una storia industriale.<br><em>Raccontata da fuori.</em></h2></div><div class="news-editorial-intro"><p>Articoli, interviste, studi e testimonianze documentali che restituiscono il percorso dell’azienda, delle sue persone e del territorio.</p><span>11 fonti pubbliche · Archivio selezionato</span></div></div><div class="news-feature-grid">${coverage.filter(x=>x.tier==='featured').map(newsFeature).join('')}</div><div class="news-section-heading"><div><span>STORIE, RICERCA E TERRITORIO</span><h2>Oltre la notizia.</h2></div><p>Approfondimenti e iniziative a cui Grimaldelli ha contribuito nel tempo.</p></div><div class="news-story-grid">${coverage.filter(x=>x.tier==='story').map(newsStory).join('')}</div><div class="news-section-heading news-section-heading--archive"><div><span>SEGNALAZIONI E DOCUMENTI</span><h2>L’archivio delle fonti.</h2></div><p>Comunicati, cataloghi e menzioni: li distinguiamo dalle interviste e dagli articoli dedicati.</p></div><div class="news-archive">${coverage.filter(x=>x.tier==='archive').map(newsArchive).join('')}</div><div class="news-editorial-note"><strong>Una rassegna trasparente.</strong><p>Ogni scheda rimanda alla pubblicazione originale. I comunicati stampa e le segnalazioni relative allo stesso evento non sono presentati come notizie indipendenti.</p></div></div></section>`;}
function testimonials(){app.innerHTML=`${hero('GRIMALDELLI / LE VOCI ESTERNE','Dicono<br><span class="serif accent">di noi.</span>','Il lavoro, le idee e le persone raccontati attraverso la stampa e i documenti pubblici.',image('strutture-industriali',2),'08')}${pressEditorial()}<section class="section social-gallery-section"><div class="section-container">${top('FOTOGRAFIE / DIARIO AZIENDALE','Dietro ogni progetto<br><span class="serif accent">c’è una storia.</span>','Una selezione originale dall’archivio Grimaldelli. Per le fotografie più recenti esplora i canali social ufficiali.')}${officialPhotoWall()}<div class="social-gallery-bottom"><div><strong>Le foto social più recenti</strong><p>Segui Grimaldelli su Instagram e Facebook per scoprire fotografie, novità e aggiornamenti.</p></div><div class="social-links compact">${socialLinks()}</div></div></div></section><section class="section social-reviews-section"><div class="section-container"><div class="social-review-panel reveal">${eyebrow('RELAZIONI / COMUNITÀ')}<div><h2>La fiducia<br><span class="serif accent">si costruisce.</span></h2><p>Le relazioni che costruiamo ogni giorno sono parte della nostra storia. Scopri il nostro lavoro e resta in contatto attraverso i canali ufficiali.</p><a href="https://www.facebook.com/grimaldelli" target="_blank" rel="noopener noreferrer" class="text-link">Visita la pagina Facebook ufficiale <span>&#8599;</span></a></div></div></div></section>`;}

function solutionsCards(){return `<div class="solutions-grid">${sol.map((s,i)=>`<a href="#/soluzione/${s.slug}" class="solution-card reveal delay-${i%4}" aria-label="${escapeHtml({it:"Scopri",en:"Explore",fr:"Découvrir",de:"Entdecken"}[currentLocale])} ${escapeHtml(s.label)}">${photo(s.img,s.label)}<div class="solution-top"><span>${s.idx} / 04</span><span>&#8599;</span></div><div class="solution-content"><h3>${s.name}</h3><div class="solution-cta"><span>${escapeHtml({it:"Esplora la specializzazione",en:"Explore this area",fr:"Découvrir ce domaine",de:"Fachgebiet entdecken"}[currentLocale])}</span><b>&#8599;</b></div></div></a>`).join('')}</div><div class="footnote">${escapeHtml(currentLocale==="it"?"Le immagini relative a biogas e fotovoltaico sono illustrazioni e non fotografie di realizzazioni aziendali.":window.GRIMALDELLI_LOCALES?.[currentLocale]?.solutions?.illustration||"")}</div>`;}
function tile(p,i){return `<a class="feature-tile reveal delay-${i%3}" href="#/prodotto/${p.slug}"><div class="feature-image">${photo(p.images?.[0]?.src||heroPhoto,p.title)}<span class="tile-number">${String(i+1).padStart(2,'0')} / SELEZIONE</span></div><div class="feature-title"><h3>${escapeHtml(p.title)}</h3><span>&#8599;</span></div></a>`;}
function homepage(){const featured=['stalle','strutture-industriali','autocatture','battifianco','abbeveratoi','raschiatori-asporta-letame'].map(by).filter(Boolean);app.innerHTML=`
  <section class="hero hero-salvirola">${photo(sedePhoto,'Ingresso e sede Grimaldelli a Salvirola, Strada Provinciale 20','hero-image','eager')}<div class="hero-shade"></div><div class="hero-grid"></div><div class="hero-content"><div class="hero-pre">${eyebrow('SALVIROLA / DAL 1921',true)}</div><h1><span class="mask-text"><span>Diamo</span></span><span class="mask-text"><span>struttura</span></span><span class="mask-text"><span class="serif">alle idee.</span></span></h1><div class="hero-bottom"><p>Carpenteria metallica, attrezzature zootecniche e soluzioni per il settore energetico. Competenza tecnica al servizio di ogni progetto.</p>${action('Scopri le soluzioni','#/soluzioni')}${action('Le nostre realizzazioni','#/realizzazioni','button-ghost')}</div></div><div class="hero-counter">SALVIROLA / CREMONA <span>SCORRI PER ESPLORARE</span></div><div class="hero-side">SEDE GRIMALDELLI / SALVIROLA (CR) / ITALIA</div></section>
  <div class="marquee-strap"><div class="marquee-track">${Array(2).fill('<span>Carpenteria metallica</span><b>+</b><span>Impianti zootecnici</span><b>+</b><span>Biogas</span><b>+</b><span>Fotovoltaico</span><b>+</b><span>Progettazione</span><b>+</b>').join('')}</div></div>
  <section class="section intro-section"><div class="section-container intro-layout"><div class="intro-copy reveal">${eyebrow('LA NOSTRA IDENTIT\u00c0')}<h2>La materia<br>incontra <span class="serif accent">il progetto.</span></h2><p>Da oltre tre generazioni lavoriamo al fianco delle imprese, unendo esperienza costruttiva, competenze tecniche e attenzione alle esigenze di ogni progetto.</p><a href="#/azienda" class="text-link">Scopri la nostra storia <span>&#8599;</span></a></div><div class="intro-image reveal delay-1">${photo(otherPhoto,'Struttura metallica industriale presente nell\u0027archivio Grimaldelli')}<div class="intro-image-label"><span>CARPENTERIA METALLICA</span><span>FIG. 01</span></div><div class="intro-index"><b>1921</b><small>Origini aziendali</small></div></div></div></section>
  ${sedeSection()}
  <section class="section solutions-section" id="settori"><div class="section-container">${top('QUATTRO AREE DI ATTIVIT\u00c0','Un unico sguardo.<br><span class="serif accent">Quattro competenze.</span>','Dalla carpenteria metallica alle attrezzature zootecniche, fino alle lavorazioni per il settore energetico.',true)}${solutionsCards()}</div></section>
  <section class="section feature-section"><div class="section-container">${top('DALLE FAMIGLIE DI PRODOTTO','La qualit\u00e0 si vede<br><span class="serif">nei dettagli.</span>','Strutture, attrezzature e componenti raccontati attraverso i dettagli del nostro lavoro.')}<div class="feature-grid">${featured.map(tile).join('')}</div><div class="more-row reveal">${action('Esplora tutti i prodotti','#/prodotti','button-outline')}</div></div></section>
  <section class="editorial-band">${photo(image('stalle',11),'Dettaglio di struttura Grimaldelli')}<div class="section-container reveal">${eyebrow('PROGETTARE PER LE PERSONE E GLI ANIMALI',true)}<h2>Costruire meglio.<br><span class="serif">Lavorare meglio.</span></h2>${action('Il nostro approccio','#/azienda','button-ghost')}</div></section>
  <section class="section projects-section"><div class="section-container">${top('IL NOSTRO LAVORO SUL CAMPO','Le idee diventano<br><span class="serif">realtà.</span>','Una selezione di strutture, attrezzature e lavorazioni del nostro percorso industriale.')}<div class="projects-grid"><a class="project-item reveal" href="#/realizzazioni"><div class="photo">${photo(image('stalle',0),'Vista di una stalla realizzata')}</div><div class="project-title"><div><small>01 / ARCHIVIO</small><h3>Strutture per allevamenti</h3></div><span class="project-icon">&#8599;</span></div></a><a class="project-item reveal delay-1" href="#/realizzazioni"><div class="photo">${photo(image('strutture-industriali',0),'Struttura metallica industriale')}</div><div class="project-title"><div><small>02 / ARCHIVIO</small><h3>Carpenteria industriale</h3></div><span class="project-icon">&#8599;</span></div></a></div><div class="more-row reveal">${action('Guarda le realizzazioni','#/realizzazioni','button-outline')}</div></div></section>
  <section class="career-teaser"><div class="section-container career-teaser-inner"><div class="reveal">${eyebrow('LAVORA CON NOI',true)}<h2>Il futuro<br><span class="serif">si costruisce insieme.</span></h2></div><div class="reveal delay-1"><p>Competenze, persone e progetti: scopri come entrare in contatto con la nostra azienda.</p>${action('Lavora con noi','#/lavora-con-noi','button-ghost')}</div></div></section>`;}
function company(){const milestones=[
{year:'1921',title:'Le radici, a Romanengo',description:'Il nonno di Claudio Grimaldelli avvia un’attività di maniscalco in un portico di Romanengo. Da quella bottega nasce una tradizione familiare di lavoro del metallo.'},
{year:'ANNI SESSANTA',title:'La scelta della specializzazione',description:'Le attività per conto terzi in agricoltura e la carpenteria metallica si separano. Il ramo dedicato alla carpenteria costituisce l’origine della Grimaldelli attuale.'},
{year:'1999',title:'Il passaggio generazionale',description:'Claudio Grimaldelli entra in azienda accanto agli zii Gianluigi e Giacomo. La strategia si orienta verso soluzioni zootecniche più complete, investimenti in tecnologia, organizzazione e progettazione.'},
{year:'2021',title:'Cento anni di attività',description:'L’azienda celebra un secolo dalla fondazione insieme ai dipendenti e alle loro famiglie: un percorso di continuità, evoluzione e competenze tramandate.'},
{year:'2025',title:'La storia raccontata da Claudio',description:'Un servizio di Vite d’impresa ricostruisce il percorso industriale, i progetti 3D, il laser scanner e la diversificazione verso biogas e fotovoltaico. Le informazioni sono riferite alla data dell’intervista.'}
];app.innerHTML=`${hero('AZIENDA / STORIA','Una storia di impresa.<br><span class="serif accent">E di persone.</span>','Dalle origini artigiane alla progettazione: una storia di persone, competenze e cambiamento.',otherPhoto,'02')}<section class="company-longread" id="storia">
<div class="section-container">
  <header class="company-story-header">
    <div class="company-story-brow"><span>GRIMALDELLI / DAL 1921</span><span>STORIA D’IMPRESA</span></div>
    <h2>Prima dei grandi progetti<br><em>c’era un portico.</em></h2>
    <p class="company-story-deck">Le imprese non nascono già come le conosciamo. Cambiano mestiere, dimensioni, strumenti. Ma alcune cose rimangono: il modo di lavorare, la parola data e la responsabilità verso chi si affida a loro.</p>
  </header>
  <aside class="company-interview-spotlight" aria-label="Intervista integrale a Claudio Grimaldelli">
    <div class="company-interview-copy">
      <span class="company-interview-overline">IL RACCONTO ORIGINALE · CLAUDIO GRIMALDELLI</span>
      <h3>Dal 1921 a fianco degli allevatori</h3>
      <p>L’intervista pubblicata su <strong>Vite d’impresa</strong> nel 2025 racconta in prima persona le origini, le decisioni che hanno cambiato l’azienda e le persone che l’hanno fatta crescere. Tutte e tre le pagine sono consultabili nell’edizione originale.</p>
      <div class="company-interview-meta">Servizio integrale · Pubblicazione 2025 · PDF di 3 pagine</div>
    </div>
  </aside>
  <article class="company-story-body" aria-label="La storia di Grimaldelli">
    <section class="company-story-chapter"><div class="company-story-index">01 / LE ORIGINI</div><div><h3>Il mestiere prima dell’impresa.</h3>
    <p>Il racconto comincia nel 1921, a Romanengo. Sotto un portico, il nonno di Claudio Grimaldelli lavora come maniscalco. Da quella bottega prende forma un mestiere che richiede abilità, attenzione ai materiali e vicinanza al mondo agricolo.</p>
    <p>La generazione successiva amplia il lavoro della famiglia. Alla prestazione di servizi per l’agricoltura si affianca la carpenteria metallica. Negli anni Sessanta le attività diventano due imprese distinte: quella dedicata al ferro e alle strutture è la radice della Grimaldelli di oggi.</p></div></section>
    <section class="company-story-chapter"><div class="company-story-index">02 / LA SVOLTA</div><div><h3>Quando il lavoro cambia prospettiva.</h3>
    <p>Nel 1999 Claudio entra nell’impresa al fianco degli zii Gianluigi e Giacomo. Non si tratta soltanto di un passaggio tra generazioni: cambia il modo di guardare al mercato. La carpenteria resta il punto di partenza, ma l’obiettivo diventa comprendere l’intero problema dell’allevatore.</p>
    <p>Le strutture, le attrezzature e il funzionamento dell’impianto vengono pensati insieme. Da lavorazioni separate si passa progressivamente a progetti completi, con nuove responsabilità di progettazione e organizzazione.</p></div></section>
    <section class="company-story-chapter"><div class="company-story-index">03 / IL METODO</div><div><h3>Prima immaginare, poi costruire.</h3>
    <p>La progettazione tridimensionale, i modelli digitali e i rilievi con laser scanner entrano nel metodo di lavoro descritto da Claudio nell’intervista. Prima di realizzare una struttura occorre capire come si inserirà nello spazio, come si muoveranno le attrezzature e come lavoreranno le persone.</p>
    <p>È una prospettiva che mette insieme esperienza industriale e conoscenza delle esigenze dell’allevamento: il risultato non è soltanto un manufatto, ma un ambiente pensato per il benessere animale, la sicurezza e l’operatività.</p></div></section>
    <section class="company-story-chapter"><div class="company-story-index">04 / LE PERSONE</div><div><h3>Una storia costruita insieme.</h3>
    <p>Nelle parole di Claudio tornano il valore dei collaboratori, la serietà delle relazioni e il rispetto degli impegni. Non è un dettaglio accessorio: è il rapporto di fiducia che accompagna un progetto, dalla prima idea all’assistenza successiva alla consegna.</p>
    <blockquote>«Non promettiamo mai ciò che non siamo in grado di fare»<cite>Claudio Grimaldelli · Vite d’impresa, 2025</cite></blockquote>
    <p>Nel 2021 l’azienda celebra il centenario insieme ai dipendenti e alle famiglie. Cento anni diventano così il risultato del lavoro di più generazioni, e il punto da cui continuare a costruire.</p></div></section>
    <div class="company-story-outro"><span>LA STORIA CONTINUA</span><p>Questa ricostruzione è una sintesi editoriale. La testimonianza completa di Claudio, con i dettagli dei cambiamenti, della tecnologia e delle scelte industriali, è disponibile nella pubblicazione originale.</p>
    <a class="company-read-link" href="https://www.assind.cr.it/allegati/MAG-INDUSTRIALI-_-GRIMALDELLI-1.pdf" target="_blank" rel="noopener noreferrer">Leggi l’intervista integrale <span aria-hidden="true">↗</span></a></div>
  </article>
</div></section><section class="company-history"><div class="section-container"><div class="company-history-heading"><span class="company-history-eyebrow">LA NOSTRA STORIA</span><h2>Le tappe che ci<br><em>hanno portato qui.</em></h2><p>Dal laboratorio artigiano alla progettazione di impianti: il percorso di un’impresa che ha saputo evolvere senza perdere le proprie origini.</p></div><div class="company-history-list">${milestones.map((m,i)=>`<article class="company-history-event"><div class="company-history-year">${escapeHtml(m.year)}</div><div class="company-history-copy"><h3>${escapeHtml(m.title)}</h3><p>${escapeHtml(m.description)}</p></div><span class="company-history-number">${String(i+1).padStart(2,'0')}</span></article>`).join('')}</div><div class="company-history-sources"><strong>Fonti della ricostruzione</strong><p>Intervista a Claudio Grimaldelli, «Dal 1921 a fianco degli allevatori» (2025); Università Cattolica / CERSI, «Osservatorio sull’imprenditorialità cremonese» (2012). </p></div></div></section><section class="section solutions-section"><div class="section-container">${top('LE COMPETENZE','Una storia industriale.<br><span class="serif accent">Una visione integrata.</span>','Competenze e soluzioni che accompagnano la nostra storia industriale.',true)}${solutionsCards()}</div></section>`;}
function solutions(){app.innerHTML=`${hero('SOLUZIONI / PANORAMICA','Quattro mondi.<br><span class="serif accent">Un solo partner.</span>','Le nostre aree di attività: carpenteria metallica, attrezzature zootecniche e applicazioni per il settore energetico.',heroPhoto,'03')}<section class="section solutions-section"><div class="section-container">${top('AREE DI SPECIALIZZAZIONE','Scegli il tuo<br><span class="serif accent">ambito.</span>','Scopri le nostre specializzazioni, dalle strutture metalliche alle attrezzature per l’allevamento.',true)}${solutionsCards()}</div></section>`;}
function solutionPage(slug){let s=sol.find(x=>x.slug===slug);if(!s){notFound();return;}let isEnergy=s.type==='concept';const group=slug==='strutture'?'strutture':'zootecnia';const list=products.filter(p=>p.group===group).slice(0,9);app.innerHTML=`${hero(`AREA ${s.idx} / ${escapeHtml(s.label.toUpperCase())}`,s.name,escapeHtml(s.desc),s.img,s.idx)}<section class="section solution-detail"><div class="section-container detail-hero"><div class="reveal">${eyebrow(isEnergy?'IL NOSTRO LAVORO':'DAI PROGETTI ALLE APPLICAZIONI')}<h2>${s.name}</h2><p>${escapeHtml(s.desc)} ${isEnergy?'Parliamo delle lavorazioni e delle soluzioni che possiamo sviluppare in questo settore.':'Scopri le famiglie di prodotti e le applicazioni collegate.'}</p>${action(isEnergy?'Richiedi informazioni':'Esplora il catalogo',isEnergy?'#/contatti':`#/prodotti?gruppo=${group}`)}</div>${photo(s.img,s.label,'','eager')}</div>${!isEnergy?`<div class="section-container detail-copy">${top('FAMIGLIE COLLEGATE','Le applicazioni.')}<div class="feature-grid">${list.slice(0,6).map(tile).join('')}</div></div>`:''}</section>`;}
function catalogueCard(p){return `<a class="catalog-card reveal" href="${escapeHtml(p.catalogUrl||`#/prodotto/${encodeURIComponent(p.slug)}`)}"><div class="crop">${photo(p.images?.[0]?.src||heroPhoto,p.title)}</div><div class="name">${escapeHtml(p.title)}</div><div class="meta">${p.catalogMeta?escapeHtml(p.catalogMeta):`${tag(p.group)} / ${p.images?.length||0} immagini`}</div></a>`;}
function productsPage(params){selectedGroup=params.get('gruppo')||'tutti';query='';app.innerHTML=`${hero('PRODOTTI / VETRINA','Prodotti che<br><span class="serif accent">parlano da soli.</span>','Strutture, attrezzature e soluzioni per l’agricoltura, l’allevamento, l’industria e l’energia.',image('abbeveratoi',0),'04')}<section class="catalog-section"><div class="section-container"><div class="filterbar"><div class="filter-pills">${[['tutti','Tutti'],['strutture','Strutture'],['zootecnia','Zootecnia'],['modelli','Linee storiche'],['biogas',energyCatalogueLabels[0]],['fotovoltaico',energyCatalogueLabels[1]]].map(([v,t])=>`<button class="filter-pill ${selectedGroup===v?'active':''}" data-filter="${v}">${t}</button>`).join('')}</div><input id="catalog-search" class="search-field" type="search" aria-label="Cerca un prodotto" placeholder="Cerca una soluzione ..."></div><p id="catalog-count" style="font-size:11px;color:#77817a;letter-spacing:.11em;text-transform:uppercase;margin:10px 0 36px"></p><div id="catalog-grid" class="catalog-grid"></div></div></section>`;updateCatalog();$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{selectedGroup=b.dataset.filter;$$('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));updateCatalog();}));$('#catalog-search').addEventListener('input',e=>{query=e.target.value.toLowerCase().trim();updateCatalog();});}
function updateCatalog(){let list=products.filter(p=>p.group!=='archivio'&&(selectedGroup==='tutti'?p.group!=='modelli':p.group===selectedGroup));if(query)list=list.filter(p=>(p.title+' '+p.summary).toLowerCase().includes(query));let grid=$('#catalog-grid');if(!grid)return;grid.innerHTML=list.length?list.map(catalogueCard).join(''):'<div class="catalog-empty">Nessun prodotto corrisponde alla ricerca.</div>';$('#catalog-count').textContent=`${list.length} categorie e schede disponibili`;setupReveals();}
function productPage(slug){let p=by(slug);if(!p){notFound();return;}app.innerHTML=`${hero('PRODOTTI / '+tag(p.group).toUpperCase(),escapeHtml(p.title),escapeHtml(p.summary),p.images?.[0]?.src||heroPhoto,'CATALOGO')}<section class="section product-detail"><div class="section-container"><div class="detail-hero"><div class="reveal"><div class="detail-meta">PRODOTTI / GRIMALDELLI</div><h2 style="font-size:clamp(43px,5vw,81px);letter-spacing:-.075em;font-weight:530;line-height:1.04">${escapeHtml(p.title)}</h2><p style="line-height:1.9;color:#65706d">${escapeHtml(p.summary)} Per informazioni sulle configurazioni e sulla disponibilità, contatta il nostro ufficio.</p>${action('Richiedi informazioni','#/contatti')}</div>${photo(p.images?.[0]?.src||heroPhoto,p.title,'','eager')}</div><div class="detail-copy"><div class="eyebrow">GALLERIA D ARCHIVIO</div><h2 style="font-size:clamp(36px,4vw,59px);font-weight:550;letter-spacing:-.07em">Le immagini della <span class="serif">soluzione.</span></h2><div class="product-gallery">${(p.images||[]).map((im,i)=>`<figure><button type="button" class="gallery-photo" data-gallery="${i}" aria-label="Apri fotografia ${i+1}">${photo(im.src,p.title+' - '+im.caption)}</button><figcaption>${escapeHtml(im.caption)}</figcaption></figure>`).join('')}</div></div><a href="#/prodotti" class="text-link">&#8592; Torna alla panoramica prodotti</a></div></section>`;wireGallery(p.images||[]);}
function projects(){const list=[['stalle',0,'Strutture per allevamenti'],['strutture-industriali',0,'Carpenteria industriale'],['pensiline',0,'Pensiline e coperture'],['autocatture',0,'Allestimenti zootecnici'],['raschiatori-asporta-letame',0,'Sistemi di pulizia'],['battifianco',0,'Soluzioni per cuccette']];app.innerHTML=`${hero('REALIZZAZIONI / FOTOGRAFIE','Il lavoro<br><span class="serif accent">prende forma.</span>','La materia prende forma nelle strutture, nelle attrezzature e nelle applicazioni per i nostri settori di attività.',image('stalle',11),'05')}<section class="section"><div class="section-container">${top('GALLERIA SELEZIONATA','Progetti e<br><span class="serif">applicazioni.</span>','Una selezione di immagini delle nostre lavorazioni, delle strutture e delle attrezzature.')}<div class="feature-grid">${list.map(([slug,n,title],i)=>`<div class="feature-tile reveal delay-${i%3}"><button class="gallery-photo feature-image" data-gallery="${i}" style="display:block;width:100%">${photo(image(slug,n),title)}</button><div class="feature-title"><h3>${title}</h3><span>&#8599;</span></div></div>`).join('')}</div></div></section>`;wireGallery(list.map(([slug,n,title])=>({src:image(slug,n),caption:title})));}

function contact(){
  app.innerHTML=`${hero('CONTATTI / PARLIAMONE','Un progetto?<br><span class="serif accent">Parliamone.</span>','Siamo a disposizione per informazioni, richieste tecniche e nuove collaborazioni.','','06')}
  <section class="section"><div class="section-container contact-grid">
    <div class="contact-copy reveal">${eyebrow('DOVE TROVARCI')}<h2>La porta<br><span class="serif accent">è aperta.</span></h2>
      <div class="contact-record"><small>Sede</small><p>Strada Provinciale 20<br>26010 Salvirola (CR), Italia</p></div>
      <div class="contact-record"><small>Telefono</small><a href="tel:+39037372435">+39 0373 72435</a></div>
      <div class="contact-record"><small>Email</small><a href="mailto:info@glcgrimaldelli.com">info@glcgrimaldelli.com</a></div>
      <div class="contact-record"><small>PEC</small><a href="mailto:grimaldelli@posta.insiemebusiness.it">grimaldelli@posta.insiemebusiness.it</a></div>
      <div class="contact-record"><small>Risorse umane</small><a href="#/lavora-con-noi">Lavora con noi &#8599;</a></div>
    </div>
    <div class="contact-form reveal delay-1"><h3>Scrivici.</h3>
      <p>Hai bisogno di informazioni su prodotti, lavorazioni o progetti? Il nostro team è a disposizione per ascoltare le tue esigenze.</p>
      <p style="font-size:19px;margin:28px 0"><a href="mailto:info@glcgrimaldelli.com">info@glcgrimaldelli.com</a></p>
      ${action('Invia una email','mailto:info@glcgrimaldelli.com')}
      <p class="form-note" style="margin-top:24px">Per informazioni sul trattamento dei dati personali consulta la <a href="privacy-sito.html">Privacy Policy</a>.</p>
    </div>
  </div></section>`;
}
function careers(){
  app.innerHTML=`${hero('LAVORA CON NOI / PERSONE','Lavora<br><span class="serif accent">con noi.</span>','Esperienza, competenze e persone: cresciamo grazie al contributo di chi lavora con noi.','','07')}
  <section class="section"><div class="section-container career-about">
    <div class="reveal">${eyebrow('UN PERCORSO CONCRETO')}<h2>Il talento<br><span class="serif accent">trova spazio.</span></h2>
      <p>Crediamo nella competenza, nella collaborazione e nella voglia di costruire soluzioni concrete. Conosci il nostro mondo e raccontaci il tuo percorso professionale.</p>
      <div class="career-card"><b>01</b><span>Conosci le nostre attività</span></div>
      <div class="career-card"><b>02</b><span>Raccontaci le tue competenze</span></div>
      <div class="career-card"><b>03</b><span>Contattaci per candidarti</span></div>
    </div>
    <div class="photo reveal delay-1">${photo(image('strutture-industriali',0),'Carpenteria metallica Grimaldelli')}</div>
  </div></section>
  <section class="career-form-section" id="candidatura"><div class="section-container career-form-grid">
    <div class="career-form-intro reveal">${eyebrow('OPPORTUNITÀ PROFESSIONALI')}<h2>Presentati.<br><span class="serif accent">Ti ascoltiamo.</span></h2>
      <p>Siamo interessati a conoscere persone motivate, professionisti e nuovi talenti che desiderano contribuire alle nostre attività.</p>
      <p>Per informazioni sulle opportunità professionali puoi scriverci direttamente. Ti risponderemo attraverso i nostri canali aziendali.</p>
    </div>
    <div class="contact-form reveal delay-1">
      <h3>Entra in contatto con noi.</h3>
      <p>Raccontaci brevemente il tuo profilo e l'area in cui vorresti lavorare.</p>
      ${action('Contattaci per una candidatura','mailto:info@glcgrimaldelli.com?subject=Candidatura%20spontanea')}
      <p class="form-note" style="margin-top:22px">Prima di inviare dati personali, consulta la nostra <a href="privacy-sito.html">informativa privacy</a>.</p>
    </div>
  </div></section>`;
}
function notFound(){app.innerHTML=`${hero('PAGINA NON DISPONIBILE','Percorso<br><span class="serif accent">non trovato.</span>','Torna alla panoramica delle soluzioni.','','00')}<section class="section"><div class="section-container">${action('Torna alla home','#/')}</div></section>`;}
function wireGallery(images){lightImages=images;$$('[data-gallery]').forEach(b=>b.addEventListener('click',()=>openLightbox(Number(b.dataset.gallery))));}
function openLightbox(i){if(!lightImages.length)return;lightIndex=(i+lightImages.length)%lightImages.length;$('#lightbox').classList.add('open');$('#lightbox').setAttribute('aria-hidden','false');renderLightbox();}
function renderLightbox(){let im=lightImages[lightIndex];$('#lightbox-img').src=im.src;$('#lightbox-img').alt=im.caption||'Fotografia di archivio';$('#lightbox-caption').textContent=`${im.caption||'Fotografia'} / ${lightIndex+1} di ${lightImages.length}`;}
function closeLightbox(){$('#lightbox').classList.remove('open');$('#lightbox').setAttribute('aria-hidden','true');}
let setup=()=>{};
function setupReveals(){if(observer)observer.disconnect();let elements=$$('.reveal');if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){elements.forEach(e=>e.classList.add('visible'));return;}observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.08,rootMargin:'0px 0px 35px 0px'});elements.forEach(el=>observer.observe(el));}
function render(){
 const {path,params}=getPath();let pathname=path==='/'?'/':path.replace(/\/$/,'');
 $('#mobile-menu').classList.remove('is-open');$('#mobile-menu').setAttribute('aria-hidden','true');$('#menu-toggle').setAttribute('aria-expanded','false');
 $$('.nav-desktop a').forEach(a=>a.classList.toggle('active',a.dataset.nav===pathname));
 if((pathname==='/contatti'||pathname==='/lavora-con-noi')&&window.GrimaldelliForms){
   window.GrimaldelliForms.render(pathname==='/contatti'?'contact':'career',currentLocale,{app,hero,eyebrow,photo,image});
   if(currentLocale!=='it')window.GrimaldelliI18N.footer(currentLocale,{siteFooter,eyebrow,action,photo,socialLinks});
   else baseFooter();
 }
 else if(currentLocale!=='it' && window.GrimaldelliI18N){
   window.GrimaldelliI18N.render(currentLocale,pathname,{app,photo,hero,eyebrow,top,action,sol,products,by,image,heroPhoto,otherPhoto,sedePhoto,solutionsCards,tile,socialLinks,coverage,wireGallery,company,pressEditorial});
   window.GrimaldelliI18N.footer(currentLocale,{siteFooter,eyebrow,action,photo,socialLinks});
 }else{
  if(pathname==='/'){homepage();app.insertAdjacentHTML('beforeend',socialTeaser());}
  else if(pathname==='/azienda')company();
  else if(pathname==='/soluzioni')solutions();
  else if(pathname.startsWith('/soluzione/'))solutionPage(pathname.split('/').pop());
  else if(pathname==='/prodotti')productsPage(params);
  else if(pathname.startsWith('/prodotto/'))productPage(pathname.split('/').pop());
  else if(pathname==='/realizzazioni')projects();
  else if(pathname==='/dicono-di-noi')testimonials();
  else if(pathname==='/contatti')contact();
  else if(pathname==='/lavora-con-noi')careers();
  else notFound();
  baseFooter();
 }
 window.GrimaldelliI18N?.shell(currentLocale,pathname);
 window.GrimaldelliInstagram?.mount(pathname,currentLocale,app);
 window.GrimaldelliEnergy?.mount(pathname,currentLocale,app);
 if(pathname==='/')window.GrimaldelliMarquee?.mount(currentLocale,app);
 window.scrollTo({top:0,behavior:'instant'});
 setupReveals();
}
function onRoute(){let current=getPath().path;if(prevRoute===current){render();return;}prevRoute=current;const mask=$('#route-mask');if(matchMedia('(prefers-reduced-motion: reduce)').matches){render();return;}mask.classList.add('active');setTimeout(()=>{render();mask.classList.remove('active');},175);}
$('#menu-toggle').addEventListener('click',()=>{const opened=$('#mobile-menu').classList.toggle('is-open');$('#mobile-menu').setAttribute('aria-hidden',String(!opened));$('#menu-toggle').setAttribute('aria-expanded',String(opened));});$('#mobile-menu').addEventListener('click',e=>{if(e.target.closest('a')){$('#mobile-menu').classList.remove('is-open');$('#mobile-menu').setAttribute('aria-hidden','true');}});$('#lightbox').addEventListener('click',e=>{if(e.target.id==='lightbox')closeLightbox();});$('.lightbox-close').addEventListener('click',closeLightbox);$('.lightbox-prev').addEventListener('click',()=>{lightIndex=(lightIndex-1+lightImages.length)%lightImages.length;renderLightbox();});$('.lightbox-next').addEventListener('click',()=>{lightIndex=(lightIndex+1)%lightImages.length;renderLightbox();});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLightbox();$('#mobile-menu').classList.remove('is-open');}if($('#lightbox').classList.contains('open')){if(e.key==='ArrowRight')$('.lightbox-next').click();if(e.key==='ArrowLeft')$('.lightbox-prev').click();}});
window.addEventListener('scroll',()=>{let p=document.documentElement;let max=p.scrollHeight-innerHeight;$('#progress').style.width=(max>0?(scrollY/max*100):0)+'%';},{passive:true});window.addEventListener('hashchange',onRoute);render();
})();
