const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const source=fs.readFileSync("site-instagram.js","utf8");
const manifest=JSON.parse(fs.readFileSync("assets/instagram/manifest.json","utf8"));
const requests=[];
const document={
  createElement(tag){
    assert.equal(tag,"dialog","Only local picture lightbox may be created");
    return {
      className:"",innerHTML:"",
      addEventListener(){},
      querySelector(){return {src:"",alt:""}},
      showModal(){},close(){}
    };
  }
};
const location={href:"https://gtr2500.github.io/grimaldelli-website-preview/?lang=it#/"};
const sandbox={
  window:{location},
  document,
  console,
  URL,
  fetch:async url=>{
    requests.push(url);
    assert.equal(url,"assets/instagram/manifest.json","No external HTTP requests are permitted");
    return {ok:true,json:async()=>manifest};
  }
};
vm.runInNewContext(source,sandbox,{filename:"site-instagram.js"});
const gallery=sandbox.window.GrimaldelliInstagram;
assert.equal(gallery.posts.length,7);
assert.ok(manifest.media.every(x=>x.images.length||x.videos.length),"No empty media sources");
for(const item of manifest.media){
  for(const file of [...item.images,...item.videos]){
    const local=file.replace(/^\/+/,"");
    assert.ok(local.startsWith("assets/instagram/"));
    assert.ok(fs.existsSync(local),local+" missing");
    assert.ok(fs.statSync(local).size>1000,local+" empty");
  }
}
(async()=>{
  for(const lang of ["it","en","fr","de"]){
    for(const [route,expected] of [["/",2],["/realizzazioni",7],["/soluzione/zootecnia",3],["/prodotto/stalle",3],["/soluzione/fotovoltaico",2]]){
      let html="",listened=false;
      location.href="https://gtr2500.github.io/grimaldelli-website-preview/?lang="+lang+"#"+route;
      const section={
        addEventListener(type){if(type==="click")listened=true},
        appendChild(){},
        querySelector(){return null}
      };
      const app={
        isConnected:true,
        querySelector(selector){return selector==="#p10-social-showcase"?section:null},
        insertAdjacentHTML(position,markup){html+=markup}
      };
      assert.equal(await gallery.mount(route,lang,app),true,lang+route);
      assert.equal((html.match(/class="p10-social-work p10-work-card"/g)||[]).length,expected,lang+route);
      assert.ok(listened,lang+route+" no controls");
      assert.ok(html.includes("assets/instagram/"),lang+route+" missing local assets");
      assert.ok(!/<iframe|instagram\.com|https?:\/\/|data-instagram-load|target="_blank"/i.test(html),lang+route+" external media / link");
      assert.ok(html.includes('class="p10-work-visual"'),lang+route+" missing visual");
      assert.ok(html.includes('class="p10-work-video"') || route==="/soluzione/fotovoltaico",lang+route+" missing video player");
    }
  }
  assert.equal(requests.length,1,"Manifest should be loaded once from first-party host");
  assert.equal(await gallery.mount("/contatti","it",{}),false);
  console.log("PASS: 4 languages x 5 routes, 7 local media sets, first-party images/videos, no embeds, no outbound links");
})().catch(e=>{console.error(e);process.exitCode=1});
