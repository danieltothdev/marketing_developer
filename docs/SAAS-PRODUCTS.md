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

## Következő lépések

1. Supabase/Neon DB + Drizzle schema implementálás
2. NextAuth + Stripe
3. ChatWhite: OpenAI chat + widget.js
4. AI Tracker: scan engine + PDF riport
