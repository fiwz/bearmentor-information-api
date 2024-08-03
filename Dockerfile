FROM node:20

WORKDIR /app/tv-series-api

# Reorder lines to not invalidate Docker build cache
# COPY package*.json .

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]
