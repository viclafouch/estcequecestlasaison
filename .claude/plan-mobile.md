# Plan Mobile — estcequecestlasaison

> **Regle : toujours utiliser les dernieres versions stables de chaque librairie.**

## Contexte developpeur

- **Profil** : 10 ans d'experience front-end web, zero experience mobile
- **Appareil de test Android** : Google Pixel 9 — tests via dev build local
- **Appareil de test iOS** : pas de device physique — tests via simulateur Xcode uniquement ⚠️ Risque : bugs specifiques a certains modeles non detectes
- **macOS** : Darwin 25.2.0, Xcode 26.0 installe
- **Comptes stores** : aucun — a creer pendant le developpement (Apple Developer $99/an, Google Play $25 one-time)

> Adapter toute la documentation et les instructions au niveau debutant mobile. Ne jamais supposer que les outils natifs sont deja installes ou connus.

> **Preference utilisateur** : toutes les commandes d'installation d'outils (brew, npm global, Android Studio, etc.) doivent etre fournies a l'utilisateur pour execution manuelle. Ne jamais executer automatiquement les installations systeme.

## Strategie plateforme

**iOS-first** pour le developpement et les features, validation Android en parallele.

- **Dev principal** : simulateur iOS (Xcode deja installe)
- **Validation Android** : Pixel 9 via dev build local
- **Features iOS-only** (expo-widgets, quand stable) : prioritaires
- **Features cross-platform** : testees sur les deux via dev builds locaux
- **Orientation** : portrait only (verrouille)

### Setup requis au lancement

| Outil | Commande | Pourquoi |
|-------|----------|----------|
| Watchman | `brew install watchman` | File watcher, hot reload performant |
| CocoaPods | `brew install cocoapods` | Dependances iOS natives |
| JDK 17+ | `brew install openjdk@17` | Builds Android |
| Android Studio | A installer | Emulateur Android, dev builds natifs |

> Note : EAS CLI non necessaire — tous les builds sont locaux.

---

## Stack cible

| Technologie | Version | Notes |
|-------------|---------|-------|
| React Native | 0.83.1 | New Architecture obligatoire (legacy supprimee) |
| Expo SDK | 55 (preview) | New Architecture par defaut, `newArchEnabled` supprime |
| React | 19.2.0 | React Compiler non activé (à évaluer Phase 2 si besoin perf) |
| Hermes | v1 | Opt-in, nouveau compilateur + VM, gains de performance significatifs |
| Expo Router | v5 (55.0.0-preview) | File-based routing, Native Tabs API, deep linking |

Statut : **en cours (M0)**

---

## Decisions techniques

| Aspect | Choix | Justification |
|--------|-------|---------------|
| Navigation | Tab Bar natif (3 onglets) | Convention iOS/Android, thumb-friendly |
| Footer | Supprime | Tab Bar remplace la navigation, pas de footer sur mobile natif |
| Data layer | Couche service locale | Module service centralise, pas de server functions, offline by design |
| Data updates | JSON bundle dans le binary | Mise a jour = nouvelle version app sur les stores, zero infra |
| Recherche | Fuse.js direct (JS thread) | 80 items negligeable, debounce suffisant, partage avec shared |
| UI library | @heroui/react-native (all-in) | Tous les composants via HeroUI, accepter le risque beta |
| Styling | Uniwind (Tailwind v4 RN) | Build-time, classes utilitaires familieres depuis le web |
| Animations | Reanimated 4 (riches) | CSS animations/transitions, layout animations, transitions ecrans |
| Icones UI | Icones HeroUI | Zero dependance supplementaire, integre a la UI library |
| Images produits | Bundlees dans l'app | Offline garanti, zero latence, +5-10MB taille app |
| Listes | @shopify/flash-list v2 | Mainstream, mesure auto, JS-only, New Architecture only |
| Design | Hybride web/natif | Couleurs et composants du web + patterns natifs (blur, navigation) |
| Theme | Light only | Coherent avec le web, un seul theme |
| Splash | Logo centre + fond blanc | Simple, coherent avec la marque |
| Onboarding | Aucun | App intuitive, zero friction au premier lancement |
| Haptics | Non | Pas necessaire pour une app de consultation |
| Builds | Tout local | Dev builds + prod builds locaux, zero dependance cloud |
| Tests | Vitest uniquement | Unit tests partages, tests manuels sur simulateur + device |
| Monitoring | Sentry des le MVP | Crash reporting + performance, SDK Expo officiel |
| Deep linking | Des le MVP | Universal links iOS + app links Android, URLs du site ouvrent l'app |
| Accessibilite | Audit complet | VoiceOver + TalkBack, meme niveau que le web |
| Versioning | SemVer, 0.x en dev, 1.0.0 au lancement store | Builds internes en 0.x pendant le developpement |
| Screenshots store | Manuels | Simples pour un MVP francais uniquement |

