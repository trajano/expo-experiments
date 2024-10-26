#!/bin/sh
EAS_UPDATE_CHANNEL="${EAS_UPDATE_CHANNEL:-preview}"
cd packages/my-app/
eas update --channel="$EAS_UPDATE_CHANNEL" --auto

