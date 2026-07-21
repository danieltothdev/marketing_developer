# tomninggoteborg.se — Technikai SEO összefoglaló (FÁZIS 1: technikai)
**Utolsó frissítés:** 2026-07-11 · Alapja: az ügyfél Semrush-auditja + GSC exportok

> Ez a fázis a **technikai** hibákra fókuszált. A tartalmi bővítés (BRF/B2B), Core Web Vitals,
> CSS/JS minifikálás és analitika a következő fázis (lásd a végén).

---

## 1. Redirect szabályok (mind a `.htaccess`-ben)
**Kanonikus normalizálás — EGY 301-es lépésben (nincs chain, nincs loop):**
- `http → https`, `www → non-www`, `.html → extensionless`, `/index.html → /`, `/en/index.html → /en/`,
  hibás trailing slash → végleges URL. A kombinált hibák (pl. www+.html) is 1 ugrással landolnak.

**Legacy 301-ek (régi Hostinger URL → új oldal):**
- Szolgáltatás-slugok: `/tomning-goteborg → /tjanster/tomning-i-goteborg`, `/villatomning-goteborg →
  /tjanster/villatomning-i-goteborg` stb.
- **Városrész/kommun/region → terület-oldal (kb. 90 db):** `/stadsdel/kortedala → /omraden/orgryte-harlanda`,
  `/flyttfirma-lerum → /omraden/lerum`, `/kommun/kungalv → /omraden/kungalv`, a szolgáltatási területen
  kívüli régiók (`/region/uddevalla` stb.) → `/omraden`.
- **5 db 410 Gone:** szó szerinti hibás placeholderek (`/foretagsflytt-:slug`, `/omraden/:slug` stb.).
- Blog legacy slugok → új cikkek / blog főoldal.

**KRITIKUS javítás:** a `/omraden` és `/en/areas` végleges landing URL-ek korábban **törötten** válaszoltak
(az azonos nevű könyvtár elfedte a fájlt) — most explicit szabály szolgálja ki őket 200-zal (`/blogg`,
`/en/blog` szintén).

## 2. Végleges URL-struktúra
`https` + `non-www` + kiterjesztés nélküli URL-ek, trailing slash nélkül. Kizárólag a könyvtár-főoldalak
tartják a `/`-t: `https://tomninggoteborg.se/` és `https://tomninggoteborg.se/en/`.
Példa: `/tjanster/villatomning-i-goteborg`, `/omraden/kungalv`, `/blogg/vad-kostar-tomning-goteborg`,
`/en/services/villa-clearance-gothenburg`, `/en/blog/clearance-cost-gothenburg`.

## 3. Canonical
Minden indexelhető oldalon pontosan egy, self-referencing canonical, közvetlen 200-as, végleges
(non-www, extensionless) URL-re. Ellenőrizve: **0 db** canonical tartalmaz `www`-t vagy `.html`-t,
egyik sem hiányzik (73/73 oldal).

## 4. Hreflang
Minden oldalpáron kölcsönös + self-referencing SV↔EN hreflang, `x-default` a svéd oldalra. A hreflang
URL-ek végleges, 200-as canonical URL-ek (**0 db** `www`/`.html`). Nyelvi pár nélküli oldalakon (FAQ)
nincs mesterséges hreflang. **Külön bug javítva:** a JS nyelvváltó korábban a `.html`-es térképet
használta és extensionless URL-en rossz oldalra vitt — most a végleges megfelelőre navigál. Az `en/index.html`
JS-e rossz útvonalon (`js/` a `../js/` helyett) töltődött → az egész angol főoldal JS-e halott volt; javítva.

## 5. Structured data
- `inLanguage` kivéve a `LocalBusiness`-ből (ott érvénytelen); a Service/BlogPosting objektumban maradt.
- Egységes, stabil `@id` (`#localbusiness`) — egyetlen entitás, nem „138 versengő cég".
- **BreadcrumbList** minden oldalon; a `tjanster/`/`en/services/` breadcrumb 3-szintűvé téve.
- Minden JSON-LD blokk valid: **135 blokk, 0 hibás.**

## 6. Belső linkek
- Mind a **2096 belső link** relatív `.html`-esről abszolút, végleges (extensionless) URL-re állítva
  → egyetlen belső link sem mutat redirectre/`.html`-re. A `/en/areas/` típusú hibás trailing-slash
  linkek megszűntek. Ellenőrizve: 68 egyedi belső link, **0 redirect-célra mutat, 0 valós 404.**
