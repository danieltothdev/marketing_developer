# Miért 404? — és mit tölts fel a Rackhostra

A `https://tdaimarketing.hu/blog-konverziomeres-kkv-ajanlatkeres-2026` **404**, mert a cikk a `marketing_developer` GitHub-repóban készült el. Az éles oldal **Rackhost** statikus HTML (`RHProxy`). Ebből a Cloud Agentből **nincs FTP / cPanel belépés**, ezért a fájl magától nem került a szerverre.

A többi blog is így él: pl. `blog-10-uj-ugyfel-30-nap-kkv-strategia.html` a tárhely gyökerében (kiterjesztés nélkül is megy).

## 4 fájl — másold a tárhely **document root**-jába

Mappa a repóban: `docs/tdaimarketing-blog/rackhost/`

| Helyi fájl | Hova a Rackhoston |
|------------|-------------------|
| `blog-konverziomeres-kkv-ajanlatkeres-2026.html` | gyökér (public_html / www), **ugyanoda**, ahol a többi `blog-*.html` van |
| `assets/blog-konverziomeres-kkv-ga4.jpg` | `assets/` mappa |
| `blog.html` | gyökér — **felülírja** a bloglistát (új kártya felül) |
| `sitemap.xml` | gyökér — új URL hozzáadva |

## Rackhost / cPanel

1. Lépj be: [admin.rackhost.hu](https://admin.rackhost.hu) → tárhely → **Fájlkezelő** (vagy FTP).
2. Menj a `public_html` (vagy `httpdocs`) mappába.
3. Töltsd fel a 4 fájlt a fenti helyekre. A `blog.html` és `sitemap.xml` cserélhető.
4. Nyisd meg: https://tdaimarketing.hu/blog-konverziomeres-kkv-ajanlatkeres-2026  
   (ha még 404: a fájlnévben legyen `.html`, a szerver MultiViews/rewrite elhagyja a kiterjesztést.)
5. Google Search Console → URL-ellenőrzés → indexelés kérése.

## Site-2 Cursor projekt

Ha a site-2 a gépeden van, másold ugyanezeket oda, **aztán** töltsd fel a tárhelyre. A site-2 mappa önmagában nem a tdaimarketing.hu szerver.
