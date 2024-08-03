FROM node:20

WORKDIR /app/tv-series-api

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]
