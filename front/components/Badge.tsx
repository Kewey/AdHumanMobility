import { FunctionComponent, HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: string;
}

const Badge: FunctionComponent<BadgeProps> = ({
  children,
  color = 'primary',
  ...props
}) => {
  return (
    <span
      {...props}
      className={`inline-flex items-center py-1 px-2 rounded-md text-xs font-medium bg-${color}-100 text-${color}-900`}
    >
      {children}
    </span>
  );
};

export default Badge;
