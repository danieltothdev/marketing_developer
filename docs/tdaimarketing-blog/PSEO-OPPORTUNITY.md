# Opportunity Analysis — tdaimarketing.hu blog (site-2)

*Forrás: élő site-2 blogindex (2026-08-17). Playbook: Comparisons + HowTo hub. Következő hullám: Personas × Locations — csak egyedi adatokkal.*

## Üzleti kontextus

- **Termék:** TD-AI ügyfélszerző rendszer (Google Ads, Meta, landing, chatbot, automatizáció, mérés)
- **Olvasó:** KKV tulajdonos Debrecen / Hajdú-Bihar / országosan
- **Konverzió:** ingyenes konzultáció, telefon (+36 30 352 7975), ajánlatkérő űrlap
- **Domain authority:** helyi / KKV niche — 20 vékony iparág×város oldal **nem** megy élesbe adat nélkül

## Meglévő klaszterek (site-2)

| Playbook | Meglévő cikkek | Hiány |
|----------|----------------|-------|
| Comparisons | Google Ads vs Facebook | Mérési hub nincs |
| HowTo | 10 ügyfél / 30 nap, landing, automatizáció 1–2 | **Konverziómérés (GA4 + hívás + űrlap)** önálló cikk nincs |
| Locations | Helyi SEO 1–3, Cégprofil, értékelések | Iparág×város oldalak nincsenek |
| Personas | Kivitelező chatbot | Fogászat, klíma, ügyvéd, szépségipar hiányzik |
| Glossary / AEO | SEO+AEO 2026, SEO szakértő | Mérési szótár (esemény, lead, CPA) hiányzik |
| Curation | 5 marketing hiba | — |

## Most épített oldal (1. hullám)

| Mező | Érték |
|------|--------|
| Playbook | HowTo + FAQ + Glossary (hub) |
| Slug | `blog-konverziomeres-kkv-ajanlatkeres-2026` |
| Kulcsszó | konverziómérés KKV, GA4 ajánlatkérés, Google Ads telefonhívás mérés |
| Egyedi érték | 7 lépéses mérés-setup, Debrecen klíma példa, mit NE mérj, belső link a site-2 klaszterre |
| Thin-content kockázat | Alacsony — 1 oldal, saját folyamat + helyi példa |

## 2. hullám (csak ha van egyedi adat)

Site-2 lapos slug (nem `/blog/` almappa):

`https://tdaimarketing.hu/blog-{szolgaltatas}-marketing-{varos}-2026`

20 kombináció (5 iparág × 4 város) — pattern score 100, de **ne generáld**, amíg nincs helyi árkeret, SLA és 1 saját példa. Ha csak a városnév cserélődik, doorway page lesz.

## Pre-launch checklist (ez a cikk)

- [x] Egyedi érték, nem sabloncsere
- [x] Keresési szándék: „hogyan mérjem, mi hoz ügyfelet”
- [x] Title, meta, canonical
- [x] H1–H2, FAQ
- [x] JSON-LD: BlogPosting + FAQPage + HowTo + BreadcrumbList
- [x] Belső linkek
- [ ] Feltöltés a site-2 gyökerébe + kártya a `blog` indexre + sitemap
- [ ] Rich Results teszt éles URL-en

## Post-launch monitoring

| Metrika | Eszköz | Riasztás | Ritmus |
|---------|--------|----------|--------|
| Indexálás | GSC | 14 nap után nincs index | hetente |
| Megjelenés / CTR | GSC | CTR < 2% 100+ imp. | 30 nap |
| Ajánlatkérés a cikkből | GA4 | 0 konverzió 60 nap | havonta |
| AI idézés | ChatGPT / Perplexity | nincs említés 90 nap | negyedévente |
