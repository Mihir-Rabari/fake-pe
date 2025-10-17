import React from 'react';
import CodeBlock from './CodeBlock';

export default function PaymentsSection({ copyCode, copiedCode }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Payments API</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Create, retrieve, list, and refund payments</p>
      </div>

      {/* Create Payment */}
      <div className="border-l-4 border-blue-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded text-sm font-mono">POST</span>
          Create Payment
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Creates a new payment request and returns payment URL with QR code.</p>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Endpoint</p>
          <code className="text-blue-600 dark:text-blue-400">POST /api/v1/payments</code>
        </div>

        <CodeBlock 
          code={`const payment = await fakepe.payments.create({
  merchantId: 'mer_123',
  amount: 50000, // ₹500 in paise
  orderId: 'order_' + Date.now(),
  callbackUrl: 'https://yoursite.com/webhook',
  metadata: {
    customer_name: 'John Doe',
    customer_email: 'john@example.com'
  }
});

// Response
{
  paymentId: 'pay_abc123',
  merchantId: 'mer_123',
  amount: 50000,
  status: 'PENDING',
  paymentUrl: 'http://localhost:4000/pay/pay_abc123',
  qrData: 'data:image/png;base64,...',
  createdAt: '2024-01-15T10:30:00.000Z'
}`}
          onCopy={() => copyCode('create-payment', 'pay1')}
          copied={copiedCode === 'pay1'}
        />
      </div>

      {/* Fetch Payment */}
      <div className="border-l-4 border-green-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded text-sm font-mono">GET</span>
          Fetch Payment
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Retrieve details of a specific payment by ID.</p>
        
        <CodeBlock 
          code={`const payment = await fakepe.payments.fetch('pay_abc123');

// Response
{
  paymentId: 'pay_abc123',
  merchantId: 'mer_123',
  amount: 50000,
  orderId: 'order_001',
  status: 'COMPLETED',
  method: 'UPI',
  metadata: { customer_name: 'John Doe' },
  createdAt: '2024-01-15T10:30:00.000Z',
  completedAt: '2024-01-15T10:31:45.000Z'
}`}
          onCopy={() => copyCode('fetch-payment', 'pay2')}
          copied={copiedCode === 'pay2'}
        />
      </div>

      {/* List Payments */}
      <div className="border-l-4 border-purple-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded text-sm font-mono">GET</span>
          List Payments
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Get a paginated list of payments with optional filters.</p>
        
        <CodeBlock 
          code={`const result = await fakepe.payments.list({
  merchantId: 'mer_123',
  status: 'COMPLETED',
  limit: 10,
  offset: 0
});

// Response
{
  payments: [
    { paymentId: 'pay_abc123', amount: 50000, status: 'COMPLETED', ... },
    { paymentId: 'pay_xyz789', amount: 25000, status: 'COMPLETED', ... }
  ],
  total: 156,
  limit: 10,
  offset: 0
}`}
          onCopy={() => copyCode('list-payment', 'pay3')}
          copied={copiedCode === 'pay3'}
        />
      </div>

      {/* Refund Payment */}
      <div className="border-l-4 border-red-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded text-sm font-mono">POST</span>
          Refund Payment
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Issue a full or partial refund for a completed payment.</p>
        
        <CodeBlock 
          code={`const refund = await fakepe.payments.refund('pay_abc123', {
  amount: 25000, // Partial refund ₹250
  reason: 'Customer request'
});

// Response
{
  refundId: 'rfnd_xyz789',
  paymentId: 'pay_abc123',
  amount: 25000,
  reason: 'Customer request',
  status: 'PROCESSED',
  createdAt: '2024-01-15T11:00:00.000Z'
}`}
          onCopy={() => copyCode('refund-payment', 'pay4')}
          copied={copiedCode === 'pay4'}
        />
      </div>

      {/* Payment Status Flow */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
        <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Payment Status Flow</h3>
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full">PENDING</span>
          <span className="text-gray-500">→</span>
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">PROCESSING</span>
          <span className="text-gray-500">→</span>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full">COMPLETED</span>
          <span className="text-gray-500">/</span>
          <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full">FAILED</span>
        </div>
      </div>
    </div>
  );
}
