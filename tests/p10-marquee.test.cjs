const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const script=fs.readFileSync(path.join(root,"site-marquee.js"),"utf8");
const w={},context={window:w,console};
vm.runInNewContext(script,context,{filename:"site-marquee.js"});
const m=w.GrimaldelliMarquee;
assert.ok(m);
(async()=>{
 for(const lang of ["it","en","fr","de"]){
  const html=m.markup(lang);
  assert.equal((html.match(/class="p10-marquee-sequence"/g)||[]).length,2);
  assert.equal((html.match(/href="#\/soluzione\/biogas"/g)||[]).length,2);
  assert.equal((html.match(/href="#\/soluzione\/fotovoltaico"/g)||[]).length,2);
  assert.equal((html.match(/href="#\/soluzione\/strutture"/g)||[]).length,2);
  assert.equal((html.match(/href="#\/soluzione\/zootecnia"/g)||[]).length,2);
  assert.ok(!html.includes("p10-marquee-count"),"No count should appear in the marquee");
 }
 console.log("PASS: 4 languages, 4 links, loop duplicates, no unverified counts");
})().catch(e=>{console.error(e);process.exitCode=1});
