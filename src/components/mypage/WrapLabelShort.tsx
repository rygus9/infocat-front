import { ReactNode } from 'react';

interface WrapLabelShortProps {
  children: ReactNode;
  label: string;
  htmlFor: string;
}

export default function WrapLabelShort({ children, label, htmlFor }: WrapLabelShortProps) {
  return (
    <div className="flex w-96 items-center">
      <label htmlFor={htmlFor} className="inline-block w-28 flex-shrink-0 text-gray">
        {label}
      </label>
      {children}
    </div>
  );
}
