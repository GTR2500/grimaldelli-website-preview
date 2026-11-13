const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const script=fs.readFileSync(path.join(root,"site-marquee.js"),"utf8");
const bio=JSON.parse(fs.readFileSync(path.join(root,"assets/energy/biogas/manifest.json"),"utf8"));
const solar=JSON.parse(fs.readFileSync(path.join(root,"assets/energy/photovoltaic/manifest.json"),"utf8"));
const nas=JSON.parse(fs.readFileSync(path.join(root,"assets/energy/photovoltaic-nas/manifest.json"),"utf8"));
const instagram=JSON.parse(fs.readFileSync(path.join(root,"assets/instagram/manifest.json"),"utf8"));
const responses={
 "assets/energy/biogas/manifest.json":bio,
 "assets/energy/photovoltaic/manifest.json":solar,
 "assets/energy/photovoltaic-nas/manifest.json":nas,
 "assets/instagram/manifest.json":instagram
};
const visits=[];
const w={},context={window:w,console,fetch:async url=>{visits.push(url);assert.ok(responses[url],url);return {ok:true,json:async()=>responses[url]}}};
vm.runInNewContext(script,context,{filename:"site-marquee.js"});
const m=w.GrimaldelliMarquee;
assert.ok(m);
(async()=>{
 const counts=await m.counts();
 assert.deepEqual(JSON.parse(JSON.stringify(counts)),{biogas:8,solar:13});
 assert.equal(visits.length,4);
 assert.deepEqual(new Set(visits).size,4);
 for(const lang of ["it","en","fr","de"]){
  const html=m.markup(lang);
  assert.equal((html.match(/class="p10-marquee-sequence"/g)||[]).length,2);
  assert.equal((html.match(/href="#\/soluzione\/biogas"/g)||[]).length,2);
  assert.equal((html.match(/href="#\/soluzione\/fotovoltaico"/g)||[]).length,2);
  assert.equal((html.match(/href="#\/soluzione\/strutture"/g)||[]).length,2);
  assert.equal((html.match(/href="#\/soluzione\/zootecnia"/g)||[]).length,2);
  assert.ok(!html.includes("p10-marquee-count"),"numbers must load asynchronously rather than be hardcoded");
 }
 console.log("PASS: 4 languages, 4 links, loop duplicates, 8 biogas & 13 photovoltaic distinct cases");
})().catch(e=>{console.error(e);process.exitCode=1});
