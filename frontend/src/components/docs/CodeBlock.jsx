import React from 'react';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ code, onCopy, copied, language = 'javascript' }) {
  return (
    <div className="relative group">
      <button
        onClick={onCopy}
        className="absolute top-4 right-4 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition z-10 opacity-0 group-hover:opacity-100"
        title="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-300" />
        )}
      </button>
      <pre className="bg-gray-900 dark:bg-black rounded-lg p-6 overflow-x-auto border border-gray-800">
        <code className={`text-sm text-gray-300 language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
