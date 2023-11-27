FROM php:8.1.14-fpm-alpine AS php

# persistent / runtime deps
RUN apk add --no-cache \
        acl \
        fcgi \
        file \
        gettext \
        git \
        jq \
        supervisor \
        libpq-dev \
        ffmpeg \
    ;

ARG APCU_VERSION=5.1.21
ARG XDEBUG_VERSION=3.0.2
RUN set -eux; \
	apk add --no-cache --virtual .build-deps \
	    $PHPIZE_DEPS \
	    curl-dev \
	    icu-dev \
	    libzip-dev \
	    zlib-dev \
        libjpeg-turbo-dev \
        libpng-dev \
        libwebp-dev \
        freetype-dev \
        libxslt-dev \
	; \
	\
    docker-php-ext-configure pgsql --with-pgsql=/usr/local/pgsql \
        && docker-php-ext-install pdo pdo_pgsql pgsql pdo_mysql mysqli; \
	docker-php-ext-configure zip; \
    docker-php-ext-configure gd  \
        --enable-gd  \
        --with-freetype  \
        --with-jpeg  \
        --with-webp\
    ; \
	docker-php-ext-install -j$(nproc) \
	    intl \
	    zip \
        gd \
        exif \
        bcmath \
        xsl \
	; \
	pecl install \
	    apcu-${APCU_VERSION} \
	    pcov \
	; \
	pecl clear-cache; \
	docker-php-ext-enable \
	    apcu \
	    opcache \
	    pcov \
	; \
	\
	runDeps="$( \
	    scanelf --needed --nobanner --format '%n#p' --recursive /usr/local/lib/php/extensions \
	        | tr ',' '\n' \
	        | sort -u \
	        | awk 'system("[ -e /usr/local/lib/" $1 " ]") == 0 { next } { print "so:" $1 }' \
	)"; \
	apk add --no-cache --virtual .phpexts-rundeps $runDeps; \
    apk add optipng jpegoptim; \
	\
	apk del .build-deps

# Composer
COPY --from=composer:2.3.5 /usr/bin/composer /usr/bin/composer
#
# Configuration
#
# PHP
ADD docker-config/api/php/php.ini /usr/local/etc/php/
ADD docker-config/api/php/php-cli.ini /usr/local/etc/php/
# supervisor
#ADD conf/supervisor/messenger-video-upload.ini /etc/supervisor.d/messenger-video-upload.ini
# php-fpm config
ADD docker-config/api/php/www.conf /usr/local/etc/php-fpm.d/www.conf

FROM php as local
# Nginx
RUN apk add --no-cache nginx
RUN apk add --no-cache graphviz
ADD docker-config/api/nginx/app.conf /etc/nginx/http.d/default.conf

WORKDIR /var/www
COPY docker-config/api/docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
EXPOSE 80

##
# Final build
##
FROM local as deployed

ARG VERSION

COPY --chown=1000:1000 api /var/www
COPY --chown=1000:1000 api/.env /var/www/.env

RUN  mkdir -p /var/www/var/log \
    && mkdir -p /var/www/var/cache \
    && chmod 755 /var/www/var/log \
    && chmod 755 /var/www/var/cache \
    && chown -R 1000:1000 /var/www/var/ \
    && composer install --no-interaction --no-ansi --no-progress --no-suggest --optimize-autoloader \
    && composer dump-autoload -o \
    && rm -rf /var/www/var/cache/* \
&& rm -rf /var/www/html

RUN echo $VERSION > /var/www/VERSION


