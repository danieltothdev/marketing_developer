# Claude Code plugin marketplace — claude-code-skills

Ez a repo a [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills)
marketplace-t használja (marketplace neve: **`claude-code-skills`**, 88 plugin, MIT licenc).

A `.claude/settings.json` már tartalmazza a marketplace-t és a bekapcsolt plugineket, így
**aki megnyitja ezt a repót és megbízik a mappában, annak automatikusan felkerülnek** — nem kell
kézzel futtatni semmit. Az alábbi parancsok akkor kellenek, ha máshol (globálisan) is akarod őket.

## Marketplace hozzáadása

```
/plugin marketplace add alirezarezvani/claude-skills
```

## Telepítés domain szerint

```
/plugin install engineering-skills@claude-code-skills           # 32 core engineering
/plugin install engineering-advanced-skills@claude-code-skills  # 37 POWERFUL-tier
/plugin install product-skills@claude-code-skills               # 13 product skill
/plugin install marketing-skills@claude-code-skills             # 47 marketing skill
/plugin install ra-qm-skills@claude-code-skills                 # 14 regulatory / quality
/plugin install pm-skills@claude-code-skills                    # 9 projektmenedzsment
/plugin install c-level-skills@claude-code-skills               # 33 C-level advisory (teljes C-suite)
/plugin install business-growth-skills@claude-code-skills       # 5 business & growth
/plugin install finance-skills@claude-code-skills               # 3 finance (analyst + SaaS metrics + investment)
```

## Egyedi skill / eszköz pluginek

```
/plugin install pw@claude-code-skills                     # Playwright testing toolkit
/plugin install self-improving-agent@claude-code-skills   # auto-memory kurálás
/plugin install security-guidance@claude-code-skills      # security PreToolUse hook
```

## Áttekintés

| Plugin | Tartalom | Verzió |
|--------|----------|--------|
| `engineering-skills` | architektúra, frontend, backend, fullstack, QA, DevOps, security, AI/ML, data engineering | 2.9.0 |
| `engineering-advanced-skills` | agent designer, agent workflow designer, RAG architect, database / schema designer | 2.9.0 |
| `product-skills` | product fork-orchestrator, continuous-discovery loop, 22 Python tool | 2.11.1 |
| `marketing-skills` | 8 pod: Content, SEO & AEO, CRO, Channels, Growth, Intelligence, Sales enablement, X/Twitter | 2.9.0 |
| `ra-qm-skills` | HealthTech/MedTech: ISO 13485, MDR 2017/745, FDA 510(k)/PMA | 2.9.0 |
| `pm-skills` | agentic delivery loop, 15 Python tool | 2.11.1 |
| `c-level-skills` | virtuális igazgatóság: CEO, CTO, COO, CPO, CMO, CFO, CRO, CISO, CHRO + GC, CDO, CAIO, CCO, VPE | 2.9.0 |
| `business-growth-skills` | customer success, sales engineer, revenue ops, contract & proposal writer | 2.9.0 |
| `finance-skills` | financial analyst, SaaS metrics coach, business investment advisor | 2.9.0 |
| `pw` | Playwright: 9 skill, 3 agent, 55 template, TestRail + BrowserStack MCP | 2.9.0 |
| `self-improving-agent` | `/si:` slash parancsok, learningök promótálása CLAUDE.md-be | 2.9.1 |
| `security-guidance` | 12 security anti-pattern elkapása Edit/Write előtt | 2.9.0 |

## Kikapcsolás

A `.claude/settings.json`-ben állítsd `false`-ra a nem kellő plugint, pl.:

```json
"ra-qm-skills@claude-code-skills": false
```

vagy futtasd: `/plugin` → **Manage plugins**.

## Megjegyzés a marketplace jelenlegi állapotáról

A marketplace időközben változott, ezért három korábban keringő plugin-név **nem létezik** benne
(`/plugin install` hibát adna rájuk), a legközelebbi megfelelőjükkel helyettesítettük:

| Nem létező név | Helyette |
|----------------|----------|
| `playwright-pro` | `pw` |
| `skill-security-auditor` | `security-guidance` |
| `content-creator` | benne van a `marketing-skills` Content podjában (külön pluginként nincs) |

A skill-darabszámok is nőttek a régebbi listához képest (pl. marketing 43 → 47, C-level 28 → 33);
a fenti táblázat a marketplace aktuális `marketplace.json`-jét tükrözi.

## Frissítés

```
/plugin marketplace update claude-code-skills
```
