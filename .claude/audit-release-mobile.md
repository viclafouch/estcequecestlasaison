# Audit Release Mobile — Restant

> **Fichier temporaire** — A supprimer une fois tout complete.

---

## 1. SECURITE (placeholders a remplacer)

| # | Fichier | Action |
|---|---------|--------|
| 1 | `apps/web/public/.well-known/apple-app-site-association:5` | Remplacer `XXXXXXXXXX` (Apple Team ID) quand compte cree |
| 2 | `apps/web/public/.well-known/assetlinks.json:8` | Remplacer `XX:XX:...` (SHA-256 Android) quand keystore cree |

### Privacy Manifest iOS (requis depuis iOS 17)

```xml
<key>NSPrivacyAccessedAPICategoryFileTimestamp</key>
<dict>
  <key>NSPrivacyAccessedAPITypeReasons</key>
  <array>
    <string>C617.1</string>
  </array>
</dict>
```

---

## 2. GDPR / PRIVACY

### Pages legales a creer (cote web)

| Page | Route | Impact |
|------|-------|--------|
| Privacy Policy | `/confidentialite` | Rejet Apple + Google si absente |
| CGU | `/cgu` | Rejet Apple + Google si absentes |
| Mentions legales | `/mentions-legales` | Non-conformite LCEN |

### Declarations stores

**Apple App Store Connect — App Privacy :**
- "Data Used to Track You": NO
- "Data Linked to You": NO
- "Data Not Linked to You": Product Interaction (vues produit)

**Google Play Console — Data Safety :**
- "Does your app collect data?": YES
- Type: "App interactions"
- Purpose: "App functionality"
- "Is data shared?": NO
- "Can users request deletion?": YES (via desinstallation)

### Sentry — Decision a prendre

| Option | Avantage | Inconvenient |
|--------|----------|--------------|
| **A : Configurer maintenant** | Crash reports des le jour 1 | Privacy policy plus complexe, DPA a signer |
| **B : Differer post-launch** (recommande) | Declaration "no data collected" simplifiee | Pas de crash reporting au lancement |

---

## 3. CHECKLIST PRE-SOUMISSION

### Pages web

- [ ] Creer `/confidentialite`
- [ ] Creer `/cgu`
- [ ] Creer `/mentions-legales`
- [ ] Deployer sur estcequecestlasaison.fr

### Comptes & config (manuel)

- [ ] Creer compte Apple Developer ($99/an)
- [ ] Creer compte Google Play Developer ($25)
- [ ] Remplacer placeholder Team ID dans `apple-app-site-association`
- [ ] Remplacer placeholder SHA-256 dans `assetlinks.json`
- [ ] Setup email `contact@estcequecestlasaison.fr`
- [ ] Backup securise du keystore Android

### Stores (manuel)

- [ ] Remplir App Privacy (Apple)
- [ ] Remplir Data Safety (Google Play)
- [ ] App icon 1024x1024 sans transparence
- [ ] Screenshots (voir plan-mobile.md ASO)
- [ ] Titre, subtitle, description, keywords
- [ ] Build prod iOS + Android
- [ ] TestFlight + test Pixel 9
- [ ] Soumission v1.0.0

### Audits manuels

- [ ] Audit VoiceOver (iOS simulateur)
- [ ] Audit TalkBack (Pixel 9)
- [ ] Memory leaks check (Xcode Instruments / Android Profiler)
