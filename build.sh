#!/bin/sh
set -ex
image_id=$(docker build -q --secret id=google-services-json,src=$(pwd)/google-services.json .)
container_id=$(docker run -d ${image_id})
docker cp ${container_id}:/app-debug.apk app-debug.apk
docker cp ${container_id}:/app-release.apk app-release.apk
adb install app-debug.apk
adb install app-release.apk
