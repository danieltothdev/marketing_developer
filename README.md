# marketing_developer

Project-specific Cursor agent skills from [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills).

## Cursor Skills

342 skills are installed under `.cursor/skills/` and load **only when this repository is open** in Cursor. Other projects are unaffected.

### Usage

Skills are discovered automatically. Reference them in chat, for example:

```
Using the seo-audit skill, review our landing page for SEO issues.
```

Or use slash commands where a skill defines them.

### Updating skills

```bash
git clone https://github.com/alirezarezvani/claude-skills.git
cd claude-skills
./scripts/convert.sh --tool windsurf
cp -R integrations/windsurf/skills/. ../.cursor/skills/
```

### Source

- Upstream: https://github.com/alirezarezvani/claude-skills
- License: MIT
