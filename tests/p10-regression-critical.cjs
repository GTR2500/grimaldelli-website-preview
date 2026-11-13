'use strict';
// Guardrail for specifically approved P10 content. Source-level checks do not
// replace browser visual QA; they prevent accidental deletion on main.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

const site = read('site.js');
const companyStart = site.indexOf('function company(){');
const companyEnd = site.indexOf('function catalogueCard(', companyStart);
assert.ok(companyStart >= 0 && companyEnd > companyStart, 'Missing canonical Azienda renderer');
const company = site.slice(companyStart, companyEnd);
const years = [...company.matchAll(/\{year:'(\d{4})'/g)].map(m => m[1]);
assert.deepEqual(years, ['1921', '1964', '1999', '2021', '2025'],
  'Azienda chronology changed: keep the approved five milestones, including 1964');
assert.ok(company.includes('company-history-list') && company.includes('company-history-year'),
  'Azienda chronology markup disappeared');
assert.ok(company.includes('company-story-outro'), 'Missing La storia continua panel');
const panelIndex = company.indexOf('class="company-story-outro"');
const interviewIndex = company.indexOf('Leggi l’intervista integrale');
assert.ok(interviewIndex > panelIndex, 'Interview action must remain in La storia continua');
assert.equal((company.match(/class="company-read-link"/g) || []).length, 1,
  'Azienda must contain just one interview button');
assert.equal((company.match(/MAG-INDUSTRIALI-_-GRIMALDELLI-1\.pdf/g) || []).length, 1,
  'Keep one direct link to the original interview PDF');
assert.ok(!company.includes('company-interview-number'), 'The removed 03 PAGINE badge is back');

const press = read('press-editorial.css');
assert.ok(press.includes('.company-history-year{'), 'Azienda date styles disappeared');
assert.ok(!press.includes('.company-history{display:none'), 'Azienda timeline must stay visible');

const translations = read('site-company-parity.js');
assert.ok(translations.includes('const historyIt='), 'Azienda translations disappeared');
const i18n = read('site-i18n.js');
assert.ok(i18n.includes('C.company();'), 'Translated routes must render the Azienda page');

const sectors = read('site-projects.js');
for (const name of ['strutture','zootecnia','biogas','fotovoltaico'])
  assert.ok(sectors.includes(name), 'Missing Realizzazioni sector: ' + name);
assert.ok(site.includes("['biogas',energyCatalogueLabels[0]]") &&
          site.includes("['fotovoltaico',energyCatalogueLabels[1]]"),
  'Energy categories missing from the Prodotti catalogue');

const css = read('editorial.css');
assert.ok(css.includes('.hero-salvirola .hero-shade{background:linear-gradient(90deg,rgba(13,20,20,.93)'),
  'Home must retain the approved dark photographic treatment');
assert.ok(!css.includes('preserve the photograph rather than covering half'),
  'Unapproved bright Home overlay restored');
assert.ok(css.includes('.sede-photo-frame img{display:block;width:100%;height:auto;object-fit:contain;filter:none}'),
  'Salvirola image must not regain the black letterbox');

const html = read('index.html');
assert.ok(html.includes('site-company-parity.js') && html.includes('site.js?'),
  'Critical scripts not loaded');
assert.ok(html.includes('assets/favicon-grimaldelli-32.png') && html.includes('favicon.ico'),
  'Grimaldelli browser icon not registered');
for (const name of ['favicon.ico','assets/favicon-grimaldelli-32.png'])
  assert.ok(fs.existsSync(path.join(root,name)), 'Favicon file missing: ' + name);

console.log('P10_REGRESSION_GUARD_PASS: Azienda years, interview, four sectors, Home image, favicon');
