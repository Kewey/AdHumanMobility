import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: FieldError
  register?: UseFormRegister<any>
}

const Input = forwardRef(
  (
    {
      label,
      placeholder,
      name = '',
      required,
      error,
      ...props
    }: InputComponentProps,
    ref: ForwardedRef<any>
  ) => {
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
          placeholder={placeholder}
          id={name}
          name={name}
          ref={ref}
          className={`focus:outline-none focus:border-primary-500 px-4 py-3 w-full border appearance-none shadow-none ${
            error && 'border-red-500'
          } rounded-lg`}
          {...props}
        />
        {error && <p className="mt-2 text-red-400">{error.message}</p>}
      </div>
    )
  }
)

export default Input
