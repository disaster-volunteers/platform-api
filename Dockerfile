FROM node:latest

WORKDIR /usr/src/app
COPY . .
RUN npm i -g @nestjs/cli
RUN npm i

ENTRYPOINT ["npm", "run", "start:dev"]
