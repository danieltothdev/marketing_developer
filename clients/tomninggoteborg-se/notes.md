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

## Következő lépések (SEO/indexelési terv vázlat)
1. Redirect-térkép lezárása: régi Hostinger URL-ek → új statikus URL-ek, mind 301-gyel.
2. Search Console: property hozzáadása/ellenőrzése az új verzióhoz, sitemap beküldése, kulcsoldalak
   manuális "Indexelés kérése".
3. Structured data (LocalBusiness/Schema) ellenőrzése/kiegészítése minden oldaltípuson.
4. Belső linkelés és NAP (Name/Address/Phone) konzisztencia ellenőrzése az oldalakon és a Google Cégem
   profillal.
5. "tömma dödsbo göteborg" célkulcsszóra dedikált landing oldal (korábban egyeztetett, Cursor prompt
   kész volt hozzá) — ellenőrizni, hogy ez a build már tartalmazza-e (`dodsbotomning-i-goteborg.html`
   erre utalhat, meg kell nézni tartalmilag).
