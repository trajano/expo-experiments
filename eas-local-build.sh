#!/bin/sh
set -ex
npm i -g eas-cli
eas build --platform=ios --profile=preview --local --non-interactive
eas build --platform=ios --profile=development --local --non-interactive
