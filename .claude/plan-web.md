# Plan Web - estcequecestlasaison.fr

## Vision

Site web permettant de connaitre la saisonnalite des fruits et legumes en France metropolitaine.

- SEO optimise pour "est-ce que c'est la saison de X", monetise via AdSense

**Domaine :** estcequecestlasaison.fr

---

## Decisions Techniques

| Aspect | Choix |
|--------|-------|
| Monorepo | pnpm workspaces (pnpm 10.28.2) |
| Hosting Web | Railway (auto-deploy depuis main) |
| Icones UI | lucide-react (fleches, menu, recherche, partage) |
| Icones produits | SVG inline emojione (shadcn.io) pour header, images WebP pour produits |
| Recherche | Fuse.js (fuzzy search server-side) |
| Donnees | JSON statique (80 produits, saisons ne changent pas) |
| Langue | Francais uniquement |
| Node | >= 20 (22.12.0 en dev) |

---

## Architecture Monorepo

```
estcequecestlasaison/
├── apps/
│   ├── web/                  → Site TanStack Start (SSR)
├── packages/
│   └── shared/               → Donnees + Types + Helpers
├── scripts/                  → Generation/optimisation images
├── package.json              → Workspace root
└── pnpm-workspace.yaml
```

---

## Donnees Partagees (`packages/shared`)

Coeur du projet, donnees et helpers partages.

### Types

| Type | Description |
|------|-------------|
| `ProduceType` | `'fruit' \| 'vegetable'` |
| `SeasonIntensity` | `'peak' \| 'partial'` |
| `SeasonStatus` | `'peak' \| 'partial' \| 'off'` |
| `Month` | `1 \| 2 \| ... \| 12` |
| `Seasons` | `{ [K in Month]?: SeasonIntensity }` |
| `Nutrition` | `{ calories, vitamins, benefits }` |
| `Produce` | `{ id, slug, name, type, icon, seasons, nutrition, conservation, buyingTip, origin }` |
| `ProduceSection` | `'in-season' \| 'coming-next-month' \| 'off-season'` |
| `ProduceBadge` | `{ label, variant }` |
| `GroupedProduce` | `{ inSeason, comingNextMonth, offSeason }` |
| `MonthStats` | `{ fruits, vegetables, total, arriving, leaving }` |

### Helpers date (`helpers/date.ts`)

| Fonction | Description |
|----------|-------------|
| `getCurrentMonth()` | Mois courant (timezone Paris) |
| `getCurrentYear()` | Annee courante (timezone Paris) |
| `getPreviousMonth(month)` | Mois precedent (cyclique) |
| `getNextMonth(month)` | Mois suivant (cyclique) |
| `getMonthName(month)` | Nom complet francais ("janvier") |
| `getShortMonthName(month)` | Abbreviation 3 lettres |
| `ALL_MONTHS` | Constante `[1, 2, ..., 12]` |

### Helpers saison (`helpers/season.ts`)

| Fonction | Description |
|----------|-------------|
| `matchIsInSeason(produce, month)` | Produit en saison (peak ou partial) |
| `matchIsInSeasonAllYear(produce)` | En saison les 12 mois |
| `filterProduceByType({ produceList, type })` | Filtrer par fruit/legume/all |
| `groupProduceBySeason({ produceList, currentMonth })` | Grouper en 3 sections (inSeason, comingNextMonth, offSeason) |
| `sortProduceBySeasonEnd({ produceList, month })` | Trier par fin de saison (nouveaux en premier, annuels en dernier) |
| `getArrivingProduce({ produceList, month })` | Produits qui arrivent ce mois |
| `getLeavingProduce({ produceList, month })` | Produits qui partent ce mois |
| `getMonthStats({ produceList, month })` | Statistiques du mois (total, fruits, legumes, arrivants, partants) |
| `getSeasonEndMonth({ produce, month })` | Dernier mois consecutif en saison |
| `getSeasonRangeLabel(produce)` | Label lisible ("Juin a Aout", "Mars") |
| `getProduceBadge({ produce, month, section })` | Badge contextuel par section |
| `getDefaultProduceBadge({ produce, month })` | Badge par defaut (sans section) |
| `getSeasonAlternatives({ produce, month, allProduce })` | Alternatives en saison de la meme categorie (max 4, tri alpha) |
| `SEASON_STATUS_LABELS` | Constante : peak/partial/off → labels francais |

