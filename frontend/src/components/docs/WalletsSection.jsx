import React from 'react';
import { Wallet, Clock, CreditCard } from 'lucide-react';
import CodeBlock from './CodeBlock';

export default function WalletsSection({ copyCode, copiedCode }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Digital Wallets</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Manage wallet balances and peer-to-peer transfers</p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <Wallet className="w-8 h-8 text-green-600 mb-2" />
          <h3 className="font-bold text-gray-900 dark:text-white">Check Balance</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Get current wallet balance</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <Clock className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="font-bold text-gray-900 dark:text-white">Top Up</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Add funds to wallet</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <CreditCard className="w-8 h-8 text-purple-600 mb-2" />
          <h3 className="font-bold text-gray-900 dark:text-white">Transfer</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Send money to others</p>
        </div>
      </div>

      {/* Get Balance */}
      <div className="space-y-6">
        <div className="border-l-4 border-green-500 pl-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Get Balance</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Retrieve current wallet balance for a user.</p>
          <CodeBlock 
            code={`const wallet = await fakepe.wallets.getBalance('usr_123');

console.log(\`Balance: ₹\${wallet.balance / 100}\`);

// Response
{
  userId: 'usr_123',
  balance: 250000, // ₹2500 in paise
  currency: 'INR',
  lastUpdated: '2024-01-15T10:00:00.000Z'
}`}
            onCopy={() => copyCode('get-balance', 'wal1')}
            copied={copiedCode === 'wal1'}
          />
        </div>

        {/* Top Up */}
        <div className="border-l-4 border-blue-500 pl-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Top Up Wallet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Add funds to a user's wallet.</p>
          <CodeBlock 
            code={`const result = await fakepe.wallets.topup({
  userId: 'usr_123',
  amount: 100000 // Add ₹1000
});

// Response
{
  userId: 'usr_123',
  balance: 350000, // New balance after top-up
  amountAdded: 100000,
  transactionId: 'txn_topup_abc123',
  timestamp: '2024-01-15T10:05:00.000Z'
}`}
            onCopy={() => copyCode('topup', 'wal2')}
            copied={copiedCode === 'wal2'}
          />
        </div>

        {/* Transfer */}
        <div className="border-l-4 border-purple-500 pl-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Transfer Funds</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Transfer money between two wallets.</p>
          <CodeBlock 
            code={`const transfer = await fakepe.wallets.transfer({
  from: 'usr_123',
  to: 'usr_456',
  amount: 50000 // Transfer ₹500
});

// Response
{
  transferId: 'txf_xyz789',
  from: 'usr_123',
  to: 'usr_456',
  amount: 50000,
  status: 'COMPLETED',
  timestamp: '2024-01-15T10:10:00.000Z'
}`}
            onCopy={() => copyCode('transfer', 'wal3')}
            copied={copiedCode === 'wal3'}
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
        <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Amount Handling</h3>
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          All amounts are in <strong>paise</strong> (smallest currency unit). ₹1 = 100 paise. For example, ₹500 = 50000 paise.
        </p>
      </div>
    </div>
  );
}
