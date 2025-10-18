import { AlertTriangle, CheckCircle, Code, Play, Rocket, Server, Smartphone, Zap, Database, Terminal } from 'lucide-react';

export default function GettingStarted() {
  return (
    <div className="max-w-none space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Getting Started with FakePE</h1>
        <p className="text-xl text-gray-600 mb-6">
          A complete mock payment gateway system inspired by Razorpay, perfect for testing and development.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-900">Testing Environment Only</p>
              <p className="text-sm text-amber-800 mt-1">
                This is a MOCK payment system. All transactions use fake money and are not real financial transactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Prerequisites */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-blue-600" />
          Prerequisites
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Node.js 18+
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Docker & Docker Compose
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Git
          </li>
        </ul>
      </div>

      {/* Quick Start Steps */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Start</h2>

        {/* Step 1 */}
        <div className="border-l-4 border-purple-500 pl-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-900">Clone and Setup</h3>
          </div>
          <p className="text-gray-600 mb-3">Clone the main repository and start infrastructure:</p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-gray-300">
              {`# Clone main repository
git clone https://github.com/Mihir-Rabari/fake-pe.git
cd fake-pe

# Start infrastructure (MongoDB, Redis)
docker-compose up -d

# Install and start backend
cd backend
npm install
npm run dev

# Install and start frontend (new terminal)
cd frontend
npm install
npm run dev`}
            </code>
          </div>
        </div>

        {/* Step 2 */}
        <div className="border-l-4 border-green-500 pl-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-900">Install SDK</h3>
          </div>
          <p className="text-gray-600 mb-3">Install the Node.js SDK package:</p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-gray-300">npm install fakepe-sdk</code>
          </div>
        </div>

        {/* Step 3 */}
        <div className="border-l-4 border-blue-500 pl-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-900">Install User App</h3>
          </div>
          <p className="text-gray-600 mb-3">Clone and start the user application:</p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-gray-300">
              {`# Clone user app repository
git clone https://github.com/Mihir-Rabari/fakePE-user-app.git
cd fakePE-user-app

# Install and start
npm install
npm run dev`}
            </code>
          </div>
        </div>
      </div>

      {/* Your First Payment */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Rocket className="w-8 h-8 text-indigo-600" />
          Your First Payment
        </h2>

        <div className="space-y-6">
          {/* Create Payment */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1: Create Payment with SDK</h3>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-300">
                {`const FakePE = require('fakepe-sdk');

const fakepe = new FakePE({
  key_id: 'test_key',
  key_secret: 'test_secret',
  baseUrl: 'http://localhost:4000'
});

// Create payment
const payment = await fakepe.payments.create({
  merchantId: 'mer_test',
  amount: 50000, // ₹500 in paise
  orderId: 'order_001'
});

console.log('Payment URL:', payment.paymentUrl);
console.log('QR Code:', payment.qrData);`}
              </code>
            </div>
          </div>

          {/* Complete Payment */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2: Complete Payment in User App</h3>
            <ol className="space-y-2 text-gray-700">
              <li className="flex gap-3">
                <span className="font-semibold text-indigo-600">1.</span>
                Open User App at <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3001</code>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-indigo-600">2.</span>
                Create an account (first time)
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-indigo-600">3.</span>
                Click "Scan & Pay"
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-indigo-600">4.</span>
                Scan the QR code or paste payment URL
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-indigo-600">5.</span>
                Enter any 4-6 digit PIN
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-indigo-600">6.</span>
                Confirm payment
              </li>
            </ol>
          </div>

          {/* Verify Payment */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 3: Verify Payment</h3>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-300">
                {`const status = await fakepe.payments.fetch(payment.paymentId);
console.log('Status:', status.status); // 'COMPLETED'`}
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Flow Diagram */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Payment Flow</h2>
        <div className="space-y-3 text-gray-700">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <span><strong>Merchant</strong> creates payment via SDK</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <span><strong>Backend</strong> generates payment ID + QR code</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <span><strong>Customer</strong> scans QR in User App</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
            <span><strong>User App</strong> initiates UPI payment</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
            <span><strong>Customer</strong> enters PIN and confirms</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
            <span><strong>Backend</strong> processes payment</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">7</span>
            <span><strong>Webhook</strong> sent to merchant</span>
          </div>
        </div>
      </div>

      {/* Service URLs */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Server className="w-6 h-6 text-gray-700" />
          Service URLs
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="font-semibold text-blue-900 mb-1">Backend API</p>
            <code className="text-sm text-blue-700">http://localhost:4000</code>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="font-semibold text-green-900 mb-1">Merchant Dashboard</p>
            <code className="text-sm text-green-700">http://localhost:3000</code>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="font-semibold text-purple-900 mb-1">User App</p>
            <code className="text-sm text-purple-700">http://localhost:3001</code>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-900 mb-1">API Health</p>
            <code className="text-sm text-gray-700">http://localhost:4000/health</code>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-green-600" />
          Next Steps
        </h2>
        <ul className="space-y-3">
          <li>
            <a href="/docs/api" className="text-green-700 hover:text-green-800 font-medium flex items-center gap-2">
              <Code className="w-4 h-4" />
              Explore the API Reference
            </a>
          </li>
          <li>
            <a href="/docs/sdk" className="text-green-700 hover:text-green-800 font-medium flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Learn more about the SDK
            </a>
          </li>
          <li>
            <a href="/docs/quick-reference" className="text-green-700 hover:text-green-800 font-medium flex items-center gap-2">
              <Play className="w-4 h-4" />
              Check out Quick Reference
            </a>
          </li>
        </ul>
      </div>

      {/* Need Help */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
        <p className="text-blue-800 text-sm">
          Check out our{' '}
          <a href="https://github.com/Mihir-Rabari/fake-pe/issues" target="_blank" rel="noopener noreferrer" className="underline">
            GitHub Issues
          </a>{' '}
          or review the example files in the SDK repository.
        </p>
      </div>
    </div>
  );
}
