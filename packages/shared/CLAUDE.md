# CLAUDE.md - Shared Package

Package partagé entre le web et le mobile contenant les données, types et helpers.

---

## Structure

```
src/
├── data/
│   ├── produce.json      → Données fruits/légumes
│   └── index.ts          → Exports et helpers data
├── helpers/
│   ├── season.ts         → Utils saisonnalité
│   ├── search.ts         → Fuzzy search (Fuse.js)
│   └── index.ts
├── types.ts              → Types TypeScript
└── index.ts              → Export principal
```

---

## Librairies

| Lib | Usage |
|-----|-------|
| `date-fns` | Manipulation de dates, mois |
| `fuse.js` | Recherche fuzzy client-side |
| `zod` | Validation des données |

---

## Types

```typescript
type ProduceType = 'fruit' | 'vegetable'
type SeasonIntensity = 'peak' | 'partial'

type Produce = {
  id: string
  slug: string              // URL-friendly
  name: string              // Nom affiché
  type: ProduceType
  icon: string              // Icône @iconify (emojione:xxx)
  seasons: Partial<Record<number, SeasonIntensity>>  // 1-12
  nutrition: {
    calories: number        // pour 100g
    vitamins: string[]
    benefits: string
  }
}
```

---

## Helpers disponibles

### Season (`helpers/season.ts`)
- `getCurrentMonth()` → Mois actuel (1-12)
- `getSeasonStatus(produce, month)` → 'peak' | 'partial' | null
- `isInSeason(produce, month)` → boolean
- `getProduceInSeason(list, month)` → Produce[]
- `getSeasonLabel(intensity)` → String FR

### Search (`helpers/search.ts`)
- `createSearchIndex(list)` → Fuse instance
- `searchProduce(fuse, query)` → Produce[]

---

## Imports

```typescript
// Depuis apps/web ou apps/mobile
import { PRODUCE_LIST, getProduceBySlug } from '@estcequecestlasaison/shared'
import { getCurrentMonth, isInSeason } from '@estcequecestlasaison/shared/helpers'
import type { Produce } from '@estcequecestlasaison/shared/types'
```

---

## Données

Le fichier `produce.json` contient ~50-100 fruits et légumes avec leurs saisons en France métropolitaine. Les données sont **statiques** (les saisons ne changent pas).
