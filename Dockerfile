FROM node:20

WORKDIR /app

COPY package* /app/

RUN npm install

COPY . /app/

EXPOSE 3001

CMD ["npm", "start"]
