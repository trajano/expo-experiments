#!/bin/sh
set -ex
image_id=$(docker build -q --secret id=google-services-json,src=./google-services.json --target appium .)
container_id=$(docker run -d -p 4723:4723 ${image_id})
docker exec -d ${container_id} adb connect 192.168.0.129:5555
