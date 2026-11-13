/* P10 - Realizzazioni: sector-first discovery, non-destructive filtering of the existing galleries. */
(function(){
"use strict";
const copy={
 it:{eyebrow:"REALIZZAZIONI / SETTORI",title:"Scegli il settore <em>da esplorare.</em>",lead:"Carpenteria, allevamento ed energia: seleziona un ambito per vedere le realizzazioni pertinenti.",all:"Tutte le realizzazioni",allNote:"Archivio completo: strutture, zootecnia, biogas e fotovoltaico.",showing:"Settore selezionato",sectors:{strutture:"Strutture metalliche",zootecnia:"Zootecnia",biogas:"Biogas e biometano",fotovoltaico:"Fotovoltaico"}},
 en:{eyebrow:"PROJECTS / SECTORS",title:"Explore projects <em>by sector.</em>",lead:"Steelwork, livestock and energy: select a field to see the relevant projects.",all:"All projects",allNote:"Full archive: structures, livestock, biogas and photovoltaics.",showing:"Selected sector",sectors:{strutture:"Steel structures",zootecnia:"Livestock",biogas:"Biogas and biomethane",fotovoltaico:"Photovoltaics"}},
 fr:{eyebrow:"RÉALISATIONS / SECTEURS",title:"Explorer les réalisations <em>par secteur.</em>",lead:"Métallerie, élevage et énergie : choisissez un domaine pour découvrir les réalisations correspondantes.",all:"Toutes les réalisations",allNote:"Archives complètes : structures, élevage, biogaz et photovoltaïque.",showing:"Secteur sélectionné",sectors:{strutture:"Structures métalliques",zootecnia:"Élevage",biogas:"Biogaz et biométhane",fotovoltaico:"Photovoltaïque"}},
 de:{eyebrow:"REFERENZEN / BEREICHE",title:"Projekte <em>nach Bereich.</em>",lead:"Stahlbau, Tierhaltung und Energie: Wählen Sie einen Bereich und sehen Sie die entsprechenden Referenzen.",all:"Alle Referenzen",allNote:"Gesamtes Archiv: Stahlbau, Tierhaltung, Biogas und Photovoltaik.",showing:"Gewählter Bereich",sectors:{strutture:"Stahlbau",zootecnia:"Stalleinrichtungen",biogas:"Biogas und Biomethan",fotovoltaico:"Photovoltaik"}}
};
const kinds=["strutture","zootecnia","biogas","fotovoltaico"];
const galleryKinds=["strutture","strutture","strutture","zootecnia","zootecnia","zootecnia"];
const photos={
 biogas:"assets/energy/biogas/campagnari/03.webp",
 fotovoltaico:"assets/energy/photovoltaic/soc-agr-aurora-credera-rubbiano-cr-impianto-fotovoltaico-da-1224-kw/01.webp"
};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let current=null;

function apply(){
 const c=current;
 if(!c||!c.app.contains(c.picker))return false;
 const sector=c.selected;
 c.cards.forEach((card,i)=>{card.hidden=sector!=="tutti"&&galleryKinds[i]!==sector;});
 c.gallery.hidden=sector==="biogas"||sector==="fotovoltaico";
 const energy=c.slot.querySelector("#p10-energy-portfolio");
 if(energy){
  const showEnergy=sector==="tutti"||sector==="biogas"||sector==="fotovoltaico";
  energy.hidden=!showEnergy;
  const labels=(window.GrimaldelliEnergy&&window.GrimaldelliEnergy.text[c.lang])||null;
  if(showEnergy){
   energy.querySelectorAll(".p10-energy-case").forEach(card=>{
    card.hidden=sector!=="tutti"&&card.getAttribute("data-energy-sector")!==sector;
   });
   if(labels){
    const heading=energy.querySelector(".p10-energy-portfolio-head h2");
    const lead=energy.querySelector(".p10-energy-portfolio-head p");
    const source=energy.querySelector(".p10-energy-footnote span");
    if(heading)heading.textContent=sector==="biogas"?labels.biogas:sector==="fotovoltaico"?labels.solar:labels.comparison;
    if(lead)lead.textContent=sector==="biogas"?labels.bioIntro:sector==="fotovoltaico"?labels.solarIntro:labels.homeLead;
    if(source)source.textContent=sector==="biogas"?labels.bioSource:sector==="fotovoltaico"?labels.solarSource:labels.source;
   }
  }
 }
 c.picker.querySelectorAll("[data-p10-project-sector]").forEach(button=>{
  const on=button.getAttribute("data-p10-project-sector")===sector;
  button.setAttribute("aria-pressed",String(on));
  button.classList.toggle("is-active",on);
 });
 const note=c.picker.querySelector("#p10-projects-selection-note");
 if(note)note.textContent=sector==="tutti"?c.text.allNote:c.text.showing+": "+c.text.sectors[sector];
 return true;
}
function mount(route,lang,app){
 if(route!=="/realizzazioni")return false;
 if(!app||app.querySelector("#p10-projects-picker"))return false;
 const hero=app.querySelector(".page-hero");
 const grid=app.querySelector(".section .feature-grid");
 const gallery=grid&&grid.closest("section");
 const cards=gallery?Array.from(gallery.querySelectorAll(".feature-tile")):[];
 if(!hero||!gallery||cards.length!==6)return false;
 const t=copy[lang]||copy.it;
 const pictures={
  strutture:cards[1].querySelector("img")?.getAttribute("src")||"",
  zootecnia:cards[3].querySelector("img")?.getAttribute("src")||"",
  biogas:photos.biogas,
  fotovoltaico:photos.fotovoltaico
 };
 const picker=document.createElement("section");
 picker.id="p10-projects-picker";
 picker.className="p10-projects-picker";
 picker.innerHTML='<div class="section-container">'+
  '<div class="p10-projects-picker-head"><div><span class="p10-projects-eyebrow">'+esc(t.eyebrow)+'</span>'+
  '<h2>'+t.title+'</h2></div><p>'+esc(t.lead)+'</p></div>'+
  '<div class="p10-projects-selector-grid" role="group" aria-label="'+esc(t.eyebrow)+'">'+
  kinds.map((kind,i)=>'<button type="button" class="p10-projects-tile" data-p10-project-sector="'+kind+'" aria-pressed="false">'+
   '<img src="'+esc(pictures[kind])+'" alt="" loading="eager" decoding="async">'+
   '<span class="p10-projects-tile-info"><small>'+String(i+1).padStart(2,"0")+' / 04</small>'+
   '<strong>'+esc(t.sectors[kind])+'</strong><span aria-hidden="true">&#8599;</span></span></button>').join("")+
  '</div><div class="p10-projects-picker-bottom">'+
  '<button type="button" class="p10-projects-all" data-p10-project-sector="tutti" aria-pressed="true">'+esc(t.all)+' <span aria-hidden="true">&#8599;</span></button>'+
  '<span class="p10-projects-selection-note" id="p10-projects-selection-note" role="status" aria-live="polite"></span></div></div>';
 hero.classList.add("p10-projects-hero");
 hero.insertAdjacentElement("afterend",picker);
 gallery.id="p10-project-gallery";
 const slot=document.createElement("div");
 slot.id="p10-projects-energy-slot";
 slot.className="p10-projects-energy-slot";
 gallery.insertAdjacentElement("afterend",slot);
 const param=new URLSearchParams((window.location.hash.split("?")[1]||"")).get("settore");
 const selected=kinds.includes(param)?param:"tutti";
 current={app,picker,gallery,cards,slot,text:t,lang,selected};
 picker.addEventListener("click",event=>{
  const button=event.target.closest("button[data-p10-project-sector]");
  if(!button||!picker.contains(button))return;
  current.selected=button.getAttribute("data-p10-project-sector");
  apply();
  const target=(current.selected==="biogas"||current.selected==="fotovoltaico")?
   slot.querySelector("#p10-energy-portfolio"):gallery;
  if(target)target.scrollIntoView({block:"start",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
 });
 return apply();
}
window.GrimaldelliProjects={mount,refresh:apply};
})();
