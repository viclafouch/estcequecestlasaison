# estcequecestlasaison

Check whether a fruit or vegetable is in season in France.

**Web**: [estcequecestlasaison.fr](https://estcequecestlasaison.fr) — SEO, AdSense
**Mobile**: Expo (iOS/Android) — 100% offline, free, no ads

Fruits and vegetables, static JSON data, French only.

## Monorepo

| Directory | Stack |
|-----------|-------|
| `apps/web/` | TanStack Start, React 19, Tailwind CSS 4 |
| `apps/mobile/` | Expo 55, React Native, HeroUI Native, Uniwind |
| `packages/shared/` | Data, types, helpers (Fuse.js, Zod) |
| `scripts/` | Image generation and optimization |

**Package manager**: pnpm 10 — **Node**: >= 20

## Deployment

| Platform | Host | Status |
|----------|------|--------|
| Web | [Railway](https://railway.app) | Live |
| iOS | App Store | Coming soon |
| Android | Google Play | Coming soon |

## Installation

1. Clone the repo
2. `pnpm install`
3. `cp .env.example .env.local` and fill in the values

`GOOGLE_API_KEY` is only required for `pnpm generate-images` (not needed for dev/build).

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Web dev server (port 3000) |
| `pnpm build` | Production web build |
| `pnpm lint` | TypeScript + ESLint |
| `pnpm lint:fix` | Lint with auto-fix |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm generate-images` | Generate produce images (Gemini AI, interactive) |
| `pnpm optimize-images` | Optimize PNG to WebP (web + mobile) |
| `pnpm generate-og` | Generate Open Graph images |

For mobile: `cd apps/mobile` then `pnpm ios` or `pnpm android`.

## Adding a fruit or vegetable

1. Add the object to `packages/shared/src/data/produce.json`
2. `pnpm generate-images` — generates the image via Gemini AI with interactive validation (`o` accept, `n` regenerate, `s` skip)
3. `pnpm optimize-images` — creates WebP variants for web (256w, 512w) and mobile (1024w)
4. Add the `require()` entry in `apps/mobile/constants/produce-images.ts` (alphabetical order)
5. `pnpm generate-og` — creates the Open Graph image
6. `pnpm lint:fix && pnpm test`

## License

UNLICENSED
