# syntax=docker/dockerfile:1

ARG NODE_VERSION

FROM node:${NODE_VERSION}

WORKDIR /usr/src/api

COPY . .

RUN npm install

EXPOSE 3000

CMD npm run start:${NODE_ENV}

