import React from 'react';

export default function Table({ children }) {
  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }) {
  return (
    <thead className="bg-gray-50 dark:bg-gray-900">
      {children}
    </thead>
  );
}

export function TableBody({ children }) {
  return (
    <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
      {children}
    </tbody>
  );
}

export function TableRow({ children }) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition">
      {children}
    </tr>
  );
}

export function TableHeader({ children }) {
  return (
    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
      {children}
    </th>
  );
}

export function TableCell({ children, code }) {
  return (
    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
      {code ? (
        <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 rounded text-xs font-mono">
          {children}
        </code>
      ) : (
        children
      )}
    </td>
  );
}
