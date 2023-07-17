FROM node:18-alpine

WORKDIR /usr/src/api

COPY package.* .

RUN npm install

COPY . .

EXPOSE 3600

CMD ["npm", "run", "dev"]