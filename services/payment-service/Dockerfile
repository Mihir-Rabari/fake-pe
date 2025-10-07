FROM node:18-alpine

WORKDIR /app

# Copy shared dependencies
COPY shared /shared
WORKDIR /shared
RUN npm install

# Copy service files
WORKDIR /app
COPY services/payment-service/package*.json ./
RUN npm install

COPY services/payment-service .

EXPOSE 4002

CMD ["npm", "start"]
