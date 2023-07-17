FROM node:18-alpine

WORKDIR /usr/src/client

COPY package.* .
COPY . .

RUN npm install

EXPOSE 3500

CMD ["npm", "run", "dev"]
