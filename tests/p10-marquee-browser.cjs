const fs=require("node:fs"),path=require("node:path"),http=require("node:http"),assert=require("node:assert/strict");
const {chromium}=require("playwright");
const root=path.resolve(__dirname,"..");
const mime={".html":"text/html; charset=utf-8",".js":"application/javascript",".css":"text/css",".json":"application/json",".webp":"image/webp",".png":"image/png",".svg":"image/svg+xml",".mp4":"video/mp4",".jpg":"image/jpeg"};
const server=http.createServer((req,res)=>{
 const name=decodeURIComponent(new URL(req.url,"http://localhost").pathname).replace(/^\/+/,"")||"index.html";
 const file=path.resolve(root,name);
 if(!file.startsWith(root+path.sep)&&file!==path.join(root,"index.html")){res.writeHead(403).end();return}
 fs.readFile(file,(err,content)=>{if(err){res.writeHead(404).end();return}res.writeHead(200,{"Content-Type":mime[path.extname(file)]||"application/octet-stream"});res.end(content)});
});
(async()=>{
 await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
 const origin="http://127.0.0.1:"+server.address().port+"/index.html";
 const browser=await chromium.launch({headless:true});
 const results=[],errors=[];
 try{
 for(const lang of ["it","en","fr","de"]){
  for(const width of [390,1440]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:"no-preference",serviceWorkers:"block"});
   const page=await context.newPage();
   page.on("pageerror",e=>errors.push(String(e)));
   await page.goto(origin+"?lang="+lang+"#/",{waitUntil:"domcontentloaded",timeout:30000});
   const item=page.locator(".p10-marquee-count");
   await item.first().waitFor({timeout:14000});
   const qa=await page.locator(".p10-marquee").evaluate(node=>{
    const track=node.querySelector(".p10-marquee-track"),seq=[...node.querySelectorAll(".p10-marquee-sequence")];
    return{
     text:node.innerText,
     links:[...seq[0].querySelectorAll("a")].map(x=>({href:x.getAttribute("href"),label:x.getAttribute("aria-label"),text:x.innerText})),
     duplicates:seq.length,
     identical:seq[0].innerHTML===seq[1].innerHTML,
     widths:seq.map(x=>x.getBoundingClientRect().width),
     animation:getComputedStyle(track).animationName,
     paused:getComputedStyle(track).animationPlayState,
     viewport:window.innerWidth,overflow:document.documentElement.scrollWidth
    };
   });
   assert.equal(qa.duplicates,2);
   assert.ok(qa.identical,lang+" duplicate segment mismatch");
   assert.ok(Math.abs(qa.widths[0]-qa.widths[1])<1,lang+" broken seamless loop");
   assert.equal(qa.links.length,4);
   assert.deepEqual(qa.links.map(x=>x.href),["#/soluzione/strutture","#/soluzione/zootecnia","#/soluzione/biogas","#/soluzione/fotovoltaico"]);
   assert.ok(qa.links[2].text.includes("8"),lang+" bio count");
   assert.ok(qa.links[3].text.includes("13"),lang+" photovoltaic count");
   assert.ok(!qa.links[0].text.match(/\d+\s/),lang+" invented steel count");
   assert.ok(!qa.links[1].text.match(/\d+\s/),lang+" invented livestock count");
   assert.equal(qa.animation,"p10-marquee-scroll");
   assert.ok(qa.overflow<=qa.viewport+2,lang+" horizontal overflow "+width);
   if(lang==="it"&&width===1440){
     await page.locator(".p10-marquee").screenshot({path:path.join(root,"p10-marquee-qa.png")});
   }
   // navigation is a hash route and must show the appropriate sector
   await page.locator('.p10-marquee-sequence:first-child a[href="#/soluzione/fotovoltaico"]').click();
   await page.waitForURL(/#\/soluzione\/fotovoltaico/,{timeout:10000});
   await page.locator("#p10-energy-portfolio").waitFor({timeout:12000});
   results.push({lang,width,counts:[8,13],links:4,sectorNavigation:true,seamless:true});
   await context.close();
  }
 }
 assert.deepEqual(errors,[]);
 console.log("P10_MARQUEE_BROWSER_PASS "+JSON.stringify({variants:results.length,results,errors}));
 }catch(e){console.error("P10_MARQUEE_BROWSER_FAIL",e.stack||String(e),JSON.stringify({results,errors}));process.exitCode=1;}
 finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;server.close()});
