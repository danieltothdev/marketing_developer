# TD-AI Marketing — Agent Instructions

This repository is configured for **TD-AI & Marketing Ügynökség** (https://tdaimarketing.hu). Marketing work is the default mode.

## Default skill: marketing-skills

For any marketing-related task, start from the **marketing-skills** router (`.cursor/skills/marketing-skills/SKILL.md`):

1. Read `.claude/product-marketing-context.md` and `.agents/product-marketing.md` before any marketing output.
2. Route to **one** specialist skill per task — never bulk-load multiple skills.
3. If the request is ambiguous, use **marketing-ops** to pick the right skill.

## Skill libraries (two sources)

| Library | Location | Count | Source |
|---------|----------|-------|--------|
| **claude-skills** | `.cursor/skills/` | 342 | alirezarezvani/claude-skills |
| **marketingskills** | `.agents/skills/` | 49 | coreyhaines31/marketingskills |

When both libraries have a similar skill, prefer **marketingskills** (`.agents/skills/`) for CRO, copy, ads, SEO — they include evals and v2 workflows. Use **claude-skills** for TD-AI-specific tools (local-seo-manager, landing, contract-and-proposal-writer, Hungarian agency workflows).

### marketingskills highlights (coreyhaines31)

| Task | Skill (`.agents/skills/`) |
|------|---------------------------|
| CRO (any page) | `cro` |
| Google/Meta ads strategy | `ads` |
| Ad copy at scale | `ad-creative` |
| AI search / AEO | `ai-seo` |
| GA4 / GTM | `analytics` |
| Marketing plan | `marketing-plan` |
| Expert panel review | `marketing-council` |
| Prospecting list | `prospecting` |
| Cold email | `cold-email` |
| Sales deck / one-pager | `sales-enablement` |
| Lead magnets | `lead-magnets` |
| RevOps / MQL handoff | `revops` |
| Short-form video | `social` |
| AI video production | `video` |

## Routing quick reference

| Task | Skill |
|------|-------|
| SEO audit | `seo-audit` |
| Helyi SEO / Google Cégprofil | `local-seo-manager` |
| AI kereső (ChatGPT, Perplexity) | `aeo` |
| Google/Meta hirdetés | `paid-ads` |
| Hirdetéskreatív | `ad-creative` |
| Blog, cikk írás | `content-production` |
| Tartalom stratégia | `content-strategy` |
| Landing copy | `copywriting` |
| Landing oldal (HTML) | `landing` |
| Landing oldal (React) | `landing-page-generator` |
| Konverzió optimalizálás | `page-cro` |
| GA4 / GTM beállítás | `analytics-tracking` |
| Kampány riport | `campaign-analytics` |
| Social poszt | `social-content` |
| Ügyfélajánlat / SOW | `contract-and-proposal-writer` |
| Schema markup | `schema-markup` |

## Language

- Default output language: **Hungarian** (unless the user asks otherwise).
- Brand voice: direct, KKV-friendly, measurable results — see product-marketing-context.md.

## Non-marketing tasks

For engineering, product, or other non-marketing work, use the appropriate specialist skill from `.cursor/skills/` — but always check if a marketing skill applies first when the task touches campaigns, content, SEO, or client deliverables.

## Slash command

`/marketing-skills` → load marketing-skills router and read product-marketing-context.md, then route to the best specialist skill.

## Cursor Cloud specific instructions

This repo is primarily a marketing skills workspace, but the only runnable code is two
Next.js 16 (App Router, Turbopack, React 19) SaaS MVPs under `apps/`. The startup update
script already runs `npm ci` in each app, so `node_modules` are present when a session
starts.

| App | Path | Dev port | Core functionality |
|-----|------|----------|--------------------|
| ChatWhite | `apps/chatwhite` | 3000 | Widget chat API `POST /api/chat` + landing/dashboard |
| AI Tracker HU | `apps/ai-tracker` | 3001 | Scan API `POST /api/scan` + landing/dashboard |

- Run/lint/build/test commands are the standard Next.js scripts in each app's `package.json`
  (`npm run dev`, `npm run lint`, `npm run build`). There is no test script yet.
- Both apps must be run from their own directory. AI Tracker must be started on port 3001
  to avoid colliding with ChatWhite: `npm run dev -- -p 3001` (see `docs/SAAS-PRODUCTS.md`).
- No env vars are required for local dev. `docs/SAAS-PRODUCTS.md` mentions
  `cp .env.example .env.local`, but no `.env.example` exists and it is not needed — the apps
  run without it. The API routes are MVP stubs (no database, OpenAI, or Stripe wired yet).
  `api/scan` only enforces the `CRON_SECRET` bearer token when `NODE_ENV=production`.
- `npm ci` wipes and reinstalls `node_modules`; if you run it while a dev server is up,
  restart that dev server afterward.
