import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export default function CodeBlockCard({ code, language = 'javascript', title, description }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const languageColors = {
    javascript: 'bg-yellow-500',
    typescript: 'bg-blue-500',
    bash: 'bg-green-500',
    json: 'bg-purple-500',
    html: 'bg-orange-500',
    css: 'bg-pink-500',
  };

  const languageColor = languageColors[language] || 'bg-gray-500';

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {title && (
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
              </div>
            )}
            {language && (
              <span className={`${languageColor} text-white text-xs px-2 py-1 rounded font-mono`}>
                {language}
              </span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition text-sm text-gray-700 dark:text-gray-300"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-300">{description}</p>
        </div>
      )}

      {/* Code */}
      <div className="relative">
        {!title && !language && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition z-10 opacity-0 group-hover:opacity-100"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-300" />
            )}
          </button>
        )}
        <pre className="bg-gray-900 dark:bg-black p-4 overflow-x-auto">
          <code className={`text-sm text-gray-300 language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
