import React from 'react';

export default function Card({ title, children, icon: Icon, variant = 'default' }) {
  const variants = {
    default: 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800',
    primary: 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-indigo-200 dark:border-indigo-800',
    success: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800',
    warning: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800',
  };

  return (
    <div className={`my-6 rounded-xl border ${variants[variant]} p-6 shadow-sm`}>
      {title && (
        <div className="flex items-center gap-3 mb-4">
          {Icon && (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
      )}
      <div className="text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}

export function InfoCard({ title, children }) {
  return (
    <div className="my-6 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-5">
      {title && (
        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          {title}
        </h4>
      )}
      <div className="text-sm text-blue-800 dark:text-blue-200">
        {children}
      </div>
    </div>
  );
}

export function LinkCard({ title, description, href, icon: Icon }) {
  return (
    <a 
      href={href}
      className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition group"
    >
      {Icon && (
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </a>
  );
}