---

## Librairies retenues

### UI & Styling

| Librairie | Version | Usage |
|-----------|---------|-------|
| @heroui/react-native | 1.0.0-beta.13+ | UI library — voir bugs connus ci-dessous |
| uniwind | 1.2.2+ | Tailwind v4 bindings pour React Native, build-time, dark mode, pseudo-classes |
| react-native-reanimated | ~4.2.1 | CSS animations/transitions, layout animations. Worklets dans react-native-worklets 0.7.2 |

### HeroUI Native — bugs connus (beta.13)

**Composants a eviter** (utiliser du RN natif a la place) :
- `Avatar` / `Avatar.Image` → crash Reanimated (animated style sur non-animated component)
- `Chip` → warnings SVG "invalid" color (theme non resolu)
- Composants dans des FlashList → lag + ecrans blancs

**Composants OK** : `BottomSheet`, `Accordion`, `Dialog`, `Toast`

**Issues GitHub a surveiller** (si fixees → re-tester) :

| Issue | Statut | Description |
|-------|--------|-------------|
| [#253](https://github.com/heroui-inc/heroui-native/issues/253) | OPEN | Lag + blank screens dans FlashList |
| [#262](https://github.com/heroui-inc/heroui-native/issues/262) | OPEN | Button Ghost `colorKit.RGB` error (meme cause que Chip "invalid") |
| [#270](https://github.com/heroui-inc/heroui-native/issues/270) | OPEN | Beta 13 + Uniwind error |
| [#33](https://github.com/heroui-inc/heroui-native/issues/33) | CLOSED | Reanimated crash (Avatar, pas vraiment resolu) |

### Navigation & Ecrans

| Librairie | Version | Usage |
|-----------|---------|-------|
| expo-router | v5 (55.0.0-preview) | File-based routing, Native Tabs API, deep linking, typed routes |
| react-native-screens | ~4.22.0 | Primitives de navigation natives, dependance Expo Router |

### Listes & Performance

| Librairie | Version | Usage |
|-----------|---------|-------|
| @shopify/flash-list | 2.2.0+ | Listes virtualisees haute performance, mesure auto v2, New Architecture only |

### Widgets & Features natives

> **Differe.** `expo-widgets` est en alpha. A installer quand le package sera stable. Voir M7.

### Monitoring

| Librairie | Version | Usage |
|-----------|---------|-------|
| @sentry/react-native | latest | Crash reporting, performance monitoring, SDK Expo officiel |

### Donnees (via packages/shared)

| Librairie | Version | Usage |
|-----------|---------|-------|
| fuse.js | existant | Recherche fuzzy (partage avec le web) |
| zod | existant | Validation des donnees (partage avec le web) |

### Retention & Storage

| Librairie | Version | Usage |
|-----------|---------|-------|
| expo-store-review | ~55.0.4 | Demande de rating natif (SKStoreReviewController iOS / ReviewManager Android) |
| expo-sqlite | ~55.0.4 | KV store synchrone (`expo-sqlite/kv-store`) pour tracker les vues produit et demandes de rating |

### Partage

Utilise `Share` de `react-native` (API native, pas de dependance supplementaire). Partage texte + URL via share sheet natif.

---

## Librairies ecartees

| Librairie | Raison |
|-----------|--------|
| @bacons/apple-targets | Apple Watch ecarte — pas assez de valeur pour le use case |
| expo-share-intent | Recevoir du contenu partage — use case trop niche |
| @legendapp/list | FlashList retenu a la place (mainstream, mieux documente) |
| react-native-unistyles | Uniwind retenu (plus proche de l'experience web Tailwind) |
| react-native-nitro-modules | Pas de besoin de modules natifs custom |
| expo-live-activity | expo-widgets couvrira le besoin (widgets iOS). Live Activities a evaluer Phase 2 |
| lucide-react-native | Icones HeroUI utilisees a la place |
| Maestro | Vitest uniquement pour le MVP, tests manuels sur device |
| Radon | Extension VSCode — outil DX, pas une lib. A evaluer separement |
| agent-device | CLI controle devices pour AI agents (Callstack incubator) — early stage, a surveiller pour Phase 2 (tests E2E + screenshots auto) |

---

## Architecture

### Structure app mobile

```
apps/mobile/
├── app/                       → Expo Router (file-based routing)
│   ├── _layout.tsx            → Root layout (Tab Bar, providers)
│   ├── (tabs)/                → Tab Bar group
│   │   ├── _layout.tsx        → Tab Bar config (3 onglets)
│   │   ├── index.tsx          → Accueil (carousels)
│   │   ├── search.tsx         → Recherche (ecran dedie)
│   │   └── calendar.tsx       → Calendrier (liste filtree)
│   └── product/
│       └── [slug].tsx         → Page produit dynamique
├── components/                → Composants UI mobile
│   ├── produce-card.tsx       → Carte produit (avatar, nom, badge)
│   ├── produce-carousel.tsx   → Carousel horizontal FlashList
│   ├── produce-avatar.tsx     → Image circulaire produit (bundlee)
│   ├── produce-badge.tsx      → Badge de saison colore
│   ├── season-calendar.tsx    → Grille 12 mois avec dots
│   ├── month-bottom-sheet.tsx → BottomSheet selection mois + stats
│   ├── filter-chips.tsx       → Chips Tous/Fruits/Legumes
│   ├── product-hero.tsx        → Hero produit (image, nom, statut, partage)
│   ├── faq-section.tsx        → Section FAQ en bas de homepage
│   └── season-alternatives.tsx→ Alternatives en saison (hors saison)
├── (pas de services/ local — tout dans packages/shared)
├── constants/                 → Constantes app
│   ├── theme.ts               → Couleurs, tailles (emerald #10b981)
│   ├── season.ts              → Styles dots saison + mapping badge→season
│   └── navigation.ts          → Config Tab Bar
├── assets/                    → Images bundlees
│   └── produce/               → 80 images produits (WebP ou PNG)
├── app.json                   → Config Expo (splash, icon, plugins)
├── package.json               → Dependances mobile
└── tsconfig.json              → TypeScript config
```

### Data Flow mobile

Pattern : **JSON (shared)** → **Service Layer (shared)** → **Composants (import direct)**

La couche service est mutualisee dans `packages/shared/src/services/` :

1. `packages/shared` exporte `PRODUCE_LIST`, `searchProduce`, et 5 fonctions service :
   - `getGroupedProduce({ searchQuery, category, month })` → produits groupes par saison
   - `getSearchSuggestions({ query })` → top 5 resultats fuzzy avec badges
   - `getProductBySlug({ slug })` → donnees produit + related + alternatives
   - `getMonthStatsData({ month })` → stats du mois (arrivants, partants)
   - `getCalendarData({ type })` → produits tries pour le calendrier
2. Le mobile importe directement depuis `@estcequecestlasaison/shared` (pas de couche service locale)
3. Le web wrappe ces memes fonctions dans `createServerFn` (Zod validation + dynamic import pour le bundle client)

> Le JSON est dans le binary de l'app. Zero reseau, zero latence, 100% offline.

### Package shared — services

La logique metier est centralisee dans `packages/shared/src/services/` :

- `produce-data.ts` — `PRODUCE_LIST` (typed), instance Fuse.js, `searchProduce()`
- `produce.ts` — 5 fonctions service pures (identiques web et mobile)
- La logique specifique mobile (navigation, animations, platform detection) reste dans `apps/mobile`

---

## Ecrans et navigation

### Tab Bar (3 onglets)

| Onglet | Icone | Ecran | Description |
|--------|-------|-------|-------------|
| Accueil | Maison | `(tabs)/index.tsx` | Carousels par mois, filtres, BottomSheet mois |
| Recherche | Loupe | `(tabs)/search.tsx` | Ecran recherche plein, champ + resultats live |
| Calendrier | Calendrier | `(tabs)/calendar.tsx` | Liste filtree des 80 produits avec dots 12 mois |

### Ecrans hors Tab Bar

| Ecran | Route | Description |
|-------|-------|-------------|
| Page produit | `product/[slug]` | Detail produit, push depuis n'importe quel onglet |

---

## Ecran Accueil (`(tabs)/index.tsx`)

Miroir de la homepage web, adapte mobile natif.

### Layout

- **Header** : titre app + icone info (ouvre FAQ)
- **Chips filtres** : barre horizontale sticky (Tous / Fruits / Legumes) sous le header
- **3 carousels horizontaux** (FlashList horizontal) :
  1. **"En pleine saison de [mois]"** — produits peak/partial du mois courant
  2. **"Nouveautes en [mois+1]"** — produits arrivant le mois prochain (mois courant uniquement)
  3. **"Hors saison"** — produits ni ce mois ni le prochain
- **Section FAQ** : quelques questions cles en bas du scroll + lien vers ecran FAQ complet
- **BottomSheet mois** : accessible via un badge mois cliquable, affiche stats + produits arrivants/partants + compteurs animes

### Interactions

- Tap sur un ProduceCard → push vers `product/[slug]`
- Tap sur un chip filtre → filtre les 3 carousels
- Tap sur le badge mois → ouvre BottomSheet mois
- Swipe horizontal dans les carousels

---

## Ecran Recherche (`(tabs)/search.tsx`)

Ecran dedie dans la Tab Bar, pattern Instagram/Spotify.

### Layout

- **Champ de recherche** : en haut, auto-focus au tap sur l'onglet
- **Resultats live** : FlashList de ProduceCards filtrees, mise a jour avec debounce
- **Etat vide** : message quand aucun resultat
- **Etat initial** : afficher tous les produits en saison (ou suggestion de recherche)

### Logique

- Fuse.js fuzzy search sur le nom des produits
- Debounce 150-200ms
- Top resultats (pas de limite a 5 comme le web, afficher tous les matchs)
- Tap sur un resultat → push vers `product/[slug]`

---

## Ecran Calendrier (`(tabs)/calendar.tsx`)

Adaptation du tableau web en liste filtree mobile.

### Layout

- **Toolbar** : champ recherche + filtre (Tous/Fruits/Legumes) + tri (A-Z / nombre de mois en saison)
- **FlashList verticale** : une row par produit
  - Avatar + nom du produit
  - 12 dots colores en ligne (un par mois)
  - Mois courant surligne
  - Tap → push vers `product/[slug]`
- **Legende** : explication des couleurs (peak vert, partial ambre, off gris)

### Couleurs dots

| Couleur | Statut |
|---------|--------|
| Vert (#10b981) | Pleine saison (peak) |
| Ambre (#f59e0b) | Debut/fin de saison (partial) |
| Gris (#d1d5db) | Hors saison (off) |

---

## Ecran Produit (`product/[slug].tsx`)

Page detail produit, push navigation depuis n'importe quel ecran.

### Layout (ScrollView, tout affiche sans accordeon)

1. **Section hero** :
   - Image produit grande (bundlee, aspect-square)
   - Nom du produit + label type (Fruit/Legume)
   - Bouton partage (texte + image via expo-sharing)
   - Statut saison avec dot coloree (memes labels que le web)
   - Detail badge ("Jusqu'en aout", "A partir de mars")
   - **Alternatives en saison** (quand hors saison) : grille 2 colonnes, max 4 produits meme categorie

2. **Infos nutritionnelles** :
   - Calories (kcal)
   - Vitamines (chips)

3. **Details** (toujours visibles, pas d'accordeon) :
   - Origine
   - Conservation
   - Bien choisir (conseil d'achat)
   - Bienfaits

4. **Calendrier 12 mois** : grille dots colores

5. **Produits lies** : carousel horizontal "Aussi de saison" (meme categorie, en saison)

### Partage

- Texte conversationnel (via `getShareText` de shared) + URL du produit
- Share sheet natif via `Share` de react-native (texte + URL, pas d'image)
- Toujours visible (pas de detection comme le web)

---

## Widgets iOS — DIFFERE

> **`expo-widgets` est en alpha.** Quand le package sera stable, implementer des widgets iOS (home screen + lock screen) affichant les produits de saison du mois. Consulter la doc Expo a ce moment-la pour l'API a jour.

---

## Deep Linking

Universal links iOS + app links Android des le MVP.

### Configuration

- **iOS** : `apple-app-site-association` a heberger sur estcequecestlasaison.fr
- **Android** : `assetlinks.json` a heberger sur estcequecestlasaison.fr
- **Expo Router** : config dans `app.json` + scheme personnalise

### Routes supportees

| URL web | Route app | Comportement |
|---------|-----------|-------------|
| `estcequecestlasaison.fr/` | `(tabs)/index` | Ouvre la homepage |
| `estcequecestlasaison.fr/{slug}` | `product/[slug]` | Ouvre la page produit |
| `estcequecestlasaison.fr/calendrier` | `(tabs)/calendar` | Ouvre le calendrier |

### Fallback

- Si l'app n'est pas installee : le site web s'ouvre normalement dans le navigateur
- Config cote web necessaire (heberger les fichiers d'association)

---

## Design

### Identite visuelle

| Aspect | Valeur |
|--------|--------|
| Style | Clean, coherent avec le web + patterns natifs |
| Palette | Blanc, gris, accent emeraude (#10b981) |
| Theme | Light only |
| Logo | Meme logo que le web (PNG) |
| App icon | Logo sur fond blanc (Expo icon) |
| Splash screen | Logo centre sur fond blanc (expo-splash-screen natif) |

### Approche hybride

- **Du web** : couleurs, composants (cards, pills, avatars, badges), typographie de contenu
- **Du natif** : blur headers, transitions de navigation, Tab Bar, BottomSheet, SafeAreaView, status bar management

### Indicateurs saisonnalite

| Couleur | Statut | Contexte |
|---------|--------|----------|
| Vert (#10b981) | Pleine saison (peak) | Cards, calendrier, page produit |
| Ambre (#f59e0b) | Debut/fin de saison (partial) | Cards, calendrier, page produit |
| Gris (#d1d5db) | Hors saison (off) | Cards, calendrier, page produit |

---

## Accessibilite

Audit complet, meme niveau que le web.

- `accessibilityLabel` sur tous les boutons, images et elements interactifs
- `accessibilityRole` sur les composants (button, image, link, header, tab)
- `accessibilityHint` pour les interactions non evidentes
- Ordre de focus logique (VoiceOver / TalkBack)
- Annonces dynamiques pour les changements de contenu
- Tests avec VoiceOver (iOS simulateur) et TalkBack (Pixel 9)
- Support des tailles de texte systeme (Dynamic Type iOS, font scaling Android)

---

## Monitoring

### Sentry

- `@sentry/react-native` avec integration Expo
- Crash reporting automatique
- Performance monitoring (temps de demarrage, navigation entre ecrans)
- Source maps uploades pour les builds de production
- Tier gratuit (5k events/mois)

---

## ASO & Growth

Strategie d'acquisition et retention basee sur les best practices 2026.

### App Store Optimization (ASO)

L'ASO genere 65% des installs organiques. Optimiser des le lancement.

#### Metadata stores

| Element | iOS (App Store) | Android (Google Play) |
|---------|-----------------|----------------------|
| Titre | `Saison: Fruits & Legumes` | `Saison: Fruits & Legumes` |
| Subtitle / Short description | "Calendrier des fruits et legumes de saison en France" | "Calendrier des fruits et legumes de saison en France" |
| Keywords (iOS only) | fruits,legumes,saison,calendrier,local,france,manger,bio | N/A |

#### Keywords long-tail a cibler

Eviter les keywords generiques ("fruits", "legumes") — competition trop forte.

Cibler des requetes specifiques :
- "fruits de saison france"
- "legumes du mois"
- "quels fruits en janvier"
- "calendrier fruits legumes"
- "manger local et de saison"
- "est-ce la saison des fraises"

#### Voice Search

L'app repond parfaitement aux requetes vocales naturelles. La description doit etre conversationnelle :

> "Decouvrez si c'est la saison des fraises, des tomates ou de n'importe quel fruit et legume. Consultez le calendrier complet des 80 produits de saison en France. Fonctionne hors-ligne."

Eviter le style "keyword stuffing" : ~~"App fruits legumes saison calendrier france bio local"~~

### Screenshots stores

Les screenshots convertissent les impressions en installs. Montrer la valeur, pas l'interface.

#### Sequence recommandee (5-6 screenshots)

| # | Contenu | Message |
|---|---------|---------|
| 1 | Resultat recherche "fraises" avec badge vert | "Est-ce la saison ? Reponse instantanee" |
| 2 | Homepage avec carousels | "80 fruits et legumes francais" |
| 3 | Vue calendrier avec dots colores | "Calendrier complet par mois" |
| 4 | Page produit avec infos | "Tout savoir sur chaque produit" |
| 5 | Widget iOS sur home screen | "Widget sur votre ecran d'accueil" |
| 6 | Icone avion + app | "Fonctionne hors-ligne" |

#### Bonnes pratiques

- Premier screenshot = proposition de valeur en 3 secondes
- Text overlays lisibles (fond semi-transparent si necessaire)
- Montrer le resultat/benefice, pas les menus ou settings
- Device frames coherents (iPhone 15 Pro, Pixel 8)

### Ratings & Reviews

Objectif : maintenir > 4.5 etoiles. Chaque demi-etoile = +20% de conversion.

#### Moments pour demander un rating

Demander **apres une action positive**, jamais au premier lancement :
- Apres avoir consulte 5 produits differents
- Apres 3 jours d'utilisation consecutive
- Apres un partage reussi

#### Implementation

- Utiliser `expo-store-review` (SKStoreReviewController iOS / In-App Review Android)
- Maximum 3 demandes par an (limite Apple)
- Tracker les demandes pour eviter le spam
- Ne jamais interrompre une action en cours

### Format de partage viral

Le partage doit etre visuellement attractif et creer de la curiosite (pattern Wordle/Spotify Wrapped).

#### Format texte

```
[emoji] C'est la saison des [produit] !
[statut] de [mois debut] a [mois fin]

estcequecestlasaison.fr/[slug]
```

Exemple :
```
🍓 C'est la saison des fraises !
Pleine saison de mai a juin

estcequecestlasaison.fr/fraise
```

#### Image partagee

- Image du produit avec badge de saison superpose
- Branding discret (logo ou URL en bas)
- Format carre (1:1) pour Instagram/stories

### Micro-influenceurs (post-lancement)

Cibles prioritaires pour partenariats :
- Food bloggers francais (5k-50k followers)
- Comptes "batch cooking" / meal prep
- Communautes AMAP / marches locaux
- Comptes zero dechet / ecologie

Approche : acces gratuit (app deja gratuite) + visibilite en echange d'un review honnete.

---

## Phases

### Phase 1 — MVP (scope actuel)

L'app de consultation complete, miroir du site web.

#### Milestone M0 : Setup projet

- [x] Creer le projet Expo dans `apps/mobile/` (SDK 55, TypeScript)
- [x] Configurer pnpm workspace pour inclure `apps/mobile`
- [x] Configurer ESLint (reactConfig + hooksConfig + reactNativeConfig)
- [x] Configurer Expo Router v5 (file-based routing, structure 3 onglets)
- [x] Installer les dependances (HeroUI, Uniwind, FlashList)
- [x] Configurer Uniwind (Tailwind v4 RN)
- [x] Setup dev build local iOS (simulateur Xcode)
- [ ] Setup dev build local Android (Android Studio + Pixel 9) — reporte, validation Android plus tard
- [ ] Configurer Sentry — reporte avant soumission stores (M10)
- [x] Splash screen (logo centre, fond blanc)
- [x] App icon
- [x] Verrouiller orientation portrait

#### Milestone M1 : Navigation et layout

- [x] Tab Bar (3 onglets : Accueil, Recherche, Calendrier)
- [x] Root layout avec providers (ThemeProvider light only)
- [x] Header commun (titre + actions)
- [x] SafeAreaView et status bar
- [x] Transitions de navigation animees

#### Milestone M2 : Couche service

- [x] Couche service mutualisee dans `packages/shared/src/services/` (PRODUCE_LIST, searchProduce, 5 fonctions service)
- [x] Web simplifie en thin wrappers `createServerFn` → appel shared (dynamic import pour bundle client)
- [x] `fuse.js` retire du mobile (reste dans shared uniquement)
- [x] Bundler les images produits dans `assets/produce/`

#### Milestone M3 : Ecran Accueil

- [x] Chips filtres (Tous/Fruits/Legumes) sticky
- [x] 3 carousels horizontaux (FlashList)
- [x] ProduceCard (avatar, nom, badge)
- [x] ProduceBadge (logique partagee depuis shared)
- [x] Badge mois cliquable
- [x] BottomSheet mois (stats, arrivants/partants, compteurs animes)
- [x] Section FAQ en bas du scroll
- [x] Etat vide (aucun produit trouve)

#### Milestone M4 : Ecran Produit

- [x] Route `product/[slug]` (push navigation)
- [x] Section hero (image, nom, type, statut saison)
- [x] Bouton partage (texte via `Share` de react-native + URL)
- [x] Alternatives en saison (hors saison uniquement)
- [x] Infos nutritionnelles (calories, vitamines)
- [x] Details affichees directement (origine, conservation, conseils, bienfaits)
- [x] Calendrier 12 mois (grille dots)
- [x] Carousel produits lies

#### Milestone M5 : Ecran Recherche

- [x] Ecran plein avec champ auto-focus
- [x] Resultats live (FlashList + debounce)
- [x] Fuse.js fuzzy search
- [x] Etat initial (produits en saison)
- [x] Etat vide

#### Milestone M6 : Ecran Calendrier

- [x] Toolbar (recherche + filtre type + tri)
- [x] FlashList verticale (80 rows)
- [x] Row : avatar + nom + 12 dots colores
- [x] Mois courant surligne
- [x] Legende couleurs
- [x] Navigation vers page produit

#### Milestone M7 : Widgets iOS — DIFFERE

> **Bloque par** : `expo-widgets` en alpha. A reprendre quand le package sera stable.

- [ ] Implementer les widgets iOS (home screen + lock screen) avec `expo-widgets`

#### Milestone M8 : Deep Linking

- [x] Configurer le scheme URL dans app.json
- [x] Universal links iOS (apple-app-site-association sur le site web)
- [x] App links Android (assetlinks.json sur le site web)
- [x] Routing : `/{slug}` → `product/[slug]`, `/calendrier` → `(tabs)/calendar`
- [x] Fallback navigateur si app non installee

#### Milestone M9 : Accessibilite, polish et retention

- [ ] Audit VoiceOver (iOS simulateur) — a faire manuellement
- [ ] Audit TalkBack (Pixel 9) — a faire manuellement
- [x] accessibilityLabel, accessibilityRole, accessibilityHint
- [x] Ordre de focus logique
- [x] Dynamic Type / font scaling
- [x] Animations respectent prefers-reduced-motion (ReducedMotionConfig)
- [x] Demande de rating (expo-store-review) apres 5 produits consultes + 3 jours usage + 4 mois entre demandes
- [x] Tracker les demandes de rating (expo-sqlite KV store, max 3/an)
- [x] Bouton info header accueil : navigation vers ecran FAQ
- [x] Ecran FAQ dedié (route `/faq`) avec Accordion

#### Milestone M10 : Publication stores et ASO

**Comptes et certificats**

- [ ] Creer compte Apple Developer ($99/an)
- [ ] Creer compte Google Play Developer ($25 one-time)
- [ ] Bundle ID coherent partout : `fr.estcequecestlasaison.app`
- [ ] Certificats iOS valides (non expires)
- [ ] Keystore Android sauvegarde securisee
- [ ] Remplacer le placeholder Team ID dans `apps/web/public/.well-known/apple-app-site-association` (`XXXXXXXXXX` → vrai Team ID Apple)
- [ ] Remplacer le placeholder SHA-256 dans `apps/web/public/.well-known/assetlinks.json` (→ vrai fingerprint du keystore Android)

**Pages legales (sur estcequecestlasaison.fr — voir plan-web.md Milestone 6)**

- [x] Page mentions legales : `/mentions-legales` — hebergee et accessible
- [x] Page privacy policy : `/confidentialite` — hebergee et accessible
- [x] Page CGU : `/cgu` — hebergee et accessible
- [x] Remplir les `[A COMPLETER]` dans les pages legales (nom, SIRET, adresse, TVA)
- [ ] Email support fonctionnel : `contact@estcequecestlasaison.fr`

**Pre-soumission iOS (audit fevrier 2026)**

- [ ] `npx expo prebuild --platform ios --clean` (corrige bundle ID `com.anonymous.mobile` → `fr.estcequecestlasaison.app` + CFBundleDisplayName "mobile" → nom reel de l'app)
- [ ] Activer privacy manifest aggregation : ajouter `"apple.privacyManifestAggregationEnabled": "true"` dans `ios/Podfile.properties.json`
- [ ] Deployer `apple-app-site-association` sur le serveur web (deep linking)
- [ ] Fichier servi avec `Content-Type: application/json`
- [ ] Tester deep link depuis Safari sur device (URL web → ouvre l'app)

> **Resultat audit iOS (fevrier 2026)** : score GOOD. 0 permission demandee, privacy manifest OK, 0 secret hardcode, 0 SDK tracking, 0 appel reseau, ATS stricte. App Privacy = "Data Not Collected" pour toutes les categories. Seul point bloquant : le prebuild clean pour corriger le bundle ID Xcode.

**App Store Connect — App Privacy**

- [ ] Declarer "Data Not Collected" pour TOUTES les categories (aucune donnee collectee, verifie par audit)
- [ ] Age rating : 4+ (aucun contenu sensible)
- [ ] Categorie primaire : Food & Drink
- [ ] Privacy Policy URL : `https://estcequecestlasaison.fr/confidentialite`
- [ ] Support URL : `https://estcequecestlasaison.fr/faq`

**App Review Notes (a copier dans App Store Connect)**

```
This is a 100% offline app with no user accounts, no analytics, and no ads.
All data is bundled with the app. The app requests a review prompt after
viewing 5 products (using expo-store-review, Apple's StoreKit API).

Deep linking: tapping https://estcequecestlasaison.fr/* opens the app.
Share button uses native iOS Share Sheet.

Test credentials: Not applicable (no login).
```

**Builds et tests**

- [ ] Build de production iOS (local via Xcode Archive)
- [ ] Build de production Android (local)
- [ ] Valider l'archive dans Xcode Organizer ("Validate App") avant upload
- [ ] TestFlight : test sur vrai device iOS si possible (simulateur insuffisant)
- [ ] Test Android sur Pixel 9 physique
- [ ] Memory leaks check (Xcode Instruments / Android Profiler)
- [ ] Verifier app offline (mode avion, naviguer partout, aucun crash)
- [ ] Verifier usage memoire < 100 MB

**ASO — Metadata**

- [ ] App icon 1024x1024 sans transparence
- [ ] Screenshots orientes valeur (voir section ASO & Growth)
- [ ] Screenshots obligatoires : iPhone 6.7" (1290x2796), 6.5" (1284x2778), 5.5" (1242x2208)
- [ ] Titre : "Saison: Fruits & Legumes"
- [ ] Subtitle iOS : "Calendrier des fruits et legumes de saison en France"
- [ ] Short description Android : idem subtitle
- [ ] Description longue < 4000 chars, conversationnelle (voice search)
- [ ] Keywords iOS : fruits,legumes,saison,calendrier,local,france,manger,bio

**Soumission**

- [ ] Soumission App Store (review 24-48h)
- [ ] Soumission Google Play
- [ ] Version 1.0.0

### Dette technique

| Fichier | Quoi | Quand supprimer |
|---------|------|-----------------|
| `apps/mobile/polyfills.ts` | Polyfill `Array.prototype.toSorted` (ES2023) — Hermes ne le supporte pas | Quand Hermes ajoute le support natif de `toSorted`. Verifier a chaque upgrade Expo/Hermes. [Tracker Hermes](https://github.com/facebook/hermes/issues?q=toSorted) |
| `apps/mobile/app/_layout.tsx` | `import '../polyfills'` en premiere ligne | Supprimer en meme temps que le polyfill |

### Phase 2 — Post-MVP

#### Retention & Engagement

| Feature | Description | Impact retention |
|---------|-------------|------------------|
| Favoris | Toggle coeur sur les produits, stockage local (MMKV) | Prerequis notifications |
| Notifications saison | "[Produit favori] entre en saison demain !" (expo-notifications) | Fort (x3 retention selon Expo) |
| Notifications depart | "Votre favori [X] quitte la saison dans 2 semaines" | Fort |
| Notifications mensuelles | "[X] nouveaux produits en saison ce mois" (opt-in) | Moyen |
| Dark mode | Support light + dark + system automatic | Confort utilisateur |

#### Widgets & Features

| Feature | Description |
|---------|-------------|
| Widget "Produit du jour" | Produit aleatoire en saison, change chaque jour |

#### Outreach post-lancement

| Action | Description |
|--------|-------------|
| Micro-influenceurs | Contacter 10-20 food bloggers/comptes locavores francais |
| Communautes | Poster sur r/france, forums cuisine, groupes Facebook AMAP |
| ASO iteration | Analyser keywords qui convertissent, ajuster metadata |

#### Automatisation

| Feature | Description |
|---------|-------------|
| Maestro E2E | Tests E2E automatises sur les parcours critiques |
| Fastlane screenshots | Generation automatisee des screenshots store |
| agent-device (a evaluer) | Alternative pilotee par AI agents pour tests + screenshots (Callstack, early stage) |

### Dependances cote web

Pages a creer sur estcequecestlasaison.fr **avant soumission stores** (voir plan-web.md Milestone 6) :

| Page | URL | Contenu |
|------|-----|---------|
| Mentions legales | `/mentions-legales` | Editeur, hebergeur (obligation legale francaise) |
| Privacy policy | `/confidentialite` | Politique de confidentialite RGPD |
| CGU | `/cgu` | Conditions generales d'utilisation |

Email support : `contact@estcequecestlasaison.fr` — doit etre fonctionnel et repondre.

### Hors scope

- Authentification
- Base de donnees serveur
- Backend API
- Multi-langues
- Multi-regions
- Apple Watch
- Share intent (recevoir du contenu partage)
- Newsletter
- Achats in-app
- Publicites (app gratuite, sans ads)

---

## Mapping Web → Mobile

### Composants

| Web | Mobile | Adaptation |
|-----|--------|------------|
| SiteHeader | Tab Bar + Header par ecran | Navigation via Tab Bar, pas de burger menu |
| Footer | Supprime | Tab Bar remplace la navigation |
| SearchCommand (cmdk) | Ecran Recherche (onglet) | Ecran dedie au lieu de modale Cmd+K |
| SearchBar | Champ dans ecran Recherche | Plein ecran au lieu de dropdown |
| MonthDrawer (vaul) | BottomSheet (HeroUI) | Meme contenu, composant natif |
| MonthBar | Badge mois dans header Accueil | Pas de barre scroll en bas |
| ProduceCarousel | FlashList horizontal | Meme layout, composant performant |
| ProduceCard | ProduceCard | Identique (avatar + nom + badge) |
| CalendarTable (TanStack Table) | FlashList verticale | Liste filtree au lieu de tableau 2D |
| FAQ accordion | Section homepage + ecran dedie | Pas d'onglet Tab Bar, accessible via homepage |
| Details expandables | Toujours visibles | Pas d'accordeon, tout affiche dans ScrollView |
| IconButton (tailwind-variants) | HeroUI Button | Composant HeroUI au lieu de custom |
| Pill (tailwind-variants) | HeroUI Chip | Composant HeroUI au lieu de custom |
| Framer Motion | Reanimated 4 | Meme niveau d'animation, lib differente |
| lucide-react | Icones HeroUI | Systeme d'icones integre |
| Web Share API | expo-sharing | Texte + image au lieu de texte seul |

### Hooks

| Web | Mobile | Adaptation |
|-----|--------|------------|
| useSearch | Non necessaire | Ecran dedie, pas de context global |
| useCarouselScroll | FlashList built-in | Scroll natif via FlashList |
| useMonthBarScroll | Non necessaire | Pas de MonthBar, BottomSheet a la place |
| useListKeyboardNav | Non necessaire | Pas de clavier physique sur mobile |
| useCanShare | Non necessaire | Share sheet toujours disponible sur mobile |
| useIsomorphicLayoutEffect | Non necessaire | Pas de SSR sur mobile |

### Data Flow

| Web | Mobile |
|-----|--------|
| Server Function (createServerFn + Zod) | Import direct depuis shared |
| TanStack Query (useQuery, cache) | Import direct (pas de cache, donnees statiques) |
| Query Options (queryOptions) | Non necessaire |
| Loader (SSR prefetch) | Non necessaire (pas de SSR) |
| JSON server-only | JSON bundle dans le binary |
