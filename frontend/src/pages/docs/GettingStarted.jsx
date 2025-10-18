import React, { useEffect } from 'react';
import { AlertTriangle, CheckCircle, Code, Play, Rocket, Server, Smartphone, Zap, Database, Terminal } from 'lucide-react';
import TableOfContents from '../../components/docs/TableOfContents';
import CodeBlockCard from '../../components/docs/CodeBlockCard';

export default function GettingStarted() {
  const tocSections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'prerequisites', title: 'Prerequisites' },
    { id: 'quick-start', title: 'Quick Start' },
    { id: 'installation', title: 'Installation' },
    { id: 'first-payment', title: 'Your First Payment' },
    { id: 'payment-flow', title: 'Payment Flow' },
    { id: 'service-urls', title: 'Service URLs' },
    { id: 'next-steps', title: 'Next Steps' },
  ];

  useEffect(() => {
    // Inject TOC into the layout's TOC container
    const tocContainer = document.getElementById('toc-container');
    if (tocContainer && !tocContainer.querySelector('.toc-injected')) {
      const tocDiv = document.createElement('div');
      tocDiv.className = 'toc-injected';
      tocContainer.appendChild(tocDiv);
    }
  }, []);

  return (
    <>
      <div className="max-w-none space-y-12">
        {/* Introduction */}
        <div id="introduction">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Getting Started with FakePE</h1>
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            FakePE is a complete mock payment gateway system inspired by Razorpay, perfect for testing and development. 
            It provides a full-featured payment processing simulation without dealing with real money or banking integrations.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-semibold text-amber-900">Testing Environment Only</p>
                <p className="text-sm text-amber-800 mt-1">
                  This is a MOCK payment system. All transactions use fake money and are not real financial transactions.
                  Perfect for development, testing, and demos.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
              <Zap className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Fast Setup</h3>
              <p className="text-sm text-gray-600">Get started in under 5 minutes with our SDK</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
              <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Full Features</h3>
              <p className="text-sm text-gray-600">UPI, Wallets, QR codes, and webhooks</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
              <Code className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Developer Friendly</h3>
              <p className="text-sm text-gray-600">Clean APIs and comprehensive docs</p>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div id="prerequisites">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Prerequisites</h2>
          <p className="text-gray-600 mb-4">Before you begin, make sure you have the following installed:</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Terminal className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Node.js 18+</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">JavaScript runtime for backend and SDK</p>
              <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-700">
                Download Node.js →
              </a>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Docker & Docker Compose</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">For MongoDB and Redis containers</p>
              <a href="https://www.docker.com/get-started" target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-700">
                Get Docker →
              </a>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Code className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Git</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Version control for cloning repositories</p>
              <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-700">
                Install Git →
              </a>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Terminal className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Code Editor</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">VS Code, WebStorm, or your favorite editor</p>
              <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-700">
                Get VS Code →
              </a>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div id="quick-start">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Start</h2>
          <p className="text-gray-600 mb-6">Follow these steps to get FakePE up and running in minutes:</p>

          {/* Step 1 */}
          <div className="border-l-4 border-purple-500 pl-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Clone and Setup Infrastructure</h3>
            </div>
            <p className="text-gray-600 mb-4">Clone the main repository and start the required services:</p>
            <CodeBlockCard
              language="bash"
              title="Setup Backend"
              code={`# Clone main repository
git clone https://github.com/Mihir-Rabari/fake-pe.git
cd fake-pe

# Start infrastructure (MongoDB, Redis)
docker-compose up -d

# Install and start backend
cd backend
npm install
npm run dev`}
            />
          </div>

          {/* Step 2 */}
          <div className="border-l-4 border-green-500 pl-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Start Frontend Dashboard</h3>
            </div>
            <p className="text-gray-600 mb-4">In a new terminal, start the merchant dashboard:</p>
            <CodeBlockCard
              language="bash"
              title="Setup Frontend"
              code={`# From project root
cd frontend
npm install
npm run dev

# Dashboard will be available at http://localhost:3000`}
            />
          </div>

          {/* Step 3 */}
          <div className="border-l-4 border-blue-500 pl-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Install User App</h3>
            </div>
            <p className="text-gray-600 mb-4">Clone and start the user application for completing payments:</p>
            <CodeBlockCard
              language="bash"
              title="Setup User App"
              code={`# In a new terminal
git clone https://github.com/Mihir-Rabari/fakePE-user-app.git
cd fakePE-user-app

# Install and start
npm install
npm run dev

# User app will be available at http://localhost:3001`}
            />
          </div>

          {/* Step 4 */}
          <div className="border-l-4 border-orange-500 pl-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Install SDK</h3>
            </div>
            <p className="text-gray-600 mb-4">Install the Node.js SDK in your project:</p>
            <CodeBlockCard
              language="bash"
              title="Install fakepe-sdk"
              code="npm install fakepe-sdk"
            />
          </div>
        </div>

        {/* Installation Details */}
        <div id="installation">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Detailed Installation</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What Gets Installed?</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Backend API</strong> - Express.js server handling all payment operations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Frontend Dashboard</strong> - React-based merchant portal</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>User App</strong> - Customer-facing payment interface</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>MongoDB</strong> - Database for storing payment data</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Redis</strong> - Caching and session management</span>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">Environment Variables</h3>
          <p className="text-gray-600 mb-4">Create <code className="bg-gray-100 px-2 py-1 rounded">.env</code> files in each directory:</p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Backend (.env)</h4>
              <CodeBlockCard
                language="bash"
                code={`NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://localhost:27017/fakepe
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_here`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Frontend & User App (.env)</h4>
              <CodeBlockCard
                language="bash"
                code="VITE_API_URL=http://localhost:4000"
              />
            </div>
          </div>
        </div>

        {/* Your First Payment */}
        <div id="first-payment">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Your First Payment</h2>
          <p className="text-gray-600 mb-6">Let's create and complete a payment to test the system:</p>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Payment with SDK</h3>
            <CodeBlockCard
              language="javascript"
              title="create-payment.js"
              description="Initialize SDK and create a payment"
              code={`const FakePE = require('fakepe-sdk');

const fakepe = new FakePE({
  key_id: 'test_key',
  key_secret: 'test_secret',
  baseUrl: 'http://localhost:4000'
});

async function createPayment() {
  try {
    const payment = await fakepe.payments.create({
      merchantId: 'mer_test',
      amount: 50000, // ₹500 in paise
      orderId: 'order_' + Date.now(),
      callbackUrl: 'https://yoursite.com/webhook'
    });

    console.log('✅ Payment Created!');
    console.log('Payment ID:', payment.paymentId);
    console.log('Payment URL:', payment.paymentUrl);
    console.log('QR Code:', payment.qrData);
    
    return payment;
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createPayment();`}
            />

            <div className="mt-6 bg-white rounded-lg p-4 border border-indigo-200">
              <h4 className="font-semibold text-gray-900 mb-3">Complete Payment in User App:</h4>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="font-semibold text-indigo-600 flex-shrink-0">Step 1:</span>
                  <span>Open User App at <code className="bg-gray-100 px-2 py-0.5 rounded">http://localhost:3001</code></span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-indigo-600 flex-shrink-0">Step 2:</span>
                  <span>Create an account (use any email and password)</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-indigo-600 flex-shrink-0">Step 3:</span>
                  <span>Click "Scan & Pay" and paste the payment URL</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-indigo-600 flex-shrink-0">Step 4:</span>
                  <span>Enter any 4-6 digit PIN (e.g., 1234)</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-indigo-600 flex-shrink-0">Step 5:</span>
                  <span>Confirm payment - Done! ✨</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Payment Flow */}
        <div id="payment-flow">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding the Payment Flow</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="space-y-4">
              {[
                { step: 1, title: 'Payment Creation', desc: 'Merchant creates payment via SDK', color: 'indigo' },
                { step: 2, title: 'QR Generation', desc: 'Backend generates payment ID + QR code', color: 'blue' },
                { step: 3, title: 'Customer Scan', desc: 'Customer scans QR in User App', color: 'purple' },
                { step: 4, title: 'UPI Initiation', desc: 'User App initiates UPI payment', color: 'pink' },
                { step: 5, title: 'PIN Entry', desc: 'Customer enters PIN and confirms', color: 'red' },
                { step: 6, title: 'Processing', desc: 'Backend processes payment', color: 'orange' },
                { step: 7, title: 'Webhook', desc: 'Webhook sent to merchant', color: 'green' },
              ].map(({ step, title, desc, color }) => (
                <div key={step} className="flex items-start gap-4">
                  <div className={`w-10 h-10 bg-${color}-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0`}>
                    {step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{title}</h4>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service URLs */}
        <div id="service-urls">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Service URLs</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'Backend API', url: 'http://localhost:4000', color: 'blue' },
              { name: 'Merchant Dashboard', url: 'http://localhost:3000', color: 'green' },
              { name: 'User App', url: 'http://localhost:3001', color: 'purple' },
              { name: 'API Health Check', url: 'http://localhost:4000/health', color: 'gray' },
            ].map(({ name, url, color }) => (
              <div key={name} className={`bg-${color}-50 border border-${color}-200 rounded-lg p-4`}>
                <p className={`font-semibold text-${color}-900 mb-2`}>{name}</p>
                <code className={`text-sm text-${color}-700 bg-${color}-100 px-3 py-1 rounded`}>{url}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div id="next-steps">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/docs/api" className="block bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 hover:shadow-md transition">
              <Code className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Explore API Reference</h3>
              <p className="text-sm text-gray-600">Learn about all available endpoints and their parameters</p>
            </a>

            <a href="/docs/sdk" className="block bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 hover:shadow-md transition">
              <Terminal className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">SDK Guide</h3>
              <p className="text-sm text-gray-600">Deep dive into SDK methods and best practices</p>
            </a>

            <a href="/docs/quick-reference" className="block bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6 hover:shadow-md transition">
              <Zap className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Quick Reference</h3>
              <p className="text-sm text-gray-600">Commands, shortcuts, and code snippets</p>
            </a>

            <a href="https://github.com/Mihir-Rabari/fake-pe" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <Server className="w-8 h-8 text-gray-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">View on GitHub</h3>
              <p className="text-sm text-gray-600">Star the repo and contribute to the project</p>
            </a>
          </div>
        </div>
      </div>

      {/* Inject TOC into right sidebar */}
      <div className="hidden">
        <div id="toc-portal">
          <TableOfContents sections={tocSections} />
        </div>
      </div>

      {/* Script to move TOC to container */}
      <script dangerouslySetInnerHTML={{
        __html: `
          setTimeout(() => {
            const toc = document.getElementById('toc-portal');
            const container = document.getElementById('toc-container');
            if (toc && container) {
              container.appendChild(toc.firstElementChild);
              toc.remove();
            }
          }, 0);
        `
      }} />
    </>
  );
}
