#!/usr/bin/env bash

docker run --rm -e CI=true --entrypoint npm $UI_IMAGE:$UI_IMAGE_TAG run test -- "$@"
