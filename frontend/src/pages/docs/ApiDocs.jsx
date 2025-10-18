import React from 'react';
import DocPage from '../../components/docs/DocPage';
import CodeBlock from '../../components/docs/CodeBlock-new';
import Callout from '../../components/docs/Callout';

export default function ApiDocs() {
  return (
    <DocPage
      title="API Reference"
      description="Complete API documentation for the FakePE Payment Gateway."
    >

      <h2>Base URL</h2>
      
      <CodeBlock
        code="http://localhost:4000/api/v1"
      />

      <h2>Authentication</h2>
      
      <p>All API requests require HTTP Basic Authentication:</p>

      <CodeBlock
        language="bash"
        code="Authorization: Basic base64(key_id:key_secret)"
      />
      
      <Callout type="warning" title="Keep Your Secrets Safe">
        Never expose your <code>key_secret</code> in client-side code or public repositories.
      </Callout>

      <h2 id="payments">Payments API</h2>

      <h3>Create Payment</h3>
      
      <p>Create a new payment request.</p>

      <div className="not-prose mb-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">POST</span>
        <code className="ml-2">/payments</code>
      </div>

      <p><strong>Request Body:</strong></p>

      <pre><code className="language-json">{`{
  "merchantId": "mer_123",
  "amount": 50000,
  "orderId": "order_abc123",
  "callbackUrl": "https://yourapp.com/webhook"
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
      
      <p>Retrieve payment details by ID.</p>

      <div className="not-prose mb-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">GET</span>
        <code className="ml-2">/payments/:paymentId</code>
      </div>

      <h3>List Payments</h3>
      
      <p>Get a list of payments with optional filters.</p>

      <div className="not-prose mb-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">GET</span>
        <code className="ml-2">/payments</code>
      </div>

      <p><strong>Query Parameters:</strong></p>

      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>merchantId</code></td>
            <td>string</td>
            <td>Filter by merchant ID</td>
          </tr>
          <tr>
            <td><code>status</code></td>
            <td>string</td>
            <td>CREATED, PENDING, COMPLETED, FAILED</td>
          </tr>
          <tr>
            <td><code>limit</code></td>
            <td>number</td>
            <td>Results per page (default: 10)</td>
          </tr>
          <tr>
            <td><code>offset</code></td>
            <td>number</td>
            <td>Pagination offset (default: 0)</td>
          </tr>
        </tbody>
      </table>

      <h3>Refund Payment</h3>
      
      <p>Issue a full or partial refund.</p>

      <div className="not-prose mb-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">POST</span>
        <code className="ml-2">/payments/:paymentId/refund</code>
      </div>

      <pre><code className="language-json">{`{
  "amount": 25000,  // Optional, defaults to full refund
  "reason": "Customer request"
}`}</code></pre>

      <h2 id="upi">UPI API</h2>

      <h3>Create VPA</h3>
      
      <p>Create a new Virtual Payment Address.</p>

      <div className="not-prose mb-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">POST</span>
        <code className="ml-2">/upi/vpa</code>
      </div>

      <pre><code className="language-json">{`{
  "userId": "usr_123",
  "vpa": "user@fakepe"
}`}</code></pre>

      <h3>Generate QR Code</h3>
      
      <p>Generate a UPI QR code for payment.</p>

      <div className="not-prose mb-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">GET</span>
        <code className="ml-2">/upi/qr/:paymentId</code>
      </div>

      <h3>Initiate UPI Payment</h3>
      
      <p>Start a UPI payment transaction.</p>

      <div className="not-prose mb-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">POST</span>
        <code className="ml-2">/upi/initiate</code>
      </div>

      <pre><code className="language-json">{`{
  "paymentId": "pay_xyz789",
  "payerVpa": "user@fakepe"
}`}</code></pre>

      <h3>Confirm UPI Payment</h3>
      
      <p>Confirm payment with PIN.</p>

      <div className="not-prose mb-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">POST</span>
        <code className="ml-2">/upi/confirm</code>
      </div>

      <pre><code className="language-json">{`{
  "txnId": "UPI2024011512345678",
  "pin": "1234"
}`}</code></pre>

      <h2 id="wallets">Wallet API</h2>

      <h3>Get Balance</h3>
      
      <p>Check wallet balance.</p>

      <div className="not-prose mb-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">GET</span>
        <code className="ml-2">/wallets/:userId</code>
      </div>

      <h3>Top Up Wallet</h3>
      
      <p>Add funds to wallet.</p>

      <div className="not-prose mb-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">POST</span>
        <code className="ml-2">/wallets/topup</code>
      </div>

      <pre><code className="language-json">{`{
  "userId": "usr_123",
  "amount": 100000  // ₹1000 in paise
}`}</code></pre>

      <h3>Transfer Funds</h3>
      
      <p>Transfer between wallets.</p>

      <div className="not-prose mb-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">POST</span>
        <code className="ml-2">/wallets/transfer</code>
      </div>

      <pre><code className="language-json">{`{
  "from": "usr_123",
  "to": "usr_456",
  "amount": 50000
}`}</code></pre>

      <h2>Error Responses</h2>
      
      <p>All errors follow a consistent format:</p>

      <pre><code className="language-json">{`{
  "error": "Error message",
  "statusCode": 400
}`}</code></pre>

      <p><strong>Common Status Codes:</strong></p>

      <ul>
        <li><code>400</code> - Bad Request</li>
        <li><code>401</code> - Unauthorized</li>
        <li><code>404</code> - Not Found</li>
        <li><code>422</code> - Validation Error</li>
        <li><code>500</code> - Internal Server Error</li>
      </ul>
    </DocPage>
  );
}