- JS-generált linkek (terület-rács, mobil CTA, nyelvváltó) is végleges URL-eket adnak.

## 7. Sitemap
Kizárólag végleges, 200-as, canonical, extensionless URL (**73 db**); nincs `www`/`.html`/`index.html`/
duplikátum/hibás trailing slash. Egyezik a canonical + hreflang + belső link URL-ekkel. Ellenőrizve:
mind a 73 URL 200.

## 8. Title / meta description
Nincs duplikált title, minden indexelhető oldalon egyedi meta description. Ellenőrizve: **0 duplikátum,
0 hiányzó.**

## 9. Robots / crawlability
`robots.txt` rendben (`Allow: /` + sitemap). Nincs Googlebot/Bingbot tiltás, nincs véletlen `noindex`.

## 10. Új / módosított oldalak
- **Új:** `faq`, `blogg` (index + 4 cikk: dödsbo, professzionális projektek, ár-guide, checklista),
  teljes **EN blog** (`/en/blog` index + 4 cikk). Összes új oldal: űrlap + schema + breadcrumb + hreflang.
- **Módosítva:** minden oldal (canonical/hreflang/belső linkek/breadcrumb schema/nav), `.htaccess`,
  `sitemap.xml`, `js/i18n.js`, `js/main.js`, `index.html`, `en/index.html`.

## 11. Tesztek, amivel ellenőriztem
- **Apache-utánzó szerver + szimulátor:** minden végleges URL 200; defekt-variánsok (www/http/.html/
  index/trailing-slash) 1 db 301-gyel landolnak; nincs loop, nincs 404.
- **Fejlesztői böngésző (headless):** SV↔EN nyelvváltás helyes párokra (fő- és aloldalon, blogon is),
  terület-rács, FAQ-toggle, űrlap (11 mező renderel), **0 JS console hiba.**
- **Belső link crawl:** 0 redirect-célra mutató link, 0 valós 404.
- **JSON-LD:** 135 blokk, 0 hibás. **Sitemap:** 73/73 URL 200.

---

## Checklist-státusz (a te „mikor kész" listád ellen)
✅ = kész és ellenőrizve · 🔶 = FÁZIS 2 (külön kör) · ⚠️ = a szerveren/külső eszközön múlik

| Pont | Státusz |
|---|---|
| Minden végleges URL 200 | ✅ |
| HTTP→HTTPS / www→non-www / .html→extensionless / index.html→gyökér | ✅ (a `.htaccess`-ben) |
| Max 1 db 301, nincs chain/loop | ✅ (szimulátorral igazolva; éles Apache-on érdemes 1x visszamérni) |
| Nincs hibás belső link / redirectre mutató belső link | ✅ |
| Nincs fontos orphan page | ✅ (nav + belső linkháló minden oldalra) |
| Canonical helyes + self-referencing | ✅ |
| Hreflang kölcsönös + self-ref + 200-ra mutat | ✅ |
| SV/EN nem irányít hibásan egymásra | ✅ |
| Sitemap csak végleges 200 canonical URL | ✅ |
| Structured data valid | ✅ |
| Nincs duplicate title/meta | ✅ |
| Robots/crawlability helyes | ✅ |
| Design nem sérült + nyelvváltó működik | ✅ (headless böngészőben) |
| Minden űrlap működik | ✅ kliens oldalon renderel; ⚠️ a Supabase DB-mentés + email **élő teszt Dánieltől** (másik Supabase projekt, innen nem elérhető) |
| CSS/JS production assetek optimalizálva (minifikálás) | 🔶 FÁZIS 2 |
| Nincs szükségtelen broken resource | ✅ élesen (a Vite-maradvány csak a nem-deployolt `minta-oldalak-forrás/`-ban van) |
| Mobil/desktop működés | ✅ headless renderelés OK; ⚠️ valós eszközön Dániel nézze át |
| Konverziómérés (GA4) működik | 🔶 FÁZIS 2 (analitika audit) |
| Core Web Vitals / teljesítmény | 🔶 FÁZIS 2 |

## FÁZIS 2 (nem ebben a körben)
Tartalmi megerősítés (BRF/B2B struktúra, szolgáltatás-oldalak), Core Web Vitals (kép WebP/AVIF, srcset),
CSS/JS minifikálás + flatpickr csak ahol kell, GA4/konverziómérés audit.
