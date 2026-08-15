#!/usr/bin/env python3
"""
AI Act célpont-szkenner — TD-AI & Marketing

Végigmegy egy domain-listán, és megnézi, találhatók-e chatbot / AI widget
nyomai a nyilvános kezdőlapon. Ebből áll össze a hívólistád: akinél van
chatbot, az potenciális AI Act audit ügyfél.

FONTOS KORLÁT — olvasd el:
  A chat widgetek nagy része JavaScripttel töltődik be, ezért a kötelező
  AI-jelzés MEGLÉTÉT ez a szkript NEM tudja megállapítani. Amit megállapít:
  VAN-E chatbot egyáltalán. A jelzést utána neked kell ellenőrizned —
  megnyitod a chatet, és megnézed, kiírja-e az elején, hogy AI. 30 másodperc
  oldalanként, és csak azoknál, amiket a szkript megjelöl.

Használat:
    python3 chatbot_scan.py domainek.txt -o eredmeny.csv
    python3 chatbot_scan.py domainek.txt -o eredmeny.csv --delay 2

A bemeneti fájl soronként egy domaint tartalmaz (http:// nélkül is jó):
    pelda.hu
    masik-ceg.hu

Csak nyilvános kezdőlapot kér le, tiszteletben tartja a robots.txt-t,
és alapból 1,5 másodpercet vár két kérés között. Ne vedd le a késleltetést.

Nincs függősége — sima python3 kell hozzá, semmi pip install.
"""

import argparse
import csv
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import urllib.robotparser

UA = "TDAI-AIAct-Scanner/1.0 (+https://tdaimarketing.hu; admin@tdaimarketing.com)"

# Ismert chat / chatbot szolgáltatók script-lenyomatai.
VENDORS = {
    "Tawk.to": ["embed.tawk.to"],
    "Smartsupp": ["smartsuppchat.com", "smartsupp.com"],
    "Crisp": ["client.crisp.chat"],
    "Intercom": ["widget.intercom.io", "intercomcdn.com"],
    "Tidio": ["code.tidio.co", "tidio.co"],
    "LiveChat": ["cdn.livechatinc.com"],
    "Chatra": ["call.chatra.io"],
    "HubSpot": ["js.hs-scripts.com", "js.usemessages.com"],
    "Zendesk": ["static.zdassets.com", "ekr.zdassets.com"],
    "Freshchat": ["wchat.freshchat.com", "freshchat.com"],
    "Drift": ["js.driftt.com"],
    "Olark": ["static.olark.com"],
    "Userlike": ["userlike.com"],
    "Kommunicate": ["kommunicate.io"],
    "ManyChat": ["mccdn.me", "manychat.com"],
    "Messenger plugin": ["fb-customerchat", "fb-customer-chat"],
    "Landbot": ["static.landbot.io"],
    "Botpress": ["cdn.botpress.cloud", "botpress.com"],
    "Voiceflow": ["cdn.voiceflow.com"],
    "Chatbase": ["chatbase.co"],
    "Typebot": ["typebot.io"],
    "Egyedi widget": ["chat-widget", "chatwidget", "chatbot.js", "ai-assistant"],
}

# AI-használatra utaló szövegek (nem bizonyíték, csak jelzés).
AI_HINTS = [
    "mesterséges intelligencia", "mesterseges intelligencia", "ai asszisztens",
    "ai chatbot", "ai ügyfélszolgálat", "ai-alapú", "ai alapú", "openai",
    "chatgpt", "gpt-4", "gpt-5", "claude", "gemini", "virtuális asszisztens",
]

# Jelzés-szerű szövegek. Ha ezek megvannak a statikus HTML-ben, az JÓ JEL,
# de a hiányuk NEM jelenti, hogy nincs jelzés (a widget dinamikusan tölt).
DISCLOSURE_HINTS = [
    "mesterséges intelligencia válaszol", "automatikus válasz", "nem élő ügyintéző",
    "chatbot vagyok", "virtuális asszisztens vagyok", "ez egy ai",
    "ai asszisztenssel beszélsz", "ai asszisztenssel beszél",
    "this is an ai", "you are chatting with an ai", "automated assistant",
]


def normalize(domain):
    d = domain.strip().lower()
    if not d or d.startswith("#"):
        return None
    d = re.sub(r"^https?://", "", d).rstrip("/")
    return d


