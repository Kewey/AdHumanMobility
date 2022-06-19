import React, { InputHTMLAttributes } from 'react';

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function Input({ label, placeholder, name, ...props }: InputComponentProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="mb-1 text-gray-500 font-bold block w-full"
        >
          {label}
        </label>
      )}
      <input
        placeholder={placeholder}
        id={name}
        name={name}
        className="focus:outline-none focus:border-primary-500 px-4 py-3 w-full border rounded-lg"
        {...props}
      />
    </div>
  );
}

export default Input;
