#!/bin/bash

#Fonction qui vérie si un port est utilisé sur la machine de l'hôte.
check_port(){
    while [[ $status -eq 0  ]]
    do
        port_react=$(( $RANDOM % 65535 + 1024 ))
        nc -zvw3 127.0.0.1 $port_react
        status=$? # On stocke le code retour sinon boucle infini car la dernière commande pas celle au dessus
    done
}

#------------------ Trouve 2 port non utilisé un pour le serveur de jeu et un pour le client web maitre --------------------
export port_react=3000

export port_node=5000

nc -zvw3 127.0.0.1 $port_react

export status=$?

check_port $port_react $status

nc -zvw3 127.0.0.1 $port_node

check_port $port_node $status

#------------------- Création et lancement de l'image docker -----------------------------------------------------------------

docker-compose build --no-cache

docker-compose up