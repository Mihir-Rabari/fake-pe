FROM node:18-alpine

WORKDIR /app

# Copy shared dependencies
COPY shared /shared
WORKDIR /shared
RUN npm install

# Copy service files
WORKDIR /app
COPY services/auth-service/package*.json ./
RUN npm install

COPY services/auth-service .

EXPOSE 4001

CMD ["npm", "start"]
