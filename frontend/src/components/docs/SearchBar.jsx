import React, { useState, useEffect } from 'react';
import { Search, Command } from 'lucide-react';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition w-64"
      >
        <Search className="w-4 h-4" />
        <span>Search documentation...</span>
        <kbd className="ml-auto px-2 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded">
          Ctrl K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-sm outline-none"
                autoFocus
              />
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200 rounded">
                ESC
              </kbd>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto p-2">
              {query ? (
                <div className="space-y-1">
                  <SearchResult
                    title="Getting Started"
                    description="Quick start guide for FakePE"
                    href="/docs/getting-started"
                    onClick={() => setIsOpen(false)}
                  />
                  <SearchResult
                    title="API Reference"
                    description="Complete API documentation"
                    href="/docs/api"
                    onClick={() => setIsOpen(false)}
                  />
                  <SearchResult
                    title="SDK Guide"
                    description="Node.js SDK integration"
                    href="/docs/sdk"
                    onClick={() => setIsOpen(false)}
                  />
                  <SearchResult
                    title="Quick Reference"
                    description="Commands and code snippets"
                    href="/docs/quick-reference"
                    onClick={() => setIsOpen(false)}
                  />
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500 text-sm">
                  <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Start typing to search...</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">↵</kbd>
                  <span>Select</span>
                </span>
              </div>
              <span>Powered by FakePE</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SearchResult({ title, description, href, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition"
    >
      <div className="font-medium text-gray-900 text-sm">{title}</div>
      <div className="text-xs text-gray-500 mt-0.5">{description}</div>
    </a>
  );
}
