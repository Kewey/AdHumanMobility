#!/bin/bash

userdel node

useradd adhm_user --shell /bin/bash --home /home/adhm_user --uid="1000"
mkdir /home/adhm_user
chown adhm_user:adhm_user /home/adhm_user

# referred to setup-env.sh
/setup-env.sh /var/www/public

su -c "yarn install" adhm_user
su -c "yarn serve" adhm_user
