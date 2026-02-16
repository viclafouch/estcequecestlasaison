# Common App Store Rejections — Prevention Guide

## Apple App Store — Top Rejection Reasons

### 1. Guideline 2.1 — App Completeness (most common)

**What triggers it:**
- Broken links, placeholder content, lorem ipsum
- Features that don't work or are "coming soon"
- Crashes during review
- Empty screens or dead-end navigation

**Prevention:**
- Test EVERY screen and EVERY tap target before submission
- Remove any "coming soon" features — ship what works
- Fill all metadata fields with real content
- Ensure all URLs (privacy policy, support) return 200 OK

### 2. Guideline 5.1.1 — Data Collection and Storage

**What triggers it:**
- Requesting unnecessary permissions
- Missing privacy manifest (iOS 17+)
- Missing or inaccurate privacy nutrition label
- Tracking without ATT prompt
- Privacy policy doesn't match actual data collection

**Prevention:**
- Request ONLY the permissions your app needs RIGHT NOW
- If you don't collect data, declare "Data Not Collected" everywhere
- Keep privacy policy in sync with actual app behavior
- Include privacy manifest with all required reason APIs

### 3. Guideline 4.0 — Design (minimum functionality)

**What triggers it:**
- App is too simple (Apple calls this "not useful enough")
- App is a glorified website (WebView wrapping a site)
- App doesn't use native iOS features
- App provides no value beyond the website

**Prevention:**
- Use native navigation (Tab Bar, Stack), not web patterns
- Include at least one native-only feature (offline, widgets, notifications)
- Demonstrate value that a website can't provide
- Make the app feel native, not like a web app in a container

### 4. Guideline 2.3 — Accurate Metadata

**What triggers it:**
- Screenshots don't match actual app UI
- Description overpromises features
- Keywords stuffing irrelevant terms
- Category doesn't match app functionality

**Prevention:**
- Take screenshots from the ACTUAL production build
- Description should honestly represent what the app does
- Only use keywords relevant to your app's core function
- Choose category based on primary function

### 5. Guideline 5.1.2 — Data Use and Sharing

**What triggers it:**
- Third-party SDKs collecting data without disclosure
- Analytics tracking without proper consent
- Sharing user data with third parties not disclosed

**Prevention:**
- Audit ALL third-party SDKs for data collection behavior
- Declare all SDK data collection in privacy nutrition label
- If using analytics, disclose in privacy policy
- Prefer privacy-respecting alternatives (no tracking = no problems)

### 6. Guideline 4.2 — Minimum Functionality

**What triggers it:**
- App has very limited features
- App is a simple RSS reader or web wrapper
- Content could be a website
- No interactivity beyond scrolling

**Prevention for content apps:**
- Add search functionality (shows interactivity)
- Add favorites/bookmarks (persistent state)
- Add offline mode (native advantage over web)
- Add share functionality (social integration)
- Add widgets (iOS native feature)
- Make the app genuinely useful on its own

### 7. Guideline 1.2 — User Generated Content

**What triggers it:**
- App allows user content without moderation
- Missing reporting mechanism
- Missing content filtering

**Prevention:**
- If your app has NO user-generated content, this doesn't apply
- If it does: implement reporting, blocking, and moderation

### 8. Guideline 4.3(a) — Spam / Duplication

**What triggers it:**
- App duplicates existing apps without unique value
- App looks/feels like a template or clone
- No differentiation from competitors
- Apple sends vague "does not provide a unique experience" rejection

**Prevention for content/reference apps:**
- Highlight what makes YOUR app unique (offline, curated data, specific region)
- Add genuine native features (widgets, share extensions, notifications)
- Design a distinctive UI — don't use default/template layouts
- Include enough interactivity (search, filters, favorites)
- Your review notes should explain what differentiates the app

### 9. NEW 2025 Guidelines

**Guideline 5.1.2(i) — AI Data Sharing (November 2025):**
- Apps using external AI services MUST show a consent modal specifying the AI provider and data types BEFORE sharing personal data
- Not applicable to apps without AI features

**Guideline 4.1(c) — Trademark in Icons (November 2025):**
- Cannot use another developer's brand, icon, or product name in your app icon or name
- Ensure your icon and name are original

**Guideline 1.2.1(a) — Age Restrictions for Creator Apps (November 2025):**
- Apps with user-generated content must implement age-restriction mechanisms
- Not applicable to apps without UGC

### 10. Performance Issues

**What triggers it:**
- App takes too long to launch
- Excessive battery drain
- High memory usage
- Network requests on main thread
- UI freezes / jank

**Prevention:**
- Profile with Xcode Instruments before submission
- Ensure <3s launch time
- Keep memory under 100MB
- Use background threads for heavy work

## Google Play — Top Rejection Reasons

### 1. Policy: Deceptive Behavior

**What triggers it:**
- App behavior doesn't match description
- Hidden functionality
- Misleading UI elements

**Prevention:**
- App description accurately reflects features
- No hidden settings or behaviors
- UI clearly communicates actions

### 2. Policy: User Data (Privacy)

**What triggers it:**
- Missing or inaccessible privacy policy
- Data safety section inaccurate
- Missing consent for data collection
- Transmitting data without encryption

**Prevention:**
- Privacy policy URL accessible and accurate
- Data safety section 100% matches real behavior
- HTTPS for all network calls
- Request data collection consent where required

### 3. Policy: Ads (if applicable)

**What triggers it:**
- Ads that are too intrusive
- Ads that look like app content
- Ads covering navigation elements
- Ad behavior not matching AdMob/ad network policies

**Prevention:**
- If no ads: you're safe (declare no ads in metadata)
- If ads: follow Google Ad policies strictly
- Never place ads that interfere with navigation

### 4. Target API Level

**What triggers it:**
- App doesn't target API level 35+
- Missing 16KB page size support (for apps with native code)

**Prevention:**
- Set `targetSdkVersion` to 35+ in build config
- For Expo: SDK 55 handles this automatically
- If using native modules: verify 16KB page alignment

### 5. Content Rating

**What triggers it:**
- Inaccurate IARC rating
- Content doesn't match declared rating
- Missing content rating entirely

**Prevention:**
- Complete IARC questionnaire honestly
- Re-check if app content changes significantly

## Universal Prevention Strategies

### The "Reviewer Perspective" Test

Before submitting, pretend you are a store reviewer seeing the app for the first time:

1. **First launch**: Does the app clearly communicate what it does in 5 seconds?
2. **Core flow**: Can I accomplish the main task without confusion?
3. **Edge cases**: What happens with no data? With no network? With accessibility on?
4. **Back navigation**: Can I always go back? No dead ends?
5. **Metadata match**: Does the app match its description and screenshots?

### The "Five-Minute Audit"

Before every submission, spend 5 minutes:

1. Open the production build (NOT dev build)
2. Force-quit and cold start 3 times — any crashes?
3. Navigate to every screen — any blank screens?
4. Turn on airplane mode — does offline work?
5. Check every URL in metadata — do they all load?

### Red Flags That Guarantee Rejection

- Any crash during normal use
- Placeholder text anywhere visible
- "Coming soon" features
- Broken links in metadata
- Missing privacy policy
- Requesting camera/microphone without using them
- Test/debug UI visible (console logs, debug banners)
- WebView as the primary content delivery
