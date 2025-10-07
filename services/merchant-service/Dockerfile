FROM node:18-alpine

WORKDIR /app

# Copy shared dependencies
COPY shared /shared
WORKDIR /shared
RUN npm install

# Copy service files
WORKDIR /app
COPY services/merchant-service/package*.json ./
RUN npm install

COPY services/merchant-service .

EXPOSE 4003

CMD ["npm", "start"]