def robots_allows(base):
    """True, ha a robots.txt engedi a kezdőlap lekérését (hiba esetén True)."""
    rp = urllib.robotparser.RobotFileParser()
    rp.set_url(base + "/robots.txt")
    try:
        rp.read()
    except Exception:
        return True
    try:
        return rp.can_fetch(UA, base + "/")
    except Exception:
        return True


def fetch(url, timeout=15):
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "hu,en;q=0.8",
    })
    with urllib.request.urlopen(req, timeout=timeout) as r:
        raw = r.read(1_500_000)
        charset = r.headers.get_content_charset() or "utf-8"
        return raw.decode(charset, errors="replace")


def scan_one(domain, timeout):
    row = {
        "domain": domain, "status": "", "chatbot": "", "vendor": "",
        "ai_jel": "", "jelzes_a_htmlben": "", "pontszam": 0, "megjegyzes": "",
    }
    base = "https://" + domain

    if not robots_allows(base):
        row["status"] = "robots.txt tiltja"
        row["megjegyzes"] = "kihagyva"
        return row

    html = None
    for url in (base, "http://" + domain):
        try:
            html = fetch(url, timeout)
            row["status"] = "OK"
            break
        except urllib.error.HTTPError as e:
            row["status"] = "HTTP %s" % e.code
        except Exception as e:
            row["status"] = type(e).__name__

    if html is None:
        return row

    low = html.lower()

    found = [name for name, sigs in VENDORS.items() if any(s in low for s in sigs)]
    row["vendor"] = ", ".join(found)
    row["chatbot"] = "IGEN" if found else "nem látszik"

    ai = [h for h in AI_HINTS if h in low]
    row["ai_jel"] = "IGEN (%d)" % len(ai) if ai else "nem"

    disc = [d for d in DISCLOSURE_HINTS if d in low]
    row["jelzes_a_htmlben"] = "talán (%s)" % disc[0] if disc else "nem látszik"

    # Pontszám: minél magasabb, annál jobb célpont.
    score = 0
    if found:
        score += 5
    if ai:
        score += min(len(ai), 3)
    if found and not disc:
        score += 2
    row["pontszam"] = score

    if found and not disc:
        row["megjegyzes"] = "ELLENŐRIZD KÉZZEL: nyisd meg a chatet, kiírja-e, hogy AI"
    elif found and disc:
        row["megjegyzes"] = "van chatbot, és van jelzésre utaló szöveg — nézd meg élőben"
    elif ai:
        row["megjegyzes"] = "AI-t emleget, de widget nem látszik — tartalomjelölés lehet a téma"

    return row


def main():
    ap = argparse.ArgumentParser(description="AI Act célpont-szkenner")
    ap.add_argument("input", help="domainek.txt — soronként egy domain")
    ap.add_argument("-o", "--output", default="ai-act-celpontok.csv")
    ap.add_argument("--delay", type=float, default=1.5, help="várakozás kérések közt (mp)")
    ap.add_argument("--timeout", type=float, default=15)
    args = ap.parse_args()

    with open(args.input, encoding="utf-8") as f:
        domains = [d for d in (normalize(x) for x in f) if d]

    if not domains:
        print("Nincs feldolgozható domain a fájlban.", file=sys.stderr)
        return 1

    print("%d domain szkennelése...\n" % len(domains))
    rows = []
    for i, d in enumerate(domains, 1):
        row = scan_one(d, args.timeout)
        rows.append(row)
        print("[%3d/%d] %-34s %-12s %-11s %s" % (
            i, len(domains), d, row["status"], row["chatbot"], row["vendor"]))
        if i < len(domains):
            time.sleep(args.delay)

    rows.sort(key=lambda r: r["pontszam"], reverse=True)

    with open(args.output, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    hits = [r for r in rows if r["chatbot"] == "IGEN"]
    print("\n" + "=" * 62)
    print("Kész: %s" % args.output)
    print("Chatbot találat: %d / %d domain" % (len(hits), len(rows)))
    print("\nEz a hívólistád. A jelzés meglétét kézzel ellenőrizd:")
    print("nyisd meg a chatet, és nézd meg, kiírja-e az elején, hogy AI.")
    print("=" * 62)
    return 0


if __name__ == "__main__":
    sys.exit(main())
