export default function ApiDocs() {
  return (
    <div className="prose prose-indigo max-w-none">
      <h1>API Reference</h1>
      <p className="lead">
        Complete API documentation for FakePE Payment Gateway.
      </p>

      <h2>Base URL</h2>
      <pre><code>http://localhost:4000/api/v1</code></pre>

      <h2>Authentication</h2>
      <p>Most endpoints require HTTP Basic Authentication using API keys:</p>
      <pre><code className="language-bash">{`Authorization: Basic base64(key_id:key_secret)`}</code></pre>

      <h2>Payments API</h2>

      <h3>Create Payment</h3>
      <div className="bg-gray-50 p-4 rounded">
        <code className="text-green-600">POST</code> <code>/payments</code>
      </div>

      <p><strong>Request Body:</strong></p>
      <pre><code className="language-json">{`{
  "merchantId": "mer_123",
  "amount": 50000,
  "orderId": "order_abc123",
  "callbackUrl": "https://yourapp.com/webhook",
  "metadata": {
    "customer_name": "John Doe"
  }
}`}</code></pre>

      <p><strong>Response:</strong></p>
      <pre><code className="language-json">{`{
  "paymentId": "pay_xyz789",
  "paymentUrl": "http://localhost:3000/pay/pay_xyz789",
  "qrData": "data:image/png;base64,...",
  "status": "CREATED",
  "amount": 50000
}`}</code></pre>

      <h3>Get Payment</h3>
      <div className="bg-gray-50 p-4 rounded">
        <code className="text-blue-600">GET</code> <code>/payments/:paymentId</code>
      </div>

      <h3>List Payments</h3>
      <div className="bg-gray-50 p-4 rounded">
        <code className="text-blue-600">GET</code> <code>/payments?merchantId=mer_123&status=COMPLETED</code>
      </div>

      <h3>Refund Payment</h3>
      <div className="bg-gray-50 p-4 rounded">
        <code className="text-green-600">POST</code> <code>/payments/:paymentId/refund</code>
      </div>

      <h2>UPI API</h2>

      <h3>Create UPI VPA</h3>
      <div className="bg-gray-50 p-4 rounded">
        <code className="text-green-600">POST</code> <code>/upi/vpa</code>
      </div>

      <pre><code className="language-json">{`{
  "userId": "usr_123",
  "vpa": "user@fakepe"
}`}</code></pre>

      <h3>Generate UPI QR</h3>
      <div className="bg-gray-50 p-4 rounded">
        <code className="text-blue-600">GET</code> <code>/upi/qr/:paymentId</code>
      </div>

      <p><strong>Response:</strong></p>
      <pre><code className="language-json">{`{
  "upiIntent": "upi://pay?pa=merchant@fakepe&pn=Merchant&am=500.00...",
  "qrCodeData": "data:image/png;base64,...",
  "payeeVpa": "merchant@fakepe",
  "amount": 50000
}`}</code></pre>

      <h3>Initiate UPI Payment</h3>
      <div className="bg-gray-50 p-4 rounded">
        <code className="text-green-600">POST</code> <code>/upi/initiate</code>
      </div>

      <pre><code className="language-json">{`{
  "paymentId": "pay_xyz789",
  "payerVpa": "user@fakepe"
}`}</code></pre>

      <h3>Confirm UPI Payment</h3>
      <div className="bg-gray-50 p-4 rounded">
        <code className="text-green-600">POST</code> <code>/upi/confirm</code>
      </div>

      <pre><code className="language-json">{`{
  "txnId": "UPI2024011512345678",
  "pin": "1234"
}`}</code></pre>

      <h3>Get Transaction History</h3>
      <div className="bg-gray-50 p-4 rounded">
        <code className="text-blue-600">GET</code> <code>/upi/history/:userId?limit=20</code>
      </div>

      <h2>Wallet API</h2>

      <h3>Get Balance</h3>
      <div className="bg-gray-50 p-4 rounded">
        <code className="text-blue-600">GET</code> <code>/wallets/:userId</code>
      </div>

      <h3>Top Up Wallet</h3>
      <div className="bg-gray-50 p-4 rounded">
        <code className="text-green-600">POST</code> <code>/wallets/topup</code>
      </div>

      <pre><code className="language-json">{`{
  "userId": "usr_123",
  "amount": 100000
}`}</code></pre>

      <h3>Transfer Funds</h3>
      <div className="bg-gray-50 p-4 rounded">
        <code className="text-green-600">POST</code> <code>/wallets/transfer</code>
      </div>

      <pre><code className="language-json">{`{
  "from": "usr_123",
  "to": "usr_456",
  "amount": 50000
}`}</code></pre>

      <h2>Webhooks</h2>

      <h3>Webhook Payload</h3>
      <p>When a payment event occurs, FakePE sends a POST request to your callback URL:</p>

      <p><strong>Headers:</strong></p>
      <ul>
        <li><code>X-FakePE-Signature</code> - HMAC SHA256 signature</li>
        <li><code>X-FakePE-Event</code> - Event type</li>
      </ul>

      <p><strong>Payload:</strong></p>
      <pre><code className="language-json">{`{
  "event": "payment.completed",
  "data": {
    "paymentId": "pay_xyz789",
    "merchantId": "mer_123",
    "amount": 50000,
    "status": "COMPLETED",
    "completedAt": "2024-01-15T10:36:00.000Z"
  },
  "created_at": 1705317360
}`}</code></pre>

      <p><strong>Event Types:</strong></p>
      <ul>
        <li><code>payment.created</code> - Payment order created</li>
        <li><code>payment.pending</code> - Payment initiated</li>
        <li><code>payment.completed</code> - Payment successful</li>
        <li><code>payment.failed</code> - Payment failed</li>
        <li><code>payment.refunded</code> - Payment refunded</li>
      </ul>

      <h3>Verify Webhook</h3>
      <pre><code className="language-javascript">{`const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}`}</code></pre>

      <h2>Error Responses</h2>

      <p><strong>Format:</strong></p>
      <pre><code className="language-json">{`{
  "error": "Error message describing what went wrong"
}`}</code></pre>

      <p><strong>Status Codes:</strong></p>
      <ul>
        <li><code>400</code> - Bad Request</li>
        <li><code>401</code> - Unauthorized</li>
        <li><code>402</code> - Payment Required (insufficient funds)</li>
        <li><code>404</code> - Not Found</li>
        <li><code>409</code> - Conflict (duplicate)</li>
        <li><code>500</code> - Internal Server Error</li>
      </ul>

      <h2>Rate Limits</h2>
      <ul>
        <li>Payment creation: 100 requests/minute</li>
        <li>General API: 300 requests/minute</li>
        <li>Webhooks: 50 requests/minute</li>
      </ul>

      <h2>Idempotency</h2>
      <p>Use the <code>Idempotency-Key</code> header to safely retry requests:</p>
      <pre><code className="language-bash">{`curl -X POST http://localhost:4000/api/v1/payments \\
  -H "Idempotency-Key: unique-key-123" \\
  -d '{"merchantId":"mer_123","amount":50000}'`}</code></pre>
    </div>
  );
}
