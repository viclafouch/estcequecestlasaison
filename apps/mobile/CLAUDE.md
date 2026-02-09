# CLAUDE.md — Mobile

## Stack

Expo + React Native + HeroUI Native + Uniwind

Versions exactes → voir `package.json` ou `.claude/plan-mobile.md`

---

## Styling — Tailwind (Uniwind) first

**Règle absolue** : utiliser Tailwind (className) par défaut, comme sur le web.

**Source unique pour les couleurs** : `global.css`
- Couleurs solides : `@theme { --color-xxx: #hex; }`
- Couleurs avec opacité : `@layer theme` + `color-mix(in oklab, ...)` + `@theme inline static`
- Accès JS (LinearGradient, Ionicons, TabBar) : `useCSSVariable` (uniwind) ou `useThemeColor` (heroui-native)

`StyleSheet` et `style={}` uniquement quand Tailwind est impossible :
- Props de composants tiers (LinearGradient `colors`, Ionicons `color`, Tab Bar `screenOptions`)
- `StyleSheet.absoluteFill` sur Image/Pressable dans un `<Link asChild>`
- Propriétés non supportées par Uniwind (`letterSpacing`, percentage heights sur LinearGradient)

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
