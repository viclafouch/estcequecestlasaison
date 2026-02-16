# App Release Readiness Audit — 2026-02-16

> Audit automatique `/app-release` sur `apps/mobile/`

## Score: 16/36 items passed (16 PASS, 10 FAIL, 10 WARN)

---

## FAIL (bloque la soumission)

- [ ] **App icon 512x512 + alpha** — Fournir une icone 1024x1024 PNG **sans** canal alpha. L'icone actuelle (`icon.png`) est 512x512 avec transparence = rejet instantane Apple.

- [ ] **Adaptive icon 512x512** — L'icone Android (`adaptive-icon.png`) fait 512x512. Google Play recommande 1024x1024 pour la qualite HD dans le store.

- [ ] **Pas de `privacyManifests` dans `app.json`** — Le `PrivacyInfo.xcprivacy` natif existe, mais il ne sera pas agrege correctement sans la config dans `app.json`. Ajouter sous `expo.ios` :
  ```json
  "privacyManifests": {
    "NSPrivacyAccessedAPITypes": [
      { "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryFileTimestamp", "NSPrivacyAccessedAPITypeReasons": ["0A2A.1", "3B52.1", "C617.1"] },
      { "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategorySystemBootTime", "NSPrivacyAccessedAPITypeReasons": ["35F9.1"] },
      { "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryDiskSpace", "NSPrivacyAccessedAPITypeReasons": ["E174.1", "85F4.1"] },
      { "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryUserDefaults", "NSPrivacyAccessedAPITypeReasons": ["CA92.1"] }
    ],
    "NSPrivacyCollectedDataTypes": [],
    "NSPrivacyTracking": false
  }
  ```

- [ ] **Pas de `apple.privacyManifestAggregationEnabled`** — Ajouter `"apple.privacyManifestAggregationEnabled": "true"` dans `ios/Podfile.properties.json`. Sans ca, les privacy manifests des CocoaPods statiques ne sont pas agreges.

- [ ] **`associatedDomains` absent des entitlements** — Le fichier `Estcequecestlasaison.entitlements` est vide. Ajouter dans `app.json` :
  ```json
  "ios": { "associatedDomains": ["applinks:estcequecestlasaison.fr"] }
  ```
  Puis `npx expo prebuild --platform ios --clean`.

- [ ] **AASA placeholder Team ID (`XXXXXXXXXX`)** — Remplacer dans `apps/web/public/.well-known/apple-app-site-association` par le vrai Team ID du compte Apple Developer.

- [ ] **assetlinks.json placeholder SHA-256** — Remplacer `XX:XX:...` dans `apps/web/public/.well-known/assetlinks.json` par le vrai fingerprint du keystore Android (ou Play App Signing).

- [ ] **Pas de `eas.json`** — Creer `apps/mobile/eas.json` avec les profils development, preview, production.

- [ ] **Pas de compte Apple Developer** — Creer le compte ($99/an). Necessaire pour Team ID, certificats, TestFlight.

- [ ] **Pas de compte Google Play Developer** — Creer le compte ($25 one-time). Premier upload DOIT etre manuel via Play Console.

---

## WARN (risque de rejet)

- [ ] **`supportsTablet: true` sans layout iPad** — Apple teste sur iPad et attend une experience tablette correcte. Si le layout n'est pas adapte, passer a `"supportsTablet": false`.

- [ ] **Version mismatch** — `app.json` = `1.0.0`, `package.json` = `0.1.0`, Xcode `MARKETING_VERSION` = `1.0`. Aligner sur `1.0.0` partout.

- [ ] **Sentry non configure** — Aucun crash reporting en production. Si l'app crash chez un reviewer Apple, zero visibilite. Le plan mentionne Sentry mais il n'est pas installe.

- [ ] **Screenshots stores non preparees** — Screenshots obligatoires : iOS (6.7", 6.5", 5.5") et Android (phone + feature graphic 1024x500).

- [ ] **Pas de test iPad** — Si `supportsTablet` reste `true`, tester sur iPad simulator avant soumission.

- [ ] **Section `web` dans `app.json`** — La config `web` (bundler metro, favicon) est inutile pour une app mobile-only.

- [ ] **App Review Notes non soumises** — Notes redigees dans le plan mais pas encore dans App Store Connect.

- [ ] **Description store non redigee** — Description longue (<4000 chars) et keywords iOS (100 chars) dans le plan ASO mais pas finalises.

- [ ] **Splash icon 512x512** — Resolution plus haute (1024x1024+) recommandee pour les ecrans Retina.

- [ ] **`LSMinimumSystemVersion: 12.0`** — iOS 12 est ancien. Expo SDK 55 requiert probablement iOS 16+. Verifier la coherence du minimum deployment target.

---

## PASS

- [x] **Bundle ID coherent** : `fr.estcequecestlasaison.app` (app.json iOS + Android, Xcode project)
- [x] **CFBundleDisplayName** : "Est-ce que c'est la saison ?" (nom reel, pas placeholder)
- [x] **PrivacyInfo.xcprivacy** : 4 Required Reason APIs (FileTimestamp, SystemBootTime, DiskSpace, UserDefaults)
- [x] **NSPrivacyCollectedDataTypes** : tableau vide (correct, zero data)
- [x] **NSPrivacyTracking** : `false`
- [x] **Zero permissions** demandees (aucune cle NS*UsageDescription)
- [x] **URL scheme** enregistre (`estcequecestlasaison`)
- [x] **Intent filters Android** configures pour deep linking
- [x] **Edge-to-edge** active (Android 15+)
- [x] **Pages legales** presentes avec vrai contenu (confidentialite, mentions legales, CGU, FAQ)
- [x] **Email support** : `contact@estcequecestlasaison.fr`
- [x] **Hermes** active
- [x] **Portrait only** verrouille
- [x] **Splash screen** configure
- [x] **expo-store-review** installe
- [x] **expo-sqlite** installe (KV store rating tracking)

---

## Priorites d'action

| # | Action | Bloquant? |
|---|--------|-----------|
| 1 | Generer icone 1024x1024 sans alpha | Oui |
| 2 | Creer compte Apple Developer | Oui |
| 3 | Creer compte Google Play Developer | Oui |
| 4 | Ajouter `privacyManifests` dans `app.json` | Oui |
| 5 | Ajouter `apple.privacyManifestAggregationEnabled` | Oui |
| 6 | Ajouter `associatedDomains` + rebuild | Oui |
| 7 | Creer `eas.json` | Oui |
| 8 | Remplacer placeholders AASA/assetlinks | Oui |
| 9 | Decider `supportsTablet` true/false | Recommande |
| 10 | Aligner versions (1.0.0 partout) | Recommande |
| 11 | Installer + configurer Sentry | Recommande |
| 12 | Preparer screenshots store | Avant soumission |
| 13 | Rediger description + keywords definitifs | Avant soumission |

---

> Fichier temporaire — supprimer apres resolution des items.
