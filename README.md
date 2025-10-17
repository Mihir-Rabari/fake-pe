# FakePay - Mock Payment Gateway (Razorpay-Inspired)

A complete mock payment gateway system with UPI-style payments, professional SDK, user app, webhooks, and merchant management. Perfect for testing and development.

## 🚀 Features

### Core Payment System
- 💳 **Payment Processing** - Create and manage payment orders
- 📱 **UPI Payments** - Complete UPI flow with VPA, QR codes, and intent-based payments
- 👛 **Digital Wallets** - User wallet system with top-up and transfers
- 🔔 **Webhooks** - Reliable webhook delivery with HMAC signature verification
- 🏢 **Merchant Management** - Multi-tenant merchant accounts with API keys

### Developer Tools
- 📦 **Professional SDK** - Razorpay-style Node.js SDK with complete API wrapper
- 📚 **Documentation** - Comprehensive API docs and examples
- 🔐 **Webhook Verification** - HMAC SHA256 signature validation
- 🎯 **Idempotency** - Safe retry mechanism for payment creation

### User Experience
- 📱 **Mobile User App** - UPI-style app for scanning QR codes and confirming payments
- 🎨 **Modern UI** - Beautiful, mobile-first design with TailwindCSS
- 📸 **QR Scanner** - Real-time QR code scanning with camera
- 📊 **Transaction History** - Complete payment tracking and filtering

### Infrastructure
- 📊 **Monitoring** - Prometheus metrics and Grafana dashboards
- ⚡ **Real-time** - WebSocket support for live updates
- 🔒 **Security** - JWT authentication, rate limiting, and input validation

## 🚀 Quick Start

**New to FakePay?** → **[Read the Getting Started Guide](docs/GETTING_STARTED.md)** 📚

### 1. Prerequisites
- Node.js 18+
- Docker & Docker Compose

### 2. Setup

```bash
# Clone the repository
git clone https://github.com/Mihir-Rabari/fake-pe.git
cd fakepay

# Install backend dependencies
cd backend
npm install
copy .env.example .env

# Start infrastructure (MongoDB, Redis, Prometheus, Grafana)
cd ..
docker-compose up -d

# Install frontend dependencies
cd frontend
npm install

# Install user app dependencies
cd ../user-app
npm install

# Install SDK dependencies (for development)
cd ../sdk/nodejs
npm install
```

### 3. Run All Services

```bash
# Terminal 1 - Backend API
cd backend
npm run dev
# Runs on http://localhost:4000

# Terminal 2 - Merchant Frontend
cd frontend
npm run dev
# Runs on http://localhost:3000

# Terminal 3 - User App
cd user-app
npm run dev
# Runs on http://localhost:3001
```

### 4. Quick Test with SDK

```bash
cd sdk/nodejs/examples

# Run basic payment example
node basic-payment.js

# Run UPI payment flow example
node upi-payment.js

# Start webhook server
node webhook-server.js
```

## 📁 Project Structure

