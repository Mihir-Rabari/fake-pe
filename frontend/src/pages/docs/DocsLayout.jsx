import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Search } from 'lucide-react';

export default function DocsLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    {
      title: 'Getting Started',
      items: [
        { name: 'Introduction', href: '/docs/getting-started' },
        { name: 'Installation', href: '/docs/getting-started#installation' },
        { name: 'Quick Start', href: '/docs/getting-started#quick-start' },
      ],
    },
    {
      title: 'API Reference',
      items: [
        { name: 'Payments', href: '/docs/api#payments' },
        { name: 'UPI', href: '/docs/api#upi' },
        { name: 'Wallets', href: '/docs/api#wallets' },
      ],
    },
    {
      title: 'SDK',
      items: [
        { name: 'SDK Guide', href: '/docs/sdk' },
        { name: 'Examples', href: '/docs/sdk#examples' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { name: 'Quick Reference', href: '/docs/quick-reference' },
      ],
    },
  ];

  const isActive = (href) => {
    const path = href.split('#')[0];
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <div className="flex h-14 items-center px-4">
          <div className="mr-4 flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex flex-1 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-lg font-semibold">FakePE</span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex md:space-x-6 text-sm font-medium">
                <Link to="/docs/getting-started" className="text-gray-700 hover:text-gray-900">Docs</Link>
                <Link to="/" className="text-gray-700 hover:text-gray-900">Dashboard</Link>
              </nav>
              
              <a
                href="https://github.com/Mihir-Rabari/fake-pe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-gray-600/75" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="text-lg font-semibold">FakePE</Link>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="space-y-6">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={`block text-sm ${
                            isActive(item.href) ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-gray-900'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-8xl">
        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden lg:block fixed top-14 bottom-0 left-0 w-64 overflow-y-auto border-r border-gray-200 p-8">
            <nav className="space-y-8">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">{section.title}</h3>
                  <ul className="space-y-2 border-l border-gray-200">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={`block border-l pl-4 -ml-px text-sm ${
                            isActive(item.href)
                              ? 'border-indigo-600 text-indigo-600 font-medium'
                              : 'border-transparent text-gray-600 hover:border-gray-400 hover:text-gray-900'
                          }`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 lg:ml-64">
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
