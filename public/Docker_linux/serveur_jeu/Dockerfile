FROM node

ARG port

ENV PORT=${port}

EXPOSE ${PORT}

RUN apt-get update && apt-get install -y vim git

RUN git clone https://github.com/geantvert67/serveur-jeu.git

WORKDIR ./serveur-jeu

RUN npm install

ADD ./config/config.json config.json

CMD IP=172.20.35.40 PORT=${PORT} API_URL=http://sterne.iutrs.unistra.fr API_PORT=8081 node api.js
