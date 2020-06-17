#!/bin/bash

docker stop serveur_jeu client_web_maitre
docker rm serveur_jeu client_web_maitre

docker network rm docker_final_static-network
