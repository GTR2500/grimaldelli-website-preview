/* Localized Grimaldelli pages; no cookies or external translation API. */
window.GrimaldelliI18N={render:function renderLocalized(lang,path,C){
  const L=window.GRIMALDELLI_LOCALES[lang];
  if(!L)return false;
  const {app,photo,hero,eyebrow,top,action,sol,products,by,image,heroPhoto,otherPhoto,sedePhoto,solutionsCards,tile,socialLinks,coverage,wireGallery}=C;
  const e=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const header=(type,title,lead,img=heroPhoto,num="01")=>hero(type,title,lead,img,num);
  const head=(k,t,d="",dark=false)=>top(k,t,d,dark);
  const media=(slug,index,caption)=>photo(image(slug,index),caption);
  const card=(name,pic,href,idx)=>`<a class="feature-tile reveal" href="${href}"><div class="feature-image">${photo(pic,name)}</div><div class="feature-title"><h3>${e(name)}</h3><span>&#8599;</span></div></a>`;
  const mail="info@glcgrimaldelli.com";
  const socialBar=`<div class="social-links compact">${socialLinks()}</div>`;
  if(path==="/"){
    const featured=["stalle","strutture-industriali","autocatture","battifianco","abbeveratoi","raschiatori-asporta-letame"].map(by).filter(Boolean);
    app.innerHTML=`
    <section class="hero hero-salvirola">${photo(sedePhoto,"Grimaldelli headquarters in Salvirola","hero-image","eager")}<div class="hero-shade"></div><div class="hero-grid"></div>
      <div class="hero-content"><div class="hero-pre">${eyebrow(L.home.eyebrow,true)}</div><h1>${L.home.hero.map((x,i)=>`<span class="mask-text"><span class="${i===2?"serif":""}">${e(x)}</span></span>`).join("")}</h1>
      <div class="hero-bottom"><p>${e(L.home.lead)}</p>${action(L.common.explore,"#/soluzioni")}${action(L.common.projects,"#/realizzazioni","button-ghost")}</div></div>
      <div class="hero-counter">SALVIROLA / CREMONA <span>${e(L.common.more)}</span></div><div class="hero-side">GRIMALDELLI / SALVIROLA (CR) / ITALIA</div></section>
    <section class="section intro-section"><div class="section-container intro-layout"><div class="intro-copy reveal">${eyebrow(L.home.identity)}<h2>${e(L.home.introTitle)}</h2><p>${e(L.home.introText)}</p><a href="#/azienda" class="text-link">${e(L.common.history)} <span aria-hidden="true">&#8599;</span></a></div><div class="intro-image reveal delay-1">${photo(otherPhoto,"Grimaldelli steelwork")}<div class="intro-index"><b>1921</b><small>${e(L.since)}</small></div></div></div></section>
    <section class="section sede-section"><div class="section-container sede-layout"><div class="sede-copy reveal">${eyebrow("SALVIROLA / CREMONA")}<h2>${e(L.home.headquarters)}</h2><p>${e(L.home.headquartersText)}</p><div class="sede-meta"><div><small>${e(L.common.address)}</small><strong>Strada Provinciale 20<br>26010 Salvirola (CR)</strong></div><div><small>${e(L.common.contact)}</small><strong><a href="tel:+39037372435">+39 0373 72435</a><br><a href="mailto:${mail}">${mail}</a></strong></div></div>${action(L.nav[6],"#/contatti","button-outline")}</div><div class="sede-visual reveal delay-1"><div class="sede-photo-frame">${photo(sedePhoto,"Grimaldelli Salvirola")}<span>SALVIROLA / CREMONA</span></div></div></div></section>
    <section class="section solutions-section"><div class="section-container">${head(L.home.areasTitle,L.solutions.title,L.home.areasText,true)}${solutionsCards()}</div></section>
    <section class="section feature-section"><div class="section-container">${head(L.nav[3],L.products.title,L.products.lead)}<div class="feature-grid">${featured.map((p,i)=>card(p.title,p.images?.[0]?.src||heroPhoto,"#/prodotto/"+p.slug,i)).join("")}</div><div class="more-row reveal">${action(L.common.catalog,"#/prodotti","button-outline")}</div></div></section>
    <section class="section projects-section"><div class="section-container">${head(L.nav[4],L.projects.title,L.projects.galleryText)}<div class="projects-grid">${[["stalle",0,L.projects.items[0]],["strutture-industriali",0,L.projects.items[1]]].map((x,i)=>`<a class="project-item reveal" href="#/realizzazioni"><div class="photo">${media(x[0],x[1],x[2])}</div><div class="project-title"><div><small>0${i+1}</small><h3>${e(x[2])}</h3></div><span class="project-icon">&#8599;</span></div></a>`).join("")}</div><div class="more-row reveal">${action(L.common.projects,"#/realizzazioni","button-outline")}</div></div></section>
    <section class="career-teaser"><div class="section-container career-teaser-inner"><div class="reveal">${eyebrow(L.nav[7],true)}<h2>${e(L.careers.headline)}</h2></div><div class="reveal delay-1"><p>${e(L.careers.text)}</p>${action(L.nav[7],"#/lavora-con-noi","button-ghost")}</div></div></section>
    <section class="section social-teaser-section"><div class="section-container">${head(L.common.follow,L.home.socialTitle,L.home.socialText)}<div class="social-teaser-layout"><div class="social-teaser-image reveal">${media("stalle",2,L.projects.items[0])}</div><div class="social-teaser-copy reveal delay-1"><h3>${e(L.home.socialTitle)}</h3><p>${e(L.home.socialText)}</p>${socialBar}</div></div></div></section>`;
  } else if(path==="/azienda"){
    C.company();
    window.GrimaldelliCompany?.translate(lang,app);
  } else if(path==="/soluzioni"){
    app.innerHTML=`${header(L.solutions.eyebrow,L.solutions.title,L.solutions.lead,heroPhoto,"03")}
    <section class="section solutions-section"><div class="section-container">${head(L.solutions.heading,L.solutions.title,L.solutions.lead,true)}${solutionsCards()}<p class="footnote">${e(L.solutions.illustration)}</p></div></section>`;
  } else if(path.startsWith("/soluzione/")){
    const slug=path.slice("/soluzione/".length),s=sol.find(x=>x.slug===slug);
    if(!s)return false;
    const isEnergy=s.type==="concept";const group=slug==="strutture"?"strutture":"zootecnia";
    const list=products.filter(p=>p.group===group).slice(0,6);
    app.innerHTML=`${header(L.solutions.eyebrow,s.name,e(s.desc),s.img,s.idx)}
    <section class="section solution-detail"><div class="section-container detail-hero"><div class="reveal">${eyebrow(L.solutions.detailTitle)}<h2>${s.name}</h2><p>${e(s.desc)} ${e(L.solutions.detailText)}</p>${action(isEnergy?L.common.info:L.common.catalog,isEnergy?"#/contatti":`#/prodotti?gruppo=${group}`)}</div>${photo(s.img,s.label,"","eager")}</div>
    ${!isEnergy?`<div class="section-container detail-copy">${head(L.nav[3],L.products.title,L.products.lead)}<div class="feature-grid">${list.map(p=>card(p.title,p.images?.[0]?.src||heroPhoto,"#/prodotto/"+p.slug)).join("")}</div></div>`:""}</section>`;
  } else if(path==="/prodotti"){
    const groups=[["tutti",L.common.all],["strutture",L.common.metal],["zootecnia",L.common.livestock],["modelli",L.common.models]];
    app.innerHTML=`${header(L.products.eyebrow,L.products.title,L.products.lead,image("abbeveratoi",0),"04")}
    <section class="catalog-section"><div class="section-container"><div class="filterbar"><div class="filter-pills">${groups.map(([v,n],i)=>`<button class="filter-pill ${i===0?"active":""}" type="button" data-filter="${v}">${e(n)}</button>`).join("")}</div>
    <input id="catalog-search" class="search-field" type="search" aria-label="${e(L.common.search)}" placeholder="${e(L.common.search)}"></div><p id="catalog-count" style="font-size:11px;color:#77817a;margin:10px 0 36px"></p><div id="catalog-grid" class="catalog-grid"></div></div></section>`;
    const requestedGroup=new URLSearchParams((location.hash.split("?")[1]||"")).get("gruppo");
    let selected=groups.some(([v])=>v===requestedGroup)?requestedGroup:"tutti",query="";
    const out=()=>{
      let list=products.filter(p=>selected==="tutti"?p.group!=="archivio"&&p.group!=="modelli":p.group===selected);
      if(query)list=list.filter(p=>(p.title+" "+p.summary).toLowerCase().includes(query));
      app.querySelector("#catalog-grid").innerHTML=list.map(p=>`<a href="#/prodotto/${encodeURIComponent(p.slug)}" class="catalog-card reveal"><div class="crop">${photo(p.images?.[0]?.src||heroPhoto,p.title)}</div><div class="name">${e(p.title)}</div><div class="meta">${e(p.group==="strutture"?L.common.metal:p.group==="modelli"?L.common.models:L.common.livestock)}</div></a>`).join("")||`<p>${e(L.common.search)}: 0</p>`;
      app.querySelector("#catalog-count").textContent=`${list.length} ${L.products.count}`;
    };
    app.querySelectorAll("[data-filter]").forEach(button=>button.addEventListener("click",()=>{selected=button.dataset.filter;app.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("active",b===button));out();}));
    app.querySelector("#catalog-search").addEventListener("input",evt=>{query=evt.target.value.toLowerCase().trim();out();});
    app.querySelectorAll('[data-filter]').forEach(button=>button.classList.toggle('active',button.dataset.filter===selected));
    out();
  } else if(path.startsWith("/prodotto/")){
    const slug=decodeURIComponent(path.slice("/prodotto/".length)),p=by(slug);
    if(!p)return false;
    const images=(p.images||[]).map((im,i)=>({src:im.src,caption:p.title+" "+(i+1)}));
    app.innerHTML=`${header(L.products.eyebrow,p.title,p.summary,p.images?.[0]?.src||heroPhoto,"04")}
      <section class="section product-detail"><div class="section-container"><div class="detail-hero"><div class="reveal"><div class="detail-meta">${e(L.nav[3])}</div><h2>${e(p.title)}</h2><p>${e(p.summary)} ${e(L.products.detailIntro)}</p>${action(L.common.info,"#/contatti")}</div>${photo(p.images?.[0]?.src||heroPhoto,p.title,"","eager")}</div>
      <div class="detail-copy">${head(L.common.gallery,L.common.photos)}<div class="product-gallery">${images.map((im,i)=>`<figure><button type="button" class="gallery-photo" data-gallery="${i}" aria-label="${e(L.common.photos)} ${i+1}">${photo(im.src,im.caption)}</button><figcaption>${e(im.caption)}</figcaption></figure>`).join("")}</div></div><a class="text-link" href="#/prodotti">&#8592; ${e(L.common.back)}</a></div></section>`;
    wireGallery(images);
  } else if(path==="/realizzazioni"){
    const ids=[["stalle",0],["strutture-industriali",0],["pensiline",0],["autocatture",0],["raschiatori-asporta-letame",0],["battifianco",0]];
    const images=ids.map(([s,i],j)=>({src:image(s,i),caption:L.projects.items[j]}));
    app.innerHTML=`${header(L.projects.eyebrow,L.projects.title,L.projects.lead,image("stalle",11),"05")}
    <section class="section"><div class="section-container">${head(L.common.gallery,L.projects.gallery,L.projects.galleryText)}
    <div class="feature-grid">${images.map((im,i)=>`<div class="feature-tile reveal"><button type="button" data-gallery="${i}" class="gallery-photo feature-image" style="display:block;width:100%">${photo(im.src,im.caption)}</button><div class="feature-title"><h3>${e(im.caption)}</h3><span>&#8599;</span></div></div>`).join("")}</div></div></section>`;
    wireGallery(images);
  } else if(path==="/dicono-di-noi"){
    const N=window.GRIMALDELLI_NEWS_LOCALES?.[lang]||{};
    const story=(it,i)=>{const t=N[it.id]||{};return `<article class="news-story"><div class="news-story-body"><div class="news-meta"><span>${e(t.type||it.type)}</span><time>${e((it.date.match(/\d{4}/)||[])[0]||it.date)}</time></div><div class="news-publisher">${e(it.publication)}</div><h3>${e(t.title||it.title)}</h3><p>${e(t.summary||it.summary)}</p><a class="news-read" href="${e(it.href)}" target="_blank" rel="noopener noreferrer">${e(L.press.read)} <span aria-hidden="true">&#8599;</span></a></div></article>`;};
    app.innerHTML=`${header(L.press.eyebrow,L.press.title,L.press.lead,image("strutture-industriali",2),"08")}
    <section class="news-editorial-section"><div class="section-container"><div class="news-editorial-heading"><div><span class="news-edition">GRIMALDELLI / ${e(L.press.news)}</span><h2>${e(L.press.title)}</h2></div><div class="news-editorial-intro"><p>${e(L.press.lead)}</p><span>11 ${e(L.common.archive)}</span></div></div>
    <div class="news-story-grid">${coverage.filter(x=>x.tier!=="archive").map(story).join("")}</div><div class="news-section-heading"><div><h2>${e(L.press.archive)}</h2></div></div><div class="news-story-grid">${coverage.filter(x=>x.tier==="archive").map(story).join("")}</div></div></section>
    <section class="section social-gallery-section"><div class="section-container">${head(L.common.photos,L.press.social,L.press.socialText)}${socialBar}</div></section>`;
  } else if(path==="/contatti"){
    app.innerHTML=`${header(L.contact.eyebrow,L.contact.title,L.contact.lead,"","06")}
    <section class="section"><div class="section-container contact-grid"><div class="contact-copy reveal">${eyebrow(L.contact.visit)}<h2>${e(L.contact.visit)}</h2>
    <div class="contact-record"><small>${e(L.common.address)}</small><p>Strada Provinciale 20<br>26010 Salvirola (CR), Italia</p></div>
    <div class="contact-record"><small>${e(L.common.phone)}</small><a href="tel:+39037372435">+39 0373 72435</a></div>
    <div class="contact-record"><small>E-mail</small><a href="mailto:${mail}">${mail}</a></div>
    <div class="contact-record"><small>PEC</small><a href="mailto:grimaldelli@posta.insiemebusiness.it">grimaldelli@posta.insiemebusiness.it</a></div>
    <div class="contact-record"><small>${e(L.nav[7])}</small><a href="#/lavora-con-noi">${e(L.nav[7])} &#8599;</a></div></div>
    <div class="contact-form reveal delay-1"><h3>${e(L.contact.write)}</h3><p>${e(L.contact.writeText)}</p><p style="font-size:19px;margin:28px 0"><a href="mailto:${mail}">${mail}</a></p>
    ${action(L.common.email,"mailto:"+mail)}<p class="form-note" style="margin-top:22px"><a href="privacy-sito-${lang}.html">${e(L.common.privacy)}</a></p></div></div></section>`;
  } else if(path==="/lavora-con-noi"){
    app.innerHTML=`${header(L.careers.eyebrow,L.careers.title,L.careers.lead,"","07")}
    <section class="section"><div class="section-container career-about"><div class="reveal">${eyebrow(L.nav[7])}<h2>${e(L.careers.headline)}</h2><p>${e(L.careers.text)}</p>
    ${L.careers.steps.map((x,i)=>`<div class="career-card"><b>0${i+1}</b><span>${e(x)}</span></div>`).join("")}</div><div class="photo reveal delay-1">${media("strutture-industriali",0,L.projects.items[1])}</div></div></section>
    <section class="career-form-section" id="candidatura"><div class="section-container career-form-grid"><div class="career-form-intro reveal">${eyebrow(L.nav[7])}<h2>${e(L.careers.call)}</h2><p>${e(L.careers.callText)}</p></div>
    <div class="contact-form reveal delay-1"><h3>${e(L.careers.box)}</h3><p>${e(L.careers.boxText)}</p>${action(L.common.emailcareer,"mailto:"+mail+"?subject="+encodeURIComponent(L.nav[7]))}
    <p class="form-note" style="margin-top:22px"><a href="privacy-sito-${lang}.html">${e(L.common.privacy)}</a></p></div></div></section>`;
  } else {
    app.innerHTML=`${header(L.common.notfound,L.common.notfound,L.common.unavailable,"","00")}<section class="section"><div class="section-container">${action(L.nav[0],"#/")}</div></section>`;
  }
  return true;
},footer:function footerLocalized(lang,C){
  const L=window.GRIMALDELLI_LOCALES?.[lang];
  if(lang!=="it"&&!L)return;
  const {siteFooter,eyebrow,action,photo,socialLinks}=C;
  const e=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const prefix=lang==="it"?"":"-"+lang;
  const locales={
    it:{cta:"REALIZZIAMO INSIEME",headline:'Un progetto<br><span class="serif accent">da immaginare?</span>',contact:"Contattaci",brand:"Carpenteria metallica, attrezzature zootecniche e lavorazioni per il settore energetico.",explore:"Esplora",nav:["Azienda","Soluzioni","Prodotti","Realizzazioni","Dicono di noi","Lavora con noi"],documents:"Documenti e trasparenza",legal:"Area legale e certificazioni",privacy:"Privacy Policy",cookies:"Cookie Policy",rea:"Numero REA",sdi:"Codice SDI",register:"Registro Imprese di Cremona n.",follow:"SEGUICI",rights:"Tutti i diritti riservati"},
    en:{cta:L?.common.footerTop,headline:L?.common.footerTitle,contact:L?.nav[6],brand:L?.home.lead,explore:L?.common.more,nav:[L?.nav[1],L?.nav[2],L?.nav[3],L?.nav[4],L?.nav[5],L?.nav[7]],documents:"Legal documents",legal:L?.common.cert,privacy:L?.common.privacy,cookies:L?.common.cookies,rea:L?.common.rea,sdi:L?.common.sdi,register:L?.common.register,follow:L?.common.follow,rights:L?.common.rights},
    fr:{cta:L?.common.footerTop,headline:L?.common.footerTitle,contact:L?.nav[6],brand:L?.home.lead,explore:L?.common.more,nav:[L?.nav[1],L?.nav[2],L?.nav[3],L?.nav[4],L?.nav[5],L?.nav[7]],documents:"Documents et transparence",legal:L?.common.cert,privacy:L?.common.privacy,cookies:L?.common.cookies,rea:L?.common.rea,sdi:L?.common.sdi,register:L?.common.register,follow:L?.common.follow,rights:L?.common.rights},
    de:{cta:L?.common.footerTop,headline:L?.common.footerTitle,contact:L?.nav[6],brand:L?.home.lead,explore:L?.common.more,nav:[L?.nav[1],L?.nav[2],L?.nav[3],L?.nav[4],L?.nav[5],L?.nav[7]],documents:"Dokumente und Transparenz",legal:L?.common.cert,privacy:L?.common.privacy,cookies:L?.common.cookies,rea:L?.common.rea,sdi:L?.common.sdi,register:L?.common.register,follow:L?.common.follow,rights:L?.common.rights}
  };
  const t=locales[lang]||locales.it;
  const navPaths=["azienda","soluzioni","prodotti","realizzazioni","dicono-di-noi","lavora-con-noi"];
  siteFooter.className="footer";
  siteFooter.innerHTML=`<div class="section-container">
    <div class="footer-top"><div>${eyebrow(t.cta,true)}<h2>${t.headline}</h2></div>${action(t.contact,"#/contatti","button-ghost")}</div>
    <div class="footer-main-grid">
      <div class="footer-brand">
        <a href="#/" class="footer-logo-panel">${photo("assets/grimaldelli-logo-originale.png","Grimaldelli")}</a>
        <p>${e(t.brand)}</p>
      </div>
      <nav class="footer-navigation" aria-label="${e(t.explore)}">
        <h3>${e(t.explore)}</h3>
        ${t.nav.map((label,n)=>`<a href="#/${navPaths[n]}">${e(label)}</a>`).join("")}
      </nav>
      <div class="footer-contact">
        <h3>${e(t.contact)}</h3>
        <a href="tel:+39037372435">+39 0373 72435</a>
        <a href="mailto:info@glcgrimaldelli.com">info@glcgrimaldelli.com</a>
        <a href="mailto:grimaldelli@posta.insiemebusiness.it">grimaldelli@posta.insiemebusiness.it (PEC)</a>
        <address>Strada Provinciale 20<br>26010 Salvirola (CR), Italia</address>
      </div>
    </div>
    <nav class="footer-documents" aria-label="${e(t.documents)}">
      <h3>${e(t.documents)}</h3>
      <div class="footer-document-links">
        <a href="area-legale${prefix}.html"><span>${e(t.legal)}</span><span class="footer-doc-arrow" aria-hidden="true">&#8599;</span></a>
        <a href="privacy-sito${prefix}.html"><span>${e(t.privacy)}</span><span class="footer-doc-arrow" aria-hidden="true">&#8599;</span></a>
        <a href="privacy-cookie${prefix}.html"><span>${e(t.cookies)}</span><span class="footer-doc-arrow" aria-hidden="true">&#8599;</span></a>
      </div>
    </nav>
    <div class="footer-corporate">
      <strong>Grimaldelli S.r.l.</strong>
      <span><b>P. IVA</b> 01190000198</span>
      <span><b>${e(t.rea)}</b> 0149980</span>
      <span><b>${e(t.sdi)}</b> W7YVJK9</span>
      <span><b>${e(t.register)}</b> 01190000198</span>
    </div>
    <div class="footer-social-row"><span class="social-caption">${e(t.follow)}</span><div class="social-links">${socialLinks()}</div></div>
    <div class="footer-line"><span>&copy; 2026 Grimaldelli S.r.l. · ${e(t.rights)}</span></div>
  </div>`;
},shell:function shellLocalized(lang,path){
  const langs=["it","en","fr","de"],nav=document.querySelector(".nav-desktop"),mobile=document.querySelector(".mobile-menu-inner"),selector=document.querySelector(".language-switcher");
  if(selector){selector.querySelectorAll("a[data-lang]").forEach(a=>{const code=a.getAttribute("data-lang");a.setAttribute("href",location.pathname+"?lang="+code+"#"+(path||"/"));if(code===lang){a.setAttribute("aria-current","true");a.setAttribute("title",code.toUpperCase());}else a.removeAttribute("aria-current");});}
  document.documentElement.lang=lang;
  if(lang==="it"){
    const titles={"/":"Soluzioni che prendono forma","/azienda":"Azienda","/soluzioni":"Soluzioni","/prodotti":"Prodotti","/realizzazioni":"Realizzazioni","/dicono-di-noi":"Dicono di noi","/contatti":"Contatti","/lavora-con-noi":"Lavora con noi"};
    const heading=document.querySelector('#app h1')?.textContent.replace(/\s+/g,' ').trim()||"Grimaldelli";
    document.title="Grimaldelli | "+(titles[path]||heading);
    return;
  }
  const L=window.GRIMALDELLI_LOCALES?.[lang];if(!L)return;
  const paths=["/","/azienda","/soluzioni","/prodotti","/realizzazioni","/dicono-di-noi","/contatti"];
  paths.forEach((p,i)=>{const a=nav?.querySelector(`a[data-nav="${p}"]`);if(a){if(p==="/contatti"){const chevron=a.querySelector(".chevron");a.textContent=L.nav[i]+" ";if(chevron)a.appendChild(chevron);}else a.textContent=L.nav[i];}});
  nav?.querySelectorAll(".drop-menu a").forEach((a,i)=>a.textContent=L.links[i]||a.textContent);
  mobile?.querySelectorAll('a[href^="#/"]').forEach((a,i)=>{if(i<L.nav.length)a.innerHTML=L.nav[i];});
  const band=document.querySelector(".preview-label");if(band){const s=band.querySelectorAll("span");if(s.length>=3){s[1].textContent="GRIMALDELLI / "+L.lang.toUpperCase();s[2].textContent="SALVIROLA / ITALIA";}}
  const routeIndex=paths.indexOf(path);
  const routeName=routeIndex>=0?L.nav[routeIndex]:path==="/lavora-con-noi"?L.nav[7]:path.startsWith("/prodotto/")?L.nav[3]:path.startsWith("/soluzione/")?L.nav[2]:L.nav[0];
  document.title="Grimaldelli | "+routeName;
}};
