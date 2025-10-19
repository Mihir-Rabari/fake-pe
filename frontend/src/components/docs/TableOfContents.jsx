import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const location = useLocation(); // Track route changes

  useEffect(() => {
    // Small delay to ensure DOM is updated
    const timer = setTimeout(() => {
      // Extract all h2 and h3 headings from the page
      const article = document.querySelector('article, main');
      if (!article) return;

      const elements = article.querySelectorAll('h2[id], h3[id]');
      const headingData = Array.from(elements).map(element => ({
        id: element.id,
        text: element.textContent,
        level: parseInt(element.tagName.charAt(1))
      }));

      setHeadings(headingData);
    }, 100); // Small delay for DOM update

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
      clearTimeout(timer);
      if (article) {
        const elements = article.querySelectorAll('h2[id], h3[id]');
        elements.forEach((element) => {
          observer.unobserve(element);
        });
      }
    };
  }, [location.pathname]); // Re-run when page changes

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
    <nav className="hidden xl:block sticky top-24 w-64 h-fit max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-thin">
      <div className="pb-4">
        <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-fakepe-text-primary">
          <List className="w-4 h-4 text-fakepe-primary" />
          <span>On this page</span>
        </div>
        
        <ul className="space-y-2 text-sm border-l-2 border-fakepe-border">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                  block py-1 pr-3 transition-all duration-200 ease-in-out
                  ${heading.level === 2 ? 'pl-4 font-medium' : 'pl-8 text-fakepe-text-secondary'}
                  ${
                    activeId === heading.id
                      ? 'text-fakepe-primary border-l-2 border-fakepe-primary -ml-[2px] font-medium'
                      : 'hover:text-fakepe-primary hover:translate-x-0.5'
                  }
                `}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>

        
      </div>
    </nav>
  );
}
