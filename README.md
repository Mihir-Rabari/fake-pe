# 💚 FakePE - Mock Payment Gateway

> **Beautiful mock payment system for developers.** Test payment integrations, webhooks, and UPI flows without real money. Modern UI with perfect light/dark mode support.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-green.svg)](https://reactjs.org/)

---

## 🎯 What is FakePE?

FakePE is a **complete mock payment gateway** that simulates real payment flows. Perfect for:
- 🧪 Testing payment integrations
- 📚 Learning payment gateway architecture
- 🎨 Demos and presentations
- 🚀 Development without production APIs

---

## ✨ Features

### 🎨 Beautiful UI
- 💚 **Modern Green Theme** - Eye-catching design inspired by top payment gateways
- 🌓 **Perfect Light/Dark Mode** - Seamless switching with proper contrast
- 📱 **Fully Responsive** - Mobile-first design
- ⚡ **Lightning Fast** - Built with Vite for instant HMR

### 💳 Payment System
- 💰 **Payment Orders** - Create, track, and manage payments
- 📱 **UPI Integration** - Full UPI flow with QR codes
- 👛 **Digital Wallets** - User balance management
- 🔄 **Refunds** - Complete refund workflow
- 📊 **Transaction History** - Full payment tracking

### 🔧 Developer Tools
- 🔑 **API Keys** - Generate and manage test API keys
- 🎯 **Developer Console** - Beautiful dashboard for developers
- 🔔 **Webhooks** - HMAC-verified webhook delivery
- 📊 **Analytics** - Payment statistics and metrics
- 🏢 **Multi-tenant** - Multiple merchant accounts

### 🔒 Security & Infrastructure
- 🔐 **JWT Authentication** - Secure API access
- 🛡️ **CORS Protection** - Configurable origins
- 🚦 **Rate Limiting** - Prevent abuse
- 🐳 **Docker Ready** - One-command infrastructure
- 📊 **Monitoring** - Prometheus + Grafana metrics

---

## 🚀 Quick Start

### Prerequisites
```bash
✓ Node.js 18+
✓ Docker & Docker Compose
✓ 10 minutes of your time ⏰
```

### 1️⃣ Clone & Setup Infrastructure

```bash
# Clone the repository
git clone https://github.com/Mihir-Rabari/fake-pe.git
cd fake-pe

# Start MongoDB & Redis
docker-compose up -d

# Verify containers are running
docker ps
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install

# Create environment file
cp .env.example .env   # Linux/Mac
# OR
copy .env.example .env  # Windows

# Start backend server
npm run dev
# ✓ Backend running on http://localhost:4000
```

### 3️⃣ Setup Frontend

```bash
# Open new terminal
cd frontend
npm install

# Start development server
npm run dev
# ✓ Frontend running on http://localhost:3000
```

### 4️⃣ Access the Application

Open your browser:
- 🏠 **Homepage**: http://localhost:3000
- 💼 **Register**: http://localhost:3000/register (Create merchant account)
- 🔑 **Login**: http://localhost:3000/login
- 📊 **Dashboard**: http://localhost:3000/dashboard
- ❤️ **API Health**: http://localhost:4000/health

---

## 📁 Project Structure

```
fake-pe/
│
├── backend/                    # 🔧 Node.js API Server
│   ├── src/
│   │   ├── controllers/        # Route handlers
│   │   ├── models/             # MongoDB schemas
│   │   ├── routes/             # API endpoints
│   │   ├── middleware/         # Auth, validation, etc.
│   │   ├── utils/              # Helpers
│   │   └── index.js            # Server entry point
│   ├── .env.example            # Environment template
│   └── package.json
│
├── frontend/                   # 💼 Developer Portal (React)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── pages/              # React pages
│   │   │   ├── HomePage.jsx           # 💚 Landing page
│   │   │   ├── LoginPage.jsx          # Login
│   │   │   ├── RegisterPage.jsx       # Sign up
│   │   │   ├── Dashboard.jsx          # Main dashboard
│   │   │   ├── DeveloperConsole.jsx   # API keys
│   │   │   ├── PaymentPage.jsx        # Customer payment
│   │   │   └── ...
│   │   ├── components/         # Reusable components
│   │   │   ├── ui/                    # Button, Input, Card...
│   │   │   ├── Logo.jsx               # FakePE logo
│   │   │   ├── Navbar.jsx
│   │   │   └── ...
│   │   ├── context/            # React Context
│   │   │   └── ThemeContext.jsx       # 🌓 Light/Dark mode
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── monitoring/                 # 📊 Observability
│   ├── prometheus.yml          # Metrics config
│   └── grafana/                # Dashboards
│
├── docker-compose.yml          # 🐳 Infrastructure
├── .gitignore
├── LICENSE
└── README.md                   # 📖 You are here
```

---

## 🔌 API Endpoints

### Authentication
```http
POST   /api/v1/auth/register    # Register merchant account
POST   /api/v1/auth/login       # Login
```

### Payments
```http
POST   /api/v1/payments         # Create payment order
GET    /api/v1/payments/:id     # Get payment details
GET    /api/v1/payments         # List payments
POST   /api/v1/payments/:id/refund  # Refund payment
```

### UPI
```http
POST   /api/v1/upi/vpa          # Create UPI VPA
GET    /api/v1/upi/qr/:id       # Generate QR code
POST   /api/v1/upi/initiate     # Start payment
POST   /api/v1/upi/confirm      # Confirm with PIN
GET    /api/v1/upi/history/:userId  # Transaction history
```

### Wallets
```http
GET    /api/v1/wallets/:userId  # Get balance
POST   /api/v1/wallets/topup    # Add money
POST   /api/v1/wallets/transfer # P2P transfer
```

### Merchants
```http
POST   /api/v1/merchants        # Create merchant
GET    /api/v1/merchants/:id    # Get details
GET    /api/v1/merchants/:id/stats  # Get statistics
```

### Projects & API Keys
```http
POST   /api/v1/projects         # Create project
GET    /api/v1/projects         # List projects
POST   /api/v1/projects/:id/keys  # Generate API key
GET    /api/v1/projects/:id/keys  # List API keys
```

### Webhooks
```http
GET    /api/v1/webhooks/attempts  # View delivery logs
POST   /api/v1/admin/replay-webhook/:id  # Retry webhook
```

---

## 🎯 Complete Payment Flow

### Step 1: Register as Merchant

1. Go to http://localhost:3000
2. Click "Get Started" or "Sign Up"
3. Fill in merchant details
4. Login to dashboard

### Step 2: Create API Keys

1. Go to **Developer Console**
2. Create a new project
3. Generate API key pair (key_id + key_secret)
4. Copy and save securely

### Step 3: Create Payment (via API)

```bash
curl -X POST http://localhost:4000/api/v1/payments \
  -H "Content-Type: application/json" \
  -u "YOUR_KEY_ID:YOUR_KEY_SECRET" \
  -d '{
    "merchantId": "mer_xxx",
    "amount": 50000,
    "currency": "INR",
    "orderId": "order_001",
    "callbackUrl": "https://your-site.com/webhook"
  }'
```

Response:
```json
{
  "success": true,
  "payment": {
    "paymentId": "pay_xxx",
    "amount": 50000,
    "status": "CREATED",
    "paymentUrl": "http://localhost:3000/pay/pay_xxx",
    "qrData": "data:image/png;base64,..."
  }
}
```

### Step 4: Customer Pays

Customer visits the `paymentUrl` or scans QR code with **FakePE User App** ([separate repository](https://github.com/Mihir-Rabari/fakePE-user-app))

### Step 5: Receive Webhook

```javascript
// Your webhook endpoint
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-fakepe-signature'];
  
  // Verify signature (HMAC SHA256)
  if (verifySignature(req.body, signature, YOUR_SECRET)) {
    const { event, data } = req.body;
    
    if (event === 'payment.completed') {
      console.log('✅ Payment completed:', data.paymentId);
      // Update order, send email, etc.
    }
  }
  
  res.status(200).send('OK');
});
```

---

## 🔧 Environment Variables

### Backend (`.env`)
```env
NODE_ENV=development
PORT=4000

# Database
MONGO_URI=mongodb://admin:expe_secure_pass_2024@localhost:27017/expe_gateway?authSource=admin

# Redis
REDIS_URL=redis://:expe_redis_pass_2024@localhost:6379

# Security
JWT_SECRET=your_jwt_secret_change_this_in_production
JWT_EXPIRY=24h

# CORS
FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Webhooks
WEBHOOK_SECRET=your_webhook_secret_for_signature_verification
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:4000
```

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB 7 + Mongoose ODM
- **Cache:** Redis 7 + ioredis
- **Auth:** JWT (jsonwebtoken + bcryptjs)
- **Validation:** Joi
- **Security:** Helmet, CORS, express-rate-limit
- **Monitoring:** Prometheus client
- **Process:** PM2 (production)

### Frontend
- **Framework:** React 18 with Hooks
- **Build:** ⚡ Vite 4 (Lightning fast HMR)
- **Language:** JavaScript + JSX
- **Styling:** TailwindCSS 3
- **Theme:** 💚 **Custom Green Theme** (Light/Dark mode)
- **UI Library:** Custom components
- **Icons:** Lucide React
- **HTTP:** Axios
- **Routing:** React Router v6
- **QR Codes:** qrcode.react
- **State:** React Context API

### Infrastructure
- **Containers:** Docker + Docker Compose
- **Database:** MongoDB 7
- **Cache:** Redis 7
- **Metrics:** Prometheus
- **Dashboards:** Grafana
- **Reverse Proxy:** Nginx (production)

---

## 📊 Available Services

| Service | URL | Credentials |
|---------|-----|-------------|
| 🏠 **Homepage** | http://localhost:3000 | - |
| 💼 **Dashboard** | http://localhost:3000/dashboard | Login required |
| 🔧 **API** | http://localhost:4000 | API keys |
| ❤️ **Health Check** | http://localhost:4000/health | - |
| 📊 **Metrics** | http://localhost:4000/metrics | - |
| 📈 **Prometheus** | http://localhost:9090 | - |
| 📊 **Grafana** | http://localhost:3001 | admin / expe_grafana_2024 |

---

## 🔍 Troubleshooting

### Backend won't start

```bash
# Check if containers are running
docker ps

# If not, start them
docker-compose up -d

# Check backend logs
cd backend
npm run dev
```

### Frontend build errors

```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json  # or rmdir /s node_modules on Windows
npm install
```

### Database connection failed

```bash
# Check MongoDB is running
docker ps | grep mongo

# Check environment variables
cat backend/.env  # Linux/Mac
type backend\.env  # Windows

# Verify connection string format
MONGO_URI=mongodb://admin:password@localhost:27017/expe_gateway?authSource=admin
```

### Port already in use

```bash
# Find process using port 4000
lsof -i :4000  # Linux/Mac
netstat -ano | findstr :4000  # Windows

# Kill the process or change PORT in .env
```

---

## 🚀 Production Deployment

### Security Checklist

- ✅ Change **all** default passwords
- ✅ Use strong JWT secret (generate with `openssl rand -base64 32`)
- ✅ Enable HTTPS (use Let's Encrypt)
- ✅ Configure CORS properly
- ✅ Enable rate limiting
- ✅ Use MongoDB authentication
- ✅ Use Redis password
- ✅ Set up API key rotation
- ✅ Monitor webhook delivery
- ✅ Set up error logging (Sentry, etc.)
- ✅ Use PM2 for process management
- ✅ Set up automated backups

### Environment Variables (Production)

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
REDIS_URL=rediss://user:pass@redis-host:6380
JWT_SECRET=<generate-strong-secret>
FRONTEND_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com
```

---

## 📱 Related Projects

### FakePE User App (Separate Repository)
The **UPI Mobile App** for end-users to scan QR codes and make payments.

🔗 **Repository:** [github.com/Mihir-Rabari/fakePE-user-app](https://github.com/Mihir-Rabari/fakePE-user-app)

Features:
- 📱 Mobile-first UPI interface
- 📸 QR code scanner
- 💰 Digital wallet
- 📊 Transaction history
- 🔒 PIN-protected payments

### FakePE SDK (Separate Repository)
Official **Node.js SDK** for easy integration.

🔗 **Repository:** [github.com/Mihir-Rabari/fakePE-sdk](https://github.com/Mihir-Rabari/fakePE-sdk)

Features:
- 📦 Razorpay-inspired API
- 🔐 Automatic authentication
- 🎯 Idempotency support
- 🔔 Webhook verification helpers

---

## ⚠️ Important Disclaimer

**FakePE is a MOCK payment system for TESTING and DEVELOPMENT only.**

- 💰 All money is FAKE
- 🧪 Perfect for development & testing
- 🚫 NOT suitable for production
- 📚 Educational purposes only
- 🎓 Learn payment gateway architecture

**For real payments, use established providers:**
- [Razorpay](https://razorpay.com)
- [Stripe](https://stripe.com)
- [PayPal](https://paypal.com)
- [Square](https://square.com)

---

## 🤝 Contributing

We love contributions! Whether it's bug fixes, new features, or documentation improvements.

```bash
1. Fork the repository
2. Create a feature branch: git checkout -b feature/amazing
3. Make your changes
4. Commit: git commit -m 'Add amazing feature'
5. Push: git push origin feature/amazing
6. Open a Pull Request
```

### Development Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Test in both light and dark mode
- Keep the green theme consistent! 💚

---

## 📞 Support & Community

- 🐛 **Bug reports:** [GitHub Issues](https://github.com/Mihir-Rabari/fake-pe/issues)
- 💡 **Feature requests:** [GitHub Discussions](https://github.com/Mihir-Rabari/fake-pe/discussions)
- ⭐ **Like the project?** Give us a star!
- 🔗 **Follow:** [@MihirRabari](https://github.com/Mihir-Rabari)

---

## 📄 License

MIT License - Free to use, modify, and distribute!

See [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Mihir Rabari**

Built with 💚 for the developer community

---

<div align="center">

### ⭐ Star us on GitHub!

**If FakePE helped you test payments, give it a star to show support!**

[★ Star this repo](https://github.com/Mihir-Rabari/fake-pe) • [Report Bug](https://github.com/Mihir-Rabari/fake-pe/issues) • [Request Feature](https://github.com/Mihir-Rabari/fake-pe/discussions)

Made with 💚 by developers, for developers

</div>
