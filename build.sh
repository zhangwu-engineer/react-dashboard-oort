#!/usr/bin/env bash
set -u

if [[ ! -z "${CI_DEBUG_TRACE:-}" ]]; then
  set -x
fi

docker build\
  --build-arg REACT_APP_OKTA_ISSUER\
  --build-arg REACT_APP_OKTA_CLIENT_ID\
  --build-arg REACT_APP_ACTIVITY_LOG_API_URL\
  --build-arg REACT_APP_CTRL_API_URL\
  "$@"
