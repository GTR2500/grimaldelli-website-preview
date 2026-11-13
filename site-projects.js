/* P10: Realizzazioni - compact filter and documented project portfolios. */
(function(){
"use strict";
const langText={
 it:{title:"Realizzazioni per settore",lead:"Scegli un ambito per esplorare i lavori documentati.",all:"Tutte",status:"Settore selezionato",sectors:["Strutture metalliche","Zootecnia","Biogas e biometano","Fotovoltaico"]},
 en:{title:"Projects by sector",lead:"Select a sector to explore documented work.",all:"All",status:"Selected sector",sectors:["Steel structures","Livestock","Biogas and biomethane","Photovoltaics"]},
 fr:{title:"Réalisations par secteur",lead:"Choisissez un domaine pour découvrir les travaux documentés.",all:"Toutes",status:"Secteur choisi",sectors:["Structures métalliques","Élevage","Biogaz et biométhane","Photovoltaïque"]},
 de:{title:"Referenzen nach Bereich",lead:"Wählen Sie einen Bereich, um dokumentierte Projekte zu sehen.",all:"Alle",status:"Gewählter Bereich",sectors:["Stahlbau","Stalleinrichtungen","Biogas und Biomethan","Photovoltaik"]}
};
const sectors=["strutture","zootecnia","biogas","fotovoltaico"];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let current=null;
function apply(){
 const c=current;
 if(!c||!c.app.contains(c.picker))return false;
 const chosen=c.selected,energy=c.app.querySelector("#p10-energy-portfolio");
 if(energy){
  const relevant=chosen==="tutti"||chosen==="biogas"||chosen==="fotovoltaico";
  energy.hidden=!relevant;
  if(relevant){
   energy.querySelectorAll(".p10-energy-case").forEach(card=>{
    card.hidden=chosen!=="tutti"&&card.dataset.energySector!==chosen;
   });
   const labels=window.GrimaldelliEnergy?.text?.[c.lang];
   if(labels){
    const heading=energy.querySelector(".p10-energy-portfolio-head h2");
    const lead=energy.querySelector(".p10-energy-portfolio-head p");
    const source=energy.querySelector(".p10-energy-footnote span");
    if(heading)heading.textContent=chosen==="biogas"?labels.biogas:chosen==="fotovoltaico"?labels.solar:labels.comparison;
    if(lead)lead.textContent=chosen==="biogas"?labels.bioIntro:chosen==="fotovoltaico"?labels.solarIntro:labels.homeLead;
    if(source)source.textContent=chosen==="biogas"?labels.bioSource:chosen==="fotovoltaico"?labels.solarSource:labels.source;
   }
  }
 }
 const social=c.app.querySelector("#p10-social-showcase");
 if(social){
  const posts=window.GrimaldelliInstagram?.posts||[];
  let visible=0;
  social.querySelectorAll("[data-work-id]").forEach(card=>{
   const post=posts.find(p=>p.id===card.dataset.workId);
   const structure=post?.id==="franciosi"||post?.id==="biloni";
   const livestock=post?.category==="livestock";
   const solar=post?.category==="energy";
   // Nisoli/Ginelli are already present in the energy case studies.
   const keep=chosen==="tutti"?(livestock||(!energy&&solar)):
    chosen==="strutture"?structure:
    chosen==="zootecnia"?livestock:
    chosen==="fotovoltaico"?!energy&&solar:false;
   card.hidden=!keep;if(keep)visible++;
  });
  social.hidden=visible===0;
 }
 c.picker.querySelectorAll("[data-p10-project-sector]").forEach(button=>{
  const on=button.dataset.p10ProjectSector===chosen;
  button.classList.toggle("is-active",on);
  button.setAttribute("aria-pressed",String(on));
 });
 const note=c.picker.querySelector("#p10-projects-selection-note");
 if(note)note.textContent=c.text.status+": "+(chosen==="tutti"?c.text.all:c.text.sectors[sectors.indexOf(chosen)]);
 return true;
}
function mount(route,lang,app){
 if(route!=="/realizzazioni"||!app||app.querySelector("#p10-projects-picker"))return false;
 const hero=app.querySelector(".page-hero"),content=app.querySelector("#p10-projects-content");
 if(!hero||!content)return false;
 const t=langText[lang]||langText.it;
 const section=document.createElement("section");
 section.id="p10-projects-picker";section.className="p10-projects-filter";
 const labels=[["tutti",t.all],...sectors.map((key,i)=>[key,t.sectors[i]])];
 section.innerHTML='<div class="section-container"><div class="p10-projects-filter-head"><h2>'+esc(t.title)+'</h2><p>'+esc(t.lead)+'</p></div>'+
  '<div class="p10-projects-tabs" role="group" aria-label="'+esc(t.title)+'">'+labels.map(([key,title])=>
   '<button type="button" class="p10-projects-tab" data-p10-project-sector="'+key+'" aria-pressed="false">'+esc(title)+'</button>').join("")+
  '</div><p class="p10-projects-filter-status" id="p10-projects-selection-note" role="status" aria-live="polite"></p></div>';
 hero.classList.add("p10-projects-hero");hero.insertAdjacentElement("afterend",section);
 const q=new URLSearchParams(window.location.hash.split("?")[1]||"").get("settore");
 current={app,picker:section,selected:sectors.includes(q)?q:"tutti",text:t,lang};
 section.addEventListener("click",event=>{
  const button=event.target.closest("[data-p10-project-sector]");
  if(!button||!section.contains(button))return;
  current.selected=button.dataset.p10ProjectSector;
  const next=current.selected==="tutti"?"#/realizzazioni":"#/realizzazioni?settore="+current.selected;
  window.history.replaceState(null,"",window.location.pathname+window.location.search+next);
  apply();
  const target=(current.selected==="biogas"||current.selected==="fotovoltaico")?
   app.querySelector("#p10-energy-portfolio"):app.querySelector("#p10-social-showcase");
  if(target&&!target.hidden)target.scrollIntoView({block:"start",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
 });
 return apply();
}
window.GrimaldelliProjects={mount,refresh:apply};
})();
