import React from 'react';
import CodeBlock from './CodeBlock';

export default function UPISection({ copyCode, copiedCode }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">UPI Payments</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Complete UPI payment integration with VPA, QR codes, and PIN verification</p>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">🔄 UPI Payment Flow</h3>
        <ol className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
          <li>1. Create payment request → Get QR code</li>
          <li>2. Customer scans QR in User App</li>
          <li>3. Initiate UPI transaction with VPA</li>
          <li>4. Customer enters PIN → Confirm payment</li>
          <li>5. Payment processed → Webhook sent</li>
        </ol>
      </div>

      {/* Create VPA */}
      <div className="border-l-4 border-purple-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Create VPA</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Create a Virtual Payment Address for a user.</p>
        <CodeBlock 
          code={`const vpa = await fakepe.upi.createVpa({
  userId: 'usr_123',
  vpa: 'johndoe@fakepe'
});

// Response
{
  vpa: 'johndoe@fakepe',
  userId: 'usr_123',
  isDefault: true,
  createdAt: '2024-01-15T10:00:00.000Z'
}`}
          onCopy={() => copyCode('create-vpa', 'upi1')}
          copied={copiedCode === 'upi1'}
        />
      </div>

      {/* Get VPAs */}
      <div className="border-l-4 border-indigo-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Get User VPAs</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Retrieve all VPAs for a user.</p>
        <CodeBlock 
          code={`const vpas = await fakepe.upi.getVpas('usr_123');

// Response: Array of VPA objects
[
  { vpa: 'johndoe@fakepe', userId: 'usr_123', isDefault: true }
]`}
          onCopy={() => copyCode('get-vpas', 'upi1b')}
          copied={copiedCode === 'upi1b'}
        />
      </div>

      {/* Generate QR */}
      <div className="border-l-4 border-blue-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Generate QR Code</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Generate UPI QR code for a payment.</p>
        <CodeBlock 
          code={`const qr = await fakepe.upi.generateQr('pay_abc123');

console.log(qr.upiIntent); // upi://pay?pa=merchant@fakepe...
console.log(qr.qrCodeData); // base64 QR image

// Response
{
  upiIntent: 'upi://pay?pa=merchant@fakepe&pn=Merchant&am=500.00...',
  qrCodeData: 'data:image/png;base64,...',
  payeeVpa: 'merchant@fakepe',
  amount: 50000
}`}
          onCopy={() => copyCode('gen-qr', 'upi2')}
          copied={copiedCode === 'upi2'}
        />
      </div>

      {/* Complete UPI Payment */}
      <div className="border-l-4 border-green-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Complete UPI Payment</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Initiate and confirm UPI payment.</p>
        <CodeBlock 
          code={`// 1. Initiate payment
const txn = await fakepe.upi.initiate({
  paymentId: 'pay_abc123',
  payerVpa: 'customer@fakepe'
});

console.log('Transaction ID:', txn.txnId);

// 2. Confirm with PIN
const result = await fakepe.upi.confirm({
  txnId: txn.txnId,
  pin: '1234' // Mock PIN for testing
});

// Response
{
  txnId: 'UPI2024011512345678',
  status: 'SUCCESS',
  message: 'Payment completed successfully',
  completedAt: '2024-01-15T10:31:00.000Z'
}`}
          onCopy={() => copyCode('upi-pay', 'upi3')}
          copied={copiedCode === 'upi3'}
        />
      </div>

      {/* Get Transaction */}
      <div className="border-l-4 border-teal-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Get Transaction Details</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Retrieve UPI transaction by ID.</p>
        <CodeBlock 
          code={`const txn = await fakepe.upi.getTransaction('UPI2024011512345678');

// Response
{
  txnId: 'UPI2024011512345678',
  paymentId: 'pay_abc123',
  payerVpa: 'customer@fakepe',
  payeeVpa: 'merchant@fakepe',
  amount: 50000,
  status: 'SUCCESS',
  createdAt: '2024-01-15T10:30:00.000Z'
}`}
          onCopy={() => copyCode('get-txn', 'upi4')}
          copied={copiedCode === 'upi4'}
        />
      </div>

      {/* Transaction History */}
      <div className="border-l-4 border-orange-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Get Transaction History</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Get paginated transaction history for a user.</p>
        <CodeBlock 
          code={`const history = await fakepe.upi.getHistory('usr_123', {
  limit: 20,
  offset: 0
});

// Response
{
  transactions: [
    { txnId: 'UPI...', type: 'DEBIT', amount: 50000, status: 'SUCCESS', ... }
  ],
  total: 45,
  limit: 20,
  offset: 0
}`}
          onCopy={() => copyCode('upi-history', 'upi5')}
          copied={copiedCode === 'upi5'}
        />
      </div>
    </div>
  );
}
