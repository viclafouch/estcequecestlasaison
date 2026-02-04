# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Projet

**estcequecestlasaison.fr** - Site web + App mobile de saisonnalité des fruits/légumes en France.

- **Web (Phase 1)** : SEO "est-ce que c'est la saison de X", monétisé AdSense
- **Mobile (Phase 2)** : React Native/Expo, 100% offline, notifications saison, gratuit

**Pas de :** base de données serveur, authentification, backend API.

---

## Architecture Monorepo

```
estcequecestlasaison/
├── apps/
│   ├── web/                  → TanStack Start (SSR)
│   └── mobile/               → React Native / Expo (Phase 2)
├── packages/
│   └── shared/               → Données + Types + Helpers
├── scripts/                  → Génération/optimisation images
├── package.json
└── pnpm-workspace.yaml
```

Voir les `CLAUDE.md` dans chaque workspace pour les détails spécifiques.

---

## Rules (`.claude/rules/`)

TOUJOURS lire et respecter ces règles.

| Fichier | Domaine |
|---------|---------|
| `typescript.md` | Règles TypeScript |
| `code-style.md` | Style de code |
| `frontend.md` | React, TanStack, UI/UX |
| `comments.md` | Commentaires |
| `testing.md` | Tests |
| `git.md` | Git workflow |
| `documentation.md` | CLAUDE.md + dépendances |

---

## Agents

| Agent | Usage |
|-------|-------|
| `code-refactoring` | **Obligatoire** après chaque tâche |
| `Explore` | Recherche codebase |
| `Plan` | Tâches complexes |

---

## Skills

| Skill | Usage |
|-------|-------|
| `/frontend-design` | Interfaces haute qualité |
| `/react-useeffect` | Audit useEffect |
| `/vercel-react-best-practices` | Performance React/Next.js |

---

## MCP Servers

| MCP | Usage |
|-----|-------|
| **Context7** | Docs libs (TanStack, Fuse.js, Expo) |
| **shadcn** | Composants + icons |

---

## Workflow

**Avant chaque tâche :**
1. Vérifier `.claude/plan.md`
2. Lire `.claude/rules/*.md`
3. Consulter Context7

**Après chaque tâche :**
1. `code-refactoring` (obligatoire)
2. Relire les règles
3. `pnpm run lint:fix`
4. Cocher `[x]` dans le plan

---

## Commands

> **IMPORTANT** : Ne JAMAIS lancer `pnpm dev` — déjà lancé par l'utilisateur.

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Dev server :3000 |
| `pnpm build` | Build prod |
| `pnpm start` | Start prod |
| `pnpm lint` | TS + ESLint |
| `pnpm lint:fix` | Lint + fix |
| `pnpm test` | Tests Vitest |
| `pnpm generate-images` | Génère images produits (Google AI) |
| `pnpm optimize-images` | Optimise images (sharp, WebP) |
| `pnpm generate-og` | Génère images Open Graph (satori) |

---

## Plan Status

Voir `.claude/plan.md` pour les milestones.
