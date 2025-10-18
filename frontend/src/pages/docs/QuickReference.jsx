import React from 'react';
import { Server, Code, Terminal, Zap, AlertCircle, ExternalLink, CheckCircle } from 'lucide-react';
import CodeBlockCard from '../../components/docs/CodeBlockCard';

export default function QuickReference() {
  return (
    <div className="max-w-none space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Quick Reference</h1>
        <p className="text-xl text-gray-600">
          Quick command reference and code snippets for FakePE.
        </p>
      </div>

      {/* Service URLs */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Server className="w-6 h-6 text-blue-600" />
          Service URLs
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-blue-200 rounded-lg p-4 hover:shadow-md transition">
            <p className="font-semibold text-blue-900 mb-2">Backend API</p>
            <code className="text-sm text-blue-700 bg-blue-50 px-3 py-1 rounded">http://localhost:4000</code>
          </div>
          <div className="bg-white border border-green-200 rounded-lg p-4 hover:shadow-md transition">
            <p className="font-semibold text-green-900 mb-2">Merchant Dashboard</p>
            <code className="text-sm text-green-700 bg-green-50 px-3 py-1 rounded">http://localhost:3000</code>
          </div>
          <div className="bg-white border border-purple-200 rounded-lg p-4 hover:shadow-md transition">
            <p className="font-semibold text-purple-900 mb-2">User App</p>
            <code className="text-sm text-purple-700 bg-purple-50 px-3 py-1 rounded">http://localhost:3001</code>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <p className="font-semibold text-gray-900 mb-2">API Health</p>
            <code className="text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded">http://localhost:4000/health</code>
          </div>
        </div>
      </div>

      {/* SDK Quick Examples */}
      <div className="border-l-4 border-purple-500 pl-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">SDK Quick Examples</h2>

        <div className="space-y-6">
          {/* Initialize */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Initialize SDK</h3>
            <CodeBlockCard
              language="javascript"
              title="Quick Setup"
              code={`const FakePE = require('fakepe-sdk');

const fakepe = new FakePE({
  key_id: 'your_key',
  key_secret: 'your_secret'
});`}
            />
          </div>

          {/* Create Payment */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Payment</h3>
            <CodeBlockCard
              language="javascript"
              title="One-liner Payment"
              code={`const payment = await fakepe.payments.create({
  merchantId: 'mer_123',
  amount: 50000, // ₹500 in paise
  orderId: 'order_001'
});`}
            />
          </div>

          {/* Get Status */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Payment Status</h3>
            <CodeBlockCard
              language="javascript"
              code={`const status = await fakepe.payments.fetch('pay_xyz');`}
            />
          </div>

          {/* Generate QR */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate QR Code</h3>
            <CodeBlockCard
              language="javascript"
              code={`const qr = await fakepe.upi.generateQr('pay_xyz');
console.log(qr.upiIntent);
console.log(qr.qrCodeData);`}
            />
          </div>

          {/* Verify Webhook */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Verify Webhook</h3>
            <CodeBlockCard
              language="javascript"
              title="Webhook Handler"
              code={`app.post('/webhook', (req, res) => {
  const signature = req.headers['x-fakepe-signature'];
  
  if (!fakepe.webhooks.verify(req.body, signature)) {
    return res.status(400).send('Invalid');
  }
  
  // Process webhook
  res.status(200).send('OK');
});`}
            />
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">API Endpoints</h2>

        {/* Payments */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Payments</h3>
          <div className="space-y-2">
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg flex items-center gap-3">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-mono font-bold">POST</span>
              <code className="text-gray-800">/api/v1/payments</code>
              <span className="text-gray-600 ml-auto text-sm">Create payment</span>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex items-center gap-3">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded font-mono font-bold">GET</span>
              <code className="text-gray-800">/api/v1/payments/:id</code>
              <span className="text-gray-600 ml-auto text-sm">Get payment</span>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex items-center gap-3">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded font-mono font-bold">GET</span>
              <code className="text-gray-800">/api/v1/payments</code>
              <span className="text-gray-600 ml-auto text-sm">List payments</span>
            </div>
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg flex items-center gap-3">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-mono font-bold">POST</span>
              <code className="text-gray-800">/api/v1/payments/:id/refund</code>
              <span className="text-gray-600 ml-auto text-sm">Refund</span>
            </div>
          </div>
        </div>

        {/* UPI */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">UPI</h3>
          <div className="space-y-2">
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg flex items-center gap-3">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-mono font-bold">POST</span>
              <code className="text-gray-800">/api/v1/upi/vpa</code>
              <span className="text-gray-600 ml-auto text-sm">Create VPA</span>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex items-center gap-3">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded font-mono font-bold">GET</span>
              <code className="text-gray-800">/api/v1/upi/qr/:paymentId</code>
              <span className="text-gray-600 ml-auto text-sm">Generate QR</span>
            </div>
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg flex items-center gap-3">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-mono font-bold">POST</span>
              <code className="text-gray-800">/api/v1/upi/initiate</code>
              <span className="text-gray-600 ml-auto text-sm">Initiate payment</span>
            </div>
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg flex items-center gap-3">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-mono font-bold">POST</span>
              <code className="text-gray-800">/api/v1/upi/confirm</code>
              <span className="text-gray-600 ml-auto text-sm">Confirm payment</span>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex items-center gap-3">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded font-mono font-bold">GET</span>
              <code className="text-gray-800">/api/v1/upi/history/:userId</code>
              <span className="text-gray-600 ml-auto text-sm">History</span>
            </div>
          </div>
        </div>

        {/* Wallets */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Wallets</h3>
          <div className="space-y-2">
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex items-center gap-3">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded font-mono font-bold">GET</span>
              <code className="text-gray-800">/api/v1/wallets/:userId</code>
              <span className="text-gray-600 ml-auto text-sm">Get balance</span>
            </div>
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg flex items-center gap-3">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-mono font-bold">POST</span>
              <code className="text-gray-800">/api/v1/wallets/topup</code>
              <span className="text-gray-600 ml-auto text-sm">Top up</span>
            </div>
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg flex items-center gap-3">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-mono font-bold">POST</span>
              <code className="text-gray-800">/api/v1/wallets/transfer</code>
              <span className="text-gray-600 ml-auto text-sm">Transfer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Command Cheatsheet */}
      <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Terminal className="w-8 h-8 text-gray-700" />
          Command Cheatsheet
        </h2>

        <div className="space-y-6">
          {/* Start Services */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Services</h3>
            <CodeBlockCard
              language="bash"
              title="Development Setup"
              code={`# Infrastructure
docker-compose up -d

# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev

# User App
cd ../fakePE-user-app && npm run dev`}
            />
          </div>

          {/* Test SDK */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Test SDK</h3>
            <CodeBlockCard
              language="bash"
              title="Run Examples"
              code={`cd fakePE-sdk/examples

# Basic payment
node basic-payment.js

# UPI flow
node upi-payment.js

# Webhook server
node webhook-server.js`}
            />
          </div>

          {/* Docker Commands */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Docker Commands</h3>
            <CodeBlockCard
              language="bash"
              title="Docker Management"
              code={`# Start all
docker-compose up -d

# Stop all
docker-compose down

# View logs
docker-compose logs -f

# Restart service
docker-compose restart mongodb`}
            />
          </div>
        </div>
      </div>

      {/* Amount Conversion */}
      <div className="border-l-4 border-green-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Amount Conversion</h2>
        <CodeBlockCard
          language="javascript"
          title="Rupees ↔ Paise"
          description="FakePE uses paise (smallest currency unit) for all amounts"
          code={`// Rupees to Paise
const paise = rupees * 100;
// ₹500 = 50000 paise

// Paise to Rupees
const rupees = paise / 100;
// 50000 paise = ₹500`}
        />
      </div>

      {/* Test Data */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-600" />
          Test Data
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Test VPAs */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Test VPAs</h3>
            <div className="bg-white border border-yellow-200 rounded-lg p-4">
              <code className="text-sm text-gray-700">
                user@fakepe<br />
                merchant@fakepe<br />
                test@fakepe<br />
                anything@fakepe  // All work!
              </code>
            </div>
          </div>

          {/* Test PINs */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Test PINs</h3>
            <div className="bg-white border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">Any 4-6 digit number works</p>
              <code className="text-sm text-gray-600">Examples: 1234, 0000, 123456</code>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Status Flow */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Status Flow</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-medium text-sm">CREATED</span>
            <span className="text-gray-500">→</span>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium text-sm">PENDING</span>
            <span className="text-gray-500">→</span>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium text-sm">COMPLETED</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium text-sm">PENDING</span>
            <span className="text-gray-500">→</span>
            <span className="px-4 py-2 bg-red-100 text-red-800 rounded-lg font-medium text-sm">FAILED</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium text-sm">COMPLETED</span>
            <span className="text-gray-500">→</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium text-sm">REFUNDED</span>
          </div>
        </div>
      </div>

      {/* Webhook Events */}
      <div className="border-l-4 border-orange-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Webhook Events</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <code className="text-blue-600">payment.created</code>
                <span className="text-gray-600 text-sm ml-2">- Payment order created</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <code className="text-blue-600">payment.pending</code>
                <span className="text-gray-600 text-sm ml-2">- Payment initiated</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <code className="text-blue-600">payment.completed</code>
                <span className="text-gray-600 text-sm ml-2">- Payment successful</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <code className="text-blue-600">payment.failed</code>
                <span className="text-gray-600 text-sm ml-2">- Payment failed</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <code className="text-blue-600">payment.refunded</code>
                <span className="text-gray-600 text-sm ml-2">- Payment refunded</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Environment Variables */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Environment Variables</h2>

        <div className="space-y-6">
          {/* Backend */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Backend</h3>
            <CodeBlockCard
              language="bash"
              title=".env"
              code={`NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://...
REDIS_URL=redis://...
JWT_SECRET=your_secret`}
            />
          </div>

          {/* Frontend */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Frontend & User App</h3>
            <CodeBlockCard
              language="bash"
              title=".env"
              code={`VITE_API_URL=http://localhost:4000`}
            />
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-600" />
          Troubleshooting
        </h2>

        <div className="space-y-6">
          {/* Backend won't start */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Backend won't start</h3>
            <CodeBlockCard
              language="bash"
              code={`# Check MongoDB and Redis
docker ps

# Restart if needed
docker-compose restart mongodb redis`}
            />
          </div>

          {/* Camera not working */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Camera not working</h3>
            <div className="bg-white border border-red-200 rounded-lg p-4">
              <ul className="space-y-2 text-gray-700">
                <li>• Grant camera permissions in browser</li>
                <li>• Use manual URL entry instead</li>
                <li>• Upload QR image option</li>
              </ul>
            </div>
          </div>

          {/* Payment stuck */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment stuck</h3>
            <div className="bg-white border border-red-200 rounded-lg p-4">
              <ul className="space-y-2 text-gray-700">
                <li>• Check user has sufficient balance</li>
                <li>• Verify VPA exists</li>
                <li>• Check backend logs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Links */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Links</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <a
            href="https://github.com/Mihir-Rabari/fake-pe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-white border border-blue-200 rounded-lg hover:shadow-md transition text-blue-700 hover:text-blue-800"
          >
            <Code className="w-4 h-4" />
            Main Repository
            <ExternalLink className="w-3 h-3 ml-auto" />
          </a>
          <a
            href="https://github.com/Mihir-Rabari/fakePE-user-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-white border border-blue-200 rounded-lg hover:shadow-md transition text-blue-700 hover:text-blue-800"
          >
            <Code className="w-4 h-4" />
            User App
            <ExternalLink className="w-3 h-3 ml-auto" />
          </a>
          <a
            href="https://github.com/Mihir-Rabari/fakePE-sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-white border border-blue-200 rounded-lg hover:shadow-md transition text-blue-700 hover:text-blue-800"
          >
            <Code className="w-4 h-4" />
            SDK
            <ExternalLink className="w-3 h-3 ml-auto" />
          </a>
          <a
            href="https://www.npmjs.com/package/fakepe-sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-white border border-blue-200 rounded-lg hover:shadow-md transition text-blue-700 hover:text-blue-800"
          >
            <Code className="w-4 h-4" />
            NPM Package
            <ExternalLink className="w-3 h-3 ml-auto" />
          </a>
        </div>
      </div>
    </div>
  );
}
