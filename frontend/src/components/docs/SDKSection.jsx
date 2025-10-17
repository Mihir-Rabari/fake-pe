import React from 'react';
import { Code2, FileText, Book, CheckCircle } from 'lucide-react';
import CodeBlock from './CodeBlock';

export default function SDKSection({ copyCode, copiedCode }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">SDK Integration</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Complete guide to integrating FakePE SDK in your application</p>
      </div>

      {/* SDK Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <Code2 className="w-10 h-10 text-blue-600 mb-3" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Node.js SDK</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Official SDK with full TypeScript support</p>
          <a href="https://www.npmjs.com/package/fakepe-sdk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View on NPM →
          </a>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <FileText className="w-10 h-10 text-green-600 mb-3" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Documentation</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Comprehensive guides and API reference</p>
          <a href="https://github.com/Mihir-Rabari/fakePE-sdk" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 text-sm font-medium">
            View on GitHub →
          </a>
        </div>
      </div>

      {/* Installation */}
      <div className="border-l-4 border-blue-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Installation</h2>
        <CodeBlock 
          code={`npm install fakepe-sdk

# or with yarn
yarn add fakepe-sdk`}
          onCopy={() => copyCode('install-sdk', 'sdk1')}
          copied={copiedCode === 'sdk1'}
          language="bash"
        />
      </div>

      {/* Basic Usage */}
      <div className="border-l-4 border-green-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Basic Usage</h2>
        <CodeBlock 
          code={`const FakePE = require('fakepe-sdk');

// Initialize SDK
const fakepe = new FakePE({
  key_id: process.env.FAKEPE_KEY_ID,
  key_secret: process.env.FAKEPE_KEY_SECRET,
  baseUrl: 'http://localhost:4000'
});

// Create a payment
const payment = await fakepe.payments.create({
  merchantId: 'mer_123',
  amount: 50000,
  orderId: 'order_001'
});

console.log('Payment ID:', payment.paymentId);`}
          onCopy={() => copyCode('basic-usage', 'sdk2')}
          copied={copiedCode === 'sdk2'}
        />
      </div>

      {/* TypeScript Support */}
      <div className="border-l-4 border-purple-500 pl-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">TypeScript Support</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">The SDK includes full TypeScript definitions:</p>
        <CodeBlock 
          code={`import FakePE from 'fakepe-sdk';

const fakepe = new FakePE({
  key_id: process.env.FAKEPE_KEY_ID!,
  key_secret: process.env.FAKEPE_KEY_SECRET!,
  baseUrl: 'http://localhost:4000'
});

// Full type support and autocomplete
const payment = await fakepe.payments.create({
  merchantId: 'mer_123',
  amount: 50000,
  orderId: 'order_001'
});`}
          onCopy={() => copyCode('typescript', 'sdk3')}
          copied={copiedCode === 'sdk3'}
          language="typescript"
        />
      </div>

      {/* Features */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Book className="w-5 h-5 text-blue-600" />
          SDK Features
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400 text-sm">Complete payment lifecycle management</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400 text-sm">UPI payment operations (VPA, QR, transactions)</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400 text-sm">Wallet management APIs</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400 text-sm">Webhook signature verification utilities</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400 text-sm">Full TypeScript type definitions</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400 text-sm">Automatic HTTP Basic Auth handling</span>
          </li>
        </ul>
      </div>

      {/* Examples */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
        <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">📚 More Examples</h3>
        <p className="text-blue-800 dark:text-blue-300 text-sm mb-2">
          Check out the SDK repository for complete working examples:
        </p>
        <ul className="text-blue-700 dark:text-blue-400 text-sm space-y-1">
          <li>• basic-payment.js - Simple payment creation</li>
          <li>• upi-payment.js - Complete UPI flow</li>
          <li>• webhook-server.js - Webhook handling</li>
        </ul>
      </div>
    </div>
  );
}
