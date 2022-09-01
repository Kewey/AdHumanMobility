import React, { AnchorHTMLAttributes, ForwardedRef, forwardRef } from 'react'

interface ButtonProps {
  block?: boolean
  variant?: 'primary' | 'secondary' | 'text'
  size?: 'md' | 'sm' | 'lg'
}

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      block,
      href,
      ...props
    }: ButtonProps & any,
    ref: ForwardedRef<any>
  ) => {
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

    return !!href ? (
      <a
        {...props}
        ref={ref}
        className={`${
          block ? 'w-full justify-center flex' : 'inline-flex'
        } items-center cursor-pointer rounded-md text-base font-medium ${buttonVariant()} ${buttonSize()}`}
      >
        {children}
      </a>
    ) : (
      <button
        {...props}
        ref={ref}
        className={`${
          block ? 'w-full justify-center flex' : 'inline-flex'
        } items-center cursor-pointer rounded-md text-base font-medium ${buttonVariant()} ${buttonSize()}`}
      >
        {children}
      </button>
    )
  }
)

export default Button
