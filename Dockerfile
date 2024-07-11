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

# Stage 3
FROM development as build

RUN yarn build

# Stage 4
FROM development AS prune

RUN yarn workspaces focus --production

# Stage 5
FROM base as release

COPY --from=prune /service/node_modules ./node_modules
COPY --from=build /service/dist ./dist

USER node

EXPOSE $PORT
EXPOSE 9464

CMD yarn run start:prod
