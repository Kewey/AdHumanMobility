FROM node:16.15.0 as base

RUN apt-get update && apt-get install -y \
    # cypress
    chromium libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb \
    # make and compile
    make g++ procps \
    # envsubst
    gettext \
    # sass
    python

ENV CHROME_BIN /usr/bin/chromium

RUN yarn global add -g @vue/cli

WORKDIR /var/www

ARG DOCKER_SRC_PATH=docker/adhm

# setup-env.sh is executed by docker-entrypoint.sh
COPY $DOCKER_SRC_PATH/setup-env.sh /setup-env.sh
COPY $DOCKER_SRC_PATH/docker-entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

FROM base as build

COPY apps/adhm /var/www

RUN yarn install && yarn build

FROM nginx:1.19.2-alpine AS prod

ARG DOCKER_SRC_PATH=docker/adhm

COPY --from=build /var/www/dist /var/www

COPY $DOCKER_SRC_PATH/nginx/default.conf /etc/nginx/conf.d/default.conf
# setup-env.sh /bin/sh
COPY $DOCKER_SRC_PATH/setup-env.sh /docker-entrypoint.d/30-setup-env.sh


