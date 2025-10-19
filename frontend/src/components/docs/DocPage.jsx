import React from 'react';

export default function DocPage({ children, title, description }) {
  return (
    <article className="min-w-0">
      {title && (
        <div className="mb-10 pb-8 border-b border-fakepe-border">
          <h1 className="text-4xl md:text-5xl font-bold text-fakepe-text-primary mb-4 tracking-tight leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-fakepe-text-secondary leading-relaxed max-w-3xl">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight prose-headings:scroll-mt-20
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-fakepe-border
        prose-h2:text-fakepe-text-primary
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-fakepe-text-primary
        prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3 prose-h4:text-fakepe-text-primary
        prose-p:text-fakepe-text-secondary prose-p:leading-relaxed prose-p:my-4
        prose-li:text-fakepe-text-secondary prose-li:my-1
        prose-ul:my-6 prose-ol:my-6
        prose-strong:text-fakepe-text-primary prose-strong:font-semibold
        prose-code:text-fakepe-primary 
        prose-code:bg-fakepe-surface
        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-[0.9em] prose-code:font-normal prose-code:border prose-code:border-fakepe-border
        prose-code:before:content-none prose-code:after:content-none
        prose-a:text-fakepe-primary prose-a:no-underline prose-a:font-medium
        prose-a:transition-colors
        hover:prose-a:text-fakepe-success hover:prose-a:underline
        prose-blockquote:border-l-fakepe-primary prose-blockquote:bg-fakepe-primary/10
        prose-blockquote:text-fakepe-text-primary prose-blockquote:not-italic
        prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:my-6
        prose-pre:bg-fakepe-surface prose-pre:text-fakepe-text-primary prose-pre:p-0 prose-pre:my-6
        prose-table:my-6
        prose-thead:bg-fakepe-surface
        prose-th:text-fakepe-text-primary prose-th:font-semibold prose-th:text-left prose-th:text-sm
        prose-td:text-fakepe-text-secondary prose-td:text-sm
        prose-tr:border-fakepe-border
        prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8">
        {children}
      </div>
    </article>
  );
}
