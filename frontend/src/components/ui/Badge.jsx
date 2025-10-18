import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';
  
  const variants = {
    default: 'bg-fakepe-surface text-fakepe-text-secondary border border-fakepe-border',
    success: 'bg-fakepe-success/10 text-fakepe-success border border-fakepe-success/30',
    primary: 'bg-fakepe-primary/10 text-fakepe-primary border border-fakepe-primary/30',
    accent: 'bg-fakepe-accent/10 text-fakepe-accent border border-fakepe-accent/30',
    warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30',
    error: 'bg-red-500/10 text-red-400 border border-red-500/30',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };
  
  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
