import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export default function CodeBlock({ code, language = 'bash', title, filename }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const languageColors = {
    javascript: { bg: 'bg-yellow-500', text: 'text-yellow-500' },
    typescript: { bg: 'bg-blue-500', text: 'text-blue-500' },
    bash: { bg: 'bg-green-500', text: 'text-green-500' },
    shell: { bg: 'bg-green-500', text: 'text-green-500' },
    json: { bg: 'bg-purple-500', text: 'text-purple-500' },
    python: { bg: 'bg-blue-600', text: 'text-blue-600' },
    jsx: { bg: 'bg-cyan-500', text: 'text-cyan-500' },
    html: { bg: 'bg-orange-500', text: 'text-orange-500' },
    css: { bg: 'bg-pink-500', text: 'text-pink-500' },
  };

  const langColor = languageColors[language] || { bg: 'bg-gray-500', text: 'text-gray-500' };

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      {(title || filename || language) && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {filename && (
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{filename}</span>
              </div>
            )}
            {title && !filename && (
              <span className="text-sm font-medium text-gray-700">{title}</span>
            )}
            {language && (
              <span className={`text-xs px-2 py-1 ${langColor.bg} text-white rounded font-mono font-semibold`}>
                {language}
              </span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-md transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Code */}
      <div className="relative">
        {!title && !filename && !language && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 bg-gray-700/90 hover:bg-gray-600 rounded-lg transition z-10"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-300" />
            )}
          </button>
        )}
        <pre className="bg-gray-900 p-5 overflow-x-auto">
          <code className={`text-sm text-gray-300 font-mono language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
