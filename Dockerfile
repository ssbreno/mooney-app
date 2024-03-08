FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . ./

RUN npm run build

CMD [ "npm", "start" ]
