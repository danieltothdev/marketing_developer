# Skill-ek átvitele a site-2 projektbe

A Cloud Agent csak a `marketing_developer` repóhoz fér hozzá. A `site-2` GitHub repo ebből a futtatásból nem elérhető / nem létezik ezen a fiókon.

## Opció A — lokális másolás (ajánlott)

Ha a site-2 a gépeden van:

```bash
git clone https://github.com/danieltothdev/marketing_developer.git
cd marketing_developer
git checkout cursor/saas-landing-rewrite-fdf4   # vagy Marketing
./scripts/install-skills-into.sh /útvonal/a/site-2
```

## Opció B — Cloud Agent a site-2-n

1. Nyisd meg a site-2 projektet Cursorban / kösd GitHub repóhoz.
2. Indíts Cloud Agentet **azon a repón**.
3. Írd: „Másold át a marketing_developer skilljeit ide” — vagy futtasd ugyanazt az `install-skills-into.sh`-t.

## Mit másol a script

- `.cursor/skills/` — 342 skill
- `.cursor/rules/` — marketing szabályok
- `.agents/skills/` — 49 marketingskills
- `.claude/product-marketing-context.md`
- `AGENTS.md`, `skills-lock.json`
