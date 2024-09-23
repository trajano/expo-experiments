#!/bin/sh
# Build EAS dev client and preview for iOS only.
# Ensure EXPO_TOKEN is set in the environment variables.
# Also, credentials.json should be downloaded using 'eas credentials' in interactive mode.
docker build --secret id=EXPO_TOKEN \
  --secret id=eas-credentials-json,src=./credentials.json \
  --target eas-build .
