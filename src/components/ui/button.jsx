import React from 'react';

export const Button = ({ children, className = '', variant = 'default', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 hover:bg-gray-100',
    ghost: 'hover:bg-gray-100',
  };
  
  const classes = `${baseClasses} ${variants[variant]} px-4 py-2 ${className}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};