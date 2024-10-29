#!/bin/bash

# Check if at least one ID is passed
if [ "$#" -lt 1 ]; then
  echo "Usage: $0 id1 [id2 id3 ...]"
  exit 1
fi

# Create a JSON array of the passed IDs
ids_json=$(printf '"%s",' "$@")
ids_json="[${ids_json%,}]"

# Perform the curl request
curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/getReceipts" \
-d '{
  "ids": '"$ids_json"'
}'
