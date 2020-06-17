# Base image
FROM node

ARG port 

ARG port_serveur

ENV PORT_REACT=${port}

ENV PORT_NODE=${port_serveur}

EXPOSE ${PORT_REACT}

RUN apt-get update && apt-get install -y vim git 

RUN git clone https://github.com/geantvert67/client-web-maitre.git

WORKDIR ./client-web-maitre

RUN npm install

CMD REACT_APP_SERVER_URL=127.0.0.1 REACT_APP_SERVER_PORT=${PORT_NODE} npx react-scripts start







