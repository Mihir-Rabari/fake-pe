# FakePay - Payment Gateway

A complete payment gateway backend with UPI-style payments, wallets, webhooks, and merchant management.

## Features

- 💳 **Payment Processing** - Create and manage payments
- 👛 **Digital Wallets** - User wallet system with top-up and transfers
- 🔔 **Webhooks** - Reliable webhook delivery with retries
- 🏢 **Merchant Management** - Multi-tenant merchant accounts
- 🔐 **Authentication** - JWT-based auth with role-based access
- 📊 **Monitoring** - Prometheus metrics and Grafana dashboards
- ⚡ **Real-time** - WebSocket support for live updates

## Quick Start

### 1. Prerequisites
- Node.js 18+
- Docker & Docker Compose

### 2. Setup

```bash
# Install backend dependencies
cd backend
npm install

# Create environment file
copy .env.example .env

# Start infrastructure
cd ..
docker-compose up -d mongodb redis prometheus grafana

# Install frontend dependencies
cd frontend
npm install
```

### 3. Run

```bash
# Start backend (from root)
npm run dev

# Backend runs on http://localhost:4000
# Frontend runs on http://localhost:3000
```

## Project Structure

```
fakepay/
├── backend/              # Consolidated backend
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Express middleware
│   │   ├── utils/        # Utilities (crypto, logger, etc.)
│   │   ├── workers/      # Background workers (webhooks)
│   │   └── index.js      # Main server
│   └── package.json
├── frontend/             # React frontend
├── monitoring/           # Prometheus & Grafana configs
└── docker-compose.yml    # Infrastructure setup
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login

### Payments
- `POST /api/v1/payments` - Create payment
- `GET /api/v1/payments/:id` - Get payment details
- `POST /api/v1/payments/:id/complete` - Complete payment

### Wallets
- `GET /api/v1/wallets/:userId` - Get wallet balance
- `POST /api/v1/wallets/topup` - Add funds
- `POST /api/v1/wallets/transfer` - Transfer funds

### Merchants
- `POST /api/v1/merchants` - Create merchant
- `GET /api/v1/merchants/:id` - Get merchant details

### Projects & API Keys
- `POST /api/v1/projects` - Create project
- `POST /api/v1/projects/:id/keys` - Generate API key

### Webhooks
- `GET /api/v1/webhooks/attempts` - Get webhook attempts

### Admin
- `POST /api/v1/admin/replay-webhook/:paymentId` - Replay webhook

## Environment Variables

```env
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://admin:expe_secure_pass_2024@localhost:27017/expe_gateway?authSource=admin
REDIS_URL=redis://:expe_redis_pass_2024@localhost:6379
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=24h
FRONTEND_URL=http://localhost:3000
```

## Monitoring

- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001 (admin/expe_grafana_2024)
- **Metrics**: http://localhost:4000/metrics

## Tech Stack

- **Backend**: Node.js, Express, Socket.IO
- **Database**: MongoDB
- **Cache/Queue**: Redis
- **Frontend**: React, Vite, TailwindCSS
- **Monitoring**: Prometheus, Grafana
- **Process Manager**: PM2

## License

MIT

## Author

Mihir Rabari
