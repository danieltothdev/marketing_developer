# ChatWhite — White-label AI chatbot SaaS

**Tulajdonos:** TD-AI & Marketing (tdaimarketing.hu)  
**Státusz:** MVP fejlesztés alatt

## Egy mondatban

Beágyazható, magyar nyelvű AI chatbot KKV-knak és white-label partnereknek (más ügynökségek) — 24/7 lead gyűjtés, email/SMS értesítés, saját branding.

## Probléma

- KKV-k hétvégén/este veszítik el a megkereséseket
- Nincs egyszerű magyar chatbot megoldás alacsony áron
- Ügynökségek chatbotot adnának el, de nincs white-label platform

## Megoldás

| Funkció | MVP | v2 |
|---------|-----|-----|
| Beágyazható widget (1 sor script) | ✅ | |
| Magyar AI válasz (OpenAI/Claude) | ✅ | |
| Lead gyűjtés (név, telefon, email) | ✅ | |
| Email értesítés tulajnak | ✅ | |
| Admin dashboard | ✅ | |
| White-label (logo, szín, domain) | | ✅ |
| CRM webhook (Zapier, Sheets) | | ✅ |
| SMS értesítés | | ✅ |
| Több oldal / több bot | | ✅ |

## Árazás

| Csomag | Ár | Mit kap |
|--------|-----|---------|
| **Start** | 7 990 Ft/hó | 1 bot, 500 üzenet/hó, TD-AI branding |
| **Pro** | 14 990 Ft/hó | 1 bot, korlátlan üzenet, saját színek, CRM webhook |
| **Partner** | 99 900 Ft/hó | 20 bot, white-label, saját aldomain |

## Tech stack

- Next.js 16 App Router + TypeScript
- Supabase (auth + Postgres) vagy Neon + NextAuth
- Stripe billing
- OpenAI API (magyar system prompt)
- Resend (email értesítések)

## Adatmodell (MVP)

```
organizations → users → bots → conversations → messages → leads
organizations: white_label settings (partner tier)
```

## Go-to-market

1. tdaimarketing.hu chatbot ügyfelek → első beta
2. Debrecen helyi KKV-k
3. Magyar marketing ügynökségek (Partner tier)
4. Upsell: Start csomag (80k/hó) ha kell hirdetés is

## Skill-ek fejlesztéshez

- `saas-scaffolder`, `onboarding`, `churn-prevention`, `paywalls`, `stripe-integration-expert`

## MVP roadmap (6 hét)

| Hét | Deliverable |
|-----|-------------|
| 1 | Auth, org, bot CRUD, landing |
| 2 | Widget embed + chat API |
| 3 | Lead capture + email notify |
| 4 | Stripe + plan limits |
| 5 | Admin analytics (üzenetek, leadek) |
| 6 | Beta 5 ügyfél, white-label prep |
