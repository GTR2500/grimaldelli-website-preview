#!/usr/bin/env python3
"""Acquire Grimaldelli's historical biogas project photographs as first-party assets.
Preserves provenance; rejects logos/thumbnails and duplicate bytes.
"""
from __future__ import annotations
import hashlib
import io
import json
import pathlib
import re
import sys
import time
from urllib.parse import urljoin,urlparse

import requests
from bs4 import BeautifulSoup
from PIL import Image,ImageOps,ImageFilter,ImageStat

ROOT=pathlib.Path(__file__).resolve().parents[1]
DEST=ROOT/"assets"/"energy"/"biogas"
ARCHIVE="https://www.glcgrimaldelli.com/category/biogas/"
SESSION=requests.Session()
SESSION.headers.update({"User-Agent":"Mozilla/5.0 (compatible; GrimaldelliArchiveMigration/1.0; +https://glcgrimaldelli.com/)",
                       "Accept":"text/html,image/avif,image/webp,image/jpeg,image/png,*/*"})

EXPECTED=[
 ("lupo-stanghellini","lupo-stanghellini","Chieve (CR)",300),
 ("rota-villanova","rota-villanova","Villanova del Sillaro (LO)",300),
 ("bianchessi","bianchessi","Castelgabbiano (CR)",300),
 ("rota-corte-palasio","rota-corte-palasio","Corte Palasio (LO)",300),
 ("campagnari","campagnari","Marmirolo (MN)",300),
 ("quarantore","quarantore","San Martino dall'Argine (MN)",249),
 ("balestrieri","balestrieri","San Daniele Po (CR)",300),
 ("bondenta","bondenta","Campagnola Cremasca (CR)",300),
]
def fetch(url,timeout=25):
    try:
        r=SESSION.get(url,timeout=timeout,allow_redirects=True)
        r.raise_for_status()
        return r
    except requests.RequestException as e:
        print("FETCH_ERROR",url,str(e),flush=True)
        return None

def posts_from_archive():
    r=fetch(ARCHIVE)
    if not r:return []
    soup=BeautifulSoup(r.text,"html.parser")
    links=[]
    for heading in soup.select("h1 a,h2 a,h3 a,h4 a,.entry-title a,.post-title a"):
        href=heading.get("href") or ""
        text=heading.get_text(" ",strip=True)
        if ("biogas" in text.lower() and "/20" in href) or ("biogas" in href.lower() and "/20" in href):
            url=urljoin(ARCHIVE,href)
            if urlparse(url).hostname=="www.glcgrimaldelli.com" and url not in links:
                links.append(url)
    print("ARCHIVE_POSTS",len(links),links,flush=True)
    return links

def main():
    links=posts_from_archive()
    if not links: return 3
    DEST.mkdir(parents=True,exist_ok=True)
    out=[]
    known=set()
    for url in links[:20]:
        r=fetch(url)
        if not r:continue
        soup=BeautifulSoup(r.text,"html.parser")
        h=soup.select_one("h1.entry-title,h1")
        title=h.get_text(" ",strip=True) if h else pathlib.PurePosixPath(urlparse(url).path).name
        matched=next((x for x in EXPECTED if x[1] in url.lower()),None)
        if not matched:
            print("UNMATCHED_SKIPPED",url,title,flush=True)
            continue
        slug,_,place,power=matched
        img_nodes=soup.select(".entry-content img,.post-content img,.td-post-content img,.single-post img,.wp-block-gallery img,article img")
        if not img_nodes:
            img_nodes=soup.select("img")
        candidates=[]
        for img in img_nodes:
            candidates_src=[img.get("data-large-file"),img.get("data-orig-file"),img.get("data-src"),img.get("data-lazy-src"),img.get("src")]
            parent=img.find_parent("a")
            if parent and parent.get("href") and re.search(r"\.(jpg|jpeg|png|webp)(\?|$)",parent["href"],re.I):
                candidates_src.insert(0,parent["href"])
            src=next((x for x in candidates_src if x and "data:image" not in x),None)
            if not src:continue
            src=urljoin(url,src)
            if urlparse(src).hostname not in ("www.glcgrimaldelli.com","glcgrimaldelli.com"):continue
            if not re.search(r"\.(jpg|jpeg|png|webp)(\?|$)",src,re.I):continue
            if re.search(r"(logo|icon|avatar|flag|footer|thumb|banner|favicon|placeholder)",src,re.I):continue
            if src not in candidates:candidates.append(src)
        project_dir=DEST/slug
        project_dir.mkdir(exist_ok=True)
        photos=[]
        for src in candidates[:24]:
            data=fetch(src,timeout=35)
            if not data or len(data.content)<14000:continue
            try:
                with Image.open(io.BytesIO(data.content)) as im:
                    im=ImageOps.exif_transpose(im)
                    if im.width<650 or im.height<430:continue
                    pix=im.convert("RGB")
                    digest=hashlib.sha256(pix.resize((64,64)).tobytes()).hexdigest()[:24]
                    if digest in known:continue
                    known.add(digest)
                    sharpness=ImageStat.Stat(pix.convert("L").filter(ImageFilter.FIND_EDGES)).stddev[0]
                    width,height=pix.size
                    pix.thumbnail((1700,1400))
                    output=io.BytesIO()
                    pix.save(output,"WEBP",quality=83,method=5)
                    blob=output.getvalue()
                    if len(blob)<15000:continue
                    path=project_dir/f"{len(photos)+1:02d}.webp"
                    path.write_bytes(blob)
                    photos.append({"path":str(path.relative_to(ROOT)).replace("\\","/"),
                                   "origin":src,"width":width,"height":height,
                                   "size":len(blob),"sharpness":round(sharpness,2)})
            except Exception as e:
                print("IMG_ERROR",slug,src,str(e),flush=True)
        if photos:
            photos.sort(key=lambda x:(min(x["width"],2200)*min(x["height"],1500)*(1+min(x["sharpness"],40)/200)),reverse=True)
            out.append({"id":slug,"name":title,"place":place,"declared_plant_power_kw":power,
                        "source":url,"images":photos})
        print("PROJECT",slug,"PHOTOS",len(photos),flush=True)
    manifest={"archive":ARCHIVE,"note":"Plant capacities from historical Grimaldelli posts; not evidence of EPC/entire-plant supply","projects":out}
    (DEST/"manifest.json").write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    print("RESULT_PROJECTS",len(out),"RESULT_IMAGES",sum(len(x["images"]) for x in out),flush=True)
    return 0 if len(out)>=3 and sum(len(x["images"]) for x in out)>=6 else 2

if __name__=="__main__":
    sys.exit(main())
