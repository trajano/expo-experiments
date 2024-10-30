#!/bin/sh
set -ex
npm i -g eas-cli
cd packages/my-app
eas build --platform=ios --profile=preview --local --non-interactive --output=../../app.ipa
eas build --platform=ios --profile=development --local --non-interactive --output=../../app-dev-client.ipa
