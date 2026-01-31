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

| Type | Description |
|------|-------------|
| `ProduceType` | 'fruit' ou 'vegetable' |
| `SeasonIntensity` | 'peak' ou 'partial' (données JSON) |
| `ProduceSection` | 'in-season', 'coming-next-month', 'off-season' (section d'affichage) |
| `BadgeVariant` | 'positive', 'warning', 'neutral' (style du badge) |
| `ProduceBadge` | Objet { label, variant } pour l'affichage contextuel |
| `Month` | 1 à 12 |
| `Produce` | Objet produit complet (id, slug, name, type, icon, seasons, nutrition) |

---

## Helpers (season.ts)

| Fonction | Description |
|----------|-------------|
| `getCurrentMonth()` | Mois actuel (1-12) |
| `getNextMonth(month)` | Mois suivant |
| `getPreviousMonth(month)` | Mois précédent |
| `getMonthName(month)` | Nom du mois en français |
| `matchIsInSeason(produce, month)` | Boolean si en saison |
| `matchIsInSeasonAllYear(produce)` | Boolean si en saison les 12 mois |
| `filterProduceByType(params)` | Filtre par type (fruit/vegetable) |
| `groupProduceBySeason(params)` | Groupe par saison (inSeason, comingNextMonth, offSeason) |
| `sortProduceBySeasonEnd(params)` | Trie par fin de saison (nouveaux en premier, toute l'année en dernier) |
| `getArrivingProduce(params)` | Produits qui arrivent ce mois (nouveautés) |
| `getLeavingProduce(params)` | Produits qui partent ce mois (fin de saison) |
| `getMonthStats(params)` | Stats du mois (fruits, vegetables, arriving, leaving) |
| `getSeasonEndMonth(params)` | Dernier mois consécutif en saison à partir d'un mois donné |
| `getSeasonRangeLabel(produce)` | Label des plages de saison ("Juin à Août", "Mars") |
| `getProduceBadge(params)` | Badge contextuel { label, variant } selon la section |
| `getDefaultProduceBadge(params)` | Badge par défaut (fallback sans section) |

---

## Badge Logic

Les badges sont contextuels selon la section d'affichage :

**En pleine saison** (priorité descendante) :
1. "Toute l'année" (positive) -- en saison 12/12 mois
2. "Nouveau" (positive) -- pas en saison le mois précédent
3. "Dernier mois" (warning) -- pas en saison le mois suivant
4. "Jusqu'en [mois]" (positive) -- dernier mois de la saison en cours

**Arrive en [mois]** :
- "[mois] à [mois]" (positive) -- plage de mois de la saison à venir

**Hors saison** :
- "[mois] à [mois]" (neutral) -- plage de mois de la vraie saison
