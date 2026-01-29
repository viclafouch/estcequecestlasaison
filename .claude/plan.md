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
