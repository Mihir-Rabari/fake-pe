export default function QuickReference() {
  return (
    <div className="prose prose-indigo max-w-none">
      <h1>Quick Reference</h1>
      <p className="lead">
        Quick command reference and code snippets for FakePE.
      </p>

      <h2>Service URLs</h2>
      <div className="not-prose">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Backend API</td>
              <td className="px-6 py-4 text-sm text-gray-500"><code>http://localhost:4000</code></td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Merchant Dashboard</td>
              <td className="px-6 py-4 text-sm text-gray-500"><code>http://localhost:3000</code></td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">User App</td>
              <td className="px-6 py-4 text-sm text-gray-500"><code>http://localhost:3001</code></td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">API Health</td>
              <td className="px-6 py-4 text-sm text-gray-500"><code>http://localhost:4000/health</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>SDK Quick Examples</h2>

      <h3>Initialize SDK</h3>
      <pre><code className="language-javascript">{`const FakePE = require('@fakepe/sdk');

const fakepe = new FakePE({
  key_id: 'your_key',
  key_secret: 'your_secret'
});`}</code></pre>

      <h3>Create Payment</h3>
      <pre><code className="language-javascript">{`const payment = await fakepe.payments.create({
  merchantId: 'mer_123',
  amount: 50000, // ₹500 in paise
  orderId: 'order_001'
});`}</code></pre>

      <h3>Get Payment Status</h3>
      <pre><code className="language-javascript">{`const status = await fakepe.payments.fetch('pay_xyz');`}</code></pre>

      <h3>Generate QR Code</h3>
      <pre><code className="language-javascript">{`const qr = await fakepe.upi.generateQr('pay_xyz');
console.log(qr.upiIntent);
console.log(qr.qrCodeData);`}</code></pre>

      <h3>Verify Webhook</h3>
      <pre><code className="language-javascript">{`app.post('/webhook', (req, res) => {
  const signature = req.headers['x-fakepe-signature'];
  
  if (!fakepe.webhooks.verify(req.body, signature)) {
    return res.status(400).send('Invalid');
  }
  
  // Process webhook
  res.status(200).send('OK');
});`}</code></pre>

      <h2>API Endpoints</h2>

      <h3>Payments</h3>
      <div className="not-prose space-y-2">
        <div className="bg-gray-50 p-3 rounded"><code className="text-green-600">POST</code> <code>/api/v1/payments</code> - Create payment</div>
        <div className="bg-gray-50 p-3 rounded"><code className="text-blue-600">GET</code> <code>/api/v1/payments/:id</code> - Get payment</div>
        <div className="bg-gray-50 p-3 rounded"><code className="text-blue-600">GET</code> <code>/api/v1/payments</code> - List payments</div>
        <div className="bg-gray-50 p-3 rounded"><code className="text-green-600">POST</code> <code>/api/v1/payments/:id/refund</code> - Refund</div>
      </div>

      <h3>UPI</h3>
      <div className="not-prose space-y-2">
        <div className="bg-gray-50 p-3 rounded"><code className="text-green-600">POST</code> <code>/api/v1/upi/vpa</code> - Create VPA</div>
        <div className="bg-gray-50 p-3 rounded"><code className="text-blue-600">GET</code> <code>/api/v1/upi/qr/:paymentId</code> - Generate QR</div>
        <div className="bg-gray-50 p-3 rounded"><code className="text-green-600">POST</code> <code>/api/v1/upi/initiate</code> - Initiate payment</div>
        <div className="bg-gray-50 p-3 rounded"><code className="text-green-600">POST</code> <code>/api/v1/upi/confirm</code> - Confirm payment</div>
        <div className="bg-gray-50 p-3 rounded"><code className="text-blue-600">GET</code> <code>/api/v1/upi/history/:userId</code> - History</div>
      </div>

      <h3>Wallets</h3>
      <div className="not-prose space-y-2">
        <div className="bg-gray-50 p-3 rounded"><code className="text-blue-600">GET</code> <code>/api/v1/wallets/:userId</code> - Get balance</div>
        <div className="bg-gray-50 p-3 rounded"><code className="text-green-600">POST</code> <code>/api/v1/wallets/topup</code> - Top up</div>
        <div className="bg-gray-50 p-3 rounded"><code className="text-green-600">POST</code> <code>/api/v1/wallets/transfer</code> - Transfer</div>
      </div>

      <h2>Command Cheatsheet</h2>

      <h3>Start Services</h3>
      <pre><code className="language-bash">{`# Infrastructure
docker-compose up -d

# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev

# User App
cd ../fakePE-user-app && npm run dev`}</code></pre>

      <h3>Test SDK</h3>
      <pre><code className="language-bash">{`cd fakePE-sdk/examples

# Basic payment
node basic-payment.js

# UPI flow
node upi-payment.js

# Webhook server
node webhook-server.js`}</code></pre>

      <h3>Docker Commands</h3>
      <pre><code className="language-bash">{`# Start all
docker-compose up -d

# Stop all
docker-compose down

# View logs
docker-compose logs -f

# Restart service
docker-compose restart mongodb`}</code></pre>

      <h2>Amount Conversion</h2>
      <pre><code className="language-javascript">{`// Rupees to Paise
const paise = rupees * 100;
// ₹500 = 50000 paise

// Paise to Rupees
const rupees = paise / 100;
// 50000 paise = ₹500`}</code></pre>

      <h2>Test Data</h2>

      <h3>Test VPAs</h3>
      <pre><code>{`user@fakepe
merchant@fakepe
test@fakepe
anything@fakepe  // All work!`}</code></pre>

      <h3>Test PINs</h3>
      <pre><code>{`Any 4-6 digit number works
Examples: 1234, 0000, 123456`}</code></pre>

      <h2>Payment Status Flow</h2>
      <div className="not-prose">
        <div className="bg-gray-50 p-4 rounded">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">CREATED</span>
            <span>→</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">PENDING</span>
            <span>→</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm">COMPLETED</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">PENDING</span>
            <span>→</span>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm">FAILED</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm">COMPLETED</span>
            <span>→</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm">REFUNDED</span>
          </div>
        </div>
      </div>

      <h2>Webhook Events</h2>
      <ul>
        <li><code>payment.created</code> - Payment order created</li>
        <li><code>payment.pending</code> - Payment initiated</li>
        <li><code>payment.completed</code> - Payment successful</li>
        <li><code>payment.failed</code> - Payment failed</li>
        <li><code>payment.refunded</code> - Payment refunded</li>
      </ul>

      <h2>Environment Variables</h2>

      <h3>Backend</h3>
      <pre><code className="language-bash">{`NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://...
REDIS_URL=redis://...
JWT_SECRET=your_secret`}</code></pre>

      <h3>Frontend & User App</h3>
      <pre><code className="language-bash">{`VITE_API_URL=http://localhost:4000`}</code></pre>

      <h2>Troubleshooting</h2>

      <h3>Backend won't start</h3>
      <pre><code className="language-bash">{`# Check MongoDB and Redis
docker ps

# Restart if needed
docker-compose restart mongodb redis`}</code></pre>

      <h3>Camera not working</h3>
      <ul>
        <li>Grant camera permissions in browser</li>
        <li>Use manual URL entry instead</li>
        <li>Upload QR image option</li>
      </ul>

      <h3>Payment stuck</h3>
      <ul>
        <li>Check user has sufficient balance</li>
        <li>Verify VPA exists</li>
        <li>Check backend logs</li>
      </ul>

      <h2>Related Links</h2>
      <ul>
        <li><a href="https://github.com/Mihir-Rabari/fake-pe" target="_blank">Main Repository</a></li>
        <li><a href="https://github.com/Mihir-Rabari/fakePE-user-app" target="_blank">User App</a></li>
        <li><a href="https://github.com/Mihir-Rabari/fakePE-sdk" target="_blank">SDK</a></li>
        <li><a href="https://www.npmjs.com/package/@fakepe/sdk" target="_blank">NPM Package</a></li>
      </ul>
    </div>
  );
}
