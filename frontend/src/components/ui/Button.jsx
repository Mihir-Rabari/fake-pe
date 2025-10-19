import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fakepe-primary/50 focus:ring-offset-1 focus:ring-offset-fakepe-background disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-fakepe-primary text-white hover:bg-fakepe-success shadow-sm hover:shadow-md',
    secondary: 'bg-fakepe-surface text-fakepe-text-primary border border-fakepe-border hover:bg-fakepe-border hover:border-fakepe-primary/50',
    ghost: 'text-fakepe-text-secondary hover:text-fakepe-primary hover:bg-fakepe-surface',
    destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
    accent: 'bg-fakepe-accent text-fakepe-background hover:bg-fakepe-accent/90 shadow-sm',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-2.5 text-base gap-2',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
