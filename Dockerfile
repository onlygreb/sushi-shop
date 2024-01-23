FROM node:20.11

WORKDIR /sushi-shop/

COPY public/ /sushi-shop/public
COPY src/ /sushi-shop/src
COPY package.json/ /sushi-shop/
COPY mock/ /sushi-shop/mock

RUN npm install

CMD ["npm", "start"]