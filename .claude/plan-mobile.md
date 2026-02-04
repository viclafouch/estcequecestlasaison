# Plan Mobile — estcequecestlasaison

> **Règle : toujours utiliser les dernières versions stables de chaque librairie.**

## Contexte développeur

- **Profil** : 10 ans d'expérience front-end web, zéro expérience mobile
- **Appareil de test Android** : Google Pixel 9 — tests via Expo Go (scan QR code, zéro config)
- **Appareil de test iOS** : pas de device physique — tests via simulateur Xcode uniquement
- **macOS** : Darwin 25.2.0, Xcode 26.0 installé

> Adapter toute la documentation et les instructions au niveau débutant mobile. Ne jamais supposer que les outils natifs sont déjà installés ou connus.

## Stratégie plateforme

**iOS-first** pour le développement et les features, validation Android en parallèle.

- **Dev principal** : simulateur iOS (Xcode déjà installé)
- **Validation Android** : Pixel 9 via Expo Go (aucun outil supplémentaire requis)
- **Android Studio** : reporté — nécessaire uniquement pour les dev builds natifs custom, pas pour le développement initial avec Expo Go
- **Features iOS-only** (Voltra, @bacons/apple-targets) : prioritaires
- **Features cross-platform** : testées sur les deux via Expo Go

### Setup requis au lancement

| Outil | Commande | Pourquoi |
|-------|----------|----------|
| Watchman | `brew install watchman` | File watcher, hot reload performant |
| CocoaPods | `brew install cocoapods` | Dépendances iOS natives |
| EAS CLI | `npm install -g eas-cli` | Builds cloud Expo (dev builds, production) |
| JDK 17+ | `brew install openjdk@17` | Builds Android, Maestro (reporté) |
| Android Studio | Reporté | Émulateur Android, dev builds natifs (reporté) |

## Stack cible

| Technologie | Version | Notes |
|-------------|---------|-------|
| React Native | 0.82+ | New Architecture uniquement (legacy supprimée en 0.82) |
| Expo SDK | 55 (beta) / 54 (stable) | New Architecture par défaut depuis SDK 53 |
| React | 19 | React Compiler inclus (plus besoin de useMemo/useCallback manuels) |
| Hermes | v1 | Nouveau compilateur + VM, gains de performance significatifs |
| Reanimated | 4.2.1 | CSS animations/transitions, New Architecture only. Worklets dans package séparé (react-native-worklets) |
| Expo Router | v5 | Server routes, API routes |

Statut : **non commencé**

---

## Librairies candidates

Librairies repérées (Twitter, veille, recommandations) à évaluer avant le développement mobile.

### Source : Thread @joshmohrer

| Librairie | Version | Description | Scope | Statut |
|-----------|---------|-------------|-------|--------|
| @bacons/apple-targets | 3.0.6 | Apple Watch companion app depuis RN/Expo, SwiftUI views, WatchConnectivity. Config unique, compatible EAS builds. Requiert Expo SDK 53+, Xcode 16. Par Evan Bacon. | mobile | à évaluer |
| voltra | 1.0.0 | Widgets iOS (home screen, lock screen) + Dynamic Island / Live Activities en JSX. Génère du SwiftUI et Jetpack Compose Glance. Hot reload, push updates. Requiert Expo Dev Client, iOS 16.2+. Par Callstack. | mobile | à évaluer |
| expo-share-intent | 5.1.1 | Intégration share sheet iOS/Android. Permet de recevoir du contenu partagé dans l'app. Par Anselme Chorein. Note : expo-sharing intègrera une feature similaire (expérimentale) en SDK 55. | mobile | à évaluer |

### Source : Veille GitHub

| Librairie | Version | Description | Scope | Statut |
|-----------|---------|-------------|-------|--------|
| @heroui/react-native | 1.0.0-beta.13 | UI library React Native. Composants : Button, Input, Dialog, BottomSheet, Toast, Tabs, Accordion, Card, Avatar, Chip, Select, Switch, Checkbox, Skeleton, InputOTP, etc. Construit sur Tailwind v4 via Uniwind. 2.9k stars, MIT. | mobile | retenu |
| react-native-screens | 4.19.0 | Primitives de navigation natives. Tabs natifs, split-view iPad/macOS, scroll edge effects. Dépendance de react-navigation et Expo Router. Fabric only pour nouvelles features. Par Software Mansion. 3.6k stars, MIT. | mobile | à évaluer |

### Source : React Native Wrapped 2025 (Infinite Red)

| Librairie | Version | Description | Scope | Statut |
|-----------|---------|-------------|-------|--------|
| @legendapp/list | 2.0.18 | Liste haute performance, 100% JS, drop-in replacement FlatList/FlashList. Tailles dynamiques sans pénalité. 40k downloads/semaine. | mobile | à évaluer |
| @shopify/flash-list | 2.2.0 | Liste avec mesure automatique des tailles, plus besoin de estimatedItemSize. JS-only en v2, New Architecture only. 490k downloads/semaine. | mobile | à évaluer |
| uniwind | 1.2.2 | Bindings Tailwind v4 pour React Native. Styles calculés au build time. Dark mode, pseudo-classes, responsive, CSS custom properties. Par les créateurs de Unistyles. | mobile | à évaluer |
| react-native-unistyles | 3.0.22 | API miroir de StyleSheet, zéro re-renders (JSI bindings). Parser C++ cross-platform. Requiert New Architecture, RN 0.78+, Nitro Modules. | mobile | à évaluer |
| react-native-nitro-modules | 0.33.2 | Modules natifs haute performance via JSI. C++, Swift ou Kotlin avec binding statique. Par Marc Rousavy (Margelo). | mobile | à évaluer |
| expo-live-activity | - | Live Activities iOS depuis RN. Par Software Mansion Labs. Non publié sur npm (install via GitHub). Note : Voltra et expo-widgets (SDK 55) couvrent ce besoin. | mobile | à évaluer |
| Radon | - | Extension VSCode avec superpowers React Native. Par Software Mansion. Outil de DX, pas une lib. | mobile | à évaluer |
| Maestro | CLI 2.1.0 | Tests E2E mobile/web. YAML flows, tolérance au flakiness, MCP server intégré pour LLMs. Studio desktop disponible. Requiert Java 17+. | mobile | à évaluer |

**Statuts possibles :** `à évaluer` · `retenu` · `écarté`
**Scopes possibles :** `mobile` · `shared` · `web`

---

## Tâches

À définir lors du lancement du développement mobile.
