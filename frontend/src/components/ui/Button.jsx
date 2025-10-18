import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fakepe-primary focus:ring-offset-2 focus:ring-offset-fakepe-background disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-fakepe-primary text-white hover:bg-fakepe-success shadow-lg shadow-fakepe-primary/20 hover:shadow-xl hover:shadow-fakepe-primary/30 hover:scale-105',
    secondary: 'bg-fakepe-surface text-fakepe-text-primary border border-fakepe-border hover:bg-fakepe-border hover:border-fakepe-primary/50',
    ghost: 'text-fakepe-text-secondary hover:text-fakepe-primary hover:bg-fakepe-surface',
    destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20',
    accent: 'bg-fakepe-accent text-fakepe-background hover:bg-fakepe-accent/90 shadow-lg shadow-fakepe-accent/30 hover:scale-105',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-3',
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
