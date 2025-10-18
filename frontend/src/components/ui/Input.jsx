import React from 'react';

const Input = React.forwardRef(({ 
  label,
  error,
  className = '',
  ...props 
}, ref) => {
  const baseStyles = 'w-full px-4 py-3 bg-fakepe-surface border rounded-xl text-fakepe-text-primary placeholder:text-fakepe-text-secondary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-fakepe-background disabled:opacity-50 disabled:cursor-not-allowed';
  
  const borderStyles = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
    : 'border-fakepe-border focus:border-fakepe-primary focus:ring-fakepe-primary/50 focus:shadow-lg focus:shadow-fakepe-primary/10';
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-fakepe-text-primary mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`${baseStyles} ${borderStyles} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
