# AI Tracker HU — AI kereső láthatóság monitor

**Tulajdonos:** TD-AI & Marketing (tdaimarketing.hu)  
**Státusz:** MVP fejlesztés alatt

## Egy mondatban

Havi SaaS, ami megmutatja: a céged megjelenik-e a ChatGPT, Perplexity, Gemini és Google AI válaszaiban — magyar kulcsszavakra, javítási javaslatokkal.

## Probléma

- KKV-k nem tudják, az AI keresők említik-e őket
- Nincs magyar AEO monitor eszköz
- Az ügynökségek „AI SEO"-t ígérnek, de nincs mérhető riport

## Megoldás

| Funkció | MVP | v2 |
|---------|-----|-----|
| Domain + kulcsszó regisztráció | ✅ | |
| Havi AI említés scan (4 platform) | ✅ | |
| Említés / nem említés riport | ✅ | |
| Javasolt javítások (E-E-A-T checklist) | ✅ | |
| Email havi riport | ✅ | |
| Versenytárs összehasonlítás | | ✅ |
| Automatikus heti scan | | ✅ |
| Ügynökség multi-domain (10+) | | ✅ |
| llms.txt generátor | | ✅ |

## Árazás

| Csomag | Ár | Mit kap |
|--------|-----|---------|
| **Audit** | 14 900 Ft | Egyszeri scan + PDF riport |
| **Monitor** | 19 900 Ft/hó | 1 domain, 10 kulcsszó, havi riport |
| **Agency** | 79 900 Ft/hó | 10 domain, white-label riport |

## Tech stack

- Next.js 16 App Router + TypeScript
- Supabase / Neon Postgres
- Stripe billing
- Scan engine: OpenAI + Perplexity API (+ manuális fallback Gemini)
- PDF riport generálás (react-pdf vagy markdown → PDF)
- Cron (Vercel Cron / Inngest) havi scan

## Scan flow (MVP)

```
1. User adds domain + 5-10 magyar kulcsszavak
2. Cron: each keyword → prompt each AI platform
3. Parse: brand/domain mentioned? cited? position?
4. Store results → dashboard + email
5. Generate recommendations from ai-seo skill checklist
```

## Go-to-market

1. tdaimarketing.hu saját domain = proof
2. „Első magyar AI kereső monitor" PR
3. Upsell: AEO csomag (179k projekt) ha javítás kell
4. directory-submissions: Product Hunt, magyar startup listák

## Skill-ek fejlesztéshez

- `ai-seo`, `saas-scaffolder`, `pricing`, `launch`, `directory-submissions`, `schema`

## MVP roadmap (8 hét)

| Hét | Deliverable |
|-----|-------------|
| 1-2 | Auth, domain/keyword CRUD, landing |
| 3-4 | Scan engine (OpenAI + Perplexity) |
| 5 | Dashboard: említések, trend |
| 6 | PDF riport + email |
| 7 | Stripe + plan limits |
| 8 | Beta 10 domain, tdaimarketing.hu case study |
