import React from 'react';

export default function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-fakepe-surface text-fakepe-text-primary border border-fakepe-border',
    success: 'bg-fakepe-success/10 text-fakepe-success border border-fakepe-success/30',
    warning: 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/30',
    info: 'bg-fakepe-primary/10 text-fakepe-primary border border-fakepe-primary/30',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}

export function MethodBadge({ method }) {
  const methods = {
    GET: { bg: 'bg-fakepe-primary', text: 'text-white' },
    POST: { bg: 'bg-fakepe-success', text: 'text-white' },
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
