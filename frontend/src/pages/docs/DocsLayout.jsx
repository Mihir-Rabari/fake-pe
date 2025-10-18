import { Outlet, Link, useLocation } from 'react-router-dom';
import { Book, Rocket, Code, Zap, Github } from 'lucide-react';

export default function DocsLayout() {
  const location = useLocation();

  const navigation = [
    { name: 'Getting Started', href: '/docs/getting-started', icon: Rocket },
    { name: 'API Reference', href: '/docs/api', icon: Book },
    { name: 'SDK Guide', href: '/docs/sdk', icon: Code },
    { name: 'Quick Reference', href: '/docs/quick-reference', icon: Zap },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                FakePE
              </Link>
              <span className="ml-4 text-sm text-gray-500">Documentation</span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/Mihir-Rabari/fake-pe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Github className="w-5 h-5" />
              </a>
              <Link
                to="/"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Back to App
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-1 sticky top-24">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
              
              <div className="pt-6 mt-6 border-t">
                <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Related Repos
                </p>
                <div className="mt-2 space-y-1">
                  <a
                    href="https://github.com/Mihir-Rabari/fakePE-user-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    User App
                  </a>
                  <a
                    href="https://github.com/Mihir-Rabari/fakePE-sdk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    SDK
                  </a>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
