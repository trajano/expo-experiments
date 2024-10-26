#!/bin/sh
set -ex
image_id=$(docker build -q --secret id=google-services-json,src=./google-services.json --target appium .)
docker rm -f appium || true
docker run --name appium -d -p 4723:4723 --memory=512m -v appium_android_data:/root/.android ${image_id}
docker exec appium adb connect 192.168.0.129:5555
cd packages/my-app-appium-test
npx wait-on http://localhost:4723/status
npm run test:e2e

