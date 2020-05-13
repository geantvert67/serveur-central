# Base image
FROM node

ARG port 

ARG port_serveur

ENV PORT_REACT=${port}

ENV PORT_NODE=${port_serveur}

EXPOSE ${PORT_REACT}

RUN apt-get update && apt-get install -y vim git 

RUN mkdir /root/.ssh/

ADD ./config/id_rsa /root/.ssh/id_rsa

RUN touch /root/.ssh/known_hosts

RUN ssh-keyscan git.unistra.fr >> /root/.ssh/known_hosts

RUN git clone git@git.unistra.fr:meckstein/client-web-maitre.git

WORKDIR ./client-web-maitre

RUN npm install

CMD REACT_APP_SERVER_URL=127.0.0.1 REACT_APP_SERVER_PORT=${PORT_NODE} npx react-scripts start







