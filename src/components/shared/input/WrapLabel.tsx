import { PropsWithChildren } from 'react';

interface WrapLabelProps {
  label: string;
  errorMessage?: string;
  required?: boolean;
  id?: string;
  moreInfo?: string;
}

export default function WrapLabel({
  label,
  errorMessage,
  id = label,
  required = false,
  moreInfo,
  children,
}: WrapLabelProps & PropsWithChildren) {
  return (
    <div>
      <label htmlFor={id} className="inline-block pb-1.5 text-gray">
        {label} {required && <span className="text-lightPurple">*</span>}
      </label>
      {children}
      {moreInfo && <div className="pt-1 text-sm text-gray">{moreInfo}</div>}
      <div className="text-sm text-red-500">{errorMessage}</div>
    </div>
  );
}
