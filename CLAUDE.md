# CLAUDE.md

Instructions pour Claude Code dans ce monorepo.

---

## Produit

**estcequecestlasaison.fr** — Savoir instantanément si un fruit ou un légume est de saison en France métropolitaine.

### Pourquoi

Les consommateurs français n'ont aucune source simple et fiable pour vérifier la saisonnalité d'un produit. Les informations sont éparpillées, souvent contradictoires, et rarement adaptées à la France métropolitaine. Ce projet répond à une question directe : "est-ce que c'est la saison de [produit] ?".

### Cible

Consommateurs français soucieux de manger local et de saison : familles, cuisiniers amateurs, personnes faisant leurs courses au marché ou en supermarché.

### Plateformes

| Plateforme | Objectif | Monétisation |
|------------|----------|--------------|
| **Web** | Capter le trafic SEO sur "est-ce que c'est la saison de X", devenir la référence saisonnalité en France | Google AdSense (native ads) |
| **Mobile** | Compagnon offline au quotidien, notifications quand un produit entre en saison | Gratuit, sans publicité |

### Contraintes

- **Pas de** : base de données serveur, authentification, backend API
- **Données** : 80 produits (fruits et légumes), JSON statique, validées par sources officielles
- **Langue** : Français uniquement, France métropolitaine
- **Domaine** : estcequecestlasaison.fr

---

## Architecture Monorepo

```
estcequecestlasaison/
├── apps/
│   ├── web/                  → TanStack Start (SSR)
│   └── mobile/               → React Native / Expo
├── packages/
│   └── shared/               → Données + Types + Helpers
├── scripts/                  → Génération/optimisation images
├── package.json
└── pnpm-workspace.yaml
```

Chaque workspace a son propre `CLAUDE.md` avec les détails spécifiques (tech stack, structure, conventions).

---

## Plans

| Plateforme | Fichier | Statut |
|------------|---------|--------|
| Web | `.claude/plan-web.md` | En cours |
| Mobile | `.claude/plan-mobile.md` | À venir |

**Avant chaque tâche** : vérifier le plan correspondant à la plateforme concernée.

---

## Rules (`.claude/rules/`)

TOUJOURS lire et respecter ces règles.

| Fichier | Domaine | Scope |
|---------|---------|-------|
| `typescript.md` | Règles TypeScript | Universel |
| `code-style.md` | Style de code | Universel |
| `comments.md` | Commentaires | Universel |
| `testing.md` | Tests | Universel |
| `git.md` | Git workflow | Universel |
| `documentation.md` | CLAUDE.md + dépendances | Universel |
| `frontend.md` | React, TanStack, Tailwind, UI/UX | Web uniquement |

---

## Agents

| Agent | Usage |
|-------|-------|
| `code-refactoring` | **Obligatoire** après chaque tâche |
| `Explore` | Recherche codebase |
| `Plan` | Tâches complexes |

---

## MCP Servers

| MCP | Usage |
|-----|-------|
| **Context7** | Docs libs (TanStack, Fuse.js, Expo, React Native) |
| **shadcn** | Composants + icons |

---

## Skills

| Skill | Usage | Scope |
|-------|-------|-------|
| `/frontend-design` | Interfaces haute qualité | Web |
| `/react-useeffect` | Audit useEffect | Universel |
| `/vercel-react-best-practices` | Performance React | Web |

---

## Workflow

### Avant chaque tâche

1. Identifier la plateforme (web ou mobile)
2. Vérifier le plan correspondant
3. Lire `.claude/rules/*.md`
4. Consulter Context7 si une lib est concernée

### Après chaque tâche

1. `code-refactoring` (obligatoire)
2. Relire les règles
3. `pnpm lint:fix`
4. Cocher `[x]` dans le plan correspondant

---

## Commandes

### Universelles

| Commande | Description |
|----------|-------------|
| `pnpm lint` | TypeScript + ESLint (tout le monorepo) |
| `pnpm lint:fix` | Lint + auto-fix |
| `pnpm test` | Tests Vitest |

### Web

> **IMPORTANT** : Ne JAMAIS lancer `pnpm dev` — déjà lancé par l'utilisateur.

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Dev server :3000 |
| `pnpm build` | Build prod |
| `pnpm start` | Start prod |

### Scripts (génération assets)

| Commande | Description |
|----------|-------------|
| `pnpm generate-images` | Génère images produits (Google AI) |
| `pnpm optimize-images` | Optimise images (sharp, WebP) |
| `pnpm generate-og` | Génère images Open Graph (satori) |

### Mobile

À définir lors du setup Expo.
