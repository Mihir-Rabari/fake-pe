import React from 'react';
import { MethodBadge } from './Badge';

export default function ApiEndpoint({ method, path, description }) {
  return (
    <div className="my-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <MethodBadge method={method} />
        <code className="text-base font-mono text-gray-900 dark:text-white font-medium">
          {path}
        </code>
      </div>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {description}
        </p>
      )}
    </div>
  );
}
