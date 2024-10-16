#!/bin/sh
set -ex
image_id=$(docker build -q --secret id=google-services-json,src=./google-services.json .)
container_id=$(docker run -d ${image_id})
docker cp ${container_id}:/app-dev-client.apk app-dev-client.apk
docker cp ${container_id}:/app-release.apk app-release.apk
adb install app-dev-client.apk
adb install app-release.apk
docker rm ${container_id}
