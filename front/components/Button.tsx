import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean
  variant?: 'primary' | 'secondary' | 'text'
  size?: 'md' | 'sm' | 'lg'
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  block,
  ...props
}: ButtonProps) {
  const buttonVariant = () => {
    switch (variant) {
      case 'text':
        return 'text-primary-500 hover:bg-gray-100'

      case 'secondary':
        return 'text-primary-900 bg-primary-100 hover:bg-primary-200'

      default:
        return 'text-white bg-primary-600 hover:bg-primary-700'
    }
  }

  const buttonSize = () => {
    switch (size) {
      case 'lg':
        return 'px-8 py-6'

      case 'sm':
        return 'px-4 py-2'

      default:
        return 'px-6 py-4'
    }
  }

  return (
    <button
      {...props}
      className={`${
        block ? 'w-full justify-center flex' : 'inline-flex'
      } items-center rounded-md text-base font-medium ${buttonVariant()} ${buttonSize()}`}
    >
      {children}
    </button>
  )
}

export default Button
