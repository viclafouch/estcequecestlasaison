#!/bin/bash
set -euo pipefail

# Install pnpm
npm install -g pnpm

# Install dependencies
cd "$CI_PRIMARY_REPOSITORY_PATH"
pnpm install

# Generate iOS native project
cd apps/mobile
npx expo prebuild --platform ios --clean

# Install CocoaPods
cd ios
pod install
