# @estcequecestlasaison/web

The web application for [estcequecestlasaison.fr](https://estcequecestlasaison.fr) — a French website that helps users discover which fruits and vegetables are currently in season in metropolitan France.

Built with server-side rendering for SEO, the site targets search queries like _"est-ce que c'est la saison de la fraise ?"_ and provides an interactive, mobile-first experience.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) (SSR) |
| UI | [React](https://react.dev) |
| Routing | [TanStack Router](https://tanstack.com/router) (file-based) |
| Data Fetching | [TanStack Query](https://tanstack.com/query) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Animations | [Framer Motion](https://motion.dev) |
| Server Runtime | [Nitro](https://nitro.build) |
| Bundler | [Vite](https://vite.dev) |
| Language | [TypeScript](https://www.typescriptlang.org) (strict mode) |

## Prerequisites

This package is part of a [pnpm workspaces](https://pnpm.io/workspaces) monorepo. All commands must be run from the **monorepo root**.

- **Node.js** >= 20 (see `.nvmrc` for the recommended version)
- **pnpm** (see `packageManager` in root `package.json` for the exact version)

## Getting Started

From the monorepo root:

```bash
# Install all dependencies
pnpm install

# Copy environment file and configure it
cp .env.example .env.local

# Start the development server on http://localhost:3000
pnpm dev
```

## Environment Variables

Variables are defined in `.env.local` at the monorepo root and validated at build time. See `.env.example` for the full list and descriptions.

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SITE_URL` | Yes | Site URL for canonical links, Open Graph, and SEO meta tags. Use `http://localhost:3000` in development. |

## Scripts

Run from the monorepo root:

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the dev server on port 3000 |
| `pnpm build` | Build for production |
| `pnpm start` | Start the production server |
| `pnpm lint` | TypeScript type checking + ESLint |
| `pnpm lint:fix` | Lint with auto-fix |
| `pnpm test` | Run tests with Vitest |

## Features

### Homepage

Seasonal produce displayed in horizontal carousels grouped by availability: _in season_, _coming next month_, and _off season_. Includes category filtering (All / Fruits / Vegetables), a search bar with autocomplete suggestions, and a month selector drawer with animated statistics.

### Product Pages

SEO-optimized page for each product with season status, nutritional information, origin, conservation tips, buying advice, a 12-month season calendar, and related products. When a product is off season, in-season alternatives from the same category are suggested. Mobile users can share product pages via the Web Share API.

### Annual Calendar

Interactive 12-month table showing all products at a glance. Supports search, sorting (by name or by season length), type filtering, and print-optimized layout for offline reference.

### FAQ

Accordion-style FAQ with official sources and structured data for rich search results.

### Global Search

Command palette accessible from any page via keyboard shortcut (Cmd+K / Ctrl+K) or the header search icon, powered by fuzzy search.

## SEO

- Server-side rendered for full indexability
- Schema.org structured data on every page (WebSite, Product, BreadcrumbList, FAQPage, ItemList, SearchAction)
- Dynamic XML sitemap covering all product URLs
- Per-product Open Graph images for social sharing
- Canonical URLs, meta tags, and Twitter cards on every route

## Deployment

Deployed on [Railway](https://railway.com) with automatic deploys from the `main` branch.

```bash
pnpm build
pnpm start
```

## Related Packages

| Package | Description |
|---------|-------------|
| `@estcequecestlasaison/shared` | Shared types, season helpers, date utilities, and produce data |

## License

UNLICENSED — Private project.
