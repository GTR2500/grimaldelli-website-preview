const fs=require("fs"),path=require("path"),vm=require("vm"),assert=require("assert");
const root=path.resolve(__dirname,"..");
const src=fs.readFileSync(path.join(root,"site-energy.js"),"utf8");
const manifest=JSON.parse(fs.readFileSync(path.join(root,"assets/energy/biogas/manifest.json"),"utf8"));
const solarManifest=JSON.parse(fs.readFileSync(path.join(root,"assets/energy/photovoltaic/manifest.json"),"utf8"));
assert.equal(manifest.projects.length,8);
const nasManifest=JSON.parse(fs.readFileSync(path.join(root,"assets/energy/photovoltaic-nas/manifest.json"),"utf8"));
assert.equal(solarManifest.projects.length,4);
assert.equal(nasManifest.projects.length,8);
const images=[...manifest.projects,...solarManifest.projects,...nasManifest.projects].flatMap(x=>x.images);
assert.ok(images.length>=40,"Not enough curated imagery");
for(const item of images){
 const filename=path.join(root,item.path);
 assert.ok(fs.existsSync(filename),filename);
 assert.ok(fs.statSync(filename).size>20000,filename);
}
const localSolar=["assets/instagram/nisoli/image-01.webp","assets/instagram/ginelli/image-01.webp"];
localSolar.forEach(p=>assert.ok(fs.existsSync(path.join(root,p))));
const fetched=[];
const window={location:{href:""}};
const document={createElement(tag){
 assert.equal(tag,"dialog");
 return {className:"",innerHTML:"",addEventListener(){}};
}};
const sandbox={
 window,document,console,
 fetch:async (url)=>{fetched.push(url);
   assert.ok(["assets/energy/biogas/manifest.json","assets/energy/photovoltaic/manifest.json","assets/energy/photovoltaic-nas/manifest.json"].includes(url));
   return {ok:true,json:async()=>url.includes("/biogas/")?manifest:url.includes("/photovoltaic-nas/")?nasManifest:solarManifest};
 }
};
vm.runInNewContext(src,sandbox,{filename:"site-energy.js"});
const energy=window.GrimaldelliEnergy;
assert.ok(energy);
(async()=>{
for(const lang of ["it","en","fr","de"]){
 for(const [route,expected] of [["/",2],["/realizzazioni",21],["/soluzione/biogas",8],["/soluzione/fotovoltaico",13]]){
  let html="";
  window.location.href="https://example.org/index.html?lang="+lang+"#"+route;
  const section={appendChild(){},addEventListener(){}};
  const app={isConnected:true,querySelector(s){
      if(s==="#p10-energy-portfolio"||s==="#p10-energy-home")return section;
      return null;
    },insertAdjacentHTML(where,str){html+=str}};
  const ok=await energy.mount(route,lang,app);
  assert.equal(ok,true,lang+route);
  assert.ok(html.includes('assets/energy/biogas/')||route==="/soluzione/fotovoltaico");
  assert.ok(!/<iframe|instagram\.com|https?:\/\//i.test(html),"No embeds or external links in energy section");
  const count=route==="/"?((html.match(/class="p10-energy-tile"/g)||[]).length):
    ((html.match(/class="p10-energy-case"/g)||[]).length);
  assert.equal(count,expected,lang+route);
  if(route==="/soluzione/biogas")assert.ok(html.includes("249 kW"));
 }
}
assert.equal(fetched.length,3,"Fetch three local manifests once per SPA lifetime");
assert.equal(await energy.mount("/contatti","it",{}),false);
console.log("P10_ENERGY_TEST_PASS 4 languages, 4 routes, 8 Biogas projects, 13 Solar projects");
})().catch(e=>{console.error(e);process.exitCode=1});
