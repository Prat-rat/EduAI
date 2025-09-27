import React from 'react';

export const Textarea = ({ className = '', ...props }) => {
  return (
    <textarea
      className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 min-h-20 ${className}`}
      {...props}
    />
  );
};