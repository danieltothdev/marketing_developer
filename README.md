# marketing_developer — TD-AI Marketing Ügynökség

AI-powered marketing workspace for [tdaimarketing.hu](https://tdaimarketing.hu).

## Alap: marketing-skills

Minden marketing feladat a **marketing-skills** routerrel indul:

```
/marketing-skills
```

Vagy chatben:
```
Using marketing-skills, [a feladatod]
```

### Kontextus

A brand és ICP itt van: `.claude/product-marketing-context.md`

Minden marketing skill ezt olvassa automatikusan.

## Gyakori skill-ek TD-AI-hoz

| Feladat | Skill |
|---------|-------|
| SEO audit (ügyfél / saját oldal) | `seo-audit` |
| Google Cégprofil, helyi SEO | `local-seo-manager` |
| AI keresőoptimalizálás | `aeo` |
| Google/Meta kampány | `paid-ads` |
| Blog, SEO cikk | `content-production` |
| Landing oldal | `landing` |
| Konverzió javítás | `page-cro` |
| GA4/GTM setup | `analytics-tracking` |
| Ügyfélajánlat | `contract-and-proposal-writer` |

## Cursor Skills

Két marketing skill könyvtár telepítve — csak ebben a repóban aktív:

| Könyvtár | Hely | Db | Forrás |
|----------|------|-----|--------|
| claude-skills | `.cursor/skills/` | 342 | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) |
| marketingskills | `.agents/skills/` | 49 | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |

```bash
# marketingskills frissítés
npx skills add coreyhaines31/marketingskills -y

# Egy skill telepítése
npx skills add coreyhaines31/marketingskills --skill cro copywriting

# Elérhető skill-ek listája
npx skills add coreyhaines31/marketingskills --list
```

### Frissítés

```bash
git clone https://github.com/alirezarezvani/claude-skills.git
cd claude-skills && ./scripts/convert.sh --tool windsurf
cp -R integrations/windsurf/skills/. ../.cursor/skills/
```

Source: [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) (MIT)
