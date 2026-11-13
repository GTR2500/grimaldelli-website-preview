const fs=require('fs');
const path=require('path');
const http=require('http');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.mp4':'video/mp4','.pdf':'application/pdf'};
const server=http.createServer((req,res)=>{
 const relative=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname).replace(/^\/+/,'')||'index.html';
 const full=path.resolve(root,relative);
 if(!full.startsWith(root+path.sep)&&full!==path.join(root,'index.html')){res.writeHead(403);res.end();return;}
 fs.readFile(full,(err,data)=>{
  if(err){res.writeHead(404);res.end();return;}
  res.writeHead(200,{'Content-Type':mime[path.extname(full)]||'application/octet-stream'});res.end(data);
 });
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const address='http://127.0.0.1:'+server.address().port+'/index.html';
 const browser=await chromium.launch({headless:true});
 const results=[],faults=[],errors=[];
 try{
  for(const lang of ['it','en','fr','de']){
   for(const width of [390,1440]){
    const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',serviceWorkers:'block'});
    const page=await context.newPage();
    page.on('pageerror',err=>errors.push({lang,width,error:String(err)}));
    page.on('response',r=>{if(r.status()>=400)faults.push({lang,width,status:r.status(),url:r.url()})});
    for(const [route,expected] of [['/',2],['/realizzazioni',13],['/soluzione/biogas',8],['/soluzione/fotovoltaico',5]]){
     await page.goto(address+'?lang='+lang+'#'+route,{waitUntil:'domcontentloaded',timeout:35000});
     const target=route==='/'?'#p10-energy-home':'#p10-energy-portfolio';
     await page.locator(target).waitFor({timeout:18000});
     const section=page.locator(target);
     await section.evaluate(el=>{
       el.querySelectorAll('img').forEach(img=>{img.loading='eager'});
     });
     await page.waitForFunction(sel=>[...document.querySelectorAll(sel+' img')].every(img=>img.complete),target,{timeout:12000});
     const result=await page.evaluate(sel=>{
      const root=document.querySelector(sel);
      return{count:root.querySelectorAll('.p10-energy-case,.p10-energy-tile').length,
       images:[...root.querySelectorAll('img[src]')].map(x=>({src:x.getAttribute('src'),width:x.naturalWidth})),
       overflow:document.documentElement.scrollWidth>window.innerWidth+2,
       links:[...root.querySelectorAll('a')].map(x=>x.getAttribute('href')),
       heading:document.querySelector('#app h1')?.innerText||''};
     },target);
     assert.equal(result.count,expected,lang+route+' card count');
     assert.ok(!result.overflow,lang+route+' horizontal overflow '+width);
     assert.ok(result.heading.trim().length>0,lang+route+' missing heading');
     assert.ok(result.images.every(x=>x.width>0),lang+route+' missing images '+JSON.stringify(result.images));
     assert.ok(result.links.every(x=>!x||!x.startsWith('http')),lang+route+' outbound link');
     results.push({lang,width,route,images:result.images.length,cases:result.count});
    }
    await context.close();
   }
  }
  console.log('P10_ENERGY_BROWSER_PASS '+JSON.stringify({variants:results.length,results,errors,faults}));
  assert.deepEqual(errors,[]);
  assert.deepEqual(faults,[]);
 }catch(e){console.error('P10_ENERGY_BROWSER_FAIL',String(e.stack||e),JSON.stringify({results,errors,faults}));process.exitCode=1}
 finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1;server.close()});
