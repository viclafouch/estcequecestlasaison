# CLAUDE.md — Web

## Stack

TanStack Start + Tailwind + Radix UI

Versions exactes → voir `package.json` ou `.claude/plan-web.md`

---

## Plan

Voir `.claude/plan-web.md` pour les specs et milestones.

---

## Commandes

```bash
# NE PAS lancer pnpm dev — déjà lancé par l'utilisateur
pnpm build   # Build prod
pnpm start   # Start prod
```

---

## Data Flow

**Server Function → Query Options → Loader → useQuery**

JAMAIS importer `@estcequecestlasaison/shared` statiquement dans les server functions (dynamic import obligatoire pour le bundle client).

---

## MCP

| MCP | Usage |
|-----|-------|
| Context7 | TanStack Router, TanStack Query, Fuse.js |
| shadcn | Composants + icons |

---

## Agents

| Agent | Quand |
|-------|-------|
| `react-performance` | Après implémentation composants |
| `tailwind-audit` | Après modification styles |

---

## Skills

| Skill | Usage |
|-------|-------|
| `/frontend-design` | Interfaces haute qualité |
| `/vercel-react-best-practices` | Performance React/Next patterns |
| `/react-useeffect` | Audit hooks |
