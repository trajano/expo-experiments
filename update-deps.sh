#!/bin/sh
set -ex
npx -y npm-check-updates -u
pushd packages/my-app
npx -y expo-doctor
npx expo install --check
popd

# Commit only package.json and package-lock.json
git add package.json **/package.json package-lock.json
git commit -m "chore(deps): updated deps"
