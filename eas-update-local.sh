#!/bin/sh
EAS_UPDATE_CHANNEL="${EAS_UPDATE_CHANNEL:-preview}"
eas update --channel="$EAS_UPDATE_CHANNEL" --auto

