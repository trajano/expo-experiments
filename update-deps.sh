#!/bin/sh
set -ex
# expo install uses another method to pull the modules when running the command
# jq --argjson overrides "$(cat node_modules/expo/bundledNativeModules.json)" \
#    '.overrides = $overrides' package.json > package.json.tmp
# mv package.json.tmp package.json

npx -y npm-check-updates@latest -u
rm -rf node_modules/ packages/*/node_modules/
rm -f package-lock.json
npm i
pushd packages/my-app
npx expo install --fix
npx -y expo-doctor@latest
popd

# Commit only package.json and package-lock.json
git add package.json **/package.json package-lock.json
git commit -m "chore(deps): updated deps"
