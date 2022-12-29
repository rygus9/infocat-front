import { ReactNode } from 'react';

interface WrapLabelShortProps {
  children: ReactNode;
  label: string;
  htmlFor?: string;
  errorMessage?: string;
}

export default function WrapLabelShort({ children, label, htmlFor, errorMessage }: WrapLabelShortProps) {
  return (
    <div className="flex w-96 items-center">
      <label htmlFor={htmlFor || ''} className="inline-block w-28 flex-shrink-0 text-gray">
        {label}
      </label>
      {children}
      <div className="text-sm text-red-500">{errorMessage}</div>
    </div>
  );
}
