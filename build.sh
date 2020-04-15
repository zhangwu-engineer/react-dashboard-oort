#!/usr/bin/env bash
set -u

if [[ ! -z "${CI_DEBUG_TRACE:-}" ]]; then
  set -x
fi

docker build\
  --build-arg REACT_APP_OKTA_ISSUER=${REACT_APP_OKTA_ISSUER}\
  --build-arg REACT_APP_OKTA_CLIENT_ID=${REACT_APP_OKTA_CLIENT_ID}\
  "$@"
