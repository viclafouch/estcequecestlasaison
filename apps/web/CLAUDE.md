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
| SEO | schema-dts (Schema.org) |
| Ads | Google AdSense (native ads) |

---

## Pages

3 pages au total :
- Page d'accueil (grille produits du mois)
- Page produit dynamique (SEO optimisé)
- Mentions légales

---

## Icônes

Les icônes produits sont des composants SVG inline dans `src/components/icons/`.

- Source : shadcn.io (emojione)
- Un fichier par icône (`strawberry.tsx`, `carrot.tsx`, etc.)
- Type partagé dans `icons/types.ts`
- Composant `ProduceIcon` avec fallback div vide si icône absente

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
| `motion` | Animations subtiles (fade, stagger) |
| `tw-animate-css` | Classes d'animation Tailwind |

---

## Design

| Aspect | Valeur |
|--------|--------|
| Style | Clean, inspiré Airbnb |
| Palette | Blanc, gris, accent rouge-orange |
| Theme | Light uniquement |
| Logo | Texte stylé (pas d'icône) |
| Responsive | Mobile-first |

---

## Monétisation

- Google AdSense avec native ads dans la grille
- Bannière promo app mobile (fermeture mémorisée localStorage)

---

## SEO

- Meta tags optimisés par page produit
- Schema.org structured data (schema-dts)
- SSR pour indexation Google
