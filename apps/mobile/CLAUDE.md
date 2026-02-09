# CLAUDE.md — Mobile

## Stack

Expo + React Native + HeroUI Native + Uniwind

Versions exactes → voir `package.json` ou `.claude/plan-mobile.md`

---

## Styling — Tailwind (Uniwind) first

**Règle absolue** : utiliser Tailwind (className) par défaut, comme sur le web.

`StyleSheet` et `style={}` uniquement quand Tailwind est impossible :
- Props de composants tiers (LinearGradient `colors`, Ionicons `color`, Tab Bar `screenOptions`)
- Valeurs dynamiques calculées à l'exécution (`style={{ backgroundColor: variantColor }}`)
- `StyleSheet.absoluteFill` sur Image/Pressable dans un `<Link asChild>`

`constants/theme.ts` ne contient QUE les couleurs utilisées dans ces cas (props composants, valeurs dynamiques). Tout ce qui peut être une classe Tailwind (`bg-white/85`, `text-white/50`, etc.) n'a pas sa place dans theme.ts.

Quand `StyleSheet` est utilisé, **chaque clé doit être justifiée par un commentaire au-dessus** expliquant pourquoi Tailwind n'est pas possible.

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
