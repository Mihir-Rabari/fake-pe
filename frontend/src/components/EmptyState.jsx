import React from 'react';
import { FileQuestion, Inbox, AlertCircle } from 'lucide-react';

function EmptyState({ type = 'default', title, description, action }) {
  const icons = {
    default: <Inbox className="w-16 h-16 text-gray-400" />,
    notFound: <FileQuestion className="w-16 h-16 text-gray-400" />,
    error: <AlertCircle className="w-16 h-16 text-red-400" />
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4">
        {icons[type]}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title || 'No data available'}
      </h3>
      {description && (
        <p className="text-gray-600 mb-6 max-w-md">
          {description}
        </p>
      )}
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
