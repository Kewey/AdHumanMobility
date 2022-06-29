import React, { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { DisturbanceFormType } from '../../types/disturbance'

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  register?: UseFormRegister<any>
}

function Input({
  label,
  placeholder,
  name = '',
  register,
  required,
  ...props
}: InputComponentProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 text-gray-400 font-semibold block w-full"
        >
          {label}
        </label>
      )}
      <input
        {...(register && register(name, { required }))}
        placeholder={placeholder}
        id={name}
        name={name}
        className="focus:outline-none focus:border-primary-500 px-4 py-3 w-full border rounded-lg"
        {...props}
      />
    </div>
  )
}

export default Input
