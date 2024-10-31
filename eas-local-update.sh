#!/bin/sh
EAS_UPDATE_CHANNEL="${EAS_UPDATE_CHANNEL:-preview}"
export EXPO_APP_ID="net.trajano.myapp"
export EXPO_APP_NAME="My App"
export EXPO_APP_BRAND="release"
cd packages/my-app/
eas update --channel="$EAS_UPDATE_CHANNEL" --auto
