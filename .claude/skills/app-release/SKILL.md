---
name: app-release
description: Pre-submission audit for iOS App Store and Google Play Store. Run before every app release to catch rejection causes, verify metadata, privacy compliance, and platform-specific requirements. Covers Expo/React Native specifics, common rejection reasons, and store optimization.
user-invocable: true
---

# App Release Readiness Audit

Senior mobile release engineer. Audits the app for store submission readiness, catching rejection causes before they happen.

## When to Use

Run `/app-release` before every store submission. Nearly 40% of first-time submissions are rejected due to preventable issues.

## Audit Process

1. **Read the mobile plan** (`.claude/plan-mobile.md`) to understand current state
2. **Scan config files** (`app.json`, `package.json`, `Info.plist`, `AndroidManifest.xml`) for missing or incorrect values
3. **Run checklists** platform by platform (iOS, Android, universal)
4. **Check for common Expo/React Native pitfalls** (privacy manifest, 16KB pages, etc.)
5. **Generate a readiness report** with PASS/FAIL/WARN per item

## Report Format

```
## App Release Readiness Report

### Score: X/Y items passed

### FAIL (blocks submission)
- [ ] Item description — **Fix:** specific action

### WARN (risk of rejection)
- [ ] Item description — **Risk:** explanation

### PASS
- [x] Item description
```

## Checklists

### 1. Developer Accounts & Legal

- [ ] Apple Developer account active ($99/year) — not expired
- [ ] Google Play Developer account active ($25 one-time)
- [ ] Tax and banking info complete (App Store Connect)
- [ ] All agreements signed (App Store Connect + Google Play Console)
- [ ] Privacy policy URL live and accessible — **top 3 rejection cause**
- [ ] Support URL live and accessible
- [ ] Terms of service / CGU URL live (if applicable)
- [ ] Contact email functional and responsive

### 2. App Identity & Bundle

- [ ] Bundle ID matches everywhere: `app.json`, Xcode project, App Store Connect, Google Play Console
- [ ] Version number follows SemVer (e.g., 1.0.0)
- [ ] Build number incremented from last submission
- [ ] App name consistent across `app.json`, stores, splash screen
- [ ] `CFBundleDisplayName` is the real app name (not "mobile" or placeholder)
- [ ] URL scheme registered and unique

### 3. App Store Assets

- [ ] App icon 1024x1024, no alpha channel, no transparency — **instant rejection if wrong**
- [ ] Android adaptive icon (foreground + background layers)
- [ ] Screenshots for ALL required device sizes:
  - iOS: 6.7" (1290x2796), 6.5" (1284x2778), 5.5" (1242x2208)
  - Android: phone + 7" tablet + 10" tablet (if supporting tablets)
- [ ] Screenshots show value proposition, not just UI
- [ ] First screenshot = core value in 3 seconds
- [ ] App preview video (optional, but increases conversion 20%+)
- [ ] App description under 4000 characters
- [ ] Keywords optimized (iOS: 100 char limit, comma-separated, no spaces after commas)
- [ ] Short description / subtitle concise and compelling

### 4. Privacy & Permissions (top rejection area)

#### iOS Privacy Manifest (required since iOS 17)

- [ ] `PrivacyInfo.xcprivacy` file included
- [ ] Privacy manifest aggregation enabled in `Podfile.properties.json`:
  ```json
  { "apple.privacyManifestAggregationEnabled": "true" }
  ```
- [ ] Required Reason APIs declared (React Native typically needs):
  - `NSPrivacyAccessedAPICategoryFileTimestamp` — reason: `C617.1`
  - `NSPrivacyAccessedAPICategorySystemBootTime` — reason: `35F9.1`
  - `NSPrivacyAccessedAPICategoryDiskSpace` — reason: `E174.1`
  - `NSPrivacyAccessedAPICategoryUserDefaults` — reason: `CA92.1`
- [ ] `NSPrivacyCollectedDataTypes` accurate (empty array if no data collected)
- [ ] `NSPrivacyTracking` set to `false` (unless using ATT)

