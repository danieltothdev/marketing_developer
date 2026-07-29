# tomninggoteborg.se — Alfa Tömning Göteborg

Ügyfél: Alfa Tömning Göteborg (dödsbo/bortforsling/tömning szolgáltatás, Göteborg és környéke, Svédország)
Domain: tomninggoteborg.se
Kontakt: info@tomninggoteborg.se / 070 729 39 86

## Cél
A régi Hostinger AI-generált oldal helyett az újonnan (Cursor-ral) épített statikus oldal minél gyorsabb
Google-indexelése és rangsorolása, hogy nőjön az organikus foglalások száma.

## Jelenlegi állapot (2026-07-10-i feltöltés alapján)
- Statikus HTML oldal, svéd (`/`) + angol (`/en/`) nyelvi verzióval.
- Oldaltípusok: főoldal, szolgáltatás aloldalak (`/tjanster/...`), terület aloldalak (`/omraden/...`),
  árazás, kapcsolat, ajánlatkérés (`offert.html`), adatvédelem.
- `sitemap.xml` és `robots.txt` megvan, sitemap mindkét nyelvi verziót tartalmazza.
- `.htaccess`: pretty URL-ek (`.html` kiterjesztés elrejtése) + legacy slug → új slug 301 redirectek
  (pl. `/tjanster/dodsbotomning` → `/tjanster/dodsbotomning-i-goteborg`), illetve élő oldal régi
  URL-jeiről (`/tomning-goteborg`, `/dodsbo-goteborg` stb.) az új statikus oldalra.
- Lead form: Supabase Edge Function (`submit-lead`) fogadja, `leads` táblába ír + email értesítés
  (Resend API-n keresztül). `js/config.js`-ben van a Supabase projekt URL + publishable (anon) key —
  ez kliens oldali, RLS-szel védett, nem service_role kulcs, publikálható.
- `scripts/` mappa: Node.js segédszkriptek (i18n generálás, oldalgenerálás, kép-import stb.) —
  a `node_modules` NINCS bemásolva a repóba (`npm install` kell hozzá lokálisan, ha futtatni kell őket).
- `minta-oldalak-forrás/` — elmentett referencia/versenytárs oldalak (böngészőből mentett HTML-ek),
  csak inspirációs anyag, nem él a site-on.

## Hiányzó infó a folytatáshoz (kérdezd meg Dánieltől / ügyféltől)
1. A régi Hostinger AI-oldal jelenleg élő URL-listája (minden indexelt oldal) — a teljes redirect-térkép
   lezárásához kell, hogy egyik régi URL se maradjon redirect nélkül.
2. Google Search Console hozzáférés (vagy legalább export: Coverage/Indexelés riport, jelenlegi
   sitemap állapot, forgalmi adatok) a régi domainhez.
3. DNS / hosting jelenlegi állapota: hol fut most élesben a domain (Hostinger), és hogyan/mikor áll át
   az új statikus oldalra (Rackhost? más?).
4. Supabase projekt admin hozzáférés, ha az Edge Function / email-küldés finomhangolására is szükség lesz.
5. Van-e már Google Cégem (Google Business Profile) bejegyzés a céghez — lokális SEO-hoz kritikus.

## GSC export #1 — "Kizárva: noindex címke miatt" (2026-07-10, 108 URL)
Fájl: `seo-data/gsc-excluded-noindex-2026-07.csv`

**Fontos:** ez NEM az indexelt oldalak listája — ez a "Kizárva egy „noindex” címke miatt" riport
(lásd a fájl "Metaadat" fülét). Vagyis ez a 108 URL a régi Hostinger AI-oldalon úgy jött létre, hogy a
rendszer maga tiltotta le az indexelésüket — **ezek jelenleg NEM rangsorolnak a Google-ben**, tehát
migrációkor nincs SEO-érték (link equity), amit itt redirecttel meg kellene menteni. Sürgősségi
szempontból alacsony prioritásúak.

Amit viszont elárul ez a lista:
- A régi oldal **rengeteg hiperlokális oldalt generált** eltérő URL-mintázatokkal: `/omraden/X`,
  `/stadsdel/X`, `/kommun/X`, `/region/X`, `/flyttfirma-X`, `/tomning-dodsbo-X`, `/tomma-dodsbo-X` —
  ugyanarra a városrészre/településre több variáció is (pl. `bagaregarden` kétszer, `utby` kétszer).
  Ez tipikus AI-generált duplikált/thin content minta, ami miatt valószínűleg a platform vagy egy
  korábbi SEO-intézkedés noindexelte őket.
- **Rossz témaillesztés:** rengeteg `flyttfirma-*`, `kontorsflytt`, `bohagsflytt`, `flyttpaket-goteborg`,
  `akut-flyttstadning` jellegű oldal — ezek **költöztetési (flytt) szolgáltatás** tartalmak, miközben az
  üzlet fő profilja **tömning/dödsbo (ürítés/lomtalanítás)**. Ez arra utal, hogy a Hostinger AI-generátor
  vegyítette a két rokon, de eltérő szolgáltatást — hitelességi/relevancia kockázat volt.
- **Hibás dinamikus route-ok éltek ki nyilvánosan:** `/foretagsflytt-:slug`, `/kontorsflytt-:slug`,
  `/omraden/:slug`, `/kundfall/:slug`, `/foretagsflytt-{dynamic}` — szó szerint feloldatlan template
  placeholderek URL-ként. Ez konkrét technikai hiba volt a régi oldalon.