### Helpers partage (`helpers/share.ts`)

| Fonction | Description |
|----------|-------------|
| `getShareText({ produceName, isInSeason, siteDomain })` | Texte de partage conversationnel selon le statut saison |

### Donnees

- `data/produce.json` : 80 produits (fruits et legumes) avec id, slug, name, type, icon, seasons, nutrition, conservation, buyingTip, origin
- Validation via Zod

### Dependances

| Librairie | Usage |
|-----------|-------|
| `fuse.js` | Recherche fuzzy |
| `zod` | Validation des donnees |

---

## Librairies

### UI & Styling (`apps/web`)

| Librairie | Usage |
|-----------|-------|
| `clsx` | Construction de classNames conditionnels |
| `tailwind-merge` | Merge les classes Tailwind sans conflits |
| `tailwind-variants` | Variants de composants (tv) pour IconButton, Pill, CardSection |
| `@radix-ui/react-dialog` | Modal accessible (SearchCommand) |
| `vaul` | Drawer mobile-friendly (MonthDrawer) |
| `lucide-react` | Icones UI (fleches, fermer, menu, recherche, partage, calendrier) |
| `cmdk` | Command palette accessible (recherche globale Cmd+K) |
| `react-hotkeys-hook` | Raccourcis clavier declaratifs (useHotkeys) |

### Donnees & Etat (`apps/web`)

| Librairie | Usage |
|-----------|-------|
| `@tanstack/react-query` | Gestion cache et fetching (useQuery, queryOptions) |
| `@tanstack/react-table` | Tableau calendrier (colonnes, tri, filtrage) |
| `@tanstack/react-pacer` | Debounce recherche (useDebouncedValue, 200ms) |
| `fuse.js` | Recherche fuzzy sur les produits (server-side) |

### Animation (`apps/web`)

| Librairie | Usage |
|-----------|-------|
| `motion` | Framer Motion - animations subtiles (fade, stagger, layout) |

### Framework (`apps/web`)

| Librairie | Usage |
|-----------|-------|
| `@tanstack/react-start` | Framework SSR (server functions, loaders) |
| `@tanstack/react-router` | Routing file-based |
| `nitro` | Runtime serveur |
| `react` + `react-dom` | React 19 |
| `vite` | Bundler (v7) |
| `tailwindcss` | Tailwind CSS 4 |

### SEO (`apps/web`)

| Librairie | Usage |
|-----------|-------|
| `schema-dts` | Types TypeScript pour Schema.org |

### Environnement (`apps/web`)

| Librairie | Usage |
|-----------|-------|
| `@t3-oss/env-core` | Validation variables d'environnement (VITE_SITE_URL) |
| `zod` | Schema validation env |

### Dev Experience (root)

| Librairie | Usage |
|-----------|-------|
| `husky` | Git hooks (lint avant commit) |
| `vitest` | Tests unitaires |
| `eslint` | Linting (config custom @viclafouch) |
| `prettier` | Formatage code |
| `typescript` | TypeScript 5.9 strict |

### Scripts (root)

| Librairie | Usage |
|-----------|-------|
| `satori` | Generation images SVG/HTML (OG images) |
| `sharp` | Optimisation images (WebP, redimensionnement) |
| `@tanstack/ai` + `@tanstack/ai-gemini` | Generation de contenu via Gemini |

---

## Monetisation

| Plateforme | Modele |
|------------|--------|
| Web | Google AdSense (native ads) - a integrer |

---

## Site Web