```
fakepay/
├── backend/              # Main API server
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   │   ├── paymentController.js
│   │   │   ├── upiController.js      # NEW: UPI operations
│   │   │   └── ...
│   │   ├── models/       # MongoDB models
│   │   │   ├── Payment.js
│   │   │   ├── UpiVpa.js             # NEW: UPI VPA model
│   │   │   ├── UpiTransaction.js     # NEW: UPI transactions
│   │   │   └── ...
│   │   ├── routes/       # API routes
│   │   │   ├── payments.js
│   │   │   ├── upi.js                # NEW: UPI routes
│   │   │   └── ...
│   │   ├── utils/        # Utilities
│   │   │   ├── upi-helper.js         # NEW: UPI utilities
│   │   │   ├── webhook-signature.js  # NEW: Webhook verification
│   │   │   └── ...
│   │   └── index.js      # Main server
│   └── package.json
│
├── frontend/             # Merchant dashboard (React)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── PaymentPage.jsx       # Customer payment page
│   │   │   ├── MerchantDashboard.jsx
│   │   │   └── ...
│   │   └── ...
│   └── package.json
│
├── user-app/             # NEW: User UPI App (React)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── SetupAccount.jsx      # Account creation
│   │   │   ├── HomePage.jsx          # Dashboard with balance
│   │   │   ├── ScanQRPage.jsx        # QR code scanner
│   │   │   ├── PaymentConfirmPage.jsx # Payment confirmation
│   │   │   ├── TransactionHistory.jsx
│   │   │   └── ProfilePage.jsx
│   │   └── App.jsx
│   └── package.json
│
├── sdk/                  # NEW: Official SDKs
│   └── nodejs/           # Node.js SDK
│       ├── lib/
│       │   └── index.js  # SDK implementation
│       ├── examples/     # Usage examples
│       │   ├── basic-payment.js
│       │   ├── upi-payment.js
│       │   └── webhook-server.js
│       ├── README.md     # SDK documentation
│       └── package.json
│
├── docs/                 # NEW: Documentation
│   └── API_DOCUMENTATION.md
│
├── monitoring/           # Prometheus & Grafana configs
├── docker-compose.yml    # Infrastructure setup
└── README.md             # This file
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login

### Payments
- `POST /api/v1/payments` - Create payment
- `GET /api/v1/payments/:id` - Get payment details
- `GET /api/v1/payments` - List payments
- `POST /api/v1/payments/:id/complete` - Complete payment (wallet-based)
- `POST /api/v1/payments/:id/refund` - Refund payment

### UPI (NEW)
- `POST /api/v1/upi/vpa` - Create UPI VPA
- `GET /api/v1/upi/vpa/:userId` - Get user's VPAs
- `GET /api/v1/upi/qr/:paymentId` - Generate UPI QR code
- `POST /api/v1/upi/initiate` - Initiate UPI payment
- `POST /api/v1/upi/confirm` - Confirm UPI payment
- `GET /api/v1/upi/transaction/:txnId` - Get UPI transaction
- `GET /api/v1/upi/history/:userId` - Get transaction history

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

**📚 Full API Documentation:** See [`docs/API_DOCUMENTATION.md`](docs/API_DOCUMENTATION.md)

---

## 🎯 Complete Payment Flow Example

### Step 1: Merchant Creates Payment (Using SDK)

```javascript
const FakePay = require('@fakepay/sdk');

const fakepay = new FakePay({
  key_id: 'your_key_id',
  key_secret: 'your_key_secret'
});

// Create payment order
const payment = await fakepay.payments.create({
  merchantId: 'mer_123',
  amount: 50000, // ₹500 (in paise)
  orderId: 'order_001',
  callbackUrl: 'https://yoursite.com/webhook'
});

console.log('Payment URL:', payment.paymentUrl);
console.log('QR Code:', payment.qrData); // Show this to customer
```

### Step 2: Customer Scans & Pays (User App)

1. Customer opens **FakePay User App** (`http://localhost:3001`)
2. Clicks "Scan & Pay"
3. Scans merchant's QR code
4. Reviews payment details (₹500)
5. Clicks "Proceed to Pay"
6. Enters UPI PIN (any 4-6 digits)
7. Clicks "Pay Securely"
8. ✅ Payment complete!

### Step 3: Merchant Receives Webhook

```javascript
app.post('/webhook', (req, res) => {
  // Verify signature
  const signature = req.headers['x-fakepay-signature'];
  
  if (!fakepay.webhooks.verify(req.body, signature)) {
    return res.status(400).send('Invalid signature');
  }

  // Process webhook
  const { event, data } = req.body;
  
  if (event === 'payment.completed') {
    console.log('Payment received:', data.paymentId);
    // Update order status
    // Send confirmation email
    // Trigger fulfillment
  }

  res.status(200).send('OK');
});
```

---

## 📦 Using the SDK

