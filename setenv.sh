#!/usr/bin/env bash

# From https://zwbetz.com/set-environment-variables-in-your-bash-shell-from-a-env-file-version-2/
# See also https://stackoverflow.com/a/25507283 for launchctl setenv

# Show env vars
grep -v '^#' .env

# Export env vars
#set -o allexport
#source .env
#set +o allexport

# Export env vars
export $(grep -v '^#' .env | xargs)
