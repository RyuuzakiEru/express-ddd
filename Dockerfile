ARG PORT

# Stage 1
FROM node:20.12.2-alpine as base

WORKDIR /service/

COPY package.json yarn.lock ./

# Stage 2
FROM base as development

COPY . ./

RUN yarn set version 4.1.1
RUN yarn install --immutable
