import React from 'react';
import { CodeBlock, CodeBlockHeader, CodeBlockBody, CodeBlockContent } from '../../components/ui';
import Callout from '../../components/docs/Callout';
import Card, { InfoCard, LinkCard } from '../../components/docs/Card';
import { CheckCircle, Rocket, Code, Zap } from 'lucide-react';

export default function GettingStarted() {
  return (
    <article className="prose prose-invert max-w-none">
      {/* Hero */}
      <div className="not-prose mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-fakepe-primary/10 border border-fakepe-primary/30 rounded-full text-fakepe-primary text-sm font-medium mb-6">
          <CheckCircle className="w-4 h-4" />
          <span>Latest Version: v1.0.0</span>
        </div>
        <h1 className="text-5xl font-bold text-fakepe-text-primary mb-4 tracking-tight">Get started with FakePE</h1>
        <p className="text-xl text-fakepe-text-secondary leading-relaxed max-w-3xl">
          FakePE is a complete mock payment gateway for developers. Test UPI payments, wallet transactions, and P2P transfers without real money. Perfect for development and testing.
        </p>
      </div>

      <Callout type="warning" title="🧪 Testing Environment Only">
        This is a <strong>mock payment system</strong>. All transactions use fake money and are not real financial transactions. Perfect for development and testing!
      </Callout>

      <h2 id="installation">Installation</h2>
      
      <p>Get started by cloning the repository and starting the services:</p>

      <h3>1. Clone and start backend</h3>
      
      <CodeBlock
        language="bash"
        filename="terminal"
        showLineNumbers={true}
        highlightLines={[4, 8, 9, 10]}
        code={`# Clone the repository
git clone https://github.com/Mihir-Rabari/fake-pe.git
cd fake-pe

# Start MongoDB and Redis using Docker
docker-compose up -d

# Install dependencies and start backend
cd backend
npm install
npm run dev`}
      />

      <InfoCard title="🚀 What's happening here?">
        <ul className="text-sm space-y-1">
          <li><strong>Line 4:</strong> Docker Compose starts MongoDB and Redis containers</li>
          <li><strong>Lines 8-10:</strong> Backend server starts on port 4000</li>
        </ul>
      </InfoCard>

      <h3>2. Start frontend</h3>
      
      <CodeBlock
        language="bash"
        filename="terminal"
        showLineNumbers={true}
        highlightLines={[2, 3]}
        code={`cd frontend
npm install
npm run dev`}
      />

      <Callout type="success" title="Server Running">
        Frontend will be available at <code className="text-green-800 dark:text-green-200">http://localhost:3000</code>
      </Callout>

      <h3>3. Install user app</h3>
      
      <CodeBlock
        language="bash"
        filename="terminal"
        showLineNumbers={true}
        code={`git clone https://github.com/Mihir-Rabari/fakePE-user-app.git
cd fakePE-user-app
npm install
npm run dev`}
      />

      <h2 id="quick-start">Quick Start</h2>
      
      <p>Install the SDK in your project:</p>

      <CodeBlock
        language="bash"
        showLineNumbers={false}
        code="npm install fakepe-sdk"
      />

      <h3>Create your first payment</h3>
      
      <CodeBlock
        language="javascript"
        filename="create-payment.js"
        showLineNumbers={true}
        highlightLines={[1, 10, 11, 12, 13]}
        code={`const FakePE = require('fakepe-sdk');

// Initialize the SDK with your API keys
const fakepe = new FakePE({
  key_id: 'test_key',          // Your test API key
  key_secret: 'test_secret',   // Your test secret
  baseUrl: 'http://localhost:4000'  // API endpoint
});

// Create a payment - amounts are in paise (100 paise = ₹1)
const payment = await fakepe.payments.create({
  merchantId: 'mer_test',      // Your merchant ID
  amount: 50000,               // ₹500.00 (in paise)
  orderId: 'order_001'         // Your order reference
});

// Payment URL for customer
console.log('Payment URL:', payment.paymentUrl);

// QR code data for UPI apps
console.log('QR Data:', payment.qrData);`}
      />

      <InfoCard title="💡 Understanding the Code">
        <ul className="text-sm space-y-2">
          <li><strong>Line 1:</strong> Import the FakePE SDK package</li>
          <li><strong>Lines 10-13:</strong> Create payment request with amount in paise (50000 = ₹500)</li>
          <li><strong>Payment URL:</strong> Direct link for customer to complete payment</li>
          <li><strong>QR Data:</strong> Base64 encoded QR code for UPI payment apps</li>
        </ul>
      </InfoCard>

      <h3>Complete the payment</h3>
      
      <div className="not-prose my-6">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-semibold text-indigo-900 dark:text-white mb-4">Steps to complete payment:</h4>
          <ol className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span>Open User App at <code className="text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900 px-2 py-0.5 rounded">http://localhost:3001</code></span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span>Create an account with any email</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span>Click "Scan & Pay" button</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <span>Paste the payment URL from console</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
              <span>Enter any 4-6 digit PIN (e.g., <code className="text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900 px-2 py-0.5 rounded">1234</code>)</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
              <span className="font-semibold text-indigo-900 dark:text-white">Confirm payment - Done! ✨</span>
            </li>
          </ol>
        </div>
      </div>

      <h2>Service URLs</h2>
      
      <div className="not-prose my-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Backend API</p>
            <code className="text-sm text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded">http://localhost:4000</code>
          </div>
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="font-semibold text-green-900 dark:text-green-100 mb-2">Frontend Dashboard</p>
            <code className="text-sm text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900 px-3 py-1 rounded">http://localhost:3000</code>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <p className="font-semibold text-purple-900 dark:text-purple-100 mb-2">User App</p>
            <code className="text-sm text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900 px-3 py-1 rounded">http://localhost:3001</code>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="font-semibold text-gray-900 dark:text-white mb-2">API Health</p>
            <code className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">http://localhost:4000/health</code>
          </div>
        </div>
      </div>

      <Callout type="tip" title="Pro Tip">
        You can use any VPA ending with <code>@fakepe</code> and any 4-6 digit PIN for testing!
      </Callout>

      <h2>Next steps</h2>
      
      <div className="not-prose my-8 grid md:grid-cols-3 gap-4">
        <a href="/docs/api" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition group">
          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">API Reference</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Explore the complete API documentation</p>
        </a>

        <a href="/docs/sdk" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700 transition group">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">SDK Guide</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Learn more about the SDK</p>
        </a>

        <a href="/docs/quick-reference" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg hover:border-green-300 dark:hover:border-green-700 transition group">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-600 group-hover:text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition">Quick Reference</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Commands and code snippets</p>
        </a>
      </div>
    </article>
  );
}
