import React from 'react';
import { Package, Code2, CheckCircle, ExternalLink, Zap } from 'lucide-react';
import CodeBlockCard from '../../components/docs/CodeBlockCard';

export default function SDKGuide() {
  return (
    <div className="max-w-none space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">SDK Guide</h1>
        <p className="text-xl text-gray-600 mb-6">
          Complete guide for using the fakepe-sdk Node.js package.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.npmjs.com/package/fakepe-sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            <Package className="w-4 h-4" />
            View on NPM
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://github.com/Mihir-Rabari/fakePE-sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
          >
            <Code2 className="w-4 h-4" />
            View on GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Installation */}
      <div className="border-l-4 border-blue-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Installation</h2>
        <CodeBlockCard
          language="bash"
          title="Install via NPM"
          code="npm install fakepe-sdk"
        />
      </div>

      {/* Initialization */}
      <div className="border-l-4 border-purple-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Initialization</h2>
        <p className="text-gray-600 mb-4">Initialize the SDK with your credentials:</p>
        <CodeBlockCard
          language="javascript"
          title="Initialize SDK"
          code={`const FakePE = require('fakepe-sdk');

const fakepe = new FakePE({
  key_id: 'your_key_id',        // Required
  key_secret: 'your_key_secret', // Required
  baseUrl: 'http://localhost:4000' // Optional, defaults to http://localhost:4000
});`}
        />
      </div>

      {/* Payments Section */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Zap className="w-8 h-8 text-green-600" />
          Payments
        </h2>

        <div className="space-y-6">
          {/* Create Payment */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Payment</h3>
            <CodeBlockCard
              language="javascript"
              title="payments.create()"
              description="Create a new payment request and get payment URL with QR code"
              code={`const payment = await fakepe.payments.create({
  merchantId: 'mer_123',
  amount: 50000, // in paise (₹500)
  orderId: 'order_001',
  callbackUrl: 'https://yoursite.com/webhook',
  metadata: {
    customer_name: 'John Doe',
    customer_email: 'john@example.com'
  }
});

console.log(payment.paymentId);
console.log(payment.paymentUrl);
console.log(payment.qrData); // base64 QR code`}
            />
          </div>

          {/* Fetch Payment */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Fetch Payment</h3>
            <CodeBlockCard
              language="javascript"
              title="payments.fetch()"
              description="Retrieve payment details by ID"
              code={`const payment = await fakepe.payments.fetch('pay_xyz789');
console.log(payment.status); // CREATED, PENDING, COMPLETED, FAILED`}
            />
          </div>

          {/* List Payments */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">List Payments</h3>
            <CodeBlockCard
              language="javascript"
              title="payments.list()"
              description="Get paginated list of payments with filters"
              code={`const result = await fakepe.payments.list({
  merchantId: 'mer_123',
  status: 'COMPLETED',
  limit: 10,
  offset: 0
});

console.log(result.payments); // Array of payments
console.log(result.total); // Total count`}
            />
          </div>

          {/* Refund Payment */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Refund Payment</h3>
            <CodeBlockCard
              language="javascript"
              title="payments.refund()"
              description="Issue full or partial refund"
              code={`await fakepe.payments.refund('pay_xyz789', {
  amount: 25000, // partial refund (optional)
  reason: 'Customer request'
});`}
            />
          </div>
        </div>
      </div>

      {/* UPI Operations */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">UPI Operations</h2>

        <div className="space-y-6">
          {/* Create VPA */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Create VPA</h3>
            <CodeBlockCard
              language="javascript"
              title="upi.createVpa()"
              code={`await fakepe.upi.createVpa({
  userId: 'usr_123',
  vpa: 'user@fakepe'
});`}
            />
          </div>

          {/* Get VPAs */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Get User VPAs</h3>
            <CodeBlockCard
              language="javascript"
              title="upi.getVpas()"
              code={`const vpas = await fakepe.upi.getVpas('usr_123');
console.log(vpas); // Array of VPA objects`}
            />
          </div>

          {/* Generate QR */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate QR Code</h3>
            <CodeBlockCard
              language="javascript"
              title="upi.generateQr()"
              code={`const qr = await fakepe.upi.generateQr('pay_xyz789');
console.log(qr.upiIntent); // upi://pay?pa=...
console.log(qr.qrCodeData); // base64 image`}
            />
          </div>

          {/* Complete UPI Flow */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Complete UPI Payment Flow</h3>
            <CodeBlockCard
              language="javascript"
              title="UPI Payment Flow"
              description="Step-by-step: Initiate → Confirm payment"
              code={`// Step 1: Initiate payment
const txn = await fakepe.upi.initiate({
  paymentId: 'pay_xyz789',
  payerVpa: 'user@fakepe'
});

console.log(txn.txnId); // UPI2024011512345678

// Step 2: Confirm payment
const result = await fakepe.upi.confirm({
  txnId: txn.txnId,
  pin: '1234' // Mock PIN
});

console.log(result.status); // SUCCESS or FAILED
console.log(result.upiRef); // UTR number`}
            />
          </div>

          {/* Get Transaction */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Transaction</h3>
            <CodeBlockCard
              language="javascript"
              title="upi.getTransaction()"
              code={`const txn = await fakepe.upi.getTransaction('UPI2024011512345678');
console.log(txn.status);
console.log(txn.amount);`}
            />
          </div>

          {/* Transaction History */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Transaction History</h3>
            <CodeBlockCard
              language="javascript"
              title="upi.getHistory()"
              code={`const history = await fakepe.upi.getHistory('usr_123', {
  limit: 20,
  offset: 0
});

console.log(history.transactions);
console.log(history.total);`}
            />
          </div>
        </div>
      </div>

      {/* Wallet Operations */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Wallet Operations</h2>

        <div className="space-y-6">
          {/* Get Balance */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Balance</h3>
            <CodeBlockCard
              language="javascript"
              title="wallets.getBalance()"
              code={`const wallet = await fakepe.wallets.getBalance('usr_123');
console.log(wallet.balance); // in paise
console.log(wallet.balance / 100); // in rupees`}
            />
          </div>

          {/* Top Up */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Top Up</h3>
            <CodeBlockCard
              language="javascript"
              title="wallets.topup()"
              code={`await fakepe.wallets.topup({
  userId: 'usr_123',
  amount: 100000 // ₹1000 in paise
});`}
            />
          </div>

          {/* Transfer */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Transfer</h3>
            <CodeBlockCard
              language="javascript"
              title="wallets.transfer()"
              code={`await fakepe.wallets.transfer({
  from: 'usr_123',
  to: 'usr_456',
  amount: 50000
});`}
            />
          </div>
        </div>
      </div>

      {/* Webhooks */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Webhooks</h2>

        <div className="space-y-6">
          {/* Verify Signature */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Verify Signature</h3>
            <CodeBlockCard
              language="javascript"
              title="Webhook Handler with Signature Verification"
              description="Always verify webhook signatures before processing"
              code={`const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-fakepe-signature'];
  
  // Verify webhook signature
  if (!fakepe.webhooks.verify(req.body, signature)) {
    return res.status(400).send('Invalid signature');
  }
  
  // Process webhook
  const { event, data } = req.body;
  
  switch(event) {
    case 'payment.completed':
      console.log('Payment completed:', data.paymentId);
      // Update order status, send confirmation, etc.
      break;
      
    case 'payment.failed':
      console.log('Payment failed:', data.paymentId);
      // Handle failed payment
      break;
      
    case 'payment.refunded':
      console.log('Payment refunded:', data.paymentId);
      // Process refund
      break;
  }
  
  res.status(200).send('OK');
});

app.listen(3000);`}
            />
          </div>

          {/* Generate Signature */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate Signature (for testing)</h3>
            <CodeBlockCard
              language="javascript"
              title="webhooks.generateSignature()"
              code={`const signature = fakepe.webhooks.generateSignature({
  event: 'payment.completed',
  data: { paymentId: 'pay_123' }
});`}
            />
          </div>
        </div>
      </div>

      {/* Error Handling */}
      <div className="border-l-4 border-red-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Handling</h2>
        <CodeBlockCard
          language="javascript"
          title="Try-Catch Pattern"
          description="Always wrap SDK calls in try-catch blocks"
          code={`try {
  const payment = await fakepe.payments.create({
    merchantId: 'mer_123',
    amount: 50000,
    orderId: 'order_001'
  });
} catch (error) {
  console.error('Error:', error.message);
  
  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  }
}`}
        />
      </div>

      {/* Best Practices */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>

        <div className="space-y-6">
          {/* 1. Secure Credentials */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              1. Store Credentials Securely
            </h3>
            <CodeBlockCard
              language="javascript"
              code={`// Use environment variables
const fakepe = new FakePE({
  key_id: process.env.FAKEPE_KEY_ID,
  key_secret: process.env.FAKEPE_KEY_SECRET
});`}
            />
          </div>

          {/* 2. Idempotency */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              2. Use Idempotency
            </h3>
            <CodeBlockCard
              language="javascript"
              code={`// Add custom headers for idempotency
fakepe.client.defaults.headers.common['Idempotency-Key'] = generateUniqueKey();`}
            />
          </div>

          {/* 3. Error Handling */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              3. Handle Errors Gracefully
            </h3>
            <CodeBlockCard
              language="javascript"
              code={`async function createPaymentSafely(data) {
  try {
    return await fakepe.payments.create(data);
  } catch (error) {
    // Log error
    logger.error('Payment creation failed', { error, data });
    
    // Return user-friendly error
    throw new Error('Unable to create payment. Please try again.');
  }
}`}
            />
          </div>

          {/* 4. Verify Webhooks */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              4. Verify All Webhooks
            </h3>
            <CodeBlockCard
              language="javascript"
              code={`// Always verify signature before processing
if (!fakepe.webhooks.verify(req.body, signature)) {
  logger.warn('Invalid webhook signature');
  return res.status(400).send('Invalid');
}

// Then process the webhook`}
            />
          </div>
        </div>
      </div>

      {/* TypeScript Support */}
      <div className="border-l-4 border-blue-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">TypeScript Support</h2>
        <p className="text-gray-600 mb-4">Type definitions are included in the package:</p>
        <CodeBlockCard
          language="typescript"
          title="TypeScript Example"
          code={`import FakePE from 'fakepe-sdk';

const fakepe = new FakePE({
  key_id: 'key',
  key_secret: 'secret'
});

// Full type support
const payment: Payment = await fakepe.payments.create({
  merchantId: 'mer_123',
  amount: 50000,
  orderId: 'order_001'
});`}
        />
      </div>

      {/* Complete Example */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Example</h2>
        <p className="text-gray-700 mb-4">
          Check out the <code className="bg-white px-2 py-1 rounded">examples/</code> directory in the{' '}
          <a href="https://github.com/Mihir-Rabari/fakePE-sdk" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">
            SDK repository
          </a>:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
            <code className="bg-white px-2 py-1 rounded text-sm">basic-payment.js</code> - Simple payment creation
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
            <code className="bg-white px-2 py-1 rounded text-sm">upi-payment.js</code> - Complete UPI flow
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
            <code className="bg-white px-2 py-1 rounded text-sm">webhook-server.js</code> - Webhook handling
          </li>
        </ul>
      </div>
    </div>
  );
}
