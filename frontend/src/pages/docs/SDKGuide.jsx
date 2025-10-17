export default function SDKGuide() {
  return (
    <div className="prose prose-indigo max-w-none">
      <h1>SDK Guide</h1>
      <p className="lead">
        Complete guide for using the fakepe-sdk Node.js package.
      </p>

      <h2>Installation</h2>
      <pre><code className="language-bash">{`npm install fakepe-sdk`}</code></pre>

      <h2>Initialization</h2>
      <pre><code className="language-javascript">{`const FakePE = require('fakepe-sdk');

const fakepe = new FakePE({
  key_id: 'your_key_id',        // Required
  key_secret: 'your_key_secret', // Required
  baseUrl: 'http://localhost:4000' // Optional, defaults to http://localhost:4000
});`}</code></pre>

      <h2>Payments</h2>

      <h3>Create Payment</h3>
      <pre><code className="language-javascript">{`const payment = await fakepe.payments.create({
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
console.log(payment.qrData); // base64 QR code`}</code></pre>

      <h3>Fetch Payment</h3>
      <pre><code className="language-javascript">{`const payment = await fakepe.payments.fetch('pay_xyz789');
console.log(payment.status); // CREATED, PENDING, COMPLETED, FAILED`}</code></pre>

      <h3>List Payments</h3>
      <pre><code className="language-javascript">{`const result = await fakepe.payments.list({
  merchantId: 'mer_123',
  status: 'COMPLETED',
  limit: 10,
  offset: 0
});

console.log(result.payments); // Array of payments
console.log(result.total); // Total count`}</code></pre>

      <h3>Refund Payment</h3>
      <pre><code className="language-javascript">{`await fakepe.payments.refund('pay_xyz789', {
  amount: 25000, // partial refund (optional)
  reason: 'Customer request'
});`}</code></pre>

      <h2>UPI Operations</h2>

      <h3>Create VPA</h3>
      <pre><code className="language-javascript">{`await fakepe.upi.createVpa({
  userId: 'usr_123',
  vpa: 'user@fakepe'
});`}</code></pre>

      <h3>Get User VPAs</h3>
      <pre><code className="language-javascript">{`const vpas = await fakepe.upi.getVpas('usr_123');
console.log(vpas); // Array of VPA objects`}</code></pre>

      <h3>Generate QR Code</h3>
      <pre><code className="language-javascript">{`const qr = await fakepe.upi.generateQr('pay_xyz789');
console.log(qr.upiIntent); // upi://pay?pa=...
console.log(qr.qrCodeData); // base64 image`}</code></pre>

      <h3>Complete UPI Payment Flow</h3>
      <pre><code className="language-javascript">{`// Step 1: Initiate payment
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
console.log(result.upiRef); // UTR number`}</code></pre>

      <h3>Get Transaction</h3>
      <pre><code className="language-javascript">{`const txn = await fakepe.upi.getTransaction('UPI2024011512345678');
console.log(txn.status);
console.log(txn.amount);`}</code></pre>

      <h3>Transaction History</h3>
      <pre><code className="language-javascript">{`const history = await fakepe.upi.getHistory('usr_123', {
  limit: 20,
  offset: 0
});

console.log(history.transactions);
console.log(history.total);`}</code></pre>

      <h2>Wallet Operations</h2>

      <h3>Get Balance</h3>
      <pre><code className="language-javascript">{`const wallet = await fakepe.wallets.getBalance('usr_123');
console.log(wallet.balance); // in paise
console.log(wallet.balance / 100); // in rupees`}</code></pre>

      <h3>Top Up</h3>
      <pre><code className="language-javascript">{`await fakepe.wallets.topup({
  userId: 'usr_123',
  amount: 100000 // ₹1000 in paise
});`}</code></pre>

      <h3>Transfer</h3>
      <pre><code className="language-javascript">{`await fakepe.wallets.transfer({
  from: 'usr_123',
  to: 'usr_456',
  amount: 50000
});`}</code></pre>

      <h2>Webhooks</h2>

      <h3>Verify Signature</h3>
      <pre><code className="language-javascript">{`const express = require('express');
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

app.listen(3000);`}</code></pre>

      <h3>Generate Signature (for testing)</h3>
      <pre><code className="language-javascript">{`const signature = fakepe.webhooks.generateSignature({
  event: 'payment.completed',
  data: { paymentId: 'pay_123' }
});`}</code></pre>

      <h2>Error Handling</h2>
      <pre><code className="language-javascript">{`try {
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
}`}</code></pre>

      <h2>Best Practices</h2>

      <h3>1. Store Credentials Securely</h3>
      <pre><code className="language-javascript">{`// Use environment variables
const fakepe = new FakePE({
  key_id: process.env.FAKEPE_KEY_ID,
  key_secret: process.env.FAKEPE_KEY_SECRET
});`}</code></pre>

      <h3>2. Use Idempotency</h3>
      <pre><code className="language-javascript">{`// Add custom headers for idempotency
fakepe.client.defaults.headers.common['Idempotency-Key'] = generateUniqueKey();`}</code></pre>

      <h3>3. Handle Errors Gracefully</h3>
      <pre><code className="language-javascript">{`async function createPaymentSafely(data) {
  try {
    return await fakepe.payments.create(data);
  } catch (error) {
    // Log error
    logger.error('Payment creation failed', { error, data });
    
    // Return user-friendly error
    throw new Error('Unable to create payment. Please try again.');
  }
}`}</code></pre>

      <h3>4. Verify All Webhooks</h3>
      <pre><code className="language-javascript">{`// Always verify signature before processing
if (!fakepe.webhooks.verify(req.body, signature)) {
  logger.warn('Invalid webhook signature');
  return res.status(400).send('Invalid');
}

// Then process the webhook`}</code></pre>

      <h2>Complete Example</h2>
      <p>Check out the <code>examples/</code> directory in the <a href="https://github.com/Mihir-Rabari/fakePE-sdk" target="_blank">SDK repository</a>:</p>
      <ul>
        <li><code>basic-payment.js</code> - Simple payment creation</li>
        <li><code>upi-payment.js</code> - Complete UPI flow</li>
        <li><code>webhook-server.js</code> - Webhook handling</li>
      </ul>

      <h2>TypeScript Support</h2>
      <p>Type definitions are included in the package:</p>
      <pre><code className="language-typescript">{`import FakePE from 'fakepe-sdk';

const fakepe = new FakePE({
  key_id: 'key',
  key_secret: 'secret'
});

// Full type support
const payment: Payment = await fakepe.payments.create({
  merchantId: 'mer_123',
  amount: 50000,
  orderId: 'order_001'
});`}</code></pre>
    </div>
  );
}
