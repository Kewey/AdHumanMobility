import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	block?: boolean
	variant?: 'primary' | 'text'
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
				return 'text-indigo-500 hover:bg-gray-100'

			default:
				return 'text-white bg-indigo-600 hover:bg-indigo-700'
		}
	}

	return (
		<button
			{...props}
			className={`${
				block ? 'w-full justify-center ' : 'inline-'
			}flex items-center px-6 py-4 rounded-md text-base font-medium ${buttonStyle()}`}
		>
			{children}
		</button>
	)
}

export default Button