### Installation

```bash
npm install @fakepay/sdk
```

### Basic Usage

```javascript
const FakePay = require('@fakepay/sdk');

const fakepay = new FakePay({
  key_id: 'your_key_id',
  key_secret: 'your_key_secret',
  baseUrl: 'http://localhost:4000' // Optional
});

// Create payment
const payment = await fakepay.payments.create({
  merchantId: 'mer_123',
  amount: 50000,
  orderId: 'order_001'
});

// Get payment status
const status = await fakepay.payments.fetch(payment.paymentId);

// Refund payment
await fakepay.payments.refund(payment.paymentId, {
  amount: 25000,
  reason: 'Customer request'
});
```

### UPI Operations

```javascript
// Create UPI VPA
await fakepay.upi.createVpa({
  userId: 'usr_123',
  vpa: 'user@fakepay'
});

// Generate UPI QR
const qr = await fakepay.upi.generateQr(paymentId);
console.log('UPI Intent:', qr.upiIntent);
console.log('QR Code:', qr.qrCodeData);

// Get transaction history
const history = await fakepay.upi.getHistory('usr_123', { limit: 20 });
```

**📚 Complete SDK docs:** See [`sdk/nodejs/README.md`](sdk/nodejs/README.md)

---

## 📱 Using the User App

### First-Time Setup

1. Navigate to `http://localhost:3001`
2. You'll see the account setup screen
3. Fill in your details:
   - **Name**: Your full name
   - **Phone**: 10-digit number
   - **Email**: Your email
   - **UPI ID**: Choose unique ID (e.g., `john@fakepay`)
   - **Initial Balance**: Select amount (fake money)
4. Click "Create Account"

### Making Your First Payment

1. On home screen, click **"Scan & Pay"**
2. Allow camera access when prompted
3. Point camera at merchant's QR code
4. Payment details appear - review them
5. Click **"Proceed to Pay"**
6. Enter any 4-6 digit PIN (e.g., `1234`)
7. Click **"Pay Securely"**
8. ✅ Success! Payment complete

### Managing Your Wallet

- **View Balance**: Home screen shows current balance
- **Add Money**: Profile → "Add Money" → Select amount
- **Transaction History**: Click "History" tab to see all payments
- **Filter Transactions**: Use All/Sent/Received filters

**📚 User App docs:** See [`user-app/README.md`](user-app/README.md)

---

## 🔧 Environment Variables

### Backend (`backend/.env`)
```env
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://admin:expe_secure_pass_2024@localhost:27017/expe_gateway?authSource=admin
REDIS_URL=redis://:expe_redis_pass_2024@localhost:6379
JWT_SECRET=your_jwt_secret_change_this
JWT_EXPIRY=24h
FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:4000
```

### User App (`user-app/.env`)
```env
VITE_API_URL=http://localhost:4000
```

---

## 📊 Monitoring & Services

| Service | URL | Credentials |
|---------|-----|-------------|
| **Backend API** | http://localhost:4000 | - |
| **Merchant Frontend** | http://localhost:3000 | Create account |
| **User App** | http://localhost:3001 | Create account |
| **API Health** | http://localhost:4000/health | - |
| **Prometheus** | http://localhost:9090 | - |
| **Grafana** | http://localhost:3001 | admin / expe_grafana_2024 |
| **API Metrics** | http://localhost:4000/metrics | - |

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Cache/Queue**: Redis with ioredis
- **Real-time**: Socket.IO
- **Authentication**: JWT with bcryptjs
- **Validation**: Joi schemas
- **Monitoring**: Prometheus + Grafana
- **Process Manager**: PM2
- **Security**: Helmet, CORS, Rate limiting

### Merchant Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **UI Components**: Radix UI, shadcn/ui
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **QR Codes**: qrcode library

### User App (UPI Style)
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS (mobile-first)
- **QR Scanner**: html5-qrcode
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State**: localStorage for persistence

