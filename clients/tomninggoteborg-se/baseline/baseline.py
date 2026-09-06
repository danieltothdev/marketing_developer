#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Alapallapot-felmeres a tomninggoteborg.se statikus oldalhoz.
Minden indexelheto HTML oldalrol rogziti azokat a jeleket, amiket egy
kesobbi modositas elronthat. A kimenet a 'before' allapot: barmilyen
regressziot ossze lehet vele vetni.
"""
import json, re, html, sys
from pathlib import Path

ROOT = Path("/home/user/marketing_developer/clients/tomninggoteborg-se/site")
SKIP_DIRS = {"minta-oldalak-forrás", "src", "supabase", "scripts", "assets"}

def rel_url(p: Path) -> str:
    r = p.relative_to(ROOT).as_posix()
    if r == "index.html":
        return "/"
    if r.endswith("/index.html"):
        return "/" + r[: -len("index.html")]
    return "/" + r[: -len(".html")]

def text_of(raw: str) -> str:
    s = re.sub(r"(?is)<(script|style|nav|footer|head)\b.*?</\1>", " ", raw)
    s = re.sub(r"(?s)<[^>]+>", " ", s)
    return html.unescape(s)

def one(tag_re: str, raw: str):
    m = re.search(tag_re, raw, re.I | re.S)
    return html.unescape(m.group(1)).strip() if m else None

def analyse(p: Path) -> dict:
    raw = p.read_text(encoding="utf-8", errors="replace")
    body = text_of(raw)

    h1 = re.findall(r"(?is)<h1[^>]*>(.*?)</h1>", raw)
    h2 = re.findall(r"(?is)<h2[^>]*>(.*?)</h2>", raw)
    strip = lambda x: re.sub(r"\s+", " ", re.sub(r"(?s)<[^>]+>", "", html.unescape(x))).strip()

    # JSON-LD blokkok kiolvasasa + ervenyesseg
    schemas, bad = [], []
    for blk in re.findall(
        r'(?is)<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', raw
    ):
        try:
            data = json.loads(blk)
        except json.JSONDecodeError as e:
            bad.append(str(e))
            continue
        for node in data if isinstance(data, list) else [data]:
            for g in node.get("@graph", [node]) if isinstance(node, dict) else []:
                if isinstance(g, dict) and g.get("@type"):
                    t = g["@type"]
                    schemas += t if isinstance(t, list) else [t]

    internal = set()
    for href in re.findall(r'(?is)<a\b[^>]*href=["\']([^"\']+)["\']', raw):
        if href.startswith("/") or href.startswith("tomninggoteborg.se"):
            internal.add(href.split("#")[0].split("?")[0])

    hreflang = re.findall(
        r'(?is)<link[^>]+rel=["\']alternate["\'][^>]*hreflang=["\']([^"\']+)["\']', raw
    )

    return {
        "url": rel_url(p),
        "file": p.relative_to(ROOT).as_posix(),
        "lang": "en" if p.relative_to(ROOT).as_posix().startswith("en/") else "sv",
        "title": one(r"<title[^>]*>(.*?)</title>", raw),
        "title_len": len(one(r"<title[^>]*>(.*?)</title>", raw) or ""),
        "meta_description": one(
            r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']', raw
        ),
        "canonical": one(
            r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\'](.*?)["\']', raw
        ),
        "h1_count": len(h1),
        "h1": [strip(x) for x in h1],
        "h2": [strip(x) for x in h2],
        "word_count": len(body.split()),
        "schema_types": sorted(set(schemas)),
        "schema_errors": bad,
        "internal_links": len(internal),
        "hreflang": sorted(set(hreflang)),
        "has_ga4": "G-S9PHES7BKQ" in raw,
        "has_form": "data-offert-form" in raw,
        "noindex": bool(re.search(r'(?is)<meta[^>]+name=["\']robots["\'][^>]*noindex', raw)),
    }

pages = []
for p in sorted(ROOT.rglob("*.html")):
    if any(part in SKIP_DIRS for part in p.relative_to(ROOT).parts[:-1]):
        continue
    if p.relative_to(ROOT).parts[0] in SKIP_DIRS:
        continue
    pages.append(analyse(p))

out = Path(sys.argv[1])
out.write_text(json.dumps(pages, ensure_ascii=False, indent=1), encoding="utf-8")

# --- osszefoglalo a terminalra ---
sv = [x for x in pages if x["lang"] == "sv"]
en = [x for x in pages if x["lang"] == "en"]
print(f"Oldalak osszesen: {len(pages)}  (SV {len(sv)} / EN {len(en)})")

titles = {}
descs = {}
for x in pages:
    titles.setdefault(x["title"], []).append(x["url"])
    descs.setdefault(x["meta_description"], []).append(x["url"])

def report(name, cond):
    hits = [x["url"] for x in pages if cond(x)]
    flag = "!!" if hits else "ok"
    print(f"[{flag}] {name}: {len(hits)}")
    for u in hits[:6]:
        print(f"       {u}")
    if len(hits) > 6:
        print(f"       ... +{len(hits)-6}")

report("hianyzo title", lambda x: not x["title"])
report("hianyzo meta description", lambda x: not x["meta_description"])
report("hianyzo canonical", lambda x: not x["canonical"])
report("nem pontosan 1 db H1", lambda x: x["h1_count"] != 1)
report("hibas JSON-LD", lambda x: x["schema_errors"])
report("nincs GA4 tag", lambda x: not x["has_ga4"])
report("noindex", lambda x: x["noindex"])
report("300 szo alatt", lambda x: x["word_count"] < 300)
report("hianyzo hreflang par", lambda x: len(x["hreflang"]) < 2)

dup_t = {k: v for k, v in titles.items() if k and len(v) > 1}
dup_d = {k: v for k, v in descs.items() if k and len(v) > 1}
print(f"[{'!!' if dup_t else 'ok'}] duplikalt title: {len(dup_t)}")
for k, v in list(dup_t.items())[:5]:
    print(f"       {v}  <- {k[:60]}")
print(f"[{'!!' if dup_d else 'ok'}] duplikalt meta description: {len(dup_d)}")
for k, v in list(dup_d.items())[:5]:
    print(f"       {v}")

print(f"\nSV szoszam osszesen: {sum(x['word_count'] for x in sv)}")
print(f"Atlag SV szoszam:    {sum(x['word_count'] for x in sv)//max(len(sv),1)}")
print(f"Belso link/oldal:    {sum(x['internal_links'] for x in pages)//max(len(pages),1)}")
print(f"\nMentve: {out}")
