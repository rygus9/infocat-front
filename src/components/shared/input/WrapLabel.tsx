import { PropsWithChildren } from 'react';

interface WrapLabelProps {
  label: string;
  errorMessage?: string;
  id?: string;
}

export default function WrapLabel({ label, errorMessage, id = label, children }: WrapLabelProps & PropsWithChildren) {
  return (
    <div>
      <label htmlFor={id} className="pb-1 text-gray-500">
        {label}
      </label>
      {children}
      <div className="text-sm text-red-500">{errorMessage}</div>
    </div>
  );
}
