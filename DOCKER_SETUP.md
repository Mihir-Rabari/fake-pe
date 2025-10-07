# 🐳 Docker Setup Guide

## Quick Start

### Option 1: Using Scripts (Recommended)

**Windows:**
```bash
# Install all dependencies
install-all.bat

# Start all services
start.bat
```

**Linux/Mac:**
```bash
# Install all dependencies
chmod +x install-all.sh
./install-all.sh

# Start all services
chmod +x start.sh
./start.sh
```

### Option 2: Using npm commands

```bash
# Install all dependencies
npm run install:all

# Start with Docker
npm run docker:build

# View logs
npm run docker:logs

# Stop all services
npm run docker:down
```

### Option 3: Manual Docker commands

```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

---

## 🌐 Access Points

Once all services are running:

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | - |
| **API Gateway** | http://localhost:4000 | - |
| **Auth Service** | http://localhost:4001 | - |
| **Payment Service** | http://localhost:4002 | - |
| **Merchant Service** | http://localhost:4003 | - |
| **Grafana** | http://localhost:3001 | admin / expe_grafana_2024 |
| **Prometheus** | http://localhost:9090 | - |
| **MongoDB** | localhost:27017 | admin / expe_secure_pass_2024 |
| **Redis** | localhost:6379 | Password: expe_redis_pass_2024 |

---

## 📦 Services Overview

### Infrastructure Services
- **MongoDB** - Primary database
- **Redis** - Caching, queues, distributed locks
- **Prometheus** - Metrics collection
- **Grafana** - Monitoring dashboards

### Backend Services
- **API Gateway** (Port 4000) - Routes requests, WebSocket, rate limiting
- **Auth Service** (Port 4001) - User authentication
- **Payment Service** (Port 4002) - Payment processing
- **Merchant Service** (Port 4003) - Merchant & project management
- **Webhook Service** - Background worker for webhook delivery

### Frontend
- **React App** (Port 3000) - User interface

---

## 🔧 Common Commands

### View Service Status
```bash
docker-compose ps
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api-gateway
docker-compose logs -f frontend
docker-compose logs -f payment-service
```

### Restart Services
```bash
# All services
docker-compose restart

# Specific service
docker-compose restart api-gateway
```

### Stop Services
```bash
# Stop all
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Rebuild Services
```bash
# Rebuild all
docker-compose up --build -d

# Rebuild specific service
docker-compose up --build -d api-gateway
```

---

## 🐛 Troubleshooting

### Services won't start
```bash
# Check logs
docker-compose logs

# Remove old containers and volumes
docker-compose down -v
docker system prune -a

# Rebuild
docker-compose up --build -d
```

### Port already in use
```bash
# Find process using port (Windows)
netstat -ano | findstr :3000

# Find process using port (Linux/Mac)
lsof -i :3000

# Kill the process or change port in docker-compose.yml
```

### MongoDB connection issues
```bash
# Check MongoDB is running
docker-compose ps mongodb

# Check MongoDB logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

### Redis connection issues
```bash
# Check Redis is running
docker-compose ps redis

# Test Redis connection
docker-compose exec redis redis-cli -a expe_redis_pass_2024 ping
```

### Frontend not loading
```bash
# Check frontend logs
docker-compose logs frontend

# Rebuild frontend
docker-compose up --build -d frontend

# Check API Gateway is running
docker-compose ps api-gateway
```

---

## 🔄 Development Workflow

### Local Development (without Docker)
```bash
# Install dependencies
npm run install:all

# Start all services locally
npm run dev
```

### Docker Development
```bash
# Start with hot reload
docker-compose up -d

# Services will auto-reload on code changes
```

### Production Build
```bash
# Set NODE_ENV to production in docker-compose.yml
# Then build
docker-compose -f docker-compose.yml up --build -d
```

---

## 📊 Monitoring

### Prometheus Metrics
- Access: http://localhost:9090
- All services expose `/metrics` endpoint
- Scrape interval: 15 seconds

### Grafana Dashboards
- Access: http://localhost:3001
- Username: `admin`
- Password: `expe_grafana_2024`
- Pre-configured dashboards in `monitoring/grafana/dashboards/`

### Health Checks
```bash
# API Gateway
curl http://localhost:4000/health

# Auth Service
curl http://localhost:4001/health

# Payment Service
curl http://localhost:4002/health

# Merchant Service
curl http://localhost:4003/health
```

---

## 🔐 Environment Variables

All services use environment variables defined in `docker-compose.yml`:

### Common Variables
- `NODE_ENV` - development/production
- `MONGO_URI` - MongoDB connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - JWT signing secret

### Service-Specific
- `AUTH_SERVICE_URL` - Auth service endpoint
- `PAYMENT_SERVICE_URL` - Payment service endpoint
- `MERCHANT_SERVICE_URL` - Merchant service endpoint

**⚠️ Change all passwords and secrets in production!**

---

## 📁 Volume Persistence

Data is persisted in Docker volumes:

- `mongodb_data` - MongoDB database files
- `redis_data` - Redis persistence
- `prometheus_data` - Prometheus metrics
- `grafana_data` - Grafana dashboards

### Backup Volumes
```bash
# Backup MongoDB
docker-compose exec mongodb mongodump --out /backup

# Backup Redis
docker-compose exec redis redis-cli -a expe_redis_pass_2024 SAVE
```

### Clear All Data
```bash
docker-compose down -v
```

---

## 🚀 Scaling Services

### Scale specific service
```bash
docker-compose up -d --scale payment-service=3
```

### Load Balancing
Add nginx or traefik for load balancing multiple instances.

---

## 📝 Notes

- All services are connected via `expe-network` bridge network
- Hot reload is enabled for development
- Logs are in JSON format for easy parsing
- Health checks ensure services are ready before accepting traffic

---

## 🆘 Support

For issues:
1. Check logs: `docker-compose logs -f`
2. Check service status: `docker-compose ps`
3. Restart services: `docker-compose restart`
4. Rebuild: `docker-compose up --build -d`

For more help, see `BUILD_INSTRUCTIONS.md`
