# tomninggoteborg.se — Technikai SEO javítások összefoglalója
**Dátum:** 2026-07-11 · Alapja: az ügyfél Semrush-auditja (24 pont)

> Ez a fázis a **technikai** hibákra fókuszált (URL-struktúra, canonical, hreflang, structured
> data, belső linkek, sitemap, title/meta). A tartalmi bővítés, Core Web Vitals és analitika
> a következő, külön fázis (lásd lentebb).

## 1. Végleges URL-struktúra + redirect szabályok (audit 1, 3)
**Végleges struktúra:** `https` + `non-www` + kiterjesztés nélküli URL-ek, trailing slash nélkül;
kizárólag a könyvtár-főoldalak tartják a `/`-t (`/` és `/en/`).

A `.htaccess` újraírva, egy 301-es lépésben normalizál:
- `http → https`, `www → non-www`, `.html → extensionless`, `/index.html → /`, `/en/index.html → /en/`,
  hibás trailing slash → végleges URL.
- A kombinált hibák (pl. `www + .html` egyszerre) is **egyetlen 301-gyel** landolnak, nincs redirect chain.

**KRITIKUS javítás:** a `/omraden` és `/en/areas` végleges landing URL-ek **korábban törötten
(nem 200-zal) válaszoltak**, mert azonos nevű könyvtár (`omraden/`, `en/areas/`) elfedte a landing
fájlt. Most explicit szabály szolgálja ki őket 200-zal. Ugyanígy a `/blogg` is.

## 2. Canonical rendszer (audit 2)
Minden indexelhető oldalon pontosan egy, self-referencing canonical, ami közvetlen 200-as, végleges
(non-www, extensionless) URL-re mutat. Ellenőrizve: **egyetlen canonical sem** tartalmaz `www`-t vagy
`.html`-t, egyik sem hiányzik (66/66 oldal).

## 3. Hreflang (audit 4)
Minden oldalon self-referencing + kölcsönös SV↔EN hreflang, `x-default` a svéd oldalra.
A hreflang URL-ek végleges, 200-as canonical URL-ek (nincs `www`/`.html`/redirect). Azoknál az
oldalaknál, amiknek nincs nyelvi párja (FAQ, blogg), nincs mesterséges hreflang — csak `sv` + `x-default`.
**Külön javított bug:** a nyelvváltó (JS) korábban a `.html`-es útvonaltérképet használta, ezért
közvetlen (Google-ből érkező, extensionless) látogatásnál rossz oldalra vitt — most a végleges,
kiterjesztés nélküli megfelelő oldalra navigál.

## 4. Structured data / JSON-LD (audit 5, 8)
- Az `inLanguage` property kivéve a `LocalBusiness` objektumból (ott érvénytelen property volt);
  a `Service`/`BlogPosting` objektumokban maradt, ahol jogos.
- Egységes, stabil `@id` (`https://tomninggoteborg.se/#localbusiness`) minden oldalon — nincs
  „138 versengő vállalkozás", egyetlen, konzisztens entitás.
- **Új:** `BreadcrumbList` structured data minden oldalon (54 oldal), a látható breadcrumbbal
  összhangban, végleges canonical URL-ekkel.
- Minden JSON-LD blokk (121 db) szintaktikailag valid.

## 5. Belső linkek (audit 6, 7, 19)
- **Mind a 2096 belső link** átállítva relatív `.html`-esről **abszolút, végleges (extensionless)
  URL-re** — így egyetlen belső link sem mutat redirectre vagy `.html`-re. A `/en/areas/` típusú hibás
  trailing-slash linkek megszűntek.
- A JS-generált linkek (terület-rács, mobil CTA, nyelvváltó) is végleges URL-eket adnak.
- Breadcrumb: a `tjanster/` és `en/services/` oldalak megkapták a hiányzó középső szintet
  (Hem > Tjänster > … / Home > Services > …), ami egyben a hub-oldalra mutató belső linket is jelent.

## 6. Sitemap (audit 9)
A `sitemap.xml` kizárólag végleges, 200-as, canonical, extensionless URL-eket tartalmaz (66 db);
nincs benne `www`, `.html`, `index.html`, duplikátum vagy hibás trailing slash. A sitemap URL-jei
pontosan egyeznek a canonical + hreflang + belső link URL-ekkel.

## 7. Title / meta description (audit 10, 11)
- Nincs duplikált title (a korábbi `index.html` ↔ `tomning-i-goteborg.html` ütközés feloldva).
- Minden indexelhető oldalon van egyedi meta description (a hiányzó `integritetspolicy` pótolva).

## 8. Robots / crawlability (audit 20)
`robots.txt` rendben (`Allow: /`, sitemap hivatkozás); nincs Googlebot/Bingbot tiltás, nincs véletlen
`noindex` az indexelendő oldalakon.

## Milyen tesztekkel ellenőriztem
- **URL-routing:** Apache-utánzó szerverrel + szimulátorral az összes végleges URL és a hibás
  variánsok (www/http/.html/index.html/trailing-slash) átvizsgálva — minden végleges URL **200**,
  a variánsok **egyetlen 301-es** lépésben landolnak, nincs loop, nincs 404.
- **Belső linkek:** mind a 66 oldal 65 egyedi belső linkje végigcrawlolva — **0 db 404, 0 db
  redirectre mutató link.**
- **Böngésző (headless):** nyelvváltó SV↔EN (helyes megfelelő oldal), terület-rács renderelése,
  FAQ-nyitogatás, űrlap — működik, **0 JS console hiba**.
- **JSON-LD:** mind a 121 blokk valid.
- **Sitemap:** mind a 66 URL 200.

## Fontos a feltöltéskor (Dániel)
- A teljes `site/` mappa tartalmát kell WinSCP-vel a tárhely gyökerébe tölteni (felülírva a régit),
  **beleértve a `.htaccess`-t is**.
- A `.htaccess` használ `Options -MultiViews` és `DirectorySlash Off` sorokat. Ezeket a Hostinger
  jellemzően engedi; ha az első feltöltés után **500-as hibát** adna az oldal, ez a két sor a
  gyanús — a hosting error logból ellenőrizhető, és szükség esetén ezek eltávolíthatók (a
  `/omraden`, `/en/areas` kiszolgálása a `DirectorySlash Off`-ra épül, ezért ha az nem engedélyezett,
  szólj és átírom könyvtár-alapú megoldásra).
- Feltöltés után a Google Search Console-ban érdemes a `sitemap.xml`-t újra beküldeni.

## Következő fázis (NEM ebben a körben — tartalom + teljesítmény)
Az audit 7, 13–18, 21–23 pontjai tudatos, több hetes munkát igényelnek, üzleti prioritás szerint:
- Szolgáltatási/terület oldalak tartalmi megerősítése (egyedi helyi tartalom, RUT-infó, bizalmi elemek).
- BRF/B2B struktúra kiépítése, kontextuális belső linkháló, anchor-szöveg változatosság.
- Core Web Vitals: kép-optimalizálás (WebP/AVIF, srcset), CSS/JS minifikálás, flatpickr csak ott, ahol kell.
- GA4 / konverziómérés ellenőrzése (űrlap, telefon-, email-kattintás, B2B lead események).
