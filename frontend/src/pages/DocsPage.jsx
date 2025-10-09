import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Key, CreditCard, Webhook, Copy, Check, Menu, X, Home } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

function CodeBlock({ code, onCopy, copied }) {
  return (
    <div className="relative group">
      <button
        onClick={onCopy}
        className="absolute top-4 right-4 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition z-10"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-300" />}
      </button>
      <pre className="bg-gray-900 dark:bg-black rounded-lg p-6 overflow-x-auto">
        <code className="text-sm text-gray-300">{code}</code>
      </pre>
    </div>
  );
}

export default function DocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeSection, setActiveSection] = useState('getting-started');

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const navigation = [
    { id: 'getting-started', label: 'Getting Started', icon: Home },
    { id: 'authentication', label: 'Authentication', icon: Key },
    { id: 'payments', label: 'Payments API', icon: CreditCard },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
                {sidebarOpen ? <X /> : <Menu />}
              </button>
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white">FakePay Docs</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <nav className="p-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-2 ${activeSection === item.id ? 'bg-blue-50 dark:bg-blue-950 text-blue-600' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-12 max-w-4xl">
          {activeSection === 'getting-started' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome to FakePay</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">Complete payment infrastructure for developers</p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Quick Start</h2>
                <CodeBlock 
                  code={`npm install @fakepay/node

const FakePay = require('@fakepay/node');
const fakepay = new FakePay({ apiKey: 'sk_test_...' });

const payment = await fakepay.payments.create({
  amount: 50000,
  currency: 'INR',
  callbackUrl: 'https://your-app.com/webhook'
});`}
                  onCopy={() => copyCode('quickstart', 'qs')}
                  copied={copiedCode === 'qs'}
                />
              </div>
            </div>
          )}

          {activeSection === 'authentication' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Authentication</h1>
              <p className="text-gray-600 dark:text-gray-400">Use API keys to authenticate requests</p>
              <CodeBlock 
                code={`Authorization: Bearer sk_test_your_api_key`}
                onCopy={() => copyCode('auth', 'auth')}
                copied={copiedCode === 'auth'}
              />
            </div>
          )}

          {activeSection === 'payments' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Payments API</h1>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create Payment</h2>
                <CodeBlock 
                  code={`POST /api/v1/payments

{
  "amount": 50000,
  "currency": "INR",
  "customer": {
    "email": "customer@example.com",
    "phone": "+919876543210"
  },
  "callbackUrl": "https://your-app.com/webhook"
}`}
                  onCopy={() => copyCode('payment', 'pay')}
                  copied={copiedCode === 'pay'}
                />
              </div>
            </div>
          )}

          {activeSection === 'webhooks' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Webhooks</h1>
              <p className="text-gray-600 dark:text-gray-400">Receive real-time payment notifications</p>
              <CodeBlock 
                code={`app.post('/webhook', (req, res) => {
  const signature = req.headers['x-signature'];
  const payload = req.body;
  
  // Verify signature
  const expected = crypto
    .createHmac('sha256', merchantSecret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  if (signature === expected) {
    console.log('Payment:', payload.paymentId);
    res.status(200).send('OK');
  }
});`}
                onCopy={() => copyCode('webhook', 'wh')}
                copied={copiedCode === 'wh'}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
