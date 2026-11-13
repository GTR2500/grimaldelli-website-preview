/* P10 Energy: project-driven presentation, using only verified Grimaldelli media and sources.
 * Biogas plant capacities describe the project, not Grimaldelli's EPC scope.
 */
(function(){
"use strict";
const text={
it:{
 eyebrow:"ENERGIA / REALIZZAZIONI",homeTitle:"L'esperienza sul campo.<br><em>Al servizio dell'energia.</em>",
 homeLead:"Due mercati distinti, competenze industriali concrete: carpenterie e collegamenti per biogas e biometano; strutture e interventi documentati nel fotovoltaico.",
 biogas:"Biogas e biometano",solar:"Fotovoltaico",caseStudy:"Realizzazioni documentate",
 more:"Esplora il settore",watch:"Esamina le fotografie",photos:"fotografie",details:"Scheda intervento",
 bioIntro:"Carpenterie metalliche, collegamenti e lavorazioni specifiche che contribuiscono alla realizzazione di progetti biogas e biometano. Grimaldelli non si presenta come costruttore dell'impianto completo.",
 solarIntro:"Interventi e realizzazioni per il settore fotovoltaico, con documentazione fotografica di lavori aziendali. I dettagli di fornitura e installazione vengono attribuiti solo quando verificati.",
 power:"Potenza dell'impianto documentato",bioSource:"Interventi censiti nell'archivio storico Grimaldelli",solarSource:"Fotografie pubblicate sul profilo ufficiale Grimaldelli",
 scopeBio:"Carpenteria e collegamenti: il perimetro della fornitura varia in base al progetto e non è desumibile dalla sola potenza dell'impianto.",
 scopeSolar:"La potenza è riferita al progetto indicato nella pubblicazione aziendale; la documentazione tecnica del singolo intervento resta la fonte per definire l'esatto perimetro.",
 close:"Chiudi",next:"Fotografia successiva",previous:"Fotografia precedente",status:"Archivio realizzazioni",comparison:"Competenze specifiche, progetti concreti",
 context:"Le nostre competenze",source:"Fonte: archivio Grimaldelli",notEpc:"Le potenze indicate si riferiscono agli impianti documentati, non a un ruolo di fornitore EPC.",
 allProjects:"Tutte le realizzazioni"
},
en:{
 eyebrow:"ENERGY / PROJECTS",homeTitle:"Hands-on experience.<br><em>Supporting the energy sector.</em>",
 homeLead:"Two markets, practical industrial expertise: metalwork and connections for biogas and biomethane; structures and documented work in photovoltaics.",
 biogas:"Biogas and biomethane",solar:"Photovoltaics",caseStudy:"Documented projects",
 more:"Explore this sector",watch:"View project photos",photos:"photos",details:"Project overview",
 bioIntro:"Metal fabrication, connections and specific components for biogas and biomethane projects. Grimaldelli does not claim to build entire plants.",
 solarIntro:"Documented works and projects in photovoltaics, illustrated by Grimaldelli's own project photographs. The precise supply and installation scope is stated only where documented.",
 power:"Documented plant capacity",bioSource:"Projects in Grimaldelli's historical archive",solarSource:"Photographs published by Grimaldelli's official account",
 scopeBio:"Fabrication and connections: the supply scope varies by project and cannot be inferred from plant capacity alone.",
 scopeSolar:"Capacity refers to the project mentioned in the company publication; project documentation defines the precise scope of work.",
 close:"Close",next:"Next photo",previous:"Previous photo",status:"Project archive",comparison:"Specialist expertise, real projects",
 context:"Our capabilities",source:"Source: Grimaldelli archive",notEpc:"Quoted capacities relate to documented plants, not to a turnkey EPC role.",
 allProjects:"All projects"
},
fr:{
 eyebrow:"ÉNERGIE / RÉALISATIONS",homeTitle:"L'expérience du terrain.<br><em>Au service de l'énergie.</em>",
 homeLead:"Deux marchés, un savoir-faire industriel concret : constructions métalliques et raccordements pour le biogaz et le biométhane, structures et travaux documentés dans le photovoltaïque.",
 biogas:"Biogaz et biométhane",solar:"Photovoltaïque",caseStudy:"Réalisations documentées",
 more:"Découvrir ce secteur",watch:"Voir les photographies",photos:"photos",details:"Présentation du projet",
 bioIntro:"Constructions métalliques, raccordements et composants spécifiques pour les projets biogaz et biométhane. Grimaldelli ne prétend pas construire des installations complètes.",
 solarIntro:"Travaux et réalisations photovoltaïques documentés par des photographies de l'entreprise. Le périmètre exact des prestations est précisé uniquement lorsqu'il est vérifié.",
 power:"Puissance de l'installation documentée",bioSource:"Réalisations de l'archive historique Grimaldelli",solarSource:"Photographies du profil officiel de Grimaldelli",
 scopeBio:"Le périmètre de la fourniture varie selon les projets et ne peut être déduit de la seule puissance de l'installation.",
 scopeSolar:"La puissance concerne le projet présenté dans la publication de l'entreprise ; les documents techniques précisent le périmètre exact.",
 close:"Fermer",next:"Photo suivante",previous:"Photo précédente",status:"Archives des projets",comparison:"Des compétences ciblées, des réalisations concrètes",
 context:"Nos compétences",source:"Source : archives Grimaldelli",notEpc:"Les puissances indiquées concernent les installations présentées, sans impliquer une fourniture clés en main.",
 allProjects:"Toutes les réalisations"
},
de:{
 eyebrow:"ENERGIE / REFERENZEN",homeTitle:"Erfahrung aus der Praxis.<br><em>Für den Energiesektor.</em>",
 homeLead:"Zwei Märkte, konkrete industrielle Kompetenzen: Stahlbau und Verbindungen für Biogas und Biomethan sowie dokumentierte Arbeiten im Photovoltaikbereich.",
 biogas:"Biogas und Biomethan",solar:"Photovoltaik",caseStudy:"Dokumentierte Projekte",
 more:"Fachbereich entdecken",watch:"Projektfotos ansehen",photos:"Fotos",details:"Projektübersicht",
 bioIntro:"Metallkonstruktionen, Verbindungen und spezifische Komponenten für Biogas- und Biomethanprojekte. Grimaldelli beansprucht nicht, komplette Anlagen zu errichten.",
 solarIntro:"Dokumentierte Photovoltaikarbeiten und Projekte mit echten Firmenfotos. Der genaue Liefer- und Montageumfang wird nur genannt, wenn er belegt ist.",
 power:"Leistung der dokumentierten Anlage",bioSource:"Projekte im historischen Grimaldelli-Archiv",solarSource:"Fotos vom offiziellen Grimaldelli-Profil",
 scopeBio:"Der Lieferumfang variiert je nach Projekt und lässt sich nicht allein aus der Anlagenleistung ableiten.",
 scopeSolar:"Die Leistung bezieht sich auf das im Unternehmensbeitrag beschriebene Projekt; der genaue Leistungsumfang ergibt sich aus den technischen Unterlagen.",
 close:"Schließen",next:"Nächstes Foto",previous:"Vorheriges Foto",status:"Projektarchiv",comparison:"Spezialisierte Kompetenz, reale Projekte",
 context:"Unsere Kompetenzen",source:"Quelle: Grimaldelli-Archiv",notEpc:"Die angegebenen Leistungen beziehen sich auf dokumentierte Anlagen, nicht auf einen schlüsselfertigen EPC-Auftrag.",
 allProjects:"Alle Referenzen"
}
};
const solarCases=[
 {id:"nisoli",name:"Azienda Nisoli",place:"Brignano Gera d'Adda (BG)",capacity:"122 kW",images:[
  "assets/instagram/nisoli/image-01.webp","assets/instagram/nisoli/image-02.webp","assets/instagram/nisoli/image-03.webp"],source:"https://www.instagram.com/grimaldellisrl/p/CvrdB_ionuY/"},
 {id:"ginelli",name:"Azienda Ginelli",place:"Bagnolo Cremasco (CR)",capacity:"75 kW",images:[
  "assets/instagram/ginelli/image-01.webp","assets/instagram/ginelli/image-02.webp"],source:"https://www.instagram.com/grimaldellisrl/p/CvrJrWbItUF/"}
];
const languages=Object.keys(text);
const esc=s=>String(s??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const within=src=>typeof src==="string"&&/^assets\/(?:instagram\/(?:nisoli|ginelli)\/image-\d+\.webp|energy\/(?:biogas|photovoltaic)\/[a-z0-9-]+\/\d+\.webp)$/.test(src)?src:"";
const pathOf=ref=>typeof ref==="string"&&ref.startsWith("assets/")?ref:ref?.replace(/^\/+/,"")||"";
let manifestPromise,solarManifestPromise;
const photovoltaic=()=>{
 if(!solarManifestPromise)solarManifestPromise=fetch("assets/energy/photovoltaic/manifest.json",{cache:"force-cache",credentials:"same-origin"})
   .then(r=>r.ok?r.json():{projects:[]}).then(j=>Array.isArray(j.projects)?j.projects:[]).catch(()=>[]);
 return solarManifestPromise;
};
const biogas=()=>{
 if(!manifestPromise)manifestPromise=fetch("assets/energy/biogas/manifest.json",{cache:"force-cache",credentials:"same-origin"})
   .then(r=>r.ok?r.json():{projects:[]}).then(j=>Array.isArray(j.projects)?j.projects:[]).catch(()=>[]);
 return manifestPromise;
};
const fieldName=(it,lang)=>{
 if(lang==="it")return it;
 const map={"Az. Agr.":"Farm","Soc. Agr.":"Farm","Società Agricola":"Farm"};
 return it.replace(/^Az\. Agr\.|^Soc\. Agr\.|^Società Agricola/,x=>map[x]||x);
};
const normalized=project=>({
 id:project.id,
 name:project.name.replace(/\s*[-–]\s*Biogas\s+\d+\s*kW.*/i,"").trim(),
 place:project.place,
 capacity:project.declared_plant_power_kw?project.declared_plant_power_kw+" kW":"",
 images:project.images.map(i=>within(pathOf(i.path))).filter(Boolean),
 source:project.source
});
const caseCard=(p,lang,kind)=>{
 const t=text[lang];
 if(!p.images?.length)return "";
 const first=within(p.images[0]);if(!first)return "";
 const n=kind==="biogas"?fieldName(p.name,lang):p.name;
 return '<article class="p10-energy-case" data-energy-case="'+esc(p.id)+'">'+
 '<div class="p10-energy-case-image"><img src="'+esc(first)+'" loading="lazy" decoding="async" alt="'+esc(n)+'">'+
 '<span class="p10-energy-kind">'+esc(kind==="biogas"?t.biogas:t.solar)+'</span></div>'+
 '<div class="p10-energy-case-body"><div class="p10-energy-case-head"><div><h3>'+esc(n)+'</h3><p>'+esc(p.place)+'</p></div>'+
 '<span class="p10-energy-capacity">'+esc(p.capacity)+'</span></div>'+
 '<p class="p10-energy-scope">'+esc(kind==="biogas"?t.scopeBio:t.scopeSolar)+'</p>'+
 '<button class="p10-energy-open" type="button" data-energy-open="'+esc(kind)+':'+esc(p.id)+'">'+esc(t.watch)+' <span aria-hidden="true">&#8599;</span></button></div></article>';
};
const sectorTile=(kind,photo,lang)=>{
 const t=text[lang],title=kind==="biogas"?t.biogas:t.solar,desc=kind==="biogas"?t.bioIntro:t.solarIntro,route="#/soluzione/"+(kind==="biogas"?"biogas":"fotovoltaico");
 return '<a class="p10-energy-tile" href="'+route+'"><div class="p10-energy-tile-media"><img src="'+esc(photo)+'" loading="lazy" alt="'+esc(title)+'"></div>'+
 '<div class="p10-energy-tile-copy"><div class="p10-energy-overline">'+esc(t.eyebrow)+'</div><h3>'+esc(title)+'</h3><p>'+esc(desc)+'</p>'+
 '<span class="p10-energy-sector-cta">'+esc(t.more)+' <b aria-hidden="true">&#8599;</b></span></div></a>';
};
function wireGallery(section,cases,lang){
 const t=text[lang];
 const dlg=document.createElement("dialog");dlg.className="p10-energy-dialog";
 dlg.innerHTML='<button class="p10-energy-dialog-close" type="button" aria-label="'+esc(t.close)+'">&#10005;</button>'+
 '<img alt=""><div class="p10-energy-dialog-bottom"><button type="button" data-energy-prev aria-label="'+esc(t.previous)+'">&#8592;</button>'+
 '<span class="p10-energy-dialog-caption"></span>'+
 '<button type="button" data-energy-next aria-label="'+esc(t.next)+'">&#8594;</button></div>';
 section.appendChild(dlg);
 let selected=null,index=0;
 const refresh=()=>{
  if(!selected)return;
  const src=selected.images[index];const image=dlg.querySelector("img");
  image.src=src;image.alt=selected.name+" ("+(index+1)+")";
  dlg.querySelector(".p10-energy-dialog-caption").textContent=selected.name+" · "+(index+1)+" / "+selected.images.length;
 };
 section.addEventListener("click",event=>{
  const trigger=event.target.closest("[data-energy-open]");
  if(!trigger)return;
  const [kind,id]=trigger.getAttribute("data-energy-open").split(":");
  selected=cases.find(p=>p.id===id&&p.kind===kind);
  if(!selected)return;index=0;refresh();dlg.showModal();
 });
 dlg.addEventListener("click",event=>{
  if(event.target===dlg||event.target.closest(".p10-energy-dialog-close")){dlg.close();return;}
  if(event.target.closest("[data-energy-prev]")){index=(index-1+selected.images.length)%selected.images.length;refresh();}
  else if(event.target.closest("[data-energy-next]")){index=(index+1)%selected.images.length;refresh();}
 });
}
async function mount(route,lang,app){
 const isHome=route==="/",isProjects=route==="/realizzazioni";
 const isBiogas=route==="/soluzione/biogas",isSolar=route==="/soluzione/fotovoltaico";
 if(!(isHome||isProjects||isBiogas||isSolar))return false;
 const t=text[lang]||text.it;
 const origin=window.location.href;
 const [oldBiogas,oldSolar]=await Promise.all([biogas(),photovoltaic()]);
 const historical=oldBiogas.map(normalized).filter(p=>p.images.length);
 if(app.isConnected===false||window.location.href!==origin)return false;
 const historicalSolar=oldSolar.map(p=>({
   id:p.id,
   name:p.name.replace(/(?:impianto|campo)\s+fotovoltaico[\s\S]*/i,"").replace(/[-–\s]+$/,"").trim(),
   place:(p.name.match(/(?:Ossago Lodigiano|Credera Rubbiano|Castelvisconti|Brignano Gera D[’']Adda)\s*\([A-Z]{2}\)/i)||[])[0]||"",
   capacity:p.capacity||"",
   source:p.source,
   images:p.images.map(x=>within(pathOf(x.path))).filter(Boolean)
 })).filter(p=>p.images.length);
 const solarUnique=historicalSolar.filter(p=>!p.id.includes("nisoli"));
 const nisoliArchive=historicalSolar.find(p=>p.id.includes("nisoli"));
 const solar=[
   ...solarUnique,
   ...solarCases.map(p=>p.id==="nisoli"&&nisoliArchive?
      {...p,capacity:nisoliArchive.capacity||p.capacity,
       images:[...nisoliArchive.images,...p.images]}:p)
 ].filter(p=>p.images.every(within));
 if(!historical.length&&!solar.length)return false;
 let html="";
 if(isHome){
  const firstBiogas=historical[0]?.images[0]||"";
  const firstSolar=solar[0]?.images[0]||"";
  html='<section class="p10-energy-feature" id="p10-energy-home"><div class="section-container">'+
    '<div class="p10-energy-feature-header"><span class="p10-energy-overline">'+esc(t.eyebrow)+'</span>'+
    '<h2>'+t.homeTitle+'</h2><p>'+esc(t.homeLead)+'</p></div>'+
    '<div class="p10-energy-sector-grid">'+(firstBiogas?sectorTile("biogas",firstBiogas,lang):"")+
    (firstSolar?sectorTile("solar",firstSolar,lang):"")+'</div></div></section>';
 }else{
  const items=isBiogas?historical:isSolar?solar:[...historical,...solar];
  if(!items.length)return false;
  const head=isBiogas?t.biogas:isSolar?t.solar:t.comparison;
  const intro=isBiogas?t.bioIntro:isSolar?t.solarIntro:t.homeLead;
  const prefix=isBiogas?"biogas":isSolar?"solar":null;
  html='<section class="p10-energy-portfolio" id="p10-energy-portfolio"><div class="section-container">'+
    '<header class="p10-energy-portfolio-head"><div><span class="p10-energy-overline">'+esc(t.eyebrow)+'</span>'+
    '<h2>'+esc(head)+'</h2></div><p>'+esc(intro)+'</p></header>'+
    '<div class="p10-energy-case-grid">'+items.map(p=>caseCard(p,lang,historical.includes(p)?"biogas":"solar")).join("")+'</div>'+
    '<div class="p10-energy-footnote"><span>'+esc(isSolar?t.solarSource:isBiogas?t.bioSource:t.source)+'</span>'+
    '<span>'+esc(t.notEpc)+'</span></div></div></section>';
 }
 const marker=isHome?app.querySelector(".feature-section"):null;
 if(marker)marker.insertAdjacentHTML("beforebegin",html);
 else app.insertAdjacentHTML("beforeend",html);
 const section=app.querySelector(isHome?"#p10-energy-home":"#p10-energy-portfolio");
 if(!section)return false;
 if(!isHome){
  const cases=[
   ...historical.map(p=>({...p,kind:"biogas"})),
   ...solar.map(p=>({...p,kind:"solar"}))
  ];
  wireGallery(section,cases,lang);
 }
 return true;
}
window.GrimaldelliEnergy={mount,text};
})();
