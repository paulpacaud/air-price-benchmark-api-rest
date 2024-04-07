FROM node:20.11.0

WORKDIR /Amadeus

COPY package.json .

RUN npm install

COPY src ./src

EXPOSE 9000

CMD ["npm", "start"]
