FROM node:18.17.0

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g nestjs

COPY . .

COPY ./dist ./dist

CMD [ "npm", "run", "start:dev" ]