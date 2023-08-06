import { icon } from '@fortawesome/fontawesome-svg-core'
import Image from 'next/image'
import React, { InputHTMLAttributes } from 'react'

interface CheckboxComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'radio' | 'checkbox'
  register: any
  label?: string
  value?: string
  iconUrl?: string
}

function Checkbox({
  label,
  placeholder,
  name,
  type,
  value,
  className = '',
  iconUrl,
  register,
  required,
  ...props
}: CheckboxComponentProps) {
  return (
    <label
      htmlFor={`${name}-${value}`}
      className={`focus:outline-none focus:border-primary-500 inline-flex items-center cursor-pointer justify-between px-4 py-3 border rounded-lg ${className}`}
    >
      {iconUrl && (
        <div className="mr-2">
          <img
            src={`https://api.${process.env.NEXT_PUBLIC_DOMAIN}${iconUrl}`}
            height={40}
            width={40}
            className="h-10 w-10 object-contain"
          />
        </div>
      )}
      <span className="flex-1">{label}</span>
      <input
        {...(register && register(name, { required }))}
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
