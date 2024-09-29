#!/bin/sh
set -ex
npx -y npm-check-updates -u
npm i
pushd packages/my-app
npx expo install --fix
npx -y expo-doctor
popd

# Commit only package.json and package-lock.json
git add package.json **/package.json package-lock.json
git commit -m "chore(deps): updated deps"
