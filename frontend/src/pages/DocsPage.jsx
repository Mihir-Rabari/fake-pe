import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Key, CreditCard, Webhook, Menu, X, Home, Code2, Wallet, QrCode, AlertCircle } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

// Import modular section components
import GettingStartedSection from '../components/docs/GettingStartedSection';
import AuthenticationSection from '../components/docs/AuthenticationSection';
import PaymentsSection from '../components/docs/PaymentsSection';
import UPISection from '../components/docs/UPISection';
import WalletsSection from '../components/docs/WalletsSection';
import WebhooksSection from '../components/docs/WebhooksSection';
import SDKSection from '../components/docs/SDKSection';
import ErrorHandlingSection from '../components/docs/ErrorHandlingSection';

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
    { id: 'upi', label: 'UPI Payments', icon: QrCode },
    { id: 'wallets', label: 'Wallets', icon: Wallet },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'sdk', label: 'SDK Integration', icon: Code2 },
    { id: 'errors', label: 'Error Handling', icon: AlertCircle }
  ];

  // Scroll to section on navigation
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && hash !== activeSection) {
      setActiveSection(hash);
    }
  }, []);

  useEffect(() => {
    window.location.hash = activeSection;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

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
                <span className="font-bold text-gray-900 dark:text-white">FakePE Docs</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} z-40`}>
          <nav className="p-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-2 transition-colors ${activeSection === item.id ? 'bg-blue-50 dark:bg-blue-950 text-blue-600' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'}`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-12 max-w-5xl mx-auto">
          {activeSection === 'getting-started' && (
            <GettingStartedSection copyCode={copyCode} copiedCode={copiedCode} />
          )}

          {activeSection === 'authentication' && (
            <AuthenticationSection copyCode={copyCode} copiedCode={copiedCode} />
          )}

          {activeSection === 'payments' && (
            <PaymentsSection copyCode={copyCode} copiedCode={copiedCode} />
          )}

          {activeSection === 'upi' && (
            <UPISection copyCode={copyCode} copiedCode={copiedCode} />
          )}

          {activeSection === 'wallets' && (
            <WalletsSection copyCode={copyCode} copiedCode={copiedCode} />
          )}

          {activeSection === 'webhooks' && (
            <WebhooksSection copyCode={copyCode} copiedCode={copiedCode} />
          )}

          {activeSection === 'sdk' && (
            <SDKSection copyCode={copyCode} copiedCode={copiedCode} />
          )}

          {activeSection === 'errors' && (
            <ErrorHandlingSection copyCode={copyCode} copiedCode={copiedCode} />
          )}
        </main>
      </div>
    </div>
  );
}
