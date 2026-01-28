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
| Icons | @iconify/react (Emojione) |
| Animation | motion (Framer), tw-animate-css |
| SEO | schema-dts (Schema.org) |
| Ads | Google AdSense (native ads) |

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil (grille produits du mois) |
| `/:slug` | Page produit SEO (`/pomme`, `/banane`) |
| `/mentions-legales` | Mentions légales |

---

## Structure

```
src/
├── routes/
│   ├── __root.tsx        → Layout (Header, Footer, Banner)
│   ├── index.tsx         → Page d'accueil
│   ├── $slug.tsx         → Page produit dynamique
│   └── mentions-legales.tsx
├── components/
│   ├── ui/               → Composants UI réutilisables
│   ├── AppBanner.tsx     → Bannière promo app
│   ├── Header.tsx        → Logo + Recherche
│   ├── MonthSelector.tsx
│   ├── ProduceGrid.tsx
│   ├── ProduceCard.tsx
│   ├── SeasonCalendar.tsx
│   ├── NutritionInfo.tsx
│   ├── FilterToggle.tsx
│   └── Footer.tsx
├── hooks/
│   └── useSearch.ts
└── styles.css
```

---

## Design

| Aspect | Valeur |
|--------|--------|
| Style | Nature/Organique |
| Palette | Verts, terre, beige, marron |
| Dark mode | Auto (prefers-color-scheme) |
| Logo | Texte stylé (pas d'icône) |
| Responsive | Mobile-first |

---

## Librairies UI

| Lib | Usage |
|-----|-------|
| `clsx` | Construction de classNames |
| `tailwind-merge` | Merge classes Tailwind |
| `class-variance-authority` | Variants de composants (cva) |
| `@radix-ui/react-dialog` | Modal accessible |
| `vaul` | Drawer mobile-friendly |
| `lucide-react` | Icônes UI (flèches, fermer) |
| `motion` | Animations subtiles |

---

## Monétisation

- Google AdSense avec native ads dans la grille
- Bannière promo app mobile (fermeture mémorisée localStorage)

---

## SEO

- Meta tags optimisés par page produit
- Schema.org structured data (schema-dts)
- SSR pour indexation Google
