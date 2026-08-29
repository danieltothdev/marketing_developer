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

## 1a. Márkajel és interaktivitás

**3D életfa embléma.** A heróban a kalkulátor fölött pecsétként ül egy életfa-embléma, amit **8 egymás mögé rétegzett SVG** ad ki: a hátsó rétegek sötétebb aranyak, az elsők világosabbak, így valódi kiemelt fém hatása van. Lassan billeg, egérre dől, végigfut rajta egy fényvisszaverődés. Ugyanez a jel került a fejléc logójába és a preloaderbe.

> **A saját logód átveszi a helyét.** Tedd be a fájlt `assets/logo.svg` (vagy `assets/logo.png`) néven az `index.html` mellé — az oldal betöltéskor megkeresi, és ha megtalálja, minden helyen (embléma, fejléc) automatikusan arra vált, ugyanezzel a 3D rétegzéssel. A jelenlegi életfa egy általam rajzolt, ideiglenes jel; nem a te logód.

**Az „unalmas" szekciók interaktívak lettek** — a szöveg nagy része most felfedezhető, nem egyszerre ömlik a képernyőre:

| Szekció | Interakció |
|---|---|
| A rendszer 5 eleme | Kattintásra kinyílik, **mi történik, ha az az elem hiányzik** (piros következmény-doboz), a többi kártya elhalványul |
| „Ezt halljuk a legtöbbször" | Az idézet látszik, a **válasz kattintásra derül ki** |
| Árak | Szűrő: Mind · Havidíjas rendszer · Egyszeri projekt — így egyszerre kevesebb szöveg van a képernyőn |
| GYIK | Téma-szűrő: Ár · Idő · Mérés · 2026-os megfelelés |
| „Neked való, ha…" | **Önteszt**: bejelölöd, ami igaz rád, és pontszámot + személyre szabott üzenetet kapsz, a végén CTA-val |

Mind billentyűzettel is használható (`tabindex`, `role`, Enter/Space), és minden interakció GA4 eseményt küld.

## 1b. Konverzióoptimalizálás és 2026-os megfelelés

| Elem | Mit csinál |
|---|---|
| **Hero: lead-költség kalkulátor** | A látogató két csúszkán megadja a havi hirdetési keretét és a megkeresései számát → megkapja, mennyibe kerül nála **egy megkeresés**, mennyi az éves költés, és mi lenne a lead ára 20%-kal több megkereséssel. A számítás a **saját adatain** fut, semmi kitalált szám; az eredmény rejtett mezőként az űrlappal is megy. |
| **Valós határidő-visszaszámlálók** | Nem kamu scarcity: a ribbon és a megfelelőségi kártyák a tényleges jogszabályi dátumokig számolnak (eNyugta 2026. 09. 01., AI Act gépi jelölés 2026. 12. 02.). Lejárat után „a határidő elmúlt" állapotra vált. |
| **AI Act szekció** | Az AI Act 50. cikk 2026. augusztus 2. óta hatályos átláthatósági kötelezettsége: chatbot-jelölés, AI-tartalom jelölés, bírságkeret. Külön kiemelve, hogy **marketingoldali kivitelezés, nem jogi tanácsadás**. |
| **eNyugta szekció** | 2026. szeptember 1-i adatszolgáltatási kötelezettség, ~270 ezer érintett vállalkozás, 3 napos beküldés papírnyugtánál, pénztárgép-átállási dátumok + ingyenes ellenőrzőlista mint lead-mágnes. Kiírva, hogy **nem könyvelői tanácsadás**. |
| **Kétlépcsős űrlap** | 1. lépés: egyetlen kérdés (6 kattintható válasz vagy szabad szöveg). 2. lépés: elérhetőség. Haladásjelző, „vissza" gomb, mikro-bizonyíték sorok a gomb alatt/fölött. |
| **Exit-intent ajánlat** | Az egér kilépő mozdulatára egyszer (munkamenetenként) felajánlja a 2026-os határidő-ellenőrzőlistát e-mailért. |
| **Sticky mobil CTA-sáv** | 900 px alatt: Hívás · WhatsApp · Ingyenes konzultáció, a hüvelykujj-zónában. |
| **„Ezt halljuk a legtöbbször"** | Hat valós ügyfélmondat a `product-marketing-context.md`-ből, mindegyik alatt azzal, hogy a rendszer melyik eleme válaszol rá. |
| **Ár-horgonyzás** | A csomagok alatt viszonyítás a hirdetési kerethez (a díj és a keret két külön tétel). |
| **Szerző-blokk** | Név, székhely, adószám a heróban és az űrlapnál, fotóval (`assets/toth-daniel.jpg`) — a fájl hiányában automatikusan TD-monogramra vált. |
| **GA4 / GTM események** | `dataLayer` push minden CTA-kattintásra, űrlaplépésre, beküldésre, kalkulátor-használatra, ellenőrzőlista-kérésre és 25/50/75/100%-os görgetési mélységre. A GTM konténer kódját a `<head>`-be kell beilleszteni. |

