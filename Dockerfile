FROM node:13-alpine

RUN apk update &&\
    apk add --no-cache\
      build-base python2\
      bash curl\
      tini runit

WORKDIR /ui
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
ARG REACT_APP_ISSUER
ARG REACT_APP_CLIENT_ID
RUN env REACT_APP_OKTA_ISSUER=$REACT_APP_OKTA_ISSUER\
        REACT_APP_OKTA_CLIENT_ID=$REACT_APP_OKTA_CLIENT_ID\
        npm run build-all

RUN ln -s /ui/image/runit/* /etc/service/.

ENTRYPOINT ["/sbin/tini", "--", "/ui/image/entrypoint.sh"]
