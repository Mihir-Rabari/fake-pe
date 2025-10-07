FROM node:18-alpine

WORKDIR /app

# Copy shared dependencies
COPY shared /shared
WORKDIR /shared
RUN npm install

# Copy service files
WORKDIR /app
COPY services/webhook-service/package*.json ./
RUN npm install

COPY services/webhook-service .

CMD ["npm", "start"]
