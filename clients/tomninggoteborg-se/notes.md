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

## Következő lépések (SEO/indexelési terv vázlat)
1. ~~Redirect-térkép lezárása~~ → **kész a `.htaccess`-ben (2026-07-10)**, de Dánielnek fel kell töltenie
   élesre (WinSCP/SFTP a Rackhost/jelenlegi szerverre) — helyben a repóban lévő fájl önmagában nem él.
2. ~~FAQ + blog tartalom pótlása~~ → **kész (2026-07-10)**, szintén feltöltésre vár élesre
   (`faq.html`, `blogg/` mappa, frissített `.htaccess`, `sitemap.xml`, és a 31 nav-frissített oldal).
3. Search Console: property hozzáadása/ellenőrzése (ha még nincs) az élő domainre, sitemap újra
   beküldése (a 4 új URL miatt is), a redirectek után pár nappal ellenőrizni a "Kizárva" riportot.
4. Structured data (LocalBusiness/Schema) ellenőrzése/kiegészítése minden oldaltípuson.
5. Belső linkelés és NAP (Name/Address/Phone) konzisztencia ellenőrzése az oldalakon és a Google Cégem
   profillal.
6. "tömma dödsbo göteborg" célkulcsszóra dedikált landing oldal (korábban egyeztetett, Cursor prompt
   kész volt hozzá) — ellenőrizni, hogy ez a build már tartalmazza-e (`dodsbotomning-i-goteborg.html`
   erre utalhat, meg kell nézni tartalmilag).
