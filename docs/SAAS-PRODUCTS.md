# TD-AI SaaS Products

Két SaaS termék MVP fejlesztés alatt — TD-AI & Marketing (tdaimarketing.hu).

| Termék | Mappa | Port (dev) | Leírás |
|--------|-------|------------|--------|
| **ChatWhite** | `apps/chatwhite/` | 3000 | White-label AI chatbot KKV-knak |
| **AI Tracker HU** | `apps/ai-tracker/` | 3001 | AI kereső láthatóság monitor |

## Indítás

```bash
# ChatWhite
cd apps/chatwhite && cp .env.example .env.local && npm run dev

# AI Tracker (másik terminál, port 3001)
cd apps/ai-tracker && cp .env.example .env.local && npm run dev -- -p 3001
```

## Dokumentáció

- [ChatWhite PRODUCT.md](apps/chatwhite/PRODUCT.md)
- [AI Tracker PRODUCT.md](apps/ai-tracker/PRODUCT.md)

## Landing oldalak (skills)

Mindkét termék landingje újraírva conversion-focused struktúrával:

| Skill | Használat |
|-------|-----------|
| `copywriting` + `copy-frameworks` | PAS / BAB headline, section flow, CTA copy |
| `cro` | Egy primary CTA, trust near CTA, FAQ objection handling |
| `marketing-psychology` | Loss aversion, specificity, risk reversal |
| `pricing` | Ajánlott tier kiemelés, value metric framing |
| `offers` | Value equation, 14 nap / audit risk reversal |
| `schema` | SoftwareApplication + FAQPage JSON-LD |
| `ai-seo` | Extractable answer block, comparison table (AI Tracker) |
| `landing-page-generator` | Next.js section order, SEO meta |
| `product-marketing` | TD-AI hang, KKV nyelv |

## Következő lépések

1. Supabase/Neon DB + Drizzle schema implementálás
2. NextAuth + Stripe
3. ChatWhite: OpenAI chat + widget.js
4. AI Tracker: scan engine + PDF riport
