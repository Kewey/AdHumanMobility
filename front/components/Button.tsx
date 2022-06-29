import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean
  variant?: 'primary' | 'secondary' | 'text'
}

function Button({
  children,
  variant = 'primary',
  block,
  ...props
}: ButtonProps) {
  const buttonStyle = () => {
    switch (variant) {
      case 'text':
        return 'text-primary-500 hover:bg-gray-100'

      case 'secondary':
        return 'text-primary-900 bg-primary-100 hover:bg-primary-200'

      default:
        return 'text-white bg-primary-600 hover:bg-primary-700'
    }
  }

  return (
    <button
      {...props}
      className={`${
        block ? 'w-full justify-center flex' : 'inline-flex'
      } items-center px-6 py-4 rounded-md text-base font-medium ${buttonStyle()}`}
    >
      {children}
    </button>
  )
}

export default Button
