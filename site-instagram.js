/* P10 - Instagram gallery, first-party UI with user-initiated external media.
   No third-party requests, cookies, scripts or iframes until a visitor clicks Load. */
(function(){
  "use strict";
  const posts=[
    {
      id:"biloni",
      type:"photos",
      instagram:"https://www.instagram.com/p/DfnCdbEIRz8/",
      embed:"https://www.instagram.com/p/DfnCdbEIRz8/embed/captioned/",
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
      instagram:"https://www.instagram.com/grimaldellisrl/reel/DfiO5WDOkg9/",
      embed:"https://www.instagram.com/reel/DfiO5WDOkg9/embed/captioned/",
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
    "instagram": "https://www.instagram.com/grimaldellisrl/reel/Cs5KMF3Ivcp/",
    "embed": "https://www.instagram.com/reel/Cs5KMF3Ivcp/embed/captioned/",
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
    "instagram": "https://www.instagram.com/grimaldellisrl/p/CddN6WFKW2H/",
    "embed": "https://www.instagram.com/p/CddN6WFKW2H/embed/captioned/",
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
    "instagram": "https://www.instagram.com/grimaldellisrl/p/CcXNY82K4dd/",
    "embed": "https://www.instagram.com/p/CcXNY82K4dd/embed/captioned/",
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
    "instagram": "https://www.instagram.com/grimaldellisrl/p/CvrdB_ionuY/",
    "embed": "https://www.instagram.com/p/CvrdB_ionuY/embed/captioned/",
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
    "instagram": "https://www.instagram.com/grimaldellisrl/p/CvrJrWbItUF/",
    "embed": "https://www.instagram.com/p/CvrJrWbItUF/embed/captioned/",
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
    it:{archive:"Archivio",energyTitle:"Dai tetti.<br><em>All\u2019energia.</em>",kicker:"DAL CANTIERE / PROGETTI REALI",homeTitle:"Il lavoro sul campo.<br><em>Raccontato per immagini.</em>",projectsTitle:"Interventi recenti.<br><em>Foto e video dal campo.</em>",sectorTitle:"Dalle stalle.<br><em>Ai progetti reali.</em>",intro:"Una selezione di contenuti pubblicati dal profilo Instagram ufficiale Grimaldelli. Immagini e video si caricano soltanto su tua richiesta.",load:"Visualizza il contenuto",external:"Apri su Instagram",privacy:"Se scegli di visualizzare il contenuto, Instagram riceverà una richiesta dal tuo browser e potrà utilizzare cookie secondo le proprie regole.",photos:"Fotografie del lavoro",video:"Riprese dal campo",close:"Chiudi il contenuto",source:"Fonte: profilo ufficiale Instagram Grimaldelli",cta:"Vedi tutte le realizzazioni"},
    en:{archive:"Archive",energyTitle:"From rooftops.<br><em>To clean energy.</em>",kicker:"ON SITE / REAL PROJECTS",homeTitle:"Work in progress.<br><em>Stories in pictures.</em>",projectsTitle:"Recent projects.<br><em>Photos and videos from site.</em>",sectorTitle:"From barns.<br><em>To completed projects.</em>",intro:"Selected posts from Grimaldelli's official Instagram profile. Photos and videos load only when you choose to view them.",load:"View the content",external:"Open on Instagram",privacy:"If you choose to view it, Instagram will receive a request from your browser and may use cookies under its own terms.",photos:"Project photography",video:"On-site video",close:"Close content",source:"Source: official Grimaldelli Instagram profile",cta:"View all projects"},
    fr:{archive:"Archives",energyTitle:"Des toitures.<br><em>À l\u2019énergie.</em>",kicker:"SUR LE TERRAIN / PROJETS RÉELS",homeTitle:"Le travail sur site.<br><em>Raconté en images.</em>",projectsTitle:"Projets récents.<br><em>Photos et vidéos du terrain.</em>",sectorTitle:"Des étables.<br><em>Aux réalisations.</em>",intro:"Une sélection de publications du compte Instagram officiel de Grimaldelli. Les médias ne se chargent qu'à votre demande.",load:"Voir le contenu",external:"Ouvrir sur Instagram",privacy:"Si vous choisissez de voir ce contenu, Instagram recevra une requête de votre navigateur et pourra utiliser des cookies selon ses conditions.",photos:"Photos des chantiers",video:"Vidéo du terrain",close:"Fermer le contenu",source:"Source : profil Instagram officiel de Grimaldelli",cta:"Voir les réalisations"},
    de:{archive:"Archiv",energyTitle:"Vom Dach.<br><em>Zur Energie.</em>",kicker:"VOR ORT / REALE PROJEKTE",homeTitle:"Arbeit vor Ort.<br><em>In Bildern erzählt.</em>",projectsTitle:"Aktuelle Projekte.<br><em>Fotos und Videos von der Baustelle.</em>",sectorTitle:"Vom Stall.<br><em>Zum realen Projekt.</em>",intro:"Ausgewählte Beiträge vom offiziellen Instagram-Profil von Grimaldelli. Fotos und Videos werden erst auf Ihren Wunsch geladen.",load:"Inhalt anzeigen",external:"Auf Instagram öffnen",privacy:"Wenn Sie den Inhalt anzeigen, erhält Instagram eine Anfrage von Ihrem Browser und kann gemäß seinen Regeln Cookies verwenden.",photos:"Fotos von Projekten",video:"Video vor Ort",close:"Inhalt schließen",source:"Quelle: offizielles Instagram-Profil von Grimaldelli",cta:"Alle Referenzen ansehen"}
  };
  const escape=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const normalize=link=>{
    const url=new URL(link);
    if(url.protocol!=="https:"||url.hostname!=="www.instagram.com")throw Error("External origin not allowed");
    return url.href;
  };
  const template=(post,lang,t)=>{
    const copy=post[lang];
    const img=post.type==="photos";
    return '<article class="p10-social-work" data-instagram-id="'+post.id+'">'+
     '<div class="p10-social-work-art '+(img?'p10-social-work-art--photo':'p10-social-work-art--video')+'">'+
      '<div class="p10-social-work-sign" aria-hidden="true">'+(img?'<span class="p10-photo-icon"></span>':'<span class="p10-play-icon"></span>')+'</div>'+
      '<span class="p10-work-type">'+escape(copy.label)+'</span>'+
      '<div class="p10-work-art-title">'+escape(img?t.photos:t.video)+'</div>'+
     '</div>'+
     '<div class="p10-social-work-content"><div class="p10-social-work-meta">'+(post.date?'<time datetime="'+post.date+'">'+escape(post.date.replace(/-/g,"."))+'</time>':'<span>'+escape(t.archive)+'</span>')+'<span>'+escape(post.where)+'</span></div>'+
      '<h3>'+escape(copy.title)+'</h3><p>'+escape(copy.desc)+'</p>'+
      '<p class="p10-social-disclosure">'+escape(t.privacy)+'</p>'+
      '<div class="p10-social-actions"><button type="button" class="p10-social-load" data-instagram-load="'+post.id+'" aria-controls="p10-social-frame-'+post.id+'" aria-expanded="false">'+escape(t.load)+' <span aria-hidden="true">↗</span></button>'+
      '<a href="'+normalize(post.instagram)+'" target="_blank" rel="noopener noreferrer">'+escape(t.external)+' ↗</a></div>'+
     '</div><div class="p10-social-embed" id="p10-social-frame-'+post.id+'" hidden></div></article>';
  };
  function mount(route,lang,app){
    const isHome=route==="/";
    const isPortfolio=route==="/realizzazioni";
    const isBarn=route==="/soluzione/zootecnia"||route==="/prodotto/stalle";
    const isEnergy=route==="/soluzione/fotovoltaico";
    if(!isHome&&!isPortfolio&&!isBarn&&!isEnergy)return false;
    const language=ui[lang]?lang:"it",t=ui[language];
    const selection=isHome?posts.slice(0,2):isBarn?posts.filter(p=>p.category==="livestock").slice(0,3):isEnergy?posts.filter(p=>p.category==="energy"):posts;
    const title=isPortfolio?t.projectsTitle:isBarn?t.sectorTitle:isEnergy?t.energyTitle:t.homeTitle;
    const extra=isHome?'<a href="#/realizzazioni" class="p10-social-portfolio-link">'+escape(t.cta)+' <span aria-hidden="true">↗</span></a>':'';
    const html='<section class="p10-social-showcase" id="p10-social-showcase" aria-labelledby="p10-social-showcase-title">'+
      '<div class="section-container"><div class="p10-social-heading"><div><span class="p10-social-eyebrow">'+escape(t.kicker)+'</span>'+
      '<h2 id="p10-social-showcase-title">'+title+'</h2></div><div class="p10-social-summary"><p>'+escape(t.intro)+'</p>'+extra+'</div></div>'+
      '<div class="p10-social-grid '+(selection.length===1?'p10-social-grid--single':'')+'">'+selection.map(x=>template(x,language,t)).join("")+'</div>'+
      '<p class="p10-social-source">'+escape(t.source)+'</p></div></section>';
    const anchor=isHome?app.querySelector(".social-teaser-section"):null;
    if(anchor)anchor.insertAdjacentHTML("beforebegin",html);
    else app.insertAdjacentHTML("beforeend",html);
    const section=app.querySelector("#p10-social-showcase");
    section.addEventListener("click",ev=>{
      const button=ev.target.closest("[data-instagram-load]");if(!button)return;
      const id=button.getAttribute("data-instagram-load");
      const item=selection.find(p=>p.id===id);
      if(!item)return;
      const area=section.querySelector("#p10-social-frame-"+id);
      if(!area)return;
      const active=button.getAttribute("aria-expanded")==="true";
      if(active){
        area.replaceChildren();area.hidden=true;
        button.setAttribute("aria-expanded","false");button.firstChild.textContent=t.load+" ";
        return;
      }
      const iframe=document.createElement("iframe");
      iframe.src=normalize(item.embed);iframe.loading="lazy";iframe.title=item[language].title+" - Instagram";
      iframe.referrerPolicy="strict-origin-when-cross-origin";
      iframe.setAttribute("allow","fullscreen; picture-in-picture");
      iframe.setAttribute("allowfullscreen","");
      area.hidden=false;area.appendChild(iframe);
      button.setAttribute("aria-expanded","true");button.firstChild.textContent=t.close+" ";
      area.scrollIntoView({behavior:"smooth",block:"nearest"});
    });
    return true;
  }
  window.GrimaldelliInstagram={mount,posts,ui};
})();
