# Build Instructions for Expe Payment Gateway

## Prerequisites

- Docker Desktop installed and running
- Node.js 18+ and npm 9+
- Git
- At least 4GB RAM available for Docker
- Ports available: 3000, 4000-4004, 6379, 9090, 27017, 3001

## Quick Start (Recommended)

### 1. Clone and Setup

```bash
git clone https://github.com/Mihir-Rabari/fake-pe.git
cd fake-pe
```

### 2. Install Dependencies

```bash
npm install
npm run install:all
```

This will install dependencies for:
- Root workspace
- All microservices
- Frontend application
- Shared utilities

### 3. Start Infrastructure (Docker)

```bash
docker-compose up -d mongodb redis prometheus grafana
```

Wait for services to be healthy (about 30 seconds):

```bash
docker-compose ps
```

### 4. Start Application Services

#### Option A: All services at once
```bash
npm run dev
```

#### Option B: Individual services (for debugging)

Terminal 1 - API Gateway:
```bash
npm run dev -w api-gateway
```

Terminal 2 - Auth Service:
```bash
npm run dev -w auth-service
```

Terminal 3 - Payment Service:
```bash
npm run dev -w payment-service
```

Terminal 4 - Webhook Service:
```bash
npm run dev -w webhook-service
```

Terminal 5 - Merchant Service:
```bash
npm run dev -w merchant-service
```

Terminal 6 - Frontend:
```bash
npm run dev -w frontend
```

### 5. Access the Application

- **Landing Page**: http://localhost:3000
- **API Gateway**: http://localhost:4000
- **Grafana Dashboard**: http://localhost:3001 (admin/expe_grafana_2024)
- **Prometheus**: http://localhost:9090
- **API Health**: http://localhost:4000/health

## Docker-Only Deployment

To run everything in Docker:

```bash
docker-compose up -d
```

This will build and start all services including the application.

## Development Workflow

### Running Tests

```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# Specific service
npm test -w payment-service
```

### Linting and Formatting

```bash
# Lint all code
npm run lint

# Format all code
npm run format
```

### Viewing Logs

```bash
# All Docker services
docker-compose logs -f

# Specific service
docker-compose logs -f mongodb
docker-compose logs -f api-gateway

# Application logs (if running with npm)
# Logs will appear in the terminal where you ran npm run dev
```

### Database Access

#### MongoDB

```bash
# Connect to MongoDB shell
docker exec -it expe-mongodb mongosh -u admin -p expe_secure_pass_2024 --authenticationDatabase admin

# Use the database
use expe_gateway

# View collections
show collections

# Query payments
db.payments.find().pretty()
```

#### Redis

```bash
# Connect to Redis CLI
docker exec -it expe-redis redis-cli -a expe_redis_pass_2024

# View all keys
KEYS *

# Get a value
GET lock:payment:pay_123

# Monitor commands
MONITOR
```

## Environment Variables

Create `.env` files in each service directory if you need to override defaults:

### API Gateway (.env)
```env
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://admin:expe_secure_pass_2024@localhost:27017/expe_gateway?authSource=admin
REDIS_URL=redis://:expe_redis_pass_2024@localhost:6379
JWT_SECRET=your_jwt_secret_here
ALLOWED_ORIGINS=http://localhost:3000
```

### Auth Service (.env)
```env
NODE_ENV=development
PORT=4001
MONGO_URI=mongodb://admin:expe_secure_pass_2024@localhost:27017/expe_gateway?authSource=admin
REDIS_URL=redis://:expe_redis_pass_2024@localhost:6379
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRY=24h
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port (Windows)
netstat -ano | findstr :4000

# Kill process (Windows - run as admin)
taskkill /PID <PID> /F

# Or change port in docker-compose.yml or service .env file
```

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
docker ps | grep mongodb

# Restart MongoDB
docker-compose restart mongodb

# View MongoDB logs
docker-compose logs mongodb
```

### Redis Connection Issues

```bash
# Check Redis
docker ps | grep redis

# Test Redis connection
docker exec -it expe-redis redis-cli -a expe_redis_pass_2024 ping

# Should return: PONG
```

### Services Not Starting

```bash
# Clean up and rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d

# Check service logs
docker-compose logs <service-name>
```

### Node Modules Issues

```bash
# Clean install
rm -rf node_modules
rm -rf services/*/node_modules
rm -rf frontend/node_modules
rm -rf shared/node_modules

npm run install:all
```

## Production Deployment

### 1. Build for Production

```bash
npm run build
```

### 2. Use Production Docker Compose

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Environment Variables

Set production environment variables:
- Strong JWT_SECRET
- Production database credentials
- HTTPS URLs
- CORS origins
- API keys for external services

### 4. Security Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT secret
- [ ] Enable HTTPS/TLS
- [ ] Configure firewall rules
- [ ] Set up backup strategy
- [ ] Enable MongoDB authentication
- [ ] Use Redis password
- [ ] Configure rate limiting
- [ ] Set up monitoring alerts
- [ ] Review CORS settings

## Monitoring

### Grafana Dashboards

1. Access Grafana: http://localhost:3001
2. Login: admin / expe_grafana_2024
3. Navigate to Dashboards
4. Import dashboards from `monitoring/grafana/dashboards/`

### Prometheus Metrics

Access Prometheus: http://localhost:9090

Key metrics to monitor:
- `http_requests_total` - Total HTTP requests
- `http_request_duration_seconds` - Request latency
- `payments_created_total` - Payments created
- `payments_completed_total` - Payments completed
- `webhook_attempts_total` - Webhook attempts
- `webhook_failures_total` - Webhook failures

## API Documentation

Once services are running, access API documentation:

- Swagger UI: http://localhost:4000/api-docs
- OpenAPI Spec: http://localhost:4000/api-docs.json

## Support

For issues:
1. Check logs: `docker-compose logs -f`
2. Verify all services are running: `docker-compose ps`
3. Check GitHub issues: https://github.com/Mihir-Rabari/fake-pe/issues
4. Review troubleshooting section above

## Next Steps

After successful setup:
1. Create a user account via API or UI
2. Switch to merchant mode
3. Create a project in developer console
4. Generate API keys
5. Test payment flow
6. Configure webhooks
7. Monitor in Grafana

Happy coding! 🚀
