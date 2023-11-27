#!/usr/bin/env bash

composer install -n
composer dump-autoload -o
bin/console doc:mig:mig --no-interaction
bin/console doc:fix:load --no-interaction

exec "$@"