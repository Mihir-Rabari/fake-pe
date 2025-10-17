import React from 'react';
import { AlertCircle } from 'lucide-react';
import CodeBlock from './CodeBlock';

export default function WebhooksSection({ copyCode, copiedCode }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Webhooks</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Receive real-time notifications about payment events</p>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">🔔 Why Use Webhooks?</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
          <li>✓ Real-time payment status updates</li>
          <li>✓ No need to poll for status changes</li>
          <li>✓ Automatic retry on failure</li>
          <li>✓ Secure HMAC signature verification</li>
        </ul>
      </div>

      {/* Setup Webhook */}
      <div className="border-l-4 border-blue-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Setup Webhook Handler</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Create an endpoint to receive webhook notifications:</p>
        <CodeBlock 
          code={`const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-fakepe-signature'];
  
  // Verify webhook signature
  if (!fakepe.webhooks.verify(req.body, signature)) {
    console.error('Invalid signature');
    return res.status(400).send('Invalid signature');
  }
  
  // Process webhook events
  const { event, data } = req.body;
  
  switch(event) {
    case 'payment.completed':
      console.log('✓ Payment completed:', data.paymentId);
      // Update database, send confirmation email
      break;
      
    case 'payment.failed':
      console.log('✗ Payment failed:', data.paymentId);
      // Notify customer, log failure
      break;
      
    case 'payment.refunded':
      console.log('↩ Payment refunded:', data.paymentId);
      // Update order status
      break;
  }
  
  res.status(200).send('OK');
});

app.listen(3000);`}
          onCopy={() => copyCode('webhook-setup', 'wh1')}
          copied={copiedCode === 'wh1'}
        />
      </div>

      {/* Webhook Events */}
      <div className="border-l-4 border-green-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Webhook Events</h2>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left p-3 font-semibold">Event</th>
                <th className="text-left p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="p-3"><code className="text-blue-600">payment.completed</code></td>
                <td className="p-3 text-gray-600 dark:text-gray-400">Payment successfully completed</td>
              </tr>
              <tr>
                <td className="p-3"><code className="text-blue-600">payment.failed</code></td>
                <td className="p-3 text-gray-600 dark:text-gray-400">Payment failed or declined</td>
              </tr>
              <tr>
                <td className="p-3"><code className="text-blue-600">payment.refunded</code></td>
                <td className="p-3 text-gray-600 dark:text-gray-400">Payment refunded to customer</td>
              </tr>
              <tr>
                <td className="p-3"><code className="text-blue-600">payment.pending</code></td>
                <td className="p-3 text-gray-600 dark:text-gray-400">Payment initiated by customer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Webhook Payload */}
      <div className="border-l-4 border-purple-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Webhook Payload Example</h2>
        <CodeBlock 
          code={`{
  "event": "payment.completed",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "data": {
    "paymentId": "pay_abc123xyz",
    "merchantId": "mer_123",
    "orderId": "order_001",
    "amount": 50000,
    "method": "UPI",
    "status": "COMPLETED",
    "completedAt": "2024-01-15T10:30:45.000Z"
  }
}`}
          onCopy={() => copyCode('webhook-payload', 'wh2')}
          copied={copiedCode === 'wh2'}
          language="json"
        />
      </div>

      {/* Verify Signature */}
      <div className="border-l-4 border-indigo-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Generate Test Signature</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">For testing webhook handlers:</p>
        <CodeBlock 
          code={`const payload = {
  event: 'payment.completed',
  data: { paymentId: 'pay_123' }
};

const signature = fakepe.webhooks.generateSignature(payload);
console.log('Test signature:', signature);`}
          onCopy={() => copyCode('gen-sig', 'wh3')}
          copied={copiedCode === 'wh3'}
        />
      </div>

      {/* Security Warning */}
      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-200">Security: Always Verify Signatures</h3>
            <p className="text-red-800 dark:text-red-300 text-sm mt-1">
              Never process webhook data without verifying the signature. This prevents unauthorized webhook calls and ensures data integrity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
