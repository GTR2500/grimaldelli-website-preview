#!/usr/bin/env python3
"""Select genuine public historical photovoltaic project pictures from Grimaldelli's legacy website."""
from __future__ import annotations
import io,json,pathlib,re,sys,hashlib
from urllib.parse import urljoin,urlparse
import requests
from bs4 import BeautifulSoup
from PIL import Image,ImageOps

ROOT=pathlib.Path(__file__).resolve().parents[1]
DEST=ROOT/"assets"/"energy"/"photovoltaic"
BASE="https://www.glcgrimaldelli.com"
ARCHIVE=BASE+"/category/fotovoltaico/"
session=requests.Session()
session.headers["User-Agent"]="Mozilla/5.0 (compatible; GrimaldelliWebsiteMigration/1.0)"
def fetch(url):
 try:
  r=session.get(url,timeout=29);r.raise_for_status();return r
 except Exception as e:
  print("FETCH_ERROR",url,str(e),flush=True);return None

def clean_slug(url):
 return re.sub(r"[^a-z0-9-]","",urlparse(url).path.strip("/").split("/")[-1].lower())[:75]

def find_posts(url):
 r=fetch(url)
 if not r:return []
 soup=BeautifulSoup(r.text,"html.parser")
 found=[]
 for a in soup.select("h1 a,h2 a,h3 a,h4 a,.entry-title a,.post-title a"):
  title=a.get_text(" ",strip=True)
  href=urljoin(url,a.get("href",""))
  if ("fotovoltaic" in title.lower() or "fotovoltaic" in href.lower()) and "/20" in href:
   if urlparse(href).hostname in ("www.glcgrimaldelli.com","glcgrimaldelli.com") and href not in found:found.append(href)
 print("ARCHIVE_SOLAR_LINKS",len(found),found,flush=True)
 return found

def gather(url):
 r=fetch(url)
 if not r:return None
 soup=BeautifulSoup(r.text,"html.parser")
 h=soup.select_one("h1.entry-title,h1")
 title=h.get_text(" ",strip=True) if h else ""
 slug=clean_slug(url)
 if not title or "fotovoltaic" not in title.lower() or not slug:return None
 km=re.search(r"(\d+(?:[,.]\d+)?)\s*kW",title,re.I)
 capacity=km.group(1).replace(",",".")+" kW" if km else ""
 targets=[]
 for im in soup.select(".entry-content img,.post-content img,.td-post-content img,.single-post img,.wp-block-gallery img,article img"):
  cand=[]
  parent=im.find_parent("a")
  if parent and parent.get("href"):cand.append(parent["href"])
  cand.extend(im.get(x) for x in ["data-large-file","data-orig-file","data-src","src"])
  for src in cand:
   if not src or not re.search(r"\.(jpg|jpeg|png|webp)(\?|$)",src,re.I):continue
   full=urljoin(url,src)
   if urlparse(full).hostname not in ("www.glcgrimaldelli.com","glcgrimaldelli.com"):continue
   if re.search(r"logo|icon|flag|thumb|avatar|footer|icon|banner|placeholder",full,re.I):continue
   if full not in targets:targets.append(full)
   break
 if not targets:
  print("NO_IMAGE_CANDIDATES",url,flush=True)
  return None
 folder=DEST/slug;folder.mkdir(parents=True,exist_ok=True)
 pics=[];hashes=set()
 for src in targets[:20]:
  response=fetch(src)
  if not response or len(response.content)<15000:continue
  try:
   with Image.open(io.BytesIO(response.content)) as im:
    im=ImageOps.exif_transpose(im)
    if im.width<650 or im.height<420:continue
    pix=im.convert("RGB")
    digest=hashlib.sha256(pix.resize((48,48)).tobytes()).hexdigest()[:20]
    if digest in hashes:continue
    hashes.add(digest)
    w,h=pix.size
    pix.thumbnail((1600,1300))
    output=io.BytesIO();pix.save(output,format="WEBP",quality=83,method=5)
    data=output.getvalue()
    if len(data)<14000:continue
    fname=folder/f"{len(pics)+1:02}.webp";fname.write_bytes(data)
    pics.append({"path":fname.relative_to(ROOT).as_posix(),"origin":src,"width":w,"height":h,"bytes":len(data)})
  except Exception as e:
   print("PHOTO_ERROR",str(e),src)
 if not pics:return None
 pics.sort(key=lambda x:(min(x["width"],2200)*min(x["height"],1500)),reverse=True)
 # Only up to five editorial options per project; keep archive first party and lean
 pics=pics[:5]
 return {"id":slug,"name":title,"capacity":capacity,"source":url,"images":pics}

def main():
 urls=find_posts(ARCHIVE)
 if not urls:return 3
 DEST.mkdir(parents=True,exist_ok=True)
 projects=[]
 for url in urls[:16]:
  item=gather(url)
  if item:projects.append(item)
  print("SOLAR_PROGRESS",len(projects),len(urls),flush=True)
 manifest={"archive":ARCHIVE,"projects":projects,"note":"Public Grimaldelli archive, nameplate capacity as stated in article title; verify work scope separately."}
 (DEST/"manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
 print("SOLAR_RESULT",len(projects),sum(len(x["images"]) for x in projects),flush=True)
 return 0 if len(projects)>=2 and sum(len(x["images"]) for x in projects)>=4 else 2
if __name__=="__main__":sys.exit(main())
