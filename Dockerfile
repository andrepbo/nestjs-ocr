# syntax=docker/dockerfile:1

FROM node:20.11.1 AS base

WORKDIR /usr/src/api
COPY ["package.json", "package-lock.json*", "./"]

FROM base AS dev
RUN npm ci
COPY . .
CMD [ "npm", "run", "start:dev" ]

FROM base AS prod
RUN npm ci --production
COPY . .
RUN npm install -g @nest/cli
RUN npm run build
CMD ["npm", "run", "start:prod"]
