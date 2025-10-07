import React from 'react';

function Logo({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <svg 
        className={sizes[size]} 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" r="58" fill="url(#gradient)" stroke="#0284c7" strokeWidth="2"/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#0ea5e9', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#0369a1', stopOpacity:1}} />
          </linearGradient>
        </defs>
        <path 
          d="M 35 60 L 85 60 M 60 35 L 60 85 M 45 45 L 75 75 M 75 45 L 45 75" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="60" cy="60" r="25" stroke="white" strokeWidth="4" fill="none" opacity="0.6"/>
        <circle cx="35" cy="35" r="3" fill="white" opacity="0.8"/>
        <circle cx="85" cy="35" r="3" fill="white" opacity="0.8"/>
        <circle cx="35" cy="85" r="3" fill="white" opacity="0.8"/>
        <circle cx="85" cy="85" r="3" fill="white" opacity="0.8"/>
      </svg>
      <span className="text-2xl font-bold text-gray-900">expe</span>
    </div>
  );
}

export default Logo;
