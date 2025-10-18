import React from 'react';
import DocPage from '../../components/docs/DocPage';
import CodeBlock from '../../components/docs/CodeBlock-new';
import Callout from '../../components/docs/Callout';

export default function ApiUsage() {
  return (
    <DocPage
      title="API Usage Guide"
      description="Learn how to integrate FakePE's payment gateway API into your application without self-hosting."
    >

      <Callout type="success" title="Quick Start">
        Get your API keys and start accepting payments in minutes.
      </Callout>

      <h2 id="getting-started">Getting Started</h2>

      <h3>1. Create an Account</h3>
      
      <p>Sign up for a FakePE merchant account:</p>

      <ol>
        <li>Visit <code>https://fakepe.example.com</code> (or your hosted instance)</li>
        <li>Click "Sign Up" and create your merchant account</li>
        <li>Verify your email address</li>
        <li>Complete your profile</li>
      </ol>

      <h3>2. Get Your API Keys</h3>
      
      <p>After logging in:</p>

      <ol>
        <li>Navigate to <strong>Settings → API Keys</strong></li>
        <li>Click "Generate New Key Pair"</li>
        <li>Save your <code>key_id</code> and <code>key_secret</code> securely</li>
      </ol>

      <Callout type="warning" title="Security">
        Never expose your <code>key_secret</code> in client-side code or public repositories.
      </Callout>

      <h2 id="authentication">Authentication</h2>
      
      <p>All API requests require HTTP Basic Authentication using your API keys:</p>

      <CodeBlock
        language="http"
        code={`Authorization: Basic base64(key_id:key_secret)`}
      />

      <h3>Example (JavaScript/Node.js)</h3>
      
      <CodeBlock
        language="javascript"
        code={`const axios = require('axios');

const API_URL = 'https://api.fakepe.example.com/api/v1';
const KEY_ID = 'your_key_id';
const KEY_SECRET = 'your_key_secret';

// Create Basic Auth header
const auth = {
  username: KEY_ID,
  password: KEY_SECRET
};

// Make authenticated request
const response = await axios.get(\`\${API_URL}/payments\`, { auth });`}
      />

      <h3>Example (Python)</h3>
      
      <CodeBlock
        language="python"
        code={`import requests
from requests.auth import HTTPBasicAuth

API_URL = 'https://api.fakepe.example.com/api/v1'
KEY_ID = 'your_key_id'
KEY_SECRET = 'your_key_secret'

response = requests.get(
    f'{API_URL}/payments',
    auth=HTTPBasicAuth(KEY_ID, KEY_SECRET)
)`}
      />

      <h3>Example (cURL)</h3>
      
      <CodeBlock
        language="bash"
        code={`curl -u key_id:key_secret \\
  https://api.fakepe.example.com/api/v1/payments`}
      />

      <h2 id="creating-payment">Creating a Payment</h2>

      <p>To accept a payment, you'll create a payment order on your backend and redirect the customer to complete it.</p>

      <h3>Step 1: Create Payment Order (Backend)</h3>
      
      <CodeBlock
        language="javascript"
        code={`// server.js (Node.js/Express)
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/create-order', async (req, res) => {
  const { amount, orderId } = req.body;

  try {
    const response = await axios.post(
      'https://api.fakepe.example.com/api/v1/payments',
      {
        merchantId: 'mer_your_merchant_id',
        amount: amount, // in paise (₹500 = 50000)
        orderId: orderId,
        callbackUrl: 'https://yoursite.com/payment/callback'
      },
      {
        auth: {
          username: process.env.FAKEPE_KEY_ID,
          password: process.env.FAKEPE_KEY_SECRET
        }
      }
    );

    // Send payment URL to frontend
    res.json({
      paymentId: response.data.paymentId,
      paymentUrl: response.data.paymentUrl,
      qrData: response.data.qrData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`}
      />

      <h3>Step 2: Redirect Customer (Frontend)</h3>
      
      <CodeBlock
        language="javascript"
        code={`// frontend (React/JavaScript)
async function handleCheckout() {
  const response = await fetch('/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: 50000, // ₹500
      orderId: 'order_' + Date.now()
    })
  });

  const data = await response.json();
  
  // Redirect to payment page
  window.location.href = data.paymentUrl;
  
  // OR display QR code
  showQRCode(data.qrData);
}`}
      />

      <h3>Step 3: Handle Callback</h3>
      
      <CodeBlock
        language="javascript"
        code={`// Webhook endpoint
app.post('/payment/callback', async (req, res) => {
  const signature = req.headers['x-fakepe-signature'];
  const payload = req.body;

  // Verify webhook signature
  if (!verifySignature(payload, signature)) {
    return res.status(400).send('Invalid signature');
  }

  const { event, data } = payload;

  if (event === 'payment.completed') {
    // Payment successful - fulfill order
    await fulfillOrder(data.orderId);
    console.log(\`Payment \${data.paymentId} completed\`);
  } else if (event === 'payment.failed') {
    // Payment failed - notify user
    console.log(\`Payment \${data.paymentId} failed\`);
  }

  res.status(200).send('OK');
});

function verifySignature(payload, signature) {
  const crypto = require('crypto');
  const secret = process.env.WEBHOOK_SECRET;
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return signature === expectedSignature;
}`}
      />

      <h2 id="using-sdk">Using the SDK</h2>

      <p>For easier integration, use our official SDK:</p>

      <h3>Installation</h3>
      
      <CodeBlock
        language="bash"
        code="npm install fakepe-sdk"
      />

      <h3>Basic Usage</h3>
      
      <CodeBlock
        language="javascript"
        code={`const FakePE = require('fakepe-sdk');

const fakepe = new FakePE({
  key_id: process.env.FAKEPE_KEY_ID,
  key_secret: process.env.FAKEPE_KEY_SECRET,
  baseUrl: 'https://api.fakepe.example.com' // Optional
});

// Create payment
const payment = await fakepe.payments.create({
  merchantId: 'mer_your_id',
  amount: 50000,
  orderId: 'order_123',
  callbackUrl: 'https://yoursite.com/callback'
});

console.log(payment.paymentUrl);

// Check payment status
const status = await fakepe.payments.fetch(payment.paymentId);
console.log(status.status); // CREATED, PENDING, COMPLETED, FAILED

// Refund payment
await fakepe.payments.refund(payment.paymentId, {
  amount: 25000, // Partial refund
  reason: 'Customer request'
});`}
      />

      <h2 id="examples">Complete Integration Examples</h2>

      <h3>Example 1: E-commerce Checkout</h3>
      
      <CodeBlock
        language="javascript"
        code={`// Express.js backend
const express = require('express');
const FakePE = require('fakepe-sdk');

const app = express();
const fakepe = new FakePE({
  key_id: process.env.FAKEPE_KEY_ID,
  key_secret: process.env.FAKEPE_KEY_SECRET
});

app.post('/checkout', async (req, res) => {
  const { cartItems, userId } = req.body;
  
  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  
  // Create order in your database
  const order = await Order.create({
    userId,
    items: cartItems,
    total,
    status: 'PENDING'
  });

  // Create payment
  const payment = await fakepe.payments.create({
    merchantId: 'mer_yourstore',
    amount: total * 100, // Convert to paise
    orderId: order.id,
    callbackUrl: \`https://yoursite.com/webhook\`,
    metadata: {
      userId,
      orderNumber: order.orderNumber
    }
  });

  res.json({
    orderId: order.id,
    paymentUrl: payment.paymentUrl,
    qrCode: payment.qrData
  });
});

// Webhook handler
app.post('/webhook', async (req, res) => {
  const { event, data } = req.body;

  if (event === 'payment.completed') {
    // Update order status
    await Order.update(data.orderId, { 
      status: 'PAID',
      paymentId: data.paymentId 
    });

    // Send confirmation email
    await sendEmail({
      to: data.metadata.userId,
      subject: 'Order Confirmed',
      template: 'order-confirmation'
    });

    // Update inventory
    await updateInventory(data.orderId);
  }

  res.status(200).send('OK');
});`}
      />

      <h3>Example 2: Subscription Payment</h3>
      
      <CodeBlock
        language="javascript"
        code={`const cron = require('node-cron');

// Run every day at midnight
cron.schedule('0 0 * * *', async () => {
  const subscriptions = await Subscription.findDueForRenewal();

  for (const sub of subscriptions) {
    try {
      const payment = await fakepe.payments.create({
        merchantId: 'mer_yourservice',
        amount: sub.plan.price * 100,
        orderId: \`sub_\${sub.id}_\${Date.now()}\`,
        callbackUrl: 'https://yoursite.com/webhook',
        metadata: {
          subscriptionId: sub.id,
          userId: sub.userId,
          type: 'subscription_renewal'
        }
      });

      // Send payment link to user
      await sendEmail({
        to: sub.user.email,
        subject: 'Subscription Renewal',
        paymentUrl: payment.paymentUrl
      });

      sub.lastBillingAttempt = new Date();
      await sub.save();
    } catch (error) {
      console.error(\`Failed to bill subscription \${sub.id}:\`, error);
    }
  }
});`}
      />

      <h3>Example 3: Marketplace Split Payment</h3>
      
      <CodeBlock
        language="javascript"
        code={`// Marketplace with seller payouts
app.post('/create-marketplace-payment', async (req, res) => {
  const { sellerId, amount, orderId } = req.body;

  // Create payment
  const payment = await fakepe.payments.create({
    merchantId: 'mer_marketplace',
    amount: amount * 100,
    orderId,
    callbackUrl: 'https://marketplace.com/webhook',
    metadata: {
      sellerId,
      platformFee: amount * 0.1, // 10% fee
      sellerAmount: amount * 0.9
    }
  });

  res.json({ paymentUrl: payment.paymentUrl });
});

// Webhook - handle seller payout
app.post('/webhook', async (req, res) => {
  const { event, data } = req.body;

  if (event === 'payment.completed') {
    const { sellerId, sellerAmount } = data.metadata;

    // Transfer to seller's wallet
    await fakepe.wallets.transfer({
      from: 'marketplace_wallet',
      to: sellerId,
      amount: sellerAmount * 100
    });

    // Record transaction
    await Transaction.create({
      type: 'SELLER_PAYOUT',
      sellerId,
      amount: sellerAmount,
      paymentId: data.paymentId
    });
  }

  res.status(200).send('OK');
});`}
      />

      <h2 id="testing">Testing Your Integration</h2>

      <h3>Test Mode</h3>
      
      <p>Use test API keys for development:</p>

      <CodeBlock
        language="javascript"
        code={`const fakepe = new FakePE({
  key_id: 'test_key_id',
  key_secret: 'test_key_secret',
  baseUrl: 'https://sandbox.fakepe.example.com'
});`}
      />

      <h3>Test Data</h3>
      
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Value</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>VPA</td>
            <td><code>success@fakepe</code></td>
            <td>Payment succeeds</td>
          </tr>
          <tr>
            <td>VPA</td>
            <td><code>fail@fakepe</code></td>
            <td>Payment fails</td>
          </tr>
          <tr>
            <td>PIN</td>
            <td>Any 4-6 digits</td>
            <td>Accepted</td>
          </tr>
          <tr>
            <td>Amount</td>
            <td><code>100</code></td>
            <td>₹1.00</td>
          </tr>
        </tbody>
      </table>

      <h3>Testing Webhooks Locally</h3>
      
      <p>Use ngrok to test webhooks on localhost:</p>

      <CodeBlock
        language="bash"
        code={`# Install ngrok
npm install -g ngrok

# Start your server
node server.js

# Expose to internet
ngrok http 3000

# Use the ngrok URL as your callbackUrl
# https://abc123.ngrok.io/webhook`}
      />

      <h2 id="error-handling">Error Handling</h2>

      <h3>Common Errors</h3>
      
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Error</th>
            <th>Solution</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>401</td>
            <td>Invalid credentials</td>
            <td>Check your API keys</td>
          </tr>
          <tr>
            <td>400</td>
            <td>Bad request</td>
            <td>Verify request parameters</td>
          </tr>
          <tr>
            <td>404</td>
            <td>Payment not found</td>
            <td>Check payment ID</td>
          </tr>
          <tr>
            <td>422</td>
            <td>Validation error</td>
            <td>Check required fields</td>
          </tr>
          <tr>
            <td>429</td>
            <td>Rate limit exceeded</td>
            <td>Slow down requests</td>
          </tr>
        </tbody>
      </table>

      <h3>Error Handling Example</h3>
      
      <CodeBlock
        language="javascript"
        code={`try {
  const payment = await fakepe.payments.create({
    merchantId: 'mer_123',
    amount: 50000,
    orderId: 'order_001'
  });
} catch (error) {
  if (error.response) {
    // Server responded with error
    console.error('Status:', error.response.status);
    console.error('Error:', error.response.data.error);
    
    switch (error.response.status) {
      case 400:
        // Handle bad request
        break;
      case 401:
        // Handle authentication error
        break;
      case 422:
        // Handle validation error
        break;
      default:
        // Handle other errors
    }
  } else {
    // Network error
    console.error('Network error:', error.message);
  }
}`}
      />

      <h2 id="rate-limits">Rate Limits</h2>
      
      <table>
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Limit</th>
            <th>Window</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Create Payment</td>
            <td>100 requests</td>
            <td>Per minute</td>
          </tr>
          <tr>
            <td>Get Payment</td>
            <td>1000 requests</td>
            <td>Per minute</td>
          </tr>
          <tr>
            <td>List Payments</td>
            <td>100 requests</td>
            <td>Per minute</td>
          </tr>
          <tr>
            <td>Refund</td>
            <td>50 requests</td>
            <td>Per minute</td>
          </tr>
        </tbody>
      </table>

      <h2 id="best-practices">Best Practices</h2>

      <ul>
        <li><strong>Security</strong>
          <ul>
            <li>Never expose API keys in frontend code</li>
            <li>Use environment variables for secrets</li>
            <li>Always verify webhook signatures</li>
            <li>Use HTTPS for all API calls</li>
          </ul>
        </li>
        <li><strong>Performance</strong>
          <ul>
            <li>Cache payment status when possible</li>
            <li>Use webhooks instead of polling</li>
            <li>Implement request timeouts</li>
            <li>Retry failed requests with exponential backoff</li>
          </ul>
        </li>
        <li><strong>Reliability</strong>
          <ul>
            <li>Store webhook events in your database</li>
            <li>Implement idempotency for critical operations</li>
            <li>Log all API interactions</li>
            <li>Monitor payment success rates</li>
          </ul>
        </li>
      </ul>

      <h2>Next Steps</h2>
      
      <ul>
        <li><a href="/docs/api">Complete API Reference</a></li>
        <li><a href="/docs/sdk">SDK Documentation</a></li>
        <li><a href="/docs/webhooks">Webhook Guide</a></li>
        <li><a href="/docs/examples">More Code Examples</a></li>
      </ul>
    </DocPage>
  );
}
