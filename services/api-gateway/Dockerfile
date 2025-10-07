FROM node:18-alpine

WORKDIR /app

# Copy shared dependencies
COPY shared /shared
WORKDIR /shared
RUN npm install

# Copy service files
WORKDIR /app
COPY services/api-gateway/package*.json ./
RUN npm install

COPY services/api-gateway .

EXPOSE 4000

CMD ["npm", "start"]
