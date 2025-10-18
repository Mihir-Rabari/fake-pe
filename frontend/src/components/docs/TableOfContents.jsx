import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // Extract all h2 and h3 headings from the page
    const article = document.querySelector('article');
    if (!article) return;

    const elements = article.querySelectorAll('h2[id], h3[id]');
    const headingData = Array.from(elements).map(element => ({
      id: element.id,
      text: element.textContent,
      level: parseInt(element.tagName.charAt(1))
    }));

    setHeadings(headingData);

    // Set up intersection observer for active section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Account for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      
      // Update URL without triggering page reload
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="hidden xl:block sticky top-24 w-64 h-fit max-h-[calc(100vh-7rem)] overflow-y-auto">
      <div className="pb-4">
        <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-900 dark:text-white">
          <List className="w-4 h-4" />
          <span>On this page</span>
        </div>
        
        <ul className="space-y-2 text-sm border-l-2 border-gray-200 dark:border-gray-800">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                  block py-1 pr-3 transition-colors duration-200
                  ${heading.level === 2 ? 'pl-4 font-medium' : 'pl-8 text-gray-600 dark:text-gray-400'}
                  ${
                    activeId === heading.id
                      ? 'text-indigo-600 dark:text-indigo-400 border-l-2 border-indigo-600 dark:border-indigo-400 -ml-[2px] font-medium'
                      : 'hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Back to top
          </a>
        </div>
      </div>
    </nav>
  );
}
