# 💚 FakePE - Mock UPI Payment Gateway

> **The complete mock payment ecosystem for developers.** Test UPI payments, QR codes, webhooks, and payment flows without real money. Beautiful green-themed UI, professional SDK, and realistic UPI experience.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-green.svg)](https://reactjs.org/)

---

## ✨ What Makes FakePE Special?

### Core Payment System
- 💳 **Payment Processing** - Create and manage payment orders
- 📱 **UPI Payments** - Complete UPI flow with VPA, QR codes, and intent-based payments
- 👛 **Digital Wallets** - User wallet system with top-up and transfers
- 🔔 **Webhooks** - Reliable webhook delivery with HMAC signature verification
- 🏢 **Merchant Management** - Multi-tenant merchant accounts with API keys

- 💚 **Beautiful Green Theme** - Modern, eye-catching design inspired by top payment gateways
- 🎨 **Light & Dark Mode** - Seamless switching with perfect contrast in both modes
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ⚡ **Lightning Fast** - Built with Vite for instant hot reload and optimized builds

### For Developers
- 📦 **Professional SDK** - Clean, Razorpay-inspired API
- 🔐 **Webhook System** - HMAC SHA256 signature verification
- 🎯 **Idempotency Support** - Safe retry mechanism
- 📊 **Developer Console** - Manage API keys, view transactions, test webhooks
- 🔧 **Easy Integration** - Drop-in replacement for testing real payment gateways

### For End Users
- 📱 **UPI Mobile App** - Realistic UPI payment experience
- 📸 **QR Code Scanner** - Scan and pay with camera
- 💰 **Digital Wallet** - Top up, transfer, and track balance
- 📊 **Transaction History** - Complete payment tracking
- 🔒 **Secure by Design** - PIN-protected payments

### Infrastructure & Monitoring
- 🐳 **Docker Compose** - One-command infrastructure setup
- 📊 **Prometheus & Grafana** - Real-time metrics and dashboards
- ⚡ **Redis Caching** - Fast response times
- 🔒 **JWT Authentication** - Secure API access

## 🚀 Quick Start

Get FakePE running in 3 minutes! ⚡

### Prerequisites
```bash
Node.js 18+ ✓
Docker & Docker Compose ✓
```

### Step 1: Clone & Setup Infrastructure

```bash
# Clone repository
git clone https://github.com/Mihir-Rabari/fake-pe.git
cd fake-pe

# Start MongoDB & Redis using Docker
docker-compose up -d

# Verify containers are running
docker ps
```

### Step 2: Install Dependencies

```bash
# Backend
cd backend
npm install
cp .env.example .env  # or 'copy .env.example .env' on Windows

# Frontend (Developer Portal)
cd ../frontend
npm install

# Optional: User App (for testing payments)
cd ../user-app
npm install
```

### Step 3: Run Services

Open 3 terminals:

**Terminal 1 - Backend API:**
```bash
cd backend
npm run dev
# ✓ Running on http://localhost:4000
```

**Terminal 2 - Developer Portal:**
```bash
cd frontend
npm run dev
# ✓ Running on http://localhost:3000
```

**Terminal 3 - User App (Optional):**
```bash
cd user-app
npm run dev
# ✓ Running on http://localhost:3001
```

### Step 4: Access Your Services

| Service | URL | Purpose |
|---------|-----|---------|
| 🏠 **Homepage** | http://localhost:3000 | Landing page & registration |
| 💼 **Developer Portal** | http://localhost:3000/dashboard | Manage payments & API keys |
| 📱 **User App** | http://localhost:3001 | Make UPI payments |
| 🔧 **API** | http://localhost:4000 | REST API |
| ❤️ **Health Check** | http://localhost:4000/health | API status |

## 📁 Project Structure

```
fake-pe/
├── backend/                    # 🔧 Node.js API Server
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── models/             # MongoDB schemas
│   │   ├── routes/             # API endpoints
│   │   ├── middleware/         # Auth, validation, etc.
│   │   ├── utils/              # Helpers & utilities
│   │   └── index.js            # Server entry point
│   └── package.json
│
├── frontend/                   # 💼 Developer Portal (React + Vite)
│   ├── src/
│   │   ├── pages/              # React pages
│   │   │   ├── HomePage.jsx           # 💚 Modern landing page
│   │   │   ├── LoginPage.jsx          # Developer login
│   │   │   ├── RegisterPage.jsx       # Merchant registration
│   │   │   ├── Dashboard.jsx          # Main dashboard
│   │   │   ├── DeveloperConsole.jsx   # API keys & settings
│   │   │   └── ...
│   │   ├── components/         # Reusable components
│   │   │   ├── ui/                    # UI components (Button, Input, Card...)
│   │   │   ├── Logo.jsx               # FakePE logo
│   │   │   └── ...
│   │   ├── context/            # React context (Theme, Auth)
│   │   └── App.jsx
│   └── package.json
│
├── user-app/                   # 📱 UPI Mobile App (React + Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── SetupAccount.jsx       # First-time setup
│   │   │   ├── HomePage.jsx           # Wallet dashboard
│   │   │   ├── ScanQRPage.jsx         # QR code scanner
│   │   │   ├── PaymentConfirmPage.jsx # Confirm & pay
│   │   │   └── TransactionHistory.jsx
│   │   └── App.jsx
│   └── package.json
│
├── monitoring/                 # 📊 Observability
│   ├── prometheus.yml          # Metrics config
│   └── grafana/                # Dashboards
│
├── docker-compose.yml          # 🐳 Infrastructure setup
└── README.md                   # 📖 You are here
```

## 🔌 API Endpoints

### Authentication & Users
```http
POST   /api/v1/auth/register         # Register new merchant/user
POST   /api/v1/auth/login            # Login
```

### Payments
```http
POST   /api/v1/payments              # Create payment order
GET    /api/v1/payments/:id          # Get payment details
GET    /api/v1/payments              # List all payments
POST   /api/v1/payments/:id/refund   # Refund a payment
```

### UPI Operations
```http
POST   /api/v1/upi/vpa              # Create UPI VPA
GET    /api/v1/upi/qr/:paymentId    # Generate UPI QR code
POST   /api/v1/upi/initiate         # Start UPI payment
POST   /api/v1/upi/confirm          # Confirm payment with PIN
GET    /api/v1/upi/history/:userId  # Transaction history
```

### Wallet
```http
GET    /api/v1/wallets/:userId      # Get balance
POST   /api/v1/wallets/topup        # Add money
POST   /api/v1/wallets/transfer     # P2P transfer
```

### Merchants & Projects
```http
POST   /api/v1/merchants            # Create merchant account
GET    /api/v1/merchants/:id        # Get merchant details
POST   /api/v1/projects             # Create new project
POST   /api/v1/projects/:id/keys    # Generate API keys
```

### Webhooks
```http
GET    /api/v1/webhooks/attempts    # View webhook delivery logs
POST   /api/v1/admin/replay-webhook/:id  # Retry failed webhooks
```

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

### Backend (Node.js)
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB 7 with Mongoose ODM
- **Cache:** Redis 7 with ioredis
- **Auth:** JWT with bcryptjs
- **Validation:** Joi schemas
- **Security:** Helmet, CORS, Rate limiting
- **Monitoring:** Prometheus + Grafana

### Frontend - Developer Portal (React)
- **Framework:** React 18 with Hooks
- **Build Tool:** ⚡ Vite (Lightning Fast HMR)
- **Styling:** TailwindCSS 3
- **Theme:** 💚 **Custom Green Theme** (Light + Dark Mode)
- **UI Components:** Custom component library
- **Icons:** Lucide React
- **HTTP:** Axios
- **Routing:** React Router v6
- **QR Codes:** qrcode library
- **State:** React Context API

### User App - UPI Mobile (React)
- **Framework:** React 18
- **Build:** Vite
- **Styling:** TailwindCSS (Mobile-first)
- **QR Scanner:** html5-qrcode (Camera integration)
- **Icons:** Lucide React
- **HTTP:** Axios
- **Persistence:** localStorage

### Infrastructure & DevOps
- **Containers:** Docker + Docker Compose
- **Database:** MongoDB 7
- **Cache:** Redis 7
- **Monitoring:** Prometheus metrics
- **Dashboards:** Grafana
- **Process Manager:** PM2 (Production)

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

##⚠️ Important Disclaimer

**FakePE is a MOCK payment system for testing ONLY.**

- 💰 All money is FAKE
- 🧪 Perfect for development & testing
- 🚫 NOT for production use
- 📚 Educational purposes only

**For real payments, use:** Razorpay, Stripe, PayPal, or Square

---

## 🤝 Contributing

We welcome contributions! This is an open-source project built for developers.

```bash
1. Fork the repo
2. Create feature branch: git checkout -b feature/amazing
3. Commit changes: git commit -m 'Add amazing feature'
4. Push: git push origin feature/amazing
5. Open a Pull Request
```

---

## 📞 Support & Community

- 🐛 **Found a bug?** [Open an issue](https://github.com/Mihir-Rabari/fake-pe/issues)
- 💡 **Feature request?** [Start a discussion](https://github.com/Mihir-Rabari/fake-pe/discussions)
- ⭐ **Like the project?** Give us a star!
- 🐦 **Follow updates:** [@MihirRabari](https://github.com/Mihir-Rabari)

---

## 📄 License

MIT License - Free to use, modify, and distribute!

---

## 👨‍💻 Author

**Mihir Rabari**

Built with 💚 for the developer community

---

<div align="center">

### ⭐ Star us on GitHub!

**If FakePE helped you, give it a star to show support!**

[★ Star this repo](https://github.com/Mihir-Rabari/fake-pe) • [Report Bug](https://github.com/Mihir-Rabari/fake-pe/issues) • [Request Feature](https://github.com/Mihir-Rabari/fake-pe/issues)

Made with 💚 by developers, for developers

</div>