- Az új Cursor-oldal ezzel szemben **12 tömör, minőségi terület-oldalt** tartalmaz
  (`centrum, hisingen, kungalv, kungsbacka, landvetter, lerum, majorna-linne, molndal, molnlycke,
  orgryte-harlanda, partille, vastra-goteborg`) — ez helyes SEO-irány a szétforgácsolt, thin
  hiperlokális oldaltömeg helyett.

**Még hiányzik:** a ténylegesen **indexelt** oldalak listája (GSC → Indexelés → Oldalak →
"Indexelve" fül export). Ez adja meg a valós redirect-prioritást — ha egy régi URL tényleg indexelve
volt/van és kap forgalmat vagy backlinket, azt kötelező 301-gyel átirányítani az új oldal megfelelő
oldalára. A jelenlegi `.htaccess` csak néhány kézzel felvett legacy slugot fed le, a fenti mintázatok
(pl. `flyttfirma-lerum` → melyik új oldalra?) még nincsenek benne.

## GSC export #2 — "Indexelve" (2026-07-10, 88 URL)
Fájl: `seo-data/gsc-indexed-2026-07.csv`

**Jó hír:** a legfrissebb crawl-dátumú URL-ek (2026-06-17 – 2026-06-30) pontosan az ÚJ Cursor-oldal
struktúráját követik (`/omraden/vastra-goteborg`, `/tjanster/tomning-i-goteborg`, `/en/...` stb.) —
tehát **az új oldal már él és a Google már aktívan indexeli**. A migráció ténylegesen folyamatban van,
nem csak terv.

**3 technikai hiba, amit ez az export lelepezett — ezeket a `.htaccess`-ben már ki is javítottam
(2026-07-10-i commit), Dánielnek csak fel kell töltenie SFTP-vel/WinSCP-vel az élő szerverre:**

1. **www / non-www duplikáció:** `https://www.tomninggoteborg.se/` és `https://www.tomninggoteborg.se/tomning-goteborg`
   is indexelve volt a `https://tomninggoteborg.se/...` (www nélküli) verziók mellett. → Hozzáadva egy
   301-es host-redirect: `www.tomninggoteborg.se` → `tomninggoteborg.se`.
2. **`.html` / kiterjesztés nélküli duplikáció:** `/omraden/molndal` ÉS `/omraden/molndal.html` is
   indexelve volt ugyanarra a tartalomra. → Hozzáadva egy szabály, ami minden explicit `.html` végű
   kérést 301-gyel a kiterjesztés nélküli verzióra visz.
3. **Redirect nélküli régi URL-ek**, amik ténylegesen indexelve voltak (tehát volt/van rájuk forgalom
   vagy backlink), de a régi `.htaccess` nem kezelte őket. Hozzáadva kb. 17 új `RedirectMatch` szabály:
   - Egyértelmű 1:1 megfeleltetések (pl. `/villatomning-goteborg` → `/tjanster/villatomning-i-goteborg`,
     `/tomning-dodsbo-goteborg` → `/tjanster/dodsbotomning-i-goteborg`)
   - Városrész-szintű régi oldalak (`/stadsdel/centrum`, `/stadsdel/heden`, `/stadsdel/vasastan`) az
     új konszolidált `/omraden/centrum`-ra
   - `/omraden/vastra-frolunda` → `/omraden/vastra-goteborg` (Frölunda a Västra Göteborg terület része)

## FAQ + blog tartalom pótolva (2026-07-10)
A `/faq` és a két indexelve volt blog URL (`dodsbotomning-goteborg`, `professionella-tomningsprojekt-goteborg`)
most VALÓDI, a design-hoz illeszkedő tartalommal élnek — nem redirect a főoldalra, hanem tényleges
oldalak, ugyanazokkal a slugokkal, amiken korábban indexelve/forgalmuk volt:

- `faq.html` — 15 kérdés/válasz, 4 kategóriában (Priser & betalning, Bokning & process, Miljö &
  återvinning, Om oss & täckning), `FAQPage` schema.org jelöléssel.
- `blogg/index.html` — blog főoldal, kártyás listázással.
- `blogg/dodsbotomning-goteborg.html` — teljes guide anhörigoknak (bouppteckning → sortering →
  folyamat → ár → időtartam), mini-FAQ-val, `BlogPosting` schema-val.
- `blogg/professionella-tomningsprojekt-goteborg.html` — B2B/BRF/fastighetsägare fókuszú cikk,
  szolgáltatás-linkekkel, `BlogPosting` schema-val.

Mindegyik a meglévő sablon-mintát követi (header/nav/footer, `.service-content`, `.faq-list`,
`.case-cards-grid`, `.related-services-grid`, `.cta-band` komponensek) — semmi új CSS nem kellett.
Helyi szerverrel + Playwright screenshot-tal ellenőrizve: renderelés, FAQ toggle és az offert-form
alapértelmezett szolgáltatás-mező mind működik.

**Site-wide nav-frissítés:** a "Blogg" és "FAQ" linket felvettem a fő navigációba **31 svéd oldalon**
(minden root-szintű és `tjanster/`, `omraden/` aloldalon) — csak az angol (`en/`) oldalakat hagytam ki,
mert azokhoz egyelőre nincs angol FAQ/blog tartalom.

