'use strict';
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.mp4':'video/mp4','.ico':'image/x-icon','.pdf':'application/pdf'};
const server=http.createServer((req,res)=>{
 const relative=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname).replace(/^\/+/,'')||'index.html';
 const filepath=path.resolve(root,relative);
 if(filepath!==path.join(root,'index.html')&&!filepath.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.readFile(filepath,(err,data)=>{
  if(err){res.writeHead(404);res.end();return;}
  res.writeHead(200,{'Content-Type':mime[path.extname(filepath)]||'application/octet-stream'});
  res.end(data);
 });
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const address='http://127.0.0.1:'+server.address().port+'/index.html';
 const browser=await chromium.launch({headless:true});
 const results=[],errors=[];
 try{
  for(const lang of ['it','en','fr','de']){
   for(const width of [390,1440]){
    const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',serviceWorkers:'block'});
    const page=await context.newPage();
    page.on('pageerror',e=>errors.push({lang,width,error:String(e)}));
    async function load(route){
     await page.goto(address+'?lang='+lang+'#'+route,{waitUntil:'domcontentloaded',timeout:30000});
     await page.locator('#app h1').first().waitFor({timeout:20000});
     const info=await page.evaluate(()=>({horizontalOverflow:document.documentElement.scrollWidth>window.innerWidth+2,title:document.title,h1:document.querySelector('#app h1')?.textContent?.trim()||'',htmlLang:document.documentElement.lang}));
     assert.ok(info.h1,lang+route+' missing heading');
     assert.ok(!info.horizontalOverflow,lang+route+' horizontal overflow at '+width);
     assert.ok(info.title.includes('Grimaldelli'),lang+route+' bad SEO title');
     return info;
    }
    await load('/');
    assert.equal(await page.locator('.p10-mkt-proof').count(),3,lang+width+' Home trust strip');
    assert.ok((await page.locator('.hero-salvirola .hero-bottom p').innerText()).length>95,lang+width+' Home value proposition too short');

    await load('/azienda');
    assert.ok(await page.locator('.company-history-year').filter({hasText:'1964'}).count(),lang+width+' 1964 missing');
    const chapterSize=await page.locator('.company-story-index').first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
    assert.ok(chapterSize>=18,lang+width+' chapter labels too small: '+chapterSize);

    await load('/prodotto/raschiatori-asporta-letame');
    assert.equal(await page.locator('.p10-mkt-product-evidence').count(),1,lang+width+' detailed source');
    assert.equal(await page.locator('.p10-mkt-spec-list li').count(),7,lang+width+' product specs');
    const enquiry=await page.locator('.product-detail .detail-hero a[href*="contatti?prodotto="]').getAttribute('href');
    assert.ok(enquiry.includes('raschiatori-asporta-letame'),lang+width+' enquiry lost product context');

    await load('/contatti?prodotto=raschiatori-asporta-letame');
    assert.equal(await page.locator('.p10-mkt-contact-context').count(),1,lang+width+' request context missing');
    assert.ok((await page.locator('textarea[name="message"]').inputValue()).length>35,lang+width+' prefilled request context missing');
    assert.equal(await page.locator('.p10-mkt-mail-action').count(),1,lang+width+' preview email fallback missing');
    const mail=await page.locator('.p10-mkt-mail-action').getAttribute('href');
    assert.ok(mail.startsWith('mailto:info@glcgrimaldelli.com?subject='),lang+width+' mail subject missing');
    assert.ok(mail.includes('raschiatori'),lang+width+' mail product reference missing');

    await load('/realizzazioni');
    assert.equal(await page.locator('[data-p10-project-sector]').count(),5,lang+width+' project filter categories');
    assert.equal(await page.locator('#p10-energy-portfolio .p10-energy-case').count(),21,lang+width+' documented energy case count');
    await page.locator('[data-p10-project-sector="biogas"]').click();
    assert.equal(await page.locator('#p10-energy-portfolio .p10-energy-case:visible').count(),8,lang+width+' biogas filtering');
    assert.equal(await page.locator('[data-p10-project-sector="biogas"]').getAttribute('aria-pressed'),'true',lang+width+' selected filter accessibility');

    results.push({lang,width,chapterSize,productFacts:7,biogasProjects:8});
    await context.close();
   }
  }
  assert.deepEqual(errors,[],'Browser JavaScript errors');
  console.log('P10_MARKETING_BROWSER_PASS '+JSON.stringify({variants:results.length,results}));
 }catch(e){console.error('P10_MARKETING_BROWSER_FAIL',String(e.stack||e),JSON.stringify({results,errors}));process.exitCode=1;}
 finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;server.close()});
