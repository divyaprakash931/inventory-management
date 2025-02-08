import React, { useState } from 'react';

const Input = ({ label, id, type = 'text', value, onChange, placeholder, required = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full px-3 mb-6">
      <label
        htmlFor={id}
        className={`absolute ml-2.5 -top-2 px-1 bg-white transition-all duration-300 ${
          isFocused || value ? 'text-purple-600 text-xs' : 'text-gray-400 text-sm'
        }`}
      >
        {label}
      </label>
      <input
        className={`block w-full text-gray-700 border-2 ${
          isFocused ? 'border-purple-600' : 'border-gray-300'
        } rounded py-2 px-4 focus:outline-none focus:border-purple-600 focus:ring-0 placeholder-transparent`}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
      />
      <span
        className={`absolute text-gray-400 left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
          value || isFocused ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {placeholder}
      </span>
    </div>
  );
};

export default Input;