### Routes

| Route | Description | Statut |
|-------|-------------|--------|
| `/` | Page d'accueil (carousels par mois) | Fait |
| `/$slug` | Page produit dynamique (SEO optimise) | Fait |
| `/calendrier` | Calendrier annuel des 80 produits (tableau 12 mois) | Fait |
| `/faq` | Questions frequentes (accordion, sources officielles) | Fait |
| `/sitemap.xml` | Sitemap dynamique (toutes les URLs) | Fait |
| `/mentions-legales` | Mentions legales (obligation legale francaise) | A faire (Milestone 6) |
| `/confidentialite` | Politique de confidentialite RGPD (pre-requis AdSense + App Store) | A faire (Milestone 6) |
| `/cgu` | Conditions generales d'utilisation (pre-requis App Store) | A faire (Milestone 6) |

### Data Flow

Pattern : **Server Function** → **Query Options** → **Loader (SSR prefetch)** → **useQuery (client)**

- `src/server/produce-data.ts` : importe le JSON (server-only), cree `PRODUCE_LIST`
- `src/server/produce.ts` : expose les donnees via `createServerFn` (RPC)
- `src/constants/queries.ts` : wraps les server functions en `queryOptions` (TanStack Query)
- Les routes utilisent `loader` pour precharger via `queryClient.ensureQueryData()`
- Les composants consomment via `useQuery()` / `Route.useLoaderData()`

Le JSON n'est JAMAIS importe cote client (resterait dans le bundle).

**Server Functions :**

| Fonction | Description |
|----------|-------------|
| `getSearchSuggestions` | Recherche fuzzy Fuse.js, top 5 resultats |
| `getSlugPageData` | Donnees page produit (produit, related, alternatives, jsonLd) |
| `getGroupedProduceData` | Produits groupes par saison avec recherche/filtre/mois |
| `getMonthStatsData` | Statistiques du mois (arrivants, partants) |
| `getCalendarData` | Tous les produits pour le calendrier (payload minimal) |

### Header (`SiteHeader`)

- **Logo** : Image PNG/WebP (pas texte) avec lien vers `/`
- **Onglets categories** (homepage uniquement) : Tous / Fruits / Legumes avec icones SVG emojione et underline animee (Framer Motion `layoutId`)
  - Desktop : dans le header, centres
  - Mobile : sous le header, en barre separee
- **Actions (droite)** :
  - Icone recherche (ouvre SearchCommand)
  - Icone calendrier (lien `/calendrier`, desktop uniquement)
  - Menu burger (mobile, navigation vers Calendrier/FAQ)
- **Sticky** : Fixe en haut de page (z-50)

### Recherche globale

- **SearchCommand** : modale cmdk (Cmd+K / Ctrl+K) accessible depuis toutes les pages
- **SearchBar** (homepage uniquement) : champ de recherche avec dropdown suggestions et zone mois cliquable
- **SearchSuggestions** : dropdown autocomplete sous le SearchBar (navigation clavier fleches)
- **useSearch** : context provider global (etat modale, raccourci clavier)
- **SearchProvider** dans `__root.tsx` : modale disponible sur toutes les pages
- Recherche fuzzy via Fuse.js (server function `getSearchSuggestions`, top 5)
- Debounce 200ms via `@tanstack/react-pacer` (`useDebouncedValue`)

### Page d'accueil (`/`)

- **Fond** : image background decorative sur grands ecrans
- **SearchBar** : champ de recherche avec icone + zone mois cliquable (ouvre MonthDrawer)
- **MonthBar** : barre de selection du mois en bas de page (mobile, scroll snap horizontal)
- **MonthDrawer** : drawer (vaul) avec navigation mois, statistiques (total, fruits, legumes), produits arrivants/partants, compteurs animes
- **3 carousels horizontaux** (scroll + fleches) :
  1. **"En pleine saison d'[mois]"** (H1 hero, text-2xl/3xl bold) — produits peak/partial du mois
  2. **"Nouveautes en [mois+1]"** — produits arrivant le mois prochain (affiche uniquement pour le mois courant)
  3. **"Hors saison"** — produits ni ce mois ni le prochain
