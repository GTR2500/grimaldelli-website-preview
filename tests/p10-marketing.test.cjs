'use strict';
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const js=read('site-marketing.js');
const site=read('site.js');
const html=read('index.html');
const css=read('editorial.css');
const sandbox={window:{}};
vm.runInNewContext(js,sandbox,{filename:'site-marketing.js'});
assert.equal(typeof sandbox.window.GrimaldelliMarketing?.mount,'function','Marketing route enhancer not registered');
assert.ok(site.includes('GrimaldelliMarketing?.mount(pathname,currentLocale,{app,params,products,sol})'),'Marketing enhancer not mounted on each route');
assert.ok(html.includes('site-marketing.js?v='),'Marketing module absent from HTML');
assert.ok(css.includes('p10-mkt-proof-row')&&css.includes('p10-mkt-product-evidence'),'Missing responsive marketing styles');
for(const key of ['it:{','en:{','fr:{','de:{'])assert.ok(js.includes(key),'Missing marketing language '+key);
assert.ok(js.includes('raschiatori-asporta-letame'),'Official technical specification not mapped');
assert.ok(js.includes('0,76–1,1 kW'),'Official documented power range was lost');
assert.ok(js.includes('https://www.glcgrimaldelli.com/prodotto/raschiatori-asporta-letame/'),'Original source attribution missing');
assert.ok(js.includes('p10-mkt-product-evidence'),'Product technical section missing');
assert.ok(js.includes('"#/contatti?prodotto="'),'Contextual product enquiry link missing');
assert.ok(js.includes('"#/contatti?settore="'),'Contextual sector enquiry link missing');
assert.ok(js.includes('subjectItem'),'Enquiry context must be preserved');
assert.ok(js.includes('mailto:')&&js.includes('isPreview'),'Demo must offer an honest email fallback');
assert.ok(!js.includes('fetch(')&&!js.includes('XMLHttpRequest'),'Marketing enhancer must not submit or track data');
assert.ok(html.includes('noindex,nofollow,noarchive'),'Private preview must remain noindex');
assert.ok(html.includes('og:image')&&html.includes('og:description'),'Social-sharing baseline metadata missing');
assert.ok(site.includes("{year:'1964'"),'Approved 1964 chronology missing');
for(const token of ['p10-mkt-custom-feature','p10-mkt-catalog-note','p10-mkt-product-custom','p10-mkt-solution-custom','su-misura=1','customRequest','customIntro']){
 assert.ok(js.includes(token),'Missing tailored-manufacturing feature '+token);
}
assert.ok(css.includes('P10_CUSTOM_FABRICATION_POSITIONING'),'Missing bespoke visual system');
assert.ok(html.includes('p10-su-misura-20261113'),'Stale cache version for bespoke messaging');
assert.ok(!/EBITDA|500k|500\.000/i.test(js),'Internal financial metrics may not be published or committed in site copy');
const energy=read('site-energy.js');
const translations=read('site-company-parity.js');
assert.ok(!/Grimaldelli non si presenta come costruttore|does not claim to build entire plants|non a un ruolo di fornitore EPC|sans impliquer une fourniture clés en main|komplette Anlagen zu errichten/.test(energy),'Defensive internal review wording leaked into energy pages');
assert.ok(!translations.includes('sono illustrazioni e non fotografie di realizzazioni aziendali'),'Old incorrect photography disclaimer returned');
assert.ok(!js.includes('SCRAPER_SPECS.it=['),'Duplicated language override returned');
assert.ok(!/500[., ]?000|500k|EBITDA per dipendente/i.test(js+site+energy),'Internal financial data must never appear in the public pages');
for(const text of ['Progetti e fotografie dal nostro archivio','Projects from our archive','Projets et photographies de nos archives','Projekte aus unserem Archiv']){
 assert.ok(js.includes(text),'Public-facing portfolio wording missing: '+text);
}
console.log('P10_MARKETING_TEST_PASS: documented specs, lead context, honest demo mail, four languages and metadata');
