/* P10: identical press article layout in every language; translations never remove article tiers. */
window.GRIMALDELLI_PRESS_LABELS={"en":{"edition":"PRESS REVIEW","title":"An industrial story.<br><em>Seen from the outside.</em>","intro":"Articles, interviews, studies and public sources that trace the development of our company, people and local community.","count":"11 public sources · Curated archive","featured":"IN THE SPOTLIGHT","storiesLabel":"STORIES, RESEARCH AND COMMUNITY","storiesTitle":"Beyond the headlines.","storiesText":"In-depth stories and initiatives to which Grimaldelli has contributed over the years.","archiveLabel":"MENTIONS AND DOCUMENTS","archiveTitle":"Source archive.","archiveText":"Press releases, directories and mentions are presented separately from dedicated articles and interviews.","noteTitle":"A transparent press review.","noteText":"Each entry links to the original source. Press releases and several mentions of the same event are not presented as independent news.","read":"Read original article","source":"View source","open":"Open source","sourceAttr":"source","quotes":{"impresa":"Our people are the foundation of our daily work.","felix":"This is an achievement we share with our entire team."},"sup":{"impresa":"Company stories","felix":"Business and community"}},"fr":{"edition":"REVUE DE PRESSE","title":"Une histoire industrielle.<br><em>Racontée de l’extérieur.</em>","intro":"Articles, entretiens, études et témoignages publics qui retracent l’histoire de l’entreprise, de ses équipes et de son territoire.","count":"11 sources publiques · Archives sélectionnées","featured":"À LA UNE","storiesLabel":"HISTOIRES, RECHERCHE ET TERRITOIRE","storiesTitle":"Au-delà de l’actualité.","storiesText":"Des analyses et des initiatives auxquelles Grimaldelli a contribué au fil du temps.","archiveLabel":"MENTIONS ET DOCUMENTS","archiveTitle":"Les archives des sources.","archiveText":"Les communiqués, annuaires et mentions sont distingués des articles et des entretiens consacrés à l’entreprise.","noteTitle":"Une revue de presse transparente.","noteText":"Chaque fiche renvoie à sa source originale. Les communiqués et les publications portant sur le même événement ne sont pas présentés comme des informations indépendantes.","read":"Lire l’article original","source":"Consulter la source","open":"Ouvrir la source","sourceAttr":"source","quotes":{"impresa":"Les ressources humaines sont le pilier de notre activité quotidienne.","felix":"C’est un résultat que nous partageons avec toute notre équipe."},"sup":{"impresa":"Histoires d’entreprise","felix":"Économie et territoire"}},"de":{"edition":"PRESSESPIEGEL","title":"Eine industrielle Geschichte.<br><em>Von außen betrachtet.</em>","intro":"Artikel, Interviews, Studien und öffentliche Quellen beleuchten die Entwicklung des Unternehmens, seiner Menschen und der Region.","count":"11 öffentliche Quellen · Ausgewähltes Archiv","featured":"IM BLICKPUNKT","storiesLabel":"GESCHICHTEN, FORSCHUNG UND REGION","storiesTitle":"Mehr als Schlagzeilen.","storiesText":"Hintergründe und Initiativen, zu denen Grimaldelli im Laufe der Zeit beigetragen hat.","archiveLabel":"MELDUNGEN UND DOKUMENTE","archiveTitle":"Das Quellenarchiv.","archiveText":"Pressemitteilungen, Verzeichnisse und Erwähnungen werden getrennt von ausführlichen Berichten und Interviews aufgeführt.","noteTitle":"Ein transparenter Pressespiegel.","noteText":"Jeder Eintrag führt zur Originalquelle. Pressemitteilungen und verschiedene Berichte über dasselbe Ereignis werden nicht als unabhängige Meldungen dargestellt.","read":"Originalartikel lesen","source":"Quelle öffnen","open":"Originalquelle öffnen","sourceAttr":"Quelle","quotes":{"impresa":"Unsere Mitarbeitenden sind die Grundlage unserer täglichen Arbeit.","felix":"Dieses Ergebnis teilen wir mit unserem gesamten Team."},"sup":{"impresa":"Unternehmensgeschichten","felix":"Wirtschaft und Region"}}};
window.GrimaldelliPressParity={apply:function localizePress(lang,root,coverage){
  const D=window.GRIMALDELLI_PRESS_LABELS[lang];
  const news=window.GRIMALDELLI_NEWS_LOCALES?.[lang]||{};
  if(!D||!root)return false;
  const put=(parent,selector,value,html=false)=>{
    const node=parent.querySelector(selector);
    if(!node)return false;
    if(html)node.innerHTML=value;else node.textContent=value;
    return true;
  };
  const monthNames={
    en:["January","February","March","April","May","June","July","August","September","October","November","December"],
    fr:["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
    de:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]
  };
  const italianMonths=["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];
  const date=(v)=>{let d=String(v||"");italianMonths.forEach((x,i)=>{d=d.replace(new RegExp("\\b"+x+"\\b","gi"),monthNames[lang][i]);});return d;};
  const sec=root.querySelector(".news-editorial-section");if(!sec)return false;
  put(sec,".news-edition","GRIMALDELLI · "+D.edition);
  put(sec,".news-editorial-heading h2",D.title,true);
  put(sec,".news-editorial-intro p",D.intro);
  put(sec,".news-editorial-intro span",D.count);
  const headings=sec.querySelectorAll(".news-section-heading");
  if(headings[0]){
    put(headings[0],"span",D.storiesLabel);put(headings[0],"h2",D.storiesTitle);put(headings[0],"p",D.storiesText);
  }
  if(headings[1]){
    put(headings[1],"span",D.archiveLabel);put(headings[1],"h2",D.archiveTitle);put(headings[1],"p",D.archiveText);
  }
  put(sec,".news-editorial-note strong",D.noteTitle);
  put(sec,".news-editorial-note p",D.noteText);
  const groups=[
    {tier:"featured",sel:".news-feature-grid .news-feature"},
    {tier:"story",sel:".news-story-grid .news-story"},
    {tier:"archive",sel:".news-archive .news-archive-item"}
  ];
  for(const g of groups){
    const items=coverage.filter(x=>x.tier===g.tier),nodes=sec.querySelectorAll(g.sel);
    if(items.length!==nodes.length)return false;
    nodes.forEach((node,i)=>{
      const record=items[i],translation=news[record.id]||{};
      put(node,".news-meta span",translation.type||record.type);
      put(node,".news-meta time",date(record.date));
      put(node,"h3",translation.title||record.title);
      put(node,"p",translation.summary||record.summary);
      if(g.tier==="featured"){
        put(node,".news-feature-kicker",D.featured);
        put(node,".news-publisher span","/ "+(D.sup[record.id]||record.sup));
        const q=node.querySelector(".news-feature-quote");
        if(q){
          const text=D.quotes[record.id]||record.quote;
          if(q.firstChild&&q.firstChild.nodeType===Node.TEXT_NODE)q.firstChild.nodeValue="“"+text+"”";
          put(q,"cite","— Claudio Grimaldelli, "+D.sourceAttr+": "+record.publication);
        }
        const a=node.querySelector(".news-read");
        if(a&&a.firstChild)a.firstChild.nodeValue=D.read+" ";
      }else if(g.tier==="story"){
        const a=node.querySelector(".news-read");
        if(a&&a.firstChild)a.firstChild.nodeValue=D.source+" ";
      }else{
        const a=node.querySelector(".news-archive-action");
        if(a)a.setAttribute("aria-label",D.open+" "+record.publication+": "+(translation.title||record.title));
      }
    });
  }
  return true;
}};
