# CLAUDE.md

## Produit

**estcequecestlasaison.fr** — Savoir si un fruit ou légume est de saison en France.

- **Web** : SEO + AdSense
- **Mobile** : Offline, gratuit, sans pub
- **Données** : 80 produits, JSON statique, français uniquement

---

## Monorepo

```
apps/web/      → TanStack Start
apps/mobile/   → Expo
packages/shared/ → Données + Types + Helpers
```

Chaque app a son propre `CLAUDE.md`.

---

## Plans

| Plateforme | Fichier |
|------------|---------|
| Web | `.claude/plan-web.md` |
| Mobile | `.claude/plan-mobile.md` |

**Avant chaque tâche** : lire le plan de la plateforme concernée.

---

## Rules

Fichiers dans `.claude/rules/` — TOUJOURS respecter.

---

## Commandes

```bash
pnpm lint        # TypeScript + ESLint
pnpm lint:fix    # Lint + auto-fix
pnpm test        # Vitest
```

---

## MCP Servers

| MCP | Usage |
|-----|-------|
| Context7 | Docs libs (TanStack, Expo, React Native, Fuse.js) |
| shadcn | Composants UI + icons (web) |
| heroui-native | Composants React Native (mobile) |

---

## Agents

| Agent | Quand l'utiliser |
|-------|------------------|
| `code-refactoring` | **Après chaque tâche** |
| `Explore` | Recherche dans le codebase |
| `Plan` | Planifier une tâche complexe |
| `react-performance` | Après implémentation React |
| `tailwind-audit` | Après modification styles |
| `dead-code` | Nettoyage périodique |

---

## Skills

| Skill | Scope |
|-------|-------|
| `/frontend-design` | Web |
| `/react-useeffect` | Universel |
| `/vercel-react-best-practices` | Web |
| `/react-native-best-practices` | Mobile |

---

## Workflow

**Avant** :
1. Identifier la plateforme (web/mobile)
2. Lire le plan correspondant

**Après chaque tâche (automatique, sans attendre qu'on demande)** :
1. `pnpm lint:fix`
2. Mettre à jour le plan : cocher `[x]` les items terminés
3. Lancer `code-refactoring` si code significatif
