#!/bin/bash

docker build -t css-inject .
docker run -it -p 1337:80 css-inject