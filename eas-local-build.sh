#!/bin/sh
set -ex
npm i -g eas-cli
npm i
rm -rf $HOME/Library/Developer/Xcode/DerivedData/MyApp-* $HOME/Library/Developer/Xcode/DerivedData/MyAppGo-*
cd packages/my-app
eas build --platform=ios --profile=development --local --non-interactive --output=../../my-app-dev-client.ipa
eas build --platform=ios --profile=preview --local --non-interactive --output=../../my-app.ipa
eas build --platform=ios --profile=preview-auto-update --local --non-interactive --output=../../my-app-auto-update.ipa
