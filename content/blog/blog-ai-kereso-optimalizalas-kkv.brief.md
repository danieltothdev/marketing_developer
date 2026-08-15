# Content brief — AI keresőoptimalizálás (AEO) KKV-knak

*Készült: 2026-08-15 · Skillek: `content-production` (Mode 1–3), `ai-seo`, `aeo`, `schema-markup`, `td-ai-marketing-brand`*

| | |
|---|---|
| **Fájl** | `blog-ai-kereso-optimalizalas-kkv.html` |
| **Javasolt URL** | `https://tdaimarketing.hu/blog-ai-kereso-optimalizalas-kkv` |
| **Title (50 kar.)** | AI keresőoptimalizálás (AEO) KKV-knak \| TD-AI 2026 |
| **Meta description (152 kar.)** | Az ügyfeleid már a ChatGPT-t és a Google AI-t kérdezik. Így kerül be a céged az AI keresők válaszaiba: 7 lépés, ellenőrzőlista, mérés — magyar KKV-knak. |
| **Szószám** | 1 974 szó (~9 perc) |
| **Cikktípus** | Definitive guide + HowTo — az AI-idézettség szempontjából a két legjobban teljesítő formátum |

## Kulcsszavak

| Szerep | Kulcsszó | Előfordulás a cikkben |
|---|---|---|
| Elsődleges | AI keresőoptimalizálás | 5× (+ title, H1, meta, URL) |
| Elsődleges rövidítés | AEO | 17× |
| Másodlagos | ChatGPT / Perplexity / Google AI Overview | 9× / 7× / 4× |
| Másodlagos | answer engine optimization, GEO | 1–2× (definíciós blokkban) |
| Long-tail | „hogyan találjon meg a ChatGPT”, „AI kereső láthatóság”, „AI keresőoptimalizálás KKV” | H1 + alcímek |
| Támogató (entitás) | schema markup, llms.txt, robots.txt, GPTBot, Google Cégprofil, GA4 | 7× / 2× / 4× / 1× / 7× / 3× |
| Brand / helyi | KKV, Debrecen, ajánlatkérés | 6× / 2× / 3× |

**Szándékos kerülés:** kulcsszóhalmozás. A GEO-kutatás (KDD 2024) szerint ez az egyetlen mért beavatkozás, ami *csökkenti* az AI-láthatóságot (kb. −10%), ezért a sűrűség tudatosan alacsony.

## Miért ez a téma

- **Nincs kannibalizáció.** A meglévő `/blog-ai-ugynokseg-valasztas-2026` cikk az ügynökség-választásról szól (commercial intent). Ez a cikk informational/how-to, más kulcsszócsoport, és belinkeli a másikat.
- **Differenciál.** Az „AI-támogatott" pozicionálás bizonyítéka: olyan témában adunk konkrét lépéseket, amiben a magyar versenytársak többsége még nincs jelen.
- **Termékkapcsolat.** Közvetlenül előkészíti az AI Tracker HU (AI kereső láthatóság monitor) MVP-t — a cikk 7. lépése pontosan az a probléma, amit a termék automatizál.

## Struktúra (AEO-blokkok)

| Szekció | Blokktípus | Miért |
|---|---|---|
| „Rövid válasz" doboz | summary box, ~60 szó | Kiemelhető passzus a lead alatt |
| Mi az AEO? | definition block | „Mi az…" típusú kérdésekre |
| Miért számít? | attributed stat block | Pew + GEO adat forrással |
| SEO vs AEO | comparison table | „X vs Y" kérdésekre |
| 7 lépés | numbered HowTo | „Hogyan…" kérdésekre |
| Ellenőrzőlista | checklist | Kiemelhető, menthető |
| Mérés | table | GA4/Search Console konkrétumok |
| 5 hiba | negative list | Ellentétes szándékú keresésekre |
| GYIK | FAQ block | Természetes nyelvű kérdések |

## Strukturált adat (JSON-LD)

`Organization` · `BlogPosting` · `HowTo` (7 lépés) · `FAQPage` (5 kérdés) · `BreadcrumbList` — mind valós, ellenőrizhető adat.

## Források (minden állítás mögött link van)

1. [Google Search Central — AI features optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) — nincs szükség külön AI-tartalomra/jelölésre
2. [Pew Research Center, 2025. július](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) — 8% vs 15% átkattintás
3. [Aggarwal et al., „GEO: Generative Engine Optimization", KDD 2024](https://arxiv.org/abs/2311.09735) — beavatkozások hatása
4. [llmstxt.org](https://llmstxt.org) — llms.txt specifikáció

Ügyféleredményt, számlálót, véleményt **nem** tartalmaz a cikk — csak a `product-marketing-context.md`-ben rögzített, valós adatok (7–14 nap, 2–4 hónap, árak).

## Belső linkek

| Cél | Horgonyszöveg | Hol |
|---|---|---|
| `/google-ads-kezeles-debrecen` | Google Ads kezelés | GYIK |
| `/meta-hirdetes` | Meta hirdetés | GYIK |
| `/weboldal-keszites-debrecen` | weboldal vagy landing | GYIK |
| `/marketing-automatizacio` | marketing automatizáció | Mérés szekció |
| `/blog-ai-ugynokseg-valasztas-2026` | AI marketing ügynökség: mit csinál valójában? | Szerzői doboz |

**Fordított irányban is linkelni kell** (a legerősebb meglévő oldalakról erre a cikkre) — enélkül a cikk nem kap belső link-erőt.

## Publikálás előtti teendők Dánielnek

1. **Hero kép** — `assets/ai-kereso-optimalizalas-hero.jpg` (JPEG q88, max 1600px). Amíg nincs, arany fallback doboz jelenik meg, az oldal nem törik el.
2. **Make.com webhook** — a `<script>` blokkban a kommentelt `fetch` URL-jét kell kitölteni, a form addig csak konzolra ír.
3. **Kanonikus URL** ellenőrzése, ha más slugot használsz.
4. **A saját `robots.txt`-t is nézd meg** — a cikk 1. lépését illik betartani annak, aki írja.

## CTA-lánc

Ingyenes konzultáció / audit 69 000 Ft-tól. Az űrlapra terelés 4 ponton: középső callout → GYIK ár-kérdés → űrlap szekció → záró CTA. Plusz lebegő WhatsApp gomb és fejléc-telefonszám.
