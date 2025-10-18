import React from 'react';

export default function DocPage({ children, title, description }) {
  return (
    <article className="prose prose-lg prose-slate dark:prose-invert max-w-none 
      prose-headings:scroll-mt-20 prose-headings:font-bold
      prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-gray-900 dark:prose-h2:text-white
      prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-gray-800 dark:prose-h3:text-gray-100
      prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
      prose-li:text-gray-700 dark:prose-li:text-gray-300
      prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
      prose-code:text-indigo-600 dark:prose-code:text-indigo-400 
      prose-code:bg-indigo-50 dark:prose-code:bg-indigo-950 
      prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm 
      prose-code:before:content-none prose-code:after:content-none
      prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline prose-a:font-medium
      hover:prose-a:underline hover:prose-a:text-indigo-700 dark:hover:prose-a:text-indigo-300
      prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50 dark:prose-blockquote:bg-indigo-950
      prose-blockquote:text-gray-800 dark:prose-blockquote:text-gray-200
      prose-table:text-gray-700 dark:prose-table:text-gray-300
      prose-thead:bg-gray-100 dark:prose-thead:bg-gray-800
      prose-th:text-gray-900 dark:prose-th:text-white
      prose-td:border-gray-200 dark:prose-td:border-gray-700">
      {title && (
        <div className="not-prose mb-10">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{title}</h1>
          {description && (
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
          )}
        </div>
      )}
      {children}
    </article>
  );
}
