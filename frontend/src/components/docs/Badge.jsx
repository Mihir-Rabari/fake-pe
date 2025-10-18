import React from 'react';

export default function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    success: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400',
    warning: 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400',
    danger: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400',
    info: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}

export function MethodBadge({ method }) {
  const methods = {
    GET: { bg: 'bg-blue-500', text: 'text-white' },
    POST: { bg: 'bg-green-500', text: 'text-white' },
    PUT: { bg: 'bg-yellow-500', text: 'text-white' },
    PATCH: { bg: 'bg-orange-500', text: 'text-white' },
    DELETE: { bg: 'bg-red-500', text: 'text-white' },
  };

  const config = methods[method] || methods.GET;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold ${config.bg} ${config.text} shadow-sm`}>
      {method}
    </span>
  );
}

export function StatusBadge({ status }) {
  const statuses = {
    CREATED: 'info',
    PENDING: 'warning',
    COMPLETED: 'success',
    FAILED: 'danger',
    REFUNDED: 'default',
  };

  return <Badge variant={statuses[status] || 'default'}>{status}</Badge>;
}
