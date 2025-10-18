import React from 'react';
import { Lock, Server, CreditCard, QrCode, Wallet, Key } from 'lucide-react';
import CodeBlockCard from '../../components/docs/CodeBlockCard';

export default function ApiDocs() {
  return (
    <div className="max-w-none space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">API Reference</h1>
        <p className="text-xl text-gray-600">
          Complete API documentation for FakePE Payment Gateway.
        </p>
      </div>

      {/* Base URL */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Server className="w-6 h-6 text-blue-600" />
          Base URL
        </h2>
        <div className="bg-white border border-blue-200 rounded-lg p-4">
          <code className="text-lg text-blue-700 font-mono">http://localhost:4000/api/v1</code>
        </div>
      </div>

      {/* Authentication */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Lock className="w-6 h-6 text-purple-600" />
          Authentication
        </h2>
        <p className="text-gray-700 mb-4">Most endpoints require HTTP Basic Authentication using API keys:</p>
        <CodeBlockCard
          language="bash"
          title="Authorization Header"
          code="Authorization: Basic base64(key_id:key_secret)"
        />
      </div>

      {/* Payments API */}
      <div className="border-l-4 border-green-500 pl-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <CreditCard className="w-8 h-8 text-green-600" />
          Payments API
        </h2>

        <div className="space-y-8">
          {/* Create Payment */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-500 text-white text-sm px-3 py-1 rounded font-mono font-bold">POST</span>
              <h3 className="text-2xl font-bold text-gray-900">Create Payment</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <code className="text-gray-800">/payments</code>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">Request Body</h4>
            <CodeBlockCard
              language="json"
              title="POST /payments"
              description="Create a new payment request"
              code={`{
  "merchantId": "mer_123",
  "amount": 50000,
  "orderId": "order_abc123",
  "callbackUrl": "https://yourapp.com/webhook",
  "metadata": {
    "customer_name": "John Doe"
  }
}`}
            />

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Response (201 Created)</h4>
            <CodeBlockCard
              language="json"
              title="Success Response"
              code={`{
  "paymentId": "pay_xyz789",
  "paymentUrl": "http://localhost:3000/pay/pay_xyz789",
  "qrData": "data:image/png;base64,...",
  "status": "CREATED",
  "amount": 50000,
  "createdAt": "2024-01-15T10:30:00.000Z"
}`}
            />
          </div>

          {/* Get Payment */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded font-mono font-bold">GET</span>
              <h3 className="text-2xl font-bold text-gray-900">Get Payment</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <code className="text-gray-800">/payments/:paymentId</code>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">Response</h4>
            <CodeBlockCard
              language="json"
              title="GET /payments/:paymentId"
              code={`{
  "paymentId": "pay_xyz789",
  "merchantId": "mer_123",
  "amount": 50000,
  "status": "COMPLETED",
  "method": "UPI",
  "orderId": "order_abc123",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "completedAt": "2024-01-15T10:31:45.000Z"
}`}
            />
          </div>

          {/* List Payments */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded font-mono font-bold">GET</span>
              <h3 className="text-2xl font-bold text-gray-900">List Payments</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <code className="text-gray-800">/payments?merchantId=mer_123&status=COMPLETED</code>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">Query Parameters</h4>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Parameter</th>
                    <th className="text-left p-3 font-semibold">Type</th>
                    <th className="text-left p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3"><code>merchantId</code></td>
                    <td className="p-3">string</td>
                    <td className="p-3 text-gray-600">Filter by merchant ID</td>
                  </tr>
                  <tr>
                    <td className="p-3"><code>status</code></td>
                    <td className="p-3">string</td>
                    <td className="p-3 text-gray-600">Filter by status (CREATED, PENDING, COMPLETED, FAILED)</td>
                  </tr>
                  <tr>
                    <td className="p-3"><code>limit</code></td>
                    <td className="p-3">number</td>
                    <td className="p-3 text-gray-600">Results per page (default: 10)</td>
                  </tr>
                  <tr>
                    <td className="p-3"><code>offset</code></td>
                    <td className="p-3">number</td>
                    <td className="p-3 text-gray-600">Pagination offset (default: 0)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">Response</h4>
            <CodeBlockCard
              language="json"
              title="GET /payments"
              code={`{
  "payments": [
    {
      "paymentId": "pay_xyz789",
      "amount": 50000,
      "status": "COMPLETED",
      ...
    }
  ],
  "total": 156,
  "limit": 10,
  "offset": 0
}`}
            />
          </div>

          {/* Refund Payment */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-500 text-white text-sm px-3 py-1 rounded font-mono font-bold">POST</span>
              <h3 className="text-2xl font-bold text-gray-900">Refund Payment</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <code className="text-gray-800">/payments/:paymentId/refund</code>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">Request Body</h4>
            <CodeBlockCard
              language="json"
              title="POST /payments/:paymentId/refund"
              code={`{
  "amount": 25000,  // Optional, full refund if not provided
  "reason": "Customer request"
}`}
            />

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Response</h4>
            <CodeBlockCard
              language="json"
              code={`{
  "refundId": "rfnd_abc123",
  "paymentId": "pay_xyz789",
  "amount": 25000,
  "reason": "Customer request",
  "status": "PROCESSED",
  "createdAt": "2024-01-15T11:00:00.000Z"
}`}
            />
          </div>
        </div>
      </div>

      {/* UPI API */}
      <div className="border-l-4 border-purple-500 pl-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <QrCode className="w-8 h-8 text-purple-600" />
          UPI API
        </h2>

        <div className="space-y-8">
          {/* Create VPA */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-500 text-white text-sm px-3 py-1 rounded font-mono font-bold">POST</span>
              <h3 className="text-2xl font-bold text-gray-900">Create UPI VPA</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <code className="text-gray-800">/upi/vpa</code>
            </div>

            <CodeBlockCard
              language="json"
              title="POST /upi/vpa"
              code={`{
  "userId": "usr_123",
  "vpa": "user@fakepe"
}`}
            />

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Response</h4>
            <CodeBlockCard
              language="json"
              code={`{
  "vpa": "user@fakepe",
  "userId": "usr_123",
  "isDefault": true,
  "createdAt": "2024-01-15T10:00:00.000Z"
}`}
            />
          </div>

          {/* Generate QR */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded font-mono font-bold">GET</span>
              <h3 className="text-2xl font-bold text-gray-900">Generate UPI QR</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <code className="text-gray-800">/upi/qr/:paymentId</code>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">Response</h4>
            <CodeBlockCard
              language="json"
              title="GET /upi/qr/:paymentId"
              code={`{
  "upiIntent": "upi://pay?pa=merchant@fakepe&pn=Merchant&am=500.00...",
  "qrCodeData": "data:image/png;base64,...",
  "payeeVpa": "merchant@fakepe",
  "amount": 50000
}`}
            />
          </div>

          {/* Initiate Payment */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-500 text-white text-sm px-3 py-1 rounded font-mono font-bold">POST</span>
              <h3 className="text-2xl font-bold text-gray-900">Initiate UPI Payment</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <code className="text-gray-800">/upi/initiate</code>
            </div>

            <CodeBlockCard
              language="json"
              title="POST /upi/initiate"
              code={`{
  "paymentId": "pay_xyz789",
  "payerVpa": "user@fakepe"
}`}
            />

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Response</h4>
            <CodeBlockCard
              language="json"
              code={`{
  "txnId": "UPI2024011512345678",
  "paymentId": "pay_xyz789",
  "payerVpa": "user@fakepe",
  "payeeVpa": "merchant@fakepe",
  "amount": 50000,
  "status": "PENDING"
}`}
            />
          </div>

          {/* Confirm Payment */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-500 text-white text-sm px-3 py-1 rounded font-mono font-bold">POST</span>
              <h3 className="text-2xl font-bold text-gray-900">Confirm UPI Payment</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <code className="text-gray-800">/upi/confirm</code>
            </div>

            <CodeBlockCard
              language="json"
              title="POST /upi/confirm"
              code={`{
  "txnId": "UPI2024011512345678",
  "pin": "1234"
}`}
            />

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Response</h4>
            <CodeBlockCard
              language="json"
              code={`{
  "txnId": "UPI2024011512345678",
  "status": "SUCCESS",
  "message": "Payment completed successfully",
  "upiRef": "UTR123456789012",
  "completedAt": "2024-01-15T10:31:00.000Z"
}`}
            />
          </div>

          {/* Get Transaction */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded font-mono font-bold">GET</span>
              <h3 className="text-2xl font-bold text-gray-900">Get Transaction</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <code className="text-gray-800">/upi/transaction/:txnId</code>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">Response</h4>
            <CodeBlockCard
              language="json"
              title="GET /upi/transaction/:txnId"
              code={`{
  "txnId": "UPI2024011512345678",
  "paymentId": "pay_xyz789",
  "payerVpa": "user@fakepe",
  "payeeVpa": "merchant@fakepe",
  "amount": 50000,
  "status": "SUCCESS",
  "upiRef": "UTR123456789012",
  "createdAt": "2024-01-15T10:30:00.000Z"
}`}
            />
          </div>

          {/* Get History */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded font-mono font-bold">GET</span>
              <h3 className="text-2xl font-bold text-gray-900">Get Transaction History</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <code className="text-gray-800">/upi/history/:userId?limit=20&offset=0</code>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">Response</h4>
            <CodeBlockCard
              language="json"
              title="GET /upi/history/:userId"
              code={`{
  "transactions": [
    {
      "txnId": "UPI2024011512345678",
      "type": "DEBIT",
      "amount": 50000,
      "status": "SUCCESS",
      "timestamp": "2024-01-15T10:30:00.000Z"
    }
  ],
  "total": 45,
  "limit": 20,
  "offset": 0
}`}
            />
          </div>
        </div>
      </div>

      {/* Wallet API */}
      <div className="border-l-4 border-blue-500 pl-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Wallet className="w-8 h-8 text-blue-600" />
          Wallet API
        </h2>

        <div className="space-y-8">
          {/* Get Balance */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded font-mono font-bold">GET</span>
              <h3 className="text-2xl font-bold text-gray-900">Get Balance</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <code className="text-gray-800">/wallets/:userId</code>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">Response</h4>
            <CodeBlockCard
              language="json"
              title="GET /wallets/:userId"
              code={`{
  "userId": "usr_123",
  "balance": 250000,
  "currency": "INR",
  "lastUpdated": "2024-01-15T10:00:00.000Z"
}`}
            />
          </div>

          {/* Top Up */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-500 text-white text-sm px-3 py-1 rounded font-mono font-bold">POST</span>
              <h3 className="text-2xl font-bold text-gray-900">Top Up Wallet</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <code className="text-gray-800">/wallets/topup</code>
            </div>

            <CodeBlockCard
              language="json"
              title="POST /wallets/topup"
              code={`{
  "userId": "usr_123",
  "amount": 100000
}`}
            />

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Response</h4>
            <CodeBlockCard
              language="json"
              code={`{
  "userId": "usr_123",
  "balance": 350000,
  "amountAdded": 100000,
  "transactionId": "txn_topup_abc123"
}`}
            />
          </div>

          {/* Transfer */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-500 text-white text-sm px-3 py-1 rounded font-mono font-bold">POST</span>
              <h3 className="text-2xl font-bold text-gray-900">Transfer Funds</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <code className="text-gray-800">/wallets/transfer</code>
            </div>

            <CodeBlockCard
              language="json"
              title="POST /wallets/transfer"
              code={`{
  "from": "usr_123",
  "to": "usr_456",
  "amount": 50000
}`}
            />

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Response</h4>
            <CodeBlockCard
              language="json"
              code={`{
  "transferId": "txf_xyz789",
  "from": "usr_123",
  "to": "usr_456",
  "amount": 50000,
  "status": "COMPLETED",
  "timestamp": "2024-01-15T10:10:00.000Z"
}`}
            />
          </div>
        </div>
      </div>

      {/* Error Responses */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Responses</h2>
        <p className="text-gray-700 mb-4">All errors follow a consistent format:</p>
        
        <CodeBlockCard
          language="json"
          title="Error Response Format"
          code={`{
  "error": "Descriptive error message",
  "statusCode": 400,
  "details": {
    // Additional error context
  }
}`}
        />

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Status Codes</h3>
          <div className="bg-white border border-red-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-red-50">
                <tr>
                  <th className="text-left p-3 font-semibold">Code</th>
                  <th className="text-left p-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100">
                <tr>
                  <td className="p-3"><code className="text-red-600">400</code></td>
                  <td className="p-3 text-gray-600">Bad Request - Invalid parameters</td>
                </tr>
                <tr>
                  <td className="p-3"><code className="text-red-600">401</code></td>
                  <td className="p-3 text-gray-600">Unauthorized - Invalid credentials</td>
                </tr>
                <tr>
                  <td className="p-3"><code className="text-red-600">404</code></td>
                  <td className="p-3 text-gray-600">Not Found - Resource doesn't exist</td>
                </tr>
                <tr>
                  <td className="p-3"><code className="text-red-600">422</code></td>
                  <td className="p-3 text-gray-600">Unprocessable Entity - Validation error</td>
                </tr>
                <tr>
                  <td className="p-3"><code className="text-red-600">500</code></td>
                  <td className="p-3 text-gray-600">Internal Server Error</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
