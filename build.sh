#!/usr/bin/env bash
set -u

if [[ ! -z "${CI_DEBUG_TRACE:-}" ]]; then
  set -x
fi

docker build -t ui --build-arg REACT_APP_CLIENT_ID=$REACT_APP_CLIENT_ID --build-arg REACT_APP_ISSUER=$REACT_APP_ISSUER .
