ARG TAG=16.13.1-alpine3.14@sha256:8569c8f07454ec42501e5e40a680e49d3f9aabab91a6c149e309bac63a3c8d54
FROM node:${TAG}

WORKDIR /usr/src/app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

COPY . .

RUN pnpm install

RUN pnpm build

RUN chown -R node:node /usr/src/app

USER node

EXPOSE 3000

CMD [ "pnpm", "start:prod" ]