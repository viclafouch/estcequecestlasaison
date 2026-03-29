# Learning Mobile — Erreurs & Lessons

## Uniwind / Tailwind

| Ce qui ne marche PAS                                                                      | Testé le   | Symptome                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bg-white/85`, `text-white/50` (opacity modifiers)                                        | —          | Crash serializer global, TOUS les styles sautent                                                                                                                                                           |
| `tracking-[2px]` (arbitrary tracking)                                                     | —          | Crash serializer global, meme effet                                                                                                                                                                        |
| `h-[65%]` sur LinearGradient                                                              | —          | Hauteur 0, le gradient est invisible                                                                                                                                                                       |
| `h-[400]` parent className + `h-[70%]` enfant                                             | —          | L'enfant ne résout pas sa hauteur (0), car Yoga ne voit pas le parent className comme contrainte                                                                                                           |
| `className` + `style` sur LinearGradient                                                  | —          | Le positionnement ne fonctionne pas quand on mixe les deux sur LinearGradient                                                                                                                              |
| `className="absolute top-0 right-0 bottom-0 left-0"` au lieu de `StyleSheet.absoluteFill` | 2026-02-09 | Les images et pressables deviennent invisibles (hauteur/largeur 0). Uniwind ne génère pas le meme résultat que `absoluteFill` natif. Testé sur produce-card, carousel-card, product-hero — revert immédiat |

**Workaround opacité** : `color-mix(in oklab, ...)` dans `global.css`. HeroUI l'utilise en interne pour `-soft`.

## Uniwind / CSS Variables

| Erreur                                 | Cause                                                                      | Fix                                                                                                            |
| -------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| "Theme dark is missing variable --xxx" | Variables `@layer theme` dans `@variant light` uniquement                  | Uniwind exige les memes variables dans TOUS les variants. Dupliquer dans `@variant dark` meme si memes valeurs |
| `useCSSVariable` retourne undefined    | La variable n'est référencée nulle part (ni className, ni `@theme static`) | Déclarer dans `@theme inline static` pour que Uniwind la conserve au build sans tree-shaking                   |

## Metro

| Erreur                                                               | Cause                                                                                                                     | Fix                                                                                                             |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Tous les styles Uniwind/Tailwind disparaissent d'un coup             | `metro.config.js` avec `"type": "module"` dans package.json → `module.exports` ignoré silencieusement → Metro recoit `{}` | Renommer en `metro.config.cjs` pour forcer CommonJS                                                             |
| `Unable to resolve module expo-router/entry` en monorepo pnpm        | pnpm utilise des symlinks isolés (`.pnpm/`) que Metro ne résout pas correctement                                          | Ajouter `.npmrc` avec `node-linker=hoisted` à la racine + clean install (`rm -rf node_modules && pnpm install`) |
| Watchman `Operation not permitted` sur node_modules                  | Watchman n'a pas Full Disk Access sur macOS                                                                               | Réglages Système → Confidentialité → Accès complet au disque → ajouter `/opt/homebrew/bin/watchman`             |
| `.watchmanconfig` avec `"ignore_dirs": ["node_modules"]` casse Metro | Metro a besoin de Watchman pour résoudre les modules dans node_modules                                                    | `.watchmanconfig` doit être `{}` (vide) — ne jamais ignorer node_modules                                        |

## Hermes (moteur JS React Native)

| Erreur                                    | Cause                                                               | Fix                                                                                                |
| ----------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `toSorted is not a function`              | Hermes ne supporte pas ES2023 (`toSorted`, `toReversed`, etc.)      | Polyfill dans `polyfills.ts`, importé en premier dans root `_layout.tsx`                           |
| Polyfill pas chargé dans certaines routes | Expo Router peut évaluer les modules enfants avant le layout parent | Ne JAMAIS appeler `toSorted` au module-level (hors composant). Toujours dans le corps du composant |

## HeroUI Native (v1.0.0)

**Migration beta.13 → v1.0.0 effectuée le 2026-03-29.**

| Composant / Changement                     | Détail                                                                                        | Statut                                            |
| ------------------------------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `Avatar` / `Avatar.Image` crash Reanimated | Corrigé en RC-3 (`combineStyles` fix)                                                         | **À re-tester**                                   |
| `Button variant="ghost"` crash colorKit    | Issue #262 fermée en RC-3                                                                     | **À re-tester**                                   |
| `animation="disable-all"` workaround       | Bugs animations corrigés RC-1 à RC-3 — workaround **retiré**                                  | **Fait**                                          |
| `Separator` bordures visibles              | Theme surface refactor RC-1 a changé les styles par défaut                                    | **Remplacé par View natif** (`h-px bg-gray-100`)  |
| `Accordion variant="surface"` bordures     | Même cause (theme surface refactor)                                                           | **Fixé** avec `className="border-0"`              |
| `isBottomSheetAware` supprimé de Input     | Utiliser `useBottomSheetAwareHandlers` hook                                                   | Non impacté (pas d'Input dans BottomSheet)        |
| Button feedback API refactoré              | `pressableFeedbackVariant` → `feedbackVariant` + `animation`                                  | Non impacté (props non utilisées)                 |
| `SearchField` nouveau composant            | `pl-9` interne ne surcharge pas `px-3` de Input dans Uniwind → icône chevauche le placeholder | **Non adopté** (bug Uniwind, garder Input custom) |

**Nouveaux composants disponibles (non adoptés)** : `Alert`, `ListGroup`, `Slider`, `TagGroup`, `Menu`, `SubMenu`, `InputGroup`, `InputField`, `LinkButton`

## Expo Image

| Fait                                                         | Detail                                                                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `className` fonctionne sur `Image` d'expo-image              | Parce que `ImageProps extends ViewProps` et Uniwind augmente `ViewProps` avec `className`                    |
| `StyleSheet.absoluteFill` obligatoire pour remplir un parent | `className="absolute top-0 right-0 bottom-0 left-0"` ne fonctionne PAS (testé 2026-02-09, images invisibles) |

## NativeTabs (expo-router/unstable-native-tabs)

| Fait                                                                      | Detail                                                                                                                                                                                   |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Icon` et `Label` ne sont PAS des exports top-level                       | La doc/skill dit `import { Icon, Label }` mais le vrai API est `NativeTabs.Trigger.Icon`, `NativeTabs.Trigger.Label`, `NativeTabs.Trigger.Badge` (compound components)                   |
| NativeTabs ne gere pas les headers                                        | Il faut imbriquer un `<Stack>` dans chaque onglet qui a un header (ex: `index/_layout.tsx` avec `Stack.Screen`)                                                                          |
| `headerRightContainerStyle` n'existe pas sur NativeStackNavigationOptions | Prop specifique a `@react-navigation/bottom-tabs`. Mettre le padding directement sur le composant headerRight                                                                            |
| `react-native/no-raw-text` et `NativeTabs.Trigger.Label`                  | Ajouter `'NativeTabs.Trigger.Label'` au `skip` de la regle OxLint                                                                                                                        |
| iOS 26 liquid glass trop transparent par défaut                           | Ajouter `blurEffect="systemThickMaterial"` + `disableTransparentOnScrollEdge` sur `<NativeTabs>`                                                                                         |
| iOS 26 header buttons : padding interdit                                  | Le header liquid glass wrap les boutons dans un pill natif. `className="pr-4"` sur le Pressable pousse l'icône hors du pill → ne PAS ajouter de padding sur les composants `headerRight` |
| iOS 26 `tintColor` sur tab bar                                            | Les couleurs saturées (emerald #10b981) clashent avec le liquid glass qui capte les tons du contenu. Mieux : ne pas set `tintColor` (bleu système adaptatif)                             |
| `contentInsetAdjustmentBehavior="automatic"` obligatoire                  | Toutes les FlashList dans NativeTabs doivent l'avoir, sinon le contenu est masqué par la tab bar flottante                                                                               |
| `expo-image` + `sf:info.circle` invisible                                 | La syntaxe `source={{ uri: 'sf:...' }}` ne fonctionne pas sans `expo-symbols` installé. Rester sur Ionicons pour les icônes dans les headers                                             |

## FlashList v2 + Reanimated

| Erreur                                                         | Cause                                                                                                                                            | Fix                                                                                                                                                                                |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_c.call is not a function` au scroll                          | `useAnimatedScrollHandler` retourne un worklet que FlashList v2 appelle via `.call()` dans RecyclerView.js — les worklets n'ont pas de `.call()` | Ne PAS utiliser `useAnimatedScrollHandler` ni `renderScrollComponent={Animated.ScrollView}` avec FlashList v2. Utiliser un plain `onScroll` JS qui set `scrollY.value` directement |
| `_c.call is not a function` même après extraction module-level | Le React Compiler transforme aussi les refs passées en props et les worklets                                                                     | Ajouter `'use no memo'` au composant qui utilise le scroll handler (la regle `react-hooks/immutability` n'existe pas dans OxLint, pas besoin de disable)                           |
| `react-hooks/immutability` sur `scrollY.value = ...`           | Le React Compiler flag les mutations de valeurs retournées par des hooks (`useSharedValue`)                                                      | Regle absente dans OxLint — les SharedValue sont conçues pour être mutées, pas de disable necessaire                                                                               |

## React Compiler + Reanimated

| Erreur                                                       | Cause                                                                      | Fix                                                                                       |
| ------------------------------------------------------------ | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `'use no memo'` ne supprime pas l'erreur du linter           | `'use no memo'` opt-out le TRANSFORM du compiler, pas les règles du linter | Combiner `'use no memo'` (runtime) + `oxlint-disable-next-line` (lint) si la regle existe |
| Le compiler essaie de mémoiser `Animated.ScrollView` en prop | Le compiler cache les refs de composants passées en props JSX              | Extraire au module-level OU ne pas passer de composant Animated en prop du tout           |

## expo-blur (BottomSheet background)

| Erreur                                                | Cause                                                                                       | Fix                                                                  |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| BottomSheet rose/rouge au lieu de frosted glass       | `tint="systemMaterial"` capte les couleurs du contenu derrière (images de produits colorés) | Utiliser `tint="extraLight"` pour un frosted glass blanc neutre      |
| `WARN Unable to get the view config for ExpoBlurView` | Module natif non inclus dans le dev build actuel                                            | Rebuild natif (`npx expo run:ios`) après installation de `expo-blur` |

## Deps cachées

| Package  | Requis par                                                    | Note                                                 |
| -------- | ------------------------------------------------------------- | ---------------------------------------------------- |
| `buffer` | `react-native-svg@15.15.1` (import interne dans fetchData.ts) | Ne pas supprimer, pas documenté par react-native-svg |
