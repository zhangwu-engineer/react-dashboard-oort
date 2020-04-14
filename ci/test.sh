#!/usr/bin/env bash

docker run --rm -e CI=true --entrypoint npm $IMAGE:$IMAGE_TAG run test -- "$@"
