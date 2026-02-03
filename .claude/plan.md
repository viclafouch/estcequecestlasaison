# Plan - estcequecestlasaison.fr

## Vision

Site web + Application mobile permettant de connaître la saisonnalité des fruits et légumes en France métropolitaine.

- **Web** : SEO optimisé pour "est-ce que c'est la saison de X", monétisé via AdSense
- **Mobile** : 100% offline, gratuit sans pub, notifications saison

**Domaine :** estcequecestlasaison.fr (à acheter)

---

## Décisions Techniques

| Aspect | Choix |
|--------|-------|
| Monorepo | pnpm workspaces (simple) |
| Hosting Web | Railway (auto-deploy depuis main) |
| Mobile | React Native + Expo (iOS + Android) |
| Icons | @iconify/react (Emojione) |
| Recherche | Fuse.js (fuzzy search client-side) |
| Données | JSON statique (figé, saisons ne changent pas) |
| Langue | Français uniquement |

---

## Librairies

### UI & Styling (`apps/web`)
| Librairie | Usage |
|-----------|-------|
| `clsx` | Construction de classNames conditionnels |
| `tailwind-merge` | Merge les classes Tailwind sans conflits |
| `class-variance-authority` | Variants de composants (cva) |
| `@radix-ui/react-dialog` | Modal accessible (détails produit) |
| `vaul` | Drawer mobile-friendly |
| `lucide-react` | Icônes UI (flèches, fermer, etc.) |

### Animation (`apps/web`)
| Librairie | Usage |
|-----------|-------|
| `motion` | Framer Motion - animations subtiles |
| `tw-animate-css` | Classes d'animation Tailwind |

### Dates (`packages/shared`)
| Librairie | Usage |
|-----------|-------|
| `date-fns` | Navigation mois, formatage dates |

### SEO (`apps/web`)
| Librairie | Usage |
|-----------|-------|
| `schema-dts` | Types TypeScript pour Schema.org |

### Validation (`packages/shared`)
| Librairie | Usage |
|-----------|-------|
| `zod` | Validation des données |

### Dev Experience (root)
| Librairie | Usage |
|-----------|-------|
| `husky` | Git hooks (lint avant commit) |
| `vitest` | Tests unitaires |

---

## Monétisation

| Plateforme | Modèle |
|------------|--------|
| Web | Google AdSense (native ads dans la grille) |
| Mobile | 100% gratuit, sans publicité |

---

## Architecture Monorepo

```
estcequecestlasaison/
├── apps/
│   ├── web/                  → Site TanStack Start (SSR)
│   └── mobile/               → App React Native / Expo
├── packages/
│   └── shared/               → Données + Types + Helpers
├── package.json              → Workspace root
└── pnpm-workspace.yaml
```

---

## Phase 1 : Site Web

### Routes
- `/` - Page d'accueil (mois en cours, grille produits)
- `/:slug` - Page produit SEO (ex: `/pomme`, `/banane`)
- `/faq` - Questions fréquentes (sources, contact, projet)
- `/mentions-legales` - Mentions légales (si AdSense)
- `/politique-de-confidentialite` - Politique RGPD (si AdSense)