**`.htaccess` frissítve:** a korábban a főoldalra irányított `/faq` és `/blogg/*` szabályok törölve
(most valós tartalom van ott), helyette a fennmaradó, tartalom nélküli régi blog-slugok
(`tomning-dodsbo-goteborg-vastra-gotaland-guide-2025`, `tomning-goteborg-omnejd-dodsbo-flytt-akut`,
`professionell-tomning-utan-rut`) a blog főoldalára/releváns cikkre irányítanak.

**`sitemap.xml` frissítve** a 4 új URL-lel.

**Nyitott, tartalmi döntés Dánielnek:** `/bohagsflytt-goteborg`, `/flyttstadning-goteborg`,
`/tjanster/flyttstadning` továbbra is a főoldalra redirectelnek — ezek flytt/takarítás témájúak, nem a
tömning-profil része, szándékosan nem pótoltam őket tartalommal.

## Ügyfél "Semrush" audit átnézve — csak 4 pont volt valós és megerősített (2026-07-11)
Az ügyfél átküldött egy 24 pontos "Semrush elemzést". Ellenőriztem a kód alapján: **több állítása
bizonyíthatóan hamis erre a site-ra** (pl. "138 versengő LocalBusiness objektum" — valójában 93 oldalon
ugyanaz az `@id`, ez a helyes gyakorlat; "a footer több száz linkes linkfarm" — valójában 2 soros).
Ez alapján ez inkább egy generikus/sablonos audit-checklist, nem egy erről a konkrét site-ról készült
valódi crawl-riport. Dánielnek szóltam, hogy kérje el a nyers Semrush Site Audit exportot (konkrét
URL-listával, hibaszámokkal), mielőtt a többi 20 pontot elkezdenénk.

**4 állítást viszont a kód megerősített, ezeket kijavítottam:**
1. **Duplikált title tag** — `index.html` és `tjanster/tomning-i-goteborg.html` ugyanazt használta.
   A tomning-i-goteborg.html title-je most: "Tömningstjänster i Göteborg – Alla våra tjänster | Alfa Tömning".
2. **Hiányzó meta description** — pótolva az `integritetspolicy.html`-en (GDPR-tájékoztató szöveg).
3. **Redirect chain a `.htaccess`-ben** — ha egy URL egyszerre volt `www` ÉS `.html` hibás (pl.
   `www.tomninggoteborg.se/omraden/molndal.html`), az korábban 2 külön 301-ugrással jutott célba.
   Most env-változós (`E=CANON_HOST`/`E=CANON_PATH`) logikával mindhárom eset (www-only, html-only,
   mindkettő) EGY 301-es lépésben landol a végleges URL-en. Éles Apache-on még érdemes leellenőrizni
   (itt a sandboxban nem volt telepíthető Apache a teszteléshez, csak a logikát vezettem le kézzel).
4. **`inLanguage` property a LocalBusiness objektumban** — kivéve mind a 34 érintett fájlból (a
   Service/BlogPosting objektumok saját `inLanguage`-át NEM bántottam, az ott jogos). JSON-LD validitás
   utólag ellenőrizve, minden fájl valid JSON maradt.

## Következő lépések (SEO/indexelési terv vázlat)
1. ~~Redirect-térkép lezárása~~ → **kész a `.htaccess`-ben (2026-07-10, finomítva 2026-07-11)**, fel kell
   tölteni élesre (WinSCP/SFTP a Rackhost/jelenlegi szerverre) — helyben a repóban lévő fájl önmagában nem él.
2. ~~FAQ + blog tartalom pótlása~~ → **kész (2026-07-10)**, szintén feltöltésre vár élesre
   (`faq.html`, `blogg/` mappa, frissített `.htaccess`, `sitemap.xml`, és a 31 nav-frissített oldal).
3. ~~4 megerősített Semrush-pont javítása~~ → **kész (2026-07-11)**, ld. fent.
4. Nyers Semrush Site Audit export bekérése az ügyféltől a maradék 20 ponthoz (tartalom, belső linkelés,
   Core Web Vitals, GA4 audit stb.) — ne generikus checklistából dolgozzunk tovább.
5. Search Console: property hozzáadása/ellenőrzése (ha még nincs) az élő domainre, sitemap újra
   beküldése (a 4 új URL miatt is), a redirectek után pár nappal ellenőrizni a "Kizárva" riportot.
6. Belső linkelés és NAP (Name/Address/Phone) konzisztencia ellenőrzése az oldalakon és a Google Cégem
   profillal.
7. "tömma dödsbo göteborg" célkulcsszóra dedikált landing oldal (korábban egyeztetett, Cursor prompt
   kész volt hozzá) — ellenőrizni, hogy ez a build már tartalmazza-e (`dodsbotomning-i-goteborg.html`
   erre utalhat, meg kell nézni tartalmilag).

## Semrush audit technikai fázis végrehajtva (2026-07-11)
Részletes összefoglaló: `semrush-audit-technikai-osszefoglalo.md` (átadható deliverable).

Röviden, mit csináltam ebben a körben az audit alapján:
- **`.htaccess` teljes újraírás:** egy-lépéses (chain nélküli) 301 normalizálás (http→https, www→non-www,
  .html→extensionless, index.html→/, trailing-slash). **KRITIKUS bug javítva:** `/omraden` és `/en/areas`
  korábban törött volt (könyvtár elfedte a landing fájlt) — most 200.
