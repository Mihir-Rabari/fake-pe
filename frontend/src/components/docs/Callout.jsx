import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, Lightbulb } from 'lucide-react';

export default function Callout({ type = 'info', title, children }) {
  const types = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/50',
      border: 'border-blue-200 dark:border-blue-800',
      borderLeft: 'border-l-4 border-l-blue-500',
      icon: Info,
      iconColor: 'text-blue-600 dark:text-blue-400',
      titleColor: 'text-blue-900 dark:text-blue-100',
      textColor: 'text-blue-800 dark:text-blue-200',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-950/50',
      border: 'border-yellow-200 dark:border-yellow-800',
      borderLeft: 'border-l-4 border-l-yellow-500',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      titleColor: 'text-yellow-900 dark:text-yellow-100',
      textColor: 'text-yellow-800 dark:text-yellow-200',
    },
    danger: {
      bg: 'bg-red-50 dark:bg-red-950/50',
      border: 'border-red-200 dark:border-red-800',
      borderLeft: 'border-l-4 border-l-red-500',
      icon: AlertCircle,
      iconColor: 'text-red-600 dark:text-red-400',
      titleColor: 'text-red-900 dark:text-red-100',
      textColor: 'text-red-800 dark:text-red-200',
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-950/50',
      border: 'border-green-200 dark:border-green-800',
      borderLeft: 'border-l-4 border-l-green-500',
      icon: CheckCircle,
      iconColor: 'text-green-600 dark:text-green-400',
      titleColor: 'text-green-900 dark:text-green-100',
      textColor: 'text-green-800 dark:text-green-200',
    },
    tip: {
      bg: 'bg-purple-50 dark:bg-purple-950/50',
      border: 'border-purple-200 dark:border-purple-800',
      borderLeft: 'border-l-4 border-l-purple-500',
      icon: Lightbulb,
      iconColor: 'text-purple-600 dark:text-purple-400',
      titleColor: 'text-purple-900 dark:text-purple-100',
      textColor: 'text-purple-800 dark:text-purple-200',
    },
  };

  const config = types[type] || types.info;
  const Icon = config.icon;

  return (
    <div className={`my-6 rounded-lg border ${config.border} ${config.borderLeft} ${config.bg} p-4 shadow-sm`}>
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          {title && (
            <h5 className={`font-semibold ${config.titleColor} mb-1`}>{title}</h5>
          )}
          <div className={`text-sm ${config.textColor}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
