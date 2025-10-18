import React from 'react';

const Card = ({ 
  children, 
  variant = 'default',
  hover = true,
  className = '',
  ...props 
}) => {
  const baseStyles = 'rounded-xl border transition-all duration-300';
  
  const variants = {
    default: 'bg-fakepe-surface border-fakepe-border',
    glass: 'bg-fakepe-surface/50 border-fakepe-border backdrop-blur-sm',
    gradient: 'bg-gradient-to-br from-fakepe-surface to-fakepe-background border-fakepe-border',
    glow: 'bg-fakepe-surface border-fakepe-primary/50 shadow-lg shadow-fakepe-primary/10',
  };
  
  const hoverStyles = hover ? 'hover:scale-[1.02] hover:shadow-xl hover:shadow-fakepe-primary/5 hover:border-fakepe-primary/30' : '';
  
  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