### SDK
- **Language**: Node.js (CommonJS)
- **HTTP Client**: Axios
- **Crypto**: Built-in crypto module
- **Structure**: Razorpay-inspired class-based API

### Infrastructure
- **Containerization**: Docker Compose
- **Database**: MongoDB 7
- **Cache**: Redis 7
- **Monitoring**: Prometheus + Grafana

---

## 🔍 Troubleshooting

### Backend won't start

```bash
# Check if MongoDB and Redis are running
docker ps

# If not, start them
docker-compose up -d mongodb redis

# Check backend logs
cd backend
npm run dev
```

### User app camera not working

- Grant camera permissions in browser settings
- Use HTTPS in production (HTTP works on localhost)
- Try uploading QR image instead

### Webhook signature verification fails

```javascript
// Make sure you're using the correct secret
const fakepay = new FakePay({
  key_secret: 'same_secret_as_backend'
});

// Verify with raw body (not parsed JSON)
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));
```

### Payment stuck in PENDING

- Check if user has sufficient balance
- Verify VPA exists and is active
- Check backend logs for errors
- Ensure webhook worker is running

---

## 📝 Testing Guide

### 1. Test Payment Creation

```bash
cd sdk/nodejs/examples
node basic-payment.js
```

### 2. Test Complete UPI Flow

```bash
node upi-payment.js
```

This will:
- Create user and VPA
- Top up wallet
- Create payment
- Generate QR code
- Initiate UPI payment
- Confirm payment
- Verify completion

### 3. Test Webhooks

```bash
# Terminal 1 - Start webhook server
node webhook-server.js

# Terminal 2 - Create test payment
curl -X POST http://localhost:3000/create-test-payment
```

---

## 🚀 Deployment (Production)

### Environment Variables

Update production values:

```env
NODE_ENV=production
MONGO_URI=your_production_mongodb_uri
REDIS_URL=your_production_redis_url
JWT_SECRET=strong_random_secret_generate_new_one
FRONTEND_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com,https://app.yourdomain.com
```

### Security Checklist

- ✅ Change all default passwords
- ✅ Use strong JWT secret
- ✅ Enable HTTPS for all services
- ✅ Configure CORS properly
- ✅ Set up rate limiting
- ✅ Enable MongoDB authentication
- ✅ Use Redis password
- ✅ Implement API key rotation
- ✅ Monitor webhook delivery
- ✅ Set up error logging

---

## 📚 Documentation

- **[API Documentation](docs/API_DOCUMENTATION.md)** - Complete API reference
- **[SDK Documentation](sdk/nodejs/README.md)** - Node.js SDK guide
- **[User App Guide](user-app/README.md)** - Mobile app documentation
- **[Examples](sdk/nodejs/examples/)** - Code examples

---

## 🤝 Contributing

This is a mock payment system for testing purposes. Contributions welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## ⚠️ Disclaimer

**This is a MOCK payment system for testing and development only.**

- 💰 All money is fake
- 🔒 Not suitable for production payment processing
- 🧪 Designed for testing integrations
- 📚 Educational purposes

For real payment processing, use established providers like:
- Razorpay
- Stripe
- PayPal
- Square

---

## 🌟 Features Comparison

| Feature | FakePay | Razorpay |
|---------|---------|----------|
| Mock Payments | ✅ | ❌ |
| Real Payments | ❌ | ✅ |
| UPI Support | ✅ | ✅ |
| QR Codes | ✅ | ✅ |
| Webhooks | ✅ | ✅ |
| SDK | ✅ | ✅ |
| User App | ✅ | ❌ |
| Free Testing | ✅ | Limited |
| Open Source | ✅ | ❌ |

---

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/Mihir-Rabari/fake-pe/issues)
- **Documentation**: Check docs folder
- **Examples**: See sdk/nodejs/examples

---

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Mihir Rabari**

Built with ❤️ for the developer community

---

**⭐ Star this repo if you find it useful!**
