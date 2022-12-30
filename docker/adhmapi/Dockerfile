FROM php:8.1.9-fpm as base

RUN apt-get update && apt-get install -y \
    libicu-dev \
    git \
    wget \
    zip \
    curl \
    libcurl4-openssl-dev \
    libmcrypt-dev \
    libzip-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libpq-dev \
    libxslt-dev \
    libxrender1 fontconfig xfonts-75dpi xfonts-base \
    libc-client-dev \
    libkrb5-dev \
    optipng jpegoptim \
    nginx

# PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-configure imap --with-kerberos --with-imap-ssl \
    && docker-php-ext-install curl intl xsl pdo pdo_mysql mysqli gd exif zip imap

# intl + opcache
RUN docker-php-ext-enable opcache \
    && docker-php-ext-install intl

# Xdebug + coverage
RUN pecl install xdebug && pecl install pcov

# wkhtmltox
RUN curl -sS -L -o /tmp/wkhtmltox.deb https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.buster_amd64.deb && dpkg -i /tmp/wkhtmltox.deb

# Composer
RUN curl -sS https://getcomposer.org/download/2.4.0/composer.phar -o /usr/local/bin/composer \
    && chmod +x /usr/local/bin/composer

# Security checker
RUN curl -o /usr/bin/local-php-security-checker -L -sS "https://github.com/fabpot/local-php-security-checker/releases/download/v1.0.0/local-php-security-checker_1.0.0_linux_amd64" \
    && chmod +x /usr/bin/local-php-security-checker

# phptopng
RUN apt-get install -y poppler-utils

# tesseract OCR
RUN apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-fra

# pdftk
# see troubleshoot : https://yarnaudov.com/fix-java-jdk-jre-debian-ubuntu-install.html
RUN mkdir -p /usr/share/man/man1
RUN apt-get update && apt-get install -y pdftk

ARG DOCKER_SRC_PATH=docker/adhmapi

ADD $DOCKER_SRC_PATH/php.ini /usr/local/etc/php/
ADD $DOCKER_SRC_PATH/php-cli.ini /usr/local/etc/php/
ADD $DOCKER_SRC_PATH/www.conf /usr/local/etc/php-fpm.d/www.conf

ADD $DOCKER_SRC_PATH/nginx/server.conf /etc/nginx/sites-enabled/default

WORKDIR /var/www

COPY $DOCKER_SRC_PATH/docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 80

CMD ["bash"]

FROM base as prod

COPY apps/adhmapi /var/www

RUN  mkdir -p /var/www/var/log \
    && mkdir -p /var/www/var/cache \
    && chmod 777 /var/www/var/log \
    && chmod 777 /var/www/var/cache \
    && composer install --no-interaction --no-ansi --no-progress --no-suggest --optimize-autoloader \
    && composer dump-autoload -o \
    && rm -rf /var/www/var/cache/*