- **Filtrage** : onglets categories dans le header (Tous/Fruits/Legumes)
- **Recherche** : filtre les carousels en temps reel avec debounce
- **Etat vide** : message "Aucun produit trouve" quand aucun resultat
- **Query param `?q=`** : recherche pre-remplie via URL (SearchAction JSON-LD)

### ProduceCard

- Image WebP circulaire du produit (`ProduceAvatar`)
- Nom du produit
- Badge de saison colore (Pill component)
- Lien vers `/$slug`

### Page produit (`/$slug`)

- **Section hero** :
  - Image WebP grande (aspect-square mobile, flexible desktop) avec ProduceImage (srcSet 256w/512w)
  - H1 nom du produit + label type (Fruit/Legume)
  - **Bouton partage** (mobile uniquement, Web Share API, masque si non supporte)
  - Statut saison avec dot coloree :
    - "En pleine saison" (vert)
    - "Debut de saison" / "Fin de saison" (ambre)
    - "Hors saison" (gris)
    - "Disponible toute l'annee" (vert)
  - Detail badge (ex: "Jusqu'en aout", "A partir de mars")
  - **Alternatives en saison** (quand hors saison) : grille 2 colonnes (4 colonnes desktop) de chips avec avatar + nom + chevron, max 4 produits de la meme categorie
- **Infos nutritionnelles** (toujours visibles) :
  - Calories (kcal)
  - Vitamines (chips)
