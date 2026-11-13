/* P10 Marketing enhancement – private GitHub Pages preview.
 * No tracking, no autonomous submissions, no unverified certifications.
 * Context stays in the visitor's draft; the demo never claims to send a web form.
 */
(function(){
"use strict";
const officialEmail="info@glcgrimaldelli.com";
const productSource="https://www.glcgrimaldelli.com/prodotto/raschiatori-asporta-letame/";
const sectors=["strutture","zootecnia","biogas","fotovoltaico"];
const C={
 it:{
  home:"Carpenteria metallica e attrezzature per l'allevamento: strutture, prodotti e interventi documentati per agricoltura, industria e settore energetico.",
  proof:[["1921","Una storia industriale che continua"],["4","Aree di specializzazione"],["Sul campo","Fotografie e interventi documentati"]],
  specTitle:"Caratteristiche riportate nella scheda ufficiale",specNote:"Le caratteristiche si riferiscono alla documentazione pubblicata dall'azienda. Configurazione e disponibilità sono da verificare al momento della richiesta.",source:"Consulta la fonte tecnica originale",
  archiveTitle:"Valutare la soluzione",archiveText:"L'archivio fotografico documenta la famiglia di prodotti; dimensioni, varianti e compatibilità dell'allestimento sono da verificare per il singolo impianto.",
  requirements:["Applicazione e tipologia di impianto","Dimensioni o quantità richieste","Località del progetto e tempi indicativi"],
  enquiry:"Richiedi informazioni su questo prodotto",sectorTitle:"Il perimetro del nostro intervento",
  sectorText:[
   "Il catalogo documenta strutture per stalle, pensiline, portici, coperture e carpenterie per applicazioni industriali.",
   "Il catalogo comprende attrezzature per l'organizzazione degli spazi di allevamento: autocatture, battifianco, cancelli, abbeveratoi e accessori.",
   "Sono documentate carpenterie, collegamenti e lavorazioni su progetti biogas e biometano. La potenza di un impianto non descrive la fornitura Grimaldelli.",
   "Sono presenti interventi fotografici nel fotovoltaico. L'estensione della fornitura va valutata progetto per progetto."
  ],
  context:"Riferimento della richiesta",preview:"Questa è una preview: il modulo web non invia richieste. Puoi usare l'email con oggetto e contesto già preparati.",email:"Prepara un'email",formHelp:"Per una risposta utile, descrivi impianto, località, dimensioni e tempistiche.",
  subject:"Richiesta informazioni Grimaldelli",product:"Prodotto",sector:"Settore",project:"Progetto",note:"Informazioni sul contesto del progetto",location:"Località",quantity:"Dimensioni o quantità",timing:"Tempistiche",
  trustTitle:"Materiale documentato, perimetro da confermare",
  trustText:"Le fotografie e i dati degli impianti illustrano i progetti documentati; le specifiche forniture Grimaldelli vanno riferite al singolo intervento.",
  pressLabel:"Rassegna stampa e fonti pubbliche",pressText:"Articoli, interviste e documenti verificabili: distinti dalle recensioni e dalle testimonianze dei clienti."
 },
 en:{
  home:"Steelwork and livestock equipment: structures, products and documented projects for agriculture, industry and the energy sector.",
  proof:[["1921","A lasting industrial history"],["4","Fields of expertise"],["On site","Documented work and photographs"]],
  specTitle:"Features listed in the official product information",specNote:"These specifications come from the company's published information. Configuration and availability must be checked when enquiring.",source:"View the original product information",
  archiveTitle:"Assess the right solution",archiveText:"The photo archive illustrates the product family. Dimensions, variants and compatibility must be confirmed for each installation.",
  requirements:["Application and type of facility","Required dimensions or quantity","Project location and indicative timeline"],
  enquiry:"Enquire about this product",sectorTitle:"Scope of our work",
  sectorText:[
   "The catalogue documents livestock buildings, canopies, covered structures and steelwork for industrial applications.",
   "The catalogue includes livestock facility equipment such as headlocks, cubicle dividers, gates, watering equipment and accessories.",
   "Documented biogas and biomethane projects include fabrication, connections and related work. Plant capacity does not describe Grimaldelli's precise supply.",
   "Photovoltaic work is documented through project photographs. Supply scope must be verified for each project."
  ],
  context:"Enquiry reference",preview:"This is a preview: the web form cannot submit. You can prepare an email with the relevant subject and project context.",email:"Prepare an email",formHelp:"Describe the facility, location, dimensions and timeline to help us respond.",
  subject:"Grimaldelli enquiry",product:"Product",sector:"Sector",project:"Project",note:"Project details",location:"Location",quantity:"Dimensions or quantity",timing:"Timeline",
  trustTitle:"Documented projects, project-specific scope",trustText:"Photos and plant details describe the featured projects; Grimaldelli's actual supply must be established for each intervention.",
  pressLabel:"Press coverage and public sources",pressText:"Verifiable articles, interviews and documents, distinct from customer reviews or testimonials."
 },
 fr:{
  home:"Constructions métalliques et équipements d'élevage : structures, produits et projets documentés pour l'agriculture, l'industrie et l'énergie.",
  proof:[["1921","Une histoire industrielle"],["4","Domaines d'expertise"],["Sur le terrain","Travaux et photos documentés"]],
  specTitle:"Caractéristiques publiées dans la fiche officielle",specNote:"Ces indications proviennent de la documentation publiée par l'entreprise. La configuration et la disponibilité doivent être confirmées.",source:"Consulter la fiche produit originale",
  archiveTitle:"Évaluer la solution",archiveText:"Les photos illustrent la gamme. Les dimensions, variantes et compatibilités doivent être vérifiées pour chaque installation.",
  requirements:["Application et type d'installation","Dimensions ou quantités demandées","Localisation et calendrier envisagé"],
  enquiry:"Demander des informations sur ce produit",sectorTitle:"Notre périmètre d'intervention",
  sectorText:[
   "Le catalogue présente des bâtiments d'élevage, auvents, structures couvertes et ouvrages métalliques industriels.",
   "Le catalogue comprend des cornadis, séparations, portails, équipements d'abreuvement et accessoires d'élevage.",
   "Des ouvrages métalliques et raccordements sont documentés dans des projets biogaz et biométhane. La puissance ne définit pas notre fourniture.",
   "Des travaux photovoltaïques sont documentés par des photographies. Le périmètre des prestations dépend du chantier."
  ],
  context:"Référence de la demande",preview:"Il s'agit d'un aperçu : le formulaire ne peut pas envoyer de message. Vous pouvez préparer un courriel avec le contexte du projet.",email:"Préparer un courriel",formHelp:"Précisez l'installation, le lieu, les dimensions et le calendrier.",
  subject:"Demande d'informations Grimaldelli",product:"Produit",sector:"Secteur",project:"Projet",note:"Contexte du projet",location:"Localité",quantity:"Dimensions ou quantité",timing:"Délais",
  trustTitle:"Projets documentés, prestations à confirmer",trustText:"Les photos et les puissances concernent les projets présentés ; le périmètre exact des travaux de Grimaldelli dépend de chacun.",
  pressLabel:"Presse et sources publiques",pressText:"Articles, interviews et documents vérifiables, distincts des avis ou témoignages de clients."
 },
 de:{
  home:"Stahlbau und Stalleinrichtungen: Bauwerke, Produkte und dokumentierte Projekte für Landwirtschaft, Industrie und Energiewirtschaft.",
  proof:[["1921","Industrielle Geschichte"],["4","Kompetenzbereiche"],["Vor Ort","Dokumentierte Arbeiten und Fotos"]],
  specTitle:"Angaben aus der offiziellen Produktbeschreibung",specNote:"Die Angaben stammen aus den veröffentlichten Informationen des Unternehmens. Ausführung und Verfügbarkeit sind anzufragen.",source:"Originale Produktinformation ansehen",
  archiveTitle:"Die passende Lösung prüfen",archiveText:"Das Bildarchiv zeigt die Produktfamilie. Maße, Varianten und Eignung müssen für jede Anlage bestätigt werden.",
  requirements:["Anwendungsfall und Anlagentyp","Gewünschte Maße oder Menge","Projektort und ungefährer Zeitplan"],
  enquiry:"Informationen zu diesem Produkt anfordern",sectorTitle:"Umfang unserer Leistungen",
  sectorText:[
   "Im Katalog sind Stallgebäude, Überdachungen, offene Stahlkonstruktionen und Stahlbau für Industrieanwendungen dokumentiert.",
   "Der Katalog zeigt Fressgitter, Liegeboxenabtrennungen, Tore, Tränken und weitere Stallausstattung.",
   "Für Biogas- und Biomethanprojekte sind Stahlbauarbeiten und Verbindungen dokumentiert. Die Anlagenleistung beschreibt nicht den tatsächlichen Lieferumfang.",
   "Photovoltaikarbeiten sind mit Fotos dokumentiert. Der genaue Leistungsumfang muss für jedes Projekt geprüft werden."
  ],
  context:"Bezug der Anfrage",preview:"Dies ist eine Vorschau: Das Webformular versendet keine Anfragen. Eine E-Mail mit vorbereitetem Betreff und Kontext ist möglich.",email:"E-Mail vorbereiten",formHelp:"Bitte Anlage, Standort, Maße und Zeitrahmen angeben.",
  subject:"Anfrage an Grimaldelli",product:"Produkt",sector:"Bereich",project:"Projekt",note:"Projektbeschreibung",location:"Standort",quantity:"Maße oder Menge",timing:"Zeitrahmen",
  trustTitle:"Dokumentierte Projekte, Leistungsumfang je Auftrag",trustText:"Fotos und Anlagenangaben beziehen sich auf dokumentierte Projekte; der genaue Lieferumfang von Grimaldelli ist je Auftrag zu prüfen.",
  pressLabel:"Presse und öffentliche Quellen",pressText:"Nachprüfbare Artikel, Interviews und Dokumente, nicht mit Kundenbewertungen gleichzusetzen."
 }
};
const SCRAPER_SPECS={
 it:[
  "Zugseil aus Polyester oder Edelstahl",
  "Frostschutz-Zyklus vorgesehen",
  "Leistungsbereich laut offizieller Produktbeschreibung: 0,76–1,1 kW",
  "Computersteuerung und elektrische Tagesprogrammierung",
  "Betrieb mit oder ohne Führungsnut",
  "Motoren bodennah oder erhöht montierbar",
  "Starres Räumschild oder Ausführung mit gelenkigen Flügeln"
 ],
 en:[
  "High-strength polyester rope or stainless-steel cable",
  "Anti-freeze cycle listed",
  "Power range in the published product information: 0.76–1.1 kW",
  "Computer control and daily programmable timer",
  "Operation with or without a guide groove",
  "Ground-level or elevated motor positions",
  "Fixed scraper blade or articulated wings"
 ],
 fr:[
  "Corde en polyester haute ténacité ou câble inox",
  "Cycle antigel prévu",
  "Puissance publiée : 0,76–1,1 kW",
  "Commande informatisée et minuterie programmable",
  "Fonctionnement avec ou sans rainure de guidage",
  "Moteurs au sol ou en hauteur",
  "Lame fixe ou à ailes articulées"
 ],
 de:[
  "Hochfestes Polyesterseil oder Edelstahlseil",
  "Frostschutz-Zyklus vorgesehen",
  "Leistungsbereich laut Produktbeschreibung: 0,76–1,1 kW",
  "Computersteuerung und programmierbare Zeitschaltuhr",
  "Betrieb mit oder ohne Führungsnut",
  "Motoren bodennah oder erhöht montierbar",
  "Festes Räumschild oder bewegliche Flügel"
 ]
};
SCRAPER_SPECS.it=[
 "Trazione mediante fune in poliestere oppure cavo in acciaio inox",
 "Ciclo antighiaccio previsto nella scheda ufficiale",
 "Potenza indicata: 0,76–1,1 kW, in funzione della configurazione",
 "Controllo computerizzato e temporizzatore per programmazione giornaliera",
 "Funzionamento con o senza incavo guida",
 "Motori installabili a terra o in posizione rialzata",
 "Blocco raschiante fisso oppure con ali snodate"
];
function esc(value){return String(value==null?"":value).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]});}
function ui(ctx,lang){return C[lang]||C.it;}
function upsertMeta(selector,attr,key,value){
 let node=document.querySelector(selector);
 if(!node){node=document.createElement("meta");node.setAttribute(attr,key);document.head.appendChild(node);}
 node.setAttribute("content",value);
}
function setMetadata(route,lang,ctx,t){
 const titleByRoute={
  "/":t.home.split(":")[0],
  "/azienda":{it:"Dal 1921: storia e competenze",en:"Company history since 1921",fr:"Histoire de l'entreprise depuis 1921",de:"Unternehmensgeschichte seit 1921"}[lang],
  "/prodotti":{it:"Catalogo prodotti e strutture",en:"Products and steel structures",fr:"Catalogue produits et structures",de:"Produkte und Stahlkonstruktionen"}[lang],
  "/realizzazioni":{it:"Lavori e realizzazioni documentati",en:"Documented projects",fr:"Réalisations documentées",de:"Dokumentierte Referenzen"}[lang],
  "/contatti":{it:"Contatti e richieste tecniche",en:"Contact and technical enquiries",fr:"Contact et demandes techniques",de:"Kontakt und technische Anfragen"}[lang],
  "/dicono-di-noi":t.pressLabel
 };
 let label=titleByRoute[route]||"";
 let description=t.home;
 if(route.startsWith("/prodotto/")){
  const p=ctx.products.find(p=>p.slug===route.split("/").pop());
  if(p){label=p.title+" | "+({it:"Prodotti",en:"Products",fr:"Produits",de:"Produkte"}[lang]);description=p.summary;}
 }
 if(route.startsWith("/soluzione/")){
  const sector=sectors.indexOf(route.split("/").pop());
  if(sector>=0){label=t.sectorText[sector].split(".")[0];description=t.sectorText[sector];}
 }
 if(route==="/realizzazioni")description=t.trustText;
 if(route==="/azienda")description={it:"Dal 1921 al presente: storia, persone e sviluppo industriale Grimaldelli.",en:"Grimaldelli's history, people and industrial development since 1921.",fr:"L'histoire, les personnes et le développement industriel de Grimaldelli depuis 1921.",de:"Geschichte, Menschen und industrielle Entwicklung von Grimaldelli seit 1921."}[lang];
 document.title=(label||"Grimaldelli")+" | Grimaldelli";
 upsertMeta('meta[name="description"]',"name","description",description.slice(0,165));
 upsertMeta('meta[property="og:title"]',"property","og:title",document.title);
 upsertMeta('meta[property="og:description"]',"property","og:description",description.slice(0,190));
}
function home(app,t){
 const subtitle=app.querySelector(".hero-salvirola .hero-bottom p");
 if(subtitle)subtitle.textContent=t.home;
 const strap=app.querySelector(".marquee-strap");
 if(!strap||app.querySelector(".p10-mkt-proof-strip"))return;
 const section=document.createElement("div");section.className="p10-mkt-proof-strip";
 section.innerHTML='<div class="section-container p10-mkt-proof-row">'+t.proof.map(item=>
  '<div class="p10-mkt-proof"><strong>'+esc(item[0])+'</strong><span>'+esc(item[1])+'</span></div>').join("")+'</div>';
 strap.insertAdjacentElement("afterend",section);
}
function sourceDetails(app,slug,t,lang){
 if(app.querySelector(".p10-mkt-product-evidence"))return;
 const detail=app.querySelector(".product-detail .detail-hero");
 if(!detail)return;
 const productName=app.querySelector(".product-detail .detail-hero h2")?.textContent?.trim()||slug;
 const official=slug==="raschiatori-asporta-letame";
 const evidence=document.createElement("section");
 evidence.className="p10-mkt-product-evidence section-container";
 let body="";
 if(official){
  body='<ul class="p10-mkt-spec-list">'+SCRAPER_SPECS[lang].map(spec=>'<li>'+esc(spec)+'</li>').join("")+'</ul>'+
  '<p class="p10-mkt-source">'+esc(t.specNote)+' <a href="'+productSource+'" target="_blank" rel="noopener noreferrer">'+esc(t.source)+' ↗</a></p>';
 }else{
  body='<p>'+esc(t.archiveText)+'</p><ul class="p10-mkt-request-list">'+t.requirements.map(item=>'<li>'+esc(item)+'</li>').join("")+'</ul>';
 }
 evidence.innerHTML='<div class="p10-mkt-evidence-head"><span>GRIMALDELLI / '+esc(official?"DOCUMENTAZIONE":"ARCHIVIO")+'</span><h3>'+esc(official?t.specTitle:t.archiveTitle)+'</h3></div><div class="p10-mkt-evidence-content">'+body+'</div>';
 detail.insertAdjacentElement("afterend",evidence);
 const cta=detail.querySelector('a[href="#/contatti"]');
 if(cta){cta.href="#/contatti?prodotto="+encodeURIComponent(slug);cta.setAttribute("aria-label",t.enquiry+": "+productName);}
 const related=document.createElement("div");related.className="p10-mkt-related";
 const group=window.GRIMALDELLI_DATA?.categories?.find(x=>x.slug===slug)?.group;
 const sector=group==="strutture"?"strutture":group==="zootecnia"?"zootecnia":null;
 if(sector){
  related.innerHTML='<a class="text-link" href="#/realizzazioni?settore='+sector+'">'+esc({it:"Esplora i lavori del settore",en:"Explore sector projects",fr:"Voir les projets du secteur",de:"Referenzen dieses Bereichs"}[lang])+' ↗</a>';
  evidence.insertAdjacentElement("afterend",related);
 }
}
function solution(app,route,t,lang){
 const id=route.split("/").pop(),ix=sectors.indexOf(id);
 if(ix<0)return;
 const actions=app.querySelector(".solution-detail-actions");
 if(!actions||app.querySelector(".p10-mkt-sector-note"))return;
 const div=document.createElement("aside");div.className="p10-mkt-sector-note";
 div.innerHTML='<strong>'+esc(t.sectorTitle)+'</strong><p>'+esc(t.sectorText[ix])+'</p>';
 actions.insertAdjacentElement("beforebegin",div);
 const cta=actions.querySelector('a[href="#/contatti"]');
 if(cta)cta.href="#/contatti?settore="+encodeURIComponent(id);
}
function contacts(app,ctx,t,lang){
 const form=app.querySelector("#form-contact");
 if(!form||app.querySelector(".p10-mkt-contact-context"))return;
 const selectedProduct=ctx.params.get("prodotto");
 const found=ctx.products.find(x=>x.slug===selectedProduct);
 const selectedSector=ctx.params.get("settore");
 const sectorIndex=sectors.indexOf(selectedSector);
 const subjectItem=found?found.title:sectorIndex>=0?({it:["Strutture metalliche","Zootecnia","Biogas e biometano","Fotovoltaico"],en:["Steel structures","Livestock","Biogas and biomethane","Photovoltaics"],fr:["Structures métalliques","Élevage","Biogaz et biométhane","Photovoltaïque"],de:["Stahlbau","Stalleinrichtungen","Biogas und Biomethan","Photovoltaik"]}[lang])[sectorIndex]:"";
 const kind=found?t.product:sectorIndex>=0?t.sector:t.project;
 const textarea=form.querySelector('textarea[name="message"]');
 if(subjectItem&&textarea&&!textarea.value){
  textarea.value=kind+": "+subjectItem+"\n\n"+t.note+":\n"+t.location+":\n"+t.quantity+":\n"+t.timing+":";
 }
 const box=document.createElement("div");box.className="p10-mkt-contact-context";
 box.innerHTML='<strong>'+esc(subjectItem?t.context+": "+subjectItem:t.formHelp)+'</strong>'+
  (subjectItem?'<p>'+esc(t.formHelp)+'</p>':'');
 form.insertAdjacentElement("beforebegin",box);
 const isPreview=!["www.glcgrimaldelli.com","glcgrimaldelli.com"].includes(location.hostname);
 if(!isPreview)return;
 const preview=document.createElement("div");preview.className="p10-mkt-preview-contact";
 preview.innerHTML='<p>'+esc(t.preview)+'</p><a class="p10-mkt-mail-action" href="mailto:'+officialEmail+'">'+esc(t.email)+' ↗</a>';
 box.insertAdjacentElement("afterend",preview);
 const anchor=preview.querySelector("a");
 function updateEmail(){
  const subject=t.subject+(subjectItem?" – "+subjectItem:"");
  const body=textarea?.value?.trim()||({it:"Descrivi qui la tua richiesta.",en:"Describe your enquiry here.",fr:"Décrivez votre demande.",de:"Beschreiben Sie Ihre Anfrage."}[lang]);
  anchor.href="mailto:"+officialEmail+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
 }
 updateEmail();textarea?.addEventListener("input",updateEmail);
}
function projects(app,t){
 const content=app.querySelector("#p10-projects-content");
 if(!content||app.querySelector(".p10-mkt-project-note"))return;
 const note=document.createElement("p");note.className="p10-mkt-project-note";
 note.innerHTML='<strong>'+esc(t.trustTitle)+'.</strong> '+esc(t.trustText);
 content.insertAdjacentElement("beforeend",note);
}
function press(app,t){
 const intro=app.querySelector(".news-editorial-section");
 if(!intro||app.querySelector(".p10-mkt-press-note"))return;
 const note=document.createElement("div");note.className="p10-mkt-press-note section-container";
 note.innerHTML='<strong>'+esc(t.pressLabel)+':</strong> '+esc(t.pressText);
 intro.insertAdjacentElement("beforebegin",note);
}
function mount(route,lang,ctx){
 const app=ctx?.app;if(!app)return;
 const t=ui(ctx,lang);
 setMetadata(route,lang,ctx,t);
 if(route==="/")home(app,t);
 else if(route.startsWith("/prodotto/"))sourceDetails(app,route.split("/").pop(),t,lang);
 else if(route.startsWith("/soluzione/"))solution(app,route,t,lang);
 else if(route==="/contatti")contacts(app,ctx,t,lang);
 else if(route==="/realizzazioni")projects(app,t);
 else if(route==="/dicono-di-noi")press(app,t);
}
window.GrimaldelliMarketing={mount:mount};
})();