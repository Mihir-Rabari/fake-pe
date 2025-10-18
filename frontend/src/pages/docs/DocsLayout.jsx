import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Book, Rocket, Code, Zap, Github, Menu, X, ExternalLink, Sparkles } from 'lucide-react';
import SearchBar from '../../components/docs/SearchBar';

export default function DocsLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      title: 'GETTING STARTED',
      items: [
        { name: 'Introduction', href: '/docs/getting-started', icon: Sparkles },
        { name: 'Quick Start', href: '/docs/getting-started#quick-start', icon: Rocket },
        { name: 'Installation', href: '/docs/getting-started#installation', icon: Code },
      ],
    },
    {
      title: 'CORE CONCEPTS',
      items: [
        { name: 'Architecture', href: '/docs/architecture', icon: Book },
        { name: 'Authentication', href: '/docs/authentication', icon: Book },
        { name: 'Payments Flow', href: '/docs/payments-flow', icon: Book },
        { name: 'UPI System', href: '/docs/upi-system', icon: Book },
        { name: 'Webhooks', href: '/docs/webhooks-guide', icon: Book },
      ],
    },
    {
      title: 'API REFERENCE',
      items: [
        { name: 'Overview', href: '/docs/api', icon: Book },
        { name: 'Payments API', href: '/docs/api#payments-api', icon: Book },
        { name: 'UPI API', href: '/docs/api#upi-api', icon: Book },
        { name: 'Wallet API', href: '/docs/api#wallet-api', icon: Book },
      ],
    },
    {
      title: 'SDK & TOOLS',
      items: [
        { name: 'SDK Guide', href: '/docs/sdk', icon: Code },
        { name: 'TypeScript', href: '/docs/sdk#typescript', icon: Code },
        { name: 'Error Handling', href: '/docs/sdk#error-handling', icon: Code },
        { name: 'Best Practices', href: '/docs/sdk#best-practices', icon: Code },
      ],
    },
    {
      title: 'RESOURCES',
      items: [
        { name: 'Quick Reference', href: '/docs/quick-reference', icon: Zap },
        { name: 'Examples', href: '/docs/examples', icon: Code },
        { name: 'Troubleshooting', href: '/docs/troubleshooting', icon: Book },
        { name: 'FAQ', href: '/docs/faq', icon: Book },
      ],
    },
  ];

  const isActive = (href) => {
    const cleanHref = href.split('#')[0];
    return location.pathname === cleanHref;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo + Mobile Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-900"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                  FakePE
                </span>
              </Link>
              
              <span className="hidden md:block text-sm text-gray-400">v4.1</span>
            </div>

            {/* Center: Search */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <SearchBar />
            </div>

            {/* Right: Links */}
            <div className="flex items-center gap-4">
              <nav className="hidden lg:flex items-center gap-6 text-sm">
                <Link to="/docs/getting-started" className="text-gray-700 hover:text-gray-900 font-medium">
                  Docs
                </Link>
                <a href="https://github.com/Mihir-Rabari/fake-pe" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 font-medium">
                  Blog
                </a>
                <a href="https://github.com/Mihir-Rabari/fake-pe" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 font-medium">
                  Showcase
                </a>
                <a href="https://github.com/Mihir-Rabari/fake-pe" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 font-medium">
                  Sponsor
                </a>
              </nav>
              
              <a
                href="https://github.com/Mihir-Rabari/fake-pe"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-gray-900 transition"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              
              <Link
                to="/"
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-16 flex">
        {/* Left Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 left-0 bottom-0 w-72 bg-white border-r border-gray-200 overflow-y-auto transition-transform z-30 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Mobile Search */}
          <div className="p-4 border-b border-gray-200 md:hidden">
            <SearchBar />
          </div>

          <nav className="p-6 space-y-8">
            {navigation.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition ${
                            active
                              ? 'bg-indigo-50 text-indigo-700 font-medium'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            {/* Related Links */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
                Related Projects
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="https://github.com/Mihir-Rabari/fakePE-user-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Github className="w-4 h-4" />
                    User App
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Mihir-Rabari/fakePE-sdk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Github className="w-4 h-4" />
                    SDK Repository
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/fakepe-sdk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Code className="w-4 h-4" />
                    NPM Package
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-900/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Content */}
              <main className="lg:col-span-9">
                <div className="prose prose-indigo max-w-none">
                  <Outlet />
                </div>
              </main>

              {/* Right Sidebar - TOC */}
              <aside className="hidden xl:block xl:col-span-3">
                <div className="sticky top-24 space-y-4">
                  {/* This will be populated by individual pages */}
                  <div id="toc-container" />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
