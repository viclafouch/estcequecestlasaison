# CLAUDE.md - Web App

Application web TanStack Start pour afficher la saisonnalité des fruits et légumes.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | TanStack Start (React 19, SSR) |
| Routing | TanStack Router (file-based) |
| UI | Tailwind CSS 4, Radix UI, vaul |
| Styling | clsx, tailwind-merge, cva |
| Icons | SVG inline (emojione via shadcn.io) |
| Animation | motion (Framer), tw-animate-css |
| SEO | schema-dts (Schema.org), seo() utility |
| Env | @t3-oss/env-core + Zod (validation env vars) |
| Ads | Google AdSense (native ads) |

---

## Structure

| Dossier | Contenu |
|---------|---------|
| `src/components/` | Composants UI |
| `src/hooks/` | Custom hooks (use-*.ts) |
| `src/helpers/` | Fonctions utilitaires |
| `src/routes/` | Pages (file-based routing) |
| `src/constants/env.ts` | Variables d'environnement (validées via @t3-oss/env-core) |
| `src/lib/seo.ts` | Utilitaire SEO (meta tags, OG, canonical) |
| `src/styles.css` | Styles globaux + Tailwind |

---

## Pages

2 pages au total :
- Page d'accueil (carousels par mois, style Airbnb)
- Page produit dynamique (SEO optimisé)

---

## Homepage Layout

3 sections en carousel horizontal (scroll + flèches) :
1. **En pleine saison** - Produits du mois en cours
2. **Arrive en [mois]** - Produits du mois prochain
3. **Hors saison** - Produits ni ce mois ni le prochain (grisé)

Les produits peuvent apparaître dans plusieurs sections (duplications autorisées).

---

## Icônes

Les icônes produits sont des composants SVG inline dans `src/components/icons/`.

- Source : shadcn.io (emojione)
- Un fichier par icône (`strawberry.tsx`, `carrot.tsx`, etc.)
- Type partagé dans `icons/types.ts`
- Composant `ProduceIcon` qui rend l'icône correspondant au nom fourni (typage strict via `AvailableIconName`)

---

## Custom Hooks

| Hook | Usage |
|------|-------|
| `useIsomorphicLayoutEffect` | useLayoutEffect SSR-safe (useEffect côté serveur) |
| `useCarouselScroll` | Logique scroll horizontal avec flèches + scrollToStart |
| `useMonthBarScroll` | Scroll snap horizontal du sélecteur de mois (mobile, scroll infini) |

---

## Librairies UI

| Lib | Usage |
|-----|-------|
| `clsx` | Construction de classNames conditionnels |
| `tailwind-merge` | Merge classes Tailwind sans conflits |
| `class-variance-authority` | Créer des variants de composants (cva) |
| `@radix-ui/react-dialog` | Modal accessible pour détails produit |
| `vaul` | Drawer mobile-friendly |
| `lucide-react` | Icônes UI (flèches, fermer, menu) |
| `@tanstack/react-pacer` | Debounce (useDebouncedValue) |
| `motion` | Animations subtiles (fade, stagger) |
| `fuse.js` | Recherche fuzzy sur les produits |
| `tw-animate-css` | Classes d'animation Tailwind |

---

## Design

| Aspect | Valeur |
|--------|--------|
| Style | Clean, inspiré Airbnb |
| Palette | Blanc, gris, accent vert émeraude |
| Theme | Light uniquement |
| Logo | Texte stylé (pas d'icône) |
| Responsive | Mobile-first |

---

## Monétisation

- Google AdSense avec native ads dans la grille
- Bannière promo app mobile (fermeture mémorisée localStorage)

---

## SEO

- Utilitaire `seo()` dans `src/lib/seo.ts` pour générer meta + OG + Twitter + canonical
- Chaque route définit son `head()` avec `seo()` pour les meta tags
- Schema.org structured data (schema-dts)
- SSR pour indexation Google
- Variable `VITE_SITE_URL` pour les URLs absolues (canonical, OG)

## Data Flow

JAMAIS importer `produceData` (le JSON) dans du code client (composants, hooks). Le JSON entier se retrouverait dans le bundle navigateur.

Toute donnée produit transite par des server functions (TanStack Start) :
- `src/server/produce-data.ts` : importe le JSON (server-only) et crée `PRODUCE_LIST`
- `src/server/produce.ts` : expose les données via `createServerFn` (RPC)
- `src/constants/queries.ts` : wraps les server functions en `queryOptions` (TanStack Query)
- Les routes utilisent `loader` pour précharger via `queryClient.ensureQueryData()`
- Les composants consomment les données via `useQuery()` / `Route.useLoaderData()`

Pattern : **Server Function** -> **Query Options** -> **Loader (SSR prefetch)** -> **useQuery (client)**

Les server functions ne retournent que les champs nécessaires (slug, name, icon) pour minimiser le payload.

---

## Environnement

- `VITE_SITE_URL` : URL du site (localhost en dev, domaine en prod)
- Validé via `@t3-oss/env-core` + Zod dans `src/constants/env.ts`
- Fichier `.env.local` à la racine du monorepo (Vite `envDir: '../../'`)
