import cls from '@/utils/cls';
import { ReactNode } from 'react';

interface WrapLabelShortProps {
  children: ReactNode;
  label: string;
  htmlFor?: string;
  errorMessage?: string;
}

export default function WrapLabelShort({ children, label, htmlFor, errorMessage }: WrapLabelShortProps) {
  return (
    <div className={cls('flex w-full flex-col items-start', 'sm:w-96 sm:flex-row sm:items-center')}>
      <label htmlFor={htmlFor || ''} className="inline-block w-28 flex-shrink-0 text-gray">
        {label}
      </label>
      {children}
      <div className="text-sm text-red-500">{errorMessage}</div>
    </div>
  );
}
