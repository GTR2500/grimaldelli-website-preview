/* P10 | Linkable, seamless continuous home marquee.
   Project totals are read from published first-party manifests, never hard-coded.
   Non-project sectors intentionally show no speculative counts.
*/
(function(){
"use strict";
const sectors=[
 {key:"steel",href:"#/soluzione/strutture"},
 {key:"livestock",href:"#/soluzione/zootecnia"},
 {key:"biogas",href:"#/soluzione/biogas",total:"biogas"},
 {key:"solar",href:"#/soluzione/fotovoltaico",total:"solar"}
];
const languages={
 it:{steel:"Carpenteria metallica",livestock:"Impianti zootecnici",biogas:"Biogas / Biometano",solar:"Fotovoltaico",works:"realizzazioni",explore:"Esplora"},
 en:{steel:"Steel fabrication",livestock:"Livestock facilities",biogas:"Biogas / Biomethane",solar:"Photovoltaics",works:"projects",explore:"Explore"},
 fr:{steel:"Construction métallique",livestock:"Installations d’élevage",biogas:"Biogaz / Biométhane",solar:"Photovoltaïque",works:"réalisations",explore:"Explorer"},
 de:{steel:"Metallbau",livestock:"Stalleinrichtungen",biogas:"Biogas / Biomethan",solar:"Photovoltaik",works:"Projekte",explore:"Entdecken"}
};
const sources={
 biogas:["assets/energy/biogas/manifest.json"],
 solar:["assets/energy/photovoltaic/manifest.json","assets/energy/photovoltaic-nas/manifest.json","assets/instagram/manifest.json"]
};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function valid(item){return item&&typeof item.id==="string"&&item.id.trim()&&Array.isArray(item.images)&&item.images.length>0;}
let countsPromise;
async function counts(){
 if(countsPromise)return countsPromise;
 countsPromise=(async()=>{
  const [bio,oldSolar,nasSolar,instagram]=await Promise.all([
   load(sources.biogas[0]),load(sources.solar[0]),load(sources.solar[1]),load(sources.solar[2])
  ]);
  const biogas=new Set((bio.projects||[]).filter(valid).map(p=>p.id));
  const solar=new Set([...((oldSolar.projects||[]).filter(valid)),...((nasSolar.projects||[]).filter(valid))].map(p=>p.id));
  // Nisoli was acquired both from the old website and Instagram: one distinct project.
  const instagramSolar=(instagram.media||[]).filter(p=>p&&p.id==="nisoli"||p&&p.id==="ginelli");
  for(const item of instagramSolar){
   if(!((item.images||[]).length||(item.videos||[]).length))continue;
   if(item.id==="nisoli"){if(![...solar].some(id=>id.includes("nisoli")))solar.add("nisoli");}
   else solar.add(item.id);
  }
  return {biogas:biogas.size,solar:solar.size};
 })();
 return countsPromise;
}
async function load(src){
 try{
  const response=await fetch(src,{credentials:"same-origin"});
  if(!response.ok)return {};
  return await response.json();
 }catch{return {};}
}
function contents(lang,totals){
 const l=languages[lang]||languages.it;
 const segment=sectors.map(item=>{
  const value=Number.isInteger(totals?.[item.total])&&totals[item.total]>0?totals[item.total]:0;
  const caption=value?'<span class="p10-marquee-count"><strong>'+value+'</strong><span>'+esc(l.works)+'</span></span>':'';
  const accessible=l[item.key]+(value?" — "+value+" "+l.works:" — "+l.explore);
  return '<a class="p10-marquee-link" href="'+item.href+'" aria-label="'+esc(accessible)+'">'+
    '<span class="p10-marquee-name">'+esc(l[item.key])+'</span>'+caption+
    '<span class="p10-marquee-chevron" aria-hidden="true">&#8599;</span></a>';
 }).join('<span class="p10-marquee-plus" aria-hidden="true">+</span>');
 // Trailing separator belongs to each identical sequence, ensuring no step at boundary.
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
async function mount(locale,app){
 const node=app?.querySelector?.(".marquee-strap");
 if(!node)return false;
 const lang=languages[locale]?locale:"it";
 node.outerHTML=markup(lang);
 const track=app.querySelector(".p10-marquee-track");
 if(!track)return false;
 const parent=track.closest(".p10-marquee");
 const expected=parent;
 const values=await counts();
 if(!expected.isConnected)return true;
 const newTrack=expected.querySelector(".p10-marquee-track");
 if(!newTrack)return true;
 const newSequence=contents(lang,values);
 for(const node of newTrack.querySelectorAll(".p10-marquee-sequence"))node.innerHTML=newSequence;
 return true;
}
window.GrimaldelliMarquee={mount,counts,markup,sectors,languages};
})();