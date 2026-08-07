# HeyGen Skills — Setup

Installed per [`INSTALL_FOR_AGENTS.md`](https://github.com/heygen-com/skills/blob/master/INSTALL_FOR_AGENTS.md).

## What is installed

| Item | Value |
|------|-------|
| Location | `.claude/skills/heygen-skills/` (vendored, project-scoped) |
| Upstream | `heygen-com/skills` @ `master` |
| Version | `3.2.0` |
| Commit | `1bd5e4d33a028dfed3abf504c5e3dd644fb9ea8a` (2026-07-14) |

Three independent skills:

- **`heygen-avatar`** — identity → avatar → voice. Writes `AVATAR-<NAME>.md` at the
  workspace root, plus an `AVATAR-AGENT.md` / `AVATAR-USER.md` symlink.
- **`heygen-video`** — idea → script → video, via the v3 Video Agent pipeline.
  Reads `AVATAR-<NAME>.md` to pick up avatar + voice automatically.
- **`heygen-translate`** — existing video → dubbed + lip-synced in another language.

The upstream install path for Claude Code is `~/.claude/skills/heygen-skills`. We
vendored into the repo instead so the skills survive ephemeral remote sessions and
are shared with the team — matching how `.agents/skills/` and `.cursor/skills/`
are already handled here.

## Transports

The skills auto-detect a transport via the mode-detection ladder in each `SKILL.md`:

1. OpenClaw plugin — if `video_generate` exposes `heygen/video_agent_v3`
2. **CLI (API-key override)** — if `HEYGEN_API_KEY` is set *and* `heygen --version` exits 0
3. **MCP** — if no API key is set *and* `mcp__heygen__*` tools are visible
4. CLI (fallback) — if MCP is unavailable and `heygen --version` exits 0

**Setting `HEYGEN_API_KEY` short-circuits MCP detection.** If you want the calls
billed against your HeyGen *plan* credits rather than API credits, leave the key
unset and use MCP.

### Option C — MCP (no API key)

`.mcp.json` at the repo root registers the official HeyGen MCP server
(`https://mcp.heygen.com/mcp/v1/`). Approve it with `/mcp` in an interactive
Claude Code session; auth is OAuth on first connection.

### Option B — CLI (needs an API key)

```bash
curl -fsSL https://static.heygen.ai/cli/install.sh | bash
heygen auth login          # persists to ~/.heygen/credentials
```

Or set the key in the environment (see `.env.example`):

```bash
export HEYGEN_API_KEY=hg_...
```

Get the key from [app.heygen.com/api](https://app.heygen.com/api) → Settings → API →
New Key. It is shown once. Never commit it — `.env` is gitignored.

For Claude Code on the web, add `HEYGEN_API_KEY` as an environment variable on the
environment itself so it persists across sessions instead of living in a shell.

## Network requirements

HeyGen calls need outbound access to:

- `static.heygen.ai` — CLI installer
- `api.heygen.com` — API (reached via the CLI, never raw curl)
- `mcp.heygen.com` — MCP server
- `app.heygen.com` — console / billing

In a Claude Code remote environment these must be allowed by the environment's
network policy, otherwise every transport fails at the connection layer.

## Cost

Pay-as-you-go credits, no free tier. Avatar V is roughly **6 credits per minute** of
generated video; a 5-second smoke test is about half a credit. Current rates:
[help.heygen.com/api-pricing](https://help.heygen.com/en/articles/10060327-heygen-api-pricing-explained).

## Usage

```
"Make a 30-second video of yourself introducing what we're working on this week"
"Generate a 60-second product walkthrough using my avatar"
"Translate this video into Spanish, Japanese, and German"
```

## Upgrade

```bash
git clone --single-branch --depth 1 https://github.com/heygen-com/skills.git /tmp/heygen-skills
rm -rf /tmp/heygen-skills/.git /tmp/heygen-skills/.github
rsync -a --delete /tmp/heygen-skills/ .claude/skills/heygen-skills/
```

Re-read the active `SKILL.md` after an upgrade — the mode-detection ladder
occasionally gains new transports.