> ⚠️ **A jogszabályi adatok ellenőrzendők publikálás előtt.** A dátumok és összegek másodlagos forrásokból (szakmai blogok, hírportálok) származnak; a NAV, illetve az AI Act hatályos szövegével vesd össze őket. A szekciókban ott a jogi/adózási felelősségkizárás, ezt ne töröld.

> ⚠️ **Ügyfélvélemény nincs az oldalon**, mert valós adat nélkül kitalálni nem lehet. Ha küldesz 2–3 nevesített véleményt, beépítem — enélkül a konverzió plafonos.

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
2. **Képek**: az oldalon jelenleg nincs fotó — a szerző-blokk `assets/toth-daniel.jpg`-t keres, és amíg nincs, TD-monogramot mutat. A brand-skill kimondja, hogy hero kép nélkül nem
   épül landing — a 3D vizuál most ezt helyettesíti. Az **OG kép** (`assets/og-tdai-3d.jpg`,
   1200×630) és egy **portré rólad** (E-E-A-T) viszont kellene.
3. **`sameAs` linkek** a JSON-LD-be: LinkedIn, Facebook oldal, Google Cégprofil URL.
4. **`llms.txt`, `robots.txt`, `sitemap.xml`** a domain gyökerébe kerül, nem almappába.

## 5b. Mozgásréteg (`assets/motion.css` + `assets/motion.js`)

