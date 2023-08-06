import { FunctionComponent, HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: string
}

const Badge: FunctionComponent<BadgeProps> = ({
  children,
  color = 'bg-blue-600',
  ...props
}) => {
  return (
    <span
      {...props}
      className={`inline-flex items-center py-1 px-2 rounded-md text-xs font-medium ${color} text-white`}
    >
      {children}
    </span>
  )
}

export default Badge
