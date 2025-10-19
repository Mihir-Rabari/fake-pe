import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, Lightbulb } from 'lucide-react';

export default function Callout({ type = 'info', title, children }) {
  const types = {
    info: {
      bg: 'bg-fakepe-primary/10',
      border: 'border-fakepe-primary/30',
      borderLeft: 'border-l-4 border-l-fakepe-primary',
      icon: Info,
      iconColor: 'text-fakepe-primary',
      titleColor: 'text-fakepe-text-primary',
      textColor: 'text-fakepe-text-secondary',
    },
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      borderLeft: 'border-l-4 border-l-yellow-500',
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
      titleColor: 'text-fakepe-text-primary',
      textColor: 'text-fakepe-text-secondary',
    },
    danger: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      borderLeft: 'border-l-4 border-l-red-500',
      icon: AlertCircle,
      iconColor: 'text-red-400',
      titleColor: 'text-fakepe-text-primary',
      textColor: 'text-fakepe-text-secondary',
    },
    success: {
      bg: 'bg-fakepe-success/10',
      border: 'border-fakepe-success/30',
      borderLeft: 'border-l-4 border-l-fakepe-success',
      icon: CheckCircle,
      iconColor: 'text-fakepe-success',
      titleColor: 'text-fakepe-text-primary',
      textColor: 'text-fakepe-text-secondary',
    },
    tip: {
      bg: 'bg-fakepe-accent/10',
      border: 'border-fakepe-accent/30',
      borderLeft: 'border-l-4 border-l-fakepe-accent',
      icon: Lightbulb,
      iconColor: 'text-fakepe-accent',
      titleColor: 'text-fakepe-text-primary',
      textColor: 'text-fakepe-text-secondary',
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
