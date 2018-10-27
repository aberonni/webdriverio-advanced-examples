#!/bin/sh

docker pull elgalu/selenium:3.14.0-p13

docker pull dosel/zalenium:3.14.0f

docker run --rm -ti --name zalenium -p 4444:4444 \
      -v /var/run/docker.sock:/var/run/docker.sock \
      -v /tmp/videos:/home/seluser/videos \
      --privileged dosel/zalenium start
