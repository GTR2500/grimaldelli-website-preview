/* P10 | Clickable continuous home marquee. No numeric project claims. */
(function(){
"use strict";
const sectors=[
 {key:"steel",href:"#/soluzione/strutture"},
 {key:"livestock",href:"#/soluzione/zootecnia"},
 {key:"biogas",href:"#/soluzione/biogas"},
 {key:"solar",href:"#/soluzione/fotovoltaico"}
];
const languages={
 it:{steel:"Carpenteria metallica",livestock:"Impianti zootecnici",biogas:"Biogas / Biometano",solar:"Fotovoltaico",works:"realizzazioni",explore:"Esplora"},
 en:{steel:"Steel fabrication",livestock:"Livestock facilities",biogas:"Biogas / Biomethane",solar:"Photovoltaics",works:"projects",explore:"Explore"},
 fr:{steel:"Construction métallique",livestock:"Installations d’élevage",biogas:"Biogaz / Biométhane",solar:"Photovoltaïque",works:"réalisations",explore:"Explorer"},
 de:{steel:"Metallbau",livestock:"Stalleinrichtungen",biogas:"Biogas / Biomethan",solar:"Photovoltaik",works:"Projekte",explore:"Entdecken"}
};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function contents(lang){
 const l=languages[lang]||languages.it;
 const segment=sectors.map(item=>{
  const accessible=l[item.key]+" — "+l.explore;
  return '<a class="p10-marquee-link" href="'+item.href+'" aria-label="'+esc(accessible)+'">'+
    '<span class="p10-marquee-name">'+esc(l[item.key])+'</span>'+
    '<span class="p10-marquee-chevron" aria-hidden="true">&#8599;</span></a>';
 }).join('<span class="p10-marquee-plus" aria-hidden="true">+</span>');
 return segment+'<span class="p10-marquee-plus" aria-hidden="true">+</span>';
}
function markup(lang){
 const sequence=contents(lang);
 return '<nav class="marquee-strap p10-marquee" aria-label="'+esc((languages[lang]||languages.it).explore)+'">'+
  '<div class="marquee-track p10-marquee-track">'+
   '<div class="p10-marquee-sequence">'+sequence+'</div>'+
   '<div class="p10-marquee-sequence" aria-hidden="true" inert>'+sequence+'</div>'+
  '</div></nav>';
}
function mount(locale,app){
 const node=app?.querySelector?.(".marquee-strap");
 if(!node)return false;
 const lang=languages[locale]?locale:"it";
 node.outerHTML=markup(lang);
 return true;
}
window.GrimaldelliMarquee={mount,markup,sectors,languages};
})();