# syntax=docker/dockerfile:1

FROM node:20.11.1 AS base

WORKDIR /usr/src/api
COPY ["package.json", "package-lock.json*", "./"]

FROM base AS dev
ENV NODE_ENV=development
RUN npm ci
COPY . .
CMD [ "npm", "run", "start:dev" ]

FROM dev AS dev-debug
CMD [ "npm", "run", "start:debug" ]

FROM dev AS test
ENV NODE_ENV=test
CMD [ "npm", "run", "test" ]

FROM test AS test-cov
CMD [ "npm", "run", "test:cov" ]

FROM dev AS test-watch
ENV GIT_WORK_TREE=/usr/src/api GIT_DIR=/usr/src/api/.git
RUN apt-get install git
CMD [ "npm", "run", "test:watch" ]

FROM base AS prod
ENV NODE_ENV=production
RUN npm ci --production
COPY . .
RUN npm install -g @nestjs/cli
RUN npm run build
CMD ["npm", "run", "start:prod"]
