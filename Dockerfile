FROM node:20.10.0-alpine3.18

WORKDIR /usr/src/app

COPY package.json ./

RUN apk update && apk add --no-cache curl

RUN npm install --legacy-peer-deps

COPY ./ ./

EXPOSE 3000

CMD ["npm","run","start"]