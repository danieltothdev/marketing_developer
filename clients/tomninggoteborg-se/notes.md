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