- **2096 belső link** relatív `.html`-ről abszolút végleges (extensionless) URL-re állítva.
- **i18n nyelvváltó (JS) javítva:** korábban extensionless URL-en rossz oldalra vitt; most a helyes
  SV↔EN megfelelőre. main.js area-grid + offert fallback szintén végleges URL-ekre.
- **BreadcrumbList JSON-LD** minden oldalra (54 db), + a `tjanster/`/`en/services/` breadcrumb 3-szintűvé
  téve. `inLanguage` már korábban kivéve a LocalBusiness-ből (121 JSON-LD blokk mind valid).
- **Ellenőrzés:** Apache-mimic szerver + headless böngésző: minden végleges URL 200, minden belső link
  200 (0 redirect, 0 404), nyelvváltó/area-grid/FAQ/űrlap működik, 0 JS console hiba, sitemap 66/66 URL 200.

**Feltöltéskor figyelni:** a `.htaccess` `Options -MultiViews` + `DirectorySlash Off` sorokat használ
(Hostinger jellemzően engedi). Ha 500-at ad az első feltöltés után, ez a két sor a gyanús — ld. az
összefoglaló "Fontos a feltöltéskor" szakaszát.

**Következő fázis (nem ebben a körben):** tartalmi megerősítés (audit 13–18), BRF/B2B struktúra (15),
Core Web Vitals + CSS/JS minifikálás (12, 21), GA4/konverziómérés (22–23).

## Blog bővítés SV+EN + nyelvváltó bugfix (2026-07-11)
- **Nyelvváltó bug javítva:** az `en/index.html` a JS-t rossz útvonalon (`js/` a `../js/` helyett) töltötte → 404 → az egész JS (nyelvváltó + űrlap) halott volt az angol főoldalon. Plusz az `index.html` üres i18n-routes térképe pótolva. Most SV↔EN oda-vissza működik a főoldalon is.
- **2 új SV cikk:** `vad-kostar-tomning-goteborg` (árguide, RUT), `checklista-lagenhetstomning`.
- **Teljes EN blog szekció** (`/en/blog`): index + mind a 4 cikk angolul (a 2 meglévő + 2 új EN párja).
- Minden cikk: űrlap, BlogPosting + BreadcrumbList schema, hreflang SV↔EN, meglévő fotók (assets/images).
- EN nav-ba "Blog" link (30 oldal), SV blog index 4 kártyára bővítve.
- i18n-routes globálisan frissítve a blog párokkal (73 oldal) → nyelvváltó működik a blog oldalakon.
- `.htaccess`: `/en/blog` collision-serve + trailing-slash 301. sitemap: 66→73 URL.
- **Ellenőrzés:** minden új URL 200, JSON-LD valid, nyelvváltás helyes párokra, űrlap 11 mezővel renderel, EN blog kártyák jó linkeken.

## Supabase / űrlap-integráció státusz (2026-07-11)
- Kód szinten HELYES: űrlap (64/66 oldal) → `submit-lead` edge function → DB insert + email a tulajnak + auto-válasz.
- **NEM tesztelhető innen:** a tomninggoteborg.se másik Supabase projektet (`pavleectcuwzkuttvmbq`) használ, ami nincs a csatlakoztatott fiókban. Dániel maga teszteli élőben.
- Élő működéshez a Supabase oldalán kell: (1) submit-lead deploy, (2) leads tábla + RLS insert policy, (3) secrets: RESEND_API_KEY, NOTIFY_EMAIL, NOTIFY_FROM. Az `on-lead-insert-email.sql`-ben placeholder maradt (alternatív trigger-út, nem szükséges ha submit-lead küldi az emailt).

## FÁZIS 2 végrehajtva: teljesítmény + BRF/B2B tartalom (2026-07-11)
**1) Képek (Core Web Vitals):** 25 WebP generálva (JPG-k maradtak fallbacknek; 3,6MB→2,1MB, -42%);
mind a 126 `<img>` `<picture>` wrapperben WebP source-szal; hero JPG 104K→79K újratömörítve (URL változatlan);
hero preload + fetchpriority=high 37 oldalon. Böngészőben igazolva: a WebP töltődik be (currentSrc).
**2) CSS/JS:** main.css 56K→44K (csso), minden js/ minifikálva (terser, szintaxis-ellenőrizve);
olvasható források a repóban: `site/src/css/`, `site/src/js/` (deploy zip-ből kizárva).
Minden script `defer`; flatpickr CDN CSS nem-blokkoló (media=print trükk + noscript fallback);
preconnect (fonts.googleapis/gstatic, jsdelivr) 72 oldalon; `.htaccess`-ben mod_expires/mod_deflate
cache+gzip blokk IfModule-védelemmel.
**3) BRF/B2B tartalom:** "Återkommande uppdrag & avtal" szekció a 4 SV B2B oldalon + a 4 EN páron
(löpande avtal, fix kontakt, dokumentáció, 24-48h prioritás) + kontextuális linkek természetes
anchorral; priser + en/pricing: "Vad påverkar priset" (4 tényező) + RUT-magyarázat + linkek;
kontextuális belső linkek a 4 lakossági kulcsoldal bevezetőjében (villa/radhus/dödsbo/lägenhet).
**Regressziós QA:** sitemap 73/73→200, belső linkek+webp srcset 0 hiba, JSON-LD 135/135 valid,
nyelvváltó SV↔EN OK, B2B szekció+űrlap (11 mező) renderel, priser-tartalom renderel, FAQ toggle OK,
mobil CTA sáv OK. Éles oldalon 0 törött hivatkozás.

