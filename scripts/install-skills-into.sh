#!/usr/bin/env bash
# Telepíti a marketing_developer összes skilljét egy másik projektbe (pl. site-2).
set -euo pipefail

TARGET="${1:-}"
if [[ -z "$TARGET" ]]; then
  echo "Használat: ./scripts/install-skills-into.sh /útvonal/a/site-2"
  exit 1
fi
if [[ ! -d "$TARGET" ]]; then
  echo "A cél mappa nem létezik: $TARGET"
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

mkdir -p "$TARGET/.cursor" "$TARGET/.agents" "$TARGET/.claude"
cp -a "$ROOT/.cursor/." "$TARGET/.cursor/"
cp -a "$ROOT/.agents/." "$TARGET/.agents/"
cp -a "$ROOT/.claude/." "$TARGET/.claude/"
cp -f "$ROOT/AGENTS.md" "$TARGET/AGENTS.md"
cp -f "$ROOT/skills-lock.json" "$TARGET/skills-lock.json"

echo "Kész — skill-ek telepítve: $TARGET"
echo "  .cursor/skills/  ($(ls "$TARGET/.cursor/skills" | wc -l) db)"
echo "  .agents/skills/  ($(ls "$TARGET/.agents/skills" | wc -l) db)"
echo "Nyisd meg a projektet Cursorban."
