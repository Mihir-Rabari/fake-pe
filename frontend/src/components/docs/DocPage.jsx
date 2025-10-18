import React from 'react';

export default function DocPage({ children, title, description }) {
  return (
    <article className="prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
      {title && (
        <div className="not-prose mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{title}</h1>
          {description && (
            <p className="text-xl text-gray-600 leading-relaxed">{description}</p>
          )}
        </div>
      )}
      {children}
    </article>
  );
}
