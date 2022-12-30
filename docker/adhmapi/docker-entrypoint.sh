#!/bin/bash

useradd adhm_user --shell /bin/bash --home /home/adhm_user --uid="1000"
mkdir /home/adhm_user
chown adhm_user:adhm_user /home/adhm_user
# virtual volume folder
chown adhm_user:adhm_user /var/www/var

mkdir -p /var/www/var/media
chown adhm_user:adhm_user /var/www/var/media

if [ ! -f /var/www/config/jwt/private.pem ]; then
  echo "Generate key pair fot jwt authentication"
  chmod 777 /var/www/config/jwt
  # generate private key
  su -c "openssl genrsa -out /var/www/config/jwt/private.pem 4096" adhm_user
  # generate public key
  su -c "openssl pkey -in /var/www/config/jwt/private.pem -out /var/www/config/jwt/public.pem -pubout" adhm_user
fi


echo "Warmup cache"
su -c "php /var/www/bin/console cache:clear -n" adhm_user

echo "Installing dependencies ..."
su -c "composer install" adhm_user

su -c "php /var/www/bin/console doctrine:migrations:migrate -n -vv" adhm_user

nginx
php-fpm
