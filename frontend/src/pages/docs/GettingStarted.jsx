export default function GettingStarted() {
  return (
    <div className="prose prose-indigo max-w-none">
      <h1>Getting Started with FakePE</h1>
      <p className="lead">
        FakePE is a complete mock payment gateway system inspired by Razorpay, perfect for testing and development.
      </p>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
        <p className="text-sm text-yellow-700">
          <strong>⚠️ Important:</strong> This is a MOCK payment system. All transactions use fake money and are not real financial transactions.
        </p>
      </div>

      <h2>Quick Start</h2>

      <h3>1. Prerequisites</h3>
      <ul>
        <li>Node.js 18+</li>
        <li>Docker &amp; Docker Compose</li>
        <li>Git</li>
      </ul>

      <h3>2. Clone and Setup</h3>
      <pre><code className="language-bash">{`# Clone main repository
git clone https://github.com/Mihir-Rabari/fake-pe.git
cd fake-pe

# Start infrastructure (MongoDB, Redis)
docker-compose up -d

# Install and start backend
cd backend
npm install
npm run dev

# Install and start frontend (new terminal)
cd frontend
npm install
npm run dev`}</code></pre>

      <h3>3. Install SDK</h3>
      <pre><code className="language-bash">{`npm install fakepe-sdk`}</code></pre>

      <h3>4. Install User App</h3>
      <pre><code className="language-bash">{`# Clone user app repository
git clone https://github.com/Mihir-Rabari/fakePE-user-app.git
cd fakePE-user-app

# Install and start
npm install
npm run dev`}</code></pre>

      <h2>Your First Payment</h2>

      <h3>Step 1: Create Payment with SDK</h3>
      <pre><code className="language-javascript">{`const FakePE = require('fakepe-sdk');

const fakepe = new FakePE({
  key_id: 'test_key',
  key_secret: 'test_secret',
  baseUrl: 'http://localhost:4000'
});

// Create payment
const payment = await fakepe.payments.create({
  merchantId: 'mer_test',
  amount: 50000, // ₹500 in paise
  orderId: 'order_001'
});

console.log('Payment URL:', payment.paymentUrl);
console.log('QR Code:', payment.qrData);`}</code></pre>

      <h3>Step 2: Complete Payment in User App</h3>
      <ol>
        <li>Open User App at <code>http://localhost:3001</code></li>
        <li>Create an account (first time)</li>
        <li>Click "Scan & Pay"</li>
        <li>Scan the QR code or paste payment URL</li>
        <li>Enter any 4-6 digit PIN</li>
        <li>Confirm payment</li>
      </ol>

      <h3>Step 3: Verify Payment</h3>
      <pre><code className="language-javascript">{`const status = await fakepe.payments.fetch(payment.paymentId);
console.log('Status:', status.status); // 'COMPLETED'`}</code></pre>

      <h2>Complete Payment Flow</h2>
      <div className="bg-gray-50 p-6 rounded-lg">
        <ol className="space-y-2">
          <li><strong>Merchant</strong> creates payment via SDK</li>
          <li><strong>Backend</strong> generates payment ID + QR code</li>
          <li><strong>Customer</strong> scans QR in User App</li>
          <li><strong>User App</strong> initiates UPI payment</li>
          <li><strong>Customer</strong> enters PIN and confirms</li>
          <li><strong>Backend</strong> processes payment</li>
          <li><strong>Webhook</strong> sent to merchant</li>
        </ol>
      </div>

      <h2>Service URLs</h2>
      <ul>
        <li><strong>Backend API:</strong> <code>http://localhost:4000</code></li>
        <li><strong>Merchant Dashboard:</strong> <code>http://localhost:3000</code></li>
        <li><strong>User App:</strong> <code>http://localhost:3001</code></li>
        <li><strong>API Health:</strong> <code>http://localhost:4000/health</code></li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li>Explore the <a href="/docs/api">API Reference</a></li>
        <li>Learn more about the <a href="/docs/sdk">SDK</a></li>
        <li>Check out <a href="/docs/quick-reference">Quick Reference</a></li>
      </ul>

      <h2>Need Help?</h2>
      <p>
        Check out our <a href="https://github.com/Mihir-Rabari/fake-pe/issues" target="_blank">GitHub Issues</a> or 
        review the example files in the SDK repository.
      </p>
    </div>
  );
}
