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
- `/mentions-legales` - Mentions légales (minimum requis)

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

## Package Shared (`packages/shared/`)

```
packages/shared/
├── src/
│   ├── data/
│   │   └── produce.json
│   ├── types.ts
│   ├── helpers/
│   │   ├── season.ts
│   │   └── search.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

### Type Produce
```typescript
type ProduceType = 'fruit' | 'vegetable'
type SeasonIntensity = 'peak' | 'partial' | null

type Produce = {
  id: string
  slug: string                              // URL-friendly
  name: string                              // Nom affiché
  type: ProduceType
  icon: string                              // Nom icône Emojione (@iconify)
  seasons: Record<number, SeasonIntensity>  // 1-12
  nutrition: {
    calories: number                        // pour 100g
    vitamins: string[]
    benefits: string
  }
}
```

---

## Design

- **Style** : Nature/Organique
- **Palette** : Verts, terre, beige, marron
- **Dark mode** : Auto (prefers-color-scheme)
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

### Milestone 0 : Setup Monorepo
- [ ] Restructurer en monorepo (apps/web, packages/shared)
- [ ] Configurer pnpm workspaces
- [ ] Migrer code existant vers apps/web
- [ ] Créer packages/shared avec structure de base

### Milestone 1 : Données & Types
- [ ] Installer @iconify/react
- [ ] Créer `produce.json` complet (~50-100 items)
- [ ] Définir types TypeScript dans shared
- [ ] Helpers saisonnalité dans shared
- [ ] Setup Tailwind palette Nature/Organique

### Milestone 2 : Page d'accueil
- [ ] Header avec logo texte + recherche
- [ ] MonthSelector (navigation mois)
- [ ] ProduceGrid + ProduceCard avec icônes @iconify
- [ ] FilterToggle (Tous/Fruits/Légumes)
- [ ] Footer minimaliste

### Milestone 3 : Pages produits (SEO)
- [ ] Route dynamique `$slug.tsx`
- [ ] SeasonCalendar (12 mois)
- [ ] NutritionInfo
- [ ] Meta tags SEO optimisés
- [ ] Structured data (Schema.org)

### Milestone 4 : Recherche
- [ ] Installer Fuse.js
- [ ] Hook useSearch dans shared
- [ ] Intégration Header
- [ ] Navigation vers pages produits

### Milestone 5 : Bannière App + Mentions légales
- [ ] AppBanner component (fermeture localStorage)
- [ ] Page /mentions-legales
- [ ] Liens stores (placeholders)

### Milestone 6 : Publicités
- [ ] Intégrer Google AdSense
- [ ] Native ads dans la grille
- [ ] Respecter UX (pas trop intrusif)

### Milestone 7 : Polish & Deploy
- [ ] Dark mode auto
- [ ] Animations subtiles
- [ ] Tests responsive
- [ ] Configurer Railway
- [ ] Acheter domaine

### Phase 2 : App Mobile
- [ ] Setup Expo
- [ ] Écrans principaux
- [ ] Offline avec données embarquées
- [ ] Système de notifications saison
- [ ] Publication App Store
- [ ] Publication Google Play

---

## Non inclus (hors scope)

- ❌ Authentification
- ❌ Base de données serveur
- ❌ Analytics (pour l'instant)
- ❌ Error tracking (pour l'instant)
- ❌ Multi-langues
- ❌ Multi-régions
- ❌ Backend API