## KRITIKUS javítás: svéd tartalom az angol oldalakon (2026-07-11)
**Hiba (jogos ügyfél/Dániel reklamáció):** 10 EN szolgáltatás-oldalon a hero angol volt, de a teljes
body-tartalom SVÉDÜL maradt — ez az eredeti Cursor-generátorból örökölt hiba, amit a korábbi QA-m nem
fogott meg, mert csak technikai elemeket ellenőrzött (linkek, schema, nyelvváltó), tartalom-nyelvet nem.
**Javítás:** mind a 173 svéd szövegdarab kinyerve, ~160 lefordítva angolra (a cégnevek — Alfa Tömning,
Alfa Flytt & Städ AB — és földrajzi nevek szándékosan maradtak); pontos szöveg-node cserével, HTML-t
nem érintve. "Härryda kommun" → "Härryda municipality". Utó-audit: 0 maradék svéd szöveg (åäö-s ÉS
ékezet nélküli svéd szavakra is szűrve), JSON-LD 100% valid, záró tagek épek.
**TANULSÁG (rögzítve):** a QA-checklista mostantól kötelezően tartalmazza a TARTALOM-NYELV ellenőrzést
nyelvi verziónként — technikailag zöld oldal NEM kész, ha a tartalma rossz nyelven van.

