# CLAUDE.md - Web App

Application web TanStack Start pour afficher la saisonnalité des fruits et légumes.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | TanStack Start (React 19, SSR) |
| Routing | TanStack Router (file-based) |
| UI | Tailwind CSS 4, Radix UI, vaul |
| Styling | clsx, tailwind-merge, tailwind-variants |
| Icons | SVG inline (emojione via shadcn.io) |
| Animation | motion (Framer) |
| SEO | schema-dts (Schema.org), seo() utility |
| Env | @t3-oss/env-core + Zod (validation env vars) |
| Ads | Google AdSense (native ads) |

---

## Structure

| Dossier | Contenu |
|---------|---------|
| `src/components/` | Composants UI |
| `src/components/ui/` | Primitives réutilisables (IconButton, Pill, CardSection, CountingNumber) |
| `src/components/icons/` | Icônes SVG inline emojione (header, search-bar) |
| `src/hooks/` | Custom hooks (use-*.ts) |
| `src/helpers/` | Fonctions utilitaires (platform, produce-image) |
| `src/routes/` | Pages (file-based routing) |
| `src/server/` | Server functions (produce-data, produce) |
| `src/constants/` | Constantes par domaine (env, site, season, calendar, faq, queries, navigation, animation, time, json-ld) |
| `src/lib/` | Utilitaires génériques (cn, seo) |
| `src/styles.css` | Styles globaux + Tailwind |

---

## Pages

4 pages au total :
- `/` - Page d'accueil (carousels par mois, style Airbnb)
- `/$slug` - Page produit dynamique (SEO optimisé)
- `/calendrier` - Calendrier annuel des 80 produits (tableau 12 mois, tri, recherche, impression)
- `/faq` - Questions fréquentes (accordion, sources officielles)

---

## Homepage Layout

3 sections en carousel horizontal (scroll + flèches) :
1. **En pleine saison** - Produits du mois en cours
2. **Arrive en [mois]** - Produits du mois prochain
3. **Hors saison** - Produits ni ce mois ni le prochain (grisé)

Les produits peuvent apparaître dans plusieurs sections (duplications autorisées).

---

## Icônes & Avatars

Les icônes SVG inline (`src/components/icons/`) ne servent que pour le header et le search-bar (globe, red-apple, carrot, calendar).

Les produits sont affichés via `ProduceAvatar` (`src/components/produce-avatar.tsx`) qui rend une image WebP circulaire depuis `/images/produce/{slug}-256w.webp`.

---

## Custom Hooks

| Hook | Usage |
|------|-------|
| `useIsomorphicLayoutEffect` | useLayoutEffect SSR-safe (useEffect côté serveur) |
| `useCarouselScroll` | Logique scroll horizontal avec flèches + scrollToStart |
| `useMonthBarScroll` | Scroll snap horizontal du sélecteur de mois (mobile, scroll infini) |
| `useSearch` | Context + provider pour la recherche globale (état modale, raccourci Cmd+K, SearchCommand) |
| `useListKeyboardNav` | Navigation clavier dans une liste (ArrowUp/Down, Enter, Escape, highlight). Générique |
| `useCanShare` | Détection Web Share API disponible (retourne boolean) |

---

## Librairies UI

| Lib | Usage |
|-----|-------|
| `clsx` | Construction de classNames conditionnels |
| `tailwind-merge` | Merge classes Tailwind sans conflits |
| `tailwind-variants` | Variants de composants avec TV (IconButton, Pill, CardSection) |
| `@radix-ui/react-dialog` | Modal accessible pour détails produit |
| `vaul` | Drawer mobile-friendly |
| `lucide-react` | Icônes UI (flèches, fermer, menu, recherche, partage, calendrier) |
| `@tanstack/react-pacer` | Debounce (useDebouncedValue) |
| `motion` | Animations subtiles (fade, stagger) |
| `@tanstack/react-table` | Tableau calendrier saisonnalité (colonnes, filtrage global, rendering via flexRender) |
| `fuse.js` | Recherche fuzzy sur les produits |
| `cmdk` | Command palette accessible (recherche globale Cmd+K, modale autocomplete) |
| `react-hotkeys-hook` | Raccourcis clavier déclaratifs (useHotkeys) |


---

## Design

| Aspect | Valeur |
|--------|--------|
| Style | Clean, inspiré Airbnb |
| Palette | Blanc, gris, accent vert émeraude |
| Theme | Light uniquement |
| Logo | Image PNG/WebP (pas une icône) |
| Responsive | Mobile-first |

---

## Monétisation

- Google AdSense avec native ads (à intégrer, Milestone 6)

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

Les server functions ne retournent que les champs nécessaires (slug, name) pour minimiser le payload.

---

## Environnement

- `VITE_SITE_URL` : URL du site (localhost en dev, domaine en prod)
- Validé via `@t3-oss/env-core` + Zod dans `src/constants/env.ts`
- Fichier `.env.local` à la racine du monorepo (Vite `envDir: '../../'`)
