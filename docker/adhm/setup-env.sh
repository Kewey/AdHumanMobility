#!/bin/sh

env_file_dest=/var/www

if [ $1 ]
then
   env_file_dest=$1
fi

cat > '/tmp/env.js' <<EOF
window.env = Object.assign({ ...window.env }, {
    APP_DOMAIN: "$APP_DOMAIN",
    JWT_COOKIE_HP: "$JWT_COOKIE_HP"
});
EOF

envsubst </tmp/env.js> $env_file_dest/env.js
