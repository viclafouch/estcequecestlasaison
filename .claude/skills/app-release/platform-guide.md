# Platform-Specific Guide — iOS, Android & Expo/React Native

## iOS App Store

### Apple Review Guidelines — Critical Numbers

| # | Name | Risk | Notes |
|---|------|------|-------|
| 2.1 | App Completeness | CRITICAL | No crashes, no placeholders, no "coming soon" |
| 2.3 | Accurate Metadata | HIGH | Screenshots must match real UI |
| 4.0 | Design | HIGH | Must feel native, not a web wrapper |
| 4.2 | Minimum Functionality | HIGH | Must provide value beyond a website |
| 5.1.1 | Data Collection | CRITICAL | Privacy manifest + nutrition label required |
| 5.1.2 | Data Use and Sharing | HIGH | Disclose all SDK data collection |
| 5.2.1 | Legal (privacy policy) | CRITICAL | Required and must be accurate |

### Info.plist Permissions

- Every permission key needs a clear, specific, user-facing usage description
- Explain WHY, not just WHAT: "To show seasonal produce near you" vs "We need your location"
- Remove unused permission keys — Apple scanner flags them
- `NSAppTransportSecurity` must use strict HTTPS

### Privacy Manifest (iOS 17+)

`PrivacyInfo.xcprivacy` must declare:
- `NSPrivacyAccessedAPITypes` — Required Reason APIs
- `NSPrivacyCollectedDataTypes` — Data you collect
- `NSPrivacyTracking` / `NSPrivacyTrackingDomains`

React Native apps typically need these Required Reason APIs:

| API Category | Reason Code |
|---|---|
| `NSPrivacyAccessedAPICategoryFileTimestamp` | `C617.1` |
| `NSPrivacyAccessedAPICategorySystemBootTime` | `35F9.1` |
| `NSPrivacyAccessedAPICategoryDiskSpace` | `E174.1` |
| `NSPrivacyAccessedAPICategoryUserDefaults` | `CA92.1` |

### App Store Connect Checklist

- [ ] Privacy Policy URL — live HTTPS
- [ ] Age Rating questionnaire completed
- [ ] Category — primary + secondary
- [ ] App Privacy — nutrition label accurate
- [ ] Review Notes — demo credentials, feature explanations, contact info

### Build Requirements (2025+)

- [ ] Built with Xcode 15+ / iOS 17 SDK minimum
- [ ] Supports all declared screen sizes (iPhone + iPad if `supportsTablet`)
- [ ] No private API usage
- [ ] Archive validated in Xcode Organizer before upload

### Universal Links

- [ ] `apple-app-site-association` at `/.well-known/apple-app-site-association`
- [ ] Served with `Content-Type: application/json` (no redirects)
- [ ] `appID` format: `TEAMID.bundleIdentifier`
- [ ] `associatedDomains` entitlement: `applinks:yourdomain.com`
- [ ] Validate: `https://app-site-association.cdn-apple.com/a/v1/yourdomain.com`

### Screenshots

| Device | Resolution | Required? |
|--------|-----------|-----------|
| iPhone 6.7" (15 Pro Max) | 1290 x 2796 | Yes |
| iPhone 6.5" (11 Pro Max) | 1284 x 2778 | Yes |
| iPhone 5.5" (8 Plus) | 1242 x 2208 | Yes |
| iPad Pro 12.9" | 2048 x 2732 | Only if supporting iPad |

Max 10 screenshots per size. First 3 visible in search results.

### TestFlight

- [ ] Build uploaded and processed (15-30 min)
- [ ] Tested on physical device (simulator is NOT sufficient for submission)
- [ ] Crash-free for 24h minimum
- [ ] Beta App Review passed for external testers

### Review Tips

- Submit Monday-Wednesday (avoid holidays, WWDC, launch weeks)
- Complete metadata 100% — incomplete = delayed
- Clear review notes reduce back-and-forth
- If rejected: fix EXACTLY what was cited, resubmit via Resolution Center

---

## Google Play Store

### Build Requirements (2025+)

- [ ] Target API level 35+ (Android 15) — required from August 2025
- [ ] Android App Bundle (.aab) format — APK not accepted
- [ ] 16KB page size support — required from November 2025 for API 35+
  - Pure Kotlin/Java: automatically compatible
  - Native code (NDK): must rebuild with 16KB alignment
  - Expo/RN: check native modules compatibility
- [ ] Play App Signing configured
- [ ] R8 / ProGuard minification enabled

### Data Safety Section

For each data type, declare:
1. Whether collected / shared
2. Whether required or optional
3. Purpose (functionality, analytics, etc.)
4. Encryption in transit
5. Data deletion policy

For zero-data apps: "No data collected" + "No data shared" + privacy policy URL.

