const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const code=fs.readFileSync("site-instagram.js","utf8");
const created=[];
const doc={createElement(tag){
 const frame={tagName:tag,src:"",title:"",loading:"",referrerPolicy:"",attrs:{},setAttribute(k,v){this.attrs[k]=v}};
 created.push(frame);return frame;
}};
const sandbox={window:{},document:doc,URL,console};
vm.runInNewContext(code,sandbox,{filename:"site-instagram.js"});
const m=sandbox.window.GrimaldelliInstagram;
assert.equal(m.posts.length,7);
for(const lang of ["it","en","fr","de"]){
  for(const route of ["/","/realizzazioni","/soluzione/zootecnia","/prodotto/stalle","/soluzione/fotovoltaico"]){
    let html="",onClick;
    const area={hidden:true,children:[],appendChild(el){this.children.push(el)},replaceChildren(){this.children=[]},scrollIntoView(){}};
    const section={
      addEventListener(type,fn){if(type==="click")onClick=fn},
      querySelector(s){if(s==="#p10-social-frame-biloni"||s==="#p10-social-frame-cadilana")return area;return null}
    };
    const app={querySelector(s){return s==="#p10-social-showcase"?section:null},
      insertAdjacentHTML(where,markup){html+=markup}};
    assert.equal(m.mount(route,lang,app),true);
    assert.ok(html.includes("www.instagram.com"));
    assert.ok(html.includes("data-instagram-load"));
    assert.ok(html.includes("p10-social-disclosure"));
    assert.ok(!html.includes("<iframe"));
    assert.equal(created.length,0,"media must not load before explicit user action");
    const expected=route==="/realizzazioni"?7:route==="/soluzione/zootecnia"||route==="/prodotto/stalle"?3:2;
    assert.equal((html.match(/class="p10-social-work"/g)||[]).length,expected);
    const props={ariaExpanded:"false"},button={firstChild:{textContent:"Visualizza il contenuto "},getAttribute(key){return key==="data-instagram-load"?"biloni":props[key]},setAttribute(k,v){props[k]=v}};
    const ev={target:{closest(){return button}}};
    onClick(ev);
    assert.equal(created.length,1);
    assert.equal(area.children.length,1);
    assert.ok(area.children[0].src.startsWith("https://www.instagram.com/p/"));
    assert.equal(props["aria-expanded"],"true");
    onClick(ev);
    assert.equal(area.children.length,0);
    assert.equal(area.hidden,true);
    created.length=0;
  }
}
assert.equal(m.mount("/contatti","it",{insertAdjacentHTML(){throw Error("Should not insert")}}),false);
console.log("PASS: 4 languages x 5 routes, 7 verified posts, deferred media, consent toggle and known links");
