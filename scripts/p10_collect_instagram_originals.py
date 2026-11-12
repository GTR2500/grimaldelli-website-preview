#!/usr/bin/env python3
"""One-off acquisition of public, company-owned Grimaldelli Instagram media.
Collect real media bytes only; never create placeholder photos or remote embeds.
"""
from __future__ import annotations
import json
import os
import pathlib
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone

ROOT=pathlib.Path(__file__).resolve().parents[1]
DEST=ROOT/"assets"/"instagram"
SOURCES=[
  ("biloni","DfnCdbEIRz8","p"),
  ("cadilana","DfiO5WDOkg9","reel"),
  ("bosetti","Cs5KMF3Ivcp","reel"),
  ("franciosi","CddN6WFKW2H","p"),
  ("risaia","CcXNY82K4dd","p"),
  ("nisoli","CvrdB_ionuY","p"),
  ("ginelli","CvrJrWbItUF","p"),
]
IMG_EXT={".jpg",".jpeg",".png",".webp"}
VIDEO_EXT={".mp4",".mov",".mkv",".webm"}

def execute(cmd,timeout=100):
    try:
        r=subprocess.run(cmd,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True,
                         errors="replace",timeout=timeout)
        print("COMMAND",cmd[0], "status",r.returncode, "output_tail",r.stdout[-2600:],flush=True)
        return r.returncode==0
    except Exception as e:
        print("COMMAND_ERROR",str(e),flush=True)
        return False

def get_media_path(dest_file):
    return "/"+str(dest_file.relative_to(ROOT)).replace(os.sep,"/")

def optimize_photo(src,dst):
    try:
        from PIL import Image,ImageOps
        with Image.open(src) as im:
            im=ImageOps.exif_transpose(im)
            im.thumbnail((1600,1600))
            im=im.convert("RGB")
            im.save(dst,format="WEBP",quality=82,method=5)
        return dst.exists() and dst.stat().st_size>1000
    except Exception as e:
        print("PHOTO_ERROR",src,str(e),flush=True)
        return False

def optimize_video(src,dst):
    args=["ffmpeg","-y","-hide_banner","-loglevel","error","-i",str(src),
          "-map","0:v:0","-map","0:a:0?","-vf","scale='min(1280,iw)':-2",
          "-c:v","libx264","-preset","medium","-crf","27","-pix_fmt","yuv420p",
          "-c:a","aac","-b:a","96k","-movflags","+faststart","-t","90",str(dst)]
    if not execute(args,timeout=240):
        return False
    return dst.exists() and dst.stat().st_size>10000

def video_poster(src,dst):
    return execute(["ffmpeg","-y","-hide_banner","-loglevel","error","-ss","00:00:01",
              "-i",str(src),"-frames:v","1","-vf","scale='min(1280,iw)':-2",
              "-quality","85",str(dst)],timeout=45)

def collect(slug, shortcode, kind, scratch):
    url=f"https://www.instagram.com/{kind}/{shortcode}/"
    folder=scratch/slug
    folder.mkdir(parents=True,exist_ok=True)
    template=str(folder/"%(autonumber)03d-%(id)s.%(ext)s")
    execute(["yt-dlp","--no-warnings","--ignore-errors","--no-check-certificates",
              "--socket-timeout","20","--retries","1","--fragment-retries","1",
              "--playlist-end","12","--write-thumbnail",
              "--add-header","Referer:https://www.instagram.com/",
              "--user-agent","Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/130 Safari/537.36",
              "-o",template,url],timeout=170)
    media=[p for p in folder.rglob("*") if p.is_file() and p.suffix.lower() in IMG_EXT|VIDEO_EXT]
    if not media:
        print("FALLBACK_INSTALOADER",slug,flush=True)
        try:
            import instaloader
            loader=instaloader.Instaloader(download_videos=True,download_video_thumbnails=True,
                 download_geotags=False,save_metadata=False,compress_json=False,
                 download_comments=False,quiet=True,filename_pattern="{shortcode}_{date_utc}")
            import os
            cwd=os.getcwd()
            os.chdir(scratch)
            try:
                post=instaloader.Post.from_shortcode(loader.context,shortcode)
                if post.owner_username.lower() != "grimaldellisrl":
                    print("OWNER_MISMATCH",slug,post.owner_username,flush=True)
                    return None
                loader.download_post(post,target=slug)
            finally:
                os.chdir(cwd)
        except Exception as e:
            print("INSTALOADER_ERROR",slug,str(e),flush=True)
        media=[p for p in folder.rglob("*") if p.is_file() and p.suffix.lower() in IMG_EXT|VIDEO_EXT]
    media=sorted(media, key=lambda p:(p.suffix.lower() not in VIDEO_EXT,str(p)))
    if not media:
        print("NO_MEDIA",slug,url,flush=True)
        return None
    target=DEST/slug
    target.mkdir(parents=True,exist_ok=True)
    imgs=[];vids=[]
    for index,p in enumerate(media[:14],1):
        if p.stat().st_size<512:
            continue
        if p.suffix.lower() in VIDEO_EXT:
            dst=target/f"clip-{len(vids)+1:02}.mp4"
            if optimize_video(p,dst):
                vids.append(get_media_path(dst))
                poster=target/f"poster-{len(vids):02}.webp"
                temp=target/f"poster-{len(vids):02}.jpg"
                if video_poster(dst,temp) and optimize_photo(temp,poster):
                    imgs.append(get_media_path(poster))
                temp.unlink(missing_ok=True)
        else:
            dst=target/f"image-{len(imgs)+1:02}.webp"
            if optimize_photo(p,dst):
                imgs.append(get_media_path(dst))
    if not imgs and not vids:
        shutil.rmtree(target,ignore_errors=True)
        print("EMPTY_AFTER_OPTIMIZATION",slug,flush=True)
        return None
    print("MEDIA_COLLECTED",slug,len(imgs),"photos",len(vids),"videos",flush=True)
    return {"id":slug,"source":url,"images":imgs[:10],"videos":vids[:3]}

def main():
    DEST.mkdir(parents=True,exist_ok=True)
    manifest={"source":"Grimaldelli official Instagram","media":[]}
    with tempfile.TemporaryDirectory(prefix="p10-instagram-") as name:
        for slug,shortcode,kind in SOURCES:
            result=collect(slug,shortcode,kind,pathlib.Path(name))
            if result: manifest["media"].append(result)
    (DEST/"manifest.json").write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    print("MANIFEST",json.dumps(manifest,ensure_ascii=False),flush=True)
    return 0 if manifest["media"] else 2

if __name__=="__main__":
    sys.exit(main())
