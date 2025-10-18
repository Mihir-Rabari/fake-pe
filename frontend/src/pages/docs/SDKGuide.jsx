import React from 'react';
import { DocPage, CodeBlock, Callout, Table, TableHead, TableBody, TableRow, TableHeader, TableCell, ApiEndpoint, Card, InfoCard } from '../../components/docs';

export default function SDKGuide() {
  return (
    <DocPage
      title="SDK Guide"
      description="Complete guide for integrating the FakePE SDK into your Node.js applications."
    >

      <Callout type="info" title="Official SDK">
        The FakePE SDK is the easiest way to integrate payment functionality into your application. It handles authentication, request formatting, and error handling automatically.
      </Callout>

      <h2 id="installation">Installation</h2>
      
      <p>Install the SDK using npm or yarn:</p>

      <CodeBlock
        language="bash"
        showLineNumbers={false}
        code="npm install fakepe-sdk"
      />

      <p>Or with Yarn:</p>

      <CodeBlock
        language="bash"
        showLineNumbers={false}
        code="yarn add fakepe-sdk"
      />

      <h2 id="initialization">Initialization</h2>
      
      <p>Initialize the SDK with your API credentials:</p>

      <CodeBlock
        language="javascript"
        filename="app.js"
        showLineNumbers={true}
        highlightLines={[4, 5, 6]}
        code={`const FakePE = require('fakepe-sdk');

// Initialize with your API credentials
const fakepe = new FakePE({
  key_id: 'your_key_id',       // Required: Your API key ID
  key_secret: 'your_key_secret', // Required: Your API secret
  baseUrl: 'http://localhost:4000' // Optional: API endpoint (defaults to production)
});

console.log('SDK initialized successfully!');`}
      />

      <InfoCard title="Getting Your API Keys">
        <ol className="text-sm space-y-2">
          <li>1. Log in to your FakePE dashboard</li>
          <li>2. Navigate to <strong>Settings → API Keys</strong></li>
          <li>3. Click <strong>"Generate New Key"</strong></li>
          <li>4. Copy both <code>key_id</code> and <code>key_secret</code></li>
          <li>5. Store them securely (never commit to version control!)</li>
        </ol>
      </InfoCard>

      <Callout type="warning" title="Keep Secrets Safe">
        Never expose your <code>key_secret</code> in client-side code or commit it to Git. Use environment variables in production!
      </Callout>

      <h3>Environment Variables (Recommended)</h3>

      <CodeBlock
        language="bash"
        filename=".env"
        showLineNumbers={true}
        code={`FAKEPE_KEY_ID=your_key_id
FAKEPE_KEY_SECRET=your_key_secret
FAKEPE_BASE_URL=https://api.fakepe.com`}
      />

      <CodeBlock
        language="javascript"
        filename="app.js"
        showLineNumbers={true}
        highlightLines={[3]}
        code={`require('dotenv').config();

const fakepe = new FakePE({
  key_id: process.env.FAKEPE_KEY_ID,
  key_secret: process.env.FAKEPE_KEY_SECRET,
  baseUrl: process.env.FAKEPE_BASE_URL
});`}
      />

      <h2 id="payments">Payments</h2>

      <p>The Payments API allows you to create, fetch, and manage payment transactions.</p>

      <h3>Create Payment</h3>

      <p>Creates a new payment request and generates a payment URL for the customer.</p>

      <CodeBlock
        language="javascript"
        filename="create-payment.js"
        showLineNumbers={true}
        highlightLines={[2, 3, 4, 5, 6]}
        code={`try {
  const payment = await fakepe.payments.create({
    merchantId: 'mer_123456',      // Your merchant ID
    amount: 50000,                  // Amount in paise (₹500.00)
    orderId: 'order_abc123',        // Your unique order ID
    callbackUrl: 'https://yourapp.com/webhook' // Webhook URL
  });

  console.log('Payment ID:', payment.paymentId);
  console.log('Payment URL:', payment.paymentUrl);
  console.log('QR Code:', payment.qrData);
  
  // Redirect customer to payment.paymentUrl
} catch (error) {
  console.error('Payment creation failed:', error.message);
}`}
      />

      <InfoCard title="💡 Understanding Payment Creation">
        <ul className="text-sm space-y-2">
          <li><strong>Line 3:</strong> Your unique merchant ID from the dashboard</li>
          <li><strong>Line 4:</strong> Amount in paise (multiply by 100: ₹500 = 50000 paise)</li>
          <li><strong>Line 5:</strong> Your internal order reference (must be unique)</li>
          <li><strong>Line 6:</strong> Webhook URL to receive payment status updates</li>
        </ul>
      </InfoCard>

      <h4>Parameters</h4>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Parameter</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Required</TableHeader>
            <TableHeader>Description</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell code>merchantId</TableCell>
            <TableCell>string</TableCell>
            <TableCell>Yes</TableCell>
            <TableCell>Your unique merchant identifier</TableCell>
          </TableRow>
          <TableRow>
            <TableCell code>amount</TableCell>
            <TableCell>number</TableCell>
            <TableCell>Yes</TableCell>
            <TableCell>Amount in paise (1 rupee = 100 paise)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell code>orderId</TableCell>
            <TableCell>string</TableCell>
            <TableCell>Yes</TableCell>
            <TableCell>Your unique order reference</TableCell>
          </TableRow>
          <TableRow>
            <TableCell code>callbackUrl</TableCell>
            <TableCell>string</TableCell>
            <TableCell>No</TableCell>
            <TableCell>Webhook URL for payment notifications</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h4>Response</h4>

      <CodeBlock
        language="json"
        showLineNumbers={true}
        code={`{
  "paymentId": "pay_xyz789abc",
  "paymentUrl": "http://localhost:3000/pay/pay_xyz789abc",
  "qrData": "data:image/png;base64,iVBORw0KG...",
  "status": "CREATED",
  "amount": 50000,
  "merchantId": "mer_123456",
  "orderId": "order_abc123",
  "createdAt": "2024-01-15T10:30:00.000Z"
}`}
      />

      <h3>Fetch Payment</h3>

      <p>Retrieve the current status and details of a payment.</p>

      <CodeBlock
        language="javascript"
        filename="fetch-payment.js"
        showLineNumbers={true}
        highlightLines={[2]}
        code={`try {
  const payment = await fakepe.payments.fetch('pay_xyz789abc');
  
  console.log('Status:', payment.status);
  console.log('Amount:', payment.amount / 100, 'rupees');
  console.log('Created:', new Date(payment.createdAt));
  
  if (payment.status === 'COMPLETED') {
    // Payment successful - fulfill order
    console.log('Payment completed!');
  }
} catch (error) {
  console.error('Failed to fetch payment:', error.message);
}`}
      />

      <h4>Payment Statuses</h4>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Status</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Next Action</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell code>CREATED</TableCell>
            <TableCell>Payment link generated, waiting for customer</TableCell>
            <TableCell>Share payment URL with customer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell code>PENDING</TableCell>
            <TableCell>Customer initiated payment</TableCell>
            <TableCell>Wait for confirmation</TableCell>
          </TableRow>
          <TableRow>
            <TableCell code>COMPLETED</TableCell>
            <TableCell>Payment successful</TableCell>
            <TableCell>Fulfill the order</TableCell>
          </TableRow>
          <TableRow>
            <TableCell code>FAILED</TableCell>
            <TableCell>Payment failed or declined</TableCell>
            <TableCell>Create new payment or notify customer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell code>REFUNDED</TableCell>
            <TableCell>Payment was refunded</TableCell>
            <TableCell>Handle refund in your system</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h3>List Payments</h3>

      <p>Get a paginated list of all payments with optional filters.</p>

      <CodeBlock
        language="javascript"
        filename="list-payments.js"
        showLineNumbers={true}
        highlightLines={[2, 3, 4, 5]}
        code={`try {
  const result = await fakepe.payments.list({
    merchantId: 'mer_123456',
    status: 'COMPLETED',     // Filter by status
    limit: 20,               // Results per page
    offset: 0                // Pagination offset
  });

  console.log(\`Total: \${result.total} payments\`);
  console.log(\`Showing: \${result.payments.length} payments\`);
  
  result.payments.forEach(payment => {
    console.log(\`\${payment.paymentId}: ₹\${payment.amount / 100} - \${payment.status}\`);
  });
} catch (error) {
  console.error('Failed to list payments:', error.message);
}`}
      />

      <h3>Refund Payment</h3>

      <p>Issue a full or partial refund for a completed payment.</p>

      <CodeBlock
        language="javascript"
        filename="refund-payment.js"
        showLineNumbers={true}
        highlightLines={[2, 3, 4]}
        code={`try {
  const refund = await fakepe.payments.refund('pay_xyz789abc', {
    amount: 25000,  // Optional: partial refund (₹250)
                     // Omit for full refund
    reason: 'Customer requested refund'
  });

  console.log('Refund ID:', refund.refundId);
  console.log('Amount refunded:', refund.amount / 100, 'rupees');
  console.log('Status:', refund.status);
} catch (error) {
  console.error('Refund failed:', error.message);
}`}
      />

      <Callout type="warning" title="Refund Limitations">
        <ul className="space-y-1">
          <li>• Refunds can only be issued for COMPLETED payments</li>
          <li>• Partial refunds cannot exceed the original payment amount</li>
          <li>• Processing can take 5-7 business days (in production)</li>
        </ul>
      </Callout>

      <h2 id="webhooks">Webhooks</h2>

      <p>Webhooks allow you to receive real-time notifications when payment status changes.</p>

      <h3>Webhook Handler Example</h3>

      <CodeBlock
        language="javascript"
        filename="webhook-handler.js"
        showLineNumbers={true}
        highlightLines={[8, 9, 10, 11, 12]}
        code={`const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const event = req.body;
  
  console.log('Webhook received:', event.type);
  
  if (event.type === 'payment.completed') {
    const payment = event.data;
    console.log(\`Payment \${payment.paymentId} completed!\`);
    console.log(\`Amount: ₹\${payment.amount / 100}\`);
    console.log(\`Order: \${payment.orderId}\`);
    
    // TODO: Fulfill the order in your database
    // updateOrder(payment.orderId, { status: 'paid' });
  }
  
  if (event.type === 'payment.failed') {
    console.log('Payment failed:', event.data.paymentId);
    // TODO: Notify customer or retry
  }
  
  res.status(200).json({ received: true });
});

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});`}
      />

      <h3>Webhook Security</h3>

      <p>Verify webhook signatures to ensure requests are from FakePE:</p>

      <CodeBlock
        language="javascript"
        filename="verify-webhook.js"
        showLineNumbers={true}
        highlightLines={[4, 5, 6]}
        code={`const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return expectedSignature === signature;
}

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-fakepe-signature'];
  const isValid = verifyWebhook(req.body, signature, process.env.WEBHOOK_SECRET);
  
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Process webhook...
});`}
      />

      <h2 id="error-handling">Error Handling</h2>

      <p>The SDK throws descriptive errors that you should catch and handle appropriately.</p>

      <CodeBlock
        language="javascript"
        filename="error-handling.js"
        showLineNumbers={true}
        highlightLines={[7, 8, 9, 10, 11, 12]}
        code={`async function createPayment(orderData) {
  try {
    const payment = await fakepe.payments.create(orderData);
    return payment;
  } catch (error) {
    // Handle specific errors
    if (error.statusCode === 401) {
      console.error('Authentication failed - check your API keys');
    } else if (error.statusCode === 422) {
      console.error('Validation error:', error.message);
    } else if (error.statusCode === 500) {
      console.error('Server error - try again later');
    } else {
      console.error('Unexpected error:', error.message);
    }
    throw error;
  }
}`}
      />

      <h2 id="best-practices">Best Practices</h2>

      <Card title="💎 Production Tips" variant="primary">
        <ul className="space-y-3">
          <li>
            <strong>Use Environment Variables:</strong> Never hardcode API keys in your source code
          </li>
          <li>
            <strong>Implement Webhooks:</strong> Don't rely solely on polling - use webhooks for real-time updates
          </li>
          <li>
            <strong>Verify Signatures:</strong> Always verify webhook signatures to prevent fraud
          </li>
          <li>
            <strong>Handle Errors Gracefully:</strong> Implement retry logic with exponential backoff
          </li>
          <li>
            <strong>Log Everything:</strong> Keep detailed logs of all payment transactions
          </li>
          <li>
            <strong>Test Thoroughly:</strong> Use test mode extensively before going live
          </li>
        </ul>
      </Card>

      <h2 id="examples">Complete Examples</h2>

      <h3>E-commerce Checkout Flow</h3>

      <CodeBlock
        language="javascript"
        filename="checkout.js"
        showLineNumbers={true}
        highlightLines={[15, 16, 17, 18, 19, 20]}
        code={`const express = require('express');
const FakePE = require('fakepe-sdk');

const app = express();
const fakepe = new FakePE({
  key_id: process.env.FAKEPE_KEY_ID,
  key_secret: process.env.FAKEPE_KEY_SECRET
});

app.post('/checkout', async (req, res) => {
  const { orderId, amount, customerEmail } = req.body;
  
  try {
    // Create payment
    const payment = await fakepe.payments.create({
      merchantId: process.env.MERCHANT_ID,
      amount: amount * 100, // Convert to paise
      orderId: orderId,
      callbackUrl: \`\${process.env.BASE_URL}/webhook\`
    });
    
    // Save to database
    await saveOrderToDatabase({
      orderId,
      paymentId: payment.paymentId,
      amount,
      status: 'PENDING',
      customerEmail
    });
    
    // Return payment URL to frontend
    res.json({
      success: true,
      paymentUrl: payment.paymentUrl,
      paymentId: payment.paymentId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});`}
      />

      <h2>Next Steps</h2>

      <div className="grid md:grid-cols-2 gap-4 not-prose my-8">
        <a href="/docs/api" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">API Reference</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Explore the complete REST API documentation</p>
        </a>

        <a href="/docs/examples" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">More Examples</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">See real-world integration examples</p>
        </a>
      </div>

    </DocPage>
  );
}
