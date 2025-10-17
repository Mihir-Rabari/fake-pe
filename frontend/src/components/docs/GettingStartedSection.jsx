import React from 'react';
import { Zap, CreditCard, QrCode, Wallet, Code2, Settings, Home, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import CodeBlock from './CodeBlock';

export default function GettingStartedSection({ copyCode, copiedCode }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Welcome to FakePE</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-6">A Razorpay-inspired mock payment gateway for testing and development</p>
        
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
            🚀 Easy Integration
          </span>
          <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
            ⚡ Fast Setup
          </span>
          <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
            🧪 Testing Ready
          </span>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-900 dark:text-amber-200">Testing Environment Only</h3>
              <p className="text-amber-800 dark:text-amber-300 text-sm mt-1">
                This is a MOCK payment system. All transactions use fake money and are not real financial transactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Payment Processing</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Create, track, and manage payments with a complete REST API</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">UPI Integration</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Full UPI payment flow with VPA, QR codes, and PIN verification</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Digital Wallets</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Wallet management with balance checks and P2P transfers</p>
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Zap className="w-6 h-6 text-blue-600" />
          Quick Start
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Get started with FakePE in minutes:</p>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">1. Install the SDK</h3>
            <CodeBlock 
              code={`npm install fakepe-sdk`}
              onCopy={() => copyCode('npm install fakepe-sdk', 'install')}
              copied={copiedCode === 'install'}
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">2. Initialize and Create Payment</h3>
            <CodeBlock 
              code={`const FakePE = require('fakepe-sdk');

const fakepe = new FakePE({
  key_id: 'test_key_id',
  key_secret: 'test_key_secret',
  baseUrl: 'http://localhost:4000'
});

// Create a payment
const payment = await fakepe.payments.create({
  merchantId: 'mer_demo',
  amount: 50000, // ₹500 in paise
  orderId: 'order_' + Date.now(),
  callbackUrl: 'https://yoursite.com/webhook'
});

console.log('Payment URL:', payment.paymentUrl);
console.log('Status:', payment.status);`}
              onCopy={() => copyCode('create-payment-code', 'qs')}
              copied={copiedCode === 'qs'}
            />
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📖 Key Features</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-400 text-sm">Complete REST API with payment operations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-400 text-sm">UPI payment flow with QR codes</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-400 text-sm">Webhook notifications with HMAC verification</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-400 text-sm">Full TypeScript support included</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🔗 Related Resources</h3>
          <div className="space-y-3">
            <a href="https://github.com/Mihir-Rabari/fakePE-sdk" target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm">
              <Code2 className="w-4 h-4" />
              SDK Repository
            </a>
            <a href="https://github.com/Mihir-Rabari/fake-pe" target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm">
              <Settings className="w-4 h-4" />
              Backend Server
            </a>
            <a href="https://github.com/Mihir-Rabari/fakePE-user-app" target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm">
              <Home className="w-4 h-4" />
              User App
            </a>
            <a href="https://www.npmjs.com/package/fakepe-sdk" target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm">
              <FileText className="w-4 h-4" />
              NPM Package
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
