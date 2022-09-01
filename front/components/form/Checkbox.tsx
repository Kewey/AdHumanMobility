import { icon } from '@fortawesome/fontawesome-svg-core'
import Image from 'next/image'
import React, { InputHTMLAttributes } from 'react'
import { displayMedia } from '../../types/api'

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
        <Image
          src={displayMedia(iconUrl)}
          layout="fixed"
          height={50}
          width={50}
        />
      )}
      <span>{label}</span>
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
