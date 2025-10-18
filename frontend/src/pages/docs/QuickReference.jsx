import React from 'react';
import DocPage from '../../components/docs/DocPage';
import CodeBlock from '../../components/docs/CodeBlock-new';
import Callout from '../../components/docs/Callout';

export default function QuickReference() {
  return (
    <DocPage
      title="Quick Reference"
      description="Quick command reference and code snippets for FakePE."
    >

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
            <td>Merchant Dashboard</td>
            <td><code>http://localhost:3000</code></td>
          </tr>
          <tr>
            <td>User App</td>
            <td><code>http://localhost:3001</code></td>
          </tr>
        </tbody>
      </table>

      <h2>SDK Quick Examples</h2>

      <h3>Initialize</h3>
      
      <pre><code className="language-javascript">{`const FakePE = require('fakepe-sdk');

const fakepe = new FakePE({
  key_id: 'your_key',
  key_secret: 'your_secret'
});`}</code></pre>

      <h3>Create Payment</h3>
      
      <pre><code className="language-javascript">{`const payment = await fakepe.payments.create({
  merchantId: 'mer_123',
  amount: 50000,
  orderId: 'order_001'
});`}</code></pre>

      <h3>Get Status</h3>
      
      <pre><code className="language-javascript">const payment = await fakepe.payments.fetch('pay_xyz');</code></pre>

      <h3>Generate QR</h3>
      
      <pre><code className="language-javascript">{`const qr = await fakepe.upi.generateQr('pay_xyz');
console.log(qr.upiIntent);`}</code></pre>

      <h2>API Endpoints</h2>

      <h3>Payments</h3>
      
      <ul className="not-prose space-y-2">
        <li className="flex items-center gap-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">POST</span>
          <code>/api/v1/payments</code>
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">GET</span>
          <code>/api/v1/payments/:id</code>
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">POST</span>
          <code>/api/v1/payments/:id/refund</code>
        </li>
      </ul>

      <h3>UPI</h3>
      
      <ul className="not-prose space-y-2">
        <li className="flex items-center gap-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">POST</span>
          <code>/api/v1/upi/vpa</code>
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">GET</span>
          <code>/api/v1/upi/qr/:paymentId</code>
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">POST</span>
          <code>/api/v1/upi/initiate</code>
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">POST</span>
          <code>/api/v1/upi/confirm</code>
        </li>
      </ul>

      <h3>Wallets</h3>
      
      <ul className="not-prose space-y-2">
        <li className="flex items-center gap-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">GET</span>
          <code>/api/v1/wallets/:userId</code>
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">POST</span>
          <code>/api/v1/wallets/topup</code>
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">POST</span>
          <code>/api/v1/wallets/transfer</code>
        </li>
      </ul>

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

      <h3>Docker Commands</h3>
      
      <pre><code className="language-bash">{`# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f`}</code></pre>

      <h2>Test Data</h2>

      <h3>Test VPAs</h3>
      
      <p>Any VPA with <code>@fakepe</code> works:</p>

      <pre><code>{`user@fakepe
merchant@fakepe
test@fakepe`}</code></pre>

      <h3>Test PINs</h3>
      
      <p>Any 4-6 digit number works. Examples:</p>

      <pre><code>1234, 0000, 123456</code></pre>

      <h2>Payment Status Flow</h2>
      
      <p>Payments follow this status progression:</p>

      <pre><code>{`CREATED → PENDING → COMPLETED
PENDING → FAILED
COMPLETED → REFUNDED`}</code></pre>

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
MONGO_URI=mongodb://localhost:27017/fakepe
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret`}</code></pre>

      <h3>Frontend</h3>
      
      <pre><code className="language-bash">VITE_API_URL=http://localhost:4000</code></pre>
    </DocPage>
  );
}
