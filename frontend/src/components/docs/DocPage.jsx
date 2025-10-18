import React from 'react';

export default function DocPage({ children, title, description }) {
  return (
    <article className="min-w-0">
      {title && (
        <div className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight prose-headings:scroll-mt-20
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-800
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 
        prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:my-4
        prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:my-1
        prose-ul:my-6 prose-ol:my-6
        prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
        prose-code:text-indigo-600 dark:prose-code:text-indigo-400 
        prose-code:bg-gray-100 dark:prose-code:bg-gray-900
        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-[0.9em] prose-code:font-normal
        prose-code:before:content-none prose-code:after:content-none
        prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline prose-a:font-medium
        prose-a:transition-colors
        hover:prose-a:text-indigo-700 dark:hover:prose-a:text-indigo-300 hover:prose-a:underline
        prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-50 dark:prose-blockquote:bg-indigo-950/30
        prose-blockquote:text-gray-800 dark:prose-blockquote:text-gray-200 prose-blockquote:not-italic
        prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:my-6
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-0 prose-pre:my-6
        prose-table:my-6
        prose-thead:bg-gray-100 dark:prose-thead:bg-gray-900
        prose-th:text-gray-900 dark:prose-th:text-white prose-th:font-semibold prose-th:text-left prose-th:text-sm
        prose-td:text-gray-700 dark:prose-td:text-gray-300 prose-td:text-sm
        prose-tr:border-gray-200 dark:prose-tr:border-gray-800
        prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8">
        {children}
      </div>
    </article>
  );
}