## 2026-07-22 — Semrush "Invalid structured data" (inLanguage) javítás
- Semrush jelzés: 42 db "Invalid structured data", séma LocalBusiness, mező `inLanguage` — a Schema.org szótár nem ismeri.
- ELLENŐRZÉS (javítás előtt): a hiba VALÓS. `inLanguage` bent volt 32 LocalBusiness objektumban (minden en/* oldal + index.html) ÉS 26 Service objektumban (en/services/* + tjanster/*). Ez utóbbi is érvénytelen — a Service sem tartalmazza az inLanguage tulajdonságot a Schema.org domainjében, csak a Semrush a LocalBusiness-re panaszkodott.
- OK: a korábbi inLanguage-eltávolítás csak a SV-oldalak LocalBusiness-ét érintette (`sv-SE` minta), az EN-sablon (`en-GB`) és az index.html kimaradt; a Service objektumokat egyáltalán nem érintette.
- JAVÍTÁS: JSON-szintű parse, `inLanguage` törlése KIZÁRÓLAG a LocalBusiness és Service objektumokból. A BlogPosting `inLanguage` (10 db) ÉRINTETLEN — ott érvényes (CreativeWork domain).
- EREDMÉNY: 45 fájl módosítva, 32 LB + 26 Service inLanguage eltávolítva, 0 hibás JSON-LD, BlogPosting 10 megmaradt. Nyelvet a `<html lang>` + hreflang jelzi, nem az inLanguage — funkcionálisan semmi nem vész el.

## 2026-07-22 — Hero cím "fehér doboz" bug javítás
- Tünet: az index.html hero H1 (.display-title) fehér téglalapként jelent meg a cím szövege helyett.
- OK: a CSS-minifikáló (csso) kiemelte a `background-clip:text` deklarációt egy külön, a `background:linear-gradient(...)` shorthand ELÉ helyezett szabályba. A `background` shorthand alaphelyzetbe állítja a `background-clip`-et (border-box), így a gradiens az egész elem-dobozt kitöltötte, a szöveg (color:transparent) pedig eltűnt → fehér doboz.
- JAVÍTÁS (2 szint):
  1. Live css/main.css: helyes sorrend + a `background` shorthand helyett `background-image` longhand (ez nem nullázza a background-clip-et), plusz `-webkit-text-fill-color:transparent`.
  2. Forrás src/css/main.css: ugyanez, hogy ÚJRA-minifikáláskor se térjen vissza a hiba.
- Ellenőrzés: Playwright render — computed `-webkit-background-clip: text`, gradiens megvan, szöveg a glyph-ekre klippel, nincs fehér doboz.
- TANULSÁG: minifikálás után KÖTELEZŐ vizuális (böngészős) ellenőrzés a gradiens-szöveg / background-clip elemeknél, nem elég a technikai diff.

## 2026-07-24 — Tartalmi mélyítés: Dödsbotömning (zászlóshajó minta)
- Stratégia: nem szószám-tömés, hanem teljes topikális lefedés (SEO+AEO). Célsávok: fő szolgáltatásoldal 1500–2500 szó, 10–15 GYIK, 10–20 belső link.
- Dödsbotömning SV (tjanster/dodsbotomning-i-goteborg): meglévő jó váz MEGTARTVA + új szekciók: "Vad är dödsbotömning?" (definíciós, AEO), "Vad ingår?", "Dödsbo i praktiken" (bouppteckning→arvskifte jogi/gyakorlati lépések), ár-mélység (RUT), GYIK 4→15 + FAQPage séma. Eredmény: 1746 szó, 21 belső link, 15 GYIK.
- Estate clearance EN (en/services/estate-clearance-gothenburg): tükör-tartalom angolul, EN belső linkekkel. 1787 szó, 19 link, 15 GYIK, FAQPage séma.
- Ez a SABLON — ugyanez a szerkezet gördül a többi szolgáltatás- és terület-oldalra.
- Ellenőrzés: Playwright render, FAQ-harmonika működik, minden JSON-LD érvényes, nincs nyelvi keveredés.

## 2026-07-24 — A 13 "low word count" oldal javítása (Semrush CSV)
- Típusra szabott bővítés (nem szószám-tömés): hub, form, jogi, terület.
- SV: omraden (271w), blogg/index (282w), offert (225w), kontakt (209w), integritetspolicy (222w, teljes GDPR), omraden/majorna-linne (324w), omraden/partille (303w), priser (367w).
- EN: en/areas (283w), en/blog/index (306w), en/quote (252w), en/contact (227w), en/privacy-policy (254w, GDPR).
- FAQ + FAQPage séma minden hub/form/terület/ár oldalon (AEO). Jogi oldalak: bővített GDPR-szöveg, FAQ nélkül.
- Erős belső linkelés minden oldalon. Ellenőrzés: minden JSON-LD érvényes, 0 törött belső link, FAQ-harmonika renderel. (A szószámok a main-re; a Semrush a nav/láblécet is számolja, tehát még magasabb.)

## 2026-07-24 — 5 új blogcikk (SV+EN) + teljes Semrush-újraellenőrzés
- Kulcsszó-résanalízis alapján (nincs célzott oldal a title/H1-ben): kontorstömning, garagetömning, vindstömning, magasinstömning, tömma hus.
- Új cikkek (mind SV+EN, 1000-1700 szó, 10 GYIK + FAQPage séma, BlogPosting séma):
  1. tomma-hus-goteborg / clearing-a-house-gothenburg (tömma hus, hustömning)
  2. tomma-garage-kallare-vind-goteborg / garage-basement-attic-clearance (4 rés egyszerre)
  3. kontorstomning-goteborg / office-clearance-guide (B2B, GDPR + IT + återställning)
  4. vad-hander-med-sakerna / what-happens-to-the-items (AEO + bizalom, återvinning)
  5. tomning-rojning-bortforsling-skillnad / clearance-clear-out-junk-removal-difference (definíciós, AEO)
- NEM írtam külön cikket a "tömma lägenhet" résre — kannibalizálta volna a meglévő checklista-cikket.
- Bekötés: blog lista (SV+EN), sitemap.xml (73->83), i18n-routes mind a 83 oldalon, llms.txt.
- Bloglista-kártyák nem-leíró "Läs artikeln"/"Read the article" linkjei javítva visually-hidden címmel.
- Teljes Semrush-audit ÚJRAFUTTATVA mind a 83 oldalra: 0 hiba.
  Ellenőrzött: title/meta/H1/H2 megléte, title<=60, szószám>=280, inLanguage csak BlogPosting-on,
  JSON-LD érvényesség, törött belső link, árva oldal, GA4 pontosan 1x, cache-busting, img alt,
  canonical+hreflang, duplikált title/meta, sitemap 404, llms.txt 404.
- Javítva közben: 6 túl hosszú title (61-62 -> <=53), 4 rövid oldal felhozva 371-429 szóra.

## 2026-07-24 — HIBAJAVÍTÁS: kitalált árak a blogcikkekben
- HIBA (az enyém): a "tömma hus" cikkbe 15 000–60 000 kr ársávot írtam, a garage-cikkbe "från 4 000 kr" — ezek KITALÁLT számok voltak, nem az ügyfél adatai.
- A VALÓS ártáblázat az oldalon van, a tjanster/akut-hjalp-tomning.html oldalon:
  Litet radhus 3 000–5 000 kr | Mellanstort radhus 5 000–8 000 kr | Stort radhus 8 000–12 000 kr | Villatömning 10 000–15 000 kr
- A kitalált 15–60 e kr NÉGYSZERESE volt a valós villatömning árnak (10–15 e) → elriasztotta volna az érdeklődőket.
- JAVÍTVA: mind a 4 cikk (SV+EN) a valós táblához igazítva, a látható szövegben ÉS a FAQPage sémában is (2-2 példány fájlonként). A garage-cikkből a kitalált szám kivéve (nincs rá ügyféladat), helyette összehasonlítás a valós radhus-árral.
- TANULSÁG: ügyfél-specifikus SZÁMOT (ár, határidő, kapacitás) soha nem találok ki. Ha nincs adat: vagy az oldalon már meglévő valós adatra hivatkozom, vagy kihagyom és bekérem.
- MÓDSZERTANI TANULSÁG: "nincs ár az oldalon" állítást 2 oldal alapján tettem — az egész site-ot kellett volna nézni. Állítás előtt teljes körű keresés kötelező.

## 2026-07-25 — Sürgős hibajavítás: törött képek az 5 EN blogcikken (Semrush "5 internal images are broken")
- OK: a generátorom az EN blog fájlokat (en/blog/, DEPTH-2) a rossz relatív mélységgel (../assets/) írta, a helyes ../../assets/ helyett. A meglévő 4 kép-hivatkozás jó volt (preload, related stb.), csak az ÁLTALAM beszúrt intro-kép + előtte a preload sor volt rossz (3 db/fájl).
- JAVÍTVA mind az 5 fájlban + az en/blog/index.html 5 új kártyáján (ugyanaz a hiba a kártya-generátorban).
- A build_articles.py generátor is javítva (EN ágon automatikus ../assets -> ../../assets csere), hogy új cikkeknél ne térjen vissza.
- Ellenőrzés: minden blog kép-hivatkozás (SV+EN) valós fájlra oldódik fel.

## 2026-07-25 — Ártáblázat átemelve a priser oldalra + Offer séma
- A valós ártáblázat (Litet radhus 3-5e, Mellanstort 5-8e, Stort 8-12e, Villatömning 10-15e kr) eddig csak az akut-hjalp-tomning oldalon volt - a legrosszabb helyen ár-kereséshez. Átemelve a priser.html-re (a hero után, "Vad påverkar priset" elé), ugyanazzal a pricing-tiers komponenssel. Az akut oldalon is megmaradt.
- Hozzáadva: Service+Offer+PriceSpecification JSON-LD séma (4 db, SEK, min/max ár) - AI/AEO idézhetőséghez.
- NEM találtam ki lakás/flyttstädning árat - azoknál marad "prissätts individuellt", link az offerthez.
- Ellenőrzés: Playwright render OK, JSON-LD érvényes.

## 2026-07-25 — 2 új dödsbo-ár cikk a konkurencia alapján (SV+EN)
- A konkurencia-elemzés kimutatta: a "vad kostar det att tömma ett dödsbo" AEO-keresésre a saját oldal nem jelenik meg, mert nincs dödsbo-SPECIFIKUS ár-cikk (a meglévő "vad kostar en tömning" cím általánosabb).
- Új cikkek (SV+EN, 1000-1165 szó, 10 GYIK + FAQPage séma):
  1. dodsbo-pris-goteborg / estate-clearance-cost-gothenburg — "Prisguide 2026" cím (a konkurencia mind évszámot használ), konkrét ártáblázat (ugyanaz mint priser.html), RUT dödsbónál, hogyan csökkenthető érékbecsléssel.
  2. vardera-salja-dodsbo-goteborg / valuing-selling-estate-gothenburg — mi az, aminek értéke van, hogyan megy a värdering, nem ajánlunk konkrét auktionsfirma-t (tisztesség).
- Minden árszám a MEGLÉVŐ valós táblát tükrözi (3-5e/5-8e/8-12e/10-15e kr) — semmi kitalálva.
- Bekötve: blog lista SV+EN, sitemap (83->87), i18n-routes mind a 87 oldalon, llms.txt.
- Teljes Semrush-audit újrafuttatva mind a 87 oldalra: 0 hiba (kép-feloldás VALÓS fájlrendszerrel ellenőrizve, nem csak string-mintával).

## 2026-07-25 — Semrush "informative content" + szemantikai szavak: omraden/partille.html
- A Semrush a /flyttfirma-partille URL-t auditálta - ez egy 301-es redirect a MEGLÉVŐ omraden/partille.html-re (canonical), nem külön oldal. Csak ezt az egy oldalt javítottam, ahogy kérve volt.
- Hiányzó szemantikai szavak a konkurenciához képest: "komma fram", "tunga lyft", "oavsett om det gäller", "säkert sätt".
- Új, valóban informatív szakasz: "Erfarenhet av Partilles gator, trapphus och backar" - helyi útviszonyok (Sävedalen/Björndammen dombok, szűk utcák), nehéz tárgyak emelése (kassaskåp, pianon, garderober), biztonságos kivitelezés, biztosítás. Nem kulcsszó-tömés - valós, releváns tartalom.
- +1 GYIK (tunga lyft kérdés) + FAQPage séma szinkronban frissítve (3->4 kérdés).
- Szószám: 425 -> 638. Mind a 4 kifejezés természetesen jelen van.
- Ellenőrzés: JSON-LD érvényes, Playwright render OK, FAQ harmonika működik.

## 2026-07-25 — Semrush 3 kép alapján: hreflang, séma, kulcsszó/tartalom
- Kép 1 (2x "incorrect hreflang links", broken 404): blogg/dodsbo-pris-goteborg + vardera-salja-dodsbo-goteborg (SV) / estate-clearance-cost-gothenburg + valuing-selling-estate-gothenburg (EN). ELLENŐRIZVE: mind a 4 fájl létezik, sitemapban benne van, canonical/hreflang helyes, robots nem tiltja. A Semrush crawl (11:24) a fájlok létrehozása (21:13) ELŐTT történt -> elavult crawl, nincs valódi hiba, deploy+rerun után eltűnik. Emellett QC: képútvonalak jók, JSON-LD érvényes, árak a valós táblát tükrözik (nincs kitalált szám), ~1000-1165 szó, 10 GYIK mindegyikben.
- Kép 2 ("1 structured data item is invalid", LocalBusiness address hiányzik): priser.html Service sémájában a "provider" egy DUPLIKÁLT, hiányos LocalBusiness volt (csak name+telephone). Javítva: "provider":{"@id":"https://tomninggoteborg.se/#localbusiness"} referenciára (a minta, amit minden más oldal is használ) - a hiányos duplikátum helyett a teljes, address-szel rendelkező fő LocalBusiness-re mutat.
- Kép 3 (akut-hjalp-tomning.html, cél kulcsszó "bärhjälp göteborg" hiányzik title/h1/meta/body-ból + "more informative content"): 
  - Title: "Akut Tömning Göteborg – Samma Dag 24/7" -> "Akut Tömning & Bärhjälp Göteborg" (47 kar)
  - Meta + Service séma description: "...tömning och bärhjälp i Göteborg..."
  - H1: "Akut tömning Göteborg" -> "Akut tömning & bärhjälp i Göteborg"
  - Új szakasz: "Bärhjälp i Göteborg när det är bråttom" - valós infó (bärremmar/trallor, ingyenes bärhjälp az árban, önálló bärhjälp is bookolható tömning nélkül)
  - +1 GYIK (önálló bärhjälp bookolható-e) + FAQPage séma HOZZÁADVA (korábban egyáltalán nem volt ezen az oldalon, pedig volt látható GYIK)
  - Szószám nőtt, 5 GYIK, JSON-LD érvényes, Playwright render OK.
- Csak a képeken szereplő oldalak + az akut oldal érintve, ahogy kérve volt.

## 2026-07-25 — Valódi Google Maps beágyazás (SV+EN főoldal)
- Korábban OpenStreetMap iframe volt a "Hitta oss här" / "Find us" szekcióban (index.html, en/index.html) - egyetlen 2 hely az oldalon, ahol térkép volt.
- share.google rövid linket a proxy blokkolja (google.com/share.google policy denial), és amúgy sem alkalmas iframe-beágyazásra (csak kattintható link lenne). Nincs rögzített utcai cím a projektben (séma csak "Göteborg" város-szintű).
- Felhasználó megadta a valódi Google Maps "Embed a map" iframe kódot -> cím dekódolva: Bärbyvägen, 423 73 Göteborg.
- Lecserélve mindkét meglévő térkép-előfordulás (SV index.html, EN en/index.html) a valódi Google Maps embed pb= URL-re, nyelvi paraméter (hl) svédre/angolra állítva a hu helyett. A .map-wrap CSS reszponzívan kezeli a méretezést, nem kellett hozzányúlni.
- Sandbox proxy blokkolja a google.com-ot -> nem tudtam vizuálisan renderelni itt, csak strukturálisan ellenőrizni (érvényes URL, 1 előfordulás/fájl, iframe attribútumok). Élesben normálisan be fog töltődni.

## 2026-07-27 — AEO-mélyítés: táblázatok, HowTo séma, forráshivatkozások + /omraden optimalizálás

### Blogcikkek AEO-javítása (a "bónusz" klaszter-összekötés kihagyva, ahogy kérve volt)
1. VALÓDI <table> az áraknak (AI-motorok a szemantikus táblázatokat tudják kiemelni, a div/ul-t nehezebben):
   - Új .price-table CSS mindkét stíluslapba (src + minified), márka sötét témához illesztve.
   - 4 cikk kapott valódi <table>-t: blogg/dodsbo-pris-goteborg, en/blog/estate-clearance-cost-gothenburg,
     blogg/tomma-hus-goteborg, en/blog/clearing-a-house-gothenburg. <caption>, <thead>, scope="row/col".
2. HowTo séma a lépés-alapú tartalmakhoz (eddig SEHOL nem volt):
   - blogg/tomma-hus-goteborg + en párja (7 lépés), tjanster/dodsbotomning-i-goteborg + en párja (5 lépés).
   - FONTOS: a séma lépései SZÓ SZERINT a látható tartalmat tükrözik (ellenőrizve scripttel) - eltérő séma
     spam-jelzés lenne. Az első körben az EN service-oldalnál kitalált fordítást használtam, javítva a valós
     látható szövegre ("Empathetic first call", "Review of belongings" stb.).
3. Hiteles kimenő hivatkozások (E-E-A-T): Skatteverket-linkek a bouppteckning/RUT állításokhoz
   5 kulcsoldalon. Korábban 2 fájlban volt link, most 7-ben.

### /omraden + en/areas teljes AEO/SEO optimalizálás
- KRITIKUS AEO-hiba javítva: a 12 területlink JS-ből (data-area-grid, innerHTML=) töltődött, tehát a nyers
  HTML-ben NEM volt benne -> a JS-t nem futtató AI-crawlerek ÜRES oldalt láttak. Most statikusan bent van a
  HTML-ben, a JS ugyanazzal a markuppal írja felül (progressive enhancement, vizuálisan nulla változás).
- ItemList séma a 12 területtel (mindkét nyelven) - strukturált lista az AI-nak.
- BreadcrumbList séma hozzáadva (mindkét oldalon teljesen HIÁNYZOTT).
- Meta description konkretizálva területnevekkel.
- H1 a felhasználó kifejezett kérésére: "Tömning i hela Västra Göteborg". JELEZVE NEKI: kannibalizációs
  kockázat a /omraden/vastra-goteborg aloldallal, ami ugyanerre a kulcsszóra megy. A lead bekezdést
  kiegészítettem, hogy az oldal ne legyen félrevezető (a teljes régiót is megemlíti).
- Ellenőrzés: minden JSON-LD érvényes, 0 törött link, Playwright: 12 area-card renderel, 0 JS-hiba,
  táblázat helyesen jelenik meg a sötét témában.
