import React, { useState, useEffect } from 'react';

export default function TableOfContents({ sections }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="space-y-2">
      <p className="text-sm font-semibold text-gray-900 mb-3">On this page</p>
      <ul className="space-y-2 text-sm">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className={`block w-full text-left py-1 border-l-2 pl-3 transition ${
                activeId === section.id
                  ? 'border-indigo-500 text-indigo-600 font-medium'
                  : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {section.title}
            </button>
            {section.subsections && activeId === section.id && (
              <ul className="ml-3 mt-1 space-y-1">
                {section.subsections.map((sub) => (
                  <li key={sub.id}>
                    <button
                      onClick={() => scrollToSection(sub.id)}
                      className="block w-full text-left py-1 pl-4 text-xs text-gray-500 hover:text-indigo-600 transition"
                    >
                      {sub.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
