FROM node:lts-alpine3.18

WORKDIR /sushi-shop/

COPY . .

RUN npm install

CMD ["npm", "start"]