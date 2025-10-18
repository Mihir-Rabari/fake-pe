import React from 'react';
import CodeBlock from '../../components/docs/CodeBlock-new';
import Callout from '../../components/docs/Callout';

export default function GettingStarted() {
  return (
    <article className="prose prose-slate max-w-none prose-headings:scroll-mt-20">
      {/* Hero */}
      <div className="not-prose mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Get started with FakePE</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          FakePE is a complete mock payment gateway inspired by Razorpay. Perfect for testing payment flows without real money.
        </p>
      </div>

      <Callout type="warning" title="Testing Environment Only">
        This is a <strong>mock system</strong>. All transactions use fake money and are not real financial transactions.
      </Callout>

      <h2 id="installation">Installation</h2>
      
      <p>Get started by cloning the repository and starting the services:</p>

      <h3>1. Clone and start backend</h3>
      
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`git clone https://github.com/Mihir-Rabari/fake-pe.git
cd fake-pe

# Start MongoDB and Redis
docker-compose up -d

# Start backend
cd backend
npm install
npm run dev`}
      />

      <h3>2. Start frontend</h3>
      
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`cd frontend
npm install
npm run dev`}
      />

      <Callout type="success" title="Server Running">
        Frontend will be available at <code className="text-green-800">http://localhost:3000</code>
      </Callout>

      <h3>3. Install user app</h3>
      
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`git clone https://github.com/Mihir-Rabari/fakePE-user-app.git
cd fakePE-user-app
npm install
npm run dev`}
      />

      <h2 id="quick-start">Quick Start</h2>
      
      <p>Install the SDK in your project:</p>

      <CodeBlock
        language="bash"
        code="npm install fakepe-sdk"
      />

      <h3>Create your first payment</h3>
      
      <CodeBlock
        language="javascript"
        filename="create-payment.js"
        code={`const FakePE = require('fakepe-sdk');

const fakepe = new FakePE({
  key_id: 'test_key',
  key_secret: 'test_secret',
  baseUrl: 'http://localhost:4000'
});

// Create a payment
const payment = await fakepe.payments.create({
  merchantId: 'mer_test',
  amount: 50000, // ₹500 in paise
  orderId: 'order_001'
});

console.log(payment.paymentUrl);
console.log(payment.qrData);`}
      />

      <h3>Complete the payment</h3>
      
      <div className="not-prose my-6">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-indigo-900 mb-4">Steps to complete payment:</h4>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span>Open User App at <code className="text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">http://localhost:3001</code></span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span>Create an account</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span>Click "Scan & Pay"</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <span>Paste the payment URL</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
              <span>Enter any 4-6 digit PIN (e.g., <code className="text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">1234</code>)</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
              <span className="font-semibold text-indigo-900">Confirm payment - Done! ✨</span>
            </li>
          </ol>
        </div>
      </div>

      <h2>Service URLs</h2>
      
      <div className="not-prose my-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="font-semibold text-blue-900 mb-2">Backend API</p>
            <code className="text-sm text-blue-700 bg-blue-100 px-3 py-1 rounded">http://localhost:4000</code>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="font-semibold text-green-900 mb-2">Frontend Dashboard</p>
            <code className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded">http://localhost:3000</code>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="font-semibold text-purple-900 mb-2">User App</p>
            <code className="text-sm text-purple-700 bg-purple-100 px-3 py-1 rounded">http://localhost:3001</code>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-900 mb-2">API Health</p>
            <code className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded">http://localhost:4000/health</code>
          </div>
        </div>
      </div>

      <Callout type="tip" title="Pro Tip">
        You can use any VPA ending with <code>@fakepe</code> and any 4-6 digit PIN for testing!
      </Callout>

      <h2>Next steps</h2>
      
      <div className="not-prose my-8 grid md:grid-cols-3 gap-4">
        <a href="/docs/api" className="block p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-indigo-300 transition group">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition">API Reference</h3>
          <p className="text-sm text-gray-600">Explore the complete API documentation</p>
        </a>

        <a href="/docs/sdk" className="block p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-purple-300 transition group">
          <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition">SDK Guide</h3>
          <p className="text-sm text-gray-600">Learn more about the SDK</p>
        </a>

        <a href="/docs/quick-reference" className="block p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-green-300 transition group">
          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-600 group-hover:text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition">Quick Reference</h3>
          <p className="text-sm text-gray-600">Commands and code snippets</p>
        </a>
      </div>
    </article>
  );
}
