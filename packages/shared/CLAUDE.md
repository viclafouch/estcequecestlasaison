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
| `SeasonStatus` | 'peak', 'start', 'end', 'off' (calculé) |
| `Month` | 1 à 12 |
| `Produce` | Objet produit complet (id, slug, name, type, icon, seasons, nutrition) |

---

## Helpers (season.ts)

| Fonction | Description |
|----------|-------------|
| `getCurrentMonth()` | Mois actuel (1-12) |
| `getNextMonth(month)` | Mois suivant |
| `getMonthName(month)` | Nom du mois en français |
| `getSeasonStatus(produce, month)` | Statut détaillé (peak/start/end/off) |
| `getSeasonLabel(status)` | Label français du statut |
| `matchIsInSeason(produce, month)` | Boolean si en saison |
| `groupProduceBySeason(params)` | Groupe par saison (inSeason, comingNextMonth, offSeason) |
| `sortProduceBySeason(params)` | Trie par priorité saison |
| `filterProduceByMonth(params)` | Filtre par mois |
| `filterProduceByType(params)` | Filtre par type (fruit/vegetable) |

---

## Season Status Logic

Le statut de saison est déterminé par les mois adjacents :

- **peak** : Pleine saison (intensity = 'peak')
- **start** : Début de saison (partial + mois précédent hors saison)
- **end** : Fin de saison (partial + mois suivant hors saison)
- **off** : Hors saison
