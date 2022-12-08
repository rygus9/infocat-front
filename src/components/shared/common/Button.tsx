import cls from '@/utils/cls';
import { PropsWithChildren } from 'react';

type ColorType = 'purple' | 'gray';
type ButtonStyleType = 'fill' | 'border';

interface ButtonProps {
  type: 'button' | 'submit';
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  size?: string;
  color?: ColorType;
  buttonStyle?: ButtonStyleType;
  isLoading?: boolean;
}

export default function Button({
  size = '',
  color = 'gray',
  buttonStyle = 'border',
  isLoading = false,
  children,
  ...props
}: ButtonProps & PropsWithChildren) {
  return (
    <button className={cls(makeButtonClassName({ color, buttonStyle }), size, 'rounded-md')} {...props} disabled={isLoading}>
      {isLoading ? '로딩 중...' : children}
    </button>
  );
}

interface makeButtonClassNameProps {
  color: ColorType;
  buttonStyle: ButtonStyleType;
}

const makeButtonClassName = ({ color, buttonStyle }: makeButtonClassNameProps) => {
  if (color == 'purple') {
    if (buttonStyle == 'fill')
      return 'bg-lightPurple text-white hover:bg-lightPurple disabled:bg-lightPurple disabled:hover:bg-lightPurple disabled:cursor-not-allowed';
    if (buttonStyle == 'border') return 'border border-purple-400 text-lightPurple hover:ring-1 hover:ring-purple-400';
  }
  if (color == 'gray') {
    if (buttonStyle == 'fill') return 'bg-gray-700 text-white hover:bg-gray-600';
    if (buttonStyle == 'border') return 'border border-gray-400 text-gray-500 hover:ring-1 hover:ring-gray-400';
  }
  return '';
};