#### Permissions (Info.plist / AndroidManifest)

- [ ] Every permission has a clear, user-facing usage description
- [ ] No unused permissions requested (Apple rejects for this)
- [ ] Camera/microphone/location only if app actually uses them
- [ ] No tracking without ATT prompt (iOS)

#### App Store Connect — App Privacy

- [ ] Privacy nutrition label filled accurately
- [ ] Data collection categories match actual behavior
- [ ] "Data Not Collected" only if truly zero data collection

#### Google Play — Data Safety

- [ ] Data safety section filled accurately
- [ ] Data types, purposes, and sharing disclosed
- [ ] Encryption status declared
- [ ] Data deletion policy described (if applicable)

### 5. Metadata Compliance

- [ ] Age rating questionnaire completed accurately (both stores)
- [ ] Category selection aligned with actual app functionality
- [ ] Copyright information filled (year + entity name)
- [ ] Content rating accurate (IARC for Google Play)
- [ ] No placeholder text in any metadata field
- [ ] No mention of other platforms ("also available on Android" in iOS listing)
- [ ] No pricing/availability claims that could become outdated

### 6. Technical Quality

#### Build

- [ ] Production build (not development) — no dev menus, no debug banners
- [ ] No crashes on cold start (test 10+ times)
- [ ] No crashes during normal navigation flows
- [ ] App size optimized (under 200MB for iOS cellular downloads)
- [ ] Android App Bundle format (.aab), not APK
- [ ] iOS built with minimum Xcode 15 / iOS 17 SDK
- [ ] Android targets API level 35+ (required from August 2025)
- [ ] 16KB page size support (Android 15+, required November 2025)

#### Testing

- [ ] Tested on PHYSICAL devices, not just simulators
- [ ] Tested on multiple screen sizes
- [ ] Tested with slow/no network (offline mode if applicable)
- [ ] Tested with system dark mode (even if app is light-only — no visual glitches)
- [ ] Tested with Dynamic Type / large text (accessibility)
- [ ] Tested with VoiceOver (iOS) and TalkBack (Android)
- [ ] Memory usage under 100MB during normal use
- [ ] No memory leaks detected (Xcode Instruments / Android Profiler)

#### Performance

- [ ] App launches in under 3 seconds
- [ ] Smooth scrolling (60fps) in all lists
- [ ] No jank during navigation transitions
- [ ] No excessive battery drain

### 7. Deep Linking & Universal Links

- [ ] `apple-app-site-association` file deployed on web domain
- [ ] `assetlinks.json` file deployed on web domain
- [ ] AASA served with `Content-Type: application/json`
- [ ] AASA not behind redirects (Apple requires direct response)
- [ ] `associatedDomains` entitlement in iOS build
- [ ] Team ID in AASA matches Apple Developer account
- [ ] SHA-256 fingerprint in assetlinks matches Android keystore
- [ ] Deep links tested from Safari (iOS) and Chrome (Android)

### 8. App Review Preparation (top rejection area)

- [ ] Demo account credentials provided (if login required)
- [ ] Clear review notes explaining non-obvious features
- [ ] Contact information up to date
- [ ] If app requires specific hardware, explain in notes
- [ ] Screenshots of all features included in notes (for complex apps)
- [ ] Explain offline functionality if app works without network
- [ ] Explain any background activity

### 9. Monitoring & Analytics

- [ ] Crash reporting configured (Sentry, Crashlytics, etc.)
- [ ] Source maps uploaded for production builds
- [ ] Alerts configured for crash spike detection

### 10. Post-Submission

- [ ] TestFlight tested by real users before App Store submission
- [ ] Google Play internal testing track tested before production
- [ ] Phased rollout configured (Google Play: percentage rollout)
- [ ] Release notes written (user-facing changelog)
- [ ] Marketing materials ready (website, social media)

## Additional Resources

- [platform-guide.md](./platform-guide.md) — iOS, Android & Expo/React Native specific guidelines, checklists, and pitfalls
- [rejections.md](./rejections.md) — Top rejection reasons with prevention strategies
