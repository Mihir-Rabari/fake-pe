import React from 'react';

export default function Logo({ size = 'md', showText = true, className = '' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* FakePE Logo SVG */}
      <svg 
        className={sizes[size]} 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        role="img" 
        aria-labelledby="titleFakePE"
      >
        <title id="titleFakePE">FakePE Logo</title>
        {/* Rounded Rectangle Outline */}
        <rect 
          x="4" 
          y="8" 
          width="56" 
          height="48" 
          rx="8" 
          fill="none" 
          stroke="#2ECB70" 
          strokeWidth="4"
        />
        {/* F Letter */}
        <path 
          d="M22 18v28M22 18h18M22 32h14" 
          fill="none" 
          stroke="#2ECB70" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      
      {/* FakePE Wordmark */}
      {showText && (
        <span className="text-xl font-semibold text-white tracking-tight">
          FakePE
        </span>
      )}
    </div>
  );
}
