/* P10: media originali Grimaldelli ospitati sul sito. Nessun embed, cookie o link social. */
(function(){
  "use strict";
  const posts=[
    {
      id:"biloni",
      type:"photos",
      date:"2026-11-11",
      where:"Trigolo (CR)",
      it:{label:"Carosello fotografico",title:"Azienda Agricola Biloni",desc:"Ristrutturazione della prima stalla completata. Una realizzazione raccontata con le fotografie pubblicate dal profilo aziendale."},
      en:{label:"Photo carousel",title:"Biloni Farm",desc:"The first barn renovation is complete. View the photographs shared by the company on Instagram."},
      fr:{label:"Carrousel photo",title:"Exploitation agricole Biloni",desc:"La rénovation de la première étable est terminée. Découvrez les photos publiées par l'entreprise sur Instagram."},
      de:{label:"Fotokarussell",title:"Landwirtschaftsbetrieb Biloni",desc:"Die Renovierung des ersten Stalls ist abgeschlossen. Sehen Sie die vom Unternehmen auf Instagram veröffentlichten Fotos."}
    },
    {
      id:"cadilana",
      type:"video",
      date:"2026-11-09",
      where:"Cadilana",
      it:{label:"Video / Reel",title:"Dal campo: stalla e benessere animale",desc:"Un video pubblicato dal profilo Grimaldelli su stalle, benessere animale e mungitura robotizzata."},
      en:{label:"Video / Reel",title:"On site: livestock housing and welfare",desc:"Video from Grimaldelli's official profile about barns, animal welfare and robotic milking."},
      fr:{label:"Vidéo / Reel",title:"Sur le terrain : étable et bien-être animal",desc:"Une vidéo du profil Grimaldelli consacrée aux étables, au bien-être animal et à la traite robotisée."},
      de:{label:"Video / Reel",title:"Vor Ort: Stall und Tierwohl",desc:"Ein Video vom Grimaldelli-Profil über Ställe, Tierwohl und Melkroboter."}
    }
  ];
  posts[0].category="livestock";
  posts[1].category="livestock";
  posts.push(...[
  {
    "id": "bosetti",
    "type": "video",
    "category": "livestock",
    "date": "",
    "where": "Bosetti Farm",
    "it": {
      "label": "Video / Reel",
      "title": "Bosetti Farm: una storia dal campo",
      "desc": "Un reel dall'archivio del profilo ufficiale Grimaldelli dedicato alla realtà agricola Bosetti Farm."
    },
    "en": {
      "label": "Video / Reel",
      "title": "Bosetti Farm: a story from the field",
      "desc": "An archive reel on the official Grimaldelli Instagram profile featuring Bosetti Farm."
    },
    "fr": {
      "label": "Vidéo / Reel",
      "title": "Bosetti Farm : un récit du terrain",
      "desc": "Une vidéo des archives du profil Instagram officiel de Grimaldelli consacrée à Bosetti Farm."
    },
    "de": {
      "label": "Video / Reel",
      "title": "Bosetti Farm: Einblicke vom Hof",
      "desc": "Ein Archivvideo vom offiziellen Grimaldelli-Instagram-Profil über die Bosetti Farm."
    }
  },
  {
    "id": "franciosi",
    "type": "photos",
    "category": "livestock",
    "date": "",
    "where": "Azienda Agricola Franciosi",
    "it": {
      "label": "Carosello fotografico",
      "title": "Franciosi: stalla da 8.000 m²",
      "desc": "Immagini della nuova stalla in costruzione, presentata nel post aziendale come intervento da 8.000 metri quadrati."
    },
    "en": {
      "label": "Photo carousel",
      "title": "Franciosi: an 8,000 m² livestock barn",
      "desc": "Photographs of a new livestock barn under construction, presented in the company post as an 8,000-square-metre project."
    },
    "fr": {
      "label": "Carrousel photo",
      "title": "Franciosi : une étable de 8 000 m²",
      "desc": "Images d'une nouvelle étable en construction, présentée dans la publication de l'entreprise comme un projet de 8 000 m²."
    },
    "de": {
      "label": "Fotokarussell",
      "title": "Franciosi: 8.000 m² Stallbau",
      "desc": "Bilder eines neuen Stalls im Bau, im Unternehmensbeitrag als Projekt mit 8.000 Quadratmetern vorgestellt."
    }
  },
  {
    "id": "risaia",
    "type": "photos",
    "category": "livestock",
    "date": "",
    "where": "Risaia del Duca",
    "it": {
      "label": "Carosello fotografico",
      "title": "Risaia del Duca: ambienti zootecnici",
      "desc": "Fotografie condivise dal profilo Grimaldelli dedicate all'azienda Risaia del Duca e al comfort degli animali."
    },
    "en": {
      "label": "Photo carousel",
      "title": "Risaia del Duca: livestock facilities",
      "desc": "Photographs shared by Grimaldelli featuring Risaia del Duca and the subject of animal comfort."
    },
    "fr": {
      "label": "Carrousel photo",
      "title": "Risaia del Duca : bâtiments d'élevage",
      "desc": "Photos publiées par Grimaldelli sur Risaia del Duca et le confort des animaux."
    },
    "de": {
      "label": "Fotokarussell",
      "title": "Risaia del Duca: Stallanlagen",
      "desc": "Fotos vom offiziellen Grimaldelli-Profil zu Risaia del Duca und Tierkomfort."
    }
  },
  {
    "id": "nisoli",
    "type": "photos",
    "category": "energy",
    "date": "",
    "where": "Brignano Gera d'Adda (BG)",
    "it": {
      "label": "Carosello fotografico",
      "title": "Nisoli: fotovoltaico da 122 kW",
      "desc": "Il post aziendale documenta l'intervento presso l'azienda Nisoli: rimozione eternit, impianto fotovoltaico da 122 kW e riferimento al bando Agrisolare."
    },
    "en": {
      "label": "Photo carousel",
      "title": "Nisoli: 122 kW solar project",
      "desc": "Company post documenting the work at Nisoli: asbestos roofing removal, a 122 kW photovoltaic system and the Agrisolare scheme."
    },
    "fr": {
      "label": "Carrousel photo",
      "title": "Nisoli : photovoltaïque 122 kW",
      "desc": "Publication sur les travaux chez Nisoli : désamiantage de toiture, installation photovoltaïque de 122 kW et dispositif Agrisolare."
    },
    "de": {
      "label": "Fotokarussell",
      "title": "Nisoli: Photovoltaik mit 122 kW",
      "desc": "Unternehmensbeitrag über die Arbeiten bei Nisoli: Asbestdachsanierung, eine Photovoltaikanlage mit 122 kW und Agrisolare."
    }
  },
  {
    "id": "ginelli",
    "type": "photos",
    "category": "energy",
    "date": "",
    "where": "Bagnolo Cremasco (CR)",
    "it": {
      "label": "Carosello fotografico",
      "title": "Ginelli: fotovoltaico da 75 kW",
      "desc": "L'impianto fotovoltaico da 75 kW dell'azienda Ginelli, presentato nel post Grimaldelli con riferimento al bando Agrisolare."
    },
    "en": {
      "label": "Photo carousel",
      "title": "Ginelli: 75 kW photovoltaic project",
      "desc": "Ginelli's 75 kW photovoltaic installation, presented in a Grimaldelli post referring to the Agrisolare scheme."
    },
    "fr": {
      "label": "Carrousel photo",
      "title": "Ginelli : photovoltaïque 75 kW",
      "desc": "Installation photovoltaïque de 75 kW chez Ginelli, présentée dans une publication Grimaldelli relative au dispositif Agrisolare."
    },
    "de": {
      "label": "Fotokarussell",
      "title": "Ginelli: Photovoltaik mit 75 kW",
      "desc": "Die 75-kW-Photovoltaikanlage bei Ginelli, im Grimaldelli-Beitrag mit Bezug auf Agrisolare vorgestellt."
    }
  }
]);
  const ui={
  "it": {
    "archive": "Archivio",
    "energyTitle": "Dai tetti.<br><em>All’energia.</em>",
    "kicker": "REALIZZAZIONI / DAL CANTIERE",
    "homeTitle": "Il lavoro sul campo.<br><em>Raccontato per immagini.</em>",
    "projectsTitle": "Interventi reali.<br><em>Foto e video dal campo.</em>",
    "sectorTitle": "Dalle stalle.<br><em>Ai progetti reali.</em>",
    "intro": "Strutture, lavorazioni e impianti nelle immagini dei nostri cantieri. Esplora le fotografie e guarda i video direttamente qui.",
    "photos": "Galleria fotografica",
    "video": "Video del cantiere",
    "source": "Immagini e riprese delle realizzazioni Grimaldelli.",
    "cta": "Vedi tutte le realizzazioni",
    "previous": "Fotografia precedente",
    "next": "Fotografia successiva",
    "expand": "Ingrandisci la fotografia",
    "close": "Chiudi la fotografia",
    "photo": "Fotografia",
    "of": "di",
    "watch": "Guarda il video"
  },
  "en": {
    "archive": "Archive",
    "energyTitle": "From rooftops.<br><em>To energy.</em>",
    "kicker": "PROJECTS / ON SITE",
    "homeTitle": "Work on site.<br><em>Captured in images.</em>",
    "projectsTitle": "Real projects.<br><em>Photos and videos on site.</em>",
    "sectorTitle": "From barns.<br><em>To real projects.</em>",
    "intro": "Structures, fabrication and installations shown in photographs from our projects. Browse the galleries and watch videos directly here.",
    "photos": "Photo gallery",
    "video": "Project video",
    "source": "Images and footage of Grimaldelli projects.",
    "cta": "View all projects",
    "previous": "Previous photo",
    "next": "Next photo",
    "expand": "Enlarge photo",
    "close": "Close photo",
    "photo": "Photo",
    "of": "of",
    "watch": "Watch the video"
  },
  "fr": {
    "archive": "Archives",
    "energyTitle": "Des toitures.<br><em>À l’énergie.</em>",
    "kicker": "RÉALISATIONS / SUR LE TERRAIN",
    "homeTitle": "Le travail sur site.<br><em>Raconté en images.</em>",
    "projectsTitle": "Des projets concrets.<br><em>Photos et vidéos.</em>",
    "sectorTitle": "Des étables.<br><em>Aux réalisations.</em>",
    "intro": "Structures, fabrication et installations illustrées par les images de nos chantiers. Explorez les galeries et regardez les vidéos directement ici.",
    "photos": "Galerie photos",
    "video": "Vidéo du chantier",
    "source": "Photos et vidéos des réalisations Grimaldelli.",
    "cta": "Voir les réalisations",
    "previous": "Photo précédente",
    "next": "Photo suivante",
    "expand": "Agrandir la photo",
    "close": "Fermer la photo",
    "photo": "Photo",
    "of": "sur",
    "watch": "Regarder la vidéo"
  },
  "de": {
    "archive": "Archiv",
    "energyTitle": "Vom Dach.<br><em>Zur Energie.</em>",
    "kicker": "REFERENZEN / VOR ORT",
    "homeTitle": "Arbeit vor Ort.<br><em>In Bildern erzählt.</em>",
    "projectsTitle": "Reale Projekte.<br><em>Fotos und Videos vor Ort.</em>",
    "sectorTitle": "Vom Stall.<br><em>Zum realen Projekt.</em>",
    "intro": "Konstruktionen, Fertigung und Anlagen in Bildern unserer Projekte. Sehen Sie sich die Galerien und Videos direkt hier an.",
    "photos": "Fotogalerie",
    "video": "Projektvideo",
    "source": "Bilder und Videos von Grimaldelli-Projekten.",
    "cta": "Alle Referenzen ansehen",
    "previous": "Vorheriges Foto",
    "next": "Nächstes Foto",
    "expand": "Foto vergrößern",
    "close": "Foto schließen",
    "photo": "Foto",
    "of": "von",
    "watch": "Video ansehen"
  }
};

  const descriptions={
    biloni:{
      it:"Ristrutturazione della prima stalla completata presso l'Azienda Agricola Biloni a Trigolo (CR).",
      en:"The first barn refurbishment completed at Biloni Farm in Trigolo, Cremona.",
      fr:"Rénovation de la première étable achevée à l'exploitation agricole Biloni, à Trigolo.",
      de:"Die Renovierung des ersten Stalls auf dem Landwirtschaftsbetrieb Biloni in Trigolo ist abgeschlossen."
    },
    cadilana:{
      it:"Un esempio di struttura zootecnica dedicata al benessere animale e alla gestione della mungitura.",
      en:"Livestock facilities focused on animal welfare and milking operations.",
      fr:"Un exemple d'installations d'élevage consacrées au bien-être animal et à la traite.",
      de:"Ein Beispiel für Tierhaltungsanlagen mit Schwerpunkt Tierwohl und Melkbetrieb."
    },
    bosetti:{
      it:"Immagini e riprese da Bosetti Farm, tra stalle e vita dell'allevamento.",
      en:"Images and footage from Bosetti Farm, featuring livestock facilities and farm life.",
      fr:"Images et vidéos de Bosetti Farm : installations et vie de l'élevage.",
      de:"Bilder und Aufnahmen von Bosetti Farm mit Stalleinrichtungen und Einblicken in den Betrieb."
    },
    franciosi:{
      it:"Nuova struttura zootecnica da 8.000 m² in costruzione presso l'Azienda Agricola Franciosi.",
      en:"An 8,000 m² new livestock building under construction at Franciosi Farm.",
      fr:"Nouvelle structure d'élevage de 8 000 m² en cours de construction chez Franciosi.",
      de:"Neues Stallgebäude mit 8.000 m² Fläche im Bau beim Landwirtschaftsbetrieb Franciosi."
    },
    risaia:{
      it:"Soluzioni e ambienti zootecnici presso Risaia del Duca, con attenzione al comfort degli animali.",
      en:"Livestock facilities at Risaia del Duca, with a focus on animal comfort.",
      fr:"Installations d'élevage à Risaia del Duca, avec une attention particulière au confort animal.",
      de:"Stalleinrichtungen bei Risaia del Duca, mit besonderem Augenmerk auf den Tierkomfort."
    },
    nisoli:{
      it:"Immagini dell'intervento a Brignano Gera d'Adda: copertura e progetto fotovoltaico da 122 kW.",
      en:"Images from the work in Brignano Gera d'Adda: roofing and a 122 kW solar project.",
      fr:"Images des travaux à Brignano Gera d'Adda : toiture et projet photovoltaïque de 122 kW.",
      de:"Bilder der Arbeiten in Brignano Gera d'Adda: Dach und Photovoltaikprojekt mit 122 kW."
    },
    ginelli:{
      it:"Intervento presso l'Azienda Agricola Ginelli a Bagnolo Cremasco, con fotovoltaico da 75 kW.",
      en:"Work at Ginelli Farm in Bagnolo Cremasco, with a 75 kW photovoltaic project.",
      fr:"Travaux à l'exploitation agricole Ginelli à Bagnolo Cremasco, avec un projet photovoltaïque de 75 kW.",
      de:"Arbeiten auf dem Landwirtschaftsbetrieb Ginelli in Bagnolo Cremasco mit einem 75-kW-Photovoltaikprojekt."
    }
  };
  const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const local=(value)=> {
    const p=String(value||"").replace(/^\/+/,"");
    if(!/^assets\/instagram\/[a-z0-9-]+\/(?:image|poster|clip)-\d+\.(?:webp|mp4)$/.test(p))return "";
    return p;
  };
  let manifestPromise=null;
  const getManifest=()=>{
    if(!manifestPromise){
      manifestPromise=fetch("assets/instagram/manifest.json",{credentials:"same-origin"})
        .then(r=>{if(!r.ok)throw Error("Local media unavailable");return r.json()})
        .then(j=>j&&Array.isArray(j.media)?j.media:[])
        .catch(e=>{console.warn("Grimaldelli local media:",e.message);return []});
    }
    return manifestPromise;
  };
  const card=(post,media,lang,t)=>{
    const copy=post[lang],images=(media.images||[]).map(local).filter(Boolean);
    const videos=(media.videos||[]).map(local).filter(Boolean);
    if(!images.length&&!videos.length)return "";
    const title=copy.title,desc=descriptions[post.id]?.[lang]||copy.desc;
    const date=post.date?'<time datetime="'+esc(post.date)+'">'+esc(post.date.split("-").reverse().join("."))+'</time>':'<span>'+esc(t.archive)+'</span>';
    let visual="";
    if(videos.length){
      visual='<video class="p10-work-video" controls playsinline preload="none" aria-label="'+esc(title)+'"'+(images[0]?' poster="'+esc(images[0])+'"':'')+'>'+
        '<source src="'+esc(videos[0])+'" type="video/mp4">'+esc(t.watch)+'</video>';
    }else{
      visual='<button class="p10-work-expand" type="button" data-work-expand="'+esc(post.id)+'" aria-label="'+esc(t.expand)+': '+esc(title)+'">'+
        '<img class="p10-work-image" loading="lazy" decoding="async" src="'+esc(images[0])+'" alt="'+esc(title)+'">'+
        '<span class="p10-work-image-corner" aria-hidden="true">&#8599;</span></button>';
    }
    const gallery=images.length>1&&!videos.length?
      '<div class="p10-work-carousel-nav" data-work-gallery="'+esc(post.id)+'">'+
       '<button type="button" data-work-prev="'+esc(post.id)+'" aria-label="'+esc(t.previous)+'">&#8592;</button>'+
       '<span class="p10-work-count" aria-live="polite">1 '+esc(t.of)+' '+images.length+'</span>'+
       '<button type="button" data-work-next="'+esc(post.id)+'" aria-label="'+esc(t.next)+'">&#8594;</button></div>':'';
    const type=videos.length?t.video:t.photos;
    return '<article class="p10-social-work p10-work-card" data-work-id="'+esc(post.id)+'" data-work-current="0">'+
      '<div class="p10-work-visual">'+visual+'<span class="p10-work-media-type">'+esc(type)+'</span></div>'+
      gallery+
      '<div class="p10-social-work-content"><div class="p10-social-work-meta">'+date+'<span>'+esc(post.where)+'</span></div>'+
      '<h3>'+esc(title)+'</h3><p>'+esc(desc)+'</p></div></article>';
  };
  async function mount(route,lang,app){
    const isHome=route==="/",isPortfolio=route==="/realizzazioni";
    const isBarn=route==="/soluzione/zootecnia"||route==="/prodotto/stalle";
    const isEnergy=route==="/soluzione/fotovoltaico";
    if(!isHome&&!isPortfolio&&!isBarn&&!isEnergy)return false;
    const language=ui[lang]?lang:"it",t=ui[language];
    const firstLocation=window.location.href;
    const media=await getManifest();
    if(app.isConnected===false||window.location.href!==firstLocation)return false;
    const lookup=new Map(media.map(x=>[x.id,x]));
    const chosen=isHome?posts.slice(0,2):isBarn?posts.filter(p=>p.category==="livestock").slice(0,3):isEnergy?posts.filter(p=>p.category==="energy"):posts;
    const selection=chosen.filter(x=>{
       const m=lookup.get(x.id);
       return m&&((m.images||[]).length||(m.videos||[]).length);
    });
    if(!selection.length)return false;
    const title=isPortfolio?t.projectsTitle:isBarn?t.sectorTitle:isEnergy?t.energyTitle:t.homeTitle;
    const extra=isHome?'<a href="#/realizzazioni" class="p10-social-portfolio-link">'+esc(t.cta)+' <span aria-hidden="true">&#8599;</span></a>':'';
    const html='<section class="p10-social-showcase" id="p10-social-showcase" aria-labelledby="p10-social-showcase-title">'+
     '<div class="section-container"><div class="p10-social-heading"><div><span class="p10-social-eyebrow">'+esc(t.kicker)+'</span>'+
     '<h2 id="p10-social-showcase-title">'+title+'</h2></div><div class="p10-social-summary"><p>'+esc(t.intro)+'</p>'+extra+'</div></div>'+
     '<div class="p10-social-grid">'+selection.map(x=>card(x,lookup.get(x.id),language,t)).join("")+'</div>'+
     '<p class="p10-social-source">'+esc(t.source)+'</p></div></section>';
    const anchor=isHome?app.querySelector(".social-teaser-section"):null;
    if(anchor)anchor.insertAdjacentHTML("beforebegin",html);
    else app.insertAdjacentHTML("beforeend",html);
    const section=app.querySelector("#p10-social-showcase");
    if(!section)return false;
    const galleryDialog=document.createElement("dialog");
    galleryDialog.className="p10-work-dialog";
    galleryDialog.innerHTML='<button type="button" class="p10-work-dialog-close" aria-label="'+esc(t.close)+'">&#10005;</button><img alt="">';
    section.appendChild(galleryDialog);
    galleryDialog.addEventListener("click",e=>{if(e.target===galleryDialog||e.target.closest(".p10-work-dialog-close"))galleryDialog.close()});
    section.addEventListener("click",e=>{
      const prev=e.target.closest("[data-work-prev]"),next=e.target.closest("[data-work-next]"),expand=e.target.closest("[data-work-expand]");
      const button=prev||next||expand;
      if(!button)return;
      const id=button.getAttribute("data-work-prev")||button.getAttribute("data-work-next")||button.getAttribute("data-work-expand");
      const item=selection.find(x=>x.id===id),m=lookup.get(id);
      if(!item||!m)return;
      const images=(m.images||[]).map(local).filter(Boolean);
      if(!images.length)return;
      const article=button.closest(".p10-work-card");
      if(!article)return;
      const current=Number(article.dataset.workCurrent)||0;
      if(expand){
        const image=galleryDialog.querySelector("img");
        image.src=images[current];image.alt=item[language].title;
        galleryDialog.showModal();return;
      }
      const idx=(current+(next?1:-1)+images.length)%images.length;
      article.dataset.workCurrent=String(idx);
      const img=article.querySelector(".p10-work-image");
      if(img)img.src=images[idx];
      const count=article.querySelector(".p10-work-count");
      if(count)count.textContent=(idx+1)+" "+t.of+" "+images.length;
    });
    return true;
  }
  window.GrimaldelliInstagram={mount,posts,ui};
})();