Egy közös animációs réteg, ami **a főoldalon és mind a 28 aloldalon** fut. A technikák a
[HeyGen HyperFrames](https://github.com/heygen-com/hyperframes) nyílt katalógusának
(Apache-2.0) receptjeiből származnak — **saját implementációban**, a márkához igazítva.
A HyperFrames maga HTML→MP4 videó-renderelő keretrendszer, nem böngésző-animációs
könyvtár; amit átvettünk, az a `docs/catalog/components` alatti CSS-technikák logikája.

| Hatás | Recept | Hol |
|---|---|---|
| **Outline draw** | `outline-draw` — `@property` + conic-gradient + `mask-composite:exclude` | A kiemelt kártyák (CTA-doboz, megfelelőségi kártyák, űrlap, eszközök) kerete belépéskor körberajzolódik |
| **Tracing beam** | `tracing-beam` | A lépéslisták mellett arany fénysáv követi a görgetést |
| **Marker highlight** | `hw-underline` | Az answer-first blokkok félkövér kiemelései kézzel húzott aláhúzást kapnak, balról jobbra rajzolódva |
| **Blur-in belépés** | `blur-in` / `soft-blur-in` | Minden reveal életlenből élesedik |
| **Szavankénti emelkedés** | `per-word-rise` | A H1 és H2 címek szavanként fordulnak a helyükre |
| **Conic progress ring** | `conic-progress-ring` | A 10 kérdéses önteszt eredménygyűrűje |
| **Perspektivikus marquee** | `perspective-marquee` | Teljes szélességű, döntött kulcsszó-sáv szekcióhatárként |
| **Press ripple** | `press-ripple` | Minden gomb kattintásra hullámot vet |
| **Success check** | `success-check` | Animált pipa a köszönő állapotban |
| **Spotlight card** | `spotlight-card` | A kártyák a kurzor alatt világosodnak |
| **Text shimmer** | `text-shimmer` | Az arany gradiens szövegeken lassú fénymozgás |
| **Vignette + grain** | `vignette` / `grain-field` | Filmes keret és szemcse minden oldalon |

Minden hatás kikapcsol `prefers-reduced-motion: reduce` mellett, és egyetlen
`IntersectionObserver` gyújtja meg őket, tehát nincs plusz scroll-figyelő.

> A HyperFrames egyébként arra való, hogy **HTML-ből MP4-et rendereljen** — ezzel a
> hiányzó hero-videót és a hirdetéskreatívokat is le lehetne gyártani ugyanebből a
> márkastílusból (`npx hyperframes`). Ha kell, ezt külön körben megcsinálom.

## 6. Aloldalak és a statikus generátor

A főoldal (`index.html`) továbbra is kézzel karbantartott, mert egyedi 3D-t futtat.
**A többi 28 oldal generált** — így egy fejléc-javítást egyszer kell átvezetni, nem 28-szor.

```
templates/base.html      ← fejléc, lábléc, cookie-sáv, schema-váz, embléma
content/*.json           ← oldalanként a tartalom (blokkokból)
scripts/build-site.js    ← generátor
assets/site.css          ← közös stílus (egyszer töltődik le, utána cache-ből jön)
assets/site.js           ← közös JS: reveal, GYIK, űrlap, Consent Mode, GA4
```

**Új oldal létrehozása:** másolj egy `content/*.json`-t, írd át, futtasd:

```bash
cd docs/tdaimarketing-3d && node scripts/build-site.js
```

A generátor magától elkészíti a `<title>`-t, a meta blokkot, a canonicalt, a
JSON-LD-t (WebPage + BreadcrumbList + Service + FAQPage), és újraírja a `sitemap.xml`-t.
Blokktípusok: `answer`, `prose`, `cards`, `ticks`, `steps`, `table`, `faq`, `cta`,
`form`, `related`, `html`. A `"draft": true` mezővel egy oldal kimarad a generálásból.

### Az elkészült oldalak

| Csoport | Oldalak |
|---|---|
| **Szolgáltatás** | `google-ads-kezeles` · `meta-hirdetes` · `landing-oldal-keszites` · `marketing-audit` · `google-cegprofil-helyi-seo` · `ai-chatbot` · `marketing-automatizacio` · `szolgaltatasok` (hub) |
| **Konverzió** | `arak` · `ingyenes-konzultacio` (hirdetési landing, navigáció nélküli fókusszal) · `koszonjuk` (noindex, ide irányít az űrlap) |
| **2026-os megfelelés** | `megfeleles-2026` (hub) · `ai-act-chatbot-megfeleles` · `enyugta-2026-ellenorzolista` |
| **Eszközök** | `lead-kalkulator` · `hirdetesi-keret-kalkulator` · `marketing-onteszt` (10 kérdés) · `ai-act-chatbot-szoveg-generator` (kimásolható jelölés-szöveg) · `eszkozok` (hub) |
| **Bizalom** | `rolam` · `hogyan-dolgozunk` · `marketing-ugynokseg-debrecen` |
| **Kötelező** | `impresszum` · `adatvedelem` · `aszf` · `cookie-tajekoztato` · `404` |
| **Blog** | `blog` (hub) + az átemelt konverziómérés-cikk |

> ⚠️ **A jogi oldalak vázlatok.** Sablon alapján készültek, a tényleges adatkezelési
> gyakorlatod ismerete nélkül. Minden ilyen oldal tetején ott a figyelmeztetés —
> **éles használat előtt nézesd át jogásszal**, és egészítsd ki a valóban használt
> szolgáltatókkal (tárhely, e-mail, pixel, chatbot). Enélkül a Google Ads is
> elutasíthatja a landinget.

> ⚠️ **`esettanulmanyok.json` draft állapotban van** — sablonként ott a fájl, de
> valós ügyféladat nélkül nem generálódik le. Küldj adatokat, és élesítem.

### Cookie-sáv és Consent Mode v2

Minden oldalon (a főoldalon is) ott a cookie-sáv. A mérési és hirdetési tárolás
**alapértelmezetten tiltott**, és csak az „Elfogadom" után vált engedélyezettre.
A GTM konténer kódját a `<head>`-be kell beilleszteni — onnantól a `dataLayer`
események (CTA, űrlap, kalkulátor, önteszt, görgetés) automatikusan mennek.

### URL-ek

Az oldalak lapos `.html` fájlok, a canonical is ilyen (`/arak.html`). A mellékelt
`.htaccess` ezen felül a `.html` nélküli címeket is kiszolgálja, beállítja a 404-et,
a tömörítést és a cache-t.

## Feltöltés (Rackhost)

```
public_html/
├── index.html            ← a 3D főoldal
├── *.html                ← a 28 generált aloldal + a blogcikk
├── .htaccess             ← 404, tömörítés, cache, .html nélküli URL-ek
├── llms.txt · robots.txt · sitemap.xml
└── assets/               ← site.css, site.js, motion.css, motion.js, three.module.min.js, fonts/, képek
```

A `templates/`, `content/` és `scripts/` mappát **nem kell feltölteni** — azok a
forrásfájlok, amikből a generátor dolgozik.

Az `assets/` mappának az `index.html` mellett kell lennie — relatív útvonalon hivatkozik rá.
Ha nem a főoldalt cseréled, a `<link rel="canonical">` és a JSON-LD URL-eket is írd át.

## Helyi megnyitás

A three.js ES modulként töltődik, ezért `file://`-ből nem indul el (CORS) — kis szerver kell:

```bash
cd docs/tdaimarketing-3d && python3 -m http.server 8777   # → http://localhost:8777
```

`file://`-ből is működik az oldal, csak a Gépezet szekció esik szöveges fallbackre.
