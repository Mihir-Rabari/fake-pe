import React from 'react';

export default function SDKGuide() {
  return (
    <div className="prose prose-slate max-w-none">
      <h1>SDK Guide</h1>
      
      <p className="lead">
        Complete guide for using the fakepe-sdk Node.js package.
      </p>

      <h2>Installation</h2>
      
      <pre><code className="language-bash">npm install fakepe-sdk</code></pre>

      <h2>Initialization</h2>
      
      <pre><code className="language-javascript">{`const FakePE = require('fakepe-sdk');

const fakepe = new FakePE({
  key_id: 'your_key_id',
  key_secret: 'your_key_secret',
  baseUrl: 'http://localhost:4000'  // Optional
});`}</code></pre>

      <h2>Payments</h2>

      <h3>Create Payment</h3>
      
      <pre><code className="language-javascript">{`const payment = await fakepe.payments.create({
  merchantId: 'mer_123',
  amount: 50000,  // in paise (₹500)
  orderId: 'order_001',
  callbackUrl: 'https://yoursite.com/webhook'
});

console.log(payment.paymentId);
console.log(payment.paymentUrl);`}</code></pre>

      <h3>Fetch Payment</h3>
      
      <pre><code className="language-javascript">{`const payment = await fakepe.payments.fetch('pay_xyz789');
console.log(payment.status);`}</code></pre>

      <h3>List Payments</h3>
      
      <pre><code className="language-javascript">{`const result = await fakepe.payments.list({
  merchantId: 'mer_123',
  status: 'COMPLETED',
  limit: 10
});

console.log(result.payments);`}</code></pre>

      <h3>Refund Payment</h3>
      
      <pre><code className="language-javascript">{`await fakepe.payments.refund('pay_xyz789', {
  amount: 25000,  // Optional for partial refund
  reason: 'Customer request'
});`}</code></pre>

      <h2>UPI</h2>

      <h3>Create VPA</h3>
      
      <pre><code className="language-javascript">{`await fakepe.upi.createVpa({
  userId: 'usr_123',
  vpa: 'user@fakepe'
});`}</code></pre>

      <h3>Generate QR Code</h3>
      
      <pre><code className="language-javascript">{`const qr = await fakepe.upi.generateQr('pay_xyz789');
console.log(qr.upiIntent);
console.log(qr.qrCodeData);`}</code></pre>

      <h3>Complete UPI Flow</h3>
      
      <pre><code className="language-javascript">{`// 1. Initiate payment
const txn = await fakepe.upi.initiate({
  paymentId: 'pay_xyz789',
  payerVpa: 'user@fakepe'
});

// 2. Confirm with PIN
const result = await fakepe.upi.confirm({
  txnId: txn.txnId,
  pin: '1234'
});

console.log(result.status);  // SUCCESS`}</code></pre>

      <h2>Wallets</h2>

      <h3>Get Balance</h3>
      
      <pre><code className="language-javascript">{`const wallet = await fakepe.wallets.getBalance('usr_123');
console.log(wallet.balance);`}</code></pre>

      <h3>Top Up</h3>
      
      <pre><code className="language-javascript">{`await fakepe.wallets.topup({
  userId: 'usr_123',
  amount: 100000  // ₹1000
});`}</code></pre>

      <h3>Transfer</h3>
      
      <pre><code className="language-javascript">{`await fakepe.wallets.transfer({
  from: 'usr_123',
  to: 'usr_456',
  amount: 50000
});`}</code></pre>

      <h2>Webhooks</h2>

      <h3>Verify Signature</h3>
      
      <pre><code className="language-javascript">{`app.post('/webhook', (req, res) => {
  const signature = req.headers['x-fakepe-signature'];
  
  if (!fakepe.webhooks.verify(req.body, signature)) {
    return res.status(400).send('Invalid signature');
  }
  
  const { event, data } = req.body;
  
  if (event === 'payment.completed') {
    console.log('Payment completed:', data.paymentId);
  }
  
  res.status(200).send('OK');
});`}</code></pre>

      <h2 id="examples">Examples</h2>
      
      <p>Check out the example files in the SDK repository:</p>

      <ul>
        <li><code>examples/basic-payment.js</code> - Simple payment creation</li>
        <li><code>examples/upi-payment.js</code> - Complete UPI flow</li>
        <li><code>examples/webhook-server.js</code> - Webhook handling</li>
      </ul>

      <h2>Error Handling</h2>
      
      <pre><code className="language-javascript">{`try {
  const payment = await fakepe.payments.create({
    merchantId: 'mer_123',
    amount: 50000,
    orderId: 'order_001'
  });
} catch (error) {
  console.error(error.message);
  if (error.response) {
    console.error(error.response.status);
    console.error(error.response.data);
  }
}`}</code></pre>

      <h2>Best Practices</h2>
      
      <ul>
        <li>Store credentials in environment variables</li>
        <li>Always verify webhook signatures</li>
        <li>Handle errors gracefully</li>
        <li>Use idempotency keys for important operations</li>
      </ul>

      <h2>TypeScript Support</h2>
      
      <p>Type definitions are included in the package:</p>

      <pre><code className="language-typescript">{`import FakePE from 'fakepe-sdk';

const fakepe = new FakePE({
  key_id: 'key',
  key_secret: 'secret'
});

const payment: Payment = await fakepe.payments.create({
  merchantId: 'mer_123',
  amount: 50000,
  orderId: 'order_001'
});`}</code></pre>
    </div>
  );
}
