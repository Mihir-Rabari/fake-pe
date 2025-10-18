import React from 'react';

export default function GettingStarted() {
  return (
    <div className="prose prose-slate max-w-none">
      <h1>Get started with FakePE</h1>
      
      <p className="lead">
        FakePE is a complete mock payment gateway inspired by Razorpay. Perfect for testing payment flows without real money.
      </p>

      <div className="not-prose my-8 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r">
        <p className="text-sm text-amber-900">
          <strong>Note:</strong> This is a mock system. All transactions use fake money.
        </p>
      </div>

      <h2 id="installation">Installation</h2>
      
      <p>Get started by cloning the repository and starting the services:</p>

      <h3>1. Clone and start backend</h3>
      
      <pre><code className="language-bash">{`git clone https://github.com/Mihir-Rabari/fake-pe.git
cd fake-pe

# Start MongoDB and Redis
docker-compose up -d

# Start backend
cd backend
npm install
npm run dev`}</code></pre>

      <h3>2. Start frontend</h3>
      
      <pre><code className="language-bash">{`cd frontend
npm install
npm run dev`}</code></pre>

      <h3>3. Install user app</h3>
      
      <pre><code className="language-bash">{`git clone https://github.com/Mihir-Rabari/fakePE-user-app.git
cd fakePE-user-app
npm install
npm run dev`}</code></pre>

      <h2 id="quick-start">Quick Start</h2>
      
      <p>Install the SDK in your project:</p>

      <pre><code className="language-bash">npm install fakepe-sdk</code></pre>

      <h3>Create your first payment</h3>
      
      <pre><code className="language-javascript">{`const FakePE = require('fakepe-sdk');

const fakepe = new FakePE({
  key_id: 'test_key',
  key_secret: 'test_secret',
  baseUrl: 'http://localhost:4000'
});

// Create a payment
const payment = await fakepe.payments.create({
  merchantId: 'mer_test',
  amount: 50000, // ₹500 in paise
  orderId: 'order_001'
});

console.log(payment.paymentUrl);
console.log(payment.qrData);`}</code></pre>

      <h3>Complete the payment</h3>
      
      <ol>
        <li>Open User App at <code>http://localhost:3001</code></li>
        <li>Create an account</li>
        <li>Click "Scan & Pay"</li>
        <li>Paste the payment URL</li>
        <li>Enter any 4-6 digit PIN (e.g., <code>1234</code>)</li>
        <li>Confirm payment</li>
      </ol>

      <h2>Service URLs</h2>
      
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Backend API</td>
            <td><code>http://localhost:4000</code></td>
          </tr>
          <tr>
            <td>Frontend Dashboard</td>
            <td><code>http://localhost:3000</code></td>
          </tr>
          <tr>
            <td>User App</td>
            <td><code>http://localhost:3001</code></td>
          </tr>
        </tbody>
      </table>

      <h2>Next steps</h2>
      
      <ul>
        <li><a href="/docs/api">Explore the API Reference</a></li>
        <li><a href="/docs/sdk">Learn more about the SDK</a></li>
        <li><a href="/docs/quick-reference">Check out the Quick Reference</a></li>
      </ul>
    </div>
  );
}
