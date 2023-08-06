import React, { AnchorHTMLAttributes, ForwardedRef, forwardRef } from 'react'

interface ButtonProps {
  block?: boolean
  variant?: 'primary' | 'secondary' | 'text'
  size?: 'md' | 'sm' | 'lg'
  textAlign?: 'center' | 'left' | 'right'
}

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      block,
      href,
      disabled,
      textAlign,
      ...props
    }: ButtonProps & any,
    ref: ForwardedRef<any>
  ) => {
    const buttonVariant = () => {
      switch (variant) {
        case 'text':
          return 'text-primary-500 bg-white hover:bg-gray-100'

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

    const buttonTextAlign = () => {
      switch (textAlign) {
        case 'center':
          return 'text-center'

        case 'right':
          return 'text-right'

        default:
          return 'text-left'
      }
    }

    return !!href ? (
      <a
        {...props}
        ref={ref}
        disabled={disabled}
        className={`${
          block ? 'w-full justify-center flex' : 'inline-flex'
        } items-center cursor-pointer rounded-md text-base font-medium ${buttonVariant()} ${buttonSize()} ${buttonTextAlign()}${
          props?.disabled ? 'opacity-40' : ''
        }`}
      >
        {children}
      </a>
    ) : (
      <button
        {...props}
        disabled={disabled}
        ref={ref}
        className={`disabled:bg-slate-200 disabled:text-slate-500 ${
          block ? 'w-full justify-center flex' : 'inline-flex'
        } items-center cursor-pointer rounded-md text-base appearance-none font-medium ${buttonVariant()} ${buttonSize()} ${buttonTextAlign()} disabled:opacity-40`}
      >
        {children}
      </button>
    )
  }
)

export default Button
