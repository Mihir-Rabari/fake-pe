# Expe - Payment Gateway BaaS

A comprehensive, production-ready payment gateway platform similar to UPI/Google Pay, built with microservice architecture.

## Features

- 🚀 **Complete Payment Flow**: UPI-style payment processing with QR codes
- 💼 **Merchant Portal**: Developer console with API key management
- 👤 **User Wallets**: Test wallet system with top-up functionality
- 🔄 **P2P Payments**: Person-to-person transfer support
- 🔔 **Webhooks**: Reliable webhook delivery with retry logic
- ⚡ **Real-time Updates**: WebSocket-based live payment notifications
- 🔒 **Security**: HMAC signing, rate limiting, distributed locks
- 📊 **Monitoring**: Prometheus metrics & Grafana dashboards
- 🎨 **Modern UI**: Clean, minimal, professional interface

## Architecture

### Microservices
- **API Gateway**: Main entry point, routing, rate limiting
- **Auth Service**: JWT-based authentication & authorization
- **Payment Service**: Core payment processing with Redis locks
- **Webhook Service**: Background worker for webhook delivery
- **Merchant Service**: Developer portal and project management

### Infrastructure
- **MongoDB**: Primary data store (payments, merchants, wallets)
- **Redis**: Distributed locks, queues, caching, rate limiting
- **Prometheus**: Metrics collection
- **Grafana**: Monitoring dashboards
- **Docker**: Containerized deployment

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Git

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Mihir-Rabari/fake-pe.git
cd fake-pe
```

2. Start infrastructure services:
```bash
docker-compose up -d
```

3. Install dependencies:
```bash
npm run install:all
```

4. Start all services:
```bash
npm run dev
```

### Access Points

- **Landing Page**: http://localhost:3000
- **Merchant Dashboard**: http://localhost:3000/dashboard
- **Developer Console**: http://localhost:3000/developer
- **API Gateway**: http://localhost:4000
- **Grafana**: http://localhost:3001 (admin/admin)
- **Prometheus**: http://localhost:9090

## API Documentation

### Authentication
All merchant API calls require authentication via API key or JWT token.

### Create Payment
```bash
POST /api/v1/payments
Headers: 
  - Authorization: Bearer <token>
  - Idempotency-Key: <unique-key>
Body:
{
  "amount": 250,
  "orderId": "order-123",
  "callbackUrl": "https://merchant.example/webhook",
  "metadata": {}
}
```

### Complete Payment
```bash
POST /api/v1/payments/:paymentId/complete
Body:
{
  "payer": "user_id",
  "method": "wallet"
}
```

See full API documentation at `/docs` endpoint.

## Development

### Project Structure
```
├── services/
│   ├── api-gateway/       # Main API gateway
│   ├── auth-service/      # Authentication service
│   ├── payment-service/   # Payment processing
│   ├── webhook-service/   # Webhook worker
│   └── merchant-service/  # Merchant portal APIs
├── frontend/              # React frontend
│   ├── landing/          # Landing page
│   ├── dashboard/        # User/Merchant dashboard
│   └── payment/          # Payment page UI
├── shared/               # Shared utilities & types
├── docker-compose.yml    # Infrastructure setup
└── monitoring/           # Prometheus & Grafana configs
```

### Running Tests
```bash
npm test                  # Run all tests
npm run test:unit        # Unit tests only
npm run test:integration # Integration tests
```

### Building for Production
```bash
npm run build
docker-compose -f docker-compose.prod.yml up -d
```

## Security

- All API communications use HTTPS in production
- Webhook payloads signed with HMAC-SHA256
- Rate limiting on all endpoints
- Distributed locks prevent double-processing
- Input validation on all requests
- Secrets managed via environment variables

## Monitoring

Access Grafana dashboards to monitor:
- Payment success/failure rates
- Webhook delivery metrics
- API latency and throughput
- Queue backlogs
- System resource usage

## License

MIT License - see LICENSE file for details

## Contributing

Contributions welcome! Please read CONTRIBUTING.md first.

## Support

For issues and questions, please open a GitHub issue.
