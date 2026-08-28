# tdaimarketing.hu — 3D / WebGL főoldal (SEO + AEO átírással)

Prémium, teljesen 3D-s főoldal a TD-AI & Marketing márkához. Egyetlen HTML fájl + helyi assetek,
külső CDN-hívás nélkül. A tartalom a `.claude/product-marketing-context.md` és a
`td-ai-marketing-brand` skill hivatalos adataiból készült — **kitalált szám, vélemény,
ügyfélszám és értékelés nincs benne**.

## Fájlok

```
docs/tdaimarketing-3d/
├── index.html                     ← a teljes oldal (inline CSS + JS)
├── llms.txt                       ← AI crawlereknek (ChatGPT, Perplexity, Claude…)
├── robots.txt                     ← AI botok explicit engedélyezésével
├── sitemap.xml
└── assets/
    ├── three.module.min.js        ← three.js r160 helyben (MIT), csak a Gépezet szekcióhoz
    ├── THREE-LICENSE.txt
    └── fonts/                     ← Inter + Playfair Display woff2, latin ÉS latin-ext (ő, ű)
```

---

## 1. SEO / AEO

**Kulcsszó-struktúra.** A H1 most a fő kulcsszót viszi („Marketing ügynökség KKV-knak, ami
ajánlatkérést hoz — nem csak kattintást"), a korábbi márkahook („Nem kattintást veszünk.
Ügyfelet építünk.") közvetlenül alatta, nagy szedéssel maradt meg. A H2-k kulcsszavasak:
*Mit tartalmaz az ügyfélszerző rendszer?* · *Mennyibe kerül egy marketing ügynökség?* ·
*Hogyan dolgozunk?* · *Helyi SEO és Google Cégprofil Debrecenben* · *Gyakori kérdések*.

**AEO — hogy az AI keresők idézzenek.** Négy eszköz:

| Eszköz | Hol |
|---|---|
| **Answer-first bekezdés** — az első 40–60 szó önmagában is teljes, idézhető válasz, számmal az első mondatban | minden fő szekció elején (`.answer` blokk) |
| **10 kérdéses GYIK** kérdés-formájú címekkel, a válasz a DOM-ban (nem `display:none`) | `#gyik` |
| **Gyors adatlap** `<dl>` szemantikával — cég, székhely, szolgáltatások, árak, terület, elérhetőség | `#adatlap` |
| **`llms.txt`** strukturált cégösszefoglaló AI crawlereknek | gyökér |

**Schema.org.** ProfessionalService/MarketingAgency/LocalBusiness (`@graph`-ban) + Person
(Tóth Dániel) + WebSite + BreadcrumbList + 5 külön Service entitás + OfferCatalog az árakkal,
valamint egy önálló **FAQPage** blokk mind a 10 kérdéssel.
`AggregateRating` és `Review` **szándékosan nincs** — valós értékelési adat hiányában
hamis csillag lenne, amit a Google kézi büntetéssel sújt.

**Person `sameAs` kiegészítendő**: a JSON-LD-ben a Tóth Dániel entitáshoz érdemes felvenni a
LinkedIn / Facebook / Google Cégprofil URL-t (`"sameAs":[...]`) — enélkül az entitás-összekötés
fele hatástalan.

---

## 2. Teljesítmény (Core Web Vitals)

A sok 3D pont a CWV ellen dolgozna, ezért:

- **A hero háttere nyers WebGL** (~4 KB inline shader), *nem* three.js — semmi nem blokkolja az LCP-t.
- **A three.js (656 KB) csak lusta betöltésű**: `IntersectionObserver` indítja, amikor a látogató
  a Gépezet szekció 400 px-es közelébe ér. Aki odáig nem görget, le sem tölti.
- **Betűtípusok önhosztolva** (`assets/fonts/`) — nincs Google Fonts kérés: gyorsabb LCP és
  GDPR-barát (nem megy IP a Google felé). A két kritikus fájl `<link rel="preload">`-dal.
- **Favicon inline SVG data URI** — nulla extra kérés.
- Minden görgetéshez kötött számítás **egyetlen `requestAnimationFrame` ciklusban**; a WebGL
  háttérfülön és a nézeten kívül nem renderel; `devicePixelRatio` 2-re vágva; mobilon 900 részecske 2200 helyett.

---

## 3. A 3D elemek

| Elem | Technika |
|---|---|
| **„A GÉPEZET" — sticky építő szekció** | 340vh scroll, three.js. A görgetés fokozatosan behozza az 5 modult, kirajzolja a vezetéket (`TubeGeometry` + `setDrawRange`), elindítja az áramló részecskéket a görbén, a **Mérés** modulnál szürkéről aranyra vált a részecskék színe, az 5. lépésnél megjelenik a visszacsatoló hurok, a végén a kamera kihátrál és felizzik az „Ajánlatkérés". A feliratok 3D pontokra vetített HTML elemek. Visszafelé görgetve visszabomlik. |
| **A gépezet 7 tárgya** | Nincs két egyforma elem — mindegyik a saját szövegéhez kapcsolódik: **Kattintás** = szürke gömb, ami folyamatosan hullatja magából a port · **Üzenet** = élesre csiszolt kristály (oktaéder) keringő szikrákkal · **Landing oldal** = mini oldal-panel pulzáló arany CTA gombbal · **Hirdetés** = sugárzó torony terjedő hullámgyűrűkkel · **Mérés** = 3D oszlopdiagram emelkedő trendvonallal · **Utánkövetés** = chat buborék gépelő pöttyökkel, körülötte futó automatizáció-gyűrűvel · **Ajánlatkérés** = arany boríték, ami a végén felizzik. Mind procedurális geometria, nulla modellfájl. |
| **Hero háttér** | Nyers WebGL: 2200 arany pont saját GLSL shaderrel, additív blending, 2 gyűrű `LINE_LOOP`-pal. A scroll forgatja, viszi befelé a kamerát és halványítja. |
| **Kattintás → ajánlatkérés tölcsér** | 2D canvas részecskeszimuláció CSS 3D dőléssel; kapcsolóval „mérés nélkül / méréssel" nézet. Illusztráció, nem konkrét ügyfélszám. |
| **3D Magyarország-térkép** | Extrudált SVG kontúr CSS 3D-ben, Debrecenből induló hullámokkal, 8 nagyvárossal — a helyi SEO szekció fejléce. |
| **Interaktív mini-audit** | 3 kérdés → a rendszer 5 modulja 3D-ben kigyullad (zöld = van, piros = hiányzik, halvány = 3 kérdésből nem megítélhető), személyre szabott eredményszöveggel. Az eredmény rejtett mezőként az űrlappal is elmegy. |
| **Szakasz-dramaturgia a gépezetben** | Minden elemnek saját **kameramozgása** van, nem csak eltolása: a kristálynál lassú körbejárás, a landingnél oldalról becsúszás, a sugárzó toronynál alulról felnéző szög, a diagramnál az oszlopokkal együtt emelkedő rálátás, a chatnél lassú oldalsodródás — mindegyikhez finom kameradőléssel, sima átadással a következő szakasznak. |
| **Hangulat és fénypor** | Szakaszonként más a **vignetta** és a jelenet **fénypora** (300 lebegő szemcse, ami folyamatosan a szakasz színére hangolódik): szürke → hűvösebb arany → arany → meleg narancs → zöldes-arany → hűvös kék → meleg, telített arany. |
| **Részecske-dramaturgia** | A kattintás-pöttyök a Mérés modul után **rövid vonásokká** válnak („mért adat", saját sprite-textúrával) · mérés nélkül a részecskék **34%-a leszakad és lehullik**, pirosan elhalványodva · minden modul **felvillan**, amikor részecske halad át rajta. |
| **Előtte / utána osztott képernyő** | Sticky szekció, ahol a görgetés balról jobbra tolja a választóvonalat: ugyanaz a négy kérdés, de a válaszok „???"-ből valódi válaszokká fordulnak át. |
| **Prémium finish** | Csiszolt arany **monogram-lap** a heróban (forgó conic-gradient „fém" + végigfutó fényvisszaverődés) · **oldalbelépő kameramozgás** (blur + scale feloldás a preloader után) · **mágneses CTA gombok** (a kurzor felé húznak) · **Z-tengelyről berepülő árkártyák** · **számláló** a stat sávon (csak valós adatokon: 80 000 Ft, 14 nap, 5 elem) · **arany fólia hullám** betűnként a záró címen · TD-monogram preloader, szavankénti 3D címbelépés, kurzort követő fényfolt, görgetés-sín, tilt kártyák, CSS 3D kocka, GYIK ajtónyitás. |

---

## 4. Hozzáférhetőség és degradáció

- `prefers-reduced-motion: reduce` esetén **a WebGL el sem indul**, a preloader kimarad, a sticky
  építő szekció pedig sima, olvasható szöveglistává alakul — a tartalom mindkét módban a DOM-ban van.
- Ha nincs WebGL vagy nem tölt be a three.js: a hero CSS „aurora" háttérre esik vissza, a Gépezet
  szekció pedig szöveges összefoglalót mutat.
- GYIK gombok `aria-expanded`-del, a modulállapot `aria-live` régióban.
- Ellenőrizve valódi Chromiumban 390 px és 1440 px szélességen: nincs JS hiba, nincs vízszintes görgetés.

---

## 5. Élesítés előtt — teendők

1. **Make.com webhook**: az `index.html` végén, a form JS-ében kommentben ott a `fetch(...)` blokk.
   Cseréld a `https://hook.eu2.make.com/AZ_EN_WEBHOOK_AZONOSITOM` URL-t a saját scenario URL-edre,
   vedd ki kommentből, és töröld alatta a demó `setTimeout` blokkot.
2. **Képek**: az oldalon jelenleg nincs fotó. A brand-skill kimondja, hogy hero kép nélkül nem
   épül landing — a 3D vizuál most ezt helyettesíti. Az **OG kép** (`assets/og-tdai-3d.jpg`,
   1200×630) és egy **portré rólad** (E-E-A-T) viszont kellene.
3. **`sameAs` linkek** a JSON-LD-be: LinkedIn, Facebook oldal, Google Cégprofil URL.
4. **`llms.txt`, `robots.txt`, `sitemap.xml`** a domain gyökerébe kerül, nem almappába.

## Feltöltés (Rackhost)

```
public_html/
├── index.html
├── llms.txt · robots.txt · sitemap.xml
└── assets/  (three.module.min.js + fonts/)
```

Az `assets/` mappának az `index.html` mellett kell lennie — relatív útvonalon hivatkozik rá.
Ha nem a főoldalt cseréled, a `<link rel="canonical">` és a JSON-LD URL-eket is írd át.

## Helyi megnyitás

A three.js ES modulként töltődik, ezért `file://`-ből nem indul el (CORS) — kis szerver kell:

```bash
cd docs/tdaimarketing-3d && python3 -m http.server 8777   # → http://localhost:8777
```

`file://`-ből is működik az oldal, csak a Gépezet szekció esik szöveges fallbackre.
