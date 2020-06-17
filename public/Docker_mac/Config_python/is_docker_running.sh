#!/bin/bash

# Check if docker is running
docker_state=$(/usr/local/bin/docker info >/dev/null 2>&1)
if [[ $? -ne 0 ]]; then
    echo "Docker does not seem to be running, run it first and retry"
    open -a docker
fi

until /usr/local/bin/docker info >/dev/null 2>&1
do 
    echo "Docker is starting !"
    sleep 1
done

echo "Docker est lancée !"

