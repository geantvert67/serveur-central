FROM node

ARG port

ENV PORT=${port}

EXPOSE ${PORT}

RUN apt-get update && apt-get install -y vim git

RUN mkdir /root/.ssh/

ADD ./config/id_rsa /root/.ssh/id_rsa

RUN touch /root/.ssh/known_hosts

RUN ssh-keyscan git.unistra.fr >> /root/.ssh/known_hosts

RUN git clone git@git.unistra.fr:meckstein/serveur-jeu.git

WORKDIR ./serveur-jeu

RUN npm install

ADD ./config/config.json config.json

CMD IP=172.20.35.40 PORT=${PORT} node api.js
