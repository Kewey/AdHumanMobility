import React, { InputHTMLAttributes } from 'react'

interface CheckboxComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  value?: string
  type: 'radio' | 'checkbox'
}

function Checkbox({
  label,
  placeholder,
  name,
  type,
  value,
  className = '',
  ...props
}: CheckboxComponentProps) {
  return (
    <label
      htmlFor={`${name}-${value}`}
      className={`focus:outline-none focus:border-primary-500 inline-flex items-center justify-between px-4 py-3 border rounded-lg ${className}`}
    >
      {label}
      <input
        className="ml-4"
        placeholder={placeholder}
        id={`${name}-${value}`}
        name={name}
        value={value}
        type={type}
        {...props}
      />
    </label>
  )
}

export default Checkbox