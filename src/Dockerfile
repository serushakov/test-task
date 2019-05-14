FROM node:10

WORKDIR /usr/src/app

# Copying all files needed for frontent build
COPY package.json ./
COPY yarn.lock ./
COPY src ./src
COPY common ./common
COPY public ./public
COPY tsconfig.json .

# Installing dependencies
RUN yarn

# Building the app
RUN yarn build