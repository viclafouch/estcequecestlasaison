# Learning Mobile — Erreurs & Lessons

## Uniwind / Tailwind

| Ce qui ne marche PAS | Testé le | Symptome |
|----------------------|----------|----------|
| `bg-white/85`, `text-white/50` (opacity modifiers) | — | Crash serializer global, TOUS les styles sautent |
| `tracking-[2px]` (arbitrary tracking) | — | Crash serializer global, meme effet |
| `h-[65%]` sur LinearGradient | — | Hauteur 0, le gradient est invisible |
| `h-[400]` parent className + `h-[70%]` enfant | — | L'enfant ne résout pas sa hauteur (0), car Yoga ne voit pas le parent className comme contrainte |
| `className` + `style` sur LinearGradient | — | Le positionnement ne fonctionne pas quand on mixe les deux sur LinearGradient |
| `className="absolute top-0 right-0 bottom-0 left-0"` au lieu de `StyleSheet.absoluteFill` | 2026-02-09 | Les images et pressables deviennent invisibles (hauteur/largeur 0). Uniwind ne génère pas le meme résultat que `absoluteFill` natif. Testé sur produce-card, carousel-card, product-hero — revert immédiat |

**Workaround opacité** : `color-mix(in oklab, ...)` dans `global.css`. HeroUI l'utilise en interne pour `-soft`.

## Uniwind / CSS Variables

| Erreur | Cause | Fix |
|--------|-------|-----|
| "Theme dark is missing variable --xxx" | Variables `@layer theme` dans `@variant light` uniquement | Uniwind exige les memes variables dans TOUS les variants. Dupliquer dans `@variant dark` meme si memes valeurs |
| `useCSSVariable` retourne undefined | La variable n'est référencée nulle part (ni className, ni `@theme static`) | Déclarer dans `@theme inline static` pour que Uniwind la conserve au build sans tree-shaking |

## Metro

| Erreur | Cause | Fix |
|--------|-------|-----|
| Tous les styles Uniwind/Tailwind disparaissent d'un coup | `metro.config.js` avec `"type": "module"` dans package.json → `module.exports` ignoré silencieusement → Metro recoit `{}` | Renommer en `metro.config.cjs` pour forcer CommonJS |

## Hermes (moteur JS React Native)

| Erreur | Cause | Fix |
|--------|-------|-----|
| `toSorted is not a function` | Hermes ne supporte pas ES2023 (`toSorted`, `toReversed`, etc.) | Polyfill dans `polyfills.ts`, importé en premier dans root `_layout.tsx` |
| Polyfill pas chargé dans certaines routes | Expo Router peut évaluer les modules enfants avant le layout parent | Ne JAMAIS appeler `toSorted` au module-level (hors composant). Toujours dans le corps du composant |

## HeroUI Native (beta.13)

| Composant | Bug | Workaround |
|-----------|-----|------------|
| `Avatar` / `Avatar.Image` | Crash Reanimated : animated style appliqué sur composant non-animated | Ne pas utiliser (issue #33) |
| `Button variant="ghost"` | `colorKit.RGB` erreur sur couleur "invalid" | Ne pas utiliser (issue #262) |
| `Chip`, `Card`, `Tabs`, `Button`, `Surface`, `Separator`, `Input` | Animations Reanimated crashent dans certains contextes (FlashList, mount) | Ajouter `animation="disable-all"` sur chaque instance |

## Expo Image

| Fait | Detail |
|------|--------|
| `className` fonctionne sur `Image` d'expo-image | Parce que `ImageProps extends ViewProps` et Uniwind augmente `ViewProps` avec `className` |
| `StyleSheet.absoluteFill` obligatoire pour remplir un parent | `className="absolute top-0 right-0 bottom-0 left-0"` ne fonctionne PAS (testé 2026-02-09, images invisibles) |

## NativeTabs (expo-router/unstable-native-tabs)

| Fait | Detail |
|------|--------|
| `Icon` et `Label` ne sont PAS des exports top-level | La doc/skill dit `import { Icon, Label }` mais le vrai API est `NativeTabs.Trigger.Icon`, `NativeTabs.Trigger.Label`, `NativeTabs.Trigger.Badge` (compound components) |
| NativeTabs ne gere pas les headers | Il faut imbriquer un `<Stack>` dans chaque onglet qui a un header (ex: `index/_layout.tsx` avec `Stack.Screen`) |
| `headerRightContainerStyle` n'existe pas sur NativeStackNavigationOptions | Prop specifique a `@react-navigation/bottom-tabs`. Mettre le padding directement sur le composant headerRight |
| `react-native/no-raw-text` et `NativeTabs.Trigger.Label` | Ajouter `'NativeTabs.Trigger.Label'` au `skip` de la regle ESLint |
| iOS 26 liquid glass trop transparent par défaut | Ajouter `blurEffect="systemThickMaterial"` + `disableTransparentOnScrollEdge` sur `<NativeTabs>` |
| iOS 26 header buttons : padding interdit | Le header liquid glass wrap les boutons dans un pill natif. `className="pr-4"` sur le Pressable pousse l'icône hors du pill → ne PAS ajouter de padding sur les composants `headerRight` |
| iOS 26 `tintColor` sur tab bar | Les couleurs saturées (emerald #10b981) clashent avec le liquid glass qui capte les tons du contenu. Mieux : ne pas set `tintColor` (bleu système adaptatif) |
| `contentInsetAdjustmentBehavior="automatic"` obligatoire | Toutes les FlashList dans NativeTabs doivent l'avoir, sinon le contenu est masqué par la tab bar flottante |
| `expo-image` + `sf:info.circle` invisible | La syntaxe `source={{ uri: 'sf:...' }}` ne fonctionne pas sans `expo-symbols` installé. Rester sur Ionicons pour les icônes dans les headers |

## Deps cachées

| Package | Requis par | Note |
|---------|-----------|------|
| `buffer` | `react-native-svg@15.15.1` (import interne dans fetchData.ts) | Ne pas supprimer, pas documenté par react-native-svg |
