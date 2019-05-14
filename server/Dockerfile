FROM node:10

WORKDIR /usr/src/app

# Copying all files needed for server build
COPY package.json ./
COPY yarn.lock ./
COPY server ./server
COPY common ./common
COPY tsconfig.node.json .

# Installing dependencies
RUN yarn

# Building server
RUN yarn build-server