### Header
- **Logo** : Texte simple stylé (pas d'icône)
- Barre de recherche fuzzy (Fuse.js)
- **Bannière promo app** : Fermeture mémorisée (localStorage)

### Page d'accueil (`/`)
- Navigation mois (flèches + sélecteur)
- Toggle filtre : Tous / Fruits / Légumes
- Grille de cards avec **native ads AdSense** intercalées
- Clic card → page produit

### Page produit (`/:slug`)
- Icône (@iconify Emojione) + Nom
- Statut : "En pleine saison" / "Début/fin de saison" / "Hors saison"
- Calendrier 12 mois
- Infos nutritionnelles
- **SEO** : meta optimisés ("Est-ce que c'est la saison de la pomme ?")

### Footer
- Crédits minimalistes
- Liens stores (placeholders Phase 1)

### Indicateurs saisonnalité
- 🟢 **Pleine saison**
- 🟡 **Début/fin de saison**
- ⚪ **Hors saison**

---

## Phase 2 : Application Mobile

### Stack
| Couche | Technologie |
|--------|-------------|
| Framework | React Native + Expo |
| Navigation | Expo Router |
| Offline | Données embarquées + AsyncStorage |
| Notifications | Expo Notifications |

### Plateformes
- iOS (App Store)
- Android (Google Play)

### Fonctionnalités
- Consultation offline (données embarquées)
- Recherche locale
- **Notifications saison** : Alertes quand un produit entre en saison

### Monétisation
- 100% gratuit
- Aucune publicité

---

## Design

- **Style** : Clean, inspiré Airbnb
- **Palette** : Blanc, gris, accent rouge-orange
- **Theme** : Light uniquement
- **Responsive** : Mobile-first
- **Logo** : Texte stylé, pas d'icône

---

## Infrastructure

| Service | Usage |
|---------|-------|
| Railway | Hébergement web (auto-deploy main) |
| App Store | Distribution iOS |
| Google Play | Distribution Android |
| Google AdSense | Monétisation web |

### CI/CD
- Push sur `main` = déploiement automatique Railway

### À configurer plus tard
- Domaine estcequecestlasaison.fr
- Compte AdSense
- Comptes développeur Apple/Google

---

## Milestones

### Milestone 0 : Setup Monorepo ✅
- [x] Restructurer en monorepo (apps/web, packages/shared)
- [x] Configurer pnpm workspaces
- [x] Migrer code existant vers apps/web
- [x] Créer packages/shared avec structure de base
- [x] Installer dépendances web (clsx, tailwind-merge, cva, radix, vaul, motion, etc.)
- [x] Installer dépendances shared (date-fns, zod, fuse.js)
- [x] Installer devDependencies root (husky, vitest)
- [x] Créer CLAUDE.md par workspace (root, web, shared)

### Milestone 1 : Données & Types ✅
- [x] Installer @iconify/react dans apps/web
- [x] Créer `produce.json` complet (~50-100 items)
- [x] Définir types TypeScript dans shared
- [x] Helpers saisonnalité dans shared (avec date-fns)
- [x] Setup Tailwind palette Nature/Organique

### Milestone 2 : Page d'accueil ✅
- [x] Header avec logo texte + filtres catégories
- [x] SearchBar avec zone mois cliquable
- [x] ProduceCarousel + ProduceCard avec icônes SVG
- [x] Filtres (Tous/Fruits/Légumes)
- [x] **MonthSelector avec Drawer (vaul)**
  - Trigger : zone mois dans SearchBar (cliquable)
  - Drawer : navigation ←/→, stats, "arrivent"/"partent"
  - Mise à jour page à la confirmation uniquement
  - Même comportement desktop/mobile
- [x] Helpers shared : `getArrivingProduce`, `getLeavingProduce`, `getMonthStats`
- [x] Footer minimaliste

### Milestone 3 : Pages produits (SEO) ✅
- [x] Route dynamique `$slug.tsx`
- [x] SeasonCalendar (12 mois)
- [x] Infos produit (nutrition, conservation, origine, conseils d'achat)
- [x] Meta tags SEO optimisés
- [x] Structured data (Schema.org)
- [x] Documenter les sources des données JSON (nutrition, conservation, origine, conseils d'achat)

### Milestone 4 : Recherche ✅
- [x] Installer Fuse.js
- [x] Recherche fuzzy (Fuse.js) intégrée dans helpers/produce
- [x] Intégration SearchBar dans la page d'accueil
- [x] Navigation vers pages produits (ProduceCard → /$slug)
- [x] Debounce recherche (useDebouncedValue, 200ms)
- [x] Reset scroll carousels sur changement recherche/catégorie/mois

### Milestone 5 : Bannière App
- [ ] AppBanner component (fermeture localStorage)
- [ ] Liens stores (placeholders)

### Milestone 6 : Publicités (AdSense)
- [ ] Page /mentions-legales (obligation légale française)
- [ ] Page /politique-de-confidentialite (RGPD + pré-requis AdSense)
- [ ] Bandeau de consentement cookies (RGPD)
- [ ] Intégrer Google AdSense
- [ ] Native ads dans la grille
- [ ] Respecter UX (pas trop intrusif)

### Milestone 7 : SEO & Assets ✅
- [x] Générer favicon (16x16, 32x32, 180x180, 192x192, 512x512) + manifest.webmanifest
- [x] Créer OG images (1200x630, 1 par produit + default)
- [x] Sitemap dynamique (générer les URLs `/$slug` pour chaque produit)
- [x] Supporter le query param `?q=` sur la homepage (SearchAction JSON-LD)

### Milestone 8 : Polish & Deploy ✅
- [x] Animations subtiles (search drawer, header underline, month bar)
- [x] Tests responsive
- [x] Configurer Railway
- [x] Acheter domaine estcequecestlasaison.fr

---

### Milestone 9 : Page Calendrier Annuel ✅

**Objectif :** Page de reference SEO "calendrier fruits et legumes de saison" avec vue annuelle imprimable.

**Route :** `/calendrier` - Tous les produits (80 items) avec filtrage/tri client-side

**Approche retenue :** Une seule route avec CalendarTable interactif (recherche, tri par nom/saison, highlight mois courant) au lieu de 3 routes separees. Le filtrage fruits/legumes se fait directement dans le tableau.

**Structure fichiers :**
```
src/routes/calendrier.tsx         → Route unique avec CalendarPageContent
src/components/calendar-page.tsx  → Layout (titre, description, bouton print, JSON-LD)
src/components/calendar-table.tsx → Tableau interactif (TanStack Table)
src/components/calendar-toolbar.tsx → Barre recherche + tri
src/components/calendar-legend.tsx  → Legende couleurs
src/constants/calendar.ts         → Config (titre, description, keywords, breadcrumbs)
```

**CalendarPageContent :**
- Titre + description
- Bouton "Imprimer" (window.print(), desktop uniquement)
- Structured data JSON-LD (BreadcrumbList + ItemList)

**CalendarTable (TanStack Table) :**
- Tableau 12 colonnes (Janvier a Decembre) + colonne sticky produit
- Ligne par produit : avatar + nom (lien vers `/$slug`)
- Mois courant surligne (fond distinct)
- Cellules : dot coloree (vert pleine saison, ambre debut/fin, gris hors saison)
- Tri : par nom (A-Z) ou par nombre de mois en saison
- Recherche globale dans le tableau
- Mobile : scroll horizontal avec colonne produit sticky a gauche

**Data loading :**
- Full SSR dans le route loader (80 produits, payload minimal : name, slug, seasons)
- Server function `getCalendarData('all')`

**SEO :**
- `/calendrier` : "Calendrier des fruits et legumes de saison en France"
- Structured data : BreadcrumbList + ItemList
- Ajoute au sitemap (priority 0.8, monthly)

**Impression (@media print) :**
- Legende couleurs
- Labels texte dans cellules pour impression noir et blanc
- Masquer : navigation, footer, bouton imprimer, toolbar

**Navigation :**
- Lien "Calendrier" dans SiteHeader

**Taches :**
- [x] Route `/calendrier.tsx` avec loader
- [x] Composant `CalendarPageContent` (titre, print, JSON-LD)
- [x] Composant `CalendarTable` (TanStack Table, 12 colonnes, tri, recherche)
- [x] Composant `CalendarToolbar` (recherche + tri)
- [x] Composant `CalendarLegend` (legende couleurs)
- [x] Server function `getCalendarData` (minimal payload)
- [x] SEO : head() avec seo()
- [x] Structured data : BreadcrumbList + ItemList
- [x] Ajouter au sitemap
- [x] Stylesheet @media print
- [x] Ajouter lien "Calendrier" dans SiteHeader

---

### Milestone 10 : Alternatives Hors Saison

**Objectif :** Quand un produit est hors saison, suggerer des alternatives de la meme categorie actuellement en saison.

**Logique :**
- Afficher uniquement quand le produit est hors saison pour le mois courant
- Selectionner les 3 premiers produits (tri alphabetique) de la meme categorie (fruit/legume) qui sont en saison (peak ou partial)
- Deterministe : toujours les memes 3 pour un produit donne a un mois donne (alphabetique = pas de random)
- Si moins de 3 alternatives disponibles, afficher ce qu'il y a

**UI :**
- Position : inline dans la section hero, sous le badge "Hors saison"
- Label : "Essayez plutot" suivi de chips/pills cliquables
- Chips : icone produit (16px) + nom, fond leger, coins arrondis
- Liens vers `/$slug` de chaque alternative
- Centrage mobile, alignement gauche desktop (coherent avec la page produit)

**Implementation :**
- Nouvelle server function ou extension de `getSlugPageData` pour retourner les alternatives
- Helper shared : `getSeasonAlternatives({ produce, month, allProduce })` retourne `Produce[]`
- Composant `SeasonAlternatives` avec les chips

**Taches :**
- [ ] Helper shared `getSeasonAlternatives` (meme categorie, en saison, tri alpha, limit 3)
- [ ] Etendre `getSlugPageData` pour inclure les alternatives
- [ ] Composant `SeasonAlternatives` (chips/pills avec icone + nom)
- [ ] Integrer dans `$slug.tsx` sous le badge hors saison
- [ ] Ne pas afficher si le produit est en saison

---

### Milestone 11 : Bouton Partage (Mobile)

**Objectif :** Permettre le partage d'une fiche produit via le Web Share API sur mobile.

**Placement :**
- Bouton icone (share arrow) a cote du H1 nom du produit
- Mobile uniquement (masque sur `md:` et au-dessus)
- Petit format, discret, ne casse pas la hierarchie visuelle

**Comportement :**
- Utilise `navigator.share()` (Web Share API)
- Fallback : si Web Share API non supportee, bouton masque (pas de fallback desktop)
- Detection via `typeof navigator.share === 'function'`

**Donnees partagees :**
- `title` : nom du produit (ex: "Pomme")
- `text` : ton conversationnel, genere dynamiquement selon le statut saison
  - En saison : "Savais-tu que la pomme est de saison en ce moment ? Decouvre les fruits et legumes de saison sur estcequecestlasaison.fr"
  - Hors saison : "Decouvre quand commence la saison de la pomme sur estcequecestlasaison.fr"
- `url` : URL canonique de la page produit

**Taches :**
- [ ] Composant `ShareButton` (icone, mobile-only, detection Web Share API)
- [ ] Helper `getShareText({ produce, month })` pour generer le texte conversationnel
- [ ] Integrer dans `$slug.tsx` a cote du H1
- [ ] Tester sur mobile (iOS Safari, Chrome Android)

---

### Milestone 12 : Tagline Homepage (Desktop)

**Objectif :** Ajouter une tagline visible sur la homepage pour les visiteurs desktop, ameliorant la comprehension immediate du site.

**Specification :**
- Texte : "Decouvrez les fruits et legumes de saison en France"
- Position : sous la SearchBar, au-dessus du premier carousel
- Visible uniquement sur `md:` et au-dessus (masque sur mobile)
- Remplace le `<h1 className="sr-only">` actuel sur desktop (le sr-only reste pour mobile)
- Style : texte gris-600, taille base, centre ou aligne selon le layout

**Taches :**
- [ ] Modifier `index.tsx` : H1 visible sur md+, sr-only sur mobile
- [ ] Style coherent avec le design existant

---

### Phase 2 : App Mobile
- [ ] Setup Expo
- [ ] Ecrans principaux
- [ ] Offline avec donnees embarquees
- [ ] Systeme de notifications saison
- [ ] Publication App Store
- [ ] Publication Google Play

---

## Ordre de priorite (Sprint UX)

1. **Milestone 9** : Page Calendrier (plus gros impact SEO + feature manquante critique)
2. **Milestone 10** : Alternatives Hors Saison (ameliore l'UX pages produit)
3. **Milestone 11** : Bouton Partage (viralite mobile)
4. **Milestone 12** : Tagline Homepage (quick win desktop)
5. **Milestone 6** : AdSense + pages legales (apres avoir du trafic a monetiser)
6. **Milestone 5** : Banniere App (quand l'app mobile approche)

---

## Differe (decisions documentees)

| Feature | Raison du report |
|---------|-----------------|
| Search typeahead/autocomplete | La recherche filtre deja les carousels en temps reel, le typeahead n'ajoute pas assez de valeur |
| Newsletter / email capture | Necessite un service tiers + creation de contenu mensuel, reporter apres lancement app |
| Shopping list (liste de courses) | Nice-to-have, pas dans le scope actuel |
| Analytics | Pas de tracking, utiliser Search Console pour les donnees de base |
| Dark mode | Pas prioritaire, le theme light est coherent |
| Filtres avances (vitamines, calories) | Le dataset ne le justifie pas encore |
| PWA / service worker | Pont vers l'app mobile, a faire quand Phase 2 approche |

---

## Non inclus (hors scope)

- Authentification
- Base de donnees serveur
- Multi-langues
- Multi-regions
- Backend API
