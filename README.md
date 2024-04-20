## Description

NestJS OCR (Optical Character Recognition) is a powerful application that utilizes the NestJS framework to provide OCR functionality. With this app, you can easily extract text from PDFs, making it ideal for tasks like document processing and data extraction.

## Prerequisites
- [Docker](https://www.docker.com)
- [NestJS](https://nestjs.com)

## Installation

```bash
# clone repo
$ git clone https://github.com/andrepbo/nestjs-ocr.git

# change to project directory
$ cd nestjs-ocr

# install dependencies
$ npm install

# database and dev server watch mode
$ npm run docker-compose:dev

# database and prod server watch mode
$ npm run docker-compose:prod
```

Your application will be available at http://localhost:3000.

## Test

```bash
# unit tests
$ npm run docker-compose:test

# unit tests watch mode
$ npm run docker-compose:test:watch

# test coverage
$ npm run docker-compose:test:cov
```

## Stay in touch

- Author - [André Oliveira](https://www.linkedin.com/in/andrepbo)
- Website - [https://andrepbo.github.io/portfolio](https://andrepbo.github.io/portfolio)
