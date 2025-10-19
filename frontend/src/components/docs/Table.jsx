import React from 'react';

export default function Table({ children }) {
  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-fakepe-border shadow-sm">
      <table className="min-w-full divide-y divide-fakepe-border">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }) {
  return (
    <thead className="bg-fakepe-surface">
      {children}
    </thead>
  );
}

export function TableBody({ children }) {
  return (
    <tbody className="bg-fakepe-background divide-y divide-fakepe-border">
      {children}
    </tbody>
  );
}

export function TableRow({ children }) {
  return (
    <tr className="hover:bg-fakepe-primary/5 transition-colors duration-150">
      {children}
    </tr>
  );
}

export function TableHeader({ children }) {
  return (
    <th className="px-6 py-4 text-left text-xs font-semibold text-fakepe-text-primary uppercase tracking-wider">
      {children}
    </th>
  );
}

export function TableCell({ children, code }) {
  return (
    <td className="px-6 py-4 text-sm text-fakepe-text-primary">
      {code ? (
        <code className="px-2 py-1 bg-fakepe-surface text-fakepe-primary rounded text-xs font-mono border border-fakepe-border">
          {children}
        </code>
      ) : (
        children
      )}
    </td>
  );
}