### Testing Tracks (progressive release)

1. **Internal** — Up to 100 testers, no review
2. **Closed** (Alpha) — Invite-only, quick review
3. **Open** (Beta) — Public, reviewed
4. **Production** — Full release

Best practice: Internal > Closed > Production. Never go straight to production.

### Android-Specific Technical Checks

- [ ] `edgeToEdgeEnabled: true` (Android 15 requires edge-to-edge)
- [ ] Adaptive icon with foreground + background layers
- [ ] Hardware back button works everywhere
- [ ] `intentFilters` configured for deep links
- [ ] `assetlinks.json` at `/.well-known/assetlinks.json`
- [ ] SHA-256 fingerprint matches Play App Signing certificate

### Screenshots

- Feature graphic: 1024 x 500 (required, first thing users see)
- Phone: 2-8 screenshots (min 320px, max 3840px)
- 7"/10" tablet screenshots only if supporting tablets

### ASO Differences from iOS

| | iOS | Android |
|---|---|---|
| Title | 30 chars | 30 chars |
| Subtitle / Short desc | 30 chars | 80 chars |
| Keywords | 100 chars (field) | In description (no field) |
| Description | 4000 chars | 4000 chars |
| Feature graphic | None | 1024x500 (required) |

---

## Expo & React Native Pitfalls

### Pre-Build Checklist

- [ ] `npx expo prebuild --clean` for each platform before production
- [ ] Verify `CFBundleIdentifier` / `package` matches `app.json` (no `com.anonymous.*`)
- [ ] All plugins listed in `app.json` plugins array
- [ ] `CFBundleDisplayName` is real app name (not "mobile" or placeholder)

### Expo Privacy Manifest Setup

In `app.json` > `expo` > `ios`:
```json
{
  "privacyManifests": {
    "NSPrivacyAccessedAPITypes": [
      {
        "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryFileTimestamp",
        "NSPrivacyAccessedAPITypeReasons": ["C617.1"]
      },
      {
        "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategorySystemBootTime",
        "NSPrivacyAccessedAPITypeReasons": ["35F9.1"]
      },
      {
        "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryDiskSpace",
        "NSPrivacyAccessedAPITypeReasons": ["E174.1"]
      },
      {
        "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryUserDefaults",
        "NSPrivacyAccessedAPITypeReasons": ["CA92.1"]
      }
    ]
  }
}
```

In `ios/Podfile.properties.json`:
```json
{ "apple.privacyManifestAggregationEnabled": "true" }
```

### Common Expo Submission Mistakes

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Wrong bundle ID after prebuild | Upload rejected by App Store Connect | `npx expo prebuild --platform ios --clean` |
| Missing associated domains | Universal links broken in production | Add `associatedDomains` back in `app.json` before prod build |
| Dev build submitted | Rejection for debug UI | Use `--configuration Release` or EAS production profile |
| Missing splash/icon | Blank splash, missing icon | Verify `icon` and `splash` paths in `app.json` |
| `expo-store-review` silent | Rating prompt never appears | Test on physical device; Apple controls frequency |
| `supportsTablet: true` without iPad layout | Rejection for broken iPad UI | Either optimize for iPad or set to `false` |
| First Android upload via EAS Submit | API error, upload fails | First upload MUST be manual via Google Play Console |

### iPad `supportsTablet` Trap

If `app.json` has `"supportsTablet": true`, Apple WILL review on iPad and expect a proper tablet experience. Options:

1. **Set `supportsTablet: false`** — app runs at phone resolution on iPad (acceptable)
2. **Keep `true` and optimize** — responsive layout, proper use of iPad screen space

Test on iPad simulator before submitting if `supportsTablet` is `true`.

### Google Play First Upload

Google Play API (used by EAS Submit) requires at least one manual upload before API submissions work. For your very first submission:

1. Build the AAB locally or via EAS Build
2. Upload manually through Google Play Console > Internal testing
3. After that, EAS Submit will work for subsequent uploads

### React Native Technical Checks

- [ ] Hermes enabled (default in Expo SDK 55) — faster startup
- [ ] Source maps uploaded to crash reporting (Sentry)
- [ ] Polyfills load BEFORE any code that uses them (root `_layout.tsx` first import)
- [ ] All native modules compatible with current RN version
- [ ] `GestureHandlerRootView` wraps entire app
- [ ] Animations tested in production mode (debug runs differently)

### Production Build Verification

```bash
# 1. Clean prebuild
npx expo prebuild --clean

# 2. iOS: Xcode Archive
open ios/*.xcworkspace
# Product > Archive > Validate App

# 3. Android: AAB
cd android && ./gradlew bundleRelease

# 4. Health check
npx expo-doctor
```
