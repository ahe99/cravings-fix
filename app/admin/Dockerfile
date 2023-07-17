FROM node:18-alpine

WORKDIR /usr/src/admin

RUN npm install -g vite
RUN npm install -g typescript

COPY package.* .
COPY . .

RUN npm install

EXPOSE 3500

CMD ["npm", "run", "dev"]
