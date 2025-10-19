import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Rocket, Book, Code2, Zap, Server, FileText, Home } from 'lucide-react';
import Logo from '../../components/Logo';
import DocsSidebar from '../../components/docs/DocsSidebar';
import TableOfContents from '../../components/docs/TableOfContents';
import ThemeToggle from '../../components/ThemeToggle';

export default function DocsLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    {
      title: 'Getting Started',
      items: [
        { name: 'Introduction', href: '/docs/getting-started', icon: Home },
        { name: 'Installation', href: '/docs/getting-started#installation', icon: Rocket },
        { name: 'Quick Start', href: '/docs/getting-started#quick-start', icon: Zap },
      ],
    },
    {
      title: 'Guides',
      items: [
        { name: 'Self-Hosting', href: '/docs/self-hosting', icon: Server },
        { name: 'API Usage', href: '/docs/api-usage', icon: Code2 },
        { name: 'Code Examples', href: '/docs/examples', icon: FileText },
      ],
    },
    {
      title: 'API Reference',
      items: [
        { name: 'API Overview', href: '/docs/api', icon: Book },
        { name: 'Payments', href: '/docs/api#payments', icon: null },
        { name: 'UPI', href: '/docs/api#upi', icon: null },
        { name: 'Wallets', href: '/docs/api#wallets', icon: null },
      ],
    },
    {
      title: 'SDK',
      items: [
        { name: 'SDK Guide', href: '/docs/sdk', icon: Code2 },
        { name: 'Installation', href: '/docs/sdk#installation', icon: null },
        { name: 'Examples', href: '/docs/sdk#examples', icon: null },
      ],
    },
    {
      title: 'Resources',
      items: [
        { name: 'Quick Reference', href: '/docs/quick-reference', icon: Zap },
      ],
    },
  ];

  const isActive = (href) => {
    // For hash links, only highlight if on the exact page AND hash matches
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      return location.pathname === path && location.hash === `#${hash}`;
    }
    // For regular links, exact path match only
    return location.pathname === href;
  };

  return (
    <div className="min-h-screen bg-fakepe-background scroll-smooth">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 w-full border-b border-fakepe-border bg-fakepe-background/80 backdrop-blur-md shadow-sm">
        <div className="flex h-16 items-center px-6">
          <div className="mr-4 flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-fakepe-text-secondary hover:bg-fakepe-surface transition"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex flex-1 items-center justify-between">
            <Link to="/">
              <Logo size="md" showText={true} />
            </Link>
            
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex md:space-x-6 text-sm font-medium">
                <Link to="/docs/getting-started" className="text-fakepe-text-secondary hover:text-fakepe-primary transition">Documentation</Link>
                <Link to="/" className="text-fakepe-text-secondary hover:text-fakepe-primary transition">Home</Link>
              </nav>
              
              <ThemeToggle />
              
              <a
                href="https://github.com/Mihir-Rabari/fake-pe"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-fakepe-text-secondary hover:text-fakepe-primary hover:bg-fakepe-surface rounded-lg transition"
                title="GitHub"
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
          <div className="fixed inset-0 bg-fakepe-background/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-fakepe-surface shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-fakepe-border">
              <Link to="/">
                <Logo size="sm" showText={true} />
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-fakepe-background rounded-lg transition text-fakepe-text-secondary">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-fakepe-text-secondary">{section.title}</h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 group ${
                              isActive(item.href)
                                ? 'bg-fakepe-primary/10 text-fakepe-primary font-medium border border-fakepe-primary/30'
                                : 'text-fakepe-text-secondary hover:bg-fakepe-background hover:text-fakepe-primary hover:translate-x-1'
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {Icon && <Icon className="w-4 h-4 group-hover:text-fakepe-primary transition-colors duration-200" />}
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
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
          <aside className="hidden lg:block fixed top-16 bottom-0 left-0 w-72 overflow-y-auto border-r border-fakepe-border bg-fakepe-surface/50 backdrop-blur-sm">
            <nav className="p-6 space-y-6">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-fakepe-text-secondary px-3">{section.title}</h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);
                      return (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group ${
                              active
                                ? 'bg-fakepe-primary/10 text-fakepe-primary font-medium shadow-sm border border-fakepe-primary/30'
                                : 'text-fakepe-text-secondary hover:bg-fakepe-background hover:text-fakepe-primary hover:translate-x-1'
                            }`}
                          >
                            {Icon && (
                              <Icon className={`w-4 h-4 transition-colors duration-200 ${active ? 'text-fakepe-primary' : 'text-fakepe-text-secondary group-hover:text-fakepe-primary'}`} />
                            )}
                            <span className={Icon ? '' : 'ml-7'}>{item.name}</span>
                            {active && (
                              <div className="ml-auto w-1.5 h-1.5 bg-fakepe-primary rounded-full animate-pulse"></div>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              
              {/* Footer links */}
              <div className="pt-6 border-t border-fakepe-border">
                <div className="px-3 space-y-2 text-xs text-fakepe-text-secondary">
                  <a href="https://github.com/Mihir-Rabari/fake-pe" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-fakepe-primary transition">
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <p className="text-fakepe-text-secondary/60">v1.0.0</p>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main content with right sidebars */}
          <main className="flex-1 lg:ml-72">
            <div className="mx-auto max-w-[1800px] px-6 py-12 sm:px-8 lg:px-12">
              <div className="flex gap-8 justify-between">
                {/* Main content */}
                <div className="flex-1 min-w-0 max-w-4xl">
                  <Outlet />
                </div>
                
                {/* Right sidebars container */}
                <div className="hidden xl:flex gap-8 flex-shrink-0">
                  {/* Table of Contents (Tailwind-style) */}
                  <TableOfContents />
                  
                  {/* Stats & Links Sidebar */}
                  <DocsSidebar />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
