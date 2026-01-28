# CLAUDE.md - Shared Package

Package partagé entre le web et le mobile.

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
  slug: string
  name: string
  type: ProduceType
  icon: string
  seasons: Partial<Record<number, SeasonIntensity>>
  nutrition: {
    calories: number
    vitamins: string[]
    benefits: string
  }
}
```

---

## Import

```typescript
import type { Produce } from '@estcequecestlasaison/shared'
```