- **Details expandables** (mobile: bouton "Plus d'informations", desktop: toujours visibles) :
  - Origine
  - Conservation
  - Bien choisir (conseil d'achat)
  - Bienfaits
- **Calendrier 12 mois** (`SeasonCalendar`) : grille avec dot coloree par mois
- **Produits lies** : carousel "Aussi de saison" (produits de la meme categorie en saison)
- **SEO** : meta optimises, structured data (Schema.org Product, BreadcrumbList, FAQPage), OG image par produit

### Page calendrier (`/calendrier`)

- **Toolbar** : recherche dans le tableau + tri (par nom A-Z ou par nombre de mois en saison) + filtre fruits/legumes
- **Tableau** (TanStack Table) :
  - 12 colonnes (janvier a decembre) + colonne sticky produit
  - Ligne par produit : avatar + nom (lien vers `/$slug`)
  - Mois courant surligne (fond distinct)
  - Cellules : dot coloree (vert pleine saison, ambre debut/fin, gris hors saison)
  - Mobile : scroll horizontal avec colonne produit sticky a gauche
- **Legende** (`CalendarLegend`) : explication des couleurs
- **Bouton imprimer** (desktop uniquement) : `window.print()`
- **Impression** (`@media print`) : legende, labels texte dans cellules, masquer navigation/footer/toolbar
- **SEO** : structured data BreadcrumbList + ItemList, sitemap priority 0.8

### Page FAQ (`/faq`)

- Accordion de questions/reponses
- Sources officielles
- SEO : structured data FAQPage

### Footer

- **4 colonnes** (responsive grid) :
  1. Logo + description + drapeau francais
  2. Navigation (Accueil, Calendrier, FAQ)
  3. Fruits populaires (Fraise, Cerise, Pomme, Orange)
  4. Legumes populaires (Tomate, Carotte, Courgette, Poireau)
- **Copyright** : annee dynamique + "estcequecestlasaison.fr"
- **Mention** : "Bientot disponible sur iOS et Android"
- Masque a l'impression (`print:hidden`)

### Indicateurs saisonnalite

| Couleur | Statut | Utilisation |
|---------|--------|-------------|
| Vert (primary) | Pleine saison (peak) | Homepage, produit, calendrier |
| Ambre (warning) | Debut/fin de saison (partial) | Homepage, produit, calendrier |
| Gris (neutral) | Hors saison (off) | Homepage, produit, calendrier |

### Composants UI reutilisables

| Composant | Description |
|-----------|-------------|
| `IconButton` | Bouton icone avec variants (ghost, outline) via tailwind-variants |
| `Pill` | Badge/chip avec variants (positive, warning, neutral) |
| `CardSection` | Conteneur section avec variants |
| `CountingNumber` | Compteur anime (utilise dans MonthDrawer) |
| `ProduceAvatar` | Image WebP circulaire d'un produit |
| `ProduceImage` | Image WebP avec fallback (srcSet 256w/512w) |
| `ProduceBadge` | Badge de saison sur les cartes produit |
| `FrenchFlag` | Drapeau francais SVG (footer) |
| `NotFound` | Page 404 |

### Custom Hooks

| Hook | Description |
|------|-------------|
| `useSearch` | Context + provider pour la recherche globale (etat modale, raccourci Cmd+K) |
| `useCarouselScroll` | Logique scroll horizontal avec fleches + scrollToStart |
| `useMonthBarScroll` | Scroll snap horizontal du selecteur de mois (mobile, scroll infini) |
| `useListKeyboardNav` | Navigation clavier dans une liste (ArrowUp/Down, Enter, Escape) |
| `useCanShare` | Detection Web Share API disponible |
| `useIsomorphicLayoutEffect` | useLayoutEffect SSR-safe (useEffect cote serveur) |

### SEO

- Utilitaire `seo()` dans `src/lib/seo.ts` pour generer meta + OG + Twitter + canonical
- Chaque route definit son `head()` avec `seo()`
- Schema.org structured data (schema-dts) : WebSite, Product, BreadcrumbList, FAQPage, ItemList, SearchAction
- JSON-LD global WebSite dans `__root.tsx`
- SSR pour indexation Google
- `VITE_SITE_URL` pour les URLs absolues
- OG images par produit (80+) + default
- Sitemap dynamique avec toutes les routes
- robots.txt
- Web manifest (site.webmanifest, theme #10b981)
- Favicon multi-taille (16, 32, 180, 192, 512)

### Accessibilite

- Skip to content link ("Aller au contenu principal")
- `aria-label` sur les navigations
- `aria-selected` sur les onglets
- `aria-expanded` sur les sections expandables
- `aria-hidden` sur les icones decoratives
- `role="tablist"` / `role="tab"` sur les filtres categories
- `role="status"` sur l'etat vide
- Contrastes WCAG 2.1 AA
- Navigation clavier (fleches, Enter, Escape, Tab)

### Animations

- **Framer Motion** : underline categories (`layoutId`), transitions modale, fade-in
- **CSS** : scroll snap (MonthBar, carousels), transitions hover
- `prefers-reduced-motion` respecte

### Assets

- `/logo.png` + `/logo.webp` : logo du site
- `/images/background.webp` : fond hero homepage (desktop)
- `/images/produce/*.webp` : images produits (256w et 512w pour chaque produit)
- `/images/og/*.png` : images Open Graph (1200x630, une par produit)
- Favicons multi-taille + web manifest

### Environnement

| Variable | Description |
|----------|-------------|
| `VITE_SITE_URL` | URL du site (localhost en dev, domaine en prod) |
| `GOOGLE_API_KEY` | API Google (generation images, root seulement) |

Validation via `@t3-oss/env-core` + Zod dans `src/constants/env.ts`.

### Scripts (root)

| Script | Description |
|--------|-------------|
| `generate-images` | Genere les images produits via Google AI |
| `optimize-images` | Optimise les images (WebP, redimensionnement) via sharp |
| `generate-og` | Genere les images Open Graph via satori |

---

## Design

- **Style** : Clean, inspire Airbnb
- **Palette** : Blanc, gris, accent vert emeraude (#10b981)
- **Theme** : Light uniquement
- **Responsive** : Mobile-first
- **Logo** : Image (PNG/WebP), pas une icone

---

## Infrastructure

| Service | Usage |
|---------|-------|
| Railway | Hebergement web (auto-deploy main) |
| Google AdSense | Monetisation web (a integrer) |

### CI/CD

- Pre-commit hook (Husky) : `pnpm lint` (TypeScript + ESLint)
- Push sur `main` = deploiement automatique Railway

---

## Milestones

### Milestone 0-4 : Fondations ✅

Setup monorepo, donnees (80 produits JSON + types + helpers Zod), page d'accueil (carousels, filtres, MonthDrawer), pages produits (SEO, Schema.org, nutrition), recherche fuzzy (Fuse.js, debounce).

### Milestone 5 : Banniere App

- [ ] AppBanner component (fermeture localStorage)
- [ ] Liens stores (placeholders)

### Milestone 6 : Pages legales et AdSense

**Pages legales (pre-requis AdSense + App Store)**

- [ ] Page `/mentions-legales` — obligation legale francaise (editeur, hebergeur)
- [ ] Page `/confidentialite` — politique de confidentialite RGPD (donnees collectees, cookies, droits)
- [ ] Page `/cgu` — conditions generales d'utilisation (pre-requis App Store)
- [ ] Email support fonctionnel : `contact@estcequecestlasaison.fr`
- [ ] Liens vers pages legales dans le footer

**AdSense**

- [ ] Bandeau de consentement cookies (RGPD)
- [ ] Integrer Google AdSense
- [ ] Native ads dans les carousels
- [ ] Respecter UX (pas trop intrusif)

### Milestone 7-8 : SEO & Deploy ✅

Favicons, OG images, sitemap dynamique, SearchAction JSON-LD, animations, deploiement Railway, domaine achete.

### Milestone 9 : Page Calendrier Annuel ✅

Route `/calendrier` avec tableau TanStack Table (80 produits, 12 colonnes mois, tri, recherche, filtrage, impression, structured data).

### Milestone 10 : Alternatives Hors Saison ✅

Quand un produit est hors saison, affiche max 4 alternatives de la meme categorie en saison (tri alphabetique, deterministe). Grille 2 colonnes (4 desktop) avec avatar + nom + chevron. Helper `getSeasonAlternatives` dans shared.

### Milestone 11 : Bouton Partage (Mobile) ✅

Partage via Web Share API sur mobile (masque si non supporte). Texte conversationnel genere dynamiquement selon le statut saison. Hook `useCanShare`, helper `getShareText` dans shared. Inline dans `$slug.tsx` a cote du H1.

### Milestone 12 : Hero Titre Homepage ✅

Premier carousel "En pleine saison de..." rendu en H1 hero (text-2xl/3xl bold). Prop `hero` sur `ProduceCarousel`.

### Milestone 13 : Recherche Globale ✅

Modale cmdk (Cmd+K), SearchCommand, SearchSuggestions (dropdown homepage), useSearch context provider, SearchProvider dans __root.tsx. Suppression de l'ancien SearchDrawer.

---

## Ordre de priorite

1. **Milestone 6** : AdSense + pages legales (monetisation)
2. **Milestone 5** : Banniere App (quand l'app mobile sera prete)

---

## Differe (decisions documentees)

| Feature | Raison du report |
|---------|-----------------|
| Newsletter / email capture | Necessite un service tiers + creation de contenu mensuel |
| Shopping list (liste de courses) | Nice-to-have, pas dans le scope actuel |
| Analytics | Pas de tracking, utiliser Search Console pour les donnees de base |
| Dark mode | Pas prioritaire, le theme light est coherent |
| Filtres avances (vitamines, calories) | Le dataset ne le justifie pas encore |
| PWA / service worker | Pas prioritaire pour le moment |

---

## Non inclus (hors scope)

- Authentification
- Base de donnees serveur
- Multi-langues
- Multi-regions
- Backend API
