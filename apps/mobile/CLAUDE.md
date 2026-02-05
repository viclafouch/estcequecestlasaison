# CLAUDE.md — Mobile

## Stack

Expo + React Native + HeroUI Native + Uniwind

Versions exactes → voir `package.json` ou `.claude/plan-mobile.md`

---

## Plan

Voir `.claude/plan-mobile.md` pour les specs et milestones.

---

## Docs HeroUI Native

Toujours consulter avant d'utiliser :
- https://v3.heroui.com/native/llms.txt
- https://v3.heroui.com/native/llms-patterns.txt

---

## Data Flow

**JSON (shared) → Service Layer → Composants**

Pas de server functions. Données dans le binary, 100% offline.

---

## MCP

| MCP | Usage |
|-----|-------|
| Context7 | Expo, React Native, FlashList |
| heroui-native | Composants + theming |

---

## Agents

| Agent | Quand |
|-------|-------|
| `react-performance` | Après implémentation composants |

---

## Skills

| Skill | Usage |
|-------|-------|
| `/react-native-best-practices` | Performance RN |
| `/react-useeffect` | Audit hooks |
