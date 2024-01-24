FROM node:lts-alpine3.18

WORKDIR /sushi-shop/

COPY . .

RUN yarn install

CMD ["yarn", "start"]